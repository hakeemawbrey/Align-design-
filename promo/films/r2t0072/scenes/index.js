// r2t0072: star_talk, BELIKE, "A phone call?! | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme reaction when someone calls instead of texting.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ answered before it rang · ♉ let it ring, finished the sandwich · ♊ talked for three hours
//              · ♋ "what happened?!" · ♌ assumed it was a fan · ♍ declined, texted "why call?"
//              · ♎ pick up or not? it stopped ringing · ♏ "state your business." · ♐ picked up abroad
//              · ♑ sent a calendar invite for the call · ♒ phone's been off since spring · ♓ the match called, happy tears
//  49.2        GROUP ENDING: "Next time? | *Just text.*"  A "1 MISSED CALL" sticker above the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#3fd27a', BROWN = '#8a4a2e'
const SANDWICH = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'TTTTTTTTTTT', 'CCCCCCCCCCC', '.BBBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', T: RED, C: GOLD }
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']

// a phone; ring > 0 shakes it and shows the call screen
function phone(x, t, cx, cy, k, { ring = 0, who = 'INCOMING', screen, s = 1, rot = 0.04, web = false } = {}) {
  if (k <= 0.01) return
  const sh = ring ? Math.sin(t * 60) * 6 * ring : 0
  x.save(); x.translate(cx + sh, cy); x.rotate(rot + (ring ? Math.sin(t * 50) * 0.03 : 0)); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-134, -206, 268, 412); x.fillStyle = '#2a2350'; x.fillRect(-126, -198, 252, 396)
  x.fillStyle = web ? '#0b0718' : '#140c30'; x.fillRect(-112, -172, 224, 340)
  if (screen) screen(x)
  else if (!web) {
    x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CALLING…', 0, -130)
    x.font = `800 34px ${INTER}`; x.fillText(who, 0, -80)
    x.fillStyle = GREEN; x.beginPath(); x.arc(-56, 110, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = RED; x.beginPath(); x.arc(56, 110, 34, 0, Math.PI * 2); x.fill()
  }
  if (web) {
    x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI / 2; x.beginPath(); x.moveTo(-112, -172); x.lineTo(-112 + Math.cos(a) * 150, -172 + Math.sin(a) * 150); x.stroke() }
    for (const r of [50, 95, 140]) { x.beginPath(); x.arc(-112, -172, r, 0, Math.PI / 2); x.stroke() }
  }
  x.restore()
  if (ring) for (const d of [-1, 1]) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 6; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 12); x.beginPath(); x.arc(cx, cy - 60 * k * s, 170 * k * s, d < 0 ? Math.PI * 0.85 : -Math.PI * 0.15, d < 0 ? Math.PI * 1.15 : Math.PI * 0.15); x.stroke(); x.restore() }
}
const textScreen = (lines, col = MINT) => x => {
  x.fillStyle = col; x.fillRect(-100, -60, 200, 40 + lines.length * 40)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -20 + i * 40))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | it *even rang.*', mood: 'wide', look: [1, 0], star: { x: -180 }, hops: [0.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 900, pop01(t, P.t0 + 0.1, 0.25, 2), { s: 0.8 })
      bubble(x, 760, 620, 'HELLO?!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 56, col: GOLD, tail: 'bl' })
      label(x, 800, 1130, 'RING COUNT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Let it ring. | *Finished the sandwich.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, SANDWICH, SANDWICH_C, F.x + 150, F.cy + 30, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      phone(x, t, 820, 760, pop01(t, P.t0 + 0.4, 0.25, 2), { ring: 1, who: 'MOM', s: 0.75 })
      label(x, 800, 1110, 'PRIORITIES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Answered. Talked | for *three hours.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, t, 800, 820, pop01(t, P.t0 + 0.15, 0.25, 2), { s: 0.7, screen: textScreen(['ON CALL'], GOLD) })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 2.99)
      label(x, 800, 1090, `HOUR ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 420, 610, 'anyway—', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Picked up: | “*What happened?!*”', mood: 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, t, 820, 900, pop01(t, P.t0 + 0.1, 0.25, 2), { s: 0.75, who: 'FRIEND' })
      bubble(x, 770, 640, 'are you OK?!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      bubble(x, 800, 1140, '“just saying hi”', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, col: LAV, tail: 'br' })
    } },
  { sign: 'leo', cap: 'Assumed it was | a *fan.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, t, 820, 880, pop01(t, P.t0 + 0.1, 0.25, 2), { ring: lt < 0.9 ? 1 : 0, s: 0.75, who: '???' })
      bubble(x, 770, 630, 'yes, it’s me.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 600, 820, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Declined. Texted: | “*Why call?*”', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const typed = lt > 0.8
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.1, 0.25, 2), { ring: typed ? 0 : 1, s: 0.8, who: 'BEST FRIEND', screen: typed ? textScreen(['why', 'call?']) : null })
    } },
  { sign: 'libra', cap: 'Pick up? Don’t? | *It stopped ringing.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 7) > 0 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const ringing = lt < 1.5
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.1, 0.25, 2), { ring: ringing ? 1 : 0, s: 0.7, who: 'MATCH ✦', screen: ringing ? null : textScreen(['1 MISSED', 'CALL'], PINK) })
      if (ringing) { const yes = Math.sin(lt * 7) > 0; label(x, yes ? 640 : 960, 1110, yes ? 'YES?' : 'NO?', 1, { size: 36, bg: yes ? MINT : RED, color: yes ? INK : CREAM, font: MONO, weight: 700 }) }
    } },
  { sign: 'scorpio', cap: 'Answered: | “*State your business.*”', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, t, 820, 900, pop01(t, P.t0 + 0.1, 0.25, 2), { s: 0.75, who: 'UNKNOWN' })
      bubble(x, 760, 630, '…who is this.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 820, 1130, '“it’s your mom”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Picked up | from *another country.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLANE, { W: '#ffffff', S: SKYB }, lerp(620, 900, clamp(lt / 2.4)), 640, 13 * k, { rot: -0.15 })
      phone(x, t, 800, 920, k, { s: 0.75, screen: textScreen(['ROAMING'], GOLD) })
      bubble(x, 420, 610, 'hiii! where am I?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Sent a calendar invite | *for the call.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 850); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -132, 320, 280)
      x.fillStyle = INK; x.fillRect(-166, -146, 332, 292); x.fillStyle = CREAM; x.fillRect(-160, -140, 320, 280)
      x.fillStyle = RED; x.fillRect(-160, -140, 320, 64)
      x.fillStyle = CREAM; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -108)
      x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('“Quick call”', 0, -30)
      x.font = `700 28px ${MONO}`; x.fillText('TUE · 2:15–2:20', 0, 30)
      x.fillStyle = GREEN; x.fillRect(-120, 72, 110, 44); x.fillStyle = RED; x.fillRect(10, 72, 110, 44)
      x.restore()
      label(x, 800, 1110, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Phone’s been off | since *last spring.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { s: 0.8, web: true })
      label(x, 800, 1110, 'OFF (BY CHOICE)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Your match called? | *Happy tears.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 820, 880, pop01(t, P.t0 + 0.1, 0.25, 2), { ring: 1, s: 0.7, who: '✦ MATCH' })
      hearts(x, t, 820, 820, P.t0 + 0.7, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0072', key: 'E', accent: MINT, ending: 'group',
  title: 'A phone call?! | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Next time? | *Just text.*',
    draw(x, t, lt) {
      label(x, 540, 700, '1 MISSED CALL', pop01(t, t - lt + 1.6, 0.35, 2.4), { size: 52, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
