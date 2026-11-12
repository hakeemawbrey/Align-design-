// r2t0429: THE SIGNS AS… v3, "Zodiacs when someone says “small world” | be like." (~57 s vertical, signs3kit social
// cut, music: lofi · D). Twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "Zodiacs when someone | says “small world” | *be like.*"
//   3.6–49.2   ♈ already arguing it's actually huge (a globe) · ♉ hears "small", thinks small plates · ♊ already knows
//              them, five mutuals · ♋ invites them to dinner, family now · ♌ small because Leo's in it (a spotlight)
//              · ♍ "statistically, it's likely" · ♎ already planning the reunion · ♏ smiles mysteriously, leaves
//              · ♐ takes it as a challenge, books a flight · ♑ turns it into networking · ♒ zooms out: we're all space
//              dust · ♓ sobbing: we were meant to meet
//  49.2        "Two words. | *Twelve meltdowns.*"
//  52.6        "Aries, hours later: | *still measuring.*"  Aries with a tape measure round the globe.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#7dffb0'

// ── props
const PLATE = ['..WWWWW..', '.WWFFFWW.', 'WWFFFFFWW', '.WWFFFWW.', '..WWWWW..']
const PLANE = [
  '......WW......',
  '......WWW.....',
  'T.....WWWW....',
  'TT.WWWWWWWWWWB',
  'TTWWWWWWWWWWWW',
  '.......WWWW...',
  '......WWW.....',
  '......WW......',
]
const PLANE_C = { W: PAPER, T: '#ff6b5a', B: SKYB }

/** a little pixel globe, spinning (land blobs slide across) */
function globe(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3f8fe0'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#5fd068'
  const o = (t * 40) % (r * 4)
  for (const [ax, ay, w, h] of [[-0.6, -0.4, 0.5, 0.35], [0.3, -0.1, 0.6, 0.45], [-0.2, 0.45, 0.4, 0.25], [1.4, 0.2, 0.5, 0.4]]) {
    for (const sh of [0, -r * 4]) { x.beginPath(); x.ellipse(ax * r + o + sh - r, ay * r, w * r, h * r, 0.3, 0, Math.PI * 2); x.fill() }
  }
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.beginPath(); x.arc(-r * 0.35, -r * 0.4, r * 0.25, 0, Math.PI * 2); x.fill()
  x.restore(); x.restore()
}
function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}

const L = { x: -170 }, R = { x: 170 }
const SW = (x, t, P, at = 0.2) => bubble(x, 790, 620, 'small world!', pop01(t, P.t0 + at, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
const CAMEOS = [
  { sign: 'aries', cap: '“Small world”? | *It’s actually huge.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: L, hops: [0.9, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      SW(x, t, P)
      globe(x, t, 790, 900, 130, pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1120, 'DEBATE: STARTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#ff6b5a', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Heard “small.” | Thought *small plates.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      for (let j = 0; j < 5; j++) drawBits(x, PLATE, { W: PAPER, F: ['#ff6b5a', '#5fd068', '#ffb34a', '#c98f5a', PINK][j] }, 680 + (j % 3) * 110, 880 + Math.floor(j / 3) * 120 + (j % 2) * 20, 13 * pop01(t, P.t0 + 0.8 + j * 0.12, 0.25, 2))
      label(x, 790, 1140, 'ORDERED: ALL OF THEM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Already knew them. | *Five mutual friends.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      const N = [[680, 820], [900, 820], [790, 920], [680, 1030], [900, 1030]], k = ease.outCubic(prog(lt, 0.7, 1.3))
      if (k > 0.01) { x.save(); x.strokeStyle = BONE; x.globalAlpha = 0.6 * k; x.lineWidth = 4; for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) { x.beginPath(); x.moveTo(N[a][0], N[a][1]); x.lineTo(N[b][0], N[b][1]); x.stroke() } x.restore() }
      N.forEach(([nx, ny], j) => { const q = pop01(t, P.t0 + 0.8 + j * 0.1, 0.25, 2); if (q > 0.01) signChar(x, t, ['aries', 'leo', 'libra', 'aquarius', 'virgo'][j], nx, ny, 90 * q, { mood: 'happy', seed: 30 + j, glyph: false, glow: 0.6 }) })
      label(x, 790, 1150, 'MUTUALS: 5', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Invites them to dinner. | *Family now.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      SW(x, t, P)
      card(x, 790, 880, 300, 180, pop01(t, P.t0 + 0.8, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('DINNER, SUNDAY', 0, -40)
        x.fillStyle = '#ff6b5a'; x.font = `700 24px ${MONO}`; x.fillText('bring nothing.', 0, 10); x.fillText('stay forever.', 0, 44)
      })
      label(x, 790, 1100, 'ADOPTED ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 850, P.t0 + 1.8, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'It’s small because | *Leo’s in it.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.7, 1.0))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(330, 470); x.lineTo(410, 470); x.lineTo(560, 1160); x.lineTo(180, 1160); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      SW(x, t, P)
      globe(x, t, 820, 960, 60, pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 800, 800, 'WORLD: TINY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'LEO: ENORMOUS', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Corrects them: | *“Statistically likely.”*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      card(x, 790, 900, 300, 300, pop01(t, P.t0 + 0.8, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.fillRect(-120, -110, 4, 210); x.fillRect(-120, 98, 240, 4)
        x.fillStyle = '#2fc79a'; for (let i = 0; i < 6; i++) { const hh = 30 + Math.exp(-((i - 2.5) ** 2) / 2) * 150; x.fillRect(-104 + i * 38, 98 - hh * clamp((lt - 0.8) * 2), 30, hh * clamp((lt - 0.8) * 2)) }
      })
      label(x, 790, 1120, 'ACTUALLY…', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Already planning | *the reunion.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      card(x, 790, 900, 300, 220, pop01(t, P.t0 + 0.8, 0.3, 2), -0.04, x => {
        x.fillStyle = '#ff8fb1'; x.fillRect(-150, -110, 300, 60)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('REUNION!', 0, -80)
        x.font = `700 24px ${MONO}`; x.fillText('theme: pastels', 0, -10); x.fillText('guests: 1 (so far)', 0, 30); x.fillText('rsvp: pls', 0, 70)
      }, '#ffe7f0')
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 190, 0.3)
      label(x, 790, 1130, 'MET THEM: 4 MIN AGO', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Smiles mysteriously. | *Leaves.*', mood: lt => lt > 0.9 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      const k = pop01(t, P.t0 + 0.5, 0.3, 2), a = ease.outCubic(prog(lt, 1.0, 1.4))
      if (k > 0.01) {
        x.save(); x.translate(820, 1150); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-110, -420, 220, 420); x.fillStyle = '#ffe7a8'; x.fillRect(-100, -410, 200, 410)
        x.fillStyle = INK; x.fillRect(-105, -415, 210 * (1 - 0.8 * a), 420); x.fillStyle = '#6b3fa8'; x.fillRect(-100, -410, 200 * (1 - 0.8 * a), 410)
        x.restore()
      }
      label(x, 820, 800, 'EXIT: DRAMATIC', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Takes it as a challenge. | *Books a flight.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: R, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 330, 620, 'small world!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
      const f = ease.inOutCubic(prog(lt, 0.8, 2.3))
      globe(x, t, 330, 960, 110, pop01(t, P.t0 + 0.6, 0.3, 2))
      if (lt > 0.8) drawBits(x, PLANE, PLANE_C, 330 + Math.cos(f * Math.PI * 1.6) * 170, 960 + Math.sin(f * Math.PI * 1.6) * 150, 9, { rot: f * Math.PI * 1.6 + Math.PI / 2 })
      label(x, 330, 760, 'GATE 12: NOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Turns it into | *networking.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      card(x, 790, 900, 320, 180, pop01(t, P.t0 + 0.7, 0.3, 2.4), 0.06, x => {
        x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText('CAPRICORN', 0, -40)
        x.font = `700 22px ${MONO}`; x.fillStyle = '#2fc79a'; x.fillText('Head of Everything', 0, 2)
        x.fillStyle = '#6b62a8'; x.fillText('let’s circle back', 0, 46)
      })
      label(x, 790, 1110, 'NEW CONTACT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Zooms out. | *We’re all space dust.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      const z = ease.inOutCubic(prog(lt, 0.8, 1.8))
      globe(x, t, 790, 900, lerp(130, 14, z), pop01(t, P.t0 + 0.6, 0.3, 2))
      if (z > 0.2) { x.save(); x.globalAlpha = z; for (let i = 0; i < 30; i++) { x.fillStyle = i % 3 ? BONE : SKYB; x.fillRect(640 + (i * 53) % 300, 760 + (i * 37) % 300, 6, 6) } x.restore() }
      label(x, 790, 1120, 'PERSPECTIVE: COSMIC', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '*Sobbing.* | “We were meant to meet.”', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      SW(x, t, P)
      label(x, 790, 860, 'IT’S FATE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: '#b7a6ff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'THEY: AT THE DENTIST', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 8 })
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
  id: 'r2t0429', key: 'D', accent: ACC, ending: 'callback',
  title: 'Zodiacs when someone | says “small world” | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Two words. | *Twelve meltdowns.*' },
  last: {
    text: 'Aries, hours later: | *still measuring.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      globe(x, t, 720, 1220, 170, k)
      if (k > 0.5) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 16; x.beginPath(); x.ellipse(720, 1220, 186, 40, 0, 0, Math.PI * 2 * clamp(lt / 2)); x.stroke(); x.fillStyle = INK; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; if (a < Math.PI * 2 * clamp(lt / 2)) x.fillRect(720 + Math.cos(a) * 186 - 2, 1220 + Math.sin(a) * 40 - 6, 4, 12) } x.restore() }
      signChar(x, t, 'aries', 330, 1250, 250 * k, { mood: 'squint', look: [1, 0], seed: 31, hops: [t0 + 1.2, t0 + 2.4] })
      label(x, 720, 960, 'KM SO FAR: 12', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
