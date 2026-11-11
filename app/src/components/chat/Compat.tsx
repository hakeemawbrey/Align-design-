import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEEL_TAG, fitWith } from '../../lib/compat'
import { ME, type Profile } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { usToday } from '../../data/skyReading'
import { sfx } from '../../lib/sfx'
import CardFrame, { CardOrb } from '../CardFrame'

/** each area's card colour follows its planet (sun gold, moon blue, rising violet), not how it reads */
const AREA_TINT = { daily: '#f2c75c', feelings: '#8fb4ff', first: '#cdb0ff', understood: '#f0a8d8' } as const

/** their card's three lines, said plainly */
const KIND = {
  pull: { label: 'Spark', plain: 'What draws you together', color: 'var(--spark)' },
  push: { label: 'Clash', plain: 'Where you’ll bump heads', color: 'var(--rub)' },
  align: { label: 'Align', plain: 'Where you already agree', color: 'var(--align)' },
} as const

/**
 * The chat's top-right widget: how the two of you fit. Words only; there is
 * no score, percentage or rating anywhere in it, on purpose.
 */
export function CompatBadge({ them, onClick }: { them: Profile; onClick: () => void }) {
  const mine = SIGNS[ME.sign], theirs = SIGNS[them.sign]
  return (
    <motion.button onClick={() => { sfx.tap(); onClick() }} whileTap={{ scale: 0.92 }} aria-label={`How you and ${them.name} fit`}
      style={{ position: 'absolute', right: 12, top: 10, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
      {/* two orbs, overlapping: your sign and theirs */}
      <span style={{ position: 'relative', width: 34, height: 24 }}>
        <span style={{ position: 'absolute', left: 0, top: 1, width: 22, height: 22, borderRadius: 11, background: `radial-gradient(circle at 35% 30%, ${mine.light}, ${mine.color} 70%)`, boxShadow: `0 0 8px ${mine.color}aa`, opacity: 0.95 }} />
        <span style={{ position: 'absolute', right: 0, top: 1, width: 22, height: 22, borderRadius: 11, background: `radial-gradient(circle at 35% 30%, ${theirs.light}, ${theirs.color} 70%)`, boxShadow: `0 0 8px ${theirs.color}aa`, opacity: 0.9, mixBlendMode: 'screen' }} />
      </span>
    </motion.button>
  )
}

const EYEBROW: React.CSSProperties = { fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }

/**
 * How you two fit, for the relationship: day to day, feelings, first
 * impressions and feeling understood, each a plain sentence and one thing to
 * try. The astrology behind each sits under a "why" toggle.
 */
export function CompatSheet({ them, open, onClose, onFullReading, onPlayCard }: {
  them: Profile; open: boolean; onClose: () => void
  /** Juniper's long reading */
  onFullReading?: () => void
  /** open your talk cards, to act on it */
  onPlayCard?: () => void
}) {
  const fit = useMemo(() => fitWith(them), [them])
  const today = useMemo(() => usToday(them.sign), [them])
  const [why, setWhy] = useState(false)
  const mine = SIGNS[ME.sign], theirs = SIGNS[them.sign]
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
          <motion.div key="sheet" role="dialog" aria-label={`How you and ${them.name} fit`}
            initial={{ y: 720 }} animate={{ y: 0 }} exit={{ y: 720 }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 720, zIndex: 81, borderRadius: '26px 26px 0 0',
              background: 'linear-gradient(180deg, #2a1856 0%, #160c30 100%)', borderTop: '1px solid rgba(179,166,196,0.25)',
              display: 'flex', flexDirection: 'column',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 10px 0 24px' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: 30 }}>
                <span style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.4)' }} />
              </div>
              <button aria-label="Close" onClick={() => { sfx.tap(); onClose() }} style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--label-2)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l10 10M13 3 3 13" /></svg>
              </button>
            </div>
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>
              {/* who */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 4px' }}>
                <span style={{ position: 'relative', width: 62, height: 44, flexShrink: 0 }}>
                  <span style={{ position: 'absolute', left: 0, top: 2, width: 40, height: 40, borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 18, color: '#1a0f2e', background: `radial-gradient(circle at 35% 30%, ${mine.light}, ${mine.color} 70%)`, boxShadow: `0 0 14px ${mine.color}88` }}>{mine.glyph}</span>
                  <span style={{ position: 'absolute', right: 0, top: 2, width: 40, height: 40, borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 18, color: '#1a0f2e', background: `radial-gradient(circle at 35% 30%, ${theirs.light}, ${theirs.color} 70%)`, boxShadow: `0 0 14px ${theirs.color}88`, opacity: 0.92 }}>{theirs.glyph}</span>
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="mono" style={EYEBROW}>HOW YOU FIT</div>
                  <div className="h-display" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 3 }}>You &amp; {them.name}</div>
                </div>
              </div>
              <p className="serif italic" style={{ fontSize: 18, lineHeight: 1.3, color: 'var(--label-1)', margin: '14px 4px 0' }}>{fit.summary}</p>

              {/* the relationship, area by area: one card each */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
                {fit.areas.map((a, i) => (
                  <CardFrame key={a.id} tint={AREA_TINT[a.id]} kicker={a.sub} title={a.title}
                    orb={<CardOrb tint={AREA_TINT[a.id]}>{a.glyph}</CardOrb>}
                    strip={{ label: 'Try this', text: a.tryThis }}
                    footer={[why ? a.from : 'Align · how you fit', `${i + 1}/${fit.areas.length}`]}>
                    <span className="mono" style={{ display: 'inline-block', padding: '4px 9px', borderRadius: 999, fontSize: 8.5, letterSpacing: '0.12em', color: 'var(--label-1)', border: '1px solid rgba(201,188,228,0.4)' }}>{FEEL_TAG[a.feel].toUpperCase()}</span>
                    <p style={{ margin: '10px 0 2px', fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{a.body}</p>
                  </CardFrame>
                ))}
              </div>
              {fit.sunOnly ? (
                <p style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '12px 4px 0' }}>
                  {them.name}’s card only shows a sun sign. Feelings and first impressions need a birth time.
                </p>
              ) : (
                <button className="mono" onClick={() => { sfx.tap(); setWhy((w) => !w) }} aria-expanded={why}
                  style={{ margin: '10px 4px 0', height: 30, fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-2)' }}>
                  {why ? 'HIDE THE ASTROLOGY ‹' : 'WHY? SHOW THE ASTROLOGY ›'}
                </button>
              )}

              {/* what their card says about the two of you, framed in their colour */}
              {them.reading?.length ? (
                <CardFrame tint={theirs.color} kicker={`${theirs.name} · from their card`} title={`${them.name} and you`}
                  orb={<CardOrb tint={theirs.color}>{theirs.glyph}</CardOrb>} footer={[`Align · ${them.serial ?? ''}`, 'Their card']} style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13, paddingBottom: 4 }}>
                    {(['pull', 'push', 'align'] as const).map((k) => {
                      const r = them.reading.find((x) => x.kind === k)
                      if (!r) return null
                      return (
                        <div key={k}>
                          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: KIND[k].color }}>
                            {KIND[k].label.toUpperCase()} <span style={{ fontWeight: 400, color: 'var(--label-3)', letterSpacing: '0.1em' }}>· {KIND[k].plain.toUpperCase()}</span>
                          </div>
                          <div className="serif" style={{ fontSize: 16, lineHeight: 1.3, color: 'var(--label-1)', marginTop: 4 }}>{r.text}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardFrame>
              ) : null}

              {/* tonight, and something to do about it */}
              <CardFrame tint="#c9bedb" kicker="Tonight" title="You two, under this sky" orb={<CardOrb tint="#c9bedb">☾</CardOrb>} style={{ marginTop: 16 }}>
                <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--label-1)' }}>{today.line}</div>
                {onPlayCard && (
                  <button className="mono" onClick={() => { sfx.tap(); onPlayCard() }}
                    style={{ margin: '12px 0 4px', height: 34, padding: '0 14px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, color: 'var(--chrome-ink)', background: 'var(--chrome)' }}>
                    PLAY A TALK CARD WITH {them.name.toUpperCase()} ›
                  </button>
                )}
              </CardFrame>

              <p style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '18px 4px 0' }}>
                Astrology, for reflection and fun. It describes how two charts meet; it doesn’t measure or predict a relationship.
              </p>
              {onFullReading && (
                <button className="chrome-cta" onClick={() => { sfx.tap(); onFullReading() }} style={{ marginTop: 18, width: '100%' }}>
                  Read your full alignment <span className="spark">✦</span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
