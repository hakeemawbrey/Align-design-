// st9cancerwork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E17: Cancer · 9 TO 5) · story 0–20.6, then
// the shared end card. The vlog parody (st9day.js) at Cancer's office (drawn here; Cancer's home is st9cancerhome.js:
// the crab-shell mug on the desk is from its kitchen shelf).
//   0.00  frame 0: "A Cancer is the office *mom*." The ♋ star at its desk, the snack drawer open, mid-hand-off of a
//         granola bar to Aries, who's already reaching.
//   3.00  the drawer's inventory HUD (granola ×40, tissues, band-aids, a spare charger…); Leo and Virgo queue up.
//         "9:15 AM — the snack drawer is open."
//   6.50  birthday cards: a stack signed at speed, CARDS SIGNED: 23. "11:40 AM — every birthday. every one."
//   9.80  the supply closet: a little cry among the paper reams. "2:20 PM — a little cry. it's fine."
//         CANCER: "i'm okay. i just care a *lot.*"
//  13.60  a knock: the team, with a card for Cancer ("THANK YOU, OFFICE MOM ♥"). ★ REAL SKY: Cancer is a cardinal sign;
//         the June-solstice Sun once stood in Cancer, hence the Tropic of Cancer.
//  16.60  "Care is work. *Count* it." The rhyme: frame 0's hand-off, reversed: Aries hands Cancer the granola bar.
// Rewatch bait: the wall calendar has every birthday circled, including the ghost's ("👻 ???"); the mug is a crab shell.
// Ghost: rises behind the paper reams on the supply-closet shelf.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { CAN, drawShell } from '../../st9cancerhome.js'

export const DURATION = 25
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const INK = '#1b1236', BONE = '#efe6d6', SKYB = '#8fd6f6'
const CANC = signStar('cancer')
const CANN = '♋ CANCER', VIRN = '♍ VIRGO'

const T = {
  hookOut: 2.9, inv: 3.0, s1: [3.2, 6.3], queue: [3.3, 3.9, 4.5],
  cards: 6.5, s2: [6.7, 9.6],
  closet: 9.8, s3: [10.0, 13.2], l1: 10.9, close: 13.4,
  team: 13.6, l2: 13.9, chip: 10.0, last: 16.6, lastLand: 17.0, giveBack: 17.4, out: [20.2, 20.55],
  ghost: 11.4,
}
const LINES = [
  { t: T.l1, speaker: CANN, text: 'i’m okay. i just care a *lot.*', color: SKYB },
  { t: T.l2, speaker: VIRN, text: 'we know. we made you *something.*', color: '#ff8fb8' },
]
const CPS = 26
const CAN_HOPS = [T.inv + 0.05, ...T.queue, T.cards + 0.1, ...talkHops(LINES, CANN, { cps: CPS }), T.team + 0.3, T.lastLand, T.giveBack + 0.4]
const CLOCKS = [[0, T.cards, '9:00 AM', '9:16 AM'], [T.cards, T.closet, '11:38 AM', '11:46 AM'], [T.closet, T.team, '2:18 PM', '2:26 PM'], [T.team, STORY_END + 1, '4:51 PM', '4:59 PM']]
const INV = ['granola ×40', 'tissues (lots)', 'band-aids', 'gum', 'a spare charger', 'emergency socks']
const CARDS = ['HBD ♈!', 'HBD ♌!!', 'GET WELL ♓', 'HBD ♎', 'CONGRATS ♑', 'HBD ♍']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 820, y: 940, where: 'rising behind the paper reams on the supply-closet shelf' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Cancer is the office *mom*.', at: 0, out: T.hookOut, top: 280, accentColor: SKYB })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '9:15 AM', text: 'the snack drawer is open.' }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '11:40 AM', text: 'every birthday. *every* one.', accentColor: SKYB }),
    stampCaption(root, { at: T.s3[0], out: T.s3[1], time: '2:20 PM', text: 'a little cry. it’s fine.', top: 520 }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, close: T.l2 + 2.6, cps: CPS })
  const last = popText(root, 'Care is work. | *Count* it.', { top: 330, size: 116, accentSize: 172, at: T.last, gap: 0.08, accentColor: SKYB, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function box6(xx, y, w, h, c, hi) { rect(xx - 6, y - 6, w + 12, h + 12, INK); rect(xx, y, w, h, c); if (hi) rect(xx, y, w, 6, hi) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  /** the office: a wall with a window hole (the sky shows), a carpet, the desk + the open snack drawer, the calendar */
  function office(t) {
    x.save(); x.beginPath(); x.rect(0, 0, 1080, 1400); x.rect(960, 600, -260, 300); x.clip('evenodd')
    rect(0, 0, 1080, 1400, '#2c3a56')
    for (let j = 0; j < 30; j++) rect(0, 40 + j * 46, 1080, 3, '#334262')
    x.restore()
    rect(694, 594, 272, 12, INK); rect(694, 894, 272, 12, INK); rect(694, 594, 12, 312, INK); rect(954, 594, 12, 312, INK); rect(824, 600, 10, 300, INK)
    rect(0, 1400, 1080, 520, '#3a3f5c')
    for (let i = 0; i < 400; i++) rect((i * 97) % 1080, 1400 + ((i * 53) % 520), 6, 6, '#343852')
    rect(0, 1394, 1080, 12, INK)
    // the wall calendar: every birthday circled
    box6(110, 560, 300, 300, BONE, '#ffffff'); rect(110, 560, 300, 50, CAN.sea); txt('BIRTHDAYS', 260, 586, "700 24px 'Space Mono', monospace", INK)
    for (let i = 0; i < 20; i++) {
      const cx = 140 + (i % 5) * 58, cy = 640 + Math.floor(i / 5) * 52
      txt(String(i + 1), cx, cy, "700 18px 'Space Mono', monospace", '#5a4c8a')
      if ([1, 4, 6, 9, 12, 15, 18].includes(i)) { x.strokeStyle = '#ff5d73'; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, 20, 0, Math.PI * 2); x.stroke() }
    }
    txt('👻 ???', 330, 838, "700 16px 'Space Mono', monospace", '#5a4c8a')
    // the desk
    box6(60, 1180, 760, 30, '#c69a6a', '#e2bb8c')
    box6(80, 1216, 230, 184, '#94704a')
    // the open snack drawer, overflowing
    box6(60, 1250, 290, 90, '#a77f56', '#c69a6a')
    const SN = [['#f2c75c', 40], ['#ff5d73', 30], ['#6fdc6a', 34], ['#9fd8ff', 28], ['#f2895a', 36], ['#c79bff', 30]]
    SN.forEach(([c, w], i) => box6(80 + i * 44, 1218 - (i % 2) * 14, w, 36, c))
    for (const xx of [760]) box6(xx, 1216, 30, 184, '#94704a')
    // the monitor + the crab-shell mug
    box6(420, 990, 280, 180, '#2a2a40', '#3a3a58'); rect(434, 1004, 252, 150, '#14243a')
    for (let r = 0; r < 5; r++) rect(450, 1024 + r * 24, 120 + ((r * 37) % 90), 8, '#3f6d96')
    rect(540, 1170, 40, 12, INK)
    drawShell(x, 740, 1150, 5)
    void t
  }
  function closet(t) {
    rect(0, 0, 1080, 1920, '#141a2a')
    // shelves of paper reams, one bulb
    for (const y of [700, 960, 1220]) {
      box6(120, y, 840, 20, '#6a5a48', '#8a765e')
      for (let i = 0; i < 7; i++) box6(150 + i * 112, y - 70, 92, 64, i % 3 ? '#e8eef6' : '#ffe6a8', '#ffffff')
    }
    rect(536, 0, 8, 420, INK); box6(512, 420, 56, 50, '#ffe9a8', '#ffffff')
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 450, 0, 540, 450, 700); g.addColorStop(0, 'rgba(255,230,170,0.28)'); g.addColorStop(1, 'rgba(255,230,170,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
    rect(0, 1400, 1080, 520, '#1d2236'); rect(0, 1394, 1080, 10, INK)
    box6(340, 1300, 240, 100, '#c69a6a', '#e2bb8c'); txt('A4 · 10 REAMS', 460, 1350, "700 20px 'Space Mono', monospace", INK)
    void t
  }
  function granola(cx, cy, k, rot = 0) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    box6(-50, -20, 100, 40, '#f2c75c', '#ffe08a'); txt('GRANOLA', 0, 2, "700 15px 'Space Mono', monospace", INK)
    x.restore()
  }
  function card(cx, cy, label, k, rot, big = false) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    const w = big ? 420 : 200, h = big ? 270 : 130
    box6(-w / 2, -h / 2, w, h, BONE, '#ffffff'); rect(-w / 2, -h / 2, w, big ? 50 : 26, big ? '#ff8fb8' : CAN.sea)
    if (big) { txt('THANK YOU,', 0, -20, "800 46px Inter", INK); txt('OFFICE MOM ♥', 0, 40, "800 46px Inter", '#e04f7a'); txt('— ♈ ♌ ♍ ♑', 0, 100, "700 22px 'Space Mono', monospace", '#5a4c8a') }
    else txt(label, 0, 14, "800 30px Inter", INK)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inCloset = t >= T.closet && t < T.team
      const hour = t < T.cards ? 9.2 : t < T.closet ? 11.7 : t < T.team ? 14.3 : 16.9
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const z = t >= T.inv && t < T.cards ? 1 + 0.08 * ease.outBack(prog(t, T.inv, T.inv + 0.35)) : 1
      x.save(); x.translate(300, 1250); x.scale(z, z); x.translate(-300, -1250)
      if (!inCloset) {
        office(t)
        const team = t >= T.team
        const cm = t < T.inv ? 'happy' : t < T.cards ? 'sparkle' : !team ? 'happy' : t < T.l2 + 1 ? 'wide' : t < T.giveBack ? 'heart' : 'happy'
        const rC = drawStarChar(x, 330, 1110, 250, t, { ...CANC, mood: cm, look: [1, 0], seed: 4, hops: CAN_HOPS, blink: cm === 'wide' ? false : undefined })
        // the coworkers
        const cast = [['aries', 690, 1190, 210, -0.05], ['leo', 860, 1250, 190, T.queue[1]], ['virgo', 1000, 1300, 180, T.queue[2]]]
        cast.forEach(([id, cx, cy, s, at], i) => {
          const k = at < 0 ? 1 : pop01(t, at, 0.3, 2)
          const happy = t < T.cards || team
          drawStarChar(x, cx, cy, s, t, { ...signStar(id), glyph: s > 190 ? signStar(id).glyph : null, mood: team ? (t > T.giveBack ? 'happy' : 'sparkle') : happy ? 'happy' : 'neutral', look: [-1, 0], seed: 30 + i, pop: k, hops: team ? [T.team + 0.1 * i, T.giveBack] : [at + 0.1] })
        })
        // the granola hand-off (frame 0: Cancer → Aries · the rhyme: Aries → Cancer)
        if (t < T.inv + 0.6) granola(lerp(470, 560, Math.min(1, (t + 0.6) / 1.2)), 1080 - Math.sin(Math.min(1, (t + 0.6) / 1.2) * Math.PI) * 40, 1 - ease.inCubic(prog(t, T.inv + 0.3, T.inv + 0.6)), 0.2)
        if (t >= T.giveBack) { const p = ease.inOutCubic(prog(t, T.giveBack, T.giveBack + 0.9)); granola(lerp(580, 460, p), 1080 - Math.sin(p * Math.PI) * 60, 1, -0.2) }
        // the cards (6.5 → 9.8): a stack signed at speed
        if (t >= T.cards && t < T.closet) {
          CARDS.forEach((c, i) => { const at = T.cards + 0.2 + i * 0.4; card(560 + (i % 3) * 30, 900 - i * 14, c, pop01(t, at, 0.25, 2.2), (i % 2 ? 0.08 : -0.06)) })
          const n = Math.min(23, Math.floor(prog(t, T.cards + 0.2, T.cards + 2.6) * 23))
          box6(380, 560, 420, 70, '#ff5d73'); txt(`CARDS SIGNED: ${n}`, 590, 596, "700 32px 'Space Mono', monospace", '#fff')
          // the pen scribbles
          const pp = (t * 8) % 1; rect(rC.x + 160 + pp * 40, rC.y - 120 - Math.abs(Math.sin(t * 30)) * 10, 12, 60, INK)
        }
        if (team) card(560, 860, '', pop01(t, T.team + 0.3, 0.4, 2), -0.05, true)
        void rC
      } else {
        closet(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        const r = drawStarChar(x, 460, 1180, 290, t, { ...CANC, mood: t < T.l1 + 1.2 ? 'sleepy' : 'happy', zzz: false, look: [0, 1], seed: 4, hops: talkHops(LINES, CANN, { cps: CPS }), glow: 0.7 })
        // one pixel tear, a tissue
        const tp = ((t - T.closet) * 0.7) % 1
        if (t < T.l1 + 1.2) { rect(r.x - 52, r.y - 14 + tp * 80, 14, 20, INK); rect(r.x - 49, r.y - 11 + tp * 80, 8, 14, SKYB) }
        box6(r.x + 90, r.y - 20, 56, 44, '#ffffff'); rect(r.x + 106, r.y - 34, 24, 16, '#ffffff')
      }
      x.restore()
      // the snack inventory HUD
      if (t >= T.inv && t < T.cards) {
        const k = pop01(t, T.inv, 0.3, 2) * (1 - ease.inCubic(prog(t, T.cards - 0.3, T.cards)))
        x.save(); x.translate(540, 760); x.scale(k, k)
        box6(-300, -170, 600, 340, 'rgba(16,9,38,0.92)'); rect(-300, -170, 600, 54, CAN.sea); txt('SNACK DRAWER · INVENTORY', 0, -143, "700 24px 'Space Mono', monospace", INK)
        INV.forEach((s, i) => { if (t > T.inv + 0.15 + i * 0.22) txt(`• ${s}`, -260, -80 + i * 42, "700 28px 'Space Mono', monospace", i === 5 ? '#ffd98a' : BONE, 'left') })
        x.restore()
      }
      factChip(x, t, { label: '★ REAL SKY', text: 'Cancer is a cardinal sign. The June-solstice Sun once stood in Cancer: hence the Tropic of Cancer.', at: T.chip, dur: 6.0, x: 540, y: 290, color: SKYB })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      for (const [a, b, f, to] of CLOCKS) if (t >= a && t < b) drawClock(x, t, { from: f, to, at: a, dur: Math.min(b - a, STORY_END - a) - 0.4, sign: 'cancer' })
      drawRecFrame(x, t, { battery: 0.8 - 0.4 * prog(t, 0, STORY_END) })
      for (const c of [T.cards, T.closet, T.team]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.45 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.closet, kind: 'flip' }, { t: T.team, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E17' }), cardCuts(CUTS)]

const NOTE = [783.99, 880, 987.77, 1174.66, 1318.51, 1567.98]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...CLOCKS.flatMap(([a, b]) => clockCues(a, Math.min(b - a, STORY_END - a) - 0.4, { gain: 0.008 })),
  ['whoosh', T.inv - 0.05, 0.3, 0.025], ...INV.map((_, i) => ['tick', r3(T.inv + 0.15 + i * 0.22), 0.03]),
  ...T.queue.map((q, i) => ['pop', q, NOTE[i], 0.035, 0.3 + i * 0.1]),
  ...stampCues(T.s1[0]),
  ['whoosh', T.cards - 0.05, 0.3, 0.025], ...CARDS.map((_, i) => ['pop', r3(T.cards + 0.22 + i * 0.4), NOTE[i % NOTE.length], 0.03, 0.2]), ...stampCues(T.s2[0]),
  ['whoosh', T.closet - 0.08, 0.4, 0.025], ...stampCues(T.s3[0]), ['tick', T.ghost + 0.05, 0.015],
  ...talkCues(LINES, { cps: CPS, pitch: { [CANN]: 740, [VIRN]: 988 } }),
  ['tick', T.team - 0.25, 0.05], ['tick', T.team - 0.1, 0.05],
  ['bell', T.team + 0.35, 1318.51, 0.035, 1.6, 0], ['glitter', T.team + 0.3, T.team + 1.1],
  ...factChipCues(T.chip, { dur: 6.0 }),
  ['pop', T.last, 783.99, 0.03, 0], ['pop', T.last + 0.08, 987.77, 0.03, 0], ['pop', T.lastLand, 1174.66, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.giveBack + 0.2, 0.4, 0.02], ['pop', T.giveBack + 0.9, 1567.98, 0.035, -0.2],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
