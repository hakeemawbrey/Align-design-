// r2t0239: star_talk, ROLLCALL, "The signs | with a new phone." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs unboxing a new phone, each the most extreme version of themself.
//   0.0–3.6    "The signs | *with a new phone.*"
//   3.6–49.2   ♈ skipped setup, hit "agree" forty times · ♉ fanciest camera, for snack photos · ♊ forty apps before lunch
//              · ♋ moved every photo, all of them · ♌ unboxing on a red carpet · ♍ read the manual, corrected it
//              · ♎ can't pick a wallpaper, day three · ♏ face, fingerprint and a riddle · ♐ cracked it, on a mountain
//              · ♑ spreadsheet comparing fourteen phones · ♒ set it to a language they invented · ♓ said goodbye to the old one
//  49.2        "Twelve new phones. | *Zero cases.*"
//  52.6        callback: "Scorpio’s locked out. | *Forgot the riddle.*"  Scorpio's riddle lock screen comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, handset, sheet, bar, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const ACC = '#8fe3ff'
const ST = { x: -170 }
const LBL = { font: MONO, weight: 700 }
const BURGER = ['..BBBBB..', '.BBWBBWB.', 'GGGGGGGGG', 'MMMMMMMMM', '.BBBBBBB.']
const BURGER_C = { B: '#e8a24a', W: CREAM, G: '#5fd068', M: '#8a4a2e' }
const MTN = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const APPC = [PINK, MINT, SKYB, GOLD, LAV, ORANGE, RED, GREEN]

/** the riddle lock screen (Scorpio's card and the callback) */
function riddle(x, t, cx, cy, k, lt, { w = 270, h = 420 } = {}) {
  handset(x, cx, cy, k, () => {
    x.fillStyle = GREY; x.fillRect(-24, -176, 48, 34); x.strokeStyle = GREY; x.lineWidth = 7; x.beginPath(); x.arc(0, -178, 16, Math.PI, 0); x.stroke()
    txt(x, 'FACE ✓', 0, -105, { size: 32, font: MONO, weight: 700, color: lt > 0.5 ? MINT : GREY })
    txt(x, 'PRINT ✓', 0, -60, { size: 32, font: MONO, weight: 700, color: lt > 0.8 ? MINT : GREY })
    txt(x, 'RIDDLE:', 0, 5, { size: 32, font: MONO, weight: 700, color: GOLD })
    txt(x, 'what’s my', 0, 55, { size: 32, font: MONO, weight: 700, color: BONE }); txt(x, 'rising?', 0, 95, { size: 32, font: MONO, weight: 700, color: BONE })
  }, { w, h })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the setup. | *Hit agree forty times.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const n = Math.floor(lt * 6) % 2
        x.fillStyle = n ? MINT : GREEN; x.fillRect(-90, 40, 180, 64); txt(x, 'AGREE', 0, 72, { size: 32, font: MONO, weight: 700 })
        txt(x, 'terms ' + (1 + Math.floor(clamp(lt / 1.8) * 39)) + '/40', 0, -60, { size: 24, font: MONO, weight: 700, color: BONE })
      })
      label(x, 790, 1110, 'READ: 0 WORDS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, ...LBL })
    } },
  { sign: 'taurus', cap: 'Best camera ever made. | *For snack photos.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.25))
        for (let i = 0; i < n; i++) { const c = i % 2, r = Math.floor(i / 2); x.fillStyle = '#3a2f6a'; x.fillRect(-92 + c * 96, -140 + r * 96, 88, 88); drawBits(x, BURGER, BURGER_C, -48 + c * 96, -96 + r * 96, 8) }
      })
      label(x, 790, 1110, 'ALBUM: LUNCH (812)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: 'gemini', cap: 'Forty apps. | *Before lunch.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const n = Math.min(20, Math.floor(Math.max(0, lt - 0.2) / 0.07))
        for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); x.fillStyle = APPC[(i * 3) % 8]; x.fillRect(-90 + c * 46, -140 + r * 54, 38, 38) }
      })
      label(x, 790, 1110, 'STORAGE: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, ...LBL })
    } },
  { sign: 'cancer', cap: 'Moved every photo. | *Every. Single. One.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bar(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.3) / 1.5), lt > 1.8 ? 'MEMORIES: SAFE ♥' : 'MOVING MEMORIES…', { col: SKYB, w: 330 })
      bubble(x, 790, 660, 'even the blurry ones', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.8, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Unboxed it | *on a red carpet.*', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.1, 0.6)); if (k <= 0) return
      x.save(); x.fillStyle = INK; x.fillRect(150, 1110, 780 * k + 10, 80); x.fillStyle = RED; x.fillRect(156, 1116, 780 * k - 2, 68)
      x.fillStyle = GOLD; x.fillRect(156, 1116, 780 * k - 2, 8); x.fillRect(156, 1176, 780 * k - 2, 8); x.restore()
    },
    front(x, t, lt, P) {
      card(x, 800, 820, 170, 230, pop01(t, P.t0 + 0.5, 0.35, 2), { bg: '#ffffff', rot: 0.05 }, () => { x.fillStyle = INK; x.fillRect(-40, -60, 80, 120); x.fillStyle = SKYB; x.fillRect(-32, -50, 64, 100) })
      label(x, 800, 1020, 'PRESS ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
      sparkles(x, t, 800, 820, P.t0 + 1.0, 8, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Read the manual. | *Then corrected it.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 290, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 'MANUAL', { rot: 0.04, size: 30 }, () => {
        x.strokeStyle = RED; x.lineWidth = 7
        for (let i = 0; i < 4; i++) { const p = prog(lt, 0.6 + i * 0.25, 0.85 + i * 0.25); if (p <= 0) continue; x.beginPath(); x.moveTo(-110, -50 + i * 50); x.lineTo(-110 + 200 * p, -50 + i * 50 + (i % 2 ? 10 : -10)); x.stroke() }
        if (lt > 1.6) txt(x, 'see me.', 50, 140, { size: 34, color: RED })
      })
    } },
  { sign: 'libra', cap: 'Picking a wallpaper. | *Day three.*', mood: lt => lt > 1.5 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const W = [['sunset', ORANGE], ['cat', PINK], ['my chart', LAV], ['sunset 2', SUN]]
      const [s, c] = W[Math.floor(lt * 2.5) % 4]
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => { x.fillStyle = c; x.fillRect(-110, -160, 220, 320); txt(x, s, 0, 0, { size: 34, font: MONO, weight: 700 }) })
      label(x, 790, 1110, 'DAY 3 · UNDECIDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, ...LBL })
    } },
  { sign: 'scorpio', cap: 'Face, fingerprint, | *and a riddle.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { riddle(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'sagittarius', cap: 'Cracked it already. | *On a mountain.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, MTN, { W: CREAM, G: '#7a8bb0' }, 320, 760, 26 * pop01(t, P.t0 + 0.1, 0.35, 2))
      handset(x, 320, 1000, pop01(t, P.t0 + 0.5, 0.35, 2), () => {
        if (lt < 1.0) return
        x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.beginPath(); x.moveTo(-40, -90); x.lineTo(10, -20); x.lineTo(-20, 30); x.lineTo(40, 100); x.moveTo(10, -20); x.lineTo(60, -40); x.stroke()
      }, { w: 140, h: 220, rot: -0.1 })
      label(x, 320, 590, 'WORTH IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: 'capricorn', cap: 'Compared fourteen phones. | *In a spreadsheet.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffffff', rot: 0.03 }, () => {
        x.fillStyle = GREEN; x.fillRect(-160, -180, 320, 44); txt(x, 'PHONES.XLS', 0, -158, { size: 24, font: MONO, weight: 700, color: CREAM })
        x.strokeStyle = '#c9bfae'; x.lineWidth = 2
        for (let r = 0; r < 8; r++) { x.beginPath(); x.moveTo(-160, -120 + r * 38); x.lineTo(160, -120 + r * 38); x.stroke() }
        for (let c = 1; c < 4; c++) { x.beginPath(); x.moveTo(-160 + c * 80, -136); x.lineTo(-160 + c * 80, 180); x.stroke() }
        const hl = Math.floor(clamp(lt / 1.6) * 7); x.fillStyle = 'rgba(255,210,58,0.55)'; x.fillRect(-160, -120 + hl * 38, 320, 38)
      })
      label(x, 790, 1110, 'TABS: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: 'aquarius', cap: 'Set it to a language | *they invented.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        ;['⟟⏃⋔ ⍜⋏', '⌇⟒⏁⏁⟟⋏☌⌇', '⊑⟒⌰⌿'].forEach((s, i) => { x.fillStyle = [MINT, LAV, SKYB][i]; x.fillRect(-90, -120 + i * 80, 180, 56); txt(x, s, 0, -92 + i * 80, { size: 26 }) })
      })
      bubble(x, 790, 1110, 'it’s intuitive!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Said goodbye | to the *old one.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      handset(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), () => { x.strokeStyle = GREY; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, -80); x.lineTo(20, 0); x.lineTo(-10, 60); x.stroke(); txt(x, 'RIP', 0, 120, { size: 30, font: MONO, weight: 700, color: GREY }) }, { w: 180, h: 300, rot: 0 })
      drawBits(x, FLOWER, { P: PINK, Y: SUN, G: GREEN }, 690, 1110, 12 * pop01(t, P.t0 + 0.8, 0.3, 2))
      drawBits(x, FLOWER, { P: LAV, Y: SUN, G: GREEN }, 890, 1110, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 640, 'THANK YOU FOR YOUR SERVICE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 24, bg: LAV, rot: -0.03, ...LBL })
    } },
]

const F = makeFilm({
  id: 'r2t0239', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *with a new phone.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve new phones. | *Zero cases.*' },
  last: {
    text: 'Scorpio’s locked out. | *Forgot the riddle.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 340, 1030, 330 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], seed: 61, hops: [t0 + 1.4] })
      riddle(x, t, 730, 1000, 1.05 * pop01(t, t0 + 0.7, 0.35, 2), 2)
      label(x, 730, 1270, 'ATTEMPTS: 9', pop01(t, t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, ...LBL })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
