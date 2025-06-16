"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useAudio } from "@/context/audio-context"
import { useGhost } from "@/context/ghost-context"

type TerminalContextType = {
  input: string
  setInput: (value: string) => void
  history: string[]
  historyIndex: number
  setHistoryIndex: (value: number) => void
  output: string
  executeCommand: (cmd: string) => void
  clearOutput: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children, onWhisper }: { children: ReactNode; onWhisper: () => void }) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string>("")
  const { play, pause, currentlyPlaying } = useAudio()
  const { logs } = useGhost()

  const clearOutput = useCallback(() => {
    setOutput("")
  }, [])

  const executeCommand = useCallback(
    (cmd: string) => {
      if (!cmd.trim()) return

      setHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)

      let response = ""

      // Check for play command
      if (cmd.toLowerCase().startsWith("/play")) {
        const parts = cmd.split(" ")
        if (parts.length > 1) {
          const id = parts[1]
          // Find the audio log and its index
          const audioLogIndex = logs.findIndex((log) => log.id === id && log.type === "audio")
          const audioLog = audioLogIndex !== -1 ? logs[audioLogIndex] : null

          if (audioLog) {
            response = `Playing audio log ${id}: ${audioLog.title}`
            // Use the correct audio element ID format with the actual index
            play(`audio-${id}-${audioLogIndex}-full`)
          } else {
            response = `No audio log found with ID: ${id}`
          }
        } else {
          response = "Usage: /play [ID] - Play an audio log by ID"
        }
      }
      // Check for stop command
      else if (cmd.toLowerCase() === "/stop") {
        if (currentlyPlaying) {
          pause()
          response = "Stopped audio playback"
        } else {
          response = "No audio is currently playing"
        }
      }
      // List audio logs
      else if (cmd.toLowerCase() === "/audio") {
        const audioLogs = logs.filter((log) => log.type === "audio")
        if (audioLogs.length > 0) {
          response = "Available audio logs:\n" + audioLogs.map((log) => `- ID:${log.id} - ${log.title}`).join("\n")
        } else {
          response = "No audio logs available"
        }
      }
      // Other commands
      else {
        switch (cmd.toLowerCase()) {
          case "help":
            response = `Available commands:
- help: Show this help message
- cat ghost-trace-01: Print the entire FLOAT markdown
- whisper.sh: Activate whisper echo
- clear: Clear the terminal output
- /play [ID]: Play an audio log by ID
- /stop: Stop audio playback
- /audio: List available audio logs
- /debates: Play the Decoding Digital Debates audio`
            break

          case "cat ghost-trace-01":
            response = `# ghost-trace.init
date: April 1st - 2:00am
status: session closed

Trying a thought → pen x paper first.
I want to digitally capture what I write.
Can AI read my scratch?

That's pretty cool. Thought my writing would be too messy.
I guess time will tell depending on how creative I get with my format.

## Tasks
- [ ] Late night eats
- [x] Keep writing
- [ ] Tidy my space

## ID:01 | Part y how I work
is kinda captive rn & resurface later.
but what happens if analog?`
            break

          case "whisper.sh":
            response = "Activating whisper echo..."
            setTimeout(() => {
              onWhisper()
            }, 100)
            break

          case "clear":
            clearOutput()
            return

          case "floatctl parse-id 01":
            response = "[output] FLOAT tracking ID:01 as active analog echo"
            break

          // Add this after the other command cases
          case "/debates":
            const debatesLogIndex = logs.findIndex((log) => log.title.includes("Decoding Digital Debates"))
            if (debatesLogIndex !== -1) {
              const debatesLog = logs[debatesLogIndex]
              response = `Playing audio log: ${debatesLog.title}`
              play(`audio-${debatesLog.id}-${debatesLogIndex}-full`)
            } else {
              response = "Debates audio log not found"
            }
            break

          default:
            response = `Command not found: ${cmd}. Type 'help' for available commands.`
        }
      }

      setOutput((prev) => (prev ? `${prev}\n\n> ${cmd}\n${response}` : `> ${cmd}\n${response}`))
    },
    [clearOutput, onWhisper, logs, play, pause, currentlyPlaying],
  )

  return (
    <TerminalContext.Provider
      value={{
        input,
        setInput,
        history,
        historyIndex,
        setHistoryIndex,
        output,
        executeCommand,
        clearOutput,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}
