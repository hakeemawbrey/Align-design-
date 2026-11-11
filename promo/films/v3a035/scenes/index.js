// v3a035: star_advice, ADVICE ROLL CALL, "How each sign | should apologise." (~63 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific "here's your best sorry" line each, one light gag per card.
//   0.0–3.6    "How each sign | *should apologise.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries: fast is great, mean it too (stopwatch) · Taurus: bring a snack, then say it (a donut box)
//              · Gemini: one sorry, not twelve texts · Cancer: say it out loud, not with lasagna
//              · Leo: skip the speech (a mic, NO SPEECH TODAY) · Virgo: a sorry, not a three-point plan (PLAN: HUG)
//              · Libra: not "we both", say "me" (a tipped scale) · Scorpio: say it now, not next year (an hourglass)
//              · Sagittarius: sorry first, jokes later · Capricorn: not a memo, say it in person (RE: SORRY)
//              · Aquarius: feelings, not a theory (chalkboard) · Pisces (crying): listen first, cry later
//  49.2        "Short. Warm. | *Really meant.*"  the twelve group photo
//  52.4        LESSON UNLOCKED: "Mean it. | *Then hug.*"  BOND: RESTORED
//  58.3        "Twelve texts? | *One was enough.*" over the match card: Gemini + Libra (Gemini's twelve texts, paid off)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', CREAM = '#fff4e2', CHALK = '#2f5a45'

function stopwatch(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-26, -170, 52, 40); x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.fillRect(-20, -164, 40, 28)
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 126, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 104 - 5, Math.sin(a) * 104 - 5, 10, 10) }
  x.save(); x.rotate(lt * 9); x.fillStyle = RED; x.fillRect(-5, -100, 10, 104); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
function donutBox(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -60, 360, 160)
  x.fillStyle = '#ffd1dc'; x.fillRect(-172, -52, 344, 144)
  for (let i = 0; i < 3; i++) {
    const dx = -110 + i * 110
    x.fillStyle = INK; x.beginPath(); x.arc(dx, 10, 48, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d9a066'; x.beginPath(); x.arc(dx, 10, 42, 0, Math.PI * 2); x.fill()
    x.fillStyle = [PINK, '#8a4a2e', LAV][i]; x.beginPath(); x.arc(dx, 6, 36, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd1dc'; x.beginPath(); x.arc(dx, 8, 13, 0, Math.PI * 2); x.fill()
  }
  x.save(); x.translate(0, -60); x.rotate(-1.2 * open); x.fillStyle = INK; x.fillRect(-180, -150, 360, 154); x.fillStyle = '#ff9ccf'; x.fillRect(-172, -142, 344, 138)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SORRY', 0, -76)
  x.restore()
  x.restore()
}
function phoneStack(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -200, 248, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -190, 228, 380)
  x.fillStyle = '#140c30'; x.fillRect(-102, -170, 204, 340)
  x.save(); x.beginPath(); x.rect(-102, -170, 204, 340); x.clip()
  const msgs = ['sorry', 'SORRY', 'so sorry', 'ok wait', 'sorryyy', 'u there?', 'sorry!!', 'also…', 'SORRY', 'one more', 'sorry', 'ok bye']
  for (let i = 0; i < n; i++) { const y = 140 - (n - 1 - i) * 40; x.fillStyle = i % 2 ? GOLD : SKYB; x.fillRect(i % 2 ? -40 : -92, y - 16, 132, 32); x.fillStyle = INK; x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(msgs[i % 12], i % 2 ? 26 : -26, y) }
  x.restore()
  x.restore()
}
function lasagna(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -70, 380, 150); x.fillRect(-220, -50, 40, 30); x.fillRect(180, -50, 40, 30)
  x.fillStyle = '#dfe7f2'; x.fillRect(-182, -62, 364, 134)
  const L = ['#f5c35a', RED, '#fff4e2', RED, '#f5c35a']
  L.forEach((c, i) => { x.fillStyle = c; x.fillRect(-170, -56 + i * 24, 340, 22) })
  x.restore()
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.6; x.fillStyle = '#fff'; x.fillRect(cx + (-60 + i * 60) * k + 10 * Math.sin(ph * 8), cy - (100 + ph * 140) * k, 10 * k, 30 * k); x.restore() }
}
function mic(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -40, 28, 260); x.fillRect(-70, 210, 140, 24)
  x.fillStyle = '#9a9ab0'; x.fillRect(-8, -34, 16, 248)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -90, 66, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d9'; x.beginPath(); x.arc(0, -90, 58, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9a9ab0'; for (let i = -2; i <= 2; i++) x.fillRect(i * 20 - 3, -140, 6, 100)
  x.restore()
}
function clipboard(x, cx, cy, k, lines, struck) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = WOOD; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = CREAM; x.fillRect(-124, -150, 248, 316)
  x.fillStyle = INK; x.fillRect(-60, -204, 120, 40); x.fillStyle = '#9a9ab0'; x.fillRect(-52, -198, 104, 28)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.fillText(l, -104, -100 + i * 64); if (struck > i) { x.fillStyle = RED; x.fillRect(-110, -102 + i * 64, 220, 6); x.fillStyle = INK } })
  x.restore()
}
function scale(x, cx, cy, k, ang) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 290); x.fillRect(-84, 144, 168, 16)
  x.translate(0, -140)
  x.save(); x.rotate(ang); x.fillStyle = INK; x.fillRect(-184, -12, 368, 24); x.fillStyle = GOLD; x.fillRect(-178, -6, 356, 12); x.restore()
  for (const s of [-1, 1]) {
    const px = s * 170 * Math.cos(ang), py = s * 170 * Math.sin(ang)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 56, py + 110); x.moveTo(px, py); x.lineTo(px + 56, py + 110); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, py + 114, 72, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(px, py + 112, 66, 15, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s < 0 ? 'ME' : 'YOU', px, py + 76)
  }
  x.restore()
}
function hourglass(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const flow = clamp(lt / 2.0)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 30); x.fillRect(-120, 160, 240, 30)
  x.fillStyle = WOOD; x.fillRect(-114, -184, 228, 18); x.fillRect(-114, 166, 228, 18)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -160); x.lineTo(96, -160); x.lineTo(14, 0); x.lineTo(96, 160); x.lineTo(-96, 160); x.lineTo(-14, 0); x.closePath(); x.fill()
  x.fillStyle = '#cfe9ff'; x.beginPath(); x.moveTo(-84, -152); x.lineTo(84, -152); x.lineTo(8, 0); x.lineTo(84, 152); x.lineTo(-84, 152); x.lineTo(-8, 0); x.closePath(); x.fill()
  x.fillStyle = GOLD
  const top = lerp(0, 120, flow); x.beginPath(); x.moveTo(-84 + top * 0.6, -152 + top); x.lineTo(84 - top * 0.6, -152 + top); x.lineTo(8, 0); x.lineTo(-8, 0); x.closePath(); x.fill()
  x.fillRect(-3, 0, 6, 150)
  const pile = lerp(10, 110, flow); x.beginPath(); x.moveTo(-84, 152); x.lineTo(84, 152); x.lineTo(0, 152 - pile); x.closePath(); x.fill()
  x.restore()
}
function envelope(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = CREAM; x.fillRect(-162, -102, 324, 204)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-162, -102); x.lineTo(0, 10); x.lineTo(162, -102); x.stroke()
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RE: SORRY', 0, 60)
  x.restore()
}
function chalkboard(x, cx, cy, k, erase) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -150, 400, 290); x.fillStyle = WOOD; x.fillRect(-192, -142, 384, 274)
  x.fillStyle = CHALK; x.fillRect(-176, -126, 352, 242)
  x.fillStyle = '#eaf3ea'; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.globalAlpha = 1 - erase
  x.fillText('oops × Δmood', 0, -70); x.fillText('÷ my logic', 0, -20); x.fillText('= ???', 0, 30)
  x.globalAlpha = erase; x.font = `800 48px ${INTER}`; x.fillText('i’m sorry.', 0, 0)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fast is great. | *Mean it too.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      stopwatch(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'SORRY, 0.4 SECONDS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bring a snack. | *Then say it.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      donutBox(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, ease.inOutCubic(prog(lt, 0.8, 1.2)))
      label(x, 790, 650, 'APOLOGY: DELICIOUS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One sorry. | *Not twelve texts.*', mood: lt => lt > 1.6 ? 'wink' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phoneStack(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(12, Math.floor(lt * 7)))
      label(x, 790, 1120, '12 NEW MESSAGES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Say it out loud, | *not with lasagna.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      lasagna(x, t, 790, 990, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 790, 650, '(OKAY, BOTH)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Skip the speech. | *Just say sorry.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      mic(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lerp(0, 0.9, ease.inOutCubic(prog(lt, 1.0, 1.4))))
      label(x, 790, 1130, 'NO SPEECH TODAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A sorry, | *not a three-point plan.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      clipboard(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ['1. analysis', '2. causes', '3. plan', 'just: HUG'], Math.floor(clamp((lt - 0.8) / 0.6) * 3))
    } },
  { sign: 'libra', cap: 'Not “we both did.” | *Say “I did.”*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scale(x, 740, 920, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), lerp(0, 0.25, ease.outBack ? ease.inOutCubic(prog(lt, 0.9, 1.3)) : 0))
      label(x, 790, 1150, 'OWNED IT. CUTE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Say it now, | *not next year.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      hourglass(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'TODAY, PLEASE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sorry first. | *Jokes later.*', mood: lt => lt > 1.3 ? 'happy' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'so… funny | story—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.0) { const k = pop01(t, P.t0 + 1.0, 0.3, 2.4); x.save(); x.globalAlpha = clamp(k); x.strokeStyle = RED; x.lineWidth = 14; x.beginPath(); x.moveTo(620, 610); x.lineTo(900, 790); x.stroke(); x.restore() }
      bubble(x, 790, 960, 'I’m sorry.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Not a memo. | *Say it in person.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const away = ease.inCubic(prog(lt, 1.0, 1.4))
      envelope(x, lerp(790, 1150, away), lerp(880, 700, away), pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - away), away * 0.8)
      label(x, 790, 1100, 'FACE TO FACE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 760, 900, P.t0 + 1.4, { n: 4, life: 1.0, spread: 120, cell: 7, seed: 4 })
    } },
  { sign: 'aquarius', cap: 'Feelings, | *not a theory.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      chalkboard(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, ease.inOutCubic(prog(lt, 1.0, 1.4)))
      label(x, 790, 1130, 'SOLVED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Listen first. | *Cry after.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, tears: lt => lt > 1.4 ? 3 : 1,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 960, 170 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 820, 700, 'you hurt | my feelings', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 32, tail: 'br' })
      if (lt >= 1.3) bubble(x, 820, 700, 'you’re right. | I’m sorry.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
      label(x, 600, 1150, 'LISTENED. THEN SOBBED.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a035', key: 'C', accent: MINT, ending: 'card',
  title: 'How each sign | *should apologise.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'Short. Warm. | *Really meant.*', moods: ['heart', 'happy', 'wink', 'happy', 'sparkle', 'heart', 'happy', 'wink', 'happy', 'sparkle', 'heart', 'sparkle'] },
  lesson: { text: 'Mean it. | *Then hug.*', chip: 'BOND: RESTORED' },
  last: { text: 'Twelve texts? | *One was enough.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
