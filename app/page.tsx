"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "@/context/theme-context"
import { GhostProvider, useGhost } from "@/context/ghost-context"
import { TerminalProvider } from "@/context/terminal-context"
import { announceToScreenReader } from "@/lib/accessibility"
import { TerminalHeader } from "@/components/terminal/terminal-header"
import { TerminalInfo } from "@/components/terminal/terminal-info"
import { TerminalInput } from "@/components/terminal/terminal-input"
import { EchoReader } from "@/components/ghost/echo-reader"
import { GhostMetadata } from "@/components/ghost/ghost-metadata"
import { BackgroundGrid } from "@/components/ui/background-grid"
import { SkipLink } from "@/components/ui/skip-link"
import { LoadingScreen } from "@/components/ui/loading-screen"

// Lazy load components that aren't immediately visible
const ScratchViewer = dynamic(() => import("@/components/viewer/scratch-viewer"), {
  loading: () => (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="animate-pulse text-xl">Loading viewer...</div>
    </div>
  ),
  ssr: false,
})

/**
 * Main application component
 */
export default function Home() {
  const { initialized } = useTheme()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  // Function to play whisper sound
  const playWhisper = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err)
        announceToScreenReader("Could not play whisper sound")
      })
      announceToScreenReader("Whisper sound playing")
    }
  }

  return (
    <GhostProvider>
      <div className="min-h-screen bg-black text-pink-500 font-mono relative overflow-x-hidden">
        <SkipLink />
        <BackgroundGrid />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10">
          {!initialized ? <LoadingScreen /> : <MainContent mainRef={mainRef} playWhisper={playWhisper} />}
        </div>

        <ViewerManager mainRef={mainRef} />

        <audio ref={audioRef} className="hidden" preload="none">
          <source src="/whisper.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </GhostProvider>
  )
}

/**
 * Main content component that renders when the application is initialized
 */
function MainContent({ mainRef, playWhisper }: { mainRef: React.RefObject<HTMLDivElement>; playWhisper: () => void }) {
  const { showMetadata } = useGhost()

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "g") {
        // This is handled in the GhostProvider
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <main id="main-content" ref={mainRef} tabIndex={-1} className="outline-none">
      <h1 className="sr-only">FLOAT BBS Terminal Interface - Ghost Trace 01</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 min-h-[calc(100vh-2rem)]">
        <div className={showMetadata ? "lg:col-span-9" : "lg:col-span-12"}>
          <section
            aria-labelledby="terminal-header"
            className="border border-pink-500/50 rounded-md p-2 sm:p-4 mb-3 sm:mb-4 bg-black/90 shadow-lg shadow-pink-500/20 overflow-hidden"
          >
            <TerminalHeader />
            <TerminalInfo />
          </section>

          <EchoReader />

          <TerminalProvider onWhisper={playWhisper}>
            <TerminalInput />
          </TerminalProvider>
        </div>

        {showMetadata && (
          <div className="lg:col-span-3">
            <GhostMetadata />
          </div>
        )}
      </div>
    </main>
  )
}

/**
 * Component that manages the ScratchViewer visibility
 */
function ViewerManager({ mainRef }: { mainRef: React.RefObject<HTMLDivElement> }) {
  const { showScratchViewer, setShowScratchViewer, currentScratch } = useGhost()

  return (
    <>
      {showScratchViewer && currentScratch && (
        <ScratchViewer
          imageUrl={currentScratch}
          onClose={() => {
            setShowScratchViewer(false)
            announceToScreenReader("Scratch viewer closed")
            // Return focus to main content
            if (mainRef.current) mainRef.current.focus()
          }}
        />
      )}
    </>
  )
}

