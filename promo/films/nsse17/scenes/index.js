// nsse17 — SIGN × SIGN, Vol. 2, ep 17: "Taurus × Pisces: the blanket and the waterworks." (28 s vertical, star_advice post)
// Movie night. The shared look + timeline live in ./sskit.js (imported by nsse18–32).
//   0.0–6.0   "Taurus × Pisces: | *movie night.*"  Taurus mid-hop on frame 0; fig. 1 Taurus (wants: a cozy night in), fig. 2 Pisces (wants: to feel everything), already sobbing; fig. 3
//             is the tissue box. TAURUS: "snacks: ready. blanket: ready."  PISCES: "I'm crying. it's the opening titles."
//   TIP 1     "Pisces, let Taurus | *comfort* you."  (tissues, restocked)  PISCES: "can I lean on you for the sad part?"
//   TIP 2     "Taurus, say | the *soft* thing."  (note: my favourite kind of nothing)  TAURUS: "this is my favourite kind of nothing."
//   TIP 3 ↻   "Cry *together.*"  (clock: end credits)  TAURUS: "…ok. the dog part got me too."  Taurus cries; the two lean in.
//   last      "One blanket. | *Two* tissues."
import { makeFilm } from './sskit.js'

const F = makeFilm({
  id: 'nsse17', ep: 17,
  music: { style: 'lofi', key: 'D', seed: 1717 },
  A: { id: 'taurus', wants: 'a cozy night in', mood: 'happy', react: 'wide' },
  B: { id: 'pisces', wants: 'to feel everything', mood: 'wide', react: 'happy' },
  title: 'Taurus × Pisces: | *movie night.*',
  hook: ['snacks: *ready.* blanket: *ready.*', "I'm crying. it's the *opening titles.*"],
  note: null,
  pis: ['(for pisces)', '(restocked)', '(both of them)'],
  tips: [
    { who: 'B', head: 'Pisces, let Taurus | *comfort* you.', line: 'can I lean on you for *the sad part?*',
      card: { icon: 'popcorn', icon2: 'tissue', lines: ['the sad part:', 'lean on taurus', { t: '(it is warm)', red: true }] } },
    { who: 'A', head: 'Taurus, say | the *soft* thing.', line: 'this is my *favourite* kind of nothing.',
      card: { icon: 'blanket', lines: ['say it out loud:', { t: '"I love this."', circle: true }] } },
    { who: 'A', head: 'Cry | *together.*', line: '…ok. the dog part *got me* too.', after: { A: 'heart', B: 'sparkle' }, tears: { A: true },
      card: { icon: 'clock', lines: ['end credits', { t: 'taurus: sniffling', red: true }] } },
  ],
  tearsEnd: { A: true },
  fig4: 'fig. 4 · one blanket',
  last: 'One blanket. | *Two* tissues.',
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
