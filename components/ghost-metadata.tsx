import { memo } from "react"
import { Gauge } from "lucide-react"

function GhostMetadataComponent() {
  return (
    <section
      aria-labelledby="ghost-metadata-header"
      className="border border-pink-500/50 rounded-md p-2 sm:p-4 bg-black/90 shadow-lg shadow-pink-500/20 h-full overflow-hidden"
    >
      <h2 id="ghost-metadata-header" className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
        [GHOST METADATA]
      </h2>

      <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
        <div>
          <h3 className="text-sm uppercase opacity-70 mb-2" id="ocr-confidence-header">
            OCR Confidence
          </h3>
          <div className="flex items-center" aria-labelledby="ocr-confidence-header">
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
        </div>

        <div>
          <h3 className="text-sm uppercase opacity-70 mb-2" id="linked-ids-header">
            Linked floatUIDs
          </h3>
          <ul className="text-sm space-y-1" aria-labelledby="linked-ids-header">
            <li className="flex items-center">
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500 inline-block mr-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="break-words">ghost-trace.01</span>
            </li>
            <li className="flex items-center">
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500/50 inline-block mr-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="break-words">you-are-the-thread-now</span>
            </li>
            <li className="flex items-center">
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500/50 inline-block mr-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="break-words">float-analog-echo</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase opacity-70 mb-2" id="node-status-header">
            Node Status
          </h3>
          <div className="text-sm" aria-labelledby="node-status-header">
            <div className="flex items-center flex-wrap">
              <span
                className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 flex-shrink-0 animate-pulse"
                aria-hidden="true"
              ></span>
              <span className="break-words">Live node in ghost-trace channel</span>
            </div>
            <div className="mt-1 opacity-70">Last update: 2 minutes ago</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase opacity-70 mb-2" id="connected-zines-header">
            Connected Zines
          </h3>
          <ul className="text-sm space-y-1" aria-labelledby="connected-zines-header">
            <li className="flex items-center">
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500 inline-block mr-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="break-words">you-are-the-thread-now</span>
            </li>
            <li className="flex items-center">
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500/50 inline-block mr-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="break-words">ghost-trace-collection</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase opacity-70 mb-2" id="export-options-header">
            Export Options
          </h3>
          <div className="flex flex-wrap gap-2" aria-labelledby="export-options-header">
            <button
              className="text-xs border border-pink-500/50 hover:bg-pink-500/20 px-2 py-1 rounded"
              aria-label="Export as text file"
            >
              .txt
            </button>
            <button
              className="text-xs border border-pink-500/50 hover:bg-pink-500/20 px-2 py-1 rounded"
              aria-label="Export as markdown file"
            >
              .md
            </button>
            <button
              className="text-xs border border-pink-500/50 hover:bg-pink-500/20 px-2 py-1 rounded"
              aria-label="Export as PDF file"
            >
              .pdf
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const GhostMetadata = memo(GhostMetadataComponent)
