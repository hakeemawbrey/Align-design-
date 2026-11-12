// r2a0299: star_advice, ADVICE ROLL CALL, "How signs help | a friend *move on.*" (~57 s vertical, lofi · E)
// Twelve signs in zodiac order, one warm, specific way each sign helps a friend after a breakup or a hard ending.
// Ending: callback (Sagittarius' road-trip car comes back, and this time it's your turn to drive).
//   0.0–3.6    "How signs help | a friend *move on.*"
//   3.6–49.2   ♈ running shoes, "we're running it off" · ♉ dessert and the softest blanket · ♊ talks it out for three hours
//              · ♋ saves you a seat at every family dinner · ♌ reminds you you're the main character (crown)
//              · ♍ a gentle "moving on" checklist · ♎ a glow-up afternoon · ♏ the vault: every secret safe
//              · ♐ books a road trip, windows down · ♑ helps plan chapter two · ♒ signs you up for beekeeping 101
//              · ♓ cries with you, then laughs with you
//  49.2        "Twelve ways | to say *“I'm here.”*"
//  52.6        CALLBACK: "Six months later: | *your turn to drive.*"  the road-trip car comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = PINK, RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#c98f5a'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const SHOE = ['...KKKK...', '..KRRRRK..', '.KRWRWRRK.', 'KRRRRRRRRK', 'KWWWWWWWWK', '.KKKKKKKK.']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const BEE = ['..WW.WW..', '..WW.WW..', '.KYYKYYK.', 'KYYKYYKYK', 'KYYKYYKYK', '.KYYKYYK.']
const CAKE = ['....R....', '.WWWWWWW.', 'PPPPPPPPP', 'BBBBBBBBB', 'PPPPPPPPP']

function car(x, t, cx, cy, k, riders = ['sagittarius'], s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-190, -40, 380, 110); x.fillRect(-110, -110, 220, 80)
  x.fillStyle = '#c97bff'; x.fillRect(-182, -32, 364, 94); x.fillRect(-102, -102, 204, 72)
  x.fillStyle = SKYB; x.fillRect(-92, -94, 86, 58); x.fillRect(6, -94, 86, 58)
  x.fillStyle = GOLD; x.fillRect(170, -14, 14, 20)
  x.fillStyle = INK; for (const wx of [-110, 110]) { x.beginPath(); x.arc(wx, 70, 38, 0, 7); x.fill(); x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(wx, 70, 16, 0, 7); x.fill(); x.fillStyle = INK }
  x.restore()
  riders.forEach((id, i) => signChar(x, t, id, cx + (i ? 50 : -50) * k * s, cy - 70 * k * s, 80 * k * s, { mood: 'sparkle', seed: 90 + i, glyph: false, glow: 0.4 }))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Shows up in sneakers. | *“We’re running it off.”*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { K: INK, R: '#ff6b5a', W: BONE }, 790, 800, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(lt * 8) * 0.06 })
      bubble(x, 790, 660, 'lace up!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1000, 'FEELINGS: OUTRUN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Brings dessert | and *the softest blanket.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.rotate(-0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-180, -60, 360, 120); x.fillStyle = PINK; x.fillRect(-172, -52, 344, 104); x.fillStyle = '#ffd0e0'; for (let i = 0; i < 5; i++) x.fillRect(-160 + i * 72, -52, 30, 104); x.restore() }
      drawBits(x, CAKE, { R: RED, W: '#fff', P: PINK, B: '#8a4a2e' }, 790, 780, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      L(x, 790, 1110, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Talks it out. | For *three hours straight.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'okay, from the start…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 820, 820, 'and how did THAT feel?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 30, col: GOLD, tail: 'bl' })
      const h = 1 + Math.floor(clamp((lt - 0.8) / 1.2) * 2)
      L(x, 790, 1020, `CALL: ${h}:0${(h * 7) % 10} HRS`, pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Saves you a seat | at *every family dinner.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.scale(k, k); x.fillStyle = INK; x.fillRect(-190, -20, 380, 40); x.fillStyle = '#8a4a2e'; x.fillRect(-184, -14, 368, 28); x.restore() }
      L(x, 790, 860, 'RESERVED: YOU ♥', pop01(t, P.t0 + 0.6, 0.3, 2), PINK, 0.04, 32)
      bubble(x, 790, 680, 'come hungry!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1090, 'EVERY SUNDAY', pop01(t, P.t0 + 1.7, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Reminds you | you’re *the main character.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 940, 170 * k, { mood: lt > 1.1 ? 'heart' : 'neutral', look: [-1, 0], seed: 44, glyph: false })
      const p = ease.outCubic(prog(lt, 0.8, 1.3))
      if (lt > 0.8) drawBits(x, CROWN, CROWN_C, 790, lerp(620, 830, p), 12)
      sparkles(x, t, 790, 840, P.t0 + 1.3 * 1.29, 8, 150, 0.4)
      L(x, 790, 1120, 'ROLE: LEAD', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Makes a gentle | *“moving on” checklist.*', mood: 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -190, 340, 380); x.fillStyle = CREAM; x.fillRect(-162, -182, 324, 364)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillText('MOVING ON', 0, -140)
        const I = ['drink water', 'go outside', 'new playlist', 'be kind to you']
        const n = Math.floor(clamp((lt - 0.5) / 1.3) * 4.99)
        x.font = `700 24px ${MONO}`; x.textAlign = 'left'
        I.forEach((s, i) => { const y = -80 + i * 70; x.fillStyle = INK; x.fillRect(-140, y - 18, 32, 32); x.fillStyle = CREAM; x.fillRect(-134, y - 12, 20, 20); if (i < n) { x.fillStyle = '#2f9a5a'; x.fillRect(-136, y - 14, 24, 24) } x.fillStyle = INK; x.fillText(s, -96, y + 6) })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Plans you | a *glow-up afternoon.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 170, 0, 0, 7); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 160, 0, 0, 7); x.fill()
        x.fillStyle = '#cfefff'; x.beginPath(); x.ellipse(0, 0, 100, 140, 0, 0, 7); x.fill()
        x.restore()
        signChar(x, t, 'cancer', 790, 850, 130 * k, { mood: lt > 1.2 ? 'sparkle' : 'neutral', seed: 46, glyph: false })
      }
      sparkles(x, t, 790, 820, P.t0 + 1.2 * 1.29, 8, 170, 0.2)
      L(x, 790, 1100, 'NEW HAIRCUT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Keeps every secret | you *need to say.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#6b62a8'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 70, 0, 7); x.fill(); x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 60, 0, 7); x.fill()
        x.save(); x.rotate(ease.inOutCubic(prog(lt, 1.0, 1.6)) * Math.PI); x.fillStyle = INK; x.fillRect(-8, -56, 16, 56); x.restore()
        x.restore()
      }
      bubble(x, 790, 650, 'it stays with me.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 790, 1090, 'VAULT: LOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Books a road trip. | *Windows down.*', mood: 'sparkle', star: { x: 0, y: -160, s: 220 },
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.1, 1.0))
      car(x, t, lerp(1100, 560, p), 980, 1, ['sagittarius', 'gemini'])
      L(x, 540, 1160, 'DESTINATION: ANYWHERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Helps you plan | your *next chapter.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -190, 320, 380); x.fillStyle = '#2fc79a'; x.fillRect(-152, -182, 304, 364)
        x.fillStyle = CREAM; x.fillRect(-120, -120, 240, 120)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHAPTER 2', 0, -60)
        x.font = `700 22px ${MONO}`; x.fillText('(the good one)', 0, 60)
        x.restore()
      }
      L(x, 790, 1110, 'PAGE 1: STARTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Signs you up | for a *weird new class.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const a = t * 2 + i * 2.1; drawBits(x, BEE, { W: '#e8f4ff', K: INK, Y: GOLD }, 790 + Math.cos(a) * 120, 800 + Math.sin(a * 1.3) * 70, 9 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)) }
      L(x, 790, 1040, 'BEEKEEPING 101', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
      bubble(x, 790, 640, 'trust me!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries with you. | Then *laughs* with you.', mood: lt => lt < 1.1 ? 'wide' : 'happy', tears: lt => lt < 1.1 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 790, 920, 190 * k, { mood: lt < 1.1 ? 'neutral' : 'happy', tears: lt < 1.1 ? 2 : 0, look: [-1, 0], seed: 48, glyph: false })
      L(x, 790, 660, 'TISSUES: SHARED', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, 0.04, 30)
      if (lt > 1.1) bubble(x, 790, 1120, 'HAHAHA', pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0299', key: 'E', accent: ACC, ending: 'callback',
  title: 'How signs help | a friend *move on.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to say *“I’m here.”*' },
  last: {
    text: 'Six months later: | *your turn to drive.*',
    draw(x, t, lt) {
      const p = ease.outCubic(prog(lt, 0.3, 1.3))
      car(x, t, lerp(-200, 540, p), 1180, 1, ['pisces', 'sagittarius'], 1.2)
      if (lt > 1.3) { sparkles(x, t, 540, 1120, t - lt + 1.3, 9, 260, 0.3); label(x, 540, 1400, '✦ DRIVER: YOU', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
