import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Entity, ConnectionEdge, EntityType, ReviewStatus } from '../../types';
import { NodeDetailsDrawer } from './NodeDetailsDrawer';
import { EdgeExplainDrawer } from './EdgeExplainDrawer';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Filter,
  Layers,
  Sparkles,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

interface SimulationNode {
  id: string;
  name: string;
  type: EntityType;
  categoryLabel: string;
  primaryIdentifier: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isDragging?: boolean;
}

interface SimulationEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  connectionType: string;
  isAIGenerated: boolean;
  confidenceBand: string;
  reviewStatus: ReviewStatus;
}

export const NetworkGraphView: React.FC = () => {
  const {
    entities,
    edges,
    selectedEntityId,
    selectedEdgeId,
    selectEntity,
    selectEdge,
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Viewport transforms
  const [transform, setTransform] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1,
  });

  // Filter states
  const [activeTypeFilters, setActiveTypeFilters] = useState<Record<EntityType, boolean>>({
    person: true,
    phone: true,
    vehicle: true,
    account: true,
    location: true,
    case: true,
  });

  const [reviewFilter, setReviewFilter] = useState<'all' | 'unreviewed' | 'verified_lead' | 'needs_evidence'>('all');
  const [graphSearch, setGraphSearch] = useState<string>('');
  const [physicsRunning, setPhysicsRunning] = useState<boolean>(true);

  // Hover state
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Interaction tracking refs
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeIdRef = useRef<string | null>(null);

  // Simulation nodes and edges state
  const nodesRef = useRef<Map<string, SimulationNode>>(new Map());

  // Colors mapping for entity types
  const typeColors: Record<EntityType, { bg: string; border: string; text: string; label: string }> = {
    person: { bg: '#083344', border: '#06B6D4', text: '#67E8F9', label: 'Person / Suspect' },
    phone: { bg: '#134E4A', border: '#14B8A6', text: '#5EEAD4', label: 'CDR / Phone SIM' },
    vehicle: { bg: '#451A03', border: '#F59E0B', text: '#FCD34D', label: 'Vehicle / Vahan' },
    account: { bg: '#064E3B', border: '#10B981', text: '#6EE7B7', label: 'Bank / Hawala A/C' },
    location: { bg: '#3B0764', border: '#A855F7', text: '#D8B4FE', label: 'Incident / Tower Loc' },
    case: { bg: '#1E3A8A', border: '#3B82F6', text: '#93C5FD', label: 'FIR / Case Docket' },
  };

  // Filtered lists
  const visibleEntities = useMemo(() => {
    return entities.filter(ent => {
      if (!activeTypeFilters[ent.type]) return false;
      if (graphSearch.trim()) {
        const q = graphSearch.toLowerCase();
        return (
          ent.name.toLowerCase().includes(q) ||
          ent.primaryIdentifier.toLowerCase().includes(q) ||
          ent.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entities, activeTypeFilters, graphSearch]);

  const visibleEntityIds = useMemo(() => new Set(visibleEntities.map(e => e.id)), [visibleEntities]);

  const visibleEdges = useMemo(() => {
    return edges.filter(edge => {
      if (!visibleEntityIds.has(edge.source) || !visibleEntityIds.has(edge.target)) {
        return false;
      }
      if (reviewFilter === 'all') return true;
      return edge.reviewStatus === reviewFilter;
    });
  }, [edges, visibleEntityIds, reviewFilter]);

  // Initialize or update simulation nodes
  useEffect(() => {
    const currentMap = nodesRef.current;
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    visibleEntities.forEach((ent, index) => {
      if (!currentMap.has(ent.id)) {
        // Place in circle initially
        const angle = (index / Math.max(visibleEntities.length, 1)) * 2 * Math.PI;
        const radius = Math.min(width, height) * 0.32;
        currentMap.set(ent.id, {
          id: ent.id,
          name: ent.name,
          type: ent.type,
          categoryLabel: ent.categoryLabel,
          primaryIdentifier: ent.primaryIdentifier,
          x: width / 2 + radius * Math.cos(angle) + (Math.random() - 0.5) * 40,
          y: height / 2 + radius * Math.sin(angle) + (Math.random() - 0.5) * 40,
          vx: 0,
          vy: 0,
          radius: ent.type === 'case' ? 32 : ent.type === 'person' ? 28 : 24,
          color: typeColors[ent.type].bg,
        });
      } else {
        const existing = currentMap.get(ent.id)!;
        existing.name = ent.name;
        existing.categoryLabel = ent.categoryLabel;
      }
    });

    // Clean up removed nodes
    for (const key of currentMap.keys()) {
      if (!visibleEntityIds.has(key)) {
        currentMap.delete(key);
      }
    }
  }, [visibleEntities, visibleEntityIds]);

  // Physics Simulation Step
  const runPhysicsTick = useCallback(() => {
    if (!physicsRunning) return;

    const nodes = Array.from(nodesRef.current.values());
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Center gravity
    for (const node of nodes) {
      if (node.isDragging) continue;
      const dx = centerX - node.x;
      const dy = centerY - node.y;
      node.vx += dx * 0.0008;
      node.vy += dy * 0.0008;
    }

    // 2. Node-node repulsion (Coulomb-like)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy || 1;
        const dist = Math.sqrt(distSq);

        if (dist < 380) {
          const force = 1800 / (distSq + 200);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (!n1.isDragging) {
            n1.vx -= fx;
            n1.vy -= fy;
          }
          if (!n2.isDragging) {
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }
    }

    // 3. Edge spring attraction (Hooke's Law)
    for (const edge of visibleEdges) {
      const source = nodesRef.current.get(edge.source);
      const target = nodesRef.current.get(edge.target);
      if (!source || !target) continue;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const idealDist = 180;
      const force = (dist - idealDist) * 0.008;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      if (!source.isDragging) {
        source.vx += fx;
        source.vy += fy;
      }
      if (!target.isDragging) {
        target.vx -= fx;
        target.vy -= fy;
      }
    }

    // 4. Update velocity and apply friction/damping
    const damping = 0.86;
    for (const node of nodes) {
      if (node.isDragging) continue;
      node.vx *= damping;
      node.vy *= damping;
      node.x += node.vx;
      node.y += node.vy;
    }
  }, [physicsRunning, visibleEdges]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      runPhysicsTick();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle high-DPI displays
      const width = canvas.parentElement?.clientWidth || 800;
      const height = canvas.parentElement?.clientHeight || 600;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Apply zoom & pan transform
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.scale, transform.scale);

      // Draw subtle grid background
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(36, 48, 77, 0.25)';
      ctx.lineWidth = 1 / transform.scale;
      const startX = -transform.x / transform.scale;
      const startY = -transform.y / transform.scale;
      const endX = startX + width / transform.scale;
      const endY = startY + height / transform.scale;

      ctx.beginPath();
      for (let x = Math.floor(startX / gridSize) * gridSize; x < endX; x += gridSize) {
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
      }
      for (let y = Math.floor(startY / gridSize) * gridSize; y < endY; y += gridSize) {
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
      }
      ctx.stroke();

      // Draw Edges
      for (const edge of visibleEdges) {
        const source = nodesRef.current.get(edge.source);
        const target = nodesRef.current.get(edge.target);
        if (!source || !target) continue;

        const isSelected = selectedEdgeId === edge.id;
        const isHovered = hoveredEdgeId === edge.id;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        // Edge styling based on AI lead vs Direct registry
        if (isSelected) {
          ctx.strokeStyle = '#2DD4BF';
          ctx.lineWidth = 3.5 / transform.scale;
          ctx.setLineDash([]);
        } else if (isHovered) {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2.5 / transform.scale;
          ctx.setLineDash([]);
        } else if (edge.isAIGenerated) {
          // AI lead: dashed amber/teal line
          ctx.strokeStyle = edge.reviewStatus === 'verified_lead' ? '#10B981' : '#F59E0B';
          ctx.lineWidth = 1.8 / transform.scale;
          ctx.setLineDash([6 / transform.scale, 4 / transform.scale]);
        } else {
          // Direct official registry: solid teal line
          ctx.strokeStyle = '#14B8A6';
          ctx.lineWidth = 1.6 / transform.scale;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Edge Label at midpoint
        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;

        ctx.save();
        ctx.translate(midX, midY);

        // Label pill background
        const labelText = edge.label;
        ctx.font = `600 ${Math.max(10, 11 / transform.scale)}px 'JetBrains Mono', monospace`;
        const textWidth = ctx.measureText(labelText).width;
        const pillWidth = textWidth + 12 / transform.scale;
        const pillHeight = 16 / transform.scale;

        ctx.fillStyle = isSelected
          ? 'rgba(13, 148, 136, 0.95)'
          : isHovered
          ? 'rgba(245, 158, 11, 0.9)'
          : 'rgba(15, 22, 38, 0.85)';
        ctx.strokeStyle = isSelected
          ? '#2DD4BF'
          : isHovered
          ? '#F59E0B'
          : edge.isAIGenerated
          ? 'rgba(245, 158, 11, 0.6)'
          : 'rgba(20, 184, 166, 0.5)';
        ctx.lineWidth = 1 / transform.scale;

        ctx.beginPath();
        ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 3 / transform.scale);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected || isHovered ? '#FFFFFF' : '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, 0, 0);
        ctx.restore();
      }

      // Draw Nodes
      for (const node of nodesRef.current.values()) {
        const isSelected = selectedEntityId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const typeInfo = typeColors[node.type];

        // Outer halo / review status ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isSelected ? 7 : isHovered ? 5 : 3) / transform.scale, 0, 2 * Math.PI);
        if (isSelected) {
          ctx.strokeStyle = '#2DD4BF';
          ctx.lineWidth = 3 / transform.scale;
        } else if (isHovered) {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2.5 / transform.scale;
        } else {
          ctx.strokeStyle = typeInfo.border;
          ctx.lineWidth = 1.5 / transform.scale;
        }
        ctx.stroke();

        // Node fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = typeInfo.bg;
        ctx.fill();

        // Inner icon letter or type code
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${Math.max(11, 12 / transform.scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const initial =
          node.type === 'person'
            ? 'P'
            : node.type === 'phone'
            ? 'SIM'
            : node.type === 'vehicle'
            ? 'VEH'
            : node.type === 'account'
            ? 'A/C'
            : node.type === 'location'
            ? 'LOC'
            : 'FIR';
        ctx.fillText(initial, node.x, node.y - 2 / transform.scale);

        // Name label beneath node
        ctx.font = `600 ${Math.max(10, 11 / transform.scale)}px 'Inter', sans-serif`;
        ctx.fillStyle = isSelected ? '#5EEAD4' : '#F8FAFC';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 14 / transform.scale);

        // Subtext identifier
        ctx.font = `400 ${Math.max(9, 9.5 / transform.scale)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(node.primaryIdentifier, node.x, node.y + node.radius + 26 / transform.scale);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    runPhysicsTick,
    transform,
    visibleEdges,
    selectedEntityId,
    selectedEdgeId,
    hoveredNodeId,
    hoveredEdgeId,
  ]);

  // Mouse / Canvas coordinate helper
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, rawX: 0, rawY: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    return {
      x: (clientX - transform.x) / transform.scale,
      y: (clientY - transform.y) / transform.scale,
      rawX: clientX,
      rawY: clientY,
    };
  };

  // Find node or edge at coordinate
  const getNodeAtCoord = (x: number, y: number): SimulationNode | null => {
    for (const node of nodesRef.current.values()) {
      const dx = node.x - x;
      const dy = node.y - y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 8) {
        return node;
      }
    }
    return null;
  };

  const getEdgeAtCoord = (x: number, y: number): SimulationEdge | null => {
    const threshold = 14 / transform.scale;
    for (const edge of visibleEdges) {
      const source = nodesRef.current.get(edge.source);
      const target = nodesRef.current.get(edge.target);
      if (!source || !target) continue;

      // Distance from point to line segment
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const lengthSq = dx * dx + dy * dy;
      if (lengthSq === 0) continue;

      const t = Math.max(0, Math.min(1, ((x - source.x) * dx + (y - source.y) * dy) / lengthSq));
      const projX = source.x + t * dx;
      const projY = source.y + t * dy;
      const dist = Math.sqrt((x - projX) ** 2 + (y - projY) ** 2);

      if (dist <= threshold) {
        return edge;
      }
    }
    return null;
  };

  // Handlers for Canvas Interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    const hitNode = getNodeAtCoord(coords.x, coords.y);

    if (hitNode) {
      draggedNodeIdRef.current = hitNode.id;
      hitNode.isDragging = true;
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: coords.rawX - transform.x, y: coords.rawY - transform.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);

    if (draggedNodeIdRef.current) {
      const node = nodesRef.current.get(draggedNodeIdRef.current);
      if (node) {
        node.x = coords.x;
        node.y = coords.y;
        node.vx = 0;
        node.vy = 0;
      }
      return;
    }

    if (isPanningRef.current) {
      setTransform(prev => ({
        ...prev,
        x: coords.rawX - panStartRef.current.x,
        y: coords.rawY - panStartRef.current.y,
      }));
      return;
    }

    // Hover detection
    const hitNode = getNodeAtCoord(coords.x, coords.y);
    if (hitNode) {
      setHoveredNodeId(hitNode.id);
      setHoveredEdgeId(null);
    } else {
      setHoveredNodeId(null);
      const hitEdge = getEdgeAtCoord(coords.x, coords.y);
      setHoveredEdgeId(hitEdge ? hitEdge.id : null);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNodeIdRef.current) {
      const node = nodesRef.current.get(draggedNodeIdRef.current);
      if (node) node.isDragging = false;
      draggedNodeIdRef.current = null;
    }
    isPanningRef.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    const hitNode = getNodeAtCoord(coords.x, coords.y);
    if (hitNode) {
      selectEntity(hitNode.id);
      return;
    }

    const hitEdge = getEdgeAtCoord(coords.x, coords.y);
    if (hitEdge) {
      selectEdge(hitEdge.id);
      return;
    }

    // Clicked empty background: clear selection
    selectEntity(null);
    selectEdge(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setTransform(prev => {
      const newScale = Math.max(0.3, Math.min(3.5, prev.scale * zoomFactor));
      return {
        ...prev,
        scale: newScale,
      };
    });
  };

  // Zoom control buttons
  const handleZoom = (factor: number) => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.3, Math.min(3.5, prev.scale * factor)),
    }));
  };

  const handleResetView = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  // Active drawers
  const activeSelectedEntity = entities.find(e => e.id === selectedEntityId);
  const activeSelectedEdge = edges.find(e => e.id === selectedEdgeId);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-84px)] relative bg-setu-bg overflow-hidden select-none animate-fadeIn">
      {/* Top Filter & Controls Toolbar */}
      <div className="bg-setu-surface border-b border-setu-border px-4 py-2 flex flex-wrap items-center justify-between gap-3 z-10 text-xs">
        {/* Entity Type Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-setu-textMuted flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            Layers:
          </span>
          {(Object.keys(typeColors) as EntityType[]).map(type => {
            const isActive = activeTypeFilters[type];
            return (
              <button
                key={type}
                onClick={() =>
                  setActiveTypeFilters(prev => ({
                    ...prev,
                    [type]: !prev[type],
                  }))
                }
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition border ${
                  isActive
                    ? 'bg-setu-card text-white border-teal-500/60 shadow-sm'
                    : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
                }`}
              >
                {type.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Lead Review Filter & Search */}
        <div className="flex items-center gap-2">
          {/* Quick lead review filter */}
          <div className="flex items-center gap-1 bg-setu-card px-2 py-1 rounded border border-setu-border">
            <span className="text-setu-textMuted font-mono text-[11px]">Leads:</span>
            <select
              value={reviewFilter}
              onChange={e => setReviewFilter(e.target.value as any)}
              className="bg-transparent text-slate-200 text-xs font-sans focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-setu-surface">All Links & Records</option>
              <option value="unreviewed" className="bg-setu-surface">Unreviewed AI Leads</option>
              <option value="verified_lead" className="bg-setu-surface">Human-Verified Leads</option>
              <option value="needs_evidence" className="bg-setu-surface">Needs More Evidence</option>
            </select>
          </div>

          {/* Quick Node Search inside graph */}
          <div className="relative">
            <input
              type="text"
              value={graphSearch}
              onChange={e => setGraphSearch(e.target.value)}
              placeholder="Find node in graph..."
              className="pl-7 pr-2 py-1 bg-setu-card border border-setu-border focus:border-teal-500 rounded text-xs text-white placeholder-slate-500 focus:outline-none w-36 sm:w-48 font-mono"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>

          {/* Physics Stabilization Toggle */}
          <button
            onClick={() => setPhysicsRunning(prev => !prev)}
            className={`p-1.5 rounded border transition ${
              physicsRunning
                ? 'bg-teal-950/60 border-teal-500/60 text-teal-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={physicsRunning ? 'Pause graph physics simulation' : 'Resume graph physics simulation'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${physicsRunning ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Area */}
      <div className="flex-1 relative flex overflow-hidden" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />

        {/* Floating Zoom & View Controls Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1 bg-setu-surface/90 border border-setu-border rounded-lg shadow-xl backdrop-blur-sm z-20">
          <button
            onClick={() => handleZoom(1.2)}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(0.8)}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Reset View & Center"
            aria-label="Reset view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-setu-textMuted px-2">
            {Math.round(transform.scale * 100)}%
          </span>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 p-3 bg-setu-surface/85 border border-setu-border rounded-lg shadow-lg backdrop-blur-sm z-20 text-[11px] font-mono space-y-1.5 hidden md:block">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Network Key & Legend
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full border border-teal-400 bg-[#083344]" />
            <span>Entities (P: Person, SIM: Phone, VEH: Vehicle)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-amber-400" />
            <span>AI Suggested Lead (Click to explain)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-4 h-0.5 bg-teal-400" />
            <span>Direct Authoritative Registry</span>
          </div>
        </div>

        {/* Instruction badge bottom right */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-setu-surface/80 border border-setu-border rounded-md text-[11px] font-mono text-setu-textMuted backdrop-blur-sm hidden sm:flex items-center gap-2 pointer-events-none">
          <Info className="w-3.5 h-3.5 text-teal-400" />
          <span>Click any Node or Edge to inspect evidence</span>
        </div>

        {/* Right Drawers */}
        {activeSelectedEntity && (
          <NodeDetailsDrawer
            entity={activeSelectedEntity}
            onClose={() => selectEntity(null)}
          />
        )}

        {activeSelectedEdge && (
          <EdgeExplainDrawer
            edge={activeSelectedEdge}
            onClose={() => selectEdge(null)}
          />
        )}
      </div>
    </div>
  );
};
