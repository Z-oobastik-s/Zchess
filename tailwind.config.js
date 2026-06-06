/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#05020B',
          secondary: '#0B0715',
        },
        accent: {
          primary: '#8B3DFF',
          secondary: '#D44CFF',
          glow: '#B05CFF',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B8B8C7',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
        body: ['Rajdhani', 'Inter', 'sans-serif'],
        hero: ['Bebas Neue', 'Orbitron', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(139, 61, 255, 0.5), 0 0 40px rgba(212, 76, 255, 0.3)',
        'neon-sm': '0 0 10px rgba(139, 61, 255, 0.4)',
        'neon-lg': '0 0 30px rgba(139, 61, 255, 0.6), 0 0 60px rgba(212, 76, 255, 0.4)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3440px',
      },
    },
  },
  plugins: [],
};
