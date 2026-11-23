// Houston Star Talk · w08 · "Your star just texted you" (hst186–hst198). Engine and props: ./w08.js
import { clamp, prog, ease } from '../../src/lib.js'
import { textsEp, PIC, traffic, bayou, batBridge, porch, neonStreet, beach, park, arctic, tunnel, kitchen, grad, dots, disc, handPhone,
  box, txt, label, sparkles, pop01, signChar, hearts, GOLD, BONE, PINK, INK, MONO, SERIF, SKYB, MINT, LAV, FLOOR, outside,
  skyline, car, freeway, heatSun, sweat, taco, shield, streetSign, houses, mural, coffeeShop, BRAKE, HGREEN, kolache, klobasnek, puffer, soupPot } from './w08.js'

export const W08T = {}
const Y = 1255

// ── hst186 · Taurus, stuck on the 59, texting you at 8am
W08T.hst186 = (() => {
  const bg = (x, t) => { grad(x, '#ff9a6b', '#3a2a6a', 0, 900); skyline(x, 760, t, { alpha: 0.8 }); traffic(x, t, 760, { rows: 2 }); x.fillStyle = '#231c3a'; x.fillRect(0, 1180, 1080, 740) }
  const road = (x, t) => { grad(x, '#ffb07a', '#5a3a8a', 0, 1000); skyline(x, FLOOR - 150, t, { alpha: 0.85 }); freeway(x, FLOOR - 160, 600, 3, t * 30); shield(x, 900, 560, '59', 1.1) }
  const inCar = (x, t, lt, P) => { const [cx] = P.at('taurus'); car(x, cx, FLOOR + 120, '#7dbf5a', { open: true, brake: 1 }); car(x, cx + 330, FLOOR + 120, '#c9a6ff', { brake: 1 }); car(x, cx - 330, FLOOR + 120, '#5ec8ff', { brake: 1 }) }
  return textsEp({
    sign: 'taurus', hook: 'Taurus texted you | from the 59 again', bg, endLine: 'Leave early. See you Jan 9.', endStars: ['taurus', 'libra', 'cancer', 'pisces'],
    beats: [
      { dur: 3.0, msgs: [[-1.2, 's', 'hey. you up?'], [-0.5, 's', 'hey'], [0.05, 's', 'HEY'], [1.1, 's', 'quick question'], [2.2, 'y', "it's 8am??"]] },
      { dur: 3.0, msgs: [[0.4, 's', 'how far is | 20 minutes away'], [1.9, 'y', 'without traffic?']] },
      { dur: 3.0, kind: 'cut', set: road, front: inCar, cast: { taurus: [[0, 300, FLOOR + 5, 200]] }, mood: { taurus: 'eyeroll' }, msgs: [[0.3, 's', 'with traffic. | always with.']], stick: [[1.6, 1.3, 'SOUTHWEST FWY · 8:04 AM', GOLD]] },
      { dur: 3.0, msgs: [[0.2, 's', PIC.traffic], [1.5, 's', 'this has been the view | for an hour']] },
      { dur: 3.0, msgs: [[0.3, 'y', 'take the feeder'], [1.5, 's', 'the feeder is ALSO this']], tags: [[1.6, 1.3, 'FEEDER ROAD: ALSO FULL', BRAKE]] },
      { dur: 3.0, kind: 'cut', set: road, front: (x, t, lt, P) => { inCar(x, t, lt, P); const [cx, cy, s] = P.at('taurus'); taco(x, cx - s * 0.5, cy + 20, 0.9) }, cast: { taurus: [[0, 300, FLOOR + 5, 200]] }, mood: { taurus: 'heart' }, hand: false,
        lines: [[0.3, 2.4, 'taurus', 'emergency taco. | I keep one.']] },
      { dur: 3.4, msgs: [[0.2, 's', 'ok real talk'], [1.1, 's', 'I was meeting someone | for coffee. at 8.'], [2.5, 'y', 'did you tell them?']] },
      { dur: 3.4, msgs: [[0.3, 's', 'no. I was gonna show up 40 min late with a kolache'], [2.1, 'y', 'tell them now. that\'s the kind thing']] },
      { dur: 3.0, kind: 'cut', set: road, front: inCar, cast: { taurus: [[0, 300, FLOOR + 5, 200]] }, mood: { taurus: 'squint' }, msgs: [[0.3, 's', 'sent: "running late, | the 59 got me. sorry!"']] },
      { dur: 3.4, msgs: [[0.2, 's', 'they said "same lol. | I\'m stuck on 290"'], [1.7, 's', "WE'RE BOTH STUCK"]], tags: [[1.8, 1.5, 'HOUSTON IS AN HOUR FROM HOUSTON', GOLD]], peekMood: 'wide' },
      { dur: 3.4, msgs: [[0.2, 's', 'we\'re rescheduling'], [1.0, 's', 'somewhere we both | leave early for'], [2.3, 'y', 'like where?']] },
      { dur: 3.2, msgs: [[0.2, 's', PIC.calendar], [1.6, 's', 'Jan 9. beta party. | leaving 2 hrs early.']], peekMood: 'heart' },
      { dur: 3.0, kind: 'cut', set: (x, t, lt) => { road(x, t, lt); if (lt > 0.3) sparkles(x, t, 540, 800, t - lt + 0.3, 12, 320, 4) }, front: inCar, cast: { taurus: [[0, 300, FLOOR + 5, 200], [1.2, 300, FLOOR + 5, 200], [2.6, 1250, FLOOR - 40, 200]] }, mood: { taurus: 'sparkle' }, hand: false,
        lines: [[0.2, 1.4, 'taurus', 'late is fine. | silent is not.']], stick: [[1.6, 1.3, 'TEXT EARLY. BE KIND.', MINT]] },
    ],
  })
})()
