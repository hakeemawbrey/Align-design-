// kfbe09: FIRST DATE BINGO E9, "Sagittarius wants a second location" (vertical, star_talk post, music: synthwave · Bm).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♐ Sagittarius mid-sprint for the door, backpack on, speed lines; ♑ Capricorn still holding a menu;
//         the dauber mid-slam on WANTS A SECOND LOCATION. Hook: "Sag already wants | a *second location.*"
//   0.6   shake: Capricorn "we JUST sat down." · Sag skids back to the chair
//   2.6   LATE (TOOK THE SCENIC ROUTE): a dotted map route loops everywhere · 3.4 a travel story: a mountain postcard
//         → TELLS A TRAVEL STORY (4.2) · 5.4 "wanna go somewhere else?" · 6.2 Capricorn: "I like it here."
//   6.8   Sag slips the backpack off and sits back → STAYED (7.4) → BINGO (7.65) · 8.6 the host: "THEY STAYED!!"
//   9.3   "Stay a while. | *The view is right here.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 12.2
const T = { back: [0.6, 1.5], s0: 2.6, story: [3.2, 4.9], s1: 4.2, ask: 5.4, like: 6.2, sit: 6.8, s2: 7.4, bingo: 7.65, sob: 8.6, last: 9.3 }
const SHAKE = { at: 0.6, len: 0.4, amp: 18 }

function backpack(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -44, -56, 88, 112, '#3fa060', { b: 6, hi: '#5fc080' }); box(x, -30, 0, 60, 40, '#2d7a48', { b: 5 }); R(x, INK, -20, -70, 40, 16); x.restore() }

const EP = makeBingo({
  id: 'kfbe09', D, n: 3, ink: '#ff7a3a', cardTag: '♐ × ♑',
  squares: [
    { text: 'LATE (TOOK THE SCENIC ROUTE)', at: T.s0 }, { text: 'BROUGHT A BACKPACK TO DINNER' }, { text: 'WANTS A SECOND LOCATION', at: -0.04 },
    { text: 'LAUGHS LOUD ENOUGH FOR THE ROOM' }, { free: true }, { text: 'TELLS A TRAVEL STORY', at: T.s1 },
    { text: '"WE SHOULD GO TO…" (NAMES 6 PLACES)' }, { text: 'ALREADY KNOWS THE STAFF' }, { text: 'STAYED', at: T.s2 },
  ],
  win: [2, 5, 8], bingoAt: T.bingo,
  hook: { text: 'Sag already wants | a *second location.*', out: [2.3, 2.5], accentColor: '#ffa060' },
  heads: [{ text: 'Stay a while. | *The view is right here.*', at: T.last, accent: '#ffa060', late: 4, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.screenShake, HK.shakeCues, SHAKE]],
  scene(x, t) {
    cafe(x, t, { wall: '#2a1e3a' })
    // the door (right edge)
    box(x, 940, 760, 140, 390, '#5a3a28', { b: 8, hi: '#7a5038' }); R(x, GOLD, 960, 950, 16, 16)
    const sprint = t < T.back[0] ? 1 : 1 - ease.inOutCubic(prog(t, ...T.back))
    const sx = lerp(290, 590, ease.outCubic(Math.min(1, (t + 0.7) / 0.9)) * sprint)
    if (sprint > 0.3) for (let i = 0; i < 6; i++) R(x, 'rgba(255,190,140,0.8)', sx - 200 - i * 30, 790 + i * 32, 170 * sprint, 10)
    let sm = 'sparkle', sl = [1, 0]
    if (t > T.back[0]) { sm = 'wide'; sl = [1, 0] }
    if (t > T.back[1]) { sm = 'happy'; sl = undefined }
    if (t > T.like && t < T.sit) { sm = 'neutral'; sl = [1, 0] }
    if (t > T.sit) sm = 'happy'
    if (t > T.bingo + 0.4) sm = 'heart'
    shadow(x, sx, 1150, 220)
    const packOn = t < T.sit + 0.2
    if (packOn) backpack(x, sx - 100, 860, 1)
    star(x, t, 'sagittarius', { x: sx, y: 880, s: 250, mood: sm, look: sl, hops: [T.back[1], T.story[0], T.story[0] + 0.6, T.ask, T.sit, T.bingo + 0.3], seed: 9, squash: sprint > 0.5 ? -0.06 : 0 })
    if (!packOn) backpack(x, 120, 1100 - 0 * t, 0.9)
    shadow(x, 820, 1150, 200)
    star(x, t, 'capricorn', { x: 820, y: 900, s: 220, mood: t > T.like ? 'happy' : t > T.back[0] ? 'wide' : 'neutral', look: t > T.like ? undefined : [-1, 0], hops: [T.back[0], T.like], seed: 14 })
    if (t < T.like) { x.save(); x.translate(720, 975); x.rotate(-0.25); box(x, -50, -70, 100, 140, '#7a2a3a', { b: 5 }); R(x, GOLD, -30, -40, 60, 8); x.restore() }
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    // the scenic route (dotted path everywhere)
    const rk = win01(t, T.s0 - 0.5, T.story[0], 0.2)
    if (rk > 0.01) { x.save(); x.globalAlpha = rk; box(x, 330, 520, 420, 240, '#e8dcc0', { b: 6 }); const n = Math.floor(prog(t, T.s0 - 0.5, T.s0 + 0.3) * 40); for (let i = 0; i < n; i++) { const a = i * 0.45; R(x, '#ff7a3a', 380 + 160 + Math.cos(a) * (40 + i * 3.5) - 5, 640 + Math.sin(a * 1.3) * (30 + i * 2) - 5, 10, 10) } label(x, 'HOME → … → HERE', 540, 735, { size: 22, col: INK, font: MONO }); x.restore() }
    // the travel postcard
    const pk = pop01(t, T.story[0], 0.3, 2.2) * outK(t, [T.story[1], T.story[1] + 0.2])
    if (pk > 0.01) { x.save(); x.translate(470, 620); x.rotate(-0.06); x.scale(pk, pk); box(x, -150, -90, 300, 180, '#9fd8f6', { b: 6 }); drawBits(x, ['....W....', '...WWW...', '..MMWMM..', '.MMMMMMM.', 'MMMMMMMMM'], { W: '#ffffff', M: '#6a5acd' }, 0, 10, 26, { outline: null }); x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('…AND THEN A GOAT!', 0, 78); x.restore() }
    if (t > T.bingo + 0.4) hearts(x, t, T.bingo + 0.4, 290, 720, { n: 4 })
  },
  bubbles: [
    { t0: T.back[0], t1: 2.4, x: 760, y: 700, text: 'we JUST sat down.', size: 38, tail: 0.2 },
    { t0: T.ask, t1: T.like - 0.05, x: 360, y: 640, text: 'wanna go somewhere else?', size: 36, tail: -0.2 },
    { t0: T.like, t1: T.last - 0.1, x: 750, y: 710, text: 'I like it here.', size: 40, tail: 0.2 },
    { t0: T.sob, t1: D + 1, x: 790, y: 448, text: 'THEY STAYED!!', size: 34, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['whoosh', 0, 0.3, 0.04], ['whoosh', T.back[0] + 0.1, 0.4, 0.03], ['tick', T.back[1], 0.05], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.s0 - 0.5 + i * 0.1), 0.025]), ['pop', T.story[0], 987.77, 0.035, -0.2], ['pluck', T.like, 1318.51, 0.04, 0.5, 0.3], ['tom', r3(T.sit + 0.2), 95, { gain: 0.2, decay: 0.2 }]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE]
