// og-ksge09: the social rework of ksge09 ("Sagittarius Says Let's Hang"), star_advice. Same set, cast and story; static HOOK
// (box) from frame 0 instead of the slam title, no series bug, a more extreme Sagittarius. Kit: ./greenkit.js (og social copy of ../../ksge01/scenes/greenkit.js).
// Original notes:
// ksge09 · SPOT THE GREEN FLAG: "Sagittarius Says 'Let's Hang'" (trial reel, ≈ 10 s, house · E). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Sagittarius mid-leap off a skateboard, a calendar page whipping past.
//   TAKE A   "for sure! maybe! I'll hit you up!" … and skates off. The calendar page: "???"
//   TAKE B   "Saturday, 11, the market? I'll send the spot."  The page lands: SAT · 11 AM, MARKET.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "'Maybe' isn't a plan. *Saturday is.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN } from './greenkit.js'
import { street, calendarPage } from '../../ksge02/scenes/sets.js'

function board(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -70, -10, 140, 20); R(x, '#f0603a', -66, -6, 132, 12); for (const d of [-40, 40]) { R(x, INK, d - 12, 8, 24, 20); R(x, BONE, d - 7, 12, 14, 12) } x.restore() }
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  street(x, tk, { day: true })
  // the calendar page whips past at frame 0, then settles on the wall
  const c = ease.outCubic(clamp(prog(tk, -0.3, 0.5)))
  const set = mode === 'B' && tk > f[0] + 0.5
  calendarPage(x, lerp(520, 400, c), lerp(120, 200, c), { rot: lerp(1.2, 0.06, c), text: set ? 'SAT' : '???', sub: set ? '11 AM' : '' })
  if (set) sparkles(x, tk, 400, 200, f[0] + 0.5, 8, 90, 1, [GREEN, GOLD, BONE])
  you(x, tk, { x: 110, y: 480, s: 170, mood: mode === 'B' && tk > f[0] + 0.6 ? 'happy' : mode === 'A' && tk > 1.5 ? 'wide' : 'neutral', look: [1, -0.2], hops: mode === 'B' ? [f[0] + 0.7] : [] })
  // Sagittarius: mid-leap at frame 0, lands; in A skates off right
  const leap = Math.sin(Math.PI * clamp(prog(tk, -0.35, 0.45)))
  const off = mode === 'A' ? ease.inCubic(prog(tk, 1.4, 1.9)) : 0
  const sx = lerp(330, 640, off), sy = 470 - 120 * leap
  board(x, sx + 10 * leap, 560 - 60 * leap, -0.3 * leap)
  hero(x, tk, { x: sx, y: sy, s: 190, mood: tk < 0.5 ? 'sparkle' : 'happy', look: mode === 'A' && tk > 1.3 ? [1, 0] : [-1, 0] })
  if (mode === 'A') pbubble(x, tk, 280, 330, 0.75, 1.6, 'for SURE!! someday!\nmaybe in another life!', { size: 30, tail: 0.5 })
  if (mode === 'A') pbubble(x, tk, 160, 330, 1.75, 99, '…when?', { size: 30, tail: -0.5 })
  if (mode === 'B') { pbubble(x, tk, 260, 330, f[0] + 0.2, 99, 'Saturday, 11, the market.\nI already packed snacks.', { size: 28, tail: 0.5, col: '#c9f2d4' }); hearts(x, tk, f[0] + 0.8, 110, 470, { n: 4, cell: 4 }) }
  void box; void pop01
}
const EP = makeGreen({
  id: 'og-ksge09', sign: 'sagittarius', name: 'Sagittarius', win: 'B', ending: 'cut', you: '#8fd8f6',
  hook: '',   // og social: the static HOOK below replaces the slam title
  premise: 'They said “we should *hang out.*”',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: '“Maybe” isn’t a plan. *Saturday is.*',
  cues: [['whoosh', 0.0, 0.4, 0.035], ['tick', 0.45, 0.06], ['pop', 0.75, 1174.66, 0.035, -0.4], ['whoosh', 1.4, 0.5, 0.03], ['pop', 1.75, 440, 0.035, -0.4], ['pop', 2.25, 1318.51, 0.04, 0.4], ['glitter', 2.55, 2.9]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the kit's animated slam title is removed in ./greenkit.js)
export const HOOK = "A Sagittarius said | *\"let's hang out.\"*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.4
