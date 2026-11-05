// kpsue03: PLANET TALK: THE SUN, Ep 3 "Gemini's Seven Drafts" (23.8 s vertical, star_talk post, pop · G). Hard cut.
// Frame 0: the Sun mid-zoom straight at the lens, Gemini with the phone, hook "GEMINI. Pick one you."
//   3.0 Gemini: seven replies to "what are you up to?" · 6.1 the DRAFTS board, 1–7 · 8.6 loading bar "choosing a
//   personality… Error: too many yous" · 11.2 Sun: they liked the REAL you · 14.8 "…number one." (2–7 struck out)
//   17.3 sent · 19.0 reply "same!!" · 19.2 Pisces sobs · 21.6 "The real me. Sent."
import { episode, drawPanel, drawPhone, hearts } from '../../kpsue01/sunkit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const LOAD = { at: 8.6, len: 2.4, label: 'choosing a personality…', stallAt: 99, error: 'Error: too many yous', y: 1690 }
const D = ['1. honestly? thinking about you', '2. lol nothing', '3. (mysterious silence)', '4. a poem (three pages)', '5. just a meme', '6. "who is this?"', '7. lol']
const rows = D.map((text, i) => ({ at: 6.2 + i * 0.3, text, strike: i ? 15.3 + i * 0.12 : undefined, color: i === 0 ? '#c23a6a' : undefined }))
const MSGS = [{ at: -5, side: 'L', text: 'what are you up to?' }, { at: 17.3, side: 'R', text: 'honestly? thinking about you' }, { at: 19.0, side: 'L', text: 'same!! literally same' }]

const E = episode({
  sign: 'gemini', duration: 23.8, ending: 'cut',
  entrance: { kind: 'zoom', at: -0.6, x: 540, y: 620, size: 540 },
  hook: { text: 'GEMINI. Pick | *one* you.' },
  sun: { mood: [[0, 'wide'], [0.6, 'happy'], [6.3, 'wide'], [8.6, 'sad'], [11.2, 'happy'], [14.8, 'proud'], [17.3, 'wide'], [19.0, 'love'], [21.6, 'happy']], shades: [[0, true], [6.2, false]], hops: [11.2, 11.7, 19.1] },
  me: {
    base: { x: 380, y: 1420, size: 290 },
    mood: [[0, 'wide'], [1.0, 'squint'], [3, 'neutral'], [6.2, 'sparkle'], [8.6, 'wide'], [11.2, 'neutral'], [14.8, 'wide'], [15.6, 'happy'], [17.3, 'wide'], [19.0, 'heart'], [21.6, 'happy']],
    look: [[0, [1, 0]], [3, [0, 0]], [6.2, [0, -1]], [11.2, [0, -1]], [17.3, [1, 0]], [21.6, [0, 0]]],
    sweat: [[8.6, true], [11.0, false]],
    hops: [19.05, 19.3, 19.55],
  },
  bubbles: [
    { t0: 3.0, t1: 6.0, who: 'gemini', text: 'They asked what I’m up to. I wrote *seven* replies.' },
    { t0: 11.2, t1: 14.6, who: 'sun', text: 'GEMINI! They liked the REAL you. Send the one that sounds like *YOU.*', shake: 2 },
    { t0: 14.8, t1: 17.0, who: 'gemini', text: 'Which one is… oh. *Number one.*' },
    { t0: 19.6, t1: 21.4, who: 'pisces', text: 'They said SAME!! I’m *a mess.*' },
    { t0: 21.6, who: 'gemini', text: 'The real me. *Sent.*', size: 56 },
  ],
  pisces: { at: 19.2, tears: [[19.2, 3]], hops: [19.6, 20.0] },
  fx: [loadingBar(LOAD)], fxCues: loadingBarCues(LOAD),
  front(x, t) {
    const pin = Math.min(1, Math.max(0, (t + 1) / 0.3))
    const big = Math.min(1, Math.max(0, (t - 16.9) / 0.35)) * (1 - Math.min(1, Math.max(0, (t - 21.2) / 0.35)))
    const e = big * big * (3 - 2 * big)
    drawPhone(x, t, { x: 800 - 260 * e, y: 1360 - 330 * e, s: 0.7 + 0.45 * e, rot: (0.07 + 0.03 * Math.sin(t * 3)) * (1 - e), pop: pin, title: 'Kai', msgs: MSGS, typing: [17.9, 19.0], draft: tt => (tt < 17.3 ? (tt < 6 ? 'lol' : D[Math.floor(tt * 2) % 7].replace(/^\d\. /, '').replace(/\*/g, '')) : '') })
    const vis = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p = Math.max(vis(6.0, 10.6), vis(14.6, 17.2))
    if (p > 0.01) drawPanel(x, t, { x: 540, y: 1010, w: 800, h: 540, title: 'DRAFTS', color: '#f2c75c', pop: p, rows, size: 36, lineH: 60 })
    hearts(x, t, { at: 19.0, cx: 540, cy: 900 })
  },
  cues: [...D.map((_, i) => ['pop', +(6.2 + i * 0.3).toFixed(2), 880 + i * 60, 0.03, 0.2]), ...D.slice(1).map((_, i) => ['tick', +(15.42 + i * 0.12).toFixed(2), 0.05]), ['whoosh', 17.3, 0.3, 0.08], ['pop', 19.0, 1318.51, 0.05, 0.3], ['glitter', 19.0, 19.6]],
})
export const { DURATION, SCENES, CUES } = E
