// kute18: THE UNSENT TEXT, "Virgo said sorry nine times" (8 s vertical trial reel, music: chiptune · G).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: "sorry sorry sorry if this is weird" mid-backspace, sorrys flying · 0.35 record scratch
//   1.30 "sorry to bother" ✗ · 2.90 "hey! quick question:" (Pisces sniffles) · 4.50 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute18', duration: 8,
  sign: 'virgo', name: 'Virgo', to: 'Nell', status: 'online', avatar: '#f2c75c',
  hook: 'Virgo said *sorry* | nine times.', ending: 'loop', draftBase: 8,
  msgs: [{ text: 'ask me anything, anytime!', at: -9, stamp: 'last week' }],
  drafts: [
    { text: 'sorry sorry sorry if this is weird', at: -2.6, cps: 16, del: -0.3, delCps: 40 },
    { text: 'sorry to bother', at: 1.3, cps: 15, del: 2.5, delCps: 30 },
    { text: 'hey! quick question:', at: 2.9, cps: 16 },
  ],
  breaks: [{ kind: 'scratch', at: 0.35, len: 0.8, caption: 'that was *sorry #9.*' }],
  sob: t => t > 4.2 ? 3 : 2, pisMood: t => t > 4.2 ? 'heart' : 'sparkle',
  lines: [{ t: 4.5, text: 'Drop the extra sorrys. You’re *allowed.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
