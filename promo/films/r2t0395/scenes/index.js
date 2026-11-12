// r2t0395: star_talk, BELIKE (twelve signs), "Zodiacs decorating | their room be like." (signs3kit social cut, music: lofi · F).
// Ending: callback (Taurus is still in the pillows).
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

const PILLOW_COLS = [PINK, MINT, GOLD, LAV, SKYB, ORANGE, BONE, PINK, GOLD, MINT]
/** a heap of pillows, n of them, the star half buried in it */
function pillows(x, cx, cy, k, n) {
  if (k <= 0.01) return
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / 4), col = i % 4
    drawBits(x, BITS.pillow, { W: PILLOW_COLS[i % 10], B: '#ffffff' }, cx + (col - 1.5) * 112 + (row % 2) * 50, cy - row * 70, 12 * k, { rot: ((i * 37) % 7 - 3) * 0.05 })
  }
}

const CAMEOS = [
  cam('aries', 'Painted it red. | *In ten minutes.*', { mood: 'sparkle', hops: [0.5, 1.0, 1.5] }, [
    ['fn', (x, t, lt) => { const p = Math.min(1, Math.max(0, lt - 0.3) / 1.0); if (p > 0) { x.fillStyle = 'rgba(226,61,78,0.35)'; x.fillRect(110, 480, 860 * p, 740) } }],
    ['bits', 'paint', 790, 1040, 18, 0.2, {}],
    ['label', 790, 700, 'DRY? WHO CARES', 1.3, { size: 46, bg: RED, rot: -0.05 }],
  ]),
  cam('taurus', 'Forty pillows. | *Lives in them now.*', { mood: lt => lt > 1.4 ? 'sleepy' : 'heart' }, [
    ['fn', (x, t, lt, t0) => pillows(x, 660, 1120, pop01(t, t0 + 0.2, 0.3, 2), Math.min(10, 2 + Math.floor(lt * 6)))],
    ['label', 790, 660, 'PILLOWS: 40', 1.2, { size: 44, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam('gemini', 'Redecorated twice. | *Before lunch.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0] }, [
    ['label', 790, 800, lt => `ROOM v${1 + Math.floor(lt * 3)}`, 0.3, { size: 60, bg: lt => [MINT, PINK, SKYB, GOLD, LAV, ORANGE, MINT, PINK][Math.floor(lt * 3) % 8], rot: -0.05, mono: true }],
    ['label', 790, 960, 'NEXT: v9', 1.4, { size: 46, bg: BONE, rot: 0.05, mono: true }],
  ]),
  cam('cancer', 'Every wall: | *family photos.*', { mood: 'heart' }, [
    ['frame', 650, 680, 0.2, { text: 'MOM', w: 150, h: 120, size: 40, bg: PINK, rot: -0.06 }],
    ['frame', 840, 760, 0.5, { text: 'GRANDMA', w: 170, h: 120, size: 30, bg: SKYB, rot: 0.06 }],
    ['frame', 760, 960, 0.8, { text: 'COUSIN | (3RD)', w: 180, h: 140, size: 32, bg: MINT, rot: 0.03 }],
  ]),
  cam('leo', 'Hung a mirror. | *On every wall.*', { mood: 'sparkle', hops: [1.0] }, [
    ['bits', 'mirror', 640, 760, 16, 0.2, {}],
    ['bits', 'mirror', 800, 720, 16, 0.4, {}],
    ['bits', 'mirror', 920, 800, 16, 0.6, {}],
    ['bits', 'mirror', 720, 960, 16, 0.8, {}],
    ['bits', 'mirror', 880, 1000, 16, 1.0, {}],
    ['sparkles', 780, 860, 1.3, { n: 6, R: 200 }],
  ]),
  cam('virgo', 'Labeled everything. | *Even the labels.*', { mood: 'squint' }, [
    ['label', 790, 700, 'DRAWER', 0.3, { size: 44, bg: BONE, rot: -0.04, mono: true }],
    ['label', 790, 820, 'PLANT', 0.6, { size: 44, bg: MINT, rot: 0.04, mono: true }],
    ['label', 790, 950, 'LABEL', 1.0, { size: 44, bg: GOLD, rot: -0.03, mono: true }],
    ['label', 860, 1040, '(LABEL)', 1.5, { size: 32, bg: PINK, rot: 0.05, mono: true }],
  ]),
  cam('libra', 'Twelve shades of beige. | *All different.*', { mood: lt => lt > 1.3 ? 'heart' : 'squint' }, [
    ['fn', (x, t, lt, t0) => {
      const shades = ['#efe2c8', '#e8d8ba', '#e2d2b2', '#dccaa8', '#d6c29e', '#d0bb96', '#cab48e', '#c4ad86', '#bea67e', '#b89f76', '#b29870', '#ac9168']
      for (let i = 0; i < 12; i++) {
        const k = pop01(t, t0 + 0.2 + i * 0.07, 0.25, 2)
        drawBits(x, BITS.swatch, { T: shades[i], C: BONE }, 620 + (i % 4) * 92, 780 + Math.floor(i / 4) * 130, 18 * k)
      }
    }],
    ['label', 790, 650, 'THE ONE: #7', 1.4, { size: 44, bg: PINK, rot: -0.04, mono: true }],
  ]),
  cam('scorpio', 'All black. | *Even the plants.*', { mood: lt => lt > 1.2 ? 'wink' : 'neutral' }, [
    ['bits', 'plantBlack', 790, 950, 24, 0.2, {}],
    ['label', 790, 680, 'MOOD: DARK', 1.0, { size: 44, bg: '#c97bff', rot: 0.05, mono: true }],
  ]),
  cam('sagittarius', 'Decor? | *A map and a backpack.*', { mood: 'sparkle', hops: [0.6, 1.3], star: { x: 150 }, look: [-1, 0] }, [
    ['bits', 'map', 320, 760, 22, 0.2, {}],
    ['bits', 'backpack', 320, 1040, 16, 0.6, {}],
    ['label', 340, 600, 'UNPACKED: NEVER', 1.2, { size: 40, bg: ORANGE, rot: -0.04, mono: true }],
  ]),
  cam('capricorn', 'Bedroom? | *It’s an office now.*', { mood: lt => lt < 1.2 ? 'neutral' : 'happy' }, [
    ['bits', 'desk', 790, 990, 20, 0.2, {}],
    ['label', 790, 700, 'MEETING: 7 AM', 1.0, { size: 46, bg: GREEN, rot: -0.05, mono: true }],
  ]),
  cam('aquarius', 'Hung the bed | *from the ceiling.*', { mood: 'sparkle', look: [1, -1] }, [
    ['fn', (x, t, lt, t0) => {
      const k = pop01(t, t0 + 0.2, 0.3, 2), sw = Math.sin(t * 2.2) * 0.06
      if (k <= 0.01) return
      x.save(); x.strokeStyle = BONE; x.lineWidth = 6
      x.beginPath(); x.moveTo(680, 480); x.lineTo(690 + sw * 200, 700); x.moveTo(900, 480); x.lineTo(890 + sw * 200, 700); x.stroke(); x.restore()
      drawBits(x, BITS.bed, { K: INK, W: '#fff', L: LAV }, 790 + sw * 200, 740, 22 * k, { rot: sw })
    }],
    ['label', 790, 960, 'GRAVITY: OFF', 1.1, { size: 46, bg: SKYB, rot: 0.04, mono: true }],
  ]),
  cam('pisces', 'Fairy lights everywhere. | *Cried, it’s so pretty.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'sparkle' : 'wide' }, [
    ['fn', (x, t, lt, t0) => {
      const n = Math.min(14, Math.floor(Math.max(0, lt - 0.2) * 12))
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 4
      for (const row of [600, 760]) {
        x.beginPath(); for (let i = 0; i <= 20; i++) { const xx = 130 + i * 41, yy = row + 40 * Math.sin(Math.PI * i / 20); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke()
        for (let i = 0; i < n; i++) {
          const xx = 150 + i * 58, yy = row + 40 * Math.sin(Math.PI * (xx - 130) / 820) + 14, on = (Math.floor(t * 3) + i) % 2
          x.fillStyle = [GOLD, PINK, SKYB, MINT][i % 4]; x.globalAlpha = on ? 1 : 0.5
          x.beginPath(); x.arc(xx, yy, 12, 0, Math.PI * 2); x.fill()
        }
      }
      x.restore()
    }],
    ['bubble', 790, 980, 'it’s so | magical', 1.2, { size: 44, col: SKYB, tail: 'bl' }],
  ]),
]

const F = makeFilm({
  id: 'r2t0395', key: 'F', accent: '#c9a6ff', ending: 'callback',
  title: 'Zodiacs decorating | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Home sweet | *chaos.*' },
  last: {
    text: 'Taurus is still | *in the pillows.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.4, 1.9)
      pillows(x, 540, 1120, 1.4 * k, 10)
      hearts(x, t, 540, 1380, t0 + 1.0, { n: 6, life: 2, spread: 820, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
