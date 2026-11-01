// trsilentplaylist: SILENT REVIEW, "Silent review: a playlist for me." (20 s vertical, Star Talk Trends §16,
// music: jazzy · Eb). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (identical in all five).
// ♏ Scorpio, unreadable as ever, reviews a playlist ♐ Sagittarius made. Not one word: the captions narrate the face.
//   0.0–2.1    hook: "Silent review: | *a playlist for me.*" Sagittarius slides a little pixel music player across
//              ("FOR YOU" + three made-up tracks) and ducks behind the desk. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: big headphones drop on; track 1 "rainy window hum" plays. CC "[ presses play. no notes. ]" →
//              one eyebrow climbs, straight down the lens: "[ one eyebrow: *intrigued* ]".
//   5.0–7.9    REACTION 2: track 2 "the café song (ours)". Slow nods to the beat, eyes shut. CC "[ nods to the beat.
//              slowly. ]" → eyes snap open: "[ recognizes the *café song* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): track 3 is "your laugh (live)": a recording of Scorpio laughing. "ha!" bubbles pop
//              out of the player. CC "[ track three starts ]" → "[ it's *their own laugh* ]" → ONE tear: "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Vibes ★★★★★ · Track order ★★★★★ · Track three *unfair (good)* · TOTAL 11/10.
//              Top caption: "*Track three* got me."
import { makeSilent, R, box, drawBits, sparkles, label, HEART, NOTE_BM, ramp, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MONO, INTER, T, REV } from './silentkit.js'

const B = T.beats
const ACC = '#7fd0ff'
const TRACKS = ['rainy window hum', 'the café song (ours)', 'your laugh (live)']

// which track is playing: −1 before play, then 0 / 1 / 2
const trackAt = (t, P) => P.ph === 'hook' ? -1 : P.ph === 'score' ? 2 : (P.i === 0 && P.u < 0.3 ? -1 : P.i)

// ── the little music player on the desk
function player(x, t, P, S) {
  const g = S.gift
  if (g <= 0) return
  const cx = lerp(250, 540, g), cy = 1172, rot = lerp(-0.3, -0.02, g), w = 470, h = 236
  const tr = trackAt(t, P)
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, '#3a2d66', { b: 7, hi: '#5a4a8a' })
  R(x, '#120d26', -w / 2 + 16, -h / 2 + 20, w - 32, h - 40)
  x.textBaseline = 'middle'; x.textAlign = 'left'
  x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.fillText('FOR YOU', -w / 2 + 34, -h / 2 + 42)
  drawBits(x, HEART, { H: PINK }, -w / 2 + 160, -h / 2 + 41, 3.2)
  TRACKS.forEach((name, i) => {
    const ry = -h / 2 + 82 + i * 44, on = i === tr
    if (on) R(x, i === 2 ? '#b02860' : '#2f5a8a', -w / 2 + 24, ry - 19, w - 48, 38)
    x.font = `700 23px ${MONO}`; x.fillStyle = on ? '#ffffff' : 'rgba(239,230,214,0.7)'
    x.fillText(`${i + 1}  ${name}`, -w / 2 + 34, ry)
    if (on) for (let k = 0; k < 4; k++) { const hh = 6 + 18 * Math.abs(Math.sin(t * (7 + k) + k * 1.4)); R(x, '#ffffff', w / 2 - 70 + k * 10, ry + 12 - hh, 6, hh) }
  })
  // progress bar
  const pr = tr < 0 ? 0 : P.ph === 'score' ? 1 : prog(P.u, 0.3, P.t1 - P.t0)
  R(x, 'rgba(239,230,214,0.25)', -w / 2 + 24, h / 2 - 32, w - 48, 6); R(x, ACC, -w / 2 + 24, h / 2 - 32, (w - 48) * pr, 6)
  x.restore()
  // music notes drifting up from the headphones while it plays
  if (tr >= 0 && P.ph !== 'score') for (let k = 0; k < 6; k++) {
    const ph = ((t * 0.5 + k / 6) % 1), side = k % 2 ? 1 : -1
    const nx = REV.x + side * (160 + 40 * ph) + 12 * Math.sin(t * 3 + k), ny = 890 - ph * 260
    drawBits(x, NOTE_BM, { N: k % 3 ? BONE : ACC }, nx, ny, 5, { alpha: Math.sin(Math.PI * ph) * 0.9 })
  }
  // track three: the laugh comes out of the player
  if (P.i === 2) {
    const HA = [[0.6, 'ha!', 330, 1010], [0.85, 'haha', 760, 990], [1.1, 'HA!', 300, 900], [1.45, 'ha ha!', 790, 890], [1.9, 'hahaha', 300, 800], [2.4, 'ha!', 780, 790]]
    HA.forEach(([u0, s, hx, hy], i) => {
      const k = clamp(prog(P.u, u0, u0 + 0.12)) * (1 - clamp(prog(P.u, u0 + 1.1, u0 + 1.4)))
      if (k > 0.01) label(x, s, hx, hy - 30 * prog(P.u, u0, u0 + 1.4), { size: 46 * (0.7 + 0.3 * k), col: i % 2 ? PINK : GOLD, font: INTER, weight: 800, rot: i % 2 ? 0.12 : -0.12, alpha: k })
    })
    sparkles(x, t, 540, 1130, B[2][0] + 0.55, 10, 150, 1, [PINK, GOLD, BONE])
  }
  if (P.i === 1) sparkles(x, t, 540, 1120, B[1][0] + 1.8, 8, 140, 2, [ACC, GOLD, BONE])
}

// ── big headphones (sprite cells): drop 0 (above) → 1 (on)
function headphones(ctx, drop) {
  if (drop <= 0) return
  const dy = -(1 - drop) * 14
  ctx.save(); ctx.globalAlpha *= clamp(drop * 3)
  // the band: an arc over the top tip
  for (let a = Math.PI; a <= 2 * Math.PI + 0.01; a += Math.PI / 26) {
    const bx = 18 + Math.cos(a) * 14, by = 16 + Math.sin(a) * 15.5 + dy
    ctx.fillStyle = INK; ctx.fillRect(bx - 1.3, by - 1.3, 2.6, 2.6)
  }
  for (let a = Math.PI; a <= 2 * Math.PI + 0.01; a += Math.PI / 26) {
    const bx = 18 + Math.cos(a) * 14, by = 16 + Math.sin(a) * 15.5 + dy
    ctx.fillStyle = '#5a4a8a'; ctx.fillRect(bx - 0.6, by - 0.6, 1.3, 1.3)
  }
  // the cups
  for (const cx of [2.2, 29.8]) {
    ctx.fillStyle = INK; ctx.fillRect(cx - 0.8, 12.2 + dy, 5.6, 9.6)
    ctx.fillStyle = PINK; ctx.fillRect(cx, 13 + dy, 4, 8)
    ctx.fillStyle = '#ffd0e0'; ctx.fillRect(cx + 0.6, 13.6 + dy, 1.2, 3)
  }
  ctx.restore()
}

const EP = makeSilent({
  id: 'trsilentplaylist', reviewer: 'scorpio', giver: 'sagittarius', gift: 'a playlist for me.', accent: ACC,
  hookCC: '[ respectful silence ]', plate: 'SCORPIO · CRITIC',
  beats: [
    { cc: [[0.45, '[ presses play. no notes. ]'], [1.55, '[ one eyebrow: *intrigued* ]']],
      cues: [['whoosh', 0.05, 0.3, 0.03], ['tick', 0.3, 0.05], ['pop', 0.32, 1318.51, 0.03, 0], ['pluck', 1.45, 659.25, 0.04, 0.35, 0.2], ['pluck', 1.58, 1318.51, 0.035, 0.4, 0.2],
        ['tom', 2.45, 80, { gain: 0.08, decay: 0.15 }], ['tom', 2.9, 80, { gain: 0.08, decay: 0.15 }]] },
    { cc: [[0.4, '[ nods to the beat. slowly. ]'], [1.8, '[ recognizes the *café song* ]']],
      cues: [['tick', 0.05, 0.04], ['tom', 0.85, 72, { gain: 0.12, decay: 0.22 }], ['tom', 1.8, 70, { gain: 0.12, decay: 0.22 }], ['tom', 2.75, 68, { gain: 0.1, decay: 0.22 }],
        ['pluck', 1.8, 1567.98, 0.04, 0.5, 0.3], ['pop', 1.86, 1174.66, 0.035, 0.3], ['glitter', 1.8, 2.2]] },
    { cc: [[0.35, '[ track three starts ]'], [1.0, '[ it’s *their own laugh* ]'], [2.2, '[ a single tear ]']],
      cues: [['tick', 0.05, 0.04], ['glitter', 0.55, 0.8],
        ...[0.6, 0.85, 1.1, 1.45, 1.9, 2.4].flatMap((u, i) => [['pop', u, [1318.51, 1567.98, 1174.66, 1760, 1318.51, 1567.98][i], 0.035, i % 2 ? 0.4 : -0.4], ['pop', u + 0.09, [1567.98, 1760, 1318.51, 1975.53, 1567.98, 1760][i], 0.025, i % 2 ? 0.4 : -0.4]]),
        ['bell', 1.6, 2637.02, 0.026, 1.8, -0.2], ['pluck', 2.0, 1318.51, 0.02, 0.6, -0.2]] },
  ],
  face(t, P, f) {
    const u = P.u
    if (P.i === 0) {
      f.look = u < 0.4 ? [0, 1] : [0, 0]
      f.brows = { l: ramp(u, 1.4, 1.75, 0, -0.25), r: ramp(u, 1.4, 1.75, 0, 1), sl: -0.3, sr: ramp(u, 1.4, 1.75, 0, -0.6) }
      f.nod = [{ at: P.t0 + 2.35, n: 2, period: 0.45, amp: 9 }]
      f.mouth = 'flat'
    } else if (P.i === 1) {
      f.nod = [{ at: P.t0 + 0.4, n: 3, period: 0.95, amp: 22 }]
      const wow = u > 1.8
      f.mood = wow ? (u < 2.35 ? 'wide' : 'neutral') : 'sleepy'
      f.look = wow ? [0, 1] : [0, 0]
      f.brows = wow ? { l: ramp(u, 1.8, 1.95, 0.1, 0.95), r: ramp(u, 1.8, 1.95, 0.1, 0.95), sl: 0.2, sr: 0.2 } : { l: 0.1, r: 0.1, sl: 0.3, sr: 0.3 }
      f.mouth = wow ? (u < 2.35 ? 'o' : 'tight') : 'flat'
    } else {
      if (u > 0.55 && u < 1.0) { f.mood = 'wide'; f.look = [0, 1] }
      else f.look = [0, 0]
      const touched = ramp(u, 1.0, 1.3, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 0.55 && u < 1.0 ? 'o' : u > 1.0 ? 'wobble' : 'flat'
      if (u > 2.3) f.mood = 'sparkle'
      f.tear = P.t0 + 1.55
      f.shake = u > 1.1 ? 1.5 : 0
      f.blush = u > 1.1 ? 0.7 : 0
    }
    return f
  },
  wear(ctx, t, P) {
    if (P.ph === 'hook') return
    headphones(ctx, P.i === 0 ? ease.outBack(prog(P.u, 0.05, 0.28)) : 1)
  },
  desk: player,
  score: { rows: [['Vibes', 5], ['Track order', 5], ['Track three', '*unfair (good)*']], total: '11/10' },
  last: '*Track three* got me.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
