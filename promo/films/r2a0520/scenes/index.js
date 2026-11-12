// r2a0520: star_advice, ADVICE ROLL CALL, "How each sign | *starts the day.*" (~57 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs in zodiac order: one warm, specific line each, with a light visual gag. Ending: callback.
//   0.0–3.6    "How each sign | *starts the day.*"
//   3.6–49.2   ♈ up before the alarm, already did a lap · ♉ snoozes three times, savours each · ♊ texts five friends
//              before getting up · ♋ checks on everyone first · ♌ greets the sun like a co-star · ♍ laid out the outfit
//              last night · ♎ a playlist to match the mood · ♏ reads the horoscope, decides anyway · ♐ wakes up planning
//              a trip · ♑ inbox zero by six · ♒ dinner for breakfast · ♓ remembers a dream, cries a little
//  49.2        "Twelve mornings. | *All good starts.*"
//  52.6        "Tomorrow’s plan? | *Snooze four times.*"  (Taurus' alarm clock comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffcf7a', GREY = '#9aa5c4', RED = '#e23d4e', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
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

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
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

const ALARM = ['B.......B', '.BRRRRRB.', 'RRWWWWWRR', 'RWWWKWWWR', 'RWWWKWWWR', 'RWWWKKWWR', 'RWWWWWWWR', 'RRWWWWWRR', '.RRRRRRR.', 'K.......K']
const ALARM_C = { B: GOLD, R: '#e23d4e', W: PAPER, K: INK }
const SUN = ['...Y..Y...', 'Y..YYYY..Y', '..YOOOOY..', '.YOOOOOOY.', 'YYOOOOOOYY', '.YOOOOOOY.', '..YOOOOY..', 'Y..YYYY..Y', '...Y..Y...']
const HANGER = ['....KK....', '...K..K...', '......K...', '.....K....', '..KKKKKK..', '.KSSSSSSK.', 'KSSSSSSSSK', '.SSSSSSSS.', '.SSsSSsSS.', '.SSSSSSSS.']
const PLATE = ['..NNNNNN..', '.NnNNNnNN.', 'WNNNRNNNNW', 'WWWWWWWWWW', '.WWWWWWWW.']
const ENV = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWKWWWWKWW', 'WWWKKKKWWW', 'WWWWWWWWWW']

function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 376)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = DEEP; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Up before the alarm. | *Already did a lap.*', mood: 'sparkle', look: [1, 0], star: LS, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      L(x, 790, 800, 'LAP: DONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 42)
      L(x, 790, 1000, 'TIME: 5:58 AM', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Snoozes three times. | *Savours every one.*', mood: 'sleepy', star: LS,
    front(x, t, lt, P) {
      drawBits(x, ALARM, ALARM_C, 800 + (lt % 0.8 < 0.4 && lt < 0.8 ? Math.sin(t * 60) * 6 : 0), 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 2)
      L(x, 800, 700, `SNOOZE #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Texts five friends | *before getting up.*', mood: 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        const msgs = ['gm!!', 'gm bestie', 'u up?', 'gm match ♡', 'ok big news']
        msgs.forEach((m, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.3, 0.25, 2.2); if (k > 0.01) { x.save(); x.translate(i % 2 ? 14 : -14, -120 + i * 60); x.scale(k, k); x.fillStyle = i % 2 ? MINT : BONE; x.fillRect(-82, -22, 164, 44); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText(m, 0, 2); x.restore() } })
      })
    } },
  { sign: 'cancer', cap: 'Checks on everyone | *before themselves.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 250, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('CHECK-INS', 0, -118)
        const rows = ['mom', 'bestie', 'the cat', 'me']
        rows.forEach((r, i) => { x.textAlign = 'left'; x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(r, -90, -60 + i * 52); if (lt > 0.5 + i * 0.35) { x.fillStyle = '#2fc79a'; x.fillText('✓', 70, -60 + i * 52) } x.textAlign = 'center' })
      })
      hearts(x, t, 800, 1080, P.t0 + 2.0, { n: 4, life: 1.2, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Opens the curtains. | *Greets the sun.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, -1], star: LS,
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD, O: '#ffb34a' }, 820, 780, 18 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: t * 0.3 })
      bubble(x, 800, 1040, 'morning, | co-star', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Outfit laid out | *the night before.*', mood: 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, HANGER, { K: '#d8dbe8', S: '#c9a6ff', s: '#ffffff' }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'IRONED: YES', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 1150, 'SOCKS: MATCHING', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Picks a playlist | *to match the mood.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: LS, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      if (lt > 0.4) notes(x, t, 790, 1000, { n: 5, cell: 8, col: PINK, seed: 4 })
      L(x, 800, 760, 'MOOD: PEACHY', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 38)
      L(x, 800, 1130, 'VOLUME: JUST RIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Reads their horoscope. | *Decides anyway.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 270, 250, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('♏ TODAY', 0, -96)
        x.font = `800 28px ${INTER}`; x.fillText('“take it easy”', 0, -30)
        if (lt > 1.0) { x.fillStyle = '#a8324a'; x.font = `800 32px ${INTER}`; x.fillText('noted. no.', 0, 40) }
      })
      L(x, 800, 1130, 'DESTINY: SELF-MADE', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#c97bff', 0.04, 28, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Wakes up | *planning a trip.*', mood: 'sparkle', star: RS, hops: [0.6],
    front(x, t, lt, P) {
      card(x, 330, 900, 260, 220, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, x => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-120, -100, 240, 200)
        x.fillStyle = '#5fd068'; x.fillRect(-90, -60, 80, 60); x.fillRect(20, -10, 90, 70); x.fillRect(-60, 30, 50, 40)
        x.fillStyle = RED; x.fillRect(40, 0, 18, 18)
      })
      L(x, 330, 1100, 'NEXT STOP: ???', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Up at five. | *Inbox zero by six.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const n = Math.max(0, 5 - Math.floor(clamp((lt - 0.3) / 1.2) * 6))
      for (let i = 0; i < n; i++) drawBits(x, ENV, { W: PAPER, K: GREY }, 800 + (i % 2) * 20, 1040 - i * 60, 16)
      L(x, 800, 720, `INBOX: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, -0.04, 40)
      if (n === 0) sparkles(x, t, 800, 960, P.t0 + 1.9, 7, 140, 0.3)
    } },
  { sign: 'aquarius', cap: 'Dinner for breakfast. | *Rules are optional.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { N: '#ffe36a', n: '#ffcf7a', R: RED, W: BONE }, 800, 990, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 740, 'SPAGHETTI, 7 AM', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Remembers a dream. | *Cries a little.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 2, look: [1, -1], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'there were | dolphins…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 1040, 'DREAM: BEAUTIFUL', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#b7a6ff', 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0520', key: 'G', accent: ACC, ending: 'callback',
  title: 'How each sign | *starts the day.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve mornings. | *All good starts.*', moods: ['sparkle', 'sleepy', 'sparkle', 'heart', 'wink', 'happy', 'heart', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'Tomorrow’s plan? | *Snooze four times.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, ALARM, ALARM_C, 640 + (lt > 0.8 && lt < 1.4 ? Math.sin(t * 60) * 6 : 0), 1040, 24 * pop01(t, t0 + 0.5, 0.35, 2))
      signChar(x, t, 'taurus', 400, 1060, 250 * pop01(t, t0 + 0.7, 0.4, 2), { mood: 'sleepy', seed: 9, glyph: false })
      L(x, 640, 820, 'SNOOZE #4', pop01(t, t0 + 1.4, 0.3, 2.2), LAV, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
