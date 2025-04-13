import type React from "react"
/**
 * Announces a message to screen readers using an ARIA live region
 * @param message The message to announce
 * @param priority The ARIA live priority (polite or assertive)
 */
export function announceToScreenReader(message: string, priority: "polite" | "assertive" = "polite") {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", priority)
  announcement.setAttribute("aria-atomic", "true")
  announcement.classList.add("sr-only")
  announcement.textContent = message
  document.body.appendChild(announcement)
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Copies text to clipboard and announces the action to screen readers
 * @param text The text to copy
 */
export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  announceToScreenReader("Text copied to clipboard")
}

/**
 * Sets focus to an element with a specific selector
 * @param selector The CSS selector for the element to focus
 * @param fallbackRef Optional ref to focus if selector isn't found
 */
export function setFocusToElement(selector: string, fallbackRef?: React.RefObject<HTMLElement>) {
  const element = document.querySelector(selector) as HTMLElement
  if (element) {
    element.focus()
  } else if (fallbackRef?.current) {
    fallbackRef.current.focus()
  }
}
