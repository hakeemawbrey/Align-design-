// r2a0517: star_advice, ADVICE SOLO, "Capricorn, you don't have | *to be perfect.*" (~43 s vertical, signs3kit social
// cut, music: lofi · F). One sign the whole way: nine kind truths for a Capricorn who holds themself to a very high bar,
// each with one small visual gag. Ending: group.
//   0.0–3.6    "Capricorn, you don't have | *to be perfect.*"
//   3.6–37.8   a typo in the email, nobody noticed · said "um" in the meeting, still nailed it · a day off, the office
//              survived · burnt toast is still breakfast · a B+ is a great grade · loved for you, not your résumé
//              · messy desk, genius at work · your match likes you on off days · add "rest" to the list, then tick it
//  37.8        "Not perfect. | *Still the GOAT.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#7dd8c0', GREY = '#9aa5c4', RED = '#e23d4e', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
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

const TOAST = ['.TTTTTTTT.', 'TTTTTTTTTT', 'TtBtttttBT', 'TtttBttttT', 'TttttttBtT', 'TtBttttttT', 'TttttBtttT', 'TTTTTTTTTT']
const TOAST_C = { T: '#c98f2a', t: '#ffcf7a', B: '#5a3a1e' }
const OFFICE = ['....KKKK....', '..KKKKKKKK..', '..KyKyKyKK..', '..KKKKKKKK..', '..KyKKyKyK..', '..KKKKKKKK..', '..KyKyKKyK..', '..KKKKKKKK..', '..KKKddKKK..', 'GGGGGddGGGGG']
const OFFICE_C = { K: '#6b62a8', y: '#ffe36a', d: '#2a2350', G: '#5fd068' }

const S = 'capricorn', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Typo in the email? | *Nobody noticed.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 280, 230, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('SENT', 0, -84)
        x.font = `800 30px ${INTER}`; x.fillText('Best regrads,', 0, -20)
        if (lt > 0.6) { x.fillStyle = RED; x.fillRect(46, 2, 64, 5) }
        x.fillStyle = GREY; x.fillRect(-100, 36, 200, 10); x.fillRect(-100, 62, 140, 10)
      })
      L(x, 800, 690, 'TYPOS: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 34, PAPER)
      L(x, 800, 1130, 'WORLD: FINE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Said “um” in the meeting? | *Still nailed it.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 290, 220, pop01(t, P.t0 + 0.2, 0.3, 2), -0.03, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('Q3 UPDATE', 0, -78)
        x.fillRect(-110, -50, 4, 120); x.fillRect(-110, 68, 220, 4)
        for (let i = 0; i < 4; i++) { x.fillStyle = '#2fc79a'; x.fillRect(-90 + i * 50, 60 - (i + 1) * 26, 34, (i + 1) * 26) }
      })
      bubble(x, 760, 680, 'um…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      L(x, 800, 1130, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 40)
    } },
  { sign: S, cap: 'Took a day off? | *The office survived.*', mood: lt => lt < 1.0 ? 'neutral' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, OFFICE, OFFICE_C, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'OUT OF OFFICE', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 800, 1170, 'BUILDING: STANDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Burnt the toast? | *Still breakfast.*', mood: lt => lt < 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 680, 'TOAST: RUSTIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'A B+? | *That’s a great grade.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 250, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('REPORT', 0, -118)
        x.fillStyle = '#2fc79a'; x.font = `800 120px ${INTER}`; x.fillText('B+', 0, 10)
        x.fillStyle = PINK; x.font = `800 26px ${INTER}`; if (lt > 1.0) x.fillText('so proud!', 0, 112)
      })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Loved for you. | *Not your résumé.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 250, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('RÉSUMÉ', 0, -130)
        for (let i = 0; i < 8; i++) { x.fillStyle = GREY; x.fillRect(-100, -96 + i * 30, 200 - (i % 3) * 40, 12) }
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('page 1 of 9', 0, 145)
      })
      if (lt > 1.0) bubble(x, 800, 660, 'we just | like you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      hearts(x, t, 800, 1000, P.t0 + 1.6, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Messy desk today? | *Genius at work.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) card(x, 760 + (i % 3) * 40, 1060 - i * 34, 200, 130, pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), [-0.2, 0.15, -0.08, 0.25, -0.12][i], x => { x.fillStyle = GREY; x.fillRect(-70, -30, 140, 10); x.fillRect(-70, -4, 100, 10); x.fillRect(-70, 22, 120, 10) })
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.5 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = PAPER; x.translate(720 + i * 80, 860 - ph * 200); x.rotate(ph * 3 + i); x.fillRect(-26, -32, 52, 64); x.restore() }
      L(x, 800, 690, 'FILING: CREATIVE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Your match likes you | *on off days too.*', mood: lt => lt < 1.2 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 260, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = DEEP; x.fillRect(-120, -170, 240, 340)
        x.fillStyle = PINK; x.font = `700 20px ${MONO}`; x.fillText('YOUR MATCH', 0, -140)
        const a = pop01(t, P.t0 + 0.6, 0.25, 2.2), b = pop01(t, P.t0 + 1.4, 0.25, 2.2)
        if (a > 0.01) { x.save(); x.translate(-10, -60); x.scale(a, a); x.fillStyle = BONE; x.fillRect(-100, -30, 200, 60); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText('i look a mess', 0, 2); x.restore() }
        if (b > 0.01) { x.save(); x.translate(10, 40); x.scale(b, b); x.fillStyle = MINT; x.fillRect(-100, -30, 200, 60); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText('cute mess tho', 0, 2); x.restore() }
      }, DEEP)
      hearts(x, t, 800, 1000, P.t0 + 1.8, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Add “rest” to the list. | *Then tick it.*', mood: lt => lt < 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 900, 270, 310, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('TO DO', 0, -122)
        const rows = ['emails', 'gym', 'taxes', 'REST']
        rows.forEach((r, i) => {
          const y = -70 + i * 58
          x.fillStyle = INK; x.fillRect(-110, y - 16, 32, 32); x.fillStyle = PAPER; x.fillRect(-106, y - 12, 24, 24)
          const tick = i < 3 || lt > 1.2
          if (tick) { x.fillStyle = '#2fc79a'; x.fillRect(-102, y - 8, 16, 16) }
          x.fillStyle = i === 3 ? '#2fc79a' : INK; x.font = `800 ${i === 3 ? 34 : 28}px ${INTER}`; x.textAlign = 'left'; x.fillText(r, -60, y + 2); x.textAlign = 'center'
        })
      })
      sparkles(x, t, 800, 960, P.t0 + 1.6, 6, 150, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0517', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, you don’t have | *to be perfect.*',
  cameos: CAMEOS,
  group: {
    cap: 'Not perfect. | *Still the GOAT.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
