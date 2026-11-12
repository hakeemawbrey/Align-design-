// r2a0085: star_advice, ADVICE ROLLCALL, "The signs | sharing the stage." (~61 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific line each about lifting other people up, each with one light gag. Ending: 'lesson'.
//   0.0–3.6    "The signs | *sharing the stage.*"
//   3.6–49.2   ♈ hands over the mic, cheers loudest · ♉ shares the last slice · ♊ tells your story better than you did
//              · ♋ makes sure everyone's in the photo · ♌ shines a light on your win · ♍ credits everyone by name
//              · ♎ splits the stage evenly · ♏ quietly makes sure you're seen · ♐ turns your win into a party
//              · ♑ gives you the credit in the meeting · ♒ makes room for the quiet ones · ♓ cries proud tears
//  49.2        "Room for everyone | *in the light.*"
//  52.4        LESSON UNLOCKED: "Your light grows | when you *share it.*"  GLOW: SHARED
//  58.3        "Leo’s still | *in the corner of it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e'
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', 'KGGGK', '.KKK.', '..K..', '..K..', '..K..', '.KKK.']
const SLICE = ['C.........', 'CPP.......', 'CPPPP.....', 'CPPPPPP...', 'CPPPPPPPP.', 'CCCCCCCCCC']
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KGGGKKKGGK', 'KGGK...KGK', 'KGGK...KGK', 'KGGGKKKGGK', 'KKKKKKKKKK']
const CHAIR = ['W.......', 'W.......', 'W.......', 'WWWWWWWW', 'W......W', 'W......W']
const CONF = ['#ff6b5a', GOLD, MINT, SKYB, PINK, LAV]
// a small friend star stepping into the light
function friend(x, t, id, cx, cy, s, k, mood = 'sparkle', seed = 60, hops) { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { mood, seed, glyph: false, hops }) }
function beam(x, cx, k, top = 490, bottom = 1180, w = 200) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(cx - 40, top); x.lineTo(cx + 40, top); x.lineTo(cx + w, bottom); x.lineTo(cx - w, bottom); x.closePath(); x.fill(); x.restore()
}
function confetti(x, t, cx, cy, t0) {
  if (t < t0) return
  for (let i = 0; i < 18; i++) {
    const ph = ((t - t0) * 0.8 + i * 0.13) % 1
    x.fillStyle = CONF[i % 6]; x.fillRect(cx - 200 + (i * 47) % 400 + Math.sin(ph * 8 + i) * 16, cy - 200 + ph * 400, 12, 18)
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hands over the mic. | *Cheers the loudest.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 0.9))
      drawBits(x, MIC, { K: INK, G: '#c9cfe0' }, lerp(440, 760, p), lerp(860, 800, p), 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lerp(-0.4, 0.3, p) })
      friend(x, t, 'libra', 820, 990, 170, pop01(t, P.t0 + 0.4, 0.3, 2), 'heart', 61)
      label(x, 450, 650, 'GO YOU!!', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: '#ff6b5a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Shares the last slice. | *That’s love.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -190 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.8, 1.4))
      drawBits(x, SLICE, { C: '#e8a24a', P: '#ffd27a' }, lerp(480, 720, p), 980, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'gemini', 830, 990, 170, pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.4 ? 'heart' : 'wide', 62)
      bubble(x, 600, 680, 'it’s yours', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Tells your story | *better than you did.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'and THEN she said—', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      friend(x, t, 'cancer', 820, 1000, 160, pop01(t, P.t0 + 0.6, 0.3, 2), lt > 1.3 ? 'heart' : 'happy', 63)
      label(x, 760, 830, 'STARRING: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Makes sure everyone | *is in the photo.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, G: '#c9cfe0' }, 440, 700, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;['leo', 'virgo', 'aquarius'].forEach((id, i) => friend(x, t, id, 680 + i * 110, 1040, 110, pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2), 'happy', 64 + i))
      const f = prog(lt, 1.4, 1.6); if (f > 0 && f < 1) { x.save(); x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - f)).toFixed(3)})`; x.fillRect(110, 470, 860, 760); x.restore() }
      label(x, 790, 850, 'SQUEEZE IN!', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Shines a light | *on your win.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -210 },
    back(x, t, lt, P) { beam(x, 800, ease.outCubic(prog(lt, 0.4, 0.8)), 490, 1180, 190) },
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 800, 990, 180, pop01(t, P.t0 + 0.6, 0.35, 2), 'sparkle', 70, [P.t0 + 1.2])
      label(x, 800, 760, 'YOUR MOMENT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 960, P.t0 + 1.2, 8, 150, 0.2)
    } },
  { sign: 'virgo', cap: 'Credits everyone | *by name.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = CREAM; x.fillRect(-142, -192, 284, 384)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THANK YOU', 0, -150)
        x.font = `700 26px ${INTER}`; x.textAlign = 'left'
        ;['Sam (snacks)', 'Mia (ideas)', 'Jo (vibes)', 'Alex (chairs)', 'the dog'].forEach((n, i) => { if (lt > 0.4 + i * 0.2) x.fillText('✓ ' + n, -116, -90 + i * 58) })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Splits the stage | *perfectly even.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -150, y: 20, s: 250 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.setLineDash([18, 14]); x.strokeStyle = GOLD; x.lineWidth = 6
      x.beginPath(); x.moveTo(540, 520); x.lineTo(540, 1180); x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      friend(x, t, 'sagittarius', 750, 900, 250, pop01(t, P.t0 + 0.5, 0.35, 2), 'happy', 71)
      label(x, 540, 640, '50 / 50 ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quietly makes sure | *you get seen.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.6, 1.2))
      friend(x, t, 'pisces', lerp(560, 800, p), 960, 180, pop01(t, P.t0 + 0.3, 0.3, 2), lt > 1.2 ? 'sparkle' : 'wide', 72)
      label(x, 800, 720, 'HER IDEA, ACTUALLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Turns your win | *into a party.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      confetti(x, t, 540, 800, P.t0 + 0.6)
      friend(x, t, 'capricorn', 320, 990, 170, pop01(t, P.t0 + 0.3, 0.3, 2), lt > 1.0 ? 'heart' : 'wide', 73)
      label(x, 320, 700, 'YOU PASSED!!', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Gives you the credit | *in the meeting.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 820); x.scale(k, k)
      x.fillStyle = WOOD; x.fillRect(-100, 130, 16, 190); x.fillRect(84, 130, 16, 190)
      x.fillStyle = INK; x.fillRect(-170, -150, 340, 290); x.fillStyle = CREAM; x.fillRect(-160, -140, 320, 270)
      x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -100)
      x.font = `800 34px ${INTER}`; x.fillStyle = '#2fc79a'; if (lt > 0.8) x.fillText('idea by: SAM', 0, 10)
      x.restore()
    },
    front(x, t, lt, P) { hearts(x, t, 320, 1100, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 }) } },
  { sign: 'aquarius', cap: 'Makes room | *for the quiet ones.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { W: WOOD }, 790, 1050, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 790, 900, 150, pop01(t, P.t0 + 0.9, 0.35, 2), lt > 1.4 ? 'sparkle' : 'neutral', 74)
      bubble(x, 790, 680, 'what do YOU | think?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries proud tears | *at your win.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 800, 980, 170, pop01(t, P.t0 + 0.3, 0.3, 2), 'sparkle', 75, [P.t0 + 1.0])
      label(x, 800, 760, '1ST PLACE ✦', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 480, 640, 'SO proud', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0085', key: 'G', accent: '#f2c75c', ending: 'lesson',
  title: 'The signs | *sharing the stage.*',
  cameos: CAMEOS,
  group: { cap: 'Room for everyone | *in the light.*' },
  lesson: { text: 'Your light grows | when you *share it.*', chip: 'GLOW: SHARED' },
  last: {
    text: 'Leo’s still | *in the corner of it.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
