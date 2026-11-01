// trratefriends: RATING MY DATE, HONESTLY, "Rating how they met my friends." (30 s vertical, Star Talk Trends §14,
// music: funk · C#m). Story 0–25.5, then the shared end card. The format look lives in ./ratekit.js (identical in all five).
//   0.0–2.6    hook: "Rating how they met | my *friends.*" ♋ Cancer, clipboard in hand: "the friends verdict is in."
//              THE STARS take the judges' desk; Pisces takes the fourth seat (tissues, soggy heart card).
//   2.6–8.0    1 · The *entrance.*  ♑ Capricorn walks in; four friends on the couch turn their heads in sync… silence…
//              Capricorn lifts a snack platter: "I brought snacks." The couch hops. Cards: 8 · SNACKS +1 · 9.
//   8.0–13.4   2 · The *names.*  Capricorn points down the couch; a name tag pops over each friend with a tick: LEO ✓
//              GEMINI ✓ ARIES ✓ VIRGO ✓. Virgo, checking the list: "…correct." Cards: 10 · 10 · 4 FOR 4.
//  13.4        card cut.
//  13.4–19.2   3 · The *inside joke.* (the twist)  The couch: "remember the pigeon with—"; everyone looks at the new
//              person… Capricorn: "—the tiny hat?!" A pixel pigeon in a tiny hat pops up; the couch SCREAMS (confetti).
//              Cards: 11 · /10 · KNOWS THE PIGEON.
//  19.2–25.5   Final *verdict.*  Drumroll, huddle, the cards flip YES · YES · YES, the meter overfills and shatters, the
//              stamp: "GROUP *APPROVED*". THE STARS: "Group *approved.*" A couch group hug. Pisces fountains.
import { makeRate, R, box, room, nightWindow, shadow, bubble, label, sparkles, hearts, confetti, drawBits,
  pop01, outK, prog, lerp, ease, drawStarChar, signStar, INK, BONE, GOLD, PINK, MINT, INTER, CLIP, FLOOR } from './ratekit.js'

const GND = FLOOR + 40
const FR = ['leo', 'gemini', 'aries', 'virgo'].map((id, i) => ({ id, ...signStar(id), x: 170 + i * 120, seed: 11 + i * 4 }))
const NAMES = ['LEO', 'GEMINI', 'ARIES', 'VIRGO']

function lounge(x, t) {
  room(x, '#3a2a5e', '#2a1f45', { stripe: '#5a4a8a' })
  nightWindow(x, 700, 540, 230, 160, t)
  // a lamp
  R(x, INK, 820, 640, 10, GND - 640); box(x, 784, 600, 82, 50, '#ffd98a', { b: 6 })
  // the couch back
  box(x, 96, 770, 560, 90, '#c45a7a', { b: 8, hi: '#e07a98' })
}
function couchFront(x) {
  box(x, 96, 860, 560, 70, '#a8476a', { b: 8, hi: '#c45a7a' })
  box(x, 76, 800, 44, 130, '#a8476a', { b: 8 }); box(x, 632, 800, 44, 130, '#a8476a', { b: 8 })
}
function friends(x, t, mood, look, hops, { y = 750, s = 150 } = {}) {
  FR.forEach((f, i) => drawStarChar(x, f.x, y, s, t, { color: f.color, mood: typeof mood === 'function' ? mood(i) : mood, look: typeof look === 'function' ? look(i) : look, hops: hops ? hops.map(h => h + i * 0.04) : null, seed: f.seed, glow: 0.9 }))
}
function platter(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -80, -10, 160, 24, '#c9c3dc', { b: 6 })
  const cols = [GOLD, '#e8344e', MINT, '#ff9a4a', BONE, PINK]
  for (let i = 0; i < 6; i++) box(x, -66 + i * 23, -32 - (i % 2) * 8, 16, 16, cols[i], { b: 3 })
  x.restore()
}
const PIGEON = ['....HHH...', '...HHHHH..', '...KKKK...', '..GGGGG...', '.GGWGGGGO.', '.GGGGGGOO.', 'GGGGGGGG..', 'GGBBGGGG..', '.GGBBBGG..', '..GGGGG...', '...Y..Y...']
function pigeon(x, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, PIGEON, { G: '#9aa4c4', W: '#ffffff', O: '#f2b43a', B: '#7a6aa8', Y: '#f2b43a', H: '#e8344e', K: INK }, cx, cy, 13 * k)
}

function entrance(x, t, S) {
  const { u, t0, hero, date } = S
  lounge(x, t)
  const turn = u > 0.75
  const happy = u > 2.0
  friends(x, t, i => happy ? (i % 2 ? 'heart' : 'sparkle') : turn ? 'wide' : 'happy', turn ? [1, 0] : i => [i % 2 ? 1 : -1, 0], [t0 + 0.75, t0 + 2.05, t0 + 2.35])
  couchFront(x)
  const cx = lerp(1000, 820, ease.outCubic(prog(u, 0.05, 0.6)))
  shadow(x, 700, GND, 170); shadow(x, cx, GND, 180)
  hero(x, t, { x: 700, y: 870, s: 160, mood: u < 1.9 ? 'neutral' : 'heart', look: u < 1.9 ? [-1, 0] : [1, 0], hops: [t0 + 2.1] })
  date(x, t, { x: cx, y: 860, s: 180, mood: u < 1.5 ? 'neutral' : 'happy', look: [-1, 0], hops: [t0 + 0.6, t0 + 1.55] })
  platter(x, cx - 10, lerp(900, 700, ease.outBack(prog(u, 1.5, 1.8))), pop01(t, t0 + 1.45, 0.3, 2))
  bubble(x, t, 380, 570, t0 + 0.9, t0 + 1.55, '…', { size: 44 })
  bubble(x, t, 680, 560, t0 + 1.6, t0 + 2.9, 'I brought snacks.', { size: 34, tail: 0.3 })
  sparkles(x, t, 400, 760, t0 + 2.05, 10, 220, 1)
}

function names(x, t, S) {
  const { u, t0, hero, date } = S
  lounge(x, t)
  const tagAt = [0.45, 0.85, 1.25, 1.65]
  const cur = tagAt.reduce((a, v, i) => (u >= v ? i : a), -1)
  friends(x, t, i => (u >= tagAt[i] ? (i === 3 && u > 2.1 ? 'squint' : 'sparkle') : 'neutral'), [1, 0], null)
  couchFront(x)
  shadow(x, 700, GND, 170); shadow(x, 840, GND, 180)
  hero(x, t, { x: 700, y: 870, s: 160, mood: u < 1.9 ? 'wide' : 'heart', look: [-1, -0.4], hops: [t0 + 2.0] })
  const pt = cur >= 0 ? FR[cur].x : 400
  date(x, t, { x: 840, y: 860, s: 180, mood: 'happy', look: [-1, 0], hops: tagAt.map(v => t0 + v) })
  if (u > 0.4 && u < 2.0) { x.save(); x.strokeStyle = 'rgba(242,199,92,0.35)'; x.setLineDash([12, 10]); x.lineWidth = 6; x.beginPath(); x.moveTo(800, 840); x.lineTo(pt, 760); x.stroke(); x.restore() }
  tagAt.forEach((v, i) => {
    const k = pop01(t, t0 + v, 0.28, 2.6)
    if (k <= 0.01) return
    x.save(); x.translate(FR[i].x, 590 + (i % 2) * 54); x.rotate((i % 2 ? 0.05 : -0.05)); x.scale(k, k)
    x.font = `800 26px ${INTER}`
    const w = x.measureText(NAMES[i] + ' ✓').width + 26
    box(x, -w / 2, -22, w, 44, BONE, { b: 5 })
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(NAMES[i] + ' ✓', 0, 2)
    x.restore()
    sparkles(x, t, FR[i].x, 760, t0 + v, 6, 70, i, [GOLD, MINT, BONE])
  })
  bubble(x, t, 600, 520, t0 + 2.15, t0 + 3.3, '…correct.', { size: 36, col: '#ffd6e6', tail: -0.6 })
}

function insideJoke(x, t, S) {
  const { u, t0, hero, date } = S
  lounge(x, t)
  const look = u < 1.0 ? (i => [i % 2 ? -1 : 1, 0]) : [1, 0]
  const scream = u > 2.0
  friends(x, t, scream ? 'wide' : u < 1.0 ? 'happy' : 'neutral', look, [t0 + 1.0, t0 + 2.0, t0 + 2.3, t0 + 2.6])
  couchFront(x)
  shadow(x, 700, GND, 170); shadow(x, 840, GND, 180)
  hero(x, t, { x: 700, y: 870, s: 160, mood: u < 1.5 ? 'neutral' : u < 2.0 ? 'wide' : 'heart', look: [1, 0], hops: [t0 + 2.05] })
  date(x, t, { x: 840, y: 860, s: 180, mood: u < 1.0 ? 'neutral' : u < 1.5 ? 'wide' : 'sparkle', look: [-1, 0], hops: [t0 + 1.5, t0 + 2.4] })
  bubble(x, t, 360, 560, t0 + 0.35, t0 + 1.4, 'remember the pigeon with—', { size: 32, tail: 0 })
  bubble(x, t, 700, 560, t0 + 1.5, t0 + 2.9, '—the tiny hat?!', { size: 38, col: '#ffe0ea', tail: 0.5 })
  pigeon(x, 470, 500, pop01(t, t0 + 1.6, 0.35, 2.4) * outK(t, [t0 + 4.9, t0 + 5.2]))
  if (scream) {
    const k = pop01(t, t0 + 2.0, 0.25, 3) * outK(t, [t0 + 3.3, t0 + 3.6])
    if (k > 0.01) label(x, 'AAAAAH!', 330, 600, { size: 56 * k, col: GOLD, font: INTER, weight: 800, rot: -0.06 })
    confetti(x, t, t0 + 2.0, 380, 740)
  }
}

function finale(x, t, S) {
  const { t0, ok, hero, date } = S
  lounge(x, t)
  const hug = ease.inOutCubic(prog(t, 21.35, 21.8))
  FR.forEach((f, i) => drawStarChar(x, lerp(f.x, [250, 360, 600, 710][i], hug), 750, 150 * ok, t, { color: f.color, mood: t < 21.3 ? 'squint' : 'heart', look: [i < 2 ? 1 : -1, 0], hops: [21.35 + i * 0.05, 22.4 + i * 0.08, 23.4], seed: f.seed, glow: 0.9 }))
  couchFront(x)
  date(x, t, { x: 480, y: lerp(860, 760, hug), s: 190, pop: ok, mood: t < 21.3 ? 'wide' : 'happy', look: [0, 0], hops: [21.4, 22.6, 23.6] })
  hero(x, t, { x: 820, y: 870, s: 160, pop: ok, mood: t < 21.3 ? 'squint' : 'heart', look: [-1, 0], hops: [21.45, 22.9] })
  hearts(x, t, 21.5, 480, 680, { n: 7, spread: 380 })
  void t0
}

const EP = makeRate({
  id: 'trratefriends', hero: 'cancer', heroName: 'CANCER', date: 'capricorn', accent: '#7fd8ff', heroInk: '#8fd8ff',
  title: 'Rating how they met | my *friends.*',
  hookTime: '1:12 AM', hookSay: 'the friends verdict is in.',
  moments: [
    { caption: 'The *entrance.*', time: '8:00 PM', draw: entrance, cards: ['8', 'SNACKS|+1', '9'], level: 8.5,
      line: 'walked in with snacks. strategic. *cute.*',
      cues: [['whoosh', 0.05, 0.4, 0.03], ['tick', 0.75, 0.06], ['tick', 0.78, 0.05], ['pop', 1.5, 1174.66, 0.04, 0.3], ['glitter', 1.55, 1.9],
        ['pop', 2.05, 880, 0.03, -0.3], ['pop', 2.1, 987.77, 0.03, -0.1], ['pop', 2.15, 1174.66, 0.03, 0.1], ['pop', 2.2, 1318.51, 0.03, 0.3]] },
    { caption: 'The *names.*', time: '8:30 PM', draw: names, cards: ['10', '10', '4 FOR|4'], level: 10,
      line: 'learned *everyone’s* name. first try.',
      cues: [['pop', 0.45, 880, 0.04, -0.6], ['pop', 0.85, 987.77, 0.04, -0.3], ['pop', 1.25, 1174.66, 0.04, 0], ['pop', 1.65, 1318.51, 0.045, 0.3], ['bell', 1.7, 1760, 0.02, 0.6, 0.3], ['pluck', 2.15, 659.25, 0.03, 0.4, -0.3]] },
    { caption: 'The *inside joke.*', time: '9:10 PM', draw: insideJoke, cards: ['11', '/10', 'KNOWS THE|PIGEON'], level: 11,
      line: 'they finished the *pigeon* joke. HOW?!',
      cues: [['pop', 0.35, 739.99, 0.03, -0.2], ['tick', 1.0, 0.05], ['pop', 1.5, 1318.51, 0.045, 0.3], ['pop', 1.6, 1567.98, 0.04, 0], ['glitter', 1.6, 1.9],
        ['boom', 2.0, 0.2], ['glitter', 2.0, 2.6], ['pop', 2.02, 1760, 0.04, -0.3], ['pop', 2.1, 2093, 0.03, 0.3]] },
  ],
  final: { caption: 'Final *verdict.*', time: '1:12 AM', draw: finale, cards: ['YES', 'YES', 'YES!!'], stamp: 'GROUP *APPROVED*' },
  last: 'Group *approved.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
