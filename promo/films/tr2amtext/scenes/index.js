// tr2amtext (20 s vertical, Star Talk Trends · ME AT 2 PM vs ME AT 2 AM · 5) "Morning me knows." · synthwave Fm.
// The format's shared look lives in ./tam.js (identical in all five tr2am films). Story 0–15.6, then the end card.
//   2 PM   "The text | I *drafted.*"  A sunny room. ♋ CANCER, phone in hand: "Simple. Breezy. | Done." The draft on the
//          phone: "hey". A sticker slaps on: WORD COUNT: 1.
//   2 AM   "2 AM: | the *director's cut.*"  The same star in bed. The draft card grows paragraph by paragraph (the word
//          count climbs, the scroll bar shrinks). Three stickers as the clock ticks: PARAGRAPH 1: THE WEATHER ·
//          PARAGRAPH 2: OUR FUTURE · the twist: SIGNED: 'NO PRESSURE :)'. Up top the 2 PM self gapes, sweats, eye-rolls.
//   TURN   a hush… the thumb hovers over SEND… the button flips to SAVED. SLEEP ON IT. Dawn; the clock reads 9:00 AM.
//   card cut.  The stitch opens: a morning room. The phone close-up: the paragraphs zip away, a short kind text types
//          ("had fun yesterday :) / coffee this week?"), SENT… "yes!!" ♓ Pisces on the shelf, happy-sobbing.
//          "Morning me: | *short* and kind."  Box (CANCER): "short, kind, and *sent.*"
//   LAST   "*Morning* me knows."  A neon sign flickers on: SHORT & SWEET.
import { makeTAM, T, BEAT, r3, INK, BONE, GOLD, PINK, HOT, NEON, CYAN, INTER, MONO, clamp, lerp, prog, ease } from './tam.js'

const G = [BEAT(9), BEAT(11), BEAT(13)]
const ME_AM = { x: 250, y: 1372, s: 180 }, ME_PM = { x: 280, y: 862, s: 184 }
const T2 = { hover: BEAT(15) - 0.25, saved: BEAT(15) + 0.25, dawn: BEAT(15) + 0.55, zip: 10.6, type: [10.9, 11.55], sent: 11.7, reply: BEAT(21) }
const DRAFT = { x: 320, y: 1178, w: 400, h: 176 }
const MSG = ['had fun yesterday :)', 'coffee this week?']

const words = t => t < T.amSay ? 1 : t < G[0] ? Math.round(lerp(1, 48, prog(t, T.amSay, G[0]))) : t < G[1] ? Math.round(lerp(48, 312, prog(t, G[0], G[1]))) : Math.round(lerp(312, 1204, prog(t, G[1], G[2] + 0.4)))

const TAM = makeTAM({
  id: 'tr2amtext', sign: 'cancer',
  heads: {
    topic: 'The text | I *drafted.*',
    spiral: "2 AM: | the *director's cut.*",
    turn: 'Morning me: | *short* and kind.',
    last: '*Morning* me knows.',
  },
  accents: { topic: '#bfe6ff', spiral: NEON, turn: '#ffd25a', last: '#ffb86b' },
  stickers: [{ text: 'PARAGRAPH 1: THE WEATHER', x: 772 }, { text: 'PARAGRAPH 2: OUR FUTURE', x: 800 }, { text: "SIGNED: 'NO PRESSURE :)'", x: 780 }],
  clock: { am: t => t < G[0] ? '2:00 AM' : t < G[1] ? '2:21 AM' : t < G[2] ? '2:44 AM' : t < T2.dawn + 0.7 ? '3:06 AM' : '9:00 AM' },
  amLabel: t => t < T2.dawn + 0.7 ? '2 AM' : '9 AM',
  dawnAt: T2.dawn,
  lampOn: t => t < T2.dawn ? 0.45 : 0,
  neon: 'SHORT & SWEET', neonColor: '#ffb86b', neonAt: { y: 1050 },
  line: { who: 'me', text: 'short, kind, and *sent.*' },

  pmScene(x, t, W) {
    let mood = 'happy', look, sweat = false
    if (t > T.AMin[1] + 0.2) { mood = 'neutral'; look = [0.3, 1] }
    if (t > G[0]) { mood = 'wide'; look = [0.2, 1] }
    if (t > G[1]) sweat = true
    if (t > G[2] + 0.1) { mood = 'eyeroll'; look = undefined }
    if (t > T2.saved) { mood = 'happy'; sweat = false }
    W.me(ME_PM.x, ME_PM.y, ME_PM.s, { mood, look, sweat, seed: 3, pop: W.pop01(t, T.pmIn, 0.35, 2), hops: [T.pmIn + 0.3, T.pmSay - 0.1, T.pmGag + 0.05, G[0] + 0.02, T2.saved + 0.1] })
    W.bubble(t, 330, 640, T.pmSay, 'Simple. Breezy.|Done.', { t1: T.h0Out[1] + 2.2, size: 38, tx: ME_PM.x + 20, ty: ME_PM.y - 90 })
    // the 2 PM draft: one word
    const pk = W.pop01(t, T.pmIn + 0.4, 0.3, 2.2)
    if (pk > 0.01) W.phone(ME_PM.x + 260, ME_PM.y - 30, 230 * pk, 150 * pk, { glow: 0, draw: (l, tp, w, h) => {
      x.fillStyle = '#5a6ad0'; x.fillRect(l, tp, w, 28); x.font = `700 16px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('DRAFT', l + 10, tp + 15)
      x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText('hey', l + 16, tp + 66)
      if ((t * 2) % 1 < 0.55) { x.fillStyle = INK; x.fillRect(l + 80, tp + 50, 4, 32) }
    } })
    const k = W.pop01(t, T.pmGag, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(800, 650); x.rotate(0.05); x.scale(k, k)
      x.font = `800 30px ${INTER}`; const s = 'WORD COUNT: 1', w = x.measureText(s).width + 34
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -24, w, 48)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
    }
  },

  amScene(x, t, W) {
    // ♓ Pisces on the shelf (revealed with the room), happy-sobbing at the "yes!!"
    W.pisces(880, 868, 130, t > T2.reply ? 3 : 2, 'happy', { look: [-1, 0.6], hops: [T.open[1] + 0.05, T2.reply + 0.1, T.neon + 0.3] })
    // the 2 AM self in bed
    const asleep = t > T2.saved + 0.2 && t < T.open[1]
    let mood = 'sparkle', look = [1, -0.4]
    if (t > G[0]) { mood = 'heart'; look = undefined }
    if (t > G[1]) { mood = 'sparkle'; look = [1, -0.6] }
    if (t > G[2]) { mood = 'wink' }
    if (t > T.hush[0]) { mood = 'neutral'; look = [1, -0.5] }
    if (t > T2.hover) { mood = 'wide'; look = [1, -0.6] }
    if (asleep) mood = 'sleepy'
    if (t > T.open[1]) { mood = 'happy'; look = [0.8, -1] }
    if (t > T2.reply + 0.1) { mood = 'heart'; look = undefined }
    W.me(ME_AM.x, ME_AM.y, ME_AM.s, { mood, look, seed: 3, zzz: asleep, pop: W.pop01(t, T.amIn, 0.35, 2),
      hops: [T.amIn + 0.3, G[0] + 0.05, G[1] + 0.05, G[2] + 0.05, T2.hover + 0.05, T.open[1] + 0.05, T2.sent, T2.reply + 0.1, T2.reply + 0.4, T.neon + 0.3] })
    W.phone(ME_AM.x + 125, ME_AM.y + 36, 60, 100, { rot: -0.25, glow: t > T.amIn && t < T2.saved + 0.2 ? 0.9 : t > T.open[1] ? 0.6 : 0 })
    W.blanket(t, '#3a6ac0', '#6a9af0', 1438)

    // the 2 AM draft card: paragraphs pile up, the scroll bar shrinks; at the turn SEND? → SAVED. SLEEP ON IT.
    const dk = W.pop01(t, T.amSay - 0.1, 0.3, 2.2) * W.outK(t, [T2.dawn, T2.dawn + 0.3])
    if (dk > 0.01) {
      const { w, h } = DRAFT
      x.save(); x.translate(DRAFT.x, DRAFT.y); x.scale(dk, dk)
      x.fillStyle = 'rgba(4,2,12,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
      x.fillStyle = '#eef2ff'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = '#5a6ad0'; x.fillRect(-w / 2, -h / 2, w, 36)
      x.font = `700 20px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('DRAFT', -w / 2 + 14, -h / 2 + 19)
      x.textAlign = 'right'; x.fillText(`WORDS: ${words(t).toLocaleString('en-US')}`, w / 2 - 14, -h / 2 + 19)
      // body: the first line, then paragraphs as grey bars, scrolling up as they pile on
      const n = t < G[0] ? 1 : t < G[1] ? 4 : t < G[2] ? 8 : 12
      const scroll = Math.max(0, n - 3) * 30 * clamp((t - G[0]) * 2)
      x.save(); x.beginPath(); x.rect(-w / 2, -h / 2 + 36, w - 24, h - 36); x.clip()
      x.font = `700 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'
      x.fillText("hey so I've been thinking…", -w / 2 + 16, -h / 2 + 60 - scroll * 0.3)
      for (let i = 0; i < n * 3; i++) {
        const y = -h / 2 + 90 + i * 22 - scroll
        if (y < -h / 2 + 30 || y > h / 2) continue
        x.fillStyle = i % 3 === 2 ? 'rgba(80,90,140,0)' : 'rgba(80,90,140,0.35)'; x.fillRect(-w / 2 + 16, y, (w - 70) * (i % 3 === 1 ? 0.7 : 0.95), 10)
      }
      x.restore()
      // the scroll bar (shrinks as it grows)
      const sb = (h - 52) * clamp(3 / (n + 2)), sy = lerp(-h / 2 + 44, h / 2 - 8 - sb, clamp(scroll / 300))
      x.fillStyle = 'rgba(80,90,140,0.25)'; x.fillRect(w / 2 - 16, -h / 2 + 44, 8, h - 52); x.fillStyle = '#5a6ad0'; x.fillRect(w / 2 - 16, sy, 8, sb)
      // the button
      const bk = W.pop01(t, T2.hover, 0.25, 2.4)
      if (bk > 0.01) {
        const saved = t > T2.saved
        x.save(); x.translate(w / 2 - 110, h / 2 - 34); x.scale(bk, bk)
        const label = saved ? 'SAVED. SLEEP ON IT.' : 'SEND?'
        x.font = `800 24px ${INTER}`; const bw = x.measureText(label).width + 30
        x.fillStyle = INK; x.fillRect(-bw / 2 - 4, -24, bw + 8, 48); x.fillStyle = saved ? '#9fe6b0' : HOT; x.fillRect(-bw / 2, -20, bw, 40)
        x.fillStyle = INK; x.textAlign = 'center'; x.fillText(label, 0, 2); x.restore()
        // the hovering thumb
        if (!saved) { const hx = w / 2 - 110 + 30 * Math.sin(t * 9), hy = h / 2 + 10 + 6 * Math.sin(t * 13); W.bits(['.tt.', 'tttt', 'tttt', 'tttt', '.tt.'], { t: '#ffe2c0' }, hx, hy, 8) }
      }
      x.restore()
    }

    // the morning close-up: the paragraphs zip away, the short kind text types, sent, "yes!!"
    const up = ease.outBack(prog(t, T.open[0] + 0.1, T.open[1] + 0.15), 1.2)
    if (up > 0.01) W.phone(560, 744, 460 * up, 300 * up, { glow: 0.5, draw: (l, tp, w, h) => {
      if (up < 0.6) return
      x.save()
      x.fillStyle = '#5a6ad0'; x.fillRect(l, tp, w, 34); x.font = `700 20px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('to: them · 9:00 AM', l + 12, tp + 18)
      // the zip: grey bars vanish right-to-left
      const z = prog(t, T2.zip, T2.type[0] - 0.05)
      if (z < 1) for (let i = 0; i < 6; i++) { const f = clamp(1 - z * 1.6 + i * 0.1); if (f > 0) { x.fillStyle = 'rgba(80,90,140,0.35)'; x.fillRect(l + 16, tp + 52 + i * 26, (w - 40) * f * (i % 2 ? 0.75 : 0.95), 12) } }
      // the short, kind text types on
      const ty = prog(t, ...T2.type), all = MSG.join('\n'), nC = Math.round(all.length * ty)
      if (ty > 0) {
        const shown = all.slice(0, nC).split('\n'), sent = t > T2.sent
        const bw = w - 70, bx = l + w - 18 - bw, by = tp + 52
        x.fillStyle = INK; x.fillRect(bx - 4, by - 4, bw + 8, 96); x.fillStyle = sent ? PINK : '#ffffff'; x.fillRect(bx, by, bw, 88)
        x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'
        shown.forEach((s, i) => x.fillText(s, bx + 14, by + 26 + i * 36))
        if (sent) { x.font = `700 16px ${MONO}`; x.textAlign = 'right'; x.fillStyle = '#e8ecff'; x.fillText('sent ✓', l + w - 20, by + 108) }
      }
      // the reply
      const rk = W.pop01(t, T2.reply, 0.28, 2.6)
      if (rk > 0.01) {
        x.save(); x.translate(l + 20, tp + 200); x.scale(rk, rk)
        x.font = `800 34px ${INTER}`; const rw = x.measureText('yes!!').width + 40
        x.fillStyle = INK; x.fillRect(-4, -30, rw + 8, 60); x.fillStyle = '#9fe6b0'; x.fillRect(0, -26, rw, 52)
        x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('yes!!', 20, 2)
        W.bits(['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: HOT }, rw + 34, -6, 6)
        x.restore()
      }
      x.restore()
    } })
    if (t > T2.reply && t < T2.reply + 0.8) W.sparkles(t, 560, 744, T2.reply + 0.05, 10, 220, 1, [GOLD, PINK, '#fff'])
  },

  cues(T) {
    return [
      // the 2 PM draft: one tap
      ['tick', r3(T.pmIn + 0.5), 0.04], ['tick', r3(T.pmGag), 0.05],
      // 2 AM typing: a rattle under each gag
      ...[T.amSay, ...G].flatMap(g => Array.from({ length: 8 }, (_, i) => ['tick', r3(g + 0.1 + i * 0.07), 0.012 + 0.004 * (i % 2)])),
      // the thumb hovers: a held breath, then the save chime
      ['riser', r3(T2.hover), r3(T2.saved), 0.015], ['bell', r3(T2.saved + 0.02), 1174.66, 0.03, 1.0, -0.2], ['pop', r3(T2.saved + 0.1), 1567.98, 0.03, -0.2],
      // dawn
      ['riser', r3(T2.dawn), r3(T2.dawn + 1.1), 0.018],
      // morning: the zip, the typing, sent, "yes!!"
      ['whoosh', r3(T2.zip), 0.35, 0.035],
      ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T2.type[0] + i * 0.058), 0.018]),
      ['whoosh', r3(T2.sent), 0.2, 0.03], ['pop', r3(T2.sent + 0.02), 1318.51, 0.04, 0.2],
      ['pop', r3(T2.reply), 1567.98, 0.05, -0.1], ['pop', r3(T2.reply + 0.07), 2093, 0.035, -0.1], ['glitter', r3(T2.reply), r3(T2.reply + 0.4)],
      ['pluck', r3(T2.reply + 0.3), 659.25, 0.02, 0.5, 0.4],
    ]
  },
})
export const { DURATION, SCENES, CUES, CUTS, MUSIC } = TAM
export { T }
