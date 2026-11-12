// r2t0651: star_talk, BELIKE, "Bad hair day? | Zodiacs *be like.*" (topic: zodiacs on a bad hair day; signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each wearing one very bad tuft of pixel hair:
//   ♈ cut it themselves at 3 a.m. · ♉ staying in bed until it fixes itself · ♊ two hairstyles, one head
//   · ♋ called mom about it · ♌ declared it a trend · ♍ fixed one strand for two hours · ♎ asked twelve people, got
//   twelve opinions · ♏ no photos, no witnesses · ♐ shaved it off, booked a flight · ♑ booked a meeting with the hair
//   · ♒ hair stood straight up, now picking up signals · ♓ saw the mirror, wrote a sad song (tears).
// Ending: callback. group "Twelve signs. | *Zero good hair.*", then "By Friday? | It was *a trend.*" (Leo's card paid
// off: three more stars turn up wearing Leo's tuft).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }
const BROWN = '#8a4a2e', BLOND = '#ffd86a', GREEN = '#5fd068'

// ── hair: a messy tuft that sits on the star's top point (F = the star's sprite frame)
const TUFT = [
  'H..H...H..H',
  '.H.H..H..H.',
  '..HHH.H.H..',
  '.HHHHHHHHH.',
  '..HHHHHHH..',
]
const FRIZZ = [
  'H.H..H..H.H',
  '.H.H.H.H.H.',
  'H.HHHHHHH.H',
  '.HHHHHHHHH.',
  'HHHHHHHHHHH',
  '..HHHHHHH..',
]
const CURL = ['.HHH.', 'H...H', 'H.H.H', '.HHH.', '..H..']
const SPIKE = ['..H..', '..H..', '.HHH.', '.HHH.', 'HHHHH']
const BANGS = ['HHHHHHHHH', 'H.H.HH.HH', 'H....H..H']
function hair(x, F, bm = TUFT, col = BROWN, k = 1, { dx = 0, dy = 0, cell, rot = 0 } = {}) {
  if (!F || k <= 0.01) return
  const c = (cell ?? F.cell * 1.8) * k
  drawBits(x, bm, { H: col }, F.x + dx, F.top - bm.length * c / 2 + c * 1.2 + dy, c, { rot })
}

const SCISSORS = ['SS....SS', 'S.S..S.S', '.SS..SS.', '...SS...', '...SS...', '..R..R..', '.R....R.', 'R......R', '.R....R.', '..RRRR..']
const SCISSORS_C = { S: STEEL, R: RED }
const MIRROR = ['..WWWWWW..', '.WSSSSSSW.', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', '.WSSSSSSW.', '..WWWWWW..', '....WW....', '....WW....', '...WWWW...']
const MIRROR_C = { W: WOOD, S: '#bfe6ff' }
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSSKKKSSSK', 'KSKWWWKSSK', 'KSKWWWKSSK', 'KSSKKKSSSK', 'KKKKKKKKKK']
const CAMERA_C = { K: INK, S: STEEL, W: SKYB }
const PLANE2 = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const PLANE2_C = { W: '#ffffff', S: SKYB }

// signal waves coming off the top of a head
function waves(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = MINT; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) {
    const ph = ((t * 1.3 + i / 3) % 1)
    x.globalAlpha = k * (1 - ph); x.lineWidth = 8
    x.beginPath(); x.arc(cx, cy, 40 + ph * 150, -Math.PI * 0.8, -Math.PI * 0.2); x.stroke()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cut it themselves. | *At 3 a.m.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      hair(x, F, lt > 1.2 ? BANGS : TUFT, BROWN, 1, { dy: lt > 1.2 ? 10 : 0 })
      drawBits(x, SCISSORS, SCISSORS_C, 790, 860, 18 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: lt > 0.6 && lt < 1.3 ? 0.25 * Math.sin(lt * 30) : -0.3 })
      L(x, 790, 650, '3:00 A.M.', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 40)
      L(x, 790, 1080, 'BANGS: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Staying in bed | until it *fixes itself.*', mood: 'sleepy', star: { x: -170, y: 30 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 760, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P, F) {
      hair(x, F, FRIZZ, BROWN)
      bits(x, 'BLANKET', 400, 1060, 30 * pop01(t, P.t0 + 0.3, 0.3, 2))
      zzz(x, t, 560, 680, { size: 44 })
      L(x, 790, 760, 'DAY 3', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 48)
      L(x, 790, 900, 'STILL WAITING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Left side: curls. | Right side: *straight.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -60 },
    front(x, t, lt, P, F) {
      hair(x, F, CURL, BLOND, 1, { dx: -50, dy: 10 }); hair(x, F, CURL, BLOND, 1, { dx: -120, dy: 60 })
      hair(x, F, SPIKE, BROWN, 1, { dx: 50, dy: 6 }); hair(x, F, SPIKE, BROWN, 1, { dx: 120, dy: 56 })
      L(x, 260, 640, 'TEAM CURL', pop01(t, P.t0 + 0.5, 0.3, 2.2), BLOND, -0.06, 30)
      L(x, 820, 640, 'TEAM FLAT', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, 0.06, 30)
      bubble(x, 540, 1140, 'we can’t agree', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Called mom | *about it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hair(x, F, TUFT, BROWN)
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.3, 2), { head: 'MOM ♡', headCol: PINK, lines: [['my hair…', LAV, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['you look', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['perfect ♡', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]] })
      L(x, 790, 1110, 'CALL: 2 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Bad hair? | Leo made it *a trend.*', mood: 'sparkle', star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hair(x, F, FRIZZ, '#ff9a4a')
      L(x, 790, 700, 'NEW LOOK ✦', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 42)
      L(x, 790, 860, 'CALLED IT: “THE LEO”', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 26)
      bubble(x, 790, 1040, 'you’re welcome', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 380, 720, P.t0 + 0.9, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Fixed one strand. | For *two hours.*', mood: 'squint', look: [0, -1], star: ST,
    front(x, t, lt, P, F) {
      hair(x, F, ['H'], BROWN, 1, { dy: -14 })
      hair(x, F, FRIZZ, BROWN, 1 - clamp((lt - 0.2) / 0.4), {})
      bits(x, 'TWEEZ', F.x + 90, F.top - 20, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.6 })
      const m = Math.floor(lerp(0, 119, clamp((lt - 0.4) / 1.6)))
      L(x, 790, 760, `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.4, 0.3, 2.2), MINT, 0.05, 46)
      L(x, 790, 920, 'STRANDS FIXED: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked twelve people. | Got *twelve opinions.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -60 },
    front(x, t, lt, P, F) {
      hair(x, F, TUFT, BROWN)
      const OP = [['cute!', 250, 600, 'br'], ['hat?', 820, 620, 'bl'], ['shave it', 230, 1080, 'br'], ['iconic', 840, 1060, 'bl'], ['bangs!!', 840, 840, 'bl'], ['no.', 240, 840, 'br']]
      OP.forEach(([w, bx, by, tl], i) => bubble(x, bx, by, w, pop01(t, P.t0 + 0.3 + i * 0.22, 0.25, 2.2), { size: 34, tail: tl, col: i % 2 ? BONE : LAV }))
    } },
  { sign: 'scorpio', cap: 'No photos. | No *witnesses.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hair(x, F, FRIZZ, '#3a2a5a')
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, CAMERA, CAMERA_C, 790, 840, 20 * k)
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; const p = clamp((lt - 1.0) / 0.3); x.beginPath(); x.moveTo(680, 740); x.lineTo(680 + 220 * p, 740 + 200 * p); x.stroke(); x.restore() }
      L(x, 790, 1070, 'CAMERAS: BANNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Shaved it off. | Booked *a flight.*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', star: ST, hops: [1.0, 1.6],
    back(x, t, lt, P) {
      const p = prog(lt, 1.0, 2.4)
      if (p > 0 && p < 1) drawBits(x, PLANE2, PLANE2_C, lerp(560, 1000, p), 640 - 80 * p, 14, { rot: -0.1 })
    },
    front(x, t, lt, P, F) {
      hair(x, F, FRIZZ, BROWN, 1 - clamp((lt - 0.4) / 0.3))
      L(x, 790, 880, 'BALD & FREE', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, 0.05, 40)
      L(x, 790, 1040, 'GATE 7 · NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Booked a meeting | with *the hair.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hair(x, F, TUFT, '#5a4a3a')
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 300, head: 'AGENDA', headBg: STEEL, headInk: INK, lines: ['1. frizz', '2. volume', '3. why'], size: 34, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1080, '9:00 SHARP', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Hair stood straight up. | *Picking up signals.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [0, -1], star: { x: -60 },
    front(x, t, lt, P, F) {
      hair(x, F, ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], '#6fc3ff', 1, { dy: -10 })
      waves(x, t, F.x, F.top - 70, clamp((lt - 0.4) / 0.3))
      L(x, 540, 1140, 'SIGNAL: STRONG', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 34)
      bubble(x, 840, 640, 'aliens?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl', col: MINT })
    } },
  { sign: 'pisces', cap: 'Saw the mirror. | Wrote *a sad song.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hair(x, F, FRIZZ, '#b7a6ff')
      drawBits(x, MIRROR, MIRROR_C, 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 560, 700, { n: 4, cell: 7, col: SKYB, seed: 4, alpha: clamp((lt - 1.0) / 0.3) })
      L(x, 800, 1100, '“OH, MY HAIR” (4 MIN)', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0651', key: 'C', accent: ACC, ending: 'callback',
  title: 'Bad hair day? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero good hair.*' },
  last: {
    text: 'By Friday? | It was *a trend.*',
    draw(x, t, lt) {
      const t0 = t - lt
      ;[['leo', 540, 1060, 300, 0.2], ['aries', 260, 1180, 200, 0.7], ['libra', 820, 1180, 200, 0.9], ['pisces', 540, 1320, 170, 1.1]].forEach(([id, cx, cy, s, d], i) => {
        const k = pop01(t, t0 + d, 0.45, 1.8)
        if (k <= 0.01) return
        const Fs = signChar(x, t, id, cx, cy, s * k, { mood: 'sparkle', seed: 50 + i, glyph: false, hops: [t0 + d + 0.6], tears: id === 'pisces' ? 2 : 0 })
        hair(x, Fs, FRIZZ, '#ff9a4a', k)
      })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
