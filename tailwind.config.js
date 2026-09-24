export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [
    /* Écrans peu hauts : petits téléphones, iPhone avec les barres de
       Safari (short), téléphones en paysage (tiny). Déclarées comme
       variantes et non comme « screens » : des screens bruts désactivent
       les variantes min-[…] utilisées pour les largeurs. */
    ({ addVariant }) => {
      addVariant("short", "@media (max-height: 700px)");
      addVariant("tiny", "@media (max-height: 480px)");
    },
  ],
};
