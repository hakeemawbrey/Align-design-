// kbhe16: BRAIN VS HEART, Ep 16 "The Whole First Date" (75.6 s vertical, LONG, star_talk post, music: cinematic · D). Hard cut.
// One whole first date inside ♋ Cancer's head, in five rounds, refereed by THE STARS (standing on the console button).
//   0.00   frame 0: mid whip zoom; Heart mid-cannonball into the closet (clothes frozen mid-air), ref mid-whistle.
//          Title "Cancer's first date. | *Five rounds.* Go."  3.4 the promise: "Stay for *round five.*"
//   7.0    R1 THE OUTFIT: safe sweater vs the sparkly one → sweater + sparkly socks. (both)
//  20.0    R2 THE ARRIVAL: twenty minutes early → "walk around the block" (laps 1–4). (Brain)
//  33.0    R3 WHAT TO ORDER: no spaghetti; share everything → dumplings. (both)
//  46.0    R4 THE AWKWARD SILENCE: backup topics (weather? taxes?) vs "ask about their dog" → Biscuit. (Heart)
//  59.0    R5 THE GOODNIGHT: "this was nice" + "I'd love to do it again" — Cancer says both. (both)
//  72.0    4–4. Notification: "when's round two?"  REF: "It's a draw. *Everybody wins.*"  (hard cut 75.6)
// Pisces cam: sniffles all date, full happy fountains at the goodnight. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues } from '../../hookkit.js'
import { drawChat, key, clamp, lerp, prog, ease, pop01, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar, bubble } from '../../kbhe01/bhkit.js'
import { makeLong, BOTH } from '../longkit.js'

export const DURATION = 75.6
const SIGN = 'cancer', CAN = signStar('cancer'), DATE = '#c9a6ff'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Cancer's first date. | *Five rounds.* Go.", top: 168, size: 96, out: [3.1, 3.35] }
const PROMISE = { at: 3.4, text: 'Stay for | *round five.*', top: 180, size: 104, out: [6.6, 6.9] }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const SHAKES = [{ at: 12.6, len: 0.4, amp: 18 }, { at: 39.0, len: 0.35, amp: 12 }]
const NOTIF = { at: 72.2, out: [75.0, 75.3], title: 'texts', body: "Jamie: when's *round two?*", glyph: '♒', time: 'now', y: 110 }

// ── window views
function closet(x, t, Rw, u) {
  x.fillStyle = '#3a2440'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, INK, Rw.x + 60, Rw.y + 60, 10, Rw.h); R(x, '#c9a06a', Rw.x + 40, Rw.y + 70, Rw.w - 80, 12)
  const cols = ['#ff8fa0', '#7fd0ff', '#ffd23a', '#9fe6b0', '#c9a6ff', '#f39a3a', '#ff5c7a']
  cols.forEach((c, i) => {
    const fly = u < 6.5
    const ph = i * 0.9
    const cx = Rw.x + 120 + i * 120 + (fly ? Math.sin(t * 2 + ph) * 30 : 0), cy = Rw.y + 200 + (fly ? Math.sin(t * 3 + ph) * 60 - 40 * (i % 2) : 0)
    x.save(); x.translate(cx, cy); x.rotate(fly ? Math.sin(t * 2.5 + ph) * 0.8 : 0)
    R(x, INK, -50, -60, 100, 140); R(x, c, -44, -54, 88, 128); R(x, INK, -70, -60, 140, 30); R(x, c, -64, -54, 128, 18)
    x.restore()
  })
}
function outfits(x, t, Rw, u) {
  x.fillStyle = '#2a1c48'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  const merged = u > 8.2
  const draw = (cx, col, label, sparkle) => {
    R(x, INK, cx - 110, Rw.y + 120, 220, 230); R(x, col, cx - 104, Rw.y + 126, 208, 218); R(x, INK, cx - 160, Rw.y + 120, 320, 70); R(x, col, cx - 154, Rw.y + 126, 308, 58)
    if (sparkle) for (let i = 0; i < 14; i++) { const on = Math.sin(t * 6 + i * 1.7) > 0; if (on) R(x, '#fff', cx - 90 + (i * 47) % 180, Rw.y + 140 + (i * 31) % 190, 8, 8) }
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText(label, cx, Rw.y + 410)
  }
  if (!merged) { draw(310, '#8a6a9a', 'THE SAFE SWEATER', false); draw(770, '#d05ac0', 'THE SPARKLY ONE', true); x.fillStyle = GOLD; x.font = `800 60px ${INTER}`; x.fillText('VS', 540, Rw.y + 260) }
  else {
    const k = pop01(u, 8.2, 0.4, 2)
    x.save(); x.translate(540, 0); x.scale(k, 1); x.translate(-540, 0); draw(540, '#8a6a9a', 'SWEATER + SPARKLY SOCKS', false); x.restore()
    for (const sx of [480, 600]) { R(x, INK, sx - 26, Rw.y + 440, 52, 80); R(x, '#d05ac0', sx - 20, Rw.y + 446, 40, 68); if (Math.sin(t * 8 + sx) > 0) R(x, '#fff', sx - 6, Rw.y + 466, 8, 8) }
  }
}
function arrival(x, t, Rw, u) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#2a3a70'); g.addColorStop(1, '#4a3a6a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  // the block: a square path around a building
  const bx = 540, by = Rw.y + 280, W = 520, H = 280
  R(x, '#5a4a7a', bx - W / 2, by - H / 2, W, H); R(x, '#ffd98a', bx - 40, by - 30, 80, 60)
  x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('THE CAFÉ', bx, by + 70)
  x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 6; x.setLineDash([16, 12]); x.strokeRect(bx - W / 2 - 40, by - H / 2 - 40, W + 80, H + 80); x.setLineDash([])
  // clock
  const mins = Math.min(59, 40 + Math.floor(Math.max(0, u - 1) * 2.2))
  R(x, INK, Rw.x + 30, Rw.y + 24, 230, 70); x.fillStyle = '#ffd23a'; x.font = `700 44px ${MONO}`; x.textAlign = 'left'; x.fillText(`7:${mins}`, Rw.x + 50, Rw.y + 74)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('date: 8:00', Rw.x + 290, Rw.y + 66)
  // Cancer walking laps from u = 4.6
  if (u > 4.6) {
    const p = ((u - 4.6) * 0.42) % 1, L = 2 * (W + 80) + 2 * (H + 80)
    let d = p * L, px, py
    const x0 = bx - W / 2 - 40, y0 = by - H / 2 - 40, w = W + 80, h = H + 80
    if (d < w) { px = x0 + d; py = y0 } else if ((d -= w) < h) { px = x0 + w; py = y0 + d } else if ((d -= h) < w) { px = x0 + w - d; py = y0 + h } else { d -= w; px = x0; py = y0 + h - d }
    drawStarChar(x, px, py - 20, 90, t, { color: CAN.color, mood: 'happy', seed: 4, glow: 0.4 })
    const lap = Math.min(4, 1 + Math.floor((u - 4.6) * 0.42))
    R(x, INK, Rw.x + Rw.w - 250, Rw.y + 24, 220, 70); x.fillStyle = '#9fe6b0'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText(`LAP ${lap}`, Rw.x + Rw.w - 140, Rw.y + 74)
  }
}
function menu(x, t, Rw, u) {
  x.fillStyle = '#3a2440'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, INK, 300, Rw.y + 30, 480, Rw.h - 60); R(x, '#f4e8cc', 306, Rw.y + 36, 468, Rw.h - 72)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText('MENU', 540, Rw.y + 100)
  const items = ['spaghetti', 'dumplings', 'big soup', 'tacos', 'one giant pie']
  const ptr = u < 5.6 ? -1 : u < 7.0 ? Math.floor((u - 5.6) * 6) % items.length : 1
  items.forEach((it, i) => {
    const y = Rw.y + 170 + i * 70
    x.fillStyle = i === ptr ? '#d0306a' : INK; x.font = `700 34px ${INTER}`; x.fillText(it, 540, y)
    if (i === 0 && u > 1.2) { R(x, '#ff3b5c', 440, y - 14, 200, 6) }
  })
  if (u > 7.0) { const k = pop01(u, 7.0, 0.3, 2.4); x.save(); x.translate(540, Rw.y + 228); x.scale(k, k); x.strokeStyle = '#ff3b5c'; x.lineWidth = 7; x.beginPath(); x.ellipse(0, 0, 140, 42, -0.05, 0, 7); x.stroke(); x.restore() }
}
function silence(x, t, Rw, u) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#4a2a3a'); g.addColorStop(1, '#2a1a2a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, INK, Rw.x, Rw.y + 400, Rw.w, 170); R(x, '#f4e8cc', Rw.x, Rw.y + 406, Rw.w, 170)
  const lit = u > 6.0
  drawStarChar(x, 540, Rw.y + 300, 230, t, { color: DATE, mood: lit ? 'sparkle' : 'neutral', look: lit ? [0, 0] : [Math.sin(t), 0.5], seed: 7, glow: 0.6 })
  if (!lit && u > 0.6) { x.fillStyle = BONE; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.fillText('…', 760, Rw.y + 200); x.font = `700 26px ${MONO}`; x.fillStyle = '#9fe6b0'; if (Math.sin(t * 9) > 0) x.fillText('* chirp *', 300, Rw.y + 140) }
  if (lit) {
    const k = pop01(u, 6.2, 0.3, 2.4)
    x.save(); x.translate(820, Rw.y + 210); x.scale(k, k); x.rotate(0.08)
    R(x, INK, -90, -120, 180, 240); R(x, '#14102a', -80, -110, 160, 220); R(x, '#e0a868', -60, -40, 120, 70); R(x, '#a86a38', -60, -70, 40, 40); R(x, INK, -20, -20, 10, 10)
    x.fillStyle = BONE; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillText('BISCUIT', 0, 80)
    x.restore()
    for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = '#ff6f86'; x.font = `800 ${30 + i * 4}px ${INTER}`; x.fillText('♥︎', 380 + i * 60, Rw.y + 330 - ph * 200); x.restore() }
  }
}
function doorstep(x, t, Rw, u) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#141a40'); g.addColorStop(1, '#2a2050'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, INK, 220, Rw.y + 60, 14, 440); x.save(); x.globalCompositeOperation = 'lighter'; const lg = x.createRadialGradient(227, Rw.y + 70, 10, 227, Rw.y + 70, 300); lg.addColorStop(0, 'rgba(255,220,150,0.5)'); lg.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = lg; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h); x.restore()
  R(x, '#ffd98a', 206, Rw.y + 50, 42, 30)
  R(x, INK, 700, Rw.y + 120, 200, 360); R(x, '#7a4a3a', 708, Rw.y + 128, 184, 352); R(x, GOLD, 860, Rw.y + 300, 16, 16)
  R(x, '#4a3a6a', Rw.x, Rw.y + 480, Rw.w, 80)
  drawStarChar(x, 600, Rw.y + 380, 200, t, { color: DATE, mood: u > 6.4 ? 'heart' : 'sparkle', look: [-1, 0], seed: 7, glow: 0.6 })
  drawStarChar(x, 400, Rw.y + 380, 200, t, { color: CAN.color, glyph: CAN.glyph, mood: u > 5.8 ? 'happy' : 'neutral', look: [1, 0], seed: 4, glow: 0.6 })
  bubble(x, u, { t0: 5.8, t1: 99, who: { bg: '#e8f0ff', fg: INK, acc: '#3f7cf0', tag: '♋︎ CANCER' }, x: 420, y: Rw.y + 240, tail: -20, text: "this was nice. I'd love to do it *again.*", size: 34, maxW: 520 })
}
function finale(x, t, Rw, u) {
  drawChat(x, t, Rw, { title: 'Jamie', sub: 'online', avatar: '#7fd0f0', msgs: [{ at: -3, side: 'R', text: 'got home! thank you for tonight', status: 'Read' }, { at: 72.2, side: 'L', text: "when's round two?" }] })
}

const R1 = 7, R2 = 20, R3 = 33, R4 = 46, R5 = 59, OUT = 72
const L = makeLong({
  sign: SIGN, duration: DURATION, buttonLabel: 'FIRST DATE', buttonCol: '#7fb0f0',
  cam: { tears: [[0, 1], [R4, 2], [R5 + 5.8, 3]], mood: [[0, 'wide'], [R4 + 6, 'sparkle'], [R5 + 5.8, 'happy']], look: [0, -1], hops: [R5 + 6, R5 + 6.4, OUT + 0.5] },
  intro: {
    at: 0, len: 7, view: closet,
    lines: [{ dt: 1.2, who: 'heart', text: 'SPARKLY. *EVERYTHING.*', size: 50, t1: 3.2 }, { dt: 4.4, who: 'brain', text: 'okay. *one round* at a time.', size: 44, t1: 6.8 }],
    heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.9, 2.9], fn: (t, u) => ({ x: key(u, [[0, 640], [0.6, 830, ease.outBack]]), y: key(u, [[0, 1260], [0.6, 1440, ease.inQuad]]), rot: key(u, [[0, -0.9], [0.6, 0]]) }) }], [1.2, { mood: 'love', mouth: 'scream', arms: [2.7, 2.4], look: [-1, -1] }], [3.0, { mood: 'happy', mouth: 'grin', arms: [0.6, 0.6] }]],
    brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.7, 2.7], look: [1, -1] }], [1.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [4.4, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.2] }]],
  },
  rounds: [
    { at: R1, len: 13, n: 1, title: 'THE OUTFIT', view: outfits, point: 'both', call: 'ROUND 1: *BOTH!*',
      lines: [{ dt: 1.0, who: 'brain', text: "the *safe* sweater. it's cosy." }, { dt: 3.4, who: 'heart', text: 'the *SPARKLY* one. obviously.', size: 46 }, { dt: 6.4, who: 'brain', text: '…what if *both?*' }, { dt: 8.4, who: 'heart', text: 'sweater. *sparkly socks.* deal.' }],
      brain: [[0, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.0] }], [3.4, { mood: 'angry', mouth: 'flat', arms: [0.4, 0.4] }], [5.6, { mood: 'dizzy', mouth: 'wobble', arms: [1.2, 1.2] }], [6.4, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.4] }], [10.6, { mood: 'happy', mouth: 'grin', arms: [2.7, 2.7] }]],
      heart: [[0, { mood: 'angry', mouth: 'flat', arms: [0.4, 0.4] }], [3.4, { mood: 'love', mouth: 'scream', arms: [2.6, 2.6] }], [6.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [8.4, { mood: 'love', mouth: 'grin', arms: [2.4, 0.6] }], [10.6, { mood: 'happy', mouth: 'grin', arms: [2.7, 2.7] }]] },
    { at: R2, len: 13, n: 2, title: 'THE ARRIVAL', view: arrival, point: 'brain', call: 'ROUND 2: *BRAIN.*',
      lines: [{ dt: 1.0, who: 'heart', text: "we're here! *twenty minutes* early!", size: 42 }, { dt: 3.4, who: 'brain', text: 'walk around the *block.* casually.' }, { dt: 7.6, who: 'heart', text: 'lap *four.* they just walked in!', size: 42 }],
      brain: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [3.4, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.4] }], [7.6, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6] }], [10.6, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.8] }]],
      heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6] }], [3.4, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [4.6, { mood: 'neutral', mouth: 'flat', arms: [0.6, 0.6], fn: (t) => ({ walk: t * 3 }) }], [7.6, { mood: 'love', mouth: 'scream', arms: [2.8, 2.8] }]] },
    { at: R3, len: 13, n: 3, title: 'WHAT TO ORDER', view: menu, point: 'both', call: 'ROUND 3: *BOTH!*',
      lines: [{ dt: 1.0, who: 'brain', text: '*no* spaghetti. too messy.' }, { dt: 3.4, who: 'heart', text: "let's *share* everything!" }, { dt: 7.0, who: 'brain', text: 'dumplings. *shareable,* not messy.', size: 42 }, { dt: 9.0, who: 'heart', text: '*DUMPLINGS!*', size: 56 }],
      brain: [[0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.2] }], [3.4, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [5.6, { mood: 'dizzy', mouth: 'wobble', arms: [0.8, 0.8] }], [7.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.4] }]],
      heart: [[0, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [3.4, { mood: 'love', mouth: 'grin', arms: [2.6, 2.2] }], [5.6, { mood: 'dizzy', mouth: 'o', arms: [0.8, 0.8] }], [9.0, { mood: 'love', mouth: 'scream', arms: [2.9, 2.9] }]] },
    { at: R4, len: 13, n: 4, title: 'THE AWKWARD SILENCE', view: silence, point: 'heart', call: 'ROUND 4: *HEART.*', alarm: [0.6, 4.0],
      lines: [{ dt: 1.0, who: 'brain', text: '*silence.* deploying backup topics.', size: 42 }, { dt: 4.2, who: 'heart', text: 'ask about their *dog.*', size: 48 }, { dt: 8.0, who: 'heart', text: 'their dog is named *Biscuit.*', size: 46 }],
      brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.6, 2.6], sweat: 1 }], [1.0, { mood: 'wide', mouth: 'open', arms: [1.4, 1.4] }], [6.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], sweat: 0 }], [8.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'sad', mouth: 'flat', arms: [0.4, 0.4] }], [4.2, { mood: 'sly', mouth: 'grin', arms: [0.4, 2.6] }], [6.0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }]],
      props: (x, t, u, B) => {
        if (!B || u < 1.2 || u > 4.6) return
        const k = ease.outCubic(prog(u, 1.2, 1.8)), hx = (B.hl.x + B.hr.x) / 2, hy = Math.min(B.hl.y, B.hr.y)
        R(x, INK, hx - 80, hy - 10, 160, 40 + 190 * k); R(x, '#fffbea', hx - 74, hy - 4, 148, 28 + 190 * k)
        x.font = `700 22px ${INTER}`; x.textAlign = 'left'
        ;['- the weather', '- traffic?', '- favourite… cloud?', '- taxes??'].forEach((s, i) => { if (30 + i * 44 < 190 * k) { x.fillStyle = i === 3 ? '#d0306a' : INK; x.fillText(s, hx - 64, hy + 30 + i * 44) } })
      } },
    { at: R5, len: 13, n: 5, title: 'THE GOODNIGHT', view: doorstep, point: 'both', call: 'ROUND 5: *BOTH!*',
      lines: [{ dt: 1.0, who: 'brain', text: "say '*this was nice.*'" }, { dt: 3.2, who: 'heart', text: 'say you want to do it *AGAIN.*', size: 42 }, { dt: 8.0, who: 'both', text: '…we said *both.*', size: 52 }],
      brain: [[0, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.2] }], [3.2, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [5.8, { mood: 'cry', mouth: 'smile', arms: [2.6, 2.6], tears: 2 }]],
      heart: [[0, { mood: 'love', mouth: 'smile', arms: [0.4, 0.4] }], [3.2, { mood: 'love', mouth: 'scream', arms: [2.6, 2.6] }], [5.8, { mood: 'cry', mouth: 'grin', arms: [2.8, 2.8], tears: 3 }]] },
  ],
  outro: {
    at: OUT, len: DURATION - OUT, view: finale,
    lines: [{ dt: 0.6, who: 'stars', text: "It's a draw. *Everybody wins.*", size: 48, t1: 99, y: 1200 }],
    brain: [[0, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.8], tears: 2 }]],
    heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8], tears: 3 }]],
  },
})

export const SCENES = [L.build, whipZoom(WHIP), screenShake(SHAKE), ...SHAKES.map(screenShake), slamTitle(HOOK), slamTitle(PROMISE), ...L.chapters, notification(NOTIF)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...SHAKES.flatMap(shakeCues), ...slamTitleCues(HOOK), ...slamTitleCues(PROMISE),
  ['whoosh', 0.05, 0.6, 0.05], ['pluck', 0.15, 2637, 0.035, 0.3, 0],
  ...Array.from({ length: 4 }, (_, i) => ['pop', +(R2 + 4.6 + i / 0.42).toFixed(2), 1174.66, 0.03, 0]),
  ['bell', R3 + 7.0, 1760, 0.03, 0.8, 0], ['pluck', R4 + 1.0, 2637, 0.012, 0.1, 0.3], ['glitter', R4 + 6.0, R4 + 6.5],
  ['bell', R5 + 5.8, 1174.66, 0.035, 1.6, 0], ['glitter', R5 + 5.8, R5 + 6.4],
  ...notificationCues(NOTIF), ['bell', OUT + 0.65, 1760, 0.03, 1.6, 0],
  ...L.cues,
]
