// og-kute01: social rework of kute01, THE UNSENT TEXT, "1 a.m., typing to the ex" (9 s vertical, star_advice, music: pop · C).
// Same phone, cast and story. Static HOOK (box) instead of the slammed title, no series bug, no record-scratch flash
// (a calm caption sticker keeps the joke), layout inside the full-frame safe zone, Aries pushed to the max. Hard cut on
// the last line. Built on the og copy of the kit (../unsentkit.js).
//   0.00   Aries mid-backspace on an ALL-CAPS confession, letters flying · Pisces sobbing over the shoulder
//   1.00   "hey stranger. rematch?" typed… 2.35 deleted · 2.85 the 2 a.m.-energy draft… 4.95 select-all wipe
//   5.60   Aries turns the phone face down (the screen dims); THE STARS: "Missing them doesn't mean *texting* them."
import { makeUnsent } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute01', sign: 'aries', name: 'Aries', to: 'the ex', status: 'last seen 11:48 pm', statusCol: '#ff9fb8', avatar: '#ff8fb1',
  hook: '', duration: 9, ending: 'cut',
  drafts: [
    { text: 'I MISS YOU SO MUCH!!!', at: -1.6, cps: 16, del: -0.3, delCps: 26 },
    { text: 'hey stranger. rematch?', at: 1.0, cps: 15, del: 2.35, delCps: 32 },
    { text: 'random but i miss you. calling in 3, 2', at: 2.85, cps: 19, del: 4.95, wipe: true },
  ],
  msgs: [{ text: 'take care of yourself.', at: -9, stamp: '3 weeks ago' }, { text: 'you too.', at: -8.5, from: 'me' }],
  screen: (c, t, S) => { const k = Math.min(1, Math.max(0, (t - 5.6) / 0.3)); if (k > 0) { c.save(); c.globalAlpha = 0.8 * k; c.fillStyle = '#05030c'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  breaks: [{ kind: 'note', at: 0.4, len: 1.2, caption: 'Aries. *Draft five.* Tonight.' }],
  moods: [[-9, 'wide', [1, -0.6]], [0.9, 'squint', [1, -0.3]], [2.35, 'wide', [1, -0.5]], [2.8, 'squint', [1, -0.3]], [4.95, 'wide', [0, 0]], [5.6, 'sleepy', [0, 0]], [7.3, 'happy', [1, 0.3]]],
  heroHops: [-0.25, 0.0, 0.5, 5.6],
  draftNo: (t, st) => st.k >= 0 && t < 5.6 ? `DRAFT ${st.k + 5}` : null,
  lines: [{ t: 6.15, text: 'Missing them doesn’t mean *texting* them.' }],
  lift: [5.6, 6.0],
  cues: [['tom', 5.62, 110, { gain: 0.2, decay: 0.25 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'It’s 1 a.m. | Don’t text *the ex.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
