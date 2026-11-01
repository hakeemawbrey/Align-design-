// hxboothbar (30 s vertical, Star Talk Shows · TWO STARS DISAGREE, Houston edition) "Booth or bar seats?" · pop D.
// The set lives in ./debate.js (a local copy of sxdebatetext's, no numbers of episodes on screen, frame 0 is the
// thumbnail). Story 0–25.6, then the end card (default CTA).
//   hook   "Booth or | bar *seats?*"  ♎ LIBRA (BOOTH) vs ♊ GEMINI (BAR SEATS). GONG.
//   v1     LIBRA: "booth. face to face. *eyes.*" (a tufted red booth, two pixel eyes on a sign) · GEMINI: "bar seats.
//          *side* by side." (two bar stools rise in front of its podium, spinning)
//   v2     "Getting | *cozy.*"  LIBRA: "a booth is a tiny *living room.*" (a lamp and a framed picture appear) · GEMINI:
//          "at the bar i see the *kitchen!*" (a pan flares, an ORDER UP ticket)
//   v3     card cut → "Final | *round.*"  LIBRA: "…i *do* talk more on walks." (footprints, WALKS ✓: side by side!) ·
//          GEMINI: "and i *listen* better facing you." (its stool spins around to face Libra). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. know your *seat.*"
//   end    they bump, a heart. "Sit where you | *talk* best."  + "Which side are *you* on?"
//   rewatch Pisces sits on its own tiny bar stool in the crowd all film (it spins once at the bump).
import { prog, ease, lerp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, POS } from './debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'D'
const BOOTH = ['RRRRRRR...', 'RrRrRrR...', 'RRRRRRR...', 'RrRrRrR...', 'RRRRRRR...', 'RrRrRrR...', 'RRRRRRRRRR', 'RRRRRRRRRR', 'WWWWWWWWWW', 'W.......W.', 'W.......W.']
const STOOL = ['.SSSSS.', 'SSSSSSS', '.KKKKK.', '...M...', '...M...', '..MMM..', '...M...', '.MMMMM.', 'M.....M']
const LAMP = ['.YYYYY.', 'YYYYYYY', 'YYYYYYY', '...B...', '...B...', '...B...', '.BBBBB.']
const PAN = ['......HHH', 'PPPPPPHH.', 'PPPPPP...', '.PPPP....']
const FLAME = ['..f..', '.fFf.', '.fFf.', 'fFYFf', 'fFYFf', '.fff.']
const FOOT = ['.ff', 'fff', 'fff', 'ff.', '.f.']

const cfg = {
  id: 'hxboothbar', key: KEY, accent: '#ff8fb1',
  signs: [{ id: 'libra', name: 'LIBRA', stance: 'BOOTH' }, { id: 'gemini', name: 'GEMINI', stance: 'BAR SEATS' }],
  heads: {
    hook: 'Booth or | bar *seats?*',
    r2: 'Getting | *cozy.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Sit where you | *talk* best.',
  },
  lines: [
    { who: 0, text: 'booth. face to face. *eyes.*', moods: ['heart', 'squint'] },
    { who: 1, text: 'bar seats. *side* by side.', moods: ['happy', 'wide'] },
    { who: 0, text: 'a booth is a tiny *living room.*', moods: ['sparkle', 'eyeroll'] },
    { who: 1, text: 'at the bar i see the *kitchen!*', moods: ['wide', 'wide'] },
    { who: 0, text: '…i *do* talk more on walks.', moods: ['wide', 'happy'] },
    { who: 1, text: 'and i *listen* better facing you.', moods: ['happy', 'sparkle'] },
  ],
  star: 'you’re *both* right. know your *seat.*',
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    // v1 → v2: Libra's tufted booth (and in v2, the lamp + the framed picture: a tiny living room)
    const kb = until(0, L[4].t)
    if (kb > 0.01) {
      bits(BOOTH, { R: '#c8324a', r: '#ff6a7a', W: '#6b4a2a' }, 100, 990, 10, { sx: kb, sy: kb })
      if (t < L[2].t) {
        const ke = pop01(t, L[0].t + 0.7, 0.3, 2.4) * kb
        if (ke > 0.01) { bits(['WW.WW', 'WK.WK'], { W: '#ffffff', K: INK }, 100, 860, 9, { sx: ke, sy: ke }) }
      }
      const kl = pop01(t, L[2].t + 0.2, 0.35, 2.2) * kb
      if (kl > 0.01) {
        bits(LAMP, { Y: '#ffe7a6', B: '#8a5f33' }, 150, 850, 8, { sx: kl, sy: kl })
        x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.18 * kl; x.fillStyle = '#ffe7a6'; x.beginPath(); x.arc(150, 850, 90, 0, Math.PI * 2); x.fill(); x.restore()
        x.save(); x.translate(84, 786); x.rotate(-0.06); x.scale(kl, kl)
        px(-34, -28, 68, 56, '#c08a4f'); px(-26, -20, 52, 40, '#7fb0e0'); px(-26, 4, 52, 16, '#4f9a3a')
        x.restore()
        drawPixelStar(x, 88, 774, 14, 1, '#ffffff', GOLD)
      }
    }
    // v1 → end: Gemini's bar stools (two, then one, which spins to face Libra in v3)
    const ks = until(1, T.stars + 0.2)
    if (ks > 0.01) {
      const spin = t < L[5].t ? Math.cos((t - L[1].t) * 4) : Math.cos(Math.PI * ease.inOutCubic(prog(t, L[5].t + 0.2, L[5].t + 0.8)))
      const rise = ease.outBack(prog(t, L[1].t, L[1].t + 0.45))
      bits(STOOL, { S: '#c8324a', K: INK, M: '#9aa3b0' }, POS[1].x + 74, lerp(1330, 1188, rise), 13, { sx: ks * (0.5 + 0.5 * Math.abs(spin)), sy: ks })
      bits(STOOL, { S: '#c8324a', K: INK, M: '#9aa3b0' }, POS[1].x - 74, lerp(1330, 1188, rise), 13, { sx: ks * (0.5 + 0.5 * Math.abs(Math.cos((t - L[1].t) * 4 + 1))), sy: ks })
      if (t > L[5].t + 0.8 && t < T.stars) txt('↻ facing you', POS[1].x, 726, { size: 24, color: GOLD, alpha: ks })
    }
    // v2: the kitchen — a pan flares, ORDER UP
    const kk = until(3, L[4].t + 0.2)
    if (kk > 0.01) {
      bits(PAN, { P: '#3d3654', H: '#6b4a2a' }, 980, 900, 10, { sx: kk, sy: kk })
      const fl = ease.outBack(prog(t, L[3].t + 0.3, L[3].t + 0.6)) * (1 + 0.2 * Math.sin(t * 24))
      bits(FLAME, { f: '#ff5a2a', F: '#ffb340', Y: '#fff1a0' }, 966, 852 - 20 * fl, 9, { sx: kk, sy: kk * fl })
      const kt = pop01(t, L[3].t + 0.9, 0.3, 2.4) * kk
      if (kt > 0.01) {
        x.save(); x.translate(970, 770); x.rotate(0.08); x.scale(kt, kt)
        px(-66, -22, 132, 44, INK); px(-62, -18, 124, 36, '#fbf6ea')
        x.restore()
        txt('ORDER UP!', 970, 770, { size: 18, color: INK, shadow: false, alpha: kt })
      }
    }
    // v3: Libra's walks — footprints side by side, WALKS ✓
    const kw = until(4, T.stars)
    if (kw > 0.01) {
      for (let n = 0; n < 4; n++) {
        const kn = pop01(t, L[4].t + 0.3 + n * 0.22, 0.25, 2.4) * kw
        bits(FOOT, { f: '#efe6d6' }, 128 + n * 66, 1214 - n * 12, 9, { sx: kn, sy: kn, alpha: 0.95 })
        bits(FOOT, { f: '#ff8fb1' }, 152 + n * 66, 1238 - n * 12, 9, { sx: kn, sy: kn, alpha: 0.95 })
      }
      if (t > L[4].t + 1.3) txt('WALKS ✓', POS[0].x, 726, { size: 26, color: '#7dffb0', alpha: kw })
    }
  },
  // rewatch bait: Pisces sits on its own tiny bar stool in the crowd (it spins once at the bump)
  front(x, t, H) {
    const sp = Math.cos(Math.PI * 2 * ease.inOutCubic(prog(t, H.T.bump, H.T.bump + 0.6)))
    H.bits(STOOL, { S: '#c8324a', K: INK, M: '#9aa3b0' }, 652, 1474, 4, { sx: 0.5 + 0.5 * Math.abs(sp), alpha: H.ok })
  },
  sobAt: [],
}
// Pisces sobs hardest at "i listen better facing you"
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ['pop', L[0].t + 0.05, 587.33, 0.04, -0.3], ['pop', L[0].t + 0.75, 1174.66, 0.035, -0.3],
    ['whoosh', L[1].t + 0.05, 0.4, 0.03], ['tick', L[1].t + 0.3, 0.04], ['tick', L[1].t + 0.45, 0.035],
    ['pop', L[2].t + 0.25, 880, 0.035, -0.3], ['glitter', L[2].t + 0.3, L[2].t + 0.7],
    ['whoosh', L[3].t + 0.3, 0.5, 0.04], ['snare', L[3].t + 0.35, { gain: 0.05, decay: 0.25, tone: 160 }], ['bell', L[3].t + 0.95, 1760, 0.025, 0.8, 0.3],
    ...[0, 1, 2, 3].map(n => ['tick', +(L[4].t + 0.3 + n * 0.22).toFixed(3), 0.03]),
    ['whoosh', L[5].t + 0.2, 0.6, 0.025], ['pluck', L[5].t + 0.8, 1174.66, 0.03, 0.5, 0.3],
    ['whoosh', T.bump, 0.6, 0.015],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
