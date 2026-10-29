// st9cancercrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E19: Cancer · THE CREW) · story 0–20.6, then
// the shared end card. The vlog parody (st9day.js) at Cancer's window seat (st9cancerhome.js), with the water trio.
//   0.00  frame 0: "A Cancer's home is *everyone's* home." A blanket fort over the window seat, fairy lights on; the
//         ♋ star passes a popcorn bowl in, Scorpio and Pisces already peeking out.
//   3.00  the build sheet: "4 chairs · 9 blankets · 1 crab shell (load-bearing)". "9:02 PM — fort: structurally emotional."
//   6.60  inside: the TV glow on three faces, "NOW PLAYING: SEA YOU LATER". SCORPIO: "i'm not crying. the fort is
//         *dusty.*" · PISCES: "can we live here *forever?*"
//  13.20  the window: a fuzzy swarm of stars. ★ REAL SKY: the Beehive Cluster (Praesepe) sits in Cancer.
//         CANCER: "see? even the stars do *sleepovers.*"
//  16.60  "Home is *who*, not where." The rhyme: frame 0's fort, now with Cancer inside too, and Scorpio passing it the
//         popcorn.
// Rewatch bait: the load-bearing crab shell props up the fort's roof; the fridge (seen in the build sheet's sketch) has
// 9 photos now.
// Ghost: leans out from behind the fort's left edge.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawCancerHome, cancerRoom, drawShell, CAN } from '../../st9cancerhome.js'

export const DURATION = 25
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const INK = '#1b1236', BONE = '#efe6d6', SKYB = '#8fd6f6'
const CANC = signStar('cancer'), SCOC = signStar('scorpio'), PISC = signStar('pisces')
const CANN = '♋ CANCER', SCON = '♏ SCORPIO', PISN = '♓ PISCES'

const T = {
  hookOut: 2.9, plan: 3.0, s1: [3.2, 6.4], inside: 6.6,
  l1: 7.0, l2: 9.7, sky: 13.2, chip: 13.4, l3: 14.0, close: 16.3,
  last: 16.6, lastLand: 17.0, pass: 17.3, out: [20.2, 20.55],
  ghost: 5.0,
}
const LINES = [
  { t: T.l1, speaker: SCON, text: 'i’m not crying. the fort is *dusty.*', color: '#ff7a9a' },
  { t: T.l2, speaker: PISN, text: 'can we live here *forever?*', color: '#b5aefc' },
  { t: T.l3, speaker: CANN, text: 'see? even the stars do *sleepovers.*', color: SKYB },
]
const CPS = 26
const HOP = sp => talkHops(LINES, sp, { cps: CPS })
const FORT = { x0: 120, x1: 960, top: 930, base: 1400, door: [400, 680] }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 128, y: 1240, where: 'leaning out from behind the blanket fort’s left edge' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Cancer’s home is *everyone’s* home.', at: 0, out: T.hookOut, top: 270, accentColor: SKYB })
  const caps = [stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '9:02 PM', text: 'fort: structurally *emotional.*', accentColor: SKYB })]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, close: T.close, cps: CPS })
  const last = popText(root, 'Home is *who,* | not where.', { top: 330, size: 116, accentSize: 172, at: T.last, gap: 0.08, accentColor: SKYB, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function box6(xx, y, w, h, c, hi) { rect(xx - 6, y - 6, w + 12, h + 12, INK); rect(xx, y, w, h, c); if (hi) rect(xx, y, w, 6, hi) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  const fortPath = () => { const { x0, x1, top, base } = FORT; x.beginPath(); x.moveTo(x0, base); x.lineTo(x0 + 60, top + 120); x.lineTo(540, top); x.lineTo(x1 - 60, top + 120); x.lineTo(x1, base); x.closePath() }
  const doorPath = () => { const [a, b] = FORT.door; x.beginPath(); x.moveTo(a, FORT.base); x.lineTo(a + 70, FORT.top + 170); x.lineTo(b - 70, FORT.top + 170); x.lineTo(b, FORT.base); x.closePath() }
  /** the fort: a patchwork quilt draped over the seat, a dark doorway with TV glow, fairy lights, the crab shell as a prop */
  function fort(t, tv) {
    x.save(); fortPath(); x.lineWidth = 12; x.strokeStyle = INK; x.stroke(); x.clip()
    const P = [CAN.coral, CAN.cream, CAN.sea, CAN.pink, '#c79bff', '#ffe6a8']
    for (let j = 0; j < 10; j++) for (let i = 0; i < 12; i++) rect(FORT.x0 + i * 72, FORT.top + j * 50, 72, 50, P[(i * 3 + j * 2) % P.length])
    for (let j = 0; j < 10; j++) rect(FORT.x0, FORT.top + j * 50 - 2, 900, 4, 'rgba(27,18,54,0.35)')
    for (let i = 0; i < 12; i++) rect(FORT.x0 + i * 72 - 2, FORT.top, 4, 500, 'rgba(27,18,54,0.35)')
    x.restore()
    // the doorway, glowing with the TV
    doorPath(); x.fillStyle = INK; x.fill()
    x.save(); doorPath(); x.clip()
    const g = x.createRadialGradient(540, FORT.top + 380, 0, 540, FORT.top + 380, 300)
    g.addColorStop(0, `rgba(140,190,255,${0.55 * tv})`); g.addColorStop(1, 'rgba(140,190,255,0.05)')
    x.fillStyle = g; x.fillRect(FORT.door[0], FORT.top, 300, 500); x.restore()
    // the load-bearing crab shell, propping the left pole
    rect(FORT.x0 + 52, FORT.top + 140, 12, 260, CAN.woodDk); drawShell(x, FORT.x0 + 58, FORT.top + 140, 5)
    // fairy lights along the ridge
    for (let i = 0; i <= 16; i++) {
      const f = i / 16, lx = f < 0.5 ? lerp(FORT.x0 + 60, 540, f * 2) : lerp(540, FORT.x1 - 60, f * 2 - 1)
      const ly = (f < 0.5 ? lerp(FORT.top + 120, FORT.top, f * 2) : lerp(FORT.top, FORT.top + 120, f * 2 - 1)) + 18 + Math.sin(f * 40) * 6
      const on = (Math.floor(t * 3) + i) % 3 !== 0
      x.save(); if (on) { x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(lx, ly, 0, lx, ly, 26); gg.addColorStop(0, 'rgba(255,220,140,0.6)'); gg.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = gg; x.fillRect(lx - 26, ly - 26, 52, 52) } x.restore()
      rect(lx - 5, ly - 5, 10, 10, on ? '#ffe08a' : '#8a7a4a')
    }
  }
  function popcorn(cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    for (let i = 0; i < 9; i++) box6(-46 + (i % 5) * 22, -40 - Math.floor(i / 5) * 18 + (i % 2) * 6, 16, 16, '#fff6dc')
    box6(-60, -24, 120, 50, '#ff5d73'); for (let i = 0; i < 4; i++) rect(-48 + i * 30, -24, 12, 50, '#ffffff')
    x.restore()
  }
  function beehive(t, cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 170 * k); g.addColorStop(0, 'rgba(220,230,255,0.35)'); g.addColorStop(1, 'rgba(220,230,255,0)')
    x.fillStyle = g; x.fillRect(cx - 170, cy - 170, 340, 340); x.restore()
    for (let i = 0; i < 26; i++) {
      const a = i * 2.39996, r = 14 + Math.sqrt(i) * 24
      drawPixelStar(x, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, (10 + (i % 4) * 4) * k * (0.85 + 0.15 * Math.sin(t * 4 + i)), i % 3, i % 5 ? '#e8f0ff' : '#ffe6b0')
    }
    if (k > 0.6) txt('PRAESEPE', cx, cy + 130, "700 24px 'Space Mono', monospace", BONE)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inside = t >= T.inside && t < T.sky, sky = t >= T.sky && t < T.last
      const hour = 21 + prog(t, 0, STORY_END) * 0.7
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const L = cancerRoom('window'), W = L.win
      beehive(t, W.x + 600, W.y + 140, pop01(t, T.sky + 0.3, 0.6, 1.6) * (t < T.out[1] ? 1 : 0))
      // camera: wide · inside the doorway · tilt up to the window · wide again
      let z = 1, fx = 540, fy = 1100, sy = null
      if (t >= T.plan && t < T.inside) z = 1 + 0.06 * ease.outBack(prog(t, T.plan, T.plan + 0.35))
      if (inside) { z = 1.75; fx = 540; fy = 1290; sy = 1130 }
      if (t >= T.last) { z = 1 + 0.25 * ease.inOutCubic(prog(t, T.last, T.last + 0.8)); fx = 540; fy = 1300; sy = lerp(1300, 1220, ease.inOutCubic(prog(t, T.last, T.last + 0.8))) }
      if (sky) { z = 1.25; fx = 640; fy = 860 + 40 * ease.inOutCubic(prog(t, T.sky, T.last)) }
      x.save(); x.translate(fx, sy ?? fy); x.scale(z, z); x.translate(-fx, -fy)
      drawCancerHome(x, t, { room: 'window', ep: 'crew', hour })
      const tv = 0.7 + 0.3 * Math.sin(t * 9) * Math.sin(t * 3.7)
      fort(t, tv)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
      // the crew in the doorway (inside: in a row, lit by the TV)
      const end = t >= T.last
      const sm = t < T.l1 ? 'happy' : t < T.l2 ? 'sleepy' : t < T.sky ? 'neutral' : end ? 'happy' : 'sparkle'
      const pm = t < T.inside ? 'sparkle' : t < T.l2 + 1.8 ? 'heart' : end ? 'sleepy' : 'sparkle'
      const lookUp = sky ? [1, -1] : [0, 0]
      if (t < T.inside) {
        drawStarChar(x, 480, 1290, 150, t, { ...SCOC, glyph: null, mood: 'happy', look: [1, 0], seed: 21 })
        drawStarChar(x, 600, 1300, 150, t, { ...PISC, glyph: null, mood: 'sparkle', look: [-1, 0], seed: 22 })
        drawStarChar(x, 820, 1330, 260, t, { ...CANC, mood: 'happy', look: [-1, 0], seed: 4, hops: [T.plan + 0.1] })
        popcorn(lerp(720, 660, (t % 2) / 2 * 0), 1290, 1)
      } else {
        drawStarChar(x, 455, 1300, 120, t, { ...SCOC, glyph: null, mood: sm, zzz: false, look: lookUp, seed: 21, hops: HOP(SCON) })
        drawStarChar(x, 540, 1290, 120, t, { ...PISC, glyph: null, mood: pm, look: lookUp, seed: 22, hops: HOP(PISN), zzz: end })
        drawStarChar(x, 625, 1300, 120, t, { ...CANC, glyph: null, mood: end ? (t < T.pass + 0.8 ? 'wide' : 'heart') : 'happy', look: lookUp, seed: 4, hops: [...HOP(CANN), T.pass + 0.8] })
        if (inside && t > T.l1 + 1) { const tp = ((t - T.l1) * 0.8) % 1; rect(447, 1290 + tp * 40, 6, 9, SKYB) }        // a "dusty" tear
        if (end) { const p = ease.inOutCubic(prog(t, T.pass, T.pass + 0.8)); popcorn(lerp(470, 600, p), 1240 - Math.sin(p * Math.PI) * 30, 0.6) }
        else popcorn(540, 1360, 0.6)
      }
      x.restore()
      // the build sheet
      if (t >= T.plan && t < T.inside) {
        const k = pop01(t, T.plan, 0.3, 2) * (1 - ease.inCubic(prog(t, T.inside - 0.25, T.inside)))
        x.save(); x.translate(540, 700); x.scale(k, k); x.rotate(-0.02)
        box6(-360, -150, 720, 300, '#2a5d9a'); for (let i = 0; i < 12; i++) rect(-360 + i * 60, -150, 2, 300, 'rgba(255,255,255,0.15)'); for (let j = 0; j < 5; j++) rect(-360, -150 + j * 60, 720, 2, 'rgba(255,255,255,0.15)')
        txt('FORT · BUILD SHEET v3', 0, -110, "700 28px 'Space Mono', monospace", '#fff')
        ;['4 chairs', '9 blankets', '1 crab shell (load-bearing)', '∞ snacks'].forEach((s, i) => { if (t > T.plan + 0.2 + i * 0.25) txt('✓ ' + s, -320, -50 + i * 46, "700 30px 'Space Mono', monospace", '#fff', 'left') })
        x.restore()
      }
      // now playing (inside)
      if (inside) { const k = pop01(t, T.inside + 0.2, 0.3, 2); x.save(); x.translate(540, 700); x.scale(k, k); box6(-300, -36, 600, 72, 'rgba(16,9,38,0.9)'); txt('▶ NOW PLAYING: SEA YOU LATER', 0, 2, "700 28px 'Space Mono', monospace", SKYB); x.restore() }
      factChip(x, t, { label: '★ REAL SKY', text: 'The Beehive Cluster (Praesepe) sits in Cancer.', at: T.chip, dur: 2.9, x: 540, y: 290, color: SKYB })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '9:00', to: '9:42', at: 0, dur: STORY_END - 0.6, ampm: 'PM', sign: 'cancer' })
      drawRecFrame(x, t, { battery: 0.5 - 0.2 * prog(t, 0, STORY_END) })
      for (const c of [T.inside, T.sky, T.last]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.4 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.inside, kind: 'flip' }, { t: T.last, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E19' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.008 }),
  ['whoosh', T.plan - 0.05, 0.3, 0.025], ...[0, 1, 2, 3].map(i => ['tick', r3(T.plan + 0.2 + i * 0.25), 0.035]), ...stampCues(T.s1[0]),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.inside - 0.08, 0.35, 0.03], ['pop', T.inside + 0.25, 1108.73, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SCON]: 587, [PISN]: 988, [CANN]: 740 } }),
  ['whoosh', T.sky - 0.06, 0.4, 0.025], ['glitter', T.sky + 0.3, T.sky + 1.3], ['bell', T.sky + 0.4, 1760, 0.03, 1.8, 0.3],
  ...factChipCues(T.chip, { dur: 2.9 }),
  ['pop', T.last, 739.99, 0.03, 0], ['pop', T.last + 0.08, 880, 0.03, 0], ['pop', T.lastLand, 1108.73, 0.05, 0], ['bell', T.lastLand, 1479.98, 0.03, 1.4, 0],
  ['whoosh', T.pass, 0.4, 0.02], ['pop', T.pass + 0.8, 1318.51, 0.035, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
