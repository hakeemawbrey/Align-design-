// st9geminicrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E14: Gemini · THE CREW) · story 0–20.6, then
// the shared end card. The vlog parody (st9day.js) at Gemini's place (st9geminihome.js), Saturday night, the air crew.
//   0.00  frame 0: "A Gemini at a party knows *everyone*." The ♊ star mid-ricochet off a guest ("HI! +100"), a pinball
//         dot-matrix score up top, the whole zodiac crammed round the window; Aquarius on the decks.
//   3.00  PINBALL MODE: it pinballs guest to guest, every bump a "HI!" and +100. "10:47 PM — said hi to 31 people."
//   6.60  "MULTIBALL!": the twin bounces in too (two of everything). The score maxes out.
//   8.60  cut to the kitchen, the party muffled. Libra by the counter. LIBRA: "you've said hi to 31 people. hi."
//         GEMINI: "hi. honestly? i came to see *you.*" (it talks with its hands, two pixel hands flying)
//  13.90  ★ ASTROLOGY SAYS: in traditional astrology Gemini rules the arms and hands.
//  16.60  "Know everyone. *Close* to a few." The rhyme: the score display comes back: "BEST FRIEND BONUS ♥".
// Rewatch bait: Aquarius's DJ screen reads "AIR SIGNS ONLY (JK)"; the corkboard has 11 notes (one: "TRIVIA HOST").
// Ghost: hangs upside down under the kitchen's upper cabinets.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawTwin } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawGeminiHome, geminiRoom, GEM } from '../../st9geminihome.js'

export const DURATION = 25
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const INK = '#1b1236', BONE = '#efe6d6', AMBER = '#ff9a2e'
const GEMC = signStar('gemini'), LIBC = signStar('libra')
const GEMN = '♊ GEMINI', LIBN = '♎ LIBRA'

const T = {
  hookOut: 2.9, pin: 3.0, s1: [3.2, 6.4], multi: 6.6, kitchen: 8.6,
  l1: 8.95, l2: 11.45, close: 13.75, chip: 13.9, last: 16.6, lastLand: 16.95, bonus: 17.3, out: [20.2, 20.55],
  ghost: 10.2,
}
const LINES = [
  { t: T.l1, speaker: LIBN, text: 'you’ve said hi to 31 people. *hi.*', color: '#f39be8' },
  { t: T.l2, speaker: GEMN, text: 'hi. honestly? i came to see *you.*', color: GEM.yellow },
]
const CPS = 28
const GEM_HOPS = [...talkHops(LINES, GEMN, { cps: CPS }), T.lastLand]
const LIB_HOPS = [...talkHops(LINES, LIBN, { cps: CPS }), T.lastLand + 0.1]

// the party: guests on the window seat and the floor (window room)
const GUESTS = [
  { id: 'aquarius', x: 840, y: 1040, s: 150, dj: true }, { id: 'leo', x: 220, y: 1100, s: 140 }, { id: 'taurus', x: 470, y: 1110, s: 130 },
  { id: 'scorpio', x: 660, y: 1120, s: 130 }, { id: 'virgo', x: 160, y: 1420, s: 140 }, { id: 'sagittarius', x: 430, y: 1460, s: 140 },
  { id: 'aries', x: 700, y: 1440, s: 140 }, { id: 'capricorn', x: 930, y: 1410, s: 140 }, { id: 'pisces', x: 300, y: 1300, s: 120 },
  { id: 'cancer', x: 820, y: 1280, s: 120 },
]
// Gemini's bounce path: [time, guest index] — it bumps each guest and pops a HI!
const PATH = [[-0.4, 1], [0, 2], [0.75, 8], [1.5, 3], [3.0, 4], [3.55, 5], [4.1, 9], [4.65, 6], [5.2, 0], [5.75, 7], [6.3, 2], [6.85, 4], [7.4, 6], [7.95, 1], [8.5, 3]]
const TWIN_PATH = [[6.6, 7], [7.15, 9], [7.7, 5], [8.25, 0]]
const HI = ['HI!', 'HEY!!', 'OMG HI', 'HIII', 'YOU!', 'HELLO!', 'HI HI', 'HEY YOU']
function along(path, t) {
  let i = 0; while (i < path.length - 2 && t >= path[i + 1][0]) i++
  const [t0, g0] = path[i], [t1, g1] = path[i + 1]
  const p = prog(t, t0, t1), a = GUESTS[g0], b = GUESTS[g1]
  return { x: lerp(a.x, b.x, ease.inOutQuad(p)) + 70, y: lerp(a.y, b.y, p) - 110 - Math.sin(Math.PI * p) * 180, p }
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 150, y: 860, where: 'hanging upside down under the kitchen’s upper cabinets' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Gemini at a party knows *everyone*.', at: 0, out: T.hookOut, top: 300 })
  const caps = [stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '10:47 PM', text: 'said hi to 31 people.', top: 1620 })]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, close: T.close, cps: CPS })
  const last = popText(root, 'Know everyone. | *Close* to a few.', { top: 360, size: 104, accentSize: 156, at: T.last, gap: 0.08, accentColor: GEM.yellow, wobble: true, late: 4, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  /** the pinball dot-matrix display (DMD): amber on black with a dot grid */
  function dmd(t, line1, line2, k = 1, y = 420) {
    if (k <= 0.02) return
    x.save(); x.translate(540, y); x.scale(k, k)
    rect(-430, -80, 860, 160, '#3a3a4e'); rect(-420, -70, 840, 140, '#0a0604')
    txt(line1, 0, -24, "700 30px 'Space Mono', monospace", AMBER)
    txt(line2, 0, 26, "700 46px 'Space Mono', monospace", AMBER)
    x.globalAlpha = 0.5; x.fillStyle = '#0a0604'
    for (let yy = -70; yy < 70; yy += 6) x.fillRect(-420, yy, 840, 2)
    for (let xx = -420; xx < 420; xx += 6) x.fillRect(xx, -70, 2, 140)
    x.restore()
  }
  function bumpRing(cx, cy, age) {
    if (age < 0 || age > 0.4) return
    const p = age / 0.4
    x.save(); x.globalAlpha = 1 - p; x.strokeStyle = AMBER; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, 60 + 70 * p, 0, Math.PI * 2); x.stroke(); x.restore()
  }
  function pop(cx, cy, s, age, col = BONE) {
    if (age < 0 || age > 0.75) return
    const k = easeOutBack(Math.min(1, age / 0.18), 2.6) * (1 - ease.inCubic(prog(age, 0.55, 0.75)))
    x.save(); x.translate(cx, cy - age * 60); x.scale(k, k); x.rotate(-0.06)
    x.font = "800 40px Inter"; const w = x.measureText(s).width + 36
    rect(-w / 2 - 5, -31, w + 10, 62, INK); rect(-w / 2, -26, w, 52, col); txt(s, 0, 2, "800 40px Inter", INK)
    x.restore()
  }
  function hands(t, cx, cy, k) {
    if (k <= 0.02) return
    const HB = ['.k.k.k.', '.k.k.k.k', '.kkkkkk.', 'kkkkkkk.', '.kkkkk..', '..kkkk..']
    for (const s of [-1, 1]) {
      const a = Math.sin(t * 9 + (s > 0 ? 1.4 : 0)), hx = cx + s * (150 + 30 * a), hy = cy - 40 - 60 * Math.abs(Math.sin(t * 6 + s))
      x.save(); x.translate(hx, hy); x.scale(s * 1.4 * k, 1.4 * k); x.rotate(0.3 * a)
      HB.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') rect(-24 + i * 7 - 2, -22 + j * 7 - 2, 11, 11, INK) }))
      HB.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') rect(-24 + i * 7, -22 + j * 7, 7, 7, GEM.yellow) }))
      x.restore()
      for (let m = 0; m < 3; m++) rect(hx - s * 40 - s * m * 14, hy + 30 + m * 8, 8, 4, 'rgba(239,230,214,0.6)')     // motion lines
    }
  }
  function decks(t, cx, cy) {
    rect(cx - 120, cy + 40, 240, 70, INK); rect(cx - 114, cy + 46, 228, 58, '#3a3358')
    for (const s of [-1, 1]) { x.save(); x.translate(cx + s * 60, cy + 70); x.rotate(t * 6 * s); rect(-22, -22, 44, 44, '#111'); rect(-4, -20, 8, 14, BONE); x.restore() }
    rect(cx - 70, cy - 10, 140, 40, '#14102e'); txt('AIR SIGNS ONLY (JK)', cx, cy + 10, "700 11px 'Space Mono', monospace", '#9fe0ff')
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inKitchen = t >= T.kitchen
      const hour = 22.8 + prog(t, 0, STORY_END) * 0.4
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const shake = !inKitchen && t >= T.pin ? Math.sin(t * 60) * 3 : 0
      x.save(); x.translate(shake, 0)
      if (!inKitchen) {
        drawGeminiHome(x, t, { room: 'window', ep: 'crew', hour })
        // party lights
        x.save(); x.globalCompositeOperation = 'lighter'
        for (let i = 0; i < 5; i++) { const ph = t * 1.4 + i * 1.3; x.globalAlpha = 0.07; x.fillStyle = ['#ff5da2', '#5fd0ff', '#f2cf4a', '#a46cff', '#6fdc6a'][i]; x.beginPath(); x.arc(540 + Math.cos(ph) * 380, 1100 + Math.sin(ph * 1.3) * 300, 220, 0, Math.PI * 2); x.fill() }
        x.restore()
        const lastHit = (path) => { let h = null; for (const [pt, g] of path) if (t >= pt && t < pt + 0.75) h = { pt, g }; return h }
        GUESTS.forEach((g, i) => {
          const hit = PATH.some(([pt, gi]) => gi === i && t >= pt && t < pt + 0.5) || (t >= T.multi && TWIN_PATH.some(([pt, gi]) => gi === i && t >= pt && t < pt + 0.5))
          drawStarChar(x, g.x, g.y, g.s, t, { ...signStar(g.id), glyph: null, mood: hit ? 'wide' : 'happy', look: [0, -1], seed: 20 + i, blink: hit ? false : undefined, hops: PATH.filter(([, gi]) => gi === i).map(([pt]) => pt) })
          if (g.dj) { decks(t, g.x, g.y); rect(g.x - 66, g.y - 70, 132, 12, INK); for (const s of [-1, 1]) rect(g.x + s * 66 - 14, g.y - 70, 28, 44, '#3a3358') }
        })
        const P = along(PATH, t)
        drawStarChar(x, P.x, P.y, 240, t, { ...GEMC, mood: t < T.multi ? 'sparkle' : 'happy', squash: -0.1 * Math.sin(Math.PI * P.p), look: [0, 0], seed: 3 })
        if (t >= T.multi) { const Q = along(TWIN_PATH, t); drawTwin(x, Q.x, Q.y, 180, t, { mood: 'wink', seed: 9, pop: pop01(t, T.multi, 0.3, 2) }) }
        for (const [k, [pt, gi]] of PATH.entries()) { const g = GUESTS[gi]; bumpRing(g.x, g.y, t - pt); pop(g.x + 40, g.y - g.s * 0.9, HI[k % HI.length], (t - pt) + (k === 1 && t < 0.01 ? 0.25 : 0), k % 2 ? GEM.yellow : BONE) }
        if (t < 0.01) pop(GUESTS[2].x + 40, GUESTS[2].y - 117, 'HI! +100', 0.3, GEM.yellow)
        for (const [pt, gi] of TWIN_PATH) { const g = GUESTS[gi]; if (t >= T.multi) { bumpRing(g.x, g.y, t - pt); pop(g.x + 40, g.y - g.s * 0.9, 'HI x2', t - pt, GEM.mint) } }
        void lastHit
      } else {
        drawGeminiHome(x, t, { room: 'kitchen', ep: 'crew', hour })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'above', cell: 3 })
        const L = geminiRoom('kitchen')
        const lm = t < T.l2 ? 'happy' : t < T.last ? 'sparkle' : 'heart'
        drawStarChar(x, 330, L.spots.stage[1] - 30, 240, t, { ...LIBC, mood: lm, look: [1, 0], seed: 12, hops: LIB_HOPS })
        const gm = t < T.l2 ? 'neutral' : t < T.last ? 'happy' : 'heart'
        const rG = drawStarChar(x, 720, L.spots.stage[1] - 30, 250, t, { ...GEMC, mood: gm, look: [-1, 0], seed: 3, hops: GEM_HOPS })
        hands(t, rG.x, rG.y, t >= T.l2 && t < T.last ? pop01(t, T.l2, 0.3, 2) : 0)
      }
      x.restore()
      // the score display
      if (!inKitchen) {
        const score = t < T.pin ? 4700 : t < T.multi ? 4700 + Math.floor(prog(t, T.pin, T.multi) * 26) * 100 : 999900
        const l1 = t < T.multi ? 'PARTY PINBALL · BALL 1' : (Math.floor(t * 6) % 2 ? '★ MULTIBALL ★' : '')
        dmd(t, l1, `SCORE ${String(score).padStart(6, '0')}`, t < T.hookOut ? 0 : 1)
      } else if (t >= T.bonus) dmd(t, 'BEST FRIEND BONUS', '♥ ♥ ♥  x1  ♥ ♥ ♥', 0.85 * pop01(t, T.bonus, 0.3, 2) * outK(t, T.out), 700)
      if (t < T.hookOut) {                                    // frame 0: the score as a small strip under the hook
        x.save(); x.translate(540, 1610); x.scale(0.7, 0.7); x.translate(-540, -420); dmd(t, 'PARTY PINBALL · BALL 1', 'SCORE 004700'); x.restore()
      }
      factChip(x, t, { label: '★ ASTROLOGY SAYS', text: 'In traditional astrology, Gemini rules the arms and hands.', at: T.chip, dur: 2.6, x: 540, y: 290, color: GEM.yellow })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '10:45', to: '11:09', at: 0, dur: STORY_END - 0.6, ampm: 'PM', sign: 'gemini' })
      drawRecFrame(x, t, { battery: 0.3 - 0.12 * prog(t, 0, STORY_END) })
      for (const c of [T.pin, T.multi, T.kitchen]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.45 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E14' }), cardCuts(CUTS)]

const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.01 }),
  ...PATH.filter(([pt]) => pt > 0 && pt < T.kitchen).flatMap(([pt, gi], k) => [['pop', r3(pt), NOTE[k % NOTE.length], 0.04, (GUESTS[gi].x - 540) / 600], ['tick', r3(pt), 0.03]]),
  ...TWIN_PATH.map(([pt, gi], k) => ['pop', r3(pt + 0.02), NOTE[(k + 3) % NOTE.length], 0.035, (GUESTS[gi].x - 540) / 600]),
  ['riser', T.pin - 0.4, T.pin, 0.03], ['pop', T.pin, 1318.51, 0.05, 0],
  ...stampCues(T.s1[0]),
  ['bell', T.multi, 1760, 0.04, 1.2, 0], ['glitter', T.multi, T.multi + 0.8], ['crash', T.multi, { gain: 0.04, len: 1.6 }],
  ['whoosh', T.kitchen - 0.08, 0.4, 0.035],
  ['tick', T.ghost + 0.05, 0.015],
  ...talkCues(LINES, { cps: CPS, pitch: { [LIBN]: 784, [GEMN]: 988 } }),
  ...factChipCues(T.chip, { dur: 2.6 }),
  ['pop', T.last, 880, 0.03, 0], ['pop', T.last + 0.08, 987.77, 0.03, 0], ['pop', T.lastLand, 1174.66, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.04, 0.6, 0],
  ['bell', T.bonus, 1318.51, 0.035, 1.4, 0], ['pop', T.bonus + 0.1, 1760, 0.03, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
