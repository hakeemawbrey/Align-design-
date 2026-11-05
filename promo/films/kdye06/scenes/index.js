// kdye06: DATE YOURSELF, "Stop Saving the Nice Plates" (21.1 s vertical, star_advice post, dreamy · Ab, LOOP).
// Row: promo/films/month2/m16.md. Feeling: nice things are "for when I have someone". Engine: ../../kdye01/dykit.js.
//   0.0–3.0   FRAME 0: ♉ Taurus mid-toss, a picnic blanket mid-flap, plates and grapes mid-air. Whip at 0.15.
//             Hook "Taurus, stop saving | the *nice plates.*" Stamp at 1.3.
//   3.0–8.2   STOP 1 the good plates: the cupboard note "FOR SPECIAL OCCASIONS" is crossed out → "FOR TUESDAYS".
//   8.2–13.6  STOP 2 a picnic of one: blanket, the good plates, a candle in a jar; Pisces cries into a napkin.
//  13.6–19.1  STOP 3 the sunset, front row: Taurus lies back as the sun goes down.
//  19.2–end   last line "You're the occasion. | Use the *good plates.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, park, plate, candle, shadow, glow, drawBits, sun,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.1
const S1 = [3.0, 8.2], S2 = [8.2, 13.6], S3 = [13.6, 19.1]
const TAU = '#7fe0a0'
const GRAPES = ['.G.', 'GGG', 'GGG', '.G.']
function blanket(x, cx, cy, w, h, flap = 0, t = 0) {
  x.save(); x.translate(cx, cy)
  const n = 8, cw = w / n
  for (let i = 0; i < n; i++) {
    const dy = flap * 60 * Math.sin(i * 0.8 + t * 10)
    R(x, INK, -w / 2 + i * cw - 3, -h / 2 + dy - 3, cw + 6, h + 6)
    for (let j = 0; j < 4; j++) R(x, (i + j) % 2 ? '#e8504a' : BONE, -w / 2 + i * cw, -h / 2 + dy + j * h / 4, cw, h / 4)
  }
  x.restore()
}
const fancy = (c, px, py) => drawBits(c, ['..GG..', '.GPPG.', 'GPPPPG'], { G: GOLD, P: PINK }, px, py, 8)

function opener(x, t, S) {
  park(x, t, { horizon: 1050, top: '#3a2a6a', bottom: '#ff9f7a', sun: 0.6, trees: [90, 990] })
  blanket(x, 540, 1300, 760, 220, 1, t)
  // plates + grapes mid-air
  for (let i = 0; i < 4; i++) {
    const tt = t + 0.4, px = 300 + i * 160, py = 820 - 220 * Math.sin(Math.PI * Math.min(1, tt * 0.4)) + i * 30
    x.save(); x.translate(px, py); x.rotate(tt * (1 + i * 0.4)); plate(x, 0, 0, 140, { rim: GOLD, food: i % 2 ? fancy : null }); x.restore()
  }
  for (let i = 0; i < 6; i++) drawBits(x, GRAPES, { G: '#9a6fd0' }, 220 + i * 130, 640 + ((i * 53) % 120) + 20 * Math.sin(t * 3 + i), 10, { rot: t * 2 + i })
  S.hero(x, t, { x: 540, y: 1120, s: 280, mood: 'wide', look: [0, -1], squash: -0.1 })
  S.pis(x, t, { x: 940, y: 1460, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function cupboard(x, t, S) {
  const { u } = S
  room(x, { wall: '#4a3a6a', wall2: '#43355f', floor: '#2a2040', floorY: 1340 })
  // the cupboard, doors open
  const op = ease.inOutCubic(prog(u, 0.3, 0.9))
  box(x, 240, 360, 600, 560, '#8a5a3a', { b: 8 })
  R(x, '#3a2a20', 260, 380, 560, 520)
  for (let r = 0; r < 3; r++) { R(x, INK, 260, 540 + r * 170, 560, 12); for (let i = 0; i < 4; i++) plate(x, 340 + i * 130, 520 + r * 170, 110, { rim: GOLD }) }
  box(x, 240 - op * 160, 360, 300 * (1 - op * 0.5), 560, '#a87650', { b: 6 }); box(x, 540 + op * 140, 360, 300 * (1 - op * 0.5), 560, '#a87650', { b: 6 })
  // the sticky note
  const nk = 1
  x.save(); x.translate(540, 1000); x.rotate(-0.04); x.scale(nk, nk)
  box(x, -230, -60, 460, 120, '#ffe08a', { b: 5 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const cross = ease.outCubic(prog(u, 2.6, 2.9)), swap = u > 3.2
  x.fillText(swap ? 'FOR TUESDAYS' : 'FOR SPECIAL OCCASIONS', 0, 2)
  if (cross > 0 && !swap) R(x, RED, -210, -6, 420 * cross, 12)
  x.restore()
  sparkles(x, t, 540, 1000, S.a + 3.2, 10, 220, 1)
  S.hero(x, t, { x: 540, y: 1230, s: 220, mood: swap ? 'sparkle' : u > 0.9 ? 'wide' : 'neutral', look: [0, -1], hops: [S.a + 3.25] })
}

function picnic(x, t, S) {
  const { u } = S
  park(x, t, { horizon: 1000, top: '#3a2a6a', bottom: '#ff9f7a', sun: 0.8, trees: [90, 990] })
  blanket(x, 500, 1260, 760, 240, 0, t)
  plate(x, 420, 1260, 170, { rim: GOLD, food: fancy })
  plate(x, 640, 1280, 150, { rim: GOLD, food: (c, px, py) => drawBits(c, GRAPES, { G: '#9a6fd0' }, px, py, 9) })
  // candle in a jar
  box(x, 270, 1170, 70, 90, 'rgba(201,236,251,0.55)', { b: 4 }); candle(x, 305, 1250, t, { h: 50 })
  S.hero(x, t, { x: 500, y: 1080, s: 260, mood: u > 2.2 ? 'heart' : 'happy', look: [0, 0.8], hops: [S.a + 2.2] })
  if (u > 2.2) hearts(x, t, S.a + 2.2, 500, 900, { n: 4 })
  // Pisces on the next blanket, crying into a napkin
  blanket(x, 930, 1080, 260, 110, 0, t)
  S.pis(x, t, { x: 930, y: 980, s: 130, mood: 'sparkle', look: [-1, 0.2] }, 3)
  box(x, 960, 990, 50, 40, BONE, { b: 3 })
  bubble(x, t, 880, 830, S.a + 1.2, S.b - 0.2, 'you deserve it', { size: 26, col: '#c9ecfb', tail: 0.3 })
}

function sunset(x, t, S) {
  const { u } = S
  const k = ease.inOutCubic(prog(u, 0, 5.2))
  const g = x.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, '#2a1f5a'); g.addColorStop(0.6, '#ff7a6a'); g.addColorStop(1, '#ffc88a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1000)
  sun(x, 540, lerp(720, 960, k), 130, 1)
  R(x, '#2f6e48', 0, 960, 1080, 60); R(x, '#3f8f5a', 0, 1000, 1080, 920)
  blanket(x, 540, 1240, 820, 240, 0, t)
  plate(x, 780, 1250, 140, { rim: GOLD, food: fancy })
  S.hero(x, t, { x: 470, y: 1150, s: 270, mood: 'sparkle', look: [0.2, -1], squash: 0.12 })
  S.pis(x, t, { x: 180, y: 1010, s: 120, mood: 'happy', look: [1, -0.6] }, 3)
}

const EP = makeDate({
  id: 'kdye06', sign: 'taurus', name: 'Taurus', D, ending: 'loop',
  hook: 'Taurus, stop saving | the *nice plates.*', hookSize: 108, hookAccent: TAU,
  fx: [{ kind: 'whip', o: { at: 0.15, len: 0.45, from: 1.45 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the *good* plates', draw: cupboard,
      cues: [['tick', 0.3, 0.05], ['whoosh', 0.35, 0.4, 0.03], ['tick', 2.6, 0.07], ['pop', 3.2, 1318.51, 0.05, 0], ['glitter', 3.2, 3.6]] },
    { a: S2[0], b: S2[1], sticker: 'a picnic of *one*', draw: picnic,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 2.2, 1174.66, 0.04, 0.5, 0], ['pluck', 2.32, 1567.98, 0.035, 0.5, 0], ['pop', 1.2, 880, 0.03, 0.4]] },
    { a: S3[0], b: S3[1], sticker: 'the sunset, *front row*', draw: sunset,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['bell', 1.0, 1760, 0.025, 1.4, 0], ['bell', 3.0, 2349.32, 0.02, 1.4, 0]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: "these are for… *special* days." },
    { t: 5.9, who: 'stars', text: "you're here today. *special.*" },
    { t: 9.0, who: 'hero', text: "who's all this *for?*" },
    { t: 11.2, who: 'stars', text: '*you.* obviously.' },
    { t: 14.2, who: 'stars', text: 'front-row seat. no *ticket.*' },
    { t: 16.4, who: 'hero', text: "I'm doing this *every* week." },
  ],
  boxes: [[3.4, 8.05, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.0, [4, 5]]],
  last: { t: 19.2, text: "You're the occasion. | Use the *good plates.*", top: 300, size: 92, accent: TAU },
  cues: [['whoosh', 0.15, 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO, glow, label, shadow, pop01, outK, clamp, r3]
