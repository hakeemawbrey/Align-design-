// Houston Star Talk · w10 nature-doc parodies (hst248–hst260). Grammar from hst008: a camera viewfinder, Latin
// lower-thirds, italic narration subtitles; one Houston creature, its habitat, an encounter, and a sighting on Jan 9.
import { clamp } from '../../src/lib.js'
import { FLOOR, box, txt, outside, clock } from '../starrace/ep.js'
import { label, sparkles, GOLD, BONE, PINK, INK, MONO, MINT } from '../signs3kit.js'
import { partyCard, skyline, car, freeway, overheadSign, streetSign, mural, coffeeShop, sweat, phoneFlash, soupPot, lowerThird, narr, BRAKE } from './kit.js'
import { Y, BADGE, STING, Kp, stamp, viewfinder, sky, SKIES, bayou, bungalow, foodStrip, batBridge, paddleLake, paddleBoat, tunnel, townhomes, gulf, marina, pines, closet, plants, trailLoop, boba, bowl, mic, dog, boots, phone, specs, card, lowSun, coat } from './w10.js'

const night = (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) }
/** the closing sighting: night skyline, confetti and the party sticker */
const sighting = (x, t, lt) => { night(x, t); for (let k = 0; k < 18; k++) { const ph = (t * 0.3 + k / 18) % 1; x.fillStyle = [GOLD, PINK, '#8fe3ff'][k % 3]; x.fillRect(80 + (k * 113) % 920, 520 + ph * 700, 14, 22) } label(x, 540, 640, 'BETA PARTY · JAN 9', Kp(lt, 0.1), { size: 46, bg: GOLD, rot: -0.03 }) }

/** build a doc episode: scene.lt = [common name, latin, at]; scene.n = [narration, at, dur] */
function doc({ hook, endLine, endStars, scenes, cues = [] }) {
  return {
    hook, badge: BADGE, endLen: 6.2, cues: [...STING, ...cues],
    end: (x, t, lt) => partyCard(x, t, lt, { line: endLine, stars: endStars }),
    scenes: scenes.map(s => ({
      dur: s.dur, cast: s.cast, mood: s.mood, hops: s.hops, lines: s.lines, look: s.look, stick: s.stick,
      set: s.set, back: s.back,
      front: (x, t, lt, P) => {
        s.front?.(x, t, lt, P)
        if (s.lt) lowerThird(x, s.lt[0], s.lt[1], Kp(lt, s.lt[2] ?? 0.3))
        if (s.n) narr(x, lt, s.n[0], s.n[1] ?? 0.2, s.n[2] ?? 99)
        viewfinder(x, t)
      },
    })),
  }
}
const walk = (a, b, t1 = 2.5, y = Y, s = 250) => [[0, a, y, s], [t1, b, y, s]]

// ── hst248 · Rare footage: a Heights local leaving the Heights
const hst248 = doc({
  hook: 'Rare footage: | a Heights local | leaving the Heights', endLine: 'Leave the Heights. Once. Jan 9.', endStars: ['taurus', 'aquarius', 'cancer', 'leo'],
  scenes: [
    { dur: 3.8, set: (x, t) => bungalow(x, t), front: (x, t) => dog(x, 820, Y + 120, t), cast: { taurus: [[0, 400, Y - 40, 250]] }, mood: { taurus: lt => lt < 0.9 ? 'sleepy' : 'happy' }, hops: { taurus: [0.05, 0.9] },
      lt: ['THE HEIGHTS LOCAL', 'Taurus porchus', 2.7], n: ['You are watching | something very rare.', 0.3, 2.3] },
    { dur: 3.6, set: (x, t) => bungalow(x, t), front: (x, t) => dog(x, 820, Y + 120, t), cast: { taurus: [[0, 400, Y - 40, 250]] }, mood: { taurus: 'happy' },
      n: ['It has all it needs: | a porch, a dog, a taco place.', 0.2], lines: [[2.0, 1.4, 'taurus', 'why would | I leave?']] },
    { dur: 3.4, set: (x, t) => bungalow(x, t, { skyc: SKIES.sunset }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); phone(x, cx + s * 0.62, cy - 20, 0.9, 'party?', { sub: 'JAN 9' }) }, cast: { taurus: [[0, 400, Y - 40, 250]] }, mood: { taurus: 'wide' },
      n: ['But today... | a signal.', 0.2, 1.6], lines: [[1.9, 1.3, 'taurus', 'outside | the Heights?']] },
    { dur: 3.6, set: (x, t, lt) => { outside(x, { ground: '#3a5a3a' }); streetSign(x, 820, 700, 'WHITE OAK', { k: 1 }) }, cast: { taurus: walk(200, 520, 3.0) }, mood: { taurus: 'squint' },
      n: ['It approaches the edge | of its territory.', 0.2] },
    { dur: 3.4, set: (x, t, lt) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 3, t * 200); overheadSign(x, 540, 820, 'I-10', 'LEAVING THE HEIGHTS', Kp(lt, 0.1)) }, front: (x, t, lt, P) => { const [cx] = P.at('taurus'); car(x, cx, FLOOR + 120, '#7fb0c8', { open: true }) },
      cast: { taurus: [[0, 520, FLOOR + 5, 190]] }, mood: { taurus: 'wide' }, n: ['Hesitation.', 0.2, 1.2], lines: [[1.6, 1.6, 'taurus', 'is there... | parking?']] },
    { dur: 3.8, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, cast: { taurus: [[0, 300, Y, 220]], aquarius: [[0, 1180, Y, 240], [0.8, 770, Y, 240]] }, mood: { taurus: 'wide', aquarius: 'wink' },
      lt: ['A MONTROSE LOCAL', 'Aquarius muralis', 0.2], lines: [[1.4, 1.1, 'aquarius', 'are you... | lost?'], [2.6, 1.0, 'taurus', 'very.']] },
    { dur: 3.6, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, cast: { taurus: [[0, 330, Y, 230], [1, 420, Y, 230]], aquarius: [[0, 770, Y, 240], [1, 680, Y, 240]] }, mood: { taurus: 'heart', aquarius: 'happy' },
      n: ['An unlikely friendship forms.', 0.2, 1.4], lines: [[1.8, 1.6, 'aquarius', 'come with me | Jan 9.']] },
    { dur: 3.8, set: sighting, cast: { taurus: [[0, 380, Y, 240]], aquarius: [[0, 700, Y, 240]] }, mood: { taurus: 'sparkle', aquarius: 'happy' },
      n: ['It may never return | to the Heights.', 0.2, 1.8], lines: [[2.2, 1.4, 'taurus', 'home by 10. | promise.']] },
  ],
})

// ── hst249 · The 5am Memorial jogger in its natural habitat
const hst249 = doc({
  hook: 'The 5am Memorial jogger | in its | natural habitat', endLine: 'Pace yourself. Jan 9.', endStars: ['aries', 'libra', 'gemini', 'virgo'],
  scenes: [
    { dur: 3.6, set: (x, t) => trailLoop(x, t, { skyc: SKIES.dawn }), cast: { aries: [[0, 160, Y, 240], [3.6, 880, Y, 240]] }, mood: { aries: 'sparkle' },
      lt: ['THE 5AM JOGGER', 'Aries velocissimus', 2.7], n: ['Shh. You might | scare it off.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => trailLoop(x, t, { skyc: SKIES.night }), front: (x, t) => clock(x, 800, 800, '4:58', '#ffd36b'), cast: { aries: [[0, 200, Y, 230], [3.4, 700, Y, 230]] }, mood: { aries: 'happy' },
      n: ['It wakes before the sun. | Before the birds.', 0.2], lines: [[2.0, 1.3, 'aries', 'mile 3. | warming up.']] },
    { dur: 3.2, set: (x, t) => trailLoop(x, t, { skyc: SKIES.night }), front: (x, t) => box(x, 600, Y + 40, 360, 40, '#8a5530', 5), cast: { gemini: [[0, 780, Y - 40, 220]] }, mood: { gemini: 'sleepy' },
      n: ['Other creatures | are still asleep.', 0.2, 1.6], lines: [[1.9, 1.2, 'gemini', '...why.']] },
    { dur: 3.6, set: (x, t) => trailLoop(x, t, { skyc: SKIES.dawn }), cast: { aries: [[0, 120, Y, 200], [3.6, 760, Y, 200]], leo: [[0, 280, Y, 180], [3.6, 900, Y, 180]], cancer: [[0, -40, Y, 180], [3.6, 600, Y, 180]], aquarius: [[0, -200, Y, 180], [3.6, 440, Y, 180]] },
      mood: { aries: 'sparkle', leo: 'happy', cancer: 'wide', aquarius: 'happy' }, lt: ['THE RUN CLUB', 'Gregarius bayouensis', 0.2], n: ['In winter, it joins a herd.', 1.4] },
    { dur: 3.4, set: (x, t) => bayou(x, t, { skyc: SKIES.dawn }), cast: { aries: [[0, 360, Y, 230]], libra: [[0, 720, Y, 230]] }, mood: { aries: 'sparkle', libra: 'happy' },
      n: ['It shows interest | the only way it knows.', 0.2, 1.8], lines: [[2.1, 1.2, 'aries', 'want to | race?']] },
    { dur: 3.2, set: (x, t) => bayou(x, t, { skyc: SKIES.dawn }), cast: { aries: [[0, 360, Y, 230]], libra: [[0, 720, Y, 230]] }, mood: { aries: 'wide', libra: 'wink' },
      lines: [[0.3, 1.3, 'libra', 'want to get | coffee instead?']], n: ['A new behavior.', 1.9] },
    { dur: 3.6, set: (x, t) => { sky(x, SKIES.noon[0], SKIES.noon[1]); outside(x, { ground: '#5a4a3a' }); coffeeShop(x, 540, FLOOR + 60) }, cast: { aries: [[0, 300, Y, 230]], libra: [[0, 780, Y, 230]] }, mood: { aries: 'heart', libra: 'heart' },
      n: ['It slows down. | For the first time.', 0.2, 1.8], lines: [[2.1, 1.3, 'aries', 'this is | nice.']] },
    { dur: 3.6, set: sighting, cast: { aries: [[0, 380, Y, 240]], libra: [[0, 700, Y, 240]] }, mood: { aries: 'sparkle', libra: 'happy' },
      n: ['Next sighting: Jan 9. | It will arrive early.', 0.2, 1.9], lines: [[2.3, 1.2, 'aries', 'I jogged | there.']] },
  ],
})

// ── hst250 · Watch closely: the bats at sunset and a Pisces
const hst250 = doc({
  hook: 'Watch closely: | the sunset bats | and a Pisces', endLine: 'Come for the view. Jan 9.', endStars: ['pisces', 'scorpio', 'cancer', 'libra'],
  scenes: [
    { dur: 3.8, set: (x, t, lt) => batBridge(x, t, lt + 2, 30), cast: { pisces: [[0, 330, Y + 20, 230]], scorpio: [[0, 760, Y + 20, 230]] }, mood: { pisces: 'wide', scorpio: 'squint' }, hops: { pisces: [0.05, 0.5] },
      lt: ['THE BAT BRIDGE', 'a bayou, at sunset', 2.7], n: ['You came for the bats. | Everyone does.', 0.3, 2.3] },
    { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt + 5, 50), cast: { pisces: [[0, 330, Y + 20, 250]] }, mood: { pisces: 'wide' },
      lt: ['THE PISCES', 'Pisces lacrimosa', 0.2], n: ['It cries at minute one.', 1.4, 1.2], lines: [[2.0, 1.4, 'pisces', "they're so | beautiful."]] },
    { dur: 3.2, set: (x, t, lt) => batBridge(x, t, lt + 8, 50), cast: { scorpio: [[0, 760, Y + 20, 250]] }, mood: { scorpio: 'eyeroll' },
      n: ['Its companion | pretends not to care.', 0.2, 1.6], lines: [[1.9, 1.2, 'scorpio', "it's just | bats."]] },
    { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt + 11, 70), cast: { pisces: [[0, 330, Y + 20, 230]], scorpio: [[0, 760, Y + 20, 230]] }, mood: { pisces: 'wide', scorpio: 'wide' },
      n: ['Every evening, | they pour out to hunt.', 0.2] },
    { dur: 3.4, set: (x, t, lt) => batBridge(x, t, lt + 14, 70), cast: { pisces: [[0, 330, Y + 20, 230]], scorpio: [[0, 760, Y + 20, 230]] }, mood: { pisces: 'heart', scorpio: 'squint' },
      lines: [[0.2, 1.3, 'pisces', 'one is | looking at me.'], [1.7, 1.5, 'scorpio', "it's looking | at bugs."]] },
    { dur: 3.4, set: (x, t, lt) => batBridge(x, t, lt + 17, 60), cast: { pisces: [[0, 330, Y + 20, 230]] }, mood: { pisces: 'happy' },
      n: ['Mosquitoes, the city bird, | are dinner.', 0.2, 1.8], lines: [[2.1, 1.2, 'pisces', 'thank you, | bats!']] },
    { dur: 3.4, set: (x, t, lt) => batBridge(x, t, lt + 20, 40), cast: { scorpio: [[0, 700, Y + 20, 250]] }, mood: { scorpio: 'wide' },
      n: ['And then, | the rare part.', 0.2, 1.4], lines: [[1.7, 1.5, 'scorpio', "...ok. it's | beautiful."]] },
    { dur: 3.8, set: sighting, cast: { pisces: [[0, 380, Y, 240]], scorpio: [[0, 700, Y, 240]] }, mood: { pisces: 'heart', scorpio: 'heart' },
      n: ['Two creatures. | One sunset.', 0.2, 1.6], lines: [[2.0, 1.0, 'pisces', 'Jan 9 | next?'], [3.0, 0.8, 'scorpio', 'yes.']] },
  ],
})

// ── hst251 · Observe: the Bellaire late-night food crawler
const hst251 = doc({
  hook: 'Observe: the Bellaire | late-night food crawler', endLine: 'Eat first. Then Jan 9.', endStars: ['sagittarius', 'libra', 'taurus', 'cancer'],
  scenes: [
    { dur: 3.8, set: (x, t) => foodStrip(x, t), cast: { sagittarius: [[0, 160, Y, 250], [3.4, 520, Y, 250]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.05] },
      lt: ['THE FOOD CRAWLER', 'Sagittarius noctivorus', 2.7], n: ['You are hungry. | So is it.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => foodStrip(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('sagittarius'); boba(x, cx + s * 0.62, cy - 10, 0.9) }, cast: { sagittarius: [[0, 400, Y, 250]] }, mood: { sagittarius: 'happy' },
      n: ['Stop one: boba.', 0.2, 1.4], lines: [[1.8, 1.4, 'sagittarius', "I'm not | sharing this."]] },
    { dur: 3.4, set: (x, t) => foodStrip(x, t), front: (x, t) => bowl(x, 740, 1200, t, 1.2), cast: { sagittarius: [[0, 360, Y, 250]] }, mood: { sagittarius: 'heart' },
      n: ['Stop two: pho, | because it is 61°.', 0.2, 1.8], lines: [[2.1, 1.2, 'sagittarius', 'basically | winter.']] },
    { dur: 3.6, set: (x, t) => foodStrip(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); mic(x, cx - s * 0.6, cy - 20, 1.1) }, cast: { libra: [[0, 640, Y, 250]] }, mood: { libra: 'sparkle' }, hops: { libra: [0.4, 0.9, 1.4] },
      lt: ['A KARAOKE CREATURE', 'Libra microphonica', 0.2], lines: [[1.6, 1.6, 'libra', 'one more | song!']] },
    { dur: 3.4, set: (x, t) => foodStrip(x, t), cast: { sagittarius: [[0, 330, Y, 240]], libra: [[0, 760, Y, 240]] }, mood: { sagittarius: 'wink', libra: 'happy' },
      n: ['A second creature | joins the crawl.', 0.2, 1.6], lines: [[1.9, 1.3, 'libra', 'where next?']] },
    { dur: 3.2, set: (x, t) => foodStrip(x, t, ['DESSERT', 'BOBA', 'BAKERY', 'NOODLES']), front: (x, t) => clock(x, 540, 860, '1:04', '#ff8fb1'), cast: { sagittarius: [[0, 330, Y, 240]], libra: [[0, 760, Y, 240]] }, mood: { sagittarius: 'sparkle', libra: 'wide' },
      n: ['It is now 1 a.m.', 0.2, 1.3], lines: [[1.6, 1.4, 'sagittarius', 'dessert | time.']] },
    { dur: 3.6, set: (x, t) => foodStrip(x, t), cast: { sagittarius: [[0, 380, Y, 240]], libra: [[0, 700, Y, 240]] }, mood: { sagittarius: 'sleepy', libra: 'sleepy' },
      n: ['Satisfied, they rest.', 0.2, 1.3], lines: [[1.6, 1.8, 'libra', 'Lunar New Year | is coming...']] },
    { dur: 3.6, set: sighting, cast: { sagittarius: [[0, 380, Y, 240]], libra: [[0, 700, Y, 240]] }, mood: { sagittarius: 'heart', libra: 'heart' },
      n: ['Next sighting: Jan 9.', 0.2, 1.6], lines: [[1.9, 1.4, 'sagittarius', 'eat first. | then party.']] },
  ],
})

// ── hst252 · The Montrose plant parent in its natural habitat
const can = (x, P, id) => { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.45, cy - 10, 80, 70, '#5ec8ff', 5); box(x, cx + s * 0.45 + 76, cy - 4, 46, 14, '#5ec8ff', 3) }
const hst252 = doc({
  hook: 'The Montrose plant parent | in its | natural habitat', endLine: 'Water your plants. Then Jan 9.', endStars: ['virgo', 'gemini', 'cancer', 'aquarius'],
  scenes: [
    { dur: 3.8, set: (x, t) => plants(x, t), front: (x, t, lt, P) => can(x, P, 'virgo'), cast: { virgo: [[0, 400, Y, 250]] }, mood: { virgo: 'happy' }, hops: { virgo: [0.05, 0.6] },
      lt: ['THE PLANT PARENT', 'Virgo verdantis', 2.7], n: ['You have entered | its jungle. Quietly.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => plants(x, t), cast: { virgo: [[0, 400, Y, 250]] }, mood: { virgo: 'heart' },
      n: ['Each plant has a name.', 0.2, 1.4], lines: [[1.7, 1.5, 'virgo', 'good morning, | Gerald.']] },
    { dur: 3.4, set: (x, t) => plants(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); sweat(x, cx + s * 0.3, cy - s * 0.3, t, 3) }, cast: { virgo: [[0, 400, Y, 250]] }, mood: { virgo: 'sparkle' },
      n: ['Houston humidity: | the plants love it.', 0.2, 1.8], lines: [[2.0, 1.3, 'virgo', 'the pothos | is thriving.']] },
    { dur: 3.6, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); box(x, cx + s * 0.5, cy - 120, 90, 60, '#ffd36b', 5); box(x, cx + s * 0.5 + 38, cy - 60, 14, 120, '#8a5530', 4) }, cast: { virgo: [[0, 360, Y, 240]] }, mood: { virgo: 'sparkle' },
      lt: ['THE VINTAGE RUN', 'foraging, Westheimer', 0.2], lines: [[1.6, 1.6, 'virgo', 'a lamp | for Gerald.']] },
    { dur: 3.6, set: (x, t) => plants(x, t), cast: { virgo: [[0, 330, Y, 240]], gemini: [[0, 1180, Y, 240], [0.7, 770, Y, 240]] }, mood: { virgo: 'wide', gemini: 'happy' },
      lt: ['A VISITOR', 'Gemini curiosus', 0.2], lines: [[1.2, 1.1, 'gemini', 'which one | is Gerald?'], [2.4, 1.1, 'virgo', 'they ALL | have names.']] },
    { dur: 3.4, set: (x, t) => plants(x, t), cast: { virgo: [[0, 330, Y, 240]], gemini: [[0, 770, Y, 240]] }, mood: { virgo: lt => lt > 1.5 ? 'heart' : 'wide', gemini: 'sparkle' },
      lines: [[0.2, 1.3, 'gemini', "I'll learn | every name."]], n: ['A suitable mate.', 1.8] },
    { dur: 3.4, set: (x, t) => plants(x, t), front: (x, t, lt, P) => can(x, P, 'gemini'), cast: { virgo: [[0, 330, Y, 240]], gemini: [[0, 770, Y, 240]] }, mood: { virgo: 'happy', gemini: 'happy' },
      n: ['It lets the visitor | water a plant.', 0.2, 1.8], stick: [[2.0, 1.3, 'TRUST.', MINT]] },
    { dur: 3.6, set: sighting, cast: { virgo: [[0, 380, Y, 240]], gemini: [[0, 700, Y, 240]] }, mood: { virgo: 'heart', gemini: 'heart' },
      n: ['Next sighting: Jan 9.', 0.2, 1.4], lines: [[1.7, 1.6, 'virgo', 'Gerald | stays home.']] },
  ],
})

// ── hst253 · A Clear Lake engineer attempts small talk
const hst253 = doc({
  hook: 'A Clear Lake engineer | attempts small talk', endLine: 'Calculated. See you Jan 9.', endStars: ['capricorn', 'leo', 'virgo', 'aquarius'],
  scenes: [
    { dur: 3.8, set: (x, t) => marina(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); card(x, cx + s * 0.75, cy - 10, 0.55, 'SPECS', 'v4.2') }, cast: { capricorn: [[0, 380, Y, 250]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.6] },
      lt: ['THE CLEAR LAKE ENGINEER', 'Capricornus precisus', 2.7], n: ['You may hear it | before you see it.', 0.3, 2.3] },
    { dur: 3.2, set: (x, t) => marina(x, t), cast: { capricorn: [[0, 380, Y, 250]] }, mood: { capricorn: 'squint' },
      n: ['It is excellent | at boats and numbers.', 0.2, 1.6], lines: [[1.9, 1.2, 'capricorn', 'that sail | is 4° off.']] },
    { dur: 3.4, set: (x, t) => marina(x, t), cast: { capricorn: [[0, 300, Y, 230]], leo: [[0, 1180, Y, 240], [0.7, 780, Y, 240]] }, mood: { capricorn: 'wide', leo: 'sparkle' },
      lt: ['A VISITOR', 'Leo sociabilis', 0.2], lines: [[1.3, 1.6, 'leo', 'hi! nice | weather, huh?']] },
    { dur: 3.4, set: (x, t) => marina(x, t), cast: { capricorn: [[0, 300, Y, 230]], leo: [[0, 780, Y, 240]] }, mood: { capricorn: 'squint', leo: 'happy' },
      lines: [[0.2, 1.5, 'capricorn', 'the dew point | is concerning.'], [2.0, 1.0, 'leo', 'ok!']] },
    { dur: 3.4, set: (x, t) => marina(x, t), cast: { capricorn: [[0, 300, Y, 230]], leo: [[0, 780, Y, 240]] }, mood: { capricorn: 'wide', leo: 'sparkle' },
      n: ['It is trying. | Very hard.', 0.2, 1.4], lines: [[1.6, 1.2, 'capricorn', 'do you... | like boats?'], [2.8, 0.6, 'leo', 'YES.']] },
    { dur: 3.4, set: (x, t) => marina(x, t), cast: { capricorn: [[0, 330, Y, 230], [1, 420, Y, 230]], leo: [[0, 780, Y, 240], [1, 680, Y, 240]] }, mood: { capricorn: 'heart', leo: 'heart' },
      n: ['Contact.', 0.2, 1.0], lines: [[1.3, 1.9, 'capricorn', 'I can show | you the specs.']] },
    { dur: 3.6, set: (x, t) => { sky(x, SKIES.sunset[0], SKIES.sunset[1], 1000); lowSun(x, 540, 940, 120); x.fillStyle = '#3a4a7a'; x.fillRect(0, 960, 1080, 400); x.fillStyle = '#8a6a4a'; x.fillRect(0, 1340, 1080, 580) }, cast: { capricorn: [[0, 420, Y, 230]], leo: [[0, 680, Y, 240]] }, mood: { capricorn: 'happy', leo: 'heart' },
      n: ['Clear Lake is far. | Love finds a route.', 0.2, 1.8], lines: [[2.0, 1.5, 'leo', 'come to | the party?']] },
    { dur: 3.6, set: sighting, cast: { capricorn: [[0, 380, Y, 240]], leo: [[0, 700, Y, 240]] }, mood: { capricorn: 'sparkle', leo: 'heart' },
      lines: [[0.3, 1.6, 'capricorn', 'route | calculated.'], [2.1, 1.3, 'capricorn', 'ETA: | Jan 9.']] },
  ],
})

// ── hst254 · The downtown tunnel lunch creature (it's you)
const hst254 = doc({
  hook: "The downtown tunnel | lunch creature | (it's you)", endLine: 'Come up for air. Jan 9.', endStars: ['cancer', 'aquarius', 'aries', 'libra'],
  scenes: [
    { dur: 3.8, set: (x, t) => tunnel(x, t), cast: { cancer: [[0, 220, Y, 250], [3.4, 480, Y, 250]] }, mood: { cancer: 'happy' }, hops: { cancer: [0.05] },
      lt: ['THE TUNNEL DWELLER', 'Cancer subterraneus', 2.7], n: ['Yes, you. | We see you down here.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => tunnel(x, t), front: (x, t) => { card(x, 820, 500, 0.6, 'ABOVE', '95° · HUMID', '#ffd36b') }, cast: { cancer: [[0, 420, Y, 250]] }, mood: { cancer: 'sparkle' },
      n: ['Above: heat. | Below: perfect.', 0.2, 1.5], lines: [[1.8, 1.4, 'cancer', 'I never | go outside.']] },
    { dur: 3.2, set: (x, t) => tunnel(x, t), cast: { cancer: [[0, 200, Y, 240]] }, mood: { cancer: 'happy' },
      n: ['It returns to the same | lunch spot daily.', 0.2, 1.4], lines: [[1.7, 1.4, 'cancer', 'same salad | since 2019.']] },
    { dur: 3.4, set: (x, t) => tunnel(x, t), cast: { aries: [[0, -100, Y, 200], [3.4, 1200, Y, 200]], libra: [[0, -300, Y, 190], [3.4, 1000, Y, 190]], aquarius: [[0, -500, Y, 200], [3.4, 800, Y, 200]] }, mood: { aries: 'sparkle', libra: 'happy', aquarius: 'happy' },
      n: ['At noon, the herd | moves as one.', 0.2] },
    { dur: 3.6, set: (x, t) => tunnel(x, t), cast: { cancer: [[0, 300, Y, 230]], aquarius: [[0, 1180, Y, 240], [0.7, 780, Y, 240]] }, mood: { cancer: 'wide', aquarius: 'wink' },
      lt: ['A COWORKER', 'Aquarius elevatoris', 0.2], lines: [[1.2, 1.2, 'aquarius', 'floor 12, | right?'], [2.5, 1.0, 'cancer', 'yes!!']] },
    { dur: 3.4, set: (x, t) => tunnel(x, t), cast: { cancer: [[0, 330, Y, 230]], aquarius: [[0, 750, Y, 240]] }, mood: { cancer: 'heart', aquarius: 'happy' },
      n: ['Tunnel lunch dates: | short, cool, efficient.', 0.2, 1.8], lines: [[2.1, 1.2, 'aquarius', 'tomorrow?']] },
    { dur: 3.6, set: (x, t) => tunnel(x, t, { closed: true }), cast: { cancer: [[0, 330, Y, 230]], aquarius: [[0, 750, Y, 240]] }, mood: { cancer: 'wide', aquarius: 'wide' },
      n: ['But on weekends, | the tunnels close.', 0.2, 1.6], lines: [[1.9, 1.5, 'cancer', 'where | do we meet?']] },
    { dur: 3.6, set: sighting, cast: { cancer: [[0, 380, Y, 240]], aquarius: [[0, 700, Y, 240]] }, mood: { cancer: 'wide', aquarius: 'happy' },
      lines: [[0.3, 1.4, 'aquarius', 'up here. | Jan 9.'], [2.0, 1.3, 'cancer', 'OUTSIDE?!']] },
  ],
})

// ── hst255 · The EaDo townhome dweller cannot find its own door
const hst255 = doc({
  hook: "The EaDo townhome dweller | can't find its door", endLine: 'Find your people. Jan 9.', endStars: ['gemini', 'taurus', 'leo', 'scorpio'],
  scenes: [
    { dur: 3.8, set: (x, t) => townhomes(x, t), cast: { gemini: [[0, 120, Y, 240], [1.6, 330, Y, 240], [3.2, 120, Y, 240]] }, mood: { gemini: 'wide' }, hops: { gemini: [0.05] },
      lt: ['THE TOWNHOME DWELLER', 'Gemini identicalis', 2.7], n: ['You have stood here too. | Which door is yours?', 0.3, 2.3] },
    { dur: 3.2, set: (x, t) => townhomes(x, t), cast: { gemini: [[0, 330, Y, 230]] }, mood: { gemini: 'squint' },
      n: ['Every home is the same.', 0.2, 1.3], lines: [[1.6, 1.4, 'gemini', 'this one?']] },
    { dur: 3.0, set: (x, t) => townhomes(x, t), cast: { gemini: [[0, 330, Y, 230], [0.8, 760, Y, 230]] }, mood: { gemini: 'wide' },
      lines: [[1.0, 1.2, 'gemini', 'or this one?']], stick: [[2.0, 1.0, 'WRONG.', PINK]] },
    { dur: 3.4, set: (x, t) => townhomes(x, t), cast: { gemini: [[0, 330, Y, 230]], taurus: [[0, 760, Y - 10, 240]] }, mood: { gemini: 'wide', taurus: 'squint' },
      lt: ['THE NEIGHBOR', 'Taurus patiens', 0.2], lines: [[1.3, 1.6, 'taurus', 'you again.']] },
    { dur: 3.4, set: (x, t) => townhomes(x, t), cast: { gemini: [[0, 330, Y, 230]], taurus: [[0, 760, Y - 10, 240]] }, mood: { gemini: 'sparkle', taurus: 'squint' },
      n: ['A territorial dispute.', 0.2, 1.2], lines: [[1.4, 0.9, 'gemini', 'EaDo.'], [2.4, 0.9, 'taurus', 'East End.']] },
    { dur: 3.4, set: (x, t) => townhomes(x, t, { mark: 1 }), cast: { gemini: [[0, 330, Y, 230]], taurus: [[0, 760, Y - 10, 240]] }, mood: { gemini: 'wide', taurus: 'happy' },
      lines: [[0.2, 1.5, 'taurus', 'yours has the | yellow door.'], [2.0, 1.2, 'gemini', 'OH.']] },
    { dur: 3.4, set: (x, t) => townhomes(x, t, { mark: 1 }), cast: { gemini: [[0, 360, Y, 230]], taurus: [[0, 720, Y - 10, 240]] }, mood: { gemini: 'heart', taurus: 'heart' },
      n: ['Neighbors become friends.', 0.2, 1.4], lines: [[1.7, 1.5, 'gemini', 'come to | the party?']] },
    { dur: 3.6, set: sighting, cast: { gemini: [[0, 380, Y, 240]], taurus: [[0, 700, Y, 240]] }, mood: { gemini: 'sparkle', taurus: 'happy' },
      lines: [[0.3, 1.2, 'taurus', 'which door?'], [1.8, 1.6, 'gemini', 'Jan 9. | no doors.']] },
  ],
})

// ── hst256 · Courtship season: the paddle boats of Hermann Park
const boatFront = ids => (x, t, lt, P) => ids.forEach(([id, col]) => { const [cx, cy, s] = P.at(id); paddleBoat(x, cx, cy + s * 0.35, t, col) })
const hst256 = doc({
  hook: 'Courtship season: | the Hermann Park | paddle boats', endLine: 'Make your move. Jan 9.', endStars: ['leo', 'libra', 'pisces', 'taurus'],
  scenes: [
    { dur: 3.8, set: (x, t) => paddleLake(x, t), front: boatFront([['leo', '#ffd36b']]), cast: { leo: [[0, 260, 1150, 220], [3.6, 460, 1150, 220]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05] },
      lt: ['THE PADDLE BOATER', 'Leo pedalis', 2.7], n: ['You are on a first date. | So is it.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => paddleLake(x, t), front: boatFront([['libra', '#ff8fb1']]), cast: { libra: [[0, 820, 1150, 220], [3.4, 700, 1150, 220]] }, mood: { libra: 'happy' },
      lt: ['THE OTHER BOATER', 'Libra aequilibria', 0.2], n: ['The courtship begins | with a slow approach.', 1.5] },
    { dur: 3.2, set: (x, t) => paddleLake(x, t), front: boatFront([['leo', '#ffd36b']]), cast: { leo: [[0, 140, 1150, 220], [2.6, 940, 1150, 220]] }, mood: { leo: 'sparkle' },
      n: ['It shows off its speed.', 1.5], lines: [[0.2, 1.2, 'leo', 'watch | this!']] },
    { dur: 3.4, set: (x, t) => paddleLake(x, t), front: boatFront([['leo', '#ffd36b']]), cast: { leo: [[0, 540, 1150, 220]] }, mood: { leo: 'wide' },
      back: (x, t, lt) => { x.strokeStyle = 'rgba(255,255,255,0.4)'; x.lineWidth = 6; x.beginPath(); x.arc(540, 1230, 180, 0, Math.PI * 2 * clamp(lt / 2)); x.stroke() },
      n: ['It is going in circles.', 0.2, 1.5], lines: [[1.9, 1.3, 'leo', 'on | purpose.']] },
    { dur: 3.2, set: (x, t) => paddleLake(x, t), front: boatFront([['libra', '#ff8fb1']]), cast: { libra: [[0, 700, 1150, 230]] }, mood: { libra: 'heart' },
      lines: [[0.3, 1.4, 'libra', "you're | adorable."]], n: ['Somehow, it works.', 1.9] },
    { dur: 3.4, set: (x, t) => paddleLake(x, t), front: boatFront([['leo', '#ffd36b'], ['libra', '#ff8fb1']]), cast: { leo: [[0, 280, 1150, 210]], libra: [[0, 760, 1150, 210]] }, mood: { leo: 'sparkle', libra: 'wink' },
      lines: [[0.3, 1.5, 'libra', 'race you | to the dock?'], [2.0, 1.1, 'leo', 'deal.']] },
    { dur: 3.4, set: (x, t) => { paddleLake(x, t, { skyc: SKIES.sunset }); box(x, 200, 1260, 680, 40, '#8a6a4a', 5) }, cast: { leo: [[0, 400, Y - 30, 230]], libra: [[0, 680, Y - 30, 230]] }, mood: { leo: 'heart', libra: 'heart' },
      n: ['Nature is beautiful.', 0.2, 1.4], lines: [[1.7, 1.4, 'leo', 'you won. | on purpose.']] },
    { dur: 3.6, set: sighting, cast: { leo: [[0, 380, Y, 240]], libra: [[0, 700, Y, 240]] }, mood: { leo: 'sparkle', libra: 'heart' },
      n: ['Next sighting: Jan 9.', 0.2, 1.4], lines: [[1.7, 1.6, 'libra', "I'll pick | the music."]] },
  ],
})

// ── hst257 · Rare: a Houstonian in a coat. It is 61°.
const hst257 = doc({
  hook: 'Rare: a Houstonian | in a coat. | It is 61°.', endLine: 'Wear the coat. Jan 9.', endStars: ['scorpio', 'sagittarius', 'cancer', 'pisces'],
  scenes: [
    { dur: 3.8, set: (x, t) => { sky(x, '#8fa8c8', '#d8e2ee'); skyline(x, FLOOR + 60, t, { alpha: 0.5 }); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => coat(x, P, 'scorpio', '#e05a3a'), cast: { scorpio: [[0, 420, Y, 260]] }, mood: { scorpio: 'squint' }, hops: { scorpio: [0.05, 0.3, 0.55] },
      lt: ['THE COAT WEARER', 'Scorpio frigidus', 2.7], n: ['You know this creature. | You may be it.', 0.3, 2.3] },
    { dur: 3.4, set: (x, t) => { sky(x, '#8fa8c8', '#d8e2ee'); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => coat(x, P, 'scorpio', '#e05a3a'), cast: { scorpio: [[0, 420, Y, 260]] }, mood: { scorpio: 'wide' },
      n: ['At 61 degrees, | the coats come out.', 0.2, 1.7], lines: [[2.0, 1.2, 'scorpio', "it's | freezing."]] },
    { dur: 3.2, set: (x, t) => { sky(x, '#8fa8c8', '#d8e2ee'); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => { coat(x, P, 'scorpio', '#e05a3a'); phoneFlash(x, 760, 1080, t, '61°', lt) }, cast: { scorpio: [[0, 380, Y, 250]] }, mood: { scorpio: 'squint' },
      n: ['It documents the event.', 0.2, 1.5], lines: [[1.8, 1.2, 'scorpio', 'posting it.']] },
    { dur: 3.6, set: (x, t) => { sky(x, '#8fa8c8', '#d8e2ee'); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => coat(x, P, 'scorpio', '#e05a3a'), cast: { scorpio: [[0, 300, Y, 230]], sagittarius: [[0, 1180, Y, 240], [0.6, 780, Y, 240]] }, mood: { scorpio: 'squint', sagittarius: 'happy' },
      lt: ['THE SHORTS WEARER', 'Sagittarius aestivus', 0.2], lines: [[1.2, 1.0, 'sagittarius', 'you good?'], [2.3, 1.1, 'scorpio', 'surviving.']] },
    { dur: 3.2, set: (x, t) => { x.fillStyle = '#3a2a4a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#5a4a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920) }, front: (x, t, lt, P) => { coat(x, P, 'scorpio', '#e05a3a'); soupPot(x, 760, 1180, t) }, cast: { scorpio: [[0, 330, Y, 240]] }, mood: { scorpio: 'heart' },
      n: ['Soup is gathered.', 0.2, 1.4], lines: [[1.7, 1.2, 'scorpio', 'soup.']] },
    { dur: 3.4, set: (x, t) => { sky(x, '#5ec8ff', '#fff0c8'); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => { coat(x, P, 'scorpio', '#e05a3a'); const [cx, cy, s] = P.at('scorpio'); sweat(x, cx + s * 0.3, cy - s * 0.3, t, 4) }, cast: { scorpio: [[0, 420, Y, 250]] }, mood: { scorpio: 'squint' },
      n: ['By 3pm: 79°.', 0.2, 1.3], lines: [[1.6, 1.6, 'scorpio', 'I will not | remove it.']] },
    { dur: 3.4, set: (x, t) => { sky(x, '#8fa8c8', '#d8e2ee'); outside(x, { ground: '#4a5a4a' }) }, front: (x, t, lt, P) => { coat(x, P, 'scorpio', '#e05a3a'); soupPot(x, 540, 1300, t) }, cast: { scorpio: [[0, 330, Y - 30, 230]], sagittarius: [[0, 750, Y - 30, 230]] }, mood: { scorpio: lt => lt > 1.8 ? 'heart' : 'wide', sagittarius: 'happy' },
      lines: [[0.2, 1.4, 'sagittarius', 'share | the soup?'], [1.9, 1.2, 'scorpio', '...yes.']] },
    { dur: 3.6, set: sighting, front: (x, t, lt, P) => coat(x, P, 'scorpio', '#e05a3a'), cast: { scorpio: [[0, 380, Y, 240]], sagittarius: [[0, 700, Y, 240]] }, mood: { scorpio: 'sparkle', sagittarius: 'heart' },
      n: ['Next sighting: Jan 9.', 0.2, 1.4], lines: [[1.7, 1.6, 'scorpio', 'coat | included.']] },
  ],
})

// ── hst258 · The Galveston day-tripper meets the brown water
const castle = (x, cx, base, k) => { if (k <= 0) return; x.save(); x.translate(cx, base); x.scale(k, k); box(x, -80, -90, 160, 90, '#e0c080', 5); box(x, -100, -150, 50, 150, '#e0c080', 5); box(x, 50, -150, 50, 150, '#e0c080', 5); box(x, -20, -130, 40, 40, '#e0c080', 4); x.restore() }
const hst258 = doc({
  hook: 'The Galveston day-tripper | meets the | brown water', endLine: 'The beach can wait. Jan 9.', endStars: ['aquarius', 'cancer', 'sagittarius', 'gemini'],
  scenes: [
    { dur: 3.8, set: (x, t) => gulf(x, t), cast: { aquarius: [[0, 160, Y, 250], [3.2, 420, Y, 250]] }, mood: { aquarius: 'sparkle' }, hops: { aquarius: [0.05] },
      lt: ['THE DAY-TRIPPER', 'Aquarius maritimus', 2.7], n: ['You have made this drive. | Windows down.', 0.3, 2.3] },
    { dur: 3.2, set: (x, t) => gulf(x, t), cast: { aquarius: [[0, 420, Y, 250]] }, mood: { aquarius: 'wide' },
      n: ['It sees the water.', 0.2, 1.3], lines: [[1.6, 1.4, 'aquarius', "it's... | brown."]] },
    { dur: 3.2, set: (x, t) => gulf(x, t), cast: { aquarius: [[0, 420, Y, 250]] }, mood: { aquarius: 'heart' }, hops: { aquarius: [1.6, 2.0] },
      n: ['It loves it anyway.', 0.2, 1.3], lines: [[1.6, 1.4, 'aquarius', 'MY ocean.']] },
    { dur: 3.4, set: (x, t) => gulf(x, t), front: (x, t) => { const gx = 700, gy = 980 + Math.sin(t * 3) * 10; x.fillStyle = INK; x.fillRect(gx - 50, gy - 30, 100, 60); x.fillStyle = BONE; x.fillRect(gx - 44, gy - 24, 88, 48); x.fillStyle = '#ffb02a'; x.fillRect(gx + 44, gy - 10, 30, 14); x.fillStyle = INK; x.fillRect(gx + 20, gy - 16, 10, 10) },
      cast: { aquarius: [[0, 300, Y, 230]] }, mood: { aquarius: 'wide' }, lt: ['A LOCAL GULL', 'Larus galvestonensis', 0.2], lines: [[1.3, 1.6, [700, 1080, 150], 'that fry | is mine now.']] },
    { dur: 3.6, set: (x, t) => gulf(x, t), front: (x, t, lt, P) => specs(x, P, 'cancer'), cast: { aquarius: [[0, 300, Y, 230]], cancer: [[0, 770, Y, 240]] }, mood: { aquarius: 'wide', cancer: 'happy' },
      lt: ['THE BEACH AUNTIE', 'Cancer umbrellifera', 0.2], lines: [[1.2, 1.1, 'cancer', 'baby. | sunscreen.'], [2.4, 1.1, 'aquarius', 'in January?']] },
    { dur: 3.2, set: (x, t) => gulf(x, t), front: (x, t, lt) => castle(x, 720, 1380, Kp(lt, 0.4)), cast: { aquarius: [[0, 330, Y, 230]] }, mood: { aquarius: 'sparkle' },
      n: ['Construction begins.', 0.2, 1.4], lines: [[1.7, 1.3, 'aquarius', "it's a | condo."]] },
    { dur: 3.4, set: (x, t) => { gulf(x, t); x.fillStyle = 'rgba(255,120,80,0.25)'; x.fillRect(0, 0, 1080, 1300); lowSun(x, 540, 880, 90, '#ff9a5a') }, cast: { aquarius: [[0, 400, Y, 240]], cancer: [[0, 700, Y, 230]] }, mood: { aquarius: 'happy', cancer: 'heart' },
      n: ['The drive home. | Sandy. Happy.', 0.2, 1.7], lines: [[2.0, 1.3, 'aquarius', 'same time | next week.']] },
    { dur: 3.6, set: sighting, cast: { aquarius: [[0, 380, Y, 240]], cancer: [[0, 700, Y, 240]] }, mood: { aquarius: 'sparkle', cancer: 'happy' },
      lines: [[0.3, 1.2, 'cancer', 'Jan 9 | first.'], [1.8, 1.5, 'aquarius', 'then | the beach.']] },
  ],
})

// ── hst259 · A Woodlands resident ventures into Houston
const hst259 = doc({
  hook: 'A Woodlands resident | ventures into Houston', endLine: 'Worth the drive in. Jan 9.', endStars: ['libra', 'taurus', 'virgo', 'pisces'],
  scenes: [
    { dur: 3.8, set: (x, t) => pines(x, t), cast: { libra: [[0, 400, Y, 250]] }, mood: { libra: 'happy' }, hops: { libra: [0.05, 0.6] },
      lt: ['THE WOODLANDS RESIDENT', 'Libra arborealis', 2.7], n: ['You are about to see | something brave.', 0.3, 2.3] },
    { dur: 3.2, set: (x, t) => pines(x, t), cast: { libra: [[0, 400, Y, 250]] }, mood: { libra: 'sleepy' },
      n: ['Its habitat: trees, | trails, and calm.', 0.2, 1.6], lines: [[1.9, 1.2, 'libra', 'so | peaceful.']] },
    { dur: 3.2, set: (x, t) => pines(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); phone(x, cx + s * 0.62, cy - 20, 0.9, 'party?', { sub: 'JAN 9' }) }, cast: { libra: [[0, 400, Y, 250]] }, mood: { libra: 'wide' },
      n: ['A signal from the city.', 0.2, 1.3], lines: [[1.6, 1.4, 'libra', 'IN | Houston?']] },
    { dur: 3.4, set: (x, t, lt) => { sky(x, SKIES.noon[0], SKIES.noon[1]); freeway(x, FLOOR - 160, 600, 4, t * 500); overheadSign(x, 540, 820, 'I-45 SOUTH', 'HOUSTON', Kp(lt, 0.1)) }, front: (x, t, lt, P) => { const [cx] = P.at('libra'); car(x, cx, FLOOR + 120, '#c9a6ff', { open: true }) },
      cast: { libra: [[0, 520, FLOOR + 5, 190]] }, mood: { libra: 'squint' }, n: ['It takes I-45 south.', 0.2, 1.3], lines: [[1.6, 1.4, 'libra', 'is it | far?']] },
    { dur: 3.4, set: (x, t) => { sky(x, SKIES.noon[0], SKIES.noon[1]); skyline(x, FLOOR + 60, t); outside(x, { ground: '#4a4a5a' }) }, cast: { libra: [[0, 400, Y, 240]] }, mood: { libra: 'wide' },
      n: ['The buildings. | So many buildings.', 0.2, 1.6], lines: [[1.9, 1.2, 'libra', 'where are | the trees?']] },
    { dur: 3.6, set: (x, t) => { sky(x, SKIES.noon[0], SKIES.noon[1]); skyline(x, FLOOR - 200, t, { alpha: 0.6 }); outside(x, { ground: '#4f8a42' }) }, cast: { libra: [[0, 300, Y, 230]], taurus: [[0, 1180, Y, 240], [0.6, 780, Y, 240]] }, mood: { libra: 'wide', taurus: 'happy' },
      lt: ['A DOWNTOWN LOCAL', 'Taurus urbanus', 0.2], lines: [[1.2, 1.5, 'taurus', 'first time | inside the Loop?']] },
    { dur: 3.4, set: (x, t) => { sky(x, SKIES.noon[0], SKIES.noon[1]); skyline(x, FLOOR - 200, t, { alpha: 0.6 }); outside(x, { ground: '#4f8a42' }) }, cast: { libra: [[0, 330, Y, 230], [1, 420, Y, 230]], taurus: [[0, 780, Y, 240], [1, 680, Y, 240]] }, mood: { libra: 'heart', taurus: 'heart' },
      lines: [[0.2, 1.3, 'taurus', 'we have | a park too.']], n: ['Common ground.', 1.8] },
    { dur: 3.6, set: sighting, cast: { libra: [[0, 380, Y, 240]], taurus: [[0, 700, Y, 240]] }, mood: { libra: 'sparkle', taurus: 'happy' },
      lines: [[0.3, 1.3, 'libra', 'see you | Jan 9!'], [1.9, 1.5, 'libra', "I'll leave | at noon."]] },
  ],
})

// ── hst260 · Rodeo season: the boots leave the closet
const bootFront = (bx, by, s, hop = 0) => (x, t, lt) => boots(x, bx, by - Math.abs(Math.sin(lt * 6)) * 30 * hop, s, '#a0582a')
const hst260 = doc({
  hook: 'Rodeo season: | the boots leave | the closet', endLine: 'Boots on. Jan 9.', endStars: ['virgo', 'pisces', 'taurus', 'aries'],
  scenes: [
    { dur: 3.8, set: (x, t, lt) => closet(x, t, { open: clamp(lt / 1.2) }), front: bootFront(540, 1360, 1.4, 1), cast: { virgo: [[0, 200, Y - 40, 220]] }, mood: { virgo: 'wide' }, hops: { virgo: [0.05] },
      lt: ['THE BOOTS', 'Calceus texanus', 2.7], n: ['You hear it too. | Something in the closet.', 0.3, 2.3] },
    { dur: 3.2, set: (x, t) => closet(x, t), front: (x, t, lt) => { bootFront(540, 1360, 1.4)(x, t, lt); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(200,190,170,0.5)'; x.fillRect(470 + (k * 37) % 140, 1250 - ((lt * 30 + k * 20) % 100), 8, 8) } }, cast: { virgo: [[0, 220, Y - 40, 220]] }, mood: { virgo: 'squint' },
      n: ['For eleven months, | they sleep.', 0.2, 1.6], lines: [[1.9, 1.2, 'virgo', 'dusty.']] },
    { dur: 3.2, set: (x, t) => closet(x, t), front: bootFront(540, 1360, 1.4, 1), cast: { virgo: [[0, 220, Y - 40, 220]] }, mood: { virgo: 'sparkle' },
      n: ['In January, | they awaken.', 0.2, 1.5], lines: [[1.8, 1.3, 'virgo', "it's | time."]] },
    { dur: 3.4, set: (x, t) => closet(x, t), front: (x, t, lt) => { bootFront(700, 1360, 1.5)(x, t, lt); sparkles(x, t, 700, 1260, t - lt + 0.3, 10, 160, 5) }, cast: { virgo: [[0, 330, Y - 30, 230]] }, mood: { virgo: 'squint' }, hops: { virgo: [0.4, 1.0, 1.6, 2.2] },
      lines: [[0.3, 2.6, 'virgo', 'polish. buff. | repeat.']] },
    { dur: 3.6, set: (x, t) => closet(x, t), front: bootFront(700, 1360, 1.5), cast: { virgo: [[0, 300, Y - 30, 220]], pisces: [[0, 1180, Y - 40, 230], [0.6, 820, Y - 40, 230]] }, mood: { virgo: 'happy', pisces: 'wide' },
      lt: ['THE ROOMMATE', 'Pisces sentimentalis', 0.2], lines: [[1.2, 1.1, 'pisces', "they're | so shiny."], [2.4, 1.1, 'pisces', "I'm crying."]] },
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#2a1d42'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 10; k++) { x.fillStyle = [GOLD, PINK, '#8fe3ff'][k % 3]; x.beginPath(); x.arc(100 + k * 100, 420 + Math.sin(t * 2 + k) * 20, 12, 0, Math.PI * 2); x.fill() } x.fillStyle = '#6b4a2a'; x.fillRect(0, FLOOR + 60, 1080, 1920); for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k * 90, FLOOR + 60, 5, 600) } },
      cast: { virgo: [[0, 360, Y, 230], [0.9, 460, Y, 230], [1.8, 360, Y, 230], [2.7, 460, Y, 230]], pisces: [[0, 700, Y, 230], [0.9, 620, Y, 230], [1.8, 700, Y, 230], [2.7, 620, Y, 230]] }, mood: { virgo: 'happy', pisces: 'heart' },
      n: ['The boots seek a dance floor. | Two-step, mostly.', 0.2] },
    { dur: 3.2, set: (x, t) => closet(x, t), cast: { virgo: [[0, 400, Y - 30, 230]], pisces: [[0, 680, Y - 30, 230]] }, mood: { virgo: 'heart', pisces: 'heart' },
      n: ['And a partner.', 0.2, 1.3], lines: [[1.6, 1.4, 'pisces', 'teach me?']] },
    { dur: 3.6, set: sighting, front: (x, t, lt) => { boots(x, 380, Y + 150, 0.6, '#a0582a'); boots(x, 700, Y + 150, 0.6, '#5a3a8a') }, cast: { virgo: [[0, 380, Y - 30, 230]], pisces: [[0, 700, Y - 30, 230]] }, mood: { virgo: 'sparkle', pisces: 'heart' },
      n: ['Next sighting: Jan 9.', 0.2, 1.4], lines: [[1.7, 1.6, 'virgo', 'boots on.']] },
  ],
})

export const W10D = { hst248, hst249, hst250, hst251, hst252, hst253, hst254, hst255, hst256, hst257, hst258, hst259, hst260 }
