"use client"

import type React from "react"

import { useState, useCallback, memo } from "react"
import { ChevronRight, Eye, Copy } from "lucide-react"

type LogEntry = {
  id: string
  date: string
  title: string
  content: string
  imageUrl: string
  expanded?: boolean
}

type EchoReaderProps = {
  onViewOriginal: (imageUrl: string) => void
}

// Create a memoized LogItem component to optimize rendering
const LogItem = memo(
  ({
    log,
    index,
    toggleExpand,
    onViewOriginal,
    copyToClipboard,
  }: {
    log: LogEntry
    index: number
    toggleExpand: (index: number) => void
    onViewOriginal: (imageUrl: string) => void
    copyToClipboard: (text: string) => void
  }) => {
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleExpand(index)
      }
    }

    return (
      <div className="border border-pink-500/30 rounded p-2 overflow-hidden mb-3">
        <div
          className="flex items-center cursor-pointer hover:bg-pink-500/10 p-2 rounded flex-wrap"
          onClick={() => toggleExpand(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
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
                onClick={() => copyToClipboard(log.content)}
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
  },
)

LogItem.displayName = "LogItem"

function EchoReaderComponent({ onViewOriginal }: EchoReaderProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "01",
      date: "April 1st - 2:00am",
      title: "ghost-trace init",
      content:
        "- session closed, pizza\non, trying a thought →\npen x paper first, rn I\nwant to digitally captive\ncan AI read my scratch?",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3981-gM5fnotxeTE15Sa2Gbbbgpg7Cn1XwG.jpeg",
      expanded: false,
    },
    {
      id: "01",
      date: "April 1st",
      title: "Continued",
      content:
        "that's pretty cool. thought\nmy writing would be too\nmessy, I guess time\nwill tell depending on\nhow creative I get w/\nmy format\n\n☐ late night eats\n☑ keep writing\n☐ tidy my space",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3982-hDXKRG6hfUqBDvSlfkqMyQA0z44YPk.jpeg",
      expanded: false,
    },
    {
      id: "01",
      date: "April 1st",
      title: "Part y how I work",
      content: "is kinda captive rn\n& resurface later.\nbut what happens if\nanalog?",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3984-uZnSqRye4fe0kwtuvkJAQfNwQE83xp.jpeg",
      expanded: false,
    },
    {
      id: "01",
      date: "April 1st",
      title: "Test Results",
      content:
        "so the thought\nhere is I can\norganize my notes\nfor reference by\nID → curious to\nsee how FLOAT\nwill parse this",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3983-5zpgSfVuqswGjqS8atVRpZy8DkTEsw.jpeg",
      expanded: false,
    },
  ])

  const toggleExpand = useCallback((index: number) => {
    setLogs((prevLogs) => prevLogs.map((log, i) => (i === index ? { ...log, expanded: !log.expanded } : log)))
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    // Create a temporary element for screen reader announcement
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.classList.add("sr-only")
    announcement.textContent = "Text copied to clipboard"
    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  return (
    <section
      aria-labelledby="echo-reader-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 mb-3 sm:mb-4 bg-black/90 shadow-lg shadow-pink-500/20 overflow-y-auto max-h-[40vh] sm:max-h-[60vh]"
    >
      <h2 id="echo-reader-header" className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
        [ECHO READER :: GHOST-TRACE.01]
      </h2>

      <div>
        {logs.map((log, index) => (
          <LogItem
            key={`${log.id}-${index}`}
            log={log}
            index={index}
            toggleExpand={toggleExpand}
            onViewOriginal={onViewOriginal}
            copyToClipboard={copyToClipboard}
          />
        ))}
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const EchoReader = memo(EchoReaderComponent)

