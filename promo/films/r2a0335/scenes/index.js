// r2a0335: star_advice, ADVICE ROLL CALL (twelve signs), "Each sign’s | creative outlet." (~57 s vertical, signs3kit, lofi · G)
// The twelve signs in zodiac order, each with a warm, specific creative outlet and one light visual gag. Ending: callback.
//   0.0–3.6    "Each sign’s | *creative outlet.*"
//   3.6–49.2   Aries: dance it out · Taurus: pottery, slow hands · Gemini: journaling, every thought a page · Cancer:
//              scrapbooking memories · Leo: painting, loud colours · Virgo: knitting, calm in every stitch · Libra: styling
//              a room · Scorpio: writing, feel it all on paper · Sagittarius: sketching the world · Capricorn: building
//              things · Aquarius: inventing gadgets · Pisces: turning tears into songs (the guitar)
//  49.2        "Make something | *just for you.*"
//  52.6        callback: "Pisces’ new song? | *A total tearjerker.*" with the guitar and notes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', CLAY = '#d8875a'

// ── props
const VASE = [
  '...CCCC...',
  '...cCCc...',
  '..CCCCCC..',
  '.CCcCCCCC.',
  'CCCCCCCcCC',
  'CCcCCCCCCC',
  'CCCCCCCCCC',
  '.CCCCCcCC.',
  '..CCCCCC..',
  'WWWWWWWWWW',
]
const VASE_C = { C: CLAY, c: '#f0a87a', W: '#8a8aa0' }
const BOOK = [
  'KKKKKKKKKKKKK',
  'KPPPPPPKWWWWK',
  'KPLLLLPKWLLWK',
  'KPPPPPPKWWWWK',
  'KPLLLPPKWLLLK',
  'KPPPPPPKWWWWK',
  'KPLLLLPKWLLWK',
  'KPPPPPPKWWWWK',
  'KKKKKKKKKKKKK',
]
const BOOK_C = { K: INK, P: PAPER, W: PAPER, L: '#9a90d0' }
const EASEL = [
  '.KKKKKKKKKKK.',
  '.KWWWWWWWWWK.',
  '.KWRRWWYYWWK.',
  '.KWRRWWYYWWK.',
  '.KWWWBBWWWWK.',
  '.KWWWBBWWPWK.',
  '.KWWWWWWWPWK.',
  '.KKKKKKKKKKK.',
  '..D.....D....',
  '.D.......D...',
  'D.........D..',
]
const EASEL_C = { K: '#8a4a2e', W: PAPER, R: '#ff5a4f', Y: '#ffd23a', B: '#6fc3ff', P: '#c9a6ff', D: '#8a4a2e' }
const YARN = [
  '...PPPP...',
  '.PPpPPpPP.',
  'PPpPPpPPpP',
  'PpPPpPPpPP',
  'PPpPPpPPpP',
  '.PPpPPpPP.',
  '...PPPP...',
]
const NEEDLES = ['K.......K', '.K.....K.', '..K...K..', '...K.K...', '....K....']
const FRAME = [
  'GGGGGGGGGGG',
  'GSSSSSSSSSG',
  'GSSSSSSSSSG',
  'GSSSHHHSSSG',
  'GSSSSHSSSSG',
  'GSSSSSSSSSG',
  'GGGGGGGGGGG',
]
const FRAME_C = { G: GOLD, S: '#bfe7ff', H: '#ff8fb1' }
const TYPEWRITER = [
  '...WWWWWWW...',
  '...WLLLLLW...',
  '...WWWWWWW...',
  'KKKKKKKKKKKKK',
  'KGGGGGGGGGGGK',
  'KGkGkGkGkGkGK',
  'KGGkGkGkGkGGK',
  'KGGGGGGGGGGGK',
  'KKKKKKKKKKKKK',
]
const TYPEWRITER_C = { W: PAPER, L: '#9a90d0', K: INK, G: '#3a3270', k: '#c9c0f0' }
const MAP = [
  'BBBBBBBBBBBBB',
  'BBGGGBBBBBGBB',
  'BGGGGGBBBGGGB',
  'BBGGGBBBGGGGB',
  'BBBGBBBBBGGBB',
  'BBBBBBGGBBBBB',
  'BBBBBGGGGBBBB',
  'BBBBBBGGBBBBB',
]
const MAP_C = { B: '#6fc3ff', G: '#7dd87a' }
const BLOCKS = [
  '....YYYY....',
  '....YYYY....',
  '..RRRRBBBB..',
  '..RRRRBBBB..',
  'GGGGPPPPYYYY',
  'GGGGPPPPYYYY',
]
const BLOCKS_C = { Y: '#ffd23a', R: '#ff5a4f', B: '#6fc3ff', G: '#7dd87a', P: '#c9a6ff' }
const GEAR = [
  '...G.G.G...',
  '..GGGGGGG..',
  '.GGGGGGGGG.',
  'GGGG...GGGG',
  '.GGG...GGG.',
  'GGGG...GGGG',
  '.GGGGGGGGG.',
  '..GGGGGGG..',
  '...G.G.G...',
]
const GUITAR = [
  '..........KK',
  '.........KK.',
  '........DD..',
  '.......DD...',
  '......DD....',
  '..OOOOD.....',
  '.OOOOOOO....',
  'OOOKKOOO....',
  'OOKKKKOO....',
  'OOOKKOOO....',
  '.OOOOOO.....',
  '..OOOO......',
]
const GUITAR_C = { K: INK, D: '#8a4a2e', O: '#ffb34a' }

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Dance it out. | *Big feelings, loud music.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', ...S, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: '#ff5a4f', seed: 1, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      label(x, 790, 700, 'VOLUME: UP', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: '#ff5a4f', color: '#fff', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'STRESS: DANCED OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Pottery. | *Slow hands, calm heart.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', ...S,
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 910, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + 0.04 * Math.sin(lt * 5) })
      label(x, 790, 690, 'SPEED: GENTLE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 1080, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Journaling. | *Every thought, a page.*', mood: 'sparkle', ...S,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.04 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 40)
      label(x, 790, 1110, `PAGE ${n}. TODAY.`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Scrapbooking. | *Keep every memory.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = '#ffd6e2'; x.fillRect(-152, -122, 304, 244)
        const ph = [[-80, -50, -0.1, SKYB], [70, -40, 0.12, GOLD], [-60, 60, 0.08, MINT]]
        ph.forEach(([px, py, r, c], i) => { if (lt > 0.3 + i * 0.3) { x.save(); x.translate(px, py); x.rotate(r); x.fillStyle = '#fff'; x.fillRect(-60, -46, 120, 92); x.fillStyle = c; x.fillRect(-50, -36, 100, 62); x.restore() } })
        x.restore()
        if (lt > 1.2) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 870, 970, 9)
      }
      label(x, 790, 690, 'KEPT: ALL OF IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Painting. | *Your colours are loud.*', mood: 'sparkle', ...S, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, EASEL, EASEL_C, 790, 900, 21 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'GALLERY: YOUR WALL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Knitting. | *Calm in every stitch.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, YARN, { P: '#c9a6ff', p: '#9a78e0' }, 790, 940, 22 * k)
      drawBits(x, NEEDLES, { K: '#d8dbe8' }, 790, 780, 18 * k, { outline: null, rot: Math.sin(lt * 6) * 0.06 })
      label(x, 790, 1120, 'ROW 212. BREATHING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Styling a room. | *Make it lovely.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', ...S,
    front(x, t, lt, P) {
      const r = lt < 1.0 ? 0.22 : lerp(0.22, 0, ease.outBack ? ease.outBack(prog(lt, 1.0, 1.4)) : prog(lt, 1.0, 1.4))
      drawBits(x, FRAME, FRAME_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: r })
      label(x, 790, 1100, lt > 1.4 ? 'PERFECTLY STRAIGHT' : 'HMM…', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: lt > 1.4 ? GOLD : LAV, rot: 0.03 })
      if (lt > 1.4) sparkles(x, t, 790, 860, P.t0 + 1.45, 7, 180, 0.3)
    } },
  { sign: 'scorpio', cap: 'Writing. | *Feel it all on paper.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', ...S,
    front(x, t, lt, P) {
      drawBits(x, TYPEWRITER, TYPEWRITER_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lt < 1.5 ? Math.sin(lt * 30) * 0.01 : 0 })
      label(x, 790, 690, 'CHAPTER 1: FEELINGS', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'HEART: LIGHTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Sketching places. | *Draw the whole world.*', mood: 'sparkle', ...S, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.35))
      for (let i = 0; i < n; i++) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, [700, 860, 800][i], [850, 870, 960][i], 6)
      label(x, 790, 1120, 'NEXT PAGE: EVERYWHERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Building things. | *Make it real.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const h = clamp((lt - 0.2) / 1.2)
      x.save(); x.beginPath(); x.rect(500, 1060 - 340 * h, 600, 400); x.clip()
      drawBits(x, BLOCKS, BLOCKS_C, 790, 950, 26 * k)
      x.restore()
      label(x, 790, 720, 'BUILT: BY ME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Inventing gadgets. | *Your weird is genius.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', ...S, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GEAR, { G: '#9aa5c4' }, 740, 900, 20 * k, { rot: t * 1.2 })
      drawBits(x, GEAR, { G: GOLD }, 880, 800, 13 * k, { rot: -t * 1.8 })
      label(x, 790, 1110, 'INVENTION #9: WORKS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Music. | *Turn tears into songs.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 3, ...S,
    front(x, t, lt, P) {
      drawBits(x, GUITAR, GUITAR_C, 750, 940, 27 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      if (lt > 0.8) notes(x, t, 800, 820, { n: 4, cell: 8, col: SKYB, seed: 4 })
      label(x, 790, 1130, 'TRACK 1: FEELINGS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0335', key: 'G', accent: MINT, ending: 'callback',
  title: 'Each sign’s | *creative outlet.*',
  cameos: CAMEOS,
  group: { cap: 'Make something | *just for you.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'Pisces’ new song? | *A total tearjerker.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, GUITAR, GUITAR_C, 720, 1100, 28 * k, { rot: 0.1 })
      signChar(x, t, 'pisces', 380, 1120, 280 * k, { mood: 'heart', tears: 3, seed: 77, hops: [t - lt + 1.2] })
      if (lt > 0.8) notes(x, t, 560, 980, { n: 5, cell: 9, col: SKYB, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
