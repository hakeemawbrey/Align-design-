// kbge08: BIO GLOW-UP, "You'll never figure me out" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Scorpio's profile half in shadow, fog mid-puff over the card, a padlock on the photo; hook "Scorpio, the bio | is *a locked door.*"
//   0.35  sudden silence + freeze: "*shh.*" · 1.35 circle "never figure me out." → LOCKED · 2.75 strike, the lock turns into a key
//   3.5   the glow-up: "Takes a minute to open up. *Worth the minute.*" · glow: the fog clears, Pisces sobs · 8.5 last line. Hard cut.
import { makeBio, signStar, popIcon, prog, ease } from '../../kbge01/biokit.js'
const CAN = signStar('cancer')
function fog(x, t, S) {
  const k = 1 - ease.inOutCubic(prog(t, S.T.swap, S.T.glow + 0.3))
  if (k <= 0.01) return
  x.save()
  const g = x.createLinearGradient(S.CARD.x, 0, S.CARD.x + S.CARD.w, 0); g.addColorStop(0, `rgba(10,6,24,${0.55 * k})`); g.addColorStop(0.5, `rgba(10,6,24,${0.15 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
  x.fillStyle = g; x.fillRect(S.CARD.x, S.CARD.y, S.CARD.w, S.CARD.h)
  for (let i = 0; i < 9; i++) {
    const px = S.CARD.x + (((i * 173 + t * 60 * (i % 2 ? 1 : -1)) % (S.CARD.w + 200)) + S.CARD.w + 200) % (S.CARD.w + 200) - 100, py = S.CARD.y + 380 + (i * 97) % 520, r = 90 + (i % 3) * 40
    const fg = x.createRadialGradient(px, py, 0, px, py, r); fg.addColorStop(0, `rgba(210,200,235,${0.35 * k})`); fg.addColorStop(1, 'rgba(210,200,235,0)')
    x.fillStyle = fg; x.fillRect(px - r, py - r, r * 2, r * 2)
  }
  x.restore()
}
const EP = makeBio({
  id: 'kbge08', sign: 'scorpio', name: 'Scorpio', age: 30, D: 10,
  hook: 'Scorpio, the bio | is *a locked door.*', hookColor: '#d18bff',
  bad: 'You’ll never figure me out.',
  circle: { word: 'never figure me out.', label: 'LOCKED' },
  says: [{ t: 1.9, text: 'so how would anyone *get in?*' }],
  good: 'Takes a minute to open up. *Worth the minute.*',
  fx: 'silence', fxOpts: { caption: '*shh.*' }, cps: 26,
  reply: { body: 'I have a minute. I have *lots* of minutes.', glyph: CAN.glyph, color: CAN.color },
  photo: (x, t, S) => { popIcon(x, t, 'LOCK', S.PHOTO.x + 590, S.PHOTO.y + 250, 11, -1, S.T.strike[1]); popIcon(x, t, 'KEY', S.PHOTO.x + 590, S.PHOTO.y + 250, 12, S.T.strike[1] + 0.15) },
  over: fog,
  last: 'Mystery is cute. | *Warmth* is cuter.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
