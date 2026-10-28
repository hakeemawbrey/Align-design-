// st6capricorn (60 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 10) · story 0–55.6, then the shared end card.
//   A documentary profile of Capricorn (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  CAPRICORN, tie on (season 3): "you’re two minutes late. …kidding. *mostly.*"
//   TITLE      BEHIND THE SIGN · ♑ CAPRICORN · *the climber.* · EARTH · CARDINAL · RULED BY SATURN / THE SEA-GOAT ·
//              DEC 22 – JAN 19
//   I MYTH     archive footage, three tableaux: one story says Pan leapt into a river to flee the monster Typhon (a storm
//              shadow with red eyes), and the half underwater became a fish (the goat-fish swims); the goat-fish is far
//              older: Babylon linked it to the god Ea (a ziggurat), and it is one of the oldest constellations we know.
//   II SKY     the real figure (Algedi · Dabih · ψ · ω · ζ · ε · Deneb Algedi · Nashira · ι · θ). Deneb Algedi labelled
//              (the brightest, "tail of the goat"). The Tropic of Capricorn is named for the December solstice Sun.
//              Saturn, its ruler, pops in with its glasses and pointer: "it still checks my *posture.*"
//   III CLOSE  why it works ("rest feels like *waiting* to be judged."), how it loves, Cancer cutaway (fridays, soup),
//              then the calendar (season 4: booked till 2031) comes back with Friday still free.
//   TAKEAWAY   "Rest is *earned* already."
//   The ghost leans out from behind the archive ziggurat.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawSaturn } from '../../st5cast.js'
import { makeEpisode, drawBits, monoText, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const PAN = [            // Pan, running right: horns, pipes, goat legs
  '.k...k.....',
  '.kk.kk.....',
  '..hhh......',
  '.hSSSh.....',
  '..SES..pp..',
  '..SSS.ppp..',
  '.TTTTSppp..',
  'S.TTT......',
  '..FFF......',
  '..F.F......',
  '.F...F.....',
  '.d...d.....',
]
const PAN_C = { k: '#e8dcc0', h: '#5a3a22', S: '#e8b48a', E: '#2a1a12', p: '#c8963e', T: '#c9b8a0', F: '#8a6a44', d: '#3a2a14' }
const TYPHON = [         // a storm-cloud monster, coiled snake heads at its edges, red eyes
  '...cc.....cc....',
  '..cCCc...cCCc...',
  '.cCCCCcccCCCCc..',
  'cCCCCCCCCCCCCCc.',
  'CCCCRCCCCRCCCCCc',
  'CCCCCCCCCCCCCCCC',
  '.CCCCCCCCCCCCCC.',
  'cCCCCCCCCCCCCCc.',
  '.CC.CCCC.CCCC.Cc',
  '.c...CC...CC...c',
  '......c....c....',
]
const GOATFISH = [       // the sea-goat: a goat's front, horns, a curled fish tail
  '..........k..k.',
  '...........kk..',
  '.........GGGG..',
  '........GGEGGN.',
  '.......GGGGGG..',
  'tt....GGGGGG...',
  '.ttSSSSSGGG....',
  '..tSsSsSSGLL...',
  '.tt..SSSS.L.L..',
  '.........L..L..',
]
const GOATFISH_C = { k: '#e8dcc0', G: '#c9b08a', E: '#2a1a12', N: '#8a6a44', S: '#7aa0a8', s: '#5a8088', t: '#5a8088', L: '#a88a62' }
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }

function river(ctx, t, P, y0) {
  ctx.fillStyle = '#4a6a7a'; ctx.fillRect(P.x0, y0, P.x1 - P.x0, P.y1 - y0)
  ctx.fillStyle = '#8ab0c0'
  for (let xx = P.x0; xx < P.x1; xx += 36) { const o = Math.round(Math.sin(xx * 0.05 + t * 2.5) * 6); ctx.fillRect(xx, y0 + 4 + o, 20, 5) }
}
const ZIG = { x: 600, top: 760, bot: 1160 }
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // the monster Typhon (a storm shadow with red eyes, left) bears down; Pan runs right, toward the river
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1150, P.x1 - P.x0, P.y1 - 1150)
    river(ctx, t, { ...P, x0: 700 }, 1150)
    const sw = Math.round(Math.sin(t * 1.5) * 10 + clamp((t - tabAt) / 4) * 40)
    drawBits(ctx, TYPHON, { C: '#6a5a4a', c: '#9a8a74', R: '#ff5a3a' }, 250 + sw, 820, 22)
    const p = clamp((t - tabAt) / 4)
    const bob = Math.abs(Math.sin(t * 9)) * -10
    drawBits(ctx, PAN, PAN_C, Math.round(lerp(470, 620, ease.inQuad(p))), Math.round(1060 + bob), 20)
  } else if (tab === 1) {
    // the goat-fish, swimming
    river(ctx, t, P, 980)
    const y = 960 + Math.sin(t * 2) * 10
    drawBits(ctx, GOATFISH, GOATFISH_C, 540, Math.round(y), 26, { rot: Math.sin(t * 2) * 0.05 })
    for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i / 4) % 1; ctx.fillStyle = '#cfe6ee'; ctx.fillRect(Math.round(330 + i * 40), Math.round(1100 - ph * 140), 10, 10) }
  } else {
    // Babylon: a ziggurat at dusk, the goat-fish carved on its face, a star over the top
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, ZIG.bot, P.x1 - P.x0, P.y1 - ZIG.bot)
    const steps = [[440, 1060, 1160], [360, 960, 1060], [280, 860, 960], [180, ZIG.top, 860]]
    for (const [w, y0, y1] of steps) { ctx.fillStyle = INK; ctx.fillRect(ZIG.x - w / 2 - 6, y0 - 6, w + 12, y1 - y0 + 6); ctx.fillStyle = '#b08a5a'; ctx.fillRect(ZIG.x - w / 2, y0, w, y1 - y0); ctx.fillStyle = '#c8a070'; ctx.fillRect(ZIG.x - w / 2, y0, w, 8) }
    ctx.fillStyle = '#8a6a44'; ctx.fillRect(ZIG.x - 30, 1040, 60, 120)
    drawBits(ctx, GOATFISH, { ...GOATFISH_C, G: '#8a6a44', S: '#8a6a44', s: '#6a4a2a', t: '#6a4a2a', k: '#6a4a2a', L: '#6a4a2a' }, ZIG.x, 990, 8, { outline: null })
    if (Math.sin(t * 3) > -0.3) drawPixelStar(ctx, ZIG.x, 680, 34, 0, '#fff1c8', '#ffffff')
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    // Typhon's eyes glow red; the river Pan is running for glints
    const sw = Math.round(Math.sin(t * 1.5) * 10 + clamp((t - tabAt) / 4) * 40)
    drawBits(ctx, TYPHON.map(r => r.replace(/[^R]/g, '.')), { R: '#ff4a2a' }, 250 + sw, 820, 22, { outline: null })
    ctx.fillStyle = 'rgba(160,210,230,0.5)'
    for (let xx = 712; xx < 960; xx += 40) { const o = Math.round(Math.sin(xx * 0.05 + t * 2.5) * 5); ctx.fillRect(xx, 1158 + o, 22, 6); ctx.fillRect(xx + 18, 1200 - o, 16, 5) }
  } else if (tab === 1) {
    const y = 960 + Math.sin(t * 2) * 10
    ctx.save(); ctx.globalAlpha *= 0.55
    drawBits(ctx, GOATFISH.map(r => r.replace(/[^Sst]/g, '.')), { S: '#7fe0c8', s: '#4fc0a8', t: '#4fc0a8' }, 540, Math.round(y), 26, { rot: Math.sin(t * 2) * 0.05, outline: null })
    ctx.restore()
  } else if (tab === 2) {
    if (Math.sin(t * 3) > -0.3) drawPixelStar(ctx, ZIG.x, 680, 34, 0, '#f7cf68', '#ffffff')
  }
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'deneb', ra: 21.7840, dec: -16.127, mag: 2.85 },
  { id: 'dabih', ra: 20.3502, dec: -14.781, mag: 3.05 },
  { id: 'algedi', ra: 20.3009, dec: -12.545, mag: 3.57 },
  { id: 'nashira', ra: 21.6682, dec: -16.662, mag: 3.68 },
  { id: 'theta', ra: 21.0991, dec: -17.233, mag: 4.07 },
  { id: 'zeta', ra: 21.4442, dec: -22.411, mag: 3.74 },
  { id: 'omega', ra: 20.8636, dec: -26.919, mag: 4.11 },
  { id: 'psi', ra: 20.7684, dec: -25.271, mag: 4.14 },
  { id: 'iota', ra: 21.3707, dec: -16.835, mag: 4.28 },
  { id: 'eps', ra: 21.6175, dec: -19.466, mag: 4.62 },
]
let EP = null
function skyExtras(ctx, t) {
  // Saturn, Capricorn's ruler (season 4's teacher), pops in at the lower left, glasses on, pointer up
  const L = EP.LINES.sky[2], at = L.t + 0.8
  const p = easeOutBack(prog(t, at, at + 0.4), 2.2)
  if (p <= 0) return
  drawSaturn(ctx, 260, 1050, 210, t, { mood: t > L.done ? 'happy' : 'squint', look: [1, -1], pointer: true, pop: p, seed: 2 })
  ctx.save(); ctx.globalAlpha *= clamp(p)
  monoText(ctx, '♄ SATURN', 260, 1150, { size: 24, color: '#f7dca0', spacing: 0.12 })
  ctx.restore()
}

// ── the calendar (season 4: booked till 2031), Friday still free
const CAL = { x: 868, y: 1090, w: 320, h: 290 }
function drawCalendar(ctx, t, k) {
  const it = EP.T.items[2]
  const pin = ease.outCubic(prog(t, it.q + 0.1, it.q + 0.5)), po = prog(t, it.end - 0.3, it.end)
  const a = pin * (1 - po) * k
  if (a <= 0) return
  const { x, y, w, h } = CAL
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + (1 - pin) * 200); ctx.rotate(0.05)
  const ox = -w / 2, oy = -h / 2
  ctx.fillStyle = INK; ctx.fillRect(ox - 6, oy - 6, w + 12, h + 12)
  ctx.fillStyle = '#fbf6ea'; ctx.fillRect(ox, oy, w, h)
  ctx.fillStyle = '#2fa07c'; ctx.fillRect(ox, oy, w, 52)
  ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fbf6ea'; ctx.fillText('BOOKED TILL 2031', 0, oy + 27)
  const days = ['M', 'T', 'W', 'T', 'F'], cw = (w - 30) / 5, gy = oy + 70
  days.forEach((d, i) => { ctx.fillStyle = INK; ctx.fillText(d, ox + 15 + cw * (i + 0.5), gy + 6) })
  for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) {
    const cx = ox + 15 + cw * i, cy = gy + 26 + r * 62
    ctx.fillStyle = 'rgba(27,18,54,0.25)'; ctx.fillRect(cx + 3, cy, cw - 6, 54)
    if (i < 4) { ctx.fillStyle = '#d8344f'; ctx.fillRect(cx + 9, cy + 12, cw - 18, 8); ctx.fillRect(cx + 9, cy + 30, cw - 30, 8) }
  }
  // Friday: empty, and kept that way
  const fx = ox + 15 + cw * 4, fy = gy + 26
  const glow = 0.5 + 0.5 * Math.sin(t * 4)
  ctx.fillStyle = `rgba(47,199,154,${0.25 + 0.25 * glow})`; ctx.fillRect(fx + 3, fy, cw - 6, 3 * 62 - 8)
  ctx.save(); ctx.translate(fx + cw / 2, fy + 90); ctx.rotate(-Math.PI / 2)
  ctx.font = `700 26px ${MONO}`; ctx.fillStyle = '#1f7a5c'; ctx.fillText('FREE', 0, 0)
  ctx.restore()
  ctx.restore()
}

function prop(ctx, t, r, { size }) {
  drawBits(ctx, TIE, TIE_C, Math.round(r.x), Math.round(r.y + size * 0.27), size / 26, { rot: Math.sin(t * 2) * 0.05 })
}

const SPEC = {
  id: 'st6capricorn', sign: 'capricorn', ep: 10, duration: 60, pitch: 739.99,
  cold: [{ text: 'you’re two minutes late. …kidding. *mostly.*', mood: 'squint', look: [0, 0] }],
  title: { accent: 'the climber.', facts: [['EARTH', 'CARDINAL', 'RULED BY SATURN'], ['THE SEA-GOAT', 'DEC 22 – JAN 19']] },
  myth: {
    head: 'Half *goat.*',
    lines: [
      { who: 'stars', tab: 0, text: 'one story says Pan leapt into a river to flee the monster *Typhon…*' },
      { who: 'stars', tab: 1, text: '…and the half underwater became a *fish.*' },
      { who: 'stars', tab: 2, text: 'the goat-fish is far older: Babylon linked it to the god *Ea.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'The *sea-goat.*',
    map: { name: 'Capricornus', stars: STARS, bright: 'deneb', brightCol: '#cfe2ff',
      lines: [['algedi', 'dabih'], ['dabih', 'psi'], ['psi', 'omega'], ['omega', 'zeta'], ['zeta', 'eps'], ['eps', 'deneb'], ['deneb', 'nashira'], ['nashira', 'iota'], ['iota', 'theta'], ['theta', 'dabih']],
      box: { cx: 540, cy: 880, w: 760, h: 440 },
      labels: [{ star: 'deneb', text: 'DENEB ALGEDI', sub: '“TAIL OF THE GOAT”', dx: 20, dy: -90, align: 'left', at: 1.5, size: 34, subSize: 22 }] },
    lines: [
      { who: 'stars', text: 'one of the oldest constellations we know. faint, but *ancient.*' },
      { who: 'stars', text: 'the Tropic of Capricorn: named for the December solstice *Sun.*' },
      { text: 'and i’m ruled by Saturn. it still checks my *posture.*', mood: 'squint', look: [-1, 0] },
    ],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 10 · RULED BY SATURN',
    cutChyron: 'CUTAWAY · THE PARTNER',
    draw: (ctx, t, { k }) => drawCalendar(ctx, t, k),
    items: [
      { q: 'Q. Why do you | *work* so much?', lines: [{ text: 'i work because rest feels like *waiting* to be judged.', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'i show up. on time. every time. with a *plan.*', mood: 'happy' },
        { who: 'cancer', text: 'it rests on fridays now. i make the *soup.*' },
      ] },
      { q: 'Q. The *calendar?*', lines: [{ text: 'still booked till 2031. but friday stays *free.*', mood: 'happy', look: [1, 0] }] },
    ],
  },
  takeaway: { min: 5, text: 'Rest is | *earned* already.', words: 4, top: 330, size: 110, accentSize: 170, byY: 820 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'sleepy', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'neutral' } },
  ghost: { seg: 'myth', at: 0, x: ZIG.x + 220, y: 1100, from: 'left', cell: 3, where: 'leaning out from behind the right side of the archive ziggurat (I · THE MYTH, Babylon)' },
}
SPEC.ghost.t = +(makeEpisode(SPEC).T.tabs[2] + 1.6).toFixed(3)
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void BONE; void GOLD
