// debate — the shared look of TWO STARS DISAGREE (Star Talk Shows, show 4, promo/films/STARTALK-SHOWS.md), used by all
// three episodes (sxdebatetext, sxdebatebill, sxdebatephone) so they share one set: a split screen with two podiums, a
// pixel gong in the middle, a little star audience (Pisces crying in it, every episode) and the show bug top-left.
//
// One 30 s format, timed from the episode's lines (pure, works in node for the sound build):
//   0.12  hook headline (the question). Podiums rise, the two signs pop in, the gong drops in. 1.71 GONG (the drop).
//   2.2   six rapid-fire lines (three volleys each: A, B, A, B, A, B). Headline swaps at volley 2 and volley 3 (gong taps;
//         volley 3's swap is the card cut). Per-line props come from the episode (cfg.props).
//   then  the BIG gong: THE STARS drop in front of it. One line: both are right if you say it out loud. Arguers freeze, wide.
//   then  the last line headline + "Which side are *you* on?" while the stance tabs pulse and a pixel cursor can't decide.
//         Everything pops out by 25.45; the end card (default CTA) takes over at 25.6.
//
// makeDebate(cfg) → { SCENES, CUES, T, LINES, times }
//   cfg = { id, ep, key, signs: [{ id, name, stance }, …×2], heads: { hook, r2, r3, stars, last }, lines: [{ who, text,
//           moods? }]×6, star: '…', props(x, t, H)?, back(x, t, H)?, cues(T, times)?, sobAt?: [t…], accent? }
//   H (helpers handed to props): { T, L (lines with .t), times, pos: [{x,y,size,top}]×2, px, bits, txt, pop01, outK, k(i, until) }
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const CPS = 32
const BEAT = 0.5556
const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout (1080 × 1920)
export const POS = [{ x: 248 }, { x: 832 }]
export const STAR_Y = 878, STAR_S = 232
export const POD = { top: 1012, w: 300, h: 236 }
export const GONG = { x: 540, y: 742, R: 76 }
export const PANEL = { top: 586, bot: 1290 }
export const AUD = { y: 1392, s: 66 }
const TAB_Y = 640
const NARR = { x: 540, y: 770, s: 268 }

// ── pixel helpers (handed to the episodes' props)
export function makeHelpers(x) {
  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  /** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
  function bits(bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
    const w = bm[0].length, h = bm.length
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
    const ox = -w * cell / 2, oy = -h * cell / 2
    const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
    if (outline) {
      x.fillStyle = outline
      for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
    }
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const ch = bm[j][i]; if (ch === '.') continue
      x.fillStyle = cols[ch] || '#ff00ff'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
    }
    x.restore()
  }
  function txt(s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1, shadow = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + Math.max(2, size * 0.08)) }
    x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  /** a stepped pixel panel (ink outline, fill, optional rim) */
  function slab(L, T0, w, h, fillC, { rim = null, P = 6 } = {}) {
    px(L + P, T0 - P, w - 2 * P, h + 2 * P, INK); px(L - P, T0 + P, w + 2 * P, h - 2 * P, INK); px(L, T0, w, h, INK)
    px(L + P, T0, w - 2 * P, h, fillC); px(L, T0 + P, w, h - 2 * P, fillC)
    if (rim) { px(L + P, T0, w - 2 * P, P / 2 + 1, rim) }
  }
  /** a chunky pixel phone: ink body, dark screen; draw(screenLeft, screenTop, sw, sh) paints the screen (already translated/rotated) */
  function phone(cx, cy, w, { rot = 0, k = 1, body = '#2c2550', screen = '#0e0b26', draw = null } = {}) {
    if (k <= 0.01) return
    const h = Math.round(w * 1.9), P = Math.max(4, Math.round(w / 22))
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    px(-w / 2 - P, -h / 2 + P, w + 2 * P, h - 2 * P, INK); px(-w / 2, -h / 2, w, h, INK)
    px(-w / 2 + P, -h / 2 + P, w - 2 * P, h - 2 * P, body)
    const sl = -w / 2 + 2 * P, st = -h / 2 + 4 * P, sw = w - 4 * P, sh = h - 8 * P
    px(sl, st, sw, sh, screen)
    px(-w * 0.12, -h / 2 + 1.6 * P, w * 0.24, P, INK)
    if (draw) { x.save(); x.beginPath(); x.rect(sl, st, sw, sh); x.clip(); draw(sl, st, sw, sh); x.restore() }
    x.restore()
  }
  /** a chat bubble inside a phone screen */
  function bubble(s, X, Y, maxW, { me = true, size = 18, color = me ? '#6a5cff' : '#3a3460', ink = '#ffffff' } = {}) {
    x.save(); x.font = `700 ${size}px ${MONO}`
    const w = Math.min(maxW, x.measureText(s).width + size * 1.1), h = size * 1.7
    const L = me ? X - w : X
    x.fillStyle = color; x.fillRect(Math.round(L), Math.round(Y), Math.round(w), Math.round(h))
    x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, L + size * 0.55, Y + h / 2 + 1)
    x.restore(); return h
  }
  return { px, bits, txt, slab, phone, bubble }
}

export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const CURSOR = ['X.....', 'XX....', 'XWX...', 'XWWX..', 'XWWWX.', 'XWWWWX', 'XWWXXX', 'XX.WX.', 'X..XW.', '....X.']

// ── the timeline, computed from the episode's lines (pure)
export function debateTimeline(cfg) {
  const dur = text => lineTimes([{ t: 0, text }], { cps: CPS })[0].done
  const L = cfg.lines.map(l => ({ ...l }))
  let t = 2.2, cut = 0
  L.forEach((l, i) => {
    if (i === 4) { cut = r3(t + 0.03); t = cut + 0.25 }
    l.t = r3(t)
    t = l.t + dur(l.text) + 1.55
  })
  const T = { h0: 0.12, pods: 0.3, in: [0.5, 0.64], gongIn: 0.85, ding: 1.711, open: 2.0 }
  T.r2 = r3(L[2].t - 0.05)
  T.cut = cut
  T.stars = r3(L[5].t + dur(L[5].text) + 1.12)
  T.drop = r3(T.stars + 0.08)
  T.s1 = r3(T.stars + 0.5)
  T.close = r3(T.s1 + dur(cfg.star) + 1.55)
  T.turn = r3(T.s1 + dur(cfg.star) + 0.25)      // the two arguers look at each other once the line has landed
  T.last = r3(T.close + 0.06)
  T.bump = r3(T.close + 0.3)
  T.vote = r3(T.last + 0.85)
  T.out = [25.05, 25.45]
  T.lastOut = [25.1, 25.42]
  T.ghostless = true
  if (T.out[0] - T.last < 3.2) throw new Error(`${cfg.id}: last line only holds ${(T.out[0] - T.last).toFixed(2)} s — shorten the lines`)
  return { T, L }
}

export function makeDebate(cfg) {
  const { T, L } = debateTimeline(cfg)
  const SG = cfg.signs.map(s => ({ ...signStar(s.id), ...s }))      // a sign may override its colour (e.g. two gold signs)
  const TAG = SG.map(s => `${s.glyph} ${s.name}`)
  const NARRATOR = 'THE STARS'
  const LINES = [
    ...L.map(l => ({ t: l.t, speaker: TAG[l.who], text: l.text, color: SG[l.who].color })),
    { t: T.s1, speaker: NARRATOR, text: cfg.star },
  ]
  const times = lineTimes(LINES, { cps: CPS })
  const speakerAt = t => { let s = -1; for (let i = 0; i < L.length; i++) if (t >= L[i].t - 0.1) s = L[i].who; return t >= T.stars ? -1 : s }
  const lineAt = t => { let s = -1; for (let i = 0; i < L.length; i++) if (t >= L[i].t) s = i; return s }
  const hits = [[T.ding, 1], [T.r2, 0.5], [T.cut + 0.06, 0.5], [T.stars, 1.6]]
  const gongShake = t => hits.reduce((a, [h, amp]) => { const d = t - h; return d < 0 || d > 2 ? a : a + amp * Math.exp(-d * 3.5) * Math.sin(d * 26) }, 0)

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 26px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const Hp = makeHelpers(x)
    const { px, bits, txt, slab } = Hp
    const hk = cfg.heads
    const HEADS = [
      [popText(root, hk.hook, { top: 176, size: 112, accentSize: 176, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0 + 0.42, wobble: true, accentColor: GOLD, lineHeight: 0.98, fit: true }), [T.r2 - 0.3, T.r2 - 0.1]],
      [popText(root, hk.r2, { top: 176, size: 108, accentSize: 170, at: T.r2 + 0.04, gap: 0.08, late: 1, lateAt: T.r2 + 0.4, wobble: true, accentColor: SG[0].color, lineHeight: 0.98, fit: true }), [T.cut - 0.22, T.cut - 0.03]],
      [popText(root, hk.r3, { top: 176, size: 108, accentSize: 170, at: T.cut + 0.08, gap: 0.08, late: 1, lateAt: T.cut + 0.42, wobble: true, accentColor: SG[1].color, lineHeight: 0.98, fit: true }), [T.stars - 0.2, T.stars - 0.03]],
      [popText(root, hk.stars, { top: 176, size: 112, accentSize: 180, at: T.stars + 0.1, gap: 0.08, late: 1, lateAt: T.stars + 0.46, wobble: true, accentColor: GOLD, lineHeight: 0.98, fit: true }), [T.close - 0.18, T.close + 0.02]],
      [popText(root, hk.last, { top: 176, size: 112, accentSize: 180, at: T.last, gap: 0.09, late: 1, lateAt: T.last + 0.42, wobble: true, accentColor: cfg.accent || GOLD, lineHeight: 0.98, fit: true }), T.lastOut],
      [popText(root, 'Which side are *you* on?', { top: 478, size: 58, accentSize: 82, at: T.vote, gap: 0.06, late: 0, accentColor: GOLD, lineHeight: 1, fit: true }), T.lastOut],
    ]
    const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
    // the show bug (whole runtime), top-left, 56 px in
    const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.16em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '12px' }, root)
    el('span', { display: 'inline-block', width: '14px', height: '14px', background: '#ff5c6a', boxShadow: '0 0 10px rgba(255,92,106,0.8)' }, bug)
    el('span', {}, bug, 'TWO STARS DISAGREE')
    el('span', { color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }, bug, `· EP ${cfg.ep}`)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
      const tt = t - t0
      if (tt < 0 || tt > 0.7) return
      const p = ease.outCubic(tt / 0.7)
      x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + seed
        drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
      }
      x.restore()
    }

    // the split screen: two tinted panels, the speaker's side lit
    function panels(t, ok) {
      const k = ease.outCubic(prog(t, 0.15, 0.55)) * ok
      if (k <= 0.01) return
      const sp = speakerAt(t), merged = ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
      SG.forEach((s, i) => {
        const lit = sp === i ? 1 : 0
        const L0 = i ? 548 : 40, w = 492
        const top = lerp(PANEL.top + 60, PANEL.top, k)
        x.save(); x.globalAlpha = k
        const col = merged > 0 ? GOLD : s.color
        const g = x.createLinearGradient(0, top, 0, PANEL.bot)
        g.addColorStop(0, hexA(s.color, (0.08 + 0.14 * lit) * (1 - merged) + 0.07 * merged))
        g.addColorStop(1, hexA(s.color, 0.02))
        x.fillStyle = g; x.fillRect(L0, top, w, PANEL.bot - top)
        x.fillStyle = hexA(col, 0.35 + 0.45 * lit); x.fillRect(L0, top, w, 4); x.fillRect(i ? L0 + w - 4 : L0, top, 4, PANEL.bot - top)
        // pixel corner ticks
        x.fillStyle = hexA(col, 0.8); x.fillRect(i ? L0 + w - 24 : L0, top, 24, 8); x.fillRect(i ? L0 + w - 8 : L0, top, 8, 24)
        x.restore()
        // spotlight cone on the speaker
        if (lit) {
          const a = prog(t, L[lineAt(t)]?.t - 0.1 || 0, (L[lineAt(t)]?.t || 0) + 0.2)
          x.save(); x.globalCompositeOperation = 'lighter'
          const cx = POS[i].x, g2 = x.createLinearGradient(0, top, 0, POD.top)
          g2.addColorStop(0, hexA(s.color, 0.0)); g2.addColorStop(0.3, hexA('#fff1d0', 0.16 * a)); g2.addColorStop(1, hexA('#fff1d0', 0.04 * a))
          x.fillStyle = g2; x.beginPath(); x.moveTo(cx - 40, top); x.lineTo(cx + 40, top); x.lineTo(cx + 190, POD.top); x.lineTo(cx - 190, POD.top); x.closePath(); x.fill()
          x.restore()
        }
      })
    }

    // the stance tabs at the top of each panel; in the final beat they become the vote buttons
    function tabs(t, ok) {
      const k = pop01(t, 0.9, 0.35, 2) * ok
      if (k <= 0.01) return
      const vote = prog(t, T.vote + 0.25, T.vote + 0.6)
      const sp = speakerAt(t)
      SG.forEach((s, i) => {
        const cx = POS[i].x, w = 340 + 20 * vote, h = 76 + 10 * vote
        const pulse = vote > 0 ? 1 + 0.04 * Math.sin((t - T.vote) * 8 + i * Math.PI) : 1 + (sp === i ? 0.03 * Math.sin(Math.PI * prog(t, L[lineAt(t)]?.t || 0, (L[lineAt(t)]?.t || 0) + 0.25)) : 0)
        x.save(); x.translate(cx, TAB_Y); x.scale(k * pulse, k * pulse)
        slab(-w / 2, -h / 2, w, h, vote > 0 ? mixHex('#160e34', s.color, 0.35 * vote) : '#160e34', { rim: s.color })
        txt(`${s.glyph} ${s.stance}`, 0, 2, { size: 30, color: vote > 0.5 ? BONE : s.color })
        x.restore()
      })
      // the indecisive cursor: hovers one button, then the other, then gives up in the middle
      if (t > T.vote + 0.5) {
        const u = t - T.vote - 0.5
        const legs = [[540, 760], [POS[0].x + 60, TAB_Y + 20], [POS[1].x + 60, TAB_Y + 20], [POS[0].x + 60, TAB_Y + 20], [548, TAB_Y + 30]]
        const seg = Math.min(legs.length - 2, Math.floor(u / 0.62)), f = ease.inOutCubic(clamp((u - seg * 0.62) / 0.42))
        const cx = lerp(legs[seg][0], legs[seg + 1][0], f), cy = lerp(legs[seg][1], legs[seg + 1][1], f)
        bits(CURSOR, { X: INK, W: '#ffffff' }, cx + 18, cy + 30, 6, { outline: '#ffffff', alpha: clamp(u * 4) * ok })
        if (u > 4 * 0.62 + 0.3) txt('?', cx + 54, cy - 6, { size: 40, color: GOLD, font: INTER, weight: 800, alpha: ok })
      }
    }

    function drawGong(t, ok) {
      const k = pop01(t, T.gongIn, 0.4, 2) * ok
      if (k <= 0.01) return
      const { x: cx, y: cy, R } = GONG, c = 6
      const sh = gongShake(t)
      x.save(); x.translate(cx, cy - (1 - k) * 300)
      // the stand: two posts + crossbar (ink outline, dark wood, gold caps)
      const top = -R - 44, foot = R + 66
      px(-R - 40, top - 8, 22, foot - top + 8, INK); px(R + 18, top - 8, 22, foot - top + 8, INK)
      px(-R - 34, top, 10, foot - top, '#6b4a2a'); px(R + 24, top, 10, foot - top, '#6b4a2a')
      px(-R - 58, top - 18, 2 * R + 116, 22, INK); px(-R - 52, top - 12, 2 * R + 104, 10, '#8a5f33'); px(-R - 52, top - 12, 2 * R + 104, 3, '#c08a4f')
      px(-R - 64, top - 22, 18, 30, GOLD); px(R + 46, top - 22, 18, 30, GOLD)
      px(-R - 56, foot, 60, 14, INK); px(R - 4, foot, 60, 14, INK)
      // the cords
      const sway = sh * 0.08
      x.save(); x.rotate(sway)
      px(-R * 0.5 - 2, top + 4, 4, 44, '#d8c39a'); px(R * 0.5 - 2, top + 4, 4, 44, '#d8c39a')
      // the disc
      x.translate(sh * 3, 0)
      for (let j = -R; j < R; j += c) for (let i = -R; i < R; i += c) {
        const d = Math.hypot(i + c / 2, j + c / 2)
        if (d > R) continue
        let col = '#e0a43c'
        if (d > R - c) col = INK
        else if (d > R - 2.6 * c) col = '#a86a1c'
        else if (d < 0.26 * R) col = d < 0.15 * R ? '#ffe7a6' : '#f6c75a'
        else if (Math.abs(d - 0.58 * R) < c * 0.6) col = '#b97a24'
        else if (i + j < -R * 0.55 && d < R - 3 * c) col = '#f6cf72'
        px(i, j, c, c, col)
      }
      x.restore()
      // ring waves after each hit
      for (const [h, amp] of hits) {
        const d = t - h
        if (d < 0 || d > 0.9) continue
        for (let n = 0; n < 2; n++) {
          const dd = d - n * 0.18; if (dd < 0) continue
          const rr = R + 20 + dd * 260 * amp, a = (1 - dd / 0.9) * 0.7
          x.save(); x.strokeStyle = hexA(GOLD, a); x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.arc(0, 0, rr, 0, Math.PI * 2); x.stroke(); x.restore()
        }
      }
      // the round chip under the disc
      const rd = t < T.r2 ? 1 : t < T.cut ? 2 : 3
      if (t < T.stars) txt(`ROUND ${rd}`, 0, R + 40, { size: 22, color: GOLD })
      else txt('★ ★ ★', 0, R + 40, { size: 22, color: GOLD })
      x.restore()
    }

    // a stepped pixel podium with a name plate, the sign's rim and a gooseneck mic
    function podium(i, t, k) {
      if (k <= 0.01) return
      const s = SG[i], cx = POS[i].x, w = POD.w, h = POD.h, P = 8
      const top = POD.top + (1 - clamp(k)) * 320, L0 = Math.round(cx - w / 2)
      x.fillStyle = INK; x.fillRect(L0 - P, top, w + 2 * P, h); x.fillRect(L0, top - P, w, h + P)
      x.fillStyle = '#3a2a5c'; x.fillRect(L0, top, w, h)
      x.fillStyle = '#56407f'; x.fillRect(L0, top, w, 2 * P)
      x.fillStyle = '#2a1f45'; x.fillRect(i ? L0 : L0 + w - 2 * P, top + 2 * P, 2 * P, h - 2 * P)
      x.fillStyle = s.color; x.fillRect(L0, top + 2 * P, w, P / 2)
      x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const label = s.name, tw = x.measureText(label).width, pw = Math.min(w - 2 * P, tw + 44), ph = 66, py = top + 4 * P
      x.fillStyle = INK; x.fillRect(cx - pw / 2 - P / 2, py - P / 2, pw + P, ph + P)
      x.fillStyle = '#fbf6ea'; x.fillRect(cx - pw / 2, py, pw, ph)
      x.fillStyle = INK; x.fillText(label, cx, py + ph / 2 + 2)
      x.font = `700 46px 'EB Garamond', 'Segoe UI Symbol', serif`; x.fillStyle = s.color; x.fillText(s.glyph + '︎', cx, top + h - 62)
      drawPixelStar(x, cx - 80, top + h - 56, 18, 1, s.color, '#fff6e6'); drawPixelStar(x, cx + 80, top + h - 56, 18, 1, s.color, '#fff6e6')
      // mic, aimed at the star
      const bx = cx + (i ? -1 : 1) * w * 0.3, by = top - P
      x.fillStyle = INK; x.fillRect(bx - 5, by - 56, 10, 56)
      x.fillStyle = '#9aa3b0'; x.fillRect(bx - 2, by - 54, 4, 54)
      x.save(); x.translate(bx, by - 58); x.rotate(i ? 0.5 : -0.5)
      x.fillStyle = INK; x.fillRect(-13, -26, 26, 34); x.fillStyle = '#2b2b38'; x.fillRect(-9, -22, 18, 26)
      x.fillStyle = '#6b6f80'; for (let j = 0; j < 3; j++) x.fillRect(-9, -20 + j * 8, 18, 3)
      x.restore()
    }

    function argState(t, i) {
      const other = i ? -1 : 1
      if (t < L[0].t - 0.1) return { mood: t < 1.2 ? 'happy' : 'squint', look: [other, 0] }
      if (t < T.stars) {
        const n = lineAt(t), l = L[Math.max(0, n)]
        const speaking = l.who === i
        const m = l.moods || []
        return speaking ? { mood: m[0] || 'squint', look: [other, 0], blink: false } : { mood: m[1] || 'eyeroll', look: m[1] === 'wide' ? [other, 0] : undefined }
      }
      if (t < T.turn) return { mood: 'wide', look: [i ? -1 : 1, -1], blink: false }      // up at THE STARS
      if (t < T.bump) return { mood: 'neutral', look: [other, 0] }
      return { mood: t < T.bump + 0.6 ? 'happy' : 'sparkle', look: [other, 0] }
    }

    function audience(t, ok) {
      const k = pop01(t, 0.7, 0.4, 2) * ok
      if (k <= 0.01) return
      const sp = speakerAt(t), stars = t >= T.stars && t < T.turn
      const sob = (cfg.sobAt || []).some(s => t > s && t < s + 1.6)
      for (let n = 0; n < 9; n++) {
        const ax = 92 + n * 112, isP = n === 5
        const lk = stars ? [ax < 540 ? 1 : -1, -1] : sp >= 0 ? [sp ? 1 : -1, -0.3] : [0, -0.3]
        const hopsA = L.map(l => r3(l.t + 0.05 + (n % 3) * 0.04))
        const r = drawStarChar(x, ax, AUD.y + (n % 2) * 10, isP ? AUD.s * 1.3 : AUD.s, t, {
          color: isP ? signStar('pisces').color : '#8a7fb8', mood: isP ? (sob ? 'squint' : 'wide') : (t > T.bump ? 'happy' : 'neutral'),
          look: lk, alpha: isP ? 1 : 0.7, glow: isP ? 0.7 : 0.25, tips: false, seed: 40 + n, pop: k, hops: isP ? [] : hopsA,
          squash: isP ? (sob ? 0.08 * Math.sin(t * 22) : 0.03 * Math.sin(t * 9)) : 0, blink: isP ? false : undefined,
        })
        if (isP) {
          // the running gag: Pisces cries all episode (harder when cfg.sobAt hits)
          const streams = sob ? 3 : 2
          for (let e = -1; e <= 1; e += 2) for (let q = 0; q < streams; q++) {
            const p = (t * (sob ? 2.2 : 1.4) + q / streams + (e > 0 ? 0.3 : 0)) % 1
            px(r.x + e * (13 + p * (sob ? 30 : 12)), r.y - 4 + p * 52, 8, 11, '#8fd8ff')
          }
          if (sob) txt('WAAH', r.x + 4, r.y - 66, { size: 26, color: '#8fd8ff', alpha: 0.95 })
        }
      }
    }

    function narrator(t, ok) {
      if (t < T.stars) return null
      const k = pop01(t, T.drop, 0.4, 2.2) * ok
      const fall = (1 - ease.outCubic(prog(t, T.stars - 0.05, T.drop + 0.3))) * -700
      const hopsN = talkHops(LINES, NARRATOR, { cps: CPS })
      const mood = t < T.s1 ? 'wide' : t < T.close ? 'happy' : 'heart'
      const r = drawStarChar(x, NARR.x, NARR.y + fall, NARR.s, t, { color: STAR.sky, mood, look: [0, 0], hops: [T.drop + 0.3, ...hopsN, T.bump], pop: k, seed: 3, glow: 1.25 })
      sparkles(t, r.x, r.y, T.drop + 0.25, 12, 220, 1, [GOLD, BONE, PINK])
      return r
    }

    function stage_(t) {
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const sh = t > T.stars && t < T.stars + 0.5 ? (1 - prog(t, T.stars, T.stars + 0.5)) * 10 : 0
      x.save(); x.translate(Math.round(Math.sin(t * 90) * sh), Math.round(Math.cos(t * 77) * sh * 0.6))
      panels(t, ok)
      // the divider behind the gong
      const dk = ease.outCubic(prog(t, 0.3, 0.7)) * (1 - prog(t, T.stars, T.stars + 0.4)) * ok
      if (dk > 0) for (let yy = PANEL.top; yy < PANEL.bot; yy += 28) px(537, yy, 6, 14 * dk, hexA(GOLD, 0.7))
      drawGong(t, ok)
      const H = { T, L, times, LINES, pos: [], ...Hp, pop01, outK, x, SG, ok }
      if (cfg.back) cfg.back(x, t, H)
      // the two arguers + podiums
      SG.forEach((s, i) => {
        const k = pop01(t, T.in[i], 0.36, 2.2) * ok
        const n = lineAt(t), speaking = t < T.stars && n >= 0 && L[n].who === i && t < times[n].done + 0.4
        const lean = speaking ? (i ? -14 : 14) * Math.sin(Math.PI * prog(t, L[n].t, L[n].t + 0.4)) : 0
        const slide = t > T.bump ? (i ? -1 : 1) * 46 * ease.outBack(prog(t, T.bump, T.bump + 0.4)) : 0
        const hops = [T.in[i] + 0.28, T.ding + 0.02, ...talkHops(LINES, TAG[i], { cps: CPS }), T.stars + 0.04, T.turn + 0.1 + i * 0.08, T.bump, T.bump + 0.55]
        const st = argState(t, i)
        const r = drawStarChar(x, POS[i].x + lean + slide, STAR_Y, STAR_S, t, { color: s.color, glyph: s.glyph, ...st, hops, pop: k, seed: 4 + i * 5, glow: 1.05, squash: t > T.stars && t < T.stars + 0.4 ? 0.12 * Math.exp(-(t - T.stars) * 6) : 0 })
        H.pos[i] = r
      })
      SG.forEach((s, i) => podium(i, t, easeOutBack(prog(t, T.pods + i * 0.08, T.pods + i * 0.08 + 0.4), 1.6) * ok))
      if (cfg.props) cfg.props(x, t, H)
      narrator(t, ok)
      // the bump: a heart between them, under THE STARS
      if (t > T.bump + 0.15) {
        const p = prog(t, T.bump + 0.15, T.bump + 0.6)
        bits(HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, 990 - 30 * ease.outCubic(p) + 6 * Math.sin(t * 4), 10 * easeOutBack(p, 2.4), { alpha: ok })
        sparkles(t, 540, 970, T.bump + 0.15, 10, 120, 2, [PINK, GOLD, BONE])
      }
      if (t >= T.stars) sparkles(t, GONG.x, GONG.y, T.stars, 14, 300, 3, [GOLD, BONE])
      audience(t, ok)
      tabs(t, ok)
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
        stage_(t)
        box.update(t)
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.style.opacity = String(clamp(t / 0.4) * (1 - prog(t, STORY_END - 0.2, STORY_END)))
        drawGrain(gx, t)
      },
    }
  }

  // card-motif candidates: volley 2 (headline swap) and volley 3 (headline swap); cardfx keeps one (volley 3)
  const CUTS = [r3(T.r2 - 0.02), { t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }),
    cardFrame({ start: 0, end: STORY_END, numeral: `EP ${cfg.ep}`, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pop/pluck/bell are shifted into the film's key by the engine; the gong is unpitched-ish fm)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const gong = (t, big) => big
    ? [['boom', t, 0.42], ['fmbell', t, 98, { gain: 0.09, decay: 3.4, ratio: 1.41, index: 4.2, rev: 0.55 }], ['fmbell', r3(t + 0.01), 196, { gain: 0.04, decay: 2.6, ratio: 2.76, index: 2.5, rev: 0.5 }], ['crash', t, { gain: 0.05, len: 2.6 }]]
    : [['fmbell', t, 131, { gain: 0.05, decay: 1.8, ratio: 1.41, index: 3.2, rev: 0.45 }], ['tick', t, 0.04]]
  const words = s => s.split(/\s+/).filter(w => w && w !== '|').length
  const CUES = [
    ...wordPops(T.h0, words(cfg.heads.hook), 0.08, 0, 0.026), ['pop', r3(T.h0 + 0.42), 1174.66, 0.045, 0],
    ['whoosh', T.pods, 0.4, 0.03], ['tick', r3(T.pods + 0.3), 0.04], ['tick', r3(T.pods + 0.38), 0.04],
    ['pop', r3(T.in[0] + 0.05), 659.25, 0.04, -0.4], ['pop', r3(T.in[1] + 0.05), 739.99, 0.04, 0.4],
    ['whoosh', T.gongIn, 0.3, 0.03], ['pop', r3(T.gongIn + 0.3), 523.25, 0.03, 0],
    ...gong(T.ding, true),
    ['pop', T.open, 739.99, 0.04, 0], ['pop', r3(T.open + 0.06), 987.77, 0.03, 0],
    ...gong(T.r2, false), ...wordPops(r3(T.r2 + 0.04), words(cfg.heads.r2), 0.08, 1, 0.022), ['pop', r3(T.r2 + 0.4), 1174.66, 0.04, 0],
    ...gong(r3(T.cut + 0.06), false), ['pop', r3(T.cut + 0.42), 1318.51, 0.04, 0],
    // THE STARS cut in
    ...gong(T.stars, true), ['whoosh', r3(T.stars - 0.05), 0.4, 0.05], ['glitter', T.drop, r3(T.drop + 0.6)], ['bell', r3(T.drop + 0.3), 1567.98, 0.03, 1.4, 0],
    ...wordPops(r3(T.stars + 0.1), words(cfg.heads.stars), 0.08, 2, 0.022), ['pop', r3(T.stars + 0.46), 1174.66, 0.045, 0],
    ...talkCues(LINES, { cps: CPS, pitch: { [TAG[0]]: 659.25, [TAG[1]]: 880, [NARRATOR]: 784 } }),
    ['pop', T.close, 880, 0.03, 0], ['pop', r3(T.close + 0.07), 587.33, 0.03, 0],
    // the last line, the bump, which side?
    ...wordPops(T.last, words(cfg.heads.last), 0.09, 2, 0.028), ['pop', r3(T.last + 0.42), 1318.51, 0.055, 0], ['pluck', r3(T.last + 0.42), 1174.66, 0.05, 0.7, 0],
    ['pop', r3(T.bump + 0.15), 1567.98, 0.04, 0], ['glitter', r3(T.bump + 0.15), r3(T.bump + 0.6)],
    ...wordPops(T.vote, 5, 0.06, 3, 0.02), ['tick', r3(T.vote + 0.3), 0.04], ['tick', r3(T.vote + 0.92), 0.03], ['tick', r3(T.vote + 1.54), 0.03], ['tick', r3(T.vote + 2.16), 0.03],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T, times) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { SCENES, CUES, T, L, LINES, times, CUTS }
}

// colour helpers
function hexA(hex, a) { const h = hex.replace('#', ''); const n = parseInt(h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
export function mixHex(a, b, k) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16)
  const ch = s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, k))
  return '#' + [16, 8, 0].map(s => ch(s).toString(16).padStart(2, '0')).join('')
}
export { hexA, rng, BEAT }
