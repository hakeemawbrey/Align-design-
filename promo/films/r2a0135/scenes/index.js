// r2a0135: star_advice, ADVICE ROLL CALL, "How each sign | can be kinder." (topic: how each sign can be kinder to themselves) (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific way to be kinder to yourself each, with a light gag. The look lives in ../../signs3kit.js.
//   0.0–3.6    "How each sign | *can be kinder.*"
//   3.6–49.2   ♈ rest isn't losing, take the nap · ♉ change your mind, it's allowed · ♊ not every thought needs an answer
//              · ♋ mother yourself for once · ♌ off days count, still a star · ♍ done beats perfect · ♎ your opinion
//              matters, say it · ♏ forgive the old you · ♐ slow down, the view's here too · ♑ more than your output
//              · ♒ feelings aren't a bug · ♓ cry if you need to, then drink water
//  49.2        "Be your own | *best friend.*"
//  52.4        LESSON UNLOCKED: "Talk to yourself | like *someone you love.*"  STATUS: GENTLE
//  58.3        "Starting now. | *Yes, you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWLLWWWWLLWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const CUP = ['.s.s....', '..s.s...', 'WWWWWW..', 'TTTTTTWW', 'WWWWWW.W', 'WWWWWWWW', 'WWWWWW..', '.WWWW...']
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const SNAIL = ['...SSSS....', '..SsSSsS...', '.SSsssSSS..', '.SsSSSsS...', '..SSSS...EE', 'BBBBBBBBBBB']
const SNAIL_C = { S: '#ff9a4a', s: '#c8643a', B: '#9ae6a8', E: '#9ae6a8' }
const WATER = ['W......W', 'WSSSSSSW', 'WSSSSSSW', 'WSSSSSSW', 'WSSSSSSW', '.WSSSSW.', '.WWWWWW.']
const WATER_C = { W: '#e8f6ff', S: SKYB }
const STAR5 = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

const CAMEOS = [
  { sign: 'aries', cap: 'Rest isn’t losing. | *Take the nap.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: CREAM, L: '#c9a6ff' }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'NAP: WON', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Change your mind. | *It’s allowed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 760, 280, 110, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: BONE, rot: -0.04 }, () => { txt(x, 'PLAN A', 0, 2, { size: 42, color: lt > 1.0 ? '#9a9080' : INK }); if (lt > 1.0) { x.fillStyle = RED; x.fillRect(-110, -4, 220, 8) } })
      card(x, 790, 960, 280, 110, pop01(t, P.t0 + 1.0 * 3.1 / 2.4, 0.3, 2.4), { bg: MINT, rot: 0.04 }, () => txt(x, 'PLAN B ✓', 0, 2, { size: 42 }))
    } },
  { sign: 'gemini', cap: 'Not every thought | *needs an answer.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: lt => lt > 1.3 ? [0, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const Q = [[700, 640], [880, 700], [760, 820], [900, 900], [700, 980]]
      const fade = 1 - ease.inCubic(prog(lt, 1.2, 1.7))
      Q.forEach(([qx, qy], i) => bubble(x, qx, qy, '?', pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2) * fade, { size: 44, tail: 'bl' }))
      label(x, 790, 1100, 'LET IT FLOAT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Mother yourself | *for once.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'FOR: ME', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.1, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Off days count. | *Still a star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', star: { x: -170 },
    back(x, t, lt, P) {
      const k = 0.08 + 0.25 * ease.outCubic(prog(lt, 1.2, 1.6))
      x.save(); x.globalAlpha = k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(330, 490); x.lineTo(410, 490); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'BATTERY: 12%', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      drawBits(x, STAR5, { Y: GOLD }, 790, 960, 18 * pop01(t, P.t0 + 1.2, 0.3, 2.6), { rot: 0.15 })
      sparkles(x, t, 790, 960, P.t0 + 1.3, 7, 130, 0.3)
    } },
  { sign: 'virgo', cap: 'Done beats perfect. | *Hit send.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'DRAFT v31', 0, -120, { size: 28, color: '#6b62a8' })
        for (let i = 0; i < 5; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-100, -60 + i * 40, 200 - (i % 2) * 40, 10) }
      })
      label(x, 790, 900, 'GOOD ENOUGH ✓', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: MINT, rot: -0.14 })
    } },
  { sign: 'libra', cap: 'Your opinion matters. | *Say it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 170, F.cy + 20, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.35 })
      bubble(x, 790, 720, 'I’d like | pasta, please.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1080, 'HEARD ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Forgive the old you. | *They were learning.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 840, 240, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.05 }, () => {
        x.fillStyle = '#c9b8a0'; x.fillRect(-100, -110, 200, 180)
        signChar(x, t, 'scorpio', 0, -10, 120, { mood: 'wide', seed: 71, glyph: false, glow: 0.4 })
        txt(x, 'me, 2015', 0, 104, { size: 24, font: MONO, weight: 700 })
      })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 3 })
      label(x, 790, 1090, 'FORGIVEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: '#ff5a7a', color: CREAM, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Slow down. | *The view’s here too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: 170 },
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(260, 340, clamp(lt / 2.4)), 1060, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 310, 760, 'SCENIC ROUTE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05 })
      sparkles(x, t, 310, 900, P.t0 + 1.3, 6, 140, 0.3)
    } },
  { sign: 'capricorn', cap: 'You’re more | *than your output.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'MY WORTH', 0, -110, { size: 28 })
        const swap = ease.outCubic(prog(lt, 1.1, 1.5))
        for (let i = 0; i < 4; i++) { const h = (40 + i * 30) * (1 - swap); x.fillStyle = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a'][i]; x.fillRect(-110 + i * 60, 110 - h, 40, h) }
        if (swap > 0.05) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 20, 18 * swap)
      })
      label(x, 790, 1090, 'NOT A CHART', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Feelings aren’t a bug. | *Feel one.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#dfe8f5', rot: 0.03 }, () => {
        x.fillStyle = '#6fc3ff'; x.fillRect(-150, -110, 300, 44); txt(x, 'SYSTEM', 0, -88, { size: 24, font: MONO, weight: 700 })
        txt(x, 'feeling detected', 0, -20, { size: 28, weight: 700 })
        const ok = lt > 1.2
        x.fillStyle = ok ? MINT : '#c9d0dc'; x.fillRect(-120, 30, 110, 50); x.fillStyle = '#c9d0dc'; x.fillRect(10, 30, 110, 50)
        txt(x, 'ALLOW', -65, 56, { size: 22 }); txt(x, 'IGNORE', 65, 56, { size: 22, color: '#8a8aa0' })
      })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'pisces', cap: 'Cry if you need to. | *Then drink water.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 1, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, WATER, WATER_C, 790, 900, 20 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 790, 700, 'HYDRATE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'r2a0135', key: 'G', accent: MINT, ending: 'lesson',
  title: 'How each sign | *can be kinder.*',
  cameos: CAMEOS,
  group: { cap: 'Be your own | *best friend.*' },
  lesson: { text: 'Talk to yourself | like *someone you love.*', chip: 'STATUS: GENTLE' },
  last: {
    text: 'Starting now. | *Yes, you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
