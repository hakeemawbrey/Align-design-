// srtwelvesigns — "All 12 signs in 60 seconds." (60 s vertical, Star Talk Remix of promo/films/twelvesigns; funk, D).
// The twelve sign stars wait in a line along the bottom; each hops up to centre stage on its downbeat (colour wash, name,
// date pill, the original's prop gag) and introduces itself in the box, then hops back. Running gags: ♓ Pisces is last
// in line and crying the whole time; ♌ Leo won't leave the spotlight (it hangs about through Virgo's turn); ♐ Sag bolts
// mid-sentence. Story 0–55.6, then the shared end card.
//   0.00–3.3   "All *12 signs* | in 60 seconds."  the twelve pop into line; THE STARS: "12 signs. one minute. *line up!*"
//   3.38 + 3.333·i  sign i lands (6 beats each): ♈ "I go first. questions *later.*" · ♉ "comfort is a *lifestyle.*" ·
//              ♊ "forty tabs open. all *important.*" · ♋ "home is my whole *personality.*" · ♌ "main character *energy.*" ·
//              ♍ "I have a *spreadsheet* for that." (Leo still in its spotlight; Virgo rolls its eyes) ·
//              ♎ "can't pick. look *great* deciding." · ♏ "I already know your *secret.*" · ♐ "packed a bag. gotta *g—*"
//              (gone) · ♑ "five-year plan. since age *five.*" · ♒ "liked it before it was *cool.*" ·
//              ♓ "I cry at commercials. *lovingly.*" (a fountain)
//   43.38      all twelve hop in line.  ★ LESSON UNLOCKED (43.93): "Different isn't | wrong. It's | *interesting.*"  +12 FRIENDS
//   48.5–52.6  "Card first. | Face *last.*" a veiled mystery card, its sign badge cycling through all twelve.
//              THE STARS: "your sign shows. your face *waits.*"
//   52.75–55.5 "Tag your *sign.*" the line does a wave, glyphs rain.
//   55.6       end card.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { BONE, GOLD, VOID, tint, hexA, ink, rocket, snacks, tabs, house, stage as stageProp, sheet, scales, keyhole, backpack, peak, bulb, fishes } from './art.js'
import { starFrame, inSprite, tearsCells, sweatDrop, cellToWorld, drawChip, drawMysteryCard, speedStreaks } from './props.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const BT = 60 / 108
const beat = n => +(0.6 + n * BT).toFixed(3)
const TAU = Math.PI * 2
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH = "'DejaVu Sans', 'Noto Sans Symbols', sans-serif"

// ── timeline
const S = SIGNS.map((_, i) => beat(5 + 6 * i))          // sign downbeats (6 beats each)
const SEG = 6 * BT
export const T = {
  h0: 0.12, h0Out: [3.0, 3.18], line0: 0.55,
  allHop: beat(77), lesson: beat(78), lessonOut: [48.2, 48.4],
  card: 48.5, cardOut: [52.45, 52.7], h6: 48.5, h6Land: 49.05,
  tag: 52.8, tagLand: beat(94), out: [55.25, 55.55],
}
const INFO = [
  { dates: 'MAR 21 – APR 19', prop: rocket, text: 'I go first. questions *later.*' },
  { dates: 'APR 20 – MAY 20', prop: snacks, text: 'comfort is a *lifestyle.*' },
  { dates: 'MAY 21 – JUN 20', prop: tabs, text: 'forty tabs open. all *important.*' },
  { dates: 'JUN 21 – JUL 22', prop: house, text: 'home is my whole *personality.*' },
  { dates: 'JUL 23 – AUG 22', prop: stageProp, text: 'main character *energy.*' },
  { dates: 'AUG 23 – SEP 22', prop: sheet, text: 'I have a *spreadsheet* for that.' },
  { dates: 'SEP 23 – OCT 22', prop: scales, text: "can't pick. look *great* deciding." },
  { dates: 'OCT 23 – NOV 21', prop: keyhole, text: 'I already know your *secret.*' },
  { dates: 'NOV 22 – DEC 21', prop: backpack, text: 'packed a bag. gotta *g—*' },
  { dates: 'DEC 22 – JAN 19', prop: peak, text: 'five-year plan. since age *five.*' },
  { dates: 'JAN 20 – FEB 18', prop: bulb, text: 'liked it before it was *cool.*' },
  { dates: 'FEB 19 – MAR 20', prop: fishes, text: 'I cry at commercials. *lovingly.*' },
]
const TAGS = SIGNS.map(s => `${s.glyph}︎ ${s.name.toUpperCase()}`)
const LIGHT = SIGNS.map(s => tint(s.color, '#ffffff', 0.45))
const SKY_TAG = 'THE STARS'
const BOX_A = [{ t: 0.3, speaker: SKY_TAG, text: 'twelve of us. one minute. *go!*' }]
const BOX_S = SIGNS.map((s, i) => ({ t: +(S[i] + 0.2).toFixed(3), speaker: TAGS[i], color: LIGHT[i], text: INFO[i].text }))
const BOX_C = [{ t: 48.65, speaker: SKY_TAG, text: 'your sign shows. your face *waits.*' }]
const BOXES = [[BOX_A, 0.15, 3.3], [BOX_S, S[0] + 0.05, S[11] + SEG - 0.3], [BOX_C, 48.5, 52.6]]
export const ALL_BOXES = BOXES
const CPS = 28
const ST = lineTimes(BOX_S, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Different isn’t | wrong. It’s | *interesting.*', chip: '+12 FRIENDS' }
const CUTS = [3, 7, 11].map((i, k) => ({ t: +(S[i] - 0.15).toFixed(3), kind: ['flip', 'deal', 'shuffle'][k], keep: true }))

// leo lingers through Virgo; sag bolts mid-line
const LEO = 4, VIR = 5, SAG = 8, PIS = 11
const SAG_GO = ST[SAG].chars[20] + 0.1          // just as "g—" types
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const LINE_Y = 1318, SLOT = i => 540 + (i - 5.5) * 82
const CEN = { x: 540, y: 655, s: 300 }
const cur = t => { let c = -1; S.forEach((s, i) => { if (t >= s - 0.4 && t < s + SEG - 0.4) c = i }); return c }

/** where sign star i is at t: { x, y, s, onStage } */
function posOf(i, t) {
  const a0 = S[i] - 0.4, a1 = S[i] - 0.02, b0 = S[i] + SEG - 0.42, b1 = S[i] + SEG - 0.06
  let endB0 = b0, endB1 = b1
  if (i === LEO) { endB0 = S[VIR] + SEG - 0.42; endB1 = S[VIR] + SEG - 0.06 }
  const home = { x: SLOT(i), y: LINE_Y, s: 74, stage: 0 }
  if (t >= T.tag - 0.35) {   // the group photo for "Tag your sign."
    const p = ease.inOutCubic(prog(t, T.tag - 0.35 + i * 0.03, T.tag + 0.25 + i * 0.03))
    const gx = 540 + ((i % 6) - 2.5) * 168, gy = i < 6 ? 640 : 900
    return { x: lerp(home.x, gx, p), y: lerp(home.y, gy, p) - 160 * Math.sin(Math.PI * p), s: lerp(74, 150, p), stage: 0.6 * p }
  }
  if (t < a0 || t >= endB1) return home
  if (t < a1) { const p = ease.inOutCubic(prog(t, a0, a1)); return { x: lerp(home.x, CEN.x, p), y: lerp(home.y, CEN.y, p) - 260 * Math.sin(Math.PI * p), s: lerp(74, CEN.s, p), stage: p } }
  if (i === LEO && t >= b0) {   // slides over to the side, still glowing in its spotlight
    const p = ease.inOutCubic(prog(t, b0, b1))
    if (t < endB0) return { x: lerp(CEN.x, 905, p), y: lerp(CEN.y, 700, p), s: lerp(CEN.s, 170, p), stage: 1 }
  }
  if (i === SAG && t >= SAG_GO) {   // zooms off to the right, comes back in from the left for the hop home
    const p = ease.inCubic(prog(t, SAG_GO, SAG_GO + 0.35))
    if (t < b0) return { x: lerp(CEN.x, 1500, p), y: CEN.y, s: CEN.s, stage: 1 }
  }
  if (t < endB0) return { x: CEN.x, y: CEN.y, s: CEN.s, stage: 1 }
  const p = ease.inOutCubic(prog(t, endB0, endB1))
  const fromX = i === LEO ? 905 : i === SAG ? -200 : CEN.x, fromY = i === LEO ? 700 : CEN.y, fromS = i === LEO ? 170 : CEN.s
  return { x: lerp(fromX, home.x, p), y: lerp(fromY, home.y, p) - 200 * Math.sin(Math.PI * p), s: lerp(fromS, 74, p), stage: 1 - p }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "100px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { size: 112, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [HT('All *12 signs* | in 60 seconds.', { top: 150, at: T.h0, late: 0, accentSize: 136 }), T.h0Out],
    [HT('Card first. | Face *last.*', { top: 140, at: T.h6, lateAt: T.h6Land }), T.cardOut],
    [HT('Tag your *sign.*', { top: 150, size: 120, accentSize: 170, at: T.tag, lateAt: T.tagLand }), T.out],
  ]
  const NAMES = SIGNS.map((s, i) => [popText(root, s.name, { top: 150, size: 132, at: S[i] - 0.12, accentSize: 150 }), [S[i] + SEG - 0.5, S[i] + SEG - 0.35]])
  const eyebrow = el('div', { position: 'absolute', left: 0, width: '1080px', top: '104px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.24em', color: GOLD, textShadow: '0 3px 12px rgba(6,4,18,0.9)', display: 'none' }, root, '')
  const BOX = { y: 1440, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const HOPS = SIGNS.map((_, i) => [...talkHops(BOX_S, TAGS[i], { cps: CPS }), T.allHop + i * 0.05, T.lesson + 0.1, T.tagLand + i * 0.09, T.tagLand + 1.2 + i * 0.09])
  const SKY_HOPS = talkHops([...BOX_A, ...BOX_C], SKY_TAG, { cps: CPS })

  function wash(t) {
    const c = cur(t)
    if (c < 0) return
    const col = SIGNS[c].color, k = clamp(prog(t, S[c] - 0.35, S[c] - 0.05)) * (1 - prog(t, S[c] + SEG - 0.45, S[c] + SEG - 0.3))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, hexA(tint(col, VOID, 0.45), 0.75)); g.addColorStop(0.45, hexA(tint(col, VOID, 0.25), 0.6)); g.addColorStop(1, hexA(tint(col, VOID, 0.6), 0.85))
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    x.translate(CEN.x, CEN.y); x.rotate(t * 0.25 + c); x.globalCompositeOperation = 'lighter'
    for (let q = 0; q < 16; q++) { const a0 = q * TAU / 16; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1500, a0, a0 + TAU / 32); x.closePath(); x.fillStyle = hexA(tint(col, '#ffffff', 0.3), 0.07); x.fill() }
    x.restore()
    // the landing flash
    const fl = Math.exp(-Math.max(0, t - S[c]) * 6) * (t >= S[c] ? 1 : 0)
    if (fl > 0.01) { x.save(); x.globalAlpha = 0.35 * fl; x.fillStyle = tint(col, '#ffffff', 0.5); x.fillRect(0, 0, W, H); x.restore() }
  }
  function pill(t, i) {
    const pp = easeOutBack(prog(t, S[i] + BT * 0.5, S[i] + BT * 0.5 + 0.35), 2.4) * (1 - prog(t, S[i] + SEG - 0.5, S[i] + SEG - 0.35))
    if (pp <= 0.01) return
    x.save(); x.translate(540, 335); x.scale(pp, pp)
    x.font = `700 36px ${MONO}`; const tw = x.measureText(INFO[i].dates).width
    x.beginPath(); x.roundRect(-tw / 2 - 30, -34, tw + 60, 68, 34); ink(x, tint(SIGNS[i].color, '#ffffff', 0.45), { w: 5, fa: 0.0, glow: 14 }); x.fillStyle = hexA(VOID, 0.6); x.fill()
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(INFO[i].dates, 2, 3)
    x.restore()
  }
  function propOf(t, i) {
    const u = t - S[i]
    if (u < 0 || u > SEG) return
    const k = easeOutBack(prog(u, BT, BT + 0.4), 2.2) * (1 - ease.inQuad(prog(u, SEG - 0.5, SEG - 0.3)))
    if (k > 0.01) INFO[i].prop(x, 540, 1040 + 6 * Math.sin(t * 2.2), 0.6 * k, u + BT, tint(SIGNS[i].color, '#ffffff', 0.38))
  }
  function moodOf(i, t, onStage) {
    if (t >= T.lesson) return { mood: t > T.tagLand ? 'happy' : 'sparkle', look: [0, -1] }
    if (t >= T.allHop) return { mood: 'happy', look: [0, 0] }
    if (i === PIS) return { mood: onStage ? 'sparkle' : 'sparkle', look: onStage ? [0, 0] : [-1, -1] }
    if (onStage > 0.5) {
      if (i === LEO) return { mood: t > S[VIR] ? 'sparkle' : 'heart', look: t > S[VIR] ? [-1, 0] : [0, 0] }
      if (i === VIR) return { mood: inR(t, ST[VIR].done + 0.1, S[VIR] + SEG - 0.5) ? 'eyeroll' : 'squint', look: inR(t, ST[VIR].done + 0.1, S[VIR] + SEG - 0.5) ? undefined : [1, 0] }
      if (i === SAG) return { mood: t > SAG_GO - 0.3 ? 'wide' : 'happy', look: [1, 0] }
      return { mood: ['wide', 'sleepy', 'wide', 'heart', 'heart', 'squint', 'sparkle', 'squint', 'happy', 'neutral', 'wink', 'sparkle'][i], look: i === 7 ? [1, 0] : [0, 0] }
    }
    const c = cur(t)
    if (c === i) return { mood: 'wide', look: [0, -1] }
    const done = c > i || (c < 0 && t > S[11])
    return { mood: done ? 'happy' : 'neutral', look: c >= 0 ? [Math.sign(CEN.x - SLOT(i)), -1] : [0, 0] }
  }
  function drawSign(i, t) {
    const p = posOf(i, t)
    const intro = pop01(t, T.line0 + i * 0.09, 0.35, 2.6)
    if (intro <= 0.01) return
    const m = moodOf(i, t, p.stage)
    const wave = t >= T.tagLand ? 0 : 0
    const opts = { color: SIGNS[i].color, glyph: p.s >= 140 ? SIGNS[i].glyph : null, mood: m.mood, look: m.look, hops: HOPS[i], seed: 3 + i, bob: p.s * 0.03, pop: intro, zzz: false, squash: p.stage > 0.9 ? 0.15 * bump(t, S[i], 0.3) : 0 }
    // Leo's spotlight while it lingers
    if (i === LEO && p.stage > 0.5) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(p.x, p.y, 10, p.x, p.y, p.s * 1.4); g.addColorStop(0, 'rgba(255,224,138,0.35)'); g.addColorStop(1, 'rgba(255,224,138,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(p.x - 60, 0); x.lineTo(p.x + 60, 0); x.lineTo(p.x + p.s * 1.1, p.y + p.s * 0.6); x.lineTo(p.x - p.s * 1.1, p.y + p.s * 0.6); x.closePath(); x.fill()
      x.restore()
    }
    if (i === SAG && t >= SAG_GO && t < S[SAG] + SEG - 0.42) speedStreaks(x, t, p.x - 80, p.y, 1)
    drawStarChar(x, p.x, p.y, p.s, t, opts)
    const F = starFrame(p.x, p.y, p.s, t, opts)
    if (i === PIS) inSprite(x, F, () => tearsCells(x, t, p.stage > 0.5 && t > S[PIS] + 0.6 ? 3 : 2))
    if (i === LEO && inR(t, S[VIR] + 0.3, S[VIR] + SEG - 0.5)) drawChip(x, 905, 520, '(still here)', { k: pop01(t, S[VIR] + 0.3, 0.3, 2.4), size: 24, bar: SIGNS[LEO].color })
  }
  function drawGuide(t) {
    // THE STARS host: at the hook and the card
    const k = t < 3.4 ? pop01(t, 0.15, 0.4, 2.4) * (1 - ease.inCubic(prog(t, 3.0, 3.35))) : t >= T.card && t < T.cardOut[1] ? pop01(t, T.card, 0.4, 2.4) * outK(t, T.cardOut) : 0
    if (k <= 0.01) return
    const y = t < 3.4 ? 760 : 1130, xx = t < 3.4 ? 540 : 880, s = t < 3.4 ? 300 : 170
    drawStarChar(x, xx, y, s, t, { color: STAR.sky, mood: t < 1.6 ? 'wide' : 'happy', look: t < 3.4 ? [0, 0] : [-1, -1], hops: SKY_HOPS, seed: 2, pop: k })
    if (t < 3.4) {   // a gold stopwatch ticking above it
      x.save(); x.translate(xx, y - 250); x.scale(k, k)
      x.beginPath(); x.arc(0, 0, 54, 0, TAU); ink(x, GOLD, { w: 7, fa: 0.2 })
      x.beginPath(); x.moveTo(0, 0); const a = -Math.PI / 2 + t * 6; x.lineTo(Math.cos(a) * 40, Math.sin(a) * 40); ink(x, '#fff3e0', { w: 6, fa: 0, glow: 10 })
      x.beginPath(); x.roundRect(-14, -74, 28, 16, 5); ink(x, GOLD, { w: 5, fa: 0.4 })
      x.restore()
    }
  }
  function card(t) {
    if (t < T.card || t > T.cardOut[1]) return
    const k = pop01(t, T.card, 0.45, 1.8) * outK(t, T.cardOut)
    const gi = Math.floor(Math.max(0, t - T.card) * 7) % 12, settle = t > 50.6
    const i = settle ? 7 : gi
    drawMysteryCard(x, 470, 760, 520, 660, t, { k, rot: -0.03 + 0.01 * Math.sin(t * 2), glyph: SIGNS[i].glyph, badge: SIGNS[i].color, lines: ['SIGN: SHOWN', 'FACE: LATER'], lineCols: [GOLD, BONE] })
  }
  function rain(t) {
    if (t < T.tagLand - 0.1) return
    const r = rng(41)
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let q = 0; q < 26; q++) {
      const s = SIGNS[q % 12], sp = 260 + r() * 200, x0 = 60 + r() * 960, ph = r() * 1.2
      const y = -80 + (t - T.tagLand + ph) * sp
      if (y > 1400 || y < -80) continue
      x.globalAlpha = 0.85 * clamp((t - T.tagLand) * 3) * outK(t, T.out)
      x.font = `bold 64px ${GLYPH}`; x.fillStyle = s.color; x.shadowColor = s.color; x.shadowBlur = 18
      x.save(); x.translate(x0, y); x.rotate((r() - 0.5) * 2 * (t - T.tagLand)); x.fillText(s.glyph + '︎', 0, 0); x.restore()
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      wash(t)
      const c = cur(t)
      if (c >= 0) { pill(t, c); propOf(t, c) }
      card(t)
      rain(t)
      drawGuide(t)
      // the line (stars on stage are drawn last, on top)
      const order = SIGNS.map((_, i) => i).sort((a, b) => posOf(a, t).stage - posOf(b, t).stage)
      x.save(); x.globalAlpha = outK(t, T.out)
      for (const i of order) drawSign(i, t)
      x.restore()
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [h, o] of NAMES) h.update(t, outK(t, o))
      const eb = c >= 0 && inR(t, S[c] - 0.2, S[c] + SEG - 0.35)
      eyebrow.style.display = eb ? 'block' : 'none'
      if (eb) { eyebrow.textContent = `${String(c + 1).padStart(2, '0')} / 12`; eyebrow.style.opacity = String(clamp(prog(t, S[c] - 0.2, S[c] + 0.1)) * (1 - prog(t, S[c] + SEG - 0.5, S[c] + SEG - 0.35))) }
      lesson.update(t)
      drawGrain(gx, t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
    },
  }
}

// ── sound (pop / pluck / bell are written in D major; the engine moves them into the score's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const PITCH = Object.fromEntries(TAGS.map((tg, i) => [tg, [523.25, 392, 880, 659.25, 587.33, 783.99, 698.46, 493.88, 987.77, 440, 830.61, 739.99][i]]))
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0), ...SIGNS.map((_, i) => ['pop', +(T.line0 + i * 0.09).toFixed(3), NOTE[i % 7] * (i > 6 ? 2 : 1), 0.022, (i - 5.5) / 7]),
  ...[1, 2, 3, 4].map(n => ['tick', beat(n), 0.05]),
  ...SIGNS.flatMap((_, i) => [
    ['whoosh', +(S[i] - 0.42).toFixed(3), 0.4, 0.035], ['pop', +(S[i] - 0.05).toFixed(3), NOTE[i % 7], 0.05, 0], ['pluck', S[i], [293.66, 220, 246.94, 196][i % 4], 0.05, 0.5, 0],
    ['tick', +(S[i] + BT * 0.5).toFixed(3), 0.05], ['glitter', +(S[i] + BT).toFixed(3), +(S[i] + BT + 0.4).toFixed(3)],
    ['whoosh', +(S[i] + SEG - 0.42).toFixed(3), 0.35, 0.025],
  ]),
  // gags: Leo's spotlight hum, Virgo's eye-roll, Sag's exit, Pisces' sob
  ['bell', S[VIR] + 0.35, 1174.66, 0.025, 1.0, 0.5], ['pop', ST[VIR].done + 0.15, 330, 0.04, -0.2],
  ['whoosh', SAG_GO, 0.5, 0.06], ['pop', SAG_GO, 1568, 0.04, 0.6], ['chip', SAG_GO + 0.02, 880, 0.3, { slide: 14, gain: 0.03, duty: 0.25, decay: 0.25, sustain: 0.5, bus: 'fx', rev: 0.05, dly: 0 }],
  ['chip', S[PIS] + 0.7, 659.25, 0.5, { wave: 'tri', vib: 0.08, slide: -4, gain: 0.035, decay: 0.45, sustain: 0.6, bus: 'fx', rev: 0.1, dly: 0 }],
  // all hop + lesson
  ...SIGNS.map((_, i) => ['pop', +(T.allHop + i * 0.05).toFixed(3), NOTE[i % 7] * 2, 0.018, (i - 5.5) / 7]),
  ...lessonCues(LESSON.at, { ...LESSON, key: 'D' }),
  // card + tag
  ...wordPops(T.h6, 3, 0.07, 1), ['pop', T.h6Land, 1174.66, 0.05, 0], ['pluck', T.h6Land, 1174.66, 0.04, 0.6, 0], ['whoosh', T.card, 0.5, 0.04],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.card + i / 7).toFixed(3), 0.025]), ['bell', 50.62, 1760, 0.03, 1.2, 0],
  ...wordPops(T.tag, 2, 0.07, 3), ['pop', T.tagLand, 1318.51, 0.06, 0], ['bell', T.tagLand + 0.02, 1318.51, 0.035, 1.6, 0], ['glitter', T.tagLand, T.tagLand + 1.4],
  ...SIGNS.map((_, i) => ['pop', +(T.tagLand + i * 0.09).toFixed(3), NOTE[(i + 2) % 7] * 2, 0.02, (i - 5.5) / 7]),
  // dialogue + cuts + end card
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [SKY_TAG]: 880, ...PITCH } })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
