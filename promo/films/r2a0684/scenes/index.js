// r2a0684: star_advice, ADVICE SOLO (cancer), "Cancer, before you | *send that text.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine soft pauses before hitting send, each with a warm reframe and one light gag.
// Ending: card (Cancer + Taurus: the steady one who texts back).
//   a paragraph? breathe first · feeling it big is allowed · three sent already, let them answer · midnight urge: the phone goes to bed too
//   · read it to a friend (Pisces holds the phone) · waiting? make tea (Taurus is typing…) · missing them? say it simply
//   · draft it in the shell first · sent it kindly, that's enough
//   group "Soft heart. | *Steady thumbs.*"   lesson "Your feelings are real. | Your *timing* can wait."   last "The right one | *texts back.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Typed a whole essay? | *Breathe first.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 420, head: 'DRAFT (P. 1/4)', headBg: ACC, headInk: INK, lines: ['hey so', 'i’ve been', 'thinking a', 'LOT about…'], size: 34, progress: prog(lt, 0.3, 1.0) })
      L(x, 800, 1120, 'INHALE… EXHALE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Feeling it big? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), b = 1 + 0.08 * Math.sin(t * 5)
      bits(x, 'HEARTB', 800, 860, 30 * k * b)
      L(x, 800, 1110, 'SIZE: EXTRA LARGE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Sent three already? | *Let them answer.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THEM', headCol: ACC, lines: [['hi', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['hello?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), true], ['u ok??', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), true]], size: 30 })
      L(x, 800, 1130, 'PHONE: DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Midnight text urge? | *The phone sleeps too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BED', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PHONE1', 730, 925, 10 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -1.4 })
      if (lt > 1.1) zzz(x, t, 820, 860, { alpha: clamp((lt - 1.1) * 3), size: 40 })
      bits(x, 'MOON', 880, 640, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
    } },
  { sign: S, cap: 'Read it to a friend. | *They’ll hold your phone.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 820, 950, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], tears: 2 })
      bits(x, 'PHONE1', 960, 1000, 9 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.2 })
      bubble(x, 800, 690, 'not tonight, | babe', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Waiting for a reply? | *Make some tea.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bits(x, 'TEA', 720, 1040, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 710, 980, { n: 2, alpha: 0.7, h: 90 })
      phone(x, t, 860, 830, 1.05 * pop01(t, P.t0 + 0.5, 0.3, 2), { head: 'TAURUS', headCol: '#5fd068', lines: [], typing: lt > 1.0 ? 1 : 0 })
      L(x, 860, 1080, 'TYPING…', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#5fd068', 0.04, 32)
    } },
  { sign: S, cap: 'Missing them? | *Say it simply.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 0.9) sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'DRAFT 6', headBg: STEEL, headInk: INK, lines: ['so i guess', 'what i mean', 'is that…'], size: 34 })
      else bubble(x, 800, 800, 'miss you :)', pop01(t, P.t0 + 0.95 * 1.29, 0.25, 2.4), { size: 58, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 1080, P.t0 + 1.4, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 3 })
    } },
  { sign: S, cap: 'Draft it in your shell. | *Send it in the morning.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 920); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.closePath(); x.fill()
        x.fillStyle = '#ffb3a1'; x.beginPath(); x.arc(0, 0, 140, Math.PI, 0); x.closePath(); x.fill()
        x.strokeStyle = '#e07a6a'; x.lineWidth = 8; for (let i = 1; i < 6; i++) { const a = Math.PI + i * Math.PI / 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); x.stroke() }
        x.restore()
      }
      L(x, 800, 1010, 'DRAFTS: SAFE', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 32)
      swapLabel(x, 800, 660, lt, 1.3, 'SEND: 1:14 AM', 'SEND: 9 AM', { size: 32, fromBg: LAV, toBg: GOLD })
    } },
  { sign: S, cap: 'You sent it kindly. | *That’s enough.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT', headCol: MINT, lines: [['thinking of', BONE, 1, true], ['you :)', BONE, 1, true], ['me too!!', '#5fd068', pop01(t, P.t0 + 1.4, 0.25, 2.4)]], size: 28 })
      hearts(x, t, 800, 640, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0684', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Cancer, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'REPLIED' },
  group: { cap: 'Soft heart. | *Steady thumbs.*', mood: 'heart' },
  lesson: { text: 'Your feelings are real. | Your *timing* can wait.', chip: 'DRAFT: SAVED' },
  last: { text: 'The right one | *texts back.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
