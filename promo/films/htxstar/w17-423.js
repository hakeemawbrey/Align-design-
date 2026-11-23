// hst423 · 6 days · Aries can't wait 6 more days (rips the calendar, tries sitting still) · chiptune
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, calWall, dayCal, quietRoom, kolache, room, porch } from './w17.js'

const L = 300, R = 780, M = 540
const wall = (x, t, lt) => calWall(x, t, lt, 6)
const plain = (x, t) => room(x, { wall: '#5a2a2a', floor: '#3a2a22', trim: '#2a1010' })
const ripping = (x, t, lt) => { plain(x, t); const n = 6 - Math.min(3, Math.floor(lt / 0.5)); dayCal(x, 760, 760, 0.9, n, { prev: n + 1, flip: (lt % 0.5) / 0.5 }) }
const door = (x, t, lt) => { plain(x, t); box(x, 620, 640, 280, 620, '#8a5530', 8); x.fillStyle = GOLD; x.beginPath(); x.arc(860, 960, 14, 0, Math.PI * 2); x.fill(); box(x, 660, 700, 200, 80, BONE, 4); txt(x, 'JAN 9', 760, 742, { size: 46, col: INK }) }

export const EP = ep(6, {
  hook: "Aries can't wait | 6 more days.",
  hookSet: (x, t, lt) => wall(x, t, lt),
  hookCast: C({ aries: [[0, L, Y, 270], [0.4, L + 40, Y, 270], [0.8, L - 20, Y, 270], [1.2, L + 40, Y, 270]] }), hookMood: { aries: 'wide' }, hookLook: { aries: [0, 0] },
  hookHops: { aries: [0.02, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4] },
  calX: 760, calY: 760, calS: 0.85,
  scenes: [
    { dur: 3.4, set: wall, cast: C({ aries: [M, Y, 300] }), mood: { aries: 'squint' }, look: { aries: [0, 0] },
      lines: [[0.15, 1.5, 'aries', 'why is it | not Jan 9?'], [1.8, 1.4, 'aries', 'why | NOT?']] },
    { dur: 3.6, set: ripping, cast: C({ aries: [L, Y, 250] }), mood: { aries: 'sparkle' }, hops: { aries: [0.1, 0.6, 1.1, 1.6] },
      lines: [[0.3, 1.4, 'aries', '5... 4... 3...']], stick: [[1.9, 1.5, 'TIME: UNCHANGED', SKYB]] },
    { dur: 3.4, set: plain, front: (x, t) => dayCal(x, 760, 760, 0.9, 6), cast: C({ capricorn: [L, Y, 240], aries: [R - 60, Y + 30, 200] }), mood: { capricorn: 'eyeroll', aries: 'wide' },
      lines: [[0.2, 2.8, 'capricorn', "that's not how | calendars work."]] },
    { dur: 3.6, set: door, cast: C({ aries: [[0, 200, Y, 240], [1.0, 480, Y, 240], [1.3, 440, Y, 240], [1.6, 480, Y, 240]] }), mood: { aries: 'sparkle' },
      lines: [[1.0, 1.0, 'aries', '*knock knock*'], [2.2, 1.3, 'aries', 'is it now?']] },
    { dur: 3.4, set: plain, front: (x, t) => kolache(x, 640, 1220, 0.8), cast: C({ taurus: [L, Y, 240], aries: [R, Y, 220] }), mood: { taurus: 'happy', aries: 'squint' },
      lines: [[0.2, 1.4, 'taurus', 'patience. | have a kolache.'], [1.8, 1.4, 'aries', '...fine. | (yum.)']] },
    { dur: 3.6, set: quietRoom, cast: C({ aries: [M, Y - 20, 240] }), mood: { aries: lt => lt > 2.2 ? 'wide' : 'sleepy' },
      lines: [[2.3, 1.2, 'aries', 'that was | 3 seconds.']], stick: [[0.1, 1.8, 'SITTING STILL...', BONE]] },
    { dur: 3.4, set: plain, cast: C({ libra: [L, Y, 240], aries: [R, Y, 220] }), mood: { libra: 'wink', aries: 'happy' },
      lines: [[0.2, 1.4, 'libra', 'use the wait. | text a friend.'], [1.8, 1.4, 'aries', 'texting | EVERYONE.']] },
    { dur: 3.6, set: wall, cast: C({ aries: [M, Y, 300] }), mood: { aries: 'happy' }, look: { aries: [0, 0] },
      lines: [[0.15, 1.6, 'aries', 'excited | is good.'], [1.9, 1.6, 'aries', 'let it | build.']] },
  ],
  stamp: { set: plain, cast: C({ aries: [L, Y, 240], taurus: [R, Y, 210] }), mood: { aries: 'sparkle', taurus: 'heart' }, look: { aries: [0, 0] }, hops: { aries: [0.4, 0.8, 1.2] },
    lines: [[1.2, 2.2, 'aries', '6 days. | I can do it.']] },
  line: 'Worth the wait. Jan 9.', stars: ['aries', 'taurus', 'capricorn', 'libra'],
})
