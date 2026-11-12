// r2t0603: star_talk, BELIKE (twelve signs), "New Year, new me? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · G).
// Aries: patience, gave up by 12:01 · Taurus: eat less? respectfully, no · Gemini: fourteen resolutions · Cancer called
// mom nine times today · Leo: more Leo · Virgo laminated them · Libra: date more, still comparing charts · Scorpio's is
// classified · Sagittarius: no resolutions · Capricorn made a five-year plan instead · Aquarius will save the world by
// Tuesday · Pisces: cry less (cried about it).
// Ending: group. "New year. | *Same* us." with confetti.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = GOLD, ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Resolution: patience. | Gave up by *12:01.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 780, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1000, lt > 1.2 ? 'PATIENCE: OVER' : 'PATIENCE: ON', 1, lt > 1.2 ? RED : MINT, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Eat less this year? | *Respectfully,* no.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 760 + i * 50, 960 - i * 70, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      sheet(x, 800, 690, pop01(t, P.t0 + 0.8, 0.3, 2), { w: 300, h: 130, rot: 0.05, lines: [['eat less', STEEL]], size: 40 })
      if (lt > 1.2) { const p = clamp((lt - 1.2) / 0.3); x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(690, 700); x.lineTo(690 + 220 * p, 680); x.stroke(); x.restore() }
      L(x, 800, 1110, 'REQUEST DENIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Made fourteen resolutions. | Kept *the vibe.*', mood: 'wink', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      const L14 = ['run', 'read', 'knit', 'french', 'guitar', 'journal', 'yoga']
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 420, head: 'MY 14', headBg: '#ffd23a', headInk: INK, align: 'left', lines: L14.map(s => '✓? ' + s), size: 28, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, '…AND 7 MORE', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Resolved to call mom. | *Nine* times today.', mood: 'heart', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 8)
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING: MOM ♡', headCol: PINK, size: 26, lines: [['hi again!', BONE, 1, true], ['sweetie… ♡', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), false]] })
      L(x, 800, 1110, `CALL #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), SKYB, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Resolution? | *More* Leo.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 260, head: 'NEW YEAR, NEW ME', headBg: '#ffb34a', headInk: INK, lines: ['same me.', 'but louder.'], size: 40, progress: clamp((lt - 0.4) / 0.8) })
      L(x, 800, 1060, 'UPGRADE: COMPLETE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
      sparkles(x, t, 800, 820, P.t0 + 1.5, 7, 200, 0.6)
    } },
  { sign: 'virgo', cap: 'Wrote the resolutions. | Then *laminated* them.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 830, k, { w: 300, h: 320, rot: -0.03, head: 'RESOLUTIONS', headBg: MINT, headInk: INK, align: 'left', lines: ['1. floss', '2. floss more', '3. label things'], size: 28 })
      if (lt > 1.0 && k > 0.9) { const p = clamp((lt - 1.0) / 0.5); x.save(); x.translate(800, 830); x.rotate(-0.03); x.globalAlpha = 0.5; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-150 + 340 * p - 60, -160); x.lineTo(-150 + 340 * p, -160); x.lineTo(-150 + 340 * p - 120, 160); x.lineTo(-150 + 340 * p - 180, 160); x.closePath(); x.fill(); x.restore() }
      L(x, 800, 1090, 'WATERPROOF NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Resolution: date more. | Still *comparing charts.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sheet(x, 740 + i * 60, 760 + i * 70, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { w: 220, h: 200, rot: -0.08 + i * 0.07, head: ['♈︎ CHART', '♊︎ CHART', '♒︎ CHART'][i], headBg: [LAV, PINK, SKYB][i], headInk: INK, lines: ['sun ✓', 'moon ?'], size: 28 })
      L(x, 800, 1110, 'TABS OPEN: 31', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Their resolution? | *Classified.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 830, k, { w: 320, h: 300, head: 'RESOLUTION', headBg: '#ff6b8a', headInk: INK, lines: [], size: 30 })
      if (k > 0.9) { x.save(); x.translate(800, 830); x.rotate(-0.04); x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-120, -40 + i * 50, 240 * clamp((lt - 0.4 - i * 0.2) / 0.3), 30); x.restore() }
      L(x, 800, 1080, 'NICE TRY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, 0.04, 38)
    } },
  { sign: 'sagittarius', cap: 'Resolution: | *no resolutions.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800 + (lt > 1.0 ? 260 * ease.inCubic(prog(lt, 1.0, 1.5)) : 0), 800 - (lt > 1.0 ? 200 * ease.inCubic(prog(lt, 1.0, 1.5)) : 0), k * (lt > 1.5 ? 0 : 1), { w: 280, h: 220, rot: lt > 1.0 ? 0.6 * prog(lt, 1.0, 1.5) : 0.04, head: 'RULES', headBg: STEEL, headInk: INK, lines: ['be good', 'sleep 8h'], size: 30 })
      L(x, 800, 1060, 'FREEDOM ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 40)
      sparkles(x, t, 800, 820, P.t0 + 1.5, 7, 200, 0.3)
    } },
  { sign: 'capricorn', cap: 'Skipped resolutions. | Made a *five-year plan.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) sheet(x, 720 + i * 40, 700 + i * 60, pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2), { w: 220, h: 150, rot: -0.05 + i * 0.025, head: `YEAR ${i + 1}`, headBg: [STEEL, MINT, GOLD, LAV, SKYB][i], headInk: INK, lines: [], size: 26 })
      L(x, 800, 1110, 'YEAR 6: DRAFTING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Resolution: save the world. | By *Tuesday.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t) * 0.04 })
      bubble(x, 800, 640, 'step one: everything', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      L(x, 800, 1030, 'IT’S MONDAY. ON IT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Resolution: cry less. | *Cried* about it.', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 180, rot: 0.05, lines: ['cry less', 'this year'], size: 36 })
      bits(x, 'UMB', 820, 990, 14 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.2 })
      L(x, 800, 1120, 'DAY 1: 0 / 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0603', key: 'G', accent: ACC, ending: 'group',
  title: 'New Year, new me? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'New year. | *Same* us.',
    draw(x, t, lt) { confetti(x, t, 540, 1000, t - lt + 1.0, { n: 30, spread: 420 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
