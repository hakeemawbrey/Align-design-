import { memo } from 'react'
import { motion, type MotionValue } from 'framer-motion'
import type { Profile } from '../../data/profiles'
import { SIGNS, ELEMENT_COLOR } from '../../data/signs'
import { CARD_W, CARD_H } from './fx'
import { strengthWord } from '../Strength'

export type PeekState = 'none' | 'charging' | 'open' | 'sealing'

interface Props {
  profile: Profile
  peek?: PeekState
  /** 0..1 progress for the ring on the image panel */
  ring?: MotionValue<number>
  ringText?: string
  /** draw glow — off for cards deep in the stack */
  glow?: boolean
}

const KIND_COLOR = { push: 'var(--rub)', pull: 'var(--spark)', align: 'var(--align)' } as const
const KIND_ORDER = ['push', 'pull', 'align'] as const

/** pull tiers, rarest first; Rare pull gets the holo treatment */
const PULL_COLOR: Record<Profile['pull'], string> = {
  'Rare pull': '#ffd36a', 'Strong pull': '#f2c75c', 'Steady pull': '#c9b6f0', 'Slow burn': '#f39a7a', 'Wild card': '#7fd8f0',
}

function PullBadge({ pull }: { pull: Profile['pull'] }) {
  if (pull === 'Rare pull') {
    return (
      <div className="holo-frame" style={{ padding: 1.5, borderRadius: 999, boxShadow: '0 0 14px rgba(255,140,220,0.5)' }}>
        <div className="mono" style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(11,6,32,0.85)', fontSize: 8.5, letterSpacing: '0.16em', fontWeight: 700 }}>
          <span style={{ background: 'linear-gradient(90deg, #ff6ad5, #ffd36a, #7affc4, #6ad5ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            ✦ RARE PULL
          </span>
        </div>
      </div>
    )
  }
  const c = PULL_COLOR[pull]
  return (
    <div className="mono" style={{
      padding: '3px 9px', borderRadius: 999, fontSize: 8.5, letterSpacing: '0.16em', fontWeight: 700, textTransform: 'uppercase',
      color: c, background: 'rgba(11,6,32,0.82)', border: `1px solid ${c}aa`, boxShadow: `0 0 10px ${c}44`,
    }}>
      ✦ {pull}
    </div>
  )
}

function Sphere({ color, light, size = 14 }: { color: string; light: string; size?: number }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${light} 22%, ${color} 60%, ${color}88 100%)`,
      boxShadow: `0 0 6px ${color}aa`,
    }} />
  )
}

function captionFor(peek: PeekState, hasPhoto: boolean) {
  if (peek === 'open') return hasPhoto ? 'PHOTO OPEN FOR THIS PEEK ONLY' : 'NO PHOTO YET · A GLIMPSE OF THE SIGN'
  if (peek === 'sealing') return 'SEALING BACK · THE VEIL RETURNS'
  if (peek === 'charging') return 'HOLD · OPENING THE VEIL'
  return 'NO PHOTO UNTIL YOU BOTH ALIGN'
}

/** The face-up deck card, S-05. Fixed 330×527 — scale it from the outside. */
function ProfileCardImpl({ profile, peek = 'none', ring, ringText, glow = true }: Props) {
  const sign = SIGNS[profile.sign]
  const moon = SIGNS[profile.moon]
  const elColor = ELEMENT_COLOR[sign.element]
  const foil = sign.foil.replace('90deg', '160deg')
  const photoSrc = profile.photo ?? sign.figureImg
  const isPhoto = !!profile.photo
  const showPhoto = peek === 'open'

  return (
    <div className={profile.founder ? 'holo-frame' : undefined} style={{
      position: 'relative', width: CARD_W, height: CARD_H, borderRadius: 20, padding: profile.founder ? 3 : 2.5,
      ...(profile.founder ? {} : { background: foil }),
      boxShadow: glow
        ? `0 0 26px ${sign.color}66, 0 0 2px ${sign.light}, 0 18px 40px rgba(5,2,15,0.6)`
        : '0 10px 30px rgba(5,2,15,0.5)',
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 17.5, overflow: 'hidden',
        background: `radial-gradient(120% 60% at 50% 0%, ${sign.dark}55 0%, transparent 60%), linear-gradient(180deg, #160e28 0%, #100a1d 55%, #0e0919 100%)`,
      }}>
        {/* name + age */}
        <div className="serif italic" style={{ position: 'absolute', left: 36, top: 16, fontSize: 23, color: 'var(--label-1)' }}>
          {profile.initial}, {profile.age}
        </div>
        {/* moon badge */}
        <div style={{
          position: 'absolute', right: 26, top: 14, width: 38, height: 38, borderRadius: '50%',
          background: `radial-gradient(circle at 30% 25%, ${sign.light} 0%, ${sign.color} 45%, #7b3df0 100%)`,
          boxShadow: `0 0 14px ${sign.color}aa, inset 0 1px 1px rgba(255,255,255,0.6)`,
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15.5 3.2A9 9 0 1 0 20.8 15 7.2 7.2 0 0 1 15.5 3.2Z" fill="#1a0f2e" /></svg>
        </div>

        {/* image panel */}
        <div className="grain" style={{
          position: 'absolute', left: 22, top: 56, width: 284, height: 152, borderRadius: 10,
          overflow: 'hidden', background: '#07040f',
          boxShadow: `0 0 0 1.5px ${sign.color}cc, 0 0 16px ${sign.color}55`,
        }}>
          <img src={sign.auraImg} alt="" draggable={false} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%',
            transform: 'scale(1.14)', filter: 'blur(0.7px) saturate(1.08)',
          }} />
          <motion.img
            src={photoSrc} alt="" draggable={false}
            initial={false}
            animate={showPhoto
              ? { opacity: 1, filter: isPhoto ? 'blur(0px)' : 'blur(7px)', scale: 1 }
              : { opacity: 0, filter: 'blur(22px)', scale: 1.08 }}
            transition={{ duration: showPhoto ? 0.45 : peek === 'sealing' ? 1.0 : 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: isPhoto ? 'center 28%' : 'center 35%', willChange: 'opacity, filter',
            }}
          />
          {/* inner vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 90% at 50% 45%, transparent 55%, rgba(7,4,15,0.55) 100%)', pointerEvents: 'none' }} />
          <div className="mono" style={{
            position: 'absolute', left: 8, bottom: 6, fontSize: 8, letterSpacing: '0.16em',
            color: peek === 'open' ? 'var(--label-1)' : 'var(--label-2)', textShadow: '0 1px 4px rgba(0,0,0,0.9)', zIndex: 2,
          }}>
            {captionFor(peek, isPhoto)}
          </div>
          {profile.founder && (
            <div className="mono" style={{
              position: 'absolute', left: 8, top: 8, zIndex: 3, padding: 1.5, borderRadius: 999,
            }}>
              <div className="holo-frame" style={{ padding: 1.5, borderRadius: 999, boxShadow: '0 0 12px rgba(255,140,220,0.45)' }}>
                <div style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(11,6,32,0.82)', fontSize: 8, letterSpacing: '0.16em', fontWeight: 700 }}>
                  <span style={{ background: 'linear-gradient(90deg, #ff6ad5, #ffd36a, #7affc4, #6ad5ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    ✦ FOUNDER № {String(profile.founder).padStart(4, '0')}
                  </span>
                </div>
              </div>
            </div>
          )}
          {!(ring && (peek === 'charging' || peek === 'open')) && (
            <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 3 }}><PullBadge pull={profile.pull} /></div>
          )}
          {ring && (peek === 'charging' || peek === 'open') && (
            <div style={{ position: 'absolute', right: 10, top: 10, width: 34, height: 34, zIndex: 3 }}>
              <svg width="34" height="34" viewBox="0 0 34 34" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)', overflow: 'visible' }}>
                <circle cx="17" cy="17" r="14" fill="rgba(11,6,32,0.45)" stroke="rgba(242,199,92,0.25)" strokeWidth="2" />
                <motion.circle cx="17" cy="17" r="14" fill="none" stroke="#f2c75c" strokeWidth="2.2" strokeLinecap="round"
                  style={{ pathLength: ring }} />
              </svg>
              <div className="mono" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 12, color: '#f2c75c', letterSpacing: 0 }}>
                {ringText ?? '✦'}
              </div>
            </div>
          )}
        </div>

        {/* sign + chips */}
        <div style={{ position: 'absolute', left: 32, top: 216, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="serif" style={{ fontSize: 18, letterSpacing: '0.08em', color: sign.color, textTransform: 'uppercase', textShadow: `0 0 10px ${sign.color}66` }}>
            {sign.name}
          </span>
          <span className="chip" style={{ color: elColor, height: 22, padding: '0 9px 0 3px', borderColor: `${elColor}cc`, background: `${elColor}14` }}>
            <Sphere color={elColor} light="#e8fbff" />
            {sign.element}
          </span>
          <span className="chip" style={{ color: 'var(--label-2)', height: 22, padding: '0 9px 0 3px', borderColor: 'rgba(179,166,196,0.55)' }}>
            <Sphere color="#8f7be8" light="#ece6ff" />
            {moon.name} moon
          </span>
        </div>

        {/* one-line bio */}
        {profile.blurb && (
          <div className="serif italic" style={{
            position: 'absolute', left: 32, right: 22, top: 245, fontSize: 15, lineHeight: 1.2, color: 'var(--label-1)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            “{profile.blurb}”
          </div>
        )}

        {/* reading: push / pull / align, each with how strong it is */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: profile.blurb ? 290 : 252, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[...profile.reading].sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind)).map((r) => (
            <div key={r.kind} style={{ display: 'flex', alignItems: 'center', minHeight: 36, paddingLeft: 32, paddingRight: 18 }}>
              <span style={{ width: 52, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: KIND_COLOR[r.kind], textTransform: 'uppercase', fontWeight: 700 }}>{r.kind}</span>
                <span className="mono" style={{ fontSize: 7.5, letterSpacing: '0.1em', color: 'var(--label-3)', textTransform: 'uppercase' }}>{strengthWord(r.strength)}</span>
              </span>
              <span className="serif" style={{ flex: 1, fontSize: 14.5, lineHeight: 1.16, color: 'var(--label-1)' }}>
                {r.text}
              </span>
            </div>
          ))}
          <div style={{ margin: '2px 18px 0 16px', height: 1, background: 'linear-gradient(90deg, rgba(179,166,196,0.55), rgba(179,166,196,0.25))' }} />
          <div style={{ padding: '5px 18px 0 16px' }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: '#e87aa0' }}>DEALBREAKERS</div>
            <div className="serif italic" style={{ marginTop: 5, fontSize: 14.5, lineHeight: 1.2, color: 'var(--label-2)' }}>
              {profile.dealbreakers}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="mono" style={{
          position: 'absolute', left: 14, right: 18, bottom: 12, display: 'flex', justifyContent: 'space-between',
          fontSize: 8.5, letterSpacing: '0.14em',
        }}>
          <span style={{ color: 'var(--label-2)' }}>ALIGN · {profile.serial}/∞</span>
          <span style={{ color: 'var(--label-3)' }}>MYSTERY CARD</span>
        </div>
      </div>
    </div>
  )
}

const ProfileCard = memo(ProfileCardImpl)
export default ProfileCard
