// r2t0268: THE SIGNS AS… v3, ROLLCALL, "The signs | on jury duty." (~62 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs | *on jury duty.*"
//   3.6–49.2   ♈ voted guilty during roll call · ♉ only came for the free lunch · ♊ argued both sides, alone
//              · ♋ baked cookies for the defendant · ♌ signed autographs for the judge · ♍ found a typo in the evidence
//              · ♎ asked the judge their sign · ♏ solved it with star charts (Mercury did it) · ♐ asked to hold court
//              outdoors · ♑ elected foreperson, by themself · ♒ questioned the concept of time · ♓ sobbed at the
//              opening statement
//  49.2        "Twelve jurors. | *Zero verdicts.*"
//  52.4        LESSON UNLOCKED: "Every voice | *deserves a hearing.*"  COURT: ADJOURNED
//  58.3        "Pisces is | *still crying.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#f2c75c'
const ST = { x: -170 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const SANDWICH = ['..BBBBBBBBBB..', '.BBbBBBBBbBBB.', 'GGGGGGGGGGGGGG', 'RRRRRRRRRRRRRR', 'YYYYYYYYYYYYYY', '.BBBBBBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', b: '#fff4e2', G: '#5fd068', R: '#e23d4e', Y: '#ffd23a' }
const COOKIE = ['..CCCC..', '.CCcCCC.', 'CcCCCcCC', 'CCCCCCCC', 'CCcCCCcC', '.CCCcCC.', '..CCCC..']
const COOKIE_C = { C: '#e8a24a', c: '#6b3a1e' }
const GLASS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
const GLASS_C = { K: INK, S: '#cfeeff', W: '#ffffff' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPPPPPPB', 'BPPPPPPB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: '#6fc3ff', P: '#cfeeff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Voted guilty | *during roll call.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: ST, hops: [0.6, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tag(x, 790, 660, pop01(t, P.t0 + 0.2, 0.3, 2.2), 'ROLL CALL: 1 OF 12', BONE, -0.04, 30)
      bubble(x, 790, 850, 'GUILTY!', pop01(t, P.t0 + 0.7, 0.25, 2.6), { size: 72, col: '#ff8a7a', tail: 'bl' })
      tag(x, 790, 1060, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TRIAL STARTS: MONDAY', GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Only showed up | *for the free lunch.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      tag(x, 790, 680, pop01(t, P.t0 + 0.8, 0.3, 2.2), 'JUROR LUNCH: FREE', MINT, -0.04, 32)
      tag(x, 790, 1040, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'VERDICT: DELICIOUS', GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Argued both sides. | *Out loud. Alone.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2
      bubble(x, 760, 720, 'objection!', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (w ? 1 : 0.85), { size: 44, col: '#ff8a7a', tail: 'bl' })
      bubble(x, 820, 900, 'overruled!', pop01(t, P.t0 + 0.8, 0.25, 2.2) * (w ? 0.85 : 1), { size: 44, col: MINT, tail: 'bl' })
      tag(x, 790, 1080, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'BOTH: GEMINI', LAV, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Baked cookies | *for the defendant.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 880, 300, 160, k, { bg: '#c2304a', rot: 0.03 }, () => {})
      for (let i = 0; i < 3; i++) drawBits(x, COOKIE, COOKIE_C, 710 + i * 80, 860 - 10 * Math.sin(t * 3 + i), 14 * pop01(t, P.t0 + 0.5 + i * 0.15, 0.3, 2))
      tag(x, 790, 1050, pop01(t, P.t0 + 1.2, 0.3, 2.2), 'NOTE: YOU SEEM NICE', PINK, -0.04, 30)
      hearts(x, t, 790, 780, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Signed autographs. | *For the judge.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 840, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'TO: YOUR HONOR', 0, -100, { size: 26, font: MONO, weight: 700 })
        const p = clamp(prog(lt, 0.4, 1.3))
        x.strokeStyle = ORANGE; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath()
        for (let i = 0; i <= 40 * p; i++) { const u = i / 40; const xx = -110 + u * 220, yy = 10 + Math.sin(u * 18) * 30 * (1 - u * 0.4); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
        x.stroke(); txt(x, '✦ xoxo', 60, 100, { size: 30, color: ORANGE })
      })
      sparkles(x, t, 790, 840, P.t0 + 1.6, 7, 180, 0.4)
      tag(x, 790, 1080, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'NOBODY ASKED', BONE, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Found a typo | *in the evidence.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'EXHIBIT A', 0, -150, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = '#c9c0ae'; x.fillRect(-130, -90 + i * 50, 260 - (i % 2) * 60, 14) }
        const c = ease.outCubic(prog(lt, 0.8, 1.2))
        if (c > 0) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(-40, 10, 80, 34, 0, 0, Math.PI * 2 * c); x.stroke() }
        if (lt > 1.2) txt(x, 'teh → the', 0, 150, { size: 32, color: RED })
      })
      tag(x, 790, 1120, pop01(t, P.t0 + 1.7, 0.3, 2.2), 'MISTRIAL (FONTS)', GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked the judge | *their sign.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'your honor, | what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      bubble(x, 800, 930, '…leo.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'COMPATIBLE: CASE CLOSED', MINT, 0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Solved the case. | *With star charts.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      drawBits(x, GLASS, GLASS_C, 860 + 30 * Math.sin(t * 2), 840, 16 * pop01(t, P.t0 + 0.5, 0.35, 2))
      tag(x, 790, 1050, pop01(t, P.t0 + 1.3, 0.3, 2.4), 'CULPRIT: MERCURY', LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Asked if court | *could be outdoors.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      sun(x, t, 320, 720, 70, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 320, 920, 'picnic trial?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: GOLD, tail: 'br' })
      tag(x, 320, 1080, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'MOTION: DENIED', '#ff8a7a', -0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Elected foreperson. | *By themself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 10); x.rotate(-0.6); x.scale(k, k); x.fillStyle = INK; x.fillRect(-160, -26, 320, 52); x.fillStyle = GOLD; x.fillRect(-156, -22, 312, 44); txt(x, 'FOREPERSON', 0, 2, { size: 28, font: MONO, weight: 700 }); x.restore() }
      card(x, 800, 820, 300, 220, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'VOTES', 0, -70, { size: 28, font: MONO, weight: 700 })
        txt(x, 'Capricorn: 1', 0, -10, { size: 32 }); txt(x, '(from Capricorn)', 0, 50, { size: 24, weight: 700, color: BROWN })
      })
      tag(x, 800, 1060, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'LANDSLIDE', MINT, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Questioned the concept | *of time itself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const sp = ease.inCubic(prog(lt, 0.6, 2.4))
      clock(x, 790, 820, 110, pop01(t, P.t0 + 0.2, 0.3, 2), (sp * 40) % 12, (sp * 480) % 60)
      bubble(x, 790, 1040, 'but what IS 9 a.m.?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Sobbed at | *the opening statement.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      tag(x, 790, 700, pop01(t, P.t0 + 0.6, 0.3, 2.2), '"Good morning…"', BONE, -0.04, 32)
      tag(x, 790, 1080, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'TISSUES LEFT: 0', SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0268', key: 'G', accent: ACC, ending: 'lesson',
  title: 'The signs | *on jury duty.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve jurors. | *Zero verdicts.*' },
  lesson: { text: 'Every voice | *deserves a hearing.*', chip: 'COURT: ADJOURNED' },
  last: { text: 'Pisces is | *still crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
