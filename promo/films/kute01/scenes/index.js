// kute01: THE UNSENT TEXT, "1 a.m., typing to the ex" (9 s vertical trial reel, music: pop · C). Hard cut.
// The series look lives in ../unsentkit.js (shared read-only by kute02–24).
//   0.00   frame 0: Aries mid-scream behind the phone, "i miss you so much" mid-backspace, letters flying · hook "1 a.m. Texting the *ex.*"
//   0.45   record-scratch freeze on the delete
//   1.00   "hey stranger" typed… 2.35 deleted (Pisces, over the shoulder, sobs harder)
//   2.85   "random but i miss you" typed… 4.95 select-all wipe
//   5.60   Aries turns the phone face down (the screen dims); THE STARS: "Missing them doesn't mean *texting* them."
import { makeUnsent } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'kute01', sign: 'aries', name: 'Aries', to: 'the ex', status: 'last seen 11:48 pm', statusCol: '#ff9fb8', avatar: '#ff8fb1',
  hook: '1 a.m. | Texting the *ex.*', duration: 9, ending: 'cut',
  drafts: [
    { text: 'i miss you so much', at: -1.6, cps: 16, del: -0.3, delCps: 26 },
    { text: 'hey stranger', at: 1.0, cps: 13, del: 2.35, delCps: 30 },
    { text: 'random but i miss you', at: 2.85, cps: 14, del: 4.95, wipe: true },
  ],
  msgs: [{ text: 'take care of yourself.', at: -9, stamp: '3 weeks ago' }, { text: 'you too.', at: -8.5, from: 'me' }],
  screen: (c, t, S) => { const k = Math.min(1, Math.max(0, (t - 5.6) / 0.3)); if (k > 0) { c.save(); c.globalAlpha = 0.8 * k; c.fillStyle = '#05030c'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.8, caption: 'yep. *draft five.*' }],
  moods: [[-9, 'wide', [1, -0.6]], [0.9, 'squint', [1, -0.3]], [2.35, 'wide', [1, -0.5]], [2.8, 'squint', [1, -0.3]], [4.95, 'wide', [0, 0]], [5.6, 'sleepy', [0, 0]], [7.3, 'happy', [1, 0.3]]],
  heroHops: [-0.25, 0.0, 0.5, 5.6],
  draftNo: (t, st) => st.k >= 0 && t < 5.6 ? `DRAFT ${st.k + 5}` : null,
  lines: [{ t: 6.15, text: 'Missing them doesn’t mean *texting* them.' }],
  lift: [5.6, 6.0],
  cues: [['tick', 5.62, 0.08], ['tom', 5.62, 110, { gain: 0.2, decay: 0.25 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
