// kgse03: GUESS THE SIGN, "The screenshot of the first text" (9 s vertical, star_advice trial, dreamy · F, hard cut).
//   0.00  frame 0: the silhouette mid-hug of a giant phone, a screenshot shutter flash, "Screenshot saved".
//         Hook: "Still has the first *'hi'* screenshotted."
//   0.35  colour flash · it scrolls a whole folder of screenshots ("good morning", "hi :)", "miss u?")
//   C1 "a seashell" · C2 "a scrapbook" · buzz "PISCES?" · 3·2·1 · reveal: CANCER · last line, hard cut
import { makeGuess, box, R, phone, bubble, shadow, hearts, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, CYAN, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const SHOTS = ['hi', 'good morning :)', 'lol same', 'night!!', 'miss u?', 'hi :)', 'see u fri', 'haha']
function folder(u, S) {
  return (x, w, h) => {
    R(x, '#1d1838', 0, 0, w, h)
    x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('SCREENSHOTS · 214', 14, 24)
    const off = Math.max(0, u - 1.2) * 70
    for (let i = 0; i < 16; i++) {
      const c = i % 2, r = Math.floor(i / 2), X = 12 + c * (w / 2 - 6), Y = 50 + r * 96 - (off % 384)
      if (Y < 40 || Y > h) continue
      R(x, '#2e2752', X, Y, w / 2 - 18, 86); R(x, '#4a4080', X + 8, Y + 30, (w / 2 - 34) * 0.8, 24)
      x.font = `700 15px ${INTER}`; x.fillStyle = BONE; x.fillText(SHOTS[i % SHOTS.length], X + 14, Y + 42)
      if (i % 5 === 0) { x.fillStyle = PINK; x.fillText('♥', X + w / 2 - 44, Y + 16) }
    }
  }
}
function shell(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-64, 30); x.quadraticCurveTo(0, -86, 64, 30); x.closePath(); x.fill()
  x.fillStyle = '#ffc9b0'; x.beginPath(); x.moveTo(-54, 24); x.quadraticCurveTo(0, -72, 54, 24); x.closePath(); x.fill()
  for (let i = -2; i <= 2; i++) R(x, '#e89a88', i * 18 - 3, -30 + Math.abs(i) * 10, 6, 54 - Math.abs(i) * 10)
  box(x, -20, 24, 40, 14, '#ffc9b0', { b: 4 })
  x.restore()
}
function scrapbook(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.1 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  box(x, -110, -80, 220, 160, '#c86a8a', { b: 6 }); R(x, BONE, -96, -66, 92, 132); R(x, BONE, 4, -66, 92, 132)
  R(x, '#8fd0ff', -84, -52, 68, 50); R(x, PINK, 16, -40, 68, 56); x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('our 1st', -50, 30); x.fillText('“hi”', 50, 40)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse03', sign: 'cancer', D: 9, ending: 'cut', brk: 'flash', flashCol: '#8fd0ff',
  hook: 'Still has the first | *‘hi’* screenshotted.',
  clues: ['a seashell', 'a scrapbook'],
  last: 'Keep the memory. | *Let the hope rest.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    // shutter flash at frame 0
    const fl = Math.exp(-u * 3.2)
    const hug = 0.06 * Math.sin(u * 3)
    shadow(x, 540, 1240, 330)
    S.sil({ x: 430, y: 1020, s: 380, mood: rv > 0.5 ? 'sparkle' : 'wide', look: [1, -0.3], hops: [1.4, 2.6, 3.8].filter(h => h < S.R), rot: 0.12 + hug, squash: -0.06 * fl })
    phone(x, 690, 930, { w: 300, h: 500, rot: -0.1 + hug * 0.5, fn: folder(u, S) })
    if (fl > 0.03) {
      x.save(); x.globalAlpha = fl; x.strokeStyle = '#ffffff'; x.lineWidth = 26; x.strokeRect(530, 670, 330, 520); x.restore()
      x.save(); x.globalAlpha = clamp(fl * 2); box(x, 560, 1210, 280, 54, BONE, { b: 5 }); x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Screenshot saved', 700, 1238); x.restore()
    }
    shell(x, 180, 1220, pop01(t, T.C1 + 0.05, 0.3, 2.6))
    if (T.C2 != null) scrapbook(x, 190, 860, pop01(t, T.C2 + 0.05, 0.3, 2.4), t)
    hearts(x, t, 1.5, 600, 760, { n: 4 }); hearts(x, t, 3.4, 640, 760, { n: 4 })
    if (rv > 0.5) bubble(x, t, 360, 700, S.R + 0.3, S.D + 1, 'it was a really nice hi.', { size: 32, tail: 0.3 })
  },
  cues: [['pop', 0.0, 1760, 0.05, 0], ['tick', 0.01, 0.1], ['whoosh', 1.3, 0.6, 0.03], ['pluck', 1.6, 1318.51, 0.03, 0.3, 0.3], ['pluck', 3.5, 1174.66, 0.03, -0.3, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
