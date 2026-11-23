// Houston Star Talk Explains (farm worker w05, hst119–hst127). Engine: ./w05kit.js; cast helper and tags: ./w05.js.
import { clamp, prog, lerp, ease } from '../../src/lib.js'
import { chalkLine, chalkCircle, EX, disc, chalkSkyline, chalkRing, chalkStar, chalkSun, chalkHeart, chalkThermo, chalkArrow, chalkX, chalkCheck, chalkMoon } from './w05kit.js'
import { star, TAGS } from './w05.js'

const { TR, TA, TT, TH } = TAGS
const Y = EX.chalkYellow, PK = '#ff8fb1', MN = '#7dffb0', BL = '#8fe3ff', OR = '#ff9a3c'
const P = (B, x, y) => [B.x0 + x, B.y0 + y]
const at2 = (o, dy) => ({ ...o, dy })

export const W05B = {
  // ─────────────────────────────── hst119 · Your element, explained with Houston weather ───────────────────────────────
  hst119: {
    id: 'hst119', duration: 50, key: 'C', open: 'rain', qAccent: '#8fe3ff', tint: '#4a6ab0',
    hook: 'Your element, | explained with *Houston weather*',
    teacher: star('sagittarius', { pitch: 560 }), student: star('aquarius', { pitch: 700 }),
    boardTitle: 'THE ELEMENTS',
    beats: [
      { lines: [
          ['student', 'what does my *element* even mean?'],
          ['teacher', 'astrology sorts the signs into *four* elements.', { tag: TA, point: [400, 200] }],
          ['teacher', 'fire, earth, air, water. *three* signs each.', { point: [400, 260] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          chalkLine(x, t, { pts: [P(B, 400, 60), P(B, 400, 420)], at: a + 0.2, dur: 0.4, width: 4 })
          chalkLine(x, t, { pts: [P(B, 20, 240), P(B, 780, 240)], at: a + 0.4, dur: 0.4, width: 4 })
        },
        chalk: [
          { dt: 0.9, line: 1, text: '*FIRE*|ari leo sag', x: 200, y: 120, size: 34, align: 'center' },
          { dt: 1.4, line: 1, text: '*EARTH*|tau vir cap', x: 600, y: 120, size: 34, align: 'center', color: MN },
          { dt: 0.4, line: 2, text: '*AIR*|gem lib aqu', x: 200, y: 310, size: 34, align: 'center', color: BL },
          { dt: 0.9, line: 2, text: '*WATER*|can sco pis', x: 600, y: 310, size: 34, align: 'center', color: PK },
        ],
      },
      { lines: [
          ['teacher', 'in Houston terms? fire is *August*.', { tag: TH, point: [200, 150] }],
          ['teacher', 'water is the surprise *4pm shower*.', { point: [600, 150] }],
          ['teacher', 'earth is the *pollen* on every car.', { point: [200, 330] }],
          ['teacher', 'air is that *one breeze*. you know the one.', { point: [600, 330] }],
        ],
        draw(x, t, B, b) {
          const L = b.lines
          chalkSun(x, t, B, { at: L[0].t + 0.4, cx: 200, cy: 130, r: 34 })
          for (let i = 0; i < 6; i++) chalkLine(x, t, { pts: [P(B, 520 + i * 30, 90), P(B, 505 + i * 30, 160)], at: L[1].t + 0.4 + i * 0.06, dur: 0.15, color: BL, width: 4 })
          for (let i = 0; i < 10; i++) chalkCircle(x, t, { x: B.x0 + 110 + (i * 37) % 180, y: B.y0 + 300 + (i * 23) % 70, r: 6, at: L[2].t + 0.4 + i * 0.05, dur: 0.15, color: Y, width: 3 })
          chalkLine(x, t, { pts: [P(B, 480, 330), P(B, 560, 300), P(B, 640, 340), P(B, 720, 310)], at: L[3].t + 0.4, dur: 0.6, color: MN, width: 4 })
        },
      },
      { lines: [
          ['teacher', 'elements describe *styles*, not matches.', { tag: TT, point: [400, 200] }],
          ['teacher', 'ask what helps them feel *at home*.', { point: [400, 280] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 300, 380), P(B, 300, 250), P(B, 400, 170), P(B, 500, 250), P(B, 500, 380), P(B, 300, 380)], at: b.lines[1].t + 0.2, dur: 0.8, width: 5 })
          chalkHeart(x, t, B, { at: b.lines[1].t + 1.0, cx: 400, cy: 300, s: 34 })
        },
      },
    ],
    bulb: "so i'm the *one breeze*. rare. iconic.",
    items: ['4 elements, *3 signs* each', 'Astrology: elements = *styles*', 'Ask what feels like *home*'],
    last: 'Every forecast. *One city.*', lastWho: 'teacher',
    party: { line: 'All four elements. Jan 9.', stars: ['sagittarius', 'aquarius', 'pisces', 'taurus'] },
  },

  // ─────────────────────────────── hst120 · Your sun sign is a sky address ───────────────────────────────
  hst120: {
    id: 'hst120', duration: 48, key: 'D', open: 'street', openText: 'KUYKENDAHL', qAccent: '#ff8fb1', tint: '#d05a8a',
    hook: 'Your sun sign | is a *sky address*',
    teacher: star('aries', { pitch: 600 }), student: star('libra', { pitch: 680 }),
    boardTitle: 'SUN SIGN',
    beats: [
      { lines: [
          ['student', 'what *is* a sun sign, actually?'],
          ['teacher', "the Sun seems to circle our sky each year.", { tag: TR, point: [400, 230] }],
          ['teacher', 'that yearly path is the *ecliptic*.', { point: [400, 100] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          x.save(); x.strokeStyle = EX.chalk; x.lineWidth = 5; x.globalAlpha *= clamp(prog(t, a, a + 0.6)); x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 230, 320, 150, 0, 0, Math.PI * 2); x.stroke(); x.restore()
          disc(x, B.x0 + 400, B.y0 + 230, 26, BL, clamp(prog(t, a + 0.2, a + 0.5)))
          const u = (t - a) * 0.9
          disc(x, B.x0 + 400 + Math.cos(u) * 320, B.y0 + 230 + Math.sin(u) * 150, 24, Y, clamp(prog(t, a + 0.5, a + 0.8)))
        },
        chalk: [{ dt: 0.4, line: 2, text: '*ECLIPTIC*', x: 400, y: 40, size: 36, align: 'center' }, { dt: 0.8, line: 1, text: 'EARTH', x: 400, y: 290, size: 26, align: 'center', color: BL }],
      },
      { lines: [
          ['teacher', 'it moves into a new sign about *once a month*.', { tag: TR, point: [400, 200] }],
          ['teacher', 'your sign = where it was on your *birthday*.', { point: [400, 260] }],
          ['teacher', 'astrologers read it as your *core self*.', { tag: at2(TA, 80), point: [400, 330] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 250, r: 160, at: b.at + 0.1, dur: 0.7, width: 5 })
          for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; chalkLine(x, t, { pts: [P(B, 400, 250), P(B, 400 + Math.cos(a) * 160, 250 + Math.sin(a) * 160)], at: b.at + 0.7 + i * 0.05, dur: 0.12, width: 3 }) }
          const k = Math.floor(clamp(prog(t, b.lines[0].t + 0.5, b.lines[1].t)) * 6) + 1
          const a = (k + 0.5) * Math.PI / 6
          disc(x, B.x0 + 400 + Math.cos(a) * 110, B.y0 + 250 + Math.sin(a) * 110, 18, Y, clamp(prog(t, b.lines[0].t, b.lines[0].t + 0.3)))
        },
        chalk: [{ dt: 0.6, line: 1, text: '*YOU*', x: 690, y: 420, size: 34, align: 'center' }],
      },
      { lines: [
          ['teacher', "like an address. Katy *still* says Houston.", { tag: TH, point: [300, 200] }],
          ['teacher', "but an address isn't the *whole house*.", { point: [500, 250] }],
          ['teacher', 'get to know the *whole person*. rooms too.', { tag: at2(TT, 80), point: [500, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 280, 400), P(B, 280, 230), P(B, 400, 130), P(B, 520, 230), P(B, 520, 400), P(B, 280, 400)], at: b.lines[1].t + 0.2, dur: 0.8, width: 5 })
          chalkLine(x, t, { pts: [P(B, 370, 400), P(B, 370, 320), P(B, 430, 320), P(B, 430, 400)], at: b.lines[1].t + 1.0, dur: 0.4, width: 4, color: Y })
          for (let i = 0; i < 2; i++) chalkLine(x, t, { pts: [P(B, 300 + i * 150, 260), P(B, 350 + i * 150, 260), P(B, 350 + i * 150, 300), P(B, 300 + i * 150, 300), P(B, 300 + i * 150, 260)], at: b.lines[2].t + 0.3 + i * 0.3, dur: 0.4, width: 4, color: PK })
        },
        chalk: [{ dt: 0.5, line: 0, text: 'KATY, *HOUSTON* TX', x: 40, y: 80, size: 30 }],
      },
    ],
    bulb: 'so my sign is my *zip code*, not my house.',
    items: ['Sun path = the *ecliptic*', 'New sign about *monthly*', 'Know the *whole* person'],
    last: 'An address. *Not* the whole house.', lastWho: 'teacher',
    party: { line: 'Every zip code welcome. Jan 9.', stars: ['aries', 'libra', 'pisces', 'virgo'] },
  },

  // ─────────────────────────────── hst121 · An eclipse at your crawfish boil? ───────────────────────────────
  hst121: {
    id: 'hst121', duration: 52, key: 'F', open: 'food', qAccent: '#ff6b5a', tint: '#d0503a',
    hook: 'An eclipse at | *your* crawfish boil?',
    teacher: star('leo', { pitch: 520, prop: 'crown' }), student: star('scorpio', { pitch: 640 }),
    boardTitle: 'ECLIPSES',
    beats: [
      { lines: [
          ['student', 'the Sun went dim over the *crawfish*. why?'],
          ['teacher', 'solar eclipse: the Moon slides *between* us.', { tag: TR, point: [400, 230] }],
          ['teacher', 'Sun, Moon, Earth, in a *line*. lights out.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          chalkCircle(x, t, { x: B.x0 + 120, y: B.y0 + 230, r: 80, at: a, dur: 0.6, color: Y })
          chalkCircle(x, t, { x: B.x0 + 660, y: B.y0 + 230, r: 50, at: a + 0.3, dur: 0.5, color: BL })
          const u = ease.inOutCubic(clamp(prog(t, a + 0.8, a + 2.2)))
          disc(x, B.x0 + 400, B.y0 + lerp(60, 230, u), 22, EX.chalk, clamp(prog(t, a + 0.7, a + 0.9)))
          if (u >= 1) chalkLine(x, t, { pts: [P(B, 420, 230), P(B, 620, 230)], at: a + 2.2, dur: 0.4, width: 4, dash: [10, 10] })
        },
        chalk: [{ dt: 0.5, line: 1, text: 'SUN', x: 120, y: 360, size: 30, align: 'center' }, { dt: 0.9, line: 1, text: 'EARTH', x: 660, y: 330, size: 30, align: 'center', color: BL }, { dt: 1.2, line: 2, text: '*MOON*', x: 400, y: 300, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', "lunar eclipse: Earth's *shadow* hits the Moon.", { tag: TR, point: [500, 230] }],
          ['teacher', 'the Moon can even glow *red*.', { point: [600, 230] }],
          ['teacher', "and *never* look at the Sun without eclipse glasses.", { tag: at2(TR, 80), point: [200, 230] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 120, y: B.y0 + 230, r: 60, at: b.at + 0.1, dur: 0.5, color: Y })
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r: 50, at: b.at + 0.3, dur: 0.5, color: BL })
          chalkLine(x, t, { pts: [P(B, 450, 190), P(B, 700, 215), P(B, 700, 245), P(B, 450, 270)], at: b.lines[0].t + 0.5, dur: 0.6, width: 4, dash: [10, 10] })
          disc(x, B.x0 + 660, B.y0 + 230, 26, '#ff6b5a', clamp(prog(t, b.lines[1].t + 0.2, b.lines[1].t + 0.8)))
        },
        chalk: [{ dt: 0.7, line: 0, text: '*SHADOW*', x: 560, y: 160, size: 28, align: 'center' }, { dt: 0.6, line: 2, text: 'GLASSES *ON*', x: 120, y: 360, size: 28, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read eclipses as *turning points*.', { tag: TA, point: [400, 200] }],
          ['teacher', "big change coming? don't carry it *alone*.", { tag: at2(TT, 80), point: [400, 300] }],
          ['teacher', 'tell your people. like a boil: *share*.', { tag: at2(TH, 146), point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 60, 330), P(B, 300, 330), P(B, 380, 220), P(B, 500, 220)], at: b.lines[0].t + 0.3, dur: 0.7, width: 5, arrow: true })
          chalkCircle(x, t, { x: B.x0 + 600, y: B.y0 + 360, r: 90, at: b.lines[2].t + 0.2, dur: 0.6, color: OR, from: 0, sweep: Math.PI })
          chalkLine(x, t, { pts: [P(B, 510, 360), P(B, 690, 360)], at: b.lines[2].t + 0.7, dur: 0.3, color: OR, width: 5 })
          for (let i = 0; i < 5; i++) chalkCircle(x, t, { x: B.x0 + 545 + i * 28, y: B.y0 + 345, r: 10, at: b.lines[2].t + 0.9 + i * 0.08, dur: 0.15, color: '#ff6b5a', width: 3 })
        },
      },
    ],
    bulb: 'so the Moon *ghosted* the Sun. briefly.',
    items: ['Solar: the Moon *blocks* the Sun', "Lunar: Earth's *shadow*", 'Always use *eclipse glasses*'],
    last: 'Shadows pass. *Share the boil.*', lastWho: 'teacher',
    party: { line: 'Crawfish season, beta season: Jan 9.', stars: ['leo', 'scorpio', 'pisces', 'cancer'] },
  },

  // ─────────────────────────────── hst122 · You measure distance in minutes. So do stars. ───────────────────────────────
  hst122: {
    id: 'hst122', duration: 50, key: 'Ab', open: 'loop', openText: '45', qAccent: '#9fd8ff', tint: '#3a7ab0',
    hook: '*You* measure distance | in minutes. So do stars.',
    teacher: star('pisces', { pitch: 660 }), student: star('capricorn', { pitch: 420, prop: 'whistle' }),
    boardTitle: 'LIGHT TIME',
    beats: [
      { lines: [
          ['student', "how far is it? and don't say '*20 minutes*'."],
          ['teacher', 'in Houston, distance is in *minutes*.', { tag: TH, point: [400, 200] }],
          ['teacher', '"20 minutes *without traffic*." so, forty.', { point: [400, 260] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r: 130, at: b.lines[1].t + 0.2, dur: 0.6, width: 5 })
          const h = (t - b.lines[1].t) * 3
          if (t > b.lines[1].t + 0.8) { x.save(); x.strokeStyle = Y; x.lineWidth = 6; x.beginPath(); x.moveTo(B.x0 + 400, B.y0 + 230); x.lineTo(B.x0 + 400 + Math.cos(h - Math.PI / 2) * 100, B.y0 + 230 + Math.sin(h - Math.PI / 2) * 100); x.stroke(); x.restore() }
        },
        chalk: [{ dt: 0.5, line: 2, text: '20 → *40*', x: 680, y: 400, size: 36, align: 'center' }],
      },
      { lines: [
          ['teacher', 'sunlight takes about *8 minutes* to reach us.', { tag: TR, point: [400, 230] }],
          ['teacher', 'so you see the Sun as it was *8 min ago*.', { point: [600, 230] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.at + 0.1, cx: 110, cy: 230, r: 50 })
          chalkCircle(x, t, { x: B.x0 + 700, y: B.y0 + 230, r: 36, at: b.at + 0.4, dur: 0.4, color: BL })
          const u = (t - b.lines[0].t) * 0.6 % 1
          if (t > b.lines[0].t) for (let i = 0; i < 3; i++) { const v = (u + i / 3) % 1; disc(x, B.x0 + lerp(190, 650, v), B.y0 + 230, 8, Y, 1) }
        },
        chalk: [{ dt: 0.6, line: 0, text: '~*8 MIN*', x: 420, y: 160, size: 36, align: 'center' }],
      },
      { lines: [
          ['teacher', 'light from other stars takes *years*.', { tag: TR, point: [400, 200] }],
          ['student', 'so the whole sky is… *running late?*'],
          ['teacher', 'date tip: share your *real* ETA. kindly.', { tag: TT, point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          for (let i = 0; i < 7; i++) chalkStar(x, t, B, { at: b.at + 0.2 + i * 0.1, cx: 80 + i * 105, cy: 120 + (i % 2) * 60, r: 16 + (i % 3) * 5 })
          chalkHeart(x, t, B, { at: b.lines[2].t + 0.4, cx: 400, cy: 330, s: 40 })
        },
        chalk: [{ dt: 0.5, line: 0, text: 'OLD *LIGHT*', x: 400, y: 260, size: 34, align: 'center' }],
      },
    ],
    bulb: "so the Sun's *8 minutes late*. like me.",
    items: ['Sunlight: about *8 minutes*', 'Starlight is *old* light', 'Share your *real* ETA'],
    last: 'Running late? *Just text.*', lastWho: 'teacher',
    party: { line: 'Leave early for Jan 9.', stars: ['pisces', 'capricorn', 'leo', 'gemini'] },
  },

  // ─────────────────────────────── hst123 · Full moon tonight? Your group chat knows. ───────────────────────────────
  hst123: {
    id: 'hst123', duration: 48, key: 'E', open: 'skyline', qAccent: '#f2c75c', tint: '#6a3ab0',
    hook: 'Full moon tonight? | *Your* group chat knows.',
    teacher: star('scorpio', { pitch: 380 }), student: star('aries', { pitch: 760 }),
    boardTitle: 'FULL MOON',
    beats: [
      { lines: [
          ['student', 'why is everyone posting the *Moon* tonight?'],
          ['teacher', "it's full: the Moon sits *opposite* the Sun.", { tag: TR, point: [600, 230] }],
          ['teacher', 'so its whole *lit side* faces us.', { point: [600, 230] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.lines[1].t, cx: 90, cy: 230, r: 40 })
          chalkCircle(x, t, { x: B.x0 + 380, y: B.y0 + 230, r: 40, at: b.lines[1].t + 0.3, dur: 0.4, color: BL })
          disc(x, B.x0 + 650, B.y0 + 230, 44, Y, clamp(prog(t, b.lines[1].t + 0.6, b.lines[1].t + 1.0)))
          chalkArrow(x, t, B, [150, 230], [320, 230], b.lines[2].t + 0.2)
        },
        chalk: [{ dt: 0.6, line: 2, text: '*FULL*', x: 650, y: 330, size: 34, align: 'center' }],
      },
      { lines: [
          ['teacher', 'that happens about *once a month*.', { tag: TR, point: [400, 230] }],
          ['teacher', 'and *everyone* posts it over the skyline.', { tag: at2(TH, 80), point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          ;[0, 0.25, 0.5, 0.75, 1].forEach((k, i) => chalkMoon(x, t, B, { at: b.at + 0.2 + i * 0.25, cx: 120 + i * 140, cy: 140, r: 34, k }))
          chalkSkyline(x, t, B, { at: b.lines[1].t + 0.2, base: 420, x0: 140, x1: 660 })
        },
      },
      { lines: [
          ['teacher', 'astrologers read full moons as *peaks*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'feelings up. the group chat? *up*.', { point: [400, 260] }],
          ['teacher', 'big feelings? *sleep* on the text.', { tag: at2(TT, 80), point: [500, 320] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 40, 380), P(B, 200, 340), P(B, 400, 140), P(B, 600, 340), P(B, 760, 380)], at: b.lines[0].t + 0.3, dur: 0.8, width: 5 })
          chalkMoon(x, t, B, { at: b.lines[0].t + 1.0, cx: 400, cy: 100, r: 30, k: 1, color: Y })
          for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [P(B, 560 + i * 50, 250), P(B, 590 + i * 50, 250), P(B, 560 + i * 50, 290), P(B, 590 + i * 50, 290)], at: b.lines[2].t + 0.4 + i * 0.2, dur: 0.3, width: 4, color: BL })
        },
        chalk: [{ dt: 0.5, line: 0, text: '*PEAK*', x: 400, y: 200, size: 30, align: 'center' }],
      },
    ],
    bulb: "so i *don't* send the 2am paragraph. got it.",
    items: ['Full Moon: *opposite* the Sun', 'About *once a month*', 'Big feelings? *Sleep on it*'],
    last: 'Post the Moon. *Not the paragraph.*', lastWho: 'teacher',
    party: { line: 'Bring the feelings to Jan 9.', stars: ['scorpio', 'aries', 'pisces', 'libra'] },
  },

  // ─────────────────────────────── hst124 · When two planets "meet" over your skyline ───────────────────────────────
  hst124: {
    id: 'hst124', duration: 50, key: 'G', open: 'bayou', qAccent: '#c9a6ff', tint: '#7a4ac0',
    hook: "When two planets 'meet' | over *your* skyline",
    teacher: star('libra', { pitch: 560 }), student: star('capricorn', { pitch: 420 }),
    boardTitle: 'CONJUNCTION',
    beats: [
      { lines: [
          ['student', 'two planets looked *glued* together. dating?'],
          ['teacher', "that's a *conjunction*: they look close…", { tag: TR, point: [400, 140] }],
          ['teacher', "but in space they're *really* far apart.", { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          disc(x, B.x0 + 390, B.y0 + 120, 16, Y, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.3)))
          disc(x, B.x0 + 420, B.y0 + 128, 12, PK, clamp(prog(t, b.lines[1].t + 0.1, b.lines[1].t + 0.4)))
          const a = b.lines[2].t
          disc(x, B.x0 + 80, B.y0 + 380, 16, BL, clamp(prog(t, a, a + 0.3)))
          chalkLine(x, t, { pts: [P(B, 90, 370), P(B, 760, 230)], at: a + 0.2, dur: 0.6, width: 3, dash: [10, 10] })
          disc(x, B.x0 + 330, B.y0 + 320, 14, PK, clamp(prog(t, a + 0.6, a + 0.9)))
          disc(x, B.x0 + 720, B.y0 + 240, 20, Y, clamp(prog(t, a + 0.8, a + 1.1)))
        },
        chalk: [{ dt: 0.5, line: 2, text: 'YOU', x: 80, y: 430, size: 26, align: 'center', color: BL }, { dt: 1.0, line: 2, text: '*FAR*', x: 530, y: 330, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read it as two energies *blending*.', { tag: TA, point: [400, 200] }],
          ['teacher', 'like the HOV lane: two folks, *one lane*.', { tag: at2(TH, 80), point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 280), P(B, 780, 280)], at: b.lines[1].t + 0.1, dur: 0.5, width: 5 })
          chalkLine(x, t, { pts: [P(B, 20, 380), P(B, 780, 380)], at: b.lines[1].t + 0.3, dur: 0.5, width: 5 })
          const u = (t - b.lines[1].t) * 0.25 % 1
          disc(x, B.x0 + lerp(60, 740, u), B.y0 + 330, 16, Y, clamp(prog(t, b.lines[1].t + 0.5, b.lines[1].t + 0.8)))
          disc(x, B.x0 + lerp(60, 740, u) + 40, B.y0 + 330, 16, PK, clamp(prog(t, b.lines[1].t + 0.5, b.lines[1].t + 0.8)))
          chalkCircle(x, t, { x: B.x0 + 200, y: B.y0 + 150, r: 50, at: b.lines[0].t + 0.4, dur: 0.5, color: Y })
          chalkCircle(x, t, { x: B.x0 + 260, y: B.y0 + 150, r: 50, at: b.lines[0].t + 0.6, dur: 0.5, color: PK })
        },
      },
      { lines: [
          ['teacher', "looking close isn't *being* close.", { tag: TT, point: [400, 200] }],
          ['teacher', 'close the gap the real way: *talk*.', { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 150, 260), P(B, 300, 260)], at: b.at + 0.2, dur: 0.3, width: 5, color: Y })
          chalkLine(x, t, { pts: [P(B, 500, 260), P(B, 650, 260)], at: b.at + 0.4, dur: 0.3, width: 5, color: PK })
          chalkLine(x, t, { pts: [P(B, 300, 260), P(B, 500, 260)], at: b.lines[1].t + 0.5, dur: 0.6, width: 5, color: MN, dash: [14, 10] })
          chalkHeart(x, t, B, { at: b.lines[1].t + 1.2, cx: 400, cy: 170, s: 36 })
        },
      },
    ],
    bulb: 'so we need *more* than a cute photo. noted.',
    items: ['Conjunction: they *look* close', 'Astrology: energies *blend*', 'Close the gap: *talk*'],
    last: 'Looking close. *Getting close.*', lastWho: 'teacher',
    party: { line: 'Meet up for real: Jan 9.', stars: ['libra', 'capricorn', 'pisces', 'scorpio'] },
  },

  // ─────────────────────────────── hst125 · Is your sign wrong? ───────────────────────────────
  hst125: {
    id: 'hst125', duration: 52, key: 'B', open: 'sky', qAccent: '#7dffb0', tint: '#2a5a8a',
    hook: 'Is *your* sign wrong? | A Houston explainer.',
    teacher: star('virgo', { pitch: 470, prop: 'clipboard' }), student: star('aquarius', { pitch: 700 }),
    boardTitle: 'THE 13TH?',
    beats: [
      { lines: [
          ['student', 'my cousin in Katy said my sign is *fake*.'],
          ['teacher', 'the real constellations are *different sizes*.', { tag: TR, point: [400, 200] }],
          ['teacher', 'and a 13th, *Ophiuchus*, crosses the Sun\'s path.', { point: [520, 200] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 230), P(B, 780, 230)], at: b.lines[1].t, dur: 0.6, width: 5, arrow: true })
          const W = [[30, 90], [130, 160], [300, 60], [370, 120], [500, 80], [590, 170]]
          W.forEach(([x0, w], i) => chalkLine(x, t, { pts: [P(B, x0, 200), P(B, x0 + w, 200), P(B, x0 + w, 260), P(B, x0, 260), P(B, x0, 200)], at: b.lines[1].t + 0.6 + i * 0.12, dur: 0.25, width: 3, color: i === 4 ? Y : EX.chalk }))
        },
        chalk: [{ dt: 0.6, line: 2, text: '*OPHIUCHUS*', x: 540, y: 330, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', "Earth's axis *wobbles* slowly, too.", { tag: TR, point: [400, 230] }],
          ['teacher', 'one wobble takes about *26,000 years*.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          disc(x, B.x0 + 400, B.y0 + 250, 60, BL, clamp(prog(t, b.at, b.at + 0.3)))
          const a = (t - b.at) * 1.2
          const tx = Math.cos(a) * 60, ty = Math.sin(a) * 18
          if (t > b.at + 0.4) { x.save(); x.strokeStyle = Y; x.lineWidth = 6; x.beginPath(); x.moveTo(B.x0 + 400 - tx * 0.4, B.y0 + 330); x.lineTo(B.x0 + 400 + tx, B.y0 + 110 + ty); x.stroke(); x.restore() }
          x.save(); x.strokeStyle = EX.chalk; x.lineWidth = 3; x.setLineDash([8, 8]); x.globalAlpha *= clamp(prog(t, b.at + 0.6, b.at + 1)); x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 110, 60, 18, 0, 0, Math.PI * 2); x.stroke(); x.restore()
        },
        chalk: [{ dt: 0.6, line: 1, text: '*26,000* YRS', x: 650, y: 400, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', 'Western astrology ties signs to *seasons*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'Aries starts at the *March equinox*. always.', { point: [300, 260] }],
          ['teacher', 'and no sign is a *verdict* on your love life.', { tag: at2(TT, 80), point: [500, 320] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 230, y: B.y0 + 250, r: 130, at: b.at + 0.2, dur: 0.7, width: 5 })
          chalkLine(x, t, { pts: [P(B, 100, 250), P(B, 360, 250)], at: b.at + 0.8, dur: 0.3, width: 3 })
          chalkLine(x, t, { pts: [P(B, 230, 120), P(B, 230, 380)], at: b.at + 1.0, dur: 0.3, width: 3 })
          chalkCheck(x, t, B, { at: b.lines[1].t + 0.8, cx: 360, cy: 250 })
          chalkHeart(x, t, B, { at: b.lines[2].t + 0.5, cx: 600, cy: 300, s: 40 })
        },
        chalk: [{ dt: 0.5, line: 1, text: 'MARCH: *ARIES*', x: 400, y: 160, size: 30 }],
      },
    ],
    bulb: 'so my sign is *fine*. my cousin is dramatic.',
    items: ['A *13th* constellation exists', "Earth's axis *wobbles*", 'Astrology follows *seasons*'],
    last: 'Your sign stayed. *The sky moved.*', lastWho: 'teacher',
    party: { line: 'All 12 (and Ophiuchus) on Jan 9.', stars: ['virgo', 'aquarius', 'pisces', 'aries'] },
  },

  // ─────────────────────────────── hst126 · Late 20s in Houston? Your Saturn return. ───────────────────────────────
  hst126: {
    id: 'hst126', duration: 52, key: 'Eb', open: 'street', openText: 'HEIGHTS BLVD', qAccent: '#f2c75c', tint: '#8a6a3a',
    hook: 'Late 20s in Houston? | *Your* Saturn return.',
    teacher: star('capricorn', { pitch: 400, glasses: true }), student: star('sagittarius', { pitch: 720 }),
    boardTitle: 'SATURN RETURN',
    beats: [
      { lines: [
          ['student', 'i just bought a *porch swing*. am i okay?'],
          ['teacher', 'Saturn takes about *29 years* to circle the Sun.', { tag: TR, point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.lines[1].t, cx: 400, cy: 240, r: 30 })
          x.save(); x.strokeStyle = EX.chalk; x.lineWidth = 4; x.globalAlpha *= clamp(prog(t, b.lines[1].t + 0.3, b.lines[1].t + 0.8)); x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 240, 330, 160, 0, 0, Math.PI * 2); x.stroke(); x.restore()
          const a = (t - b.lines[1].t) * 0.35 - 2
          const sx = B.x0 + 400 + Math.cos(a) * 330, sy = B.y0 + 240 + Math.sin(a) * 160
          disc(x, sx, sy, 22, Y, clamp(prog(t, b.lines[1].t + 0.6, b.lines[1].t + 0.9)))
          if (t > b.lines[1].t + 0.9) { x.save(); x.strokeStyle = Y; x.lineWidth = 4; x.beginPath(); x.ellipse(sx, sy, 40, 10, -0.3, 0, Math.PI * 2); x.stroke(); x.restore() }
        },
        chalk: [{ dt: 0.8, line: 1, text: '~*29* YEARS', x: 400, y: 440, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers call its return your *Saturn return*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'they read it as a *growing-up* era.', { point: [400, 260] }],
          ['teacher', 'Heights edition: porch, plants, *dog in a bandana*.', { tag: at2(TH, 80), point: [600, 320] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[2].t
          chalkLine(x, t, { pts: [P(B, 440, 400), P(B, 440, 260), P(B, 580, 170), P(B, 720, 260), P(B, 720, 400), P(B, 440, 400)], at: a + 0.2, dur: 0.8, width: 5 })
          chalkLine(x, t, { pts: [P(B, 420, 330), P(B, 740, 330)], at: a + 1.0, dur: 0.3, width: 4, color: Y })
          chalkCircle(x, t, { x: B.x0 + 760, y: B.y0 + 380, r: 22, at: a + 1.3, dur: 0.3, color: PK })
        },
        chalk: [{ dt: 0.4, line: 0, text: 'AGE ~*29*', x: 40, y: 120, size: 38 }, { dt: 0.4, line: 1, text: 'grow *up*', x: 40, y: 200, size: 34 }],
      },
      { lines: [
          ['teacher', 'big life choices? talk them *through*.', { tag: TT, point: [400, 200] }],
          ['teacher', 'with someone who wants you to *grow*.', { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 400, 400), P(B, 400, 220)], at: b.at + 0.2, dur: 0.5, color: MN, width: 6 })
          chalkLine(x, t, { pts: [P(B, 400, 300), P(B, 330, 240)], at: b.at + 0.7, dur: 0.3, color: MN, width: 5 })
          chalkLine(x, t, { pts: [P(B, 400, 260), P(B, 470, 200)], at: b.at + 0.9, dur: 0.3, color: MN, width: 5 })
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.4, cx: 400, cy: 160, s: 34 })
        },
      },
    ],
    bulb: 'so the porch swing is *character growth*.',
    items: ['Saturn: about *29 years* around', 'Astrology: a *growing-up* era', 'Talk big choices *through*'],
    last: 'Grow up. *Keep the swing.*', lastWho: 'teacher',
    party: { line: 'Grown-up plans: Jan 9.', stars: ['capricorn', 'sagittarius', 'pisces', 'taurus'] },
  },

  // ─────────────────────────────── hst127 · Lost on 290? Your sky has a compass. ───────────────────────────────
  hst127: {
    id: 'hst127', duration: 50, key: 'A', open: 'loop', openText: '290', qAccent: '#8fe3ff', tint: '#2a7a8a',
    hook: 'Lost on 290? | *Your* sky has a compass.',
    teacher: star('aquarius', { pitch: 600 }), student: star('taurus', { pitch: 430 }),
    boardTitle: 'NORTH STAR',
    beats: [
      { lines: [
          ['student', "i've been on 290 since *lunch*. where's north?"],
          ['teacher', 'find the *Big Dipper*, part of the Great Bear.', { tag: TR, point: [300, 200] }],
        ],
        draw(x, t, B, b) {
          const D = [[120, 300], [250, 290], [320, 230], [410, 210], [500, 160], [560, 230], [480, 270]]
          D.forEach(([sx, sy], i) => chalkStar(x, t, B, { at: b.lines[1].t + 0.2 + i * 0.12, cx: sx, cy: sy, r: 16 }))
          chalkLine(x, t, { pts: D.slice(0, 5).concat([[560, 230], [480, 270], [410, 210]]).map(([a, c]) => P(B, a, c)), at: b.lines[1].t + 1.1, dur: 0.9, width: 3 })
        },
        chalk: [{ dt: 0.6, line: 1, text: '*BIG DIPPER*', x: 120, y: 400, size: 32 }],
      },
      { lines: [
          ['teacher', 'the two stars at the cup\'s end point to *Polaris*.', { tag: TR, point: [600, 100] }],
          ['teacher', 'it stays nearly *still* while the sky turns.', { point: [650, 80] }],
        ],
        draw(x, t, B, b) {
          ;[[500, 300], [560, 370]].forEach(([sx, sy], i) => chalkStar(x, t, B, { at: b.at + 0.1 + i * 0.1, cx: sx, cy: sy, r: 16 }))
          chalkLine(x, t, { pts: [P(B, 560, 370), P(B, 500, 300), P(B, 640, 100)], at: b.lines[0].t + 0.5, dur: 0.7, width: 4, dash: [12, 10], color: Y })
          chalkStar(x, t, B, { at: b.lines[0].t + 1.1, cx: 650, cy: 80, r: 26, color: MN })
          const a = (t - b.lines[1].t) * 0.8
          if (t > b.lines[1].t) for (let i = 0; i < 4; i++) disc(x, B.x0 + 650 + Math.cos(a + i * 1.57) * 110, B.y0 + 80 + Math.sin(a + i * 1.57) * 60, 6, EX.chalk, 0.8)
        },
        chalk: [{ dt: 0.6, line: 0, text: '*POLARIS*', x: 520, y: 150, size: 30, align: 'right' }, { dt: 0.4, line: 1, text: '= NORTH', x: 700, y: 180, size: 28, align: 'center' }],
      },
      { lines: [
          ['teacher', '290 runs out *northwest*. so, that-ish way.', { tag: TH, point: [300, 250] }],
          ['teacher', 'be someone\'s north star: *steady*. show up.', { tag: at2(TT, 80), point: [500, 300] }],
          ['student', 'steady? i\'ve been steady on 290 for *hours*.'],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 400, 400), P(B, 400, 100)], at: b.at + 0.1, dur: 0.4, width: 5 })
          chalkLine(x, t, { pts: [P(B, 250, 250), P(B, 550, 250)], at: b.at + 0.3, dur: 0.4, width: 5 })
          chalkLine(x, t, { pts: [P(B, 400, 250), P(B, 250, 130)], at: b.lines[0].t + 0.6, dur: 0.4, width: 6, color: Y, arrow: true })
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.5, cx: 640, cy: 330, s: 34 })
        },
        chalk: [{ dt: 0.3, line: 0, text: 'N', x: 400, y: 70, size: 34, align: 'center' }, { dt: 0.9, line: 0, text: '*290*', x: 220, y: 110, size: 30, align: 'center' }],
      },
    ],
    bulb: 'so the North Star is the *one constant*. like me.',
    items: ['Big Dipper points to *Polaris*', 'Polaris barely *moves*', 'Be *steady*. Show up.'],
    last: 'Find north. *Then show up.*', lastWho: 'teacher',
    party: { line: 'Head toward Jan 9.', stars: ['aquarius', 'taurus', 'pisces', 'leo'] },
  },
}
