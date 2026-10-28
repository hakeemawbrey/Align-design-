// st7heracles (60 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 02) · story 0–55.6, then the shared end card.
//   Cancer × Leo hold a support group of two: "CAST AS THE VILLAIN?". In Greek myth both were monsters Heracles fought:
//   the Nemean lion (his first labour; its hide no weapon could pierce, and he wore it afterwards) and the crab Hera sent
//   to pinch him while he fought the Hydra (he crushed it; one story says Hera put it in the sky as thanks). In the sky
//   they are neighbours: Leo's heart is Regulus ("little king"); Cancer is faint and holds the Beehive Cluster.
//   Rulers: Cancer the Moon, Leo the Sun.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♌ × ♋ · "a support group of two"
//   2.7        "A support group | *of two.*"  Two folding chairs and a flip chart: "CAST AS THE VILLAIN?"
//   ~9         flip → page 2: Heracles in the lion's hide. SKY NOTE (the hide). LEO: "he wore my *coat*…"
//   ~20        "Cancer | *shares.*"  flip → page 3: Heracles' foot on the crab. CANCER: "he stepped on me. *mid-fight.*" SKY NOTE.
//   ~34        "Now look | *up.*"  flip → page 4: the real Leo + Cancer star map (Regulus, the Beehive). SKY NOTE.
//   ~51        CANCER: "We're not side characters. | We're the *sky.*"  Plain sky at 55.6, end card.
// One canvas (sky + seed constellation + room + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawStarMap, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 60
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PAPER = '#f3ecdc', MARK = '#2a2346'
const LEO = signStar('leo'), CAN = signStar('cancer')
const CAST = {
  LEO: { tag: '♌ LEO', color: LEO.color, side: 'L', pitch: 587.33 },
  CANCER: { tag: '♋ CANCER', color: CAN.color, side: 'R', pitch: 987.77 },
}
const CPS = 28

const Lx = (x, o = {}) => ({ s: 'LEO', x, ...o }), Cx = (x, o = {}) => ({ s: 'CANCER', x, ...o })
const SCRIPT = seq(3.05, [
  Lx('welcome to “cast as the villain.” it’s just us *again.*'),
  Cx('i brought snacks. and my *feelings.*'),
  { mark: 'lion' },
  Lx('Heracles. labour number one? *me.*', { pre: 0.35, hold: 1.4 }),
  Lx('he wore my *coat* for the rest of his life.', { hold: 3.6 }),
  Cx('at least he *noticed* you.'),
  Lx('…okay. your turn. *share.*', { hold: 1.4 }),
  { mark: 'crab' },
  Cx('Hera sent me to pinch him while he fought the *Hydra.*', { pre: 0.45 }),
  Cx('he stepped on me. *mid-fight.*', { hold: 3.4 }),
  Lx('that is *so* rude. i’m so sorry.'),
  Cx('and people say my stars are the *faintest.*', { hold: 1.4 }),
  { mark: 'sky' },
  Lx('faint? you hold the *Beehive.*', { pre: 0.5, hold: 3.0 }),
  Lx('and look. we’re *neighbours* up there.'),
  Cx('the Moon rules me. the Sun rules *you.*'),
  Lx('so we take turns being *lit.*', { hold: 1.5 }),
], { cast: CAST, cps: CPS, hold: 1.7 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  lion: M.lion, flip2: M.lion - 0.05,
  crab: M.crab, flip3: M.crab - 0.05, h2: M.crab - 0.05, h2Land: M.crab + 0.25,
  sky: M.sky, flip4: M.sky - 0.05, h3: M.sky - 0.05, h3Land: M.sky + 0.25,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.lion + 2.2, T.lion + 2.4]
T.note1 = T.lion + 2.6; T.note1Out = [T.note1 + 4.6, T.note1 + 4.85]
T.h2Out = [T.crab + 3.6, T.crab + 3.8]
T.note2 = T.crab + 4.0; T.note2Out = [T.note2 + 4.6, T.note2 + 4.85]
T.h3Out = [T.sky + 2.4, T.sky + 2.6]
T.note3 = T.sky + 2.8; T.note3Out = [T.note3 + 5.2, T.note3 + 5.45]
T.last = SCRIPT.end + 0.25; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = T.crab + 9.6
const LAST = { text: 'We’re not side characters. | We’re the *sky.*' }
const NOTE1 = 'In Greek myth, the Nemean lion’s hide | could not be pierced by *any weapon.*'
const NOTE2 = 'One story says Hera put the crab | among the stars, *as thanks.*'
const NOTE3 = 'Leo’s heart is *Regulus,* “little king.” | Cancer holds the *Beehive Cluster.*'

// ── the room: a flip chart on an easel between two folding chairs
const CHART = { x0: 200, x1: 880, y0: 560, y1: 1080 }
const SEAT = { L: { x: 190, y: 1236 }, R: { x: 890, y: 1236 } }
export const GHOST = { at: T.ghost, x: CHART.x0 - 2, y: 680, where: 'leaning out from behind the flip chart’s left edge, above Leo' }

// ── the sky page: Leo (sickle + body) and Cancer, real positions (RA h, Dec °, mag), east to the left
const RAW = [
  // Leo 0–8: Regulus, η, Algieba γ, Adhafera ζ, Rasalas μ, ε, Zosma δ, Chertan θ, Denebola β
  [10.139, 11.97, 1.35], [10.122, 16.76, 3.5], [10.333, 19.84, 2.0], [10.278, 23.42, 3.4], [9.879, 26.0, 3.9], [9.764, 23.77, 3.0],
  [11.235, 20.52, 2.6], [11.237, 15.43, 3.3], [11.818, 14.57, 2.1],
  // Cancer 9–13: Tarf β, Asellus Australis δ, Asellus Borealis γ, Acubens α, ι
  [8.275, 9.19, 3.5], [8.745, 18.15, 3.9], [8.721, 21.47, 4.4], [8.975, 11.86, 4.2], [8.778, 28.76, 4.0],
]
const BEEHIVE = [8.667, 19.67]
const proj = (() => { const ra0 = 10.05 * 15, de0 = 18.6, c = Math.cos(de0 * Math.PI / 180), k = 12.6, cx = 540, cy = 806; return ([ra, de]) => ({ x: Math.round(cx - (ra * 15 - ra0) * c * k), y: Math.round(cy - (de - de0) * k) }) })()
const MAP = RAW.map(r => ({ ...proj(r), mag: r[2] }))
const HIVE = proj(BEEHIVE)
const LEO_LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 8], [8, 7], [7, 0], [6, 7]]
const CAN_LINKS = [[9, 10], [10, 11], [11, 13], [10, 12]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { LEO: [T.h1 + 0.2, ...talkHops(LINES, CAST.LEO.tag, { cps: CPS })], CANCER: [T.h1 + 0.35, ...talkHops(LINES, CAST.CANCER.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.2, T.last + 1.7] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [leo, cancer]
    [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'squint', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }],
    [{ mood: 'eyeroll' }, { mood: 'wide', look: [-1, -1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'sleepy', zzz: false }],
    [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }],
    [{ mood: 'wide', look: [1, 0] }, { mood: 'wide', look: [-1, 0], blink: false }],
    [{ mood: 'wide', look: [1, 0], blink: false }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'neutral', look: [0, 1] }],
    [{ mood: 'sparkle', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }],
    [{ mood: 'happy', look: [1, -1] }, { mood: 'sparkle', look: [-1, -1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'wink', look: [1, 0] }, { mood: 'heart' }],
  ]
  if (t < LINES[0].t) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }]
  if (t >= T.last) return [{ mood: 'heart' }, { mood: 'sparkle', look: [-1, -1] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'A support group | *of two.*', { top: 196, size: 108, accentSize: 172, at: T.h1, gap: 0.08, accentColor: lite(LEO.color, 0.2), wobble: true, late: 2, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Cancer | *shares.*', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: lite(CAN.color, 0.25), wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Now look | *up.*', { top: 196, size: 112, accentSize: 176, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♌', name: 'Leo', color: LEO.color }, { glyph: '♋', name: 'Cancer', color: CAN.color }], place: 'a support group of two' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out], [NOTE3, T.note3, T.note3Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.CANCER.tag, color: CAN.color, top: 1440, size: 90, accentSize: 200 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const txt = (s, cx, cy, size, col, font = 'Space Mono', w = 700, italic = '') => { x.font = `${italic}${w} ${size}px '${font}', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
  const pageAt = t => t < T.flip2 ? 0 : t < T.flip3 ? 1 : t < T.flip4 ? 2 : 3
  function page(i, t) {
    const { x0, x1, y0, y1 } = CHART, cx = (x0 + x1) / 2
    if (i === 3) {
      R('#0d0b2a', x0, y0, x1 - x0, y1 - y0)
      const g = x.createRadialGradient(cx, (y0 + y1) / 2, 20, cx, (y0 + y1) / 2, 380); g.addColorStop(0, 'rgba(90,60,160,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      const lc = lite(LEO.color, 0.2), cc = lite(CAN.color, 0.2)
      drawStarMap(x, t, { stars: MAP.map((s, j) => ({ ...s, color: j < 9 ? lc : cc })), links: [...LEO_LINKS.map(l => [...l, lc]), ...CAN_LINKS.map(l => [...l, cc])], at: T.flip4 + 0.3, dur: 2.0,
        labels: [{ i: 0, text: 'REGULUS', dx: 0, dy: 40, align: 'center', at: T.flip4 + 2.0, color: lc }, { i: 9, text: 'TARF', dx: 0, dy: 34, align: 'center', at: T.flip4 + 2.3, color: cc, size: 20 }] })
      // the Beehive: a soft fuzzy clump of tiny stars
      const hp = prog(t, T.flip4 + 2.4, T.flip4 + 2.9)
      if (hp > 0) {
        x.save(); x.globalAlpha = hp
        for (let k = 0; k < 14; k++) { const a = k * 2.4, r = 6 + (k * 7) % 22; R(k % 3 ? '#cfe6ff' : '#ffffff', HIVE.x + Math.cos(a) * r, HIVE.y + Math.sin(a) * r * 0.8, 4, 4) }
        x.font = `700 20px 'Space Mono', monospace`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = cc; x.fillText('BEEHIVE', HIVE.x - 34, HIVE.y - 6)
        x.restore()
      }
      txt('LEO', MAP[6].x - 6, y1 - 34, 26, lc); txt('CANCER', MAP[10].x, y1 - 34, 26, cc)
      return
    }
    R(PAPER, x0, y0, x1 - x0, y1 - y0)
    for (let k = 0; k < 7; k++) R('rgba(120,140,190,0.18)', x0 + 20, y0 + 70 + k * 52, x1 - x0 - 40, 3)
    if (i === 0) {
      txt('CAST AS THE', cx, y0 + 130, 54, MARK)
      txt('VILLAIN?', cx, y0 + 215, 92, '#c8323f')
      txt('support group · tue 8pm', cx, y0 + 310, 40, MARK, 'EB Garamond', 500, 'italic ')
      txt('snacks provided ✓', cx, y0 + 390, 36, '#3d7a4a', 'EB Garamond', 500, 'italic ')
    } else if (i === 1) {
      txt('LABOUR 1: THE LION', cx, y0 + 52, 32, MARK)
      drawBits(x, HERO, HERO_C, cx - 70, y0 + 290, 14, { outline: MARK })
      drawBits(x, CLUB, CLUB_C, cx + 60, y0 + 270, 14, { outline: MARK, rot: 0.35 })
      txt('← “my coat”', cx + 200, y0 + 190, 40, '#c8323f', 'EB Garamond', 600, 'italic ')
    } else if (i === 2) {
      txt('LABOUR 2: THE HYDRA', cx, y0 + 52, 32, MARK)
      txt('(+ one crab)', cx, y0 + 96, 30, '#c8323f', 'EB Garamond', 600, 'italic ')
      drawBits(x, HERO, HERO_C, cx - 110, y0 + 300, 13, { outline: MARK })
      // the foot coming down on the crab
      const st = clamp(Math.sin((t - T.flip3) * 3.2) * 0.5 + 0.5)
      drawBits(x, CRAB, CRAB_C, cx + 140, y0 + 420, 12, { outline: MARK })
      drawBits(x, FOOT, FOOT_C, cx + 140, y0 + 290 + 40 * st, 12, { outline: MARK })
      if (st > 0.85) txt('PINCH!', cx + 250, y0 + 260, 34, '#c8323f')
    }
  }
  function room(t) {
    // floor + a wall line
    R('rgba(30,20,60,0.55)', 0, 1320, 1080, 120); R('rgba(242,199,92,0.18)', 0, 1320, 1080, 4)
    // easel legs
    x.save(); x.strokeStyle = '#8a5a34'; x.lineWidth = 16
    x.beginPath(); x.moveTo(380, 1040); x.lineTo(320, 1340); x.moveTo(700, 1040); x.lineTo(760, 1340); x.moveTo(540, 1040); x.lineTo(540, 1310); x.stroke(); x.restore()
    const { x0, x1, y0, y1 } = CHART
    R(INK, x0 - 14, y0 - 30, x1 - x0 + 28, y1 - y0 + 44)
    R('#a06a3c', x0 - 10, y0 - 26, x1 - x0 + 20, 22)                     // the clip bar
    // pages: the current one, plus the old one flipping up over the bar
    const pi = pageAt(t)
    page(pi, t)
    const ft = [T.flip2, T.flip3, T.flip4][pi - 1]
    if (pi > 0 && t < ft + 0.36) {
      const p = ease.inOutQuad(prog(t, ft, ft + 0.36))
      x.save(); x.translate(0, y0); x.scale(1, 1 - p); x.translate(0, -y0)
      page(pi - 1, t); R(`rgba(0,0,0,${0.35 * p})`, x0, y0, x1 - x0, y1 - y0); x.restore()
    }
    R('#7a4c28', x0 - 10, y0 - 8, x1 - x0 + 20, 6)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
    // folding chairs
    for (const [cx, flip] of [[SEAT.L.x, false], [SEAT.R.x, true]]) drawBits(x, CHAIR, CHAIR_C, cx, 1304, 11, { flip })
    // the snack plate by Cancer's chair
    drawBits(x, SNACK, SNACK_C, 1000, 1366, 6)
    void t
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        room(t)
        const [ml, mc] = moods(t)
        const rl = drawStarChar(x, SEAT.L.x, SEAT.L.y, 270, t, { ...LEO, ...ml, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 5, hops: HOPS.LEO, glow: 0.9 })
        drawBits(x, CROWN, CROWN_C, Math.round(rl.x), Math.round(rl.top + 4), 6, { rot: -0.14 + 0.04 * Math.sin(t * 3) })
        const rc = drawStarChar(x, SEAT.R.x, SEAT.R.y, 270, t, { ...CAN, ...mc, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 9, hops: HOPS.CANCER, glow: 0.9 })
        drawTalkMarks(x, rl.x, rl.top - 30, t, speaking(LINES, 'LEO', t, { cps: CPS }), LEO.color)
        drawTalkMarks(x, rc.x, rc.top, t, Math.max(speaking(LINES, 'CANCER', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 2.0, T.last + 2.3))), CAN.color)
        x.restore()
      }
      open.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      thread.update(t)
      for (const n of notes) n.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// ── pixel art
const HERO = [   // Heracles wearing the lion's hide as a hood and cape
  '...MMMMMM...',
  '..MmMMMMmM..',
  '.MMmSSSSmMM.',
  '.MMSESSESMM.',
  '.MmSSSSSSmM.',
  '..MSSWWSSM..',
  '...mSSSSm...',
  '..MMMMMMMM..',
  '.MMTTTTTTMM.',
  'SMTTTTTTTTMS',
  'S.TTTTTTTT.S',
  'S.TTTTTTTT.S',
  '..TTTTTTTT..',
  '..mTTTTTTm..',
  '...LL..LL...',
  '...LL..LL...',
  '..BBB..BBB..',
]
const HERO_C = { M: '#e0a03a', m: '#b8742a', S: '#e8b48a', E: '#2a2346', W: '#ffffff', T: '#c9c2b0', L: '#e8b48a', B: '#7a4a2a' }
const CLUB = ['.CC', 'CCC', 'CCC', '.C.', '.C.', '.C.', '.C.']
const CLUB_C = { C: '#7a4a2a' }
const CRAB = ['R.R......R.R', 'RRR......RRR', '.R..RRRR..R.', '..RRRRRRRR..', '.RRWERRWERR.', '.RRRRRRRRRR.', 'R.RRRRRRRR.R', '.R.R....R.R.']
const CRAB_C = { R: '#3fb6f0', W: '#ffffff', E: '#2a2346' }
const FOOT = ['..LL..', '..LL..', '..LL..', '..LL..', '..LL..', '..LL..', '.BBBBB', 'BBBBBB']
const FOOT_C = { L: '#e8b48a', B: '#7a4a2a' }
const CHAIR = ['GGGGGGGGGGGGG', 'GDDDDDDDDDDDG', 'G...........G', 'G...........G', 'G...........G', 'GGGGGGGGGGGGG', '.G.........G.', '..G.......G..', '...G.....G...', '..G.G...G.G..', '.G...G.G...G.', 'G.....G.....G']
const CHAIR_C = { G: '#8b8fa3', D: '#5f6378' }
const SNACK = ['..Y.O.Y..', '.YOYOYOY.', 'WWWWWWWWW', '.WWWWWWW.']
const SNACK_C = { Y: '#ffd34d', O: '#f39a3a', W: '#efe6d6' }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }

// card-motif candidates: the page flips into Cancer's share and into the sky, the hand-off to the last line
const CUTS = [{ t: T.flip3 - 0.1, kind: 'flip' }, { t: T.flip4 - 0.1, kind: 'deal' }, { t: T.last - 0.08, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E02' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const flip = at => [['whoosh', r3(at), 0.3, 0.03], ['tick', r3(at + 0.02), 0.04], ['tick', r3(at + 0.3), 0.025]]
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 587.33, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 880, 0.04, 0.4],
  ...wordPops(T.h1, 3, 0.08, 0), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...flip(T.flip2), ...flip(T.flip3), ...flip(T.flip4),
  ...noteCues(T.note1, T.note1Out),
  ...wordPops(T.h2, 1, 0.08, 2), ['pop', T.h2Land, 1318.51, 0.045, 0],
  ['tick', r3(T.flip3 + 0.98), 0.05], ['pop', r3(T.flip3 + 1.0), 1479.98, 0.03, 0.4],
  ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 2, 0.08, 4), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['glitter', r3(T.flip4 + 0.3), r3(T.flip4 + 2.3)], ['bell', r3(T.flip4 + 2.0), 1760, 0.025, 1.6, -0.3], ['bell', r3(T.flip4 + 2.4), 2093, 0.022, 1.6, 0.3],
  ...noteCues(T.note3, T.note3Out),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
