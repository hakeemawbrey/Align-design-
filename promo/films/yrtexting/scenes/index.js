// yrtexting: THEN vs NOW, "Texting your crush in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §14, music: lofi · Db)
// The format's look lives in ./thennow.js (identical in all five Block C films).
//   0–6.85    2016 (old phone video, "11·09·2016"): a bedroom at night, a chunky old smartphone. ♊ Gemini types "hey",
//             adds three pixel emojis, sends. Delivered. Then the wait, with a timestamp sticker: 9:02 PM (staring),
//             9:40 PM (pretending to read a book, upside down), 11:47 PM: BZZT! …it's the low-battery warning.
//             ♓ Pisces on the beanbag cries in solidarity.
//   6.85      card cut; the year sticker flips to 2026.
//   6.85–12.3 2026: same room, a sleek phone. Gemini types "hey! had fun tonight. again?", the thumb hovers…
//             "I meant it." SEND. Typing dots right away: "YES. thursday?" Gemini fountains hearts; Pisces sobs happily.
//   12.3–15.6 THE STARS: "clear beats *cool.* every time."  Last line: "Say *the thing*."
import {
  makeThenNow, star, pisces, speech, sfxWord, hearts, sparkles, drawBits, R, r3, lerp, prog, ease, clamp, pop01,
  INK, BONE, GOLD, PINK, HEART, INTER, MONO,
} from './thennow.js'

const GEM = 'gemini'

// ── the room
function bedroom(x, t, now) {
  R(x, now ? '#2e2552' : '#3a2a48', 0, 0, 1080, 1920)
  for (let i = 0; i < 10; i++) R(x, now ? '#342a5c' : '#423052', i * 110 + 40, 0, 10, 1300)
  // window (left) with the moon
  R(x, INK, 50, 440, 300, 260); R(x, '#15113a', 58, 448, 284, 244)
  x.fillStyle = '#fff1c0'; x.beginPath(); x.arc(270, 520, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#15113a'; x.beginPath(); x.arc(284, 510, 26, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 8; i++) R(x, '#cfc6ff', 80 + (i * 61) % 240, 470 + (i * 43) % 190, 5, 5)
  R(x, INK, 196, 448, 8, 244)
  // a beanbag with Pisces
  x.fillStyle = INK; x.beginPath(); x.ellipse(200, 950, 140, 74, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = now ? '#7a5cc4' : '#a0506a'; x.beginPath(); x.ellipse(200, 950, 132, 66, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = now ? '#8f72d8' : '#b8607e'; x.beginPath(); x.ellipse(170, 930, 70, 26, -0.2, 0, Math.PI * 2); x.fill()
  // floor + rug
  R(x, now ? '#231b40' : '#2c1e30', 0, 1300, 1080, 620); R(x, INK, 0, 1296, 1080, 6)
  R(x, now ? '#2c2352' : '#3a2638', 120, 1440, 840, 180); for (let i = 0; i < 20; i++) { R(x, now ? '#2c2352' : '#3a2638', 130 + i * 42, 1620, 8, 22); R(x, now ? '#2c2352' : '#3a2638', 130 + i * 42, 1418, 8, 22) }
  // desk lamp glow
  const g = x.createRadialGradient(840, 470, 10, 840, 520, 520); g.addColorStop(0, `rgba(255,214,150,${now ? 0.15 : 0.22})`); g.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = g; x.fillRect(300, 300, 780, 900)
}

// ── pixel emojis (8×8)
const EMO = {
  cool: ['..YYYY..', '.YYYYYY.', 'KKKKKKKK', 'YKKYYKKY', 'YYYYYYYY', 'YKYYYYKY', '.YYKKYY.', '..YYYY..'],
  flip: ['..YYYY..', '.YKKKKY.', 'YKYYYYKY', 'YYYYYYYY', 'YKKYYKKY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..'],
  spark: ['...W....', '...W....', '..WWW...', 'WWWWWWW.', '..WWW...', '...W..W.', '...W.WWW', '......W.'],
}
const EMO_COL = { Y: '#ffd23a', K: INK, W: '#ffe27a' }
function emoji(x, kind, cx, cy, c, k = 1) { if (k > 0.01) drawBits(x, EMO[kind], EMO_COL, cx, cy, c * k, { outline: kind === 'spark' ? INK : null }) }

// ── the phone (old: chunky + home button; new: thin bezel)
function wrapLines(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const s = cur ? cur + ' ' + w : w; if (x.measureText(s).width > maxW && cur) { out.push(cur); cur = w } else cur = s }
  if (cur) out.push(cur); return out
}
function phone(x, t, o) {
  const { cx, top, w, h, old } = o
  const L = cx - w / 2, bz = old ? 34 : 16, bt = old ? 96 : 26, bb = old ? 120 : 26
  // body
  R(x, 'rgba(6,4,18,0.45)', L + 20, top + 26, w, h)
  R(x, INK, L - 8, top - 8, w + 16, h + 16)
  R(x, old ? '#34343e' : '#14102a', L, top, w, h)
  if (old) { R(x, '#4a4a56', L, top, w, 12); R(x, INK, cx - 50, top + 40, 100, 12); x.fillStyle = INK; x.beginPath(); x.arc(cx, top + h - 60, 36, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a4a56'; x.beginPath(); x.arc(cx, top + h - 60, 28, 0, Math.PI * 2); x.fill() }
  const sx = L + bz, sy = top + bt, sw = w - 2 * bz, sh = h - bt - bb
  R(x, old ? '#e8eef6' : '#faf6ff', sx, sy, sw, sh)
  x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
  // header
  R(x, old ? '#c8d4e6' : '#efe6ff', sx, sy, sw, 76); R(x, 'rgba(27,18,54,0.15)', sx, sy + 76, sw, 3)
  x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('crush', cx - 12, sy + 40)
  drawBits(x, ['..P..', '.PPP.', 'PPPPP', '.P.P.'], { P: PINK }, cx + 66, sy + 38, 5)
  // input bar
  const ib = sy + sh - 84
  R(x, old ? '#d4dce8' : '#efe6ff', sx, ib, sw, 84)
  R(x, INK, sx + 16, ib + 16, sw - 104, 52); R(x, '#ffffff', sx + 19, ib + 19, sw - 110, 46)
  R(x, INK, sx + sw - 76, ib + 14, 60, 56); R(x, o.sendHot ? HEART : (old ? '#7a8aa8' : '#7a5cc4'), sx + sw - 72, ib + 18, 52, 48)
  drawBits(x, ['W...', 'WW..', 'WWW.', 'WWWW', 'WWW.', 'WW..', 'W...'], { W: '#ffffff' }, sx + sw - 46, ib + 42, 4, { outline: null })
  x.font = `600 32px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK
  if (o.input) {
    const lines = wrapLines(x, o.input.text, sw - 140)
    const last = lines[lines.length - 1] || ''
    x.fillText(last, sx + 30, ib + 43)
    let ex = sx + 30 + x.measureText(last).width + 8
    for (const [kind, at] of (o.input.emojis || [])) { if (t >= at) { emoji(x, kind, ex + 16, ib + 42, 3.8, pop01(t, at, 0.2, 3)); ex += 38 } }
    if (Math.floor(t * 3) % 2 === 0) R(x, '#3b49c8', ex, ib + 26, 3, 34)
  }
  // messages (bottom-up)
  x.font = `600 37px ${INTER}`
  let y = ib - 24
  const vis = (o.msgs || []).filter(m => t >= m.at)
  const typingOn = o.typing && t >= o.typing[0] && t < o.typing[1]
  if (typingOn) {
    R(x, INK, sx + 18, y - 54, 110, 54); R(x, '#e2dcf0', sx + 21, y - 51, 104, 48)
    for (let i = 0; i < 3; i++) { const b = Math.sin(t * 9 - i) > 0.3 ? -5 : 0; R(x, '#7a6a9a', sx + 40 + i * 26, y - 32 + b, 14, 14) }
    y -= 72
  }
  if (o.delivered && t >= o.delivered) { x.font = `700 20px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.5)'; x.textAlign = 'right'; x.fillText(o.read ? 'Delivered' : 'Delivered', sx + sw - 20, y - 4); y -= 30; x.font = `600 37px ${INTER}` }
  for (let i = vis.length - 1; i >= 0; i--) {
    const m = vis[i], k = pop01(t, m.at, 0.25, 2.2)
    const lines = wrapLines(x, m.text, sw - 120)
    const ew = (m.emojis ? m.emojis.length * 46 + 10 : 0)
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 44 + ew, bh = lines.length * 46 + 30
    const bx = m.side === 'R' ? sx + sw - 18 - bw : sx + 18
    y -= bh
    x.save(); x.translate(m.side === 'R' ? bx + bw : bx, y + bh); x.scale(k, k); x.translate(-(m.side === 'R' ? bx + bw : bx), -(y + bh))
    R(x, INK, bx - 3, y - 3, bw + 6, bh + 6); R(x, m.side === 'R' ? (old ? '#4f8ad8' : '#7a5cc4') : '#e2dcf0', bx, y, bw, bh)
    x.fillStyle = m.side === 'R' ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, j) => x.fillText(l, bx + 22, y + 38 + j * 46))
    if (m.emojis) { let ex = bx + 22 + x.measureText(lines[lines.length - 1]).width + 26; for (const kind of m.emojis) { emoji(x, kind, ex, y + bh - 38, 4.2); ex += 46 } }
    x.restore()
    y -= 16
  }
  // the low-battery banner (old phone)
  if (o.banner) {
    const bk = ease.outBack(prog(t, o.banner[0], o.banner[0] + 0.3)) * (1 - ease.inCubic(prog(t, o.banner[1], o.banner[1] + 0.25)))
    if (bk > 0.01) {
      const by = sy - 120 + 150 * bk
      R(x, INK, sx + 14, by, sw - 28, 104); R(x, '#fff6d0', sx + 18, by + 4, sw - 36, 96)
      R(x, INK, sx + 34, by + 30, 54, 30); R(x, '#ff5a4a', sx + 38, by + 34, 8, 22); R(x, INK, sx + 88, by + 38, 6, 14)
      x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('Battery low', sx + 110, by + 38)
      x.font = `600 22px ${INTER}`; x.fillStyle = '#6a5a7a'; x.fillText('10% remaining', sx + 110, by + 72)
    }
  }
  x.restore()
}
function timeSticker(x, t, text, at, { col = '#fff6d0', rot = -0.04 } = {}) {
  const k = pop01(t, at, 0.25, 2.6)
  if (k <= 0.01) return
  x.save(); x.translate(712, 462); x.rotate(rot); x.scale(k, k)
  x.font = `700 46px ${MONO}`; const w = x.measureText(text).width + 40
  R(x, INK, -w / 2 - 6, -38, w + 12, 76); R(x, col, -w / 2, -32, w, 64)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

const PH = { cx: 712, top: 480, w: 520, h: 900 }

// ── A: 2016
const A = { type: [0.55, 0.95], e: [1.25, 1.5, 1.75], send: 2.2, t1: 2.75, t2: 3.75, book: [3.75, 4.0], t3: 4.85, buzz: 4.95, flop: 5.75 }
function sceneA(x, t) {
  bedroom(x, t, false)
  pisces(x, t, 200, 860, 140, t > A.flop ? 3 : t > A.t2 ? 2 : 1, { mood: 'wide', look: [1, 0], hops: [A.flop] })
  const typed = 'hey'.slice(0, Math.floor(3 * prog(t, ...A.type) + 0.001))
  const sent = t >= A.send
  phone(x, t, {
    ...PH, old: true,
    msgs: [{ at: A.send, side: 'R', text: 'hey', emojis: ['cool', 'flip', 'spark'] }],
    input: sent ? { text: '' } : { text: typed, emojis: A.e.map((at, i) => [['cool', 'flip', 'spark'][i], at]) },
    delivered: A.send + 0.3, sendHot: t > A.send - 0.15 && t < A.send + 0.15,
    banner: [A.buzz, 6.6],
  })
  // Gemini: typing, staring, the book, the buzz, the flop
  let gm = 'sparkle', gl = [1, 0], gy = 1140
  if (t > A.send) gm = 'happy'
  if (t > A.t1) { gm = 'wide'; gl = [1, -0.4] }
  if (t > A.t2) { gm = 'neutral'; gl = [1, -0.6] }
  if (t > A.buzz) { gm = 'sparkle'; gl = [1, -0.6] }
  if (t > A.flop) { gm = 'squint'; gl = undefined; gy = 1170 }
  const sq = t > A.flop && t < A.flop + 0.5 ? 0.12 * Math.sin((t - A.flop) * 18) : 0
  star(x, t, 260, gy, 250, GEM, { mood: gm, look: gl, seed: 4, hops: [A.type[0], A.send, A.buzz + 0.05], squash: sq, glow: 1 })
  // the upside-down book
  const bk = pop01(t, A.book[0], 0.3, 2) * (1 - prog(t, A.buzz, A.buzz + 0.15))
  if (bk > 0.01) {
    x.save(); x.translate(260, 1210); x.rotate(Math.PI + 0.06); x.scale(bk, bk)
    R(x, INK, -110, -70, 220, 140); R(x, '#3b6ac8', -104, -64, 102, 128); R(x, '#4f8ad8', 2, -64, 102, 128); R(x, INK, -3, -64, 6, 128)
    x.font = `800 22px ${INTER}`; x.fillStyle = '#fff6d0'; x.textAlign = 'center'; x.fillText('BOOK', -52, 0)
    x.restore()
  }
  timeSticker(x, t, '9:02 PM', A.t1)
  if (t > A.t2) timeSticker(x, t, '9:40 PM', A.t2, { rot: 0.03 })
  if (t > A.t3) timeSticker(x, t, '11:47 PM', A.t3, { rot: -0.05, col: '#ffd0d8' })
  if (t > A.buzz) { const sh = Math.sin(t * 60) * 8 * (1 - prog(t, A.buzz, A.buzz + 0.6)); sfxWord(x, t, 330 + sh, 720, A.buzz, 'BZZT!', { size: 60, col: GOLD, rot: 0.08, life: 0.9 }) }
  sfxWord(x, t, 300, 960, A.flop, '…oh.', { size: 50, col: BONE, rot: -0.06, life: 1.0 })
}

// ── B: 2026
const MSG = 'hey! had fun tonight. again?'
const B = { type: [7.25, 8.35], hover: 8.5, meant: 8.75, send: 9.35, typing: [9.65, 10.25], reply: 10.25, joy: 10.4, heart: 11.2 }
function sceneB(x, t) {
  bedroom(x, t, true)
  pisces(x, t, 200, 860, 140, t > B.joy ? 3 : 1, { mood: t > B.joy ? 'happy' : 'sparkle', look: [1, 0], hops: [B.joy + 0.05] })
  const n = Math.floor(MSG.length * prog(t, ...B.type) + 0.001)
  const sent = t >= B.send
  phone(x, t, {
    ...PH, old: false,
    msgs: [{ at: B.send, side: 'R', text: MSG }, { at: B.reply, side: 'L', text: 'YES. thursday?' }, { at: B.heart, side: 'R', text: 'thursday.', emojis: ['spark'] }],
    input: sent ? { text: '' } : { text: MSG.slice(0, n) }, typing: B.typing,
    sendHot: t > B.hover && t < B.send + 0.15,
  })
  let gm = 'happy', gl = [1, 0]
  if (t > B.hover) { gm = 'wide'; gl = [1, 0.4] }
  if (t > B.meant) { gm = 'happy'; gl = undefined }
  if (t > B.send) { gm = 'neutral'; gl = [1, -0.5] }
  if (t > B.reply) { gm = 'heart'; gl = undefined }
  star(x, t, 260, 1140, 250, GEM, { mood: gm, look: gl, seed: 4, glow: 1.2, hops: [B.type[0], B.meant, B.send, B.joy, B.joy + 0.45, B.heart] })
  timeSticker(x, t, '9:02 PM', 7.15, { col: '#e6ddff' })
  if (t > B.joy) hearts(x, t, 260, 980, B.joy, { n: 9, life: 1.8, cell: 6, spread: 260 })
  sparkles(x, t, 680, 1000, B.reply, 10, 200, 1, [HEART, GOLD, BONE], 24)
  speech(x, t, 300, 650, B.meant, 'I meant it.', { size: 50, tail: -1, life: 0.95, col: '#ffe1ec' })
  sfxWord(x, t, 400, 1360, B.send, 'SEND.', { size: 58, col: PINK, rot: -0.08, life: 0.8 })
}

const EP = makeThenNow({
  id: 'yrtexting', thing: 'Texting your crush', then: 2016, date: '11·09·2016', accent: '#ff8fb1',
  A: { draw: sceneA }, B: { draw: sceneB },
  line: 'clear beats *cool.* every time.',
  last: 'Say *the thing*.',
  cues: () => [
    ...[0, 1, 2].map(i => ['tick', r3(A.type[0] + i * 0.15), 0.035]), ...A.e.map((at, i) => ['pop', at, [1046.5, 1174.66, 1318.51][i], 0.035, 0.3]),
    ['whoosh', A.send, 0.3, 0.035], ['pop', r3(A.send + 0.05), 1567.98, 0.03, 0.3],
    ['tick', A.t1, 0.05], ['tick', A.t2, 0.05], ['whoosh', A.book[0], 0.2, 0.02], ['tick', A.t3, 0.05],
    ['tom', A.buzz, 70, { gain: 0.2, decay: 0.25 }], ['tom', r3(A.buzz + 0.12), 70, { gain: 0.18, decay: 0.25 }], ['pop', r3(A.buzz + 0.1), 1318.51, 0.035, 0.3],
    ['pluck', A.flop, 330, 0.03, 0.6, 0], ['pluck', r3(A.flop + 0.18), 262, 0.025, 0.6, 0],
    ['tick', 7.15, 0.04], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(B.type[0] + i * 0.09), 0.02]),
    ['pluck', B.hover, 880, 0.02, 0.4, 0], ['pop', B.meant, 1046.5, 0.035, -0.3],
    ['whoosh', B.send, 0.3, 0.04], ['pop', r3(B.send + 0.05), 1567.98, 0.035, 0.3],
    ['tick', B.typing[0], 0.02], ['tick', r3(B.typing[0] + 0.15), 0.02], ['tick', r3(B.typing[0] + 0.3), 0.02],
    ['pop', B.reply, 1318.51, 0.05, -0.2], ['pop', r3(B.reply + 0.07), 1760, 0.035, -0.2], ['glitter', B.reply, r3(B.reply + 0.45)],
    ['pop', B.heart, 1174.66, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void clamp; void lerp
