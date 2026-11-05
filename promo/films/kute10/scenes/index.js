// kute10: THE UNSENT TEXT, "Capricorn trying to say “proud of you”" (9 s vertical trial reel, music: cinematic · G).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Capricorn mid-pace, "good job." deleting letter by letter · 0.30 whip zoom
//   1.20 "nice work on the thing." ✗ · 3.60 "i'm really proud of you." → SENT 5.50, sis replies (Pisces bawls) · 6.10 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute10', duration: 9,
  sign: 'capricorn', name: 'Capricorn', to: 'little sis', status: 'online', avatar: '#ff8fb1',
  hook: 'Capricorn trying | to say *“proud.”*', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'I PASSED MY EXAM!!', at: -9, stamp: 'today 2:15 pm' }, { text: 'wait. are you crying?? love you', at: 6.4, typing: [5.85, 6.4] }],
  drafts: [
    { text: 'good job.', at: -1.2, cps: 10, del: -0.15, delCps: 10 },
    { text: 'nice work on the thing.', at: 1.2, cps: 14, del: 3.2, delCps: 32 },
    { text: 'i’m really proud of you.', at: 3.6, cps: 15, send: 5.5 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  onHero: (c, t, S, o) => { const b = o.x - 120, y = o.y + 70; box(c, b - 30, y, 80, 56, '#6b4a2f', { b: 5 }); R(c, INK, b - 2, y - 14, 24, 14) },
  heroTears: t => t > 6.4 ? 1 : 0,
  sob: t => t > 5.55 ? 3 : 2,
  lines: [{ t: 6.1, text: 'Warm words don’t need a *meeting.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
