// trsilentvoice: SILENT REVIEW, "Silent review: a good-morning voice note." (20 s vertical, Star Talk Trends §16,
// music: jazzy · Gb). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (identical in all five).
// ♉ Taurus, not a morning star, reviews a 7:02 AM voice note from ♎ Libra. Not one word: the captions narrate the face.
//   0.0–2.1    hook: "Silent review: | *a good-morning voice note.*" Libra slides a phone across (7:02 AM, one voice note)
//              and ducks behind the desk. Taurus wears a sleep mask pushed up. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: play. Squinting. CC "[ 7:02 AM. unimpressed. ]" → the transcript: "good morning, sleepy." One
//              eyebrow lifts: "[ one eyebrow: awake now ]".
//   5.0–7.9    REACTION 2: "you're my first thought." Slow, sleepy nods. CC "[ slow, sleepy nod ]" → a sneaky tap:
//              "[ hits replay ]" (REPLAY ×2).
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): "can't wait to see you." The replay counter climbs ×3 ×5 ×9. CC "[ replays it.
//              again. ]" → ONE tear: "[ a single tear ]" → "[ replay count: *9* ]".
//   11.4–15.5  THE VERDICT: Voice ★★★★★ · 7 AM timing ★★★☆☆ · Replays *all morning* · TOTAL 10/10.
//              Top caption: "*Play it* again."
import { makeSilent, R, box, drawBits, sparkles, label, drawPixelStar, ramp, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, LAV, SERIF, MONO, INTER, T } from './silentkit.js'

const B = T.beats
const ACC = '#ffd36a'
const SAY = ['good morning, sleepy.', 'you’re my first thought.', 'can’t wait to see you.']
// replay taps: when the playhead restarts
const REPLAYS = [B[1][0] + 1.8, B[2][0] + 0.3, B[2][0] + 0.75, B[2][0] + 1.15, B[2][0] + 1.5, B[2][0] + 1.8, B[2][0] + 2.05, B[2][0] + 2.25]
const COUNT = [2, 3, 4, 5, 6, 7, 8, 9]

function replayCount(t) { let n = 1; REPLAYS.forEach((r, i) => { if (t >= r) n = COUNT[i] }); return n }
function lastReplay(t, t0) { let r = t0; for (const v of REPLAYS) if (t >= v) r = Math.max(r, v); return r }

function phone(x, t, P, S) {
  const g = S.gift
  if (g <= 0) return
  const cx = lerp(250, 540, g), cy = 1170, rot = lerp(-0.3, -0.02, g), w = 460, h = 228
  const playing = P.ph !== 'hook' && !(P.i === 0 && P.u < 0.45)
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 7 })
  R(x, '#15102c', -w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
  x.textBaseline = 'middle'; x.textAlign = 'left'
  x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.fillText('7:02 AM', -w / 2 + 32, -h / 2 + 40)
  drawPixelStar(x, w / 2 - 50, -h / 2 + 40, 26, 1, GOLD)
  // the voice-note bubble
  box(x, -w / 2 + 30, -h / 2 + 66, w - 60, 74, '#3f6fb0', { b: 4 })
  // play / pause
  const pk = P.ph === 'score' ? 1 : 1
  if (playing) { R(x, BONE, -w / 2 + 50, -h / 2 + 86, 10, 34); R(x, BONE, -w / 2 + 66, -h / 2 + 86, 10, 34) }
  else { x.fillStyle = BONE; x.beginPath(); x.moveTo(-w / 2 + 50, -h / 2 + 84); x.lineTo(-w / 2 + 80, -h / 2 + 103); x.lineTo(-w / 2 + 50, -h / 2 + 122); x.closePath(); x.fill() }
  // waveform + playhead (restarts on every replay)
  const t0 = playing ? lastReplay(t, P.ph === 'score' ? T.score : P.i === 0 ? P.t0 + 0.45 : P.t0) : t
  const ph = playing ? ((t - t0) / 1.6) % 1 : 0
  for (let i = 0; i < 22; i++) {
    const hh = 8 + 34 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))
    const bx = -w / 2 + 100 + i * 12
    R(x, i / 22 < ph ? '#ffffff' : 'rgba(239,230,214,0.45)', bx, -h / 2 + 103 - hh / 2, 7, hh)
  }
  x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.fillText('0:07', w / 2 - 44, -h / 2 + 103)
  // the transcript line
  const si = P.ph === 'score' ? 2 : P.ph === 'hook' ? -1 : P.i
  if (si >= 0 && playing) {
    const a = P.ph === 'score' ? 1 : clamp(prog(P.u, P.i === 0 ? 0.75 : 0.25, (P.i === 0 ? 0.75 : 0.25) + 0.2))
    x.globalAlpha = a; x.textAlign = 'center'; x.font = `italic 500 34px ${SERIF}`; x.fillStyle = '#fff1c8'
    x.fillText(`“${SAY[si]}”`, 0, h / 2 - 44)
  }
  x.restore()
  // the replay counter tag
  const n = replayCount(t)
  if (n >= 2 && P.ph !== 'hook') {
    const lr = lastReplay(t, 0), k = 1 + 0.35 * Math.exp(-(t - lr) * 8)
    x.save(); x.translate(300, 1046); x.rotate(-0.08); x.scale(k, k)
    box(x, -110, -32, 220, 64, n >= 9 ? '#e8344e' : '#ff8fb1', { b: 6 })
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`REPLAY ×${n}`, 0, 2)
    x.restore()
    if (P.i >= 1) sparkles(x, t, 300, 1046, lr, 8, 110, n, [PINK, GOLD, BONE])
  }
  void pk
}

// a sleep mask pushed up on the forehead (sprite cells)
function sleepMask(ctx) {
  ctx.fillStyle = INK; ctx.fillRect(3, 9.6, 30, 1.2)
  ctx.fillStyle = INK; ctx.fillRect(10.4, 7.6, 15.2, 5.2)
  ctx.fillStyle = LAV; ctx.fillRect(11.2, 8.4, 13.6, 3.6)
  ctx.fillStyle = '#e6d6ff'; ctx.fillRect(11.8, 8.8, 4, 1)
  ctx.fillStyle = GOLD; ctx.fillRect(16.4, 9.4, 1, 1); ctx.fillRect(19.4, 9.8, 1, 1)
}

const EP = makeSilent({
  id: 'trsilentvoice', reviewer: 'taurus', giver: 'libra', gift: 'a good-morning voice note.', accent: ACC,
  hookCC: '[ respectful silence ]', plate: 'TAURUS · CRITIC',
  beats: [
    { cc: [[0.3, '[ 7:02 AM. unimpressed. ]'], [1.6, '[ one eyebrow: *awake now* ]']],
      cues: [['tick', 0.45, 0.05], ['pop', 0.47, 987.77, 0.03, 0], ['glitter', 0.8, 1.0], ['pluck', 1.5, 659.25, 0.04, 0.35, 0.2], ['pluck', 1.62, 1318.51, 0.035, 0.4, 0.2]] },
    { cc: [[0.35, '[ slow, sleepy nod ]'], [1.8, '[ hits *replay* ]']],
      cues: [['tom', 0.95, 72, { gain: 0.12, decay: 0.22 }], ['tom', 1.95, 70, { gain: 0.1, decay: 0.22 }], ['glitter', 0.25, 0.5],
        ['tick', 1.8, 0.06], ['pop', 1.82, 1318.51, 0.04, 0.4], ['pop', 1.9, 1760, 0.03, 0.4]] },
    { cc: [[0.3, '[ replays it. again. ]'], [1.4, '[ a single tear ]'], [2.3, '[ replay count: *9* ]']],
      cues: [...REPLAYS.slice(1).flatMap((r, i) => [['tick', r3l(r - B[2][0]), 0.05], ['pop', r3l(r - B[2][0] + 0.02), [1174.66, 1318.51, 1567.98, 1760, 1975.53, 2093, 2349.32][i], 0.03, 0.4]]),
        ['bell', 1.35, 2637.02, 0.026, 1.8, -0.2], ['glitter', 2.25, 2.6]] },
  ],
  face(t, P, f) {
    const u = P.u
    if (P.i === 0) {
      f.mood = u < 1.5 ? 'squint' : 'neutral'
      f.look = u < 0.5 ? [0, 1] : [0, 0]
      f.brows = { l: ramp(u, 1.45, 1.75, -0.3, -0.2), r: ramp(u, 1.45, 1.75, -0.3, 1), sl: -0.4, sr: ramp(u, 1.45, 1.75, -0.4, -0.5) }
      f.mouth = u < 1.5 ? 'tight' : 'flat'
    } else if (P.i === 1) {
      f.mood = u < 1.75 ? 'sleepy' : 'neutral'
      f.look = u > 1.6 && u < 2.1 ? [0.6, 1] : [0, 0]
      f.nod = [{ at: P.t0 + 0.5, n: 2, period: 1.0, amp: 24 }]
      f.brows = { l: 0.1, r: 0.1, sl: 0.5, sr: 0.5 }
      f.mouth = u < 1.75 ? 'smile' : 'tight'
      if (u > 2.1) { f.look = [0, 0]; f.brows = { l: 0.6, r: -0.2, sl: 0, sr: -0.4 } }   // caught replaying: a "what?" brow at the lens
    } else {
      f.look = u < 1.0 ? [0, 1] : [0, 0]
      const touched = ramp(u, 0.9, 1.2, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 1.0 ? 'wobble' : 'tight'
      f.mood = u > 2.3 ? 'sparkle' : 'neutral'
      f.tear = P.t0 + 1.3
      f.shake = u > 1.0 ? 1.5 : 0
      f.blush = u > 1.0 ? 0.75 : 0.3
    }
    return f
  },
  wear(ctx) { sleepMask(ctx) },
  desk: phone,
  score: { rows: [['Voice', 5], ['7 AM timing', 3], ['Replays', '*all morning*']], total: '10/10' },
  last: '*Play it* again.',
})
function r3l(v) { return +v.toFixed(3) }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
