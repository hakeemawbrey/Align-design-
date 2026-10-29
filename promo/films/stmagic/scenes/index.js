// stmagic — "The Great Starzini." (45 s vertical Align ad, Star Talk "Wild Lessons" #14, music: funk · Bb). Story 0–40.6,
// then the shared end card. A pixel magic show on a little dinner-theatre stage in the night sky: ♌ Leo, in a top hat and
// cape, makes every problem on his date "disappear". ♋ Cancer is the date. ♓ Pisces is the lovely assistant (tiara, crying).
//   0.00–3.38  "First date. | He brought *a cape.*"  Drumroll, the spotlight snaps on, the curtains part, POOF: Leo, wand up.
//              Cancer at the little candlelit table, sweating. The bulb sign: THE GREAT STARZINI.
//   3.38       DROP. TRICK 1, "the vanishing question." CANCER: "so… where is this going?" The question floats out as a
//              speech bubble. LEO: "for my first trick…" Drumroll, the wand flicks, the bubble is sucked into the top hat. POOF.
//              CANCER: "…did you just hat my question?"
//  12.27       TRICK 2, "the red flag curtain." A red flag shoots up: FLAKED 3×. LEO: "nothing to see here!" A little curtain
//              on a frame slides in front of it… the flag waves over the top, pops out the right, gets shoved, pops out the left.
//              CANCER: "it's still waving."
//  16.71       TRICK 3, "the fight, sawn in half." An angry scribble (the fight) dives into the sawing box (TUESDAY'S FIGHT),
//              its face poking out of the end. LEO: "and now… I saw it in half!" A saw floats in, saws, the halves slide apart,
//              and a whole fight pops out of EACH half. CANCER: "now there are two fights." Leo stuffs them back.
//  23.38       "TA-DA!" Crash. Silence. One slow clap (Pisces). The hat trembles, the curtain bulges, the box rattles…
//  25.60       BOOM, "Then it *all* | came back." Everything bursts out at once: the question (bigger), doves, a rabbit, the
//              flag rips through the curtain, the box flies open and two fights orbit the table. Leo's hat drops over his eyes.
//  28.38       BREAKDOWN, "Pick a card. | *Any card.*"  The chaos slows to a crawl. Cancer slides a talk card across the
//              table: "Where is this going?" Leo lifts his hat: "honestly? I like you. sorry I flaked." One by one the
//              problems shrink: the question gets a ✓ and pops, the flag folds down, the fights deflate.
//  32.82      ★ LESSON UNLOCKED: "No tricks. | Just *talk* it through." (+1 HONEST)
//  36.95       Tie-in, talk cards: "Same card. | *Both* answer." Both answers flip at once: "something real" ✓ ✓.
//  38.90       "Ta-*da.*"  The wand turns into one little flower; Leo offers it; Cancer goes heart-eyed; Pisces sobs.
//              Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + scene), DOM type + the text boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCell, hatCells, capeCells, bowCells, wandCells, tiaraCells, drawStage, drawMarquee,
  drawSpot, drawFootlights, drawTable, drawMagicHat, drawPedestal, drawQBubble, drawFlag, drawDrape, drawBox, drawSaw, drawFight,
  drawDove, drawRabbit, drawTalkCard, drawHeart, dustPuff, confetti, sparkleBurst, FLAG_RED } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid

const LEO = signStar('leo'), CAN = signStar('cancer'), PIS = signStar('pisces')
const VS = '︎'

// ── the timeline
export const T = {
  black: [0, 0.3], h0: 0.3, h0Land: 1.15, spot: 0.35, curt: [0.3, 1.0], poofIn: 0.62, poofOut: 3.1,
  date: BEAT(5),                                   // 3.378 drop
  qPop: 5.05, qFly: [7.0, 7.7], vanish: 7.75,
  t2: BEAT(21), flagUp: [12.3, 12.62], drapeIn: [13.2, 13.55], peekR: [14.45, 14.75], shove: 14.95, peekL: [15.05, 15.35], peekBack: [16.0, 16.3],
  t3: BEAT(29), boxIn: [16.75, 17.1], fightIn: [16.8, 17.15], dive: [17.35, 17.75], sawIn: [18.35, 18.65], saw: [18.65, 20.15], split: [20.3, 20.6], twoPop: 20.7, stuff: [22.4, 22.8],
  tada: BEAT(41), quiet: BEAT(42), claps: [24.15, 24.6, 25.0], rumble: [24.5, 25.6],
  burst: BEAT(45),                                 // 25.6
  bd: BEAT(50),                                    // 28.378
  cardSlide: [28.45, 28.9], hatUp: [28.95, 29.25], answered: 31.15, flagDown: [31.45, 31.8], deflate: [31.75, 32.15],
  cutL: 32.75, lesson: BEAT(58), lessonOut: [36.85, 37.05],   // 32.822
  tie: 36.95, cards: [37.0, 37.3], flip: [37.6, 37.9], tieOut: [38.65, 38.88],
  last: 38.9, lastLand: 39.45, flower: [39.2, 39.5], out: [40.0, 40.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'No tricks. | Just *talk* it through.', chip: '+1 HONEST', accentColor: GOLD, dim: 0.72 }

// ── dialogue (two boxes: the show, then the real answer)
const SP_LEO = `${LEO.glyph}${VS} LEO`, SP_CAN = `${CAN.glyph}${VS} CANCER`
const CPS = 28
const LINES = [
  { t: 3.75, speaker: SP_CAN, color: CAN.color, text: 'so… where is this *going?*' },
  { t: 6.7, speaker: SP_LEO, color: LEO.color, text: 'for my first *trick…*' },
  { t: 9.3, speaker: SP_CAN, color: CAN.color, text: '…did you just *hat* my question?' },
  { t: 12.9, speaker: SP_LEO, color: LEO.color, text: 'nothing to see *here!*' },
  { t: 15.45, speaker: SP_CAN, color: CAN.color, text: 'it’s *still waving.*' },
  { t: 17.9, speaker: SP_LEO, color: LEO.color, text: 'and now… I saw it in *half!*' },
  { t: 21.0, speaker: SP_CAN, color: CAN.color, text: 'now there are *two* fights.' },
]
const LINES2 = [
  { t: 29.3, speaker: SP_LEO, color: LEO.color, text: 'honestly? I like you. *sorry I flaked.*' },
]
export const LT = lineTimes(LINES, { cps: CPS })
const LH = [...talkHops(LINES, SP_LEO, { cps: CPS }), ...talkHops(LINES2, SP_LEO, { cps: CPS })], CH = talkHops(LINES, SP_CAN, { cps: CPS })

const inBack = x => { const c = 1.70158; return (c + 1) * x * x * x - c * x * x }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── geometry
const LEO_AT = { x: 250, y: 1292, s: 280 }
const CAN_AT = { x: 850, y: 1305, s: 250 }
const PIS_AT = { x: 990, y: 1085, s: 120 }
const TABLE = { x: 555, top: 1300 }
const HAT = { x: 190, by: 900 }                    // the magic hat on its pedestal
const DRAPE = { x: 540, top: 690, w: 280, h: 360 } // the little curtain; the flag stands at its foot
const FLAG = { x: 470, base: 1050, h: 470 }
const BOX = { x: 890, y: 820, w: 270, h: 130 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 34px Inter", "700 32px Inter", "italic 500 150px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 54px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 24px 'Space Mono'", "700 18px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HD = (text, at, o = {}) => popText(root, text, { top: 130, size: 84, accentSize: 120, at, gap: 0.07, late: o.late ?? 1, lateAt: o.lateAt ?? at + 0.4, wobble: true, accentColor: o.color || GOLD, lineHeight: 1.0, fit: true, ...o })
  const H0 = HD('First date. | He brought *a cape.*', T.h0, { lateAt: T.h0Land, late: 2, gap: 0.09 })
  const H1 = HD('Trick 1: | the *vanishing question.*', T.date + 0.05, { late: 2, accentSize: 104 })
  const H2 = HD('Trick 2: | the *red flag* curtain.', T.t2 + 0.03, { late: 3, color: FLAG_RED })
  const H3 = HD('Trick 3: | the fight, *sawn in half.*', T.t3 + 0.03, { late: 3, accentSize: 108 })
  const HTD = HD('TA-*DA!*', T.tada, { size: 120, accentSize: 170, late: 1, lateAt: T.tada + 0.12, top: 150 })
  const HB = HD('Then it *all* | came back.', T.burst + 0.05, { late: 3, lateAt: T.burst + 0.2, color: PINK })
  const HP = HD('Pick a card. | *Any card.*', T.bd + 0.05, { late: 2, lateAt: T.bd + 0.55 })
  const HTIE = HD('Same card. | *Both* answer.', T.tie + 0.02, { late: 2, lateAt: T.tie + 0.35 })
  const HEND = HD('Ta-*da.*', T.last + 0.02, { size: 120, accentSize: 170, late: 1, lateAt: T.lastLand, top: 150, color: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1480, width: 960, height: 250, cps: CPS, close: 23.7 })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1480, width: 960, height: 250, cps: CPS, open: 29.1, close: 32.7 })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flashEl = el('div', { position: 'absolute', inset: 0, background: '#fff6e0', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  function star(px, py, size, t, opts, { rot = 0, cells, before } = {}) {
    x.save(); x.translate(px, py); x.rotate(rot)
    const F = starFrame(0, 0, size, t, opts)
    if (before) inSprite(x, F, () => before(F))
    drawStarChar(x, 0, 0, size, t, opts)
    if (cells) inSprite(x, F, () => cells(F))
    x.restore()
    return F
  }
  // Leo: cape behind, bow tie, hat, wand
  function leo(t, px, py, size, o = {}) {
    const { mood = 'happy', look = [1, 0], ang = 0.7, spark = 0, hatDown = 0, hatTilt = -0.12, hatLift = 0, sweat = 0, hops = null, squash = 0, pop = 1, blink, flap = 1, flower = 0 } = o
    return star(px, py, size, t, { color: LEO.color, glyph: size >= 150 ? LEO.glyph : null, mood, look, seed: 7, hops, squash, pop, blink }, {
      before: () => capeCells(x, t, { flap }),
      cells: () => { bowCells(x); wandCells(x, t, { ang, spark, flower }); hatCells(x, { down: hatDown, tilt: hatTilt, lift: hatLift }); sweatCell(x, sweat) },
    })
  }
  const cancer = (t, o = {}) => star(CAN_AT.x, CAN_AT.y, CAN_AT.s, t, { color: CAN.color, glyph: CAN.glyph, mood: o.mood || 'neutral', look: o.look || [-1, 0], seed: 3, hops: o.hops || CH, squash: o.squash || 0, pop: o.pop ?? 1, blink: o.blink }, { cells: () => sweatCell(x, o.sweat || 0) })
  const pisces = (t, o = {}) => star(o.x ?? PIS_AT.x, o.y ?? PIS_AT.y, o.s ?? PIS_AT.s, t, { color: PIS.color, glyph: null, mood: o.mood || 'sparkle', look: o.look || [-1, 0], seed: 61, bob: 4, pop: o.pop ?? 1, hops: o.hops || null }, { cells: () => { tiaraCells(x, t); tearsCells(x, t, o.tears ?? 2) } })

  // ═══════════════════════ the stage (always) ═══════════════════════
  function stageBg(t, { open = 1, red = 0 } = {}) {
    drawStage(x, t, { open, top: 600, floor: 1410 })
    drawMarquee(x, 540, 482, t, { k: 1, chase: t >= T.quiet && t < T.burst ? 0.3 : 1 })
    drawFootlights(x, 1790, t)
    if (red > 0) { x.fillStyle = `rgba(255,60,110,${red * (0.06 + 0.06 * Math.max(0, Math.sin(t * 16)))})`; x.fillRect(0, 0, W, 1920) }
  }

  // ═══════════════════════ 0 · the hook ═══════════════════════
  function drawHook(t) {
    stageBg(t, { open: prog(t, ...T.curt) })
    drawSpot(x, 540, 560, 540, 1250, 230, clamp(prog(t, T.spot, T.spot + 0.08)) * (1 - prog(t, T.poofOut, T.date)))
    drawTable(x, TABLE.x + 120, TABLE.top + 30, t, { w: 220 })
    if (t >= T.poofIn) {
      const k = pop01(t, T.poofIn, 0.36, 2.2) * (t < T.poofOut ? 1 : 1 - prog(t, T.poofOut, T.poofOut + 0.12))
      leo(t, 540, 1080, 360, { mood: t < T.poofIn + 0.5 ? 'wide' : 'wink', look: [0, 0], ang: -1.25, spark: 1, pop: k, hops: [T.poofIn + 0.35, T.h0Land + 0.05], flap: 1.6 })
    }
    dustPuff(x, 540, 1060, prog(t, T.poofIn - 0.05, T.poofIn + 0.8), { n: 12, spread: 260, seed: 4, rise: 60 })
    dustPuff(x, 540, 1060, prog(t, T.poofOut, T.poofOut + 0.7), { n: 12, spread: 240, seed: 6, rise: 50 })
    sparkleBurst(x, t, 540, 1020, T.poofIn, { n: 12, R: 300 })
    cancer(t, { mood: 'wide', look: [-1, -1], sweat: prog(t, 1.6, 2.6), pop: pop01(t, 1.7, 0.3, 2.2), blink: false, hops: [1.75] })
    pisces(t, { pop: pop01(t, 2.2, 0.3, 2.2), tears: 3, hops: [2.25] })
  }

  // ═══════════════════════ 1 · the show (tricks 1–3, ta-da, the burst, the breakdown) ═══════════════════════
  // chaos clock: runs normally through the burst, crawls in the breakdown
  const ct = t => t < T.bd ? t : T.bd + (t - T.bd) * 0.18
  function drawShow(t) {
    const burst = t >= T.burst, bd = t >= T.bd
    const red = inR(t, T.burst, T.bd) ? 1 : 0
    stageBg(t, { red })
    drawSpot(x, 200, 560, LEO_AT.x, 1400, 170, 0.8)
    drawSpot(x, 880, 560, CAN_AT.x, 1400, 160, 0.7)
    const c = ct(t)
    const shakeAll = inR(t, T.rumble[0], T.burst) ? prog(t, ...T.rumble) : 0
    const fadeProps = 1 - prog(t, T.lesson - 0.1, T.lesson + 0.3)

    // ── trick 1: the pedestal + the hat
    drawPedestal(x, HAT.x, HAT.by + 4, 170)
    {
      const shake = shakeAll * 6 + (inR(t, T.vanish, T.vanish + 0.4) ? 4 * (1 - prog(t, T.vanish, T.vanish + 0.4)) : 0)
      const glow = bump(t, T.vanish, 0.6) + (burst && !bd ? 0.6 : 0)
      drawMagicHat(x, HAT.x, HAT.by, t, { px: 10, shake, glow })
    }
    // the question: pops out of Cancer, hangs, flies into the hat
    if (t >= T.qPop && t < T.vanish) {
      const k = pop01(t, T.qPop, 0.32, 2.4), fp = ease.inCubic(prog(t, ...T.qFly))
      const px = lerp(720, HAT.x, fp), py = lerp(1060, HAT.by - 120, fp) - Math.sin(Math.PI * fp) * 120 + Math.sin(t * 2.5) * 6
      drawQBubble(x, px, py, 'where is this going?', { sc: k * lerp(1, 0.08, ease.inQuad(prog(t, T.qFly[0] + 0.3, T.vanish))), rot: fp * 2.4, tail: 'r', size: 38 })
    }
    dustPuff(x, HAT.x, HAT.by - 130, prog(t, T.vanish, T.vanish + 0.8), { n: 9, spread: 120, seed: 11, rise: 60 })
    sparkleBurst(x, t, HAT.x, HAT.by - 120, T.vanish, { n: 10, R: 140 })

    // ── trick 2: the flag (+ the drape in front of it)
    if (t >= T.flagUp[0]) {
      const up = easeOutBack(prog(t, ...T.flagUp), 1.8)
      let lean = 0, flagX = FLAG.x
      if (t < T.burst) {
        if (inR(t, T.peekR[0], T.shove)) lean = 0.5 * easeOutBack(prog(t, ...T.peekR), 2.2)
        else if (inR(t, T.shove, T.peekBack[0])) lean = lerp(0.5, -0.52, easeOutBack(prog(t, ...T.peekL), 2))
        else if (t >= T.peekBack[0]) lean = lerp(-0.52, 0, ease.outBack(prog(t, ...T.peekBack)))
        lean += 0.03 * Math.sin(t * 3)
      }
      let sc = up, h = FLAG.h * up, wave = 1
      if (burst) {
        const bp = easeOutBack(prog(t, T.burst, T.burst + 0.45), 2)
        sc = lerp(1, 1.3, bp); wave = bd ? 0.4 : 1.8
        lean = 0.12 * Math.sin(c * 4)
        flagX = lerp(FLAG.x, 520, bp)
      }
      if (bd) { const fd = prog(t, ...T.flagDown); sc *= 1 - inBack(fd); }
      x.save(); x.translate(shakeAll * Math.sin(t * 40) * 4, 0)
      drawFlag(x, flagX, FLAG.base, h, t, { lean, sc, wave, alpha: fadeProps })
      x.restore()
    }
    if (t >= T.drapeIn[0]) {
      const k = easeOutBack(prog(t, ...T.drapeIn), 1.8)
      const dx = lerp(-420, 0, k)
      const drop = burst ? prog(t, T.burst, T.burst + 0.5) : 0
      x.save(); x.translate(dx, 0); x.globalAlpha = fadeProps
      drawDrape(x, DRAPE.x, DRAPE.top, DRAPE.w, DRAPE.h, t, { k: 1, drop, bulge: shakeAll, rip: burst ? 1 : 0 })
      x.restore()
    }

    // ── trick 3: the box, the fight, the saw
    if (t >= T.boxIn[0]) {
      const k = pop01(t, T.boxIn[0], 0.35, 2) * fadeProps
      const split = 70 * easeOutBack(prog(t, ...T.split), 2)
      const rattle = shakeAll * 8 + (inR(t, T.saw[0], T.saw[1]) ? 2 : 0)
      const open = burst ? easeOutBack(prog(t, T.burst, T.burst + 0.3), 2) : 0
      const by = BOX.y + Math.sin(t * 2) * 6
      // the fight's face poking out of the left end (between the dive and the split)
      if (inR(t, T.dive[1], T.split[1])) {
        const fk = pop01(t, T.dive[1], 0.25, 2.6)
        drawFight(x, BOX.x - BOX.w / 2 - split / 2 - 10, by - 4, 38 * fk, t, { seed: 2, mad: 1 })
      }
      drawBox(x, BOX.x, by, BOX.w, BOX.h, t, { k, split, rattle, open, label: "TUESDAY'S FIGHT" })
      // the saw: floats in, saws (back and forth, sinking), floats off
      if (inR(t, T.sawIn[0], T.split[1] + 0.3)) {
        const ink = ease.outCubic(prog(t, ...T.sawIn)), sp = prog(t, ...T.saw), off = prog(t, T.split[0], T.split[1] + 0.3)
        const sx = BOX.x + 40 + Math.sin((t - T.saw[0]) * 15) * 60 * (sp > 0 && sp < 1 ? 1 : 0) + lerp(300, 0, ink)
        const sy = by - 110 + 120 * ease.inOutQuad(sp) - 300 * ease.inCubic(off)
        drawSaw(x, sx, sy, Math.PI / 2 - 0.15, { alpha: (1 - off) })
        if (sp > 0 && sp < 1) dustPuff(x, BOX.x, by - BOX.h / 2, ((t * 2.5) % 1), { n: 4, spread: 50, seed: Math.floor(t * 2.5), col: '#e8c48a', rise: 30 })
      }
    }
    // the fight: appears over the box, dives in
    if (inR(t, T.fightIn[0], T.dive[1])) {
      const k = pop01(t, T.fightIn[0], 0.3, 2.4), dp = inBack(prog(t, ...T.dive))
      drawFight(x, BOX.x, lerp(640, BOX.y, dp), 62 * k * (1 - 0.6 * dp), t, { seed: 2 })
    }
    // two fights: one out of each half, stuffed back; then (burst) they orbit the table
    if (t >= T.twoPop && fadeProps > 0) {
      const split = 70
      for (const s of [-1, 1]) {
        const home = { x: BOX.x + s * (split / 2 + BOX.w / 4), y: BOX.y - 120 }
        let fx = home.x, fy = home.y, sz = 46 * pop01(t, T.twoPop + (s > 0 ? 0.12 : 0), 0.3, 2.6), def = 0
        if (t < T.burst) {
          const sp = inBack(prog(t, T.stuff[0] + (s > 0 ? 0.15 : 0), T.stuff[1] + (s > 0 ? 0.15 : 0)))
          fy = lerp(home.y, BOX.y, sp); sz *= 1 - sp
          fy += Math.abs(Math.sin(t * 7 + s)) * -14
        } else {
          const bp = ease.outCubic(prog(t, T.burst, T.burst + 0.5))
          const a = c * 2.6 + (s > 0 ? Math.PI : 0)
          const ox = 560 + Math.cos(a) * 250, oy = 990 + Math.sin(a) * 90
          fx = lerp(home.x, ox, bp); fy = lerp(BOX.y, oy, bp); sz = lerp(10, 66, bp)
          if (bd) { def = ease.inQuad(prog(t, T.deflate[0] + (s > 0 ? 0.2 : 0), T.deflate[1] + (s > 0 ? 0.2 : 0))); sz *= 1 - def }
        }
        if (sz > 1) drawFight(x, fx, fy, sz, t, { seed: s > 0 ? 5 : 3, deflate: def * 0.5, mad: bd ? 0.4 : 1 })
        if (bd) dustPuff(x, fx, fy, prog(t, T.deflate[0] + (s > 0 ? 0.2 : 0) + 0.25, T.deflate[1] + (s > 0 ? 0.2 : 0) + 0.6), { n: 6, spread: 70, seed: 30 + s })
      }
    }

    // ── the burst: the question (bigger), doves, a rabbit out of the hat
    if (burst && fadeProps > 0) {
      const bp = easeOutBack(prog(t, T.burst, T.burst + 0.4), 1.8)
      // doves
      for (let k = 0; k < 3; k++) {
        const d = c - T.burst - k * 0.12
        if (d > 0) {
          const dx = HAT.x + d * (160 + k * 60), dy = HAT.by - 130 - d * (220 + k * 40) + Math.sin(d * 6 + k) * 20
          if (dy > 300) drawDove(x, dx, dy, 7, t, { seed: k })
        }
      }
      // rabbit pops up out of the hat and stays, deadpan, with a ?
      const rk = pop01(t, T.burst + 0.15, 0.3, 2.6) * (1 - inBack(prog(t, T.answered + 0.3, T.answered + 0.7)))
      if (rk > 0) {
        x.save(); x.translate(HAT.x, HAT.by - 110); x.scale(rk, rk)
        drawRabbit(x, 0, 0, 9, t)
        x.restore()
        if (!bd) { x.font = `800 48px Inter`; x.textAlign = 'center'; x.fillStyle = '#0a0618'; x.fillText('?', HAT.x + 62, HAT.by - 172); x.fillStyle = GOLD; x.fillText('?', HAT.x + 60, HAT.by - 175) }
      }
      // the question: bigger, louder, bobbing
      const qk = bd ? 1 - inBack(prog(t, T.answered + 0.15, T.answered + 0.45)) : 1
      const qx = lerp(HAT.x, 330, bp) + Math.sin(c * 3) * 30, qy = lerp(HAT.by - 120, 700, bp) + Math.cos(c * 2.4) * 20
      if (qk > 0) {
        drawQBubble(x, qx, qy, 'WHERE IS THIS GOING??', { sc: bp * 1.05 * qk, rot: 0.08 * Math.sin(c * 2), size: 40, tail: 'l', fill: '#fff4c2' })
        // the ✓ once he answers
        const ck = pop01(t, T.answered - 0.15, 0.25, 2.6)
        if (bd && ck > 0) { x.save(); x.translate(qx + 250, qy - 36); x.scale(ck, ck); x.fillStyle = '#0a0618'; x.beginPath(); x.arc(0, 0, 36, 0, TAU); x.fill(); x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 30, 0, TAU); x.fill(); x.font = `800 40px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('✓', 0, 2); x.restore() }
      }
      sparkleBurst(x, t, qx, qy, T.answered + 0.45, { n: 12, R: 200 })
      sparkleBurst(x, t, HAT.x, HAT.by - 120, T.burst, { n: 12, R: 220, cols: [PINK, GOLD, '#ffffff'] })
      dustPuff(x, HAT.x, HAT.by - 120, prog(t, T.burst, T.burst + 0.9), { n: 10, spread: 160, seed: 21, rise: 40 })
      dustPuff(x, BOX.x, BOX.y, prog(t, T.burst, T.burst + 0.9), { n: 10, spread: 180, seed: 22, rise: 40 })
      dustPuff(x, DRAPE.x, DRAPE.top + 200, prog(t, T.burst, T.burst + 0.9), { n: 10, spread: 180, seed: 23, rise: 40 })
    }

    // the breakdown: the chaos dims behind the two of them
    if (bd) { x.fillStyle = `rgba(5,4,16,${0.5 * clamp(prog(t, T.bd, T.bd + 0.4)) * fadeProps})`; x.fillRect(0, 560, W, 860) }
    // ── the table (+ the talk card in the breakdown)
    drawTable(x, TABLE.x, TABLE.top, t, { w: 290 })

    // ── the cast
    // Leo
    {
      let mood = 'happy', look = [1, 0], ang = 0.7, spark = 0, hatDown = 0, sweat = 0, squash = 0, hops = LH, blink, flap = 1
      const r = t
      if (r < T.qPop) { mood = r < T.date + 0.3 ? 'wink' : 'happy'; look = [1, 0] }
      else if (r < 6.7) { mood = 'wide'; look = [1, -1]; sweat = prog(r, T.qPop + 0.2, T.qPop + 1.2) }
      else if (r < T.vanish) { mood = 'wink'; look = [-1, -1]; ang = r < T.qFly[0] ? -1.25 : -1.75; spark = 1; flap = 1.6 }
      else if (r < T.t2) { mood = r < 9.3 ? 'happy' : 'happy'; look = r < 9.3 ? [0, 0] : [1, 0]; ang = r < 9.3 ? -1.4 : 0.7; spark = r < 9.0 ? 1 : 0; hops = [T.vanish + 0.05, T.vanish + 0.5, ...LH] }
      else if (r < T.t3) {
        if (r < 12.9) { mood = 'wide'; look = [1, -1]; sweat = prog(r, T.t2 + 0.2, T.t2 + 0.9) }
        else if (r < 13.9) { mood = 'wink'; look = [1, -1]; ang = -1.0; spark = 1 }
        else if (r < T.peekR[0]) { mood = 'happy'; look = [-1, -1] }
        else if (r < T.peekL[1]) { mood = 'wide'; look = [1, -1]; ang = r > T.shove - 0.15 && r < T.shove + 0.2 ? -1.0 : -0.6; spark = r > T.shove - 0.15 && r < T.shove + 0.25 ? 1 : 0; sweat = 1 }
        else { mood = 'squint'; look = [1, 0]; sweat = 1 }
      } else if (r < T.tada) {
        if (r < T.sawIn[0]) { mood = 'wink'; look = [1, -1]; ang = -0.63; spark = 1 }
        else if (r < T.split[1]) { mood = 'squint'; look = [1, -1]; ang = -0.63 + 0.06 * Math.sin(r * 15); spark = 1 }
        else if (r < T.twoPop + 0.1) { mood = 'happy'; look = [1, -1]; ang = -1.3 }
        else if (r < T.stuff[0]) { mood = 'wide'; look = [1, -1]; sweat = prog(r, T.twoPop, T.twoPop + 1); squash = 0.04 * Math.sin(r * 20) }
        else { mood = 'squint'; look = [1, -1]; ang = -0.63 + 0.25 * Math.sin(r * 30); spark = 1; sweat = 1 }
      } else if (r < T.burst) {
        if (r < T.rumble[0]) { mood = 'happy'; look = [0, 0]; ang = -1.45; spark = 1; flap = 1.8; hops = [T.tada + 0.02] }
        else { mood = 'happy'; look = Math.floor(r * 3) % 2 ? [-1, 0] : [1, 0]; ang = -1.45; sweat = prog(r, T.rumble[0], T.burst); squash = 0.03 * Math.sin(r * 30) * prog(r, ...T.rumble) }
      } else if (r < T.bd) { mood = 'wide'; look = [0, 0]; hatDown = 12 * easeOutBack(prog(r, T.burst + 0.1, T.burst + 0.35), 2); sweat = 1; squash = 0.06 * Math.sin(r * 26); ang = 0.9; blink = false; hops = [T.burst + 0.05] }
      else if (r < T.lesson) {
        hatDown = 12 * (1 - ease.outBack(prog(r, ...T.hatUp))); look = r < 29.3 ? [1, 1] : [1, 0]
        mood = r < T.hatUp[1] ? 'wide' : r < T.answered ? 'sparkle' : 'happy'; ang = 0.8; hops = LH
      } else { mood = 'happy'; look = [1, 0] }
      leo(t, LEO_AT.x, LEO_AT.y, LEO_AT.s, { mood, look, ang, spark, hatDown, sweat, squash, hops, blink, flap })
    }
    // Cancer
    {
      let mood = 'neutral', look = [-1, 0], sweat = 0, hops = CH, squash = 0, blink
      const r = t
      if (r < T.qPop) { mood = 'sparkle'; look = [-1, 0] }
      else if (r < T.vanish) { mood = 'neutral'; look = r < T.qFly[0] ? [-1, -1] : [-1, -1] }
      else if (r < T.t2) { mood = r < T.vanish + 1.2 ? 'wide' : 'squint'; look = r < T.vanish + 1.2 ? [-1, -1] : [-1, 0]; squash = 0.1 * bump(r, T.vanish, 0.3) }
      else if (r < T.t3) { mood = r < 13.9 ? 'wide' : 'squint'; look = r < 13.9 ? [-1, -1] : (inR(r, T.peekR[0], T.peekL[1]) ? (r < T.shove ? [-1, -1] : [-1, -1]) : [-1, -1]) }
      else if (r < T.tada) { mood = r < T.twoPop ? 'neutral' : r < 21.0 ? 'wide' : 'eyeroll'; look = [1, -1] }
      else if (r < T.burst) { mood = 'squint'; look = [-1, 0]; blink = r > T.quiet ? (Math.sin((r - T.quiet) * 2) > 0.98 ? 1 : 0) : undefined }
      else if (r < T.bd) { mood = r < T.burst + 1.2 ? 'wide' : 'squint'; look = [-1, -1]; squash = 0.12 * bump(r, T.burst, 0.3) }
      else if (r < T.lesson) { mood = r < T.answered ? 'neutral' : 'heart'; look = [-1, 0]; hops = r >= T.answered ? [T.answered + 0.05, T.answered + 0.5] : [T.cardSlide[0]] }
      else { mood = 'heart'; look = [-1, 0] }
      cancer(t, { mood, look, sweat, hops, squash, blink })
    }
    // the talk card Cancer slides across (breakdown)
    if (bd && t < T.lesson + 0.4) {
      const sp = ease.outCubic(prog(t, ...T.cardSlide))
      drawTalkCard(x, lerp(820, 560, sp), 1060, 400, 250, t, { q: 'Where is this | going?', k: sp * (1 - prog(t, T.lesson - 0.1, T.lesson + 0.3)), rot: lerp(0.25, -0.04, sp) })
    }
    // Pisces, the lovely assistant: a hop at each trick, a slow clap after the ta-da, a wail at the burst
    {
      const hops = [T.vanish + 0.1, T.split[1] + 0.1, T.tada + 0.05, ...T.claps, T.answered + 0.2]
      const tears = inR(t, T.burst, T.bd) ? 3 : t >= T.answered ? 3 : 2
      pisces(t, { hops, tears, mood: inR(t, T.burst, T.bd) ? 'wide' : 'sparkle', look: inR(t, T.burst, T.bd) ? [0, 0] : [-1, 0] })
    }
    // the slow claps: little "clap" pops by Pisces
    T.claps.forEach((c0, i) => {
      const k = prog(t, c0, c0 + 0.45)
      if (k > 0 && k < 1) { x.save(); x.globalAlpha = 1 - k; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText('clap', PIS_AT.x - 20, PIS_AT.y - 90 - k * 40 - i * 4); x.restore() }
    })
    // the burst flash + confetti (it is, technically, a big finish)
    if (burst && !bd) confetti(x, t, T.burst, { n: 40, seed: 12 })
  }

  // ═══════════════════════ 2 · tie-in: talk cards ═══════════════════════
  function drawTie(t) {
    stageBg(t)
    drawSpot(x, 540, 560, 540, 1400, 300, 0.8)
    const pk = popOut(t, T.tieOut)
    drawTable(x, TABLE.x, TABLE.top, t, { w: 290 })
    drawTalkCard(x, 540, 780, 620, 330, t, { q: 'What are you | hoping for?', k: pop01(t, T.tie, 0.35, 1.8) * pk, rot: 0.01 * Math.sin(t * 1.4) })
    const cap = clamp(prog(t, T.tie + 0.3, T.tie + 0.6)) * pk
    if (cap > 0) { x.save(); x.globalAlpha = cap; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText('ANSWERS STAY HIDDEN TILL YOU BOTH PLAY', 540, 982); x.restore() }
    const fl = prog(t, ...T.flip)
    for (const [i, cx] of [[0, 410], [1, 670]]) {
      const k = pop01(t, T.cards[0] + i * 0.1, 0.3, 2) * pk
      drawTalkCard(x, cx, 1095, 240, 170, t, { flip: fl, a: 'something | real', k, tag: i ? 'CANCER' : 'LEO', check: prog(t, T.flip[1] + 0.05, T.flip[1] + 0.3), rot: (i ? 0.04 : -0.04) })
    }
    sparkleBurst(x, t, 540, 1080, T.flip[1], { n: 12, R: 260 })
    leo(t, LEO_AT.x, LEO_AT.y, LEO_AT.s, { mood: t > T.flip[1] ? 'heart' : 'happy', look: [1, -1], hops: [T.flip[1] + 0.05, T.flip[1] + 0.5], pop: pk })
    cancer(t, { mood: t > T.flip[1] ? 'heart' : 'happy', look: [-1, -1], hops: [T.flip[1] + 0.1, T.flip[1] + 0.55], pop: pk })
    pisces(t, { tears: 3, hops: [T.flip[1] + 0.15], pop: pk })
  }

  // ═══════════════════════ 3 · the last line ═══════════════════════
  function drawLast(t) {
    stageBg(t)
    const pk = i => popOut(t, [T.out[0] + i * 0.04, T.out[0] + 0.3 + i * 0.04])
    drawSpot(x, 540, 560, 560, 1400, 360, 0.9)
    drawTable(x, TABLE.x, TABLE.top, t, { w: 290 })
    const fk = prog(t, ...T.flower)
    leo(t, LEO_AT.x + 30, LEO_AT.y, LEO_AT.s, { mood: 'happy', look: [1, 0], ang: lerp(-1.3, -0.35, ease.outCubic(prog(t, T.last, T.flower[0]))), flower: fk, spark: fk > 0 && fk < 1 ? 1 : 0, hatTilt: -0.35, hatLift: 2 * bump(t, T.last + 0.1, 0.6), hops: [T.flower[1]], pop: pk(0) })
    sparkleBurst(x, t, LEO_AT.x + 220, LEO_AT.y - 160, T.flower[0], { n: 10, R: 120, cols: [PINK, GOLD, '#ffffff'] })
    cancer(t, { mood: t > T.flower[1] ? 'heart' : 'sparkle', look: [-1, -1], hops: [T.flower[1] + 0.1, T.lastLand + 0.4], pop: pk(1) })
    pisces(t, { tears: 3, hops: [T.lastLand], pop: pk(2) })
    const rr = rng(77)
    for (let k = 0; k < 8; k++) { const t0 = T.flower[1] + rr() * 0.8, d = t - t0, hx = 320 + rr() * 480; if (d > 0 && d < 1.4) { x.save(); x.globalAlpha = (1 - d / 1.4) * pk(2); drawHeart(x, hx + Math.sin(d * 4 + k) * 20, 1250 - d * 240, 6, k % 2 ? PINK : '#ff4f7e'); x.restore() } }
  }

  // calm stage under the lesson
  function drawCalm(t) {
    stageBg(t)
    drawTable(x, TABLE.x, TABLE.top, t, { w: 290 })
    leo(t, LEO_AT.x, LEO_AT.y, LEO_AT.s, { mood: 'happy', look: [1, 0] })
    cancer(t, { mood: 'heart', look: [-1, 0] })
    pisces(t, { tears: 3 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.date) drawHook(t)
      else if (t < T.lesson + 0.4) drawShow(t)
      else if (t < T.tie) drawCalm(t)
      else if (t < T.last) drawTie(t)
      else if (t < T.out[1] + 0.05) drawLast(t)
      // type
      H0.update(t, t < T.date ? 1 : 0)
      H1.update(t, t >= T.date && t < T.t2 ? 1 : 0)
      H2.update(t, t >= T.t2 && t < T.t3 ? 1 : 0)
      H3.update(t, t >= T.t3 && t < T.tada ? 1 : 0)
      HTD.update(t, t >= T.tada && t < T.burst ? 1 : 0)
      HB.update(t, t >= T.burst && t < T.bd ? 1 : 0)
      HP.update(t, t >= T.bd && t < T.lesson ? 1 : 0)
      HTIE.update(t, t >= T.tie && t < T.last ? outK(t, T.tieOut) : 0)
      HEND.update(t, t >= T.last ? outK(t, [T.out[0] + 0.05, T.out[0] + 0.35]) : 0)
      box.update(t)
      box2.update(t)
      lesson.update(t)
      const fl = Math.max(bump(t, T.poofIn - 0.05, 0.3) * 0.7, bump(t, T.date - 0.15, 0.3) * 0.8, bump(t, T.vanish, 0.25) * 0.45, bump(t, T.burst - 0.05, 0.35) * 0.85)
      flashEl.style.opacity = String(fl)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 3 of these 7 (indices 1, 3, 5):
// 12.2 (→ trick 2), 28.33 (→ the breakdown), 36.9 (→ the talk-card tie-in). The end card flips at 40.6.
export const CUTS = [3.33, 12.2, 16.65, 28.33, T.cutL, 36.9, 38.85]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in D and moved by the engine; chip notes in Bb)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const BB = { Bb2: 116.54, F3: 174.61, Bb3: 233.08, D4: 293.66, F4: 349.23, Bb4: 466.16, C5: 523.25, D5: 587.33, F5: 698.46, G5: 783.99, Bb5: 932.33, D6: 1174.66 }
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const noise = (t, f, len, g, o = {}) => ['chip', r3(t), f, len, { wave: 'noise', gain: g, decay: len * 0.6, sustain: 0, ...FXO, ...o }]
const roll = (t0, t1, g = 0.05) => { const out = []; const n = Math.round((t1 - t0) / 0.045); for (let i = 0; i < n; i++) out.push(['snare', r3(t0 + i * 0.045), { gain: g * (0.5 + 0.5 * i / n), tone: 210, decay: 0.07, rev: 0.12 }]); return out }
const poof = (t, g = 1) => [['whoosh', r3(t - 0.05), 0.45, 0.06 * g], ['boom', r3(t), 0.14 * g], ['glitter', r3(t), r3(t + 0.7)], ['pop', r3(t + 0.02), 1760, 0.04 * g, 0], ['crash', r3(t), { gain: 0.05 * g, len: 1.6 }]]
const boing = (t, f = BB.F4, up = 1) => ['chip', r3(t), f, 0.25, { wave: 'square', duty: 0.25, slide: 18 * up, vib: 0.04, gain: 0.02, decay: 0.22, sustain: 0.4, ...FXO }]
const grumble = (t, len = 0.5) => ['chip', r3(t), BB.Bb2, len, { wave: 'square', duty: 0.5, vib: 0.12, gain: 0.02, decay: len * 0.8, sustain: 0.6, ...FXO }]
const cricket = t => [['chip', r3(t), 4200, 0.05, { wave: 'square', duty: 0.5, gain: 0.008, decay: 0.04, sustain: 0.3, ...FXO }], ['chip', r3(t + 0.08), 4200, 0.05, { wave: 'square', duty: 0.5, gain: 0.008, decay: 0.04, sustain: 0.3, ...FXO }]]
const sawStroke = (t0, t1) => { const out = []; for (let t = t0, k = 0; t < t1; t += 0.21, k++) out.push(noise(t, k % 2 ? 2400 : 1700, 0.18, 0.03, { slide: k % 2 ? -10 : 10 })); return out }

export const CUES = [
  // 0 · the hook: drumroll, spotlight clunk, POOF
  ...roll(0.05, T.poofIn - 0.02, 0.06),
  ['tick', T.spot, 0.06], ['boom', T.spot, 0.06],
  ...poof(T.poofIn),
  ...head(T.h0, 3, T.h0Land, 0),
  ['pop', 1.75, 880, 0.04, 0.4], ['pop', 2.25, 1318.51, 0.035, 0.5],
  ['whoosh', r3(T.poofOut), 0.4, 0.05], ['pop', r3(T.date), 1174.66, 0.04, -0.3],
  // 1 · trick 1
  ...head(T.date + 0.05, 2, T.date + 0.45, 3),
  ...talkCues(LINES, { cps: CPS, pitch: { [SP_LEO]: 659.25, [SP_CAN]: 987.77 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SP_LEO]: 659.25 } }),
  ['pop', r3(T.qPop), 1318.51, 0.045, 0.3], ['pluck', r3(T.qPop), 880, 0.03, 0.4, 0.3],
  ...roll(T.qFly[0], T.vanish - 0.02, 0.05), ['whoosh', r3(T.qFly[0]), 0.7, 0.04],
  ...poof(T.vanish, 0.8),
  // 2 · trick 2: flag springs up, curtain swish, peek boings, shove
  ...head(T.t2 + 0.03, 2, T.t2 + 0.43, 1),
  boing(T.flagUp[0], BB.F4, 1), ['pop', r3(T.flagUp[1]), 1318.51, 0.04, 0],
  ['whoosh', r3(T.drapeIn[0]), 0.4, 0.05], ['tick', r3(T.drapeIn[1]), 0.05],
  boing(T.peekR[0], BB.Bb4, 1), ['whoosh', r3(T.shove - 0.05), 0.25, 0.04], ['pop', r3(T.shove), 220, 0.06, 0.3], boing(T.peekL[0], BB.D5, 1), boing(T.peekBack[0], BB.F4, -1),
  // 3 · trick 3: the fight dives in, the saw, the split, two fights
  ...head(T.t3 + 0.03, 2, T.t3 + 0.43, 4),
  ['pop', r3(T.boxIn[0]), 523.25, 0.04, 0.4], grumble(T.fightIn[0], 0.6), ['whoosh', r3(T.dive[0]), 0.35, 0.04], ['pop', r3(T.dive[1]), 196, 0.06, 0.4], ['tick', r3(T.dive[1]), 0.05],
  ['whoosh', r3(T.sawIn[0]), 0.35, 0.04], ...sawStroke(T.saw[0], T.saw[1]),
  ['whoosh', r3(T.split[0]), 0.35, 0.05], ['tick', r3(T.split[1]), 0.06], ['pop', r3(T.split[1]), 1174.66, 0.04, 0],
  ['pop', r3(T.twoPop), 784, 0.05, -0.4], ['pop', r3(T.twoPop + 0.12), 784, 0.05, 0.4], grumble(T.twoPop, 0.4), grumble(T.twoPop + 0.15, 0.4),
  ['whoosh', r3(T.stuff[0]), 0.3, 0.04], ['pop', r3(T.stuff[1]), 196, 0.05, 0.3], ['pop', r3(T.stuff[1] + 0.15), 196, 0.05, 0.5],
  // TA-DA, then silence, crickets, a slow clap, the rumble
  ...[BB.Bb4, BB.D5, BB.F5, BB.Bb5].map((f, k) => ['chip', r3(T.tada + k * 0.05), f, 0.35, { duty: 0.25, gain: 0.03, decay: 0.3, sustain: 0.6, rev: 0.2, dly: 0.12, bus: 'fx' }]),
  ['crash', r3(T.tada), { gain: 0.07, len: 2 }], ['glitter', r3(T.tada), r3(T.tada + 0.8)], ...head(T.tada, 1, T.tada + 0.12, 2),
  ...cricket(T.quiet + 0.15), ...cricket(T.quiet + 0.75),
  ...T.claps.map(c => ['clap', r3(c), { gain: 0.12, rev: 0.4 }]),
  ['chip', r3(T.rumble[0]), 55, 1.1, { wave: 'tri', vib: 0.2, gain: 0.05, decay: 1, sustain: 0.9, ...FXO }], noise(T.rumble[0], 300, 1.1, 0.02, { sustain: 0.8, decay: 1 }),
  ['riser', r3(T.rumble[0]), r3(T.burst), 0.05],
  // the burst
  ['boom', r3(T.burst), 0.3], ['crash', r3(T.burst), { gain: 0.08, len: 2.2 }], ['whoosh', r3(T.burst - 0.1), 0.6, 0.07], ['glitter', r3(T.burst), r3(T.burst + 1)],
  ...Array.from({ length: 10 }, (_, k) => ['pop', r3(T.burst + 0.03 + k * 0.05), NOTE[(k * 3) % 7], 0.035, ((k % 3) - 1) * 0.5]),
  ...Array.from({ length: 6 }, (_, k) => noise(T.burst + 0.3 + k * 0.11, 3200, 0.06, 0.015)),
  ...head(T.burst + 0.05, 3, T.burst + 0.2, 4), grumble(T.burst + 0.3, 0.8),
  ['chip', r3(T.burst + 0.1), BB.D6, 0.3, { wave: 'square', duty: 0.25, slide: -30, gain: 0.02, decay: 0.3, sustain: 0.5, ...FXO }],
  // 4 · breakdown: tape stop, the card slides, the answer
  ['tapeStop', r3(T.bd - 0.35), 0.45],
  ...head(T.bd + 0.05, 2, T.bd + 0.55, 0),
  ['whoosh', r3(T.cardSlide[0]), 0.4, 0.04], ['tick', r3(T.cardSlide[1]), 0.05],
  ['pop', r3(T.hatUp[0]), 659.25, 0.04, -0.4],
  ['pop', r3(T.answered), 1318.51, 0.05, 0], ['bell', r3(T.answered), 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.answered + 0.4), r3(T.answered + 1)],
  ['whoosh', r3(T.flagDown[0]), 0.35, 0.03], ['chip', r3(T.deflate[0]), BB.F4, 0.5, { wave: 'square', duty: 0.25, slide: -24, gain: 0.018, decay: 0.45, sustain: 0.5, ...FXO }], ['chip', r3(T.deflate[0] + 0.2), BB.D4, 0.5, { wave: 'square', duty: 0.25, slide: -24, gain: 0.018, decay: 0.45, sustain: 0.5, ...FXO }],
  // 5 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'Bb' }),
  // 6 · tie-in: the cards, both flip
  ['whoosh', r3(T.tie), 0.35, 0.04], ...head(T.tie + 0.02, 2, T.tie + 0.35, 2),
  ['tick', r3(T.cards[0]), 0.05], ['tick', r3(T.cards[0] + 0.1), 0.05],
  ...roll(T.flip[0] - 0.45, T.flip[0], 0.04), ['tick', r3(T.flip[0]), 0.06], ['tick', r3(T.flip[0] + 0.02), 0.06], ['pop', r3(T.flip[1]), 1174.66, 0.05, 0], ['bell', r3(T.flip[1] + 0.05), 1318.51, 0.035, 1.2, 0],
  ['pop', r3(T.flip[1] + 0.1), 1318.51, 0.035, -0.4], ['pop', r3(T.flip[1] + 0.2), 1318.51, 0.035, 0.4],
  // 7 · the last line: the wand turns into a flower
  ...head(T.last + 0.02, 1, T.lastLand, 0),
  ['glitter', r3(T.flower[0]), r3(T.flower[1] + 0.3)], ['pop', r3(T.flower[1]), 1567.98, 0.04, -0.2], ['pluck', r3(T.flower[1]), 1174.66, 0.035, 0.7, -0.2],
  ...Array.from({ length: 4 }, (_, k) => ['pop', r3(T.flower[1] + 0.2 + k * 0.05), NOTE[(k * 2) % 7], 0.02, ((k % 3) - 1) * 0.4]),
  ['whoosh', r3(T.out[0]), 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lineTimes; void drawPixelStar; void BONE
