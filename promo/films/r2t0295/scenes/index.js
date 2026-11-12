// r2t0295: star_talk, SOLO, "Leos on a first date | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): a Leo first date, every beat pushed to the most Leo extreme.
// The date is a Sagittarius, the whole way.
//   0.0–3.6    "Leos on a first date | *be like.*"
//   3.6–37.8   arrived in a cape · raised a toast ("to me… I mean us") · asked your sign, already loved it
//              · told their life story in three acts · picked the seat with the best lighting · complimented you nonstop
//              · paid the bill with a flourish · took a photo "for the memories" · walked you home and took a bow
//  37.8        "Main character. | *Generous co-star.*"   41.0  LESSON: "A Leo’s love | is *loud* and warm."
//  46.9        "Second date? | *Already planned.*" over the match card: Leo + Sagittarius (the sign they loved).
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, beam, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'leo', ST = { x: -180 }, ACC = ORANGE, DATE = 'sagittarius'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })
const date = (x, t, cx, cy, s, k, o = {}) => k > 0.01 ? signChar(x, t, DATE, cx, cy, s * k, { mood: 'happy', look: [-1, 0], seed: 26, glyph: false, ...o }) : null

const CAPE = ['..KKKKKK..', '.KRRRRRRK.', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRRK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK']
const GLASS = ['KKKKK', 'KWWWK', 'KWWWK', '.KWK.', '..K..', '..K..', '.KKK.']
const CURTAIN = ['RRRR........RRRR', 'RRRRR......RRRRR', 'RRRRR......RRRRR', 'RRRR........RRRR', 'RRRR........RRRR', 'RRR..........RRR', 'RRR..........RRR', 'RR............RR']

const CAMEOS = [
  { sign: S, cap: 'Showed up | in *a cape.*', mood: 'sparkle', star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { drawBits(x, CAPE, { K: INK, R: RED }, F.x + Math.sin(t * 3) * 6, F.cy + 40, 32 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2.5) * 0.05 }) },
    front(x, t, lt, P) {
      date(x, t, 820, 1000, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'happy' })
      lab(x, 800, 680, 'DRESS CODE: ICONIC', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Raised a toast. | *"To me— us."*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P, F) {
      drawBits(x, GLASS, { K: '#c9c9d8', W: '#ffb3c8' }, F.x + 150, F.cy - 130, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      date(x, t, 830, 1000, 170, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 780, 680, 'to me… | i mean, US!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Asked your sign. | *Already obsessed.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      date(x, t, 830, 1010, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'wide' })
      bubble(x, 740, 650, "what's your sign?", pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 38, tail: 'bl' })
      bubble(x, 740, 650, 'a SAG?! iconic.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl', col: SUN })
      hearts(x, t, 430, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Told their life story. | *In three acts.*', mood: 'sparkle', star: { x: -40 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      drawBits(x, CURTAIN, { R: '#c1263e' }, 540, 830, 52 * k, { outline: null, alpha: 0.85 })
    },
    front(x, t, lt, P) {
      const act = lt < 0.9 ? 'ACT I' : lt < 1.6 ? 'ACT II' : 'ACT III'
      lab(x, 540, 610, act, pop01(t, P.t0 + 0.3, 0.3, 2), { bg: GOLD, size: 44, rot: 0 })
      date(x, t, 830, 1070, 140, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.6 ? 'sleepy' : 'happy', look: [-1, -1] })
    } },
  { sign: S, cap: 'Picked the seat | with *the best lighting.*', mood: 'sparkle', star: { x: -100 }, hops: [1.0],
    back(x, t, lt, P) { beam(x, 440, 470, 440, 1150, 200, ease.outCubic(prog(lt, 0.3, 0.7)), { a: 0.36 }) },
    front(x, t, lt, P) {
      date(x, t, 840, 1020, 160, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'squint' })
      lab(x, 830, 1150, '(date: in shadow)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GREY })
      sparkles(x, t, 440, 860, P.t0 + 0.7, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Complimented you. | *Every four minutes.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      date(x, t, 830, 1010, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'heart' : 'happy' })
      const cs = ['your laugh?? ICONIC', 'that jacket? ART', 'your ELBOWS. wow']
      const i = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      bubble(x, 740, 660, cs[i], pop01(t, P.t0 + 0.3 + i * 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 830, 1160, `COMPLIMENTS: ${3 + Math.floor(clamp(lt / 2.2) * 24)}`, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Paid the bill | *with a flourish.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), sp = lt > 0.9 ? Math.min(1, (lt - 0.9) * 3) : 0
      card(x, 790, 860, 260, 170, k, { bg: GOLD, rot: -0.1 + sp * 6.28, border: 8 }, () => {
        txt(x, 'THE CHECK', 0, -30, { size: 30, font: MONO, weight: 700 }); txt(x, '♌ got it', 0, 30, { size: 36 })
      })
      confetti(x, t, 790, 860, P.t0 + 1.0, { n: 16, spread: 200, h: 420 })
      lab(x, 790, 1100, 'WAITER: APPLAUDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'A photo "for us." | *Leo’s in focus.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffffff', rot: 0.05 }, () => {
        x.fillStyle = '#2a2350'; x.fillRect(-120, -140, 240, 220)
        x.save(); x.filter = 'blur(6px)'; signChar(x, t, DATE, 55, -10, 110, { mood: 'happy', seed: 27, glyph: false }); x.restore()
        signChar(x, t, S, -35, -20, 170, { mood: 'wink', seed: 28, glyph: false })
        txt(x, 'us ♥', 0, 116, { size: 30 })
      })
      if (lt > 0.9 && lt < 1.1) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(100, 470, 880, 760) }
    } },
  { sign: S, cap: 'Walked you home. | *Took a bow.*', mood: lt => lt > 1.0 ? 'wink' : 'heart', star: ST,
    front(x, t, lt, P, F) {
      date(x, t, 830, 1000, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'happy' })
      bubble(x, 800, 680, 'ENCORE!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'br' })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 8, 200, 0.3)
    },
    squash: lt => 0.18 * Math.sin(Math.PI * clamp((lt - 0.6) / 0.6)) },
]

const F = makeFilm({
  id: 'r2t0295', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Leos on a first date | *be like.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'sagittarius', chip: 'IT’S A MATCH' },
  group: { cap: 'Main character. | *Generous co-star.*', mood: 'sparkle' },
  lesson: { text: 'A Leo’s love is | *loud* and warm.', chip: 'STATUS: SMITTEN' },
  last: { text: 'Second date? | *Already planned.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
