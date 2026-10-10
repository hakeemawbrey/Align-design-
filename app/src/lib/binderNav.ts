import type { ScreenId } from '../screens/types'

/**
 * One binder, reached from everywhere: the deck's hand widget, the chat's
 * card button, the You tab and the Matches binder pages. These remember where
 * you came from so Back returns there, and which part of it to open.
 */
let from: ScreenId = 'you'
let tab: 'packs' | 'sets' | 'season' = 'packs'
let pages = false

export const binderNav = {
  /** open the binder (packs, sets, season) from a screen */
  open(go: (id: ScreenId) => void, here: ScreenId, at: typeof tab = 'packs') { from = here; tab = at; go('collection') },
  /** open the people pages (traded copies) on the Matches tab */
  pages(go: (id: ScreenId) => void) { pages = true; go('matches') },
  backTo: () => from,
  tab: () => tab,
  /** read once: did someone ask for the people pages? */
  takePages() { const p = pages; pages = false; return p },
}
