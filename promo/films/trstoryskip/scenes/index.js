// trstoryskip: STORYTIME: HOW WE MET, "We matched on the blind card I almost skipped." (45 s vertical, Star Talk Trends
// §19.1, music: cinematic · Dm). Story 0–40.6, then the shared end card. The format look lives in ./story.js (identical in
// all five STORYTIME films). ♑ Capricorn tells it from the couch; ♓ Pisces (the roommate) cries on the other end.
//   0.0–5.6    "We matched on the card | I *almost skipped.*"  "ok. storytime. how we met." (the framed photo on the
//              wall is a blind mystery card with a 7 on it: rewatch bait)
//   5.6–13.9   FLASHBACK, MARCH · 11:48 PM. "Tonight's deck. | *Card seven.*"  The phone: three blind cards flicked
//              away, SKIP SKIP SKIP (rule of three). Card seven turns over: TALKS TO PIGEONS (the rest of it fogged).
//              The tap ring drifts to SKIP and hovers… "card seven: pigeons. *nope.*"
//   13.9–18.4  "Then I looked | *again.*"  "but I gave it *one* more look." Pisces gasps into the tissues.
//  18.38       card cut.
//   18.4–27.8  FLASHBACK, 11:52 PM. "One more | *look.*"  The rest of card seven writes on: LOVES A PLAN · MAKES THE
//              LISTS. Capricorn's PiP goes heart-eyed. ♥ → MATCHED. Then, face last: the fog lifts on an ♒ Aquarius
//              waving… with a pigeon on its head.
//   27.8–33.4  "Six months | *later.*"  Aquarius pops onto the couch, the pigeon riding along. "we have a pigeon
//              now. it has a *spreadsheet.*" Pisces scoots to the arm, still crying.
//   33.4       LESSON UNLOCKED: "Give it | *one more look.*"  +1 PIGEON (ADOPTED)
//   37.95      "Never *skip.*"
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, starFrame, drawMysteryCard, drawPhoneFrame, pop01, outK, r3,
  GOLD, BONE, PINK, INK, LAV, MONO, INTER, FR,
} from './story.js'

const ACC = '#b99cff'
const PIGEON = ['...DD.....', '..DDDD....', '..DWKD....', '.ODDDD....', '...PPG....', '...PPGG...', '...GGGGGGD', '..GGGGGGDD', '..GGGGGDD.', '...GGGG...', '....O.O...']
const PIG_C = { D: '#5d6680', W: '#ffffff', K: INK, O: '#e0a050', P: '#6fd3a8', G: '#a7afc4' }
const drawPigeon = (x, t, cx, cy, cell, { flip = false, alpha = 1 } = {}) => drawBits(x, PIGEON, PIG_C, cx, cy + Math.abs(Math.sin(t * 5)) * -cell * 0.6, cell, { sx: flip ? -1 : 1, alpha, rot: 0.08 * Math.sin(t * 5) })

// ── flashback 1: tonight's deck at 11:48 PM
const SKIPS = [
  { at: 0.5, traits: ['runs at 5 AM', 'loves jazz'] },
  { at: 1.3, traits: ['owns a kayak', 'hates maps'] },
  { at: 2.05, traits: ['just vibes', 'no plans ever'] },
]
const C7 = { in: 3.0, flip: [3.35, 3.75], hover: 5.2 }
const SCR = { cx: 540, cy: 880, w: 600, h: 800 }
function screen(x, t, title, card) {
  const S = drawPhoneFrame(x, SCR.cx, SCR.cy, SCR.w, SCR.h, { title })
  // buttons
  const by = S.y + S.h - 70
  const btn = (cx, txt, col, press) => { const s = 1 - 0.12 * press; x.save(); x.translate(cx, by); x.scale(s, s); x.fillStyle = INK; x.fillRect(-96, -40, 192, 80); x.fillStyle = col; x.fillRect(-90, -34, 180, 68); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2); x.restore() }
  return { S, by, btn }
}
function tapRing(x, t, cx, cy, k, press = 0) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  x.strokeStyle = BONE; x.lineWidth = 8
  const r = 52 * (1 - 0.3 * press) + 4 * Math.sin(t * 9)
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(239,230,214,0.35)'; x.beginPath(); x.arc(cx, cy, r - 10, 0, Math.PI * 2); x.fill()
  x.restore()
}
function flash1(x, t, lt) {
  x.fillStyle = '#121838'; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  // a dark bedroom: the moon in the window, the bedside lamp off, the phone's glow
  x.fillStyle = '#1a2250'; x.fillRect(FR.x + 40, FR.y + 120, 200, 220); x.fillStyle = '#f4e8cc'; x.fillRect(FR.x + 160, FR.y + 160, 36, 36)
  const gl = x.createRadialGradient(540, 880, 50, 540, 880, 560); gl.addColorStop(0, 'rgba(120,150,255,0.25)'); gl.addColorStop(1, 'rgba(120,150,255,0)')
  x.fillStyle = gl; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  const { S, by, btn } = screen(x, t, "TONIGHT'S DECK")
  // the card counter
  const n = lt < SKIPS[1].at ? 4 : lt < SKIPS[2].at ? 5 : lt < C7.in ? 6 : 7
  x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText(`CARD ${n}`, SCR.cx, S.y + 92)
  const CY = 850
  let skipPress = 0
  SKIPS.forEach((c, i) => {
    const nx = SKIPS[i + 1]?.at ?? C7.in
    const ent = ease.outCubic(prog(lt, c.at - 0.25, c.at)), ex = ease.inCubic(prog(lt, nx - 0.3, nx - 0.05))
    if (ent <= 0 || ex >= 1) return
    const cx = SCR.cx + (1 - ent) * 500 - ex * 620, rot = -ex * 0.5
    drawMysteryCard(x, t, cx, CY, 300, { rot, traits: c.traits, face: 0, accent: '#7c74f0' })
    const sk = pop01(lt, nx - 0.5, 0.18, 2.6)
    if (sk > 0.01 && ex < 0.6) label(x, cx, CY - 40, 'SKIP', sk, { size: 52, bg: '#ff5a6e', color: BONE, rot: -0.2 })
    skipPress = Math.max(skipPress, Math.sin(Math.PI * prog(lt, nx - 0.55, nx - 0.35)))
  })
  // card seven
  const e7 = ease.outCubic(prog(lt, C7.in - 0.3, C7.in))
  if (e7 > 0) {
    const fl = ease.inOutCubic(prog(lt, ...C7.flip))
    drawMysteryCard(x, t, SCR.cx + (1 - e7) * 500, CY, 300, { flip: fl, traits: ['TALKS TO', 'PIGEONS', '· · ·'], face: 0, accent: ACC })
    if (lt > C7.flip[1]) {
      const sq = pop01(lt, C7.flip[1] + 0.1, 0.3, 2.4)
      label(x, SCR.cx + 210, CY - 210, 'CARD 7', sq, { size: 30, bg: ACC, rot: 0.12 })
    }
  }
  btn(SCR.cx - 130, 'SKIP', '#c9c4d8', skipPress)
  btn(SCR.cx + 130, '♥', PINK, 0)
  // the tap ring: drifts to SKIP and hovers (wobbling) until the cut
  const rk = clamp(prog(lt, 4.4, 4.8)), hv = ease.inOutCubic(prog(lt, 4.4, C7.hover))
  tapRing(x, t, lerp(SCR.cx + 40, SCR.cx - 130, hv) + (lt > C7.hover ? 10 * Math.sin(lt * 7) : 0), lerp(by - 180, by, hv) + (lt > C7.hover ? 8 * Math.sin(lt * 11) : 0), rk)
}

// ── flashback 2: one more look (11:52 PM), MATCHED, then face last
const F2 = { zoom: [0.1, 0.6], t2: 1.3, t3: 2.3, heart: 4.0, tap: 4.4, matched: 4.5, face: [5.6, 6.8], wave: 6.9 }
function aquaFace(t) {
  return (x, cx, cy) => {
    const F = signChar(x, t, 'aquarius', cx, cy + 50, 210, { mood: 'happy', hops: [18.378 + F2.wave, 18.378 + F2.wave + 0.55, 18.378 + F2.wave + 1.1], seed: 9, glyph: true })
    drawPigeon(x, t, cx + 8, F.top - 30, 7)
  }
}
function flash2(x, t, lt) {
  x.fillStyle = '#121838'; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  const gl = x.createRadialGradient(540, 880, 50, 540, 880, 560); gl.addColorStop(0, 'rgba(255,150,210,0.22)'); gl.addColorStop(1, 'rgba(255,150,210,0)')
  x.fillStyle = gl; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  const { S, by, btn } = screen(x, t, "TONIGHT'S DECK")
  x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('CARD 7', SCR.cx, S.y + 92)
  const z = ease.inOutCubic(prog(lt, ...F2.zoom))
  const traits = ['TALKS TO PIGEONS', lt > F2.t2 ? 'LOVES A PLAN' : '· · ·', lt > F2.t3 ? 'MAKES THE LISTS' : '']
  const w = lerp(300, 340, z)
  drawMysteryCard(x, t, SCR.cx, 880, w, { traits, face: ease.inOutCubic(prog(lt, ...F2.face)), faceFn: aquaFace(t), accent: ACC })
  // the second look: a magnifier sweeps the new lines
  for (const [at, yy] of [[F2.t2, 990], [F2.t3, 1032]]) {
    const k = Math.sin(Math.PI * prog(lt, at - 0.1, at + 0.6))
    if (k > 0.01) { x.save(); x.globalAlpha = k; x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(SCR.cx - 120 + 240 * prog(lt, at - 0.1, at + 0.6), yy, 46, 0, Math.PI * 2); x.stroke(); x.fillStyle = GOLD; x.fillRect(SCR.cx - 80 + 240 * prog(lt, at - 0.1, at + 0.6), yy + 34, 14, 40); x.restore() }
    sparkles(x, t, SCR.cx + 120, yy, F2.t2 === at ? 18.378 + at + 0.4 : 18.378 + at + 0.4, 6, 60, at, [GOLD, BONE])
  }
  const press = Math.sin(Math.PI * prog(lt, F2.tap - 0.1, F2.tap + 0.15))
  btn(SCR.cx - 130, 'SKIP', '#c9c4d8', 0)
  btn(SCR.cx + 130, '♥', PINK, press)
  const hv = ease.inOutCubic(prog(lt, 3.2, F2.heart))
  tapRing(x, t, lerp(SCR.cx - 130, SCR.cx + 130, hv), by - Math.sin(Math.PI * hv) * 120, clamp(prog(lt, 3.0, 3.3)) * (1 - prog(lt, F2.tap + 0.2, F2.tap + 0.4)), press)
  const mk = pop01(lt, F2.matched, 0.3, 2.8) * outK(lt, [F2.face[0] - 0.3, F2.face[0]])
  label(x, SCR.cx, 760, 'MATCHED', mk, { size: 64, bg: PINK, color: INK, rot: -0.12 })
  sparkles(x, t, SCR.cx, 760, 18.378 + F2.matched, 12, 200, 2, [PINK, GOLD, BONE])
  hearts(x, t, SCR.cx + 130, by, 18.378 + F2.tap + 0.05, { n: 6, life: 1.4, spread: 140, cell: 7, seed: 2 })
  if (lt > F2.face[0]) sparkles(x, t, SCR.cx, 760, 18.378 + F2.face[1], 12, 190, 1, [ACC, GOLD, BONE])
}

// the framed photo on the wall: card seven, framed (it's there from frame 0)
function photo(x, cx, cy, w, h, t) {
  x.fillStyle = '#2a1f55'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  drawMysteryCard(x, t, cx, cy + 4, 104, { traits: [], face: 0, accent: ACC, flip: 0 })
  x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('7', cx + 72, cy - 60)
}

const F = makeFilm({
  id: 'trstoryskip', key: 'Dm', seed: 1901, accent: ACC,
  narrator: 'capricorn', partner: 'aquarius',
  heads: [
    'We matched on the card | I *almost skipped.*',
    "Tonight's deck. | *Card seven.*",
    'Then I looked | *again.*',
    'One more | *look.*',
    'Six months | *later.*',
  ],
  stamps: [null, 'MARCH · 11:48 PM', null, 'MARCH · 11:52 PM', null],
  lines: [
    { t: 1.2, text: 'ok. storytime. how we *met.*' },
    { t: 6.1, text: '11 PM. skipping *everyone.*' },
    { t: 9.7, text: 'card seven: pigeons. *nope.*' },
    { t: 14.3, text: 'but I gave it *one* more look.' },
    { t: 19.0, text: 'wait. they make *lists?*' },
    { t: 23.4, text: 'then, face last… *the pigeon.*' },
    { t: 28.75, text: 'we have a pigeon. it has a *spreadsheet.*' },
  ],
  mood(t) {
    if (t < 2.4) return { mood: 'happy' }
    if (t < 5.6) return { mood: 'wink' }
    if (t < 9.7) return { mood: 'sleepy', look: [-1, -0.4] }
    if (t < 13.93) return { mood: 'squint', look: [-1, -0.5] }
    if (t < 18.38) return { mood: 'sparkle' }
    if (t < 19.7) return { mood: 'neutral', look: [-1, -0.4] }
    if (t < 23.2) return { mood: 'heart' }
    if (t < 25.4) return { mood: 'happy', look: [-1, -0.4] }
    if (t < 27.82) return { mood: 'wide', look: [-1, -0.6] }
    if (t < 30.2) return { mood: 'happy', look: [1, 0] }
    if (t < 37.95) return { mood: 'wink' }
    return { mood: 'heart' }
  },
  partnerIn: 28.3,
  partnerMood: t => t < 31.2 ? { mood: 'happy', look: [-1, 0] } : { mood: 'sparkle' },
  photo,
  flash: [flash1, flash2],
  talk(x, t, K) {
    if (K.pF) drawPigeon(x, t, K.pF.x + 12, K.pF.top - 34, 10)
    // the pigeon's spreadsheet (a tiny clipboard) when it's mentioned
    const k = pop01(t, 30.2, 0.3, 2.2) * outK(t, [33.2, 33.4])
    if (K.pF && k > 0.01) drawBits(x, ['.KKKK.', 'WWWWWW', 'WGWGWW', 'WWWWWW', 'WGWGGW', 'WWWWWW', 'WGGWGW', 'WWWWWW'], { K: '#6b4a2a', W: '#f4e8cc', G: '#5fd38a' }, K.pF.x + 120, K.pF.top - 10, 9 * k, { rot: 0.15 })
  },
  lesson: { text: 'Give it | *one more look.*', chip: '+1 PIGEON (ADOPTED)' },
  last: { text: 'Never *skip.*' },
  music: { breakdown: [13.933], hits: [27.822] },
  cues: [
    // flashback 1: three skips, card seven turns, the hover
    ...SKIPS.flatMap((c, i) => { const nx = (SKIPS[i + 1]?.at ?? C7.in) + 5.6; return [['whoosh', r3(c.at + 5.6 - 0.2), 0.25, 0.025], ['pop', r3(nx - 0.5), 440, 0.04, -0.2], ['tick', r3(nx - 0.45), 0.05]] }),
    ['whoosh', r3(5.6 + C7.in - 0.25), 0.3, 0.03], ['pluck', r3(5.6 + C7.flip[1]), 1174.66, 0.04, 0.5, 0], ['pop', r3(5.6 + C7.flip[1] + 0.1), 880, 0.03, 0.3],
    ...[0, 0.35, 0.7, 1.05, 1.4, 1.75].map(d => ['tick', r3(5.6 + C7.hover + d), 0.018]),
    // flashback 2: the second look, ♥, MATCHED, face last, coo
    ['bell', r3(18.378 + F2.t2 + 0.4), 1318.51, 0.025, 0.7, 0.3], ['bell', r3(18.378 + F2.t3 + 0.4), 1567.98, 0.025, 0.7, 0.3],
    ['pop', r3(18.378 + F2.tap), 1046.5, 0.05, 0.2], ['pop', r3(18.378 + F2.matched + 0.05), 1318.51, 0.05, 0], ['glitter', r3(18.378 + F2.matched), r3(18.378 + F2.matched + 0.5)],
    ['riser', r3(18.378 + F2.face[0]), r3(18.378 + F2.face[1]), 0.03], ['bell', r3(18.378 + F2.face[1]), 1760, 0.03, 1.0, 0], ['glitter', r3(18.378 + F2.face[1]), r3(18.378 + F2.face[1] + 0.4)],
    ['pluck', r3(18.378 + 7.3), 392, 0.04, 0.3, 0.2], ['pluck', r3(18.378 + 7.45), 349.23, 0.04, 0.3, 0.2],
    // the pigeon arrives home (coo coo)
    ['pluck', 28.9, 392, 0.04, 0.3, 0.3], ['pluck', 29.05, 349.23, 0.04, 0.3, 0.3], ['pop', 30.25, 987.77, 0.03, 0.4],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const T = F.T
export const LINES = F.LINES
