// klge02 · Your Sign's Love Glitch · "Virgo.exe: Draft 14" (22 s vertical, star_advice post, loop).
//   0.0   frame 0: VIRGO.EXE: draft 14 not responding. Virgo mid-backspace, the reply "sounds fun!" swollen into a
//         paragraph that spills out of the box, DRAFT 14, the CPU meter in the red. 0.5 whip onto the draft.
//   3.0   the glitch: editing the feeling out. Drafts 15…22: footnotes, a P.S. 4.6 record scratch: "yep. *footnotes.*"
//   7.6   error: TOO MANY DRAFTS.   9.3 Pisces pops out of the tray, crying.
//   11.5  THE STARS: "the first honest draft is usually the *kind* one."   14.6 patch 1.2 installs.
//   16.5  Virgo deletes it all, types "sounds fun! saturday?" and sends. 17.8 "YES!!"   19.4 "Send the *real* draft."
//   21.55 loop back into frame 0.
import { makeGlitch, R, box, label, sparkles, hearts, meter, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER, MONO } from '../../klge01/scenes/glitchkit.js'

const DRAFTS = [
  [-9, 'sounds fun! (only if you want to, totally fine if not, I’m free most days but also flexible)'],
  [3.6, 'sounds fun!¹ (only if you want to, totally fine if not, I’m free most days but also flexible²)'],
  [4.5, 'sounds fun!¹ (only if you want to, totally fine if not, I’m free most days but also flexible²) ¹fun as in nice ²flexible-ish'],
  [6.2, 'sounds fun!¹ (only if you want to, totally fine if not, I’m free most days but also flexible²) ¹fun as in nice ²flexible-ish P.S. ignore the footnotes P.P.S. hi'],
]
const CLEAN = 16.5, SENT = 17.15, REPLY = 17.8

function draftAt(t) { let d = DRAFTS[0][1]; for (const [a, s] of DRAFTS) if (t >= a) d = s; return d }
function wrap(x, text, maxW) {
  const out = []; let cur = ''
  for (const w of text.split(' ')) { const c = cur ? cur + ' ' + w : w; if (x.measureText(c).width > maxW && cur) { out.push(cur); cur = w } else cur = c }
  if (cur) out.push(cur); return out
}
function pen(x, t, px, py, wig) {
  x.save(); x.translate(px, py); x.rotate(-0.7 + Math.sin(t * 22) * 0.12 * wig)
  R(x, INK, -10, -90, 20, 150); R(x, RED, -6, -86, 12, 110); R(x, '#f4e8d8', -6, 24, 12, 22); R(x, INK, -3, 46, 6, 12)
  x.restore()
}

function scene(x, t, K) {
  R(x, '#1d1438', 70, 556, 940, 880)
  // desk
  R(x, '#4a3150', 70, 1340, 940, 96); R(x, '#6a4870', 70, 1334, 940, 8)
  const clean = t >= CLEAN
  // the compose box
  const shake = !clean && t > 5.5 && t < 9.2 ? Math.sin(t * 60) * 4 : 0
  const PX = 110 + shake, PY = 600, PW = 860, PH = 440
  box(x, PX, PY, PW, PH, '#f4f0fa', { b: 6 })
  R(x, '#d8d0ec', PX, PY, PW, 54)
  label(x, clean ? 'reply to JO' : 'reply to JO · unsent', PX + 22, PY + 28, { size: 22, align: 'left', col: INK })
  const n = clean ? 1 : t < 3.6 ? 14 : Math.min(22, 14 + Math.floor((t - 3.6) / 0.5))
  box(x, PX + PW - 230, PY + 10, 210, 36, clean ? MINT : n > 18 ? RED : GOLD, { b: 3 })
  label(x, clean ? 'DRAFT 1 ✓' : `DRAFT ${n}`, PX + PW - 125, PY + 29, { size: 22, col: INK })
  x.save(); x.beginPath(); x.rect(PX, PY + 56, PW, PH - 56 + (clean ? 0 : 140)); x.clip()
  if (!clean) {
    const txt = draftAt(t)
    x.font = `700 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    const lines = wrap(x, txt, PW - 60)
    lines.forEach((l, i) => {
      x.fillStyle = INK; x.fillText(l, PX + 30, PY + 110 + i * 50)
      // red-pen scribbles over a few words
      if (i % 2 === 1) { x.fillStyle = 'rgba(232,52,78,0.75)'; x.fillRect(PX + 30, PY + 96 + i * 50, Math.min(x.measureText(l).width, 300), 5) }
    })
    // the caret, mid-backspace
    const last = lines[lines.length - 1] || ''
    if (Math.floor(t * 4) % 2 === 0) R(x, '#5b4bd6', PX + 34 + x.measureText(last).width, PY + 76 + (lines.length - 1) * 50, 5, 44)
  } else {
    const typed = 'sounds fun! saturday?'
    const k = Math.floor(clamp(prog(t, CLEAN + 0.1, CLEAN + 0.6)) * typed.length)
    const sent = t >= SENT
    if (!sent) { label(x, typed.slice(0, k), PX + 30, PY + 120, { size: 48, align: 'left', col: INK, font: INTER, weight: 800 }) }
    // the sent bubble + the reply
    if (sent) {
      const fly = ease.outCubic(prog(t, SENT, SENT + 0.3))
      const by = lerp(PY + 120, PY + 140, fly)
      x.save(); x.globalAlpha = fly
      R(x, '#5b4bd6', PX + PW - 480, by - 40, 450, 76); label(x, typed, PX + PW - 255, by, { size: 36, col: BONE, font: INTER, weight: 800 })
      x.restore()
      label(x, 'delivered', PX + PW - 30, by + 60, { size: 20, align: 'right', col: '#7a6aa8', alpha: fly })
    }
    if (t >= REPLY) {
      const k2 = pop01(t, REPLY, 0.3, 2.6)
      x.save(); x.translate(PX + 200, PY + 330); x.scale(k2, k2)
      R(x, '#e3dcf3', -170, -50, 340, 100); label(x, 'JO', -150, -32, { size: 18, align: 'left', col: '#6a5a9a' }); label(x, 'YES!! saturday', 0, 12, { size: 40, col: INK, font: INTER, weight: 900 })
      x.restore()
    }
    // the SEND button
    const pressed = t >= SENT - 0.15 && t < SENT + 0.15
    box(x, PX + PW - 190, PY + PH - 80, 160, 56, pressed ? '#3a2fa0' : '#5b4bd6', { b: 4 }); label(x, 'SEND', PX + PW - 110, PY + PH - 51, { size: 26, col: BONE })
  }
  x.restore()
  if (!clean) { box(x, PX + PW - 190, PY + PH - 80, 160, 56, '#bdb6d2', { b: 4 }); label(x, 'SEND', PX + PW - 110, PY + PH - 51, { size: 26, col: '#7a7090' }) }
  // the CPU meter
  const v = clean ? lerp(1.15, 0.3, ease.outCubic(prog(t, CLEAN, CLEAN + 1))) : lerp(0.9, 1.25, prog(t, 0, 6.5))
  meter(x, t, 870, 1100, 90, 220, v, { title: 'CPU' })
  // Virgo + the red pen
  const editing = !clean
  K.hero(x, t, 380, 1270, 290, { mood: clean ? (t > REPLY ? 'heart' : 'happy') : t > 7.6 && t < 9.4 ? 'wide' : 'squint', look: clean ? [0, 0] : [0.6, -1], squash: editing ? 0.04 : -0.04, hops: [3.7, 4.5, 5.2, 6.2, CLEAN + 0.1, SENT, REPLY + 0.1] })
  if (editing) pen(x, t, 600, 1230, 1)
  if (t > REPLY) { hearts(x, t, REPLY, 380, 1080, { n: 6 }); sparkles(x, t, PX + 200, PY + 330, REPLY, 10, 140, 1) }
}

const F = makeGlitch({
  id: 'klge02', sign: 'virgo', len: 22, ending: 'loop',
  hook: 'VIRGO.EXE: draft 14 *not responding.*',
  err: { msg: ['Reply: "sounds fun!"', 'Edits: 14. Sent: 0.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 520, y: 760, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.6, dur: 0.5, g: 0.7 }, { kind: 'flash', at: CLEAN, col: MINT }],
  rec: { at: 4.6, len: 1.1, caption: 'yep. *footnotes.*', top: 1520 },
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: *editing* the feeling out' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['TOO MANY DRAFTS.', 'Feeling: outdated.'], buttons: ['EDIT', 'OK'], cy: 1100 }],
  pis: [{ at: 9.3, out: 11.4, text: 'just say yes!! i’m crying', tears: 3 }],
  stars: [{ t: 11.55, text: 'the first honest draft is usually the *kind* one.' }],
  box: { close: 14.6 },
  patch: { at: 14.6, ver: '1.2', name: 'SEND THE FIRST HONEST DRAFT', dur: 1.1, out: 16.4 },
  last: { at: 19.3, text: 'Send the *real* draft.' },
  scene, accent: '#b8406e',
  cues: [...[3.6, 4.1, 5.1, 5.6, 6.2, 6.7, 7.2].map(t => ['tick', t, 0.05]), ['pop', SENT, 987.77, 0.05, 0], ['whoosh', SENT, 0.25, 0.04], ['bell', REPLY, 1318.51, 0.05, 1, 0], ['glitter', REPLY, REPLY + 0.8]],
  music: { style: 'lofi', key: 'Dm', seed: 1802, drop: 3.0, breakdown: [9.3], lift: [CLEAN] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
