import AlignMark from './AlignMark'

interface Props {
  width?: number
  height?: number
  style?: React.CSSProperties
}

/** Face-down Align card back (Kit · card back): violet field, double rule, the mark. */
export default function CardBack({ width = 160, height = 262, style }: Props) {
  return (
    <div
      className="grain"
      style={{
        position: 'relative', width, height, borderRadius: 12, overflow: 'hidden',
        background:
          'radial-gradient(90% 60% at 30% 10%, rgba(140, 80, 220, 0.55) 0%, transparent 60%),' +
          'radial-gradient(80% 50% at 80% 100%, rgba(110, 50, 200, 0.45) 0%, transparent 70%),' +
          'linear-gradient(160deg, #3b1d78 0%, #2a1460 45%, #3a1a7a 100%)',
        border: '1.5px solid rgba(201, 182, 240, 0.55)',
        boxShadow: '0 0 0 1px rgba(20,10,46,0.6), 0 20px 50px rgba(10, 4, 30, 0.6)',
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 6, borderRadius: 7, border: '1px solid rgba(201, 182, 240, 0.22)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <AlignMark size={width * 0.78} strokeOpacity={0.32} strokeWidth={0.5} glow={0.55} dotRadius={2.3} />
      </div>
    </div>
  )
}
