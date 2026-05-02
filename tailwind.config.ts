import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Sat Lab brand v1.0 — see landing_page/Branding.md
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ---------- Brand neutrals (dark-first) ----------
        obsidian:  { DEFAULT: '#0A0E14', deep: '#05080C' }, // canvas
        slate:     '#1A2233',                                // surface 1
        graphite:  '#2A3142',                                // surface 2 / hover
        steel:     '#3F4859',                                // borders, separators
        mist:      '#8B95A8',                                // secondary text
        fog:       '#BFC7D4',                                // de-emphasized text
        bone:      '#E6EAF0',                                // body text
        lumen:     '#FFFFFF',                                // display max contrast

        // ---------- Brand accents ----------
        chlorophyll: { DEFAULT: '#5EE26B', deep: '#46993F', dim: '#2D6630' },
        amber:       { DEFAULT: '#F4B84A', deep: '#C8901F' },
        ember:       '#FF6B57',
        signal:      '#5EA8FF',

        // ---------- Sequential palette (NDVI / canopy density) ----------
        ndvi: {
          0: '#0A0E14',
          1: '#1A3A1F',
          2: '#2D6630',
          3: '#46993F',
          4: '#5EE26B',
          5: '#A8F0B0',
          6: '#E6FBE8'
        },

        // ---------- Legacy aliases so any stray old class names still resolve ----------
        paper: { DEFAULT: '#0A0E14', light: '#1A2233', deep: '#05080C', edge: '#1A2233' },
        ink:   { DEFAULT: '#E6EAF0', deep: '#FFFFFF', mid: '#BFC7D4', soft: '#8B95A8', faint: '#3F4859', paper: '#0A0E14' },
        line:  { DEFAULT: '#3F4859', warm: '#2A3142' },
        accent:{ DEFAULT: '#5EE26B', deep: '#46993F' },
        lime:  { DEFAULT: '#5EE26B', deep: '#46993F', soft: '#A8F0B0' }
      },
      fontFamily: {
        // Brand spec — Inter Display for display, Inter for body, JetBrains Mono for technical readouts
        display: ['"Inter Display"', '"Inter"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', '"Inter Display"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        // Brand: Display tracking -0.02em (loosen to -0.01 above 96px)
        displaytight:   '-0.02em',
        displayloose:   '-0.01em',
        kicker:         '0.16em',
        kickertight:    '0.18em'
      },
      fontSize: {
        // Brand 1.250 modular scale anchored at 16 px
        'display-xl': ['4rem',     { lineHeight: '1.05', letterSpacing: '-0.02em' }], // 64
        'display-l':  ['3rem',     { lineHeight: '1.05', letterSpacing: '-0.02em' }], // 48
        'display-m':  ['2.25rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }], // 36
        'h1':         ['1.75rem',  { lineHeight: '1.15', letterSpacing: '-0.015em' }], // 28
        'h2':         ['1.375rem', { lineHeight: '1.2',  letterSpacing: '-0.01em' }], // 22
        'h3':         ['1.125rem', { lineHeight: '1.3',  letterSpacing: '-0.005em' }], // 18
        'body-l':     ['1rem',     { lineHeight: '1.6' }],                              // 16
        'body-m':     ['0.875rem', { lineHeight: '1.5' }],                              // 14
        'caption':    ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.01em' }]      // 12
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.2)' }
        },
        'scan': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'orbit-tick': {
          '0%, 100%': { opacity: '0.35' },
          '50%':      { opacity: '1' }
        }
      },
      animation: {
        'fade-up':    'fade-up 0.48s cubic-bezier(0.2,0.8,0.2,1) forwards',
        'pulse-dot':  'pulse-dot 2.4s ease-in-out infinite',
        'scan':       'scan 4.8s linear infinite',
        'orbit-tick': 'orbit-tick 2s ease-in-out infinite'
      }
    }
  },
  plugins: [typography]
} satisfies Config;
