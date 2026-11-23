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

// ── hst187 · Pisces, crying (happily) at the bat bridge at sunset
W08T.hst187 = (() => {
  const bg = (x, t) => { bayou(x, t, { sky: ['#ff8a7a', '#4a2a7a'], y: 1260 }); batBridge(x, t, t, 30) }
  const trail = (x, t, lt) => { bayou(x, t, { sky: ['#ff9a6b', '#5b3a8a'], y: 1260 }); batBridge(x, t, lt + 4, 46) }
  return textsEp({
    sign: 'pisces', hook: 'Pisces texted you | from the bat bridge', bg, peekMood: 'heart', endLine: "Don't watch it alone. Jan 9.", endStars: ['pisces', 'cancer', 'scorpio', 'taurus'],
    beats: [
      { dur: 3.0, msgs: [[-1.0, 's', 'are you busy'], [0.05, 's', 'the bats are coming out'], [1.5, 's', 'RIGHT NOW'], [2.4, 'y', 'what bats??']] },
      { dur: 3.2, msgs: [[0.2, 's', PIC.bats], [1.7, 's', 'the bridge on the bayou. every sunset.']] },
      { dur: 3.2, kind: 'cut', set: trail, cast: { pisces: [[0, 540, 1180, 230]] }, mood: { pisces: 'wide' }, msgs: [[0.3, 's', 'they all leave | together']], stick: [[1.6, 1.4, 'BUFFALO BAYOU · SUNSET', GOLD]] },
      { dur: 3.0, msgs: [[0.3, 's', 'like a family'], [1.2, 's', "I'm crying"], [2.2, 'y', 'are you ok?']] },
      { dur: 3.2, msgs: [[0.3, 's', 'happy crying. mostly.'], [1.6, 's', 'ok 70% happy']], tags: [[1.7, 1.3, 'PISCES: CRYING (NORMAL)', LAV]] },
      { dur: 3.4, kind: 'cut', set: trail, cast: { pisces: [[0, 540, 1180, 230]] }, mood: { pisces: 'squint' }, msgs: [[0.3, 's', 'everyone here is | with someone']], stick: [[1.8, 1.3, 'RUN CLUB · COUPLE · DOG', LAV]] },
      { dur: 3.2, msgs: [[0.2, 's', 'I came alone. again.'], [1.6, 'y', 'next time call me first']] },
      { dur: 3.2, msgs: [[0.3, 's', 'wait really?'], [1.3, 'y', "really. I've never seen the bats"]], peekMood: 'wide' },
      { dur: 3.2, msgs: [[0.2, 's', "you've lived here HOW long"], [1.7, 'y', 'I know. I know.']] },
      { dur: 3.4, msgs: [[0.2, 's', 'ok. a plan:'], [0.9, 's', 'bats. then the beta party. Jan 9.'], [2.4, 'y', 'deal']], peekMood: 'heart' },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { trail(x, t, lt); if (lt > 0.4) sparkles(x, t, 540, 900, t - lt + 0.4, 12, 320, 7) }, cast: { pisces: [[0, 540, 1180, 230]] }, mood: { pisces: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'pisces', 'the bats never | go out alone.']], stick: [[1.8, 1.3, 'NEITHER SHOULD YOU', PINK]] },
    ],
  })
})()

// ── hst188 · Leo needs you to rate the fit (the one cold day, then 81)
W08T.hst188 = (() => {
  const wall = (x, t) => { grad(x, '#ffb07a', '#ff7aa8', 0, 420); mural(x, t); x.fillStyle = '#3a2a4a'; x.fillRect(0, 1320, 1080, 600); x.fillStyle = INK; x.fillRect(0, 1316, 1080, 8); streetSign(x, 860, 330, 'WESTHEIMER', { pole: false, k: 0.8 }) }
  const bg = wall
  return textsEp({
    sign: 'leo', hook: 'Leo needs you | to rate this fit', bg, scheme: { me: '#ffd36b' }, endLine: 'Dress for both. See you Jan 9.', endStars: ['leo', 'gemini', 'libra', 'pisces'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', "it's 55 degrees"], [0.05, 's', 'RATE MY FIT'], [1.0, 's', PIC.puffer]] },
      { dur: 3.0, msgs: [[0.3, 'y', "it's 55. not the arctic"], [1.6, 's', 'for Houston it IS the arctic']] },
      { dur: 3.2, kind: 'cut', set: wall, front: (x, t, lt, P) => puffer(x, P, 'leo', '#e05a3a'), cast: { leo: [[0, 540, 1200, 270]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.5, 1.4] }, msgs: [[0.3, 's', 'puffer. beanie. | scarf. boots.']], stick: [[1.7, 1.3, 'THE ONE COLD DAY', SKYB]] },
      { dur: 3.0, msgs: [[0.2, 's', 'posted the car thermometer'], [1.4, 's', '1,200 likes'], [2.3, 'y', 'it says 55']] },
      { dur: 3.0, msgs: [[0.3, 's', 'brb'], [1.5, 's', 'UPDATE']], tags: [[1.6, 1.3, '3 HOURS LATER', GOLD]] },
      { dur: 3.2, msgs: [[0.1, 's', "it's 81"], [1.0, 's', PIC.shorts], [2.4, 'y', 'outfit #2?']], peekMood: 'wide' },
      { dur: 3.2, kind: 'cut', set: (x, t) => { wall(x, t); heatSun(x, 880, 560, t, 80) }, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.3, cy - s * 0.3, t) }, cast: { leo: [[0, 540, 1200, 270]] }, mood: { leo: 'squint' }, msgs: [[0.3, 's', 'outfit #3. | I changed in the car.']] },
      { dur: 3.2, msgs: [[0.2, 'y', 'you changed 3 times today'], [1.5, 's', 'Houston has 2 seasons. | I dress for both.']] },
      { dur: 3.4, msgs: [[0.2, 's', 'serious question'], [1.0, 's', 'what do I wear Jan 9'], [2.3, 'y', 'layers. and be yourself']] },
      { dur: 3.0, msgs: [[0.3, 's', 'layers. genius.'], [1.4, 's', 'myself. even better.']], peekMood: 'heart' },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { wall(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 320, 2) }, front: (x, t, lt, P) => { if (lt > 1.2) puffer(x, P, 'leo', '#e05a3a') }, cast: { leo: [[0, 540, 1200, 270]] }, mood: { leo: 'sparkle' }, hops: { leo: [1.2, 1.5] }, hand: false,
        lines: [[0.2, 1.0, 'leo', 'shorts.'], [1.3, 1.6, 'leo', 'and a puffer. | for the AC.']], stick: [[1.8, 1.2, 'THE HOUSTON LAYER', GOLD]] },
    ],
  })
})()

// ── hst189 · Virgo needs your kolache order (it's a klobasnek)
W08T.hst189 = (() => {
  const bg = (x, t) => kitchen(x, t, { wall: '#c8e6d0', tile: '#a8d4b8' })
  return textsEp({
    sign: 'virgo', hook: 'Virgo needs your | kolache order. Now.', bg, scheme: { me: '#ffd36b' }, endLine: "You're on snack duty. Jan 9.", endStars: ['virgo', 'capricorn', 'taurus', 'cancer'],
    beats: [
      { dur: 3.0, msgs: [[-0.9, 's', 'kolache run tomorrow 7am'], [0.05, 's', 'headcount + orders. now.'], [1.9, 'y', 'sausage kolache pls']] },
      { dur: 3.0, msgs: [[0.4, 's', '...'], [1.2, 's', "that's a klobasnek"]], peekMood: 'squint', tags: [[1.4, 1.4, 'A VIRGO HAS BEEN SUMMONED', BRAKE]] },
      { dur: 3.4, kind: 'cut', set: bg, front: (x, t, lt, P) => { kolache(x, 300, 1210, 1.6); klobasnek(x, 780, 1210, 1.6); txt(x, 'SWEET', 300, 1320, { size: 34, font: MONO, weight: 700 }); txt(x, 'SAUSAGE', 780, 1320, { size: 34, font: MONO, weight: 700 }) },
        cast: { virgo: [[0, 540, 960, 240]] }, mood: { virgo: 'squint' }, msgs: [[0.2, 's', 'kolache: fruit. | klobasnek: sausage.']], stick: [[2.0, 1.3, 'THIS IS NOT A DEBATE', GOLD]] },
      { dur: 3.0, msgs: [[0.3, 'y', 'everyone calls it a kolache'], [1.6, 's', 'everyone is wrong. lovingly.']] },
      { dur: 3.0, msgs: [[0.2, 's', PIC.kolache], [1.6, 'y', 'ok both. I want both.']] },
      { dur: 3.0, msgs: [[0.3, 's', 'chaos.'], [1.2, 's', 'noted. 2 of each.']], peekMood: 'happy' },
      { dur: 3.4, msgs: [[0.2, 's', 'also'], [0.8, 's', 'I made a spreadsheet for Jan 9'], [2.2, 's', 'rides. snacks. outfits.']], tags: [[2.3, 1.1, 'TABS: 7', MINT]] },
      { dur: 3.2, kind: 'cut', set: bg, back: (x, t, lt) => { box(x, 240, 420, 600, 420, BONE, 8); for (let r = 0; r < 6; r++) { x.fillStyle = r ? (r % 2 ? '#e8f4ea' : BONE) : '#2fc79a'; x.fillRect(250, 430 + r * 66, 580, 64); if (r) { x.fillStyle = INK; x.fillRect(270, 455 + r * 66, 120 + (r * 53) % 200, 14) } } txt(x, 'JAN 9 · PLAN', 540, 462, { size: 34, col: INK, font: MONO, weight: 700 }) },
        cast: { virgo: [[0, 540, 1180, 240]] }, mood: { virgo: 'sparkle' }, msgs: [[0.4, 's', 'color-coded. | obviously.']] },
      { dur: 3.2, msgs: [[0.2, 'y', "you're the best, you know that"], [1.7, 's', 'I know.']], peekMood: 'heart' },
      { dur: 3.0, msgs: [[0.2, 's', "you're on klobasnek duty"], [1.6, 'y', 'honored']] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 320, 3) }, front: (x, t) => { kolache(x, 330, 1290, 1.2); klobasnek(x, 750, 1290, 1.2) }, cast: { virgo: [[0, 540, 1080, 260]] }, mood: { virgo: 'heart' }, hand: false,
        lines: [[0.2, 1.4, 'virgo', 'a plan is how | I say I love you.']], stick: [[1.8, 1.2, 'ALSO: IT\'S A KLOBASNEK', GOLD]] },
    ],
  })
})()

// ── hst190 · Scorpio texts you after 3 days (the bayou run club)
W08T.hst190 = (() => {
  const bg = (x, t) => { grad(x, '#1a0f3a', '#6a2a6a', 0, 1300); for (let k = 0; k < 10; k++) { x.strokeStyle = `rgba(255,90,170,${0.15 + k * 0.03})`; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 1300 + k * k * 7); x.lineTo(1080, 1300 + k * k * 7); x.stroke() } skyline(x, 1300, t, { col: '#2a1050', lit: '#ff5aa8' }); x.fillStyle = '#12082a'; x.fillRect(0, 1300, 1080, 620); for (let k = 0; k < 12; k++) { x.strokeStyle = 'rgba(255,90,170,0.3)'; x.lineWidth = 3; x.beginPath(); x.moveTo(540, 1300); x.lineTo(-600 + k * 200, 1920); x.stroke() } }
  const dawn = (x, t) => bayou(x, t, { sky: ['#ffb07a', '#7a4a9a'], y: 1300 })
  return textsEp({
    sign: 'scorpio', hook: 'Scorpio left you | on read. Then this.', bg, scheme: { me: '#ff8fb1', status: 'last seen 3 days ago' }, endLine: 'Say it plainly. See you Jan 9.', endStars: ['scorpio', 'pisces', 'aries', 'leo'],
    beats: [
      { dur: 3.0, msgs: [[-1.2, 'y', 'hey! fun night'], [-0.6, 'y', 'run club again sometime?'], [0.3, 's', 'I saw your story.']], tags: [[2.65, 0.35, '3 DAYS LATER', BRAKE]] },
      { dur: 3.0, msgs: [[0.2, 'y', '...hi?'], [1.2, 's', 'the bayou run club one']], peekMood: 'squint' },
      { dur: 3.2, msgs: [[0.2, 's', "I've been going."], [1.1, 's', 'every week. 6am.'], [2.3, 'y', 'since when?']] },
      { dur: 3.2, kind: 'cut', set: dawn, cast: { scorpio: [[0, -150, 1210, 220], [3.0, 1250, 1210, 220]] }, mood: { scorpio: 'squint' }, hand: false, lines: [[0.6, 1.8, 'scorpio', 'since your | story. 6am.']], stick: [[0.4, 1.3, 'BAYOU TRAIL · 5:58 AM', GOLD]] },
      { dur: 3.0, msgs: [[0.3, 's', PIC.run], [1.8, 's', 'not because of you']] },
      { dur: 2.6, msgs: [[0.4, 's', 'a little because of you']], peekMood: 'wide' },
      { dur: 3.2, msgs: [[0.2, 'y', 'you could have just said that'], [1.6, 's', 'saying things is hard']] },
      { dur: 3.4, kind: 'cut', set: bg, cast: { scorpio: [[0, 540, 1150, 260]] }, mood: { scorpio: lt => lt < 1.6 ? 'squint' : 'wide' }, msgs: [[0.2, 's', 'ok. saying it:'], [1.6, 's', 'come run | with me?']] },
      { dur: 3.0, msgs: [[0.3, 'y', 'yes. obviously yes.'], [1.6, 's', 'cool. cool cool cool.']], peekMood: 'heart' },
      { dur: 3.4, msgs: [[0.2, 's', 'also. Jan 9. the beta party.'], [1.5, 's', "I'll be early. pretending I'm not."]], tags: [[2.4, 1.0, 'SCORPIO: SECRETLY THRILLED', PINK]] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { dawn(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 320, 8) }, cast: { scorpio: [[0, 540, 1180, 250]] }, mood: { scorpio: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'scorpio', 'mysterious is | fun. clear is kind.']], stick: [[1.9, 1.2, 'SAY IT PLAINLY', MINT]] },
    ],
  })
})()

// ── hst191 · Gemini sends you 14 texts in a row
W08T.hst191 = (() => {
  const bg = (x, t) => neonStreet(x, t, ['BOUDIN', 'TACOS', 'BOBA', 'KARAOKE'], { sky: '#1a1440' })
  const trucks = (x, t, side) => { grad(x, side ? '#ffb07a' : '#8fd3ff', side ? '#8a4a9a' : '#ffe0b0', 0, 1300); skyline(x, 1100, t, { alpha: 0.6 }); x.fillStyle = '#4a4a5a'; x.fillRect(0, 1300, 1080, 620); for (let k = 0; k < 2; k++) { const cx = 280 + k * 520; box(x, cx - 200, 900, 400, 300, ['#ff8fb1', '#7dffb0'][k], 7); box(x, cx - 150, 960, 300, 110, '#2a2250', 5); txt(x, side ? ['BOUDIN', 'ELOTE'][k] : ['TACOS', 'RASPAS'][k], cx, 1140, { size: 44, col: INK }); for (const wx of [-120, 120]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, 1210, 36, 0, Math.PI * 2); x.fill() } } streetSign(x, 540, 560, side ? 'HEIGHTS BLVD' : 'EaDo', { pole: false }) }
  return textsEp({
    sign: 'gemini', hook: 'Gemini sent you | 14 texts in a row', bg, scheme: { me: '#c9a6ff' }, endLine: 'One plan. Lots of fun. Jan 9.', endStars: ['gemini', 'sagittarius', 'aquarius', 'leo'],
    beats: [
      { dur: 3.0, msgs: [[-1.0, 's', 'ok so'], [-0.4, 's', 'wait'], [0.1, 's', 'food truck in EaDo'], [0.9, 's', 'it has boudin'], [1.7, 's', 'no wait'], [2.4, 's', 'different truck']] },
      { dur: 3.0, kind: 'cut', set: (x, t) => trucks(x, t, 0), cast: { gemini: [[0, 540, 1200, 230]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.3, 0.8, 1.3] }, msgs: [[0.2, 's', 'is EaDo the | East End??']], stick: [[1.7, 1.2, 'TEXTS: 7', GOLD]] },
      { dur: 3.0, msgs: [[0.1, 's', 'unrelated'], [0.8, 's', 'do you like karaoke'], [1.5, 's', 'also'], [2.2, 's', "I'm in the Heights now"]] },
      { dur: 3.0, kind: 'cut', set: (x, t) => trucks(x, t, 1), cast: { gemini: [[0, 540, 1200, 230]] }, mood: { gemini: 'wink' }, msgs: [[0.2, 's', 'how did I | get here']], stick: [[1.6, 1.3, 'TEXTS: 13', BRAKE]] },
      { dur: 3.0, msgs: [[0.2, 's', 'hello??'], [1.2, 'y', 'BREATHE'], [2.1, 's', 'breathing']], peekMood: 'wide' },
      { dur: 3.0, msgs: [[0.2, 's', 'ok one question'], [1.0, 's', 'ONE'], [2.0, 'y', 'go']] },
      { dur: 3.4, msgs: [[0.2, 's', 'karaoke on Bellaire or food trucks?'], [2.0, 'y', 'both. tacos then karaoke']] },
      { dur: 3.0, msgs: [[0.2, 's', 'my TWIN'], [1.2, 's', 'one plan. I can do one plan.']], peekMood: 'heart' },
      { dur: 3.4, kind: 'cut', set: bg, cast: { gemini: [[0, 360, 1180, 220]], libra: [[0, 760, 1180, 200]] }, mood: { gemini: 'sparkle', libra: 'happy' }, hand: false,
        lines: [[0.2, 1.3, 'gemini', 'SONG ONE.'], [1.6, 1.6, 'libra', 'you picked | four songs.']], stick: [[0.1, 1.2, 'KARAOKE · BELLAIRE BLVD', PINK]] },
      { dur: 3.2, msgs: [[0.2, 's', 'also Jan 9'], [0.9, 's', 'the beta party'], [1.7, 's', "I'm going. both of me."]] },
      { dur: 3.0, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 320, 4) }, cast: { gemini: [[0, 540, 1180, 250]] }, mood: { gemini: 'heart' }, hand: false,
        lines: [[0.2, 1.5, 'gemini', 'excited is cute. | one plan is cuter.']], stick: [[1.8, 1.1, 'TEXTS: 21', GOLD]] },
    ],
  })
})()

// ── hst192 · Cancer: "did you eat?"
W08T.hst192 = (() => {
  const bg = (x, t) => kitchen(x, t, { wall: '#f6d6b8', tile: '#ecc09a' })
  return textsEp({
    sign: 'cancer', hook: 'Your Cancer friend | texted: did you eat?', bg, scheme: { me: '#ffd36b' }, endLine: 'Bring a sweater. Jan 9.', endStars: ['cancer', 'taurus', 'virgo', 'pisces'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', 'hi baby'], [0.05, 's', 'did you eat'], [1.5, 'y', 'kind of']] },
      { dur: 3.0, msgs: [[0.3, 's', "kind of isn't a meal"], [1.6, 's', 'what did you eat']], peekMood: 'squint' },
      { dur: 3.0, msgs: [[0.2, 'y', 'half a breakfast taco'], [1.5, 's', 'at 4pm??']], tags: [[1.6, 1.3, 'CANCER: ON ALERT', BRAKE]] },
      { dur: 3.4, kind: 'cut', set: bg, front: (x, t) => soupPot(x, 760, 1180, t), cast: { cancer: [[0, 380, 1180, 240]] }, mood: { cancer: 'heart' }, msgs: [[0.2, 's', 'I made pho. | too much. on purpose.']], stick: [[2.0, 1.2, "IT'S 60°. SOUP WEATHER.", SKYB]] },
      { dur: 3.0, msgs: [[0.2, 's', PIC.pho], [1.6, 's', 'come over']] },
      { dur: 3.2, msgs: [[0.2, 's', 'also bring a sweater'], [1.3, 'y', "it's 80 outside"], [2.3, 's', 'inside is different']] },
      { dur: 3.2, kind: 'cut', set: (x, t) => arctic(x, t), front: (x, t, lt, P) => puffer(x, P, 'cancer', '#5ec8ff'), cast: { cancer: [[0, 540, 1220, 240]] }, mood: { cancer: 'squint' }, msgs: [[0.3, 's', 'the AC at the museum | was ARCTIC today']], stick: [[2.0, 1.1, 'INDOORS: 61°', SKYB]] },
      { dur: 3.2, msgs: [[0.2, 'y', 'ok coming. can I bring a friend?'], [1.8, 's', 'bring TWO']], peekMood: 'heart' },
      { dur: 3.2, msgs: [[0.2, 's', 'anyone who needs soup'], [1.3, 's', 'everyone needs soup'], [2.3, 'y', 'true']] },
      { dur: 3.4, msgs: [[0.2, 's', "and Jan 9 I'm bringing snacks to the beta party"], [2.0, 's', "so you'll eat there too"]] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 320, 5) }, front: (x, t) => soupPot(x, 800, 1220, t), cast: { cancer: [[0, 420, 1180, 250]] }, mood: { cancer: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'cancer', 'feeding you is | how I say it.']], stick: [[1.9, 1.2, 'GO EAT SOMETHING', MINT]] },
    ],
  })
})()

// ── hst193 · Aries challenges you to a paddle boat race
W08T.hst193 = (() => {
  const bg = (x, t) => park(x, t)
  const pond = (x, t, lt, P) => { const [cx, cy] = P.at('aries'); box(x, cx - 130, cy + 60, 260, 80, '#ff5a6e', 6); box(x, cx - 50, cy - 10, 100, 70, BONE, 5); for (let k = 0; k < 4; k++) { const p = (t * 2 + k / 4) % 1; x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(cx - 160 - p * 200, cy + 120 + k * 8, 60, 6) } }
  return textsEp({
    sign: 'aries', hook: 'Aries challenged you | to a paddle boat race', bg, scheme: { me: '#7dffb0' }, endLine: 'Race you there. Jan 9.', endStars: ['aries', 'sagittarius', 'leo', 'gemini'],
    beats: [
      { dur: 3.0, msgs: [[-0.7, 's', 'RACE ME'], [0.05, 's', 'paddle boats. Hermann Park.'], [1.6, 's', 'NOW']] },
      { dur: 3.0, msgs: [[0.2, 'y', 'race who?'], [1.2, 's', 'you. everyone. the ducks.']], peekMood: 'sparkle' },
      { dur: 3.2, kind: 'cut', set: bg, front: pond, cast: { aries: [[0, 200, 1010, 200], [3.0, 880, 1010, 200]] }, mood: { aries: 'squint' }, hand: false, lines: [[0.4, 2.0, 'aries', "I'm WINNING"]], stick: [[1.2, 1.4, 'HERMANN PARK · LAP 1', GOLD]] },
      { dur: 3.0, msgs: [[0.2, 's', PIC.paddle], [1.6, 'y', 'is anyone else racing?']] },
      { dur: 3.0, msgs: [[0.3, 's', 'no'], [1.0, 's', "I'm STILL winning"]], tags: [[1.3, 1.4, 'COMPETITORS: 0', BRAKE]] },
      { dur: 3.2, kind: 'cut', set: bg, front: pond, cast: { aries: [[0, 880, 1010, 200], [3.0, 200, 1010, 200]] }, mood: { aries: 'wide' }, hand: false, lines: [[0.3, 2.2, 'aries', 'a duck is | catching up']], stick: [[1.4, 1.3, 'LAP 6', GOLD]] },
      { dur: 3.2, msgs: [[0.2, 'y', 'come get coffee with me instead'], [1.8, 's', 'like a slow thing?']], peekMood: 'wide' },
      { dur: 3.2, msgs: [[0.2, 'y', 'a slow thing. walk the park. talk.'], [1.9, 's', 'ok. ok I can try slow']] },
      { dur: 3.0, msgs: [[0.2, 's', 'walking there now'], [1.3, 's', 'fast. but walking.']], peekMood: 'heart' },
      { dur: 3.2, msgs: [[0.2, 's', 'ALSO jan 9'], [1.0, 's', "I'll get there first"], [2.2, 'y', 'not a race']] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 800, t - lt + 0.3, 12, 320, 6) }, cast: { aries: [[0, 540, 1120, 240]] }, mood: { aries: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'aries', 'not every date | is a race.']], stick: [[1.9, 1.2, 'SOME ARE A STROLL', MINT]] },
    ],
  })
})()

// ── hst194 · Libra can't pick where to meet you
W08T.hst194 = (() => {
  const bg = (x, t) => { grad(x, '#ffc0d8', '#8a6ac8', 0, 1300); skyline(x, 1150, t, { alpha: 0.5, col: '#6a4a9a', lit: '#fff3c4' }); x.fillStyle = '#5a4a7a'; x.fillRect(0, 1300, 1080, 620) }
  const feeder = (x, t, closed) => { grad(x, '#ffd0a0', '#c86a9a', 0, 1200); freeway(x, 760, 200, 2, t * 200); coffeeShop(x, 560, 1300, closed); x.fillStyle = '#4a4a5a'; x.fillRect(0, 1300, 1080, 620); txt(x, 'FEEDER ROAD', 540, 1350, { size: 30, col: BONE, font: MONO, weight: 700 }) }
  return textsEp({
    sign: 'libra', hook: "Libra can't pick | where to meet you", bg, scheme: { me: '#8fe3ff' }, endLine: 'Meet in the middle. Jan 9.', endStars: ['libra', 'taurus', 'pisces', 'virgo'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', 'so where should we meet'], [0.05, 's', 'no pressure'], [1.6, 'y', 'you pick!']] },
      { dur: 3.0, msgs: [[0.3, 's', 'oh no'], [1.2, 's', 'inside the Loop or outside?']], peekMood: 'wide' },
      { dur: 3.2, msgs: [[0.2, 's', 'Montrose? the Heights?'], [1.3, 's', 'or halfway on a feeder road'], [2.4, 's', PIC.map]] },
      { dur: 3.2, kind: 'cut', set: bg, cast: { libra: [[0, 540, 1180, 240]] }, mood: { libra: lt => lt < 1.5 ? 'squint' : 'wide' }, look: { libra: [-1, 0] }, msgs: [[0.3, 's', 'what if I pick | wrong']], stick: [[1.8, 1.3, 'LIBRA: WEIGHING IT', LAV]] },
      { dur: 3.0, msgs: [[0.2, 's', 'ok I made a poll'], [1.3, 'y', 'how many options']], tags: [[1.5, 1.3, 'POLL: 9 OPTIONS', BRAKE]] },
      { dur: 3.0, msgs: [[0.2, 's', 'nine'], [1.2, 'y', 'Libra.'], [2.1, 's', 'ok OK. halfway coffee shop.']] },
      { dur: 3.2, kind: 'cut', set: (x, t) => feeder(x, t, true), cast: { libra: [[0, 230, 1200, 200]] }, mood: { libra: 'wide' }, msgs: [[0.3, 's', "it's closed. | today??"]], stick: [[1.8, 1.3, 'NEW POLL INCOMING', GOLD]] },
      { dur: 3.2, msgs: [[0.2, 'y', "stay there. I'm coming to you."], [1.8, 's', 'wait. you would do that?']], peekMood: 'heart' },
      { dur: 3.0, msgs: [[0.2, 'y', '20 min. without traffic.'], [1.5, 's', 'so 40. I\'ll wait']] },
      { dur: 3.2, msgs: [[0.2, 's', 'also for Jan 9'], [0.9, 's', 'I already picked'], [1.9, 's', 'the beta party. no poll.']] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { feeder(x, t, false); if (lt > 0.3) sparkles(x, t, 540, 800, t - lt + 0.3, 12, 320, 3) }, cast: { libra: [[0, 230, 1200, 200]], taurus: [[0, 1250, 1200, 200], [1.0, 860, 1200, 200]] }, mood: { libra: 'heart', taurus: 'happy' }, hand: false,
        lines: [[1.1, 1.8, 'libra', 'you came | to me.']], stick: [[0.2, 1.0, 'MEET IN THE MIDDLE', MINT]] },
    ],
  })
})()

// ── hst195 · Sagittarius wants you at the beach in an hour
W08T.hst195 = (() => {
  const bg = (x, t) => beach(x, t)
  return textsEp({
    sign: 'sagittarius', hook: 'Sagittarius wants | you at the beach', bg, scheme: { me: '#ffd36b' }, endLine: 'Spontaneous. And there. Jan 9.', endStars: ['sagittarius', 'aries', 'gemini', 'aquarius'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', 'GALVESTON'], [0.05, 's', 'today. who is in'], [1.6, 'y', "it's a work day??"]] },
      { dur: 3.0, msgs: [[0.2, 's', 'the water is brown'], [1.2, 's', 'the vibes are clear']] },
      { dur: 3.2, kind: 'cut', set: bg, cast: { sagittarius: [[0, 540, 1300, 240]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.4, 1.0] }, msgs: [[0.3, 's', 'one hour drive. | already here.']], stick: [[1.8, 1.3, 'THE GULF · DAY TRIP', SKYB]] },
      { dur: 3.0, msgs: [[0.2, 's', PIC.beach], [1.6, 'y', 'I have work']] },
      { dur: 3.0, msgs: [[0.3, 's', 'bring your laptop'], [1.3, 's', 'the gulls are coworkers']], peekMood: 'wink' },
      { dur: 3.2, kind: 'cut', set: bg, front: (x, t, lt) => { const gx = lerp0(1200, 560, lt / 1.2), gy = 980; x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(gx - 30, gy); x.quadraticCurveTo(gx - 15, gy - 18, gx, gy); x.quadraticCurveTo(gx + 15, gy - 18, gx + 30, gy); x.stroke(); if (lt > 1.2) taco(x, gx, gy + 30, 0.6) },
        cast: { sagittarius: [[0, 540, 1300, 240]] }, mood: { sagittarius: lt => lt > 1.2 ? 'wide' : 'happy' }, msgs: [[1.4, 's', 'a gull took | my taco']] },
      { dur: 3.0, msgs: [[0.2, 's', "we're friends now"], [1.4, 'y', 'of course you are']] },
      { dur: 3.2, msgs: [[0.2, 'y', 'just be back by Jan 9'], [1.5, 's', 'the beta party?? I\'ll be early']], peekMood: 'heart' },
      { dur: 3.2, msgs: [[0.2, 'y', 'you? early?'], [1.3, 's', "spontaneous. not flaky."]], tags: [[1.6, 1.3, 'BIG DIFFERENCE', GOLD]] },
      { dur: 3.0, msgs: [[0.2, 's', 'ok last one'], [1.0, 's', 'come next time. I mean it.'], [2.2, 'y', 'deal']] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 800, t - lt + 0.3, 12, 320, 9) }, cast: { sagittarius: [[0, 540, 1300, 250]] }, mood: { sagittarius: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'sagittarius', 'adventure is fun. | showing up is love.']], stick: [[1.9, 1.2, 'BE THE ONE WHO SHOWS', MINT]] },
    ],
  })
})()
const lerp0 = (a, b, u) => a + (b - a) * Math.min(1, Math.max(0, u))

// ── hst196 · Capricorn already planned your Jan 9
W08T.hst196 = (() => {
  const bg = (x, t) => { arctic(x, t, { wall: '#dfe8d8', floor: '#7a8a7a' }); box(x, 100, 1180, 880, 40, '#6b4a2a', 6) }
  return textsEp({
    sign: 'capricorn', hook: 'Capricorn already | planned your Jan 9', bg, scheme: { me: '#ffd36b' }, endLine: 'Plan the ride. Not the night.', endStars: ['capricorn', 'virgo', 'scorpio', 'cancer'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', 'quick update on Jan 9'], [0.05, 's', 'I blocked it. all day.'], [1.5, 's', PIC.calendar]] },
      { dur: 3.0, msgs: [[0.3, 'y', "it's november"], [1.3, 's', 'exactly. we\'re late.']], peekMood: 'squint' },
      { dur: 3.2, kind: 'cut', set: bg, back: (x, t, lt) => { box(x, 620, 500, 340, 420, BONE, 6); for (let k = 0; k < 5; k++) { x.fillStyle = INK; x.fillRect(650, 560 + k * 70, 260, 12); if (lt > 0.4 + k * 0.4) { x.fillStyle = '#2fc79a'; x.fillRect(920, 548 + k * 70, 26, 26) } } }, cast: { capricorn: [[0, 330, 1080, 240]] }, mood: { capricorn: 'squint' }, msgs: [[0.2, 's', 'step 1: leave | 2 hours early']], stick: [[1.8, 1.3, 'HOUSTON IS AN HOUR FROM HOUSTON', GOLD]] },
      { dur: 3.2, msgs: [[0.2, 's', 'step 2: outfit chosen'], [1.2, 's', 'backup outfit for 80 degrees'], [2.4, 'y', 'of course']] },
      { dur: 3.2, msgs: [[0.2, 's', 'step 3: feeder road route'], [1.3, 's', 'in case 610 is 610']], tags: [[1.6, 1.3, 'ROUTE B · ROUTE C', MINT]] },
      { dur: 3.0, msgs: [[0.2, 'y', 'did you plan who to talk to'], [1.6, 's', '...']], peekMood: 'wide' },
      { dur: 3.2, kind: 'cut', set: bg, cast: { capricorn: [[0, 540, 1080, 260]] }, mood: { capricorn: 'wide' }, hand: false, lines: [[0.2, 2.6, 'capricorn', 'I did not | plan that part.']], stick: [[1.0, 1.6, 'UNPLANNED ITEM DETECTED', BRAKE]] },
      { dur: 3.2, msgs: [[0.2, 'y', "that's the fun part"], [1.5, 's', 'that sounds unsettling']] },
      { dur: 3.2, msgs: [[0.2, 'y', 'just say hi to one new person'], [1.8, 's', 'one. I can schedule one.']], peekMood: 'happy' },
      { dur: 3.0, msgs: [[0.2, 's', 'adding it'], [1.0, 's', 'step 4: be open']], peekMood: 'heart', tags: [[1.4, 1.4, 'STEP 4: BE OPEN', PINK]] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 800, t - lt + 0.3, 12, 320, 10) }, cast: { capricorn: [[0, 540, 1080, 260]] }, mood: { capricorn: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'capricorn', 'plan the ride. | leave room for magic.']], stick: [[1.9, 1.2, 'ALSO: LEAVE EARLY', GOLD]] },
    ],
  })
})()

// ── hst197 · Aquarius texts you from underground (the downtown tunnels)
W08T.hst197 = (() => {
  const bg = (x, t) => tunnel(x, t)
  const night = (x, t) => { grad(x, '#2a1a5a', '#ff8a5a', 0, 1300); skyline(x, 1300, t); x.fillStyle = '#1a1438'; x.fillRect(0, 1300, 1080, 620); x.fillStyle = 'rgba(255,170,120,0.25)'; x.fillRect(0, 900, 1080, 400) }
  return textsEp({
    sign: 'aquarius', hook: 'Aquarius texted you | from underground', bg, scheme: { me: '#c9a6ff', status: 'location: under downtown' }, endLine: 'Be you. See you Jan 9.', endStars: ['aquarius', 'gemini', 'libra', 'sagittarius'],
    beats: [
      { dur: 3.0, msgs: [[-0.8, 's', 'I found a secret city'], [0.05, 's', 'under downtown'], [1.6, 's', PIC.tunnel]] },
      { dur: 3.0, msgs: [[0.3, 'y', 'the tunnels?'], [1.3, 's', "they're AIR CONDITIONED"]], peekMood: 'wide' },
      { dur: 3.2, kind: 'cut', set: bg, cast: { aquarius: [[0, 540, 1300, 220]] }, mood: { aquarius: 'sparkle' }, msgs: [[0.2, 's', 'I live here | now']], stick: [[1.6, 1.3, 'DOWNTOWN TUNNELS · 72°', SKYB]] },
      { dur: 3.0, msgs: [[0.2, 's', 'update: they close on weekends'], [1.6, 's', 'evicted from my own myth']] },
      { dur: 3.2, kind: 'cut', set: night, cast: { aquarius: [[0, 540, 1220, 230]] }, mood: { aquarius: 'squint' }, look: { aquarius: [0, -1] }, msgs: [[0.2, 's', 'why can\'t you see | stars in Houston']] },
      { dur: 3.2, msgs: [[0.2, 'y', 'city glow. all the lights.'], [1.6, 's', 'that\'s actually real']], tags: [[1.8, 1.2, '✓ REAL ASTRONOMY', MINT]] },
      { dur: 3.0, msgs: [[0.2, 's', 'so'], [0.8, 's', "I'm bringing my own stars"], [2.1, 'y', 'to what?']] },
      { dur: 3.2, msgs: [[0.2, 's', 'Jan 9. the beta party.'], [1.5, 's', 'I am the stars']], peekMood: 'heart' },
      { dur: 3.0, msgs: [[0.2, 'y', "you're so weird"], [1.4, 's', 'thank you']], tags: [[1.6, 1.2, 'AQUARIUS: FLATTERED', LAV]] },
      { dur: 3.2, msgs: [[0.2, 's', 'you are too btw'], [1.3, 's', 'that\'s why I texted you']], peekMood: 'heart' },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { night(x, t); for (let k = 0; k < 14; k++) { const a = clamp((lt - k * 0.1) / 0.3); x.globalAlpha = a; x.fillStyle = GOLD; x.fillRect((k * 151) % 1000 + 40, 200 + (k * 97) % 600, 12, 12); x.globalAlpha = 1 } }, cast: { aquarius: [[0, 540, 1220, 250]] }, mood: { aquarius: 'heart' }, hand: false,
        lines: [[0.2, 1.6, 'aquarius', 'be weird. the | right ones stay.']], stick: [[1.9, 1.2, 'BRING YOUR OWN STARS', GOLD]] },
    ],
  })
})()

// ── hst198 · the 12 signs added you to a group chat
W08T.hst198 = (() => {
  const bg = (x, t) => { grad(x, '#3a1d6a', '#ff7a9a', 0, 1920); dots(x, t, 'rgba(255,255,255,0.08)', 50) }
  const row = (x, t, lt, ids, mood = 'happy', y = 1200) => ids.forEach((id, i) => signChar(x, t, id, 140 + i * (800 / Math.max(1, ids.length - 1)), y + (i % 2) * 60, ids.length > 4 ? 160 : 210, { mood, pop: pop01(t, t - lt + i * 0.08, 0.3, 1.8), seed: 10 + i, hops: [t - lt + 0.3 + i * 0.1], tears: id === 'pisces' ? 2 : 0 }))
  return textsEp({
    sign: 'leo', name: 'JAN 9 GROUP CHAT', hook: 'The 12 signs added | you to a group chat', bg, peek: [130, 1450, 190],
    scheme: { col: GOLD, glyph: '12', status: 'Aries, Taurus, Gemini, +9', me: '#8fe3ff' }, endLine: "See y'all Jan 9.", endStars: ['leo', 'pisces', 'virgo', 'aries'],
    beats: [
      { dur: 3.0, msgs: [[-0.7, 'leo', 'added you'], [0.05, 'leo', 'WHAT ARE WE WEARING JAN 9'], [1.5, 'capricorn', "it'll be 80. or 50. pack both."]] },
      { dur: 3.0, msgs: [[0.2, 'gemini', "who's driving"], [1.3, 'taurus', "not me I'm on the 59"]] },
      { dur: 3.0, msgs: [[0.2, 'cancer', "I'm bringing snacks for everyone"], [1.5, 'virgo', 'I made a list. it\'s pinned.']] },
      { dur: 3.0, kind: 'cut', set: bg, front: (x, t, lt) => row(x, t, lt, ['cancer', 'virgo', 'capricorn', 'taurus'], 'sparkle'), cast: {}, hand: false, stick: [[0.3, 1.4, 'THE PLANNERS', MINT], [1.6, 1.3, 'ALREADY 3 SPREADSHEETS', GOLD]] },
      { dur: 3.0, msgs: [[0.2, 'aries', "I'm already there"], [1.3, 'y', "it's november"], [2.2, 'aries', 'and?']] },
      { dur: 3.2, msgs: [[0.2, 'sagittarius', 'my cousin in Katy wants to come'], [1.6, 'libra', 'is Katy far?'], [2.4, 'scorpio', 'Katy is long distance.']] },
      { dur: 3.0, kind: 'cut', set: bg, front: (x, t, lt) => row(x, t, lt, ['aries', 'sagittarius', 'libra', 'scorpio'], 'wide'), cast: {}, hand: false, stick: [[0.3, 1.4, 'THE KATY DEBATE', BRAKE], [1.6, 1.3, '47 REPLIES', GOLD]] },
      { dur: 3.0, msgs: [[0.2, 'aquarius', "I'll bring my own stars"], [1.4, 'gemini', 'I\'ll bring both of me']] },
      { dur: 3.0, msgs: [[0.2, 'leo', 'outfit poll in 5'], [1.3, 'virgo', 'please no']] },
      { dur: 3.2, msgs: [[0.2, 'pisces', 'I just love you all'], [1.3, 'pisces', "I'm crying in a good way"], [2.4, 'cancer', 'did you eat']] },
      { dur: 3.0, msgs: [[0.2, 'scorpio', 'and you?'], [1.2, 'y', "I'm in. see y'all Jan 9"]], tags: [[1.6, 1.3, 'YOU: OFFICIALLY IN', PINK]] },
      { dur: 3.2, kind: 'cut', set: (x, t, lt) => { bg(x, t); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 14, 380, 11) }, front: (x, t, lt) => { row(x, t, lt, ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo'], 'heart', 1000); row(x, t, lt, ['libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'], 'heart', 1260) }, cast: {}, hand: false,
        stick: [[0.2, 1.4, 'GROUP CHAT: 13 MEMBERS', GOLD], [1.7, 1.4, 'ONE OF THEM IS YOU', PINK]] },
    ],
  })
})()
