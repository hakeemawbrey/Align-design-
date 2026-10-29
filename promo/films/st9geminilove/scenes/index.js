// st9geminilove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E13: Gemini · DATE NIGHT) · story 0–25.6,
// then the shared end card. The vlog parody (st9day.js) at Gemini's window seat (st9geminihome.js), dusk, with
// Sagittarius (the season-4 couple).
//   0.00  frame 0: "Dating a Gemini: you'll *never* be bored." The ♊ star mid-sentence, phone up, voice notes flying
//         out of it (▶ 2:13 · ▶ 5:02 · ▶ 11:40); Sag beside it, wide-eyed, keeping up.
//   3.00  the debate: a VS banner, "IS A HOT DOG A SANDWICH?", score ♊ 3 – 3 ♐. "7:30 PM — date night. debate round 1."
//   6.70  trivia: "how many moons does Mars have?" Gemini buzzes first: "TWO!" (Phobos and Deimos), and keeps going…
//  10.30  SAG: "can i tell you about *my* day?" Gemini zips it. A LISTENING stopwatch runs 0:00 → 1:00 while Sag talks:
//         "my boss loved my idea. i cried a *little.*" Gemini's eyes go soft. 1:00 → "★ NEW RECORD".
//  18.10  the window: the twins' two bright stars come out. ★ REAL SKY: Castor and Pollux mark the twins' heads.
//  21.40  "Talk to me. *Then* listen." The rhyme: frame 0's shot, but now Sag sends the voice note and Gemini listens.
// Rewatch bait: the plant on the sill has two more leaves than this morning; the scoreboard flips to "♊ 3 – 4 ♐".
// Ghost: rises behind the mint cushion on the window seat.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawGeminiHome, geminiRoom, GEM } from '../../st9geminihome.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const GEMC = signStar('gemini'), SAGC = signStar('sagittarius')
const GEMN = '♊ GEMINI', SAGN = '♐ SAGITTARIUS'

const T = {
  hookOut: 2.9, debate: 3.0, s1: [3.2, 6.4], vsOut: 6.5, score2: 5.3,
  trivia: 6.7, buzz: 7.6, s2: [7.0, 10.1], ramble: [8.4, 10.2],
  l1: 10.35, zip: 11.6, watch: [12.2, 16.2], l2: 12.5, record: 16.25, close: 17.9,
  sky: 18.1, castor: 18.4, pollux: 18.7, chip: 18.9,
  last: 21.4, lastLand: 21.75, note2: 21.6, out: [25.2, 25.55],
  ghost: 14.0,
}
const LINES = [
  { t: T.l1, speaker: SAGN, text: 'can i tell you about *my* day?', color: '#c79bff' },
  { t: T.l2, speaker: SAGN, text: 'my boss loved my idea. i cried a *little.*', color: '#c79bff' },
]
const CPS = 28
const SAG_HOPS = talkHops(LINES, SAGN, { cps: CPS })
const GEM_HOPS = [T.debate + 0.05, T.buzz, T.buzz + 0.5, T.buzz + 1, T.buzz + 1.5, T.buzz + 2, T.zip, T.record, T.lastLand, ...[0, 1, 2].map(i => 13 + i * 1.2)]
const NOTES = [{ d: '2:13', at: -1.2 }, { d: '5:02', at: -0.6 }, { d: '11:40', at: 0 }, { d: '0:58', at: 0.6 }, { d: '7:15', at: 1.2 }, { d: '3:33', at: 1.8 }]
const RAMBLE = ['TWO!', 'phobos AND deimos', 'fear + dread!!', 'fun fact—', 'ok so ALSO—', 'wait one more']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 860, y: 1214, where: 'rising behind the mint cushion on the window seat' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 52px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Dating a Gemini: you’ll *never* be bored.', at: 0, out: T.hookOut, top: 270 })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '7:30 PM', text: 'date night. debate round 1.' }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '7:38 PM', text: 'trivia. we’re *tied.*', accentColor: GEM.yellow }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1480, width: 960, height: 270, close: T.close, cps: CPS })
  const last = popText(root, 'Talk to me. | *Then* listen.', { top: 330, size: 112, accentSize: 168, at: T.last, gap: 0.08, accentColor: GEM.yellow, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  function panel(cx, cy, w, h, fillC, border = INK) { rect(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, border); rect(cx - w / 2, cy - h / 2, w, h, fillC) }

  /** a voice-note bubble: ▶, a waveform, the duration */
  function voiceNote(cx, cy, d, k, col = GEM.yellow, seed = 1) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    panel(0, 0, 250, 64, col)
    txt('▶', -100, 2, "800 30px Inter", INK)
    for (let i = 0; i < 12; i++) { const h = 8 + ((i * 7 + seed * 5) % 9) * 4; rect(-74 + i * 10, -h / 2, 6, h, INK) }
    txt(d, 84, 2, "700 22px 'Space Mono', monospace", INK)
    x.restore()
  }
  function speech(cx, cy, s, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = "800 34px Inter"; const w = x.measureText(s).width + 44
    panel(0, 0, w, 60, BONE); rect(-10, 30, 20, 16, INK); rect(-6, 30, 12, 10, BONE)
    txt(s, 0, 2, "800 34px Inter", INK)
    x.restore()
  }
  function stopwatch(t) {
    const p = prog(t, ...T.watch)
    const k = t < T.watch[0] ? 0 : pop01(t, T.watch[0], 0.3, 2) * (1 - ease.inCubic(prog(t, T.record + 1.2, T.record + 1.5)))
    if (k <= 0.02) return
    const s = Math.floor(p * 60), done = t >= T.record
    x.save(); x.translate(540, 700); x.scale(k, k)
    panel(0, 0, 440, 170, done ? GOLD : '#14102e', done ? INK : GEM.yellow)
    txt(done ? '★ NEW RECORD' : '● LISTENING', 0, -48, "700 26px 'Space Mono', monospace", done ? INK : '#ff5d73')
    txt(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}${done ? '' : '.' + String(Math.floor((p * 60 % 1) * 100)).padStart(2, '0')}`, 0, 22, "700 80px 'Space Mono', monospace", done ? INK : BONE)
    // the dial ring of 12 ticks
    for (let i = 0; i < 12; i++) if (i / 12 < p) rect(-200 + i * 34, 72, 26, 8, done ? INK : GEM.yellow)
    x.restore()
    if (done) for (let i = 0; i < 18; i++) {                                                  // a little confetti pop
      const q = prog(t, T.record, T.record + 1.1), a = i * 2.4
      if (q > 0 && q < 1) { x.globalAlpha = 1 - q; rect(540 + Math.cos(a) * 300 * q, 700 + Math.sin(a) * 180 * q + 200 * q * q, 12, 12, [GEM.yellow, GEM.pink, GEM.mint, '#c79bff'][i % 4]); x.globalAlpha = 1 }
    }
  }
  function zip(cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-40, -6, 80, 12, INK); for (let i = 0; i < 6; i++) rect(-34 + i * 12, -4, 6, 8, '#c9c3d9')
    rect(36, -12, 16, 24, INK); rect(40, -8, 8, 16, GOLD)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const hour = 19.4 + prog(t, 0, STORY_END) * 0.9
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const L = geminiRoom('window'), W = L.win
      // the twins' stars in the window (they come out at 18.1)
      for (const [s, sx, sy, at] of [['POLLUX', W.x + 520, W.y + 150, T.pollux], ['CASTOR', W.x + 640, W.y + 90, T.castor]]) {
        const k = pop01(t, at, 0.4, 2)
        if (k <= 0.02) continue
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(sx, sy, 0, sx, sy, 90 * k); g.addColorStop(0, 'rgba(255,240,200,0.5)'); g.addColorStop(1, 'rgba(255,240,200,0)')
        x.fillStyle = g; x.fillRect(sx - 90, sy - 90, 180, 180); x.restore()
        drawPixelStar(x, sx, sy, (s === 'POLLUX' ? 56 : 44) * k * (1 + 0.1 * Math.sin(t * 5 + sx)), 2, s === 'POLLUX' ? '#ffd9a0' : '#f4f2ff')
        if (t > at + 0.3) { x.globalAlpha = prog(t, at + 0.3, at + 0.6); txt(s, sx, sy + 56, "700 24px 'Space Mono', monospace", BONE); x.globalAlpha = 1 }
      }
      if (t > T.pollux + 0.5) { x.save(); x.globalAlpha = 0.5 * prog(t, T.pollux + 0.5, T.pollux + 1); x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([8, 10]); x.beginPath(); x.moveTo(W.x + 520, W.y + 150); x.lineTo(W.x + 640, W.y + 90); x.stroke(); x.restore() }
      const zIn = t >= T.sky && t < T.last ? ease.inOutCubic(prog(t, T.sky, T.sky + 0.6)) : 0
      x.save(); x.translate(540, 760); x.scale(1 + 0.08 * zIn, 1 + 0.08 * zIn); x.translate(-540, -760)
      drawGeminiHome(x, t, { room: 'window', ep: 'love', hour })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
      const [gx0, gy0] = L.spots.seat, [sx0, sy0] = L.spots.seat2
      const listening = t >= T.zip && t < T.last
      const gMood = t < T.debate ? 'happy' : t < T.trivia ? 'squint' : t < T.l1 ? 'sparkle' : t < T.zip ? 'wide' : t < T.l2 + 2 ? 'neutral' : t < T.sky ? 'heart' : t < T.last ? 'sparkle' : 'happy'
      const rG = drawStarChar(x, gx0, gy0 - 40, 250, t, { ...GEMC, mood: gMood, look: listening || t < T.debate ? [1, 0] : t < T.trivia ? [1, 0] : [0, -1], seed: 3, hops: GEM_HOPS, blink: gMood === 'wide' ? false : undefined })
      const sMood = t < T.debate ? 'wide' : t < T.trivia ? 'squint' : t < T.l1 ? 'happy' : t < T.record ? 'neutral' : t < T.last ? 'heart' : 'happy'
      drawStarChar(x, sx0, sy0 - 40, 250, t, { ...SAGC, mood: sMood, look: t < T.sky || t >= T.last ? [-1, 0] : [1, -1], seed: 11, hops: SAG_HOPS, blink: sMood === 'wide' ? false : undefined })
      if (listening && t < T.record + 0.2) zip(rG.x + 4, gy0 + 6, pop01(t, T.zip, 0.3, 2.4))
      // phones
      const ph = (px0, py, rot) => { x.save(); x.translate(px0, py); x.rotate(rot); rect(-24, -42, 48, 84, INK); rect(-18, -36, 36, 66, '#5fa8ff'); x.restore() }
      if (t < T.debate) ph(gx0 + 120, gy0 - 30, 0.2)
      if (t >= T.note2) ph(sx0 - 120, sy0 - 30, -0.2)
      x.restore()
      // frame 0: voice notes stream out of Gemini's phone
      if (t < T.debate + 0.3) for (const [i, n] of NOTES.entries()) {
        const age = t - n.at, k = (t < 0.01 && n.at <= 0) || age > 0 ? 1 - ease.inCubic(prog(t, T.debate - 0.1 + i * 0.03, T.debate + 0.2)) : 0
        const yy = 1120 - (age + 1.2) * 110 - i * 0
        voiceNote(gx0 + 170 + Math.sin(age * 2 + i) * 30 + (i % 2) * 120, yy, n.d, k, GEM.yellow, i)
      }
      // the rhyme: Sag's voice note, Gemini listening
      if (t >= T.note2) voiceNote(sx0 - 70, 1070 - ease.outCubic(prog(t, T.note2, T.note2 + 1)) * 120, '0:47', pop01(t, T.note2, 0.35, 2) * outK(t, T.out), '#c79bff', 4)
      // the debate banner
      if (t >= T.debate && t < T.vsOut + 0.3) {
        const k = pop01(t, T.debate, 0.3, 2) * (1 - ease.inCubic(prog(t, T.vsOut, T.vsOut + 0.3)))
        x.save(); x.translate(540, 660); x.scale(k, k)
        panel(0, 0, 900, 200, '#14102e', GOLD)
        rect(-450, -100, 900, 54, '#ff5d73'); txt('DEBATE · ROUND 1', 0, -72, "700 28px 'Space Mono', monospace", '#fff')
        txt('IS A HOT DOG A SANDWICH?', 0, -4, "800 50px Inter", BONE)
        const sc = t < T.score2 ? '♊ 3 – 3 ♐' : '♊ 3 – 4 ♐'
        txt(sc, 0, 62, "700 34px 'Space Mono', monospace", GEM.yellow)
        x.restore()
        const vk = pop01(t, T.debate + 0.15, 0.3, 3)
        if (vk > 0.02) { x.save(); x.translate(540, 1020); x.scale(vk, vk); x.rotate(-0.08); panel(0, 0, 150, 100, '#ff5d73'); txt('VS', 0, 4, "800 64px Inter", '#fff'); x.restore() }
      }
      // trivia card + the buzzer + the ramble
      if (t >= T.trivia && t < T.l1 + 0.3) {
        const k = pop01(t, T.trivia, 0.3, 2) * (1 - ease.inCubic(prog(t, T.l1, T.l1 + 0.3)))
        x.save(); x.translate(540, 650); x.scale(k, k)
        panel(0, 0, 860, 170, BONE)
        rect(-430, -85, 860, 48, '#5fa8ff'); txt('TRIVIA NIGHT · Q 7', 0, -60, "700 26px 'Space Mono', monospace", INK)
        txt('How many moons does Mars have?', 0, 22, "800 44px Inter", INK)
        x.restore()
        RAMBLE.forEach((s, i) => {
          const at = i === 0 ? T.buzz : T.ramble[0] + (i - 1) * 0.35
          speech(gx0 - 30 + ((i * 53) % 140) - 30, 1010 - i * 70, s, pop01(t, at, 0.25, 2.4) * (1 - ease.inCubic(prog(t, T.l1, T.l1 + 0.25))))
        })
      }
      stopwatch(t)
      factChip(x, t, { label: '★ REAL SKY', text: 'The bright stars Castor and Pollux mark the twins’ heads.', at: T.chip, dur: 2.4, x: 540, y: 290, color: GEM.yellow })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '7:30', to: '7:52', at: 0, dur: STORY_END - 0.6, ampm: 'PM', sign: 'gemini' })
      drawRecFrame(x, t, { battery: 0.45 - 0.2 * prog(t, 0, STORY_END) })
      for (const c of [T.debate, T.trivia, T.sky]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.45 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.trivia, kind: 'flip' }, { t: T.sky, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E13' }), cardCuts(CUTS)]

const NOTE = [880, 987.77, 1108.73, 1318.51, 1479.98, 1760]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.01 }),
  ...NOTES.filter(n => n.at > 0).map((n, i) => ['pop', r3(n.at), NOTE[i % NOTE.length], 0.03, 0.2]),
  ['whoosh', T.debate - 0.06, 0.3, 0.03], ['pop', T.debate + 0.15, 659.25, 0.05, 0], ['tick', T.debate + 0.15, 0.05],
  ...stampCues(T.s1[0]), ['pop', T.score2, 1318.51, 0.04, 0.3],
  ['whoosh', T.trivia - 0.06, 0.3, 0.03], ...stampCues(T.s2[0]),
  ['tick', T.buzz - 0.02, 0.07], ['pop', T.buzz, 1760, 0.05, -0.3],
  ...RAMBLE.slice(1).map((_, i) => ['pop', r3(T.ramble[0] + i * 0.35), NOTE[(i + 1) % NOTE.length], 0.028, -0.3]),
  ...talkCues(LINES, { cps: CPS, pitch: { [SAGN]: 659 } }),
  ['whoosh', T.zip, 0.25, 0.03], ['tick', T.zip + 0.2, 0.05],
  ...Array.from({ length: 16 }, (_, i) => ['tick', r3(T.watch[0] + i * 0.25), 0.012]),
  ['bell', T.record, 1760, 0.04, 1.4, 0], ['glitter', T.record, T.record + 0.8], ['pop', T.record, 1318.51, 0.05, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.sky - 0.06, 0.4, 0.03], ['bell', T.castor, 1318.51, 0.03, 1.6, 0.3], ['bell', T.pollux, 1760, 0.03, 1.6, 0.4],
  ...factChipCues(T.chip, { dur: 2.4 }),
  ['pop', T.note2, 987.77, 0.035, 0.2],
  ['pop', T.last, 880, 0.03, 0], ['pop', T.last + 0.08, 987.77, 0.03, 0], ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 1318.51, 0.04, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lerp
