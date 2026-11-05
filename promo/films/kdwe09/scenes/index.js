// kdwe09 · Don't Watch This If You're a ___ · "Capricorn's Calendar Block" (16 s vertical, loop) · house · C
//   0      Capricorn stiff-arming the lens, a planner in hand; "CAPRICORN. | Eyes *off.* That's an order." · scratch · whip out
//   1.5    a wall calendar packed solid · ♑ "too busy to *date.*" · "Booked. *Solid.*"
//   4.2    whip zoom: one tiny pink block, 3:00–3:15 "THINK ABOUT THEM" · "…except *one* block."
//   7.2    it repeats every day: pink blocks pop down the week · "Repeats *daily.*"
//   9.6    an invite drops: "budget sync · 3:00 PM" · ♑ "declined. that slot is *taken.*"
//   12.4   Pisces sobbing: "they *scheduled* feelings!!" · 14.0 "Too busy. | *Except* 3:00 to 3:15." · 15.55 loop to frame 0
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const CP = tag('capricorn'), PI = tag('pisces')
const ZOOM = 4.2, DAILY = 7.2, INVITE = 9.6, PIS = 12.4
const CAL = { x: 470, y: 420, w: 580, h: 760 }, DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'], H0 = 9, H1 = 18
const hourY = h => CAL.y + 80 + (h - H0) / (H1 - H0) * (CAL.h - 100)
const colX = d => CAL.x + 20 + d * ((CAL.w - 40) / 5)
const CW = (CAL.w - 40) / 5 - 8
const BUSY = [[0, 9, 11], [0, 11.2, 14.8], [0, 15.4, 18], [1, 9, 12], [1, 12.5, 14.9], [1, 15.4, 17.5], [2, 9, 10.5], [2, 10.8, 14.8], [2, 15.4, 18], [3, 9, 13], [3, 13.2, 14.9], [3, 15.4, 18], [4, 9, 11.5], [4, 12, 14.9], [4, 15.4, 17]]
const F = dwFilm({
  id: 'kdwe09', sign: 'capricorn', dur: 16, ending: 'loop',
  hook: 'CAPRICORN.|Eyes *off.* That’s an order.', hookOut: 1.3, scratch: 'order *declined.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 260, y: 1270, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: ZOOM, cam: [2.2, colX(0) + CW / 2 + 40, hourY(15.1)] },
    { at: DAILY, cam: [1.25, 760, 900] },
    { at: INVITE, cam: [1, 540, 960] },
  ],
  heads: [
    { text: 'Booked. *Solid.*', at: 2.9, out: [4.0, 4.2], top: 240, size: 110 },
    { text: '…except *one* block.', at: 4.5, out: [6.9, 7.15], top: 240 },
    { text: 'Repeats *daily.*', at: 7.5, out: [9.3, 9.55], top: 240, size: 104 },
    { text: 'Too busy.|*Except* 3:00 to 3:15.', at: 14.0, out: [15.25, 15.5], top: 250, size: 86 },
  ],
  boxes: [
    { open: 1.45, close: 4.0, lines: [{ t: 1.6, speaker: CP, text: 'too busy to *date.*', color: '#9fe6b0' }] },
    { open: 10.5, close: 15.4, lines: [{ t: 10.65, speaker: CP, text: 'declined. that slot is *taken.*', color: '#9fe6b0' }, { t: 12.6, speaker: PI, text: 'they *scheduled* feelings!!', color: '#9fd7ff' }] },
  ],
  pitch: { [CP]: 349.23, [PI]: 1046.5 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: { at: INVITE, out: [10.9, 11.15], title: 'calendar', body: 'INVITE: budget sync · *3:00 PM*', glyph: '♑', y: 140 } }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#2a3236', wall2: '#151a1e', floor: '#2a2a2e', window: false, frame: null })
    // the wall calendar
    K.box(x, CAL.x, CAL.y, CAL.w, CAL.h, '#efe6d6', { o: 8 })
    K.rect(x, CAL.x, CAL.y, CAL.w, 60, '#3a5a4a'); K.txt(x, 'THIS WEEK', CAL.x + CAL.w / 2, CAL.y + 31, { size: 28, color: '#efe6d6' })
    DAYS.forEach((d, i) => K.txt(x, d, colX(i) + CW / 2, CAL.y + 78, { size: 16, color: '#3a3a3a' }))
    for (let h = H0; h <= H1; h++) K.rect(x, CAL.x + 10, hourY(h), CAL.w - 20, 2, 'rgba(0,0,0,0.12)')
    for (const [d, a, b] of BUSY) { K.rect(x, colX(d), hourY(a) + 2, CW, hourY(b) - hourY(a) - 4, '#8a9aa4'); K.rect(x, colX(d), hourY(a) + 2, 4, hourY(b) - hourY(a) - 4, '#4a5a64') }
    // the pink block (Monday 3:00–3:15), then every day
    for (let d = 0; d < 5; d++) {
      const k = d === 0 ? 1 : K.pop01(t, DAILY + 0.2 + d * 0.25, 0.3, 2.6)
      if (k <= 0) continue
      x.save(); x.translate(colX(d) + CW / 2, hourY(15.125)); x.scale(k, k)
      K.rect(x, -CW / 2, -8, CW, 16, '#ff6fa8'); if (d === 0) K.txt(x, '3:00 THINK ABOUT THEM', 0, 0, { size: 5.6, color: '#fff' })
      x.restore()
    }
    // the invite card that gets flicked away
    const fl = ease.inCubic(prog(t, 11.0, 11.4))
    if (t > INVITE + 0.2 && t < 11.4) { x.save(); x.translate(lerp(760, 1500, fl), hourY(15.125) - 30); x.rotate(fl * 1.2); K.label(x, 'budget sync?', 0, 0, { size: 22, bg: '#c9d4dc' }); x.restore() }
    if (t > PIS) K.pisces(x, t, { x: 760, y: 1320, s: 240, pop: K.pop01(t, PIS, 0.4), look: [-1, -0.5], tears: 3 })
    if (!K.hide) {
      const mood = t < ZOOM ? 'squint' : t < DAILY ? 'wide' : t < INVITE ? 'heart' : t < 11.4 ? 'squint' : 'happy'
      K.star(x, t, 'capricorn', { x: 260, y: 1270, s: 300, mood, look: [1, -0.5], seed: 10 })
      K.box(x, 340, 1290, 90, 110, '#5a3a2a', { o: 3 })
    }
  },
  over(x, t, K) {
    K.caught(x, t, { X: 600, Y: 960, r: 260, at: 4.8, out: 7.0 })
    const k = K.inOut(t, 5.0, 7.0)
    if (k > 0.01) K.label(x, '3:00–3:15 · THINK ABOUT THEM ♡', 540, 1300, { size: 34, bg: '#ff6fa8', ink: '#fff', rot: -0.03, pop: k })
  },
  cues: [
    ['whoosh', ZOOM - 0.05, 0.3, 0.06],
    ...[0, 1, 2, 3, 4].slice(1).map(d => ['pop', +(DAILY + 0.2 + d * 0.25).toFixed(2), 880 + d * 110, 0.04, d / 2 - 1]),
    ['whoosh', 11.0, 0.35, 0.05], ['tick', 11.05, 0.06],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'house', key: 'C', seed: 4109, sections: { drop: 1.42, lift: [DAILY] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
