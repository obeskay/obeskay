import type { Config } from "tailwindcss";

const config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      fontSize: {
        displayDesktop: ["5.75vw", "1"],
        displayMobile: ["12vw", "1"],
        "displayDesktop-sm": ["4vw", "1"],
        "displayMobile-sm": ["8vw", "1"],
        "displayDesktop-xs": ["2.5vw", "1"],
        "displayMobile-xs": ["5.5vw", "1"],
        "3xl": ["2.5rem", "2.5rem"],
        "2xl": ["1.8rem", "1.8rem"],
        xl: ["1.25rem", "1.875rem"],
        lg: ["1.125rem", "1.6875rem"],
        base: ["1rem", "1.5rem"],
        sm: ["0.75rem", "1.125rem"],
        xs: ["0.65rem", "1.125rem"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: (theme) => ({
        "radial-gradient-muted": `radial-gradient(
          circle at 50% 0%,
          hsl(var(--background)) 0%,
          hsl(var(--muted)) 100%
        )`,
        "radial-gradient-card": `radial-gradient(
          circle at 50% 50%,
          hsl(var(--card)) 0%,
          hsl(var(--card)) 100%
        )`,
        watermark: `url('/images/watermark.svg')`,
      }),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      aspectRatio: {
        sticker: "1.5882352",
        stickerInverted: "1/1.5428571",
      },
    },
    transitionDuration: {
      DEFAULT: "0.4s",
    },
    transitionTimingFunction: {
      DEFAULT: "easeOut",
    },
    boxShadow: {
      DEFAULT: "0px 0.5rem 1.25rem -0.5rem rgba(0, 0, 0, 0.075)",
      inverted: "0px -0.5rem 1.25rem -0.5rem rgba(0, 0, 0, 0.075)",
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;

export default config;
