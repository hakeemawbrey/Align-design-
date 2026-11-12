// r2t0560: star_talk, BELIKE, "Asking for a raise? | Zodiacs be like." (topic: zodiacs asking for a raise; signs3kit social cut,
// music: lofi · F). Ending: group.
//   ♈ asked on day two · ♉ didn't ask, refused to leave · ♊ nine reasons, mid-elevator · ♋ brought the boss cookies
//   · ♌ made their own trophy · ♍ a footnoted 30-page case · ♎ asked, then apologized · ♏ silent stare, boss offered more
//   · ♐ negotiated vacation instead · ♑ asked for the raise and the job · ♒ asked for raises for everyone
//   · ♓ started crying, got the raise
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, confetti, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', ST = { x: -170 }
const CHAIR = ['.KKKKKK.', '.KRRRRK.', '.KRRRRK.', '.KRRRRK.', 'KKKKKKKK', 'KRRRRRRK', 'KKKKKKKK', '...KK...', '..KKKK..', '.K.KK.K.']

function stamp(x, cx, cy, text, k, col = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.font = `700 40px ${MONO}`; const w = x.measureText(text).width + 40
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-w / 2, -38, w, 76)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked for a raise. | *On day two.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'so, about | my raise', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 880, 'HIRED: YESTERDAY', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, 0.05, 32)
      L(x, 800, 1060, 'CONFIDENCE: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Didn’t ask. | *Refused to leave.*', mood: lt => lt < 1.3 ? 'squint' : 'sleepy', look: [1, 0], star: { x: -150, y: -60 },
    back(x, t, lt, P, F) { drawBits(x, CHAIR, { K: '#8a4a2e', R: '#5fd068' }, F.x, F.cy + 150, 24 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 800, 760, `STILL HERE: DAY ${Math.min(6, 1 + Math.floor(lt * 2.5))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 32)
      bubble(x, 800, 980, 'i’ll wait.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Pitched nine reasons. | *In the elevator.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const R = ['1. i’m great', '2. i’m fun', '3. gemini rising', '4. also great', '9. ding!']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.38))
      bubble(x, 800, 700, R[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 900, `FLOOR ${Math.min(30, 1 + Math.floor(lt * 13))}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.05, 34)
      L(x, 800, 1080, 'ELEVATOR PITCH: LITERAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'cancer', cap: 'Brought the boss | *homemade cookies.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 740 + i * 60, 860 - (i % 2) * 24, 9 * pop01(t, P.t0 + 0.4 + i * 0.12, 0.25, 2.2))
      L(x, 800, 680, 'NOT A BRIBE. LOVE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 470, 800, P.t0 + 1.0, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Brought a trophy. | *Made it themself.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 860, P.t0 + 0.8, 8, 210, 0.2)
      L(x, 800, 1080, 'BEST EMPLOYEE (BY ME)', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ffb34a', -0.04, 28)
    } },
  { sign: 'virgo', cap: 'A 30-page case. | *Footnoted.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'WHY ME: A STUDY', headBg: MINT, headInk: INK, lines: ['1. punctual¹', '2. organized²', '3. color-coded³', '¹ ² ³ see appendix'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'APPENDIX: B, C, D', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked for a raise. | Then *apologized.*', mood: lt => lt < 1.2 ? 'happy' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'could i maybe…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, 'SORRY! never | mind! love you!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      L(x, 800, 1100, 'NEGOTIATED: DOWN', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Silent stare. | Boss *offered more.*', mood: lt => lt < 1.4 ? 'squint' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 660, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, col: '#c97bff', tail: 'bl' })
      L(x, 800, 860, `SILENCE: ${Math.min(14, Math.floor(lt * 7))} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 32)
      bubble(x, 800, 1050, 'ok ok, MORE!', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 40, col: GOLD, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Skipped the money. | Got *more vacation.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 680, `DAYS OFF: ${Math.min(60, Math.floor(lt * 30))}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), '#ff9a4a', 0.05, 34)
      L(x, 800, 1100, 'OUT OF OFFICE: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Asked for the raise. | *And the job.*', mood: lt => lt < 1.3 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.2) L(x, 800, 860, 'TITLE: ASSISTANT', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.04, 34)
      else L(x, 780, 860, 'TITLE: THE BOSS', pop01(t, P.t0 + 1.2, 0.3, 2.6), GOLD, 0.04, 34)
      bubble(x, 800, 660, 'and your office.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.2) confetti(x, t, 800, 860, P.t0 + 1.2)
      L(x, 800, 1080, 'FIVE-YEAR PLAN: DAY 1', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#2fc79a', -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Asked for a raise. | *For everyone.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MEGA', 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 820, 920, 'raises | for all!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: '#6fc3ff', tail: 'bl' })
      L(x, 800, 1110, 'COWORKERS: CHEERING', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Started crying. | *Got the raise.*', mood: lt => lt < 1.3 ? 'wide' : 'heart', tears: lt => lt < 1.3 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 930, 'ok, ok! | raise!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'br' })
      stamp(x, 800, 1100, 'APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.6))
    } },
]

const F = makeFilm({
  id: 'r2t0560', key: 'F', accent: ACC, ending: 'group',
  title: 'Asking for a raise? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Know your worth. | *Ask anyway.*',
    draw(x, t, lt) { stamp(x, 540, 690, '✦ RAISE: APPROVED ✦', pop01(t, t - lt + 1.4, 0.3, 2.6), GOLD) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
