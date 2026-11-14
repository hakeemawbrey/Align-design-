import AlignMark from './AlignMark'
import { BETA } from '../../lib/beta'

interface Props {
  width?: number
  height?: number
  style?: React.CSSProperties
}

/** Face-down Align card back (Kit · card back): violet field, double rule, the mark. */
export default function CardBack({ width = 160, height = 262, style }: Props) {
  // beta: one thick foil border, like every other card; no inner rule
  if (BETA) {
    const edge = Math.max(2.5, width * 0.04)
    const radius = (style?.borderRadius as number | undefined) ?? 12
    return (
      <div style={{ position: 'relative', width, height, padding: edge, borderRadius: radius,
        background: 'linear-gradient(160deg, #c8b4ff 0%, #6b4bd0 30%, #f2d784 52%, #6b4bd0 72%, #c8b4ff 100%)',
        boxShadow: '0 12px 30px rgba(10, 4, 30, 0.55)', ...style }}>
        <div className="grain" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: Math.max(2, radius - edge), overflow: 'hidden',
          background: 'radial-gradient(90% 60% at 30% 10%, rgba(140, 80, 220, 0.55) 0%, transparent 60%), radial-gradient(80% 50% at 80% 100%, rgba(110, 50, 200, 0.45) 0%, transparent 70%), linear-gradient(160deg, #3b1d78 0%, #2a1460 45%, #3a1a7a 100%)' }}>
          <div style={{ position: 'absolute', left: '50%', top: width >= 80 ? '44%' : '50%', transform: 'translate(-50%, -50%)' }}>
            <AlignMark size={width * 0.72} strokeOpacity={0.32} strokeWidth={0.5} glow={0.55} dotRadius={2.3} />
          </div>
          {width >= 80 && (
            <div className="serif italic" style={{ position: 'absolute', left: 0, right: 0, top: width >= 120 ? '74%' : '71%', textAlign: 'center', fontSize: Math.max(13, width * 0.13), lineHeight: 1, color: 'rgba(241,233,255,0.92)' }}>Align</div>
          )}
        </div>
      </div>
    )
  }
  return _Classic({ width, height, style })
}

function _Classic({ width = 160, height = 262, style }: Props) {
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
