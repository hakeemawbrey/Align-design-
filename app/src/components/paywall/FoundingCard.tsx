import { motion } from 'framer-motion'
import Portal from './Portal'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'

const FOIL = 'linear-gradient(90deg, #b88a2c 0%, #f2c75c 18%, #fff4cf 34%, #f2c75c 50%, #b88a2c 66%, #f2d784 83%, #b88a2c 100%)'

const foilText: React.CSSProperties = {
  background: FOIL, backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
  color: 'transparent', animation: 'foil-sweep 3.5s linear infinite',
}

/** Gold-foil founding member card. 236 × 316. */
export default function FoundingCard({ title = 'Founding member', serial = '№ 0112' }: { title?: string; serial?: string }) {
  const sign = SIGNS[ME.sign]
  return (
    <div style={{
      position: 'relative', width: 236, height: 316, borderRadius: 20, padding: 2,
      background: FOIL, backgroundSize: '200% 100%', animation: 'foil-sweep 3.5s linear infinite',
      boxShadow: '0 0 40px rgba(242,199,92,0.45), 0 20px 50px rgba(0,0,0,0.5)',
    }}>
      <div className="grain" style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',
        background: 'radial-gradient(90% 60% at 50% 32%, #3b2766 0%, #22144a 55%, #150b30 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* fine inner rule */}
        <div style={{ position: 'absolute', inset: 8, borderRadius: 12, border: '1px solid rgba(242,199,92,0.35)', pointerEvents: 'none' }} />

        <div className="mono" style={{ marginTop: 22, fontSize: 8.5, letterSpacing: '0.28em', color: '#f2c75c' }}>ALIGN+ · HOUSTON</div>

        <div style={{ marginTop: 20, transform: 'scale(1)', height: 76 }}>
          <Portal w={54} h={74} lit sparkles={false} />
        </div>

        <div className="mono" style={{ ...foilText, marginTop: 20, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{title}</div>
        <div className="serif italic" style={{ ...foilText, marginTop: 4, fontSize: 50, lineHeight: 1.05, padding: '0 6px' }}>{serial}</div>

        <div style={{ width: 150, height: 1, marginTop: 12, background: 'linear-gradient(90deg, transparent, rgba(242,199,92,0.6), transparent)' }} />
        <div className="mono" style={{ marginTop: 12, display: 'flex', gap: 10, fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--label-2)' }}>
          <span>{ME.name.toUpperCase()}</span>
          <span style={{ color: sign.color }}>{sign.glyph} {sign.name.toUpperCase()}</span>
          <span>SINCE 2026</span>
        </div>
        <div className="mono" style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', fontSize: 7.5, letterSpacing: '0.24em', color: 'var(--label-3)' }}>
          ✦ PRICE LOCKED FOREVER ✦
        </div>

        {/* holo sheen */}
        <motion.div
          animate={{ x: [-260, 300] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut', delay: 0.4 }}
          style={{
            position: 'absolute', top: -60, bottom: -60, left: 0, width: 90, rotate: 20, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(255,244,207,0.22), rgba(255,189,246,0.18), rgba(234,244,255,0.22), transparent)',
            mixBlendMode: 'screen',
          }} />
      </div>
    </div>
  )
}
