// r2a0259: star_advice, ADVICE ROLLCALL, "Each sign | with a full heart." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line about what each sign does when its heart is full, one light gag each.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ tells you first · ♉ a full table · ♊ an eleven-minute voice note · ♋ bakes for everyone
//              · ♌ hypes everyone up · ♍ makes you a playlist · ♎ sets up the picnic · ♏ opens the diary
//              · ♐ kitchen dance party · ♑ finally rests · ♒ tells the group chat they're the best · ♓ happy tears
//  49.2        "Full hearts | *overflow.*"
//  52.6        callback: "The last cookie? | *Saved for you.*"  Cancer's tray comes back with one cookie left.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WARM = '#ff8f8f', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#5fd068'

// ── props
const COOKIE = ['.CCCC.', 'CCcCCC', 'CCCCcC', 'CcCCCC', 'CCCcCC', '.CCCC.']
const COOKIE_C = { C: '#e0a050', c: '#5b2e1a' }
const STICKER = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.']
const DIARY = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KPPHHPPPPK', 'KPPHHPPPGK', 'KPPPPPPPGK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const DIARY_C = { K: INK, P: '#b06bff', H: PINK, G: GOLD }
const LAPTOP = ['SSSSSSSSSS', 'SBBBBBBBBS', 'SBBBBBBBBS', 'SBBBBBBBBS', 'SSSSSSSSSS', 'GGGGGGGGGGGG']

// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a voice-note bubble with a waveform and a long time stamp
function voiceNote(x, t, cx, cy, k, time) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -42, 300, 84)
  x.fillStyle = MINT; x.fillRect(-144, -36, 288, 72)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-124, -16); x.lineTo(-100, 0); x.lineTo(-124, 16); x.closePath(); x.fill()
  for (let i = 0; i < 14; i++) { const h = 8 + 18 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-86 + i * 10, -h / 2, 6, h) }
  x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, 136, 0)
  x.restore()
}
// a baking tray with n cookies
function tray(x, cx, cy, k, n, cell = 9) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -90, 340, 180)
  x.fillStyle = '#c9c9d8'; x.fillRect(-162, -82, 324, 164)
  x.restore()
  for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); drawBits(x, COOKIE, COOKIE_C, cx + (-114 + c * 76) * k, cy + (-38 + r * 76) * k, cell * k) }
}
// a little table with plates
function table(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -40, 380, 60); x.fillRect(-170, 20, 20, 120); x.fillRect(150, 20, 20, 120)
  x.fillStyle = '#e8a86a'; x.fillRect(-182, -32, 364, 44)
  const n = Math.min(6, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 6))
  for (let i = 0; i < n; i++) { const px = -150 + i * 60; x.fillStyle = INK; x.beginPath(); x.ellipse(px, -40, 26, 12, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(px, -42, 22, 9, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = ['#e0a050', GREEN, RED][i % 3]; x.fillRect(px - 8, -50, 16, 8) }
  x.restore()
}
// a gingham picnic blanket in perspective with a basket
function picnic(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    const w0 = 60 + r * 8, ox = -c * 0
    x.fillStyle = (r + c) % 2 ? '#ff9ad0' : CREAM
    x.fillRect(-180 - r * 14 + c * (w0), -60 + r * 34, w0, 34)
  }
  x.fillStyle = INK; x.fillRect(40, -130, 120, 80); x.fillStyle = '#c9a070'; x.fillRect(46, -124, 108, 68)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(100, -130, 44, Math.PI, 0); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Happy Aries? | *Tells you first.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: YOU', headCol: '#ff6b6b', lines: [
        ['GUESS WHAT!!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['call me!!', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['you’re FIRST ♡', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
      ] })
    } },
  { sign: 'taurus', cap: 'A full heart | means *a full table.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: -40 }, hops: [1.5],
    front(x, t, lt, P) {
      table(x, 700, 1050, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 660, 'EVERYONE’S INVITED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gemini’s voice note? | *Eleven minutes.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 760, pop01(t, P.t0 + 0.3, 0.3, 2), '11:04')
      voiceNote(x, t, 800, 900, pop01(t, P.t0 + 0.7, 0.3, 2), '8:52')
      label(x, 790, 1060, 'TO: MY MATCH ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Happy Cancer? | *Cookies for everyone.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tray(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(8, Math.floor(clamp((lt - 0.3) / 1.0) * 8)))
      label(x, 790, 1060, 'BATCH 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 690, 'TAKE TWO ♡', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Happy Leo? | *Hypes everyone up.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      ;['virgo', 'aquarius'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        if (k <= 0.01) return
        const F2 = signChar(x, t, id, 700 + i * 170, 1000 - i * 30, 150 * k, { mood: lt > 1.0 + i * 0.2 ? 'heart' : 'happy', look: [-1, 0], seed: 70 + i, glyph: false })
        if (lt > 1.0 + i * 0.25) drawBits(x, STICKER, { Y: GOLD }, F2.x + 40, F2.top - 10, 7)
      })
      bubble(x, 790, 650, 'YOU’RE ALL | AMAZING!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Happy Virgo? | *Makes you a playlist.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P, F) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR YOU ♡', headCol: PINK, lines: [
        ['side A: sunny', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['side B: cozy', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['in order. obv.', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
      ] })
      notes(x, t, F.x, F.top, { n: 4, cell: 6, col: PINK, seed: 3 })
    } },
  { sign: 'libra', cap: 'Happy Libra? | *Plans a picnic.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -80, y: -60, s: 260 }, hops: [1.4],
    back(x, t, lt, P) { picnic(x, 560, 1060, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'MATCHING NAPKINS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 860, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 1 })
    } },
  { sign: 'scorpio', cap: 'Happy Scorpio? | *Opens the diary.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const open = ease.outBack(clamp((lt - 0.7) / 0.5))
      drawBits(x, DIARY, DIARY_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: lerp(1, -1, open) })
      label(x, 800, 1090, 'SECRETS: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.2, 7, 180, 0.5)
    } },
  { sign: 'sagittarius', cap: 'Happy Sag? | *Kitchen dance party.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -100 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    squash: lt => 0.06 * Math.sin(lt * 9),
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 160, F.cy - 40, { n: 5, cell: 7, col: GOLD, seed: 5 })
      label(x, 790, 1080, 'NO MUSIC NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Happy Capricorn? | *Finally rests.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.4, 0.9))
      drawBits(x, LAPTOP, { S: '#c9c9d8', B: '#140c30', G: '#8a8aa0' }, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(1, 0.25, shut) })
      label(x, 800, 680, 'OUT OF OFFICE ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Happy Aquarius? | *Texts the group chat.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: SKYB, lines: [
        ['random thought:', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['you’re the best', PINK, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['♡♡♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: 'pisces', cap: 'Happy Pisces? | *Happy tears.*', mood: 'heart', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -140 },
    front(x, t, lt, P, F) {
      hearts(x, t, F.x + 140, F.cy + 60, P.t0 + 0.4, { n: 8, life: 2.0, spread: 260, cell: 8, seed: 7 })
      label(x, 800, 1080, 'GOOD TEARS ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0259', key: 'E', accent: WARM, ending: 'callback',
  title: 'Each sign | *with a full heart.*',
  cameos: CAMEOS,
  group: { cap: 'Full hearts | *overflow.*' },
  last: {
    text: 'The last cookie? | *Saved for you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.5, 0.4, 2)
      tray(x, 540, 1040, 1.2 * k, 0)
      drawBits(x, COOKIE, COOKIE_C, 540, 1040, 22 * k)
      signChar(x, t, 'cancer', 830, 1280, 200 * pop01(t, t0 + 0.8, 0.35, 2), { mood: lt > 1.5 ? 'heart' : 'happy', look: [-1, -1], seed: 52, glyph: false, hops: [t0 + 1.6] })
      label(x, 540, 1250, 'FOR YOU ♡', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t0 + 1.5, { n: 6, life: 1.8, spread: 320, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
