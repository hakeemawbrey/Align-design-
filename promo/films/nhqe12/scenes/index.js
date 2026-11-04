// nhqe12: HOLIDAYS THEN VS NOW, "Pisces at the holiday movie." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: dreamy · Db). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Pisces alone in the TV glow, crying at a snowy movie, one tissue left in the box. Sticker "*one* tissue left."
//   NOW    Pisces and Cancer on the couch, Cancer holding the tissue box, both crying, both fine. Sticker "two criers, *one* box."
//   7.9    THE STARS: "Cry with company this year."
import { makeHQ, box, R, ink, shadow, glow, bubble, snow, tissueBox, starFrame, inSprite, tearsCells, drawStarChar, signStar, INK, BONE, MONO } from '../../nhqe01/scenes/hqkit.js'

function tv(x, t, cx, cy) {
  box(x, cx - 230, cy - 160, 460, 300, '#2a2148', { b: 8 })
  R(x, '#24306a', cx - 210, cy - 140, 420, 260)
  x.save(); x.beginPath(); x.rect(cx - 210, cy - 140, 420, 260); x.clip()
  R(x, '#e9e6f6', cx - 210, cy + 70, 420, 50)
  drawStarChar(x, cx - 60, cy + 30, 90, t, { color: '#ff8fb1', mood: 'heart', seed: 40 }); drawStarChar(x, cx + 60, cy + 30, 90, t, { color: '#7fd0ff', mood: 'heart', seed: 41 })
  snow(x, t, { n: 14, y0: cy - 150, y1: cy + 130, seed: 9 })
  x.restore()
  R(x, INK, cx - 80, cy + 148, 160, 22); R(x, INK, cx - 12, cy + 140, 24, 20)
  glow(x, cx, cy + 200, 520, 0.6, '170,200,255')
}
function couch(x) { box(x, 120, 1060, 840, 110, '#5b4a8a', { b: 7, hi: '#6e5ca0' }); box(x, 120, 940, 840, 130, '#4b3c78', { b: 7 }) }
const CAN = signStar('cancer')

const EP = makeHQ({
  id: 'nhqe12', hook: '*Pisces* holiday movie: | then vs now', accent: '#c9a6ff', deep: '#5a3fa0',
  thenCap: '*one* tissue left.', nowCap: 'two criers, *one* box.',
  noPis: true,
  then(x, t, S) {
    tv(x, t, 540, 640)
    shadow(x, 460, 1270, 240)
    S.pis(x, t, { x: 460, y: 1090, s: 250, mood: 'sparkle', look: [0, -1], tears: 3, hops: [3.0, 4.0] })
    tissueBox(x, 720, 1220, 120)
    bubble(x, t, 480, 900, S.split ? -1 : 2.7, 5.0, 'it’s just a movie…', { size: 34, tail: 0 })
  },
  now(x, t, S) {
    tv(x, t, 540, 620)
    couch(x)
    S.pis(x, t, { x: 380, y: 1000, s: 230, mood: 'happy', look: [1, -0.4], tears: 3, hops: [5.5, 6.4, 7.3] })
    const o = { color: CAN.color, glyph: CAN.glyph, mood: 'happy', look: [-1, -0.4], seed: 3, hops: [5.7, 6.6] }
    drawStarChar(x, 700, 1000, 230, t, o)
    inSprite(x, starFrame(700, 1000, 230, t, o), () => tearsCells(x, t, 2))
    x.save(); x.translate(560, 1080); x.rotate(-0.08); tissueBox(x, 0, 0, 130); x.restore()
    ink(x, '♥', 540, 900, { size: 60, col: '#ff5c8a', font: 'serif' })
  },
  last: 'Cry with company this year.',
  cues: [['pop', 2.72, 880, 0.035, 0], ['pop', 5.5, 1174.66, 0.035, -0.3], ['pop', 5.7, 1318.51, 0.035, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, MONO]
