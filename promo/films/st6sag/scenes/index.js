// st6sag (45 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 09) · story 0–40.6, then the shared end card.
//   A documentary profile of Sagittarius (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  SAGITTARIUS, backpack on (season 3): "can we do this walking? i’ve got a *flight.*"
//   TITLE      BEHIND THE SIGN · ♐ SAGITTARIUS · *the wanderer.* · FIRE · MUTABLE · RULED BY JUPITER / THE ARCHER ·
//              NOV 22 – DEC 21
//   I MYTH     archive footage: in Greek myth the archer is a centaur (it draws its bow, a hand-tinted gold arrow flies);
//              some stories link it to Chiron, the wise healer who taught heroes (the centaur with a young pupil).
//   II SKY     the Teapot asterism (Kaus Australis, Kaus Media, Kaus Borealis, Alnasl, φ, Nunki, τ, Ascella). Kaus
//              Australis labelled (the brightest). The centre of our galaxy lies in its direction: a glow just past the
//              spout, "steam" rising toward it.
//   III CLOSE  "i leave first so i’m never *left.*"  Gemini cutaway: "it unpacked for me. *all* of it."  The backpack
//              is on the floor for the whole interview.
//   TAKEAWAY   "I’m learning to *land.*"
//   The ghost peeks out of the backpack on the interview floor.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, pixLine, monoText, KID, KID_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const CENTAUR = [        // a centaur archer facing right: a human torso on the horse's chest, bow drawn, arrow nocked
  '..............hhh.........',
  '.............hSSSh...sb...',
  '.............hSESS...s.b..',
  '..............SSS....s..b.',
  '.............TTTT....s..b.',
  '............TTTTTSSSSSAAAA',
  '............TTTTT....s..b.',
  '............TTTTT....s..b.',
  '.............TTT.....s.b..',
  '..HHHHHHHHHHHHHHH....sb...',
  't.HHHHHHHHHHHHHHH.........',
  'ttHHHHHHHHHHHHHHH.........',
  't..HHHHHHHHHHHHH..........',
  '...LL.LL....LL.LL.........',
  '...LL..L....L..LL.........',
  '...dd..d....d..dd.........',
]
const CHIRON = [         // Chiron, the bearded teacher (drawn flipped, facing his pupil), one hand out
  '..............hhh...',
  '.............hSSSh..',
  '.............hSESS..',
  '.............BBSS...',
  '.............TBBT...',
  '............TTTTTSS.',
  '............TTTTT.SS',
  '............TTTTT...',
  '.............TTT....',
  '..HHHHHHHHHHHHHHH...',
  't.HHHHHHHHHHHHHHH...',
  'ttHHHHHHHHHHHHHHH...',
  't..HHHHHHHHHHHHH....',
  '...LL.LL....LL.LL...',
  '...LL..L....L..LL...',
  '...dd..d....d..dd...',
]
const CENTAUR_C = { h: '#5a3a22', S: '#e8b48a', E: '#2a1a12', T: '#d9d2c2', A: '#c8963e', s: '#f3e3c3', B: '#e8e0d0', b: '#8a5a2c', H: '#b98a52', t: '#6a4424', L: '#a87a46', d: '#5a3a1e' }
const SCROLL = ['pppppp', 'pwwwwp', 'pwkkwp', 'pwwwwp', 'pwkkwp', 'pppppp']
const ARROW = ['A.....', '.AAAAA', 'A.....']
const PACK = [
  '...SSSSSS...',
  '..S......S..',
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'PppppppppppP',
  'PPPPPPPPPPPP',
  'PPPFFFFFFPPP',
  'PPPFffffFPPP',
  'PPPFFFFFFPPP',
  'PPPPPPPPPPPP',
  'PPPPPPPPPPPP',
  '.PPPPPPPPPP.',
]
const PACK_C = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }

function ground(ctx, P) {
  ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1160, P.x1 - P.x0, P.y1 - 1160)
  ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1156 + ((xx / 24) % 2) * 4, 12, 8)
}
const shotAt = tabAt => tabAt + 1.6
function tableau(ctx, t, { tab, tabAt, P }) {
  ground(ctx, P)
  if (tab === 0) {
    // the archer draws and looses
    drawBits(ctx, CENTAUR, CENTAUR_C, 470, 1010, 20)
    for (let i = 0; i < 6; i++) if (Math.sin(t * 2 + i) > -0.4) drawPixelStar(ctx, 600 + (i * 67) % 320, 640 + (i * 53) % 180, 14 + (i % 3) * 5, i % 2, '#fff1c8')
  } else {
    // Chiron, the teacher: the centaur (facing left) with a young pupil and a scroll
    drawBits(ctx, CHIRON, { ...CENTAUR_C, h: '#e8e0d0', H: '#a88a62' }, 640, 1010, 19, { flip: true })
    const nod = Math.sin(t * 3) > 0.6 ? 4 : 0
    drawBits(ctx, KID, KID_C, 270, 1110 + nod, 14)
    drawBits(ctx, SCROLL, { p: '#a8743e', w: '#f3e3c3', k: '#5a3a1e' }, 380, 1060, 10)
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab !== 0) return
  // the arrow, gold, flying off to the top right
  const d = t - shotAt(tabAt)
  if (d < 0) { ctx.fillStyle = '#f7cf68'; ctx.fillRect(650, 954, 80, 12); return }
  const p = clamp(d / 0.9)
  if (p < 1) drawBits(ctx, ARROW, { A: '#f7cf68' }, Math.round(lerp(720, 980, p)), Math.round(lerp(960, 640, p)), 7, { rot: -0.65 * p, outline: null })
  if (d > 0.8 && d < 1.3) drawPixelStar(ctx, 930, 660, 40, 0, '#fff1c8', '#ffffff')
}

// ── the sky (RA h, Dec °, V mag): the Teapot
const STARS = [
  { id: 'kaus', ra: 18.4029, dec: -34.385, mag: 1.85 },
  { id: 'nunki', ra: 18.9211, dec: -26.297, mag: 2.05 },
  { id: 'ascella', ra: 19.0435, dec: -29.880, mag: 2.6 },
  { id: 'media', ra: 18.3499, dec: -29.828, mag: 2.7 },
  { id: 'borealis', ra: 18.4662, dec: -25.421, mag: 2.81 },
  { id: 'phi', ra: 18.7609, dec: -26.991, mag: 3.17 },
  { id: 'alnasl', ra: 18.0968, dec: -30.424, mag: 2.98 },
  { id: 'tau', ra: 19.1157, dec: -27.671, mag: 3.32 },
  { id: 'gc', ra: 17.761, dec: -29.008, mag: 9, hide: true },   // Sgr A*, the centre of the Milky Way
]
let EP = null
function skyExtras(ctx, t, { pos }) {
  const L = EP.LINES.sky[1], p = ease.outCubic(prog(t, L.t + 0.3, L.t + 1.4))
  if (p <= 0) return
  const s = pos('alnasl'), g = pos('gc')
  // steam from the spout, curling toward the galactic centre
  ctx.save(); ctx.globalAlpha *= 0.85
  for (let i = 0; i < 14; i++) {
    const f = i / 13; if (f > p) break
    const x = lerp(s.x + 20, g.x, f), y = lerp(s.y - 20, g.y, f) - Math.sin(f * Math.PI) * 70 + Math.sin(t * 3 + i) * 5
    ctx.fillStyle = 'rgba(220,230,255,0.7)'; ctx.fillRect(Math.round(x) - 4, Math.round(y) - 4, 8, 8)
  }
  ctx.restore()
  const gr = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 90 * p)
  gr.addColorStop(0, 'rgba(255,236,190,0.75)'); gr.addColorStop(0.4, 'rgba(255,200,140,0.25)'); gr.addColorStop(1, 'rgba(255,200,140,0)')
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = gr; ctx.fillRect(g.x - 100, g.y - 100, 200, 200); ctx.restore()
  drawPixelStar(ctx, g.x, g.y, 30 * p, 0, '#ffe9b0', '#ffffff')
  const n = Math.floor((t - L.t - 0.6) / 0.03) + 1
  monoText(ctx, 'CENTRE OF OUR GALAXY', 980, 760, { size: 22, color: GOLD, spacing: 0.08, align: 'right', n })
  monoText(ctx, 'THIS WAY', 980, 790, { size: 20, color: BONE, spacing: 0.1, align: 'right', n: n - 20, alpha: 0.85 })
}

// ── the backpack: on its back for the cold open and the sky; on the floor once the interview starts
const FLOOR_PACK = { x: 840, y: 1100, c: 11 }
function under(ctx, t, { x, y, size, seg }) {
  if (seg === 'personal' || seg === 'take') return
  const c = Math.max(2, size / 21)
  drawBits(ctx, PACK, PACK_C, Math.round(x - size * 0.34), Math.round(y - size * 0.02), c, { rot: -0.18 + 0.04 * Math.sin(t * 4) })
}
function floorPack(ctx, dy = 0) { drawBits(ctx, PACK, PACK_C, FLOOR_PACK.x - (dy ? 40 : 0), FLOOR_PACK.y + dy, FLOOR_PACK.c) }
function prop(ctx, t, r, { seg }) { if (seg === 'take') floorPack(ctx, 170) }   // unpacked: set down beside it

const SPEC = {
  id: 'st6sag', sign: 'sagittarius', ep: 9, duration: 45, pitch: 987.77,
  cold: [{ text: 'can we do this walking? i’ve got a *flight.*', mood: 'happy', look: [1, 0] }],
  title: { accent: 'the wanderer.', facts: [['FIRE', 'MUTABLE', 'RULED BY JUPITER'], ['THE ARCHER', 'NOV 22 – DEC 21']] },
  myth: {
    head: 'The *archer.*',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, the archer is a centaur: half human, half *horse.*' },
      { who: 'stars', tab: 1, text: 'some stories link it to Chiron, the wise healer who *taught* heroes.' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'A *teapot.*',
    map: { name: 'Sagittarius', stars: STARS, bright: 'kaus', brightCol: '#cfe2ff',
      lines: [['alnasl', 'media'], ['media', 'kaus'], ['kaus', 'alnasl'], ['media', 'borealis'], ['borealis', 'phi'], ['phi', 'media'], ['phi', 'nunki'], ['nunki', 'tau'], ['tau', 'ascella'], ['ascella', 'phi'], ['kaus', 'ascella']],
      box: { cx: 540, cy: 900, w: 760, h: 440 },
      labels: [{ star: 'kaus', text: 'KAUS AUSTRALIS', sub: 'ITS BRIGHTEST STAR', dx: -60, dy: 50, align: 'right', at: 1.5, size: 32, subSize: 22 }] },
    lines: [
      { who: 'stars', text: 'its brightest stars make a shape called the *Teapot.*' },
      { who: 'stars', text: 'and the centre of our galaxy lies in its *direction.*' },
      { text: 'so technically i’m the *centre* of everything.', mood: 'wink' },
    ],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 9 · RULED BY JUPITER',
    cutChyron: 'CUTAWAY · THE PARTNER',
    draw: (ctx) => floorPack(ctx),
    items: [
      { q: 'Q. Why always | *leaving?*', lines: [
        { text: 'i leave first so i’m never *left.*', mood: 'neutral', look: [0, 1] },
        { who: 'gemini', text: 'it unpacked for me. *all* of it.' },
      ] },
    ],
  },
  takeaway: { min: 4.4, text: 'I’m learning | to *land.*', words: 4, top: 330, size: 110, accentSize: 180, byY: 820 },
  hero: { under, prop, state: (t, seg) => seg === 'take' ? { mood: 'happy', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'personal', item: 0, at: 0.9, x: FLOOR_PACK.x + 10, y: FLOOR_PACK.y - 6 * FLOOR_PACK.c + 18, from: 'below', cell: 3, where: 'peeking out of the backpack on the interview floor (III · UP CLOSE)' },
}
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void pixLine; void INK
