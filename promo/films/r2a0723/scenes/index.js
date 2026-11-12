// r2a0723: star_advice, ADVICE SOLO (pisces), "How to befriend | a Pisces." (the batch hook "How to make friends with a Pisces", re-worded to fit two lines; signs3kit social cut, lofi · C).
// One sign the whole way: nine warm, relatable ways to befriend a Pisces, tears in every card. Ending: callback.
//   compliment the doodle (they frame it) · remember the fish's name (Bubbles) · let them pick the vibe (dreamy)
//   · laugh at the pun, even the bad one · send one little heart (screenshotted) · hold tissues at the happy part too
//   · ask what the mood ring means · ask their rising sign (clear your evening) · be soft back
//   group "Soft hearts. | *Friends for life.*"
//   last "Bubbles the fish | *approves of you.*" (the fishbowl from card 2 comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Compliment their doodle. | *They’ll frame it.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FRAME', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      bubble(x, 800, 650, 'wait, this is | so good!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1120, 'NOW: A MUSEUM PIECE', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Remember their fish’s name. | *Instant bond.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', tears: lt => lt > 1.2 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'FISHBOWL', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'how’s Bubbles?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1120, 'YOU REMEMBERED?!', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Let them pick the vibe. | It’s *always “dreamy.”*', mood: 'sparkle', tears: 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 1.0, 'TONIGHT’S VIBE: ?', 'VIBE: DREAMY', { size: 36, fromBg: STEEL, toBg: LAV })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 8, 180, 0.2, [LAV, SKYB, PINK])
      bits(x, 'MOON', 820, 980, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: S, cap: 'Laugh at their pun. | *Even the bad one.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', tears: lt => lt > 1.3 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'we’re o-fish-ally | friends now', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      friend(x, t, 'gemini', 830, 1000, 160, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'wide', look: [-1, 0], hops: [P.t0 + 1.3, P.t0 + 1.6] })
      L(x, 800, 860, 'PUN: TERRIBLE. LOVED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'Send one little heart. | *They’ll screenshot it.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', tears: lt => lt > 1.1 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, size: 44, lines: [['<3', PINK, pop01(t, P.t0 + 0.6, 0.25, 2.2)]] })
      const fl = clamp((lt - 1.2) / 0.15)
      if (fl > 0 && lt < 1.6) { x.save(); x.globalAlpha = 0.6 * (1 - clamp((lt - 1.35) / 0.25)); x.fillStyle = '#ffffff'; x.fillRect(630, 620, 340, 520); x.restore() }
      L(x, 800, 1150, 'SAVED FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Bring tissues | *for the happy part too.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'THE GOOD ENDING', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 800, 820, 'they hugged!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Ask about the mood ring. | *Really listen.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MRING', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'BLUE = SOFT DAY', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, -0.04, 34)
      L(x, 800, 1100, 'PURPLE = MISSED YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Ask their rising sign. | *Clear your evening.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      bubble(x, 800, 650, 'okay so, my moon…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 1100, 'RUNTIME: 2 HOURS', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Be soft back. | *That’s the whole secret.*', mood: 'heart', tears: 2, star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 980, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      L(x, 800, 700, 'FRIEND: FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 36)
      hearts(x, t, 700, 940, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0723', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to befriend | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft hearts. | *Friends for life.*', mood: 'heart' },
  last: {
    text: 'Bubbles the fish | *approves of you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, S, 380, 1060, 280 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], seed: 88, glyph: false, tears: 2 })
      bits(x, 'FISHBOWL', 760, 1060, 22 * pop01(t, t0 + 0.7, 0.35, 2))
      L(x, 760, 1260, 'BUBBLES: 10/10', pop01(t, t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
      hearts(x, t, 760, 940, t0 + 1.4, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
