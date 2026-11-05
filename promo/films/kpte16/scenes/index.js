// kpte16: THE 10-SECOND PEP TALK, Ep 16 "The full pep talk: the 2 a.m. breakup call" (long, batch m14, cinematic · G).
// Format kit: ../../kpte01/pepkit-long.js (no end card, no card transition). Rows: promo/films/month2/m14.md.
//   0.0–3.2   frame 0: ♉ Taurus mid-fall out of bed grabbing a ringing phone, 2:04 on the clock · "2 a.m. Libra's |
//             calling. *Stay.*" · whip at 0.42 · chip "stay for | *the last line*".
//   1 THE CALL     split screen: Libra crying in one room, Taurus in bed with the phone, Pisces (the roommate) in the door.
//   2 THE SPIRAL   loading bar "replaying everything…" → "Error: blaming yourself"; "what if I was the problem?"
//   3 THE TRUTH    "breaking up isn't *failing.*" · NOT A FAILURE stamp · "it was real."
//   4 THE TOAST    Taurus makes toast on speaker; the tiny plan: water · sleep · a walk tomorrow (achievement pop).
//   5 THE LAST LINE  3-2-1 · "It ended. | *You* didn't."  Hard cut.
import { makeLong } from '../../kpte01/pepkit-long.js'
import { room, bed, clockFace, phone, stamp, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, glow, tissues, mug } from '../../kpte01/pepkit.js'

function bedroomT(x, t) { room(x, t, { wall: '#211a42', wall2: '#1d163c', floor: '#2c2242', win: { x: 120, y: 520, w: 240, h: 260 }, floorY: 1330 }); bed(x, 700, 1000, { w: 560, sheet: '#d9c48a', col: '#5a4a8a' }); clockFace(x, 880, 600, '2:04') }
function hook(x, t, S) {
  bedroomT(x, t)
  // the phone ringing mid-air (Taurus is the one lunging for it)
  const ring = Math.sin(t * 40) * 6
  x.save(); x.translate(640 + ring, 700); x.rotate(0.4 + t * 2)
  box(x, -50, -90, 100, 180, '#2a2148', { b: 6 }); R(x, MINT, -38, -70, 76, 130); x.font = "800 22px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('LIBRA', 0, -20); x.fillText('calling', 0, 10)
  x.restore()
  for (let i = 0; i < 3; i++) { const p = ((t * 2 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; x.strokeStyle = MINT; x.lineWidth = 6; x.beginPath(); x.arc(640, 700, 90 + p * 120, 0, 7); x.stroke(); x.restore() }
}
// the split: top = Libra's room, bottom = Taurus's room (the call)
function split(x, t, S, { timer = true } = {}) {
  R(x, '#1d1640', 0, 380, 1080, 470); for (let i = 0; i < 1080; i += 90) R(x, '#1a1338', i, 380, 44, 470)
  R(x, '#2a2048', 850, 860, 1080, 0)
  R(x, '#251c46', 0, 860, 1080, 480); for (let i = 0; i < 1080; i += 90) R(x, '#211940', i + 45, 860, 44, 480)
  R(x, INK, 0, 848, 1080, 14)
  if (timer) { const s = Math.floor(t - S.t0) + 60 * 0; label(x, `● on call · 0${2 + Math.floor((t - 3) / 60)}:${String(4 + Math.floor((t - 3) % 60) / 1 | 0).padStart(2, '0')}`, 840, 420, { size: 24, col: MINT }); void s }
  bed(x, 640, 1180, { w: 520, sheet: '#d9c48a', col: '#5a4a8a' })
}
const pos1 = { L: { x: 620, y: 640, s: 210 }, C: { x: 600, y: 1080, s: 230 }, P: { x: 190, y: 1130, s: 130 } }
const EP = makeLong({
  id: 'kpte16', sign: 'libra', coach: 'taurus', end: 'cut', brk: 'whip',
  hookLine: '2 a.m. Libra’s | calling. *Stay.*', promise: 'stay for | *the last line*',
  grabber: 'coach',
  hook,
  chapters: [
    { title: 'THE CALL', len: 16, set: split, pos: pos1, mood: 'wide', cmood: 'neutral', ptears: 2,
      props: (x, t, S) => { tissues(x, 820, 700, 80); if (S.u > 7.4) label(x, '(the roommate)', 190, 1250, { size: 22, col: '#b9a6ff' }) },
      lines: [[0.6, 'L', 'it’s over. they *ended* it.'], [4.2, 'C', 'okay. I’m here. I’m *not hanging up.*'], [7.8, 'P', 'is it bad?? I’m *already crying.*'], [11.6, 'L', 'I thought we were *fine.*']],
      cues: [['pluck', 0.7, 196, 0.03, 0.8, 0], ['pop', 7.9, 987.77, 0.03, -0.4]] },
    { title: 'THE SPIRAL', len: 16, set: split, pos: pos1, mood: 'wide', cmood: 'neutral', slump: 0.1,
      fx: [['loadingBar', { at: 0.5, len: 2.6, label: 'replaying everything…', error: 'Error: blaming yourself', y: 760 }]],
      lines: [[3.6, 'L', 'what if *I* was the problem?'], [7.2, 'L', 'I should’ve been more chill. more *fun.*'], [11.0, 'C', 'stop. breathe with me. in… *out.*']],
      props: (x, t, S) => { if (S.u > 11.6) { const b = 0.5 + 0.5 * Math.sin((S.u - 11.6) * 2.4); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 620, 640, 120 + 80 * b, 0.25, '159,230,176'); x.restore() } },
      cues: [['riser', 11.2, 14.0, 0.02]] },
    { title: 'THE TRUTH', len: 16, mood: 'neutral', cmood: 'sparkle',
      set: (x, t) => room(x, t, { wall: '#262050', wall2: '#211a48', floor: '#33284a', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }),
      props: (x, t, S) => { stamp(x, t, 'NOT A FAILURE', 560, 660, S.t0 + 1.4, { col: '#2a8a5a', size: 56, life: 6 }); if (S.u > 11.9) note(x, 560, 660, 'it was real.', { w: 340, h: 100, col: '#ffd0e4', size: 42, k: pop01(t, S.t0 + 11.9, 0.3, 2.4) }) },
      lines: [[0.6, 'C', 'breaking up isn’t *failing.*'], [4.2, 'C', 'it’s two people being *honest.*'], [7.8, 'L', '…it still *hurts* though.'], [11.4, 'C', 'of course it does. it was *real.*']],
      cues: [['boom', 1.4, 0.18], ['pluck', 12.0, 1318.51, 0.03, 0.6, 0]] },
    { title: 'THE TOAST', len: 17, set: split, pos: pos1, mood: 'happy', cmood: 'happy', ptears: 3, pmood: 'sparkle',
      props: (x, t, S) => {
        // the toaster on speaker
        box(x, 820, 1120, 160, 110, '#c9cfe0', { b: 6 }); R(x, INK, 850, 1112, 40, 10); R(x, INK, 910, 1112, 40, 10)
        const pop = S.u > 9 ? ease.outBack(prog(S.u, 9, 9.4)) : 0
        for (const dx of [850, 910]) { R(x, INK, dx - 4, 1112 - 60 * pop - 4, 48, 60); R(x, '#d9a35c', dx, 1112 - 60 * pop, 40, 52) }
        mug(x, t, 470, 820, { s: 0.9, col: '#5fa8ff' })
      },
      fx: [['achievement', { at: 13.4, out: [16.2, 16.6], title: 'PLAN UNLOCKED', text: 'water · sleep · *a walk tomorrow*', y: 1250 }]],
      lines: [[0.6, 'C', 'okay. tiny plan. you *ready?*'], [4.2, 'C', 'water. sleep. walk with me *tomorrow.*'], [7.8, 'L', '…can there be *pastries?*'], [11.2, 'C', 'there are ALWAYS *pastries.*']],
      cues: [['pop', 9.0, 1318.51, 0.05, 0.4], ['tick', 9.02, 0.06]] },
  ],
  last: 'It ended. | *You* didn’t.', lastLate: 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [RED, PEP, GOLD, BONE, phone, lerp, outK]
