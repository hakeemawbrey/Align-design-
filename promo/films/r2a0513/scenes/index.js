// r2a0513: star_advice, ADVICE SOLO, "Leo, let others | *shine too.*" (~51 s vertical, signs3kit, music: lofi · C)
// One sign the whole film (solo mode, 9 cards): a relatable Leo truth + a warm reframe, one light gag each. Ending: lesson.
//   3.6–37.8   a friend got the compliment, clap loudest · their big news, throw the party · let them tell the story
//              · group photo, someone else in the middle · their birthday: wear beige · their chart, listen to all of it
//              · lost game night, cheer the winner · their post, comment first · the quiet friend's idea: turn the light
//  37.8        "Shining together | *shines brighter.*"
//  41.0        LESSON: "Your light grows | when you *share it.*"  STATUS: RADIANT
//  46.9        "Still the loudest | *clapper.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, chartWheel, spot, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'leo', LO = '#f39a3a'
const HANDS = ['.Y.Y..Y.Y.', 'YYYY..YYYY', 'YYYY..YYYY', '.YYY..YYY.', '..YY..YY..']
const HANDS_C = { Y: '#ffd9a0' }
function claps(x, t, cx, cy, k) { const g = 8 + 14 * Math.abs(Math.sin(t * 12)); x.save(); x.translate(cx, cy); drawBits(x, ['.Y.Y.', 'YYYY.', 'YYYY.', '.YYY.'], HANDS_C, -g - 20, 0, 12 * k); drawBits(x, ['.Y.Y.', '.YYYY', '.YYYY', '.YYY.'], HANDS_C, g + 20, 0, 12 * k); x.restore() }
const friend = (x, t, id, cx, cy, s, k, mood, look, seed) => k > 0.01 ? signChar(x, t, id, cx, cy, s * k, { mood, look, seed, glyph: false, tears: id === 'pisces' ? 2 : 0 }) : null

const CAMEOS = [
  { sign: S, cap: 'They got the compliment? | *Clap the loudest.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'virgo', 800, 960, 210, k, 'sparkle', [-1, 0], 31)
      bubble(x, 800, 700, 'love your hair!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: BONE, tail: 'bc' })
      if (lt > 0.9) claps(x, t, F.x, F.cy - 190, pop01(t, P.t0 + 0.9 * (3.1 / 2.4), 0.3, 2))
      label(x, 400, 1150, 'CLAPS: 200', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their big news? | *Throw them the party.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'capricorn', 800, 980, 200, k, lt > 1.2 ? 'heart' : 'wide', [-1, 0], 32)
      for (let i = 0; i < 3; i++) drawBits(x, BM.BALLOON, BM.BALLOON_C, 690 + i * 110, 700 - (i % 2) * 40 + Math.sin(t * 2 + i) * 8, 13 * pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2))
      label(x, 800, 1160, 'THEIR DAY ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: LO, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them tell the story. | *You add sparkles.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'cancer', 800, 970, 210, k, 'happy', [-1, 0], 33)
      bubble(x, 800, 700, 'so THEN | we got lost…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 8, 170, 0.3); sparkles(x, t, 800, 900, P.t0 + 1.8, 8, 200, 1.1)
      label(x, 380, 660, 'SFX: LEO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Group photo? | *Someone else gets centre.*', mood: 'wink', star: { x: -280, s: 210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'pisces', 560, 900, 230, k, 'heart', [0, 0], 34)
      friend(x, t, 'aquarius', 790, 910, 200, k, 'happy', [0, 0], 35)
      label(x, 560, 650, 'CENTRE ✓', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 280, 1120, 'STILL GORGEOUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LO, rot: 0.04, font: MONO, weight: 700 })
      const f = t - (P.t0 + 1.6); if (f > 0 && f < 0.35) { x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - f / 0.35)).toFixed(3)})`; x.fillRect(100, 470, 880, 760) }
    } },
  { sign: S, cap: 'Their birthday? | Wear *beige.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const sw = lt > 1.0
      label(x, 790, 760, sw ? 'OUTFIT: BEIGE' : 'OUTFIT: SEQUINS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: sw ? '#d9c8a8' : GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, sw ? '(SO BRAVE)' : '', sw ? pop01(t, P.t0 + 1.0 * (3.1 / 2.4), 0.3, 2.4) : 0, { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (!sw) sparkles(x, t, 790, 760, P.t0 + 0.4, 8, 200, 0.2)
      drawBits(x, BM.GIFT, BM.GIFT_C, 790, 1090, 12 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: S, cap: 'Asked about their chart? | *Hear all of it.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 125)
      label(x, 790, 1080, `LISTENING: ${Math.round(clamp((lt - 0.4) / 1.6) * 45)} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 660, 'ZERO INTERRUPTIONS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost at game night? | *Cheer the winner.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const Ff = friend(x, t, 'taurus', 800, 990, 200, k, lt > 1.0 ? 'sparkle' : 'wide', [-1, 0], 36)
      const p = ease.outCubic(prog(lt, 0.5, 1.0))
      if (Ff) drawBits(x, BM.TROPHY, BM.TROPHY_C, lerp(420, 800, p), lerp(700, Ff.top - 60, p), 12)
      label(x, 420, 1150, 'GOOD GAME ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their post is glowing? | *Comment first.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FRIEND’S POST', headCol: MINT, lines: [
        ['NEW JOB!!', GOLD, 1], ['so proud ♡♡♡', LO, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['– leo, 0.2s', BONE, pop01(t, P.t0 + 1.3, 0.2, 2), true],
      ] })
    } },
  { sign: S, cap: 'The quiet friend has an idea? | *Turn the light.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.6, 1.3))
      spot(x, lerp(340, 790, p), 470, 1220, 360, pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'scorpio', 800, 970, 200, k, lt > 1.3 ? 'sparkle' : 'neutral', [-1, 0], 37)
      bubble(x, 800, 700, 'um… what if…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'bc' })
      label(x, 380, 660, 'YOUR TURN ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0513', key: 'C', accent: LO, solo: S, ending: 'lesson',
  title: 'Leo, let others | *shine too.*',
  cameos: CAMEOS,
  group: { cap: 'Shining together | *shines brighter.*', mood: 'heart' },
  lesson: { text: 'Your light grows | when you *share it.*', chip: 'STATUS: RADIANT' },
  last: {
    text: 'Still the loudest | *clapper.*',
    draw(x, t, lt) { claps(x, t, 540, 700, pop01(t, t - lt + 0.8, 0.3, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
