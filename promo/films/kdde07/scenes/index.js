// kdde07 — DEEP DIVE: LIBRA IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; jazzy · Bb).
// Show kit: ./ddkit.js (shared by kdde07–12) on top of hookkit.js. No end card, no card cut. Hard cut on the last line.
//   0–8.5     COLD OPEN  Libra mid-spin between two menus, a giant balance scale tipping wildly, menus flying.
//             Slam title "Loving a Libra? Watch this first." · whip zoom on frame 0 · record scratch + freeze
//             "everything nobody tells you about loving a Libra" · THE STARS promise: "chapter four is the one."
//   8.5–35.5  1 HOW THEY FLIRT   compliments like confetti · mirror mode · six plans, zero booked
//  35.5–62.5  2 WHAT THEY NEED   peace, not perfection · beauty in small things · ask their opinion, then wait
//  62.5–89.5  3 HOW THEY FIGHT   "it's fine" (the scale disagrees) · they argue both sides · what actually helps
//  89.5–116.5 4 WHAT MAKES THEM STAY   fair is romantic · pick sometimes so they can rest · the payoff: you ask
//             "what do YOU want? I'll wait." and Libra answers instantly: "the pier. with you."
// 116.5–end  The pier at night. Last line: "Ask, then wait. They'll choose you." (hard cut)
// Pisces (the research assistant, bottom right) cries all film; fountains in chapter 4.
import { buildDeepDive, bits, PIX, GOLD, BONE, INK, PINK, CYAN, MINT, LAV, MONO, INTER, SERIF, rgba, mixHex, PAL } from './ddkit.js'

// ── Libra props
function drawScale(x, cx, cy, w, ang, { k = 1, alpha = 1, left = null, right = null, t = 0 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k, k)
  const P = 8
  // post + base
  x.fillStyle = INK; x.fillRect(-P * 2, -10, P * 4, 330); x.fillRect(-P * 12, 300, P * 24, P * 4)
  x.fillStyle = GOLD; x.fillRect(-P, -6, P * 2, 310); x.fillRect(-P * 11, 304, P * 22, P * 2)
  // the beam
  x.save(); x.rotate(ang)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -14, w + 12, 28); x.fillStyle = GOLD; x.fillRect(-w / 2, -8, w, 16)
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(0, 0, 13, 0, Math.PI * 2); x.fill()
  for (const d of [-1, 1]) {
    const ex = Math.cos(ang) * d * w / 2, ey = Math.sin(ang) * d * w / 2
    const sw = 0.06 * Math.sin(t * 4 + d)
    x.save(); x.translate(ex, ey); x.rotate(sw)
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-70, 130); x.moveTo(0, 0); x.lineTo(70, 130); x.stroke()
    x.fillStyle = INK; x.fillRect(-92, 126, 184, 26); x.fillStyle = GOLD; x.fillRect(-86, 130, 172, 14)
    const item = d < 0 ? left : right
    if (item) item(x, 0, 96)
    x.restore()
  }
  x.restore()
}
function menu(x, cx, cy, w, title, rot = 0, { k = 1, col = '#f4e8cc', items = ['soup', 'pasta', 'tacos'] } = {}) {
  if (k <= 0.01) return
  const h = w * 1.35
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#c42a3f'; x.fillRect(-w / 2, -h / 2, w, h * 0.2)
  x.fillStyle = '#fff8ec'; x.font = `800 ${Math.round(w * 0.16)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + h * 0.1)
  x.fillStyle = INK; x.font = `700 ${Math.round(w * 0.11)}px ${MONO}`
  items.forEach((s, i) => x.fillText(s, 0, -h / 2 + h * (0.36 + i * 0.2)))
  x.restore()
}
function pier(x, t, { alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  const g = x.createLinearGradient(0, 1100, 0, 1920); g.addColorStop(0, 'rgba(20,30,80,0.0)'); g.addColorStop(0.2, 'rgba(20,30,80,0.85)'); g.addColorStop(1, 'rgba(8,10,40,0.95)')
  x.fillStyle = g; x.fillRect(0, 1100, 1080, 820)
  for (let i = 0; i < 6; i++) { const yy = 1180 + i * 22; x.fillStyle = rgba('#ffe7a8', 0.25 - i * 0.03); x.fillRect(820 - 40 + Math.sin(t * 2 + i) * 14, yy, 80 + i * 12, 4) }
  x.fillStyle = INK; x.fillRect(0, 1150, 1080, 60)
  x.fillStyle = '#8a5a3a'; for (let i = 0; i < 14; i++) x.fillRect(i * 80 + 4, 1156, 72, 48)
  x.fillStyle = INK; for (let i = 0; i < 8; i++) x.fillRect(i * 150 + 30, 1000, 14, 160)
  x.fillRect(0, 1000, 1080, 12); x.fillStyle = '#b07a52'; x.fillRect(0, 1003, 1080, 6)
  x.restore()
}

// ── beats
const L = 'libra'
const sideBubble = (H, lt, at, bx, by, text, col) => H.bubble(bx, by, text, { k: H.pop(lt, at, 0.28, 2.2), col, size: 30 })

const chapters = [
  { note: 'Compliment them back. Then pick ONE of their six plans and book it.',
    beats: [
      { cap: 'Compliments like | *confetti.*',
        lines: [{ text: 'they notice the *nice thing* and say it out loud.' }, { who: 'sign', text: 'your laugh? *elite.* your jacket? also elite.' }],
        draw(x, t, lt, H) {
          H.hero({ mood: lt > 3.4 ? 'wink' : 'happy', look: [1, 0] })
          H.you({ mood: lt > 4.6 ? 'heart' : lt > 1.5 ? 'sparkle' : 'happy', look: [-1, 0], blush: lt > 1.5 })
          for (let i = 0; i < 26; i++) { const a = 0.7 + (i % 4) * 0.9, d = lt - a; if (d < 0 || d > 2.2) continue; const r = H.rng(i * 13 + 3); const vx = (r() - 0.3) * 520, vy = -380 - r() * 300; H.pix(['heart', 'star', 'flower'][i % 3], 420 + vx * d, 760 + vy * d + 420 * d * d, 4, { rot: d * 3 }) }
          const B = [[0.7, 'great laugh!', 560, 640], [1.6, 'nice jacket!', 760, 560], [2.5, 'smart take!', 600, 760], [4.2, 'elite shoes!', 840, 700]]
          B.forEach(([a, s, bx, by], i) => { if (lt > a) { const fly = H.ease.outCubic(H.prog(lt, a, a + 0.5)); sideBubble(H, lt, a, H.lerp(380, bx, fly), H.lerp(800, by, fly), s, [PINK, '#ffe27a', CYAN, MINT][i]) } })
        } },
      { cap: 'They *mirror* | your vibe.',
        lines: [{ text: 'you laugh, they laugh. you lean in, they lean in.' }, { text: "it's not copying. it's *tuning in.*" }],
        draw(x, t, lt, H) {
          x.save(); x.strokeStyle = rgba(CYAN, 0.6); x.lineWidth = 6; x.setLineDash([18, 16]); x.beginPath(); x.moveTo(540, 620); x.lineTo(540, 1180); x.stroke(); x.restore()
          H.label('MIRROR MODE', 540, 590, { size: 30, font: MONO, weight: 700, col: CYAN, spacing: 4, k: H.pop(lt, 0.2) })
          const moves = [1.0, 2.8, 4.6], f = lt2 => moves.reduce((a, m, i) => a + Math.max(0, Math.sin(Math.PI * H.clamp((lt2 - m) / 1.2))) * (i === 1 ? 0 : 1) * (i ? -1 : 1), 0)
          const hop = m => [m + 0.05]
          H.you({ x: 800, y: 950, mood: lt > 4.6 ? 'heart' : 'happy', look: [-1, 0], squash: -0.12 * f(lt), hops: hop(2.8) })
          H.hero({ x: 280, y: 950, mood: lt > 4.9 ? 'heart' : 'happy', look: [1, 0], squash: -0.12 * f(lt - 0.35), hops: hop(3.15) })
          if (lt > 1.0 && lt < 2.6) sideBubble(H, lt, 1.0, 800, 700, 'haha!', BONE)
          if (lt > 1.35 && lt < 2.6) sideBubble(H, lt, 1.35, 280, 700, 'haha!', BONE)
          if (lt > 4.6) { H.pix('bigheart', 540, 760, 9 * H.pop(lt, 4.9, 0.3, 2.6)); H.spark(t, 540, 760, t - lt + 4.9, 10, 170, 3) }
        } },
      { cap: 'Six plans. | *Zero* booked.',
        lines: [{ who: 'sign', text: 'we should do the pier! and a picnic! and…' }, { text: 'translation: *I want more time with you.*' }],
        draw(x, t, lt, H) {
          const P = ['THE PIER', 'PICNIC', 'MINI GOLF', 'MUSEUM', 'NIGHT MARKET', 'STARGAZING']
          P.forEach((s, i) => {
            const k = H.pop(lt, 0.3 + i * 0.45, 0.3, 2.2), cx = 300 + (i % 2) * 480, cy = 620 + Math.floor(i / 2) * 170
            H.panel(cx, cy, 400, 110, { k, rot: (i % 2 ? 0.03 : -0.03), border: i === 0 ? GOLD : mixHex('#e163d6', '#ffffff', 0.3) })
            H.label('☐ ' + s, cx, cy, { size: 34, col: BONE, k, rot: (i % 2 ? 0.03 : -0.03) })
          })
          H.hero({ x: 540, y: 1180, s: 190, mood: lt < 4 ? 'sparkle' : 'happy', look: [0, -1] })
          H.stamp('= MORE TIME WITH YOU', 540, 1010, H.pop(lt, 4.5, 0.3, 2), { col: '#ff6fa8', rot: -0.08, size: 46 })
        } },
    ] },
  { note: 'Give them a calm space and a real question. Then let them answer.',
    beats: [
      { cap: 'Peace, not | *perfection.*',
        lines: [{ text: 'they need *calm* more than they need a perfect date.' }, { text: 'a quiet night in counts. *it really does.*' }],
        draw(x, t, lt, H) {
          const calm = H.in(lt, 2.4, 3.4)
          // the noise: bolts and shouting marks swirl, then dissolve
          for (let i = 0; i < 10; i++) { const a = i * 0.63 + lt * 2.2, R = 300 + 40 * Math.sin(i * 2 + lt * 3); H.pix(i % 2 ? 'bolt' : 'exclaim', 540 + Math.cos(a) * R, 900 + Math.sin(a) * R * 0.6, 7, { alpha: 1 - calm }) }
          // the calm: a couch, a lamp, two mugs
          x.save(); x.globalAlpha = calm
          H.panel(540, 1110, 720, 90, { border: '#c06a8a', fillC: '#7a3a5a' }); H.panel(540, 1030, 760, 60, { border: '#c06a8a', fillC: '#8f4a6c' })
          x.fillStyle = rgba('#ffd98a', 0.18); x.beginPath(); x.arc(880, 760, 220, 0, Math.PI * 2); x.fill()
          H.bits(['.KKKKK.', 'KYYYYYK', 'KYYYYYK', '.KKKKK.', '...K...', '...K...', '...K...', '...K...', '..KKK..'], PAL, 880, 800, 12)
          H.pix('cup', 440, 1170, 6); H.pix('cup', 640, 1170, 6)
          x.restore()
          H.hero({ x: 420, y: 950, s: 260, mood: calm > 0.5 ? (lt > 5.5 ? 'sleepy' : 'happy') : 'wide', squash: calm > 0.5 ? 0.06 : 0, look: calm > 0.5 ? undefined : [Math.sin(lt * 7), -0.5], zzz: true })
          H.you({ x: 680, y: 960, s: 220, mood: 'happy', pop: H.pop(lt, 2.8, 0.35, 2) })
        } },
      { cap: 'Beauty in | *small things.*',
        lines: [{ who: 'sign', text: 'I moved your plant. it\'s *happier* by the window.' }, { text: "let them fix the vibe. it's how they *care.*" }],
        draw(x, t, lt, H) {
          // a window, a picture frame, a shelf
          H.panel(820, 720, 260, 300, { border: BONE, fillC: '#1d2a66' }); H.pix('moon', 860, 680, 8)
          const tilt = 0.28 * (1 - H.in(lt, 3.4, 4.0))
          H.panel(300, 640, 200, 150, { border: GOLD, fillC: '#5a7be0', rot: tilt }); H.pix('flower', 300, 640, 7, { rot: tilt })
          const mv = H.in(lt, 1.0, 2.2)
          H.pix('plant', H.lerp(260, 800, mv), H.lerp(1150, 910, mv), 12)
          if (lt > 2.2) H.spark(t, 800, 900, t - lt + 2.2, 8, 120, 5)
          if (lt > 4.0) H.spark(t, 300, 640, t - lt + 4.0, 8, 120, 6)
          const hx = lt < 1 ? 330 : lt < 2.2 ? H.lerp(330, 640, mv) : lt < 3.2 ? H.lerp(640, 420, H.in(lt, 2.2, 3.2)) : 420
          H.hero({ x: hx, y: 1000, s: 250, mood: lt > 4.0 ? 'sparkle' : 'happy', look: lt < 2.2 ? [1, 0] : [-1, -1] })
          H.you({ x: 840, y: 1150, s: 170, mood: lt > 4.6 ? 'heart' : 'happy', pop: H.pop(lt, 3.6), look: [-1, -0.4] })
        } },
      { cap: 'Ask their opinion. | *Then wait.*',
        lines: [{ who: 'you', text: 'what do *you* want for dinner?' }, { text: "then wait. they're weighing it *fairly.*" }],
        draw(x, t, lt, H) {
          H.you({ x: 790, y: 980, s: 240, mood: 'happy', look: [-1, 0] })
          H.hero({ x: 300, y: 1000, s: 260, mood: 'squint', look: [Math.sin(lt * 2.5), -1] })
          const ang = 0.35 * Math.sin(lt * 2.4) * (1 - H.in(lt, 5.6, 6.6))
          drawScale(x, 300, 610, 260, ang, { k: H.pop(lt, 1.5, 0.35, 2) * 0.75, t,
            left: (c, px, py) => menu(c, px, py, 70, 'TACOS', 0, { items: [] }), right: (c, px, py) => menu(c, px, py, 70, 'PASTA', 0, { items: [] }) })
          H.bubble(790, 720, lt > 5.6 ? "take your time ♡" : 'no rush', { k: H.pop(lt, 4.2), col: '#efe6ff', size: 30 })
          // a patience clock
          H.pix('clock', 700, 1180, 7 * H.pop(lt, 3.6)); H.label(`0:0${Math.min(9, Math.floor(H.clamp(lt - 3.6, 0, 9) * 2))}`, 790, 1180, { size: 30, font: MONO, weight: 700, col: BONE, k: H.pop(lt, 3.6) })
        } },
    ] },
  { note: 'Don\'t rush them. Say: take a minute, then tell me the real answer.',
    beats: [
      { cap: '"It\'s *fine.*"',
        lines: [{ who: 'sign', text: "it's fine. totally fine. *so* fine." }, { text: 'it is not fine. *the scale says so.*' }],
        draw(x, t, lt, H) {
          const ang = 0.55 * Math.sin(lt * 9) * H.in(lt, 0.4, 1.0)
          drawScale(x, 540, 560, 420, ang, { k: 0.9, t, left: (c, px, py) => bits(c, PIX_FINE, PAL, px, py, 5), right: (c, px, py) => bits(c, PIX_NOT, PAL, px, py, 5) })
          H.hero({ x: 540, y: 1080, s: 300, mood: 'happy', squash: 0.04 * Math.sin(lt * 30) })
          for (let i = 0; i < 3; i++) if (lt > 1.4 + i * 0.4) H.pix('sweat', 700 + i * 30, 920 + ((lt * 200 + i * 60) % 120), 6)
          H.meter(540, 1290, 520, 0.12, { label: 'ACTUALLY FINE: 12%', col: '#ff5b7a', k: H.pop(lt, 3.6) })
        } },
      { cap: 'They argue | *both sides.*',
        lines: [{ who: 'sign', text: "you're right. but also, I'm right. but also…" }, { text: 'they see every side. even *yours,* mid-fight.' }],
        draw(x, t, lt, H) {
          const sw = Math.floor(lt / 0.9) % 2
          H.star(L, { x: 260, y: 900, s: 220, mood: sw ? 'neutral' : 'squint', look: [1, 0], hops: [0.9, 2.7, 4.5] })
          H.star(L, { x: 600, y: 900, s: 220, mood: sw ? 'squint' : 'neutral', look: [-1, 0], hops: [1.8, 3.6, 5.4] })
          const said = ["YOU'RE RIGHT", 'BUT ALSO…', 'FAIR POINT', 'HOWEVER…', 'GOOD POINT', 'COUNTERPOINT']
          const n = Math.min(said.length - 1, Math.floor(lt / 0.9))
          H.bubble(n % 2 ? 600 : 260, 680, said[n], { k: H.pop(lt % 0.9, 0.02, 0.2, 2.4), col: n % 2 ? '#ffe27a' : '#ffc6f0', size: 30 })
          H.you({ x: 890, y: 1120, s: 180, mood: lt > 3 ? 'wide' : 'neutral', look: [Math.sin(lt * 6), 0] })
          H.pix('question', 890, 960, 8 * H.pop(lt, 2.4))
        } },
      { cap: 'What *actually* | helps.',
        lines: [{ who: 'you', text: 'take a minute. then tell me the *real* one.' }, { text: 'no rush. that\'s when *the truth* comes out.' }],
        draw(x, t, lt, H) {
          const calm = H.in(lt, 3.2, 4.6)
          H.pix(calm > 0.5 ? 'sun' : 'cloud', 300, 640, 10, { alpha: 1 })
          H.you({ x: 780, y: 1000, s: 240, mood: 'happy', look: [-1, 0] })
          H.card(560, 880, 170, 'What do you need right now?', { k: H.pop(lt, 1.2, 0.35, 2), rot: -0.08 })
          const ang = 0.4 * Math.sin(lt * 7) * (1 - calm)
          drawScale(x, 300, 760, 200, ang, { k: 0.5, t })
          H.hero({ x: 290, y: 1060, s: 250, mood: calm > 0.6 ? 'happy' : 'neutral', look: [1, 0] })
          if (lt > 5.0) H.bubble(290, 840, 'I felt left out.', { k: H.pop(lt, 5.0), col: '#ffc6f0', size: 30 })
        } },
    ] },
  { note: 'Make it fair, choose sometimes, and ask what they want. They\'ll tell you.',
    beats: [
      { cap: 'Fair is | *romantic.*',
        lines: [{ text: 'you take turns: who picks the movie, who texts first.' }, { who: 'sign', text: "it's your turn to pick. I kept score. *lovingly.*" }],
        draw(x, t, lt, H) {
          H.panel(540, 700, 720, 260, { border: GOLD, k: H.pop(lt, 0.2) })
          H.label('YOUR PICK', 360, 620, { size: 32, font: MONO, weight: 700, col: '#d9ccff' }); H.label('MY PICK', 720, 620, { size: 32, font: MONO, weight: 700, col: '#ffc6f0' })
          const marks = [0.8, 1.6, 2.4, 3.2, 4.0, 4.8]
          marks.forEach((m, i) => { const k = H.pop(lt, m, 0.25, 2.6); if (k > 0.01) { const sx = (i % 2 ? 640 : 280) + Math.floor(i / 2) * 50; x.save(); x.fillStyle = i % 2 ? '#ffc6f0' : '#d9ccff'; x.translate(sx, 720); x.rotate(0.1); x.scale(1, k); x.fillRect(-6, -50, 12, 100); x.restore() } })
          H.you({ x: 780, y: 1100, s: 210, mood: 'happy', hops: marks.filter((_, i) => i % 2 === 0) })
          H.hero({ x: 300, y: 1100, s: 230, mood: lt > 4.8 ? 'wink' : 'happy', hops: marks.filter((_, i) => i % 2) })
        } },
      { cap: 'Pick sometimes. | *Let them rest.*',
        lines: [{ text: 'choosing all day is tiring. *you* choose tonight.' }, { who: 'you', text: 'I booked the pier. *you just show up.*' }],
        draw(x, t, lt, H) {
          const take = H.in(lt, 3.4, 4.4)
          for (let i = 0; i < 6; i++) menu(x, H.lerp(300, 800, take) + (i - 2.5) * 6, 880 - i * 30, 150, ['MENU', 'PLAN', 'GIFT', 'RSVP', 'TIME', 'WHERE'][i], (i - 2.5) * 0.04, { items: [] })
          H.hero({ x: 300, y: 1050, s: 260, mood: lt < 3.4 ? 'sleepy' : lt > 5 ? 'sparkle' : 'wide', squash: lt < 3.4 ? 0.1 : 0 })
          H.you({ x: 780, y: 1060, s: 230, mood: 'happy', look: [-1, -0.5] })
          if (lt > 4.6) H.stamp('BOOKED ♡', 540, 900, H.pop(lt, 4.6), { col: MINT, size: 52 })
        } },
      { cap: 'The *question.*',
        lines: [{ who: 'you', text: 'what do *you* want? I\'ll wait.' }, { who: 'sign', text: '…the pier. *with you.*', at: 3.2 }],
        draw(x, t, lt, H) {
          H.you({ x: 780, y: 1000, s: 250, mood: lt > 3.4 ? 'heart' : 'happy', look: [-1, 0] })
          const ans = lt > 3.2
          drawScale(x, 540, 560, 360, ans ? 0 : 0.3 * Math.sin(lt * 5), { k: 0.8, t,
            left: (c, px, py) => bits(c, PIX.bigheart, PAL, px, py, ans ? 6 : 0), right: (c, px, py) => bits(c, PIX.bigheart, PAL, px, py, ans ? 6 : 0) })
          H.hero({ x: 300, y: 1020, s: 260, mood: ans ? 'heart' : 'sparkle', look: [1, 0], hops: [3.25] })
          H.stamp('INSTANT ANSWER', 540, 1260, H.pop(lt, 3.6), { col: GOLD, size: 44, rot: -0.06 })
          if (ans) H.spark(t, 540, 700, t - lt + 3.3, 14, 260, 9)
        } },
    ] },
]
const PIX_FINE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWKKKKKWK', 'KWWWWWWWK', 'KWKKKKWWK', 'KWWWWWWWK', 'KKKKKKKKK']
const PIX_NOT = ['.KKKKKKK.', 'KRRRRRRRK', 'KRRWWWRRK', 'KRRWRWRRK', 'KRRWWWRRK', 'KRRRRRRRK', '.KKKKKKK.']

const DD = buildDeepDive({
  id: 'kdde07', sign: L, ep: 7, ending: 'cut',
  hook: { text: 'Loving a *Libra?* | Watch this first.' },
  promise: 'stay for *chapter four.* that\'s the one.',
  cold(x, t, H) {
    const ang = 0.5 * Math.sin(t * 6.5 + 0.9)
    drawScale(x, 540, 760, 520, ang, { k: 1, t,
      left: (c, px, py) => menu(c, px, py, 90, 'A', 0, { items: [] }), right: (c, px, py) => menu(c, px, py, 90, 'B', 0, { items: [] }) })
    for (let i = 0; i < 4; i++) { const a = t * 2.4 + i * Math.PI / 2; menu(x, 540 + Math.cos(a) * 400, 1010 + Math.sin(a) * 190, 120, ['MENU', 'MENU', 'MENU', 'MENU'][i], a, { col: i % 2 ? '#f4e8cc' : '#e9e2f5' }) }
    H.hero({ x: 540, y: 1040, s: 320, mood: 'wide', look: [Math.sin(t * 9), -0.3], rot: 0.3 * Math.sin(t * 8.5 + 1.2) })
  },
  chapters,
  outro(x, t, lt, H) {
    pier(x, t)
    H.pix('moon', 860, 620, 12)
    H.hero({ x: 420, y: 1010, s: 260, mood: 'heart', look: [1, 0] })
    H.you({ x: 680, y: 1020, s: 240, mood: 'heart', look: [-1, 0] })
    H.pix('bigheart', 550, 790, 8 * H.pop(lt, 0.4, 0.3, 2.4))
  },
  last: 'Ask, then wait. | They\'ll *choose you.*',
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
