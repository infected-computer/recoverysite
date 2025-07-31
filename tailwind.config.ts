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
			fontFamily: {
				hebrew: ['Heebo', 'Assistant', 'Arial', 'sans-serif'],
				rubik: ['Rubik', 'Heebo', 'sans-serif'],
				primary: ['var(--font-family-primary)'],
				secondary: ['var(--font-family-secondary)']
			},
			fontSize: {
				'h1': 'var(--font-size-h1)',
				'h2': 'var(--font-size-h2)',
				'h3': 'var(--font-size-h3)',
				'body': 'var(--font-size-body)',
				'body-small': 'var(--font-size-body-small)',
				'button': 'var(--font-size-button)',
				'caption': 'var(--font-size-caption)'
			},
			spacing: {
				'section': 'var(--spacing-section)',
				'section-lg': 'var(--spacing-section-lg)',
				'section-sm': 'var(--spacing-section-sm)'
			},
			colors: {
				// Design tokens colors
				'primary-redesign': 'var(--color-primary)',
				'primary-dark-redesign': 'var(--color-primary-dark)',
				'secondary-redesign': 'var(--color-secondary)',
				'secondary-dark-redesign': 'var(--color-secondary-dark)',
				'bg-redesign': 'var(--color-background)',
				'bg-light-redesign': 'var(--color-background-light)',
				'bg-card-redesign': 'var(--color-background-card)',
				'bg-section-redesign': 'var(--color-background-section)',
				'text-primary-redesign': 'var(--color-text-primary)',
				'text-secondary-redesign': 'var(--color-text-secondary)',
				'text-dark-redesign': 'var(--color-text-dark)',
				'text-muted-redesign': 'var(--color-text-muted)',
				'border-redesign': 'var(--color-border)',
				'border-light-redesign': 'var(--color-border-light)',
				
				// Legacy colors
				'brand-green': 'var(--color-brand-green)',
				'brand-green-hover': 'var(--color-brand-green-hover)',
				'dark': 'var(--color-dark)',
				'dark-lighter': 'var(--color-dark-lighter)',
				'light-gray': 'var(--color-light-gray)',
				'gray-medium': 'var(--color-gray-medium)',
				'text-muted': 'var(--color-text-muted)',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					muted: 'hsl(var(--primary-muted))'
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'redesign-sm': 'var(--radius-sm)',
				'redesign-md': 'var(--radius-md)',
				'redesign-lg': 'var(--radius-lg)',
				'redesign-xl': 'var(--radius-xl)',
				'redesign-full': 'var(--radius-full)'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'card-hover': 'var(--shadow-card-hover)'
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'medium': 'var(--transition-medium)',
				'slow': 'var(--transition-slow)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide-in-down': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'page-enter': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-down': 'slide-in-down 0.3s ease-out',
				'page-enter': 'page-enter 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
