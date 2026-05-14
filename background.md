# Plan: Implementing WebGL Dark Background (components/gl)

This plan details the steps to implement the futuristic WebGL particle background specifically for **Dark Mode** using the existing `components/gl` logic.

## User Review Required

> [!IMPORTANT]
> This implementation focuses exclusively on the Dark Mode background. Ensure your project has a theme management system (like `next-themes`) to detect when the dark theme is active.

## Proposed Changes

### 1. Dependencies Installation
You need to install the following packages in your target project:

```bash
npm install three @types/three @react-three/fiber @react-three/drei next-themes maath
```

---

### 2. File Transfers
Copy the following directories and files from the source project to the corresponding locations in your target project:

#### [NEW] `components/gl/`
This folder is the core requirement. Copy the entire directory:
- `background.tsx`: The main Canvas component (sets the background to `#000`).
- `particles.tsx`: Particle simulation logic.
- `shaders/`: All GLSL shader files.

#### [NEW] `components/theme-background-dark.tsx`
A simplified version of the background controller that only renders the WebGL component when the theme is dark.

#### [NEW] `components/app-theme-provider.tsx` & `components/theme-provider.tsx`
If you haven't set up `next-themes` yet, copy these to handle theme state and prevent hydration mismatch.

---

### 3. CSS Configuration
Modify your `globals.css` to include the necessary variables and base styles.

#### [MODIFY] `globals.css`
```css
.dark {
  --background: transparent; /* Required for WebGL visibility */
  --foreground: #f8fafc;
}

#webgl-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
```

---

### 4. Layout Integration
Wrap your application and place the background component.

#### [MODIFY] `layout.tsx`
```tsx
import { AppThemeProvider } from "@/components/app-theme-provider";
import { ThemeBackgroundDark } from "@/components/theme-background-dark";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          {/* WebGL Background logic */}
          <ThemeBackgroundDark />
          <main className="relative z-10">
            {children}
          </main>
        </AppThemeProvider>
      </body>
    </html>
  );
}
```

### Simplified `theme-background-dark.tsx` Implementation
```tsx
"use client"
import { useTheme } from "next-themes"
import { GLBackground } from "./gl/background"
import { useEffect, useState } from "react"

export function ThemeBackgroundDark() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted || resolvedTheme !== "dark") return null

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <GLBackground />
        </div>
    )
}
```

