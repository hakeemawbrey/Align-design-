// r2a0438: star_advice, ADVICE SOLO, "Signs a Gemini | *trusts you.*" (signs3kit social cut, music: lofi · C).
// One sign the whole film (makeFilm solo mode, 9 cards): the sweet ways a Gemini shows they trust you, one light gag each.
// Ending: group (the group beat is the punchline).
//   3.6–37.8   tells you the real version · long voice notes · you've met both twins · lets you finish a sentence
//              · shows you the unfinished ideas · you hear the news first · comfy quiet with you · asks your rising sign
//              · makes plans and keeps them
//  37.8        GROUP ending: "Two sides. | *Both pick you.*"  (the big star comes back, heart eyes)
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, phone, sheet, chartWheel, buddy, drawBits, clamp, prog, ease, lerp,
  RED, CREAM, ORANGE, TEAL, GREEN,
} from './props.js'

const YEL = '#ffe35a'
/** a voice note bubble with bars and a long time */
function voiceNote(x, t, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -46, 352, 92); x.fillStyle = YEL; x.fillRect(-170, -40, 340, 80)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -18); x.lineTo(-120, 0); x.lineTo(-150, 18); x.fill()
  for (let i = 0; i < 12; i++) { const h = 10 + 24 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-100 + i * 14, -h / 2, 8, h) }
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60)
  x.fillText(`${m}:${String(s).padStart(2, '0')}`, 160, 2)
  x.restore()
}
/** a doodle notebook */
function notebook(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-156, -186, 330, 380)
  x.fillStyle = INK; x.fillRect(-166, -196, 332, 392); x.fillStyle = CREAM; x.fillRect(-158, -188, 316, 376)
  x.fillStyle = '#c9d8ff'; for (let i = 0; i < 9; i++) x.fillRect(-150, -140 + i * 38, 300, 3)
  x.fillStyle = RED; x.fillRect(-120, -188, 3, 376)
  const D = ['rocket café?', 'a band (8 ppl)', 'cat podcast', 'IDEA #212', 'learn harp']
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) { x.fillStyle = i === 3 ? '#b07bff' : INK; x.fillText(D[i], -106, -150 + i * 64) }
  x.restore()
}
/** a little month calendar with one day circled */
function calendar(x, cx, cy, k, done) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -160, 332, 320); x.fillStyle = CREAM; x.fillRect(-158, -152, 316, 304)
  x.fillStyle = YEL; x.fillRect(-158, -152, 316, 54); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -124)
  x.font = `800 120px ${INTER}`; x.fillText('14', 0, 10)
  if (done > 0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 10, 110, 80, 0, 0, Math.PI * 2 * clamp(done)); x.stroke() }
  x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('still on ✓', 0, 110)
  x.restore()
}

const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: 'They tell you | the *real version.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 320, h: 330, head: 'THE STORY', headCol: YEL, size: 28, rows: [
        ['version 1', INK, at(t, P, 0.4), clamp((lt - 0.9) * 3)], ['version 2', INK, at(t, P, 0.6), clamp((lt - 1.1) * 3)], ['THE REAL ONE', '#b07bff', at(t, P, 1.4)],
      ] })
      L(x, 790, 1100, 'FOR YOU ONLY', at(t, P, 1.6), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'They send you | *really long* voice notes.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 760, at(t, P, 0.2), 60 * 12 + 48)
      voiceNote(x, t, 790, 900, at(t, P, 0.7), 60 * 9 + 3)
      L(x, 790, 1080, 'PART 3 INCOMING', at(t, P, 1.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'You’ve met | *both of them.*', mood: 'wink', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      buddy(x, t, 'gemini', 760, 900, 260, at(t, P, 0.5, 0.4, 2), { mood: 'squint', look: [-1, 0], seed: 81 })
      L(x, 600, 640, 'TWIN #2: HI', at(t, P, 1.1), YEL, -0.04, 34)
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They let you | *finish a sentence.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you go first.', at(t, P, 0.2, 0.25), { size: 44, tail: 'bl' })
      x.save(); x.globalAlpha = at(t, P, 0.8)
      x.fillStyle = INK; x.fillRect(704, 860, 172, 112); x.fillStyle = RED; x.fillRect(712, 868, 156, 96)
      x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ZIPPED', 790, 918)
      x.restore()
      L(x, 790, 1100, 'A GEMINI. LISTENING.', at(t, P, 1.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'They show you | the *unfinished ideas.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      notebook(x, t, 790, 860, at(t, P, 0.15), Math.min(5, Math.floor(clamp((lt - 0.3) / 1.2) * 5) + 1))
    } },
  { sign: S, cap: 'You hear the news | *before anyone.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.8],
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'YOU (ONLY)', headCol: YEL, lines: [
        ['OMG', YEL, at(t, P, 0.4)], ['call me', YEL, at(t, P, 0.7)], ['ok i got a cat', YEL, at(t, P, 1.1)],
      ] })
    } },
  { sign: S, cap: 'They can be | *quiet* with you.', mood: 'sleepy', look: [1, 0], star: { x: -150, y: 20 },
    front(x, t, lt, P) {
      buddy(x, t, 'cancer', 760, 920, 230, at(t, P, 0.3), { mood: 'sleepy', look: [-1, 0], seed: 82 })
      L(x, 600, 650, 'SHH. COZY.', at(t, P, 1.2), LAV, -0.04, 36)
    } },
  { sign: S, cap: 'They ask | your *rising sign.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 830, at(t, P, 0.2), 140)
      bubble(x, 790, 1100, 'and your moon?', at(t, P, 1.2, 0.25), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'They make plans. | *And keep them.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 790, 860, at(t, P, 0.15), (lt - 0.7) / 0.6)
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0438', key: 'C', accent: YEL, solo: S, ending: 'group',
  title: 'Signs a Gemini | *trusts you.*',
  cameos: CAMEOS,
  group: {
    cap: 'Two sides. | *Both pick you.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
