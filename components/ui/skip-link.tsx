/**
 * Skip link component for accessibility
 * Allows keyboard users to skip to the main content
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-black focus:text-pink-500 focus:outline-pink-500"
    >
      Skip to main content
    </a>
  )
}
