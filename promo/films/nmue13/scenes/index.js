// nmue13: THE MAKE-UP TALK, "Not at 1 AM" (28 s vertical, promo/films/next30/b32.md, music: jazzy · Bb).
// ♍ Virgo × ♐ Sagittarius. The format lives in ./makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“It’s *1 AM.* | Let’s finish this.”" Virgo mid-hop by a glowing bedside clock (1:07 AM); Sag
//             yawning under a blanket: "we're finishing this NOW." / "my eyes are closing." / "so you DON'T care??"
//   6.6–12.8  UNDER IT   "Low battery. | *Short fuse.*" Two battery bars drain to red over their heads; every word comes out
//             bent and grumpy ("whatever." / "FINE." / "ok WOW").
//   12.8–21.6 THE TALK   "Pick a *time.* | Then keep it." TRY SAYING "I care. Can we talk at breakfast?"
//             Virgo: "breakfast. you're making the eggs."
//   21.6–25.5 MADE UP    9:00 AM: toast pops, the batteries are full, they talk at the table. "Morning you is *kinder*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, inSprite, starFrame, pop01, prog, lerp, clamp, ease, INK, BONE, GOLD, MINT, MONO, INTER } from './makeupkit.js'

function clock(x, cx, cy, text, { k = 1, col = '#ff5c6b', w = 230 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  glow(x, 0, 0, 220, 0.9, col === '#ff5c6b' ? '255,92,107' : '159,230,176')
  box(x, -w / 2, -55, w, 110, '#1b1530', { b: 7 })
  ink(x, text, 0, 4, { size: 54, font: MONO, weight: 700, col })
  x.restore()
}
function bed(x) {
  box(x, 600, 1200, 460, 120, '#5a4a8a', { b: 8 })
  box(x, 990, 1060, 60, 260, '#4a3a78', { b: 8 })
  box(x, 600, 1320, 30, 60, '#4a3a78', { b: 6 })
}
function blanket(x, F) {
  inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(3, 24.5, 30, 11); x.fillStyle = '#7fa8e8'; x.fillRect(3.5, 25, 29, 10); x.fillStyle = '#a9c6f2'; for (let i = 0; i < 5; i++) x.fillRect(5 + i * 6, 25, 3, 10) })
}
function battery(x, cx, cy, f, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -86, -40, 172, 80, BONE, { b: 5 }); R(x, '#1b1530', -80, -34, 160, 68); box(x, 86, -14, 12, 28, BONE, { b: 4 })
  const col = f > 0.5 ? MINT : f > 0.2 ? '#ffb347' : '#ff4f5e'
  const n = Math.max(0, Math.round(f * 5))
  for (let i = 0; i < n; i++) R(x, col, -70 + i * 29, -24, 23, 48)
  x.restore()
}
// a grumpy word that comes out bent
function grump(x, t, cx, cy, t0, text, rot) {
  const k = pop01(t, t0, 0.25, 2.6)
  if (k <= 0.01) return
  label(x, text, cx, cy - 10 * Math.min(1, t - t0), { size: 46 * k, col: '#ff7a6b', font: INTER, weight: 800, rot: rot + 0.05 * Math.sin((t - t0) * 9) })
}
function toast(x, cx, cy, t, t0, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const up = ease.outBack(prog(t, t0, t0 + 0.3)) * 70 - ease.inQuad(prog(t, t0 + 0.3, t0 + 0.7)) * 30
  for (const dx of [-28, 28]) { box(x, dx - 22, -60 - up, 44, 60, '#d8a25a', { b: 5 }); R(x, '#f0c98a', dx - 16, -54 - up, 32, 48) }
  box(x, -80, -40, 160, 90, '#c9d2ea', { b: 7, hi: '#e6ebf7' }); R(x, INK, -60, -40, 46, 8); R(x, INK, 14, -40, 46, 8)
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue13', a: 'virgo', b: 'sagittarius',
  hook: '“It’s *1 AM.* | Let’s finish this.”', hookColor: '#ff6b7a',
  fight: {
    lines: [['a', "we're finishing this NOW."], ['b', 'my eyes are closing.'], ['a', "so you DON'T care??"]],
    bubbleAt: [[330, 860], [790, 860], [330, 640]],
    posA: { x: 260, y: 1130, s: 270 }, posB: { x: 800, y: 1140, s: 250 },
    moods: { a: 'squint', b: t => (t % 2.6) < 0.9 ? 'sleepy' : 'neutral' },
    noSquiggle: true, noSteam: true,
    draw(x) { R(x, 'rgba(6,4,22,0.45)', 0, 0, 1080, 1920); bed(x) },
    front(x, t) {
      blanket(x, starFrame(800, 1140, 250, t, { seed: 7 }))
      clock(x, 540, 1400, '1:07 AM')
      label(x, 'z', 900 + 10 * Math.sin(t * 2), 980 - (t * 40) % 80, { size: 40, col: '#a9c6f2', alpha: 0.7 })
    },
    cues: [['tick', 0.5, 0.03], ['tick', 1.5, 0.03], ['tick', 2.5, 0.03], ['tick', 3.5, 0.03], ['tick', 4.5, 0.03], ['tick', 5.5, 0.03]],
  },
  under: {
    head: 'Low battery. | *Short fuse.*', color: '#ffb347',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      R(x, 'rgba(6,4,22,0.45)', 0, 0, 1080, 1920)
      const f = lerp(0.6, 0.12, ease.inOutQuad(prog(u, 0.4, 2.6)))
      drawA(x, t, { x: 280, y: 1200, s: 240, mood: u > 2.6 ? 'squint' : 'neutral', look: [1, 0], hops: [S.t0 + 3.0, S.t0 + 4.4] })
      drawB(x, t, { x: 800, y: 1200, s: 240, mood: u > 2.6 ? 'eyeroll' : 'sleepy', look: [-1, 0], hops: [S.t0 + 3.7] })
      battery(x, 280, 920, f, pop01(t, S.t0 + 0.2, 0.3, 2)); battery(x, 800, 920, f * 0.8, pop01(t, S.t0 + 0.3, 0.3, 2))
      if (f < 0.25 && Math.floor(t * 3) % 2) { label(x, 'LOW', 280, 850, { size: 28, col: '#ff4f5e' }); label(x, 'LOW', 800, 850, { size: 28, col: '#ff4f5e' }) }
      grump(x, t, 330, 620, S.t0 + 3.0, 'whatever.', -0.12)
      grump(x, t, 760, 700, S.t0 + 3.7, 'FINE.', 0.14)
      grump(x, t, 380, 760, S.t0 + 4.4, 'ok WOW.', 0.08)
    },
    cues: [['riser', 0.4, 2.6, 0.02], ['pluck', 2.7, 220, 0.04, 0.6, 0], ['pop', 3.0, 440, 0.045, -0.3], ['pop', 3.7, 392, 0.045, 0.3], ['pop', 4.4, 349.23, 0.045, -0.2]],
  },
  talk: {
    head: 'Pick a *time.* | Then keep it.', color: '#9fe6b0',
    stars: 'tired talks go in circles. pick a *time*, then keep it.',
    script: 'I care. Can we talk *at breakfast?*',
    reply: ['a', "breakfast. *you're making the eggs.*"],
  },
  made: {
    draw(x, t, S) {
      glow(x, 540, 700, 700, S.ok, '255,226,160')
      box(x, 150, 1230, 780, 40, '#a07850', { b: 7, hi: '#c09868' }); R(x, INK, 200, 1270, 20, 160); R(x, INK, 860, 1270, 20, 160)
    },
    front(x, t, S) {
      clock(x, 540, 640, '9:00 AM', { k: pop01(t, S.t0 + 0.1, 0.3, 2.4) * S.ok, col: MINT })
      toast(x, 860, 1215, t, S.t0 + 0.6, S.ok)
      sparkles(x, t, 860, 1120, S.t0 + 0.65, 8, 120, 1, [GOLD, BONE, '#f0c98a'])
      const bk = pop01(t, S.t0 + 1.2, 0.3, 2.4) * S.ok
      battery(x, 300, 880, 1, bk); battery(x, 780, 880, 1, bk)
    },
    cues: [['pop', 0.1, 1318.51, 0.04, 0], ['pop', 0.6, 880, 0.05, 0], ['pop', 0.66, 1174.66, 0.04, 0], ['bell', 1.2, 1760, 0.03, 1.0, -0.3], ['bell', 1.28, 2349.32, 0.025, 1.0, 0.3]],
  },
  last: 'Morning you | is *kinder*.', lastColor: '#9fe6b0',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, BONE]
