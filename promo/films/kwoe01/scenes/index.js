// kwoe01: WHICH ONE ARE YOU? · "Left on Read" (trial reel, pop · D, loop). The format lives in ./wokit.js.
//   frame 0  whip zoom out of panel 4: Gemini mid-type, thumbs blurring, a "Read 9:41" tick glowing. Hook on screen.
//   1 Virgo re-reads their own text for typos · 2 Leo posts a selfie "for no reason" · 3 Capricorn flips the phone face
//   down and works · 4 Gemini types, deletes, types, deletes.  5 Pisces: cries at the tiny word "Read."  Loops.
import { makeWhich, phone, chat, bubble, thought, label, glow, bed, desk, laptop, windowFrame, sparkles, actionLines, sweat, R, box, osc, saw, prog, ease, clamp, lerp, BONE, GOLD, PINK, INK, MINT, INTER, MONO } from './wokit.js'

const readTick = (x, w, h, a = 1) => { x.save(); x.globalAlpha *= a; x.font = `700 10px ${INTER}`; x.textAlign = 'right'; x.fillStyle = '#9fe6b0'; x.fillText('Read 9:41', w - 6, h - 4); x.restore() }

// 1 · Virgo: re-reads their own text, magnifier sweeping
function p1(x, t, P) {
  windowFrame(x, 300, 60, 150, 130)
  bed(x, 20, 470, 440)
  const on = P.u > 0 ? 1 : 0
  P.star(x, t, { x: 180, y: 330, s: 190, mood: 'squint', look: [1, 0], hops: [P.turn[0] + 0.1, P.turn[0] + 0.9] })
  phone(x, 340, 300, { s: 1.15, rot: 0.08, glowA: 0.25, screen: (x, w, h) => { chat(x, w, h - 14, [{ me: true, text: 'hey! how was' }, { me: true, text: 'your day?' }]); readTick(x, w, h) } })
  // the magnifier sweeps the text
  const mx = 340 + 36 * osc(t, 0.9), my = 300 + 30 * osc(t, 0.6, 0.25)
  x.save(); x.lineWidth = 8; x.strokeStyle = INK; x.beginPath(); x.arc(mx, my, 40, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(mx, my, 40, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(191,232,255,0.25)'; x.beginPath(); x.arc(mx, my, 37, 0, Math.PI * 2); x.fill()
  x.save(); x.translate(mx + 28, my + 28); x.rotate(-0.8); R(x, INK, -8, 0, 16, 64); R(x, '#8a6440', -4, 4, 8, 56); x.restore(); x.restore()
  thought(x, t, 200, 110, P.turn[0] + 0.35, Infinity, 'was "hey!" too much?', { size: 24 })
  void on
}

// 2 · Leo: a selfie flash, "for no reason"
function p2(x, t, P) {
  // fairy lights
  for (let i = 0; i < 9; i++) { const c = [GOLD, PINK, MINT][i % 3]; R(x, c, 20 + i * 52, 40 + 14 * Math.sin(i * 1.3), 12, 12); glow(x, 26 + i * 52, 46, 40, '255,230,170', 0.12 + 0.08 * osc(t, 1.5, i * 0.2)) }
  const pose = Math.floor(saw(t, 0.7) * 3)
  P.star(x, t, { x: 210, y: 340, s: 200, mood: ['sparkle', 'wink', 'happy'][pose], look: [1, -0.4], hops: [0.1, 0.8, 1.5, 2.2, 2.9, 3.6].map(v => P.turn[0] + v - 0.6) })
  phone(x, 380, 210, { s: 0.9, rot: -0.25, col: '#f39a3a' })
  // flash every 0.7 s
  const f = saw(t, 0.7); if (f < 0.12) { glow(x, 380, 210, 300, '255,255,240', 0.6 * (1 - f / 0.12)); sparkles(x, t, 380, 210, t - f * 0.7, 6, 50, 0.5) }
  if (P.u > 0.5) { box(x, 90, 470, 300, 50, MINT, { b: 5 }); x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('POSTED ✓  "just vibes"', 240, 496) }
  bubble(x, t, 240, 120, P.turn[0] + 0.3, Infinity, 'unrelated selfie.', { size: 26, tail: -0.2 })
}

// 3 · Capricorn: phone face down, back to work
function p3(x, t, P) {
  desk(x, 30, 420, 420)
  laptop(x, 300, 420, { s: 1.05, screen: (x, w, h) => { R(x, '#1f2f4a', 0, 0, w, h); for (let i = 0; i < 5; i++) R(x, [MINT, GOLD, PINK][i % 3], 12 + i * 22, h - 10 - (16 + ((i * 13 + Math.floor(t * 2)) % 40)), 14, 16 + ((i * 13 + Math.floor(t * 2)) % 40)) } })
  // the phone flips face down at u≈0.3
  const fl = clamp(prog(P.u, 0.25, 0.45))
  x.save(); x.translate(120, 405); x.scale(1, lerp(1, -1, fl))
  box(x, -50, -12, 100, 22, fl > 0.5 ? '#2a2148' : '#5aa0ff', { b: 4 }); x.restore()
  if (fl >= 1) label(x, 'thunk.', 120, 360, { size: 22, alpha: clamp(1 - (P.u - 0.45) * 1.5) })
  P.star(x, t, { x: 170, y: 270, s: 170, mood: P.u > 0.45 ? 'neutral' : 'squint', look: [1, 0.4], hops: [P.turn[0] + 0.3] })
  // typing hands: little bounce lines over the keys
  if (P.u > 0.5) for (let i = 0; i < 3; i++) R(x, BONE, 260 + i * 22, 398 - 6 * Math.abs(osc(t, 4, i * 0.3)), 10, 6)
  bubble(x, t, 300, 130, P.turn[0] + 0.55, Infinity, 'anyway.', { size: 30 })
}

// 4 · Gemini: types… deletes… types… deletes (the frame-0 panel)
function p4(x, t, P) {
  windowFrame(x, 30, 50, 150, 130)
  const cyc = saw(t, 1.1)                      // one type-delete cycle
  const drafts = ['omg hiii', 'so anyway…', 'lol ok', 'hello??']
  const d = drafts[Math.floor(t / 1.1) % drafts.length]
  const n = cyc < 0.6 ? Math.ceil(d.length * cyc / 0.6) : Math.ceil(d.length * (1 - (cyc - 0.6) / 0.4))
  P.star(x, t, { x: 170, y: 340, s: 190, mood: cyc < 0.6 ? 'wide' : 'squint', look: [1, 0.3] })
  sweat(x, t, 250, 240)
  phone(x, 330, 320, { s: 1.2, rot: -0.06, glowA: 0.35, screen: (x, w, h) => {
    chat(x, w, h - 40, [{ me: true, text: 'hey! :)' }]); readTick(x, w, h - 30, 0.6 + 0.4 * osc(t, 2))
    R(x, '#2a2448', 4, h - 26, w - 8, 20); x.font = `700 11px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(d.slice(0, n) + (saw(t, 0.4) < 0.5 ? '|' : ''), 8, h - 16)
  } })
  // thumbs blurring
  actionLines(x, t, 330, 400, 60, 100, 6, BONE, 0.6, 0.4)
  label(x, cyc < 0.6 ? 'typing…' : 'DELETE DELETE', 330, 470, { size: 22, col: cyc < 0.6 ? MINT : PINK })
}

const EP = makeWhich({
  id: 'kwoe01', hero: 3, flash: '#ff7eb6', deep: '#2a6fd0',
  hook: 'Left on *read.* | Which one are you?',
  panels: [
    { sign: 'virgo', bg: 'bedroom', caption: 're-reads their own text for *typos*', draw: p1, cues: [['tick', 0.3, 0.04], ['tick', 0.6, 0.04]] },
    { sign: 'leo', bg: 'party', caption: 'posts a selfie *for no reason*', draw: p2, cues: [['pop', 0.1, 1760, 0.04, 0.3], ['glitter', 0.1, 0.4], ['pop', 0.8, 1760, 0.035, 0.3]] },
    { sign: 'capricorn', bg: 'office', caption: 'phone face down. *Back to work.*', draw: p3, cues: [['tom', 0.42, 140, { gain: 0.18, decay: 0.12 }], ['tick', 0.7, 0.03], ['tick', 0.85, 0.03], ['tick', 1.0, 0.03]] },
    { sign: 'gemini', bg: 'night', caption: 'types, deletes, types, *deletes*', draw: p4, cues: [['tick', 0.1, 0.03], ['tick', 0.2, 0.03], ['tick', 0.3, 0.03], ['whoosh', 0.75, 0.2, 0.02]] },
  ],
  pisces: 'cries at the tiny word *"Read."*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO, ease, lerp]
