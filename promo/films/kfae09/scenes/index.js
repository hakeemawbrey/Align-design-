// kfae09: FAKE AD, "Your crush said hi. You said "yes"" (8 s trial reel, pop · F, loops). Row: promo/films/month2/m31.md
//   0     B&W: Capricorn mid-flail between a wave, a handshake and a high five (three icons whirling), Libra's "hi!" and
//         Capricorn's "YES."; hook "Your crush said hi. | *You said “yes.”*"   0.55 freeze, caught on "YES.": ???
//   1.45  colour: THE SECOND TRY (a giant rewind button).   tip "laugh, then: “sorry, let me try that again.”"
//   demo: "sorry, let me try that again. hi!" Libra laughs "hi :)" hearts.   Pisces sobs "AWKWARD and BRAVE".  loops.
import { makeAd, star, bubble, motion, hearts, label, prog, ease, BONE, YEL } from '../../kfae01/adkit.js'

const AD = makeAd({
  id: 'kfae09', sign: 'capricorn', dur: 8, ending: 'loop', style: 'pop', key: 'F', seed: 3109,
  hook: 'Your crush said hi. | *You said “yes.”*',
  hookSize: 100,
  caught: { x: 330, y: 760, r: 130, label: 'WHY', arrow: 'br' },
  product: 'THE SECOND|TRY', sub: 'unlimited retries', icon: 'spark', col: '#ff4f6d', col2: '#c9f2ff', burst: ['#ff2f8a', '#2fb0ff'],
  tip: 'laugh, then: “sorry, let me try that again.”',
  quote: 'AWKWARD and BRAVE',
  fine: '*RESETS AVAILABLE ANY TIME. NO RECEIPT NEEDED.',
  last: 'Awkward twice is | *still brave.*',
  before(x, t, S) {
    star(x, t, { sign: 'libra', x: 820, y: 1060, s: 250, mood: 'happy', look: [-1, 0], seed: 8 })
    bubble(x, t, 820, 820, -1, 99, 'hi!', { size: 44 })
    bubble(x, t, 330, 760, -1, 99, 'YES.', { size: 48, col: '#ffffff' })
    ;['WAVE?', 'SHAKE?', 'HIGH 5?'].forEach((w, i) => { const a = t * 7 + i * 2.1; label(x, w, 330 + Math.cos(a) * 230, 1060 + Math.sin(a) * 190, { size: 34, col: BONE, rot: Math.sin(a) * 0.3 }) })
    motion(x, t, 330, 1060, { r0: 150, r1: 210, n: 12 })
    S.hero(x, t, { x: 330, y: 1060, s: 270, mood: 'wide', look: [1, 0], rot: 0.4 * Math.sin(t * 13) })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 300, y: 1070, s: 260, mood: u > 1.0 ? 'happy' : 'squint', look: [1, 0], hops: [S.T.after + 1.0] })
    star(x, t, { sign: 'libra', x: 780, y: 1070, s: 250, mood: u > 0.9 ? 'happy' : 'neutral', look: [-1, 0], seed: 8, blush: u > 0.9 ? 1 : 0, hops: [S.T.after + 0.9] })
    bubble(x, t, 330, 830, S.T.after + 0.1, S.T.D + 1, 'sorry, let me try that again. hi!', { size: 32, maxW: 360 })
    bubble(x, t, 780, 830, S.T.after + 0.85, S.T.D + 1, 'haha hi :)', { size: 38 })
    hearts(x, t, 540, 1000, S.T.after + 1.0, { n: 5 })
  },
  afterCues: [['tapeStop', 0.0, 0.2], ['pop', 0.1, 880, 0.04, -0.3], ['pop', 0.85, 1174.66, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [prog, ease, YEL]
