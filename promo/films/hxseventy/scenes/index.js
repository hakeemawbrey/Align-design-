// hxseventy (30 s vertical, Star Talk Shows · TWO STARS DISAGREE, Houston edition) "Is 70° jacket weather?" · lofi Eb.
// The set lives in ./debate.js (a local copy of sxdebatetext's, no numbers of episodes on screen, frame 0 is the
// thumbnail). Two city stars at the podiums (sthot.js cityStar). Story 0–25.6, then the end card (default CTA).
//   hook   "Is 70° | *jacket* weather?"  ★ HOUSTON (YES, JACKET) vs ★ CHICAGO (LOL, NO; in shades). GONG.
//   v1     HOUSTON: "70 degrees? *scarf* weather." (a striped scarf winds on) · CHICAGO: "70 is *beach* weather." (a beach
//          umbrella pops open over its podium)
//   v2     "It's getting | *chilly?*"  HOUSTON: "i felt a *breeze.* once." (a puffer jacket drops in, one wind line) ·
//          CHICAGO: "back home, 70 is *july.*" (a calendar page: JULY, a pixel sun)
//   v3     card cut → "Final | *round.*"  HOUSTON: "sun's down on the *bayou* now…" (a gust crosses the stage; Chicago
//          shivers, "brrr") · CHICAGO: "…is that jacket *for sharing?*" (Houston holds out a second one: I BROUGHT TWO).
//          Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. pack *extra.*"
//   end    the second jacket lands on Chicago's shoulders; they bump, a heart. "Bring the jacket. | *Lend* it."
//   rewatch Pisces wears a tiny scarf in the crowd all film (it was always on Houston's side).
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, BONE } from './debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'Eb'
const JACKET = ['..CCC.CCC..', '.CCCCzCCCC.', 'CCpppzpppCC', 'CC.CCzCC.CC', 'CC.pppzp.CC', 'CC.CCzCC.CC', 'cc.pppzp.cc', '...CCzCC...', '...ccccc...']
const UMBRELLA = ['....RRR....', '..RRWWWRR..', '.RRWWRWWRR.', 'RRWWRRRWWRR', 'K.K.K.K.K.K', '.....P.....', '.....P.....', '.....P.....', '.....P.....', '....PP.....']
const SUN = ['..y.y..', 'y.YYY.y', '.YYYYY.', 'yYYYYYy', '.YYYYY.', 'y.YYY.y', '..y.y..']
const JK = { C: '#4f7bd8', c: '#2f4f9a', p: '#7aa0f0', z: '#d8e2f4' }

// a striped knit scarf across a star's chin (r = drawStarChar's result), with a tail
function scarf(H, r, k, cell) {
  if (!r || !r.size || k <= 0.01) return
  const { px } = H
  const w = r.size * 0.62 * k, y = r.y + r.size * 0.16, c = cell
  const cols = ['#ff5d6a', '#efe6d6']
  px(r.x - w / 2 - c / 2, y - c / 2, w + c, 2 * c + c, INK)
  for (let i = 0; i < w; i += c) px(r.x - w / 2 + i, y, c, 2 * c, cols[Math.floor(i / c) % 2])
  const tl = 3 * k
  for (let j = 0; j < tl; j++) { px(r.x + w * 0.18 - c / 2, y + 2 * c + j * c - c / 2, 2 * c, c + c / 2, INK); px(r.x + w * 0.18, y + 2 * c + j * c, c, c, cols[j % 2]) }
}

const cfg = {
  id: 'hxseventy', key: KEY, accent: '#7aa0f0',
  signs: [{ city: 'HOU', name: 'HOUSTON', stance: 'YES, JACKET', prop: false }, { city: 'CHI', name: 'CHICAGO', stance: 'LOL, NO', prop: 'shades' }],
  heads: {
    hook: 'Is 70° | *jacket* weather?',
    r2: 'It’s getting | *chilly?*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Bring the jacket. | *Lend* it.',
  },
  lines: [
    { who: 0, text: '70 degrees? *scarf* weather.', moods: ['squint', 'happy'] },
    { who: 1, text: '70 is *beach* weather.', moods: ['happy', 'wide'] },
    { who: 0, text: 'i felt a *breeze.* once.', moods: ['wide', 'eyeroll'] },
    { who: 1, text: 'back home, 70 is *july.*', moods: ['happy', 'wide'] },
    { who: 0, text: 'sun’s down on the *bayou* now…', moods: ['squint', 'wide'] },
    { who: 1, text: '…is that jacket *for sharing?*', moods: ['wide', 'sparkle'] },
  ],
  star: 'you’re *both* right. pack *extra.*',
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    const hou = H.pos[0], chi = H.pos[1]
    // Houston's scarf, from its first line to the end
    scarf(H, hou, ease.outCubic(prog(t, L[0].t + 0.3, L[0].t + 0.9)) * ok, 9)
    // v1: Chicago's beach umbrella pops open over its podium
    const ku = until(1, L[3].t)
    if (ku > 0.01) bits(UMBRELLA, { R: '#ff6a6a', W: '#fff4e0', K: INK, P: '#c9c2e6' }, 980, 860, 13, { sx: ku, sy: Math.min(1, ku * 1.2) })
    // v2: the puffer jacket drops in next to Houston, one tiny wind line
    const kj = until(2, T.stars - 0.2)
    if (kj > 0.01) {
      const drop = ease.outBounce ? ease.outBounce(prog(t, L[2].t, L[2].t + 0.6)) : ease.outCubic(prog(t, L[2].t, L[2].t + 0.6))
      bits(JACKET, JK, 104, lerp(760, 940, drop), 12, { alpha: kj })
      const w = (t - L[2].t - 0.6) % 2.2
      if (w > 0 && w < 0.8) { const p = w / 0.8; px(60 + p * 300, 840, 46, 5, `rgba(239,230,214,${0.7 * (1 - p) * kj})`); px(90 + p * 300, 856, 30, 5, `rgba(239,230,214,${0.5 * (1 - p) * kj})`) }
    }
    // v2: Chicago's calendar page — JULY, with a sun
    const kc = until(3, L[4].t + 0.4)
    if (kc > 0.01) {
      const flip = ease.outBack(prog(t, L[3].t + 0.15, L[3].t + 0.55))
      x.save(); x.translate(976, 900); x.scale(kc, kc * flip)
      px(-74, -84, 148, 168, INK); px(-68, -78, 136, 156, '#fbf6ea'); px(-68, -78, 136, 36, '#ff5d6a')
      px(-50, -92, 10, 22, INK); px(40, -92, 10, 22, INK)
      x.restore()
      if (flip > 0.5) {
        txt('JULY', 976, 900 - 60 * kc, { size: 24, color: '#fbf6ea', shadow: false, alpha: kc })
        bits(SUN, { Y: '#f7c948', y: '#ff9a3a' }, 976, 916, 10, { alpha: kc, outline: null })
      }
    }
    // v3: the gust across the stage (Chicago shivers, brrr)
    const kg = until(4, T.stars)
    if (kg > 0.01) {
      for (let n = 0; n < 6; n++) {
        const p = ((t - L[4].t) * 0.9 + n / 6) % 1
        px(lerp(80, 1000, p), 760 + n * 44 + 10 * Math.sin(t * 4 + n), 70 - n * 6, 6, `rgba(220,236,255,${0.55 * Math.sin(Math.PI * p) * kg})`)
      }
      if (chi && t > L[4].t + 0.8) txt('brrr', chi.x + 40, chi.top - 30, { size: 28, color: '#bfe6ff', alpha: kg })
    }
    // v3 → end: the second jacket. Houston holds it out; after the bump it's on Chicago's shoulders
    const ks = pop01(t, L[5].t + 0.6, 0.3, 2.2) * ok
    if (ks > 0.01 && hou && chi) {
      const on = ease.inOutCubic(prog(t, T.bump - 0.35, T.bump + 0.1))
      const jx = lerp(hou.x + hou.size * 0.55, chi.x, on), jy = lerp(hou.y + 30, chi.y + chi.size * 0.36, on) - Math.sin(Math.PI * on) * 160
      bits(JACKET, JK, jx, jy, lerp(11, 12, on), { sx: ks, sy: ks, rot: (1 - on) * -0.2 })
      if (on < 0.05 && t < T.stars + 0.6) {
        x.save(); x.globalAlpha = ks
        px(hou.x - 113, hou.top - 66, 226, 44, INK); px(hou.x - 109, hou.top - 62, 218, 36, GOLD)
        x.restore()
        txt('I BROUGHT TWO', hou.x, hou.top - 43, { size: 20, color: INK, shadow: false, alpha: ks })
      }
      if (on > 0.95) drawPixelStar(x, chi.x + 60, chi.y - 20, 20 + 4 * Math.sin(t * 8), 1, '#ffffff', '#bfe6ff')
    }
  },
  jitter(i, t, T, L) {
    // Chicago shivers from the sunset line until the jacket lands on it
    if (i !== 1 || t < L[4].t + 0.6 || t > T.bump + 0.1) return 0
    const k = t < T.stars ? 1 : t < T.turn ? 0.5 : 0.8
    return k * 5 * Math.sign(Math.sin(t * 60))
  },
  // rewatch bait: Pisces wears a tiny scarf in the crowd, all film (Team Houston)
  front(x, t, H) { scarf(H, { x: 652, y: 1402, size: 100 }, H.ok, 6) },
  sobAt: [],
}
// Pisces sobs hardest at "is that jacket for sharing?" (it is)
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ['whoosh', L[0].t + 0.3, 0.5, 0.02], ['pluck', L[0].t + 0.9, 1244.51, 0.03, 0.5, -0.3],
    ['pop', L[1].t + 0.05, 932.33, 0.04, 0.3], ['pop', L[1].t + 0.15, 1244.51, 0.035, 0.3],
    ['whoosh', L[2].t, 0.4, 0.03], ['tom', L[2].t + 0.6, 100, { gain: 0.14 }], ['whoosh', L[2].t + 0.7, 0.6, 0.015],
    ['tick', L[3].t + 0.15, 0.04], ['bell', L[3].t + 0.5, 1567.98, 0.02, 1.0, 0.3],
    ['whoosh', L[4].t + 0.1, 1.2, 0.035], ['whoosh', L[4].t + 1.2, 1.0, 0.025],
    ['pop', L[5].t + 0.65, 1396.91, 0.045, -0.2], ['glitter', L[5].t + 0.65, L[5].t + 1.1],
    ['whoosh', T.bump - 0.35, 0.45, 0.025], ['pop', T.bump + 0.1, 1567.98, 0.035, 0.3],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
