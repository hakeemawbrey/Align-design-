// og-kute11: the social rework of kute11, THE UNSENT TEXT, "They said “I like you.” Aquarius:" (10.5 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, hard cut, no loop).
//   0.00 frame 0: Aquarius mid-flail under their "i really like you", "lol same (as a concept)" mid-delete.
//        HOOK (static box, until 3.3): "They said it first. | Aquarius *panicked.*" · 0.40 record scratch
//   1.40 "interesting data. noted." ✗ · 4.10 "i like you too. it scared me a bit." (Pisces sobs) · 6.90 THE STARS
import { makeUnsent } from '../unsentkit.js'

export const HOOK = 'They said it first. | Aquarius *panicked.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const EP = makeUnsent({
  id: 'og-kute11', duration: 10.5,
  sign: 'aquarius', name: 'Aquarius', to: 'Mo', status: 'typing… no, stopped', statusCol: '#ffd36b', avatar: '#ff8fb1',
  hook: '', ending: 'cut', draftBase: 3,
  msgs: [{ text: 'ok i’m just going to say it', at: -9, stamp: '10:14 pm' }, { text: 'i really like you', at: -8.8 }],
  drafts: [
    { text: 'lol same (as a concept)', at: -2.1, cps: 12, del: -0.15, delCps: 30 },
    { text: 'interesting data. noted.', at: 1.4, cps: 14, del: 3.25, delCps: 34 },
    { text: 'i like you too. it scared me a bit.', at: 4.1, cps: 16 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'emotion detected. *eject.*' }],
  heroHops: [-0.2, 0.1],
  sob: t => t > 6.2 ? 3 : 2, pisMood: t => t > 6.2 ? 'heart' : 'sparkle',
  lines: [{ t: 6.9, text: 'Real feelings deserve a *real* reply.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
