// og-nthe15: social rework of nthe15 (The Thread, "Scorpio Asked Everyone"). Static HOOK (box) 0–3.1 replaces the
// animated frame-0 headline and the 'suspicious' head; no series bug, no end card, no fade-out; crazier lines.
// The look lives in ../chatkit.js.
//   0.0   frame 0: "Scorpio asked *everyone* a personal question."  "what's one small thing that makes your day better? (no reason)"
//   1.3   the chat is suspicious (the gift exchange). Then everyone answers. Pisces: "nobody ever ASKS".
//   8.6   card cut: Scorpio: "I didn't know you all this well. that's… nice?"  Virgo: keep asking after the exchange.
//   12.2  Libra: it's literally a talk card. Gemini guesses three. "no comment."  16.6 last line.
import { makeThread } from '../chatkit.js'

const SCO = '#e23d66'
const EP = makeThread({
  id: 'og-nthe15', duration: 25, chat: 'virgo said it out loud', cut: 8.6,
  heads: [
    { at: 3.6, text: 'Everyone | *answers.*' },
    { at: 8.7, text: 'Scorpio | *softens.*', accent: SCO },
    { at: 10.6, text: 'Virgo: | *keep asking.*' },
  ],
  last: { at: 16.6, text: 'Ask because | *you want to know.*' },
  pins: [[-1, { from: 'leo', text: 'Virgo has a crush (NATIONAL HOLIDAY)' }]],
  msgs: [
    { at: -1, from: 'scorpio', text: "what's one small thing that makes your day better? *(no reason) (stop asking)*", big: true },
    { at: 1.3, from: 'aries', text: 'this is 100% about the gift exchange' },
    { at: 1.9, from: 'gemini', text: 'SCORPIO DREW SOMEONE AND IS *INVESTIGATING*', react: [[2.3, 'ha', 7]] },
    { at: 2.7, from: 'scorpio', text: 'no reason. answer the question.' },
    { at: 3.6, from: 'taurus', text: 'warm bread. a whole loaf. alone.' },
    { at: 4.3, from: 'leo', text: 'compliments. specific ones. about me.' },
    { at: 5.0, from: 'capricorn', text: 'a finished list. and a new list.' },
    { at: 5.7, from: 'aquarius', text: 'octopuses have three hearts' },
    { at: 6.4, from: 'cancer', text: "someone texting *'home safe'*" },
    { at: 7.2, kind: 'voice', from: 'pisces', dur: '8:51', note: '(sobbing: nobody EVER asks me)' },
    { at: 8.8, from: 'scorpio', text: "I didn't know you all this well. that's… *nice?*", big: true, react: [[9.4, 'heart', 10]] },
    { at: 10.6, from: 'virgo', text: 'keep asking *after* the exchange.' },
    { at: 12.2, from: 'libra', text: "this is literally a *talk card*" },
    { at: 13.2, from: 'scorpio', text: 'noted. also: nobody guess. I will know.' },
    { at: 14.2, kind: 'triple', from: 'gemini', items: [{ to: 'scorpio', text: "it's Taurus" }, { to: 'scorpio', text: "it's Leo" }, { to: 'scorpio', text: "it's me??" }] },
    { at: 15.4, from: 'scorpio', text: 'no comment.', react: [[15.8, 'ha', 9]] },
  ],
  stage: [
    { at: -1, sign: 'scorpio', mood: 'squint', look: [0, 0], hops: [0.3] },
    { at: 1.3, sign: 'aries', mood: 'squint' },
    { at: 1.9, sign: 'gemini', mood: 'wide' },
    { at: 2.7, sign: 'scorpio', mood: 'eyeroll' },
    { at: 3.6, sign: 'taurus', mood: 'happy' },
    { at: 4.3, sign: 'leo', mood: 'sparkle' },
    { at: 5.0, sign: 'capricorn', mood: 'happy' },
    { at: 5.7, sign: 'aquarius', mood: 'wink' },
    { at: 6.4, sign: 'cancer', mood: 'happy' },
    { at: 8.8, sign: 'scorpio', mood: 'sparkle', look: [0, 0] },
    { at: 10.6, sign: 'virgo', mood: 'happy' },
    { at: 13.2, sign: 'scorpio', mood: 'squint', look: [0, 0] },
    { at: 15.4, sign: 'scorpio', mood: 'wink' },
  ],
  cry: [[-1, 1], [7.2, 3], [10.6, 2]],
  pisMood: [[-1, 'wide'], [3.6, 'sparkle'], [7.2, 'happy']],
})

export const HOOK = 'Scorpio asked us | about *our feelings.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.1
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
