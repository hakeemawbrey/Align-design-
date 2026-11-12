// v3t030: THE SIGNS AS… v3, "The signs taking | a power nap." (~54 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs taking | a *power nap.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one power nap per sign (3.8 s each), pushed to the extreme:
//              ♈ twenty-minute nap, done in four · ♉ wakes up only for snacks · ♊ talked in their sleep, a whole podcast
//              · ♋ woke up homesick, at home · ♌ napped in a sunbeam like a cat · ♍ ironed the pillowcase first
//              · ♎ couch or bed? nap time's over · ♏ napped with one eye open · ♐ woke up in another time zone
//              · ♑ sent two emails mid-nap · ♒ napped upside down, for research · ♓ dreamed their match ghosted, sobbed
//  49.2        the ending is the group beat: "Power nap? | *Nobody woke up.*" (the twelve asleep in the group photo, z's rising).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const SANDWICH = pad(['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.'])
const IRON = pad(['....KKKK...', '...K....K..', '.SSSSSSSSS.', 'SSSSSSSSSSS', 'SSSSSSSSSS.', 'WWWWWWWW...'])
const PILLOW = pad(['.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.'])
const COUCH = pad(['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PLLLLLLLLLLP', 'PPPPPPPPPPPP', 'K..........K'])
const BED = pad(['B...........', 'BWWW........', 'BWWWSSSSSSSS', 'BBBBBBBBBBBB', 'B..........B'])
const ZZ = (x, t, cx, cy, n = 3, col = BONE) => {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.6 + i / n) % 1)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = col; x.font = `800 ${30 + 20 * ph}px ${INTER}`; x.textAlign = 'center'
    x.fillText('z', cx + Math.sin(ph * 5 + i) * 30 + ph * 60, cy - ph * 160); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Twenty-minute nap. | *Done in four.*', mood: lt => lt < 0.9 ? 'sleepy' : 'sparkle', star: { x: -160 }, hops: [1.0, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const s = Math.min(240, Math.floor(lt * 280))
      label(x, 790, 800, `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 990, 'NAP: SPEEDRUN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05 })
      bubble(x, 560, 610, 'I’M UP!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Deep asleep. | *Woke up for snacks.*', mood: lt => lt < 1.0 ? 'sleepy' : 'heart', star: { x: -160 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a24a', G: '#5fd068', R: RED, Y: GOLD }, 790, 940, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 760, '*crinkle*', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'INSTANTLY AWAKE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Talked in their sleep. | *A whole podcast.*', mood: 'sleepy', star: { x: -160 },
    front(x, t, lt, P) {
      const L = ['welcome back…', 'today: sharks…', 'and my cat…', 'like + subscribe…']
      bubble(x, 790, 760, L[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 980, 'EPISODE 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Woke up homesick. | *At home.*', mood: lt => lt < 0.9 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -20); x.lineTo(0, -170); x.lineTo(170, -20); x.closePath(); x.fill()
        x.fillStyle = RED; x.beginPath(); x.moveTo(-150, -26); x.lineTo(0, -152); x.lineTo(150, -26); x.closePath(); x.fill()
        x.fillStyle = INK; x.fillRect(-130, -30, 260, 200); x.fillStyle = '#ffe7a8'; x.fillRect(-122, -22, 244, 184)
        x.fillStyle = '#8a4a2e'; x.fillRect(-30, 60, 60, 102); x.fillStyle = SKYB; x.fillRect(-100, 10, 50, 50); x.fillRect(50, 10, 50, 50)
        x.restore()
      }
      label(x, 790, 1130, 'YOU ARE HERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      bubble(x, 560, 610, 'miss home…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Napped in a sunbeam. | *Like a cat.*', mood: 'sleepy', star: { x: -150, y: 40 },
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.1, 0.5))
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(700, 480); x.lineTo(900, 480); x.lineTo(560, 1200); x.lineTo(160, 1200); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P, F) {
      ZZ(x, t, F.x + 60, F.top, 3, GOLD)
      label(x, 790, 1000, 'SUNBEAM: CLAIMED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Ironed the pillowcase. | *Then napped.*', mood: lt => lt < 1.3 ? 'squint' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PILLOW, { W: '#fff4e2' }, 760, 1010, 24 * k)
      if (lt < 1.3) drawBits(x, IRON, { K: INK, S: '#c9c9d8', W: '#6fc3ff' }, 670 + 180 * (0.5 + 0.5 * Math.sin(t * 6)), 925, 20 * k)
      label(x, 790, 760, 'CREASES: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couch or bed? | *Nap time’s over.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: -70 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, COUCH, { P: PINK, L: '#ffc2d4', K: INK }, 290, 1090, 22 * k)
      drawBits(x, BED, { B: '#8a4a2e', W: '#fff4e2', S: SKYB }, 790, 1090, 22 * k)
      label(x, 540, 640, lt > 1.6 ? 'TIME’S UP' : 'DECIDING…', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: lt > 1.6 ? RED : GOLD, color: lt > 1.6 ? '#fff4e2' : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Napped. | *One eye open.*', mood: lt => Math.floor(lt * 1.5) % 2 ? 'wink' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      ZZ(x, t, F.x + 40, F.top, 2, LAV)
      label(x, 790, 820, 'WATCHING: ALL', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'I saw that.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Napped on a plane. | *New time zone.*', mood: lt => lt < 1.0 ? 'sleepy' : 'sparkle', star: { x: 150 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(330, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-110, -140, 220, 280, 90); x.fill()
        x.fillStyle = '#9aa5c4'; x.beginPath(); x.roundRect(-100, -130, 200, 260, 84); x.fill()
        x.fillStyle = lt > 1.0 ? '#6fc3ff' : '#1b1236'; x.beginPath(); x.roundRect(-80, -110, 160, 220, 70); x.fill()
        x.fillStyle = '#fff4e2'; x.fillRect(-60, lt > 1.0 ? 20 : -40, 50, 20); x.fillRect(10, lt > 1.0 ? 50 : -10, 60, 20)
        x.restore()
      }
      label(x, 330, 1060, lt > 1.0 ? 'LOCAL TIME: ???' : 'ZZZ', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Power nap. | *Sent two emails.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -120, 320, 210); x.fillStyle = '#2a2350'; x.fillRect(-150, -110, 300, 190)
        x.fillStyle = '#140c30'; x.fillRect(-136, -96, 272, 162)
        x.fillStyle = INK; x.fillRect(-190, 90, 380, 24); x.fillStyle = '#9aa5c4'; x.fillRect(-184, 94, 368, 16)
        const n = lt > 1.4 ? 2 : lt > 0.7 ? 1 : 0
        x.fillStyle = MINT; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(`SENT: ${n}`, 0, -40); x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('(while asleep)', 0, 10)
        x.restore()
      }
      label(x, 790, 680, 'OUT OF OFFICE: NO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Napped upside down. | *For research.*', mood: 'sleepy', star: { x: -170, y: -20 }, hideStar: true,
    back(x, t, lt, P) {
      // a bar the star hangs from
      x.save(); x.fillStyle = INK; x.fillRect(200, 700, 340, 22); x.fillStyle = '#9aa5c4'; x.fillRect(204, 704, 332, 14); x.restore()
      const k = pop01(t, P.t0 + 0.05, 0.45, 1.8)
      x.save(); x.translate(370, 860); x.rotate(Math.PI); signChar(x, t, 'aquarius', 0, 0, 300, { mood: 'sleepy', seed: 14, pop: k }); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 820, 'HYPOTHESIS: COMFY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, 'RESULT: COMFY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dreamed their match | *ghosted.* Sobbed.', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 760, '✦ seen 2:04', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'it was a | DREAM?!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t030', key: 'G', accent: LAV, ending: 'group',
  title: 'The signs taking | a *power nap.*',
  cameos: CAMEOS,
  group: {
    cap: 'Power nap? | *Nobody woke up.*',
    moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      if (lt < 1.4) return
      for (let i = 0; i < 6; i++) ZZ(x, t + i * 0.37, 140 + i * 160, 1000, 2, i % 2 ? LAV : BONE)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
