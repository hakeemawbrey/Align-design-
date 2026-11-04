// nffe24: FRIENDS FIRST ep 24 (finale), "The year's last friends' night" (28 s vertical, star_advice, music: cinematic · C).
// Story 0–25.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–8.6    "The whole group, | *together.*"  Cancer's living room, everyone in: Taurus, Capricorn and Cancer on the
//              couch; Leo (mid-hop, popping confetti again), Libra with the cookie plate, Sagittarius with the SAG ♡ card,
//              Gemini; Aquarius on the laptop call (ON CALL). The rebuilt bookshelf stands by the window. Pisces, on
//              the couch arm, already fountaining.
//   8.6        hard cut.  THE STARS: "friendship is a hundred small *check-ins*." → "and every one of them *counted*."
//   15.8       Capricorn stands up, phone raised, and reads out the message from ep 1, now theirs: "no reply needed."
//              … "I just love you all."  Everyone replies anyway, all at once: LOVE YOU!! · ♡♡♡ · REPLYING ANYWAY ·
//              SAME!!  Confetti, hearts.
//   21.0       Last line: "*Friends*, first."
import { makeFriends, stars, bubble, box, R, INK, BONE, label, table, mug, confetti, hearts, sparkles, glow, phoneSmall, drawStarChar, signStar, pop01, outK, ease, prog } from '../../nffe01/scenes/friendskit.js'

const BOOKS = ['#e8344e', '#7fd0ff', '#ffd23f', '#9fe6b0', '#ff8fb1', '#c9a6ff']
function shelf(x) {
  box(x, 40, 760, 170, 410, '#a8744a', { b: 6 }); R(x, '#6a4a2a', 52, 772, 146, 386)
  for (let r = 0; r < 3; r++) { R(x, INK, 46, 760 + (r + 1) * 100 - 4, 158, 10); for (let i = 0; i < 4; i++) { const h = 64 + (i * 7 + r) % 3 * 10; R(x, INK, 58 + i * 34, 760 + (r + 1) * 100 - 6 - h, 30, h); R(x, BOOKS[(i + r) % 6], 60 + i * 34, 760 + (r + 1) * 100 - 4 - h, 26, h - 2) } }
}
function laptop(x, t, cx, cy) {
  box(x, cx - 100, cy - 130, 200, 130, '#2b2350', { b: 6 }); R(x, '#26365a', cx - 90, cy - 120, 180, 108)
  const A = signStar('aquarius')
  x.save(); x.beginPath(); x.rect(cx - 90, cy - 120, 180, 108); x.clip()
  drawStarChar(x, cx, cy - 56, 96, t, { color: A.color, mood: t > 16.5 ? 'happy' : 'sparkle', look: [0, 0], seed: 9, hops: [0.4, 18.5, 19.3] })
  x.restore()
  label(x, 'ON CALL', cx, cy - 108, { size: 16, col: '#9fe6b0' })
  box(x, cx - 125, cy, 250, 14, '#6a6488', { b: 5 })
}
function cookies(x, cx, cy) { box(x, cx - 60, cy - 8, 120, 16, '#f4f0ff', { b: 4 }); for (let i = 0; i < 3; i++) { R(x, INK, cx - 46 + i * 32, cy - 30 - (i % 2) * 8, 28, 24); R(x, '#d9a05a', cx - 43 + i * 32, cy - 27 - (i % 2) * 8, 22, 18) } }
function nameCard(x, cx, cy) { box(x, cx - 56, cy - 22, 112, 44, BONE, { b: 4 }); label(x, 'SAG ♡', cx, cy + 2, { size: 22, col: '#c0577a' }) }
const REPLIES = [[18.3, 'LOVE YOU!!', 230, 700, '#ffc38a'], [18.6, '♡♡♡', 820, 640, '#ffc8ec'], [18.9, 'REPLYING ANYWAY', 560, 560, '#ffe58a'], [19.2, 'SAME!!', 360, 820, '#b8f0c0'], [19.5, 'love you more', 760, 800, '#cfe4ff']]
const CHEER = [18.3, 18.8, 19.3, 19.8, 20.3]
function crowd(x, t, S, phase) {
  const cheer = phase === 2 && t > 18.2
  const H = (base) => cheer ? CHEER.map(v => v + base) : []
  S.star(x, t, 'taurus', { x: 290, y: 990, s: 200, mood: cheer ? 'happy' : 'happy', look: [1, 0], hops: H(0.05) })
  if (phase !== 2 || t < 15.95) S.star(x, t, 'capricorn', { x: 520, y: 990, s: 210, mood: 'happy', look: [0, 0], hops: phase === 0 ? [2.0] : [] })
  S.star(x, t, 'cancer', { x: 750, y: 990, s: 200, mood: cheer ? 'sparkle' : 'happy', look: [-1, 0], hops: H(0.1) })
}
function front(x, t, S, phase) {
  const cheer = phase === 2 && t > 18.2
  const H = (base, def = []) => cheer ? CHEER.map(v => v + base) : def
  table(x, 580, 1250, 300, '#7a5034'); laptop(x, t, 580, 1244); mug(x, t, 700, 1244, 0.9, '#ff8fb1')
  S.star(x, t, 'leo', { x: 170, y: 1190, s: 170, mood: 'sparkle', look: [1, -1], hops: H(0.12, phase === 0 ? [-0.12, 1.0] : []) })
  S.star(x, t, 'libra', { x: 360, y: 1210, s: 160, mood: 'happy', look: [1, -1], hops: H(0.18) }); cookies(x, 360, 1290)
  S.star(x, t, 'sagittarius', { x: 800, y: 1210, s: 160, mood: 'happy', look: [-1, -1], hops: H(0.22) }); nameCard(x, 800, 1295)
  S.star(x, t, 'gemini', { x: 950, y: 1180, s: 150, mood: 'sparkle', look: [-1, -1], hops: H(0.08, phase === 0 ? [0.6, 2.6] : []) })
}
const EP = makeFriends({
  id: 'nffe24', dur: 30, cut: 8.6,
  hook: { text: 'The whole group, | *together.*', out: 3.6, color: '#ffd89a' },
  lines: [
    stars(9.0, 'friendship is a hundred small *check-ins*.'),
    stars(12.4, 'and every one of them *counted*.'),
  ],
  boxes: [{ from: 0, to: 2, close: 15.6 }],
  last: { at: 21.0, text: '*Friends*, first.', color: '#ffd89a' },
  shots: [
    { at: 0, set: 'room', setOpts: { lamp: false }, pis: { x: 920, y: 960, s: 110, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) { shelf(x); crowd(x, t, S, 0) },
      front(x, t, S) { front(x, t, S, 0); confetti(x, t, 1.0, 170, 1050, { n: 30 }); confetti(x, t, -0.6, 170, 1050, { n: 30 }) } },
    { at: 8.6, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        glow(x, 540, 860, 460, 0.7, '255,226,160')
        S.star(x, t, 'stars', { x: 540, y: 860, s: 380, mood: t > 13.7 ? 'happy' : 'sparkle', look: [0, 0.2], hops: [8.65, ...S.STARS_HOPS], seed: 2, glow: 1.2 })
        S.star(x, t, 'capricorn', { x: 220, y: 1250, s: 160, mood: t < 12.3 ? 'neutral' : 'sparkle', look: [1, -1], hops: [12.4] })
      } },
    { at: 15.8, set: 'room', setOpts: { lamp: false }, pis: { x: 920, y: 960, s: 110, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) {
        shelf(x); crowd(x, t, S, 2)
        if (t >= 15.95) {
          const up = ease.outBack ? ease.outCubic(prog(t, 15.95, 16.3)) : 1
          S.star(x, t, 'capricorn', { x: 520, y: 990 - 120 * up, s: 240, mood: t < 17.0 ? 'neutral' : 'happy', look: [0, 0], hops: [16.0, 17.1, 18.4], tears: t > 17.6 ? 1 : 0 })
          phoneSmall(x, t, 640, 900 - 100 * up, { s: 0.7, rot: 0.2, glowA: 1 })
        }
        bubble(x, t, 540, 600, 16.1, 17.9, 'no reply needed.', { size: 40, col: '#e9d9a8' })
        bubble(x, t, 540, 600, 17.2, 18.2, 'I just love you all.', { size: 40, col: '#e9d9a8' })
        REPLIES.forEach(([a, w, bx, by, c]) => bubble(x, t, bx, by, a, 20.8, w, { size: 34, col: c }))
      },
      front(x, t, S) { front(x, t, S, 2); confetti(x, t, 18.3, 540, 700, { n: 40, life: 2.6 }); hearts(x, t, 18.5, 540, 860, { n: 10, spread: 600 }); sparkles(x, t, 540, 820, 18.3, 14, 280, 1) } },
  ],
  cues: [
    ['boom', 1.0, 0.15], ['pop', 1.0, 1567.98, 0.04, -0.4], ['glitter', 1.0, 1.6], ['pop', 0.4, 880, 0.03, 0],
    ['whoosh', 15.95, 0.3, 0.03], ['pop', 16.1, 987.77, 0.04, 0], ['pop', 17.2, 1174.66, 0.04, 0], ['pluck', 17.6, 1318.51, 0.035, 0.8, 0],
    ...REPLIES.map(([a], i) => ['pop', a, [1318.51, 1567.98, 1174.66, 1760, 987.77][i], 0.045, (i % 2 ? 0.4 : -0.4)]), ['boom', 18.3, 0.22], ['glitter', 18.3, 19.4], ['bell', 18.35, 1760, 0.03, 1.4, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void outK; void pop01
