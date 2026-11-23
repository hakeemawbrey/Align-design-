// Houston Star Talk · w08 · "Your Houston love forecast" (hst199–hst210): a weather-segment parody per sign.
// Grammar: studio map with the three loops, station bug + temperature bug, a 5-panel outlook (never weekdays), radar,
// an alert crawl, a field reporter on location, then "YOUR forecast" straight to camera. Props: ./w08.js
import { clamp, prog, ease } from '../../src/lib.js'
import { wxStudio, wxMap, wxIcon, outlook, alertBand, clicker, mic, lowerBar, stationBug, heartPix, Kp, BADGE, STING, grad, dots, bayou, beach, park, porch, neonStreet, arctic, traffic, disc, batBridge,
  box, txt, label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, SKYB, MINT, LAV, FLOOR, outside,
  skyline, car, freeway, heatSun, sweat, partyCard, taco, shield, streetSign, houses, mural, coffeeShop, BRAKE, HGREEN, kolache, klobasnek, puffer, soupPot } from './w08.js'

export const W08W = {}
const A = { heights: [-70, -70, 'HEIGHTS'], montrose: [-60, 10, 'MONTROSE'], katy: [-340, -10, 'KATY'], clear: [240, 170, 'CLEAR LAKE'], woodlands: [10, -205, 'WOODLANDS'],
  sugar: [-250, 150, 'SUGAR LAND'], pearland: [70, 190, 'PEARLAND'], bellaire: [-170, 70, 'BELLAIRE'], eado: [70, 10, 'EaDo'], midtown: [0, 60, 'MIDTOWN'], cypress: [-250, -150, 'CYPRESS'], memorial: [-180, -30, 'MEMORIAL'] }
const ar = (...k) => k.map(n => A[n])

/** forecast episode builder. W = { sign, anchor, pal, temp, station, hook, segs: [...], endLine, endStars } */
function wxEp(W) {
  const pal = W.pal || {}
  const st = (x, t, over = {}) => wxStudio(x, t, { wall: pal.wall, screen: pal.screen, station: W.station || 'STAR WEATHER', tag: over.tag || W.tag || 'HOUSTON LOVE FORECAST', temp: over.temp ?? W.temp, draw: over.draw })
  const AN = W.anchor, AX = 830, AY = 1150
  const scenes = W.segs.map(sg0 => {
    const sg = { ...sg0, dur: Math.round(sg0.dur * 1.12 * 10) / 10 }
    const cast = { [AN]: [[0, AX, AY, 230]], ...(sg.cast || {}) }
    if (sg.k === 'map') return { dur: sg.dur, cast, mood: sg.mood, hops: sg.hops, lines: sg.lines, stick: sg.stick, look: { [AN]: [-1, -0.2] },
      set: (x, t, lt) => st(x, t, { temp: sg.temp, tag: sg.tag, draw: (cx, cy) => { wxMap(x, cx - 60, cy, t, { areas: sg.areas || [], icons: (sg.icons || []).filter(i => lt >= (i[5] || 0)), front: sg.front ? [sg.front[0] + sg.front[1] * lt, sg.front[2]] : null, sweep: sg.sweep }); sg.draw?.(x, t, lt, cx, cy) } }),
      front: (x, t, lt, P) => { clicker(x, P, AN, t); sg.front2?.(x, t, lt, P) } }
    if (sg.k === 'board') return { dur: sg.dur, cast, mood: sg.mood, lines: sg.lines, look: { [AN]: [-1, 0] },
      set: (x, t, lt) => st(x, t, { temp: sg.temp, tag: sg.tag || 'THE OUTLOOK' }), back: (x, t, lt) => outlook(x, t, lt, sg.cards, { y: 870 }),
      front: (x, t, lt, P) => clicker(x, P, AN, t), stick: sg.stick }
    if (sg.k === 'alert') return { dur: sg.dur, cast, mood: sg.mood, lines: sg.lines, look: { [AN]: [-1, -0.2] },
      set: (x, t, lt) => st(x, t, { temp: sg.temp, tag: sg.tag, draw: (cx, cy) => { x.fillStyle = `rgba(255,58,78,${(0.25 + 0.15 * Math.sin(t * 6)).toFixed(2)})`; x.fillRect(cx - 480, cy - 350, 960, 700); wxMap(x, cx - 60, cy, t, { areas: sg.areas || [], icons: sg.icons || [] }) } }),
      front: (x, t, lt, P) => { clicker(x, P, AN, t); alertBand(x, t, sg.head, sg.crawl, { y: 1400 }) } }
    if (sg.k === 'field') return { dur: sg.dur, cast: sg.cast, mood: sg.mood, hops: sg.hops, lines: sg.lines, look: sg.look, set: sg.set,
      front: (x, t, lt, P) => { sg.front?.(x, t, lt, P); if (sg.rep) mic(x, P, sg.rep); x.fillStyle = BRAKE; box(x, 80, 260, 150, 64, BRAKE, 5); txt(x, '● LIVE', 155, 293, { size: 32, col: BONE, font: MONO, weight: 700 }); lowerBar(x, sg.head, sg.sub, clamp(lt / 0.3), { y: 1550 }) }, stick: sg.stick }
    if (sg.k === 'you') return { dur: sg.dur, cast: { [W.sign]: [[0, 540, 1080, 330]], ...(sg.cast || {}) }, mood: sg.mood || { [W.sign]: 'sparkle' }, hops: sg.hops, lines: sg.lines,
      set: (x, t, lt) => { grad(x, pal.you?.[0] || '#2a1d6a', pal.you?.[1] || '#ff8a7a'); dots(x, t); stationBug(x, t, 'YOUR FORECAST', (W.signName || W.sign).toUpperCase(), sg.temp ?? null) },
      back: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k > 0) { x.save(); x.translate(540, 560); x.scale(k, k); box(x, -400, -80, 800, 160, '#0e1a3a', 6); x.fillStyle = GOLD; x.fillRect(-400, -80, 800, 12); const ti = sg.title || 'YOUR FORECAST'; txt(x, ti, 0, 10, { size: Math.min(64, Math.floor(740 / (0.62 * ti.length))), col: BONE }); x.restore() } if (lt > 0.3) sparkles(x, t, 540, 1000, t - lt + 0.3, 10, 360, 4) },
      front: sg.front, stick: sg.stick }
    return sg
  })
  return { hook: W.hook, badge: BADGE, cues: [...STING, ...(W.cues || [])], endLen: 6.2, scenes,
    end: (x, t, lt) => partyCard(x, t, lt, { line: W.endLine, stars: W.endStars }) }
}

// ── hst199 · Aries: passion advisory (heat)
W08W.hst199 = wxEp({
  sign: 'aries', anchor: 'capricorn', hook: 'Aries: your forecast | is dangerously hot', temp: '104°', pal: { wall: '#4a1a1a', screen: '#5a2a1a', you: ['#ff5a3a', '#ffd36b'] },
  endLine: 'Hydrate. Then Jan 9.', endStars: ['aries', 'leo', 'sagittarius', 'capricorn'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('heights', 'montrose', 'katy', 'eado'), icons: [[-60, -40, 'sun', 1.4], [-330, -60, 'sweat', 0.7], [80, 60, 'sun', 0.8]], hops: { capricorn: [0.05] }, lines: [[0.4, 2.6, 'capricorn', 'Aries. yes, you. | sit down.']] },
    { k: 'map', dur: 3.2, temp: '104°', areas: ar('montrose', 'midtown'), icons: [[-50, 0, 'heart', 1.4], [100, -120, 'sun', 0.9]], lines: [[0.2, 2.8, 'capricorn', 'a heat dome of | feelings over Montrose']], stick: [[1.6, 1.4, 'FEELS LIKE: 104 (EMOTIONALLY)', BRAKE]] },
    { k: 'field', dur: 3.2, set: (x, t) => { mural(x, t); x.fillStyle = '#5a3a3a'; x.fillRect(0, 1320, 1080, 600); heatSun(x, 880, 300, t, 70) }, cast: { aries: [[0, 540, 1200, 260]] }, rep: 'aries', mood: { aries: 'sparkle' }, hops: { aries: [0.3, 0.7, 1.1] },
      head: 'LIVE: WESTHEIMER', sub: 'ARIES ON A DATE · MINUTE 4', lines: [[0.4, 2.5, 'aries', 'I said I love | the vibe. too soon?']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'sun', '104°', 'TEXTS | 40 TIMES'], ['TONIGHT', 'heart', '99°', 'PLANS | 3 DATES'], ['WEEKEND', 'sweat', '101°', 'BURNOUT | LIKELY'], ['NEXT WK', 'cloud', '85°', 'A NAP'], ['JAN 9', 'stars', '80°', 'PERFECT']],
      lines: [[1.6, 1.8, 'capricorn', 'see that burnout | on the weekend?']] },
    { k: 'alert', dur: 3.2, head: 'PASSION ADVISORY', crawl: 'ARIES ADVISED TO DRINK WATER  ·  SLOW DOWN  ·  ASK ONE QUESTION AT A TIME  ·  ', areas: ar('heights', 'eado'), icons: [[0, 0, 'sun', 1.6]], mood: { capricorn: 'wide' }, lines: [[0.3, 2.6, 'capricorn', 'in effect until | further notice.']] },
    { k: 'field', dur: 3.0, set: (x, t) => park(x, t), cast: { aries: [[0, -120, 1150, 220], [1.0, 540, 1150, 220]], leo: [[0, 820, 1150, 200]] }, mood: { aries: 'happy', leo: 'heart' }, head: 'LIVE: HERMANN PARK', sub: 'A SLOWER DATE · 2 MILES PER HOUR', lines: [[1.2, 1.7, 'leo', 'you walked?? | at my speed?']] },
    { k: 'map', dur: 3.0, areas: ar('montrose', 'heights'), icons: [[-50, -20, 'cloud', 1], [60, 60, 'rainbow', 0.9]], mood: { capricorn: 'happy' }, lines: [[0.2, 2.6, 'capricorn', 'cooling trend. | sweet, steady warmth.']] },
    { k: 'you', dur: 3.4, temp: '80°', title: 'YOUR FORECAST: ARIES', lines: [[0.4, 2.7, 'aries', 'go fast at the | party. slow with people.']], stick: [[0.1, 0.8, 'WARM, NOT SCORCHING', MINT]] },
    { k: 'you', dur: 3.2, temp: '80°', title: 'JAN 9 · PERFECT', mood: { aries: 'heart' }, hops: { aries: [0.3, 0.7] }, lines: [[0.3, 2.5, 'aries', "see you there. | I'll be early."]] },
  ],
})

// ── hst200 · Taurus: a high-pressure system parked over your heart (Sugar Land)
W08W.hst200 = wxEp({
  sign: 'taurus', anchor: 'virgo', hook: 'Taurus, a high is | parked on your heart', temp: '78°', pal: { wall: '#1a3a2a', screen: '#1a4a3a', you: ['#4a8a4a', '#f2d08a'] },
  endLine: 'Let a little weather in. Jan 9.', endStars: ['taurus', 'virgo', 'cancer', 'libra'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('sugar', 'katy', 'pearland'), icons: [[-250, 90, 'heart', 1.1], [100, -100, 'sun', 0.7]], hops: { virgo: [0.05] }, draw: (x, t, lt, cx, cy) => txt(x, 'H', cx - 310, cy + 70, { size: 120, col: '#5ec8ff' }), lines: [[0.4, 2.6, 'virgo', 'Taurus, this | one is for you.']] },
    { k: 'map', dur: 3.2, areas: ar('sugar'), icons: [[-250, 90, 'heart', 1.4]], draw: (x, t, lt, cx, cy) => txt(x, 'H', cx - 310 + Math.sin(t * 8) * 3, cy + 70, { size: 140, col: '#5ec8ff' }), lines: [[0.2, 2.8, 'virgo', 'parked over Sugar | Land. not moving.']], stick: [[1.7, 1.3, 'STATIONARY SINCE 2021', GOLD]] },
    { k: 'field', dur: 3.2, set: (x, t) => { houses(x, 1300, t); grad(x, '#bfe6ff', '#f6e6c4', 0, 1060); houses(x, 1300, t); x.fillStyle = '#5aa05a'; x.fillRect(0, 1300, 1080, 620) }, cast: { taurus: [[0, 540, 1200, 260]] }, rep: 'taurus', mood: { taurus: 'happy' },
      head: 'LIVE: SUGAR LAND', sub: 'SAME BRUNCH SPOT · VISIT 212', lines: [[0.3, 2.6, 'taurus', 'why try new | when I love this one?']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'sun', '78°', 'SAME | BRUNCH'], ['TONIGHT', 'cloud', '76°', 'SAME | SHOW'], ['WEEKEND', 'sun', '78°', 'SAME | ROUTE'], ['NEXT WK', 'sun', '78°', 'SAME'], ['JAN 9', 'rainbow', '80°', 'NEW?']],
      lines: [[1.6, 1.8, 'virgo', 'notice anything | on Jan 9?']] },
    { k: 'map', dur: 3.2, areas: ar('sugar', 'bellaire'), icons: [[-170, 20, 'wind', 1], [-250, 90, 'heart', 1]], front: [-420, 120, '#5ec8ff'], lines: [[0.3, 2.6, 'virgo', 'a gentle front | of NEW coming in']] },
    { k: 'field', dur: 3.2, set: (x, t) => neonStreet(x, t, ['HOT POT', 'BOBA', 'PHO', 'CHAAT']), cast: { taurus: [[0, 380, 1210, 230]], scorpio: [[0, 760, 1210, 200]] }, mood: { taurus: 'wide', scorpio: 'happy' }, rep: 'taurus', head: 'LIVE: BELLAIRE BLVD', sub: 'TAURUS TRIES SOMETHING NEW', lines: [[0.3, 1.4, 'scorpio', 'hot pot?'], [1.8, 1.3, 'taurus', '...where has | this BEEN']] },
    { k: 'you', dur: 3.4, temp: '80°', title: 'YOUR FORECAST: TAURUS', lines: [[0.4, 2.7, 'taurus', 'keep the comfy. | add one new thing.']], stick: [[0.1, 0.8, 'HIGH PRESSURE EASING', MINT]] },
    { k: 'you', dur: 3.0, temp: '80°', title: 'NEW THING: JAN 9', mood: { taurus: 'heart' }, hops: { taurus: [0.3] }, lines: [[0.3, 2.4, 'taurus', 'a party with | new people. I\'m in.']] },
  ],
})

// ── hst201 · Gemini: scattered texts
W08W.hst201 = wxEp({
  sign: 'gemini', anchor: 'libra', hook: 'Gemini: scattered | texts all week', temp: '72°', pal: { wall: '#2a2a5a', screen: '#26306a', you: ['#ffd36b', '#8fe3ff'] },
  endLine: 'One clear text. Jan 9.', endStars: ['gemini', 'libra', 'aquarius', 'sagittarius'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('eado', 'heights', 'midtown'), icons: [[60, -40, 'cloud', 0.8], [-80, -110, 'cloud', 0.7]], draw: (x, t, lt, cx, cy) => { for (let k = 0; k < 14; k++) { const p = (lt * 0.8 + k / 14) % 1; box(x, cx - 380 + (k * 113) % 700, cy - 280 + p * 520, 60, 34, '#f2cf4a', 3) } }, hops: { libra: [0.05] }, lines: [[0.4, 2.6, 'libra', 'Gemini. you. | look at this.']] },
    { k: 'map', dur: 3.2, areas: ar('eado', 'heights'), draw: (x, t, lt, cx, cy) => { for (let k = 0; k < 26; k++) { const p = (lt * 1.2 + k / 26) % 1; box(x, cx - 400 + (k * 89) % 760, cy - 300 + p * 560, 54, 30, k % 2 ? '#f2cf4a' : '#8fe3ff', 3) } }, lines: [[0.2, 2.8, 'libra', 'scattered texts. | 80% coverage.']], stick: [[1.6, 1.4, 'TEXTS PER HOUR: A LOT', GOLD]] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#ffb07a', '#8a4a9a', 0, 1300); skyline(x, 1300, t); x.fillStyle = '#4a4a5a'; x.fillRect(0, 1300, 1080, 620) }, cast: { gemini: [[0, 540, 1200, 260]] }, rep: 'gemini', mood: { gemini: 'sparkle' }, hops: { gemini: [0.2, 0.5, 0.8, 1.1] },
      head: 'LIVE: EaDo', sub: 'OR IS IT THE EAST END', lines: [[0.3, 1.2, 'gemini', 'hi!!'], [1.6, 1.5, 'gemini', "wait I'm also | in the Heights"]] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'wind', '72°', '30 TEXTS'], ['TONIGHT', 'storm', '70°', 'MIXED | SIGNALS'], ['WEEKEND', 'cloud', '74°', '3 PLANS | AT ONCE'], ['NEXT WK', 'wind', '72°', 'NEW | HOBBY'], ['JAN 9', 'stars', '80°', 'ONE PLAN']], lines: [[1.6, 1.8, 'libra', 'mixed signals | tonight. hm.']] },
    { k: 'alert', dur: 3.2, head: 'MIXED SIGNAL WATCH', crawl: 'A "LOL" MAY NOT MEAN LOL  ·  "WE SHOULD HANG" IS NOT A PLAN  ·  SAY A DAY AND A PLACE  ·  ', areas: ar('heights', 'montrose'), icons: [[0, 0, 'storm', 1.2]], mood: { libra: 'wide' }, lines: [[0.3, 2.6, 'libra', '"we should hang" | is not a plan.']] },
    { k: 'map', dur: 3.0, areas: ar('montrose'), icons: [[-60, 0, 'sun', 1.1], [60, -100, 'rainbow', 0.7]], mood: { libra: 'happy' }, lines: [[0.2, 2.6, 'libra', 'clearing when you | send ONE clear text.']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: GEMINI', lines: [[0.4, 2.7, 'gemini', '"want to go Jan 9 | with me?" sent.']], stick: [[0.1, 0.8, 'ONE TEXT. CLEAR.', MINT]] },
    { k: 'you', dur: 3.0, title: 'CLEAR SKIES · JAN 9', cast: { libra: [[0, 860, 1180, 200]] }, mood: { gemini: 'heart', libra: 'heart' }, hops: { gemini: [0.3] }, lines: [[0.4, 2.2, 'libra', 'yes. see? easy.']] },
  ],
})

// ── hst202 · Cancer: humidity 100%, feelings 100%
W08W.hst202 = wxEp({
  sign: 'cancer', anchor: 'taurus', hook: 'Cancer: humidity | and feelings at 100%', temp: '88°', pal: { wall: '#123a4a', screen: '#14506a', you: ['#3fb6f0', '#c9f0ff'] },
  endLine: 'Bring a sweater. Jan 9.', endStars: ['cancer', 'pisces', 'taurus', 'virgo'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('heights', 'pearland', 'clear'), icons: [[0, -40, 'fog', 1.1], [200, 120, 'cloud', 0.7]], draw: (x, t, lt, cx, cy) => { x.fillStyle = 'rgba(143,227,255,0.18)'; x.fillRect(cx - 480, cy - 350, 960, 700) }, hops: { taurus: [0.05] }, lines: [[0.4, 2.6, 'taurus', 'Cancer. you. | this is about you.']] },
    { k: 'map', dur: 3.2, temp: '88°', areas: ar('heights'), icons: [[-70, -110, 'heart', 1.3]], draw: (x, t, lt, cx, cy) => { txt(x, 'HUMIDITY 100%', cx, cy + 260, { size: 44, col: SKYB, font: MONO, weight: 700 }) }, lines: [[0.2, 2.8, 'taurus', "it's not the heat. | it's the feelings."]], stick: [[1.7, 1.3, 'FEELINGS: ALSO 100%', SKYB]] },
    { k: 'field', dur: 3.2, set: (x, t) => porch(x, t), cast: { cancer: [[0, 540, 1180, 260]] }, rep: 'cancer', mood: { cancer: 'heart' }, head: 'LIVE: THE HEIGHTS', sub: 'A PORCH · A FERN · A HOST', lines: [[0.3, 2.6, 'cancer', 'I made soup | for the whole street']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'fog', '88°', 'CRIES AT | A COMMERCIAL'], ['TONIGHT', 'hearts', '84°', 'HOSTS | DINNER'], ['INDOORS', 'cold', '61°', 'ARCTIC AC | BRING A | SWEATER'], ['NEXT WK', 'hearts', '86°', 'CHECKS | ON YOU'], ['JAN 9', 'stars', '80°', 'GOES OUT']], lines: [[1.8, 1.6, 'taurus', 'indoors: arctic. | as always.']] },
    { k: 'field', dur: 3.2, set: (x, t) => arctic(x, t), front: (x, t, lt, P) => puffer(x, P, 'cancer', '#5ec8ff'), cast: { cancer: [[0, 540, 1220, 240]] }, rep: 'cancer', mood: { cancer: 'squint' }, head: 'LIVE: A MUSEUM (FREE THURSDAY)', sub: 'INDOOR TEMP: ARCTIC', lines: [[0.3, 2.6, 'cancer', 'I packed a | sweater for you']] },
    { k: 'map', dur: 3.0, areas: ar('heights', 'midtown'), icons: [[0, 0, 'rainbow', 1.1]], mood: { taurus: 'happy' }, lines: [[0.2, 2.6, 'taurus', 'outlook: let people | take care of YOU.']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: CANCER', lines: [[0.4, 2.7, 'cancer', 'I host everyone. | this time I\'m a guest.']], stick: [[0.1, 0.8, 'GUEST MODE: ON', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · YOU\'RE INVITED', mood: { cancer: 'heart' }, hops: { cancer: [0.3] }, lines: [[0.3, 2.4, 'cancer', '...I\'m still | bringing snacks.']] },
  ],
})

// ── hst203 · Leo: sunny. Obviously.
W08W.hst203 = wxEp({
  sign: 'leo', anchor: 'gemini', hook: 'Leo, your forecast: | sunny. Obviously.', temp: '92°', pal: { wall: '#5a3a1a', screen: '#6a4a1a', you: ['#ff9a3c', '#ffe28a'] },
  endLine: 'Shine with them. Jan 9.', endStars: ['leo', 'aries', 'gemini', 'libra'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('montrose', 'heights', 'midtown'), icons: [[-60, -20, 'sun', 1.8]], hops: { gemini: [0.05] }, lines: [[0.4, 2.6, 'gemini', 'Leo. hi. it\'s | about you. again.']] },
    { k: 'map', dur: 3.2, areas: ar('montrose', 'katy', 'clear', 'woodlands'), icons: [[-60, -20, 'sun', 1.2], [-340, -50, 'sun', 0.8], [240, 130, 'sun', 0.8], [10, -240, 'sun', 0.7]], lines: [[0.2, 2.8, 'gemini', 'sunny everywhere | Leo walks in']], stick: [[1.7, 1.3, 'UV INDEX OF CHARM: 11', GOLD]] },
    { k: 'field', dur: 3.2, set: (x, t) => { mural(x, t); x.fillStyle = '#5a3a3a'; x.fillRect(0, 1320, 1080, 600) }, cast: { leo: [[0, 540, 1200, 270]] }, rep: 'leo', mood: { leo: 'sparkle' }, hops: { leo: [0.4, 1.4] }, head: 'LIVE: A MONTROSE MURAL', sub: 'LEO · PHOTO 61 OF 61', lines: [[0.3, 2.6, 'leo', 'one more. | my good side.']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'sun', '92°', 'MAIN | CHARACTER'], ['TONIGHT', 'stars', '88°', 'STILL | SHINING'], ['WEEKEND', 'sun', '94°', 'BRUNCH | OUTFIT'], ['NEXT WK', 'sun', '93°', 'SUNNY'], ['JAN 9', 'stars', '80°', 'SHARES | THE SUN']], lines: [[1.6, 1.8, 'gemini', 'Jan 9 looks... | generous?']] },
    { k: 'field', dur: 3.4, set: (x, t) => { grad(x, '#ffb07a', '#8a4a9a', 0, 1300); skyline(x, 1300, t); x.fillStyle = '#3a2a4a'; x.fillRect(0, 1300, 1080, 620) }, cast: { leo: [[0, 380, 1200, 240]], virgo: [[0, 760, 1200, 200]] }, mood: { leo: 'heart', virgo: 'wide' }, rep: 'leo', head: 'LIVE: MIDTOWN', sub: 'LEO HYPES A FRIEND', lines: [[0.3, 1.6, 'leo', 'everyone look | at Virgo\'s fit!'], [2.0, 1.2, 'virgo', 'oh! thanks!']] },
    { k: 'map', dur: 3.0, areas: ar('midtown'), icons: [[-60, -20, 'sun', 1.1], [80, -20, 'sun', 1.1]], mood: { gemini: 'happy' }, lines: [[0.2, 2.6, 'gemini', 'a second sun | appeared. it\'s Virgo.']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: LEO', lines: [[0.4, 2.7, 'leo', 'shine on others. | it gets brighter.']], stick: [[0.1, 0.8, 'SPOTLIGHT: SHARED', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · SUNNY', mood: { leo: 'heart' }, hops: { leo: [0.3, 0.6] }, lines: [[0.3, 2.4, 'leo', "I'll hype you up | at the party."]] },
  ],
})

// ── hst204 · Virgo: a cold front (the one 55° day) — plan accordingly
W08W.hst204 = wxEp({
  sign: 'virgo', anchor: 'aquarius', hook: 'Virgo, a cold front | is coming. Plan.', temp: '55°', pal: { wall: '#1a2a4a', screen: '#1a3a6a', you: ['#8fd3ff', '#f4efe4'] },
  endLine: 'Pack both. Jan 9.', endStars: ['virgo', 'capricorn', 'leo', 'cancer'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('cypress', 'woodlands', 'heights'), front: [-480, 40, '#5ec8ff'], icons: [[-200, -140, 'cold', 0.9]], hops: { aquarius: [0.05] }, lines: [[0.4, 2.6, 'aquarius', 'Virgo. a cold | front. for you.']] },
    { k: 'map', dur: 3.2, temp: '55°', areas: ar('heights', 'midtown', 'pearland'), front: [-280, 60, '#5ec8ff'], icons: [[0, -40, 'cold', 1.1]], lines: [[0.2, 2.8, 'aquarius', 'arrives 2:14 PM. | leaves by Thursday.']], stick: [[1.7, 1.3, 'HIGH: 55° · PUFFERS: OUT', SKYB]] },
    { k: 'field', dur: 3.4, set: (x, t) => { grad(x, '#bfe6ff', '#e8f4ff', 0, 1300); skyline(x, 1300, t, { lit: '#bfe6ff' }); x.fillStyle = '#4a5a7a'; x.fillRect(0, 1300, 1080, 620) }, front: (x, t, lt, P) => puffer(x, P, 'virgo', '#ef5c94'), cast: { virgo: [[0, 540, 1200, 260]] }, rep: 'virgo', mood: { virgo: 'squint' },
      head: 'LIVE: DOWNTOWN', sub: 'VIRGO · PREPARED SINCE TUESDAY', lines: [[0.3, 2.8, 'virgo', 'soup made. plants | tucked in. coat on.']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'cold', '55°', 'COAT DAY'], ['TONIGHT', 'cold', '52°', 'SOUP'], ['TOMORROW', 'cloud', '68°', 'LAYERS'], ['NEXT', 'sun', '81°', 'SHORTS | AGAIN'], ['JAN 9', 'stars', '??°', 'PACK | BOTH']], lines: [[1.6, 1.8, 'aquarius', '55 to 81. | classic Houston.']] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#bfe6ff', '#f6e6c4', 0, 1060); houses(x, 1300, t); x.fillStyle = '#5aa05a'; x.fillRect(0, 1300, 1080, 620) }, cast: { virgo: [[0, 400, 1200, 230]], gemini: [[0, 1250, 1200, 200], [1.2, 780, 1200, 200]] }, mood: { virgo: 'happy', gemini: 'wide' }, rep: 'virgo', head: 'LIVE: CYPRESS', sub: 'VIRGO SHARES THE EXTRA COAT', lines: [[1.3, 1.8, 'gemini', 'you brought | a coat for ME?']] },
    { k: 'map', dur: 3.0, areas: ar('heights'), icons: [[0, -20, 'sun', 1.1]], mood: { aquarius: 'happy' }, lines: [[0.2, 2.6, 'aquarius', 'planning for others: | warmest thing in town']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: VIRGO', lines: [[0.4, 2.7, 'virgo', 'plan the weather. | let the night surprise you.']], stick: [[0.1, 0.8, 'ROOM FOR FUN: 20%', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · PACK BOTH', mood: { virgo: 'heart' }, hops: { virgo: [0.3] }, lines: [[0.3, 2.4, 'virgo', 'coat AND shorts. | packed.']] },
  ],
})

// ── hst205 · Libra: 50% chance of deciding today (indecision fog over the Heights)
W08W.hst205 = wxEp({
  sign: 'libra', anchor: 'pisces', hook: 'Libra: 50% chance | of deciding today', temp: '75°', pal: { wall: '#3a2a5a', screen: '#4a3a7a', you: ['#e163d6', '#ffe0ef'] },
  endLine: 'Pick a side. Pick Jan 9.', endStars: ['libra', 'pisces', 'gemini', 'taurus'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('heights', 'montrose', 'katy'), icons: [[-70, -110, 'fog', 1.1], [-60, 0, 'fog', 0.9]], hops: { pisces: [0.05] }, lines: [[0.4, 2.6, 'pisces', 'Libra. this is | your forecast.']] },
    { k: 'map', dur: 3.2, areas: ar('heights', 'montrose'), icons: [[-70, -110, 'fog', 1.3]], draw: (x, t, lt, cx, cy) => txt(x, 'INSIDE THE LOOP?  OUTSIDE?', cx - 60, cy + 250, { size: 34, col: LAV, font: MONO, weight: 700 }), lines: [[0.2, 2.8, 'pisces', 'dense indecision | fog. visibility: low.']], stick: [[1.7, 1.3, 'CHANCE OF DECIDING: 50%', LAV]] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#ffd0a0', '#c86a9a', 0, 1200); coffeeShop(x, 560, 1300); x.fillStyle = '#4a4a5a'; x.fillRect(0, 1300, 1080, 620); for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(0, 700 + k * 120 + Math.sin(t + k) * 20, 1080, 50) } }, cast: { libra: [[0, 540, 1200, 260]] }, rep: 'libra', mood: { libra: 'squint' },
      head: 'LIVE: A FEEDER ROAD', sub: 'LIBRA · AT THE MENU 20 MIN', lines: [[0.3, 2.6, 'libra', 'oat milk? whole? | what would you get?']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'fog', '75°', 'PROS & | CONS'], ['TONIGHT', 'fog', '72°', 'POLLS | FRIENDS'], ['WEEKEND', 'cloud', '76°', 'BOTH | PARTIES'], ['NEXT WK', 'fog', '75°', 'STILL | DECIDING'], ['JAN 9', 'sun', '80°', 'DECIDED']], lines: [[1.6, 1.8, 'pisces', 'something clears | on Jan 9...']] },
    { k: 'alert', dur: 3.2, head: 'INDECISION ADVISORY', crawl: 'MENUS LONGER THAN 1 PAGE MAY CAUSE DELAYS  ·  "YOU PICK" BOUNCING ACROSS THE LOOP  ·  ', areas: ar('heights', 'midtown'), icons: [[0, 0, 'fog', 1.4]], mood: { pisces: 'wide' }, lines: [[0.3, 2.6, 'pisces', 'a "you pick" | loop. both ways.']] },
    { k: 'map', dur: 3.0, areas: ar('midtown'), icons: [[0, -20, 'sun', 1.1]], mood: { pisces: 'happy' }, lines: [[0.2, 2.6, 'pisces', 'fog lifts when | you say what you want']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: LIBRA', lines: [[0.4, 2.7, 'libra', 'my pick: the beta | party. no poll.']], stick: [[0.1, 0.8, 'DECISION MADE', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · CLEAR', cast: { pisces: [[0, 860, 1180, 200]] }, mood: { libra: 'heart', pisces: 'heart' }, hops: { libra: [0.3] }, lines: [[0.3, 2.4, 'pisces', "I'm so proud | of you"]] },
  ],
})

// ── hst206 · Scorpio: dense fog over your intentions
W08W.hst206 = wxEp({
  sign: 'scorpio', anchor: 'leo', hook: "Scorpio, there's fog | over your intentions", temp: '68°', pal: { wall: '#2a0f2a', screen: '#3a1a3a', you: ['#4a1a4a', '#e23d66'] },
  endLine: 'Be clear. See you Jan 9.', endStars: ['scorpio', 'cancer', 'pisces', 'leo'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('montrose', 'eado'), icons: [[0, -40, 'fog', 1.4]], draw: (x, t) => { x.fillStyle = 'rgba(200,190,220,0.25)'; x.fillRect(0, 0, 1080, 1920) }, hops: { leo: [0.05] }, lines: [[0.4, 2.6, 'leo', 'Scorpio. I see | you. barely.']] },
    { k: 'map', dur: 3.2, areas: ar('eado'), icons: [[60, -40, 'fog', 1.6]], lines: [[0.2, 2.8, 'leo', 'thick fog around | "what are we"']], stick: [[1.7, 1.3, 'VISIBILITY: 3 FEET', LAV]] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#3a2a5a', '#8a6a9a', 0, 1300); skyline(x, 1300, t, { alpha: 0.5 }); x.fillStyle = '#2a2240'; x.fillRect(0, 1300, 1080, 620); for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(239,230,214,0.2)'; x.fillRect(0, 600 + k * 130 + Math.sin(t + k) * 20, 1080, 60) } }, cast: { scorpio: [[0, 540, 1200, 260]] }, rep: 'scorpio', mood: { scorpio: 'squint' },
      head: 'LIVE: EaDo ROOFTOP', sub: 'SCORPIO · REPLIED "maybe"', lines: [[0.3, 2.6, 'scorpio', 'I like them. | I said "k".']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'fog', '68°', 'READS | YOUR TEXT'], ['TONIGHT', 'fog', '64°', 'REPLIES | "k"'], ['WEEKEND', 'storm', '66°', 'OVER- | THINKS'], ['NEXT WK', 'cloud', '70°', 'MAYBE'], ['JAN 9', 'sun', '80°', 'SAYS IT']], lines: [[1.6, 1.8, 'leo', '"k" is not | a forecast.']] },
    { k: 'field', dur: 3.2, set: (x, t) => beach(x, t, { sky: ['#b8c0d8', '#e0d8e8'] }), cast: { scorpio: [[0, 540, 1300, 240]] }, rep: 'scorpio', mood: { scorpio: 'wide' }, head: 'LIVE: GALVESTON', sub: 'SEA FOG ROLLING IN · EXCUSES TOO', lines: [[0.3, 2.6, 'scorpio', 'what if I say | it and it\'s weird']] },
    { k: 'map', dur: 3.0, areas: ar('montrose'), icons: [[-60, 0, 'sun', 1.2]], mood: { leo: 'happy' }, lines: [[0.2, 2.6, 'leo', 'fog burns off | by saying it plainly']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: SCORPIO', lines: [[0.4, 2.7, 'scorpio', '"I like you. | come with me Jan 9?"']], stick: [[0.1, 0.8, 'SENT', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · CLEAR', cast: { cancer: [[0, 860, 1180, 200]] }, mood: { scorpio: 'heart', cancer: 'heart' }, hops: { cancer: [0.4] }, lines: [[0.4, 2.3, 'cancer', 'YES. finally.']] },
  ],
})

// ── hst207 · Sagittarius: winds of change from the Gulf
W08W.hst207 = wxEp({
  sign: 'sagittarius', anchor: 'aries', hook: 'Sagittarius: gusts | from the Gulf', temp: '79°', pal: { wall: '#1a2a4a', screen: '#1a4a5a', you: ['#a35cf0', '#8fd3ff'] },
  endLine: 'Land somewhere. Jan 9.', endStars: ['sagittarius', 'aries', 'aquarius', 'gemini'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('clear', 'pearland', 'midtown'), icons: [[260, 220, 'wind', 1.1], [100, 100, 'wind', 0.9]], hops: { aries: [0.05] }, lines: [[0.4, 2.6, 'aries', 'Sagittarius! | YOUR winds!']] },
    { k: 'map', dur: 3.2, areas: ar('clear', 'katy', 'woodlands'), icons: [[240, 130, 'wind', 1], [-340, -50, 'wind', 0.9], [10, -240, 'wind', 0.8]], lines: [[0.2, 2.8, 'aries', 'gusts to Galveston, | Katy AND the Woodlands']], stick: [[1.7, 1.3, 'PLANS CHANGED: 4 TIMES', GOLD]] },
    { k: 'field', dur: 3.2, set: (x, t) => beach(x, t), cast: { sagittarius: [[0, 540, 1300, 260]] }, rep: 'sagittarius', mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 1.0] }, head: 'LIVE: GALVESTON', sub: 'SAG · ARRIVED ON A WHIM', lines: [[0.3, 2.6, 'sagittarius', 'the water\'s brown. | I\'m thriving.']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'wind', '79°', 'BEACH'], ['TONIGHT', 'wind', '75°', 'ZYDECO | NIGHT'], ['WEEKEND', 'sun', '80°', 'ROAD | TRIP'], ['NEXT WK', 'wind', '78°', 'NEW | CITY?'], ['JAN 9', 'stars', '80°', 'STAYS | PUT']], lines: [[1.6, 1.8, 'aries', 'stays put?! | on Jan 9??']] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#2a1a5a', '#ff8a5a', 0, 1300); skyline(x, 1300, t); x.fillStyle = '#3a2a4a'; x.fillRect(0, 1300, 1080, 620) }, cast: { sagittarius: [[0, 400, 1200, 230]], libra: [[0, 780, 1200, 200]] }, mood: { sagittarius: 'heart', libra: 'happy' }, hops: { sagittarius: [0.3, 0.7], libra: [0.5, 0.9] }, rep: 'sagittarius', head: 'LIVE: A TWO-STEP NIGHT', sub: 'SAG · STAYED FOR A SECOND SONG', lines: [[0.3, 2.6, 'libra', 'you stayed for | a second song!']] },
    { k: 'map', dur: 3.0, areas: ar('midtown'), icons: [[0, -20, 'sun', 1.1]], mood: { aries: 'happy' }, lines: [[0.2, 2.6, 'aries', 'winds calm when you | stay long enough']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: SAGITTARIUS', lines: [[0.4, 2.7, 'sagittarius', 'adventure is great. | so is staying.']], stick: [[0.1, 0.8, 'STAY FOR THE 2ND SONG', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · CALM', mood: { sagittarius: 'heart' }, hops: { sagittarius: [0.3] }, lines: [[0.3, 2.4, 'sagittarius', "I'm staying the | whole party."]] },
  ],
})

// ── hst208 · Capricorn: your 5-day forecast is fully booked
W08W.hst208 = wxEp({
  sign: 'capricorn', anchor: 'cancer', hook: 'Capricorn, your week | is fully booked', temp: '76°', pal: { wall: '#1a3a3a', screen: '#1a4a4a', you: ['#2fc79a', '#e8f4ea'] },
  endLine: 'Book the fun too. Jan 9.', endStars: ['capricorn', 'cancer', 'virgo', 'taurus'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('memorial', 'midtown', 'woodlands'), icons: [[-180, -80, 'cloud', 0.8]], draw: (x, t, lt, cx, cy) => { for (let k = 0; k < 6; k++) box(x, cx - 420 + k * 140, cy + 230, 110, 40, '#2fc79a', 3) }, hops: { cancer: [0.05] }, lines: [[0.4, 2.6, 'cancer', 'Capricorn, honey. | look at this.']] },
    { k: 'board', dur: 3.8, cards: [['TODAY', 'cloud', '76°', 'MEETINGS'], ['TONIGHT', 'cloud', '72°', 'EMAILS'], ['WEEKEND', 'cloud', '75°', 'MEAL | PREP'], ['NEXT WK', 'cloud', '76°', 'MORE | MEETINGS'], ['JAN 9', 'stars', '80°', 'OPEN?!']], lines: [[1.8, 1.8, 'cancer', 'one open day. | ONE.']], stick: [[0.1, 1.2, '100% CHANCE OF CALENDAR', GOLD]] },
    { k: 'field', dur: 3.2, set: (x, t) => arctic(x, t, { wall: '#dfe8d8', floor: '#7a8a7a' }), cast: { capricorn: [[0, 540, 1200, 260]] }, rep: 'capricorn', mood: { capricorn: 'squint' }, head: 'LIVE: AN OFFICE · ARCTIC AC', sub: 'CAPRICORN · 5PM · STILL HERE', lines: [[0.3, 2.6, 'capricorn', "I'll leave when | the 610 clears"]] },
    { k: 'map', dur: 3.2, areas: ar('memorial', 'midtown'), draw: (x, t, lt, cx, cy) => { for (let k = 0; k < 10; k++) { x.fillStyle = BRAKE; x.fillRect(cx - 420 + ((k * 90 + t * 20) % 760), cy + 20 + (k % 2) * 16, 18, 10) } }, icons: [[-60, -120, 'storm', 0.8]], lines: [[0.2, 2.8, 'cancer', 'the 610 does | not clear. ever.']], stick: [[1.7, 1.3, 'TRAFFIC: CLASSIC', BRAKE]] },
    { k: 'field', dur: 3.2, set: (x, t) => bayou(x, t, { sky: ['#ffb07a', '#7a4a9a'] }), cast: { capricorn: [[0, 400, 1150, 230]], taurus: [[0, 760, 1150, 200]] }, mood: { capricorn: 'happy', taurus: 'heart' }, rep: 'capricorn', head: 'LIVE: BUFFALO BAYOU', sub: 'CAPRICORN · TOOK A WALK. UNPLANNED.', lines: [[0.3, 2.6, 'capricorn', 'this was not on | the calendar. it\'s nice.']] },
    { k: 'map', dur: 3.0, areas: ar('midtown'), icons: [[0, -20, 'rainbow', 1.1]], mood: { cancer: 'heart' }, lines: [[0.2, 2.6, 'cancer', 'rest is part of | the plan, baby.']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: CAPRICORN', lines: [[0.4, 2.7, 'capricorn', 'Jan 9: booked. | for fun. on purpose.']], stick: [[0.1, 0.8, 'CALENDAR: FUN ADDED', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · FREE', mood: { capricorn: 'heart' }, hops: { capricorn: [0.3] }, lines: [[0.3, 2.4, 'capricorn', 'leaving 2 hours | early. obviously.']] },
  ],
})

// ── hst209 · Aquarius: clear skies, zero stars visible (city glow, real astronomy)
W08W.hst209 = wxEp({
  sign: 'aquarius', anchor: 'sagittarius', hook: 'Aquarius: clear sky, | zero stars. Why?', temp: '70°', pal: { wall: '#0f1a3a', screen: '#0a1a4a', you: ['#0a1a4a', '#38c4ec'] },
  endLine: 'Bring your own stars. Jan 9.', endStars: ['aquarius', 'sagittarius', 'gemini', 'pisces'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('midtown', 'clear', 'woodlands'), icons: [[0, -40, 'sun', 0.6]], draw: (x, t, lt, cx, cy) => { const g = x.createRadialGradient(cx - 60, cy, 20, cx - 60, cy, 400); g.addColorStop(0, 'rgba(255,170,90,0.55)'); g.addColorStop(1, 'rgba(255,170,90,0)'); x.fillStyle = g; x.fillRect(cx - 480, cy - 350, 960, 700) }, hops: { sagittarius: [0.05] }, lines: [[0.4, 2.6, 'sagittarius', 'Aquarius. tonight: | clear. and yet.']] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#2a1a5a', '#ff9a6a', 0, 1300); skyline(x, 1300, t); x.fillStyle = '#1a1438'; x.fillRect(0, 1300, 1080, 620) }, cast: { aquarius: [[0, 540, 1200, 260]] }, rep: 'aquarius', look: { aquarius: [0, -1] }, mood: { aquarius: 'squint' }, head: 'LIVE: DOWNTOWN · 11PM', sub: 'STARS VISIBLE: 0', lines: [[0.3, 2.6, 'aquarius', 'where did all | the stars go?']] },
    { k: 'map', dur: 3.6, areas: ar('midtown', 'katy', 'clear'), draw: (x, t, lt, cx, cy) => { for (let k = 0; k < 4; k++) { const r = 60 + k * 70 + (lt * 40) % 70; x.strokeStyle = `rgba(255,170,90,${(0.6 - k * 0.12).toFixed(2)})`; x.lineWidth = 8; x.beginPath(); x.arc(cx - 60, cy, r, 0, Math.PI * 2); x.stroke() } }, lines: [[0.2, 3.0, 'sagittarius', 'city glow. our | lights wash them out.']], stick: [[1.5, 1.8, '✓ REAL ASTRONOMY', MINT]] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'sun', '70°', 'BIG IDEAS'], ['TONIGHT', 'stars', '66°', '0 STARS | VISIBLE'], ['WEEKEND', 'cloud', '72°', 'MUSEUM | (FREE DAY)'], ['NEXT WK', 'wind', '70°', 'NEW | THEORY'], ['JAN 9', 'stars', '80°', '12 STARS | IN ONE | ROOM']], lines: [[1.6, 1.8, 'sagittarius', '12 stars. | one room. hm.']] },
    { k: 'field', dur: 3.2, set: (x, t) => { grad(x, '#0a0a2a', '#2a1a5a', 0, 1300); for (let k = 0; k < 60; k++) { x.fillStyle = BONE; x.fillRect((k * 151) % 1080, (k * 83) % 1100, 6, 6) } x.fillStyle = '#1a2a1a'; x.fillRect(0, 1300, 1080, 620) }, cast: { aquarius: [[0, 540, 1200, 260]] }, rep: 'aquarius', mood: { aquarius: 'heart' }, look: { aquarius: [0, -1] }, head: 'LIVE: AN HOUR OUTSIDE TOWN', sub: 'STARS VISIBLE: ALL OF THEM', lines: [[0.3, 2.6, 'aquarius', 'drive out an hour. | there they are.']] },
    { k: 'map', dur: 3.0, areas: ar('midtown'), icons: [[0, -20, 'stars', 1.3]], mood: { sagittarius: 'happy' }, lines: [[0.2, 2.6, 'sagittarius', 'or... gather all | the stars in town']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: AQUARIUS', lines: [[0.4, 2.7, 'aquarius', 'can\'t see stars? | be in a room with them.']], stick: [[0.1, 0.8, 'FORECAST: 12 STARS', GOLD]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · STARS VISIBLE', mood: { aquarius: 'heart' }, hops: { aquarius: [0.3] }, lines: [[0.3, 2.4, 'aquarius', 'that\'s you, | by the way.']] },
  ],
})

// ── hst210 · Pisces: 100% chance of happy tears (crawfish season, king cake, the first coat week)
W08W.hst210 = wxEp({
  sign: 'pisces', anchor: 'scorpio', hook: 'Pisces: 100% chance | of happy tears', temp: '73°', pal: { wall: '#1a1a4a', screen: '#2a2a6a', you: ['#7c74f0', '#ffd0e8'] },
  endLine: 'Cry happy. See you Jan 9.', endStars: ['pisces', 'scorpio', 'cancer', 'virgo'],
  segs: [
    { k: 'map', dur: 3.2, areas: ar('heights', 'bellaire', 'clear'), icons: [[-60, -40, 'hearts', 1.2], [200, 100, 'hearts', 0.8]], hops: { scorpio: [0.05] }, lines: [[0.4, 2.6, 'scorpio', 'Pisces. I know | you\'re watching.']] },
    { k: 'map', dur: 3.2, areas: ar('heights', 'bellaire'), icons: [[-70, -110, 'hearts', 1.2], [-170, 20, 'hearts', 1]], lines: [[0.2, 2.8, 'scorpio', 'tear showers. | scattered. joyful.']], stick: [[1.7, 1.3, 'TISSUE INDEX: HIGH', LAV]] },
    { k: 'field', dur: 3.2, set: (x, t) => { kitchenish(x, t) }, cast: { pisces: [[0, 540, 1200, 260]] }, rep: 'pisces', mood: { pisces: 'heart' }, head: 'LIVE: A BACKYARD BOIL', sub: 'CRAWFISH SEASON · STARTING SMALL', lines: [[0.3, 2.6, 'pisces', 'the first boil of | the year. I\'m crying.']] },
    { k: 'board', dur: 3.6, cards: [['TODAY', 'hearts', '73°', 'CRIES AT | SUNSET'], ['TONIGHT', 'hearts', '70°', 'CRIES AT | A SONG'], ['WEEKEND', 'pollen', '75°', 'POLLEN | (ALSO | CRYING)'], ['NEXT WK', 'hearts', '74°', 'KING | CAKE'], ['JAN 9', 'rainbow', '80°', 'HAPPY | TEARS']], lines: [[1.6, 1.8, 'scorpio', 'the pollen isn\'t | helping.']] },
    { k: 'field', dur: 3.2, set: (x, t, lt) => { bayou(x, t, { sky: ['#ff8a7a', '#4a2a7a'], y: 1260 }); batBridge(x, t, lt + 3, 34) }, cast: { pisces: [[0, 540, 1180, 240]] }, rep: 'pisces', mood: { pisces: 'wide' }, head: 'LIVE: THE BAT BRIDGE', sub: 'PISCES · SUNSET · TEARS: YES', lines: [[0.3, 2.6, 'pisces', 'they leave | together!!']] },
    { k: 'map', dur: 3.0, areas: ar('heights'), icons: [[0, -20, 'rainbow', 1.2]], mood: { scorpio: 'heart' }, lines: [[0.2, 2.6, 'scorpio', 'tears are just | feelings. let them.']] },
    { k: 'you', dur: 3.4, title: 'YOUR FORECAST: PISCES', lines: [[0.4, 2.7, 'pisces', 'big feelings are | not too much.']], stick: [[0.1, 0.8, 'SOFT IS STRONG', MINT]] },
    { k: 'you', dur: 3.0, title: 'JAN 9 · HAPPY TEARS', cast: { scorpio: [[0, 860, 1180, 200]] }, mood: { pisces: 'heart', scorpio: 'heart' }, hops: { scorpio: [0.4] }, lines: [[0.4, 2.3, 'scorpio', 'I brought | tissues.']] },
  ],
})
function kitchenish(x, t) {   // a backyard: fence, string lights, a big pot on a burner, newspaper table
  grad(x, '#ffb07a', '#7a4a9a', 0, 1300); for (let k = 0; k < 14; k++) box(x, k * 80, 860, 70, 440, '#a0784a', 4)
  for (let k = 0; k < 12; k++) { const on = Math.sin(t * 2 + k) > -0.6; x.fillStyle = on ? '#ffd36b' : '#7a6a4a'; x.beginPath(); x.arc(40 + k * 92, 760 + Math.sin(k * 1.3) * 20, 12, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#5aa05a'; x.fillRect(0, 1300, 1080, 620)
  box(x, 780, 1080, 200, 180, '#8f96a0', 6); for (let k = 0; k < 3; k++) { x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 6; x.beginPath(); x.moveTo(820 + k * 50, 1070); x.quadraticCurveTo(800 + k * 50 + Math.sin(t * 3 + k) * 20, 1000, 820 + k * 50, 940); x.stroke() }
}
