// r2t0281: star_talk, SOLO (cancer), "Cancers keeping | a secret be like." (~45 s vertical, signs3kit social cut, lofi · C)
// One Cancer, nine secrets kept, each pushed to the most extreme (and loyal) Cancer version.
//   0.0–3.6    "Cancers keeping a secret | *be like.*"
//   3.6–37.8   nine cards: kept it eleven years · diary with three padlocks · secret safe, face is not · mom asked, fake
//              sneeze · group chat begs, muted a week · nearly told the plant, apologised · a match asks, gets a soup
//              recipe · you forgot you told them, they filed it · too much pressure, back in the shell
//  37.8        "Lips sealed. | *Shell closed.*"
//  41.2        callback: "Still asking? | *Fourth padlock.*" the diary comes back with one more lock.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, GREY, DEEP, GREEN, WOOD } from './props.js'

const ACC = '#c9d6ff'
const ST = { x: -170 }

const LOCK = ['..SSSS..', '.SS..SS.', '.S....S.', '.S....S.', 'GGGGGGGG', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG', 'GGGGGGGG']
const LOCK_C = { S: '#c9c9d8', G: GOLD, K: INK }
const PLANT = ['..L...L..', '.LLL.LLL.', 'LLLLLLLLL', '.LLLLLLL.', '...LLL...', '....L....', 'PPPPPPPPP', '.PPPPPPP.', '.PPPPPPP.', '..PPPPP..']
const PLANT_C = { L: GREEN, P: '#c96a3a' }
const DROP = ['.B.', 'BBB', 'BWB', '.B.']

/** a pink diary with n padlocks down its edge (each pops at t0 + i·gap) */
function diary(x, t, cx, cy, k, n, t0, gap = 0.3, s = 1) {
  card(x, cx, cy, 260 * s, 330 * s, k, { bg: '#ff9fb8', rot: -0.04 }, () => {
    x.fillStyle = '#ff7fa0'; x.fillRect(-130 * s, -165 * s, 40 * s, 330 * s)
    txt(x, 'DIARY', 20 * s, -90 * s, { size: 40 * s })
    txt(x, 'keep out', 20 * s, -40 * s, { size: 24 * s, font: MONO, weight: 700, color: '#7a2a48' })
    for (let i = 0; i < n; i++) drawBits(x, LOCK, LOCK_C, 112 * s, (-10 + i * 62) * s - (n > 3 ? 60 * s : 0), 6 * s * pop01(t, t0 + i * gap, 0.3, 2.4))
  })
}
/** a grey filing cabinet whose drawers are years */
function cabinet(x, cx, cy, k) {
  card(x, cx, cy, 250, 380, k, { bg: GREY, rot: 0.03 }, () => {
    ;['2016', '2019', '2024'].forEach((y, i) => {
      const py = -120 + i * 120
      x.fillStyle = '#c3cbe0'; x.fillRect(-108, py - 50, 216, 100)
      x.fillStyle = INK; x.fillRect(-36, py + 18, 72, 12)
      txt(x, y, 0, py - 14, { size: 34, font: MONO, weight: 700 })
    })
  })
}

const CAMEOS = [
  { sign: 'cancer', cap: 'Kept your secret | for *eleven years.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', star: ST, hops: [1.7],
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 10)
      label(x, 790, 650, `YEAR ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Wrote it in a diary. | *Three padlocks.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { diary(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 3, P.t0 + 0.8, 0.35) } },
  { sign: 'cancer', cap: 'The secret is safe. | Their *face is not.*', mood: 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, squash: lt => 0.03 * Math.sin(lt * 20),
    front(x, t, lt, P, F) {
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); if (lt > 0.4) drawBits(x, DROP, { B: SKYB, W: '#fff' }, F.x + 120 + i * 26, F.top + 30 + ph * 90, 7, { alpha: 1 - ph }) }
      label(x, 790, 760, 'I KNOW NOTHING', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.05 })
      label(x, 790, 960, 'TOTALLY CALM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Your mom asked. | Cancer *faked a sneeze.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.2], squash: lt => lt > 1.2 && lt < 1.5 ? 0.12 : 0,
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 800, 700, 'so… any news?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 780, 940, 'ACHOO!!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 70, col: GOLD, tail: 'bl' })
      sparkles(x, t, 780, 940, P.t0 + 1.25, 6, 170, 0.5, [BONE, SKYB, BONE])
    } },
  { sign: 'cancer', cap: 'Group chat begged. | Cancer *muted it.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GROUP CHAT', headCol: PINK, lines: [['spill!!', PINK, pop01(t, P.t0 + 0.5, 0.25, 2)], ['we KNOW you know', MINT, pop01(t, P.t0 + 0.8, 0.25, 2)], ['hello??', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2)], ['HELLO???', LAV, pop01(t, P.t0 + 1.3, 0.25, 2)]] })
      label(x, 790, 1120, 'MUTED · 7 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Nearly told the plant. | *Apologised to it.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt < 1.3) bubble(x, 790, 700, 'okay, so the thing is—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      else bubble(x, 790, 700, 'sorry. forget that.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'A match asked for secrets. | Got *a soup recipe.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'NEW MATCH', headCol: MINT, lines: [['any secrets?', LAV, pop01(t, P.t0 + 0.5, 0.25, 2)], ['my soup recipe:', GOLD, pop01(t, P.t0 + 1.0, 0.25, 2)], ['step 1: love', PINK, pop01(t, P.t0 + 1.3, 0.25, 2)], ['step 2: more love', MINT, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
    } },
  { sign: 'cancer', cap: 'You forgot you told them. | *They filed it.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cabinet(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'YOUR SECRETS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Too much pressure? | *Back in the shell.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const up = ease.outBack(prog(lt, 0.8, 1.2))
      if (up > 0.01) {
        const base = F.cy + 190, R = 210, top = lerp(base + 60, F.cy + 10, up)
        x.save(); x.beginPath(); x.rect(F.x - 260, top - 10, 520, 400); x.clip()
        x.fillStyle = INK; x.beginPath(); x.ellipse(F.x, base, R + 10, base - top + 10, 0, Math.PI, 0); x.fill()
        x.fillStyle = '#ff8f6b'; x.beginPath(); x.ellipse(F.x, base, R, base - top, 0, Math.PI, 0); x.fill()
        x.fillStyle = '#e8684a'; for (let i = 1; i < 5; i++) { const a = Math.PI + i * Math.PI / 5; x.fillRect(F.x + Math.cos(a) * R * 0.6 - 8, base + Math.sin(a) * (base - top) * 0.6 - 30, 16, 60) }
        x.fillStyle = INK; x.fillRect(F.x - R - 20, base - 6, 2 * R + 40, 14)
        x.restore()
      }
      bubble(x, 800, 690, 'no one is home.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1000, 'DO NOT DISTURB', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0281', key: 'C', accent: ACC, solo: 'cancer', ending: 'callback',
  title: 'Cancers keeping | a secret *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Lips sealed. | *Shell closed.*', mood: 'wink' },
  last: {
    text: 'Still asking? | *Fourth padlock.*',
    draw(x, t, lt) {
      diary(x, t, 540, 1080, pop01(t, t - lt + 0.3, 0.4, 2), 4, t - lt + 0.8, 0.3, 1.2)
      sparkles(x, t, 670, 1080, t - lt + 1.75, 7, 160, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
