// r2a0104: star_advice, ADVICE ROLLCALL, "Left out? | How each sign copes." (~60 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: lesson (lesson beat, then the last line; no match card).
//   0.0–3.6    "Left out? | How each *sign copes.*"
//   3.6–49.2   one warm, relatable line per sign (3.8 s each), each with a light gag:
//              ♈ pretends not to care, say it stung · ♉ goes quiet and snacks, text a friend · ♊ makes a new group chat, invite them
//              · ♋ replays it all night, ask don't assume · ♌ throws their own party, or just ask · ♍ wonders what they did wrong,
//              probably nothing · ♎ smiles anyway, your feelings count · ♏ quietly takes notes, talk it out · ♐ spins the globe,
//              then calls them back · ♑ works harder to prove a point, already enough · ♒ "I like being alone," mostly true
//              · ♓ cries at the group photo, a spot saved for you
//  49.2        "We all feel it. | *Every sign.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Left out today | *isn't left out forever.*"  STATUS: INCLUDED
//  58.3        "Saved you a seat. | *Always.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a'

// ── props
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
const POPCORN = ['.W.W.W.', 'WWWWWWW', 'WYWWWYW', 'RWRWRWR', 'RWRWRWR', '.RWRWR.', '.RWRWR.']
const POPCORN_C = { W: '#fff4e2', Y: GOLD, R: RED }
const DISCO = ['..KKKK..', '.KSWSWK.', 'KSWSWSWK', 'KWSWSWSK', 'KSWSWSWK', '.KSWSWK.', '..KKKK..']
const DISCO_C = { K: INK, S: '#c9c9d8', W: '#fff4e2' }
function globe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 120, 16, 60); x.fillRect(-80, 176, 160, 20)
  x.beginPath(); x.arc(0, 0, 132, 0, 7); x.fill()
  x.fillStyle = '#3d8fd8'; x.beginPath(); x.arc(0, 0, 122, 0, 7); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 122, 0, 7); x.clip()
  x.fillStyle = '#5fd068'
  for (let i = 0; i < 4; i++) { const px = ((i * 110 + t * 160) % 440) - 220; x.beginPath(); x.ellipse(px, -40 + i * 30 * (i % 2 ? 1 : -1), 50, 34, 0.4, 0, 7); x.fill() }
  x.restore()
  x.restore()
}
function trophy(x, cx, cy, k, n) {
  if (k <= 0.01) return
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx + (i % 2 ? 70 : -70), cy - Math.floor(i / 2) * 130); x.scale(k * 0.8, k * 0.8)
    x.fillStyle = INK; x.fillRect(-70, -90, 140, 90); x.fillRect(-20, 0, 40, 50); x.fillRect(-60, 50, 120, 26)
    x.fillStyle = GOLD; x.fillRect(-62, -82, 124, 76); x.fillRect(-12, 0, 24, 46); x.fillRect(-52, 54, 104, 18)
    x.restore()
  }
}
function photo(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -150, 400, 300); x.fillStyle = BONE; x.fillRect(-190, -140, 380, 280)
  x.fillStyle = '#3d3470'; x.fillRect(-170, -120, 340, 200)
  x.restore()
  if (k > 0.5) {
    ;['aries', 'leo', 'gemini'].forEach((id, i) => signChar(x, t, id, cx - 120 + i * 80, cy - 10, 90 * k, { mood: 'happy', seed: 60 + i, glyph: false }))
    const p = pop01(t, t - lt + 1.2 * 1.29, 0.35, 2)
    if (p > 0.01) signChar(x, t, 'pisces', cx + 125, cy - 10, 90 * p, { mood: 'heart', seed: 64, glyph: false, tears: 1 })
    else label(x, cx + 125, cy - 10, '?', k, { size: 40, bg: BONE, rot: 0 })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Acts like they don’t care. | *Say it stung.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'NOT BOTHERED', pop01(t, P.t0 + 0.2, 0.3, 2.4) * (1 + 0.03 * Math.sin(t * 25)), { size: 44, bg: '#ff6b5a', rot: -0.06 })
      label(x, 790, 960, '(a little bothered)', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Goes quiet and snacks. | *Text a friend too.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 720, 1000, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'hey, free later?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Starts a new group chat. | *Invite them too.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = GOLD; x.fillRect(-108, -158, 216, 56); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW CHAT', 0, -130)
        const n = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 5)
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(`members: ${n}`, 0, -40)
        if (n > 4) { x.fillStyle = MINT; x.fillRect(-96, 20, 192, 50); x.fillStyle = INK; x.fillText('everyone in', 0, 46) }
      })
    } },
  { sign: 'cancer', cap: 'Replays it all night. | *Ask, don’t assume.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k); x.rotate(lt < 1.3 ? -t * 4 : 0)
        x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, 0, 100, 0.4, Math.PI * 1.9); x.stroke()
        x.strokeStyle = SKYB; x.lineWidth = 20; x.beginPath(); x.arc(0, 0, 100, 0.4, Math.PI * 1.9); x.stroke()
        x.fillStyle = SKYB; x.beginPath(); x.moveTo(100, -60); x.lineTo(150, 30); x.lineTo(50, 30); x.closePath(); x.fill()
        x.restore()
      }
      bubble(x, 790, 1070, 'were you upset?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Throws their own party. | *Or just ask why.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(786, 560, 8, 140 * k) }
      drawBits(x, DISCO, DISCO_C, 790, 760, 26 * k, { rot: t * 0.6 })
      if (lt > 0.6) sparkles(x, t, 790, 760, P.t0 + 0.6 * 1.29, 8, 200, 0.5, [GOLD, PINK, SKYB])
      label(x, 790, 1040, 'GUEST LIST: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Wonders what they did wrong. | *Probably nothing.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['said hi', 'was kind', 'brought snacks', 'did nothing wrong'].forEach((s, i) =>
        label(x, 755, 660 + i * 115, `✓ ${s.toUpperCase()}`, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2.4), { size: 30, bg: i === 3 ? MINT : BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Smiles anyway. | *Your feelings count too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), down = ease.inOutCubic(prog(lt, 0.9, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(lerp(380, 790, down), lerp(880, 1000, down)); x.rotate(down * 0.4); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-8, 60, 16, 140)
        x.beginPath(); x.arc(0, 0, 92, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 82, 0, 7); x.fill()
        x.fillStyle = INK; x.fillRect(-36, -26, 16, 16); x.fillRect(20, -26, 16, 16)
        x.lineWidth = 10; x.strokeStyle = INK; x.beginPath(); x.arc(0, 6, 44, 0.3, Math.PI - 0.3); x.stroke()
        x.restore()
      }
      label(x, 790, 720, 'MASK: OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: '#ff8fb1', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quietly takes notes. | *Talk it out instead.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shut = ease.inOutCubic(prog(lt, 1.0, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#4a1f3a'; x.fillRect(-140, -160, 280, 320)
        x.fillStyle = BONE; x.fillRect(-120, -140, 240 * (1 - shut), 280)
        x.fillStyle = INK; for (let i = 0; i < 5; i++) if (shut < 0.5) x.fillRect(-100, -110 + i * 50, 180 - i * 20, 10)
        x.restore()
      }
      bubble(x, 790, 1110, 'can we talk?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Spins the globe. | *Then calls them back.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      globe(x, lt < 1.2 ? t : t - lt + 1.2, 330, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 330, 600, 'come with me?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Works to prove a point. | *You’re already enough.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      trophy(x, 320, 1020, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 5))
      label(x, 320, 620, 'ENOUGH: ALREADY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Says “I like being alone.” | *Still, reach out.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'I’m fine solo', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 920, '…movie later?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
      if (lt > 1.4) hearts(x, t, 800, 1000, P.t0 + 1.4 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Cries at the group photo. | *You’re in it.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      photo(x, t, 770, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'SPOT SAVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0104', key: 'E', accent: LAV, ending: 'lesson',
  title: 'Left out? | Each sign *copes.*',
  cameos: CAMEOS,
  group: { cap: 'We all feel it. | *Every sign.*' },
  lesson: { text: 'Left out today | *isn’t left out forever.*', chip: 'STATUS: INCLUDED' },
  last: { text: 'Saved you a seat. | *Always.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
