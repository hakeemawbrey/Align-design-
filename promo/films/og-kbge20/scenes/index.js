// og-kbge20: social rework of kbge20 (static HOOK outline 0–3.0 replaces the slammed hook; no bug, no shakes, no
// white flashes, no loop-back: ends ON the last line; Scorpio always knows). Kit: ../biokit.js (og social copy).
// Was: kbge20: BIO GLOW-UP, "Don't lie to me. I'll know." (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Scorpio's profile under a hard interrogation spotlight, the photo star's eyes narrowed; hook
//         "Scorpio, that bio is | *an interrogation.*"   0.35 colour flash · 1.35 circle "I’ll know." → FEAR, NOT VALUE
//   2.75  strike · 3.5 the glow-up: "Honest, a little intense, very loyal. I ask *real questions.*"
//   glow: the spotlight softens into warm candlelight, Pisces sobs · a message · 8.5 last line. Hard cut.
import { makeBio, signStar, popIcon, prog, ease, lerp } from '../biokit.js'
const CAP = signStar('capricorn')
function light(x, t, S) {
  const w = ease.inOutCubic(prog(t, S.T.swap, S.T.glow + 0.2))
  const { CARD } = S
  x.save(); x.globalCompositeOperation = 'lighter'
  // the hard white cone (fades) → a warm glow
  const a = 0.26 * (1 - w)
  if (a > 0.01) { x.fillStyle = `rgba(255,255,245,${a})`; x.beginPath(); x.moveTo(540, -40); x.lineTo(CARD.x - 30, CARD.y + 520); x.lineTo(CARD.x + CARD.w + 30, CARD.y + 520); x.fill() }
  x.restore()
  if (w < 1) { x.save(); x.fillStyle = `rgba(5,3,14,${0.35 * (1 - w)})`; x.fillRect(0, CARD.y + CARD.h + 8, 1080, 1920); x.restore() }
  void lerp
}
const EP = makeBio({
  id: 'og-kbge20', sign: 'scorpio', name: 'Scorpio', age: 32, D: 10,
  hook: 'Scorpio, that bio is | *an interrogation.*', hookColor: '#d18bff', hookSize: 92,
  bad: 'Don’t lie to me. I’ll know. I always know.',
  circle: { word: 'I’ll know.', label: 'FEAR, NOT VALUE' },
  says: [{ t: 1.9, text: 'ok detective. what do you *want?*' }],
  good: 'Honest, a little intense, very loyal. I ask *real questions.*',
  fx: 'flash', cps: 30,
  reply: { body: 'ask me one. I *love* real questions.', glyph: CAP.glyph, color: CAP.color },
  mood: (t, S) => t >= S.T.glow ? 'happy' : t >= S.T.circle ? 'wide' : 'squint',
  photo: (x, t, S) => popIcon(x, t, 'CANDLE', S.PHOTO.x + 150, S.PHOTO.y + 255, 11, S.T.glow - 0.1),
  over: light,
  last: 'Say what you *value,* | not what you fear.',
})
export const HOOK = 'Your bio sounds like | *an interrogation.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
