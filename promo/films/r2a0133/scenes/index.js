// r2a0133: star_advice, ADVICE SOLO, "Scorpio, before you | send that text." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one gag each.
//   0.0–3.6    "Scorpio, before you | *send that text.*"
//   3.6–37.8   drafted at 2 a.m. (sleep on it) · reading between the lines ("ok." is just ok) · a whole essay (two lines
//              will do) · hot take (let it cool: the phone in the fridge) · testing them (just ask) · feeling it all at once
//              (breathe first) · want to vanish (say how you feel) · get a friend to read it (a Pisces, sobbing)
//              · sent it kind (proud of you)
//  37.8        "Feel it. | *Then send it.*"
//  41.0        LESSON UNLOCKED: "Your feelings are real. | Send them *gently.*"  STATUS: SENT WITH CARE
//  46.9        "They replied: | *“me too.”*" over the match card: Scorpio + Pisces (the friend who read it, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const S = 'scorpio', CRIM = '#ff5a7a'
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const GLASS = ['.KKK....', 'K...K...', 'K...K...', 'K...K...', '.KKK....', '....K...', '.....K..', '......K.']
const STAR5 = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

const CAMEOS = [
  { sign: S, cap: 'Drafted it at 2 a.m.? | *Sleep on it.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 700, 600, 14 * pop01(t, P.t0 + 0.1, 0.3, 2))
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFT', headCol: CRIM, size: 24, lines: [
        ['here’s the thing', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['AND another…', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['also, last year…', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)]] })
      label(x, 800, 1130, 'SAVED. NOT SENT.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reading between the lines? | “ok” *just means ok.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 840, 'ok', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 80, tail: 'bl' })
      drawBits(x, GLASS, { K: BONE }, 790 + 60 * Math.sin(t * 2.5), 800, 22 * pop01(t, P.t0 + 0.5, 0.3, 2) * (1 - prog(lt, 1.3, 1.6)))
      label(x, 790, 1080, 'NO HIDDEN MEANING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Wrote a whole essay? | *Two lines will do.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.2, 1.0)), cut = ease.inOutCubic(prog(lt, 1.3, 1.7))
      const h = lerp(140 + 520 * u, 140, cut)
      card(x, 790, 600 + h / 2, 260, h, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.03 }, () => {
        for (let i = 0; i < 14; i++) { const y = -h / 2 + 34 + i * 34; if (y > h / 2 - 24) break; x.fillStyle = '#b9b0a0'; x.fillRect(-100, y, 200 - (i % 3) * 30, 10) }
      })
      label(x, 790, 1110, 'PAGE 1 OF 6', pop01(t, P.t0 + 0.6, 0.3, 2) * (1 - cut), { size: 28, bg: CRIM, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'MUCH BETTER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Hot take? | *Let it cool first.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const open = ease.outCubic(prog(lt, 0.4, 0.8)) * (1 - ease.inCubic(prog(lt, 1.3, 1.6)))
      card(x, 800, 860, 260, 400, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: '#dfe8f5', rot: 0 }, () => {
        x.fillStyle = '#b9c6dc'; x.fillRect(-130, -60, 260, 8)
        x.fillStyle = '#9aa5c4'; x.fillRect(100, -150, 12, 60); x.fillRect(100, 10, 12, 80)
        if (open > 0.05) { x.fillStyle = '#2a2350'; x.fillRect(-60, 40, 100, 140); x.fillStyle = SKYB; x.fillRect(-50, 56, 80, 100) }
      })
      label(x, 800, 620, 'CHILLING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i * 0.2) % 1; x.fillStyle = `rgba(255,255,255,${(0.8 * (1 - ph)).toFixed(2)})`; x.fillRect(700 + i * 50, 1100 - ph * 60, 8, 8) }
    } },
  { sign: S, cap: 'Testing them? | *Just ask.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 820, 280, 300, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'SECRET TEST', 0, -116, { size: 28, color: RED })
        ;['Q1: do they care?', 'Q2: REALLY care?', 'Q3: prove it'].forEach((s, i) => txt(x, s, 0, -50 + i * 56, { size: 24, weight: 700 }))
        if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(-120, -130); x.lineTo(120, 130); x.moveTo(120, -130); x.lineTo(-120, 130); x.stroke() }
      })
      bubble(x, 790, 1090, 'hey, are we ok?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Feeling it all at once? | *Breathe first.*', mood: lt => (lt % 1.2) < 0.6 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P, F) {
      const b = 0.5 + 0.5 * Math.sin((t - P.t0) * 2.4 - 1.5), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k; x.strokeStyle = MINT; x.lineWidth = 10; x.beginPath(); x.arc(F.x, F.cy, 180 + 70 * b, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 860, b > 0.5 ? 'IN…' : 'OUT…', k, { size: 56, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'x4, THEN DECIDE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want to vanish instead? | *Say how you feel.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'that hurt a bit.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      label(x, 790, 930, 'VANISH MODE: OFF', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 32, bg: CRIM, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BRAVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    },
    hideStar: true,
    back(x, t, lt, P, F) {
      const a = lt < 1.0 ? 0.3 + 0.12 * Math.sin(t * 9) : lerp(0.3, 1, ease.outCubic(prog(lt, 1.0, 1.4)))
      signChar(x, t, S, F.x, F.cy - F.base, 300, { mood: lt > 1.3 ? 'happy' : 'neutral', pop: P.k, alpha: a, seed: 8, hops: [P.t0 + 0.1, P.t0 + 1.4 * 3.1 / 2.4] })
    } },
  { sign: S, cap: 'Get a friend to read it. | *Maybe not Pisces.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 960, 250 * k, { mood: lt > 0.9 ? 'wide' : 'happy', look: [-1, 0], seed: 31, glyph: false, tears: lt > 0.9 ? 3 : 1 })
      bubble(x, 800, 650, 'it’s SO | beautiful', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Sent it kind? | *Proud of you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SENT ✓', headCol: MINT, size: 28, lines: [
        ['I miss us.', CRIM, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['can we talk?', CRIM, pop01(t, P.t0 + 0.6, 0.25, 2.2)]] })
      drawBits(x, STAR5, { Y: GOLD }, 880, 1040, 16 * pop01(t, P.t0 + 1.2, 0.3, 2.6), { rot: 0.2 })
      sparkles(x, t, 880, 1040, P.t0 + 1.25, 7, 120, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0133', key: 'C', accent: CRIM, solo: S, ending: 'card',
  title: 'Scorpio, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Feel it. | *Then send it.*', mood: 'heart' },
  lesson: { text: 'Your feelings are real. | Send them *gently.*', chip: 'STATUS: SENT WITH CARE' },
  last: { text: 'They replied: | *“me too.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
