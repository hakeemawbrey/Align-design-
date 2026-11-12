// r2t0111: star_talk, BELIKE, "Planned day out? | Zodiacs be like." (~54 s vertical, signs3kit social cut, lofi · C)
// Twelve signs in zodiac order, each one's most extreme reaction to a friend's fully planned day out.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ did the whole itinerary by 9 a.m. · ♉ only read the lunch slot · ♊ invited every match, it's a festival
//              · ♋ packed snacks for three days · ♌ added a slot: Leo's photoshoot · ♍ returned it with red-pen notes
//              · ♎ still picking an outfit at 4 p.m. · ♏ checked everyone's birth chart first · ♐ wandered off at stop one,
//              postcard from somewhere else · ♑ sent a counter-plan with a budget · ♒ agreed, then did a different day
//              · ♓ cried at stop three, it was so nice
//  49.2        GROUP ending: "One plan. | *Twelve detours.*"  The itinerary unrolls, every line crossed out but "be together".
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  card, txt, list, phone, chat, clock, chart, RED, CREAM, ORANGE, SAGE, BROWN, GREY, WOOD,
  PLATE, PIZZA, PIZZA_C, SUITCASE, SUITCASE_C, PEN, FLOWER, FLOWER_C, COOKIE, COOKIE_C, SUN, CLOUD, TISSUE, TISSUE_C, HEARTBM,
} from './props.js'

const TEAL = '#5fd0ff'
const PLAN = ['9:00 MUSEUM', '12:00 LUNCH', '2:00 PARK', '5:00 SUNSET', '7:00 DINNER']
// a hanger with a little dress shape
const DRESS = ['...KK...', '..K..K..', '.KKKKKK.', '..CCCC..', '..CCCC..', '.CCCCCC.', 'CCCCCCCC', 'CCCCCCCC']
const BASKET = ['...BBBBBB...', '..B......B..', '.B........B.', 'WWWWWWWWWWWW', 'WRWRWRWRWRWR', 'WWWWWWWWWWWW', 'WRWRWRWRWRWR', '.WWWWWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Did the whole itinerary | by *9 a.m.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const n = Math.floor(prog(lt, 0.3, 1.3) * 5)
      list(x, 790, 800, pop01(t, P.t0 + 0.15, 0.3, 2), { title: 'THE PLAN', rows: PLAN.map((s, i) => ({ s, hi: i < n ? MINT : null })), size: 24 })
      clock(x, 790, 1090, pop01(t, P.t0 + 1.4, 0.3, 2.2), { h: 9, m: 0, r: 80 })
      label(x, 450, 640, 'DONE!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'taurus', cap: 'Only read | the *lunch slot.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      list(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), { title: 'THE PLAN', rows: PLAN.map((s, i) => i === 1 ? { s, hi: GOLD } : { s, col: '#c9c0b0' }), size: 24 })
      drawBits(x, PLATE, { W: CREAM }, 790, 1090, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      drawBits(x, PIZZA, PIZZA_C, 790, 1050, 10 * pop01(t, P.t0 + 1.1, 0.3, 2))
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Invited every match. | Now it’s *a festival.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        txt(x, 'MATCHES', 0, -h / 2 + 30, 22, LAV, { font: MONO, weight: 700 })
        const n = Math.floor(prog(lt, 0.3, 1.3) * 6)
        for (let i = 0; i < n; i++) chat(x, 'you’re invited!', w / 2 - 14, -h / 2 + 80 + i * 52, { right: true, col: i % 2 ? PINK : MINT, size: 20 })
      })
      label(x, 790, 1110, 'GUEST LIST: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed snacks | for *three days.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 7; i++) {
        const kk = pop01(t, P.t0 + 0.5 + i * 0.12, 0.25, 2.2)
        drawBits(x, COOKIE, COOKIE_C, 700 + (i % 4) * 60 + (i > 3 ? 30 : 0), 880 - Math.floor(i / 4) * 56 - (i % 2) * 14, 9 * kk)
      }
      drawBits(x, BASKET, { B: WOOD, W: CREAM, R: RED }, 790, 1000, 24 * k)
      label(x, 790, 640, 'JUST IN CASE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Added a stop: | *Leo’s photoshoot.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const add = lt > 0.9
      const rows = add ? [PLAN[0], { s: '10:00 ME, POSING', hi: GOLD }, ...PLAN.slice(1, 4)] : PLAN
      list(x, 790, 830, pop01(t, P.t0 + 0.15, 0.3, 2), { title: 'THE PLAN', rows, size: 24 })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 7, 180, 0.4)
      label(x, 790, 1120, 'MOST IMPORTANT ITEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Returned your plan | with *red-pen notes.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(prog(lt, 0.5, 1.6) * 4)
      list(x, 790, 830, pop01(t, P.t0 + 0.15, 0.3, 2), { title: 'THE PLAN', rows: PLAN.map((s, i) => ({ s, strike: i < n && i !== 2 ? RED : null })), size: 24 })
      if (n > 0) for (let i = 0; i < Math.min(n, 3); i++) { x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText(['too early', 'no.', 'why??'][i], 900 + (i % 2) * 20, 760 + i * 60) }
      drawBits(x, PEN, { R: RED, W: CREAM }, 980, 1000, 11 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: Math.sin(t * 14) * 0.08 })
      label(x, 790, 1120, 'GRADE: C+', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking an outfit. | It’s *4 p.m.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const cols = [PINK, SKYB, MINT, GOLD]
      x.fillStyle = INK; x.fillRect(640, 600, 300, 10)
      cols.forEach((c, i) => drawBits(x, DRESS, { K: INK, C: c }, 665 + i * 82, 700 + Math.sin(t * 2 + i) * 6, 12 * pop01(t, P.t0 + 0.15 + i * 0.1, 0.25, 2)))
      clock(x, 790, 960, pop01(t, P.t0 + 0.8, 0.3, 2), { h: 4, m: lerp(0, 50, prog(lt, 0.8, 2.2)), r: 100 })
      bubble(x, 420, 620, 'two more | minutes', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Checked everyone’s | *birth chart* first.', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2), { r: 140 })
      label(x, 790, 1060, 'GUESTS: CLEARED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'mm-hm.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Wandered off at stop one. | *New country.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [0.7, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, SUITCASE, SUITCASE_C, F.x + 120, F.cy + 80, 9 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 820, 300, 210, '#8fd0ff', { k: pop01(t, P.t0 + 0.9, 0.35, 2), rot: 0.06 }, x => {
        x.fillStyle = '#ffd08a'; x.fillRect(-150, 30, 300, 75)
        drawBits(x, SUN, { Y: GOLD }, -80, -40, 9)
        x.fillStyle = INK; x.fillRect(84, -86, 52, 62); x.fillStyle = PINK; x.fillRect(90, -80, 40, 50)
        txt(x, 'WISH U WERE', 0, 50, 24, INK, { font: MONO, weight: 700 })
        txt(x, 'HERE!', 0, 82, 24, INK, { font: MONO, weight: 700 })
      })
      label(x, 800, 1060, 'BACK: UNKNOWN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sent a counter-plan. | *With a budget.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 830, 340, 400, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        x.fillStyle = '#4c7a5a'; x.fillRect(-170, -200, 340, 60)
        txt(x, 'PLAN v2.xls', 0, -170, 26, CREAM, { font: MONO, weight: 700 })
        for (let j = 0; j < 7; j++) for (let i = 0; i < 3; i++) { x.strokeStyle = '#b9b0a0'; x.lineWidth = 2; x.strokeRect(-150 + i * 100, -126 + j * 44, 100, 44) }
        const n = Math.floor(prog(lt, 0.4, 1.4) * 7)
        for (let j = 0; j < n; j++) txt(x, ['$12', '$0', '$8', '$4', '$0', '$15', '$39'][j], 100, -104 + j * 44, 22, j === 6 ? RED : INK, { font: MONO, weight: 700 })
      })
      label(x, 790, 1110, 'APPROVED BY: ME', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Agreed to the plan. | Did *a different one.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 300, '#ead7a8', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.04 }, x => {
        const go = prog(lt, 0.6, 1.6)
        x.strokeStyle = '#b89a62'; x.lineWidth = 6; x.setLineDash([12, 10])
        x.beginPath(); x.moveTo(-120, 100); x.lineTo(120, -100); x.stroke()
        x.strokeStyle = TEAL; x.lineWidth = 8; x.setLineDash([])
        x.beginPath(); x.moveTo(-120, 100); x.lineTo(lerp(-120, -130, go), lerp(100, -110, go)); x.stroke()
        x.fillStyle = RED; x.fillRect(110, -110, 24, 24); x.fillStyle = TEAL; x.fillRect(-140, -122, 24, 24)
        txt(x, 'PLAN', 122, -70, 20, INK, { font: MONO, weight: 700 }); txt(x, 'ME', -128, -78, 20, INK, { font: MONO, weight: 700 })
      })
      bubble(x, 800, 1070, 'same vibe!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at stop three. | It was *so nice.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 300, '#ffb38a', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = '#ff8f6b'; x.fillRect(-160, 0, 320, 150)
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 10, 70, Math.PI, 0); x.fill()
        x.fillStyle = '#5fd068'; x.fillRect(-160, 70, 320, 80)
        drawBits(x, CLOUD, { W: CREAM }, -80, -90, 8)
      })
      drawBits(x, TISSUE, TISSUE_C, 800, 1070, 12 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 800, 600, 'STOP 3: PARK', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

// the group ending: the itinerary falls in front of the group photo, every stop crossed out but one
function groupDraw(x, t, lt) {
  const k = pop01(t, t - lt + 1.6, 0.4, 1.8)
  if (k <= 0.01) return
  const n = Math.floor(prog(lt, 2.0, 3.2) * 5)
  list(x, 540, 640, k, { title: 'THE PLAN', w: 420, rowH: 46, rot: -0.03, size: 26,
    rows: [...PLAN.map((s, i) => ({ s, strike: i < n ? RED : null })), { s: 'BE TOGETHER ✓', hi: lt > 3.3 ? MINT : null }] })
}

const F = makeFilm({
  id: 'r2t0111', key: 'C', accent: GOLD, ending: 'group',
  title: 'Planned day out? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One plan. | *Twelve detours.*', draw: groupDraw, moods: ['wide', 'heart', 'sparkle', 'happy', 'wink', 'squint', 'happy', 'wink', 'sparkle', 'neutral', 'wink', 'heart'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
