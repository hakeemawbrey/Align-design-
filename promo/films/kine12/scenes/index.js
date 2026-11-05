// kine12: IS THIS NORMAL?, "I give great advice. I never take it." (18.5 s vertical, star_advice post, music: funk · D).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Great at advice. | *Terrible* at taking it." landed; ♊ Gemini mid-lecture with a pointer at a
//              whiteboard ("DON'T TEXT THEM AT 2 A.M."), ♓ Pisces in the client chair crying; behind them a mirror
//              shows Gemini texting at 2:04 a.m.
//   0.60       whip zoom into the mirror.
//   1.9–5.6    NEWS DESK: "Local advice-giver ignores *own advice.*" Ticker: "friend: helped" · "own texts: still sent at
//              2 a.m." · "more at eleven".
//   5.75–9.5   NORMAL-O-METER: SO NORMAL.
//   9.6–16.7   THE STARS: "it's easier to see clearly from the *outside.*" → "ask: 'what would I tell my *best
//              friend?*'"  Role swap: Pisces takes the pointer, Gemini sits in the chair, reads the board, puts the
//              phone face down. Pisces happy-cries.
//  16.8–18.5   last line: "Be your own best | friend for *once.*"  Hard cut.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3, drawStarChar, signStar,
} from '../../kine01/normalkit.js'

const D = 18.5, FLOOR = 1460
const GEM = signStar('gemini')
const T = {
  whip: 0.6, h0Out: [1.75, 1.9], news: 1.9, newsOut: [5.45, 5.65],
  meter: 5.75, mOut: [9.35, 9.6],
  starsIn: 9.5, l1: 9.75, l2: 12.95, boxClose: 16.65, swap: 11.4, down: 14.9,
  last: 16.8,
}
const NEWS = { at: T.news, out: T.newsOut, headline: 'Local advice-giver ignores *own advice.*', tag: 'BREAKING', channel: 'STAR NEWS', ticker: ['friend: helped, sources say', 'own texts: still sent at 2 a.m.', 'more at eleven'], clock: '2:04' }

function office(x, t) {
  room(x, { y: FLOOR, wall: '#1e2146', floor: '#2c2a50' })
}
function board(x, t, text2) {
  box(x, 90, 520, 560, 380, BONE, { b: 8 }); R(x, '#8c86a8', 90, 900, 560, 16)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('ADVICE:', 120, 570)
  x.font = `700 32px ${MONO}`; x.fillStyle = '#2c2a7a'
  x.fillText("1. don't text them", 120, 640); x.fillText('   at 2 a.m.', 120, 684)
  x.fillText('2. sleep on it', 120, 744); x.fillText(text2, 120, 804)
}
function mirror(x, t, cx, cy, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 200, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c8a070'; x.beginPath(); x.ellipse(0, 0, 140, 190, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a3a6a'; x.beginPath(); x.ellipse(0, 0, 122, 172, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(0, 0, 122, 172, 0, 0, Math.PI * 2); x.clip()
  drawStarChar(x, -10, 40, 170, t, { color: GEM.color, mood: 'squint', look: [1, 0.8], seed: 4, tips: false, glow: 0.3 })
  miniPhone(x, 60, 60, { s: 0.55, rot: 0.2, glow: 1, lines: [{ text: '2:04', size: 22, col: RED }, { text: t > 3.6 && t < 6 ? 'SENT ✓' : 'hey u up', size: 16, dy: 10, col: t > 3.6 && t < 6 ? MINT : BONE }] })
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(-100, -170, 30, 340)
  x.restore()
  label(x, 'MEANWHILE:', 0, -220, { size: 24, col: GOLD })
  x.restore()
}
function pointer(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -6, -160, 12, 170); R(x, '#a87a50', -3, -156, 6, 160); R(x, RED, -5, -170, 10, 16); x.restore() }
function chair(x, cx) { box(x, cx - 90, 1180, 180, 40, '#7a4a8a', { b: 6 }); box(x, cx - 90, 1020, 30, 160, '#7a4a8a', { b: 6 }); R(x, INK, cx - 8, 1220, 16, FLOOR - 1220) }

const EP = makeNormal({
  id: 'kine12', D, ending: 'cut', hero: 'gemini',
  hook: { text: 'Great at advice. | *Terrible* at taking it.', out: T.h0Out, accentColor: '#ffe27a' },
  whips: [{ at: T.whip, len: 0.45, from: 1.7, cx: 860, cy: 760 }],
  fx: [[hook.newsDesk, hook.newsDeskCues, NEWS]],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "it's easier to see clearly from the *outside.*" },
    { t: T.l2, text: "ask: 'what would I tell my *best friend?*'" },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Be your own best | friend for *once.*', at: T.last, lateAt: T.last + 0.5, accent: GOLD, size: 96 },
  punches: [T.meter + 1.75, T.swap, T.down],
  scene(x, t, S) {
    if (t < T.meter) {
      office(x, t)
      board(x, t, '3. you deserve calm')
      mirror(x, t, 860, 760)
      chair(x, 780)
      // Pisces, the client, crying in the chair
      S.pis(x, t, { x: 780, y: 1120, s: 230, tears: 3, mood: t > 3.7 ? 'wide' : 'sparkle', look: t > 3.7 ? [1, -1] : [-1, -0.4], tissues: 'right', hops: [3.7], say: [3.8, T.meter - 0.2, 'did you just text them?'], sayDx: -60, sayDy: -60, saySize: 28 })
      // Gemini mid-lecture, pointer jabbing the board
      const jab = 0.25 * Math.sin(t * 9)
      S.hero(x, t, { x: 360, y: 1180, s: 330, mood: 'happy', look: [-1, -0.8], hops: [0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0] })
      pointer(x, 230, 1080, -0.7 + jab)
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'wide' : 'happy', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      office(x, t)
      board(x, t, '3. take your own advice')
      chair(x, 780)
      const sw = ease.inOutCubic(prog(t, T.swap, T.swap + 0.6))
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      // before the swap: Gemini at the board, Pisces in the chair. After: swapped.
      const gx = lerp(360, 780, sw), gy = lerp(1180, 1120, sw), gs = lerp(320, 240, sw)
      const px = lerp(780, 360, sw), py = lerp(1120, 1180, sw), ps = lerp(230, 280, sw)
      S.pis(x, t, { x: px, y: py, s: ps, pop: k, tears: t > T.down ? 3 : 2, mood: t > T.down ? 'happy' : 'sparkle', look: sw > 0.5 ? [1, -0.3] : [-1, -0.4], hops: [T.swap + 0.6, T.down + 0.1, T.last + 0.5] })
      if (sw > 0.5) pointer(x, px - 130, py - 100, -0.7 + 0.2 * Math.sin(t * 7))
      S.hero(x, t, { x: gx, y: gy, s: gs, pop: k, mood: t > T.down ? 'sparkle' : sw > 0.5 ? 'wide' : 'neutral', look: sw > 0.5 ? [-1, -0.6] : [0, -1], hops: [T.mOut[0] + 0.2, T.swap + 0.6, T.down] })
      // the phone: face up (glowing) → face down
      if (sw > 0.5) {
        if (t < T.down) miniPhone(x, gx + 120, gy + 30, { s: 0.6, rot: 0.2, glow: 1, lines: [{ text: 'hey u up', size: 16 }] })
        else { x.save(); x.translate(gx + 140, 1196); box(x, -60, -12, 120, 24, '#2a2148', { b: 5 }); x.restore(); label(x, 'face down.', gx + 140, 1250, { size: 24, col: MINT, alpha: pop01(t, T.down, 0.25, 2) }) }
      }
      if (t > T.down) sparkles(x, t, gx + 140, 1196, T.down, 8, 90, 1, [MINT, BONE])
      S.stars(x, t, { x: 950, y: 640, s: 130, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.down ? 'happy' : 'neutral', look: [-1, 0.4] })
    }
  },
  cues: [
    ['whoosh', 3.55, 0.25, 0.04], ['pop', 3.6, 1567.98, 0.04, 0.4], ['pop', 3.8, 659.25, 0.04, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.0 + i * 0.35), 0.03]),
    ['whoosh', T.swap, 0.5, 0.05], ['pop', T.swap + 0.6, 987.77, 0.04, -0.2], ['pop', T.swap + 0.65, 1318.51, 0.035, 0.2],
    ['tick', T.down, 0.08], ['pop', T.down + 0.02, 659.25, 0.045, 0.3], ['glitter', T.down, T.down + 0.4], ['bell', T.down + 0.3, 1760, 0.025, 1.0, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, CYAN, drawBits, hearts, bubble, shadow, glowAt, clamp]
