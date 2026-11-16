// og-kpvee11: social rework of kpvee11. Static HOOK (outline) 0–2.8 replaces the slam; no glitch / whip zoom under the
// hook; no series bug (kit copy); no loop-back (ends on the couple, Venus's last line); Venus smaller and lower,
// everyone and every line in the safe zone; crazier lines.
// Was: kpvee11 · Planet Talk: Venus to Aquarius — "Feelings in Human" (25.6 s vertical, star_talk, loop). chiptune · F.
//   0.00  frame 0: Venus mid-glitch bursting out of a HOMEBOT gadget (fictional), sparkles pixelating; Aquarius mid-fix
//         on the crush's router. Slam "AQUARIUS. Wifi fixing isn't *flirting.*"
//   2.9   LOVE LOG: ✓ fixed their router · ✓ sent 3 articles · ✓ built a shelf · ✗ said anything.
//   5.6   Aquarius: "Those are my feelings." Venus: "Acts of service is a love language." / "Sweet. Now say it in human."
//  12.6   loading bar: translating feelings to human…  15.4 "I like you. Also your wifi's fixed."  The crush: "I know.
//         I liked you at the shelf."  Pisces: "I'm crying in binary."  22.8 slam "Router fixed. *Feelings* sent." Loops.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, panel, txt, rich, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../venuskit.js'

export const HOOK = 'Fixed your router. | Never said *a word.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.8

const T = { log: [3.0, 3.5, 4.0, 4.6], logOut: 7.6, load: 12.6, crush: 15.2, say: 15.4, know: 18.2, sob: 20.6, last: 22.8 }
const CRUSH = { x: 830, y: 1350, s: 220, col: '#ffd27a' }
const LOG = [['✓', 'fixed their router'], ['✓', 'sent 47 articles'], ['✓', 'built them a shelf'], ['✗', 'said anything']]

function homebot(x, t) {
  const a = outK(t, [1.6, 2.2])
  if (a <= 0.01) return
  const j = t < 1 ? Math.sin(t * 70) * 8 * (1 - t) : 0
  x.save(); x.globalAlpha *= a; x.translate(540 + j, 900)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-110, -150, 220, 300, 50); x.fill()
  x.fillStyle = '#d8dceb'; x.beginPath(); x.roundRect(-100, -140, 200, 280, 44); x.fill()
  x.fillStyle = '#4a4f6a'; for (let k = 0; k < 6; k++) x.fillRect(-70, -60 + k * 26, 140, 10)
  x.fillStyle = '#7fe0ff'; x.beginPath(); x.ellipse(0, -110, 70, 14, 0, 0, 7); x.fill()
  txt(x, 'HOMEBOT', 0, 110, { size: 24, color: INK, font: "700 24px 'Space Mono', monospace" })
  x.restore()
}
function router(x, t) {
  const cx = 640, cy = 1520
  x.fillStyle = INK; x.fillRect(cx - 20, cy - 200, 14, 140); x.fillRect(cx + 60, cy - 220, 14, 160); x.fillRect(cx + 140, cy - 190, 14, 130)
  x.fillStyle = INK; x.beginPath(); x.roundRect(cx - 50, cy - 70, 240, 100, 18); x.fill()
  x.fillStyle = '#e9e6f2'; x.beginPath(); x.roundRect(cx - 42, cy - 62, 224, 84, 14); x.fill()
  for (let k = 0; k < 4; k++) { x.fillStyle = Math.sin(t * 9 + k * 1.7) > 0 ? '#7dffb0' : '#2a6a44'; x.beginPath(); x.arc(cx - 10 + k * 36, cy - 20, 9, 0, 7); x.fill() }
  // signal bars: fixed
  const bars = t < 0.8 ? 1 : 4
  for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(cx + 210 + k * 26, cy - 140 - k * 22, 20, 30 + k * 22); x.fillStyle = k < bars ? '#7dffb0' : '#3a2d5a'; x.fillRect(cx + 213 + k * 26, cy - 137 - k * 22, 14, 24 + k * 22) }
}
function loveLog(x, t) {
  const k = pop01(t, T.log[0] - 0.2, 0.35) * outK(t, [T.logOut, T.logOut + 0.25])
  if (k <= 0.01) return
  panel(x, 540, 1030, 640, 330, { fill: '#120c2a', border: INK, rad: 14, s: k })
  x.save(); x.translate(540, 1030); x.scale(k, k)
  txt(x, '♒︎ LOVE LOG', 0, -125, { size: 30, color: '#7fe0ff', font: "700 30px 'Space Mono', monospace" })
  LOG.forEach(([m, l], i) => {
    const lk = pop01(t, T.log[i], 0.25, 2.6)
    if (lk <= 0.01) return
    txt(x, m, -260, -55 + i * 62, { size: 44, color: m === '✓' ? '#7dffb0' : '#ff5b6b', s: lk })
    txt(x, l, -210, -55 + i * 62, { size: 38, align: 'left', color: m === '✓' ? BONE : '#ff9aa4', font: "700 36px 'Space Mono', monospace", s: 1, alpha: clamp(lk) })
  })
  x.restore()
}
function screwdriver(x, t, S) {
  if (t > T.crush) return
  x.save(); x.translate(S.sign.x + 140, S.sign.y + 10 + Math.sin(t * 12) * (t < 2 ? 6 : 2)); x.rotate(-0.7)
  x.fillStyle = INK; x.fillRect(-16, -60, 32, 70); x.fillStyle = '#ff5b6b'; x.fillRect(-12, -56, 24, 62); x.fillStyle = INK; x.fillRect(-5, 10, 10, 70); x.fillStyle = '#c9cde0'; x.fillRect(-3, 10, 6, 66)
  x.restore()
}

const EP = episode({
  sign: 'aquarius', dur: 25.6, ending: 'cut',
  enter: { kind: 'burst', at: -0.35, x: 540, y: 740, size: 290 },
  venus: [
    { t: 0, x: 540, y: 740, size: 290, mood: 'wide', look: [-0.4, 1] },
    { t: 1.6, mood: 'sly', look: [-0.4, 1] },
    { t: 7.8, mood: 'happy' },
    { t: 10.4, mood: 'sly' },
    { t: 15.4, mood: 'love' },
  ],
  signK: [
    { t: 0, x: 380, y: 1420, size: 250, mood: 'squint', look: [1, 0.6] },
    { t: 1.0, mood: 'wide', look: [0.4, -1] },
    { t: 3.0, mood: 'neutral', look: [0.4, -1] },
    { t: 5.6, mood: 'happy', look: [0, 0] },
    { t: 10.6, mood: 'eyeroll' },
    { t: 12.6, mood: 'squint', look: [0, -1] },
    { t: 15.4, mood: 'neutral', look: [1, 0] },
    { t: 18.4, mood: 'heart', look: [1, 0], d: 0.15 },
  ],
  pisK: [
    { t: 0, x: 140, y: 1480, size: 130, mood: 'wide', look: [1, -1], tears: 1 },
    { t: 4.6, mood: 'wide', tears: 2 },
    { t: 20.6, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 5.6, t1: 7.6, who: 'aquarius', text: 'The shelf WAS the *love letter.*', x: 460, y: 1245, tail: -80, tailUp: false, size: 46 },
    { t0: 7.8, t1: 10.2, who: 'venus', text: 'Acts of service *is* a love language.', y: 535, size: 46 },
    { t0: 10.4, t1: 12.4, who: 'venus', text: 'Sweet. Now say it in *human.*', y: 525, size: 46 },
    { t0: 15.4, t1: 18.0, who: 'aquarius', text: 'I like you. Also your *wifi’s* fixed.', x: 480, y: 1200, tail: -100, tailUp: false, maxW: 640 },
    { t0: 18.2, t1: 20.4, who: 'the crush', text: 'I know. I liked you at *the shelf.*', x: 540, y: 1110, tail: 280, tailUp: false, color: CRUSH.col },
    { t0: 20.6, t1: 22.6, who: 'pisces', text: 'I’m crying in *binary.*', x: 420, y: 1260, tail: -280, tailUp: false },
    { t0: 22.8, t1: 26, who: 'venus', text: 'Router fixed. *Feelings* sent.', y: 525, size: 46 },
  ],
  fx: [
    ['loadingBar', { at: T.load, len: 2.4, label: 'feelings → human…', stallAt: 99, error: null, y: 1000 }],
  ],
  back(x, t) { homebot(x, t); router(x, t) },
  mid(x, t, S) {
    loveLog(x, t)
    const ck = pop01(t, T.crush, 0.4, 2) * outK(t, [26, 26.3])
    if (ck > 0.01) drawStarChar(x, CRUSH.x, CRUSH.y, CRUSH.s, t, { color: CRUSH.col, mood: t > 18.2 ? 'happy' : 'wide', look: [-1, 0], pop: ck, hops: [18.3, 18.9, 19.5], seed: 23 })
    screwdriver(x, t, S)
  },
  front(x, t, S) {
    sparkleBurst(x, t, S.sign.x, S.sign.y, 18.4, { R: 240 })
    if (t > T.sob && t < 26) for (let k = 0; k < 6; k++) { const ph = ((t - T.sob) * 0.7 + k / 6) % 1; txt(x, k % 2 ? '1' : '0', S.pis.x + (k - 2.5) * 22, S.pis.y + 20 + ph * 120, { size: 30, color: '#8fe3ff', font: "700 30px 'Space Mono', monospace", alpha: 1 - ph }) }
    void heart; void rich; void lerp; void ROSE; void CREAM; void GOLD; void VRIM; void ease
  },
  cues: [
    ...T.log.map((a, i) => ['pop', a, i === 3 ? 330 : 880 + i * 120, 0.05, 0]), ['chip', T.log[3], 0.05],
    ['pop', T.crush, 784, 0.05, 0.3], ['bell', 18.4, 1760, 0.04, 1.0, 0], ['glitter', 18.4, 19.0],
    ...sobCues(T.sob, 4), ...[0, 0.12, 0.24, 0.36].map(d => ['chip', +(T.sob + 0.6 + d).toFixed(2), 0.02]),
  ],
})
export const { DURATION, SCENES, CUES } = EP
