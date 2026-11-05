// kbxe10: BEFORE YOU TEXT YOUR EX, Ep 10, "At the café you planned to visit" (18 s, star_advice post, synthwave · Am).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.00   frame 0: Sagittarius mid-skid into a café doorway, suitcase sliding, thumb on SEND with "guess where i am",
//          STOP mid-drop. Hook "You're at *the* café. Alone."  0.35 STOP + freeze ("the one from *the list.*")
//   5.0    the check: 1 Is this a plan, or a ghost of one? 2 What do I want them to feel? 3 Can I enjoy it for me?
//   12.4   instead: Sag orders, takes one photo just for themselves (FOR ME), and chats with the barista (Pisces), who
//          cries at the latte heart.  16.0 "Same café. *New* story."
import {
  shortBX, roomCafe, pisces, sign, R, box, bubble, sparkles, label, tag, glowAt, drawBits, HEART,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'guess where i am'
const OLD = [{ stamp: 'JAN 20' }, { side: 'L', text: 'we never did go to that café' }, { side: 'R', text: 'next life maybe' }]

function suitcase(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -80, -60, 160, 120); R(x, '#4fb08a', -74, -54, 148, 108); R(x, INK, -24, -80, 48, 24); R(x, '#ffe27a', -60, -10, 120, 12); x.restore() }
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  const sl = ((t + 0.4) * 300) % 300
  suitcase(x, 330 - sl * 0.3, 1370, -0.08 + 0.04 * Math.sin(t * 12))
  for (let i = 0; i < 5; i++) R(x, 'rgba(255,255,255,0.4)', 10 + i * 30, 1180 + i * 30, 90, 6)
}

function instead(x, t, S, I) {
  roomCafe(x, t)
  const u = t - I.I0
  // the counter + the barista
  box(x, 560, 1180, 500, 200, '#8a6442', { b: 8 })
  pisces(x, t, { x: 810, y: 1060, s: 220, tears: u > 2.3 ? 3 : 1, mood: u > 2.3 ? 'happy' : 'sparkle', look: [-1, 0.2], role: 'BARISTA' })
  // the latte with a heart
  const lk = pop01(t, I.I0 + 0.5, 0.3, 2)
  if (lk > 0.01) { x.save(); x.translate(640, 1150); x.scale(lk, lk); R(x, INK, -56, -40, 112, 80); R(x, BONE, -50, -34, 100, 68); R(x, '#a06a40', -40, -30, 80, 24); x.restore(); drawBits(x, HEART, { H: BONE }, 640, 1130, 5 * lk, { outline: null }) }
  sign(x, t, 'sagittarius', { x: 300, y: 1150, s: 250, mood: u < 0.5 ? 'neutral' : 'happy', look: [1, -0.2], hops: [I.I0 + 0.5, I.I0 + 1.4, I.I0 + 2.4] })
  // one photo, just for me
  if (u > 1.2 && u < 2.3) {
    x.save(); x.translate(420, 900); x.rotate(-0.1); R(x, INK, -60, -90, 120, 180); R(x, '#2b2350', -54, -84, 108, 168); x.restore()
    const fl = 1 - prog(u, 1.5, 1.75); if (u > 1.5 && fl > 0) { x.save(); x.fillStyle = `rgba(255,255,255,${0.6 * fl})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }
  if (u > 1.6) tag(x, 'PHOTO SAVED · FOR ME', 420, 760, { size: 24, bg: GOLD, k: pop01(t, I.I0 + 1.6, 0.3, 2) * outK(t, [I.I0 + 2.8, I.I0 + 3.1]) })
  bubble(x, t, 300, 900, I.I0 + 2.4, I.D + 1, 'first time here! what’s good?', { size: 30 })
  bubble(x, t, 820, 820, I.I0 + 2.9, I.D + 1, 'the heart. it’s for you (sob)', { size: 26, col: '#c9f2ff' })
}

const EP = shortBX({
  id: 'kbxe10', sign: 'sagittarius', duration: 18, ending: 'cut', DE: 4.8, QL: 2.5,
  hook: { text: 'You’re at *the* café. | Alone.', out: [4.5, 4.7], accentColor: '#c9a6ff' },
  rec: { sub: 'CITY TRIP · DAY 2', caption: 'the one from *the list.*' },
  room: (x, t, S, a = 1) => roomCafe(x, t, { a }), contact: 'Drew', sub: 'last seen in January', clock: '11:15 AM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisDraft: { x: 985, y: 760, s: 150 }, pisRole: 'BARISTA',
  stars: ['Sag. you made it! *solo.*', 'before you send: three questions.'],
  qs: [
    { q: 'Is this a plan, or a ghost of one?', a: '…a ghost. a cute ghost.', mood: 'squint' },
    { q: 'What do I want them to feel?', a: '…sorry? jealous? oof.', mood: 'neutral', look: [0, 1] },
    { q: 'Can I enjoy it for me?', a: 'the croissants say yes.', mood: 'happy' },
  ],
  head: 'Sag made it | *theirs.*',
  lines: [{ t: 0.4, text: 'old plan, new person: *you.*' }],
  instead,
  last: 'Same café. | *New* story.',
  cues: I => [
    ['pop', I.I0 + 0.55, 987.77, 0.04, 0.2], ['tick', I.I0 + 1.5, 0.08], ['pop', I.I0 + 1.52, 1760, 0.03, 0], ['bell', I.I0 + 1.6, 1318.51, 0.025, 0.9, -0.2],
    ['pluck', I.I0 + 2.35, 659.25, 0.035, 0.5, 0.4], ['pluck', I.I0 + 2.49, 587.33, 0.035, 0.5, 0.4], ['pop', I.I0 + 2.9, 880, 0.03, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, label, glowAt, ease, clamp, lerp]
