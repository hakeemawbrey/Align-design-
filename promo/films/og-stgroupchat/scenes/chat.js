// stgroupchat chat — the stars' group chat ("✨ her date tonight ✨ · 12 stars"), drawn on the scene canvas.
//   buildChat(ctx, { cast, items, typing, avatar, renameAt })   measures every item once (call after fonts load)
//   → { draw(t, { dx, dy, s, alpha }), bottomOf(i, t), P }
//   items:  { t, kind: 'msg', who, lines: ['…', '…'], attach?: 'dog' | 'doc' }   a bubble from a star (lines = hand breaks)
//           { t, kind: 'sys', text, who? }                                          a centred grey system line
//           { t, kind: 'seen', text }                                               a read receipt under the last bubble
//   typing: [{ who, a, b }]  who shows in the "typing…" row from a to b (pops in and out)
//   avatar(who, t) → { mood, look, blink }   the little star avatars react too (synced eye-rolls)
// New items push the thread up with a springy scroll; each new bubble pops in from its avatar corner. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { GOLD, BONE, PINK, INK, hexA, drawDog } from './props.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH = "'DejaVu Sans', 'EB Garamond', serif"
const TAU = Math.PI * 2

export const PANEL = { x: 60, y: 432, w: 960, h: 790, r: 46, head: 120, foot: 78 }
const B = { font: `700 44px ${INTER}`, lh: 54, padX: 28, padY: 18, x: 118, nameH: 38, gap: 20, maxW: 760 }
const ATT = { dog: 128, doc: 112 }

const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** text with an optional leading zodiac glyph drawn in a font that has it (text presentation) */
function glyphText(x, glyph, text, X, Y, font, col, gcol = col) {
  let cx = X
  if (glyph) {
    const size = parseFloat(/(\d+)px/.exec(font)[1])
    x.font = `${Math.round(size * 1.05)}px ${GLYPH}`; x.fillStyle = gcol
    x.fillText(glyph + '︎', cx, Y + size * 0.04); cx += x.measureText(glyph + '︎').width + size * 0.35
  }
  x.font = font; x.fillStyle = col; x.fillText(text, cx, Y)
  return cx + x.measureText(text).width
}
/** a ✨: one big four-point pixel sparkle plus two small ones */
export function sparkleMark(x, cx, cy, s, t, col = GOLD) {
  const tw = 0.85 + 0.15 * Math.sin(t * 6 + cx)
  drawPixelStar(x, cx, cy, s * tw, 0, col, '#fffbe8')
  drawPixelStar(x, cx + s * 0.62, cy - s * 0.55, s * 0.5, 2, col, '#fffbe8')
  drawPixelStar(x, cx - s * 0.55, cy + s * 0.6, s * 0.42, 2, col, '#fffbe8')
}

export function buildChat(x, { cast, items, typing = [], avatar = () => ({}), renameAt = Infinity, title = ['her date tonight', 'her WEDDING'] }) {
  const P = PANEL
  // ── measure every item once
  const bodyTop = P.y + P.head + 4, bodyBot = P.y + P.h - P.foot
  x.save()
  const lay = items.map(it => {
    if (it.kind === 'hello') return { h: bodyBot - bodyTop }
    if (it.kind === 'msg') {
      x.font = B.font
      const bw = Math.min(B.maxW, Math.max(...it.lines.map(l => x.measureText(l).width)) + 2 * B.padX)
      const bh = it.lines.length * B.lh + 2 * B.padY
      const ah = it.attach ? ATT[it.attach] + 12 : 0
      return { bw, bh, ah, h: B.nameH + bh + ah + B.gap }
    }
    if (it.kind === 'sys') return { h: 58 }
    return { h: 40 }
  })
  x.restore()
  const scrollE = d => easeOutBack(prog(d, 0, 0.3), 1.5)

  /** bottom y of item i at time t (the thread is bottom-anchored; later arrivals push it up) */
  function bottomOf(i, t) {
    let off = 0
    for (let j = i + 1; j < items.length; j++) if (t >= items[j].t) off += lay[j].h * scrollE(t - items[j].t)
    return bodyBot - off
  }

  function header(t) {
    const hx = P.x, hy = P.y
    x.save()
    rr(x, hx, hy, P.w, P.head, [P.r, P.r, 0, 0]); x.fillStyle = 'rgba(255,255,255,0.05)'; x.fill()
    x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(hx + 24, hy + P.head - 2, P.w - 48, 2)
    x.textBaseline = 'alphabetic'; x.textAlign = 'left'
    x.font = `700 58px ${INTER}`; x.fillStyle = hexA(BONE, 0.85); x.fillText('‹', hx + 30, hy + 80)
    // group avatar: a little zodiac ring (12 sign dots) around a gold pixel star
    const ax = hx + 120, ay = hy + 60
    x.beginPath(); x.arc(ax, ay, 38, 0, TAU); x.fillStyle = '#1a1036'; x.fill()
    x.lineWidth = 3; x.strokeStyle = hexA(GOLD, 0.7); x.stroke()
    cast.ring.forEach((c, i) => { const a = -Math.PI / 2 + i * TAU / 12 + t * 0.4; x.fillStyle = c; x.fillRect(Math.round(ax + Math.cos(a) * 27 - 3.5), Math.round(ay + Math.sin(a) * 27 - 3.5), 7, 7) })
    drawPixelStar(x, ax, ay, 22, 1, GOLD, '#fffbe8')
    // title: flips over at the rename
    const k = prog(t, renameAt, renameAt + 0.36), flip = Math.abs(Math.cos(k * Math.PI)), after = k >= 0.5
    const ty = hy + 62
    x.save(); x.translate(0, ty - 14); x.scale(1, Math.max(0.04, flip)); x.translate(0, -(ty - 14))
    const sx = hx + 186
    sparkleMark(x, sx + 12, ty - 14, 30, t)
    let ex
    if (!after) ex = glyphText(x, null, title[0], sx + 40, ty, `800 44px ${INTER}`, BONE)
    else {
      x.font = `800 44px ${INTER}`; x.fillStyle = BONE; x.fillText('her ', sx + 40, ty)
      const w0 = x.measureText('her ').width
      x.fillStyle = GOLD; x.fillText('WEDDING', sx + 40 + w0, ty); ex = sx + 40 + w0 + x.measureText('WEDDING').width
    }
    sparkleMark(x, ex + 30, ty - 14, 30, t + 1.3)
    x.restore()
    x.font = `700 23px ${MONO}`; x.fillStyle = hexA(BONE, 0.6); x.fillText(after ? '12 stars · 1 wedding (planned)' : '12 stars', sx + 4, hy + 100)
    // the rename flash
    const fl = Math.max(0, 1 - Math.abs(t - renameAt - 0.18) / 0.3)
    if (fl > 0) { x.fillStyle = hexA('#fff3c8', 0.35 * fl); rr(x, hx, hy, P.w, P.head, [P.r, P.r, 0, 0]); x.fill() }
    x.restore()
  }

  function avatarAt(who, cx, cy, size, t, pk = 1) {
    const C = cast[who], st = avatar(who, t) || {}
    x.save(); x.beginPath(); x.arc(cx, cy, size * 0.56, 0, TAU); x.fillStyle = hexA(C.color, 0.22); x.fill(); x.restore()
    drawStarChar(x, cx, cy + size * 0.06, size, t, { color: C.color, mood: st.mood || 'neutral', look: st.look || [0, 0], blink: st.blink, seed: C.seed + 50, bob: 0, glow: 0.35, tips: false, pop: pk })
  }

  function drawMsg(it, L, yb, t, pop) {
    const C = cast[it.who]
    const top = yb - L.h
    const bx = P.x + B.x, by = top + B.nameH
    const k = easeOutBack(pop, 2.2), a = clamp(pop * 3)
    x.save()
    // pop from the avatar corner (bubble's bottom-left)
    const ox = bx, oy = by + L.bh
    x.translate(ox, oy); x.scale(lerp(0.55, 1, k), lerp(0.55, 1, k)); x.translate(-ox, -oy)
    x.globalAlpha *= a
    // name label
    x.textBaseline = 'alphabetic'; x.textAlign = 'left'
    glyphText(x, C.glyph, C.name, bx + 6, top + 28, `700 25px ${MONO}`, C.light)
    // bubble
    rr(x, bx, by, L.bw, L.bh, [28, 28, 28, 8]); x.fillStyle = '#f4ede1'; x.fill()
    x.fillStyle = hexA(C.color, 0.85); x.fillRect(bx, by + 18, 5, L.bh - 36)
    x.font = B.font; x.fillStyle = INK
    it.lines.forEach((l, i) => x.fillText(l, bx + B.padX, by + B.padY + B.lh * (i + 1) - 13))
    // attachment
    if (it.attach) {
      const ay = by + L.bh + 12, aw = 500, ah = ATT[it.attach]
      rr(x, bx, ay, aw, ah, 24); x.fillStyle = '#231842'; x.fill(); x.lineWidth = 2.5; x.strokeStyle = hexA(C.light, 0.55); x.stroke()
      if (it.attach === 'dog') {
        x.save(); x.beginPath(); x.arc(bx + 64, ay + ah / 2, 44, 0, TAU); x.fillStyle = '#ffe9c2'; x.fill(); x.restore()
        drawDog(x, bx + 64, ay + ah / 2 + 2, 6)
        x.font = `700 27px ${MONO}`; x.fillStyle = BONE; x.fillText('@biscuit.the.dog', bx + 126, ay + 52)
        x.font = `700 21px ${MONO}`; x.fillStyle = hexA(GOLD, 0.95); x.fillText('VIEW ACCOUNT  ›', bx + 126, ay + 90)
      } else {
        // a page icon with a folded corner + rows
        const px = bx + 30, py = ay + 18, pw = 58, ph = 76
        x.fillStyle = '#fffaf0'; x.beginPath(); x.moveTo(px, py); x.lineTo(px + pw - 16, py); x.lineTo(px + pw, py + 16); x.lineTo(px + pw, py + ph); x.lineTo(px, py + ph); x.closePath(); x.fill()
        x.fillStyle = '#c9cfdc'; x.beginPath(); x.moveTo(px + pw - 16, py); x.lineTo(px + pw - 16, py + 16); x.lineTo(px + pw, py + 16); x.closePath(); x.fill()
        for (let r = 0; r < 5; r++) { x.fillStyle = r % 2 ? '#ef5c94' : '#9aa3b5'; x.fillRect(px + 9, py + 24 + r * 10, r % 2 ? 26 : 38, 4) }
        x.font = `700 28px ${INTER}`; x.fillStyle = BONE; x.fillText('pros & cons (FINAL).doc', bx + 112, ay + 48)
        x.font = `700 21px ${MONO}`; x.fillStyle = hexA(C.light, 0.95); x.fillText('40 ROWS · SHARED', bx + 112, ay + 84)
      }
    }
    x.restore()
    // avatar (outside the pop scale so it doesn't wobble)
    avatarAt(it.who, P.x + 64, by + L.bh - 32, 62, t, clamp(pop * 1.6))
  }

  /** a centred grey system pill: [glyph] text */
  function pill(cx, y, C, text) {
    x.font = `700 25px ${MONO}`
    const gw = C ? x.measureText(C.glyph).width + 12 : 0
    const tw = x.measureText(text).width + gw + 44
    rr(x, cx - tw / 2, y, tw, 42, 21); x.fillStyle = 'rgba(255,255,255,0.09)'; x.fill()
    x.textBaseline = 'middle'; x.textAlign = 'left'
    glyphText(x, C ? C.glyph : null, text, cx - tw / 2 + 22, y + 22, `700 25px ${MONO}`, hexA(BONE, 0.82), C ? C.light : BONE)
    x.textBaseline = 'alphabetic'
  }

  /** the new-group welcome: a big zodiac-ring avatar, the chat's name, who made it */
  function drawHello(it, L, yb, t, pop) {
    const top = yb - L.h, cx = P.x + P.w / 2, ay = top + 168
    x.save(); x.globalAlpha *= clamp(pop * 3)
    const k = easeOutBack(pop, 1.8)
    x.translate(cx, ay); x.scale(k, k); x.translate(-cx, -ay)
    x.beginPath(); x.arc(cx, ay, 78, 0, TAU); x.fillStyle = '#1a1036'; x.fill(); x.lineWidth = 4; x.strokeStyle = hexA(GOLD, 0.75); x.stroke()
    cast.ring.forEach((c, i) => { const a = -Math.PI / 2 + i * TAU / 12 + t * 0.4; x.fillStyle = c; x.fillRect(Math.round(cx + Math.cos(a) * 55 - 7), Math.round(ay + Math.sin(a) * 55 - 7), 14, 14) })
    drawPixelStar(x, cx, ay, 49, 1, GOLD, '#fffbe8')
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.font = `800 54px ${INTER}`; x.fillStyle = BONE
    const tw = x.measureText(title[0]).width
    x.fillText(title[0], cx, ay + 150)
    sparkleMark(x, cx - tw / 2 - 40, ay + 130, 36, t)
    sparkleMark(x, cx + tw / 2 + 40, ay + 130, 36, t + 1.3)
    x.font = `700 26px ${MONO}`; x.fillStyle = hexA(BONE, 0.6); x.fillText('12 stars', cx, ay + 196)
    x.restore()
    x.save(); x.globalAlpha *= clamp((pop - 0.3) * 3)
    pill(cx, ay + 232, cast[it.who], it.text)
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = hexA(BONE, 0.45); x.fillText(it.stamp, cx, ay + 320)
    x.restore()
  }

  function drawSys(it, L, yb, t, pop) {
    const C = it.who ? cast[it.who] : null
    const y = yb - L.h + 8
    x.save(); x.globalAlpha *= clamp(pop * 3)
    x.font = `700 25px ${MONO}`
    const gw = C ? x.measureText(C.glyph).width + 12 : 0
    const tw = x.measureText(it.text).width + gw + 44
    const cx = P.x + P.w / 2
    const k = easeOutBack(pop, 2)
    x.translate(cx, y + 21); x.scale(k, k); x.translate(-cx, -(y + 21))
    rr(x, cx - tw / 2, y, tw, 42, 21); x.fillStyle = 'rgba(255,255,255,0.09)'; x.fill()
    x.textBaseline = 'middle'
    glyphText(x, C ? C.glyph : null, it.text, cx - tw / 2 + 22, y + 22, `700 25px ${MONO}`, hexA(BONE, 0.82), C ? C.light : BONE)
    x.restore()
  }

  function drawSeen(it, L, yb, t, pop) {
    x.save(); x.globalAlpha *= clamp(pop * 2)
    x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'alphabetic'; x.fillStyle = hexA(BONE, 0.62)
    x.fillText(it.text, P.x + P.w - 46, yb - L.h + 26)
    x.restore()
  }

  function typingRow(t) {
    const live = typing.filter(s => t >= s.a && t < s.b + 0.22)
    if (!live.length) return
    const y = P.y + P.h - P.foot / 2 - 2
    let cx = P.x + 58
    live.forEach((s, i) => {
      const k = easeOutBack(prog(t, s.a, s.a + 0.26), 2.2) * (1 - ease.inQuad(prog(t, s.b, s.b + 0.22)))
      if (k <= 0.01) return
      avatarAt(s.who, cx + i * 34, y, 44, t, k)
    })
    const allOut = live.every(s => t >= s.b)
    const px = cx + (live.length - 1) * 34 + 42
    const k = live.reduce((m, s) => Math.max(m, easeOutBack(prog(t, s.a, s.a + 0.26), 2) * (1 - ease.inQuad(prog(t, s.b, s.b + 0.22)))), 0)
    if (k <= 0.01) return
    x.save(); x.translate(px, y); x.scale(k, k)
    rr(x, 0, -22, 100, 44, 22); x.fillStyle = 'rgba(244,237,225,0.95)'; x.fill()
    for (let i = 0; i < 3; i++) {
      const up = allOut ? 0 : Math.max(0, Math.sin(t * 10 - i * 0.9)) * 6
      x.fillStyle = INK; x.beginPath(); x.arc(26 + i * 24, -up, 7, 0, TAU); x.fill()
    }
    x.restore()
  }

  return {
    P, bottomOf, lay,
    draw(t, { dx = 0, dy = 0, s = 1, alpha = 1, pk = 1 } = {}) {
      if (alpha <= 0 || pk <= 0.01) return
      x.save()
      x.globalAlpha *= alpha
      const cx = P.x + P.w / 2, cy = P.y + P.h / 2
      x.translate(cx + dx, cy + dy); x.scale(s * pk, s * pk); x.translate(-cx, -cy)
      // the panel: dark glass with a soft lavender glow and a bone hairline
      x.save(); x.shadowColor = 'rgba(201,166,255,0.45)'; x.shadowBlur = 60
      rr(x, P.x, P.y, P.w, P.h, P.r)
      const g = x.createLinearGradient(0, P.y, 0, P.y + P.h); g.addColorStop(0, 'rgba(34,22,68,0.95)'); g.addColorStop(1, 'rgba(15,9,36,0.95)')
      x.fillStyle = g; x.fill(); x.restore()
      x.lineWidth = 3; x.strokeStyle = hexA(BONE, 0.42); rr(x, P.x, P.y, P.w, P.h, P.r); x.stroke()
      header(t)
      // the thread (clipped to the body)
      x.save(); x.beginPath(); x.rect(P.x, bodyTop, P.w, bodyBot - bodyTop); x.clip()
      items.forEach((it, i) => {
        if (t < it.t) return
        const yb = bottomOf(i, t)
        if (yb < bodyTop - 4) return
        const pop = prog(t, it.t + 0.07, it.t + 0.37)          // a beat after the scroll starts, so bubbles never overlap
        if (it.kind === 'msg') drawMsg(it, lay[i], yb, t, pop)
        else if (it.kind === 'hello') drawHello(it, lay[i], yb, t, prog(t, it.t, it.t + 0.45))
        else if (it.kind === 'sys') drawSys(it, lay[i], yb, t, pop)
        else drawSeen(it, lay[i], yb, t, pop)
      })
      x.restore()
      // a soft fade at the top of the thread, under the header
      const fg = x.createLinearGradient(0, bodyTop, 0, bodyTop + 50); fg.addColorStop(0, 'rgba(30,20,62,0.95)'); fg.addColorStop(1, 'rgba(30,20,62,0)')
      x.fillStyle = fg; x.fillRect(P.x + 4, bodyTop, P.w - 8, 50)
      typingRow(t)
      x.restore()
    },
  }
}
