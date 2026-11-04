// nmue15: THE MAKE-UP TALK, "A break with a return time" (30 s vertical, promo/films/next30/b32.md, music: lofi · Eb).
// ♈ Aries × ♋ Cancer. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“I need a *minute.*”" Aries mid-stomp, steam puffing, two heat meters climbing to red; Cancer hugs a
//             pillow on the couch: "you're not listening!" / "YOU'RE not listening!" / "I need a minute."
//   6.6–12.8  UNDER IT   "Gone… | *for how long?*" Aries walks out with no word, the door shuts, a giant "?" hangs over it while
//             Cancer waits; then ◀◀ REWIND.
//   12.8–21.6 THE TALK   "Take the break. | Say *when* you’re back." TRY SAYING "I need twenty minutes. Then I'm coming back."
//             Cancer: "ok. I'll put the kettle on."
//   21.6–25.5 MADE UP    a 20:00 timer races down (Aries does laps, Cancer pours tea), DING, KNOCK KNOCK, right on time.
//             "Come back *when you said*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, couch, hearts, shadow, inSprite, starFrame, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO } from '../../nmue13/scenes/makeupkit.js'

function door(x, cx, by, open = 0) {
  box(x, cx - 110, by - 380, 220, 380, '#2a1f45', { b: 8 })
  const w = 200 * (1 - 0.8 * open)
  if (open > 0) glow(x, cx, by - 190, 200, open, '255,220,160')
  box(x, cx - 100, by - 370, w, 360, '#5a7a9a', { b: 6, hi: 'rgba(255,255,255,0.12)' })
  R(x, GOLD, cx - 100 + w - 30, by - 200, 14, 14)
}
function meter(x, cx, cy, f, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -18, -150, 36, 230, BONE, { b: 6 })
  const h = 200 * clamp(f)
  R(x, f > 0.75 ? '#ff4f5e' : f > 0.45 ? '#ffb347' : '#7fd0ff', -10, 70 - h, 20, h)
  box(x, -30, 70, 60, 50, f > 0.75 ? '#ff4f5e' : '#ffb347', { b: 6 })
  x.restore()
}
function pillow(x, F) {
  inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(9.5, 22.5, 17, 11); x.fillStyle = '#ffb3c8'; x.fillRect(10, 23, 16, 10); x.fillStyle = '#ffd6e2'; x.fillRect(10, 23, 16, 2.5) })
}
function teapot(x, cx, cy, k, tilt = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(tilt)
  box(x, -50, -40, 100, 80, '#9fe6b0', { b: 6, hi: '#c9f2d4' }); box(x, 50, -30, 40, 14, '#9fe6b0', { b: 5 }); box(x, -20, -58, 40, 16, '#9fe6b0', { b: 5 })
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue15', a: 'aries', b: 'cancer',
  hook: '“I need a *minute.*”', hookColor: '#ff6b5e',
  fight: {
    lines: [['b', "you're not listening!"], ['a', "YOU'RE not listening!"], ['a', 'I need a minute.']],
    bubbleAt: [[760, 820], [300, 720], [320, 610]],
    posA: { x: 300, y: 1130, s: 270 }, posB: { x: 800, y: 1160, s: 240 },
    noSquiggle: true,
    moods: { a: 'squint', b: t => t < 1.6 ? 'wide' : 'squint' },
    draw(x) { couch(x, 800, 1330, 380, '#4f6fb0') },
    front(x, t) {
      pillow(x, starFrame(800, 1160, 240, t, { seed: 7 }))
      const f = clamp(0.35 + t / 5.5)
      meter(x, 90, 1080, f); meter(x, 990, 1080, f * 0.95)
      if (f > 0.75) { label(x, 'HOT', 90, 900, { size: 26, col: '#ff4f5e' }); label(x, 'HOT', 990, 900, { size: 26, col: '#ff4f5e' }) }
    },
    cues: [['riser', 0.2, 5.2, 0.02], ['tom', 0.5, 90, { gain: 0.18, decay: 0.2 }], ['tom', 1.0, 90, { gain: 0.18, decay: 0.2 }]],
  },
  under: {
    head: 'Gone… | *for how long?*', color: '#c9a6ff',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      const rew = u > 4.5
      const uu = rew ? lerp(4.5, 0.4, ease.inOutCubic(prog(u, 4.5, 5.9))) : u      // the rewind plays it backwards
      const open = clamp(prog(uu, 0.5, 0.8)) * (1 - clamp(prog(uu, 1.7, 1.9)))
      couch(x, 760, 1330, 420, '#4f6fb0')
      door(x, 300, 1290, open)
      // Aries walks out, no word
      const walk = ease.inOutCubic(prog(uu, 0.4, 1.7))
      if (walk < 0.99) drawA(x, t, { x: lerp(560, 300, walk), y: lerp(1140, 1110, walk), s: lerp(230, 120, walk), alpha: 1 - clamp(prog(walk, 0.75, 1)), mood: 'squint', look: [-1, 0], hops: [S.t0 + 0.5, S.t0 + 0.9, S.t0 + 1.3] })
      // Cancer, alone, waiting
      drawB(x, t, { x: 780, y: 1160, s: 230, mood: uu > 1.9 ? 'wide' : 'neutral', look: [-1, -0.3] })
      pillow(x, starFrame(780, 1160, 230, t, { seed: 7 }))
      const q = easeOutBack(prog(uu, 2.0, 2.4), 2.4)
      if (q > 0.01) {
        x.save(); x.translate(300, 700 + 10 * Math.sin(t * 3)); x.scale(q, q)
        ink(x, '?', 6, 8, { size: 300, col: INK }); ink(x, '?', 0, 0, { size: 300, col: '#c9a6ff' })
        x.restore()
        label(x, '5 min? 20? all night?', 660, 870, { size: 40, col: BONE, alpha: clamp(prog(uu, 2.8, 3.1)) })
      }
      if (rew) {
        x.save(); x.globalAlpha = 0.25; for (let i = 0; i < 12; i++) R(x, '#ffffff', 0, (i * 160 + t * 900) % 1920, 1080, 6); x.restore()
        label(x, '◀◀ REWIND', 540, 1460, { size: 56, col: BONE, alpha: Math.floor(t * 4) % 2 ? 1 : 0.6 })
      }
    },
    pis: { x: 960, y: 1650, s: 120 },
    cues: [['tom', 0.5, 120, { gain: 0.12, decay: 0.15 }], ['tom', 0.9, 120, { gain: 0.12, decay: 0.15 }], ['tick', 1.85, 0.08], ['tom', 1.86, 70, { gain: 0.25, decay: 0.3 }], ['pluck', 2.1, 739.99, 0.04, 0.8, 0], ['riser', 4.5, 5.9, 0.03], ['whoosh', 4.6, 1.2, 0.03]],
  },
  talk: {
    head: 'Take the break. | Say *when* you’re back.', color: '#9fe6b0',
    stars: "take the break. just say *when* you're coming back.",
    script: 'I need *twenty minutes.* Then I’m coming back.',
    reply: ['b', "ok. I'll put the *kettle* on."],
  },
  made: {
    pair: false,
    draw(x, t, S) {
      const { u, ok, drawA, drawB } = S
      const rest = clamp(prog(u, 2.0, 2.4))
      // the timer
      const rem = Math.max(0, 1200 * (1 - prog(u, 0.0, 1.8)))
      const mm = String(Math.floor(rem / 60)).padStart(2, '0'), ss = String(Math.floor(rem % 60)).padStart(2, '0')
      x.save(); x.translate(540, 700); x.scale(ok, ok)
      box(x, -200, -70, 400, 140, rem > 0 ? '#1d1640' : '#9fe6b0', { b: 8 })
      ink(x, `${mm}:${ss}`, 0, 4, { size: 92, font: MONO, weight: 700, col: rem > 0 ? '#9fe6b0' : INK })
      x.restore()
      if (rem <= 0) sparkles(x, t, 540, 700, S.t0 + 1.8, 10, 230, 1, ['#9fe6b0', BONE, GOLD])
      door(x, 200, 1290, 0)
      // laps (Aries) → knock → inside together
      if (u < 2.0) {
        const lap = Math.sin(u * 7)
        drawA(x, t, { x: 540 + lap * 300, y: 820, s: 120 * ok, mood: 'happy', look: [Math.sign(Math.cos(u * 7)), 0], hops: [S.t0 + 0.2, S.t0 + 0.6, S.t0 + 1.0, S.t0 + 1.4] })
        label(x, 'LAPS', 540, 730, { size: 26, col: '#ff6b5e' })
      }
      const knock = [2.05, 2.3].some(k => u > k && u < k + 0.4)
      if (u > 2.0 && u < 2.8) label(x, 'KNOCK KNOCK', 230, 860, { size: 40, col: GOLD, rot: -0.1, alpha: knock ? 1 : 0.5 })
      const ax = lerp(200, 420, ease.inOutCubic(rest))
      const bx = 680
      shadow(x, 550, 1240, 460 * ok)
      if (u > 2.0) drawA(x, t, { x: ax, y: 1080, s: 250 * ok, mood: u > 2.8 ? 'heart' : 'happy', look: [1, 0], hops: [S.t0 + 2.05, S.t0 + 2.9] })
      drawB(x, t, { x: bx, y: 1080, s: 250 * ok, mood: u > 2.4 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 1.85, S.t0 + 2.5] })
      teapot(x, 850, 1260, ok, u < 1.8 ? -0.3 * Math.abs(Math.sin(u * 3)) : 0)
      if (u > 2.6) hearts(x, t, S.t0 + 2.6, 550, 870, { n: 6, cell: 7 })
    },
    cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.2).toFixed(2), 0.03]), ['bell', 1.8, 1760, 0.05, 1.2, 0], ['bell', 1.85, 2349.32, 0.03, 1.2, 0], ['tom', 2.05, 140, { gain: 0.2, decay: 0.15 }], ['tom', 2.3, 140, { gain: 0.2, decay: 0.15 }]],
  },
  last: 'Come back | *when you said*.', lastColor: '#9fe6b0',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
