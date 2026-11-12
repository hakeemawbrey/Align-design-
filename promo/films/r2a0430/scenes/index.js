// r2a0430: star_advice, ADVICE ROLL CALL, "What to say | when each sign is sad." (~61 s vertical, signs3kit social
// cut, music: lofi · G). One warm, specific line per sign with a light visual gag. Ending: lesson.
//   0.0–3.6    "What to say | *when each sign is sad.*"
//   3.6–49.2   ♈ "wanna go for a walk?" · ♉ "i brought cookies." · ♊ "tell me everything." · ♋ "you're not too much."
//              · ♌ "you're still the best." · ♍ "you did enough." · ♎ "you don't have to pick yet." · ♏ "i'm here. no
//              questions." · ♐ "let's plan an escape." · ♑ "you're allowed to rest." · ♒ "you don't have to explain."
//              · ♓ "cry. i'll stay."
//  49.2        "Different words. | *Same love.*"
//  52.4        LESSON UNLOCKED: "Sometimes the right words | *are just “I’m here.”*"  HEARD: ALL 12
//  58.3        "Hugs also work. | *For every sign.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ff8fb1'

// ── props
const COOKIE = ['..CCCC..', '.CcCCcC.', 'CCCCCCCC', 'CcCCCCcC', 'CCCcCCCC', '.CCCCcC.', '..CCCC..']
const COOKIE_C = { C: '#e8a24a', c: '#6b3a1e' }
const CROWN = ['G..G..G', 'GG.G.GG', 'GGGGGGG', 'GRGGGRG', 'GGGGGGG']
const TISSUE = ['...WWW...', '..WWWWW..', 'BBBBBBBBB', 'BbBBBBBbB', 'BBBBBBBBB', 'BBBBBBBBB']
const SHOE = ['..RRRR....', '.RRRRRRR..', 'RRRRRRRRRR', 'WWWWWWWWWW']

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
const sad = at => lt => lt < at ? 'neutral' : 'happy'
const CAMEOS = [
  { sign: 'aries', cap: '“Wanna go for a walk?” | *Movement helps.*', mood: sad(1.2), look: [1, 0], star: L, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: '#ff6b5a', W: PAPER }, 760, 1040, 16 * pop01(t, P.t0 + 0.3, 0.3, 2)); drawBits(x, SHOE, { R: '#ff6b5a', W: PAPER }, 860, 1060, 16 * pop01(t, P.t0 + 0.45, 0.3, 2))
      bubble(x, 790, 700, 'wanna go | for a walk?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 880, 'SAD: WALKED OFF', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“I brought cookies.” | *Say less.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let j = 0; j < 5; j++) drawBits(x, COOKIE, COOKIE_C, 700 + (j % 3) * 90, 1000 - Math.floor(j / 3) * 70, 12 * pop01(t, P.t0 + 0.6 + j * 0.1, 0.25, 2))
      bubble(x, 790, 700, 'i brought | cookies.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1130, 'COMFORT: DELIVERED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '“Tell me everything.” | *Then really listen.*', mood: sad(1.0), look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'tell me | everything.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      bubble(x, 760, 880, 'okay so first…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, 'STILL LISTENING ✓', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: '“You’re not too much.” | *Mean it.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'you’re not | too much.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 52, col: SKYB, tail: 'bl' })
      label(x, 790, 1000, 'FEELINGS: WELCOME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: '“You’re still the best.” | *Remind them.*', mood: sad(1.1), look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P, F) {
      const c = ease.outBack ? ease.outCubic(prog(lt, 0.9, 1.2)) : 1
      drawBits(x, CROWN, { G: GOLD, R: '#ff6b5a' }, 370, lerp(540, F.top - 20, c), 14 * pop01(t, P.t0 + 1.1, 0.25, 2))
      bubble(x, 790, 760, 'still the | best. always.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1000, 'STILL ICONIC', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 700, P.t0 + 1.6, 6, 160, 0.3)
    } },
  { sign: 'virgo', cap: '“You did enough.” | *Really.*', mood: sad(1.4), look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('TODAY', 0, -130)
        for (let r = 0; r < 4; r++) { x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-120, -70 + r * 60, 200, 10); x.fillStyle = '#2fc79a'; x.font = `800 40px ${INTER}`; if (lt > 0.5 + r * 0.2) x.fillText('✓', 110, -66 + r * 60) }
      })
      label(x, 790, 1110, 'ENOUGH ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“You don’t have to | *pick right now.*”', mood: sad(1.3), look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tilt = lt < 1.3 ? Math.sin(t * 4) * 0.18 : 0
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = GOLD; x.fillRect(-6, -40, 12, 200); x.fillRect(-60, 150, 120, 14)
        x.rotate(tilt); x.fillRect(-150, -46, 300, 12)
        for (const d of [-1, 1]) { x.fillStyle = BONE; x.fillRect(d * 140 - 3, -40, 6, 70); x.fillStyle = d < 0 ? PINK : LAV; x.fillRect(d * 140 - 50, 30, 100, 20) }
        x.restore()
      }
      label(x, 790, 680, 'DECISION: LATER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“I’m here.” | *No questions asked.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 740, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 790, 690, 'i’m here.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, col: SKYB, tail: 'bl' })
      label(x, 790, 1130, 'QUESTIONS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Let’s plan an escape.” | *Even a small one.*', mood: sad(1.1), star: R, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 330, 880, 330, 170, pop01(t, P.t0 + 0.3, 0.3, 2), -0.05, x => {
        x.fillStyle = '#ff9a4a'; x.fillRect(-165, -85, 90, 170)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText('DAY TRIP', 40, -30)
        x.font = `700 24px ${MONO}`; x.fillText('SAT · THE LAKE', 40, 16); x.fillText('ADMIT 2', 40, 52)
      })
      label(x, 330, 670, 'MOOD: LIFTING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“You’re allowed | *to rest.*”', mood: lt => lt < 1.2 ? 'neutral' : 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shut = ease.inOutCubic(prog(lt, 0.9, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(790, 1000); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, 0, 340, 24); x.fillStyle = '#9aa5c4'; x.fillRect(-164, 4, 328, 16)
        const h = 220 * Math.cos(shut * Math.PI / 2)
        x.fillStyle = INK; x.fillRect(-150, -h - 4, 300, h + 4); x.fillStyle = '#2a2350'; x.fillRect(-142, -h + 4, 284, Math.max(0, h - 8))
        if (h > 60) { x.fillStyle = '#ff6b5a'; for (let r = 0; r < 3; r++) x.fillRect(-120, -h + 24 + r * 50, 240, 30) }
        x.restore()
      }
      label(x, 790, 720, 'OUT OF OFFICE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: '“You don’t have | *to explain it.*”', mood: sad(1.3), look: [1, -1], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s complicated…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      bubble(x, 790, 900, 'you don’t | have to explain.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
      label(x, 790, 1110, 'SPACE: GIVEN', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“Cry. I’ll stay.” | *Bring tissues.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: '#b7a6ff', b: '#e8e2ff' }, 800, 1000, 24 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 700, 'cry. | i’ll stay.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 48, col: '#b7a6ff', tail: 'bl' })
      label(x, 790, 1150, 'BOX 2 OF 2', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

// the long hook: shrink the title so it fits the width and stays above the stage card's name tab
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
  id: 'r2a0430', key: 'G', accent: ACC, ending: 'lesson',
  title: 'What to say | *when each sign is sad.*',
  cameos: CAMEOS,
  group: { cap: 'Different words. | *Same love.*' },
  lesson: { text: 'Sometimes the right words | *are just “I’m here.”*', chip: 'HEARD: ALL 12' },
  last: {
    text: 'Hugs also work. | *For every sign.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 10, life: 2.0, spread: 700, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
