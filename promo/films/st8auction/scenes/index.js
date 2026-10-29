// st8auction (25 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E17 · charity auction) · story 0–20.6, then
// the shared end card.
//   "Going once… | your ex’s *hoodie.*"  The Auntie Council (♋ Cancer on the gavel, ♉ Taurus spotting, both in their
//   season-2 reading glasses) auctions everyone's leftover keepsakes for charity: velvet curtains, a spotlit pedestal,
//   LOT placards, a GOING ONCE / TWICE / SOLD board and a crowd of paddles.
//   0.00–4.20  frame 0: the gavel up, the hoodie in the spotlight, the hook card. CANCER: "lot seven: one hoodie…"
//              (3.0: a punch-in on the hoodie)
//   4.30–7.10  TAURUS: "it's for charity, sweetie. *bid.*"  Paddles go up. (4.6: the ghost peeks round the right curtain;
//              6.0: the hidden comet crosses the high window)
//   7.20–10.6  the lot montage, a whip-pan each: LOT 8 plaid shirt, LOT 9 mixtape, LOT 10 one sock, each SOLD with a tap.
//  10.60–14.2  back to the hoodie. CANCER: "the hoodie. going once… going *twice…*"  Silence. One paddle rises in the back
//              row: "BOO". It's the ghost.
//  14.20–16.2  BANG. SOLD! CANCER: "SOLD to the *ghost!*"  The hoodie floats off to the back row.
//  16.20–20.6  frame 0's framing again, the pedestal empty, the board: "GONE." Last line: "Let it *go.* Once."
// Rewatch bait: LOT 10's card says the other sock "LEFT TOO".
// One canvas (sky + hall + aunties + crowd), DOM type + the dialogue box, grain on top. Pure f(t).
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, drawGhostSheet } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawComet, drawDayChip, hookCard, hookCues, stingerCues, genreBug } from '../../st8cast.js'
import { auntie } from './aunties.js'
import { clamp, lerp, prog, ease, easeOutBack, pop01, popOut, r3, BMP, bits, pixFont, punch, burst, wordPops, GOLD, BONE, INK, PINK } from './kit.js'

export const DURATION = 25
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const VELVET = '#6a1830', VELV2 = '#8c2442'
const CAN = signStar('cancer'), TAU = signStar('taurus')
const CANN = `${CAN.glyph} AUNTIE CANCER`, TAUN = `${TAU.glyph} AUNTIE TAURUS`

// ── the timeline
const T = {
  hookOut: [2.75, 3.0], sniff: 3.0, l1: 0.5, open: 0.3,
  l2: 4.3, paddles: 5.0, ghost: 4.6, comet: 6.0,
  lots: [7.2, 8.3, 9.4], back: 10.6, l3: 7.4, l4: 11.5, twice: 12.75, hush: 12.9,
  boo: 13.3, bang: 14.2, l5: 14.35, fly: [15.0, 16.0],
  rhyme: 16.2, close: 16.25, last: 16.45, lastLand: 16.95, out: [20.0, 20.45],
}
const LINES = [
  { t: T.l1, speaker: CANN, text: 'lot seven: one hoodie. still smells like *them.*', color: CAN.color },
  { t: T.l2, speaker: TAUN, text: 'it’s for charity, sweetie. *bid.*', color: TAU.color },
  { t: T.l3, speaker: CANN, text: 'plaid shirt! mixtape! one sock! it all *goes.*', color: CAN.color },
  { t: T.l4, speaker: CANN, text: 'the hoodie. going once… going *twice…*', color: CAN.color },
  { t: T.l5, speaker: CANN, text: 'SOLD to the *ghost!*', color: CAN.color },
]
const CPS = 28
export const GHOST = { at: T.ghost, x: 1000, y: 820, where: 'leaning out from behind the right-hand velvet curtain, beside the bid board' }
export const COMET = { at: T.comet, where: 'tiny, across the high arched window at the back of the hall' }

// ── the lots
const HOODIE = BMP(`
....hhh..hhh....
...hHHHhhHHHh...
..hHHHHHHHHHHh..
.hHHHHHddHHHHHh.
hHHHHHHddHHHHHHh
hHHHhHHHHHHhHHHh
hHHHhHHHHHHhHHHh
hHHHhHppppHhHHHh
hhhhhHpPPpHhhhhh
....hHppppHh....
....hHHHHHHh....
....hhhhhhhh....`)
const HOODIE_C = { h: '#5a4a9a', H: '#7c6cd0', d: '#efe6d6', p: '#5a4a9a', P: '#9a8ae6' }
const PLAID = BMP(`
...rRr..rRr...
..rRrRrrRrRr..
.rRrRrRrRrRrR.
rRkRrRkRrRkRrR
rRkRrRkRrRkRrR
kkkkkkkkkkkkkk
rRkRrRkRrRkRrR
...rRkRrRkR...
...rRkRrRkR...
...kkkkkkkk...
...rRkRrRkR...`)
const PLAID_C = { r: '#b23a3a', R: '#e05a4a', k: '#2a1a2a' }
const TAPE = BMP(`
kkkkkkkkkkkkkkkk
kwwwwwwwwwwwwwwk
kwPPPPPPPPPPPPwk
kwPkkkPPPPkkkPwk
kwPkWkPPPPkWkPwk
kwPkkkPPPPkkkPwk
kwPPPPPPPPPPPPwk
kwwwwkkkkkkwwwwk
kkkkkkkkkkkkkkkk`)
const TAPE_C = { k: '#2a2238', w: '#efe6d6', P: '#ff8fb1', W: '#ffffff' }
const SOCK = BMP(`
..ssssss
..sSSSSs
..ssssss
..sWWWWs
..sWWWWs
..sWWWWs
..sWWWWs
.sWWWWWs
sWWWWWWs
sWWWWWs.
.sssss..`)
const SOCK_C = { s: '#3fb6f0', S: '#9fe0ff', W: '#efe6d6' }
const GAVEL = BMP(`
.hhhhhhh.
hHHHHHHHh
hHHHHHHHh
.hhhhhhh.
....s....
....s....
....s....
....s....
....s....
....s....`)
const GAVEL_C = { h: '#6a3a1a', H: '#a8653a', s: '#c98a4a' }
const HEART = BMP('.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...')

const LOTS = [
  { n: 7, name: 'THE HOODIE', note: 'WORN ONCE. MISSED DAILY.', bm: HOODIE, col: HOODIE_C, cell: 19 },
  { n: 8, name: 'PLAID SHIRT', note: 'DONATED BY ♐', bm: PLAID, col: PLAID_C, cell: 20, sold: '#12' },
  { n: 9, name: 'MIXTAPE', note: 'SIDE B: ALL SAD SONGS', bm: TAPE, col: TAPE_C, cell: 17, sold: '#4' },
  { n: 10, name: 'ONE SOCK', note: 'THE OTHER ONE LEFT TOO', bm: SOCK, col: SOCK_C, cell: 21, sold: '#9' },
]
const lotAt = t => (t < T.lots[0] || t >= T.back ? 0 : t < T.lots[1] ? 1 : t < T.lots[2] ? 2 : 3)
const lotStart = t => [0, ...T.lots][lotAt(t)] || (t >= T.back ? T.back : 0)
const SOLD_TAPS = T.lots.map(a => r3(a + 0.72))

// ── the stage
const POD = { x: 265, y: 1150 }
const PED = { x: 680, y: 1130 }
const BOARD = { x: 560, y: 600 }
const WINDOW = { x0: 750, x1: 890, y0: 640, y1: 840 }
const CROWD = [
  { x: 150, y: 1335, s: 112, id: 'libra', n: '#12' }, { x: 300, y: 1315, s: 104, id: 'gemini', n: '#4' },
  { x: 450, y: 1340, s: 116, id: 'pisces', n: '#9' }, { x: 680, y: 1320, s: 106, id: 'leo', n: '#7' },
  { x: 820, y: 1340, s: 114, id: 'virgo', n: '#2' }, { x: 950, y: 1318, s: 104, id: 'aries', n: '#1' },
]
const GHOST_BIDDER = { x: 590, y: 1215 }

function gavelRot(t) {
  if (t < 0.45) return -1.15
  let r = -1.15 * (1 - ease.inOutQuad(prog(t, 0.45, 0.9)))
  for (const a of SOLD_TAPS) { const p = prog(t, a - 0.18, a + 0.12); if (p > 0 && p < 1) r += p < 0.6 ? -0.7 * Math.sin(Math.PI * p / 0.6) * (p < 0.5 ? 1 : 0) : 0 }
  const w = prog(t, T.bang - 0.55, T.bang)
  if (w > 0 && t < T.bang) r = w < 0.7 ? -1.3 * ease.outCubic(w / 0.7) : -1.3 * (1 - ease.inQuad((w - 0.7) / 0.3))
  if (t >= T.bang) r = 0.06 * Math.exp(-(t - T.bang) * 8) * Math.cos((t - T.bang) * 30)
  return r
}
function boardText(t) {
  if (t >= T.rhyme) return 'GONE.'
  if (t >= T.bang) return 'SOLD!'
  if (t >= T.twice) return 'GOING TWICE…'
  if (t >= T.back) return 'GOING ONCE…'
  if (t >= T.lots[0]) { const i = lotAt(t) - 1; return t >= SOLD_TAPS[i] ? 'SOLD!' : `LOT ${LOTS[i + 1].n}` }
  return 'GOING ONCE…'
}
function cancerState(t) {
  if (t < T.l2) return { mood: 'happy', look: [1, 0] }
  if (t < T.l3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.back) return { mood: 'wink', look: [1, 1] }
  if (t < T.boo) return { mood: 'squint', look: [1, 1] }
  if (t < T.bang) return { mood: 'wide', look: [1, 1], blink: false }
  return { mood: 'happy', look: [1, 0] }
}
function taurusState(t) {
  if (t < T.l2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.lots[0]) return { mood: 'happy', look: [0, 1] }
  if (t < T.boo) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.bang + 0.6) return { mood: 'wide', look: [-1, 1], blink: false }
  return { mood: 'heart', look: [0, 0] }
}
const C_HOPS = [...talkHops(LINES, CANN, { cps: CPS }), T.bang]
const T_HOPS = [...talkHops(LINES, TAUN, { cps: CPS }), T.bang + 0.05]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  // the crowd's silhouettes are drawn into their own canvas, then filled dark
  const crowdC = document.createElement('canvas'); crowdC.width = 1080; crowdC.height = 1920
  const cx = crowdC.getContext('2d')
  const hook = hookCard(root, { text: 'Going once… | your ex’s *hoodie.*', at: 0, out: T.hookOut[0], size: 100, accentSize: 160, top: 170, accentColor: PINK })
  const LAST = popText(root, 'Let it *go.* | Once.', { top: 210, size: 128, accentSize: 196, at: T.last, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const box = dialogueBox(root, { lines: LINES, y: 1550, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function hall(t) {
    // back wall + the high window (night sky, the hidden comet)
    x.fillStyle = '#2a1626'; x.fillRect(0, 480, 1080, 900)
    const { x0, x1, y0, y1 } = WINDOW
    x.save(); x.beginPath(); x.rect(x0, y0 + 40, x1 - x0, y1 - y0 - 40); x.arc((x0 + x1) / 2, y0 + 40, (x1 - x0) / 2, Math.PI, 0); x.clip()
    drawSky(x, t, { ...SKY_H, dim: 0.9 })
    if (t > T.comet && t < T.comet + 1.4) { const p = prog(t, T.comet, T.comet + 1.4); drawComet(x, lerp(x1 + 20, x0 - 20, p), lerp(y0 + 60, y1 - 60, p), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [1, -0.3] }) }
    x.restore()
    x.strokeStyle = '#c99a4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(x0, y1); x.lineTo(x0, y0 + 40); x.arc((x0 + x1) / 2, y0 + 40, (x1 - x0) / 2, Math.PI, 0); x.lineTo(x1, y1); x.closePath(); x.stroke()
    x.fillStyle = '#c99a4a'; x.fillRect((x0 + x1) / 2 - 3, y0, 6, y1 - y0)
    // velvet curtains (folds), top swag
    const fold = (x0, w, y0, h, sway) => { for (let i = 0; i < w; i += 30) { x.fillStyle = (i / 30) % 2 ? VELVET : VELV2; x.fillRect(x0 + i + Math.sin(t * 0.8 + i) * sway, y0, 30, h) } }
    fold(0, 150, 480, 900, 1.5); fold(930, 150, 480, 900, 1.5)
    x.fillStyle = VELVET; x.fillRect(0, 470, 1080, 70)
    for (let i = 0; i < 1080; i += 60) { x.fillStyle = VELV2; x.beginPath(); x.arc(i + 30, 540, 30, 0, Math.PI); x.fill() }
    x.fillStyle = GOLD; for (let i = 0; i < 1080; i += 20) x.fillRect(i, 568 + (i % 40 ? 0 : 6), 10, 6)
    // the stage floor
    x.fillStyle = '#3a2418'; x.fillRect(-200, 1260, 1480, 400)
    x.fillStyle = '#4e3020'; x.fillRect(0, 1260, 1080, 10)
  }
  function board(t) {
    const txt = boardText(t), ch = [T.back, T.twice, T.bang, T.rhyme, ...T.lots, ...SOLD_TAPS].filter(a => a <= t).sort((a, b) => b - a)[0] ?? -9
    const k = 1 + 0.12 * Math.exp(-(t - ch) * 9) * Math.cos((t - ch) * 24)
    x.save(); x.translate(BOARD.x, BOARD.y + 40); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-260, -56, 520, 112); x.fillStyle = '#120a1e'; x.fillRect(-250, -46, 500, 92)
    for (let i = 0; i < 12; i++) { x.fillStyle = (Math.floor(t * 4) + i) % 3 ? '#f7d78a' : '#5a4a2a'; x.fillRect(-244 + i * 42, -42, 8, 8); x.fillRect(-244 + i * 42, 34, 8, 8) }
    pixFont(x, txt, 0, 2, txt.length > 9 ? 44 : 56, txt.startsWith('SOLD') || txt === 'GONE.' ? '#ff6b8e' : GOLD)
    x.restore()
  }
  function podium(t) {
    const r = auntie(x, POD.x, POD.y - 150, 250, t, { alpha: clamp(popOut(t, T.out)), color: CAN.color, glyph: CAN.glyph, ...cancerState(t), hops: C_HOPS, seed: 3, glasses: { frame: '#7a1f3d', chain: true } })
    // gavel, held on the right
    const gr = gavelRot(t), hx = r.x + 120, hy = r.y + 40
    x.save(); x.translate(hx, hy); x.rotate(gr - 0.2)
    bits(x, GAVEL, 0, -40, 9, GAVEL_C)
    x.restore()
    // the podium front (covers the lower star)
    x.fillStyle = INK; x.fillRect(POD.x - 150, POD.y - 40, 300, 300)
    x.fillStyle = '#6a3a1a'; x.fillRect(POD.x - 142, POD.y - 32, 284, 290)
    x.fillStyle = '#8a4e26'; x.fillRect(POD.x - 160, POD.y - 52, 320, 30)
    x.fillStyle = GOLD; x.fillRect(POD.x - 90, POD.y + 40, 180, 70)
    pixFont(x, 'AUNTIE', POD.x, POD.y + 62, 22, INK, { shadow: null }); pixFont(x, 'COUNCIL', POD.x, POD.y + 88, 22, INK, { shadow: null })
    // the sound block the gavel strikes
    x.fillStyle = '#4a2a14'; x.fillRect(hx - 10, POD.y - 70, 80, 20)
    if (t >= T.bang) burst(x, t, hx + 30, POD.y - 70, T.bang, 12, 120, [GOLD, BONE, PINK])
    SOLD_TAPS.forEach(a => burst(x, t, hx + 30, POD.y - 70, a, 6, 60, [GOLD, BONE], { life: 0.4, size: 16 }))
  }
  function pedestal(t) {
    // the spotlight
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 560, 0, 1260)
    g.addColorStop(0, 'rgba(255,240,200,0.05)'); g.addColorStop(1, 'rgba(255,240,200,0.26)')
    x.fillStyle = g; x.beginPath(); x.moveTo(PED.x - 40, 560); x.lineTo(PED.x + 40, 560); x.lineTo(PED.x + 230, 1260); x.lineTo(PED.x - 230, 1260); x.closePath(); x.fill()
    x.restore()
    x.fillStyle = INK; x.fillRect(PED.x - 130, PED.y - 10, 260, 140)
    x.fillStyle = '#d8cdb8'; x.fillRect(PED.x - 122, PED.y - 2, 244, 124); x.fillStyle = '#efe6d6'; x.fillRect(PED.x - 150, PED.y - 28, 300, 30)
    // the lot on top: whip-pan in on each change, the hoodie floats away when sold
    const i = lotAt(t), L = LOTS[i], t0 = lotStart(t)
    const wp = ease.outCubic(prog(t, t0, t0 + 0.28)), dx = t0 > 0 ? (1 - wp) * 900 : 0
    let ix = PED.x + dx, iy = PED.y - 150 + Math.sin(t * 2) * 6, sc = 1 + punch(t, T.sniff, 1.1, 0.25), a = 1
    if (i === 0 && t >= T.fly[0]) { const p = ease.inOutCubic(prog(t, ...T.fly)); ix = lerp(PED.x, GHOST_BIDDER.x, p); iy = lerp(iy, GHOST_BIDDER.y - 60, p) - Math.sin(Math.PI * p) * 260; sc = lerp(1, 0.45, p); a = t >= T.fly[1] ? 0 : 1 }
    if (a > 0 && t < T.rhyme) bits(x, L.bm, ix, iy, L.cell * sc, L.col, { rot: Math.sin(t * 1.5) * 0.04 })
    // sniff lines over the hoodie (it "still smells like them")
    if (i === 0 && t > T.sniff && t < T.l2) for (let k = 0; k < 3; k++) { const p = ((t - T.sniff) * 0.8 + k / 3) % 1; bits(x, HEART, ix - 80 + k * 80, iy - 150 - p * 90, 4, { X: '#ff8fb1' }, { a: Math.sin(Math.PI * p) }) }
    // the lot card
    x.save(); x.translate(PED.x + dx * 0.6, PED.y + 70)
    x.fillStyle = INK; x.fillRect(-110, -44, 220, 88); x.fillStyle = '#fff7e6'; x.fillRect(-104, -38, 208, 76)
    pixFont(x, t >= T.rhyme ? 'LOT 7 · SOLD' : `LOT ${L.n}`, 0, -18, 24, '#7a1f3d', { shadow: null })
    pixFont(x, t >= T.rhyme ? 'TO THE GHOST' : L.name, 0, 12, 20, INK, { shadow: null })
    x.restore()
    if (t < T.rhyme && t >= T.lots[0] && t < T.back) pixFont(x, L.note, PED.x, PED.y - 270, 24, BONE, { alpha: clamp(prog(t, t0 + 0.2, t0 + 0.4)) })
    if (i === 0 && t < T.lots[0]) pixFont(x, LOTS[0].note, PED.x, PED.y - 300, 24, BONE, { alpha: clamp(prog(t, 3.2, 3.5)) * (1 - prog(t, 6.8, 7.1)) })
    // SOLD stamps on the montage lots
    for (let n = 0; n < 3; n++) {
      const a0 = SOLD_TAPS[n], p = prog(t, a0 - 0.05, a0 + 0.1)
      if (t < a0 - 0.05 || t >= (T.lots[n + 1] ?? T.back)) continue
      x.save(); x.translate(PED.x, PED.y - 150); x.rotate(-0.2); const s = lerp(1.8, 1, ease.outCubic(p)); x.scale(s, s); x.globalAlpha = clamp(p * 2)
      x.strokeStyle = '#ff4f6e'; x.lineWidth = 8; x.strokeRect(-150, -44, 300, 88)
      pixFont(x, `SOLD ${LOTS[n + 1].sold}`, 0, 2, 46, '#ff4f6e', { shadow: null })
      x.restore()
    }
  }
  function taurus(t) {
    auntie(x, 880, 1070, 185, t, { alpha: clamp(popOut(t, T.out)), color: TAU.color, glyph: TAU.glyph, ...taurusState(t), hops: T_HOPS, seed: 8, glasses: { frame: '#5a3a14' } })
  }
  function paddleUp(t, m, i) {
    if (t < T.paddles) return 0
    if (t < T.lots[0]) return easeOutBack(prog(t, T.paddles + i * 0.08, T.paddles + i * 0.08 + 0.3), 2)
    if (t < T.back) { const L = lotAt(t) - 1; return LOTS[L + 1].sold === m.n ? 1 : 0.15 + 0.15 * Math.sin(t * 5 + i) }
    return 0
  }
  function crowd(t) {
    cx.clearRect(0, 0, 1080, 1920)
    const hush = t >= T.hush && t < T.bang
    for (const [i, m] of CROWD.entries()) {
      const st = signStar(m.id)
      drawStarChar(cx, m.x, m.y + (hush ? 6 : 0), m.s, t, { color: st.color, mood: 'neutral', seed: 20 + i, bob: hush ? 0 : 3, glow: 0 })
    }
    cx.save(); cx.globalCompositeOperation = 'source-in'; cx.fillStyle = '#140a1c'; cx.fillRect(0, 0, 1080, 1920); cx.restore()
    // paddles (drawn before the silhouettes so the heads overlap the sticks)
    for (const [i, m] of CROWD.entries()) {
      const k = paddleUp(t, m, i)
      const py = m.y - 40 - k * 120
      x.fillStyle = '#7a5a3a'; x.fillRect(m.x + 34, py, 8, 100)
      x.fillStyle = INK; x.fillRect(m.x - 6, py - 70, 88, 76); x.fillStyle = '#fff7e6'; x.fillRect(m.x, py - 64, 76, 64)
      pixFont(x, m.n, m.x + 38, py - 32, 30, INK, { shadow: null })
    }
    x.drawImage(crowdC, 0, 0)
  }
  function ghostBidder(t) {
    if (t < T.boo) return
    const k = easeOutBack(prog(t, T.boo, T.boo + 0.4), 1.8)
    const ok = t < T.rhyme ? 1 : 1 - prog(t, T.rhyme, T.rhyme + 0.3)
    const gy = lerp(GHOST_BIDDER.y + 120, GHOST_BIDDER.y, k)
    x.save(); x.globalAlpha = ok
    // paddle "BOO"
    const py = gy - 130
    const bx = GHOST_BIDDER.x - 150
    x.fillStyle = '#7a5a3a'; x.fillRect(bx - 4, py, 8, 120)
    x.fillStyle = INK; x.fillRect(bx - 54, py - 80, 108, 86); x.fillStyle = '#fff7e6'; x.fillRect(bx - 48, py - 74, 96, 74)
    pixFont(x, 'BOO', bx, py - 37, 34, INK, { shadow: null })
    drawGhostSheet(x, t, GHOST_BIDDER.x - 30, gy, 5, { look: t < T.bang ? [1, -1] : [0, 0], wide: t >= T.boo + 0.3 && t < T.bang, blush: t >= T.bang ? 1 : 0.4 })
    if (t >= T.fly[1]) bits(x, HOODIE, GHOST_BIDDER.x - 30, gy + 40, 5, HOODIE_C, { a: clamp(prog(t, T.fly[1], T.fly[1] + 0.15)) })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const zG = punch(t, T.boo + 0.1, 1.0, 0.28), zB = punch(t, T.bang, 0.6, 0.08)
      x.save(); x.globalAlpha = clamp(ok)
      const zx = zG > 0 ? GHOST_BIDDER.x : 540, zy = zG > 0 ? GHOST_BIDDER.y : 1000, zk = 1 + zG + zB
      x.translate(540, 480); x.scale(1.22, 1.22); x.translate(-540, -480)
      x.translate(zx, zy); x.scale(zk, zk); x.translate(-zx, -zy)
      hall(t)
      board(t)
      drawGhostCameo(x, t, { x: 930, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
      pedestal(t)
      taurus(t)
      podium(t)
      crowd(t)
      ghostBidder(t)
      // the hush: a dim + a spotlight on the hall
      const hk = prog(t, T.hush, T.hush + 0.3) * (1 - prog(t, T.bang, T.bang + 0.2))
      if (hk > 0) { x.fillStyle = `rgba(4,2,10,${0.4 * hk})`; x.fillRect(0, 480, 1080, 1000) }
      x.restore()
      genreBug(x, t, { text: 'LIVE AUCTION', x: 70, y: 232, color: '#ff4f6e', blink: true, alpha: t < T.hookOut[1] ? 0 : 1 })
      drawDayChip(x, t, { day: 28, phase: 'morning' })
      hook.update(t)
      box.update(t)
      LAST.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.2 (into the lot montage), 10.6 (back to the hoodie). cardfx keeps the second.
const CUTS = [{ t: 7.15, kind: 'flip' }, { t: 10.55, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E17' }), cardCuts(CUTS)]

export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['pop', T.open, 739.99, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [CANN]: 880, [TAUN]: 660 } }),
  ['whoosh', T.sniff - 0.05, 0.3, 0.025], ['bell', T.sniff + 0.1, 1567.98, 0.02, 1.2, 0.3],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.paddles + i * 0.08), [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i], 0.03, (i - 2.5) * 0.2]),
  ['tick', T.ghost + 0.05, 0.015], ['glitter', T.comet, T.comet + 0.6],
  ...T.lots.map(a => ['whoosh', r3(a - 0.05), 0.28, 0.045]),
  ...SOLD_TAPS.flatMap(a => [['tick', a, 0.12], ['pop', r3(a + 0.02), 1174.66, 0.04, -0.4]]),
  ['whoosh', T.back - 0.05, 0.3, 0.04],
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.hush + 0.1 + i * 0.04), 0.025 + i * 0.004]),
  ['pop', T.boo, 1318.51, 0.05, 0.3], ['pop', T.boo + 0.12, 1567.98, 0.04, 0.3],
  ['tick', T.bang - 0.01, 0.16], ['boom', T.bang, 0.4], ['crash', T.bang, { gain: 0.06, len: 2 }], ['glitter', T.bang, T.bang + 0.8],
  ...stingerCues(T.bang + 0.02, { key: KEY, kind: 'gameshow' }),
  ['whoosh', T.fly[0], 0.8, 0.035], ['pop', T.fly[1], 1174.66, 0.04, 0.4],
  ...wordPops(T.last, 3, 0.09, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['bell', T.lastLand + 0.05, 1760, 0.025, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
