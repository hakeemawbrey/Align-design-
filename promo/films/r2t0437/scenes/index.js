// r2t0437: star_talk, ROLL CALL, "The signs on | a *field trip.*" (signs3kit social cut, music: lofi · E). Ending: callback.
//   twelve signs as kids on a school field trip, each at its most extreme:
//   ♈ off the bus before it stopped · ♉ ate lunch at 9:04 · ♊ talked the whole ride, to the driver · ♋ snacks for the whole class
//   · ♌ gave the tour (wasn't the guide) · ♍ laminated permission slip · ♎ couldn't pick a bus buddy, matched with everyone
//   · ♏ found the staff-only door · ♐ got lost on purpose · ♑ notes for a test that doesn't exist · ♒ asked the dinosaur its sign
//   · ♓ cried at the aquarium (happy tears)
//  49.2   "Best trip | *ever.*"   52.6 CALLBACK: "Ride home. | Taurus: *“dinner?”*" (the empty lunchbox again)
import {
  makeFilm, sparkles, hearts, bubble, label, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, sheet, clock, buddy, drawBits, clamp, prog, ease, lerp,
  BUS, BUS_C, LUNCHBOX, LUNCHBOX_C, BACKPACK, BACKPACK_C, DINO, DINO_C, FISH, FISH_C, MAP, MAP_C, FLAG, FLAG_C,
  RED, CREAM, ORANGE, TEAL, WOOD, GREEN, BROWN, GREY,
} from './props.js'

const YEL = '#ffd23a'
/** a door with a sign on it */
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -200, 220, 400); x.fillStyle = '#0a0618'; x.fillRect(-100, -190, 200, 390)
  x.fillStyle = 'rgba(255,240,180,0.5)'; x.fillRect(-100, -190, 200 * open, 390)
  x.fillStyle = WOOD; x.fillRect(-100 + 200 * open, -190, 200 * (1 - open), 390)
  if (open < 0.6) { x.fillStyle = GOLD; x.fillRect(60 - 200 * open * 0.5, 10, 14, 14) }
  x.restore()
}
/** a fish tank */
function tank(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -140, 380, 280); x.fillStyle = '#2a6fb0'; x.fillRect(-180, -130, 360, 260)
  x.fillStyle = 'rgba(143,227,255,0.35)'; x.fillRect(-180, -130, 360, 40)
  x.fillStyle = '#f3d79a'; x.fillRect(-180, 100, 360, 30)
  for (let i = 0; i < 3; i++) { x.fillStyle = GREEN; x.fillRect(-150 + i * 120, 40 - i * 10, 14, 60 + i * 10) }
  for (let i = 0; i < 3; i++) drawBits(x, FISH, FISH_C, -100 + ((t * 40 + i * 120) % 260), -60 + i * 50 + 6 * Math.sin(t * 3 + i), 8, { sx: 1 })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Off the bus | *before it stopped.*', mood: 'wide', look: [1, 0], star: { x: -200, y: -40 }, hops: [0.3, 0.8, 1.3],
    front(x, t, lt, P) {
      const roll = ease.outCubic(prog(lt, 0, 1.6))
      drawBits(x, BUS, BUS_C, lerp(1000, 760, roll), 1030, 22 * at(t, P, 0.05), { rot: 0 })
      L(x, 760, 640, 'STILL MOVING', at(t, P, 1.0), RED, -0.04, 34, CREAM)
    } },
  { sign: 'taurus', cap: 'Ate their lunch | at *9:04 a.m.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 720, at(t, P, 0.15), 9, 4, 90)
      drawBits(x, LUNCHBOX, LUNCHBOX_C, 790, 1000, 20 * at(t, P, 0.5))
      L(x, 790, 1150, 'LUNCH: GONE', at(t, P, 1.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Talked the whole ride. | *To the driver.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'and THEN…', at(t, P, 0.2, 0.25), { size: 44, tail: 'bl' })
      buddy(x, t, 'capricorn', 810, 960, 200, at(t, P, 0.5), { mood: lt > 1.3 ? 'sleepy' : 'neutral', look: [-1, 0], seed: 51 })
      L(x, 810, 1150, 'MILE 40. STILL GOING.', at(t, P, 1.4), YEL, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Packed snacks | for the *whole class.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BACKPACK, BACKPACK_C, 790, 900, 26 * at(t, P, 0.15), { sx: 1 + 0.12 * Math.sin(t * 6) * clamp(lt - 0.6), sy: 1 })
      const n = Math.floor(clamp((lt - 0.6) / 1) * 6)
      for (let i = 0; i < n; i++) drawBits(x, LUNCHBOX, LUNCHBOX_C, 650 + (i % 3) * 140, 640 + Math.floor(i / 3) * 70, 7, { rot: (i - 2) * 0.1 })
      L(x, 790, 1170, 'SNACKS FOR 30', at(t, P, 1.4), MINT, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Gave the tour. | *Wasn’t the guide.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, FLAG, FLAG_C, F.x + 150, F.cy - 90, 14 * at(t, P, 0.15), { rot: 0.1 })
      bubble(x, 790, 660, 'follow me!', at(t, P, 0.5, 0.25), { size: 44, col: '#ffcf7a', tail: 'bl' })
      buddy(x, t, 'scorpio', 860, 1030, 150, at(t, P, 1.0), { mood: 'squint', look: [-1, 0], seed: 52 })
      L(x, 690, 1150, 'REAL GUIDE: CONFUSED', at(t, P, 1.5), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Permission slip? | *Laminated.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 320, h: 340, head: 'PERMISSION', headCol: '#b6e08a', size: 26, rows: [
        ['signed ✓', INK, at(t, P, 0.4)], ['copied ✓', INK, at(t, P, 0.6)], ['allergies ✓', INK, at(t, P, 0.8)], ['3 copies ✓', INK, at(t, P, 1.0)],
      ] })
      if (lt > 1.1) { x.save(); x.globalAlpha = 0.35 * clamp((lt - 1.1) * 3); x.fillStyle = '#fff'; x.fillRect(640, 700, 40, 340); x.restore() }
      L(x, 790, 1100, 'LAMINATED', at(t, P, 1.3), MINT, -0.05, 36)
    } },
  { sign: 'libra', cap: 'Couldn’t pick a bus buddy. | Picked *everyone.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const ids = ['aries', 'cancer', 'aquarius']
      ids.forEach((id, i) => buddy(x, t, id, 640 + i * 120, 960 - (i % 2) * 40, 130, at(t, P, 0.3 + i * 0.2), { mood: 'happy', look: [-1, 0], seed: 53 + i }))
      L(x, 760, 650, '✦ IT’S A MATCH ×3', at(t, P, 1.3), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Found the | *staff-only* door.', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 790, 880, at(t, P, 0.15), clamp((lt - 0.8) / 0.8) * 0.6)
      L(x, 790, 640, 'STAFF ONLY', at(t, P, 0.3), RED, 0.03, 34, CREAM)
      bubble(x, 790, 1150, 'just looking.', at(t, P, 1.4, 0.25), { size: 36, col: '#d8b8ff', tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Got lost. | *On purpose.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 860, 24 * at(t, P, 0.15), { rot: 0.05 })
      L(x, 790, 640, 'NEW ROUTE!', at(t, P, 0.9), ORANGE, -0.04, 36)
      bubble(x, 790, 1110, 'shortcut!!', at(t, P, 1.4, 0.25), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Took notes for a | *test that doesn’t exist.*', mood: 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 330, h: 360, head: 'NOTES p.31', headCol: SKYB, size: 26, rows: [
        ['dino = old', INK, at(t, P, 0.5)], ['rocks = older', INK, at(t, P, 0.8)], ['gift shop: $$', INK, at(t, P, 1.1)], ['STUDY THIS', RED, at(t, P, 1.4)],
      ] })
      L(x, 790, 1110, 'TEST: NONE', at(t, P, 1.6), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Asked the dinosaur | its *sign.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, DINO, DINO_C, 780, 860, 26 * at(t, P, 0.15))
      bubble(x, 640, 640, 'what’s your sign?', at(t, P, 0.6, 0.25), { size: 36, tail: 'bl' })
      L(x, 790, 1120, 'T-REX: OBVIOUSLY ARIES', at(t, P, 1.4), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cried at the aquarium. | *Happy tears.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      tank(x, t, 800, 840, at(t, P, 0.15))
      L(x, 800, 1060, 'THE FISH WAVED', at(t, P, 1.3), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0437', key: 'E', accent: YEL, ending: 'callback',
  title: 'The signs on | a *field trip.*',
  cameos: CAMEOS,
  group: {
    cap: 'Best trip | *ever.*',
    moods: ['wide', 'sleepy', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) { drawBits(x, BUS, BUS_C, 540, 760, 18 * pop01(t, t - lt + 1.2, 0.35, 2)) },
  },
  last: {
    text: 'Ride home. | Taurus: *“dinner?”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      if (k <= 0.01) return
      const F = buddy(x, t, 'taurus', 440, 1060, 300, k, { mood: 'wide', look: [1, -1], seed: 54, hops: [t - lt + 1.2] })
      drawBits(x, LUNCHBOX, LUNCHBOX_C, 720, 1100, 24 * pop01(t, t - lt + 1.0, 0.3, 2.2))
      label(x, 720, 960, 'EMPTY (9:04)', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
