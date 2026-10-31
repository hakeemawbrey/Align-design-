// st12doubletext (15 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E08) · story 0–10.6, then the end card.
//   🔥 HOT TAKE: "Double texting is *allowed*." (heat 3). ♊ GEMINI, phone in hand, has already sent two blue bubbles;
//   ♑ CAPRICORN bursts in with the whistle: "one message. dignity." THE STARS RULE: two texts is fine, ten
//   unanswered texts is a sign. Last line (Gemini): "Text twice. *Read* the room."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawWhistle } from './props.js'
import { makeEpisode, R, INK, BONE, pop01, r3 } from './hotkit.js'
import { whistleCue } from './props.js'

const GEM = signStar('gemini'), CAP = signStar('capricorn')
const BLUE = '#4f8dff'

function bubble(x, t, at, bx, by, text, { k = 1, color = BLUE, ink = '#ffffff', w } = {}) {
  const p = pop01(t, at, 0.3, 2.4)
  if (p <= 0 || k <= 0) return
  x.save(); x.globalAlpha *= k
  x.font = "700 30px Inter, 'Helvetica Neue', Arial, sans-serif"
  const tw = w || Math.ceil(x.measureText(text).width) + 44, h = 62
  x.translate(bx, by); x.scale(p, p)
  R(x, INK, -tw - 6, -h / 2 - 6, tw + 12, h + 12)
  R(x, color, -tw, -h / 2, tw, h)
  R(x, color, -14, h / 2, 14, 12)                                  // the tail (right, "sent")
  R(x, 'rgba(255,255,255,0.25)', -tw, -h / 2, tw, 6)
  x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(text, -tw + 22, 2)
  x.restore()
}
function phone(x, cx, cy, t, buzz) {
  const b = buzz > 0 && buzz < 1 ? (Math.floor(t * 30) % 2 ? 3 : -3) : 0
  x.save(); x.translate(cx + b, cy); x.rotate(-0.16)
  R(x, INK, -34, -58, 68, 116); R(x, '#3b2f63', -30, -54, 60, 108); R(x, '#9fd8ff', -24, -44, 48, 84)
  R(x, BLUE, -18, -36, 34, 12); R(x, BLUE, -14, -18, 30, 12); R(x, '#c4e8ff', -24, -44, 48, 6)
  x.restore()
}

const EP = makeEpisode({
  id: 'st12doubletext', numeral: 'S12 E08', duration: 15, key: 'E',
  take: 'Double texting is *allowed*.', takeAccent: '#9be1ff', heat: 3,
  pro: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 784,
    prop: (x, r, t) => phone(x, r.x + 128, r.y + 34, t, prog(t, 0.9, 1.4)) },
  con: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 392,
    prop: (x, r, t, T) => drawWhistle(x, r.x - 118, r.y + 46, 6, { blow: clamp(1 - Math.abs(t - T.obj - 0.25) / 0.35) }) },
  lines: [
    ['con', 'one message. *dignity.*'],
    ['pro', 'what if they just *missed it?*'],
  ],
  verdict: 'two texts is fine. ten unanswered texts is a sign.',
  last: 'Text twice. *Read* the room.', lastWho: 'pro',
  moods(ph, t, T) {
    if (ph === 'take') return [{ mood: 'wink', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 1) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'eyeroll' }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [-1, 0] }]
  },
  set(x, t, T) {
    // the thread, floating over Gemini: two sent bubbles (the double text), then a "Read" receipt at the last line
    const k = 1 - 0.7 * clamp(prog(t, T.verdict - 0.3, T.verdict))
    bubble(x, t, -1, 520, 760, 'hey! how was the thing?', { k })
    bubble(x, t, 0.9, 520, 846, 'also saw a dog. thought of u', { k })
    const rd = prog(t, T.last - 0.1, T.last + 0.2)
    if (rd > 0) {
      x.save(); x.globalAlpha *= rd
      x.font = "700 24px 'Space Mono', monospace"; x.textAlign = 'right'; x.fillStyle = BONE
      x.fillText('Read', 520, 908); x.restore()
    }
    void ease
  },
  cues: T => [
    ['pop', 0.9, 1174.66, 0.05, -0.3], ['tick', 0.92, 0.04],
    ...whistleCue(r3(T.obj + 0.05), 0.3),
    ['pop', r3(T.last - 0.1), 1318.51, 0.04, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
