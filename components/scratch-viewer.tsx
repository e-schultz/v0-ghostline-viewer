"use client"

import { useState, useRef, useEffect, memo } from "react"
import { X, ArrowLeft, ArrowRight } from "lucide-react"

type ScratchViewerProps = {
  imageUrl: string
  onClose: () => void
}

function ScratchViewerComponent({ imageUrl, onClose }: ScratchViewerProps) {
  const [showParsed, setShowParsed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)

  // Set up focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Focus the close button when the component mounts
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [])

  // Memoize the parsed and OCR text to prevent recalculation on re-renders
  const parsedText = `# ghost-trace.init
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

  const ocrText = `April 1st - ghost-trace init
-2:00am, -session closed, pizza
on, trying a thought →
pen x paper first, rn I
want to digitally captive
can AI read my scratch?

Confirmed

that's pretty cool. thought
my writing would be too
messy, I guess time
will tell depending on
how creative I get w/
my format

☐ late night eats
☑ keep writing
☐ tidy my space`

  return (
    <div
      ref={viewerRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 overflow-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scratch-viewer-title"
    >
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="text-pink-500 hover:text-pink-300 p-2"
          aria-label="Close viewer"
          data-viewer-close
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="w-full max-w-4xl">
        <h2 id="scratch-viewer-title" className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
          [SCRATCH VIEWER :: ORIGINAL ↔ PARSED]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="border border-pink-500/50 rounded-md overflow-hidden relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-pulse text-pink-500">Loading image...</div>
              </div>
            )}
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Original handwritten note from ghost-trace"
              className="w-full h-auto"
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs">Original Analog Scratch</div>
          </div>

          <div className="border border-pink-500/50 rounded-md p-2 sm:p-4 bg-black/90 flex flex-col">
            <div
              className="flex-1 font-mono whitespace-pre-wrap text-sm overflow-auto"
              aria-live="polite"
              aria-atomic="true"
            >
              {showParsed ? parsedText : ocrText}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs opacity-70">{showParsed ? "FLOAT Markdown" : "OCR Text"}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => setShowParsed(!showParsed)}
                    className="flex items-center text-xs hover:bg-pink-500/20 p-1 rounded"
                    aria-pressed={showParsed}
                    aria-label={showParsed ? "Show OCR text" : "Show parsed markdown"}
                  >
                    {showParsed ? (
                      <>
                        <ArrowLeft size={14} className="mr-1 flex-shrink-0" aria-hidden="true" />
                        Show OCR
                      </>
                    ) : (
                      <>
                        <ArrowRight size={14} className="mr-1 flex-shrink-0" aria-hidden="true" />
                        Show Parsed
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div
                className="w-full bg-pink-500/20 rounded-full h-1 mt-2"
                role="progressbar"
                aria-valuenow={showParsed ? 100 : 50}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Parse progress"
              >
                <div
                  className="bg-pink-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: showParsed ? "100%" : "50%" }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export const ScratchViewer = memo(ScratchViewerComponent)

