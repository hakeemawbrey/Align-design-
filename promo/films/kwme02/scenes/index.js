// kwme02: WAIT, THAT'S ME, "Rereading my text after it delivered" (9 s loop, star_advice trial, music: chiptune · A).
//   0.00  frame 0: ♍ Virgo nose-to-phone, the DELIVERED tick mid-pop; hook on.   0.32 colour flash.
//   1.2 / 2.0 / 2.8 / 3.5  READ ×1 ×2 ×3 ×4 (the counter slams bigger each time).   4.0  Virgo: "is 'soon' too eager??"
//   5.0–6.5  the slow turn.  6.6  last line: "…it said ‘see you soon.’"   8.55–9.0 loop back.
import { makeWM, wmMusic, phone, sms, bubble, label, pop01, outK, prog, ease, lerp, GOLD, RED, MINT, INTER } from '../../kwme01/wmkit.js'

const H = { x: 360, y: 1190, s: 400, face: 1 }
const READS = [1.2, 2.0, 2.8, 3.5], ASK = 4.0, TURN = 5.0
function scr(x, t) {
  return (c, w, h) => {
    c.fillStyle = '#1d1838'; c.fillRect(0, 0, w, 54); c.font = `700 26px 'Space Mono', monospace`; c.fillStyle = '#d9d4ff'; c.textAlign = 'center'; c.fillText('♉︎ the crush', w / 2, 34)
    sms(c, 'had a really nice time tonight', 'L', 90, w, { size: 28 })
    sms(c, 'me too! see you soon.', 'R', 250, w, { size: 30 })
    const k = pop01(t, -0.15, 0.3, 2.5)
    c.save(); c.globalAlpha = Math.min(1, k); c.font = `700 22px 'Space Mono', monospace`; c.fillStyle = MINT; c.textAlign = 'right'; c.fillText('Delivered ✓', w - 18, 360); c.restore()
    // the reread highlight sweeps over the sent bubble
    for (const r of READS) { const p = prog(t, r - 0.05, r + 0.45); if (p > 0 && p < 1) { c.fillStyle = 'rgba(255,226,122,0.35)'; c.fillRect(w * p - 60, 245, 60, 90) } }
  }
}
const EP = makeWM({
  id: 'kwme02', dur: 9, sign: 'virgo', turn: TURN, brk: 'flash',
  hook: '*Rereading* my text | after it delivered',
  last: '…it said ‘see you soon.’',
  hero: H, wash: '#2f8f6a',
  heroOpts: (t) => ({ mood: t > ASK - 0.1 ? 'wide' : 'squint', look: [1, -0.3], hops: [...READS, ASK], tilt: 0.1 }),
  front(x, t, a, S) {
    const k = 1 - S.turnK(t) * 0.2
    phone(x, 790, 1050 + 10 * Math.sin(t * 1.7), { w: 420, h: 680, rot: -0.06 * k, draw: scr(x, t) })
    READS.forEach((r, i) => {
      const p = pop01(t, r, 0.25, 3) * outK(t, [READS[i + 1] ?? TURN, (READS[i + 1] ?? TURN) + 0.05])
      if (p > 0.01) label(x, `READ ×${i + 1}`, 760, 690, { size: (54 + i * 14) * p, col: i === 3 ? RED : GOLD, rot: -0.08 + i * 0.05 })
    })
    bubble(x, t, 400, 820, ASK, TURN - 0.15, 'is ‘soon’ too eager??', { size: 38, tail: -0.3 })
  },
  cues: [...READS.map((r, i) => ['pop', r, 880 * (1 + i * 0.25), 0.045, 0.3]), ['pop', ASK, 1318.51, 0.05, -0.2], ['pop', ASK + 0.08, 1567.98, 0.04, -0.2]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'chiptune', key: 'A', seed: 2602 })
void [ease, lerp, INTER]
