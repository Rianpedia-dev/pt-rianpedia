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
