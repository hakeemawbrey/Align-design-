// kgse22: GUESS THE SIGN, "Answering emails to avoid feelings" (9 s vertical, star_advice trial, lofi · G, loop).
//   0.00  frame 0: the silhouette mid-type at a laptop at midnight, an inbox counter spinning down.
//         Hook: "Inbox zero. *Feelings: still unread.*"
//   0.35  whip zoom · 47 emails answered → 0 · one text from the ex sits unopened on the phone beside it
//   C1 "a colour-coded calendar" · C2 "a tidy spreadsheet" · buzz · 3·2·1 · reveal: CAPRICORN · last line · loop
import { makeGuess, box, R, phone, bubble, shadow, chat, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

function laptop(x, u, rv) {
  x.save(); x.translate(760, 930)
  box(x, -230, -170, 460, 290, '#2a2148', { b: 7 }); R(x, '#10162a', -212, -152, 424, 254)
  const n = rv > 0.5 ? 0 : Math.max(0, 47 - Math.floor(u * 11))
  x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('INBOX', -196, -126)
  x.font = `900 50px ${INTER}`; x.textAlign = 'right'; x.fillStyle = n === 0 ? MINT : GOLD; x.fillText(String(n), 196, -122)
  for (let i = 0; i < 5; i++) { const y = -84 + i * 40, done = i * 10 >= n; R(x, done ? '#1e3a2e' : '#24204a', -196, y, 392, 32); x.font = `700 16px ${MONO}`; x.textAlign = 'left'; x.fillStyle = done ? MINT : BONE; x.fillText(done ? '✓ replied' : ['re: budget', 'fwd: notes', 're: q4 plan', 'meeting?', 'quick q'][i], -186, y + 17) }
  if (n === 0) label(x, 'INBOX ZERO', 0, 108, { size: 26, col: MINT, font: INTER, weight: 900 })
  box(x, -270, 120, 540, 26, '#3a3160', { b: 6 })
  x.restore()
}
function calendar(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  box(x, -90, -80, 180, 160, BONE, { b: 6 }); R(x, '#2fc79a', -90, -80, 180, 34)
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R(x, [PINK, CYAN, GOLD, MINT][(i + j) % 4], -76 + i * 40, -34 + j * 36, 30, 26)
  x.restore()
}
function sheet(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(k, k)
  box(x, -80, -100, 160, 200, '#f4f1ea', { b: 6 })
  for (let j = 0; j < 7; j++) R(x, 'rgba(47,199,154,0.5)', -80, -100 + j * 28, 160, 2)
  for (let i = 1; i < 4; i++) R(x, 'rgba(47,199,154,0.5)', -80 + i * 40, -100, 2, 200)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse22', sign: 'capricorn', D: 9, ending: 'loop', brk: 'whip',
  hook: 'Inbox zero. | *Feelings: still unread.*',
  clues: ['a colour-coded calendar', 'a tidy spreadsheet'],
  last: 'Log off. Feel it. | *You’ll be okay.*',
  bg(x, S) { R(x, '#0c0a1e', 0, 300, 1080, 1620); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(760, 900, 40, 760, 900, 500); g.addColorStop(0, 'rgba(120,170,255,0.25)'); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(200, 400, 880, 1000); x.restore(); box(x, 0, 1060, 1080, 40, '#5a3a2a', { b: 6 }); label(x, '12:04 a.m.', 900, 420, { size: 34, col: '#ff8a9a', font: MONO }) },
  draw(x, S) {
    const { t, u, rv, T } = S
    laptop(x, u, rv)
    const o = { x: 330, y: 930, s: 330, mood: rv > 0.5 ? 'sparkle' : 'squint', look: [1, 0.3], hops: Array.from({ length: 14 }, (_, i) => 0.3 + i * 0.3).filter(h => h < S.R), rot: 0.12, squash: 0.05 * Math.sin(u * 20) }
    S.sil(o)
    // the phone: one unread from the ex, untouched
    phone(x, 560, 1180, { w: 180, h: 120, rot: 0.04, fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); x2.font = `800 13px ${INTER}`; x2.fillStyle = CYAN; x2.textAlign = 'left'; x2.textBaseline = 'middle'; x2.fillText('my ex', 8, 12); chat(x2, 'hey, how are you?', 8, 26, { size: 12 }); R(x2, RED, w - 26, 4, 18, 18); x2.font = `900 12px ${INTER}`; x2.fillStyle = BONE; x2.textAlign = 'center'; x2.fillText('1', w - 17, 14) } })
    if (u > 1.8 && rv < 0.5) label(x, 'unread · 2 days', 560, 1090, { size: 22, col: '#ff8a9a', font: MONO })
    if (t > T.C1) calendar(x, 150, 640, pop01(t, T.C1 + 0.05, 0.3, 2.4))
    if (T.C2 != null) sheet(x, 950, 640, pop01(t, T.C2 + 0.05, 0.3, 2.4))
    if (rv > 0.5) bubble(x, t, 380, 700, S.R + 0.3, S.D + 1, 'laptop closed. feeling it.', { size: 30 })
  },
  cues: Array.from({ length: 14 }, (_, i) => ['tick', +(0.3 + i * 0.3).toFixed(3), 0.035]).concat([['pop', 4.3, 1567.98, 0.04, 0.3]]),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
