// og-kbxe02: the social rework of kbxe02 ("Found their hoodie in the laundry"), star_advice. Same laundry room, Cancer,
// Sam (Pisces) and story; static HOOK (outline) from frame 0 instead of the slam title, no series bug, crazier Cancer.
// Kit: ./bxkit.js (og social copy of ../../kbxe01/bxkit.js; opening stretched 2.1 s so the hook reads over the draft).
//   0.00   frame 0: Cancer clutching the ex's hoodie, socks flying, the 3-paragraph draft on the phone, thumb creeping.
//   2.45   STOP slams ("it still smells like *them.*")   7.1 the three questions   14.5 the instead: backspace, the
//          clean text, SENT; Cancer hands the hoodie to Sam, who sobs into it.   18.1 "Return the hoodie. | Keep the *also.*"
import {
  shortBX, roomBedroom, pisces, sign, drawPhone, drawThumb, R, box, label, bubble, sparkles, drawBits, hearts,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD,
} from './bxkit.js'

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
const D1 = 'you left this. want it back? also i slept in it. also i miss u. also, chapter 2:'
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
    bubble(x, t, 780, 860, I.I0 + 4.6, I.D + 1, 'i will guard it with my LIFE', { size: 32, tail: 0, col: '#c9f2ff' })
  }
}

const EP = shortBX({
  id: 'og-kbxe02', sign: 'cancer', duration: 18, ending: 'cut', DE: 4.8, QL: 2.5,
  rec: { caption: 'it still smells like *them.*' },
  room: laundry, contact: 'Riley', sub: 'last seen Tuesday', clock: '6:40 PM', draft: D1, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.5] },
  pisRole: 'ROOMMATE',
  stars: ['Cancer. you are *wearing* it.', 'and the draft has a *chapter two.*'],
  qs: [
    { q: 'Is this about the hoodie?', a: 'mostly! like… 60% hoodie. 40% sobbing.', mood: 'squint' },
    { q: 'What’s the “also” really asking?', a: '…a three-hour phone call about us.', mood: 'neutral', look: [0, 1] },
    { q: 'Can a friend hand it over?', a: 'Sam lives near them! and owns a car!', mood: 'happy' },
  ],
  head: 'Cancer kept it | *logistics.*',
  lines: [{ t: 0.35, text: 'one sentence. zero *chapters.*' }, { t: 1.9, text: 'the *also* goes to a friend.' }],
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
export const LEAD = EP.T.L

// social hook: static caption from frame 0 (the film's own slam title is gone)
export const HOOK = 'Found their hoodie. | Drafted a *novel.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
