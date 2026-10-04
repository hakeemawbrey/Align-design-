export default function HomeIndicator() {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
      width: 134, height: 5, borderRadius: 3, background: 'var(--label-1)', opacity: 0.85, zIndex: 60,
      pointerEvents: 'none',
    }} />
  )
}
