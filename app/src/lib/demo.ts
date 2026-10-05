/** Ask the app to restart the demo from the splash, with all state cleared. */
export const RESET_EVENT = 'align:reset'
export function resetDemo() {
  window.dispatchEvent(new Event(RESET_EVENT))
}
