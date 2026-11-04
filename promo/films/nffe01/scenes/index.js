// nffe01: FRIENDS FIRST ep 1, "The friend who went quiet" (25 s vertical, star_advice, music: lofi · Am).
// Story 0–20.6, then the shared end card. The format look lives in ./friendskit.js (shared by nffe01–nffe24).
//   0.0–7.0    "Your friend's gone | *quiet.*"  Cancer on the couch, mid-hop, phone in hand. The group chat pops up:
//              Capricorn's last message ("busy week, talk soon!") sits above a "3 WEEKS LATER" divider. Cancer types
//              "are you mad at me??", strikes it out. CANCER: "did I do something wrong?"  Pisces sniffles on the rug.
//   7.0        card cut.  THE STARS (big, in the open sky): "quiet isn't always about *you*, sweetie." →
//              "send a check-in with *no homework* attached."
//   13.6       Capricorn's bedroom: under a blanket, phone glowing. The CHECK-IN card: "thinking of you. *no need to
//              reply.*"  The phone pings; Capricorn smiles, hearts float up. Pisces at the window, fountaining.
//   17.2       Last line: "*No reply* needed."
import { makeFriends, stars, say, bigPhone, phoneSmall, blanket, mug, hearts, glow, pop01, outK, prog, clamp, ease, sparkles } from './friendskit.js'

const CAN = 'cancer', CAP = 'capricorn'
const PHONE = [1.3, 6.85]
const MSGS = [
  { at: -9, from: 'them', name: 'CAPRICORN', nameCol: '#e9d9a8', text: 'busy week, talk soon!' },
  { at: -9, from: 'them', name: '— 3 WEEKS LATER —', nameCol: 'rgba(239,230,214,0.55)', text: 'cocoa on sunday? ☕︎', },
  { at: 2.0, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'MEEE' },
  { at: 2.5, from: 'them', name: 'TAURUS', nameCol: '#b8f0c0', text: 'in. bringing blankets' },
]
const DRAFT = 'are you mad at me??'
const DR = { type: [3.3, 4.5], strike: 4.75, clear: 5.35 }

const EP = makeFriends({
  id: 'nffe01', dur: 25, cut: 7.0,
  hook: { text: 'Your friend’s gone | *quiet.*', out: 3.4, color: '#8fd8f6' },
  lines: [
    say(4.3, CAN, 'did I do something *wrong?*'),
    stars(7.4, 'quiet isn’t always about *you*, sweetie.'),
    stars(10.7, 'send a check-in with *no homework* attached.'),
  ],
  boxes: [{ from: 0, to: 1, close: 6.8 }, { from: 1, to: 3, close: 13.75 }],
  check: { at: 13.9, out: [16.85, 17.1], text: 'thinking of you. | *no need to reply.*' },
  last: { at: 17.2, text: '*No reply* needed.', color: '#8fd8f6' },
  shots: [
    { at: 0, set: 'room', pis: { x: 900, y: 1250, s: 116, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        const ph = t > PHONE[0] + 0.2 && t < PHONE[1]
        S.star(x, t, CAN, { x: 290, y: 1000, s: 300, mood: t < 1.2 ? 'wide' : t < 4.2 ? 'squint' : 'wide', look: ph ? [1, -0.4] : [1, 0.6], hops: [-0.12, 1.25, ...S.hopsFor(CAN)] })
        phoneSmall(x, t, 420, 1060, { rot: 0.25, s: 0.9, glowA: 1 })
      } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 900, y: 1240, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] },
      draw(x, t, S) {
        glow(x, 540, 860, 420, 0.7, '255,226,160')
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], pop: pop01(t, 7.0, 0.4, 2), seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 230, y: 1250, s: 170, mood: t < 10.5 ? 'wide' : 'sparkle', look: [1, -1], hops: [7.3, 10.6] })
      } },
    { at: 13.6, set: 'bedroom', pis: { x: 960, y: 1240, s: 120, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const read = t > 15.0
        mug(x, t, 860, 1004, 1.1, '#7c74f0')
        glow(x, 360, 930, 230, read ? 1 : 0.6, '160,200,255')
        S.star(x, t, CAP, { x: 330, y: 930, s: 260, mood: read ? (t > 15.6 ? 'happy' : 'sparkle') : 'sleepy', zzz: false, look: [1, 1], hops: [15.05, 15.6] })
        blanket(x, 400, 1000, 600, 140, '#5a8a7a')
        phoneSmall(x, t, 470, 1000, { rot: -0.3, s: 0.85, glowA: read ? 1.4 : 0.8, buzz: t > 14.9 && t < 15.3 ? 1 : 0 })
        hearts(x, t, 15.7, 340, 760, { n: 6 })
        sparkles(x, t, 470, 960, 15.0, 8, 90, 1)
      } },
  ],
  overlay(x, t) {
    if (t < PHONE[0] || t > PHONE[1]) return
    const pop = pop01(t, PHONE[0], 0.35, 2) * outK(t, [PHONE[1] - 0.3, PHONE[1]])
    const n = t < DR.type[0] ? 0 : t < DR.clear ? Math.floor(DRAFT.length * clamp(prog(t, ...DR.type))) : 0
    bigPhone(x, t, { cx: 720, cy: 900, w: 500, h: 780, title: 'the group ✦', msgs: MSGS, pop, rot: 0.03, draft: { text: DRAFT, chars: n, strike: t > DR.strike } })
    void ease
  },
  cues: [
    ['pop', 1.32, 880, 0.04, 0.3], ['whoosh', 1.3, 0.3, 0.03], ['pop', 2.0, 1318.51, 0.035, 0.3], ['pop', 2.5, 987.77, 0.035, 0.3],
    ...Array.from({ length: 10 }, (_, i) => ['tick', 3.3 + i * 0.12, 0.018]),
    ['pluck', 4.75, 440, 0.03, 0.3, 0.3], ['whoosh', 5.3, 0.25, 0.025], ['whoosh', 6.6, 0.3, 0.025],
    ['pop', 7.05, 739.99, 0.04, 0], ['glitter', 7.05, 7.5],
    ['pop', 14.95, 1567.98, 0.04, -0.2], ['pop', 15.05, 1174.66, 0.03, -0.2], ['pluck', 15.65, 1174.66, 0.035, 0.5, -0.2], ['glitter', 15.0, 15.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
