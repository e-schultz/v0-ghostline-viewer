"use client"

import type React from "react"

import { memo } from "react"
import { ChevronRight, Eye, Copy } from "lucide-react"
import type { GhostEntry } from "@/types/ghost"

interface LogItemProps {
  log: GhostEntry
  index: number
  onToggle: () => void
  onViewOriginal: (imageUrl: string) => void
  onCopy: (text: string) => void
}

/**
 * Log Item component
 * Displays a single log entry with expandable content
 */
function LogItemComponent({ log, index, onToggle, onViewOriginal, onCopy }: LogItemProps) {
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div className="border border-pink-500/30 rounded p-2 overflow-hidden mb-3">
      <div
        className="flex items-center cursor-pointer hover:bg-pink-500/10 p-2 rounded flex-wrap"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={log.expanded}
        aria-controls={`log-content-${index}`}
        tabIndex={0}
        id={`log-header-${index}`}
      >
        <ChevronRight
          className={`mr-2 transition-transform flex-shrink-0 ${log.expanded ? "rotate-90" : ""}`}
          size={16}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0 mr-2">
          <span className="text-pink-300 mr-2">[ID:{log.id}]</span>
          <span className="break-words">{log.title}</span>
        </div>
        <span className="text-xs opacity-70 flex-shrink-0">{log.date}</span>
      </div>

      {log.expanded && (
        <div
          id={`log-content-${index}`}
          className="mt-2 pl-4 sm:pl-6 border-l border-pink-500/30 ml-2 overflow-x-auto"
          aria-labelledby={`log-header-${index}`}
        >
          <pre className="whitespace-pre-wrap font-mono text-sm mb-2 break-words">{log.content}</pre>

          <div className="flex flex-wrap gap-2 mt-2">
            <button
              className="text-xs flex items-center hover:bg-pink-500/20 p-1 rounded"
              onClick={() => onViewOriginal(log.imageUrl)}
              aria-label={`View original image for ${log.title}`}
            >
              <Eye size={14} className="mr-1 flex-shrink-0" aria-hidden="true" />
              View Original
            </button>

            <button
              className="text-xs flex items-center hover:bg-pink-500/20 p-1 rounded"
              onClick={() => onCopy(log.content)}
              aria-label={`Copy text content for ${log.title}`}
            >
              <Copy size={14} className="mr-1 flex-shrink-0" aria-hidden="true" />
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export const LogItem = memo(LogItemComponent)

