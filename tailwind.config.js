/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dashboard-bg': '#0a0c10',
                'card-bg': '#131720',
                'neon-green': '#39FF14',
            },
        },
    },
    plugins: [],
}
