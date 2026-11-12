// r2t0238: star_talk, SOLO, "Capricorns vs. | relaxing." (~50 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): Capricorn trying (and failing) to relax, every card the
// most extreme version.
//   0.0–3.6    "Capricorns vs. | *relaxing.*"
//   3.6–37.8   nine cards (3.8 s each): day off in 15-minute blocks · beach trip with a whiteboard · meditation with a calm
//              target · bubble bath in a tie · hammock, six calls · spa day, negotiated a group rate · game night, wrote
//              rulebook v2 · watched a sunset, gave it feedback · finally relaxed, for eleven seconds
//  37.8        "Rest? | *Maybe in 2031.*"
//  41.0        LESSON UNLOCKED: "Rest isn’t slacking. | *It’s part of the plan.*"  STATUS: RECHARGED
//  46.9        "Nap scheduled. | *Nap attended.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, sheet, handset, sun, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const S = 'capricorn', ACC = '#8fe3ff'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }

const TIE = ['.RR.', 'RRRR', '.RR.', '.RR.', 'RRRR', 'RRRR', '.RR.']
const TUB = ['W..............', 'WW.............', '.WBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'WWWWWWWWWWWWWWW', '.WWWWWWWWWWWWW.', '..K.........K..']
const UMB = ['....RRRRR....', '..RRWWRRWWR..', '.RWWRRWWRRWW.', 'RRRRRRRRRRRRR', '......K......', '......K......', '......K......', '......K......', '......K......']

/** pixel tie on the star's chest */
function tie(x, F) { drawBits(x, TIE, { R: RED }, F.x, F.cy + F.S * 0.29, F.cell * 1.3) }

const CAMEOS = [
  { sign: S, cap: 'Day off. | In *15-minute blocks.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'DAY OFF', 0, -168, { size: 28, font: MONO, weight: 700, color: RED })
        const B = [['2:00 nap', LAV], ['2:15 hobby', MINT], ['2:30 fun', GOLD], ['2:45 review fun', PINK], ['3:00 nap 2', LAV]]
        B.forEach(([s, c], i) => { if (lt < 0.3 + i * 0.22) return; x.fillStyle = c; x.fillRect(-130, -130 + i * 62, 260, 52); txt(x, s, 0, -104 + i * 62, { size: 24, font: MONO, weight: 700 }) })
      })
    } },
  { sign: S, cap: 'Beach trip. | *Brought a whiteboard.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, UMB, { R: PINK, W: CREAM, K: INK }, 330, 700, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 840, 300, 230, pop01(t, P.t0 + 0.4, 0.35, 2), { bg: '#ffffff', rot: -0.03 }, () => {
        txt(x, 'Q3 GOALS', 0, -70, { size: 34, font: MONO, weight: 700, color: '#3f6fd0' })
        txt(x, '1. relax ✓?', -110, 0, { size: 26, font: MONO, weight: 700, align: 'left' }); txt(x, '2. relax more', -110, 50, { size: 26, font: MONO, weight: 700, align: 'left' })
      })
      label(x, 790, 1060, 'SAND: IGNORED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SUN, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Tried meditating. | *Set a calm target.*', mood: lt => lt > 1.4 ? 'squint' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 820, 300, 210, k, { bg: '#2a2350', rot: 0.03 }, () => {
        txt(x, 'CALM', 0, -60, { size: 30, font: MONO, weight: 700, color: BONE })
        x.fillStyle = DEEP; x.fillRect(-120, -20, 240, 50); x.fillStyle = MINT; x.fillRect(-120, -20, 240 * 0.4 * clamp(lt / 1.4), 50)
        x.fillStyle = RED; x.fillRect(110, -34, 8, 78); txt(x, 'TARGET', 80, 60, { size: 22, font: MONO, weight: 700, color: RED })
      })
      label(x, 790, 1060, 'BEHIND ON ZEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Bubble bath. | *Wearing a tie.*', mood: 'neutral', look: [1, 0], star: { x: -60, y: 20 },
    back(x, t, lt, P) {
      x.fillStyle = '#ffffff'; for (let i = 0; i < 8; i++) { const ph = (t * 0.5 + i * 0.13) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * clamp(lt - 0.3); x.beginPath(); x.arc(330 + (i * 61) % 380, 860 - ph * 260, 14 + (i % 3) * 7, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
    },
    front(x, t, lt, P, F) {
      tie(x, F)
      drawBits(x, TUB, { W: CREAM, B: SKYB, K: INK }, 480, 1120, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 640, 'BUSINESS CASUAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Hammock time. | *Took six calls.*', mood: lt => lt > 1.0 ? 'squint' : 'sleepy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2); if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(170, 880); x.quadraticCurveTo(360, 1200, 550, 880); x.stroke()
      x.strokeStyle = WOOD; x.lineWidth = 8; x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      handset(x, 820, 860, pop01(t, P.t0 + 0.4, 0.35, 2), () => {
        x.fillStyle = GREEN; x.beginPath(); x.arc(0, 40, 46, 0, Math.PI * 2); x.fill()
        txt(x, `CALL ${Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.5) / 0.3))}`, 0, -60, { size: 30, font: MONO, weight: 700, color: BONE })
      }, { w: 200, h: 320, rot: 0.1 * Math.sin(t * 24) })
      label(x, 820, 1110, 'RELAXING (ON HOLD)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Spa day. | *Negotiated a group rate.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(F.x + d * F.S * 0.15, F.cy - F.S * 0.02, 30 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9be27a'; x.beginPath(); x.arc(F.x + d * F.S * 0.15, F.cy - F.S * 0.02, 25 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9f7c8'; x.beginPath(); x.arc(F.x + d * F.S * 0.15, F.cy - F.S * 0.02, 13 * k, 0, Math.PI * 2); x.fill() }
      bubble(x, 790, 720, 'what if we | brought 12 people?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 940, 'GROUP RATE: SECURED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Game night. | *Rewrote the rulebook.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 290, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 'RULES v2', { rot: 0.04, size: 30 }, () => {
        txt(x, '40 pages', 0, 20, { size: 34, font: MONO, weight: 700, color: RED })
        txt(x, '(+ appendix)', 0, 70, { size: 24, font: MONO, weight: 700 })
      })
      bubble(x, 790, 600, 'turn 1 starts | after the quiz', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Watched a sunset. | *Gave it feedback.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, -1], star: ST,
    back(x, t, lt, P) { sun(x, t, 790, 1040 + 60 * prog(lt, 0, 2.4), 90, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 700, 290, 170, pop01(t, P.t0 + 0.8, 0.3, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'FEEDBACK', 0, -48, { size: 26, font: MONO, weight: 700, color: RED })
        txt(x, 'more orange.', 0, 0, { size: 28 }); txt(x, 'start on time.', 0, 44, { size: 28 })
      })
    } },
  { sign: S, cap: 'Finally relaxed. | *For eleven seconds.*', mood: lt => lt > 1.6 ? 'wide' : 'sleepy', star: ST, hops: [1.65],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const s = Math.min(11, Math.floor(clamp((lt - 0.3) / 1.3) * 11))
      card(x, 790, 820, 260, 160, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => txt(x, `0:${String(s).padStart(2, '0')}`, 0, 4, { size: 72, font: MONO, weight: 700, color: s >= 11 ? RED : MINT }))
      bubble(x, 790, 1020, 'okay, back to work', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0238', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Capricorns vs. | *relaxing.*',
  cameos: CAMEOS,
  group: { cap: 'Rest? | *Maybe in 2031.*', mood: 'neutral' },
  lesson: { text: 'Rest isn’t slacking. | *It’s part of the plan.*', chip: 'STATUS: RECHARGED' },
  last: { text: 'Nap scheduled. | *Nap attended.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
