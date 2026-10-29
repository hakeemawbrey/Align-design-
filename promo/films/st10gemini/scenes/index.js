// st10gemini (60 s vertical, Star Talk season 10 "Little Stars", S10 E03: Gemini) · story 0–55.6, then the shared end card.
// The home-video scrapbook (st10kids.js): one crib with two babies, the Academy classroom, recess story time in the yard,
// then show-and-tell on the stage.
//   0.00  HOOK  frame 0: "Gemini's first word was *two* words." Twin babies in one crib, bouncing, mid-word: "HI—" /
//               "—MOON!" The Moon (night nurse) melts. "AGE 1".
//   3.20  WANT  Both babble at once ("ba ba BA!" / "da da DA!"). ☾: "One at a *time*, little stars?" They want to do
//               everything together: "We talk…" / "…*together*!"
//  12.00  TRY   "AGE 5", class. ♄ SATURN: "Who knows 2 + 2?" "Four…" / "…and a *half*!" The class cracks up. ♄: "New seats.
//               *Apart*." The desks slide to opposite walls. "The answer is…" (nobody finishes it), crickets. "I only know
//               *half*."
//  30.00  TURN  Recess in the yard, a picture book. ♄: "Story time: the *egg*." ★ IN THE MYTH: one version says Castor and
//               Pollux hatched from an egg; their mother was Leda. GEMINI: "One egg… and *two* of us." TWIN: "So I can
//               talk *alone*… and still be us."
//  42.00  WIN   Show-and-tell. Each takes the spotlight alone: "My word is… *brave*." · "Mine is… *kind*." Then they run
//               to each other, a hug: "…and *together*!"
//  50.60        growUp: both kids → today's adult Gemini and The Twin (mustache and all), side by side like frame 0.
//  52.20  LAST  "Two voices. *One* heart."
// Rewatch bait: the Twin's pacifier has a tiny mustache (season 5's Twin); the sippy cups say ME / ALSO ME (the st9 mugs);
// on the far desks, each twin has drawn half a heart, and the halves only meet at the end.
// Ghost: a baby ghost (cell 2) peeks out from behind the left edge of the chalkboard while the twins sit apart.
import { prog, ease, clamp, lerp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { buildEndcard, endcardCues, ENDCARD_LEN } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn, drawTwin } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import {
  drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse,
  drawCloudCrib, drawHomeVideo, kidSign, KIDS_FONTS, crayonPow, crayonPowCues, confetti, drawStoryPage,
} from '../../st10kids.js'

export const DURATION = 60
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN        // 55.6
const INK = '#1b1236'
const GE = kidSign('gemini')
const A_BABY = '♊ BABY GEMINI', B_BABY = '♊ BABY TWIN', A_KID = '♊ KID GEMINI', B_KID = '♊ KID TWIN', MOON = '☾ THE MOON', SAT = '♄ SATURN'
const ACC = '#f2cf4a', BCOL = '#ffd98a'

const T = {
  hookOut: 2.9,
  babble: [3.2, 5.4], moon: [5.6, 8.0], we: [8.3, 11.6], we2: [9.0, 11.6],
  cls: 12.0, q: [12.6, 14.8], four: [15.0, 17.2], half: [15.6, 17.4], laugh: 16.3, apart: [17.8, 20.1], slide: [20.2, 21.0],
  alone: [21.3, 23.9], crickets: 24.2, onlyHalf: [26.4, 29.6],
  yard: 30.0, egg: [30.6, 32.8], chip: 33.0, chipDur: 5.8, two: [36.6, 39.1], ownWords: [39.3, 41.9],
  stage: 42.0, brave: [42.4, 44.5], kind: [44.7, 46.7], run: 46.8, hug: 47.4, together: [47.7, 50.2],
  grow: 50.6, last: 52.2, lastLand: 52.6, out: [55.2, 55.55],
  ghost: 25.0,
}
const CUTS_CAM = [T.babble[0], T.cls, T.slide[0], T.stage, T.alone[0], T.onlyHalf[0]]
const pop01 = (t, t0, d = 0.3, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 166, y: 700, where: 'a baby ghost (cell 2) leans out from behind the left edge of the chalkboard while the twins sit apart' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 104px Inter", "italic 500 158px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Gemini’s first word was *two* words.', at: 0, out: T.hookOut, top: 320, accentColor: ACC })
  const last = popText(root, 'Two voices. | *One* heart.', { top: 330, size: 110, accentSize: 170, at: T.last, gap: 0.1, accentColor: ACC, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const R = Math.round
  const rect = (xx, y, w, h, c) => { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  const txt = (s, xx, y, font, c, align = 'center') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  // ── props
  function stache(cx, cy, size, t, flip = false) {   // the Twin's curly pixel mustache, kid-sized (season 5's Twin)
    const c = Math.max(2, R(size / 30)), y0 = cy + size * 0.2, tw_ = Math.sin(t * 2.2) > 0.85 ? -c : 0
    for (const s of [-1, 1]) {
      const d = flip ? -s : s
      rect(cx + d * c * 0.5 - (d < 0 ? 4 * c : 0), y0, 4 * c, c * 1.4, INK)
      rect(cx + d * c * 4.5 - (d < 0 ? c : 0), y0 - c + tw_, c, c * 1.4, INK)
    }
  }
  function sippy(cx, cy, label, col) {
    rect(cx - 40, cy - 50, 80, 80, INK); rect(cx - 34, cy - 44, 68, 68, col); rect(cx - 16, cy - 66, 32, 20, INK); rect(cx - 12, cy - 62, 24, 16, '#ffffff')
    rect(cx - 50, cy - 20, 12, 30, INK); rect(cx + 38, cy - 20, 12, 30, INK)
    label.split(' ').forEach((l, i, a) => txt(l, cx, cy - 6 + (i - (a.length - 1) / 2) * 18, "700 16px 'Space Mono', monospace", INK))
  }
  function halfHeart(cx, cy, s, side, k = 1) {     // a crayon half heart (left half or right half)
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k); x.beginPath(); x.rect(side < 0 ? -s : 0, -s, s, 2 * s); x.clip()
    x.strokeStyle = '#ff6f8a'; x.fillStyle = 'rgba(255,111,138,0.45)'; x.lineWidth = 6
    x.beginPath(); x.moveTo(0, s * 0.6); x.bezierCurveTo(-s, 0, -s * 0.5, -s * 0.8, 0, -s * 0.25); x.bezierCurveTo(s * 0.5, -s * 0.8, s, 0, 0, s * 0.6); x.fill(); x.stroke()
    x.restore()
  }
  function desk(cx, cy, w = 260) { rect(cx - w / 2, cy + 40, w, 26, INK); rect(cx - w / 2 + 6, cy + 44, w - 12, 18, '#e8b878'); rect(cx - w / 2 + 6, cy + 44, w - 12, 5, '#ffd8a0'); rect(cx - w / 2 + 14, cy + 66, 14, 90, INK); rect(cx + w / 2 - 28, cy + 66, 14, 90, INK) }
  function eggArt(ctx, w, h, t) {          // the picture book: a cracked egg, two babies peeking out, the swan-mother's wing
    ctx.fillStyle = '#d8ecff'; ctx.fillRect(0, 0, w / 2 - 6, h); ctx.fillStyle = '#ffe9c8'; ctx.fillRect(w / 2 + 6, 0, w / 2, h)
    const cx = w * 0.25, cy = h * 0.6, wob = Math.sin(t * 6) * 0.05
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(wob)
    ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = INK; ctx.lineWidth = 6
    ctx.beginPath(); ctx.ellipse(0, 30, 120, 110, 0, 0, Math.PI); ctx.fill(); ctx.stroke()       // the lower shell
    ctx.beginPath(); ctx.moveTo(-120, 30); for (let i = 0; i <= 8; i++) ctx.lineTo(-120 + i * 30, 30 + (i % 2 ? -26 : 0)); ctx.stroke()
    for (const [bx, col] of [[-48, '#f2cf4a'], [48, '#ffd98a']]) {                                 // two little stars
      ctx.fillStyle = col; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 22 : 48; ctx.lineTo(bx + Math.cos(a) * r, -10 + Math.sin(a) * r) } ctx.fill(); ctx.stroke()
      ctx.fillStyle = INK; ctx.fillRect(bx - 14, -14, 8, 10); ctx.fillRect(bx + 6, -14, 8, 10)
    }
    ctx.restore()
    void 0
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(70, 30); ctx.lineTo(56, 60); ctx.lineTo(110, 66); ctx.lineTo(80, 96); ctx.lineTo(0, 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore()
    ctx.fillStyle = '#5a3a2a'; ctx.font = "italic 500 46px 'EB Garamond', serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ;['One egg.', 'Two babies.', 'Castor & Pollux.'].forEach((l, i) => ctx.fillText(l, w * 0.75, 170 + i * 66))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = vlogCam(t, { cuts: CUTS_CAM, punches: [{ at: T.half[0], out: T.laugh + 0.8, zoom: 1.15, x: 540, y: 1150 }, { at: T.crickets, out: T.crickets + 1.8, zoom: 1.2, x: 300, y: 1150 }, { at: T.ownWords[0], out: T.ownWords[1], zoom: 1.12, x: 700, y: 1200 }] })
      x.save(); cam.apply(x)
      const said = [], caps = [], say = o => said.push(o), capt = o => caps.push(o)
      let Z = 1, ZX = 540, ZY = 1100
      if (t < T.cls) {
        // ── the crib for two
        Z = 1.25; ZY = 1250
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        drawNursery(x, t, { cribs: false, mobile: true })
        const CX = 540, CY = 1300
        drawCloudCrib(x, CX, CY, 360, t)
        const both = t < T.hookOut || (t > T.babble[0] && t < T.babble[1])
        const hopA = [0.05, 0.75, 1.45, 2.15, T.babble[0], T.babble[0] + 0.7, T.babble[0] + 1.4, T.we[0]], hopB = [0.4, 1.1, 1.8, 2.5, T.babble[0] + 0.35, T.babble[0] + 1.05, T.babble[0] + 1.75, T.we2[0]]
        drawBabyStar(x, CX - 85, CY - 120, 200, t, { sign: 'gemini', mood: both ? 'laugh' : t > T.moon[0] && t < T.moon[1] ? 'wide' : 'happy', seed: 3, look: [1, 0], hops: hopA })
        drawBabyStar(x, CX + 85, CY - 120, 200, t, { sign: 'gemini', mood: both ? 'laugh' : t > T.moon[0] && t < T.moon[1] ? 'wide' : 'happy', seed: 5, look: [-1, 0], flip: true, pacifier: t > T.we2[1] - 1.2 && t < T.cls, hops: hopB, color: GE.color })
        // the Twin's mustache (on its face, or on its pacifier when it has one)
        drawCloudCrib(x, CX, CY, 360, t, { front: true })
        stache(CX + 85, CY - 128, 200, t, true)
        sippy(CX - 230, CY - 30, 'ME', '#ffe9a0'); sippy(CX + 230, CY - 30, 'ALSO ME', '#ffd0a0')
        drawMoonNurse(x, 820, 820, 100, t, { mood: t < T.babble[0] ? 'happy' : t < T.moon[1] ? 'wide' : 'happy', look: [-1, 1], hops: [T.moon[0]] })
        x.restore()
        say({ text: 'HI—', at: -1, out: T.hookOut, x: CX - 100, y: CY - 230, name: A_BABY, color: ACC, w: 300, side: -0.5 })
        say({ text: '—*MOON!*', at: -1, out: T.hookOut, x: CX + 100, y: CY - 230, name: B_BABY, color: BCOL, w: 300, side: 0.5 })
        say({ text: 'ba ba *BA!*', at: T.babble[0], out: T.babble[1], x: CX - 100, y: CY - 230, name: A_BABY, color: ACC, w: 320, side: -0.5 })
        say({ text: 'da da *DA!*', at: T.babble[0] + 0.15, out: T.babble[1], x: CX + 100, y: CY - 230, name: B_BABY, color: BCOL, w: 320, side: 0.5 })
        say({ text: 'One at a *time*, little stars?', at: T.moon[0], out: T.moon[1], x: 800, y: 700, name: MOON, color: '#f4ead8', side: -0.4, w: 560 })
        say({ text: 'We talk…', at: T.we[0], out: T.we[1], x: CX - 100, y: CY - 230, name: A_BABY, color: ACC, w: 300, side: -0.5 })
        say({ text: '…*together*!', at: T.we2[0], out: T.we2[1], x: CX + 100, y: CY - 230, name: B_BABY, color: BCOL, w: 340, side: 0.5 })
        capt({ text: 'AGE 1', at: -0.4, out: T.cls - 0.3, size: 64, sub: 'HOME VIDEO · TAPE 1' })
      } else if (t < T.yard) {
        // ── the classroom: finishing each other's sentences, then seated apart
        Z = 1.15; ZY = 1100
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        drawAcademy(x, t, { room: 'class' })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.6, from: 'left', cell: 2 })
        drawSaturn(x, 880, 960, 200, t, { mood: t > T.apart[0] && t < T.apart[1] ? 'squint' : t > T.laugh && t < T.apart[0] ? 'happy' : 'neutral', look: [-1, 0], hops: [T.q[0], T.apart[0]] })
        const sp = ease.inOutCubic(prog(t, T.slide[0], T.slide[1]))
        const ax = lerp(450, 260, sp), bx = lerp(630, 820, sp)
        // classmates in the back row, laughing at 2 + 2
        ;[['leo', 330], ['virgo', 750]].forEach(([s, bx2], i) => drawBabyStar(x, bx2, 1010, 120, t, { sign: s, age: 'kid', mood: t > T.laugh && t < T.apart[0] ? 'laugh' : 'neutral', seed: 40 + i, look: [0, -1], hops: [T.laugh + i * 0.1, T.laugh + 0.4 + i * 0.1] }))
        const sad = t > T.alone[0]
        const aMood = t > T.onlyHalf[0] ? 'cry' : sad ? 'wide' : t > T.four[0] && t < T.apart[0] ? 'laugh' : 'happy'
        const bMood = t > T.onlyHalf[0] ? 'cry' : t > T.crickets ? 'pout' : sad ? 'wide' : t > T.four[0] && t < T.apart[0] ? 'laugh' : 'happy'
        drawBabyStar(x, ax, 1150, 170, t, { sign: 'gemini', age: 'kid', mood: aMood, seed: 3, look: sad ? [1, 0] : [0, -1], backpack: true, backpackColor: '#7fd8ff', hops: [T.four[0], T.alone[0]] })
        drawBabyStar(x, bx, 1150, 170, t, { sign: 'gemini', age: 'kid', mood: bMood, seed: 5, look: sad ? [-1, 0] : [0, -1], flip: true, backpack: true, backpackColor: '#ff9ec7', hops: [T.half[0]] })
        stache(bx, 1150, 170, t, true)
        desk(ax, 1150); desk(bx, 1150)
        // the half hearts on the far desks
        halfHeart(ax + 40, 1210, 26, -1, sad ? 1 : 0); halfHeart(bx - 40, 1210, 26, 1, sad ? 1 : 0)
        x.restore()
        crayonPow(x, t, { text: 'HA HA!', at: T.laugh, dur: 1.0, x: 300, y: 860, size: 64, color: '#ffd36e', rot: -0.1 })
        crayonPow(x, t, { text: 'HA!', at: T.laugh + 0.25, dur: 0.8, x: 800, y: 900, size: 56, color: '#9be08a', rot: 0.1 })
        crayonPow(x, t, { text: 'chirp…', at: T.crickets, dur: 1.6, x: 540, y: 980, size: 60, color: '#9be08a', rot: 0.05 })
        crayonPow(x, t, { text: 'chirp.', at: T.crickets + 0.8, dur: 1.2, x: 640, y: 1100, size: 46, color: '#9be08a', rot: -0.05 })
        say({ text: 'Who knows 2 + 2?', at: T.q[0], out: T.q[1], x: 860, y: 880, name: SAT, color: '#f7dca0', side: -0.6, w: 560 })
        say({ text: 'Four…', at: T.four[0], out: T.four[1], x: ax, y: 1060, name: A_KID, color: ACC, w: 260 })
        say({ text: '…and a *half*!', at: T.half[0], out: T.half[1], x: bx, y: 1060, name: B_KID, color: BCOL, w: 380, side: 0.3 })
        say({ text: 'New seats. *Apart*.', at: T.apart[0], out: T.apart[1], x: 880, y: 880, name: SAT, color: '#f7dca0', side: -0.4, w: 460 })
        say({ text: 'The answer is…', at: T.alone[0], out: T.alone[1], x: ax, y: 1060, name: A_KID, color: ACC, w: 420, side: 0.2 })
        say({ text: 'I only know *half*.', at: T.onlyHalf[0], out: T.onlyHalf[1], x: bx, y: 1060, name: B_KID, color: BCOL, w: 440, side: -0.3 })
        capt({ text: 'AGE 5', at: T.cls + 0.1, out: T.yard - 0.4, size: 64, sub: 'MATH CLASS' })
      } else if (t < T.stage) {
        // ── recess, the picture book
        Z = 1.0
        x.save()
        drawAcademy(x, t, { room: 'yard' })
        drawStoryPage(x, t, { x: 540, y: 760, w: 900, h: 560, open: prog(t, T.yard + 0.15, T.yard + 0.75), art: eggArt })
        drawSaturn(x, 850, 1180, 210, t, { mood: 'happy', look: [-1, -1], prop: null, pointer: true, hops: [T.egg[0]] })
        drawBabyStar(x, 300, 1200, 190, t, { sign: 'gemini', age: 'kid', mood: t > T.two[0] ? 'sparkle' : 'wide', seed: 3, look: [0, -1], hops: [T.two[0]] })
        drawBabyStar(x, 520, 1210, 190, t, { sign: 'gemini', age: 'kid', mood: t > T.ownWords[0] ? 'happy' : 'wide', seed: 5, look: [0, -1], flip: true, hops: [T.ownWords[0]] })
        stache(520, 1210, 190, t, true)
        x.restore()
        say({ text: 'Story time: the *egg*.', at: T.egg[0], out: T.egg[1], x: 850, y: 1090, name: SAT, color: '#f7dca0', side: -0.4, w: 480 })
        say({ text: 'One egg… and *two* of us.', at: T.two[0], out: T.two[1], x: 300, y: 1100, name: A_KID, color: ACC, w: 520, side: 0.3 })
        say({ text: 'So I can talk *alone*… and still be us.', at: T.ownWords[0], out: T.ownWords[1], x: 520, y: 1110, name: B_KID, color: BCOL, w: 600 })
        capt({ text: 'RECESS', at: T.yard + 0.2, out: T.stage - 0.4, size: 56, rot: 0.03 })
      } else {
        // ── show-and-tell: one word each, alone, then together
        Z = 1.1; ZY = 1100
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        drawAcademy(x, t, { room: 'stage', light: 1 })
        const grown = t >= T.grow
        const runP = ease.inOutCubic(prog(t, T.run, T.hug))
        const aX = t < T.kind[0] ? 540 : lerp(300, 450, runP), bX = t < T.kind[0] ? 1300 : t < T.run ? 540 : lerp(780, 630, runP)
        const aY = 1110, bY = 1110
        const aOn = t < T.kind[0] || t >= T.run
        if (!grown) {
          if (aOn || t < T.kind[0]) drawBabyStar(x, t < T.kind[0] ? 540 : aX, aY, 230, t, { sign: 'gemini', age: 'kid', mood: t > T.hug ? 'happy' : t > T.brave[0] + 1 ? 'sparkle' : 'determined', seed: 3, look: t >= T.run ? [1, 0] : [0, 0], hops: [T.brave[0] + 1.0, T.hug] })
          if (t >= T.kind[0]) {
            drawBabyStar(x, bX, bY, 230, t, { sign: 'gemini', age: 'kid', mood: t > T.hug ? 'happy' : t > T.kind[0] + 1 ? 'sparkle' : 'determined', seed: 5, look: t >= T.run ? [-1, 0] : [0, 0], flip: true, hops: [T.kind[0] + 1.0, T.hug] })
            stache(bX, bY, 230, t, true)
          }
          if (t > T.hug) { const hk = pop01(t, T.hug, 0.3, 2.5); halfHeart(527, 930, 50, -1, hk); halfHeart(553, 930, 50, 1, hk) }
        } else {
          growUp(x, t, { sign: 'gemini', at: T.grow, x: 400, y: 1100, size: 250, seed: 3, look: [1, 0], caption: ['AGE 5', 'TODAY'] })
          if (t < T.grow + 0.85) growUp(x, t, { sign: 'gemini', at: T.grow, x: 680, y: 1100, size: 250, seed: 5, look: [-1, 0], kidOpts: { flip: true } })
          else {
            const p = prog(t, T.grow + 0.85, T.grow + 1.5), sq = 0.22 * Math.exp(-p * 5) * Math.cos(p * 18)
            drawTwin(x, 680, 1100, 250, t, { mood: 'happy', look: [-1, 0], seed: 5, squash: sq })
          }
          if (t < T.grow + 0.85) stache(680, 1100, 205, t, true)
        }
        // the audience: a few kids' heads
        ;[['leo', 200], ['libra', 430], ['virgo', 660], ['aries', 890]].forEach(([s, ax2], i) => drawBabyStar(x, ax2, 1560, 130, t, { sign: s, age: 'kid', mood: t > T.hug ? 'heart' : 'sparkle', seed: 60 + i, look: [0, -1], tips: false }))
        x.restore()
        confetti(x, t, { x: 540, y: 1000, at: T.hug, dur: 2.2, n: 50, spread: 420 })
        crayonPow(x, t, { text: 'TOGETHER!', at: T.hug, dur: 1.2, x: 540, y: 760, size: 76, color: '#ffd36e' })
        say({ text: 'My word is… *brave*.', at: T.brave[0], out: T.brave[1], x: 540, y: 960, name: A_KID, color: ACC, w: 500 })
        say({ text: 'Mine is… *kind*.', at: T.kind[0], out: T.kind[1], x: 540, y: 960, name: B_KID, color: BCOL, w: 460 })
        say({ text: '…and *together*!', at: T.together[0], out: T.together[1], x: 540, y: 950, name: '♊ BOTH', color: ACC, w: 460 })
        capt({ text: 'SHOW AND TELL', at: T.stage + 0.1, out: T.grow - 0.2, size: 50, y: 1755 })
      }
      x.restore()
      const zx = v => ZX + (v - ZX) * Z, zy = v => ZY + (v - ZY) * Z
      for (const o of said) speechBubble(x, t, { ...o, x: zx(o.x), y: zy(o.y) })
      for (const o of caps) ageCaption(x, t, o)
      if (t > T.last - 0.3) { x.fillStyle = `rgba(16,9,38,${(0.45 * prog(t, T.last - 0.3, T.last + 0.2)).toFixed(3)})`; x.fillRect(0, 0, 1080, 900) }
      if (cam.flash > 0) { x.fillStyle = `rgba(255,250,240,${(cam.flash * 0.5).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
      factChip(x, t, { label: '★ IN THE MYTH', text: 'One version says Castor and Pollux hatched from an egg. Their mother was Leda.', at: T.chip, dur: T.chipDur, x: 540, y: 1440, color: ACC, w: 860 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawCrayonFrame(x, t, { alpha: 1 - 0.6 * prog(t, T.last - 0.4, T.last) })
      drawHomeVideo(x, t, { y0: 232, alpha: 1 - prog(t, T.last - 0.4, T.last), date: t < T.cls ? 'MAY 21 · TAPE 1' : 'SEP 10 · TAPE 2' })
      hook.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.yard, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E03' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }), ['pop', 0.1, 880, 0.03, -0.3], ['pop', 0.45, 1318.51, 0.03, 0.3],
  ...speechCues(T.babble[0], { pitch: 880 }), ...speechCues(T.babble[0] + 0.15, { pitch: 1318.51 }),
  ...[0, 0.35, 0.7, 1.05, 1.4, 1.75].map(d => ['pop', r3(T.babble[0] + d), d % 0.7 === 0 ? 880 : 1174.66, 0.02, d % 0.7 === 0 ? -0.3 : 0.3]),
  ...speechCues(T.moon[0], { pitch: 523 }), ...speechCues(T.we[0], { pitch: 880 }), ...speechCues(T.we2[0], { pitch: 1318.51 }),
  ...vlogCutCues(CUTS_CAM, { gain: 0.035 }), ...ageCaptionCues(T.cls + 0.1),
  ...speechCues(T.q[0], { pitch: 392 }), ...speechCues(T.four[0], { pitch: 880 }), ...speechCues(T.half[0], { pitch: 1318.51 }),
  ...crayonPowCues(T.laugh, { kind: 'yay' }), ...speechCues(T.apart[0], { pitch: 392 }),
  ['whoosh', T.slide[0], 0.8, 0.04], ['tick', T.slide[1], 0.04],
  ...speechCues(T.alone[0], { pitch: 880 }),
  ...[0, 0.3, 0.8, 1.1].map(d => ['pluck', r3(T.crickets + d), 3520, 0.012, 0.08, 0.4]), ['tick', T.ghost + 0.05, 0.012],
  ...speechCues(T.onlyHalf[0], { pitch: 659 }),
  ...ageCaptionCues(T.yard + 0.2), ...speechCues(T.egg[0], { pitch: 392 }), ...factChipCues(T.chip, { dur: T.chipDur }),
  ...speechCues(T.two[0], { pitch: 880 }), ...speechCues(T.ownWords[0], { pitch: 1318.51 }),
  ...ageCaptionCues(T.stage + 0.1), ['bell', T.stage + 0.2, 1760, 0.02, 1.2, 0],
  ...speechCues(T.brave[0], { pitch: 880 }), ['bell', T.brave[0] + 1.0, 1318.51, 0.025, 1.2, -0.2],
  ...speechCues(T.kind[0], { pitch: 1318.51 }), ['bell', T.kind[0] + 1.0, 1760, 0.025, 1.2, 0.2],
  ['whoosh', T.run, 0.6, 0.03], ...crayonPowCues(T.hug, { kind: 'yay' }), ...speechCues(T.together[0], { pitch: 1046.5 }),
  ...growUpCues(T.grow),
  ['pop', T.last, 587.33, 0.025, 0], ['pop', T.last + 0.1, 739.99, 0.025, 0], ['pop', T.lastLand, 880, 0.04, 0], ['bell', T.lastLand, 1174.66, 0.025, 1.8, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void clamp
