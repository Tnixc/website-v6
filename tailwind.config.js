/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            mono: ["basier_square_monoregular", "ui-monospace", "monospace", "menlo"],
            sans: ["PretendardVariable", "system-ui", "ui-sans-serif"],
            grotesk: ["OverusedGrotesk", "system-ui"]
        },
        extend: {},
    },
    plugins: [],
};
