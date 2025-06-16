"use client"

import { memo } from "react"
import { useGhost } from "@/context/ghost-context"
import { copyToClipboard } from "@/lib/accessibility"
import { LogItem } from "@/components/ghost/log-item"

/**
 * Echo Reader component
 * Displays ghost trace logs with expandable entries
 */
function EchoReaderComponent() {
  const { logs, toggleLogExpand, setShowScratchViewer, setCurrentScratch } = useGhost()

  const handleViewOriginal = (imageUrl: string) => {
    setCurrentScratch(imageUrl)
    setShowScratchViewer(true)
  }

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
            onToggle={() => toggleLogExpand(index)}
            onViewOriginal={handleViewOriginal}
            onCopy={copyToClipboard}
          />
        ))}
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const EchoReader = memo(EchoReaderComponent)

