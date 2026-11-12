// r2a0556: star_advice, ADVICE SOLO (sagittarius), "How to check in | on a Sagittarius." (signs3kit social cut, music: lofi · D).
// Nine warm, relatable ways to check in on a Sagittarius friend, each with one visual gag. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, confetti, swapLabel, friend, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawBits } from '../../signs3kit.js'

const ACC = '#ff9a4a', ST = { x: -180 }, SAG = 'sagittarius'

const SHOE = ['......RRR..', '.....RRRRR.', 'RRRRRRWRRR.', 'RRRRRRRRRRR', 'WWWWWWWWWWW']
const SHOE_C = { R: ACC, W: CREAM }
const BOOM = ['YYY.......', 'YYYY......', '.YYYY.....', '..YYYY....', '...YYYYYYY', '....YYYYYY']
const MTN = ['.......W........', '......WWW.......', '.....GGGGG...W..', '....GGGGGGG.WWW.', '...GGGGGGGGGGGGG', '..GGGGGGGGGGGGGG', '.GGGGGGGGGGGGGGG', 'GGGGGGGGGGGGGGGG']
const MTN_C = { W: '#ffffff', G: '#6b62a8' }

const CAMEOS = [
  { sign: SAG, cap: 'Skip “where are you?” | Ask *“how’s the view?”*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'how’s the view?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 900); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -105, 300, 240)
        x.fillStyle = INK; x.fillRect(-156, -126, 312, 252); x.fillStyle = CREAM; x.fillRect(-146, -116, 292, 232)
        x.fillStyle = '#8fd3ff'; x.fillRect(-130, -100, 260, 170)
        drawBits(x, MTN, MTN_C, 0, 10, 15, { outline: null })
        x.fillStyle = GOLD; x.fillRect(70, -86, 30, 30)
        x.restore()
      }
      L(x, 800, 1110, '47 PHOTOS INCOMING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SAG, cap: 'Send a silly meme. | That’s *a hug.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SAG · ONLINE', headCol: MINT, lines: [['[a goat in a hat]', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['HAHAHAHA', GOLD, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['needed that', PINK, pop01(t, P.t0 + 1.4, 0.25, 2), true]] })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
      L(x, 800, 1110, 'HUG: RECEIVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: SAG, cap: 'Invite them along. | Even *last minute.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'walk in 5?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'BACKPACK', 800, 900, 24 * pop01(t, P.t0 + 0.8, 0.35, 2.2))
      sparkles(x, t, 800, 900, P.t0 + 0.9, 7, 170, 0.2)
      L(x, 800, 1110, 'ALREADY PACKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SAG, cap: '“I’m fine lol”? | Ask *once more.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'i’m fine lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 800, 820, 'you sure?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 800, 1010, 'ok… actually', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 800, 1140, 'REAL TALK: UNLOCKED', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: SAG, cap: 'Give them space. | They *always* come back.', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      // a boomerang flies out to the right and swings back
      const p = clamp((lt - 0.2) / 1.4), bx = 560 + Math.sin(Math.PI * p) * 360, by = 880 - Math.sin(Math.PI * 2 * p) * 140
      if (lt > 0.2) drawBits(x, BOOM, { Y: ACC }, bx, by, 16 * (lt < 1.6 ? 1 : pop01(t, P.t0 + 1.6, 0.2, 2)), { rot: t * 12 })
      L(x, 800, 640, 'GONE: 3 WEEKS', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, 0.05, 30)
      L(x, 800, 1110, 'BACK WITH STORIES', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: SAG, cap: 'Big feelings? | Talk *on a walk.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.4, 2.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, SHOE, SHOE_C, 640 + i * 95, 1080 - (i % 2) * 50, 11 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2), { rot: -0.1 })
      bubble(x, 800, 700, 'so anyway… | i’ve been sad', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 880, 'FEELINGS: SHARED', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.03, 32)
    } },
  { sign: SAG, cap: 'Skip the lecture. | Just *listen.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'ADVICE: 40 PG', headBg: STEEL, lines: ['1. well, actually', '2. you should', '3. when i was'], size: 26, align: 'left' })
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'; const q = clamp((lt - 1.0) / 0.3); x.beginPath(); x.moveTo(660, 700); x.lineTo(660 + 280 * q, 700 + 240 * q); x.stroke(); x.restore() }
      L(x, 800, 1090, 'JUST: LISTENING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: SAG, cap: 'Ask their wildest dream. | Then *hype it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'a goat farm | in the alps!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 900, 'YES. GO.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, col: GOLD, tail: 'br' })
      confetti(x, t, 800, 880, P.t0 + 1.1)
      L(x, 800, 1110, 'BEST FRIEND: CONFIRMED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: SAG, cap: 'Be honest with them. | They *love* honest.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'that haircut? | bold.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, 'THANK YOU!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 44, col: MINT, tail: 'br' })
      sparkles(x, t, 800, 900, P.t0 + 1.25, 7, 170, 0.3)
      L(x, 800, 1110, 'TRUST LEVEL: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0556', key: 'D', accent: ACC, solo: SAG, ending: 'lesson',
  title: 'How to check in | *on a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Free isn’t far. | They *still need you.*', chip: 'CHECKED IN' },
  last: {
    text: 'Text them. | They’re *boarding.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
