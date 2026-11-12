// v3t070: THE SIGNS AS… v3, SOLO film, "Your Aries friend | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine friendship situations, each pushed to the most extreme (and lovable) Aries version.
//   0.0–3.6    "Your Aries friend | *be like.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards: you said "bored", they're outside · someone was rude, complaint filed · lost a board game,
//              rematch · your walk, their marathon · a queue, so they started a new one · never let the microwave
//              finish · sang first at your birthday · said hi to your new match for you · a pep talk, now you're
//              running for mayor
//  37.8        "Loud. Fast. | *All heart.*"
//  41.0        LESSON UNLOCKED: "Keep your Aries close. | They *show up first.*"  STATUS: HYPED
//  46.9        "Already outside. | *Get in.*"  (the car from card one, back)
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, readout, confetti, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT } from './props.js'

const ACC = '#f0603a'

const CAMEOS = [
  { sign: 'aries', cap: 'You said “bored.” | They’re *already outside.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'ugh, bored', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      const d = ease.outCubic(prog(lt, 0.6, 1.0))
      if (lt > 0.55) bits(x, 'CAR', lerp(1000, 760, d), 890, 28)
      bubble(x, 790, 1100, 'GET IN.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Someone was rude to you? | Aries *already complained.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 360, rot: 0.04, head: 'COMPLAINT', headBg: ACC, align: 'left',
        lines: ['re: my friend', 'tone: unkind', 'action: NOW', '— ARIES'], size: 28, n: 1 + Math.floor(clamp((lt - 0.3) / 0.8) * 4) })
      label(x, 790, 1100, 'FILED IN 4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Lost a board game. | *Rematch.* Right now.', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(-0.08); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300)
        for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { x.fillStyle = (i + j) % 2 ? BONE : ACC; x.fillRect(-140 + i * 46.6, -140 + j * 46.6, 47, 47) }
        x.restore()
      }
      const n = 2 + Math.floor(clamp((lt - 0.8) / 1.2) * 7)
      label(x, 790, 640, `REMATCH #${n}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'best of 50?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Your plan: a walk. | Aries: *a marathon.*', mood: 'sparkle', star: { x: -180 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      bits(x, 'BOOT', 790, 860, 24 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: Math.sin(t * 12) * 0.06 })
      readout(x, 790, 1060, pop01(t, P.t0 + 0.7, 0.3, 2), `KM ${Math.floor(clamp((lt - 0.7) / 1.5) * 42)}`, { size: 50, color: ACC })
      bubble(x, 790, 650, 'warm-up done!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Stuck in a queue? | *Started a new one.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const IDS = ['taurus', 'libra', 'pisces']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, id, 620 + i * 130, 1000, 120 * k, { mood: lt > 1.4 ? 'wide' : 'sleepy', seed: 40 + i, glyph: false, look: [1, 0], tears: id === 'pisces' ? 1 : 0 }) })
      label(x, 790, 760, 'NEW LINE → HERE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: ACC, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'OLD LINE: EMPTY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Never once let | the *microwave finish.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bits(x, 'MICRO', 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = Math.max(47, 120 - Math.floor(lt * 60))
      readout(x, 790, 1020, pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.1 ? 'OPENED' : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, { size: 50, color: lt > 1.1 ? GOLD : MINT, w: 300 })
      label(x, 790, 1150, 'LEFT ON: 0:47', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Your birthday? | They sang *first.* Loudest.', mood: 'sparkle', star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P, F) {
      bits(x, 'CAKE', 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, F.x + 80, F.cy - 60, { n: 5, cell: 8, col: ACC, seed: 2 })
      bubble(x, 790, 650, 'HAPPY | BIRTHDAAAY', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'VOLUME: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'You got a new match? | Aries *said hi for you.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      phone(x, 790, 890, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 300, h: 420, head: 'YOUR MATCH',
        msgs: [{ t: 'hi! my friend | thinks you’re cute', me: true, c: ACC }, { t: 'haha hi!' }], n: lt > 1.4 ? 2 : lt > 0.8 ? 1 : 0, size: 24 })
      label(x, 450, 1140, 'WINGMAN: ARIES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'One pep talk. | Now you’re *running for mayor.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'you could | RUN THIS TOWN', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 900, 'VOTE: YOU', pop01(t, P.t0 + 1.0, 0.35, 2.4), { size: 60, bg: ACC, color: CREAM, rot: -0.05 })
      confetti(x, t, 790, 880, P.t0 + 1.1, { n: 18, spread: 200, h: 520 })
      label(x, 790, 1100, 'CAMPAIGN: ARIES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t070', key: 'G', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'Your Aries friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Fast. | *All heart.*', mood: 'sparkle' },
  lesson: { text: 'Keep your Aries close. | They *show up first.*', chip: 'STATUS: HYPED' },
  last: {
    text: 'Already outside. | *Get in.*',
    draw(x, t, lt) {
      const d = ease.outCubic(prog(lt, 0.4, 1.0))
      if (lt > 0.35) bits(x, 'CAR', lerp(1300, 700, d), 1230, 34)
      hearts(x, t, 540, 1200, t - lt + 1.1, { n: 6, life: 1.8, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
