// marblerace physics: a deterministic 2D "space astrology" marble run, precomputed once (identical in the browser and in
// node: only + - * / sqrt, sin/cos of exact inputs, no Math.hypot, no engine-dependent sort).
// World units are pixels of the 1080-wide vertical frame; y grows downward. simulate() → { frames, order, finishT, events, course }.
// Sections (top → bottom): start shelf · launch ramps · ASTEROID BELT (drifting rocks) · BINARY STARS (two suns in orbit)
// · ZODIAC WHEEL (12 rotating spokes) · BLACK HOLE (pulls; inside the horizon you're spat out of the WORMHOLE far below)
// · STARDUST plinko · MERCURY RETROGRADE (gravity flips on a timer) · SATURN (ringed planet) · COMET (sweeps across) · finish.
export const R = 30
export const FPS = 60
export const GATE = 2.6
export const FINISH_Y = 15350
const hyp = (a, b) => Math.sqrt(a * a + b * b)
const L = 90, RW = 990

// ── the course. Static: segments [x1,y1,x2,y2,th], pegs [x,y,r]. Moving: movers (circles with p(t)), wheels (spokes).
export const COURSE = (() => {
  const S = [], P = [], M = [], W = [], A = [], Z = [], SIGNS = []
  const seg = (x1, y1, x2, y2, th = 10) => S.push([x1, y1, x2, y2, th])
  const sign = (y, text, col) => SIGNS.push([y, text, col])
  seg(L, 300, L, FINISH_Y + 500, 14); seg(RW, 300, RW, FINISH_Y + 500, 14)
  const SHELF = [L, 640, RW, 640, 12]
  seg(L, 900, 500, 1180); seg(RW, 900, 600, 1180)
  // launch ramps
  seg(L, 1300, 860, 1450); seg(RW, 1720, 220, 1870); seg(L, 2140, 860, 2290)
  // ASTEROID BELT: rocks drifting side to side
  sign(2480, 'ASTEROID BELT', 'rock')
  for (let row = 0; row < 5; row++) for (let k = 0; k < 3; k++) {
    const y = 2620 + row * 150, x0 = 230 + k * 300 + (row % 2) * 150, amp = 70 + 20 * ((row + k) % 3), w = 0.9 + 0.25 * ((row * 3 + k) % 4), ph = row * 1.3 + k * 2.1
    M.push({ kind: 'rock', r: 26 + ((row + k) % 3) * 6, e: 1.35, p: t => [x0 + amp * Math.sin(w * t + ph), y] , v: t => [amp * w * Math.cos(w * t + ph), 0] })
  }
  // BINARY STARS: two suns orbiting a common centre, very bouncy
  sign(3500, 'BINARY STARS', 'sun')
  seg(L, 3420, 420, 3560); seg(RW, 3420, 660, 3560)
  { const cx = 540, cy = 3900, Ro = 190, w = 1.15
    for (const ph of [0, Math.PI]) M.push({ kind: 'sun', r: 74, e: 1.7, p: t => [cx + Ro * Math.cos(w * t + ph), cy + Ro * 0.55 * Math.sin(w * t + ph)], v: t => [-Ro * w * Math.sin(w * t + ph), Ro * 0.55 * w * Math.cos(w * t + ph)] }) }
  seg(L, 4250, 480, 4460); seg(RW, 4250, 600, 4460)
  // ZODIAC WHEEL: 12 spokes rotating slowly
  sign(4560, 'ZODIAC WHEEL', 'wheel')
  W.push({ cx: 540, cy: 5000, r0: 70, r1: 330, n: 12, w: 0.55, th: 12 })
  seg(L, 5420, 470, 5560); seg(RW, 5420, 610, 5560)
  // BLACK HOLE: inverse-square pull; inside the horizon → out of the wormhole far below
  sign(5760, 'BLACK HOLE', 'void')
  seg(RW, 5700, 330, 5900)                                         // the stream comes down the left side…
  A.push({ x: 640, y: 6330, k: 2.4e7, rmax: 460, horizon: 40, exit: [540, 11050] })   // …the hole waits on the right
  seg(L, 6080, 380, 6250)
  seg(L, 6450, 330, 6600); seg(RW, 6450, 750, 6600)
  seg(L, 6800, 470, 6980); seg(RW, 6800, 610, 6980)
  // STARDUST plinko
  sign(7140, 'STARDUST', 'dust')
  for (let row = 0; row < 11; row++) { const y = 7280 + row * 105, off = row % 2 ? 55 : 0; for (let x = 190 + off; x < 900; x += 110) P.push([x, y, 11]) }
  seg(L, 8520, 470, 8760); seg(RW, 8520, 610, 8760)
  // MERCURY RETROGRADE: gravity flips upward for 1.3 s out of every 3.4 s inside the zone
  sign(8900, 'MERCURY RETROGRADE', 'retro')
  Z.push({ x0: L, x1: RW, y0: 9020, y1: 9880, period: 3.4, on: 1.3, g: -1.15 })
  seg(L, 9200, 800, 9340); seg(RW, 9560, 280, 9700)
  seg(L, 9900, 470, 10060); seg(RW, 9900, 610, 10060)
  // SATURN: a ringed planet to roll around (static circle + ring rails)
  sign(10200, 'SATURN', 'saturn')
  P.push([540, 10560, 150])
  seg(310, 10545, 175, 10610, 10); seg(770, 10545, 905, 10610, 10)   // the rings, tilted out so nobody parks on them
  // WORMHOLE exit sits here (from the black hole)
  sign(10940, 'WORMHOLE EXIT', 'worm')
  seg(L, 11250, 800, 11400); seg(RW, 11650, 280, 11800)
  // COMET: a bright rock that sweeps the whole width every 4 s
  sign(12000, 'COMET', 'comet')
  { const y = 12300, per = 4.2
    M.push({ kind: 'comet', r: 44, e: 1.8, p: t => { const u = ((t % per) + per) % per / per; return [-200 + 1480 * u, y] }, v: () => [1480 / per, 0] }) }
  seg(L, 12550, 800, 12700); seg(RW, 12950, 280, 13100)
  // final plinko + funnel
  for (let row = 0; row < 7; row++) { const y = 13350 + row * 120, off = row % 2 ? 65 : 0; for (let x = 200 + off; x < 900; x += 130) P.push([x, y, 14]) }
  seg(L, 14250, 480, 14500); seg(RW, 14250, 600, 14500)
  seg(L, 14700, 800, 14860); seg(RW, 15050, 300, 15200)
  seg(L, FINISH_Y + 230, RW, FINISH_Y + 310, 14)                  // finish tray
  return { S, P, M, W, A, Z, SHELF, SIGNS }
})()


// ── COURSE 2 (Race 2): longer and wilder. Extra kinds: meteors (falling rocks), pulsar beams (fast 2-spoke wheels),
// solar-flare wind (Z with wx), twin black holes (one back to the start, one a shortcut), a supernova (X: a timed blast),
// pinball bumpers (pegs with their own bounce, P[3]), Jupiter (a pull with no horizon) with orbiting moons, two comets,
// and the event horizon (a black hole right before the finish that throws you back up to the meteor shower).
export const FINISH_Y2 = 17600
export const COURSE2 = (() => {
  const S = [], P = [], M = [], W = [], A = [], Z = [], X = [], SIGNS = []
  const seg = (x1, y1, x2, y2, th = 10) => S.push([x1, y1, x2, y2, th])
  const sign = (y, text, kind) => SIGNS.push([y, text, kind])
  seg(L, 300, L, FINISH_Y2 + 500, 14); seg(RW, 300, RW, FINISH_Y2 + 500, 14)
  const SHELF = [L, 640, RW, 640, 12]
  seg(L, 900, 500, 1180); seg(RW, 900, 600, 1180)
  // BIG BANG: three steep drops
  sign(1260, 'BIG BANG', 'bang')
  seg(L, 1350, 880, 1620); seg(RW, 1820, 200, 2090); seg(L, 2290, 880, 2560)
  // METEOR SHOWER: rocks falling down through the field, plus a few pegs
  sign(2720, 'METEOR SHOWER', 'meteor')
  for (let k = 0; k < 6; k++) { const x0 = 190 + k * 140, per = 2.2 + (k % 3) * 0.45, ph = k * 0.37, y0 = 2700, y1 = 3700
    M.push({ kind: 'meteor', r: 30, e: 1.5, p: t => { const u = (((t + ph * per) % per) + per) % per / per; return [x0, y0 + (y1 - y0) * u] }, v: () => [0, (y1 - y0) / per] }) }
  for (let row = 0; row < 4; row++) for (let x = 230 + (row % 2) * 90; x < 900; x += 180) P.push([x, 2900 + row * 220, 12])
  seg(L, 3780, 470, 3960); seg(RW, 3780, 610, 3960)
  // PULSAR: two fast spinning beams
  sign(4080, 'PULSAR', 'pulsar')
  W.push({ cx: 330, cy: 4450, r0: 30, r1: 230, n: 2, w: 1.9, th: 14, beam: true })
  W.push({ cx: 750, cy: 4700, r0: 30, r1: 230, n: 2, w: -1.6, th: 14, beam: true })
  seg(L, 5000, 470, 5160); seg(RW, 5000, 610, 5160)
  // SOLAR FLARE: wind bursts push everything right, between staggered ramps
  sign(5300, 'SOLAR FLARE', 'flare')
  Z.push({ x0: L, x1: RW, y0: 5380, y1: 6300, period: 3.0, on: 1.1, g: 1, wx: 2300 })
  seg(L, 5560, 700, 5720); seg(RW, 5900, 380, 6060); for (let x = 220; x < 900; x += 160) P.push([x, 6200, 12])
  seg(L, 6380, 480, 6520); seg(RW, 6380, 600, 6520)
  // TWIN BLACK HOLES: left → back to the start · right → a shortcut far below (into comet alley)
  sign(6640, 'TWIN BLACK HOLES', 'void')
  A.push({ x: 300, y: 7050, k: 1.5e7, rmax: 330, horizon: 40, exit: [540, 1150], name: 'start' })
  A.push({ x: 780, y: 7050, k: 1.5e7, rmax: 330, horizon: 40, exit: [735, 14700], name: 'shortcut' })
  P.push([540, 6880, 22])
  seg(L, 7450, 470, 7600); seg(RW, 7450, 610, 7600)
  // SUPERNOVA: a star in the middle that blows everything outwards for 0.35 s every 4 s
  sign(7740, 'SUPERNOVA', 'nova')
  X.push({ x: 540, y: 8250, r: 420, period: 4.0, on: 0.35, k: 5.5e6, core: 60 })
  P.push([540, 8250, 60]); for (const [a, b] of [[250, 8050], [830, 8050], [250, 8480], [830, 8480]]) P.push([a, b, 14])
  seg(L, 8700, 470, 8860); seg(RW, 8700, 610, 8860)
  // MERCURY RETROGRADE (as in Race 1)
  sign(8980, 'MERCURY RETROGRADE', 'retro')
  Z.push({ x0: L, x1: RW, y0: 9100, y1: 9960, period: 3.4, on: 1.3, g: -1.15 })
  seg(L, 9280, 800, 9420); seg(RW, 9640, 280, 9780)
  seg(L, 9980, 470, 10140); seg(RW, 9980, 610, 10140)
  // ASTEROID PINBALL: very bouncy bumpers
  sign(10260, 'ASTEROID PINBALL', 'pinball')
  for (let row = 0; row < 5; row++) { const off = row % 2 ? 110 : 0; for (let x = 200 + off; x < 900; x += 220) P.push([x, 10450 + row * 190, 26, 2.05]) }
  seg(L, 11450, 470, 11610); seg(RW, 11450, 610, 11610)
  // JUPITER: a giant that pulls (no horizon), two moons in orbit around it
  sign(11740, 'JUPITER', 'jupiter')
  P.push([540, 12250, 135]); A.push({ x: 540, y: 12250, k: 6e6, rmax: 520, horizon: 0, exit: null, name: 'jupiter' })
  { const cx = 540, cy = 12250, Ro = 260, w = 1.3
    for (const ph of [0, Math.PI]) M.push({ kind: 'moon', r: 40, e: 1.6, p: t => [cx + Ro * Math.cos(w * t + ph), cy + Ro * 0.6 * Math.sin(w * t + ph)], v: t => [-Ro * w * Math.sin(w * t + ph), Ro * 0.6 * w * Math.cos(w * t + ph)] }) }
  seg(L, 12700, 470, 12860); seg(RW, 12700, 610, 12860)
  // COMET ALLEY: two comets, opposite ways
  sign(13000, 'COMET ALLEY', 'comet')
  { const per = 3.4; M.push({ kind: 'comet', r: 44, e: 1.8, p: t => { const u = ((t % per) + per) % per / per; return [-200 + 1480 * u, 13300] }, v: () => [1480 / per, 0] }) }
  { const per = 2.9; M.push({ kind: 'comet', r: 44, e: 1.8, p: t => { const u = ((t % per) + per) % per / per; return [1280 - 1480 * u, 13750] }, v: () => [-1480 / per, 0] }) }
  seg(L, 13500, 800, 13620); seg(RW, 13960, 280, 14080)
  seg(L, 14300, 470, 14440); seg(RW, 14300, 610, 14440)
  sign(14560, 'SHORTCUT EXIT', 'worm')
  // EVENT HORIZON: the last black hole, just off the racing line, throws you back to the meteor shower
  sign(15000, 'EVENT HORIZON', 'void')
  seg(L, 14900, 650, 15080)
  A.push({ x: 790, y: 15330, k: 1.7e7, rmax: 320, horizon: 40, exit: [540, 2650], name: 'horizon' })
  seg(L, 15700, 470, 15860); seg(RW, 15700, 610, 15860)
  // final plinko + funnel
  for (let row = 0; row < 6; row++) { const y = 16050 + row * 120, off = row % 2 ? 65 : 0; for (let x = 200 + off; x < 900; x += 130) P.push([x, y, 14]) }
  seg(L, 16850, 480, 17080); seg(RW, 16850, 600, 17080)
  seg(L, 17200, 800, 17330); seg(RW, 17420, 300, 17520)
  seg(L, FINISH_Y2 + 230, RW, FINISH_Y2 + 310, 14)
  return { S, P, M, W, A, Z, X, SHELF, SIGNS, FINISH: FINISH_Y2 }
})()


// ── COURSE 3 (Race 2, final): a narrow, fast, built course (walls at 190 / 890, filmed close). Segment options (S[5]):
// { boost } speed pad (px/s² along the rail) · { bounce } trampoline restitution · { gate: {period, on} } a door that is
// OPEN (no collision) during its 'on' window. SECTIONS carries each section's span and colour for the film.
export const FINISH_Y3 = 16480
export const COURSE3 = (() => {
  const S = [], P = [], M = [], W = [], A = [], Z = [], X = [], SIGNS = [], SECTIONS = []
  const Lw = 190, Rw = 890, CX = 540
  const seg = (x1, y1, x2, y2, th = 12, o) => S.push(o ? [x1, y1, x2, y2, th, o] : [x1, y1, x2, y2, th])
  const sec = (y0, y1, name, col) => { SECTIONS.push({ y0, y1, name, col }); SIGNS.push([y0 + 60, name, col]) }
  seg(Lw, 300, Lw, FINISH_Y3 + 500, 16); seg(Rw, 300, Rw, FINISH_Y3 + 500, 16)
  const SHELF = [Lw, 640, Rw, 640, 12]
  seg(Lw, 820, 480, 1000); seg(Rw, 820, 600, 1000)
  // 1 HYPERSPACE LAUNCH: three long boost ramps
  sec(1040, 2560, 'HYPERSPACE', '#8fe3ff')
  seg(Lw, 1160, 760, 1420, 14, { boost: 1500 }); seg(Rw, 1600, 320, 1860, 14, { boost: 1500 }); seg(Lw, 2040, 760, 2300, 14, { boost: 1500 })
  // 2 AIRLOCK: a door across the shaft opens for 1.1 s every 3.6 s → the pack piles up, then pours through
  sec(2560, 3000, 'AIRLOCK', '#ff5a6e')
  seg(Lw, 2620, 470, 2760); seg(Rw, 2620, 610, 2760)
  seg(450, 2800, 630, 2800, 14, { gate: { period: 3.6, on: 1.1 } })
  // 3 BOUNCE NEBULA: trampolines that fling you across the shaft
  sec(3000, 4200, 'BOUNCE NEBULA', '#ff8fb1')
  seg(Lw, 3150, 420, 3250, 12, { bounce: 1.05 }); seg(Rw, 3420, 660, 3520, 12, { bounce: 1.05 }); seg(Lw, 3690, 420, 3790, 12, { bounce: 1.05 })
  seg(Rw, 3960, 660, 4060, 12, { bounce: 1.05 }); for (const [a, b] of [[640, 3200], [440, 3470], [640, 3740], [440, 4010]]) P.push([a, b, 20, 1.9])
  seg(Lw, 4130, 470, 4260); seg(Rw, 4130, 610, 4260)
  // 4 GALAXY WHEEL: six long arms turning through the whole shaft
  sec(4300, 5300, 'GALAXY WHEEL', '#c9a6ff')
  W.push({ cx: CX, cy: 4780, r0: 50, r1: 300, n: 6, w: 0.85, th: 14 })
  seg(Lw, 5180, 470, 5320); seg(Rw, 5180, 610, 5320)
  // 5 TRAPDOORS: five floors that drop open on their own timers (OPEN = fall straight through, closed = roll the long way)
  sec(5360, 7100, 'TRAPDOORS', '#7dffb0')
  for (let k = 0; k < 5; k++) { const y = 5480 + k * 300, l = k % 2 === 0; seg(l ? Lw : Rw, y, l ? Rw - 130 : Lw + 130, y + 110, 14, { gate: { period: 2.4 + k * 0.35, on: 0.6 } }) }
  seg(Lw, 7020, 470, 7160); seg(Rw, 7020, 610, 7160)
  // 6 BLACK HOLE: off to one side; inside the horizon → back up to the airlock
  sec(7200, 8000, 'BLACK HOLE', '#ff9a3c')
  seg(Lw, 7300, 620, 7470)
  A.push({ x: 760, y: 7700, k: 1.0e7, rmax: 260, horizon: 38, exit: [CX, 2450], name: 'airlock' })
  seg(Lw, 7900, 470, 8030); seg(Rw, 7900, 610, 8030)
  // 7 SATURN'S RINGS: a long spiral of shallow boost rails — the overtaking zone
  sec(8060, 10400, "SATURN'S RINGS", '#f2c75c')
  for (let k = 0; k < 8; k++) { const y = 8160 + k * 270, l = k % 2 === 0; seg(l ? Lw : Rw, y, l ? Rw - 130 : Lw + 130, y + 120, 14, k % 3 === 1 ? { boost: 1300 } : undefined) }
  seg(Lw, 10330, 470, 10460); seg(Rw, 10330, 610, 10460)
  // 8 SUPERNOVA: a star that blows everything outwards for 0.35 s every 4 s
  sec(10480, 11300, 'SUPERNOVA', '#ffd36b')
  X.push({ x: CX, y: 10880, r: 360, period: 4.0, on: 0.35, k: 4.5e6, core: 56 }); P.push([CX, 10880, 56])
  for (const [a, b] of [[300, 10700], [780, 10700], [300, 11060], [780, 11060]]) P.push([a, b, 14])
  seg(Lw, 11220, 470, 11350); seg(Rw, 11220, 610, 11350)
  // 9 MERCURY RETROGRADE
  sec(11380, 12320, 'MERCURY RETROGRADE', '#ff8fd0')
  Z.push({ x0: Lw, x1: Rw, y0: 11480, y1: 12240, period: 3.4, on: 1.2, g: -1.15 })
  seg(Lw, 11640, 760, 11760); seg(Rw, 11960, 320, 12080)
  seg(Lw, 12230, 470, 12360); seg(Rw, 12230, 610, 12360)
  // 10 ASTEROID PINBALL
  sec(12380, 13600, 'ASTEROID PINBALL', '#ff5a7a')
  for (let row = 0; row < 5; row++) { const xs = row % 2 ? [435, 645] : [330, 540, 750]; for (const x of xs) P.push([x, 12560 + row * 190, 24, 2.0]) }
  seg(Lw, 13500, 470, 13630); seg(Rw, 13500, 610, 13630)
  // 11 FINAL SPRINT: boost rails
  sec(13640, 15900, 'FINAL SPRINT', '#7dffb0')
  seg(Lw, 13700, 760, 13960, 14, { boost: 1700 }); seg(Rw, 14200, 320, 14460, 14, { boost: 1700 }); seg(Lw, 14700, 760, 14960, 14, { boost: 1700 })
  seg(Rw, 15200, 320, 15460, 14, { boost: 1700 })
  // 12 THE LAST DOOR: a laser door right before the line holds EVERYONE (any lead is gone), then opens; just past it,
  // a small black hole beside the gap throws the unlucky back to the start of the final sprint
  sec(15900, FINISH_Y3 + 300, 'THE LAST DOOR', '#ff5a6e')
  seg(Lw, 15950, 470, 16100); seg(Rw, 15950, 610, 16100)
  seg(450, 16140, 630, 16140, 14, { gate: { period: 3.2, on: 0.9 } })
  A.push({ x: 720, y: 16330, k: 7e6, rmax: 190, horizon: 36, exit: [CX, 13650], name: 'lastdoor' })
  seg(Lw, FINISH_Y3 + 230, Rw, FINISH_Y3 + 300, 14)
  return { S, P, M, W, A, Z, X, SHELF, SIGNS, SECTIONS, FINISH: FINISH_Y3, START: { x0: 246, dx: 112 }, LW: Lw, RW: Rw }
})()

export function wheelSpokes(wh, t) {
  const out = [], a0 = wh.w * t
  for (let i = 0; i < wh.n; i++) { const a = a0 + i * 2 * Math.PI / wh.n, c = Math.cos(a), s = Math.sin(a); out.push([wh.cx + wh.r0 * c, wh.cy + wh.r0 * s, wh.cx + wh.r1 * c, wh.cy + wh.r1 * s, wh.th]) }
  return out
}
export const retroOn = (z, t) => (((t % z.period) + z.period) % z.period) < z.on
const retoOn2 = retroOn

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

// Race 2 options: links = [[idA, idB, len]] ties two marbles with a rope (max distance len; a swallowed marble takes its
// partner through the wormhole too) and starts them side by side in the given order; exit = [x, y] moves the wormhole.
// course = COURSE2 for Race 2; aim = { id: [x, y0, y1, acc] } a gentle sideways steer (a sign choosing its line).
export function simulate({ seed = 7, ids, drag = {}, kick = {}, T = 90, links = null, exit = null, course = COURSE, aim = {} } = {}) {
  const C = course, FIN_Y = C.FINISH ?? FINISH_Y, r = rng(seed), n = ids.length
  const slots = ids.map((_, i) => i)
  if (!links) for (let i = slots.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [slots[i], slots[j]] = [slots[j], slots[i]] }
  const LK = (links || []).map(([a, b, len]) => [ids.indexOf(a), ids.indexOf(b), len])
  const mate = {}; for (const [a, b] of LK) { mate[a] = b; mate[b] = a }
  const SX = C.START || { x0: 150, dx: 150 }
  const B = ids.map((id, i) => { const s = slots[i]; return { id, x: SX.x0 + (s % 6) * SX.dx + (s >= 6 ? SX.dx / 2 : 0) + r() * 10, y: 640 - R - 14 - (s >= 6 ? 2 * R + 6 : 0), vx: 0, vy: 0, fin: null } })
  const G = 1900, DT = 1 / 480, SUB = 480 / FPS
  const frames = new Float32Array(Math.ceil(T * FPS) * n * 2)
  const order = [], events = []
  let step = 0
  let curT = 0
  const hitSeg = (b, x1, y1, x2, y2, th, wx = null, o = null) => {
    if (o && o.gate && retroOn(o.gate, curT)) return                 // a gate: open (no collision) during its 'on' window
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy
    let u = ((b.x - x1) * dx + (b.y - y1) * dy) / L2; u = Math.max(0, Math.min(1, u))
    const px = x1 + u * dx, py = y1 + u * dy, ex = b.x - px, ey = b.y - py, d = hyp(ex, ey), md = R + th / 2
    if (d >= md || d === 0) return
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    let svx = 0, svy = 0
    if (wx) { svx = -wx.w * (py - wx.cy); svy = wx.w * (px - wx.cx) }      // spoke surface velocity
    const rvx = b.vx - svx, rvy = b.vy - svy, vn = rvx * nx + rvy * ny
    if (vn < 0) { const k = 1 + (o && o.bounce !== undefined ? o.bounce : 0.32); b.vx -= k * vn * nx; b.vy -= k * vn * ny }
    if (o && o.boost) { const L = Math.sqrt(L2); b.vx += o.boost * dx / L * DT; b.vy += o.boost * dy / L * DT }
    b.vx *= 0.9994; b.vy *= 0.9994
  }
  const hitCircle = (b, cx, cy, cr, e, ovx = 0, ovy = 0) => {
    const ex = b.x - cx, ey = b.y - cy, d = hyp(ex, ey), md = R + cr
    if (d >= md || d === 0) return false
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    const vn = (b.vx - ovx) * nx + (b.vy - ovy) * ny
    if (vn < 0) { b.vx -= e * vn * nx; b.vy -= e * vn * ny }
    return true
  }
  for (let f = 0; f < T * FPS; f++) {
    for (let k = 0; k < SUB; k++, step++) {
      const ts = step * DT; curT = ts
      const spokes = C.W.map(wh => [wh, wheelSpokes(wh, ts)])
      const movers = C.M.map(m => [m, m.p(ts), m.v(ts)])
      for (const b of B) {
        if (ts < GATE && kick[b.id] && ts > GATE - 0.02) b.vx += kick[b.id]
        let g = G
        for (const z of C.Z) if (b.x > z.x0 && b.x < z.x1 && b.y > z.y0 && b.y < z.y1 && retroOn(z, ts)) { g = G * z.g; if (z.wx) b.vx += z.wx * DT }
        b.vy += g * DT
        const am = aim[b.id]; if (am && b.y > am[1] && b.y < am[2]) b.vx += (am[0] > b.x ? 1 : -1) * am[3] * DT
        for (const xb of C.X || []) if (retoOn2(xb, ts)) { const ex = b.x - xb.x, ey = b.y - xb.y, d = hyp(ex, ey); if (d < xb.r && d > 0) { const acc = xb.k / (d + 80); b.vx += acc * ex / d * DT; b.vy += acc * ey / d * DT } }
        for (const a of C.A) {
          const ex = a.x - b.x, ey = a.y - b.y, d = hyp(ex, ey)
          if (a.horizon > 0 && d < a.horizon) {
            const ex0 = (C === COURSE && exit) || a.exit, bi = B.indexOf(b), group = bi in mate ? [b, B[mate[bi]]] : [b]
            group.forEach((q, gi) => { events.push({ t: ts, id: q.id, kind: 'swallow', hole: a.name || 'hole', from: [q.x, q.y] }); q.x = ex0[0] + (gi ? 70 : 0); q.y = ex0[1]; q.vx = (q.x < 540 ? -1 : 1) * 120; q.vy = 380 })
            continue
          }
          if (d < a.rmax) { const acc = a.k / (d * d + 900); b.vx += acc * ex / d * DT; b.vy += acc * ey / d * DT }
        }
        const dr = 1 - (drag[b.id] ?? 0.12) * DT; b.vx *= dr; b.vy *= dr
        const sp = hyp(b.vx, b.vy); if (sp > 1600) { b.vx *= 1600 / sp; b.vy *= 1600 / sp }
        b.x += b.vx * DT; b.y += b.vy * DT
        if (ts < GATE) hitSeg(b, ...C.SHELF)
        for (const s of C.S) { if (b.y < Math.min(s[1], s[3]) - 60 || b.y > Math.max(s[1], s[3]) + 60) continue; hitSeg(b, s[0], s[1], s[2], s[3], s[4], null, s[5] || null) }
        for (const [wh, sk] of spokes) { if (Math.abs(b.y - wh.cy) > wh.r1 + 60) continue; for (const s of sk) hitSeg(b, ...s, wh) }
        for (const p of C.P) { if (Math.abs(b.y - p[1]) > p[2] + 40) continue; if (hitCircle(b, p[0], p[1], p[2], p[3] ?? 1.55) && p[3]) events.push({ t: ts, id: b.id, kind: 'bumper' }) }
        for (const [m, [mx, my], [mvx, mvy]] of movers) { if (Math.abs(b.y - my) > m.r + 40) continue; if (hitCircle(b, mx, my, m.r, m.e, mvx, mvy) && m.kind !== 'rock') events.push({ t: ts, id: b.id, kind: m.kind }) }
        if (b.fin === null && b.y > FIN_Y) { b.fin = ts; order.push(b.id) }
      }
      for (const [i, j, len] of LK) {                     // ropes: pull back to len, drop the separating speed
        const a = B[i], c = B[j], ex = c.x - a.x, ey = c.y - a.y, d = hyp(ex, ey)
        if (d <= len || d === 0) continue
        const nx = ex / d, ny = ey / d, o = (d - len) / 2
        a.x += nx * o; a.y += ny * o; c.x -= nx * o; c.y -= ny * o
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
        if (rv > 0) { a.vx += rv / 2 * nx; a.vy += rv / 2 * ny; c.vx -= rv / 2 * nx; c.vy -= rv / 2 * ny }
      }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = B[i], c = B[j], ex = c.x - a.x, ey = c.y - a.y
        if (ex > 2 * R || ex < -2 * R || ey > 2 * R || ey < -2 * R) continue
        const d = hyp(ex, ey)
        if (d >= 2 * R || d === 0) continue
        const nx = ex / d, ny = ey / d, o = (2 * R - d) / 2
        a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
        if (rv < 0) { const jv = -0.75 * rv; a.vx -= jv * nx; a.vy -= jv * ny; c.vx += jv * nx; c.vy += jv * ny }
      }
    }
    B.forEach((b, i) => { frames[(f * n + i) * 2] = b.x; frames[(f * n + i) * 2 + 1] = b.y })
  }
  return { frames, n, order, finishT: Object.fromEntries(B.map(b => [b.id, b.fin])), events, course: C }
}
