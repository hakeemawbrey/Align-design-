// r2a0389: star_advice, ADVICE ROLLCALL (twelve signs), "What each sign | brings to friends." (signs3kit social cut, music: lofi · E).
// Ending: callback (Taurus finally shares the snacks: "mostly loyalty", paid off).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Brave first moves. | They’ll *walk in first.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 260, h: 340, rot: 0.03, bg: '#c98f5a', lines: [['PARTY', CREAM], ['→', CREAM]], size: 40 })
      friend(x, t, 'cancer', 640, 1010, 150, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], seed: 22 })
      L(x, 820, 1100, 'I GOT YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Snacks and loyalty. | *Mostly loyalty.*', mood: lt => lt > 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'COOKIE', F.x + 140, F.cy + 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'can i have one?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 800, 960, 'LOYAL: YES', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 800, 1060, 'SHARING: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Endless stories. | *Never* a dull call.', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALL: 3:12:40', headCol: '#ffe27a', lines: [['ok one more', BONE, 1, true], ['story', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true], ['hahaha', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      L(x, 800, 1110, 'STILL LAUGHING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'A soft place to land. | *Spare blanket,* always.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'COUCH', 790, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 790, 860, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 720, 'YOUR SPOT', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
      steam(x, t, 930, 860, { n: 1 })
    } },
  { sign: 'leo', cap: 'Your biggest fan. | *Front row,* every time.', mood: 'sparkle', star: ST, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 150, F.cy - 20, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'GO YOU!!!', pop01(t, P.t0 + 0.7, 0.3, 2.4), GOLD, 0.06, 44)
      confetti(x, t, 800, 800, P.t0 + 1.0, { n: 18, spread: 240 })
      L(x, 800, 1060, 'SIGN: HANDMADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Quiet, practical help. | Problems *solved by Tuesday.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 360, head: 'FOR YOU', headBg: MINT, headInk: INK, lines: ['[x] budget', '[x] cover letter', '[x] moving boxes', '[x] dentist call'], size: 28, align: 'left', progress: (lt - 0.4) / 1.0 })
      L(x, 800, 1090, 'NO FUSS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Makes sure everyone | *feels included.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      ['aquarius', 'virgo', 'capricorn'].forEach((id, i) => friend(x, t, id, 680 + i * 120, 920, 140, pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 50 + i }))
      bubble(x, 800, 690, 'scoot in, everyone!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 1100, 'NOBODY LEFT OUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Your secrets? | *Locked forever.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = '#5a5a7a'; x.fillRect(-140, -120, 280, 240)
        x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
        x.save(); x.rotate(lt * 3); x.fillStyle = INK; x.fillRect(-6, -56, 12, 50); x.restore()
        x.restore()
      }
      L(x, 800, 1080, 'VAULT: SEALED', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Adventures. | Every plan becomes *a story.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1040, 'WRONG TURN = BEST DAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Steady support. | They *show up.* On time.', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 990, 'ARRIVED: 6:59', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.04, 32)
      L(x, 800, 1090, 'BROUGHT: HELP', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Permission to be | *weird together.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 800, 920, 190, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 23, tears: 1 })
      L(x, 800, 700, 'CLUB: 2 MEMBERS', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 30)
      bubble(x, 420, 600, 'beep boop', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Big feelings. | Happy *tears* for your wins.', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1020, 'SO PROUD (SOBBING)', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 28)
      hearts(x, t, 800, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0389', key: 'E', accent: ACC, ending: 'callback',
  title: 'What each sign | brings to *friends.*',
  cameos: CAMEOS,
  group: { cap: 'Different gifts. | *Same heart.*', moods: ['sparkle', 'heart', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'sparkle'] },
  last: {
    text: 'Taurus shared. | *Best friends* now.',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1060, 260 * k, { mood: lt > 1.3 ? 'heart' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      friend(x, t, 'scorpio', 760, 1080, 220, pop01(t, t0 + 0.5, 0.4, 2), { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 9 })
      const m = ease.inOutCubic(prog(lt, 0.8, 1.3))
      bits(x, 'COOKIE', lerp(470, 650, m), 1010 - Math.sin(Math.PI * m) * 60, 12)
      if (lt > 1.4) hearts(x, t, 570, 980, t0 + 1.4, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
