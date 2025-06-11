/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgDark: "#202123", // Background color
        panelDark: "#2c2f31", // Panels/containers
        textPrimary: "#eaeaea", // Main text color
        textSecondary: "#9ca3af", // Secondary text color
        accent: "#10a37f", // Accent color (like buttons)
        borderDark: "#3f3f46", // Borders
        bgNodes: "#3a3d42",
        bgHover:"#45484E"
      },
      screens: {
        'xs': '500px',       
        // 'sm': '640px',    
        'md': '850px',    
        // 'lg': '1024px',   
        // 'xl': '1280px',   
        // '2xl': '1536px',  
      },
    },
  },
  plugins: [],
};
