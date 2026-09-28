import React from 'react';
import { MOCK_CASES } from '@/data/mockCases';
import { InvestigationDetailClient } from '@/components/investigation/InvestigationDetailClient';

export function generateStaticParams() {
  return MOCK_CASES.map((c) => ({
    id: c.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvestigationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <InvestigationDetailClient id={resolvedParams.id} />;
}
