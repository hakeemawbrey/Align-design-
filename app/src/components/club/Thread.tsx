import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Starfield from '../Starfield'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { AuraAvatar, LikeButton, SparkCount } from './PostParts'
import type { Post, Reply } from './posts'

interface Props {
  post: Post
  liked: boolean
  likes: number
  extra: Reply[]
  onLike: () => void
  onReply: (text: string) => void
  onClose: () => void
}

const FADE = 'linear-gradient(180deg, transparent 0, #000 12px, #000 calc(100% - 24px), transparent 100%)'

/** S-17b · a post opened as a thread. */
export default function Thread({ post, liked, likes, extra, onLike, onReply, onClose }: Props) {
  const [draft, setDraft] = useState('')
  const scroller = useRef<HTMLDivElement>(null)
  const replies = [...post.replies, ...extra]
  const moon = SIGNS[post.moon]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { sfx.tap(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!extra.length) return
    // wait for the new reply to finish growing in, then bring it into view
    const t = window.setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }), 420)
    return () => window.clearTimeout(t)
  }, [extra.length])

  const send = () => {
    const t = draft.trim()
    if (!t) return
    setDraft('')
    sfx.send()
    onReply(t)
  }

  return (
    <motion.div
      initial={{ x: 390 }} animate={{ x: 0 }} exit={{ x: 390 }}
      transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      style={{ position: 'absolute', inset: 0, zIndex: 30, overflow: 'hidden', boxShadow: '-20px 0 40px rgba(0,0,0,0.5)' }}
    >
      <Starfield aurora={null} warm={null} count={50} seed={61} />

      <button onClick={() => { sfx.tap(); onClose() }} style={{ position: 'absolute', left: 14, top: 56, height: 36, display: 'flex', alignItems: 'center', gap: 12, zIndex: 2 }}>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 1.5 1.5 6.5l5 5" /></svg>
        <span style={{ fontSize: 15.5, color: 'var(--label-1)' }}>The Taurus room</span>
      </button>
      <span className="eyebrow" style={{ position: 'absolute', right: 24, top: 68, fontSize: 9, color: 'var(--label-3)' }}>Thread</span>

      <div ref={scroller} className="club-scroll" style={{
        position: 'absolute', top: 96, left: 0, right: 0, bottom: 150, overflowY: 'auto', padding: '4px 20px 24px', scrollbarWidth: 'none',
        WebkitMaskImage: FADE, maskImage: FADE,
      }}>
        {/* the post */}
        <div style={{
          borderRadius: 16, padding: '16px 16px 10px', marginTop: 4,
          background: 'rgba(40,26,78,0.9)', border: `1px solid ${moon.color}99`, boxShadow: `0 0 26px ${moon.color}22`,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <AuraAvatar sign={post.moon} size={58} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="serif italic" style={{ fontSize: 22, color: 'var(--label-1)' }}>{post.name}, {post.age}</span>
                <span style={{ fontSize: 12, color: 'var(--label-3)' }}>{post.ago.toLowerCase()} · {post.hood}</span>
              </div>
              <span style={{
                display: 'inline-block', marginTop: 4, padding: '2px 10px', borderRadius: 999, fontSize: 12.5,
                color: moon.light, background: `${moon.color}33`, border: `1px solid ${moon.color}55`,
              }}>{moon.name} moon</span>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 16, lineHeight: '24px', color: 'var(--label-1)', userSelect: 'text' }}>{post.full ?? post.text}</div>
          {post.image && <img src={post.image} alt="" style={{ display: 'block', width: '100%', marginTop: 12, borderRadius: 14, border: '1px solid rgba(179,166,196,0.18)' }} />}
          <div style={{ display: 'flex', gap: 22, marginTop: 10, alignItems: 'center' }}>
            <LikeButton liked={liked} count={likes} onToggle={onLike} size={12.5} />
            <SparkCount n={post.sparks + extra.length} size={12.5} />
            <button onClick={() => sfx.tap()} style={{ fontSize: 12.5, color: 'var(--label-2)' }}>Share</button>
          </div>
        </div>

        <div className="eyebrow" style={{ fontSize: 9, color: 'var(--label-3)', margin: '18px 4px 8px' }}>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</div>
        <div style={{ borderRadius: 16, background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(179,166,196,0.16)', overflow: 'hidden' }}>
          <AnimatePresence initial={false}>
            {replies.map((r, i) => (
              <motion.div key={`${r.name}-${i}`}
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                style={{ overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px 14px', borderTop: i ? '1px solid rgba(179,166,196,0.12)' : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AuraAvatar sign={r.moon} size={26} />
                    <span className="serif italic" style={{ fontSize: 16, color: 'var(--label-1)' }}>{r.name}, {r.age}</span>
                    <span style={{ fontSize: 12, color: 'var(--label-3)' }}>{SIGNS[r.moon].name} moon</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 14, lineHeight: '20px', color: 'var(--label-1)', opacity: 0.9 }}>{r.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* reply composer */}
      <form onSubmit={(e) => { e.preventDefault(); send() }} style={{
        position: 'absolute', left: 20, right: 20, top: 690, height: 52, borderRadius: 26, display: 'flex', alignItems: 'center',
        padding: '0 7px 0 20px', background: 'rgba(30,18,64,0.88)', border: '1px solid rgba(179,166,196,0.26)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Say the thing you keep deleting"
          style={{ flex: 1, minWidth: 0, background: 'none', border: 0, outline: 'none', fontSize: 15.5, color: 'var(--label-1)', caretColor: 'var(--align)', userSelect: 'text', WebkitUserSelect: 'text' }} />
        <motion.button type="submit" aria-label={`Reply as ${ME.name}`} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
          animate={{ background: draft.trim() ? 'rgba(248,237,255,0.95)' : 'rgba(52,35,95,0.9)' }}
          style={{ width: 38, height: 38, borderRadius: 19, display: 'grid', placeItems: 'center', fontSize: 16, color: draft.trim() ? '#3a2a08' : 'var(--label-1)', border: '1px solid rgba(239,230,214,0.4)' }}>
          ✦
        </motion.button>
      </form>
    </motion.div>
  )
}
