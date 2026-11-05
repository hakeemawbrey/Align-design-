// kbxe15: BEFORE YOU TEXT YOUR EX, Ep 15, "You still have their keys" (18 s vertical, star_advice post, house · Bb).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Aries mid-juggle with a jangling key ring, keys flying, thumb on SEND with "i have ur keys. can we talk
//          about everything", STOP mid-drop. Hook "You still have their *keys.*"  0.35 STOP + freeze ("a key ring.
//          *and* a whole speech.")
//   5.0    the check: 1 What does this text need to do? 2 What's the extra line for? 3 Can it be two sentences?
//   12.4   instead: the draft becomes "Your keys are with Sam. Take care." SENT. Sam (Pisces) holds the keys, sobbing.
//   16.0   "Logistics only. Feelings to *friends.*"
import {
  shortBX, roomLiving, pisces, sign, drawPhone, drawThumb, R, bubble, sparkles, label, tag, drawBits,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'i have ur keys. can we talk about everything'
const D2 = 'Your keys are with Sam. Take care.'
const OLD = [{ stamp: 'SEP 28' }, { side: 'L', text: 'i’ll grab my things this week' }, { side: 'R', text: 'ok' }]

const KEY = ['.GGG......', 'GG.GGGGGGG', 'GG.GG.G.G.', '.GGG......']
function keyring(x, cx, cy, t, s = 1, spin = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#c9c2e8'; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 3; i++) drawBits(x, KEY, { G: ['#f2c75c', '#c9c2e8', '#ff8f5a'][i] }, Math.cos(i * 2.1 + spin) * 60, Math.sin(i * 2.1 + spin) * 60, 7, { rot: i * 2.1 + spin })
  x.restore()
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  for (let i = 0; i < 3; i++) {
    const p = ((t + 0.3) * 1.6 + i / 3) % 1
    const kx = 175 + Math.cos(Math.PI * p) * 120 * (i % 2 ? 1 : -1), ky = 1030 - Math.sin(Math.PI * p) * 300
    drawBits(x, KEY, { G: ['#f2c75c', '#c9c2e8', '#ff8f5a'][i] }, kx, ky, 9, { rot: p * 9 + i })
  }
  label(x, 'jingle', 330, 860, { size: 30, col: GOLD, rot: 0.15 })
}

function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  const pk = pop01(t, I.I0, 0.3, 1.6) * outK(t, [I.I0 + 2.9, I.I0 + 3.2])
  if (pk > 0.01) {
    let draft = DRAFT, typedK = 1
    if (u < 0.9) typedK = 1 - prog(u, 0.2, 0.85)
    else { draft = D2; typedK = prog(u, 0.95, 1.8) }
    const sent = u > 2.1
    const old = sent ? [...OLD, { side: 'R', text: D2 }, { stamp: 'delivered' }] : OLD
    x.save(); x.translate(560, 960); x.scale(pk, pk); x.translate(-560, -960)
    const info = drawPhone(x, t, { cx: 560, cy: 960, w: 560, h: 820, rot: 0.02, contact: 'Taylor', sub: 'last seen in September', clock: '1:05 PM', old, draft: sent ? '' : draft, typedK: sent ? 1 : typedK, caret: !sent, press: u > 1.95 && u < 2.1 ? 1 : 0 })
    if (u > 1.6 && u < 2.3) drawThumb(x, info.send.x + 20, info.send.y + 6 + (u > 1.95 ? 0 : 60), { rot: -0.3 })
    x.restore()
    if (sent) { sparkles(x, t, 720, 900, I.I0 + 2.1, 10, 120, 1, [GOLD, BONE]); tag(x, 'TWO SENTENCES ✓', 560, 470, { size: 26, bg: '#5fd38a', k: pop01(t, I.I0 + 2.15, 0.3, 2) }) }
  }
  const hk = pop01(t, I.I0 + 3.1, 0.35, 2)
  if (hk > 0.01) {
    sign(x, t, 'aries', { x: 300, y: 1150, s: 240, pop: hk, mood: 'happy', look: [1, 0], hops: [I.I0 + 3.4] })
    const pass = ease.inOutCubic(prog(t, I.I0 + 3.4, I.I0 + 3.9))
    pisces(x, t, { x: 780, y: 1150, s: 240, pop: hk, tears: pass > 0.9 ? 3 : 2, mood: pass > 0.9 ? 'happy' : 'sparkle', look: [-1, 0], role: 'SAM · THE FRIEND' })
    keyring(x, lerp(420, 740, pass), lerp(1040, 1120, pass), t, 0.9, t * 2)
    bubble(x, t, 780, 880, I.I0 + 4.0, I.D + 1, 'i’ll get them home (sob)', { size: 30, col: '#c9f2ff' })
  }
}

const EP = shortBX({
  id: 'kbxe15', sign: 'aries', duration: 18, ending: 'loop', DE: 4.8, QL: 2.5,
  hook: { text: 'You still have | their *keys.*', out: [4.5, 4.7], accentColor: GOLD },
  rec: { sub: '1:02 PM', caption: 'a key ring *and* a whole speech.' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Taylor', sub: 'last seen in September', clock: '1:02 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1250, s: 220, mood0: 'happy', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['Aries! keys are *logistics.*', 'logistics. still: three questions.'],
  qs: [
    { q: 'What does this text need to do?', a: 'get the keys home.', mood: 'neutral' },
    { q: 'What’s the extra line for?', a: '…to start the big talk.', mood: 'squint', look: [0, 1] },
    { q: 'Can it be two sentences?', a: 'two. short. done.', mood: 'happy' },
  ],
  head: 'Aries kept it | *short.*',
  lines: [{ t: 0.3, text: 'the keys text is *fine.* keep it short.' }],
  instead,
  last: 'Logistics only. | Feelings to *friends.*',
  cues: I => [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.5 + i * 0.6).toFixed(2), 0.025]),
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(I.I0 + 0.2 + i * 0.07).toFixed(3), 0.03]),
    ['pop', I.I0 + 2.1, 1318.51, 0.05, 0.2], ['whoosh', I.I0 + 2.05, 0.3, 0.04], ['bell', I.I0 + 2.15, 1760, 0.025, 0.9, 0],
    ['whoosh', I.I0 + 3.4, 0.4, 0.035], ['pluck', I.I0 + 3.9, 659.25, 0.035, 0.5, 0.3], ['pluck', I.I0 + 4.04, 587.33, 0.035, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp]
