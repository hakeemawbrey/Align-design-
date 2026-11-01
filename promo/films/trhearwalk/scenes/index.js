// trhearwalk: HEAR ME OUT, "I'll walk you to your car." (20 s vertical, Star Talk Trends §15.2, music: cinematic · F)
// Story 0–15.6, then the shared end card. The format look and timing live in ./hear.js (identical in all five episodes).
//   0.0–3.7   "Hear me *out.*"  The curtains open; ♋ Cancer pops up behind the podium, taps the mic: tap, tap, EEEEEE.
//             The front row (♈ ♑ ♒ + ♓) flinches. Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   "“I'll walk you | *to your car.*”"  On the drop the screen unrolls on a little pink car under a streetlight;
//             the caption types on. Front row: "?", "…" (Capricorn's eye-roll), "?". The needle drops to MEH.
//   7.5–11.0  "Okay. *Listen.*"  REASON 1 the car is *right there.* they walk. · REASON 2 they wait till it *starts.*
//             · REASON 3 I took the *bus.* they walked me anyway.  (On the third the car drives off the screen and a BUS
//             stop pops up.) The row comes round one by one; the needle climbs.
//  11.2       card cut.
//  11.3–13.4 "The *bus stop?!*"  ♈ ARIES, from the front row: "wait. they walked you to the *BUS?*" Cancer nods, misty.
//  13.45–15.5 "Walked there. | *Swooned* back."  The needle pins past SWOON; Capricorn faints; Pisces fountains.
import { prog } from '../../../src/lib.js'
import { makeEpisode, R, INK, GOLD, BONE, MONO, drawBits, drawHeart, pop01, r3 } from './hear.js'

const CAR = [
  '.....RRRRRRRRR........',
  '....RWWWRWWWWWR.......',
  '...RWWWWRWWWWWWR......',
  'RRRRRRRRRRRRRRRRRRRRR.',
  'RRhhhhhhhhhhhhhhhhhRRR',
  'YRRRRRRRRRRRRRRRRRRRRY',
  'RRRDDDRRRRRRRRRDDDRRRR',
  '..DDGDD.......DDGDD...',
  '...DDD.........DDD....',
]
const CAR_COLS = { R: '#ff7a9a', h: '#ffb3c6', W: '#bfe8ff', Y: '#ffe27a', D: '#2a2440', G: '#9a93b0' }
const LAMP = ['LLL', '.P.', '.P.', '.P.', '.P.', '.P.', '.P.', '.P.', '.P.', '.P.', '.P.', 'PPP']

const EP = makeEpisode({
  id: 'trhearwalk', key: 'F', seed: 1502,
  hero: { sign: 'cancer', lineColor: '#bfe0ff' },
  crowd: ['aries', 'capricorn', 'aquarius'],
  h1: '“I’ll walk you | *to your car.”*', h1Accent: '#ff9fb8', h1Late: 3,
  h3: 'The *bus stop?!*', h3Accent: '#ffe27a',
  last: 'Walked there. | *Swooned* back.', lastLate: 2, lastAccent: '#ff9fb8',
  screen: { bits: ['.'], cols: {}, cell: 1, caption: '“I’LL WALK YOU TO YOUR CAR.”', capColor: '#ff9fb8' },
  stickers: ['the car is *right there.* they walk.', 'they wait till it *starts.*', 'I took the *bus.* they walked me anyway.'],
  line: { who: 0, text: 'wait. they walked you to the *BUS?*' },
  crowdLineColor: '#ffb27a',
  fainter: 1,
  moods(ph, t, T) {
    if (ph === 'twist' && t > T.line + 0.6) return { mood: 'sparkle', look: [-1, 1] }
    return null
  },
  crowdMoods(i, ph, t, T) {
    if (i === 0 && ph === 'twist' && t < T.lineDone + 0.2) return { mood: 'wide', look: [1, -1] }
    return null
  },
  screenDraw(x, t, T, ctx, S) {
    const pk = pop01(t, T.land - 0.1, 0.35, 2.2)
    if (pk <= 0.01) return
    const gy = S.cy + 62
    // the curb + the streetlight's warm pool
    R(x, '#cfc4b3', S.x0, gy, S.w, 8)
    const g = x.createRadialGradient(S.cx - 170, gy, 0, S.cx - 170, gy, 160); g.addColorStop(0, 'rgba(255,214,120,0.55)'); g.addColorStop(1, 'rgba(255,214,120,0)')
    x.fillStyle = g; x.fillRect(S.x0, S.y0, S.w, S.h)
    drawBits(x, LAMP, { L: '#ffe27a', P: '#5b5670' }, S.cx - 230, gy - 66 * pk, 11 * pk)
    // the car: parked, then (reason 3) it drives off right
    const off = prog(t, T.stk[2] + 0.05, T.stk[2] + 0.55)
    if (off < 1) drawBits(x, CAR, CAR_COLS, S.cx + 40 + off * off * 520, gy - 42, 10 * pk, { rot: off > 0 ? -0.03 : 0 })
    if (off > 0 && off < 1) for (let i = 0; i < 4; i++) R(x, '#b7ab9a', S.cx - 80 + off * 400 - i * 34, gy - 22 - (i % 2) * 14, 18, 8)
    // footprints: a dotted trail of tiny hearts from the lamp to the car
    for (let i = 0; i < 4; i++) { const hk = pop01(t, T.land + 0.3 + i * 0.12, 0.25, 2.4); if (hk > 0.01) drawHeart(x, S.cx - 150 + i * 46, gy - 12 - (i % 2) * 8, 2.6 * hk) }
    // the bus stop pops up
    const bk = pop01(t, T.stk[2] + 0.35, 0.35, 2.6)
    if (bk > 0.01) {
      x.save(); x.translate(S.cx + 120, gy); x.scale(bk, bk)
      R(x, INK, -8, -100, 16, 100); R(x, '#9a93b0', -4, -96, 8, 96)
      R(x, INK, -66, -158, 132, 66); R(x, '#3f7cf0', -60, -152, 120, 54)
      x.font = `700 36px ${MONO}`; x.fillStyle = '#fffaf0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS', 0, -123)
      x.restore()
    }
  },
  cues: T => [
    ['whoosh', r3(T.stk[2] + 0.05), 0.5, 0.04], ['tick', r3(T.stk[2] + 0.06), 0.04], ['tick', r3(T.stk[2] + 0.14), 0.04],
    ['pop', r3(T.stk[2] + 0.35), 1174.66, 0.04, 0.2], ['bell', r3(T.stk[2] + 0.4), 2349.32, 0.02, 0.6, 0.2],
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.land + 0.3 + i * 0.12), 1567.98, 0.016, -0.3 + i * 0.1]),
  ],
})
void GOLD; void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
