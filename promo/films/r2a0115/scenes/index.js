// r2a0115: star_advice, ADVICE ROLLCALL, "Brighten each sign’s | Monday." (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order: one warm, specific way to brighten each sign's Monday, with a light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ coffee ready before they ask · ♉ pastries, that's the plan · ♊ a meme at 9:01 a.m.
//              · ♋ ask how the weekend really was · ♌ compliment the outfit, loudly · ♍ tidy their desk (ask first)
//              · ♎ flowers on the lunch table · ♏ skip small talk, ask a real question · ♐ promise a Friday adventure
//              · ♑ "nice work" before noon · ♒ share a weird fact · ♓ send a song that's so them
//  49.2        "Monday? | *Handled.*"
//  52.6        CALLBACK: "And Taurus? | Still on *pastry two.*"  Taurus and a stack of croissants.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chat, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, PLATE, MUG, FLOWER, FLOWER_C } from './props.js'

const CROISSANT = ['....BBBB....', '..BBbBBbBB..', '.BBBbBBbBBB.', 'BBBBbBBbBBBB', 'BB.BbBBbB.BB', 'B...BBBB...B']
const CROISSANT_C = { B: '#e7a54a', b: '#b8742a' }
const MAP_X = ['X...X', '.X.X.', '..X..', '.X.X.', 'X...X']

const CAMEOS = [
  { sign: 'aries', cap: 'Coffee, ready | *before they ask.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: BONE, C: BROWN }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(239,230,214,${0.55 * Math.sin(Math.PI * ((t * 0.8 + i / 3) % 1))})`; x.fillRect(730 + i * 45, 760 - ((t * 60 + i * 40) % 110), 14, 40) }
      label(x, 790, 1110, 'WAIT TIME: 0 SEC', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Pastries. | *That’s the whole plan.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM }, 790, 1010, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, CROISSANT, CROISSANT_C, 790 + (i - 1) * 20, 960 - i * 50, 12 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2.2))
      label(x, 790, 700, 'PLAN: COMPLETE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Send a meme | *at 9:01 a.m.*', mood: lt => lt > 1.1 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        txt(x, '9:01', 0, -h / 2 + 34, 24, LAV, { font: MONO, weight: 700 })
        if (lt > 0.6) {
          x.fillStyle = INK; x.fillRect(-90, -90, 180, 160); x.fillStyle = GOLD; x.fillRect(-84, -84, 168, 148)
          signChar(x, t, 'gemini', 0, -20, 100, { mood: 'wide', seed: 31, glyph: false, glow: 0.4 })
          txt(x, 'ME ON MONDAY', 0, 46, 18, INK, { font: MONO, weight: 700 })
        }
        if (lt > 1.2) chat(x, 'HAHAHA', w / 2 - 14, 120, { right: true, col: MINT, size: 22 })
      })
    } },
  { sign: 'cancer', cap: 'Ask how their weekend | *really was.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how was it, | really?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 790, 940, 'TALKED FOR 40 MIN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Compliment the outfit. | *Loudly.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'THAT JACKET?!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 940, 'OUTFIT: 10/10', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.1, 8, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Tidy their desk. | *(Ask first.)*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), neat = ease.inOutCubic(prog(lt, 0.8, 1.4))
      card(x, 790, 1040, 380, 30, WOOD, { k, rot: 0 })
      const cols = [CREAM, SKYB, PINK, MINT, GOLD]
      for (let i = 0; i < 5; i++) {
        const mx = 640 + i * 70 + Math.sin(i * 3) * 30, my = 990 - (i % 2) * 40, r = Math.sin(i * 2.3) * 0.6
        const nx = 690, ny = 1005 - i * 22
        card(x, lerp(mx, nx, neat), lerp(my, ny, neat), 120, 18, cols[i], { k, rot: lerp(r, 0, neat), shadow: false })
      }
      if (lt < 0.8) bubble(x, 860, 720, 'may I?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      else label(x, 860, 720, 'SO NEAT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: SAGE, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Flowers | *on the lunch table.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 1040, 380, 30, CREAM, { k, rot: 0 })
      card(x, 790, 960, 90, 120, SKYB, { k, rot: 0, shadow: false })
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { ...FLOWER_C, P: [PINK, GOLD, LAV][i] }, 750 + i * 40, 840 - (i % 2) * 40, 9 * pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2))
      label(x, 790, 660, 'AESTHETIC: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Skip small talk. | *Ask a real question.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'nice weather', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 34, col: '#d8dbe8', tail: 'br' })
      if (lt > 0.85 && lt < 1.3) { x.fillStyle = RED; x.fillRect(680, 676, 220 * prog(lt, 0.85, 1.0), 7) }
      bubble(x, 790, 900, 'what’s really | on your mind?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1110, 'DEEP TALK: UNLOCKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: '#b0386b', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Promise a | *Friday adventure.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 280, '#ead7a8', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.strokeStyle = '#b89a62'; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-120, 90)
        x.bezierCurveTo(-40, -60, 40, 120, 100 * prog(lt, 0.4, 1.3) + 20 * (1 - prog(lt, 0.4, 1.3)), -70 * prog(lt, 0.4, 1.3)); x.stroke(); x.setLineDash([])
        if (lt > 1.3) drawBits(x, MAP_X, { X: RED }, 100, -70, 9)
        txt(x, 'FRIDAY →', -40, -100, 26, INK, { font: MONO, weight: 700 })
      })
      label(x, 790, 1100, 'SOMETHING TO WAIT FOR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Say “nice work” | *before noon.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 240, '#fff27a', { k: pop01(t, P.t0 + 0.4, 0.35, 2), rot: -0.05 }, x => { txt(x, 'NICE', 0, -34, 54, INK); txt(x, 'WORK!', 0, 34, 54, INK) })
      label(x, 790, 1100, 'TIME: 11:58 AM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: 'aquarius', cap: 'Share | *a weird fact.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'octopuses have | three hearts.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 940, 'MIND: BLOWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#5fd0ff', rot: -0.04 })
      sparkles(x, t, 370, 800, P.t0 + 1.3, 8, 160, 0.5)
    } },
  { sign: 'pisces', cap: 'Send a song | *that’s so them.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        x.fillStyle = LAV; x.fillRect(-80, -120, 160, 160)
        drawBits(x, ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.'], { X: INK }, 0, -40, 14)
        txt(x, 'for you ♡', 0, 90, 26, BONE, { font: MONO, weight: 700 })
        x.fillStyle = '#5b5480'; x.fillRect(-90, 130, 180, 8); x.fillStyle = MINT; x.fillRect(-90, 130, 180 * ((t * 0.15) % 1), 8)
      })
      notes(x, t, 600, 760, { n: 4, cell: 6, col: SKYB, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0115', key: 'G', accent: GOLD, ending: 'callback',
  title: 'Brighten each sign’s | *Monday.*',
  cameos: CAMEOS,
  group: { cap: 'Monday? | *Handled.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'heart', 'heart', 'heart', 'sparkle', 'heart', 'wide', 'heart'] },
  last: {
    text: 'And Taurus? | Still on *pastry two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1060, 250 * k, { mood: 'heart', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      drawBits(x, PLATE, { W: CREAM }, 720, 1130, 22 * pop01(t, t - lt + 0.6, 0.35, 2))
      for (let i = 0; i < 3; i++) drawBits(x, CROISSANT, CROISSANT_C, 650 + i * 70, 1085 - (i % 2) * 40, 12 * pop01(t, t - lt + 0.8 + i * 0.12, 0.3, 2.2))
      sparkles(x, t, 720, 980, t - lt + 1.5, 8, 180, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
