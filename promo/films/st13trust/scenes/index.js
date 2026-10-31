// st13trust (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E28) · story 0–40.6, then the end card.
//   ❓ "How is *trust* actually built?"  ♊ GEMINI (student) is planning one grand gesture; ♄ SATURN teaches at the board:
//   ♥ trust grows from small moments: showing up when you said, keeping little promises, being the same person in
//   private. The board stacks pixel bricks, one per promise kept (the grand gesture is one gold brick; the gag).
//   Last line (SATURN): "Trust is *tiny* promises."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { makeEpisode, R, INK, BONE, pop01, r3 } from './classkit.js'

const GEM = signStar('gemini')
const RING = '#f7dca0', BRICK = '#c8643c', BRICK_HI = '#e58a5c', GOLDB = '#f2c75c', GOLD_HI = '#ffe6a0'

// the wall: two bricks a row, from the bottom of the board up (x 420…900), each popping in with a thunk
const BW = 232, BH = 54, WX = 424
function brick(x, t, B, at, col, row, label, gold) {
  const p = pop01(t, at, 0.28, 2.4)
  if (p <= 0) return
  const bx = B.x0 + WX + col * (BW + 8) + (row % 2 ? 0 : 0), by = B.y1 - 6 - (row + 1) * (BH + 6)
  const drop = (1 - clamp(prog(t, at, at + 0.18))) * -60
  x.save(); x.translate(bx + BW / 2, by + BH / 2 + drop); x.scale(p, p)
  R(x, INK, -BW / 2 - 4, -BH / 2 - 4, BW + 8, BH + 8)
  R(x, gold ? GOLDB : BRICK, -BW / 2, -BH / 2, BW, BH)
  R(x, gold ? GOLD_HI : BRICK_HI, -BW / 2, -BH / 2, BW, 6)
  R(x, 'rgba(0,0,0,0.22)', -BW / 2, BH / 2 - 6, BW, 6)
  if (label) {
    x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = gold ? INK : BONE; x.fillText(label, 0, 2)
  }
  x.restore()
}
const B_ = (at, col, row, label, gold) => ({ kind: 'draw', at, fn: (x, t, B, a) => brick(x, t, B, a, col, row, label, gold) })
// line 7: the wall fills in fast, a brick at a time
const FILL = ['ON TIME', 'TEXTED BACK', 'LISTENED', 'SAID SORRY', 'REMEMBERED', 'SHOWED UP', 'SAID THANKS', 'KEPT A PLAN', 'KEPT A PROMISE', 'ASKED FIRST']

const EP = makeEpisode({
  id: 'st13trust', numeral: 'S13 E28', duration: 45, key: 'C',
  q: 'How is *trust* actually built?', qAccent: RING,
  teacher: { tag: SATURN.tag, color: RING, accent: SATURN.tagColor, pitch: 294,
    draw: (ctx, X, Y, s, t, o) => drawSaturn(ctx, X, Y, s * 0.95, t, { ...o, mood: o.mood === 'sparkle' || o.mood === 'heart' ? 'happy' : o.mood }) },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 659 },
  board: { title: 'HOW TRUST IS BUILT' },
  lines: [
    ['s', 'is it one big *grand gesture?*'],
    ['t', "mostly, it's built from *small* moments."],
    ['t', 'showing up when you *said* you would.'],
    ['t', 'keeping the *little* promises.'],
    ['t', 'being the same person in *private*.'],
    ['s', 'but what about my grand *gesture?*'],
    ['t', "lovely! but it's *one* brick."],
    ['t', 'trust is the whole wall, *brick by brick*.'],
    ['s', 'so texting back when I said... *brick!*', { bulb: true }],
  ],
  chalk: [
    { kind: 'text', text: 'small|moments', x: 0, y: 70, at: [1, 0.4], size: 44 },
    { kind: 'tag', tag: 'tip', x: 0, y: 190, at: [1, 0.3], align: 'left' },
    B_([2, 0.5], 0, 0, 'SHOWED UP'),
    B_([3, 0.4], 1, 0, 'KEPT A PROMISE'),
    B_([4, 0.5], 0, 1, 'SAME IN PRIVATE'),
    { kind: 'text', text: 'same person,|in *private* too', x: 0, y: 270, at: [4, 0.6], size: 30 },
    { kind: 'tag', tag: 'tip', x: 0, y: 360, at: [4, 0.3], align: 'left' },
    B_([6, 0.4], 1, 1, 'GRAND GESTURE', true),
    ...FILL.map((label, i) => B_([7, 0.35 + i * 0.16], i % 2, 2 + Math.floor(i / 2), label)),
    { kind: 'text', text: '= *trust*', x: 0, y: 440, at: [7, 1.2], size: 40 },
  ],
  recap: ['Built from *small* moments', 'Keep the *little* promises', 'Same person in *private*'],
  last: 'Trust is *tiny* promises.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'sparkle', look: [1, -1] }]
    if (ph >= 1 && ph <= 4) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 5) return [{ mood: 'squint', look: [-1, 0] }, { mood: 'wink', look: [1, 0] }]
    if (ph === 6 || ph === 7) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 8) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
  cues: T => FILL.map((_, i) => ['pop', r3(T.lines[7].t + 0.35 + i * 0.16 + 0.12), 196 + i * 12, 0.03, i % 2 ? 0.25 : -0.25])
    .concat([2, 3, 4, 6].map(n => ['pop', r3(T.lines[n].t + 0.5 + 0.12), n === 6 ? 784 : 220, 0.045, 0.2])),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
