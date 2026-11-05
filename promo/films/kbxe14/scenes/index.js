// kbxe14: BEFORE YOU TEXT YOUR EX, Ep 14, "Mutual friend's wedding next week" (20 s, star_advice post, jazzy · F).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Virgo mid-stumble holding a wedding invitation, the RSVP card flying, thumb on SEND with "r u going
//          to the wedding?", STOP mid-drop. Hook "Mutual friend's wedding. Are they *going?*"
//   0.35   STOP + freeze ("RSVP by *Friday.*")
//   5.2    the check: 1 Do I need to know? 2 Would it change my answer? 3 Who could come with me?
//   13.2   instead: the RSVP gets a big YES stamp (+1: GEMINI); Gemini pops in dancing; the bride's cousin (Pisces) cries.
//   18.0   "Go for the couple, not the *seating chart.*"
import {
  shortBX, roomLiving, pisces, sign, R, bubble, sparkles, label, tag, glowAt, drawBits, HEART, hearts,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, SERIF, MONO,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'r u going to the wedding?'
const OLD = [{ stamp: 'MAR 3' }, { side: 'L', text: 'let’s keep it friendly. for the group' }, { side: 'R', text: 'of course' }]

function invite(x, cx, cy, k, rot, { yes = 0, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -170, -120, 340, 240); R(x, '#fbf6ea', -164, -114, 328, 228); R(x, GOLD, -150, -100, 300, 4); R(x, GOLD, -150, 96, 300, 4)
  x.font = `italic 500 40px ${SERIF}`; x.fillStyle = '#3a2d66'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Sam & Alex', 0, -50)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#6a6488'; x.fillText('SAT · DEC 12 · RSVP', 0, -6)
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.fillText('☐ yes   ☐ no', 0, 40)
  drawBits(x, HEART, { H: '#ff8fb1' }, 0, 80, 4)
  if (yes > 0) {
    const s = easeOutBack(clamp(yes), 2.2)
    x.save(); x.rotate(-0.18); x.scale(1.8 - 0.8 * s, 1.8 - 0.8 * s); x.globalAlpha = clamp(yes * 3)
    x.strokeStyle = '#2fa86a'; x.lineWidth = 10; x.strokeRect(-130, -50, 260, 100)
    x.font = `900 56px ${INTER}`; x.fillStyle = '#2fa86a'; x.fillText('YES ✓', 0, -4); x.font = `800 20px ${MONO}`; x.fillText('+1: GEMINI', 0, 34)
    x.restore()
  }
  x.restore()
  void t
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  invite(x, 240, 800, 0.85, -0.18 + 0.05 * Math.sin(t * 7), {})
  const p = ((t + 0.5) * 0.8) % 1
  x.save(); x.translate(120 + 260 * p, 640 - 200 * p + 300 * p * p); x.rotate(p * 7); R(x, INK, -50, -32, 100, 64); R(x, '#fbf6ea', -44, -26, 88, 52); x.font = `700 16px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('RSVP', 0, 6); x.restore()
}

function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  invite(x, 540, 800, pop01(t, I.I0 + 0.05, 0.35, 1.6), -0.04, { yes: prog(u, 0.8, 1.1), t })
  if (u > 0.85) sparkles(x, t, 540, 800, I.I0 + 0.85, 12, 220, 1, ['#2fa86a', GOLD, BONE])
  // Virgo + Gemini (the plus-one) dance in
  const gk = pop01(t, I.I0 + 1.7, 0.35, 2)
  const beat = [0, 1, 2, 3, 4, 5, 6].map(i => I.I0 + 2.0 + i * 0.42)
  sign(x, t, 'virgo', { x: 330, y: 1200, s: 240, mood: u < 0.8 ? 'neutral' : 'happy', look: [1, -0.4], hops: [I.I0 + 0.9, ...beat] })
  if (gk > 0.01) sign(x, t, 'gemini', { x: 720, y: 1200, s: 240, pop: gk, mood: 'happy', look: [-1, -0.2], hops: beat.map(b => b + 0.21) })
  if (gk > 0.01) bubble(x, t, 720, 990, I.I0 + 2.0, I.D + 1, 'I’m bringing my best moves', { size: 28 })
  pisces(x, t, { x: 960, y: 1450, s: 150, tears: 3, mood: 'happy', role: 'BRIDE’S COUSIN', pop: pop01(t, I.I0 + 1.1, 0.3, 2) })
  hearts(x, t, I.I0 + 2.4, 540, 1080, { n: 6 })
  glowAt(x, 540, 900, 600, '255,214,150', 0.07)
}

const EP = shortBX({
  id: 'kbxe14', sign: 'virgo', duration: 20, ending: 'loop', DE: 5.0, QL: 2.7,
  hook: { text: 'Mutual friend’s wedding. | Are they *going?*', out: [4.7, 4.9], accentColor: GOLD },
  rec: { sub: 'THE INVITE ARRIVED', caption: 'RSVP by *Friday.*' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Morgan', sub: 'last seen in March', clock: '5:52 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1250, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['Virgo, *breathe.* it’s a party.', 'before you ask them: three questions.'],
  qs: [
    { q: 'Do I need to know?', a: '…want to. don’t need to.', mood: 'squint' },
    { q: 'Would it change my answer?', a: 'no. I’m going either way.', mood: 'neutral', look: [0, 1] },
    { q: 'Who could come with me?', a: 'GEMINI. dance partner.', mood: 'happy' },
  ],
  head: 'Virgo RSVP’d | *yes.*',
  lines: [{ t: 1.2, text: 'you’re going for *them.* the couple.' }],
  instead,
  last: 'Go for the couple, | not the *seating chart.*', lastLate: 2,
  cues: I => [
    ['whoosh', I.I0 + 0.05, 0.3, 0.035], ['tom', I.I0 + 0.85, 90, { gain: 0.28, decay: 0.25 }], ['tick', I.I0 + 0.85, 0.08], ['bell', I.I0 + 0.9, 1760, 0.03, 1, 0], ['glitter', I.I0 + 0.9, I.I0 + 1.3],
    ['whoosh', I.I0 + 1.7, 0.3, 0.035], ...[0, 1, 2, 3, 4, 5, 6].map(i => ['clap', +(I.I0 + 2.0 + i * 0.42).toFixed(2), { gain: 0.08, pan: (i % 2 ? 0.3 : -0.3) }]),
    ['pluck', I.I0 + 1.2, 659.25, 0.035, 0.5, 0.5], ['pluck', I.I0 + 1.34, 587.33, 0.035, 0.5, 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, tag, outK, ease, lerp]
