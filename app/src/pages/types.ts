import type { ScreenId } from '../screens/types'

/** Props every registered page gets. */
export interface PageProps {
  go: (id: ScreenId) => void
  /** return to wherever this page was opened from */
  back: () => void
  /** the part after x/<page>/ in the address, e.g. 'leo' in x/reveal/leo */
  arg?: string
}

export interface PageDef {
  /** design reference, e.g. 'G-07 — Settings' */
  ref: string
  Component: React.ComponentType<PageProps>
  /** screen to return to when the page was opened by address with no history */
  home?: ScreenId
}

/** One entry per design state, in design order. The capture script screenshots each hash. */
export interface CaptureShot {
  name: string
  /** address without '#', e.g. 'x/settings' or 'chat' */
  hash: string
  /** wait before the shot, ms (default 1600) */
  wait?: number
  /** session fields to set before loading (localStorage 'align:session:v1') */
  session?: Record<string, unknown>
}
