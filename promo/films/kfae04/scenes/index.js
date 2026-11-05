// kfae04: FAKE AD, "The situationship, solved in a sentence" (11 s trial reel, jazzy · Bb, hard cut). Row: m31.md
//   0     B&W: Libra mid-shrug between two calendars (DATE? / HANGING OUT?), a "??" sign spinning; hook "Are we dating?
//         *Nobody knows!*"   0.55 freeze, caught on the "??": STATUS: ???   1.45 colour: THE POCKET TALK (fits in a pocket!)
//   tip "“what are we doing? I’d like to know.”"   demo: Libra asks Taurus, Taurus answers kindly and honestly, a heart.
//   Pisces sobs into a tissue: "they USED WORDS".   fine print "any answer is information".   last line, hard cut.
import { makeAd, star, bubble, motion, hearts, label, block, R, bits, ICON, prog, ease, BONE, INK, RED, YEL, INTER } from '../../kfae01/adkit.js'

function calendar(x, cx, cy, word, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  block(x, -130, -120, 260, 240, BONE, { bw: 7, hi: null }); R(x, RED, -130, -120, 260, 54)
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R(x, '#c9bfae', -110 + i * 58, -48 + j * 52, 40, 36)
  x.font = `900 40px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, -92)
  x.restore()
}
const AD = makeAd({
  id: 'kfae04', sign: 'libra', dur: 11, ending: 'cut', style: 'jazzy', key: 'Bb', seed: 3104,
  hook: 'Are we dating? | *Nobody knows!*',
  caught: { x: 760, y: 720, r: 130, label: 'STATUS: ???', arrow: 'bl' },
  product: 'THE POCKET|TALK', sub: 'fits in any pocket!', icon: 'bubble', col: '#7a3cff', col2: '#ffd23a', burst: ['#ff2f8a', '#3a6cff'],
  tip: '“what are we doing? I’d like to know.”',
  quote: 'they USED WORDS',
  fine: '*ANY ANSWER IS INFORMATION. ASK KINDLY, LISTEN FULLY.',
  last: 'Clarity fits | *in one sentence.*',
  before(x, t, S) {
    calendar(x, 220, 1180, 'DATE?', -0.2 + 0.05 * Math.sin(t * 5))
    calendar(x, 860, 1180, 'HANG?', 0.2 - 0.05 * Math.sin(t * 5))
    x.save(); x.translate(760, 720); x.rotate(0.35 * Math.sin(t * 9)); label(x, '??', 0, 0, { size: 130, col: BONE }); x.restore()
    motion(x, t, 540, 1000, { r0: 180, r1: 240, n: 10 })
    S.hero(x, t, { x: 540, y: 1000, s: 320, mood: 'eyeroll', rot: 0.2 * Math.sin(t * 10) })
    label(x, '¯\\_(?)_/¯', 540, 760, { size: 60, col: BONE, rot: -0.1 })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 300, y: 1080, s: 270, mood: u > 1.4 ? 'heart' : 'happy', look: [1, 0], hops: [S.T.after + 0.15, S.T.after + 1.4] })
    star(x, t, { sign: 'taurus', x: 760, y: 1080, s: 270, mood: u > 0.9 ? 'happy' : 'neutral', look: [-1, 0], seed: 9, blush: u > 0.9 ? 1 : 0, hops: [S.T.after + 0.9] })
    bubble(x, t, 330, 830, S.T.after + 0.15, S.T.after + 1.6, 'what are we doing? I’d like to know.', { size: 34, maxW: 400, tail: -0.2 })
    bubble(x, t, 740, 830, S.T.after + 0.9, S.T.D + 1, 'honestly? I really like you.', { size: 34, maxW: 360, tail: 0.2 })
    hearts(x, t, 540, 1000, S.T.after + 1.4, { n: 6 })
  },
  afterCues: [['pop', 0.15, 880, 0.04, -0.3], ['pop', 0.9, 1174.66, 0.04, 0.3], ['pluck', 1.4, 1567.98, 0.04, 0.5, 0]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [bits, ICON, ease, prog, INK, YEL]
