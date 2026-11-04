// nmue13: THE MAKE-UP TALK, "Sorry, then show it" (30 s vertical, promo/films/next30/b32.md, music: jazzy · Bb).
// ♍ Virgo × ♐ Sagittarius. The format lives in ./makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“You said sorry | *last time* too.”" Virgo taps a wristwatch (TAP TAP), Sag bursts in through the
//             door late, scarf flying: "you're late. again." / "I SAID sorry!" / "you said it Tuesday too."
//   6.6–12.8  UNDER IT   "Every sorry. | *No change.*" A wall of sticky notes fills up, one SORRY per late night, every one
//             sincere; the FOLLOW-THROUGH meter under them stays empty. Sag, sheepish.
//   12.8–21.6 THE TALK   "A sorry is | a *promise.*" THE STARS: make it one you can keep. TRY SAYING "I'm sorry. I'll text you
//             when I leave. Every time." Sag: "small and keepable. deal."
//   21.6–25.5 MADE UP    the next night: the phone pings "leaving now!", Sag arrives EARLY (7:52 PM) with two cocoas.
//             "Sorry is a *verb*."
import { makeMakeUp, R, box, bubble, label, ink, glow, phone, inSprite, starFrame, scarfCells, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MINT, INTER, MONO } from './makeupkit.js'

const SAG = '#b06cf0', SCARF = '#ff7a6b'

function door(x, cx, by, open) {
  box(x, cx - 110, by - 380, 220, 380, '#2a1f45', { b: 8 })
  const w = 200 * (1 - 0.75 * open)
  box(x, cx - 100, by - 370, w, 360, '#8a5a3a', { b: 6, hi: 'rgba(255,255,255,0.12)' })
  R(x, GOLD, cx - 100 + w - 30, by - 200, 14, 14)
  if (open > 0) glow(x, cx + 40, by - 190, 220, open, '255,220,160')
}
function watch(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.15 + 0.06 * Math.sin(t * 14))
  R(x, INK, -16, -64, 32, 128); R(x, '#5a5470', -10, -60, 20, 120)
  box(x, -40, -40, 80, 80, BONE, { b: 7 })
  R(x, INK, -3, -28, 6, 30); R(x, INK, -3, -3, 26, 6)
  x.restore()
}
// a sticky note
function note(x, cx, cy, text, sub, k, rot, col = '#ffe27a') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -74, -66, 160, 150)
  box(x, -80, -74, 160, 150, col, { b: 5 })
  R(x, 'rgba(0,0,0,0.08)', -80, -74, 160, 26)
  ink(x, text, 0, 4, { size: 30, font: INTER, weight: 800, col: '#7a2b2b' })
  ink(x, sub, 0, 46, { size: 20, font: MONO, weight: 700, col: 'rgba(27,18,54,0.6)' })
  x.restore()
}
const NOTES = [['sorry!', 'MON'], ['so sorry', 'TUE'], ['SORRY', 'WED'], ['my bad!', 'THU'], ['sorry :(', 'FRI'], ['sorry!!', 'SAT'],
  ['sooo sorry', 'SUN'], ['sorry!', 'MON'], ['ugh sorry', 'TUE'], ['SORRY!!', 'WED'], ['sorry x', 'THU'], ['sorry…', 'FRI']]
function cocoa(x, cx, cy, t, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -34, -40, 68, 72, '#ff8fb1', { b: 6, hi: '#ffc2d6' }); box(x, 34, -24, 18, 34, '#ff8fb1', { b: 5 })
  R(x, '#6b3a22', -28, -40, 56, 10)
  for (let i = 0; i < 2; i++) { const p = ((t * 0.9 + i * 0.5) % 1); x.globalAlpha = 0.7 * (1 - p); R(x, '#f4eefc', -12 + i * 16 + 6 * Math.sin(t * 4 + i), -60 - p * 50, 10, 16) }
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue13', a: 'virgo', b: 'sagittarius',
  hook: '“You said sorry | *last time* too.”', hookColor: '#ff8a7a',
  fight: {
    lines: [['a', "you're late. again."], ['b', 'I SAID sorry!'], ['a', 'you said it Tuesday too.']],
    bubbleAt: [[300, 850], [770, 735], [380, 625]],
    draw(x, t) {
      door(x, 860, 1300, clamp(1 - prog(t, 0.6, 1.2)) * 0.9 + 0.1)
    },
    front(x, t) {
      // Virgo's wristwatch: TAP TAP
      watch(x, 105, 1040, 1, t)
      const tap = (t * 2.2) % 1
      if (t < 5.5) label(x, 'TAP TAP', 105, 950 - 8 * tap, { size: 26, col: GOLD, alpha: 1 - tap * 0.5 })
      // Sag's scarf, flying
      const F = starFrame(795, 1130, 280, t, { hops: [1.85, 2.25], seed: 7 })
      inSprite(x, F, () => scarfCells(x, SCARF, t, 2))
    },
    cues: [['tick', 0.3, 0.05], ['tick', 0.75, 0.05], ['tick', 1.2, 0.05], ['whoosh', 0.6, 0.35, 0.04], ['tick', 0.62, 0.06]],
  },
  under: {
    head: 'Every sorry. | *No change.*', color: '#ffd23a',
    draw(x, t, S) {
      const { u, drawB } = S
      // the cork board
      box(x, 110, 470, 860, 600, '#b8875a', { b: 10, hi: 'rgba(255,255,255,0.08)' })
      for (let i = 0; i < 40; i++) R(x, 'rgba(90,50,20,0.35)', 130 + (i * 197) % 820, 490 + (i * 113) % 560, 8, 6)
      NOTES.forEach(([tx, d], i) => {
        const cx = 210 + (i % 4) * 220, cy = 570 + Math.floor(i / 4) * 180
        const at = S.t0 + 0.25 + i * 0.2
        note(x, cx, cy, tx, d, easeOutBack(prog(t, at, at + 0.22), 2.4), (((i * 7) % 5) - 2) * 0.05, i % 3 === 2 ? '#ffc2d6' : '#ffe27a')
      })
      // the FOLLOW-THROUGH meter: empty
      const mk = pop01(t, S.t0 + 3.0, 0.3, 2)
      if (mk > 0.01) {
        x.save(); x.translate(540, 1140); x.scale(mk, mk)
        box(x, -330, -34, 660, 68, '#2a1f55', { b: 7 })
        ink(x, 'FOLLOW-THROUGH', -310, 0, { size: 28, font: MONO, weight: 700, col: BONE, align: 'left' })
        const blink = Math.floor(t * 3) % 2
        ink(x, '0 / 12', 300, 0, { size: 30, font: MONO, weight: 700, col: blink ? '#ff7a6b' : BONE, align: 'right' })
        x.restore()
      }
      // Sag, sheepish, peeking up at the wall
      drawB(x, t, { x: 540, y: 1340, s: 220, pop: pop01(t, S.t0 + 0.1, 0.3, 2), mood: u < 3.2 ? 'wide' : 'neutral', look: [0, -1], hops: [S.t0 + 3.05] })
      void GOLD
    },
    cues: Array.from({ length: 12 }, (_, i) => ['pop', +(0.25 + i * 0.2).toFixed(2), [587.33, 659.25, 739.99, 880][i % 4], 0.03, (i % 4 - 1.5) * 0.3]).concat([['pop', 3.0, 440, 0.05, 0], ['tick', 3.3, 0.04], ['tick', 3.63, 0.04], ['tick', 3.96, 0.04]]),
  },
  talk: {
    head: 'A sorry is | a *promise.*',
    stars: 'a sorry is a promise. make it one you can *keep*.',
    script: "I'm sorry. I'll *text you* when I leave. Every time.",
    reply: ['b', 'small and keepable. *deal.*'],
  },
  made: {
    front(x, t, S) {
      const { u, ok } = S
      // the phone ping above Sag
      const pk = pop01(t, S.t0 + 0.25, 0.3, 2.4) * ok
      if (pk > 0.01) phone(x, 880, 880, { w: 150, h: 250, rot: 0.12, alpha: clamp(pk) }, (c, w) => {
        c.save(); c.scale(pk, pk)
        R(c, '#5fd38a', -w / 2 + 22, -60, w - 44, 56); ink(c, 'leaving', 0, -44, { size: 20, col: INK }); ink(c, 'now!', 0, -20, { size: 20, col: INK })
        ink(c, '7:40 PM', 0, 40, { size: 18, font: MONO, col: BONE })
        c.restore()
      })
      sparkles(x, t, 880, 840, S.t0 + 0.3, 8, 110, 1, [MINT, BONE, GOLD])
      // cocoas
      cocoa(x, 560, 1290, t, pop01(t, S.t0 + 0.9, 0.3, 2.4) * ok)
      cocoa(x, 790, 1280, t, pop01(t, S.t0 + 1.0, 0.3, 2.4) * ok)
      const sk = pop01(t, S.t0 + 1.4, 0.3, 2.6) * ok
      if (sk > 0.01) {
        x.save(); x.translate(540, 1420); x.rotate(-0.04); x.scale(sk, sk)
        box(x, -220, -38, 440, 76, '#9fe6b0', { b: 7 })
        ink(x, '7:52 PM · EARLY', 0, 2, { size: 34, font: MONO, weight: 700 })
        x.restore()
      }
      const F = starFrame(670, 1060, 270 * ok, t, { hops: [S.t0 + 0.2, S.t0 + 1.8, S.t0 + 2.8], seed: 7 })
      if (ok > 0.5) inSprite(x, F, () => scarfCells(x, SCARF, t, 0.5))
      void u; void lerp
    },
    cues: [['pop', 0.25, 1318.51, 0.05, 0.4], ['pop', 0.33, 1760, 0.035, 0.4], ['glitter', 0.3, 0.6], ['pop', 0.9, 880, 0.035, 0.2], ['pop', 1.0, 987.77, 0.035, 0.3], ['pop', 1.4, 1174.66, 0.045, 0], ['bell', 1.45, 2349.32, 0.02, 0.8, 0]],
  },
  last: 'Sorry is a *verb*.', lastColor: '#ffd23a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, drawBits, outK, ease, BONE, PINK, SAG]
