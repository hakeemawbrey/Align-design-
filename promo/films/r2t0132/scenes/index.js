// r2t0132: THE SIGNS AS… v3, "The signs planning | an anniversary." (~64 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, each the most extreme version of itself planning an anniversary. The look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs planning | an *anniversary.*"
//   3.6–49.2   ♈ celebrating week one · ♉ eleven-course menu · ♊ two surprises, same time · ♋ scrapbooked every receipt
//              · ♌ a banner of their own face · ♍ itinerary with bathroom breaks · ♎ picked a restaurant, anniversary's over
//              · ♏ destination: classified · ♐ forgot it, called it spontaneous · ♑ calendar invite, repeats yearly
//              · ♒ a party for day 1,000 · ♓ reread every text from day one, sobbed
//  49.2        "Happy anniversary. | *Somehow.*"
//  52.4        LESSON UNLOCKED: "It’s not the plan. | It’s *who’s in it.*"  MATCH: KEPT
//  58.3        "Invite sent. | Libra’s *still deciding.*" over the match card: Capricorn + Libra.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const CAKE = ['....F....', '....Y....', '.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'CCCCCCCCC', 'CWCWCWCWC', 'CCCCCCCCC']
const CAKE_C = { F: ORANGE, Y: GOLD, P: PINK, W: CREAM, C: '#c98f6a' }
const ENV = ['KKKKKKKKKKKK', 'KWKWWWWWWKWK', 'KWWKWWWWKWWK', 'KWWWKWWKWWWK', 'KWWWWKKWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Celebrating the anniversary. | *Of week one.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'HAPPY 1 WEEK!', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05 })
      sparkles(x, t, 790, 820, P.t0 + 0.9, 7, 160, 0.3)
      label(x, 790, 1110, 'NEXT: WEEK 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Planned the menu. | *Eleven courses.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.6)), k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 640 + 220 * u, 260, 140 + 440 * u, k, { bg: CREAM, rot: 0.03 }, () => {
        const h = 140 + 440 * u
        txt(x, 'MENU', 0, -h / 2 + 40, { size: 36 })
        for (let i = 0; i < 11; i++) { const y = -h / 2 + 84 + i * 40; if (y > h / 2 - 20) break; x.fillStyle = i % 2 ? '#c98f6a' : '#b9b0a0'; x.fillRect(-90, y, 180 - (i % 3) * 30, 12); txt(x, String(i + 1), -110, y + 6, { size: 18, font: MONO, weight: 700, color: RED }) }
      })
    } },
  { sign: 'gemini', cap: 'Planned two surprises. | *Same time.*', mood: lt => lt > 1.4 ? 'wide' : 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 720, 280, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: MINT, rot: -0.05 }, () => { txt(x, 'PICNIC', 0, -24, { size: 40 }); txt(x, '7:00 PM', 0, 32, { size: 28, font: MONO, weight: 700 }) })
      card(x, 790, 960, 280, 150, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: LAV, rot: 0.05 }, () => { txt(x, 'BOAT RIDE', 0, -24, { size: 40 }); txt(x, '7:00 PM', 0, 32, { size: 28, font: MONO, weight: 700 }) })
      label(x, 600, 840, 'UH OH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: -0.12 })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook. | Of *every receipt.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#ff9ccf', rot: 0.04 }, () => {
        x.fillStyle = INK; x.fillRect(-4, -140, 8, 280)
        txt(x, 'US ♡', -80, -100, { size: 30 })
        for (let i = 0; i < 4; i++) { x.fillStyle = CREAM; x.fillRect(-140 + (i % 2) * 160, -60 + Math.floor(i / 2) * 100, 110, 80); x.fillStyle = '#b9b0a0'; for (let j = 0; j < 3; j++) x.fillRect(-128 + (i % 2) * 160, -44 + Math.floor(i / 2) * 100 + j * 20, 80, 6) }
      })
      label(x, 790, 1100, 'COFFEE, DAY 3: $4', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Ordered a banner. | Of *their own face.*', mood: 'sparkle', star: { x: -170, y: 60 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 540, 630, 760, 190, k, { bg: '#ffb34a', rot: -0.02 }, () => {
        txt(x, 'HAPPY US!', 140, 0, { size: 60 })
        signChar(x, t, 'leo', -220, 10, 170, { mood: 'wink', seed: 31, glyph: false, glow: 0.5 })
      })
      sparkles(x, t, 540, 630, P.t0 + 0.8, 8, 300, 0.2)
      bubble(x, 800, 960, 'it’s about us! | (me)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Printed the itinerary. | *Bathroom breaks included.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-150, -190, 300, 60); txt(x, 'ITINERARY', 0, -158, { size: 32, color: CREAM })
        const L = [['6:00', 'dinner'], ['6:42', 'toast'], ['6:51', 'bathroom'], ['7:03', 'dessert'], ['7:19', 'bathroom']]
        L.forEach(([a, b], i) => { if (lt < 0.4 + i * 0.2) return; txt(x, a, -80, -90 + i * 60, { size: 24, font: MONO, weight: 700, color: '#6b62a8' }); txt(x, b, 50, -90 + i * 60, { size: 26, weight: b === 'bathroom' ? 800 : 700, color: b === 'bathroom' ? RED : INK }) })
      })
      label(x, 790, 630, 'v14 FINAL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked a restaurant. | Anniversary’s *over.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 280, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        ['italian?', 'sushi?', 'tacos?', 'pizza?'].forEach((s, i) => { txt(x, s, 0, -100 + i * 66, { size: 34, weight: 700 }); if (lt > 0.5 + i * 0.25) { x.fillStyle = RED; x.fillRect(-90, -102 + i * 66, 180, 6) } })
      })
      label(x, 790, 1090, 'IT WAS YESTERDAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Surprise trip. | Destination: *classified.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ENV, { K: INK, W: CREAM }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 870, 'TOP SECRET', pop01(t, P.t0 + 0.8, 0.3, 2.6), { size: 40, bg: RED, color: CREAM, rot: -0.14 })
      bubble(x, 790, 640, 'pack… something.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Forgot the date. | Called it *spontaneous.*', mood: lt => lt < 0.8 ? 'wide' : 'sparkle', star: { x: 160 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      label(x, 320, 680, 'SURPRISE!!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 50, bg: GOLD, rot: -0.06 })
      confetti(x, t, 540, 860, P.t0 + 0.9, { n: 18, spread: 330, h: 600 })
      bubble(x, 320, 960, 'totally | planned this', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Sent a calendar invite. | *Repeats yearly.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 840, 320, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -165, 320, 60); txt(x, 'INVITE', 0, -134, { size: 32 })
        txt(x, 'Anniversary', 0, -60, { size: 34 }); txt(x, '8:00–8:45 PM', 0, -10, { size: 24, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, '↻ every year', 0, 34, { size: 26, weight: 700 })
        x.fillStyle = MINT; x.fillRect(-140, 80, 130, 54); x.fillStyle = '#d9cfbf'; x.fillRect(10, 80, 130, 54)
        txt(x, 'ACCEPT', -75, 108, { size: 22 }); txt(x, 'DECLINE', 75, 108, { size: 22, color: '#8a8270' })
      })
      label(x, 790, 1090, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Threw a party | for *day 1,000.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(1000, Math.round(980 + 20 * ease.outCubic(prog(lt, 0.2, 1.1))))
      label(x, 790, 820, `DAY ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      confetti(x, t, 790, 860, P.t0 + 1.2, { n: 16, spread: 160, h: 560 })
      bubble(x, 790, 1040, 'why wait a year?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Reread every text | from day one. *Sobbed.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'DAY ONE', headCol: PINK, lines: [
        ['hi :)', BONE, pop01(t, P.t0 + 0.3, 0.25, 2.2)], ['hi!! :)', '#c9a6ff', pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['what’s your sign?', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['pisces ♡', '#c9a6ff', pop01(t, P.t0 + 0.9, 0.25, 2.2)]] })
      hearts(x, t, 800, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0132', key: 'E', accent: PINK, ending: 'card',
  title: 'The signs planning | an *anniversary.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'Happy anniversary. | *Somehow.*' },
  lesson: { text: 'It’s not the plan. | It’s *who’s in it.*', chip: 'MATCH: KEPT' },
  last: { text: 'Invite sent. | Libra’s *still deciding.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
