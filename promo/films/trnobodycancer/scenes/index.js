// trnobodycancer: NOBODY: · "Cancer after one voice note:" (15 s vertical, Star Talk Trends §2.2, music: chiptune · B)
// Story 0–10.6, then the shared end card. The format's look lives in ./nobody.js (identical in all five NOBODY: films).
//   0.00–2.72  "Nobody:"  the blank meme card, a blinking caret, crickets, a tumbleweed. Silence.
//   2.72       card cut → "Cancer after *one voice note:*" (drop 2.82). A voice-note bubble slides in (▶ 0:04, "from: them ♡")
//              and plays; ♋ Cancer melts. ♓ Pisces, listening in from the corner, sniffles.
//   4.3        ♋: "filing this under *'they said night.'*" The bubble flies into a little pink shell box on a shelf;
//              the lid snaps shut; label: #1 'NIGHT!'.
//   5.5–6.8    the escalation: the shelf fills, box after box, each labeled: #2 LAUGH · #3 MY NAME · #4 SNEEZE (CUTE) ·
//              #5 'HMM' · #6 HUMMING. A plaque drops: ARCHIVE · EST. TUESDAY. Cancer puts on tiny archivist glasses.
//   7.75       ♋, proudly: "Sentimental? *Archival*."  Pisces: fountains.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import {
  makeNobody, T, GOLD, BONE, INK, MONO, INTER, MEME, R, r3, pop01, outK, drawBits, sparkles, sticker, star, starFrame, inSprite, pisces,
} from './nobody.js'

const CAN = signStar('cancer')
const CSP = `${CAN.glyph}︎ CANCER`
const LINES = [{ t: 4.3, speaker: CSP, color: '#8fd8ff', text: "filing this under *'they said night.'*" }]

const E = { vn: 3.05, play: [3.3, 4.1], melt: 3.75, fly: [4.55, 4.95], shut: 4.95, boxes: [5.5, 5.75, 6.0, 6.25, 6.5], plaque: 6.8, specs: 7.05 }
const VN = { x: 610, y: 650 }
const SLOTS = [[700, 700], [900, 700], [700, 905], [900, 905], [700, 1110], [900, 1110]]
const LABELS = ["#1 'NIGHT!'", '#2 LAUGH', '#3 MY NAME', '#4 SNEEZE (CUTE)', "#5 'HMM'", '#6 HUMMING']
const SHELL = ['....PPPPP....', '..PPpPpPpPP..', '.PpPPpPpPPpP.', 'PPpPPpPpPPpPP', 'PpPPPpPpPPPpP', 'PPpPPpPpPPpPP', '.PPpPpPpPpPP.', '..PPPPPPPPP..', '....LLLLL....', '...LLLLLLL...']
const SHELL_C = [{ P: '#ffc7d6', p: '#e98aa6', L: '#d97a95' }, { P: '#ffe0b8', p: '#e6a86a', L: '#c98b4a' }, { P: '#cdeaff', p: '#7fb8e8', L: '#5f94c8' }]
const boxAt = i => (i === 0 ? E.shut : E.boxes[i - 1])

const CAN_P = { x: 300, y: 1085, s: 260 }
const CAN_HOPS = [T.drop + 0.1, E.melt, 4.35, 4.75, E.shut + 0.05, ...E.boxes.map(b => b + 0.02), E.specs, T.P + 0.02, T.PLate + 0.05, T.PLate + 0.5]

function voiceNote(x, t, k) {
  if (t < E.vn) return
  const inK = ease.outBack(prog(t, E.vn, E.vn + 0.35))
  const fl = ease.inOutCubic(prog(t, ...E.fly))
  if (fl >= 1) return
  const cx = lerp(lerp(1200, VN.x, inK), SLOTS[0][0], fl), cy = lerp(VN.y, SLOTS[0][1], fl), s = lerp(1, 0.2, fl)
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(fl * 0.6)
  const w = 400, h = 120
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 10, -h / 2 + 12, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, MEME, -w / 2, -h / 2, w, h)
  R(x, INK, -w / 2 + 30, h / 2 + 2, 26, 16); R(x, MEME, -w / 2 + 34, h / 2 - 2, 18, 12)
  // ▶ button
  const pc = '#3fb6f0'
  R(x, INK, -w / 2 + 22, -34, 68, 68); R(x, pc, -w / 2 + 26, -30, 60, 60)
  for (let j = 0; j < 7; j++) R(x, '#fff', -w / 2 + 44, -18 + j * 5, 6 + (j < 4 ? j : 6 - j) * 6, 5)
  // the waveform: bounces while it plays, a playhead sweeps
  const pl = prog(t, ...E.play), playing = t > E.play[0] && t < E.play[1]
  for (let i = 0; i < 18; i++) {
    const hh = 10 + 34 * Math.abs(Math.sin(i * 1.9 + 0.7)) * (playing ? 0.6 + 0.4 * Math.abs(Math.sin(t * 14 + i)) : 0.75)
    R(x, i / 18 < pl ? pc : '#b9b2cc', -w / 2 + 112 + i * 12, -hh / 2, 7, hh)
  }
  x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'
  x.fillText(playing ? `0:0${Math.min(4, 1 + Math.floor(pl * 4))}` : '0:04', w / 2 - 18, 2)
  x.font = `700 24px ${INTER}`; x.textAlign = 'left'; x.fillStyle = 'rgba(239,230,214,0.85)'
  x.fillText('from: them ♡', -w / 2, -h / 2 - 28)
  x.restore()
}

function shelf(x, t, k) {
  const sk = pop01(t, E.fly[0] - 0.1, 0.4, 1.8) * k
  if (sk <= 0.01) return
  x.save(); x.globalAlpha *= clamp(sk)
  for (let r = 0; r < 3; r++) {
    const y = 700 + r * 205 + 58
    R(x, INK, 585, y, 430, 26); R(x, '#8a5a2b', 591, y + 4, 418, 14); R(x, '#b07a44', 591, y + 4, 418, 4)
  }
  R(x, INK, 585, 600, 16, 600); R(x, INK, 999, 600, 16, 600)
  x.restore()
  SLOTS.forEach(([sx, sy], i) => {
    const b = boxAt(i)
    if (t < b - 0.3) return
    const drop = ease.outBounce ? 0 : 0
    void drop
    const fall = ease.inQuad(prog(t, b - 0.3, b)), land = t > b ? 0.12 * Math.exp(-(t - b) * 9) * Math.cos((t - b) * 30) : 0
    const y = lerp(sy - 260, sy, fall)
    drawBits(x, SHELL, SHELL_C[i % 3], sx, y, 9, { alpha: clamp(fall * 3) * k, sx: 1 + land, sy: 1 - land })
    if (t > b) sticker(x, t, b + 0.05, sx, sy + 40, LABELS[i], { size: 19, pad: 10, rot: i % 2 ? 0.05 : -0.05, out: k, accent: '#3fb6f0' })
    if (i === 0) sparkles(x, t, sx, sy, b, 8, 90, 1, [GOLD, BONE, '#ff8fb1'])
  })
  sticker(x, t, E.plaque, 800, 575, 'ARCHIVE · EST. TUESDAY', { size: 26, rot: 0.03, out: k, bg: GOLD })
}

// tiny archivist glasses, seated on the sprite (cell coordinates)
function specs(x, t, F, k) {
  const on = ease.outBack(prog(t, E.specs, E.specs + 0.3))
  if (on <= 0 || k <= 0.01) return
  inSprite(x, F, () => {
    x.save(); x.translate(0, (1 - on) * -8); x.globalAlpha *= clamp(on * 2) * clamp(k)
    for (const ex of [10, 21]) {
      x.fillStyle = INK; x.fillRect(ex, 15, 6, 1); x.fillRect(ex, 21, 6, 1); x.fillRect(ex, 15, 1, 7); x.fillRect(ex + 5, 15, 1, 7)
      x.fillStyle = 'rgba(200,240,255,0.35)'; x.fillRect(ex + 1, 16, 4, 5)
    }
    x.fillStyle = INK; x.fillRect(16, 17, 5, 1)
    x.restore()
  })
}

function scene(x, t, Tm, k) {
  if (k <= 0) return
  // ♓ Pisces, listening in from the corner
  const pp = pop01(t, Tm.drop + 0.35, 0.3, 2) * k
  pisces(x, t, { x: 150, y: 700, s: 140, pop: pp }, t > Tm.PLate ? 3 : t > E.melt ? 2 : 1, t > E.melt ? 'sparkle' : 'neutral', [1, 0])
  shelf(x, t, k)
  voiceNote(x, t, k)
  // ♋ Cancer
  const cp = pop01(t, Tm.drop, 0.36, 2.1) * k
  let m = 'happy', l
  if (t > E.play[0]) { m = 'wide'; l = [1, -0.6] }
  if (t > E.melt) { m = 'sparkle'; l = [1, -0.6] }
  if (t > 4.3) { m = 'happy'; l = undefined }
  if (t > E.boxes[0] - 0.1) { m = 'squint'; l = [1, -0.3] }
  if (t > E.specs) { m = 'neutral'; l = [0, 0] }
  if (t > Tm.PLate) { m = 'happy'; l = undefined }
  const P = { ...CAN_P, pop: cp }
  const o = { color: CAN.color, glyph: CAN.glyph, mood: m, look: l, hops: CAN_HOPS, seed: 3, glow: 1.1, blink: m === 'neutral' && t > E.specs && t < Tm.P ? false : undefined }
  star(x, t, P, o)
  specs(x, t, starFrame(P.x, P.y, P.s, t, { pop: cp, hops: CAN_HOPS, seed: 3 }), k)
  // melting hearts at the voice note
  if (t > E.melt && t < E.fly[1]) for (let i = 0; i < 4; i++) {
    const ph = (t - E.melt - i * 0.2) / 1.0
    if (ph < 0 || ph > 1) continue
    drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, P.x + 60 + i * 30, P.y - 150 - ph * 160, 6, { alpha: (1 - ph) * k })
  }
  sparkles(x, t, P.x, P.y - 40, Tm.PLate, 10, 170, 2, ['#8fd8ff', BONE, GOLD])
}

const EP = makeNobody({
  caption: 'Cancer after *one voice note:*', capAccent: '#1f86c4',
  last: 'Sentimental? *Archival*.', lastAccent: '#8fd8ff',
  lines: LINES,
  scene,
  cues: Tm => [
    ['pop', r3(Tm.drop + 0.02), 739.99, 0.04, -0.3], ['pop', r3(Tm.drop + 0.37), 987.77, 0.025, -0.5],
    ['whoosh', E.vn, 0.3, 0.035], ['pop', r3(E.vn + 0.3), 1318.51, 0.035, 0.3],
    // the voice note plays: a little babble of blips
    ...Array.from({ length: 9 }, (_, i) => ['pop', r3(E.play[0] + 0.05 + i * 0.085), [587.33, 659.25, 739.99, 659.25, 880, 739.99, 659.25, 587.33, 880][i] * 1.5, 0.014, 0.3]),
    ['pluck', E.melt, 1174.66, 0.04, 0.6, -0.2], ['pluck', r3(E.melt + 0.12), 987.77, 0.035, 0.6, -0.2],
    ['whoosh', E.fly[0], 0.4, 0.03], ['tick', E.shut, 0.07], ['pop', E.shut, 880, 0.05, 0.3], ['glitter', E.shut, r3(E.shut + 0.35)],
    ...E.boxes.map((b, i) => ['tick', b, 0.05]), ...E.boxes.map((b, i) => ['pop', r3(b + 0.05), [987.77, 1174.66, 1318.51, 1174.66, 1567.98][i], 0.03, 0.35]),
    ['pop', E.plaque, 1567.98, 0.04, 0.3], ['bell', r3(E.plaque + 0.05), 2349.32, 0.025, 0.8, 0.3],
    ['tick', r3(E.specs + 0.2), 0.04], ['pop', r3(E.specs + 0.22), 2093, 0.02, -0.3],
  ],
})
void MEME; void INK

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
