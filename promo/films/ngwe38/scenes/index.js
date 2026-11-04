// ngwe38 · Your Star Guide: Winter · ♑ Capricorn, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Capricorn, is that a laptop?"  The holiday party: lights, two stars dancing; Cap in a paper party hat, typing.
//   3.0   ♑ YOUR STAR: "you brought your laptop to the party."  The INBOX counter ticks up and up behind the dancing.
//   7.4   "the work will keep. this night won't."  Leo (♌) dances over: "dance?"  Cap glances… back at the screen.
//  11.8   "close it. you're allowed to be here."  CLICK. Cap shuts the laptop and hops into the dance.
//  15.45  "The inbox can | wait."  Cap dancing in its party hat, the laptop closed on the table. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, stringLights, prog, ease, lerp, clamp, INK, MONO, INTER, R, box, WOOD, WOOD_D, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const LEO = signStar('leo'), GEM = signStar('gemini')
const T0 = { ask: 9.4, glance: 10.2, click: 13.0, join: 13.4 }
const BEAT = 60 / 112

function laptop(x, t, cx, cy, close) {
  // base
  box(x, cx - 120, cy, 240, 22, '#9aa0bf', { b: 5 })
  // the screen, folding shut
  const h = 160 * Math.cos(clamp(close) * Math.PI / 2)
  if (h > 4) {
    box(x, cx - 110, cy - h, 220, h, '#2a2440', { b: 5 })
    if (h > 60) {
      R(x, '#bfe8ff', cx - 98, cy - h + 12, 196, h - 24)
      const n = Math.floor(47 + Math.max(0, t - 1) * 1.6)
      x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('INBOX', cx, cy - h + 40); x.fillStyle = '#c0304a'; x.font = `800 48px ${INTER}`; x.fillText(String(n), cx, cy - h + 90)
    }
  }
}
function partyHat(x, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx, cy - 76); x.lineTo(cx + 34, cy + 4); x.lineTo(cx - 34, cy + 4); x.closePath(); x.fill()
  x.fillStyle = '#ffd34d'; x.beginPath(); x.moveTo(cx, cy - 66); x.lineTo(cx + 26, cy); x.lineTo(cx - 26, cy); x.closePath(); x.fill()
  R(x, '#ff7eb6', cx - 14, cy - 26, 28, 8); R(x, '#ff7eb6', cx - 6, cy - 48, 12, 6); R(x, INK, cx - 10, cy - 90, 20, 20); R(x, '#ff7eb6', cx - 6, cy - 86, 12, 12)
}

const F = winterGuide({
  sign: 'capricorn', note: 2, duration: 25,
  hook: '*Capricorn,* is | that a laptop?',
  lines: [
    { t: 3.0, text: 'you brought your laptop to the *party.*' },
    { t: 7.4, text: "the work will keep. this night *won't.*" },
    { t: 11.8, text: "close it. you're *allowed* to be here." },
  ],
  fact: "CAPRICORN'S SYMBOL:|THE SEA-GOAT", factAt: 4.6, factDur: 2.4,
  last: 'The inbox can | *wait.*',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 100, s: 116, look: [1, -0.5], hops: [...d.hops, ...[1, 2, 3, 4, 5, 6].map(i => 15.5 + i * BEAT * 2)] }),
  guide(t) {
    const danceIn = ease.inOutCubic(prog(t, T0.join, T0.join + 0.6))
    const typing = t < T0.click ? 0.03 * Math.sin(t * 24) : 0
    const mood = t < T0.ask ? 'squint' : t < T0.glance + 0.6 ? (t > T0.glance ? 'wide' : 'neutral') : t < T0.click ? 'squint' : 'happy'
    const hops = t > T0.join ? Array.from({ length: 16 }, (_, i) => T0.join + 0.6 + i * BEAT * 2) : undefined
    return { x: lerp(330, 620, danceIn), y: 1150, size: 260, mood, look: t > T0.ask && t < T0.click && t < T0.glance ? [1, -0.3] : [1, 0.6], squash: typing, side: -1, lanternSize: 66, hops }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    stringLights(x, t, 40, 560, 1040, 560, { sag: 90, n: 11 })
    // the dancers
    const hops = Array.from({ length: 40 }, (_, i) => 0.1 + i * BEAT)
    drawStarChar(x, 820, 1120, 190, t, { color: LEO.color, glyph: LEO.glyph, seed: 4, mood: t > T0.ask && t < T0.ask + 1.4 ? 'wink' : 'happy', look: t > T0.ask && t < T0.click ? [-1, 0] : [0, -1], hops })
    drawStarChar(x, 975, 1150, 150, t, { color: GEM.color, glyph: null, seed: 8, mood: 'happy', look: [-1, -0.5], hops: hops.map(h => h + BEAT / 2) })
    x.restore()
  },
  drawMid(x, t, K) {
    x.save(); x.globalAlpha *= K.outAll(t)
    box(x, 380, 1214, 300, 26, WOOD, { b: 6, hi: '#b07a52' }); R(x, WOOD_D, 400, 1246, 20, 50); R(x, WOOD_D, 640, 1246, 20, 50)
    laptop(x, t, 530, 1192, prog(t, T0.click, T0.click + 0.25))
    x.restore()
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // Cap's party hat follows Cap
    const g = r || { x: 330, y: 1150, top: 1020 }
    partyHat(x, g.x, (g.top ?? 1020) + 10)
    x.restore()
    if (t > T0.ask && t < T0.ask + 2.2) K.bubble(790, 930, 'dance?', { size: 44, k: K.pop01(t, T0.ask, 0.3, 2.4) * (1 - prog(t, T0.ask + 1.9, T0.ask + 2.2)) })
    K.burst(640, 1060, 70, t, T0.click, { word: 'CLICK', size: 30 })
    K.sparkles(t, 600, 1080, T0.join + 0.3, 10, 220, 1)
    heartsUp(x, t, 560, 940, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', 0.2 + i * 0.22, 0.02]),
    ...[4.4, 5.6, 6.8, 8.0, 9.2, 10.4, 11.6].map(s => ['pop', s, 1567.98, 0.02, 0.2]),
    ['pop', T0.ask, 987.77, 0.045, 0.3], ['whoosh', T0.glance, 0.3, 0.02],
    ['tick', T0.click, 0.08], ['boom', T0.click + 0.05, 0.08], ['whoosh', T0.join, 0.5, 0.03], ['glitter', T0.join + 0.3, T0.join + 0.8],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
