// r2a0282: star_advice, ADVICE SOLO (cancer), "Cancer, you're allowed | to want more." (~43 s vertical, signs3kit, lofi · F)
// One Cancer, nine warm nudges to ask for more for themselves, each with one visual gag.
//   0.0–3.6    "Cancer, you can | *want more.*"
//   3.6–37.8   nine cards: take the big slice · let someone else cook · wish list says nothing, write three · ask for the
//              window seat · dream out loud · the long hug · a match who texts first · asking for help · raise your hand
//  37.8        the ending (group): "Take the big slice. | *You’re worth it.*" (pays off card one)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, confetti, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ffc2d6'
const ST = { x: -170 }

const SLICE = ['......PP', '....PPPP', '..PPPPPP', 'PPPPPPPP', 'CCCCCCCC', 'SSSSSSSS', 'CCCCCCCC', 'SSSSSSSS']
const SLICE_C = { P: PINK, C: CREAM, S: '#c98f6a' }
const POT = ['..S.S.S..', '.S.S.S.S.', 'KKKKKKKKK', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.']
const POT_C = { S: '#e8e4f4', K: INK, R: RED }
const HOUSE = ['....R....', '...RRR...', '..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', '.WWWWWWW.', '.WBWWWDW.', '.WWWWWDW.', '.WWWWWDW.']
const HOUSE_C = { R: RED, W: CREAM, B: SKYB, D: WOOD }
const HAND = ['.F.F.F...', '.F.F.F.F.', '.F.F.F.F.', '.FFFFFFF.', 'FFFFFFFF.', '.FFFFFFF.', '..FFFFF..', '..FFFFF..']

/** an airplane window with clouds drifting by */
function planeWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -170, 260, 340, 110); x.fill()
  x.fillStyle = '#e8e4f4'; x.beginPath(); x.roundRect(-120, -160, 240, 320, 100); x.fill()
  x.save(); x.beginPath(); x.roundRect(-92, -132, 184, 264, 80); x.clip()
  x.fillStyle = '#8fd0ff'; x.fillRect(-100, -140, 200, 280)
  x.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) { const px = ((i * 90 - t * 60) % 360 + 360) % 360 - 180; x.fillRect(px - 40, -60 + i * 50, 80, 22); x.fillRect(px - 24, -72 + i * 50, 48, 16) }
  x.restore(); x.restore()
}
/** a wish list: "nothing" crossed out, then three wishes appear */
function wishList(x, cx, cy, k, lt) {
  card(x, cx, cy, 320, 340, k, { bg: CREAM, rot: 0.04 }, () => {
    txt(x, 'WISH LIST', 0, -130, { size: 34, font: MONO, weight: 700 })
    txt(x, 'nothing', 0, -70, { size: 34, color: '#6b62a8' })
    if (lt > 0.7) { x.fillStyle = RED; x.fillRect(-80, -74, 160 * clamp((lt - 0.7) / 0.25), 8) }
    ;['1. a slow morning', '2. a real holiday', '3. MORE'].forEach((s, i) => { if (lt > 1.0 + i * 0.25) txt(x, s, -130, -10 + i * 56, { size: 30, align: 'left' }) })
  })
}

const CAMEOS = [
  { sign: 'cancer', cap: 'You take the small slice. | *Take the big one.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SLICE, SLICE_C, 690, 1000, 9 * k)
      drawBits(x, SLICE, SLICE_C, 860, 940, 24 * k)
      label(x, 860, 720, 'THIS ONE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 860, 940, P.t0 + 1.25, 6, 150, 0.4)
    } },
  { sign: 'cancer', cap: 'You feed everyone. | *Let them cook.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'CHEF: NOT YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 520, 640, 'sit. we got this.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Your wish list says nothing. | *Write three things.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { wishList(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'cancer', cap: 'Want the window seat? | *Just say so.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      planeWindow(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt < 1.3) bubble(x, 600, 640, 'um, could I maybe…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      else bubble(x, 600, 640, 'window, please!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Dream bigger. | *Out loud.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 800); x.scale(k, k)
        x.fillStyle = INK; for (const [a, b, r] of [[0, 0, 150], [-110, 40, 90], [110, 40, 90], [-60, -80, 90], [70, -80, 90]]) { x.beginPath(); x.arc(a, b, r + 8, 0, Math.PI * 2); x.fill() }
        x.fillStyle = BONE; for (const [a, b, r] of [[0, 0, 150], [-110, 40, 90], [110, 40, 90], [-60, -80, 90], [70, -80, 90]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
        drawBits(x, HOUSE, HOUSE_C, 0, 0, 18 * ease.outBack(prog(lt, 0.7, 1.0)))
        x.restore()
        x.fillStyle = BONE; x.beginPath(); x.arc(600, 1010, 22, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(560, 1070, 14, 0, Math.PI * 2); x.fill()
      }
      label(x, 790, 1080, 'A HOUSE BY THE SEA', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You give the long hugs. | *Get one back.*', mood: 'heart', star: { x: -110 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', lerp(900, F.x + 210, ease.outCubic(prog(lt, 0.4, 0.9))), 900, 260 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false })
      hearts(x, t, 540, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 2 })
      const s = Math.floor(clamp((lt - 0.8) / 1.4) * 30)
      label(x, 540, 1130, `HUG TIMER 00:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Want a match who | *texts first?* Allowed.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'YOUR MATCH', headCol: MINT, lines: [['good morning!', PINK, pop01(t, P.t0 + 0.5, 0.25, 2)], ['how did it go?', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2)], ['proud of you', LAV, pop01(t, P.t0 + 1.3, 0.25, 2)], ['call later?', MINT, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
    } },
  { sign: 'cancer', cap: 'Asking for help | *isn\'t too much.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 600, 640, 'can someone help?', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.03 })
      bubble(x, 800, 820, 'on my way!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      bubble(x, 780, 960, 'bringing snacks', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: GOLD, tail: 'br' })
      bubble(x, 820, 1090, 'say less', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Want the big role? | *Raise your hand.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', star: ST, hops: [1.1],
    front(x, t, lt, P, F) {
      const up = ease.outBack(prog(lt, 0.6, 1.0))
      if (up > 0.01) drawBits(x, HAND, { F: '#7dc8ff' }, F.x + 150, lerp(F.cy + 60, F.cy - 150, up), 14, { rot: 0.15 })
      label(x, 800, 780, 'ME. I WANT IT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      confetti(x, t, 720, 860, P.t0 + 1.4, { n: 14, spread: 260, h: 480 })
    } },
]

const F = makeFilm({
  id: 'r2a0282', key: 'F', accent: ACC, solo: 'cancer', ending: 'group',
  title: 'Cancer, you can | *want more.*',
  cameos: CAMEOS,
  group: { cap: 'Take the big slice. | *You’re worth it.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
