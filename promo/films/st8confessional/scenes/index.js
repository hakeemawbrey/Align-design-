// st8confessional (30 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E20 · reality-TV confessionals) · story
// 0–25.6, then the shared end card.
//   "Who almost texted their ex? *Everyone.*"  A reality show's confessional booths: a CONFESSIONAL bug, a name lower
//   third with a tagline, a ring-light glow, white-on-black subtitles, the unsent draft on each phone with a red ✕ NOT SENT.
//   0.00–2.60  frame 0: the 3×3 grid of booths, eight guilty stars with glowing phones, the middle booth behind a curtain
//              ("BOOTH 9 · TBA"), the hook card.
//   2.60–15.6  rapid-fire booths, one cut every 2.15 s: ♉ Taurus "a picture of soup." · ♊ Gemini · ♑ Capricorn · ♌ Leo
//              (9.6: the ghost leans out from behind the potted plant) · ♈ Aries · ♓ Pisces.
//  15.60–19.4  FINAL BOOTH. The curtain opens on Venus herself, gold-rimmed (she's the Morning Star now): "…i almost texted
//              Mars."  Gasp zoom. Then: "i called the Moon instead."
//  19.40–25.6  back to the grid, now with Venus in the middle: everyone exhales (phew puffs), the phones go dark one by one.
//              (23.4: the hidden comet crosses above the grid.) Last line: "Almost doesn't *count.* | Phew."
// Rewatch bait: the curtain on booth 9 is there from frame 0, and the plant is in every booth but only hides the ghost once.
// One canvas (sky + booths + cast), DOM type (hook, last line), grain on top. Pure f(t).
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { VENUS, drawVenus, drawComet, drawPhone, drawDayChip, hookCard, hookCues, stingerCues, genreBug } from '../../st8cast.js'
import { clamp, lerp, prog, ease, easeOutBack, popOut, r3, pixFont, wordPops, NOTE, GOLD, BONE, INK, INTER } from './kit.js'

export const DURATION = 30
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const RED = '#ff3d5a'

// ── the booths
const BOOTHS = [
  { id: 'taurus', tag: 'LOVES A SLOW COOK', quote: 'a picture of soup.', draft: '(photo: soup)' },
  { id: 'gemini', tag: 'TEXTS IN BURSTS', quote: '“hey.” then “hey.” | then “heyyy.”', draft: 'heyyy' },
  { id: 'capricorn', tag: 'BOOKED TILL 2031', quote: 'a calendar invite. | “closure, 15 min.”', draft: 'invite (15m)' },
  { id: 'leo', tag: 'HAS A SPOTLIGHT', quote: 'a selfie. | for closure.', draft: '(selfie)' },
  { id: 'aries', tag: 'WAKES UP AT 5', quote: '“u up?” | at 6 a.m. from the gym.', draft: 'u up?' },
  { id: 'pisces', tag: 'FEELS EVERYTHING', quote: 'a voice memo. | it was a song.', draft: 'memo 9:12' },
]
const T0 = 2.6, STEP = 2.15
const T = {
  hookOut: [2.35, 2.6], booths: BOOTHS.map((_, i) => r3(T0 + i * STEP)), final: 15.5, curtain: [16.2, 16.7],
  v1: 16.8, gasp: 17.75, v2: 19.0, grid: 20.6, phew: 21.1, dark: [22.2, 23.4], comet: 23.4, ghost: 9.6,
  last: 21.2, lastLand: 21.7, out: [25.1, 25.5],
}
export const GHOST = { at: T.ghost, x: 220, y: 960, where: 'leaning out from behind the potted plant in Leo’s confessional booth (left)' }
export const COMET = { at: T.comet, where: 'tiny, across the sky above the booth grid at the end' }
const boothAt = t => { let k = -1; T.booths.forEach((a, i) => { if (t >= a) k = i }); return k }

// the grid: 3×3 tiles, Venus's curtain in the middle
const GRID_IDS = ['taurus', 'gemini', 'capricorn', 'leo', 'venus', 'aries', 'pisces', 'libra', 'scorpio']
const TW = 330, TH = 360, GX = 540 - 1.5 * TW - 12, GY = 540
const tileXY = i => [GX + (i % 3) * (TW + 12), GY + Math.floor(i / 3) * (TH + 12)]
const SET = { taurus: '#3a2a1a', gemini: '#3a3410', capricorn: '#10342a', leo: '#3a2410', aries: '#3a1a14', pisces: '#1e1c44', libra: '#3a1838', scorpio: '#3a1020', venus: '#3a1a2c' }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 50px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Who almost texted | their ex? *Everyone.*', at: 0, out: T.hookOut[0], size: 100, accentSize: 156, top: 180, accentColor: '#ff8fb1' })
  const LAST = popText(root, 'Almost doesn’t *count.* | Phew.', { top: 200, size: 104, accentSize: 164, at: T.last, gap: 0.08, accentColor: '#ff8fb1', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function setWall(x0, y0, w, h, col, t, s = 1) {
    x.fillStyle = col; x.fillRect(x0, y0, w, h)
    // bokeh
    x.save(); x.beginPath(); x.rect(x0, y0, w, h); x.clip(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 9; i++) {
      const bx = x0 + ((i * 0.37 + 0.11) % 1) * w, by = y0 + ((i * 0.61 + 0.2) % 1) * h * 0.7
      x.fillStyle = `rgba(255,220,180,${0.06 + 0.04 * Math.sin(t + i)})`; x.beginPath(); x.arc(bx, by, (30 + (i % 4) * 16) * s, 0, Math.PI * 2); x.fill()
    }
    // ring-light glow
    const g = x.createRadialGradient(x0 + w / 2, y0 + h * 0.45, 0, x0 + w / 2, y0 + h * 0.45, w * 0.55)
    g.addColorStop(0, 'rgba(255,250,240,0.18)'); g.addColorStop(1, 'rgba(255,250,240,0)')
    x.fillStyle = g; x.fillRect(x0, y0, w, h)
    x.restore()
  }
  function plant(px, py, s) {
    x.fillStyle = INK; x.fillRect(px - 44 * s, py - 10 * s, 88 * s, 90 * s)
    x.fillStyle = '#b0603a'; x.fillRect(px - 38 * s, py - 4 * s, 76 * s, 80 * s)
    x.fillStyle = '#2f8a4a'
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35; x.save(); x.translate(px, py - 6 * s); x.rotate(a + Math.PI / 2); x.fillRect(-10 * s, -150 * s, 20 * s, 150 * s); x.restore() }
    x.fillStyle = '#4fb86a'; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35; x.fillRect(px + Math.cos(a) * 120 * s - 8 * s, py - 6 * s + Math.sin(a) * 120 * s - 8 * s, 16 * s, 16 * s) }
  }
  function lowerThird(t, at, name, tag, col) {
    const k = ease.outCubic(prog(t, at + 0.05, at + 0.3))
    const w = 620 * k
    x.fillStyle = col; x.fillRect(0, 1192, w, 66)
    x.fillStyle = 'rgba(10,6,20,0.88)'; x.fillRect(0, 1258, w * 0.9, 40)
    if (k > 0.6) {
      pixFont(x, name, 60, 1226, 40, '#fff', { align: 'left', shadow: 'rgba(0,0,0,0.4)', font: INTER, weight: 800 })
      pixFont(x, tag, 60, 1279, 22, BONE, { align: 'left', shadow: null })
    }
  }
  function subtitle(t, at, text) {
    if (t < at) return
    const rows = text.split('|').map(s => s.trim())
    x.font = `700 50px ${INTER}`
    rows.forEach((row, j) => {
      const w = x.measureText(row).width
      const y = 1400 + j * 74
      x.fillStyle = 'rgba(0,0,0,0.78)'; x.fillRect(540 - w / 2 - 20, y - 36, w + 40, 70)
      pixFont(x, row, 540, y, 50, '#ffffff', { font: INTER, weight: 700, shadow: null })
    })
  }
  function notSent(t, px, py, at) {
    const k = easeOutBack(prog(t, at, at + 0.25), 2.4)
    if (k <= 0) return
    x.save(); x.translate(px, py); x.rotate(-0.14); x.scale(k, k)
    x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-110, -26, 220, 52)
    pixFont(x, '✕ NOT SENT', 0, 2, 28, RED, { shadow: null })
    x.restore()
  }
  function stage_(t, col) {
    setWall(0, 0, 1080, 1920, col, t)
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 1140, 1080, 780)
    // the show's neon sign on the wall
    const fl = Math.floor(t * 7) % 23 === 0 ? 0.5 : 1
    x.save(); x.globalAlpha = fl; x.shadowColor = '#ff6fa8'; x.shadowBlur = 24
    pixFont(x, '★ EX RETROGRADE ★', 540, 470, 54, '#ffc2dc', { shadow: null })
    x.restore()
    plant(160, 1080, 1.3)
    x.fillStyle = INK; x.fillRect(430, 1080, 220, 30); x.fillRect(450, 1100, 20, 60); x.fillRect(610, 1100, 20, 60)
  }
  function booth(t, i) {
    const B = BOOTHS[i], st = signStar(B.id), at = T.booths[i]
    stage_(t, SET[B.id])
    if (i === 3) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.3, from: 'left', cell: 3 })
    const mood = { taurus: 'happy', gemini: 'wink', capricorn: 'squint', leo: 'sparkle', aries: 'wide', pisces: 'sleepy' }[B.id]
    const r = drawStarChar(x, 520, 880, 480, t, { color: st.color, glyph: st.glyph, mood, look: [1, 0], hops: [at + 0.3, at + 0.9], seed: 10 + i })
    drawPhone(x, r.x + 320, 820, 200, t, { text: B.draft, buzz: 0 })
    notSent(t, r.x + 320, 980, at + 0.7)
    lowerThird(t, at, `${st.glyph} ${B.id.toUpperCase()}`, B.tag, st.color)
    subtitle(t, at + 0.15, B.quote)
  }
  function venusBooth(t) {
    stage_(t, SET.venus)
    const mood = t < T.gasp ? 'neutral' : t < T.v2 ? 'wide' : 'happy'
    const z = gaspZoom(t, { at: T.gasp, dur: 1.3, x: 520, y: 880, amount: 0.3, follow: 0.6 })
    x.save(); z.apply(x)
    drawVenus(x, 540, 880, 480, t, { morning: 1, mood, look: t < T.v2 ? [1, 0] : [0, 0], hops: [T.v1 + 0.3, T.v2 + 0.2] })
    x.restore()
    drawGaspLines(x, t, { at: T.gasp, dur: 1.3, x: 520, y: 880, follow: 0.6, color: VENUS.tagColor })
    // the curtain opens
    const cp = ease.inOutCubic(prog(t, ...T.curtain))
    if (cp < 1) for (const s of [-1, 1]) {
      const w = 540 * (1 - cp)
      x.fillStyle = '#7a1838'; x.fillRect(s < 0 ? 0 : 1080 - w, 0, w, 1920)
      for (let i = 0; i < w; i += 40) { x.fillStyle = '#9a2448'; x.fillRect((s < 0 ? 0 : 1080 - w) + i, 0, 16, 1920) }
    }
    if (t < T.curtain[0] + 0.1) {
      const k = easeOutBack(prog(t, T.final, T.final + 0.3), 2)
      x.save(); x.translate(540, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-380, -90, 760, 180); x.fillStyle = GOLD; x.fillRect(-370, -80, 740, 160)
      pixFont(x, 'FINAL BOOTH', 0, -14, 70, INK, { shadow: null }); pixFont(x, 'BOOTH 9', 0, 50, 28, INK, { shadow: null })
      x.restore()
    }
    if (t >= T.curtain[1]) {
      lowerThird(t, T.curtain[1], '♀ VENUS', 'THE MORNING STAR (NOW)', VENUS.color)
      subtitle(t, T.v1, t < T.v2 ? '…i almost | texted Mars.' : 'i called | the Moon instead.')
    }
  }
  function grid(t, final) {
    drawSky(x, t, SKY_H)
    drawSeedConstellation(x, t, 100, { alpha: 0.55 })
    if (final && t > T.comet && t < T.comet + 1.5) { const p = prog(t, T.comet, T.comet + 1.5); drawComet(x, lerp(1060, 40, p), lerp(500, 470, p), 28, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [1, 0.1] }) }
    GRID_IDS.forEach((id, i) => {
      const [x0, y0] = tileXY(i), pk = final ? easeOutBack(prog(t, T.grid + i * 0.04, T.grid + i * 0.04 + 0.3), 2) : 1
      x.save(); x.translate(x0 + TW / 2, y0 + TH / 2); x.scale(pk, pk); x.translate(-x0 - TW / 2, -y0 - TH / 2)
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, TW + 12, TH + 12)
      setWall(x0, y0, TW, TH, SET[id], t, 0.35)
      const darkK = final ? prog(t, T.dark[0] + i * 0.12, T.dark[0] + i * 0.12 + 0.2) : 0
      if (id === 'venus') {
        if (!final) {
          x.fillStyle = '#7a1838'; x.fillRect(x0, y0, TW, TH)
          for (let k = 0; k < TW; k += 32) { x.fillStyle = '#9a2448'; x.fillRect(x0 + k, y0, 12, TH) }
          x.fillStyle = INK; x.fillRect(x0 + 40, y0 + TH / 2 - 34, TW - 80, 68); x.fillStyle = GOLD; x.fillRect(x0 + 46, y0 + TH / 2 - 28, TW - 92, 56)
          pixFont(x, 'BOOTH 9 · TBA', x0 + TW / 2, y0 + TH / 2, 22, INK, { shadow: null })
        } else {
          drawVenus(x, x0 + TW / 2 - 30, y0 + TH / 2 + 10, 190, t, { morning: 1, mood: t > T.phew ? 'happy' : 'neutral', seed: 30 })
          drawPhone(x, x0 + TW - 60, y0 + TH / 2 + 30, 80, t, { text: null, lit: 1 - darkK })
        }
      } else {
        const st = signStar(id)
        const guilty = !final ? { mood: i % 2 ? 'squint' : 'wide', look: [1, 0] } : t > T.phew ? { mood: 'happy' } : { mood: 'neutral', look: [1, 0] }
        const sq = final && t > T.phew && t < T.phew + 0.6 ? 0.18 * Math.sin(Math.PI * prog(t, T.phew, T.phew + 0.6)) : 0
        drawStarChar(x, x0 + TW / 2 - 30, y0 + TH / 2 + 10, 190, t, { color: st.color, glyph: null, ...guilty, squash: sq, seed: 40 + i, glow: 0.7 })
        drawPhone(x, x0 + TW - 60, y0 + TH / 2 + 30, 80, t, { text: null, lit: 1 - darkK, buzz: final ? 0 : 0.3 })
        pixFont(x, `${st.glyph} ${id.toUpperCase()}`, x0 + 14, y0 + TH - 24, 18, BONE, { align: 'left' })
      }
      // phew puffs
      if (final && t > T.phew && t < T.phew + 1) {
        const p = prog(t, T.phew + (i % 3) * 0.05, T.phew + 1)
        x.save(); x.globalAlpha = Math.sin(Math.PI * p)
        x.fillStyle = '#ffffff'
        for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(x0 + TW / 2 + 40 + p * 60 + k * 18, y0 + TH / 2 - 40 - p * 30, 10 + k * 4, 0, Math.PI * 2); x.fill() }
        x.restore()
        if (i === 4) pixFont(x, 'phew', x0 + TW / 2 + 90, y0 + 40, 30, BONE, { alpha: Math.sin(Math.PI * p) })
      }
      x.restore()
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const b = boothAt(t)
      if (t < T0) grid(t, false)
      else if (t < T.final) booth(t, b)
      else if (t < T.grid) venusBooth(t)
      else {
        grid(t, true)
        if (ok < 1) { x.save(); x.globalAlpha = 1 - clamp(ok); drawSky(x, t, SKY_H); drawSeedConstellation(x, t, 100, { alpha: 0.55 }); x.restore() }
      }
      // the cut flash between booths
      const ct = [...T.booths, T.final, T.grid].filter(a => a <= t).pop()
      if (ct !== undefined && t - ct < 0.1) { x.fillStyle = `rgba(255,255,255,${0.7 * (1 - (t - ct) / 0.1)})`; x.fillRect(0, 0, 1080, 1920) }
      if (t >= T0 && t < T.grid) {
        genreBug(x, t, { text: 'CONFESSIONAL', x: 70, y: 232, color: RED, blink: true })
        pixFont(x, `REC · ${String(23 + Math.floor((t - T0) / STEP)).padStart(2, '0')}:4${Math.floor(t * 3) % 10}`, 70, 290, 22, BONE, { align: 'left', alpha: 0.8 })
      }
      drawDayChip(x, t, { day: 35, phase: 'morning' })
      hook.update(t)
      LAST.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.6 (grid → the first booth), 20.6 (Venus → back to the grid). cardfx keeps the second.
const CUTS = [{ t: 2.55, kind: 'flip' }, { t: 20.55, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E20' }), cardCuts(CUTS)]

const blips = (at, n, base) => Array.from({ length: n }, (_, i) => ['pop', r3(at + i * 0.07), NOTE[(base + i * 2) % NOTE.length], 0.018, 0])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...T.booths.flatMap((a, i) => [['whoosh', r3(a - 0.06), 0.2, 0.04], ['tick', a, 0.08], ['pop', r3(a + 0.1), 1174.66, 0.03, -0.3], ...blips(a + 0.18, 6, i), ['tick', r3(a + 0.7), 0.06]]),
  ['tick', T.ghost + 0.05, 0.015],
  ...stingerCues(T.final, { key: KEY, kind: 'trailer' }),
  ['whoosh', T.curtain[0], 0.5, 0.04],
  ...blips(T.v1 + 0.05, 7, 2),
  ...gaspCues(T.gasp, { key: KEY }),
  ...blips(T.v2 + 0.05, 7, 4),
  ['whoosh', T.grid - 0.06, 0.3, 0.04],
  ...GRID_IDS.map((_, i) => ['pop', r3(T.grid + i * 0.04 + 0.05), NOTE[i % NOTE.length], 0.022, 0]),
  ['whoosh', T.phew, 0.8, 0.05], ...stingerCues(T.phew + 0.05, { key: KEY, kind: 'sitcom' }),
  ...GRID_IDS.map((_, i) => ['tick', r3(T.dark[0] + i * 0.12), 0.03]),
  ['glitter', T.comet, T.comet + 0.6],
  ...wordPops(T.last, 3, 0.08, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['bell', T.lastLand + 0.05, 1760, 0.025, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
