// nthe17: THE THREAD, episode 17, "Plus one?" (25 s vertical, promo/films/next30/b06.md, music: pop · D)
// Story 0–20.6, then the shared end card. The look lives in ./threadkit.js (shared by nthe17–nthe32).
//   0.00   "Libra: ‘hypothetically… | plus one?’"  The thread already shows LIBRA's fourth MAYBE to the holiday party and
//          the hypothetical. ♎ Libra mid-hop on the stage, phone up, the little RSVP card (MAYBE) behind.
//   0.9    ♊ Gemini answers three messages in one bubble (WHO / yes / what are THEY wearing). ♌ Leo: "they can come if
//          they compliment my outfit" and pins it, itself. ♏ "name." ♓ voice note, 0:04, sobbing.
//   5.6    "‘Is it too *soon?*’"  Libra: three dates. ♈ "just bring them!!"  ♍ Virgo is typing…
//   9.4    card cut.  9.6 ♍ "ask them if they want to come. then let them pick." (gold)  "Let them *pick.*"
//  11.4    Libra: "asking…" → "THEY SAID YES" (11 hearts) → RSVP flips: YES +1. ♓ voice note 0:09 (happy sobbing).
//  16.6    "Ask. *Then* RSVP."  Everything pops out by 20.5.
import { threadFilm } from './threadkit.js'

const EP = {
  duration: 25,
  heads: [
    { text: 'Libra: ‘hypothetically… | *plus one?’*', at: -0.9, out: [3.45, 3.7], size: 82 },
    { text: 'The chat: *unhelpful.*', at: 3.75, out: [5.35, 5.6], size: 88 },
    { text: '‘Is it too *soon?*’', at: 5.65, out: [9.2, 9.45], size: 92 },
    { text: 'Let them *pick.*', at: 9.75, out: [12.45, 12.7], size: 96 },
    { text: 'They said *yes.*', at: 12.75, out: [16.35, 16.6], size: 96, accent: '#ff8fb1' },
    { text: 'Ask. *Then* RSVP.', at: 16.65, out: [20.15, 20.45], size: 104, late: 2, lateAt: 16.95 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'taurus', text: 'who is bringing snacks' },
    { t: -5, kind: 'msg', who: 'leo', text: 'rate my party outfit' },
    { t: -3, kind: 'sys', who: 'libra', text: 'LIBRA replied MAYBE to "holiday party" (x4)' },
    { t: -2, kind: 'msg', who: 'libra', text: 'hypothetically… could I bring a plus one?' },
    { t: 0.9, kind: 'triple', who: 'gemini', parts: [['Libra: …plus one?', 'WHO'], ['Taurus: who is bringing snacks', 'yes'], ['Leo: rate my party outfit', 'what are THEY wearing']] },
    { t: 2.1, kind: 'msg', who: 'leo', text: 'they can come if they compliment my outfit' },
    { t: 2.75, kind: 'sys', who: 'leo', text: 'LEO pinned their own message' },
    { t: 3.45, kind: 'msg', who: 'scorpio', text: 'name.' },
    { t: 4.3, kind: 'voice', who: 'pisces', dur: '0:04', sob: true, play: [4.55, 6.0], react: { t: 5.1, mark: 'tear', n: 3 } },
    { t: 5.75, kind: 'msg', who: 'libra', text: "it's only been three dates. is it too soon??" },
    { t: 7.1, kind: 'msg', who: 'aries', text: 'just bring them!!' },
    { t: 9.6, kind: 'msg', who: 'virgo', hl: true, text: 'ask them if they want to come. then let them pick.' },
    { t: 11.35, kind: 'msg', who: 'libra', text: 'asking…' },
    { t: 12.6, kind: 'msg', who: 'libra', text: 'THEY SAID YES', react: { t: 13.05, mark: 'heart', n: 11 } },
    { t: 13.75, kind: 'sys', who: 'libra', gold: true, text: 'LIBRA changed RSVP to YES +1' },
    { t: 14.75, kind: 'voice', who: 'pisces', dur: '0:09', sob: true, play: [15.0, 17.4] },
    { t: 16.3, kind: 'msg', who: 'cancer', text: "I'll set another plate" },
  ],
  pins: [{ t: 2.75, who: 'leo', text: 'they can come if they compliment my outfit' }],
  typing: [{ who: 'virgo', a: 7.8, b: 9.55 }, { who: 'libra', a: 10.6, b: 11.3 }, { who: 'libra', a: 11.8, b: 12.55 }],
  cuts: [5.5, { t: 9.4, kind: 'flip' }, 16.4],
  stage(x, t, K) {
    // the RSVP card behind Libra: MAYBE → YES +1
    const after = t > 13.95
    x.save(); x.translate(440, 1610); x.rotate(-0.08); x.scale(1, Math.max(0.05, t > 13.75 && t < 14.2 ? Math.abs(Math.cos(Math.PI * (t - 13.75) / 0.45)) : 1))
    x.fillStyle = '#fffaf0'; x.fillRect(-110, -62, 220, 124); x.fillStyle = '#e163d6'; x.fillRect(-110, -62, 220, 30)
    x.font = `800 20px ${K.MONO}`; x.fillStyle = K.INK; x.textAlign = 'center'; x.fillText('HOLIDAY PARTY', 0, -40)
    x.font = `800 40px ${K.INTER}`; x.fillStyle = after ? '#2fc79a' : '#c42a3f'; x.fillText(after ? 'YES +1' : 'MAYBE', 0, 26)
    x.textAlign = 'left'; x.restore()
    K.sparkles(x, t, 440, 1610, 13.95, 10, 140, 1)
    const libraMood = t < 5.7 ? 'wide' : t < 9.6 ? 'squint' : t < 12.6 ? 'neutral' : 'heart'
    K.stageStar(x, t, { who: 'libra', x: 250, y: 1730, s: 230, mood: libraMood, look: t < 12.6 ? [0.6, -1] : undefined, phone: 1, hops: [-0.18, 5.75, 6.05, 11.35, 12.6, 12.85, 13.1, 13.75] })
    // Virgo pops up for the advice
    const vk = K.pop01(t, 9.6, 0.35, 2) * K.outK(t, [12.4, 12.7])
    if (vk > 0.01) K.stageStar(x, t, { who: 'virgo', x: 560, y: 1760, s: 150, mood: 'happy', pop: vk, hops: [9.7, 10.1] })
    const pt = t > 14.75 ? 3 : t > 4.3 ? 2 : 1
    K.stageStar(x, t, { who: 'pisces', x: 860, y: 1745, s: 170, mood: t > 12.6 ? 'happy' : 'wide', look: [-1, -0.5], tears: pt, phone: -1, hops: [4.3, 14.75, 15.1] })
  },
  cues: [],
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
