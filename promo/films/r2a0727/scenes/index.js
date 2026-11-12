// r2a0727: star_advice, ADVICE SOLO (capricorn), "How to give a Capricorn | *space.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle ways to give a Capricorn room, each a relatable truth, a warm reframe and one gag.
// Ending: lesson.
//   busy is how they rest · quiet isn't mad, it's recharging · one text is enough · admire the plan, don't fix it
//   · leave snacks, leave the room · blank calendar on purpose · climbed a mountain alone (peak self-care)
//   · the callback is scheduled for Thursday · their chart says Saturn, Saturn says nap
//   group "Room to breathe. | *Room to love.*" · lesson "Space isn't distance. | It's *trust.*" · last "They'll come back | *with snacks.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, zzz, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#2fc79a', S = 'capricorn', ST = { x: -190 }
Object.assign(B, {
  SNACKS: ['..CCCC..CCCC..', '.CKCCCCCCKCCC.', 'PPPPPPPPPPPPPP', 'PWWWWWWWWWWWWP', '.PWWWWWWWWWWP.', '..PPPPPPPPPP..'],
  MOUNT: ['......R.......', '......RR......', '......K.......', '.....WWW......', '....WWWWW.....', '...GGGGGGG....', '..GGGGGGGGG...', '.GGGGGGGGGGG..', 'GGGGGGGGGGGGGG'],
})
Object.assign(C, { SNACKS: { C: '#d99a52', K: '#5a3420', P: STEEL, W: CREAM }, MOUNT: { R: RED, K: INK, W: '#ffffff', G: '#6b62a8' } })
/** a battery that fills up */
function battery(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillRect(130, -30, 26, 60)
  x.fillStyle = BONE; x.fillRect(-120, -60, 240, 120); x.fillRect(130, -22, 18, 44)
  x.fillStyle = NIGHT; x.fillRect(-108, -48, 216, 96)
  x.fillStyle = MINT; x.fillRect(-100, -40, 200 * clamp(p), 80)
  x.restore()
}
/** a week planner with mostly empty blocks */
function planner(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -160, 320, 320); x.fillStyle = CREAM; x.fillRect(-152, -152, 304, 304)
  x.fillStyle = ACC; x.fillRect(-152, -152, 304, 56); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -124)
  for (let i = 0; i < 7; i++) { x.fillStyle = i === 2 ? '#2fc79a' : 'rgba(154,165,196,0.35)'; x.fillRect(-136 + i * 40, -80, 32, i === 2 ? 60 : 220) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Busy is how they rest. | *Let them.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'STATUS: HAPPILY BUSY', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, -0.04, 30)
      bubble(x, 800, 1130, 'all good!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Quiet isn\'t mad. | It\'s *recharging.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      battery(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), (lt - 0.3) / 1.6)
      swapLabel(x, 800, 1100, lt, 1.6, 'CHARGING…', 'FULL. HI!', { size: 36, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'One text is enough. | *They\'ll answer.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CAP ♑︎', lines: [['here if u need', BONE, 1], ['ty. friday?', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true]], size: 24 })
      L(x, 800, 1150, 'TEXTS SENT: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Don\'t fix their plan. | *Admire it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'PLAN v12', headBg: ACC, lines: ['1. wake', '2. win', '3. nap', '4. win again'], size: 30, progress: clamp((lt - 0.3) / 1.0), align: 'left' })
      L(x, 900, 690, '★ GREAT PLAN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.08, 34)
    } },
  { sign: S, cap: 'Leave snacks. | *Leave the room.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SNACKS', 800, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const door = ease.inOutCubic(clamp((lt - 0.8) / 0.8))
      bits(x, 'DOORX', 860, 760, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: 1 - 0.6 * door })
      L(x, 760, 620, 'SERVICE: SILENT', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, -0.04, 30)
    } },
  { sign: S, cap: 'A blank day? | *Don\'t fill it.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      planner(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1120, 'BLANK ON PURPOSE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Climbed a mountain alone? | *Peak self-care.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MOUNT', 770, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1130, 'ALTITUDE: PEACEFUL', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 30)
      sparkles(x, t, 800, 720, P.t0 + 1.3, 7, 130, 0.4)
    } },
  { sign: S, cap: 'They\'ll call you back. | *On Thursday.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'CALLBACK: SCHEDULED', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 800, 1090, 'THU · 6:00 PM ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Their chart says Saturn. | Saturn says *nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      bits(x, 'PILLOW', 800, 1090, 16 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      if (lt > 1.4) zzz(x, t, 480, 700, { alpha: clamp((lt - 1.4) / 0.3), size: 46 })
    } },
]

const F = makeFilm({
  id: 'r2a0727', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to give a | Capricorn *space.*',
  cameos: CAMEOS,
  group: { cap: 'Room to breathe. | *Room to love.*', mood: 'happy' },
  lesson: { text: 'Space isn\'t far. | It\'s *trust.*', chip: 'SPACE: GIVEN' },
  last: { text: 'They\'ll come back | *with snacks.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
