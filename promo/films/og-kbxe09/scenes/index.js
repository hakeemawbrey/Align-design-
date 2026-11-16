// og-kbxe09: the social rework of kbxe09 ("Their birthday reminder"), star_advice. Same kitchen, Libra, the calendar alert,
// the cupcake candle and the quiet wish; static HOOK (box) instead of the slam title, no series bug, maximum-Libra Libra.
// Kit: ./bxkit.js (og social copy of ../../kbxe01/bxkit.js; opening stretched 2.1 s so the hook reads over the draft).
//   0.00  frame 0: Libra mid-flinch at the THEIR BIRTHDAY alert, candles flaring, the draft, thumb creeping to SEND.
//   2.45  STOP slams ("the calendar *remembers.*")   7.3 the three questions   15.3 the instead: reminder deleted, one
//         candle on a cupcake, a wish out loud; Pisces sobs.   20.1 "Wish them well. | *Quietly* counts."
import {
  shortBX, roomKitchen, roomLiving, pisces, sign, R, box, bubble, sparkles, label, tag, glowAt, drawBits,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from './bxkit.js'

const DRAFT = 'happy birthday!! (version 14 of 31) hope ur well, also'
const OLD = [{ stamp: 'FEB 11' }, { side: 'L', text: 'i wish you the best. truly' }, { side: 'R', text: 'same. take care' }]

function calendar(x, cx, cy, k, rot, crumple = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + crumple * 2); x.scale(k * (1 - crumple), k * (1 - crumple))
  R(x, INK, -150, -130, 300, 260); R(x, BONE, -144, -124, 288, 248); R(x, '#e8344e', -144, -124, 288, 70)
  x.font = `900 30px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEC 9', 0, -88)
  x.font = `900 92px ${INTER}`; x.fillStyle = INK; x.fillText('9', 0, 4)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#e8344e'; x.fillText('THEIR BIRTHDAY', 0, 84)
  x.restore()
}
function candle(x, cx, cy, t, lit = 1) {
  R(x, INK, cx - 9, cy - 60, 18, 64); R(x, '#ff8fb1', cx - 5, cy - 56, 10, 56)
  if (lit > 0) { const f = 1 + 0.15 * Math.sin(t * 23); drawBits(x, ['.F.', 'FYF', 'FYF', '.F.'], { F: '#ffb347', Y: '#fff1a8' }, cx, cy - 78, 7 * f * lit, { outline: null }); glowAt(x, cx, cy - 78, 120, '255,200,120', 0.35 * lit) }
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  const k = easeOutBack(prog(t, -0.5, 0.2), 1.8)
  calendar(x, 235, 760, k, -0.1 + 0.02 * Math.sin(t * 9))
  for (let i = 0; i < 3; i++) candle(x, 120 + i * 40, 945, t + i, 1 + 0.3 * Math.sin(t * 17 + i))
}

function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  // the reminder: crumples away → "reminder deleted"
  calendar(x, 540, 760, pop01(t, I.I0, 0.3, 1.6), -0.04, ease.inCubic(prog(u, 0.9, 1.5)))
  if (u > 1.5) tag(x, 'REMINDER DELETED', 540, 700, { size: 28, bg: GOLD, k: pop01(t, I.I0 + 1.5, 0.3, 2) * outK(t, [I.I0 + 2.6, I.I0 + 2.9]) })
  // the cupcake + one candle, lit at u = 2.6, a wish at u = 3.2
  const ck = pop01(t, I.I0 + 2.2, 0.35, 2)
  if (ck > 0.01) {
    x.save(); x.translate(540, 1050); x.scale(ck, ck)
    R(x, INK, -86, -20, 172, 100); R(x, '#c9a6ff', -80, -14, 160, 88); for (let i = 0; i < 5; i++) R(x, '#a888e0', -70 + i * 32, -14, 10, 88)
    R(x, INK, -96, -70, 192, 60); R(x, '#fff1f6', -90, -64, 180, 50); R(x, '#ff8fb1', -60, -56, 12, 12); R(x, '#9fe6b0', 20, -50, 12, 12)
    x.restore()
    candle(x, 540, 980, t, clamp(prog(u, 2.6, 2.8)))
    if (u > 2.6) sparkles(x, t, 540, 900, I.I0 + 2.62, 8, 90, 2, [GOLD, '#ffb347', BONE])
  }
  sign(x, t, 'libra', { x: 260, y: 1120, s: 240, mood: u < 0.9 ? 'neutral' : u < 3.2 ? 'happy' : 'sleepy', look: [1, -0.2], hops: [I.I0 + 1.0, I.I0 + 2.6], blush: true })
  bubble(x, t, 400, 860, I.I0 + 3.2, I.D + 1, 'wishing you well. in a balanced, tasteful way.', { size: 30, maxW: 520 })
  pisces(x, t, { x: 820, y: 1110, s: 230, tears: u > 2.7 ? 3 : 2, mood: u > 2.7 ? 'happy' : 'sparkle', look: [-1, -0.2], role: 'ROOMMATE', pop: pop01(t, I.I0 + 0.3, 0.3, 2) })
}

const EP = shortBX({
  id: 'og-kbxe09', sign: 'libra', duration: 20, ending: 'cut', DE: 5.0, QL: 2.7,
  rec: { caption: 'the calendar *remembers.*' },
  room: (x, t, S, a = 1) => roomKitchen(x, t, { a, steam: 0 }), contact: 'Rowan', sub: 'last seen in February', clock: '9:00 AM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['Libra. *thirty-one* drafts?', 'and a poll of six friends. three questions.'],
  qs: [
    { q: 'Am I truly at peace with them?', a: '…on a scale of 1 to 10? 5. perfectly balanced.', mood: 'squint' },
    { q: 'Am I hoping for a reply?', a: '…yes. a long one. with a compliment.', mood: 'neutral', look: [0, 1] },
    { q: 'Can I wish them well without a text?', a: 'oh. zero drafts needed?? ICONIC.', mood: 'happy' },
  ],
  head: 'Libra wished | them *well.*',
  lines: [{ t: 0.4, text: 'a kind thought doesn’t need *delivery.*' }],
  instead,
  last: 'Wish them well. | *Quietly* counts.', lastLate: 2,
  cues: I => [
    ['whoosh', I.I0 + 0.9, 0.5, 0.04], ['tick', I.I0 + 1.0, 0.05], ['tick', I.I0 + 1.15, 0.05], ['pop', I.I0 + 1.5, 1174.66, 0.04, 0],
    ['whoosh', I.I0 + 2.2, 0.3, 0.03], ['pluck', I.I0 + 2.6, 1567.98, 0.04, 0.6, 0], ['glitter', I.I0 + 2.62, I.I0 + 3.0],
    ['pluck', I.I0 + 2.9, 659.25, 0.03, 0.5, 0.4], ['pluck', I.I0 + 3.04, 587.33, 0.03, 0.5, 0.4], ['bell', I.I0 + 3.3, 1318.51, 0.02, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, label, lerp]
export const LEAD = EP.T.L

// social hook: static caption from frame 0 (the film's own slam title is gone)
export const HOOK = 'My ex’s birthday | reminder *popped.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
