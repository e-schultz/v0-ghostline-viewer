"use client"

import { useState, useEffect, memo } from "react"

/**
 * Terminal header component
 * Displays the terminal title and current time
 */
function TerminalHeaderComponent() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
      <h2 id="terminal-header" className="text-lg sm:text-xl font-bold tracking-wider glitch-text break-words">
        [FLOAT BBS // NODE 03 :: GHOSTLINE ACTIVE]
      </h2>
      <div className="text-sm opacity-70" aria-live="polite" aria-atomic="true">
        {time.toLocaleTimeString()}
      </div>
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export const TerminalHeader = memo(TerminalHeaderComponent)
