// kdye10: DATE YOURSELF, "Tourist at Home" (21.7 s vertical, star_advice post, pop · D, LOOP). Row: promo/films/month2/m16.md.
// Feeling: waiting for the next big trip to feel alive. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♐ Sagittarius mid-leap, a suitcase mid-burst open, clothes flying. Whip at 0.12.
//             Hook "Sagittarius, the adventure is | three stops *away.*" Stamp at 1.3.
//   3.0–8.4   STOP 1 the three-stop trip: the bus window, ding · ding · ding, a tourist hat and a paper map.
//   8.4–13.6  STOP 2 the mural you walked past: a huge colourful wall; Pisces cries at it.
//  13.6–19.6  STOP 3 street food, first bite: a steaming stall, hearts.
//  19.8–end   last line "Adventure doesn't need | a *passport stamp.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, street, shadow, glow, drawBits, sun, label,
  sparkles, hearts, bubble, pop01, outK, r3, SKYB, MINT, CORAL,
} from '../../kdye01/props.js'

const D = 21.7
const S1 = [3.0, 8.4], S2 = [8.4, 13.6], S3 = [13.6, 19.7]
const SAG = '#ff9a5a'
function hat(x, F) { // a tourist bucket hat on the sprite (sprite cells)
  x.save(); x.translate(F.ox, F.oy - F.S * 0.62); x.scale(F.cell, F.cell)
  x.fillStyle = INK; x.fillRect(-9, -1, 18, 4); x.fillRect(-6, -6, 12, 6)
  x.fillStyle = '#ffe08a'; x.fillRect(-8.5, -0.5, 17, 3); x.fillRect(-5.5, -5.5, 11, 5.5); x.fillStyle = RED; x.fillRect(-5.5, -1.5, 11, 1)
  x.restore()
}

function opener(x, t, S) {
  room(x, { wall: '#3a3a6a', wall2: '#34345f', floor: '#2a2440', floorY: 1320, win: { x: 720, y: 520, w: 260, h: 240, sky: 'day' } })
  // the suitcase, mid-burst
  box(x, 300, 1130, 480, 190, '#c84a3a', { b: 8, hi: '#e86a5a' })
  x.save(); x.translate(300, 1130); x.rotate(-1.0); box(x, 0, -180, 480, 180, '#c84a3a', { b: 8 }); x.restore()
  const items = [['#7fd0ff', 60, 40], [GOLD, 70, 50], [PINK, 50, 70], [MINT, 80, 40], [BONE, 60, 60], [CORAL, 50, 50]]
  items.forEach(([c, w, h], i) => { const tt = t + 0.35, a = -2.2 + i * 0.32, v = 700 + (i * 71) % 260; x.save(); x.translate(540 + Math.cos(a) * v * tt * 0.7, 1100 + Math.sin(a) * v * tt * 0.7 + 480 * tt * tt); x.rotate(tt * (3 + i)); box(x, -w / 2, -h / 2, w, h, c, { b: 4 }); x.restore() })
  const F = S.hero(x, t, { x: 540, y: 900, s: 280, mood: 'wide', look: [0, -1], squash: -0.12 })
  hat(x, F)
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function bus(x, t, S) {
  const { u } = S
  R(x, '#3a4a7a', 0, 0, 1080, 1920)
  // the big window with the city scrolling by
  box(x, 60, 420, 960, 560, '#8fd3ff', { b: 12 })
  x.save(); x.beginPath(); x.rect(60, 420, 960, 560); x.clip()
  for (let i = 0; i < 10; i++) { const bx = ((i * 230 - u * 380) % 2300 + 2300) % 2300 - 200; R(x, ['#5a4a9a', '#6a5aaa', '#4a3a8a'][i % 3], bx, 600 + (i * 47) % 160, 200, 400) }
  x.restore()
  R(x, INK, 530, 420, 20, 560)
  for (let i = 0; i < 3; i++) R(x, '#c9c2d8', 100 + i * 330, 1000, 240, 240)
  // stop counter + bell dings
  const stops = [0.8, 2.3, 3.8].filter(f => u > f).length
  box(x, 340, 300, 400, 90, INK, { b: 6 }); label(x, `STOP ${stops} OF 3`, 540, 346, { size: 40, col: GOLD })
  const F = S.hero(x, t, { x: 420, y: 1160, s: 250, mood: u > 3.9 ? 'sparkle' : 'happy', look: [1, -0.6], hops: [S.a + 0.8, S.a + 2.3, S.a + 3.8] })
  hat(x, F)
  x.save(); x.translate(700, 1180); x.rotate(0.1); box(x, -110, -80, 220, 160, '#f4e8cc', { b: 5 }); for (let i = 0; i < 3; i++) R(x, '#d8c8a0', -100, -60 + i * 50, 200, 6); drawBits(x, ['.R.', 'RRR', '.R.'], { R: RED }, 40, -10, 8); x.restore()
}

function mural(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [], tint: '#3a3260' })
  // the mural wall
  box(x, 60, 380, 960, 700, '#f4e8cc', { b: 8 })
  const cols = [PINK, GOLD, SKYB, MINT, CORAL, '#c9a6ff']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i % cols.length]; x.beginPath(); x.arc(160 + (i * 173) % 760, 480 + ((i * 97) % 520), 70 + (i % 3) * 30, 0, Math.PI * 2); x.fill() }
  drawBits(x, ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y'], { Y: GOLD }, 540, 790, 34)
  const reveal = pop01(t, S.a + 0.4, 0.4, 2)
  const F = S.hero(x, t, { x: 300, y: 1230, s: 240 * Math.max(0.01, reveal), mood: u > 0.8 ? 'wide' : 'neutral', look: [0.6, -1] })
  hat(x, F)
  S.pis(x, t, { x: 780, y: 1230, s: 170, mood: 'sparkle', look: [-0.4, -1] }, 3)
  bubble(x, t, 820, 1040, S.a + 1.4, S.b - 0.2, "it's SO big", { size: 28, col: '#c9ecfb' })
}

function stall(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'night', lamps: [100, 980], tint: '#2b2150' })
  box(x, 220, 640, 640, 100, '#e8504a', { b: 7 }); for (let i = 0; i < 8; i++) R(x, BONE, 220 + i * 80, 640, 40, 100)
  box(x, 240, 1000, 600, 260, '#6b4428', { b: 7, hi: '#8a5a3a' })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 920, 420, '255,200,120', 0.28); x.restore()
  for (let i = 0; i < 4; i++) { drawBits(x, ['.DDD.', 'DDDDD', 'DDDDD'], { D: '#f4e8cc' }, 330 + i * 140, 960, 11); for (let k = 0; k < 2; k++) { const p = ((t * 0.6 + i / 4 + k / 2) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#fff6ea', 320 + i * 140 + 6 * Math.sin(t * 3 + i), 920 - p * 140, 10, 22); x.restore() } }
  S.npc(x, t, { sign: 'cancer', x: 760, y: 860, s: 130, mood: 'happy', look: [-1, 0] })
  const F = S.hero(x, t, { x: 380, y: 1230, s: 230, mood: u > 1.2 ? 'heart' : 'sparkle', look: [0.4, -1], hops: [S.a + 1.2] })
  hat(x, F)
  hearts(x, t, S.a + 1.2, 380, 1080, { n: 5 })
  S.pis(x, t, { x: 900, y: 1240, s: 140, mood: 'happy', look: [-1, -0.6] }, 2)
}

const EP = makeDate({
  id: 'kdye10', sign: 'sagittarius', name: 'Sagittarius', D, ending: 'loop',
  hook: 'Sagittarius, the | adventure is | three stops *away.*', hookSize: 104, hookAccent: SAG,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the *three-stop* trip', draw: bus, stickerTop: 180,
      cues: [0.8, 2.3, 3.8].map(f => ['bell', f, 1760, 0.04, 0.8, 0]) },
    { a: S2[0], b: S2[1], sticker: 'the mural you *walked past*', draw: mural,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['glitter', 0.4, 1.0], ['pluck', 0.8, 659.25, 0.04, 0.6, -0.3], ['pop', 1.4, 880, 0.03, 0.3]] },
    { a: S3[0], b: S3[1], sticker: 'street food, *first bite*', draw: stall,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 1.2, 1174.66, 0.04, 0.5, -0.2], ['pluck', 1.32, 1567.98, 0.035, 0.5, -0.2]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'where are we *going?*' },
    { t: 5.9, who: 'stars', text: "somewhere you've never *looked.*" },
    { t: 9.0, who: 'hero', text: 'this was *here* the whole time?' },
    { t: 11.2, who: 'stars', text: 'your city has *secrets.*' },
    { t: 14.2, who: 'stars', text: "taste it like you're *away.*" },
    { t: 16.4, who: 'hero', text: "I'm a *tourist* at home!" },
  ],
  boxes: [[3.4, 8.25, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.5, [4, 5]]],
  last: { t: 19.8, text: "Adventure doesn't need | a *passport stamp.*", top: 300, size: 92, accent: SAG },
  cues: [['whoosh', 0.12, 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO, shadow, sun, sparkles, outK, r3, clamp, lerp, ease, prog]
