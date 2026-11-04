// LITTLE TREAT: the format of Star Talk Trends Vol. 2, episodes 76–80 (nt2e76–nt2e80; rows in promo/films/next30/b14.md).
// Built on ../../nt2e61/scenes/t2kit.js. "Little treat culture": one sign rewards itself for three small, healthy dating
// wins. Each beat: the win plays out in a cozy café-kitchen, its sticker says the win, then the treat pops in ("+1 LITTLE
// TREAT") with a sparkle. The third win is the twisted one. The stamp: "TREAT *EARNED.*"; the three treats sit on the
// counter in the finale.
//
//   makeTreat(cfg) → makeT2 result. cfg = makeT2 cfg (minus bug / bg), plus each tell:
//     { caption, treat: kind, treatAt (s into the beat, default 1.55), treatPos: [x, y], draw(x, t, S) }
//   kinds: cocoa, cookie, bun, sticker, cake, pretzel, donut, lollipop, sundae, cupcake, tea, pie
import { makeT2, R, box, label, shadow, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, T } from '../../nt2e61/scenes/t2kit.js'
export * from '../../nt2e61/scenes/t2kit.js'

export const FLOOR = 1180

export function drawKitchen(x, t, { wall = '#5a3a5e', stripe = '#64426a', tile = ['#f3e9d2', '#e0a8b8'], window: win = true } = {}) {
  R(x, wall, 0, 0, 1080, FLOOR)
  for (let i = 0; i < 1080; i += 60) R(x, stripe, i, 0, 26, FLOOR)
  // bunting
  for (let i = 0; i < 9; i++) { const cx = 70 + i * 120, cy = 420 + 18 * Math.sin(i * 0.8); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 40, cy - 6); x.lineTo(cx + 40, cy - 6); x.lineTo(cx, cy + 66); x.closePath(); x.fill(); x.fillStyle = ['#ff8fb1', '#ffd23f', '#9fe6b0', '#7fd0ff'][i % 4]; x.beginPath(); x.moveTo(cx - 32, cy); x.lineTo(cx + 32, cy); x.lineTo(cx, cy + 54); x.closePath(); x.fill() }
  R(x, INK, 0, 406, 1080, 6)
  if (win) { box(x, 760, 520, 220, 220, '#ffd8a8', { b: 10 }); R(x, INK, 865, 520, 10, 220); R(x, INK, 760, 625, 220, 10) }
  // counter
  box(x, -10, FLOOR - 230, 1100, 40, '#b07a4e', { b: 8, hi: '#d09a6a' }); R(x, '#8a5a3a', 0, FLOOR - 190, 1080, 190); for (let i = 40; i < 1080; i += 260) R(x, 'rgba(0,0,0,0.2)', i, FLOOR - 170, 200, 150)
  // checker floor
  R(x, INK, 0, FLOOR, 1080, 8)
  for (let j = 0; j < 12; j++) for (let i = 0; i < 14; i++) R(x, (i + j) % 2 ? tile[0] : tile[1], i * 80, FLOOR + 8 + j * 80, 80, 80)
  x.fillStyle = 'rgba(30,16,40,0.35)'; x.fillRect(0, FLOOR + 8, 1080, 1920)
}

// ── the treats (pixel bitmaps / shapes), centred on (cx, cy), size ~ s px
const BMP = {
  cookie: { bm: ['..CCCC..', '.CCDCCC.', 'CCCCCDCC', 'CDCCCCCC', 'CCCCDCCC', 'CCDCCCDC', '.CCCCCC.', '..CCCC..'], c: { C: '#d9a45a', D: '#5a3420' } },
  donut: { bm: ['..PPPP..', '.PPSPPP.', 'PPP..SPP', 'PS....PP', 'PP....PP', 'PPS..PPP', '.PPPSPP.', '..PPPP..'], c: { P: '#ff8fb1', S: '#ffffff' } },
  bun: { bm: ['...BBBB...', '.BBBWBBBB.', 'BBWBBBBWBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.DDDDDDDD.'], c: { B: '#e8b070', W: '#fff1d0', D: '#a06a3a' } },
  cupcake: { bm: ['....R....', '..PPPPP..', '.PPPPPPP.', 'PPPPPPPPP', '.WWWWWWW.', '.WCWCWCW.', '..WCWCW..', '..WWWWW..'], c: { R: '#e8344e', P: '#ff8fb1', W: '#ffd27a', C: '#d9a45a' } },
  cake: { bm: ['..R..R..R..', '..Y..Y..Y..', 'PPPPPPPPPPP', 'PWPWPWPWPWP', 'CCCCCCCCCCC', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'DDDDDDDDDDD'], c: { R: '#ff9a3a', Y: '#fff1a8', P: '#ff8fb1', W: '#ffffff', C: '#f3e1c0', D: '#b07a4e' } },
  pretzel: { bm: ['.BB...BB.', 'B..B.B..B', 'B...B...B', 'B..B.B..B', '.BB...BB.', '...B.B...', '..B...B..'], c: { B: '#b0703a' } },
  lollipop: { bm: ['.PPPP.', 'PWPPWP', 'PPWWPP', 'PWPPWP', '.PPPP.', '..S...', '..S...', '..S...'], c: { P: '#c9a6ff', W: '#ff8fb1', S: '#efe6d6' } },
  sundae: { bm: ['...R...', '..WWW..', '.PPPPP.', '.WWWWW.', 'GGGGGGG', '.GGGGG.', '..GGG..', '...G...', '..GGG..'], c: { R: '#e8344e', W: '#fff7ea', P: '#ff8fb1', G: '#9fd8f6' } },
  pie: { bm: ['...CCCC...', '.CCRCCRCC.', 'CCRRRRRRCC', 'CRRRRRRRRC', 'DDDDDDDDDD'], c: { C: '#e8b070', R: '#c8344e', D: '#a06a3a' } },
  sticker: { bm: ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y'], c: { Y: '#ffd23f' } },
}
export function treatIcon(x, t, kind, cx, cy, s = 120) {
  if (kind === 'cocoa' || kind === 'tea') {
    const col = kind === 'cocoa' ? '#ff8fb1' : '#9fe6b0'
    x.save(); x.translate(cx, cy); x.scale(s / 120, s / 120)
    box(x, -46, -40, 92, 90, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, INK, 46, -20, 26, 8); R(x, INK, 66, -20, 8, 44); R(x, INK, 46, 18, 26, 8)
    R(x, kind === 'cocoa' ? '#7a4a2a' : '#c8e8a0', -40, -34, 80, 14)
    if (kind === 'cocoa') { R(x, '#ffffff', -24, -46, 20, 16); R(x, '#ffffff', 4, -48, 18, 18) }
    for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.globalAlpha = (1 - ph) * 0.7; R(x, BONE, -22 + i * 20 + Math.sin(t * 4 + i) * 6, -70 - ph * 70, 8, 18); x.globalAlpha = 1 }
    x.restore(); return
  }
  const B = BMP[kind]
  const cell = s / Math.max(B.bm[0].length, B.bm.length)
  drawBits(x, B.bm, B.c, cx, cy, cell)
}

/** the treat reveal: pops in, bounces, "+1 LITTLE TREAT" */
function treatPop(x, t, kind, at, cx, cy, t1) {
  const k = pop01(t, at, 0.35, 2.8) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < at) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 10, cx, cy, 200 * k); g.addColorStop(0, 'rgba(255,230,160,0.45)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(cx - 220, cy - 220, 440, 440); x.restore()
  x.save(); x.translate(cx, cy - 8 * Math.sin(t * 5)); x.rotate(0.06 * Math.sin(t * 4)); x.scale(k, k)
  treatIcon(x, t, kind, 0, 0, 170)
  x.restore()
  const lk = pop01(t, at + 0.15, 0.3, 2.6) * outK(t, [t1 - 0.15, t1])
  if (lk > 0.01) {
    x.save(); x.translate(cx, cy - 150); x.rotate(-0.05); x.scale(lk, lk)
    x.font = `800 30px ${INTER}`; const w = x.measureText('+1 LITTLE TREAT').width + 36
    box(x, -w / 2, -26, w, 52, GOLD, { b: 5 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+1 LITTLE TREAT', 0, 2)
    x.restore()
  }
  sparkles(x, t, cx, cy, at + 0.02, 10, 150, 1, [GOLD, BONE, PINK])
}

export function makeTreat(cfg) {
  const tells = cfg.tells.map((tl, i) => ({
    ...tl,
    draw(x, t, S) {
      tl.draw(x, t, S)
      const [px, py] = tl.treatPos || [780, 820]
      treatPop(x, t, tl.treat, S.t0 + (tl.treatAt ?? (i === 2 ? 1.9 : 1.55)), px, py, S.t1)
    },
    cues: [...(tl.cues || []), ['pop', tl.treatAt ?? (i === 2 ? 1.9 : 1.55), 1567.98, 0.045, 0.3], ['pop', (tl.treatAt ?? (i === 2 ? 1.9 : 1.55)) + 0.08, 2093, 0.03, 0.3], ['glitter', tl.treatAt ?? (i === 2 ? 1.9 : 1.55), (tl.treatAt ?? (i === 2 ? 1.9 : 1.55)) + 0.5]],
  }))
  const kinds = cfg.tells.map(tl => tl.treat)
  return makeT2({
    bug: ['LITTLE', 'TREAT'],
    stamp: 'TREAT *EARNED.*', stampInk: '#e8344e',
    hookSize: 74, hookAccent: 108,
    ...cfg,
    tells,
    bg(x, t) { drawKitchen(x, t, cfg.kitchen || {}) },
    finale(x, t, S) {
      cfg.finale(x, t, S)
      kinds.forEach((k, i) => { const kk = pop01(t, T.stamp + 0.2 + i * 0.12, 0.3, 2.6) * S.ok; if (kk > 0.01) { x.save(); x.translate(300 + i * 240, FLOOR - 290); x.scale(kk, kk); treatIcon(x, t, k, 0, 0, 110); x.restore() } })
    },
  })
}
void [label, shadow, prog, lerp, clamp, ease, RED]
