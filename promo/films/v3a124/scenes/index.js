// v3a124: star_advice, ADVICE ROLL CALL, "What each sign | should hear today." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each, one light visual gag each.
//   0.0–3.6    "What each sign | *should hear today.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries strolls over the finish line: WALKING COUNTS · Taurus tries a new dish: NEW FAVOURITE
//              · Gemini and its reflection wave: BOTH. ALWAYS. · Cancer holds an umbrella over Libra · Leo backstage: STILL
//              LOVED · Virgo sends a wonky paper plane: SENT! · Libra drops the pin: "this one!" · Scorpio, one toe in
//              the pool · Sagittarius plants a flag on a blanket fort · Capricorn clocks out, the block tower holds
//              · Aquarius wins a rosette: FAVOURITE WEIRDO · Pisces' tears water a flower that blooms
//  49.2        "Everyone | *needed that.*"  group photo.
//  52.4        LESSON UNLOCKED: "Be as kind to you | *as you are to them.*"  HEART: HEARD
//  58.3        "Pisces’ flower? | *Still blooming.*"  (the last card, paid off). No match card.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', ACC = '#ffb36b'

// ── props
const BOWL = ['.SSSSSSS.', 'SGSRSGSRS', 'WWWWWWWWW', '.BBBBBBB.', '..BBBBB..', '...BBB...']
const BOWL_C = { S: '#f4eee2', G: '#5fd068', R: '#ff7a5a', W: '#fff4e2', B: SKYB }
const PIN = ['.RRR.', 'RRRRR', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']
const FLAG = ['KGGGG', 'KGGG.', 'KGGGG', 'K....', 'K....', 'K....', 'K....']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', 'G.G..', '.GG.G', '..GG.', '..G..']
const FLOWER_C = { P: PINK, Y: GOLD, G: '#5fd068' }
const BUD = ['..G..', '.G.G.', '..G..']

// a finish-line tape strung between two little posts
function finish(x, t, k, broke) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  for (const px of [620, 940]) { x.fillStyle = INK; x.fillRect(px - 10, 820, 20, 300); x.fillStyle = BONE; x.fillRect(px - 5, 825, 10, 290) }
  x.strokeStyle = RED; x.lineWidth = 12
  if (!broke) { x.beginPath(); x.moveTo(620, 900); x.lineTo(940, 900); x.stroke() }
  else { x.beginPath(); x.moveTo(620, 900); x.quadraticCurveTo(660, 990, 640, 1060); x.moveTo(940, 900); x.quadraticCurveTo(900, 990, 920, 1060); x.stroke() }
  x.restore()
}
// an umbrella (dome + handle)
function umbrella(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 178, Math.PI, 0); x.fill()
  const C = ['#3fb6f0', BONE]
  for (let i = 0; i < 6; i++) { x.fillStyle = C[i % 2]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 168, Math.PI + i * Math.PI / 6, Math.PI + (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.fillStyle = INK; x.fillRect(-6, -4, 12, 230); x.fillRect(-6, 220, 50, 12)
  x.restore()
}
// raindrops falling, except under the umbrella span
function rain(x, t, x0, x1, gapL, gapR, top, bot) {
  x.fillStyle = 'rgba(143,227,255,0.8)'
  for (let i = 0; i < 18; i++) {
    const rx = x0 + ((i * 97) % (x1 - x0)), ph = ((t * 1.3 + i * 0.37) % 1)
    const ry = top + ph * (bot - top)
    if (rx > gapL && rx < gapR && ry > top + 120) continue
    x.fillRect(rx, ry, 5, 22)
  }
}
// a paper plane
function plane(x, cx, cy, k, rot = -0.2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -50); x.lineTo(120, 0); x.lineTo(-110, 60); x.lineTo(-60, 4); x.closePath(); x.fill()
  x.fillStyle = '#f4eee2'; x.beginPath(); x.moveTo(-98, -40); x.lineTo(104, 0); x.lineTo(-98, 48); x.lineTo(-52, 4); x.closePath(); x.fill()
  x.fillStyle = '#c9c0ae'; x.beginPath(); x.moveTo(-52, 4); x.lineTo(104, 0); x.lineTo(-70, 30); x.closePath(); x.fill()
  x.restore()
}
// a map card with a dropped pin
function mapCard(x, t, cx, cy, k, pinK) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = '#d8f0c8'; x.fillRect(-162, -122, 324, 244)
  x.fillStyle = '#f4eee2'; x.fillRect(-162, -30, 324, 24); x.fillRect(-20, -122, 24, 244); x.fillRect(60, 30, 102, 18)
  x.fillStyle = SKYB; x.fillRect(80, -110, 70, 60)
  x.restore()
  drawBits(x, PIN, { R: RED, W: '#fff' }, cx - 40, cy - 40 - (1 - pinK) * 120, 14 * clamp(pinK * 3))
}
// a wobbly block tower
function tower(x, cx, base, k) {
  if (k <= 0.01) return
  const C = [GOLD, '#2fc79a', PINK, SKYB, LAV]
  for (let i = 0; i < 5; i++) {
    const w = 150 - i * 14, y = base - (i + 1) * 70 * k, ox = (i % 2 ? 8 : -6)
    x.fillStyle = INK; x.fillRect(cx - w / 2 + ox - 6, y - 6, w + 12, 70 * k + 6); x.fillStyle = C[i]; x.fillRect(cx - w / 2 + ox, y, w, 70 * k - 6)
  }
}
// a prize rosette
function rosette(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, 40, 50, 170); x.fillRect(10, 40, 50, 170)
  x.fillStyle = '#38c4ec'; x.fillRect(-54, 46, 38, 158); x.fillRect(16, 46, 38, 158)
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; x.fillStyle = INK; x.beginPath(); x.arc(Math.cos(a) * 92, Math.sin(a) * 92, 34, 0, Math.PI * 2); x.fill() }
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; x.fillStyle = i % 2 ? GOLD : '#38c4ec'; x.beginPath(); x.arc(Math.cos(a) * 92, Math.sin(a) * 92, 28, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 82, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('#1', 0, 4)
  x.restore()
}
// a flower pot with a flower that grows (g 0…1)
function pot(x, t, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -10); x.lineTo(90, -10); x.lineTo(66, 130); x.lineTo(-66, 130); x.closePath(); x.fill()
  x.fillStyle = '#d9714a'; x.beginPath(); x.moveTo(-80, 0); x.lineTo(80, 0); x.lineTo(58, 122); x.lineTo(-58, 122); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-100, -30, 200, 36); x.fillStyle = '#e88a5e'; x.fillRect(-94, -24, 188, 24)
  x.restore()
  if (g < 0.5) drawBits(x, BUD, { G: '#5fd068' }, cx, cy - 60, 14 * k * clamp(g * 4))
  else drawBits(x, FLOWER, FLOWER_C, cx, cy - 110 - 40 * (g - 0.5), 26 * k * (0.6 + 0.8 * (g - 0.5)), { rot: Math.sin(t * 2) * 0.05 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'You don’t have to | *win today.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -60 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      finish(x, t, pop01(t, P.t0 + 0.2, 0.3, 1.6), lt > 1.5)
      label(x, 780, 640, 'WALKING COUNTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'New things can be | *delicious.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 780, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt < 1.3) label(x, 780, 760, '…NEW?', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      else label(x, 780, 760, 'NEW FAVOURITE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 780, 900, P.t0 + 1.9, { n: 5, life: 1.3, spread: 180, cell: 6, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Both sides of you | *are lovable.*', mood: 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 1.8)
      if (k > 0.01) {
        x.save(); x.fillStyle = 'rgba(190,235,255,0.14)'; x.fillRect(560, 620, 360, 520); x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(560, 620, 360, 520); x.restore()
        signChar(x, t, 'gemini', 740, 880, 230 * k, { mood: 'wink', look: [-1, 0], seed: 21, glyph: false, alpha: 0.85, hops: [P.t0 + 1.2] })
      }
      label(x, 740, 1180, 'BOTH. ALWAYS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You’re someone’s | *safe place.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    back(x, t, lt, P) { x.save(); x.globalAlpha = clamp(pop01(t, P.t0 + 0.1, 0.3, 1.2)); rain(x, t, 130, 950, 560, 920, 490, 1200); x.restore() },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 770, 980, 190 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, -1], seed: 22, glyph: false, hops: [P.t0 + 1.8] })
      umbrella(x, 740, 760, pop01(t, P.t0 + 0.8, 0.35, 2))
    } },
  { sign: 'leo', cap: 'You’re loved | *off-stage too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -230, 260, 460); x.fillStyle = '#7a4a2e'; x.fillRect(-120, -220, 240, 440)
        x.fillStyle = INK; x.fillRect(-90, -130, 180, 90); x.fillStyle = GOLD; x.fillRect(-84, -124, 168, 78)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BACKSTAGE', 0, -84)
        x.fillStyle = GOLD; x.beginPath(); x.arc(80, 30, 16, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      hearts(x, t, 620, 1080, P.t0 + 1.0, { n: 5, life: 1.8, spread: 120, cell: 7, seed: 5 })
      label(x, 790, 1150, 'STILL ADORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Done is better | *than perfect.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.8, 2.0))
      plane(x, lerp(560, 840, fly), lerp(880, 640, fly) + Math.sin(lt * 8) * 12 * fly, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(-0.1, -0.4, fly) + Math.sin(lt * 10) * 0.1)
      label(x, 780, 1080, 'A BIT WONKY. SENT!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Just pick one. | *We’ll love it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      mapCard(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack ? clamp(prog(lt, 0.8, 1.1)) : prog(lt, 0.8, 1.1))
      bubble(x, 760, 640, 'this one!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      sparkles(x, t, 740, 860, P.t0 + 1.15, 7, 120, 0.2)
    } },
  { sign: 'scorpio', cap: 'Trust a little. | *One toe in.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [0, 1], star: { x: -60, y: -40 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.4)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(120, 1060, 840, 160); x.fillStyle = '#3fb6f0'; x.fillRect(128, 1068, 824, 144)
      x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) x.fillRect(160 + i * 140 + Math.sin(t * 2 + i) * 20, 1100 + (i % 2) * 40, 60, 6)
      x.restore()
    },
    front(x, t, lt, P) {
      if (lt > 1.1) { const r = (lt - 1.1) * 120; x.save(); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 5; x.beginPath(); x.ellipse(480, 1072, 30 + r, 8 + r * 0.25, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 640, 'ONE TOE IN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Home can be | *an adventure.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      if (k > 0.01) {
        x.save(); x.translate(790, 1060); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 60); x.lineTo(0, -190); x.lineTo(200, 60); x.closePath(); x.fill()
        x.fillStyle = '#a35cf0'; x.beginPath(); x.moveTo(-184, 52); x.lineTo(0, -176); x.lineTo(184, 52); x.closePath(); x.fill()
        x.fillStyle = GOLD; for (let i = 0; i < 5; i++) x.fillRect(-120 + i * 56, -10 + (i % 2) * 30, 12, 12)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-50, 52); x.lineTo(0, -40); x.lineTo(50, 52); x.closePath(); x.fill()
        x.restore()
      }
      drawBits(x, FLAG, { K: INK, G: MINT }, 830, 810, 18 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      label(x, 790, 610, 'FORT: EXPLORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Clock out. | *The empire will hold.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      tower(x, 790, 1150, pop01(t, P.t0 + 0.2, 0.4, 1.6))
      label(x, 790, 620, lt > 1.4 ? 'STILL STANDING' : '5:00 PM', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 36, bg: lt > 1.4 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird is | *someone’s favourite.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      rosette(x, t, 790, 800, pop01(t, P.t0 + 0.3, 0.35, 2.2))
      label(x, 790, 1110, 'FAVOURITE WEIRDO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Your tears water | *lovely things.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', tears: 2, look: [1, 1], star: { x: -200, y: -40 }, hops: [1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      // drops fall from the star into the pot
      if (lt < 1.6) for (let i = 0; i < 3; i++) { const ph = (t * 1.4 + i / 3) % 1; x.fillStyle = INK; x.fillRect(lerp(380, 700, ph) - 2, lerp(900, 980, ph) + Math.sin(ph * 3) * -40 - 2, 18, 24); x.fillStyle = SKYB; x.fillRect(lerp(380, 700, ph), lerp(900, 980, ph) + Math.sin(ph * 3) * -40, 14, 20) }
      pot(x, t, 760, 1040, k, ease.outCubic(prog(lt, 0.4, 1.8)))
      label(x, 780, 620, 'IT BLOOMED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a124', key: 'G', accent: ACC, ending: 'lesson',
  title: 'What each sign | should *hear today.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone | *needed that.*' },
  lesson: { text: 'Be as kind to you | *as you are to them.*', chip: 'HEART: HEARD' },
  last: { text: 'Pisces’ flower? | *Still blooming.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
