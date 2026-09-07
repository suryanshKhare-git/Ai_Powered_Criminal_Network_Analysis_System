/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        setu: {
          bg: '#0B0F17',
          surface: '#111827',
          card: '#162032',
          border: '#1E293B',
          borderLight: '#2A384F',
          muted: '#64748B',
          textMuted: '#94A3B8',
          text: '#F8FAFC',
          accent: '#0D9488', // Institutional deep teal
          accentHover: '#0F766E',
          accentLight: '#14B8A6',
          lead: '#D97706', // Muted amber for active investigative leads
          leadHover: '#B45309',
          auditAlert: '#DC2626', // Controlled red reserved strictly for alerts
          verified: '#10B981', // Muted emerald for human-verified status
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
