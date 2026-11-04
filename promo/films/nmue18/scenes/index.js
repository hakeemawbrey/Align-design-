// nmue18: THE MAKE-UP TALK, "Your partner, not a jury" (28 s vertical, promo/films/next30/b32.md, music: synthwave · F#m).
// ♊ Gemini × ♒ Aquarius. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“Let’s ask the | *group chat.*”" Gemini mid-hop, phone up, screenshotting the fight (a white SNAP
//             flash); Aquarius gasps: "you're being unreasonable." / "no, YOU are!" / "fine. the GROUP decides."
//   6.6–12.8  UNDER IT   "Now *eleven* people | are in your fight." A jury box of pixel friends raises paddles, the verdict
//             comes back SPLIT, and the jurors start bickering with each other.
//   12.8–21.6 THE TALK   "Support, | not a *vote.*" TRY SAYING "Let's sort this out, just you and me."
//             Aquarius: "deal. and delete that poll."
//   21.6–25.5 MADE UP    the jury waves and files out, the phone goes face down, the two of them talk.
//             "Two people, | *not a jury*."
import { makeMakeUp, R, box, ink, label, phone, sparkles, drawStarChar, signStar, bubble, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const GEM = signStar('gemini'), AQU = signStar('aquarius')
const JURY = ['aries', 'taurus', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aries', 'leo'].map((id, i) => ({ ...signStar(id), col: i % 6, row: Math.floor(i / 6), seed: 21 + i, vote: i % 2 }))
function juryBox(x, t, u, { leave = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  // the stars sit on two benches
  JURY.forEach((j, i) => {
    const jx = 150 + j.col * 156 + (j.row ? 78 : 0), jy = 760 + j.row * 190
    const lx = jx + leave * (1300 - jx + i * 40)
    const pk = pop01(t, (u.t0 || 0) + 0.15 + i * 0.07, 0.3, 2)
    drawStarChar(x, lx, jy, 120, t, { color: j.color, mood: u.mood ? u.mood(i) : 'neutral', look: u.look || undefined, seed: j.seed, glow: 0.4, tips: false, pop: pk, hops: u.hops ? u.hops(i) : null })
    const pv = u.paddles ? clamp(prog(u.u, 1.4 + i * 0.05, 1.6 + i * 0.05)) : 0
    if (pv > 0 && leave === 0) {
      const px = j.row ? lx + 62 : lx, py = (j.row ? jy - 40 : jy - 120) - 30 * pv
      R(x, INK, px - 4, py, 8, 70); box(x, px - 34, py - 50, 68, 50, j.vote ? GEM.color : AQU.color, { b: 5 })
      ink(x, j.vote ? GEM.glyph : AQU.glyph, px, py - 24, { size: 32, col: INK })
    }
  })
  x.restore()
  // the box front panels
  x.save(); x.globalAlpha *= k * (1 - leave)
  box(x, 60, 820, 960, 70, '#8a5a3a', { b: 8, hi: '#a87048' })
  box(x, 60, 1010, 960, 70, '#8a5a3a', { b: 8, hi: '#a87048' })
  ink(x, 'THE GROUP', 540, 1046, { size: 36, font: MONO, weight: 700, col: BONE })
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue18', a: 'gemini', b: 'aquarius',
  hook: '“Let’s ask the | *group chat.*”', hookColor: '#7fd0ff',
  fight: {
    lines: [['b', "you're being unreasonable."], ['a', 'no, YOU are!'], ['a', 'fine. the GROUP decides.']],
    bubbleAt: [[760, 870], [300, 760], [330, 640]],
    moods: { a: 'squint', b: t => t > 3.9 ? 'wide' : 'squint' },
    front(x, t) {
      const up = ease.outBack(prog(t, 3.6, 4.0))
      if (up > 0) {
        phone(x, 470, 1060 - 60 * up, { w: 130, h: 220, rot: -0.15 }, (c, w) => { ink(c, 'SNAP', 0, 0, { size: 26, font: MONO, weight: 700, col: '#7fd0ff' }) })
        const fl = t > 4.1 && t < 4.3 ? 1 - (t - 4.1) / 0.2 : 0
        if (fl > 0) { x.save(); x.globalAlpha = 0.7 * fl; R(x, '#ffffff', 0, 0, 1080, 1920); x.restore() }
        label(x, 'posted to: the group', 470, 1330, { size: 28, col: '#7fd0ff', alpha: clamp(prog(t, 4.3, 4.6)) })
      }
    },
    cues: [['whoosh', 3.6, 0.3, 0.03], ['tick', 4.1, 0.09], ['pop', 4.12, 2093, 0.03, 0], ['pop', 4.4, 1318.51, 0.035, -0.2]],
  },
  under: {
    head: 'Now *eleven* people | are in your fight.', color: '#7fd0ff',
    draw(x, t, S) {
      const { u } = S
      juryBox(x, t, { u, t0: S.t0, paddles: true, mood: i => u > 3.0 ? (i % 3 ? 'squint' : 'wide') : 'neutral', hops: i => u > 3.0 ? [S.t0 + 3.0 + (i % 4) * 0.2, S.t0 + 3.8 + (i % 3) * 0.2] : null })
      const vk = easeOutBack(prog(u, 2.3, 2.6), 2.4)
      if (vk > 0.01) {
        x.save(); x.translate(540, 1200); x.rotate(-0.05); x.scale(vk, vk)
        box(x, -280, -50, 560, 100, '#ff5c6b', { b: 8 })
        ink(x, 'VERDICT: SPLIT', 0, 4, { size: 50, font: MONO, weight: 700, col: BONE })
        x.restore()
      }
      // now the jury bickers too
      ;[["no, Aquarius is right!", 300, 600], ["Gemini, obviously!", 780, 640], ['wait, who started it?', 540, 1400]].forEach(([s, bx, by], i) =>
        bubble(x, t, bx, by, S.t0 + 3.0 + i * 0.5, S.t1, s, { size: 30, spiky: i !== 2, tail: 0 }))
      // the couple, tiny, at the front
      S.drawA(x, t, { x: 200, y: 1560, s: 140, mood: 'wide', look: [0, -1] })
      S.drawB(x, t, { x: 880, y: 1560, s: 140, mood: 'wide', look: [0, -1] })
    },
    pis: { x: 540, y: 1640, s: 110 },
    cues: [...Array.from({ length: 11 }, (_, i) => ['pop', +(0.15 + i * 0.07).toFixed(2), 587.33 * (1 + (i % 4) * 0.25), 0.02, (i / 5 - 1)]), ['tick', 1.5, 0.05], ['tick', 1.7, 0.05], ['tom', 2.3, 80, { gain: 0.3, decay: 0.3 }], ['pop', 3.0, 880, 0.035, -0.3], ['pop', 3.5, 659.25, 0.035, 0.3], ['pop', 4.0, 739.99, 0.035, 0]],
  },
  talk: {
    head: 'Support, | not a *vote.*', color: '#7fd0ff',
    stars: 'friends are for support, not a *vote* on your partner.',
    script: 'Let’s sort this out, *just you and me.*',
    reply: ['b', 'deal. *and delete that poll.*'],
  },
  made: {
    draw(x, t, S) {
      const leave = ease.inCubic(prog(t, S.t0 + 0.3, S.t0 + 1.5))
      if (leave < 1) juryBox(x, t, { u: S.u, t0: -9, mood: () => 'happy', hops: i => [S.t0 + 0.2 + (i % 4) * 0.1] }, { leave, k: S.ok * (1 - clamp(prog(leave, 0.8, 1))) })
      if (S.u < 1.4) label(x, 'bye! good luck!', 700, 680, { size: 34, col: GOLD, alpha: S.ok })
    },
    front(x, t, S) {
      // the phone, face down
      x.save(); x.translate(540, 1300); x.globalAlpha = S.ok; box(x, -110, -18, 220, 36, '#2a2148', { b: 6 }); x.restore()
      label(x, 'face down', 540, 1370, { size: 28, col: BONE, alpha: S.ok * clamp(prog(t, S.t0 + 1.3, S.t0 + 1.6)) })
      sparkles(x, t, 540, 1300, S.t0 + 1.3, 8, 140, 1, [MINT, BONE, GOLD])
    },
    cues: [['whoosh', 0.3, 1.2, 0.03], ['pop', 0.4, 1174.66, 0.03, 0.4], ['tick', 1.3, 0.06]],
  },
  last: 'Two people, | *not a jury*.', lastColor: '#7fd0ff',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, INTER]
