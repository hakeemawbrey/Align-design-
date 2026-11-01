// yrgettingover: THEN vs NOW, "Getting over someone in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §19, music: funk · A)
// Story 0–15.6, then the shared end card. The format engine is ./yrkit.js (identical in every Block D film).
//   THEN (old-phone footage, 11·02·2016, a dark bedroom, curtains shut, one sliver of light): ♋ Cancer in bed under a
//     blanket; a chunky music player: "SAD SONGS, VOL. 3", repeat ON, the play count ticking up. CANCER: "one more
//     listen. for *closure*."  3.38 a friend texts "wanna get out?" → "can't. listening."  5.04 the play count flips
//     to 99+, the sliver of light closes, and ♓ Pisces pops up from under the same blanket, sobbing along.
//   6.71 card cut → NOW: morning light over the hills. A checklist ticks: "a walk ✓" (Cancer and ♐ Sagittarius on a
//     path, trees scrolling by) · "a friend ✓" · "a new hobby ✓" (a very lumpy pot). SAG: "that pot is *terrible*. I
//     love it."  Then the fourth line: "the playlist… once ✓": the player pops up, plays one song, Cancer smiles
//     through one small tear and hits stop. Pisces walks behind them, happy-crying, holding its own lumpy pot.
//   12.27 payoff: the 2016 polaroid (blanket + player) drops in. THE STARS: "feel it. then *go outside*."
//   13.38 last line: "Heal *in daylight*."
import { makeThenNow, drawBits, bubble, label, star, pisces, sparkles, R, INK, BONE, GOLD, CREAM, INTER, MONO,
  signStar, prog, ease, lerp, clamp, r3, BEAT, pop01, outK } from './yrkit.js'

const CAN = signStar('cancer'), SAG = signStar('sagittarius')
const POT = ['..KKKKK...', '.KCCCCCK..', '..KCCCK...', '.KCCCCCCK.', 'KCCCCCCCCK', 'KCCDCCCCK.', '.KCCCCCCCK', '..KKKKKK..']
const TREE = ['...GGG...', '..GGGGG..', '.GGGGGGG.', 'GGGLGGGGG', '.GGGGGGG.', '....B....', '....B....']
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const P1 = BEAT(2), P2 = BEAT(5), P3 = BEAT(8)

/** the chunky music player (generic) */
function player(x, t, cx, cy, s, { title, plays, prog: pr, k = 1, playing = true, warm = false }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k)
  const w = 520, h = 250
  R(x, 'rgba(4,2,12,0.5)', -w / 2 + 10, -h / 2 + 12, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, warm ? '#2d2a52' : '#262040', -w / 2, -h / 2, w, h)
  // album square
  R(x, INK, -w / 2 + 20, -h / 2 + 20, 130, 130); R(x, warm ? '#ffcf7a' : '#4f6fd6', -w / 2 + 26, -h / 2 + 26, 118, 118)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: warm ? '#ff8fb1' : '#9fb8ff' }, -w / 2 + 85, -h / 2 + 85, 10)
  if (!warm) R(x, '#9fb8ff', -w / 2 + 70, -h / 2 + 110, 6, 22)   // a cracked heart
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(title, -w / 2 + 170, -h / 2 + 50)
  x.font = `700 24px ${MONO}`; x.fillStyle = warm ? '#9fe6b0' : GOLD; x.fillText(plays, -w / 2 + 170, -h / 2 + 96)
  // progress bar
  R(x, '#14102a', -w / 2 + 20, h / 2 - 72, w - 40, 12); R(x, warm ? '#ffcf7a' : '#9fb8ff', -w / 2 + 20, h / 2 - 72, (w - 40) * pr, 12)
  // controls: ◀◀ ▶/❚❚ ▶▶ + repeat
  const cyc = h / 2 - 34
  x.fillStyle = BONE
  if (playing) { R(x, BONE, -12, cyc - 14, 8, 28); R(x, BONE, 6, cyc - 14, 8, 28) } else { x.beginPath(); x.moveTo(-10, cyc - 15); x.lineTo(16, cyc); x.lineTo(-10, cyc + 15); x.fill() }
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 70, cyc); x.lineTo(d * 50, cyc - 10); x.lineTo(d * 50, cyc + 10); x.fill(); x.beginPath(); x.moveTo(d * 88, cyc); x.lineTo(d * 68, cyc - 10); x.lineTo(d * 68, cyc + 10); x.fill() }
  x.strokeStyle = warm ? 'rgba(239,230,214,0.35)' : GOLD; x.lineWidth = 5; x.beginPath(); x.arc(w / 2 - 60, cyc, 15, 0.3, Math.PI * 1.8); x.stroke()
  if (!warm) label(x, 'ON', w / 2 - 60, cyc - 30, { size: 16, col: GOLD })
  x.restore()
}

const EP = makeThenNow({
  thing: 'Getting over someone', thenYear: '2016', stamp: '11·02·2016', clock: 'PM 3:20',
  thenBack(x, t) {
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#141a33'); g.addColorStop(1, '#0b0c1c')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    // the window: curtains shut, a sliver of daylight that closes on beat three
    const gap = 26 * (1 - ease.inOutCubic(prog(t, P3, P3 + 0.4)))
    R(x, '#0a0a18', 640, 420, 360, 470)
    if (gap > 0.5) { R(x, '#ffe7b0', 820 - gap / 2, 430, gap, 450); x.fillStyle = 'rgba(255,231,176,0.08)'; x.beginPath(); x.moveTo(820 - gap / 2, 880); x.lineTo(820 + gap / 2, 880); x.lineTo(900 + gap * 3, 1240); x.lineTo(740 - gap * 3, 1240); x.closePath(); x.fill() }
    R(x, '#3a3466', 650, 420, 170 - gap / 2, 470); R(x, '#3a3466', 820 + gap / 2, 420, 170 - gap / 2, 470)
    for (let i = 0; i < 4; i++) { R(x, '#2a2550', 680 + i * 36, 420, 6, 470); R(x, '#2a2550', 850 + i * 36, 420, 6, 470) }
    R(x, '#1c1838', 630, 404, 380, 18)
    // the bed
    R(x, '#1e1a36', 0, 1180, 1080, 760); R(x, '#5a4e8a', 80, 1060, 920, 40)
  },
  then(x, t) {
    // Pisces pops up from under the blanket on beat three
    const pk = pop01(t, P3 + 0.25, 0.4, 2)
    if (pk > 0.01) pisces(x, t, 760, 1060, 200, { tears: 3, mood: 'happy', pop: pk, tissue: true })
    const mood = t > P3 + 0.3 ? 'squint' : t > P2 + 0.6 ? 'neutral' : 'sleepy'
    star(x, 400, 1050, 300, t, { color: CAN.color, glyph: CAN.glyph, mood, look: [1, -1], seed: 3, glow: 0.7, zzz: false, hops: [P2 + 0.05] }, { tears: 2 })
    // the blanket
    R(x, INK, 60, 1110, 960, 260); R(x, '#6f8fd6', 66, 1116, 948, 250); for (let i = 0; i < 8; i++) R(x, '#86a6e8', 66 + i * 120, 1116, 60, 250)
    R(x, '#f6efe2', 66, 1116, 948, 18)
    // the player
    const plays = t > P3 + 0.1 ? 'plays: 99+' : `plays: ${12 + Math.floor(Math.max(0, t - P1) * 6)}`
    player(x, t, 540, 690, 1, { title: 'SAD SONGS, VOL. 3', plays, prog: (t * 0.37) % 1, k: pop01(t, P1 - 0.1, 0.35, 2) })
    if (t > P3 + 0.1 && t < P3 + 0.5) sparkles(x, t, 400, 660, P3 + 0.1, 6, 90, 0.4, [GOLD, '#9fb8ff'])
    // the friend's text and the reply
    if (t > P2) bubble(x, 280, 920, 'friend: wanna get out?', { k: pop01(t, P2, 0.25, 2.2), size: 28, col: '#9fe6b0', tail: 0 })
    if (t > P2 + 0.7) bubble(x, 640, 990, "can't. listening.", { k: pop01(t, P2 + 0.7, 0.25, 2.2), size: 28, tail: -1 })
    // drifting sad notes
    for (let i = 0; i < 3; i++) { const ph = (t * 0.35 + i / 3) % 1; drawBits(x, NOTE, { X: '#9fb8ff' }, 200 + i * 80 + Math.sin(ph * 6) * 20, 900 - ph * 180, 6, { alpha: Math.sin(Math.PI * ph) * 0.8 }) }
  },
  snap: { at: 3.0, cx: 540, cy: 880, size: 760 },
  now(x, t, lt, P) {
    const T = EP.T
    const tick = [r3(T.cut + 0.5), r3(T.cut + 1.2), r3(T.cut + 1.9)], once = r3(T.cut + 4.0), stop = r3(T.cut + 5.0)
    // morning light over the hills
    const dk = ease.outCubic(prog(t, T.cut, T.cut + 1.2))
    const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, `rgba(110,160,220,${0.6 * dk})`); g.addColorStop(0.55, `rgba(170,190,230,${0.5 * dk})`); g.addColorStop(1, `rgba(255,196,150,${0.7 * dk})`)
    x.fillStyle = g; x.fillRect(-300, -300, 1680, 1700)
    const sun = 790 - 60 * ease.outCubic(prog(t, T.cut, T.cut + 3))
    { const sg = x.createRadialGradient(820, sun, 0, 820, sun, 260); sg.addColorStop(0, 'rgba(255,230,160,0.7)'); sg.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = sg; x.fillRect(560, sun - 260, 520, 520) }
    drawBits(x, ['..SSSS..', '.SSSSSS.', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS', '.SSSSSS.', '..SSSS..'], { S: '#ffd36a' }, 820, sun, 18)
    // hills + the path (scrolling: they're walking)
    x.fillStyle = '#3f6a5a'; x.beginPath(); x.moveTo(-300, 980); for (let i = -300; i <= 1380; i += 40) x.lineTo(i, 940 + 50 * Math.sin(i / 160 + 1)); x.lineTo(1380, 2200); x.lineTo(-300, 2200); x.fill()
    R(x, '#2f5446', -300, 1150, 1680, 1000); R(x, '#c9a87a', -300, 1190, 1680, 40); R(x, '#e0c294', -300, 1190, 1680, 8)
    const scroll = (t * 140) % 360
    for (let i = -1; i < 5; i++) drawBits(x, TREE, { G: '#5fbf6a', L: '#9fe6a0', B: '#7a4a2a' }, i * 360 - scroll + 120, 1060, 16)
    // Pisces walks behind, happy-crying, with its own lumpy pot
    pisces(x, t, 140, 1120, 140, { tears: 2, mood: 'happy', pop: pop01(t, T.cut + 0.3, 0.3, 2), hops: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(v => v + 0.1), tissue: false })
    drawBits(x, POT, { K: INK, C: '#c9744a', D: '#a8583a' }, 80, 1165, 6)
    // Cancer and Sagittarius walking; Cancer holds the lumpy pot once it's ticked
    const walk = [7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0]
    const cm = t > stop ? 'sparkle' : t > once ? 'happy' : t > tick[2] ? 'sparkle' : 'happy'
    const F = star(x, 420, 1080, 270, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, seed: 3, glow: 1, hops: walk }, { tears: t > once + 0.3 && t < stop ? 1 : 0 })
    if (t > tick[2]) drawBits(x, POT, { K: INK, C: '#c9744a', D: '#a8583a' }, 560, F.cy + 20, 10 * pop01(t, tick[2], 0.3, 2), { rot: -0.1 })
    star(x, 760, 1090, 240, t, { color: SAG.color, glyph: SAG.glyph, mood: t > 9.0 ? 'happy' : 'sparkle', look: [-1, 0], seed: 8, glow: 1, hops: walk.map(v => v + 0.2) })
    // the checklist
    const ck = pop01(t, T.cut + 0.15, 0.35, 1.8) * outK(t, [T.pay - 0.2, T.pay + 0.1])
    if (ck > 0.01) {
      const items = [['a walk', tick[0]], ['a friend', tick[1]], ['a new hobby', tick[2]], ['the playlist… once', once]]
      x.save(); x.translate(300, 560); x.rotate(-0.04); x.scale(ck, ck)
      R(x, 'rgba(4,2,12,0.5)', -224, -138, 460, 290); R(x, INK, -236, -152, 472, 296); R(x, CREAM, -230, -146, 460, 284)
      items.forEach(([s, at], i) => {
        const y = -100 + i * 66, on = t > at, last = i === 3
        if (last && t < at - 0.6) return
        R(x, INK, -206, y - 18, 36, 36); R(x, '#fff', -202, y - 14, 28, 28)
        if (on) { const p = clamp((t - at) / 0.15); x.strokeStyle = '#3a9a5a'; x.lineWidth = 7; x.beginPath(); x.moveTo(-200, y); x.lineTo(-190, y + 12 * Math.min(1, p * 2)); if (p > 0.5) x.lineTo(-190 + 26 * (p - 0.5) * 2, y - 16 * (p - 0.5) * 2); x.stroke() }
        x.font = `800 ${last ? 30 : 34}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, -150, y + 2)
      })
      x.restore()
    }
    // the playlist, once: one song, then stop
    const pk2 = pop01(t, once - 0.1, 0.35, 2) * outK(t, [stop + 0.5, stop + 0.8])
    player(x, t, 640, 800, 0.62, { title: 'SAD SONGS, VOL. 3', plays: t > stop ? 'played once ✓' : 'plays: 1', prog: clamp((t - once) / 1.0), k: pk2, playing: t < stop, warm: true })
    if (t > stop && t < stop + 0.8) sparkles(x, t, 640, 800, stop, 10, 200, 0.2, [GOLD, '#9fe6b0', BONE])
    void lt; void P; void lerp
  },
  lines: [
    { t: 2.3, speaker: `${CAN.glyph}︎ CANCER`, color: '#9fe6ff', text: 'one more listen. for *closure*.' },
    { t: 9.15, speaker: `${SAG.glyph}︎ SAGITTARIUS`, color: '#d9b0ff', text: 'that pot is *terrible*. I love it.' },
  ],
  starsLine: 'feel it. then *go outside*.',
  last: 'Heal *in daylight*.', lastAccent: '#ffd36a',
  cues: T => [
    // the player clicks on, the repeat clicks, the text, 99+, curtains
    ['tick', r3(P1 - 0.05), 0.06], ['pop', r3(P1), 659.25, 0.03, 0], ['tick', r3(P1 + 0.3), 0.03],
    ['pop', P2, 1567.98, 0.04, -0.4], ['pop', r3(P2 + 0.06), 1975.53, 0.03, -0.4], ['pop', r3(P2 + 0.7), 523.25, 0.035, 0.3],
    ['pop', r3(P3 + 0.1), 1318.51, 0.04, 0], ['whoosh', P3, 0.3, 0.025], ['pop', r3(P3 + 0.3), 987.77, 0.035, 0.4], ['pluck', r3(P3 + 0.35), 440, 0.03, 0.5, 0.4],
    // NOW: checklist ticks, the hobby, the playlist once, stop
    ...[0.5, 1.2, 1.9, 4.0].map((d, i) => ['pop', r3(T.cut + d), [987.77, 1174.66, 1318.51, 1567.98][i], 0.035, -0.2]),
    ...[0.5, 1.2, 1.9, 4.0].map(d => ['tick', r3(T.cut + d + 0.05), 0.04]),
    ['tom', r3(T.cut + 1.95), 130, { gain: 0.12, decay: 0.15 }],
    ['tick', r3(T.cut + 5.0), 0.06], ['bell', r3(T.cut + 5.05), 1760, 0.03, 1.0, 0.2], ['glitter', r3(T.cut + 5.0), r3(T.cut + 5.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
