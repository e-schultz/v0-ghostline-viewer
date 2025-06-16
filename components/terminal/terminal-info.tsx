import { memo } from "react"

/**
 * Terminal information component
 * Displays system information and status
 */
function TerminalInfoComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
      <div className="space-y-1">
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="sysop-label">
            Sysop:
          </span>
          <span aria-labelledby="sysop-label">FLOAT-evan-thread</span>
        </div>
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="channel-label">
            Channel:
          </span>
          <span aria-labelledby="channel-label">/ghosts/trace/01</span>
        </div>
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="session-label">
            Session:
          </span>
          <span aria-labelledby="session-label">ghost-trace.init</span>
        </div>
      </div>

      <div className="space-y-1 mt-2 sm:mt-0">
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="connection-label">
            Connection:
          </span>
          <span aria-labelledby="connection-label" className="break-words">
            2400 baud | parity: none
          </span>
        </div>
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="status-label">
            Status:
          </span>
          <span aria-labelledby="status-label" className="flex items-center">
            <span
              className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"
              aria-hidden="true"
            ></span>
            Active
          </span>
        </div>
        <div className="flex flex-wrap">
          <span className="w-24 sm:w-32 opacity-70" id="shortcut-label">
            Ctrl+G:
          </span>
          <span aria-labelledby="shortcut-label">Toggle Ghost Metadata</span>
        </div>
      </div>
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export const TerminalInfo = memo(TerminalInfoComponent)

