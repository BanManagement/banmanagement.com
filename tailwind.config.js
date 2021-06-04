module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        discord: '#7289da',
        // https://javisperez.github.io/tailwindcolorshades/#/?Mine%20Shaft=312d2a&tv=1
        primary: {
          50: '#F5F5F4',
          100: '#EAEAEA',
          200: '#CCCBCA',
          300: '#ADABAA',
          400: '#6F6C6A',
          500: '#312D2A',
          600: '#2C2926',
          700: '#1D1B19',
          800: '#161413',
          900: '#0F0E0D'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none'
            },
            'code::after': {
              content: 'none'
            },
            h1: {
              fontWeight: theme('fontWeight.medium'),
              marginBottom: 0
            },
            h2: {
              fontWeight: theme('fontWeight.medium'),
              marginBottom: '0.5em',
              marginTop: '1.5em'
            }
          }
        }
      }),
      maxWidth: {
        '8xl': '90rem'
      },
      maxHeight: (theme) => ({
        '(screen-5)': `calc(100vh - ${theme('spacing.5')})`
      })
    },
    fontFamily: {
      minecraft: ['minecraftiaregular', 'sans-serif']
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwind-heropatterns')({
      patterns: ['floating-cogs'],
      // The foreground opacity
      includeThemeColors: true,
      colors: {
        default: '#312D2A'
      }
    }),
    require('@tailwindcss/typography')
  ]
}
