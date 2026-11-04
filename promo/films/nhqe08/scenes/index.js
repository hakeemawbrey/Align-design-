// nhqe08: HOLIDAYS THEN VS NOW, "Scorpio at dinner." (13 s vertical trial reel, promo/films/next30/b48.md,
// music: cinematic · Cm). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   a vault marked FEELINGS with a giant padlock; Scorpio guards it at the table: "fine. pass the salt." Sticker "feelings: *locked.*"
//   NOW    the vault door swings open, hearts float out; Scorpio: "I really missed you." Cancer and Taurus melt. Sticker "one *honest* sentence."
//   7.9    THE STARS: "One honest sentence opens the door."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, prog, ease, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

function vault(x, t, cx, cy, open) {
  box(x, cx - 170, cy - 200, 340, 400, '#5a6070', { b: 8, hi: '#7a8090' })
  ink(x, 'FEELINGS', cx, cy - 160, { size: 34, col: BONE, font: MONO })
  R(x, '#1a1430', cx - 130, cy - 120, 260, 290)
  if (open > 0) glow(x, cx, cy + 20, 260, open, '255,160,200')
  // the door swings open (scaled in x)
  const w = 260 * (1 - 0.85 * open)
  x.save(); x.translate(cx - 130, cy - 120); box(x, 0, 0, w, 290, '#6c7282', { b: 6 })
  if (open < 0.5) { x.fillStyle = INK; x.beginPath(); x.arc(w / 2, 145, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9aa0b0'; x.beginPath(); x.arc(w / 2, 145, 38, 0, Math.PI * 2); x.fill(); R(x, INK, w / 2 - 4, 110, 8, 70); R(x, INK, w / 2 - 35, 141, 70, 8) }
  x.restore()
  if (open < 0.3) {     // the padlock
    x.save(); x.translate(cx + 120, cy + 30); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(0, -40, 40, Math.PI, 0); x.stroke(); x.strokeStyle = '#c9b24a'; x.lineWidth = 8; x.beginPath(); x.arc(0, -40, 40, Math.PI, 0); x.stroke()
    box(x, -60, -40, 120, 100, GOLD, { b: 6 }); R(x, INK, -6, -6, 12, 30); x.restore()
  }
}
function table(x) { box(x, 60, 1180, 960, 50, '#6b4a2f', { b: 6, hi: '#8a6440' }) }

const EP = makeHQ({
  id: 'nhqe08', hook: '*Scorpio* at dinner: | then vs now', accent: '#ff6b8a', deep: '#8a1f3a',
  thenCap: 'feelings: *locked.*', nowCap: 'one *honest* sentence.',
  then(x, t, S) {
    vault(x, t, 540, 700, 0)
    S.star(x, t, 'cancer', { x: 180, y: 1040, s: 180, mood: 'neutral', look: [1, 0], seed: 3 })
    S.star(x, t, 'taurus', { x: 900, y: 1040, s: 180, mood: 'neutral', look: [-1, 0], seed: 5 })
    S.star(x, t, 'scorpio', { x: 540, y: 1060, s: 230, mood: 'squint', look: [0, 0], hops: [3.2] })
    table(x)
    bubble(x, t, 560, 900, S.split ? -1 : 2.7, 5.0, 'fine. pass the salt.', { size: 34, tail: 0 })
  },
  now(x, t, S) {
    const open = S.split ? 1 : ease.inOutCubic(prog(t, 5.6, 6.2))
    vault(x, t, 540, 700, open)
    if (!S.split) hearts(x, t, 6.0, 540, 700, { n: 8, spread: 300, life: 1.8 })
    const melt = S.split || t > 6.2
    S.star(x, t, 'cancer', { x: 180, y: 1040, s: 180, mood: melt ? 'heart' : 'wide', look: [1, 0], seed: 3, hops: [6.25] })
    S.star(x, t, 'taurus', { x: 900, y: 1040, s: 180, mood: melt ? 'heart' : 'wide', look: [-1, 0], seed: 5, hops: [6.3] })
    S.star(x, t, 'scorpio', { x: 540, y: 1060, s: 230, mood: 'sparkle', look: [0, 0], hops: [5.4, 5.8], blush: 1 })
    table(x)
    bubble(x, t, 560, 900, S.split ? -1 : 5.4, 10.6, 'I really missed you.', { size: 36, tail: 0 })
  },
  pisThen: { x: 960, y: 500, s: 100 }, pisNow: { x: 960, y: 500, s: 110 },
  last: 'One honest sentence opens the door.',
  cues: [['boom', 2.4, 0.15], ['pop', 5.42, 987.77, 0.04, 0], ['whoosh', 5.6, 0.6, 0.03], ['glitter', 6.0, 6.6], ['pop', 6.25, 1318.51, 0.04, -0.4], ['pop', 6.3, 1567.98, 0.04, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
