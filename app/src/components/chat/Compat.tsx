import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { compatWith } from '../../lib/compat'
import { ME, type Profile } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { usToday } from '../../data/skyReading'
import { sfx } from '../../lib/sfx'

const KIND = { pull: { label: 'Spark', color: 'var(--spark)' }, push: { label: 'Clash', color: 'var(--rub)' }, align: { label: 'Align', color: 'var(--align)' } } as const

/**
 * The chat's top-right widget: how your two charts meet. Words only; there is
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

/** how the two charts meet, in words */
export function CompatSheet({ them, open, onClose, onFullReading }: { them: Profile; open: boolean; onClose: () => void; onFullReading?: () => void }) {
  const c = useMemo(() => compatWith(them), [them])
  const today = useMemo(() => usToday(them.sign), [them])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
          <motion.div key="sheet" role="dialog" aria-label={`You and ${them.name}`}
            initial={{ y: 700 }} animate={{ y: 0 }} exit={{ y: 700 }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 700, zIndex: 81, borderRadius: '26px 26px 0 0',
              background: 'linear-gradient(180deg, #2a1856 0%, #160c30 100%)', borderTop: '1px solid rgba(179,166,196,0.25)',
              display: 'flex', flexDirection: 'column',
            }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.4)', margin: '10px auto 0' }} />
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 40px' }}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)' }}>HOW YOU FIT</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
                <div>
                  <div className="h-display" style={{ fontSize: 30 }}>You &amp; {them.name}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--label-2)', marginTop: 2 }}>
                    {SIGNS[ME.sign].name} {SIGNS[ME.sign].glyph} · {SIGNS[them.sign].name} {SIGNS[them.sign].glyph}
                  </div>
                </div>
              </div>

              <p className="serif italic" style={{ fontSize: 17, lineHeight: 1.3, color: 'var(--label-1)', margin: '16px 0 0' }}>{c.elements}</p>

              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '22px 0 10px' }}>YOUR CHARTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.parts.map((p) => (
                  <div key={p.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 13.5, color: 'var(--label-1)' }}>{p.label}</span>
                      <span className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--label-2)', whiteSpace: 'nowrap' }}>
                        {SIGNS[p.mine].name.toUpperCase()} · {SIGNS[p.theirs].name.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.35, color: 'var(--label-2)', marginTop: 5 }}><b style={{ fontWeight: 600, color: 'var(--label-1)' }}>{p.aspectName}.</b> {p.line}</div>
                  </div>
                ))}
              </div>

              {them.reading?.length ? (
                <>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-3)', margin: '24px 0 10px' }}>FROM {them.name.toUpperCase()}’S CARD</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(['pull', 'push', 'align'] as const).map((k) => {
                      const r = them.reading.find((x) => x.kind === k)
                      if (!r) return null
                      return (
                        <div key={k} style={{ display: 'flex', gap: 12 }}>
                          <span style={{ width: 52, flexShrink: 0 }}>
                            <span className="mono" style={{ display: 'block', fontSize: 9, letterSpacing: '0.14em', fontWeight: 700, color: KIND[k].color }}>{KIND[k].label.toUpperCase()}</span>
                            <span style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                              {[1, 2, 3].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i <= r.strength ? KIND[k].color : 'transparent', border: `1.2px solid ${KIND[k].color}`, opacity: i <= r.strength ? 1 : 0.55 }} />)}
                            </span>
                          </span>
                          <span className="serif" style={{ fontSize: 15, lineHeight: 1.25, color: 'var(--label-1)' }}>{r.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : null}

              <div style={{ marginTop: 24, padding: '12px 14px', borderRadius: 16, background: 'rgba(52,35,95,0.55)', border: '1px solid rgba(179,166,196,0.14)' }}>
                <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--align)' }}>YOU TWO TODAY</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-1)', marginTop: 6 }}>{today.line}</div>
              </div>

              <p style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--label-3)', margin: '18px 0 0' }}>
                Astrology, for reflection and fun. It describes how two charts meet; it doesn’t measure or predict a relationship.
              </p>
              {onFullReading && (
                <button className="chrome-cta" onClick={() => { sfx.tap(); onFullReading() }} style={{ marginTop: 22, width: '100%' }}>
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
