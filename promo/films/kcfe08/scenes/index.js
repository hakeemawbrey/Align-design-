// kcfe08: ZODIAC CONFESSIONAL ep 8, "Scorpio is fine. Totally." (16.8 s vertical, music: screwed · Fm). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Scorpio mid-glare, one eye twitching, the picture mid-GLITCH; hook "Scorpio is *fine.* Totally fine."
//   1.0–4.4   "I saw their new person." · "I'm *thrilled* for them." (glitch)
//   4.6–7.6   FINE. FINE. FINE. FINE. slams, a shake on each; the lower third tag degrades to "FINE (UNCONFIRMED)"
//   7.8–9.4   PRODUCER: "what do you actually feel?"
//   9.8–12.3  the glare melts: "…like I was *easy to replace.*" Pisces bawls on the boom.
//   12.4–15.4 Scorpio dials: "I'm going to call *my best friend.*" — and Pisces' phone rings up on the boom (it's Pisces).
//   15.6      last line "Fine is a feeling *I'm working on.*" holds → hard cut at 16.8.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, buildSlam, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, screenShake, shakeCues, glitch, glitchCues } from '../../hookkit.js'

export const DURATION = 16.8
const SCO = SIGN('scorpio')
const T = { new: 1.0, thrilled: 2.9, fines: [4.7, 5.35, 5.9, 6.4, 6.85], prod: 7.85, melt: 9.6, replace: 9.85, call: 12.45, ring: 13.2, answer: 14.4, last: 15.6 }
const HOOK = { at: -1, text: 'Scorpio is *fine.* | Totally fine.', top: 150, size: 104, accentColor: SCO.color, out: [4.4, 4.6] }
const GL0 = { at: -0.35, len: 0.85, dialog: false, amp: 1 }
const GL1 = { at: T.thrilled + 0.6, len: 0.9, text: 'SCORPIO.EXE: fine (not responding)', buttons: ['WAIT', 'FEEL IT'], amp: 0.8 }
const SHAKES = T.fines.map((f, i) => ({ at: f, len: 0.35, amp: 16 + i * 6, seed: i + 2 }))
const WHO = `${SCO.glyph}︎ SCORPIO`
const CAPS = [
  { t: T.new, end: 2.8, who: WHO, color: SCO.color, text: 'I saw their *new person.*' },
  { t: T.thrilled, end: 4.5, who: WHO, color: SCO.color, text: "I'm *thrilled* for them." },
  { t: T.fines[0], end: 7.6, who: WHO, color: SCO.color, text: 'fine. fine. *FINE.*', accent: RED },
  { t: T.prod, end: 9.4, kind: 'prod', text: 'what do you actually feel?' },
  { t: T.replace, end: 12.3, who: WHO, color: SCO.color, text: '…like I was *easy to replace.*', accent: '#9fc4ff' },
  { t: T.call, end: 15.45, who: WHO, color: SCO.color, text: "I'm going to call *my best friend.*" },
  { t: T.last, end: 99, who: WHO, color: SCO.color, text: "Fine is a feeling *I'm working on.*" },
]
const TAGS = ['“fine”', '“fine.”', '“FINE”', '“fine?”', 'FINE (UNCONFIRMED)']

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const slams = T.fines.map((f, i) => buildSlam(root, i === 4 ? 'FINE?' : 'FINE.', { top: 520 + (i % 3) * 140, size: 150 + i * 14, rot: [-6, 5, -3, 7, -2][i], color: i === 4 ? '#ffcf5a' : '#ffffff' }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function phone(cx, cy, k, rot, ringing) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; rr(x, -46, -82, 92, 164, 18); x.fill(); x.fillStyle = '#2b2440'; rr(x, -40, -76, 80, 152, 14); x.fill()
    x.fillStyle = ringing ? '#7fe0a0' : '#4f8dff'; rr(x, -32, -66, 64, 132, 10); x.fill()
    x.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const dim = t > T.melt && t < T.call ? 0.35 : 0
      drawBooth(x, t, { sign: 'scorpio', dim })
      const mood = step(t, [[-1, 'squint'], [T.new, 'squint'], [T.thrilled, 'happy'], [T.fines[0], 'squint'], [T.prod, 'wide'], [T.melt, 'neutral'], [T.call, 'happy'], [T.last, 'sparkle']])
      const twitch = t < T.melt && Math.sin(t * 23) > 0.7 ? 0.08 : 0
      const look = t > T.melt && t < T.call ? [0, 1] : [0, 0]
      const F = seat(x, t, 'scorpio', { ...SUBJ, hops: [1.05, 1.7, T.thrilled + 0.05, ...T.fines, T.call + 0.05, T.last + 0.05] }, { mood, look, seed: 13, squash: twitch, tears: t > T.replace && t < T.call ? 1 : 0 })
      // the twitching eye: a little red tick mark
      if (t < T.melt && twitch) { x.fillStyle = RED; x.fillRect(SUBJ.x + 70, F.cy - 110, 14, 30); x.fillRect(SUBJ.x + 92, F.cy - 118, 14, 30) }
      // Scorpio's phone
      const pk = easeOutBack(prog(t, T.call, T.call + 0.3), 2) * (t < T.last ? 1 : 1 - prog(t, T.last, T.last + 0.3))
      phone(SUBJ.x + 170, F.cy + 40, pk, 0.2, false)
      drawChairFront(x)
      // Pisces on the boom; its phone rings on the pole (it's the best friend)
      const sob = t > T.replace
      boomOp(x, t, { tears: sob ? 4 : 2, mood: t > T.answer ? 'happy' : sob ? 'sparkle' : 'wide', sway: t > T.fines[0] && t < T.prod ? 2.5 : 1 })
      if (t > T.ring) {
        const rk = easeOutBack(prog(t, T.ring, T.ring + 0.3), 2)
        const shake = t < T.answer ? Math.sin(t * 50) * 0.15 : 0
        phone(805, 670, rk * 0.9, -0.3 + shake, t >= T.answer)
        if (t < T.answer) { x.save(); x.strokeStyle = '#7fe0a0'; x.lineWidth = 7; for (let i = 0; i < 3; i++) { const r = 70 + ((t * 2 + i / 3) % 1) * 70; x.globalAlpha = 1 - ((t * 2 + i / 3) % 1); x.beginPath(); x.arc(805, 670, r, -0.9, 0.9); x.stroke(); x.beginPath(); x.arc(805, 670, r, Math.PI - 0.9, Math.PI + 0.9); x.stroke() } x.restore() }
        else { x.font = `800 34px ${INTER}`; x.fillStyle = '#7fe0a0'; x.textAlign = 'center'; x.fillText('connected', 805, 790) }
      }
      if (t > T.answer) sparkles(x, t, 700, 760, T.answer, 10, 160, 3, [PINK, GOLD, BONE])
      recChrome(x, t, { tc0: 31300, y0: 440 })
      const nf = T.fines.filter(f => t >= f).length
      lower.update(t, { k: 1, name: WHO, color: SCO.color, tag: t > T.call ? '“working on it”' : nf ? TAGS[nf - 1] : '“totally fine”' })
      slams.forEach((s, i) => s.update(t, [T.fines[i], (T.fines[i + 1] ?? 7.6)]))
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, glitch(GL0), slamTitle(HOOK), glitch(GL1), ...SHAKES.map(s => screenShake(s))]
export const CUES = [
  ...glitchCues(GL0), ...slamTitleCues(HOOK), ...glitchCues(GL1), ...SHAKES.flatMap(s => shakeCues(s)), ...capCues(CAPS),
  ...T.fines.map((f, i) => ['tom', f, 70 + i * 8, { gain: 0.3, decay: 0.3 }]),
  ...sobCues(T.replace + 0.3, 5, 0.42),
  ['pop', T.call + 0.05, 880, 0.035, 0.3],
  ...[0, 1, 2].flatMap(i => [['pluck', +(T.ring + i * 0.4).toFixed(3), 1318.5, 0.03, 0.2, 0.4], ['pluck', +(T.ring + i * 0.4 + 0.12).toFixed(3), 1046.5, 0.03, 0.2, 0.4]]),
  ['pop', T.answer, 1567.98, 0.04, 0.4], ['glitter', T.answer, T.answer + 0.4],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
