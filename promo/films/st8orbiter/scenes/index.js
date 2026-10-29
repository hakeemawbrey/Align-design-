// st8orbiter (25 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E03: nature documentary) · story 0–20.6, then the end card.
//   Hook (frame 0): "The orbiter, in its | natural *habitat.*"  The Orbiter circling Scorpio's phone (a story on screen),
//   its red "viewed" light blinking. Documentary chrome: soft letterbox, a PLANET ZODIAC bug, a whisper narrator box.
//   2.5   lower third: "THE ORBITER · *Satellitus lurkus*"
//   2.8   THE STARS (narrator, whispering): "here, the orbiter circles its subject. *silently.*"
//   6.6   punch-in on the blinking light; the field-notes card: DIET your stories · CALLS none · RANGE always nearby.
//         NARRATOR: "it watches every story. it never *texts.*"
//   11.6  Scorpio slides in, squints. NARRATOR: "but the Scorpio has a *mute* button."  14.4: tap. MUTED.
//   14.6  the light goes out; the orbiter drifts off into the dark (it waves a panel). NARRATOR: "and so, the orbiter
//         drifts off. *peacefully.*"
//   17.7  frame 0's framing again, without the orbiter: Scorpio relaxed by the phone. "Watching isn’t *wanting.*"
//   Hidden comet: crosses the top of the frame at 5.0. Ghost: leans out from behind the phone's left edge at 9.8.
//   Rewatch bait: the story's "Seen by" line reads "🛰 + 0 others" until the mute, then "4 friends".
// One canvas, DOM type (hook, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawBits } from '../../st5cast.js'
import { drawSatellite, drawComet, drawDayChip, hookCard, hookCues, genreBug, stingerCues, EX_RED } from '../../st8cast.js'

export const DURATION = 25
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LEAF = '#7ad07a'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"

const T = {
  hookOut: [2.3, 2.55], lower: [2.5, 6.4], l1: 2.8, comet: 5.0,
  punch: [6.6, 9.4], notes: 7.0, l2: 7.6, ghost: 9.8,
  scorp: 11.3, l3: 11.6, tap: 14.4, muted: 14.45, drift: 14.6, l4: 14.65, close: 17.6,
  last: 17.7, lastOut: [20.3, 20.58],
}
const SCO = signStar('scorpio')
const NARR = 'THE STARS · NARRATOR'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'here, the orbiter circles its subject. *silently.*', color: LEAF },
  { t: T.l2, speaker: NARR, text: 'it watches every story. it never *texts.*', color: LEAF },
  { t: T.l3, speaker: NARR, text: 'but the Scorpio has a *mute* button.', color: LEAF },
  { t: T.l4, speaker: NARR, text: 'the orbiter drifts off. *peacefully.*', color: LEAF },
]
const CPS = 26
const PH = { x: 610, y: 960, w: 420, h: 760 }
const ORB = { cx: PH.x, cy: PH.y - 60, r: 420, speed: 0.9, tilt: 0.34, phase: 0.6 }
export const GHOST = { at: T.ghost, x: PH.x - PH.w / 2, y: 1080, where: 'leaning out from behind the phone’s left edge' }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "italic 500 44px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'The orbiter, in its | natural *habitat.*', at: 0, out: T.hookOut, size: 100, accentSize: 160, top: 178, accentColor: LEAF })
  const last = hookCard(root, { text: 'Watching isn’t | *wanting.*', at: T.last, out: T.lastOut, size: 112, accentSize: 176, top: 178, accentColor: LEAF })
  const box = dialogueBox(root, { lines: LINES, y: 1470, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS, size: 48 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function monoText(s, X, Y, { size = 30, color = BONE, align = 'left', alpha = 1, font = MONO, weight = 700, italic = false } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + size * 0.08); x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  function phone(t, muted) {
    const { x: cx, y: cy, w, h } = PH, x0 = cx - w / 2, y0 = cy - h / 2
    px(x0 - 8, y0 - 8, w + 16, h + 16, INK); px(x0, y0, w, h, '#2a2440'); px(x0 + 14, y0 + 30, w - 28, h - 60, '#000')
    // the story: a moody pixel sunset (Scorpio posts sunsets)
    const sx = x0 + 14, sy = y0 + 30, sw = w - 28, sh = h - 60
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2a1450'); g.addColorStop(0.55, '#b0306a'); g.addColorStop(0.75, '#ff8a4a'); g.addColorStop(1, '#3a1430'); x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.save(); x.beginPath(); x.arc(cx, sy + sh * 0.7, 70, 0, Math.PI * 2); x.fillStyle = '#ffd36a'; x.fill(); x.restore()
    px(sx, sy + sh * 0.74, sw, sh * 0.26, '#2a0f30')
    for (let i = 0; i < 4; i++) px(sx + 10 + i * (sw - 20) / 4, sy + 12, (sw - 20) / 4 - 6, 5, i === 0 ? '#ffffff' : i === 1 ? `rgba(255,255,255,${0.4 + 0.6 * ((t * 0.2) % 1)})` : 'rgba(255,255,255,0.35)')
    monoText('scorpio · 2h', sx + 16, sy + 44, { size: 24, color: BONE })
    monoText(muted ? 'Seen by 4 friends' : 'Seen by 🛰 + 0 others', sx + 16, sy + sh - 30, { size: 24, color: BONE })
    // the mute sheet
    const mk = muted ? pop01(t, T.muted, 0.3, 2) : 0
    if (mk > 0.01) {
      x.save(); x.translate(cx, sy + sh * 0.42); x.scale(mk, mk)
      px(-175, -64, 350, 128, INK); px(-169, -58, 338, 116, BONE)
      drawBits(x, ['X...X', 'XX.XX', 'XXXXX', 'XX.XX', 'X...X'], { X: EX_RED }, -122, 0, 8, { outline: null })
      monoText('MUTED', 30, -16, { size: 40, color: INK, align: 'center' }); monoText('the orbiter', 30, 26, { size: 24, color: '#5a5478', align: 'center' })
      x.restore()
    }
    // the tap
    const tp = prog(t, T.tap - 0.25, T.tap + 0.4)
    if (tp > 0 && tp < 1) { x.save(); x.globalAlpha = 1 - tp; x.strokeStyle = '#ffffff'; x.lineWidth = 6; x.beginPath(); x.arc(cx, sy + sh * 0.42, 20 + 60 * tp, 0, Math.PI * 2); x.stroke(); x.restore() }
  }
  function lowerThird(t) {
    const p = prog(t, T.lower[0], T.lower[0] + 0.4), o = 1 - prog(t, T.lower[1] - 0.3, T.lower[1])
    if (p <= 0 || o <= 0) return
    const w = lerp(0, 760, ease.outCubic(p))
    x.save(); x.globalAlpha = o; x.beginPath(); x.rect(70, 1240, w, 160); x.clip()
    px(70, 1290, 6, 96, LEAF)
    monoText('THE ORBITER', 96, 1314, { size: 44, color: BONE })
    monoText('Satellitus lurkus', 96, 1364, { size: 46, color: LEAF, font: SERIF, weight: 500, italic: true })
    x.restore()
  }
  function fieldNotes(t) {
    const p = pop01(t, T.notes, 0.4, 1.8), o = 1 - prog(t, T.punch[1] + 1.6, T.punch[1] + 1.9)
    if (p <= 0.01 || o <= 0) return
    x.save(); x.globalAlpha = o; x.translate(250, 520); x.rotate(-0.05); x.scale(p, p)
    px(-190, -150, 380, 300, INK); px(-182, -142, 364, 284, '#f1e6c8'); for (let j = -110; j < 140; j += 34) px(-170, j, 340, 2, 'rgba(90,70,40,0.25)')
    monoText('FIELD NOTES', 0, -110, { size: 26, color: '#5a3a1a', align: 'center' })
    ;[['DIET', 'your stories'], ['CALLS', 'none. ever.'], ['RANGE', 'always nearby'], ['SEEN', `${Math.min(47, Math.floor(prog(t, T.notes, T.notes + 2) * 47))} times`]].forEach(([k, v], i) => {
      monoText(k, -166, -56 + i * 52, { size: 22, color: '#8a2a2a' }); monoText(v, -60, -56 + i * 52, { size: 22, color: INK })
    })
    x.restore()
  }
  function letterbox() { px(0, 0, 1080, 56, '#000'); px(0, 1864, 1080, 56, '#000') }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 }); drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const cp = prog(t, T.comet, T.comet + 2.2)
      if (cp > 0 && cp < 1) drawComet(x, lerp(-40, 520, cp), lerp(420, 470, cp), 28, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [1, 0.1], bob: 0 })
      const muted = t >= T.muted, endShot = t >= T.last
      // the camera: a slow doc push, a punch-in on the light, back out
      const pk = ease.inOutCubic(prog(t, T.punch[0], T.punch[0] + 0.5)) * (1 - ease.inOutCubic(prog(t, T.punch[1] - 0.5, T.punch[1])))
      const zoom = 1 + 0.03 * Math.sin(t * 0.4) + 0.35 * pk
      // the orbiter's position: on orbit, then drifting off
      const dp = ease.inQuad(prog(t, T.drift, T.drift + 3.0))
      const a0 = ORB.phase + T.drift * ORB.speed
      const onOrbit = { x: ORB.cx + Math.cos(Math.min(t, T.drift) * ORB.speed + ORB.phase) * ORB.r, y: ORB.cy + Math.sin(Math.min(t, T.drift) * ORB.speed + ORB.phase) * ORB.r * ORB.tilt }
      void a0
      const sat = { x: lerp(onOrbit.x, 1250, dp), y: lerp(onOrbit.y, 380, dp) }
      const fx = lerp(PH.x, onOrbit.x, pk * 0.8), fy = lerp(PH.y, onOrbit.y, pk * 0.8)
      x.save(); x.translate(540, 960); x.scale(zoom, zoom); x.translate(-lerp(540, fx, pk), -lerp(960, fy, pk))
      const behind = t < T.drift && Math.sin(t * ORB.speed + ORB.phase) < 0
      const drawSat = () => { if (!endShot) drawSatellite(x, sat.x, sat.y, 340 * (1 - 0.6 * dp), t, { orbit: t < T.drift ? ORB : null, viewed: !muted, mood: muted ? (t < T.drift + 0.8 ? 'wide' : 'happy') : 'neutral', look: [Math.sign(PH.x - sat.x) || 0, 0.5], alpha: 1 - prog(t, T.drift + 2.4, T.drift + 3.0), rot: dp * 0.6, seed: 11 }) }
      if (behind) drawSat()
      phone(t, muted)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
      if (!behind) drawSat()
      // Scorpio
      if (t >= T.scorp) {
        const p = pop01(t, T.scorp, 0.4, 2)
        const st = t < T.tap - 0.3 ? { mood: 'squint', look: [1, 0] } : t < T.drift + 1.2 ? { mood: 'neutral', look: [1, -1] } : endShot ? (t < T.last + 0.5 ? { mood: 'neutral', look: [0, 0] } : { mood: 'happy' }) : { mood: 'sparkle', look: [1, -1] }
        drawStarChar(x, lerp(-120, 220, ease.outCubic(prog(t, T.scorp, T.scorp + 0.5))), 1240, 330, t, { color: SCO.color, glyph: SCO.glyph, ...st, pop: p, hops: [T.scorp + 0.3, T.tap, T.last + 0.4], seed: 8 })
      }
      x.restore()
      // the "viewed" light punch-in caption
      if (pk > 0.6) monoText('● VIEWED', 540, 760, { size: 40, color: EX_RED, align: 'center', alpha: (pk - 0.6) / 0.4 * ((t * 1.2) % 1 < 0.6 ? 1 : 0.4) })
      fieldNotes(t)
      lowerThird(t)
      letterbox()
      genreBug(x, t, { text: 'PLANET ZODIAC', x: 70, y: 112, color: '#2f6a3a', size: 22, blink: false })
      drawDayChip(x, t, { day: 5, phase: 'retro', y: 112 })
      hook.update(t); last.update(t); box.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E03', fadeIn: 0 })]

export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...[0.6, 1.8, 3.0, 4.2, 5.4, 6.6, 7.8, 9.0, 10.2, 11.4, 12.6, 13.8].map(k => ['pop', k, 1760, 0.008, 0.4]),
  ['pluck', T.lower[0], 587.33, 0.04, 0.6, -0.2], ['pluck', T.lower[0] + 0.15, 880, 0.035, 0.6, -0.2],
  ['tick', T.comet + 0.6, 0.012],
  ['whoosh', T.punch[0], 0.4, 0.04], ['pop', T.notes, 659.25, 0.04, -0.4], ['tick', T.notes + 0.4, 0.03], ['tick', T.notes + 0.8, 0.03],
  ['pop', T.scorp, 740, 0.04, -0.5],
  ['tick', T.tap, 0.08], ['pop', T.muted, 1174.66, 0.05, 0], ['bell', T.muted + 0.05, 1568, 0.03, 1.2, 0],
  ['whoosh', T.drift + 0.6, 0.8, 0.03], ['swell', T.drift, T.drift + 1.5, { gain: 0.025 }],
  ...talkCues(LINES, { cps: CPS, gain: 0.012, pitch: { [NARR]: 659.25 } }),
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', T.last + 0.5, 1318.51, 0.03, 1.6, 0],
  ...endcardCues(STORY_END),
]
