import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import TabBar from '../../components/TabBar'
import { AuraAvatar } from '../../components/club/PostParts'
import { rise } from '../../components/onboarding/shared'
import { CARD_BG, CARD_LINE, Label } from '../../components/kit'
import { useSession } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { KIND_LABEL, TERMS, termFrom, type Term, type TermKind } from './terms'
import { Cta, Frame } from './ui'

const KINDS: TermKind[] = ['sign', 'element', 'house', 'planet']
/** the signs tab teases two locked words from further in the book */
const TEASE = ['saturn-return', 'seventh-house']

function Icon({ t, locked }: { t: Term; locked: boolean }) {
  if (locked) {
    return (
      <span style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'rgba(11,6,32,0.6)', boxShadow: 'inset 0 0 0 1px rgba(179,166,196,0.22)' }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, border: '1px solid rgba(179,166,196,0.4)', display: 'grid', placeItems: 'center' }}>
          <span style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.55)' }} />
        </span>
      </span>
    )
  }
  if (t.art.kind === 'aura') return <AuraAvatar sign={t.art.sign} size={36} />
  return (
    <span style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, display: 'grid', placeItems: 'center', background: `radial-gradient(circle at 35% 30%, ${t.color}, ${t.color}55 45%, #140a2e 80%)`, boxShadow: `0 0 12px ${t.color}55` }}>
      {t.art.kind === 'wheel' && <span className="mono" style={{ fontSize: 8.5, color: '#140a2e', fontWeight: 700 }}>{t.code.split(' ')[1]}</span>}
    </span>
  )
}

/** S-20 — Glossary: the language, as a cheat sheet. */
export default function Glossary({ go, back }: PageProps) {
  const { alignPlus } = useSession()
  const [kind, setKind] = useState<TermKind>('sign')
  const open = (t: Term) => (alignPlus || t.free)
  const unlocked = TERMS.filter(open).length

  const inTab = TERMS.filter((t) => t.kind === kind)
  const mine = inTab.filter(open)
  const locked = kind === 'sign' && !alignPlus ? TERMS.filter((t) => TEASE.includes(t.slug)) : inTab.filter((t) => !open(t))

  const tap = (t: Term) => {
    if (!open(t)) { go('paywall'); return }
    termFrom.at = Date.now()
    go(`x/term/${t.slug}`)
  }

  const row = (t: Term, i: number, isLocked: boolean) => (
    <motion.button key={t.slug} onClick={() => { sfx.tap(); tap(t) }} whileTap={{ scale: 0.985 }}
      style={{ width: '100%', minHeight: 56, display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', textAlign: 'left', borderTop: i ? '1px solid rgba(179,166,196,0.1)' : undefined }}>
      <Icon t={t} locked={isLocked} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="serif italic" style={{ display: 'block', fontSize: 17, lineHeight: 1.2, color: isLocked ? 'var(--label-3)' : 'var(--label-1)' }}>
          {t.name}{t.yours && !isLocked ? <> · {t.yours}</> : null}
        </span>
        <span style={{ display: 'block', fontSize: 12.5, marginTop: 2, color: isLocked ? 'var(--label-4)' : 'var(--label-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.line}</span>
      </span>
      {isLocked
        ? <span style={{ color: 'var(--align)', fontSize: 14 }}>✦</span>
        : <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="m1 1 5 5-5 5" /></svg>}
    </motion.button>
  )

  return (
    <Frame onBack={back} aurora="#2a1666" seed={88}>
      <motion.h1 className="h-display" {...rise(0.05, 8)} style={{ position: 'absolute', left: 52, top: 56, height: 40, display: 'flex', alignItems: 'center', fontSize: 31 }}>The language</motion.h1>
      <div className="mono" style={{ position: 'absolute', left: 54, top: 98, fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>
        CHEAT SHEET · {unlocked} OF {TERMS.length} UNLOCKED
      </div>

      <div style={{ position: 'absolute', left: 24, right: 24, top: 124, height: 34, padding: 3, borderRadius: 999, display: 'flex', background: 'rgba(24,12,56,0.55)', border: '1px solid rgba(179,166,196,0.22)' }}>
        {KINDS.map((k) => (
          <button key={k} onClick={() => { if (k !== kind) { sfx.tap(); setKind(k) } }} style={{ position: 'relative', flex: 1, height: '100%' }}>
            {k === kind && (
              <motion.div layoutId="gloss-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(120,96,170,0.55)' }} />
            )}
            <span className="mono" style={{ position: 'relative', fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: k === kind ? 'var(--label-1)' : 'var(--label-2)', fontWeight: k === kind ? 700 : 400 }}>{KIND_LABEL[k]}</span>
          </button>
        ))}
      </div>

      <div className="no-scrollbar" style={{ position: 'absolute', left: 0, right: 0, top: 164, bottom: alignPlus ? 100 : 214, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 24px 16px' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={kind} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            {mine.length > 0 && (
              <>
                <Label style={{ marginTop: 12 }}>{kind === 'sign' ? 'Your placements' : 'In your chart'}</Label>
                <div style={{ borderRadius: 16, background: CARD_BG, border: CARD_LINE, overflow: 'hidden' }}>{mine.map((t, i) => row(t, i, false))}</div>
              </>
            )}
            {locked.length > 0 && (
              <>
                <Label style={{ marginTop: mine.length ? 22 : 12 }}>Locked · Align+</Label>
                <div style={{ borderRadius: 16, background: 'rgba(40,26,78,0.45)', border: CARD_LINE, overflow: 'hidden' }}>{locked.map((t, i) => row(t, i, true))}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!alignPlus && <Cta onClick={() => go('paywall')}>Unlock the whole glossary</Cta>}
      <TabBar active="you" go={go} />
    </Frame>
  )
}
