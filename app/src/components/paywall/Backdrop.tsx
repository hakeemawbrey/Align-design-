import Starfield from '../Starfield'

/** Paywall sky: indigo-violet void, a sunrise-gold bloom above and a warm ember below. */
export default function Backdrop({ seed = 44 }: { seed?: number }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1d1236 0%, #170d31 45%, #140a2c 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.95 }}>
        <Starfield aurora="#7a5c2c" warm="#6a4a2e" count={70} seed={seed} />
      </div>
      {/* the starfield paints a solid void; let the violet wash show through it */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen',
        background: 'radial-gradient(70% 40% at 50% 46%, rgba(60,34,110,0.55) 0%, rgba(40,22,80,0.25) 55%, transparent 80%)',
      }} />
    </>
  )
}
