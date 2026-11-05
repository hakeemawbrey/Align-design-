// kwme03: WAIT, THAT'S ME, "Laughing at my own text before sending" (8 s loop, star_advice trial, music: pop · D).
//   0.00  frame 0: ♊ Gemini mid-cackle at its phone, laugh-tears flying, the camera mid-whip-zoom; hook on.
//   0.9   the draft types: "what if a penguin had a job".  2.3 SEND (whoosh).  2.9 silence: '* chirp *' … 'Read'.
//   4.2–5.7  the slow turn.  5.8  last line: "it's funny. trust."   7.55–8.0 loop back.
import { makeWM, wmMusic, phone, sms, label, bubble, inSprite, tearsCells, prog, pop01, outK, MINT, BONE } from '../../kwme01/wmkit.js'

const H = { x: 380, y: 1180, s: 400, face: 1 }
const DRAFT = 'what if a penguin had a job', TYPE = [0.7, 2.0], SEND = 2.3, CHIRP = 2.9, TURN = 4.2
const giggles = Array.from({ length: 14 }, (_, i) => -0.6 + i * 0.2).filter(v => v < SEND + 0.1)
function scr(t) {
  return (c, w, h) => {
    c.fillStyle = '#1d1838'; c.fillRect(0, 0, w, 54); c.font = `700 26px 'Space Mono', monospace`; c.fillStyle = '#d9d4ff'; c.textAlign = 'center'; c.fillText('♑︎ them', w / 2, 34)
    sms(c, 'what are you up to?', 'L', 90, w, { size: 28 })
    const n = Math.round(DRAFT.length * prog(t, ...TYPE))
    if (t < SEND) { c.fillStyle = '#2a2148'; c.fillRect(10, h - 110, w - 20, 90); c.font = `700 26px 'Space Mono', monospace`; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText(DRAFT.slice(0, Math.max(n, t < 0.7 ? 14 : 0)) + (Math.floor(t * 3) % 2 ? '|' : ''), 22, h - 60) }
    else { const p = prog(t, SEND, SEND + 0.3); sms(c, DRAFT, 'R', 250 + (1 - p) * 250, w, { size: 28 }) }
    if (t > CHIRP + 0.7) { c.font = `700 22px 'Space Mono', monospace`; c.fillStyle = MINT; c.textAlign = 'right'; c.fillText('Read', w - 18, 420) }
  }
}
const EP = makeWM({
  id: 'kwme03', dur: 8, sign: 'gemini', turn: TURN, brk: 'whip',
  hook: '*Laughing* at my own text | before sending',
  last: 'it’s funny. trust.',
  hero: H, wash: '#b08f2f',
  heroOpts: (t) => ({ mood: t < SEND + 0.4 ? 'happy' : 'neutral', look: [1, 0], hops: giggles, squash: t < SEND ? 0.05 * Math.sin(t * 30) : 0 }),
  heroAfter(x, t, a, F, k) { if (t < SEND + 0.5 && k < 0.05) inSprite(x, F, () => tearsCells(x, t, 3)) },
  front(x, t, a, S) {
    phone(x, 790, 1060 + 8 * Math.sin(t * 2), { w: 420, h: 680, rot: 0.05, draw: scr(t) })
    for (const [i, v] of giggles.entries()) { const k = pop01(t, v, 0.2, 3) * outK(t, [v + 0.45, v + 0.6]); if (k > 0.01) label(x, i % 2 ? 'HA' : 'HAHA', 260 + (i * 97) % 300, 760 - (i % 3) * 40, { size: 50 * k, col: '#ffe27a', rot: (i % 2 ? 0.2 : -0.2) }) }
    const ck = pop01(t, CHIRP, 0.2, 2) * outK(t, [TURN, TURN + 0.2])
    if (ck > 0.01) label(x, '* chirp *', 790, 720, { size: 40 * ck, col: MINT, font: "'Space Mono', monospace", weight: 700 })
    bubble(x, t, 820, 620, SEND, SEND + 0.5, 'SENT', { size: 40 })
  },
  cues: [...giggles.map((v, i) => ['pop', v + 0.01, 987.77 + (i % 3) * 120, 0.03, -0.3]), ...Array.from({ length: 12 }, (_, i) => ['tick', TYPE[0] + i * 0.11, 0.02]), ['whoosh', SEND, 0.3, 0.05],
    ['pluck', CHIRP, 2637, 0.012, 0.1, 0.3], ['pluck', CHIRP + 0.09, 2637, 0.012, 0.1, 0.3], ['pluck', CHIRP + 0.35, 2637, 0.012, 0.1, 0.3], ['pluck', CHIRP + 0.44, 2637, 0.012, 0.1, 0.3], ['tick', CHIRP + 0.7, 0.04]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'pop', key: 'D', seed: 2603 })
