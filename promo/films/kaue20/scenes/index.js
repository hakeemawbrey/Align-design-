// kaue20 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E20 (long) "Every sign's single-life achievement" (90 s, house · G, loop).
//   0.0  Frame 0: a character-select screen, all 12 signs in tiles, Aries mid-jump out of its tile.
//        Hook "Twelve signs. Twelve achievements. *Wait.*" + tag WAIT FOR PISCES’S
//   3.0  one sign every 6.6 s, each in its own home: a whip, its line, its achievement, a hop. Fair to all 12:
//        ARIES first to the table · TAURUS the whole bed · GEMINI new friend: the cashier · CANCER called home, unprompted ·
//        LEO bought the good candle · VIRGO deep-cleaned the fridge, loved it · LIBRA ate where i wanted ·
//        SCORPIO let the grudge go · SAGITTARIUS said yes to the trip · CAPRICORN took a real day off ·
//        AQUARIUS started a hobby club · PISCES (saved for last, 8 s): CRIED AT A KIND STRANGER
//   83.6 back to the select screen, every tile ticked. Last line "Single life. *Twelve* ways to win." · 89.6–90 loops to frame 0.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, confetti, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, GREEN, signColor, NAMES } from '../../kaue01/achkit.js'
import { signStar } from '../../startalk.js'
import { daySky } from '../../st9day.js'
import { drawAriesHome } from '../../st9arieshome.js'
import { drawTaurusHome } from '../../st9taurushome.js'
import { drawGeminiHome } from '../../st9geminihome.js'
import { drawCancerHome } from '../../st9cancerhome.js'
import { drawLeoHome } from '../../st9leohome.js'
import { drawVirgoHome } from '../../st9virgohome.js'
import { drawLibraHome } from '../../st9librahome.js'
import { drawScorpioHome } from '../../st9scorpiohome.js'
import { drawSagHome } from '../../st9saghome.js'
import { drawCapHome } from '../../st9caphome.js'
import { drawAquaHome } from '../../st9aquahome.js'
import { drawPiscesHome } from '../../st9pisceshome.js'

const SEG = 6.6, S0 = 3.0
const SIGNS = [
  ['aries', drawAriesHome, 'kitchen', 'FIRST TO THE TABLE', 'no waiting. just eating.', 'DINNER'],
  ['taurus', drawTaurusHome, 'bedroom', 'THE WHOLE BED', 'starfish o’clock.', 'ALL MINE'],
  ['gemini', drawGeminiHome, 'kitchen', 'NEW FRIEND: THE CASHIER', 'and THEN she said—', '20 MIN CHAT'],
  ['cancer', drawCancerHome, 'bedroom', 'CALLED HOME, UNPROMPTED', 'hi! no reason! love you!', 'CALLING HOME'],
  ['leo', drawLeoHome, 'bedroom', 'BOUGHT THE GOOD CANDLE', 'for me. obviously.', 'THE GOOD ONE'],
  ['virgo', drawVirgoHome, 'kitchen', 'DEEP-CLEANED THE FRIDGE', 'it sparkles. i sparkle.', 'SPOTLESS'],
  ['libra', drawLibraHome, 'bedroom', 'ATE WHERE I WANTED', 'noodles. no vote needed.', 'NOODLES'],
  ['scorpio', drawScorpioHome, 'bedroom', 'LET THE GRUDGE GO', 'i hope you’re well. bye.', 'GRUDGE: 0'],
  ['sagittarius', drawSagHome, 'bed', 'SAID YES TO THE TRIP', 'passport? packed.', 'BOARDING'],
  ['capricorn', drawCapHome, 'window', 'TOOK A REAL DAY OFF', 'out of office. for real.', 'OUT OF OFFICE'],
  ['aquarius', drawAquaHome, 'desk', 'STARTED A HOBBY CLUB', 'first meeting: thursday!', 'CLUB · 1 MEMBER'],
  ['pisces', drawPiscesHome, 'bedroom', 'CRIED AT A KIND STRANGER', 'they held the DOOR for me', 'SO KIND'],
]
const startOf = i => S0 + i * SEG
const PIS_END = startOf(11) + 8.0      // Pisces gets the long last slot (83.6)
const segAt = t => (t < S0 || t >= PIS_END) ? -1 : Math.min(11, Math.floor((t - S0) / SEG))
const ZOOM = { sagittarius: [1.5, 540, 1180], capricorn: [1.55, 600, 1020] }

function selectScreen(x, t, ticked) {
  R(x, '#0e0a26', 0, 0, 1080, 1920)
  for (let i = 0; i < 1080; i += 60) R(x, '#141036', i, 0, 2, 1920)
  label(x, 'SELECT YOUR PLAYER', 540, 780, { size: 44, col: GOLD })
  SIGNS.forEach(([s], i) => {
    const c = i % 3, r = Math.floor(i / 3)
    const X = 210 + c * 330, Y = 960 + r * 250
    const sel = !ticked && i === 0
    box(x, X - 140, Y - 110, 280, 220, sel ? '#3a2a7a' : '#1a1440', { b: 6 })
    if (sel) { x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(X - 146, Y - 116, 292, 232) }
    const jump = i === 0 && !ticked ? Math.max(0, 1 - t / 1.0) : 0
    hero(x, t, s, X, Y - 20 - jump * 140, 130, { mood: ticked ? 'happy' : i === 0 ? 'wide' : 'neutral', look: [0, 0], seed: i, tears: s === 'pisces' ? (ticked ? 3 : 1) : 0, squash: jump ? -0.15 : 0, hops: ticked ? [86 + i * 0.08] : null })
    label(x, NAMES[s], X, Y + 80, { size: 22, col: BONE })
    if (ticked) { const k = ease.outBack(prog(t, 84.0 + i * 0.12, 84.3 + i * 0.12)); if (k > 0) { x.save(); x.translate(X + 100, Y - 80); x.scale(k, k); box(x, -24, -24, 48, 48, GREEN, { b: 4 }); label(x, '✓', 0, 2, { size: 34, col: INK }); x.restore() } }
  })
}
function placard(x, t, X, Y, text, at) {
  const k = ease.outBack(prog(t, at, at + 0.35))
  if (k <= 0) return
  x.save(); x.translate(X, Y); x.rotate(-0.06); x.scale(k, k)
  R(x, INK, -6, 0, 12, 120)
  x.font = "700 30px 'Space Mono', monospace"; const w = Math.max(200, x.measureText(text).width + 50)
  box(x, -w / 2, -70, w, 80, BONE, { b: 6 }); label(x, text, 0, -30, { size: 30, col: INK })
  x.restore()
}
function scene(x, t) {
  const i = segAt(t)
  if (i < 0) { selectScreen(x, t, t >= PIS_END); if (t >= PIS_END) confetti(x, t, PIS_END + 0.2, 540, 600, { n: 40 }); return }
  const [s, home, room] = SIGNS[i], a = startOf(i)
  daySky(x, t, { hour: 10 + i })
  home(x, t, { room, hour: 10 + i })
  const X = 470, Y = s === 'sagittarius' ? 1180 : s === 'capricorn' ? 1080 : 1180
  hero(x, t, s, X, Y, 320, { mood: t < a + 1.8 ? 'happy' : s === 'pisces' ? 'sparkle' : 'heart', look: [1, 0], seed: i, hops: [a + 0.6, a + 1.0, a + 3.5, a + 3.9], tears: s === 'pisces' ? 3 : 0, crown: s === 'leo' })
  placard(x, t, s === 'pisces' ? 250 : 720, Y - 60, SIGNS[i][5], a + 0.3)
  if (s === 'pisces') {   // the kind stranger: Capricorn holding the door
    box(x, 760, 820, 200, 520, '#8a4a2a', { b: 8, hi: '#a8603a' })
    hero(x, t, 'capricorn', 800, 1220, 200, { mood: 'happy', look: [-1, 0], seed: 40 })
    hearts(x, t, a + 2.0, X, 1000, { n: 9 }); confetti(x, t, a + 2.2, 540, 700, { n: 30 })
  }
  sparkles(x, t, X, Y - 60, a + 1.8, 12, 260, i * 0.4)
}

const shots = [{ at: 0, cam: [1.0, 540, 960] }, ...SIGNS.map(([s], i) => ({ at: startOf(i), cam: ZOOM[s] || [1.25, 560, 1100] })), { at: PIS_END, cam: [1.0, 540, 960] }]
export const { DURATION, SCENES, CUES } = makeAch({
  dur: 90, ending: 'loop', key: 'G',
  shots, scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 210, cy: 820 }, ...SIGNS.map((_, i) => ({ at: startOf(i), from: 1.35 })), { at: PIS_END, from: 1.3 }],
  shakes: [{ at: startOf(11) + 2.0, dur: 0.5, amp: 20 }],
  chapters: SIGNS.map(([s], i) => ({ at: startOf(i) + 0.05, out: startOf(i) + 2.0, n: i + 1, text: NAMES[s].toLowerCase(), col: i === 11 ? PINK : GOLD })),
  promise: { at: 0.3, out: startOf(0) + 2.4, text: 'WAIT FOR PISCES’S' },
  hook: { text: 'Twelve signs. Twelve achievements. | *Wait.*', out: 2.8, top: 250, size: 84 },
  bubbles: SIGNS.map(([s, , , , line], i) => ({ at: startOf(i) + 0.6, out: startOf(i) + (i === 11 ? 4.4 : 3.4), x: 470, y: 900, text: line, size: 38, tail: 0 })),
  achs: SIGNS.map(([s, , , title], i) => ({ at: startOf(i) + 1.8, out: startOf(i) + (i === 11 ? 5.6 : 4.6), title, xp: i === 11 ? 1000 : 100 + i * 25, size: title.length > 22 ? 38 : 44, icon: i === 11 ? 'heart' : i % 2 ? 'star' : 'trophy' })),
  cams: [{ at: startOf(3) + 3.6, out: startOf(4) + 0.4, line: 'calling home!!', lineAt: startOf(3) + 3.9, tears: 3, mood: 'happy' }, { at: startOf(7) + 3.6, out: startOf(8) + 0.4, line: 'growth', lineAt: startOf(7) + 3.9, tears: 3 }],
  last: { at: 85.4, text: 'Single life. | *Twelve* ways to win.', top: 330, out: 89.5 },
})
