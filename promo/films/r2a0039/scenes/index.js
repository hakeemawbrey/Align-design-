// r2a0039: ADVICE ROLL CALL, "How each sign | handles being wrong." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, relatable line each with a light visual gag. Ending: group.
//   0.0–3.6    "How each sign | *handles being wrong.*"
//   3.6–49.2   Aries argues, then says sorry first · Taurus admits it three days later · Gemini blames Mercury
//              · Cancer apologises with a cake · Leo admits it beautifully (takes a bow) · Virgo: a correction, footnoted
//              · Libra agrees, then hugs it out · Scorpio admits it once, in a whisper · Sagittarius laughs, learns, books the next trip
//              · Capricorn: plan v2 · Aquarius: calls it data · Pisces cries about the apology
//  49.2        "Nobody’s perfect. | *All lovable.*"  The whole line-up.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#7ee08a', TEAL = '#4fd1c5', WARM = '#ffc36b'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function envelope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  shadow(x, -150, -95, 300, 190); box(x, -150, -95, 300, 190, BONE)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-150, -95); x.lineTo(0, 20); x.lineTo(150, -95); x.stroke()
  txt(x, '“you were right”', 0, 60, 26, INK, { font: INTER, weight: 800 })
  x.restore()
}
function planet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9a9ab0'; for (const [a, b, r] of [[-30, -20, 20], [30, 30, 14], [20, -40, 10]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  // a backwards arrow orbiting
  const a = -t * 1.6
  x.save(); x.rotate(a); x.fillStyle = GOLD; x.fillRect(120, -8, 16, 16); x.beginPath(); x.moveTo(128, -30); x.lineTo(150, -8); x.lineTo(106, -8); x.fill(); x.restore()
  x.restore()
}
function cake(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -140, -60, 280, 160); box(x, -140, -20, 280, 110, '#f6c89a'); box(x, -140, -60, 280, 40, '#fff4e2')
  x.fillStyle = PINK; for (let i = 0; i < 7; i++) x.fillRect(-130 + i * 40, -24, 20, 16 + (i % 2) * 10)
  txt(x, 'SORRY', 0, 40, 36, BROWN, { font: MONO, weight: 700 })
  box(x, -6, -110, 12, 50, SKYB, 3); x.fillStyle = GOLD; x.beginPath(); x.arc(0, -122 + Math.sin(t * 12) * 2, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}
function rose(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-7, 0, 14, 130); x.fillStyle = GREEN; x.fillRect(-4, 0, 8, 126)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, -10, 28, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff6b7a'; x.fillRect(-10, -22, 18, 12)
  x.restore()
}
function correction(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  shadow(x, -150, -190, 300, 380); box(x, -150, -190, 300, 380, '#fff4e2')
  txt(x, 'CORRECTION', 0, -150, 30, RED, { font: MONO, weight: 700 })
  for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-120, -100 + i * 32, 240 - (i % 2) * 50, 12) }
  if (lt > 0.9) { x.fillStyle = INK; x.fillRect(-150, 40, 300, 4); for (let i = 0; i < 4; i++) txt(x, `${i + 1}. see above`, -120, 70 + i * 28, 18, '#6b62a8', { font: MONO, weight: 700, align: 'left' }) }
  x.restore()
}
function scales(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = lerp(0.3, 0, ease.inOutCubic(prog(lt, 0.6, 1.4)))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -10, -140, 20, 260, GOLD, 4); box(x, -80, 110, 160, 24, GOLD, 4)
  x.save(); x.translate(0, -140); x.rotate(tilt); box(x, -170, -8, 340, 16, GOLD, 4)
  for (const s of [-1, 1]) { const px = s * 160; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, 0); x.lineTo(px - 50, 90); x.moveTo(px, 0); x.lineTo(px + 50, 90); x.stroke(); x.save(); x.translate(px, 90); x.rotate(-tilt); box(x, -60, 0, 120, 16, GOLD, 4); x.restore() }
  x.restore(); x.restore()
}
function backpack(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  shadow(x, -100, -130, 200, 250); box(x, -100, -130, 200, 250, ORANGE); box(x, -70, -10, 140, 80, '#e0902a', 4)
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, -130, 46, Math.PI, 0); x.stroke()
  x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(-60 + i * 46, -100, 30, 22)
  x.restore()
}
function plan(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  shadow(x, -150, -180, 300, 360); box(x, -150, -180, 300, 360, '#fff4e2')
  txt(x, lt > 1.0 ? 'PLAN v2' : 'PLAN v1', 0, -140, 40, lt > 1.0 ? '#2a9d5c' : INK, { font: MONO, weight: 700 })
  for (let i = 0; i < 5; i++) { x.fillStyle = lt > 1.0 ? GREEN : '#b9b0a0'; x.fillRect(-120, -80 + i * 44, 200 - (i % 2) * 50, 16); if (lt > 1.0) txt(x, '✓', 110, -72 + i * 44, 26, '#2a9d5c') }
  x.restore()
}
function graph(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -150, 340, 300); box(x, -170, -150, 340, 300, NAVY)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-140, -120); x.lineTo(-140, 120); x.lineTo(150, 120); x.stroke()
  const p = clamp((lt - 0.3) / 1.2)
  const pts = [[-130, 60], [-80, 90], [-30, 20], [20, 50], [70, -30], [130, -90]]
  x.strokeStyle = SKYB; x.lineWidth = 8; x.beginPath()
  pts.forEach(([a, b], i) => { if (i / (pts.length - 1) <= p) i ? x.lineTo(a, b) : x.moveTo(a, b) }); x.stroke()
  if (p >= 1) { x.fillStyle = GOLD; x.beginPath(); x.arc(-80, 90, 12, 0, Math.PI * 2); x.fill(); txt(x, 'oops', -80, 60, 22, GOLD, { font: MONO, weight: 700 }) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Argues for an hour. | *Then says sorry first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 790, 720, 'ROUND 1', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 920, 'SORRY! ♥', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 64, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Admits it. | *Three days later.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      envelope(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1080, 'DELIVERED: THURSDAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Got it wrong? | *Blamed Mercury.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      planet(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'RETROGRADE, PROBABLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Apologises | *with a homemade cake.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cake(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Admits it beautifully. | *Then takes a bow.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      rose(x, 730, 880, pop01(t, P.t0 + 1.0, 0.3, 2) * 1.5, -0.4)
      rose(x, 860, 900, pop01(t, P.t0 + 1.2, 0.3, 2) * 1.5, 0.3)
      label(x, 790, 680, 'ENCORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Issues a correction. | *With footnotes.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { correction(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Agrees you’re right. | *Then hugs it out.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      scales(x, t, 770, 900, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.75, lt)
      label(x, 790, 1110, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Admits it once. | *In a whisper.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 860, 'you were right', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 24, tail: 'bl' })
      label(x, 790, 680, 'NEVER AGAIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughs. Learns. | *Books the next trip.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      backpack(x, 340, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 340, 680, 'NEXT!', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 56, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Was wrong? | *Version two is better.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { plan(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'Being wrong? | *Calls it data.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      graph(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'FASCINATING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Apologises. Cries. | *Cries about the apology.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it’s okay!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      label(x, 790, 960, 'SO SORRY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
]

function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'
        for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2a0039', key: 'E', accent: WARM, ending: 'group',
  title: 'How each sign | *handles being wrong.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody’s perfect. | *All lovable.*',
    moods: ['heart', 'happy', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 2.4, spread: 800, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
