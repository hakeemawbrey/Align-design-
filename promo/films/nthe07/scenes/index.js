// nthe07: THE THREAD, episode 7, "Cancer's Year-End Dinner" (25 s vertical, promo/films/next30/b05.md row 7, music: jazzy · D).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Cancer is cooking for *twelve.*"  ♋ Cancer mid-stir with a ladle.
//   1.2   Virgo's allergy form; Libra can't pick a night; Sag might be away; Taurus brings its appetite.
//   6.5   card cut → 1:12 AM: "I always do it all and then I'm too tired to enjoy it. is that love or am I just tired?"
//   10.1  Virgo: both. so let us bring things. Dishes claimed rapid-fire. Cancer + Pisces cry in harmony.  16.4 last line.
import { makeThread, box, R, INK } from '../../nthe01/chatkit.js'

const CAN = '#3fb6f0'
function ladle(x, t, P) {
  const sw = 0.35 * Math.sin(t * 4)
  x.save(); x.translate(P.x - P.F.S * 0.4, P.F.cy - P.F.S * 0.05); x.rotate(-0.5 + sw); x.scale(P.pk, P.pk)
  R(x, INK, -6, -110, 12, 110); R(x, '#c9c3dc', -3, -108, 6, 106)
  box(x, -30, -150, 60, 40, '#c9c3dc', { b: 6, hi: '#ffffff' })
  x.restore()
}
const EP = makeThread({
  id: 'nthe07', duration: 25, chat: "ARIES'S CHAT!!", cut: 6.5,
  heads: [
    { at: -1, text: 'Cancer is cooking | for *twelve.*', accent: CAN },
    { at: 3.0, text: 'Everyone | *responds.*' },
    { at: 6.6, text: '1:12 AM. | Cancer *can’t sleep.*', accent: CAN },
    { at: 10.1, text: 'Virgo: *both.*' },
    { at: 11.6, text: 'Dishes, *claimed.*' },
  ],
  last: { at: 16.4, text: 'Let the people you feed | *feed you back.*' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }]],
  msgs: [
    { at: -1, from: 'cancer', text: 'year-end dinner at mine!!' },
    { at: -0.6, from: 'cancer', text: "I'm making *everything*" },
    { at: 1.2, kind: 'agenda', from: 'virgo', title: 'ALLERGY FORM (PLEASE FILL)', items: ['name', 'allergies', 'feelings about cilantro'] },
    { at: 3.0, from: 'libra', text: "which night? I can't pick. all of them?" },
    { at: 4.0, from: 'sagittarius', text: 'might be away! save me a plate' },
    { at: 4.9, from: 'taurus', text: "I'll bring my appetite", react: [[5.3, 'ha', 6]] },
    { at: 6.6, kind: 'divider', text: '1:12 AM' },
    { at: 6.9, from: 'cancer', text: "I always do it all and then I'm *too tired* to enjoy it." },
    { at: 8.3, from: 'cancer', text: 'is that love or am I just tired?', big: true },
    { at: 10.1, from: 'virgo', text: 'both. so let us *bring things.*' },
    { at: 11.6, from: 'taurus', text: 'bread.' },
    { at: 12.0, from: 'virgo', text: 'salad.' },
    { at: 12.4, from: 'libra', text: 'dessert!' },
    { at: 12.8, from: 'leo', text: 'a centrepiece.' },
    { at: 13.2, from: 'aries', text: "I'll do the dishes!!", react: [[13.7, 'heart', 7]] },
    { at: 14.3, from: 'cancer', text: "…oh. I'm *crying.*" },
    { at: 15.0, kind: 'voice', from: 'pisces', dur: '0:27', note: '(crying in harmony)' },
  ],
  typing: [{ from: 'virgo', a: 9.0, b: 10.05 }],
  stage: [
    { at: -1, sign: 'cancer', mood: 'happy', look: [1, -0.4], prop: ladle, noPhone: true },
    { at: 1.2, sign: 'virgo', mood: 'squint', look: [1, -1] },
    { at: 3.0, sign: 'libra', mood: 'wide' },
    { at: 4.0, sign: 'sagittarius', mood: 'happy' },
    { at: 4.9, sign: 'taurus', mood: 'happy' },
    { at: 6.9, sign: 'cancer', mood: 'sleepy' },
    { at: 8.3, sign: 'cancer', mood: 'wide', look: [0, 0] },
    { at: 10.1, sign: 'virgo', mood: 'happy' },
    { at: 11.6, sign: 'taurus', mood: 'sparkle', two: { sign: 'aries', at: 13.2, mood: 'happy' } },
    { at: 14.3, sign: 'cancer', mood: 'sparkle', tears: 3, look: [0, 0] },
  ],
  cry: [[-1, 1], [8.3, 2], [15.0, 3]],
  pisMood: [[8.3, 'wide'], [11.6, 'sparkle'], [15.0, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
