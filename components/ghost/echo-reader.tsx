"use client"

import { memo } from "react"
import { useGhost } from "@/context/ghost-context"
import { copyToClipboard } from "@/lib/accessibility"
import { LogItem } from "@/components/ghost/log-item"
import { Headphones } from "lucide-react"

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

  // Count audio logs
  const audioLogCount = logs.filter((log) => log.type === "audio").length

  return (
    <section
      aria-labelledby="echo-reader-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 mb-3 sm:mb-4 bg-black/90 shadow-lg shadow-pink-500/20 overflow-y-auto max-h-[40vh] sm:max-h-[60vh]"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 id="echo-reader-header" className="text-lg sm:text-xl font-bold tracking-wider break-words">
          [ECHO READER :: GHOST-TRACE.01]
        </h2>

        {audioLogCount > 0 && (
          <div className="flex items-center text-xs bg-pink-500/20 px-2 py-1 rounded">
            <Headphones size={12} className="mr-1" />
            <span>
              {audioLogCount} Audio Log{audioLogCount !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

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
