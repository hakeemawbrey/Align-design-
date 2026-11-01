// trratemix: RATING MY DATE, HONESTLY, "Rating the playlist they made me." (30 s vertical, Star Talk Trends §14,
// music: funk · Em). Story 0–25.5, then the shared end card. The format look lives in ./ratekit.js (identical in all five).
// The playlist is a pixel mixtape in a generic boombox, with a handwritten tracklist; every song title is made up.
//   0.0–2.6    hook: "Rating the playlist | they *made me.*" ♒ Aquarius, clipboard in hand: "playlist review. brutal
//              honesty." THE STARS take the judges' desk; Pisces takes the fourth seat (tissues, soggy heart card).
//   2.6–8.0    1 · Track *one.*  "Song About Your Laugh". Play: the reels spin, notes float, "♪ ha-ha-HA ♪"; Aquarius
//              (headphones) head-bobs. Cards: 9 · 9 · CATCHY.
//   8.0–13.4   2 · Track *two.*  "Forty Seconds of Rain (You Like Rain)". A little pixel cloud rains on the boombox;
//              Aquarius, eyes shut, blissed out. Cards: 10 · WEIRD. PERFECT. · 10.
//  13.4        card cut.
//  13.4–19.2   3 · Track *three.* (the twist)  "Just Me Saying Hi". "…hi." Aquarius melts, REWINDS, "…hi.", rewinds
//              again, "…hi." Cards: 11 · /10 · REWOUND IT.
//  19.2–25.5   Final *score.*  The tape label reads "us", a big REPEAT loop spins over the boombox; the meter
//              shatters; the stamp: "ON *REPEAT*". THE STARS: "On *repeat.*" Pisces fountains.
import { makeRate, R, box, room, nightWindow, shadow, bubble, label, sparkles, hearts, drawBits, starFrame, inSprite,
  pop01, outK, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT, SKYB, INTER, MONO, SERIF, CLIP, FLOOR } from './ratekit.js'

const GND = FLOOR + 40
const AQ = '#38c4ec'
const TRACKS = ['Song About Your Laugh', 'Forty Seconds of Rain', 'Just Me Saying Hi']
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']

function headphonesCells(x) {
  x.fillStyle = INK; x.fillRect(7, 1, 22, 3); x.fillRect(5, 3, 3, 12); x.fillRect(28, 3, 3, 12)
  x.fillStyle = '#e8344e'; x.fillRect(8, 1.6, 20, 1.6)
  for (const ex of [2.5, 29.5]) { x.fillStyle = INK; x.fillRect(ex - 0.6, 12, 5.2, 9); x.fillStyle = '#e8344e'; x.fillRect(ex, 12.6, 4, 7.8); x.fillStyle = '#ff8a9a'; x.fillRect(ex + 0.6, 13.4, 1.2, 3) }
}
const aquarius = (x, t, hero, o) => { hero(x, t, o); inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => headphonesCells(x)) }

function den(x, t) {
  room(x, '#1f3350', '#18223a', { stripe: '#2f4a6e' })
  nightWindow(x, 760, 520, 170, 130, t)
  box(x, 90, 900, 520, 30, '#8a5a3a', { b: 8, hi: '#a87048' }); R(x, INK, 120, 936, 20, 70); R(x, INK, 560, 936, 20, 70)
}
// the tracklist card on the wall: the current track highlighted
function tracklist(x, cur, t) {
  x.save(); x.translate(400, 578); x.rotate(-0.025)
  box(x, -230, -96, 460, 200, '#fff6e2', { b: 6 })
  R(x, '#e8344e', -18, -110, 36, 24)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `italic 500 34px ${SERIF}`; x.fillStyle = '#c42a3f'; x.fillText('for you ♥', 0, -64)
  x.textAlign = 'left'; x.font = `700 23px ${MONO}`
  TRACKS.forEach((s, i) => {
    if (i === cur) { x.globalAlpha = 0.55 + 0.25 * Math.sin(t * 6); R(x, GOLD, -212, -32 + i * 44, 424, 36); x.globalAlpha = 1 }
    x.fillStyle = '#2c2a7a'; x.fillText(`${i + 1}. ${s}`, -200, -14 + i * 44)
  })
  x.restore()
}
function boombox(x, t, cx, cy, { spin = 0, labelText = 'MIX', k = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -100, -150, 200, 10); R(x, INK, -110, -146, 10, 40); R(x, INK, 100, -146, 10, 40)   // handle
  box(x, -180, -110, 360, 190, '#5a5470', { b: 8, hi: '#7a7494' })
  for (const sx of [-112, 112]) {
    const bump = 1 + 0.06 * Math.abs(Math.sin(t * 8)) * (spin !== 0 ? 1 : 0)
    x.fillStyle = INK; x.beginPath(); x.arc(sx, -10, 52 * bump, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#2a2440'; x.beginPath(); x.arc(sx, -10, 44 * bump, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#8c86a8'; x.beginPath(); x.arc(sx, -10, 14, 0, Math.PI * 2); x.fill()
  }
  // the cassette window
  box(x, -52, -56, 104, 66, '#f2e6d0', { b: 5 })
  x.font = `800 14px ${INTER}`; x.fillStyle = '#c42a3f'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(labelText, 0, -44)
  for (const rx of [-24, 24]) {
    x.save(); x.translate(rx, -12); x.rotate(t * spin * 8)
    x.fillStyle = INK; x.fillRect(-11, -11, 22, 22); x.fillStyle = '#f2e6d0'; x.fillRect(-3, -9, 6, 18); x.fillRect(-9, -3, 18, 6)
    x.restore()
  }
  R(x, INK, -150, 46, 300, 14)
  for (let i = 0; i < 4; i++) box(x, -130 + i * 70, 28, 46, 18, i === 0 && spin ? MINT : '#c9c3dc', { b: 3 })
  x.restore()
}
function notes(x, t, cx, cy, t0, t1) {
  if (t < t0 || t > t1) return
  for (let i = 0; i < 6; i++) {
    const p = ((t - t0) * 0.6 + i / 6) % 1
    drawBits(x, NOTE, { X: [GOLD, PINK, MINT, SKYB][i % 4] }, cx - 160 + i * 64 + 20 * Math.sin(t * 2 + i), cy - p * 260, 6, { alpha: Math.sin(Math.PI * p) * outK(t, [t1 - 0.2, t1]) })
  }
}
const BOX = { x: 330, y: 830 }

function track1(x, t, S) {
  const { u, t0, hero } = S
  den(x, t)
  tracklist(x, 0, t)
  const play = u > 0.35
  boombox(x, t, BOX.x, BOX.y, { spin: play ? 1 : 0 })
  notes(x, t, BOX.x, BOX.y - 120, t0 + 0.45, t0 + 5.4)
  const bops = Array.from({ length: 8 }, (_, i) => t0 + 1.0 + i * 0.278)
  shadow(x, 720, GND, 190)
  aquarius(x, t, hero, { x: 720, y: 860, s: 210, mood: u < 0.9 ? 'neutral' : u < 2.2 ? 'happy' : 'sparkle', look: [-1, 0], hops: bops })
  if (u > 0.3 && u < 0.6) label(x, '*click*', BOX.x - 80, BOX.y + 110, { size: 26, col: BONE })
  bubble(x, t, BOX.x, 726, t0 + 1.0, t0 + 2.9, '♪ ha-ha-HA ♪', { size: 36, col: '#fff1c8', tail: 0 })
}

function track2(x, t, S) {
  const { u, t0, hero } = S
  den(x, t)
  tracklist(x, 1, t)
  boombox(x, t, BOX.x, BOX.y, { spin: 0.6 })
  // a little cloud raining on the boombox
  const ck = pop01(t, t0 + 0.4, 0.4, 2)
  if (ck > 0.01) {
    drawBits(x, ['...WWW....', '..WWWWW.W.', '.WWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.'], { W: '#cfd8ee' }, BOX.x, 680, 16 * ck)
    for (let i = 0; i < 14; i++) { const p = ((t - t0) * 1.6 + i / 14) % 1; R(x, '#8fe3ff', BOX.x - 140 + (i * 23) % 280, 720 + p * 80, 5, 14) }
  }
  shadow(x, 720, GND, 190)
  aquarius(x, t, hero, { x: 720, y: 860, s: 210, mood: u < 1.0 ? 'neutral' : 'sleepy', zzz: false, look: [-1, 0], hops: [t0 + 1.0], blush: u > 1.2 ? 1 : undefined })
  if (u > 1.2) label(x, '*rain sounds*', 720, 680, { size: 28, col: SKYB, alpha: outK(t, [t0 + 3.0, t0 + 3.3]) })
  bubble(x, t, 720, 620, t0 + 1.9, t0 + 2.95, 'weird. perfect.', { size: 34, tail: 0 })
}

function track3(x, t, S) {
  const { u, t0, hero } = S
  den(x, t)
  tracklist(x, 2, t)
  const rew = [[1.35, 1.75], [2.25, 2.6]]
  const inRew = rew.some(([a, b]) => u > a && u < b)
  boombox(x, t, BOX.x, BOX.y, { spin: inRew ? -4 : 1 })
  const his = [0.45, 1.85, 2.7]
  his.forEach((h, i) => bubble(x, t, BOX.x, 726, t0 + h, t0 + (i < 2 ? rew[i][0] : 4.6), '…hi.', { size: 44, col: '#ffe0ea', tail: 0 }))
  rew.forEach(([a, b]) => { const k = pop01(t, t0 + a, 0.2, 2.6) * outK(t, [t0 + b - 0.1, t0 + b]); if (k > 0.01) label(x, '◀◀ REWIND', 600, 712, { size: 36 * k, col: GOLD, font: INTER, weight: 800, rot: -0.05 }) })
  shadow(x, 720, GND, 190)
  aquarius(x, t, hero, { x: 720, y: 860, s: 210, mood: u < 0.6 ? 'neutral' : u < 1.0 ? 'wide' : 'heart', look: [-1, 0], hops: [t0 + 0.6, t0 + 1.35, t0 + 1.95, t0 + 2.25, t0 + 2.8], blush: u > 1.0 ? 1 : undefined })
  if (u > 2.8) hearts(x, t, t0 + 2.8, 720, 720, { n: 6 })
}

function finale(x, t, S) {
  const { t0, ok, hero } = S
  den(x, t)
  boombox(x, t, BOX.x, BOX.y, { spin: 1, labelText: 'us', k: ok })
  notes(x, t, BOX.x, BOX.y - 120, t0 + 0.1, t0 + 6.2)
  // the repeat loop: two chunky arrows chasing round a ring
  const rk = pop01(t, t0 + 0.3, 0.4, 2.2) * ok
  if (rk > 0.01) {
    x.save(); x.translate(BOX.x, 580); x.scale(rk, rk); x.rotate(t * 2.4)
    for (let i = 0; i < 2; i++) {
      x.save(); x.rotate(i * Math.PI)
      for (let a = 0; a < 10; a++) { const ang = a * 0.24; R(x, INK, Math.cos(ang) * 90 - 13, Math.sin(ang) * 90 - 13, 26, 26) }
      for (let a = 0; a < 10; a++) { const ang = a * 0.24; R(x, GOLD, Math.cos(ang) * 90 - 8, Math.sin(ang) * 90 - 8, 16, 16) }
      drawBits(x, ['A....', 'AA...', 'AAA..', 'AAAA.', 'AAAAA'], { A: GOLD }, Math.cos(2.5) * 90, Math.sin(2.5) * 90, 8, { rot: 2.5 + 0.6 })
      x.restore()
    }
    x.restore()
  }
  shadow(x, 690, GND, 190)
  aquarius(x, t, hero, { x: 690, y: 860, s: 210, pop: ok, mood: t < 21.3 ? 'happy' : 'heart', look: [-1, 0], hops: [21.35, 21.9, 22.45, 23.0, 23.55, 24.1] })
  hearts(x, t, 21.4, 560, 700, { n: 7, spread: 320 })
  void sparkles; void nightWindow
}

const EP = makeRate({
  id: 'trratemix', hero: 'aquarius', heroName: 'AQUARIUS', date: 'cancer', accent: '#6fe0ff', heroInk: '#7fe0ff',
  title: 'Rating the playlist | they *made me.*',
  hookTime: '12:05 AM', hookSay: 'playlist review. brutal honesty.',
  hook: (x, t) => { if (t > 1.6) label(x, '(it’s a mixtape.)', 560, 1000, { size: 26, col: GOLD, alpha: pop01(t, 1.6, 0.3, 2) }) },
  moments: [
    { caption: 'Track *one.*', time: '9:00 PM', draw: track1, cards: ['9', '9', 'CATCHY'], level: 9,
      line: 'a whole song about my laugh. it *slaps.*',
      cues: [['tick', 0.35, 0.08], ['pop', 0.4, 880, 0.03, -0.3], ['pluck', 1.0, 1174.66, 0.035, 0.3, -0.2], ['pluck', 1.15, 1318.51, 0.035, 0.3, -0.2], ['pluck', 1.3, 1567.98, 0.04, 0.3, -0.2]] },
    { caption: 'Track *two.*', time: '9:04 PM', draw: track2, cards: ['10', 'WEIRD.|PERFECT.', '10'], level: 10,
      line: 'forty seconds of rain. I *love* rain.',
      cues: [['pop', 0.4, 659.25, 0.03, -0.3], ...Array.from({ length: 16 }, (_, i) => ['tick', +(0.6 + i * 0.13).toFixed(3), 0.012 + (i % 3) * 0.004]), ['pop', 1.9, 987.77, 0.035, 0.3]] },
    { caption: 'Track *three.*', time: '9:05 PM', draw: track3, cards: ['11', '/10', 'REWOUND|IT'], level: 11,
      line: 'track three is just them saying *hi.*',
      cues: [['pop', 0.45, 1318.51, 0.04, -0.2], ['riser', 1.35, 1.75, 0.02], ['tick', 1.36, 0.06], ['pop', 1.85, 1318.51, 0.04, -0.2],
        ['riser', 2.25, 2.6, 0.02], ['tick', 2.26, 0.06], ['pop', 2.7, 1318.51, 0.045, -0.2], ['pluck', 2.82, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  final: { caption: 'Final *score.*', time: '12:05 AM', draw: finale, cards: ['∞', 'REPEAT', '∞'], stamp: 'ON *REPEAT*' },
  last: 'On *repeat.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
