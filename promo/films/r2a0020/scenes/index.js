// r2a0020: star_advice, ADVICE ROLLCALL, "Each sign’s perfect | phone call." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: the warm, specific phone call each sign would love, each with a light gag. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ short, loud, ends with “let’s go!” · ♉ call while cooking, stay for dinner · ♊ five topics a minute, keep up
//              · ♋ ask about their family by name · ♌ open with a compliment, watch them glow · ♍ call at the planned time, exactly
//              · ♎ debrief their date, every detail · ♏ late night, real talk · ♐ video call from somewhere far
//              · ♑ ask about their goals, then let them rest · ♒ open with a weird question · ♓ three hours long, both of you cry
//  49.2        "Call them. | *They’ll pick up.*"  A RINGING… sticker over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', GREEN = '#7ee08a', ORANGE = '#ff9a4a'

// ── props
function phone(x, t, cx, cy, k, screen, { rot = 0.06, ring = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (ring ? Math.sin(t * 50) * 4 : 0), cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -160, 180, 320); x.fillStyle = '#2a2350'; x.fillRect(-78, -140, 156, 270)
  x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(screen, 0, -60)
  x.fillStyle = GREEN; x.beginPath(); x.arc(0, 70, 30, 0, Math.PI * 2); x.fill()
  x.restore()
}
const POT = ['.KKKKKKKK.', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KPPPPPPPPK', '.KPPPPPPK.']
const STEAM = ['.W.', 'W..', '.W.', '..W']
const CLOUD = ['...WWW....', '..WWWWW.W.', '.WWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.']
const MOON = ['..MMM.', '.MM...', 'MM....', 'MM....', '.MM...', '..MMM.']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBBBPB', 'BBBBBBBB']
const MOUNTAIN = ['.....W.....', '....WWW....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']

const CAMEOS = [
  { sign: 'aries', cap: 'Short. Loud. | *Ends with “let’s go!”*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), '0:47')
      label(x, 790, 1110, 'LET’S GO!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Call while cooking. | *Stay for dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { K: INK, P: '#c97bff' }, 790, 960, 24 * k)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; drawBits(x, STEAM, { W: BONE }, 740 + i * 50, 840 - ph * 140, 12 * k, { alpha: Math.sin(Math.PI * ph) }) }
      label(x, 790, 660, 'SPEAKER: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Five topics a minute. | *Keep up.* They love it.', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const topics = ['eels?', 'my boss', 'aliens', 'soup!!', 'wait—']
      const n = Math.min(4, Math.floor(prog(lt, 0.2, 2.0) * 4.99))
      bubble(x, 790, 820, topics[n], pop01(t, P.t0 + 0.2, 0.25, 2.4) * (1 + 0.06 * Math.sin(t * 9)), { size: 52, col: GOLD, tail: 'bl' })
      label(x, 790, 1060, `TOPIC ${n + 1}/5`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Ask about their family. | *By name.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'how’s Grandma | Rosa’s knee?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 980, 'HEART: MELTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Open with a compliment. | *Watch them glow.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'you were so | good today', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 980, `GLOW: ${Math.round(lerp(40, 100, ease.outCubic(prog(lt, 0.8, 1.8))))}%`, pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 350, 880, P.t0 + 1.4, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Call at the planned time. | *Exactly.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? '3:00:00' : '2:59:58', { ring: lt > 1.0 })
      label(x, 790, 1110, 'ON TIME ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Debrief their date. | *Every single detail.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, '✦ MATCH REPORT', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'and THEN | he laughed—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      label(x, 790, 1090, 'PAGE 4 OF 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Late night. Real talk. | *No small talk.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#fff1b0' }, 820, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 980, '1:12 AM · DEEP', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Video call | *from a mountain top.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { W: BONE, G: '#7a8ad8' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'can you | hear me?!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: ORANGE, tail: 'bl' })
      label(x, 790, 1080, 'SIGNAL: 1 BAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ask about their goals. | *Then say: rest.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'GOALS: ON TRACK', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'proud of you. | now nap.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Ask something weird. | *They’ll light up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { W: BONE }, 800, 760 + Math.sin(t * 2) * 8, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 980, 'are clouds | heavy??', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Three hours long. | *Both of you cry.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), '3:04:22')
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: PINK }, 790, 1100, 18 * pop01(t, P.t0 + 1.2, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2a0020', key: 'G', accent: PEACH, ending: 'group',
  title: 'Each sign’s perfect | *phone call.*',
  cameos: CAMEOS,
  group: {
    cap: 'Call them. | *They’ll pick up.*',
    draw(x, t, lt) { label(x, 540, 700, 'RINGING…', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 48, bg: GREEN, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
