// kplanetdemo: the PLANET TALK kit demo (promo/films/planetkit.js). 25 s vertical. Not a posted film.
//   0.0   the Sun CRASHES in (frame 0 mid-fall) and calls out Leo. Every 2.1 s the next planet arrives with a different
//         entrance and its own line: Moon (rise), Mercury (zoom), Venus (burst), Mars (slide), Jupiter (drop),
//         Saturn (spin), Uranus (crash), Neptune (rise over the horizon), Pluto (burst, STILL COUNTS badge).
//  21.0   the line-up: all 10 in a row, and Pisces crying happy tears in front. Hard cut.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { slamTitle, slamTitleCues } from '../../hookkit.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, planetSize, PLANET_IDS, PLANETS, aboveHorizon, TWO_SHOT } from '../../planetkit.js'

export const DURATION = 25
const STEP = 2.1
const ROLL = [
  { id: 'sun', kind: 'crash', sign: 'leo', mood: 'happy', text: 'LEO. You are the *main character.*', opts: { shades: true } },
  { id: 'moon', kind: 'rise', sign: 'cancer', mood: 'sad', text: 'cancer… I remember *everything.*' },
  { id: 'mercury', kind: 'zoom', sign: 'gemini', mood: 'wide', text: 'GEMINI. three texts. *one breath.*' },
  { id: 'venus', kind: 'burst', sign: 'libra', mood: 'love', text: 'Libra, darling. *Love yourself first.*' },
  { id: 'mars', kind: 'slide', sign: 'aries', mood: 'angry', text: 'ARIES. JUST *ASK THEM OUT.*' },
  { id: 'jupiter', kind: 'drop', sign: 'sagittarius', mood: 'happy', text: 'Sag, kiddo! Every date is an *adventure!*' },
  { id: 'saturn', kind: 'spin', sign: 'capricorn', mood: 'neutral', text: 'Capricorn. *Boundaries.* Then dessert.' },
  { id: 'uranus', kind: 'crash', sign: 'aquarius', mood: 'wide', text: 'Aquarius! What if you did the *unexpected?*' },
  { id: 'neptune', kind: 'rise', sign: 'pisces', mood: 'love', text: 'Pisces… check the *rose-tinted glasses.*', opts: { roseGlasses: true } },
  { id: 'pluto', kind: 'burst', sign: 'scorpio', mood: 'sly', text: 'SCORPIO. We need to *talk.*', opts: { badge: true } },
]
const SEG = ROLL.map((r, i) => {
  const t0 = i * STEP - (i === 0 ? 0.55 : 0)
  const big = r.kind === 'rise'
  const IN = { at: t0, x: 540, y: big ? 760 : 720, size: planetSize(r.id, 600) }
  const land = entrance(r.kind, 0, IN).land
  return { ...r, t0: i * STEP, t1: (i + 1) * STEP, IN, B: { t0: Math.max(0.05, land + 0.05), t1: (i + 1) * STEP - 0.12, x: 540, y: 1150, who: r.id, text: r.text, tail: 0, tailUp: true, size: 44, maxW: 760 } }
})
const LINEUP = 21.0
const HOOK = { at: -1, text: 'The planets have | *notes.*', top: 150, size: 100, out: [1.9, 2.1] }

async function build(stage) {
  const root = fill(stage, { background: '#07041a' })
  try { await Promise.all(['800 60px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) {}
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: DURATION + 1, root,
    update(t) {
      if (t < LINEUP) {
        const i = Math.min(SEG.length - 1, Math.floor(t / STEP)), S = SEG[i]
        const hz = S.kind === 'rise' ? { y: 1560 } : null
        drawSpace(x, t, { planet: S.id, horizon: hz, seed: i + 1 })
        const P = entrance(S.kind, t, S.IN)
        const draw = () => { drawEntranceFx(x, S.id, S.kind, t, S.IN); drawPlanet(x, S.id, P.x, P.y, P.size, t, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: S.mood, lines: [{ t: S.B.t0, who: S.id, text: S.text }], cps: 32, ...(S.opts || {}) }) }
        if (hz) aboveHorizon(x, 1560, draw); else draw()
        drawSign(x, S.sign, 540, 1560, 280, t, { mood: S.sign === 'pisces' ? 'sparkle' : 'wide', look: [0, -1], tears: S.sign === 'pisces' ? 3 : 0, hops: [S.B.t0 + 1.2], shadow: true })
        speech(x, t, S.B)
      } else {
        drawSpace(x, t, { planet: 'sun', seed: 11 })
        PLANET_IDS.forEach((id, k) => {
          const col = k % 5, row = Math.floor(k / 5)
          const px = 140 + col * 200, py = 520 + row * 420
          const pop = Math.min(1, Math.max(0, (t - LINEUP - k * 0.08) / 0.3))
          drawPlanet(x, id, px, py, planetSize(id, 230), t, { pop: pop < 1 ? pop * (1 + 0.2 * Math.sin(pop * Math.PI)) : 1, mood: id === 'pluto' ? 'proud' : 'happy', hops: [LINEUP + 1.6 + k * 0.05], ...(id === 'sun' ? { shades: true } : {}), ...(id === 'pluto' ? { badge: true } : {}) })
        })
        drawSign(x, 'pisces', 540, 1430, 340, t, { mood: 'sparkle', tears: 3, look: [0, -1], hops: [LINEUP + 0.6, LINEUP + 1.4, LINEUP + 2.2], shadow: true })
        speech(x, t, { t0: LINEUP + 0.5, x: 540, y: 1720, who: 'pisces', text: 'ALL TEN? I’m *so* emotional.', tailUp: true, tail: 0, size: 44 })
      }
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, slamTitle(HOOK)]
export const CUES = [
  ...slamTitleCues(HOOK),
  ...SEG.flatMap(S => entranceCues(S.kind, S.IN)),
  ...speechCues(SEG.map(S => S.B)),
  ...speechCues([{ t0: LINEUP + 0.5, who: 'pisces', text: 'ALL TEN? I’m so emotional.' }]),
  ...PLANET_IDS.map((id, k) => ['pop', +(LINEUP + k * 0.08).toFixed(2), PLANETS[id].pitch * 2, 0.04, 0]),
  ['glitter', LINEUP, LINEUP + 1],
]
