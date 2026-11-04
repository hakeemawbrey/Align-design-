// nvse23: SIGN VS SIGN, "Who handles the holiday photo better?" ♌ Leo vs ♓ Pisces (18 s trial reel, b46,
// music: dreamy · F). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
// Pisces plays this one, so it cries on its own side (no corner Pisces).
//   hook: a camera flashes between them.
//   ROUND 1 ♌ "finds *the light* in any room." flash after flash, the shot counter climbs. "one more! my left side!" → "ok, twelve more."
//   ROUND 2 ♓ "sobs at how *cute* it came out." the print, then a gold frame. "we look so happy!!" → "*sob* I’m framing it."
//   VERDICT "BOTH. | *Best photo yet.*" the framed photo of the two of them.  THE STARS: "Get in the picture. You'll want it later."
import { makeVersus, drawStarChar, drawProp, paper, label, box, R, signStar, pop01, SW, T, GOLD, MINT } from '../../nvse01/scenes/versuskit.js'

const LEO = signStar('leo'), PIS = signStar('pisces')
function photo(x, t, cx, cy, w, k, framed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  if (framed) box(x, -w / 2 - 22, -w * 0.4 - 22, w + 44, w * 0.8 + 44, GOLD, { b: 6 })
  box(x, -w / 2, -w * 0.4, w, w * 0.8, '#ffffff', { b: 6 })
  R(x, '#2a2a5a', -w / 2 + 14, -w * 0.4 + 14, w - 28, w * 0.8 - 50)
  drawStarChar(x, -w * 0.17, w * 0.04, w * 0.3, t, { color: LEO.color, mood: 'sparkle', bob: 0, tips: false, glow: 0.5 })
  drawStarChar(x, w * 0.17, w * 0.04, w * 0.3, t, { color: PIS.color, mood: 'happy', bob: 0, tips: false, glow: 0.5 })
  x.restore()
}
function flash(x, t, a) { if (a <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#fffbea'; x.fillRect(0, 330, 1080, 900); x.restore() }

const EP = makeVersus({
  id: 'nvse23', a: 'leo', b: 'pisces', accent: '#f39a3a',
  hook: 'Who handles | the *holiday photo* better?',
  hookMoods: ['sparkle', 'sparkle'],
  hookDraw(x, t) { drawProp(x, 'camera', 540, 650, 11); const f = (t * 1.2) % 1; if (f < 0.1) label(x, '✦', 560, 600, { size: 60, col: '#fffbea' }) },
  rounds: [
    {
      caption: 'finds *the light* in any room.', deep: '#c45a12',
      set: 'room', tint: '#3a1f3a',
      moods: ['sparkle', 'wink'], fx: ['sparkle'],
      hero: { x: 340, y: 990, s: 270 },
      pose: (u) => ({ look: [Math.floor(u * 2) % 2 ? 1 : -1, 0], squash: Math.floor(u * 2) % 2 ? 0.05 : -0.03 }),
      draw(x, t, S) {
        R(x, '#14102a', 795, 900, 10, 260); R(x, '#14102a', 750, 1150, 100, 10)
        drawProp(x, 'camera', 800, 870, 12, { sx: -1 })
        label(x, `SHOT ${Math.min(24, 1 + Math.floor(S.u * 3.6))}`, 800, 760, { size: 32, col: MINT })
      },
      front(x, t, S) { const f = (S.u * 2) % 1; flash(x, t, f < 0.08 ? 0.45 * (1 - f / 0.08) : 0) },
      bubbles: ['one more! my left side!', 'ok, twelve more.'],
      bubblePos: [[360, 640, 0], [380, 750, 0]],
      cues: Array.from({ length: 6 }, (_, i) => ['tick', +(i * 0.5 + 0.02).toFixed(2), 0.06]),
    },
    {
      caption: 'sobs at how *cute* it came out.', deep: '#6a4ab0',
      set: 'room', tint: '#2a2a5a',
      moods: ['sparkle', 'sparkle'], fx: ['hearts'],
      hero: { x: 790, y: 1000, s: 250 },
      pose: (u) => ({ tears: u > SW ? 3 : 2 }),
      draw(x, t, S) { photo(x, t, 330, 820, 380, pop01(t, S.t0 + 0.2, 0.3, 2.2), S.u > SW) },
      bubbles: ['we look so happy!!', '*sob* I’m framing it.'],
      bubblePos: [[760, 640, 0.2], [760, 750, 0.2]],
      cues: [['pop', 0.22, 1174.66, 0.04, -0.3], ['pop', 1.78, 1567.98, 0.04, -0.3]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Best photo yet.*', late: 3,
    draw(x, t, S) { photo(x, t, 540, 690, 250, pop01(t, T.crown + 0.4, 0.3, 2.2) * S.ok, true) },
  },
  last: 'Get in the picture. You’ll want it later.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void paper
