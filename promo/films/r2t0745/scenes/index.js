// r2t0745: THE SIGNS AS… v3, "Zodiacs when they | see the ocean | *be like.*" (the batch hook, re-split to fit) (~61 s
// vertical, signs3kit social cut, music: lofi · F). Twelve signs meeting the sea, each pushed to the extreme. Ending: lesson.
//   ♈ already in it, shoes on · ♉ unrolled a towel, never moved · ♊ told six group chats · ♋ took a jar of it home
//   · ♌ golden hour, for Leo · ♍ swept sand off the sand · ♎ matched the outfit to it · ♏ asked what it's hiding
//   · ♐ booked a boat to the next one · ♑ finally put the phone down · ♒ designed a better wave · ♓ named every wave
//   group "One ocean. | *Twelve vibes.*"   LESSON "Some things are bigger. | *That’s the point.*"   last "Next trip? | *Bring tissues.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -170 }
const BOAT = ['.....W......', '.....WW.....', '.....WWW....', '.....WWWW...', '.....K......', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..']
const JAR = ['.KKKKK.', '.KKKKK.', 'GGGGGGG', 'G.....G', 'GBBBBBG', 'GBWBBBG', 'GBBBBBG', '.GGGGG.']

/** a strip of pixel waves across the bottom of the panel */
function waves(x, t, k, { y = 1110, amp = 14, col = '#3a8ad8', hi = '#8fe3ff' } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
  x.fillStyle = col
  for (let i = 0; i < 44; i++) { const xx = 110 + i * 20, yy = y + Math.round(Math.sin(i * 0.6 + t * 2.4) * amp / 4) * 4; x.fillRect(xx, yy, 20, 1240 - yy) }
  x.fillStyle = hi
  for (let i = 0; i < 44; i += 2) { const xx = 110 + i * 20, yy = y + Math.round(Math.sin(i * 0.6 + t * 2.4) * amp / 4) * 4; x.fillRect(xx, yy, 20, 8) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saw the ocean. | *Already in it. Shoes on.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', star: { x: -170, y: 40 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { y: 1000 })
      L(x, 800, 700, 'SHOES: STILL ON', pop01(t, P.t0 + 0.8, 0.3, 2.2), '#ff6b5a', -0.04, 34)
      bubble(x, 800, 860, 'COME IN!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Saw the ocean. | *Towel down. Never moved.*', mood: 'sleepy', star: { x: -170, y: 10 },
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2))
      bits(x, 'BLANKET', 800, 980, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      zzz(x, t, 420, 740, { alpha: 0.9 })
      L(x, 800, 700, 'HOUR 6. STILL HERE.', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#5fd068', -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Saw the ocean. | *Told six group chats.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.5) * 4)
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT TO 6', headCol: '#ffd23a', lines: [['OCEAN!!', BONE, n > 0 ? 1 : 0, true], ['it’s so BIG', BONE, n > 1 ? 1 : 0, true], ['wet too', BONE, n > 2 ? 1 : 0, true], ['brb', BONE, n > 3 ? 1 : 0, true]] })
    } },
  { sign: 'cancer', cap: 'Saw the ocean. | *Took a jar of it home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { y: 1150 })
      drawBits(x, JAR, { K: WOOD, G: '#d8f0ff', B: '#3a8ad8', W: '#8fe3ff' }, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 660, 'SOUVENIR: WET', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Golden hour at the beach? | *For Leo, obviously.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.8)
      x.save(); x.globalAlpha = 0.55 * clamp(k); const g = x.createRadialGradient(370, 880, 20, 370, 880, 360); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, 'rgba(255,180,74,0)'); x.fillStyle = g; x.fillRect(110, 480, 860, 740); x.restore()
    },
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { col: '#d88a3a', hi: '#ffd27a' })
      bits(x, 'SUN', 820, 700, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 940, 'SUNSET: BOOKED FOR LEO', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#ffb34a', 0.04, 28)
      sparkles(x, t, 370, 860, P.t0 + 1.2, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Saw the beach. | *Swept the sand.*', mood: 'squint', star: ST,
    front(x, t, lt, P, F) {
      x.save(); x.fillStyle = '#e8c88a'; x.fillRect(110, 1100, 860, 140); x.restore()
      bits(x, 'BROOM', F.x + 150, F.cy + 40, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 7) * 0.25 })
      L(x, 800, 700, 'SAND: TIDIER', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Saw the ocean. | *Matched their outfit to it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { col: '#5fc8c0', hi: '#bff4ee' })
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.4, 0.3, 2); x.fillStyle = INK; x.fillRect(724, 756, 152, 152); x.fillStyle = '#5fc8c0'; x.fillRect(730, 762, 140, 140); x.restore()
      L(x, 800, 690, 'PANTONE: SEAFOAM', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 980, 'OUTFIT: MATCHED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Saw the ocean. | *Asked what it’s hiding.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { y: 960, col: '#1a3a7a', hi: '#3a6ac8' })
      L(x, 800, 700, 'DEPTH: SUSPICIOUS', pop01(t, P.t0 + 0.5, 0.3, 2.2), '#c97bff', -0.04, 32)
      bubble(x, 800, 860, 'what’s down | there, hm?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Saw one ocean. | *Booked the next.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2))
      const p = clamp((lt - 0.4) / 1.8)
      drawBits(x, BOAT, { W: BONE, K: INK, B: '#ff9a4a' }, lerp(700, 900, p), 1070 + Math.sin(t * 3) * 6, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 700, 'NEXT OCEAN: 4 DAYS', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ff9a4a', -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Saw the ocean. | *Phone: finally down.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2))
      swapLabel(x, 800, 760, lt, 1.1, 'INBOX: 214', 'OUT OF OFFICE: ON', { size: 32, fromBg: STEEL, toBg: MINT })
      L(x, 800, 940, 'WAVES: COUNTED (CALMLY)', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: 'aquarius', cap: 'Saw the ocean. | *Designed a better wave.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { amp: lt > 1.1 ? 40 : 14 })
      sheet(x, 800, 800, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 280, h: 220, bg: '#dff1ff', head: 'WAVE v2', headBg: '#6fc3ff', headInk: INK, lines: ['taller', 'friendlier', 'glitter?'], size: 30 })
    } },
  { sign: 'pisces', cap: 'Saw the ocean. | *Named every wave.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    front(x, t, lt, P) {
      waves(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), { y: 1060 })
      const names = ['gary', 'luna', 'big steve', 'tiny sue']
      const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.6) * 5))
      for (let i = 0; i < n; i++) L(x, 700 + (i % 2) * 170, 700 + i * 80, names[i], 1, [LAV, SKYB, PINK, MINT][i], (i % 2 ? 0.05 : -0.05), 28)
    } },
]

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

const F = makeFilm({
  id: 'r2t0745', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs when they | see the ocean | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One ocean. | *Twelve vibes.*' },
  lesson: { text: 'Some things are bigger. | *That’s the point.*', chip: 'FEELINGS: OCEAN-SIZED' },
  last: { text: 'Next trip? | *Bring tissues.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
