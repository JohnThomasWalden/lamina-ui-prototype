import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        brandTeal: '#35F0D2',
        brandBlue: '#37A4FF',
        brandRose: '#FF5C7C',
      },
      backgroundColor: {
        'glass-dark': 'rgba(30,41,59,0.8)', // bg-slate-800/80
        'glass-bg': '#0f172a', // bg-slate-900
      },
      boxShadow: {
        'glass': '0 1px 4px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 