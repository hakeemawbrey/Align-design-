// r2a0051: star_advice, ADVICE SOLO, "Making friends | with a Virgo." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to befriend a Virgo, each a relatable truth + a warm
// reframe, one visual gag each.
//   0.0–3.6    "Making friends | *with a Virgo.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              show up on time (they noticed: a clock at 6:59) · ask for advice (the scroll unrolls) · let them proofread
//              your text, it’s a hug · remember the little things, they do (a notebook of your faves) · clean up after
//              dinner, instant best friend · text a real plan, not “sometime” · they tuck in your tag, that’s affection
//              · they worry quietly, ask how they are (a mug of tea) · stick around, loyal forever (a friendship check)
//  37.8        "Picky? | *Picky about you.*"  Virgo comes back, big.
//  41.0        LESSON: "Small, steady care | is how *Virgos love.*"  STATUS: BESTIES
//  46.9        "Then they label | *your leftovers.*"  Three neat containers, labelled.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ef5c94', CREAM = '#fff4e2', RED = '#e23d4e', KRAFT = '#c98f2a', GREEN = '#5fd068'
const S = 'virgo'

// ── props
const SHIRT = [
  '..BBB..BBB..',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBB.BBBB.BBB',
  '...BBBBBB...',
  '...BBBBBB...',
  '...BBBBBB...',
  '...BBBBBB...',
]
const MUG = [
  '.S..S..',
  '..S..S.',
  'MMMMM..',
  'MTTTMMM',
  'MMMMM.M',
  'MMMMMMM',
  'MMMMM..',
  '.MMM...',
]
const MUG_C = { M: CREAM, T: '#a0603a', S: 'rgba(239,230,214,0.7)' }
const SPONGE = ['YYYYYY', 'YYYYYY', 'GGGGGG']

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a pixel clock face; the minute hand lands just before the hour
function clock(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 126, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 104 - 5, Math.sin(a) * 104 - 5, 10, 10) }
  const m = lerp(-0.6, -0.02, ease.outCubic(prog(lt, 0.2, 1.1)))   // minutes before the hour, in turns
  x.save(); x.rotate(m * Math.PI * 2); x.fillStyle = INK; x.fillRect(-5, -100, 10, 100); x.restore()
  x.save(); x.rotate(6.95 / 12 * Math.PI * 2); x.fillStyle = ROSE; x.fillRect(-7, -66, 14, 66); x.restore()
  x.fillStyle = INK; x.fillRect(-12, -12, 24, 24)
  x.restore()
}
// an advice scroll that keeps unrolling
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const L = lerp(80, 470, ease.outCubic(prog(lt, 0.4, 1.6)))
  x.save(); x.translate(cx, cy - 230); x.scale(k, k); x.rotate(0.03)
  x.fillStyle = INK; x.fillRect(-136, -6, 272, L + 12); x.fillStyle = CREAM; x.fillRect(-130, 0, 260, L)
  x.fillStyle = INK; x.fillRect(-150, -26, 300, 34); x.fillStyle = KRAFT; x.fillRect(-144, -20, 288, 22)
  x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const TIPS = ['1. drink water', '2. sleep at 10', '3. stretch', '4. budget', '5. call your mom', '6. floss', '7. …']
  TIPS.forEach((s, i) => { const y = 40 + i * 62; if (y > L - 20) return; x.fillStyle = MINT; x.fillRect(-112, y - 12, 24, 24); x.fillStyle = INK; x.fillRect(-106, y - 6, 12, 12); x.fillText(s, -76, y) })
  x.restore()
}
// a phone with a text that gets gently proofread
function proof(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 290, 420, k, { rot: 0.04, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-128, -186, 256, 372)
  x.fillStyle = SKYB; x.fillRect(-110, -130, 220, 120)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const fixed = lt > 1.0
  x.fillText('your so', 0, -94); x.fillText('nice tho', 0, -50)
  if (fixed) {
    const a = clamp((lt - 1.0) * 3)
    x.globalAlpha = a; x.fillStyle = RED; x.fillRect(-82, -96, 64, 5); x.font = `800 26px ${INTER}`; x.fillText("you're", -40, -136 + 2)
    x.fillRect(16, -52, 66, 5); x.fillText('though', 50, -16)
    x.globalAlpha = 1
  }
  if (lt > 1.6) { x.fillStyle = PINK; x.fillRect(-60, 50, 170, 56); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('ty bestie ♡', 25, 78) }
  x.restore()
}
// a little notebook: "your faves"
function notebook(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 300, 360, k, { rot: -0.04 })) return
  x.fillStyle = ROSE; x.fillRect(-150, -180, 300, 54)
  x.fillStyle = CREAM; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR FAVES', 0, -152)
  x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK
  const L = ['oat milk', 'window seat', 'no cilantro', 'dog: Biscuit', 'bday: 3/14']
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * L.length + 0.999)
  L.slice(0, n).forEach((s, i) => { x.fillStyle = '#b9b0a0'; x.fillRect(-126, -64 + i * 54 + 18, 252, 2); x.fillStyle = INK; x.fillText('• ' + s, -120, -64 + i * 54) })
  x.restore()
}
// a gleaming plate and a sponge
function plate(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 66, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, -4, 140, 58, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e6e2f2'; x.beginPath(); x.ellipse(0, -4, 90, 34, 0, 0, Math.PI * 2); x.fill()
  const sp = lt < 1.3 ? Math.sin(lt * 14) * 50 : 0
  if (lt < 1.4) { x.fillStyle = 'rgba(160,96,58,0.7)'; const d = 1 - clamp(lt / 1.3); for (let i = 0; i < 5; i++) x.fillRect(-60 + i * 26, -20 + (i % 2) * 14, 18 * d, 12 * d) }
  drawBits(x, SPONGE, { Y: GOLD, G: GREEN }, sp, -60, 14, { alpha: lt < 1.4 ? 1 : 0 })
  x.restore()
  if (lt > 1.3) sparkles(x, t, cx, cy - 20, t - lt + 1.3, 7, 150, 0.4)
}
// phone: a real plan, and a happy reply
function planPhone(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 290, 420, k, { rot: -0.04, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-128, -186, 256, 372)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  const msg = (s, y, col, a, dx) => { if (a <= 0.01) return; x.save(); x.translate(dx, y); x.scale(a, a); x.font = `800 26px ${INTER}`; const w = x.measureText(s).width + 30; x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(s, 0, 2); x.restore() }
  const p = (t0) => easeK(lt, t0)
  msg('sat, 2pm,', -110, BONE, p(0.3), -14); msg('the park?', -50, BONE, p(0.45), -14)
  msg('calendar’d ♡', 40, MINT, p(1.2), 14)
  x.restore()
}
const easeK = (lt, t0) => clamp(ease.outBack ? ease.outBack(clamp((lt - t0) / 0.3)) : ease.outCubic(clamp((lt - t0) / 0.3)))
// containers with neat labels (the last line)
function leftovers(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const L = ['MON ✓', 'TUE ✓', 'YOURS ♡']
  L.forEach((s, i) => {
    const a = pop01(t, t - lt + 0.5 + i * 0.25, 0.3, 2.2) * k
    if (a <= 0.01) return
    x.save(); x.translate(cx + (i - 1) * 250, cy); x.scale(a, a)
    x.fillStyle = INK; x.fillRect(-106, -76, 212, 152); x.fillStyle = 'rgba(200,230,255,0.85)'; x.fillRect(-98, -50, 196, 118)
    x.fillStyle = i === 2 ? PINK : SKYB; x.fillRect(-106, -82, 212, 36)
    x.fillStyle = ['#e07a4a', GREEN, GOLD][i]; x.fillRect(-80, -10, 160, 64)
    x.restore()
    label(x, cx + (i - 1) * 250, cy + 110, s, a, { size: 28, bg: CREAM, rot: (i - 1) * 0.04, font: MONO, weight: 700 })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Show up on time. | They *noticed.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      clock(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, '6:59. ICONIC.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask for their advice. | *They have a list.*', mood: lt => lt > 0.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      scroll(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1150, 'PART 1 OF 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them proofread. | *It’s a hug.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      proof(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: S, cap: 'Remember the little things. | *They always do.*', mood: 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      notebook(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 850, P.t0 + 1.7, 6, 200, 0.2)
    } },
  { sign: S, cap: 'Help clean up after dinner. | *Instant best friend.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plate(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 650, 'SPOTLESS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'BOND: SEALED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text a real plan. | Not *“sometime.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      planPhone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: S, cap: 'They tucked in your tag? | *That’s affection.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHIRT, { B: SKYB }, 790, 860, 26 * k)
      if (k > 0.5) {
        const tuck = ease.inOutCubic(prog(lt, 0.7, 1.1))
        x.fillStyle = INK; x.fillRect(772, 778 - 46 * (1 - tuck), 36, 4 + 46 * (1 - tuck))
        x.fillStyle = CREAM; x.fillRect(776, 782 - 46 * (1 - tuck), 28, 42 * (1 - tuck))
      }
      label(x, 790, 640, 'TAG: HANDLED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'They worry quietly. | *Ask how they are.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: lt => lt > 1.4 ? [1, 0] : [0, 1], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const slide = ease.outCubic(prog(lt, 0.4, 1.0))
      drawBits(x, MUG, MUG_C, lerp(900, 660, slide), 980, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 660, 'how are YOU?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 370, 600, 'oh! …thanks ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Stick around. | They’re *loyal forever.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 300, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#2a2350' })) {
        x.fillStyle = ROSE; x.fillRect(-150, -170, 300, 56)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIEND CHECK', 0, -142)
        x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.fillText('♍︎ VIRGO + YOU', 0, -60)
        const g = ease.outCubic(prog(lt, 0.6, 1.5)); x.fillStyle = INK; x.fillRect(-110, 0, 220, 40); x.fillStyle = MINT; x.fillRect(-104, 6, 208 * g, 28)
        x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; if (lt > 1.5) x.fillText('FOR LIFE ✦', 0, 96)
        x.restore()
      }
      sparkles(x, t, 790, 850, P.t0 + 1.5, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0051', key: 'D', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Making friends | *with a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Picky? | *Picky about you.*', mood: 'heart' },
  lesson: { text: 'Small, steady care | is how *Virgos love.*', chip: 'STATUS: BESTIES' },
  last: {
    text: 'Then they label | *your leftovers.*',
    draw(x, t, lt) { leftovers(x, t, 540, 1250, 1, lt) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
