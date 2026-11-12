// r2t0756: star_talk, SOLO (cancer), "Cancers texting | *be like.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine texting moments, each the most extreme (and lovable) Cancer version.
// Ending: callback (the six apologies from card 1 finally get a reply).
//   sent "hey", then six apologies · three minutes, no reply: grieving · sweet text: screenshotted forever
//   · walked to the mailbox, texted mom "home safe" · you sent "ok." and Cancer went into their shell
//   · texted your dog happy birthday · a fourteen-minute voice note · dead group chat, still says good morning
//   · a new match said hi, Cancer saved the date
//   group "Soft shell. | *Softer texts.*"   last "Six apologies later: | *“lol you’re fine.”*"
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, wave, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }
const chip = (t, P, txt, col, d, right = true) => [txt, col, pop01(t, P.t0 + d, 0.2, 2), right]

const CAMEOS = [
  { sign: S, cap: 'Sent “hey.” | Then *six apologies.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW CHAT', headCol: SKYB, size: 24, lines: [
        chip(t, P, 'hey', MINT, 0.3), chip(t, P, 'sorry', '#ffb0c8', 0.8), chip(t, P, 'ignore that', '#ffb0c8', 1.1), chip(t, P, 'unless??', '#ffb0c8', 1.4), chip(t, P, 'sorry again', '#ffb0c8', 1.7)] })
      L(x, 800, 1130, 'APOLOGIES SENT: 6', pop01(t, P.t0 + 1.9, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'No reply in three minutes? | *Already grieving.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.0) * 3))
      L(x, 800, 640, `NO REPLY: 0${m}:00`, pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 34)
      bits(x, 'TISSUE', 800, 900, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 800, 1110, 'it was nice | while it lasted', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'A sweet text? | Screenshotted *forever.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 820, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: MINT, size: 24, lines: [chip(t, P, 'u made my day', BONE, 0.3, false)] })
      const flash = lt > 0.9 && lt < 1.1
      if (flash) { x.save(); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(676, 626, 248, 388); x.restore() }
      const n = Math.floor(lerp(1203, 1204, clamp((lt - 1.0) / 0.1)))
      L(x, 800, 1110, `SAVED FOREVER: ${lt > 1.0 ? n : 1203}`, pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 28)
      hearts(x, t, 560, 760, P.t0 + 1.1, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Walked to the mailbox. | Texted mom *“home safe.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 700, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 880, 1060, 'MAILBOX: 6 STEPS', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 26)
      phone(x, t, 830, 750, 0.85 * pop01(t, P.t0 + 0.8, 0.3, 2), { head: 'MOM ♥', headCol: PINK, size: 26, lines: [chip(t, P, 'home safe!', MINT, 1.0), chip(t, P, 'proud of u', BONE, 1.6, false)] })
    } },
  { sign: S, cap: 'You texted “ok.” | Cancer *moved into their shell.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -190, y: 20 },
    front(x, t, lt, P, F) {
      phone(x, t, 820, 760, 0.95 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: MINT, size: 30, lines: [chip(t, P, 'ok.', BONE, 0.3, false)] })
      // the shell: a big blanket dome slides over the star
      const d = ease.outCubic(clamp((lt - 0.9) / 0.5))
      if (lt > 0.9) bits(x, 'BLANKET', F.x, lerp(560, F.cy + 30, d), 22)
      L(x, 800, 1110, 'SHELL MODE: ON', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ff8a6a', -0.04, 32)
    } },
  { sign: S, cap: 'Texted your dog | *happy birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 820, 760, 0.95 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BISCUIT', headCol: GOLD, size: 24, lines: [chip(t, P, 'happy bday!!', MINT, 0.4), chip(t, P, 'ur a good boy', MINT, 0.8)] })
      bits(x, 'DOG', 820, 1050, 16 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
      bits(x, 'HAT', 805, 950, 9 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
      sparkles(x, t, 820, 1040, P.t0 + 1.4, 6, 120, 0.4)
    } },
  { sign: S, cap: 'Sent a voice note. | *Fourteen minutes.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = Math.floor(clamp((lt - 0.3) / 1.6) * 842)
      wave(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, col: SKYB, time: `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` })
      bubble(x, 800, 640, '…anyway, miss u', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1080, 'MAIN POINT: AT 13:58', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Group chat’s dead. | Still says *good morning.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      phone(x, t, 810, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY (silent)', headCol: STEEL, size: 22, lines: [
        chip(t, P, 'morning fam!', MINT, 0.3), chip(t, P, 'morning!!', MINT, 0.8), chip(t, P, 'morning :)', MINT, 1.3), chip(t, P, 'anyone?', MINT, 1.8)] })
      L(x, 810, 1130, 'DAY 41', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, -0.05, 32)
    } },
  { sign: S, cap: 'New match said “hi.” | Cancer *saved the date.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 640, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 32)
      bubble(x, 800, 790, 'hi', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 960, 'ANNIVERSARY: TODAY', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 30)
      L(x, 800, 1090, 'REMINDER: YEARLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.03, 28)
      hearts(x, t, 560, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0756', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancers texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Softer texts.*', mood: 'heart' },
  last: {
    text: 'Six apologies later: | *“lol you’re fine.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, t, 540, 1080, 1.3 * pop01(t, t0 + 0.6, 0.35, 2), { head: 'NEW CHAT', headCol: SKYB, size: 26, rot: 0.03, lines: [
        ['sorry again', '#ffb0c8', 1, true], ['lol you’re fine', MINT, pop01(t, t0 + 1.2, 0.25, 2.2), false], ['hey :)', MINT, pop01(t, t0 + 1.7, 0.25, 2.2), false]] })
      hearts(x, t, 540, 860, t0 + 1.4, { n: 7, life: 2.0, spread: 320, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
