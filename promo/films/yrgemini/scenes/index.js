// yrgemini: THEN vs NOW, "Gemini dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now, Block A #3, music: pop · E)
// The format's look lives in ./thennow.js (identical in yraries, yrtaurus, yrgemini, yrcancer, yrleo).
//   0–6.71    2016, two bedrooms side by side at night (old-phone grade, "11·02·2016"). A chunky old phone fills the
//             middle: ♊ Gemini's texts pile up faster and faster ("hey" "hi" "ok so" "wait" "LOL" …) while the counter
//             races to 40. ♒ Aquarius' phone won't stop buzzing; the battery drops to 1%. Gemini: "also hi". Aquarius
//             falls asleep mid-buzz. ♓ Pisces reads along from below, crying.
//   6.71      card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the same rooms, crisp. Gemini sends ONE message… a voice note. The timer races 0:01 → 9:12.
//             Aquarius: "nine… minutes?" taps 2×, listens, goes heart-eyed, and answers with a 0:09 voice note.
//   12.8–15.6 the 2016 polaroid next to 2026; THE STARS: "fewer messages. *technically.*"; last "*Growth*. Kind of."
import {
  makeThenNow, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3,
  INK, BONE, GOLD, PINK, MONO, INTER, HEART, SW, lerp, prog, ease, clamp,
} from './thennow.js'

const GEM = signStar('gemini'), AQU = signStar('aquarius')
const MSGS = ['hey', 'hi', 'ok so', 'wait', 'LOL', 'lol', 'ok but', 'brb', 'back', 'anyway', 'hiii', 'wait no', 'ok', 'so like', 'haha', 'HAHA', 'also', 'one sec', 'ok ok', 'listen']

function rooms(x, t, now) {
  R(x, now ? '#fff1c8' : '#7a5a2a', 0, 0, SW / 2, 1060)
  R(x, now ? '#d6f2ff' : '#2f4a6a', SW / 2, 0, SW / 2, 1060)
  // windows with night sky
  for (const wx of [60, 640]) { R(x, INK, wx - 8, 70, 216, 180); R(x, now ? '#2a2f6a' : '#1f1a3a', wx, 78, 200, 164); R(x, INK, wx + 96, 78, 8, 164); R(x, '#fff1c8', wx + 40, 110, 5, 5); R(x, '#fff1c8', wx + 150, 150, 5, 5) }
  // beds
  R(x, INK, 0, 880, SW / 2 - 20, 180); R(x, now ? '#ffb04a' : '#a0503a', 0, 886, SW / 2 - 26, 170)
  R(x, INK, SW / 2 + 20, 880, SW / 2, 180); R(x, now ? '#7fd0ff' : '#3a5a8a', SW / 2 + 26, 886, SW / 2, 170)
  R(x, INK, SW / 2 - 6, 0, 12, 1060)
}
function phoneShell(x, cx, cy, w, h, old) {
  if (old) {
    R(x, INK, cx - w / 2 - 30, cy - h / 2 - 70, w + 60, h + 160)
    R(x, '#3b3846', cx - w / 2 - 24, cy - h / 2 - 64, w + 48, h + 148)
    R(x, '#54505f', cx - w / 2 - 24, cy - h / 2 - 64, w + 48, 10)
    R(x, INK, cx - 26, cy + h / 2 + 22, 52, 40); R(x, '#2a2633', cx - 20, cy + h / 2 + 28, 40, 28)
    R(x, '#1a1826', cx - 30, cy - h / 2 - 40, 60, 8)
  } else {
    R(x, INK, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28)
    R(x, '#efe6d6', cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16)
  }
  R(x, old ? '#d9ecf5' : '#fffaf0', cx - w / 2, cy - h / 2, w, h)
}
function bubble(x, cx, cy, text, right, col, size = 29) {
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 30, h = size + 18
  const l = right ? cx - w : cx
  R(x, INK, l - 3, cy - h / 2 - 3, w + 6, h + 6); R(x, col, l, cy - h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, l + 15, cy + 1)
}
function smallPhone(x, cx, cy, buzz, t) {
  const j = buzz ? 4 * Math.sin(t * 90) : 0
  R(x, INK, cx - 26 + j, cy - 44, 52, 88); R(x, '#4a4652', cx - 21 + j, cy - 39, 42, 78); R(x, '#9fd8ff', cx - 16 + j, cy - 32, 32, 54)
  if (buzz) for (const d of [-1, 1]) { R(x, INK, cx + d * 44, cy - 20, 6, 14); R(x, INK, cx + d * 56, cy - 28, 6, 30) }
}

// ── THEN: the texting marathon
const A = { start: 0.8, end: 5.0, batt1: 4.7, alsoHi: 5.25, sleep: 5.6 }
const nAt = t => Math.floor(40 * ease.inQuad(prog(t, A.start, A.end)))
function sceneA(x, t) {
  rooms(x, t, false)
  const n = nAt(t)
  // the big chunky phone
  const PX = 450, PY = 440, PW = 330, PH = 470
  phoneShell(x, PX, PY, PW, PH, true)
  x.save(); x.beginPath(); x.rect(PX - PW / 2, PY - PH / 2 + 50, PW, PH - 50); x.clip()
  const all = [...Array.from({ length: n }, (_, i) => MSGS[(i * 7) % MSGS.length]), ...(t > A.alsoHi ? ['also hi'] : [])]
  const shown = all.slice(-9)
  shown.forEach((m, i) => bubble(x, PX + PW / 2 - 16, PY + PH / 2 - 34 - (shown.length - 1 - i) * 50, m, true, i === shown.length - 1 ? '#ffe36a' : '#fff3b0'))
  x.restore()
  // phone header: counter + battery
  R(x, '#2a2633', PX - PW / 2, PY - PH / 2, PW, 50)
  x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(`${Math.min(40, n)} SENT`, PX - PW / 2 + 14, PY - PH / 2 + 26)
  const batt = t > A.batt1 ? 1 : Math.max(1, Math.round(100 - 99 * prog(t, A.start, A.batt1)))
  const blink = t > A.batt1 && Math.floor(t * 6) % 2
  R(x, BONE, PX + PW / 2 - 70, PY - PH / 2 + 14, 52, 24); R(x, '#2a2633', PX + PW / 2 - 67, PY - PH / 2 + 17, 46, 18)
  R(x, batt < 20 ? '#ff4f4f' : '#5fd38a', PX + PW / 2 - 67, PY - PH / 2 + 17, Math.max(3, 46 * batt / 100), 18)
  if (t > A.batt1) { x.font = `800 30px ${INTER}`; x.fillStyle = blink ? '#ff4f4f' : BONE; x.textAlign = 'right'; x.fillText('1%', PX + PW / 2 - 78, PY - PH / 2 + 28) }
  // Gemini types (thumbs flying), Aquarius buzzes
  const gH = Array.from({ length: 14 }, (_, i) => r3(A.start + 0.3 + i * 0.3))
  drawStarChar(x, 160, 790, 250, t, { color: GEM.color, glyph: GEM.glyph, mood: t > A.alsoHi ? 'wink' : 'happy', look: [1, -1], seed: 4, hops: gH })
  smallPhone(x, 280, 800, false, t)
  const lastAt = A.start + (A.end - A.start) * Math.sqrt(Math.max(0, n) / 40)
  const buzz = t > A.start && t < A.sleep && (t - lastAt < 0.25 || n > 20)
  let am = 'neutral'
  if (n > 8) am = 'wide'
  if (n > 28) am = 'squint'
  if (t > A.sleep) am = 'sleepy'
  drawStarChar(x, 745, 790, 250, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: [-1, -1], seed: 9, squash: buzz ? 0.04 * Math.sin(t * 80) : 0 })
  smallPhone(x, 630, 800, buzz, t)
  // ♓ reads along from below, crying
  pisces(x, t, 450, 980, 110, n > 25 ? 3 : 2, { mood: 'wide', look: [0, -1], seed: 6 })
  speech(x, t, 170, 610, A.alsoHi, 'also hi', { size: 36, tail: -1, life: 1.2, col: '#fff3b0' })
}

// ── NOW: one voice note… nine minutes long
const B = { rec: 7.2, recEnd: 9.55, sent: 9.7, nine: 10.15, speed: 10.85, listen: 11.1, heart: 11.55, reply: 11.95 }
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
function wave(x, cx, cy, w, n, t, live, col) {
  const bw = w / n
  for (let i = 0; i < n; i++) {
    const h = 10 + 34 * Math.abs(Math.sin(i * 1.7 + (live ? t * 9 : 0)) * Math.sin(i * 0.43 + 1))
    R(x, col, cx - w / 2 + i * bw + 1, cy - h / 2, bw - 3, h)
  }
}
function sceneB(x, t) {
  rooms(x, t, true)
  const PX = 450, PY = 440, PW = 360, PH = 520
  phoneShell(x, PX, PY, PW, PH, false)
  const top = PY - PH / 2, l = PX - PW / 2
  if (t < B.sent) {
    // recording
    const sec = Math.min(552, 552 * ease.inQuad(prog(t, B.rec, B.recEnd)))
    x.font = `700 72px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(fmt(sec), PX, top + 170)
    wave(x, PX, top + 290, PW - 60, 16, t, t > B.rec, '#7a5cc4')
    const on = Math.floor(t * 3) % 2
    R(x, INK, PX - 54, top + 380, 108, 108); R(x, on ? '#ff4f4f' : '#e03a3a', PX - 46, top + 388, 92, 92)
    x.font = `700 22px ${MONO}`; x.fillStyle = '#e03a3a'; x.fillText('● REC', PX, top + 60)
  } else {
    // the thread: one very long voice note, then a short reply
    const k = pop01(t, B.sent, 0.3, 2.2)
    x.save(); x.translate(PX + 150, top + 170); x.scale(k, k)
    R(x, INK, -303, -45, 306, 90); R(x, '#fff3b0', -300, -42, 300, 84)
    drawBits(x, ['P..', 'PP.', 'PPP', 'PP.', 'P..'], { P: INK }, -270, 0, 6, { outline: null })
    wave(x, -168, 0, 124, 9, t, t > B.listen && t < B.reply, '#b08a1a')
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('9:12', -16, 2)
    x.restore()
    if (t > B.speed) { const s = pop01(t, B.speed, 0.25, 3); x.save(); x.translate(PX + 110, top + 245); x.scale(s, s); R(x, INK, -38, -22, 76, 44); R(x, '#7fd0ff', -35, -19, 70, 38); x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('2×', 0, 2); x.restore() }
    if (t > B.reply) {
      const r = pop01(t, B.reply, 0.3, 2.2)
      x.save(); x.translate(l + 20, top + 340); x.scale(r, r)
      R(x, INK, -3, -45, 196, 90); R(x, '#d6f2ff', 0, -42, 190, 84)
      drawBits(x, ['P..', 'PP.', 'PPP', 'PP.', 'P..'], { P: INK }, 30, 0, 6, { outline: null })
      wave(x, 76, 0, 44, 3, t, false, '#3a7aa8')
      x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('0:09', 178, 2)
      x.restore()
    }
  }
  // Gemini talks the whole time (hops), phone held up
  const gH = Array.from({ length: 8 }, (_, i) => r3(B.rec + 0.2 + i * 0.29))
  drawStarChar(x, 160, 790, 250, t, { color: GEM.color, glyph: GEM.glyph, mood: t > B.sent ? 'sparkle' : 'happy', look: t > B.sent ? [1, 0] : undefined, seed: 4, hops: [...gH, B.sent] })
  smallPhone(x, 280, 760, false, t)
  if (t > B.rec && t < B.recEnd) for (let i = 0; i < 3; i++) { const p = ((t - B.rec) * 1.5 + i / 3) % 1; x.save(); x.globalAlpha = 1 - p; drawBits(x, ['.W.', 'W.W', '.W.'], { W: '#b08a1a' }, 300 + p * 70, 660 - p * 60 - i * 6, 5, { outline: null }); x.restore() }
  let am = 'happy', al
  if (t > B.sent) { am = 'neutral'; al = [-1, -1] }
  if (t > B.nine - 0.1) { am = 'wide'; al = [-1, -1] }
  if (t > B.listen) { am = 'happy'; al = undefined }
  if (t > B.heart) am = 'heart'
  drawStarChar(x, 745, 790, 250, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: al, seed: 9, hops: [B.nine, B.speed, B.reply] })
  smallPhone(x, 630, 790, t > B.sent && t < B.sent + 0.4, t)
  pisces(x, t, 450, 980, 110, t > B.heart ? 3 : 1, { mood: t > B.heart ? 'happy' : 'sparkle', look: [0, -1], seed: 6 })
  speech(x, t, 740, 620, B.nine, 'nine…\nminutes?', { size: 38, tail: 1, life: 1.0 })
  speech(x, t, 740, 620, B.reply, 'same.', { size: 40, tail: 1, life: 0.8, col: '#ffe1ec' })
  if (t > B.heart) hearts(x, t, 790, 760, B.heart, { n: 6, life: 1.3, cell: 6, spread: 120 })
}

const EP = makeThenNow({
  id: 'yrgemini', thing: 'Gemini dating in', then: '2016', stamp: '11·02·2016', accent: '#ffe36a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: a *texting marathon.* every night.' },
    { t: 9.25, text: 'one message. *nine minutes* long.' },
    { t: 12.92, text: 'fewer messages. *technically.*' },
  ],
  last: '*Growth.* | Kind of.',
  cues: () => {
    const pops = []
    let prev = -1
    for (let s = A.start; s < A.end; s += 0.05) { const n = nAt(s); if (n !== prev && n > 0) { pops.push(['pop', r3(s), 880 + (n % 5) * 110, 0.016 + 0.0004 * n, 0.2]); prev = n } }
    return [
      ...pops,
      ['pop', A.batt1, 440, 0.04, 0.3], ['pop', A.alsoHi, 1174.66, 0.04, -0.3], ['pluck', A.sleep, 523.25, 0.03, 0.5, 0.3],
      ['tick', B.rec, 0.05], ['riser', B.rec, B.recEnd, 0.03], ['whoosh', B.sent, 0.3, 0.04], ['pop', B.sent, 1318.51, 0.05, 0],
      ['pop', B.nine, 659.25, 0.04, 0.4], ['tick', B.speed, 0.05], ['pop', B.speed, 1567.98, 0.03, 0.4],
      ['pluck', B.heart, 1567.98, 0.04, 0.5, 0.3], ['pop', B.reply, 1046.5, 0.04, 0.3], ['glitter', B.heart, r3(B.heart + 0.4)],
    ]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
