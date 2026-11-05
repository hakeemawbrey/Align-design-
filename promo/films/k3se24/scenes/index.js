// k3se24: 3-SECOND ADVICE · "One Night, Eight Countdowns" (60.4 s vertical, the long trial version, music: lofi · Dm).
// Built on k3se01/threekit.js + the shared hook kit. No end card, no card cut.
//   0.00   frame 0: ♑ Capricorn mid-leap at a buzzing phone ("hey :)"), noodles flying.  Hook: "Crush texted 'hey.' |
//          *Survive the night.*"  0.55 whip zoom; a promise sticker pops: "WAIT FOR 2 A.M." (stays until 2 a.m.).
//   3.00   eight 6.8 s beats, each: the moment (time + situation) → 3 · 2 · 1 → THE STARS' advice → Capricorn does it.
//          Chapters: 1 · 7 PM · 2 · 9 PM · 3 · 11 PM · 4 · 2 AM · 5 · 8 AM.
//          7:02 "hey :)" → "Reply like yourself. No strategy." · 7:40 draft #9 → "First draft is fine. Hit send." ·
//          9:00 no reply yet → "A slow reply isn't a no. Go eat." · 9:30 ♓ Pisces on video call, sobbing "YES ASK THEM"
//          → "Ask for a real day and time." · 11:00 "maybe this week?" → "Answer 'maybe' with a plan." ("friday, 7?") ·
//          11:45 the urge to check if they're online → "Phone down. Let it be." · 2:00 AM (the promised one) red
//          alarm, a giant paragraph → "2 a.m. feelings can wait till 10." · 8:00 AM the reply → "Calm and honest got
//          you Friday."
//   57.4   victory dance; 59.4 "FRIDAY." slams in. Hard cut at 60.4.
import { R, box, bubble, label, shadow, drawBits, HEART, hearts, sparkles, confetti, star, tissues, phone, chat, clockBadge, inSprite, starFrame, tearsCells,
  buildBug, buildAdvice, lerp, prog, ease, clamp, pop01, outK, r3, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER, MONO, el, W, H } from '../../k3se01/threekit.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, countdown, countdownCues, chapter, chapterCues } from '../../hookkit.js'

export const DURATION = 60.4
const B0 = 3.0, BL = 6.8, FIN = B0 + 8 * BL          // 57.4
const bAt = i => r3(B0 + i * BL)
const CD_AT = i => r3(bAt(i) + 2.6), ADV_AT = i => r3(bAt(i) + 3.45)
const BEATS = [
  { time: '7:02 PM', sit: 'they texted first', adv: 'Reply like yourself. | *No strategy.*' },
  { time: '7:40 PM', sit: 'draft number nine', adv: 'First draft is fine. | *Hit send.*' },
  { time: '9:00 PM', sit: 'no reply yet', adv: 'A slow reply isn’t a no. | *Go eat.*' },
  { time: '9:30 PM', sit: 'should I ask them out?', adv: 'Ask for a real | *day and time.*' },
  { time: '11:00 PM', sit: 'they said “maybe”', adv: 'Answer “maybe” | *with a plan.*' },
  { time: '11:45 PM', sit: 'the urge to check if they’re online', adv: 'Phone down. | *Let it be.*' },
  { time: '2:00 AM', sit: '2 a.m. feelings detected', adv: '2 a.m. feelings can | *wait till 10.*' },
  { time: '8:00 AM', sit: 'the reply', adv: 'Calm and honest | *got you Friday.*' },
]
const CHAPTERS = [[1, '7 PM', 0, 2], [2, '9 PM', 2, 4], [3, '11 PM', 4, 6], [4, '2 AM', 6, 7], [5, '8 AM', 7, 8]]
  .map(([n, title, a, b]) => ({ at: bAt(a), out: b === 8 ? [DURATION + 1, DURATION + 2] : [r3(bAt(b) - 0.2), bAt(b)], n, title, x: 60, y: 230, color: [GOLD, SKYB, '#c9a6ff', RED, MINT][n - 1] }))
const HOOK = { at: -1, text: "Crush texted 'hey.' | *Survive the night.*", top: 215, size: 92, accentColor: GOLD, width: 960, out: [2.75, 3.0] }
const WHIP0 = { at: 0.55, len: 0.42, from: 1.8, to: 1, cx: 760, cy: 860 }
const WHIPS = BEATS.map((_, i) => ({ at: bAt(i), len: 0.36, from: 1.3, to: 1, cx: 540, cy: 900, lines: true, flash: 0.22 }))
const CDS = BEATS.map((_, i) => ({ at: CD_AT(i), from: 3, gap: 0.27, go: null, y: 840, color: i === 6 ? RED : GOLD }))
const PHX = 820, PHY = 840

// ── the set: window (sky by time), clock, couch
function windowSky(x, i) {
  const cols = i < 0 ? ['#3a2a6a', '#e07a5a'] : i <= 1 ? ['#3a2a6a', '#e07a5a'] : i <= 5 ? ['#0d0b28', '#1e1850'] : i === 6 ? ['#06050f', '#0d0b22'] : ['#7fc8ff', '#ffe7a3']
  box(x, 60, 560, 260, 250, INK, { b: 6 })
  const g = x.createLinearGradient(0, 560, 0, 810); g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]); x.fillStyle = g; x.fillRect(60, 560, 260, 250)
  if (i === 7) { x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(250, 640, 36, 0, 7); x.fill() } else if (i >= 2) { x.fillStyle = '#f7e9b8'; x.beginPath(); x.arc(250, 620, 24, 0, 7); x.fill() }
  R(x, INK, 186, 560, 8, 250); R(x, INK, 60, 682, 260, 8)
}
function couch(x) {
  box(x, 260, 960, 500, 110, '#4f6f5a', { b: 7, hi: '#668a72' }); box(x, 240, 1040, 540, 100, '#5a7c66', { b: 7, hi: '#7393d0' })
  box(x, 220, 1000, 50, 140, '#3f5c4a', { b: 7 }); box(x, 750, 1000, 50, 140, '#3f5c4a', { b: 7 })
}
function header(x, t, i) {
  const a = bAt(i), k = pop01(t, a + 0.08, 0.3, 2.2) * outK(t, [a + BL - 0.15, a + BL])
  if (k <= 0.01) return
  const b = BEATS[i]
  x.save(); x.globalAlpha = clamp(k); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 74px ${INTER}`; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(b.time, 543, 424); x.fillStyle = i === 6 ? '#ff6a7a' : BONE; x.fillText(b.time, 540, 420)
  x.font = `italic 500 50px 'EB Garamond', Georgia, serif`; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(b.sit, 542, 492); x.fillStyle = GOLD; x.fillText(b.sit, 540, 489)
  x.restore()
}
const cap = (x, t, o) => star(x, t, 'capricorn', { seed: 3, glow: 1.1, ...o })

function hook(x, t) {
  windowSky(x, 0); couch(x)
  // noodles flying
  for (let i = 0; i < 10; i++) { const p = ((t * 1.2 + i / 10) % 1 + 1) % 1; x.save(); x.translate(380 + i * 18, 900 - 300 * Math.sin(Math.PI * p) + 120 * p); x.rotate(t * 4 + i); R(x, INK, -26, -5, 52, 10); R(x, '#f2d58a', -24, -3, 48, 6); x.restore() }
  box(x, 300, 1000, 120, 50, '#e86a5a', { b: 5 })
  const p = clamp((t + 0.5) / 1.4)
  cap(x, t, { x: lerp(420, 640, p), y: 900 - 160 * Math.sin(Math.PI * Math.min(1, p)), s: 280, mood: 'wide', look: [1, -0.2], squash: -0.12 })
  const bz = 6 * Math.sin(t * 70)
  phone(x, PHX + bz, PHY, { w: 300, h: 440, rot: 0.06, draw: (c, w, h) => { c.fillStyle = `rgba(160,190,255,${0.2 + 0.15 * Math.sin(t * 20)})`; c.fillRect(0, 0, w, h); chat(c, w, 60, 'hey :)', { size: 40 }) } })
  label(x, 'bzz', PHX - 170, PHY - 200, { size: 44, col: '#bcd2ff', font: INTER, weight: 800, rot: -0.2 })
}
// the eight beats: u = seconds into the beat, fx = advice landed
function beat(x, t, i) {
  const a = bAt(i), u = t - a, fx = u > 3.45, fu = u - 3.45
  windowSky(x, i); couch(x)
  clockBadge(x, 190, 870, BEATS[i].time.replace(' ', ''), { col: i === 6 ? '#ff6a7a' : MINT, size: 34 })
  header(x, t, i)
  const hops = [a + 0.3, a + 3.5, a + 4.2]
  const P = (draw, o = {}) => phone(x, PHX + (o.bz || 0), PHY, { w: 320, h: 460, rot: 0.05, draw, ...o })
  if (i === 0) {
    cap(x, t, { x: 500, y: 900, s: 270, mood: fx ? 'happy' : 'wide', look: [1, -0.1], hops })
    P((c, w) => { chat(c, w, 30, 'hey :)', { size: 36 }); if (fx) chat(c, w, 110, 'hey! how was', { mine: true, size: 32, k: clamp(fu / 0.2) }); if (fx) chat(c, w, 172, 'your day?', { mine: true, size: 32, k: clamp((fu - 0.15) / 0.2) }) })
    if (!fx) { const n = Math.min(6, Math.floor(u * 3)); for (let k = 0; k < n; k++) R(x, 'rgba(79,124,216,0.85)', 620, 760 - k * 34, 260, 24); label(x, 'typing an essay…', 500, 640, { size: 32, col: SKYB }) }
  }
  if (i === 1) {
    cap(x, t, { x: 500, y: 900, s: 270, mood: fx ? 'happy' : 'squint', look: [1, 0], hops })
    if (!fx) { label(x, `DRAFT #${Math.min(9, 5 + Math.floor(u * 1.7))}`, 820, 560, { size: 46, col: RED, font: INTER, weight: 800 }); for (let k = 0; k < 4; k++) { const p = ((t * 1.1 + k / 4) % 1); x.fillStyle = BONE; x.beginPath(); x.arc(lerp(680, 360 + k * 40, p), 760 - 200 * Math.sin(Math.PI * p) + 300 * p * p, 22, 0, 7); x.fill() } }
    P((c, w) => { chat(c, w, 30, 'hey :)', { size: 36 }); chat(c, w, 110, 'hey! how was', { mine: true, size: 32 }); chat(c, w, 172, 'your day?', { mine: true, size: 32 }); if (fx) { c.font = `700 24px ${MONO}`; c.fillStyle = MINT; c.textAlign = 'right'; c.fillText('sent ✓', w - 20, 250) } })
    if (fx) label(x, 'sent.', 500, 700, { size: 56, col: MINT, font: INTER, weight: 800, alpha: clamp(fu / 0.2) })
  }
  if (i === 2) {
    if (!fx) {
      cap(x, t, { x: 560, y: 900, s: 270, mood: 'squint', look: [1, 0.1] })
      P((c, w) => { chat(c, w, 110, 'hey! how was', { mine: true, size: 32 }); chat(c, w, 172, 'your day?', { mine: true, size: 32 }); c.font = `700 24px ${MONO}`; c.fillStyle = 'rgba(239,230,214,0.5)'; c.textAlign = 'right'; c.fillText('delivered', w - 20, 250) })
      label(x, `${20 + Math.floor(u * 8)} min…`, 560, 700, { size: 48, col: BONE, font: INTER, weight: 800 })
    } else {
      box(x, 780, 1000, 150, 26, '#2a2148', { b: 6 })
      cap(x, t, { x: 500, y: 900, s: 270, mood: 'happy', look: [0.5, 0.4], hops: [a + 3.6, a + 4.3, a + 5.0, a + 5.7] })
      x.fillStyle = INK; x.beginPath(); x.ellipse(500, 1060, 110, 40, 0, 0, Math.PI); x.fill(); x.fillStyle = '#e86a5a'; x.beginPath(); x.ellipse(500, 1062, 100, 32, 0, 0, Math.PI); x.fill()
      label(x, 'nom nom', 500, 700, { size: 48, col: GOLD, font: INTER, weight: 800 })
    }
  }
  if (i === 3) {
    cap(x, t, { x: 470, y: 900, s: 260, mood: fx ? 'happy' : 'wide', look: [1, -0.1], hops })
    P((c, w, h) => {
      if (!fx) { R(c, '#3a2a6a', 0, 0, w, h); const F = { x: w / 2, y: h / 2 + 30, s: 230 }; star(c, t, 'pisces', { ...F, mood: 'sparkle', look: [0, 0], seed: 6, tears: 3, glyph: false }); c.font = `800 30px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'center'; c.fillText('PISCES · video', w / 2, 40) }
      else { chat(c, w, 30, 'want to get dinner', { mine: true, size: 30, k: clamp(fu / 0.2) }); chat(c, w, 92, 'friday at 7?', { mine: true, size: 30, k: clamp((fu - 0.2) / 0.2) }) }
    })
    if (!fx) { bubble(x, t, 430, 660, a + 0.3, a + 2.5, 'should I ask them out??', { size: 36 }); bubble(x, t, 830, 560, a + 1.2, a + 2.5, 'YES. ASK THEM.', { size: 38, col: '#d9c9ff' }) }
  }
  if (i === 4) {
    cap(x, t, { x: 480, y: 900, s: 270, mood: fx ? 'happy' : 'neutral', look: [1, -0.1], hops })
    P((c, w) => { chat(c, w, 30, 'want to get dinner', { mine: true, size: 30 }); chat(c, w, 92, 'friday at 7?', { mine: true, size: 30 }); chat(c, w, 170, 'maybe this week?', { size: 32 }); if (fx) chat(c, w, 250, 'friday, 7? :)', { mine: true, size: 32, k: clamp(fu / 0.2) }) })
    if (!fx) label(x, '???', 480, 700, { size: 70, col: GOLD, font: INTER, weight: 800, rot: 0.1 * Math.sin(t * 6) })
  }
  if (i === 5) {
    if (!fx) {
      const reach = Math.sin(t * 5) > 0
      cap(x, t, { x: reach ? 600 : 500, y: 900, s: 270, mood: 'squint', look: [1, 0] })
      P((c, w) => { chat(c, w, 170, 'maybe this week?', { size: 32 }); chat(c, w, 250, 'friday, 7? :)', { mine: true, size: 32 }) })
      label(x, 'just check if they’re online?', 540, 640, { size: 34, col: BONE })
    } else {
      const dk = clamp(fu / 0.4)
      box(x, 800, 1010, 180, 120, '#6e4b33', { b: 6 }); R(x, INK, 800, 1060, 180, 6)
      if (dk < 1) phone(x, PHX, lerp(PHY, 1050, ease.inCubic(dk)), { w: lerp(320, 80, dk), h: lerp(460, 120, dk) })
      cap(x, t, { x: 500, y: 900, s: 270, mood: fu > 1.2 ? 'sleepy' : 'happy', look: [0, 0], hops: [a + 3.6] })
      x.fillStyle = `rgba(4,2,14,${0.35 * clamp((fu - 1.0) / 0.4)})`; x.fillRect(0, 0, W, H)
    }
  }
  if (i === 6) {
    if (!fx) {
      const flash = Math.sin(t * 14) > 0
      x.fillStyle = flash ? 'rgba(255,40,60,0.22)' : 'rgba(255,40,60,0.06)'; x.fillRect(0, 0, W, H)
      cap(x, t, { x: 480, y: 880, s: 270, mood: 'wide', look: [1, -0.3], squash: -0.1 })
      for (let k = 0; k < Math.min(9, 2 + Math.floor(u * 4)); k++) R(x, 'rgba(79,124,216,0.9)', 640, 1010 - k * 40, 330, 28)
      label(x, 'I just think we have something real and also', 540, 600, { size: 30, col: SKYB })
      label(x, '2 A.M. FEELINGS', 540, 680, { size: 50, col: '#ff6a7a', font: INTER, weight: 800, alpha: flash ? 1 : 0.6 })
    } else {
      x.fillStyle = 'rgba(4,2,14,0.35)'; x.fillRect(0, 0, W, H)
      box(x, 780, 1000, 150, 26, '#2a2148', { b: 6 })
      cap(x, t, { x: 500, y: lerp(880, 940, clamp(fu / 0.6)), s: 270, mood: fu > 0.6 ? 'sleepy' : 'neutral', look: [0, 0] })
      label(x, 'saved for 10 a.m.', 500, 680, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: clamp(fu / 0.3) })
    }
  }
  if (i === 7) {
    const bz = !fx && u > 0.4 ? 5 * Math.sin(t * 70) : 0
    cap(x, t, { x: 470, y: 900, s: 270, mood: fx ? 'heart' : u < 0.4 ? 'sleepy' : 'wide', look: [1, -0.1], hops: fx ? [a + 3.5, a + 3.9, a + 4.3, a + 4.7, a + 5.1, a + 5.5, a + 5.9, a + 6.3] : hops })
    P((c, w) => { if (fx) { chat(c, w, 40, 'good morning!', { size: 34, col: '#c0407a', k: clamp(fu / 0.2) }); chat(c, w, 110, 'friday at 7 works :)', { size: 30, col: '#c0407a', k: clamp((fu - 0.15) / 0.2) }) } else { c.font = `800 30px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'center'; c.fillText('1 new message', w / 2, 200) } }, { bz })
    if (fx) { confetti(x, t, a + 3.5, 540, 700, { n: 34 }); hearts(x, t, a + 3.6, 470, 760, { n: 6, cell: 7 }) }
  }
}
function finale(x, t) {
  const u = t - FIN
  windowSky(x, 7); couch(x)
  clockBadge(x, 190, 870, '8:01AM', { col: MINT, size: 34 })
  cap(x, t, { x: 540 + 60 * Math.sin(t * 6), y: 880, s: 300, mood: 'happy', look: [0, -0.3], hops: [FIN, FIN + 0.35, FIN + 0.7, FIN + 1.05, FIN + 1.4, FIN + 1.75, FIN + 2.1, FIN + 2.45] })
  confetti(x, t, FIN + 0.05, 540, 680, { n: 40, life: 3 })
  const fk = clamp((u - 2.0) / 0.12)
  if (fk > 0) label(x, 'FRIDAY.', 540, 560, { size: 110 * (1 + 0.6 * (1 - fk)), col: GOLD, font: INTER, weight: 800, alpha: fk, rot: -0.05 })
  sparkles(x, t, 540, 560, FIN + 2.02, 12, 300, 1)
  label(x, '*victory dance*', 540, 690, { size: 34, col: BONE, alpha: clamp((u - 0.1) / 0.2) })
}

async function build(stage) {
  try { await Promise.all(["800 110px Inter", "800 74px Inter", "800 40px Inter", "italic 500 50px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
      if (t < B0) hook(x, t)
      else if (t < FIN) beat(x, t, Math.min(7, Math.floor((t - B0) / BL)))
      else finale(x, t)
      // Pisces in the corner, crying along all night (happy tears at the end)
      const i = Math.floor((t - B0) / BL), late = t >= FIN || (i === 7 && t - bAt(7) > 3.45)
      tissues(x, 920 - 136, 1690 + 38, 90)
      star(x, t, 'pisces', { x: 920, y: 1690, s: 175, mood: late ? 'sparkle' : 'wide', look: [-1, -0.7], seed: 6, glow: 0.8, tips: false, tears: late ? 3 : 2, hops: late ? [bAt(7) + 3.5, bAt(7) + 4.2, FIN + 0.3] : null })
      drawGrain(gx, t)
    },
  }
}
async function buildUI(stage) {
  try { await Promise.all(["800 60px Inter", "800 28px Inter", "italic 500 78px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const ui = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, stage)
  ui.dataset.hookcam = 'off'
  const advs = BEATS.map(b => buildAdvice(ui, b.adv, { top: 1250, size: 60 }))
  const promise = el('div', { position: 'absolute', left: '56px', top: '1640px', padding: '12px 22px 14px', background: RED, border: `5px solid ${INK}`, borderRadius: '12px', font: `800 34px Inter, sans-serif`, color: BONE, letterSpacing: '0.04em', display: 'none', boxShadow: '8px 8px 0 rgba(6,4,18,0.7)' }, ui, 'WAIT FOR 2 A.M. ★')
  buildBug(ui)
  return {
    start: 0, end: DURATION + 0.01, root: ui,
    update(t) {
      advs.forEach((a, i) => { const at = ADV_AT(i), end = i === 7 ? DURATION + 1 : bAt(i + 1); a.update(t, at, 1 - clamp(prog(t, end - 0.15, end))) })
      const pk = pop01(t, 1.0, 0.3, 2.4) * (1 - clamp(prog(t, bAt(6) - 0.2, bAt(6))))
      promise.style.display = pk > 0.01 ? 'block' : 'none'
      promise.style.transform = `rotate(-4deg) scale(${(pk * (1 + 0.04 * Math.sin(t * 6))).toFixed(3)})`
    },
  }
}

export const SCENES = [build, buildUI, whipZoom(WHIP0), slamTitle(HOOK), ...WHIPS.map(w => whipZoom(w)), ...CDS.map(c => countdown(c)), ...CHAPTERS.map(c => chapter(c))]
export const CUES = [
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ['tick', 0.0, 0.06], ['tick', 0.06, 0.06], ['pop', 1.0, 1567.98, 0.04, -0.4],
  ...WHIPS.flatMap(w => whipZoomCues(w).slice(0, 2)), ...CDS.flatMap(c => countdownCues(c)), ...CHAPTERS.flatMap(c => chapterCues(c)),
  ...BEATS.flatMap((b, i) => { const a = ADV_AT(i); return [['boom', a, 0.22], ['bell', r3(a + 0.04), 1760, 0.03, 1.0, 0], ['glitter', r3(a + 0.02), r3(a + 0.45)], ['pop', r3(a + 0.2), 1174.66, 0.035, 0.4]] }),
  ...[0, 0.3, 0.6, 0.9, 1.2, 1.5].map(d => ['pop', r3(bAt(6) + 0.2 + d), 1567.98, 0.03, 0]),
  ['crash', r3(ADV_AT(7)), { gain: 0.09 }], ['pop', r3(ADV_AT(7) + 0.1), 1318.51, 0.045, 0.3], ['pop', r3(ADV_AT(7) + 0.25), 1760, 0.045, 0.3],
  ['whoosh', FIN, 0.4, 0.03], ['crash', r3(FIN + 2.0), { gain: 0.09 }], ['boom', r3(FIN + 2.0), 0.25], ['glitter', r3(FIN + 2.0), r3(FIN + 2.6)], ['pop', r3(FIN + 2.05), 1567.98, 0.045, 0],
]
