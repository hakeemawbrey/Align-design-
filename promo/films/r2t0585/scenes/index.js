// r2t0585: star_talk, SOLO (pisces), "Pisces texting | *be like.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine texting moments, each the most extreme (and lovable) Pisces version; Pisces cries in every
// card. Ending: callback (card 1's deleted paragraph finally gets sent).
//   typed a paragraph, sent "haha ok" · got a "k.", cried for an hour · a twelve-minute voice note · replied in their head,
//   three days ago · texts the dentist with a heart · rereads old chats, sobbing and smiling · sent a song instead of saying
//   it · checked the compatibility before replying "hi" · got "miss you", saved it forever
//   group "Feels every text. | *Deeply.*"   last "Finally sent | *the paragraph.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, meter, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const P1 = ['ok so I just', 'wanted to say', 'that I really', 'appreciate you', 'and also—']
const ph = (x, t, P, lines, o = {}) => phone(x, t, o.x ?? 785, o.y ?? 860, (o.s ?? 1.12) * pop01(t, P.t0 + 0.2, 0.3, 2), { size: 22, ...o, lines })
const LINE = (s, c, k, r) => [s, c, k, r]

const CAMEOS = [
  { sign: S, cap: 'Typed a whole paragraph. | *Sent “haha ok.”*', mood: lt => lt > 1.3 ? 'wide' : 'heart', tears: lt => lt > 1.3 ? 2 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const typed = Math.ceil(P1.length * prog(lt, 0.2, 0.9)), del = lt > 1.0
      ph(x, t, P, del ? [LINE('haha ok', ACC, pop01(lt, 1.15, 0.25, 2.2), true)] : P1.slice(0, typed).map(s => LINE(s, BONE, 1, true)), { head: del ? 'SENT' : 'TYPING…', headCol: del ? STEEL : ACC })
      if (del) L(x, 790, 1120, 'PARAGRAPH: DELETED', pop01(t, P.t0 + 1.0 * 1.29 + 0.2, 0.3, 2.2), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Got a “k.” | *Cried for an hour.*', mood: 'wide', tears: lt => lt < 0.7 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ph(x, t, P, [LINE('k.', BONE, 1)], { head: 'THEM', headCol: STEEL })
      L(x, 790, 1120, 'WHAT DID I DO', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: S, cap: 'Sent a voice note. | *Twelve minutes long.*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -70, 380, 140); x.fillStyle = ACC; x.fillRect(-182, -62, 364, 124)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-160, -24); x.lineTo(-120, 0); x.lineTo(-160, 24); x.fill()
        for (let i = 0; i < 22; i++) { const h = 10 + 36 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-100 + i * 12, -h / 2, 7, h) }
        x.restore()
      }
      L(x, 800, 1040, '12:04', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 48)
      bubble(x, 800, 660, '…and ANOTHER thing', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Replied in their head. | *Three days ago.*', mood: lt => lt > 1.3 ? 'wide' : 'sleepy', tears: lt => lt > 1.3 ? 2 : 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'aww thank you | so much!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 800, 860, '(IN THEIR HEAD)', pop01(t, P.t0 + 0.8, 0.3, 2), BONE, 0.04, 28)
      L(x, 800, 1080, 'UNREAD: 3 DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Texted the dentist. | *With a heart.*', mood: 'heart', tears: 1, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      ph(x, t, P, [LINE('see u tues!', BONE, 1, true), LINE('♡♡♡', PINK, lt > 0.8 ? pop01(lt, 0.8, 0.25, 2.2) : 0, true), LINE('…confirmed.', STEEL, lt > 1.4 ? pop01(lt, 1.4, 0.25, 2.2) : 0)], { head: 'DENTIST', headCol: MINT })
      hearts(x, t, 620, 820, P.t0 + 1.0, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Reread old chats. | *Sobbing. Smiling.*', mood: lt => Math.floor(lt * 2) % 2 ? 'happy' : 'wide', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ph(x, t, P, [LINE('2019', STEEL, 1), LINE('ur my best', BONE, 1), LINE('friend lol', BONE, 1), LINE('…still true', ACC, lt > 1.0 ? pop01(lt, 1.0, 0.25, 2.2) : 0, true)], { head: 'SCROLLED BACK', headCol: GOLD })
    } },
  { sign: S, cap: 'Couldn’t say it. | *Sent a song instead.*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      ph(x, t, P, [LINE('♫ track 7', ACC, 1, true), LINE('listen to', BONE, 1, true), LINE('the 2nd verse', BONE, 1, true)], { head: 'SENT', headCol: ACC })
      L(x, 790, 1120, 'MEANING: EVERYTHING', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Checked the compatibility | *before replying “hi.”*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 1, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 800, 680, '✦ NEW MATCH: ♋︎ CANCER', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.03, 28)
      meter(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), ease.inOutCubic(prog(lt, 0.3, 1.1)), { col: PINK, w: 340, title: 'COMPATIBILITY' })
      bubble(x, 800, 1060, 'hiii :)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Got a “miss you.” | *Saved it forever.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ph(x, t, P, [LINE('miss you', PINK, 1)], { head: 'BESTIE', headCol: PINK })
      L(x, 790, 1120, 'SCREENSHOTS: 14', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 32)
      hearts(x, t, 560, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0585', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Pisces texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Feels every text. | *Deeply.*', mood: 'heart' },
  last: {
    text: 'Finally sent | *the paragraph.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'pisces', 330, 1060, 280 * pop01(t, t0 + 0.3, 0.4, 1.8), { mood: lt > 1.8 ? 'heart' : 'wide', look: [1, 0], tears: 3, seed: 9 })
      const k = 1.25 * pop01(t, t0 + 0.6, 0.35, 2)
      phone(x, t, 720, 1060, k, { head: 'SENT ✓', headCol: ACC, size: 20, lines: [...P1.slice(0, 4).map(s => [s, BONE, 1, true]), ['aww SAME!!', MINT, lt > 1.6 ? pop01(lt, 1.6, 0.25, 2.2) : 0]] })
      hearts(x, t, 330, 960, t0 + 1.8, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
