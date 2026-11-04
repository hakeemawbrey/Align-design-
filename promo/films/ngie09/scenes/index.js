// ngie09: THE SIGNS AS WINTER GIFTS, "Sagittarius as a winter gift" (14 s vertical trial reel, music: pop · Bb).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Sagittarius* were a | winter gift:" — Sag mid-tug on the ribbon of a purple box: "you're
//             gonna love where this goes."
//   2.4–5.2   1 "a snow globe of a city you've *never* seen." A glass globe of tiny rooftops, snow swirling.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "comes with: *two* train tickets." Two tickets fan out: ADMIT ONE · ADMIT ONE. "you + me."
//   8.0–11.6  THE STARS: "Don't just tell the story. *Invite* them."
import { makeEp, R, box, bubble, card, shadow, snowfall, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

function globe(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -130, 110, 260, 60, '#6b4a2f', { b: 6, hi: '#8a6440' })
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 142, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#2a3a6a'; x.fillRect(-150, -150, 300, 300)
  const B = [[-110, 50, 50, 90, '#c45a5a'], [-60, 20, 60, 120, '#e6c27a'], [0, 40, 50, 100, '#7fb0d8'], [50, 10, 60, 130, '#d88aa0'], [110, 60, 40, 80, '#9fd8b0']]
  for (const [bx, by, w, h, c] of B) { R(x, INK, bx - w / 2 - 4, by - h / 2 - 4, w + 8, h + 150); R(x, c, bx - w / 2, by - h / 2, w, h + 140); for (let j = 0; j < 3; j++) R(x, '#fff1a8', bx - 10, by - h / 2 + 14 + j * 28, 10, 12) }
  R(x, '#ffffff', -150, 110, 300, 40)
  snowfall(x, t * 2, -150, -150, 300, 300, { n: 26, size: 6, speed: 40 })
  x.restore()
  R(x, 'rgba(255,255,255,0.35)', -100, -110, 26, 70)
  x.restore()
}
function ticket(x, cx, cy, rot, k) { card(x, cx, cy, 380, 140, ['ADMIT ONE', 'WINDOW SEAT'], { size: 34, rot, k, col: '#fff1a8', gap: 1.4 }) }

const EP = makeEp({
  id: 'ngie09', series: 'gifts', sign: 'sagittarius', name: 'Sagittarius', boxCol: '#7a4cc8', ribbon: GOLD, finGift: globe,
  hook(x, t, S) { giftHook(x, t, S, { line: 'you’re gonna love this.' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a snow globe of a city you’ve *never* seen.',
      draw(x, t, S) { giftReveal(x, t, S, globe, { line: 'yet.', lineAt: 1.4, heroMood: 'sparkle' }) },
      cues: [...revealCues, ['glitter', 0.7, 1.5], ['pop', 1.4, 987.77, 0.035, 0]] },
    { caption: 'comes with: *two* train tickets.',
      draw(x, t, S) {
        const { u, hero } = S
        const a = ease.outCubic(prog(u, 0, 0.35)), b = ease.outCubic(prog(u, 0.35, 0.7))
        ticket(x, 620, 720, -0.08, a); ticket(x, 660, 880, 0.06, b)
        shadow(x, 290, 1125, 210)
        hero(x, t, { x: 290, y: 1000, s: 220, mood: 'happy', look: [1, -0.5], hops: [S.t0 + 0.4, S.t0 + 0.75, S.t0 + 1.4] })
        bubble(x, t, 640, 1060, S.t0 + 1.2, S.t1, 'you + me. window seats.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.35, 1174.66, 0.04, -0.2], ['pop', 0.7, 1318.51, 0.04, 0.2], ['pop', 1.2, 987.77, 0.035, 0]] },
  ],
  last: 'Don’t just tell the story. *Invite* them.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK]
