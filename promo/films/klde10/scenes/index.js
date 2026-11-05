// klde10: ZODIAC LIE DETECTOR, "Ten Questions, Zero Secrets" (60 s vertical, star_talk post, synthwave · Cm). Long.
// Engine: ../../klde01/ldkit.js. No end card, no card cut. Hard cut on the last line.
//   0–1.34   frame 0: ♏ Scorpio mid-glare, sunglasses flying off, needle off the chart · "“I have *no* secrets.”"
//            → record scratch + freeze.  1.5 promise: "10 questions. | *Wait* for the verdict."
//   ch.1 WARM-UP (Q1–3) · ch.2 THE CRUSH (Q4–7, a cutaway to the notes app at Q5) · ch.3 THE BIG ONE (Q8–10, a
//   cutaway to the puppy video at Q8) · ch.4 THE VERDICT: "Mostly lies. One huge truth." → "The only honest answer | was *yes.*"
//   The needle and the alarm get louder with every lie; a LIES · TRUTHS counter runs on the machine; Q n/10 top right.
import { makeLD, longQs } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, inSprite, shadesCells, tearsCells, GOLD, INK, RED, INTER, MONO, pop01 } from '../../klde01/m23kit.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function notesApp(x, t, S) {
  wall(x, '#160e26', '#20163a')
  box(x, 250, 400, 580, 980, '#2a2148', { b: 10 }); R(x, '#fff8e0', 274, 450, 532, 880)
  label(x, 'notes', 540, 500, { size: 40, col: INK, font: INTER, weight: 800 })
  const L = ['THEM:', '· oat latte, extra hot', '· dog: Biscuit (bday: May)', '· hates cilantro', '· laughs at bad puns', '· (I am not into them)']
  L.forEach((l, i) => { if (S.u > 0.1 + i * 0.3) label(x, l, 300, 590 + i * 80, { size: i ? 32 : 36, col: i === 5 ? RED : INK, align: 'left', font: i ? MONO : INTER, weight: 800, maxW: 490 }) })
  S.hero(x, t, { x: 170, y: 1450, s: 230, mood: 'squint', look: [1, -1] })
}
function puppyVideo(x, t, S) {
  wall(x, '#0e0a1c', '#160f2a')
  // under a blanket, a glowing phone, a tiny puppy on screen
  box(x, 300, 520, 480, 600, '#2a2148', { b: 10 }); R(x, '#cfeaff', 322, 560, 436, 520)
  const hop = 12 * Math.abs(Math.sin(t * 6))
  drawBits(x, ['..BB....BB..', '.BBBB..BBBB.', '.BBBBBBBBBB.', 'BBWBBBBBBWBB', 'BBKBBBBBBKBB', 'BBBBBNNBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..', '..BB....BB..'], { B: '#d9a46a', W: '#ffffff', K: INK, N: '#3a2020' }, 540, 820 - hop, 26)
  label(x, 'puppy sees snow for the first time', 540, 1030, { size: 22, col: INK, maxW: 410 })
  const F = S.hero(x, t, { x: 540, y: 1330, s: 300, mood: 'sparkle', look: [0, -1] })
  inSprite(x, F, () => tearsCells(x, t, 2))
  box(x, 120, 1380, 840, 260, '#5a3a7a', { b: 10, hi: '#6e4a90' })
}
const { qs, end } = longQs([
  { q: 'favourite *colour?*', a: 'black.', v: 'truth', m: ['neutral', 'squint'] },
  { q: 'do you leave people *on read?*', a: 'never.', v: 'lie', m: ['squint', 'wide'] },
  { q: 'mysterious *on purpose?*', a: '…', v: 'squeak', m: ['squint', 'eyeroll'] },
  { q: 'got a *crush?*', a: 'no.', v: 'lie', m: ['squint', 'wide'] },
  { q: 'know their *coffee order?*', a: 'everyone knows that.', v: 'lie', flash: { label: 'THE TRUTH: | *it’s in the notes.*', draw: notesApp } },
  { q: 'practised saying *hi?*', a: 'once.', v: 'lie' },
  { q: '…in the *mirror?*', a: '…five times.', v: 'truth', m: ['squint', 'happy'] },
  { q: 'cried at a *puppy video?*', a: 'no.', v: 'lie', flash: { label: 'THE TRUTH: | *last night.*', draw: puppyVideo } },
  { q: 'would you *text first?*', a: 'maybe.', v: 'truth', m: ['squint', 'happy'] },
  { q: 'do you *like* them?', a: '…yes.', v: 'truth', m: ['neutral', 'heart'] },
])
const V = end + 1.4
const EP = makeLD({
  id: 'klde10', sign: 'scorpio', len: 60, ending: 'cut', music: { style: 'synthwave', key: 'Cm', seed: 2310 },
  hook: '“I have *no* secrets.”',
  qs,
  long: {
    promise: '10 questions. | *Wait* for the verdict.', promiseOut: 4.05,
    chapters: [{ t: qs[0].t - 0.2, text: 'WARM-UP' }, { t: qs[3].t - 0.2, text: 'THE CRUSH' }, { t: qs[7].t - 0.2, text: 'THE BIG ONE' }, { t: V - 1.2, text: 'THE VERDICT', dur: 1.4 }],
    verdict: 'Mostly lies. One huge truth.', verdictAt: V, verdictOut: 57.6,
  },
  pisLine: { t: end - 1.2, text: '*SOB* they said YES', end: V - 0.2 },
  last: { t: 57.8, text: 'The only honest answer | was *yes.*', size: 86, mood: 'heart' },
  prop(x, t, S) {
    if (!S.F) return
    if (S.chaos) { drawBits(x, ['KKK.KKK', 'KWK.KWK', 'KKKKKKK'], { K: '#2b2140', W: '#ffffff' }, S.F.ox + 160 + 40 * Math.sin(t * 9), S.F.oy - S.F.base - 140 - 30 * t, 14, { rot: t * 7 }); return }
    inSprite(x, S.F, () => shadesCells(x, 1))
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [bubble, GOLD, pop01]
