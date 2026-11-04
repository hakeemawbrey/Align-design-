// TEXTS YOU'D SEND AT 1 AM: the shared look of Trends Vol. 2 episodes nt2e56–nt2e60 (promo/films/next30/b13.md §12).
// The other four films import this file from here.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.00   hook: caption "Texts you'd send at *1 AM:* | <Sign> edition." from frame 0; a midnight-blue room, a big
//               generic chat screen ("1:0X AM"), the hero under a blanket lit by the phone, mid-typing.
//   0.00–4.70   draft 1 is already typing at frame 0… and is deleted (✕ "nope").
//   4.90–7.55   draft 2 types… deleted too.    7.60 the one card cut.
//   7.90–10.0   the real one: short and kind. SEND.   10.5 "typing…"   11.7 the reply (they're up too).
//   11.8–15.6   happy hero, Pisces (in the corner, on a beanbag) cries at the reply, THE STARS say the last line.
//
//   makeLate(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hero, cfg.name ('Taurus'), cfg.time ('1:04 AM'), cfg.prev ([text, '11:52 PM']), cfg.drafts [d1, d2],
//     cfg.sent, cfg.reply, cfg.last, cfg.prop(x, t, F, S) optional extra on the hero, cfg.accent, cfg.bg(x, t) optional
import { el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import * as B from '../../nt2e41/scenes/b13base.js'
const { R, box, shadow, sparkles, hearts, pisces, buildBug, drawBar, pop01, outK, popOut, clamp, lerp, prog, ease, drawStarChar, signStar, STAR, r3, GOLD, BONE, PINK, INK, RED, INTER, MONO } = B

export const DURATION = 18
export const STORY_END = DURATION - ENDCARD_SHORT_LEN
export const T = {
  bug: 0.3, h0Out: [15.1, 15.4],
  d1: [-0.9, 3.8], d1Del: [4.3, 4.7],
  d2: [4.9, 6.9], d2Del: [7.2, 7.55],
  cut: 7.6,
  s: [7.9, 9.6], send: 10.0, typing: [10.5, 11.6], reply: 11.7,
  starsIn: 12.0, last: 12.5, boxClose: 15.1, out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const CPS = 30
// the phone
const PX = 250, PY = 370, PW = 580, PH = 800
export const HERO_AT = { x: 240, y: 1320, s: 270 }

function wrap(x, text, maxW) {
  const words = text.split(' '), lines = []; let cur = ''
  for (const w of words) { const test = cur ? cur + ' ' + w : w; if (x.measureText(test).width > maxW && cur) { lines.push(cur); cur = w } else cur = test }
  if (cur) lines.push(cur)
  return lines
}
/** a chat bubble: side 'in' (left, theirs) or 'out' (right, ours); returns its height */
function chatBubble(x, text, side, y, k = 1, stamp = '') {
  x.font = `600 32px ${INTER}`
  const lines = wrap(x, text, 380), lh = 40
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, h = lines.length * lh + 30
  const bx = side === 'in' ? PX + 30 : PX + PW - 30 - w
  x.save(); x.globalAlpha *= clamp(k * 1.5)
  const sy = y + (1 - clamp(k)) * 40
  R(x, INK, bx - 4, sy - 4, w + 8, h + 8)
  R(x, side === 'in' ? '#e9e4f7' : '#ff8fb1', bx, sy, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'
  lines.forEach((l, i) => x.fillText(l, bx + 22, sy + 16 + i * lh))
  if (stamp) { x.font = `700 18px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.textAlign = side === 'in' ? 'left' : 'right'; x.fillText(stamp, side === 'in' ? bx : bx + w, sy + h + 8) }
  x.restore()
  return h
}

export function makeLate(cfg) {
  const HERO = signStar(cfg.hero)
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const typed = (txt, [a, b], t) => txt.slice(0, Math.floor(clamp(prog(t, a, b)) * txt.length))
  const typeHops = ([a, b]) => Array.from({ length: Math.floor((b - a) / 0.32) }, (_, i) => r3(a + i * 0.32))

  async function build(stage) {
    try {
      await Promise.all(["800 78px Inter", "800 28px Inter", "600 32px Inter", "700 30px Inter", "italic 500 106px 'EB Garamond'", "700 18px 'Space Mono'", "700 26px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, `Texts you’d send at *1 AM:* | ${cfg.name} edition.`, { top: 160, size: 70, accentSize: 100, at: -1, gap: 0, accentColor: cfg.accent || '#9fb4ff', fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1530, height: 280, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug, 'TEXTS AT 1 AM')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function phone(t) {
      box(x, PX - 14, PY - 14, PW + 28, PH + 28, '#2a2148', { b: 8 })
      R(x, '#120e26', PX, PY, PW, PH)
      // header: contact + time
      R(x, '#1d1840', PX, PY, PW, 96)
      x.fillStyle = PINK; x.fillRect(PX + 30, PY + 26, 44, 44); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♡', PX + 52, PY + 49)
      x.font = `700 30px ${INTER}`; x.textAlign = 'left'; x.fillStyle = BONE; x.fillText(cfg.contact || 'them', PX + 92, PY + 48)
      x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.fillStyle = '#9fb4ff'; x.fillText(cfg.time, PX + PW - 30, PY + 48)
      // conversation
      let y = PY + 130
      y += chatBubble(x, cfg.prev[0], 'in', y, 1, cfg.prev[1]) + 52
      if (t >= T.send) { const k = ease.outBack ? ease.outCubic(prog(t, T.send, T.send + 0.3)) : prog(t, T.send, T.send + 0.3); y += chatBubble(x, cfg.sent, 'out', y, k, t > T.send + 0.6 ? 'sent ✓' : '') + 52 }
      if (t >= T.typing[0] && t < T.reply) {
        const bx = PX + 30
        R(x, INK, bx - 4, y - 4, 128, 68); R(x, '#e9e4f7', bx, y, 120, 60)
        for (let i = 0; i < 3; i++) R(x, '#6a6488', bx + 24 + i * 28, y + 24 - (Math.floor(t * 6 + i) % 3 === 0 ? 8 : 0), 16, 16)
      }
      if (t >= T.reply) chatBubble(x, cfg.reply, 'in', y, ease.outCubic(prog(t, T.reply, T.reply + 0.3)), cfg.time)
      // input box
      const iy = PY + PH - 130
      R(x, '#1d1840', PX, iy - 20, PW, 150)
      box(x, PX + 24, iy, PW - 140, 96, '#2b2556', { b: 4 })
      let txt = '', del = 0, which = -1
      if (t >= T.d1[0] && t < T.d1Del[1]) { txt = typed(cfg.drafts[0], T.d1, t); which = 0; del = prog(t, ...T.d1Del) }
      else if (t >= T.d2[0] && t < T.d2Del[1]) { txt = typed(cfg.drafts[1], T.d2, t); which = 1; del = prog(t, ...T.d2Del) }
      else if (t >= T.s[0] && t < T.send) { txt = typed(cfg.sent, T.s, t); which = 2 }
            if (del > 0) txt = txt.slice(0, Math.floor(txt.length * (1 - del)))
      x.font = `600 28px ${INTER}`
      const lines = wrap(x, txt, PW - 190)
      const show = lines.slice(-2)
      x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'
      show.forEach((l, i) => x.fillText(l, PX + 44, iy + 14 + i * 36))
      if (Math.floor(t * 2.5) % 2 === 0 && t < T.send) { const lw = show.length ? x.measureText(show[show.length - 1]).width : 0; R(x, '#9fb4ff', PX + 46 + lw, iy + 14 + Math.max(0, show.length - 1) * 36, 4, 32) }
      if (!show.length && t < T.send) { x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillText('message…', PX + 52, iy + 30) }
      // send button
      const ready = which === 2 && t > T.s[1]
      const pressK = t >= T.send && t < T.send + 0.15 ? 0.85 : 1
      x.save(); x.translate(PX + PW - 62, iy + 48); x.scale(pressK, pressK)
      box(x, -42, -42, 84, 84, ready ? '#5cffa0' : '#3a3264', { b: 5 }); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('↑', 0, 2)
      x.restore()
      // the ✕ nope over deleted drafts
      for (const [d, at] of [[T.d1Del, 0], [T.d2Del, 1]]) {
        const k = pop01(t, d[0] - 0.1, 0.25, 2.6) * outK(t, [d[1] + 0.1, d[1] + 0.3])
        if (k > 0.01) {
          x.save(); x.translate(PX + PW / 2, iy - 70); x.rotate(at ? 0.08 : -0.08); x.scale(k, k)
          box(x, -170, -40, 340, 80, RED, { b: 6 })
          x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(at ? '✕  nope. again.' : '✕  nope.', 0, 3)
          x.restore()
        }
      }
      // draft tag
      if (which >= 0 && t < T.send) {
        x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillStyle = which === 2 ? '#5cffa0' : 'rgba(239,230,214,0.55)'; x.textBaseline = 'middle'
        x.fillText(which === 2 ? 'the real one' : `draft ${which + 1}`, PX + 30, iy - 4)
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: 0.35 })
        R(x, 'rgba(10,12,40,0.55)', 0, 0, 1080, 1920)
        if (cfg.bg) cfg.bg(x, t)
        // phone glow on the room
        x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 800, 100, 540, 900, 900); g.addColorStop(0, 'rgba(120,140,255,0.16)'); g.addColorStop(1, 'rgba(120,140,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
        // the bed
        R(x, '#241d4a', 0, 1300, 1080, 620); box(x, -20, 1380, 760, 140, '#3a4f9a', { b: 8, hi: '#4f66b8' })
        // hero under the blanket
        const replied = t >= T.reply + 0.1
        const typing = (t < T.d1Del[1]) || (t >= T.d2[0] && t < T.d2Del[1]) || (t >= T.s[0] && t < T.send)
        const mood = replied ? 'heart' : t >= T.send ? 'wide' : (t >= T.d1Del[0] && t < T.d2[0]) || (t >= T.d2Del[0] && t < T.s[0]) ? 'squint' : 'sparkle'
        const H = HERO_AT
        const hops = [...typeHops([0, T.d1[1]]), ...typeHops(T.d2), ...typeHops(T.s), T.send, T.reply + 0.1, T.reply + 0.5, T.last + 1.6]
        hero(x, t, { ...H, mood, look: replied ? [0, 0] : [1, -1], hops: typing || t >= T.send ? hops : [] })
        if (cfg.prop) cfg.prop(x, t, B.starFrame(H.x, H.y, H.s, t, { hops }), { replied })
        // blanket over the hero
        x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(-20, 1520); x.quadraticCurveTo(140, 1330, 420, 1380); x.lineTo(760, 1380); x.lineTo(760, 1520); x.closePath(); x.fill()
        x.fillStyle = '#6c7fd8'; x.beginPath(); x.moveTo(-20, 1512); x.quadraticCurveTo(140, 1342, 420, 1390); x.lineTo(752, 1388); x.lineTo(752, 1512); x.closePath(); x.fill()
        for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.12)', 40 + i * 120, 1430, 50, 50)
        x.restore()
        // Pisces on a beanbag in the corner
        box(x, 790, 1400, 240, 110, '#c94a6e', { b: 7, hi: '#e0628a' })
        pisces(x, t, { x: 900, y: 1330, s: 140, hops: [T.reply + 0.05, T.reply + 0.4] }, replied ? 3 : 1, replied ? 'sparkle' : 'wide', [-1, -1])
        phone(t)
        // THE STARS peek in from the right of the phone
        const sk = pop01(t, T.starsIn, 0.38, 2.1) * popOut(t, T.out)
        if (sk > 0.01) drawStarChar(x, 920, 1150, 130, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [-1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
        drawBar(x, t, [[0, T.d1Del[1]], [T.d2[0], T.d2Del[1]], [T.cut, T.reply], [T.reply, T.boxClose]], B.BUG_PINK, outK(t, T.out))
        tx.clearRect(0, 0, 1080, 1920)
        hearts(tx, t, T.reply + 0.15, 540, 900, { n: 7, spread: 260 })
        sparkles(tx, t, 540, 860, T.reply, 12, 300, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]
  const keys = ([a, b], n) => Array.from({ length: Math.min(24, Math.floor((b - a) / 0.09)) }, (_, i) => ['tick', r3(a + i * ((b - a) / Math.min(24, Math.floor((b - a) / 0.09)))), 0.018 + 0.008 * ((i * 7) % 3)])
  const CUES = [
    ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...keys([0.05, T.d1[1]], 1), ...keys(T.d2, 1), ...keys(T.s, 1),
    ['whoosh', T.d1Del[0], 0.3, 0.03], ['pop', T.d1Del[0], 440, 0.04, 0], ['chip', T.d1Del[0], 600, 0.25, { wave: 'square', duty: 0.25, slide: -24, gain: 0.015, decay: 0.2, sustain: 0.2, bus: 'fx' }],
    ['whoosh', T.d2Del[0], 0.3, 0.03], ['pop', T.d2Del[0], 392, 0.04, 0], ['chip', T.d2Del[0], 560, 0.25, { wave: 'square', duty: 0.25, slide: -24, gain: 0.015, decay: 0.2, sustain: 0.2, bus: 'fx' }],
    ['whoosh', T.send - 0.05, 0.35, 0.04], ['pop', T.send, 1318.51, 0.045, 0.2], ['pop', r3(T.send + 0.06), 1760, 0.03, 0.2],
    ['tick', T.typing[0], 0.03], ['tick', r3(T.typing[0] + 0.35), 0.03], ['tick', r3(T.typing[0] + 0.7), 0.03],
    ['bell', T.reply, 1567.98, 0.045, 1.2, -0.2], ['pop', r3(T.reply + 0.05), 2093.0, 0.035, -0.2], ['glitter', T.reply, r3(T.reply + 0.6)],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, 0.4],
    ...(cfg.cues || []),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
export { B }
void shadow; void lerp
