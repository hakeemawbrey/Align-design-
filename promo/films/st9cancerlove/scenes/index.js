// st9cancerlove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E18: Cancer · DATE NIGHT) · story 0–25.6, then
// the shared end card. The vlog parody (st9day.js) in Cancer's home (st9cancerhome.js), with Capricorn (the season-4 couple).
//   0.00  frame 0: "A Cancer remembers what you said in *2019*." The ♋ star at its desk, the "2019" shoebox open,
//         keepsakes flying out of it (a ticket stub, a napkin doodle, a receipt).
//   3.00  the archive HUD: "FILE 2019 · ITEM 47 — napkin, café, March". "6:40 PM — the 2019 box."
//   6.50  ◀◀ REWIND: a VHS flashback to a café in 2019. CAPRICORN (2019): "they stopped making my favourite *crackers.*"
//  10.20  the kitchen: a tray of homemade star crackers comes out of the oven. "7:20 PM — recreated from one sentence."
//  13.60  Capricorn arrives. CAPRICORN: "you *remembered?*" · CANCER: "i remember what you *love.*"
//  18.00  ★ ASTROLOGY SAYS: Cancer is the natural ruler of the 4th house (home, family, roots).
//  21.60  "Remembered means *loved*." The rhyme: frame 0 pulled a box out; now Capricorn drops the recipe card into the
//         box marked "YOU".
// Rewatch bait: the 2019 receipt says "1 cocoa, extra marshmallow (for C.)"; the moon lamp is waxing gibbous today.
// Ghost: rises over the top of the shoebox stack, desk room.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawCancerHome, cancerRoom, CAN } from '../../st9cancerhome.js'

export const DURATION = 30
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const INK = '#1b1236', BONE = '#efe6d6', SKYB = '#8fd6f6', CAPG = '#5fe0b8'
const CANC = signStar('cancer'), CAPC = signStar('capricorn')
const CANN = '♋ CANCER', CAPN = '♑ CAPRICORN', CAPN19 = '♑ CAPRICORN · 2019'

const T = {
  hookOut: 2.9, hud: 3.0, s1: [3.2, 6.3], rewind: 6.5, l0: 7.2, flashOut: 10.0,
  kitchen: 10.2, oven: 10.6, s2: [10.8, 13.4],
  arrive: 13.6, l1: 14.0, l2: 15.6, close: 17.9,
  chip: 18.0, toBox: 19.2, last: 21.6, lastLand: 22.0, drop: 22.3, out: [25.2, 25.55],
  ghost: 4.8,
}
const LINES = [
  { t: T.l0, speaker: CAPN19, text: 'they stopped making my favourite *crackers.*', color: CAPG },
  { t: T.l1, speaker: CAPN, text: 'you *remembered?*', color: CAPG },
  { t: T.l2, speaker: CANN, text: 'i remember what you *love.*', color: SKYB },
]
const CPS = 26
const CAN_HOPS = [T.hud + 0.05, T.oven + 0.3, ...talkHops(LINES, CANN, { cps: CPS }), T.lastLand]
const CAP_HOPS = [T.arrive + 0.4, ...talkHops(LINES, CAPN, { cps: CPS }), T.drop]
const KEEP = [['TICKET', '#ff8fb8'], ['NAPKIN ☺', BONE], ['RECEIPT', '#ffe6a8'], ['❀', '#c79bff']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 915, y: 862, where: 'rising over the top of the shoebox stack, desk room' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Cancer remembers what you said in *2019*.', at: 0, out: T.hookOut, top: 270, accentColor: SKYB })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '6:40 PM', text: 'the *2019* box.', accentColor: SKYB }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '7:20 PM', text: 'recreated from one sentence.' }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, close: T.close, cps: CPS })
  const last = popText(root, 'Remembered | means *loved.*', { top: 330, size: 116, accentSize: 172, at: T.last, gap: 0.08, accentColor: SKYB, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function box6(xx, y, w, h, c, hi) { rect(xx - 6, y - 6, w + 12, h + 12, INK); rect(xx, y, w, h, c); if (hi) rect(xx, y, w, 6, hi) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  function shoebox(cx, cy, label, k, open = false, col = CAN.sea) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    box6(-110, -40, 220, 80, col, '#ffffff'); txt(label, 0, 6, "700 26px 'Space Mono', monospace", INK)
    if (!open) box6(-118, -50, 236, 16, col === CAN.sea ? CAN.seaDk : CAN.coralDk)
    else { x.save(); x.translate(-118, -50); x.rotate(-0.5); box6(0, -16, 236, 16, col === CAN.sea ? CAN.seaDk : CAN.coralDk); x.restore() }
    x.restore()
  }
  function keepsake(cx, cy, [s, c], k, rot) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.font = "700 20px 'Space Mono', monospace"; const w = Math.max(70, x.measureText(s).width + 26)
    box6(-w / 2, -24, w, 48, c); txt(s, 0, 2, "700 20px 'Space Mono', monospace", INK)
    x.restore()
  }
  const STAR5 = (cx, cy, r, col) => { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) } x.closePath(); x.fillStyle = INK; x.save(); x.lineWidth = 6; x.strokeStyle = INK; x.stroke(); x.restore(); x.fillStyle = col; x.fill() }
  function crackers(cx, cy, k, n = 7, steam = true, t = 0) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    box6(-150, 10, 300, 22, '#9aa6c0', '#c4cde0')
    for (let i = 0; i < n; i++) STAR5(-110 + (i % 4) * 72 + (i > 3 ? 36 : 0), -10 - (i > 3 ? 34 : 0), 26, '#e8b05a')
    if (steam) for (let j = 0; j < 3; j++) { const ph = (t * 0.9 + j / 3) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); rect(-60 + j * 50, -60 - ph * 80, 8, 18, BONE); x.globalAlpha = 1 }
    x.restore()
  }
  /** the VHS flashback panel: a 2019 café, sepia, tracking lines */
  function flashback(t) {
    const k = pop01(t, T.rewind, 0.35, 1.6) * (1 - ease.inCubic(prog(t, T.flashOut - 0.3, T.flashOut)))
    if (k <= 0.02) return
    x.save(); x.translate(540, 900); x.scale(k, k)
    box6(-430, -330, 860, 660, '#3a2a1c')
    rect(-424, -324, 848, 648, '#c9a77a')
    rect(-424, 120, 848, 204, '#8a6a48')                                   // café table
    for (const [sx, id, look, mood] of [[-180, 'capricorn', 1, 'neutral'], [180, 'cancer', -1, 'sparkle']]) {
      x.save(); x.filter = 'sepia(0.85) saturate(0.8)'
      drawStarChar(x, sx, 30, 230, t, { ...signStar(id), mood, look: [look, 0], seed: id === 'cancer' ? 4 : 5, hops: id === 'capricorn' ? talkHops(LINES, CAPN19, { cps: CPS }) : [] })
      x.restore()
    }
    box6(-60, 90, 50, 40, '#efe0c4'); box6(40, 90, 50, 40, '#efe0c4')     // two cups
    // the tracking noise
    for (let i = 0; i < 6; i++) { const yy = ((t * 260 + i * 137) % 660) - 330; x.globalAlpha = 0.18; rect(-424, yy, 848, 6 + (i % 3) * 4, '#fff'); x.globalAlpha = 1 }
    txt('◀◀ REWIND', -400, -290, "700 30px 'Space Mono', monospace", '#fff', 'left')
    txt('MAR 3 2019', 400, 290, "700 30px 'Space Mono', monospace", '#fff', 'right')
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inKitchen = t >= T.kitchen
      const hour = 18.6 + prog(t, 0, STORY_END) * 1.2
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const room = inKitchen ? 'kitchen' : 'desk'
      const L = cancerRoom(room)
      const z = !inKitchen && t >= T.hud && t < T.rewind ? 1 + 0.1 * ease.outBack(prog(t, T.hud, T.hud + 0.35)) : 1
      x.save(); x.translate(640, 1150); x.scale(z, z); x.translate(-640, -1150)
      drawCancerHome(x, t, { room, ep: 'love', hour })
      if (!inKitchen) {
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        const rC = drawStarChar(x, 470, 1150, 270, t, { ...CANC, mood: t < T.hud ? 'sparkle' : t < T.rewind ? 'happy' : 'heart', look: [1, -1], seed: 4, hops: CAN_HOPS })
        shoebox(700, 1110, '2019', 1, true, CAN.coral)
        KEEP.forEach((kp, i) => {
          const ph = ((t + 2) * 0.45 + i / KEEP.length) % 1
          keepsake(700 + Math.sin(i * 2.1 + t) * 120 + (i - 1.5) * 70, 1060 - ph * 360, kp, Math.sin(Math.PI * ph) * 1.2, Math.sin(t * 2 + i) * 0.2)
        })
        void rC
      } else {
        const capIn = ease.outCubic(prog(t, T.arrive, T.arrive + 0.7))
        const rC = drawStarChar(x, 360, 1270, 250, t, { ...CANC, mood: t < T.arrive ? 'happy' : t < T.l2 ? 'sparkle' : t < T.last ? 'heart' : 'happy', look: [1, 0], seed: 4, hops: CAN_HOPS })
        if (t >= T.arrive) drawStarChar(x, lerp(1250, 760, capIn), 1270, 250, t, { ...CAPC, mood: t < T.l1 ? 'wide' : t < T.l2 + 1 ? 'sparkle' : 'heart', look: [-1, 0], seed: 5, hops: CAP_HOPS, blink: t < T.l1 ? false : undefined })
        // the tray: out of the oven, then held out to Capricorn
        const hold = ease.inOutCubic(prog(t, T.arrive + 0.3, T.arrive + 1.0))
        crackers(lerp(560, 590, hold), lerp(1170, 1130, hold), pop01(t, T.oven, 0.35, 2), t < T.chip ? 7 : 5, true, t)
        if (t >= T.oven && t < T.oven + 0.8) { const k = pop01(t, T.oven, 0.2, 3) * (1 - prog(t, T.oven + 0.6, T.oven + 0.8)); x.save(); x.translate(560, 960); x.scale(k, k); box6(-70, -28, 140, 56, '#ffd98a'); txt('DING!', 0, 2, "800 36px Inter", INK); x.restore() }
        // the rhyme: the YOU box, and the recipe card going in
        if (t >= T.toBox) {
          shoebox(560, 1390, 'YOU', 0.85 * pop01(t, T.toBox, 0.35, 2), t >= T.drop - 0.6 && t < T.drop + 0.6, CAN.sea)
          const p = ease.inOutCubic(prog(t, T.drop - 0.6, T.drop))
          if (p < 1) keepsake(lerp(760, 560, p), lerp(1100, 1375, p) - Math.sin(p * Math.PI) * 80, ['RECIPE ♥', '#ffffff'], pop01(t, T.toBox + 0.3, 0.3, 2), lerp(0.3, 0, p))
        }
        void rC
      }
      x.restore()
      // the archive HUD
      if (t >= T.hud && t < T.rewind) {
        const k = pop01(t, T.hud, 0.3, 2) * (1 - ease.inCubic(prog(t, T.rewind - 0.25, T.rewind)))
        x.save(); x.translate(540, 700); x.scale(k, k)
        box6(-380, -130, 760, 260, 'rgba(16,9,38,0.92)'); rect(-380, -130, 760, 50, SKYB)
        txt('THE ARCHIVE · FILE 2019', 0, -104, "700 26px 'Space Mono', monospace", INK)
        txt('ITEM 47 — napkin, café, March', -340, -30, "700 28px 'Space Mono', monospace", BONE, 'left')
        txt('ITEM 48 — receipt: 1 cocoa,', -340, 18, "700 28px 'Space Mono', monospace", BONE, 'left')
        txt('extra marshmallow (for C.)', -264, 58, "700 28px 'Space Mono', monospace", '#ffd98a', 'left')
        x.restore()
      }
      flashback(t)
      factChip(x, t, { label: '★ ASTROLOGY SAYS', text: 'Cancer is the natural ruler of the 4th house: home, family, roots.', at: T.chip, dur: 3.4, x: 540, y: 290, color: SKYB })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '6:38', to: '7:48', at: 0, dur: STORY_END - 0.6, ampm: 'PM', sign: 'cancer' })
      drawRecFrame(x, t, { battery: 0.6 - 0.2 * prog(t, 0, STORY_END) })
      for (const c of [T.rewind, T.kitchen]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.45 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E18' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.008 }),
  ['whoosh', T.hud - 0.05, 0.3, 0.025], ['tick', T.hud + 0.3, 0.03], ['tick', T.hud + 0.5, 0.03], ...stampCues(T.s1[0]),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.rewind - 0.1, 0.5, 0.035], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.rewind + i * 0.05), 0.03]),
  ...talkCues(LINES, { cps: CPS, pitch: { [CAPN19]: 523, [CAPN]: 523, [CANN]: 740 } }),
  ['whoosh', T.kitchen - 0.08, 0.35, 0.03], ['bell', T.oven, 1760, 0.04, 1.4, 0], ['pop', T.oven, 1318.51, 0.04, 0], ...stampCues(T.s2[0]),
  ['whoosh', T.arrive + 0.1, 0.5, 0.025], ['glitter', T.l1 + 0.6, T.l1 + 1.4],
  ...factChipCues(T.chip, { dur: 3.4 }),
  ['pop', T.toBox, 880, 0.03, 0],
  ['pop', T.last, 739.99, 0.03, 0], ['pop', T.last + 0.08, 880, 0.03, 0], ['pop', T.lastLand, 1174.66, 0.05, 0], ['bell', T.lastLand, 1479.98, 0.03, 1.4, 0],
  ['tick', T.drop, 0.05], ['pop', T.drop + 0.05, 1318.51, 0.035, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawPixelStar
