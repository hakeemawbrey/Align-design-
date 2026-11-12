// v3a089: zodiac.advice444, ADVICE SOLO, "Virgo, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): the loving Virgo habits they can gently let go of, one gag each.
//   0.0–3.6    "Virgo, stop doing | *this in love.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a text draft crossed out eight times: DRAFT 9 · a clipboard "PROJECT: THEM" becomes a heart · SORRY COUNT: 14
//              · a magnifying glass over "ok." · a spray bottle mid-clean: THEY LIKED IT MESSY · a planner block
//              "4:00 BE SPONTANEOUS" · their profile graded B+ in red pen · a smiley "I'M FINE" mask that slips
//              · juggling a broom, a laptop and a mug: LET THEM HELP
//  37.8        "Not perfect. | *Perfectly loved.*"  Virgo comes back.
//  41.0        LESSON UNLOCKED: "You don’t have to earn | *being loved.*"  LOVE: UNCONDITIONAL
//  46.9        "Draft one | *was perfect.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff7aa8', ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'virgo'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const SPRAY = [
  '..KKKKK...',
  '..KWWWK.SS',
  '...KWK..S.',
  '..KKKKK...',
  '.KBBBBBK..',
  '.KBBBBBK..',
  '.KBWBBBK..',
  '.KBBBBBK..',
  '.KBBBBBK..',
  '.KKKKKKK..',
]
const GLASS = ['..KKKK...', '.KWWWWK..', 'KWW..WWK.', 'KW....WK.', 'KW....WK.', 'KWW..WWK.', '.KWWWWK..', '..KKKKKK.', '......KKK', '.......KK']
const BROOM = ['..K..', '..K..', '..K..', '..K..', '..K..', 'YYYYY', 'YYYYY', 'Y.Y.Y']
const MUG = ['.WWWW..', 'WRRRRWW', 'WRRRRW.', 'WRRRRWW', '.WWWW..']
const LAP = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK', 'GGGGGGG']

function drafts(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -180, 316, 380)
  x.fillStyle = INK; x.fillRect(-162, -192, 324, 384); x.fillStyle = '#fff4e2'; x.fillRect(-154, -184, 308, 368)
  const L = ['hey!', 'hey :)', 'hi hey', 'hello!!', 'hey you', 'hi :)', 'heyyy', 'hey.']
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < Math.min(n, 8); i++) { const y = -158 + i * 40; x.fillStyle = INK; x.fillText(L[i], -126, y); x.fillStyle = RED; x.fillRect(-132, y - 2, 140, 5) }
  x.restore()
}
function clipboard(x, cx, cy, k, heart) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#c98f2a'; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = '#fff4e2'; x.fillRect(-124, -150, 248, 316)
  x.fillStyle = INK; x.fillRect(-50, -204, 100, 40); x.fillStyle = '#9a9ab0'; x.fillRect(-44, -198, 88, 28)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PROJECT: THEM', 0, -118)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; ['☐ fix sleep', '☐ fix diet', '☐ fix closet', '☐ fix…'].forEach((s, i) => x.fillText(s, -100, -66 + i * 44))
  if (heart > 0.01) { x.fillStyle = 'rgba(255,244,226,0.92)'; x.fillRect(-124, -150, 248, 316) }
  x.restore()
  drawBits(x, HEART, { H: ROSE }, cx, cy + 10 * k, 16 * heart * k)
}
function planner(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = '#fff4e2'; x.fillRect(-162, -192, 324, 384)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['1:00', '2:00', '3:00', '4:00', '5:00', '6:00'].forEach((s, i) => { x.fillStyle = '#6b62a8'; x.fillText(s, -150, -150 + i * 60); x.fillStyle = '#c9c0b0'; x.fillRect(-60, -126 + i * 60, 200, 3) })
  x.fillStyle = INK; x.fillRect(-64, -12, 204, 56); x.fillStyle = GOLD; x.fillRect(-60, -8, 196, 48)
  x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText('BE SPONTANEOUS', -52, 16)
  x.restore()
}
function graded(x, t, cx, cy, k, grade) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -190, 300, 400)
  x.fillStyle = INK; x.fillRect(-156, -204, 312, 408); x.fillStyle = '#2a2350'; x.fillRect(-148, -196, 296, 392)
  x.fillStyle = LAV; x.fillRect(-148, -196, 296, 52)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -170)
  x.fillStyle = '#140c30'; x.fillRect(-130, -130, 260, 170)
  x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.fillText('“i like tacos', 0, 90); x.fillText('and long walks”', 0, 128)
  x.restore()
  signChar(x, t, 'gemini', cx, cy - 50 * k, 140 * k, { mood: 'happy', seed: 61, glyph: false, glow: 0.6 })
  if (grade > 0.01) { x.save(); x.translate(cx + 90 * k, cy - 150 * k); x.rotate(-0.2); x.scale(grade * k, grade * k); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.stroke(); x.fillStyle = RED; x.font = `italic 700 54px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('B+', 0, 4); x.restore() }
}
function mask(x, cx, cy, k, drop) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= 1 - drop; x.translate(cx, cy + drop * 140); x.rotate(drop * 0.5); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-46, -36, 22, 30); x.fillRect(24, -36, 22, 30)
  x.lineWidth = 10; x.strokeStyle = INK; x.beginPath(); x.arc(0, 10, 54, 0.2, Math.PI - 0.2); x.stroke()
  x.fillStyle = INK; x.fillRect(-6, 100, 12, 120)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Draft nine? | *Draft one was cute.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drafts(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 8))
      label(x, 790, 1070, 'DRAFT 9', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They’re not | *a project.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      clipboard(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.4, 0.35, 2.4))
    } },
  { sign: S, cap: 'Stop saying sorry | *for existing.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', star: { x: -190 }, hops: [1.7],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 13)
      for (let i = 0; i < Math.min(4, Math.ceil(n / 3)); i++) bubble(x, 760 + (i % 2) * 60, 600 + i * 110, 'sorry!', pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1110, `SORRY COUNT: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“ok.” is just | *ok. Promise.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 760, 'ok.', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 96, tail: 'bl' })
      const g = ease.inOutCubic(prog(lt, 0.4, 1.0))
      drawBits(x, GLASS, { K: INK, W: '#c8f0ff' }, lerp(1000, 880, g), lerp(1060, 900, g), 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1090, 'NO HIDDEN MEANING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They liked | *your messy room.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, SPRAY, { K: INK, W: '#fff4e2', B: SKYB, S: '#c8f0ff' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      sparkles(x, t, 900, 680, P.t0 + 0.7, 7, 120, 0.4, [BONE, SKYB, '#ffffff'])
      bubble(x, 760, 1100, 'it felt cozy!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'You can’t schedule | *spontaneous.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      planner(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 450, 620, 'HMM.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.06 })
    } },
  { sign: S, cap: 'It’s a date. | *Not a grading rubric.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      graded(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.1, 0.3, 2.6))
    } },
  { sign: S, cap: '“I’m fine” | *isn’t fooling them.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', tears: lt => lt > 1.2 ? 1 : 0, star: { x: -40 }, hops: [1.8],
    front(x, t, lt, P, F) {
      mask(x, F.x, F.cy - 10, pop01(t, P.t0 + 0.1, 0.25, 2), ease.inCubic(prog(lt, 0.9, 1.3)))
      bubble(x, 760, 620, 'talk to me?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 1120, 'IT’S OKAY ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04 })
    } },
  { sign: S, cap: 'Doing it all? | *Let them help.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [0, -1], star: { x: -60 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const items = [[BROOM, { K: '#8a5a2e', Y: GOLD }], [LAP, { K: INK, S: SKYB, G: '#9a9ab0' }], [MUG, { W: '#fff4e2', R: ROSE }]]
      items.forEach(([bm, c], i) => { const a = t * 3 + i * 2.1; drawBits(x, bm, c, F.x + Math.cos(a) * 150, F.top - 80 + Math.sin(a) * 60, 12 * k) })
      const kf = pop01(t, P.t0 + 1.3, 0.35, 2)
      if (kf > 0.01) signChar(x, t, 'taurus', 860, 1000, 170 * kf, { mood: 'happy', look: [-1, -1], seed: 33, glyph: false })
      label(x, 860, 1150, 'I GOT THE MUG', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a089', key: 'G', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Virgo, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly loved.*', mood: 'heart' },
  lesson: { text: 'You don’t have to earn | *being loved.*', chip: 'LOVE: UNCONDITIONAL' },
  last: { text: 'Draft one | *was perfect.*', draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) } },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'Virgo,stop'
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
