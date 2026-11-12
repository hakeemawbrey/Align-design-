// r2a0569: star_advice, ADVICE ROLL CALL, "Each sign's | *permission slip.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: each gets one warm permission, on a little permission slip that gets stamped GRANTED,
// plus one light visual gag. Ending: callback (Virgo's one dish comes back: still there, still fine).
//   ♈ rest before you win · ♉ change your mind · ♊ not reply today · ♋ be cared for, too · ♌ have an off day
//   · ♍ leave one dish · ♎ say no, kindly · ♏ let someone in · ♐ stay home and love it · ♑ log off at five
//   · ♒ need people · ♓ cry and still be strong.
//   group "Twelve slips. | *All signed.*"   last "Virgo, that one dish? | *Still fine.*" (the dish, still in the sink)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// the permission slip: header, one or two lines of permission, a GRANTED stamp that thumps down at lt = at
function slip(x, cx, cy, k, lt, lines, { rot = 0.04, at = 1.2, head = '#7dffb0' } = {}) {
  if (k <= 0.01) return
  const w = 340, h = 300
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = PAPER; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, 58)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 24px ${MONO}`; x.fillText('PERMISSION SLIP', 0, -h / 2 + 30)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('I MAY:', 0, -62)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`
  String(lines).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -16 + i * 40 - (a.length - 1) * 4))
  x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(-120, 104, 150, 3)
  x.fillStyle = '#6b62a8'; x.font = `italic 600 24px Georgia, serif`; x.fillText('the stars', -46, 90)
  // the stamp
  const s = prog(lt, at, at + 0.18)
  if (s > 0) {
    const sk = lerp(1.8, 1, ease.outCubic(s))
    x.save(); x.translate(90, 92); x.rotate(-0.22); x.scale(sk, sk); x.globalAlpha = clamp(s * 1.6)
    x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(-78, -24, 156, 48)
    x.fillStyle = RED; x.font = `800 28px ${INTER}`; x.fillText('GRANTED', 0, 2)
    x.restore()
  }
  x.restore()
}
const DISH = ['..WWWWWW..', '.WWBBBBWW.', 'WWBWWWWBWW', 'WWBWWWWBWW', '.WWBBBBWW.', '..WWWWWW..']
const DISH_C = { W: PAPER, B: '#8fe3ff' }
const SINK = ['GGGGGGGGGGGGGG', 'G............G', 'G............G', 'G............G', 'GGGGGGGGGGGGGG']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const PHONE = ['KKKKKK', 'KGGGGK', 'KGGGGK', 'KGGGGK', 'KGGGGK', 'KKKKKK']
const BLANKET = ['PPPPPPPPPPPP', 'PpPPpPPpPPpP', 'PPPPPPPPPPPP', 'PpPPpPPpPPpP']
const DOOR = ['KKKKKKK', 'KBBBBBK', 'KBBBBBK', 'KBBBYBK', 'KBBBBBK', 'KBBBBBK', 'KKKKKKK']
const SOFA = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPWWWWWWWWPP', 'PPPPPPPPPPPP', 'K..........K']
const LAPTOP = ['.KKKKKKKK.', '.KSSSSSSK.', '.KSSSSSSK.', '.KKKKKKKK.', 'KKKKKKKKKK']

const LS = { x: -190 }
const SL = (x, t, lt, P, lines, head) => slip(x, 770, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), lt, lines, { head })
const CAMEOS = [
  { sign: 'aries', cap: 'Permission to | *rest before you win.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) { SL(x, t, lt, P, 'nap. mid-race.', '#ff6b5a'); L(x, 790, 1080, 'STILL WINNING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30) } },
  { sign: 'taurus', cap: 'Permission to | *change your mind.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) { SL(x, t, lt, P, 'order something | new. or not.', '#5fd068'); L(x, 790, 1080, 'BOTH ARE FINE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30) } },
  { sign: 'gemini', cap: 'Permission to | *not reply today.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'leave it on | read. lovingly.', '#ffd23a')
      drawBits(x, PHONE, { K: INK, G: '#2a2350' }, 610, 1070, 18 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.2 })
      L(x, 850, 1080, '47 UNREAD. OKAY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'cancer', cap: 'Permission to | *be cared for, too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      SL(x, t, lt, P, 'sit down. | we’ve got dinner.', '#8fe3ff')
      if (lt > 1.4) drawBits(x, BLANKET, { P: PINK, p: '#ffd0e0' }, F.x, F.cy + 70, 16 * pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2))
      hearts(x, t, 790, 700, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Permission to | *have an off day.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      SL(x, t, lt, P, 'take the crown | off. just today.', '#ffb34a')
      const off = ease.inOutCubic(prog(lt, 0.6, 1.1))
      drawBits(x, CROWN, CROWN_C, lerp(F.x, 640, off), lerp(F.top - 24, 1080, off), 11, { rot: off * 0.4 })
      L(x, 870, 1080, 'STILL ROYAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Permission to | *leave one dish.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'one dish. | overnight.', '#7dffb0')
      drawBits(x, DISH, DISH_C, 630, 1080, 13 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 870, 1080, 'BREATHE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Permission to | *say no, kindly.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, '“no, thank you.” | full stop.', '#ff8fb1')
      bubble(x, 800, 650, 'no, thank you :)', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl', col: '#ffd0e0' })
    } },
  { sign: 'scorpio', cap: 'Permission to | *let someone in.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'open the door. | just a crack.', '#e23d4e')
      drawBits(x, DOOR, { K: INK, B: '#b5713a', Y: GOLD }, 610, 1060, 15 * pop01(t, P.t0 + 1.0, 0.3, 2), { sx: lerp(1, 0.6, clamp((lt - 1.3) * 2)) })
      L(x, 870, 1080, 'MATCH: SAFE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Permission to | *stay home and love it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'a trip to | the sofa.', '#c97bff')
      drawBits(x, SOFA, { P: '#c97bff', W: '#e3c8ff', K: INK }, 620, 1070, 17 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 870, 1080, 'DESTINATION: COZY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 24)
    } },
  { sign: 'capricorn', cap: 'Permission to | *log off at five.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'close the laptop. | 5:00 sharp.', '#9aa5c4')
      drawBits(x, LAPTOP, { K: INK, S: lt > 1.3 ? '#140c30' : '#8fe3ff' }, 630, 1075, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 870, 1080, 'WORK: IT’LL KEEP', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 24)
    } },
  { sign: 'aquarius', cap: 'Permission to | *need people.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'a group hug. | yes, you.', '#6fc3ff')
      const k = pop01(t, P.t0 + 1.4, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'leo', 620, 1050, 110 * k, { mood: 'heart', seed: 51, glyph: false, glow: 0.4 }); signChar(x, t, 'gemini', 960, 1050, 110 * k, { mood: 'heart', look: [-1, 0], seed: 52, glyph: false, glow: 0.4 }) }
    } },
  { sign: 'pisces', cap: 'Permission to | *cry and still be strong.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', tears: 3, look: [1, 0], star: LS,
    front(x, t, lt, P) {
      SL(x, t, lt, P, 'cry it out. | then carry on.', '#b7a6ff')
      L(x, 790, 1080, 'TISSUES: SUPPLIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

// keep the hook on two lines: shrink the title block if it runs wide
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
  id: 'r2a0569', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *permission slip.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve slips. | *All signed.*', moods: ['sleepy', 'heart', 'sleepy', 'heart', 'happy', 'squint', 'sparkle', 'heart', 'happy', 'happy', 'heart', 'heart'] },
  last: {
    text: 'Virgo, that one dish? | *Still fine.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.35, 2)
      drawBits(x, SINK, { G: '#9aa5c4' }, 540, 1030, 32 * k)
      drawBits(x, DISH, DISH_C, 540, 1010 + Math.sin(t * 2) * 4, 22 * k)
      L(x, 540, 1240, 'NOTHING BAD HAPPENED', pop01(t, t - lt + 1.4, 0.3, 2.4), MINT, -0.03, 30)
      sparkles(x, t, 540, 1000, t - lt + 1.2, 7, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
