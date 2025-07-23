/** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
          extend: {
            colors: {
              yellow: {
                DEFAULT: '#ffd662',
              },
              navy: {
                DEFAULT: '#0a2a5c',
              },
            },
          },
        },
        plugins: [],
      }