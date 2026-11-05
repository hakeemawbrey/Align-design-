// m47kit — the shared engine of batch m47 (promo/films/month2/m47.md): "The Make-Up Talk: Extended" (kxmue01–06, 90 s)
// and "Single and Thriving: Extended" (kxste01–06, 75 s). Lives in kxmue01's folder; every film imports it read-only
// from '../../kxmue01/scenes/m47kit.js'.
//
// Month 2 rules: NO end card, NO card transition, no logo / wordmark / CTA, never the brand name. DURATION is the story
// length. The film ends on its last beat: a hard cut (the punchline holds ~0.7 s) or a seamless loop back to frame 0.
//
// It continues two older looks, imported read-only:
//   · The Make-Up Talk (nmue01/scenes/mukit.js): the CRACKED pixel heart that mends with gold seams, the warm rug, the
//     rose "THE MAKE-UP TALK" bug.
//   · Single and Thriving (nste01/singlekit.js): the orange "SINGLE AND THRIVING" bug, the THRIVING meter, the party
//     string lights and props.
// The sets (room, café, kitchen, bedroom, street, park, split, dinner), the big phone and the star helper come from
// Friends First (nffe01/scenes/friendskit.js); Pisces with big tears from m45's xkit; the frame-0 chaos, the pattern
// breaks, chapter stickers and the loop-back from the Month 2 hook kit (promo/films/hookkit.js).
//
//   makeM47(cfg) → { DURATION, SCENES, CUES, LINES, warn, music(style, key, seed, extra) }
//     cfg.id, cfg.series ('makeup' | 'single'), cfg.dur, cfg.ending ('cut' | 'loop')
//     cfg.hook    { text, out, color, top, size }        the frame-0 hook line (≤ 7 words), already slammed at t = 0
//     cfg.promise { at, out, text }                     the payoff promise sticker
//     cfg.chapters [{ at, title }]                      numbered chapter stickers (1 … 5)
//     cfg.shots   [{ at, set, setOpts, cam: [z, cx, cy], push, rug, draw(x, t, S), front(x, t, S), pis }]
//     cfg.lines / cfg.boxes                             dialogue (startalk dialogueBox)
//     cfg.cards   [{ at, out, text, label, top }]       talk cards / notes (bone card, Garamond italic)
//     cfg.meter   [[t, value 0…1], …]                   Single: the THRIVING meter keyframes (shown from the first key)
//     cfg.thrive  { at, text }                          Single: "<Sign>: *thriving.*" slam near the end
//     cfg.last    { at, text, color, top }              the last line
//     cfg.fx      [{ k: 'scratch' | 'whip' | 'shake' | 'caught' | 'loading' | … , at, … }]  hook-kit effects
//     cfg.overlay(x, t, S)                              top canvas painter (phones, tallies, HUD bits)
//     cfg.cues                                          extra sound cues
// Everything is a pure function of t; DOM and canvases are made only inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSet, star, R, box } from '../../nffe01/scenes/friendskit.js'
import { drawHeart } from '../../nmue01/scenes/mukit.js'
import { pisces, skySet, say, stars, TAG, STARS } from '../../kxase01/xkit.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  caught, caughtCues, incomingCall, incomingCallCues, notification, notificationCues, loadingBar, loadingBarCues,
  countdown, countdownCues, newsDesk, newsDeskCues, gameHud, gameHudCues, achievement, achievementCues, chapter,
  chapterCues, glitch, glitchCues, loopBack, loopCues,
} from '../../hookkit.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#8fd8f6', CREAM = '#fff1c8'
export const ROSE = '#ffb39a', ORANGE = '#ffb36b'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const r3 = v => +(+v).toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inR = (t, a, b) => t >= a && t < b
export const win = (t, a, b, r = 0.25) => Math.min(clamp((t - a) / r), clamp((b - t) / r))
export { clamp, lerp, prog, ease, easeOutBack, signStar, drawPixelStar, drawHeart, pisces, say, stars, TAG, STARS }
// re-exports of the old kits' drawing helpers (read-only)
export * from '../../nffe01/scenes/friendskit.js'
export { hearts as heartsMU, sparkles as sparklesMU, steam, note as noteMU } from '../../nmue01/scenes/mukit.js'
export { stringLights, mug as mugS, gift, tree, note as stickyNote, partyHatCells, confetti as confettiS } from '../../nste01/singlekit.js'

const FONTS = ["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 27px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "400 28px 'Space Mono'", "700 22px 'Space Mono'"]
async function loadFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

// ── the series bugs, top-left 56 px (Inter 800 small caps, letter-spaced)
const BUG_ICON = ['.HH.HH.', 'HHHHHHH', 'HPPPPPH', 'HPPPPPH', '.HHHHH.', '..HHH..', '...H...']
function buildBug(root, series) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  if (series === 'makeup') {
    const ic = el('canvas', { width: '42px', height: '42px', imageRendering: 'pixelated' }, b)
    ic.width = 42; ic.height = 42
    const c = ic.getContext('2d')
    BUG_ICON.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; c.fillStyle = ch === 'H' ? '#f04a6e' : '#f6d6b8'; c.fillRect(i * 6, j * 6, 6, 6) }))
    el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
      'THE&nbsp;<span style="color:#ffd9c9">MAKE-UP</span>&nbsp;TALK')
  } else {
    el('div', { width: '18px', height: '18px', background: ORANGE, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,107,0.7)` }, b)
    el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: ORANGE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
      'SINGLE&nbsp;AND<span style="color:rgba(255,255,255,0.7)">&nbsp;THRIVING</span>')
  }
  return b
}

// ── a talk card / note (bone, ink border, a chip on top, the words in Garamond italic)
function buildCard(root, { at, out, text, label: lab = 'TALK CARD', top = 470, accent = '#c0577a', chip = ROSE, size = 62, width = 780 }) {
  const wrapE = el('div', { position: 'absolute', left: '0', top: top + 'px', width: W + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const card = el('div', { position: 'relative', width: width + 'px', padding: '64px 52px 44px', background: BONE, border: `7px solid ${INK}`, borderRadius: '22px', boxShadow: '12px 14px 0 rgba(6,4,18,0.72)', transformOrigin: '50% 60%', textAlign: 'center' }, wrapE)
  el('div', { position: 'absolute', left: '50%', top: '-30px', transform: 'translateX(-50%)', padding: '8px 22px 10px', background: chip, border: `5px solid ${INK}`, borderRadius: '12px', font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: INK, whiteSpace: 'nowrap', fontVariant: 'small-caps' }, card, '✦ ' + lab)
  const html = text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="color:${accent}">$1</span>`)
  el('div', { font: `italic 500 ${size}px ${SERIF}`, lineHeight: '1.12', color: INK }, card, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrapE.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.4), 2.2), o = outK(t, out)
      const fl = 1 - ease.outCubic(prog(t, at, at + 0.4))
      const sway = 1.2 * Math.sin((t - at) * 1.8)
      card.style.opacity = String(clamp(prog(t, at, at + 0.12) * 1.5) * o)
      card.style.transform = `translateY(${(fl * 160 - (1 - o) * 60).toFixed(1)}px) rotate(${(-3 + 4 * fl + sway).toFixed(2)}deg) scale(${(lerp(0.5, 1, k) * lerp(0.85, 1, o)).toFixed(4)})`
    },
  }
}

// ── the THRIVING meter (Single), keyframes [[t, v]]: a pixel bar bottom-centre, % counter, a heart when full
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function meterAt(keys, t) {
  if (!keys || !keys.length || t < keys[0][0]) return null
  let idx = 0
  for (let i = 0; i < keys.length; i++) if (keys[i][0] <= t) idx = i
  const prev = idx > 0 ? keys[idx - 1][1] : 0
  return lerp(prev, keys[idx][1], ease.inOutQuad(prog(t, keys[idx][0], keys[idx][0] + 0.9)))   // each step fills in 0.9 s
}
function drawMeter(x, t, keys, { cx = 540, cy = 1840, k = 1 } = {}) {
  const f = meterAt(keys, t)
  if (f === null) return
  const kk = pop01(t, keys[0][0], 0.32, 2) * k
  if (kk <= 0.01) return
  const W2 = 520, Hh = 34, n = 10, cw = W2 / n
  x.save(); x.translate(cx, cy); x.scale(kk, kk)
  x.font = `800 26px ${INTER}`; x.textBaseline = 'middle'
  x.textAlign = 'left'; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText('THRIVING', -W2 / 2 + 3, -44 + 3); x.fillStyle = ORANGE; x.fillText('THRIVING', -W2 / 2, -44)
  const pc = `${Math.round(f * 100)}%`
  x.textAlign = 'right'; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(pc, W2 / 2 + 3, -41); x.fillStyle = BONE; x.fillText(pc, W2 / 2, -44)
  R(x, INK, -W2 / 2 - 7, -Hh / 2 - 7, W2 + 14, Hh + 14); R(x, '#2a1f55', -W2 / 2, -Hh / 2, W2, Hh)
  const cells = f * n
  for (let i = 0; i < n; i++) {
    const part = clamp(cells - i)
    if (part <= 0.02) continue
    const c = i < 4 ? ORANGE : i < 8 ? PINK : GOLD
    R(x, c, -W2 / 2 + i * cw + 3, -Hh / 2 + 4, (cw - 6) * part, Hh - 8); R(x, 'rgba(255,255,255,0.35)', -W2 / 2 + i * cw + 3, -Hh / 2 + 4, (cw - 6) * part, 5)
  }
  if (f > 0.995) {
    const full = keys.find(kq => kq[1] >= 0.995)
    const hk = full ? pop01(t, full[0] + 0.85, 0.3, 3) : 1
    const c = 8 * hk, bx = W2 / 2 + 46
    x.fillStyle = INK
    HEART.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect(bx + (i - 3.5) * c - 2, (j - 3) * c - 2, c + 4, c + 4) }))
    x.fillStyle = '#ff5c8a'
    HEART.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect(bx + (i - 3.5) * c, (j - 3) * c, c, c) }))
  }
  x.restore()
}

// ── the warm rug (The Make-Up Talk floor), drawn over a set's floor
export function rug(x, { y = 1180, a = 1, col = '#3a2a5e' } = {}) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  x.fillStyle = INK; x.beginPath(); x.ellipse(540, y, 470, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(540, y - 4, 456, 60, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,179,154,0.25)'; x.beginPath(); x.ellipse(540, y - 4, 380, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(540, y - 4, 360, 38, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** the Make-Up Talk heart at (cx, cy): cracked until mendAt, mended (gold seams) after; k scales it */
export function mendHeart(x, t, cx, cy, cell, mendAt, { k = 1, glow = 0, wobble = 1 } = {}) {
  const mend = ease.inOutCubic(prog(t, mendAt - 0.5, mendAt))
  const crack = 1 + (t < mendAt - 0.5 ? 0.15 * Math.sin(t * 9) * wobble : 0)
  drawHeart(x, t, cx, cy + 6 * Math.sin(t * 2.4), cell, { crack, mend, k, glow: glow || (mend > 0.99 ? 0.6 + 0.3 * Math.sin(t * 4) : 0) })
}
/** a pixel tally / counter chip: "LABEL: n" */
export function tally(x, t, cx, cy, labelText, n, { col = RED, k = 1, bumpAt = -9 } = {}) {
  if (k <= 0.01) return
  const bump = t > bumpAt && t < bumpAt + 0.3 ? 1 + 0.25 * Math.sin(Math.PI * (t - bumpAt) / 0.3) : 1
  x.save(); x.translate(cx, cy); x.scale(k * bump, k * bump)
  x.font = `800 30px ${INTER}`
  const s = `${labelText}: ${n}`, w = x.measureText(s).width + 50
  R(x, INK, -w / 2 - 6, -34, w + 12, 68); R(x, col, -w / 2, -28, w, 56)
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
  x.restore()
}

// ═════════════════════════════════════════════════════════════════ the film
const KIT = {
  whip: [whipZoom, whipZoomCues], scratch: [recordScratch, recordScratchCues], slam: [slamTitle, slamTitleCues],
  shake: [screenShake, shakeCues], caught: [caught, caughtCues], call: [incomingCall, incomingCallCues],
  notif: [notification, notificationCues], loading: [loadingBar, loadingBarCues], countdown: [countdown, countdownCues],
  news: [newsDesk, newsDeskCues], hud: [gameHud, gameHudCues], ach: [achievement, achievementCues],
  chapter: [chapter, chapterCues], glitch: [glitch, glitchCues],
}

export function makeM47(cfg) {
  const DURATION = cfg.dur
  const END = DURATION
  const CPS = cfg.cps ?? 30
  const LOOP = cfg.ending === 'loop'
  const LINES = cfg.lines || []
  const BOXES = (cfg.boxes || [{ from: 0, to: LINES.length }]).map(b => ({ ...b, open: b.open ?? LINES[b.from].t - 0.22 }))
  const SHOTS = cfg.shots
  const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
  const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : END }
  const hopsFor = who => talkHops(LINES, who === 'stars' ? STARS : TAG(who), { cps: CPS })
  const accent = cfg.series === 'makeup' ? ROSE : ORANGE

  const HOOK = { k: 'slam', at: -1, top: 190, size: 112, accentColor: cfg.hook.color || accent, ...cfg.hook, out: [cfg.hook.out - 0.2, cfg.hook.out] }
  const CH = (cfg.chapters || []).map((c, n) => ({ k: 'chapter', n: n + 1, x: 60, y: 136, color: accent, out: [c.at + (c.len ?? 3.2), c.at + (c.len ?? 3.2) + 0.15], ...c }))
  const FXS = [HOOK, ...CH, ...(cfg.fx || [])]
  const RECS = FXS.filter(f => f.k === 'scratch')

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const cards = (cfg.cards || []).map(c => buildCard(root, { chip: accent, ...c }))
    const boxes = BOXES.map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1450, width: 960, height: b.h ?? 280, open: b.open, close: b.close, cps: CPS }))
    const pr = cfg.promise ? popText(root, cfg.promise.text, { top: cfg.promise.top ?? 1290, size: cfg.promise.size ?? 58, accentSize: 76, at: cfg.promise.at, gap: 0.05, accentColor: accent, fit: true, wobble: true }) : null
    const th = cfg.thrive ? popText(root, cfg.thrive.text, { top: cfg.thrive.top ?? 300, size: 92, accentSize: 140, at: cfg.thrive.at, gap: 0.1, late: 1, lateAt: cfg.thrive.at + 0.3, wobble: true, accentColor: ORANGE, fit: true }) : null
    const L = cfg.last
    const last = popText(root, L.text, { top: L.top ?? 300, size: L.size ?? 108, accentSize: L.accentSize ?? 160, at: L.at, gap: 0.08, accentColor: L.color ?? accent, wobble: true, late: L.late ?? 1, lateAt: L.at + 0.4, fit: true })
    const sub = cfg.build ? await cfg.build(root) : null
    buildBug(root, cfg.series)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: END + 0.01, root,
      update(t) {
        const sh = shotAt(t), i = SHOTS.indexOf(sh)
        const S = { u: t - sh.at, t0: sh.at, t1: nextAt(sh), i, hopsFor }
        x.save()
        const [z0, cx, cy] = sh.cam || [1, 540, 960]
        const zz = z0 * (1 + (sh.push ?? 0.035) * prog(t, sh.at, nextAt(sh))) * (sh.at > 0 && !sh.noPunch ? 1 + 0.05 * (1 - ease.outCubic(prog(t, sh.at, sh.at + 0.3))) : 1)
        const drift = sh.drift ?? 10
        x.translate(540 + drift * Math.sin(t * 0.37), 960 + drift * 0.6 * Math.sin(t * 0.29)); x.scale(zz, zz); x.translate(-cx, -cy)
        if (sh.set === 'sky' || !sh.set) skySet(x, t, sh.setOpts || {})
        else { drawSky(x, t, { ...SKY_H, dim: sh.dim ?? SKY_H.dim }); drawSet(x, t, sh.set, sh.setOpts || {}) }
        if (sh.rug) rug(x, typeof sh.rug === 'object' ? sh.rug : {})
        if (sh.draw) sh.draw(x, t, S)
        if (sh.pis) pisces(x, t, typeof sh.pis === 'function' ? sh.pis(t, S) : sh.pis)
        if (sh.front) sh.front(x, t, S)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(tx, t, S)
        if (cfg.meter) drawMeter(tx, t, cfg.meter, cfg.meterAt || {})
        for (const c of cards) c.update(t)
        for (const b of boxes) b.update(t)
        if (pr) pr.update(t, outK(t, cfg.promise.out))
        if (th) th.update(t, outK(t, [cfg.thrive.out ?? L.at - 0.25, (cfg.thrive.out ?? L.at - 0.25) + 0.2]))
        last.update(t, 1)
        if (sub) sub.update(t, S)
        let fl = 0
        for (const s of SHOTS) if (s.at > 0 && !s.noFlash && t >= s.at && t < s.at + 0.12) fl = Math.max(fl, 0.45 * (1 - (t - s.at) / 0.12))
        flash.style.opacity = String(fl)
        drawGrain(gx, t)
      },
    }
  }

  const MAIN = frozen(build, RECS)
  const layers = FXS.map(f => KIT[f.k][0](f))
  const frame0 = [MAIN, slamTitle(HOOK), ...FXS.filter(f => f.k === 'whip' && f.at < 0).map(f => whipZoom(f))]
  const SCENES = [MAIN, ...layers, ...(LOOP ? [loopBack(frame0, { duration: DURATION, len: cfg.loopLen ?? 0.45 })] : [])]

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const lastWords = cfg.last.text.split(/\s+/).filter(w => w !== '|').length
  const mk = cfg.meter || []
  const CUES = [
    ...FXS.flatMap(f => KIT[f.k][1](f)),
    ...SHOTS.filter(s => s.at > 0 && !s.noFlash).flatMap(s => [['whoosh', r3(s.at - 0.07), 0.26, 0.03], ['tick', r3(s.at), 0.04]]),
    ...(cfg.promise ? [['pop', r3(cfg.promise.at), 1318.51, 0.035, 0], ['glitter', r3(cfg.promise.at + 0.2), r3(cfg.promise.at + 0.6)]] : []),
    ...BOXES.map(b => ['pop', r3(b.open), 739.99, 0.03, 0]),
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: { [STARS]: 739.99 } }) : []),
    ...(cfg.cards || []).flatMap(c => [['whoosh', r3(c.at - 0.05), 0.4, 0.035], ['pluck', r3(c.at + 0.3), 1318.51, 0.035, 0.6, 0], ['bell', r3(c.at + 0.34), 1760, 0.02, 1.0, 0.2], ['whoosh', r3(c.out[0]), 0.3, 0.02]]),
    ...mk.flatMap(([a, v], n) => n === 0 ? [['pop', r3(a), 987.77, 0.03, 0.2]] : [['riser', r3(a), r3(a + 0.9), 0.02], ['pop', r3(a + 0.9), NOTE[Math.min(6, Math.round(v * 6))] * 2, 0.03, 0.2], ...(v >= 0.995 ? [['bell', r3(a + 0.92), 2349.32, 0.03, 1.0, 0.3], ['glitter', r3(a + 0.9), r3(a + 1.3)]] : [])]),
    ...(cfg.thrive ? [...wordPops(cfg.thrive.at, 1, 0.1, 0), ['pop', r3(cfg.thrive.at + 0.3), 1174.66, 0.045, 0], ['glitter', r3(cfg.thrive.at + 0.3), r3(cfg.thrive.at + 0.7)]] : []),
    ...wordPops(cfg.last.at, Math.max(1, lastWords - 1), 0.08, 2), ['pop', r3(cfg.last.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(cfg.last.at + 0.42), 1567.98, 0.025, 1.2, 0], ['glitter', r3(cfg.last.at + 0.4), r3(cfg.last.at + 0.8)],
    ...(LOOP ? loopCues({ duration: DURATION, len: cfg.loopLen ?? 0.45 }) : []),
    ...(cfg.cues || []).map(c => c.map((v, j) => (j === 1 || ((c[0] === 'glitter' || c[0] === 'riser') && j === 2)) && typeof v === 'number' ? r3(v) : v)),
  ].filter(c => c[1] >= 0 && c[1] < END)

  // checks (node only): every line ≥ 1.4 s readable after typing, ≤ 70 chars; no gap > 10 s without a new beat
  const warn = []
  BOXES.forEach(b => {
    const ls = LINES.slice(b.from, b.to), tm = lineTimes(ls, { cps: CPS })
    tm.forEach((m, n) => { const nxt = n + 1 < ls.length ? ls[n + 1].t : b.close; if (nxt - m.done < 1.4) warn.push(`${cfg.id}: line "${ls[n].text}" only ${(nxt - m.done).toFixed(2)} s after typing`) })
    ls.forEach(l => { if (l.text.replace(/\*/g, '').length > 70) warn.push(`${cfg.id}: line over 70 chars: ${l.text}`) })
  })
  const beats = [...SHOTS.map(s => s.at), ...LINES.map(l => l.t), ...FXS.map(f => f.at), ...(cfg.cards || []).map(c => c.at), ...(cfg.beats || []), ...mk.map(m => m[0]), cfg.last.at].filter(v => v >= 0).sort((a, b) => a - b)
  for (let n = 1; n < beats.length; n++) if (beats[n] - beats[n - 1] > 10) warn.push(`${cfg.id}: no new beat between ${beats[n - 1].toFixed(1)} and ${beats[n].toFixed(1)}`)
  if (END - cfg.last.at - 0.4 < 0.6) warn.push(`${cfg.id}: the last line lands too late`)
  if (typeof window === 'undefined' && warn.length) console.warn(warn.join('\n'))

  const music = (style, key, seed, extra = {}) => ({ id: cfg.id, duration: DURATION, music: { style, key, seed, sections: { outroAt: DURATION - (LOOP ? 0.5 : 1.0), ...(extra.sections || {}) }, hits: extra.hits || [] }, cues: CUES })
  return { DURATION, SCENES, CUES, LINES, BOXES, warn, music, LOOP }
}
