// Houston Star Talk: episode scripts (see promo/films/HOUSTON-STARTALK.md). Each one is a makeEpisode() spec
// (promo/films/starrace/ep.js) and ends on the party ticket (kit.js partyCard). Lines are short, affectionate, and
// grounded in real Houston lore; no brands, teams, events by trademarked name, stats, drink or disaster jokes.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, signChar, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, SIGN_IDS } from '../signs3kit.js'
import { streetSign, shield, skyline, car, freeway, heatSun, sweat, partyCard, inviteCard, taco, calendar, BRAKE, HGREEN } from './kit.js'

const Y = 1255
const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const NAME = id => id[0].toUpperCase() + id.slice(1)
const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
const night = (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) }
const nameTag = (x, id, cx, cy) => txt(x, id.toUpperCase(), cx, cy, { size: 34, col: BONE, font: MONO, weight: 700 })
const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))

// ── hst001 · Houston neighborhoods as zodiac signs (list)
const HOODS = [
  ['aries', 'MEMORIAL', 'already ran | the loop. twice.'],
  ['taurus', 'THE HEIGHTS', 'porch. dog. | never leaving.'],
  ['gemini', 'EADO', 'EaDo? East End? | yes.'],
  ['cancer', 'KATY', 'my cousins are | ALL in Katy.'],
  ['leo', 'UPTOWN', 'dressed up | to run errands.'],
  ['virgo', 'WEST U', 'the lawn is edged. | with a ruler.'],
  ['libra', 'RICE VILLAGE', "can't pick a shop. | can't find parking."],
  ['scorpio', 'MONTROSE', "knows a mural | you've never seen."],
  ['sagittarius', 'BELLAIRE BLVD', 'six-stop food crawl. | at midnight.'],
  ['capricorn', 'RIVER OAKS', 'five-year plan. | perfect hedges.'],
  ['aquarius', 'THE WOODLANDS', 'technically | not Houston.'],
  ['pisces', 'CLEAR LAKE', 'stares at the water. | dreams about space.'],
]
const SUBS = [['libra', 'SUGAR LAND', 'tidy. polished. | sweet.'], ['gemini', 'PEARLAND', 'the pear puns. | so many.'], ['sagittarius', 'CYPRESS', '45 minutes | from everything.'], ['virgo', 'SPRING', 'Spring or the Woodlands? | do not ask.']]
const crowd = (lt0 = 0) => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 120 + (i % 6) * 168, i < 6 ? Y - 210 : Y, 150]]]))
const wave = () => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [0.02 + (i % 6) * 0.07 + (i < 6 ? 0 : 0.04), 1.2 + (i % 6) * 0.07]]))   // frame-0 motion: a hop wave
const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const HST = {
  hst001: {
    hook: 'Houston neighborhoods | as zodiac signs', badge: BADGE, cues: STING, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'See you Jan 9, Houston.', stars: ['taurus', 'cancer', 'scorpio', 'aquarius'] }),
    scenes: [
      { dur: 2.4, set: (x, t, lt) => { night(x, t); streetSign(x, 540, 760, 'HOUSTON', { k: 1, pole: false, w: 620, sub: 'ALL 12 SIGNS' }) }, cast: crowd(), hops: wave(),
        mood: Object.fromEntries(SIGN_IDS.map((id, i) => [id, ['happy', 'wink', 'sparkle', 'wide'][i % 4]])) },
      ...HOODS.map(([id, hood, line]) => ({
        dur: 2.5, set: (x, t, lt) => { night(x, t); streetSign(x, 720, 760, hood, { k: Kp(lt, 0.02), w: Math.max(360, hood.length * 34 + 80) }) },
        front: (x, t, lt) => nameTag(x, id, 330, Y + 175),
        cast: { [id]: [[0, 330, Y, 290]] }, mood: { [id]: id === 'aquarius' ? 'eyeroll' : id === 'pisces' ? 'heart' : 'sparkle' }, look: { [id]: [0.8, -0.2] },
        lines: [[0.15, 2.2, id, line]],
      })),
      { dur: 2.2, set: (x, t, lt) => { night(x, t); const k = Kp(lt, 0.05, 0.35); if (k > 0) { x.save(); x.globalAlpha = clamp(k); txt(x, 'BONUS ROUND:', 540, 700, { size: 80, col: GOLD }); txt(x, 'THE SUBURBS', 540, 800, { size: 96, col: BONE }); x.restore() } }, cast: crowd(), hops: wave(),
        mood: Object.fromEntries(SIGN_IDS.map(id => [id, 'wide'])) },
      ...SUBS.map(([id, hood, line]) => ({
        dur: 2.5, set: (x, t, lt) => { night(x, t); streetSign(x, 720, 760, hood, { k: Kp(lt, 0.02), w: Math.max(360, hood.length * 34 + 80) }) },
        front: (x, t, lt) => nameTag(x, id, 330, Y + 175),
        cast: { [id]: [[0, 330, Y, 290]] }, mood: { [id]: 'wink' }, look: { [id]: [0.8, -0.2] },
        lines: [[0.15, 2.2, id, line]],
      })),
      { dur: 3.2, set: (x, t) => night(x, t), cast: crowd(),
        mood: Object.fromEntries(SIGN_IDS.map(id => [id, 'happy'])),
        front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k > 0) { x.save(); x.globalAlpha = clamp(k); txt(x, 'Wrong?', 540, 640, { size: 96, col: GOLD }); txt(x, 'Comment your sign', 540, 750, { size: 58, col: BONE }); txt(x, '+ side of town.', 540, 830, { size: 58, col: BONE }); x.restore() } } },
    ],
  },

  // ── hst002 · POV: a Scorpio on the 610 at 5pm (skit)
  hst002: (() => {
    const fw = (x, t, lt, opts = {}) => {
      const sun = opts.sunset ? 1 : 0
      if (sun) { const g = x.createLinearGradient(0, 300, 0, FLOOR); g.addColorStop(0, 'rgba(255,140,90,0.0)'); g.addColorStop(1, 'rgba(255,140,90,0.45)'); x.fillStyle = g; x.fillRect(0, 300, 1080, FLOOR - 300) }
      skyline(x, FLOOR - 150, t, { alpha: 0.8 })
      freeway(x, FLOOR - 160, 600, 3, 0)
      shield(x, 880, 640, '610', 0.9)
    }
    const carAt = (x, cx, cy, col, t, s = 1) => car(x, cx, cy, col, { brake: 0.7 + 0.3 * Math.sin(t * 3 + cx), s, open: true })
    const lane1 = FLOOR - 20, lane2 = FLOOR + 210
    return {
      hook: 'POV: a Scorpio | on the 610 at 5pm', badge: BADGE, cues: STING, endLen: 6.2,
      end: (x, t, lt) => partyCard(x, t, lt, { line: 'Worth the drive.', stars: ['scorpio', 'gemini', 'aries', 'pisces'] }),
      scenes: [
        { dur: 3.4, set: (x, t, lt) => fw(x, t, lt),
          back: (x, t) => { carAt(x, 120, lane1, '#7a5ab0', t, 0.85); carAt(x, 960, lane1, '#3a8f6a', t, 0.85) },
          front: (x, t) => { carAt(x, 540, lane2, '#b03a5a', t); txt(x, '5:01 PM', 540, 860, { size: 64, col: BRAKE, font: MONO, weight: 700 }) },
          cast: { scorpio: [[0, 520, lane2 - 120, 200]] }, mood: { scorpio: lt => lt > 2 ? 'squint' : 'neutral' },
          lines: [[0.4, 1.3, 'scorpio', "...it's fine."], [1.9, 1.4, 'scorpio', "I'm | fine."]] },
        { dur: 3.6, set: (x, t) => fw(x, t),
          back: (x, t, lt) => { carAt(x, 360, lane1, '#d8b23a', t, 0.9); const bl = Math.floor(t * 3) % 2; if (bl) { x.fillStyle = '#ffb35c'; x.fillRect(240, lane1 - 30, 18, 18); x.fillRect(470, lane1 - 30, 18, 18) } },
          front: (x, t) => carAt(x, 760, lane2, '#b03a5a', t),
          cast: { gemini: [[0, 340, lane1 - 110, 170]], scorpio: [[0, 740, lane2 - 120, 200]] }, mood: { gemini: 'sparkle', scorpio: 'squint' }, look: { scorpio: [-1, -0.3] },
          lines: [[0.3, 1.6, 'gemini', 'left lane? | right lane?'], [2.0, 1.4, 'gemini', '...both.']] },
        { dur: 3.4, set: (x, t) => fw(x, t),
          back: (x, t, lt) => { carAt(x, 700, lane1, '#e05a3a', t, 0.9); if (Math.floor(t * 6) % 2) txt(x, 'BEEP', 860, lane1 - 200, { size: 54, col: GOLD }) },
          front: (x, t) => carAt(x, 320, lane2, '#b03a5a', t),
          cast: { aries: [[0, 680, lane1 - 110, 170]], scorpio: [[0, 300, lane2 - 120, 200]] }, mood: { aries: 'squint', scorpio: 'eyeroll' },
          lines: [[0.3, 1.3, 'aries', 'GO GO GO!!'], [1.8, 1.5, 'scorpio', 'we are | not moving.']] },
        { dur: 3.4, set: (x, t) => fw(x, t),
          back: (x, t) => carAt(x, 400, lane1, '#c98e4a', t, 0.9),
          front: (x, t, lt, P) => { carAt(x, 760, lane2, '#b03a5a', t); const [cx, cy, s] = P.at('taurus'); taco(x, cx + s * 0.45, cy + 20, 0.9) },
          cast: { taurus: [[0, 380, lane1 - 110, 170]], scorpio: [[0, 740, lane2 - 120, 200]] }, mood: { taurus: 'happy', scorpio: 'neutral' },
          lines: [[0.3, 1.5, 'taurus', 'packed | breakfast tacos.'], [1.9, 1.3, 'taurus', 'I live | here now.']] },
        { dur: 3.4, set: (x, t) => fw(x, t, 0, { sunset: true }),
          back: (x, t) => carAt(x, 640, lane1, '#7a8fd8', t, 0.9),
          front: (x, t) => carAt(x, 300, lane2, '#b03a5a', t),
          cast: { pisces: [[0, 620, lane1 - 110, 170]], scorpio: [[0, 280, lane2 - 120, 200]] }, mood: { pisces: 'heart', scorpio: 'squint' },
          lines: [[0.3, 1.5, 'pisces', 'the skyline is | so beautiful.'], [1.9, 1.3, 'scorpio', "it's | 5:47."]] },
        { dur: 3.4, set: (x, t) => fw(x, t),
          back: (x, t) => { carAt(x, 420, lane1, '#ff8fd0', t, 0.9); if (Math.floor(t * 3) % 2) { x.fillStyle = '#ffb35c'; x.fillRect(530, lane1 - 30, 18, 18) } },
          front: (x, t) => carAt(x, 760, lane2, '#b03a5a', t),
          cast: { virgo: [[0, 400, lane1 - 110, 170]], scorpio: [[0, 740, lane2 - 120, 200]] }, mood: { virgo: 'squint', scorpio: 'neutral' },
          lines: [[0.3, 1.5, 'virgo', 'signal on | since Kirby.'], [1.9, 1.3, 'scorpio', 'merge, | Virgo.']] },
        { dur: 3.4, set: (x, t) => fw(x, t),
          back: (x, t) => carAt(x, 640, lane1, '#3a8f6a', t, 0.9),
          front: (x, t) => carAt(x, 300, lane2, '#b03a5a', t),
          cast: { capricorn: [[0, 620, lane1 - 110, 170]], scorpio: [[0, 280, lane2 - 120, 200]] }, mood: { capricorn: 'squint', scorpio: 'eyeroll' },
          lines: [[0.3, 1.5, 'capricorn', "on the phone: | 'five minutes away.'"], [1.9, 1.3, 'scorpio', "you're in | Pearland."]] },
        { dur: 3.4, set: (x, t) => fw(x, t),
          back: (x, t) => carAt(x, 380, lane1, '#ff8fb1', t, 0.9),
          front: (x, t) => carAt(x, 760, lane2, '#b03a5a', t),
          cast: { libra: [[0, 360, lane1 - 110, 170]], scorpio: [[0, 740, lane2 - 120, 200]] }, mood: { libra: 'wide', scorpio: 'squint' },
          lines: [[0.3, 1.5, 'libra', 'Texas U-turn? | or no U-turn?'], [1.9, 1.3, 'libra', '...both?']] },
        { dur: 3.4, set: (x, t) => { fw(x, t); box(x, 0, FLOOR + 460, 1080, 60, '#3a3450', 0); txt(x, 'FEEDER ROAD', 820, FLOOR + 490, { size: 28, col: BONE, font: MONO, weight: 700 }) },
          front: (x, t) => carAt(x, 300, lane2, '#b03a5a', t),
          cast: { sagittarius: [[0, 1250, FLOOR + 400, 150], [1.0, 760, FLOOR + 400, 150]], scorpio: [[0, 280, lane2 - 120, 200]] }, mood: { sagittarius: lt => lt > 2 ? 'wide' : 'sparkle', scorpio: 'neutral' },
          lines: [[1.0, 1.0, 'sagittarius', 'feeder road! | freedom!'], [2.2, 1.1, 'sagittarius', "...it's also | stuck."]] },
        { dur: 4.0, set: (x, t, lt) => { fw(x, t, 0, { sunset: true }); const k = Kp(lt, 0.2, 0.4); if (k > 0) { x.save(); x.translate(540, 600); x.scale(k, k); box(x, -330, -90, 660, 180, HGREEN, 8); x.strokeStyle = '#e8f1ea'; x.lineWidth = 5; x.strokeRect(-318, -78, 636, 156); txt(x, 'BETA PARTY', -40, -24, { size: 64, col: '#f4fbf6' }); txt(x, 'EXIT  JAN 9', -40, 44, { size: 44, col: '#f4fbf6', font: MONO, weight: 700 }); x.fillStyle = '#f4fbf6'; x.beginPath(); x.moveTo(250, -40); x.lineTo(300, 0); x.lineTo(250, 40); x.fill(); x.restore() } },
          front: (x, t) => carAt(x, 540, lane2, '#b03a5a', t),
          cast: { scorpio: [[0, 520, lane2 - 120, 200]] }, mood: { scorpio: lt => lt > 1.8 ? 'heart' : 'wide' }, look: { scorpio: [0, -1] },
          lines: [[0.6, 1.1, 'scorpio', '...wait.'], [1.9, 2.0, 'scorpio', "for THAT, I'd do | the 610 twice."]] },
      ],
    }
  })(),

  // ── hst003 · How each sign RSVPs to the Houston beta party (list)
  hst003: (() => {
    const R = [
      ['aries', "YES. I'll be | there early."], ['taurus', 'will there | be snacks?'], ['gemini', 'coming. | twice.'],
      ['cancer', 'can I bring my | cousin from Katy?'], ['leo', 'is there | valet?'], ['virgo', "jacket AND shorts. | it's January."],
      ['libra', 'maybe. yes. | maybe.'], ['scorpio', 'seen.'], ['sagittarius', 'in! | where is it?'],
      ['capricorn', "leaving now. | it's the 610."], ['aquarius', "I'll arrive | as a surprise."], ['pisces', "I'm already | crying."],
    ]
    return {
      hook: 'How each sign RSVPs | to the beta party', badge: BADGE, cues: STING, endLen: 6.2,
      end: (x, t, lt) => partyCard(x, t, lt, { line: 'Your RSVP? Comment your sign.', stars: ['scorpio', 'leo', 'pisces', 'cancer'] }),
      scenes: [
        { dur: 2.4, set: (x, t, lt) => { night(x, t); inviteCard(x, 540, 800, 1.1, t, 1); sparkles(x, t, 540, 800, 0, 10, 320, 4) }, cast: crowd(), hops: wave(),
          mood: Object.fromEntries(SIGN_IDS.map((id, i) => [id, ['sparkle', 'wide', 'happy', 'heart'][i % 4]])) },
        ...R.map(([id, line]) => ({
          dur: 1.85, set: (x, t, lt) => { night(x, t); inviteCard(x, 760, 760, 0.62, t, Kp(lt, 0.02)) },
          front: (x, t, lt) => { nameTag(x, id, 330, Y + 175); if (id === 'scorpio' && lt > 0.9) txt(x, 'read 5:02 PM', 330, 900, { size: 30, col: '#9a92a8', font: MONO, weight: 700 }) },
          cast: { [id]: [[0, 330, Y, 290]] }, mood: { [id]: id === 'scorpio' ? 'neutral' : id === 'libra' ? 'wide' : id === 'pisces' ? 'heart' : 'sparkle' }, look: { [id]: [0.8, -0.2] },
          lines: [[0.15, 1.6, id, line]],
        })),
        { dur: 3.0, title: 'JAN 9 · ARRIVALS', set: (x, t) => { night(x, t); calendar(x, 820, 820, 'JAN 9', '4:00', 1) },
          cast: { capricorn: [[0, 330, Y, 260]] }, mood: { capricorn: 'squint' },
          lines: [[0.3, 2.4, 'capricorn', 'two hours early. | it\'s the 610.']] },
        { dur: 3.0, set: (x, t) => { night(x, t); x.fillStyle = '#c0304a'; x.fillRect(240, FLOOR + 20, 600, 40); for (let k = 0; k < 4; k++) { if ((t * 3 + k) % 1 < 0.15) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(100 + k * 260, 500, 60, 60) } } },
          cast: { leo: [[0, 540, Y - 20, 280]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.1, 0.8] },
          lines: [[0.3, 2.4, 'leo', 'valet. | red carpet. me.']] },
        { dur: 3.0, set: (x, t) => night(x, t),
          cast: { gemini: [[0, 1250, Y, 240], [0.8, 300, Y, 240], [1.6, 300, Y, 240], [1.8, 780, Y, 240]] }, mood: { gemini: 'sparkle' },
          lines: [[0.9, 0.9, 'gemini', 'hi!'], [2.0, 0.9, 'gemini', 'hi again!']] },
        { dur: 3.0, set: (x, t) => night(x, t),
          cast: { cancer: [[0, 420, Y, 250]], aquarius: [[0, 760, -300, 220], [1.2, 760, Y, 220]] }, mood: { cancer: 'heart', aquarius: 'sparkle' },
          lines: [[0.2, 1.0, 'cancer', 'I brought | my cousin!'], [1.4, 1.5, 'aquarius', 'surprise | entrance.']] },
        { dur: 3.4, title: 'JAN 9 · THE PARTY', set: (x, t) => { night(x, t); for (let k = 0; k < 18; k++) { const ph = (t * 0.3 + k / 18) % 1; x.fillStyle = [GOLD, PINK, '#8fe3ff'][k % 3]; x.fillRect(80 + (k * 113) % 920, 520 + ph * 700, 14, 22) } },
          cast: { scorpio: [[0, 540, Y, 300]] }, mood: { scorpio: 'wink' },
          lines: [[0.5, 1.4, 'scorpio', 'first one | here.'], [2.0, 1.3, 'scorpio', 'I said | seen.']] },
      ],
    }
  })(),
}
