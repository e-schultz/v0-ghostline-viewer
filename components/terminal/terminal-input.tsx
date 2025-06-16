"use client"

import type React from "react"

import { useRef, useEffect, memo } from "react"
import { ArrowRight } from "lucide-react"
import { useTerminal } from "@/context/terminal-context"

/**
 * Terminal input component
 * Allows users to enter and execute commands
 */
function TerminalInputComponent() {
  const { input, setInput, history, historyIndex, setHistoryIndex, output, executeCommand } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        executeCommand(input)
        setInput("")
        setHistoryIndex(-1)
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  // Scroll to bottom of output when it changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Focus input when clicked anywhere in the terminal section
  const handleSectionClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <section
      aria-labelledby="terminal-input-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 bg-black/90 shadow-lg shadow-pink-500/20"
      onClick={handleSectionClick}
    >
      <h2 id="terminal-input-header" className="sr-only">
        Terminal Input
      </h2>

      {output && (
        <div
          ref={outputRef}
          className="mb-3 sm:mb-4 font-mono whitespace-pre-wrap text-sm max-h-32 sm:max-h-40 overflow-y-auto break-words"
          aria-live="polite"
          aria-atomic="true"
          aria-relevant="additions"
          role="log"
        >
          {output}
        </div>
      )}

      <div className="flex items-center" role="form" aria-label="Command input">
        <span className="mr-2 text-pink-500 animate-pulse flex-shrink-0" aria-hidden="true">
          {">"}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-pink-500 font-mono min-w-0 w-full focus:ring-1 focus:ring-pink-500"
          placeholder="Type a command..."
          aria-label="Terminal command input"
          autoComplete="off"
        />
        <button
          onClick={() => {
            if (input.trim()) {
              executeCommand(input)
              setInput("")
            }
          }}
          className="text-pink-500 hover:text-pink-300 p-1 flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-pink-500"
          aria-label="Execute command"
        >
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="sr-only" aria-live="polite">
        Use up and down arrow keys to navigate command history
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const TerminalInput = memo(TerminalInputComponent)

