/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // JAY Real Estate Brand Colors
        'jay-primary': {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
          darker: '#1e40af',
        },
        'jay-gold': {
          DEFAULT: '#d4af37',
          light: '#f4d03f',
          dark: '#b7950b',
        },
        // Navy colors for premium feel
        navy: {
          700: '#3a3f5a',
          800: '#2a2f4a',
          900: '#1a1f3a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // JAY Real Estate specific spacing
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'jay': '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)',
        'jay-lg': '0 25px 50px -12px rgba(37, 99, 235, 0.15), 0 25px 25px -12px rgba(37, 99, 235, 0.08)',
      },
      backgroundImage: {
        'jay-gradient': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)',
        'navy-gradient': 'linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%)',
      },
      zIndex: {
        '9998': '9998',
        '9999': '9999',
      },
    },
  },
  plugins: [],
}
