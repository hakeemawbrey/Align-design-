// nmue14: THE MAKE-UP TALK, "It was never the plate" (30 s vertical, promo/films/next30/b32.md, music: funk · E).
// ♊ Gemini × ♉ Taurus. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“It’s *one plate.*”" Gemini holds one plate up beside a teetering dish tower; Taurus glares:
//             "it's one plate." / "it's ALWAYS one plate." / "why is this so big??"
//   6.6–12.8  UNDER IT   "What’s *inside* | the pile?" An X-ray scan sweeps down the tower: inside, a note "I feel alone in this."
//   12.8–21.6 THE TALK   "Find the feeling | *under* the fight." TRY SAYING "I feel alone with the chores. Can we share them?"
//             Gemini: "oh. I didn't see it. wash or dry?"
//   21.6–25.5 MADE UP    side by side at the sink, soap bubbles drifting. "It was never about *the plate*."
import { makeMakeUp, R, box, ink, glow, sparkles, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

function plate(x, cx, cy, w, rot = 0, col = '#f4eefc') {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -w / 2 - 6, -12, w + 12, 24); R(x, col, -w / 2, -7, w, 14); R(x, '#c9c2e0', -w / 2 + 16, 0, w - 32, 6)
  x.restore()
}
const COLS = ['#f4eefc', '#ffd6e2', '#cfe8ff', '#f4eefc', '#ffe9b0', '#d9f5e2']
function tower(x, t, cx, by, n, wob) {
  for (let i = 0; i < n; i++) {
    const sway = wob * Math.sin(t * 3.2 + i * 0.25) * i * 0.9
    const w = i % 5 === 3 ? 120 : 170 - (i % 3) * 14
    if (i % 7 === 6) { // a mug
      box(x, cx + sway - 30, by - i * 24 - 46, 60, 50, '#ff8fb1', { b: 5 }); continue
    }
    plate(x, cx + sway, by - i * 24, w, 0.04 * Math.sin(i * 1.7), COLS[i % COLS.length])
  }
}
function sink(x) {
  R(x, INK, 0, 1282, 1080, 10); R(x, '#8a6a4a', 0, 1290, 1080, 34); R(x, 'rgba(255,255,255,0.15)', 0, 1290, 1080, 8)
  R(x, '#3a2d5c', 0, 1324, 1080, 600)
  box(x, 360, 1290, 360, 70, '#9aa6c8', { b: 7, hi: '#c9d2ea' })
  box(x, 520, 1150, 22, 140, '#c9d2ea', { b: 5 }); box(x, 520, 1150, 90, 20, '#c9d2ea', { b: 5 })
}
function suds(x, t, cx, cy, n = 8, k = 1) {
  for (let i = 0; i < n; i++) {
    const p = ((t * 0.35 + i / n) % 1), bx = cx + Math.sin(i * 2.7 + t) * 140, byy = cy - p * 520
    const r = 10 + (i % 3) * 7
    x.save(); x.globalAlpha = k * 0.85 * (1 - p)
    x.strokeStyle = '#e9f6ff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, byy, r, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(bx - r * 0.5, byy - r * 0.5, 4, 4)
    x.restore()
  }
}

const EP = makeMakeUp({
  id: 'nmue14', a: 'gemini', b: 'taurus',
  hook: '“It’s *one plate.*”', hookColor: '#ffd23a',
  fight: {
    lines: [['a', "it's one plate."], ['b', "it's ALWAYS one plate."], ['a', 'why is this so big??']],
    bubbleAt: [[290, 800], [760, 700], [330, 600]],
    posA: { x: 210, y: 1130, s: 250 }, posB: { x: 870, y: 1130, s: 250 },
    noSquiggle: true,
    draw(x, t) { sink(x); tower(x, t, 540, 1270, 16, 1.2) },
    front(x, t) {
      // Gemini holds the one plate up, high
      const lift = Math.sin(t * 6) * 6
      plate(x, 210, 935 + lift, 150, -0.12, '#f4eefc')
      sparkles(x, t, 210, 935, 0.0, 6, 70, 1, [BONE, GOLD])
    },
    cues: [['tick', 1.2, 0.03], ['tick', 2.6, 0.03], ['tick', 4.4, 0.04]],
  },
  under: {
    head: 'What’s *inside* | the pile?', color: '#7fd0ff',
    draw(x, t, S) {
      const { u, drawB } = S
      sink(x)
      const scan = clamp(prog(u, 0.6, 2.4))
      // the tower, then its X-ray: everything above the scan line turns blueprint blue
      tower(x, t, 540, 1270, 26, 0.5)
      const sy = lerp(560, 1290, scan)
      if (scan > 0) {
        x.save(); x.beginPath(); x.rect(300, 520, 480, sy - 520); x.clip()
        R(x, 'rgba(20,40,110,0.88)', 300, 520, 480, 780)
        for (let i = 0; i < 26; i++) { x.strokeStyle = 'rgba(127,208,255,0.7)'; x.lineWidth = 3; x.strokeRect(540 - 80, 1270 - i * 24 - 8, 160, 16) }
        x.restore()
        if (scan < 1) { R(x, '#7fd0ff', 290, sy - 4, 500, 8); glow(x, 540, sy, 300, 1, '127,208,255') }
      }
      // the note inside
      const nk = easeOutBack(prog(u, 2.5, 2.9), 2.2)
      if (nk > 0.01) {
        x.save(); x.translate(540, 900); x.rotate(-0.04); x.scale(nk, nk)
        box(x, -220, -90, 440, 180, '#ffe27a', { b: 7 })
        ink(x, 'I feel alone', 0, -26, { size: 52, col: '#7a2b2b' }); ink(x, 'in this.', 0, 36, { size: 52, col: '#7a2b2b' })
        x.restore()
        sparkles(x, t, 540, 900, S.t0 + 2.55, 10, 260, 2, ['#7fd0ff', BONE, GOLD])
      }
      // Taurus, small, at the edge, the feeling it hadn't said
      drawB(x, t, { x: 880, y: 1180, s: 190, pop: pop01(t, S.t0 + 0.2, 0.3, 2), mood: u < 2.6 ? 'neutral' : 'sparkle', look: [-1, -0.4], hops: [S.t0 + 2.6] })
    },
    pis: { x: 150, y: 1620, s: 120 },
    cues: [['riser', 0.6, 2.4, 0.03], ['pop', 2.5, 659.25, 0.05, 0], ['bell', 2.6, 1318.51, 0.03, 1.0, 0], ['glitter', 2.55, 2.9]],
  },
  talk: {
    head: 'Find the feeling | *under* the fight.', color: '#7fd0ff',
    stars: 'name the feeling under the fight, not the *plate*.',
    script: 'I feel *alone* with the chores. Can we share them?',
    reply: ['a', "oh. I didn't see it. *wash or dry?*"],
  },
  made: {
    posA: { x: 330, y: 1080, s: 250 }, posB: { x: 750, y: 1080, s: 250 },
    draw(x, t, S) {
      sink(x)
      x.save(); x.globalAlpha = S.ok
      plate(x, 470, 1250, 130, 0.2); plate(x, 610, 1245, 130, -0.15, '#ffd6e2')
      x.restore()
    },
    front(x, t, S) {
      suds(x, t, 540, 1240, 10, S.ok * clamp(prog(t, S.t0 + 0.2, S.t0 + 0.8)))
    },
    cues: [['pop', 0.3, 1174.66, 0.025, -0.3], ['pop', 0.7, 1318.51, 0.025, 0.3], ['pop', 1.2, 1567.98, 0.025, 0], ['pop', 2.0, 1174.66, 0.02, 0.2]],
  },
  last: 'It was never | about *the plate*.', lastColor: '#7fd0ff',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, MONO, INTER, ease]
