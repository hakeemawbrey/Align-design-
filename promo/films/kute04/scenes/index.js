// kute04: THE UNSENT TEXT, "Texting mom after the fight" (11 s vertical trial reel, music: dreamy · Ab).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Cancer mid-sob into a tissue, "fine. whatever." mid-delete · 0.40 record scratch
//   1.40 "you never listen" ✗ · 3.50 "i'm sorry i snapped. love you." → SENT 6.10 · mom replies 7.20 · 8.20 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute04', duration: 11,
  sign: 'cancer', name: 'Cancer', to: 'mom', status: 'online', avatar: '#f2c75c',
  hook: 'Texting mom | after the *fight.*', ending: 'cut', draftBase: 3,
  msgs: [{ text: 'call me when you’re ready.', at: -9, stamp: '2 hours ago' }, { text: 'love you more. call me?', at: 7.2, typing: [6.55, 7.2] }],
  drafts: [
    { text: 'fine. whatever.', at: -1.4, cps: 14, del: -0.25, delCps: 22 },
    { text: 'you never listen', at: 1.4, cps: 13, del: 3.0, delCps: 30 },
    { text: 'i’m sorry i snapped. love you.', at: 3.5, cps: 15, send: 6.1 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'it was about *the dishes.*' }],
  heroTears: t => t > 7.2 ? 3 : 2,
  onHero: (c, t, S, o) => tissues(c, o.x + 110, o.y + 120, 70),
  sob: t => t > 6.1 ? 3 : 2,
  lines: [{ t: 8.2, text: 'Saying sorry first isn’t *losing.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
