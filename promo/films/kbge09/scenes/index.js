// kbge09: BIO GLOW-UP, "Probably not in town" (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Sagittarius' profile, a suitcase mid-crash onto the card, a location pin spinning "???" in the photo;
//         hook "Sag’s bio says | *‘probably not here.’*"   0.35 whip zoom · 1.35 circle "not in town" → WHERE?
//   2.75  strike, the suitcase flies off · 3.2 the glow-up: "Home *Tuesdays.* Bring me your city's best noodles."
//   glow: the pin lands, noodles pop in, Pisces cries · 7.5 last line. Hard cut.
import { makeBio, signStar, thrown, popIcon, icon, tag, prog, ease } from '../../kbge01/biokit.js'
const VIR = signStar('virgo')
const EP = makeBio({
  id: 'kbge09', sign: 'sagittarius', name: 'Sagittarius', age: 27, D: 9,
  hook: 'Sag’s bio says | *‘probably not here.’*', hookColor: '#ff9a6a', hookSize: 92,
  bad: 'Probably not in town lol.',
  circle: { word: 'not in town', label: 'WHERE?' },
  good: 'Home *Tuesdays.* Bring me your city’s best noodles.',
  fx: 'whip', shake0: 8, cps: 30,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'Tuesday. I know *the* noodle place.', glyph: VIR.glyph, color: VIR.color },
  over: (x, t, S) => thrown(x, t, [{ name: 'SUITCASE', x: 790, y: 1060, cell: 12, at: 0.05, rot: -0.15, from: [500, -600] }], [S.T.strike[0], S.T.strike[0] + 0.5]),
  photo: (x, t, S) => {
    const land = ease.outBack(prog(t, S.T.glow - 0.3, S.T.glow + 0.1))
    const spin = t < S.T.glow - 0.3 ? t * 8 : 0
    const px = S.PHOTO.x + 140, py = S.PHOTO.y + 110 + land * 110
    icon(x, 'PIN', px, py, 11, { rot: Math.sin(spin) * 0.6 })
    if (t < S.T.glow - 0.3) tag(x, t, px + 10, py - 80, -1, '???', { col: '#5a4a8a', size: 26 })
    popIcon(x, t, 'NOODLES', S.PHOTO.x + 580, S.PHOTO.y + 260, 11, S.T.glow)
  },
  last: 'Say where you’ll | *actually* be.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
