/**
 * Small localStorage wrapper. Storage can be missing or throw (private mode,
 * blocked site data), so every call is guarded and the app works without it.
 */
const PREFIX = 'align:'

export function load<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? undefined : (JSON.parse(raw) as T)
  } catch {
    return undefined
  }
}

export function save(key: string, value: unknown) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)) } catch { /* storage unavailable */ }
}

export function remove(key: string) {
  try { localStorage.removeItem(PREFIX + key) } catch { /* storage unavailable */ }
}
