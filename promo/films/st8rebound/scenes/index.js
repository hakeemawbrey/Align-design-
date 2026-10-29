// st8rebound (30 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E18 · rom-com montage) · story 0–25.6, then
// the shared end card.
//   "Ophiuchus is in love. | It’s been *two days.*"  A pop-song montage in polaroid frames, a shot every ~1.6 s with a
//   handwritten caption and a ♪ lyric subtitle: Ophiuchus (season 5) and the Meteor's cousin, a love-bomber just like the
//   Meteor from E04. Then the record scratch, the freeze-frame and "yep, that's me." The Moon brings tea.
//   0.00–3.00  frame 0: Ophiuchus heart-eyed beside the cousin streaking across a pink sky. "day 1, 9:02 a.m."
//   3.00–4.60  the picnic on a cloud, matching heart shades (3.4: the ghost rises from behind the picnic basket)
//   4.60–6.20  the cousin skywrites a heart in flame
//   6.20–7.80  day 2: a shared playlist, 412 songs
//   7.80–9.40  day 2: meeting the cousin's parents (two little meteors; on the wall, a framed photo of the Meteor, E04)
//   9.40       RECORD SCRATCH. Freeze-frame, sepia, "yep, that's me." OPHIUCHUS: "yep, that's me. two days in…"
//  12.40       unfreeze: the polaroid slides away, the Moon floats in with tea. MOON: "tea? you *just* got out of…"
//  13.60       the hidden comet crosses the top of the sky
//  15.00–17.6  the cousin streaks by in the back, waves ("had fun! bye!") and burns down to a pebble with a puff (meteors
//              burn out: real, E04). OPHIUCHUS (gasp zoom): "…oh. the cousin is *also* a meteor."
//  19.40       MOON: "heal first. love will still be there *after.*"
//  21.60–25.6  the polaroid frame comes back round the same pose as frame 0, now heart-eyed at a cup of tea: "day 3: tea.
//              just tea."  Last line: "Heal, *then* date."
// One canvas (sky + polaroid world + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { OPH, drawOphiuchus, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { METEOR, drawMeteor, drawComet, drawPhone, drawDayChip, hookCard, hookCues, stingerCues } from '../../st8cast.js'
import { clamp, lerp, prog, ease, easeOutBack, popOut, r3, BMP, bits, pixFont, burst, wordPops, drawMoonChar, MOON, GOLD, BONE, INK, PINK, SERIF } from './kit.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const ROSE = '#ff6fa8'

// ── the timeline
const T = {
  shots: [0, 3.0, 4.6, 6.2, 7.8], freeze: 9.4, unfreeze: 12.4, moonIn: 12.5,
  l1: 9.95, l2: 13.3, l3: 16.6, l4: 19.4, open: 9.75, close: 23.0,
  hookOut: [2.7, 2.95], ghost: 3.4, comet: 13.6,
  cousin: [15.0, 17.6], burn: [15.9, 17.5], bye: 16.1, gasp: 16.55,
  rhyme: 21.6, last: 21.75, lastLand: 22.2, out: [25.1, 25.5],
}
const OPHN = OPH.tag, MOONN = MOON.tag
const LINES = [
  { t: T.l1, speaker: OPHN, text: 'yep, that’s me. two days in. *already* naming our cats.', color: OPH.tagColor },
  { t: T.l2, speaker: MOONN, text: 'tea? you *just* got out of the Meteor thing.', color: MOON.color },
  { t: T.l3, speaker: OPHN, text: '…oh. the cousin is *also* a meteor.', color: OPH.tagColor },
  { t: T.l4, speaker: MOONN, text: 'heal first. love will still be there *after.*', color: MOON.color },
]
const CPS = 28
export const GHOST = { at: T.ghost, x: 760, y: 1128, where: 'rising from behind the picnic basket on the cloud (montage shot 2)' }
export const COMET = { at: T.comet, where: 'tiny, across the top of the pink sky as the Moon floats in' }

const CAPTIONS = ['day 1, 9:02 a.m.', 'day 1, noon', 'day 1, sunset', 'day 2: our playlist', 'day 2: meet the parents']
const LYRICS = ['♪ two days in and i’m sure ♪', '♪ two days in and i’m sure ♪', '♪ you burn so bright for me ♪', '♪ you burn so bright for me ♪', '♪ forever starts on tuesday ♪']
const shotAt = t => { let i = 0; for (let k = 0; k < T.shots.length; k++) if (t >= T.shots[k]) i = k; return i }

// ── pixel props
const SHADES = BMP(`
HHH.HHH
HWHHHWH
HHH.HHH
.H...H.`)
const SHADES_C = { H: '#ff3d7a', W: '#ffd1de' }
const HEART = BMP('.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...')
const BASKET = BMP(`
..hhhhhhhh..
.h........h.
h..........h
bbbbbbbbbbbb
bBbBbBbBbBbB
bbbbbbbbbbbb
bBbBbBbBbBbB
.bbbbbbbbbb.`)
const BASKET_C = { h: '#8a5a2a', b: '#b07a3a', B: '#d49a52' }
const CUP = BMP(`
.s.s.s..
..s.s...
wwwwww..
wTTTTwww
wTTTTw.w
wTTTTwww
.wwww...
wwwwwww.`)
const CUP_C = { w: '#fff7e6', T: '#c98a4a', s: 'rgba(255,255,255,0.6)' }

// ── poses
function ophState(t) {
  if (t < T.freeze) return { mood: 'heart', snake: 'heart' }
  if (t < T.unfreeze) return { mood: 'heart', snake: 'heart', blink: false }
  if (t < T.l2 + 1.2) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.gasp) return { mood: 'neutral', look: [1, -1], snake: 'neutral' }
  if (t < T.l4) return { mood: 'wide', look: [1, -1], blink: false, snake: 'wide' }
  if (t < T.rhyme) return { mood: 'neutral', look: [1, 0], snake: 'sleepy' }
  return { mood: 'heart', look: [1, 0], snake: 'heart' }
}
function moonState(t) {
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.l3) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l4) return { mood: 'wide', look: [-1, 0] }
  return { mood: 'happy' }
}
const OPH_HOPS = [...talkHops(LINES, OPHN, { cps: CPS }), T.gasp, T.lastLand]
const MOON_HOPS = [T.moonIn + 0.4, ...talkHops(LINES, MOONN, { cps: CPS })]

// the polaroid: an inner photo window + a white frame with a caption strip
const PH = { x0: 110, x1: 970, y0: 560, y1: 1380 }
const polaroidK = t => t < T.unfreeze ? 1 : t < T.rhyme ? 1 - ease.inCubic(prog(t, T.unfreeze, T.unfreeze + 0.45)) : ease.outCubic(prog(t, T.rhyme, T.rhyme + 0.45))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Ophiuchus is in love. | It’s been *two days.*', at: 0, out: T.hookOut[0], size: 96, accentSize: 156, top: 170, accentColor: ROSE })
  const LAST = popText(root, 'Heal, *then* | date.', { top: 200, size: 132, accentSize: 200, at: T.last, gap: 0.1, accentColor: ROSE, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const box = dialogueBox(root, { lines: LINES, y: 1575, width: 960, height: 240, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function pinkSky(t, k = 1) {
    drawSky(x, t, SKY_H)
    x.save(); x.globalCompositeOperation = 'soft-light'; x.globalAlpha = 1 * k
    const g = x.createLinearGradient(0, 400, 0, 1500); g.addColorStop(0, '#ff7ab8'); g.addColorStop(1, '#ffd08a')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    x.globalCompositeOperation = 'screen'; x.globalAlpha = 0.18 * k; x.fillStyle = '#ff8fc0'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }
  function flare(t, cx, cy) {
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 4; i++) {
      const d = (i - 1.5) * 140 + Math.sin(t * 0.7) * 30
      x.fillStyle = `rgba(255,${200 + i * 10},220,${0.08 + 0.03 * i})`
      x.beginPath(); x.arc(cx + d, cy + d * 0.6, 26 + i * 16, 0, Math.PI * 2); x.fill()
    }
    x.restore()
  }
  function cousin(t, cx, cy, size, o = {}) {
    const r = drawMeteor(x, cx, cy, size, t, { mood: 'heart', exPin: true, ...o })
    return r
  }
  function oph(t, cx, cy, size, extra = {}) {
    return drawOphiuchus(x, cx, cy, size, t, { ...ophState(t), hops: OPH_HOPS, ...extra })
  }
  // ── the five montage shots (each drawn at tf: frozen after the scratch)
  function shot(i, tf) {
    pinkSky(tf)
    x.save(); x.translate(0, 50)
    shotBody(i, tf)
    x.restore()
  }
  function shotBody(i, tf) {
    if (i === 0) {
      const p = prog(tf, 0, 3.0)
      const r = oph(tf, 380, 1010, 290)
      cousin(tf, lerp(700, 860, p), lerp(900, 780, p), 120, { dir: -0.55 })
      for (let k = 0; k < 4; k++) { const q = ((tf * 0.6 + k / 4) % 1); bits(x, HEART, r.x - 60 + k * 50, r.top - q * 160, 5, { X: ROSE }, { a: Math.sin(Math.PI * q) }) }
      flare(tf, 800, 700)
    } else if (i === 1) {
      cloud(540, 1180, 1.25)
      bits(x, BASKET, 760, 1160, 8, BASKET_C)
      drawGhostCameo(x, tf, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.2, from: 'below', cell: 3 })
      const r = oph(tf, 380, 1020, 250)
      bits(x, SHADES, r.x, r.y + 4, 10, SHADES_C)
      const m = cousin(tf, 610, 1000, 100, { dir: 2.6, trail: 90 })
      bits(x, SHADES, m.x, m.y - 4, 5, SHADES_C)
    } else if (i === 2) {
      // skywriting: the flame heart draws itself
      const p = clamp(prog(tf, T.shots[2], T.shots[3] - 0.2))
      const H = u => { const a = u * Math.PI * 2; return [540 + 230 * Math.pow(Math.sin(a), 3), 820 - 14 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))] }
      for (let k = 0; k < 90 * p; k++) { const [hx, hy] = H(k / 90); x.fillStyle = k % 2 ? '#ffb36a' : ROSE; x.fillRect(hx - 7, hy - 7, 14, 14) }
      const [cx, cy] = H(p)
      cousin(tf, cx, cy, 80, { trail: 70 })
      oph(tf, 300, 1180, 230)
    } else if (i === 3) {
      const r = oph(tf, 330, 1060, 250)
      drawPhone(x, 660, 1010, 300, tf, { text: '412 songs ♥', lit: 1 })
      void r
      cousin(tf, 840, 1180, 70, { dir: 2.4, trail: 60 })
    } else {
      // the parents: two little meteors; the framed photo of the cousin's cousin (the Meteor, E04) on the wall
      x.fillStyle = '#3a2440'; x.fillRect(PH.x0, PH.y0, PH.x1 - PH.x0, 360)
      x.fillStyle = INK; x.fillRect(470, 620, 140, 120); x.fillStyle = '#e8c27a'; x.fillRect(478, 628, 124, 104)
      x.fillStyle = '#1a1030'; x.fillRect(488, 638, 104, 64)
      drawMeteor(x, 530, 676, 30, tf, { exPin: false, aura: false, trail: 40 })
      pixFont(x, 'COUSIN ✦', 540, 716, 14, INK, { shadow: null })
      drawMeteor(x, 640, 1040, 90, tf, { mood: 'happy', exPin: false, aura: false, dir: 2.2, trail: 50 })
      drawMeteor(x, 830, 1060, 84, tf, { mood: 'squint', exPin: false, aura: false, dir: 2.2, trail: 50, seed: 4 })
      oph(tf, 330, 1080, 250, { mood: 'squint', snake: 'wide' })
    }
  }
  function cloud(cx, cy, s) {
    x.save(); x.translate(cx, cy); x.scale(s, s)
    x.fillStyle = INK
    for (const [a, b, r] of [[-200, 10, 70], [-90, -30, 90], [40, -20, 96], [170, 10, 74], [0, 30, 100]]) { x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill() }
    x.fillStyle = '#fff2f6'
    for (const [a, b, r] of [[-200, 10, 70], [-90, -30, 90], [40, -20, 96], [170, 10, 74], [0, 30, 100]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
    for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#ff6fa8' : '#fff2f6'; x.fillRect(-180 + i * 30, -60 + j * 26, 30, 26) }
    x.restore()
  }
  function polaroid(t, k, caption, rot) {
    if (k <= 0) return
    // a white frame round the photo window, thick at the bottom with the caption
    const s = lerp(1.25, 1, k)
    x.save(); x.translate(540, 940); x.rotate(rot); x.scale(s, s); x.translate(-540, -940); x.globalAlpha = k
    x.fillStyle = '#fbf6ee'
    x.fillRect(PH.x0 - 30, PH.y0 - 30, PH.x1 - PH.x0 + 60, 30)
    x.fillRect(PH.x0 - 30, PH.y1, PH.x1 - PH.x0 + 60, 120)
    x.fillRect(PH.x0 - 30, PH.y0, 30, PH.y1 - PH.y0); x.fillRect(PH.x1, PH.y0, 30, PH.y1 - PH.y0)
    x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(PH.x0 - 33, PH.y0 - 33, PH.x1 - PH.x0 + 66, PH.y1 - PH.y0 + 156)
    pixFont(x, caption, 540, PH.y1 + 62, 56, '#3a2440', { font: SERIF, weight: 500, italic: true, shadow: null })
    x.restore()
  }
  // the photo window's outside (the "page" the polaroids sit on)
  function mask(k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k; x.fillStyle = '#1a0f22'
    x.fillRect(0, 0, 1080, PH.y0); x.fillRect(0, PH.y1, 1080, 1920 - PH.y1); x.fillRect(0, 0, PH.x0, 1920); x.fillRect(PH.x1, 0, 1080 - PH.x1, 1920)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const pk = polaroidK(t)
      if (t < T.unfreeze) {
        const tf = Math.min(t, T.freeze), i = shotAt(tf)
        shot(i, tf)
        // the cut flash between shots
        const ct = T.shots.filter(a => a > 0 && a <= t).pop()
        if (ct !== undefined && t - ct < 0.12 && t < T.freeze) { x.fillStyle = `rgba(255,240,250,${0.8 * (1 - (t - ct) / 0.12)})`; x.fillRect(0, 0, 1080, 1920) }
        if (t >= T.freeze) {
          // freeze-frame: sepia + the scrawled caption with an arrow
          x.save(); x.globalCompositeOperation = 'saturation'; x.fillStyle = '#808080'; x.globalAlpha = 0.8; x.fillRect(0, 0, 1080, 1920); x.restore()
          x.save(); x.globalCompositeOperation = 'multiply'; x.fillStyle = '#e8c9a0'; x.fillRect(0, 0, 1080, 1920); x.restore()
          x.fillStyle = 'rgba(255,255,255,' + (0.9 * (1 - prog(t, T.freeze, T.freeze + 0.15))) + ')'; x.fillRect(0, 0, 1080, 1920)
          const ck = easeOutBack(prog(t, T.freeze + 0.25, T.freeze + 0.55), 2)
          x.save(); x.translate(560, 760); x.rotate(-0.08); x.scale(ck, ck)
          pixFont(x, 'yep, that’s me.', 0, 0, 84, '#fff7e6', { font: SERIF, weight: 500, italic: true, shadow: 'rgba(40,10,30,0.8)' })
          x.strokeStyle = '#fff7e6'; x.lineWidth = 8; x.beginPath(); x.moveTo(-150, 60); x.quadraticCurveTo(-240, 120, -220, 200); x.stroke()
          x.beginPath(); x.moveTo(-246, 170); x.lineTo(-220, 205); x.lineTo(-190, 176); x.stroke()
          x.restore()
        }
        mask(1)
        polaroid(t, 1, CAPTIONS[i], [-0.02, 0.015, -0.01, 0.02, -0.015][i])
        if (t < T.freeze) {
          const ls = LYRICS[i]
          const lk = 1 + 0.06 * Math.exp(-(t - T.shots[i]) * 8)
          x.save(); x.translate(540, 1690); x.scale(lk, lk)
          pixFont(x, ls, 0, 0, 62, ROSE, { font: SERIF, weight: 500, italic: true, shadow: 'rgba(40,10,30,0.85)' })
          pixFont(x, 'NOW PLAYING · “u (2 days)”', 0, 76, 26, BONE, { alpha: 0.75 })
          x.restore()
        }
      } else {
        // the open scene: the Moon, tea, the cousin burning out in the back
        const z = gaspZoom(t, { at: T.gasp, dur: 1.4, x: 330, y: 1060, amount: 0.3, follow: 0.6 })
        x.save(); z.apply(x)
        pinkSky(t, 1 - 0.5 * prog(t, T.unfreeze, T.unfreeze + 1))
        drawSeedConstellation(x, t, 100, { alpha: 0.55 })
        if (t > T.comet && t < T.comet + 1.5) { const p = prog(t, T.comet, T.comet + 1.5); drawComet(x, lerp(1060, 80, p), lerp(560, 640, p), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [1, 0.1] }) }
        const cp = prog(t, ...T.cousin)
        if (cp > 0 && cp < 1) {
          const burn = ease.inQuad(prog(t, ...T.burn))
          const r = drawMeteor(x, lerp(-60, 860, ease.outCubic(cp)), lerp(560, 760, cp), 110, t, { mood: 'happy', dir: -0.25, burn, exPin: burn < 0.5, aura: burn < 0.5 })
          if (t > T.bye && t < T.burn[1] - 0.2) {
            const bk = easeOutBack(prog(t, T.bye, T.bye + 0.25), 2)
            x.save(); x.translate(r.x + 30, r.top - 50); x.scale(bk, bk)
            x.fillStyle = INK; x.fillRect(-126, -34, 252, 68); x.fillStyle = '#fff7e6'; x.fillRect(-118, -26, 236, 52)
            pixFont(x, 'had fun! bye!', 0, 2, 28, INK, { shadow: null }); x.restore()
          }
        }
        const r = oph(t, 330, 1060, 290)
        const mk = easeOutBack(prog(t, T.moonIn, T.moonIn + 0.5), 1.6)
        const m = drawMoonChar(x, lerp(1200, 790, ease.outCubic(prog(t, T.moonIn, T.moonIn + 0.6))), 930, 135, t, { ...moonState(t), pop: mk, hops: MOON_HOPS })
        // the teacup: held out by the Moon, then floated over to Ophiuchus at the end
        const hand = prog(t, T.l4 + 1.4, T.rhyme)
        const cx = lerp(m.x - 150, r.x + 150, ease.inOutCubic(hand)), cy = lerp(m.y + 120, r.y + 40, ease.inOutCubic(hand)) - Math.sin(Math.PI * hand) * 80
        if (mk > 0.5) bits(x, CUP, cx, cy, 9, CUP_C)
        if (t >= T.rhyme) for (let k = 0; k < 4; k++) { const q = ((t * 0.6 + k / 4) % 1); bits(x, HEART, r.x - 60 + k * 50, r.top - q * 160, 5, { X: ROSE }, { a: Math.sin(Math.PI * q) * clamp(ok) }) }
        x.restore()
        drawGaspLines(x, t, { at: T.gasp, dur: 1.4, x: 330, y: 1060, follow: 0.6, color: OPH.teal })
        mask(pk)
        polaroid(t, pk, t >= T.rhyme ? 'day 3: tea. just tea.' : CAPTIONS[4], -0.02)
        // fade to plain sky at the end
        if (ok < 1) { x.save(); x.globalAlpha = 1 - clamp(ok); drawSky(x, t, SKY_H); drawSeedConstellation(x, t, 100, { alpha: 0.55 }); x.restore() }
      }
      if (t < T.unfreeze) { x.save(); x.globalAlpha = 0.55; drawSeedConstellation(x, t, 100, { alpha: 0.55 }); x.restore() }
      drawDayChip(x, t, { day: 30, phase: 'morning' })
      hook.update(t)
      box.update(t)
      LAST.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 12.4 (unfreeze → the Moon), 21.6 (the polaroid comes back). cardfx keeps the second.
const CUTS = [{ t: 12.35, kind: 'flip' }, { t: 21.55, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E18' }), cardCuts(CUTS)]

export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...T.shots.slice(1).flatMap(a => [['whoosh', r3(a - 0.08), 0.25, 0.04], ['tick', a, 0.06], ['pop', r3(a + 0.02), 1318.51, 0.03, 0]]),
  ['tick', T.ghost + 0.05, 0.015],
  ['glitter', T.shots[2], T.shots[3] - 0.2],
  ['tapeStop', T.freeze - 0.25, 0.3], ['whoosh', T.freeze - 0.2, 0.25, 0.06], ['tick', T.freeze, 0.14], ['tick', T.freeze + 0.06, 0.1],
  ['pop', T.freeze + 0.3, 1174.66, 0.04, 0],
  ['pop', T.open, 739.99, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [OPHN]: 1046.5, [MOONN]: 660 } }),
  ['whoosh', T.unfreeze - 0.05, 0.4, 0.035], ['bell', T.moonIn + 0.3, 1567.98, 0.03, 1.4, 0],
  ['glitter', T.comet, T.comet + 0.6],
  ['whoosh', T.cousin[0], 0.7, 0.04], ['pop', T.bye, 1318.51, 0.035, 0.4], ['whoosh', T.burn[1] - 0.2, 0.3, 0.03], ['tick', T.burn[1] - 0.1, 0.05],
  ...gaspCues(T.gasp, { key: KEY }),
  ...stingerCues(T.rhyme, { key: KEY, kind: 'sitcom' }),
  ...wordPops(T.last, 1, 0.1, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['pop', T.lastLand + 0.1, 1567.98, 0.04, 0], ['bell', T.lastLand + 0.15, 1760, 0.025, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void burst; void lerp; void GOLD; void BONE; void PINK; void METEOR
