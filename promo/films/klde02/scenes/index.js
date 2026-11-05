// klde02: ZODIAC LIE DETECTOR, "Thriving at the Holiday Dinner" (16 s vertical, star_talk post, funk · E). Hard cut on the last line.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: how’s being single at the *family dinner?*  → love it. thriving. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: and the *food?*  → the rolls are my soulmate. → TRUTH.
//   14.30      last line: Thriving. | *Just not* at the questions.

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
const ROLL = ['.BBBB.', 'BLLLLB', 'BLBLLB', 'BBBBBB']
function truth(x, t, S) {
  wall(x, '#2a1c3c', '#3a2a50')
  // a bathroom mirror
  box(x, 540, 470, 440, 600, '#bfe2f2', { b: 12 }); R(x, 'rgba(255,255,255,0.35)', 570, 500, 60, 540)
  const takes = ['I’m focusing on *me!*', 'I’m focusing on ME!', 'I’M FOCUSING… on me.']
  const k = Math.min(2, Math.floor(S.u / 0.85))
  S.hero(x, t, { x: 300, y: 1020, s: 300, mood: k === 2 ? 'squint' : 'sparkle', look: [1, 0], hops: [S.f.at + 0.1, S.f.at + 0.95, S.f.at + 1.8] })
  S.hero(x, t, { x: 760, y: 820, s: 230, mood: k === 2 ? 'squint' : 'sparkle', look: [-1, 0], hops: [S.f.at + 0.1, S.f.at + 0.95, S.f.at + 1.8], alpha: 0.75 })
  bubble(x, t, 330, 700, S.f.at + 0.1 + k * 0.85, S.f.at + S.f.dur, takes[k].replace(/\*/g, ''), { size: 40 + k * 4, tail: -0.2 })
  label(x, `TAKE ${k + 1}`, 760, 1130, { size: 34, col: GOLD })
}

const EP = makeLD({
  id: 'klde02', sign: 'taurus', len: 16, ending: 'cut',
  music: { style: 'funk', key: 'E', seed: 2302 },
  hook: "“I *love* being single | at dinner.”",
  qs: [
    { t: 1.4, q: "how’s being single at the *family dinner?*", a: "love it. thriving.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *rehearsing.*", draw: truth } },
    { t: 7.0, q: "and the *food?*", a: "the rolls are my soulmate.", v: 'truth', m: ['squint', 'happy'], a2: "(I’m buttering one now.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sob* the ROLLS", end: 14.25 },
  last: { t: 14.30, text: "Thriving. | *Just not* at the questions.", size: 88 },
  prop(x, t, S) {if (!S.F) return; const F = S.F; drawBits(x, ROLL, { B: '#c98a3e', L: '#f0c27a' }, F.ox - F.S * 0.36, F.oy - F.base + F.S * 0.12 + (S.chaos ? 30 * Math.sin(t * 30) : 0), 14, { rot: S.chaos ? t * 8 : -0.2 })},
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
