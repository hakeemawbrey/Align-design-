// trs3crush: THE SIGNS AS… v3, "Zodiacs with a crush | be like." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Story, then the closing match card. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Zodiacs with a crush | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one crush per sign (3.8 s each), each pushed to the extreme:
//              ♈ confessed on day one, via megaphone · ♉ baked them a cake every day, for months
//              · ♊ rehearsed the chat, played both parts · ♋ knitted matching sweaters, they've talked once
//              · ♌ a subtle hint: a billboard of Leo · ♍ made a spreadsheet, zero cons found
//              · ♎ checked compatibility forty times · ♏ hasn't blinked at their profile since Tuesday
//              · ♐ flirts by roasting their chart · ♑ scheduled their feelings, Tuesdays 4:15
//              · ♒ built a robot to flirt for them · ♓ wrote a hundred poems, sent none (sobbing)
//  49.2        "Subtle? | *Never heard of it.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Crushes are scary. | *Say it anyway.*"  CRUSH: TOLD
//  58.3        "Check #41: | *still aligned.*" over the match card: Libra + Aries (the pair Libra kept re-checking).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

// ── props
const MEGAPHONE = [
  '..........RR',
  '........RRWR',
  '......RRRRWR',
  'GGGGRRRRRRWR',
  'GGGGRRRRRRWR',
  '......RRRRWR',
  '.....HHRRRWR',
  '.....HH...RR',
  '.....HH.....',
]
const MEGA_C = { R: '#ff6b5a', W: '#fff4e2', G: '#9aa5c4', H: '#2a2350' }
const CAKE = [
  '.PPPPPPPPP.',
  'PWPPWPPPWPP',
  'WWWWWWWWWWW',
  'CCCCCCCCCCC',
  'YYYYYYYYYYY',
  'CCCCCCCCCCC',
]
const CANDLE = ['.F.', '.Y.', '.R.', '.R.']
const CAKE_C = { P: PINK, W: '#fff4e2', C: '#7a4a2e', Y: '#ffe7a8', R: '#e23d4e', F: GOLD }
const SWEATER = [
  '...WW...WW...',
  '.SSSSWWWSSSS.',
  'SSSSSSSSSSSSS',
  'SSS.SHSHS.SSS',
  'SS..SHHHS..SS',
  'SS..SSHSS..SS',
  '....SSSSS....',
  '....SSSSS....',
  '....WWWWW....',
]
const SWEATER_C = { S: '#8fe3ff', W: '#fff4e2', H: '#ff4f86' }
const SWEATER2_C = { S: '#ff8fb1', W: '#fff4e2', H: '#e23d4e' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSYYSSK',
  'KSYYYYSK',
  'KSSYYSSK',
  'KSSSSSSK',
  'KSHHSHHK',
  'KSHHHHHK',
  'KSSHHHSK',
  'KSSSHSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', G: '#6b62a8', Y: '#c97bff' }
const ROBOT = [
  '.....A.....',
  '.....A.....',
  '..MMMMMMM..',
  '..MEEMEEM..',
  '..MEEMEEM..',
  '..MMMMMMM..',
  '..MHHHHHM..',
  '...MMMMM...',
  'MMMMMMMMMMM',
  'M.MMMRMMM.M',
  'M.MMRRRMM.M',
  'M.MMMRMMM.M',
  '..MMMMMMM..',
  '..MM...MM..',
  '..MM...MM..',
]
const ROBOT_C = { A: GOLD, M: '#9aa5c4', E: '#7dffb0', H: '#2a2350', R: '#ff4f86' }
const PAGE = [
  'WWWWWWWWWW',
  'WKKKKKKW.W',
  'WWWWWWWWWW',
  'WKKKKK.KKW',
  'WWWWWWWWWW',
  'WKKKKKKKWW',
  'WWWWWWWWWW',
  'WKK.KKKKKW',
  'WWWWWHWHWW',
  'WWWWHHHHHW',
  'WWWWWHHHWW',
  'WWWWWWHWWW',
]
const PAGE_C = { W: '#fff4e2', K: '#9aa5c4', H: '#ff4f86' }

/** a little birth-chart wheel: twelve coloured houses, a few planet dots, drawn at k */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) {
    x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill()
  }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 3
  for (const [a, b] of [[0.4, 2.6], [2.6, 4.5], [4.5, 0.4], [1.2, 3.9]]) { x.beginPath(); x.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); x.lineTo(Math.cos(b) * r * 0.55, Math.sin(b) * r * 0.55); x.stroke() }
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) { x.fillRect(Math.cos(a) * r * 0.55 - 7, Math.sin(a) * r * 0.55 - 7, 14, 14) }
  x.restore()
}

/** a framed card: ink outline, drop shadow, bone (or given) face; fn draws inside in local coords */
function card(x, cx, cy, w, h, k, rot, fn, face = '#fff4e2') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Confessed on day one. | Via *megaphone.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -170 }, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MEGAPHONE, MEGA_C, 560, 900, 15 * k, { rot: -0.12 })
      // sound waves out of the bell
      const w = prog(lt, 0.45, 2.4)
      if (w > 0 && k > 0.9) {
        x.save(); x.strokeStyle = BONE; x.lineWidth = 8
        for (let i = 0; i < 3; i++) { const ph = (lt * 1.6 + i / 3) % 1; x.globalAlpha = 0.7 * (1 - ph); x.beginPath(); x.arc(600, 880, 70 + ph * 170, -0.75, 0.45); x.stroke() }
        x.restore()
      }
      bubble(x, 780, 640, 'I LIKE YOU!!!', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 52, tail: 'bl' })
      sparkles(x, t, 780, 640, P.t0 + 0.65, 8, 190, 0.3)
    } },
  { sign: 'taurus', cap: 'Baked them a cake. | Every day. *For months.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -170 },
    back(x, t, lt, P) {
      const n = clamp(Math.floor((lt - 0.15) / 0.22) + 1, 0, 6)
      for (let j = 0; j < n; j++) drawBits(x, CAKE, CAKE_C, 790 + (j % 2 ? 6 : -6), 1110 - j * 74, 13 * pop01(t, P.t0 + 0.15 + j * 0.22, 0.25, 2))
      if (n >= 6) drawBits(x, CANDLE, CAKE_C, 790, 1110 - 5 * 74 - 64, 13 * pop01(t, P.t0 + 1.7, 0.25, 2))
    },
    front(x, t, lt, P) {
      label(x, 500, 640, 'DAY 112', pop01(t, P.t0 + 1.9, 0.3, 2), { size: 40, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'gemini', cap: 'Rehearsed the chat. | Played *both parts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const crushOn = Math.floor(Math.max(0, lt - 0.5) / 0.5) % 2 === 1
      if (k > 0.01) signChar(x, t, 'gemini', 790, 990, 210 * k, { mood: crushOn ? 'wink' : 'happy', look: [-1, 0], seed: 11, glyph: false })
      label(x, 790, 820, 'AS: THE CRUSH', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 28, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      const L = [['hey crush.', 'bl', 420], ['oh hi, Gemini!', 'br', 760], ['you look nice', 'bl', 420], ['so do you!!', 'br', 760]]
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.5))
      const [s, tail, bx] = L[n]
      bubble(x, bx, 640, s, pop01(t, P.t0 + 0.52 + n * 0.5, 0.22, 2.2), { size: 46, tail, col: tail === 'br' ? LAV : BONE })
    } },
  { sign: 'cancer', cap: 'Knitted matching sweaters. | They’ve *talked once.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SWEATER, SWEATER_C, 700, 900, 15 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.08 })
      drawBits(x, SWEATER, SWEATER2_C, 870, 920, 15 * pop01(t, P.t0 + 0.55, 0.3, 2), { rot: 0.08 })
      bubble(x, 790, 650, 'one’s for you!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Dropped a subtle hint: | a *billboard.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: { x: -190, y: 60, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      if (k <= 0.01) return
      x.save(); x.translate(0, (1 - k) * 60)
      x.fillStyle = INK; x.fillRect(640, 820, 26, 330); x.fillRect(900, 820, 26, 330)
      x.fillStyle = '#8a4a2e'; x.fillRect(646, 820, 14, 330); x.fillRect(906, 820, 14, 330)
      x.restore()
      card(x, 783, 720, 420, 260, k, 0, x => {
        x.fillStyle = '#ffb34a'; x.fillRect(-210, -130, 420, 56)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.fillText('HEY YOU. YES, YOU.', 0, -102)
        x.font = `800 74px ${INTER}`; x.fillText('DATE LEO', 0, -8)
        x.font = `700 28px ${MONO}`; x.fillStyle = '#c0581a'; x.fillText('(you know who you are)', 0, 76)
      })
      // the billboard lights
      if (k > 0.9) { x.save(); x.globalAlpha = 0.18 + 0.08 * Math.sin(t * 9); x.fillStyle = '#fff1b0'; x.fillRect(573, 590, 420, 260); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 300, 640, 'too subtle?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 783, 720, P.t0 + 0.6, 8, 240, 0.2)
    } },
  { sign: 'virgo', cap: 'Made a spreadsheet. | *Zero* cons found.', mood: lt => lt > 1.7 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 850, 380, 440, k, 0.04, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-190, -220, 190, 60); x.fillStyle = '#ff6b5a'; x.fillRect(0, -220, 190, 60)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('PROS', -95, -188); x.fillText('CONS', 95, -188)
        x.fillRect(-2, -220, 4, 440)
        for (let r = 0; r < 6; r++) {
          const y = -130 + r * 58
          x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-190, y + 27, 380, 3)
          if (lt > 0.4 + r * 0.17) { x.fillStyle = '#2fc79a'; x.font = `800 40px ${INTER}`; x.fillText('✓', -95, y + 2) }
        }
      })
      label(x, 790, 1110, 'CONS: STILL LOOKING', pop01(t, P.t0 + 1.8, 0.3, 2), { size: 28, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Checked our compatibility. | *Forty times.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const shake = lt > 0.5 && lt < 1.7 ? Math.sin(t * 40) * 4 : 0
      card(x, 790 + shake, 830, 360, 300, k, -0.03, x => {
        x.font = `700 26px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('COMPATIBILITY', 0, -110)
        x.font = `700 96px ${GLYPH_FONT}`; x.fillStyle = '#ff8fb1'; x.fillText('♎︎', -105, -10); x.fillStyle = '#ff6b5a'; x.fillText('♈︎', 105, -10)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 0, -12, 9 + Math.sin(t * 8) * 0.8)
        x.font = `800 40px ${INTER}`; x.fillStyle = '#2fc79a'; x.fillText('ALIGNED', 0, 100)
      })
      const n = Math.min(40, 36 + Math.floor(Math.max(0, lt - 0.5) / 0.3))
      label(x, 790, 1050, `CHECK #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 610, 'one more time?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Opened their profile. | Hasn’t *blinked* since.', mood: lt => lt > 1.7 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1110, 'BLINKS: 0', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 38, bg: '#c97bff', color: INK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 600, 'SINCE: TUESDAY', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.8, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 7 })
    } },
  { sign: 'sagittarius', cap: 'Flirts by | *roasting* their chart.', mood: lt => lt > 1.3 ? 'wink' : 'happy', star: { x: 170 }, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, 330, 900, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 600, 620, 'your moon? | a mess. dinner?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 330, 1110, 'THEIR CHART', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: '#ff9a4a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Scheduled their feelings. | *Tuesdays, 4:15.*', mood: lt => lt < 1.4 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 330, 850, 390, 430, k, -0.04, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-195, -215, 390, 66)
        x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText('TUESDAY', 0, -180)
        const ROWS = [['4:00', 'BUDGET'], ['4:15', 'FEELINGS'], ['4:30', 'BACK TO IT'], ['4:45', 'EMAILS']]
        ROWS.forEach(([h, w], r) => {
          const y = -100 + r * 82
          if (r === 1) { const g = ease.outCubic(prog(lt, 0.7, 1.0)); x.fillStyle = PINK; x.fillRect(-180, y - 34, 360 * g, 68) }
          x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-180, y + 38, 360, 3)
          x.fillStyle = INK; x.textAlign = 'left'; x.font = `700 26px ${MONO}`; x.fillText(h, -170, y)
          x.font = `800 30px ${INTER}`; x.fillText(w, -60, y)
        })
        x.textAlign = 'center'
      })
      label(x, 330, 1110, '15 MIN. MAX.', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Too shy to flirt. | Built *a robot* for it.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      const hop = Math.abs(Math.sin(t * 5)) * 10 * (lt > 0.8 ? 1 : 0)
      drawBits(x, ROBOT, ROBOT_C, 800, 950 - hop, 20 * k)
      bubble(x, 800, 650, 'BEEP. | U CUTE.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc', font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Wrote a hundred poems. | Sent *none.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -180 },
    back(x, t, lt, P) {
      for (let j = 0; j < 7; j++) {
        const k = pop01(t, P.t0 + 0.15 + j * 0.12, 0.25, 2)
        drawBits(x, PAGE, PAGE_C, 790 + Math.sin(j * 2.3) * 22, 1120 - j * 46, 14 * k, { rot: Math.sin(j * 1.7) * 0.14 })
      }
    },
    front(x, t, lt, P) {
      label(x, 790, 700, 'POEM #100', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: '#b7a6ff', rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 610, 'SENT: 0', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'trs3crush', key: 'C', accent: '#ff8fb1',
  title: 'Zodiacs with a crush | *be like.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'ALIGNED' },
  group: { cap: 'Subtle? | *Never heard of it.*' },
  lesson: { text: 'Crushes are scary. | *Say it anyway.*', chip: 'CRUSH: TOLD' },
  last: {
    text: 'Check #41: | *still aligned.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3newmatch does) if 'Zodiacs with a crush' is
// wider than the measure, so the hook stays on its two lines, clear of the stage card's name tab
async function build(stage) {
  const scene = await F.SCENES[0](stage)
  const box = [...stage.querySelectorAll('div')].find(d => d.querySelector(':scope > br') && d.textContent.replace(/\s+/g, '').startsWith('Zodiacswith'))
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
