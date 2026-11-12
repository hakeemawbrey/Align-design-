// r2t0135: THE SIGNS AS… v3, SOLO film, "Cancers hosting | dinner." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine dinner-party moments, each the most extreme (and lovable) Cancer version.
//   0.0–3.6    "Cancers hosting | *dinner.*"
//   3.6–37.8   invited four, made nine lasagnas · a dietary form, three pages · your plate empty for one second
//              · a little speech, cried at line one · the photo albums (of last week) · you yawned: guest room made up
//              · "home safe?" texted before you left · sent home with a bag of leftovers · dishes? don't you dare
//  37.8        "Come hungry. | *Leave adopted.*"
//  41.0        LESSON UNLOCKED: "Let a Cancer feed you. | It’s *how they say love.*"  STATUS: FULL
//  46.9        "Second dessert? | *Already plated.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const S = 'cancer'
const TRAY = ['KKKKKKKKKKKK', 'KRYRYRYRYRYK', 'KYRYRYRYRYRK', 'KKKKKKKKKKKK']
const TRAY_C = { K: '#9aa5c4', R: '#d0453a', Y: '#ffd86b' }
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const FOOD = ['...GG.....', '.BBBBBB.GG', 'BBBBBBBBGG', '.YYYYYYYY.']
const FOOD_C = { G: '#5fd068', B: '#c98f6a', Y: '#ffd86b' }
const BED = ['WW..........', 'WWPPPPPPPPPP', 'WWPPPPPPPPPP', 'BBBBBBBBBBBB', 'B..........B']
const BED_C = { W: CREAM, P: '#8fbfff', B: BROWN }
const BAG = ['...KKKKK...', '..K.....K..', '.BBBBBBBBB.', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB', '.BBBBBBBBB.']
const SPONGE = ['YYYYYYYY', 'YYYYYYYY', 'GGGGGGGG', 'GGGGGGGG']
const CAKE = ['.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'CCCCCCCCC', 'CWCWCWCWC', 'CCCCCCCCC']
const CAKE_C = { P: PINK, W: CREAM, C: '#c98f6a' }

const CAMEOS = [
  { sign: S, cap: 'Invited four people. | Made *nine lasagnas.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.2) / 1.3) * 9) + 1)
      for (let i = 0; i < n; i++) drawBits(x, TRAY, TRAY_C, 790 + (i % 2 ? 10 : -10), 1110 - i * 52, 20)
      label(x, 790, 1110 - 9 * 52 - 20, `TRAY ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent a dietary form. | *Three pages.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) card(x, 790 + i * 18, 860 + i * 18, 260, 340, pop01(t, P.t0 + 0.2 + (2 - i) * 0.12, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        if (i) return
        x.fillStyle = '#ff9ccf'; x.fillRect(-130, -170, 260, 56); txt(x, 'DINNER FORM', 0, -142, { size: 28 })
        ;['allergies?', 'fave dish?', 'fave dish as a kid?', 'comfort food?'].forEach((s, j) => { txt(x, s, -110, -80 + j * 56, { size: 22, weight: 700, align: 'left' }); x.fillStyle = '#b9b0a0'; x.fillRect(-110, -56 + j * 56, 220, 4) })
      })
      label(x, 790, 640, 'DUE: FRIDAY ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05 })
    } },
  { sign: S, cap: 'Your plate was empty. | *For one second.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, PLATE, { W: CREAM }, 790, 960, 26 * k)
      const f = pop01(t, P.t0 + 0.9 * 3.1 / 2.4, 0.25, 2.4)
      drawBits(x, FOOD, FOOD_C, 790, 900, 22 * f)
      label(x, 790, 700, lt > 0.9 ? 'REFILLED' : 'EMPTY?!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: lt > 0.9 ? MINT : RED, color: lt > 0.9 ? INK : CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, '(3rd time)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Gave a little speech. | *Cried at line one.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', tears: lt => lt > 0.8 ? 3 : 0, star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 860, 240, 300, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'MY SPEECH', 0, -116, { size: 28 }); txt(x, '1. you all', -60, -50, { size: 24, weight: 700, color: RED })
        for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-90, -10 + i * 40, 180, 10) }
      })
      label(x, 790, 1100, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got out the photo albums. | Of *last week.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#c97bff', rot: 0.04 }, () => {
        x.fillStyle = INK; x.fillRect(-4, -130, 8, 260)
        for (let i = 0; i < 4; i++) { const px = -80 + (i % 2) * 160, py = -50 + Math.floor(i / 2) * 100; x.fillStyle = CREAM; x.fillRect(px - 60, py - 40, 120, 84); x.fillStyle = ['#8fd0ff', '#ffd86b', '#7dffb0', '#ff8fb1'][i]; x.fillRect(px - 50, py - 32, 100, 58) }
      })
      label(x, 790, 650, 'TUESDAY ♡', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1080, 'we were so young', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'You yawned once. | Guest room’s *made up.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 980, 24 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 760, 'STAY OVER!', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.05 })
      label(x, 790, 1120, 'TOWELS: FOLDED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “home safe?” | *Before you left.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CANCER', headCol: SKYB, size: 28, lines: [
        ['home safe?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['text me', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['?? ♡', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)]] })
      label(x, 790, 1120, 'YOU: STILL HERE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent you home | with *a week of food.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: INK, B: '#c8975a' }, 790, 950, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const COLS = [RED, MINT, GOLD, SKYB, PINK]
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.5 + i * 0.15, 0.25, 2.2); card(x, 700 + i * 45, 820 - (i % 2) * 40, 80, 60, k, { bg: COLS[i], rot: -0.2 + i * 0.1, border: 4 }) }
      label(x, 790, 1140, 'MON–SUN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Offered to do dishes? | *Don’t you dare.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const grab = ease.inOutCubic(prog(lt, 0.8, 1.1))
      drawBits(x, SPONGE, { Y: '#ffd23a', G: '#5fd068' }, lerp(820, F.x + 170, grab), lerp(900, F.cy + 110, grab), 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 770, 700, 'GUESTS DON’T WASH', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.05 })
      bubble(x, 800, 1060, 'sit. eat.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0135', key: 'F', accent: SKYB, solo: S, ending: 'lesson',
  title: 'Cancers hosting | *dinner.*',
  cameos: CAMEOS,
  group: { cap: 'Come hungry. | *Leave adopted.*', mood: 'heart' },
  lesson: { text: 'Let a Cancer feed you. | It’s *how they say love.*', chip: 'STATUS: FULL' },
  last: {
    text: 'Second dessert? | *Already plated.*',
    draw(x, t, lt) {
      drawBits(x, PLATE, { W: CREAM }, 540, 1150, 22 * pop01(lt, 0.4, 0.35, 2))
      drawBits(x, CAKE, CAKE_C, 540, 1100, 20 * pop01(lt, 0.7, 0.35, 2.2))
      sparkles(x, t, 540, 1100, t - lt + 0.8, 7, 150, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
