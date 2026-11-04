// nhse23: HOLIDAY SURVIVAL GUIDE No. 23, "The year-end check-in" (28 s vertical, star_advice post, music: lofi · Em).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "Three questions | *before* the new year." Frame 0: ♍ Virgo and ♓ Pisces on the couch, two cocoas,
//              Virgo mid-click of a pen over a notebook titled OUR YEAR; Pisces already misty. SITUATION: "looking back,
//              together."
//   5.4–9.4    1 "Ask: what was your *favourite* moment?" A memory pops up (the two of them in the first snow); Pisces
//              bursts into happy tears.
//   9.4–13.4   2 "Ask: what was *hard?*" Virgo goes quiet, a little grey cloud overhead; Pisces scoots over and holds on;
//              the cloud thins to a sliver of sun.
//   13.4–17.4  3 "Ask: what do you want *more* of?" Virgo: "slow mornings." Pisces: "walks. and you."
//   17.4–25.6  THE STARS: "listen to answer two *gently.*" The notebook: MORE OF: slow mornings · walks · us. A talk card
//              slides onto the page for the next check-in ("What does a perfect lazy Sunday look like for you?").
//              Pisces happy-cries. endHead "Three answers. | *One* us."  Last line: "Look *back* | together."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, sofa, mug, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, HEART, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const VIR = 'virgo'
const CARD = 'card-talk-3.png'

function den(x, t) {
  room(x, { wall: '#3a2e4e', wall2: 'rgba(255,214,160,0.04)', floor: '#5a4660', floorY: FLOOR })
  windowPane(x, 820, 600, 200, 170, t)
  // a floor lamp glow
  R(x, INK, 170, 620, 10, 500); box(x, 120, 560, 110, 70, '#f2c27a', { b: 5 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(175, 600, 10, 175, 600, 380); g.addColorStop(0, 'rgba(255,200,130,0.25)'); g.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = g; x.fillRect(P.x, P.y, 600, 700); x.restore()
}
function notebook(x, cx, cy, s, lines = [], { title = 'OUR YEAR', rot = -0.04 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -180, -130, 360, 260, PAPER, { b: 7 })
  R(x, '#2f8f86', -180, -130, 22, 260)
  for (let i = 0; i < 6; i++) R(x, 'rgba(120,100,70,0.15)', -150, -70 + i * 36, 310, 3)
  x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -146, -96)
  x.font = `italic 600 30px ${SERIF}`; x.fillStyle = '#2c2a7a'
  lines.forEach((l, i) => { if (l.k <= 0) return; x.save(); x.beginPath(); x.rect(-150, -66 + i * 36, 320 * l.k, 36); x.clip(); x.fillText(l.text, -146, -48 + i * 36); x.restore() })
  x.restore()
}
const VO = { x: 380, y: 960, s: 200 }, PO = { x: 610, y: 960, s: 200 }

function set(x, t, S) {
  if (!S.end) {
    den(x, t)
    sofa(x, 500, FLOOR + 10, 440, '#7a4a6a')
    star(x, t, VIR, { ...VO, mood: 'happy', look: [0, 1], hops: [0.4, 2.4] })
    pisces(x, t, { ...PO, tears: 1, mood: 'sparkle', look: [-1, 1] })
    notebook(x, 470, 1080, 0.55, [], {})
    // the pen click
    R(x, INK, 520, 990, 10, 60); R(x, '#e8344e', 522, 992, 6, 22)
    mug(x, 760, 1090, '#e8344e', 1, t); mug(x, 250, 1090, '#38c4ec', 1, t)
    label(x, 'click.', 600, 820, { size: 30, col: GOLD, alpha: pop01(t, 0.4, 0.2, 2.6) * outK(t, [1.6, 1.9]) })
    return
  }
  const u = S.u
  den(x, t)
  sofa(x, 500, FLOOR + 10, 440, '#7a4a6a')
  star(x, t, VIR, { ...VO, mood: 'happy', look: [1, 0], hops: [17.9, 21.5] })
  pisces(x, t, { ...PO, tears: 3, mood: 'happy', look: [-1, 0], hops: [18.0, 21.55] })
  const lk = i => prog(u, 0.4 + i * 0.5, 0.9 + i * 0.5)
  notebook(x, 450, 680, 1.2, [{ text: 'MORE OF:', k: lk(0) }, { text: '· slow mornings', k: lk(1) }, { text: '· walks', k: lk(2) }, { text: '· us', k: lk(3) }])
  const img = S.img[CARD]
  const ck = ease.outCubic(prog(u, 2.6, 3.2))
  if (img && ck > 0) { const w = 170, h = w * img.height / img.width; x.save(); x.translate(lerp(1200, 860, ck), lerp(500, 720, ck)); x.rotate(lerp(0.6, 0.12, ck)); R(x, 'rgba(6,4,18,0.45)', -w / 2 + 10, -h / 2 + 12, w, h); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore() }
  hearts(x, t, 19.2, 500, 880, { n: 4 })
}

// question card helper
function qcard(x, t, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 600); x.rotate(-0.03); x.scale(k, k)
  box(x, -300, -80, 600, 160, PAPER, { b: 7 })
  R(x, '#2f8f86', -300, -80, 600, 34)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('QUESTION', 0, -62)
  x.font = `italic 600 46px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.fillText(text, 0, 20)
  x.restore()
}

// ── step 1: favourite moment
function step1(x, t, S) {
  const u = S.u
  den(x, t)
  sofa(x, 500, FLOOR + 10, 440, '#7a4a6a')
  qcard(x, t, 'your favourite moment?', pop01(u, 0.1, 0.35, 2))
  star(x, t, VIR, { ...VO, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, -1], hops: [S.t0 + 1.0] })
  pisces(x, t, { ...PO, tears: u > 1.4 ? 3 : 1, mood: u > 1.4 ? 'happy' : 'wide', look: [-1, -1], hops: [S.t0 + 1.4, S.t0 + 1.7] })
  // the memory: a little snapshot of the two in the first snow
  const mk = pop01(u, 1.0, 0.35, 2)
  if (mk > 0.01) {
    x.save(); x.translate(500, 800); x.rotate(0.05); x.scale(mk, mk)
    box(x, -110, -80, 220, 160, '#ffffff', { b: 5 }); R(x, '#24305a', -98, -68, 196, 112)
    for (let i = 0; i < 10; i++) R(x, '#ffffff', -90 + ((i * 41) % 180), -60 + ((i * 29) % 90), 5, 5)
    drawBits(x, ['....P....', '...PPP...', 'PPPPPPPPP', '.PPPPPPP.', '.PP...PP.'], { P: '#ef5c94' }, -40, 4, 6)
    drawBits(x, ['....Q....', '...QQQ...', 'QQQQQQQQQ', '.QQQQQQQ.', '.QQ...QQ.'], { Q: '#7c74f0' }, 40, 4, 6)
    x.restore()
  }
}

// ── step 2: what was hard
function step2(x, t, S) {
  const u = S.u
  den(x, t)
  sofa(x, 500, FLOOR + 10, 440, '#7a4a6a')
  qcard(x, t, 'what was hard?', pop01(u, 0.1, 0.35, 2))
  const scoot = ease.inOutCubic(prog(u, 1.3, 1.9))
  star(x, t, VIR, { ...VO, mood: u < 2.4 ? 'neutral' : 'happy', look: [0, 1] })
  pisces(x, t, { x: lerp(PO.x, 500, scoot), y: PO.y, s: PO.s, tears: 2, mood: u > 1.9 ? 'happy' : 'wide', look: [-1, 0], hops: [S.t0 + 1.3] })
  // the little grey cloud, thinning to a sliver of sun
  const thin = prog(u, 2.0, 2.8)
  drawBits(x, ['..CCC...', '.CCCCCC.', 'CCCCCCCC', '.CCCCCC.'], { C: '#8a8aa8' }, VO.x, 780, 12, { alpha: 1 - 0.7 * thin })
  if (thin > 0) drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], { Y: GOLD }, VO.x + 60, 750, 8 * thin)
  if (u > 1.9) { drawBits(x, HEART, { H: PINK }, 450, 900, 6 * pop01(u, 1.9, 0.25, 2.4)); label(x, "I'm here.", 640, 800, { size: 30, col: '#c9a6ff', alpha: pop01(u, 2.0, 0.25, 2) }) }
}

// ── step 3: more of
function step3(x, t, S) {
  const u = S.u
  den(x, t)
  sofa(x, 500, FLOOR + 10, 440, '#7a4a6a')
  qcard(x, t, 'what do you want more of?', pop01(u, 0.1, 0.35, 2))
  star(x, t, VIR, { ...VO, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.9] })
  pisces(x, t, { ...PO, tears: u > 1.8 ? 3 : 1, mood: 'happy', look: [-1, -1], hops: [S.t0 + 1.8] })
  bubble(x, t, 290, 790, S.t0 + 0.9, S.t1, 'slow mornings.', { size: 32, col: '#ffd6e4', tail: 0.2 })
  bubble(x, t, 760, 790, S.t0 + 1.8, S.t1, 'walks. and you.', { size: 32, col: '#d8d4ff', tail: -0.2 })
}

const EP = makeSurvival({
  no: 23,
  accent: '#d8b4ff',
  hook: 'Three questions | *before* the new year.',
  hookSize: 90,
  situation: 'looking back, together.',
  guide: 'How to survive: | *the year-end talk.*',
  endHead: 'Three answers. | *One* us.',
  line: 'listen to answer two *gently.*',
  last: 'Look *back* | together.',
  images: [CARD],
  set,
  steps: [
    { text: 'Ask: what was your *favourite* moment?', draw: step1, cues: [['whoosh', 0.1, 0.25, 0.03], ['pop', 1.0, 880, 0.04, 0], ['pluck', 1.4, 1174.66, 0.04, 0.6, 0.2], ['glitter', 1.4, 1.8]] },
    { text: 'Ask: what was *hard?*', draw: step2, cues: [['whoosh', 0.1, 0.25, 0.03], ['whoosh', 1.3, 0.5, 0.02], ['pluck', 1.9, 659.25, 0.035, 0.8, -0.2], ['bell', 2.6, 1318.51, 0.025, 1.2, 0]] },
    { text: 'Ask: what do you want *more* of?', draw: step3, cues: [['whoosh', 0.1, 0.25, 0.03], ['pop', 0.9, 783.99, 0.035, -0.3], ['pop', 1.8, 987.77, 0.035, 0.3]] },
  ],
  cues: [['tick', 0.4, 0.07], ['pop', 0.42, 1567.98, 0.03, 0.2], ...[17.8, 18.3, 18.8, 19.3].map(c => ['tick', c, 0.025]), ['whoosh', 20.0, 0.5, 0.035], ['pluck', 20.6, 1318.51, 0.035, 0.6, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, RED, MINT, sparkles, clamp, drawPixelStar]
