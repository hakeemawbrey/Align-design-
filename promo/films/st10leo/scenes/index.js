// st10leo (60 s vertical, Star Talk season 10 "Little Stars", S10 E05) · story 0–55.6, then the end card.
//   HOOK   "Leo's first *show-and-tell*."  AGE 1: Baby Leo, in a cloud crib and a tiny toy crown, mid-RAWR at the mobile.
//   WANT   The Moon (night nurse) peeks in: "a show for the *mobile* again?"  LEO: "look at *me!*"  AGE 5, the Academy hall:
//          a SHOW & TELL poster. "today *everyone* sees me."  Saturn walks by: "you're up *next*, superstar."
//   TRY    The stage. The big spotlight hits and Leo freezes: wide eyes, sweat pixels, "um.", a tiny "*rawr?*", a cough
//          from the crowd, and it dives behind the curtain.
//   TURN   Backstage with Saturn's picture book. ★ REAL SKY: the Sun is a star too, a middle-aged, ordinary one. "and
//          still *everyone's* favourite."  LEO: "ordinary… and *loved?*"  A flashlight beam pokes through the curtain.
//          AQUARIUS (kid, headphones): "do it for *me*. back row."
//   WIN    The big light is off. Only Aquarius's flashlight, from the back row. Leo looks at one friend and does the show:
//          "this is my *crown*." and the frame-0 RAWR, for real. Applause. Then the hug: "that one was *for you*."
//   END    growUp: kid Leo → today's Leo, Aquarius beside it, still holding the flashlight. "Shine *for* someone."
//   Rhyme: frame 0 and the last shot are both a Leo mid-roar under a light; the audience changed from a mobile to a friend.
//   Rewatch bait: the toy crown is the one from starleo; the flashlight's sticker is a tiny ♌ (adult Leo's ring light, st9leoam,
//   has the matching ♒). The mobile is twelve little planets and one of them is Pluto, slipping. Ghost: baby ghost, cell 2,
//   peeking from the stage's left wing during the freeze.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSaturn } from '../../st5cast.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBabyStar, drawNursery, drawCloudCrib, NURSERY, drawAcademy, ACADEMY, drawCrayonFrame, drawHomeVideo, ageCaption, ageCaptionCues, drawMoonNurse, growUp, growUpCues, KIDS_FONTS } from '../../st10kids.js'
import { flashBeam, drawFlashlight, drawToyCrown, drawHeadphones, roarLines, sweat, applause } from './kit.js'

export const DURATION = 60
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const LE = signStar('leo'), AQ = signStar('aquarius')
const MOON_TAG = '☾ THE MOON', LEO = '♌ LEO', AQUA = '♒ AQUARIUS', SAT = '♄ SATURN'

const T = {
  hookOut: 2.8, moon: 3.2, want: 5.5, hall: 8.4, sat: 11.4, stage: 14.2, step: 15.4, freeze: 16.6, um: 19.8, tiny: 22.2,
  dive: 24.4, back: 25.4, book: 29.2, fact: 31.0, fav: 34.0, huh: 36.2, click: 38.0, stage2: 41.0, crown: 42.6, roar: 45.2,
  clap: 46.0, hug: 47.6, grow: 50.2, last: 52.0, lastOut: [55.1, 55.35], fade: [55.2, 55.6],
  ghost: 20.6,
}
const CUTS = [T.hall, T.stage, T.back, T.stage2, T.hug]
const PUNCH = [
  { at: T.freeze, out: T.um - 0.1, zoom: 1.5, x: 540, y: 960 },
  { at: T.roar, out: T.clap + 0.4, zoom: 1.3, x: 540, y: 1000 },
]
const AGES = [
  { at: -1, out: T.hall - 0.1, text: 'AGE 1' },
  { at: T.hall + 0.25, out: T.grow - 0.1, text: 'AGE 5' },
]
const SAY = [
  { text: 'RAWR!', at: -1, out: 2.7, who: 'leo', size: 64 },
  { text: 'a show for the *mobile* again?', at: T.moon + 0.3, out: T.want - 0.1, who: 'moon' },
  { text: 'look at *me!*', at: T.want + 0.1, out: T.hall - 0.2, who: 'leo' },
  { text: 'today *everyone* sees me.', at: T.hall + 0.5, out: T.sat - 0.1, who: 'leo' },
  { text: 'you’re up *next*, superstar.', at: T.sat + 0.2, out: T.stage - 0.2, who: 'sat' },
  { text: 'um.', at: T.um, out: T.tiny - 0.15, who: 'leo', size: 40 },
  { text: '*rawr?*', at: T.tiny, out: T.dive - 0.1, who: 'leo', size: 34 },
  { text: 'they were *all* looking.', at: T.back + 0.5, out: T.book - 0.1, who: 'leo' },
  { text: 'a secret about your *ruler:*', at: T.book + 0.1, out: T.fav - 0.15, who: 'sat' },
  { text: 'and still *everyone’s* favourite.', at: T.fav, out: T.huh - 0.1, who: 'sat' },
  { text: 'ordinary… and *loved?*', at: T.huh, out: T.click + 0.4, who: 'leo' },
  { text: 'do it for *me*. back row.', at: T.click + 0.6, out: T.stage2 - 0.1, who: 'aqua' },
  { text: 'this is my *crown*.', at: T.crown, out: T.roar - 0.15, who: 'leo' },
  { text: 'RAWR!', at: T.roar, out: T.hug - 0.2, who: 'leo', size: 64 },
  { text: 'that one was *for you*.', at: T.hug + 0.3, out: T.grow - 0.1, who: 'leo' },
]
const FACT = { text: 'The Sun is a star too: a middle-aged, ordinary star.', at: T.fact, dur: 2.9, x: 540, y: 1440, label: '★ REAL SKY' }
export const GHOST = { at: T.ghost, x: 150, y: 1060, where: 'baby ghost peeking out of the stage’s left wing curtain during the freeze' }

// the show-and-tell poster in the hall
function poster(x, t, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.translate(560, 560); x.rotate(-0.04)
  x.fillStyle = '#fbf4e6'; x.fillRect(-250, -150, 500, 300)
  x.strokeStyle = '#f39a3a'; x.lineWidth = 10; x.strokeRect(-238, -138, 476, 276)
  x.fillStyle = INK; x.font = "700 30px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('SHOW & TELL', 0, -70)
  x.font = "800 64px Inter, sans-serif"; x.fillStyle = '#c4572f'; x.fillText('TODAY!', 0, 6)
  x.font = "700 26px 'Space Mono', monospace"; x.fillStyle = INK; x.fillText('★ STAGE · AFTER SNACK ★', 0, 84)
  x.fillStyle = '#f2c75c'; for (let i = 0; i < 4; i++) drawPixelStar(x, -200 + i * 133, -116 + (i % 2) * 230, 14, i % 2, '#f2c75c', '#fff6d0')
  x.restore()
}

// the stage spotlight: a cone from the top, k = brightness
function spotlight(x, t, cx, cy, k, w = 300) {
  if (k <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 0, 0, cy + 200)
  g.addColorStop(0, `rgba(255,236,170,${0.42 * k})`); g.addColorStop(1, `rgba(255,236,170,${0.12 * k})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 60, -10); x.lineTo(cx + 60, -10); x.lineTo(cx + w, cy + 180); x.lineTo(cx - w, cy + 180); x.closePath(); x.fill()
  x.fillStyle = `rgba(255,236,170,${0.22 * k})`; x.beginPath(); x.ellipse(cx, cy + 180, w, 46, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

// the class, from the stage: a row of kid stars in the seats at the bottom, cropped by the frame
const CLASS = [
  { x: 120, sign: 'aries' }, { x: 300, sign: 'gemini' }, { x: 470, sign: 'cancer' }, { x: 640, sign: 'virgo' }, { x: 800, sign: 'taurus' }, { x: 970, sign: 'aquarius' },
]
function classRow(x, t, { aqua = true, cheer = 0, dark = 0 } = {}) {
  for (const [i, c] of CLASS.entries()) {
    if (c.sign === 'aquarius' && !aqua) continue
    const cheerHop = cheer > 0 ? [T.clap + i * 0.12, T.clap + 0.7 + i * 0.1] : []
    drawBabyStar(x, c.x, 1700 + (i % 2) * 24, 190, t, { sign: c.sign, age: 'kid', mood: cheer > 0 ? 'happy' : 'neutral', look: [0, -0.8], seed: 30 + i, hops: cheerHop, glow: 0.5, alpha: 1 - 0.5 * dark })
  }
  x.save(); x.fillStyle = `rgba(30,16,52,${0.92})`; x.fillRect(0, 1790, 1080, 140); x.fillStyle = '#3a2160'; for (let i = 0; i < 9; i++) x.fillRect(i * 128, 1790, 112, 14); x.restore()
}

// the curtain edge (stage wings / backstage)
function curtain(x, t, side, k = 1, w = 200) {
  x.save(); x.globalAlpha = k
  const x0 = side < 0 ? 0 : 1080 - w
  for (let i = 0; i < 6; i++) {
    const sway = Math.sin(t * 1.3 + i) * 4
    x.fillStyle = i % 2 ? '#8e1f3a' : '#a8294a'
    x.fillRect(Math.round(x0 + i * w / 6 + sway), 0, Math.ceil(w / 6) + 1, 1920)
  }
  x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(side < 0 ? w - 10 : x0, 0, 10, 1920)
  x.restore()
}

// Saturn's picture book: an open book with the Sun drawn in it
function sunBook(x, t, k) {
  if (k <= 0) return
  const s = easeOutBack(k, 1.4)
  x.save(); x.translate(540, 680); x.scale(s, s)
  x.fillStyle = '#e9dcc4'; x.fillRect(-330, -190, 660, 380)
  x.fillStyle = '#fbf4e6'; x.fillRect(-316, -178, 306, 356); x.fillRect(10, -178, 306, 356)
  x.fillStyle = '#c9b896'; x.fillRect(-6, -190, 12, 380)
  // left page: the Sun, a big warm star with rays
  const cx = -163, cy = 0, pulse = 1 + 0.04 * Math.sin(t * 4)
  x.save(); x.globalCompositeOperation = 'source-over'
  x.fillStyle = '#ffd25c'
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.save(); x.translate(cx, cy); x.rotate(a); x.fillRect(-8, -128 * pulse, 16, 34); x.restore() }
  x.fillStyle = '#ffb43a'; x.beginPath(); x.arc(cx, cy, 84 * pulse, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffd25c'; x.beginPath(); x.arc(cx - 14, cy - 14, 56, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(cx - 28, cy - 10, 12, 18); x.fillRect(cx + 16, cy - 10, 12, 18)
  x.restore()
  // right page: "THE SUN" and a little row of ordinary stars, the Sun among them
  x.fillStyle = INK; x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('THE SUN', 163, -120)
  x.font = "600 26px Inter, sans-serif"; x.fillText('a star, like', 163, -62); x.fillText('the others', 163, -30)
  for (let i = 0; i < 5; i++) drawPixelStar(x, 63 + i * 50, 50 + (i % 2) * 22, 16, i % 2, i === 2 ? '#ffb43a' : '#cfe0ff', '#ffffff')
  x.fillStyle = '#c4572f'; x.font = "italic 500 34px 'EB Garamond', serif"; x.fillText('(that one’s ours)', 163, 130)
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Leo’s first | *show-and-tell.*', out: T.hookOut, accentColor: GOLD, top: 250 })
  const last = popText(root, 'Shine *for* | someone.', { top: 300, size: 124, accentSize: 172, lineHeight: 1.18, at: T.last, gap: 0.12, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.72 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }

  // where each speaker's bubble points, per scene
  function anchor(t, who) {
    if (t < T.hall) return who === 'moon' ? [220, 860] : [660, 1000]
    if (t < T.stage) return who === 'sat' ? [800, 900] : [420, 930]
    if (t < T.back) return [540, 860]
    if (t < T.stage2) return who === 'sat' ? [800, 1110] : who === 'aqua' ? [900, 1090] : [340, 1060]
    if (t < T.hug) return [540, 850]
    return [470, 960]
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)

      if (t < T.hall) {
        // ── AGE 1 · the nursery: the crib, the mobile, the roar
        drawNursery(x, t, { glow: 0.8 })
        const [cx, cy] = NURSERY.cribs[1]
        drawCloudCrib(x, cx, cy, 330, t)
        const roar = t < 2.7 || (t > T.want && t < T.hall)
        const b = drawBabyStar(x, cx, cy - 165, 300, t, { sign: 'leo', age: 'baby', mood: roar ? 'laugh' : 'happy', look: [0, -1], hops: [0.05, 0.9, 1.7, T.want + 0.15, T.want + 0.9], seed: 5, squash: roar ? -0.06 : 0 })
        drawToyCrown(x, b.x, b.top + 26, 0.8, t)
        drawCloudCrib(x, cx, cy, 330, t, { front: true })
        if (roar) roarLines(x, t, b.x, b.y - 40, 300)
        const mk = ease.outCubic(prog(t, T.moon, T.moon + 0.5))
        if (mk > 0) drawMoonNurse(x, lerp(-140, 200, mk), 980, 105, t, { mood: t < T.want ? 'happy' : 'wink', look: [1, 0] })
      } else if (t < T.stage) {
        // ── AGE 5 · the Academy hall: the poster, Saturn walks by
        drawAcademy(x, t, { room: 'hall', banner: false })
        poster(x, t, 1)
        const sk = ease.outCubic(prog(t, T.sat - 0.4, T.sat + 0.3))
        const r = drawBabyStar(x, 400, 1110, 290, t, { sign: 'leo', age: 'kid', backpack: true, mood: t < T.sat ? 'sparkle' : 'happy', look: t < T.sat ? [0.4, -0.8] : [1, 0], hops: [T.hall + 0.55, T.hall + 1.2, T.sat + 0.3], seed: 5 })
        drawToyCrown(x, r.x, r.top + 28, 0.8, t)
        if (sk > 0) drawSaturn(x, lerp(1200, 800, sk), 1060, 320, t, { mood: 'happy', look: [-1, 0.3], seed: 7 })
      } else if (t < T.back) {
        // ── the stage: the spotlight, the freeze, the dive
        const on = ease.outCubic(prog(t, T.step - 0.2, T.step + 0.1))
        drawAcademy(x, t, { room: 'stage', light: on })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 2 })
        spotlight(x, t, 540, 1090, on * 0.5 * (1 + 0.15 * Math.sin(t * 9)), 330)
        const dk = ease.inCubic(prog(t, T.dive, T.back))
        const walk = ease.inOutCubic(prog(t, T.stage + 0.2, T.step))
        const frozen = t > T.step
        const lx = lerp(lerp(160, 540, walk), 1180, dk)
        const shake = frozen && t < T.dive ? Math.round(Math.sin(t * 70) * 3) : 0
        const r = drawBabyStar(x, lx + shake, 1090, 280, t, { sign: 'leo', age: 'kid', mood: frozen ? 'wide' : 'happy', look: frozen ? [0, 0] : [1, 0], blink: frozen ? false : undefined, hops: [T.stage + 0.5, T.stage + 0.9, T.dive + 0.05], seed: 5, squash: frozen ? 0.06 : 0 })
        if (dk < 0.6) drawToyCrown(x, r.x, r.top + 28, 0.8, t)
        if (frozen && t < T.dive) sweat(x, t, lx, 1090, 280)
        classRow(x, t, { aqua: true })
        // the crowd's reactions: a cough, a "?"
        if (t > T.tiny + 0.7 && t < T.dive) { x.save(); x.font = "700 30px 'Space Mono', monospace"; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('*cough*', 560, 1530); x.fillText('?', 820, 1540); x.restore() }
      } else if (t < T.stage2) {
        // ── backstage: the costume rack, Saturn's book, the flashlight beam
        drawAcademy(x, t, { room: 'stage', dim: 0.5, light: 0 })
        x.save(); x.fillStyle = 'rgba(8,4,20,0.55)'; x.fillRect(0, 0, 1080, 1920); x.restore()
        curtain(x, t, 1, 1, 300)
        const bk = prog(t, T.book - 0.2, T.book + 0.3) * (1 - prog(t, T.click - 0.2, T.click + 0.2))
        sunBook(x, t, bk)
        drawBabyStar(x, 330, 1190, 260, t, { sign: 'leo', age: 'kid', mood: t < T.book ? 'neutral' : t < T.huh ? 'wide' : t < T.click ? 'sparkle' : 'wide', look: t < T.book ? [0, 0.6] : t < T.click ? [0.6, -0.8] : [1, -0.2], hops: [T.back + 0.6, T.huh + 0.1, T.click + 0.1], seed: 5, squash: t < T.book ? 0.1 : 0 })
        drawToyCrown(x, 540, 1360, 0.7, t, { dropped: true })
        drawSaturn(x, 790, 1200, 300, t, { mood: t < T.fav ? 'neutral' : 'happy', look: [-1, 0.4], seed: 7, prop: t < T.book ? 'book' : null })
        // the beam pokes through the curtain at the click
        const fk = prog(t, T.click, T.click + 0.25)
        if (fk > 0) {
          flashBeam(x, t, { from: [880, 1180], to: [400, 1150], k: fk, w: 90 })
          const ak = ease.outCubic(prog(t, T.click + 0.2, T.click + 0.6))
          const a = drawBabyStar(x, lerp(1180, 900, ak), 1200, 220, t, { sign: 'aquarius', age: 'kid', mood: 'happy', look: [-1, 0], seed: 11 })
          drawHeadphones(x, a, 220)
          drawFlashlight(x, lerp(1180, 900, ak) - 90, 1200, t, { angle: Math.PI })
        }
      } else if (t < T.hug) {
        // ── the stage, again: the big light is off; one flashlight from the back row
        drawAcademy(x, t, { room: 'stage', dim: 0.45, light: 0 })
        flashBeam(x, t, { from: [960, 1640], to: [540, 1080], k: 1, w: 150 })
        const r = drawBabyStar(x, 540, 1085, 290, t, { sign: 'leo', age: 'kid', mood: t < T.roar ? 'happy' : t < T.clap ? 'wide' : 'happy', look: [0.7, 0.7], hops: [T.stage2 + 0.4, T.crown, T.crown + 0.6, T.roar, T.roar + 0.3, T.clap + 0.5], seed: 5, squash: t > T.roar && t < T.clap ? -0.08 : 0 })
        drawToyCrown(x, r.x, r.top + 28, 0.85, t, { lift: t > T.crown && t < T.roar ? 1 : 0 })
        if (t > T.roar && t < T.clap + 0.3) roarLines(x, t, r.x, r.y - 40, 290)
        classRow(x, t, { aqua: false, cheer: t > T.clap ? 1 : 0 })
        const a = drawBabyStar(x, 960, 1700, 190, t, { sign: 'aquarius', age: 'kid', mood: t > T.clap ? 'heart' : 'happy', look: [-0.6, -0.8], seed: 11, hops: t > T.clap ? [T.clap + 0.3] : [] })
        drawHeadphones(x, a, 190)
        drawFlashlight(x, 930, 1640, t, { angle: Math.atan2(1080 - 1640, 540 - 960) })
        if (t > T.clap) applause(x, t, T.clap)
      } else {
        // ── the hug, then growUp into today's Leo (Aquarius beside it, still holding the flashlight)
        drawAcademy(x, t, { room: 'stage', dim: 0.25, light: 0, banner: false })
        flashBeam(x, t, { from: [1000, 700], to: [560, 1100], k: 0.7, w: 160 })
        const hugK = ease.outCubic(prog(t, T.hug, T.hug + 0.35))
        const g = growUp(x, t, { sign: 'leo', at: T.grow, x: lerp(400, 470, hugK), y: 1140, size: 300, look: [1, 0], seed: 5, caption: ['AGE 5', 'TODAY'], kidOpts: { hops: [T.hug + 0.1, T.hug + 0.8] } })
        if (t < T.grow + 0.75) {
          const a = drawBabyStar(x, lerp(760, 670, hugK), 1160, 230, t, { sign: 'aquarius', age: 'kid', mood: 'happy', look: [-1, 0], seed: 11 })
          drawHeadphones(x, a, 230)
          drawFlashlight(x, 760, 1230, t, { angle: -0.6 })
        } else {
          const a = drawStarChar(x, 700, 1140, 270, t, { color: AQ.color, glyph: AQ.glyph, mood: 'heart', look: [-1, 0], seed: 11 })
          drawHeadphones(x, a, 270)
          drawFlashlight(x, 800, 1230, t, { angle: -0.6, sticker: true })
        }
        drawToyCrown(x, g.x, g.top + 28, t < T.grow + 0.75 ? 0.8 : 0.95, t)
        // hearts over the hug
        if (t > T.hug + 0.2 && t < T.grow) for (let i = 0; i < 3; i++) { const p = ((t - T.hug) * 0.6 + i / 3) % 1; drawPixelStar(x, 570 + (i - 1) * 60, 940 - p * 160, 12, i % 2, '#ff8fb1', '#ffd0e0') }
      }
      x.restore()

      topScrim(t)
      for (const s of SAY) { const [ax, ay] = anchor(s.at + 0.01, s.who); speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: ax, y: ay, size: s.size ?? 46, name: s.who === 'moon' ? MOON_TAG : s.who === 'sat' ? SAT : s.who === 'aqua' ? AQUA : LEO, color: s.who === 'moon' ? '#f4ead8' : s.who === 'sat' ? '#e8c37a' : s.who === 'aqua' ? AQ.color : LE.color, side: s.who === 'moon' ? 0.3 : s.at < T.hall ? 0.45 : s.who === 'sat' ? -0.3 : 0 }) }
      factChip(x, t, FACT)
      for (const a of AGES) if (t < a.out) { x.save(); x.globalAlpha = 1 - prog(t, a.out - 0.25, a.out); ageCaption(x, t, { text: a.text, at: a.at, x: 250, y: 1690 }); x.restore() }   // (out: null — st10kids' own pop-out calls ease.inBack, which lib.js lacks)
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#fff4dc'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.back, kind: 'flip' }, { t: T.stage2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E05' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const PITCH = { leo: 659.25, moon: 440, sat: 392, aqua: 987.77 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['whoosh', 0.02, 0.4, 0.03], ['pop', 0.08, 329.63, 0.05, 0],
  ...SAY.filter(s => s.at > 0).flatMap(s => speechCues(s.at, { pitch: PITCH[s.who] })),
  ...AGES.filter(a => a.at > 0).flatMap(a => ageCaptionCues(a.at)),
  // the spotlight thunks on; the freeze: a record-stop and a heartbeat
  ['tom', T.step - 0.05, 98, { gain: 0.2 }], ['boom', T.step, 0.2],
  ['whoosh', T.freeze, 0.25, 0.05], ['pop', T.freeze + 0.05, 220, 0.05, 0], ['tick', T.freeze + 0.6, 0.02], ['tick', T.freeze + 1.2, 0.02], ['tick', T.freeze + 1.8, 0.02],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.dive, 0.4, 0.04],
  ['glitter', T.book, T.book + 0.8], ...factChipCues(FACT.at, FACT),
  ['pop', T.click, 2093, 0.04, 0.4], ['pop', T.click + 0.04, 1567.98, 0.03, 0.4],
  ['boom', T.roar, 0.3], ['crash', T.roar + 0.02, { gain: 0.04 }],
  ['glitter', T.clap, T.clap + 1.4], ...[0, 0.18, 0.33, 0.5, 0.66, 0.8].map(d => ['tick', r3(T.clap + d), 0.025]),
  ...growUpCues(T.grow),
  ...[0, 0.12, 0.24, 0.36].map((d, i) => ['pop', r3(T.last + d), [659.25, 783.99, 987.77, 1318.51][i], 0.038, 0]), ['pluck', T.last + 0.36, 1318.51, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
