// r2t0115: star_talk, ROLLCALL, "The signs | as interns." (~57 s vertical, signs3kit social cut, lofi · F)
// Twelve signs in zodiac order as interns, each the most extreme version of itself.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ asked for a promotion on day one · ♉ only here for the free lunch · ♊ friends with every department
//              · ♋ brought muffins for the whole floor · ♌ gave a speech at their own orientation · ♍ fixed the company's
//              typos · ♎ asked everyone's sign for the seating chart · ♏ already knows who ate the yogurt
//              · ♐ took a "quick break", back in July · ♑ already managing the manager · ♒ pitched a four-day weekend
//              · ♓ cried at the welcome email
//  49.2        "Unpaid. | *Unstoppable.*"
//  52.4        LESSON UNLOCKED: "Everyone starts | *somewhere.*"  INTERN: HIRED
//  58.3        "Best intern? | *All twelve.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, PLATE, PIZZA, PIZZA_C, PEN, TISSUE, TISSUE_C } from './props.js'

const MUFFIN = ['..PPPP..', '.PPPPPP.', 'PPWPPPPP', 'PPPPPWPP', 'BBBBBBBB', '.BbBbBb.', '.BBBBBB.', '..BbBb..']
const MUFFIN_C = { P: '#c58cff', W: '#ffffff', B: '#d9a05b', b: BROWN }
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..']
const YOGURT = ['.WWWWWW.', 'WPPPPPPW', '.WWWWWW.', '.WPPPPW.', '.WPPPPW.', '..WWWW..']
const GLYPHS = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎']

const CAMEOS = [
  { sign: 'aries', cap: 'Asked for a promotion | *on day one.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 240, 180, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = RED; x.fillRect(-120, -90, 240, 54); txt(x, 'DAY', 0, -62, 28, CREAM, { font: MONO, weight: 700 }); txt(x, '1', 0, 30, 90, INK)
      })
      bubble(x, 790, 1060, 'so… CEO?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Only here | for *the free lunch.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM }, 790, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIZZA, PIZZA_C, 790, 950, 12 * pop01(t, P.t0 + 0.35, 0.3, 2))
      label(x, 790, 700, 'BENEFITS: LUNCH', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Friends with | *every department.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      ;['SALES ♡', 'IT ♡', 'HR ♡', 'LEGAL ♡', 'THE LOBBY ♡'].forEach((s, i) => label(x, 760 + (i % 2) * 70, 640 + i * 105, s, pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.4), { size: 32, bg: [PINK, MINT, GOLD, SKYB, LAV][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Brought homemade muffins | *for the whole floor.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 1010, 380, 40, WOOD, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0 })
      for (let i = 0; i < 9; i++) drawBits(x, MUFFIN, MUFFIN_C, 660 + (i % 4) * 85 + (i > 7 ? 120 : 0), 950 - Math.floor(i / 4) * 70, 8 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.25, 2.2))
      label(x, 790, 660, 'SERVES: 80', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gave a speech | at *their own orientation.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: INK }, F.x + 150, F.cy - 30, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      bubble(x, 800, 660, 'thank you | all for coming', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 800, 1060, 'NOBODY ASKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Fixed | *the company’s typos.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 360, '#ffffff', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        txt(x, 'MISSION', 0, -140, 28, INK, { font: MONO, weight: 700 })
        ;['we love', 'teh customer', 'and there', 'bussiness'].forEach((s, i) => txt(x, s, -140, -80 + i * 54, 28, INK, { font: MONO, weight: 700, align: 'left' }))
        const n = Math.floor(prog(lt, 0.5, 1.5) * 3)
        x.fillStyle = RED; x.font = `800 26px ${INTER}`; x.textAlign = 'left'
        if (n > 0) { x.fillRect(-140, -28, 70, 5); x.fillText('the', -60, -42) }
        if (n > 1) { x.fillRect(-60, 26, 90, 5); x.fillText('their', 40, 12) }
        if (n > 2) { x.fillRect(-140, 82, 160, 5); x.fillText('business', 30, 68) }
      })
      drawBits(x, PEN, { R: RED, W: CREAM }, 980, 1020, 11 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: Math.sin(t * 12) * 0.08 })
    } },
  { sign: 'libra', cap: 'Asked everyone’s sign | *for the seating chart.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 340, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.03 }, x => {
        txt(x, 'SEATING', 0, -136, 28, '#c0408a', { font: MONO, weight: 700 })
        const n = Math.floor(prog(lt, 0.3, 1.6) * 12)
        for (let i = 0; i < 12; i++) {
          const px = -110 + (i % 4) * 74, py = -70 + Math.floor(i / 4) * 80
          x.fillStyle = INK; x.fillRect(px - 30, py - 30, 60, 60); x.fillStyle = i < n ? '#ffd1e6' : '#e8e0d0'; x.fillRect(px - 26, py - 26, 52, 52)
          if (i < n) txt(x, GLYPHS[(i * 5) % 12], px, py + 2, 34, INK, { font: "'Segoe UI Symbol','Noto Sans Symbols','Noto Sans Symbols 2',serif", weight: 400 })
        }
      })
      label(x, 790, 1100, 'VIBES: BALANCED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Already knows | *who ate the yogurt.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, YOGURT, { W: '#ffffff', P: PINK }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'it was | Dave.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1080, 'CASE CLOSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#b0386b', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Took a “quick break.” | *Back in July.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const M = ['MAR', 'APR', 'MAY', 'JUN', 'JUL']
      const i = Math.min(4, Math.floor(prog(lt, 0.4, 1.6) * 5))
      card(x, 790, 850, 280, 300, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = '#c58cff'; x.fillRect(-140, -150, 280, 80); txt(x, '2:05 PM', 0, -110, 30, INK, { font: MONO, weight: 700 })
        txt(x, M[i], 0, 40, 100, INK)
      })
      label(x, 790, 1100, 'BRB', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Week one. | *Managing the manager.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.7, 1.4))
      card(x, 790, 850, 340, 380, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        txt(x, 'ORG CHART', 0, -156, 26, '#4c7a5a', { font: MONO, weight: 700 })
        x.fillStyle = INK; x.fillRect(-4, -60, 8, 80)
        const top = lerp(-80, 70, sw), bot = lerp(70, -80, sw)
        x.fillStyle = '#e8e0d0'; x.fillRect(-100, top - 40, 200, 80); txt(x, 'MANAGER', 0, top, 26, INK, { font: MONO, weight: 700 })
        x.fillStyle = MINT; x.fillRect(-100, bot - 40, 200, 80); txt(x, 'INTERN', 0, bot, 26, INK, { font: MONO, weight: 700 })
      })
    } },
  { sign: 'aquarius', cap: 'Pitched | *a four-day weekend.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 840, 360, 300, '#ffffff', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.03 }, x => {
        txt(x, 'PROPOSAL', 0, -116, 26, '#1c8ab0', { font: MONO, weight: 700 })
        ;['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => {
          const off = i >= 3 && lt > 0.9
          x.fillStyle = off ? MINT : '#e8e0d0'; x.fillRect(-160 + i * 46, -40, 40, 70); txt(x, d, -140 + i * 46, -5, 26, INK)
        })
        if (lt > 1.2) txt(x, 'MORALE ↑↑↑', 0, 90, 32, '#2f9a4a', { font: MONO, weight: 700 })
      })
      label(x, 790, 1080, 'BOARD: CONSIDERING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#5fd0ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the welcome email.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 330, 230, '#ffffff', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = SKYB; x.fillRect(-165, -115, 330, 50); txt(x, 'NEW MESSAGE', 0, -90, 22, INK, { font: MONO, weight: 700 })
        txt(x, 'Welcome to', 0, -10, 32, INK); txt(x, 'the team!', 0, 34, 32, INK)
        txt(x, '– HR', 80, 82, 22, '#6b62a8', { font: MONO, weight: 700 })
      })
      drawBits(x, TISSUE, TISSUE_C, 800, 1060, 12 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0115', key: 'F', accent: GOLD, ending: 'lesson',
  title: 'The signs | *as interns.*',
  cameos: CAMEOS,
  group: { cap: 'Unpaid. | *Unstoppable.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'wink', 'squint', 'happy', 'squint', 'sparkle', 'neutral', 'wink', 'heart'] },
  lesson: { text: 'Everyone starts | *somewhere.*', chip: 'INTERN: HIRED' },
  last: {
    text: 'Best intern? | *All twelve.*',
    draw(x, t, lt) { sparkles(x, t, 540, 760, t - lt + 0.9, 10, 260, 0.2); hearts(x, t, 540, 800, t - lt + 1.0, { n: 8, life: 2.0, spread: 600, cell: 7, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
