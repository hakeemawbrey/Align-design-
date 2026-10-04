/** Keyframes local to the match / reveal screens (index.css is shared, so these live here). */
export default function RevealStyles() {
  return (
    <style>{`
@keyframes rv-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.045); } }
@keyframes rv-shimmer { 0% { transform: translateX(-120%) skewX(-12deg); } 60%,100% { transform: translateX(160%) skewX(-12deg); } }
@keyframes rv-hint { 0%,100% { opacity: .45; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } }
@keyframes rv-spin { to { transform: rotate(360deg); } }
@keyframes rv-glowpulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@keyframes rv-bob { 0%,100% { transform: translateY(0) rotate(-0.6deg); } 50% { transform: translateY(-9px) rotate(0.6deg); } }
@keyframes rv-foil { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
.rv-foil-text {
  background: var(--gold-foil); background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: rv-foil 3.2s linear infinite;
}
.rv-link { color: var(--label-3); transition: color .2s ease; }
.rv-link:hover { color: var(--label-1); }
.rv-cta.chrome-cta:hover { box-shadow: 0 0 42px rgba(248, 237, 255, 0.55), inset 0 1px 0 rgba(255,255,255,0.9); }
`}</style>
  )
}
