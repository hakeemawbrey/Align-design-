// kbge15: BIO GLOW-UP, "Six raccoons in a coat" (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Gemini's profile photo mid-wobble: a tall trench coat with raccoon ears and tails poking out (and Gemini's badge);
//         hook "Funny bio. | But who *are* you?"   0.35 record scratch + freeze: "six of them. *one coat.*"
//   1.35  circle "six raccoons" → AND YOU? · 1.9 THE STARS: "cute. and *you?*" · 2.75 strike (the joke stays in the rewrite)
//   3.2   the glow-up: "Six raccoons in a coat. All six love a *bookshop date.*" · the coat sprouts a heart · Pisces laugh-cries
//   7.5 last line · 8.55–9 loop back into frame 0.
import { makeBio, signStar, drawBits, R, INK, popIcon, prog } from '../../kbge01/biokit.js'
const GEM = signStar('gemini')
const COAT = [
  '..EE....EE..',
  '..EGGGGGGE..',
  '..GWDGGDWG..',
  '..GGGNNGGG..',
  '...CCCCCC...',
  '..CCCBBCCC..',
  '.CCCCBBCCCC.',
  '.CCCCBBCCCC.',
  '.CCC.BB.CCC.',
  '.CCCCBBCCCC.',
  '..CCCBBCCC..',
  '..CCCCCCCC..',
  '..CC....CC..',
  '..DD....DD..',
]
const COLS = { E: '#4a4458', G: '#8c869c', W: '#efe6d6', D: '#1b1236', N: '#2a2438', C: '#b48a52', B: '#8a6236' }
function coat(x, t, S) {
  const { PHOTO } = S
  const cx = PHOTO.x + PHOTO.w / 2, cy = PHOTO.y + PHOTO.h * 0.52
  const wob = 0.09 * Math.sin(t * 7) * (t < S.T.glow ? 1 : 0.4)
  drawBits(x, COAT, COLS, cx, cy, 20, { rot: wob })
  // tails poking out of the coat hem, one per side, swishing
  for (const d of [-1, 1]) drawBits(x, ['GG', 'EG', 'GG', 'EG'], COLS, cx + d * 150, cy + 120 + 10 * Math.sin(t * 5 + d), 12, { rot: d * 0.6 + 0.2 * Math.sin(t * 4) })
  // the Gemini badge
  R(x, INK, cx + 80, cy + 30, 56, 56); R(x, GEM.color, cx + 84, cy + 34, 48, 48)
  x.save(); x.font = "500 40px 'EB Garamond', 'Noto Sans Symbols', serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(GEM.glyph + '︎', cx + 108, cy + 60); x.restore()
  popIcon(x, t, 'HEART', cx - 160, cy - 100, 9, S.T.glow - 0.1)
  void prog
}
const EP = makeBio({
  id: 'kbge15', sign: 'gemini', name: 'Gemini', age: 26, D: 9,
  hook: 'Funny bio. | But who *are* you?', hookColor: '#ffe27a',
  bad: 'I’m six raccoons in a coat.',
  circle: { word: 'six raccoons', label: 'AND YOU?' },
  says: [{ t: 1.9, text: 'cute. and *you?*' }],
  good: 'Six raccoons in a coat. All six love a *bookshop date.*',
  fx: 'scratch', fxOpts: { caption: 'six of them. *one coat.*' }, cps: 30, end: 'loop',
  T: { strike: [2.75, 3.05], swap: 3.2 },
  photoBase: (x, t, S) => { const g = x.createLinearGradient(0, S.PHOTO.y, 0, S.PHOTO.y + S.PHOTO.h); g.addColorStop(0, '#2a1f5a'); g.addColorStop(1, '#4a2f7a'); x.fillStyle = g; x.fillRect(S.PHOTO.x, S.PHOTO.y, S.PHOTO.w, S.PHOTO.h); coat(x, t, S) },
  last: 'One joke, | one *truth.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
