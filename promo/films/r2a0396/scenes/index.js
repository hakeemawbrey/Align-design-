// r2a0396: star_advice ADVICE SOLO (pisces), "How to cheer up | a Pisces." (signs3kit social cut, music: lofi · D). Ending: lesson.
//   nine cards, Pisces cries in every one (happier tears as each card lands): tissues, not jokes · a song that gets it
//   · build the blanket fort together · just sit with the feelings · ask for chapter two of the daydream · snacks in
//   silence · softness lifts heavy things · puddle-jump the rainy day · their chart says: needs a hug
//   group: "Soft heart. | Big feelings."  lesson: "Pisces feel it all. | That's their gift."  last: "Happy tears | still count."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fb8ff', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
const BOX = ['...WWWW...', '..WWWWWW..', 'BBBBBBBBBB', 'BPPPPPPPPB', 'BPPWPPWPPB', 'BPPPPPPPPB', 'BPWPPPPWPB', 'BBBBBBBBBB']
const BOX_C = { W: '#ffffff', B: '#6b62a8', P: '#b7a6ff' }
const TISSUE = ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.']
const FORT = ['......P......', '.....PPP.....', '....PPPPP....', '...PPPLPPP...', '..PPPPPPPPP..', '.PPPPKKKPPPP.', 'PPPPKKKKKPPPP', 'PPPPKKKKKPPPP', 'PPPPKKKKKPPPP']
const FORT_C = { P: '#ff8fb1', L: '#ffe36a', K: '#2a2350' }
const BOWL = ['.Y.W.Y.W.Y.', 'WYWYWYWYWYW', 'RRRRRRRRRRR', '.RWRRWRRWR.', '..RRRRRRR..', '...RRRRR...']
const BOWL_C = { Y: '#ffe36a', W: '#fff4e2', R: RED }
const DUMB = ['KK.......KK', 'KK.......KK', 'KKGGGGGGGKK', 'KK.......KK', 'KK.......KK']
const CLOUD = ['...WWWW.....', '.WWWWWWWW...', 'WWWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const BOOT = ['.YYY..', '.YYY..', '.YYY..', '.YYY..', '.YYYYY', 'YYYYYY', 'KKKKKK']
const CASTLE = ['L.L...L.L', 'LLL...LLL', 'LLLLLLLLL', 'LLLKLKLLL', 'LLLLLLLLL', 'LLLLKLLLL', 'LLLLKLLLL']
function rain(x, t, cx, cy, w) {
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < 7; i++) { const ph = ((t * 1.4 + i * 0.37) % 1 + 1) % 1; x.fillRect(cx - w / 2 + (i / 6) * w, cy + ph * 160, 5, 16) }
  x.restore()
}
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 114, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 88, Math.sin(a) * 88); x.lineTo(Math.cos(a) * 114, Math.sin(a) * 114); x.stroke() }
  x.strokeStyle = ACC; x.beginPath(); x.moveTo(-56, -30); x.lineTo(44, 54); x.lineTo(30, -64); x.closePath(); x.stroke()
  x.restore()
}

const S = 'pisces', ST = { x: -170 }
const TEARS = lt => lt < 1.3 ? 3 : 2          // still crying, but softer once the card lands
const CAMEOS = [
  { sign: S, cap: 'Sad movie scene? | *Bring tissues, not jokes.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) {
        const ph = clamp((lt - 0.5 - i * 0.2) / 0.6)
        if (ph > 0) drawBits(x, TISSUE, { W: '#ffffff' }, 800 + (i - 1.5) * 70 * ph, 880 - 220 * ease.outCubic(ph), 12, { rot: i * 0.4 * ph })
      }
      L(x, 760, 1130, 'BOX THREE. NO JUDGING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 26)
    } },
  { sign: S, cap: 'Send a song | that *gets it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05, bg: '#2a2350' }, () => {
        x.fillStyle = '#140c30'; x.fillRect(-110, -160, 220, 300)
        x.fillStyle = ACC; x.fillRect(-80, -130, 160, 160)
        x.fillStyle = INK; x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♪', 0, -50)
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('“for you”', 0, 70)
        x.fillStyle = '#6b62a8'; x.fillRect(-90, 106, 180, 8); x.fillStyle = PINK; x.fillRect(-90, 106, 180 * clamp((lt - 0.4) / 2), 8)
      })
      notes(x, t, 790, 700, { n: 4, cell: 7, col: ACC, seed: 3 })
      bubble(x, 790, 1120, 'it’s me. | it’s my song.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Blanket fort? | *Build it together.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', tears: TEARS, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 800, 930, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 1000, 120 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      L(x, 800, 650, 'FORT: OPEN 24/7', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Feeling everything? | *Just sit with them.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: TEARS, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 720, 900, 210 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      L(x, 760, 660, 'NO FIXING. JUST HERE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 28)
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Wild daydream? | *Ask for chapter two.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: TEARS, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CLOUD, { W: '#efe6ff' }, 800, 860, 26 * k)
      drawBits(x, CASTLE, { L: LAV, K: INK }, 800, 780, 16 * k)
      label(x, 800, 1060, 'A CASTLE. FOR SNAILS.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'and then?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Snacks, in silence. | *Love language.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: TEARS, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'TALKING: OPTIONAL', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 32)
      L(x, 790, 1140, 'POPCORN: REQUIRED', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Soft heart? | *Still lifts heavy things.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', tears: TEARS, look: [0, -1], star: ST, hops: [1.2, 1.7],
    front(x, t, lt, P, F) {
      const lift = ease.outBack ? ease.outBack(prog(lt, 0.6, 1.2)) : ease.outCubic(prog(lt, 0.6, 1.2))
      drawBits(x, DUMB, { K: INK, G: '#9aa5c4' }, F.x, lerp(F.cy + 150, F.top - 60, lift), 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'SOFT', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.05, 56)
      L(x, 800, 900, '= STRONG', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.05, 56)
      sparkles(x, t, F.x, F.top - 60, P.t0 + 1.3, 7, 130, 0.5)
    } },
  { sign: S, cap: 'Rainy day? | *Puddle-jump with them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', tears: TEARS, look: [1, 0], star: ST, hops: [0.9, 1.5],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOUD, { W: '#9aa5c4' }, 380, 560, 16 * k)
      if (k > 0.9) rain(x, t, 380, 600, 160)
    },
    front(x, t, lt, P) {
      drawBits(x, BOOT, { Y: '#ffe36a', K: INK }, 760, 1040, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      drawBits(x, BOOT, { Y: '#ffe36a', K: INK }, 880, 1040, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { sx: -1 })
      const sp = clamp((lt - 0.9) / 0.5)
      if (sp > 0 && sp < 1) { x.fillStyle = SKYB; for (let i = 0; i < 8; i++) { const a = Math.PI + i / 7 * Math.PI; x.fillRect(820 + Math.cos(a) * 120 * sp, 1100 + Math.sin(a) * 80 * sp, 12, 12) } }
      L(x, 820, 760, 'SPLASH RATING: 10', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.04, 28)
    } },
  { sign: S, cap: 'Checked their chart? | It says: *hug them.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: TEARS, look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 800, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1010, 'READING: NEEDS A HUG', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 28)
      L(x, 800, 1110, 'DOSAGE: MANY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
      hearts(x, t, 800, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0396', key: 'D', accent: ACC, solo: 'pisces', ending: 'lesson',
  title: 'How to cheer up | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Big feelings.*', mood: 'heart' },
  lesson: { text: 'Pisces feel it all. | That’s their *gift.*', chip: 'STATUS: CHEERED UP' },
  last: {
    text: 'Happy tears | *still count.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
