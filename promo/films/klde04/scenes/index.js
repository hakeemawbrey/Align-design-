// klde04: ZODIAC LIE DETECTOR, "I Deleted Our Old Texts" (16 s vertical, star_talk post, dreamy · Ab). Hard cut on the last line.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: deleted the *old chats?*  → every single one. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: do you *miss* them?  → …a little. is that ok? → TRUTH.
//   14.30      last line: Deleted. | *Lovingly* archived.

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#1e1638', '#2a2050')
  // a big folder labelled DO NOT OPEN, open, hugged
  const u = S.u
  box(x, 220, 680, 640, 460, '#f2c75c', { b: 10, hi: '#ffe08a' }); R(x, '#d9a93a', 220, 640, 260, 50); R(x, INK, 214, 634, 272, 6)
  R(x, '#ffffff', 270, 720, 540, 90); label(x, 'DO NOT OPEN', 540, 765, { size: 50, col: RED, font: INTER, weight: 800 })
  label(x, 'last opened: today', 540, 860, { size: 32, col: INK })
  label(x, 'also yesterday', 540, 910, { size: 28, col: '#7a6040' })
  for (let i = 0; i < 6; i++) { const p = ((u * 0.6 + i / 6) % 1); box(x, 300 + i * 80, 1100 - 120 * p, 60, 90, '#e8f0ff', { b: 4 }); R(x, '#9fd0ff', 308 + i * 80, 1110 - 120 * p, 44, 12) }
  S.hero(x, t, { x: 540, y: 1380, s: 290, mood: 'sparkle', look: [0, -1] })
  sparkles(x, t, 540, 900, S.f.at + 0.3, 10, 300, 1)
}

const EP = makeLD({
  id: 'klde04', sign: 'cancer', len: 16, ending: 'cut',
  music: { style: 'dreamy', key: 'Ab', seed: 2304 },
  hook: "“I *deleted* all | our old texts.”",
  qs: [
    { t: 1.4, q: "deleted the *old chats?*", a: "every single one.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *one folder.*", draw: truth } },
    { t: 7.0, q: "do you *miss* them?", a: "…a little. is that ok?", v: 'truth', m: ['squint', 'happy'] },
  ],
  pisLine: { t: 10.60, text: "*sob* missing them is ok!!", end: 14.25 },
  last: { t: 14.30, text: "Deleted. | *Lovingly* archived.", size: 88 },
  
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
