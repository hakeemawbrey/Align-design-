// kdye02: DATE YOURSELF, "Party of One" (21 s vertical, star_advice post, jazzy · Bb). Row: promo/films/month2/m16.md.
// Feeling: scared to eat alone in public. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.2   FRAME 0: ♐ Sagittarius frozen mid-step in a restaurant doorway, the host's giant "PARTY OF ONE?" bubble
//             mid-slam. Record scratch + freeze at 0.35 ("me, eating *alone* in public"). Stamp at 1.75.
//   3.2–8.6   STOP 1 the stare (imaginary): pixel eyes pop all around… then the truth: every diner is reading a menu.
//   8.6–13.8  STOP 2 order exactly what you want: "the big pasta. AND the soup." Pisces, two tables over, cries at its soup.
//  13.8–19.2  STOP 3 savour every bite: hearts, a candle, the bill reads "party of 1 · 10/10".
//  19.4–end   last line "Nobody's staring. | They're reading *menus.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, MONO, INTER, R, box, room, table, chair, plate, candle, shadow, glow, drawBits,
  sparkles, hearts, bubble, label, plateText, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.0
const S1 = [3.2, 8.6], S2 = [8.6, 13.8], S3 = [13.8, 19.25]

function restaurant(x, t, { lamps = true } = {}) {
  room(x, { wall: '#5a2f3e', wall2: '#52293a', floor: '#3a2230', floorY: 1240, win: { x: 700, y: 330, w: 300, h: 300, sky: 'night' } })
  R(x, '#6b3a4a', 0, 900, 1080, 340); R(x, INK, 0, 896, 1080, 8)
  if (lamps) for (const lx of [120, 600]) { R(x, INK, lx - 3, 0, 6, 520); box(x, lx - 60, 520, 120, 50, GOLD, { b: 6 }); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, lx, 580, 300, '255,210,140', 0.22); x.restore() }
}
function menu(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -50, -66, 100, 132, '#7a2f3e', { b: 5 }); R(x, GOLD, -32, -46, 64, 8); for (let i = 0; i < 4; i++) R(x, BONE, -32, -24 + i * 18, 64 - (i % 2) * 18, 6)
  x.restore()
}
const EYE = ['.WWWW.', 'WWPPWW', 'WPPPPW', 'WWPPWW', '.WWWW.']
function eyes(x, t, t0, t1, n = 10) {
  for (let i = 0; i < n; i++) {
    const k = pop01(t, t0 + i * 0.12, 0.25, 2.4) * outK(t, [t1, t1 + 0.2])
    if (k <= 0.01) continue
    const ex = 120 + ((i * 263) % 840), ey = 480 + ((i * 181) % 560)
    drawBits(x, EYE, { W: BONE, P: INK }, ex + 4 * Math.sin(t * 9 + i), ey, 11 * k)
  }
}

function opener(x, t, S) {
  restaurant(x, t)
  // the doorway frame
  box(x, 300, 640, 480, 620, '#1c1032', { b: 12 }); R(x, '#2a1a44', 312, 652, 456, 596)
  // host stand
  box(x, 760, 1000, 200, 240, '#6b4428', { b: 6, hi: '#8a5a3a' })
  S.npc(x, t, { sign: 'virgo', x: 860, y: 900, s: 170, mood: 'neutral', look: [-1, 0] })
  shadow(x, 540, 1250, 300)
  S.hero(x, t, { x: 520, y: 1060, s: 300, mood: 'wide', look: [1, -0.3], squash: -0.1 })
  // the giant PARTY OF ONE? bubble, mid-slam
  const k = 1 + 0.4 * (1 - ease.outCubic(clamp((t + 0.2) / 0.5)))
  x.save(); x.translate(560, 620); x.scale(k, k); x.rotate(-0.04)
  box(x, -330, -80, 660, 160, BONE, { b: 8 }); R(x, INK, 230, 80, 26, 30); R(x, BONE, 236, 76, 14, 22)
  x.font = `800 74px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PARTY OF ONE?', 0, 4)
  x.restore()
  S.pis(x, t, { x: 150, y: 1420, s: 140, mood: 'wide', look: [1, -0.6] }, t > 2 ? 2 : 1)
}

function stare(x, t, S) {
  const { u } = S
  restaurant(x, t)
  const reveal = u > 3.0
  // other diners (their own little tables), reading menus once revealed
  for (const [sx, sy, sg] of [[180, 1080, 'leo'], [900, 1080, 'gemini'], [110, 1270, 'aries'], [970, 1270, 'capricorn']]) {
    table(x, sx, sy + 90, 200)
    S.npc(x, t, { sign: sg, x: sx, y: sy, s: 130, mood: reveal ? 'neutral' : 'neutral', look: reveal ? [0, 1] : [sx < 540 ? 1 : -1, 0] })
    if (reveal) menu(x, sx, sy + 20, 1, sx < 540 ? 0.1 : -0.1)
  }
  table(x, 540, 1340, 300, { cloth: '#c84a5a' })
  candle(x, 600, 1340, t, { h: 70 })
  S.hero(x, t, { x: 520, y: 1210, s: 240, mood: reveal ? 'squint' : 'wide', look: reveal ? [0, 0] : [Math.sin(t * 5), -0.2] })
  eyes(x, t, S.a + 0.4, S.a + 2.9)
  if (reveal) {
    const k = pop01(t, S.a + 3.1, 0.3, 2.4)
    if (k > 0.01) { x.save(); x.translate(540, 820); x.scale(k, k); x.rotate(0.04); box(x, -250, -46, 500, 92, INK, { b: 6 }); x.restore(); label(x, 'ACTUAL STARES: 0', 540, 822, { size: 40 * k, col: GOLD }) }
  }
}

function order(x, t, S) {
  const { u } = S
  restaurant(x, t)
  table(x, 380, 1300, 340, { cloth: '#c84a5a' })
  candle(x, 260, 1300, t, { h: 70 })
  const soup = u > 3.4
  if (soup) plate(x, 470, 1290, 180, { food: (c, px, py) => drawBits(c, ['.SSSSS.', 'SOSSOSS', '.SSSSS.'], { S: '#f0a04a', O: '#ffd38a' }, px, py, 9) })
  if (u > 3.8) plate(x, 330, 1290, 150, { food: (c, px, py) => drawBits(c, ['.YYYY.', 'YRYYRY', '.YYYY.'], { Y: '#ffe08a', R: '#e8504a' }, px, py, 9) })
  S.hero(x, t, { x: 400, y: 1170, s: 240, mood: u > 3.4 ? 'sparkle' : 'happy', look: [1, -0.4], hops: [S.a + 3.4] })
  // the waiter with a notepad
  S.npc(x, t, { sign: 'taurus', x: 660, y: 1040, s: 170, mood: u > 2.9 ? 'wide' : 'neutral', look: [-1, 0] })
  box(x, 730, 980, 80, 100, BONE, { b: 5 }); for (let i = 0; i < Math.min(4, Math.floor(u * 1.5)); i++) R(x, INK, 742, 1000 + i * 22, 56, 6)
  sparkles(x, t, 400, 1290, S.a + 3.4, 10, 160, 1)
  // Pisces two tables over, crying at its own soup
  table(x, 930, 1330, 200)
  plate(x, 930, 1320, 120, { food: (c, px, py) => drawBits(c, ['.SSS.', 'SSSSS'], { S: '#9fd8f6' }, px, py, 8) })
  S.pis(x, t, { x: 930, y: 1210, s: 140, mood: 'sparkle', look: [0, 1] }, 3)
  bubble(x, t, 860, 1060, S.a + 1.0, S.b - 0.2, 'this soup is so kind', { size: 26, col: '#c9ecfb', tail: 0.3 })
}

function savour(x, t, S) {
  const { u } = S
  restaurant(x, t)
  glow(x, 540, 1100, 520, '255,200,140', 0.18)
  table(x, 540, 1330, 520, { cloth: '#c84a5a' })
  candle(x, 400, 1330, t, { h: 80 }); candle(x, 690, 1330, t, { h: 60 })
  plate(x, 560, 1320, 220, { food: (c, px, py) => drawBits(c, ['..YYYY..', '.YRYYRY.', 'YYYYYYYY'], { Y: '#ffe08a', R: '#e8504a' }, px, py, 10) })
  S.hero(x, t, { x: 540, y: 1180, s: 280, mood: u < 2.4 ? 'happy' : 'heart', look: [0, 0.3], hops: [S.a + 0.6, S.a + 2.4] })
  hearts(x, t, S.a + 2.4, 540, 1000, { n: 6 })
  // the bill
  const bk = pop01(t, S.a + 3.2, 0.32, 2.2)
  if (bk > 0.01) {
    x.save(); x.translate(820, 880); x.rotate(0.08); x.scale(bk, bk)
    box(x, -150, -110, 300, 220, BONE, { b: 6 })
    x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('PARTY OF 1', 0, -60); x.fillRect(-110, -40, 220, 3)
    x.font = `800 64px ${INTER}`; x.fillStyle = RED; x.fillText('10/10', 0, 40)
    x.restore()
  }
  S.pis(x, t, { x: 170, y: 1110, s: 140, mood: 'happy', look: [1, -0.6], hops: [S.a + 3.2] }, 3)
}

const EP = makeDate({
  id: 'kdye02', sign: 'sagittarius', name: 'Sagittarius', D, ending: 'cut',
  hook: 'Sagittarius. Party of one? | *Yes,* actually.', hookSize: 100, hookAccent: '#ffcf6b',
  stampAt: 1.75,
  fx: [{ kind: 'scratch', o: { at: 0.35, len: 1.0, caption: 'me, eating *alone* in public', top: 1560 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the *stare* (imaginary)', draw: stare,
      cues: [...Array.from({ length: 10 }, (_, i) => ['pop', r3(0.4 + i * 0.12), 1174.66 + i * 40, 0.02, (i % 2) - 0.5]), ['whoosh', 2.95, 0.3, 0.04], ['pop', 3.1, 440, 0.05, 0], ['pluck', 3.2, 880, 0.03, 0.5, 0]] },
    { a: S2[0], b: S2[1], sticker: 'order *exactly* what you want', draw: order,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['tick', 0.6, 0.03], ['tick', 1.2, 0.03], ['pop', 3.4, 1318.51, 0.045, -0.2], ['glitter', 3.4, 3.8], ['pop', 3.8, 1174.66, 0.04, -0.3], ['pluck', 1.0, 659.25, 0.03, 0.5, 0.5]] },
    { a: S3[0], b: S3[1], sticker: 'savour *every bite*', draw: savour,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 2.4, 1174.66, 0.04, 0.5, 0], ['pluck', 2.52, 1567.98, 0.035, 0.5, 0], ['pop', 3.2, 987.77, 0.045, 0.3], ['bell', 3.3, 1760, 0.03, 1.0, 0.3]] },
  ],
  lines: [
    { t: 3.8, who: 'hero', text: 'everyone is *looking* at me.' },
    { t: 6.3, who: 'stars', text: "they're looking at the *menu,* babe." },
    { t: 9.2, who: 'stars', text: "order like nobody's *sharing.*" },
    { t: 11.4, who: 'hero', text: 'the big pasta. *and* the soup.' },
    { t: 14.4, who: 'stars', text: "you're not waiting for *anyone.*" },
    { t: 16.6, who: 'stars', text: "you're *out.* with you." },
  ],
  boxes: [[3.6, 8.45, [0, 1]], [9.0, 13.65, [2, 3]], [14.2, 19.1, [4, 5]]],
  last: { t: 19.4, text: "Nobody's staring. | They're reading *menus.*", top: 300, size: 92 },
  cues: [['tick', 0.0, 0.05]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, chair, plateText, lerp, prog]
