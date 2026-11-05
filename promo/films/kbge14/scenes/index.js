// kbge14: BIO GLOW-UP, "The list of no's" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Taurus' bio under a rain of red NO stamps, mid-fall onto the card; hook "Taurus wrote a | list of *NOs.*"
//   0.35  screen shake · 1.35 circle "No games." → ALL NO · 1.9 THE STARS · 2.75 strike, every NO flips to a green YES
//   3.5   the glow-up: "Yes to slow mornings, long walks and *the good butter.*" · Pisces cries "yes!!" · 8.5 last line. Hard cut.
import { makeBio, signStar, word, prog, ease, lerp } from '../../kbge01/biokit.js'
const LIB = signStar('libra')
const NOS = [[230, 560, -0.2, 0.0], [860, 520, 0.25, -0.15], [300, 830, 0.15, -0.05], [800, 860, -0.3, -0.25], [560, 470, 0.1, 0.1], [105, 1395, -0.1, -0.3], [975, 1385, 0.2, 0.05]]
function stamps(x, t, S) {
  NOS.forEach(([px, py, r, at], i) => {
    const fall = ease.inQuad(prog(t, at - 0.35, at)), cy = lerp(py - 700, py, fall)
    if (t < at - 0.35) return
    const flip = prog(t, S.T.strike[0] + i * 0.06, S.T.strike[0] + i * 0.06 + 0.18)
    const sc = Math.abs(Math.cos(Math.PI * flip))
    const yes = flip > 0.5
    x.save(); x.translate(px, cy); x.scale(1, Math.max(0.05, sc)); word(x, yes ? 'YES' : 'NO', 0, 0, 54, yes ? '#22a05f' : '#d23a3a', r, 0.9); x.restore()
  })
}
const EP = makeBio({
  id: 'kbge14', sign: 'taurus', name: 'Taurus', age: 32, D: 10,
  hook: 'Taurus wrote a | list of *NOs.*', hookColor: '#ff6a6a',
  bad: 'No games. No flakes. No late replies. No…',
  circle: { word: 'No games.', label: 'ALL NO' },
  says: [{ t: 1.9, text: 'ok, but what’s a *yes?*' }],
  good: 'Yes to slow mornings, long walks and *the good butter.*',
  fx: 'shake', cps: 28,
  reply: { body: 'yes to *the good butter.* obviously.', glyph: LIB.glyph, color: LIB.color },
  top: stamps,
  last: 'Turn every *no* | into a *yes.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
