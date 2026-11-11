// v3t104: THE SIGNS AS… v3, "The signs | at the beach." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself on a beach day. Ending: group.
//   aries swam before parking · taurus napped six hours · gemini made nine friends at the snack bar · cancer built a
//   sandcastle and moved in · leo posed for an hour, never swam · virgo reapplies every eleven minutes · libra took
//   ninety minutes to pick a spot · scorpio wore black · sagittarius befriended a seagull, lost lunch · capricorn
//   negotiated the umbrella · aquarius' metal detector found one spoon · pisces adopted a lonely shell (sobbing)
//  49.2 "Sandy. Sunburnt. | *Thriving.*" (the group beat is the ending; a beach ball bounces over the photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', SAND = '#f5d9a0', SEA = '#3aa0d8', ORANGE = '#ffb34a'

const WAVE = ['..WW......WW......', '.WSSW....WSSW....W', 'WSSSSWWWWSSSSWWWWS', 'SSSSSSSSSSSSSSSSSS']
const WAVE_C = { W: '#fff4e2', S: SEA }
const SUN = ['..Y.Y.Y..', '.YYYYYYY.', 'YYYYYYYYY', '.YYYYYYY.', 'YYYYYYYYY', '.YYYYYYY.', '..Y.Y.Y..']
const CASTLE = [
  'S.S...S.S...S.S',
  'SSS...SSS...SSS',
  'SSS.R.SSS...SSS',
  'SSSSRSSSSSSSSSS',
  'SSSSSSSSSSSSSSS',
  'SSSSSSKKKSSSSSS',
  'SSSSSKKKKKSSSSS',
  'SSSSSKKKKKSSSSS',
]
const CASTLE_C = { S: SAND, R: RED, K: '#6b3a22' }
const CAMERA = [
  '...KKK......',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGRK',
  'KGGGWWWGGGGK',
  'KGGWLLLWGGGK',
  'KGGWLLLWGGGK',
  'KGGGWWWGGGGK',
  'KKKKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#c9c9d8', W: '#8a8aa0', L: SKYB, R: RED }
const BOTTLE = ['.KK.', '.KK.', 'OOOO', 'OWWO', 'OWWO', 'OOOO', 'OOOO', 'OOOO']
const BOTTLE_C = { K: '#2a2350', O: ORANGE, W: '#fff4e2' }
const UMB = [
  '....RRRRR....',
  '..RRWWRRWWR..',
  '.RRWWRRWWRRR.',
  'RRWWRRWWRRWWR',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
]
const UMB_C = { R: RED, W: '#fff4e2', K: BROWN }
const GULL = [
  'WW.......WW',
  '.WW.....WW.',
  '..WWWWWWW..',
  '...WWKWWWY.',
  '....WWWW...',
]
const SANDWICH = ['BBBBBB', 'GGGGGG', 'RRRRRR', 'BBBBBB']
const SANDWICH_C = { B: '#f0c27a', G: '#5fd068', R: RED }
const SPOON = ['.SSS.', 'SSSSS', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..']
const SHELL = [
  '....PPP....',
  '..PPWPWPP..',
  '.PWPPWPPWP.',
  'PPWPPWPPWPP',
  'PWPPPWPPPWP',
  '.PPPPPPPPP.',
  '...PPPPP...',
]
const SHELL_C = { P: '#ffc2d4', W: '#fff4e2' }
const BALL = ['..RRWW..', '.RRRWWW.', 'RRRRWWWY', 'BBBBYYYY', 'BBBBYYYY', '.BBBYYY.', '..BBYY..']
const BALL_C = { R: RED, W: '#fff4e2', Y: GOLD, B: SEA }

function beach(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k) * 0.9
  x.fillStyle = SEA; x.fillRect(110, 980, 860, 90)
  x.fillStyle = SAND; x.fillRect(110, 1070, 860, 150)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran into the sea. | Car *still running.*', mood: 'wide', star: { x: -150 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      drawBits(x, WAVE, WAVE_C, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'ENGINE: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 790, 'DOOR: OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t swim. | *Napped* six hours.', mood: 'sleepy', star: { x: -150, y: 40 },
    back(x, t, lt, P) { beach(x, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: '#ffd23a' }, 800, 640, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      const h = Math.min(6, 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 6))
      label(x, 800, 860, `NAP: ${h}H`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Went for snacks. | Made *nine friends.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const C = ['aries', 'leo', 'libra', 'aquarius', 'virgo', 'cancer', 'taurus', 'scorpio', 'capricorn']
      for (let i = 0; i < 9; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2)
        if (k > 0.01) signChar(x, t, C[i], 680 + (i % 3) * 110, 680 + Math.floor(i / 3) * 130, 90 * k, { mood: i % 2 ? 'happy' : 'sparkle', seed: 40 + i, glyph: false, glow: 0.6 })
      }
      label(x, 790, 1120, 'FRIENDS: 9 · SNACKS: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Built a sandcastle. | *Moved in.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: 120, y: 30, s: 200 }, hops: [1.4],
    back(x, t, lt, P) { drawBits(x, CASTLE, CASTLE_C, 640, 960, 34 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 610, 'HOME SWEET HOME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
      label(x, 760, 1150, 'WELCOME MAT ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Posed for an hour. | *Never swam.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      const n = 1 + Math.floor(clamp(lt / 2.2) * 213)
      label(x, 800, 650, `TAKE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      if (Math.floor(t * 3) % 3 === 0 && lt > 0.5) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff'; x.fillRect(120, 470, 840, 760); x.restore() }
      bubble(x, 800, 1090, 'one more', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Reapplies sunscreen | every *eleven minutes.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, BOTTLE_C, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 800, 640, 'TIMER: 10:59', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1120, 'SPF 100 · LAYER 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked a spot. | *Ninety minutes* later.', mood: lt => Math.floor(lt * 1.6) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const sx = [700, 880, 760, 820][Math.min(3, Math.floor(lt / 0.55))]
      drawBits(x, UMB, UMB_C, sx, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'OPTION 37 OF 37', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Wore all black. | *To the beach.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', star: { x: -180 },
    front(x, t, lt, P, F) {
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = '#140c1e'; x.fillRect(F.x - 80, F.cy - 10, 160, 40); x.fillStyle = INK; x.fillRect(F.x - 84, F.cy - 14, 168, 6); x.restore()
      drawBits(x, SUN, { Y: '#ffd23a' }, 800, 700, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      label(x, 800, 920, '34°C', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 48, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'it’s a vibe', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Befriended a seagull. | It *took lunch.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 1.3, 2.1))
      const gx = lerp(780, 880, go), gy = lerp(820, 600, go)
      drawBits(x, GULL, { W: '#fff4e2', K: INK, Y: ORANGE }, gx, gy + Math.sin(t * 8) * 6, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SANDWICH, SANDWICH_C, lt > 1.3 ? gx + 10 : 560, lt > 1.3 ? gy + 50 : 980, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 760, 640, 'new bestie!', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (lt < 1.4 ? 1 : 0), { size: 36, tail: 'bl' })
      label(x, 790, 1110, 'LUNCH: GONE', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Rented an umbrella. | *Negotiated.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, UMB, { ...UMB_C, R: MINT }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 620, '$20/DAY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.1) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(700, 640); x.lineTo(900, 600); x.stroke(); x.restore() }
      label(x, 800, 1110, 'NOW $4 + SHADE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Brought a metal detector. | Found *a spoon.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -180 }, hops: [1.5],
    back(x, t, lt, P) { beach(x, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P, F) {
      const sw = Math.sin(t * 3) * 40
      x.save(); x.globalAlpha = clamp(P.k); x.strokeStyle = '#c9c9d8'; x.lineWidth = 10; x.beginPath(); x.moveTo(F.x + 90, F.cy); x.lineTo(700 + sw, 1100); x.stroke()
      x.fillStyle = '#c9c9d8'; x.beginPath(); x.ellipse(700 + sw, 1110, 60, 18, 0, 0, Math.PI * 2); x.fill(); x.restore()
      if (lt > 1.2) { drawBits(x, SPOON, { S: '#d8dbe8' }, 840, 900 - 40 * ease.outBack(prog(lt, 1.2, 1.6)), 14, { rot: 0.4 }); sparkles(x, t, 840, 880, P.t0 + 1.25 * 1.29, 6, 90, 0.2) }
      label(x, 800, 650, 'TREASURE!!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Found a lonely shell. | *Adopted it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 3 : 2, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHELL, SHELL_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 650, 'NAME: SHELLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t104', key: 'F', accent: SKYB, ending: 'group',
  title: 'The signs | *at the beach.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'ALIGNED' },
  group: {
    cap: 'Sandy. Sunburnt. | *Thriving.*',
    draw(x, t, lt) {
      if (lt < 0.8) return
      const p = ((lt - 0.8) * 0.45) % 1
      drawBits(x, BALL, BALL_C, lerp(160, 920, p), 760 - Math.abs(Math.sin(p * Math.PI * 3)) * 140, 12, { rot: lt * 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
