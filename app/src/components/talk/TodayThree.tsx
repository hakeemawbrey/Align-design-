import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TalkCardFace, { TalkCardBack, TAROT_RATIO } from './TalkCardFace'
import { cardById } from '../../data/talkCards'
import { DRAW_SIZE, chatDraw, nextTurn, useChatDraw } from '../../lib/chatDraw'
import { sfx } from '../../lib/sfx'

const W = 104
const H = W * TAROT_RATIO
const GAP = (342 - W * DRAW_SIZE) / (DRAW_SIZE - 1)
const side: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/** "3h 12m" until the next deal */
const until = (ms: number) => {
  const m = Math.max(0, Math.ceil(ms / 60_000))
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`
}

/**
 * Today's three (beta): open the cards in a chat and the deck shuffles, deals
 * you three face down and turns them over. Pick one and play it. They're
 * yours for this chat until 11:11 PM, when a new three are dealt.
 */
export default function TodayThree({ them, onPlay, onClose }: { them: string; onPlay: (cardId: string) => void; onClose: () => void }) {
  const draw = useChatDraw(them)
  /** already dealt today: skip the shuffle and show them */
  const [fresh] = useState(() => !chatDraw.get(them))
  const [stage, setStage] = useState<'shuffle' | 'deal' | 'up'>(fresh ? 'shuffle' : 'up')
  const [sel, setSel] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!fresh) return
    sfx.reveal()
    const ts = [
      window.setTimeout(() => { chatDraw.deal(them); setStage('deal'); sfx.flip() }, 1500),
      window.setTimeout(() => { setStage('up'); sfx.sparkle() }, 2300),
    ]
    return () => ts.forEach(clearTimeout)
  }, [fresh, them])
  useEffect(() => { const t = window.setInterval(() => setNow(Date.now()), 30_000); return () => clearInterval(t) }, [])

  const cards = (draw?.cards ?? []).map((id) => cardById(id)).filter((c) => !!c)
  const played = draw?.played ?? []
  const left = cards.filter((c) => !played.includes(c.id)).length
  const picked = sel != null ? cards[sel] : undefined
  const canPlay = !!picked && !played.includes(picked.id)
  const play = () => {
    if (!picked || !canPlay) return
    sfx.align()
    chatDraw.play(them, picked.id)
    onPlay(picked.id)
    onClose()
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(5,2,15,0.6)' }} />
      <motion.div role="dialog" aria-label="Today’s three cards"
        initial={{ y: 600 }} animate={{ y: 0 }} exit={{ y: 600 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 590, zIndex: 81, borderRadius: '26px 26px 0 0',
          background: 'linear-gradient(180deg, #24124f, #120a2a)', borderTop: '1px solid rgba(201,182,240,0.35)',
          padding: '12px 24px 0', display: 'flex', flexDirection: 'column',
        }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(201,182,240,0.4)', margin: '0 auto 12px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div className="h-display" style={{ fontSize: 26 }}>Today’s three</div>
          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--label-3)' }}>{stage === 'up' ? `${left} LEFT TO PLAY` : 'SHUFFLING'}</span>
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-2)', marginTop: 4, minHeight: 38 }}>
          {stage === 'shuffle' ? 'The deck is shuffling for you two…'
            : stage === 'deal' ? 'Three for tonight.'
              : `Three cards for you and ${them}. Pick one to play; you both answer.`}
        </div>

        {/* the table: the deck shuffles, then three cards land and turn over */}
        <div style={{ position: 'relative', height: H + 24, marginTop: 14 }}>
          <AnimatePresence>
            {stage === 'shuffle' && Array.from({ length: 6 }, (_, i) => {
              const dir = i % 2 ? 1 : -1
              return (
                <motion.div key={`d${i}`} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                  animate={{ x: [0, dir * (54 + i * 5), 0, dir * -(30 + i * 4), 0], y: [i * -2, i * -2 - 7, i * -2, i * -2 - 4, i * -2], rotate: [dir * i * 0.8, dir * 9, 0, dir * -6, dir * i * 0.8] }}
                  transition={{ duration: 1.0, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: '50%', top: 10, marginLeft: -W / 2, width: W, height: H, zIndex: i }}>
                  <TalkCardBack width={W} />
                </motion.div>
              )
            })}
          </AnimatePresence>
          {stage !== 'shuffle' && cards.map((c, i) => {
            const done = played.includes(c.id)
            const on = sel === i
            return (
              <motion.button key={c.id} aria-label={`${c.q}${done ? ' (played)' : ''}`} aria-pressed={on}
                onClick={() => { if (stage !== 'up') return; sfx.tap(); setSel(on ? null : i) }}
                initial={fresh ? { x: (342 - W) / 2, y: 10, opacity: 0, scale: 0.9 } : false}
                animate={{ x: i * (W + GAP), y: on ? 0 : 12, opacity: 1, scale: on ? 1.04 : 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22, delay: fresh && stage === 'deal' ? i * 0.1 : 0 }}
                style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, perspective: 800, zIndex: on ? 3 : 1 }}>
                <motion.div initial={false} animate={{ rotateY: stage === 'up' ? 0 : 180 }} transition={{ duration: 0.6, delay: fresh ? i * 0.14 : 0, ease: [0.3, 1.25, 0.5, 1] }}
                  style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
                  <div style={side}><TalkCardFace card={c} width={W} dim={done} /></div>
                  <div style={{ ...side, transform: 'rotateY(180deg)' }}><TalkCardBack width={W} /></div>
                </motion.div>
                {done && stage === 'up' && (
                  <span className="mono" style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%) rotate(-10deg)', padding: '4px 9px', borderRadius: 6, fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, color: 'var(--align)', border: '1.5px solid var(--align)', background: 'rgba(18,10,42,0.85)' }}>PLAYED</span>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* the one you picked, big enough to read */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '6px 4px 0' }}>
          <AnimatePresence mode="wait" initial={false}>
            {picked ? (
              <motion.div key={picked.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="serif italic" style={{ fontSize: 22, lineHeight: 1.25, color: 'var(--label-1)' }}>{picked.q}</div>
                {!canPlay && <div style={{ fontSize: 13, color: 'var(--label-2)', marginTop: 6 }}>You played this one today.</div>}
              </motion.div>
            ) : stage === 'up' ? (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: 14, color: 'var(--label-3)' }}>
                {left ? 'Tap a card to read it.' : 'All three played. Nice.'}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div style={{ paddingBottom: 28 }}>
          <button className="chrome-cta" onClick={play} disabled={!canPlay} style={{ width: '100%', opacity: canPlay ? 1 : 0.4 }}>
            {canPlay ? <>Play this card <span className="spark">✦</span></> : 'Pick a card'}
          </button>
          <div className="mono" style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.18em', color: 'var(--label-3)', marginTop: 10 }}>
            NEW THREE AT 11:11 PM · IN {until(nextTurn(now) - now).toUpperCase()}
          </div>
        </div>
      </motion.div>
    </>
  )
}
