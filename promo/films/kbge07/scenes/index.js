// kbge07: BIO GLOW-UP, "idk what to put here lol" (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Libra's bio, a loading bar stuck at 50% "deciding…" jittering over the card; hook "Libra *still* | hasn’t decided."
//   0.35  record scratch + freeze: "it’s been *three weeks.*" · 1.35 circle "idk" → PICK ONE · THE STARS: "pick one *true* thing."
//   2.75  strike · 3.2 the glow-up: "I will tell you which mug is the *best mug.* With reasons." · a mug pops in the photo
//   glow: Pisces cries at the mug · 7.5 last line · 8.55–9 loop back into frame 0.
import { makeBio, R, INK, GOLD, BONE, MONO, popIcon, outK } from '../../kbge01/biokit.js'
function stuck(x, t, S) {
  const k = outK(t, [S.T.circle - 0.3, S.T.circle])
  if (k <= 0.01) return
  const y = 1000, w = 600, j = Math.sin(t * 40) * 3
  x.save(); x.globalAlpha *= k; x.translate(540 + j, y)
  R(x, INK, -w / 2 - 14, -64, w + 28, 128); R(x, 'rgba(16,9,38,0.95)', -w / 2 - 8, -58, w + 16, 116); R(x, GOLD, -w / 2 - 8, -58, w + 16, 4)
  x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText('deciding…', -w / 2 + 10, -26); x.textAlign = 'right'; x.fillStyle = GOLD; x.fillText('50%', w / 2 - 10, -26)
  R(x, '#2a1f55', -w / 2 + 10, 6, w - 20, 34); R(x, GOLD, -w / 2 + 14, 10, (w - 28) * 0.5, 26)
  x.restore()
}
const EP = makeBio({
  id: 'kbge07', sign: 'libra', name: 'Libra', age: 26, D: 9,
  hook: 'Libra *still* | hasn’t decided.', hookColor: '#ffb3d1',
  bad: 'idk what to put here lol',
  circle: { word: 'idk', label: 'PICK ONE' },
  says: [{ t: 1.9, text: 'pick one *true* thing.' }],
  good: 'I will tell you which mug is the *best mug.* With reasons.',
  fx: 'scratch', fxOpts: { caption: 'it’s been *three weeks.*' }, cps: 30, end: 'loop',
  T: { strike: [2.75, 3.05], swap: 3.2 },
  over: stuck,
  photo: (x, t, S) => popIcon(x, t, 'MUG', S.PHOTO.x + 560, S.PHOTO.y + 250, 12, S.T.glow - 0.15),
  last: 'Undecided is fine. | *Unknown* isn’t.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
