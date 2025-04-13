import { memo } from "react"

/**
 * Background grid component
 * Creates a dotted background pattern
 */
function BackgroundGridComponent() {
  return (
    <div
      className="fixed inset-0 z-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(236, 72, 153, 0.2) 1px, transparent 1px)`,
        backgroundSize: "clamp(10px, 2vw, 20px) clamp(10px, 2vw, 20px)",
      }}
      aria-hidden="true"
    ></div>
  )
}

// Use memo to prevent unnecessary re-renders
export const BackgroundGrid = memo(BackgroundGridComponent)
