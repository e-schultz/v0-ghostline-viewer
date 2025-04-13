import type React from "react"
import { memo } from "react"
import { Gauge, Headphones, Clock } from "lucide-react"
import { useGhost } from "@/context/ghost-context"

/**
 * Ghost Metadata component
 * Displays metadata and information about the ghost trace
 */
function GhostMetadataComponent() {
  const { logs } = useGhost()

  // Calculate audio stats
  const audioLogs = logs.filter((log) => log.type === "audio")
  const totalAudioDuration = audioLogs.reduce((total, log) => total + (log.audioDuration || 0), 0)

  // Format total duration
  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <section
      aria-labelledby="ghost-metadata-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 bg-black/90 shadow-lg shadow-pink-500/20 h-full overflow-hidden"
    >
      <h2 id="ghost-metadata-header" className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
        [GHOST METADATA]
      </h2>

      <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
        <MetadataSection
          title="OCR Confidence"
          content={
            <>
              <div className="flex items-center">
                <Gauge className="mr-2 flex-shrink-0" size={18} aria-hidden="true" />
                <div
                  className="w-full bg-pink-500/20 rounded-full h-2"
                  role="progressbar"
                  aria-valuenow={93}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: "93%" }} aria-hidden="true"></div>
                </div>
                <span className="ml-2 text-sm">93%</span>
              </div>
              <div className="text-xs mt-1 opacity-70">Status: Legible</div>
            </>
          }
        />

        {audioLogs.length > 0 && (
          <MetadataSection
            title="Audio Logs"
            content={
              <>
                <div className="flex items-center">
                  <Headphones className="mr-2 flex-shrink-0" size={18} aria-hidden="true" />
                  <span className="text-sm">
                    {audioLogs.length} log{audioLogs.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="mr-2 flex-shrink-0" size={18} aria-hidden="true" />
                  <span className="text-sm">{formatTotalDuration(totalAudioDuration)} total</span>
                </div>
                <div className="text-xs mt-1 opacity-70">Use /play [ID] to play</div>
              </>
            }
          />
        )}

        <MetadataSection
          title="Linked floatUIDs"
          content={
            <ul className="text-sm space-y-1">
              <MetadataListItem text="ghost-trace.01" active />
              <MetadataListItem text="you-are-the-thread-now" />
              <MetadataListItem text="float-analog-echo" />
            </ul>
          }
        />

        <MetadataSection
          title="Node Status"
          content={
            <div className="text-sm">
              <div className="flex items-center flex-wrap">
                <span
                  className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 flex-shrink-0 animate-pulse"
                  aria-hidden="true"
                ></span>
                <span className="break-words">Live node in ghost-trace channel</span>
              </div>
              <div className="mt-1 opacity-70">Last update: 2 minutes ago</div>
            </div>
          }
        />

        <MetadataSection
          title="Connected Zines"
          content={
            <ul className="text-sm space-y-1">
              <MetadataListItem text="you-are-the-thread-now" active />
              <MetadataListItem text="ghost-trace-collection" />
            </ul>
          }
        />

        <MetadataSection
          title="Export Options"
          content={
            <div className="flex flex-wrap gap-2">
              <ExportButton format="txt" />
              <ExportButton format="md" />
              <ExportButton format="pdf" />
              {audioLogs.length > 0 && <ExportButton format="mp3" />}
            </div>
          }
        />
      </div>
    </section>
  )
}

/**
 * Metadata Section component
 * Displays a section of metadata with a title and content
 */
function MetadataSection({ title, content }: { title: string; content: React.ReactNode }) {
  const id = `${title.toLowerCase().replace(/\s+/g, "-")}-header`
  return (
    <div>
      <h3 className="text-sm uppercase opacity-70 mb-2" id={id}>
        {title}
      </h3>
      <div aria-labelledby={id}>{content}</div>
    </div>
  )
}

/**
 * Metadata List Item component
 * Displays a list item with an optional active state
 */
function MetadataListItem({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <li className="flex items-center">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-pink-500" : "bg-pink-500/50"
        } inline-block mr-2 flex-shrink-0`}
        aria-hidden="true"
      ></span>
      <span className="break-words">{text}</span>
    </li>
  )
}

/**
 * Export Button component
 * Button for exporting data in different formats
 */
function ExportButton({ format }: { format: string }) {
  return (
    <button
      className="text-xs border border-pink-500/50 hover:bg-pink-500/20 px-2 py-1 rounded"
      aria-label={`Export as ${format} file`}
    >
      .{format}
    </button>
  )
}

// Use memo to prevent unnecessary re-renders
export const GhostMetadata = memo(GhostMetadataComponent)
