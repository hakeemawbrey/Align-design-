import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Profile } from '../../data/profiles'
import { ME } from '../../data/profiles'
import type { SignId } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { api } from '../../api'
import { CARD_W } from '../deck/fx'
import ProfileCard from '../deck/ProfileCard'
import { Caption, Cta, Header, EASE } from './shared'

const W = 150
const S = W / CARD_W

const field: React.CSSProperties = {
  height: 40, padding: '0 14px', borderRadius: 12, fontSize: 15, color: 'var(--label-1)', outline: 'none',
  background: 'rgba(40,26,78,0.7)', border: '1px solid rgba(154,123,224,0.4)', fontFamily: 'inherit', width: '100%',
}

/**
 * O-13 — "Your face comes last." Make your card: name, a one-line bio and a
 * photo. Photos stay veiled until you both align; tap the card to see what a
 * match sees. Continue publishes the card so it can be dealt to other people.
 */
export default function FaceLast({ sun, moon, rising, age, dealbreakers, next }: {
  sun: SignId; moon: SignId; rising: SignId; age: number; dealbreakers: string; next: () => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(ME.name)
  const [blurb, setBlurb] = useState(ME.blurb)
  const [photo, setPhoto] = useState<string>(ME.photo)
  const [uploading, setUploading] = useState(false)
  const t = useRef(0)
  const file = useRef<HTMLInputElement>(null)
  useEffect(() => () => clearTimeout(t.current), [])

  const me: Profile = {
    id: 'me', initial: name.trim() || 'You', name: name.trim() || 'You', age, sign: sun, moon, rising,
    serial: ME.serial.replace('№ ', ''), pull: 'Steady pull', photo, alignsBack: false,
    dealbreakers: dealbreakers || 'Nothing yet. Brave.',
    blurb: blurb.trim() || undefined,
    reading: [
      { kind: 'pull', text: 'Remembers your order. Plans the second date during the first.', strength: 3 },
      { kind: 'push', text: 'Slow to say how he feels. Ask him directly.', strength: 2 },
      { kind: 'align', text: 'Loyal and steady. Wants something that lasts.', strength: 3 },
    ],
  }

  const peek = () => {
    if (open) return
    sfx.flip(); setOpen(true)
    clearTimeout(t.current)
    t.current = window.setTimeout(() => { setOpen(false); sfx.release() }, 2200)
  }

  const pick = async (f: File | undefined) => {
    if (!f) return
    setUploading(true)
    try {
      const url = await api.uploadPhoto(f)
      setPhoto(url)
      sfx.sparkle()
      peek()
    } catch (e) {
      console.warn('[align] photo not saved', e)
      sfx.deny()
    } finally {
      setUploading(false)
    }
  }

  const done = () => {
    void api.publish({ name: name.trim() || ME.name, age, sun, moon, rising, blurb: blurb.trim(), dealbreakers, photo })
    next()
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Your card · The last thing anyone sees"
        title="Your face comes last."
        body="Photos stay veiled until you both align. Until then, people read your sky — not your face."
        bodyWidth={318}
        bodyStyle={{ marginTop: 8, fontSize: 15, lineHeight: 1.4 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
        style={{ position: 'absolute', top: 238, left: 26, width: W, cursor: 'pointer' }}
        onClick={peek}
      >
        <div style={{ transform: `scale(${S})`, transformOrigin: '0 0', width: CARD_W, height: 527 * S }}>
          <ProfileCard profile={me} peek={open ? 'open' : 'none'} />
        </div>
        <div className="mono" style={{ marginTop: 8, textAlign: 'center', fontSize: 7.5, letterSpacing: '0.16em', color: open ? '#f2c75c' : 'var(--label-3)' }}>
          {open ? 'WHAT A MATCH SEES' : 'TAP TO SEE WHAT A MATCH SEES'}
        </div>
      </motion.div>

      {/* the editable bits */}
      <motion.div
        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
        style={{ position: 'absolute', top: 240, left: 192, width: 172, display: 'flex', flexDirection: 'column', gap: 9 }}
      >
        <label className="mono" style={{ fontSize: 8, letterSpacing: '0.18em', color: 'var(--label-3)' }}>FIRST NAME</label>
        <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} style={field} autoComplete="given-name" />
        <label className="mono" style={{ fontSize: 8, letterSpacing: '0.18em', color: 'var(--label-3)', marginTop: 2 }}>ONE LINE ABOUT YOU</label>
        <textarea value={blurb} maxLength={90} rows={3} onChange={(e) => setBlurb(e.target.value)}
          style={{ ...field, height: 'auto', padding: '9px 12px', fontSize: 13.5, lineHeight: 1.3, resize: 'none' }} />
        <input ref={file} type="file" accept="image/*" hidden onChange={(e) => void pick(e.target.files?.[0])} />
        <button onClick={() => { sfx.tap(); file.current?.click() }} disabled={uploading}
          style={{
            height: 40, borderRadius: 12, fontSize: 13.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--label-1)', border: '1px dashed rgba(201,182,240,0.6)', background: 'rgba(84,44,170,0.25)', marginTop: 2,
          }}>
          <img src={photo} alt="" style={{ width: 24, height: 24, borderRadius: 12, objectFit: 'cover' }} />
          {uploading ? 'Saving…' : 'Change photo'}
        </button>
      </motion.div>

      <Cta onClick={done} delay={1}>Publish my card</Cta>
      <Caption delay={1.2}>You can change all of this later.</Caption>
    </div>
  )
}
