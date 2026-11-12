// r2t0523: star_talk, BE LIKE roll call, "Signs overthinking | *be like.*" (topic: when they're overthinking)
// (~57 s vertical, signs3kit social cut, music: lofi · G). Twelve signs in zodiac order, each the most extreme overthinker.
// Ending: callback.
//   0.0–3.6    "Signs overthinking | *be like.*"
//   3.6–49.2   ♈ overthought for one second, then sent it · ♉ chose pasta, mourning the pizza · ♊ four opinions, argued with
//              all of them · ♋ friend said "k.", baked an apology cake · ♌ posted a selfie, refreshed all night
//              · ♍ reread their own text forty-one times · ♎ two options, three weeks · ♏ match said "hi", decoded it
//              · ♐ overthought once, booked a flight instead · ♑ a spreadsheet of every outcome · ♒ spiralled about the
//              size of space · ♓ pictured the wedding, then the breakup
//  49.2        "Twelve brains. | *Zero chill.*"
//  52.6        CALLBACK: "And Libra? | *Still deciding.*"  the scale comes back, still wobbling.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SL = { x: -160 }, SR = { x: 150 }

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
// a phone with a header and a body drawn by fn (local coords, screen 224 × 340)
function phone(x, cx, cy, k, rot, head, fn, headCol = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); txt(x, head, 0, -132, 22, INK, 'center', MONO, 700)
  fn(); x.restore()
}
const chip = (x, s, px, py, col, right = false, size = 26) => { x.font = `700 ${size}px ${MONO}`; const w = x.measureText(s).width + 24; const l = right ? px - w : px; x.fillStyle = col; x.fillRect(l, py - 22, w, 44); txt(x, s, l + w / 2, py + 2, size, INK, 'center', MONO, 700) }
const PASTA = ['...YYYYYY...', '..YRYYYYRY..', '.YYYYRYYYYY.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const PIZZA = ['OOOOOOOOO', '.YRYYYRY.', '..YYYRY..', '...YYY...', '....Y....']
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', '.CCCC.']
const PLANE_T = ['WWWWWWWWWWWWWW', 'WRRRRRRWWWKKKW', 'WWWWWWWWWWWWWW', 'WKKKKKKWWWKKKW', 'WWWWWWWWWWWWWW', 'WKKKKWWWWWKKKW', 'WWWWWWWWWWWWWW']
function scale(x, t, cx, cy, k, amp = 0.25) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 260); x.fillRect(-90, 100, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 248); x.fillRect(-84, 106, 168, 18)
  const a = amp * Math.sin(t * 3.2)
  x.translate(0, -140); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-170, -10, 340, 20); x.fillStyle = GOLD; x.fillRect(-166, -6, 332, 12)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 160, 0); x.rotate(-a)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-66, 86, 132, 22); x.fillStyle = GOLD; x.fillRect(-62, 90, 124, 14)
    txt(x, s < 0 ? 'A' : 'B', 0, 56, 40, CREAM)
    x.restore()
  }
  x.restore()
}
function planets(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill()
  const P = [[90, 16, SKYB, 1.3], [140, 22, PINK, 0.8], [190, 14, MINT, 0.5]]
  for (const [r, s, c, w] of P) {
    x.strokeStyle = 'rgba(239,230,214,0.3)'; x.lineWidth = 2; x.beginPath(); x.ellipse(0, 0, r, r * 0.45, 0, 0, 7); x.stroke()
    const a = t * w; x.fillStyle = INK; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r * 0.45, s + 4, 0, 7); x.fill()
    x.fillStyle = c; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r * 0.45, s, 0, 7); x.fill()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Overthought for one second. | *Then sent it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: SL, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'TO: CRUSH', () => {
        if (lt > 0.6) chip(x, 'hi. i like you.', 100, -60, BONE, true, 22)
        if (lt > 1.0) txt(x, 'SENT ✓', 0, 40, 34, MINT, 'center', MONO, 700)
      })
      L(x, 790, 1120, 'THINKING TIME: 1 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Chose pasta. | *Mourning the pizza.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, -1], star: SL,
    front(x, t, lt, P) {
      drawBits(x, PASTA, { Y: GOLD, R: '#e2583d', W: CREAM }, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.6; drawBits(x, PIZZA, { O: '#c8865a', Y: '#ffe27a', R: RED }, 790, 720, 18 * k, { rot: 0.1 }); x.restore() }
      bubble(x, 790, 1150, 'should’ve got | pizza…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Had four opinions. | *Argued with all of them.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'squint', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: SL,
    front(x, t, lt, P) {
      const W = ['yes!', 'no.', 'maybe?', 'ugh, fine.']
      W.forEach((w, i) => bubble(x, 700 + (i % 2) * 180, 660 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 36, col: [BONE, PINK, MINT, GOLD][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Friend said “k.” | Cancer *baked an apology.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'k.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, tail: 'br' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -60, 340, 140); x.fillStyle = '#d8dbe8'; x.fillRect(-160, -50, 320, 120); x.restore()
        for (let i = 0; i < 3; i++) drawBits(x, COOKIE, { C: '#c8865a', K: '#5b2e1a' }, 690 + i * 100, 905, 14 * k)
      }
      L(x, 790, 1090, 'SORRY? (FOR WHAT?)', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Posted a selfie. | *Refreshed all night.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'MY POST', () => {
        x.fillStyle = '#ffb34a'; x.fillRect(-90, -96, 180, 170)
        signChar(x, t, 'leo', 0, -6, 120, { mood: 'wink', seed: 81, glyph: false, glow: 0.4 })
        const n = Math.floor(clamp((lt - 0.4) / 1.5) * 3) + 1
        txt(x, `♥ ${n}`, -90, 120, 34, PINK, 'left', MONO, 700)
      }, GOLD)
      L(x, 790, 1120, 'REFRESHES: TOO MANY', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Reread their own text. | *Forty-one times.*', mood: 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'SENT', () => {
        chip(x, 'sounds good!', 100, -60, BONE, true, 24)
        txt(x, 'too many “!”?', 0, 30, 24, '#ff8fb1', 'center', MONO, 700)
        txt(x, 'too few?', 0, 70, 24, '#ff8fb1', 'center', MONO, 700)
      })
      const n = Math.min(41, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 41))
      L(x, 790, 1120, `REREAD: ${n}×`, pop01(t, P.t0 + 0.4, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Two options. | *Three weeks.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: SL,
    front(x, t, lt, P) {
      scale(x, t, 760, 950, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1130, 'DAY 21: STILL A? B?', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Match said “hi.” | Scorpio *decoded it.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), GOLD, -0.04, 30)
      bubble(x, 790, 760, 'hi', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, tail: 'bl' })
      const N = ['h = hopeful?', 'i = intrigued?', 'no "!" = mad?']
      N.forEach((s, i) => { if (lt > 0.9 + i * 0.35) txt(x, s, 790, 900 + i * 56, 34, LAV, 'center', MONO, 700) })
      L(x, 790, 1120, 'MEANINGS FOUND: 7', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Overthought once. | *Booked a flight instead.*', mood: 'sparkle', star: SR, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 330, 660, 'hmm, what if—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br' })
      drawBits(x, PLANE_T, { W: CREAM, R: '#c97bff', K: '#9aa5c4' }, 330, 880, 18 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.08 })
      L(x, 330, 1060, 'GATE CLOSES: NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet | of *every outcome.*', mood: 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      sheet(x, 330, 850, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -150, 320, 46); txt(x, 'OUTCOMES.xls', 0, -126, 24, INK, 'center', MONO, 700)
        const n = Math.floor(clamp((lt - 0.3) / 1.5) * 24)
        for (let i = 0; i < 24; i++) { const c = i % 4, r = Math.floor(i / 4); x.fillStyle = i < n ? ['#d8f0ff', '#fff1b0', '#d8dbe8', '#ffd5e0'][c] : '#efe9dd'; x.fillRect(-150 + c * 76, -96 + r * 40, 70, 34) }
      })
      L(x, 330, 1080, 'TAB 37 OF 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Spiralled about | *the size of space.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, -1], star: SL,
    front(x, t, lt, P) {
      planets(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1050, 'TOPIC: EVERYTHING', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, 0.04, 30)
      bubble(x, 790, 1150, 'are WE small?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Pictured the wedding. | *Then the breakup.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, 'MATCHED: 2 MIN AGO', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 30)
      bubble(x, 790, 820, lt < 1.0 ? 'our wedding…' : 'our breakup…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: lt < 1.0 ? PINK : SKYB, tail: 'bl' })
      if (lt < 1.0) hearts(x, t, 790, 960, P.t0 + 0.6, { n: 4, life: 1.0, spread: 140, cell: 7, seed: 5 })
      L(x, 790, 1060, 'WE NEVER MET.', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0523', key: 'G', accent: ACC, ending: 'callback',
  title: 'Signs overthinking | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve brains. | *Zero chill.*' },
  last: {
    text: 'And Libra? | *Still deciding.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'libra', 330, 1150, 300 * k, { mood: 'squint', look: [Math.sin(lt * 4) > 0 ? 1 : -1, 0], seed: 33, hops: [t0 + 1.5] })
      scale(x, t, 730, 1200, k, 0.32)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
