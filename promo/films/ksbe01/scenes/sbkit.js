// sbkit — SAY IT BETTER (Month 2 boost, batch m17, ksbe01–ksbe20). Owned by the m17 session; other films import it read-only.
//
// The format: a fight is already mid-scream at frame 0. The bad line sits in a huge spiky shout bubble, the world
// freezes (record scratch), a red pen crosses the line out, THE STARS say why it backfires, the better line writes
// itself into a soft bubble, the other sign actually hears it. Long episodes play the same argument twice
// (ROUND 1 the bad way · REWIND · ROUND 2 the better way · THE VERDICT).
// No end card, no card cut, no logo: the film ends on its last beat (hard cut) or eases back into frame 0 (loop).
//
// ═══════════════════════════════════════ API ═══════════════════════════════════════
//   import { makeFilm } from '../../ksbe01/scenes/sbkit.js'
//   export const { DURATION, SCENES, CUES } = makeFilm(FILM)
// FILM (all times in seconds of *world* time unless noted; the world clock holds during a freeze and runs backwards
// during a rewind, so everything below is pure f(t)):
//   dur, ep                       story length (= DURATION) and episode number (for the bug)
//   room                          'living' | 'kitchen' | 'bedroom' | 'party' | 'cafe' | 'hall' | 'dinner', or [[t, room], …]
//   roomOpts                      { night: 0…1, warm: 0…1 } or a fn(w) → that
//   cast                          { A: { sign: 'aries', seed }, B: {…}, P: { sign: 'pisces' } , … }
//   keys                          { A: [[t, { x, y, s, mood, look, rot, red, steam, tears, alpha, squash, d }], …], … }
//                                 numbers ease from the previous value over d (default 0.32 s); mood/look switch at t.
//   hops                          { A: [t…] } extra hops (bubbles add their own)
//   talk                          [{ who, at, kind: 'bad'|'better'|'say', text, strike, out, x, y, w, tail, size }]
//                                 '*word*' = accent. bad: shout bubble (slams in; strike → red pen; out → crumples away)
//   stars                         [{ t, text }] THE STARS' lines in the dialogue box; box: { open, close } or a list
//   heads                         [{ text, at, out: [a, b], size, accent, top }] big captions (popText). heads[0] is the hook
//                                 (at < 0 so it's fully on screen at frame 0)
//   last                          { at, text, accent }  the last line
//   cam                           [[t, { z, x, y, d, e }]] camera keys (zoom about x, y); whip: frame 0 starts zoomed in
//   shake                         [t…] (or [t, amp]) screen shakes
//   freeze                        [{ at, dur }]  record-scratch freezes (world clock holds, desaturate, ⏸ + scratch)
//   caught                        [{ at, dur, x, y, r, label }]  red "caught" circle (screen coords)
//   rewind                        { at, dur, to }  long films: the world clock scrubs back from `at` to `to`
//   chapters                      [{ at, dur, text, color }]  chapter stickers (screen time)
//   end                           'cut' | 'loop'
//   draw(x, w, K), front(x, w, K), overlay(x, t, w, K)   per-film painters (world behind actors / in front / screen)
//   cues                          extra sound cues;  music handled in cues.js
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK } from '../../sxmail1/scenes/mail.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues, caught, caughtCues, chapter, chapterCues, loopBack, loopCues } from '../../hookkit.js'

export { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, signStar, STAR, drawStarChar }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff3b4f', PEN = '#e8243c', MINT = '#5fe0a8', PINK = '#ff8fb1', SKYB = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const R = Math.round
const r3 = v => +(+v).toFixed(3)
export const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
export const SIGN_NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const tag = sign => `${signStar(sign).glyph}︎ ${SIGN_NAME[sign]}`

// ─────────────────────────────────────────────── rooms (pixel flats, warm lamps, a night window)
const WALL = {
  living: ['#2b1f4f', '#3a2a63'], kitchen: ['#1f3a4f', '#2a4b63'], bedroom: ['#36204f', '#472a66'], party: ['#3d1f4a', '#55275f'],
  cafe: ['#3a2618', '#4c321f'], hall: ['#2a2a4f', '#383866'], dinner: ['#2c1a3a', '#3e2550'],
}
function windowNight(x, t, X, Y, w, h) {
  rect(x, X - 10, Y - 10, w + 20, h + 20, INK); rect(x, X - 4, Y - 4, w + 8, h + 8, '#c9a46a')
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#0d0b2e'); g.addColorStop(1, '#2b2266')
  x.fillStyle = g; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 14; i++) { const sx = X + ((i * 97) % w), sy = Y + ((i * 53) % (h - 20)) + 8, a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); x.globalAlpha = a; rect(x, sx, sy, 4, 4, '#fff6d8'); x.globalAlpha = 1 }
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(X + w * 0.75, Y + h * 0.28, Math.min(w, h) * 0.11, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0d0b2e'; x.beginPath(); x.arc(X + w * 0.75 + 12, Y + h * 0.28 - 6, Math.min(w, h) * 0.1, 0, Math.PI * 2); x.fill()
  rect(x, X + w / 2 - 5, Y, 10, h, '#c9a46a'); rect(x, X, Y + h / 2 - 5, w, 10, '#c9a46a')
}
function lampGlow(x, X, Y, r, a = 0.5, col = '255,206,140') {
  const g = x.createRadialGradient(X, Y, 0, X, Y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(X - r, Y - r, r * 2, r * 2)
}
function floor(x, Y, c1, c2) {
  rect(x, 0, Y, 1080, 1920 - Y, c1)
  for (let i = 0; i < 9; i++) rect(x, 0, Y + 14 + i * 46, 1080, 4, c2)
  rect(x, 0, Y - 8, 1080, 12, INK)
}
export function drawRoom(x, t, room, { night = 1, warm = 0.6 } = {}) {
  const [w1, w2] = WALL[room] || WALL.living
  const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, w1); g.addColorStop(1, w2)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // wallpaper dots
  x.globalAlpha = 0.12; for (let j = 0; j < 30; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2) rect(x, 30 + i * 90, 20 + j * 44, 6, 6, BONE)
  x.globalAlpha = 1
  const FY = 1250
  if (room === 'living') {
    windowNight(x, t, 640, 430, 300, 360)
    lampGlow(x, 170, 640, 420, 0.35 * warm + 0.1)
    // lamp
    rect(x, 120, 560, 110, 80, INK); rect(x, 126, 566, 98, 68, '#ffd98a'); rect(x, 168, 640, 14, 560, INK); rect(x, 140, 1196, 70, 14, INK)
    floor(x, FY, '#4a2f2a', '#3a2420')
    // couch
    rect(x, 120, 1040, 840, 210, INK); rect(x, 128, 1048, 824, 120, '#6a4fb0'); rect(x, 128, 1168, 824, 70, '#5a40a0')
    rect(x, 100, 1100, 70, 150, INK); rect(x, 106, 1106, 58, 138, '#7a5fc0'); rect(x, 910, 1100, 70, 150, INK); rect(x, 916, 1106, 58, 138, '#7a5fc0')
    rect(x, 300, 1060, 140, 70, '#f29a4a'); rect(x, 640, 1060, 140, 70, '#5fd3c0')
    // rug
    rect(x, 180, 1300, 720, 40, '#7a3a5a'); rect(x, 200, 1308, 680, 24, '#9a4a6a')
  } else if (room === 'kitchen') {
    windowNight(x, t, 380, 380, 320, 300)
    lampGlow(x, 540, 300, 520, 0.3 * warm + 0.1, '200,240,255')
    rect(x, 520, 0, 10, 250, INK); rect(x, 470, 250, 110, 40, INK); rect(x, 478, 256, 94, 28, '#ffe9b0')
    floor(x, FY + 40, '#2f4a4f', '#25393d')
    // counter + cabinets + sink + fridge
    rect(x, 0, 1010, 820, 290, INK); rect(x, 0, 1018, 812, 34, '#d9d2c2'); rect(x, 0, 1052, 812, 240, '#3f7a7f')
    for (let i = 0; i < 4; i++) { rect(x, 20 + i * 200, 1072, 180, 200, '#4f8f94'); rect(x, 100 + i * 200, 1160, 20, 8, INK) }
    rect(x, 300, 1000, 220, 26, '#9fb6c0'); rect(x, 395, 930, 14, 76, '#9fb6c0'); rect(x, 395, 930, 60, 14, '#9fb6c0')
    rect(x, 830, 700, 230, 600, INK); rect(x, 838, 708, 214, 584, '#e6eef0'); rect(x, 838, 920, 214, 8, INK); rect(x, 860, 760, 12, 120, '#9fb6c0'); rect(x, 860, 960, 12, 160, '#9fb6c0')
    // cabinets above
    rect(x, 0, 420, 330, 200, INK); rect(x, 8, 428, 314, 184, '#4f8f94'); rect(x, 750, 420, 330, 200, INK); rect(x, 758, 428, 314, 184, '#4f8f94')
  } else if (room === 'bedroom') {
    windowNight(x, t, 120, 420, 300, 340)
    lampGlow(x, 900, 900, 380, 0.35 * warm + 0.1)
    floor(x, FY, '#3a2a4a', '#2e2140')
    // bed
    rect(x, 80, 1000, 920, 260, INK); rect(x, 88, 1008, 904, 90, '#f4e8cc'); rect(x, 88, 1098, 904, 154, '#c95f8a')
    rect(x, 60, 860, 60, 400, INK); rect(x, 66, 866, 48, 388, '#7a4a3a')
    rect(x, 130, 1020, 200, 70, '#ffffff'); rect(x, 130, 1084, 200, 6, '#d9cbb0')
    // nightstand + lamp
    rect(x, 860, 840, 140, 130, INK); rect(x, 866, 846, 128, 118, '#7a4a3a'); rect(x, 890, 760, 80, 70, INK); rect(x, 896, 766, 68, 58, '#ffd98a')
  } else if (room === 'party') {
    lampGlow(x, 540, 500, 700, 0.25 * warm + 0.1, '255,160,220')
    // bunting
    for (let i = 0; i < 12; i++) { const bx = 20 + i * 92, by = 360 + Math.sin(i * 0.5) * 18; x.fillStyle = INK; x.beginPath(); x.moveTo(bx - 4, by - 4); x.lineTo(bx + 76, by - 4); x.lineTo(bx + 36, by + 70); x.fill(); x.fillStyle = ['#ff8fb1', GOLD, '#7fd0f0', '#9fe6b0'][i % 4]; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + 72, by); x.lineTo(bx + 36, by + 62); x.fill() }
    rect(x, 0, 352, 1080, 6, INK)
    // balloons
    for (const [bx, by, c] of [[110, 620, '#ff5f7f'], [190, 560, GOLD], [940, 600, '#7fd0f0'], [860, 540, '#c9a6ff']]) {
      const yy = by + Math.sin(t * 1.4 + bx) * 10
      x.fillStyle = INK; x.beginPath(); x.ellipse(bx, yy, 58, 70, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.ellipse(bx, yy, 52, 64, 0, 0, Math.PI * 2); x.fill()
      rect(x, bx - 14, yy - 40, 14, 18, 'rgba(255,255,255,0.5)'); rect(x, bx - 1, yy + 70, 3, 220, INK)
    }
    floor(x, FY, '#4a2a4a', '#3a203a')
    rect(x, 160, 1150, 760, 30, INK); rect(x, 168, 1156, 744, 18, '#f4e8cc'); rect(x, 200, 1180, 24, 120, INK); rect(x, 856, 1180, 24, 120, INK)
  } else if (room === 'cafe') {
    windowNight(x, t, 90, 380, 360, 380); windowNight(x, t, 630, 380, 360, 380)
    lampGlow(x, 540, 640, 520, 0.45 * warm + 0.1)
    floor(x, FY, '#5a3a24', '#4a2e1c')
    rect(x, 0, 860, 1080, 20, '#7a5030')
    rect(x, 240, 1110, 600, 26, INK); rect(x, 248, 1116, 584, 14, '#c9894a'); rect(x, 520, 1136, 40, 140, INK); rect(x, 460, 1270, 160, 18, INK)
  } else if (room === 'dinner') {
    windowNight(x, t, 380, 360, 320, 320)
    lampGlow(x, 540, 560, 600, 0.45 * warm + 0.1)
    // hanging lamp
    rect(x, 536, 0, 8, 470, INK); rect(x, 470, 470, 140, 50, INK); rect(x, 478, 476, 124, 38, '#ffd98a')
    floor(x, FY, '#3a2440', '#2e1c34')
    rect(x, 140, 1110, 800, 30, INK); rect(x, 148, 1116, 784, 18, '#f4e8cc'); rect(x, 170, 1140, 26, 140, INK); rect(x, 884, 1140, 26, 140, INK)
    // candle
    rect(x, 530, 1060, 20, 52, INK); rect(x, 534, 1064, 12, 44, '#fff3dc'); const fl = Math.sin(t * 13) * 2; rect(x, 534 + fl, 1040, 12, 20, '#ffb347'); rect(x, 537 + fl, 1046, 6, 10, '#fff1c8')
  } else if (room === 'hall') {
    lampGlow(x, 540, 420, 520, 0.3 * warm + 0.1)
    floor(x, FY, '#4a3a2a', '#3a2c20')
    // front door
    rect(x, 620, 560, 330, 690, INK); rect(x, 630, 570, 310, 680, '#a0522d'); rect(x, 660, 600, 250, 280, '#b8653a'); rect(x, 660, 920, 250, 290, '#b8653a'); rect(x, 880, 900, 24, 24, GOLD)
    // little table + mirror
    rect(x, 110, 520, 220, 280, INK); rect(x, 120, 530, 200, 260, '#8fb6d0'); rect(x, 140, 550, 40, 120, 'rgba(255,255,255,0.4)')
    rect(x, 100, 1000, 260, 24, INK); rect(x, 108, 1006, 244, 12, '#7a4a3a'); rect(x, 130, 1024, 18, 226, INK); rect(x, 312, 1024, 18, 226, INK)
  }
  // a soft vignette
  const v = x.createRadialGradient(540, 960, 500, 540, 960, 1250); v.addColorStop(0, 'rgba(5,4,12,0)'); v.addColorStop(1, `rgba(5,4,12,${0.55 * night})`)
  x.fillStyle = v; x.fillRect(0, 0, 1080, 1920)
}

// ─────────────────────────────────────────────── props
/** a talk card (object only): a little tarot-ish card with a question in italic serif */
export function drawTalkCard(x, cx, cy, w, text, { rot = 0, k = 1, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  const h = w * 1.55
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  rect(x, -w / 2 + 14, -h / 2 + 18, w, h, 'rgba(6,4,18,0.45)')
  rect(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK); rect(x, -w / 2, -h / 2, w, h, '#c9a24a'); rect(x, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, '#241a52')
  x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 3; x.strokeRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36)
  // a little sun
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, -h * 0.2, w * 0.12, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; rect(x, Math.cos(a) * w * 0.19 - 3, -h * 0.2 + Math.sin(a) * w * 0.19 - 3, 6, 6, GOLD) }
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  const fs = Math.round(w * 0.105)
  x.font = `italic 600 ${fs}px ${SERIF}`
  const lines = wrap(x, text, w * 0.78)
  lines.forEach((l, i) => x.fillText(l, 0, h * 0.14 + (i - (lines.length - 1) / 2) * fs * 1.12))
  x.font = `700 ${Math.round(w * 0.06)}px ${MONO}`; x.fillStyle = 'rgba(242,199,92,0.8)'; x.fillText('TALK CARD', 0, h * 0.42)
  x.restore()
}
/** a phone (screen-on), simple */
export function drawPhoneSmall(x, cx, cy, s, t, { rot = 0, lines = [], glow = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow) lampGlow(x, 0, 0, 160, 0.25 * glow, '160,200,255')
  rect(x, -58, -104, 116, 208, INK); rect(x, -50, -96, 100, 192, '#2a2266'); rect(x, -44, -86, 88, 168, '#4f8df0')
  lines.forEach((l, i) => { rect(x, -38, -76 + i * 30, l, 20, BONE) })
  x.restore()
}
/** steam puffs from a point (anger) */
export function drawSteam(x, t, cx, cy, k = 1, seed = 1) {
  if (k <= 0) return
  for (let i = 0; i < 6; i++) {
    const ph = ((t * 1.6 + i / 6 + seed * 0.37) % 1)
    const px = cx + (i % 2 ? 1 : -1) * (20 + 60 * ph) + Math.sin(t * 5 + i) * 8, py = cy - 30 - 190 * ph, s = (22 + 40 * ph) * k
    x.save(); x.globalAlpha = (1 - ph) * 0.85 * clamp(k)
    x.fillStyle = '#f4f0ff'; x.beginPath(); x.arc(px, py, s, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(200,190,230,0.8)'; x.beginPath(); x.arc(px + s * 0.3, py + s * 0.2, s * 0.6, 0, Math.PI * 2); x.fill()
    x.restore()
  }
}
/** a pixel heart */
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function drawHeart(x, cx, cy, cell, col = '#ff4f86', alpha = 1) { drawBits(x, HEART, { H: col }, cx, cy, cell, { alpha }) }
/** a score card "2/10" */
export function drawScoreCard(x, cx, cy, w, label, score, col, { k = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  const h = w * 0.9
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  rect(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK); rect(x, -w / 2, -h / 2, w, h, BONE); rect(x, -w / 2, -h / 2, w, h * 0.26, col)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.font = `800 ${Math.round(w * 0.085)}px ${INTER}`; x.fillText(label, 0, -h / 2 + h * 0.13)
  x.font = `900 ${Math.round(w * 0.3)}px ${INTER}`; x.fillText(score, 0, h * 0.12)
  x.restore()
}
export function wrap(x, text, maxW) {
  const words = text.split(' '), lines = []; let cur = ''
  for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr.replace(/\*/g, '')).width > maxW && cur) { lines.push(cur); cur = wd } else cur = tr }
  if (cur) lines.push(cur)
  return lines
}

// ─────────────────────────────────────────────── bubbles
/** draw a line of text with *accent* runs; align centre at cx. returns nothing */
function richLine(x, line, cx, cy, col, acc) {
  const parts = []; let a = false, buf = ''
  for (const ch of line) { if (ch === '*') { parts.push([buf, a]); buf = ''; a = !a; continue } buf += ch }
  parts.push([buf, a])
  const W = parts.reduce((s, [p]) => s + x.measureText(p).width, 0)
  let px = cx - W / 2
  x.textAlign = 'left'
  for (const [p, ac] of parts) { x.fillStyle = ac ? acc : col; x.fillText(p, px, cy); px += x.measureText(p).width }
}
/** spiky shout bubble path */
function spikyPath(x, w, h, seed) {
  const n = 22
  x.beginPath()
  for (let i = 0; i <= n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2, out = i % 2 === 0
    const jag = out ? 1.0 + 0.08 * Math.sin(i * 2.3 + seed) : 0.86
    const px = Math.cos(a) * (w / 2) * jag, py = Math.sin(a) * (h / 2) * jag
    i ? x.lineTo(px, py) : x.moveTo(px, py)
  }
  x.closePath()
}
const layCache = new Map()
function layout(x, text, font, maxW, key) {
  const k = key + '|' + text
  if (layCache.has(k)) return layCache.get(k)
  x.font = font
  const lines = wrap(x, text, maxW)
  const w = Math.max(...lines.map(l => x.measureText(l.replace(/\*/g, '')).width))
  const v = { lines, w }
  layCache.set(k, v); return v
}
/** the BAD line: slams in (scale overshoot + shake), strike = red pen, out = crumples and flies off */
export function drawBad(x, w, B) {
  const { at, text, strike = Infinity, out = Infinity, cx = 540, cy = 700, tail = null, size = 88, maxW = 780, seed = 3 } = B
  if (w < at - 0.001 || w > out + 0.6) return
  const font = `italic 900 ${size}px ${INTER}`
  const L = layout(x, text.toUpperCase(), font, maxW, 'bad' + size)
  const lh = size * 1.02, th = L.lines.length * lh
  const bw = Math.max(520, L.w + 200), bh = th + 190
  const sl = prog(w, at, at + 0.2)
  let sc = sl < 1 ? lerp(1.7, 1, easeOutBack(sl, 2.6)) : 1
  let rot = -0.03 + 0.04 * Math.sin((w - at) * 30) * Math.exp(-(w - at) * 6)
  let ox = 0, oy = 0, alpha = 1
  const op = prog(w, out, out + 0.55)
  if (op > 0) { const e = ease.inCubic(op); sc *= 1 - 0.75 * e; rot += 2.4 * e; ox = 900 * e * (B.flyDir ?? 1); oy = -260 * Math.sin(Math.PI * op) + 300 * e; alpha = 1 - ease.inQuad(prog(op, 0.6, 1)) }
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx + ox, cy + oy); x.rotate(rot); x.scale(sc, sc)
  // tail toward the speaker
  if (tail) { x.fillStyle = INK; x.beginPath(); x.moveTo(-60, bh * 0.3); x.lineTo(tail[0] - cx, tail[1] - cy); x.lineTo(60, bh * 0.36); x.fill(); x.fillStyle = '#fff3b0'; x.beginPath(); x.moveTo(-40, bh * 0.3); x.lineTo((tail[0] - cx) * 0.94, (tail[1] - cy) * 0.94 - 6); x.lineTo(40, bh * 0.33); x.fill() }
  x.fillStyle = INK; spikyPath(x, bw + 30, bh + 30, seed); x.fill()
  x.fillStyle = '#ff5a3c'; spikyPath(x, bw + 8, bh + 8, seed); x.fill()
  x.fillStyle = '#fff3b0'; spikyPath(x, bw - 18, bh - 18, seed); x.fill()
  x.font = font; x.textBaseline = 'middle'
  L.lines.forEach((l, i) => richLine(x, l, 0, (i - (L.lines.length - 1) / 2) * lh + 4, INK, RED))
  // red pen strike: one hard line through each row, then a big scribble ✗
  if (w > strike) {
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round'
    L.lines.forEach((l, i) => {
      x.font = font
      const lw = x.measureText(l.replace(/\*/g, '')).width + 40
      const p = ease.outCubic(prog(w, strike + i * 0.16, strike + i * 0.16 + 0.2))
      if (p <= 0) return
      const yy = (i - (L.lines.length - 1) / 2) * lh + 4
      x.strokeStyle = PEN; x.lineWidth = 18; x.beginPath(); x.moveTo(-lw / 2, yy + 6); x.lineTo(-lw / 2 + lw * p, yy - 6 + 8 * Math.sin(p * 9)); x.stroke()
    })
    const xp = prog(w, strike + L.lines.length * 0.16 + 0.05, strike + L.lines.length * 0.16 + 0.35)
    if (xp > 0) {
      const s = Math.min(bw, bh) * 0.36
      x.globalAlpha *= 0.92; x.strokeStyle = PEN; x.lineWidth = 26
      x.beginPath(); x.moveTo(-s, -s); x.lineTo(-s + 2 * s * ease.outCubic(clamp(xp * 2)), -s + 2 * s * ease.outCubic(clamp(xp * 2))); x.stroke()
      if (xp > 0.5) { const q = ease.outCubic((xp - 0.5) * 2); x.beginPath(); x.moveTo(s, -s); x.lineTo(s - 2 * s * q, -s + 2 * s * q); x.stroke() }
    }
    x.restore()
  }
  x.restore()
}
/** the BETTER line: a soft bone bubble with a mint tag, words write on */
export function drawBetter(x, w, B) {
  const { at, text, out = Infinity, cx = 540, cy = 700, tail = null, size = 54, maxW = 700, wps = 7, label = '✓ SAY IT BETTER' } = B
  if (w < at || w > out + 0.4) return
  const font = `700 ${size}px ${INTER}`
  const L = layout(x, text, font, maxW, 'good' + size)
  const lh = size * 1.22, th = L.lines.length * lh
  const bw = Math.max(560, L.w + 110), bh = th + 110
  const k = easeOutBack(prog(w, at, at + 0.34), 1.8) * (1 - ease.inCubic(prog(w, out, out + 0.35)))
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.012 * Math.sin(w * 1.7))
  if (tail) { x.fillStyle = INK; x.beginPath(); x.moveTo(-50, bh * 0.4); x.lineTo(tail[0] - cx, tail[1] - cy); x.lineTo(40, bh * 0.45); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(-34, bh * 0.4); x.lineTo((tail[0] - cx) * 0.92, (tail[1] - cy) * 0.92 - 6); x.lineTo(24, bh * 0.44); x.fill() }
  const C = 18
  rect(x, -bw / 2 - 8 + C, -bh / 2 - 8, bw + 16 - 2 * C, bh + 16, INK); rect(x, -bw / 2 - 8, -bh / 2 - 8 + C, bw + 16, bh + 16 - 2 * C, INK)
  rect(x, -bw / 2 + C, -bh / 2, bw - 2 * C, bh, BONE); rect(x, -bw / 2, -bh / 2 + C, bw, bh - 2 * C, BONE)
  rect(x, -bw / 2 + C, -bh / 2 + 6, bw - 2 * C, 8, '#ffffff')
  // write-on, word by word
  const words = text.split(' ').length
  const shown = Math.floor((w - at - 0.2) * wps) + 1
  x.font = font; x.textBaseline = 'middle'
  let idx = 0
  L.lines.forEach((l, i) => {
    const ws = l.split(' ')
    const vis = clamp(shown - idx, 0, ws.length); idx += ws.length
    if (vis <= 0) return
    // keep the line centred on its full width so it doesn't slide while writing
    const full = x.measureText(l.replace(/\*/g, '')).width
    const part = ws.slice(0, vis).join(' ')
    // carry accent state across the cut
    const openAcc = (ws.slice(0, vis).join(' ').match(/\*/g) || []).length % 2 === 1
    const txt = openAcc ? part + '*' : part
    const pw = x.measureText(txt.replace(/\*/g, '')).width
    richLine(x, txt, -full / 2 + pw / 2, (i - (L.lines.length - 1) / 2) * lh + 6, INK, '#7a2fd0')
  })
  void words
  // the mint tag
  const tk = easeOutBack(prog(w, at + 0.12, at + 0.42), 2.4)
  if (tk > 0.01) {
    x.save(); x.translate(-bw / 2 + 40, -bh / 2 - 6); x.scale(tk, tk); x.rotate(-0.04)
    x.font = `800 30px ${INTER}`; const tw = x.measureText(label).width + 44
    rect(x, -6, -30, tw + 12, 58, INK); rect(x, 0, -24, tw, 46, MINT)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(label, 22, 0)
    x.restore()
  }
  x.restore()
}
/** small speech: one or two lines near a speaker */
export function drawSay(x, w, B) {
  const { at, text, out = at + 3, cx, cy, size = 40, maxW = 560, col = BONE, acc = '#c0306a', tail = null } = B
  if (w < at || w > out + 0.3) return
  const font = `800 ${size}px ${INTER}`
  const L = layout(x, text, font, maxW, 'say' + size)
  const lh = size * 1.18, bw = L.w + 56, bh = L.lines.length * lh + 34
  const k = easeOutBack(prog(w, at, at + 0.25), 2.4) * (1 - ease.inCubic(prog(w, out, out + 0.25)))
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (tail) { x.fillStyle = INK; x.beginPath(); x.moveTo(-26, bh / 2 - 4); x.lineTo(tail[0] - cx, tail[1] - cy); x.lineTo(20, bh / 2 - 4); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-16, bh / 2 - 8); x.lineTo((tail[0] - cx) * 0.8, (tail[1] - cy) * 0.8 - 4); x.lineTo(10, bh / 2 - 8); x.fill() }
  rect(x, -bw / 2 - 6, -bh / 2, bw + 12, bh, INK); rect(x, -bw / 2, -bh / 2 - 6, bw, bh + 12, INK)
  rect(x, -bw / 2, -bh / 2, bw, bh, col)
  x.font = font; x.textBaseline = 'middle'
  L.lines.forEach((l, i) => richLine(x, l, 0, (i - (L.lines.length - 1) / 2) * lh + 3, INK, acc))
  x.restore()
}

// ─────────────────────────────────────────────── actors
const NUM = ['x', 'y', 's', 'rot', 'red', 'steam', 'alpha', 'squash', 'tears', 'shrink']
function actorState(keys, w) {
  const st = { x: 540, y: 1080, s: 280, rot: 0, red: 0, steam: 0, alpha: 1, squash: 0, tears: 0, shrink: 0, mood: 'neutral', look: undefined }
  const t0 = keys.length ? keys[0][0] : 0
  for (const [t, k] of keys) {
    if (t <= t0) { for (const p of NUM) if (k[p] != null) st[p] = k[p]; if (k.mood) st.mood = k.mood; if ('look' in k) st.look = k.look; continue }
    if (w < t) break
    const d = k.d ?? 0.32, e = (k.e ?? ease.inOutCubic)(prog(w, t, t + d))
    for (const p of NUM) if (k[p] != null) st[p] = lerp(st[p], k[p], e)
    if (k.mood) st.mood = k.mood
    if ('look' in k) st.look = k.look
  }
  return st
}
function drawActor(x, w, sign, st, { hops, seed }) {
  if (st.alpha <= 0.01 || st.s <= 2) return
  const S = signStar(sign)
  x.save(); x.globalAlpha *= clamp(st.alpha)
  x.translate(st.x, st.y); x.rotate(st.rot)
  // anger glow
  if (st.red > 0.01) { const g = x.createRadialGradient(0, 0, 0, 0, 0, st.s * 0.95); g.addColorStop(0, `rgba(255,60,60,${0.55 * st.red})`); g.addColorStop(1, 'rgba(255,60,60,0)'); x.fillStyle = g; x.fillRect(-st.s, -st.s, st.s * 2, st.s * 2) }
  const shake = st.red > 0.3 ? Math.sin(w * 60) * 4 * st.red : 0
  const opts = { color: S.color, glyph: st.s > 130 ? S.glyph : null, mood: st.mood, look: st.look, hops, seed, squash: st.squash, glow: 1 }
  drawStarChar(x, shake, 0, st.s, w, opts)
  const tl = Math.round(st.tears)
  if (tl > 0) { const F = starFrame(shake, 0, st.s, w, opts); inSprite(x, F, () => tearsCells(x, w, tl)) }
  x.restore()
  if (st.steam > 0.01) drawSteam(x, w, st.x, st.y - st.s * 0.5, st.steam, seed)
}

// ─────────────────────────────────────────────── the engine
export function makeFilm(F) {
  const DUR = F.dur, END = F.end || 'cut'
  const talk = F.talk || [], stars = F.stars || [], heads = F.heads || []
  const REW = F.rewind || null
  const BASE = F.base || {}
  /** screen time (already held by the kit's frozen()) → world time (rewinds scrub back) */
  function worldAt(t) {
    if (REW && t >= REW.at && t < REW.at + REW.dur) return lerp(REW.at, REW.to, ease.inOutSine(prog(t, REW.at, REW.at + REW.dur)))
    return t
  }
  const roomAt = w => { if (typeof F.room === 'string') return F.room; let r = F.room[0][1]; for (const [t, rr] of F.room) if (w >= t) r = rr; return r }
  const camAt = w => {
    const st = { z: 1, x: 540, y: 960 }
    let first = true
    for (const [t, k] of F.cam || []) {
      if (first) { Object.assign(st, k); first = false; continue }
      if (w < t) break
      const e = (k.e ?? ease.inOutCubic)(prog(w, t, t + (k.d ?? 0.4)))
      for (const p of ['z', 'x', 'y']) if (k[p] != null) st[p] = lerp(st[p], k[p], e)
    }
    return st
  }
  const hopsFor = who => {
    const hs = [...((F.hops || {})[who] || [])]
    for (const b of talk) if (b.who === who) { hs.push(b.at + 0.02); if (b.kind === 'better') hs.push(b.at + 0.9, b.at + 1.8) }
    return hs.sort((a, b) => a - b)
  }
  const HOPS = Object.fromEntries(Object.keys(F.cast).map(k => [k, hopsFor(k)]))
  const NAR_LINES = stars.map(s => ({ t: s.t, speaker: 'THE STARS', text: s.text }))
  const NAR_HOPS = talkHops(NAR_LINES, 'THE STARS', { cps: 30 })
  const BOXES = Array.isArray(F.box) ? F.box : F.box ? [F.box] : []

  function paintWorld(x, w, K) {
    drawRoom(x, w, roomAt(w), typeof F.roomOpts === 'function' ? F.roomOpts(w) : F.roomOpts || {})
    if (F.draw) F.draw(x, w, K)
    const order = F.order || Object.keys(F.cast)
    for (const who of order) {
      const c = F.cast[who]
      const st = actorState(F.keys[who] || [[0, {}]], w)
      K.st[who] = st
      drawActor(x, w, c.sign, st, { hops: HOPS[who], seed: c.seed ?? (who.charCodeAt(0) % 9) + 1 })
    }
    if (F.front) F.front(x, w, K)
    for (const b of talk) {
      const sp = K.st[b.who]
      const tail = b.tail === false ? null : b.tail || (sp ? [sp.x, sp.y - sp.s * 0.42] : null)
      if (b.kind === 'bad') drawBad(x, w, { ...b, tail })
      else if (b.kind === 'better') drawBetter(x, w, { ...b, tail })
      else drawSay(x, w, { ...b, cx: b.cx ?? (sp ? clamp(sp.x, 300, 780) : 540), cy: b.cy ?? (sp ? sp.y - sp.s * 0.85 : 600), tail })
    }
  }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "900 88px Inter", "italic 900 88px Inter", "700 52px Inter", "800 40px Inter", "italic 500 150px 'EB Garamond'", "italic 600 30px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = heads.map(h => ({ h, p: popText(root, h.text, { top: h.top ?? 230, size: h.size ?? 96, accentSize: h.accentSize ?? Math.round((h.size ?? 96) * 1.36), at: h.at, gap: h.gap ?? 0.07, accentColor: h.accent ?? GOLD, wobble: true, late: h.late ?? 0, lateAt: h.lateAt ?? null, fit: true }) }))
    const last = F.last ? popText(root, F.last.text, { top: F.last.top ?? 230, size: F.last.size ?? 100, accentSize: F.last.accentSize ?? 150, at: F.last.at, gap: 0.08, accentColor: F.last.accent ?? MINT, wobble: true, late: F.last.late ?? 1, lateAt: F.last.at + 0.45, fit: true }) : null
    const boxes = BOXES.map(b => dialogueBox(root, { lines: NAR_LINES.filter(l => l.t >= b.open && l.t < b.close), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: 30 }))
    const ov = layerCanvas(root, { pointerEvents: 'none' }), ox = ov.getContext('2d')
    const bug = buildBug(root, F.ep)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const K = { st: {} }
    return {
      start: 0, end: DUR + 0.01, root,
      update(t) {
        const w = worldAt(t)
        x.save()
        drawSky(x, w, { zoom: 1.4, dim: 0.5 })
        const c = camAt(w), bz = BASE.z ?? 1.15
        x.translate(540, 960); x.scale(c.z * bz, c.z * bz); x.translate(-(c.x + (BASE.x ?? 0)), -(c.y + (BASE.dy ?? -70)))
        paintWorld(x, w, K)
        x.restore()
        for (const b of BOXES) {
          const k = pop01(w, b.open - 0.1, 0.35, 2.2) * outK(w, [b.close - 0.1, b.close + 0.2])
          if (k > 0.01) drawStarChar(x, b.starX ?? 950, b.starY ?? (b.y ?? 1440) - 64, 120, w, { color: STAR.sky, mood: 'happy', hops: NAR_HOPS, pop: k, seed: 2, glow: 1.1 })
        }
        for (const { h, p } of H) p.update(w, h.out ? outK(w, h.out) : 1)
        if (last) last.update(w, 1)
        for (const b of boxes) b.update(w)
        ox.clearRect(0, 0, 1080, 1920)
        if (F.overlay) F.overlay(ox, t, w, K)
        if (REW && t >= REW.at && t < REW.at + REW.dur) rewindFx(ox, t)
        bug.update(t)
        drawGrain(gx, t)
      },
    }
  }

  function rewindFx(x, t) {
    x.save()
    x.globalAlpha = 0.25; for (let y = 0; y < 1920; y += 8) rect(x, 0, y, 1080, 3, '#000')
    x.globalAlpha = 0.6; const band = (t * 900) % 2100 - 100; rect(x, 0, band, 1080, 40, 'rgba(255,255,255,0.35)')
    x.globalAlpha = 0.18; x.fillStyle = '#4060ff'; x.fillRect(0, 0, 1080, 1920)
    x.globalAlpha = 1
    x.font = `700 74px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'
    x.fillText('◀◀ REWIND', 70, 1560 + Math.sin(t * 30) * 3)
    x.restore()
  }

  // ── the kit effects
  const HOOK = { at: -1, top: 236, size: 104, ...F.hook }
  const WHIP = { at: -0.2, len: 0.55, from: 1.5, blur: 10, ...(F.whip || {}) }
  const RECS = (F.freeze || []).map(f => ({ len: 1.4, sat: 0.12, top: 1520, ...f }))
  const SHAKES = (F.shake || []).map(s => (typeof s === 'number' ? { at: s, len: 0.45, amp: 22 } : s))
  const CAUGHT = (F.caught || []).map(c => ({ label: 'CAUGHT IN 4K', ...c }))
  const CHAPS = F.chapters || []
  const KIT = F.kit || []          // [[factory, cuesFn, opts], …]
  const MAIN = frozen(build, RECS)
  const SCENES = [MAIN, whipZoom(WHIP), ...SHAKES.map(screenShake), ...RECS.map(recordScratch), ...CAUGHT.map(caught), ...CHAPS.map(chapter), ...KIT.map(([f, , o]) => f(o)), slamTitle(HOOK)]
  if (END === 'loop') SCENES.push(loopBack([MAIN, whipZoom(WHIP), slamTitle(HOOK)], { duration: DUR }))

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const scribble = (t0, d, gain = 0.02) => Array.from({ length: Math.floor(d / 0.06) }, (_, i) => ['tick', r3(t0 + i * 0.06 + (i % 3) * 0.01), gain])
  const CUES = [...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...SHAKES.flatMap(shakeCues), ...RECS.flatMap(recordScratchCues), ...CAUGHT.flatMap(caughtCues), ...CHAPS.flatMap(chapterCues), ...KIT.flatMap(([, c, o]) => c(o))]
  for (const h of heads) { const n = h.text.split(' ').length; if (h.at >= 0) CUES.push(...wordPops(h.at, Math.min(n, 6), h.gap ?? 0.07, 1, 0.022)) }
  if (F.last) CUES.push(...wordPops(F.last.at, Math.min(F.last.text.split(' ').length, 6), 0.08, 2), ['pop', r3(F.last.at + 0.45), 1174.66, 0.05, 0], ['bell', r3(F.last.at + 0.48), 1567.98, 0.026, 1.2, 0])
  for (const b of talk) {
    if (b.kind === 'bad') {
      if (b.at > 0.05) CUES.push(['boom', r3(b.at), 0.2], ['whoosh', r3(b.at - 0.05), 0.25, 0.04], ['tom', r3(b.at + 0.02), 110, { gain: 0.25, decay: 0.25 }])
      if (b.strike < 1e3) CUES.push(...scribble(b.strike, 0.62), ['pop', r3(b.strike + 0.6), 220, 0.05, 0])
      if (b.out < 1e3) CUES.push(['whoosh', r3(b.out + 0.1), 0.45, 0.05])
    } else if (b.kind === 'better') {
      const n = b.text.split(' ').length, wps = b.wps ?? 7
      CUES.push(['pop', r3(b.at), 880, 0.04, 0], ['glitter', r3(b.at + 0.1), r3(b.at + 0.5)])
      for (let i = 0; i < n; i += 2) CUES.push(['pop', r3(b.at + 0.2 + i / wps), NOTE[(i / 2) % 7] * 1.5, 0.014, ((i / 2) % 2 ? 0.2 : -0.2)])
      CUES.push(['bell', r3(b.at + 0.2 + n / wps + 0.1), 1318.51, 0.022, 0.9, 0])
    } else if (b.at > 0.05) {
      CUES.push(['pop', r3(b.at), 739.99, 0.035, 0.2], ['pop', r3(b.at + 0.07), 987.77, 0.025, 0.2])
    }
  }
  if (NAR_LINES.length) CUES.push(...talkCues(NAR_LINES, { cps: 30 }))
  for (const b of BOXES) CUES.push(['pop', r3(b.open), 739.99, 0.035, 0])
  if (REW) CUES.push(['riser', r3(REW.at), r3(REW.at + REW.dur), 0.05], ...Array.from({ length: Math.floor(REW.dur / 0.09) }, (_, i) => ['tick', r3(REW.at + i * 0.09), 0.02]))
  if (END === 'loop') CUES.push(...loopCues({ duration: DUR }))
  CUES.push(...(F.cues || []))
  return { DURATION: DUR, SCENES, CUES: CUES.filter(c => c[1] >= 0 && c[1] < DUR) }
}

// ── the bug: "SAY IT BETTER" (Inter 800, letter-spaced small caps) with a tiny pen icon
const PEN_ICON = ['......RR', '.....RRR', '....PPR.', '...PPP..', '..PPP...', '.PPP....', 'BPP.....', 'BB......']
function buildBug(root, ep) {
  const box = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 40
  drawBits(ic.getContext('2d'), PEN_ICON, { R: PEN, P: BONE, B: INK }, 20, 20, 4.2)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.22em', color: MINT, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'SAY IT BETTER')
  void ep
  return { update() { box.style.display = 'flex' } }
}
