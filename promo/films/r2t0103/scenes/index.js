// r2t0103: THE SIGNS AS… v3, BELIKE, "Your ex texts? | Zodiacs be like." (~64 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js. Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Your ex texts? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), pushed to the extreme:
//              ♈ blocked, unblocked, blocked · ♉ left on read since 2019 · ♊ screenshotted it to fourteen group chats
//              · ♋ re-read old texts until 4 a.m. · ♌ replied with a glow-up photo · ♍ pros and cons list: all cons
//              · ♎ asked everyone's opinion, including the barista · ♏ knew they'd text: it's in their chart
//              · ♐ replied "who?" from a mountain · ♑ sent an invoice for emotional damages · ♒ genuinely forgot who they were
//              · ♓ wrote them a poem, then cried
//  49.2        "Moved on? | *Debatable.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "You outgrew them. | *That's growth.*"  STATUS: HEALED
//  58.3        "New match. | *Staying unblocked.*" over the match card: Aries + Libra (the block button and the opinion poll, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
function phone(x, cx, cy, k, fn, { rot = 0.05, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  if (fn) fn(x)
  x.restore()
}
function msg(x, text, y, { col = '#3d3470', ink = BONE, left = true, size = 28 } = {}) {
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 30
  const px = left ? -96 : 96 - w
  x.fillStyle = col; x.fillRect(px, y - size / 2 - 10, w, size + 20)
  x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, px + 15, y + 1)
}
function paper(x, cx, cy, k, w, h, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x); x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
function mountain(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 200); x.lineTo(0, -180); x.lineTo(250, 200); x.closePath(); x.fill()
  x.fillStyle = '#7a86a8'; x.beginPath(); x.moveTo(-232, 192); x.lineTo(0, -164); x.lineTo(232, 192); x.closePath(); x.fill()
  x.fillStyle = '#f4f8ff'; x.beginPath(); x.moveTo(-70, -60); x.lineTo(0, -164); x.lineTo(70, -60); x.lineTo(30, -40); x.lineTo(0, -70); x.lineTo(-30, -40); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-4, -250, 8, 90); x.fillStyle = RED; x.fillRect(4, -250, 60, 36)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Blocked. Unblocked. | *Blocked again.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const on = Math.floor(Math.max(0, lt - 0.3) * 2.5) % 2 === 0
      label(x, 790, 860, on ? 'BLOCKED' : 'UNBLOCKED', pop01(t, P.t0 + 0.3, 0.3, 2.4) * (1 + 0.04 * Math.sin(t * 20)), { size: 54, bg: on ? RED : MINT, color: on ? BONE : INK, rot: on ? -0.06 : 0.05 })
      label(x, 790, 1060, `ROUND ${1 + Math.floor(Math.max(0, lt - 0.3) * 2.5)}`, pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Left on read. | *Since 2019.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => { msg(x, 'hey', -90); msg(x, 'hey??', -30); msg(x, 'hello?', 30); x.fillStyle = '#9aa5c4'; x.font = `700 20px ${MONO}`; x.textAlign = 'right'; x.fillText('seen 2019', 96, 90) }, { s: 0.95 })
      label(x, 790, 1150, 'STILL ON READ', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Screenshotted it | to *fourteen group chats.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.28))
      ;['THE GIRLS', 'WORK CHAT', 'COUSINS', 'BOOK CLUB', 'GYM BUDS'].forEach((s, i) => { if (i < n) label(x, 790 + (i % 2 ? 30 : -30), 640 + i * 105, `✦ ${s}: SENT`, 1, { size: 32, bg: [MINT, SKYB, GOLD, PINK, LAV][i], rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }) })
      label(x, 790, 1170, '+9 MORE', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03 })
    } },
  { sign: 'cancer', cap: 'Re-read old texts. | *Until 4 a.m.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.save(); x.beginPath(); x.rect(-108, -158, 216, 316); x.clip()
        const off = (lt * 120) % 120
        for (let i = -1; i < 4; i++) msg(x, ['miss u', 'lol same', 'good night', 'u up?'][(i + 4) % 4], -120 + i * 60 + off, { left: i % 2 === 0, col: i % 2 ? SKYB : '#3d3470', ink: i % 2 ? INK : BONE })
        x.restore()
      }, { s: 0.95 })
      label(x, 790, 640, '4:00 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Replied with | *a glow-up photo.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => { x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(0, -10, 80, 0, 7); x.fill(); x.fillStyle = INK; x.fillRect(-30, -30, 14, 14); x.fillRect(16, -30, 14, 14); x.fillRect(-20, 10, 40, 8); drawBits(x, ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY'], { Y: GOLD, R: RED, B: SKYB }, 0, -110, 8) }, { s: 0.95 })
      sparkles(x, t, 790, 880, P.t0 + 0.9, 8, 220, 0.2)
      label(x, 790, 1150, 'NO CAPTION NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Pros and cons list. | *All cons.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 360, 380, 0.04, x => {
        x.font = `800 30px ${INTER}`; x.fillText('PROS', -90, -150); x.fillText('CONS', 90, -150); x.fillRect(-2, -170, 4, 330)
        const n = Math.floor(clamp((lt - 0.3) / 1.4) * 8)
        x.fillStyle = RED; for (let i = 0; i < n; i++) x.fillRect(30, -105 + i * 34, 120, 14)
      })
      label(x, 790, 1130, 'PROS: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked everyone’s opinion. | *Even the barista.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'should I reply?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      ;[['gemini', 680, 0.6], ['taurus', 820, 0.9]].forEach(([id, cx, d], i) => { const k = pop01(t, P.t0 + d, 0.35, 2); if (k > 0.01) signChar(x, t, id, cx, 980, 150 * k, { mood: 'neutral', look: [-1, 0], seed: 21 + i, glyph: false }) })
      label(x, 780, 820, 'THE BARISTA: NO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#ff8fb1', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew they’d text. | *It’s in their chart.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1040, 'PREDICTED: TUESDAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Replied “who?” | *from a mountain.*', mood: 'sparkle', star: { x: 170, y: -40, s: 260 }, hops: [0.6],
    back(x, t, lt, P) { mountain(x, 330, 960, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      bubble(x, 700, 600, 'who?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, tail: 'bc' })
      label(x, 330, 1150, 'SIGNAL: 1 BAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sent an invoice. | *Emotional damages.*', mood: lt => lt < 1.0 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      paper(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 360, 400, -0.04, x => {
        x.font = `800 36px ${INTER}`; x.fillText('INVOICE', 0, -150)
        x.font = `700 22px ${MONO}`; x.textAlign = 'left'
        const L = ['3 yrs of drama', 'my good hoodie', 'that playlist', 'late fees']
        L.forEach((l, i) => { if (lt > 0.4 + i * 0.25) { x.fillText(l, -150, -80 + i * 50); x.textAlign = 'right'; x.fillText('$$$', 150, -80 + i * 50); x.textAlign = 'left' } })
        x.fillRect(-150, 125, 300, 4)
      })
      label(x, 320, 1110, 'DUE: TODAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Genuinely forgot | *who they were.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => { x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('UNKNOWN', 0, -120); msg(x, 'hey it’s me', -40) }, { s: 0.95 })
      bubble(x, 800, 640, 'me who?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 1150, 'CONTACT: ???', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Wrote them a poem. | *Then cried.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 320, 420, 0.06, x => {
        x.font = `italic 600 34px Georgia, serif`; x.fillText('Ode to', 0, -150); x.fillText('“hey”', 0, -105)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(-120, -50 + i * 38, 240 - (i % 3) * 40, 10)
      })
      label(x, 790, 1150, 'PAGE 1 OF 30', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0103', key: 'G', accent: PINK, ending: 'card',
  title: 'Your ex texts? | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Moved on? | *Debatable.*' },
  lesson: { text: 'You outgrew them. | *That’s growth.*', chip: 'STATUS: HEALED' },
  last: { text: 'New match. | *Staying unblocked.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
