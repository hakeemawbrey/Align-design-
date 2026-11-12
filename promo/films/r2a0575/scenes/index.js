// r2a0575: star_advice, ADVICE ROLL CALL, "What each sign | *would put in a time capsule.*" (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each with the one thing it would keep for the future: a warm, specific line and a light gag. Ending: lesson.
//   0.0–3.6    "What each sign | *would put in a time capsule.*"
//   3.6–49.2   ♈ their first medal · ♉ grandma's recipe card · ♊ forty notes to self · ♋ every birthday card, envelopes too
//              · ♌ a photo of their friends · ♍ a kind letter to future them, proofread · ♎ a playlist for their match
//              · ♏ a sealed envelope, open when ready · ♐ every ticket stub · ♑ a note: "rest more"
//              · ♒ a note for a stranger: "you belong" · ♓ a jar of happy tears
//  49.2        "Twelve capsules. | *All full of love.*"
//  52.4        LESSON UNLOCKED: "Keep what you love. | It *keeps you.*"  STATUS: SAVED
//  58.3        "Open in twenty years. | *Hug included.*"  the capsule closes with a heart on the lid.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffd36b', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SERIF = "'EB Garamond', Georgia, serif"

const MEDAL = ['RR...BB', '.RR.BB.', '..RBB..', '..YYY..', '.YYYYY.', 'YYYKYYY', 'YYKKYYY', 'YYYKYYY', '.YYYYY.', '..YYY..']
const TAPE = ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPWWWWWWWWPK', 'KPWKKWWKKWPK', 'KPWWWWWWWWPK', 'KPPPPPPPPPPK', 'KPPKKKKKKPPK', 'KKKKKKKKKKKK']
const JAR = ['.KKKKKKK.', '.GGGGGGG.', 'K.......K', 'KTTTTTTTK', 'KTtTTTtTK', 'KTTTTTTTK', 'KTTtTTTTK', 'KTTTTTTTK', '.KKKKKKK.']
const UFO = ['....GGG....', '...GSSSG...', '.MMMMMMMMM.', 'MMyMMyMMyMM', '.MMMMMMMMM.']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

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
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// the time capsule: a metal canister whose lid lifts off (open 0…1)
function capsule(x, cx, cy, k, open = 0, heart = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -96, 252, 206)
  x.fillStyle = '#c9c9d8'; x.fillRect(-118, -88, 236, 190)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(-118, -40 + i * 50, 236, 10)
  x.save(); x.translate(0, -100 - 120 * open); x.rotate(-0.3 * open)
  x.fillStyle = INK; x.fillRect(-140, -30, 280, 50); x.fillStyle = GOLD; x.fillRect(-132, -22, 264, 34)
  if (heart > 0.01) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, -60, 12 * heart)
  x.restore()
  x.restore()
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Their first medal. | *Brave since day one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, { R: RED, B: SKYB, Y: GOLD, K: '#c98f2a' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1120, 'AGE 6 · 1ST PLACE', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 800, 880, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Grandma’s recipe card. | *Love, in butter stains.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 320, 230, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, x => {
        txt(x, 'Sunday Cake', 0, -76, 40, INK, SERIF, 600)
        x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-120, -26 + i * 34, 220 - i * 40, 10)
        x.fillStyle = 'rgba(224,168,90,0.45)'; x.beginPath(); x.arc(90, 60, 40, 0, 7); x.fill(); x.beginPath(); x.arc(-80, 70, 24, 0, 7); x.fill()
      }, '#fff1d0')
      L(x, 800, 1110, 'NEVER WRITTEN DOWN: “A PINCH”', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 22)
    } },
  { sign: 'gemini', cap: 'Forty notes to self. | *Every idea mattered.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const N = ['learn harp', 'call mom', 'ask their sign!', 'start a band', 'nap?', 'be kind']
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.2) + 1)
      for (let i = 0; i < n; i++) { const c = i % 2, r = Math.floor(i / 2); card(x, 700 + c * 190, 720 + r * 150, 170, 120, 1, (i % 3 - 1) * 0.08, () => txt(x, N[i], 0, 0, 24, INK, INTER, 800), [GOLD, PINK, SKYB, MINT, LAV, ORANGE][i]) }
      L(x, 800, 1160, 'NOTE 40 OF 40', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Every birthday card. | *Envelopes too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) card(x, 800 + (i % 2 ? 14 : -14), 1040 - i * 56, 260, 130, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), (i % 2 ? 0.05 : -0.05), x => { x.strokeStyle = '#c8b89a'; x.lineWidth = 4; x.beginPath(); x.moveTo(-130, -65); x.lineTo(0, 10); x.lineTo(130, -65); x.stroke() }, [PAPER, '#ffd0e0', '#d8f0ff'][i % 3])
      L(x, 800, 650, 'SINCE AGE 1', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 32)
      if (lt > 1.4) hearts(x, t, 800, 760, P.t0 + 1.6, { n: 4, life: 1.3, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'A photo of their friends. | *Their real spotlight.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 870, 300, 330, k, 0.05, x => { x.fillStyle = '#2a2350'; x.fillRect(-130, -145, 260, 230) }, PAPER)
      if (k > 0.6) {
        x.save(); x.translate(800, 870); x.rotate(0.05); x.translate(-800, -870)
        const ids = ['leo', 'sagittarius', 'aries', 'libra']
        ids.forEach((id, i) => signChar(x, t, id, 730 + (i % 2) * 130 + (i > 1 ? 0 : 0), 780 + Math.floor(i / 2) * 100, 100, { mood: i ? 'happy' : 'sparkle', seed: 40 + i, glyph: false, glow: 0.4 }))
        txt(x, 'my people', 800, 1000, 30, INK, SERIF, 600)
        x.restore()
      }
      L(x, 800, 650, 'BEST PHOTO EVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), ORANGE, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'A kind letter to future them. | *Proofread.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 360, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        txt(x, 'Dear future me,', -120, -140, 30, INK, SERIF, 600, 'left')
        txt(x, 'you’re doing great.', -120, -90, 28, INK, SERIF, 600, 'left')
        x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-120, -40 + i * 40, 230, 10)
        if (lt > 1.1) { x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.arc(56, -90, 46, 0, 7); x.stroke(); txt(x, '✓', 120, 140, 50, '#2fc79a', INTER, 800) }
      })
      L(x, 800, 650, 'DRAFT 3 (FINAL)', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'A playlist for their match. | *Track one: you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, TAPE, { K: INK, P: PINK, W: PAPER }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 690, 'SIDE A: US', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.04, 32)
      if (lt > 1.2) hearts(x, t, 800, 1060, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'A sealed envelope. | *Open when you’re ready.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 320, 210, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.strokeStyle = '#c8b89a'; x.lineWidth = 5; x.beginPath(); x.moveTo(-160, -105); x.lineTo(0, 20); x.lineTo(160, -105); x.stroke()
        x.fillStyle = '#7a1020'; x.beginPath(); x.arc(0, 20, 38, 0, 7); x.fill()
        txt(x, '♏︎', 0, 22, 36, '#ffb0c0', "'Segoe UI Symbol','Noto Sans Symbols',serif", 700)
      })
      L(x, 800, 1100, 'NO RUSH. EVER.', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#c97bff', 0.04, 30, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Every ticket stub. | *Even the small trips.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], star: RS, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.25) + 1)
      const W = ['BUS 14', 'MUSEUM', 'FERRY', 'ZOO', 'PARK']
      for (let i = 0; i < n; i++) card(x, 300 + (i % 2 ? 30 : -30), 1040 - i * 80, 240, 80, 1, (i % 2 ? 0.07 : -0.06), () => { txt(x, `ADMIT ONE · ${W[i]}`, 0, 2, 22, INK, MONO, 700) }, [GOLD, SKYB, MINT, PINK, LAV][i])
      L(x, 300, 660, 'STUBS: 312', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'A note to future them: | *“Rest more.”*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 860, 290, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => { txt(x, 'rest more.', 0, -30, 46, INK, SERIF, 600); txt(x, 'you made it.', 0, 34, 40, '#2fc79a', SERIF, 600) }, '#e8fff4')
      L(x, 800, 1100, 'UNDERLINED TWICE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'A note for a stranger: | *“You belong.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 920, 280, 180, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, () => { txt(x, 'to whoever', 0, -40, 32, INK, SERIF, 600); txt(x, 'finds this:', 0, 0, 32, INK, SERIF, 600); txt(x, 'you belong.', 0, 52, 36, '#3a8fd0', SERIF, 700) })
      drawBits(x, UFO, { G: SKYB, S: '#d8f6ff', M: GREY, y: GOLD }, 820, 680 + Math.sin(t * 3) * 6, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 800, 1110, 'ANY PLANET WELCOME', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'A jar of happy tears. | *Labelled “worth it.”*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: 2, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, G: GOLD, T: SKYB, t: '#ffffff' }, 800, 880, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 900, 200, 70, pop01(t, P.t0 + 0.8, 0.3, 2), -0.03, () => txt(x, 'worth it', 0, 2, 38, INK, SERIF, 600))
      L(x, 800, 1150, 'VOLUME: OCEAN', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#b7a6ff', 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0575', key: 'G', accent: ACC, ending: 'lesson',
  title: 'What each sign | *would put in a time capsule.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve capsules. | *All full of love.*' },
  lesson: { text: 'Keep what you love. | It *keeps you.*', chip: 'STATUS: SAVED' },
  last: {
    text: 'Open in twenty years. | *Hug included.*',
    draw(x, t, lt) {
      const t0 = t - lt
      capsule(x, 540, 1560, 0.8 * pop01(t, t0 + 0.4, 0.4, 2), 1 - ease.inOutCubic(prog(lt, 1.0, 1.6)), pop01(t, t0 + 1.7, 0.3, 2.4))
    },
  },
})
export const DURATION = F.DURATION
// the hook's accent line is long: widen the title box so each ' | ' line stays on one line, then scale it to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-330px', width: '1740px', transformOrigin: '50% 0', transform: 'scale(0.6)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
