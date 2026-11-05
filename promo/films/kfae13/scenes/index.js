// kfae13: FAKE AD, "Planning the date like a project" (10 s trial reel, chiptune · G, loops). Row: m31.md
//   0     B&W: Capricorn mid-presentation, a minute-by-minute agenda unrolling to the floor, the date (Gemini) asleep;
//         hook "Planning the date | *like a project?*"   0.55 freeze, caught on 7:09 LAUGH.   1.45 colour: THE BLANK HOUR
//   tip "leave one hour with no plan at all."   demo: music notes from a street corner; both dance badly.
//   Pisces sobs "spontaneity!!".   last line, then eases back into frame 0.
import { makeAd, star, bubble, motion, label, block, R, bits, ICON, prog, ease, BONE, INK, RED, YEL, INTER, MONO } from '../../kfae01/adkit.js'

const AGENDA = ['7:00 ARRIVE', '7:04 COMPLIMENT', '7:09 LAUGH', '7:15 DEEP TALK', '7:31 DESSERT', '7:40 EXIT']
function agenda(x, t) {
  const L = Math.min(1, 0.6 + t * 0.6)
  block(x, 600, 600, 380, 120 + 700 * L, '#ffffff', { bw: 6, hi: null })
  x.font = `700 34px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  AGENDA.forEach((a, i) => { if (40 + i * 120 < 700 * L + 80) x.fillText(a, 622, 660 + i * 120) })
}
function note(x, cx, cy, a) { x.save(); x.globalAlpha *= a; R(x, INK, cx - 4, cy - 50, 12, 56); R(x, YEL, cx - 1, cy - 47, 6, 50); R(x, INK, cx - 24, cy - 4, 32, 26); R(x, YEL, cx - 20, cy, 24, 18); x.restore() }
const AD = makeAd({
  id: 'kfae13', sign: 'capricorn', dur: 10, ending: 'loop', style: 'chiptune', key: 'G', seed: 3113,
  hook: 'Planning the date | *like a project?*',
  caught: { x: 760, y: 900, r: 140, label: '7:09 LAUGH', arrow: 'bl' },
  product: 'THE BLANK|HOUR', sub: 'clock has no numbers', icon: 'clock', col: '#2f9a6a', col2: '#fff1a8', burst: ['#2fbf8a', '#ff7a2f'],
  tip: 'leave one hour with no plan at all.',
  quote: 'spontaneity!!',
  fine: '*CLOCK HAS NO NUMBERS. THAT’S THE POINT.',
  last: 'Leave room | *for the good part.*',
  before(x, t, S) {
    agenda(x, t)
    star(x, t, { sign: 'gemini', x: 190, y: 1300, s: 200, mood: 'sleepy', seed: 4 })
    motion(x, t, 330, 1000, { r0: 160, r1: 220, n: 8 })
    S.hero(x, t, { x: 330, y: 1000, s: 280, mood: 'sparkle', look: [1, -0.3], rot: 0.08 * Math.sin(t * 12) })
    x.save(); x.translate(480, 960); x.rotate(-0.8 + 0.2 * Math.sin(t * 10)); R(x, INK, -6, -170, 12, 180); R(x, '#a07850', -3, -166, 6, 172); x.restore()
  },
  after(x, t, S) {
    const u = S.u
    for (let i = 0; i < 6; i++) { const ph = ((u * 0.6 + i / 6) % 1); note(x, 900 - ph * 700 + 40 * Math.sin(i * 3 + u * 4), 1300 - ph * 600, Math.sin(Math.PI * ph)) }
    const bop = [S.T.after + 0.3, S.T.after + 0.75, S.T.after + 1.2, S.T.after + 1.65, S.T.after + 2.1, S.T.after + 2.55, S.T.after + 3.0]
    S.hero(x, t, { x: 330, y: 1080, s: 260, mood: 'happy', rot: 0.25 * Math.sin(u * 7), hops: bop })
    star(x, t, { sign: 'gemini', x: 720, y: 1080, s: 250, mood: 'happy', seed: 4, rot: -0.25 * Math.sin(u * 7), hops: bop.map(b => b + 0.2) })
    bubble(x, t, 540, 860, S.T.after + 0.2, S.T.D + 1, 'this wasn’t on the agenda!', { size: 34 })
  },
  afterCues: [['pop', 0.2, 880, 0.04, 0], ['chip', 0.3, 1174.66, 0.15, { gain: 0.02 }], ['chip', 0.75, 1318.51, 0.15, { gain: 0.02 }]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [label, bits, ICON, prog, ease, BONE, RED, INTER]
