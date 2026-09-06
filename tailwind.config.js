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
          bg: '#080C14',
          surface: '#0F1626',
          card: '#161F36',
          border: '#24304D',
          borderLight: '#334366',
          muted: '#64748B',
          textMuted: '#94A3B8',
          text: '#F1F5F9',
          accent: '#0D9488', // Deep teal
          accentHover: '#14B8A6',
          accentLight: '#2DD4BF',
          lead: '#F59E0B', // Amber for active investigative leads
          leadHover: '#D97706',
          auditAlert: '#EF4444', // Red reserved strictly for audit security/access warnings
          verified: '#10B981', // Subtle emerald for human-verified status
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
