// st4mission (20 s vertical Align ad, Star Talk S4 EP 009: card first) · story 0–15.6, then the shared end card.
//   0.00–5.80  "Mission Control, | we have a *profile.*"  Generic consoles (no agency marks) slide up; five sign stars sit
//              at them. The big screen flickers on, "INCOMING…", and a blind profile card scans in: an aura veil, no
//              photo. The room gasps. Drop (2.82). THE STARS: "in Space City we launch the *card* first."
//   5.80–9.85  "Launch | *sequence.*"  The screen counts T-3, T-2, T-1 (the room leans in), and the card lifts off the
//              screen on a pixel flame and shoots up out of frame. The screen reads "CARD IN ORBIT".
//              THE STARS: "the face comes last. the person comes first."
//   9.95 cut → "Card first. | *Face* last."  The card drifts down into orbit over the room, glowing, a ring round it;
//              the stars cheer, heart-eyed. Out by 15.45; end card at 15.6.
// One canvas (sky + screen + card + consoles + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, LAV, MONO, pop01, outK, popOut, rgba, sparkles, floatHearts } from './kit.js'

export const EP = 9
export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GREEN = '#7dff8a', AMBER = '#ffb347'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.6, h0Out: [5.6, 5.78],
  desks: 0.25, crew: 0.5, screenOn: 0.85, scan: [1.9, 2.6], gasp: 2.45, open: 2.88, l1: 3.08,
  h1: 5.86, h1Land: 6.25, l2: 6.15, c3: 6.5, c2: 7.1, c1: 7.7, lift: 8.3, gone: 8.9, orbitTxt: 9.0,
  close: 9.8, h1Out: [9.66, 9.84],
  cut: 9.95, h2: 10.02, h2Land: 10.42, cardDown: [10.1, 11.0], cheer: 11.05, hearts: 11.6,
  h2Out: [15.1, 15.4], out: [15.0, 15.45],
}
const GHOST = { at: 12.3, x: 905, y: 1330, from: 'below', dur: 1.4 }    // rises over the front console's right end
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'in Space City we launch the *card* first.' },
  { t: T.l2, speaker: SPEAK, text: 'the face comes last. the person comes first.' },
]
const CPS = 30

// ── layout
const SCR = { x: 540, y: 830, w: 760, h: 520 }            // the big screen
const CARD_W = 270, CARD_F = { x: 540, y: 790, w: 330 }
const BACK_DESK = 1210, FRONT_DESK = 1360
const CREW = [
  { id: 'aries', x: 220, y: 1150, size: 150, row: 0, seed: 1 },
  { id: 'gemini', x: 540, y: 1145, size: 150, row: 0, seed: 2 },
  { id: 'scorpio', x: 860, y: 1150, size: 150, row: 0, seed: 3 },
  { id: 'cancer', x: 370, y: 1300, size: 175, row: 1, seed: 4 },
  { id: 'capricorn', x: 710, y: 1300, size: 175, row: 1, seed: 5 },
]
const LOW = 210
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function crewState(t, i) {
  const lookScr = [((540 - CREW[i].x) / 400), -1]
  if (t < T.gasp) return { mood: 'neutral', look: lookScr }
  if (t < T.l1 + 0.8) return { mood: 'wide', look: lookScr, blink: false }
  if (t < T.c3) return { mood: 'happy' }
  if (t < T.lift) return { mood: 'squint', look: lookScr, blink: false }        // leaning in on the countdown
  if (t < T.cut) return { mood: 'wide', look: [0, -1], blink: false }            // watching it go up
  if (t < T.hearts + i * 0.12) return { mood: 'sparkle', look: [((540 - CREW[i].x) / 500), -1] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [faceIm] = await Promise.all([loadImg('card-profile-5.png')])
  const FACE = bake(faceIm, 420), FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Mission Control, | we have a *profile.*', { top: 200, size: 96, accentSize: 150, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GREEN, fit: true })
  const H1 = popText(root, 'Launch | *sequence.*', { top: 200, size: 124, accentSize: 186, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: AMBER })
  const H2 = popText(root, 'Card first. | *Face* last.', { top: 200, size: 128, accentSize: 190, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawImg(img, bodyFrac, wBody) { if (!img) return; const w = wBody / bodyFrac, h = w * img.height / img.width; x.drawImage(img, -w / 2, -h / 2, w, h) }
  function label(text, cx, cy, size, col, a = 1, align = 'center') {
    x.save(); x.globalAlpha *= a; x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.letterSpacing = '0.08em'
    x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
  }

  // ── the big screen
  function drawScreen(t, ok) {
    const k = easeOutBack(prog(t, T.desks, T.desks + 0.5), 1.4) * ok
    if (k <= 0.01 || t >= T.cut) return
    const S = SCR, on = t < T.screenOn ? 0 : t < T.screenOn + 0.06 ? 1 : t < T.screenOn + 0.12 ? 0.2 : 1
    x.save(); x.translate(S.x, S.y); x.scale(k, k)
    // mounts
    x.fillStyle = INK; x.fillRect(-S.w / 2 + 60, -S.h / 2 - 140, 14, 140); x.fillRect(S.w / 2 - 74, -S.h / 2 - 140, 14, 140)
    // bezel
    x.fillStyle = INK; x.fillRect(-S.w / 2 - 16, -S.h / 2 - 16, S.w + 32, S.h + 32)
    x.fillStyle = '#3a2a6e'; x.fillRect(-S.w / 2 - 8, -S.h / 2 - 8, S.w + 16, S.h + 16)
    x.fillStyle = '#071510'; x.fillRect(-S.w / 2, -S.h / 2, S.w, S.h)
    if (on > 0) {
      x.save(); x.globalAlpha *= on; x.beginPath(); x.rect(-S.w / 2, -S.h / 2, S.w, S.h); x.clip()
      // grid
      x.fillStyle = 'rgba(125,255,138,0.08)'
      for (let gx2 = -S.w / 2; gx2 < S.w / 2; gx2 += 40) x.fillRect(gx2, -S.h / 2, 2, S.h)
      for (let gy = -S.h / 2; gy < S.h / 2; gy += 40) x.fillRect(-S.w / 2, gy, S.w, 2)
      // header bar
      x.fillStyle = 'rgba(125,255,138,0.16)'; x.fillRect(-S.w / 2, -S.h / 2, S.w, 54)
      const head = t < T.scan[0] ? (Math.floor(t * 3) % 2 ? 'INCOMING…' : 'INCOMING') : t < T.c3 ? 'PROFILE · NO PHOTO' : t < T.lift ? 'LAUNCH SEQUENCE' : 'CARD IN ORBIT ✓'
      label(head, -S.w / 2 + 24, -S.h / 2 + 28, 28, GREEN, 1, 'left')
      label('CH 09', S.w / 2 - 24, -S.h / 2 + 28, 24, 'rgba(125,255,138,0.6)', 1, 'right')
      // the card on screen, scanned in top → bottom, then lifting off
      if (t > T.scan[0]) {
        const sp = prog(t, ...T.scan), lift = ease.inCubic(prog(t, T.lift, T.gone))
        const cy = 30 - lift * 900, shake = t > T.c1 && t < T.lift ? Math.sin(t * 70) * 3 : 0
        x.save(); x.translate(shake, cy); x.rotate(t > T.lift ? 0 : -0.02)
        x.save(); x.beginPath(); x.rect(-300, -260, 600, 520 * sp); x.clip(); drawImg(FACE, FACE_BODY, CARD_W); x.restore()
        if (sp > 0 && sp < 1) { x.fillStyle = GREEN; x.fillRect(-CARD_W / 2 - 20, -260 + 520 * sp - 3, CARD_W + 40, 6) }
        // pixel flame under the card once it lifts
        if (t > T.lift - 0.15) {
          const fl = 1 + 0.25 * Math.sin(t * 40)
          for (let i = 0; i < 6; i++) {
            const fx = -90 + i * 36, fh = (60 + (i % 2) * 40) * fl * clamp((t - T.lift + 0.15) / 0.2)
            x.fillStyle = AMBER; x.fillRect(fx, 215, 26, fh)
            x.fillStyle = '#fff3c4'; x.fillRect(fx + 6, 215, 14, fh * 0.5)
          }
        }
        x.restore()
      }
      // the countdown
      const cd = t >= T.c1 ? 'T-1' : t >= T.c2 ? 'T-2' : t >= T.c3 ? 'T-3' : null
      if (cd && t < T.lift) {
        const at = t >= T.c1 ? T.c1 : t >= T.c2 ? T.c2 : T.c3, pk = easeOutBack(prog(t, at, at + 0.25), 2.4)
        x.save(); x.translate(S.w / 2 - 110, S.h / 2 - 80); x.scale(pk, pk)
        x.fillStyle = 'rgba(7,21,16,0.85)'; x.fillRect(-90, -50, 180, 100); x.strokeStyle = AMBER; x.lineWidth = 4; x.strokeRect(-90, -50, 180, 100)
        label(cd, 0, 2, 52, AMBER); x.restore()
      }
      if (t > T.orbitTxt) label('THE PERSON FIRST', 0, 40, 40, GREEN, clamp((t - T.orbitTxt) / 0.2) * (Math.floor(t * 2.5) % 2 ? 1 : 0.6))
      // scanlines
      x.fillStyle = 'rgba(0,0,0,0.18)'; for (let sy = -S.h / 2; sy < S.h / 2; sy += 6) x.fillRect(-S.w / 2, sy, S.w, 2)
      x.restore()
    }
    x.restore()
  }
  // the card after it flew out of the screen: shoots up past the top (beat 2), then floats down into orbit (beat 3)
  function drawFlyingCard(t, ok, dy) {
    let cx, cy, w, rot = 0
    if (t < T.cut) {
      if (t < T.gone) return
      const p = ease.inCubic(prog(t, T.gone, T.gone + 0.35))
      if (p >= 1) return
      cx = SCR.x; cy = SCR.y - 450 - p * 900; w = CARD_W
    } else {
      const p = ease.outCubic(prog(t, ...T.cardDown))
      cx = CARD_F.x; cy = lerp(-500, CARD_F.y + dy, p) + Math.sin(t * 1.7) * 10; w = CARD_F.w * ok; rot = 0.04 * Math.sin(t * 1.2)
      // orbit ring + halo
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, 460); g.addColorStop(0, rgba(LAV, 0.34 * p * ok)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.fillRect(cx - 460, cy - 460, 920, 920)
    }
    if (t > T.cut) {
      const p = prog(t, ...T.cardDown)
      x.save(); x.globalAlpha = 0.5 * p * ok; x.translate(cx, cy); x.scale(1, 0.26)
      for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2 + t * 0.8; if (Math.sin(a) >= 0) continue; x.fillStyle = BONE; x.fillRect(Math.cos(a) * 330 - 5, Math.sin(a) * 330 - 5, 10, 10) }
      x.restore()
    }
    x.save(); x.translate(cx, cy); x.rotate(rot); drawImg(FACE, FACE_BODY, w); x.restore()
    if (t > T.cut) {
      const p = prog(t, ...T.cardDown)
      x.save(); x.globalAlpha = p * ok; x.translate(cx, cy); x.scale(1, 0.26)
      for (let i = 0; i < 48; i++) {
        const a = i / 48 * Math.PI * 2 + t * 0.8, back = Math.sin(a) < 0
        if (back) continue
        x.fillStyle = i % 4 === 0 ? GOLD : BONE; x.fillRect(Math.cos(a) * 330 - 6, Math.sin(a) * 330 - 6, 12, 12)
      }
      drawPixelStar(x, Math.cos(t * 0.8 + 1) * 330, Math.sin(t * 0.8 + 1) * 330, 36, 1, GOLD, '#fff6e6')
      x.restore()
    }
  }
  function drawDesk(y, ok, t) {
    const k = ease.outCubic(prog(t, T.desks, T.desks + 0.5))
    const yy = y + (1 - k) * 500
    x.save(); x.globalAlpha *= ok
    x.fillStyle = INK; x.fillRect(30, yy - 6, 1020, 112)
    x.fillStyle = '#2b2160'; x.fillRect(36, yy, 1008, 100)
    x.fillStyle = '#3d2c78'; x.fillRect(36, yy, 1008, 14)
    // little monitors + buttons along the desk
    for (let i = 0; i < 7; i++) {
      const mx = 70 + i * 145
      x.fillStyle = INK; x.fillRect(mx - 4, yy + 26, 108, 60)
      x.fillStyle = '#071510'; x.fillRect(mx, yy + 30, 100, 52)
      x.fillStyle = i % 3 === 0 ? AMBER : GREEN
      for (let r = 0; r < 3; r++) x.fillRect(mx + 8, yy + 38 + r * 14, 30 + ((i * 7 + r * 13 + Math.floor(t * 3)) % 50), 5)
      const blink = (Math.floor(t * 2 + i) % 3) === 0
      x.fillStyle = blink ? PINK : '#5a3a6e'; x.fillRect(mx + 84, yy + 66, 10, 10)
    }
    x.restore()
  }
  function drawCrew(t, row, ok, dy) {
    CREW.forEach((c, i) => {
      if (c.row !== row) return
      const p = pop01(t, T.crew + i * 0.08, 0.32, 2.2) * ok
      if (p <= 0.02) return
      const st = signStar(c.id), lean = t > T.c3 && t < T.lift ? -0.06 : 0
      drawStarChar(x, c.x, c.y + dy, c.size, t, { color: st.color, glyph: st.glyph, ...crewState(t, i), pop: p, seed: c.seed, glow: 0.8, squash: lean, hops: [T.gasp, T.lift + 0.05 + i * 0.05, T.cheer + i * 0.1, T.cheer + 0.45 + i * 0.1, T.h2Land + i * 0.06] })
      // a tiny headset
      const s = c.size * p, hx = c.x, hy = c.y + dy - s * 0.02
      x.fillStyle = INK; x.fillRect(hx - s * 0.36, hy - 4, s * 0.1, s * 0.18); x.fillRect(hx - s * 0.34, hy + s * 0.12, s * 0.22, 5)
      x.fillStyle = '#ff4fd8'; x.fillRect(hx - s * 0.34, hy, s * 0.06, s * 0.1)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        drawScreen(t, ok)
        drawFlyingCard(t, ok, dy)
        drawCrew(t, 0, ok, dy)
        drawDesk(BACK_DESK + dy, ok, t)
        drawCrew(t, 1, ok, dy)
        drawDesk(FRONT_DESK + dy, ok, t)
        drawGhostCameo(x, t, { ...GHOST, y: GHOST.y + dy })
        sparkles(x, t, SCR.x, SCR.y, T.scan[1] - 0.1, 12, 300, 1, [GREEN, BONE, GOLD])
        sparkles(x, t, CARD_F.x, CARD_F.y + dy, T.cardDown[1] - 0.1, 14, 300, 2)
        if (t > T.cheer) for (let i = 0; i < 18; i++) {           // confetti stars
          const born = T.cheer + (i % 6) * 0.12, p = (t - born) / 2.4
          if (p < 0 || p > 1) continue
          drawPixelStar(x, 100 + ((i * 263) % 880) + Math.sin(p * 6 + i) * 30, 560 + p * 700, 22, i % 3, [GOLD, PINK, GREEN, BONE][i % 4])
        }
        if (t > T.hearts) floatHearts(x, t, 540, 1150 + dy, T.hearts, T.out[0] - 0.4, 1, 6, 600)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.84 (inert: H0 → H1 while the box talks) and 9.95 (box shut → "Card first. Face last.").
const CUTS = [5.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.desks, 0.5, 0.03], ...CREW.map((c, i) => ['pop', +(T.crew + i * 0.08 + 0.04).toFixed(3), NOTE[i + 1], 0.02, (c.x - 540) / 600]),
  ['tick', T.screenOn, 0.05], ['tick', T.screenOn + 0.12, 0.04], ['bell', T.screenOn + 0.2, 1567.98, 0.02, 0.8, 0],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.scan[0] + i * 0.12).toFixed(3), 0.02]), ['bell', T.scan[1], 1318.51, 0.035, 1.2, 0],
  ['pop', T.gasp, 440, 0.035, 0],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAK]: 880 } }),
  ...wordPops(T.h1, 1, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['pop', T.c3, 659.25, 0.045, 0], ['pop', T.c2, 659.25, 0.045, 0], ['pop', T.c1, 659.25, 0.05, 0],
  ['boom', T.lift, 0.16], ['whoosh', T.lift, 0.8, 0.05], ['glitter', T.gone, T.gone + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pop', T.h2Land + 0.14, 1174.66, 0.05, 0],
  ['whoosh', T.cardDown[0], 0.6, 0.03], ['bell', T.cardDown[1], 1318.51, 0.04, 1.4, 0], ['glitter', T.cardDown[1] - 0.1, T.cardDown[1] + 0.5],
  ['glitter', T.cheer, T.cheer + 0.8], ['pluck', T.hearts, 1318.51, 0.035, 0.5, 0], ['bell', T.hearts + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
