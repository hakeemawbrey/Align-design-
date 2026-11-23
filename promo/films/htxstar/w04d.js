// Houston Star Talk, batch w04 (story format): hst107–hst110. See promo/posting/htx/FARM.md and htxstar/w04kit.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, room } from '../starrace/ep.js'
import { signChar, notes } from '../signs3kit.js'
import { skyline, sweat, BRAKE } from './kit.js'
import { story, SFX, Kp, Y, fit, night, sky, gallery, court, danceHall, hearts, sparkles, label, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from './w04kit.js'

const YOU = (y = 1480) => [540, y, 100]
const AUNTS = { cancer: 'glasses', taurus: 'glasses' }

// ── hst107 · Capricorn doesn't get modern art (free museum night)
const art = (x, cx, cy, k = 1) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -230, -290, 460, 580, '#b07a3a', 10); x.fillStyle = '#e8641e'; x.fillRect(-210, -270, 420, 540); x.fillStyle = '#5a1a3a'; x.fillRect(-170, -210, 340, 170); x.fillStyle = '#f2a03a'; x.fillRect(-170, 40, 340, 170); x.restore() }
const museum = (x, t) => { x.fillStyle = '#efe9df'; x.fillRect(0, 0, 1080, 1400); x.fillStyle = '#b89a78'; x.fillRect(0, 1400, 1080, 520); x.fillStyle = INK; x.fillRect(0, 1394, 1080, 8); art(x, 540, 700) }
const feeder = (x, k) => { if (k <= 0) return; x.save(); x.globalAlpha = clamp(k); x.translate(540, 700); x.fillStyle = 'rgba(8,5,22,0.35)'; x.fillRect(-210, -270, 420, 540); x.strokeStyle = BONE; x.lineWidth = 10; x.setLineDash([30, 22]); x.beginPath(); x.moveTo(-210, 125); x.lineTo(210, 125); x.stroke(); x.setLineDash([]); for (let i = 0; i < 5; i++) { x.fillStyle = BRAKE; x.fillRect(-180 + i * 80, 100, 30, 14) } x.restore() }
const hst107 = story({
  hook: "Capricorn doesn't | get modern art", key: 'Bb',
  close: 'Come see it differently. Jan 9.', stars: ['capricorn', 'aquarius', 'pisces', 'libra'],
  scenes: [
    { dur: 3.6, title: 'FREE MUSEUM NIGHT', set: (x, t) => gallery(x, t), cast: { aquarius: [[0, 330, 1240, 260]], capricorn: [[0, 760, 1240, 240]] }, mood: { aquarius: 'sparkle', capricorn: 'squint' }, props: { aquarius: 'beret' }, hops: { aquarius: [0.02, 0.4] }, look: { aquarius: [0, 0] },
      lines: [[0.3, 1.6, 'aquarius', "you'll love this. | it's FREE tonight!"]] },
    { dur: 3.6, set: (x, t) => museum(x, t), cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]] }, mood: { capricorn: 'squint', aquarius: 'heart' }, props: { aquarius: 'beret' }, look: { capricorn: [-1, -1], aquarius: [1, -1] },
      lines: [[0.4, 1.4, 'capricorn', "it's... | a rectangle."], [2.0, 1.4, 'aquarius', "it's a | FEELING."]] },
    { dur: 3.6, set: (x, t) => museum(x, t), cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]] }, mood: { capricorn: 'eyeroll', aquarius: 'sparkle' }, props: { aquarius: 'beret' },
      lines: [[0.3, 1.6, 'capricorn', 'what does it | DO, though?']], sfx: [SFX.womp(0.3)] },
    { dur: 3.6, set: (x, t) => museum(x, t), cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]], pisces: [[0, 540, 1400, 150]] }, mood: { capricorn: 'squint', aquarius: 'happy', pisces: 'heart' }, props: { aquarius: 'beret' },
      lines: [[0.6, 2.4, 'pisces', "*sob* it's | so ORANGE."]] },
    { dur: 3.8, set: (x, t) => museum(x, t), cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]] }, mood: { capricorn: 'neutral', aquarius: lt => lt > 2 ? 'wide' : 'happy' }, props: { aquarius: 'beret' },
      lines: [[0.2, 1.7, 'capricorn', 'okay. what do | YOU see?'], [2.1, 1.4, 'aquarius', '...you | asked?']], sfx: [SFX.ding(0.2)] },
    { dur: 3.8, set: (x, t, lt) => { museum(x, t); feeder(x, clamp((lt - 0.5) / 1)) }, cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]] }, mood: { capricorn: 'squint', aquarius: 'sparkle' }, props: { aquarius: 'beret' },
      lines: [[0.3, 2.4, 'aquarius', 'a feeder road | at sunset.']] },
    { dur: 3.8, set: (x, t, lt) => { museum(x, t); feeder(x, 1); if (lt > 1.6) hearts(x, t, 540, 1000, t - lt + 1.6, { n: 8 }) }, cast: { capricorn: [[0, 820, 1250, 240]], aquarius: [[0, 240, 1250, 230]] }, mood: { capricorn: lt => lt > 1.4 ? 'heart' : 'wide', aquarius: 'heart' }, props: { aquarius: 'beret' },
      lines: [[0.3, 1.2, 'capricorn', '...oh.'], [1.6, 2.0, 'capricorn', "that's 59. | at 6pm."]], sfx: [SFX.gasp(0.3)] },
    { dur: 3.4, set: (x, t) => museum(x, t), cast: { capricorn: [[0, 760, 1250, 240]], aquarius: [[0, 330, 1250, 230]] }, mood: { capricorn: 'happy', aquarius: 'wink' }, props: { aquarius: 'beret', capricorn: 'beret' },
      lines: [[0.3, 2.6, 'capricorn', 'next Thursday? | I want a beret.']] },
  ],
  lesson: { lines: ['Different tastes?', 'Be curious,', 'not right.'], cast: { capricorn: [[0, 330, 1370, 190]], aquarius: [[0, 750, 1370, 190]] }, mood: { capricorn: 'happy', aquarius: 'heart' }, props: { aquarius: 'beret', capricorn: 'beret' }, line: ['capricorn', 'still a | rectangle.'] },
})

// ── hst108 · Your group chat planning Jan 9 (who's driving?)
const COL = { gemini: '#f2d75c', leo: '#ff9a3c', sagittarius: '#b78cff', virgo: '#7ad6a0', pisces: '#a89cff', cancer: '#8fd3ff', capricorn: '#5ec8a0', taurus: '#f2c27c', aries: '#ff6a5a' }
function groupChat(x, lt, msgs, { k = 1, scroll = 0 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(540, 820); x.scale(k, k)
  box(x, -330, -560, 660, 1120, INK, 12); box(x, -306, -520, 612, 1040, '#f4efe4', 0)
  txt(x, 'JAN 9 SQUAD', 0, -482, { size: 36, col: INK, font: MONO, weight: 700 }); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-306, -450, 612, 4)
  x.save(); x.beginPath(); x.rect(-306, -446, 612, 966); x.clip()
  const shown = msgs.filter(m => lt >= m[0]); let y = 500 - scroll
  for (let i = shown.length - 1; i >= 0; i--) {
    const [at, who, text] = shown[i], a = Kp(lt, at, 0.2), lines = text.split(' | '), h = lines.length * 40 + 60
    y -= h + 16; if (y < -470) break
    x.save(); x.globalAlpha = clamp(a)
    box(x, -280, y, 560, h, COL[who] || BONE, 4); txt(x, who.toUpperCase(), -260, y + 22, { size: 22, col: INK, font: MONO, weight: 700, align: 'left' })
    lines.forEach((l, j) => txt(x, l, -260, y + 58 + j * 40, { size: 34, col: INK, align: 'left' }))
    x.restore()
  }
  x.restore(); x.restore()
}
const CHAT = [
  [0.0, 'gemini', "WHO'S DRIVING JAN 9"], [0.4, 'leo', 'what are we | WEARING'],
  [3.8, 'sagittarius', 'I can drive but | I live in Cypress'], [4.6, 'virgo', 'I made a | spreadsheet.'],
  [7.6, 'pisces', "I'm just so happy | we're all going"], [8.4, 'cancer', "I'll bring snacks | for the car"],
  [11.4, 'gemini', 'so who is | DRIVING'], [11.9, 'leo', 'is it a | sequins thing?'], [12.4, 'sagittarius', 'Cypress is | 45 min btw'], [12.9, 'virgo', 'the spreadsheet | has a TAB'],
  [19.2, 'capricorn', "I'll drive. | I'll get everyone."],
  [23.0, 'taurus', 'finally.'], [23.4, 'pisces', '*sobbing*'],
]
const chatScene = (dur, t0, extra = {}) => ({ dur, set: (x, t, lt) => { night(x, t, '#1e1832'); groupChat(x, t0 + lt, CHAT) }, ...extra })
const hst108 = story({
  hook: 'Your group chat | planning Jan 9', key: 'G',
  close: 'See you there. Jan 9.', stars: ['capricorn', 'gemini', 'leo', 'pisces'],
  scenes: [
    chatScene(3.8, 0, { cast: { gemini: [[0, 150, 1420, 160]], leo: [[0, 930, 1420, 160]] }, mood: { gemini: 'wide', leo: 'sparkle' }, props: { leo: 'crown' }, hops: { gemini: [0.02, 0.3], leo: [0.4, 0.7] }, sfx: [SFX.pluck(0.4, 880)] }),
    chatScene(3.8, 3.8, { cast: { sagittarius: [[0, 150, 1420, 160]], virgo: [[0, 930, 1420, 160]] }, mood: { sagittarius: 'happy', virgo: 'squint' }, props: { virgo: 'clipboard' }, hops: { sagittarius: [0.0], virgo: [0.8] }, sfx: [SFX.pluck(0.0, 660), SFX.pluck(0.8, 784)] }),
    chatScene(3.8, 7.6, { cast: { pisces: [[0, 150, 1420, 160]], cancer: [[0, 930, 1420, 160]] }, mood: { pisces: 'heart', cancer: 'happy' }, hops: { pisces: [0.0], cancer: [0.8] }, sfx: [SFX.pluck(0.0, 988), SFX.pluck(0.8, 880)] }),
    chatScene(3.8, 11.4, { cast: { gemini: [[0, 150, 1420, 160]], leo: [[0, 930, 1420, 160]] }, mood: { gemini: 'wide', leo: 'wide' }, props: { leo: 'crown' }, hops: { gemini: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0], leo: [0.5, 0.7, 0.9, 1.1] }, stick: [[2.0, 1.6, 'NOBODY DECIDED', BRAKE]], sfx: [SFX.womp(2.0)] }),
    { dur: 3.8, set: (x, t, lt) => { night(x, t, '#1e1832'); groupChat(x, 15.2, CHAT, { k: 1 - 0.1 * clamp(lt) }) }, cast: { gemini: [[0, 150, 1420, 160]], leo: [[0, 930, 1420, 160]] }, mood: { gemini: 'sleepy', leo: 'sleepy' },
      stick: [[0.3, 3.0, '*silence*', BONE]], sfx: [SFX.cricket(0.6), SFX.cricket(1.4), SFX.cricket(2.2)] },
    { dur: 3.8, set: (x, t, lt) => { night(x, t, '#1e1832'); groupChat(x, 19.2 + lt, CHAT) }, cast: { capricorn: [[0, 540, 1430, 180]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.0] },
      sfx: [SFX.ding(0.0)] },
    { dur: 3.8, set: (x, t, lt) => { night(x, t, '#1e1832'); groupChat(x, 23 + lt, CHAT); hearts(x, t, 540, 800, t - lt + 0.6, { n: 10, spread: 380 }) }, cast: { taurus: [[0, 150, 1420, 160]], pisces: [[0, 930, 1420, 160]] }, mood: { taurus: 'eyeroll', pisces: 'heart' },
      sfx: [SFX.pluck(0.0, 880), SFX.cheer(0.4)] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); sparkles(x, t, 540, 1000, t - lt, 12, 400, 3) }, cast: { capricorn: [[0, 540, 1250, 260]], gemini: [[0, 200, 1300, 200]], leo: [[0, 880, 1300, 200]] }, mood: { capricorn: 'wink', gemini: 'heart', leo: 'heart' }, props: { leo: 'crown' },
      lines: [[0.3, 2.6, 'capricorn', 'someone had to | say it.']] },
  ],
  lesson: { lines: ['Good friends', 'make plans.', 'Great ones follow through.'], cast: { capricorn: [[0, 540, 1370, 200]] }, mood: { capricorn: 'happy' }, line: ['capricorn', "I'll text | everyone."] },
})

// ── hst109 · Sag challenged the aunties to pickleball
const score = (x, a, b) => { box(x, 300, 300, 480, 110, INK, 6); txt(x, `AUNTIES ${a} · SAG ${b}`, 540, 356, { size: 44, col: GOLD, font: MONO, weight: 700 }) }
const ball = (x, lt, a, d = 0.6, from = [320, 1150], to = [760, 900]) => { const p = clamp((lt - a) / d); if (p <= 0 || p >= 1) return; const bx = from[0] + (to[0] - from[0]) * p, by = from[1] + (to[1] - from[1]) * p - Math.sin(Math.PI * p) * 200; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8f04a'; x.beginPath(); x.arc(bx, by, 15, 0, Math.PI * 2); x.fill() }
const SIDES = (o = {}) => ({ sagittarius: [[0, 320, 1450, 220]], cancer: [[0, 640, 960, 190]], taurus: [[0, 860, 960, 190]], ...o })
const PADS = { sagittarius: 'paddle', cancer: ['glasses', 'paddle', 'sweatband'], taurus: ['glasses', 'paddle'] }
const hst109 = story({
  hook: 'Sag vs. | the aunties | at pickleball', key: 'E',
  close: 'Good sports only. Jan 9.', stars: ['sagittarius', 'cancer', 'taurus', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t) => court(x, t), cast: SIDES(), mood: { sagittarius: 'sparkle', cancer: 'squint', taurus: 'squint' }, props: PADS, hops: { sagittarius: [0.02, 0.3, 0.6] }, look: { sagittarius: [0, 0] },
      lines: [[0.3, 1.6, 'sagittarius', "you're my partner. | easy win."]] },
    { dur: 3.6, set: (x, t) => { court(x, t); score(x, 0, 0) }, cast: SIDES(), mood: { sagittarius: 'wink', cancer: 'happy', taurus: 'squint' }, props: PADS,
      lines: [[0.3, 1.4, 'sagittarius', 'hope you | stretched!'], [1.9, 1.6, 'taurus', 'baby. | we play daily.']] },
    { dur: 3.6, set: (x, t, lt) => { court(x, t); score(x, 0, 0); ball(x, lt, 0.2, 0.5); ball(x, lt, 0.8, 0.35, [700, 900], [300, 1500]) }, cast: SIDES(), mood: { sagittarius: lt => lt > 1 ? 'wide' : 'sparkle', cancer: 'squint', taurus: 'happy' }, props: PADS, hops: { cancer: [0.7] },
      stick: [[1.0, 1.6, 'SMASH', BRAKE]], sfx: [SFX.thud(0.8), SFX.womp(1.2)] },
    { dur: 3.6, set: (x, t) => { court(x, t); score(x, 7, 0) }, cast: SIDES(), mood: { sagittarius: 'wide', cancer: 'happy', taurus: 'wink' }, props: PADS,
      lines: [[0.6, 2.2, 'sagittarius', 'HOW???']], sfx: [SFX.womp(0.6)] },
    { dur: 3.8, set: (x, t) => { court(x, t); score(x, 9, 0) }, front: (x, t) => sweat(x, 400, 1340, t, 3), cast: SIDES(), mood: { sagittarius: 'squint', cancer: 'happy', taurus: 'happy' }, props: PADS,
      lines: [[0.3, 1.5, 'sagittarius', 'it was | the HUMIDITY!'], [2.0, 1.6, 'cancer', 'we live here | too, baby.']] },
    { dur: 3.8, set: (x, t) => { court(x, t); score(x, 11, 2) }, cast: SIDES({ sagittarius: [[0, 320, 1450, 220], [1.4, 500, 1260, 220]] }), mood: { sagittarius: 'happy', cancer: 'heart', taurus: 'happy' }, props: PADS,
      lines: [[1.5, 2.2, 'sagittarius', "okay. you're | SO good."]], sfx: [SFX.ding(1.5)] },
    { dur: 3.8, set: (x, t, lt) => { court(x, t); hearts(x, t, 640, 900, t - lt + 0.8, { n: 8 }) }, cast: SIDES({ sagittarius: [[0, 500, 1260, 220]] }), mood: { sagittarius: 'heart', cancer: 'happy', taurus: 'sparkle' }, props: PADS,
      lines: [[0.3, 1.5, 'taurus', 'want lessons? | Saturdays.'], [2.0, 1.6, 'sagittarius', 'YES | please.']] },
    { dur: 3.4, set: (x, t) => court(x, t), cast: { sagittarius: [[0, 540, 1250, 260]], pisces: [[0, 880, 1420, 140]] }, mood: { sagittarius: 'wink', pisces: 'heart' }, props: { sagittarius: ['glasses', 'paddle'] },
      lines: [[0.3, 2.6, 'sagittarius', "I'm an | auntie now."]], sfx: [SFX.boing(0.3)] },
  ],
  lesson: { lines: ['Be a good loser.', 'Honestly?', "It's attractive."], cast: { sagittarius: [[0, 330, 1370, 190]], cancer: [[0, 750, 1370, 190]] }, mood: { sagittarius: 'happy', cancer: 'heart' }, props: { cancer: 'glasses', sagittarius: 'glasses' }, line: ['cancer', 'good game, | baby.'] },
})

// ── hst110 · Your aunties took you dancing (zydeco night)
const hst110 = story({
  hook: 'Your aunties | took you dancing', key: 'F',
  close: 'Keep dancing. Jan 9.', stars: ['cancer', 'taurus', 'capricorn', 'libra'],
  scenes: [
    { dur: 3.6, set: (x, t) => danceHall(x, t), cast: { cancer: [[0, 300, 1260, 250]], taurus: [[0, 780, 1260, 250]] }, mood: { cancer: 'sparkle', taurus: 'wink' }, props: AUNTS, hops: { cancer: [0.02, 0.35, 0.7, 1.05], taurus: [0.17, 0.52, 0.87, 1.22] },
      lines: [[0.3, 1.5, 'cancer', 'you and your date. | on the floor.'], [2.0, 1.4, 'taurus', 'now, baby.']] },
    { dur: 3.6, set: (x, t) => danceHall(x, t), cast: { capricorn: [[0, 330, 1260, 250]], libra: [[0, 760, 1260, 230]] }, mood: { capricorn: 'wide', libra: 'sparkle' },
      lines: [[0.3, 1.5, 'capricorn', "I don't | dance."], [2.0, 1.5, [780, 1260, 250], 'everybody dances | at zydeco night.']] },
    { dur: 3.8, set: (x, t) => danceHall(x, t), front: (x, t) => notes(x, t, 540, 1000, { n: 5, cell: 7 }), cast: { cancer: [[0, 540, 1260, 260]] }, mood: { cancer: 'sparkle' }, props: { cancer: 'glasses' },
      hops: { cancer: [0.1, 0.45, 0.8, 1.15, 1.5, 1.85, 2.2, 2.55, 2.9, 3.25] }, stick: [[0.2, 1.6, 'ZYDECO 101', GOLD]], lines: [[2.0, 1.6, 'cancer', 'step, step. | bounce.']] },
    { dur: 3.6, set: (x, t) => danceHall(x, t), cast: { capricorn: [[0, 360, 1260, 250], [0.5, 420, 1260, 250], [1.0, 360, 1260, 250], [1.5, 420, 1260, 250]], taurus: [[0, 800, 1260, 230]] }, mood: { capricorn: 'squint', taurus: 'happy' }, props: { taurus: 'glasses' },
      stick: [[0.2, 1.4, 'ROBOT MODE', BONE]], lines: [[1.9, 1.6, 'taurus', 'loosen | your points.']] },
    { dur: 3.6, set: (x, t) => danceHall(x, t), cast: { capricorn: [[0, 380, 1260, 250], [0.6, 520, 1260, 250]], libra: [[0, 780, 1260, 230]] }, mood: { capricorn: lt => lt > 0.7 ? 'wide' : 'happy', libra: lt => lt > 0.7 ? 'wide' : 'happy' },
      stick: [[0.7, 1.2, 'OOF', BRAKE]], lines: [[2.0, 1.4, 'capricorn', "I'm SO | sorry.."]], sfx: [SFX.thud(0.7), SFX.womp(0.9)] },
    { dur: 3.8, set: (x, t) => danceHall(x, t), cast: { capricorn: [[0, 360, 1260, 250]], libra: [[0, 760, 1260, 230]] }, mood: { capricorn: lt => lt > 2 ? 'happy' : 'neutral', libra: 'sparkle' }, hops: { libra: [0.3, 0.6], capricorn: [2.2, 2.5] },
      lines: [[0.3, 1.7, 'libra', 'haha do it | again! it was cute.']], sfx: [SFX.ding(0.3)] },
    { dur: 3.8, set: (x, t, lt) => { danceHall(x, t); hearts(x, t, 540, 950, t - lt + 0.4, { n: 10, spread: 360 }) }, front: (x, t) => notes(x, t, 540, 1000, { n: 6, cell: 8 }),
      cast: { capricorn: [[0, 420, 1260, 240]], libra: [[0, 680, 1260, 230]], cancer: [[0, 160, 1330, 170]], taurus: [[0, 920, 1330, 170]] }, mood: { capricorn: 'heart', libra: 'heart', cancer: 'sparkle', taurus: 'sparkle' }, props: AUNTS,
      hops: { capricorn: [0.1, 0.5, 0.9, 1.3, 1.7, 2.1, 2.5, 2.9], libra: [0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1], cancer: [0.2, 0.6, 1.0, 1.4, 1.8, 2.2], taurus: [0.4, 0.8, 1.2, 1.6, 2.0, 2.4] }, sfx: [SFX.cheer(0.4)] },
    { dur: 3.4, set: (x, t) => danceHall(x, t), cast: { capricorn: [[0, 330, 1260, 250]], cancer: [[0, 780, 1260, 240]] }, mood: { capricorn: 'happy', cancer: 'wink' }, props: { cancer: 'glasses' },
      lines: [[0.3, 1.4, 'capricorn', 'same time | next week?'], [1.9, 1.4, 'cancer', "we'll | be here."]] },
  ],
  lesson: { lines: ['Laugh at', 'the mistake.', 'Keep dancing.'], cast: { capricorn: [[0, 330, 1370, 190]], libra: [[0, 750, 1370, 190]] }, mood: { capricorn: 'heart', libra: 'heart' }, line: ['libra', 'step, step, | bounce.'] },
})

export const W04D = { hst107, hst108, hst109, hst110 }
