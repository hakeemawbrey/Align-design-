// og-nthe21: social rework of nthe21 (The Thread). Static HOOK replaces the animated frame-0 headline; no series bug; no end card; the
// film ends on its last story beat; crazier lines. The look lives in ./threadkit.js (social copy of ../../nthe17/scenes/threadkit.js).
//   0.00  "Aries posted the secret | in the group chat."  "WHO HAS VIRGO. I HAVE VIRGO. WHAT DO I GET VIRGO"
//         ♈ Aries frozen mid-send, a gift box beside them.
//   0.9   ♍ "I didn't see that." · ♌ pins it · ♊ "delete it / don't delete it / too late" · ♓ voice note, sobbing.
//   6.85  ♋ "what's something you noticed about them?" (gold)
//   8.4   Aries: "…their favourite mug is chipped."  (a chipped mug pops up on the stage)  ♍ is typing… and stops,
//         then hearts it.  The mug gets wrapped.  "Noticed. *Wrapped*."
import { threadFilm } from './threadkit.js'

const EP = {
  duration: 18,
  heads: [
    { text: 'Virgo: *‘I didn’t see that.’*', at: 3.4, out: [6.6, 6.85], size: 80 },
    { text: 'What did you *notice?*', at: 7.0, out: [11.1, 11.35], size: 92 },
    { text: 'Noticed. *Wrapped.*', at: 11.5, out: [15.1, 15.45], size: 104, late: 1, lateAt: 11.8 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'leo', text: 'I drew someone FUN' },
    { t: -5, kind: 'msg', who: 'scorpio', text: "I drew someone. I'm not telling." },
    { t: -4, kind: 'sys', gold: true, text: 'SECRET GIFT EXCHANGE: names drawn' },
    { t: -3, kind: 'msg', who: 'cancer', text: "remember: it's a SECRET" },
    { t: -1.5, kind: 'msg', who: 'aries', text: 'WHO HAS VIRGO. I HAVE VIRGO. WHAT DO I GET VIRGO. VIRGO??' },
    { t: 0.9, kind: 'msg', who: 'virgo', text: "I didn't see that. I'm wearing a blindfold now." },
    { t: 1.8, kind: 'sys', who: 'leo', text: 'LEO pinned it (for drama)' },
    { t: 2.7, kind: 'triple', who: 'gemini', parts: [['Aries: I HAVE VIRGO', 'delete it'], ["Cancer: it's a SECRET", "don't delete it"], ["Virgo: I didn't see that", 'too late']] },
    { t: 4.1, kind: 'voice', who: 'pisces', dur: '2:58', sob: true, play: [4.3, 6.0] },
    { t: 5.4, kind: 'msg', who: 'aries', text: 'ok but what DO I get them. I am IN THE STORE.' },
    { t: 7.0, kind: 'msg', who: 'cancer', hl: true, text: "what's something you noticed about them?" },
    { t: 8.4, kind: 'msg', who: 'aries', text: '…their favourite mug is chipped. on the left.', react: { t: 10.5, mark: 'heart', n: 1 } },
    { t: 11.2, kind: 'voice', who: 'pisces', dur: '4:40', sob: true, play: [11.4, 12.9] },
    { t: 12.6, kind: 'msg', who: 'aries', text: 'new mug. wrapped. not saying for who. (VIRGO)' },
  ],
  pins: [{ t: 1.8, who: 'aries', text: 'WHO HAS VIRGO. I HAVE VIRGO.' }],
  typing: [{ who: 'cancer', a: 6.0, b: 6.95 }, { who: 'virgo', a: 9.3, b: 10.4 }],
  cuts: [3.3, { t: 6.9, kind: 'flip' }, 11.4],
  stage(x, t, K) {
    const mood = t < 2 ? 'wide' : t < 7 ? 'eyeroll' : t < 8.4 ? 'squint' : 'happy'
    const F = K.stageStar(x, t, { who: 'aries', x: 250, y: 1730, s: 230, mood, look: t < 2 ? [0, 0] : undefined, phone: 1, squash: t < 0.9 ? 0.08 : 0, bob: t < 0.9 ? 0 : undefined, hops: [0.95, 5.4, 8.4, 12.6] })
    void F
    // the mug: pops up, then gets wrapped
    const mk = K.pop01(t, 8.5, 0.35, 2.2), wrap = t > 12.6
    if (mk > 0.01) {
      if (!wrap) { K.drawProp(x, 'mug', 560, 1700, 9 * mk); x.fillStyle = '#05040c'; x.fillRect(560 - 9 * 3 * mk, 1700 - 9 * 3.5 * mk, 9 * mk, 9 * mk) }
      else { K.drawProp(x, 'gift', 560, 1700, 10 * K.pop01(t, 12.6, 0.3, 2.4)); K.sparkles(x, t, 560, 1700, 12.62, 10, 120, 1) }
    }
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 8.4 ? 'sparkle' : 'wide', look: [-1, -0.5], tears: t > 11.2 ? 3 : t > 4.1 ? 2 : 1, phone: -1, hops: [4.1, 11.2, 11.5] })
  },
}
export const { DURATION, SCENES, CUES, STORY_END } = threadFilm(EP)
export const HOOK = 'Aries has Virgo. | *Told the whole chat.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3
