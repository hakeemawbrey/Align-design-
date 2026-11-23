// hst422 · 7 days · One week out: Sag invited everyone (pickleball, karaoke, the taco truck… not the mosquito) · pop
import { ep, C, Y, G, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, lawn, court, karaoke, foodTruck, mosquito, clipboard, outside, stringLights, skyline, skyFill, inviteCardMini } from './w17.js'

const L = 300, R = 780, M = 540
const lot = (x, t) => { skyFill(x, '#1a1040', '#ff9a7a', 0, 1000); skyline(x, 1000, t, { alpha: 0.9 }); outside(x, { ground: '#3a3448' }); stringLights(x, 700, t); foodTruck(x, 780, G, 'TACOS', '#ff8f3c', t) }
const megaphone = (x, P, id) => { const [cx, cy, s] = P.at(id); x.save(); x.translate(cx + s * 0.42, cy - s * 0.05); x.rotate(-0.2); x.fillStyle = INK; x.beginPath(); x.moveTo(-10, -26); x.lineTo(90, -60); x.lineTo(90, 60); x.lineTo(-10, 26); x.fill(); x.fillStyle = '#ff5a6e'; x.beginPath(); x.moveTo(-4, -20); x.lineTo(84, -52); x.lineTo(84, 52); x.lineTo(-4, 20); x.fill(); x.restore() }
const ticket = (x, t, lt, cx, cy) => inviteCardMini(x, t, cx, cy, Kp(lt, 0.4))

export const EP = ep(7, {
  hook: 'One week out. | Sag invited everyone.',
  hookSet: (x, t) => lot(x, t),
  hookFront: (x, t, lt, P) => megaphone(x, P, 'sagittarius'),
  hookCast: C({ sagittarius: [[0, L, Y, 270], [1.4, L - 40, Y, 270]] }), hookMood: { sagittarius: 'sparkle' }, hookLook: { sagittarius: [0, 0] },
  hookHops: { sagittarius: [0.02, 0.5, 1.0, 1.5, 2.0] },
  calX: 560, calY: 820, calS: 0.6,
  scenes: [
    { dur: 3.4, set: lot, front: (x, t, lt, P) => megaphone(x, P, 'sagittarius'), cast: C({ sagittarius: [L + 60, Y, 300] }), mood: { sagittarius: 'sparkle' }, look: { sagittarius: [0, 0] },
      lines: [[0.15, 1.5, 'sagittarius', "you're coming, | right?"], [1.8, 1.4, 'sagittarius', 'RIGHT?']] },
    { dur: 3.6, set: court, front: (x, t, lt) => ticket(x, t, lt, 760, 700), cast: C({ sagittarius: [L, Y, 240], aries: [R, Y, 220] }), mood: { sagittarius: 'happy', aries: 'sparkle' },
      lines: [[0.2, 1.5, 'sagittarius', 'pickleball crew: | invited.'], [1.9, 1.3, 'aries', 'we\'re IN.']] },
    { dur: 3.6, set: (x, t, lt) => karaoke(x, t, lt, 'see you Jan 9'), front: (x, t, lt) => ticket(x, t, lt, 820, 1000), cast: C({ leo: [L, Y, 250], sagittarius: [R, Y, 220] }), mood: { leo: 'sparkle', sagittarius: 'happy' },
      lines: [[0.2, 1.4, 'sagittarius', 'karaoke on | Bellaire: in.'], [1.9, 1.4, 'leo', 'I was | born ready!']] },
    { dur: 3.6, set: lot, front: (x, t, lt) => ticket(x, t, lt, 540, 700), cast: C({ taurus: [L, Y, 240] }), mood: { taurus: 'heart' },
      lines: [[0.4, 2.6, 'taurus', 'the breakfast taco | guy is in?']], stick: [[1.6, 1.6, 'TACO GUY: IN', GOLD]] },
    { dur: 3.6, set: lot, front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1), cast: C({ virgo: [L, Y, 240], sagittarius: [R - 120, Y, 230] }), mood: { virgo: 'squint', sagittarius: 'wink' },
      lines: [[0.2, 1.5, 'virgo', 'how many | people, Sag?'], [1.9, 1.4, 'sagittarius', '...yes.']] },
    { dur: 3.4, set: lot, front: (x, t) => mosquito(x, 760, 900, t), cast: C({ sagittarius: [L, Y, 250] }), mood: { sagittarius: 'squint' },
      lines: [[0.6, 2.4, 'sagittarius', 'not you, | mosquito.']] },
    { dur: 3.6, set: lot, cast: C({ sagittarius: [L + 60, Y, 300] }), mood: { sagittarius: 'happy' }, look: { sagittarius: [0, 0] },
      lines: [[0.15, 1.6, 'sagittarius', 'invite the | quiet friend.'], [1.9, 1.6, 'sagittarius', "they'll remember | you did."]] },
  ],
  stamp: { set: lot, cast: C({ sagittarius: [L, Y, 240], aries: [R - 120, Y, 210] }), mood: { sagittarius: 'sparkle', aries: 'heart' }, look: { sagittarius: [0, 0] },
    lines: [[1.2, 2.2, 'sagittarius', 'tag who | you\'re bringing.']] },
  line: 'Bring a friend. Jan 9.', stars: ['sagittarius', 'aries', 'leo', 'taurus'],
})
