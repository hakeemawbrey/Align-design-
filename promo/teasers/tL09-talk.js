// L09 · Talk — tarot talk cards drifting on a weightless 3D spiral. Seamless 8s loop.
// Loop rules: the 8-card carousel turns exactly once per loop (slot j faces front at t = j s); the four hero cards
// sit on even slots, so each one drifts forward on its 2s bar, shows its question, then recedes as the next arrives.
// Gold sheen sweeps every bar; dust spirals one helix step per loop.
import { W, H, A, el, fill, lerp, clamp, rng, SERIF, MONO, BONE, GOLD, HOT, pixelStar,
  LOOP, BPM, ph, osc, kick, hat, bar, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 860
const CW = 370, CH = Math.round(CW * 1170 / 732)
const RX = 450, RZ = 420
const SLOTS = [
  { img: 'card-talk-1', q: 'What’s a hill\nyou will die on?' },
  { img: 'card-talk-2' },
  { img: 'card-talk-3', q: 'What does a perfect\nlazy Sunday look like?' },
  { img: 'card-talk-4' },
  { img: 'card-talk-6', q: 'Planned date\nor spontaneous?' },
  { img: 'card-talk-5' },
  { img: 'card-talk-daily', q: 'What’s worth spending\nreal money on?' },
  { img: 'card-back' },
]
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u) }
/** cyclic seconds from t to the moment slot j faces front */
const dtTo = (t, j) => ((((t - j) % LOOP) + LOOP + LOOP / 2) % LOOP) - LOOP / 2

function sparkleCanvas(px = 5, col = GOLD) {
  const c = document.createElement('canvas'); c.width = c.height = px * 7
  pixelStar(c.getContext('2d'), px * 3.5, px * 3.5, px, 0, col, HOT)
  return c
}
function makeCard(parent, name) {
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', transformStyle: 'preserve-3d', willChange: 'transform' }, parent)
  const halo = el('div', { position: 'absolute', left: '-60px', top: '-60px', width: (CW + 120) + 'px', height: (CH + 120) + 'px', borderRadius: '60px', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(242,199,92,0.45), rgba(180,92,255,0.18) 60%, rgba(0,0,0,0) 100%)' }, wrap)
  const im = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }, wrap); im.src = A + name + '.png'; im.decoding = 'sync'
  const dim = el('div', { position: 'absolute', inset: 0, background: '#0b0620', opacity: 0,
    webkitMaskImage: `url(${A}${name}.png)`, maskImage: `url(${A}${name}.png)`, webkitMaskSize: '100% 100%', maskSize: '100% 100%' }, wrap)
  const sheen = el('div', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(112deg, rgba(255,230,160,0) 42%, rgba(255,226,150,0.22) 48%, rgba(255,250,230,0.55) 50%, rgba(255,226,150,0.22) 52%, rgba(255,230,160,0) 58%)',
    backgroundSize: '320% 100%', webkitMaskImage: `url(${A}${name}.png)`, maskImage: `url(${A}${name}.png)`, webkitMaskSize: '100% 100%', maskSize: '100% 100%' }, wrap)
  const sp = sparkleCanvas(5)
  Object.assign(sp.style, { position: 'absolute', left: (CW * 0.82 - 17) + 'px', top: (CH * 0.07 - 17) + 'px', opacity: 0 }); wrap.appendChild(sp)
  const sp2 = sparkleCanvas(4)
  Object.assign(sp2.style, { position: 'absolute', left: (CW * 0.15 - 14) + 'px', top: (CH * 0.91 - 14) + 'px', opacity: 0 }); wrap.appendChild(sp2)
  return {
    set(x, y, { z = 0, rz = 0, rx = 0, ry = 0, s = 1, dimA = 0, haloA = 0 }) {
      wrap.style.zIndex = String(1000 + Math.round(z))
      wrap.style.transform = `translate3d(${x - CW / 2}px, ${y - CH / 2}px, ${z}px) rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
      dim.style.opacity = String(dimA); halo.style.opacity = String(haloA)
    },
    glint(p, a) {
      const on = p > 0 && p < 1
      sheen.style.opacity = on ? String(a * Math.sin(Math.PI * p)) : '0'
      sheen.style.backgroundPosition = `${lerp(110, -10, p)}% 0`
      const k1 = Math.sin(Math.PI * clamp((p - 0.15) / 0.45)), k2 = Math.sin(Math.PI * clamp((p - 0.5) / 0.45))
      sp.style.opacity = String(a * k1); sp.style.transform = `scale(${0.4 + k1 * 0.9}) rotate(${p * 90}deg)`
      sp2.style.opacity = String(a * k2); sp2.style.transform = `scale(${0.4 + k2 * 0.8}) rotate(${-p * 90}deg)`
    },
  }
}

export default {
  id: 'L09-talk', title: 'Talk cards (loop)', duration: LOOP, loop: true,
  music: {
    chords: [
      [0, 2, [146.83, 220, 293.66, 369.99, 440]],     // Dmaj9-ish
      [2, 4, [123.47, 185, 246.94, 293.66, 369.99]],  // Bm7
      [4, 6, [98, 146.83, 196, 246.94, 369.99]],      // Gmaj7
      [6, 8, [110, 164.81, 220, 277.18, 329.63]],     // A6/9
    ],
    bpm: BPM, pulseGain: 0.13, hatGain: 0.022, padGain: 0.026,
  },
  cues: [
    // each hero card arrives on the downbeat: soft whoosh before, a bell + sheen glitter as it lands
    ...[0, 1, 2, 3].flatMap(i => [
      ['whoosh', ((i * 2 - 0.7) + LOOP) % LOOP, 0.6, 0.045],
      ['bell', i * 2 + 0.02, [587.33, 739.99, 659.25, 554.37][i], 0.04, 2.4, (i - 1.5) * 0.25],
      ['bell', i * 2 + 0.12, [880, 1108.73, 987.77, 830.61][i], 0.018, 1.8, -(i - 1.5) * 0.25],
      ['glitter', i * 2 + 0.15, i * 2 + 0.9],
    ]),
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'rose', { seed: 9, stars: 120, grain: 0.18 })
    const sky = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); sky.width = W; sky.height = H
    const sctx = sky.getContext('2d')
    const glow = el('div', { position: 'absolute', left: (CX - 520) + 'px', top: (CY + 40 - 520) + 'px', width: '1040px', height: '1040px', borderRadius: '50%', mixBlendMode: 'screen',
      background: 'radial-gradient(closest-side, rgba(242,199,92,0.20), rgba(180,92,255,0.12) 50%, rgba(0,0,0,0) 100%)' }, root)
    const scene = fill(root, { perspective: '1700px', perspectiveOrigin: `${CX}px ${CY - 80}px`, overflow: 'visible' })
    const cards = SLOTS.map(s => makeCard(scene, s.img))   // direct children of the perspective layer, painted in z order
    const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '236px', textAlign: 'center', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.34em', color: 'rgba(242,213,138,0.85)' }, root, 'ALIGN · TALK CARDS')
    const qs = SLOTS.map(s => s.q ? el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '1390px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '84px', lineHeight: 1.1,
      color: BONE, whiteSpace: 'pre-line', opacity: 0, textShadow: '0 2px 30px rgba(11,6,32,0.85), 0 0 40px rgba(242,199,92,0.12)' }, root, s.q) : null)

    return {
      update(t) {
        bg.update(t)
        const k = kick(t), b = bar(t)
        const sweep = (t % 2) / 1.3                      // gold sheen, once per bar
        SLOTS.forEach((s, j) => {
          const th = 2 * Math.PI * (j / 8 - ph(t))         // 0 at the front
          const ringX = CX + Math.sin(th) * RX
          const ringZ = (Math.cos(th) - 1) * RZ - 60
          const ringY = CY + 260 * Math.cos(th) - 230 * Math.sin(th) + 18 * osc(t, 2, j / 8)
          const depthF = (1 - Math.cos(th)) / 2              // 0 front … 1 back
          let pose = { x: ringX, y: ringY, z: ringZ, ry: Math.sin(th) * 38, rz: -14 * Math.sin(th) + 3 * osc(t, 1, j / 5), rx: 8, s: 0.8 }
          let p = 0
          if (s.q) {
            const d = Math.abs(dtTo(t, j))
            p = 1 - ss(0.45, 1.15, d)
            const fy = 780 + 10 * osc(t, 4, 0.1)
            pose = {
              x: lerp(pose.x, CX, p), y: lerp(pose.y, fy, p), z: lerp(pose.z, 250, p),
              ry: lerp(pose.ry, -6 * dtTo(t, j), p), rz: lerp(pose.rz, 0, p), rx: lerp(pose.rx, 0, p),
              s: lerp(0.8, 1.02 + 0.012 * k, p),
            }
            const qa = ss(0.55, 0.95, p)
            qs[j].style.opacity = String(qa)
            qs[j].style.transform = `translateY(${(1 - qa) * 26 * Math.sign(dtTo(t, j) || 1)}px)`
            qs[j].style.filter = `blur(${(1 - qa) * 8}px)`
          }
          cards[j].set(pose.x, pose.y, { z: pose.z, ry: pose.ry, rz: pose.rz, rx: pose.rx, s: pose.s,
            dimA: (1 - p) * (0.08 + 0.55 * depthF), haloA: p * (0.55 + 0.45 * b) })
          cards[j].glint(clamp(sweep - j * 0.03), s.q ? 0.35 + 0.55 * p : 0.25)
        })
        glow.style.opacity = String(0.7 + 0.3 * b)
        eb.style.opacity = String(0.75 + 0.15 * b)
        // sky: twinkling pixel stars + a gold dust helix (one helix step per loop)
        sctx.clearRect(0, 0, W, H)
        loopStars(sctx, t, { seed: 19, sprites: 22, dots: 80, alpha: 0.8 })
        const h = hat(t), N = 72
        for (let i = 0; i < N; i++) {
          const u = ((i / N + ph(t)) % 1)                     // rises once per loop; motes are identical so the helix repeats
          const a = 2 * Math.PI * (u * 3 + i * 0.5)
          const x = CX + Math.sin(a) * (RX + 90), y = H * 0.98 - u * H * 0.92, front = Math.cos(a)
          const al = Math.sin(Math.PI * u) * (0.45 + 0.5 * (front + 1) / 2) * (0.7 + 0.3 * h)
          sctx.globalAlpha = al
          const px = front > 0.3 ? 5 : 3
          if (i % 9 === 0) pixelStar(sctx, Math.round(x), Math.round(y), px, 1, GOLD)
          else { sctx.fillStyle = i % 3 ? '#f2d58a' : '#fff3e0'; sctx.fillRect(Math.round(x) - px / 2, Math.round(y) - px / 2, px, px) }
        }
        sctx.globalAlpha = 1
        void rng
      },
    }
  },
}
