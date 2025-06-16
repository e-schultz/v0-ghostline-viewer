import { FloatLogo } from "@/components/ui/float-logo"

/**
 * Loading screen component displayed during initialization
 */
export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen" role="status" aria-live="polite">
      <div className="animate-pulse text-xl sm:text-2xl mb-4 text-center">Initializing ghost-trace.init...</div>
      <FloatLogo />
    </div>
  )
}
