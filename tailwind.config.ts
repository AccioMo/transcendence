import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'jersey': ['Jersey 25', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
        'roboto': ['Roboto Slab', 'serif'],
      },
      animation: {
        'bounce-right': 'bounceRight 2s infinite',
        'bounce-left': 'bounceLeft 2s infinite',
        'bounce-up': 'bounceUp 2s infinite',
        'bounce-down': 'bounceDown 2s infinite',
      },
      keyframes: {
        bounceRight: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateX(0)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(5px)' },
        },
        bounceLeft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateX(0)' },
          '40%': { transform: 'translateX(-10px)' },
          '60%': { transform: 'translateX(-5px)' },
        },
        bounceUp: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        bounceDown: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(10px)' },
          '60%': { transform: 'translateY(5px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 