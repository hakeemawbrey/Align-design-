// kmte11: MIRROR TALK No. 11, "Asked how I feel. Brain: error." (18 s vertical, star_advice post, chiptune · Eb). Loops.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Aquarius mid-glitch, an error window "FEELINGS.EXE is not responding" slammed across its face, the
//          picture torn into slices. Hook "Someone asked | how I *feel.*"  0.15: the whole frame glitches (RGB split).
//   2.8    "Brain: *loading…*"  them: "how are you feeling about us?"  AQUARIUS: "I'm… fine… interesting *question*."
//   5.4    REFLECTION: "pick *one* word."  A menu: happy / nervous / into you; the cursor dithers… → "nervous". The glitch stops.
//   9.4    AQUARIUS: "…nervous. *good* nervous."  REFLECTION: "see? no *crash*."  sent → "same. good same."
//   13.6   last line "One feeling, | said *out loud.*"  16.4: the error window creeps back; 17.55–18 eases into frame 0.
import { makeMirror, drawPhone, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const T = { calm: 1.1, them: 2.9, s1: 3.2, m1: 5.4, menu: 6.3, pick: 8.8, s2: 9.4, m2: 11.0, sent: 11.9, reply: 12.6, last: 13.6, hop: 15.3, creep: 16.4 }
const OPTS = ['happy', 'nervous', 'into you']
const CURSOR = [[6.6, 0], [7.1, 2], [7.5, 0], [7.9, 1], [8.25, 2], [8.55, 1]]

function errWin(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.5)', -260 + 12, -110 + 14, 520, 220)
  box(x, -260, -110, 520, 220, '#d8d4e8', { b: 6 })
  R(x, '#2b4cc8', -260, -110, 520, 44)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('FEELINGS.EXE', -240, -88)
  R(x, INK, 214, -102, 30, 28); R(x, '#e8344e', 218, -98, 22, 20)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText('is not responding', -190, -24)
  R(x, INK, -238, -48, 36, 36); R(x, GOLD, -232, -42, 24, 24); R(x, INK, -222, -38, 4, 12); R(x, INK, -222, -22, 4, 4)
  for (const [bx, s] of [[-120, 'WAIT'], [100, 'CLOSE']]) { box(x, bx - 80, 30, 160, 52, '#efe9ff', { b: 4 }); x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(s, bx, 56) }
  x.restore()
}
// tear the picture into shifted slices (drawn over what's already on the canvas)
function tear(x, t, k) {
  if (k <= 0.01) return
  const f = Math.floor(t * 18)
  for (let i = 0; i < 6; i++) {
    const h = 30 + ((f * 7 + i * 13) % 5) * 22, y = 420 + ((f * 131 + i * 211) % 1100), dx = (((f * 17 + i * 29) % 9) - 4) * 18 * k
    x.drawImage(x.canvas, 0, y, 1080, h, dx, y, 1080, h)
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = i % 2 ? `rgba(255,60,200,${0.18 * k})` : `rgba(60,240,255,${0.18 * k})`; x.fillRect(0, y, 1080, h * 0.3); x.restore()
  }
}

const F = makeMirror({
  id: 'kmte11', sign: 'aquarius', dur: 18, loop: true,
  hook: { text: 'Someone asked | how I *feel.*', accentColor: '#7fd0ff', out: [2.55, 2.8] },
  fx: [
    { k: 'glitch', at: 0.15, len: 0.9, dialog: false, amp: 1 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'screenShake', at: T.pick, amp: 14, len: 0.35 },
    { k: 'whipZoom', at: T.reply - 0.06, from: 1.2 },
  ],
  caps: [
    { at: 2.85, out: [8.6, 8.8], text: 'Brain: | *loading…*', accent: '#7fd0ff' },
    { at: 8.85, out: [13.3, 13.5], text: 'One word. | *No crash.*', accent: '#7dffb0' },
    { at: T.last, out: [99, 100], text: 'One feeling, | said *out loud.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "I'm… fine… interesting *question*." },
    { t: T.m1, who: 'M', text: 'pick *one* word.' },
    { t: T.s2, who: 'S', text: '…nervous. *good* nervous.' },
    { t: T.m2, who: 'M', text: 'see? no *crash*.' },
  ],
  boxes: [[3.0, 6.2], [9.2, 12.6]],
  pose(t) {
    const calm = ease.outCubic(prog(t, T.calm - 0.3, T.calm + 0.3)), back = ease.inOutCubic(prog(t, T.creep, 17.5)), m = calm * (1 - back)
    const glitchy = (t < T.calm || t > T.creep) ? 1 : t < T.pick ? 0.25 : 0
    const p = { x: lerp(470, 300, m), y: lerp(1060, 1225, m), s: lerp(320, 280, m), mood: 'wide', look: [0, 0], blink: false, squash: glitchy * 0.05 * Math.sin(t * 47), rot: glitchy * 0.04 * Math.sin(t * 31) }
    if (t > T.calm && t < T.creep) { p.mood = 'neutral'; p.look = [1, 0.3]; p.blink = undefined }
    if (t > T.s1 && t < T.creep) { p.mood = 'squint'; p.look = [1, -0.2] }
    if (t > T.m1 && t < T.creep) { p.mood = 'neutral'; p.look = [1, -0.9] }
    if (t > T.pick && t < T.creep) { p.mood = 'happy'; p.look = undefined }
    if (t > T.reply && t < T.creep) p.mood = 'heart'
    return p
  },
  signHops: [T.pick, T.hop, T.hop + 0.4],
  refl(t) {
    const calm = ease.outCubic(prog(t, T.calm - 0.3, T.calm + 0.3)), back = ease.inOutCubic(prog(t, T.creep, 17.5)), m = calm * (1 - back)
    const p = { x: lerp(560, 650, m), y: lerp(880, 905, m), s: lerp(300, 250, m), mood: m < 0.5 ? 'wide' : 'neutral', look: [-1, 0.6] }
    if (t > T.m1 && t < T.creep) p.mood = 'happy'
    if (t > T.pick && t < T.creep) p.mood = 'sparkle'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.pick && t < T.creep) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.reply && t < T.creep) p.mood = 'happy'
    return p
  },
  tissuePulls: [T.pick + 0.2, T.pick + 0.6, T.reply + 0.4],
  front(x, t) {
    // the error window (frame 0; creeps back at the end for the loop)
    const ek = t < T.calm ? 1 - ease.inCubic(prog(t, T.calm - 0.25, T.calm)) : ease.outCubic(prog(t, T.creep, 17.45))
    errWin(x, t, 520 + (t < T.calm ? Math.sin(t * 40) * 6 : 0), 930, ek, -0.06)
    // the phone
    if (t > 2.7 && t < T.last + 0.3) {
      const inn = easeOutBack(prog(t, 2.7, 3.0), 1.4), go = ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3))
      const dip = ease.inOutCubic(prog(t, T.menu - 0.3, T.menu)) * (1 - ease.inOutCubic(prog(t, T.pick + 0.6, T.pick + 1.0)))
      drawPhone(x, t, { cx: 770, top: 560 + (1 - inn) * 1500 + go * 1500 + dip * 1500, w: 380, h: 520, title: 'them ♡', size: 26, rot: 0.04, msgs: [
        { at: T.them, side: 'L', text: 'how are you feeling about us?' }, { at: T.sent, side: 'R', text: 'nervous. good nervous.' }, { at: T.reply, side: 'L', text: 'same. good same.' },
      ] })
    }
    // the one-word menu
    if (t > T.menu && t < T.pick + 0.6) {
      const k = easeOutBack(prog(t, T.menu, T.menu + 0.3), 1.6) * outK(t, [T.pick + 0.35, T.pick + 0.6])
      let cur = 0; for (const [tt, i] of CURSOR) if (t >= tt) cur = i
      if (t >= T.pick) cur = 1
      x.save(); x.translate(560, 760); x.scale(k, k)
      box(x, -230, -170, 460, 340, '#120d26', { b: 6 }); R(x, GOLD, -230, -170, 460, 6)
      x.font = `700 26px ${MONO}`; x.fillStyle = '#cfc6e6'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PICK ONE WORD', 0, -130)
      OPTS.forEach((o, i) => {
        const y = -60 + i * 80, sel = i === cur, flash = t >= T.pick && i === 1 && Math.floor(t * 12) % 2
        R(x, sel ? (flash ? '#fff' : GOLD) : '#2a1f55', -180, y - 30, 360, 60)
        x.font = `800 36px ${INTER}`; x.fillStyle = sel ? INK : BONE; x.fillText(o, 0, y + 2)
        if (sel) { x.fillStyle = GOLD; x.beginPath(); x.moveTo(-215, y - 14); x.lineTo(-195, y); x.lineTo(-215, y + 14); x.fill() }
      })
      x.restore()
    }
    hearts(x, t, T.reply + 0.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 560, 760, T.pick, 12, 240, 2)
    sparkles(x, t, 300, 1150, T.hop + 0.2, 10, 160, 3)
  },
  over(x, t) {
    const k = t < T.calm ? 1 - prog(t, T.calm - 0.3, T.calm) : t > T.creep ? prog(t, T.creep + 0.3, 17.45) : 0
    tear(x, t < T.calm ? t : 0, k)
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['chip', r3(i * 0.11), [220, 330, 185, 440, 247, 392, 175, 494][i], 0.06, { gain: 0.035, wave: 'square', duty: 0.25, decay: 0.05, sustain: 0.4 }]),
    ['whoosh', T.calm - 0.2, 0.3, 0.03],
    ['pop', T.them, 880, 0.045, 0.3], ['pop', T.menu, 1046.5, 0.04, 0],
    ...CURSOR.map(([tt], i) => ['chip', tt, [659.25, 783.99, 659.25, 698.46, 783.99, 698.46][i], 0.06, { gain: 0.035, wave: 'square', duty: 0.5, decay: 0.06, sustain: 0.5 }]),
    ['chip', T.pick, 1046.5, 0.12, { gain: 0.045, wave: 'square', duty: 0.5, decay: 0.1, sustain: 0.6 }], ['glitter', T.pick, T.pick + 0.4],
    ['pop', T.sent, 1174.66, 0.045, 0.3], ['pop', T.reply, 1318.51, 0.05, 0.3], ['pop', T.reply + 0.08, 1760, 0.035, 0.3],
    ['bell', T.last + 0.5, 1567.98, 0.03, 1.0, 0], ['pop', T.hop, 987.77, 0.03, -0.2],
    ...Array.from({ length: 4 }, (_, i) => ['chip', r3(T.creep + 0.3 + i * 0.18), [220, 185, 247, 175][i], 0.05, { gain: 0.03, wave: 'square', duty: 0.25, decay: 0.05, sustain: 0.4 }]),
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
