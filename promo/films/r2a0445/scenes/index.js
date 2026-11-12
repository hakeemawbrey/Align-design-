// r2a0445: star_advice, ADVICE ROLLCALL, "Starting a chat | *with each sign.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Topic: how to start a conversation with each sign. Twelve warm, specific openers, one light gag each. Ending: callback.
//   0.0–3.6    hook
//   3.6–49.2   ♈ make it a friendly challenge · ♉ ask about food, get comfy · ♊ ask anything, get ten back
//              · ♋ ask about their people · ♌ ask about their big win (extended cut) · ♍ ask for advice, get a plan
//              · ♎ ask their taste in music · ♏ skip the weather, go deep · ♐ ask about their last trip (400 photos)
//              · ♑ ask about their goals · ♒ ask a weird question · ♓ ask about their dreams (the sleeping kind)
//  49.2        "Just say hi. | *They’ll do the rest.*"
//  52.6        "Sagittarius? | *Still on photo 212.*" (the slideshow comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4', PEACH = '#ffb38a', VIOLET = '#b07bff'

function sheet(x, cx, cy, k, { w = 340, h = 330, head = '', headCol = MINT, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore() })
  x.restore()
}
/** a slideshow screen: a little landscape photo and a counter */
function slides(x, t, cx, cy, k, n, { s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-162, -110, 340, 236)
  x.fillStyle = INK; x.fillRect(-174, -122, 348, 244)
  const sky = ['#8fe3ff', '#ffb38a', '#c9a6ff', '#7dffb0'][n % 4]
  x.fillStyle = sky; x.fillRect(-164, -112, 328, 224)
  x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-164, 112); x.lineTo(-60, -20); x.lineTo(30, 60); x.lineTo(100, -10); x.lineTo(164, 112); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(110, -60, 26, 0, Math.PI * 2); x.fill()
  x.restore()
}
const GRAPH = (x, cx, cy, k, lt) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = CREAM; x.fillRect(-152, -132, 304, 264)
  const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
  for (let i = 0; i < n; i++) { const h = 40 + i * 42; x.fillStyle = INK; x.fillRect(-126 + i * 56, 110 - h - 4, 44, h + 4); x.fillStyle = MINT; x.fillRect(-122 + i * 56, 110 - h, 36, h) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Make it a challenge. | *A friendly one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'bet you can’t | name 5 cheeses', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 950, 'BRIE. FETA. GO!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: RED, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'Ask about food. | *Then get comfy.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'best snack | ever?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 940, `TALKING: ${Math.min(3, 1 + Math.floor(lt))} HRS`, pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ask one question. | *Get ten back.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'how’s your day?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      const Q = ['what’s your sign?', 'fave colour?', 'cats or dogs?', 'ever been to space?']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.7) / 0.35))
      bubble(x, 750, 880, Q[n], pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: GOLD, tail: 'br' })
      label(x, 790, 1080, `QUESTION ${n + 2} OF 10`, pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Ask about their people. | *Watch them glow.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how’s your mum?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 900, 'PHOTOS: OUT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1120, P.t0 + 1.1, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Ask about their big win. | *Grab a seat.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so how did | it go?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 920, 'THE EXTENDED CUT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 920, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Ask for advice. | *Get a full plan.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'YOUR PLAN ♡', size: 30, rows: [
        ['step 1: breathe', pop01(t, P.t0 + 0.5, 0.2, 2)], ['step 2: list it', pop01(t, P.t0 + 0.8, 0.2, 2)], ['step 3: snack', pop01(t, P.t0 + 1.1, 0.2, 2)], ['(appendix: B)', pop01(t, P.t0 + 1.5, 0.2, 2), '#2f9a5a'],
      ] })
    } },
  { sign: 'libra', cap: 'Ask about their taste. | *Music, art, anything.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what are you | listening to?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: PINK, alpha: pop01(t, P.t0 + 0.9, 0.3, 2), seed: 1 })
      label(x, 790, 1120, 'PLAYLIST: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Skip the weather. | *Go deep.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'biggest dream?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: VIOLET, tail: 'bl' })
      label(x, 790, 900, 'SMALL TALK: SKIPPED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'ok. sit down.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Ask about their last trip. | *Clear your evening.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 47)
      slides(x, t, 780, 840, pop01(t, P.t0 + 0.15, 0.3, 2), n, { s: 0.95 })
      label(x, 780, 1080, `PHOTO ${n} / 400`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ask about their goals. | *They’ll light up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      GRAPH(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1100, 'FIVE-YEAR PLAN: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ask a weird question. | *Instant best friend.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'cloud or cat? | for a day.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 950, 'FINALLY. | someone asks.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: SKYB, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Ask about their dreams. | *The sleeping kind.*', mood: 'heart', look: [1, 0], tears: 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'dream anything | last night?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 940, 'ok so I was | a whale…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 790, 1130, 'HAPPY TEARS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0445', key: 'G', accent: PEACH, ending: 'callback',
  title: 'Starting a chat | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Just say hi. | *They’ll do the rest.*' },
  last: {
    text: 'Sagittarius? | *Still on photo 212.*',
    draw(x, t, lt) {
      const t0 = t - lt
      slides(x, t, 540, 1000, pop01(t, t0 + 0.5, 0.4, 2), 212, { s: 1.4 })
      label(x, 540, 1240, 'PHOTO 212 / 400', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
