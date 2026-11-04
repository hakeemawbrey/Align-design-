// npve08 · POV: You're Dating a ___ · ep 8 · "POV: you're dating a Scorpio." (18 s vertical, screwed · Ebm)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♏ SCORPIO across a candlelit table, staring straight into the lens. Unblinking.
//   2.3–5.6   (1) the eye contact goes on… and on. You blink (the screen blinks). SCORPIO: "you blinked *first.*"
//             Sticker: "it has not *blinked* once".
//   5.6–9.0   (2) it slides a talk card over: "What's a hill you will die on?" SCORPIO: "no small talk. *answer this.*"
//             Sticker: "*deep* questions only".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) YOU: "you first."  It ducks behind the menu, blushing. SCORPIO: "…I'm nervous *too.*"
//             Sticker: "wait. it's *shy*?"
//   12.95     Last line: "Intense. *Also* shy."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawImg, table, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const SC = signStar('scorpio'), SN = `${SC.glyph}︎ SCORPIO`, YN = 'YOU'
const T = { blink: [4.4, 4.7], card: [5.7, 6.4], cut: 9.15, hide: [10.0, 10.4], last: 12.95 }
const LINES = [
  { t: 4.8, speaker: SN, text: 'you blinked *first.*', color: '#ff6a8a' },
  { t: 6.5, speaker: SN, text: 'no small talk. *answer this.*', color: '#ff6a8a' },
  { t: 9.3, speaker: YN, text: 'you first.', color: '#c9a6ff' },
  { t: 10.6, speaker: SN, text: '…I’m nervous *too.*', color: '#ff6a8a' },
]
const HOPS = [...talkHops(LINES, SN), T.card[1], T.hide[0], T.last + 0.3, T.last + 0.8]

function candle(x, t, cx, by) {
  const g = x.createRadialGradient(cx, by - 140, 10, cx, by - 140, 360); g.addColorStop(0, 'rgba(255,190,110,0.35)'); g.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = g; x.fillRect(cx - 360, by - 500, 720, 720)
  R(x, INK, cx - 34, by - 130, 68, 134); R(x, '#fff4e6', cx - 28, by - 124, 56, 126); R(x, '#f2e2c8', cx + 8, by - 124, 20, 126)
  R(x, INK, cx - 3, by - 150, 6, 22)
  const f = 1 + 0.12 * Math.sin(t * 17) + 0.08 * Math.sin(t * 29)
  x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(cx, by - 170, 16 * f, 30 * f, 0.05 * Math.sin(t * 9), 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff2a8'; x.beginPath(); x.ellipse(cx, by - 165, 8 * f, 16 * f, 0, 0, Math.PI * 2); x.fill()
}
function menu(x, t) {
  if (t < T.hide[0]) return
  const k = ease.outBack(prog(t, ...T.hide)) * outK(t, [T.last - 0.3, T.last])
  if (k <= 0) return
  x.save(); x.translate(560, lerp(1600, 1150, k)); x.rotate(-0.04)
  R(x, INK, -230, -150, 460, 300); R(x, '#3a1a2e', -224, -144, 448, 288); R(x, GOLD, -210, -130, 420, 4); R(x, GOLD, -210, 126, 420, 4)
  x.fillStyle = GOLD; x.font = `italic 500 64px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Menu', 0, 0)
  x.restore()
}

const EP = makePOV({
  id: 'npve08', duration: 18, set: 'cafe',
  caption: 'you’re dating a *Scorpio.*',
  images: { talk: 'card-talk-1.png' },
  lines: LINES,
  boxes: [{ from: 0, to: 4, open: 4.65, close: 12.75 }],
  stickers: [
    { at: 1.6, out: [4.3, 4.45], text: 'it has not *blinked* once', x: 540, y: 330, rot: -2.5, size: 44, kind: 'dark' },
    { at: 7.4, out: [8.9, 9.05], text: '*deep* questions only', x: 540, y: 330, rot: 2.5, size: 46, kind: 'light' },
    { at: 11.4, out: [12.6, 12.8], text: 'wait. it’s *shy*?', x: 540, y: 330, rot: -2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Intense. *Also* shy.', color: '#ff6a8a' },
  cuts: [T.cut],
  punch: [{ at: 0.4, dur: 3.9, z: 0.14, x: 560, y: 900 }, { at: T.card[0], dur: 1.5, z: 0.1, x: 560, y: 1200 }],
  pitch: { [SN]: 466.16, [YN]: 587.33 },
  scene(x, t, K) {
    pisces(x, t, { x: 840, y: 720, s: 130, tears: t > T.last ? 3 : t > T.hide[0] ? 2 : 1, mood: t > T.hide[0] ? 'happy' : 'sparkle', look: [-1, 0.3], pop: pop01(t, -1) })
    let mood = 'neutral', look = [0, 0], blink = false
    if (t > 4.7) mood = 'wink'
    if (t > 5.4) mood = 'squint'
    if (t > T.card[1]) mood = 'sparkle'
    if (t > T.cut) { mood = 'wide'; blink = undefined }
    if (t > T.hide[0]) { mood = 'happy'; look = [0.6, 0.8] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    drawStarChar(x, 560, 960, 360, t, { color: SC.color, glyph: SC.glyph, mood, look, blink, hops: HOPS, seed: 11, glow: 1.1, blush: t > T.hide[0] ? 1 : 0 })
    menu(x, t)
    table(x, 1150, { col: '#4a2436', top: '#6a3448' })
    candle(x, t, 300, 1290)
    if (t > T.card[0]) { const k = ease.outCubic(prog(t, ...T.card)); drawImg(x, K.imgs.talk, lerp(560, 720, k), lerp(1100, 1290, k), lerp(120, 210, k), { rot: lerp(0.3, -0.06, k) }) }
    if (t > T.last) { sparkles(x, t, 560, 940, T.last + 0.35, 12, 240, 1, ['#ff6a8a', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 560 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 860 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your blink: lids close from the top and bottom
    const b = Math.sin(Math.PI * prog(t, ...T.blink))
    if (b > 0) { R(x, '#05040c', 0, 0, 1080, 960 * b); R(x, '#05040c', 0, 1920 - 960 * b, 1080, 960 * b) }
    // a staring-contest timer
    if (t < 4.4) { const s = Math.floor(t * 1.0) + 1; x.save(); x.font = `700 40px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,106,138,0.9)'; x.fillText(`EYE CONTACT 0:0${s}`, 540, 1410); x.restore() }
  },
  cues: [
    ['tick', 1.0, 0.03], ['tick', 2.0, 0.03], ['tick', 3.0, 0.03], ['tick', 4.0, 0.035],
    ['whoosh', r3(T.blink[0]), 0.25, 0.03], ['tick', r3(T.blink[0] + 0.15), 0.07],
    ['whoosh', r3(T.card[0]), 0.5, 0.03], ['tick', r3(T.card[1]), 0.05], ['bell', r3(T.card[1] + 0.05), 1244.51, 0.025, 1, 0],
    ['whoosh', r3(T.hide[0]), 0.3, 0.04], ['pop', r3(T.hide[1]), 932.33, 0.04, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
