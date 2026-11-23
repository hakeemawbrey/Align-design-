// Houston Star Talk Explains (farm worker w05, hst128–hst135). Engine: ./w05kit.js; cast helper and tags: ./w05.js.
import { clamp, prog, lerp, ease } from '../../src/lib.js'
import { chalkLine, chalkCircle, EX, disc, chalkSkyline, chalkRing, chalkStar, chalkSun, chalkHeart, chalkThermo, chalkArrow, chalkX, chalkCheck, chalkMoon } from './w05kit.js'
import { star, TAGS } from './w05.js'

const { TR, TA, TT, TH } = TAGS
const Y = EX.chalkYellow, PK = '#ff8fb1', MN = '#7dffb0', BL = '#8fe3ff', OR = '#ff9a3c', RD = '#ff6b5a'
const P = (B, x, y) => [B.x0 + x, B.y0 + y]
const box = (x, t, B, x0, y0, w, h, at, o = {}) => chalkLine(x, t, { pts: [P(B, x0, y0), P(B, x0 + w, y0), P(B, x0 + w, y0 + h), P(B, x0, y0 + h), P(B, x0, y0)], at, dur: 0.5, width: 4, ...o })

export const W05C = {
  // ─────────────────────────────── hst128 · Houston: 2 seasons. Your zodiac: 4. ───────────────────────────────
  hst128: {
    id: 'hst128', duration: 48, key: 'D', open: 'street', openText: 'SUMMER ST', qAccent: '#ffcf6b', tint: '#c08a2a',
    hook: 'Houston: 2 seasons. | *Your* zodiac: 4.',
    teacher: star('aries', { pitch: 600 }), student: star('pisces', { pitch: 680 }),
    boardTitle: 'FOUR SEASONS',
    beats: [
      { lines: [
          ['student', 'we get two seasons. why does the sky get *four*?'],
          ['teacher', 'the year has four turning points.', { tag: TR, point: [400, 230] }],
          ['teacher', 'two *equinoxes*, two *solstices*.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.lines[1].t, cx: 400, cy: 230, r: 30 })
          x.save(); x.strokeStyle = EX.chalk; x.lineWidth = 4; x.globalAlpha *= clamp(prog(t, b.lines[1].t + 0.3, b.lines[1].t + 0.8)); x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 230, 300, 150, 0, 0, Math.PI * 2); x.stroke(); x.restore()
          ;[[700, 230], [400, 80], [100, 230], [400, 380]].forEach(([px, py], i) => disc(x, B.x0 + px, B.y0 + py, 14, i % 2 ? Y : BL, clamp(prog(t, b.lines[2].t + 0.2 + i * 0.25, b.lines[2].t + 0.4 + i * 0.25))))
        },
        chalk: [{ dt: 0.6, line: 2, text: 'EQUINOX', x: 760, y: 300, size: 26, align: 'right', color: BL }, { dt: 1.0, line: 2, text: 'SOLSTICE', x: 400, y: 440, size: 26, align: 'center', color: Y }],
      },
      { lines: [
          ['teacher', 'astrology starts a sign at each one.', { tag: TA, point: [300, 200] }],
          ['teacher', 'Aries, Cancer, Libra, Cap: the *cardinal* 4.', { point: [400, 260] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 250, r: 150, at: b.at + 0.1, dur: 0.6, width: 5 })
          chalkLine(x, t, { pts: [P(B, 250, 250), P(B, 550, 250)], at: b.at + 0.7, dur: 0.3, width: 3 })
          chalkLine(x, t, { pts: [P(B, 400, 100), P(B, 400, 400)], at: b.at + 0.9, dur: 0.3, width: 3 })
        },
        chalk: [
          { dt: 0.5, line: 1, text: '*ARI*', x: 600, y: 255, size: 30 }, { dt: 0.9, line: 1, text: '*CAN*', x: 400, y: 75, size: 30, align: 'center' },
          { dt: 1.3, line: 1, text: '*LIB*', x: 200, y: 255, size: 30, align: 'right' }, { dt: 1.7, line: 1, text: '*CAP*', x: 400, y: 440, size: 30, align: 'center' },
        ],
      },
      { lines: [
          ['teacher', 'Houston edition: summer, then *one 55° day*.', { tag: TH, point: [300, 230] }],
          ['teacher', 'love has seasons too. *check in* when it shifts.', { tag: TT, point: [500, 300] }],
        ],
        draw(x, t, B, b) {
          chalkThermo(x, t, B, { at: b.at + 0.2, cx: 130, top: 90, h: 240, level: 0.9 })
          chalkThermo(x, t, B, { at: b.at + 0.8, cx: 280, top: 90, h: 240, level: 0.35, fillCol: BL })
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.5, cx: 560, cy: 270, s: 50 })
        },
        chalk: [{ dt: 0.9, line: 1, text: 'how are *we*?', x: 560, y: 400, size: 30, align: 'center' }],
      },
    ],
    bulb: 'so two seasons outside. *four* in my feelings.',
    items: ['4 turning points a *year*', 'Astrology: *cardinal* signs', '*Check in* when things shift'],
    last: 'Two seasons. *Check in* anyway.', lastWho: 'teacher',
    party: { line: 'Party season: Jan 9.', stars: ['aries', 'pisces', 'cancer', 'libra'] },
  },

  // ─────────────────────────────── hst129 · Orion's back in your Houston sky ───────────────────────────────
  hst129: {
    id: 'hst129', duration: 50, key: 'F#', open: 'skyline', qAccent: '#8fe3ff', tint: '#2a4a9a',
    hook: "Orion's back | in *your* Houston sky",
    teacher: star('gemini', { pitch: 620 }), student: star('cancer', { pitch: 600, glasses: true }),
    boardTitle: 'ORION',
    beats: [
      { lines: [
          ['student', 'who is that *hunter* over the parking lot?'],
          ['teacher', "that's Orion, up on *winter* evenings.", { tag: TR, point: [400, 220] }],
          ['teacher', 'in summer it hides in the *daytime* sky.', { point: [400, 220] }],
        ],
        draw(x, t, B, b) {
          const S = [[330, 90, OR], [470, 100, EX.chalk], [370, 210, EX.chalk], [400, 200, EX.chalk], [430, 190, EX.chalk], [330, 330, EX.chalk], [480, 320, BL]]
          S.forEach(([sx, sy, c], i) => chalkStar(x, t, B, { at: b.lines[1].t + 0.1 + i * 0.12, cx: sx, cy: sy, r: i === 0 || i === 6 ? 24 : 16, color: c }))
          chalkLine(x, t, { pts: [[330, 90], [370, 210], [330, 330]].map(([a, c]) => P(B, a, c)), at: b.lines[1].t + 1.0, dur: 0.5, width: 3 })
          chalkLine(x, t, { pts: [[470, 100], [430, 190], [480, 320]].map(([a, c]) => P(B, a, c)), at: b.lines[1].t + 1.2, dur: 0.5, width: 3 })
          chalkSun(x, t, B, { at: b.lines[2].t + 0.3, cx: 680, cy: 140, r: 36 })
        },
        chalk: [{ dt: 0.6, line: 2, text: 'SUMMER: *SUN*', x: 680, y: 260, size: 26, align: 'center' }],
      },
      { lines: [
          ['teacher', 'three stars in a row: *the Belt*.', { tag: TR, point: [400, 200] }],
          ['teacher', 'red Betelgeuse up top, blue-white *Rigel* below.', { point: [330, 90] }],
          ['student', 'even with all the *city glow*?'],
          ['teacher', "yep. they're bright enough. look *southeast*.", { point: [600, 300] }],
        ],
        draw(x, t, B, b) {
          ;[[370, 210], [400, 200], [430, 190]].forEach(([sx, sy], i) => chalkStar(x, t, B, { at: b.at + 0.1 + i * 0.1, cx: sx, cy: sy, r: 18 }))
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 200, r: 60, at: b.lines[0].t + 0.5, dur: 0.5, color: Y })
          chalkStar(x, t, B, { at: b.lines[1].t + 0.2, cx: 330, cy: 90, r: 26, color: OR })
          chalkStar(x, t, B, { at: b.lines[1].t + 0.6, cx: 480, cy: 330, r: 26, color: BL })
          chalkSkyline(x, t, B, { at: b.lines[3].t + 0.1, base: 430, x0: 540, x1: 780, dur: 0.6 })
          chalkArrow(x, t, B, [620, 250], [740, 160], b.lines[3].t + 0.6)
        },
        chalk: [{ dt: 0.6, line: 1, text: 'BETELGEUSE', x: 180, y: 70, size: 24, align: 'center', color: OR }, { dt: 1.1, line: 1, text: 'RIGEL', x: 560, y: 380, size: 24, color: BL }, { dt: 0.8, line: 3, text: 'SE', x: 750, y: 140, size: 28 }],
      },
      { lines: [
          ['teacher', 'fun fact: Orion is *not* a zodiac constellation.', { tag: TR, point: [400, 200] }],
          ['teacher', 'stargaze date: find the Belt *together*.', { tag: TT, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 220, y: B.y0 + 250, r: 130, at: b.at + 0.2, dur: 0.6, width: 4 })
          chalkStar(x, t, B, { at: b.at + 0.8, cx: 520, cy: 160, r: 28 })
          chalkX(x, t, B, { at: b.lines[0].t + 1.2, cx: 520, cy: 160, s: 36, color: RD })
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.5, cx: 600, cy: 330, s: 38 })
        },
        chalk: [{ dt: 0.5, line: 0, text: 'ZODIAC', x: 220, y: 260, size: 28, align: 'center' }],
      },
    ],
    bulb: 'so Orion has a *winter-only* lease. relatable.',
    items: ['Orion: *winter* evenings', 'Find the *Belt*: 3 in a row', 'Not a *zodiac* constellation'],
    last: 'Three stars. *One date.*', lastWho: 'teacher',
    party: { line: 'Winter plans: Jan 9.', stars: ['gemini', 'cancer', 'pisces', 'sagittarius'] },
  },

  // ─────────────────────────────── hst130 · Signs vs. stars: the kolache rule ───────────────────────────────
  hst130: {
    id: 'hst130', duration: 47, key: 'C', open: 'food', qAccent: '#ff8fb1', tint: '#c0607a',
    hook: 'Signs vs. stars: | the *kolache* rule',
    teacher: star('virgo', { pitch: 470, prop: 'clipboard' }), student: star('libra', { pitch: 660 }),
    boardTitle: 'SAME NAME?',
    beats: [
      { lines: [
          ['student', "is my sign the same as the *constellation*?"],
          ['teacher', 'think kolache vs. *klobasnek*.', { tag: TH, point: [400, 230] }],
          ['teacher', 'same bakery case. *different* things.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 220, y: B.y0 + 240, r: 90, at: b.lines[1].t + 0.2, dur: 0.6, color: Y })
          disc(x, B.x0 + 220, B.y0 + 240, 30, '#c95ac0', clamp(prog(t, b.lines[1].t + 0.8, b.lines[1].t + 1.1)))
          box(x, t, B, 470, 190, 230, 100, b.lines[1].t + 1.0, { color: OR })
          box(x, t, B, 680, 220, 70, 40, b.lines[1].t + 1.4, { color: RD })
        },
        chalk: [{ dt: 0.5, line: 2, text: 'SWEET', x: 220, y: 380, size: 30, align: 'center' }, { dt: 0.9, line: 2, text: 'SAUSAGE', x: 600, y: 380, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', 'a constellation is a *star pattern*. sizes vary.', { tag: TR, point: [250, 200] }],
          ['teacher', "a sign: an *equal* 30° slice of the Sun's path.", { tag: TA, point: [600, 230] }],
        ],
        draw(x, t, B, b) {
          const S = [[60, 120], [140, 90], [200, 160], [120, 220], [260, 260]]
          S.forEach(([sx, sy], i) => chalkStar(x, t, B, { at: b.at + 0.2 + i * 0.1, cx: sx, cy: sy, r: 14 }))
          chalkLine(x, t, { pts: S.map(([a, c]) => P(B, a, c)), at: b.at + 0.8, dur: 0.6, width: 3 })
          chalkCircle(x, t, { x: B.x0 + 590, y: B.y0 + 240, r: 150, at: b.lines[1].t + 0.1, dur: 0.6, width: 4 })
          for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; chalkLine(x, t, { pts: [P(B, 590, 240), P(B, 590 + Math.cos(a) * 150, 240 + Math.sin(a) * 150)], at: b.lines[1].t + 0.6 + i * 0.05, dur: 0.1, width: 3 }) }
        },
        chalk: [{ dt: 0.8, line: 1, text: '12 × 30° = *360°*', x: 590, y: 430, size: 28, align: 'center' }],
      },
      { lines: [
          ['teacher', 'your birthday Sun may sit in *another* one.', { tag: TR, point: [400, 200] }],
          ['teacher', 'names matter. call people what *they* like.', { tag: TT, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 40, 140), P(B, 760, 140)], at: b.at + 0.1, dur: 0.5, width: 4 })
          chalkLine(x, t, { pts: [P(B, 40, 220), P(B, 760, 220)], at: b.at + 0.3, dur: 0.5, width: 4, dash: [16, 10], color: Y })
          disc(x, B.x0 + 400, B.y0 + 180, 20, Y, clamp(prog(t, b.at + 0.6, b.at + 0.9)))
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.5, cx: 400, cy: 340, s: 40 })
        },
        chalk: [{ dt: 0.4, line: 0, text: 'STARS', x: 40, y: 110, size: 26 }, { dt: 0.6, line: 0, text: '*SIGNS*', x: 40, y: 270, size: 26 }],
      },
    ],
    bulb: 'same names, *different* things. like pastries.',
    items: ['Signs: *equal* 30° slices', 'Constellations: *star* patterns', 'Use the *name* they like'],
    last: 'Same name. *Different* pastry.', lastWho: 'teacher',
    party: { line: 'Bring kolaches. Jan 9.', stars: ['virgo', 'libra', 'pisces', 'taurus'] },
  },

  // ─────────────────────────────── hst131 · Venus: hotter than your car in August ───────────────────────────────
  hst131: {
    id: 'hst131', duration: 48, key: 'E', open: 'heat', openText: 'HOT', qAccent: '#ffb36b', tint: '#e0603a',
    hook: 'Venus: hotter | than *your* car | in August',
    teacher: star('libra', { pitch: 560 }), student: star('scorpio', { pitch: 400 }),
    boardTitle: 'VENUS',
    beats: [
      { lines: [
          ['student', 'my car seat in August is the *hottest* place.'],
          ['teacher', 'nope. Venus is the *hottest* planet.', { tag: TR, point: [400, 220] }],
          ['teacher', 'even hotter than Mercury, which is *closer*.', { point: [200, 220] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.lines[1].t, cx: 90, cy: 230, r: 40 })
          disc(x, B.x0 + 240, B.y0 + 230, 14, EX.chalk, clamp(prog(t, b.lines[2].t, b.lines[2].t + 0.3)))
          disc(x, B.x0 + 430, B.y0 + 230, 34, OR, clamp(prog(t, b.lines[1].t + 0.3, b.lines[1].t + 0.6)))
          disc(x, B.x0 + 650, B.y0 + 230, 34, BL, clamp(prog(t, b.lines[1].t + 0.5, b.lines[1].t + 0.8)))
        },
        chalk: [{ dt: 0.4, line: 2, text: 'MERCURY', x: 240, y: 300, size: 24, align: 'center' }, { dt: 0.8, line: 1, text: '*VENUS*', x: 430, y: 320, size: 28, align: 'center' }, { dt: 1.0, line: 1, text: 'EARTH', x: 650, y: 320, size: 24, align: 'center' }],
      },
      { lines: [
          ['teacher', 'its thick atmosphere *traps* the heat.', { tag: TR, point: [400, 230] }],
          ['teacher', 'Houston August is hot. Venus is *way* hotter.', { tag: TH, point: [400, 230] }],
          ['student', 'i park by *shade* and still cry.'],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 240, r: 90, at: b.at + 0.1, dur: 0.6, color: OR })
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 240, r: 140, at: b.at + 0.5, dur: 0.6, dash: [10, 10] })
          for (let i = 0; i < 4; i++) { const a = -0.8 + i * 0.5; chalkLine(x, t, { pts: [P(B, 400 + Math.cos(a) * 95, 240 + Math.sin(a) * 95), P(B, 400 + Math.cos(a) * 132, 240 + Math.sin(a) * 132), P(B, 400 + Math.cos(a + 0.3) * 100, 240 + Math.sin(a + 0.3) * 100)], at: b.lines[0].t + 0.8 + i * 0.15, dur: 0.3, color: RD, width: 4 }) }
          chalkThermo(x, t, B, { at: b.lines[1].t + 0.3, cx: 700, top: 60, h: 260, level: 1 })
        },
      },
      { lines: [
          ['teacher', 'astrology: your Venus sign is *how you love*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'ask how *they* like to be loved. then do it.', { tag: TT, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkHeart(x, t, B, { at: b.at + 0.3, cx: 260, cy: 250, s: 70, color: PK })
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.4, cx: 540, cy: 250, s: 70, color: Y })
          chalkArrow(x, t, B, [350, 250], [450, 250], b.lines[1].t + 1.0)
        },
      },
    ],
    bulb: 'so my car is a *tiny Venus*. in August.',
    items: ['Venus: the *hottest* planet', 'Thick air *traps* heat', 'Ask how they like *love*'],
    last: 'Hot planet. *Warm* heart.', lastWho: 'teacher',
    party: { line: 'Cooler in January. Jan 9.', stars: ['libra', 'scorpio', 'pisces', 'leo'] },
  },

  // ─────────────────────────────── hst132 · Why the Moon follows you down I-10 ───────────────────────────────
  hst132: {
    id: 'hst132', duration: 46, key: 'G', open: 'loop', openText: '10', qAccent: '#f2c75c', tint: '#4a5ab0',
    hook: 'Why the Moon | follows *you* | down I-10',
    teacher: star('cancer', { pitch: 420, glasses: true }), student: star('gemini', { pitch: 720 }),
    boardTitle: 'MOON RIDE',
    beats: [
      { lines: [
          ['student', 'the Moon followed me all the way to *Katy*.'],
          ['teacher', "it's very far away, so it barely *shifts*.", { tag: TR, point: [600, 100] }],
          ['teacher', 'near things, like signs, *zip* right past.', { point: [200, 330] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 380), P(B, 780, 380)], at: b.at + 0.1, dur: 0.5, width: 5 })
          disc(x, B.x0 + 620, B.y0 + 100, 34, Y, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.3)))
          const s = (t - b.lines[2].t) * 400
          if (t > b.lines[2].t) for (let i = 0; i < 3; i++) { const px = 760 - ((s + i * 280) % 840); chalkLine(x, t, { pts: [P(B, px, 380), P(B, px, 300)], at: b.lines[2].t, dur: 0.01, width: 5, color: MN }); box(x, t, B, px - 30, 270, 60, 30, b.lines[2].t, { dur: 0.01, color: MN }) }
          disc(x, B.x0 + 200, B.y0 + 350, 18, PK, 1)
        },
        chalk: [{ dt: 0.5, line: 1, text: '*FAR*', x: 620, y: 190, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', 'drive west on the Katy Freeway…', { tag: TH, point: [400, 250] }],
          ['teacher', 'the Moon rides along like your *cousin*.', { point: [600, 120] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 320), P(B, 780, 320)], at: b.at + 0.1, dur: 0.5, width: 8 })
          chalkLine(x, t, { pts: [P(B, 20, 370), P(B, 780, 370)], at: b.at + 0.3, dur: 0.5, width: 8 })
          const u = clamp(prog(t, b.lines[0].t + 0.6, b.lines[1].t + 2))
          disc(x, B.x0 + lerp(700, 120, u), B.y0 + 345, 16, PK, 1)
          disc(x, B.x0 + lerp(700, 120, u), B.y0 + 110, 30, Y, 1)
        },
        chalk: [{ dt: 0.5, line: 0, text: '← KATY', x: 40, y: 290, size: 28 }, { dt: 0.5, line: 0, text: '*10*', x: 720, y: 290, size: 30 }],
      },
      { lines: [
          ['teacher', 'astrology reads the Moon as *comfort*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'long drive tip: take *turns* picking songs.', { tag: TT, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkMoon(x, t, B, { at: b.at + 0.2, cx: 200, cy: 200, r: 60, k: 0.75, color: Y })
          for (let i = 0; i < 3; i++) { chalkLine(x, t, { pts: [P(B, 470 + i * 90, 340), P(B, 470 + i * 90, 220), P(B, 500 + i * 90, 210)], at: b.lines[1].t + 0.4 + i * 0.2, dur: 0.3, width: 5, color: i % 2 ? PK : BL }); chalkCircle(x, t, { x: B.x0 + 455 + i * 90, y: B.y0 + 345, r: 16, at: b.lines[1].t + 0.6 + i * 0.2, dur: 0.2, width: 4, color: i % 2 ? PK : BL }) }
        },
      },
    ],
    bulb: "so the Moon's not clingy. it's just *far*.",
    items: ['The Moon is *very* far away', 'Near things *zip* past', 'Road trip: take *turns*'],
    last: 'Long drive? *Share the aux.*', lastWho: 'teacher',
    party: { line: 'Worth the drive: Jan 9.', stars: ['cancer', 'gemini', 'pisces', 'aquarius'] },
  },

  // ─────────────────────────────── hst133 · Your Mars sign is how you park ───────────────────────────────
  hst133: {
    id: 'hst133', duration: 46, key: 'A', open: 'street', openText: 'WESTHEIMER', qAccent: '#ff6b5a', tint: '#b03a3a',
    hook: '*Your* Mars sign | is how you park',
    teacher: star('aries', { pitch: 600, prop: 'whistle' }), student: star('taurus', { pitch: 430 }),
    boardTitle: 'MARS',
    beats: [
      { lines: [
          ['student', 'why is Mars *red*? and why is it my vibe?'],
          ['teacher', 'its dust is full of iron oxide. *rust*.', { tag: TR, point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          disc(x, B.x0 + 400, B.y0 + 230, 90, RD, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.4)))
          for (let i = 0; i < 9; i++) chalkCircle(x, t, { x: B.x0 + 350 + (i * 37) % 110, y: B.y0 + 190 + (i * 29) % 90, r: 6 + (i % 3) * 3, at: b.lines[1].t + 0.5 + i * 0.07, dur: 0.15, width: 3, color: OR })
        },
        chalk: [{ dt: 0.7, line: 1, text: 'IRON + AIR = *RUST*', x: 400, y: 380, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read Mars as *drive*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'how you go *after* what you want.', { point: [400, 260] }],
          ['teacher', 'Houston version: circling for the *shady* spot.', { tag: TH, point: [500, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 40, 380), P(B, 760, 380)], at: b.lines[2].t, dur: 0.4, width: 4 })
          for (let i = 0; i < 5; i++) chalkLine(x, t, { pts: [P(B, 120 + i * 140, 380), P(B, 120 + i * 140, 300)], at: b.lines[2].t + 0.2 + i * 0.05, dur: 0.15, width: 3 })
          chalkLine(x, t, { pts: [P(B, 600, 300), P(B, 600, 160)], at: b.lines[2].t + 0.6, dur: 0.3, width: 5, color: MN })
          chalkCircle(x, t, { x: B.x0 + 600, y: B.y0 + 140, r: 60, at: b.lines[2].t + 0.8, dur: 0.4, color: MN })
          const a = (t - b.lines[2].t) * 2.2
          if (t > b.lines[2].t + 0.4) disc(x, B.x0 + 400 + Math.cos(a) * 260, B.y0 + 250 + Math.sin(a) * 40, 14, PK, 1)
        },
        chalk: [{ dt: 0.4, line: 0, text: '*DRIVE*', x: 40, y: 120, size: 40 }],
      },
      { lines: [
          ['teacher', 'want them? ask *clearly*. kindly.', { tag: TT, point: [400, 230] }],
          ['teacher', "no circling for six weeks. *ask*.", { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 200, 220), P(B, 560, 220)], at: b.at + 0.3, dur: 0.5, width: 6, arrow: true, color: Y })
          chalkHeart(x, t, B, { at: b.at + 0.9, cx: 620, cy: 220, s: 40 })
          chalkX(x, t, B, { at: b.lines[1].t + 0.4, cx: 160, cy: 340, s: 28 })
        },
      },
    ],
    bulb: 'so circling for shade is my *Mars energy*.',
    items: ['Mars is red from *rust*', 'Astrology: Mars = *drive*', 'Ask them out *clearly*'],
    last: 'Want it? *Ask nicely.*', lastWho: 'teacher',
    party: { line: 'Ask them to Jan 9.', stars: ['aries', 'taurus', 'pisces', 'scorpio'] },
  },

  // ─────────────────────────────── hst134 · New moon, new you, Houston? ───────────────────────────────
  hst134: {
    id: 'hst134', duration: 48, key: 'Bb', open: 'bayou', qAccent: '#c9a6ff', tint: '#5a3a9a',
    hook: 'New moon, | new *you*, Houston?',
    teacher: star('pisces', { pitch: 660 }), student: star('sagittarius', { pitch: 720 }),
    boardTitle: 'NEW MOON',
    beats: [
      { lines: [
          ['student', "where'd the *Moon* go tonight?"],
          ['teacher', "new Moon: it's between us and the *Sun*.", { tag: TR, point: [400, 230] }],
          ['teacher', 'its lit side faces *away*, so we barely see it.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.lines[1].t, cx: 100, cy: 230, r: 40 })
          chalkMoon(x, t, B, { at: b.lines[1].t + 0.4, cx: 400, cy: 230, r: 34, k: 0.02 })
          chalkCircle(x, t, { x: B.x0 + 680, y: B.y0 + 230, r: 40, at: b.lines[1].t + 0.7, dur: 0.4, color: BL })
          chalkArrow(x, t, B, [160, 230], [350, 230], b.lines[2].t + 0.2)
        },
        chalk: [{ dt: 0.6, line: 2, text: '*DARK* SIDE TO US', x: 400, y: 330, size: 26, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers use new moons for *fresh starts*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'January: run clubs pack the *bayou trail*.', { tag: TH, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 30, 360), P(B, 200, 320), P(B, 380, 370), P(B, 560, 320), P(B, 770, 360)], at: b.lines[1].t + 0.2, dur: 0.7, width: 5, color: BL })
          for (let i = 0; i < 4; i++) { const u = ((t - b.lines[1].t) * 0.2 + i * 0.25) % 1; disc(x, B.x0 + lerp(40, 760, u), B.y0 + 330, 10, [PK, Y, MN, OR][i], clamp(prog(t, b.lines[1].t + 0.8, b.lines[1].t + 1.1))) }
        },
        chalk: [{ dt: 0.4, line: 0, text: '*FRESH* START', x: 40, y: 130, size: 38 }],
      },
      { lines: [
          ['teacher', 'set one small love intention. just *one*.', { tag: TT, point: [400, 200] }],
          ['teacher', 'like a phone-free date, once a *week*.', { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          box(x, t, B, 220, 120, 360, 260, b.at + 0.2)
          for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [P(B, 250, 180 + i * 60), P(B, 550, 180 + i * 60)], at: b.at + 0.6 + i * 0.1, dur: 0.3, width: 2, alpha: 0.5 })
          chalkCheck(x, t, B, { at: b.lines[1].t + 0.6, cx: 300, cy: 200 })
        },
        chalk: [{ dt: 0.4, line: 1, text: '*no phones*', x: 340, y: 210, size: 28 }],
      },
    ],
    bulb: 'so the Moon goes *dark* to start over. same.',
    items: ['New Moon: lit side faces *away*', 'Astrology: *fresh starts*', 'One small *intention*'],
    last: 'Start small. *Start now.*', lastWho: 'teacher',
    party: { line: 'New year, new match: Jan 9.', stars: ['pisces', 'sagittarius', 'virgo', 'aries'] },
  },

  // ─────────────────────────────── hst135 · A galaxy is above your apartment ───────────────────────────────
  hst135: {
    id: 'hst135', duration: 48, key: 'Db', open: 'sky', qAccent: '#d8c6ff', tint: '#3a2a8a',
    hook: 'A galaxy is above | *your* apartment',
    teacher: star('sagittarius', { pitch: 720 }), student: star('capricorn', { pitch: 420 }),
    boardTitle: 'THE MILKY WAY',
    beats: [
      { lines: [
          ['student', "there's a *galaxy* over my apartment?"],
          ['teacher', 'we live *inside* the Milky Way, our galaxy.', { tag: TR, point: [400, 220] }],
          ['teacher', 'its band crosses the sky. city light *hides* it.', { point: [400, 160] }],
        ],
        draw(x, t, B, b) {
          x.save(); x.globalAlpha *= clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.8)) * 0.8
          x.translate(B.x0 + 400, B.y0 + 220); x.rotate(-0.25)
          x.strokeStyle = EX.chalk; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 330, 60, 0, 0, Math.PI * 2); x.stroke()
          x.fillStyle = 'rgba(255,240,200,0.35)'; x.beginPath(); x.ellipse(0, 0, 80, 30, 0, 0, Math.PI * 2); x.fill()
          x.restore()
          disc(x, B.x0 + 560, B.y0 + 200, 10, Y, clamp(prog(t, b.lines[1].t + 0.8, b.lines[1].t + 1.1)))
          chalkSkyline(x, t, B, { at: b.lines[2].t + 0.4, base: 430, x0: 40, x1: 760, dur: 0.8 })
        },
        chalk: [{ dt: 1.0, line: 1, text: '*YOU*', x: 560, y: 150, size: 26, align: 'center' }],
      },
      { lines: [
          ['teacher', 'its center lies toward *Sagittarius*. hi.', { tag: TR, point: [400, 220] }],
          ['teacher', 'astrologers read Sagittarius as the *explorer*.', { tag: TA, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 300, 300), P(B, 380, 180), P(B, 460, 300), P(B, 300, 300)], at: b.at + 0.2, dur: 0.6, width: 4 })
          chalkLine(x, t, { pts: [P(B, 380, 180), P(B, 380, 120), P(B, 350, 90)], at: b.at + 0.8, dur: 0.3, width: 4 })
          chalkArrow(x, t, B, [480, 220], [700, 220], b.lines[0].t + 0.6, { color: Y })
          disc(x, B.x0 + 730, B.y0 + 220, 24, Y, clamp(prog(t, b.lines[0].t + 1.0, b.lines[0].t + 1.3)))
        },
        chalk: [{ dt: 1.2, line: 0, text: 'CENTER', x: 730, y: 290, size: 24, align: 'center' }, { dt: 0.4, line: 1, text: 'TEAPOT', x: 380, y: 350, size: 24, align: 'center' }],
      },
      { lines: [
          ['teacher', "\"an hour from Houston\" is still Houston.", { tag: TH, point: [300, 230] }],
          ['teacher', 'so drive *two*. plan a dark-sky trip together.', { tag: TT, point: [500, 300] }],
        ],
        draw(x, t, B, b) {
          chalkSkyline(x, t, B, { at: b.at + 0.2, base: 400, x0: 30, x1: 250, dur: 0.6 })
          chalkArrow(x, t, B, [280, 330], [440, 330], b.lines[1].t + 0.2)
          for (let i = 0; i < 10; i++) chalkStar(x, t, B, { at: b.lines[1].t + 0.6 + i * 0.07, cx: 480 + (i * 71) % 280, cy: 110 + (i * 43) % 200, r: 10 + (i % 3) * 4 })
          chalkHeart(x, t, B, { at: b.lines[1].t + 1.4, cx: 620, cy: 370, s: 30 })
        },
      },
    ],
    bulb: "so i'm *in* a galaxy. i should go outside.",
    items: ['We live *inside* the Milky Way', 'Center: toward *Sagittarius*', 'Plan a *dark-sky* trip'],
    last: 'Home is huge. *Go see it.*', lastWho: 'teacher',
    party: { line: 'Out of the apartment: Jan 9.', stars: ['sagittarius', 'capricorn', 'pisces', 'gemini'] },
  },
}
