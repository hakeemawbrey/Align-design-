// r2a0753: star_advice, ADVICE SOLO, "How to thank | *a Scorpio.*" (~51 s vertical, signs3kit social cut, music:
// lofi · C). One sign the whole way, 9 cards for the people who love a Scorpio: a relatable truth + a warm way to say thanks.
//   skip the big speech (they hate the spotlight) · be specific (they notice details) · say it in private (a note
//   works) · remember the small thing (they did) · mean it (they can tell) · a dark chocolate (fancy, mysterious)
//   · one hug is plenty · loyalty back is the real gift · let them pretend it was nothing
//  37.8  "Thank them softly. | *They feel it.*"   41.0  LESSON "Quiet thanks | *land the deepest.*" GRATITUDE: RECEIVED
//  46.9  "They’ll act cool. | *They kept the note.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, meter, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'scorpio', ACC = '#c97bff', ST = { x: -170 }

// a folded note with a wax seal
function note(x, cx, cy, k, { rot = -0.06, text = 'thank you ♡' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -80, 272, 176)
  x.fillStyle = INK; x.fillRect(-146, -96, 292, 192); x.fillStyle = CREAM; x.fillRect(-138, -88, 276, 176)
  x.strokeStyle = '#d9cbb0'; x.lineWidth = 4; x.beginPath(); x.moveTo(-138, -88); x.lineTo(0, 10); x.lineTo(138, -88); x.stroke()
  x.fillStyle = '#9a3ad0'; x.beginPath(); x.arc(0, 10, 30, 0, 7); x.fill(); x.fillStyle = '#d8a6ff'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏︎', 0, 12)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(text, 0, 64)
  x.restore()
}
// a dark chocolate bar, half unwrapped
function choc(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-90, -130, 196, 276)
  x.fillStyle = INK; x.fillRect(-104, -144, 208, 288)
  x.fillStyle = '#4a2a1a'; x.fillRect(-96, -136, 192, 130)
  x.fillStyle = '#6b3d26'; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) x.fillRect(-84 + i * 92, -124 + j * 62, 76, 50)
  x.fillStyle = '#2a1640'; x.fillRect(-96, -6, 192, 142)
  x.fillStyle = GOLD; x.fillRect(-96, 30, 192, 12)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('90% DARK', 0, 90)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Skip the big speech. | *Spotlight makes them hide.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 720, lt, 1.0, 'EVERYONE, A TOAST!', 'psst. thanks ♡', { size: 32, fromBg: GOLD, toBg: LAV })
      L(x, 800, 960, 'VOLUME: WHISPER', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Be specific. | *They notice details.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 360, head: 'THANK YOU FOR', headBg: ACC, headInk: INK, lines: ['the soup (tue)', 'the playlist', 'remembering', 'my dog’s name'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'DETAILS: SEEN ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Say it in private. | *A note works.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 650, 'FOR YOUR EYES ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Remember the small thing. | *They always do.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 16 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 660, 'OAT MILK. 2 SUGARS.', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 30)
      bubble(x, 800, 1070, 'you REMEMBERED?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: '#e8d0ff', tail: 'bc' })
    } },
  { sign: S, cap: 'Mean it. | *They can tell.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      meter(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.4) / 1.0), { w: 320, col: MINT, title: 'SINCERITY SCAN' })
      L(x, 800, 1090, 'SINCERITY: VERIFIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Bring dark chocolate. | *Deep, like them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      choc(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1110, 'GIFT: ACCEPTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 6, 170, 0.6)
    } },
  { sign: S, cap: 'One hug. | *Don’t push it.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), back = ease.inOutCubic(prog(lt, 1.3, 1.8))
      if (k > 0.01) signChar(x, t, 'leo', lerp(600, 830, back), 910, 200 * k, { mood: back > 0.5 ? 'wink' : 'heart', look: [-1, 0], seed: 13, glyph: false })
      L(x, 800, 660, back > 0.3 ? 'HUG #2: DENIED' : 'HUG #1 ♡', pop01(t, P.t0 + 0.5, 0.3, 2.2), back > 0.3 ? STEEL : PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Loyal back? | *That’s the real gift.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 940, 200 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false })
      bits(x, 'SHIELD', 800, 690, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      L(x, 800, 1130, 'ALWAYS GOT YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 620, 780, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'They’ll say “it was nothing.” | *Let them.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'it was nothing.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 920, '(it was everything)', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0753', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to thank | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Thank them softly. | *They feel it.*', mood: 'sparkle' },
  lesson: { text: 'Quiet thanks | *land the deepest.*', chip: 'GRATITUDE: RECEIVED' },
  last: {
    text: 'They’ll act cool. | *They kept the note.*',
    draw(x, t, lt) {
      note(x, 790, 1080, pop01(t, t - lt + 0.8, 0.35, 2), { rot: 0.07 })
      hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
