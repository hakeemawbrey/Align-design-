// kbxe02: BEFORE YOU TEXT YOUR EX, Ep 2, "Found their hoodie in the laundry" (18 s vertical, star_advice post, lofi · D).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Cancer mid-gasp holding up the ex's hoodie, socks flying out of the basket, thumb on SEND,
//          STOP mid-drop. Hook: "Found their hoodie. Drafted a *novel.*"  The draft: "you left this. want it back?
//          also i miss u".  0.35 STOP slams + freeze ("it still smells like *them.*").
//   5.0    the check: 1 Is this about the hoodie? 2 What's the "also" really asking? 3 Can a friend hand it over?
//   12.4   instead: the draft backspaces away, a new one types: "your hoodie's with Sam. Friday. take care." SENT.
//          Cancer hands the hoodie to Sam (Pisces), who hugs it and sobs.  16.0 "Return the hoodie. Keep the *also.*"
import {
  shortBX, roomBedroom, pisces, sign, drawPhone, drawThumb, R, box, label, bubble, sparkles, drawBits, hearts,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const HOODIE = ['..HHHHH..', '.HHHDHHH.', 'HHHHDHHHH', 'HHHHHHHHH', 'HH.HHH.HH', 'HH.PPP.HH', 'HH.HHH.HH', '...HHH...']
const hoodie = (x, cx, cy, cell, rot = 0, a = 1) => drawBits(x, HOODIE, { H: '#4f7cd8', D: '#efe6d6', P: '#3b5fb0' }, cx, cy, cell, { rot, alpha: a })

function laundry(x, t, S, a = 1) {
  roomBedroom(x, t, { a, lamp: false })
  x.save(); x.globalAlpha *= a
  box(x, 40, 1300, 260, 140, '#c9a6ff', { b: 6 }); for (let i = 0; i < 5; i++) R(x, '#a888e0', 60 + i * 48, 1316, 14, 110)
  x.restore()
}
// frame 0: socks flying out of the basket + the hoodie held up over Cancer's head
function draftExtra(x, t, S, { P }) {
  if (t < S.T.C0 - 0.3) {
    for (let i = 0; i < 5; i++) {
      const p = ((t + 0.4) * 0.9 + i * 0.17) % 1.2
      const sx = 170 + Math.cos(i * 1.7) * 220 * p, sy = 1300 - 600 * p + 520 * p * p
      if (sy < 1450) drawBits(x, ['SS', 'SS', 'SSS'], { S: ['#ff8fb1', '#efe6d6', '#9fe6b0', '#ffe27a', '#c9a6ff'][i] }, sx, sy, 12, { rot: p * 6 + i })
    }
    const bob = 10 * Math.sin(t * 6)
    hoodie(x, 190, 990 + bob, 22, -0.12 + 0.05 * Math.sin(t * 5))
  }
  void P
}

const OLD = [{ stamp: 'SEP 14' }, { side: 'R', text: 'i think we both know' }, { side: 'L', text: 'yeah. i know.' }]
const D1 = 'you left this. want it back? also i miss u'
const D2 = 'your hoodie’s with Sam. Friday. take care.'

function instead(x, t, S, I) {
  laundry(x, t, S)
  const u = t - I.I0
  // the phone: backspace the whole draft, type the clean one, send
  const pk = pop01(t, I.I0, 0.3, 1.6) * outK(t, [I.I0 + 3.3, I.I0 + 3.6])
  if (pk > 0.01) {
    let draft = D1, typedK = 1
    if (u < 1.0) typedK = 1 - prog(u, 0.25, 0.95)
    else { draft = D2; typedK = prog(u, 1.05, 2.1) }
    const sent = u > 2.45
    const old = sent ? [...OLD, { side: 'R', text: D2 }, { stamp: 'delivered' }] : OLD
    x.save(); x.translate(540, 980); x.scale(pk, pk); x.translate(-540, -980)
    const info = drawPhone(x, t, { cx: 560, cy: 980, w: 560, h: 820, rot: 0.03, contact: 'Riley', sub: 'last seen Tuesday', clock: '6:40 PM', old, draft: sent ? '' : draft, typedK: sent ? 1 : typedK, press: u > 2.3 && u < 2.5 ? 1 : 0, caret: !sent })
    if (u > 2.0 && u < 2.7) drawThumb(x, info.send.x + 20, info.send.y + 6 + (u > 2.3 ? 0 : 60), { rot: -0.3 })
    x.restore()
    if (u < 1.0 && u > 0.25) label(x, '⌫ ⌫ ⌫', 560, 1450, { size: 40, col: '#ff8fa0', k: 1 })
    if (sent) sparkles(x, t, 700, 900, I.I0 + 2.45, 10, 120, 1, [GOLD, BONE, '#9fe6b0'])
  }
  // the handoff: Cancer hands the hoodie to Sam (Pisces), who hugs it and sobs
  const hk = pop01(t, I.I0 + 3.5, 0.35, 2)
  if (hk > 0.01) {
    sign(x, t, 'cancer', { x: 300, y: 1150, s: 240, pop: hk, mood: 'happy', look: [1, 0], hops: [I.I0 + 3.8, I.I0 + 4.3] })
    const pass = ease.inOutCubic(prog(t, I.I0 + 3.9, I.I0 + 4.5))
    pisces(x, t, { x: 780, y: 1150, s: 240, pop: hk, tears: pass > 0.9 ? 3 : 2, mood: pass > 0.9 ? 'happy' : 'sparkle', look: [-1, 0], role: 'SAM · THE FRIEND' })
    hoodie(x, lerp(420, 760, pass), lerp(1020, 1110, pass), 16, lerp(-0.2, 0.1, pass))
    if (pass >= 1) hearts(x, t, I.I0 + 4.5, 780, 980, { n: 5 })
    bubble(x, t, 780, 860, I.I0 + 4.6, I.D + 1, 'i’ll take good care of it', { size: 32, tail: 0, col: '#c9f2ff' })
  }
}

const EP = shortBX({
  id: 'kbxe02', sign: 'cancer', duration: 18, ending: 'loop', DE: 4.8, QL: 2.5,
  hook: { text: 'Found their hoodie. | Drafted a *novel.*', out: [4.5, 4.7], accentColor: '#9fd8ff' },
  rec: { sub: 'LAUNDRY DAY', caption: 'it still smells like *them.*' },
  room: laundry, contact: 'Riley', sub: 'last seen Tuesday', clock: '6:40 PM', draft: D1, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.5] },
  pisRole: 'ROOMMATE',
  stars: ['easy, Cancer. it’s a *hoodie.*', 'a hoodie text is fine. three questions.'],
  qs: [
    { q: 'Is this about the hoodie?', a: 'mostly! like… 60% hoodie.', mood: 'squint' },
    { q: 'What’s the “also” really asking?', a: '…to talk about us again.', mood: 'neutral', look: [0, 1] },
    { q: 'Can a friend hand it over?', a: 'Sam lives near them!', mood: 'happy' },
  ],
  head: 'Cancer kept it | *logistics.*',
  lines: [{ t: 0.35, text: 'the hoodie text is *fine.*' }, { t: 1.9, text: 'the *also* belongs with a friend.' }],
  instead,
  last: 'Return the hoodie. | Keep the *also.*',
  cues: I => [
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(I.I0 + 0.3 + i * 0.075).toFixed(3), 0.03]),
    ['pop', I.I0 + 2.45, 1318.51, 0.05, 0.2], ['whoosh', I.I0 + 2.4, 0.3, 0.04], ['bell', I.I0 + 2.5, 1760, 0.025, 0.9, 0],
    ['whoosh', I.I0 + 3.9, 0.4, 0.035], ['pluck', I.I0 + 4.5, 659.25, 0.035, 0.5, 0.3], ['pluck', I.I0 + 4.64, 587.33, 0.035, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [easeOutBack, clamp, INK]
