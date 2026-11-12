// v3a087: zodiac.advice444, ADVICE ROLL CALL, "What each sign needs | after a long day." (~63 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, relatable "what you need tonight" line each, one light gag each.
//   0.0–3.6    "What each sign needs | *after a long day.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve cards (3.8 s each):
//              ♈ running shoes, then a snack · ♉ a bubble bath with a rubber duck · ♊ a 4:32 voice note to the bestie
//              · ♋ the comfort show, episode 400 · ♌ a jar of compliments ("your match: you're glowing")
//              · ♍ one sparkling plate · ♎ three candles: DECISIONS: NONE · ♏ the light switch flips off, two eyes
//              glow · ♐ a compass, any direction · ♑ a permission slip, signed: your chart · ♒ a telescope
//              · ♓ headphones and drifting notes (and tears, obviously)
//  49.2        "Different signs. | *Same couch.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Rest looks different | for *everyone.*"  DAY: DONE
//  58.3        "Pisces is still | *crying. Happily.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', ACC = '#8fe3ff'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const SHOE = ['...RRRR...', '..RRWRRR..', '.RRRWRRRRR', 'RRRRRRRRRR', 'WWWWWWWWWW', 'KKKKKKKKKK']
const DUCK = ['.YYY..', 'YYKYO.', 'YYYYOO', '.YYYY.', 'YYYYYY', '.YYYY.']
const PLATE_BM = ['..WWWWWW..', '.WWBBBBWW.', 'WWBBBBBBWW', 'WWBBBBBBWW', '.WWBBBBWW.', '..WWWWWW..']
const CANDLE = ['.F.', 'FYF', '.W.', 'CCC', 'CCC', 'CCC', 'CCC', 'CCC']
const SCOPE = [
  '..........KK',
  '........KKBB',
  '......KKBBBK',
  '....KKBBBKK.',
  '..KKBBBKK...',
  'KKBBBKK.....',
  '.KBKK.......',
  '...K.K......',
  '..K...K.....',
  '.K.....K....',
]
const PHONES = [
  '.KKKKKKKK.',
  'KK......KK',
  'K........K',
  'K........K',
  'PPP....PPP',
  'PPP....PPP',
  'PPP....PPP',
]

function tub(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -20, 380, 150); x.fillStyle = '#fff4e2'; x.fillRect(-182, -12, 364, 134)
  x.fillStyle = INK; x.fillRect(-160, 130, 20, 30); x.fillRect(140, 130, 20, 30)
  for (let i = 0; i < 9; i++) { const bx = -160 + i * 40, by = -24 - Math.abs(Math.sin(i * 1.7 + t * 2)) * 24; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8f7ff'; x.beginPath(); x.arc(bx, by, 21, 0, Math.PI * 2); x.fill() }
  x.restore()
  drawBits(x, DUCK, { Y: GOLD, K: INK, O: ORANGE }, cx + 90 * k, cy - 70 * k + Math.sin(t * 3) * 6, 12 * k)
}
function voiceNote(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -60, 360, 120); x.fillStyle = MINT; x.fillRect(-172, -52, 344, 104)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -22); x.lineTo(-110, 0); x.lineTo(-150, 22); x.closePath(); x.fill()
  for (let i = 0; i < 14; i++) { const h = 10 + Math.abs(Math.sin(i * 1.3 + t * 5)) * 34; x.fillRect(-90 + i * 14, -h / 2, 8, h) }
  x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('4:32', 160, 0)
  x.restore()
}
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -130, 360, 250); x.fillStyle = '#6b6b80'; x.fillRect(-172, -122, 344, 234)
  x.fillStyle = '#9fd8ff'; x.fillRect(-152, -102, 304, 194)
  x.fillStyle = INK; x.fillRect(-60, 120, 20, 40); x.fillRect(40, 120, 20, 40)
  x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EP. 400', 0, -10)
  x.font = `700 22px ${MONO}`; x.fillText('(seen it 9×)', 0, 40)
  x.restore()
}
function jar(x, t, cx, cy, k, fillP) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -170, 220, 40); x.fillStyle = GOLD; x.fillRect(-104, -164, 208, 28)
  x.fillStyle = INK; x.fillRect(-130, -130, 260, 300); x.fillStyle = 'rgba(200,230,255,0.35)'; x.fillRect(-122, -122, 244, 284)
  const n = Math.floor(clamp(fillP) * 14), COLS = [PINK, GOLD, MINT, LAV, SKYB]
  for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); x.fillStyle = INK; x.fillRect(-104 + c * 54 - 2, 116 - r * 50 - 2, 48, 40); x.fillStyle = COLS[i % 5]; x.fillRect(-104 + c * 54, 116 - r * 50, 44, 36) }
  x.restore()
}
function lightSwitch(x, cx, cy, k, off) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-80, -120, 160, 240); x.fillStyle = '#fff4e2'; x.fillRect(-72, -112, 144, 224)
  x.fillStyle = INK; x.fillRect(-30, -70, 60, 140); x.fillStyle = '#c9c9d8'; x.fillRect(-24, off ? 0 : -64, 48, 64)
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(off ? 'OFF' : 'ON', 0, off ? -86 : 96)
  x.restore()
}
function compass(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c98f2a'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 126, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -96); x.fillText('S', 0, 98); x.fillText('E', 98, 0); x.fillText('W', -98, 0)
  x.rotate(t * 3)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -84); x.lineTo(16, 0); x.lineTo(-16, 0); x.closePath(); x.fill()
  x.fillStyle = '#6b6b80'; x.beginPath(); x.moveTo(0, 84); x.lineTo(16, 0); x.lineTo(-16, 0); x.closePath(); x.fill()
  x.restore()
}
function slip(x, cx, cy, k, sign) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 336, 260)
  x.fillStyle = INK; x.fillRect(-172, -132, 344, 264); x.fillStyle = '#fff4e2'; x.fillRect(-164, -124, 328, 248)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 30px ${INTER}`; x.fillText('PERMISSION SLIP', 0, -84)
  x.font = `700 22px ${MONO}`; x.fillText('to stop working.', 0, -38); x.fillText('tonight. for real.', 0, -6)
  x.fillStyle = '#c9c0b0'; x.fillRect(-120, 70, 240, 4)
  if (sign > 0.01) { x.save(); x.beginPath(); x.rect(-130, 20, 260 * sign, 60); x.clip(); x.fillStyle = '#3a5ad8'; x.font = `italic 600 34px Georgia, serif`; x.fillText('your chart ✦', 0, 50); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A quick sprint. | *Then a snack.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -180 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, { R: RED, W: '#fff4e2', K: INK }, 760 + Math.sin(t * 12) * 8 * (lt < 1.3 ? 1 : 0), 860, 20 * k)
      label(x, 790, 1060, 'ZOOM. THEN NOM.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'A bath. | *No exceptions.*', mood: 'sleepy', star: { x: -180, y: -20 },
    front(x, t, lt, P) {
      tub(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A long voice note | *to their bestie.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1000, 'PART 1 OF 6', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Their comfort show. | *Episode 400.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      tv(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1090, 'STILL CRIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Compliments. | *Lots of them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      jar(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.3, 1.6))
      bubble(x, 760, 580, 'your match: | “you’re glowing”', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'A clean kitchen. | *Then they can breathe.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PLATE_BM, { W: '#fff4e2', B: '#e8f2ff' }, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 220, 0.4, [BONE, SKYB, '#ffffff'])
      label(x, 790, 1090, 'SPOTLESS. AHH.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Candles and | *zero decisions.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      ;[[700, 0.2, 18], [800, 0.45, 22], [900, 0.7, 16]].forEach(([cx, d, c]) => drawBits(x, CANDLE, { F: ORANGE, Y: GOLD, W: INK, C: '#ffd0df' }, cx, 920, c * pop01(t, P.t0 + d, 0.3, 2)))
      label(x, 800, 640, 'DECISIONS: NONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Silence. | *And a dark room.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const off = lt > 1.0
      lightSwitch(x, 820, 820, pop01(t, P.t0 + 0.2, 0.35, 2), off)
      if (off) { x.save(); x.globalAlpha = 0.55 * clamp((lt - 1.0) * 4); x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 820, 1080, 'AHHH. PEACE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'A walk outside. | *Anywhere.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      compass(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1070, 'ANY WAY IS FINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Permission | *to stop working.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slip(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.9, 1.5))
      label(x, 790, 1060, 'APPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 38, bg: MINT, rot: -0.06 })
    } },
  { sign: 'aquarius', cap: 'Alone time. | *Plus one weird hobby.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { K: INK, B: SKYB }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 920, 620, P.t0 + 1.2, 6, 80, 0.4)
      label(x, 790, 1090, 'SAYING HI TO SATURN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A good cry. | *Then a cozy song.*', mood: 'sparkle', tears: lt => lt > 1.2 ? 2 : 3, star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PHONES, { K: LAV, P: PINK }, 800, 880, 20 * pop01(t, P.t0 + 0.4, 0.35, 2.2))
      if (lt > 0.8) notes(x, t, 800, 800, { n: 4, cell: 7, col: SKYB, seed: 3 })
      label(x, 820, 640, 'FEELINGS: FELT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a087', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign needs | *after a long day.*',
  cameos: CAMEOS,
  group: { cap: 'Different signs. | *Same couch.*' },
  lesson: { text: 'Rest looks different | for *everyone.*', chip: 'DAY: DONE' },
  last: { text: 'Pisces is still | *crying. Happily.*' },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'Whateachsign'
async function build(stage) {
  const scene = await F.SCENES[0](stage)
  const box = [...stage.querySelectorAll('div')].find(d => d.querySelector(':scope > br') && d.textContent.replace(/\s+/g, '').startsWith(HOOK_START))
  if (box) {
    const prev = box.style.display; box.style.display = 'block'
    let widest = 0, cur = 0
    for (const n of box.childNodes) {
      if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
      cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || 92)
    }
    widest = Math.max(widest, cur)
    const maxW = parseFloat(box.style.width) || 940
    if (widest > maxW) {
      const k = Math.max(0.6, (maxW - 8) / widest)
      box.style.fontSize = (92 * k) + 'px'
      for (const sp of box.querySelectorAll(':scope > span')) if (sp.style.fontStyle === 'italic') sp.style.fontSize = (124 * k) + 'px'
    }
    box.style.display = prev
  }
  return scene
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
