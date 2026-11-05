// xkit — the shared look of batch m45 (promo/films/month2/m45.md): "Ask the Stars: Extended" (kxase01–08, 75 s) and
// "Friends First: Extended" (kxffe01–04, 60 s). Lives in kxase01's folder; every film imports it read-only from
// '../../kxase01/xkit.js'.
//
// Month 2 rules: NO end card, NO card transition, no logo / wordmark / CTA. DURATION is the story length. The film
// ends on its last beat: a hard cut (the punchline holds ~0.8 s) or a seamless loop back into frame 0.
//
// It continues two older looks, imported read-only:
//   · Ask the Stars Volume 2 (naske01/askkit.js): the snowy night sky, the gold "ASK THE STARS" bug, the anonymous
//     DM question card, the answering sign's star, the astrology chip, ♓ Pisces crying with a tissue.
//   · Friends First (nffe01/scenes/friendskit.js): the sets (room, café, kitchen, bedroom, street, park, split, dinner),
//     the big phone, the CHECK-IN card, the orange "FRIENDS FIRST" bug.
// and builds on the Month 2 hook kit (promo/films/hookkit.js) for the frame-0 chaos, the pattern breaks, the chapter
// stickers and the loop-back.
//
//   makeX(cfg) → { DURATION, SCENES, CUES, LINES, warn, music(style, key, seed, extra) }
//     cfg.id, cfg.series ('ask' | 'friends'), cfg.dur, cfg.ending ('cut' | 'loop')
//     cfg.hook    { text, out, color, top, size }        the frame-0 hook line (≤ 7 words), already slammed at t = 0
//     cfg.promise { at, out, text }                     the payoff promise sticker ("wait for the answer")
//     cfg.chapters [{ at, title }]                      numbered chapter stickers (1 … 5)
//     cfg.dm      { at, out, text, top }                the viewer's question as a DM (Ask only)
//     cfg.chip    { at, out, text, color, top }         the astrology-as-a-lens chip
//     cfg.shots   [{ at, set, setOpts, cam: [z, cx, cy], push, draw(x, t, S), front(x, t, S), pis }]
//     cfg.lines / cfg.boxes                             dialogue (startalk dialogueBox)
//     cfg.cards   [{ at, out, text, label, top }]       CHECK-IN / talk-card style cards (the words to send)
//     cfg.last    { at, text, color, top }              the last line
//     cfg.fx      [{ kind: 'scratch' | 'whip' | 'shake' | 'flash', at, … }]  pattern breaks
//     cfg.overlay(x, t, S)                              top canvas painter (phones, HUDs, loading bars)
//     cfg.cues                                          extra sound cues
// Everything is a pure function of t; DOM and canvases are made only inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../startalk.js'
import { popText } from '../lesson.js'
import { drawSet, star, tissues, snow, R, box, label, glow } from '../nffe01/scenes/friendskit.js'
import { bigTears, starFrame } from '../naske01/askkit.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  caught, caughtCues, incomingCall, incomingCallCues, notification, notificationCues, loadingBar, loadingBarCues,
  countdown, countdownCues, newsDesk, newsDeskCues, gameHud, gameHudCues, achievement, achievementCues, chapter,
  chapterCues, glitch, glitchCues, loopBack, loopCues,
} from '../hookkit.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#8fd8f6', SNOW = '#f4f8ff'
export const FBUG = '#ffb37a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const r3 = v => +(+v).toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inR = (t, a, b) => t >= a && t < b
export { clamp, lerp, prog, ease, easeOutBack, signStar, drawPixelStar }
export const STARS = 'THE STARS'
export const NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const TAG = id => `${signStar(id).glyph}︎ ${NAME[id]}`
export const TAGCOL = { cancer: '#cfe4ff', capricorn: '#e9d9a8', gemini: '#ffe58a', taurus: '#b8f0c0', aquarius: '#a8ecff', leo: '#ffc38a', virgo: '#d6f0b0', scorpio: '#ffa8c0', sagittarius: '#ffb8a0', libra: '#ffc8ec', pisces: '#c8d8ff', aries: '#ffb0a0' }
export const say = (t, sign, text) => ({ t, speaker: TAG(sign), color: TAGCOL[sign], text })
export const stars = (t, text) => ({ t, speaker: STARS, text })

// ── re-exports of the old kits' drawing helpers (read-only)
export * from '../nffe01/scenes/friendskit.js'
export { crier, bigTears, starFrame, inSprite, spritePt, drawBits as drawBitsA, drawSign, drawBubble, drawBurst, sparkles as sparklesA, floatHeart, HEART as HEART_A, HEART_C, MUG, MUG_C } from '../naske01/askkit.js'

const FONTS = ["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 27px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "400 28px 'Space Mono'", "700 22px 'Space Mono'"]
async function loadFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

function richHTML(text, accent, accentScale = 1.12) {
  return text.split(' ').map(w => {
    if (w === '|') return '<br>'
    const acc = w.includes('*')
    const s = w.replace(/\*/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    return acc ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${accentScale}em;color:${accent};letter-spacing:0">${s}</span>` : s
  }).join(' ').replace(/ <br> /g, '<br>')
}

// ── the series bug, top-left 56 px (Inter 800 small caps, letter-spaced)
const BUG_IC = ['...W...', '.W.G.W.', '..GGG..', 'WGGGGGW', '..GGG..', '.W.G.W.', '...W...']
function buildBug(root, series) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  if (series === 'ask') {
    const ic = el('canvas', { width: '42px', height: '42px', imageRendering: 'pixelated' }, b)
    ic.width = 42; ic.height = 42
    const c = ic.getContext('2d'); BUG_IC.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; c.fillStyle = ch === 'G' ? GOLD : SNOW; c.fillRect(i * 6, j * 6, 6, 6) }))
    el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'ASK&nbsp;THE&nbsp;STARS')
  } else {
    el('div', { width: '18px', height: '18px', background: FBUG, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,122,0.7)` }, b)
    el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: FBUG, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'FRIENDS<span style="color:rgba(255,255,255,0.7)">&nbsp;FIRST</span>')
  }
  return b
}

// ── the viewer's question as a DM notification (the Volume 2 frosted card), buzzing in at `at`
const ENV = ['GGGGGGGGG', 'GBGGGGGBG', 'GBBGGGBBG', 'GBGBGBGBG', 'GBBGBGBBG', 'GBBBBBBBG', 'GGGGGGGGG']
function dmCard(parent, { text, accent = GOLD, at, out, top = 400, size = 76, head = 'NEW QUESTION', sub = 'asked anonymously' }) {
  const root = el('div', { position: 'absolute', left: '60px', top: top + 'px', width: (W - 120) + 'px', transformOrigin: '50% 0%', display: 'none' }, parent)
  el('div', { position: 'absolute', inset: '0', borderRadius: '40px', background: 'linear-gradient(180deg, rgba(40,34,92,0.96), rgba(20,15,52,0.96))',
    border: '3px solid rgba(214,236,255,0.38)', boxShadow: '0 18px 60px rgba(4,2,14,0.75), inset 0 2px 0 rgba(255,255,255,0.1)' }, root)
  el('div', { position: 'absolute', left: '26px', right: '26px', top: '-9px', height: '18px', borderRadius: '9px',
    background: 'repeating-linear-gradient(90deg, #eef7ff 0 22px, #cfe6ff 22px 30px, #eef7ff 30px 44px, transparent 44px 52px)', opacity: '0.9' }, root)
  const hd = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '18px', padding: '30px 40px 0 40px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: GOLD }, root)
  const ic = el('canvas', { width: '63px', height: '49px', imageRendering: 'pixelated', flex: '0 0 auto' }, hd)
  ic.width = 63; ic.height = 49
  { const c = ic.getContext('2d'); ENV.forEach((r, j) => [...r].forEach((ch, i) => { c.fillStyle = ch === 'G' ? GOLD : '#2a1d5c'; c.fillRect(i * 7, j * 7, 7, 7) })) }
  el('div', { flex: '1 1 auto' }, hd, head)
  el('div', { font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, hd, 'now')
  el('div', { position: 'relative', padding: '6px 40px 0 121px', font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, root, sub)
  el('div', { position: 'relative', padding: '14px 44px 40px 44px', fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight: 1.04, color: BONE, letterSpacing: '-0.015em',
    textShadow: '0 3px 0 rgba(6,4,18,0.7)' }, root, richHTML(text, accent))
  return {
    update(t) {
      const o = outK(t, out), show = t >= at && o > 0
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.4), 2)
      const buzz = t - at < 1.6 ? Math.sin((t - at) * 46) * 7 * Math.exp(-(t - at) * 1.5) : 0
      root.style.opacity = String(clamp(p * 2) * o)
      root.style.transform = `translate(${buzz.toFixed(2)}px, ${((1 - o) * -60).toFixed(1)}px) scale(${(lerp(0.7, 1, p) * lerp(0.86, 1, o)).toFixed(4)}) rotate(${(buzz * 0.08).toFixed(2)}deg)`
    },
  }
}

// ── the astrology-as-a-lens chip (a pill; rows split by '|')
function noteChip(parent, { text, color = GOLD, top = 1300, at, out, size = 29 }) {
  const root = el('div', { position: 'absolute', left: '0', width: W + 'px', top: top + 'px', display: 'none', justifyContent: 'center' }, parent)
  const pill = el('div', { padding: '13px 30px 12px', borderRadius: '999px', background: 'rgba(16,10,38,0.92)', border: `3px solid ${color}`, boxShadow: `0 0 26px ${color}55, 0 8px 30px rgba(4,2,14,0.7)`,
    font: `700 ${size}px ${MONO}`, letterSpacing: '0.06em', color: BONE, textAlign: 'center', lineHeight: 1.3, whiteSpace: 'nowrap' }, root,
    text.split('|').join('<br>').replace(/^(\S+)/, `<span style="font-family:${GLYPH};font-size:1.25em;color:${color};margin-right:0.3em;vertical-align:-0.06em">$1</span>`))
  return {
    update(t) {
      const o = outK(t, out), show = t >= at && o > 0
      root.style.display = show ? 'flex' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.36), 2.6)
      pill.style.opacity = String(clamp(p * 3) * o)
      pill.style.transform = `scale(${(lerp(0.4, 1, p) * lerp(0.8, 1, o)).toFixed(4)}) rotate(${((1 - p) * -5).toFixed(2)}deg)`
    },
  }
}

// ── a talk-card style card (bone, ink border, a chip on top, the words in Garamond italic)
function buildCard(root, { at, out, text, label: lab = 'CHECK-IN', top = 470, accent = '#c0577a', chip = FBUG, size = 62, width = 780 }) {
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
      card.style.opacity = String(clamp(prog(t, at, at + 0.12) * 1.5) * o)
      card.style.transform = `translateY(${(fl * 160 - (1 - o) * 60).toFixed(1)}px) rotate(${(-3 + 4 * fl).toFixed(2)}deg) scale(${(lerp(0.5, 1, k) * lerp(0.85, 1, o)).toFixed(4)})`
    },
  }
}

// ── the snowy night sky set (the Ask the Stars look): sky + falling snow + a soft snow bank
export function skySet(x, t, { bank = 1205, dim = 0.78, n = 46 } = {}) {
  drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * dim })
  snow(x, t, { n, speed: 55, cell: 6, alpha: 0.75 })
  if (bank) {
    const g = x.createLinearGradient(0, bank - 40, 0, 1920)
    g.addColorStop(0, 'rgba(226,236,255,0.9)'); g.addColorStop(0.08, 'rgba(178,196,236,0.55)'); g.addColorStop(0.4, 'rgba(60,62,120,0.25)'); g.addColorStop(1, 'rgba(20,16,50,0)')
    x.fillStyle = g
    x.beginPath(); x.moveTo(0, 1920); x.lineTo(0, bank + 10)
    for (let i = 0; i <= 27; i++) x.lineTo(i * 40, Math.round((bank + Math.sin(i * 0.9) * 14 + Math.sin(i * 2.3) * 6) / 6) * 6)
    x.lineTo(1080, 1920); x.closePath(); x.fill()
  }
}

/** ♓ Pisces with tears (k 1…3, chunky canvas tears too) and a tissue; returns the sprite frame */
export function pisces(x, t, { x: px = 930, y = 1250, s = 130, tears = 2, mood = 'sparkle', look = [-1, -0.5], tissue = true, hops = null, pop = 1, seed = 6 } = {}) {
  if (pop <= 0.01) return null
  if (tissue === 'box') tissues(x, px - s * 0.75, y + s * 0.28, s * 0.5)
  const o = { x: px, y, s: s * pop, mood, look, seed, glow: 0.8, tips: false, tears: Math.round(tears), hops }
  star(x, t, 'pisces', o)
  const F = starFrame(px, y, s * pop, t, { hops, seed })
  if (tears >= 2) bigTears(x, t, F, tears, pop)
  if (tissue === true) {
    x.save(); x.translate(px + s * 0.44, y + s * 0.06 + Math.sin(t * 3) * 4); x.rotate(0.3)
    const c = Math.max(4, Math.round(s / 26))
    R(x, INK, -c * 2.5, -c * 2.5, c * 5, c * 4); R(x, '#ffffff', -c * 1.5, -c * 1.5, c * 3, c * 2.2); R(x, '#ffffff', -c * 0.5, c * 0.6, c, c)
    x.restore()
  }
  return F
}

// ═════════════════════════════════════════════════════════════════ the film
// the hook-kit effects by short name: cfg.fx = [{ k: 'whip', at: -0.08 }, { k: 'scratch', at: 0.6, len: 1.3, caption }, …]
const KIT = {
  whip: [whipZoom, whipZoomCues], scratch: [recordScratch, recordScratchCues], slam: [slamTitle, slamTitleCues],
  shake: [screenShake, shakeCues], caught: [caught, caughtCues], call: [incomingCall, incomingCallCues],
  notif: [notification, notificationCues], loading: [loadingBar, loadingBarCues], countdown: [countdown, countdownCues],
  news: [newsDesk, newsDeskCues], hud: [gameHud, gameHudCues], ach: [achievement, achievementCues],
  chapter: [chapter, chapterCues], glitch: [glitch, glitchCues],
}

export function makeX(cfg) {
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
  const accent = cfg.series === 'ask' ? GOLD : FBUG

  // the hook-kit layer list: the hook slam, the chapter stickers, the promise sticker, then cfg.fx
  const HOOK = { k: 'slam', at: -1, top: 190, size: 112, accentColor: cfg.hook.color || accent, ...cfg.hook, out: [cfg.hook.out - 0.2, cfg.hook.out] }
  const CH = (cfg.chapters || []).map((c, n) => ({ k: 'chapter', n: n + 1, x: 60, y: 136, color: accent, out: [c.at + (c.len ?? 3.2), c.at + (c.len ?? 3.2) + 0.15], ...c }))
  const FXS = [HOOK, ...CH, ...(cfg.fx || [])]
  const RECS = FXS.filter(f => f.k === 'scratch')

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const dm = cfg.dm ? dmCard(root, { ...cfg.dm, accent: cfg.dm.accent || accent }) : null
    const chip = cfg.chip ? noteChip(root, cfg.chip) : null
    const cards = (cfg.cards || []).map(c => buildCard(root, { chip: accent, ...c }))
    const boxes = BOXES.map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1450, width: 960, height: b.h ?? 280, open: b.open, close: b.close, cps: CPS }))
    const pr = cfg.promise ? popText(root, cfg.promise.text, { top: cfg.promise.top ?? 1290, size: cfg.promise.size ?? 58, accentSize: 76, at: cfg.promise.at, gap: 0.05, accentColor: accent, fit: true, wobble: true }) : null
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
        x.translate(540, 960); x.scale(zz, zz); x.translate(-cx, -cy)
        if (sh.set === 'sky' || !sh.set) skySet(x, t, sh.setOpts || {})
        else { drawSky(x, t, { ...SKY_H, dim: sh.dim ?? SKY_H.dim }); drawSet(x, t, sh.set, sh.setOpts || {}) }
        if (sh.draw) sh.draw(x, t, S)
        if (sh.pis) pisces(x, t, typeof sh.pis === 'function' ? sh.pis(t, S) : sh.pis)
        if (sh.front) sh.front(x, t, S)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(tx, t, S)
        if (dm) dm.update(t)
        if (chip) chip.update(t)
        for (const c of cards) c.update(t)
        for (const b of boxes) b.update(t)
        if (pr) pr.update(t, outK(t, cfg.promise.out))
        last.update(t, 1)
        if (sub) sub.update(t, S)
        // a white blink on every hard cut between shots (no card transition)
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
  const CUES = [
    ...FXS.flatMap(f => KIT[f.k][1](f)),
    ...SHOTS.filter(s => s.at > 0 && !s.noFlash).flatMap(s => [['whoosh', r3(s.at - 0.07), 0.26, 0.03], ['tick', r3(s.at), 0.04]]),
    ...(cfg.dm ? [['pop', r3(cfg.dm.at), 987.77, 0.04, 0], ['tick', r3(cfg.dm.at + 0.1), 0.04], ['tick', r3(cfg.dm.at + 0.24), 0.035], ['whoosh', r3(cfg.dm.out[0]), 0.3, 0.03]] : []),
    ...(cfg.chip ? [['pluck', r3(cfg.chip.at), 1174.66, 0.04, 0.5, 0]] : []),
    ...(cfg.promise ? [['pop', r3(cfg.promise.at), 1318.51, 0.035, 0], ['glitter', r3(cfg.promise.at + 0.2), r3(cfg.promise.at + 0.6)]] : []),
    ...BOXES.map(b => ['pop', r3(b.open), 739.99, 0.03, 0]),
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: { [STARS]: 739.99 } }) : []),
    ...(cfg.cards || []).flatMap(c => [['whoosh', r3(c.at - 0.05), 0.4, 0.035], ['pluck', r3(c.at + 0.3), 1318.51, 0.035, 0.6, 0], ['bell', r3(c.at + 0.34), 1760, 0.02, 1.0, 0.2], ['whoosh', r3(c.out[0]), 0.3, 0.02]]),
    ...wordPops(cfg.last.at, Math.max(1, lastWords - 1), 0.08, 2), ['pop', r3(cfg.last.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(cfg.last.at + 0.42), 1567.98, 0.025, 1.2, 0], ['glitter', r3(cfg.last.at + 0.4), r3(cfg.last.at + 0.8)],
    ...(LOOP ? loopCues({ duration: DURATION, len: cfg.loopLen ?? 0.45 }) : []),
    ...(cfg.cues || []).map(c => c.map((v, j) => (j === 1 || ((c[0] === 'glitter' || c[0] === 'riser') && j === 2)) && typeof v === 'number' ? r3(v) : v)),
  ].filter(c => c[1] >= 0 && c[1] < END)

  // checks (node only): every line ≥ 1.5 s readable after typing, ≤ 70 chars; the punchline holds ≥ 0.6 s
  const warn = []
  BOXES.forEach(b => {
    const ls = LINES.slice(b.from, b.to), tm = lineTimes(ls, { cps: CPS })
    tm.forEach((m, n) => { const nxt = n + 1 < ls.length ? ls[n + 1].t : b.close; if (nxt - m.done < 1.5) warn.push(`${cfg.id}: line "${ls[n].text}" only ${(nxt - m.done).toFixed(2)} s after typing`) })
    ls.forEach(l => { if (l.text.replace(/\*/g, '').length > 70) warn.push(`${cfg.id}: line over 70 chars: ${l.text}`) })
  })
  if (END - cfg.last.at - 0.4 < 0.8) warn.push(`${cfg.id}: the last line lands too late`)
  if (typeof window === 'undefined' && warn.length) console.warn(warn.join('\n'))

  const music = (style, key, seed, extra = {}) => ({ id: cfg.id, duration: DURATION, music: { style, key, seed, sections: { outroAt: DURATION - (LOOP ? 0.5 : 1.0), ...(extra.sections || {}) }, hits: extra.hits || [] }, cues: CUES })
  return { DURATION, SCENES, CUES, LINES, BOXES, warn, music, LOOP }
}
