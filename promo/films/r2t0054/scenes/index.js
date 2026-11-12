// r2t0054: star_talk, BE LIKE, "Zodiacs told to | calm down be like." (~59 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each told to “calm down”, each reacting in the most extreme version of itself.
//   0.0–3.6    "Zodiacs told to | *calm down* be like."  the twelve line up.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries zero to a hundred · Taurus just stared, for an hour · Gemini sent a rant, part 1 of 14 · Cancer vented
//              to their match for three hours · Leo called a press conference · Virgo calmly listed where you went wrong
//              · Libra asked the group chat “was that rude?” · Scorpio said “okay”, wrote it down forever · Sagittarius
//              laughed it off, booked a flight · Capricorn scheduled a meeting about your tone · Aquarius debated what “calm”
//              even means · Pisces was already crying, now louder
//  49.2        group: "Never, ever | *say “calm down.”*"
//  52.4        LESSON: "Try “I hear you” | *instead.*"  STATUS: CALMED
//  58.3        "Works on every sign. | *Even Aries.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CORAL = '#ff7a59', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068'

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const txt = (x, s, X, Y, font, col = INK, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
// a phone with a header and chat lines [text, colour, appear-at, side]
function phone(x, cx, cy, k, lt, head, headCol, lines, { rot = 0.04 } = {}) {
  if (!card(x, cx, cy, 280, 410, k, { rot, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-124, -182, 248, 364)
  x.fillStyle = headCol; x.fillRect(-110, -166, 220, 46); txt(x, head, 0, -142, `700 22px ${MONO}`)
  lines.forEach(([s, col, at, side], i) => {
    const a = clamp(ease.outBack ? ease.outBack(clamp((lt - at) / 0.3)) : (lt - at) / 0.3)
    if (lt < at) return
    x.save(); x.translate(side * 16, -70 + i * 66); x.scale(a, a)
    x.font = `800 24px ${INTER}`; const w = x.measureText(s).width + 28
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); txt(x, s, 0, 2, `800 24px ${INTER}`)
    x.restore()
  })
  x.restore()
}
// little steam puffs from the top of a star
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 6; i++) {
    const ph = (t * 1.4 + i / 6) % 1, side = i % 2 ? 1 : -1
    x.save(); x.globalAlpha = k * (1 - ph) * 0.9; x.fillStyle = '#e8ecff'
    const px = cx + side * (60 + ph * 50), py = cy - ph * 140
    x.beginPath(); x.arc(px, py, 18 + ph * 22, 0, Math.PI * 2); x.fill(); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Zero to a hundred. | *In one word.*', mood: lt => lt > 0.7 ? 'squint' : 'neutral', squash: lt => lt > 0.7 ? 0.04 * Math.sin(lt * 40) : 0, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      steam(x, t, F.x, F.top, clamp((lt - 0.7) * 3))
      label(x, 780, 760, '0', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 60, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 780, 960, '100', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 80, bg: RED, color: CREAM, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t yell. | *Just stared. For an hour.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
        x.save(); x.rotate(lt * 9); x.fillStyle = INK; x.fillRect(-5, -96, 10, 96); x.restore()
        x.save(); x.rotate(lt * 0.9); x.fillStyle = RED; x.fillRect(-7, -60, 14, 60); x.restore()
        x.restore()
      }
      label(x, 780, 1080, 'STILL STARING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sent a rant. | *Part 1 of 14.*', mood: 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'YOU (1/14)', GOLD, [['okay SO', BONE, 0.4, -1], ['first of all', BONE, 0.7, -1], ['second of all', BONE, 1.0, -1], ['thirdly—', BONE, 1.3, -1]])
    } },
  { sign: 'cancer', cap: 'Vented to their match. | *For three hours.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt, '✦ YOUR MATCH', MINT, [['they said', BONE, 0.4, -1], ['CALM DOWN', BONE, 0.6, -1], ['omg no ♡♡', PINK, 1.2, 1], ['tell me all', PINK, 1.4, 1]], { rot: -0.04 })
      label(x, 790, 1110, 'CALL: 3 HRS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '“Calm down”?? | *Called a press conference.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -100, y: -40 }, hops: [1.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, 1060); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -70, 240, 160); x.fillStyle = '#8a4a2e'; x.fillRect(-112, -62, 224, 144); x.fillStyle = GOLD; x.fillRect(-60, -30, 120, 40); txt(x, 'LEO', 0, -9, `800 30px ${INTER}`); x.restore() }
      for (let i = 0; i < 3; i++) if (lt > 1.1 + i * 0.25) sparkles(x, t, 300 + i * 260, 640 + (i % 2) * 60, t - lt + 1.1 + i * 0.25, 6, 50, i)
      label(x, 780, 600, 'STATEMENT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Calmly listed | *where you went wrong.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (card(x, 790, 860, 290, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })) {
        txt(x, 'NOTES', 0, -160, `700 26px ${MONO}`, '#ef5c94')
        const L = ['1. your tone', '2. the timing', '3. “calm”??', '4. also, your shoe is', '    untied']
        L.forEach((s, i) => { if (lt > 0.4 + i * 0.25) txt(x, s, -124, -100 + i * 52, `800 26px ${INTER}`, INK, 'left') })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Asked the group chat: | *“was that rude?”*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 300, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03, bg: '#2a2350' })) {
        txt(x, 'POLL: WAS IT RUDE?', 0, -124, `700 20px ${MONO}`, CREAM)
        const g = ease.outCubic(prog(lt, 0.5, 1.4))
        ;[['YES', 0.92, GREEN], ['also yes', 0.78, MINT], ['no', 0.04, PINK]].forEach(([s, v, c], i) => {
          const y = -60 + i * 70; x.fillStyle = INK; x.fillRect(-130, y - 22, 260, 44); x.fillStyle = c; x.fillRect(-126, y - 18, 252 * v * g, 36); txt(x, s, -112, y, `800 24px ${INTER}`, INK, 'left')
        })
        x.restore()
      }
    } },
  { sign: 'scorpio', cap: 'Said “okay.” | *Wrote it down. Forever.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (card(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#3a1030' })) {
        x.fillStyle = '#e23d4e'; x.fillRect(-140, -170, 30, 340)
        txt(x, 'THINGS I', 10, -110, `700 26px ${MONO}`, CREAM); txt(x, 'REMEMBER', 10, -76, `700 26px ${MONO}`, CREAM)
        const s = 'you, 3:42 pm', n = Math.floor(clamp((lt - 0.6) / 0.8) * s.length)
        x.fillStyle = CREAM; x.fillRect(-96, 0, 220, 54); txt(x, s.slice(0, n), 14, 28, `800 26px ${INTER}`)
        txt(x, 'vol. 9', 10, 120, `italic 700 24px ${INTER}`, '#c9a6ff')
        x.restore()
      }
    } },
  { sign: 'sagittarius', cap: 'Laughed it off. | *Booked a flight.*', mood: lt => lt > 0.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      if (card(x, 790, 860, 330, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })) {
        x.fillStyle = '#b98cff'; x.fillRect(-165, -100, 330, 50); txt(x, 'BOARDING PASS', 0, -75, `700 24px ${MONO}`)
        txt(x, 'FROM: HERE', -140, -10, `800 26px ${INTER}`, INK, 'left'); txt(x, 'TO: ANYWHERE', -140, 34, `800 26px ${INTER}`, INK, 'left')
        x.setLineDash([8, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(90, -50); x.lineTo(90, 100); x.stroke()
        x.restore()
      }
      bubble(x, 790, 640, 'HAHA. bye!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Scheduled a meeting. | *Re: your tone.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (card(x, 790, 850, 320, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 })) {
        x.fillStyle = '#3ad0a0'; x.fillRect(-160, -140, 320, 54); txt(x, 'INVITE', 0, -113, `700 26px ${MONO}`)
        txt(x, 'RE: YOUR TONE', 0, -40, `800 30px ${INTER}`)
        txt(x, 'Mon 9:00–11:00', 0, 10, `700 24px ${MONO}`, '#6b62a8')
        txt(x, 'agenda attached', 0, 56, `italic 700 22px ${INTER}`, '#6b62a8')
        if (lt > 1.2) { x.fillStyle = INK; x.fillRect(-80, 88, 160, 40); x.fillStyle = GREEN; x.fillRect(-76, 92, 152, 32); txt(x, 'REQUIRED', 0, 109, `700 22px ${MONO}`) }
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Debated what | *“calm” even means.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      if (card(x, 790, 860, 330, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.02, bg: '#f4f6ff' })) {
        txt(x, 'CALM = ?', 0, -100, `800 44px ${INTER}`, '#2a6fd0')
        x.strokeStyle = '#2a6fd0'; x.lineWidth = 4
        const p = ease.outCubic(prog(lt, 0.5, 1.5))
        x.beginPath(); x.moveTo(-120, 0); x.lineTo(-120 + 240 * p, 0); x.stroke()
        if (p > 0.4) { x.beginPath(); x.arc(-60, 70, 34, 0, Math.PI * 2); x.stroke(); txt(x, 'A', -60, 70, `800 28px ${INTER}`, '#2a6fd0') }
        if (p > 0.8) { x.beginPath(); x.arc(70, 70, 34, 0, Math.PI * 2); x.stroke(); txt(x, 'B?', 70, 70, `800 28px ${INTER}`, '#2a6fd0'); x.beginPath(); x.moveTo(-26, 70); x.lineTo(36, 70); x.stroke() }
        x.restore()
      }
      label(x, 790, 1080, 'DISCUSS.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Was already crying. | *Now crying louder.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = Math.min(5, Math.floor(clamp((lt - 0.4) / 1.0) * 5) + 1)
      if (card(x, 790, 860, 120, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0, bg: '#2a2350' })) {
        for (let i = 0; i < 5; i++) { x.fillStyle = i < v ? [GREEN, GREEN, GOLD, GOLD, RED][i] : '#140c30'; x.fillRect(-40, 110 - i * 52, 80, 40) }
        x.restore()
      }
      label(x, 790, 1080, 'VOLUME: UP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0054', key: 'D', accent: CORAL, ending: 'lesson',
  title: 'Zodiacs told to | *calm down* be like.',
  cameos: CAMEOS,
  group: { cap: 'Never, ever | *say “calm down.”*', moods: ['squint', 'neutral', 'wide', 'heart', 'squint', 'neutral', 'sparkle', 'squint', 'sparkle', 'neutral', 'happy', 'wide'] },
  lesson: { text: 'Try “I hear you” | *instead.*', chip: 'STATUS: CALMED' },
  last: { text: 'Works on every sign. | *Even Aries.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
