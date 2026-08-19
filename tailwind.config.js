/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#102A2E',
          50: '#EAF1F1',
          100: '#CBDBDC',
          200: '#9FBCBE',
          400: '#3E6C70',
          600: '#1B3E42',
          800: '#102A2E',
          900: '#0A1C1F',
        },
        ember: {
          DEFAULT: '#E8623C',
          50: '#FDF1EB',
          100: '#FCDFCF',
          400: '#EF7E58',
          500: '#E8623C',
          600: '#D24B26',
        },
        brass: {
          DEFAULT: '#C79A47',
          100: '#F3E7CC',
          400: '#D6B060',
          500: '#C79A47',
        },
        mist: {
          DEFAULT: '#EFF4F2',
          100: '#F7FAF9',
          200: '#EFF4F2',
          300: '#DEE7E3',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 10px rgba(16, 42, 46, 0.06)',
        card: '0 8px 30px rgba(16, 42, 46, 0.08)',
        lift: '0 16px 40px rgba(16, 42, 46, 0.14)',
      },
      backgroundImage: {
        'dotted-path':
          'radial-gradient(circle, rgba(16,42,46,0.18) 1.5px, transparent 1.5px)',
      },
      backgroundSize: {
        'dotted-sm': '10px 10px',
      },
    },
  },
  plugins: [],
};
