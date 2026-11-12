// r2t0691: star_talk, SOLO (scorpio), "Scorpios on their birthday | *be like.*" (signs3kit social cut, music: lofi · C).
// Nine birthday situations, each the most extreme Scorpio version. Ending: group.
//   knew about the surprise party since March · guessed the gift by looking at you · the wish is classified
//   · the cake: dark, darker · three guests, all vetted · the late birthday text, noted · birthday post: one black photo
//   · checked the birth chart for omens · a birthday match, fully investigated
//   group "Another year. | *Still a mystery.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff5a7a', S = 'scorpio', ST = { x: -190 }

// a dark birthday cake with one candle
const CAKE = ['.....Y.....', '.....O.....', '.....W.....', '.KKKKKKKKK.', 'KDDDDDDDDDK', 'KDPDDPDDPDK', 'KDDDDDDDDDK', 'KCCCCCCCCCK', 'KDDDDDDDDDK', 'KDDDDDDDDDK', '.KKKKKKKKK.']
const CAKE_C = { Y: GOLD, O: '#ff8a3a', W: CREAM, K: INK, D: '#2a1a1a', P: '#5a2a3a', C: '#7a4a3a' }
// a black square photo
function blackPost(x, t, cx, cy, k, lt) {
  phone(x, t, cx, cy, k, { head: 'MY BIRTHDAY ✦', headCol: ACC, lines: [] })
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = '#000'; x.fillRect(-96, -96, 192, 192)
  x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 3; x.strokeRect(-96, -96, 192, 192)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('caption: .', -96, 128)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Knew about the party. | Since *March.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'PARTY INTEL', headBg: INK, headInk: ACC, lines: ['guests: 14', 'cake: lemon', 'hiding: kitchen'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1080, 'ACT SURPRISED', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'Guessed the gift | *by looking at you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'it’s a scarf.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1100, '100% CORRECT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Blew out the candle. | Wish is *classified.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'TOP SECRET', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.06, 40)
      sparkles(x, t, 800, 760, P.t0 + 1.0, 6, 130, 0.4)
    } },
  { sign: S, cap: 'The cake? | Dark. *Darker.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03 })
      L(x, 800, 1100, 'FLAVOUR: THE VOID', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Guest list: three. | All *vetted.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'GUEST LIST', headBg: ACC, headInk: INK, lines: ['1. mom ✓', '2. best friend ✓', '3. the cat ✓'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1080, 'CLEARANCE: GRANTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Your text came late. | *Noted.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TEXTS', headCol: ACC, lines: [['hbd!!', MINT, pop01(t, P.t0 + 0.6, 0.25, 2)], ['sent 11:59 pm', STEEL, pop01(t, P.t0 + 0.9, 0.25, 2)]] })
      L(x, 800, 1090, 'FILED. FOREVER.', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: S, cap: 'Birthday post? | One photo. *All black.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      blackPost(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 610, 'it’s art.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Checked their birth chart | for *omens.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 610, 'pluto says yes', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1070, 'OMEN: CAKE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Got a birthday match? | *Investigated first.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: PINK, lines: [['hey! hbd :)', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['sign?', ACC, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['moon?', ACC, pop01(t, P.t0 + 1.1, 0.25, 2), true], ['rising?', ACC, pop01(t, P.t0 + 1.3, 0.25, 2), true]] })
      bits(x, 'LENS', 640, 1060, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.2 })
      L(x, 820, 1100, 'APPROVED', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, 0.05, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0691', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Scorpios on their | birthday *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Another year. | *Still a mystery.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
