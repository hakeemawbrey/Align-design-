// kbxe01: BEFORE YOU TEXT YOUR EX, Ep 1, "The 2 a.m. 'u up?' draft" (20 s vertical, star_advice post, music: screwed · Em).
// The series look lives in ../bxkit.js (shared by kbxe01–20, built on the hookkit). No end card: hard cut on the last line.
//   0.00   frame 0: Scorpio's thumb mid-plunge onto SEND, the STOP sign mid-drop, the hook "2 a.m. Ex draft. STOP."
//   0.35   STOP slams: shake, record scratch + freeze ("the thumb was *this* close."). Pisces (roommate) in the doorway.
//   1.9    THE STARS: "whoa. thumb off the glass." → 2.9 the sign flips: 3 QUESTIONS FIRST.
//   5.2    the check: 1 What do I want from this text? ("…honestly? a reply.") 2 How will I feel at 9 a.m.? (a cringe
//          meter) 3 Is this for them, or for 2 a.m. me? ("…2 a.m. me.")
//   13.6   instead: the draft goes into a note called NOT SENT; the phone goes face down; Scorpio sleeps. Pisces happy-cries.
//   18.0   last line "Two a.m. is not a *decision.*" lands 19.05, holds, hard cut at 20.
import {
  makeBX, roomBedroom, pisces, sign, drawPhone, R, box, label, tag, bubble, sparkles, glowAt, drawBits, wrap,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, tearsAt, INK, BONE, GOLD, INTER, MONO, PINK,
} from '../bxkit.js'

const D = 20
const T = { stop: 0.35, flip: 2.9, check: 5.2, q: [5.4, 8.1, 10.8], instead: 13.6, note: [13.7, 15.2], facedown: 15.5, sleep: 16.2, last: 18.0, land: 19.05 }

const DRAFT = 'u up? just wondering how you are'
const OLD = [{ stamp: 'OCT 3' }, { side: 'L', text: 'take care of yourself ok' }, { side: 'R', text: 'you too' }]

// the cringe meter for question 2
function cringe(x, t) {
  const a = T.q[1] + 0.9, k = pop01(t, a, 0.3, 2) * outK(t, [T.q[2] - 0.1, T.q[2] + 0.1])
  if (k <= 0.01) return
  const f = ease.outCubic(prog(t, a + 0.2, a + 1.2))
  x.save(); x.translate(860, 1120); x.scale(k, k)
  R(x, INK, -50, -230, 100, 460); R(x, '#2a1f55', -40, -220, 80, 440)
  const h = 440 * f
  for (let i = 0; i < 11; i++) { const y = 220 - (i + 1) * 40; if (220 - y <= h + 1) R(x, i > 7 ? '#ff4f6a' : i > 4 ? '#ffb347' : '#ffe27a', -34, y + 4, 68, 32) }
  x.restore()
  label(x, 'CRINGE', 860, 860, { size: 28, col: '#ff8fa0', k })
  if (f > 0.95) label(x, 'MAX', 860, 1390, { size: 34, col: '#ff4f6a', k, rot: -0.1 })
}

// the "instead": the note, the phone face down, the sleep
function instead(x, t, S) {
  roomBedroom(x, t, { lamp: t < T.sleep })
  const dim = clamp(prog(t, T.sleep, T.sleep + 0.6))
  // bed
  box(x, 80, 1190, 760, 240, '#4b3d8a', { b: 8 }); R(x, 'rgba(255,255,255,0.1)', 80, 1190, 760, 22)
  box(x, 110, 1130, 200, 90, BONE, { b: 6 })
  // Scorpio: sitting up with the phone → lying down asleep
  const lie = ease.inOutCubic(prog(t, T.sleep - 0.2, T.sleep + 0.4))
  sign(x, t, 'scorpio', { x: lerp(320, 230, lie), y: lerp(1040, 1110, lie), s: 230, mood: t < T.note[1] ? 'neutral' : t < T.sleep ? 'happy' : 'sleepy', look: t < T.facedown ? [1, 0.4] : undefined, hops: [T.instead + 0.2, T.facedown + 0.05], squash: lie * 0.2 })
  // the blanket over Scorpio once asleep
  if (lie > 0.01) { x.save(); x.globalAlpha = lie; box(x, 150, 1150, 640, 120, '#6a58b8', { b: 6 }); R(x, 'rgba(255,255,255,0.12)', 150, 1150, 640, 18); x.restore() }
  // the note (a notes-app page) in Scorpio's hand
  const nk = pop01(t, T.note[0], 0.35, 1.8) * outK(t, [T.facedown - 0.2, T.facedown])
  if (nk > 0.01) {
    x.save(); x.translate(640, 900); x.rotate(0.05); x.scale(nk, nk)
    R(x, INK, -230, -300, 460, 600); R(x, '#fff6c8', -220, -290, 440, 580)
    for (let i = 0; i < 9; i++) R(x, '#eadc9a', -200, -170 + i * 52, 400, 3)
    x.font = `900 46px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('NOT SENT', -196, -228)
    x.font = `600 34px ${INTER}`; x.fillStyle = '#3a2d66'
    const typed = DRAFT.slice(0, Math.round(DRAFT.length * prog(t, T.note[0] + 0.3, T.note[1])))
    wrap(x, typed, 380).forEach((l, i) => x.fillText(l, -196, -146 + i * 52))
    x.restore()
  }
  // the phone lands face down on the nightstand
  box(x, 860, 1260, 180, 160, '#3a2d66', { b: 6 })
  if (t > T.facedown - 0.3) {
    const d = easeOutBack(prog(t, T.facedown - 0.3, T.facedown), 1.2)
    const py = lerp(900, 1236, d)
    x.save(); x.translate(950, py); x.rotate(lerp(0.6, 0, d)); R(x, INK, -82, -20, 164, 40); R(x, '#2b2350', -76, -14, 152, 28); R(x, '#3a3066', -20, -8, 40, 8); x.restore()
    sparkles(x, t, 950, 1236, T.facedown, 8, 80, 2, [GOLD, BONE])
    if (t > T.facedown + 0.1) label(x, 'face down.', 950, 1170, { size: 30, col: GOLD, k: pop01(t, T.facedown + 0.1, 0.25, 2) })
  }
  // lights out: dim the room, z's rise
  if (dim > 0) { x.save(); x.fillStyle = `rgba(5,4,16,${0.42 * dim})`; x.fillRect(0, 430, 1080, 1490); x.restore() }
}

function pis(x, t) {
  // the roommate in the doorway (right), sniffling at 2 a.m., then happy-crying
  if (t < T.check) {
    box(x, 900, 560, 200, 560, '#120d26', { b: 8 }); glowAt(x, 1000, 760, 200, '255,214,150', 0.18)
    pisces(x, t, { x: 985, y: 760, s: 150, tears: t < 0.35 ? 1 : 2, mood: t < 0.35 ? 'sparkle' : 'wide', look: [-1, 0.2], role: 'ROOMMATE' })
  } else if (t < T.instead) {
    pisces(x, t, { x: 960, y: 1440, s: 130, tears: tearsAt(t, [[0, 1], [T.q[1] + 1, 2], [T.q[2] + 1.6, 3]]), mood: 'sparkle', look: [-1, -0.6], pop: pop01(t, T.check + 0.3, 0.3, 2) })
  } else {
    box(x, 900, 560, 200, 560, '#120d26', { b: 8 })
    pisces(x, t, { x: 985, y: 760, s: 150, tears: t > T.facedown ? 3 : 2, mood: t > T.facedown ? 'happy' : 'sparkle', look: [-1, 0.4], pop: pop01(t, T.instead + 0.2, 0.3, 2) })
    if (t > T.sleep + 0.3) bubble(x, t, 860, 560, T.sleep + 0.3, T.last, 'so proud. (sniff)', { size: 30, tail: 0.6, col: '#c9f2ff' })
  }
}

const EP = makeBX({
  id: 'kbxe01', sign: 'scorpio', duration: D, T, ending: 'cut',
  hook: { text: '2 a.m. Ex draft. | *STOP.*', out: [4.9, 5.1], accentColor: '#ff5a6a' },
  shakes: [{ at: T.stop, len: 0.5, amp: 30 }],
  recs: [{ at: T.stop + 0.07, len: 1.25, sub: '2:07 AM', caption: 'the thumb was *this* close.' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.check, stopAt: T.stop, flipAt: T.flip, room: (x, t) => roomBedroom(x, t), contact: 'Jordan', sub: 'last seen 2:01 AM', clock: '2:07 AM', draft: DRAFT, old: OLD,
      hero: { x: 175, y: 1250, s: 220, mood0: 'squint', mood: 'wide' } },
    { kind: 'check', t0: T.check, t1: T.instead, room: (x, t) => roomBedroom(x, t, { a: 0.7 }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960 },
      extra: cringe,
      qs: [
        { q: 'What do I want from this text?', a: '…honestly? a reply.', at: T.q[0], mood: 'squint', tick: 1.9 },
        { q: 'How will I feel at 9 a.m.?', a: 'oh no. cringing.', at: T.q[1], mood: 'wide', look: [1, 0], tick: 1.9 },
        { q: 'Is this for them, or for 2 a.m. me?', a: '…2 a.m. me.', at: T.q[2], mood: 'sleepy', tick: 1.9 },
      ] },
    { kind: 'scene', t0: T.instead, t1: D + 0.1, draw: instead },
  ],
  heads: [
    { text: 'Before you send: | *three* questions.', at: T.check + 0.05, out: [T.instead - 0.25, T.instead - 0.05], size: 88 },
    { text: 'So Scorpio did | this *instead.*', at: T.instead + 0.05, out: [T.last - 0.25, T.last - 0.05], size: 92 },
    { text: 'Two a.m. is not | a *decision.*', at: T.last, late: 1, lateAt: T.land, size: 100, accent: GOLD },
  ],
  boxes: [
    { lines: [{ t: 1.9, speaker: 'THE STARS', text: 'whoa. thumb *off* the glass.' }, { t: 3.4, speaker: 'THE STARS', text: 'three questions first. honest ones.' }], open: 1.75, close: 5.0 },
    { lines: [{ t: 14.2, speaker: 'THE STARS', text: 'write it down. send it to *no one.*' }, { t: 15.9, speaker: 'THE STARS', text: 'decide in daylight.' }], open: 14.05, close: 17.3 },
  ],
  pis,
  cues: [
    ['pluck', 0.6, 659.25, 0.03, 0.5, 0.3], ['pluck', 0.72, 587.33, 0.03, 0.5, 0.3],
    ['riser', T.q[1] + 1.1, T.q[1] + 2.1, 0.03], ['pop', T.q[1] + 2.1, 1567.98, 0.04, 0.3],
    ['whoosh', T.facedown - 0.3, 0.3, 0.04], ['tom', T.facedown, 90, { gain: 0.25, decay: 0.25 }], ['tick', T.facedown, 0.07],
    ['pluck', T.facedown + 0.2, 659.25, 0.035, 0.5, 0.4], ['pluck', T.facedown + 0.34, 587.33, 0.035, 0.5, 0.4],
    ['bell', T.sleep + 0.1, 1318.51, 0.02, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawPhone, tag, drawBits, MONO, PINK]
