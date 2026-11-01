// trsilentletter: SILENT REVIEW, "Silent review: a handwritten note." (20 s vertical, Star Talk Trends §16,
// music: jazzy · Db). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (identical in all five).
// ♑ Capricorn, the stoic critic, reviews a love note from ♋ Cancer. Not one word is spoken: the captions narrate the face.
//   0.0–2.1    hook: "Silent review: | *a handwritten note.*" Capricorn sits behind the review desk, poker-faced, a muted
//              speaker by its head. Cancer slides a folded note (heart sticker) across and ducks behind the desk. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: reading glasses drop on, the note unfolds. One eyebrow rises. CC "[ raises one eyebrow ]" →
//              a loupe sweeps the handwriting, Capricorn squints along: "[ inspects the cursive ]".
//   5.0–7.9    REACTION 2: three slow nods. CC "[ slow, respectful nod ]" → the doodle of two little stars pulses, both
//              brows shoot up: "[ notices the doodle ]".  (Cancer peeks: "?")
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): a highlighter swipes the P.S. ("P.S. I like your laugh."). CC "[ reads the P.S. ]" →
//              brows tilt, lip wobbles, ONE tear rolls: "[ a single tear ]" → the glasses fog up: "[ glasses: fogged ]".
//              Pisces leans in from the edge, fountaining.
//   11.4–15.5  THE VERDICT: Handwriting ★★★★★ · The doodle ★★★★★ · Feelings *off the scale* · TOTAL 10/10 (stamped).
//              Top caption: "*Speechless.* Literally." Cancer pops up heart-eyed; Pisces "[ sobbing ]".
import { makeSilent, R, box, drawBits, sparkles, glow, label, shadow, hearts, HEART, ramp, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SERIF, T } from './silentkit.js'

const B = T.beats
const PAPER = '#fbf3e2'

// ── the note on the desk: folded (heart sticker) → unfolded letter with a doodle and a P.S.
function note(x, t, P, S) {
  const g = S.gift
  if (g <= 0) return
  const uf = ease.inOutCubic(prog(t, B[0][0] + 0.3, B[0][0] + 0.8))
  const cx = lerp(250, 540, g), cy = 1170, rot = lerp(-0.35, -0.025, g)
  const w = lerp(150, 430, uf), h = lerp(104, 232, uf)
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, PAPER, { b: 6 })
  if (uf < 0.5) {
    R(x, 'rgba(27,18,54,0.18)', -w / 2, -2, w, 4)
    drawBits(x, HEART, { H: RED }, 0, 0, 6 * (1 - uf * 2))
  } else {
    const a = clamp((uf - 0.5) * 2)
    x.globalAlpha = a
    // faint ruled lines
    for (let i = 0; i < 4; i++) R(x, 'rgba(120,160,220,0.25)', -w / 2 + 18, -h / 2 + 58 + i * 44, w - 36, 2)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = '#2a2a6a'
    x.font = `italic 500 34px ${SERIF}`
    x.fillText('Dear Capricorn,', -w / 2 + 22, -h / 2 + 50)
    x.font = `italic 500 30px ${SERIF}`
    x.fillText('you make Tuesdays', -w / 2 + 34, -h / 2 + 96)
    x.fillText('feel like Fridays.', -w / 2 + 34, -h / 2 + 138)
    // the doodle: two little stars and a heart (it pulses when noticed)
    const dp = P.i === 1 ? 1 + 0.18 * Math.max(0, Math.sin((t - B[1][0] - 1.9) * 9)) * (t > B[1][0] + 1.9 ? 1 : 0) : 1
    const star = ['..S..', '.SSS.', 'SSSSS', '.S.S.']
    x.save(); x.translate(w / 2 - 88, -h / 2 + 100); x.scale(dp, dp)
    drawBits(x, star, { S: '#e6a93a' }, -34, 6, 7, { outline: '#2a2a6a' })
    drawBits(x, star, { S: '#5aa8e0' }, 34, 6, 7, { outline: '#2a2a6a' })
    drawBits(x, HEART, { H: RED }, 0, -34, 4.5, { outline: null })
    x.restore()
    // the P.S. (a highlighter swipes it in the third reaction)
    const hl = ease.outCubic(prog(t, B[2][0] + 0.3, B[2][0] + 0.75))
    if (hl > 0) { x.save(); x.globalAlpha = a * 0.6; R(x, '#ffe66a', -w / 2 + 18, h / 2 - 56, (w - 36) * hl, 36); x.restore() }
    x.fillStyle = '#b02848'; x.font = `italic 500 32px ${SERIF}`
    x.fillText('P.S. I like your laugh.', -w / 2 + 26, h / 2 - 28)
  }
  x.restore()
  // the critic's loupe sweeps the handwriting (reaction 1)
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 1.55, 1.75)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (lk > 0.01) {
      const lx = lerp(400, 640, ease.inOutQuad(prog(P.u, 1.7, 2.6))), ly = 1138 + 16 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      R(x, '#ffffff', lx - 30, ly - 30, 12, 6)
      x.restore()
    }
  }
  if (P.i === 1) sparkles(x, t, 682, 1152, B[1][0] + 1.9, 8, 90, 2, [GOLD, PINK, BONE])
  if (P.i === 2) sparkles(x, t, 520, 1252, B[2][0] + 0.75, 8, 120, 1, ['#ffe66a', BONE, PINK])
}

// ── reading glasses (sprite cells): drop 0 (above) → 1 (on); up 0…1 pushes them onto the head; fog 0…1
function glasses(ctx, drop, up, fog) {
  if (drop <= 0) return
  const dy = -(1 - drop) * 12 - up * 8.5
  ctx.save(); ctx.globalAlpha *= clamp(drop * 3)
  for (const lx of [8.8, 19.6]) {
    const y0 = 14.6 + dy
    ctx.fillStyle = `rgba(214,236,255,${0.12 + 0.82 * fog})`; ctx.fillRect(lx + 0.9, y0 + 0.9, 5.8, 5.8)
    ctx.fillStyle = INK; ctx.fillRect(lx, y0, 7.6, 0.9); ctx.fillRect(lx, y0 + 6.7, 7.6, 0.9); ctx.fillRect(lx, y0, 0.9, 7.6); ctx.fillRect(lx + 6.7, y0, 0.9, 7.6)
    if (fog > 0.2) { ctx.fillStyle = `rgba(255,255,255,${0.5 * fog})`; ctx.fillRect(lx + 1.5, y0 + 1.4, 2, 1); ctx.fillRect(lx + 3.5, y0 + 3.9, 2.2, 1) }
    ctx.fillStyle = GOLD; ctx.fillRect(lx + 0.9, y0 + 0.9, 1.2, 0.6)
  }
  ctx.fillStyle = INK; ctx.fillRect(16.4, 17 + dy, 3.2, 1)
  ctx.restore()
}

const EP = makeSilent({
  id: 'trsilentletter', reviewer: 'capricorn', giver: 'cancer', gift: 'a handwritten note.', accent: PINK,
  hookCC: '[ respectful silence ]', plate: 'CAPRICORN · CRITIC',
  beats: [
    { cc: [[0.75, '[ raises one eyebrow ]'], [1.75, '[ inspects the cursive ]']],
      cues: [['tick', 0.32, 0.04], ['whoosh', 0.3, 0.4, 0.03], ['tick', 0.75, 0.035], ['pluck', 0.62, 659.25, 0.04, 0.35, 0], ['pluck', 0.74, 1318.51, 0.035, 0.4, 0],
        ['tick', 1.62, 0.03], ['pop', 1.8, 880, 0.02, -0.4], ['pop', 2.15, 987.77, 0.02, 0], ['pop', 2.5, 1174.66, 0.02, 0.4]] },
    { cc: [[0.45, '[ slow, respectful nod ]'], [1.9, '[ notices the *doodle* ]']],
      cues: [['tom', 1.0, 72, { gain: 0.12, decay: 0.22 }], ['tom', 1.9, 70, { gain: 0.12, decay: 0.22 }], ['tom', 2.8, 68, { gain: 0.12, decay: 0.22 }],
        ['pluck', 1.9, 1567.98, 0.04, 0.5, 0.3], ['pop', 1.95, 1174.66, 0.035, 0.3], ['glitter', 1.9, 2.3]] },
    { cc: [[0.45, '[ reads the P.S. ]'], [1.65, '[ a single tear ]'], [2.45, '[ glasses: *fogged* ]']],
      cues: [['whoosh', 0.3, 0.45, 0.025], ['glitter', 0.75, 1.0], ['pop', 0.92, 659.25, 0.03, 0],
        ['bell', 1.5, 2637.02, 0.026, 1.8, -0.2], ['pluck', 1.9, 1318.51, 0.02, 0.6, -0.2], ['whoosh', 2.2, 0.6, 0.02], ['glitter', 2.3, 2.7]] },
  ],
  face(t, P, f) {
    const u = P.u
    if (P.i === 0) {
      f.look = u < 0.3 ? [0, 0] : [0, 1]
      f.brows = { l: ramp(u, 0.55, 0.85, 0, 1), r: ramp(u, 0.55, 0.85, 0, -0.25), sl: ramp(u, 0.55, 0.85, 0, -0.7), sr: -0.3 }
      if (u > 1.6 && u < 2.8) { f.mood = 'squint'; f.look = [lerp(-1, 1, prog(u, 1.7, 2.6)), 1] }
      f.mouth = 'flat'
    } else if (P.i === 1) {
      f.look = [0, 1]
      f.nod = [{ at: P.t0 + 0.55, n: 3, period: 0.9, amp: 24 }]
      const wow = u > 1.9
      f.brows = wow ? { l: ramp(u, 1.9, 2.05, 0.3, 0.95), r: ramp(u, 1.9, 2.05, 0.3, 0.95), sl: 0.2, sr: 0.2 } : { l: 0.3, r: 0.3, sl: 0, sr: 0 }
      if (wow && u < 2.45) { f.mood = 'wide'; f.look = [0.6, 1] }
      f.mouth = wow ? (u < 2.45 ? 'o' : 'tight') : 'flat'
    } else {
      f.look = u < 0.9 ? [0, 1] : u < 1.3 ? [0, 1] : [0, 0]
      if (u > 0.9 && u < 1.3) f.mood = 'wide'
      const touched = ramp(u, 1.2, 1.5, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 1.25 ? 'wobble' : 'flat'
      f.tear = P.t0 + 1.5
      f.shake = u > 1.3 ? 1.6 : 0
      f.blush = u > 1.3 ? 0.7 : 0
    }
    return f
  },
  wear(ctx, t, P) {
    if (P.ph === 'hook') return
    const drop = P.ph === 'score' ? 1 : P.i === 0 ? ease.outBack(prog(P.u, 0.1, 0.32)) : 1
    const fog = P.i === 2 ? ramp(P.u, 2.2, 2.6, 0, 1) : P.ph === 'score' ? ramp(t, T.score, T.score + 0.6, 1, 0) : 0
    const up = P.ph === 'score' ? ramp(t, T.score + 0.2, T.score + 0.6, 0, 1) : 0
    glasses(ctx, drop, up, fog)
  },
  desk: note,
  score: { rows: [['Handwriting', 5], ['The doodle', 5], ['Feelings', '*off the scale*']], total: '10/10' },
  last: '*Speechless.* Literally.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, label, shadow, hearts, BONE]
