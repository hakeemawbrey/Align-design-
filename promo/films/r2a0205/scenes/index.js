// r2a0205: star_advice, ADVICE ROLL CALL, "What friends love | *about each sign.*" (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order, one warm, specific thing their friends love about them, with a light gag. Ending: callback.
//   0.0–3.6    "What friends love | *about each sign.*"
//   3.6–49.2   ♈ you show up first, every time · ♉ hugs like a warm blanket · ♊ every chat is an adventure · ♋ you remember
//              everything (a notebook of friend facts) · ♌ you hype them like a stadium · ♍ you fix the plan, no fuss
//              · ♎ you saved them a seat · ♏ secrets stay in the vault · ♐ Tuesdays become adventures · ♑ your advice
//              actually works · ♒ you love them exactly as they are · ♓ you feel it with them
//  49.2        "Your friends see it. | *Believe them.*"
//  52.6        CALLBACK: "Your birthday? | *Cancer knew.*"  A cake with one candle, Cancer beside it.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', ORANGE = '#ffb34a', STEEL = '#9aa5c4'

function card(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
const BLANKET = ['KKKKKKKKKKKKKK', 'KAABBAABBAABBK', 'KAABBAABBAABBK', 'KBBAABBAABBAAK', 'KBBAABBAABBAAK', 'KAABBAABBAABBK', 'KKKKKKKKKKKKKK']
const FINGER = ['..KKK...', '..KYK...', '..KYK...', '..KYK...', 'KKKYKKK.', 'KYYYYYYK', 'KYYYYYYK', 'KYYYYYYK', '.KYYYYK.', '.KKKKKK.']
const SAFE = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSKKKKKKKKSK', 'KSKDDDDDDKSK', 'KSKDDGGDDKSK', 'KSKDGDDGDKSK', 'KSKDDGGDDKSK', 'KSKDDDDDDKSK', 'KSKKKKKKKKSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']
const CHAIR = ['KKKKKK', 'KCCCCK', 'KCCCCK', 'KKKKKK', 'KCCCCK', 'KKKKKK', 'K....K', 'K....K']
const CAKE = ['.....F.....', '.....W.....', '.....W.....', '.KKKKKKKKK.', 'KPPPPPPPPPK', 'KWPWPWPWPWK', 'KPPPPPPPPPK', 'KBBBBBBBBBK', 'KKKKKKKKKKK']
const CAKE_C = { K: INK, F: '#ff9a3a', W: '#fff4e2', P: '#ffb3cb', B: '#e0a85a' }

const CAMEOS = [
  { sign: 'aries', cap: 'You *show up first.* | Every single time.', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      label(x, 790, 760, 'ARRIVED: 1ST', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'party starts | at 8?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: SKYB, tail: 'br' })
      label(x, 790, 1150, 'IT\'S 7:15', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Your hugs feel like | *a warm blanket.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { K: INK, A: '#ffb34a', B: '#ffe08a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 700, 'HUG: 10 / 10', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'You make every chat | *an adventure.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ws = ['ok so', 'wait, aliens?', 'ANYWAY, soup']
      ws.forEach((w, i) => bubble(x, 790, 690 + i * 150, w, pop01(t, P.t0 + 0.2 + i * 0.45, 0.25, 2.2), { size: 36, col: [BONE, GOLD, MINT][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'You *remember everything* | they told you.', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const facts = ['Sam: no olives', 'Jo: hates cold', 'Ri: bday 3/14']
      const n = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.0) * 3) + 1)
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), facts.slice(0, n).concat(Array(3 - n).fill('')), { head: 'FRIEND FACTS', headBg: SKYB, w: 330, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'You hype them up | *like a stadium.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, FINGER, { K: INK, Y: ORANGE }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 6) })
      label(x, 790, 1110, '#1 FAN', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You fix the plan. | *No fuss.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? ['meet: 6 pm', 'table: booked', 'rain? umbrellas'] : ['meet: ???', 'where: ???', 'rain: ???'], { head: 'GROUP PLAN', headBg: MINT, w: 330, rot: -0.04 })
      if (lt > 1.2) sparkles(x, t, 790, 860, P.t0 + 1.2 * 1.29, 7, 200, 0.4)
    } },
  { sign: 'libra', cap: 'You always | *save them a seat.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CHAIR, { K: INK, C: i === 1 ? PINK : STEEL }, 680 + i * 120, 940, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 800, 720, 'SAVED FOR YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Their secrets stay | *in the vault.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SAFE, { K: INK, S: STEEL, D: '#4a5070', G: GOLD }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'LOCKED FOREVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'You turn Tuesdays | into *adventures.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['tuesday:', 'laundry', ''], { head: 'PLANS', headBg: '#c58bff', w: 300, rot: 0.05 })
      if (lt > 1.0) label(x, 800, 900, 'SUNRISE HIKE!', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Your advice | *actually works.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const items = ['ask for the raise', 'drink some water', 'call your mom']
      const n = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.2) * 3) + 0)
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), items.map((s, i) => (i < n ? '✓ ' : '  ') + s), { head: 'IT WORKED', headBg: MINT, w: 360, rot: 0.04, size: 28 })
    } },
  { sign: 'aquarius', cap: 'You love them | *exactly as they are.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'WEIRD = WELCOME', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'I collect | spoons now', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      label(x, 790, 1150, 'LOVE IT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You feel it | *right alongside them.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 790, 930, 200 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], tears: lt > 0.8 ? 1 : 0, seed: 15, glyph: false })
      label(x, 790, 700, 'NOT ALONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 640, 850, P.t0 + 1.4, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0205', key: 'G', accent: PINK, ending: 'callback',
  title: 'What friends love | *about each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Your friends see it. | *Believe them.*' },
  last: {
    text: 'Your birthday? | *Cancer knew.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, CAKE, CAKE_C, 650, 1170, 32 * k)
      signChar(x, t, 'cancer', 340, 1220, 230 * pop01(t, t0 + 0.9, 0.45, 1.8), { mood: lt > 1.5 ? 'heart' : 'happy', seed: 29, hops: [t0 + 1.5] })
      sparkles(x, t, 640, 1080, t0 + 1.2, 7, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
