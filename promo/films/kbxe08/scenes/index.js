// kbxe08: BEFORE YOU TEXT YOUR EX, Ep 8, "They're dating someone new" (18 s vertical, star_advice post, house · C).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.00   frame 0: Aries mid-yell, a friend's text dropping in ("heard they're seeing someone"), thumb on SEND with
//          "wow. fast.", STOP mid-drop. Hook "They're dating someone *already?!*"  0.35 STOP + freeze ("ouch. *okay.*")
//   5.2    the check: 1 What would this text change? 2 Am I hurt or angry? (both is allowed) 3 What do I need tonight?
//   12.6   instead: Aries runs it out around the block (Pisces jogging behind, crying), then calls a friend.
//   16.0   "Their new chapter isn't your *page.*"
import {
  shortBX, notification, roomStreet, roomLiving, pisces, sign, R, bubble, sparkles, label, tag, glowAt,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'wow. fast.'
const OLD = [{ stamp: 'JUL 7' }, { side: 'L', text: 'let’s not drag this out' }, { side: 'R', text: 'fine.' }]
const NOTIF = { at: -0.25, out: [3.6, 3.9], title: 'LEO', body: 'heard they’re *seeing someone*. you ok?', glyph: '♌', time: 'now', y: 480 }

function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  // the yell: shout lines round Aries
  for (let i = 0; i < 6; i++) { const a = -1.9 + i * 0.35, r = 150 + 20 * Math.sin(t * 20 + i); x.save(); x.translate(175 + Math.cos(a) * r, 1180 + Math.sin(a) * r); x.rotate(a); R(x, '#ff6a5a', 0, -4, 36, 8); x.restore() }
  label(x, 'WHAT', 175, 990, { size: 44, col: '#ff6a5a', rot: -0.12, k: 1 + 0.05 * Math.sin(t * 30) })
}

function instead(x, t, S, I) {
  const u = t - I.I0
  if (u < 2.3) {
    // the run: the street scrolls; Aries sprints, Pisces jogs behind crying
    x.save(); x.translate(-((u * 900) % 1080), 0); roomStreet(x, t); x.translate(1080, 0); roomStreet(x, t); x.restore()
    for (let i = 0; i < 8; i++) R(x, 'rgba(255,255,255,0.35)', 1080 - ((u * 1600 + i * 170) % 1300), 1000 + i * 40, 120, 6)
    sign(x, t, 'aries', { x: 620, y: 1250, s: 240, mood: u < 1 ? 'squint' : 'neutral', look: [1, 0], hops: Array.from({ length: 8 }, (_, i) => I.I0 + i * 0.28) })
    pisces(x, t, { x: 260, y: 1290, s: 170, tears: 3, mood: 'wide', look: [1, -0.2], hops: Array.from({ length: 8 }, (_, i) => I.I0 + 0.14 + i * 0.28), role: 'RUNNING BUDDY' })
    tag(x, `LAP ${1 + Math.min(2, Math.floor(u / 0.8))}`, 860, 960, { size: 30, bg: GOLD })
    bubble(x, t, 260, 1060, I.I0 + 0.8, I.I0 + 2.25, 'wait up (sob)', { size: 28, col: '#c9f2ff' })
  } else {
    // home: the call with a friend
    roomLiving(x, t)
    const k = pop01(t, I.I0 + 2.35, 0.3, 2)
    sign(x, t, 'aries', { x: 380, y: 1180, s: 250, mood: u < 3.0 ? 'neutral' : 'happy', look: [1, -0.3], hops: [I.I0 + 2.4, I.I0 + 3.0] })
    pisces(x, t, { x: 140, y: 1300, s: 150, tears: 2, mood: 'sleepy', role: 'OUT OF BREATH' })
    x.save(); x.translate(760, 820); x.scale(k, k)
    R(x, INK, -170, -230, 340, 460); R(x, '#120d26', -160, -220, 320, 440)
    x.restore()
    if (k > 0.01) {
      sign(x, t, 'leo', { x: 760, y: 820, s: 190 * k, mood: 'happy', glyph: false, hops: [I.I0 + 2.9, I.I0 + 3.4] })
      label(x, '● ON CALL · LEO', 760, 640, { size: 22, col: '#9fe6b0', k })
      bubble(x, t, 760, 1110, I.I0 + 2.8, I.D + 1, 'i’m here. talk.', { size: 32 })
    }
  }
}

const EP = shortBX({
  id: 'kbxe08', sign: 'aries', duration: 18, ending: 'cut', DE: 5.0, QL: 2.5,
  hook: { text: 'They’re dating | someone *already?!*', out: [4.7, 4.9], accentColor: '#ff6a5a' },
  rec: { sub: 'IT’S BEEN FOUR MONTHS', caption: 'ouch. *okay.*' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Jesse', sub: 'last seen in July', clock: '7:26 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['Aries. breathe. that *stings.*', 'stings. still: three questions.'],
  qs: [
    { q: 'What would this text change?', a: 'nothing. except my dignity.', mood: 'squint' },
    { q: 'Am I hurt, or angry?', a: 'both. ok. both.', mood: 'neutral', look: [0, 1] },
    { q: 'What do I need tonight?', a: 'to move. and a friend.', mood: 'happy' },
  ],
  head: 'Aries ran | it *out.*',
  lines: [{ t: 2.5, text: 'hurt is allowed. move it, then *talk* it.' }],
  instead,
  last: 'Their new chapter | isn’t your *page.*',
  kit: [[notification, NOTIF]],
  cues: I => [
    ...Array.from({ length: 8 }, (_, i) => ['tom', +(I.I0 + i * 0.28).toFixed(2), 140, { gain: 0.08, decay: 0.08 }]),
    ['pluck', I.I0 + 0.85, 659.25, 0.03, 0.5, -0.4], ['pluck', I.I0 + 0.99, 587.33, 0.03, 0.5, -0.4],
    ['whoosh', I.I0 + 2.3, 0.35, 0.04], ['pop', I.I0 + 2.45, 880, 0.04, 0.3], ['bell', I.I0 + 2.5, 1318.51, 0.02, 0.8, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, glowAt, outK, prog, ease, clamp, lerp, BONE]
