"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});
declare module "@mui/material/styles" {
  interface PaletteOptions extends Record<any, any> {}
  interface Palette extends Record<any, any> {}
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
    cssVarPrefix: "",
  },
  colorSchemes: {
    light: {
      palette: {
        "main-border": "#20202040",
        "main-background": "#eee",
        "hover-glass-bg": "#d2d2d2",
      },
    },
    dark: {
      palette: {
        "main-border": "#313131",
        "main-background": "#1e1e1e",
        "hover-glass-bg": "#2c2c2c",
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export { theme };
