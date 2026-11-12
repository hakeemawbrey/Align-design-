// r2t0266: THE SIGNS AS… v3, BELIKE, topic "Zodiacs when someone else picks the music", hook "Not your playlist? | Zodiacs be like:" (~54 s vertical,
// signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Not your playlist? | Zodiacs *be like:*"
//   3.6–49.2   ♈ seized the aux mid-note · ♉ brought their own record player · ♊ loved it, hated it, same song
//              · ♋ requested Mom's road-trip mix · ♌ made it their entrance music · ♍ rated the playlist three stars
//              · ♎ held a vote on every track · ♏ read your chart from your playlist · ♐ started a conga line anyway
//              · ♑ scheduled a meeting about the aux · ♒ only listens to whale songs · ♓ every song is about them
//  49.2        group ending: "Twelve signs. | *One aux cord.*"  the cord dangles over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, phone, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#c9a6ff'
const ST = { x: -170 }
const L = (s, bg, rot = -0.04, size = 32) => ({ s, bg, rot, size })
const tag = (x, cx, cy, k, o) => label(x, cx, cy, o.s, k, { size: o.size, bg: o.bg, rot: o.rot, font: MONO, weight: 700 })

const PLUG = ['..GG..', '..GG..', '..GG..', '.KKKK.', 'KKKKKK', 'KKKKKK', 'KKKKKK', 'KKKKKK', '..KK..', '..KK..']
const PLUG_C = { G: '#d8dbe8', K: '#2a2350' }
const WHALE = ['..........SS.S', '...BBBBB...SS.', '.BBBBBBBBB.BB.', 'BBBWBBBBBBBBB.', 'BBBBBBBBBBBB..', 'LLLLLLLLLLB...', '.LLLLLLLLL....']
const WHALE_C = { B: '#6fc3ff', L: '#cfeeff', W: '#ffffff', S: SKYB }
const BALLOT = ['.KKKKKKKK.', 'KWWWWWWWWK', 'KWKKKKKKWK', 'KWWWWWWWWK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const BALLOT_C = { K: INK, W: CREAM, B: '#ff8fb1' }

/** a turntable: wooden box, spinning record, tone arm */
function turntable(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 312, 210)
  x.fillStyle = INK; x.fillRect(-166, -110, 332, 214)
  x.fillStyle = WOOD; x.fillRect(-158, -102, 316, 198)
  x.save(); x.translate(-20, -4); x.rotate(t * 3)
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#3a2f66'; x.lineWidth = 3; for (const r of [70, 54, 40]) { x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke() }
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.fillRect(-14, -4, 12, 8)
  x.restore()
  x.fillStyle = '#d8dbe8'; x.fillRect(110, -80, 12, 12); x.save(); x.translate(116, -74); x.rotate(0.55); x.fillRect(-4, 0, 8, 96); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Seized the aux. | *Mid-first note.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: ST, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const yank = ease.inOutCubic(prog(lt, 0.5, 0.9))
      x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(990, 900); x.quadraticCurveTo(820, 1000, lerp(800, 520, yank), lerp(860, 800, yank)); x.stroke()
      x.strokeStyle = '#2a2350'; x.lineWidth = 8; x.stroke(); x.restore()
      drawBits(x, PLUG, PLUG_C, lerp(800, 520, yank), lerp(820, 760, yank), 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lerp(0, -0.9, yank) })
      tag(x, 790, 660, pop01(t, P.t0 + 1.0, 0.3, 2.4), L('AUX: SEIZED', GOLD, -0.05, 40))
      bubble(x, 790, 1080, 'MY TURN', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, col: '#ff8a7a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought their own | *record player.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      turntable(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      if (lt > 0.8) notes(x, t, 790, 800, { n: 4, cell: 7, col: GOLD })
      tag(x, 790, 640, pop01(t, P.t0 + 1.2, 0.3, 2.2), L('MY SPEAKERS ONLY', MINT, -0.04, 32))
    } },
  { sign: 'gemini', cap: 'Loved it. Hated it. | *Same song.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'heart', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2
      bubble(x, 790, 760, w ? 'SKIP!' : 'BANGER!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: w ? '#ff8a7a' : MINT, tail: 'bl' })
      tag(x, 790, 1020, pop01(t, P.t0 + 1.4, 0.3, 2.2), L('STILL TRACK 1', BONE, 0.04, 34))
    } },
  { sign: 'cancer', cap: 'Requested Mom’s | *road trip mix.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 340, 220, k, { bg: '#2a2350', rot: 0.05 }, () => {
        x.fillStyle = CREAM; x.fillRect(-150, -90, 300, 70); txt(x, 'MOM’S MIX', 0, -55, { size: 34, color: RED })
        for (const d of [-1, 1]) { x.save(); x.translate(d * 80, 40); x.rotate(t * 2.5 * d); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; for (let i = 0; i < 6; i++) { x.rotate(Math.PI / 3); x.fillRect(-4, 18, 8, 16) } x.restore() }
      })
      tag(x, 790, 1060, pop01(t, P.t0 + 1.1, 0.3, 2.2), L('VOL. 9 (OF 9)', PINK, -0.04, 32))
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Made it their | *entrance music.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', star: { x: -160 }, hops: [0.9, 1.5],
    back(x, t, lt, P) { beam(x, 380, 470, 380, 1160, 210, ease.outCubic(prog(lt, 0.4, 0.8))) },
    front(x, t, lt, P) {
      tag(x, 790, 760, pop01(t, P.t0 + 0.7, 0.3, 2.4), L('NOW ENTERING:', BONE, -0.04, 34))
      tag(x, 790, 860, pop01(t, P.t0 + 1.0, 0.3, 2.4), L('✦ LEO ✦', ORANGE, 0.04, 54))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 170, 0.3)
      if (lt > 1.0) notes(x, t, 790, 1100, { n: 4, cell: 7, col: GOLD })
    } },
  { sign: 'virgo', cap: 'Rated the playlist. | *Three stars.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'PLAYLIST REVIEW', 0, -140, { size: 28, font: MONO, weight: 700 })
        const n = Math.min(3, Math.floor(prog(lt, 0.4, 1.4) * 4))
        for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? GOLD : '#d8cfbf'; x.save(); x.translate(-128 + i * 64, -60); x.beginPath(); for (let j = 0; j < 10; j++) { const a = -Math.PI / 2 + j * Math.PI / 5, r = j % 2 ? 11 : 26; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill(); x.restore() }
        txt(x, 'flow: messy', -130, 30, { size: 28, weight: 700, color: BROWN, align: 'left' })
        txt(x, 'volume: chaotic', -130, 80, { size: 28, weight: 700, color: BROWN, align: 'left' })
        txt(x, 'see notes (4 pgs)', -130, 130, { size: 28, weight: 700, color: RED, align: 'left' })
      })
    } },
  { sign: 'libra', cap: 'Held a vote. | On *every track.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BALLOT, BALLOT_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.floor(prog(lt, 0.4, 2.0) * 5)
      for (let i = 0; i < n; i++) { const y = lerp(640, 800, clamp((lt - 0.4 - i * 0.32) / 0.3)); if (y < 800) card(x, 790 + (i % 2 ? 30 : -30), y, 80, 56, 1, { bg: CREAM, rot: i % 2 ? 0.2 : -0.2, border: 4 }) }
      tag(x, 790, 1120, pop01(t, P.t0 + 1.2, 0.3, 2.2), L('TRACK 2 OF 40: TIED', LAV, 0.04, 30))
    } },
  { sign: 'scorpio', cap: 'Read your chart. | *From your playlist.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      tag(x, 790, 990, pop01(t, P.t0 + 0.9, 0.3, 2.2), L('MOON: SAD SONGS', MINT, -0.04, 32))
      tag(x, 790, 1090, pop01(t, P.t0 + 1.5, 0.3, 2.2), L('RISING: ON REPEAT', LAV, 0.04, 32))
    } },
  { sign: 'sagittarius', cap: 'Didn’t care. | Started *a conga line.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const ids = ['aries', 'gemini', 'leo']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.5 + i * 0.35, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 520 - i * 130, 1000 + Math.sin(t * 6 + i) * 10, 120 * k, { mood: 'happy', seed: 60 + i, hops: [t - ((t * 2 + i * 0.3) % 1) / 2], glyph: false })
      })
      bubble(x, 330, 690, 'EVERYBODY!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'br' })
      notes(x, t, 400, 880, { n: 3, cell: 6, col: MINT })
    } },
  { sign: 'capricorn', cap: 'Scheduled a meeting. | *About the aux.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 360, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-180, -170, 360, 64); txt(x, 'AGENDA · 3 P.M.', 0, -138, { size: 28, font: MONO, weight: 700 })
        ;['1. Aux rotation', '2. Genre budget', '3. Q&A (no)'].forEach((s, i) => { if (lt > 0.5 + i * 0.35) txt(x, s, -150, -60 + i * 64, { size: 30, align: 'left' }) })
      })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), L('ATTENDANCE: REQUIRED', GOLD, -0.04, 30))
    } },
  { sign: 'aquarius', cap: 'Only plays | *whale songs.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, WHALE, WHALE_C, 790, 860 + 10 * Math.sin(t * 2), 24 * k)
      if (lt > 0.7) notes(x, t, 800, 760, { n: 4, cell: 7, col: SKYB })
      bubble(x, 790, 1080, 'ooOOOooo', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Every song | is *about them.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { head: '✦ FROM YOUR MATCH', headCol: GOLD, size: 24, lines: [['a song for you', PINK, pop01(t, P.t0 + 0.6, 0.3, 2)], ['it’s upbeat!', SKYB, pop01(t, P.t0 + 1.0, 0.3, 2)], ['why u crying', MINT, pop01(t, P.t0 + 1.6, 0.3, 2)]] })
      hearts(x, t, 790, 1080, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0266', key: 'C', accent: ACC, ending: 'group',
  title: 'Not your playlist? | Zodiacs *be like:*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One aux cord.*',
    draw(x, t, lt) {
      const k = ease.outCubic(prog(lt, 0.8, 1.6))
      if (k <= 0.01) return
      const sw = Math.sin(t * 2.4) * 40
      x.save(); x.strokeStyle = BONE; x.lineWidth = 18; x.beginPath(); x.moveTo(540, 440); x.quadraticCurveTo(540 + sw, 440 + 120 * k, 540 + sw * 1.4, 440 + 220 * k); x.stroke()
      x.strokeStyle = LAV; x.lineWidth = 10; x.stroke(); x.restore()
      drawBits(x, PLUG, PLUG_C, 540 + sw * 1.4, 440 + 260 * k, 16, { rot: -sw * 0.004 })
      label(x, 800, 640, 'WHO HAS IT?', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
