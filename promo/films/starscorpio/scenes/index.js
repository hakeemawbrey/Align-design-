// starscorpio (15 s vertical Align ad, Star Talk #2) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–3.90  "Dear *Scorpio*…"  The crimson ♏ star pops in; a pixel phone buzzes beside it ("ok."). The star squints at it,
//              a magnifying glass swoops in over the text and the "…" typing dots come and go. The RPG box opens:
//              ♏ SCORPIO STAR "you don't have to read their texts like *evidence.*" — said WHILE investigating.
//   3.60–6.30  Caught: the star goes wide-eyed at you ("!"), the magnifier clatters away, a sheepish blush + sweat drop.
//              "Ruled by Pluto, | not the *FBI.*"  Then it softens (sparkle eyes): "just ask. *out loud.*" The phone slides off.
//   6.30–8.40  "Ask something | *real.*"  A card back drops in and flips to a real talk card ("What's a hill you will die on?").
//              The star (smaller, lower left) looks up at it, heart-eyed. Box shuts at 7.5.
//   8.45 cut → "The stars | said *ask.*"  The star front and centre, happy hops, little "?" pixel balloons pop around it.
//   10.45→     plain sky; the end card takes over at 10.6.
// One canvas (sky + characters + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', SKYBLUE = '#8fd3ff'
const SCORP = signStar('scorpio')              // { color: '#e23d66', glyph: '♏' }
const RED = '#ff6f8f'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [3.72, 3.9],
  star: 0.22, phone: 0.62, bubble: 0.9, lookPhone: 1.12, squint: 1.25, mag: [1.32, 1.7], dots: [2.05, 2.75], dots2: [3.05, 3.4],
  open: 1.72, l1: 1.9,
  caught: 3.62, magFall: 3.66, sheep: 4.15,
  h1: 3.95, h1Out: [6.12, 6.3],
  l2: 5.1, soften: 5.1, phoneOut: [5.55, 6.05], toYou: 5.95,
  shrink: [6.2, 6.7], h2: 6.38, cardIn: [6.36, 6.7], flip: [6.82, 7.22], heartEyes: 7.25, close: 7.6, cardOut: [8.18, 8.4],
  cut: 8.45,
  h3: 8.5, h3Land: 8.98, balloons: 9.05, wink: [9.75, 10.15], h3Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAKER = SCORP.glyph + ' SCORPIO STAR'
const LINES = [
  { t: T.l1, speaker: SPEAKER, text: "you don't have to read their texts like *evidence.*", color: RED },
  { t: T.l2, speaker: SPEAKER, text: 'just ask. *out loud.*', color: RED },
]
const CPS = 30
const HOPS = [T.star + 0.3, ...talkHops(LINES, SPEAKER, { cps: CPS }), T.caught, T.heartEyes, T.h3Land, T.balloons + 0.45, T.wink[0]]

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── layout
const HERO_A = { x: 330, y: 930, size: 370 }      // beat 1–2: left of the phone
const HERO_B = { x: 205, y: 1175, size: 250 }     // beat 3: lower left, looking up at the card
const HERO_C = { x: 540, y: 1010, size: 420 }     // beat 4: front and centre
const PHONE = { x: 815, y: 905, px: 8, cw: 28, ch: 50 }   // centre, pixel size, cells
const CARD = { x: 650, y: 960, h: 820 }           // card-talk-*.png is 732×1170 (glow margin incl.)

function heroPose(t) {
  if (t < T.shrink[0]) return HERO_A
  if (t < T.cut) { const k = ease.inOutCubic(prog(t, ...T.shrink)); return { x: lerp(HERO_A.x, HERO_B.x, k), y: lerp(HERO_A.y, HERO_B.y, k), size: lerp(HERO_A.size, HERO_B.size, k) } }
  return HERO_C
}

function heroState(t) {
  const blinkOnce = (t0) => { const k = t - t0; return k >= 0 && k < 0.16 ? (k < 0.04 || k > 0.12 ? 0.5 : 1) : undefined }
  if (t < T.lookPhone) return { mood: 'neutral', look: t < T.phone + 0.15 ? [0, 0] : [1, 0] }
  if (t < T.squint) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.caught) {
    // suspicious: squint at the phone; the eyes snap wider while the "…" dots show (who's typing?!)
    const dotsOn = (t >= T.dots[0] && t < T.dots[1]) || (t >= T.dots2[0] && t < T.dots2[1])
    return { mood: dotsOn && ((t - T.dots[0]) % 1.0) < 0.35 ? 'wide' : 'squint', look: [1, 0.3], blink: false }
  }
  if (t < T.sheep) return { mood: 'wide', look: [0, 0], blink: false, blush: 0.9 }
  if (t < T.soften) return { mood: 'neutral', look: [-1, 1], blush: 1, blink: blinkOnce(4.55) ?? false }
  if (t < T.phoneOut[0]) return { mood: 'sparkle', look: [0, 0], blink: false }
  if (t < T.toYou) return { mood: 'neutral', look: [1, 1], blink: false }
  if (t < T.shrink[0]) return { mood: 'happy' }
  if (t < T.cut) {
    if (t < T.flip[1]) return { mood: 'wide', look: [1, -1], blink: false }
    if (t < T.close + 0.2) return { mood: 'heart', look: [1, -1] }
    return { mood: 'happy' }
  }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.h3Land) return { mood: 'happy' }
  return { mood: 'sparkle', look: [0, 0], blink: blinkOnce(9.5) ?? false }
}

// ── pixel-art bits
function pixRows(ctx, rows, x, y, c, colors) {
  rows.forEach((r, j) => [...r].forEach((ch, i) => { const col = colors[ch]; if (col) { ctx.fillStyle = col; ctx.fillRect(Math.round(x + i * c), Math.round(y + j * c), c, c) } }))
}
const BANG = ['.XX.', '.XX.', '.XX.', '.XX.', '.XX.', '....', '.XX.']
const QMARK = ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.....', '..X..']
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 44px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [imBack, imTalk] = await Promise.all([load('card-back.png'), load('card-talk-1.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  // the phone is painted into its own small canvas each frame (so the magnifier can show it enlarged)
  const PW = PHONE.cw * PHONE.px, PH = PHONE.ch * PHONE.px
  const pc = document.createElement('canvas'); pc.width = PW; pc.height = PH
  const px = pc.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Scorpio*…', { top: 250, size: 120, accentSize: 176, at: T.h0, wobble: true, gap: 0.12, accentColor: RED })
  const H1 = popText(root, 'Ruled by Pluto, | not the *FBI.*', { top: 205, size: 104, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1 + 0.42, wobble: true, gap: 0.08, accentColor: RED })
  const H2 = popText(root, 'Ask something | *real.*', { top: 150, size: 112, accentSize: 170, at: T.h2, late: 1, lateAt: T.h2 + 0.36, wobble: true, gap: 0.08, accentColor: GOLD, lineHeight: 0.98 })
  const H3 = popText(root, 'The stars | said *ask.*', { top: 210, size: 136, accentSize: 210, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, [T.cut - 0.27, T.cut - 0.1]], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the phone screen (local coords, PW×PH)
  function paintPhone(t) {
    const c = PHONE.px
    px.clearRect(0, 0, PW, PH)
    // body: stepped-corner pixel slab, gold rim
    px.fillStyle = '#d9b25a'; px.fillRect(c, 0, PW - 2 * c, PH); px.fillRect(0, c, PW, PH - 2 * c)
    px.fillStyle = '#1a1033'; px.fillRect(2 * c, c, PW - 4 * c, PH - 2 * c); px.fillRect(c, 2 * c, PW - 2 * c, PH - 4 * c)
    // screen
    const sx = 2 * c, sy = 4 * c, sw = PW - 4 * c, sh = PH - 9 * c
    const g = px.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2b1c55'); g.addColorStop(1, '#170d33')
    px.fillStyle = g; px.fillRect(sx, sy, sw, sh)
    px.fillStyle = '#0c0620'; px.fillRect(PW / 2 - 3 * c, 2 * c, 6 * c, c)                 // speaker slot
    px.fillStyle = 'rgba(239,230,214,0.55)'; px.fillRect(PW / 2 - 4 * c, PH - 3 * c, 8 * c, c) // home bar
    // header: a tiny contact dot + "them"
    px.fillStyle = PINK; px.fillRect(sx + 2 * c, sy + 2 * c, 3 * c, 3 * c)
    px.font = `700 ${Math.round(c * 2.6)}px ${MONO}`; px.textBaseline = 'middle'; px.textAlign = 'left'
    px.fillStyle = 'rgba(239,230,214,0.8)'; px.fillText('them', sx + 6.5 * c, sy + 3.6 * c)
    px.fillStyle = 'rgba(239,230,214,0.18)'; px.fillRect(sx, sy + 6.5 * c, sw, c / 2)
    // the incoming bubble: "ok."
    const bk = easeOutBack(prog(t, T.bubble, T.bubble + 0.3), 2.4)
    if (bk > 0) {
      const bw = 15 * c, bh = 8 * c, bx = sx + 2 * c, by = sy + 12 * c
      px.save(); px.translate(bx, by + bh); px.scale(bk, bk); px.translate(-bx, -(by + bh))
      px.fillStyle = '#efe6d6'; px.fillRect(bx + c, by, bw - 2 * c, bh); px.fillRect(bx, by + c, bw, bh - 2 * c); px.fillRect(bx, by + bh - c, 2 * c, 2 * c)
      px.fillStyle = '#1b1236'; px.font = `800 ${Math.round(c * 5)}px ${INTER}`; px.textAlign = 'left'
      px.fillText('ok.', bx + 2.4 * c, by + bh / 2 + c * 0.3)
      px.restore()
      // timestamp
      px.fillStyle = 'rgba(239,230,214,0.45)'; px.font = `700 ${Math.round(c * 1.9)}px ${MONO}`
      px.fillText('11:47 PM', bx + c, by + bh + 2.6 * c)
    }
    // typing dots "…" that appear and disappear (the suspense)
    const dotsOn = (t >= T.dots[0] && t < T.dots[1]) || (t >= T.dots2[0] && t < T.dots2[1])
    if (dotsOn) {
      const bx = sx + 2 * c, by = sy + 26 * c
      px.fillStyle = 'rgba(239,230,214,0.25)'; px.fillRect(bx + c, by, 11 * c, 6 * c); px.fillRect(bx, by + c, 13 * c, 4 * c)
      for (let i = 0; i < 3; i++) {
        const up = Math.floor(((t * 3.2 - i * 0.3) % 1 + 1) % 1 * 2) === 0 ? c : 0
        px.fillStyle = BONE; px.fillRect(bx + (2.5 + i * 3.2) * c, by + 2.5 * c - up, 2 * c, 2 * c)
      }
    }
  }

  function phoneState(t) {
    const pin = easeOutBack(prog(t, T.phone, T.phone + 0.36), 2.2)
    const po = ease.inCubic(prog(t, ...T.phoneOut))
    const buzz = t > T.phone + 0.2 && t < T.phone + 0.75 ? Math.sin(t * 90) * 7 * (1 - prog(t, T.phone + 0.2, T.phone + 0.75)) : 0
    const buzz2 = t > T.bubble && t < T.bubble + 0.3 ? Math.sin(t * 95) * 5 : 0
    const bob = Math.sin(t * 1.9 + 1) * 7
    return { k: pin, x: PHONE.x + buzz + buzz2 + po * 260, y: PHONE.y + bob + po * 900, rot: (buzz + buzz2) * 0.006 + po * 0.5, alpha: 1 - clamp(po * 1.4 - 0.4) }
  }

  function drawPhone(t) {
    if (t < T.phone || t > T.phoneOut[1]) return null
    const st = phoneState(t)
    if (st.k <= 0.01) return null
    paintPhone(t)
    x.save(); x.globalAlpha = st.alpha
    // glow
    const gr = x.createRadialGradient(st.x, st.y, 30, st.x, st.y, 300); gr.addColorStop(0, 'rgba(201,166,255,0.32)'); gr.addColorStop(1, 'rgba(201,166,255,0)')
    x.fillStyle = gr; x.fillRect(st.x - 320, st.y - 320, 640, 640)
    x.translate(st.x, st.y); x.rotate(st.rot); x.scale(st.k, st.k)
    x.imageSmoothingEnabled = false
    x.drawImage(pc, -PW / 2, -PH / 2)
    x.restore()
    // buzz marks
    if (t > T.phone + 0.15 && t < T.phone + 0.75) {
      x.save(); x.fillStyle = GOLD; x.globalAlpha = (Math.floor(t * 12) % 2) ? 0.9 : 0.4
      for (const s of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(st.x + s * (PW / 2 + 22 + i * 4), st.y - 60 + i * 44, 8, 26)
      x.restore()
    }
    return st
  }

  // ── the magnifying glass (pixel ring + handle), showing the phone enlarged inside
  function drawMag(t, st) {
    if (!st || t < T.mag[0]) return
    const fall = Math.max(0, t - T.magFall)
    if (fall > 0.9) return
    const k = ease.outCubic(prog(t, ...T.mag))
    // hover target: over the bubble, drifting in a lazy figure-eight (inspecting)
    const tx = st.x - 22 + Math.sin(t * 2.3) * 26, ty = st.y - 42 + Math.sin(t * 4.6) * 12
    let mx = lerp(1080 + 140, tx, k), my = lerp(1350, ty, k), rot = lerp(0.9, 0, k)
    if (fall > 0) { mx += fall * 260; my += 900 * fall * fall - 240 * fall; rot += fall * 7 }
    const R = 92, c = 8
    x.save()
    x.translate(mx, my); x.rotate(rot)
    // handle (down-right)
    x.fillStyle = '#7a4b2a'
    for (let i = 0; i < 9; i++) x.fillRect(R * 0.7 + i * c * 1.0, R * 0.7 + i * c * 1.0, c * 3, c * 3)
    x.fillStyle = '#a8673a'; for (let i = 0; i < 9; i++) x.fillRect(R * 0.7 + i * c, R * 0.7 + i * c, c * 2, c)
    // lens content: the phone at 1.9×, clipped to the lens
    x.save(); x.beginPath(); x.arc(0, 0, R - 4, 0, Math.PI * 2); x.clip()
    x.fillStyle = 'rgba(30,18,60,0.9)'; x.fillRect(-R, -R, 2 * R, 2 * R)
    if (fall <= 0) {
      x.rotate(-rot)
      const Z = 1.9
      x.imageSmoothingEnabled = false
      x.scale(Z, Z); x.translate(-mx, -my)
      x.translate(st.x, st.y); x.rotate(st.rot); x.scale(st.k, st.k)
      x.drawImage(pc, -PW / 2, -PH / 2)
    }
    x.restore()
    // lens glint
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(-R * 0.55, -R * 0.62, c * 2, c * 5); x.fillRect(-R * 0.62, -R * 0.55, c * 5, c * 2)
    // pixel ring
    x.fillStyle = GOLD
    for (let a = 0; a < 48; a++) { const an = a / 48 * Math.PI * 2; x.fillRect(Math.round(Math.cos(an) * R / c) * c - c, Math.round(Math.sin(an) * R / c) * c - c, c * 2, c * 2) }
    x.fillStyle = '#fff1c8'
    for (let a = 30; a < 38; a++) { const an = a / 48 * Math.PI * 2; x.fillRect(Math.round(Math.cos(an) * (R - 4) / c) * c - c / 2, Math.round(Math.sin(an) * (R - 4) / c) * c - c / 2, c, c) }
    x.restore()
  }

  // ── the talk card: a back drops in, flips to the front
  function drawCard(t) {
    if (t < T.cardIn[0] || t > T.cut) return
    const pin = easeOutBack(prog(t, ...T.cardIn), 1.7)
    const out = 1 - ease.inCubic(prog(t, ...T.cardOut))
    const fp = prog(t, ...T.flip)
    const ang = ease.inOutCubic(fp) * Math.PI
    const sxk = Math.abs(Math.cos(ang)) * (1 + 0.08 * Math.sin(ang))
    const front = ang > Math.PI / 2
    const im = front ? imTalk : imBack
    const h = CARD.h * (front ? 1 : 0.96), w = h * (im ? im.width / im.height : 0.626)
    const yy = lerp(CARD.y + 600, CARD.y, pin) + Math.sin(t * 1.7) * 6 - 18 * Math.sin(Math.PI * fp)
    x.save()
    x.globalAlpha = clamp(pin * 2) * out
    // halo
    const hk = front ? 0.55 + 0.3 * Math.exp(-(t - T.flip[1]) * 3) : 0.25
    const gr = x.createRadialGradient(CARD.x, yy, 60, CARD.x, yy, 520); gr.addColorStop(0, `rgba(242,199,92,${hk * 0.45})`); gr.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = gr; x.fillRect(CARD.x - 540, yy - 540, 1080, 1080)
    x.translate(CARD.x, yy); x.rotate((1 - pin) * 0.25 + 0.02 * Math.sin(t * 1.3)); x.scale(Math.max(0.02, sxk) * lerp(0.7, 1, pin) * lerp(0.85, 1, out), lerp(0.7, 1, pin) * lerp(0.85, 1, out))
    if (im) x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
    // flip sparkles
    if (t > T.flip[1] - 0.05 && t < T.flip[1] + 0.7) sparkles(t, CARD.x, yy, T.flip[1] - 0.05, 10, 300, 3)
  }

  function sparkles(t, cx, cy, t0, n, R, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  // little pixel marks over the star's head: "?" while investigating, "!" when caught, a sweat drop when sheepish
  function marks(t, top, hx) {
    const c = 9
    const pop = (t0, t1) => { if (t < t0 || t > t1) return 0; return easeOutBack(prog(t, t0, t0 + 0.22), 2.6) * (1 - ease.inQuad(prog(t, t1 - 0.15, t1))) }
    const q = [[2.15, 2.9, -70, 0], [2.55, 3.4, 40, 1]]
    for (const [a, b, dx, i] of q) {
      const k = pop(a, b); if (k <= 0) continue
      x.save(); x.translate(hx + dx, top - 40 - (t - a) * 30); x.scale(k, k); x.rotate(i ? 0.18 : -0.18)
      pixRows(x, QMARK, -2.5 * c, -3.5 * c, c, { X: GOLD })
      x.restore()
    }
    const kb = pop(T.caught, T.caught + 0.62)
    if (kb > 0) {
      x.save(); x.translate(hx, top - 52); x.scale(kb * 1.25, kb * 1.25)
      pixRows(x, BANG, -2 * c - 3, -3.5 * c + 3, c, { X: '#1b1236' })
      pixRows(x, BANG, -2 * c, -3.5 * c, c, { X: '#ffd76a' })
      x.restore()
    }
    const kd = pop(T.sheep - 0.05, T.soften - 0.05)
    if (kd > 0) {
      const dy = (t - T.sheep) * 26
      x.save(); x.globalAlpha = kd; x.translate(hx + HERO_A.size * 0.28, top + HERO_A.size * 0.22 + dy)
      pixRows(x, DROP, -2.5 * 8, 0, 8, { X: SKYBLUE, W: '#e9f7ff' })
      x.restore()
    }
  }

  // tiny "?" speech balloons popping around the star at the end (asking, out loud)
  const BALLOONS = [[-320, -150, 0], [320, -200, 0.18], [-290, 230, 0.36], [310, 190, 0.52]]
  function balloons(t, cx, cy) {
    const ok = popOut(t, T.out)
    for (const [dx, dy, d] of BALLOONS) {
      const t0 = T.balloons + d, k = easeOutBack(prog(t, t0, t0 + 0.3), 2.6) * ok
      if (k <= 0) continue
      const c = 10, bx = cx + dx, by = cy + dy + Math.sin((t - t0) * 3 + d * 9) * 8
      x.save(); x.translate(bx, by); x.scale(k, k)
      const BAL = ['.XXXXXXX.', 'XXXXXXXXX', 'XXXXXXXXX', 'XXXXXXXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', (dx < 0 ? '......XX.' : '.XX......'), (dx < 0 ? '.......X.' : '.X.......')]
      pixRows(x, BAL, -4.5 * c, -4.5 * c, c, { X: BONE })
      pixRows(x, QMARK, -2.5 * c, -3.5 * c, c, { X: d * 10 % 2 < 1 ? '#c8204e' : '#6a2fe0' })
      x.restore()
    }
  }

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const P = heroPose(t)
    const pin = easeOutBack(prog(t, T.star, T.star + 0.4), 2.0)
    const pk = (t < T.cut ? pin : easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8)) * ok
    if (pk <= 0.02) return
    const st = heroState(t)
    // caught: a jolt (stretch up) then settle
    let sq = 0
    if (t > T.caught) sq += -0.16 * Math.exp(-(t - T.caught) * 7) * Math.cos((t - T.caught) * 22)
    // leaning in toward the phone while investigating
    const lean = t > T.lookPhone && t < T.caught ? 22 * ease.outCubic(prog(t, T.lookPhone, T.lookPhone + 0.4)) : t >= T.caught && t < T.caught + 0.3 ? 22 * (1 - ease.outCubic(prog(t, T.caught, T.caught + 0.3))) : 0
    const r = drawStarChar(x, P.x + lean, P.y, P.size, t, { color: SCORP.color, glyph: SCORP.glyph, ...st, hops: HOPS, pop: pk, squash: sq, seed: 8, glow: 1.15 })
    if (t < T.cut) marks(t, r.top, P.x + lean)
    if (t > T.cut) { sparkles(t, P.x, P.y, T.h3Land, 12, 290, 5); balloons(t, P.x, P.y) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      const ph = drawPhone(t)
      drawCard(t)
      if (t < T.out[1] + 0.02) drawHero(t)
      drawMag(t, ph || (t < T.phoneOut[0] ? phoneState(t) : null))
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.3 (phone gone → "Ask something real." + the talk card) and 8.45 (card gone → "The stars said ask.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [6.3, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = (t0, n = 7, gap = 0.055, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (i % 2 ? 0.7 : 1)])
export const CUES = [
  // dear scorpio: headline, the star pops in, the phone buzzes, "ok."
  ...wordPops(T.h0, 2, 0.12, 0, 0.026), ['pluck', T.h0 + 0.12, 1174.66, 0.04, 0.6, 0],
  ['pop', T.star + 0.08, 739.99, 0.04, -0.2], ['pop', T.star + 0.3, 987.77, 0.03, -0.2],
  ['pop', T.phone + 0.05, 587.33, 0.035, 0.3], ...buzz(T.phone + 0.2), ...buzz(T.bubble + 0.02, 4, 0.06, 0.025),
  ['pop', T.bubble + 0.05, 1318.51, 0.035, 0.35],
  // squint + the magnifier swoops in
  ['pop', T.squint, 440, 0.03, -0.2], ['whoosh', T.mag[0], 0.4, 0.035],
  ['tick', T.dots[0], 0.025], ['tick', T.dots2[0], 0.025], ['pluck', 2.17, 880, 0.022, 0.3, -0.3], ['pluck', 2.57, 987.77, 0.022, 0.3, 0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAKER]: 660 } }),
  // caught!
  ['pop', T.caught, 1318.51, 0.05, 0], ['bell', T.caught, 1760, 0.025, 0.8, 0],
  ['tick', T.magFall + 0.4, 0.05], ['tick', T.magFall + 0.52, 0.035], ['pop', T.magFall + 0.45, 220, 0.035, 0.5],
  // pluto, not the fbi
  ...wordPops(T.h1, 5, 0.08, 1, 0.022), ['pop', T.h1 + 0.42, 1174.66, 0.045, 0], ['pluck', T.h1 + 0.42, 880, 0.035, 0.5, 0],
  // soften; the phone slides away
  ['bell', T.soften + 0.05, 1318.51, 0.025, 1.4, 0], ['whoosh', T.phoneOut[0], 0.45, 0.03],
  // ask something real: card drops, flips
  ...wordPops(T.h2, 2, 0.08, 2, 0.025), ['pop', T.h2 + 0.36, 1318.51, 0.045, 0],
  ['tick', T.cardIn[1] - 0.06, 0.045], ['whoosh', T.flip[0], 0.3, 0.03], ['tick', T.flip[0] + 0.2, 0.05],
  ['bell', T.flip[1], 1760, 0.035, 1.4, 0.1], ['glitter', T.flip[1] - 0.05, T.flip[1] + 0.5],
  ['pluck', T.heartEyes, 1174.66, 0.035, 0.5, -0.3], ['pluck', T.heartEyes + 0.12, 1318.51, 0.03, 0.5, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // the stars said ask
  ...wordPops(T.h3, 3, 0.1, 1, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h3Land, T.h3Land + 0.45],
  ...BALLOONSFX(),
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function BALLOONSFX() { return [0, 0.18, 0.36, 0.52].map((d, i) => ['pop', +(T.balloons + d + 0.05).toFixed(3), NOTE[(i * 2 + 2) % 7], 0.026, i % 2 ? 0.4 : -0.4]) }
