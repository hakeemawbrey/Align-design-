// klde11: ZODIAC LIE DETECTOR, "Doesn't Care What People Think" (60 s vertical, star_talk post, pop · C). Long.
// Engine: ../../klde01/ldkit.js. No end card, no card cut. Hard cut on the last line.
//   frame 0: ♌ Leo mid-pose, a hand mirror flying, needle off the chart · "“I *don’t* care what people think.”"
//   promise "10 questions. | The *verdict,* though." · ch.1 WARM-UP (Q1–3, cutaway: seven outfits on the bed) ·
//   ch.2 THE COMPLIMENTS (Q4–6) · ch.3 THE BIG ONE (Q7–10, cutaway: pacing before the date) · ch.4 THE VERDICT:
//   "Cares a lot. Says it now." → "Caring isn’t a crime. | *Case closed.*"
import { makeLD, longQs } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, inSprite, tearsCells, GOLD, INK, RED, INTER, MONO } from '../../klde01/m23kit.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
const SHIRT = ['SS..SS', 'SSSSSS', '.SSSS.', '.SSSS.', '.SSSS.']
function outfits(x, t, S) {
  wall(x, '#2a1a2a', '#3a2438')
  box(x, 90, 1000, 900, 140, '#e9e2f5', { b: 8 }); box(x, 90, 1130, 900, 60, '#c64a6a', { b: 8 })
  const cols = ['#ff7a3a', '#f2c75c', '#ff5c8a', '#7fd0ff', '#9fe6b0', '#c9a6ff', '#ffffff']
  cols.forEach((c, i) => { if (S.u > 0.1 + i * 0.22) drawBits(x, SHIRT, { S: c }, 160 + i * 125, 960 + (i % 2) * 30, 18, { rot: (i % 3 - 1) * 0.3 }) })
  if (S.u > 1.7) label(x, 'OUTFIT 7 OF 7', 540, 860, { size: 44, col: GOLD, font: INTER, weight: 800 })
  S.hero(x, t, { x: 540, y: 600, s: 280, mood: 'squint', look: [0, 1] })
}
function pacing(x, t, S) {
  wall(x, '#1a1830', '#24223e')
  box(x, 700, 420, 260, 700, '#7a5038', { b: 10 }); R(x, GOLD, 740, 760, 22, 22)
  label(x, 'DATE: 7:00', 830, 380, { size: 34, col: GOLD })
  const px = 380 + 220 * Math.sin(S.u * 2.6)
  const F = S.hero(x, t, { x: px, y: 1000, s: 280, mood: 'wide', look: [Math.cos(S.u * 2.6) > 0 ? 1 : -1, 0], hops: [S.f.at + 0.3, S.f.at + 0.9, S.f.at + 1.5, S.f.at + 2.1] })
  for (let i = 0; i < 3; i++) R(x, '#8fe3ff', F.ox + 90 + i * 14, F.oy - 300 + ((t * 300 + i * 40) % 120), 8, 14)
  label(x, '“just be cool. be COOL.”', 540, 1300, { size: 40, col: '#ffe9a8', font: INTER, weight: 800 })
}
const { qs, end } = longQs([
  { q: 'checked your *reflection* today?', a: 'once.', v: 'lie', m: ['sparkle', 'wide'] },
  { q: '…in a *spoon?*', a: '…it was shiny.', v: 'truth', m: ['squint', 'happy'] },
  { q: 'outfit changes *tonight?*', a: 'one.', v: 'lie', flash: { label: 'THE TRUTH: | *seven.*', draw: outfits } },
  { q: 'do you need *compliments?*', a: 'nope.', v: 'lie', m: ['sparkle', 'wide'] },
  { q: 'counted today’s *compliments?*', a: 'four. not that I counted.', v: 'truth', m: ['squint', 'happy'] },
  { q: 'care if your date *likes you?*', a: 'not really.', v: 'lie' },
  { q: 'rehearsed your *laugh?*', a: '…it’s a good laugh.', v: 'truth', m: ['squint', 'happy'] },
  { q: '*nervous?*', a: 'Leos don’t get nervous.', v: 'lie', m: ['sparkle', 'wide'], flash: { label: 'THE TRUTH: | *pacing.*', draw: pacing } },
  { q: 'want them to have *fun?*', a: 'more than anything.', v: 'truth', m: ['happy', 'sparkle'] },
  { q: 'do you care what *they* think?', a: '…yeah. a lot.', v: 'truth', m: ['neutral', 'heart'] },
])
const V = end + 1.4
const EP = makeLD({
  id: 'klde11', sign: 'leo', len: 60, ending: 'cut', music: { style: 'pop', key: 'C', seed: 2311 },
  hook: '“I *don’t* care what | people think.”',
  qs,
  long: {
    promise: '10 questions. | The *verdict,* though.', promiseOut: 4.05,
    chapters: [{ t: qs[0].t - 0.2, text: 'WARM-UP' }, { t: qs[3].t - 0.2, text: 'THE COMPLIMENTS' }, { t: qs[6].t - 0.2, text: 'THE BIG ONE' }, { t: V - 1.2, text: 'THE VERDICT', dur: 1.4 }],
    verdict: 'Cares a lot. Says it now.', verdictAt: V, verdictOut: 57.6,
  },
  pisLine: { t: end - 1.2, text: '*sob* that’s so sweet', end: V - 0.2 },
  last: { t: 57.8, text: 'Caring isn’t a crime. | *Case closed.*', size: 86, mood: 'sparkle' },
  prop(x, t, S) {
    if (!S.F || !S.chaos) return
    const cx = S.F.ox + 170 + 50 * Math.sin(t * 8), cy = S.F.oy - S.F.base - 150 - 40 * t
    x.save(); x.translate(cx, cy); x.rotate(t * 9); box(x, -34, -44, 68, 88, '#bfe2f2', { b: 7 }); R(x, '#f2c75c', -8, 44, 16, 50); x.restore()
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [inSprite, tearsCells, RED, MONO]
