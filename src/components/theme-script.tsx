"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeScript() {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");

    const currentTheme = resolvedTheme || (theme === "system" ? systemTheme : theme);

    if (currentTheme && currentTheme !== "system") {
      html.classList.add(currentTheme);
    } else if (currentTheme === "system") {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = () => {
        html.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };
      applySystemTheme();
      mediaQuery.addEventListener('change', applySystemTheme);
      return () => mediaQuery.removeEventListener('change', applySystemTheme);
    } else {
      html.classList.add('dark'); // Default to dark for this project
    }
  }, [theme, systemTheme, resolvedTheme]);

  return null;
}
