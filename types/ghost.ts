/**
 * Represents a log entry in the ghost trace system
 */
export interface GhostEntry {
  /** Unique identifier for the entry */
  id: string

  /** Date when the entry was created */
  date: string

  /** Title of the entry */
  title: string

  /** Content of the entry */
  content: string

  /** URL to the original image */
  imageUrl: string

  /** Whether the entry is expanded in the UI */
  expanded?: boolean
}

/**
 * Props for the ScratchViewer component
 */
export interface ScratchViewerProps {
  /** URL of the image to display */
  imageUrl: string

  /** Function to call when the viewer is closed */
  onClose: () => void
}

/**
 * Props for the EchoReader component
 */
export interface EchoReaderProps {
  /** Function to call when the user wants to view the original image */
  onViewOriginal: (imageUrl: string) => void
}

/**
 * Props for the TerminalInput component
 */
export interface TerminalInputProps {
  /** Function to call when the whisper command is executed */
  onWhisper: () => void
}

