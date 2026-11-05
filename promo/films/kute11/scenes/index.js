// kute11: THE UNSENT TEXT, "They said “I like you.” Aquarius:" (9 s vertical trial reel, music: lofi · G).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Aquarius mid-flail under their "i really like you", "lol same" mid-delete · 0.40 record scratch
//   1.40 "haha ok" ✗ · 2.90 "i like you too. it scared me a bit." (Pisces sobs) · 5.60 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute11', duration: 9,
  sign: 'aquarius', name: 'Aquarius', to: 'Mo', status: 'typing… no, stopped', statusCol: '#ffd36b', avatar: '#ff8fb1',
  hook: 'They said *“i like you.”* | Now what?', ending: 'loop', draftBase: 3,
  msgs: [{ text: 'ok i’m just going to say it', at: -9, stamp: '10:14 pm' }, { text: 'i really like you', at: -8.8 }],
  drafts: [
    { text: 'lol same', at: -1.0, cps: 12, del: -0.15, delCps: 20 },
    { text: 'haha ok', at: 1.4, cps: 12, del: 2.5, delCps: 24 },
    { text: 'i like you too. it scared me a bit.', at: 2.9, cps: 16 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'they said it *first.*' }],
  heroHops: [-0.2, 0.1],
  sob: t => t > 4.9 ? 3 : 2, pisMood: t => t > 4.9 ? 'heart' : 'sparkle',
  lines: [{ t: 5.6, text: 'Real feelings deserve a *real* reply.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
