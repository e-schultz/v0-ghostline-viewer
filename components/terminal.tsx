"use client"

import { useState, useEffect, memo } from "react"

function TerminalComponent() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      aria-labelledby="terminal-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 mb-3 sm:mb-4 bg-black/90 shadow-lg shadow-pink-500/20 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
        <h2 id="terminal-header" className="text-lg sm:text-xl font-bold tracking-wider glitch-text break-words">
          [FLOAT BBS // NODE 03 :: GHOSTLINE ACTIVE]
        </h2>
        <div className="text-sm opacity-70" aria-live="polite" aria-atomic="true">
          {time.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
        <div className="space-y-1">
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="sysop-label">
              Sysop:
            </span>
            <span aria-labelledby="sysop-label">FLOAT-evan-thread</span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="channel-label">
              Channel:
            </span>
            <span aria-labelledby="channel-label">/ghosts/trace/01</span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="session-label">
              Session:
            </span>
            <span aria-labelledby="session-label">ghost-trace.init</span>
          </div>
        </div>

        <div className="space-y-1 mt-2 sm:mt-0">
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="connection-label">
              Connection:
            </span>
            <span aria-labelledby="connection-label" className="break-words">
              2400 baud | parity: none
            </span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="status-label">
              Status:
            </span>
            <span aria-labelledby="status-label" className="flex items-center">
              <span
                className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"
                aria-hidden="true"
              ></span>
              Active
            </span>
          </div>
          <div className="flex flex-wrap">
            <span className="w-24 sm:w-32 opacity-70" id="shortcut-label">
              Ctrl+G:
            </span>
            <span aria-labelledby="shortcut-label">Toggle Ghost Metadata</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const Terminal = memo(TerminalComponent)

