// ksre15: FALLING IN LOVE: SPEEDRUN · Capricorn: Assisted% (18 s vertical, star_talk post, Month 2 boost m03)
// music: funk · D. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: the group chat exploding (bubbles piling, the phone buzzing), Capricorn mid-flinch; the hook line.
//   0.4   shake · 1.4 Gemini "say 'hey stranger'" · 2.4 Leo "no. say 'dinner? my treat'" · 3.4 Pisces "tell them
//         they're the MOON" · 4.4 Aries "just CALL them" · 5.4 Virgo "check your spelling first"
//   6.6   Capricorn types its own: "want to get dinner friday?" · 8.4 send · 9.2 typing… · 10.0 "yes!! I'd love that"
//   10.6  the chat goes off · splits gold · 11.6 achievement · 16.0 "Best split: | the friends." · cut 18.0.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawPhone } from '../../ksre01/srkit.js'

const D = 18
const T = { shk: 0.4, own: 6.6, beg: 7.6, send: 8.4, typing: 9.2, yes: 10.0, party: 10.6, ach: 11.6, last: 16.0 }
const CHAT = [
  { at: -2.4, side: 'L', text: '♈︎ ARIES: WHAT DID THEY SAY' }, { at: -1.9, side: 'L', text: '♍︎ VIRGO: screenshot pls' },
  { at: -1.4, side: 'L', text: '♊︎ GEMINI: ok so what are we saying' }, { at: -0.9, side: 'L', text: '♌︎ LEO: something BOLD' }, { at: -0.4, side: 'L', text: '♓︎ PISCES: I’m already crying' },
  { at: 1.4, side: 'L', text: "♊︎ GEMINI: say 'hey stranger'" },
  { at: 2.4, side: 'L', text: "♌︎ LEO: no. say 'dinner? my treat'" },
  { at: 3.4, side: 'L', text: "♓︎ PISCES: tell them they're the MOON" },
  { at: 4.4, side: 'L', text: '♈︎ ARIES: just CALL them' },
  { at: 5.4, side: 'L', text: '♍︎ VIRGO: check your spelling first' },
]
const AFTER = [
  { at: T.party, side: 'L', text: '♌︎ LEO: !!!!!!' }, { at: T.party + 0.25, side: 'L', text: '♊︎ GEMINI: WE DID IT' }, { at: T.party + 0.5, side: 'L', text: '♓︎ PISCES: (sobbing)' },
  { at: T.party + 0.75, side: 'L', text: '♍︎ VIRGO: spelling: perfect' }, { at: T.party + 1.0, side: 'L', text: '♈︎ ARIES: told you. call next time' },
]
const SPLITS = [
  { name: 'GOT THEIR NUMBER', at: -1, time: '0:02.30', state: 'gold', delta: '' },
  { name: 'ASK THEM TO DINNER', at: T.yes, time: '0:12.00', state: 'gold', delta: '' },
  { name: 'ASSISTED BY: THE CHAT', at: T.party, time: '0:12.60', state: 'gold', delta: 'PB' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 2.0], [D, 2.0 + D]], t)), col: t > T.yes ? GOLD : GREEN, sub: t < T.own ? `ADVICE: ${Math.min(8, 3 + [1.4, 2.4, 3.4, 4.4, 5.4].filter(a => t > a).length)} MSGS` : t < T.yes ? 'OWN WORDS' : 'ASSISTED%', subCol: t < T.own ? RED : t > T.yes ? GOLD : undefined })
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: t < 1 ? 4 : 0 }
  if (t < T.yes) return { mood: 'sparkle', tears: 3, look: [-1, 0.8], say: "that's PERFECT", sayAt: T.beg, sayEnd: T.yes - 0.1, sayX: 690, sayY: 650 }
  return { mood: 'heart', tears: 3, look: [-1, 0.6], hops: [T.yes, T.party] }
}
function world(x, t, S) {
  S.level(x, t, { theme: 'room', floor: 1300 })
  // the group chat phone (frame 0: buzzing)
  const buzz = t < 1.2 ? 8 * Math.sin(t * 60) * (1 - t / 1.2) : [1.4, 2.4, 3.4, 4.4, 5.4].reduce((a, b) => a + (t > b && t < b + 0.2 ? 5 * Math.sin(t * 70) : 0), 0)
  const swap = t > T.own && t < T.party
  const msgs = swap
    ? [{ at: -1, side: 'L', text: '♎︎ them: hey!! long time' }, ...(t > T.send ? [{ at: T.send, side: 'R', text: 'want to get dinner friday?' }] : []), ...(t > T.yes ? [{ at: T.yes, side: 'L', text: "yes!! I'd love that" }] : [])]
    : t > T.party ? [...CHAT.slice(-3), ...AFTER] : CHAT
  drawPhone(x, t, { cx: 610 + buzz, top: 740, w: 680, h: 540, title: swap ? '♎︎ them' : 'the group chat (6)', msgs, font: 30, typing: swap ? [T.typing, T.yes] : null })
  if (!swap && t < T.own) { const k = 1 + 0.15 * Math.sin(t * 14); x.save(); x.translate(935 + buzz, 745); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, 0, 7); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 40, 0, 7); x.fill(); x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('99+', 0, 2); x.restore() }
  // the draft bar while typing its own words
  if (t > T.own - 0.2 && t < T.send) {
    const s = 'want to get dinner friday?', n = Math.floor(clamp((t - T.own) / 1.3) * s.length)
    S.pbox(x, 300, 1170, 620, 70, '#f4eefc', { b: 6 })
    x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(s.slice(0, n), 320, 1206)
    if (Math.sin(t * 12) > 0) x.fillRect(322 + x.measureText(s.slice(0, n)).width, 1190, 3, 32)
  }
  // Capricorn
  let mood = 'wide', look = [1, -0.5], rot = 0
  if (t < 0.6) rot = -0.15 * (1 - t / 0.6)
  if (t > 1.0) { mood = 'neutral'; look = [1, -0.5] }
  if (t > 4.4 && t < T.own) mood = 'squint'
  if (t > T.own) { mood = 'happy'; look = [1, 0] }
  if (t > T.send) { mood = 'neutral'; look = [1, -0.5] }
  if (t > T.yes) mood = 'heart'
  S.shadow(x, 150, 1302, 170)
  S.star(x, t, { id: 'capricorn', x: 150, y: 1220, s: 180, mood, look, rot, seed: 4, hops: [T.own, T.send, T.yes, T.party] })
}
function over(x, t, S) {
  S.stamp(x, 'TOO MANY CHEFS', 540, 640, pop01(t, 5.6, 0.2, 2.8) * outK(t, [T.own - 0.2, T.own]), { size: 52, col: RED, rot: -0.05 })
  S.stamp(x, 'OWN WORDS', 540, 640, pop01(t, T.own + 0.1, 0.2, 2.8) * outK(t, [T.send - 0.1, T.send + 0.1]), { size: 52, col: GREEN, rot: 0.05 })
}
const HOOK = { at: -1, text: 'THE GROUP CHAT IS | *routing my run.*', top: 600, size: 96, out: [1.2, 1.4] }
const SHK = { at: T.shk, len: 0.45, amp: 22 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'best *pit crew* in the game', y: 1520 }
const LAST = { at: T.last, text: 'Best split: | *the friends.*', top: 580, size: 116 }
const EP = makeRun({
  id: 'ksre15', duration: D, runner: 'capricorn', category: 'ASSISTED%',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: t => t < T.yes ? 1 : 2, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: shake(t, T.party, 12) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ...[0, 0.12, 0.24, 0.36, 0.5].map((d, i) => ['pop', d, 1174.66 * (1 + i * 0.1), 0.04, i % 2 ? 0.3 : -0.3]),
  ...[1.4, 2.4, 3.4, 4.4, 5.4].flatMap((a, i) => [['pop', a, 987.77 * (1 + i * 0.07), 0.045, 0.2], ['tick', a + 0.05, 0.04]]),
  ['pluck', 3.5, 440, 0.035, 0.5, 0.4], ['pluck', 3.7, 415.3, 0.035, 0.5, 0.4],
  ...Array.from({ length: 13 }, (_, i) => ['tick', +(T.own + i * 0.1).toFixed(3), 0.03]),
  ['whoosh', T.send, 0.3, 0.05], ['pop', T.send, 1318.51, 0.05, 0.3], ['tick', T.typing, 0.03], ['tick', T.typing + 0.15, 0.03],
  ['pop', T.yes, 1174.66, 0.05, -0.2], ['pop', T.yes + 0.1, 1567.98, 0.045, -0.2],
  ...AFTER.map((m, i) => ['pop', m.at, 1318.51 * (1 + i * 0.08), 0.04, i % 2 ? 0.3 : -0.3]), ['glitter', T.party, T.party + 1.0],
]
void [BONE, PINK, BLUE, MONO, lerp, ease, prog]
