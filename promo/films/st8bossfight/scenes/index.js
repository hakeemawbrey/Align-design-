// st8bossfight (35 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E19 · video game) · story 0–30.6, then the
// shared end card.
//   "FINAL BOSS: *comparison.*"  A synthwave arcade stage: HP bars, a combo meter, damage numbers, PLAYER 2 PRESS START,
//   a power-up and LEVEL CLEAR. ♍ Virgo fights a boss in the Comet's silhouette (a dark shadow of the ex who keeps coming
//   back) that fires "your ex did it better!" at her. ♓ Pisces (Virgo's partner since season 4) joins as player 2.
//   0.00–3.60  frame 0: Virgo mid-swing with her clipboard, the boss looming, the hook card. MISS! The boss: "your ex did
//              it *better!*" The words fly at Virgo: −30.
//   3.60–6.60  BOSS: "they planned *every* date. remember?" REMEMBER 2019? hits: −25. LOW HP. (7.2: the ghost rises over
//              the horizon, right)
//   6.60–9.00  VIRGO: "i'll just make a better *list!*" She swings: MISS. COMBO ×0.
//   9.00–12.0  PLAYER 2 HAS JOINED: Pisces drops in. PISCES: "you don't have to beat them. say what you *need.*"
//  12.00–15.3  the power-up "SAY WHAT YOU NEED" floats down; Virgo grabs it (HP refill). VIRGO: "i need plans. can we make
//              one *together?*"
//  15.30–17.6  hearts fly, the combo climbs to ×12, the boss HP drains. PISCES: "deal. you plan, i'll bring *snacks.*"
//  17.60–22.2  the boss shatters into pixels. LEVEL CLEAR, then the high-score table. (20.2: the hidden comet crosses the
//              synth sky, the real one, tiny and harmless)
//  22.20–30.6  frame 0's framing again: Virgo mid-swing, now side by side with Pisces at a door "NEXT LEVEL: THIS SEASON ▶".
//              Last line: "Don't replay last | season's *level.*"
// Rewatch bait: the high-score table's third row is "GHO ???", and the boss's HP bar label reads "COMPARISON (THE PAST)".
// One canvas (synth sky + arena + HUD + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawComet, drawDayChip, hookCard, hookCues, stingerCues, genreBug } from '../../st8cast.js'
import { clamp, lerp, prog, ease, easeOutBack, popOut, r3, BMP, bits, pixFont, punch, burst, wordPops, GOLD, BONE, INK, PINK, CYAN } from './kit.js'

export const DURATION = 35
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const MAG = '#ff3df0', NEON = '#4ff0ff', BOSSC = '#3a0f4a'
const VIR = signStar('virgo'), PIS = signStar('pisces')
const VIRN = `${VIR.glyph} VIRGO · P1`, PISN = `${PIS.glyph} PISCES · P2`, BOSSN = '☠ COMPARISON'

// ── the timeline
const T = {
  hookOut: [2.8, 3.05], swing0: 0, miss0: 0.9,
  l1: 1.0, shot1: [2.1, 2.55], l2: 3.7, shot2: [5.0, 5.45], lowHp: 5.45, ghost: 7.2,
  l3: 6.7, swing1: 7.9, miss1: 8.15,
  p2: 9.0, p2Land: 9.45, l4: 9.9,
  power: [12.0, 12.9], grab: 13.0, l5: 13.5,
  hits: [15.3, 17.5], l6: 15.9,
  ko: 17.6, clear: 18.6, scores: 19.4, comet: 20.2, close: 19.3,
  rhyme: 22.2, last: 22.4, lastLand: 22.95, out: [30.0, 30.45],
}
const LINES = [
  { t: T.l1, speaker: BOSSN, text: 'your ex did it *better!*', color: MAG },
  { t: T.l2, speaker: BOSSN, text: 'they planned *every* date. remember?', color: MAG },
  { t: T.l3, speaker: VIRN, text: 'i’ll just make a better *list!*', color: VIR.color },
  { t: T.l4, speaker: PISN, text: 'you don’t have to beat them. say what you *need.*', color: PIS.color },
  { t: T.l5, speaker: VIRN, text: 'i need plans. can we make one *together?*', color: VIR.color },
  { t: T.l6, speaker: PISN, text: 'deal. you plan, i’ll bring *snacks.*', color: PIS.color },
]
const CPS = 28
export const GHOST = { at: T.ghost, x: 900, y: 1000, where: 'rising over the synthwave horizon line, right of the striped sun' }
export const COMET = { at: T.comet, where: 'tiny, across the synthwave sky behind LEVEL CLEAR (the real one, after the boss is gone)' }

const HORIZON = 1000
const BOSS = { x: 740, y: 820, size: 300 }
const VPOS = t => t < T.rhyme ? { x: 290, y: 1320 } : { x: 250, y: 1320 }
const PPOS = { x: 560, y: 1350 }

// ── props
const CLIP = BMP(`
..kkkk..
bbbbbbbb
bwwwwwwb
bwkkwwwb
bwwwwwwb
bwkkkwwb
bwwwwwwb
bwkkwwwb
bwwwwwwb
bbbbbbbb`)
const CLIP_C = { k: '#2a1a2a', b: '#a8653a', w: '#fff7e6' }
const HEART = BMP('.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...')
const CHEST = BMP(`
.yyyyyyyyyy.
yYYYYYYYYYYy
yYhhhhhhhhYy
yYhHHHHHHhYy
yyyyyyyyyyyy
yBBBBkkBBBBy
yBBBBkkBBBBy
yBBBBBBBBBBy
yyyyyyyyyyyy`)

// ── HUD values (pure)
function virgoHP(t) {
  if (t >= T.grab) return 100
  let hp = 100
  if (t >= T.shot1[1]) hp -= 30
  if (t >= T.shot2[1]) hp -= 25
  return hp
}
const bossHP = t => 100 * (1 - ease.inOutQuad(prog(t, ...T.hits)))
const HIT_TIMES = Array.from({ length: 12 }, (_, i) => r3(T.hits[0] + 0.15 + i * (T.hits[1] - T.hits[0] - 0.2) / 12))
const combo = t => HIT_TIMES.filter(a => a <= t).length

function virgoState(t) {
  if (t < T.shot1[1]) return { mood: 'squint', look: [1, -1] }
  if (t < T.l3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.miss1 + 0.6) return { mood: 'squint', look: [1, -1] }
  if (t < T.p2) return { mood: 'neutral', look: [0, 1] }
  if (t < T.grab) return { mood: 'neutral', look: [1, 0] }
  if (t < T.ko) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'happy', look: [0, 0] }
}
function pisState(t) {
  if (t < T.l4 + 2) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.ko) return { mood: 'happy', look: [1, -1] }
  return { mood: 'heart' }
}
const V_HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), T.swing1, T.grab, T.ko + 0.3, T.lastLand]
const P_HOPS = [T.p2Land, ...talkHops(LINES, PISN, { cps: CPS }), T.ko + 0.35]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bossC = document.createElement('canvas'); bossC.width = 1080; bossC.height = 1920
  const bx = bossC.getContext('2d')
  const hook = hookCard(root, { text: 'FINAL BOSS: | *comparison.*', at: 0, out: T.hookOut[0], size: 110, accentSize: 170, top: 170, accentColor: MAG })
  const LAST = popText(root, 'Don’t replay last | season’s *level.*', { top: 190, size: 100, accentSize: 160, at: T.last, gap: 0.08, accentColor: MAG, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function synth(t) {
    drawSky(x, t, SKY_H)
    x.save(); x.globalCompositeOperation = 'soft-light'
    const g = x.createLinearGradient(0, 300, 0, HORIZON); g.addColorStop(0, '#3a1a8a'); g.addColorStop(1, '#ff4fb8')
    x.fillStyle = g; x.fillRect(0, 0, 1080, HORIZON); x.restore()
    drawSeedConstellation(x, t, 100, { alpha: 0.55 })
    if (t > T.comet && t < T.comet + 1.5) { const p = prog(t, T.comet, T.comet + 1.5); drawComet(x, lerp(1060, 60, p), lerp(700, 640, p), 28, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [1, 0.2] }) }
    // the striped sun
    x.save(); x.beginPath(); x.rect(0, 0, 1080, HORIZON); x.clip()
    for (let j = 0; j < 220; j += 8) {
      const y = HORIZON - 220 + j, w = Math.sqrt(Math.max(0, 220 * 220 - (220 - j) ** 2))
      if (j > 110 && Math.floor((j + t * 20) / 16) % 2) continue
      x.fillStyle = j < 110 ? '#ffd36a' : '#ff6f9a'; x.fillRect(540 - w, y, 2 * w, 8)
    }
    x.restore()
    // the grid floor
    x.fillStyle = '#12052a'; x.fillRect(0, HORIZON, 1080, 1920 - HORIZON)
    x.strokeStyle = MAG; x.lineWidth = 3; x.globalAlpha = 0.7
    x.beginPath()
    for (let i = -12; i <= 12; i++) { x.moveTo(540 + i * 30, HORIZON); x.lineTo(540 + i * 260, 1920) }
    const sp = (t * 0.6) % 1
    for (let k = 0; k < 12; k++) { const z = (k + sp) / 12, y = HORIZON + (1920 - HORIZON) * z * z; x.moveTo(0, y); x.lineTo(1080, y) }
    x.stroke(); x.globalAlpha = 1
    x.fillStyle = NEON; x.fillRect(0, HORIZON - 2, 1080, 4)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'below', cell: 3 })
  }
  function boss(t) {
    const ko = prog(t, T.ko, T.ko + 0.9)
    if (ko >= 1) return
    const hit = HIT_TIMES.some(a => t >= a && t < a + 0.08)
    const shake = hit ? Math.sin(t * 90) * 10 : 0
    const bob = Math.sin(t * 1.6) * 14
    bx.clearRect(0, 0, 1080, 1920)
    drawComet(bx, BOSS.x + shake, BOSS.y + bob, BOSS.size, t, { aura: false, exPin: false, tail: 700, sunDir: [-1, 0.6], mood: 'smug', blink: false })
    bx.save(); bx.globalCompositeOperation = 'source-in'; bx.fillStyle = NEON; bx.fillRect(0, 0, 1080, 1920); bx.restore()
    const ol = []
    for (const [dx, dy] of [[-6, 0], [6, 0], [0, -6], [0, 6], [-4, -4], [4, 4], [-4, 4], [4, -4]]) ol.push([dx, dy])
    x.save()
    if (ko > 0) {
      // shatter: the silhouette breaks into flying pixel blocks
      x.globalAlpha = 1 - ko
      for (let i = 0; i < 40; i++) {
        const a = i * 2.4, d = ko * (200 + (i % 7) * 50)
        x.fillStyle = i % 3 ? BOSSC : MAG
        x.fillRect(BOSS.x + Math.cos(a) * d - 12, BOSS.y + Math.sin(a) * d - 12, 24, 24)
      }
    }
    for (const [dx, dy] of ol) x.drawImage(bossC, dx, dy)
    bx.save(); bx.globalCompositeOperation = 'source-in'; bx.fillStyle = hit ? '#ffffff' : '#3a0f52'; bx.fillRect(0, 0, 1080, 1920); bx.restore()
    x.drawImage(bossC, 0, 0)
    x.restore()
    // glowing eyes
    const ey = BOSS.y + bob - 6, a = 1 - ko
    x.save(); x.globalAlpha = a; x.fillStyle = '#ff2a4a'
    x.fillRect(BOSS.x + shake - 70, ey, 40, 20); x.fillRect(BOSS.x + shake + 30, ey, 40, 20)
    x.fillStyle = '#ffd0d8'; x.fillRect(BOSS.x + shake - 62, ey + 4, 10, 8); x.fillRect(BOSS.x + shake + 38, ey + 4, 10, 8)
    x.restore()
    if (ko > 0) burst(x, t, BOSS.x, BOSS.y, T.ko, 16, 260, [MAG, NEON, GOLD, BONE], { life: 0.9, size: 30 })
  }
  function virgo(t) {
    const P = VPOS(t)
    const r = drawStarChar(x, P.x, P.y, 340, t, { color: VIR.color, glyph: VIR.glyph, ...virgoState(t), hops: V_HOPS, seed: 6 })
    // the clipboard swing: frame 0 is mid-swing, again at the second swing and in the rhyme
    const sw = (a, d = 0.7) => { const p = prog(t, a - 0.3, a + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }
    const k = Math.max(t < 0.6 ? 1 - prog(t, 0.2, 0.6) : 0, sw(T.swing1), t >= T.rhyme ? 1 - 0.3 * Math.sin(t * 3) ** 2 : 0)
    bits(x, CLIP, r.x + 150 + 60 * k, r.y - 10 - 60 * k, 13, CLIP_C, { rot: 0.3 + 0.9 * k })
    if (k > 0.5) for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(255,255,255,${0.5 * k})`; x.fillRect(r.x + 160 + i * 40, r.y - 120 - i * 30, 30, 8) }
    return r
  }
  function pisces(t) {
    const k = easeOutBack(prog(t, T.p2, T.p2Land), 1.6)
    if (k <= 0) return null
    const y = lerp(-200, PPOS.y, ease.inQuad(prog(t, T.p2, T.p2Land)))
    return drawStarChar(x, t >= T.rhyme ? 520 : PPOS.x, y, 290, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: P_HOPS, seed: 9 })
  }
  function bar(x0, y, w, hp, label, col, right) {
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 6, w + 12, 44)
    x.fillStyle = '#2a1040'; x.fillRect(x0, y, w, 32)
    const fw = w * clamp(hp / 100)
    x.fillStyle = col; x.fillRect(right ? x0 + w - fw : x0, y, fw, 32)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(right ? x0 + w - fw : x0, y, fw, 8)
    pixFont(x, label, right ? x0 + w : x0, y - 24, 24, BONE, { align: right ? 'right' : 'left' })
  }
  function hud(t) {
    const low = virgoHP(t) < 50 && Math.floor(t * 4) % 2
    bar(60, 600, 420, virgoHP(t), '♍ VIRGO', low ? '#ff3d5a' : '#5dff8a', false)
    if (t < T.ko + 0.9) bar(600, 600, 420, bossHP(t), 'COMPARISON (THE PAST)', MAG, true)
    if (t >= T.p2Land) bar(60, 680, 300, 100, '♓ PISCES · P2', NEON, false)
    if (low && t < T.grab) pixFont(x, 'LOW HP!', 270, 740, 30, '#ff3d5a')
    // combo
    const c = combo(t), cAt = HIT_TIMES[c - 1] ?? -9
    if ((t >= T.miss1 && t < T.p2) || (c > 0 && t < T.ko + 1.2)) {
      const s = 1 + 0.3 * Math.exp(-(t - cAt) * 10)
      x.save(); x.translate(860, 700); x.scale(s, s)
      pixFont(x, `COMBO ×${c}`, 0, 0, 40, c ? GOLD : '#9a8ab0')
      x.restore()
    }
  }
  function floatText(t, at, txt, px, py, col, size = 56) {
    const p = prog(t, at, at + 0.9)
    if (p <= 0 || p >= 1) return
    const s = 0.6 + 0.6 * easeOutBack(clamp(p * 4), 2.5)
    x.save(); x.translate(px, py - p * 90); x.scale(s, s); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.6, 1))
    pixFont(x, txt, 0, 0, size, col, { shadow: INK })
    x.restore()
  }
  function projectile(t, [a, b], txt) {
    const p = prog(t, a, b)
    if (p <= 0 || p >= 1) return
    const px = lerp(BOSS.x - 60, 360, ease.inQuad(p)), py = lerp(BOSS.y + 40, 1240, ease.inQuad(p))
    x.save(); x.translate(px, py); x.rotate(-0.15)
    x.font = `700 34px 'Space Mono', monospace`; const w = x.measureText(txt).width + 40
    x.fillStyle = MAG; x.fillRect(-w / 2 - 6, -32, w + 12, 64); x.fillStyle = '#2a0a3a'; x.fillRect(-w / 2, -26, w, 52)
    pixFont(x, txt, 0, 0, 34, '#ffd0f4', { shadow: null })
    x.restore()
  }
  function powerUp(t) {
    if (t < T.power[0] || t >= T.grab + 0.4) return
    const p = ease.outCubic(prog(t, ...T.power)), gone = prog(t, T.grab, T.grab + 0.3)
    const cx = lerp(420, 400, p), cy = lerp(700, 1080, p) + Math.sin(t * 5) * 10
    x.save(); x.globalAlpha = 1 - gone
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 10, cx, cy, 160); g.addColorStop(0, 'rgba(255,230,140,0.6)'); g.addColorStop(1, 'rgba(255,230,140,0)')
    x.fillStyle = g; x.fillRect(cx - 160, cy - 160, 320, 320); x.restore()
    bits(x, CHEST, cx, cy, 9, { y: '#8a5a1a', Y: GOLD, h: '#ff6fa8', H: '#ffd1de', B: '#c98a2a', k: '#1b1236' })
    pixFont(x, '★ SAY WHAT YOU NEED ★', cx + 150, cy - 90, 30, GOLD)
    x.restore()
    if (t >= T.grab) burst(x, t, cx, cy, T.grab, 14, 180, [GOLD, '#5dff8a', BONE])
  }
  function hearts(t, v, p) {
    for (const [i, a] of HIT_TIMES.entries()) {
      const q = prog(t, a - 0.35, a)
      if (q <= 0 || q >= 1) continue
      const from = i % 2 && p ? p : v
      bits(x, HEART, lerp(from.x + 60, BOSS.x, q), lerp(from.y - 40, BOSS.y, q) - Math.sin(Math.PI * q) * 80, 7, { X: i % 2 ? NEON : '#ff6fa8' })
    }
  }
  function banner(t, at, out, txt, sub, col) {
    const k = easeOutBack(prog(t, at, at + 0.35), 2) * (1 - ease.inCubic(prog(t, out, out + 0.3)))
    if (k <= 0) return
    x.save(); x.translate(540, 820); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-460, -90, 920, 180); x.fillStyle = '#1a0838'; x.fillRect(-450, -80, 900, 160)
    x.fillStyle = col; x.fillRect(-450, -80, 900, 8); x.fillRect(-450, 72, 900, 8)
    pixFont(x, txt, 0, sub ? -14 : 0, 76, col)
    if (sub) pixFont(x, sub, 0, 50, 28, BONE)
    x.restore()
  }
  function scores(t) {
    const k = easeOutBack(prog(t, T.scores, T.scores + 0.35), 2) * (1 - ease.inCubic(prog(t, T.rhyme - 0.35, T.rhyme)))
    if (k <= 0) return
    x.save(); x.translate(540, 1180); x.scale(k, k)
    x.fillStyle = 'rgba(16,6,36,0.92)'; x.fillRect(-380, -170, 760, 340); x.strokeStyle = NEON; x.lineWidth = 6; x.strokeRect(-380, -170, 760, 340)
    pixFont(x, 'HIGH SCORES', 0, -120, 40, NEON)
    const rows = [['1.', 'VIR+PSC', '99999'], ['2.', 'THE PAST', '00000'], ['3.', 'GHO', '?????']]
    rows.forEach(([n, a, b], i) => { const y = -40 + i * 70; pixFont(x, n, -320, y, 36, GOLD, { align: 'left' }); pixFont(x, a, -240, y, 36, BONE, { align: 'left' }); pixFont(x, b, 320, y, 36, i === 0 ? '#5dff8a' : BONE, { align: 'right' }) })
    x.restore()
  }
  function door(t) {
    const k = easeOutBack(prog(t, T.rhyme + 0.1, T.rhyme + 0.5), 1.8)
    if (k <= 0) return
    x.save(); x.translate(850, 1250); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-120, -230, 240, 330); x.fillStyle = '#2a1a5a'; x.fillRect(-108, -218, 216, 318)
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,220,140,0.5)'; x.fillRect(-90, -200, 180, 300); x.restore()
    pixFont(x, 'NEXT LEVEL:', 0, -280, 28, NEON); pixFont(x, 'THIS SEASON ▶', 0, -246, 30, GOLD)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const zk = 1 + punch(t, T.shot1[1], 0.6, 0.06) + punch(t, T.shot2[1], 0.6, 0.06) + punch(t, T.p2Land, 0.6, 0.05) + punch(t, T.ko, 0.8, 0.1)
      x.save(); x.translate(540, 1000); x.scale(zk, zk); x.translate(-540, -1000)
      synth(t)
      x.save(); x.globalAlpha = clamp(ok)
      boss(t)
      projectile(t, T.shot1, 'YOUR EX DID IT BETTER!')
      projectile(t, T.shot2, 'REMEMBER 2019?')
      door(t)
      const p = pisces(t), v = virgo(t)
      hearts(t, v, p)
      powerUp(t)
      for (const a of HIT_TIMES) floatText(t, a, 'HIT!', BOSS.x + ((a * 97) % 120) - 60, BOSS.y - 80, GOLD, 44)
      floatText(t, T.miss0, 'MISS!', BOSS.x - 120, BOSS.y + 60, BONE)
      floatText(t, T.miss1, 'MISS!', BOSS.x - 120, BOSS.y + 60, BONE)
      floatText(t, T.shot1[1], '−30', 380, 1120, '#ff3d5a', 64)
      floatText(t, T.shot2[1], '−25', 380, 1120, '#ff3d5a', 64)
      floatText(t, T.grab, 'HP +100', 380, 1100, '#5dff8a', 60)
      banner(t, T.p2, T.p2 + 1.6, 'PLAYER 2', 'HAS JOINED THE GAME', NEON)
      banner(t, T.clear, T.scores - 0.1, 'LEVEL CLEAR', null, GOLD)
      scores(t)
      x.restore()
      x.restore()
      // scanlines
      x.fillStyle = 'rgba(0,0,0,0.12)'; for (let y = 0; y < 1920; y += 6) x.fillRect(0, y, 1080, 2)
      x.save(); x.globalAlpha = clamp(ok); hud(t); x.restore()
      if (ok < 1) { x.save(); x.globalAlpha = 1 - clamp(ok); drawSky(x, t, SKY_H); drawSeedConstellation(x, t, 100, { alpha: 0.55 }); x.restore() }
      genreBug(x, t, { text: 'STAGE 19', x: 70, y: 232, color: MAG, alpha: t < T.hookOut[1] || t >= T.rhyme ? 0 : 1 })
      drawDayChip(x, t, { day: 33, phase: 'morning' })
      hook.update(t)
      box.update(t)
      LAST.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 9.0 (PLAYER 2), 18.55 (the boss is gone → LEVEL CLEAR). cardfx keeps the second.
const CUTS = [{ t: 8.95, kind: 'flip' }, { t: 22.15, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E19' }), cardCuts(CUTS)]

export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['whoosh', T.miss0 - 0.2, 0.25, 0.04], ['pop', T.miss0, 440, 0.04, 0.3],
  ...talkCues(LINES, { cps: CPS, pitch: { [BOSSN]: 330, [VIRN]: 880, [PISN]: 1046.5 } }),
  ...[T.shot1, T.shot2].flatMap(([a, b]) => [['whoosh', a, b - a + 0.1, 0.05], ['boom', b, 0.3], ['tick', b, 0.12]]),
  ['tick', T.ghost + 0.05, 0.015],
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.lowHp + 0.2 + i * 0.25), 1760, 0.02, 0]),
  ['whoosh', T.swing1 - 0.2, 0.3, 0.05], ['pop', T.miss1, 440, 0.04, 0.3],
  ...stingerCues(T.p2, { key: KEY, kind: 'gameshow' }), ['boom', T.p2Land, 0.3],
  ['riser', T.power[0], T.grab, 0.06], ['glitter', T.grab, T.grab + 0.8], ['bell', T.grab, 1760, 0.04, 1.2, 0],
  ...HIT_TIMES.map((a, i) => ['pop', a, [880, 987.77, 1174.66, 1318.51][i % 4] * (i > 7 ? 2 : 1), 0.04, (i % 2 ? 0.3 : -0.3)]),
  ['boom', T.ko, 0.45], ['crash', T.ko, { gain: 0.07, len: 2.2 }], ['glitter', T.ko, T.ko + 1],
  ...stingerCues(T.clear, { key: KEY, kind: 'gameshow' }),
  ['pop', T.scores, 1174.66, 0.04, 0], ['glitter', T.comet, T.comet + 0.6],
  ['whoosh', T.rhyme - 0.1, 0.3, 0.04],
  ...wordPops(T.last, 3, 0.08, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['bell', T.lastLand + 0.05, 1760, 0.025, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawPixelStar; void PINK; void CYAN
