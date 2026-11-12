// r2t0544: star_talk, SOLO (gemini), "Geminis telling | a story." (signs3kit social cut, music: lofi · D).
// Nine cards, each the most extreme Gemini storyteller. Ending: group (the group beat is the punchline: part two tomorrow).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -170 }

/** a voice-note chip: play triangle + waveform bars that wiggle */
function voiceNote(x, t, cx, cy, k, len) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -46, 300, 92); x.fillStyle = MINT; x.fillRect(-142, -38, 284, 76)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-122, -18); x.lineTo(-122, 18); x.lineTo(-96, 0); x.fill()
  for (let i = 0; i < 12; i++) { const h = 8 + Math.abs(Math.sin(t * 6 + i * 1.3)) * 26; x.fillRect(-80 + i * 14, -h / 2, 8, h) }
  x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(len, 136, 0)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Started with “so…” | *Forty minutes ago.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      bits(x, 'CLOCK', 790, 880, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1090, 'STILL THE INTRO', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Did all the voices. | *Even the dog’s.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'and I said—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 820, 850, 'and HE said—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 1040, 'WOOF.', pop01(t, P.t0 + 1.4, 0.25, 2.6), { size: 60, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Three side stories in. | *Lost the main one.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha *= clamp(k); x.strokeStyle = BONE; x.lineWidth = 6
        const pts = [[790, 640], [690, 800], [890, 800], [640, 960], [740, 960], [940, 960]]
        for (const [a, b] of [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]]) { if (prog(lt, 0.3 + a * 0.15, 0.6 + a * 0.15) <= 0) continue; x.beginPath(); x.moveTo(...pts[a]); x.lineTo(...pts[b]); x.stroke() }
        pts.forEach(([px, py], i) => { if (lt > 0.2 + i * 0.15) { x.fillStyle = INK; x.fillRect(px - 26, py - 26, 52, 52); x.fillStyle = [GOLD, PINK, SKYB, MINT, LAV, '#ffb34a'][i]; x.fillRect(px - 20, py - 20, 40, 40) } })
        x.restore()
      }
      L(x, 790, 1110, 'MAIN STORY: ???', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Typed it in the chat. | *Then voice-noted it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: GOLD, lines: [['ok so', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['long story', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2), true]] })
      voiceNote(x, t, 790, 1060, pop01(t, P.t0 + 1.2, 0.3, 2), '14:52')
    } },
  { sign: S, cap: 'Acted it out. | *Used the furniture.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -60 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'COUCH', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 760, 720, 'SCENE 2: THE COUCH', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'New detail each retelling. | *Now there’s a horse.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.18))
      L(x, 790, 680, `VERSION ${v}`, pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 38)
      bubble(x, 790, 900, '…and a horse | showed up!', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Told the ending first. | *Still a cliffhanger.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI })
      L(x, 790, 1040, 'SPOILERS: INCLUDED', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 30)
      bubble(x, 790, 640, 'but HOW?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'So good, strangers | *pulled up chairs.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 700, 1000, 140, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'wide', look: [-1, 0] })
      friend(x, t, 'virgo', 860, 1000, 140, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'wide', look: [-1, 0] })
      friend(x, t, 'aquarius', 780, 840, 120, pop01(t, P.t0 + 1.2, 0.3, 2), { mood: 'heart', look: [-1, 0] })
      L(x, 790, 650, 'AUDIENCE: GROWING', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Wasn’t even there. | *Told it best.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so I heard…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 790, 920, 'SOURCE: A FRIEND', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 790, 1000, 'OF A FRIEND', pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, 0.04, 30)
      sparkles(x, t, 790, 700, P.t0 + 1.6, 6, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0544', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Geminis telling | *a story.*',
  cameos: CAMEOS,
  group: { cap: 'True? Doesn’t matter. | *Part two tomorrow.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
