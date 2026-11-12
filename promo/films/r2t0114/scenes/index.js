// r2t0114: star_talk, ROLLCALL, "The signs | networking." (~57 s vertical, signs3kit social cut, lofi · D)
// Twelve signs in zodiac order at a networking event, each the most extreme version of itself.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ 200 business cards in ten minutes · ♉ only networked with the snack table · ♊ knows everyone, no names
//              · ♋ adopted a nervous newbie · ♌ name tag: "you know me" · ♍ brought a laminated résumé
//              · ♎ complimented every outfit, five offers · ♏ asked everyone's rising sign · ♐ pitched a business to the
//              coat rack · ♑ colour-coded contacts live · ♒ networked with the venue's cat · ♓ cried at a career story
//  49.2        "Twelve signs. | *One snack table.*"
//  52.4        LESSON UNLOCKED: "Every connection | starts *with hi.*"  CONTACTS: +11
//  58.3        "Pisces left with | *eleven best friends.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, chart, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, PLATE, TISSUE, TISSUE_C } from './props.js'

const CAT = ['K.....K.', 'KK...KK.', 'KGGGGGK.', 'GWGGGWG.', 'GGGPGGG.', '.GGGGG..', '.GGGGGG.', 'GGGGGGGG', 'GGGGGGGG.'.slice(0, 8), 'G.GG.G.G']
const SANDWICH = ['..BBBBBB..', '.BBBBBBBB.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'YYYYYYYYYY', '.BBBBBBBB.']
const RACK = ['....KK....', '.KKKKKKKK.', 'K...KK...K', '....KK....', '....KK....', '....KK....', '....KK....', '....KK....', '....KK....', '....KK....', '..KKKKKK..']

// a "HELLO my name is" sticker
function nameTag(x, cx, cy, k, name, { rot = -0.05, w = 300, size = 40 } = {}) {
  card(x, cx, cy, w, 190, '#ffffff', { k, rot }, x => {
    x.fillStyle = RED; x.fillRect(-w / 2, -95, w, 70)
    txt(x, 'HELLO', 0, -72, 30, '#ffffff')
    txt(x, 'my name is', 0, -40, 18, '#ffffff', { font: MONO, weight: 700 })
    txt(x, name, 0, 34, size, INK, { weight: 800 })
  })
}
function bizCard(x, cx, cy, k, rot, col = CREAM) {
  card(x, cx, cy, 120, 70, col, { k, rot, shadow: false }, x => { x.fillStyle = INK; x.fillRect(-46, -16, 60, 8); x.fillRect(-46, 4, 80, 6) })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Handed out 200 cards. | *In ten minutes.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P, F) {
      for (let i = 0; i < 9; i++) {
        const ph = ((lt * 1.4 + i / 9) % 1)
        if (lt < 0.2) continue
        bizCard(x, lerp(F.x + 170, 960, ph), 900 - Math.sin(Math.PI * ph) * 300 + i * 12, 1, ph * 6 + i)
      }
      label(x, 790, 1110, 'CARDS LEFT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Only networked with | *the snack table.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 1010, 380, 40, WOOD, { k, rot: 0 })
      x.fillStyle = INK; x.fillRect(630, 1030, 16, 100 * k); x.fillRect(934, 1030, 16, 100 * k)
      for (let i = 0; i < 6; i++) drawBits(x, SANDWICH, { B: '#e7b46a', G: '#7fd67a', R: '#ff6b5a', Y: '#ffd84a' }, 680 + (i % 3) * 110, 960 - Math.floor(i / 3) * 56, 8 * pop01(t, P.t0 + 0.3 + i * 0.08, 0.25, 2))
      label(x, 790, 680, 'CONNECTIONS: 12 (SNACKS)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 24, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Knows everyone now. | *Remembers no names.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      ;['???', 'Jen? Ben?', 'tall guy'].forEach((n, i) => nameTag(x, 790 + (i - 1) * 50, 700 + i * 160, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), n, { w: 260, size: 34, rot: [-0.08, 0.06, -0.03][i] }))
    } },
  { sign: 'cancer', cap: 'Adopted a nervous newbie. | *Family now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), m = ease.inOutCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) signChar(x, t, 'virgo', lerp(880, 700, m), 960, 160 * k, { mood: m > 0.8 ? 'heart' : 'wide', look: [-1, 0], seed: 22, glyph: false })
      if (lt < 0.9) bubble(x, 860, 760, 'I know | no one…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, col: LAV, tail: 'bc' })
      else label(x, 790, 700, 'ADOPTED ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      hearts(x, t, 680, 880, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Name tag says | *“you know me.”*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      nameTag(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 'you know me', { w: 340, size: 40 })
      sparkles(x, t, 790, 850, P.t0 + 1.0, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Brought a résumé. | *Laminated.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, 300, 390, '#ffffff', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        txt(x, 'RÉSUMÉ', 0, -150, 30, INK, { font: MONO, weight: 700 })
        for (let i = 0; i < 8; i++) { x.fillStyle = i % 3 ? '#9aa5c4' : INK; x.fillRect(-120, -100 + i * 34, 240 - (i * 41) % 90, 12) }
        const g = (t * 0.6) % 1.6 - 0.3
        x.save(); x.beginPath(); x.rect(-150, -195, 300, 390); x.clip()
        x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.moveTo(-150 + g * 300, -195); x.lineTo(-90 + g * 300, -195); x.lineTo(-210 + g * 300, 195); x.lineTo(-270 + g * 300, 195); x.fill()
        x.restore()
      })
      label(x, 790, 1100, '14 COPIES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Complimented every outfit. | *Five job offers.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'love | your blazer!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      const n = Math.floor(prog(lt, 0.8, 1.8) * 5)
      for (let i = 0; i < n; i++) card(x, 760 + i * 22, 980 - i * 26, 230, 110, i % 2 ? CREAM : '#ffe1ec', { rot: -0.08 + i * 0.04, shadow: false }, x => txt(x, 'OFFER', 0, 0, 30, INK, { font: MONO, weight: 700 }))
    } },
  { sign: 'scorpio', cap: 'Asked everyone’s | *rising sign.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      chart(x, t, 800, 900, pop01(t, P.t0 + 0.5, 0.35, 2), { r: 120 })
      bubble(x, 790, 660, 'and your | rising?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1100, 'NOTED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#b0386b', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Pitched a business | to *the coat rack.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, RACK, { K: '#6b4a2e' }, 820, 900, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      card(x, 760, 830, 70, 150, '#c58cff', { k: pop01(t, P.t0 + 0.3, 0.3, 2), rot: 0.1, shadow: false })
      card(x, 890, 830, 70, 130, '#ffb34a', { k: pop01(t, P.t0 + 0.35, 0.3, 2), rot: -0.1, shadow: false })
      bubble(x, 560, 640, 'hear me out:', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 820, 1150, 'INVESTED? UNCLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Colour-coded contacts. | *During the event.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 380, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        x.fillStyle = '#4c7a5a'; x.fillRect(-170, -190, 340, 56)
        txt(x, 'CONTACTS.xls', 0, -162, 24, CREAM, { font: MONO, weight: 700 })
        const n = Math.floor(prog(lt, 0.3, 1.8) * 8)
        const cols = [MINT, GOLD, PINK, SKYB]
        for (let j = 0; j < n; j++) { x.fillStyle = cols[j % 4]; x.fillRect(-150, -118 + j * 36, 300, 30); x.fillStyle = INK; x.fillRect(-136, -108 + j * 36, 120, 10) }
      })
      label(x, 790, 1110, 'FOLLOW-UP: 8:00 AM', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Networked with | *the venue’s cat.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: INK, G: '#9aa5c4', W: '#ffffff', P: PINK }, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bizCard(x, 830, 1110, pop01(t, P.t0 + 1.0, 0.3, 2.2), -0.1)
      bubble(x, 800, 690, 'great | listener.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at someone’s | *career story.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, '…and then | I got promoted.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      drawBits(x, TISSUE, TISSUE_C, 800, 950, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 800, 1110, 'SO PROUD OF YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0114', key: 'D', accent: GOLD, ending: 'lesson',
  title: 'The signs | *networking.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One snack table.*', moods: ['sparkle', 'heart', 'wide', 'heart', 'wink', 'squint', 'sparkle', 'squint', 'sparkle', 'neutral', 'heart', 'heart'] },
  lesson: { text: 'Every connection | starts *with hi.*', chip: 'CONTACTS: +11' },
  last: {
    text: 'Pisces left with | *eleven best friends.*',
    draw(x, t, lt) { hearts(x, t, 540, 780, t - lt + 0.8, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
