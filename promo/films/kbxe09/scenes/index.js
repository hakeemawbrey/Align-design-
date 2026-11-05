// kbxe09: BEFORE YOU TEXT YOUR EX, Ep 9, "Their birthday reminder" (20 s vertical, star_advice post, pop · E).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Libra mid-flinch as a calendar alert slams in (THEIR BIRTHDAY), cake candles flaring, thumb on SEND
//          with "happy birthday!! hope ur well, also", STOP mid-drop. Hook "Their birthday reminder just *popped.*"
//   0.35   STOP + freeze ("the calendar *remembers.*")
//   5.2    the check: 1 Am I truly at peace with them? 2 Am I hoping for a reply? 3 Can I wish them well without a text?
//   13.2   instead: Libra deletes the reminder, lights one candle on a cupcake and wishes them well out loud. Pisces cries.
//   18.0   "Wish them well. *Quietly* counts."
import {
  shortBX, roomKitchen, roomLiving, pisces, sign, R, box, bubble, sparkles, label, tag, glowAt, drawBits,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'happy birthday!! hope ur well, also'
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
  for (let i = 0; i < 3; i++) candle(x, 120 + i * 40, 1015, t + i, 1 + 0.3 * Math.sin(t * 17 + i))
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
    x.save(); x.translate(540, 1110); x.scale(ck, ck)
    R(x, INK, -86, -20, 172, 100); R(x, '#c9a6ff', -80, -14, 160, 88); for (let i = 0; i < 5; i++) R(x, '#a888e0', -70 + i * 32, -14, 10, 88)
    R(x, INK, -96, -70, 192, 60); R(x, '#fff1f6', -90, -64, 180, 50); R(x, '#ff8fb1', -60, -56, 12, 12); R(x, '#9fe6b0', 20, -50, 12, 12)
    x.restore()
    candle(x, 540, 1040, t, clamp(prog(u, 2.6, 2.8)))
    if (u > 2.6) sparkles(x, t, 540, 960, I.I0 + 2.62, 8, 90, 2, [GOLD, '#ffb347', BONE])
  }
  sign(x, t, 'libra', { x: 260, y: 1200, s: 240, mood: u < 0.9 ? 'neutral' : u < 3.2 ? 'happy' : 'sleepy', look: [1, -0.2], hops: [I.I0 + 1.0, I.I0 + 2.6], blush: true })
  bubble(x, t, 330, 960, I.I0 + 3.2, I.D + 1, 'wishing you well. truly.', { size: 30 })
  pisces(x, t, { x: 840, y: 1200, s: 230, tears: u > 2.7 ? 3 : 2, mood: u > 2.7 ? 'happy' : 'sparkle', look: [-1, -0.2], role: 'ROOMMATE', pop: pop01(t, I.I0 + 0.3, 0.3, 2) })
}

const EP = shortBX({
  id: 'kbxe09', sign: 'libra', duration: 20, ending: 'loop', DE: 5.0, QL: 2.7,
  hook: { text: 'Their birthday reminder | just *popped.*', out: [4.7, 4.9], accentColor: '#ff8fb1' },
  rec: { sub: 'DEC 9 · 9:00 AM', caption: 'the calendar *remembers.*' },
  room: (x, t, S, a = 1) => roomKitchen(x, t, { a, steam: 0 }), contact: 'Rowan', sub: 'last seen in February', clock: '9:00 AM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['oh. *that* date.', 'kind thought. three questions.'],
  qs: [
    { q: 'Am I truly at peace with them?', a: '…getting there.', mood: 'squint' },
    { q: 'Am I hoping for a reply?', a: '…yes. a long one.', mood: 'neutral', look: [0, 1] },
    { q: 'Can I wish them well without a text?', a: 'oh. I can, actually.', mood: 'happy' },
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
