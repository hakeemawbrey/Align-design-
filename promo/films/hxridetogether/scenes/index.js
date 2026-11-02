// hxridetogether (30 s vertical, Star Talk Shows · TWO STARS DISAGREE, Houston edition) "Ride together, or meet there?"
// · synthwave Am. The set lives in ./debate.js (a local copy of sxdebatetext's, no numbers of episodes on screen, frame 0
// is the thumbnail). Story 0–25.6, then the end card (default CTA).
//   hook   "Ride together, | or meet *there?*"  ♋ CANCER (RIDE TOGETHER, moonlit pink so it reads apart from Aquarius) vs ♒ AQUARIUS (MEET THERE). GONG.
//   v1     CANCER: "i'll pick you up. *snacks!*" (a cozy pixel car rolls up in front of its podium, a snack bag beside it) ·
//          AQUARIUS: "meet there. *my* own exit." (a map pin drops: MEET HERE, an EXIT sign)
//   v2     "Shifting | *gears.*"  CANCER: "but the *car talk!* the songs!" (notes float out of the car) · AQUARIUS:
//          "date one? *my own* wheels." (a key ring, jingling)
//   v3     card cut → "Final | *round.*"  CANCER: "…okay. text me when you *park?*" · AQUARIUS: "deal. next time, *you*
//          drive." (its phone: "parked ✓" "see u ★"). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. comfort *varies.*"
//   end    they bump, a heart; the keys hop over to Cancer's side. "Ask what | feels *safe.*"
//   rewatch Pisces wears a little seatbelt sash in the crowd all film (buckled up, crying anyway).
import { prog, ease, lerp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, POS } from './debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'Am'
const CAR = ['.....KKKKKKKKK......', '....KwwwwKwwwwwK....', '...KwwwwwKwwwwwwK...', '.KKCCCCCCCCCCCCCCKK.', 'KCCCCCCCCCCCCCCCCCCK', 'KyCCCCCCCCCCCCCCCCrK', 'KCCCCCCCCCCCCCCCCCCK', '.KKggKKKKKKKKKKggKK.', '..gGGg........gGGg..', '...gg..........gg...']
const PIN = ['..PPPP..', '.PPPPPP.', 'PPPWWPPP', 'PPWWWWPP', 'PPPWWPPP', '.PPPPPP.', '..PPPP..', '...PP...', '...PP...', '....P...']
const KEYS = ['.OOOO.......', 'O....O......', 'O....OYYYYYY', 'O....O..Y.YY', '.OOOO.......']
const NOTE = ['..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const BAG = ['.bbbb.', 'bBBBBb', 'bBRRBb', 'bBRRBb', 'bBBBBb']

const cfg = {
  id: 'hxridetogether', key: KEY, accent: '#7dffb0',
  signs: [{ id: 'cancer', name: 'CANCER', stance: 'RIDE TOGETHER', color: '#ffa8cc' }, { id: 'aquarius', name: 'AQUARIUS', stance: 'MEET THERE' }],
  heads: {
    hook: 'Ride together, | or meet *there?*',
    r2: 'Shifting | *gears.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Ask what | feels *safe.*',
  },
  lines: [
    { who: 0, text: 'i’ll pick you up. *snacks!*', moods: ['happy', 'squint'] },
    { who: 1, text: 'meet there. *my* own exit.', moods: ['squint', 'wide'] },
    { who: 0, text: 'but the *car talk!* the songs!', moods: ['sparkle', 'eyeroll'] },
    { who: 1, text: 'date one? *my own* wheels.', moods: ['happy', 'wide'] },
    { who: 0, text: '…okay. text me when you *park?*', moods: ['neutral', 'happy'] },
    { who: 1, text: 'deal. next time, *you* drive.', moods: ['happy', 'sparkle'] },
  ],
  star: 'you’re *both* right. comfort *varies.*',
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, phone, bubble, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    // v1 + v2: Cancer's cozy car rolls up in front of its podium (snacks on the roof, then the songs)
    const kc = until(0, L[4].t)
    if (kc > 0.01) {
      const roll = ease.outCubic(prog(t, L[0].t, L[0].t + 0.7))
      const cx = lerp(-160, POS[0].x, roll), cy = 1186 + (roll < 1 ? 0 : 2 * Math.sin(t * 14))
      bits(CAR, { K: INK, w: '#bfe6ff', C: '#ff9a6a', y: '#fff1a0', r: '#ff4f5a', g: '#2c2550', G: '#9aa3b0' }, cx, cy, 13, { alpha: kc })
      px(cx - 34, cy + 14, 68, 22, INK); px(cx - 30, cy + 17, 60, 16, '#fbf6ea')
      txt('HTX ♥', cx, cy + 26, { size: 15, color: INK, shadow: false, alpha: kc })
      const kb = pop01(t, L[0].t + 0.8, 0.3, 2.6) * kc
      if (kb > 0.01) bits(BAG, { b: '#b8793a', B: '#e0a85a', R: '#ff5d6a' }, 92, 960, 10, { sx: kb, sy: kb })
      if (t > L[2].t + 0.2 && t < L[4].t) for (let n = 0; n < 4; n++) {
        const p = ((t - L[2].t) * 0.8 + n / 4) % 1
        bits(NOTE, { X: n % 2 ? GOLD : '#ffffff' }, 72 + n * 18 + 12 * Math.sin(t * 3 + n), 1080 - p * 240, 7, { alpha: kc * Math.sin(Math.PI * p) })
      }
    }
    // v1: Aquarius' map pin drops (MEET HERE) + a little EXIT sign
    const kp = until(1, L[3].t + 0.1)
    if (kp > 0.01) {
      const drop = ease.outBack(prog(t, L[1].t + 0.1, L[1].t + 0.5))
      bits(PIN, { P: '#ff4f5a', W: '#ffffff' }, 984, lerp(640, 900, drop), 10, { alpha: kp })
      txt('MEET HERE', 980, 980, { size: 18, color: '#ff8fb1', alpha: kp * drop })
      if (t > L[1].t + 0.9) {
        const ke = pop01(t, L[1].t + 0.9, 0.3, 2.4) * kp
        x.save(); x.translate(980, 1056); x.scale(ke, ke)
        px(-56, -20, 112, 40, INK); px(-52, -16, 104, 32, '#2f9a5a')
        x.restore()
        txt('EXIT ↗', 980, 1056, { size: 20, color: '#ffffff', shadow: false, alpha: ke })
      }
    }
    // v2 → end: Aquarius' key ring, jingling; after the bump it hops to Cancer's side ("next time, you drive")
    const kk = pop01(t, L[3].t - 0.05, 0.3, 2) * ok * (t < L[5].t ? 1 : 1) * (t > L[4].t - 0.1 && t < L[5].t ? 1 - ease.inQuad(prog(t, L[4].t - 0.1, L[4].t + 0.15)) : 1)
    if (kk > 0.01 && t > L[3].t - 0.05) {
      const hop = ease.inOutCubic(prog(t, T.bump, T.bump + 0.5))
      const kx = lerp(986, POS[0].x + 120, hop), ky = lerp(920, 1000, hop) - Math.sin(Math.PI * hop) * 200
      const jing = t < L[4].t ? 0.3 * Math.sin(t * 18) : 0.1 * Math.sin(t * 5)
      if (t < L[4].t || t > T.bump - 0.2) {
        bits(KEYS, { O: '#c9c2e6', Y: GOLD }, kx, ky, 8, { rot: jing + hop * 6.283 })
        if (t < L[4].t && Math.sin(t * 18) > 0.6) drawPixelStar(x, kx + 50, ky - 24, 16, 1, '#ffffff', GOLD)
      }
    }
    // v3: Aquarius' phone — parked ✓ see u ★
    const kph = until(5, T.stars + 0.2)
    if (kph > 0.01) {
      phone(980, 930, 112, { k: kph, rot: 0.08, draw: (sl, st, sw, sh) => {
        let y = st + 10
        if (t > L[5].t + 0.4) y += bubble('parked ✓', sl + sw - 4, y, sw - 8, { size: 15, color: '#2f9a5a' }) + 8
        if (t > L[5].t + 1.0) bubble('see u ★', sl + sw - 4, y, sw - 8, { size: 15 })
      } })
    }
  },
  // rewatch bait: Pisces wears a little seatbelt sash in the crowd, all film
  front(x, t, H) {
    const { px, ok } = H
    if (ok <= 0.01) return
    x.save(); x.globalAlpha = ok * 0.95
    for (let n = 0; n < 9; n++) { px(652 - 30 + n * 7, 1402 - 30 + n * 7, 9, 9, INK); px(652 - 29 + n * 7, 1402 - 29 + n * 7, 6, 6, '#9aa3b0') }
    px(652 - 2, 1402 - 2, 12, 10, GOLD)
    x.restore()
  },
  sobAt: [],
}
// Pisces sobs hardest at "next time, you drive" (trust!)
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ['whoosh', L[0].t, 0.7, 0.03], ['pop', L[0].t + 0.75, 659.25, 0.035, -0.3], ['pop', L[0].t + 0.85, 880, 0.035, -0.3], ['pop', L[0].t + 0.9, 1318.51, 0.03, -0.3],
    ['whoosh', L[1].t + 0.1, 0.4, 0.03], ['tom', L[1].t + 0.5, 110, { gain: 0.16 }], ['tick', L[1].t + 0.95, 0.04],
    ['pluck', L[2].t + 0.3, 1318.51, 0.03, 0.5, -0.3], ['pluck', L[2].t + 0.6, 1567.98, 0.03, 0.5, -0.3], ['pluck', L[2].t + 0.9, 1760, 0.03, 0.5, -0.3],
    ['tick', L[3].t + 0.1, 0.04], ['tick', L[3].t + 0.2, 0.035], ['tick', L[3].t + 0.3, 0.03],
    ['pop', L[5].t + 0.45, 1174.66, 0.04, 0.3], ['pop', L[5].t + 1.05, 1318.51, 0.04, 0.3],
    ['whoosh', T.bump, 0.5, 0.025], ['tick', T.bump + 0.5, 0.04],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
