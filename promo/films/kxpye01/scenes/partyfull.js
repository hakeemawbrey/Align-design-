// YOUR SIGN AT THE PARTY: EXTENDED — the shared look of the six long star_talk posts kxpye01–kxpye06
// (promo/films/month2/m43.md). It continues "Your Sign at the Holiday Party" (npye01–12): the cozy room, string
// lights, the snowy window, party hats, the pink bug and the bone caption stickers. The room and props are imported
// read-only from ../../npye01/scenes/kit.js, the prop gags from ../../kxrke01/scenes/rankfull.js, the hook effects
// from ../../hookkit.js. No end card, no card transition, no logo (Month 2 rules); DURATION is the story.
//
// The format (DURATION ≈ 89 s):
//   0.00–4.00   hook: frame 0 is already mid-chaos (cfg.hook: a sign mid-leap / mid-trip / frozen…), the slam title
//               is landed, the crowd of signs is in the room; 1.3 the promise sticker (cfg.promise).
//   4.00–83.20  twelve sign moments, 6.6 s each, two per chapter (kit chapter stickers: 1 · THE DOOR …):
//               +0.00 cut (flash + zoom punch), the caption sticker ("SIGN 3 OF 12 · ♊ GEMINI" + the caption),
//               the sign forward and big; +0.45 its line; +3.00 the twist (prop gag, act change, a guest answers);
//               +6.30 out. The other signs mill in the background the whole film.
//   83.20–      the goodbye: all twelve wave by the door, Pisces fountains, THE STARS say the last line; hard cut
//               (or cfg.loop: the kit loop helper eases back into frame 0).
// Pisces cries in every film: in the corner with a tissue box all film, the hero of its own moment, fountains at the end.
//
//   makeParty(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.title ('Ugly sweater party. | Who *wins?*'), cfg.promise ('WAIT FOR THE WINNER'), cfg.chapters [6 titles]
//     cfg.hook: a moment-like object drawn 0–4 (see moment fields; act 'leap' | 'trip' | 'freeze' | 'spin' | 'dodge')
//     cfg.moments: 12 × { sign, cap, say, say2?, who2?, guest?: { sign | color, name, side: 'l' | 'r', mood },
//                         act?, act2?, mood?, mood2?, prop?, prop2?, dress?, confetti?, hearts?, crowd2? }
//     cfg.room: { wreath, wallSign, win, tint }   cfg.last (THE STARS, ≤ 44 chars)   cfg.loop (bool)
//     cfg.scenes / cfg.extraCues: extra hookkit effects for the episode.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { drawRoom, hatCells, scarfCells, starFrame, inSprite, tearsCells, tissues, cookie, plate, mug, mic, giftBox, clock } from '../../npye01/scenes/kit.js'
import { drawGag, bubble, label, R, box, drawBits, HEART } from '../../kxrke01/scenes/rankfull.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, chapter, chapterCues, drawRich, loopBack, loopCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#8fd3ff', LAV = '#c9a6ff'
export const BUG_PINK = '#ff7eb6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.32, s = 1.9) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

// ── the fixed timeline
const M0 = 4.0, ML = 6.6
export const T = { m0: M0, ml: ML, fin: M0 + 12 * ML, starsTalk: M0 + 12 * ML + 0.4 }
const mStart = i => r3(M0 + i * ML)
const CPS = 30

// ── layout
const HERO = { x: 540, y: 975, s: 300 }
const PIS_C = { x: 944, y: 1395, s: 138 }
const OFF = 140     // the room sits 140 px lower than npye's, so the stickers own the top band
const GAG_AT = { floor: [540, 1345], hold: [540, 700], side: [830, 930], left: [250, 930] }
const CREW = [[90, 1070], [195, 1090], [300, 1062], [395, 1085], [690, 1082], [790, 1062], [890, 1090], [995, 1068], [245, 1180], [835, 1185], [150, 1290]]

// ── extra party props (pixel, ink outlines)
function sweaterCells(ctx, a = '#d63a4a', b = '#2f8a4e') {
  ctx.fillStyle = INK; ctx.fillRect(7.2, 22.6, 21.6, 7.2)
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? a : b; ctx.fillRect(8 + i * 2, 23.2, 2, 6) }
  ctx.fillStyle = BONE; for (let i = 0; i < 5; i++) { ctx.fillRect(8.6 + i * 4, 25.4, 1, 1); ctx.fillRect(9.6 + i * 4, 26.4, 1, 1) }
}
function dog(x, t, cx, cy, s = 1, col = '#c9925a') {
  const wag = Math.sin(t * 14) > 0 ? 0 : 1
  drawBits(x, ['....DD..', '...DDDD.', 'DDDDKDDD', '.DDDDDD.', '.D.DD.D.'.replace(/\./g, '.')], { D: col, K: INK }, cx, cy, 16 * s)
  R(x, INK, cx + 60 * s, cy - 30 * s - wag * 8, 12 * s, 26 * s)
}
function partyProp(x, t, g, cx, cy, k, t0) {
  const u = Math.max(0, t - t0)
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  switch (g.kind) {
    case 'sweater': {   // a held-up ugly sweater { a, b, lights }
      const a = g.a || '#d63a4a', b = g.b || '#2f8a4e'
      box(x, cx - 120, cy - 90, 240, 200, a, { b: 6 }); box(x, cx - 175, cy - 80, 55, 150, a, { b: 6 }); box(x, cx + 120, cy - 80, 55, 150, a, { b: 6 })
      for (let i = 0; i < 8; i++) R(x, i % 2 ? b : BONE, cx - 120 + i * 30, cy - 20, 30, 24)
      drawBits(x, ['..W..', '.WWW.', 'WWWWW', '..B..'], { W: BONE, B: '#6b4a2f' }, cx, cy + 50, 12)
      if (g.lights) for (let i = 0; i < 7; i++) { const on = Math.floor(u * 6 + i) % 3 === 0; R(x, INK, cx - 105 + i * 35, cy - 75, 18, 18); R(x, on ? [GOLD, PINK, SKYB][i % 3] : '#555', cx - 101 + i * 35, cy - 71, 10, 10) }
      break
    }
    case 'cookies': plate(x, cx, cy + 40, 300); for (let i = 0; i < 3; i++) cookie(x, cx - 70 + i * 70, cy + 10 - (i === 1 ? 20 : 0), 34); break
    case 'soup': mug(x, t, cx - 20, cy, 120, g.col || '#e8344e'); for (let i = 0; i < 3; i++) { const p = (u * 0.8 + i / 3) % 1; x.save(); x.globalAlpha *= 1 - p; R(x, '#ffffff', cx - 50 + i * 26, cy - 90 - p * 90, 10, 26); x.restore() } break
    case 'mic': mic(x, cx, cy, -0.3 + 0.1 * Math.sin(u * 4), 1.6); break
    case 'gift': giftBox(x, t, cx, cy + 100, 200, 150, g.col || '#3f7cf0', g.rib || GOLD, { shake: u < 0.5 ? 6 : 0 }); break
    case 'dog': dog(x, t, cx, cy, 1.4, g.col); break
    case 'clock': clock(x, cx, cy, 80, g.h, (g.m || 0) + (g.spin ? u * g.spin : 0)); break
    case 'cake': {
      box(x, cx - 130, cy, 260, 100, '#fff1e6', { b: 6 }); R(x, PINK, cx - 130, cy, 260, 26); box(x, cx - 90, cy - 70, 180, 70, '#fff1e6', { b: 6 }); R(x, PINK, cx - 90, cy - 70, 180, 20)
      for (let i = 0; i < 3; i++) { R(x, INK, cx - 50 + i * 50 - 6, cy - 120, 12, 50); R(x, SKYB, cx - 50 + i * 50 - 3, cy - 117, 6, 44); const f = 0.8 + 0.2 * Math.sin(u * 20 + i); R(x, GOLD, cx - 50 + i * 50 - 5, cy - 140, 10, 18 * f) }
      break
    }
    case 'conga': {     // a line of tiny stars hopping across
      for (let i = 0; i < 6; i++) { const X = cx - 300 + ((u * 160 + i * 110) % 660); drawStarChar(x, X, cy - Math.abs(Math.sin(u * 8 + i)) * 16, 90, t, { color: [PINK, GOLD, SKYB, MINT, LAV, '#f0603a'][i], mood: 'happy', tips: false, glow: 0.4, seed: 20 + i }) }
      break
    }
    case 'box': {       // a moving box { text }
      box(x, cx - 140, cy - 80, 280, 180, '#c8955a', { b: 6 }); R(x, '#a9773f', cx - 140, cy - 80, 280, 30); R(x, '#e8d2a6', cx - 20, cy - 80, 40, 180)
      if (g.text) label(x, g.text, cx, cy + 40, { size: 36, col: INK, font: INTER, weight: 900 })
      break
    }
    case 'keys': for (let i = 0; i < 2; i++) { x.save(); x.translate(cx - 20 + i * 40, cy); x.rotate(-0.5 + i + 0.2 * Math.sin(u * 6)); box(x, -18, -60, 36, 36, GOLD, { b: 5 }); R(x, INK, -6, -50, 12, 12); box(x, -6, -24, 12, 80, GOLD, { b: 5 }); R(x, GOLD, 6, 30, 16, 8); R(x, GOLD, 6, 46, 12, 8); x.restore() } break
    case 'ring': {
      box(x, cx - 90, cy - 30, 180, 110, '#7a2440', { b: 6 }); box(x, cx - 90, cy - 100, 180, 60, '#962c50', { b: 6 })
      x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(cx, cy - 10, 30, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 8; x.stroke(); x.restore()
      drawPixelStar(x, cx, cy - 46, 30 + 6 * Math.sin(u * 8), 2, '#dff4ff')
      break
    }
    case 'portrait': {  // { col, glyph }
      box(x, cx - 130, cy - 160, 260, 320, '#c8a46a', { b: 6 }); R(x, '#2b1b48', cx - 104, cy - 134, 208, 268)
      drawStarChar(x, cx, cy + 10, 190, t, { color: g.col || '#f0a020', mood: 'sparkle', look: [0, 0], tips: false, glow: 0.5, seed: 31 })
      break
    }
    case 'boombox': {
      box(x, cx - 160, cy - 70, 320, 150, '#3a3352', { b: 6 }); R(x, '#5a5470', cx - 100, cy - 100, 200, 22)
      for (const X of [-90, 90]) { const p = 1 + 0.12 * Math.max(0, Math.sin(u * 13)); x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx + X, cy + 4, 50 * p, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8a84a8'; x.beginPath(); x.arc(cx + X, cy + 4, 30 * p, 0, Math.PI * 2); x.fill(); x.restore() }
      for (let i = 0; i < 3; i++) label(x, '♪', cx - 60 + i * 60 + Math.sin(u * 3 + i) * 20, cy - 130 - ((u * 60 + i * 30) % 80), { size: 44, col: [GOLD, PINK, SKYB][i], font: INTER })
      break
    }
    case 'trophy': {
      drawBits(x, ['GGGGGGG', 'GGGGGGG', '.GGGGG.', '..GGG..', '...G...', '..BBB..'], { G: GOLD, B: '#8a5a2a' }, cx, cy, 30)
      label(x, g.text || '#1', cx, cy - 40, { size: 40, col: INK, font: INTER, weight: 900 })
      for (let i = 0; i < 6; i++) drawPixelStar(x, cx + Math.cos(i + u * 2) * 170, cy + Math.sin(i * 1.3 + u * 2) * 120, 20, 1, BONE)
      break
    }
    case 'couch': {
      box(x, cx - 200, cy - 40, 400, 110, g.col || '#7a5ab8', { b: 6 }); box(x, cx - 200, cy - 110, 400, 80, g.col || '#7a5ab8', { b: 6 })
      box(x, cx - 230, cy - 70, 40, 140, '#5c4290', { b: 6 }); box(x, cx + 190, cy - 70, 40, 140, '#5c4290', { b: 6 }); R(x, INK, cx - 180, cy + 76, 20, 30); R(x, INK, cx + 160, cy + 76, 20, 30)
      break
    }
    case 'projector': {
      for (let i = 0; i < 18; i++) drawPixelStar(x, cx + Math.cos(i * 2.4 + u * 0.4) * (90 + (i * 37) % 260), cy - 120 + Math.sin(i * 1.7 + u * 0.4) * (60 + (i * 23) % 140), 16 + (i % 3) * 8, i % 2 ? 1 : 2, [GOLD, SKYB, PINK, BONE][i % 4])
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy + 120, 56, Math.PI, 0); x.fill(); x.fillStyle = '#2a3a6e'; x.beginPath(); x.arc(cx, cy + 120, 48, Math.PI, 0); x.fill(); x.restore()
      for (let i = 0; i < 5; i++) R(x, GOLD, cx - 30 + i * 14, cy + 90 - (i % 2) * 8, 6, 6)
      break
    }
    case 'table': {     // a wobbly table { fixed }
      const wob = g.fixed && u > 1.2 ? 0 : 0.06 * Math.sin(u * 18)
      x.save(); x.translate(cx, cy + 80); x.rotate(wob); box(x, -170, -110, 340, 30, '#8a5a3a', { b: 6 }); R(x, INK, -150, -80, 22, 110); R(x, INK, 128, -80, 22, 110 - (g.fixed && u > 1.2 ? 0 : 14)); x.restore()
      break
    }
    case 'door': {      // a doorway with snow outside
      R(x, INK, cx - 140, cy - 260, 280, 420); R(x, '#1a2a52', cx - 124, cy - 244, 248, 404)
      for (let i = 0; i < 14; i++) R(x, '#ffffff', cx - 120 + ((i * 71) % 240), cy - 240 + (((i * 53) % 380) + u * 90) % 380, 6, 6)
      R(x, '#e6eef9', cx - 124, cy + 110, 248, 50)
      break
    }
    default: x.restore(); drawGag(x, t, g, cx, cy, k, t0); return
  }
  x.restore()
  if (g.label) label(x, g.label.toUpperCase(), cx, cy + (g.labelDy ?? 150) * k, { size: 30, col: g.labelCol || GOLD, alpha: clamp(k) })
}
export { partyProp }

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeParty(cfg) {
  if (!cfg.moments || cfg.moments.length !== 12) throw new Error(`${cfg.id}: needs 12 moments`)
  const signs = new Set(cfg.moments.map(m => m.sign))
  if (signs.size !== 12) throw new Error(`${cfg.id}: every sign once`)
  const MOM = cfg.moments.map((m, i) => ({ i, ...m, ...signStar(m.sign), name: m.sign.toUpperCase(), t0: mStart(i), t1: mStart(i + 1) }))
  const PIS = signStar('pisces')
  const LINES = [{ t: T.starsTalk, speaker: 'THE STARS', text: cfg.last }]
  const lineDone = T.starsTalk + cfg.last.replace(/\*/g, '').length / CPS + 0.4
  const DURATION = r3(Math.max(lineDone + 1.7, 88.6))
  const STARS_HOPS = [T.fin + 0.1, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const HOOK = { at: -1, text: cfg.title, top: 250, size: 96, width: 960, out: [3.55, 3.85] }
  const WHIP = { at: 0.3, len: 0.42, from: 1.4 }
  const CHAPS = cfg.chapters.map((title, i) => ({ at: mStart(i * 2), out: [mStart(i * 2 + 2) - 0.25, mStart(i * 2 + 2) - 0.05], n: i + 1, title, x: 64, y: 128, color: [GOLD, PINK, MINT, SKYB, LAV, GOLD][i] }))
  const cur = t => { for (const m of MOM) if (t >= m.t0 && t < m.t1) return m; return null }

  async function build(stage) {
    try { await Promise.all(["800 46px Inter", "900 70px Inter", "800 36px Inter", "italic 500 60px 'EB Garamond'", "700 26px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const ui = layerCanvas(root, { pointerEvents: 'none' }), u = ui.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1500, open: T.starsTalk - 0.2, close: DURATION + 1, cps: CPS })
    // the bug (npye look: pink, small caps)
    const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
    el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
    el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.18em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
      `YOUR&nbsp;SIGN<span style="color:rgba(255,255,255,0.6)">&nbsp;AT&nbsp;THE&nbsp;PARTY</span>`)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const room = cfg.room || {}

    function shadow(cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
    /** a star with a party hat (and optional dress / tears), rotation and alpha */
    function star(t, o) {
      const opts = { color: o.color, glyph: o.s >= 150 ? o.glyph : null, mood: o.mood || 'happy', look: o.look, hops: o.hops, seed: o.seed || 1, glow: o.glow ?? 0.9, pop: o.pop ?? 1, squash: o.squash || 0, tips: o.s >= 150, alpha: o.alpha ?? 1, bob: o.bob }
      x.save()
      if (o.rot) { x.translate(o.x, o.y); x.rotate(o.rot); x.translate(-o.x, -o.y) }
      drawStarChar(x, o.x, o.y, o.s, t, opts)
      const F = starFrame(o.x, o.y, o.s, t, opts)
      if (o.dress === 'sweater') inSprite(x, F, () => sweaterCells(x, o.sw?.[0], o.sw?.[1]))
      if (o.dress === 'scarf') inSprite(x, F, () => scarfCells(x))
      if (o.hat !== false) inSprite(x, F, () => hatCells(x, o.hatCol || PINK, o.hatStripe || GOLD, o.hatTilt || 0.12))
      if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
      x.restore()
      return F
    }
    const crewHatCols = [MINT, GOLD, SKYB, PINK, LAV, '#ff9a5a']
    function crowd(t, exclude, react) {
      const others = SIGN_IDS.filter(s => !exclude.includes(s))
      others.forEach((s, i) => {
        const [X, Y] = CREW[i % CREW.length], c = signStar(s)
        const per = 1.3 + (i % 4) * 0.25, ph = i * 0.41
        const hops = react && t > react ? [react + i * 0.05, react + 0.5 + i * 0.05] : [Math.floor((t + ph) / per) * per - ph]
        shadow(X, Y + 50, 90, 0.25)
        star(t, { x: X + Math.sin(t * 0.7 + i) * 10, y: Y, s: 104, color: c.color, mood: react && t > react ? 'happy' : ['happy', 'neutral', 'wink', 'happy', 'squint'][i % 5], seed: 40 + i, glow: 0.5, hatCol: crewHatCols[i % 6], hops, look: [Math.sin(t * 0.5 + i) > 0 ? 0.6 : -0.6, 0] })
      })
    }
    function pisCorner(t, k = 1, tears = 2) {
      if (k <= 0.01) return
      tissues(x, PIS_C.x - 110, PIS_C.y + 66, 70)
      shadow(PIS_C.x, PIS_C.y + 86, 130)
      star(t, { ...PIS_C, color: PIS.color, glyph: PIS.glyph, mood: 'wide', look: [-0.8, -0.4], seed: 6, pop: k, tears, hatCol: SKYB, hops: [Math.floor(t / 2.3) * 2.3] })
    }

    /** the hero of a moment (or the hook): position / motion by act */
    function hero(t, m, lt, LT) {
      const act = lt >= 3.0 && m.act2 ? m.act2 : (m.act || 'hop')
      const at = lt >= 3.0 && m.act2 ? 3.0 : 0
      const a = lt - at
      let X = HERO.x, Y = HERO.y, rot = 0, squash = 0, hops = [], s = m.s || HERO.s
      const T0 = t - lt
      switch (act) {
        case 'leap': { const p = ease.outCubic(clamp(a / 0.55)); X = lerp(m.from ?? 780, HERO.x, p); Y = HERO.y - Math.sin(Math.PI * clamp(0.5 + a / 1.1)) * 160 * (1 - p); squash = a < 0.5 ? -0.1 : 0; hops = [T0 + at + 0.55, T0 + at + 1.3]; break }
        case 'trip': { const p = clamp(a / 0.7); rot = lerp(0.55, 0, ease.outBack(p)); X = lerp(420, HERO.x, ease.outCubic(p)); Y = HERO.y + lerp(30, 0, p); hops = [T0 + at + 0.7]; break }
        case 'spin': rot = Math.sin(a * 9) * 0.35 * Math.exp(-a * 0.4) + (a < 0.6 ? (0.6 - a) * 2 : 0); hops = [T0 + at, T0 + at + 0.8]; break
        case 'dance': hops = Array.from({ length: 14 }, (_, i) => T0 + at + i * 0.42); squash = 0.05 * Math.sin(a * 15); X += Math.sin(a * 7.5) * 40; break
        case 'sway': X += Math.sin(a * 2.4) * 30; rot = Math.sin(a * 2.4) * 0.08; break
        case 'shiver': X += Math.sin(a * 60) * 6; break
        case 'freeze': break
        case 'laps': X = 540 + Math.sin(a * 2.2) * 380; rot = Math.cos(a * 2.2) * 0.15; hops = Array.from({ length: 10 }, (_, i) => T0 + at + i * 0.3); break
        case 'walkin': { const p = ease.outCubic(clamp(a / 0.8)); X = lerp(m.from ?? -160, HERO.x, p); hops = [0, 0.2, 0.4, 0.6].map(h => T0 + at + h); break }
        case 'dodge': { X = HERO.x + lerp(180, 0, ease.outBack(clamp(a / 0.6))); rot = lerp(-0.4, 0, ease.outCubic(clamp(a / 0.6))); hops = [T0 + at + 0.6]; break }
        case 'carry': hops = [T0 + at, T0 + at + 0.4, T0 + at + 0.8, T0 + at + 1.2]; rot = Math.sin(a * 8) * 0.05; break
        case 'sleepy': break
        case 'cheer': hops = Array.from({ length: 8 }, (_, i) => T0 + at + i * 0.36); break
        default: hops = [T0 + at + 0.02, T0 + at + 0.5]; break
      }
      if (m.x != null) X += m.x
      const mood = lt >= 3.0 && m.mood2 ? m.mood2 : (m.mood || (act === 'freeze' ? 'wide' : 'happy'))
      const isPis = m.sign === 'pisces'
      const k = LT ? pop01(lt, 0, 0.3, 2.0) * (1 - ease.inQuad(prog(lt, ML - 0.28, ML))) : 1
      shadow(X, Y + s * 0.5, s * 0.8 * k)
      star(t, { x: X, y: Y, s, color: m.color, glyph: m.glyph, mood, look: m.look || [0, 0], hops, rot, squash, seed: 3 + m.i, pop: k, dress: m.dress, sw: m.sw, tears: isPis ? 3 : 0, hatCol: m.hatCol || [PINK, GOLD, MINT, SKYB][(m.i ?? 0) % 4], glow: 1.1, bob: act === 'freeze' ? 0 : undefined })
      return { X, Y, s, k }
    }
    function guest(t, m, lt) {
      const g = m.guest; if (!g) return null
      const show = g.from ?? 0
      if (lt < show) return null
      const k = pop01(lt, show, 0.3, 2) * (1 - ease.inQuad(prog(lt, ML - 0.28, ML)))
      const X = g.side === 'l' ? 210 : 870, Y = 1010, s = g.s || 200
      const col = g.sign ? signStar(g.sign).color : g.color
      shadow(X, Y + s * 0.5, s * 0.8 * k)
      star(t, { x: X, y: Y, s, color: col, glyph: g.sign ? signStar(g.sign).glyph : null, mood: lt >= 3 && g.mood2 ? g.mood2 : (g.mood || 'happy'), look: [g.side === 'l' ? 1 : -1, 0], seed: 9, pop: k, hops: [t - lt + show, t - lt + 3.05], hatCol: g.hat === false ? undefined : LAV, hat: g.hat !== false, dress: g.dress, sw: g.sw, tears: g.sign === 'pisces' ? 3 : 0 })
      return { X, Y, s, k }
    }
    function propAt(t, g, lt, t0) {
      if (!g) return
      const show = g.from ?? 0
      if (lt < show) return
      const [cx, cy] = g.pos ? g.pos : GAG_AT[g.at || 'floor']
      const k = pop01(lt, show, 0.3, 2.2) * (1 - ease.inQuad(prog(lt, ML - 0.3, ML)))
      partyProp(x, t, g, cx, cy, k * (g.k || 0.9), t0 + show)
    }
    function moment(t, m) {
      const lt = t - m.t0
      const H = hero(t, m, lt, true)
      const G = guest(t, m, lt)
      propAt(t, m.prop, lt, m.t0)
      if (m.prop2) propAt(t, { from: 3.0, ...m.prop2 }, lt, m.t0)
      // bubbles
      const b1 = pop01(lt, 0.45, 0.25, 2.4) * (1 - ease.inQuad(prog(lt, (m.say2 ? 3.0 : ML - 0.4), (m.say2 ? 3.2 : ML - 0.25))))
      if (m.say) bubble(x, clamp(H.X, 300, 780), 760, m.say, b1, { size: 40, who: m.name, whoCol: m.color })
      if (m.say2) {
        const b2 = pop01(lt, 3.2, 0.25, 2.4) * (1 - ease.inQuad(prog(lt, ML - 0.4, ML - 0.25)))
        const gx = G ? G.X : clamp(H.X, 300, 780)
        bubble(x, clamp(gx, 300, 780), G ? 760 : 760, m.say2, b2, { size: 40, who: m.who2 || (G ? m.guest.name : m.name), whoCol: G ? (m.guest.sign ? signStar(m.guest.sign).color : m.guest.color) : m.color, col: G ? '#ffe1ea' : BONE })
      }
      if (m.confetti) confetti(t, m.t0 + 3.0, 540, 700)
      if (m.hearts) hearts(t, m.t0 + 3.1, H.X, H.Y - 120)
    }
    function confetti(t, t0, cx, cy, n = 32) {
      const tt = t - t0; if (tt < 0 || tt > 2.4) return
      x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 2.4)
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.6, v = 520 + 260 * ((i * 7) % 5) / 4
        const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 640 * tt * tt
        x.fillStyle = [GOLD, PINK, SKYB, MINT, BONE][i % 5]; x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-7, -3, 14, 7); x.restore()
      }
      x.restore()
    }
    function hearts(t, t0, cx, cy) {
      for (let i = 0; i < 6; i++) { const p = (t - t0 - i * 0.15) / 1.5; if (p < 0 || p > 1) continue; drawBits(x, HEART, { H: ['#ff5c8a', PINK, GOLD][i % 3] }, cx + Math.sin(i * 2.3) * 120, cy - p * 220, 7, { alpha: 1 - ease.inQuad(p) }) }
    }
    function sticker(t, m) {
      const lt = t - m.t0
      const k = pop01(lt, 0.08, 0.28, 2.4) * (1 - ease.inQuad(prog(lt, ML - 0.3, ML - 0.1)))
      if (k <= 0.01) return
      u.save(); u.translate(540, 330); u.rotate(-0.025 + 0.004 * Math.sin(t * 2)); u.scale(k, k)
      const w = 960, h = 150
      u.fillStyle = INK; u.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); u.fillStyle = '#fff8ea'; u.fillRect(-w / 2, -h / 2, w, h)
      // badge: the sign colour + glyph
      u.fillStyle = INK; u.beginPath(); u.arc(-w / 2 + 70, 0, 50, 0, Math.PI * 2); u.fill(); u.fillStyle = m.color; u.beginPath(); u.arc(-w / 2 + 70, 0, 44, 0, Math.PI * 2); u.fill()
      u.font = `700 46px 'EB Garamond', 'Noto Sans Symbols 2', serif`; u.fillStyle = INK; u.textAlign = 'center'; u.textBaseline = 'middle'; u.fillText(m.glyph, -w / 2 + 70, 4)
      u.font = `700 22px ${MONO}`; u.textAlign = 'left'; u.fillStyle = 'rgba(27,18,54,0.6)'; u.fillText(`SIGN ${m.i + 1} OF 12 · ${m.name}`, -w / 2 + 140, -h / 2 + 30)
      drawRich(u, m.cap, -w / 2 + 140, -h / 2 + 56, { size: 46, accentSize: 54, color: INK, accentColor: '#c2185b', maxW: w - 170, shadow: false, align: 'left' })
      u.restore()
    }
    function promise(t) {
      const t0 = 1.3, t1 = 3.95
      if (t < t0 || t > t1) return
      const k = pop01(t, t0, 0.3, 2.8) * (1 - ease.inQuad(prog(t, t1 - 0.25, t1)))
      u.save(); u.translate(cfg.promiseX || 560, cfg.promiseY || 1610); u.rotate(-0.05 + 0.03 * Math.sin(t * 7)); u.scale(k, k)
      const txt = cfg.promise
      u.font = `900 46px ${INTER}`
      const w = u.measureText(txt).width + 60
      u.fillStyle = INK; u.fillRect(-w / 2 - 7, -45, w + 14, 90); u.fillStyle = GOLD; u.fillRect(-w / 2, -38, w, 76)
      u.fillStyle = INK; u.textAlign = 'center'; u.textBaseline = 'middle'; u.fillText(txt, 0, 3)
      u.restore()
    }
    function finale(t) {
      const lt = t - T.fin
      const row = [...SIGN_IDS.filter(s => s !== 'pisces')]
      row.forEach((s, i) => {
        const X = 90 + (i % 6) * 180, Y = i < 6 ? 880 : 1040, c = signStar(s)
        const k = pop01(lt, 0.05 + i * 0.04, 0.3, 2)
        shadow(X, Y + 62, 110 * k, 0.25)
        star(t, { x: X, y: Y, s: 128, color: c.color, mood: 'happy', seed: 60 + i, pop: k, hops: [T.fin + 0.1 + i * 0.04, T.fin + 1.2 + (i % 3) * 0.3, T.fin + 2.6 + (i % 4) * 0.25, T.fin + 4.2 + (i % 2) * 0.3], hatCol: crewHatCols[i % 6], glow: 0.6 })
      })
      const k = pop01(lt, 0.0, 0.35, 2.2)
      shadow(540, 1305, 190 * k)
      star(t, { x: 540, y: 1210, s: 210, color: PIS.color, glyph: PIS.glyph, mood: 'sparkle', look: [0, 0], seed: 6, pop: k, tears: 3, hatCol: SKYB, hops: [T.fin + 0.2, T.fin + 1.6, T.fin + 3.0] })
      confetti(t, T.fin + 0.1, 540, 760, 44)
      if (room.door !== false) partyProp(x, t, { kind: 'door' }, 900, 640, 0.6 * pop01(lt, 0, 0.3, 2), T.fin)
      // THE STARS pop in above the box
      const sk = pop01(t, T.starsTalk - 0.5, 0.35, 2.2)
      drawStarChar(x, 170, 1190, 150, t, { color: STAR.sky, mood: 'happy', look: [1, 0], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const m = cur(t)
        // camera: a punch on each cut, a slow drift inside a moment
        let zoom = 1, dx = 0
        if (m) { const lt = t - m.t0; zoom = 1 + 0.07 * Math.exp(-lt * 9) + 0.025 * prog(lt, 0, ML); dx = (m.i % 2 ? 1 : -1) * 18 * prog(lt, 0, ML) }
        else if (t >= T.fin) zoom = 1 + 0.03 * prog(t, T.fin, DURATION)
        else zoom = 1.02
        x.save(); x.translate(540 + dx, 960); x.scale(zoom, zoom); x.translate(-540, -960)
        x.fillStyle = '#1d1236'; x.fillRect(-60, -60, 1200, OFF + 80)
        x.translate(0, OFF)
        drawRoom(x, t, { win: room.win !== false, wreathOn: room.wreath !== false, lightsY: 420, dim: room.dim || 0 })
        if (room.wallSign) partyProp(x, t, { kind: 'sign', text: room.wallSign, w: room.wallW || 300, size: room.wallSize || 40, col: room.wallCol || PINK }, 830, 640, 0.9, 0)
        if (room.decor) room.decor(x, t)
        if (t < M0) {
          crowd(t, ['pisces', cfg.hook.sign], cfg.hook.react)
          pisCorner(t, 1, cfg.hook.sign === 'pisces' ? 0 : 3)
          const H = hero(t, { ...cfg.hook, ...signStar(cfg.hook.sign), i: 0 }, t, false)
          propAt(t, cfg.hook.prop, t, 0)
          if (cfg.hook.guest) guest(t, { guest: cfg.hook.guest }, t)
          if (cfg.hook.say) bubble(x, clamp(H.X, 300, 780), 760, cfg.hook.say, pop01(t, cfg.hook.sayAt ?? 1.1, 0.25, 2.4) * (1 - ease.inQuad(prog(t, 3.6, 3.85))), { size: 40, who: cfg.hook.sign.toUpperCase(), whoCol: signStar(cfg.hook.sign).color })
          if (cfg.hook.draw) cfg.hook.draw(x, t)
        } else if (m) {
          const ex = ['pisces', m.sign]; if (m.guest?.sign) ex.push(m.guest.sign)
          crowd(t, ex, m.crowd2 ? m.t0 + 3.0 : 0)
          if (m.sign !== 'pisces' && m.guest?.sign !== 'pisces') pisCorner(t, 1, 2)
          moment(t, m)
        } else finale(t)
        x.restore()
        u.clearRect(0, 0, 1080, 1920)
        if (m) sticker(t, m)
        promise(t)
        box1.update(t)
        let fl = 0
        if (m && t - m.t0 < 0.12) fl = 0.55 * (1 - (t - m.t0) / 0.12)
        if (t >= T.fin && t < T.fin + 0.12) fl = 0.6 * (1 - (t - T.fin) / 0.12)
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const CUES = [
    ['whoosh', 0.02, 0.3, 0.04], ['pop', 1.12, 1318.51, 0.04, 0], ['pop', 1.32, 1567.98, 0.035, 0.2], ['glitter', 1.3, 1.7],
    ...MOM.flatMap(m => [
      ['whoosh', r3(m.t0 - 0.1), 0.22, 0.03], ['tom', m.t0, 120, { gain: 0.14, decay: 0.15 }], ['tick', r3(m.t0 + 0.01), 0.05],
      ['pop', r3(m.t0 + 0.12), 1174.66, 0.03, -0.2],
      ...(m.say ? [['pop', r3(m.t0 + 0.47), 987.77, 0.03, 0]] : []),
      ['pop', r3(m.t0 + 3.0), 1318.51, 0.035, 0.15], ['tick', r3(m.t0 + 3.02), 0.04],
      ...(m.say2 ? [['pop', r3(m.t0 + 3.22), 1174.66, 0.03, 0]] : []),
      ...(m.confetti ? [['glitter', r3(m.t0 + 3.0), r3(m.t0 + 3.5)], ['clap', r3(m.t0 + 3.1), { gain: 0.08, pan: -0.3 }], ['clap', r3(m.t0 + 3.35), { gain: 0.08, pan: 0.3 }]] : []),
      ...(m.hearts ? [['bell', r3(m.t0 + 3.1), 1567.98, 0.025, 0.8, 0]] : []),
      ...(m.sign === 'pisces' ? [['pluck', r3(m.t0 + 0.6), 2349.32, 0.014, 0.4, 0.5]] : []),
    ]),
    ...CHAPS.flatMap(c => chapterCues(c)),
    ['boom', T.fin, 0.16], ['glitter', r3(T.fin + 0.1), r3(T.fin + 0.7)],
    ...[0.2, 0.45, 0.7, 0.95].map((d, i) => ['clap', r3(T.fin + d), { gain: 0.09, pan: i % 2 ? 0.3 : -0.3 }]),
    ...talkCues(LINES, { cps: CPS }),
    ...slamTitleCues(HOOK), ...whipZoomCues(WHIP),
    ...(cfg.loop ? loopCues({ duration: DURATION }) : []),
    ...(cfg.extraCues || []),
  ]
  const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), ...CHAPS.map(c => chapter(c)), ...(cfg.scenes || [])]
  if (cfg.loop) SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION }))
  return { DURATION, SCENES, CUES, T, HOOK }
}
