"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

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

  const clearOutput = useCallback(() => {
    setOutput("")
  }, [])

  const executeCommand = useCallback(
    (cmd: string) => {
      if (!cmd.trim()) return

      setHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)

      let response = ""

      switch (cmd.toLowerCase()) {
        case "help":
          response = `Available commands:
- help: Show this help message
- cat ghost-trace-01: Print the entire FLOAT markdown
- whisper.sh: Activate whisper echo
- clear: Clear the terminal output`
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

        default:
          response = `Command not found: ${cmd}. Type 'help' for available commands.`
      }

      setOutput((prev) => (prev ? `${prev}\n\n> ${cmd}\n${response}` : `> ${cmd}\n${response}`))
    },
    [clearOutput, onWhisper],
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

