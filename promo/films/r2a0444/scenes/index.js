// r2a0444: star_advice, ADVICE ROLLCALL, "What drains | *each sign.*" (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs: what quietly drains each one, plus one warm, specific refill. One light gag each. Ending: group.
//   0.0–3.6    hook
//   3.6–49.2   ♈ waiting around (go first) · ♉ being rushed (slow lane) · ♊ the same routine (shake it up)
//              · ♋ feeling unneeded (you are) · ♌ being overlooked (we see you) · ♍ a messy room (tidy one corner)
//              · ♎ tension nearby (step out for air) · ♏ small talk (ask one real question) · ♐ staying in (a short walk counts)
//              · ♑ no plan (rest is a plan) · ♒ trying to fit in (your weird is welcome) · ♓ everyone's feelings (put some down)
//  49.2        "Notice the drain. | *Then recharge.*"  (BATTERY: CHARGING)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4', SAGE = '#9fe0b0', BROWN = '#8a4a2e'

function sheet(x, cx, cy, k, { w = 340, h = 300, head = '', headCol = SAGE, rows = [], rot = 0.04, size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore() })
  x.restore()
}
/** a battery: level 0..1 */
function battery(x, cx, cy, k, lvl, col = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -26, 26, 52)
  x.fillStyle = CREAM; x.fillRect(-120, -54, 240, 108)
  x.fillStyle = lvl < 0.3 ? RED : col; x.fillRect(-112, -46, 224 * clamp(lvl), 92)
  x.restore()
}
const SNAIL = ['....SSSS...', '...SBBBBS..', '..SBSSSBS..', '..SBSBBBS..', '..SBSSSBS.E', 'GGGSBBBSGGE', 'GGGGGGGGGGG']
const SNAIL_C = { S: '#c98f5a', B: '#ffb34a', G: '#9fe0b0', E: '#5fd068' }
const WINDOW = ['KKKKKKKKKKK', 'KBBBBKBBBBK', 'KBBBBKBBBBK', 'KBBBBKBBBBK', 'KKKKKKKKKKK', 'KBBBBKBBBBK', 'KBBBBKBBBBK', 'KBBBBKBBBBK', 'KKKKKKKKKKK']
const SHOE = ['.....SSS..', '....SSSS..', 'SSSSSSSSS.', 'SWSSSSSSSS', 'KKKKKKKKKK']
const SOCK = ['.AAA', '.AAA', '.BBB', '.AAA', '.AAA', 'AAAA', 'AAAA', 'AA..']
const BOX = ['KKKKKKK', 'KPPPPPK', 'KPPHPPK', 'KPHHHPK', 'KPPHPPK', 'KKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Waiting around. | *Go first. It’s okay.*', mood: lt => lt > 1.3 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      battery(x, 790, 820, k, lt < 1.3 ? 0.15 : 0.9)
      label(x, 790, 1020, lt < 1.3 ? 'STILL WAITING…' : 'GO! ✓', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt < 1.3 ? SLATE : MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Being rushed. | *Take the slow lane.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 780 + lt * 10, 960, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 700, 'SLOW LANE: OPEN', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'The same routine. | *Shake it up a little.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sw = lt > 1.3
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'THIS WEEK', headCol: GOLD, h: 340, size: 30, rows: [
        ['mon  same', 1], ['tue  same', pop01(t, P.t0 + 0.4, 0.2, 2)], ['wed  same', pop01(t, P.t0 + 0.6, 0.2, 2)], [sw ? 'thu  NEW CAFE!' : 'thu  same', pop01(t, P.t0 + 0.8, 0.2, 2), sw ? '#2f9a5a' : INK],
      ] })
    } },
  { sign: 'cancer', cap: 'Feeling unneeded. | *You’re so needed.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'can you help | with dinner?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 900, 'we need your | famous soup', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 1.3, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Being overlooked. | *We see you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -110 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const on = lt > 1.1 ? pop01(t, P.t0 + 1.1 * 3.1 / 2.4, 0.3, 2) : 0
      if (on > 0.01) { x.save(); x.globalAlpha = 0.35 * on; const g = x.createLinearGradient(0, 470, 0, 1200); g.addColorStop(0, '#fff6c8'); g.addColorStop(1, 'rgba(255,246,200,0.1)'); x.fillStyle = g; x.beginPath(); x.moveTo(390, 470); x.lineTo(470, 470); x.lineTo(640, 1200); x.lineTo(220, 1200); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 800, 700, lt < 1.1 ? 'SPOTLIGHT: OFF' : 'SPOTLIGHT: ON', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: lt < 1.1 ? SLATE : GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'you were | amazing!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'A messy room. | *Tidy one corner.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -160, 320, 320); x.fillStyle = '#2a2350'; x.fillRect(-152, -152, 304, 304)
        const C = [PINK, GOLD, SKYB, MINT, LAV, '#ff9a4a']
        for (let i = 0; i < 9; i++) { x.save(); x.translate(-90 + (i * 53) % 180, -80 + Math.floor(i / 3) * 70); x.rotate(i * 0.7); x.fillStyle = INK; x.fillRect(-26, -16, 52, 32); x.fillStyle = C[i % 6]; x.fillRect(-22, -12, 44, 24); x.restore() }
        if (lt > 1.1) { x.fillStyle = SAGE; x.fillRect(64, 64, 88, 88); x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✓', 108, 110) }
        x.restore()
      }
      sparkles(x, t, 900, 1010, P.t0 + 1.15 * 3.1 / 2.4, 6, 80, 0.2)
      label(x, 790, 650, 'ONE CORNER = PEACE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Tension nearby. | *Step out for air.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, WINDOW, { K: '#c98f5a', B: lt > 1.0 ? '#bfe8ff' : SLATE }, 790, 880, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (lt > 1.0) for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(640 + ph * 280, 760 + i * 50, 60, 8); x.restore() }
      label(x, 790, 1140, 'FRESH AIR: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Small talk. | *Ask one real question.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'nice weather, huh', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SLATE, tail: 'bl' })
      bubble(x, 790, 900, 'what’s your | rising sign?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'NOW WE’RE TALKING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Staying in too long. | *A short walk counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { S: '#c97bff', W: CREAM, K: INK }, 790 + Math.sin(lt * 5) * 20, 960, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 720, lt < 1.2 ? 'STEPS: 12' : 'STEPS: 2,000 ✓', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt < 1.2 ? SLATE : MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'No plan. | *Rest is a plan too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TODAY', headCol: SLATE, size: 34, rows: [
        ['9:00  ???', 1], [lt > 1.0 ? '9:00  rest ✓' : '', 1, '#2f9a5a'], [lt > 1.4 ? 'all day ✓' : '', 1, '#2f9a5a'],
      ] })
      label(x, 790, 1110, 'SCHEDULED: NAP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Trying to fit in. | *Your weird is welcome.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SOCK, { A: PINK, B: CREAM }, 720, 900, 22 * k, { rot: -0.1 })
      drawBits(x, SOCK, { A: '#5fd068', B: GOLD }, 860, 900, 22 * k, { rot: 0.1, sx: -1 })
      label(x, 790, 1140, 'MISMATCHED. PERFECT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Everyone’s feelings. | *Put some down.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], tears: lt => lt > 1.4 ? 1 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = lt < 1.2 ? 5 : 2
      for (let i = 0; i < n; i++) drawBits(x, BOX, { K: INK, P: [PINK, SKYB, GOLD, LAV, MINT][i], H: CREAM }, 790 + (i % 2 ? 12 : -12), 1100 - i * 96, 20)
      label(x, 790, 660, lt < 1.2 ? 'CARRYING: EVERYONE' : 'CARRYING: LESS ♡', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: lt < 1.2 ? SLATE : PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0444', key: 'E', accent: SAGE, ending: 'group',
  title: 'What drains | *each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Notice the drain. | *Then recharge.*',
    draw(x, t, lt) {
      const t0 = t - lt
      battery(x, 540, 700, pop01(t, t0 + 1.4, 0.35, 2), 0.2 + 0.8 * ease.outCubic(prog(lt, 1.8, 3.6)))
      label(x, 540, 840, 'CHARGING…', pop01(t, t0 + 1.8, 0.3, 2.4), { size: 40, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
