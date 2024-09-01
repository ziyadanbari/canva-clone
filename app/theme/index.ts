"use client";
import { Roboto } from "next/font/google";
import { ThemeOptions } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme: ThemeOptions = {
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
};

export { theme };
