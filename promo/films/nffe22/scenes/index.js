// nffe22: FRIENDS FIRST ep 22, "Talk cards at friends' night" (25 s vertical, star_advice, music: pop · F).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–6.6    "One question changed | *friends' night.*"  The long table, phones in a basket, Gemini mid-hop. A talk card
//              flips: "What made you proud this year?"  GEMINI: "surviving my group chat."  LEO: "my hair, honestly."
//              Everyone laughs. Pisces sniffles at the end of the table.
//   6.6        card cut.  THE STARS: "one real question makes room for a *real* answer."
//   10.8       the table. CAPRICORN: "honestly? letting you all help me."  A beat of quiet… then everyone cheers;
//              LEO: "PROUD OF YOU!!"  Confetti, hearts, Pisces fountains.
//   17.0       Last line: "Ask what *matters.*"
import { makeFriends, stars, bubble, dinnerTable, box, R, INK, BONE, INTER, SERIF, confetti, hearts, pop01, outK, ease, prog } from '../../nffe01/scenes/friendskit.js'

const GEM = 'gemini', LEO = 'leo', CAP = 'capricorn', CAN = 'cancer'
function talkCard(x, t, at, out) {
  const fl = ease.inOutCubic(prog(t, at, at + 0.5)), k = outK(t, out)
  if (k <= 0.01) return
  x.save(); x.translate(540, 640); x.scale(k * Math.max(0.04, Math.abs(Math.cos(Math.PI * fl))), k)
  if (fl < 0.5) { box(x, -230, -140, 460, 280, '#c0577a', { b: 8 }); for (let i = 0; i < 5; i++) R(x, 'rgba(255,255,255,0.15)', -200 + i * 90, -110, 40, 220) }
  else {
    box(x, -230, -140, 460, 280, BONE, { b: 8 }); R(x, '#ffb37a', -230, -140, 460, 46)
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -117)
    x.font = `italic 500 50px ${SERIF}`; x.fillStyle = INK; x.fillText('What made you', 0, -22); x.fillText('proud this year?', 0, 38)
  }
  x.restore()
}
function basket(x) { box(x, 900, 1030, 140, 60, '#a8744a', { b: 5 }); for (let i = 0; i < 3; i++) { R(x, INK, 915 + i * 40, 1000, 30, 40); R(x, '#2c3f78', 919 + i * 40, 1004, 22, 32) } }
const CAST = [[GEM, 180], [LEO, 390], [CAP, 600], [CAN, 800]]
const EP = makeFriends({
  id: 'nffe22', dur: 25, cut: 6.6,
  hook: { text: 'One question changed | *friends’ night.*', out: 3.2, color: '#ffb37a' },
  lines: [stars(7.0, 'one real question makes room for a *real* answer.')],
  boxes: [{ from: 0, to: 1, close: 10.6 }],
  last: { at: 17.0, text: 'Ask what *matters.*', color: '#ffb37a' },
  shots: [
    { at: 0, set: 'dinner', cam: [1.05, 540, 930], pis: { x: 960, y: 1260, s: 100, tears: 1, mood: 'sparkle', look: [-1, -1] },
      draw(x, t, S) {
        const laugh = t > 5.9
        CAST.forEach(([sg, cx], i) => S.star(x, t, sg, { x: cx, y: 1000, s: 200, mood: laugh ? 'happy' : sg === CAP ? 'neutral' : 'sparkle', look: [0, -0.5], hops: [...(i === 0 ? [-0.12, 4.3] : []), ...(sg === LEO ? [5.2] : []), ...(laugh && sg !== CAP ? [5.95 + i * 0.08, 6.3 + i * 0.08] : [])] }))
        talkCard(x, t, 2.6, [6.3, 6.55])
        bubble(x, t, 250, 770, 4.3, 6.5, 'surviving my group chat.', { size: 32, col: '#ffe58a', maxW: 340 })
        bubble(x, t, 560, 880, 5.2, 6.5, 'my hair, honestly.', { size: 32, col: '#ffc38a' })
      },
      front(x, t) { dinnerTable(x, t); basket(x) } },
    { at: 6.6, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [6.65, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAP, { x: 220, y: 1250, s: 160, mood: t < 8.8 ? 'neutral' : 'sparkle', look: [1, -1], hops: [8.9] })
      } },
    { at: 10.8, set: 'dinner', cam: [1.05, 540, 930], pis: { x: 960, y: 1260, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const cheer = t > 12.9
        CAST.forEach(([sg, cx], i) => S.star(x, t, sg, { x: cx, y: 1000, s: sg === CAP ? 230 : 200, mood: sg === CAP ? (cheer ? 'sparkle' : 'neutral') : cheer ? 'happy' : t > 12.0 ? 'wide' : 'neutral', look: sg === CAP ? [0, 0] : [cx < 600 ? 1 : -1, 0], hops: sg === CAP ? [11.0, 13.0] : cheer ? [12.95 + i * 0.07, 13.5 + i * 0.07, 14.2 + i * 0.07] : [] }))
        bubble(x, t, 600, 780, 11.0, 12.9, 'honestly? letting you all help me.', { size: 34, col: '#e9d9a8', maxW: 460 })
        bubble(x, t, 390, 800, 13.6, 16.8, 'PROUD OF YOU!!', { size: 44, col: '#ffc38a' })
        confetti(x, t, 12.95, 600, 760, { n: 34 }); hearts(x, t, 13.4, 600, 880, { n: 8 })
      },
      front(x, t) { dinnerTable(x, t); basket(x) } },
  ],
  cues: [
    ['tick', 2.6, 0.04], ['whoosh', 2.75, 0.2, 0.025], ['pluck', 3.1, 1318.51, 0.04, 0.6, 0],
    ['pop', 4.3, 987.77, 0.035, -0.3], ['pop', 5.2, 1174.66, 0.035, -0.1], ...[5.95, 6.1, 6.25].map(a => ['pop', a, 1318.51, 0.025, 0.2]),
    ['pop', 11.0, 739.99, 0.035, 0.1], ['boom', 12.95, 0.2], ['pop', 12.95, 1567.98, 0.05, 0], ['glitter', 12.95, 13.6], ['pop', 13.6, 1174.66, 0.04, -0.2],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
