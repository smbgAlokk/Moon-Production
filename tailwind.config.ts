import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				'xs': '475px',
			},
			fontFamily: {
				hero: ['Bebas Neue', 'Arial Black', 'sans-serif'],
				heading: ['Poppins', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				studio: {
					fuchsia: 'hsl(var(--studio-fuchsia))',
					purple: 'hsl(var(--studio-purple))',
					dark: 'hsl(var(--studio-dark))',
					grey: 'hsl(var(--studio-grey))',
					surface: 'hsl(var(--studio-surface))',
					accent: 'hsl(var(--studio-accent))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'gradient-shift': {
					'0%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' },
					'100%': { 'background-position': '0% 50%' }
				},
				'microphone-roll': {
					'0%': { 
						transform: 'translateY(-100vh) translateX(-50px) rotate(-180deg)',
						opacity: '0'
					},
					'60%': { 
						transform: 'translateY(10px) translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'80%': { 
						transform: 'translateY(-5px) translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(0) translateX(0) rotate(0deg)',
						opacity: '1'
					}
				},
				'shimmer': {
					'0%': { 'background-position': '-200% center' },
					'100%': { 'background-position': '200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'microphone-roll': 'microphone-roll 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'shimmer': 'shimmer 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
