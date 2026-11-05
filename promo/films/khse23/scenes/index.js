// khse23: ZODIAC HOT SEAT, "The full hot seat: Aquarius" (60 s LONG trial reel). Kit: ../../khse01/scenes/hotkit.js.
// The promise is on screen from frame 0 ("Wait for the last question."); six chapter stickers; a new gag every ~3 s
// and a kit beat every ~8–10 s (incoming call, feelings loading bar, a glitch, a notification). Hard cut on the line.
//   0.00  frame 0: Aquarius mid-yelp, the chair mid-spin at full speed, a whip zoom mid-punch; the hook
//         "60 seconds. *Wait for the last question.*"
//   ① WARM-UP · ② TEXTING (the phone rings: Aquarius declines it) · ③ FEELINGS (loading "finding feelings…" stalls at
//   2%; a glitch "AQUARIUS.EXE is processing") · ④ THE EX · ⑤ THE CRUSH (a text drops: Pisces "how did it go??")
//   ⑥ THE LAST QUESTION (silence): "Who gets to see the real you?" → "…honestly? Pisces." Pisces sobs; tissues fly.
//   THE STARS: "Let one person see *the whole thing.*"
import { makeHotSeat, HK, R, INK, prog, ease } from '../../khse01/scenes/hotkit.js'

const H = 2.0
const QS = [
  // ① WARM-UP
  { q: 'Favourite *planet?*', a: 'the cold one.', mood: 'happy', gap: 3.0 },
  { q: 'Do you like *people?*', a: 'in theory.', mood: 'squint', gap: 3.0 },
  { q: 'Small *talk?*', a: '…can we skip to aliens?', mood: 'sparkle', gap: 3.2 },
  // ② TEXTING
  { q: 'Reply *speed?*', a: 'a week. but it’s a deep reply.', mood: 'neutral', gap: 3.3 },
  { q: 'Read *receipts?*', a: 'off. I like mystery.', mood: 'squint', gap: 3.1 },
  { q: 'They’re calling. *Answer?*', a: '…I’ll text. later.', mood: 'wide', gap: 4.4, ansDelay: 3.0 },
  // ③ FEELINGS
  { q: 'Feelings, *out of 10?*', a: 'still loading…', mood: 'squint', gap: 4.2, ansDelay: 3.0 },
  { q: 'Last time you *cried?*', a: 'a documentary. about whales.', mood: 'neutral', gap: 3.4 },
  { q: 'Say “I care” *out loud?*', a: '…I care. there. that was weird.', mood: 'happy', gap: 3.8, ansDelay: 1.5 },
  // ④ THE EX
  { q: 'Still friends with *your ex?*', a: 'we send each other articles.', mood: 'happy', gap: 3.4 },
  { q: 'Miss *them?*', a: 'I miss the articles.', mood: 'squint', gap: 3.2 },
  { q: 'Would you *go back?*', a: '…no. but they can keep the articles.', mood: 'happy', gap: 3.4 },
  // ⑤ THE CRUSH
  { q: 'Got a *crush?*', a: 'define “crush.”', mood: 'neutral', gap: 3.3 },
  { q: 'Who just *texted?*', a: '…my best friend.', mood: 'happy', gap: 3.6, ansDelay: 1.5 },
  { q: 'Do they *know you?*', a: 'better than I do.', mood: 'sparkle', gap: 3.5 },
]
const at = []; { let t = H; for (const q of QS) { at.push(t); t += q.gap } at.push(t) }
const FQ = at[QS.length]
const CH = [[0, 'warm-up'], [3, 'texting'], [6, 'feelings'], [9, 'the ex'], [12, 'the crush'], [15, 'the last question']]
const chapters = CH.map(([i, title], n) => { const a = at[i] - 0.05, b = n + 1 < CH.length ? at[CH[n + 1][0]] - 0.3 : FQ + 3.2; return [HK.chapter, HK.chapterCues, { at: a, out: [b - 0.15, b], n: n + 1, title, x: 56, y: 1440 }] })
const CALL = { at: at[5] + 0.4, out: [at[5] + 2.75, at[5] + 2.9], name: '*Pisces*', sub: 'incoming call…', glyph: '♓︎', color: '#a9a0ff', declineAt: at[5] + 2.3 }
const LOAD = { at: at[6] + 0.4, len: 2.6, label: 'finding feelings…', stallAt: 2, error: 'Error: feelings found', y: 1180 }
const GLITCH = { at: at[8] + 0.35, len: 1.0, text: 'AQUARIUS.EXE is *processing*' }
const NOTE = { at: at[13] - 0.5, out: [at[13] + 1.3, at[13] + 1.5], title: 'messages', body: 'Pisces: how did it *go??*', glyph: '♓︎', time: 'now', y: 1300 }

// tissues flying out of the booth after the final answer (screen space, top layer)
function tissues(x, t, t0) {
  for (let i = 0; i < 14; i++) {
    const b = t0 + i * 0.13, p = (t - b) / 1.6
    if (p < 0 || p > 1) continue
    const px = 1000 - 260 * p * (0.5 + (i % 5) / 6) + 30 * Math.sin(t * 4 + i), py = 1540 - 520 * p + 600 * p * p * 0.6
    x.save(); x.globalAlpha = 1 - p; x.translate(px, py); x.rotate(t * 3 + i)
    R(x, INK, -20, -16, 40, 32); R(x, '#ffffff', -16, -12, 32, 24); x.restore()
  }
}

const EP = makeHotSeat({
  id: 'khse23', sign: 'aquarius', name: 'Aquarius', accent: '#7fd0ff',
  hook: '60 seconds. | *Wait for the last question.*', hookSize: 92,
  hookLen: H, breakFx: 'whip', breakAt: 0.25,
  chair: { spin: t => (1 - ease.inOutCubic(prog(t, H - 0.5, H))) * ((t * 2.6) % 2 - 1) },
  hero0: { x: 540, y: 1000, s: 290, mood: 'wide', rot: 0.2, look: [0, -1] },
  qs: QS,
  fx: [...chapters, [HK.incomingCall, HK.incomingCallCues, CALL], [HK.loadingBar, HK.loadingBarCues, LOAD], [HK.glitch, HK.glitchCues, GLITCH], [HK.notification, HK.notificationCues, NOTE]],
  final: { q: 'Who gets to see *the real you?*', a: '…honestly? Pisces.', mood: 'neutral', endMood: 'heart', ansDelay: 1.4, hold: 2.4 },
  overlay(x, t, S) { tissues(x, t, S.T.fa + 0.4) },
  last: 'Let one person see *the whole thing.*',
  tail: 1.6,
  ending: 'cut',
  music: { style: 'synthwave', key: 'F#m', seed: 3523 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
