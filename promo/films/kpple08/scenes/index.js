// kpple08 · Planet Talk: Pluto · "Pluto to Scorpio: The Grudge Vault" (76.6 s vertical, long, hard cut) · screwed · Fm
//   0      Pluto mid-rise over the horizon in red eclipse light, Scorpio mid-turn, tiny, in front of a vault door ·
//          "SCORPIO. | We need to *talk.*" · 0.7 lands: boom, shake, whip · 3.0 "Stay for what's *in the vault.*"
//   6.0    CH 1 THE VAULT · flash to the vault room · filed hurts pop around the door · 8.6 ♏ "I *archive* them."
//          11.6 ♇ "I'm your planet. in astrology, I rule you." · 14.6 "so this is *my* fault too."
//   17.0   CH 2 THE BIG ONE · the ex's page, refresh, refresh · 18.0 ♏ "I'm not checking. I'm *monitoring.*"
//          21.0 CHECKED TODAY: 14 · 23.0 ♇ "holding it doesn't punish *them.*" · 25.8 "it just keeps *you* up."
//          28.0 ♏ "…they never even said *bye.*"
//   31.0   CH 3 THE HEART · push in on Pluto · "I'm smaller than your *Moon.*" · "a giant *heart* on me" · "even I go
//          *soft.*" · 39.5 ♏ "…you're *crying.*" · 41.6 ♇ "*you're* crying."
//   45.0   CH 4 THE KEY · ♇ "you don't have to forgive it all *today.*" · ♏ "just… *open* it?" · 49 the door swings
//          open · 50.5 the grudges float out as little stars · 51 "Letting go. *One* by one." · 56.4 "*lighter* in here."
//   60.0   CH 5 THE NEW ROOM · a window, morning · ♏ texts a friend "dinner this week?" → "YES. finally!!"
//          64.8 Pisces bursts in, happy-sobbing: "you texted *first?!*" · 67.9 ♇ "transformation. still *counts.*"
//          70.5 ♏ "don't tell *anyone.*" · 72.8 ♓ "I'm telling *everyone*" · 75.2 "Vault's open. | *Feels* lighter."
import { plutoFilm } from '../../kpple01/plutokit.js'
import { drawPixelStar } from '../../sky.js'

const D = 76.6
const PL = 'pluto', SC = 'scorpio', PI = 'pisces'
const CH = [6.0, 17.0, 31.0, 45.0, 60.0]
const OPEN = 49.0, FLOAT = 50.5, NEWR = 60.0
const DOOR = [540, 860, 300]
const FILED = [['the "k." text', 230, 760, -0.08], ['forgot my birthday', 850, 690, 0.06], ['the ghosting', 300, 1150, 0.04], ['late. twice.', 820, 1120, -0.05]]
const PLV = { x: 230, y: 470, size: 230 }

function vaultDoor(x, K, t) {
  const [cx, cy, r] = DOOR, op = K.ease.inOutCubic(K.prog(t, OPEN, OPEN + 1.4))
  // the opening behind the door: dark, then warm light pouring out
  x.fillStyle = K.INK; x.beginPath(); x.arc(cx, cy, r + 18, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0a0614'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  if (op > 0) K.glow(x, cx, cy, r * 1.3, '#ffd89a', 0.65 * op)
  // the door: swings on its left hinge (scaleX)
  x.save(); x.translate(cx - r, cy); x.scale(1 - 0.85 * op, 1); x.translate(-(cx - r), -cy)
  x.fillStyle = '#5a5470'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6e6888'; x.beginPath(); x.arc(cx, cy, r * 0.84, 0, Math.PI * 2); x.fill()
  x.strokeStyle = K.INK; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, r * 0.84, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; K.box(x, cx + Math.cos(a) * r * 0.92 - 10, cy + Math.sin(a) * r * 0.92 - 10, 20, 20, '#a8a0c0', { o: 3 }) }
  // the dial (spins while unlocking)
  const spin = t < 46.5 ? 0 : (t - 46.5) * 4 * (1 - K.prog(t, OPEN - 0.2, OPEN))
  x.save(); x.translate(cx, cy); x.rotate(spin)
  x.fillStyle = '#c9c2d8'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 3; i++) { x.rotate(Math.PI * 2 / 3); K.box(x, -10, -160, 20, 100, '#c9c2d8', { o: 4 }) }
  x.restore()
  K.txt(x, 'GRUDGES', cx, cy + r * 0.62, { size: 30, color: '#efe6d6', spacing: 4 })
  x.restore()
}

const F = plutoFilm({
  id: 'kpple08', sign: SC, dur: D, ending: 'cut',
  hook: { text: 'SCORPIO. | We need to *talk.*', out: [2.6, 2.85] },
  enter: { kind: 'rise', at: -0.9, len: 1.6, x: 540, y: 720, size: 320, horizon: 1500 },
  flashes: [CH[0], NEWR],
  chapters: [
    { at: CH[0], out: [13.6, 13.9], n: 1, title: 'THE VAULT' },
    { at: CH[1], out: [23.6, 23.9], n: 2, title: 'THE BIG ONE' },
    { at: CH[2], out: [37.6, 37.9], n: 3, title: 'THE HEART' },
    { at: CH[3], out: [51.6, 51.9], n: 4, title: 'THE KEY' },
    { at: CH[4], out: [66.6, 66.9], n: 5, title: 'THE NEW ROOM' },
  ],
  shots: [
    { at: 13.8, z: 1.08, cx: 600, cy: 1000, d: 2 }, { at: 16.9, z: 1, cx: 540, cy: 960, d: 0.4 },
    { at: 31.0, z: 1.45, cx: 300, cy: 600, d: 1.6 }, { at: 39.2, z: 1, cx: 540, cy: 960, d: 0.6 },
    { at: 50.3, z: 1.15, cx: 540, cy: 820, d: 2.5 }, { at: 59.8, z: 1, cx: 540, cy: 960, d: 0.3 },
    { at: 68.0, z: 1.06, cx: 540, cy: 1000, d: 3 },
  ],
  shakes: [OPEN + 1.3],
  says: [
    { t0: 8.6, t1: 11.3, who: SC, text: "I don't hold grudges. I *archive* them.", x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 11.6, t1: 14.3, who: PL, text: "I'm your planet. in astrology, I *rule* you.", x: 600, y: 330, tail: -220 },
    { t0: 14.6, t1: 16.6, who: PL, text: 'so this is *my* fault too.', x: 600, y: 330, tail: -220 },
    { t0: 18.0, t1: 20.7, who: SC, text: "I'm not checking. I'm *monitoring.*", x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 23.0, t1: 25.6, who: PL, text: "holding it doesn't punish *them.*", x: 600, y: 330, tail: -220 },
    { t0: 25.8, t1: 27.8, who: PL, text: 'it just keeps *you* up.', x: 600, y: 330, tail: -220 },
    { t0: 28.0, t1: 30.7, who: SC, text: '…they never even said *bye.*', x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 31.6, t1: 34.4, who: PL, text: "fun fact: I'm smaller than your *Moon.*", x: 600, y: 330, tail: -120 },
    { t0: 34.6, t1: 37.2, who: PL, text: "and I've got a giant *heart* on me.", x: 600, y: 330, tail: -120 },
    { t0: 37.4, t1: 39.2, who: PL, text: 'even I go *soft.*', x: 600, y: 330, tail: -120 },
    { t0: 39.5, t1: 41.4, who: SC, text: "…you're *crying.*", x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 41.6, t1: 43.6, who: PL, text: "*you're* crying.", x: 600, y: 330, tail: -220 },
    { t0: 45.6, t1: 48.4, who: PL, text: "you don't have to forgive it all *today.*", x: 600, y: 330, tail: -220 },
    { t0: 48.6, t1: 50.3, who: SC, text: 'just… *open* it?', x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 56.4, t1: 59.0, who: SC, text: "huh. it's *lighter* in here.", x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 65.2, t1: 67.6, who: PI, text: 'you texted *first?!*', x: 420, y: 1120, tail: -150 },
    { t0: 67.9, t1: 70.2, who: PL, text: 'transformation. still *counts.*', x: 560, y: 590, tail: 250 },
    { t0: 70.5, t1: 72.6, who: SC, text: "don't tell *anyone.*", x: 540, y: 1790, tailUp: true, tail: 200 },
    { t0: 72.8, t1: 74.8, who: PI, text: "I'm telling *everyone*", x: 420, y: 1120, tail: -150 },
  ],
  heads: [
    { text: 'Stay for what’s | *in the vault.*', at: 3.0, out: [5.6, 5.85], y: 300, size: 80 },
    { text: 'Letting go. | *One* by one.', at: 51.9, out: [55.6, 55.9], y: 300, size: 80 },
  ],
  last: { text: 'Vault’s open. | *Feels* lighter.', at: 75.2, y: 300 },
  bg(x, t, K) {
    if (t < CH[0]) { K.space(x, t, { horizon: { y: 1500, color: '#2a0f22', rim: '#ff5a6e' }, tint: '#ff5a6e' }); return }
    if (t < NEWR) {
      // the vault room: stone wall, a red low light
      const g = x.createLinearGradient(0, -300, 0, 1920); g.addColorStop(0, '#160a1c'); g.addColorStop(1, '#2a1426')
      x.fillStyle = g; x.fillRect(-600, -600, 2280, 3120)
      for (let j = 0; j < 22; j++) for (let i = -1; i < 8; i++) K.rect(x, i * 180 + (j % 2) * 90, j * 90 - 40, 172, 82, 'rgba(255,255,255,0.025)')
      K.glow(x, 540, 860, 700, '#ff5a6e', 0.12 + 0.05 * Math.sin(t * 1.3))
      K.rect(x, -600, 1560, 2280, 900, '#120814')
      return
    }
    K.room(x, t, { wall: '#5a3a5a', wall2: '#2a2a50', floor: '#4a3440', floorY: 1560, window: false, warm: 0.6 })
    // a big window, morning light
    const wk = K.prog(t, NEWR, NEWR + 1.5)
    K.box(x, 300, 520, 480, 620, '#14102a', { o: 10 })
    const s = x.createLinearGradient(0, 520, 0, 1140); s.addColorStop(0, '#ffb0a0'); s.addColorStop(1, '#ffe2a8')
    x.save(); x.globalAlpha = wk; x.fillStyle = s; x.fillRect(300, 520, 480, 620); x.restore()
    K.rect(x, 534, 520, 12, 620, K.INK); K.rect(x, 300, 824, 480, 12, K.INK)
    K.glow(x, 540, 830, 600, '#ffd89a', 0.25 * wk)
    // a plant
    K.box(x, 840, 1440, 100, 110, '#c96a3a'); for (let i = 0; i < 5; i++) { x.save(); x.translate(890, 1440); x.rotate(-1 + i * 0.5 + 0.05 * Math.sin(t * 2 + i)); K.box(x, -10, -150, 20, 140, '#3fae6a', { o: 3 }); x.restore() }
  },
  paint(x, t, K) {
    if (t < CH[0]) {
      // the hook: a small vault door in the distance, Scorpio mid-turn, tiny
      K.pluto(x, t, { mood: 'sly', look: [0, 1] })
      K.box(x, 380, 1380, 320, 140, '#5a5470', { o: 6 }); x.fillStyle = '#6e6888'; x.beginPath(); x.arc(540, 1450, 54, 0, Math.PI * 2); x.fill()
      K.sign(x, t, SC, { x: 540, y: 1560, size: 240, mood: 'wide', look: [0, -1], squash: t < 0.6 ? 0.1 * Math.sin(t * 20) : 0 })
      return
    }
    if (t < NEWR) {
      vaultDoor(x, K, t)
      // the filed hurts: pop around the door, then float off as stars when it opens
      FILED.forEach(([s, X, Y, r], i) => {
        const at = 6.5 + i * 0.6, fl = K.prog(t, FLOAT + i * 0.9, FLOAT + i * 0.9 + 2.2)
        if (fl >= 1) return
        x.save(); x.globalAlpha = 1 - fl
        K.label(x, 'FILED: ' + s, X, Y - fl * 500, { size: 24, bg: '#ff9aa8', rot: r + fl * 0.4, pop: K.pop01(t, at, 0.3) * (1 - fl * 0.6) })
        x.restore()
        if (fl > 0) drawPixelStar(x, X + Math.sin(fl * 6) * 20, Y - fl * 600, 22, i % 3, '#f2c75c')
      })
      if (t > FLOAT) K.motes(x, t, 540, 900, { n: 12, spread: 420, rise: 700, t0: FLOAT, dur: 3.2, color: '#ffd89a', seed: 8 })
      // the heart: Pluto's plain glows during chapter 3
      const hk = K.inOut(t, 34.6, 38.8, 0.5)
      if (hk > 0) K.glow(x, PLV.x + 40, PLV.y + 40, 160, '#ffb0c8', 0.6 * hk * (0.8 + 0.2 * Math.sin(t * 5)))
      K.pluto(x, t, { ...PLV, entrance: false, mood: t < 11.4 ? 'neutral' : t < 22.8 ? 'sly' : t < 31 ? 'sad' : t < 37.3 ? 'happy' : t < 45 ? 'cry' : t < 56 ? 'neutral' : 'happy', tears: t > 37.3 && t < 44 ? 1 : 0, look: [1, 0.8] })
      // Scorpio: walks up to the door for the key chapter
      const walk = K.ease.inOutCubic(K.prog(t, 46.0, 47.0)) * (1 - K.ease.inOutCubic(K.prog(t, 50.6, 51.4)))
      K.sign(x, t, SC, { x: K.lerp(790, 640, walk), y: K.lerp(1430, 1380, walk), size: 270, mood: t < 8.5 ? 'squint' : t < 16.7 ? 'eyeroll' : t < 23 ? 'squint' : t < 31 ? 'neutral' : t < 39.4 ? 'wide' : t < 45 ? 'neutral' : t < 51 ? 'squint' : 'sparkle', tears: (t > 28 && t < 31) || (t > 41.5 && t < 45) ? 2 : 0, look: t < 31 ? [-1, -0.6] : [-1, -1] })
      // the key, in chapter 4
      if (t > 45.5 && t < OPEN + 0.4) { const k = K.pop01(t, 45.5, 0.35) * (1 - K.prog(t, OPEN, OPEN + 0.4)); x.save(); x.translate(K.lerp(640, 600, walk), 1180); x.scale(k, k); x.rotate(-0.4); K.box(x, -12, -10, 120, 20, '#f2c75c'); K.box(x, 80, 10, 16, 30, '#f2c75c'); x.fillStyle = K.INK; x.beginPath(); x.arc(-40, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(-40, 0, 32, 0, Math.PI * 2); x.fill(); x.fillStyle = K.INK; x.beginPath(); x.arc(-40, 0, 12, 0, Math.PI * 2); x.fill(); x.restore() }
      return
    }
    // the new room
    K.pluto(x, t, { x: 910, y: 800, size: 220, entrance: false, mood: t > 67.8 && t < 70.3 ? 'proud' : 'happy', look: [1, 0.8] })
    K.sign(x, t, SC, { x: 790, y: 1430, size: 270, mood: t < 64.8 ? 'neutral' : t < 70.4 ? 'happy' : t < 72.7 ? 'wink' : 'sparkle', look: t < 64.4 ? [0, 1] : [-1, -0.3] })
    if (t > 64.8) { const p = K.ease.outBack(K.prog(t, 64.8, 65.4)); K.pisces(x, t, { x: K.lerp(-200, 300, p), y: 1440, size: 240, look: [1, -0.2] }) }
  },
  over(x, t, K) {
    // chapter 2: the ex's page, refresh, refresh
    if (t > 17.2 && t < 22.8) {
      const k = K.inOut(t, 17.2, 22.8), spin = (t * 6) % (Math.PI * 2)
      K.phone(x, t, { X: 540, Y: 960, w: 520, h: 640, pop: k, title: 'their page', time: '2:47', screen(c, tt, w, h) {
        c.fillStyle = '#2a2050'; c.beginPath(); c.arc(0, -h / 2 + 260, 70, 0, Math.PI * 2); c.fill()
        K.txt(c, 'last post: 3 weeks ago', 0, -h / 2 + 380, { size: 26, color: '#bdb3d8' })
        c.save(); c.translate(0, -h / 2 + 470); c.rotate(spin); c.strokeStyle = '#f2c75c'; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 30, 0, 4.5); c.stroke(); c.restore()
        K.txt(c, 'refreshing…', 0, -h / 2 + 540, { size: 24, color: '#f2c75c' })
      } })
      if (t > 21.0) K.label(x, 'CHECKED TODAY: 14', 540, 1340, { size: 40, bg: '#ff8a8a', rot: -0.04, pop: K.pop01(t, 21.0, 0.3) * k })
    }
    if (t > 25.9 && t < 28.0) K.label(x, '2:47 A.M.', 840, 560, { size: 36, bg: '#c9a6ff', rot: 0.06, pop: K.inOut(t, 25.9, 28.0) })
    if (t > 35.0 && t < 38.8) K.label(x, 'TRUE: a big heart-shaped plain', 600, 980, { size: 28, bg: '#ffb0c8', rot: -0.03, pop: K.inOut(t, 35.0, 38.8) })
    // chapter 5: the text
    if (t > 60.6 && t < 64.6) {
      const k = K.inOut(t, 60.6, 64.6)
      K.phone(x, t, { X: 540, Y: 1000, w: 520, h: 560, pop: k, title: 'bestie', time: '9:12', bubbles: [{ side: 'R', text: 'dinner this week?', at: 61.2 }, { side: 'L', text: 'YES. finally!!', at: 63.0 }] })
    }
  },
  cues: [
    ...[6.5, 7.1, 7.7, 8.3].map((t, i) => ['pop', t, 392 + i * 50, 0.03, i % 2 ? 0.3 : -0.3]),
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(17.6 + i * 0.6).toFixed(2), 0.03]), ['tom', 21.0, 90, { gain: 0.2, decay: 0.25 }],
    ['bell', 35.0, 523.25, 0.05, 2.5, 0], ['glitter', 37.4, 38.4],
    ['pop', 45.5, 1046.5, 0.04, 0], ['glitter', 45.5, 46.2],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(46.6 + i * 0.22).toFixed(2), 0.05]),
    ['riser', 47.6, OPEN + 1.2, 0.06], ['boom', OPEN + 1.3, 0.3], ['crash', OPEN + 1.3, { gain: 0.05, len: 2 }],
    ...[0, 1, 2, 3].map(i => ['glitter', +(FLOAT + i * 0.9).toFixed(2), +(FLOAT + i * 0.9 + 0.8).toFixed(2)]),
    ['pop', 61.2, 880, 0.04, 0.2], ['pop', 63.0, 1174.66, 0.04, -0.2], ['whoosh', 64.8, 0.4, 0.06], ['glitter', 65.2, 66.4], ['glitter', 72.8, 73.8],
  ],
  music: { style: 'screwed', key: 'Fm', seed: 10808, sections: { lift: [CH[1], CH[3], NEWR], breakdown: [CH[2]] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
