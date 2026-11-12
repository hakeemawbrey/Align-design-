// r2t0040: THE SIGNS AS… v3 BE LIKE, "Zodiacs liking an old photo by accident | be like." (~57 s vertical, signs3kit
// social cut, music: lofi · F). Twelve signs in zodiac order. Ending: callback.
//   0.0–3.6    "Zodiacs liking an old photo by accident | *be like.*"
//   3.6–49.2   Aries commented "nice" too · Taurus froze for an hour · Gemini unliked, liked again · Cancer liked more
//              (nostalgia) · Leo: their own old photo, on purpose · Virgo: a flowchart (what now?) · Libra polled six friends
//              · Scorpio: not an accident · Sagittarius moved country · Capricorn: networking · Aquarius deleted the
//              account (back in ten) · Pisces wrote a poem about it
//  49.2        "One tap. | *Twelve meltdowns.*"
//  52.6        CALLBACK: "Gemini’s like? | *Still deciding.*"  The heart flickers on and off.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#7ee08a', HOT = '#ff5f8f'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// a phone showing an old photo (a little star with a bowl cut), with a like heart under it
function oldPhoto(x, t, cx, cy, k, { liked = true, who = 'libra', year = '2014', s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k * s, k * s)
  shadow(x, -130, -210, 260, 420); box(x, -130, -210, 260, 420, NAVY); x.fillStyle = '#140c30'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#c9a26a'; x.fillRect(-100, -160, 200, 200)
  signChar(x, t, who, 0, -50, 140, { mood: 'happy', seed: 61, glyph: false, glow: 0.3 })
  x.fillStyle = 'rgba(120,80,20,0.25)'; x.fillRect(-100, -160, 200, 200)
  txt(x, year, 60, 24, 22, '#fff4e2', { font: MONO, weight: 700 })
  if (liked) drawBits(x, HEART, { H: RED, W: '#fff' }, -60, 100, 9)
  else { x.save(); x.globalAlpha = 0.6; drawBits(x, HEART, { H: '#3a2a6a', W: '#5a4a7a' }, -60, 100, 9); x.restore() }
  txt(x, liked ? '1 like' : '0 likes', 30, 100, 26, BONE)
  x.restore()
}
function statue(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -110, 120, 220, 60); box(x, -110, 120, 220, 60, '#c9c9d8')
  x.restore()
}
function album(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -190, -130, 380, 260); box(x, -190, -130, 380, 260, BROWN); x.fillStyle = '#fff4e2'; x.fillRect(-176, -116, 352, 232); x.fillStyle = INK; x.fillRect(-3, -116, 6, 232)
  const n = Math.min(4, Math.floor(clamp((lt - 0.4) / 1.2) * 4.99))
  for (let i = 0; i < 4; i++) { const px = -88 + (i % 2) * 176, py = -50 + Math.floor(i / 2) * 110; box(x, px - 60, py - 40, 120, 80, '#c9a26a', 4); if (i < n) drawBits(x, HEART, { H: RED, W: '#fff' }, px + 44, py + 32, 5) }
  x.restore()
}
function flowchart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const nodes = [[0, -170, 'LIKED IT', BONE], [-100, -20, 'UNLIKE?', LAV], [100, -20, 'MOVE?', PINK], [0, 140, 'PANIC', RED]]
  const n = Math.floor(clamp((lt - 0.2) / 1.4) * 4.99)
  x.strokeStyle = BONE; x.lineWidth = 6
  if (n > 1) { x.beginPath(); x.moveTo(0, -140); x.lineTo(-100, -50); x.moveTo(0, -140); x.lineTo(100, -50); x.stroke() }
  if (n > 3) { x.beginPath(); x.moveTo(-100, 10); x.lineTo(0, 110); x.moveTo(100, 10); x.lineTo(0, 110); x.stroke() }
  nodes.slice(0, n).forEach(([px, py, w, c]) => { box(x, px - 84, py - 26, 168, 52, c, 4); txt(x, w, px, py + 2, 22, c === RED ? '#fff4e2' : INK, { font: MONO, weight: 700 }) })
  x.restore()
}
function globe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill(); x.fillStyle = SKYB; x.beginPath(); x.arc(0, 0, 102, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 102, 0, Math.PI * 2); x.clip(); x.fillStyle = GREEN
  const o = (t * 40) % 240
  for (const [a, b, w, h] of [[-80, -40, 70, 50], [20, 10, 90, 60], [-30, 50, 50, 30], [100, -60, 60, 40]]) { x.fillRect(a - o, b, w, h); x.fillRect(a - o + 240, b, w, h) }
  x.restore()
  // a little plane looping round
  const a = t * 1.8
  x.save(); x.rotate(a); x.translate(0, -140); box(x, -26, -8, 52, 16, BONE, 4); box(x, -6, -24, 12, 48, BONE, 3); x.restore()
  x.restore()
}
function briefcase(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -140, -80, 280, 180); box(x, -140, -80, 280, 180, BROWN)
  x.strokeStyle = INK; x.lineWidth = 12; x.strokeRect(-50, -130, 100, 50); box(x, -20, -10, 40, 30, GOLD, 4)
  x.restore()
}
function poem(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  shadow(x, -150, -190, 300, 380); box(x, -150, -190, 300, 380, '#fff4e2')
  txt(x, 'Ode to a Like', 0, -146, 30, '#6b62a8', { font: INTER, weight: 800 })
  const L = ['oh tiny heart,', 'oh fateful tap,', 'a thumb that', 'slipped…', '(verse 2 of 9)']
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 5.99)
  L.slice(0, n).forEach((l, i) => txt(x, l, -120, -90 + i * 46, 26, INK, { font: INTER, weight: 700, align: 'left' }))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Liked their match’s old photo. | *Commented “nice.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      oldPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { who: 'libra' })
      bubble(x, 790, 1110, 'nice', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Froze. | *Didn’t move for an hour.*', mood: 'wide', look: [1, 0], squash: 0, star: { x: -170 }, hops: [],
    front(x, t, lt, P) {
      oldPhoto(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { who: 'virgo', s: 0.85 })
      label(x, 790, 1110, 'STILL FROZEN · 4:12 PM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Unliked it. | *Liked it again.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'wide', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { oldPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { who: 'leo', liked: Math.floor(lt * 2.4) % 2 === 0 }) } },
  { sign: 'cancer', cap: 'Got nostalgic. | *Liked the whole album.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      album(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lt)
      label(x, 780, 680, 'SUMMER 2009', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Liked their own old photo. | *On purpose.*', mood: 'wink', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      oldPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { who: 'leo', year: '2016' })
      label(x, 790, 1110, 'STILL ICONIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made a flowchart. | *“What now?”*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { flowchart(x, 780, 880, pop01(t, P.t0 + 0.1, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Asked six friends | *whether to unlike.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'unlike it!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
      bubble(x, 760, 820, 'leave it', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      bubble(x, 800, 960, 'move to a farm', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      label(x, 790, 1110, 'VOTE: TIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Accident? | *Not an accident.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      oldPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { who: 'taurus', year: '2012' })
      label(x, 790, 1110, 'HELLO ♥', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Liked it. | *Moved to another country.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      globe(x, t, 350, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 350, 1100, 'NEW LIFE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Liked it. | *Called it networking.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      briefcase(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'STRATEGIC LIKE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Deleted the account. | *Back in ten minutes.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'ACCOUNT DELETED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 940, 'NEW ACCOUNT ✦', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Liked it. | *Wrote a poem about it.*', mood: lt => lt < 0.8 ? 'wide' : 'sparkle', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) { poem(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
]

// the hook is long: shrink each title line on its own until it fits the safe box (keeps "be like." big)
function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const lines = [[]]
      for (const n of tb.childNodes) { if (n.nodeName === 'BR') lines.push([]); else lines[lines.length - 1].push(n) }
      for (const ln of lines) {
        const w = ln.reduce((a, n) => a + (n.offsetWidth || 0) + 0.24 * (parseFloat(n.style?.fontSize) || 92), 0)
        if (w <= maxW) continue
        const k = (maxW - 8) / w
        for (const n of ln) if (n.nodeType === 1) n.style.fontSize = (parseFloat(getComputedStyle(n).fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0040', key: 'F', accent: HOT, ending: 'callback',
  title: 'Zodiacs liking an old photo | by accident *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One tap. | *Twelve meltdowns.*', moods: ['wide', 'wide', 'wink', 'heart', 'sparkle', 'squint', 'wide', 'wink', 'sparkle', 'neutral', 'wide', 'wide'] },
  last: {
    text: 'Gemini’s like? | *Still deciding.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      const on = Math.floor(lt * 2.4) % 2 === 0
      if (k > 0.01) signChar(x, t, 'gemini', 340, 1080, 260 * k, { mood: on ? 'wink' : 'wide', look: [on ? 1 : -1, 0], seed: 40 })
      oldPhoto(x, t, 760, 1080, pop01(t, t0 + 0.7, 0.35, 2) * 0.9, { who: 'leo', liked: on })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
