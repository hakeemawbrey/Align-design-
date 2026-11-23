// Houston Star Talk Explains (farm worker w05, hst111–hst118). Engine: ./w05kit.js. FARM: promo/posting/htx/FARM.md.
// Each episode: a Houston question (the HOOK, frame 0, over a Houston window) → the board (✓ / ✦ / ♥ / ★ HOUSTON LORE tags)
// → the lightbulb → THE SHORT VERSION → the last line → the Jan 9 party ticket. Pisces cries (the classmate) every time.
import { signStar } from '../startalk.js'
import { auntie, drawClipboard, drawWhistle, drawCrown } from '../stmeetfriends2/scenes/props.js'
import { clamp, prog, lerp, ease } from '../../src/lib.js'
import { chalkLine, chalkCircle, EX, disc, chalkSkyline, chalkRing, chalkStar, chalkSun, chalkHeart, chalkThermo, chalkArrow, chalkX, chalkCheck, chalkLoopPath, chalkMoon } from './w05kit.js'

const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
/** a cast member: the sign's star (optionally an Auntie in reading glasses, or holding a prop) */
export function star(id, { pitch = 520, glasses = false, prop = null } = {}) {
  const s = signStar(id)
  const c = { tag: `${s.glyph} ${NAMES[id]}`, color: s.color, glyph: s.glyph, pitch }
  if (glasses) c.draw = (ctx, X, Y, size, t, o) => auntie(ctx, X, Y, size, t, { color: s.color, glyph: s.glyph, ...o, glasses: { frame: '#7a1f3d' } })
  if (prop === 'clipboard') c.prop = (ctx, r, t) => drawClipboard(ctx, r.x + r.size * 0.42, r.y + r.size * 0.1, Math.max(4, Math.round(r.size / 40)), { rot: 0.15 + 0.05 * Math.sin(t * 2) })
  if (prop === 'whistle') c.prop = (ctx, r, t) => drawWhistle(ctx, r.x - r.size * 0.42, r.y + r.size * 0.05, Math.max(4, Math.round(r.size / 44)))
  if (prop === 'crown') c.prop = (ctx, r, t) => drawCrown(ctx, r.x - r.size * 0.05, r.top + r.size * 0.02, Math.max(4, Math.round(r.size / 40)))
  return c
}
const TR = { kind: 'sky', dx: 800, dy: 14, align: 'right' }
const TA = { kind: 'astro', dx: 800, dy: 14, align: 'right' }
const TT = { kind: 'tip', dx: 800, dy: 14, align: 'right' }
const TH = { kind: 'hou', dx: 800, dy: 14, align: 'right' }
export const TAGS = { TR, TA, TT, TH }
const Y = EX.chalkYellow, PK = '#ff8fb1', MN = '#7dffb0', BL = '#8fe3ff'
const P = (B, x, y) => [B.x0 + x, B.y0 + y]

export const W05A = {
  // ─────────────────────────────── hst111 · Why can't you see stars in Houston? ───────────────────────────────
  hst111: {
    id: 'hst111', duration: 50, key: 'D', open: 'skyline', qAccent: '#ffd36b',
    hook: "Why can't *you* see | stars in Houston?",
    teacher: star('virgo', { pitch: 470, prop: 'clipboard' }), student: star('leo', { pitch: 700 }),
    boardTitle: 'CITY GLOW',
    beats: [
      { lines: [
          ['student', "why can't i see *stars* in Houston?"],
          ['teacher', 'city lights glow up into the *air*.', { tag: TR, point: [400, 260] }],
          ['teacher', 'that glow *drowns out* the faint stars.', { point: [400, 120] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          chalkSkyline(x, t, B, { at: a - 0.2, base: 420, x0: 120, x1: 680 })
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 420, r: 300, at: a + 0.6, dur: 0.8, color: Y, from: Math.PI, sweep: Math.PI, width: 5 })
          const S = [[110, 120], [250, 80], [560, 90], [690, 140], [400, 70]]
          S.forEach(([sx, sy], i) => chalkStar(x, t, B, { at: b.at + 0.2 + i * 0.1, cx: sx, cy: sy, r: 20 }))
          S.forEach(([sx, sy], i) => chalkX(x, t, B, { at: b.lines[2].t + 0.4 + i * 0.15, cx: sx, cy: sy, s: 22 }))
        },
        chalk: [{ dt: 0.9, line: 1, text: '*GLOW*', x: 400, y: 175, size: 40, align: 'center' }],
      },
      { lines: [
          ['teacher', 'the bright dots you *do* see?', { point: [560, 150] }],
          ['teacher', 'often *planets*, like Venus or Jupiter.', { tag: TR, point: [560, 150] }],
          ['student', "so i've been wishing on a *planet?*"],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 30, 360), P(B, 770, 360)], at: b.at + 0.1, dur: 0.6, width: 5 })
          const k = clamp(prog(t, b.lines[0].t + 0.3, b.lines[0].t + 0.6)), tw = 1 + 0.08 * Math.sin(t * 6)
          disc(x, B.x0 + 560, B.y0 + 150, 26 * tw, Y, k)
          disc(x, B.x0 + 260, B.y0 + 210, 18 * tw, BL, clamp(prog(t, b.lines[1].t + 0.5, b.lines[1].t + 0.8)))
        },
        chalk: [{ dt: 0.4, line: 1, text: 'VENUS?', x: 560, y: 230, size: 34, align: 'center' }, { dt: 1.0, line: 1, text: 'JUPITER?', x: 260, y: 290, size: 34, align: 'center' }],
      },
      { lines: [
          ['teacher', 'hazy, humid air *dims* them a bit more.', { tag: TR, point: [200, 200] }],
          ['teacher', 'drive away from the lights. the sky *fills*.', { point: [600, 200] }],
          ['teacher', 'plan that drive *together*. great date.', { tag: TT, point: [600, 300] }],
        ],
        draw(x, t, B, b) {
          chalkSkyline(x, t, B, { at: b.at + 0.1, base: 400, x0: 30, x1: 300, dur: 0.7 })
          chalkStar(x, t, B, { at: b.at + 0.5, cx: 160, cy: 150, r: 16 })
          chalkArrow(x, t, B, [330, 300], [460, 300], b.lines[1].t + 0.2)
          for (let i = 0; i < 12; i++) chalkStar(x, t, B, { at: b.lines[1].t + 0.6 + i * 0.08, cx: 500 + (i * 83) % 270, cy: 100 + (i * 57) % 230, r: 12 + (i % 3) * 5 })
          if (t > b.lines[2].t) chalkHeart(x, t, B, { at: b.lines[2].t + 0.3, cx: 640, cy: 380, s: 34 })
        },
        chalk: [{ dt: 0.4, line: 0, text: 'CITY', x: 160, y: 430, size: 30, align: 'center' }, { dt: 0.4, line: 1, text: '*DARK SKY*', x: 640, y: 430, size: 30, align: 'center' }],
      },
    ],
    bulb: "so the stars are there. we're just *too bright.*",
    items: ['City glow *hides* faint stars', 'Bright dots: often *planets*', 'A dark-sky drive is a *date*'],
    last: 'Dim the city. *See more.*', lastWho: 'teacher',
    party: { line: 'Come shine on Jan 9.', stars: ['virgo', 'leo', 'pisces', 'gemini'] },
  },

  // ─────────────────────────────── hst112 · Mercury retrograde vs your 610 ───────────────────────────────
  hst112: {
    id: 'hst112', duration: 50, key: 'A', open: 'loop', openText: '610', qAccent: '#8fe3ff', tint: '#3a6ad0',
    hook: 'Mercury retrograde | vs. *your* 610',
    teacher: star('gemini', { pitch: 620 }), student: star('taurus', { pitch: 430 }),
    boardTitle: 'MERCURY RX',
    beats: [
      { lines: [
          ['student', 'is Mercury retrograde why the 610 is *stuck?*'],
          ['teacher', "Mercury never actually goes *backward*.", { tag: TR, point: [400, 200] }],
          ['teacher', 'it just *looks* that way from Earth.', { point: [400, 200] }],
        ],
        draw(x, t, B, b) {
          chalkLoopPath(x, t, B, { at: b.lines[1].t + 0.1, x0: 80, x1: 720, cy: 290, amp: 150, dur: 2.2 })
          const u = ease.inOutCubic(clamp(prog(t, b.lines[1].t + 0.1, b.lines[1].t + 2.3)))
          const px = lerp(80, 720, u) - Math.sin(u * Math.PI * 2) * 640 * 0.22, py = 290 - Math.sin(u * Math.PI) * 150
          disc(x, B.x0 + px, B.y0 + py, 20, BL, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.3)))
        },
        chalk: [{ dt: 0.6, line: 2, text: 'the *loop* is an illusion', x: 400, y: 400, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', 'Mercury overtakes Earth on the *inside track*…', { point: [400, 220] }],
          ['teacher', 'so for a few weeks it seems to slide *back*.', { tag: TR, point: [400, 220] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.at + 0.1, cx: 400, cy: 230, r: 34 })
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r: 90, at: b.at + 0.4, dur: 0.6, width: 4 })
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r: 180, at: b.at + 0.6, dur: 0.7, width: 4 })
          const a1 = t * 2.4, a2 = t * 1.0
          disc(x, B.x0 + 400 + Math.cos(a1) * 90, B.y0 + 230 + Math.sin(a1) * 90, 14, BL, clamp(prog(t, b.at + 0.8, b.at + 1.1)))
          disc(x, B.x0 + 400 + Math.cos(a2) * 180, B.y0 + 230 + Math.sin(a2) * 180, 20, MN, clamp(prog(t, b.at + 0.9, b.at + 1.2)))
        },
        chalk: [{ dt: 0.5, line: 0, text: '*MERCURY*', x: 30, y: 110, size: 30, color: BL }, { dt: 0.9, line: 0, text: 'EARTH', x: 650, y: 110, size: 30, color: MN }],
      },
      { lines: [
          ['teacher', 'astrologers say it rules *talk and travel*.', { tag: TA, point: [300, 160] }],
          ['teacher', 'so retrograde gets blamed for *mixups*.', { point: [300, 260] }],
          ['teacher', 'the 610? slow *either way*, babe.', { tag: TH, point: [600, 300] }],
          ['teacher', 'blame the sky. but *confirm the plan.*', { tag: { ...TT, dy: 80 }, point: [600, 300] }],
        ],
        draw(x, t, B, b) {
          chalkRing(x, t, B, { at: b.lines[2].t + 0.1, cx: 600, cy: 290, rx: 150, ry: 110, color: Y })
          if (t > b.lines[3].t) chalkCheck(x, t, B, { at: b.lines[3].t + 0.5, cx: 600, cy: 290, s: 40 })
        },
        chalk: [
          { dt: 0.4, line: 0, text: '*TALK*', x: 40, y: 140, size: 40 }, { dt: 0.8, line: 0, text: '*TRAVEL*', x: 40, y: 210, size: 40 },
          { dt: 0.5, line: 1, text: 'mixups?', x: 40, y: 300, size: 34 }, { dt: 0.4, line: 2, text: '610', x: 600, y: 160, size: 40, align: 'center' },
        ],
      },
    ],
    bulb: "so the 610 is slow because… *it's the 610.*",
    items: ['Mercury only *looks* backward', 'Astrology: *talk & travel*', '*Confirm* the plan anyway'],
    last: "Don't blame Mercury. *Text back.*", lastWho: 'teacher',
    party: { line: 'Plan confirmed: Jan 9.', stars: ['gemini', 'taurus', 'pisces', 'aries'] },
  },

  // ─────────────────────────────── hst113 · Your rising sign, explained with feeder roads ───────────────────────────────
  hst113: {
    id: 'hst113', duration: 49, key: 'F', open: 'street', openText: 'FEEDER RD', qAccent: '#7dffb0', tint: '#2f8a5e',
    hook: 'Your rising sign, | explained with | *feeder roads*',
    teacher: star('libra', { pitch: 560 }), student: star('sagittarius', { pitch: 740 }),
    boardTitle: 'RISING SIGN',
    beats: [
      { lines: [
          ['student', 'what even *is* my rising sign?'],
          ['teacher', 'the sign coming up on the *eastern horizon*…', { tag: TR, point: [200, 300] }],
          ['teacher', 'the moment you were *born*.', { point: [200, 200] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 330), P(B, 780, 330)], at: b.lines[1].t - 0.1, dur: 0.6, width: 5 })
          const u = ease.outCubic(clamp(prog(t, b.lines[1].t + 0.6, b.lines[1].t + 2.4)))
          disc(x, B.x0 + 160 + u * 60, B.y0 + 360 - u * 200, 30, Y, clamp(prog(t, b.lines[1].t + 0.5, b.lines[1].t + 0.8)))
        },
        chalk: [{ dt: 0.4, line: 1, text: 'EAST', x: 40, y: 390, size: 32 }, { dt: 0.6, line: 1, text: 'WEST', x: 760, y: 390, size: 32, align: 'right' }, { dt: 0.3, line: 2, text: '*rising!*', x: 330, y: 180, size: 34 }],
      },
      { lines: [
          ['teacher', 'it changes about every *two hours*.', { tag: TR, point: [400, 200] }],
          ['teacher', 'so your birth *time* matters.', { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r: 150, at: b.at + 0.1, dur: 0.8, width: 5 })
          const a = -Math.PI / 2 + (t - b.at) * 1.4
          chalkLine(x, t, { pts: [P(B, 400, 230), P(B, 400, 120)], at: b.at + 0.8, dur: 0.3, width: 6 })
          if (t > b.at + 1.1) { x.save(); x.strokeStyle = Y; x.lineWidth = 6; x.beginPath(); x.moveTo(B.x0 + 400, B.y0 + 230); x.lineTo(B.x0 + 400 + Math.cos(a) * 120, B.y0 + 230 + Math.sin(a) * 120); x.stroke(); x.restore() }
        },
        chalk: [{ dt: 0.4, line: 1, text: 'BIRTH *TIME*', x: 400, y: 420, size: 34, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read it as your *first hello*.', { tag: TA, point: [250, 200] }],
          ['teacher', 'like a feeder road: how folks *get on*.', { tag: { ...TH, dy: 80 }, point: [400, 260] }],
          ['teacher', "first hello isn't the *whole drive*. stay.", { tag: { ...TT, dy: 146 }, point: [600, 300] }],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          chalkLine(x, t, { pts: [P(B, 20, 240), P(B, 780, 240)], at: a, dur: 0.5, width: 8 })
          chalkLine(x, t, { pts: [P(B, 20, 330), P(B, 780, 330)], at: a + 0.2, dur: 0.5, width: 4, dash: [16, 12] })
          chalkLine(x, t, { pts: [P(B, 260, 330), P(B, 480, 250)], at: a + 0.6, dur: 0.4, width: 5, arrow: true, color: Y })
          const u = clamp(prog(t, a + 1.0, a + 2.6))
          disc(x, B.x0 + (u < 0.4 ? lerp(60, 260, u / 0.4) : lerp(260, 480, (u - 0.4) / 0.6)), B.y0 + (u < 0.4 ? 330 : lerp(330, 250, (u - 0.4) / 0.6)), 16, PK, clamp(prog(t, a + 0.9, a + 1.1)))
        },
        chalk: [{ dt: 0.5, line: 1, text: 'FREEWAY = *SUN*', x: 30, y: 200, size: 30 }, { dt: 0.9, line: 1, text: 'FEEDER = *RISING*', x: 30, y: 390, size: 30 }],
      },
    ],
    bulb: 'so my rising sign is my *on-ramp.* got it.',
    items: ['Rising = sign on the *horizon*', 'Birth *time* matters', 'Astrology: your *first hello*'],
    last: 'First hello. *Not* the whole drive.', lastWho: 'teacher',
    party: { line: 'Take the Jan 9 exit.', stars: ['libra', 'sagittarius', 'pisces', 'cancer'] },
  },

  // ─────────────────────────────── hst114 · Why is it still 80° in January? ───────────────────────────────
  hst114: {
    id: 'hst114', duration: 50, key: 'G', open: 'heat', openText: '80°', qAccent: '#ffb36b', tint: '#ff7a3c',
    hook: 'Why is it *still* | 80° in January?',
    teacher: star('cancer', { pitch: 420, glasses: true }), student: star('aries', { pitch: 760 }),
    boardTitle: 'SEASONS',
    beats: [
      { lines: [
          ['student', "it's *January*. why am i sweating?"],
          ['teacher', "seasons come from Earth's *tilt*, baby.", { tag: TR, point: [400, 220] }],
          ['teacher', 'in January our half tips *away* from the Sun.', { point: [560, 220] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.at + 0.1, cx: 130, cy: 230, r: 50 })
          const a = b.lines[1].t
          chalkCircle(x, t, { x: B.x0 + 560, y: B.y0 + 230, r: 90, at: a + 0.2, dur: 0.6, color: BL })
          chalkLine(x, t, { pts: [P(B, 560 + Math.sin(0.41) * 130, 230 - Math.cos(0.41) * 130), P(B, 560 - Math.sin(0.41) * 130, 230 + Math.cos(0.41) * 130)], at: a + 0.8, dur: 0.5, color: Y, width: 5, dash: [12, 10] })
          chalkLine(x, t, { pts: [P(B, 200, 230), P(B, 450, 230)], at: b.lines[2].t + 0.2, dur: 0.4, arrow: true, width: 4 })
        },
        chalk: [{ dt: 0.4, line: 2, text: 'low sun = *winter*', x: 560, y: 400, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', "but Houston's far south, by the *warm Gulf*.", { tag: TH, point: [400, 260] }],
          ['teacher', "so winter here is *one 55° day*. maybe two.", { point: [400, 260] }],
          ['student', "i wore the *puffer*. i'm not taking it off."],
        ],
        draw(x, t, B, b) {
          chalkThermo(x, t, B, { at: b.at + 0.2, cx: 150, top: 80, h: 240, level: 0.85 })
          chalkThermo(x, t, B, { at: b.lines[1].t + 0.2, cx: 640, top: 80, h: 240, level: 0.45, fillCol: '#8fe3ff' })
        },
        chalk: [{ dt: 0.6, line: 0, text: '80°', x: 150, y: 420, size: 44, align: 'center' }, { dt: 0.6, line: 1, text: '55°', x: 640, y: 420, size: 44, align: 'center' }, { dt: 1.2, line: 1, text: 'the *one*|cold day', x: 400, y: 180, size: 32, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers call January *Capricorn season*.', { tag: TA, point: [300, 160] }],
          ['teacher', 'goals, plans, *steady* work. very you, Aries.', { point: [300, 240] }],
          ['teacher', 'date tip: bring a *sweater*. the AC is winter.', { tag: { ...TT, dy: 80 }, point: [600, 300] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 520, 380), P(B, 600, 240), P(B, 680, 380)], at: b.lines[0].t + 0.6, dur: 0.6, width: 5 })
          if (t > b.lines[2].t) chalkHeart(x, t, B, { at: b.lines[2].t + 0.4, cx: 600, cy: 320, s: 36 })
        },
        chalk: [{ dt: 0.4, line: 0, text: '*CAPRICORN*', x: 40, y: 150, size: 38 }, { dt: 0.4, line: 1, text: 'goals · plans', x: 40, y: 230, size: 32 }, { dt: 0.4, line: 2, text: 'AC = *WINTER*', x: 40, y: 330, size: 34 }],
      },
    ],
    bulb: 'so in Houston, winter is… *indoors.*',
    items: ['Seasons come from the *tilt*', 'Houston winter is *mild*', 'Bring a *sweater* inside'],
    last: "Winter's *indoors*, baby.", lastWho: 'teacher',
    party: { line: 'Puffer optional. Jan 9.', stars: ['cancer', 'aries', 'pisces', 'capricorn'] },
  },

  // ─────────────────────────────── hst115 · Is the Moon bigger over the Gulf? ───────────────────────────────
  hst115: {
    id: 'hst115', duration: 48, key: 'Eb', open: 'coast', qAccent: '#c9a6ff', tint: '#5a8ad0',
    hook: 'Is the Moon *bigger* | over the Gulf?',
    teacher: star('aquarius', { pitch: 600 }), student: star('pisces', { pitch: 680 }),
    boardTitle: 'MOON ILLUSION',
    beats: [
      { lines: [
          ['student', 'the Moon was *huge* over the beach. why?'],
          ['teacher', 'low on the horizon it *looks* huge.', { tag: TR, point: [200, 300] }],
          ['teacher', "but it's mostly a trick of your *brain*.", { point: [600, 120] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 360), P(B, 780, 360)], at: b.at + 0.1, dur: 0.5, width: 5 })
          chalkCircle(x, t, { x: B.x0 + 200, y: B.y0 + 300, r: 60, at: b.lines[1].t + 0.1, dur: 0.6, color: Y })
          chalkCircle(x, t, { x: B.x0 + 600, y: B.y0 + 110, r: 60, at: b.lines[2].t + 0.1, dur: 0.6, color: Y })
          chalkLine(x, t, { pts: [P(B, 130, 400), P(B, 270, 400)], at: b.lines[2].t + 0.9, dur: 0.3, color: MN, width: 4 })
          chalkLine(x, t, { pts: [P(B, 530, 200), P(B, 670, 200)], at: b.lines[2].t + 1.1, dur: 0.3, color: MN, width: 4 })
        },
        chalk: [{ dt: 1.3, line: 2, text: '*SAME* SIZE', x: 400, y: 260, size: 36, align: 'center', color: MN }],
      },
      { lines: [
          ['teacher', 'its distance does shift a *little* each orbit.', { tag: TR, point: [400, 220] }],
          ['teacher', 'closest passes look slightly *bigger*.', { point: [560, 220] }],
        ],
        draw(x, t, B, b) {
          x.save(); x.strokeStyle = EX.chalk; x.lineWidth = 4; x.globalAlpha *= clamp(prog(t, b.at, b.at + 0.5))
          x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 230, 300, 150, 0, 0, Math.PI * 2); x.stroke(); x.restore()
          disc(x, B.x0 + 330, B.y0 + 230, 34, BL, clamp(prog(t, b.at + 0.3, b.at + 0.6)))
          const a = (t - b.at) * 1.3
          disc(x, B.x0 + 400 + Math.cos(a) * 300, B.y0 + 230 + Math.sin(a) * 150, 18, Y, clamp(prog(t, b.at + 0.5, b.at + 0.8)))
        },
        chalk: [{ dt: 0.5, line: 0, text: 'EARTH', x: 330, y: 300, size: 28, align: 'center', color: BL }],
      },
      { lines: [
          ['teacher', 'in astrology the Moon is *feelings*.', { tag: TA, point: [300, 200] }],
          ['student', "that's why i cried at the *beach*. right?"],
          ['teacher', 'moonrise walk, phones away. *free* date.', { tag: TT, point: [500, 300] }],
        ],
        draw(x, t, B, b) {
          chalkMoon(x, t, B, { at: b.at + 0.2, cx: 160, cy: 180, r: 60, k: 1 })
          for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [P(B, 60 + i * 30, 360 + i * 22), P(B, 760 - i * 30, 360 + i * 22)], at: b.at + 0.5 + i * 0.15, dur: 0.5, width: 4, color: BL })
          if (t > b.lines[2].t) chalkHeart(x, t, B, { at: b.lines[2].t + 0.3, cx: 560, cy: 200, s: 46 })
        },
        chalk: [{ dt: 0.4, line: 0, text: '*FEELINGS*', x: 280, y: 190, size: 36 }],
      },
    ],
    bulb: 'so my *brain* made it big. like my feelings.',
    items: ['Low Moon = mostly *illusion*', 'Astrology: Moon = *feelings*', 'A moonrise walk is *free*'],
    last: 'Same Moon. *Bigger* feelings.', lastWho: 'teacher',
    party: { line: 'Big feelings welcome. Jan 9.', stars: ['aquarius', 'pisces', 'cancer', 'libra'] },
  },

  // ─────────────────────────────── hst116 · Inside the Loop, explained with orbits ───────────────────────────────
  hst116: {
    id: 'hst116', duration: 50, key: 'C', open: 'loop', openText: '610', qAccent: '#ff9a3c', tint: '#c0503a',
    hook: 'The Loop, | explained with | *planet orbits*',
    teacher: star('capricorn', { pitch: 400, prop: 'whistle' }), student: star('gemini', { pitch: 720 }),
    boardTitle: 'THE LOOPS',
    beats: [
      { lines: [
          ['student', 'why is "inside the Loop" a *personality?*'],
          ['teacher', 'think orbits. closer to the Sun = *faster*.', { tag: TR, point: [400, 220] }],
          ['teacher', 'Mercury laps the Sun in about *88 days*.', { point: [400, 220] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.at + 0.1, cx: 400, cy: 230, r: 30 })
          ;[80, 140, 200].forEach((r, i) => chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 230, r, at: b.lines[1].t + 0.1 + i * 0.25, dur: 0.6, width: 4 }))
          const k = clamp(prog(t, b.lines[1].t + 0.9, b.lines[1].t + 1.2))
          ;[[80, 3.0, BL], [140, 1.6, MN], [200, 0.9, PK]].forEach(([r, w, c], i) => disc(x, B.x0 + 400 + Math.cos(t * w + i) * r, B.y0 + 230 + Math.sin(t * w + i) * r, 14, c, k))
        },
        chalk: [{ dt: 0.7, line: 2, text: '*88* DAYS', x: 30, y: 110, size: 34 }, { dt: 1.1, line: 2, text: 'EARTH: *1 YR*', x: 770, y: 420, size: 30, align: 'right' }],
      },
      { lines: [
          ['teacher', 'Houston has *rings* too.', { tag: TH, point: [400, 230] }],
          ['teacher', 'the 610, then Beltway 8, then *Grand Parkway*.', { point: [400, 230] }],
          ['student', "so Katy's basically an *outer planet*."],
        ],
        draw(x, t, B, b) {
          const a = b.lines[0].t
          chalkRing(x, t, B, { at: a + 0.2, cx: 400, cy: 240, rx: 90, ry: 70, color: Y })
          chalkRing(x, t, B, { at: b.lines[1].t + 0.2, cx: 400, cy: 240, rx: 200, ry: 140 })
          chalkRing(x, t, B, { at: b.lines[1].t + 0.9, cx: 400, cy: 240, rx: 330, ry: 190, color: MN })
          disc(x, B.x0 + 400, B.y0 + 240, 12, PK, clamp(prog(t, a, a + 0.3)))
        },
        chalk: [{ dt: 0.6, line: 1, text: '610', x: 400, y: 240, size: 30, align: 'center', color: Y }, { dt: 1.2, line: 1, text: 'BW8', x: 400, y: 120, size: 28, align: 'center' }, { dt: 1.7, line: 1, text: 'GRAND PKWY', x: 400, y: 60, size: 28, align: 'center', color: MN }],
      },
      { lines: [
          ['teacher', "different rings aren't a *dealbreaker*.", { tag: TT, point: [400, 230] }],
          ['teacher', 'orbits line up sometimes. *meet halfway*.', { point: [400, 230] }],
        ],
        draw(x, t, B, b) {
          chalkRing(x, t, B, { at: b.at + 0.1, cx: 400, cy: 240, rx: 90, ry: 70, color: Y, dur: 0.4 })
          chalkRing(x, t, B, { at: b.at + 0.3, cx: 400, cy: 240, rx: 330, ry: 190, color: MN, dur: 0.5 })
          const u = ease.inOutCubic(clamp(prog(t, b.lines[1].t + 0.3, b.lines[1].t + 1.8)))
          disc(x, B.x0 + lerp(310, 520, u), B.y0 + 240, 16, PK, 1)
          disc(x, B.x0 + lerp(730, 560, u), B.y0 + 240, 16, BL, 1)
          if (u >= 1) chalkHeart(x, t, B, { at: b.lines[1].t + 1.9, cx: 540, cy: 160, s: 30 })
        },
      },
    ],
    bulb: 'so inside or outside, we can still *line up*.',
    items: ['Inner orbits run *faster*', '610, Beltway 8, *Grand Pkwy*', '*Meet halfway* sometimes'],
    last: 'Different orbits. *Same sky.*', lastWho: 'teacher',
    party: { line: 'Every ring, one night: Jan 9.', stars: ['capricorn', 'gemini', 'pisces', 'leo'] },
  },

  // ─────────────────────────────── hst117 · Your moon sign is your comfort food ───────────────────────────────
  hst117: {
    id: 'hst117', duration: 48, key: 'Bb', open: 'food', qAccent: '#ffcf6b', tint: '#d09a3a',
    hook: 'Your moon sign | is your | *comfort food*',
    teacher: star('taurus', { pitch: 410, glasses: true }), student: star('virgo', { pitch: 640, prop: 'clipboard' }),
    boardTitle: 'MOON SIGN',
    beats: [
      { lines: [
          ['student', 'i know my sun sign. what is my *moon* sign?'],
          ['teacher', 'where the Moon was in the zodiac at *birth*.', { point: [400, 220] }],
          ['teacher', 'it crosses a sign in about *2½ days*. fast.', { tag: TR, point: [400, 220] }],
        ],
        draw(x, t, B, b) {
          chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 240, r: 170, at: b.lines[1].t, dur: 0.7, width: 5 })
          for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; chalkLine(x, t, { pts: [P(B, 400 + Math.cos(a) * 150, 240 + Math.sin(a) * 150), P(B, 400 + Math.cos(a) * 190, 240 + Math.sin(a) * 190)], at: b.lines[1].t + 0.6 + i * 0.04, dur: 0.1, width: 4 }) }
          const a = -Math.PI / 2 + Math.max(0, t - b.lines[2].t) * 1.6
          chalkMoon(x, t, B, { at: b.lines[2].t, cx: 400 + Math.cos(a) * 170, cy: 240 + Math.sin(a) * 170, r: 22, k: 0.3, color: Y })
        },
        chalk: [{ dt: 0.6, line: 2, text: '*2½* DAYS', x: 400, y: 250, size: 36, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read the Moon as your *comfort*.', { tag: TA, point: [300, 200] }],
          ['teacher', 'in Houston? queso. pho on a *60° day*.', { tag: { ...TH, dy: 80 }, point: [400, 300] }],
          ['student', "i've *color-coded* my comfort foods."],
        ],
        draw(x, t, B, b) {
          const a = b.lines[1].t
          chalkCircle(x, t, { x: B.x0 + 200, y: B.y0 + 300, r: 70, at: a + 0.2, dur: 0.5, color: Y, from: 0, sweep: Math.PI })
          chalkLine(x, t, { pts: [P(B, 130, 300), P(B, 270, 300)], at: a + 0.6, dur: 0.3, width: 5, color: Y })
          chalkCircle(x, t, { x: B.x0 + 560, y: B.y0 + 300, r: 80, at: a + 1.0, dur: 0.5, color: BL, from: 0, sweep: Math.PI })
          for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [P(B, 530 + i * 30, 270), P(B, 520 + i * 30, 220), P(B, 535 + i * 30, 190)], at: a + 1.5 + i * 0.1, dur: 0.3, width: 4 })
        },
        chalk: [{ dt: 0.4, line: 0, text: '*COMFORT*', x: 40, y: 120, size: 40 }, { dt: 0.9, line: 1, text: 'QUESO', x: 200, y: 400, size: 28, align: 'center' }, { dt: 1.5, line: 1, text: 'PHO', x: 560, y: 410, size: 28, align: 'center' }],
      },
      { lines: [
          ['teacher', 'first-date question: "your *comfort food*?"', { tag: TT, point: [400, 200] }],
          ['teacher', "then remember it. that's the *whole trick*.", { point: [400, 300] }],
        ],
        draw(x, t, B, b) {
          chalkHeart(x, t, B, { at: b.lines[1].t + 0.3, cx: 400, cy: 260, s: 70 })
        },
        chalk: [{ dt: 0.4, line: 0, text: 'ASK ·  *REMEMBER*', x: 400, y: 120, size: 38, align: 'center' }],
      },
    ],
    bulb: 'so my Moon sign is my *queso*. noted.',
    items: ['Moon changes sign *fast*', 'Astrology: Moon = *comfort*', 'Ask their *comfort food*'],
    last: 'Know their comfort. *Bring it.*', lastWho: 'teacher',
    party: { line: 'Bring your appetite. Jan 9.', stars: ['taurus', 'virgo', 'pisces', 'sagittarius'] },
  },

  // ─────────────────────────────── hst118 · Houston's brightest "star" is not a star ───────────────────────────────
  hst118: {
    id: 'hst118', duration: 50, key: 'E', open: 'bayou', qAccent: '#ffb6d0', tint: '#8a3a9a',
    hook: "Houston's brightest | 'star' is *not* | a star",
    teacher: star('scorpio', { pitch: 380 }), student: star('cancer', { pitch: 600 }),
    boardTitle: 'EVENING STAR',
    beats: [
      { lines: [
          ['student', 'what is that *one bright star* after sunset?'],
          ['teacher', "often it's *Venus*. a planet, not a star.", { tag: TR, point: [560, 140] }],
          ['teacher', 'it stays near the Sun in our *sky*.', { point: [300, 330] }],
        ],
        draw(x, t, B, b) {
          chalkLine(x, t, { pts: [P(B, 20, 360), P(B, 780, 360)], at: b.at + 0.1, dur: 0.5, width: 5 })
          chalkCircle(x, t, { x: B.x0 + 260, y: B.y0 + 360, r: 50, at: b.at + 0.4, dur: 0.5, color: '#ff9a3c', from: Math.PI, sweep: Math.PI })
          disc(x, B.x0 + 560, B.y0 + 140, 22 + 2 * Math.sin(t * 5), Y, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.3)))
          chalkLine(x, t, { pts: [P(B, 300, 330), P(B, 530, 160)], at: b.lines[2].t + 0.3, dur: 0.5, width: 4, dash: [12, 10] })
        },
        chalk: [{ dt: 0.4, line: 1, text: '*VENUS*', x: 610, y: 80, size: 36 }, { dt: 0.5, line: 2, text: 'SUNSET · WEST', x: 260, y: 420, size: 28, align: 'center' }],
      },
      { lines: [
          ['teacher', 'it shines by *reflecting* sunlight.', { tag: TR, point: [400, 200] }],
          ['teacher', 'stars make their *own* light.', { point: [600, 200] }],
        ],
        draw(x, t, B, b) {
          chalkSun(x, t, B, { at: b.at + 0.1, cx: 120, cy: 220, r: 40 })
          disc(x, B.x0 + 420, B.y0 + 220, 30, Y, clamp(prog(t, b.at + 0.4, b.at + 0.7)))
          chalkArrow(x, t, B, [180, 220], [380, 220], b.lines[0].t + 0.6)
          chalkArrow(x, t, B, [440, 250], [560, 360], b.lines[0].t + 1.0)
          chalkStar(x, t, B, { at: b.lines[1].t + 0.3, cx: 690, cy: 150, r: 34 })
        },
        chalk: [{ dt: 0.8, line: 0, text: 'to you', x: 590, y: 400, size: 28 }, { dt: 0.6, line: 1, text: '*STAR*', x: 690, y: 230, size: 30, align: 'center' }],
      },
      { lines: [
          ['teacher', 'astrologers read Venus as *love* and beauty.', { tag: TA, point: [300, 200] }],
          ['teacher', 'evening walk on the bayou? *point it out*.', { tag: { ...TT, dy: 80 }, point: [500, 300] }],
          ['student', '"that\'s Venus." okay that\'s *smooth*.'],
        ],
        draw(x, t, B, b) {
          disc(x, B.x0 + 620, B.y0 + 150, 20, Y, clamp(prog(t, b.at, b.at + 0.3)))
          chalkLine(x, t, { pts: [P(B, 40, 360), P(B, 200, 330), P(B, 380, 370), P(B, 560, 330), P(B, 760, 360)], at: b.lines[1].t + 0.2, dur: 0.7, width: 5, color: BL })
          chalkHeart(x, t, B, { at: b.lines[2].t + 0.3, cx: 330, cy: 230, s: 40 })
        },
        chalk: [{ dt: 0.4, line: 0, text: '*LOVE*', x: 40, y: 140, size: 40 }, { dt: 0.8, line: 1, text: 'BAYOU', x: 400, y: 420, size: 28, align: 'center' }],
      },
    ],
    bulb: 'so the evening star is a *planet*. rude. pretty.',
    items: ['Bright evening "star": *Venus*', 'Planets *reflect* sunlight', 'Astrology: Venus = *love*'],
    last: 'Point at Venus. *Hold hands.*', lastWho: 'teacher',
    party: { line: 'Look up on Jan 9.', stars: ['scorpio', 'cancer', 'pisces', 'libra'] },
  },
}
