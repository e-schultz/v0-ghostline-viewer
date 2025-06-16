"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeContextType = {
  initialized: boolean
  setInitialized: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false)

  // Simulate terminal initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return <ThemeContext.Provider value={{ initialized, setInitialized }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
