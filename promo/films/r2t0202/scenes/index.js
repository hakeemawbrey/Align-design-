// r2t0202: star_talk, BE LIKE roll call, 'Zodiacs told "relax" | *be like.*' (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme reaction to being told to relax. Ending: callback.
//   0.0–3.6    'Zodiacs told "relax" | *be like.*'
//   3.6–49.2   ♈ yells "I AM RELAXED!" · ♉ relaxed so hard they became the couch · ♊ forty tabs on how to relax
//              · ♋ relaxes by worrying about you · ♌ relaxes on a stage, with lighting · ♍ a relaxation schedule, already
//              behind · ♎ can't relax until everyone votes (6–6) · ♏ "why? what do you know?" · ♐ booked a flight. Tonight.
//              · ♑ relaxing? sounds unpaid · ♒ meditates by chatting with a UFO · ♓ relaxed so much they cried. Twice.
//  49.2        "Relax? | *Never heard of it.*"
//  52.6        CALLBACK: "Day three: Taurus | is *still the couch.*"  The couch comes back, Taurus asleep on it.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', ORANGE = '#ffb34a', TEAL = '#2fc79a'

const SOFA = ['KK..................KK', 'KAAKKKKKKKKKKKKKKKKAAK', 'KAABBBBBBBBBBBBBBBBAAK', 'KAABBBBBBBBBBBBBBBBAAK', 'KAAKKKKKKKKKKKKKKKKAAK', 'KAACCCCCCCCCCCCCCCCAAK', 'KAACCCCCCCCCCCCCCCCAAK', 'KKKKKKKKKKKKKKKKKKKKKK', '.KK................KK.']
const SOFA_C = { K: INK, A: '#7a5a9a', B: '#9a7ac0', C: '#b89ad8' }
function sofa(x, cx, cy, cell, alpha = 1) { drawBits(x, SOFA, SOFA_C, cx, cy, cell, { alpha }) }
const TEA = ['..W.W...', '.W.W....', 'KKKKKKK.', 'KPPPPPKKK', 'KPPPPPK.K', 'KPPPPPKKK', '.KPPPK...', 'KKKKKKKK.']
const PLANE = ['.....K.....', '....KWK....', '....KWK....', 'KKKKKWKKKKK', 'KWWWWWWWWWK', 'KKKKKWKKKKK', '....KWK....', '...KKWKK...', '...KWWWK...', '...KKKKK...']
const UFO = ['....KKKK....', '...KSSSSK...', '..KSSSSSSK..', 'KKKKKKKKKKKK', 'KGGYGGYGGYGK', '.KKKKKKKKKK.', '..Y..Y...Y..']
const UFO_C = { K: INK, S: '#8fe3ff', G: '#9aa5c4', Y: '#ffe7a8' }
const SPOT = 'rgba(255,241,200,0.22)'
function tabs(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < Math.min(n, 7); i++) { x.fillStyle = INK; x.fillRect(-150 + i * 14 - 6, -150 + i * 22 - 6, 272, 192); x.fillStyle = [BONE, SKYB, '#fff4e2', LAV][i % 4]; x.fillRect(-150 + i * 14, -150 + i * 22, 260, 180) }
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('how to relax', -50, 40); x.fillText('(part ' + n + ')', -50, 82)
  x.restore()
}
function card(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Yells *"I AM relaxed!"* | at full volume.', mood: 'wide', star: { x: -170 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'I AM | RELAXED!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 56, col: RED, ink: INK, tail: 'bl' })
      label(x, 790, 1080, 'VOLUME: 11', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Relaxed so hard they | *became the couch.*', mood: 'sleepy', star: { x: -40, y: 20, s: 260 },
    back(x, t, lt, P) { sofa(x, 500, 960, 26 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) { label(x, 760, 650, 'MOVED: NEVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 }) } },
  { sign: 'gemini', cap: 'Forty tabs on | *how to relax.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39)
      tabs(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      label(x, 790, 1130, `TAB ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Relaxes by | *worrying about you.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const qs = ['did you eat?', 'are you warm?', 'text me back?']
      qs.forEach((q, i) => bubble(x, 780, 680 + i * 150, q, pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 36, col: [BONE, SKYB, PINK][i], tail: 'bl' }))
    } },
  { sign: 'leo', cap: 'Relaxes *on a stage.* | With lighting.', mood: 'sparkle', star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 1.6)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = SPOT; x.beginPath(); x.moveTo(300, 470); x.lineTo(440, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LEO: RELAXING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, 'TICKETS: SOLD OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Scheduled relaxing. | *Already behind.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['10:00 relax', '10:05 relax more', '10:10 done'], { head: 'RELAX PLAN', headBg: MINT, w: 340, rot: -0.04 })
      label(x, 790, 1110, 'LATE: 2 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can\'t relax until | *everyone votes.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'nap or walk?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      const a = Math.min(6, Math.floor(clamp((lt - 0.5) / 1.0) * 6))
      label(x, 790, 920, `VOTES: ${a}–${a}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 48, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'RECOUNT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Relax? *Why?* | What do you know?', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'relax!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      bubble(x, 760, 940, 'who sent | you?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, col: '#ff6b8a', tail: 'bl' })
      label(x, 790, 1130, 'TRUST: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booked a flight. | *Leaves tonight.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const fly = prog(lt, 1.2, 2.2)
      drawBits(x, PLANE, { K: INK, W: '#fff4e2' }, 770 + fly * 70, 740 - fly * 60, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.6 })
      card(x, 790, 1040, pop01(t, P.t0 + 0.6, 0.3, 2), ['to: anywhere', 'departs: 11 pm'], { head: 'TICKET', headBg: '#c58bff', w: 320, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Relaxing? | Sounds *unpaid.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'take a day off!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
      label(x, 790, 960, 'UNPAID', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 64, bg: RED, color: BONE, rot: -0.1, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Meditates by | *chatting with a UFO.*', mood: 'happy', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, UFO, UFO_C, 780, 700 + Math.sin(t * 2) * 12, 20 * k)
      if (k > 0.5) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#ffe7a8'; x.beginPath(); x.moveTo(720, 770); x.lineTo(840, 770); x.lineTo(900, 1150); x.lineTo(660, 1150); x.closePath(); x.fill(); x.restore() }
      bubble(x, 780, 1000, 'so, how are | you guys?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Relaxed so much | they *cried. Twice.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k > 0.01) { x.save(); x.globalAlpha = 0.85; x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.arc(700 + (i % 3) * 90, 900 + Math.floor(i / 3) * 110 - Math.sin(t * 2 + i) * 10, 34 * k, 0, 7); x.stroke(); x.restore() } }
      label(x, 790, 1130, 'BATH: TOO NICE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0202', key: 'E', accent: TEAL, ending: 'callback',
  title: 'Zodiacs told "relax" | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Relax? | *Never heard of it.*' },
  last: {
    text: 'Day three: Taurus | is *still the couch.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      sofa(x, 540, 1170, 28 * k)
      signChar(x, t, 'taurus', 540, 1060, 250 * k, { mood: 'sleepy', seed: 33 })
      label(x, 540, 1400, 'DAY 3', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
