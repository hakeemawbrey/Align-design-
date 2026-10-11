import type { ScreenId } from '../../screens/types'

/**
 * Where a shared screen (sky, calendar, notifications) was opened from, so its
 * Back and tab bar return there. Read right after navigating; an entry older
 * than a moment is stale and the screen falls back to its default.
 */
const memo: Partial<Record<ScreenId, { from: ScreenId; at: number }>> = {}

export function goFrom(go: (id: ScreenId) => void, to: ScreenId, from: ScreenId) {
  memo[to] = { from, at: Date.now() }
  go(to)
}

export function cameFrom(screen: ScreenId, fallback: ScreenId): ScreenId {
  const m = memo[screen]
  return m && Date.now() - m.at < 1500 ? m.from : fallback
}

/**
 * The screen that first opened Today's sky (deck, you or notifications).
 * Sky → Calendar → Sky keeps it, so Back from the sky still lands where the
 * person started.
 */
export const skyTrail: { from: ScreenId } = { from: 'deck' }
