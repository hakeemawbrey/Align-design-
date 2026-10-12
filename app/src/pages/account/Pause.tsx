import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { CARD_BG, CARD_LINE, PageShell } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import { sfx } from '../../lib/sfx'
import { account, useAccount } from './store'
import { useToast } from './bits'

function Option({ title, body, on, onClick }: { title: string; body: string; on?: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={() => { sfx.tap(); onClick() }} whileTap={{ scale: 0.985 }}
      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '16px 16px 15px', borderRadius: 16, background: CARD_BG, border: on ? '1px solid rgba(239,230,214,0.45)' : CARD_LINE, marginBottom: 12 }}>
      <span className="serif italic" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 21, color: 'var(--label-1)' }}>
        {title}
        {on && <span className="mono" style={{ fontStyle: 'normal', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-2)' }}>ON NOW</span>}
      </span>
      <span style={{ display: 'block', marginTop: 6, fontSize: 13.5, lineHeight: 1.5, color: 'var(--label-2)' }}>{body}</span>
    </motion.button>
  )
}

/** G-08 · Pause / Delete */
export default function Pause({ go, back }: PageProps) {
  const { paused } = useAccount()
  const [toast, show] = useToast()
  const togglePause = () => {
    account.patch({ paused: !paused })
    show(paused ? 'You’re back in the decks tonight.' : 'Paused. Your card is out of every deck.')
  }

  return (
    <>
      <PageShell onBack={back} topBar="Pause or delete" align="center" eyebrow="Stepping back" title="Rest, or dissolve entirely." titleSize={28}
        cta={{ label: paused ? 'Unpause my card' : 'Pause my card', onClick: togglePause }}>
        <div style={{ textAlign: 'left', marginTop: 8 }}>
          <Option title="Pause" on={paused} onClick={togglePause}
            body="Your card leaves the decks. Chart, matches and journal wait for you. Come back anytime." />
          <Option title="Delete" onClick={() => go('x/delete-confirm')}
            body="Everything goes: chart, matches, club posts. Seven days to change your mind, then it’s gone." />
        </div>
        <p style={{ margin: '14px auto 0', maxWidth: 300, fontSize: 13.5, lineHeight: 1.5, color: 'var(--label-3)' }}>
          If you’re leaving because of someone, block them instead. They’ll never know.
        </p>
      </PageShell>

      {/* quiet links above the CTA */}
      <motion.button {...rise(0.45, 6)} onClick={() => { sfx.tap(); go('x/privacy') }}
        style={{ position: 'absolute', left: 0, right: 0, top: 628, textAlign: 'center', fontSize: 13, color: 'var(--label-3)' }}>
        Terms, privacy and your data
      </motion.button>
      <motion.div {...rise(0.5, 10)} style={{ position: 'absolute', left: 38, width: 314, top: 670 }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); go('x/delete-confirm') }}
          className="serif italic"
          style={{ width: '100%', height: 54, borderRadius: 999, border: '1px solid rgba(239,230,214,0.32)', background: 'rgba(40,26,78,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', fontSize: 19, color: 'var(--label-1)' }}>
          Delete my account
        </motion.button>
      </motion.div>
      {toast}
    </>
  )
}
