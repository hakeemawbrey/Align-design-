// kgse01: GUESS THE SIGN, "Take eleven of the voice note" (10 s vertical, star_advice trial, chiptune · C, loop).
//   0.00  frame 0: the silhouette mid-gasp, phone at its mouth, REC dot, a "TAKE 11" clapper flying past.
//         Hook: "Who re-records a voice note *eleven times?*"
//   0.35  record scratch + freeze (0.9 s, the hook kit)
//   then  take 11 deleted → 12 → 13 → 14, each one ✗ DELETED, the silhouette more frazzled each time
//   3.2   CLUE 1 "a 14-step checklist" (a clipboard pops in) · 4.4 CLUE 2 "a label maker" (a label lands on the phone)
//   4.95  Pisces buzzes "PISCES?" sobbing · 6.65 3·2·1 · 7.55 reveal: VIRGO · 7.93 last line · 9.58 loop back to frame 0
import { makeGuess, box, R, label, phone, bubble, shadow, sparkles, prog, ease, clamp, lerp, pop01, outK, INK, BONE, GOLD, RED, CYAN, MINT, INTER, MONO } from './guesskit.js'

const TAKES = [0, 1.55, 2.6, 3.65, 4.7, 5.75]          // scene-time starts of takes 11, 12, 13, …
const realT = u => +u.toFixed(3)
const takeAt = u => { let i = 0; for (let k = 0; k < TAKES.length; k++) if (u >= TAKES[k]) i = k; return i }

function screen(u, S) {
  return (x, w, h) => {
    const i = takeAt(u), du = u - TAKES[i], del = du > 0.78 && u < S.R - 0.6 && i < TAKES.length - 1
    const sent = S.rv > 0.5
    R(x, sent ? '#16302a' : del ? '#4a1020' : '#14102a', 0, 0, w, h)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    if (sent) {
      x.font = `800 26px ${INTER}`; x.fillStyle = MINT; x.fillText('SENT ✓', w / 2, 40)
      R(x, '#7c74f0', w - 150, 90, 130, 46); x.font = `700 22px ${INTER}`; x.fillStyle = BONE; x.fillText('▶ ıllıı 0:03', w - 85, 114)
      x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.fillText(`take ${11 + i}`, w / 2, 190); return
    }
    // REC header
    if (Math.floor(u * 3) % 2 === 0 && !del) { x.fillStyle = RED; x.beginPath(); x.arc(30, 32, 10, 0, Math.PI * 2); x.fill() }
    x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText('REC', 48, 33)
    x.textAlign = 'center'; x.font = `900 44px ${INTER}`; x.fillStyle = del ? '#ff8a9a' : GOLD; x.fillText(`TAKE ${11 + i}`, w / 2, 96)
    if (del) {
      const k = pop01(u, TAKES[i] + 0.78, 0.2, 2.6)
      x.save(); x.translate(w / 2, 190); x.scale(k, k); x.font = `900 92px ${INTER}`; x.fillStyle = RED; x.fillText('✗', 0, 0); x.restore()
      x.font = `800 24px ${INTER}`; x.fillStyle = '#ff8a9a'; x.fillText('DELETED', w / 2, 262)
    } else {
      for (let b = 0; b < 9; b++) { const hh = 10 + 60 * Math.abs(Math.sin(u * 11 + b * 1.7)) * (0.5 + 0.5 * Math.sin(b + u)); R(x, CYAN, 18 + b * 18, 190 - hh / 2, 11, hh) }
      x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.fillText(`0:0${Math.min(9, Math.floor(du * 4))}`, w / 2, 262)
    }
  }
}

function clapper(x, u) {
  // a "TAKE 11" clapperboard flying across at frame 0 (u 0…0.9)
  const p = (u + 0.25) / 1.1
  if (p < 0 || p > 1) return
  const cx = lerp(-60, 1180, p), cy = 560 - 160 * Math.sin(Math.PI * p), rot = -0.5 + 1.6 * p
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -110, -60, 220, 130, '#2a2148', { b: 6 })
  for (let i = 0; i < 6; i++) R(x, i % 2 ? BONE : INK, -110 + i * 37, -96, 37, 30)
  x.font = `900 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('TAKE 11', 0, 8)
  x.restore()
}

function clipboard(x, t, S) {
  const k = pop01(t, S.T.C1 + 0.05, 0.3, 2.4)
  if (k <= 0.01) return
  x.save(); x.translate(205, 880); x.rotate(-0.12 + 0.03 * Math.sin(t * 3)); x.scale(k, k)
  box(x, -95, -130, 190, 260, '#c89a5a', { b: 6 }); R(x, BONE, -78, -100, 156, 216); box(x, -36, -146, 72, 26, '#8a8aa0', { b: 4 })
  x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText('VOICE NOTE', -66, -78)
  for (let i = 0; i < 7; i++) { R(x, INK, -66, -50 + i * 24, 14, 14); if (i < 5) R(x, MINT, -63, -47 + i * 24, 8, 8); R(x, '#8a8098', -42, -46 + i * 24, 96 - (i % 3) * 18, 7) }
  x.font = `700 18px ${MONO}`; x.fillStyle = RED; x.fillText('step 6/14', -66, 126)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse01', sign: 'virgo', D: 10, ending: 'loop', brk: 'scratch', scratchCap: 'take eleven. *eleven.*',
  hook: 'Who re-records a | voice note *eleven times?*',
  clues: ['a 14-step checklist', 'a label maker'],
  last: 'Take one was already *lovely,* Virgo.',
  draw(x, S) {
    const { t, u, rv } = S
    const i = takeAt(u), du = u - TAKES[i], del = du > 0.78 && t < S.R - 0.6
    // frame 0: mid-gasp, stretched and tilted; deletes: a frustrated squash + shake
    const gasp = Math.exp(-u * 3)
    const shake = del ? 0.06 * Math.sin(u * 50) * Math.exp(-(du - 0.78) * 6) : 0
    const hops = TAKES.flatMap(a => [a + 0.12, a + 0.4, a + 0.62]).filter(h => h < S.R - 0.3)
    const mood = rv > 0.5 ? 'happy' : del ? 'squint' : u < 0.6 ? 'wide' : 'neutral'
    shadow(x, 520, 1240, 300)
    S.sil({ x: 500, y: 1000, s: 400, mood, look: [1, -0.2], hops, rot: -0.14 * gasp + shake, squash: -0.12 * gasp + (del ? 0.08 : 0) })
    // the phone at its mouth
    const pk = 1
    phone(x, 770, 900 + 6 * Math.sin(t * 4), { w: 220, h: 330, rot: 0.16 + (del ? 0.05 * Math.sin(u * 40) : 0), fn: screen(u, S), k: pk })
    // label-maker label on the phone (clue 2)
    if (S.T.C2 != null && t > S.T.C2 + 0.1) {
      const k = pop01(t, S.T.C2 + 0.1, 0.25, 2.6)
      x.save(); x.translate(800, 1100); x.rotate(0.16); x.scale(k, k); box(x, -88, -20, 176, 40, '#f2f0e8', { b: 4 })
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('MY PHONE', 0, 1); x.restore()
    }
    clipboard(x, t, S)
    clapper(x, u)
    if (rv > 0.5) sparkles(x, t, 770, 880, S.R + 0.1, 10, 170, 2, [MINT, BONE, GOLD])
    if (rv > 0.5) bubble(x, t, 330, 700, S.R + 0.35, S.D + 1, 'okay. sending it.', { size: 34, tail: 0.4 })
  },
  cues: [
    ...TAKES.slice(0, 4).flatMap(a => { const tt = realT(a + 0.78); return [['pop', tt, 220, 0.05, 0.3], ['pop', tt + 0.07, 175, 0.04, 0.3], ['tick', tt, 0.06]] }),
    ['whoosh', 0.02, 0.5, 0.05],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
