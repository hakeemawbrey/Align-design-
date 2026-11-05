// k3se23: 3-SECOND ADVICE · "12 Signs, 12 Countdowns" (60.6 s vertical, the long trial version, music: chiptune · C).
// Built on k3se01/threekit.js (helpers, bug, advice sticker) + the shared hook kit. No end card, no card cut.
//   0.00   frame 0: all 12 signs mid-stampede at the lens, the giant "3" mid-slam; hook "12 signs. | 3 seconds each.
//          *Go.*"  0.55 whip zoom.  3 · 2 · 1 · GO!  A promise sticker pops: "WAIT FOR #12" (stays until #12).
//   2.60   twelve 4.6 s segments, a whip zoom into each: the sign + its relatable moment (header "#n · SIGN" and the
//          situation) → a quick 3 · 2 · 1 → THE STARS' one-line advice slams in, the sign brightens.
//          Chapter stickers: 1 · FIRE (Aries, Leo, Sagittarius) · 2 · EARTH (Taurus, Virgo, Capricorn) ·
//          3 · AIR (Gemini, Libra, Aquarius) · 4 · WATER (Cancer, Scorpio, Pisces).
//   53.2   #12 is Pisces: "sorry for crying… again" → "Never say sorry | for a *soft heart.*"
//   57.8   the payoff: the other eleven rush in and group-hug Pisces; 59.6 Pisces: "ok NOW I'm crying."
//          Hard cut at 60.6.
// Pisces cries in the corner all the way through (and as the star of #12).
import { R, box, bubble, label, shadow, drawBits, HEART, hearts, sparkles, confetti, star, tissues, phone, chat, buildBug, buildAdvice,
  lerp, prog, ease, clamp, pop01, outK, r3, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER, MONO, el, W, H } from '../../k3se01/threekit.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, countdown, countdownCues, chapter, chapterCues } from '../../hookkit.js'

export const DURATION = 60.6
const S0 = 2.6, SEG = 4.6, FIN = S0 + 12 * SEG          // 57.8
const segAt = i => r3(S0 + i * SEG)
const SIGNS = [
  { id: 'aries', name: 'ARIES', sit: 'fell for someone in one day', line: 'we met today. I love them??', adv: 'Slow down. | *Good things keep.*', prop: 'hearts' },
  { id: 'leo', name: 'LEO', sit: 'hurt, but acting totally fine', line: 'I’m FINE. totally fine.', adv: 'You can be strong | and still *say ouch.*', prop: 'bandage' },
  { id: 'sagittarius', name: 'SAGITTARIUS', sit: 'booking a trip to dodge the talk', line: 'road trip instead of talking?', adv: 'Have the talk first. | *Then pack.*', prop: 'suitcase' },
  { id: 'taurus', name: 'TAURUS', sit: 'won’t leave the comfy rut', line: 'same couch. same night. again.', adv: 'Say yes to | *one new plan.*', prop: 'couch' },
  { id: 'virgo', name: 'VIRGO', sit: '40 dealbreakers and counting', line: 'dealbreaker #38: chews loud.', adv: 'Keep five. Let people | *surprise you.*', prop: 'list' },
  { id: 'capricorn', name: 'CAPRICORN', sit: 'treating a date like a meeting', line: 'item one: your five-year plan.', adv: 'No agenda. | *Just be curious.*', prop: 'briefcase' },
  { id: 'gemini', name: 'GEMINI', sit: 'talking to three, honest with none', line: 'it’s… complicated!!', adv: 'Be honest about | *where you’re at.*', prop: 'phones' },
  { id: 'libra', name: 'LIBRA', sit: 'keeping the peace, losing yourself', line: 'whatever you want is fine!', adv: 'Your opinion is allowed | *at the table.*', prop: 'scale' },
  { id: 'aquarius', name: 'AQUARIUS', sit: 'too cool to say “I like you”', line: 'you’re… fine, I guess.', adv: 'Liking someone | *isn’t a weakness.*', prop: 'shades' },
  { id: 'cancer', name: 'CANCER', sit: 'rereading the old texts. again.', line: 'remember when we…', adv: 'Archive the thread. | *Keep the lesson.*', prop: 'thread' },
  { id: 'scorpio', name: 'SCORPIO', sit: 'testing if they really care', line: 'if they cared, they’d guess.', adv: 'Don’t test. | *Just ask.*', prop: 'magnifier' },
  { id: 'pisces', name: 'PISCES', sit: 'saying sorry for crying… again', line: 'sorry, I’m crying again', adv: 'Never say sorry | for a *soft heart.*', prop: 'tissues' },
]
const CHAPTERS = [{ n: 1, title: 'FIRE', i: 0 }, { n: 2, title: 'EARTH', i: 3 }, { n: 3, title: 'AIR', i: 6 }, { n: 4, title: 'WATER', i: 9 }]
  .map(c => ({ at: segAt(c.i), out: [r3(segAt(c.i + 3) - 0.2), segAt(c.i + 3)], n: c.n, title: c.title, x: 60, y: 230, color: [RED, MINT, SKYB, '#c9a6ff'][c.n - 1] }))
// the last chapter stays up through the finale
CHAPTERS[3].out = [DURATION + 1, DURATION + 2]
const HOOK = { at: -1, text: '12 signs. | 3 seconds each. *Go.*', top: 215, size: 96, accentColor: GOLD, width: 960, out: [2.35, 2.6] }
const WHIP0 = { at: 0.55, len: 0.42, from: 1.8, to: 1, cx: 540, cy: 900 }
const CD0 = { at: -0.12, from: 3, gap: 0.42, go: 'GO!', y: 860, color: GOLD }
const WHIPS = SIGNS.map((_, i) => ({ at: segAt(i), len: 0.36, from: 1.35, to: 1, cx: 540, cy: 900, lines: true, flash: 0.25 }))
const CDS = SIGNS.map((_, i) => ({ at: r3(segAt(i) + 1.45), from: 3, gap: 0.26, go: null, y: 860, color: GOLD }))
const ADV_AT = i => r3(segAt(i) + 2.25)

// ── little props, drawn next to each sign (cx, cy = the sign's centre)
function prop(x, t, kind, cx, cy, fixed) {
  if (kind === 'hearts') { if (!fixed) for (let i = 0; i < 6; i++) { const p = ((t * 1.3 + i / 6) % 1); drawBits(x, HEART, { H: [PINK, RED, GOLD][i % 3] }, cx + Math.sin(i * 2.1) * 170, cy - 60 - p * 260, 7, { alpha: 1 - p }) } }
  if (kind === 'bandage') { x.save(); x.translate(cx + 40, cy - 60); x.rotate(0.6); box(x, -50, -16, 100, 32, '#f0c8a0', { b: 4 }); R(x, '#e0b088', -14, -12, 28, 24); x.restore() }
  if (kind === 'suitcase') { box(x, cx + 150, cy + 30, 130, 100, fixed ? '#5a6a8a' : '#e86a5a', { b: 6 }); R(x, INK, cx + 195, cy + 10, 40, 20); label(x, fixed ? 'later' : 'GO!', cx + 215, cy + 85, { size: 30, col: BONE, font: INTER, weight: 800 }) }
  if (kind === 'couch') { box(x, cx - 220, cy + 40, 440, 90, '#7a5aa0', { b: 6, hi: '#9070b8' }); box(x, cx - 240, cy + 10, 50, 120, '#6a4a90', { b: 6 }); box(x, cx + 190, cy + 10, 50, 120, '#6a4a90', { b: 6 }) }
  if (kind === 'list') { const n = fixed ? 5 : 12; box(x, cx + 150, cy - 230, 170, 40 + n * 30, BONE, { b: 6 }); x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; for (let i = 0; i < n; i++) x.fillText(`${i + (fixed ? 1 : 30)}. ${fixed ? 'kind' : 'nope'}`, cx + 162, cy - 200 + i * 30) }
  if (kind === 'briefcase') { box(x, cx + 150, cy + 20, 140, 100, '#6e4b33', { b: 6 }); R(x, INK, cx + 195, cy, 50, 22); if (!fixed) label(x, 'AGENDA', cx + 220, cy + 72, { size: 24, col: GOLD }) }
  if (kind === 'phones') { [[-200, -40, -0.2], [190, -60, 0.2], [210, 120, 0.1]].forEach(([dx, dy, r], i) => phone(x, cx + dx, cy + dy, { w: 90, h: 150, rot: r, draw: (c, w) => { if (!fixed || i === 0) chat(c, w, 20, 'hey', { size: 16 }) } })) }
  if (kind === 'scale') { if (!fixed) for (let i = 0; i < 3; i++) label(x, 'sure!', cx + 170, cy - 120 + i * 60, { size: 30, col: PINK, font: INTER, weight: 800, alpha: 0.6 + 0.4 * Math.sin(t * 5 + i) }) }
  if (kind === 'shades') { if (!fixed) { box(x, cx - 90, cy - 30, 70, 40, '#1a1430', { b: 5 }); box(x, cx + 20, cy - 30, 70, 40, '#1a1430', { b: 5 }); R(x, INK, cx - 20, cy - 22, 40, 8) } }
  if (kind === 'thread') phone(x, cx + 220, cy - 30, { w: 170, h: 280, rot: 0.08, draw: (c, w) => { for (let i = 0; i < 5; i++) chat(c, w, 14 + i * 50, fixed ? '(archived)' : ['lol', 'miss u', 'haha', 'ok', '<3'][i], { size: 18, mine: i % 2 === 1 }) } })
  if (kind === 'magnifier') { if (!fixed) { x.save(); x.translate(cx + 190, cy - 40); x.rotate(0.6); R(x, INK, -10, 60, 20, 120); x.lineWidth = 20; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 60, 0, 7); x.stroke(); x.lineWidth = 12; x.strokeStyle = GOLD; x.beginPath(); x.arc(0, 0, 60, 0, 7); x.stroke(); x.restore() } else bubble(x, t, cx + 210, cy - 40, 0, 99, 'do you care?', { size: 30, k: 1, col: '#ffe2ec' }) }
  if (kind === 'tissues') tissues(x, cx + 200, cy + 60, 110)
}

async function build(stage) {
  try { await Promise.all(["800 80px Inter", "800 60px Inter", "800 40px Inter", "800 28px Inter", "italic 500 78px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
      if (t < S0) hook(x, t)
      else if (t < FIN) segment(x, t)
      else finale(x, t)
      // Pisces in the corner (not while Pisces is the star)
      const pisSolo = t >= segAt(11)
      if (!pisSolo) { tissues(x, 920 - 136, 1690 + 38, 90); star(x, t, 'pisces', { x: 920, y: 1690, s: 175, mood: 'wide', look: [-1, -0.7], seed: 6, glow: 0.8, tips: false, tears: t > S0 && ((t - S0) % SEG) > 2.25 ? 3 : 2 }) }
      drawGrain(gx, t)
    },
  }
}
function hook(x, t) {
  // the stampede: all 12 rushing at the lens, scattering out by 2.6
  SIGNS.forEach((s, i) => {
    const a = (i / 12) * Math.PI * 2 + 0.3, p = clamp((t + 0.9 + (i % 4) * 0.12) / 3.4)
    const r = lerp(60, 620, p), sc = lerp(90, 330, p)
    star(x, t, s.id, { x: 540 + Math.cos(a) * r, y: 880 + Math.sin(a) * r * 0.7, s: sc, mood: i % 3 ? 'wide' : 'happy', look: [Math.cos(a), Math.sin(a)], seed: i + 2, glyph: false, alpha: 1 - clamp((t - 2.0) / 0.5) })
  })
}
function header(x, t, i) {
  const a = segAt(i), k = pop01(t, a + 0.08, 0.3, 2.2) * outK(t, [a + SEG - 0.15, a + SEG])
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.font = `800 74px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const s = SIGNS[i], txt = `#${i + 1} · ${s.name}`
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(txt, 543, 424); x.fillStyle = BONE; x.fillText(txt, 540, 420)
  x.font = `italic 500 50px 'EB Garamond', Georgia, serif`; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(s.sit, 542, 492); x.fillStyle = GOLD; x.fillText(s.sit, 540, 489)
  x.font = `700 28px ${MONO}`; x.textAlign = 'right'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText(`${i + 1}/12`, 1020, 280)
  x.restore()
}
function segment(x, t) {
  const i = Math.min(11, Math.floor((t - S0) / SEG)), a = segAt(i), u = t - a, s = SIGNS[i]
  const fixed = u > 2.25
  header(x, t, i)
  const k = pop01(t, a, 0.36, 2.2)
  prop(x, t, s.prop, 540, 900, fixed)
  shadow(x, 540, 1150, 280 * k)
  const isP = s.id === 'pisces'
  star(x, t, s.id, { x: 540, y: 920, s: 300, pop: k, mood: fixed ? (isP ? 'sparkle' : 'happy') : (i % 2 ? 'wide' : 'neutral'), look: [0, -0.2], seed: i + 2, tears: isP ? (fixed ? 3 : 2) : 0,
    hops: [a + 0.4, a + 0.9, a + 2.3, a + 2.7], squash: fixed ? 0 : 0.03 * Math.sin(t * 20) })
  if (s.prop === 'shades' && !fixed) prop(x, t, 'shades', 540, 905, false)
  bubble(x, t, 540, 640, a + 0.35, a + 1.4, s.line, { size: 40, tail: 0 })
  if (fixed) sparkles(x, t, 540, 900, a + 2.27, 10, 220, i)
}
function finale(x, t) {
  const u = t - FIN
  // Pisces centre, the other eleven rush in and hug
  const order = SIGNS.slice(0, 11)
  order.forEach((s, i) => {
    const row = i < 6 ? 0 : 1, col = row ? i - 6 : i
    const tx = row ? 230 + col * 155 : 130 + col * 165, ty = row ? 1030 : 860
    const p = ease.outCubic(clamp((u - i * 0.04) / 0.6))
    const sx = i % 2 ? -200 : 1280
    star(x, t, s.id, { x: lerp(sx, tx, p), y: ty, s: 170, mood: 'happy', look: [540 > tx ? 1 : -1, 0], seed: i + 2, glyph: false, hops: [FIN + 0.6 + i * 0.03, FIN + 1.6] })
  })
  star(x, t, 'pisces', { x: 540, y: 950, s: 300, mood: u > 0.8 ? 'heart' : 'sparkle', look: [0, -0.2], seed: 13, tears: 3, hops: [FIN + 0.7, FIN + 1.8] })
  if (u > 0.7) { hearts(x, t, FIN + 0.7, 540, 760, { n: 8, cell: 8, spread: 420 }); confetti(x, t, FIN + 0.75, 540, 700, { n: 36 }) }
  label(x, 'GROUP HUG.', 540, 500, { size: 60, col: GOLD, font: INTER, weight: 800, alpha: clamp((u - 0.7) / 0.2) })
  bubble(x, t, 540, 650, FIN + 1.8, 99, 'ok NOW I’m crying.', { size: 44, tail: 0 })
}

// the UI layer (bug, the promise sticker, the 12 advice stickers), outside the camera
async function buildUI(stage) {
  try { await Promise.all(["800 60px Inter", "800 28px Inter", "italic 500 78px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const ui = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, stage)
  ui.dataset.hookcam = 'off'
  const advs = SIGNS.map(s => buildAdvice(ui, s.adv, { top: 1250, size: 60 }))
  const promise = el('div', { position: 'absolute', left: '56px', top: '1640px', padding: '12px 22px 14px', background: PINK, border: `5px solid ${INK}`, borderRadius: '12px', font: `800 34px Inter, sans-serif`, color: INK, letterSpacing: '0.04em', transform: 'rotate(-4deg)', display: 'none', boxShadow: '8px 8px 0 rgba(6,4,18,0.7)' }, ui, 'WAIT FOR #12 ★')
  buildBug(ui)
  return {
    start: 0, end: DURATION + 0.01, root: ui,
    update(t) {
      advs.forEach((a, i) => { const at = ADV_AT(i), end = i === 11 ? DURATION + 1 : segAt(i + 1); a.update(t, at, 1 - clamp(prog(t, end - 0.15, end))) })
      const pk = pop01(t, 1.0, 0.3, 2.4) * (1 - clamp(prog(t, segAt(11) - 0.2, segAt(11))))
      promise.style.display = pk > 0.01 ? 'block' : 'none'
      promise.style.transform = `rotate(-4deg) scale(${(pk * (1 + 0.04 * Math.sin(t * 6))).toFixed(3)})`
    },
  }
}

export const SCENES = [build, buildUI, whipZoom(WHIP0), slamTitle(HOOK), countdown(CD0), ...WHIPS.map(w => whipZoom(w)), ...CDS.map(c => countdown(c)), ...CHAPTERS.map(c => chapter(c))]
export const CUES = [
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...countdownCues(CD0),
  ['pop', 1.0, 1567.98, 0.04, -0.4], ['glitter', 1.0, 1.4],
  ...WHIPS.flatMap(w => whipZoomCues(w).slice(0, 2)), ...CDS.flatMap(c => countdownCues(c)), ...CHAPTERS.flatMap(c => chapterCues(c)),
  ...SIGNS.flatMap((s, i) => { const a = ADV_AT(i); return [['boom', a, 0.22], ['bell', r3(a + 0.04), 1760, 0.03, 1.0, 0], ['glitter', r3(a + 0.02), r3(a + 0.45)], ['pop', r3(segAt(i) + 0.36), 987.77, 0.03, 0]] }),
  ['whoosh', FIN, 0.5, 0.05], ['crash', r3(FIN + 0.7), { gain: 0.09 }], ['glitter', r3(FIN + 0.7), r3(FIN + 1.3)],
  ['pop', r3(FIN + 0.72), 1318.51, 0.045, -0.2], ['pop', r3(FIN + 0.8), 1567.98, 0.045, 0.2], ['pop', r3(FIN + 1.8), 1174.66, 0.04, 0],
]
