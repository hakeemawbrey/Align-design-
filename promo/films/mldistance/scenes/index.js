// mldistance: MOONLIGHT LANE, Ep 7 "Long Distance" (120 s vertical, Star Talk, promo/films/STARTALK-EPISODES.md).
// Music: dreamy · Db. Story 0–115.6, then the shared end card. The show kit is ./mlkit.js (a verbatim copy of mlpilot's).
//   0.0–2.0     ◀◀ PREVIOUSLY ON Moonlight Lane… (Ep 6: Leo said it out loud · Scorpio bought a flower · "for you.")
//   2.0–7.0     cold open on the lane: Sagittarius waves a letter: "I GOT IT! a year… across the world!" Cancer beams,
//               then realises. "A year. | Across the *world.*"  Pisces, in the window above the café, starts crying.
//   7.0–10.0    title card: EP 7 · Long Distance
//  10.0–20.2    the café: "Cancer is *proud.*" → "Also *terrified.*" (a calendar thought-bubble flips months); Taurus
//               slides over two cakes: "goodbye cake. and a *come-back* cake."
//  20.2–30.0    packing: "Packing *light.*" Cancer sneaks a scarf, a photo and a jar of soup into the suitcase.
//               "…is this a whole *soup?*" / "it's a *small* soup." The lid THUNKs shut; a sock pops out.
//  30.0–40.0    the goodbye at dawn: "go! shine! we'll be *fine.*" Sag rolls away; Cancer: "*totally* fine."
//  40.0        card cut (the kept one).
//  40.0–48.0    split screen, "Time *zones.*": Cancer calls at 10 PM (Sag: 7 AM, asleep); Sag calls at 1 PM (Cancer: 4 AM).
//  48.0–55.6    "The *freeze.*" Cancer tells a whole story to a frozen, pixelated, mid-sneeze video call.
//  55.6–62.5    "The missed *goodnight.*" The wall clock jumps, Cancer checks the phone three times, falls asleep;
//               the reply lands: "sorry!! my phone died. night!!"
//  62.5–70.0    the low point, split: "how's it going?" "great!! you?" "great!!!" … phones down, faces fall.
//               "“I'm *fine.*”" → "(they were *not* fine.)"
//  70.0–90.0    ★ THE STARS ADVISE: Make rituals · Something to look forward to · Say the hard part (tonight's move).
//  90.0–101.2   Act 3, split, Sunday: "I miss you. And I'm *scared.*" / "me too. so much. *thank you* for saying it."
//               A talk card deals onto the seam: "What made you *laugh* this week?" Both answer.
// 101.2–108.0   Cancer's fridge: the countdown goes up (VISIT IN 41 DAYS). "*Far,* not apart." (the last line)
// 104.0–108.0   ★ LESSON UNLOCKED "Distance needs | *rituals.*" +1 TIME-ZONE MATH
// 108.0–111.6   lane tag, 5 AM: Libra helps Scorpio carry flour; they watch the sunrise without talking. Nice.
// 111.6–115.6   NEXT TIME ON Moonlight Lane… "Pisces and Aquarius need *different* things."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  BONE, INK, INTER, MONO, ML_GOLD, GOLD, r3, mixHex, rgba, pop01, outK, popOut, bump, starFrame, inSprite, tearsCells,
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawPastry, drawBubble, drawPhone, drawIcon, sparkles,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN          // 115.6
const KEY = 'Db'
const C_ = signStar('cancer'), S_ = signStar('sagittarius')
const CAN = `${C_.glyph}︎ CANCER`, SAG = `${S_.glyph}︎ SAGITTARIUS`, TAU = `${signStar('taurus').glyph}︎ TAURUS`
const CC = mixHex(C_.color, '#ffffff', 0.35), SC = mixHex(S_.color, '#ffffff', 0.3), TC = mixHex(signStar('taurus').color, '#ffffff', 0.35)

// ── the timeline (scene boundaries)
const T = {
  prev: 0, open: 2, title: 7, cafe: 10, pack: 20.2, bye: 30, zones: 40, freeze: 48, night: 55.6, low: 62.5,
  advise: 70, act3: 90, card: 95.8, fridge: 101.2, lesson: 104, tag: 108, next: 111.6,
}
const CUTS = [20.2, { t: 40, kind: 'flip' }, 62.5]      // cardfx keeps the middle one: 40.0 (Act 1 → Act 2)

// ── captions
const CAPS = [
  { text: 'A year. | Across the *world.*', kicker: 'SUNDAY · 9:12 PM', at: 2.15, out: [6.7, 6.95] },
  { text: 'Cancer is *proud.*', at: 10.35, out: [13.55, 13.8] },
  { text: 'Also *terrified.*', at: 14.0, out: [19.8, 20.1], accentColor: '#9fd8ff' },
  { text: 'Packing *light.*', at: 20.45, out: [29.6, 29.9] },
  { text: '*Day one.*', kicker: 'MONDAY · 6:40 AM', at: 30.3, out: [39.5, 39.85] },
  { text: 'Time *zones.*', at: 40.3, out: [47.6, 47.9], top: 150, size: 84 },
  { text: 'The *freeze.*', at: 48.3, out: [55.2, 55.5] },
  { text: 'The missed | *goodnight.*', at: 55.85, out: [62.1, 62.4] },
  { text: '“I’m *fine.*”', at: 62.8, out: [65.95, 66.15], top: 150, size: 84 },
  { text: '(they were | *not* fine.)', at: 66.35, out: [69.75, 70.0], top: 150, size: 84, accentColor: '#9fd8ff' },
  { text: '*Sunday.*', at: 90.3, out: [95.4, 95.7], top: 150, size: 84 },
  { text: '*Far,* not apart.', at: 101.55, out: [103.75, 103.95], size: 104 },
  { text: 'No words. | *Nice.*', kicker: '5:02 AM', at: 109.3, out: [111.2, 111.5], size: 88 },
]

// ── dialogue (each box = one scene)
const L_OPEN = [{ t: 2.6, speaker: SAG, color: SC, text: 'I GOT IT! a year… across the *world!*' }]
const L_CAFE = [
  { t: 10.7, speaker: CAN, color: CC, text: 'I’m SO proud of you. *genuinely.*' },
  { t: 14.4, speaker: CAN, color: CC, text: '(a whole year?? a WHOLE *year??*)' },
  { t: 17.2, speaker: TAU, color: TC, text: 'goodbye cake. and a *come-back* cake.' },
]
const L_PACK = [
  { t: 20.7, speaker: SAG, color: SC, text: 'packed! light! just the *basics.*' },
  { t: 24.7, speaker: SAG, color: SC, text: '…is this a whole *soup?*' },
  { t: 27.0, speaker: CAN, color: CC, text: 'it’s a *small* soup.' },
]
const L_BYE = [
  { t: 30.8, speaker: CAN, color: CC, text: 'go! shine! we’ll be *fine.*' },
  { t: 33.4, speaker: SAG, color: SC, text: 'call you when I land! *love you!*' },
  { t: 36.6, speaker: CAN, color: CC, text: '*totally* fine.' },
]
const L_FREEZE = [
  { t: 48.7, speaker: CAN, color: CC, text: '…and THEN Taurus made me *soup*, and—' },
  { t: 51.9, speaker: CAN, color: CC, text: '…hello? are you *frozen?*' },
]
const L_ACT3 = [
  { t: 90.6, speaker: CAN, color: CC, text: 'I miss you. And I’m *scared.*' },
  { t: 92.6, speaker: SAG, color: SC, text: 'me too. so much. *thank you.*' },
  { t: 96.3, speaker: SAG, color: SC, text: 'a pigeon chased me. I *let* it win.' },
  { t: 98.75, speaker: CAN, color: CC, text: 'Pisces cried at a *spoon.*' },
]
const ALL_LINES = [...L_OPEN, ...L_CAFE, ...L_PACK, ...L_BYE, ...L_FREEZE, ...L_ACT3]
const BOXES = [
  [L_OPEN, 2.4, 6.85], [L_CAFE, 10.5, 19.95], [L_PACK, 20.5, 29.75], [L_BYE, 30.6, 39.7], [L_FREEZE, 48.5, 55.35],
  [L_ACT3.slice(0, 2), 90.4, 95.65], [L_ACT3.slice(2), 96.1, 101.05],
]

// ── THE STARS ADVISE
const ADVISE = {
  at: T.advise, out: [89.55, 90.0],
  cards: [
    { at: 70.95, icon: 'star', head: 'Make *rituals.*', body: 'The same small thing, every week: a Sunday story, a song swap.' },
    { at: 76.95, icon: 'calendar', head: 'Something to *look forward to.*', body: 'Put the next visit on the calendar, then count down together.' },
    { at: 82.95, icon: 'heart', head: 'Say the *hard part.*', body: '“I miss you and I’m scared” is allowed. Say it out loud.' },
  ],
  lines: [
    { t: 71.5, text: 'Cancer, Sagittarius: this one’s *yours.*' },
    { t: 77.5, text: 'a date on the calendar is a *light.*' },
    { t: 83.5, text: 'try: “I miss you, and I’m *scared.*”' },
  ],
}
const LESSON = { at: T.lesson, out: [107.75, 108.0], text: 'Distance needs | *rituals.*', chip: '+1 TIME-ZONE MATH' }
const NEXT = { at: T.next, out: [115.25, 115.6], teaser: 'Pisces and Aquarius need *different* things.' }

// ── hops
const hopsOf = sp => talkHops(ALL_LINES, sp)
const CAN_HOPS = [...hopsOf(CAN), 4.4, 5.25, 22.5, 23.1, 23.7, 41.0, 63.0, 65.0, 99.6, 102.15]
const SAG_HOPS = [...hopsOf(SAG), 2.3, 2.55, 21.6, 28.45, 44.2, 64.0]
const TAU_HOPS = [...hopsOf(TAU), 17.0, 31.2, 31.8]
const WALK = Array.from({ length: 9 }, (_, i) => r3(35.6 + i * 0.28))

// ── pixel bits
function bits(ctx, rows, pal, x, y, cell, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.scale(cell, cell)
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) } } })
  ctx.restore()
}
const cbits = (ctx, rows, pal, cx, cy, cell, o) => bits(ctx, rows, pal, cx - rows[0].length * cell / 2, cy - rows.length * cell / 2, cell, o)
const PAL = { K: INK, W: '#fff8ec', G: GOLD, L: '#b8b0c8', O: '#e0703a', Y: '#ffd27a', R: '#e8566e', B: '#5a7be0', P: '#ff8fb1', S: '#7fe0ff', M: '#3fb88a', C: '#cfd8e0', N: '#8a5a3a', F: '#e8dcc0' }
const LETTER = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWGGWWWWWK', 'KWGGWWWWWK', 'KWWWWWWWWK', 'KWLLLLLLWK', 'KWWWWWWWWK', 'KWLLLLLWWK', 'KWWWWWWWWK', 'KWLLLLLLWK', 'KKKKKKKKKK']
const SOUP = ['.KKKKKK.', 'KWWWWWWK', '.KKKKKK.', 'KCCCCCCK', 'KOOOOOOK', 'KOWOOOOK', 'KOOOOOOK', 'KOOOOWOK', '.KKKKKK.']
const PHOTO = ['KKKKKKKKK', 'KYYYYYYYK', 'KYSSSSSYK', 'KYSPSGSYK', 'KYSSSSSYK', 'KYMMMMMYK', 'KYYYYYYYK', 'KKKKKKKKK']
const SCARF = ['KKKKKKKKKKK', 'KRRWWRRWWRK', 'KKKKKKKRWWK', '.......KRRK', '.......KWWK', '.......KRRK', '.......KKKK']
const SOCK = ['KKKK..', 'KPWK..', 'KPWK..', 'KPWKKK', 'KPWWPK', 'KKKKKK']
const SACK = ['..KKKKKK..', '.KFFKKFFK.', 'KFFFFFFFFK', 'KFFFFFFFFK', 'KFFNNNNFFK', 'KFFFFFFFFK', 'KFFFFFFFFK', '.KKKKKKKK.']
const PHONE = ['KKKKK', 'KSSSK', 'KSSSK', 'KSSSK', 'KSSSK', 'KKWKK']
const CAL = ['..K....K..', 'KKRKKKKRKK', 'KRRRRRRRRK', 'KWWWWWWWWK', 'KWKWKWKWWK', 'KWWWWWWWWK', 'KWKWKWKWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const SWEAT = ['.S.', 'SSS', 'SWS', '.S.']

// a star that is NOT Pisces, crying a little (tears overlay on the sprite)
function drawCrying(ctx, sign, x, y, size, t, o, k) {
  drawSign(ctx, sign, x, y, size, t, o)
  if (k > 0) inSprite(ctx, starFrame(x, y, size, t, o), () => tearsCells(ctx, t, k))
}
function sweat(ctx, x, y, size, t, t0) {
  const k = clamp((t - t0) / 0.2); if (k <= 0) return
  cbits(ctx, SWEAT, PAL, x + size * 0.42, y - size * 0.3 + Math.min(14, (t - t0) * 10), size / 36 * 1.3)
}
function pill(ctx, text, rx, y, { col = ML_GOLD, size = 30, align = 'right', alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 ${size}px ${MONO}`
  const w = ctx.measureText(text).width + 44, h = size + 24, x0 = align === 'right' ? rx - w : rx - w / 2
  ctx.fillStyle = INK; ctx.fillRect(x0 - 7, y - 7, w + 14, h + 14)
  ctx.fillStyle = col; ctx.fillRect(x0 - 3, y - 3, w + 6, h + 6)
  ctx.fillStyle = 'rgba(11,18,54,0.95)'; ctx.fillRect(x0, y, w, h)
  ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, x0 + 22, y + h / 2 + 1)
  ctx.restore()
}

// ── Sagittarius' room, far away (local 1080 × 960; daylight, a different sky)
function drawRoom(ctx, t, { sunset = 0 } = {}) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  R(0, 0, 1080, 620, '#e9c48e'); for (let x = 0; x < 1080; x += 72) R(x, 0, 30, 620, '#e2b97e')
  // window: a bright morning sky, a sun, pixel clouds, terracotta roofs
  const W0 = { x: 560, y: 70, w: 420, h: 360 }
  R(W0.x - 18, W0.y - 18, W0.w + 36, W0.h + 36, '#7a4a3a')
  const g = ctx.createLinearGradient(0, W0.y, 0, W0.y + W0.h); g.addColorStop(0, mixHex('#5fb4f0', '#5a3a8a', sunset)); g.addColorStop(1, mixHex('#cfeeff', '#ffb08a', sunset))
  ctx.fillStyle = g; ctx.fillRect(W0.x, W0.y, W0.w, W0.h)
  ctx.save(); ctx.beginPath(); ctx.rect(W0.x, W0.y, W0.w, W0.h); ctx.clip()
  const sy = W0.y + 110 + sunset * 160
  const sg = ctx.createRadialGradient(W0.x + 300, sy, 0, W0.x + 300, sy, 150); sg.addColorStop(0, 'rgba(255,240,170,0.9)'); sg.addColorStop(1, 'rgba(255,240,170,0)')
  ctx.fillStyle = sg; ctx.fillRect(W0.x, W0.y, W0.w, W0.h)
  ctx.fillStyle = '#fff2a8'; ctx.beginPath(); ctx.arc(W0.x + 300, sy, 44, 0, Math.PI * 2); ctx.fill()
  for (const [cx, cy, k] of [[90, 90, 1], [230, 160, 0.8], [380, 70, 0.7]]) { const dx = ((t * 8 * k + cx) % 520) - 60; R(W0.x + dx, W0.y + cy, 90 * k, 22 * k, '#ffffff'); R(W0.x + dx + 20 * k, W0.y + cy - 16 * k, 50 * k, 18 * k, '#ffffff') }
  R(W0.x, W0.y + 280, 140, 80, '#c8684a'); R(W0.x + 10, W0.y + 262, 120, 20, '#a8503a'); R(W0.x + 150, W0.y + 250, 110, 110, '#e0a070'); R(W0.x + 160, W0.y + 232, 90, 20, '#c8684a'); R(W0.x + 270, W0.y + 290, 150, 70, '#d07a52')
  ;[[20, 300], [60, 300], [170, 280], [200, 280], [300, 310]].forEach(([a, b]) => R(W0.x + a, W0.y + b, 18, 22, '#5a3a4a'))
  ctx.restore()
  R(W0.x + W0.w / 2 - 6, W0.y, 12, W0.h, '#7a4a3a'); R(W0.x - 30, W0.y + W0.h + 12, W0.w + 60, 16, '#8a5a3a')
  // map doodle: two blobs, a dotted line, two hearts (no real places)
  R(70, 70, 330, 230, '#7a4a3a'); R(80, 80, 310, 210, '#f3e6d0')
  R(110, 140, 80, 60, '#8fc49a'); R(120, 120, 50, 30, '#8fc49a'); R(300, 170, 70, 70, '#d8b878'); R(290, 200, 40, 50, '#d8b878')
  for (let i = 0; i < 9; i++) R(170 + i * 14, 160 + Math.sin(i / 8 * Math.PI) * -30 + i * 3, 7, 7, '#c2306a')
  drawIcon(ctx, 'heart', 128, 150, 3); drawIcon(ctx, 'heart', 316, 196, 3)
  // floor
  R(0, 620, 1080, 340, '#a06a40'); for (let y = 640; y < 960; y += 36) R(0, y, 1080, 4, '#8a5a34')
  R(0, 612, 1080, 10, '#7a4a3a')
  // bed (left)
  R(20, 470, 380, 170, '#6a3a2a'); R(30, 440, 360, 50, '#fff8ec'); R(30, 480, 360, 110, '#5a7be0'); R(40, 490, 340, 14, '#7a95f0'); R(40, 446, 90, 34, '#ffffff')
  R(20, 380, 30, 260, '#6a3a2a')
  // the suitcase (still full of soup)
  R(860, 560, 180, 120, INK); R(866, 566, 168, 108, '#c2306a'); R(940, 540, 30, 26, INK); R(870, 610, 160, 8, '#8a1f4a')
}
function split(ctx, top, bot) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1080, 956); ctx.clip(); top(ctx); ctx.restore()
  ctx.save(); ctx.beginPath(); ctx.rect(0, 964, 1080, 956); ctx.clip(); ctx.translate(0, 964); bot(ctx); ctx.restore()
  ctx.fillStyle = INK; ctx.fillRect(0, 948, 1080, 24); ctx.fillStyle = ML_GOLD; ctx.fillRect(0, 956, 1080, 8)
}
// Cancer's apartment, cropped into the top half (apartment y 560…1516 → 0…956)
const TOPDY = -560
function aptTop(ctx, t, o, fg) { ctx.save(); ctx.translate(0, TOPDY); drawApartment(ctx, t, o); if (fg) fg(ctx); ctx.restore() }

// a talk card (drawn, cream + gold, generic)
function talkCard(ctx, cx, cy, w, t, { q = '', rot = 0, alpha = 1, k = 1 } = {}) {
  if (alpha <= 0.01 || k <= 0.01) return
  const h = w * 0.62
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  ctx.fillStyle = 'rgba(6,4,18,0.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = GOLD; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#fff6e2'; ctx.fillRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  const u = w / 560
  ctx.fillStyle = '#9a7a4a'; ctx.font = `700 ${Math.round(24 * u)}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'top'
  ctx.fillText('TALK CARD', -w / 2 + 34 * u, -h / 2 + 30 * u)
  drawIcon(ctx, 'chat', w / 2 - 74 * u, -h / 2 + 26 * u, 4 * u)
  ctx.fillStyle = INK; ctx.font = `800 ${Math.round(46 * u)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const ls = q.split('|'); ls.forEach((s, i) => ctx.fillText(s.trim(), 0, 30 * u + (i - (ls.length - 1) / 2) * 58 * u))
  ctx.restore()
}

// the video call panel (the freeze)
const VC = { x: 170, y: 380, w: 740, h: 540, freeze: 50.15 }

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  // offscreen canvases for the frozen call
  const vc = document.createElement('canvas'); vc.width = VC.w; vc.height = VC.h
  const vx = vc.getContext('2d')
  const sm = document.createElement('canvas'); sm.width = Math.round(VC.w / 7); sm.height = Math.round(VC.h / 7)
  const smx = sm.getContext('2d')

  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, open, close, y: 1600, height: 250, size: 48, cps: 28 }))
  const prevScene = (fn) => ctx => fn(ctx)
  const prev = buildPreviously(root, { at: 0, len: 2, stills: [
    { caption: 'Leo said it out loud.', crop: [180, 560, 640, 755], scene: prevScene(c => drawLane(c, 3, { moon: { x: 860, y: 610, r: 100 }, pan: 950 }, w => {
      drawSign(w, 'leo', 1330, standY(170, LANE.roof.y), 170, 3, { mood: 'happy', look: [1, 0] })
      drawSign(w, 'aquarius', 1480, standY(170, LANE.roof.y), 170, 3, { mood: 'heart', look: [-1, 0] })
    })) },
    { caption: 'Scorpio bought a flower.', crop: [500, 760, 580, 684], scene: prevScene(c => drawLane(c, 3, { moon: { x: 860, y: 610, r: 100 }, pan: 1080 }, w => {
      drawSign(w, 'scorpio', 1700, standY(200), 200, 3, { mood: 'happy', look: [1, 0] })
      drawSign(w, 'libra', 1960, standY(200), 200, 3, { mood: 'sparkle', look: [-1, 0] })
      drawIcon(w, 'flower', 1770, 1190, 7)
    })) },
    { caption: '“for you.”', crop: [180, 700, 640, 755], scene: prevScene(c => { drawCafe(c, 3, {}); drawSign(c, 'libra', 420, 1100, 260, 3, { mood: 'heart', look: [1, 0] }); c.fillStyle = INK; c.fillRect(600, 960, 200, 230); c.fillStyle = '#f3e6d0'; c.fillRect(608, 968, 184, 214); c.fillStyle = '#c2306a'; c.font = `italic 600 46px 'EB Garamond', serif`; c.textAlign = 'center'; c.fillText('for you', 700, 1090) }) },
  ] })
  const title = buildTitle(root, { ep: 7, title: 'Long Distance', at: T.title, len: 3 })
  const adv = buildAdvise(root, ADVISE)
  const next = buildNextTime(root, NEXT)
  const lesson = buildLesson(root, LESSON)
  const bug = showBug(root, 7, { at: 2.1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── scene painters
  function coldOpen(t) {
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, pan: 650 }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: t > 4.5 ? 3 : 1, mood: t > 4.5 ? 'wide' : 'sparkle', look: [1, 1], pull: bump(t, 5.0, 0.6) })
      // Cancer: beams… then realises
      const cm = t < 4.35 ? 'sparkle' : t < 5.2 ? 'wide' : 'happy'
      drawSign(c, 'cancer', 1060, standY(230), 230, t, { mood: cm, look: [1, -0.3], hops: CAN_HOPS, seed: 3, squash: t > 5.2 ? 0.05 * Math.sin(t * 40) * outK(t, [5.2, 6]) : 0 })
      if (t > 4.4) sweat(c, 1060, standY(230), 230, t, 4.4)
      // Sagittarius hops with the letter held high
      const sy = standY(230)
      const F = drawSign(c, 'sagittarius', 1310, sy, 230, t, { mood: 'happy', hops: SAG_HOPS, seed: 5 })
      cbits(c, LETTER, PAL, 1390, F.top - 10 + Math.sin(t * 7) * 6, 7)
      sparkles(c, t, 1390, F.top - 10, 2.3, 10, 130, 2)
    })
  }
  function cafe(t) {
    drawCafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x - 10, standY(200, CAFE.counter.y), 200, t, { mood: t > 17 ? 'happy' : 'neutral', look: [-1, 0.5], hops: TAU_HOPS, seed: 8 }) })
    // Pisces at the back table, crying into the menu
    drawPisces(x, 150, standY(130, 1180), 130, t, { tears: t > 14 ? 3 : 2, look: [1, 0], pull: bump(t, 15.2, 0.6) })
    const terr = t > 14.0
    drawSign(x, 'cancer', CAFE.seats[0].x, standY(230, CAFE.seats[0].y), 230, t, { mood: terr ? 'happy' : 'sparkle', look: [1, -0.2], hops: CAN_HOPS, seed: 3, squash: terr ? 0.03 * Math.sin(t * 34) : 0 })
    if (terr) sweat(x, CAFE.seats[0].x, standY(230, CAFE.seats[0].y), 230, t, 14.1)
    drawSign(x, 'sagittarius', CAFE.seats[1].x, standY(230, CAFE.seats[1].y), 230, t, { mood: 'happy', look: [-1, 0], hops: SAG_HOPS, seed: 5 })
    drawCafeTable(x, t, { cups: t > 17 ? 0 : 2, pastry: null })
    // the cakes slide in
    const ck = ease.outCubic(prog(t, 17.0, 17.45))
    if (ck > 0) { drawPastry(x, lerp(900, 470, ck), CAFE.table.y - 30, 7, 'cake'); drawPastry(x, lerp(1000, 620, ck), CAFE.table.y - 30, 7, 'cake') }
    // the terrified thought bubble: a calendar flipping months
    const bk = pop01(t, 14.1, 0.3, 2) * outK(t, [19.6, 19.9])
    if (bk > 0.01) {
      const bx = 330, by = 830
      x.save(); x.translate(bx, by); x.scale(bk, bk)
      x.fillStyle = INK; for (const [a, b, r] of [[-20, 150, 14], [-40, 190, 9]]) { x.beginPath(); x.arc(a, b, r + 4, 0, 7); x.fill() }
      x.fillStyle = BONE; for (const [a, b, r] of [[-20, 150, 14], [-40, 190, 9]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() }
      x.fillStyle = INK; x.fillRect(-150, -120, 300, 250); x.fillStyle = BONE; x.fillRect(-142, -112, 284, 234)
      const flip = Math.floor(Math.max(0, t - 14.3) * 5) % 12
      cbits(x, CAL, PAL, 0, 0, 16)
      x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][flip], 0, 98)
      x.restore()
    }
  }
  function pack(t) {
    drawApartment(x, t, {})
    const SX = 220, CX = 870, FEET = 1450
    // suitcase (open → items fly in → THUNK shut)
    const shut = t > 28.4, wob = shut ? Math.exp(-(t - 28.4) * 6) * Math.sin((t - 28.4) * 30) : 0
    const cx = 540, by = 1460
    x.fillStyle = INK; x.fillRect(cx - 220, by - 140, 440, 146)
    x.fillStyle = '#c2306a'; x.fillRect(cx - 212, by - 132, 424, 130)
    x.fillStyle = '#8a1f4a'; x.fillRect(cx - 212, by - 80, 424, 10)
    const items = [[SCARF, 22.5, -90], [PHOTO, 23.1, 10], [SOUP, 23.7, 110]]
    if (!shut) {
      // the lid, standing open behind
      x.fillStyle = INK; x.fillRect(cx - 220, by - 340, 440, 206); x.fillStyle = '#d8457a'; x.fillRect(cx - 212, by - 332, 424, 192)
      x.fillStyle = '#ffd0e0'; x.fillRect(cx - 190, by - 310, 380, 8)
      // items: arc from Cancer into the case
      for (const [rows, t0, ox] of items) {
        const p = ease.inOutQuad(prog(t, t0, t0 + 0.45)); if (t < t0) continue
        const ix = lerp(CX - 60, cx + ox, p), iy = lerp(1330, by - 150, p) - Math.sin(Math.PI * p) * 220
        cbits(x, rows, PAL, ix, iy, 13)
      }
      // Sag's tidy basics: a toothbrush-ish stick and a T-shirt fold
      x.fillStyle = BONE; x.fillRect(cx - 180, by - 168, 90, 34); x.fillStyle = '#7fe0ff'; x.fillRect(cx - 60, by - 160, 60, 14)
    } else {
      // shut + bulging, the sock escapes
      x.save(); x.translate(cx, by - 140); x.scale(1 + 0.03 * wob, 1 - 0.06 * wob)
      x.fillStyle = INK; x.fillRect(-224, -64, 448, 70); x.fillStyle = '#d8457a'; x.fillRect(-216, -58, 432, 58)
      x.fillRect(-180, -84, 360, 30); x.fillStyle = INK; x.fillRect(-184, -90, 368, 8)
      x.restore()
      const sp = prog(t, 28.6, 29.3)
      if (sp > 0) cbits(x, SOCK, PAL, cx + 230 * sp, by - 200 - Math.sin(Math.PI * sp) * 220 + sp * 150, 11)
    }
    drawSign(x, 'sagittarius', SX, standY(220, FEET), 220, t, { mood: t > 24.5 && t < 28.4 ? 'wide' : 'happy', look: t > 22.4 && t < 27 ? [1, 0.6] : [1, 0], hops: SAG_HOPS, seed: 5, squash: shut ? 0.1 * Math.max(0, wob) : 0 })
    drawSign(x, 'cancer', CX, standY(220, FEET), 220, t, { mood: t > 27 && t < 28.4 ? 'wink' : t > 24.5 ? 'neutral' : 'happy', look: [-1, 0.4], hops: CAN_HOPS, seed: 3 })
  }
  function goodbye(t) {
    const walk = ease.inQuad(prog(t, 35.6, 38.2))
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, time: 'dusk', pan: 520, lampsAt: null, lights: 0 }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 3, mood: t > 36.6 ? 'wide' : 'sparkle', look: [1, 1], pull: bump(t, 37.0, 0.5) + bump(t, 38.2, 0.5) })
      drawSign(c, 'taurus', LANE.cafeDoor.x - 130, standY(160), 160, t, { mood: 'happy', look: [1, 0], hops: TAU_HOPS, seed: 8 })
      const k = t > 36.4 ? 1 : 0
      drawCrying(c, 'cancer', 1160, standY(230), 230, t, { mood: t > 36.4 ? 'happy' : 'sparkle', look: [1, 0], hops: CAN_HOPS, seed: 3 }, k)
      const sx = lerp(1390, 2050, walk)
      const sm = t > 35.6 ? 'happy' : 'sparkle'
      // the bulging suitcase rolls behind
      const ex = sx + 165, ey = LANE.feet - 70
      c.fillStyle = INK; c.fillRect(ex - 70, ey - 84, 140, 90); c.fillStyle = '#d8457a'; c.fillRect(ex - 64, ey - 78, 128, 78); c.fillStyle = INK; c.fillRect(ex - 6, ey - 130, 12, 50); c.fillRect(ex - 30, ey - 134, 60, 10)
      c.fillStyle = INK; c.fillRect(ex - 50, ey + 2, 18, 18); c.fillRect(ex + 32, ey + 2, 18, 18)
      drawSign(c, 'sagittarius', sx, standY(230), 230, t, { mood: sm, look: [-1, 0], hops: [...SAG_HOPS, ...WALK], seed: 5 })
    })
  }
  // split, Act 2 opener: time zones
  function zones(t) {
    const second = t > 44.0
    split(x, c => aptTop(c, t, { lamp: second ? 0.35 : 1 }, w => {
      drawPisces(w, APT.couch.seats[1] + 60, standY(170, APT.couch.seatY), 170, t, { tears: 2, mood: second ? 'sleepy' : 'sparkle', look: [-1, 0] })
      drawSign(w, 'cancer', APT.couch.seats[0], standY(220, APT.couch.seatY), 220, t, { mood: second ? 'sleepy' : 'happy', look: [1, -0.5], hops: CAN_HOPS, seed: 3 })
      cbits(w, PHONE, PAL, APT.couch.seats[0] + 120, standY(220, APT.couch.seatY) - 20, 8)
      if (second && t > 44.4) drawBubble(w, APT.couch.seats[0] + 150, 1080, 'bzzz… bzzz…', { size: 30, k: pop01(t, 44.4, 0.25, 2) })
      if (!second) drawBubble(w, APT.couch.seats[0] + 170, 1080, 'ring ring!', { size: 32, k: pop01(t, 40.8, 0.25, 2) * outK(t, [43.7, 43.95]) })
    }), c => {
      drawRoom(c, t)
      const asleep = !second
      drawSign(c, 'sagittarius', asleep ? 230 : 640, asleep ? standY(220, 520) : standY(220, 690), 220, t, { mood: asleep ? 'sleepy' : 'happy', look: [0, -0.5], hops: SAG_HOPS, seed: 5, rot: asleep ? -0.35 : 0 })
      if (asleep && t > 41.1) { cbits(c, PHONE, PAL, 420, 560 + Math.sin(t * 50) * 3, 7); drawBubble(c, 470, 470, 'bzzz…', { size: 28, k: pop01(t, 41.1, 0.25, 2) }) }
      if (!asleep) { cbits(c, PHONE, PAL, 760, 560, 8); drawBubble(c, 770, 420, 'hiii!! lunch break!', { size: 30, k: pop01(t, 44.3, 0.25, 2) }) }
    })
    pill(x, second ? 'CANCER · 4:00 AM' : 'CANCER · 10:00 PM', 1040, 860, { col: CC, alpha: clamp((t - 40.1) / 0.2) })
    pill(x, second ? 'SAG · 1:00 PM' : 'SAG · 7:00 AM', 1040, 1000, { col: SC, alpha: clamp((t - 40.1) / 0.2) })
  }
  function callPanel(t) {
    const frozen = t >= VC.freeze, tf = frozen ? VC.freeze : t
    vx.save(); vx.clearRect(0, 0, VC.w, VC.h)
    vx.scale(VC.w / 1080, VC.w / 1080); vx.translate(0, -120); drawRoom(vx, tf); vx.restore()
    drawSign(vx, 'sagittarius', VC.w / 2, 330, 340, tf, { mood: frozen ? 'wide' : 'happy', hops: frozen ? null : [48.6, 49.2, 49.7], seed: 5, squash: frozen ? -0.16 : 0, look: frozen ? [0.8, -1] : [0, 0] })
    let src = vc
    if (frozen) { smx.imageSmoothingEnabled = true; smx.clearRect(0, 0, sm.width, sm.height); smx.drawImage(vc, 0, 0, sm.width, sm.height); src = sm }
    const k = pop01(t, 48.1, 0.4, 1.8)
    x.save(); x.translate(VC.x + VC.w / 2, VC.y + VC.h / 2); x.scale(k, k); x.translate(-(VC.x + VC.w / 2), -(VC.y + VC.h / 2))
    x.fillStyle = INK; x.fillRect(VC.x - 22, VC.y - 22, VC.w + 44, VC.h + 44)
    x.fillStyle = '#2a2050'; x.fillRect(VC.x - 14, VC.y - 14, VC.w + 28, VC.h + 28)
    x.imageSmoothingEnabled = !frozen; x.drawImage(src, VC.x, VC.y, VC.w, VC.h); x.imageSmoothingEnabled = true
    // a little self-view of Cancer in the corner (still live: that's the joke)
    x.fillStyle = INK; x.fillRect(VC.x + VC.w - 196, VC.y + VC.h - 156, 182, 142); x.fillStyle = '#5a4a7a'; x.fillRect(VC.x + VC.w - 190, VC.y + VC.h - 150, 170, 130)
    drawSign(x, 'cancer', VC.x + VC.w - 105, VC.y + VC.h - 80, 100, t, { mood: t > 51.9 ? 'wide' : 'happy', hops: CAN_HOPS, seed: 3 })
    if (frozen) {
      pill(x, 'RECONNECTING…', VC.x + VC.w / 2, VC.y + 30, { col: '#ff8fb1', size: 26, align: 'center', alpha: 0.6 + 0.4 * Math.abs(Math.sin(t * 4)) })
      for (let i = 0; i < 8; i++) { const a = t * 6 + i / 8 * Math.PI * 2; x.globalAlpha = (i + 1) / 8; x.fillStyle = BONE; x.fillRect(VC.x + VC.w / 2 + Math.cos(a) * 30 - 5, VC.y + VC.h / 2 + 150 + Math.sin(a) * 30 - 5, 10, 10) }
      x.globalAlpha = 1
    } else { x.fillStyle = '#ff4f6e'; x.fillRect(VC.x + 24, VC.y + 24, 18, 18); x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('CALL 00:4' + Math.floor((t - 48) % 10), VC.x + 54, VC.y + 34) }
    x.restore()
  }
  function freeze(t) {
    drawApartment(x, t, {})
    drawPisces(x, APT.couch.seats[1] + 20, standY(190, APT.couch.seatY), 190, t, { tears: t > 52 ? 3 : 2, mood: t > 52 ? 'wide' : 'sparkle', look: [-0.5, -1], pull: bump(t, 53.0, 0.6) })
    drawSign(x, 'cancer', APT.couch.seats[0] - 40, standY(230, APT.couch.seatY), 230, t, { mood: t > 51.9 ? 'wide' : 'happy', look: [0.4, -1], hops: CAN_HOPS, seed: 3 })
    callPanel(t)
  }
  const clockAt = t => t < 57.3 ? '11:30 PM' : t < 59.0 ? '12:15 AM' : '1:12 AM'
  function night(t) {
    const lamp = lerp(1, 0.3, prog(t, 55.6, 60))
    drawApartment(x, t, { lamp })
    // the wall clock (over the framed doodle)
    x.fillStyle = INK; x.fillRect(110, 400, 280, 160); x.fillStyle = '#120c2a'; x.fillRect(122, 412, 256, 136)
    const flash = [57.3, 59.0].some(c => t > c && t < c + 0.25)
    x.fillStyle = flash ? '#ffffff' : '#ff6b8a'; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(clockAt(t), 250, 482)
    // Pisces dozes off crying (even asleep)
    drawPisces(x, APT.couch.seats[1] + 30, standY(180, APT.couch.seatY), 180, t, { tears: 1, mood: 'sleepy', rot: 0.25, look: [0, 0] })
    // Cancer checks the phone three times; the third time, asleep
    const asleep = t > 59.9
    const checks = [56.2, 57.6, 59.3]
    const look = checks.some(c => t > c && t < c + 0.9) ? [1, 0.6] : [1, -0.3]
    drawSign(x, 'cancer', APT.couch.seats[0], standY(230, APT.couch.seatY), 230, t, { mood: asleep ? 'sleepy' : t > 59 ? 'neutral' : 'happy', look, hops: asleep ? null : checks, seed: 3, rot: asleep ? -0.22 * ease.outCubic(prog(t, 59.9, 60.6)) : 0 })
    drawPhone(x, 790, 760, 360, 520, t, { title: `${S_.glyph}︎ Sag`, alpha: pop01(t, 55.9, 0.3, 1.8), msgs: [
      { at: 56.2, side: 'R', text: 'goodnight call?' }, { at: 57.6, side: 'R', text: 'still up?' }, { at: 59.3, side: 'R', text: 'ok. sleep well!!' },
      { at: 61.0, side: 'L', text: 'sorry!! my phone died. night!!' },
    ] })
  }
  function low(t) {
    const fall = t > 66.1
    split(x, c => aptTop(c, t, { lamp: 0.5 }, w => {
      drawPisces(w, APT.couch.seats[1] + 60, standY(170, APT.couch.seatY), 170, t, { tears: 3, mood: 'wide', look: [-1, 0], pull: bump(t, 66.6, 0.5) + bump(t, 68.2, 0.5) })
      drawCrying(w, 'cancer', APT.couch.seats[0], standY(220, APT.couch.seatY), 220, t, { mood: fall ? 'neutral' : 'happy', look: fall ? [0, 1] : [1, -0.5], hops: CAN_HOPS, seed: 3, rot: fall ? -0.12 : 0, blush: false }, fall ? 1 : 0)
      const ph = fall ? ease.inOutQuad(prog(t, 66.1, 66.5)) * 120 : 0
      cbits(w, PHONE, PAL, APT.couch.seats[0] + 120, standY(220, APT.couch.seatY) - 20 + ph, 8)
      drawBubble(w, APT.couch.seats[0] + 120, 1090, 'how’s it going?', { size: 30, k: pop01(t, 63.0, 0.25, 2) * outK(t, [64.8, 65.0]) })
      drawBubble(w, APT.couch.seats[0] + 120, 1090, 'great!!!', { size: 34, k: pop01(t, 65.0, 0.25, 2) * outK(t, [66.0, 66.2]) })
    }), c => {
      drawRoom(c, t)
      const sx = 640, sy = standY(220, 690)
      drawCrying(c, 'sagittarius', sx, sy, 220, t, { mood: fall ? 'neutral' : 'happy', look: fall ? [0, 1] : [0, -0.5], hops: SAG_HOPS, seed: 5, rot: fall ? 0.12 : 0, blush: false }, fall ? 1 : 0)
      const ph = fall ? ease.inOutQuad(prog(t, 66.1, 66.5)) * 120 : 0
      cbits(c, PHONE, PAL, sx + 120, sy - 20 + ph, 8)
      drawBubble(c, sx + 60, 420, 'great!! you?', { size: 32, k: pop01(t, 64.0, 0.25, 2) * outK(t, [66.0, 66.2]) })
    })
    pill(x, 'CANCER · 11:50 PM', 1040, 860, { col: CC })
    pill(x, 'SAG · 8:50 AM', 1040, 1000, { col: SC, alpha: t < 66.1 ? 1 : 0 })
  }
  function act3(t) {
    const cardIn = t > T.card - 0.2
    split(x, c => aptTop(c, t, { lamp: 1 }, w => {
      drawPisces(w, APT.couch.seats[1] + 60, standY(170, APT.couch.seatY), 170, t, { tears: 3, mood: 'happy', look: [-1, 0], pull: bump(t, 93.4, 0.5) + bump(t, 99.3, 0.5) })
      drawSign(w, 'cancer', APT.couch.seats[0], standY(220, APT.couch.seatY), 220, t, { mood: t < 92.7 ? 'neutral' : 'happy', look: t < 92.7 ? [0.5, 0.5] : [1, -0.4], hops: CAN_HOPS, seed: 3, blush: t > 92.7 })
      cbits(w, PHONE, PAL, APT.couch.seats[0] + 120, standY(220, APT.couch.seatY) - 20, 8)
    }), c => {
      drawRoom(c, t)
      const sx = 640, sy = standY(220, 690)
      drawSign(c, 'sagittarius', sx, sy, 220, t, { mood: t < 92.6 ? 'wide' : t < 95 ? 'heart' : 'happy', look: [0, -0.5], hops: SAG_HOPS, seed: 5 })
      cbits(c, PHONE, PAL, sx + 120, sy - 20, 8)
      drawIcon(c, 'cup', sx - 200, sy + 10, 6)
    })
    if (t > 92.75 && t < 93.6) sparkles(x, t, 640, 1400, 92.9, 10, 160, 4, ['#ff8fb1', ML_GOLD, BONE])
    pill(x, 'CANCER · SUN 9:00 PM', 1040, 860, { col: CC })
    pill(x, 'SAG · MON 6:00 AM', 1040, 1000, { col: SC })
    // the talk card deals onto the seam
    if (cardIn) {
      const k = easeOutBack(prog(t, T.card - 0.2, T.card + 0.35), 1.5)
      talkCard(x, lerp(1400, 540, k), 960, 560, t, { q: 'What made you | *laugh* this week?'.replace(/\*/g, ''), rot: lerp(0.6, -0.04, k), alpha: outK(t, [100.8, 101.15]) })
    }
  }
  function fridge(t) {
    const R = (a, b, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
    R(0, 0, 1080, 1920, '#d8c4a0'); for (let y = 0; y < 1920; y += 60) R(0, y, 1080, 4, '#ccb690')
    R(100, -20, 880, 1960, INK); R(110, -20, 860, 1960, '#bfe6d6'); R(110, -20, 30, 1960, '#d6f2e6'); R(940, -20, 30, 1960, '#a8d4c2')
    R(880, 640, 40, 520, INK); R(888, 648, 24, 504, '#eaf6f2')
    R(110, 1430, 860, 10, '#8fbfac')
    // the photo (Sag + Cancer, from before)
    x.save(); x.translate(330, 620); x.rotate(-0.06)
    R(-150, -150, 300, 330, INK); R(-142, -142, 284, 314, '#fff8ec'); R(-126, -126, 252, 220, '#3a3a7a')
    drawSign(x, 'cancer', -55, -20, 110, t, { mood: 'happy', seed: 3 }); drawSign(x, 'sagittarius', 55, -20, 110, t, { mood: 'happy', seed: 5 })
    x.restore()
    drawIcon(x, 'heart', 316, 452, 5)
    // the talk card, pinned
    talkCard(x, 700, 620, 360, t, { q: 'What made you | laugh this week?', rot: 0.07 })
    drawIcon(x, 'star', 680, 480, 5)
    // the countdown sheet
    const pk = easeOutBack(prog(t, 101.6, 102.0), 1.6)
    if (pk > 0.01) {
      x.save(); x.translate(540, 1150); x.rotate(-0.03); x.scale(pk, pk)
      R(-250, -230, 500, 460, INK); R(-242, -222, 484, 444, '#fffaf0')
      R(-80, -246, 160, 40, 'rgba(242,199,92,0.85)')
      x.fillStyle = '#9a7a4a'; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VISIT IN', 0, -160)
      const nk = easeOutBack(prog(t, 102.15, 102.5), 2.2)
      x.save(); x.scale(nk, nk); x.fillStyle = '#c2306a'; x.font = `800 230px ${INTER}`; x.fillText('41', 0, 20); x.restore()
      x.fillStyle = INK; x.font = `700 52px ${MONO}`; x.fillText('DAYS', 0, 175)
      x.restore()
      sparkles(x, t, 540, 1150, 102.15, 12, 300, 6)
    }
    drawIcon(x, 'moon', 780, 900, 6)
    // Cancer, marker in hand
    drawSign(x, 'cancer', 860, 1640, 300, t, { mood: t > 102.1 ? 'sparkle' : 'happy', look: [-1, -0.6], hops: CAN_HOPS, seed: 3 })
  }
  function tag(t) {
    const walk = ease.inOutQuad(prog(t, 108.0, 109.2))
    drawLane(x, t, { time: 'dusk', pan: 720, lights: 0, moon: { x: 860, y: 610, r: 100 } }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 1, mood: 'sleepy', look: [1, 1] })
      const sit = t > 109.2
      const lx = sit ? LANE.bench.seats[0] - 20 : lerp(820, 1100, walk), sx = sit ? LANE.bench.seats[1] + 20 : lerp(940, 1280, walk)
      const yy = sit ? standY(170, LANE.bench.seatY) : standY(170)
      drawSign(c, 'libra', lx, yy, 170, t, { mood: sit ? 'sparkle' : 'happy', look: sit ? [0.6, -1] : [1, 0], hops: sit ? null : [108.2, 108.5, 108.8, 109.1], seed: 7 })
      drawSign(c, 'scorpio', sx, yy, 170, t, { mood: sit ? 'happy' : 'neutral', look: sit ? [0.6, -1] : [1, 0], hops: sit ? null : [108.35, 108.65, 108.95], seed: 9, blush: sit })
      cbits(c, SACK, PAL, sit ? lx - 70 : lx + 60, sit ? LANE.feet - 40 : yy - 100, 7)
      cbits(c, SACK, PAL, sit ? sx + 80 : sx + 60, sit ? LANE.feet - 40 : yy - 100, 7)
    })
    // the sunrise (warm light from the right horizon)
    const sk = prog(t, 108, 111.6)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(1000, 760 - sk * 60, 0, 1000, 760 - sk * 60, 700); g.addColorStop(0, `rgba(255,170,90,${0.32 + 0.12 * sk})`); g.addColorStop(1, 'rgba(255,170,90,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.open) drawSky(x, t, SKY_H)
      else if (t < T.cafe) coldOpen(t)
      else if (t < T.pack) cafe(t)
      else if (t < T.bye) pack(t)
      else if (t < T.zones) goodbye(t)
      else if (t < T.freeze) zones(t)
      else if (t < T.night) freeze(t)
      else if (t < T.low) night(t)
      else if (t < T.advise + 0.7) low(t)
      else if (t < T.act3 - 0.05) drawSky(x, t, SKY_H)
      else if (t < T.fridge) act3(t)
      else if (t < T.tag) fridge(t)
      else if (t < T.next) tag(t)
      else drawSky(x, t, SKY_H)
      caps.forEach(c => c.update(t)); boxes.forEach(b => b.update(t))
      prev.update(t); title.update(t); adv.update(t); next.update(t); lesson.update(t)
      bug.update(t, prev.on(t) || title.on(t) ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are moved into the film's key by the engine)
const N = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
export const CUES = [
  ...previouslyCues(0, 3, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ...titleCues(T.title, 3),
  // cold open: the letter, the realisation
  ['pop', 2.3, N[3], 0.04, 0.3], ['glitter', 2.3, 2.9], ['pluck', 4.4, N[0], 0.035, 0.6, -0.2], ['tick', 4.45, 0.04],
  // café: the calendar flips, the cakes slide
  ['pop', 14.1, N[4], 0.035, -0.2], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(14.3 + i * 0.2), 0.02]),
  ['whoosh', 17.0, 0.35, 0.035], ['pop', 17.4, N[2], 0.04, 0.3], ['pop', 17.5, N[4], 0.035, 0.35],
  // packing: three items fly in, the THUNK, the sock
  ...[22.5, 23.1, 23.7].flatMap((t0, i) => [['whoosh', t0, 0.3, 0.03], ['pop', r3(t0 + 0.45), N[i * 2], 0.045, 0]]),
  ['boom', 28.4, 0.25], ['tom', 28.4, 98, { gain: 0.25, decay: 0.25 }], ['pop', 28.65, N[6], 0.04, 0.4],
  // goodbye: wheels roll off
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(35.7 + i * 0.3), 0.025]), ['whoosh', 37.6, 0.5, 0.03],
  // time zones: ring ring / bzzz
  ['pluck', 40.8, N[5], 0.035, 0.3, -0.3], ['pluck', 40.95, N[3], 0.035, 0.3, -0.3], ['pluck', 41.3, N[5], 0.03, 0.3, -0.3], ['pluck', 41.45, N[3], 0.03, 0.3, -0.3],
  ['tick', 41.1, 0.03], ['tick', 41.2, 0.03], ['pop', 44.3, N[4], 0.04, 0.3], ['tick', 44.45, 0.03], ['tick', 44.55, 0.03],
  // the freeze
  ['whoosh', 48.1, 0.4, 0.035], ['tapeStop', VC.freeze, 0.35], ['tick', VC.freeze + 0.02, 0.06],
  // the missed goodnight: the clock jumps, the late reply
  ['tick', 57.3, 0.05], ['tick', 59.0, 0.05], ['pop', 56.2, N[2], 0.03, 0.3], ['pop', 57.6, N[2], 0.03, 0.3], ['pop', 59.3, N[2], 0.03, 0.3], ['pop', 61.0, N[5], 0.04, 0.3],
  // the low point: bubbles, phones down
  ['pop', 63.0, N[3], 0.035, -0.3], ['pop', 64.0, N[4], 0.035, 0.3], ['pop', 65.0, N[5], 0.035, -0.3], ['pluck', 66.15, N[0] / 2, 0.035, 0.8, 0],
  ...adviseCues(ADVISE),
  // act 3: the brave sentence, the talk card, the countdown
  ['bell', 91.8, N[5], 0.025, 1.2, 0], ['glitter', 92.9, 93.5], ['whoosh', T.card - 0.2, 0.4, 0.04], ['pluck', T.card + 0.2, N[4], 0.04, 0.6, 0],
  ['whoosh', 101.6, 0.35, 0.035], ['pop', 102.0, N[3], 0.045, 0], ['pop', 102.15, N[5], 0.05, 0], ['bell', 102.2, N[6], 0.03, 1.0, 0], ['glitter', 102.15, 102.8],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // lane tag: footsteps, the sit
  ...[108.2, 108.5, 108.8, 109.1].map(t0 => ['tick', t0, 0.02]), ['pop', 109.2, N[1], 0.03, 0], ['bell', 109.5, N[4], 0.02, 1.4, 0],
  ...nextTimeCues(NEXT.at),
  ...talkCues(ALL_LINES, { cps: 28 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
