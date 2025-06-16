"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { GhostEntry } from "@/types/ghost"

type GhostContextType = {
  showMetadata: boolean
  toggleMetadata: () => void
  showScratchViewer: boolean
  setShowScratchViewer: (value: boolean) => void
  currentScratch: string | null
  setCurrentScratch: (value: string | null) => void
  logs: GhostEntry[]
  toggleLogExpand: (index: number) => void
}

const GhostContext = createContext<GhostContextType | undefined>(undefined)

export function GhostProvider({ children }: { children: ReactNode }) {
  const [showMetadata, setShowMetadata] = useState(false)
  const [showScratchViewer, setShowScratchViewer] = useState(false)
  const [currentScratch, setCurrentScratch] = useState<string | null>(null)
  const [logs, setLogs] = useState<GhostEntry[]>([
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

  const toggleMetadata = useCallback(() => {
    setShowMetadata((prev) => !prev)
  }, [])

  const toggleLogExpand = useCallback((index: number) => {
    setLogs((prevLogs) => prevLogs.map((log, i) => (i === index ? { ...log, expanded: !log.expanded } : log)))
  }, [])

  return (
    <GhostContext.Provider
      value={{
        showMetadata,
        toggleMetadata,
        showScratchViewer,
        setShowScratchViewer,
        currentScratch,
        setCurrentScratch,
        logs,
        toggleLogExpand,
      }}
    >
      {children}
    </GhostContext.Provider>
  )
}

export function useGhost() {
  const context = useContext(GhostContext)
  if (context === undefined) {
    throw new Error("useGhost must be used within a GhostProvider")
  }
  return context
}

