// r2t0556: star_talk, ROLLCALL, "The signs vs. | a fitted sheet." (signs3kit social cut, music: lofi · C).
// Twelve signs vs. the one chore nobody has ever won, each pushed to the extreme. Ending: group (the sheet wins).
//   ♈ four seconds, then a drawer · ♉ wrapped up in it, nap · ♊ six tutorials, folded zero · ♋ rocks it like a newborn
//   · ♌ wears it as a cape · ♍ perfect square, labelled · ♎ made the group chat vote · ♏ stared it down, it surrendered
//   · ♐ turned it into a tent · ♑ timed it, personal best · ♒ invented a new shape · ♓ got lost inside it, still crying
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, phone, zzz, confetti, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }
const SHEET = '#f4efe6', SHADE = '#d9cfe8', ELASTIC = '#ff8fb1'

/** a fitted sheet: a soft wobbly cloth with pink elastic corners. crumple 0 = flat-ish, 1 = a ball */
function fsheet(x, t, cx, cy, w, h, k, { rot = 0, crumple = 0, seed = 0, col = SHEET } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = lerp(w, h * 0.9, crumple) / 2, H = h / 2, n = 18
  const pt = (a, r) => [Math.cos(a) * r, Math.sin(a) * r]
  x.beginPath()
  for (let i = 0; i <= 4 * n; i++) {
    const u = i / (4 * n), a = u * Math.PI * 2
    const sq = Math.pow(Math.abs(Math.cos(a)), 0.4) * Math.sign(Math.cos(a)), sy = Math.pow(Math.abs(Math.sin(a)), 0.4) * Math.sign(Math.sin(a))
    const wob = 1 + (0.05 + 0.12 * crumple) * Math.sin(a * 5 + seed + t * 2.2) + 0.04 * Math.sin(a * 9 + seed * 2)
    const px = lerp(sq * W, pt(a, W)[0], crumple) * wob, py = lerp(sy * H, pt(a, H)[1], crumple) * wob
    i ? x.lineTo(px, py) : x.moveTo(px, py)
  }
  x.closePath()
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.save(); x.translate(10, 14); x.fill(); x.restore()
  x.lineWidth = 10; x.strokeStyle = INK; x.stroke(); x.fillStyle = col; x.fill()
  // folds / creases
  x.strokeStyle = SHADE; x.lineWidth = 6; x.lineCap = 'round'
  for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-W * 0.6 + i * W * 0.35, -H * 0.5 + 10 * Math.sin(i + seed)); x.quadraticCurveTo(-W * 0.4 + i * W * 0.35, 0, -W * 0.55 + i * W * 0.33, H * 0.5); x.stroke() }
  // elastic corners
  x.strokeStyle = ELASTIC; x.lineWidth = 9
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    x.beginPath(); x.arc(sx * W * 0.82, sy * H * 0.78, Math.min(W, H) * 0.24, 0, Math.PI * 2); x.stroke()
  }
  x.restore()
}
// a dresser drawer the sheet gets stuffed into
function drawer(x, cx, cy, k, open = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -110, 320, 230); x.fillStyle = WOOD; x.fillRect(-150, -100, 300, 210)
  x.fillStyle = '#6b3a22'; x.fillRect(-150, -100 + 105, 300, 6)
  const dy = -24 * open
  x.fillStyle = INK; x.fillRect(-140, 10 + dy - 8, 280, 96); x.fillStyle = '#b5703d'; x.fillRect(-132, 10 + dy, 264, 82)
  x.fillStyle = GOLD; x.fillRect(-24, 44 + dy, 48, 12)
  x.restore()
}
// a camping tent made of a sheet
function tent(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.beginPath(); x.moveTo(-190, 150); x.lineTo(10, -150); x.lineTo(210, 150); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 140); x.lineTo(0, -170); x.lineTo(200, 140); x.closePath(); x.fill()
  x.fillStyle = SHEET; x.beginPath(); x.moveTo(-184, 130); x.lineTo(0, -150); x.lineTo(184, 130); x.closePath(); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(-50, 130); x.lineTo(0, 10); x.lineTo(50, 130); x.closePath(); x.fill()
  x.strokeStyle = ELASTIC; x.lineWidth = 8; x.beginPath(); x.arc(-170, 128, 22, Math.PI, 0); x.stroke(); x.beginPath(); x.arc(170, 128, 22, Math.PI, 0); x.stroke()
  x.fillStyle = WOOD; x.fillRect(-6, -200, 12, 50); x.fillStyle = MINT; x.fillRect(6, -200, 46, 28)
  x.restore()
}
// a stopwatch
function stopwatch(x, t, cx, cy, k, running) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, -150, 36, 30); x.fillStyle = STEEL; x.fillRect(-12, -146, 24, 22)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
  x.fillStyle = STEEL; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 84 - 4, Math.sin(a) * 84 - 4, 8, 8) }
  const a = running ? t * 5 : 1.1
  x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a - Math.PI / 2) * 76, Math.sin(a - Math.PI / 2) * 76); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a white flag on a stick
function flag(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -190, 20, 330); x.fillStyle = WOOD; x.fillRect(-5, -186, 10, 322)
  x.beginPath(); x.moveTo(6, -186)
  for (let i = 0; i <= 12; i++) x.lineTo(6 + i * 18, -186 + 10 * Math.sin(i * 0.8 - t * 6))
  for (let i = 12; i >= 0; i--) x.lineTo(6 + i * 18, -60 + 10 * Math.sin(i * 0.8 - t * 6))
  x.closePath(); x.lineWidth = 8; x.strokeStyle = INK; x.stroke(); x.fillStyle = SHEET; x.fill()
  x.strokeStyle = ELASTIC; x.lineWidth = 7; x.beginPath(); x.arc(200, -170 + 10 * Math.sin(12 * 0.8 - t * 6), 18, 0, Math.PI * 2); x.stroke()
  x.restore()
}
// a cape behind the star
function cape(x, t, F, k) {
  if (k <= 0.01) return
  const cx = F.x, top = F.cy - 40, sw = Math.sin(t * 4) * 30
  x.save(); x.globalAlpha *= clamp(k)
  x.beginPath(); x.moveTo(cx - 90, top); x.lineTo(cx + 90, top)
  x.quadraticCurveTo(cx + 200 + sw, top + 160, cx + 150 + sw, top + 300)
  for (let i = 0; i <= 8; i++) x.lineTo(cx + 150 + sw - i * 40 - sw * i / 8 * 0.5, top + 300 + (i % 2 ? 22 : 0))
  x.quadraticCurveTo(cx - 200, top + 160, cx - 90, top); x.closePath()
  x.lineWidth = 10; x.strokeStyle = INK; x.stroke(); x.fillStyle = SHEET; x.fill()
  x.strokeStyle = ELASTIC; x.lineWidth = 8; x.beginPath(); x.arc(cx + 120 + sw * 0.8, top + 270, 24, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(cx - 150 + sw * 0.4, top + 270, 24, 0, Math.PI * 2); x.stroke()
  x.restore()
}
// a weird abstract folded shape (Aquarius' invention)
function weird(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.6); x.scale(k, k)
  const pts = 7, R = 130
  x.beginPath()
  for (let i = 0; i < pts * 2; i++) { const a = i / (pts * 2) * Math.PI * 2, r = i % 2 ? R * 0.45 : R * (0.85 + 0.15 * Math.sin(i * 1.7)); i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
  x.closePath(); x.lineWidth = 10; x.strokeStyle = INK; x.stroke(); x.fillStyle = SHEET; x.fill()
  x.strokeStyle = ELASTIC; x.lineWidth = 8; for (let i = 0; i < pts; i += 2) { const a = i / pts * Math.PI * 2; x.beginPath(); x.arc(Math.cos(a) * R * 0.7, Math.sin(a) * R * 0.7, 16, 0, Math.PI * 2); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Gave it four seconds. | Then *a drawer.*', mood: lt => lt < 0.9 ? 'squint' : lt < 1.5 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      drawer(x, 800, 1020, pop01(t, P.t0 + 0.15, 0.3, 2), lt > 1.0 && lt < 1.6 ? 1 : 0)
      const fly = prog(lt, 0.9, 1.3)
      if (fly < 1) fsheet(x, t, lerp(560, 800, fly), lerp(760, 990, fly) - Math.sin(Math.PI * fly) * 160, 260, 200, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.6 * fly), { crumple: 0.3 + 0.7 * fly, seed: 1, rot: fly * 3 })
      L(x, 800, 720, lt < 0.9 ? `TRIES LEFT: ${Math.max(0, 4 - Math.floor(lt / 0.22))}` : 'FOLDED: TECHNICALLY', pop01(t, P.t0 + 0.3, 0.3, 2.2), lt < 0.9 ? RED : GOLD, 0.05, 30)
    } },
  { sign: 'taurus', cap: 'Got wrapped up in it. | *Nap time.*', mood: lt => lt < 1.0 ? 'happy' : 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.4, 1.0))
      if (k > 0.01) fsheet(x, t, F.x, F.cy + 170, 380, 200 * k, 1, { seed: 3, crumple: 0.15 })
      L(x, 790, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.05, 32)
      if (lt > 1.1) zzz(x, t, 470, 640)
    } },
  { sign: 'gemini', cap: 'Watched six tutorials. | Folded *zero.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.28))
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `TUTORIAL ${n}/6`, headCol: SKYB, lines: [['fold corner A…', BONE, 1], ['into corner B…', BONE, lt > 0.8 ? 1 : 0], ['now simply—', GOLD, lt > 1.3 ? 1 : 0]], size: 22 })
      fsheet(x, t, 790, 1110, 300, 110, pop01(t, P.t0 + 1.5, 0.3, 2), { crumple: 0.8, seed: 5 })
      L(x, 540, 600, 'EXPERT NOW', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.05, 30)
    } },
  { sign: 'cancer', cap: 'Rocked it to sleep | like *a newborn.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const rock = Math.sin(t * 3) * 0.14
      fsheet(x, t, 800, 900, 260, 180, pop01(t, P.t0 + 0.2, 0.3, 2), { crumple: 0.55, seed: 7, rot: rock })
      bubble(x, 790, 650, 'shh, sleepy sheet', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 880, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
      L(x, 800, 1110, 'BABY BLANKET NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Didn’t fold it. | Wore it as *a cape.*', mood: 'sparkle', star: { x: -120 }, hops: [0.9, 1.6],
    back(x, t, lt, P, F) { cape(x, t, F, prog(lt, 0.4, 0.8)) },
    front(x, t, lt, P) {
      L(x, 790, 700, 'SUPERHERO ERA', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ffb34a', 0.05, 34)
      sparkles(x, t, 420, 860, P.t0 + 1.0, 7, 200, 0.2)
      bubble(x, 800, 1080, 'laundry? | never heard of it', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Perfect square. | Then *labeled it.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 900); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-120, -100, 250, 230)
        x.fillStyle = INK; x.fillRect(-135, -125, 270, 250); x.fillStyle = SHEET; x.fillRect(-125, -115, 250, 230)
        x.strokeStyle = SHADE; x.lineWidth = 5; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(-125, -115 + i * 57); x.lineTo(125, -115 + i * 57); x.stroke() }
        x.restore()
      }
      L(x, 800, 900, 'QUEEN · FITTED · SAGE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.03, 26)
      sparkles(x, t, 800, 900, P.t0 + 0.9, 8, 190, 0.1)
      L(x, 800, 650, 'CORNERS: 90°', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.05, 30)
    } },
  { sign: 'libra', cap: 'Made the group chat | *vote on it.*', mood: lt => lt < 1.3 ? 'neutral' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const v = clamp((lt - 0.5) / 1.2)
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: FOLD IT?', headCol: PINK, lines: [[`halves  ${Math.round(50 * v)}%`, BONE, 1], [`thirds  ${Math.round(50 * v)}%`, BONE, 1], ['ball it up', GOLD, lt > 1.5 ? 1 : 0]], size: 22 })
      L(x, 800, 1120, 'TIE. AGAIN.', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Stared it down. | It *surrendered.*', mood: lt => lt < 1.2 ? 'squint' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.1) fsheet(x, t, 800, 900, 280, 220, pop01(t, P.t0 + 0.15, 0.3, 2), { seed: 9, crumple: 0.2, rot: 0.04 * Math.sin(t * 20) * clamp(lt - 0.5) })
      else flag(x, t, 760, 960, pop01(t, P.t0 + 1.1, 0.3, 2.2))
      if (lt < 1.1) L(x, 800, 660, 'EYE CONTACT: 0 BLINKS', pop01(t, P.t0 + 0.5, 0.3, 2.2), '#c97bff', 0.04, 26)
      else L(x, 800, 660, 'SHEET: SURRENDERED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Turned it into | *a tent.*', mood: 'sparkle', star: { x: 170, y: 40 }, hops: [0.8, 1.5],
    back(x, t, lt, P) { tent(x, t, 350, 930, pop01(t, P.t0 + 0.25, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 330, 640, 'CAMPING TONIGHT', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ff9a4a', -0.05, 32)
      bubble(x, 760, 620, 'in the hallway!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Timed it. | Personal *best.*', mood: lt => lt < 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      stopwatch(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.3)
      const s = lt < 1.3 ? (lt * 31.7).toFixed(1) : '41.2'
      L(x, 800, 1060, `00:${s.padStart(4, '0')}${lt >= 1.3 ? ' · PB' : ''}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), lt >= 1.3 ? GOLD : STEEL, -0.04, 34)
      if (lt >= 1.3) confetti(x, t, 800, 800, P.t0 + 1.3)
    } },
  { sign: 'aquarius', cap: 'Folded a shape | that *doesn’t exist.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      weird(x, t, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1080, 'PATENT PENDING', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#6fc3ff', -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 0.7, 7, 190, 0.5)
    } },
  { sign: 'pisces', cap: 'Got lost inside it. | *Still in there.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -40, y: 10 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.9))
      if (k > 0.01) {
        // the sheet drapes down over the star's body; only the crying face peeks out
        x.save(); x.beginPath(); x.rect(0, F.cy + 85, 1080, 600); x.clip()
        fsheet(x, t, F.x, F.cy + 205, 500, 240, k, { seed: 11, crumple: 0.1 })
        x.restore()
      }
      bubble(x, 800, 620, 'it’s so big | in here', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      L(x, 540, 1130, 'SEND HELP', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0556', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs vs. | *a fitted sheet.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | The sheet *won.*',
    draw(x, t, lt) {
      fsheet(x, t, 540, 690, 230, 170, pop01(t, t - lt + 1.4, 0.35, 2), { seed: 13, crumple: 0.6, rot: 0.06 * Math.sin(t * 2) })
      label(x, 540, 560, '✦ UNDEFEATED ✦', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
