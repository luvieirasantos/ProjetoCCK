import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // garante que o Tailwind escaneie todos os arquivos
  ],
  theme: {
    extend: {},
  },
  plugins: [animate],
};

export default config;
