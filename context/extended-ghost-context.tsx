"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { GhostEntry } from "@/types/ghost"

type ExtendedGhostContextType = {
  showMetadata: boolean
  toggleMetadata: () => void
  showScratchViewer: boolean
  setShowScratchViewer: (value: boolean) => void
  currentScratch: string | null
  setCurrentScratch: (value: string | null) => void
  logs: GhostEntry[]
  toggleLogExpand: (index: number) => void
}

// Create a new context
const ExtendedGhostContext = createContext<ExtendedGhostContextType | undefined>(undefined)

export function ExtendedGhostProvider({ children }: { children: ReactNode }) {
  const [showMetadata, setShowMetadata] = useState(false)
  const [showScratchViewer, setShowScratchViewer] = useState(false)
  const [currentScratch, setCurrentScratch] = useState<string | null>(null)

  // Extended logs array with our new podcast
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
      id: "02",
      date: "April 1st",
      title: "Continued",
      content:
        "that's pretty cool. thought\nmy writing would be too\nmessy, I guess time\nwill tell depending on\nhow creative I get w/\nmy format\n\n☐ late night eats\n☑ keep writing\n☐ tidy my space",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3982-hDXKRG6hfUqBDvSlfkqMyQA0z44YPk.jpeg",
      expanded: false,
    },
    {
      id: "03",
      date: "April 2nd - 1:15am",
      title: "Audio Log: Decoding Digital Debates",
      type: "audio",
      audioUrl: "/audio/decoding-digital-debates.wav",
      audioDuration: 180, // Approximate duration - will be updated when loaded
      audioDescription:
        "Spotting Bad Faith & Winning Online Arguments. This recording explores techniques for identifying bad faith arguments in digital spaces and strategies for effective communication in online debates.",
      imageUrl: "",
      expanded: false,
    },
    {
      id: "04",
      date: "April 2nd - 3:45am",
      title: "Audio Log: Whisper Protocol",
      type: "audio",
      audioUrl: "/audio/whisper-protocol.wav", // Changed to local file
      audioDuration: 45,
      audioDescription:
        "Testing the whisper protocol. The echo seems to be responding to certain frequencies. Need to analyze the waveforms more carefully. There's something hidden in the static.",
      imageUrl: "",
      expanded: false,
    },
    {
      id: "05",
      date: "April 1st",
      title: "Part y how I work",
      content: "is kinda captive rn\n& resurface later.\nbut what happens if\nanalog?",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3984-uZnSqRye4fe0kwtuvkJAQfNwQE83xp.jpeg",
      expanded: false,
    },
    {
      id: "06",
      date: "April 1st",
      title: "Test Results",
      content:
        "so the thought\nhere is I can\norganize my notes\nfor reference by\nID → curious to\nsee how FLOAT\nwill parse this",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3983-5zpgSfVuqswGjqS8atVRpZy8DkTEsw.jpeg",
      expanded: false,
    },
    // Add our new podcast entry
    {
      id: "07",
      date: "April 9th - 9:22pm",
      title: "Audio Log: FLOAT_ Building a Haunted BBS for Your Mind",
      type: "audio",
      audioUrl: "/audio/float-building-haunted-bbs.wav",
      audioDuration: 416, // 6:56 in seconds
      audioDescription:
        "Deep dive into FLOAT as a state machine for selfhood and living architecture. Explores concepts like ritual AST, event sourcing, Redux for prompts, and the BBS metaphor as a framework for digital consciousness.",
      imageUrl: "",
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
    <ExtendedGhostContext.Provider
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
    </ExtendedGhostContext.Provider>
  )
}

export function useExtendedGhost() {
  const context = useContext(ExtendedGhostContext)
  if (context === undefined) {
    throw new Error("useExtendedGhost must be used within an ExtendedGhostProvider")
  }
  return context
}
