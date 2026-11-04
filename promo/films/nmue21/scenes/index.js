// nmue21: THE MAKE-UP TALK, "The morning-after check-in" (30 s vertical, promo/films/next30/b32.md, music: house · F).
// ♋ Cancer × ♌ Leo. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
// Chapter tabs: THE MORNING AFTER · UNDER IT · THE TALK · MADE UP (last night's talk is already done).
//   0–6.6     "“So… *are we good?*”" Sunrise. Cancer mid-type on a phone; Leo asleep, its phone face up on the nightstand.
//             Cancer drafts and deletes: "hey" ✕ / "about last night…" ✕ / "are we" … SEND? hovering.
//   6.6–12.8  UNDER IT   "Talk’s done. | Feelings *catching up.*" A little grey cloud of "what if"s follows Cancer around
//             the kitchen (what if they're still upset? / what if I said too much?).
//   12.8–21.6 THE TALK   "A check-in | is *care.*" TRY SAYING "Still thinking about last night. Are we good?"
//             Leo: "we're good. thank you for asking. coffee?"
//   21.6–25.5 MADE UP    two mugs at the window, the little cloud turns into a sun. "Check in | *the morning after*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, phone, drawBits, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

function sunriseWindow(x, t, cx, cy, w, h, warm = 1) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#2a1f55', { b: 10 })
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2)
  g.addColorStop(0, '#5a6ad8'); g.addColorStop(0.6, '#ff9a8a'); g.addColorStop(1, '#ffd27a')
  x.save(); x.globalAlpha = warm; x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.restore()
  x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(cx, cy + h / 2 - 10, 70, Math.PI, 0); x.fill()
  R(x, INK, cx - 5, cy - h / 2, 10, h); R(x, INK, cx - w / 2, cy - 5, w, 10)
  glow(x, cx, cy + h / 2, 400, warm, '255,200,140')
}
function bed(x) { box(x, 560, 1220, 480, 110, '#5a4a8a', { b: 8 }); box(x, 1000, 1080, 50, 250, '#4a3a78', { b: 8 }) }
const DRAFTS = [['hey', 0.2, 1.4], ['about last night…', 1.6, 3.2], ['are we', 3.4, 9]]
function draftPhone(x, t, cx, cy) {
  phone(x, cx, cy, { w: 300, h: 480, rot: -0.04 }, (c, w, h) => {
    R(c, '#1b1530', -w / 2 + 12, -h / 2 + 18, w - 24, 50); ink(c, `${'♌'}︎ Leo`, 0, -h / 2 + 44, { size: 26, col: BONE, font: INTER })
    // the input line
    R(c, BONE, -w / 2 + 24, h / 2 - 110, w - 48, 60)
    let txt = '', strike = 0
    for (const [s, a, b] of DRAFTS) {
      if (t < a) break
      const typed = Math.floor(clamp(prog(t, a, a + 0.6)) * s.length)
      txt = s.slice(0, typed)
      const del = clamp(prog(t, b - 0.4, b))
      if (t > b - 0.4 && b < 9) txt = s.slice(0, Math.floor(s.length * (1 - del)))
      strike = 0
    }
    void strike
    ink(c, txt + (Math.floor(t * 3) % 2 ? '|' : ''), -w / 2 + 40, h / 2 - 80, { size: 30, col: INK, align: 'left', font: MONO, weight: 700 })
    if (t > 4.2) { const k = 0.5 + 0.5 * Math.sin(t * 6); box(c, w / 2 - 110, h / 2 - 190, 80, 50, MINT, { b: 5 }); ink(c, 'SEND', w / 2 - 70, h / 2 - 164, { size: 20, font: MONO, col: INK, alpha: 0.6 + 0.4 * k }) }
  })
}
function cloud(x, t, cx, cy, k = 1, sun = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 8 * Math.sin(t * 2)); x.scale(k, k)
  if (sun > 0) {
    x.save(); x.globalAlpha = sun; x.rotate(t * 0.5)
    for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); R(x, INK, -12, -130, 24, 50); R(x, GOLD, -8, -126, 16, 42); x.restore() }
    x.restore()
  }
  const col = sun > 0.5 ? GOLD : '#8a86a8'
  for (const pass of [0, 1]) for (const [dx, dy, r] of [[-60, 0, 55], [0, -25, 70], [60, 0, 55]]) { x.fillStyle = pass ? col : INK; x.beginPath(); x.arc(dx, dy, r + (pass ? 0 : 7), 0, Math.PI * 2); x.fill() }
  if (sun > 0.5) { R(x, INK, -30, -20, 14, 14); R(x, INK, 16, -20, 14, 14); R(x, INK, -20, 14, 40, 8) }
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue21', a: 'cancer', b: 'leo',
  chapters: ['THE MORNING AFTER', 'UNDER IT', 'THE TALK', 'MADE UP'],
  hook: '“So… *are we good?*”', hookColor: '#ffb39a',
  fight: {
    lines: [],
    noPair: true,
    draw(x, t, S) {
      sunriseWindow(x, t, 540, 620, 380, 300, 0.7)
      bed(x)
      S.drawB(x, t, { x: 780, y: 1160, s: 220, mood: 'sleepy', look: [0, 0] })
      S.drawA(x, t, { x: 270, y: 990, s: 240, mood: t > 3.6 ? 'wide' : 'neutral', look: [0.6, -0.6], hops: [-0.12, 1.6, 3.4] })
      draftPhone(x, t, 300, 1440)
      if (t > 1.3 && t < 1.6) label(x, 'delete', 520, 1300, { size: 30, col: '#ff7a6b' })
      if (t > 3.0 && t < 3.3) label(x, 'delete', 520, 1300, { size: 30, col: '#ff7a6b' })
    },
    pis: { x: 960, y: 1660, s: 120 },
    cues: [...[0.2, 0.3, 0.4, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 3.4, 3.5, 3.6, 3.7].map(v => ['tick', v, 0.03]), ['pluck', 1.3, 440, 0.03, 0.4, 0], ['pluck', 3.0, 392, 0.03, 0.4, 0]],
  },
  under: {
    head: 'Talk’s done. | Feelings *catching up.*', color: '#c9a6ff',
    draw(x, t, S) {
      const { u, drawA } = S
      // the kitchen counter
      R(x, INK, 0, 1282, 1080, 10); R(x, '#8a6a4a', 0, 1290, 1080, 34); R(x, '#3a2d5c', 0, 1324, 1080, 600)
      const cx = lerp(240, 820, 0.5 + 0.5 * Math.sin(u * 1.1 - 1.5))
      drawA(x, t, { x: cx, y: 1150, s: 230, mood: 'neutral', look: [0, -1], hops: [S.t0 + 0.5, S.t0 + 1.8, S.t0 + 3.1, S.t0 + 4.4] })
      cloud(x, t, cx, 880, pop01(t, S.t0 + 0.4, 0.4, 2))
      ;[['what if they’re still upset?', 0.9, 600], ['what if I said too much?', 2.3, 690], ['what if…', 3.7, 520]].forEach(([s, a, y], i) =>
        label(x, s, 540, y, { size: 36, col: '#c9c4e0', font: INTER, weight: 800, rot: [-0.04, 0.03, -0.02][i], alpha: clamp(prog(u, a, a + 0.3)) * (1 - clamp(prog(u, a + 2.2, a + 2.6))) }))
    },
    cues: [['pop', 0.4, 440, 0.035, 0], ['pluck', 0.9, 523.25, 0.03, 0.6, -0.3], ['pluck', 2.3, 493.88, 0.03, 0.6, 0.3], ['pluck', 3.7, 466.16, 0.03, 0.6, 0]],
  },
  talk: {
    head: 'A check-in | is *care.*', color: '#ffb39a',
    stars: 'a check-in the next day is care, not *doubt.*',
    script: 'Still thinking about last night. *Are we good?*',
    reply: ['b', "we're good. thank you for asking. *coffee?*"],
  },
  made: {
    draw(x, t, S) {
      x.save(); x.globalAlpha = S.ok; sunriseWindow(x, t, 540, 640, 420, 320, 1); x.restore()
    },
    front(x, t, S) {
      const sun = ease.inOutCubic(prog(t, S.t0 + 0.6, S.t0 + 1.4))
      cloud(x, t, 860, 560, 0.8 * S.ok, sun)
      for (const [mx, col] of [[460, '#ffb3c8'], [620, '#9fe6b0']]) {
        const k = pop01(t, S.t0 + 0.3, 0.3, 2.4) * S.ok
        if (k > 0.01) { x.save(); x.translate(mx, 1290); x.scale(k, k); box(x, -36, -44, 72, 80, col, { b: 6 }); box(x, 36, -26, 18, 36, col, { b: 5 }); R(x, '#6b3a22', -30, -44, 60, 10); x.restore() }
      }
      sparkles(x, t, 860, 560, S.t0 + 1.4, 10, 160, 1, [GOLD, BONE, '#ffb39a'])
    },
    cues: [['pop', 0.3, 880, 0.04, -0.2], ['pop', 0.4, 987.77, 0.04, 0.2], ['riser', 0.6, 1.4, 0.02], ['bell', 1.4, 1760, 0.035, 1.2, 0.3], ['glitter', 1.4, 1.8]],
  },
  last: 'Check in | *the morning after*.', lastColor: '#ffb39a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, easeOutBack, PINK]
