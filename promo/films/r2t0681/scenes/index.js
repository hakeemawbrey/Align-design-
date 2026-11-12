// r2t0681: star_talk, ROLLCALL, "The signs plan | *a wedding.*" (signs3kit social cut, music: lofi · C).
// Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one wedding planner per sign (3.8 s each), pushed to the extreme:
//              ♈ planned it overnight: it's tomorrow · ♉ the cake tasting, ate the cake · ♊ theme number eleven
//              · ♋ guest list 40 → 400 · ♌ booked a spotlight for the planner · ♍ seating chart to the millimetre
//              · ♎ ivory or eggshell, day nine · ♏ already knows who cries first (Pisces) · ♐ moved it up a mountain
//              · ♑ timed the first kiss · ♒ a robot ring bearer · ♓ cried at the invitation font
//  49.2        "Twelve planners. | *One aisle.*"
//  52.4        LESSON: "Love is the plan. | The rest is *details.*"  STATUS: I DO
//  58.3        "Pisces cried first. | *Scorpio called it.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER, SERIF } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Planned it overnight. | The wedding’s *tomorrow.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 800, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'WEDDING', headBg: RED, lines: ['when?', 'TOMORROW', '9 A.M.'], size: 40, progress: prog(lt, 0.3, 1.2) })
      bubble(x, 800, 1110, 'surprise!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Cake tasting. | Tasted *the whole cake.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P) {
      const gone = lt > 1.2
      if (!gone) bits(x, 'CAKE', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else { x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1010, 170, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(800, 1004, 160, 38, 0, 0, Math.PI * 2); x.fill(); bits(x, 'CRUMBS', 800, 990, 16) }
      L(x, 800, 650, gone ? 'CAKE LEFT: 0' : 'JUST A TASTE', 1, gone ? RED : GOLD, -0.04, 38)
      if (gone) bits(x, 'FORK', 920, 860, 14, { rot: 0.4 })
    } },
  { sign: 'gemini', cap: 'Changed the theme | *eleven times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P) {
      const TH = ['RUSTIC', 'BEACH', 'DISCO', 'CASTLE', 'SPACE', 'GARDEN', 'RETRO', 'JUNGLE', 'WINTER', 'CIRCUS', 'RUSTIC?']
      const n = Math.min(10, Math.floor(Math.max(0, lt - 0.2) / 0.18))
      L(x, 800, 700, `THEME ${n + 1}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.04, 44)
      L(x, 800, 900, TH[n], 1, [SKYB, GOLD, MINT, LAV, BONE][n % 5], -0.05, 48)
    } },
  { sign: 'cancer', cap: 'Guest list: 40. | Invited *everyone’s mum.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const n = Math.round(lerp(40, 400, ease.inOutCubic(prog(lt, 0.4, 1.6))))
      L(x, 800, 700, `GUESTS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), MINT, -0.04, 46)
      for (let i = 0; i < 6; i++) friend(x, t, ['aries', 'taurus', 'leo', 'virgo', 'libra', 'capricorn'][i], 660 + (i % 3) * 140, 920 + Math.floor(i / 3) * 140, 110, pop01(t, P.t0 + 0.6 + i * 0.18, 0.3, 2), { mood: 'happy', seed: 40 + i })
      bubble(x, 800, 1180, 'family!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Booked a spotlight. | *For the planner.*', mood: 'sparkle', star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 470); x.lineTo(410, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 800, 700, 'BRIDE: SIDE STAGE', pop01(t, P.t0 + 0.8, 0.3, 2), BONE, 0.04, 30)
      bubble(x, 800, 960, 'you’re welcome', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 370, 820, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Seating chart: | to the *millimetre.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); x.save(); x.globalAlpha = k; x.fillStyle = INK; x.beginPath(); x.arc(660 + i * 140, 900, 52, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(660 + i * 140, 900, 44, 0, Math.PI * 2); x.fill(); x.restore() }
      x.save(); x.globalAlpha = clamp((lt - 0.8) * 3); x.fillStyle = '#ffd23a'; x.fillRect(610, 990, 380, 26); x.fillStyle = INK; for (let i = 0; i < 19; i++) x.fillRect(616 + i * 20, 990, 3, i % 5 ? 10 : 18); x.restore()
      L(x, 800, 700, 'TABLE 2: 1MM LEFT', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Ivory or eggshell? | *Day nine.*', mood: lt => Math.floor(lt * 2) % 2 ? 'neutral' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = (cx, col, name, k) => { if (k <= 0.01) return; x.save(); x.translate(cx, 880); x.scale(k, k); x.fillStyle = INK; x.fillRect(-78, -108, 156, 216); x.fillStyle = col; x.fillRect(-70, -100, 140, 150); x.fillStyle = BONE; x.fillRect(-70, 50, 140, 50); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 76); x.restore() }
      const pick = Math.floor(lt * 2) % 2
      sw(700, '#fff6e6', 'IVORY', pop01(t, P.t0 + 0.2, 0.3, 2) * (pick ? 1 : 1.08))
      sw(890, '#fbf3e4', 'EGGSHELL', pop01(t, P.t0 + 0.35, 0.3, 2) * (pick ? 1.08 : 1))
      L(x, 800, 1110, 'DECISION: DAY 9', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Already knows | who’ll *cry first.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 740, 110, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      sheet(x, 800, 1050, pop01(t, P.t0 + 0.7, 0.3, 2), { w: 320, h: 180, head: 'CRIES FIRST', headBg: '#b04ad0', lines: ['PISCES.', '(obviously)'], size: 32, progress: clamp((lt - 0.9) / 0.8) })
    } },
  { sign: 'sagittarius', cap: 'Moved the wedding | *up a mountain.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.7, 1.1],
    front(x, t, lt, P) {
      bits(x, 'MOUNT', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'FLAG', 812, 700, 10 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      L(x, 800, 1130, 'GUESTS: HIKING', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Timed the first kiss. | *Four seconds.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = Math.min(4, Math.floor(Math.max(0, lt - 0.6) / 0.3))
      L(x, 800, 1080, s < 4 ? `KISS: 0:0${s}` : 'KISS: DONE. NEXT.', pop01(t, P.t0 + 0.6, 0.3, 2), s < 4 ? GOLD : MINT, 0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Ring bearer? | *A robot.* Obviously.', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), bx = lerp(980, 800, ease.outCubic(prog(lt, 0.2, 1.0)))
      const by = 1000 - Math.abs(Math.sin(t * 8)) * 8
      bits(x, 'ROBOT', bx, by, 22 * k)
      bits(x, 'RING', bx, by - 150, 13 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      sparkles(x, t, bx, by - 150, P.t0 + 1.2, 6, 110, 0.4)
      bubble(x, 800, 630, 'beep. i do.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at the | *invitation font.*', mood: 'wide', tears: 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -168, 290, 350); x.fillStyle = INK; x.fillRect(-152, -182, 304, 364); x.fillStyle = CREAM; x.fillRect(-144, -174, 288, 348)
        x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-124, -154, 248, 308)
        x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `italic 500 44px ${SERIF}`; x.fillText('you’re', 0, -70); x.fillText('invited', 0, -18)
        x.font = `700 20px ${MONO}`; x.fillText('SAT · 4 PM', 0, 60)
        x.restore()
      }
      bubble(x, 800, 1150, 'the SWIRLS', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0681', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs plan | *a wedding.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve planners. | *One aisle.*' },
  lesson: { text: 'Love is the plan. | The rest is *details.*', chip: 'STATUS: I DO' },
  last: {
    text: 'Pisces cried first. | *Scorpio called it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      chart(x, 400, 1580, 70, pop01(t, t0 + 0.6, 0.35, 2), t)
      L(x, 650, 1580, 'CALLED IT', pop01(t, t0 + 1.2, 0.3, 2.4), '#b04ad0', -0.05, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
