// nmue17: THE MAKE-UP TALK, "Not in front of everyone" (28 s vertical, promo/films/next30/b32.md, music: dreamy · Ab).
// ♏ Scorpio × ♎ Libra. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“Funny, you’re *never* | this fun at home.”" Scorpio mid-quip at a holiday party, Libra frozen with a
//             cocoa; SCRATCH, the guests turn to look: "it's true though!" / "…wow. okay." / "what? it's a JOKE."
//   6.6–12.8  UNDER IT   "A jab in public | lands *twice.*" A spotlight Libra didn't ask for, a ring of staring guests, Libra's
//             face heating up (HOT FACE meter).
//   12.8–21.6 THE TALK   "Take it | *home.*" TRY SAYING "That stung. Talk later, just us?"
//             Scorpio: "yes. that was unfair. I'm sorry."
//   21.6–25.5 MADE UP    the walk home under the street lamps, snow falling, Libra laughing. "Some talks | *wait for home*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, drawStarChar, signStar, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const GUESTS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'sagittarius', 'capricorn', 'aquarius'].map((id, i) => ({ ...signStar(id), x: 90 + i * 112, y: 800 + (i % 2) * 40, seed: 11 + i }))
function lights(x, t, y = 520) {
  for (let i = 0; i < 12; i++) {
    const px = 40 + i * 92, py = y + 26 * Math.sin((i / 11) * Math.PI)
    R(x, INK, px - 2, py - 30, 4, 30)
    const on = (Math.floor(t * 3) + i) % 3 !== 0
    R(x, INK, px - 12, py - 4, 24, 30); R(x, on ? ['#ff5c8a', GOLD, '#7fd0ff', '#9fe6b0'][i % 4] : '#4a3a6a', px - 8, py, 16, 22)
  }
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let i = 0; i <= 44; i++) { const px = 40 + i * 23, py = y - 30 + 26 * Math.sin((i / 44) * Math.PI); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
}
function guests(x, t, { look = 0, stare = false, cx = 540, dim = 1 } = {}) {
  x.save(); x.globalAlpha *= dim
  GUESTS.forEach(g => drawStarChar(x, g.x, g.y, 100, t, { color: g.color, mood: stare ? 'wide' : 'happy', look: stare ? [clamp((cx - g.x) / 300, -1, 1), 0.6] : undefined, seed: g.seed, glow: 0.4, tips: false }))
  x.restore()
  void look
}
function mug(x, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -30, -36, 60, 64, '#9fe6b0', { b: 6, hi: '#c9f2d4' }); box(x, 30, -20, 16, 30, '#9fe6b0', { b: 5 }); R(x, '#6b3a22', -24, -36, 48, 9)
  x.restore()
}
function lamp(x, t, cx, by) {
  R(x, INK, cx - 8, by - 520, 16, 520); R(x, '#5a5470', cx - 4, by - 516, 8, 512)
  box(x, cx - 40, by - 580, 80, 60, '#ffe27a', { b: 7 })
  glow(x, cx, by - 520, 300, 1, '255,226,122')
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#ffe27a'; x.beginPath(); x.moveTo(cx - 40, by - 520); x.lineTo(cx + 40, by - 520); x.lineTo(cx + 170, by); x.lineTo(cx - 170, by); x.fill(); x.restore()
}

const EP = makeMakeUp({
  id: 'nmue17', a: 'scorpio', b: 'libra',
  hook: '“Funny, you’re *never* | this fun at home.”', hookColor: '#ff5c8a',
  fight: {
    lines: [['a', "it's true though!"], ['b', '…wow. okay.'], ['a', "what? it's a JOKE."]],
    bubbleAt: [[290, 1000], [800, 940], [320, 900]],
    posA: { x: 285, y: 1210, s: 250 }, posB: { x: 800, y: 1210, s: 250 },
    moods: { a: t => t < 3.8 ? 'happy' : 'wide', b: 'wide' },
    noSquiggle: true, noSteam: true,
    draw(x, t) { lights(x, t); guests(x, t, { stare: t > 0.3, cx: 540 }) },
    front(x, t) {
      mug(x, 900, 1300)
      if (t < 1.6) label(x, 'SCRRATCH', 540, 700, { size: 50, col: '#ff5c8a', font: INTER, weight: 800, rot: -0.08, alpha: 1 - clamp(prog(t, 1.2, 1.6)) })
      if (t > 0.3) label(x, '(the party goes quiet)', 540, 1450, { size: 30, col: BONE, alpha: clamp(prog(t, 0.3, 0.6)) })
    },
    cues: [['whoosh', 0.0, 0.5, 0.05], ['tick', 0.3, 0.07], ['pluck', 0.35, 220, 0.04, 0.4, 0]],
  },
  under: {
    head: 'A jab in public | lands *twice.*', color: '#ff5c8a',
    draw(x, t, S) {
      const { u, drawB } = S
      R(x, 'rgba(6,4,22,0.4)', 0, 0, 1080, 1920)
      lights(x, t)
      guests(x, t, { stare: true, cx: 540, dim: 0.8 })
      // the unasked-for spotlight
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(0, 400, 0, 1350); g.addColorStop(0, 'rgba(255,236,180,0.04)'); g.addColorStop(1, 'rgba(255,236,180,0.3)')
      x.fillStyle = g; x.beginPath(); x.moveTo(500, 400); x.lineTo(580, 400); x.lineTo(760, 1350); x.lineTo(320, 1350); x.fill(); x.restore()
      drawB(x, t, { x: 540, y: 1180, s: 260, mood: u < 2.5 ? 'wide' : 'squint', look: [0, 0.4], blush: clamp(prog(u, 0.5, 2.5)), hops: [S.t0 + 0.3] })
      mug(x, 680, 1270)
      // the HOT FACE meter
      const mk = pop01(t, S.t0 + 1.0, 0.3, 2)
      if (mk > 0.01) {
        x.save(); x.translate(540, 1460); x.scale(mk, mk)
        box(x, -260, -30, 520, 60, '#2a1f55', { b: 6 })
        R(x, '#ff5c8a', -250, -20, 500 * clamp(prog(u, 1.2, 3.4)), 40)
        ink(x, 'HOT FACE', 0, 2, { size: 30, font: MONO, weight: 700, col: BONE })
        x.restore()
      }
      if (u > 3.6) label(x, 'everyone heard it.', 540, 1000, { size: 36, col: BONE, alpha: clamp(prog(u, 3.6, 3.9)) })
    },
    cues: [['riser', 1.2, 3.4, 0.025], ['pluck', 3.6, 440, 0.035, 0.6, 0]],
  },
  talk: {
    head: 'Take it | *home.*', color: '#ffe27a',
    stars: 'a hurt said in public lands twice as hard. *take it home.*',
    script: 'That *stung.* Talk later, *just us?*',
    reply: ['a', "yes. that was unfair. *I'm sorry.*"],
  },
  made: {
    posA: { x: 430, y: 1120, s: 240 }, posB: { x: 650, y: 1120, s: 240 },
    draw(x, t, S) {
      x.save(); x.globalAlpha = S.ok
      R(x, '#e9f2ff', 0, 1270, 1080, 30); R(x, 'rgba(233,242,255,0.25)', 0, 1300, 1080, 300)
      lamp(x, t, 150, 1290); lamp(x, t, 930, 1290)
      for (let i = 0; i < 24; i++) R(x, '#ffffff', (i * 89) % 1080, 500 + ((t * 60 + i * 71) % 800), 7, 7)
      x.restore()
    },
    front(x, t, S) {
      if (t > S.t0 + 1.0) label(x, 'ha!', 720, 900, { size: 44, col: GOLD, font: INTER, weight: 800, rot: 0.1, alpha: S.ok * clamp(prog(t, S.t0 + 1.0, S.t0 + 1.2)) })
      for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.35)', 330 + i * 70 - ((t * 60) % 70), 1286, 20, 8)
    },
    cues: [['pop', 1.0, 1174.66, 0.04, 0.3], ['pop', 1.1, 1318.51, 0.035, 0.3]],
  },
  last: 'Some talks | *wait for home*.', lastColor: '#ffe27a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, lerp, ease, easeOutBack, PINK]
