import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        dark: 'var(--dark-color)',
        light: 'var(--light-color)',
        gray: 'var(--gray-color)',
        background: 'var(--dark-color)',
        foreground: 'var(--light-color)',
        muted: {
          DEFAULT: 'var(--gray-color)',
          foreground: 'var(--light-color)',
        },
      },
      fontFamily: {
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
        body: 'var(--font-body)',
        rajdhani: ['Rajdhani', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
      },
      spacing: {
        'header-height': 'var(--header-height)',
        'section-nav-height': 'var(--section-nav-height)',
      },
      zIndex: {
        'particles': 'var(--z-particles)',
        'content': 'var(--z-content)',
        'fixed': 'var(--z-fixed)',
        'modal': 'var(--z-modal)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)',
      },
      animation: {
        'pixel-glow': 'pixelGlow 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease',
        'hero-stats-entrance': 'heroStatsEntrance 0.8s ease',
        'hero-title-entrance': 'heroTitleEntrance 1s ease',
        'hero-subtitle-entrance': 'heroSubtitleEntrance 1.2s ease',
        'hero-description-entrance': 'heroDescriptionEntrance 1.4s ease',
        'card-scan': 'cardScan 2s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'particle-float': 'particleFloat 6s ease-in-out infinite',
        'scan-lines': 'scanLines 2s linear infinite',
        'glitch-effect': 'glitchEffect 0.3s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'line-glow': 'lineGlow 1.5s ease-in-out infinite',
        'ear-wiggle': 'earWiggle 0.5s ease-in-out infinite',
        'blink-anim': 'blinkAnim 3s ease-in-out infinite',
        'bubble-in': 'bubbleIn 0.3s ease-in-out',
        'loading': 'loading 2s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'nav-indicator': 'navIndicator 2s ease-in-out infinite',
        'nav-indicator-pulse': 'navIndicatorPulse 1.5s ease-in-out infinite',
        'scroll-dot-pulse': 'scrollDotPulse 2s ease-in-out infinite',
        'kpi-pulse': 'kpiPulse 2s ease-in-out infinite',
        'tech-pulse': 'techPulse 1.5s ease-in-out infinite',
        'packet-flow': 'packetFlow 1.8s ease-in-out infinite',
        'track-change': 'trackChange 0.3s ease-in-out',
      },
      keyframes: {
        pixelGlow: {
          '0%, 100%': { textShadow: '0 0 20px var(--primary-color)' },
          '50%': { textShadow: '0 0 30px var(--primary-color), 0 0 40px var(--primary-color)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroStatsEntrance: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroTitleEntrance: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroSubtitleEntrance: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroDescriptionEntrance: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cardScan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gridMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100px)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanLines: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitchEffect: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 15px var(--primary-color)' },
          '50%': { boxShadow: '0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color)' },
        },
        lineGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        earWiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        blinkAnim: {
          '0%, 90%, 100%': { opacity: '1' },
          '95%': { opacity: '0' },
        },
        bubbleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        navIndicator: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        navIndicatorPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        scrollDotPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        kpiPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        techPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        packetFlow: {
          '0%': { left: '8px' },
          '45%': { left: 'calc(50% - 0px)', background: 'var(--accent-color)' },
          '55%': { left: 'calc(50% - 0px)' },
          '100%': { left: 'calc(100% - 8px)', background: 'var(--primary-color)' },
        },
        trackChange: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
