// trs3swipe: THE SIGNS AS… v3, "The signs swiping | be like." (~62 s vertical, signs3kit social cut, music: lofi · D)
// The villain is generic dating apps (a made-up "swipe app": a phone with a stack of profile cards and X / heart
// buttons, and a made-up "prompts app": a profile card with a cheesy prompt). No real app, logo, colour scheme or slogan.
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs swiping | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   each sign's most dramatic dating-app misery (3.8 s each), pushed to the extreme:
//              ♈ swiped so fast the thumb went on strike ("ow.") · ♉ fifty bios in a row: "I love travel." · ♊ same fun fact,
//              forty chats · ♋ two hundred matches, zero hellos · ♌ liked for the selfie, nobody asked their sign
//              · ♍ "my ideal Sunday is…" "vibes." · ♎ "hey." "hey!" for three weeks · ♏ shared their whole soul, ghosted
//              · ♐ radius: the whole planet, "that's everyone." · ♑ small talk, week four: sent an agenda
//              · ♒ one prompt answer, broke the word limit · ♓ swiped left by accident on the one (sobbing)
//  49.2        "Twelve signs. | *Swiped out.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "The app saw a face. | The stars saw *you.*"  CHART: READ
//  58.3        "Rest that thumb. | The stars *got you.*" over the match card: Aries (the thumb on strike) +
//              Pisces (lost the one to a slip of the thumb), MATCHED BY THE STARS.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const RED = '#e23d4e'
const FACES = ['#ffb34a', '#8fe3ff', '#ff8fb1', '#7dffb0', '#c9a6ff', '#ffd23a', '#6fc3ff', '#ff9a4a']

// ── the generic "swipe app": a phone; fn draws on the screen (local coords, screen −128…128 × −222…222)
function phone(x, cx, cy, k, rot, fn, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -250, 300, 520)
  x.fillStyle = INK; x.fillRect(-150, -260, 300, 520)
  x.fillStyle = '#3a3170'; x.fillRect(-142, -252, 284, 504)
  x.fillStyle = '#140c30'; x.fillRect(-128, -222, 256, 444)
  x.fillStyle = INK; x.fillRect(-30, -242, 60, 10)
  x.save(); x.beginPath(); x.rect(-128, -222, 256, 444); x.clip(); if (fn) fn(); x.restore()
  x.restore()
}
/** a profile card: a coloured photo with a generic silhouette, optional bio text under it */
function profile(x, cx, cy, w, h, col, { rot = 0, text = null, size = 24, k = 1, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  const ph = text ? h * 0.6 : h - 20, top = -h / 2 + 10
  x.fillStyle = col; x.fillRect(-w / 2 + 10, top, w - 20, ph)
  x.save(); x.beginPath(); x.rect(-w / 2 + 10, top, w - 20, ph); x.clip()
  x.fillStyle = 'rgba(20,12,48,0.32)'
  x.beginPath(); x.arc(0, top + ph * 0.44, ph * 0.18, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.ellipse(0, top + ph + 4, ph * 0.34, ph * 0.32, 0, Math.PI, Math.PI * 2); x.fill()
  x.restore()
  if (text) {
    x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const lines = text.split('|').map(s => s.trim()), lh = size * 1.15, mid = top + ph + (h / 2 - top - ph) / 2
    lines.forEach((l, i) => x.fillText(l, 0, mid + (i - (lines.length - 1) / 2) * lh))
  }
  x.restore()
}
/** the X and heart buttons under the card */
function buttons(x, y, sx = 1, sh = 1) {
  for (const [bx, kind, s] of [[-64, 'x', sx], [64, 'h', sh]]) {
    x.save(); x.translate(bx, y); x.scale(s, s)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill()
    if (kind === 'x') { x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'square'; x.beginPath(); x.moveTo(-12, -12); x.lineTo(12, 12); x.moveTo(12, -12); x.lineTo(-12, 12); x.stroke() }
    else drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, 2, 5, { outline: null })
    x.restore()
  }
}
/** a chat bubble on a phone screen */
function msg(x, text, y, me, k, { size = 26, col } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 30, h = size + 22
  const bx = me ? 112 - w : -112
  x.translate(bx + w / 2, y); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6)
  x.fillStyle = col || (me ? '#ffb7d0' : BONE); x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
const screenTitle = (x, text, col = GOLD, y = -192) => { x.fillStyle = col; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, y) }

/** the generic "prompts app": a profile card with a prompt and an answer; fn draws the answer */
function promptCard(x, cx, cy, k, prompt, fn, { w = 400, h = 440, rot = 0.03 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#6b62a8'; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PROMPT', -w / 2 + 26, -h / 2 + 34)
  x.fillStyle = INK; x.font = `italic 500 36px ${SERIF}`
  prompt.split('|').map(s => s.trim()).forEach((l, i) => x.fillText(l, -w / 2 + 26, -h / 2 + 82 + i * 40))
  x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(-w / 2 + 26, -h / 2 + 82 + prompt.split('|').length * 40, w - 52, 4)
  fn(w, h)
  x.restore()
}

// ── props
const GHOST = [
  '....WWWW....',
  '..WWWWWWWW..',
  '.WWWWWWWWWW.',
  '.WWKKWWKKWW.',
  'WWWKKWWKKWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WW.WWWW.WWWW',
  'W...WW...WW.',
]
const GHOST_C = { W: '#f4f0ff', K: INK }
const GLOBE = [
  '....BBBBB....',
  '..BBGGBBBBB..',
  '.BGGGGBBBGGB.',
  '.BGGGBBBGGGB.',
  'BBGGBBBBGGGBB',
  'BBBGBBBBBGGBB',
  'BBBBBBGGBBBBB',
  'BBBBBGGGGBBBB',
  'BBGBBGGGBBBBB',
  '.BGGBBGBBBBB.',
  '.BBGBBBBBGBB.',
  '..BBBBBBBBB..',
  '....BBBBB....',
]
const GLOBE_C = { B: '#6fc3ff', G: '#5fd068' }

const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const CAMEOS = [
  { sign: 'aries', cap: 'Swiped so fast | their *thumb quit.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.95, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const strike = lt > 1.5
      phone(x, 770, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        profile(x, 0, -50, 210, 300, FACES[3])
        const n = Math.floor(Math.max(0, lt - 0.3) * 6)
        const p = strike ? 0 : (Math.max(0, lt - 0.3) * 6) % 1
        const dir = n % 2 ? 1 : -1
        if (lt > 0.3) profile(x, dir * 320 * ease.inCubic(p), -50 - 30 * p, 210, 300, FACES[n % FACES.length], { rot: dir * 0.5 * p })
        buttons(x, 170, !strike && n % 2 === 0 ? 1.15 : 1, !strike && n % 2 ? 1.15 : 1)
      })
      const sw = strike ? 9999 : Math.floor(Math.max(0, lt - 0.3) * 6000)
      label(x, 770, 570, `SWIPES: ${fmt(Math.min(9999, sw))}${sw >= 9999 ? '+' : ''}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (strike) {
        bubble(x, 340, 610, 'ow.', pop01(t, P.t0 + 1.7, 0.25, 2.4), { size: 48, tail: 'bl' })
        label(x, 770, 1130, 'THUMB: ON STRIKE', pop01(t, P.t0 + 1.55, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.05 })
      }
    } },
  { sign: 'taurus', cap: 'Fifty bios in a row: | *“I love travel.”*', mood: lt => lt > 1.6 ? 'heart' : lt > 0.9 ? 'eyeroll' : 'neutral', look: lt => lt > 1.6 ? undefined : [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ks = [0.15, 0.35, 0.55].map(d => pop01(t, P.t0 + d, 0.3, 2))
      profile(x, 670, 910, 240, 340, FACES[1], { rot: -0.14, text: 'I love | travel.', size: 34, k: ks[0] })
      profile(x, 835, 910, 240, 340, FACES[2], { rot: 0.14, text: 'I love | travel.', size: 34, k: ks[1] })
      profile(x, 752, 880, 240, 340, FACES[0], { rot: 0.02, text: 'I love | travel.', size: 34, k: ks[2] })
      const n = Math.min(50, 47 + Math.floor(Math.max(0, lt - 0.55) * 4))
      label(x, 752, 640, `BIO #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 350, 590, 'I love | my couch.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Same fun fact. | *Forty chats.*', mood: lt => lt > 1.8 ? 'sleepy' : Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => lt > 1.8 ? undefined : [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.15) / 0.22) + 1)
      for (let i = 0; i < n; i++) {
        const k = pop01(t, P.t0 + 0.15 + i * 0.22, 0.2, 2)
        const wx = 660 + i * 14, wy = 590 + i * 64
        x.save(); x.translate(wx, wy); x.rotate(-0.04 + (i % 3) * 0.03); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -42, 340, 100)
        x.fillStyle = INK; x.fillRect(-170, -52, 340, 104)
        x.fillStyle = BONE; x.fillRect(-164, -46, 328, 92)
        x.fillStyle = FACES[i % FACES.length]; x.fillRect(-164, -46, 328, 22)
        x.fillStyle = INK; x.font = `700 16px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(`MATCH ${i * 6 + 1}`, -152, -35)
        x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('fun fact: I’m a twin!', 0, 12)
        x.restore()
      }
      label(x, 700, 1140, 'CHAT 40 OF 40', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Two hundred matches. | *Zero* hellos.', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: lt => lt > 1.4 ? [1, 0] : undefined, star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 770, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        screenTitle(x, '200 MATCHES')
        const m = Math.min(12, Math.floor(Math.max(0, lt - 0.3) * 14))
        for (let i = 0; i < m; i++) {
          const gx = -78 + (i % 3) * 78, gy = -120 + Math.floor(i / 3) * 78
          x.fillStyle = INK; x.beginPath(); x.arc(gx, gy, 33, 0, Math.PI * 2); x.fill()
          x.fillStyle = FACES[i % FACES.length]; x.beginPath(); x.arc(gx, gy, 28, 0, Math.PI * 2); x.fill()
          x.fillStyle = 'rgba(20,12,48,0.32)'; x.beginPath(); x.arc(gx, gy - 4, 10, 0, Math.PI * 2); x.fill()
        }
        x.fillStyle = 'rgba(239,230,214,0.55)'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('MESSAGES', 0, 200)
      })
      label(x, 770, 1130, 'MESSAGES: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 350, 600, 'hello? | anyone?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Liked for the selfie. | Nobody *asked their sign.*', mood: lt => lt > 1.5 ? 'squint' : 'wink', look: lt => lt > 1.5 ? [1, 0] : undefined, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      phone(x, 770, 850, k, 0.05, () => {
        x.fillStyle = '#ffb34a'; x.fillRect(-118, -212, 236, 330)
        x.fillStyle = 'rgba(255,241,200,0.35)'; x.beginPath(); x.arc(0, -40, 120, 0, Math.PI * 2); x.fill()
        signChar(x, t, 'leo', 0, -40, 200, { mood: 'wink', glyph: false, seed: 9, glow: 0.6 })
        buttons(x, 170, 1, 1 + 0.12 * Math.max(0, Math.sin(t * 9)))
      })
      hearts(x, t, 800, 760, P.t0 + 0.6, { n: 8, life: 2.0, spread: 220, cell: 7, seed: 4 })
      label(x, 770, 1130, 'LIKES: 999+', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 360, 600, 'ask my | sign!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: '“My ideal Sunday is…” | *“vibes.”*', mood: lt => lt > 1.3 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      promptCard(x, 735, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 'My ideal Sunday is…', (w, h) => {
        const a = pop01(t, P.t0 + 0.6, 0.3, 2.4)
        if (a > 0.01) { x.save(); x.translate(0, 40); x.scale(a, a); x.fillStyle = INK; x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('vibes.', 0, 0); x.restore() }
        const c = ease.outCubic(prog(lt, 1.1, 1.5))
        if (c > 0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 40, 140, 66, -0.06, -Math.PI / 2, -Math.PI / 2 + c * Math.PI * 2.05); x.stroke() }
        const q = pop01(t, P.t0 + 1.4, 0.25, 2.4)
        if (q > 0.01) { x.save(); x.translate(60, 160); x.rotate(-0.08); x.scale(q, q); x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('which ones??', 0, 0); x.restore() }
      })
      label(x, 735, 1130, 'NEEDS DETAIL', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'libra', cap: '“hey.” “hey!” | *Week three.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        screenTitle(x, 'CHAT', LAV)
        const HEYS = ['hey.', 'hey!', 'hey :)', 'heyy', 'hey!!', 'hey.']
        HEYS.forEach((h, i) => msg(x, h, -130 + i * 64, i % 2 === 1, pop01(t, P.t0 + 0.4 + i * 0.22, 0.2, 2.2), { size: 28 }))
      })
      label(x, 770, 590, 'WEEK 3', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 770, 1130, 'NEXT TOPIC: …hey?', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Shared their whole soul. | Got *ghosted.*', mood: lt => lt > 1.3 ? 'eyeroll' : 'wide', look: lt => lt > 1.3 ? undefined : [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 780, 900, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        screenTitle(x, 'CHAT', LAV)
        for (let i = 0; i < 7; i++) {
          const k = pop01(t, P.t0 + 0.25 + i * 0.07, 0.2, 2)
          if (k <= 0.01) continue
          const w = [200, 180, 210, 160, 200, 190, 120][i]
          x.fillStyle = INK; x.fillRect(112 - w - 3, -158 + i * 44 - 3, w + 6, 36)
          x.fillStyle = '#c97bff'; x.fillRect(112 - w, -158 + i * 44, w * k, 30)
        }
        if (lt > 0.9) { x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillText('seen', 112, 160) }
      }, 0.85)
      // the ghost rises out of the phone and drifts away
      const g = prog(lt, 0.9, 2.2)
      if (g > 0) {
        const gx = lerp(780, 850, g), gy = lerp(820, 610, ease.outCubic(g))
        drawBits(x, GHOST, GHOST_C, gx + 8 * Math.sin(t * 5), gy, 13 * clamp(g * 5), { alpha: 1 - 0.45 * clamp((g - 0.7) / 0.3) })
        bubble(x, gx - 170, gy - 40, 'brb', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 40, tail: 'br' })
      }
      label(x, 760, 1140, 'LAST SEEN: 3 WEEKS AGO', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: '#c97bff', color: '#fff4e2', rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Radius: the whole planet. | App: *“that’s everyone.”*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: { x: 160 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GLOBE, GLOBE_C, 320, 830, 18 * k, { rot: t * 0.4 })
      label(x, 320, 620, 'RADIUS: THE PLANET', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 320, 830, P.t0 + 0.5, 8, 170, 0.3)
      bubble(x, 330, 1040, 'you’ve seen | everyone.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Small talk, week four. | Sent *an agenda.*', mood: lt => lt < 1.4 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-162, -212, 340, 440)
        x.fillStyle = INK; x.fillRect(-170, -220, 340, 440)
        x.fillStyle = '#8a4a2e'; x.fillRect(-164, -214, 328, 428)
        x.fillStyle = '#fff4e2'; x.fillRect(-146, -180, 292, 380)
        x.fillStyle = '#9aa5c4'; x.fillRect(-60, -232, 120, 44); x.fillStyle = INK; x.fillRect(-60, -232, 120, 6)
        x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGENDA', 0, -140)
        const ITEMS = ['1. small talk', '2. values', '3. your chart', '4. date: Fri']
        x.font = `800 34px ${INTER}`; x.textAlign = 'left'
        ITEMS.forEach((s, i) => {
          if (lt < 0.45 + i * 0.22) return
          x.fillStyle = i === 2 ? '#2fc79a' : INK; x.fillText(s, -122, -70 + i * 70)
        })
        const c = ease.outCubic(prog(lt, 1.3, 1.6))
        if (c > 0) { x.fillStyle = RED; x.fillRect(-128, -72, 230 * c, 7) }
        x.restore()
      }
      label(x, 320, 1135, 'SENT 9:00 A.M. SHARP', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: '#2fc79a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Answered one prompt. | *Broke the word limit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const LINES = ['that aliens finally visit', 'while I’m out, and they', 'leave a note, but I', 'can’t read alien, so', 'I take a class, which', 'raises the question…', 'and another thing—', 'chapter two:']
      promptCard(x, 735, 830, pop01(t, P.t0 + 0.15, 0.3, 2), 'My most irrational | fear is…', (w, h) => {
        const n = Math.min(LINES.length, Math.floor(Math.max(0, lt - 0.5) / 0.13))
        x.fillStyle = INK; x.font = `800 23px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        for (let i = 0; i < n; i++) x.fillText(LINES[i], -w / 2 + 26, -h / 2 + 182 + i * 32)
      }, { w: 380, h: 470 })
      label(x, 735, 1135, 'WORD LIMIT: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Swiped left by accident. | *On the one.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inCubic(prog(lt, 0.85, 1.25))
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        x.fillStyle = 'rgba(239,230,214,0.55)'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('no more', 0, -70); x.fillText('profiles', 0, -40)
        profile(x, -360 * p, -50 - 40 * p, 210, 300, '#7dffb0', { rot: -0.55 * p })
        if (p < 0.2) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 70, -150, 6)
        buttons(x, 170, lt > 0.6 && lt < 1.0 ? 1.2 : 1, 1)
      })
      label(x, 770, 580, lt < 0.85 ? '✦ PERFECT MATCH' : 'OOPS.', pop01(t, P.t0 + (lt < 0.85 ? 0.35 : 0.85), 0.3, 2.2), { size: 36, bg: lt < 0.85 ? GOLD : RED, color: lt < 0.85 ? INK : '#fff4e2', rot: -0.05 })
      label(x, 770, 1135, 'UNDO: NOT FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'trs3swipe', key: 'D', accent: '#ff8fb1',
  title: 'The signs swiping | *be like.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'aries', b: 'pisces', chip: 'MATCHED BY THE STARS' },
  group: { cap: 'Twelve signs. | *Swiped out.*' },
  lesson: { text: 'The app saw a face. | The stars saw *you.*', chip: 'CHART: READ' },
  last: {
    text: 'Rest that thumb. | The stars *got you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
