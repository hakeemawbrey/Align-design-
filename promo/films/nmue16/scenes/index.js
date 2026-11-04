// nmue16: THE MAKE-UP TALK, "Hold first, fix later" (30 s vertical, promo/films/next30/b32.md, music: pop · D).
// ♌ Leo × ♑ Capricorn. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“I don’t need a | *spreadsheet!*”" Leo mid-sniffle after a rough day; Capricorn mid-hop holding up a
//             laptop full of solutions: "here's a 5-step plan." / "I don't need a spreadsheet!" / "I'm HELPING!"
//   6.6–12.8  UNDER IT   "Wanted: *a hug.* | Got: a toolbox." Capricorn hands over a wrench, a chart, a clipboard; Leo's
//             thought bubble only holds a blanket.
//   12.8–21.6 THE TALK   "Help, | or *a hug?*" TRY SAYING "Do you want help, or a hug?" Leo: "a hug. then maybe step two."
//   21.6–25.5 MADE UP    the laptop shuts, a blanket wraps them both, Capricorn just holds on. "Hold first. | *Fix* later."
import { makeMakeUp, R, box, ink, label, glow, sparkles, inSprite, starFrame, tearsCells, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

function laptop(x, cx, by, open = 1, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -130, -20, 260, 24, '#9aa6c8', { b: 6 })
  if (open > 0) {
    const h = 170 * open
    box(x, -120, -20 - h, 240, h, '#2a2148', { b: 6 }); R(x, '#5fd38a', -106, -8 - h, 212, h - 24)
    ink(x, 'PLAN', 0, -h + 18, { size: 26, font: MONO, weight: 700, col: INK })
    for (let i = 0; i < 4; i++) { R(x, INK, -90, -h + 46 + i * 26, 14, 14); R(x, 'rgba(27,18,54,0.6)', -66, -h + 50 + i * 26, 110 + (i * 37) % 50, 7) }
  }
  x.restore()
}
const TOOLS = {
  wrench: ['..GG.', '.G..G', '..GGG', '.GG..', 'GG...', 'G....'],
  chart: ['WWWWWW', 'W....W', 'W.R..W', 'W.RB.W', 'WGRBGW', 'WWWWWW'],
  clip: ['.BBBB.', 'WWWWWW', 'W.KK.W', 'W....W', 'W.KK.W', 'WWWWWW'],
}
const TCOL = { G: '#9aa6c8', W: BONE, R: '#ff5c6b', B: '#7fd0ff', K: INK }
function tool(x, name, cx, cy, s, rot = 0) {
  const bm = TOOLS[name], w = bm[0].length, h = bm.length
  x.save(); x.translate(cx, cy); x.rotate(rot)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = bm[j][i]; if (c === '.') continue; x.fillStyle = INK; x.fillRect((i - w / 2) * s - 3, (j - h / 2) * s - 3, s + 6, s + 6) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = bm[j][i]; if (c === '.') continue; x.fillStyle = TCOL[c]; x.fillRect((i - w / 2) * s, (j - h / 2) * s, s + 0.5, s + 0.5) }
  x.restore()
}
function blanket(x, cx, cy, w, h, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#ff9a6b', { b: 8 })
  for (let i = 0; i < 6; i++) R(x, '#ffc29a', -w / 2 + 20 + i * (w - 40) / 6, -h / 2, 16, h)
  R(x, 'rgba(255,255,255,0.18)', -w / 2, -h / 2, w, 14)
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue16', a: 'leo', b: 'capricorn',
  hook: '“I don’t need a | *spreadsheet!*”', hookColor: '#5fd38a',
  fight: {
    lines: [['b', "here's a 5-step plan."], ['a', "I don't need a spreadsheet!"], ['b', "I'm HELPING!"]],
    bubbleAt: [[760, 780], [340, 860], [760, 640]],
    moods: { a: 'wide', b: 'happy' },
    noSquiggle: true,
    front(x, t) {
      const F = starFrame(285, 1130, 280, t, { hops: [-0.12, 1.85, 2.25], seed: 3 })
      inSprite(x, F, () => tearsCells(x, t, 2))
      laptop(x, 795, 1000 - 8 * Math.abs(Math.sin(t * 4)), 1, 0.8)
      label(x, 'ROUGH DAY', 285, 1360, { size: 28, col: '#ffb347' })
    },
    cues: [['pop', 0.4, 1174.66, 0.02, 0.3], ['pop', 0.6, 1318.51, 0.02, 0.3]],
  },
  under: {
    head: 'Wanted: *a hug.* | Got: a toolbox.', color: '#ff9a6b',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      drawA(x, t, { x: 300, y: 1200, s: 240, mood: u > 2.6 ? 'squint' : 'wide', look: [1, 0.2], hops: [S.t0 + 3.4] })
      inSprite(x, starFrame(300, 1200, 240, t, { hops: [S.t0 + 3.4], seed: 3 }), () => tearsCells(x, t, 1))
      drawB(x, t, { x: 820, y: 1200, s: 230, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 1.2, S.t0 + 2.0] })
      ;['wrench', 'chart', 'clip'].forEach((n, i) => {
        const at = 0.4 + i * 0.8, p = ease.outCubic(prog(u, at, at + 0.45))
        if (p <= 0) return
        tool(x, n, lerp(780, 420 + i * 120, p), lerp(1050, 1420 - i * 10, p) - Math.sin(Math.PI * p) * 200, 24, (1 - p) * 3 + i * 0.2)
      })
      // Leo's thought bubble: just a blanket
      const tk = easeOutBack(prog(u, 2.9, 3.3), 2.2)
      if (tk > 0.01) {
        x.save(); x.translate(330, 760); x.scale(tk, tk)
        for (const [dx, dy, r] of [[-80, 0, 110], [40, -30, 130], [130, 20, 100]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 7, 0, Math.PI * 2); x.fill() }
        for (const [dx, dy, r] of [[-80, 0, 110], [40, -30, 130], [130, 20, 100]]) { x.fillStyle = '#fff1e6'; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
        x.fillStyle = INK; x.beginPath(); x.arc(-60, 150, 22, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-30, 200, 14, 0, Math.PI * 2); x.fill()
        blanket(x, 30, -10, 220, 120)
        ink(x, 'just this.', 30, 90, { size: 30, col: INK, font: MONO, weight: 700 })
        x.restore()
      }
    },
    pis: { x: 960, y: 1660, s: 120 },
    cues: [['whoosh', 0.4, 0.4, 0.03], ['tick', 0.85, 0.06], ['whoosh', 1.2, 0.4, 0.03], ['tick', 1.65, 0.06], ['whoosh', 2.0, 0.4, 0.03], ['tick', 2.45, 0.06], ['pop', 2.95, 739.99, 0.04, -0.3], ['pluck', 3.1, 1174.66, 0.035, 0.8, -0.3]],
  },
  talk: {
    head: 'Help, | or *a hug?*', color: '#ff9a6b',
    stars: "when they're hurting, comfort comes before *solutions.*",
    script: 'Do you want *help,* or *a hug?*',
    reply: ['a', 'a hug. *then maybe step two.*'],
  },
  made: {
    draw(x, t, S) { laptop(x, 920, 1420, 0, 0.7 * S.ok); glow(x, 540, 1060, 380, S.ok, '255,170,120') },
    front(x, t, S) {
      blanket(x, 540, 1240 + 30 * (1 - ease.outBack(prog(t, S.t0 + 0.5, S.t0 + 0.9))), 560, 150, pop01(t, S.t0 + 0.5, 0.35, 2) * S.ok)
      sparkles(x, t, 540, 1160, S.t0 + 0.7, 10, 260, 1, ['#ff9a6b', GOLD, BONE])
      label(x, 'step two: later', 780, 1450, { size: 34, col: BONE, alpha: S.ok * clamp(prog(t, S.t0 + 1.5, S.t0 + 1.8)) })
    },
    cues: [['whoosh', 0.5, 0.4, 0.035], ['pop', 0.85, 739.99, 0.04, 0], ['glitter', 0.7, 1.1], ['tick', 0.1, 0.05]],
  },
  last: 'Hold first. | *Fix* later.', lastColor: '#ff9a6b',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, INTER]
