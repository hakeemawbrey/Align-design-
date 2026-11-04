// THE FIRST THREE DATES: the shared look of the twelve star_advice films nfde01–nfde12 (30 s each, three dates × four
// elements, promo/films/next30/b37.md). Every episode imports this kit from nfde01; nothing here touches another folder.
//
// The format (30 s, story 0–25.6, then the shared end card):
//   0.00–3.00   hook (frame 0 is the thumbnail): "Date *N* with a | *<Element>* sign." is already up, a part sticker
//               under it (WHAT TO ASK · READING IT · SAYING WHAT YOU WANT), the date star mid-action at the spot and
//               YOU (a lavender star) beside it. Three heart pips under the bug: the episode's date is lit.
//   3.00–11.00  SKIP: "*Skip:* <the move>." YOU try it (speech bubble), the date reacts (yawn / eyeroll / shrink),
//               a red SKIP ✕ stamp slams over it.
//   11.00       the one card cut.
//   11.00–19.20 TRY: "*Try:* <the move>." YOU try the good move, the date lights up and answers, a green ✓ pops.
//               THE STARS explain in two lines (dialogue box).
//   19.20–25.50 TIP: a pinned note with the tip and a light app tie-in chip; THE STARS say the last line.
// Pisces cries somewhere in every film (a background cameo, or the date itself in the Pisces episode).
//
//   makeDates(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.date (1–3), cfg.element ('Fire'…), cfg.sign ('aries'…), cfg.name ('Aries'), cfg.set (setting kind),
//     cfg.skipHead, cfg.skipSay, cfg.skipReact, cfg.skipMood, cfg.tryHead, cfg.trySay, cfg.tryReply,
//     cfg.stars [line1, line2], cfg.tip [≤ 3 short lines], cfg.tie ('talk' | 'pull' | 'deal'), cfg.last,
//     cfg.hookMood, cfg.hookProp(x, t, F) optional, cfg.dateIsPisces.
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { fill, A } from '../../../src/scenes/common.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, RED, LAV, INTER, MONO, BUG_PINK, r3, pop01, outK, popOut, clamp, lerp, prog, ease, el, easeOutBack,
  R, box, drawBits, HEART, sparkles, hearts, label, shadow, starFrame, inSprite, tearsCells, buildBug,
} from '../../nnye01/scenes/pix.js'

export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN          // 25.6
export const T = {
  h0: -0.9, h0Out: [2.85, 3.05],
  hS: 3.1, hSOut: [10.7, 10.9], youSay: 3.7, react: 5.9, xStamp: 8.4,
  cut: 11.0,
  hT: 11.1, hTOut: [19.0, 19.2], youSay2: 11.7, reply: 13.3, check: 14.0,
  starsIn: 14.2, l1: 14.6, l2: 17.0,
  hTip: 19.3, note: 19.5, chip: 20.3, last: 21.3,
  boxClose: 25.1, out: [25.1, 25.5], bugOut: [25.2, 25.5],
}
const CPS = 30
const PARTS = ['', 'WHAT TO ASK', 'READING DATE 2', 'SAYING WHAT YOU WANT']
const YOU_COL = LAV
const FLOOR = 1160

// ── a word-wrapped pixel speech bubble (canvas)
function wrapLines(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
  return out
}
function say(x, t, cx, cy, t0, t1, text, { col = BONE, size = 40, tail = 0, maxW = 500 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.font = `800 ${size}px ${INTER}`
  const lines = wrapLines(x, text, maxW), lh = size * 1.18
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, h = lines.length * lh + 30
  x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + lh * (i + 0.5) + 2))
  x.restore()
}

// ── settings (behind the stars)
function stringLights(x, t, y, cols) {
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(0, y); x.quadraticCurveTo(540, y + 110, 1080, y); x.stroke()
  for (let i = 0; i < 13; i++) {
    const u = (i + 0.5) / 13, px = u * 1080, py = y + 220 * u * (1 - u) * 1 + 10
    const on = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.7)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * on
    const g = x.createRadialGradient(px, py, 2, px, py, 40); g.addColorStop(0, cols[i % cols.length]); g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g; x.fillRect(px - 40, py - 40, 80, 80); x.restore()
    R(x, INK, px - 9, py - 6, 18, 22); R(x, cols[i % cols.length], px - 6, py - 3, 12, 16)
  }
}
function floor(x, col, line) { R(x, col, 0, FLOOR, 1080, 260); R(x, line, 0, FLOOR, 1080, 8) }
const SETS = {
  market(x, t) {
    stringLights(x, t, 470, [GOLD, '#ff8fa0', '#9fe6b0'])
    box(x, 120, 820, 840, 70, '#e8344e', { b: 6 }); for (let i = 0; i < 7; i++) R(x, BONE, 120 + i * 120, 820, 60, 70)
    box(x, 160, 890, 760, 270, '#5a3c2a', { b: 6, hi: '#704b34' })
    floor(x, '#2a2046', '#3a2d60')
  },
  golf(x, t) {
    floor(x, '#1f5a3c', '#2f7a54')
    box(x, 460, 700, 160, 460, '#e9e2d0', { b: 6 }); R(x, '#e8344e', 460, 700, 160, 40)
    box(x, 505, 1040, 70, 120, '#3a2d60', { b: 5 })
    x.save(); x.translate(540, 760); x.rotate(t * 1.2)
    for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); box(x, -14, 0, 28, 200, '#c9a6ff', { b: 5 }) }
    x.restore(); R(x, INK, 528, 748, 24, 24)
    R(x, INK, 880, 1100, 8, 70); R(x, RED, 888, 1100, 50, 30)
  },
  trail(x, t) {
    for (const [cx, h, c] of [[110, 520, '#2f6a4a'], [960, 600, '#2a5c42'], [820, 400, '#357a52']]) {
      R(x, '#4a3424', cx - 16, FLOOR - 160, 32, 160)
      for (let j = 0; j < 4; j++) box(x, cx - 70 - j * 22, FLOOR - 160 - h * 0.25 * (j + 1), 140 + j * 44, h * 0.22, c, { b: 5 })
    }
    floor(x, '#3a3050', '#5a4a70'); R(x, '#8a7a60', 380, FLOOR + 20, 320, 240)
    void t
  },
  cafe(x, t) {
    box(x, 160, 520, 300, 300, '#1a2a4a', { b: 8 }); R(x, '#2a3d66', 168, 528, 284, 140)
    box(x, 620, 520, 300, 300, '#1a2a4a', { b: 8 }); R(x, '#2a3d66', 628, 528, 284, 140)
    floor(x, '#3a2a1e', '#5a4030')
    box(x, 330, 1040, 420, 34, '#a07850', { b: 6 }); R(x, INK, 525, 1074, 30, 90)
    box(x, 440, 1000, 46, 40, BONE, { b: 4 }); box(x, 600, 1000, 46, 40, BONE, { b: 4 })
    const st = Math.sin(t * 3); x.save(); x.globalAlpha = 0.4; R(x, BONE, 455 + st * 4, 960, 6, 24); R(x, BONE, 618 - st * 4, 956, 6, 28); x.restore()
  },
  farm(x, t) {
    stringLights(x, t, 500, [GOLD, '#9fe6b0'])
    box(x, 140, 900, 800, 60, '#2f7a54', { b: 6 })
    for (let i = 0; i < 10; i++) box(x, 170 + i * 76, 870, 52, 44, i % 3 ? RED : '#f39a3a', { b: 4 })
    box(x, 180, 960, 720, 200, '#6b4a2f', { b: 6 })
    floor(x, '#2a2046', '#3a2d60')
  },
  kitchen(x, t) {
    box(x, 100, 600, 880, 180, '#3a2d60', { b: 6 }); for (let i = 0; i < 5; i++) box(x, 140 + i * 170, 640, 120, 100, '#4a3a78', { b: 4 })
    floor(x, '#2a2046', '#3a2d60')
    box(x, 260, 1000, 560, 160, '#d8d2c4', { b: 6 }); R(x, INK, 300, 990, 140, 14); R(x, INK, 640, 990, 140, 14)
    box(x, 320, 950, 100, 40, '#5a5470', { b: 4 }); const st = Math.sin(t * 4)
    x.save(); x.globalAlpha = 0.45; R(x, BONE, 360 + st * 5, 900, 8, 36); R(x, BONE, 385 - st * 5, 890, 8, 44); x.restore()
  },
  books(x, t) {
    for (const X of [40, 760]) {
      box(x, X, 520, 280, 640, '#5a3c2a', { b: 6 })
      for (let s = 0; s < 4; s++) { R(x, '#3a2618', X, 520 + s * 160 + 140, 280, 20); for (let b = 0; b < 8; b++) R(x, ['#e8344e', '#7fd0ff', GOLD, '#9fe6b0', LAV][(b + s) % 5], X + 14 + b * 32, 520 + s * 160 + 40 + (b % 3) * 10, 24, 100 - (b % 3) * 10) }
    }
    floor(x, '#3a2a1e', '#5a4030')
    void t
  },
  gallery(x, t) {
    floor(x, '#2a2046', '#3a2d60')
    box(x, 330, 520, 420, 300, '#c9a26a', { b: 8 }); R(x, '#1a2a4a', 350, 540, 380, 260)
    x.fillStyle = '#ff8fa0'; x.fillRect(400, 600, 120, 120); x.fillStyle = GOLD; x.beginPath(); x.arc(640, 640, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fd0ff'; x.fillRect(560, 720, 140, 40)
    R(x, INK, 380, 860, 320, 8)
    void t
  },
  dome(x, t) {
    x.save(); x.fillStyle = 'rgba(10,8,30,0.6)'; x.beginPath(); x.ellipse(540, FLOOR, 640, 700, 0, Math.PI, Math.PI * 2); x.fill(); x.restore()
    for (let i = 0; i < 30; i++) { const a = Math.PI + (i * 0.61 % 1) * Math.PI, rr = 200 + (i * 97 % 400); const px = 540 + Math.cos(a) * rr, py = FLOOR + Math.sin(a) * rr * 1.05; const tw = 0.5 + 0.5 * Math.sin(t * 2 + i); R(x, `rgba(255,241,200,${0.4 + 0.5 * tw})`, px, py, 6, 6) }
    x.strokeStyle = 'rgba(255,241,200,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(380, 640); x.lineTo(470, 560); x.lineTo(580, 600); x.lineTo(660, 520); x.stroke()
    floor(x, '#1a1438', '#2a2050')
  },
  bench(x, t) {
    R(x, '#3a3450', 820, 560, 18, 600); box(x, 780, 520, 100, 60, '#5a5470', { b: 5 })
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(830, 600, 10, 830, 600, 300); g.addColorStop(0, 'rgba(255,224,160,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(530, 300, 600, 600); x.restore()
    floor(x, '#24304a', '#34446a')
    box(x, 200, 1040, 680, 30, '#a07850', { b: 6 }); box(x, 200, 960, 680, 26, '#a07850', { b: 6 }); R(x, INK, 240, 1070, 20, 90); R(x, INK, 820, 1070, 20, 90)
    void t
  },
  lake(x, t) {
    floor(x, '#1a2a4a', '#2a4070')
    for (let i = 0; i < 8; i++) { const y = FLOOR + 30 + i * 28, o = Math.sin(t * 1.5 + i) * 30; R(x, 'rgba(159,216,246,0.25)', 200 + o + (i % 2) * 300, y, 160, 6) }
    x.save(); x.globalAlpha = 0.5; drawBits(x, ['..MMM..', '.MMMMM.', 'MMMMMMM', '.MMMMM.', '..MMM..'], { M: '#fff1c8' }, 540, FLOOR + 120, 10, { outline: null }); x.restore()
  },
  hill(x, t) {
    x.save(); x.fillStyle = '#1e2a40'; x.beginPath(); x.ellipse(540, FLOOR + 260, 900, 380, 0, Math.PI, Math.PI * 2); x.fill(); x.restore()
    R(x, '#2a3a58', 0, FLOOR + 80, 1080, 200)
    void t
  },
}

function heartPips(x, t, n) {
  for (let i = 0; i < 3; i++) {
    const lit = i + 1 === n, cx = 74 + i * 52, cy = 128
    drawBits(x, HEART, { H: lit ? '#ff5c8a' : 'rgba(239,230,214,0.25)' }, cx, cy, lit ? 6 * (1 + 0.08 * Math.max(0, Math.sin(t * 5)) ** 6) : 5)
  }
  label(x, `DATE ${n} OF 3`, 240, 128, { size: 22, col: 'rgba(239,230,214,0.8)', align: 'left' })
}

export function makeDates(cfg) {
  const DATE = signStar(cfg.sign), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.l1, speaker: SPEAK, text: cfg.stars[0] }, { t: T.l2, speaker: SPEAK, text: cfg.stars[1] }, { t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const ELC = ELEMENT_COLOR[cfg.element.toLowerCase()]
  const YOU_HOPS = [-0.15, 1.3, T.youSay, T.youSay + 0.5, T.xStamp + 0.05, T.youSay2, T.youSay2 + 0.5, T.check + 0.05, T.note + 0.2]
  const DATE_HOPS = [-0.05, 0.9, 1.8, T.react, T.reply, T.reply + 0.45, T.check, T.note + 0.3, T.last + 1.2, ...(cfg.dateHops || [])]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 36px Inter", "800 28px Inter", "700 40px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 22px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const talkImg = cfg.tie === 'talk' ? await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + (cfg.card || 'card-talk-3.png') }) : null
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const an = /^[AEIOU]/.test(cfg.element) ? 'an' : 'a'
    const H0 = popText(root, `Date *${cfg.date}* with ${an} | *${cfg.element}* sign.`, { top: 168, size: 92, accentSize: 130, at: T.h0, gap: 0.06, accentColor: ELC, fit: true })
    const HS = popText(root, `*Skip:* | ${cfg.skipHead}`, { top: 168, size: 80, accentSize: 120, at: T.hS, gap: 0.07, accentColor: '#ff6b7f', fit: true })
    const HT = popText(root, `*Try:* | ${cfg.tryHead}`, { top: 168, size: 80, accentSize: 120, at: T.hT, gap: 0.07, accentColor: '#9fe6b0', fit: true })
    const HP = popText(root, `Date *${cfg.date}*, ${cfg.element.toLowerCase()} edition: | the *tip.*`, { top: 168, size: 70, accentSize: 104, at: T.hTip, gap: 0.07, accentColor: ELC, fit: true })
    const HEADS = [[H0, T.h0Out], [HS, T.hSOut], [HT, T.hTOut], [HP, T.out]]
    // the part sticker under the hook
    const part = el('div', { position: 'absolute', left: '0', top: '470px', width: '1080px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }, root)
    el('div', { padding: '12px 26px', background: BONE, border: `5px solid ${INK}`, borderRadius: '10px', font: `700 34px ${MONO}`, letterSpacing: '0.08em', color: INK, transform: 'rotate(-2deg)', boxShadow: '8px 8px 0 rgba(6,4,18,0.7)' }, part, PARTS[cfg.date])
    const box1 = dialogueBox(root, { lines: LINES, y: 1430, open: T.l1 - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, 0, 'THE FIRST', 'THREE DATES')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function pisces(t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
      const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, hops: P.hops, tips: false }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts)
      if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    }

    // positions: YOU left, the date right; they shrink to the sides for the tip
    function pos(t) {
      const m = ease.inOutCubic(prog(t, T.hTip - 0.1, T.note + 0.2))
      return {
        you: { x: lerp(290, 150, m), y: lerp(1050, 1280, m), s: lerp(220, 150, m) },
        date: { x: lerp(780, 930, m), y: lerp(1035, 1285, m), s: lerp(260, 160, m) },
      }
    }
    function youMood(t) {
      if (t < T.hS) return 'happy'
      if (t < T.react) return 'happy'
      if (t < T.xStamp) return 'neutral'
      if (t < T.cut) return 'wide'
      if (t < T.reply) return 'happy'
      if (t < T.hTip) return 'heart'
      return 'happy'
    }
    function dateMood(t) {
      if (t < T.hS) return cfg.hookMood || 'happy'
      if (t < T.react) return 'neutral'
      if (t < T.cut) return cfg.skipMood || 'sleepy'
      if (t < T.youSay2 + 0.6) return 'neutral'
      if (t < T.check) return 'sparkle'
      if (t < T.hTip) return 'heart'
      return 'happy'
    }

    function xStamp(t) {
      if (t < T.xStamp - 0.2 || t > T.hSOut[1]) return
      const p = ease.inCubic(prog(t, T.xStamp - 0.2, T.xStamp)), o = outK(t, T.hSOut)
      const sc = lerp(2.2, 1, p) * (1 + 0.04 * Math.exp(-(t - T.xStamp) * 8) * Math.sin((t - T.xStamp) * 40) * (t > T.xStamp ? 1 : 0))
      x.save(); x.globalAlpha = clamp(p * 1.5) * o; x.translate(540, 900); x.rotate(-0.12); x.scale(sc, sc)
      x.strokeStyle = RED; x.lineWidth = 14; x.strokeRect(-230, -110, 460, 220); x.lineWidth = 5; x.strokeRect(-210, -92, 420, 184)
      x.font = `800 130px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SKIP ✕', 0, 6)
      x.restore()
    }
    function check(t, cx, cy) {
      const k = pop01(t, T.check, 0.32, 2.6) * outK(t, T.hTOut)
      if (k <= 0.01) return
      drawBits(x, ['.........GG', '........GGG', '.......GGG.', 'GG....GGG..', 'GGG..GGG...', '.GGGGGG....', '..GGGG.....', '...GG......'], { G: '#5fd38a' }, cx, cy, 9 * k)
    }

    function note(t) {
      const k = easeOutBack(prog(t, T.note, T.note + 0.4), 1.6) * popOut(t, T.out)
      if (k <= 0.01 || t < T.note) return
      const W = 820, H = 470
      x.save(); x.translate(540, 840); x.rotate(-0.025); x.scale(k, k)
      R(x, 'rgba(6,4,18,0.5)', -W / 2 + 18, -H / 2 + 22, W, H)
      box(x, -W / 2, -H / 2, W, H, '#fff6dc', { b: 7 })
      for (let i = 1; i < 6; i++) R(x, 'rgba(127,208,255,0.35)', -W / 2 + 20, -H / 2 + 60 + i * 72, W - 40, 3)
      R(x, 'rgba(232,52,78,0.45)', -W / 2 + 70, -H / 2, 4, H)
      // pin
      R(x, INK, -16, -H / 2 - 30, 32, 32); R(x, RED, -11, -H / 2 - 25, 22, 22); R(x, '#ff9aa8', -8, -H / 2 - 22, 8, 8)
      x.font = `700 30px ${MONO}`; x.fillStyle = ELC; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillStyle = INK; x.fillText(`TIP · DATE ${cfg.date} · ${cfg.element.toUpperCase()}`, -W / 2 + 96, -H / 2 + 50)
      x.font = `800 46px ${INTER}`; x.fillStyle = INK
      cfg.tip.forEach((l, i) => {
        const lk = clamp(prog(t, T.note + 0.35 + i * 0.3, T.note + 0.55 + i * 0.3))
        x.save(); x.globalAlpha = lk; x.fillText(l, -W / 2 + 96, -H / 2 + 132 + i * 72 + (1 - lk) * 10); x.restore()
      })
      x.restore()
      tieChip(t)
    }
    function tieChip(t) {
      const k = easeOutBack(prog(t, T.chip, T.chip + 0.35), 2.2) * popOut(t, T.out)
      if (k <= 0.01 || t < T.chip) return
      x.save(); x.translate(810, 1050); x.rotate(0.07); x.scale(k, k)
      if (cfg.tie === 'talk' && talkImg) {
        const w = 160, h = w * talkImg.height / talkImg.width
        R(x, 'rgba(6,4,18,0.5)', -w / 2 + 12, -h / 2 + 14, w, h); x.drawImage(talkImg, -w / 2, -h / 2, w, h)
      } else {
        const txt = cfg.tie === 'pull' ? 'PULL READING' : cfg.tie === 'deal' ? 'MY DEALBREAKERS' : 'TALK CARD'
        const col = cfg.tie === 'pull' ? READING.pull : cfg.tie === 'deal' ? '#ffb3c0' : GOLD
        x.font = `700 32px ${MONO}`; const w = x.measureText(txt).width + 60
        box(x, -w / 2, -36, w, 72, col, { b: 6 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      }
      x.restore()
    }

    function scene(t) {
      const P = pos(t)
      // the setting (fades back a little for the tip)
      x.save(); x.globalAlpha = 1 - 0.55 * clamp(prog(t, T.hTip - 0.1, T.note + 0.2)); SETS[cfg.set](x, t); x.restore()
      // Pisces in the background, crying (unless the date is Pisces)
      if (!cfg.dateIsPisces) {
        const tip = clamp(prog(t, T.hTip - 0.1, T.note + 0.2))
        const pp = tip < 0.5 ? (cfg.pis || { x: 960, y: 1300, s: 110 }) : { x: 880, y: 560, s: 110 }
        const pk = tip < 0.5 ? 1 - ease.inQuad(clamp(tip * 2)) : ease.outBack(clamp(tip * 2 - 1))
        pisces(t, { ...pp, pop: pk * popOut(t, T.out), hops: [T.xStamp + 0.1, T.check + 0.05, T.last + 0.5] }, t > T.check ? 3 : t > T.xStamp ? 2 : 1, t > T.check ? 'sparkle' : 'wide', [-1, -0.5])
      }
      const ok = popOut(t, T.out)
      shadow(x, P.you.x, P.you.y + P.you.s * 0.47, P.you.s * 0.85 * ok)
      shadow(x, P.date.x, P.date.y + P.date.s * 0.47, P.date.s * 0.85 * ok)
      drawStarChar(x, P.you.x, P.you.y, P.you.s, t, { color: cfg.youColor || YOU_COL, mood: youMood(t), look: [1, -0.2], hops: YOU_HOPS, pop: ok, seed: 5, glow: 0.9 })
      const dOpts = { color: DATE.color, glyph: P.date.s > 150 ? DATE.glyph : null, mood: dateMood(t), look: t < T.hS ? [0, 0] : [-1, -0.2], hops: DATE_HOPS, pop: ok, seed: 8, glow: 1.1 }
      drawStarChar(x, P.date.x, P.date.y, P.date.s, t, dOpts)
      if (cfg.dateIsPisces) { const F = starFrame(P.date.x, P.date.y, P.date.s, t, dOpts); inSprite(x, F, () => tearsCells(x, t, t > T.check ? 3 : t > T.hS ? 1 : 2)) }
      if (cfg.hookProp && t < T.hS + 0.3) cfg.hookProp(x, t, { P, k: 1 - prog(t, T.hS - 0.1, T.hS + 0.3), DATE })
      if (t < T.hTip) {
        label(x, 'YOU', P.you.x, P.you.y + P.you.s * 0.62, { size: 26, col: cfg.youColor || YOU_COL })
        label(x, `${DATE.glyph}︎ ${cfg.name.toUpperCase()}`, P.date.x, P.date.y + P.date.s * 0.6, { size: 26, col: DATE.color })
      }
      // SKIP beat
      say(x, t, 380, 660, T.youSay, T.xStamp + 0.6, cfg.skipSay, { tail: -0.4 })
      say(x, t, 740, 800, T.react, T.hSOut[0], cfg.skipReact, { col: '#d8d2e8', size: 38, tail: 0.2, maxW: 420 })
      xStamp(t)
      // TRY beat
      say(x, t, 380, 660, T.youSay2, T.reply + 1.4, cfg.trySay, { col: '#e9fff0', tail: -0.4 })
      say(x, t, 700, 780, T.reply, T.hTOut[0], cfg.tryReply, { col: '#fff1c8', tail: 0.3, maxW: 460 })
      check(t, 540, 1110)
      if (t > T.check && t < T.hTOut[1]) hearts(x, t, T.check, P.date.x + 150, P.date.y - 40, { n: 6, spread: 80 })
      sparkles(x, t, P.date.x, P.date.y, T.reply, 10, 170, 2, [GOLD, BONE, ELC])
      // THE STARS
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * outK(t, [T.hTip - 0.2, T.hTip])
      if (sk > 0.01) drawStarChar(x, 540, 1290, 130, t, { color: STAR.sky, mood: 'happy', look: [0, -0.6], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      const sk2 = pop01(t, T.note + 0.2, 0.38, 2.1) * ok
      if (sk2 > 0.01) drawStarChar(x, 540, 1260, 150, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [0, -0.8], hops: STARS_HOPS, pop: sk2, seed: 2, glow: 1.05 })
      note(t)
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const dX = t - T.xStamp, shake = dX > 0 && dX < 0.4 ? 14 * Math.exp(-dX * 10) * Math.sin(dX * 55) : 0
        x.save(); x.translate(0, shake); x.globalAlpha = 1 - ease.inQuad(prog(t, ...T.out))
        if (t < T.out[1]) scene(t)
        x.restore()
        if (t < T.out[1]) { x.save(); x.globalAlpha = outK(t, T.out); heartPips(x, t, cfg.date); x.restore() }
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        part.style.opacity = String(outK(t, T.h0Out)); part.style.display = t < T.h0Out[1] ? 'flex' : 'none'
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.hS, T.hTip].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [8.0, { t: T.cut, kind: 'flip' }, 19.2]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['pop', 0.02, 987.77, 0.04, 0], ['glitter', 0.05, 0.45], ['pop', 0.9, 1174.66, 0.03, 0.3], ['pop', 1.3, 880, 0.03, -0.3],
    ['whoosh', r3(T.hS - 0.08), 0.28, 0.035], ...wordPops(T.hS, 4, 0.07, 0),
    ['pop', T.youSay, 880, 0.04, -0.3], ['pop', T.react, 659.25, 0.04, 0.3], ['pluck', r3(T.react + 0.1), 440, 0.03, 0.5, 0.3],
    ['whoosh', r3(T.xStamp - 0.2), 0.25, 0.035], ['boom', T.xStamp, 0.28], ['tom', T.xStamp, 90, { gain: 0.28, decay: 0.3 }], ['tick', T.xStamp, 0.07],
    ...wordPops(T.hT, 4, 0.07, 2),
    ['pop', T.youSay2, 987.77, 0.04, -0.3], ['pop', T.reply, 1174.66, 0.045, 0.3], ['glitter', T.reply, r3(T.reply + 0.4)],
    ['pop', T.check, 1318.51, 0.045, 0], ['bell', r3(T.check + 0.05), 1760, 0.03, 1.0, 0], ['pluck', r3(T.check + 0.1), 1567.98, 0.03, 0.5, 0],
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, 0],
    ['whoosh', r3(T.hTip - 0.08), 0.3, 0.035], ...wordPops(T.hTip, 5, 0.07, 1),
    ['whoosh', T.note, 0.35, 0.04], ['tick', r3(T.note + 0.4), 0.06], ['pop', r3(T.note + 0.42), 1318.51, 0.03, 0],
    ...cfg.tip.map((_, i) => ['tick', r3(T.note + 0.4 + i * 0.3), 0.03]),
    ['pop', T.chip, 1174.66, 0.045, 0.4], ['pop', r3(T.chip + 0.07), 1567.98, 0.03, 0.4], ['glitter', T.chip, r3(T.chip + 0.35)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
void [GOLD, PINK, BUG_PINK, ease, el]
