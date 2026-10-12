import type { ScreenId } from '../screens/types'
import type { CaptureShot, PageDef } from './types'
import * as onboard from './onboard'
import * as chat from './chat'
import * as signin from './signin'
import * as account from './account'
import * as plus from './plus'
import * as legal from './legal'

const GROUPS = { onboard, chat, signin, account, plus, legal }

export const PAGES: Record<string, PageDef> = Object.assign({}, ...Object.values(GROUPS).map((g) => g.PAGES))

/** capture list per group, in the order of the master Figma page's to-build sections */
export const SHOTS: Record<keyof typeof GROUPS, CaptureShot[]> = Object.fromEntries(
  Object.entries(GROUPS).map(([k, g]) => [k, g.SHOTS]),
) as Record<keyof typeof GROUPS, CaptureShot[]>

/** 'x/settings' → { page: 'settings' }, 'x/reveal/leo' → { page: 'reveal', arg: 'leo' } */
export function parsePage(id: ScreenId): { page: string; arg?: string } | null {
  if (!id.startsWith('x/')) return null
  const [page, ...rest] = id.slice(2).split('/')
  return PAGES[page] ? { page, arg: rest.length ? rest.join('/') : undefined } : null
}

/** where a page goes back to: set by App each time a page opens */
export const pageTrail: { from: ScreenId } = { from: 'you' }
