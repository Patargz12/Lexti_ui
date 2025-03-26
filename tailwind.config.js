/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
  	extend: {
  		colors: {
  			primary: '#00a1a1',
			secondary: '#14C8C8',
			tertiary: {
				'500': '#106464',
			},
			accent: {
				'500': '#202c3c',
			},
  				
  			lavender: {
  				'100': '#f0ebff',
  				'200': '#e1d7ff',
  				'300': '#c2b4fc',
  				'400': '#a391f9',
  				'500': '#8470f6',
  				'600': '#6550f3',
  				'700': '#4730e0',
  				'800': '#3525b0',
  				'900': '#2c2080'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  		
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  		
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderColor: {
  			DEFAULT: 'hsl(var(--border))',
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.3s ease-in-out forwards'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(5px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar-hide')],
} 
