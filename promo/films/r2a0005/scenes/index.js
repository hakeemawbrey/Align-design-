// r2a0005: star_advice, ADVICE ROLLCALL, "Each sign’s cure | for overthinking." (topic: how each sign can stop overthinking) (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific way each sign can quiet an overthinking spiral, each with a light gag.
// Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ one breath before you hit send · ♉ a slow walk loosens thoughts · ♊ pick one thought, the rest take a number
//              · ♋ ask, don't guess (are we ok? obviously) · ♌ one weird moment? nobody remembers · ♍ the frame is a bit crooked, leave it
//              · ♎ can't pick a flavour? both are lovely · ♏ "k." just means k · ♐ big plans, start with step one
//              · ♑ rest is part of the plan (NAP in the planner) · ♒ say what's in your head out loud · ♓ cry it out, then water
//  49.2        group (the ending): "Breathe in. | *Breathe out.*"  Over the photo: OVERTHINKING: OFF.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9be3b0', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'

// ── props
const SHOE = ['.SSSS.....', '.SWSS.....', '.SSSSSSS..', 'SSSSSSSSSS', 'KKKKKKKKKK']
const LEAF = ['..GG', '.GGG', 'GGG.', 'GG..']
const CONE = ['.PPPP.', 'PPPPPP', '.PPPP.', '.WWWW.', '..WW..', '..WW..', '...W..']
const GLASS = ['W......W', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WBBBBW.', '.WWWWWW.']
const GLASS_C = { W: '#dfe6f2', B: SKYB }
const FRAME = ['GGGGGGGGGG', 'GKKKKKKKKG', 'GKSSSSSSKG', 'GKSmmSSSKG', 'GKSmmmmSKG', 'GKKKKKKKKG', 'GGGGGGGGGG']
const FRAME_C = { G: GOLD, K: '#c98f2a', S: SKYB, m: '#7a86b8' }
const STAIRS = ['........SS', '......SSSS', '....SSSSSS', '..SSSSSSSS', 'SSSSSSSSSS']

// a big round SEND button with a pause sign on it
function sendBtn(x, cx, cy, k, paused) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = paused ? LAV : '#ff6b5a'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK
  if (paused) { x.fillRect(-36, -44, 24, 88); x.fillRect(12, -44, 24, 88) }
  else { x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND', 0, 2) }
  x.restore()
}
// little thought clouds queueing up
function thoughts(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const TXT = ['the email', 'that thing I said', 'dinner?', 'sharks??']
  TXT.forEach((s, i) => {
    const kk = pop01(t, t - lt + 0.2 + i * 0.12, 0.25, 2.2) * k
    if (kk <= 0.01) return
    const front = i === 0
    bubble(x, cx + (i % 2 ? 60 : -40), cy + i * 120 - 160, front ? s : `${i + 1}. ${s}`, kk * (front ? 1.15 : 0.85), { size: 30, col: front ? MINT : LAV, tail: 'bl' })
  })
}
// a planner page with a NAP block
function planner(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = CREAM; x.fillRect(-142, -192, 284, 384)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const H = ['9', '10', '11', '12', '1', '2', '3', '4']
  H.forEach((h, i) => { x.fillStyle = '#b9b0a0'; x.fillRect(-90, -170 + i * 46, 210, 2); x.fillStyle = INK; x.fillText(h, -126, -160 + i * 46) })
  x.fillStyle = '#9aa5c4'; x.fillRect(-84, -164, 190, 80); x.fillRect(-84, 20, 190, 34)
  const nk = clamp((lt - 0.8) * 3)
  if (nk > 0) { x.save(); x.globalAlpha = nk; x.fillStyle = LAV; x.fillRect(-84, -72, 190, 84); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText('NAP', 10, -30); x.restore() }
  x.restore()
}
// a phone with two lines
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -90 + i * 90); x.scale(kk, kk)
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 34
    x.fillStyle = col; x.fillRect(-w / 2, -30, w, 60); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'One breath | *before you hit send.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, hops: [0.3],
    front(x, t, lt, P) {
      sendBtn(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0)
      label(x, 790, 1100, 'INHALE… OK.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Take a slow walk. | *Thoughts loosen up.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, SHOE, { S: GREEN, W: CREAM, K: INK }, 760 + Math.sin(lt * 4) * 30, 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) { const ph = (t * 0.4 + i / 5) % 1; drawBits(x, LEAF, { G: i % 2 ? GOLD : '#ffb34a' }, 680 + i * 60 + Math.sin(ph * 8 + i) * 20, 620 + ph * 360, 10, { rot: ph * 3, alpha: Math.sin(Math.PI * ph) }) }
      label(x, 790, 660, 'SPIRAL: UNWOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Pick one thought. | *The rest can wait.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      thoughts(x, t, 760, 860, pop01(t, P.t0 + 0.1, 0.3, 2), lt)
      label(x, 790, 1150, 'PLEASE TAKE A NUMBER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Ask, don’t guess. | *They love you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), [['are we ok?', SKYB, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['obviously ♡', PINK, pop01(t, P.t0 + 1.2, 0.25, 2.2)], ['soup later?', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)]])
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'One awkward moment? | *Nobody remembers.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        ;[['aries', 700], ['libra', 880]].forEach(([id, px], i) => signChar(x, t, id, px, 980, 150 * k, { mood: lt > 1.0 ? 'happy' : 'neutral', look: [1, -1], seed: 30 + i, glyph: false }))
      }
      bubble(x, 790, 760, 'what moment?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 640, 'ALREADY FORGOTTEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A little crooked | *is still lovely.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, FRAME, FRAME_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 })
      label(x, 790, 1100, 'LEAVE IT. IT’S FINE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 430, 640, '…ok.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Can’t pick a flavour? | *Both are lovely.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CONE, { P: PINK, W: '#e7b46a' }, 720, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      drawBits(x, CONE, { P: SAGE, W: '#e7b46a' }, 870, 900, 18 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.1 })
      label(x, 795, 1110, 'BOTH. FINAL ANSWER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“k.” | *just means k.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), [['k.', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)]])
      label(x, 790, 1100, 'HIDDEN MEANING: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Big plans? | *Start with step one.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, STAIRS, { S: LAV }, 800, 1000, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) drawBits(x, SHOE, { S: '#ff9a4a', W: CREAM, K: INK }, 700, 1000 - 20, 9 * k)
      label(x, 790, 680, 'STEP 1: DONE ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Rest is | *part of the plan.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) { planner(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'Say what’s in your head | *out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 180 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 32, glyph: false })
      bubble(x, 760, 700, 'so… I’ve been | thinking a lot', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 540, 1170, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | *Then drink some water.*', mood: 'wide', tears: lt => lt > 1.2 ? 1 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 800, 920, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 680, 'HYDRATED. HEALING.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0005', key: 'G', accent: SAGE, ending: 'group',
  title: 'Each sign’s cure | for *overthinking.*',
  cameos: CAMEOS,
  group: {
    cap: 'Breathe in. | *Breathe out.*',
    draw(x, t, lt) {
      label(x, 540, 700, 'OVERTHINKING: OFF', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
