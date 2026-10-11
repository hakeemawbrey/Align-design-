import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { AuraAvatar } from './PostParts'

const MAX = 160

interface Props {
  /** opened from tonight's prompt — show it as context */
  prompt?: string
  listening: string
  onPost: (text: string) => void
  onClose: () => void
}

/** "Say it to the room" — bottom sheet composer. */
export default function Composer({ prompt, listening, onPost, onClose }: Props) {
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const ok = text.trim().length > 0

  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus(), 250)
    return () => window.clearTimeout(t)
  }, [])

  const post = () => {
    if (!ok) { sfx.deny(); ref.current?.focus(); return }
    onPost(text.trim())
  }

  return (
    <>
      <motion.div
        key="scrim"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        onClick={() => { sfx.tap(); onClose() }}
        style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(5,2,15,0.6)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
      />
      <motion.div
        key="sheet"
        initial={{ y: 420 }} animate={{ y: 0 }} exit={{ y: 420 }}
        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 51, padding: '12px 24px 40px',
          borderRadius: '26px 26px 0 0', background: 'linear-gradient(180deg, #2a1a52 0%, #1d1240 100%)',
          border: '1px solid rgba(179,166,196,0.2)', borderBottom: 0, boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.35)', margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}>To the Taurus room</span>
          <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}>{listening} listening</span>
        </div>
        {prompt && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--label-2)' }}>
            <span style={{ width: 7, height: 7, borderRadius: 4, background: '#9be35a', boxShadow: '0 0 8px #9be35a', flexShrink: 0 }} />
            <span className="serif italic" style={{ fontSize: 15 }}>{prompt}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
          <AuraAvatar sign={ME.moon} size={36} />
          <textarea
            ref={ref}
            value={text}
            maxLength={MAX}
            rows={3}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); post() }
              if (e.key === 'Escape') { sfx.tap(); onClose() }
            }}
            placeholder="Say the thing you keep deleting"
            style={{
              flex: 1, resize: 'none', background: 'none', border: 0, outline: 'none',
              fontFamily: 'var(--sans)', fontSize: 16, lineHeight: '22px', color: 'var(--label-1)', caretColor: 'var(--align)',
              userSelect: 'text', WebkitUserSelect: 'text', paddingTop: 6,
            }}
          />
        </div>
        <div style={{ height: 1, background: 'rgba(179,166,196,0.16)', margin: '12px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>
            {ME.name.toUpperCase()}, {ME.age} · {SIGNS[ME.moon].name.toUpperCase()} MOON · <span style={{ color: text.length > MAX - 20 ? 'var(--rub)' : undefined }}>{MAX - text.length}</span>
          </span>
          <motion.button
            onClick={post}
            whileHover={ok ? { scale: 1.04 } : undefined}
            whileTap={{ scale: 0.94 }}
            animate={{
              color: ok ? '#3a2c4e' : '#7d6f94',
              boxShadow: ok ? '0 0 18px rgba(248,237,255,0.45)' : '0 0 0 rgba(0,0,0,0)',
            }}
            className="serif italic"
            style={{
              height: 38, padding: '0 20px', borderRadius: 19, fontSize: 17, fontWeight: 500,
              background: ok ? 'var(--chrome)' : 'rgba(52,35,95,0.9)',
            }}
          >
            Post ✦
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
