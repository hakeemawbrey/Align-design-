// kbge10: BIO GLOW-UP, "The bio is a résumé" (11 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Capricorn's profile, a big HIRING stamp mid-slam onto the card; hook "Capricorn, you’re | not *hiring.*"
//   0.35  screen shake · 1.35 circle "Available Sundays 2–3." → CALENDAR INVITE · 1.9 THE STARS · 2.75 strike, the stamp peels off
//   3.5   the glow-up: "Works hard, naps harder on Sundays. Be my reason to *log off.*" · glow: Pisces sobs on the stamp pad
//   a message · 9.5 last line. Hard cut.
import { makeBio, signStar, stamp, prog, ease } from '../../kbge01/biokit.js'
const AQU = signStar('aquarius')
const EP = makeBio({
  id: 'kbge10', sign: 'capricorn', name: 'Capricorn', age: 33, D: 11,
  hook: 'Capricorn, you’re | not *hiring.*', hookColor: '#c9b48a',
  bad: 'Driven. Goal-oriented. Available Sundays 2–3.',
  circle: { word: 'Sundays 2–3.', label: 'CALENDAR INVITE' },
  says: [{ t: 1.9, text: 'is this a *date* or an interview?' }],
  good: 'Works hard, naps harder on Sundays. Be my reason to *log off.*',
  fx: 'shake', fxOpts: { at: 0.1, amp: 26 }, cps: 30,
  T: { fx: 0.1 },
  reply: { body: 'applying for the *nap* position', glyph: AQU.glyph, color: AQU.color },
  over: (x, t, S) => {
    const off = ease.inCubic(prog(t, S.T.strike[0], S.T.strike[0] + 0.4))
    if (off >= 1) return
    x.save(); x.globalAlpha *= 1 - off; x.translate(off * 500, -off * 200)
    stamp(x, t, S.PHOTO.x + S.PHOTO.w / 2, S.PHOTO.y + 200, -0.06, 'HIRING', { size: 92, col: '#d23a3a', rot: -0.16 })
    x.restore()
  },
  last: 'You’re not *hiring.* | You’re dating.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
