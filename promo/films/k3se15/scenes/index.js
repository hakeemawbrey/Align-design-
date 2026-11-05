// k3se15: 3-SECOND ADVICE · "Hot, Cold, Hot, Cold" (6.6 s vertical trial reel, music: synthwave · Am). Format: k3se01/threekit.js.
//   0.00  frame 0: ♊ Gemini whiplashing between two texts, "miss u!!" (hot, red glow, left) and "busy lol" (cold, blue,
//         right); the whole room flashes red / blue.  Hook: "Hot, cold, hot, cold, | *hot.*"  Pisces sniffles.
//   0.50  record scratch: the flashing freezes on a split frame, half red, half blue.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Confusion is an answer too. | *Ask for clarity.*"  The colours settle; Gemini types "hey, where
//         are we at?"  The reply: "fair q. I like you. dinner fri?"  Gemini exhales. Hard cut at 6.6.
import { makeThree, R, box, bubble, label, shadow, phone, chat, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } from '../../k3se01/threekit.js'

const HOT = '#ff4a5e', COLD = '#4aa8ff'
function textCard(x, cx, cy, text, col, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 46px ${INTER}`
  const w = x.measureText(text).width + 60
  box(x, -w / 2, -45, w, 90, col, { b: 7 })
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}
function tint(x, col, a, x0 = 0, w = 1080) { x.save(); x.globalAlpha = a; x.fillStyle = col; x.fillRect(x0, 0, w, 1920); x.restore() }

function scene(x, t, S) {
  const { phase, u, hero } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  if (phase === 'hook') {
    const hot = Math.floor((t + 1) * 5) % 2 === 0
    if (t < 0.5) tint(x, hot ? HOT : COLD, 0.22)
    else { tint(x, HOT, 0.22, 0, 540); tint(x, COLD, 0.22, 540, 540) }
    textCard(x, 250, 690, 'miss u!!', HOT, hot || t >= 0.5 ? 1 : 0.8, -0.1)
    textCard(x, 830, 690, 'busy lol', COLD, !hot || t >= 0.5 ? 1 : 0.8, 0.1)
    shadow(x, 540, 1150, 270)
    hero(x, t, { x: 540, y: 950, s: 290, mood: hot ? 'heart' : 'wide', look: [hot ? -1 : 1, -0.4], squash: 0.08 * Math.sin(t * 31) })
    label(x, 'HOT', 250, 820, { size: 40, col: HOT, font: INTER, weight: 800 }); label(x, 'COLD', 830, 820, { size: 40, col: COLD, font: INTER, weight: 800 })
    return
  }
  const fade = 1 - clamp(u / 0.5)
  tint(x, HOT, 0.22 * fade, 0, 540); tint(x, COLD, 0.22 * fade, 540, 540)
  textCard(x, 250, 690, 'miss u!!', HOT, fade, -0.1)
  textCard(x, 830, 690, 'busy lol', COLD, fade, 0.1)
  const calm = u > 2.9
  shadow(x, 330, 1150, 250)
  hero(x, t, { x: lerp(540, 330, ease.inOutCubic(prog(u, 0.2, 0.7))), y: 950, s: 280, mood: calm ? 'happy' : 'neutral', look: [1, -0.2], hops: [2.45 + 0.7, 2.45 + 2.9] })
  const pk = clamp(prog(u, 0.5, 0.8))
  if (pk > 0) phone(x, 770, 860, { w: 380, h: 540, sc: pk, rot: 0.04, draw: (c, w) => {
    if (u > 0.9) chat(c, w, 40, 'hey, where are', { mine: true, size: 34, k: clamp(prog(u, 0.9, 1.05)) })
    if (u > 1.0) chat(c, w, 106, 'we at?', { mine: true, size: 34, k: clamp(prog(u, 1.0, 1.15)) })
    if (u > 2.6) chat(c, w, 200, 'fair q. I like you.', { size: 32, k: clamp(prog(u, 2.6, 2.75)), col: '#3fa07a' })
    if (u > 2.75) chat(c, w, 264, 'dinner fri?', { size: 32, k: clamp(prog(u, 2.75, 2.9)), col: '#3fa07a' })
  } })
  if (calm) { label(x, 'clear.', 330, 720, { size: 56, col: GOLD, font: INTER, weight: 800 }); sparkles(x, t, 330, 900, 2.45 + 2.9, 8, 160, 1) }
}

const EP = makeThree({
  id: 'k3se15', sign: 'gemini', dur: 6.6, brk: 'freeze', ending: 'cut', focus: [540, 820],
  hook: 'Hot, cold, hot, cold, | *hot.*', accent: '#ff4a5e',
  advice: 'Confusion is an answer too. | *Ask for clarity.*', adviceSize: 56,
  scene,
  cues: [
    ['pop', 0.0, 1318.51, 0.03, -0.5], ['pop', 0.2, 659.25, 0.03, 0.5], ['pop', 0.4, 1318.51, 0.03, -0.5],
    ['pop', 3.35, 1174.66, 0.035, 0.4], ['pop', 3.45, 1318.51, 0.035, 0.4],
    ['pop', 5.05, 987.77, 0.04, 0.4], ['pop', 5.2, 1318.51, 0.04, 0.4], ['glitter', 5.35, 5.8], ['pluck', 5.4, 1567.98, 0.035, -0.3, 0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
