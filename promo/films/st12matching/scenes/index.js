// st12matching (15 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E13) · story 0–10.6, then the end card.
//   🔥 HOT TAKE: "Matching outfits are *cute*, actually." (heat 2). ♎ LIBRA (pro) in a pink pom-pom beanie, holding
//   out a second one, vs ♏ SCORPIO in an all-black beanie and scarf, horrified. At the last line Scorpio is wearing
//   the pink one. THE STARS RULE: do what makes you both smile; cringe is a choice.
//   Last line (Libra): "Be *cute*. Who's stopping you?"
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { bitmap, drawPixelHeart } from './props.js'
import { makeEpisode, INK, BONE, r3 } from './hotkit.js'

const LIB = signStar('libra'), SCO = signStar('scorpio')
const PINK = { O: INK, B: '#ff8fc8', H: '#ffc2e0', P: '#ffffff', D: '#e0609e' }
const BLACK = { O: '#000000', B: '#1d1726', H: '#3a3148', P: '#2d2538', D: '#120e18' }
const HAT = [
  '.......PPP.......',
  '......PPPPP......',
  '.......PPP.......',
  '....OOOOOOOOO....',
  '..OOBBBHBBBBBOO..',
  '.OBBBHBBBBBBBBBO.',
  'OBBBBBBBBBBBBBBBO',
  'ODDDDDDDDDDDDDDDO',
  'ODHDDHDDHDDHDDHDO',
  'OOOOOOOOOOOOOOOOO',
]
function hat(x, cx, top, px, pal, rot = 0) {
  x.save(); x.translate(cx, top); x.rotate(rot)
  bitmap(x, HAT, pal, -8.5 * px, -7.4 * px, px)
  x.restore()
}
function scarf(x, r, px) {
  const y = r.y + 13 * px, cx = r.x
  x.fillStyle = '#000'; x.fillRect(cx - 15 * px, y - px, 30 * px, 6 * px)
  x.fillStyle = '#1d1726'; x.fillRect(cx - 14 * px, y, 28 * px, 4 * px)
  x.fillStyle = '#000'; x.fillRect(cx + 5 * px, y + 3 * px, 6 * px, 12 * px)
  x.fillStyle = '#1d1726'; x.fillRect(cx + 6 * px, y + 4 * px, 4 * px, 10 * px)
}

const EP = makeEpisode({
  id: 'st12matching', numeral: 'S12 E13', duration: 15, key: 'A',
  take: 'Matching outfits are *cute*, actually.', takeAccent: '#ffb3e6', heat: 2,
  pro: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, accent: '#ffb3e6', pitch: 880,
    prop(x, r, t, T) {
      hat(x, r.x, r.top + 34, 8, PINK, -0.08)
      // the second beanie, held out toward Scorpio until it lands on their head at the last line
      const p = ease.inOutQuad(prog(t, T.last - 0.7, T.last - 0.15))
      if (p < 1) {
        const hx = lerp(r.x + 150, 794, p), hy = lerp(r.y + 30, r.top + 34, p) - Math.sin(Math.PI * p) * 120
        hat(x, hx, hy, 6 + 2 * p, PINK, 0.2 - 0.28 * p + Math.sin(t * 4) * 0.05 * (1 - p))
      }
    } },
  con: { tag: '♏ SCORPIO', color: SCO.color, glyph: SCO.glyph, accent: '#ff7d9a', pitch: 330,
    prop(x, r, t, T) {
      void scarf
      if (t < T.last - 0.15) hat(x, r.x, r.top + 34, 8, BLACK, 0.06)
      else { hat(x, r.x, r.top + 34, 8, PINK, 0.06); drawPixelHeart(x, r.x + 140, r.top + 10 - (t - T.last) * 40, 6) }
    } },
  lines: [
    ['con', 'i wear *black.* only. respectfully, no.'],
    ['pro', 'it’s one *beanie.* we’d look so cute.'],
  ],
  verdict: 'do what makes you both smile. cringe is a choice.',
  last: 'Be *cute*. | Who’s stopping you?', lastWho: 'pro',
  moods(ph, t, T) {
    if (ph === 'take') return [{ mood: 'sparkle', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 1) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 1] }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'eyeroll' }]
    return [{ mood: 'heart', look: [1, 0] }, { mood: t >= T.last + 0.3 ? 'happy' : 'wide', look: [-1, 0], blush: 0.85 }]
  },
  cues: T => [
    ['whoosh', r3(T.last - 0.7), 0.5, 0.03], ['pop', r3(T.last - 0.15), 1318.51, 0.05, 0.4],
  ],
})
void BONE; void clamp

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
