import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhoneFrame, { isAppMode } from './components/PhoneFrame'
import StatusBar from './components/StatusBar'
import HomeIndicator from './components/HomeIndicator'
import type { ScreenId } from './screens/types'
import Splash from './screens/Splash'
import Welcome from './screens/Welcome'
import Dealing from './screens/Dealing'
import Deck from './screens/Deck'
import Match from './screens/Match'
import Reveal from './screens/Reveal'
import Chat from './screens/Chat'
import Alignment from './screens/Alignment'
import Spent from './screens/Spent'
import Matches from './screens/Matches'
import Trade from './screens/Trade'
import { resetBinder } from './lib/binder'
import { resetSession } from './lib/session'
import { RESET_EVENT } from './lib/demo'
import { api } from './api'
import NoticeBanner from './components/NoticeBanner'
import { resetTalk } from './lib/talk'
import Onboarding from './screens/Onboarding'
import Founding from './screens/Founding'
import Paywall from './screens/Paywall'
import You from './screens/You'
import Club from './screens/Club'
import Sky from './screens/Sky'
import Calendar from './screens/Calendar'
import Chart from './screens/Chart'
import Block from './screens/Block'
import Notifications from './screens/Notifications'
import Thread from './screens/Thread'
import Collection from './screens/Collection'
import HowToPlay from './screens/HowToPlay'
import { sfx } from './lib/sfx'
import { PAGES, parsePage } from './pages/registry'
import { BETA, BETA_BLOCKED } from './lib/beta'
import { OPEN_SKY_EVENT } from './components/deck/SkyDropdown'
import BetaCalendar from './screens/BetaCalendar'
import BetaYou from './screens/BetaYou'
import BetaChart from './screens/BetaChart'
import BetaMatch from './screens/BetaMatch'

const SCREENS: Record<Exclude<ScreenId, `x/${string}`>, React.ComponentType<{ go: (id: ScreenId) => void }>> = {
  splash: Splash, welcome: Welcome, dealing: Dealing, deck: Deck, match: BETA ? BetaMatch : Match,
  reveal: Reveal, chat: Chat, alignment: Alignment, spent: Spent,
  matches: Matches, trade: Trade,
  onboarding: Onboarding, founding: Founding, paywall: Paywall, you: BETA ? BetaYou : You, club: Club, sky: Sky, calendar: BETA ? BetaCalendar : Calendar, chart: BETA ? BetaChart : Chart, block: Block, notifications: Notifications, thread: Thread, collection: Collection, howto: HowToPlay,
}

/** in the beta, a link to a left-out screen does nothing (today's sky opens the deck's sky panel) */
function betaRoute(id: ScreenId): ScreenId | null {
  if (!BETA) return id
  const page = parsePage(id)?.page
  if (!BETA_BLOCKED.has(id) && !(page && BETA_BLOCKED.has(`x/${page}`))) return id
  if (id === 'sky') { window.setTimeout(() => window.dispatchEvent(new Event(OPEN_SKY_EVENT)), 60); return 'deck' }
  return null
}

/** Keyboard jump order for recording: 1–9, then 0 */
const ORDER: ScreenId[] = ['splash', 'welcome', 'dealing', 'deck', 'match', 'reveal', 'chat', 'alignment', 'spent', 'matches']
const ALL: ScreenId[] = [...ORDER, 'trade', 'onboarding', 'founding', 'paywall', 'you', 'club', 'sky', 'calendar', 'chart', 'block', 'notifications', 'thread', 'collection', 'howto']
/** on a phone: real status bar and home indicator, no fake ones */
const APP = isAppMode()

/** shortcut jumps to these land after the match with Juniper */
const AFTER_MATCH: ScreenId[] = ['match', 'reveal', 'chat', 'alignment', 'spent', 'matches', 'trade']
/** letter shortcuts for screens beyond 0–9 */
const LETTERS: Record<string, ScreenId> = { o: 'onboarding', f: 'founding', p: 'paywall', y: 'you', c: 'club', s: 'sky', k: 'calendar', n: 'notifications', l: 'collection', h: 'howto' }

function initialScreen(): ScreenId {
  const h = window.location.hash.replace('#', '') as ScreenId
  // #reset: a link that always opens a fresh demo (state lives in memory, so a load is already clean)
  if ((h as string) === 'reset') return 'splash'
  return (ALL.includes(h) || parsePage(h)) && betaRoute(h) === h ? h : 'splash'
}

/** screens a page was opened from, so back() unwinds page → page → screen */
const trail: ScreenId[] = []

export default function App() {
  const [screen, setScreen] = useState<ScreenId>(initialScreen)
  const current = useRef(screen)
  // bump to force a full remount (restart the demo from any screen)
  const [run, setRun] = useState(0)

  const go = useCallback((to: ScreenId) => {
    const id = betaRoute(to)
    if (!id) return
    const cur = current.current
    if (parsePage(id)) { if (cur !== id) trail.push(cur) } else trail.length = 0
    current.current = id
    setScreen(id)
    // sandboxed hosts can refuse history writes; the app works without them
    try { history.replaceState(null, '', `#${id}`) } catch { /* ignore */ }
  }, [])

  // reset from inside the app (You → Reset demo, triple-tap the clock)
  useEffect(() => {
    const onReset = () => { resetBinder(); resetSession(); resetTalk(); void api.reset(); setRun((r) => r + 1); go('splash') }
    // #reset in the address bar, whether the page is loading or already open
    const onHash = () => { if (window.location.hash === '#reset') onReset() }
    window.addEventListener(RESET_EVENT, onReset)
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => { window.removeEventListener(RESET_EVENT, onReset); window.removeEventListener('hashchange', onHash) }
  }, [go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const n = e.key === '0' ? 10 : Number(e.key)
      const restart = (id: ScreenId) => {
        resetBinder(); resetSession(); resetTalk()
        // screens after the match expect Juniper to be matched already
        void api.reset().then(() => { if (AFTER_MATCH.includes(id)) return api.swipe('j27', 'align') })
        setRun((r) => r + 1); go(id)
      }
      const k = e.key.toLowerCase()
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (n >= 1 && n <= ORDER.length) restart(ORDER[n - 1])
      else if (k === 'b') restart('matches')
      else if (k === 'r') restart('splash')
      else if (LETTERS[k] && betaRoute(LETTERS[k]) === LETTERS[k]) restart(LETTERS[k])
      if (e.key === 'm' || e.key === 'M') sfx.setMuted(!sfx.isMuted())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const page = parsePage(screen)
  const back = () => {
    const to = trail.pop() ?? (page && PAGES[page.page].home) ?? 'you'
    current.current = to
    setScreen(to)
    try { history.replaceState(null, '', `#${to}`) } catch { /* ignore */ }
  }
  const Page = page ? PAGES[page.page].Component : null
  const Screen = SCREENS[screen as keyof typeof SCREENS]

  return (
    <PhoneFrame app={APP}>
      <AnimatePresence mode="sync">
        <motion.div
          key={`${screen}-${run}`}
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {Page ? <Page go={go} back={back} arg={page?.arg} /> : <Screen go={go} />}
        </motion.div>
      </AnimatePresence>
      <NoticeBanner go={go} />
      {!APP && <StatusBar />}
      {!APP && <HomeIndicator />}
    </PhoneFrame>
  )
}
