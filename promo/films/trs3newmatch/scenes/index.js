// trs3newmatch: THE SIGNS AS… the second they get a new match. (~62 s vertical, signs3kit v3 social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs when they get | a *new match.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   the roll call, one stage card per sign (3.8 s each):
//              ♈ asked them out, said hi later · ♉ first question: do you share fries? · ♊ screenshot to every chat
//              · ♋ named the cat they'll adopt · ♌ sent a signed headshot · ♍ corrected a typo in their bio
//              · ♎ polled everyone, it's a tie · ♏ read their whole chart before hello · ♐ first date: another continent
//              · ♑ requested their five-year plan · ♒ opened with "thoughts on aliens?" · ♓ pictured the wedding, cried at it
//  49.2        "Everyone *lost it.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Every great match | *starts with hi.*"  MATCH: MADE
//  58.3        "Say *hi* first. | Plan later."  over the match card: Aries (asked them out first) + Capricorn (the plan).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, hearts, bubble, label, signChar, pop01, sparkles,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
const FRIES = [
  '.Y.Y.Y.Y.',
  '.Y.YYY.Y.',
  'YYYYYYYYY',
  'YYYYYYYYY',
  'RRRRRRRRR',
  'RRRWWWRRR',
  'RRWRRRWRR',
  '.RRWWWRR.',
  '.RRRRRRR.',
  '..RRRRR..',
]
const FRIES_C = { Y: GOLD, R: RED, W: '#fff4e2' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: SKYB, W: '#ffffff', G: '#6b62a8' }
const CAT = [
  'O.......O..',
  'OO.....OO..',
  'OOOOOOOOO..',
  'OOKOOOKOO..',
  'OOOOPOOOO..',
  'OOOOOOOOO.O',
  '.OOOOOOO..O',
  '.OOOOOOOOOO',
  '.OO.OO.OO..',
]
const CAT_C = { O: '#ffb34a', K: INK, P: PINK }
const PLANE = [
  '.....W......',
  '.....WW.....',
  'W....WWW....',
  'WW.WWWWWWWW.',
  'WWWWWWWWWWWS',
  'WW.WWWWWWWW.',
  'W....WWW....',
  '.....WW.....',
  '.....W......',
]
const PLANE_C = { W: '#ffffff', S: SKYB }
const CLIP = [
  '...KKKK...',
  'BBBKGGKBBB',
  'BWWWWWWWWB',
  'BWKKKKKWWB',
  'BWWWWWWWWB',
  'BWKKKKWWWB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKWWWWB',
  'BWWWWWWWWB',
  'BBBBBBBBBB',
]
const CLIP_C = { K: '#6b62a8', G: GOLD, B: '#8a5a2b', W: '#fff4e2' }
const UFO = [
  '....SSSS....',
  '...SSWSSS...',
  '..SSSSSSSS..',
  '.GGGGGGGGGG.',
  'GGYGGYGGYGGG',
  '.GGGGGGGGGG.',
  '...G....G...',
]
const UFO_C = { S: SKYB, W: '#ffffff', G: '#9aa3c7', Y: GOLD }
const CAKE = [
  '....H.H....',
  '....HHH....',
  '.....H.....',
  '..WWWWWWW..',
  '..WPWPWPW..',
  '..WWWWWWW..',
  '.WWWWWWWWW.',
  '.WPWPWPWPW.',
  '.WWWWWWWWW.',
  'WWWWWWWWWWW',
  'WPWPWPWPWPW',
  'WWWWWWWWWWW',
]
const CAKE_C = { H: '#ff4f86', W: '#fff4e2', P: PINK }

const CAMEOS = [
  { sign: 'aries', cap: 'Asked them out. | *Said hi later.*', mood: lt => lt < 1.7 ? 'sparkle' : 'wink', star: { x: -150 }, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 770, 580, 'NEW MATCH!', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 34, bg: MINT, rot: -0.05 })
      bubble(x, 770, 740, 'dinner? | tonight? 7?', pop01(t, P.t0 + 0.45, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 950, 'oh, and hi!', pop01(t, P.t0 + 2.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'First question: | *“do you share fries?”*', mood: lt => lt < 1.6 ? 'squint' : 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'do you | share fries?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, FRIES, FRIES_C, 780, 900, 22 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.06 })
    } },
  { sign: 'gemini', cap: 'Screenshot sent | to *every chat.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHONE, PHONE_C, 780, 860, 22 * k, { rot: 0.07 })
      const n = Math.max(1, Math.min(12, Math.floor((lt - 0.4) / 0.13) + 1))
      label(x, 780, 600, `SENT TO ${n} ${n === 1 ? 'CHAT' : 'CHATS'}`, pop01(t, P.t0 + 0.45, 0.3, 2), { size: 34, bg: n >= 12 ? PINK : GOLD, rot: -0.05 })
    } },
  { sign: 'cancer', cap: 'Named the cat | you’ll *adopt together.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 780, 880, 24 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 770, 640, 'meet MOCHI', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 38, bg: BONE, rot: 0.05 })
      hearts(x, t, 780, 780, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Sent them | a *signed headshot.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.32, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 790); x.rotate(0.07); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-136, -166, 272, 332)
        x.fillStyle = GOLD; x.fillRect(-128, -158, 256, 316)
        x.fillStyle = '#2a1d5c'; x.fillRect(-106, -136, 212, 236)
        x.restore()
        signChar(x, t, 'leo', 780 - 6, 770, 170 * k, { mood: 'wink', glyph: false, seed: 77 })
        x.save(); x.translate(780, 790); x.rotate(0.07); x.scale(k, k)
        x.fillStyle = INK; x.font = `italic 600 38px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('xoxo, Leo', 0, 130)
        x.restore()
      }
      sparkles(x, t, 780, 790, P.t0 + 0.6, 8, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'Corrected a typo | *in their bio.*', mood: lt => lt > 1.9 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'BIO: loves dogs, | hikeing, tacos', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 860, '*hiking', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 46, bg: RED, color: BONE, rot: 0.06 })
    } },
  { sign: 'libra', cap: 'Polled everyone. | *It’s a tie.*', mood: lt => lt > 1.9 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 2.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(770, 760); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-176, -146, 352, 292)
      x.fillStyle = BONE; x.fillRect(-168, -138, 336, 276)
      x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('Say hi first?', 0, -92)
      const g = ease.outCubic(prog(lt, 0.5, 1.6))
      const rows = [['YES', 0.5 * g + 0.08 * Math.sin(lt * 9) * (1 - g)], ['NO', 0.5 * g - 0.08 * Math.sin(lt * 9) * (1 - g)]]
      rows.forEach(([w, v], i) => {
        const y = -20 + i * 92
        x.fillStyle = '#d9cfe6'; x.fillRect(-140, y - 26, 280, 52)
        x.fillStyle = i ? LAV : MINT; x.fillRect(-140, y - 26, 280 * clamp(v), 52)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.fillText(w, -124, y + 2)
        x.textAlign = 'right'; x.fillText(`${Math.round(clamp(v) * 100)}%`, 126, y + 2)
      })
      x.restore()
    } },
  { sign: 'scorpio', cap: 'Read their *whole chart* | before hello.', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const R = 150
        x.save(); x.translate(775, 740); x.scale(k, k); x.rotate(lt * 0.25)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 8, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#241650'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
        x.strokeStyle = LAV; x.lineWidth = 4
        x.beginPath(); x.arc(0, 0, R - 34, 0, Math.PI * 2); x.stroke()
        x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 40, Math.sin(a) * 40); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.stroke() }
        const PL = [[0.3, 80, GOLD], [1.4, 95, PINK], [2.6, 70, SKYB], [3.7, 88, MINT], [5.0, 76, BONE]]
        PL.forEach(([a, r, c], i) => { if (lt > 0.5 + i * 0.15) { x.fillStyle = INK; x.fillRect(Math.cos(a) * r - 10, Math.sin(a) * r - 10, 20, 20); x.fillStyle = c; x.fillRect(Math.cos(a) * r - 7, Math.sin(a) * r - 7, 14, 14) } })
        x.restore()
      }
      label(x, 790, 950, 'READ: ALL OF IT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#c9c4d8', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'First date idea: | *another continent.*', mood: 'sparkle', star: { x: 150, y: -10, s: 290 }, hops: [0.4, 1.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      const px = lerp(230, 400, ease.inOutCubic(prog(lt, 0.5, 2.2)))
      drawBits(x, PLANE, PLANE_C, px, 900 - 40 * prog(lt, 0.5, 2.2), 19 * k, { rot: -0.12 })
    },
    front(x, t, lt, P) {
      bubble(x, 330, 640, 'pack a bag! | we fly at 6', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Requested their | *five-year plan.*', mood: lt => lt < 1.4 ? 'neutral' : 'squint', star: { x: 150 },
    back(x, t, lt, P) {
      drawBits(x, CLIP, CLIP_C, 320, 910, 20 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.06 })
    },
    front(x, t, lt, P) {
      bubble(x, 330, 640, 'where do you see | us in 5 years?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Opened with | *“thoughts on aliens?”*', mood: 'happy', look: [1, -1], star: { x: -170 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      const uy = 880 + 10 * Math.sin(t * 3)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff6b0'
        x.beginPath(); x.moveTo(760, uy + 30); x.lineTo(820, uy + 30); x.lineTo(880, uy + 220); x.lineTo(700, uy + 220); x.fill(); x.restore()
      }
      drawBits(x, UFO, UFO_C, 790, uy, 20 * k, { rot: 0.05 * Math.sin(t * 2) })
      bubble(x, 760, 640, 'thoughts | on aliens?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Pictured the wedding. | *Cried at it.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      // a thought cloud: two little puffs from the head, then the big cloud
      x.save(); x.fillStyle = INK
      const puff = (cx, cy, r) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, (r + 6) * k, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, r * k, 0, Math.PI * 2); x.fill() }
      puff(560, 760, 14); puff(605, 710, 22)
      x.save(); x.translate(790, 700); x.scale(k, k)
      const B = [[-100, 10, 80], [0, -50, 95], [100, 10, 80], [-50, 70, 75], [55, 70, 75]]
      x.fillStyle = INK; B.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r + 7, 0, Math.PI * 2); x.fill() })
      x.fillStyle = BONE; B.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() })
      x.restore(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 710, 15 * pop01(t, P.t0 + 0.6, 0.3, 2))
      hearts(x, t, 790, 640, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3newmatch', key: 'E', accent: '#7dffb0',
  title: 'The signs when they get | a *new match.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'capricorn', chip: 'IT’S A MATCH' },
  group: { cap: 'Everyone *lost it.*' },
  lesson: { text: 'Every great match | *starts with hi.*', chip: 'MATCH: MADE' },
  last: { text: 'Say *hi* first. | Plan later.' },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit, and 'The signs when they get' is one word wider than the 940 px measure: shrink the
// title's word box (like lesson.js fitBox) so the hook stays on its two lines, clear of the stage card's name tab
async function build(stage) {
  const scene = await F.SCENES[0](stage)
  const box = [...stage.querySelectorAll('div')].find(d => d.querySelector(':scope > br') && d.textContent.replace(/\s+/g, '').startsWith('Thesignswhen'))
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
