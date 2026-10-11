import { motion } from 'framer-motion'
import type { Profile } from '../../data/profiles'
import { ELEMENT_COLOR, SIGNS } from '../../data/signs'
import VeilPhoto from './VeilPhoto'

interface Props {
  p: Profile
  /** face is visible (stagger the details in) */
  shown: boolean
  lift: boolean
  revealed: boolean
  onPeak?: () => void
  onDone?: () => void
}

const PHOTO_H = 216

function MoonBadge() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 35% 30%, #ffd4f8 0%, #e163d6 45%, #9a3ad0 100%)',
      boxShadow: '0 0 16px rgba(225,99,214,0.55), inset 0 1px 0 rgba(255,255,255,0.5)',
      display: 'grid', placeItems: 'center',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M15.5 3.2A9 9 0 1 0 20.8 15 7.2 7.2 0 0 1 15.5 3.2Z" fill="#3a1450" />
      </svg>
    </div>
  )
}

function Chip({ label, color, pearl = false }: { label: string; color: string; pearl?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 8px 0 4px', borderRadius: 999,
      border: `1px solid ${pearl ? 'rgba(248,237,255,0.45)' : color}`,
      fontFamily: 'var(--mono)', fontSize: 7.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--label-1)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}88` }} />
      {label}
    </span>
  )
}

const Divider = () => <div style={{ height: 1, margin: '0 16px', background: 'rgba(179,166,196,0.16)' }} />

const label: React.CSSProperties = {
  fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--label-3)',
}
const value: React.CSSProperties = { fontFamily: 'var(--serif)', fontSize: 15.5, color: 'var(--label-1)', marginTop: 4, lineHeight: 1.2 }

/** The fully revealed profile card (S-08 / S-09h). Sized for a 358×625 card. */
export default function ProfileFace({ p, shown, lift, revealed, onPeak, onDone }: Props) {
  const sign = SIGNS[p.sign]
  const moon = SIGNS[p.moon]
  const el = ELEMENT_COLOR[sign.element]

  const item = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.55, delay: shown ? 0.35 + i * 0.07 : 0, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 24, padding: 1.5,
      background: sign.foil, backgroundSize: '200% 100%', animation: 'rv-foil 6s linear infinite',
      boxShadow: `0 0 28px ${sign.color}66, 0 0 70px ${sign.color}22, 0 30px 60px rgba(0,0,0,0.5)`,
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 22.5, overflow: 'hidden',
        background: 'linear-gradient(180deg, #1b0d38 0%, #150a2e 60%, #120826 100%)',
      }}>
        {/* name row */}
        <div style={{ height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 12px 0 16px' }}>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 29, color: 'var(--label-1)', letterSpacing: '-0.01em' }}>
            {p.name}, {p.age}
          </div>
          <MoonBadge />
        </div>

        {/* photo */}
        <div style={{ position: 'relative', margin: '0 12px' }}>
          {/* rainbow halo behind the photo, blooms after the reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', inset: -6, borderRadius: 20, overflow: 'hidden', filter: 'blur(8px)' }}
          >
            <div style={{
              position: 'absolute', left: '50%', top: '50%', width: 520, height: 520, marginLeft: -260, marginTop: -260,
              background: 'conic-gradient(from 0deg, #ff4040, #ff8a2e, #ffd23f, #4fd36a, #3fc4f0, #4f6df5, #b05cf5, #e163d6, #ff4040)',
              animation: 'rv-spin 6s linear infinite', opacity: 0.75,
            }} />
          </motion.div>
          <VeilPhoto photo={p.photo ?? ''} veil={sign.auraImg} lift={lift} height={PHOTO_H} onPeak={onPeak} onDone={onDone}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={revealed ? { opacity: 1, scale: [1.35, 0.95, 1] } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                position: 'absolute', top: 12, right: 12, height: 24, padding: '0 13px', borderRadius: 999,
                background: 'rgba(36,16,58,0.88)', border: '1px solid rgba(248,237,255,0.6)',
                display: 'flex', alignItems: 'center',
                fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-1)',
                boxShadow: '0 0 14px rgba(248,237,255,0.25)',
              }}
            >
              REVEALED TONIGHT
            </motion.div>
          </VeilPhoto>
        </div>

        {/* sign row */}
        <motion.div {...item(0)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 10px 0 16px', height: 38 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 21, letterSpacing: '0.08em', color: sign.color, marginRight: 4, textShadow: `0 0 12px ${sign.color}66` }}>
            {sign.name.toUpperCase()}
          </span>
          <Chip label={sign.element} color={el} />
          <Chip label={`${moon.name} moon`} color="#a35cf0" />
          {p.house && <Chip label={p.house} color="#f8edff" pearl />}
        </motion.div>

        <div style={{ height: 11 }} />
        <Divider />

        {/* bio */}
        <motion.div {...item(1)} style={{ padding: '9px 16px 9px' }}>
          <div style={{ ...label, color: sign.color }}>Full bio</div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, lineHeight: '19.5px', color: 'var(--label-1)', marginTop: 7 }}>
            {p.bio}
          </p>
        </motion.div>
        <Divider />

        {/* facts */}
        <motion.div {...item(2)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 9, columnGap: 12, padding: '10px 16px 10px' }}>
          {([['Religion', p.religion], ['Looking for', p.lookingFor], ['Height', p.height], ['Work', p.work]] as const).map(([k, v]) => (
            <div key={k}>
              <div style={label}>{k}</div>
              <div style={value}>{v}</div>
            </div>
          ))}
        </motion.div>
        <Divider />

        {/* interests */}
        <motion.div {...item(3)} style={{ padding: '10px 16px 0' }}>
          <div style={{ ...label, color: '#7fd0f0' }}>Interests</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
            {p.interests?.map((t) => (
              <span key={t} style={{
                height: 21, padding: '0 13px', borderRadius: 999, border: '1px solid rgba(179,166,196,0.4)',
                display: 'inline-flex', alignItems: 'center',
                fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--label-2)',
              }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
