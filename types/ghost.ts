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

  /** Type of the entry (text, audio) */
  type?: "text" | "audio"

  /** URL to the audio file if type is audio */
  audioUrl?: string

  /** Duration of the audio in seconds */
  audioDuration?: number

  /** Description of the audio content */
  audioDescription?: string
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

/**
 * Props for the AudioPlayer component
 */
export interface AudioPlayerProps {
  /** URL of the audio file */
  src: string

  /** ID of the audio entry */
  id: string

  /** Whether the player is in compact mode */
  compact?: boolean

  /** Duration of the audio in seconds */
  duration?: number

  /** Function to call when the audio starts playing */
  onPlay?: () => void
}
