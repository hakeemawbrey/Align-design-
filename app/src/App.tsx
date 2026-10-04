import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhoneFrame from './components/PhoneFrame'
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
import Onboarding from './screens/Onboarding'
import Founding from './screens/Founding'
import Paywall from './screens/Paywall'
import You from './screens/You'
import Club from './screens/Club'
import { sfx } from './lib/sfx'

const SCREENS: Record<ScreenId, React.ComponentType<{ go: (id: ScreenId) => void }>> = {
  splash: Splash, welcome: Welcome, dealing: Dealing, deck: Deck, match: Match,
  reveal: Reveal, chat: Chat, alignment: Alignment, spent: Spent,
  matches: Matches, trade: Trade,
  onboarding: Onboarding, founding: Founding, paywall: Paywall, you: You, club: Club,
}

/** Keyboard jump order for recording: 1–9, then 0 */
const ORDER: ScreenId[] = ['splash', 'welcome', 'dealing', 'deck', 'match', 'reveal', 'chat', 'alignment', 'spent', 'matches']
const ALL: ScreenId[] = [...ORDER, 'trade', 'onboarding', 'founding', 'paywall', 'you', 'club']
/** letter shortcuts for screens beyond 0–9 */
const LETTERS: Record<string, ScreenId> = { o: 'onboarding', f: 'founding', p: 'paywall', y: 'you', c: 'club' }

function initialScreen(): ScreenId {
  const h = window.location.hash.replace('#', '') as ScreenId
  return ALL.includes(h) ? h : 'splash'
}

export default function App() {
  const [screen, setScreen] = useState<ScreenId>(initialScreen)
  // bump to force a full remount (restart the demo from any screen)
  const [run, setRun] = useState(0)

  const go = useCallback((id: ScreenId) => {
    setScreen(id)
    history.replaceState(null, '', `#${id}`)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const n = e.key === '0' ? 10 : Number(e.key)
      const restart = (id: ScreenId) => { resetBinder(); resetSession(); setRun((r) => r + 1); go(id) }
      const k = e.key.toLowerCase()
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (n >= 1 && n <= ORDER.length) restart(ORDER[n - 1])
      else if (k === 'b') restart('matches')
      else if (k === 'r') restart('splash')
      else if (LETTERS[k]) restart(LETTERS[k])
      if (e.key === 'm' || e.key === 'M') sfx.setMuted(!sfx.isMuted())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const Screen = SCREENS[screen]

  return (
    <PhoneFrame>
      <AnimatePresence mode="sync">
        <motion.div
          key={`${screen}-${run}`}
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Screen go={go} />
        </motion.div>
      </AnimatePresence>
      <StatusBar />
      <HomeIndicator />
    </PhoneFrame>
  )
}
