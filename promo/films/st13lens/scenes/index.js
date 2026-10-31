// st13lens (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E39) · story 0–40.6, then the end card.
//   ❓ "Is astrology a *science*?"  ★ THE STARS teach a skeptical ♑ CAPRICORN (whistle and all), warm and honest, never
//   mocking either side: astronomy is the science of the sky (✓); astrology is a symbolic tradition (✦) that many people
//   use for reflection and conversation (✦); use it to ask better questions, never to decide for you (♥).
//   Lightbulb: "a lens, not a law. I can work with that." Last line (the Stars): "Use the sky to *ask* better."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar, STAR } from '../../startalk.js'
import { EX } from '../../stexplain.js'
import { drawWhistle, whistleCue } from './props.js'
import { makeEpisode } from './classkit.js'

const CAP = signStar('capricorn')

function pictures(x, t, B, M) {
  // the telescope (left)
  const a = clamp(prog(t, M.honest + 0.7, M.honest + 1.1))
  if (a > 0) {
    const cx = B.x0 + 200, cy = B.y0 + 150
    x.save(); x.globalAlpha *= a
    x.strokeStyle = EX.chalk; x.lineWidth = 5
    x.beginPath(); x.moveTo(cx, cy + 10); x.lineTo(cx - 50, cy + 66); x.moveTo(cx, cy + 10); x.lineTo(cx + 50, cy + 66); x.moveTo(cx, cy + 10); x.lineTo(cx, cy + 70); x.stroke()
    x.translate(cx, cy); x.rotate(-0.5)
    x.fillStyle = EX.ink; x.fillRect(-84, -18, 168, 36)
    x.fillStyle = EX.chalk; x.fillRect(-80, -14, 160, 28); x.fillStyle = EX.chalkBlue; x.fillRect(60, -18, 28, 36); x.fillStyle = '#ffffff'; x.fillRect(-70, -10, 110, 5)
    x.restore()
    // a little star it's looking at, twinkling
    const tw = 0.5 + 0.5 * Math.sin(t * 6)
    x.save(); x.globalAlpha *= a * (0.6 + 0.4 * tw); x.fillStyle = EX.chalkYellow
    const sx = B.x0 + 340, sy = B.y0 + 96; x.fillRect(sx - 4, sy - 12, 8, 24); x.fillRect(sx - 12, sy - 4, 24, 8); x.restore()
  }
  // the symbol wheel (right)
  const w = clamp(prog(t, M.astro + 0.6, M.astro + 1.2))
  if (w > 0) {
    const cx = B.x0 + 620, cy = B.y0 + 148, r = 62
    x.save(); x.globalAlpha *= w; x.strokeStyle = EX.lilac; x.lineWidth = 5
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2 * w); x.stroke()
    x.lineWidth = 3; x.globalAlpha *= 0.6
    for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6 + t * 0.15; x.beginPath(); x.moveTo(cx + Math.cos(an) * 22, cy + Math.sin(an) * 22); x.lineTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); x.stroke() }
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'st13lens', numeral: 'S13 E39', duration: 45, key: 'Eb',
  q: 'Is astrology a *science*?', qAccent: EX.chalkGreen,
  teacher: { tag: '★ THE STARS', color: STAR.sky, pitch: 523.25 },
  student: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 392,
    prop: (x, r, t, T) => drawWhistle(x, r.x + r.size * 0.38, r.y + r.size * 0.2, 5, { blow: T.M.whistle !== undefined ? clamp(1 - Math.abs(t - T.M.whistle - 0.25) / 0.35) : 0 }) },
  board: { title: 'SCIENCE OR STORY?' },
  script: [
    { who: 's', text: 'be honest with me. is astrology a science?', mark: 'whistle' },
    { who: 't', text: 'Honest answer? *Astronomy* is the science.', mark: 'honest', tag: { kind: 'sky', x: 20, y: 296 } },
    { who: 't', text: '*Astrology* is a symbolic tradition.', mark: 'astro', tag: { kind: 'astro', x: 440, y: 296 } },
    { who: 't', text: 'Many people use it to reflect and to talk.', mark: 'use', tag: { kind: 'astro', x: 440, y: 426 } },
    { who: 's', text: "so... it's poetry with a calendar?", mark: 'huh' },
    { who: 't', text: 'Ha! Something like that. A lens, not a lab.' },
    { who: 't', text: 'Use it to ask better *questions*.', mark: 'tip', tag: { kind: 'tip', x: 20, y: 426 } },
    { who: 't', text: 'Never let it decide *for* you.' },
    { who: 's', text: 'a lens, not a law. I can *work* with that.', mark: 'bulb' },
  ],
  bulb: 'bulb',
  chalk: [
    { line: [[410, 20], [410, 450]], at: 'honest+0.1', dur: 0.5, width: 4, dash: [10, 10] },
    { text: 'ASTRONOMY', x: 20, y: 62, at: 'honest+0.3', size: 34, color: EX.chalkGreen },
    { draw: pictures },
    { text: '= the *science*', x: 20, y: 228, at: 'honest+1.0', size: 28 },
    { text: 'ASTROLOGY', x: 440, y: 62, at: 'astro+0.2', size: 34, color: EX.lilac },
    { text: '= *symbolic*', x: 440, y: 228, at: 'astro+0.8', size: 28 },
    { text: 'REFLECT + TALK', x: 440, y: 356, at: 'use+0.5', size: 26 },
    { text: '*ASK*, DON\'T OBEY', x: 20, y: 356, at: 'tip+0.4', size: 26, color: EX.chalkPink },
  ],
  recap: ['Astronomy: the *science*', 'Astrology: a *symbolic* lens', "Ask with it. Don't *obey* it."],
  last: 'Use the sky to *ask* better.', lastWho: 't',
  cues: (T, M) => [...whistleCue(+(M.whistle + 0.05).toFixed(3), 0.3)],
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap' || ph === 'bulb') return { mood: 'happy', look: [1, 0] }
      if (t >= M.huh && t < M.tip) return { mood: 'happy', look: [1, 0] }
      if (ph === 'q' || ph === 0) return { mood: 'neutral', look: [1, 0] }
      return { mood: 'neutral', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'squint', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, 0] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, -1] }
    if (t < M.astro) return { mood: 'squint', look: [-1, 0] }
    if (t >= M.huh && t < M.huh + 2.2) return { mood: 'eyeroll' }
    return { mood: 'neutral', look: [-1, -1] }
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
