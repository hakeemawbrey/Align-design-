// sxfriendhype — "The Hype Friend." (45 s vertical Align ad · Star Talk Shows · FRIENDS & SELF-LOVE, ep. 1)
// Story 0–40.6, then the shared end card. ♍ VIRGO has a date tonight. Its best friend ♌ LEO bursts in with pom-poms and
// runs a three-phase hype session. The date goes… fine. Leo is still there after, with snacks. ♓ Pisces cries in the
// background of every scene (on the bed, in the mirror, in the awards audience, at the end of the couch).
//   0.00–4.4   "7:58 PM. | Date night."  Virgo sweats at the mirror. The door rattles… 1.16 (drop) it BURSTS and Leo
//              cannonballs in with pom-poms. LEO: "HYPE SESSION. NOW."
//   4.4–10.0   "Phase one: | pom-poms."  Leo cheers: "GIVE ME A Y! AN O! A U!" (three gold letter cards slam in on the
//              words), then shouts "WHAT'S THAT SPELL?!" VIRGO, shy: "…you?" LEO: "YOU!!" Confetti. Pisces sobs.
//  10.045      card cut (deal).
//  10.0–18.8   "Phase two: | the mirror."  A big gold mirror; their reflections (and Pisces crying on the bed behind
//              them, in the glass). LEO: "repeat after me: I am a catch." VIRGO: "I am a… reasonable option." Leo:
//              "LOUDER." VIRGO: "I AM A CATCH!" The mirror flashes gold, the reflection goes heart-eyed.
//  18.8–24.4   "Phase three: | the awards."  Curtains open, Leo hosts at a podium with a mic: "and BEST HUMAN goes to…"
//              (the spotlight sweeps, a drumroll, silence) "YOU!" A trophy drops onto Virgo's head. Pisces in the
//              front row, sobbing. VIRGO, deadpan: "I haven't even left yet."
//  24.489      card cut (flip).
//  24.5–26.8   "Tonight's deck."  The phone deals; the veiled top card glows; ALIGN. Virgo hops off to the date; Leo waves.
//  26.8–29.4   "11:40 PM."  The wall clock spins. Leo asleep on the couch. Virgo drags back in. VIRGO: "it was… fine."
//              Leo's eyes snap open. Silence. Pisces sniffles.
//  29.4–32.8   "The debrief."  Leo pops up from the couch with a giant bowl of chips. LEO: "snacks for ANY outcome."
//  32.825      ★ LESSON UNLOCKED: "The friend who hypes you | is a love story too." +1 BESTIE
//  37.4–40.6   "Text your bestie."  A blanket drops over the two on the couch; Leo feeds Virgo a chip; Pisces happy-cries.
// One canvas (sky + set + stars + props), DOM type + dialogue boxes + the lesson above it, the show bug, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawPomPom, drawMic, drawTrophy, drawDoor, drawMirror, drawBed, drawBubble, drawLetterCard, drawCurtains, drawPodium, drawCouch, drawBowl, drawBlanket, drawClock, drawSweat } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#9fe8ff', MINT = '#7dffb0', HOT = '#ff5ad1', ORANGE = '#ffb35c'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
export const KEY = 'F'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · date night
  h0: 0.12, h0Land: BEAT(0), h0Out: [4.2, 4.38],
  sweat: 0.35, rattle: [0.42, 0.68, 0.92], burst: BEAT(1), run: [1.17, 1.62], l1: 1.75, close1: 4.38,
  // 2 · pom-poms
  s2: 4.42, h1: 4.46, h1Land: 4.8, l2: 4.82, spell: [6.45, 7.75], l4: 7.95, you: 8.6, close2: 9.86, h1Out: [9.84, 10.0],
  c1: BEAT(17),                                                     // 10.045
  // 3 · the mirror
  h2: 10.12, h2Land: 10.42, l5: 10.4, l6: 13.4, louder: [15.0, 16.1], l7: 16.42, close3: 18.7, h2Out: [18.55, 18.72],
  c2: 18.8,
  // 4 · the awards
  curt: [18.86, 19.3], h3: 18.88, h3Land: 19.18, l8: 19.2, drum: [20.3, 20.6], you2: BEAT(36), l9: 21.8, close4: 24.42, h3Out: [24.25, 24.42],
  c3: BEAT(43),                                                     // 24.489
  // 5 · tonight's deck
  phone: [24.42, 24.88], h4: 24.56, h4Land: 24.86, deal: 24.95, dealGap: 0.09, flip: [25.42, 25.7], glow: 25.82, swipe: 26.2,
  phoneAway: [26.38, 26.7], exit: [26.4, 26.75], h4Out: [26.6, 26.76], dip: 26.85,
  // 6 · 11:40 PM
  h5: 26.92, h5Land: 27.15, spin: [26.9, 27.45], back: [27.25, 27.65], l10: 27.73, wake: 28.3, h5Out: [29.28, 29.44],
  // 7 · the debrief
  snack: BEAT(52), h6: 29.5, h6Land: 29.8, l11: 30.22, close5: 32.8, h6Out: [32.55, 32.72],
  // 8 · LESSON UNLOCKED
  lesson: BEAT(58), lessonOut: [37.2, 37.4],
  // 9 · text your bestie
  h7: 37.45, h7Land: 37.85, blanket: [37.42, 37.72], cuddle: [37.45, 37.9], chip: 38.6, out: [40.05, 40.45], h7Out: [40.2, 40.45],
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The friend who *hypes you* | is a love story too.', chip: '+1 BESTIE', accentColor: ORANGE, dim: 0.55 }

// ── the dialogue
const LEON = '♌ LEO', HOST = '♌ LEO (HOST)', VIRN = '♍ VIRGO', LEOC = ORANGE, VIRC = '#ff8fb8'
const L1 = [{ t: T.l1, speaker: LEON, color: LEOC, text: 'HYPE SESSION. *NOW.*' }]
const L2 = [
  { t: T.l2, speaker: LEON, color: LEOC, text: 'GIVE ME A *Y!* AN *O!* A *U!*' },
  { t: T.l4, speaker: VIRN, color: VIRC, text: '…*you?*' },
]
const L3 = [
  { t: T.l5, speaker: LEON, color: LEOC, text: 'repeat after me: I am a *catch.*' },
  { t: T.l6, speaker: VIRN, color: VIRC, text: 'I am a… *reasonable option.*' },
  { t: T.l7, speaker: VIRN, color: VIRC, text: 'I AM A *CATCH!*' },
]
const L4 = [
  { t: T.l8, speaker: HOST, color: LEOC, text: 'and BEST HUMAN goes to…' },
  { t: T.l9, speaker: VIRN, color: VIRC, text: 'I haven’t even *left* yet.' },
]
const L5 = [
  { t: T.l10, speaker: VIRN, color: VIRC, text: 'it was… *fine.*' },
  { t: T.l11, speaker: LEON, color: LEOC, text: 'snacks for *any* outcome.' },
]
export const ALL_LINES = [...L1, ...L2, ...L3, ...L4, ...L5]
export const BOXES = [[L1, T.close1, 52], [L2, T.close2, 52], [L3, T.close3, 52], [L4, T.close4, 52], [L5, T.close5, 52]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const charAt = (li, word) => { const s = ALL_LINES[li].text.replace(/\*/g, ''); return LT[li].chars[Math.max(0, s.indexOf(word))] }
export const TW = { Y: charAt(1, 'Y!'), O: charAt(1, 'O!'), U: charAt(1, 'U!'), you: charAt(2, 'you'), catch: charAt(5, 'CATCH'), left: charAt(7, 'left'), fine: charAt(8, 'fine'), any: charAt(9, 'any') }
const LEO_HOPS = [...talkHops([...L1, ...L2, ...L3, ...L4, ...L5], LEON, { cps: CPS }), ...talkHops(L4, HOST, { cps: CPS })]
const VIR_HOPS = talkHops(ALL_LINES, VIRN, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const JUMP = (t, t0, d = 0.42) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }
const tween = (a, b, p, arc = 0) => { const e = ease.inOutCubic(p); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e) - Math.sin(Math.PI * p) * arc, lerp(a[2], b[2], e)] }
const beatPh = t => ((t - 0.6) / (60 / 108)) % 1

// ── the cast
const CAST = { vir: { ...signStar('virgo'), seed: 5 }, leo: { ...signStar('leo'), seed: 13 }, pis: { ...signStar('pisces'), seed: 59 } }
const LAY = {
  ROOM: { vir: [430, 1075, 280], leo: [175, 1195, 210], pis: [935, 792, 110] },
  CHEER: { vir: [175, 1240, 180], leo: [540, 1100, 330], pis: [935, 792, 110] },
  MIRROR: { vir: [175, 1255, 220], leo: [905, 1255, 210] },
  STAGE: { vir: [400, 1120, 270], leo: [835, 955, 200], pis: [215, 1315, 120] },
  DECK: { vir: [128, 1010, 180], leo: [952, 1010, 180] },
  COUCH: { vir: [405, 1100, 240], leo: [680, 1100, 240], pis: [960, 1180, 130] },
  CUDDLE: { vir: [450, 1105, 240], leo: [640, 1100, 240], pis: [960, 1180, 130] },
}
const DOORPT = [130, 1040, 90]
const MIR1 = { x: 610, y: 640, w: 220, h: 560 }, MIR3 = { x: 290, y: 560, w: 500, h: 720 }
const COUCH = { x: 540, y: 1180, w: 600 }

/** where actor k is at t → { p: [x, y, s], pk } or null */
function place(k, t) {
  if (t < T.s2) {
    if (k === 'leo') { if (t < T.burst) return null; return { p: tween(DOORPT, LAY.ROOM.leo, prog(t, ...T.run), 260), pk: 1 } }
    return { p: LAY.ROOM[k], pk: 1 }
  }
  if (t < T.c1) { const p = prog(t, T.s2, T.s2 + 0.42); return { p: p < 1 ? tween(LAY.ROOM[k], LAY.CHEER[k], p, k === 'pis' ? 0 : 140) : LAY.CHEER[k], pk: 1 } }
  if (t < T.c2) { const L = LAY.MIRROR[k]; return L ? { p: L, pk: 1 } : null }
  if (t < T.c3) { const st = { vir: 0.12, leo: 0.0, pis: 0.22 }[k]; return { p: LAY.STAGE[k], pk: pop01(t, T.curt[0] + 0.1 + st, 0.32, 2) } }
  if (t < T.dip) {
    if (k === 'pis') return null
    if (k === 'vir' && t >= T.exit[0]) { const p = prog(t, ...T.exit); return p >= 1 ? null : { p: tween(LAY.DECK.vir, [-200, 1040, 180], p, 120), pk: 1 } }
    return { p: LAY.DECK[k], pk: pop01(t, T.c3 + 0.05, 0.3, 2) }
  }
  const cud = prog(t, ...T.cuddle)
  if (k === 'vir') {
    if (t < T.back[0]) return null
    const p = prog(t, ...T.back)
    if (p < 1) return { p: tween([-200, 1110, 240], LAY.COUCH.vir, p, 60), pk: 1 }
  }
  return { p: cud > 0 ? tween(LAY.COUCH[k], LAY.CUDDLE[k], cud, 30) : LAY.COUCH[k], pk: t < T.dip + 0.4 && k !== 'vir' ? pop01(t, T.dip + 0.02, 0.3, 2) : 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 26px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 420), FACE = bake(faceIm, 520)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HL = (text, o) => popText(root, text, { late: 1, wobble: true, ...o })
  const H0 = HL('7:58 PM. | Date *night.*', { top: 160, size: 120, accentSize: 160, at: T.h0, lateAt: T.h0Land, accentColor: PINK, lineHeight: 1.0 })
  const H1 = HL('Phase one: | *pom-poms.*', { top: 150, size: 108, accentSize: 156, at: T.h1, lateAt: T.h1Land, accentColor: ORANGE, lineHeight: 1.0 })
  const H2 = HL('Phase two: | the *mirror.*', { top: 150, size: 108, accentSize: 156, at: T.h2, lateAt: T.h2Land, accentColor: GOLD, lineHeight: 1.0 })
  const H3 = HL('Phase three: | the *awards.*', { top: 130, size: 100, accentSize: 146, at: T.h3, lateAt: T.h3Land, accentColor: GOLD, lineHeight: 1.0 })
  const H4 = HL('Tonight’s *deck.*', { top: 205, size: 116, accentSize: 164, at: T.h4, lateAt: T.h4Land, accentColor: LAV })
  const H5 = HL('*11:40* PM.', { top: 205, size: 124, accentSize: 172, at: T.h5, lateAt: T.h5Land, late: 0, accentColor: CYAN })
  const H6 = HL('The *debrief.*', { top: 205, size: 124, accentSize: 172, at: T.h6, lateAt: T.h6Land, accentColor: ORANGE })
  const H7 = HL('Text your *bestie.*', { top: 190, size: 112, accentSize: 168, at: T.h7, lateAt: T.h7Land, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const boxes = BOXES.map(([lines, close, size]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS, size }))

  // ── the show bug (top-left, the whole story)
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: 'rgba(239,230,214,0.82)', textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', opacity: 0 }, root)
  bug.innerHTML = '<span style="color:#ff8fb1">♥</span> FRIENDS <span style="color:#ff8fb1">&amp;</span> SELF-LOVE'

  // ── the lesson (over the scene, under the grain and the card cuts)
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (POV; local units 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawPhone(t) {
    if (t < T.phone[0] || t > T.phoneAway[1]) return
    const up = easeOutBack(prog(t, ...T.phone), 1.3), aw = ease.inCubic(prog(t, ...T.phoneAway))
    x.save()
    x.translate(540, lerp(2400, 975, up) + aw * 1500); x.rotate((lerp(7, 0, up) - aw * 14) * Math.PI / 180)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    x.save(); x.shadowColor = rgba(LAV, 0.7); x.shadowBlur = 80; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2a1a5c'); g.addColorStop(0.6, '#24164f'); g.addColorStop(1, '#1a1040')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    const r = rng(12)
    for (let i = 0; i < 26; i++) { x.fillStyle = rgba(BONE, 0.15 + 0.35 * r()); x.fillRect(Math.round(sx + r() * sw), Math.round(sy + r() * sh), 2, 2) }
    x.fillStyle = rgba(BONE, 0.9); x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText('7:59 PM', sx + 34, sy + 44)
    x.textAlign = 'right'; x.fillText('✦', sx + sw - 34, sy + 44)
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Tonight’s deck', sx + 32, sy + 118)
    for (let i = 0; i < 5; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.34)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.4), jr = ((i * 37) % 7 - 3) * 0.012
      const cx = lerp((i - 2) * 50, (i - 2) * 3, e), cy = lerp(sh, 18 - i * 3, e), rot = lerp((i - 2) * 0.5, jr, e)
      if (i < 4) { drawCardImg(BACK, BACK_BODY, cx, cy, 286, rot); continue }
      const f = prog(t, ...T.flip), sxk = Math.cos(f * Math.PI)
      const glow = clamp(prog(t, T.glow, T.glow + 0.25))
      if (glow > 0) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const gg = x.createRadialGradient(cx, cy, 40, cx, cy, 300); gg.addColorStop(0, rgba(GOLD, 0.42 * glow * (0.75 + 0.25 * Math.sin(t * 9)))); gg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = gg; x.fillRect(cx - 300, cy - 300, 600, 600); x.restore()
      }
      if (sxk > 0) drawCardImg(BACK, BACK_BODY, cx, cy, 286, rot, sxk)
      else drawCardImg(FACE, FACE_BODY, cx, cy, 286, rot, -sxk)
    }
    const ly = sy + sh - 92, lit = clamp(prog(t, T.swipe - 0.12, T.swipe + 0.05))
    x.font = `700 22px ${MONO}`; x.textBaseline = 'alphabetic'
    x.textAlign = 'left'; x.fillStyle = rgba(BONE, 0.55); x.fillText('← RELEASE', sx + 30, ly)
    x.textAlign = 'right'
    if (lit > 0) { x.save(); x.shadowColor = rgba(GOLD, 0.95); x.shadowBlur = 22 * lit; x.fillStyle = rgba('#ffe08a', 0.55 + 0.45 * lit); const sc = 1 + 0.18 * lit; x.translate(sx + sw - 30, ly); x.scale(sc, sc); x.fillText('ALIGN →', 0, 0); x.restore() }
    else { x.fillStyle = rgba(BONE, 0.55); x.fillText('ALIGN →', sx + sw - 30, ly) }
    x.textAlign = 'center'; x.font = `500 21px ${INTER}`; x.fillStyle = rgba(BONE, 0.5); x.fillText('Card first. Face last.', 0, sy + sh - 44)
    x.fillStyle = '#140d2a'; rr(-60, sy + 12, 120, 30, 15); x.fill()
    x.restore()
    x.restore()
  }

  // ─────────────────────────────── sparkles, confetti
  function sparkles(t, cx, cy, t0, n, Rr, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.6 + 0.6 * p), cy + Math.sin(a) * Rr * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, CYAN][i % 5])
    }
    x.restore()
  }
  const CONF = [GOLD, PINK, CYAN, MINT, LAV, ORANGE, BONE]
  function confetti(t, t0, x0, y0, n, seed, { spread = 1, up = 1, dur = 2.2 } = {}) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const r = rng(seed)
    x.save()
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (r() - 0.5) * 2.4 * spread, v = (700 + r() * 900) * up, sz = 9 + r() * 9, spin = (r() - 0.5) * 18, c = CONF[i % CONF.length], drag = 0.7 + r() * 0.5
      const px = x0 + Math.cos(a) * v * tt * drag * 0.8, py = y0 + Math.sin(a) * v * tt * drag + 900 * tt * tt
      const al = 1 - prog(tt, dur * 0.6, dur)
      if (al <= 0 || py > H + 30) continue
      x.globalAlpha = al
      x.save(); x.translate(px, py); x.rotate(spin * tt); x.fillStyle = c; x.fillRect(-sz / 2, -sz * 0.3, sz, sz * 0.6 * Math.abs(Math.cos(spin * tt * 0.7)) + 2); x.restore()
    }
    x.restore()
  }
  function drawTears(eyes, t, cell, strength) {
    if (strength <= 0) return
    const c = Math.max(3, Math.round(cell))
    x.save()
    eyes.forEach(([ex, ey], side) => {
      const dir = side === 0 ? -1 : 1
      for (let k = 0; k < 8; k++) {
        const ph = (t * 2.1 + k / 8) % 1
        const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
        const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
        const a = (1 - ph) * clamp(strength)
        if (a <= 0.03) continue
        x.globalAlpha = a
        const X = Math.round(px), Y = Math.round(py)
        x.fillStyle = '#16204a'; x.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
        x.fillStyle = '#5cc6ff'; x.fillRect(X, Y, c, 2 * c)
        x.fillStyle = '#e6f8ff'; x.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
      }
    })
    x.restore()
  }

  // ─────────────────────────────── the cast: moods, looks, reactions
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 60 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 120 ? Math.sign(ty - p[1]) : 0]
  const CHEER_HOPS = Array.from({ length: 9 }, (_, i) => BEAT(8 + i)).filter(h => h < T.l4 - 0.2)
  const HOPS = {
    leo: [T.run[1] - 0.04, ...CHEER_HOPS, ...LEO_HOPS, T.you, T.you + 0.5, T.you2 + 0.1, T.swipe + 0.1, T.snack, T.snack + 0.55, TW.any, T.lesson + 1.75].sort((a, b) => a - b),
    vir: [...VIR_HOPS, T.you + 0.3, T.swipe + 0.12, T.lesson + 1.8, T.chip + 0.1].sort((a, b) => a - b),
    pis: [T.you + 0.2, T.you2 + 0.15, T.you2 + 0.6, T.you2 + 1.05, T.lesson + 1.85].sort((a, b) => a - b),
  }

  function stateOf(k, t, p) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0
    const isV = k === 'vir', isL = k === 'leo', isP = k === 'pis'
    if (isP) tears = 0.55
    if (t < T.s2) {
      // ── date night
      if (isV) {
        mood = 'wide'; look = [1, 0]; squash = 0.03 * Math.sin(t * 40); blink = false
        if (t >= T.rattle[0]) look = [-1, 0]
        if (t >= T.burst) { const kk = t - T.burst; dy = -60 * Math.exp(-kk * 5) * Math.abs(Math.cos(kk * 9)); look = toward(p, place('leo', t).p[0], 1195) }
        if (t >= T.run[1] + 0.2) mood = 'squint'
        if (t >= LT[0].done) mood = 'wide'
      }
      if (isL) { mood = t < T.run[1] ? 'wide' : 'happy'; look = [1, 0]; if (t >= T.l1 && t < LT[0].done + 0.4) mood = 'wink' }
      if (isP) { look = [-1, 0]; mood = 'squint'; if (t >= T.burst && t < T.burst + 0.8) mood = 'wide' }
    } else if (t < T.c1) {
      // ── pom-poms
      if (isL) {
        mood = 'happy'; look = [0, 0]
        if (inR(t, T.spell[0], T.spell[1])) { mood = 'wide'; look = toward(p, LAY.CHEER.vir[0], LAY.CHEER.vir[1]) }
        if (inR(t, T.l4, T.you)) { mood = 'neutral'; look = toward(p, LAY.CHEER.vir[0], LAY.CHEER.vir[1]); blink = false }
        if (t >= T.you) mood = 'heart'
      }
      if (isV) {
        mood = 'neutral'; look = toward(p, 540, 1100)
        for (const ch of [TW.Y, TW.O, TW.U]) if (inR(t, ch, ch + 0.4)) { mood = 'wide'; look = [ch === TW.Y ? 1 : ch === TW.O ? 1 : 1, -1] }
        if (inR(t, T.spell[0], T.l4)) { mood = 'wide'; look = [1, 0]; blink = false }
        if (inR(t, T.l4, T.you)) { mood = 'squint'; look = [0, 1] }
        if (t >= T.you) mood = 'happy'
      }
      if (isP) { look = [-1, 0]; mood = 'squint'; if (t >= T.you) tears = 1 }
    } else if (t < T.c2) {
      // ── the mirror (front stars look up into it)
      if (isV) {
        mood = 'neutral'; look = [1, -1]
        if (t >= T.l6) mood = 'squint'
        if (inR(t, T.louder[0], T.l7)) { mood = 'wide'; blink = false; squash = -0.06 * pulse(t, T.louder[0], 0.4) }
        if (t >= T.l7) mood = 'squint'
        if (t >= TW.catch) { mood = 'sparkle'; const kk = t - TW.catch; dy = -50 * Math.exp(-kk * 4) * Math.abs(Math.cos(kk * 8)) }
      }
      if (isL) {
        mood = 'happy'; look = [-1, -1]
        if (inR(t, LT[4].done + 0.3, T.louder[0])) { mood = 'eyeroll' }
        if (inR(t, T.louder[0], T.louder[1])) { mood = 'squint'; squash = 0.1 * pulse(t, T.louder[0], 0.35) }
        if (t >= TW.catch) mood = 'heart'
      }
    } else if (t < T.c3) {
      // ── the awards
      if (isV) {
        mood = 'wide'; look = toward(p, LAY.STAGE.leo[0], LAY.STAGE.leo[1])
        if (inR(t, T.drum[0] - 0.4, T.you2)) { mood = 'squint'; look = [0, 0]; squash = 0.04 * Math.sin(t * 50) }
        if (t >= T.you2) { const kk = t - T.you2; mood = kk < 0.5 ? 'wide' : 'happy'; look = [0, 0]; if (kk < 0.6) squash = 0.22 * Math.exp(-kk * 6) * Math.cos(kk * 20) }
        if (t >= T.l9) { mood = 'squint'; look = [0, 0] }
      }
      if (isL) {
        mood = 'happy'; look = toward(p, LAY.STAGE.vir[0], 1000)
        if (inR(t, T.drum[0] - 0.4, T.you2)) { mood = 'squint'; look = [-1, 0] }
        if (t >= T.you2) mood = t < T.l9 ? 'wide' : 'heart'
        if (t >= LT[7].done + 0.2) mood = 'wink'
      }
      if (isP) { mood = 'squint'; look = [1, -1]; tears = t >= T.you2 ? 1 : 0.7; if (t >= T.you2 && t < T.you2 + 1.5) mood = 'happy' }
    } else if (t < T.dip) {
      // ── tonight's deck (POV: the phone at 540, 975)
      look = toward(p, 540, 975); mood = 'wide'
      if (t >= T.flip[1]) mood = 'sparkle'
      if (t >= T.swipe) mood = 'happy'
      if (isL && t >= T.exit[0]) { mood = 'happy'; look = [-1, 0] }
      if (isV && t >= T.exit[0]) { mood = 'happy'; look = [-1, 0] }
    } else {
      // ── 11:40 · the debrief · the lesson · text your bestie
      if (isL) {
        mood = t < T.wake ? 'sleepy' : 'wide'; look = t < T.wake ? [0, 0] : toward(p, LAY.COUCH.vir[0], 1100); squash = t < T.wake ? 0.1 : 0; blink = t < T.wake ? undefined : false
        if (t >= T.wake && t < T.wake + 0.5) { const kk = t - T.wake; dy = -40 * Math.exp(-kk * 6) * Math.abs(Math.cos(kk * 9)) }
        if (t >= T.snack) { mood = 'happy'; blink = undefined; look = toward(p, LAY.COUCH.vir[0], 1100) }
        if (t >= TW.any) mood = 'wink'
        if (t >= TW.any + 0.8) mood = 'happy'
      }
      if (isV) {
        mood = 'neutral'; look = [0, 1]; blink = 0.45; squash = 0.06
        if (t >= T.snack) { const kk = t - T.snack; mood = kk < 0.6 ? 'wide' : 'happy'; blink = kk < 0.6 ? false : undefined; look = [1, 0]; squash = 0 }
      }
      if (isP) {
        look = [-1, 0]; mood = 'squint'
        if (t >= TW.fine && t < T.snack) { tears = 1; squash = 0.05 * Math.abs(Math.sin(t * 9)) }
        if (t >= T.snack) { mood = 'happy'; tears = 0.8 }
      }
      if (t >= T.lesson - 0.1 && t < T.lessonOut[0]) { mood = isP ? 'happy' : 'sparkle'; look = [0, -1]; blink = undefined; squash = 0 }
      if (t >= T.lessonOut[0]) {
        mood = 'happy'; look = isP ? [-1, 0] : [isV ? 1 : -1, 0]; blink = undefined; squash = 0
        if (isV && inR(t, T.chip, T.chip + 0.7)) { mood = 'heart' }
        if (isP) tears = 1
      }
    }
    // big jumps: the YOU!! celebration, the trophy cheer, the snack pop
    let j = 0
    if (isL && t >= T.you && t < T.c1) j = Math.max(JUMP(t, T.you, 0.4), 0.7 * JUMP(t, T.you + 0.5, 0.4))
    if (isL && t >= T.snack && t < T.snack + 1) j = 1.4 * JUMP(t, T.snack, 0.5)
    if (isP && t >= T.you2 && t < T.c3) j = Math.max(JUMP(t, T.you2 + 0.15, 0.36), JUMP(t, T.you2 + 0.6, 0.36), JUMP(t, T.you2 + 1.05, 0.36))
    dy -= j * p[2] * 0.45; squash -= j * 0.12
    return { mood, look, blink, squash, dx, dy, tears }
  }

  // star-space helpers (where to hang the props): arms at ±0.47·S, the top tip at R.top
  function drawActor(k, t, P, ok, { alpha = 1 } = {}) {
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return null
    const C = CAST[k], st = stateOf(k, t, p)
    const px = p[0] + st.dx, py = p[1] + st.dy
    const size = p[2]
    const R = drawStarChar(x, px, py, size, t, { color: C.color, glyph: size >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: 0.9, alpha })
    if (st.tears > 0) drawTears([[px - R.size * 0.17, R.y + R.size * 0.07], [px + R.size * 0.17, R.y + R.size * 0.07]], t, Math.max(4, R.size / 22), st.tears)
    return R
  }

  // Leo's pom-poms: pumped on the beat while cheering, shaken hard on the big moments
  function pomPoms(t, R, { pump = 1, shake = 0, r = 0.26 } = {}) {
    const S = R.size, ph = beatPh(t)
    const up = Math.sin(ph * Math.PI * 2) * pump
    drawPomPom(x, R.x - S * 0.5, R.y - S * 0.06 - up * S * 0.14, S * r, t, { shake, seed: 1 })
    drawPomPom(x, R.x + S * 0.5, R.y - S * 0.06 + up * S * 0.14, S * r, t, { shake, seed: 2.3 })
  }

  // ─────────────────────────────── the world
  function drawFloor(t, y0, col = '#170f33', rug = true) {
    x.fillStyle = col; x.fillRect(0, y0, W, H - y0)
    x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(0, y0, W, 6)
    for (let i = 0; i < W; i += 90) { x.fillStyle = 'rgba(201,166,255,0.06)'; x.fillRect(i, y0 + 6, 4, H - y0) }
    if (rug) { x.fillStyle = 'rgba(255,143,177,0.22)'; x.beginPath(); x.ellipse(540, y0 + 70, 420, 50, 0, 0, Math.PI * 2); x.fill() }
  }
  function drawWorld(t) {
    const stageK = inR(t, T.c2, T.c3) ? 1 : 0
    drawSky(x, t, { ...SKY_H, dim: stageK ? 0.3 : SKY_H.dim })
    if (t < T.c1) {
      drawFloor(t, 1280)
      drawBed(x, 845, 845, 200)
      const mirOff = 520 * ease.inCubic(prog(t, T.s2, T.s2 + 0.3))
      if (mirOff < 500) drawMirror(x, { ...MIR1, x: MIR1.x + mirOff }, c => {
        const v = place('vir', t), st = stateOf('vir', t, v.p)
        drawStarChar(c, MIR1.x + mirOff + 110, 990, 200, t, { ...CAST.vir, glyph: null, mood: st.mood, look: [-st.look[0], st.look[1]], blink: st.blink, squash: st.squash, seed: 6, glow: 0.4, alpha: 0.8 })
      })
      const rattle = T.rattle.reduce((m, r) => Math.max(m, pulse(t, r, 0.18)), 0)
      const open = t < T.burst ? 0 : easeOutBack(prog(t, T.burst, T.burst + 0.2), 1.6)
      drawDoor(x, { x: 40, y: 800, w: 180, h: 480, open: clamp(open, 0, 1.05), rattle, light: open > 0 ? 1 - 0.6 * prog(t, T.burst + 0.4, T.burst + 1.5) : 0 })
      const fl = pulse(t, T.burst - 0.02, 0.3)
      if (fl > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rgba('#ffe6b0', 0.2 * fl); x.fillRect(0, 0, W, H); x.restore() }
    } else if (t < T.c2) {
      drawFloor(t, 1290)
      const flash = TW.catch && t >= TW.catch ? Math.exp(-(t - TW.catch) * 3) : 0
      drawMirror(x, { ...MIR3, flash }, c => {
        // the room behind them, in the glass: the bed (mirrored, so on the left) with Pisces crying on it
        c.save(); c.globalAlpha = 0.85
        drawBed(c, 300, 840, 150)
        c.restore()
        const pst = stateOf('pis', t, [360, 800, 90])
        const catchK = t >= TW.catch
        const R0 = drawStarChar(c, 368, 800, 92, t, { ...CAST.pis, glyph: null, mood: catchK ? 'squint' : 'squint', look: [1, 0], seed: 60, glow: 0.4, alpha: 0.85, hops: [TW.catch + 0.1, TW.catch + 0.5] })
        void pst
        c.save(); c.globalAlpha = 0.85
        const vs = stateOf('vir', t, LAY.MIRROR.vir), ls = stateOf('leo', t, LAY.MIRROR.leo)
        let vm = vs.mood
        if (t >= T.l6 && t < T.louder[0]) vm = 'squint'
        if (t >= TW.catch) vm = 'heart'
        drawStarChar(c, 650, 1030, 240, t, { ...CAST.vir, glyph: null, mood: vm, look: [-1, 0], blink: vs.blink, squash: vs.squash, seed: 7, glow: 0.5, hops: HOPS.vir, alpha: 0.88 })
        const RL = drawStarChar(c, 430, 1060, 210, t, { ...CAST.leo, glyph: null, mood: ls.mood === 'eyeroll' ? 'eyeroll' : ls.mood, look: [1, 0], squash: ls.squash, seed: 14, glow: 0.5, hops: HOPS.leo, alpha: 0.88 })
        void RL
        c.restore()
        // Pisces' tears in the glass
        drawTears([[368 - 15, R0.y + 6], [368 + 15, R0.y + 6]], t, 4, t >= TW.catch ? 1 : 0.6)
        if (t >= TW.catch) sparkles(t, 540, 960, TW.catch + 0.05, 14, 300, 0.4, 0.9, 30)
      })
    } else if (t < T.c3) {
      drawFloor(t, 1270, '#1a0f2c', false)
      // the spotlight: sweeps during the drumroll, lands on Virgo for YOU
      const sweep = inR(t, T.drum[0] - 0.4, T.you2) ? Math.sin((t - T.drum[0] + 0.4) * 9) * 260 : 0
      const lx = LAY.STAGE.vir[0] + sweep, on = t >= T.curt[0] + 0.2 ? 1 : 0
      if (on) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createLinearGradient(0, 380, 0, 1300); g.addColorStop(0, 'rgba(255,240,200,0.05)'); g.addColorStop(1, 'rgba(255,240,200,0.28)')
        x.fillStyle = g; x.beginPath(); x.moveTo(lx - 40, 540); x.lineTo(lx + 40, 540); x.lineTo(lx + 210, 1280); x.lineTo(lx - 210, 1280); x.closePath(); x.fill()
        x.fillStyle = 'rgba(255,240,200,0.22)'; x.beginPath(); x.ellipse(lx, 1280, 210, 36, 0, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      // the audience row (seat backs)
      x.fillStyle = '#2a1c4a'; for (let i = 0; i < 9; i++) { x.fillRect(i * 124 - 10, 1370, 104, 40); x.fillStyle = i % 2 ? '#2a1c4a' : '#33225a' }
    } else if (t < T.dip) {
      drawFloor(t, 1290)
      x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(0, 0, W, H)
    } else {
      drawFloor(t, 1290)
      const spin = t < T.spin[1] ? ease.inOutCubic(prog(t, ...T.spin)) : 1
      x.save(); x.globalAlpha = clamp(popOut(t, T.out))
      drawClock(x, 540, 690, 78, Math.PI * 2 * (8 * spin) + 0.6)
      drawCouch(x, COUCH.x, COUCH.y, COUCH.w)
      x.restore()
    }
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const order = t >= T.c2 && t < T.c3 ? ['pis', 'vir', 'leo'] : ['pis', 'leo', 'vir']
    const Rs = {}
    for (const k of order) {
      const P = place(k, t)
      if (!P) continue
      if (k === 'leo' && t >= T.c2 && t < T.c3) {
        const R = drawActor(k, t, P, ok)
        if (R) { drawPodium(x, LAY.STAGE.leo[0], 1040); drawMic(x, R.x - R.size * 0.42, R.y + R.size * 0.02, 7, -0.35); Rs[k] = R }
        continue
      }
      Rs[k] = drawActor(k, t, P, ok)
    }
    const L = Rs.leo, V = Rs.vir, Pp = Rs.pis
    // props on the stars
    if (L) {
      if (t < T.c1) pomPoms(t, L, { pump: t >= T.s2 && t < T.l4 ? 1 : 0.25, shake: t >= T.you ? 1 : t >= T.burst && t < T.run[1] + 0.6 ? 1 : 0.2 })
      else if (t < T.c2) pomPoms(t, L, { pump: 0.15, shake: t >= TW.catch ? 1 : 0, r: 0.22 })
      else if (t >= T.c3 && t < T.dip) pomPoms(t, L, { pump: t >= T.exit[0] ? 1 : 0.3, shake: t >= T.swipe ? 1 : 0, r: 0.24 })
      else if (t >= T.dip && t < T.snack) {     // the pom-poms resting on the couch beside sleepy Leo
        drawPomPom(x, L.x + L.size * 0.55, 1190, 42, t, { seed: 3 })
      }
    }
    if (V && t < T.s2 && t >= T.sweat) {
      const k1 = ((t - T.sweat) * 1.2) % 1
      x.save(); x.globalAlpha = 1 - k1; drawSweat(x, V.x + V.size * 0.3, V.y - V.size * 0.3 + k1 * 60, 7); x.restore()
      if (t > 0.9) { const k2 = ((t - 0.9) * 1.2) % 1; x.save(); x.globalAlpha = 1 - k2; drawSweat(x, V.x - V.size * 0.33, V.y - V.size * 0.22 + k2 * 60, 6); x.restore() }
    }
    // the trophy: drops from the flies at YOU!, lands on Virgo's tip, then sits there for the deadpan
    if (V && t >= T.you2 - 0.35 && t < T.c3) {
      const p = prog(t, T.you2 - 0.35, T.you2), yLand = V.top + 6
      const ty = p < 1 ? lerp(-200, yLand, ease.inCubic(p)) : yLand - 18 * Math.exp(-(t - T.you2) * 6) * Math.abs(Math.cos((t - T.you2) * 14))
      drawTrophy(x, V.x, ty, 9, pulse(t, T.you2 + 0.3, 0.6))
      sparkles(t, V.x, yLand - 60, T.you2 + 0.02, 12, 160, 0.3, 0.8, 26)
    }
    // the snack bowl
    if (L && t >= T.snack - 0.05) {
      const cud = ease.inOutCubic(prog(t, ...T.cuddle))
      const bx = lerp(L.x + 10, 545, cud), by = lerp(L.y + L.size * 0.18, 1160, cud)
      const k = pop01(t, T.snack, 0.3, 2.2)
      x.save(); x.translate(bx, by); x.scale(k, k); drawBowl(x, 0, 0, 9, t); x.restore()
    }
    // the blanket over the two of them (in front)
    if (t >= T.blanket[0]) {
      const k = ease.outCubic(prog(t, ...T.blanket))
      drawBlanket(x, 545, lerp(1260, 1170, k), 520, 150, k * popOut(t, T.out))
      if (k > 0) { const P2 = place('vir', t); void P2 }
    }
    // Leo feeds Virgo a chip in the final shot
    if (L && V && inR(t, T.chip - 0.4, T.chip + 0.5)) {
      const p = prog(t, T.chip - 0.4, T.chip)
      const cx = lerp(L.x - L.size * 0.35, V.x + V.size * 0.12, ease.inOutCubic(p)), cy = lerp(1150, V.y + V.size * 0.12, ease.inOutCubic(p)) - Math.sin(Math.PI * p) * 50
      if (t < T.chip) { x.fillStyle = '#1a1030'; x.fillRect(cx - 14, cy - 10, 28, 20); x.fillStyle = '#f7c948'; x.fillRect(cx - 11, cy - 7, 22, 14) }
      else sparkles(t, V.x, V.y, T.chip, 8, 100, 0.2, 0.5, 18)
    }
    return Rs
  }

  // speech bubbles, letter cards, confetti
  function drawOverlays(t, Rs) {
    // the Y · O · U cards (slam in on the words, jump on YOU!!)
    if (t >= TW.Y && t < T.c1) {
      const xs = [300, 540, 780], chs = ['Y', 'O', 'U'], tt = [TW.Y, TW.O, TW.U]
      const out = 1 - ease.inCubic(prog(t, T.h1Out[0] - 0.1, T.h1Out[1]))
      chs.forEach((ch, i) => {
        if (t < tt[i]) return
        const k = lerp(2.2, 1, ease.outCubic(prog(t, tt[i], tt[i] + 0.16))) * out
        const j = t >= T.you ? JUMP(t, T.you + i * 0.08, 0.4) : 0
        drawLetterCard(x, xs[i], 660 - j * 70, ch, k, (i - 1) * 0.08 + 0.05 * Math.sin(t * 3 + i))
      })
    }
    const L = Rs.leo
    const bub = (text, t0, t1, bx, by, opts) => { if (t < t0 || t >= t1) return; const k = pop01(t, t0, 0.25, 2.4) * (1 - prog(t, t1 - 0.15, t1)); drawBubble(x, bx, by, text, k, opts) }
    if (L) {
      bub('WHAT’S THAT SPELL?!', T.spell[0], T.spell[1], 600, 860, { size: 40, tail: 'left' })
      bub('YOU!!', T.you, T.c1 - 0.2, 680, 860, { size: 64, tail: 'left', col: '#ffe08a' })
      bub('LOUDER.', T.louder[0], T.louder[1], 830, 1060, { size: 44, tail: 'right' })
      bub('YOU!', T.you2, T.you2 + 1.0, 770, 790, { size: 60, tail: 'right', col: '#ffe08a' })
    }
    // Virgo's "…" when the date is over, the drumroll ticks
    if (inR(t, T.drum[0], T.you2)) bub('*drumroll*', T.drum[0], T.you2, 540, 1290, { size: 30, tail: 'none', col: '#c9a6ff' })
    confetti(t, T.you + 0.02, 540, 900, 70, 3)
    confetti(t, T.you2 + 0.02, 400, 800, 60, 7, { spread: 1.2, up: 0.8 })
    confetti(t, T.snack + 0.05, 680, 1080, 40, 11, { spread: 0.8, up: 0.7, dur: 1.6 })
    sparkles(t, 540, 1100, T.burst + 0.05, 14, 420, 0.2, 0.8, 30)
    sparkles(t, 540, 975, T.swipe + 0.04, 12, 260, 0.5, 0.8, 26)
    sparkles(t, 545, 1150, T.blanket[1], 12, 300, 0.7, 0.8, 26)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      let Rs = {}
      if (t < T.out[1] + 0.02) {
        if (t >= T.c3 && t < T.dip) { Rs = drawCast(t) || {}; drawPhone(t) }
        else Rs = drawCast(t) || {}
        if (t >= T.c2 && t < T.c3) drawCurtains(x, t, ease.inOutCubic(prog(t, ...T.curt)))
        drawOverlays(t, Rs)
      }
      // a quick dip to dark between the phone and the couch (11:40 PM)
      const dp = pulse(t, T.dip - 0.14, 0.3)
      if (dp > 0) { x.fillStyle = `rgba(4,2,12,${0.9 * dp})`; x.fillRect(0, 0, W, H) }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      bug.style.opacity = String(clamp(prog(t, 0.3, 0.6)) * (1 - prog(t, STORY_END - 0.25, STORY_END)))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 10.045 deal into the mirror, 24.489 flip into
// tonight's deck). The others stay inert: 4.4 (door → pom-poms), 18.8 (mirror → awards: the curtains), 32.7 (→ the lesson).
export const CUTS = [4.4, { t: T.c1, kind: 'deal' }, T.c2, { t: T.c3, kind: 'flip' }, 32.7]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are written in the D-major palette (the engine re-keys them into F);
//    chip / tom / clap cues ride a private 'sfx' bus.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const thump = (t, g = 0.22) => [['tom', r3(t), 70, { ...FX, gain: g, decay: 0.2 }], ['tick', r3(t), 0.05]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1, n = 14, gain = 0.07) => { const out = [['swell', r3(t0), r3(t1), { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', r3(t0 + 0.08 + k * ((t1 - t0) / n) + (k * 0.037) % 0.05), { ...FX, gain, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const stamp = t => [['tom', r3(t), 82, { ...FX, gain: 0.26, decay: 0.26 }], ['boom', r3(t), 0.07], ['clap', r3(t + 0.005), { ...FX, gain: 0.1 }]]
const shake = (t, n = 6) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.055), 7000, 0.05, { ...FX, wave: 'noise', gain: 0.022, decay: 0.04, sustain: 0.2 }])
const roll = (t0, t1) => { const out = []; for (let s = t0; s < t1; s += 0.045) out.push(['tom', r3(s), 150 + ((s * 100) % 3) * 6, { ...FX, gain: 0.07 + 0.08 * (s - t0) / (t1 - t0), decay: 0.06 }]); return out }
const PITCH = { [LEON]: 620, [HOST]: 600, [VIRN]: 880 }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · date night
  ...head(T.h0, 3, T.h0Land, 0),
  ...T.rattle.flatMap(r => thump(r, 0.18)),
  ['riser', 0.2, T.burst, 0.035],
  ['boom', T.burst, 0.3], ['whoosh', r3(T.burst + 0.02), 0.5, 0.09], ['glitter', T.burst, r3(T.burst + 0.6)], ...shake(r3(T.burst + 0.05), 8),
  ['tom', r3(T.run[1]), 90, { ...FX, gain: 0.2, decay: 0.2 }], ['pop', r3(T.run[1]), 880, 0.03, -0.3],
  ['pop', T.sweat, 1567.98, 0.012, 0.3], ['pop', 0.9, 1567.98, 0.012, -0.3],
  // 2 · pom-poms
  ['whoosh', T.s2, 0.35, 0.05],
  ...head(T.h1, 2, T.h1Land, 2),
  ...[TW.Y, TW.O, TW.U].flatMap((c, i) => [...stamp(r3(c)), ['pop', r3(c + 0.02), NOTE[2 + i * 2], 0.04, (i - 1) * 0.4], ...shake(r3(c), 4)]),
  ['pop', T.spell[0], 1174.66, 0.035, 0.3], ['whoosh', T.spell[0], 0.2, 0.03],
  ['tick', r3(T.l4 - 0.2), 0.04],
  ['boom', T.you, 0.2], ['glitter', T.you, r3(T.you + 0.7)], ...cheers(r3(T.you), r3(T.you + 0.9), 10, 0.06), ...shake(T.you, 10),
  ...sob(r3(T.you + 0.3), 1318.5, 3),
  // 3 · the mirror
  ...head(T.h2, 2, T.h2Land, 1),
  ['pop', r3(T.louder[0]), 523.25, 0.04, 0.4], ['boom', r3(T.louder[0]), 0.08],
  ['bell', r3(TW.catch), 1760, 0.04, 1.6, 0], ['glitter', r3(TW.catch), r3(TW.catch + 0.8)], ['pluck', r3(TW.catch + 0.05), 1174.66, 0.04, 0.8, 0],
  ...sob(r3(TW.catch + 0.3), 1318.5, 3),
  // 4 · the awards
  ['whoosh', T.curt[0], 0.5, 0.05], ...head(T.h3, 2, T.h3Land, 3),
  ...roll(T.drum[0] - 0.4, T.you2 - 0.04),
  ['boom', T.you2, 0.26], ['bell', r3(T.you2 + 0.3), 1760, 0.035, 1.4, 0], ...cheers(r3(T.you2), r3(T.you2 + 1.4), 16, 0.08),
  ['tom', r3(T.you2), 110, { ...FX, gain: 0.2, decay: 0.2 }],
  ...sob(r3(T.you2 + 0.4), 1318.5, 3), ...sob(r3(T.you2 + 1.0), 1174.7, 3),
  // 5 · tonight's deck
  ['whoosh', T.phone[0], 0.45, 0.05], ...head(T.h4, 1, T.h4Land, 3),
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]),
  ['tick', r3(T.flip[0] + 0.12), 0.05], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.flip[0] + 0.1), r3(T.flip[1] + 0.4)],
  ['bell', T.glow, 1567.98, 0.025, 1.2, 0.2],
  ['whoosh', r3(T.swipe - 0.02), 0.3, 0.07], ['pluck', r3(T.swipe + 0.05), 1174.66, 0.04, 0.6, 0.3], ...shake(r3(T.swipe + 0.05), 6),
  ['whoosh', T.exit[0], 0.3, 0.05],
  // 6 · 11:40 PM
  ['whoosh', T.spin[0], 0.5, 0.04], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.spin[0] + 0.06 + i * 0.065), 0.04]),
  ['pop', T.h5Land, 1174.66, 0.04, 0],
  ['tick', r3(T.back[1]), 0.03],
  ['tick', r3(T.wake), 0.06], ['pop', r3(T.wake), 1567.98, 0.03, 0.2],
  ...sob(r3(TW.fine + 0.4), 1318.5, 2),
  // 7 · the debrief
  ['boom', T.snack, 0.12], ['pop', T.snack, 1174.66, 0.05, 0.2], ['pop', r3(T.snack + 0.08), 1318.51, 0.04, 0.2], ['glitter', T.snack, r3(T.snack + 0.5)],
  ...head(T.h6, 1, T.h6Land, 4),
  ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.snack + 0.9 + i * 0.4), 0.025]),       // crunch
  // 8 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 9 · text your bestie
  ...wordPops(T.h7, 2, 0.08, 1, 0.022), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0],
  ['whoosh', T.blanket[0], 0.3, 0.04], ['glitter', T.blanket[1], r3(T.blanket[1] + 0.5)],
  ['tick', T.chip, 0.04], ['pop', r3(T.chip + 0.05), 1567.98, 0.025, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
