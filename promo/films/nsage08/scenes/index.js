// nsage08: SAG SEASON TAKEOVER, ep 8, "Sag Throws a Party" (30 s vertical, music: house · A). promo/films/next30/b10.md.
// Story 0–25.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag is hosting | the *holiday party.*"  Frame 0: Sag mid-throw, a stack of BRING ANYONE invites flying.
//   2.6–8.6    "The door *keeps* | opening."  Star after star walks in; the little room fills up.
//              VIRGO: "how many people did you invite?"  SAG: "yes."
//   8.6–14.6   "The *icebreaker:*"  Everyone pulls a talk card ("Morning person or night owl?"); the room gets loud and warm.
//  14.6        card cut.
//  14.6–21.0   "Who *really* made | this party?"  Cancer in the kitchen doorway with a tray of cookies, feeding everyone.
//              SAG: "this party is only good because of you."  Cancer tears up; so does Pisces.
//  21.0–25.6   THE STARS: "Big parties run on *quiet* hosts."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, confetti, door, drawBits, cardImg, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const CAN = '#bfe3ff'
function lights(x, t, y = 330) {
  for (let i = 0; i < 13; i++) {
    const X = 40 + i * 83, Y = y + 26 * Math.sin((i / 12) * Math.PI)
    if (i < 12) { x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + 83, y + 26 * Math.sin(((i + 1) / 12) * Math.PI)); x.stroke() }
    const on = Math.sin(t * 4 + i * 1.7) > -0.3
    glow(x, X, Y + 16, 40, on ? 0.35 : 0.1, ['255,120,140', '255,214,120', '140,220,255', '160,240,180'][i % 4].replace(/^/, ''))
    R(x, INK, X - 9, Y + 4, 18, 24); R(x, [RED, GOLD, '#5fb8ff', '#9fe6b0'][i % 4], X - 6, Y + 7, 12, 18)
  }
}
function invite(x, cx, cy, rot, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -80, -50, 160, 100, '#fff1c8', { b: 5 }); R(x, RED, -80, -50, 160, 16)
  ink(x, 'BRING', 0, 0, { size: 24 }); ink(x, 'ANYONE', 0, 28, { size: 24 })
  x.restore()
}
// the guests: [sign, x, y, at]
const GUESTS = [['aries', 220, 1240, 0.4], ['gemini', 380, 1250, 0.9], ['leo', 560, 1235, 1.3], ['virgo', 730, 1250, 1.7], ['libra', 300, 1120, 2.1], ['scorpio', 470, 1110, 2.5], ['aquarius', 640, 1115, 2.9], ['taurus', 140, 1105, 3.3], ['capricorn', 800, 1120, 3.6]]
function crowd(x, t, t0, { all = false, mood = 'happy', s = 130, skip = '' } = {}) {
  GUESTS.forEach(([id, gx, gy, at], i) => {
    if (id === skip) return
    const k = all ? 1 : pop01(t, t0 + at, 0.3, 2.3)
    if (k <= 0.01) return
    const p = all ? 1 : ease.outCubic(prog(t, t0 + at - 0.35, t0 + at))
    const X = lerp(960, gx, p)
    x.save(); x.globalAlpha = 1
    const o = { x: X, y: gy, s: id === 'virgo' && !all ? 150 : s, pop: k, mood: typeof mood === 'function' ? mood(i) : mood, hops: [t0 + at + 0.05, t0 + at + 1.4 + (i % 3) * 0.3] }
    if (id === 'capricorn') o.glyph = false
    window_safe_star(x, t, id, o)
    x.restore()
  })
}
let _S = null
function window_safe_star(x, t, id, o) { _S.star(x, t, id, o) }
function room(x, t) { floor(x, 1300, '#3a2458', '#4a2f6a'); lights(x, t) }
const COOKIE = ['.CCCC.', 'CCDCCC', 'CCCCDC', 'CDCCCC', '.CCCC.']
function cookieTray(x, cx, cy, k = 1) { x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -110, 0, 220, 16, '#c9c3dd', { b: 5 }); for (let i = 0; i < 3; i++) drawBits(x, COOKIE, { C: '#d9a066', D: '#5a3220' }, -66 + i * 66, -26, 8); x.restore() }

const EP = makeTakeover({
  id: 'nsage08', host: 'sag', duration: 30, dy: 100,
  images: ['card-talk-2.png'],
  hook: {
    text: 'Sag is hosting | the *holiday party.*', dur: 2.6,
    draw(x, t, S) {
      _S = S
      room(x, t)
      shadow(x, 400, 1295, 260)
      S.host(x, t, { x: 400, y: 1110, s: 300, mood: 'happy', look: [1, -1], squash: -0.08, hops: [0.6, 1.5] })
      for (let i = 0; i < 6; i++) {
        const a = -1.2 + i * 0.36, p = 0.35 + t * 0.55
        invite(x, 520 + Math.cos(a) * 380 * p, 900 + Math.sin(a) * 380 * p + 200 * p * p, a + t * (i % 2 ? 2 : -2), 0.9)
      }
    },
    cues: [['whoosh', 0, 0.6, 0.05], ['tick', 0.1, 0.04], ['tick', 0.2, 0.04], ['tick', 0.3, 0.04]],
  },
  beats: [
    { dur: 6.0, head: 'The door *keeps* | opening.',
      draw(x, t, S) {
        _S = S
        const { u } = S
        room(x, t)
        door(x, 960, 1300, 0.6 + 0.4 * Math.abs(Math.sin(u * 2.4)), '#a8603a', 200, 400)
        S.host(x, t, { x: 120, y: 880, s: 170, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.5, S.t0 + 1.3, S.t0 + 2.1, S.t0 + 4.4] })
        crowd(x, t, S.t0)
      },
      says: [
        { at: 3.0, text: 'how many people did you invite?', x: 680, y: 900, who: 'virgo', tail: 0.2, size: 34, maxW: 520 },
        { at: 4.4, text: 'yes.', x: 160, y: 690, who: 'host', tail: -0.4, size: 40 },
      ],
      pis: { x: 950, y: 1700, s: 120 },
      cues: GUESTS.map(([, , , at], i) => ['pop', at, [880, 987.77, 1174.66, 1318.51, 1567.98][i % 5], 0.035, 0.4]).concat([['tick', 0.3, 0.05], ['tick', 1.2, 0.05], ['tick', 2.2, 0.05]]),
    },
    { dur: 6.0, head: 'The *icebreaker:*',
      draw(x, t, S) {
        _S = S
        const { u } = S
        room(x, t)
        glow(x, 540, 1000, 600, 0.12 + 0.12 * clamp(prog(u, 1.5, 3)))
        crowd(x, t, S.t0, { all: true, mood: i => (u > 1.6 + (i % 4) * 0.25 ? 'happy' : 'neutral') })
        S.host(x, t, { x: 540, y: 880, s: 190, mood: 'sparkle', look: [0, 0], hops: [S.t0 + 0.3, S.t0 + 0.7] })
        cardImg(x, S.img['card-talk-2.png'], 540, 620, 230 * pop01(t, S.t0 + 0.3, 0.4, 2), 0.05 * Math.sin(t * 3))
        confetti(x, t, S.t0 + 3.6, 540, 700)
      },
      says: [
        { at: 1.6, until: 5.9, text: 'night owl!!', x: 230, y: 980, who: 'scorpio', size: 32 },
        { at: 2.2, until: 5.9, text: 'morning person!', x: 840, y: 960, who: 'aries', size: 32 },
        { at: 2.9, until: 5.9, text: 'BOTH??', x: 380, y: 1080, who: 'gemini', size: 36 },
      ],
      pis: { x: 950, y: 1700, s: 125 },
      cues: [['whoosh', 0.3, 0.4, 0.03], ['bell', 0.7, 1760, 0.03, 1.0, 0], ['glitter', 3.6, 4.2], ['pop', 3.6, 1567.98, 0.04, 0]],
    },
    { dur: 6.4, head: 'Who *really* made | this party?', accent: CAN,
      draw(x, t, S) {
        _S = S
        const { u } = S
        room(x, t)
        // the kitchen doorway, warm light
        box(x, 640, 760, 340, 540, '#ffe0a8', { b: 8 }); glow(x, 810, 1000, 420, 0.25)
        R(x, '#e0b070', 660, 1080, 300, 20)
        const tears = u > 3.2 ? 2 : 0
        S.star(x, t, 'cancer', { x: 810, y: 1150, s: 240, mood: u < 3.0 ? 'happy' : 'sparkle', look: [-1, 0], tears, hops: [S.t0 + 0.4, S.t0 + 3.1] })
        cookieTray(x, 690, 1180, 1)
        // guests reaching for cookies
        S.star(x, t, 'leo', { x: 470, y: 1230, s: 140, mood: 'happy', look: [1, -0.5], hops: [S.t0 + 0.8, S.t0 + 1.6] })
        S.star(x, t, 'gemini', { x: 330, y: 1240, s: 130, mood: 'happy', look: [1, -0.5], hops: [S.t0 + 1.1] })
        S.host(x, t, { x: 260, y: 1010, s: 220, mood: u < 1.2 ? 'wide' : 'sparkle', look: [1, 0], hops: [S.t0 + 1.3, S.t0 + 1.7, S.t0 + 2.1] })
        hearts(x, t, S.t0 + 3.3, 810, 960, { n: 6 })
      },
      says: [{ at: 1.3, text: 'this party is only good because of you.', x: 330, y: 700, who: 'host', tail: -0.3, maxW: 560 }],
      pis: { x: 950, y: 1700, s: 135, tears: 3 },
      cues: [['pluck', 3.1, 1174.66, 0.04, 0.6, 0.4], ['pluck', 3.25, 1567.98, 0.035, 0.6, 0.4]],
    },
  ],
  last: { who: 'stars', text: 'Big parties run on *quiet* hosts.' },
  finale(x, t, S) {
    const { ok } = S
    lights(x, t, 560)
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 410, y: 930, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, S.t0 + 2.6] })
    S.star(x, t, 'cancer', { x: 690, y: 930, s: 240, pop: ok, mood: 'happy', look: [-1, 0], tears: 2, hops: [S.t0 + 0.3, S.t0 + 3.0] })
    cookieTray(x, 690, 780, ok * 0.8)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, BONE]
