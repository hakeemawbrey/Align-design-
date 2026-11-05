// kfbe19: FIRST DATE BINGO E19 (long), "Double date bingo" (vertical, star_talk post, music: funk · G).
// No end card, no card transition; hard cut on the last line. Two 3×3 cards race side by side: ♈ Aries × ♎ Libra
// (left) and ♋ Cancer × ♒ Aquarius (right). The host has never had to watch two cards at once.
//   0.0   frame 0: bowling pins mid-crash, Aries mid-celebration; the second card mid-spin as it lands; the dauber
//         mid-slam on STRIKE DANCE. Hook: "Double date. | *Two* cards. One winner."  1.0 record scratch: "it’s a
//         *double date.*"
//   ① SHOES (3)        rental shoes too big → SHOES TOO BIG (8) · Libra can’t pick a ball → CAN’T PICK A BALL (14)
//   ② FIRST FRAME (20)  Cancer tells an old school story about Aquarius → TELLS AN OLD STORY (24) · Cancer bowls
//                      granny style → BOWLS GRANNY STYLE (28) · Libra’s gutter ball → GUTTER BALL (33) · Aries strike
//   ③ SNACKS (40)       Cancer brought cookies from home → BRINGS OWN SNACKS (42) · Aries: "you two are CANQUARIUS
//                      now." → COUPLE NAME INVENTED (48) · the scoreboard
//   ④ THE TIEBREAK (60) both cards one square from BINGO · four last rolls · Aquarius slips on the approach, all four
//                      laugh at once → EVERYONE LAUGHED AT ONCE on BOTH cards (79) → DOUBLE BINGO (79.25) · Aries
//                      helps Aquarius up · 82.5 "Tie. | *Everybody* won." · hard cut.
import { makeBingo, star, label, shadow, hearts, drawBits, R, box, glow, dauber, blot, cellLines, sparkles, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 87
const C = [3.0, 20.0, 40.0, 60.0]
const T = { rec: 1.0, shoes: [5.0, 8.4], a1: 8.0, balls: [10.0, 14.0], a6: 14.0, arrive: [15.5, 17.5],
  story: [21.0, 24.4], b1: 24.0, granny: [26.0, 28.4], b6: 28.0, gutter: [30.6, 33.0], a5: 33.0, strike: [35.0, 37.0],
  cookies: [41.0, 42.4], b0: 42.0, name: [45.6, 48.4], b5: 48.0, board: 52.0, tieban: 60.5,
  rolls: [[63.0, 65.6], [66.6, 69.2], [70.0, 72.6]], slip: [74.0, 76.0], laugh: 77.0, both: 79.0, bingo: 79.25, help: 80.6, last: 82.5 }
const CH = ['SHOES', 'FIRST FRAME', 'SNACKS', 'THE TIEBREAK'].map((title, i) => ({ at: C[i], out: [(C[i + 1] || 78.5) - 0.5, (C[i + 1] || 78.5) - 0.2], n: i + 1, title, color: [GOLD, '#ff9ac4', '#9fe6b0', '#a8d8ff'][i] }))
const REC = { at: T.rec, len: 1.4, caption: 'it’s a *double date.*', sub: 'two cards. one host.', top: 860 }

// the two cards
const CARDS = [
  { x: 36, tag: '♈ × ♎', head: '#e85a5a', ink: '#e84a3a', sq: [
    { text: 'STRIKE DANCE', at: -0.04 }, { text: 'SHOES TOO BIG', at: T.a1 }, { text: 'BALL TOO HEAVY' },
    { text: 'SCORE ARGUMENT' }, { free: true }, { text: 'GUTTER BALL', at: T.a5 },
    { text: 'CAN’T PICK A BALL', at: T.a6 }, { text: 'EVERYONE LAUGHED AT ONCE', at: T.both }, { text: 'MISSED HIGH-FIVE' } ] },
  { x: 556, tag: '♋ × ♒', head: '#4a8ae8', ink: '#3a6ae8', sq: [
    { text: 'BRINGS OWN SNACKS', at: T.b0 }, { text: 'TELLS AN OLD STORY', at: T.b1 }, { text: 'MATCHING SOCKS' },
    { text: 'CHEERS FOR THE OTHER TEAM' }, { free: true }, { text: 'COUPLE NAME INVENTED', at: T.b5 },
    { text: 'BOWLS GRANNY STYLE', at: T.b6 }, { text: 'EVERYONE LAUGHED AT ONCE', at: T.both }, { text: 'ORDERS NACHOS TWICE' } ] },
]
const CW = 488, TOP = 1186, HEAD = 56, CH3 = 196, CELL = (CW - 16) / 3
const cellXY = (c, i) => ({ x: c.x + 8 + (i % 3 + 0.5) * CELL, y: TOP + HEAD + (Math.floor(i / 3) + 0.5) * CH3 })
function drawCards(x, t) {
  CARDS.forEach((c, ci) => {
    const spin = ci === 1 ? 1 - ease.outBack(prog(t, -0.5, 0.6)) : 0
    x.save(); x.translate(c.x + CW / 2, TOP + 330); x.rotate(-0.5 * spin); x.scale(1 - 0.3 * spin, 1 - 0.3 * spin); x.translate(-c.x - CW / 2, -TOP - 330)
    R(x, 'rgba(6,4,18,0.55)', c.x + 12, TOP + 16, CW, HEAD + 3 * CH3 + 12)
    box(x, c.x, TOP, CW, HEAD + 3 * CH3 + 12, '#fbf3e2', { b: 7 })
    R(x, c.head, c.x, TOP, CW, HEAD - 5); R(x, INK, c.x, TOP + HEAD - 5, CW, 5)
    x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('CARD ' + (ci ? 'B' : 'A'), c.x + 18, TOP + 27)
    x.textAlign = 'right'; x.font = `700 26px ${MONO}`; x.fillText(c.tag, c.x + CW - 18, TOP + 28)
    const won = t >= T.bingo
    c.sq.forEach((s, i) => {
      const p = cellXY(c, i), X = p.x - CELL / 2, Y = p.y - CH3 / 2
      R(x, '#e4d6bb', X + 3, Y + 3, CELL - 6, CH3 - 6); R(x, '#fbf3e2', X + 7, Y + 7, CELL - 14, CH3 - 14)
      if (won && [1, 4, 7].includes(i) && t < T.bingo + 1.4) { x.save(); x.globalAlpha *= 0.35 * (0.5 + 0.5 * Math.sin((t - T.bingo) * 18)); R(x, GOLD, X + 7, Y + 7, CELL - 14, CH3 - 14); x.restore() }
      if (s.free) blot(x, p.x, p.y, CH3 * 0.3, '#f2b8cc', 1, i + 2)
      else if (s.at != null) blot(x, p.x, p.y, CH3 * 0.34, c.ink, prog(t, s.at, s.at + 0.12), i + 2 + ci)
    })
    if (won) { const k = ease.outCubic(prog(t, T.bingo, T.bingo + 0.3)), a = cellXY(c, 1), b = cellXY(c, 7); x.save(); x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(a.x, lerp(a.y, b.y, k)); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 18; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(a.x, lerp(a.y, b.y, k)); x.stroke(); x.restore() }
    c.sq.forEach((s, i) => {
      const p = cellXY(c, i), stamped = s.free || (s.at != null && t >= s.at)
      let size = 28; x.font = `800 ${size}px ${INTER}`
      let lines = cellLines(x, s.free ? 'FREE' : s.text, CELL - 22, size)
      while ((lines.length * size * 1.08 > CH3 - 20 || lines.some(l => x.measureText(l).width > CELL - 16)) && size > 16) { size -= 2; x.font = `800 ${size}px ${INTER}`; lines = cellLines(x, s.free ? 'FREE' : s.text, CELL - 22, size) }
      x.textAlign = 'center'; x.textBaseline = 'middle'
      const lh = size * 1.08, y0 = p.y - (lines.length - 1) * lh / 2 + 2
      lines.forEach((l, j) => { if (stamped) { x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineJoin = 'round'; x.strokeText(l, p.x, y0 + j * lh) } x.fillStyle = INK; x.fillText(l, p.x, y0 + j * lh) })
    })
    x.restore()
  })
  // one square from bingo, both cards
  const k = win01(t, T.tieban, T.both, 0.25)
  if (k > 0.01) for (const c of CARDS) { const p = cellXY(c, 7); x.save(); x.globalAlpha = k; x.strokeStyle = '#ff3b55'; x.lineWidth = 7; x.setLineDash([14, 10]); x.lineDashOffset = -t * 40; x.strokeRect(p.x - CELL / 2 + 6, p.y - CH3 / 2 + 6, CELL - 12, CH3 - 12); x.restore() }
  if (k > 0.01) label(x, 'BOTH CARDS: ONE SQUARE FROM BINGO', 540, 1160, { size: 28, col: '#ff6177', alpha: k, font: INTER, weight: 900 })
}
function topLayer(x, t) {
  for (const c of CARDS) for (let i = 0; i < 9; i++) { const s = c.sq[i]; if (s.at == null) continue; const p = cellXY(c, i); dauber(x, t, p.x, p.y, s.at, c.ink); sparkles(x, t, p.x, p.y, s.at + 0.02, 8, 80, i, [c.ink, BONE, GOLD]) }
}

// the lane
function lane(x, t) {
  R(x, '#1e1838', 430, 0, 0, 0)
  R(x, '#221a3e', 0, 430, 1080, 720)
  for (let i = 0; i < 5; i++) glow(x, 100 + i * 220, 470, 160, 0.1)
  // perspective lane
  x.fillStyle = INK; x.beginPath(); x.moveTo(250, 1150); x.lineTo(830, 1150); x.lineTo(640, 600); x.lineTo(440, 600); x.closePath(); x.fill()
  x.fillStyle = '#d8a060'; x.beginPath(); x.moveTo(280, 1150); x.lineTo(800, 1150); x.lineTo(628, 606); x.lineTo(452, 606); x.closePath(); x.fill()
  for (let i = 1; i < 8; i++) { const fx = i / 8; x.strokeStyle = 'rgba(138,90,60,0.35)'; x.lineWidth = 3; x.beginPath(); x.moveTo(lerp(280, 800, fx), 1150); x.lineTo(lerp(452, 628, fx), 606); x.stroke() }
  for (let i = 0; i < 5; i++) { const fx = 0.3 + i * 0.1; drawBits(x, ['.A.', 'AAA'], { A: '#8a5a3c' }, lerp(280, 800, fx), 1000, 6, { outline: null }) }
  // the scoreboard screen
  box(x, 60, 460, 330, 120, '#141033', { b: 7 })
}
function pins(x, t, crash = null) {
  const P = [[540, 590], [522, 580], [558, 580], [504, 570], [540, 570], [576, 570], [486, 560], [522, 560], [558, 560], [594, 560]]
  P.forEach(([px, py], i) => {
    let dx = 0, dy = 0, rot = 0
    if (crash != null && t > crash) { const p = Math.min(1.2, t - crash); const a = -Math.PI / 2 + (i - 4.5) * 0.35; dx = Math.cos(a) * 260 * p; dy = Math.sin(a) * 200 * p + 260 * p * p; rot = p * (6 + i) }
    if (crash != null && t > crash + 1.2) return
    x.save(); x.translate(px + dx, py + dy); x.rotate(rot); R(x, INK, -8, -26, 16, 34); R(x, '#ffffff', -5, -23, 10, 28); R(x, RED, -5, -14, 10, 4); x.restore()
  })
}
function bball(x, t, t0, t1, col) { const p = prog(t, t0, t1); if (p <= 0 || p >= 1) return; const s = lerp(1, 0.4, p); const by = lerp(1100, 610, ease.inQuad(p)); x.fillStyle = INK; x.beginPath(); x.arc(540 + 30 * Math.sin(p * 4), by, 30 * s + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(540 + 30 * Math.sin(p * 4), by, 30 * s, 0, Math.PI * 2); x.fill() }

const EP = makeBingo({
  id: 'kfbe19', D, n: 3, cardAlpha: () => 0,
  squares: Array.from({ length: 9 }, () => ({ text: '' })),
  win: [], bingoAt: T.bingo, bingoStyle: { text: 'BINGO ×2!', col: GOLD, top: 600 },
  hostTears: t => t > T.bingo ? 3 : t > C[2] ? 2 : 1,
  host: { x: 950, y: 505, s: 130 },
  hook: { text: 'Double date. | *Two* cards. One winner.', out: [2.6, 2.85], accentColor: '#ffb84a', size: 90 },
  rec: REC,
  heads: [{ text: 'Tie. | *Everybody* won.', at: T.last, accent: '#ffb84a', late: 1, lateAt: T.last + 0.4, wobble: true }],
  effects: [...CH.map(c => [HK.chapter, HK.chapterCues, c]), [HK.screenShake, HK.shakeCues, { at: T.strike[0] + 0.9, len: 0.4, amp: 14 }], [HK.screenShake, HK.shakeCues, { at: T.slip[1] - 0.3, len: 0.4, amp: 18 }]],
  scene(x, t) {
    lane(x, t)
    // the scoreboard text
    const sc = t < T.board ? 'A 0 · B 0' : t < T.tieban ? 'A 98 · B 98' : t < T.bingo ? 'A 104 · B 104' : 'A 112 · B 112'
    x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7dffb0'; x.fillText(t < C[1] ? 'LANE 4' : sc, 225, 520)
    // the pins: crash on frame 0, the strike, the last rolls
    let crash = null
    if (t < 2.0) crash = -0.25; else if (t > T.strike[0] + 0.9 && t < T.strike[0] + 3) crash = T.strike[0] + 0.9; else if (t > T.rolls[0][0] + 1.3 && t < T.rolls[0][1] + 1) crash = T.rolls[0][0] + 1.3
    pins(x, t, crash)
    bball(x, t, T.strike[0], T.strike[0] + 0.9, '#e84a3a'); bball(x, t, T.gutter[0], T.gutter[1] - 0.6, '#c8a0ff'); bball(x, t, T.granny[0] + 0.6, T.granny[1], '#4a8ae8')
    T.rolls.forEach(([a], i) => bball(x, t, a, a + 1.3, ['#e84a3a', '#c8a0ff', '#4a8ae8'][i]))
    if (t > T.gutter[0] + 0.6 && t < T.gutter[1] + 0.6) label(x, 'GUTTER', 400, 760, { size: 40, col: '#ff6177', font: INTER, weight: 900, rot: -0.3 })
    // the four: A pair left, B pair right (on the approach)
    const arriveB = inK(t, T.arrive[0], 1.0)
    const P = { aries: [150, 960], libra: [330, 990], cancer: [760, 990], aquarius: [930, 960] }
    if (t < T.arrive[0]) { P.cancer[0] = lerp(1250, 760, arriveB); P.aquarius[0] = lerp(1350, 930, arriveB) } else { P.cancer[0] = lerp(1250, 760, arriveB); P.aquarius[0] = lerp(1350, 930, arriveB) }
    const roller = t > T.strike[0] - 0.8 && t < T.strike[0] + 0.4 ? 'aries' : t > T.gutter[0] - 0.8 && t < T.gutter[0] + 0.4 ? 'libra' : t > T.granny[0] - 0.6 && t < T.granny[0] + 0.8 ? 'cancer' : null
    if (roller) P[roller] = [540, 1050]
    if (t > T.slip[0] && t < T.help + 1.0) P.aquarius = [lerp(930, 600, prog(t, T.slip[0], T.slip[1] - 0.4)), lerp(960, 1060, prog(t, T.slip[1] - 0.5, T.slip[1] - 0.3))]
    const laugh = t > T.laugh && t < T.both + 1.5
    const mood = (who) => {
      if (laugh) return 'happy'
      if (t > T.bingo + 0.5) return 'heart'
      if (who === 'aries') return t < 1.6 || (t > T.strike[0] + 0.9 && t < T.strike[1] + 1) ? 'sparkle' : t > T.shoes[0] && t < T.shoes[1] ? 'wide' : 'happy'
      if (who === 'libra') return t > T.balls[0] && t < T.balls[1] ? 'squint' : t > T.gutter[0] + 0.6 && t < T.gutter[1] + 0.5 ? 'wide' : 'happy'
      if (who === 'cancer') return t > T.story[0] && t < T.story[1] ? 'sparkle' : 'happy'
      return t > T.story[0] && t < T.story[1] ? 'squint' : t > T.slip[0] && t < T.laugh ? 'wide' : 'happy'
    }
    const hopsOf = { aries: [-0.3, 0.1, 0.4, T.shoes[0] + 0.4, T.shoes[0] + 0.9, T.shoes[0] + 1.4, T.strike[1], T.strike[1] + 0.3, T.name[0], T.help, T.bingo], libra: [T.balls[0] + 1, T.balls[0] + 2.5, T.a6, T.gutter[1], T.bingo + 0.1], cancer: [T.arrive[1], T.story[0], T.story[0] + 0.8, T.b6, T.cookies[0], T.bingo + 0.2], aquarius: [T.arrive[1] + 0.2, T.b1 + 0.3, T.name[1], T.help + 0.4, T.bingo + 0.3] }
    for (const who of ['aries', 'libra', 'cancer', 'aquarius']) {
      const [px, py] = P[who]
      shadow(x, px, 1150, 160)
      const sq = laugh ? 0.06 * Math.sin(t * 28 + px) : who === 'aries' && t < 1.6 ? -0.1 : who === 'aquarius' && t > T.slip[1] - 0.4 && t < T.help ? 0.25 : 0
      star(x, t, who, { x: px, y: py - (who === 'aries' && t < 1.2 ? 60 * Math.sin(Math.PI * prog(t, -0.6, 1.2)) : 0), s: 180, mood: mood(who), tears: laugh ? 1 : 0, squash: sq, hops: hopsOf[who], seed: { aries: 3, libra: 8, cancer: 2, aquarius: 12 }[who] })
    }
    // big shoes on Aries
    if (t > T.shoes[0] && t < C[1]) for (const d of [-1, 1]) box(x, P.aries[0] + d * 50 - 45, 1110, 90, 34, '#c84a3a', { b: 5, hi: '#e86a5a' })
    // the ball rack (Libra picking)
    if (t > T.balls[0] - 0.4 && t < T.balls[1] + 0.5) { const k = win01(t, T.balls[0] - 0.4, T.balls[1] + 0.5); x.save(); x.globalAlpha = k; box(x, 420, 820, 260, 70, '#3a3060', { b: 6 }); ['#e84a3a', '#4a8ae8', '#9fe6b0', GOLD, '#c8a0ff'].forEach((col, i) => { x.fillStyle = INK; x.beginPath(); x.arc(450 + i * 50, 815, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(450 + i * 50, 815, 19, 0, Math.PI * 2); x.fill() }); const hv = Math.floor((t - T.balls[0]) * 2.5) % 5; R(x, '#fff', 444 + hv * 50, 760, 12, 20); x.restore() }
    // the cookies
    if (t > T.cookies[0] && t < T.name[1]) { const k = pop01(t, T.cookies[0], 0.3, 2.2); x.save(); x.translate(760, 860); x.scale(k, k); box(x, -60, -40, 120, 80, '#c8a070', { b: 6 }); for (let i = 0; i < 3; i++) drawBits(x, ['.CC.', 'CDCC', 'CCDC', '.CC.'], { C: '#e0a050', D: '#5a3a28' }, -36 + i * 36, -56, 7); x.restore() }
    if (t > T.bingo + 0.4) hearts(x, t, T.bingo + 0.4, 540, 800, { n: 8 })
  },
  over(x, t) { drawCards(x, t) },
  top(x, t) { topLayer(x, t) },
  bubbles: [
    { t0: -1.2, t1: 2.6, x: 260, y: 780, text: 'STRIKE!! (dance)', size: 40, tail: -0.2 },
    { t0: T.shoes[0] + 0.3, t1: T.balls[0] - 0.2, x: 250, y: 800, text: 'these are size HUGE', size: 34, tail: -0.2 },
    { t0: T.balls[0] + 0.3, t1: T.balls[1], x: 380, y: 720, text: 'pink? or… blue? or…', size: 34, tail: -0.1 },
    { t0: T.arrive[1], t1: C[1] - 0.3, x: 800, y: 800, text: 'we brought cookies!', size: 32, tail: 0.1 },
    { t0: T.story[0], t1: T.story[1], x: 760, y: 800, text: 'this one time in school, they—', size: 28, tail: 0 },
    { t0: T.story[0] + 1.6, t1: T.story[1] + 0.4, x: 900, y: 700, text: 'NOT this story', size: 30, tail: 0.3 },
    { t0: T.granny[0], t1: T.granny[1] + 0.6, x: 560, y: 920, text: 'it’s a TECHNIQUE', size: 34, tail: 0 },
    { t0: T.gutter[1] - 0.3, t1: T.strike[0] - 0.6, x: 360, y: 800, text: 'that was on purpose.', size: 32, tail: -0.1 },
    { t0: T.name[0], t1: T.name[1] + 0.8, x: 220, y: 780, text: 'you two are CANQUARIUS now.', size: 28, tail: -0.1 },
    { t0: T.name[0] + 1.4, t1: T.board, x: 860, y: 800, text: 'we love it.', size: 36, tail: 0.2 },
    { t0: T.rolls[0][0] + 1.5, t1: T.rolls[1][0], x: 540, y: 920, text: 'STRIKE! card A leads!', size: 34, tail: 0 },
    { t0: T.rolls[2][0] + 1.4, t1: T.slip[0], x: 760, y: 800, text: 'spare! tied again!', size: 34, tail: 0 },
    { t0: T.slip[0] + 0.2, t1: T.laugh, x: 700, y: 800, text: 'ok ok ok WHOA—', size: 34, tail: 0 },
    { t0: T.laugh, t1: T.both, x: 540, y: 760, text: 'HAHAHAHAHA', size: 56, tail: 0 },
    { t0: T.help, t1: T.last, x: 420, y: 820, text: 'up you get. you ok?', size: 34, tail: 0 },
    { t0: T.b5 + 0.4, t1: T.b5 + 2.6, x: 790, y: 440, text: 'CANQUARIUS!!', size: 32, tail: 0.5, col: '#cfe8ff' },
    { t0: T.bingo + 0.4, t1: T.bingo + 2.6, x: 760, y: 440, text: 'TWO BINGOS!!', size: 32, tail: 0.5, col: '#cfe8ff' },
    { t0: T.bingo + 2.6, t1: D + 1, x: 760, y: 440, text: 'I’M CRYING TWICE', size: 32, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['whoosh', 0, 0.3, 0.04], ['tom', 0, 90, { gain: 0.3, decay: 0.3 }], ...[0, 1, 2].map(i => ['tom', r3(T.shoes[0] + 0.4 + i * 0.5), 70, { gain: 0.2, decay: 0.15 }]),
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.balls[0] + i * 0.4), 0.035]), ['pop', T.arrive[1], 1174.66, 0.035, 0.4],
    ['riser', T.granny[0], T.granny[1], 0.015], ['tom', T.granny[1], 100, { gain: 0.2, decay: 0.2 }], ['pluck', T.gutter[1] - 0.6, 293.66, 0.04, 0.6, -0.3], ['tom', r3(T.strike[0] + 0.9), 80, { gain: 0.3, decay: 0.3 }], ['bell', r3(T.strike[0] + 1.0), 1760, 0.03, 0.8, 0],
    ['pop', T.cookies[0], 1318.51, 0.035, 0.3], ['pluck', T.name[0], 1174.66, 0.035, 0.5, -0.3], ['bell', T.board, 1760, 0.025, 0.8, 0], ['riser', T.tieban, T.rolls[0][0], 0.02],
    ...T.rolls.flatMap(([a]) => [['whoosh', a, 0.4, 0.03], ['tom', r3(a + 1.3), 85, { gain: 0.25, decay: 0.25 }]]), ['whoosh', T.slip[0], 0.6, 0.03], ['tom', r3(T.slip[1] - 0.3), 70, { gain: 0.3, decay: 0.3 }],
    ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T.laugh + i * 0.18), [1318.51, 1567.98, 1760][i % 3], 0.025, 0]),
    ...CARDS.flatMap((c, ci) => c.sq.filter(s => s.at != null && s.at >= 0).flatMap(s => [['tom', r3(s.at), 110 + 10 * ci, { gain: 0.24, decay: 0.18 }], ['tick', r3(s.at), 0.06], ['pop', r3(s.at + 0.02), ci ? 987.77 : 880, 0.04, ci ? 0.3 : -0.3]])),
    ['pluck', T.help, 1318.51, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
