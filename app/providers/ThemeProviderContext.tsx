"use client";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/app";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "../theme";
import { ColorSchemes } from "../types";

const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  const { scheme } = useAppSelector((state) => state.colorScheme);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    localStorage.setItem("savedTheme", scheme);
  }, [scheme]);

  const toggleTheme = useMemo(() => {
    return createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode:
          scheme === ColorSchemes.system
            ? prefersDarkMode
              ? ColorSchemes.dark
              : ColorSchemes.light
            : scheme,
      },
    });
  }, [scheme, prefersDarkMode]);

  if (!toggleTheme) return <></>;
  return (
    <ThemeProvider theme={toggleTheme}>
      <div className="h-full">{children}</div>
    </ThemeProvider>
  );
};

export default ThemeProviderContext;
