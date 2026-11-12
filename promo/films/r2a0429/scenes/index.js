// r2a0429: star_advice, ADVICE ROLL CALL, "What each sign | brings to the group chat." (~61 s vertical, signs3kit
// social cut, music: lofi · E). One warm, specific line per sign with a light visual gag. Ending: lesson.
//   0.0–3.6    "What each sign | *brings to the group chat.*"
//   3.6–49.2   ♈ the first reply, every time · ♉ the restaurant pick, always right · ♊ the memes, all of them · ♋ "home
//              safe?" texts, every night · ♌ the hype for every selfie · ♍ the plan, down to the minute · ♎ the peace
//              treaty after every argument · ♏ honest opinions, kindly delivered · ♐ the trip idea, leaving Friday
//              · ♑ the calendar invite, nobody forgets now · ♒ the weird fact at 1 a.m. · ♓ "I love you guys" (crying)
//  49.2        "Twelve signs. | *One loud chat.*"
//  52.4        LESSON UNLOCKED: "Every chat needs | *every kind of friend.*"  CHAT: COMPLETE
//  58.3        "Mute it? | *Never.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#7dffb0'

// ── props
const FLAG = ['KWWWWWWW', 'KWWWWWWW', 'KWWWWWWW', 'KWWWWWWW', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......']
const PIN = ['..RRRR..', '.RRRRRR.', 'RRRWWRRR', 'RRRWWRRR', '.RRRRRR.', '..RRRR..', '...RR...', '...RR...']
const VAN = [
  '..OOOOOOOOO...',
  '.OSSOSSOSSOO..',
  'OOSSOSSOSSOOOO',
  'OOOOOOOOOOOOOO',
  'OOOOOOOOOOOOOO',
  '..KK.....KK...',
]
const VAN_C = { O: '#ff9a4a', S: SKYB, K: INK }

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}

const L = { x: -170 }, R = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'The first reply. | *Every single time.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'I’M IN!!', pop01(t, P.t0 + 0.35, 0.22, 2.6), { size: 76, col: '#ff6b5a', tail: 'bl' })
      label(x, 790, 640, 'REPLY TIME: 0.1 S', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'QUESTION: NOT ASKED YET', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The restaurant pick. | *Always right.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 900, 320, 260, k, 0.03, x => {
        x.fillStyle = '#9ae58a'; x.fillRect(-160, -130, 320, 260)
        x.fillStyle = PAPER; x.fillRect(-160, -20, 320, 24); x.fillRect(-30, -130, 24, 260); x.fillRect(60, -130, 16, 260)
      })
      drawBits(x, PIN, { R: '#ff6b5a', W: PAPER }, 800, 870 - (1 - pop01(t, P.t0 + 0.7, 0.3, 1.6)) * 80, 12 * pop01(t, P.t0 + 0.7, 0.3, 1.6))
      label(x, 790, 650, 'TABLE FOR 12 ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'The memes. | *All of the memes.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.22) + 1)
      for (let j = 0; j < n; j++) card(x, 720 + (j * 47) % 160, 1000 - j * 46, 170, 130, pop01(t, P.t0 + 0.2 + j * 0.22 * 1.29, 0.2, 2), Math.sin(j * 2.1) * 0.15, x => {
        x.fillStyle = ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7dffb0'][j % 4]; x.fillRect(-70, -50, 140, 80)
        x.fillStyle = INK; x.fillRect(-30, -24, 12, 12); x.fillRect(18, -24, 12, 12); x.fillRect(-24, 4, 48, 8)
      })
      label(x, 790, 1130, 'MEMES SENT: 7 (THIS MIN)', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: '“Home safe?” texts. | *Every night.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'home safe?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: SKYB, tail: 'bl' })
      bubble(x, 790, 880, 'yes, mom.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      label(x, 790, 1080, 'GOODNIGHT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.6, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The hype. | *For every selfie.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const W = ['ICONIC!!', 'STUNNING', 'MAIN CHARACTER', 'FRAME IT']
      W.forEach((w, j) => label(x, [690, 850, 760, 850][j], 650 + j * 140, w, pop01(t, P.t0 + 0.3 + j * 0.35, 0.25, 2.4), { size: [40, 32, 30, 34][j], bg: [GOLD, PINK, LAV, MINT][j], rot: (j % 2 ? 0.06 : -0.06), weight: 800 }))
      sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 220, 0.2)
    } },
  { sign: 'virgo', cap: 'The plan. | *Down to the minute.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.03, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -200, 320, 60); x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText('SATURDAY', 0, -170)
        const ROWS = ['6:58  meet', '7:03  walk', '7:11  laugh', '7:12  photo', '7:14  snacks']
        x.font = `700 26px ${MONO}`; x.textAlign = 'left'
        ROWS.forEach((r, i) => { if (lt > 0.3 + i * 0.2) { x.fillStyle = INK; x.fillText(r, -130, -110 + i * 58); x.fillStyle = '#2fc79a'; x.fillText('✓', 110, -110 + i * 58) } })
      })
    } },
  { sign: 'libra', cap: 'The peace treaty | *after every argument.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: '#c98f5a', W: PAPER }, 800 + Math.sin(t * 4) * 6, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.06 })
      label(x, 790, 650, 'DRAMA: RESOLVED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'hug it out?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Honest opinions. | *Kindly delivered.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'which outfit?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 790, 880, 'not that one. | THIS one. ♡', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, col: '#c97bff', tail: 'bl' })
      label(x, 790, 1100, 'HONESTY: LOVING', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The trip idea. | *Leaving Friday.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: R, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 330, 660, 'road trip??', pop01(t, P.t0 + 0.25, 0.25, 2.4), { size: 48, col: '#ff9a4a', tail: 'br' })
      drawBits(x, VAN, VAN_C, lerp(260, 380, ease.inOutCubic(prog(lt, 0.8, 2.3))), 940 + Math.abs(Math.sin(t * 9)) * 4, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 330, 1110, 'DEPARTS: FRIDAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'The calendar invite. | *Nobody forgets now.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 240, pop01(t, P.t0 + 0.2, 0.3, 2), -0.03, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -120, 320, 60); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('MOVIE NIGHT', 0, -90)
        x.font = `700 26px ${MONO}`; x.fillText('FRI · 8:00 PM', 0, -20); x.fillText('reminder: 3 days', 0, 24)
        x.fillStyle = '#6b62a8'; x.fillText('reminder: 1 day', 0, 66)
      })
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.7) * 9))
      label(x, 790, 1100, `RSVP: ${n}/12`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The weird fact | *at 1 a.m.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'octopuses have | THREE hearts.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 980, 'CHAT: AWAKE NOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, '1:04 AM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“I love you guys.” | *Sent while crying.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i love | you guys', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 56, col: '#b7a6ff', tail: 'bl' })
      label(x, 790, 1020, 'REPLIES: 11 HEARTS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 6 })
    } },
]

// the long hook: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2a0429', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign | *brings to the group chat.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One loud chat.*' },
  lesson: { text: 'Every chat needs | *every kind of friend.*', chip: 'CHAT: COMPLETE' },
  last: {
    text: 'Mute it? | *Never.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 10, life: 2.0, spread: 700, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
