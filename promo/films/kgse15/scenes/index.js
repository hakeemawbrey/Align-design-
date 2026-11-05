// kgse15: GUESS THE SIGN, "Rereading the whole chat at 2 a.m." (10 s vertical, star_advice trial, screwed · Am, hard cut).
//   0.00  frame 0: the silhouette mid-scroll in the dark, a thread racing up past "MARCH", screen glow on its face.
//         Hook: "2 a.m. Rereading *the whole chat. Again.*"
//   0.35  sudden silence · the scroll speeds through the months, back to the very first "hi"
//   C1 "a crab night-light" · C2 "a cup of tea" · buzz · 3·2·1 · reveal: CANCER · last line, hard cut
import { makeGuess, box, R, phone, bubble, shadow, chat, drawStage, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const MONTHS = ['NOV', 'OCT', 'SEP', 'AUG', 'JUL', 'JUN', 'MAY', 'APR', 'MARCH']
const MSGS = ['lol same', 'you up?', 'that’s so you', 'night :)', 'omg', 'can’t wait', 'haha stop', 'good morning!']
function thread(u) {
  return (x, w, h) => {
    R(x, '#0e0b20', 0, 0, w, h)
    const sp = u < 0.35 ? 900 : u < 0.95 ? 0 : Math.min(1400, 300 + (u - 0.95) * 500)
    const off = (u < 0.35 ? u * 900 : 315 + Math.max(0, u - 0.95) * (300 + Math.max(0, u - 0.95) * 250)) % 600
    for (let i = -2; i < 10; i++) {
      const y = i * 66 + off
      if (i % 4 === 0) { const m = MONTHS[Math.min(MONTHS.length - 1, Math.floor((u * 1.4 + (i + 8) / 4)) % MONTHS.length)]; x.font = `800 15px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText(`— ${m} —`, w / 2, y + 18); continue }
      chat(x, MSGS[(i + 16) % MSGS.length], i % 2 ? w - 10 : 10, y, { me: i % 2 === 1, size: 15 })
    }
    if (sp > 400) { x.fillStyle = 'rgba(255,255,255,0.06)'; for (let k = 0; k < 6; k++) x.fillRect(0, (k * 97 + u * 900) % h, w, 3) }
    if (u > 4.2) { R(x, 'rgba(14,11,32,0.92)', 0, 0, w, h); x.font = `800 16px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('— the very first —', w / 2, 60); chat(x, 'hi', 10, 90, { size: 22 }) }
  }
}
function nightLight(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, 170); g.addColorStop(0, 'rgba(255,170,140,0.35)'); g.addColorStop(1, 'rgba(255,170,140,0)'); x.fillStyle = g; x.fillRect(-170, -170, 340, 340); x.restore()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 62, 42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ff9a7a'; x.beginPath(); x.ellipse(0, 0, 54, 34, 0, 0, Math.PI * 2); x.fill()
  for (const d of [-1, 1]) { box(x, d * 60 - 14, -56, 28, 22, '#ff9a7a', { b: 4 }); R(x, INK, d * 16 - 5, -14, 10, 10); for (let i = 0; i < 3; i++) R(x, INK, d * (30 + i * 12) - 3, 30, 6, 18) }
  x.restore()
}
function tea(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -44, -40, 88, 80, BONE, { b: 5 }); R(x, '#b8744a', -38, -34, 76, 14); x.lineWidth = 10; x.strokeStyle = INK; x.beginPath(); x.arc(52, 0, 20, -1.2, 1.2); x.stroke()
  for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.5; R(x, BONE, -20 + i * 20 + 6 * Math.sin(t * 3 + i), -80 - ((t * 30 + i * 13) % 40), 6, 20); x.restore() }
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse15', sign: 'cancer', D: 10, ending: 'cut', brk: 'silence',
  hook: '2 a.m. Rereading | *the whole chat. Again.*',
  clues: ['a crab night-light', 'a cup of tea'],
  last: 'Old texts are a memory, | *not a map.*',
  bg(x, S) { drawStage(x, S.u, { spot: 0.35 }); x.save(); x.fillStyle = 'rgba(5,4,16,0.35)'; x.fillRect(0, 300, 1080, 1620); x.restore() },
  draw(x, S) {
    const { t, u, rv, T } = S
    // screen glow on the face
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(700, 880, 30, 700, 880, 420); g.addColorStop(0, 'rgba(127,200,255,0.3)'); g.addColorStop(1, 'rgba(127,200,255,0)'); x.fillStyle = g; x.fillRect(200, 400, 900, 900); x.restore()
    const o = { x: 420, y: 1030, s: 360, mood: rv > 0.5 ? 'sparkle' : u > 4.2 ? 'heart' : 'wide', look: [1, -0.3], hops: [0.1, 1.5, 4.25].filter(h => h < S.R), rot: 0.14 * Math.exp(-u * 2) + 0.03 * Math.sin(u * 2), squash: -0.06 * Math.exp(-u * 3) }
    shadow(x, 420, 1250, 290)
    S.sil(o)
    phone(x, 760, 880, { w: 270, h: 460, rot: -0.06, fn: thread(u) })
    if (u < 0.6) label(x, '↑↑↑', 760, 600, { size: 60, col: CYAN, font: INTER, weight: 900, alpha: 1 - u / 0.6 })
    if (t > T.C1) nightLight(x, 160, 1180, pop01(t, T.C1 + 0.05, 0.3, 2.4), t)
    if (T.C2 != null) tea(x, 940, 1200, pop01(t, T.C2 + 0.05, 0.3, 2.4), t)
    if (rv > 0.5) bubble(x, t, 420, 750, S.R + 0.3, S.D + 1, 'okay. closing it. goodnight.', { size: 30 })
  },
  cues: [['whoosh', 0.0, 0.4, 0.05], ['riser', 1.0, 4.1, 0.03], ['pluck', 4.2, 1318.51, 0.04, 0.3, 0.5]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
