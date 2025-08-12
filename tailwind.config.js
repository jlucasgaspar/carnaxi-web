// tailwind.config.js (ou arquivo CSS)
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 1s ease-out forwards', // 1s de duração, ease-out, mantém o estado final
      },
    },
  },
};