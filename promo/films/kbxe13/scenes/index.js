// kbxe13: BEFORE YOU TEXT YOUR EX, Ep 13, "You owe them an apology" (24 s vertical, star_advice post, cinematic · Dm).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.00   frame 0: Scorpio mid-wince, an old argument replaying in a thought bubble, thumb on SEND, STOP mid-drop.
//          Hook "You owe them an *apology.*"  Draft: "i'm sorry for how i left things. can we get coffee and talk?"
//   0.35   STOP + freeze ("this one might be *okay.*")
//   5.6    the check: 1 Is this for them, or for me? 2 Is there an ask hidden in it? 3 Can I let them not reply?
//   15.1   the twist: the check says send it, cleaned up. The ask backspaces away, "No need to reply." types in, SENT.
//          Scorpio puts the phone face down and breathes out. Pisces cries at the grown-up moment.
//   22.0   "Say sorry. Ask for *nothing.*"
import {
  shortBX, roomLiving, pisces, sign, drawPhone, drawThumb, R, bubble, sparkles, label, tag, glowAt,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'i’m sorry for how i left things. can we get coffee and talk?'
const KEEP = 'i’m sorry for how i left things. '
const ADD = 'No need to reply.'
const OLD = [{ stamp: 'JUN 2' }, { side: 'R', text: 'forget it. i’m done.' }, { side: 'L', text: '…ok' }]

function thought(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  x.save(); x.translate(250, 770)
  R(x, INK, -170, -110, 340, 220); R(x, '#e8e0f0', -164, -104, 328, 208)
  R(x, INK, -40, 116, 40, 30); R(x, '#e8e0f0', -34, 120, 28, 20); R(x, INK, -70, 160, 22, 22); R(x, '#e8e0f0', -66, 164, 14, 14)
  x.font = `800 28px ${INTER}`; x.fillStyle = '#c42a3f'; x.textAlign = 'center'; x.textBaseline = 'middle'
  const sh = 3 * Math.sin(t * 30)
  x.fillText('“you never listen!”', sh, -40); x.fillStyle = '#3a2d66'; x.fillText('“forget it. I’m done.”', -sh, 20)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#6a6488'; x.fillText('REPLAY · JUNE', 0, 76)
  x.restore()
}

function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  const down = u > 3.6
  if (!down) {
    let draft = DRAFT, typedK = 1
    if (u > 0.6 && u < 1.5) { draft = DRAFT; typedK = lerp(1, KEEP.length / DRAFT.length, prog(u, 0.6, 1.5)) }
    else if (u >= 1.5) { draft = KEEP + ADD; typedK = lerp(KEEP.length / draft.length, 1, prog(u, 1.6, 2.6)) }
    const sent = u > 3.1
    const old = sent ? [...OLD, { stamp: 'TODAY' }, { side: 'R', text: KEEP + ADD }, { stamp: 'delivered' }] : OLD
    const info = drawPhone(x, t, { cx: 600, cy: 960, w: 560, h: 820, rot: 0.02, contact: 'Jamie', sub: 'last seen in June', clock: '3:20 PM', old, draft: sent ? '' : draft, typedK: sent ? 1 : typedK, caret: !sent, press: u > 2.95 && u < 3.1 ? 1 : 0, sendCol: '#5fd38a' })
    if (u > 2.6 && u < 3.3) drawThumb(x, info.send.x + 20, info.send.y + 6 + (u > 2.95 ? 0 : 60), { rot: -0.3 })
    if (sent) sparkles(x, t, 760, 900, I.I0 + 3.1, 10, 120, 1, [GOLD, BONE, '#9fe6b0'])
    tag(x, '✓ PASSED THE CHECK', 600, 500, { size: 26, bg: '#5fd38a', k: pop01(t, I.I0 + 0.2, 0.3, 2) })
    sign(x, t, 'scorpio', { x: 175, y: 1280, s: 210, mood: u < 3.1 ? 'neutral' : 'happy', look: [1, -0.6], hops: [I.I0 + 0.6, I.I0 + 1.6, I.I0 + 3.1] })
  } else {
    // the phone face down; one breath out
    const k = pop01(t, I.I0 + 3.6, 0.35, 1.8)
    R(x, INK, 420, 1306, 240, 36); R(x, '#2b2350', 426, 1312, 228, 24)
    if (u < 4.6) label(x, 'face down.', 540, 1250, { size: 30, col: GOLD, k })
    const br = u > 4.0 ? 0.5 + 0.5 * Math.sin((u - 4.0) * 2.2) : 0
    sign(x, t, 'scorpio', { x: 360, y: 1130, s: 260, pop: k, mood: u < 4.0 ? 'happy' : 'sleepy', look: [0, 0], squash: -0.05 * br, hops: [I.I0 + 3.7] })
    if (u > 4.0) { x.save(); x.globalAlpha = 0.45; x.strokeStyle = '#9fe6b0'; x.lineWidth = 8; x.beginPath(); x.arc(360, 1100, 170 + 50 * br, 0, Math.PI * 2); x.stroke(); x.restore() }
    pisces(x, t, { x: 800, y: 1150, s: 230, tears: 3, mood: 'happy', look: [-1, 0], role: 'BEST FRIEND', pop: pop01(t, I.I0 + 3.8, 0.3, 2) })
    bubble(x, t, 800, 930, I.I0 + 4.3, I.D + 1, 'that was SO grown-up (sob)', { size: 28, col: '#c9f2ff' })
  }
  glowAt(x, 540, 960, 600, '159,230,176', 0.06)
}

const EP = shortBX({
  id: 'kbxe13', sign: 'scorpio', duration: 24, ending: 'cut', DE: 5.4, QL: 3.2,
  hook: { text: 'You owe them | an *apology.*', out: [5.1, 5.3], accentColor: '#9fe6b0' },
  rec: { sub: 'FIVE MONTHS LATER', caption: 'this one might be *okay.*' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Jamie', sub: 'last seen in June', clock: '3:14 PM', draft: DRAFT, old: OLD, draftExtra: thought,
  hero: { x: 175, y: 1260, s: 220, mood0: 'squint', mood: 'wide', look: [1, -0.6] },
  pisRole: 'BEST FRIEND',
  stars: ['wait. this one’s *different.*', 'still. three questions first.'],
  qs: [
    { q: 'Is this for them, or for me?', a: 'for them. they deserve it.', mood: 'neutral' },
    { q: 'Is there an ask hidden in it?', a: '…the coffee. yeah.', mood: 'squint', look: [0, 1] },
    { q: 'Can I let them not reply?', a: 'yes. I can.', mood: 'happy' },
  ],
  head: 'The check says: | *send it.* (cleaned up)',
  lines: [{ t: 0.9, text: 'an apology with no ask is a *gift.*' }, { t: 4.2, text: 'what they do with it is theirs.' }],
  instead,
  last: 'Say sorry. | Ask for *nothing.*',
  cues: I => [
    ['pop', I.I0 + 0.25, 1174.66, 0.05, 0], ['bell', I.I0 + 0.3, 1760, 0.025, 0.9, 0],
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(I.I0 + 0.65 + i * 0.09).toFixed(3), 0.03]),
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(I.I0 + 1.6 + i * 0.1).toFixed(3), 0.02]),
    ['pop', I.I0 + 3.1, 1318.51, 0.05, 0.2], ['whoosh', I.I0 + 3.05, 0.3, 0.04], ['bell', I.I0 + 3.15, 2093, 0.025, 1.2, 0],
    ['tom', I.I0 + 3.6, 90, { gain: 0.2, decay: 0.25 }], ['bell', I.I0 + 4.1, 1174.66, 0.02, 1.6, 0],
    ['pluck', I.I0 + 4.2, 659.25, 0.035, 0.5, 0.4], ['pluck', I.I0 + 4.34, 587.33, 0.035, 0.5, 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, ease, clamp, INTER]
