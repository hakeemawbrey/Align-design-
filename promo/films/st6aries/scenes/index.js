// st6aries (45 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 01) · story 0–40.6, then the shared end card.
//   A documentary profile of Aries (see ../s6.js for the season look and the beat engine).
//   COLD OPEN  ARIES, in the interview spotlight, gloves on: "you want my story? okay. i'll go *first.*"
//   TITLE      BEHIND THE SIGN · ♈ ARIES · *the first one.* · FIRE · CARDINAL · RULED BY MARS / THE RAM · MAR 21 – APR 19
//   I MYTH     archive footage: the golden ram flies Phrixus and Helle over the sea (Greek myth; the ghost bobs up out of
//              the waves), then its fleece hangs glowing on a tree as Jason's ship, the Argo, sails in.
//   II SKY     the real stick figure (41 Ari · Hamal · Sheratan · Mesarthim). Hamal labelled: the brightest, an orange
//              giant. Aries starts the zodiac at the March equinox; precession has moved that point into Pisces (an arrow
//              runs west off the chart). ARIES: "i'm still first. *emotionally.*"
//   III CLOSE  the interview: what people get wrong ("i'm just *early.*"), what scares it ("being *too much.*"), how it
//              loves (it shows up first, and it waits now). Libra cutaway: "it waited forty minutes while i picked dinner."
//   TAKEAWAY   "I go first so you don't have to be *scared.*"  The gloves come off.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, pixLine, monoText, KID, KID_C, GOLD, BONE } from '../s6.js'

const KEY = 'Em'
const INK = '#1b1236'

// ── pixel bitmaps
const RAM = [            // the golden ram, flying right, curled horn, little wings
  '..............HHH.....',
  '.............HhhHH....',
  '..WW........YHFFFH....',
  '.WWWW.....YYYHFFFFF...',
  'WWWWWW.YYYyYYYFEFFFF..',
  '.WWWWYYYyYYYyYYFFFFn..',
  '..WYYYYYYYYYYYYYFFF...',
  '.YYyYYYyYYYYyYYYY.....',
  'YYYYYyYYYYYyYYYYY.....',
  '.YYYYYYYYYYYYYYY......',
  '..YYYyYYYYYyYYY.......',
  '..LL.LL.....LL.LL.....',
  '..LL..LL...LL...LL....',
  '..dd...dd.dd.....dd...',
]
const RAM_C = { H: '#8a5a2c', h: '#b98a52', W: '#fff6e2', Y: '#f2c75c', y: '#c8963e', F: '#f0dcb8', E: '#1b1236', n: '#d79b8a', L: '#e8d2a6', d: '#5a3a1e' }
const CLOUD = ['...WWW......', '..WWWWW.WW..', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.wwwwwwwwww.']
const CLOUD_C = { W: '#fffaf0', w: '#d9d2c8' }
const SHIP = [           // the Argo: a hull, oars, a square sail
  '...........M..........',
  '.........SSMSS........',
  '........SSSMSSS.......',
  '........SSSMSSS.......',
  '........SSSMSSS.......',
  '.........SSMSS........',
  '...........M..........',
  'P..........M.........P',
  'PBBBBBBBBBBBBBBBBBBBBP',
  '.BbBbBbBbBbBbBbBbBbBB.',
  '..BBBBBBBBBBBBBBBBBB..',
  '...o..o..o..o..o..o...',
  '..o..o..o..o..o..o....',
]
const SHIP_C = { M: '#5a3a1e', S: '#f3e7cc', B: '#8a5a2c', b: '#c8963e', P: '#5a3a1e', o: '#b98a52' }
const TREE = [
  '.....GGGGGG.....',
  '...GGGGgGGGGG...',
  '..GGgGGGGGGgGG..',
  '.GGGGGGGgGGGGGG.',
  'GGgGGGGGGGGGgGGG',
  'GGGGGgGGGGGGGGGG',
  '.GGGGGGGGgGGGGG.',
  '..GGGGTTGGGGGG..',
  '......TT........',
  '......TTT.......',
  '......TT........',
  '.....TTTT.......',
  '....TTTTTT......',
]
const TREE_C = { G: '#5f8a4a', g: '#8ab86a', T: '#6a4424' }
const FLEECE = ['YYYYYY', 'YyYYyY', 'YYYYYY', '.YyYY.', '.Y..Y.']
const FLEECE_C = { Y: '#f7cf68', y: '#c8963e' }
const GLOVE = [
  '....hhhhhh...',
  '..hhRRRRRRR..',
  '.hRRRRRRRRRR.',
  'WWRRRRRRRRRRR',
  'WWRRRRRRRRRRR',
  'WWRhRRRRRRRRR',
  'WWRRhhRRRRRRd',
  'WWRRRRhRRRRRd',
  'WW.RRRRRRRRd.',
  '....dddddd...',
]
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }

function waves(ctx, t, y0, P, { col = '#3f6f9a', hi = '#9fd0e8' } = {}) {
  ctx.fillStyle = col; ctx.fillRect(P.x0, y0 + 20, P.x1 - P.x0, P.y1 - y0)
  for (let xx = P.x0; xx < P.x1; xx += 12) {
    const h = Math.round(10 + 8 * Math.sin(xx * 0.03 + t * 2.4) + 5 * Math.sin(xx * 0.071 - t * 1.7))
    ctx.fillStyle = col; ctx.fillRect(xx, y0 + 20 - h, 12, h)
    ctx.fillStyle = hi; ctx.fillRect(xx, y0 + 20 - h, 12, 6)
  }
  for (let i = 0; i < 9; i++) { const xx = P.x0 + ((i * 113 + t * 40) % (P.x1 - P.x0)); ctx.fillStyle = hi; ctx.fillRect(Math.round(xx), y0 + 60 + (i % 3) * 40, 24, 5) }
}

// ── the myth: two tableaux
const WAVE_Y = 1150
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // sky clouds drifting, the ram crossing left → right over the sea with the two children on its back
    drawBits(ctx, CLOUD, CLOUD_C, Math.round(300 - (t - tabAt) * 30), 690, 9, { outline: null })
    drawBits(ctx, CLOUD, CLOUD_C, Math.round(820 - (t - tabAt) * 18), 620, 7, { outline: null })
    waves(ctx, t, WAVE_Y, P)
    const p = clamp((t - tabAt) / 5.2)
    const rx = lerp(360, 680, ease.inOutQuad(p)), ry = 900 + Math.sin(t * 3) * 16
    for (let i = 1; i <= 4; i++) drawPixelStar(ctx, rx - 200 - i * 40, ry + 30 + Math.sin(t * 3 - i) * 10, 18 - i * 2, i % 2, '#fff1c8')   // a sparkle trail
    drawBits(ctx, KID, KID_C, Math.round(rx - 20), Math.round(ry - 108), 12)
    drawBits(ctx, KID, { ...KID_C, h: '#c8963e', T: '#d8c6e8' }, Math.round(rx - 92), Math.round(ry - 100), 12)
    drawBits(ctx, RAM, RAM_C, Math.round(rx), Math.round(ry), 17)
  } else {
    // the fleece on the tree, the Argo sailing in
    waves(ctx, t, WAVE_Y + 20, P)
    drawBits(ctx, TREE, TREE_C, 760, 900, 18)
    const p = clamp((t - tabAt) / 4.5)
    const sx = lerp(160, 380, ease.outCubic(p)), sy = WAVE_Y - 60 + Math.sin(t * 2.2) * 6
    drawBits(ctx, SHIP, SHIP_C, Math.round(sx), Math.round(sy), 15, { rot: Math.sin(t * 2.2) * 0.03 })
  }
}
/** hand-tinted gold, drawn after the sepia grade */
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    const p = clamp((t - tabAt) / 5.2)
    const rx = lerp(360, 680, ease.inOutQuad(p)), ry = 900 + Math.sin(t * 3) * 16
    ctx.save(); ctx.globalAlpha *= 0.55 + 0.15 * Math.sin(t * 5)
    drawBits(ctx, RAM.map(r => r.replace(/[^Yy]/g, '.')), { Y: '#f7cf68', y: '#e0a83a' }, Math.round(rx), Math.round(ry), 17, { outline: null })
    ctx.restore()
  } else {
    const g = ctx.createRadialGradient(812, 950, 0, 812, 950, 130)
    g.addColorStop(0, 'rgba(255,214,110,0.55)'); g.addColorStop(1, 'rgba(255,214,110,0)')
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(680, 820, 270, 270); ctx.restore()
    drawBits(ctx, FLEECE, FLEECE_C, 812, 950 + Math.round(Math.sin(t * 2) * 2), 12)
    if (Math.sin(t * 6) > 0.3) drawPixelStar(ctx, 850, 915, 22, 0, '#fff1c8', '#ffffff')
  }
}

// ── the sky: the real stick figure (RA h, Dec °, V mag)
const STARS = [
  { id: 'a41', name: '41 Ari', ra: 2.8327, dec: 27.26, mag: 3.6 },
  { id: 'hamal', name: 'Hamal', ra: 2.1196, dec: 23.46, mag: 2.0 },
  { id: 'sheratan', name: 'Sheratan', ra: 1.9107, dec: 20.81, mag: 2.6 },
  { id: 'mesarthim', name: 'Mesarthim', ra: 1.8922, dec: 19.29, mag: 3.9 },
]
let EP = null
function skyExtras(ctx, t, { k }) {
  // the March equinox point: precession has carried it west, into Pisces (off the chart to the right)
  const L = EP.LINES.sky[1]
  const p = ease.outCubic(prog(t, L.t, L.t + 0.9))
  if (p <= 0) return
  const y = 1120
  pixLine(ctx, 160, y, lerp(160, 930, p), y, 1, GOLD, { s: 6, step: 14, alpha: 0.9 })
  if (p > 0.95) drawBits(ctx, ['X..', 'XX.', 'XXX', 'XX.', 'X..'], { X: GOLD }, 944, y, 6, { outline: null })
  ctx.save(); ctx.globalAlpha *= clamp(p * 2)
  monoText(ctx, 'PRECESSION: EQUINOX POINT NOW IN PISCES', 980, y + 44, { size: 22, color: GOLD, spacing: 0.08, align: 'right', n: Math.floor((t - L.t) / 0.03) + 1 })
  ctx.restore()
}

// ── the star's prop: its boxing gloves (season 3/4); they come off for the takeaway
function prop(ctx, t, r, { seg, size }) {
  const c = Math.max(2, Math.round(size / 36))
  if (seg === 'take') {
    const ta = EP.T.take[0], f = ease.inQuad(prog(t, ta + 0.2, ta + 0.6))
    if (f >= 1) {
      drawBits(ctx, GLOVE, GLOVE_C, r.x - 250, 1290, c * 0.9, { flip: true, rot: -1.2 })
      drawBits(ctx, GLOVE, GLOVE_C, r.x + 250, 1294, c * 0.9, { rot: 1.1 })
      return
    }
    drawBits(ctx, GLOVE, GLOVE_C, lerp(r.x - 0.5 * size, r.x - 250, f), lerp(r.y - 0.08 * size, 1290, f), c * 0.9, { flip: true, rot: -0.3 - 0.9 * f })
    drawBits(ctx, GLOVE, GLOVE_C, lerp(r.x + 0.5 * size, r.x + 250, f), lerp(r.y - 0.08 * size, 1294, f), c * 0.9, { rot: -0.1 + 1.2 * f })
    return
  }
  const jab = seg === 'cold' ? Math.max(0, Math.sin(t * 7)) ** 6 : 0
  drawBits(ctx, GLOVE, GLOVE_C, r.x - 0.5 * size, r.y - 0.08 * size + Math.sin(t * 5) * 3, c * 0.9, { flip: true, rot: -0.3 })
  drawBits(ctx, GLOVE, GLOVE_C, r.x + 0.5 * size + jab * 30, r.y - 0.08 * size - jab * 10, c * 0.9, { rot: -0.1 })
}

EP = makeEpisode({
  id: 'st6aries', sign: 'aries', ep: 1, duration: 45, pitch: 880,
  cold: [{ text: 'you want my story? okay. i’ll go *first.*', mood: 'happy' }],
  title: { accent: 'the first one.', facts: [['FIRE', 'CARDINAL', 'RULED BY MARS'], ['THE RAM', 'MAR 21 – APR 19']] },
  myth: {
    head: 'The *golden* ram.',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, a golden ram flew Phrixus and Helle to safety.' },
      { who: 'stars', tab: 1, text: 'its fleece became the Golden Fleece Jason *sailed* for.' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'Look *up.*',
    map: { name: 'Aries', stars: STARS, lines: [['a41', 'hamal'], ['hamal', 'sheratan'], ['sheratan', 'mesarthim']], bright: 'hamal', brightCol: '#ffb36b',
      box: { cx: 540, cy: 860, w: 760, h: 420 },
      labels: [{ star: 'hamal', text: 'HAMAL', sub: 'α ARIETIS · ORANGE GIANT', dx: -30, dy: 110, align: 'right', at: 1.3 }] },
    lines: [
      { who: 'stars', text: 'Hamal, an orange giant, is its brightest star.' },
      { who: 'stars', text: 'Aries starts the zodiac. that point has drifted into *Pisces.*' },
      { text: 'i’m still first. *emotionally.*', mood: 'wink' },
    ],
    heroAt: [176, 1236],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 1 · CARDINAL FIRE',
    items: [
      { q: 'Q. What do people | get *wrong?*', lines: [{ text: 'people think i’m angry. i’m just *early.*', mood: 'squint', look: [0, 0] }] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'that i’m *too much.* i come in hot, then worry all night.', mood: 'neutral', look: [0, 1] }] },
    ],
  },
  takeaway: { min: 4.0, text: 'I go first so | you don’t have to | be *scared.*', words: 9, top: 330, byY: 880 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'sparkle', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'myth', at: 3.2, x: 840, y: WAVE_Y - 2, from: 'below', cell: 3, where: 'bobbing up out of the sepia sea under the golden ram, archive footage, right of centre' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
export { KEY }
void INK; void BONE
