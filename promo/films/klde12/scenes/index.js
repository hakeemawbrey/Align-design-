// klde12: ZODIAC LIE DETECTOR, "I Won't Cry This Time" (60 s vertical, star_talk post, dreamy · Eb). Long. Loops.
// Engine: ../../klde01/ldkit.js. No end card, no card cut. ♓ Pisces is in the chair (crying through every answer);
// ♍ Virgo runs the machine with the tissue box.
//   frame 0: Pisces mid-sob, tears arcing, needle off the chart · "“I *won’t* cry this time.”"
//   promise "10 questions. Ten tissues. | The *ending,* though." · ch.1 WARM-UP (Q1–3) · ch.2 THE CRUSH (Q4–6,
//   cutaway: a nine-page poem) · ch.3 THE BIG ONE (Q7–10, cutaway: a friend's good news; the machine itself tears up
//   at Q8; Virgo lies at Q9) · ch.4 THE VERDICT: "All tears. All honest." → "Big feelings aren’t lies. | *Just* wet."
import { makeLD, longQs } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, inSprite, tearsCells, GOLD, INK, RED, INTER, MONO, TEAR } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function poem(x, t, S) {
  wall(x, '#1a1634', '#24204a')
  for (let i = 0; i < 9; i++) { const k = S.u > 0.1 + i * 0.15 ? 1 : 0; if (!k) continue; box(x, 160 + i * 52, 420 + i * 40, 420, 560, '#f4ecd8', { b: 6 }); label(x, `p.${i + 1}`, 520 + i * 52, 950 + i * 40, { size: 22, col: '#7a6040' }) }
  const L = ['Ode to Your Smile', 'your smile is a sunrise', 'your laugh is a sunrise too', 'everything is sunrises', '(cont. on page 2)']
  L.forEach((l, i) => label(x, l, 600, 820 + i * 56, { size: i ? 26 : 32, col: INK, align: 'left', font: i ? MONO : INTER, weight: 800, maxW: 380 }))
  const F = S.pis(x, t, { x: 230, y: 1380, s: 250, mood: 'sparkle', look: [1, -1], tears: 3 })
  void F
}
function goodNews(x, t, S) {
  wall(x, '#1e2440', '#28305a')
  const F = signStar('cancer')
  drawStarChar(x, 700, 900, 300, t, { ...F, mood: 'happy', look: [-1, 0], seed: 4, hops: [S.f.at + 0.3, S.f.at + 0.8, S.f.at + 1.3] })
  box(x, 560, 560, 300, 120, '#ffffff', { b: 7 }); label(x, 'I GOT THE JOB!', 710, 620, { size: 38, col: INK, font: INTER, weight: 800 })
  S.pis(x, t, { x: 320, y: 980, s: 280, mood: 'happy', look: [1, 0], tears: 3, hops: [S.f.at + 0.5, S.f.at + 1.0, S.f.at + 1.5] })
  label(x, '*happy sobbing*', 320, 1250, { size: 40, col: '#cfeeff', font: INTER, weight: 800 })
}
const { qs, end } = longQs([
  { q: 'will you *cry* today?', a: 'no.', v: 'lie', m: ['sparkle', 'wide'] },
  { q: 'cried at an *ad* this week?', a: 'it had a puppy.', v: 'truth', m: ['wide', 'happy'] },
  { q: 'do you name your *plants?*', a: 'only the sad ones.', v: 'truth', m: ['sparkle', 'happy'] },
  { q: 'over your *crush?*', a: 'yes.', v: 'lie', m: ['sparkle', 'wide'] },
  { q: 'wrote them a *poem?*', a: 'a short one.', v: 'lie', flash: { label: 'THE TRUTH: | *nine pages.*', draw: poem } },
  { q: 'read it to the *mirror?*', a: '…and cried.', v: 'truth', m: ['wide', 'happy'] },
  { q: 'cried at a friend’s *good news?*', a: 'happy crying counts!', v: 'truth', m: ['sparkle', 'happy'], flash: { label: 'THE TRUTH: | *every time.*', draw: goodNews } },
  { q: 'wait. is the *machine* crying?', a: 'it’s been a long day for it.', v: 'squeak', m: ['wide', 'sparkle'] },
  { q: 'Virgo… are *you* crying?', a: '…no.', v: 'lie', ax: 820, ay: 840 },
  { q: 'are you *okay?*', a: 'I’m happy. happy tears.', v: 'truth', m: ['wide', 'happy'] },
])
const V = end + 1.3
const Q8 = qs[7], Q9 = qs[8]
const EP = makeLD({
  id: 'klde12', sign: 'pisces', operator: 'virgo', len: 60, ending: 'loop', music: { style: 'dreamy', key: 'Eb', seed: 2312 },
  hook: '“I *won’t* cry | this time.”',
  qs,
  long: {
    promise: '10 questions. Ten tissues. | The *ending,* though.', promiseOut: 4.05,
    chapters: [{ t: qs[0].t - 0.2, text: 'WARM-UP' }, { t: qs[3].t - 0.2, text: 'THE CRUSH' }, { t: qs[6].t - 0.2, text: 'THE BIG ONE' }, { t: V - 1.2, text: 'THE VERDICT', dur: 1.4 }],
    verdict: 'All tears. All honest.', verdictAt: V, verdictOut: 56.4,
  },
  last: { t: 56.6, text: 'Big feelings aren’t lies. | *Just* wet.', size: 84, mood: 'happy' },
  subTears: t => (t < 1.4 || t > 56.6 ? 3 : 2),
  opTears: t => (t > Q9.vt ? 1 : 0),
  opMood: t => (t > Q9.at && t < Q9.vt + 1.2 ? { mood: 'squint', look: [-1, 0] } : null),
  extra(x, t) {
    // the machine tears up at Q8: drips from the paper
    if (t > Q8.at && t < Q9.t) for (let i = 0; i < 6; i++) { const p = ((t * 0.9 + i / 6) % 1); R(x, INK, 160 + i * 110 - 2, 1400 + p * 160 - 2, 14, 22); R(x, TEAR, 160 + i * 110, 1400 + p * 160, 10, 18) }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [drawBits, inSprite, tearsCells, GOLD, RED]
