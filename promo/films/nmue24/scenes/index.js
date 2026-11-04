// nmue24: THE MAKE-UP TALK, "Thank them for staying" (28 s vertical, promo/films/next30/b32.md, music: pop · F). The finale.
// ♑ Capricorn × ♋ Cancer. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
// Chapter tabs: A TINY FIGHT · THE YEAR · THE TALK · MADE UP.
//   0–6.6     "“Our best fight | *this year?*”" The last night of the year, a snowy rooftop. Capricorn and Cancer mid-hop:
//             "our BEST fight? weird phrase." / "it IS a weird phrase!" / "…are we fighting about it?"
//   6.6–12.8  UNDER IT   "What we did *right* | this year:" three pixel postcards: the pause we kept (20:00), the sorry that
//             changed something (a plan), the laugh after (ha!). Callbacks to the season.
//   12.8–21.6 THE TALK   "Say what they | did *right.*" TRY SAYING "Thank you for staying kind when we fought."
//             Cancer: "thank you for always coming back."
//   21.6–25.5 MADE UP    the clock hits 12:00, the sky twinkles, they hold on. "Say *thank you* | for the hard talks."
import { makeMakeUp, R, box, ink, label, glow, sparkles, drawBits, HEART, drawPixelStar, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

function rooftop(x, t, a = 1) {
  x.save(); x.globalAlpha *= a
  R(x, INK, 0, 1290, 1080, 12); R(x, '#4a3a78', 0, 1300, 1080, 640); R(x, '#e9f2ff', 0, 1290, 1080, 18)
  for (let i = 0; i < 6; i++) box(x, 60 + i * 180, 1360, 120, 70, '#3a2d66', { b: 5 })
  box(x, 860, 1120, 90, 170, '#7a4a3a', { b: 7 }); R(x, '#e9f2ff', 852, 1112, 106, 14)
  for (let i = 0; i < 26; i++) R(x, '#ffffff', (i * 83) % 1080, 300 + ((t * 55 + i * 67) % 1000), 7, 7)
  x.restore()
}
function postcard(x, t, cx, cy, k, rot, title, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -170, -110, 360, 240)
  box(x, -180, -120, 360, 240, '#fff8e6', { b: 7 })
  R(x, '#2a1f55', -160, -100, 320, 140)
  draw(x, t)
  ink(x, title, 0, 82, { size: 28, font: MONO, weight: 700, col: INK })
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue24', a: 'capricorn', b: 'cancer',
  chapters: ['A TINY FIGHT', 'THE YEAR', 'THE TALK', 'MADE UP'],
  hook: '“Our best fight | *this year?*”', hookColor: '#f2c75c',
  fight: {
    lines: [['b', 'our BEST fight? weird phrase.'], ['a', 'it IS a weird phrase!'], ['b', '…are we fighting about it?']],
    bubbleAt: [[720, 860], [320, 760], [700, 640]],
    moods: { a: t => t < 4 ? 'squint' : 'happy', b: t => t < 4 ? 'neutral' : 'happy' },
    noSteam: true,
    draw(x, t) { rooftop(x, t) },
    front(x, t) { if (t > 4.6) label(x, 'ha.', 540, 1000, { size: 44, col: GOLD, font: INTER, weight: 800, alpha: clamp(prog(t, 4.6, 4.8)) }) },
    cues: [['pop', 4.6, 1174.66, 0.035, 0]],
  },
  under: {
    head: 'What we did *right* | this year:', color: '#f2c75c',
    draw(x, t, S) {
      const { u } = S
      rooftop(x, t, 0.5)
      postcard(x, t, 330, 620, pop01(t, S.t0 + 0.3, 0.35, 2.2), -0.07, 'the pause we kept', (c) => { ink(c, '20:00', 0, -30, { size: 70, font: MONO, weight: 700, col: MINT }) })
      postcard(x, t, 750, 900, pop01(t, S.t0 + 1.5, 0.35, 2.2), 0.06, 'a sorry that stuck', (c) => {
        box(c, -120, -80, 110, 100, '#ffe27a', { b: 4 }); ink(c, 'sorry', -65, -30, { size: 24, col: '#7a2b2b' })
        ink(c, '→', 0, -30, { size: 40, col: BONE }); box(c, 20, -80, 110, 100, MINT, { b: 4 }); ink(c, 'plan', 75, -30, { size: 24, col: INK })
      })
      postcard(x, t, 360, 1180, pop01(t, S.t0 + 2.7, 0.35, 2.2), -0.04, 'the laugh after', (c) => { ink(c, 'ha! ha!', 0, -30, { size: 60, col: GOLD }) })
      if (u > 4.0) label(x, 'not perfect. kind.', 680, 1360, { size: 38, col: '#ffb39a', font: INTER, weight: 800, alpha: clamp(prog(u, 4.0, 4.3)) })
    },
    pis: { x: 940, y: 1660, s: 120 },
    cues: [['whoosh', 0.3, 0.3, 0.03], ['pop', 0.4, 880, 0.04, -0.3], ['whoosh', 1.5, 0.3, 0.03], ['pop', 1.6, 987.77, 0.04, 0.3], ['whoosh', 2.7, 0.3, 0.03], ['pop', 2.8, 1174.66, 0.04, -0.3], ['pluck', 4.0, 1318.51, 0.035, 0.8, 0.3]],
  },
  talk: {
    head: 'Say what they | did *right.*', color: '#f2c75c',
    stars: 'tell them what they did right when it was *hard.*',
    script: 'Thank you for staying *kind* when we fought.',
    reply: ['b', 'thank you for *always coming back.*'],
  },
  made: {
    draw(x, t, S) {
      rooftop(x, t, S.ok)
      // the clock ticks over
      const k = pop01(t, S.t0 + 0.1, 0.3, 2.2) * S.ok
      if (k > 0.01) {
        const hit = t > S.t0 + 1.2
        x.save(); x.translate(540, 650); x.scale(k, k)
        box(x, -160, -60, 320, 120, hit ? GOLD : '#1b1530', { b: 7 })
        ink(x, hit ? '12:00' : '11:59', 0, 4, { size: 76, font: MONO, weight: 700, col: hit ? INK : BONE })
        x.restore()
      }
      // the sky twinkles (no bangs): a slow wave of pixel stars
      if (t > S.t0 + 1.2) for (let i = 0; i < 16; i++) {
        const tw = 0.5 + 0.5 * Math.sin(t * 4 + i * 1.7)
        drawPixelStar(x, 80 + (i * 137) % 920, 500 + (i * 71) % 300, 22 + 10 * tw, i % 2 ? 1 : 2, [GOLD, BONE, PINK, MINT][i % 4])
      }
    },
    front(x, t, S) {
      sparkles(x, t, 540, 650, S.t0 + 1.2, 12, 230, 1, [GOLD, BONE, PINK])
      if (t > S.t0 + 1.4) drawBits(x, HEART, { H: '#ff5c8a' }, 540, 1240, 9 * S.ok * (1 + 0.08 * Math.sin(t * 6)))
    },
    cues: [['tick', 0.3, 0.05], ['tick', 0.7, 0.05], ['tick', 1.1, 0.05], ['bell', 1.2, 1760, 0.045, 1.5, 0], ['bell', 1.3, 2349.32, 0.03, 1.5, 0], ['glitter', 1.2, 1.9]],
  },
  last: 'Say *thank you* | for the hard talks.', lastColor: '#f2c75c',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, lerp, ease, easeOutBack]
