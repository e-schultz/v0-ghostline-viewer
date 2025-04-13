"use client"

import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from "react"

type AudioContextType = {
  currentlyPlaying: string | null
  play: (id: string) => void
  pause: () => void
  isPlaying: (id: string) => boolean
  registerAudio: (id: string, audioElement: HTMLAudioElement) => void
  unregisterAudio: (id: string) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioElements = useRef<Map<string, HTMLAudioElement>>(new Map())

  const registerAudio = useCallback((id: string, audioElement: HTMLAudioElement) => {
    console.log(`Registering audio element: ${id}`)
    audioElements.current.set(id, audioElement)
  }, [])

  const unregisterAudio = useCallback((id: string) => {
    console.log(`Unregistering audio element: ${id}`)
    audioElements.current.delete(id)
  }, [])

  const play = useCallback(
    (id: string) => {
      console.log(`Attempting to play audio: ${id}`)
      console.log(`Available audio elements: ${Array.from(audioElements.current.keys()).join(", ")}`)

      // Pause currently playing audio if different
      if (currentlyPlaying && currentlyPlaying !== id) {
        const currentAudio = audioElements.current.get(currentlyPlaying)
        if (currentAudio) {
          console.log(`Pausing currently playing audio: ${currentlyPlaying}`)
          currentAudio.pause()
        }
      }

      // Play the requested audio
      const audioToPlay = audioElements.current.get(id)
      if (audioToPlay) {
        console.log(`Playing audio: ${id}`)
        audioToPlay.play().catch((error) => {
          console.error(`Error playing audio ${id}:`, error)
        })
        setCurrentlyPlaying(id)
      } else {
        console.error(`Audio element not found for ID: ${id}`)
      }
    },
    [currentlyPlaying],
  )

  const pause = useCallback(() => {
    if (currentlyPlaying) {
      console.log(`Pausing audio: ${currentlyPlaying}`)
      const currentAudio = audioElements.current.get(currentlyPlaying)
      if (currentAudio) {
        currentAudio.pause()
      }
      setCurrentlyPlaying(null)
    }
  }, [currentlyPlaying])

  const isPlaying = useCallback(
    (id: string) => {
      return currentlyPlaying === id
    },
    [currentlyPlaying],
  )

  return (
    <AudioContext.Provider
      value={{
        currentlyPlaying,
        play,
        pause,
        isPlaying,
        registerAudio,
        unregisterAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
