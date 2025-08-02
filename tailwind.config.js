/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'roottly-blue': '#4A90E2',
        'roottly-orange': '#FF6B47',
        'roottly-cream': '#FDF6E3',
        'roottly-brown': '#5D4037',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'grandparent': ['1.5rem', '1.8'],
        'child': ['1.2rem', '1.6'],
        '10xl': ['10rem', '1'],
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'pulse-soft': 'pulse-soft 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'wheel-spin': 'wheel-spin 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'connection-pulse': 'connection-pulse 2s ease-in-out infinite',
        'sparkle': 'sparkle 3s linear infinite',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0,0,0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -8px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -4px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -2px, 0)',
          },
        },
        'pulse-soft': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(74, 144, 226, 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(74, 144, 226, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(74, 144, 226, 0)',
          },
        },
        'float': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        'wheel-spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'gradient-shift': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        'connection-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)',
          },
        },
        'sparkle': {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0.5) rotate(0deg)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1) rotate(180deg)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'roottly': '0 10px 25px rgba(74, 144, 226, 0.3)',
        'roottly-lg': '0 20px 40px rgba(74, 144, 226, 0.2)',
      },
    },
  },
  plugins: [],
}