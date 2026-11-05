// kbxe12: BEFORE YOU TEXT YOUR EX, Ep 12, "This meme is so them" (16 s vertical, star_advice post, chiptune · E).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Aquarius mid-laugh, a meme of a cat in a tiny hat popping up big, thumb on SEND with "lol this is u",
//          STOP mid-drop. Hook "This meme is SO *them.*"  0.35 STOP + freeze ("it's a *really* good meme.")
//   5.0    the check: 1 Is it the meme, or the opening? 2 Am I ready to be friends? 3 Who else would laugh?
//   11.5   instead: the meme goes to the group chat; three friends react instantly; Pisces cries laughing.
//   14.0   "Send the meme to the *group chat.*"
import {
  shortBX, roomLiving, pisces, sign, drawPhone, R, bubble, sparkles, label, tag, drawBits,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'lol this is u'
const OLD = [{ stamp: 'OCT 15' }, { side: 'L', text: 'i think we’re better as nothing' }, { side: 'R', text: 'yeah. ok.' }]

/** the meme: a grey cat in a tiny party hat, deadpan, with a caption */
function meme(x, cx, cy, s, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  R(x, INK, -150, -170, 300, 340); R(x, '#f4eee4', -144, -164, 288, 328)
  R(x, '#6a7aa0', -120, -140, 240, 220)
  drawBits(x, ['C....C', 'CC..CC', 'CCCCCC', 'CECCEC', 'CCCCCC', 'CCNNCC', '.CCCC.'], { C: '#9aa0b0', E: INK, N: '#ff8fb1' }, 0, -20, 26)
  drawBits(x, ['..H..', '.HHH.', 'HYHYH'], { H: '#ff5c8a', Y: '#ffe27a' }, 30, -128, 16)
  x.font = `900 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“me at my own party”', 0, 120)
  x.restore()
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  meme(x, 240, 790, 0.9, -0.1 + 0.03 * Math.sin(t * 8), easeOutBack(prog(t, -0.5, 0.15), 1.8))
  for (let i = 0; i < 3; i++) label(x, 'HA', 120 + i * 90, 1060 - i * 30 + 8 * Math.sin(t * 14 + i), { size: 36, col: '#7fd0ff', rot: -0.2 + i * 0.15 })
}

function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  const msgs = [{ stamp: 'THE GROUP CHAT · 6' }, { side: 'R', text: '[ cat in a tiny hat ]' }]
  const R3 = [['♈︎ ARIES', 'HAHAHA'], ['♊︎ GEMINI', 'the HAT'], ['♓︎ PISCES', 'crying. actual tears']]
  R3.forEach(([n, m], i) => { if (u > 0.9 + i * 0.4) msgs.push({ side: 'L', text: `${n}: ${m}` }) })
  const pk = pop01(t, I.I0 + 0.05, 0.3, 1.6)
  x.save(); x.translate(600, 960); x.scale(pk * 0.92, pk * 0.92); x.translate(-600, -960)
  drawPhone(x, t, { cx: 600, cy: 960, w: 560, h: 820, contact: 'the group chat', sub: '6 members · online', clock: '8:40 PM', old: msgs, draft: '' })
  x.restore()
  if (u > 0.3) meme(x, 690, 820, 0.42, 0.03, pop01(t, I.I0 + 0.3, 0.3, 2))
  R3.forEach((_, i) => { if (u > 0.9 + i * 0.4) sparkles(x, t, 880, 1060 + i * 70, I.I0 + 0.9 + i * 0.4, 6, 50, i, [GOLD, BONE]) })
  sign(x, t, 'aquarius', { x: 190, y: 1260, s: 230, mood: 'happy', look: [1, -0.4], hops: [I.I0 + 0.9, I.I0 + 1.3, I.I0 + 1.7, I.I0 + 2.1] })
  pisces(x, t, { x: 960, y: 1450, s: 150, tears: 3, mood: 'happy', role: 'IN THE CHAT', pop: pop01(t, I.I0 + 1.7, 0.3, 2) })
}

const EP = shortBX({
  id: 'kbxe12', sign: 'aquarius', duration: 16, ending: 'loop', DE: 4.8, QL: 2.2,
  hook: { text: 'This meme is | SO *them.*', out: [4.5, 4.7], accentColor: '#7fd0ff' },
  rec: { sub: '8:38 PM', caption: 'it’s a *really* good meme.' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Ari', sub: 'last seen in October', clock: '8:38 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1250, s: 220, mood0: 'happy', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['ha! cute cat. *hold on.*', 'quick: three questions.'],
  qs: [
    { q: 'Is it the meme, or the opening?', a: '…the opening. the meme is bait.', mood: 'squint' },
    { q: 'Am I ready to be friends?', a: 'not yet. honestly.', mood: 'neutral', look: [0, 1] },
    { q: 'Who else would laugh?', a: 'the group chat. instantly.', mood: 'happy' },
  ],
  head: 'Aquarius shared | it *wider.*',
  lines: [{ t: 1.2, text: 'good jokes deserve a *full* room.' }],
  instead,
  last: 'Send the meme to | the *group chat.*', lastLate: 2,
  cues: I => [
    ['whoosh', I.I0 + 0.05, 0.3, 0.035], ['pop', I.I0 + 0.3, 880, 0.04, 0.2],
    ...[0, 1, 2].map(i => ['pop', +(I.I0 + 0.9 + i * 0.4).toFixed(2), [987.77, 1174.66, 1318.51][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ['pluck', I.I0 + 1.8, 659.25, 0.035, 0.5, 0.5], ['pluck', I.I0 + 1.94, 587.33, 0.035, 0.5, 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, tag, outK, ease, clamp, lerp]
