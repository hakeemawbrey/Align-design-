// kgse24: GUESS THE SIGN, "Guess the Sign: the first date round" (60 s vertical, star_advice trial, pop · A, loop).
//   One first date, six silhouettes (the date across the table is a warm gold star, the same in every round).
//   Pisces buzzes "PISCES?" every round and is wrong six times, sobbing harder each time (happy at the end).
//   0.00  frame 0: round 1's silhouette mid-trip through the restaurant door, a tray flying, ROUND 1 sticker, hook + promise.
//         Hook: "One first date. Six silhouettes. *Guess.*"   Promise: "wait for round 6"
//   R1 ARRIVAL     20 minutes early, practising the wave → ARIES
//   R2 SMALL TALK  five questions about the date's family → CANCER
//   R3 THE MENU    can't choose: "whatever you're having" → LIBRA
//   R4 THE TABLE   straightens the cutlery. twice. → VIRGO
//   R5 DESSERT     plans date two during date one → SAGITTARIUS
//   R6 THE BILL    offers to split it neatly, then says "I had a really good time" first → CAPRICORN
//   57–60 final card · last line "Saying it first is the brave part." · loop back to frame 0
import { makeGuessLong, box, R, phone, bubble, shadow, chat, label, hearts, drawStage, drawBits, pop01, outK, prog, ease, lerp, clamp, drawStarChar, STAR, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const prop = (k, fn) => { if (k > 0.01) fn(k) }
function restaurant(x, S) {
  drawStage(x, S.u, { spot: 1 })
  // string lights
  for (let i = 0; i < 14; i++) { const X = 40 + i * 78, Y = 330 + 26 * Math.sin(i * 0.9); R(x, INK, X - 8, Y - 8, 16, 16); R(x, (i + Math.floor(S.u * 3)) % 2 ? '#ffe39a' : '#ffb86a', X - 5, Y - 5, 10, 10) }
}
function table(x, u) {
  box(x, 520, 1110, 460, 28, '#efe6d6', { b: 6 }); R(x, '#c94a5a', 520, 1138, 460, 30); R(x, INK, 600, 1168, 14, 80); R(x, INK, 886, 1168, 14, 80)
  box(x, 740, 1040, 20, 66, BONE, { b: 4 }); x.fillStyle = '#ffcf6a'; x.beginPath(); x.ellipse(750, 1026 + Math.sin(u * 9) * 2, 9, 16, 0, 0, Math.PI * 2); x.fill()
}
function theDate(x, t, u, mood = 'happy', hops = []) { drawStarChar(x, 880, 980, 210, u, { color: STAR.sky, mood, look: [-1, 0], seed: 21, hops }) }

const ROUNDS = [
  { sign: 'aries', chapter: 'ARRIVAL', cap: 'Twenty minutes early. | *Practised the wave.*', clues: ['a racing helmet', 'a red alarm clock'], last: 'Early is sweet. | *Breathe while you wait.*', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u)
      // the door
      box(x, 40, 640, 220, 610, '#7a4a2a', { b: 7, hi: '#9a6a3a' }); R(x, '#ffe39a', 70, 680, 160, 140); R(x, GOLD, 220, 960, 20, 20)
      const trip = clamp(u / 0.9)
      // a tray flying at frame 0
      if (u < 1.1) { x.save(); x.translate(lerp(420, 760, trip), lerp(620, 540, trip) - 120 * Math.sin(Math.PI * trip)); x.rotate(-0.6 + 4 * trip); box(x, -80, -10, 160, 20, '#c9c4d8', { b: 5 }); R(x, PINK, -50, -34, 30, 24); R(x, GOLD, 10, -30, 24, 20); x.restore() }
      // later: alone at the table, practising a wave, a clock spinning
      const wave = u > 1.4 && rv < 0.5 ? 0.25 * Math.sin(u * 10) : 0
      const o = { x: lerp(300, 420, ease.outCubic(trip)), y: lerp(930, 1000, ease.outCubic(trip)), s: 320, mood: rv > 0.5 ? 'happy' : u < 1 ? 'wide' : 'happy', look: [1, 0], hops: [0.9, 1.6, 2.4, 3.2].filter(h => h < 6.3), rot: u < 0.9 ? 0.5 * (1 - trip) : wave, squash: u < 0.9 ? -0.1 : 0 }
      S.sil(o)
      if (u > 1.4 && rv < 0.5) label(x, `${Math.max(1, 20 - Math.floor((u - 1.4) * 3))} min early`, 760, 860, { size: 34, col: GOLD, font: INTER, weight: 900 })
      if (u > 5.4 || rv > 0.5) theDate(x, t, u, 'wide', [5.5])
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(180, 1180); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 56, Math.PI, 0); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 48, Math.PI, 0); x.fill(); R(x, '#bfe8ff', -10, -36, 50, 20); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(640, 880); x.rotate(0.15 * Math.sin(u * 20)); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 42, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill(); R(x, INK, -2, -26, 4, 26); x.restore() })
      if (rv > 0.5) bubble(x, t, 420, 740, S.rd.R + 0.3, S.rd.t1, 'hi! (perfect wave)', { size: 30 })
    }, cues: [['whoosh', 0.0, 0.5, 0.05], ['boom', 0.85, 0.12], ['tick', 0.9, 0.08], ['pop', 5.5, 880, 0.04, 0.3]] },
  { sign: 'cancer', chapter: 'SMALL TALK', cap: 'Asked five questions | *about their family.*', clues: ['a homemade jam jar', 'a seashell'], last: 'Caring questions | *are a love language.*', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u); theDate(x, t, u, u > 2 ? 'happy' : 'neutral', [1.0, 2.0, 3.0, 4.0])
      const Q = ['siblings?', 'how’s your mom?', 'grandma’s recipe?', 'family pets??', 'holidays together?']
      Q.forEach((q, i) => bubble(x, t, [330, 380, 300, 360, 320][i], [640, 560, 640, 560, 640][i], S.rd.t0 + 0.4 + i * 1.0, S.rd.t0 + 1.35 + i * 1.0, q, { size: 30, tail: 0.2 }))
      const o = { x: 400, y: 1000, s: 320, mood: rv > 0.5 ? 'sparkle' : 'happy', look: [1, -0.1], hops: [0.4, 1.4, 2.4, 3.4, 4.4].filter(h => h < 6.3), rot: 0.1 * Math.sin(u * 3), squash: 0 }
      S.sil(o)
      label(x, `Q ${Math.min(5, Math.floor(u) + 1)}/5`, 400, 780, { size: 30, col: CYAN, font: MONO, alpha: rv > 0.5 ? 0 : 1 })
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(170, 1150); x.scale(k, k); box(x, -40, -50, 80, 100, '#e23d66', { b: 5 }); box(x, -46, -66, 92, 22, '#f2d36a', { b: 4 }); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(560, 1080); x.scale(k * 0.8, k * 0.8); x.fillStyle = INK; x.beginPath(); x.moveTo(-54, 24); x.quadraticCurveTo(0, -76, 54, 24); x.closePath(); x.fill(); x.fillStyle = '#ffc9b0'; x.beginPath(); x.moveTo(-46, 18); x.quadraticCurveTo(0, -62, 46, 18); x.closePath(); x.fill(); x.restore() })
      if (rv > 0.5) bubble(x, t, 880, 760, S.rd.R + 0.3, S.rd.t1, 'nobody ever asks. thank you.', { size: 28, col: '#c8f5d4' })
    }, cues: Array.from({ length: 5 }, (_, i) => ['pop', 0.4 + i, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.04, -0.3]) },
  { sign: 'libra', chapter: 'THE MENU', cap: 'Couldn’t choose. | *‘Whatever you’re having.’*', clues: ['a balance-scale pin', 'a rose'], last: 'Pick the one | *you* love.', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u); theDate(x, t, u, 'happy', [5.0])
      // the menu, options highlighted one after another
      x.save(); x.translate(420, 760); x.rotate(-0.05)
      box(x, -170, -150, 340, 300, BONE, { b: 6 }); x.font = `900 28px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('MENU', 0, -118)
      const items = ['soup', 'pasta', 'salad', 'tacos', 'risotto'], hi = Math.floor(u * 2.2) % 5
      items.forEach((it, i) => { if (i === hi && rv < 0.5) R(x, 'rgba(225,99,214,0.35)', -150, -92 + i * 50, 300, 40); x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.fillText(it, 0, -64 + i * 50) })
      x.restore()
      const o = { x: 400, y: 1080, s: 280, mood: rv > 0.5 ? 'happy' : 'wide', look: [Math.sin(u * 4.4), -1], hops: [0.5, 1.4, 2.3, 3.2].filter(h => h < 6.3), rot: 0.12 * Math.sin(u * 4.4), squash: 0 }
      S.sil(o)
      if (u > 4.6 && rv < 0.5) bubble(x, t, 380, 560, S.rd.t0 + 4.6, S.rd.R, '…whatever you’re having?', { size: 30 })
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(160, 1150); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill(); R(x, INK, -20, -4, 40, 6); R(x, INK, -2, -20, 4, 30); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(660, 1060); x.scale(k, k); R(x, INK, -3, 0, 6, 60); x.fillStyle = INK; x.beginPath(); x.arc(0, -8, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e23d66'; x.beginPath(); x.arc(0, -8, 18, 0, Math.PI * 2); x.fill(); x.restore() })
      if (rv > 0.5) bubble(x, t, 400, 600, S.rd.R + 0.3, S.rd.t1, 'actually: the risotto.', { size: 30 })
    }, cues: Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.45).toFixed(2), 0.035]).concat([['pop', 4.6, 659.25, 0.04, -0.2]]) },
  { sign: 'virgo', chapter: 'THE TABLE', cap: 'Straightened the cutlery. | *Twice.*', clues: ['a lint roller', 'a tiny notebook'], last: 'Tidy hands, | *open heart.*', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u); theDate(x, t, u, u > 3 ? 'happy' : 'neutral', [3.2])
      // cutlery: crooked, then snapped straight at 1.2 and again at 2.6
      const st = u > 2.6 ? 1 : u > 1.2 ? 0.5 : 0
      const rots = [0.5, -0.4, 0.3].map(r => r * (1 - st * 2 > 0 ? 1 - st * 2 : 0) + (st === 0.5 ? 0.06 : 0))
      ;[[560, '#c9c4d8'], [620, '#c9c4d8'], [690, '#c9c4d8']].forEach(([cx, c], i) => { x.save(); x.translate(cx, 1090); x.rotate(rots[i]); R(x, INK, -6, -50, 12, 100); R(x, c, -3, -47, 6, 94); x.restore() })
      for (const a of [1.2, 2.6]) { const k = pop01(u, a, 0.2, 2.6) * outK(u, [a + 0.5, a + 0.6]); if (k > 0.01) label(x, a < 2 ? 'STRAIGHT.' : 'STRAIGHTER.', 620, 980, { size: 40 * k, col: MINT, font: INTER, weight: 900 }) }
      const o = { x: 380, y: 1000, s: 320, mood: rv > 0.5 ? 'sparkle' : 'squint', look: [1, 0.6], hops: [1.2, 2.6].filter(h => h < 6.3), rot: 0.14, squash: 0.04 }
      S.sil(o)
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(170, 1150); x.rotate(0.3); x.scale(k, k); box(x, -50, -24, 100, 48, BONE, { b: 5 }); R(x, INK, -6, 24, 12, 70); R(x, '#ef5c94', -4, 26, 8, 66); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(180, 880); x.rotate(-0.1); x.scale(k, k); box(x, -46, -60, 92, 120, '#ef5c94', { b: 5 }); for (let i = 0; i < 4; i++) R(x, BONE, -30, -40 + i * 22, 60, 6); x.restore() })
      if (rv > 0.5) bubble(x, t, 380, 740, S.rd.R + 0.3, S.rd.t1, 'sorry. nervous. hi!', { size: 30 })
    }, cues: [['tick', 1.2, 0.08], ['pop', 1.22, 1567.98, 0.04, 0], ['tick', 2.6, 0.08], ['pop', 2.62, 1760, 0.04, 0]] },
  { sign: 'sagittarius', chapter: 'DESSERT', cap: 'Planned date two | *during date one.*', clues: ['a little globe', 'a bow and arrow pin'], last: 'Excited is lovely. | *Stay in this one, too.*', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u); theDate(x, t, u, u > 4 ? 'heart' : 'happy', [4.2])
      // a slice of cake on the table
      x.fillStyle = INK; x.beginPath(); x.moveTo(620, 1100); x.lineTo(720, 1100); x.lineTo(720, 1060); x.lineTo(620, 1030); x.closePath(); x.fill(); x.fillStyle = '#f7e7c0'; x.beginPath(); x.moveTo(626, 1096); x.lineTo(714, 1096); x.lineTo(714, 1064); x.lineTo(626, 1038); x.closePath(); x.fill()
      const plans = ['the market sat?', 'then a hike', 'a road trip in spring?', 'a cabin, maybe']
      plans.forEach((p, i) => bubble(x, t, [330, 360, 320, 360][i], [640, 560, 640, 560][i], S.rd.t0 + 0.5 + i * 1.2, S.rd.t0 + 1.6 + i * 1.2, p, { size: 30, tail: 0.2 }))
      const o = { x: 380, y: 1000, s: 320, mood: rv > 0.5 ? 'happy' : 'sparkle', look: [1, -0.3], hops: [0.5, 1.7, 2.9, 4.1].filter(h => h < 6.3), rot: 0.08 * Math.sin(u * 5), squash: 0 }
      S.sil(o)
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(170, 870); x.rotate(u * 1.5); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2b5a8a'; x.beginPath(); x.arc(0, 0, 48, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fae7a'; x.beginPath(); x.ellipse(-10, -8, 22, 14, 0.4, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(18, 16, 14, 10, -0.3, 0, Math.PI * 2); x.fill(); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(o.x - 110, o.y + 70); x.rotate(-0.6); x.scale(k, k); R(x, INK, -50, -5, 100, 10); R(x, GOLD, -48, -3, 96, 6); x.fillStyle = GOLD; x.beginPath(); x.moveTo(50, -14); x.lineTo(74, 0); x.lineTo(50, 14); x.closePath(); x.fill(); x.restore() })
      if (rv > 0.5) bubble(x, t, 380, 740, S.rd.R + 0.3, S.rd.t1, 'okay. cake first. now.', { size: 30 })
    }, cues: Array.from({ length: 4 }, (_, i) => ['pop', +(0.5 + i * 1.2).toFixed(2), [987.77, 1174.66, 1318.51, 1567.98][i], 0.04, -0.3]) },
  { sign: 'capricorn', chapter: 'THE BILL · HARDEST', cap: 'Offered to split the bill… | *then said it first.*', clues: ['a tidy calculator', 'a goat keyring'], last: 'Neat bill. | *Brave heart.*', bg: restaurant,
    draw(x, S) {
      const { t, u, rv } = S
      table(x, u); theDate(x, t, u, u > 3.4 ? 'heart' : 'happy', [3.5])
      // the bill + a neat calculator
      box(x, 600, 1060, 120, 46, BONE, { b: 4 }); x.font = `700 16px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BILL', 660, 1083)
      if (u > 0.8) { x.save(); x.translate(500, 880); x.rotate(-0.08); box(x, -70, -90, 140, 180, '#2fc79a', { b: 6 }); R(x, '#14102a', -54, -74, 108, 40); x.font = `700 22px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'right'; x.fillText(u > 1.6 ? '÷ 2 = fair' : '00.00', 48, -54); for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) R(x, BONE, -50 + i * 36, -20 + j * 34, 28, 26); x.restore() }
      const o = { x: 340, y: 1010, s: 310, mood: rv > 0.5 ? 'sparkle' : u > 2.8 ? 'wide' : 'neutral', look: [1, 0], hops: [1.0, 1.6, 2.9].filter(h => h < 6.3), rot: 0.06, squash: 0 }
      S.sil(o)
      if (u > 2.8) bubble(x, t, 360, 660, S.rd.t0 + 2.8, S.rd.t1, 'I had a really good time.', { size: 32 })
      hearts(x, t, S.rd.t0 + 3.5, 880, 860, { n: 6 })
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(150, 1180); x.scale(k * 0.7, k * 0.7); box(x, -50, -60, 100, 120, '#5a8a7a', { b: 5 }); for (let i = 0; i < 4; i++) R(x, BONE, -36 + (i % 2) * 40, -20 + Math.floor(i / 2) * 36, 30, 26); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(980, 1180); x.scale(k, k); x.lineWidth = 6; x.strokeStyle = INK; x.beginPath(); x.arc(0, -40, 16, 0, Math.PI * 2); x.stroke(); box(x, -24, -20, 48, 48, '#c9c4d8', { b: 4 }); for (const d of [-1, 1]) { R(x, INK, d * 16 - 3, -30, 6, 14) } x.restore() })
      if (rv > 0.5) bubble(x, t, 880, 760, S.rd.R + 0.3, S.rd.t1, 'me too. next week?', { size: 30, col: '#c8f5d4' })
    }, cues: [['tick', 1.0, 0.05], ['tick', 1.2, 0.05], ['tick', 1.4, 0.05], ['pop', 1.6, 1174.66, 0.04, -0.2], ['pluck', 2.8, 1318.51, 0.04, -0.3, 0.5], ['glitter', 3.5, 3.9]] },
]

export const EP = makeGuessLong({
  id: 'kgse24', D: 60, ending: 'loop',
  hook: 'One first date. Six silhouettes. | *Guess.*',
  promise: '★ wait for round 6',
  rounds: ROUNDS,
  final: { title: 'Pisces guessed *‘Pisces’* | every single round.', sub: 'Zero out of six. Crying anyway (happy).', last: 'Saying it first | *is the brave part.*' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
