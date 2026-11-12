// v3a078: star_advice, ADVICE SOLO, "How to love | a Sagittarius." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Sagittarius well, warmly, one gag each.
//   0.0–3.6    "How to love | *a Sagittarius.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a kite climbing high: fly far · "road trip? now?" → YES! · "that shirt? bold." honest, with love
//              · back from roaming with a snow globe: got you this · a chalkboard of big plans: I'm in · a tent for two
//              · late reply? on a mountain, signal: 0 · a spinning globe: next, everywhere · the open cage: the bird
//              flies out, then lands back on Sagittarius' head: chose to stay
//  37.8        group ending: "Free spirit. | *Loyal heart.*"  Sagittarius comes back, hearts in its eyes.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e', YEL = '#ffd23a'
const S = 'sagittarius'

// ── props
const KITE = [
  '....R....',
  '...RRY...',
  '..RRRYY..',
  '.RRRRYYY.',
  'BBBBBGGGG',
  '.BBBBGGG.',
  '..BBBGG..',
  '...BBG...',
  '....B....',
]
const KITE_C = { R: RED, Y: YEL, B: '#6f8cff', G: MINT }
const GLOBE = [
  '...GGGG...',
  '.GGWWWWGG.',
  'GWWWWWWWWG',
  'GWWWSWWWWG',
  'GWWSSSWWWG',
  'GWWWSWWWWG',
  '.GWWWWWWG.',
  '..GGGGGG..',
  '..BBBBBB..',
  '.BBBBBBBB.',
]
const GLOBE_C = { G: '#c9d1e0', W: '#d8f1ff', S: '#ffffff', B: BROWN }
const TENT = [
  '......FF......',
  '......FR......',
  '.....OOOO.....',
  '....OOOOOO....',
  '...OOOKKOOO...',
  '..OOOKKKKOOO..',
  '.OOOKKKKKKOOO.',
  'OOOOKKKKKKOOOO',
]
const TENT_C = { F: BROWN, R: RED, O: '#ff9f5a', K: '#2a2350' }
const MOUNT = [
  '......W.......',
  '.....WWW......',
  '....WGGGW.....',
  '...GGGGGGG....',
  '..GGGGGGGGG.G.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7d86a8' }
const BIRD = [
  '..BBB...',
  '.BBKBB..',
  'BBBBBBOO',
  '.BBBBB..',
  '..BBBBB.',
  '...B.B..',
]
const BIRD_C = { B: SKYB, K: INK, O: ORANGE }

function globeSpin(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a6fd1'; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#5fd38a'
  const off = (t * 90) % 360
  for (const [lx, ly, w, h] of [[-120, -60, 90, 70], [20, -90, 70, 50], [60, 10, 110, 80], [-80, 40, 60, 60], [200, -40, 80, 90]]) {
    let px = ((lx + off + 180) % 360) - 180
    x.fillRect(px, ly, w, h)
  }
  x.restore()
  x.fillStyle = BROWN; x.fillRect(-14, 132, 28, 30); x.fillRect(-70, 160, 140, 18)
  x.restore()
}
function cage(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = GOLD; x.lineWidth = 8
  x.beginPath(); x.arc(0, -60, 110, Math.PI, 0); x.stroke()
  for (let i = -100; i <= 100; i += 40) { if (open && i === 100) continue; x.beginPath(); x.moveTo(i, -60); x.lineTo(i, 110); x.stroke() }
  x.fillStyle = GOLD; x.fillRect(-120, 106, 240, 16)
  if (open) { x.save(); x.translate(110, -40); x.rotate(-0.9); x.fillRect(0, -6, 140, 8); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Never clip | *their wings.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: 60 },
    front(x, t, lt, P, F) {
      const p = ease.outCubic(prog(lt, 0.2, 1.8)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const kx = lerp(620, 820, p), ky = lerp(860, 620, p) + 12 * Math.sin(t * 3)
      if (k > 0.5) { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(F.x + 80, F.cy); x.quadraticCurveTo(kx - 60, ky + 160, kx, ky + 60); x.stroke() }
      drawBits(x, KITE, KITE_C, kx, ky, 16 * k, { rot: 0.15 * Math.sin(t * 2) })
      label(x, 800, 1090, 'FLY FAR', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Say yes to | *the random plan.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'road trip? | right now?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 970, 'YES!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 70, bg: MINT, rot: -0.06 })
      sparkles(x, t, 790, 970, P.t0 + 1.25, 8, 170, 0.2)
    } },
  { sign: S, cap: 'Love the | *honesty.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'that shirt? | bold.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 950, 'bold is good!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 1110, 'HONEST, WITH LOVE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them roam. | *They bring gifts.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 128, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#bfe9ff'; x.beginPath(); x.arc(0, -20, 118, 0, Math.PI * 2); x.fill()
        drawBits(x, MOUNT, MOUNT_C, 0, 10, 12)
        x.fillStyle = '#fff'; for (let i = 0; i < 10; i++) { const ph = (t * 0.4 + i / 10) % 1; x.fillRect(Math.sin(i * 2.3) * 80 - 4, -110 + ph * 150, 8, 8) }
        x.fillStyle = INK; x.fillRect(-110, 90, 220, 50); x.fillStyle = BROWN; x.fillRect(-102, 96, 204, 38)
        x.restore()
      }
      label(x, 790, 1090, 'GOT YOU THIS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Get excited | *about the big ideas.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = BROWN; x.fillRect(-162, -112, 324, 224); x.fillStyle = '#2f5a45'; x.fillRect(-148, -98, 296, 196)
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const L = ['BIG PLANS:', 'learn the drums', 'open a café', 'see the aurora']
        L.forEach((s, i) => { if (lt > 0.4 + i * 0.25) x.fillText(s, 0, -64 + i * 44) })
        x.restore()
      }
      label(x, 790, 1080, "I'M IN.", pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Be their | *adventure buddy.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TENT, TENT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'TENT FOR TWO', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Slow reply? | *They’re on a mountain.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 780, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'SIGNAL: 0 BARS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'miss you! (later)', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Stay curious | *together.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      globeSpin(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'NEXT: EVERYWHERE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love them free. | *They’ll stay.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      cage(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.5)
      const p = ease.inOutCubic(prog(lt, 0.6, 1.5))
      const bx = lerp(800, F.x + 10, p), by = lerp(880, F.top - 34, p) - Math.sin(Math.PI * p) * 220
      drawBits(x, BIRD, BIRD_C, bx, by, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: p > 0 && p < 1 ? -1 : 1 })
      label(x, 800, 1110, 'CHOSE TO STAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a078', key: 'F', accent: LAV, solo: S, ending: 'group',
  title: 'How to love | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Loyal heart.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
