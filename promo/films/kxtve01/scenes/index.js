// kxtve01 · Then vs Now: Extended · "Friday Night: Out All Night vs In by Nine" (60 s vertical, funk · Bb). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../tvkit.js (2016 on top, old-phone grade; 2026 below, clean).
//   0.00  HOOK: THEN ♐ Sagittarius mid-leap through a party doorway, confetti mid-air · NOW ♐ mid-flop onto a couch in a
//         face mask · both at 9:00 PM. Slam "Same Friday. | *Ten years* apart."
//   3.4   THE STARS + promise "Wait for | *2 a.m.*"
//   6.6   1 · 6 PM GETTING READY   THEN forty outfits flying · NOW one hoodie, chosen in a second
//  16.0   2 · 8 PM THE GROUP CHAT  THEN 400 messages, nobody decides · NOW "dinner at 7?" "yes." done
//  25.4   3 · 10 PM                THEN party number three · NOW bed, tea, a book
//  34.8   4 · MIDNIGHT             THEN the photo-booth strip, Pisces crying in every frame · NOW asleep, do-not-disturb
//  44.2   5 · 2 AM                 THEN pancakes at a diner with the friends · NOW 7 AM: "breakfast at mine?" to the
//                                  same friends; Pisces cries at the invite
//  53.6   payoff: the same friends in both panels; last line "Different hours. | *Same friends.*" → cut at 60.
import {
  makeThenNowX, star, room, couch, oldPhone, newPhone, chatPanel, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, rgba, GOLD, BONE, PINK, INK, HEART, INTER, MONO, SW, SH, T, TAU,
} from '../tvkit.js'

const C = T.ch, SPL = 4.4
const OUTFIT = ['#ff7aa8', '#7fd0ff', '#f2c75c', '#9fe6b0', '#c9a6ff', '#ff9a5a', '#5fd3c0']
function shirt(x, cx, cy, col, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -44, -36, 88, 80); R(x, INK, -66, -36, 132, 34)
  R(x, col, -40, -32, 80, 72); R(x, col, -62, -32, 124, 26); R(x, mixHex(col, '#000000', 0.3), -12, -32, 24, 10)
  x.restore()
}
function hoodie(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -60, -60, 120, 130); R(x, '#6a7a9a', -54, -54, 108, 118); R(x, '#5a6a8a', -30, -54, 60, 30); R(x, '#5a6a8a', -30, 20, 60, 30)
  x.restore()
}
function partyDoor(x, t, lit = 1) {
  R(x, '#3a1a4a', 0, 0, SW, SH)
  for (let i = 0; i < 7; i++) { x.save(); x.globalAlpha = 0.35 * lit; R(x, ['#ff4f86', '#7fd0ff', '#f2c75c'][i % 3], (i * 170 + t * 260) % (SW + 200) - 100, 0, 60, 430); x.restore() }
  R(x, INK, 300, 40, 400, 400); R(x, '#ffcf7a', 312, 52, 376, 388)
  for (let i = 0; i < 5; i++) star(x, t, { color: OUTFIT[i], x: 360 + i * 70, y: 300 + 20 * Math.sin(t * 8 + i), s: 80, mood: 'happy', seed: 20 + i, glyph: false })
  R(x, '#2a1438', 0, 440, SW, SH - 440)
}
function confetti(x, t, n = 40, seed = 3, freeze = false) {
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const px = r() * SW, sp = 60 + r() * 120, py = ((r() * SH + (freeze ? 0 : t * sp)) % SH)
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); R(x, OUTFIT[i % OUTFIT.length], -6, -3, 12, 6); x.restore()
  }
}
function faceMask(x, F) {
  // a green face mask on the star (cells)
  x.save(); x.translate(F.ox, F.oy); x.scale(F.sx, F.sy); x.translate(-F.S / 2, -F.S / 2 - F.base); x.scale(F.cell, F.cell)
  x.fillStyle = 'rgba(140,220,150,0.85)'; x.fillRect(9, 14, 18, 11); x.fillStyle = '#ffffff'; x.fillRect(11, 16, 5, 4); x.fillRect(20, 16, 5, 4)
  x.restore()
}
function diner(x, t) {
  R(x, '#2a4a5a', 0, 0, SW, 400)
  for (let i = 0; i < 10; i++) R(x, i % 2 ? '#e8e0d0' : '#d04040', 0, 400 + i * 21, SW, 21)
  R(x, INK, 80, 60, 840, 230); R(x, '#14103a', 90, 70, 820, 210)
  x.font = `800 44px ${INTER}`; x.fillStyle = '#ff7aa8'; x.textAlign = 'center'; x.shadowColor = '#ff7aa8'; x.shadowBlur = 16; x.fillText('OPEN ALL NIGHT', 500, 180); x.shadowBlur = 0
  R(x, INK, 120, 400, 760, 30); R(x, '#f4e6c8', 126, 404, 748, 22)
}
function pancakes(x, cx, cy, n = 4, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -70, 0, 140, 16); R(x, '#f4f4f8', -66, 2, 132, 10)
  for (let i = 0; i < n; i++) { R(x, INK, -54, -16 - i * 18, 108, 20); R(x, '#d9a050', -50, -14 - i * 18, 100, 14) }
  R(x, '#ffe08a', -14, -26 - n * 18 + 18, 28, 12)
  x.restore()
}
function bed(x, t) {
  R(x, INK, 140, 360, 720, 150); R(x, '#f4f0ff', 150, 370, 700, 60); R(x, '#7a8ad8', 150, 420, 700, 80); R(x, INK, 140, 290, 30, 220); R(x, INK, 830, 290, 30, 220)
  R(x, INK, 180, 330, 160, 60); R(x, '#ffffff', 186, 336, 148, 48)
}

// ── THEN (2016)
function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    partyDoor(x, t); confetti(x, t, 60, 4)
    const leap = t < 3.4 ? 0 : 1
    star(x, t, { sign: 'sagittarius', x: 520, y: 330 - 60 * Math.sin(Math.min(1, t / 3) * Math.PI) * (1 - leap), s: 210, mood: 'sparkle', look: [0, -1], bangs: true, seed: 9, hops: [0.1] })
    star(x, t, { sign: 'pisces', x: 840, y: 470, s: 130, mood: 'sparkle', look: [-1, -1], tears: 3, bangs: '#3a2a5a', seed: 6 })
    return
  }
  if (i === 0) {
    room(x, t, { wall: '#7a4a5a', floor: '#4a2a3a', old: true, winX: 660, winW: 260 })
    R(x, INK, 120, 90, 160, 330); R(x, '#cfe8ff', 130, 100, 140, 310)
    const n = Math.floor(u * 9)
    for (let k = 0; k < Math.min(n, 40); k++) {
      const tt = u - k / 9, r = rng(k + 3)
      if (tt > 0 && tt < 1.6) shirt(x, 470 + (r() - 0.3) * 600 * tt, 300 - 420 * tt + 380 * tt * tt, OUTFIT[k % 7], tt * 6, 0.9)
    }
    for (let k = 0; k < Math.min(n, 30); k++) R(x, OUTFIT[k % 7], 300 + (k * 53) % 600, 520 - (k % 4) * 12, 70, 16)
    star(x, t, { sign: 'sagittarius', x: 470, y: 380, s: 190, mood: u < 3 ? 'wide' : 'sparkle', look: [-1, 0], bangs: true, seed: 9, hops: [C[0] + 0.5, C[0] + 1.5, C[0] + 2.5] })
    speech(x, t, 780, 140, C[0] + 2.2, `OUTFIT #${Math.min(41, Math.floor(u * 9) + 1)}`, { size: 34, life: 2.1, col: '#fff3c8' })
  } else if (i === 1) {
    room(x, t, { wall: '#5a4a7a', floor: '#3a2a4a', old: true, win: false })
    const cnt = Math.min(400, Math.floor(u * 95))
    const msgs = ['idk', 'u guys pick', 'whatever works', 'maybe the 2nd one?', 'lol', 'wait which party', 'idk', '???'].map((m, k) => ({ text: m, me: k % 3 === 2 }))
    const off = Math.floor(u * 4) % 8
    chatPanel(x, 330, 300, 420, [0, 1, 2, 3, 4].map(k => msgs[(k + off) % 8]), { title: `THE GROUP (${cnt})` })
    star(x, t, { sign: 'sagittarius', x: 760, y: 400, s: 170, mood: u > 2.5 ? 'squint' : 'wide', look: [-1, 0], bangs: true, seed: 9 })
    oldPhone(x, 650, 430, 0.9, 0.2)
    speech(x, t, 770, 150, C[1] + 2.6, '400 MESSAGES', { size: 32, life: 1.7, col: '#ffd0d0' })
  } else if (i === 2) {
    partyDoor(x, t); confetti(x, t, 40, 9)
    star(x, t, { sign: 'sagittarius', x: 500, y: 380, s: 200, mood: 'sparkle', look: [0, 0], bangs: true, seed: 9, hops: [C[2] + 0.4, C[2] + 1.0, C[2] + 1.6, C[2] + 2.2] })
    star(x, t, { sign: 'gemini', x: 220, y: 440, s: 130, mood: 'happy', bangs: '#6a4a2a', seed: 4, hops: [C[2] + 0.7, C[2] + 1.9] })
    star(x, t, { sign: 'leo', x: 790, y: 440, s: 140, mood: 'wink', bangs: '#8a5a2a', seed: 8, hops: [C[2] + 1.1, C[2] + 2.3] })
    speech(x, t, 500, 110, C[2] + 0.5, 'PARTY 3 OF 3', { size: 34, life: 3.6, col: '#fff3c8' })
  } else if (i === 3) {
    // the photo booth strip, Pisces crying in every frame
    R(x, '#3a2a5a', 0, 0, SW, SH); for (let k = 0; k < 10; k++) R(x, '#4a3a6a', k * 100, 0, 50, SH)
    const fl = inR(u % 1.1, 0, 0.12) && u < 4.4
    for (let k = 0; k < 4; k++) {
      const fx = 140 + k * 200, shown = u > 0.3 + k * 0.9
      R(x, INK, fx - 86, 120, 172, 380); R(x, '#f4f0e6', fx - 80, 126, 160, 368)
      R(x, shown ? ['#ffb0c8', '#b0d8ff', '#ffe0a0', '#c8f0c0'][k] : '#8a8aa0', fx - 66, 140, 132, 300)
      if (shown) {
        star(x, t, { sign: 'sagittarius', x: fx - 24, y: 300, s: 70, mood: ['wink', 'sparkle', 'wide', 'happy'][k], bangs: true, seed: 9 })
        star(x, t, { sign: 'pisces', x: fx + 30, y: 310, s: 66, mood: 'sparkle', tears: 3, seed: 6 })
      }
    }
    if (fl) { x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(0, 0, SW, SH) }
  } else {
    diner(x, t)
    pancakes(x, 500, 400, 5, 1.2)
    star(x, t, { sign: 'sagittarius', x: 300, y: 330, s: 160, mood: 'happy', bangs: true, seed: 9, hops: [C[4] + 1.0, C[4] + 3.2] })
    star(x, t, { sign: 'leo', x: 700, y: 330, s: 150, mood: 'sparkle', bangs: '#8a5a2a', seed: 8 })
    star(x, t, { sign: 'gemini', x: 160, y: 520, s: 120, mood: 'happy', bangs: '#6a4a2a', seed: 4 })
    star(x, t, { sign: 'pisces', x: 860, y: 520, s: 120, mood: 'happy', tears: 2, bangs: '#3a2a5a', seed: 6 })
    if (t > T.pay) hearts(x, t, 500, 250, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

// ── NOW (2026)
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0 || i === 2) {
    room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 620 })
    couch(x, 420, 430, 560, '#5a7aa8')
    if (i < 0) {
      const F = star(x, t, { sign: 'sagittarius', x: 420, y: 300 + 40 * (1 - clamp(t / 0.6)), s: 190, mood: 'sleepy', look: [0, 1], seed: 9, squash: -0.1 * bump(t, 0, 0.6) })
      if (F) faceMask(x, F)
      return
    }
    // bed, tea, a book (10 PM)
    R(x, '#2a2a48', 0, 0, SW, SH); room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 620, lamp: true })
    bed(x, t)
    star(x, t, { sign: 'sagittarius', x: 400, y: 330, s: 160, mood: u > 6 ? 'happy' : 'neutral', look: [1, 1], seed: 9 })
    R(x, INK, 470, 330, 110, 76); R(x, '#e05a5a', 476, 336, 48, 64); R(x, '#f4f0e6', 526, 336, 48, 64)
    R(x, INK, 700, 300, 60, 64); R(x, '#f4f0ff', 706, 306, 48, 52)
    for (let k = 0; k < 3; k++) R(x, 'rgba(255,255,255,0.5)', 716 + k * 12, 280 - ((t * 30 + k * 12) % 40), 6, 14)
    return
  }
  if (i === 0) {
    room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 660, winW: 260 })
    const grab = u > SPL + 0.5
    if (!grab) hoodie(x, 260, 260, 1)
    star(x, t, { sign: 'sagittarius', x: 460, y: 390, s: 190, mood: grab ? 'happy' : 'neutral', look: [-1, 0], seed: 9, hops: [C[0] + SPL + 0.5] })
    if (grab) hoodie(x, 560, 420, 0.6)
    if (grab) speech(x, t, 760, 160, C[0] + SPL + 0.7, '0.8 SECONDS', { size: 32, life: 2.5, col: '#d8ffe0' })
  } else if (i === 1) {
    room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', win: false })
    const n = u < SPL ? 0 : u < SPL + 0.8 ? 1 : u < SPL + 1.4 ? 2 : u < SPL + 2.0 ? 3 : 4
    const msgs = [{ text: 'dinner at 7?', me: true }, { text: 'yes.', me: false }, { text: 'yes!!', me: false }, { text: 'booked ✓', me: true }].slice(0, n)
    chatPanel(x, 330, 300, 420, msgs.length ? msgs : [{ text: '…', me: true }], { title: 'THE FOUR OF US', bg: '#f8f6ff' })
    star(x, t, { sign: 'sagittarius', x: 760, y: 400, s: 170, mood: n >= 3 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 9, hops: [C[1] + SPL + 2.0] })
    newPhone(x, 650, 430, 0.9, 0.15)
  } else if (i === 3) {
    R(x, '#141838', 0, 0, SW, SH); room(x, t, { wall: '#1e2448', floor: '#141a38', winX: 620, lamp: false, sky: '#0a0a28' })
    bed(x, t)
    star(x, t, { sign: 'sagittarius', x: 400, y: 330, s: 160, mood: 'sleepy', seed: 9 })
    newPhone(x, 760, 380, 0.8, 0.0, '#2a2a5a')
    drawPixelStar(x, 760, 368, 20, 2, '#c9a6ff')
    x.font = `700 20px ${MONO}`; x.fillStyle = '#c9a6ff'; x.textAlign = 'center'; x.fillText('do not disturb', 760, 470)
  } else if (i === 4) {
    // 7 AM: sunrise kitchen, a pancake photo to the same friends
    const g = x.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#ffb07a'); g.addColorStop(1, '#ffe0b0'); x.fillStyle = g; x.fillRect(0, 0, SW, SH)
    room(x, t, { wall: '#f0c8a0', floor: '#c89a70', winX: 620, sky: '#ffcf9a', lamp: false })
    pancakes(x, 300, 420, 4, 1.1)
    star(x, t, { sign: 'sagittarius', x: 470, y: 380, s: 170, mood: u > SPL ? 'happy' : 'sleepy', look: [1, 0], seed: 9 })
    const n = u < SPL + 0.4 ? 0 : u < SPL + 1.4 ? 1 : u < SPL + 2.2 ? 2 : 3
    if (t < T.pay) chatPanel(x, 770, 260, 380, [{ text: 'breakfast at mine?', me: true }, { text: 'omw!!', me: false }, { text: 'YES. crying.', me: false }].slice(0, Math.max(1, n)), { title: 'THE SAME GROUP', k: pop01(t, C[4] + SPL + 0.2, 0.3) })
    if (t > T.pay) {
      // the friends arrive
      const a = pop01(t, T.pay + 0.2, 0.4, 2.2)
      star(x, t, { sign: 'leo', x: 660, y: 400, s: 140, mood: 'happy', pop: a, seed: 8 })
      star(x, t, { sign: 'gemini', x: 790, y: 410, s: 120, mood: 'sparkle', pop: a, seed: 4 })
      star(x, t, { sign: 'pisces', x: 900, y: 420, s: 120, mood: 'happy', tears: 3, pop: a, seed: 6 })
      hearts(x, t, 470, 240, T.pay + 0.5, { n: 6, cell: 7 })
    } else if (n >= 3) star(x, t, { sign: 'pisces', x: 900, y: 470, s: 100, mood: 'happy', tears: 3, seed: 6, pop: pop01(t, C[4] + SPL + 2.2) })
  }
  if (i !== 4 && i >= 0 && i !== 3) star(x, t, { sign: 'pisces', x: 900, y: 500, s: 90, mood: 'wide', tears: 1, seed: 6 })
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve01', thing: 'Friday night', stamp: '11·18·2016', accent: '#ff8fb1', ending: 'cut', hookTime: '9:00 PM',
  hook: { text: 'Same Friday. | *Ten years* apart.' },
  promise: 'Wait for | *2 a.m.*',
  chapters: [
    { time: '6 PM', title: 'GETTING READY' }, { time: '8 PM', title: 'THE GROUP CHAT' }, { time: '10 PM', title: 'THE PARTY / THE BOOK' },
    { time: '12 AM', title: 'MIDNIGHT' }, { time: '2 AM', title: 'PANCAKES' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same Friday, *ten years apart.*' },
    { t: 7.0, who: 'sagittarius', text: 'outfit *forty-one.* final answer.' },
    { t: 11.3, who: 'sagittarius', text: 'hoodie. *done.*' },
    { t: 16.4, who: 'stars', text: '400 messages. *zero decisions.*' },
    { t: 20.8, who: 'sagittarius', text: 'dinner at 7. *in bed by 9.*' },
    { t: 25.8, who: 'sagittarius', text: 'PARTY NUMBER *THREE!!*' },
    { t: 30.1, who: 'sagittarius', text: 'chapter three of my *book.*' },
    { t: 35.2, who: 'pisces', text: 'I cry in *every* photo booth.' },
    { t: 39.4, who: 'stars', text: 'phone on *do not disturb.* bliss.' },
    { t: 44.6, who: 'leo', text: 'pancakes at *2 a.m.* tradition!' },
    { t: 48.8, who: 'sagittarius', text: 'breakfast at mine? *same crew.*' },
    { t: 54.0, who: 'stars', text: 'the hours changed. *the people didn’t.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Different hours. | *Same friends.*',
  music: { style: 'funk', key: 'Bb', seed: 5101 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['glitter', 0.05, 0.8], ['pop', T.pay + 0.2, 880, 0.04, 0.3]],
})
