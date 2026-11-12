// r2t0427: THE SIGNS AS… v3, "Zodiacs getting a handwritten letter | be like." (~57 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "Zodiacs getting | a handwritten letter | *be like.*"
//   3.6–49.2   ♈ opened it in half a second, replied by text · ♉ smelled the paper, then framed it · ♊ read it aloud in
//              five voices · ♋ laminated it, sleeps with it · ♌ skimmed for their own name, found it twice · ♍ corrected
//              the spelling, mailed it back · ♎ picking reply stationery, week three · ♏ studied the handwriting, found
//              their rising sign · ♐ lost it, replied from abroad · ♑ filed it: correspondence, Q3 · ♒ wrote back
//              in a code they invented · ♓ "thinking of you", sobbing, week two
//  49.2        "Two lines long. | *Weeks of feelings.*"
//  52.6        "The reply came back: | *also corrected.*"  Virgo's letter returns, red circles on the red circles.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#ff8fb1'

// ── props
const ENV = [
  'WWWWWWWWWWWWWWW',
  'WSWWWWWWWWWWWSW',
  'WWSSWWWWWWWSSWW',
  'WWWWSSWWWSSWWWW',
  'WWWWWWSRSWWWWWW',
  'WWWWWWWRWWWWWWW',
  'WWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWW',
]
const ENV_C = { W: PAPER, S: '#d9c9ac', R: RED }
const LENS = [
  '..GGGGG...',
  '.GSSSSSG..',
  'GSWSSSSSG.',
  'GSSSSSSSG.',
  'GSSSSSSSG.',
  'GSSSSSSSG.',
  '.GSSSSSG..',
  '..GGGGGHH.',
  '.......HHH',
  '........HH',
]
const LENS_C = { G: GOLD, S: 'rgba(143,227,255,0.55)', W: '#ffffff', H: '#8a4a2e' }

/** a sheet of paper (or any card): ink outline, shadow; fn draws inside in local coords */
function sheet(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
/** handwriting squiggles: n lines inside a w-wide sheet */
function scrawl(x, w, top, n, col = '#6b62a8', gap = 34) {
  x.strokeStyle = col; x.lineWidth = 4; x.lineCap = 'round'
  for (let r = 0; r < n; r++) {
    const y = top + r * gap, L = r === n - 1 ? w * 0.45 : w * 0.78
    x.beginPath(); for (let i = 0; i <= 20; i++) { const xx = -w / 2 + 26 + (L * i) / 20, yy = y + Math.sin(i * 1.9 + r) * 5; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke()
  }
}
/** a letter with red correction circles popping in (n of them) */
function corrected(x, cx, cy, k, rot, n, extra = 0) {
  sheet(x, cx, cy, 300, 380, k, rot, x => {
    x.fillStyle = INK; x.font = `italic 600 36px Georgia, serif`; x.textAlign = 'left'; x.fillText('Dear Virgo,', -124, -140)
    scrawl(x, 300, -86, 6)
    x.strokeStyle = RED; x.lineWidth = 5
    const C = [[-60, -86], [50, -18], [-20, 50], [70, 84], [-80, 118]]
    for (let i = 0; i < Math.min(n, C.length); i++) { x.beginPath(); x.ellipse(C[i][0], C[i][1], 46, 22, 0.1, 0, Math.PI * 2); x.stroke() }
    if (extra > 0) { x.lineWidth = 4; for (let i = 0; i < Math.min(extra, C.length); i++) { x.beginPath(); x.ellipse(C[i][0], C[i][1], 62, 32, -0.1, 0, Math.PI * 2); x.stroke() } }
    x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; if (n >= 5) x.fillText('B−', 100, 156)
  })
}

const ST = { x: -170 }, STR = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Opened it in half a second. | Replied *by text.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.25, 2), rip = prog(lt, 0.35, 0.5)
      drawBits(x, ENV, ENV_C, 790 - rip * 60, 900 + rip * 40, 18 * k, { rot: -0.2 * rip })
      if (rip > 0) drawBits(x, ENV.slice(0, 4), ENV_C, 830 + rip * 60, 820 - rip * 80, 18 * k, { rot: 0.4 * rip })
      bubble(x, 790, 650, 'got it lol', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, col: BONE, tail: 'bl' })
      label(x, 790, 1120, 'READ TIME: 0.5 S', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Smelled the paper. | Then *framed it.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), fr = pop01(t, P.t0 + 1.1, 0.3, 2.2)
      if (fr > 0.01) sheet(x, 790, 860, 330, 410, fr, 0.03, null, '#c98f5a')
      sheet(x, 790, 860, 260, 340, k, 0.03, x => scrawl(x, 260, -110, 6))
      if (lt < 1.1 && k > 0.5) { x.save(); x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 6; for (const d of [-30, 0, 30]) { x.beginPath(); for (let j = 0; j <= 8; j++) { const yy = 690 - j * 10, xx = 600 + d + Math.sin(j + t * 5) * 8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() } x.restore() }
      label(x, 790, 1120, 'NOTES: CEDAR, VANILLA', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 26, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Read it aloud. | In *five voices.*', mood: lt => ['wink', 'wide', 'squint', 'happy', 'sparkle'][Math.floor(lt * 2.2) % 5], look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 820, 960, 220, 270, pop01(t, P.t0 + 0.2, 0.3, 2), 0.06, x => scrawl(x, 220, -80, 5))
      const V = ['dear gemini…', 'DEAR GEMINI!', 'deeear…', 'Dear. Gemini.', 'dear gemini~']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.42))
      bubble(x, 790, 660, V[n], pop01(t, P.t0 + 0.35 + n * 0.42 * 1.29, 0.2, 2.2), { size: 44, col: n % 2 ? LAV : BONE, tail: 'bl' })
      label(x, 600, 1140, `VOICE ${n + 1}/5`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Laminated it. | *Sleeps with it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 870, 260, 330, k, -0.05, x => {
        scrawl(x, 260, -110, 6)
        const sh = (lt * 0.8) % 1.4 - 0.2
        x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.moveTo(-130 + sh * 300, -165); x.lineTo(-80 + sh * 300, -165); x.lineTo(-180 + sh * 300, 165); x.lineTo(-230 + sh * 300, 165); x.fill()
      })
      label(x, 790, 660, 'LAMINATED ×2', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) { x.save(); x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.globalAlpha = 0.8; x.fillText('z', 470, 720 - (lt - 1.3) * 40); x.fillText('Z', 500, 680 - (lt - 1.3) * 50); x.restore() }
      hearts(x, t, 790, 1000, P.t0 + 1.5, { n: 4, life: 1.5, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Skimmed it for their name. | *Found it twice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.9, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 880, 280, 360, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        scrawl(x, 280, -120, 7)
        x.fillStyle = 'rgba(255,211,58,0.75)'
        if (lt > 0.8) x.fillRect(-110, -64, 110, 30)
        if (lt > 1.3) x.fillRect(10, 38, 110, 30)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`
        if (lt > 0.8) x.fillText('LEO', -55, -48)
        if (lt > 1.3) x.fillText('LEO', 65, 54)
      })
      label(x, 790, 650, 'THE GOOD PARTS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Corrected the spelling. | *Mailed it back.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 1.8, 2.4))
      corrected(x, 790 + fly * 140, 870 - fly * 260, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - fly * 0.6), 0.04 + fly * 0.4, Math.floor(Math.max(0, lt - 0.4) / 0.22))
      label(x, 790, 1130, 'RETURN TO SENDER', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: RED, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking reply stationery. | *Week three.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const SW = ['#ff8fb1', '#b7a6ff', '#7dffb0', '#ffe7a8', '#8fe3ff']
      SW.forEach((c, j) => sheet(x, 640 + j * 75, 880 + (j % 2) * 30, 110, 150, pop01(t, P.t0 + 0.2 + j * 0.1, 0.25, 2), (j - 2) * 0.08, null, c))
      bubble(x, 790, 650, 'pink? lilac? | pink again?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1120, 'DECIDED: NOT YET', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Studied the handwriting. | Found *their rising sign.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 900, 280, 340, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => scrawl(x, 280, -110, 6))
      const mx = 760 + Math.sin(lt * 3) * 50, my = 860 + Math.cos(lt * 2.4) * 40
      drawBits(x, LENS, LENS_C, mx, my, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 650, 'RISING: GEMINI', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Lost the letter. | Replied *from abroad.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: STR, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 330, 880, 300, 210, pop01(t, P.t0 + 0.6, 0.3, 2), -0.08, x => {
        x.fillStyle = '#6fc3ff'; x.fillRect(-150, -105, 150, 210)
        x.fillStyle = '#5fd068'; x.fillRect(-130, -20, 90, 60); x.fillRect(-80, -70, 50, 50)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('greetings', 75, -40); x.fillText('from', 75, 0); x.fillText('a volcano!', 75, 40)
        x.fillStyle = RED; x.fillRect(100, -96, 40, 46)
      })
      label(x, 330, 650, 'AIRMAIL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 330, 1110, 'ARRIVED: 3 MONTHS LATER', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 24, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Filed it under | *“Correspondence, Q3.”*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 900, 280, 400, k, 0, x => {
        x.fillStyle = '#9aa5c4'; for (let r = 0; r < 3; r++) { x.fillRect(-120, -180 + r * 125, 240, 105); x.fillStyle = INK; x.fillRect(-40, -140 + r * 125, 80, 14); x.fillStyle = '#9aa5c4' }
        const pull = ease.outCubic(prog(lt, 0.7, 1.1)) * 40
        x.fillStyle = '#b8c1d8'; x.fillRect(-130, 70 + pull, 260, 105)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('Q3', 0, 120 + pull)
      }, '#6b62a8')
      const d = ease.inOutCubic(prog(lt, 1.2, 1.7))
      if (lt > 0.4) drawBits(x, ENV, ENV_C, 790, lerp(640, 960, d), 9, { alpha: 1 - prog(lt, 1.6, 1.75) })
      label(x, 790, 1150, 'FEELINGS: FILED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wrote back | in a code *they invented.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 290, 340, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = '#2a8fd8'; x.font = `800 40px ${MONO}`
        const R = ['◇△○ ◁▽', '□◇ △△○', '▽○◁ □', '◇ △▽○◇']
        R.forEach((r, i) => { if (lt > 0.4 + i * 0.25) x.fillText(r, 0, -100 + i * 64) })
      })
      label(x, 790, 1120, 'KEY: NOT INCLUDED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It said “thinking of you.” | *Sobbing. Week two.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, 280, 200, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `italic 600 38px Georgia, serif`; x.fillText('thinking', 0, -36); x.fillText('of you ♡', 0, 20)
        x.fillStyle = 'rgba(111,195,255,0.4)'; for (const [a, b] of [[-80, 60], [60, -60], [20, 70]]) { x.beginPath(); x.arc(a, b, 22, 0, Math.PI * 2); x.fill() }
      })
      label(x, 800, 650, 'TISSUES: ALL OF THEM', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: '#b7a6ff', rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'WORDS: 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0427', key: 'E', accent: ACC, ending: 'callback',
  title: 'Zodiacs getting | a handwritten letter | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Two lines long. | *Weeks of feelings.*' },
  last: {
    text: 'The reply came back: | *also corrected.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'virgo', 330, 1180, 260 * k, { mood: lt > 2.0 ? 'wide' : 'squint', look: [1, 0], seed: 33, hops: [t0 + 2.0] })
      corrected(x, 740, 1150, k, 0.05, 5, Math.floor(Math.max(0, lt - 1.0) / 0.2))
      label(x, 740, 1420, 'GRADE: B+', pop01(t, t0 + 2.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
