"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeScript } from "./theme-script";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <ThemeScript />
      {children}
    </NextThemesProvider>
  );
}
