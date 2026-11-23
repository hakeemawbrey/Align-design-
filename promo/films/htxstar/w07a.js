// Houston Star Talk · w07 dates (hst161–hst173): "your perfect Houston date, by sign". Direct address: the stars look
// at you. Real public places and generic activities only. Every episode ends on the party ticket (Jan 9).
import { Y, BADGE, STING, SETS, PROPS, card, intro, outro, lesson, LEVELUP, partyCard, label, txt, box, clamp, Kp, GOLD, BONE, PINK, INK, MONO, puffer, sweat, streetSign, BRAKE, MINT, SKYB, LAV } from './w07.js'

const END = (line, stars) => ({ endLen: 6.2, end: (x, t, lt) => partyCard(x, t, lt, { line, stars }) })
const list = (items, o = {}) => items.map(([id, set, place, line, prop], i) => card(id, set, i, { place, lines: line, prop, dur: o.dur || 2.7 }))

// three steps of a date for one sign (STEP 1 / 2 / 3 stickers); `first` shows the sign's name
const steps = (id, rows, i0 = 0, col = GOLD) => rows.map(([set, place, line, prop], j) => card(id, set, i0 + j, { place, lines: line, prop, dur: 3.0, sticker: [j === 0 ? `${id.toUpperCase()} · STEP 1` : `STEP ${j + 1}`, col, 0.05] }))

export const W07A = {
  // ── hst161 · all 12 signs, one date each
  hst161: { hook: 'Your perfect | Houston date, | by your sign', badge: BADGE, cues: STING, ...END('Best date in town: Jan 9.', ['libra', 'scorpio', 'pisces', 'leo']),
    scenes: [
      intro({ set: 'lawn' }),
      ...list([
        ['aries', 'trail', 'MEMORIAL PARK', 'a 6am run date. | then tacos.', 'taco'],
        ['taurus', 'bellaire', 'HILLCROFT', 'chaat and sweets. | share everything.', 'bowl'],
        ['gemini', 'museum', 'FREE MUSEUM THURSDAY', 'three museums. | one night.', null],
        ['cancer', 'porch', 'THE HEIGHTS', 'porch. dog. | dinner you made.', null],
        ['leo', 'karaoke', 'KARAOKE ON BELLAIRE', 'one song. | the whole room sings.', 'mic'],
        ['virgo', 'kolache', 'KOLACHE RUN', 'a planned | kolache tasting.', null],
        ['libra', 'pond', 'HERMANN PARK', 'paddle boats. | golden hour.', null],
        ['scorpio', 'batBridge', 'WAUGH DR BRIDGE', 'bats at sunset. | quiet. intense.', null],
        ['sagittarius', 'beach', 'GALVESTON', 'a day trip. | brown water. no regrets.', null],
        ['capricorn', 'waterwall', 'UPTOWN', 'the waterwall. | then a booked dinner.', null],
        ['aquarius', 'mural', 'MONTROSE', 'a mural walk. | ending somewhere odd.', null],
        ['pisces', 'cistern', 'BUFFALO BAYOU', 'the old cistern. | I cried. beautiful.', null],
      ]),
      outro({ set: 'lawn', big: 'Did we get yours?', lines: ['Comment your sign', '+ your dream date.'] }),
    ] },

  // ── hst162 · fire signs: three-step itineraries
  hst162: { hook: 'Fire signs: | your perfect | Houston date', badge: BADGE, cues: STING, ...END('Fire signs, Jan 9 is yours.', ['aries', 'leo', 'sagittarius', 'gemini']),
    scenes: [
      intro({ set: 'heat', cast: 'trio', ids: ['aries', 'leo', 'sagittarius'] }),
      ...steps('aries', [['trail', 'MEMORIAL PARK', 'a 6am run. | you set the pace.'], ['court', 'PICKLEBALL', 'loser buys | breakfast tacos.', 'paddle'], ['truck', 'TACO TRUCK', 'flour tortilla. | obviously.', 'taco']], 0, BRAKE),
      ...steps('leo', [['waterwall', 'UPTOWN', 'one photo at | the waterwall. ok, forty.'], ['karaoke', 'KARAOKE ON BELLAIRE', 'you get | the solo.', 'mic'], ['night', 'MIDTOWN', 'they clap. | you glow.']], 1, GOLD),
      ...steps('sagittarius', [['beach', 'GALVESTON', 'road trip. | windows down.'], ['truck', 'FOOD TRUCK', "one you've | never tried."], ['bayou', 'BUFFALO BAYOU', 'get lost. | on purpose.']], 0, '#ff9a3c'),
      outro({ set: 'heat', big: 'Fire signs:', lines: ['which step', 'are you skipping?'], ids: ['aries', 'leo', 'sagittarius'] }),
    ] },

  // ── hst163 · earth signs: slow, planned, delicious
  hst163: { hook: 'Earth signs, | your Houston | date is here', badge: BADGE, cues: STING, ...END('Earth signs: Jan 9. Planned.', ['taurus', 'virgo', 'capricorn', 'cancer']),
    scenes: [
      intro({ set: 'garden', cast: 'trio', ids: ['taurus', 'virgo', 'capricorn'] }),
      ...steps('taurus', [['bellaire', 'BELLAIRE BLVD', 'a food crawl. | five stops.', 'bowl'], ['bellaire', 'BOBA', 'second | dessert.', 'boba'], ['porch', 'HOME BY TEN', 'candles. | soft music.']], 0, MINT),
      ...steps('virgo', [['kolache', 'KOLACHE TASTING', 'notes | on each one.'], ['garden', 'JAPANESE GARDEN', 'quiet. | very tidy.'], ['night', 'FEEDER ROAD', 'home before | the traffic. planned.']], 1, SKYB),
      ...steps('capricorn', [['waterwall', 'UPTOWN', 'dinner booked | three weeks ago.'], ['lawn', 'DISCOVERY GREEN', 'a walk. | on schedule.'], ['night', 'DOWNTOWN', 'a plan... | for date two.']], 0, LAV),
      outro({ set: 'garden', big: 'Earth signs:', lines: ['too planned?', 'or just right?'], ids: ['taurus', 'virgo', 'capricorn'] }),
    ] },

  // ── hst164 · air signs: talk, wander, try the new thing
  hst164: { hook: 'Air signs: | your perfect | Houston date', badge: BADGE, cues: STING, ...END('Air signs: talk to you Jan 9.', ['gemini', 'libra', 'aquarius', 'sagittarius']),
    scenes: [
      intro({ set: 'mural', cast: 'trio', ids: ['gemini', 'libra', 'aquarius'] }),
      ...steps('gemini', [['museum', 'FREE MUSEUM THURSDAY', 'three museums. | one night.'], ['truck', 'TWO TRUCKS', 'two tacos. | two trucks.', 'taco'], ['night', 'THE PARKING LOT', 'talk | till it closes.']], 0, GOLD),
      ...steps('libra', [['pond', 'HERMANN PARK', 'golden hour. | matching outfits.'], ['shops', 'RICE VILLAGE', 'every shop. | buy nothing.'], ['bellaire', 'DESSERT', 'you both | pick. fair.', 'boba']], 1, PINK),
      ...steps('aquarius', [['mural', 'MONTROSE', 'find the | weird murals.'], ['cistern', 'THE CISTERN', 'echo test. | very cool.'], ['karaoke', 'KARAOKE', 'a song | nobody knows.', 'mic']], 0, SKYB),
      outro({ set: 'mural', big: 'Air signs:', lines: ['which one', 'are you texting?'], ids: ['gemini', 'libra', 'aquarius'] }),
    ] },

  // ── hst165 · water signs: soft, deep, tearful
  hst165: { hook: 'Water signs, | this date | is for you', badge: BADGE, cues: STING, ...END('Water signs: bring tissues. Jan 9.', ['cancer', 'scorpio', 'pisces', 'taurus']),
    scenes: [
      intro({ set: 'bayou', cast: 'trio', ids: ['cancer', 'scorpio', 'pisces'] }),
      ...steps('cancer', [['porch', 'THE HEIGHTS', 'cook | together.'], ['bayou', 'WHITE OAK TRAIL', 'walk the dog. | bandana on.', 'dog'], ['porch', 'THE GOODBYE', 'leftovers | packed for them.', 'soup']], 0, SKYB),
      ...steps('scorpio', [['batBridge', 'WAUGH DR BRIDGE', 'bats | at sunset.'], ['quiet', 'A QUIET CHAPEL', 'say nothing. | feel everything.'], ['bellaire', 'BELLAIRE BLVD', 'late-night pho. | deep talk.', 'bowl']], 1, LAV),
      ...steps('pisces', [['beach', 'GALVESTON', 'watching | the waves.'], ['marina', 'CLEAR LAKE', 'dreaming | about space.'], ['marina', 'SUNSET', 'crying. | happy crying.']], 0, MINT),
      outro({ set: 'bayou', big: 'Water signs:', lines: ['how many', 'tissues needed?'], ids: ['cancer', 'scorpio', 'pisces'] }),
    ] },

  // ── hst166 · free dates for every sign
  hst166: { hook: 'Free Houston dates | for every sign', badge: BADGE, cues: STING, ...END('Save the date: Jan 9.', ['taurus', 'gemini', 'capricorn', 'pisces']),
    scenes: [
      intro({ set: 'pond' }),
      ...list([
        ['aries', 'bayou', 'BRAYS BAYOU', 'run club. | free. sweaty.'],
        ['taurus', 'lawn', 'DISCOVERY GREEN', 'a picnic | on the lawn.'],
        ['gemini', 'museum', 'FREE MUSEUM THURSDAY', 'every room. | twice.'],
        ['cancer', 'bayou', 'WHITE OAK TRAIL', 'a walk. | dog included.', 'dog'],
        ['leo', 'waterwall', 'THE WATERWALL', 'photos. | so many photos.'],
        ['virgo', 'garden', 'HERMANN PARK', 'the Japanese garden. | calm. raked.'],
        ['libra', 'pond', 'REFLECTION POOL', 'golden hour. | your best angle.'],
        ['scorpio', 'batBridge', 'WAUGH DR BRIDGE', 'the bats | at sunset.'],
        ['sagittarius', 'beach', 'THE SEAWALL', 'sunrise | in Galveston.'],
        ['capricorn', 'lawn', 'MARKET SQUARE', 'a downtown | history walk.'],
        ['aquarius', 'mural', 'MONTROSE', 'mural | hunting.'],
        ['pisces', 'bayou', 'BUFFALO BAYOU', 'the skyline | lights up. I cry.'],
      ]),
      outro({ set: 'pond', big: 'Free and cute.', lines: ['Send this to', 'your date.'] }),
    ] },

  // ── hst167 · it's 55°: the one cold day, a date for each sign
  hst167: { hook: "It's 55° | in Houston. | Your date, by sign", badge: BADGE, cues: STING, ...END('Bring a jacket. Maybe. Jan 9.', ['leo', 'pisces', 'virgo', 'aquarius']),
    scenes: [
      { ...intro({ set: 'cold' }), front: (x, t) => { box(x, 390, 740, 300, 120, '#120c24', 8); txt(x, '55°', 540, 804, { size: 90, col: SKYB, font: MONO, weight: 700 }) } },
      ...[
        ['aries', 'trail', 'MEMORIAL PARK', 'run in shorts. | anyway.'],
        ['taurus', 'bellaire', 'BELLAIRE BLVD', 'pho. | the big bowl.', 'bowl'],
        ['gemini', 'cold', 'THE CAR', 'post the car | thermometer. together.', 'thermo'],
        ['cancer', 'porch', 'HOME', 'soup. blankets | for the plants too.', 'soup'],
        ['leo', 'waterwall', 'UPTOWN', 'finally: | THE COAT.'],
        ['virgo', 'cold', 'THE FORECAST', 'enjoy it. | 80° by Thursday.', 'thermo80'],
        ['libra', 'shops', 'RICE VILLAGE', 'matching | beanies.'],
        ['scorpio', 'bellaire', 'HOT POT', 'hot pot. | dim lights.', 'bowl'],
        ['sagittarius', 'beach', 'GALVESTON', 'the beach | in a puffer. why not.'],
        ['capricorn', 'cold', 'THE PLAN', 'planned this | cold date in October.'],
        ['aquarius', 'mural', 'MONTROSE', "iced coffee. | it's 55."],
        ['pisces', 'cold', 'THE COUCH', "cuddling. | it's practically snow."],
      ].map(([id, set, place, line, prop], i) => ({ ...card(id, set, i, { place, lines: line, prop, dur: 2.7 }), front: ((f) => (x, t, lt, P) => { f(x, t, lt, P); if (!['aries', 'aquarius'].includes(id)) puffer(x, P, id, ['#e05a3a', '#2b5fb0', '#7a3ab0', '#3a9a6a'][i % 4]) })(card(id, set, i, { place, lines: line, prop }).front) })),
      outro({ set: 'cold', big: 'Wear the coat.', lines: ['Comment your sign', '+ your cold-day order.'] }),
    ] },

  // ── hst168 · AC edition: it's always summer
  hst168: { hook: 'Your Houston date, | by sign: | AC edition', badge: BADGE, cues: STING, ...END('Stay cool. See you Jan 9.', ['aquarius', 'leo', 'taurus', 'pisces']),
    scenes: [
      intro({ set: 'heat' }),
      ...list([
        ['aries', 'court', 'PICKLEBALL', 'pickleball. | at 7am. before it melts.', 'paddle'],
        ['taurus', 'truck', 'RASPAS', 'two raspas. | mango. pickle.', 'raspa'],
        ['gemini', 'tunnel', 'THE TUNNELS', 'downtown tunnels. | AC. weekdays only.'],
        ['cancer', 'porch', 'MOVIE NIGHT', 'movie night. | bring a sweater.', 'sweater'],
        ['leo', 'museum', 'THE MUSEUM', "it's freezing in here. | perfect."],
        ['virgo', 'heat', 'THE PARKING LOT', 'parked by shade. | on purpose.', 'car'],
        ['libra', 'truck', 'MANGONADA', 'a mangonada. | the shady table.', 'mango'],
        ['scorpio', 'bayou', 'AFTER DARK', 'a bayou walk. | after sunset.'],
        ['sagittarius', 'beach', 'GALVESTON', 'the breeze | counts as AC.'],
        ['capricorn', 'waterwall', 'DINNER AT 9', 'dinner at 9pm. | cooler. booked.'],
        ['aquarius', 'cistern', 'THE CISTERN', "it's cool | down here."],
        ['pisces', 'heat', 'ANYWHERE', 'crying | in the AC. happily.', 'sun'],
      ]),
      outro({ set: 'heat', big: 'Still summer?', lines: ['Comment your', 'AC date.'] }),
    ] },

  // ── hst169 · your dream Houston date vs. what actually happens (it's still good)
  hst169: (() => {
    const pair = (id, i, [s1, p1, dream], [s2, p2, real], extra = {}) => [
      card(id, s1, i, { place: p1, lines: dream, dur: 2.8, sticker: ['THE DREAM', GOLD, 0.05], mood: 'sparkle' }),
      card(id, s2, i, { place: p2, lines: real, dur: 3.2, sticker: ['WHAT HAPPENED', PINK, 0.05], mood: extra.mood || 'wide', prop: extra.prop }),
    ]
    return { hook: 'Your dream | Houston date | vs. what happens', badge: BADGE, cues: STING, ...END('The real date: Jan 9.', ['sagittarius', 'pisces', 'leo', 'cancer']),
      scenes: [
        intro({ set: 'night' }),
        ...pair('aries', 0, ['trail', 'MEMORIAL PARK', 'a sunrise | run date.'], ['truck', 'THE TACO TRUCK', 'they skipped the run. | brought tacos. better.'], { mood: 'heart', prop: 'taco' }),
        ...pair('leo', 1, ['waterwall', 'UPTOWN', 'rooftop. | city lights.'], ['night', 'STUCK ON 59', 'sang in the car. | best concert ever.'], { mood: 'heart' }),
        ...pair('libra', 0, ['pond', 'HERMANN PARK', 'paddle boats | at golden hour.'], ['pond', 'THE LINE', 'long line. | we fed the ducks. cute.']),
        ...pair('cancer', 1, ['porch', 'HOME', 'a cozy | dinner for two.'], ['porch', 'HOME', 'both moms called. | twice. lovely.'], { prop: 'phone' }),
        ...pair('sagittarius', 0, ['beach', 'GALVESTON', 'a spontaneous | beach trip.'], ['night', 'THE GULF FREEWAY', 'the 45 at 5pm. | we got there. eventually.']),
        ...pair('pisces', 1, ['cold', 'STARGAZING', 'stargazing. | just us.'], ['night', 'HOUSTON SKY', "city glow. one star. | it's a plane. still cried."], { mood: 'heart' }),
        outro({ set: 'night', big: 'Still a great date.', lines: ['Comment your dream', '(and what happened).'] }),
      ] }
  })(),

  // ── hst170 · your sign's perfect Houston food date
  hst170: { hook: "Your sign's | perfect Houston | food date", badge: BADGE, cues: STING, ...END('Come hungry. Jan 9.', ['taurus', 'virgo', 'sagittarius', 'pisces']),
    scenes: [
      { ...intro({ set: 'truck' }) },
      ...list([
        ['aries', 'truck', 'BREAKFAST TACOS', '6am tacos. | flour. fast.', 'taco'],
        ['taurus', 'crawfish', 'CRAWFISH', 'crawfish season. | the whole tray.', 'crawfish'],
        ['gemini', 'kolache', 'KOLACHE OR KLOBASNEK', 'both. | always both.', 'both'],
        ['cancer', 'bellaire', 'HILLCROFT', 'sweets to share | with everyone.', 'heart'],
        ['leo', 'shops', 'BRUNCH', 'brunch. the outfit | was planned first.'],
        ['virgo', 'crawfish', 'VIET-CAJUN', 'bib on. | somehow spotless.', 'crawfish'],
        ['libra', 'bellaire', 'BOBA', "can't choose. | got two.", 'boba'],
        ['scorpio', 'bellaire', 'BELLAIRE BLVD', 'pho | at midnight.', 'bowl'],
        ['sagittarius', 'truck', 'FOOD TRUCK PARK', "a truck you've | never tried.", 'taco'],
        ['capricorn', 'night', 'CHOPPED BEEF', 'chopped beef. | a tradition.'],
        ['aquarius', 'bellaire', 'HOT POT', 'hot pot. | weird combos.', 'bowl'],
        ['pisces', 'lawn', 'JOLLOF + PUFF-PUFF', 'puff-puff | so good I cried.', 'heart'],
      ]),
      outro({ set: 'truck', big: 'Hungry yet?', lines: ['Tag who you', 'eat with.'] }),
    ] },

  // ── hst171 · the crush tells you where to take them (by their sign)
  hst171: (() => {
    const R = [
      ['aries', 'court', 'PICKLEBALL', 'take me to | pickleball.', 'SKIP: a long brunch wait', 'paddle'],
      ['taurus', 'bellaire', 'BELLAIRE BLVD', 'take me on | a food crawl.', 'SKIP: no snacks', 'bowl'],
      ['gemini', 'museum', 'FREE MUSEUM THURSDAY', 'take me to | three museums.', 'SKIP: one single plan', null],
      ['cancer', 'porch', 'YOUR KITCHEN', 'cook | for me.', 'SKIP: a loud club', 'soup'],
      ['leo', 'karaoke', 'KARAOKE', 'take me | to karaoke.', 'SKIP: hiding the outfit', 'mic'],
      ['virgo', 'kolache', 'KOLACHE SHOP', 'a kolache | tasting.', 'SKIP: surprises', null],
      ['libra', 'pond', 'HERMANN PARK', 'golden hour. | paddle boats.', 'SKIP: "you pick"', null],
      ['scorpio', 'batBridge', 'WAUGH DR BRIDGE', 'the bats | at dusk.', 'SKIP: small talk', null],
      ['sagittarius', 'beach', 'GALVESTON', 'a day trip. | right now.', 'SKIP: a 6:15 reservation', null],
      ['capricorn', 'waterwall', 'UPTOWN', 'a booked dinner. | on time.', 'SKIP: being late', null],
      ['aquarius', 'mural', 'MONTROSE', 'the strange | murals.', 'SKIP: the obvious spot', null],
      ['pisces', 'bayou', 'BUFFALO BAYOU', 'the bayou | at sunset.', 'SKIP: nothing. I cry anyway.', null],
    ]
    return { hook: 'Where to take | your crush, | by their sign', badge: BADGE, cues: STING, ...END('Or take them here: Jan 9.', ['scorpio', 'libra', 'cancer', 'aries']),
      scenes: [
        intro({ set: 'pond' }),
        ...R.map(([id, set, place, line, skip, prop], i) => card(id, set, i, { place, lines: line, prop, dur: 2.8, mood: 'heart', sticker: [skip, '#ff5a6e', 1.5] })),
        outro({ set: 'pond', big: 'Got a crush?', lines: ['Send this to them.', '(subtly.)'] }),
      ] }
  })(),

  // ── hst172 · outside the Loop: the suburbs and the coast
  hst172: { hook: 'Outside the Loop? | Your date, | by sign', badge: BADGE, cues: STING, ...END('Every side of town. Jan 9.', ['cancer', 'gemini', 'pisces', 'aquarius']),
    scenes: [
      { ...intro({ set: 'suburbs' }), front: (x, t) => streetSign(x, 540, 790, 'OUTSIDE THE LOOP', { pole: false, sub: '"20 MIN" WITHOUT TRAFFIC' }) },
      ...list([
        ['aries', 'trail', 'KATY', 'the trails. | then the biggest breakfast.'],
        ['taurus', 'lawn', 'SUGAR LAND', 'a stroll around | the town square.'],
        ['gemini', 'suburbs', 'PEARLAND', 'pear puns. | all date long.'],
        ['cancer', 'suburbs', 'CYPRESS', 'family dinner. | every cousin comes.'],
        ['leo', 'marina', 'THE WOODLANDS', 'a waterway boat ride. | wave at everyone.'],
        ['virgo', 'shops', 'SPRING', 'the farmers market. | with a list.'],
        ['libra', 'marina', 'CLEAR LAKE', 'sunset | by the boats.'],
        ['scorpio', 'beach', 'GALVESTON', 'the seawall | at night.'],
        ['sagittarius', 'trail', 'HUMBLE', 'a trail ride. | horses! wow.'],
        ['capricorn', 'trail', 'MEMORIAL', 'a quiet loop. | a plan.'],
        ['aquarius', 'shops', 'TOMBALL', 'antique shops. | the weird old stuff.'],
        ['pisces', 'marina', 'SEABROOK', 'watching boats. | salty tears.'],
      ]),
      outro({ set: 'suburbs', big: 'Inside or outside?', lines: ['Comment your sign', '+ side of town.'] }),
    ] },

  // ── hst173 · January dates (crawfish, king cake, the one cold day…) → everyone ends at the party
  hst173: { hook: 'Your Houston date | this January, | by sign', badge: BADGE, cues: STING, ...END('All 12 signs. One night. Jan 9.', ['pisces', 'leo', 'aries', 'taurus']),
    scenes: [
      { ...intro({ set: 'party' }) },
      ...list([
        ['aries', 'crawfish', 'CRAWFISH', 'first crawfish | of the season.', 'crawfish'],
        ['taurus', 'kolache', 'KING CAKE', 'king cake. | you found the baby.', 'kingcake'],
        ['gemini', 'bellaire', 'BELLAIRE BLVD', 'lunar new year | lanterns going up.', 'lantern'],
        ['cancer', 'porch', 'THE COLD DAY', 'soup on | the one cold day.', 'soup'],
        ['leo', 'shops', 'BOOTS SEASON', 'boots out. | rodeo season.', 'boots'],
        ['virgo', 'museum', 'NEW PLANNER', 'a planner date. | color coded.'],
        ['libra', 'lawn', 'NEW YEAR', 'new year. | new match.', 'heart'],
        ['scorpio', 'night', 'THE BIG GAME', 'the watch party. | very intense.'],
        ['sagittarius', 'beach', 'GALVESTON', 'January beach. | all ours.'],
        ['capricorn', 'waterwall', 'GOALS DINNER', 'a goals dinner. | big plans.'],
        ['aquarius', 'cold', 'FIRST COAT WEEK', 'first coat week. | wears shorts.'],
      ]),
      card('pisces', 'party', 11, { place: 'JAN 9', lines: [[0.15, 1.4, 'the beta party.'], [1.7, 1.4, 'crying already.']], dur: 3.3, mood: 'heart' }),
      outro({ set: 'party', big: 'Or... all 12 of you.', lines: ['Same night.', 'Same party.'] }),
    ] },
}

export const META_A = {
  hst161: { style: 'dates', music: ['pop', 'D', 16101], plain: 'Your perfect Houston date, by your sign', caption: 'Houston beta party: Jan 9. Your perfect Houston date, by sign, from paddle boats to the bat bridge. Did we get yours? Comment your sign and your dream date.' },
  hst162: { style: 'dates', music: ['funk', 'E', 16202], plain: 'Fire signs: your perfect Houston date', caption: 'Houston beta party: Jan 9. Aries, Leo and Sagittarius, your Houston date in three steps. Send this to the fire sign who never sits still.' },
  hst163: { style: 'dates', music: ['lofi', 'F', 16303], plain: 'Earth signs, your Houston date is here', caption: 'Houston beta party: Jan 9. Taurus, Virgo and Capricorn: a food crawl, a kolache tasting and a dinner booked weeks ago. Too planned or just right?' },
  hst164: { style: 'dates', music: ['synthwave', 'A', 16404], plain: 'Air signs: your perfect Houston date', caption: 'Houston beta party: Jan 9. Gemini, Libra and Aquarius: museums, murals and talking till the lot closes. Which air sign are you texting?' },
  hst165: { style: 'dates', music: ['dreamy', 'C', 16505], plain: 'Water signs, this date is for you', caption: 'Houston beta party: Jan 9. Cancer, Scorpio and Pisces: home cooking, bats at sunset and happy tears in Clear Lake. Send this to your water sign.' },
  hst166: { style: 'dates', music: ['chiptune', 'G', 16606], plain: 'Free Houston dates for every sign', caption: 'Houston beta party: Jan 9. Free Houston dates for every sign: bayou run clubs, Discovery Green, the seawall at sunrise. Send this to your next date.' },
  hst167: { style: 'dates', music: ['jazzy', 'Bb', 16707], plain: "It's 55 in Houston. Your date, by sign", caption: "Houston beta party: Jan 9. It's 55 degrees, so it's pho, soup and puffer coats for every sign (and shorts for Aries). What's your cold-day date?" },
  hst168: { style: 'dates', music: ['house', 'D', 16808], plain: 'Your Houston date, by sign: AC edition', caption: 'Houston beta party: Jan 9. Raspas, the downtown tunnels and parking by shade: a Houston date for every sign when it is still summer. Comment your AC date.' },
  hst169: { style: 'dates', music: ['pop', 'G', 16909], plain: 'Your dream Houston date vs. what happens', caption: 'Houston beta party: Jan 9. The dream date vs. what actually happens in Houston (stuck on 59, still a great night). Comment your dream and what happened.' },
  hst170: { style: 'dates', music: ['funk', 'A', 17010], plain: "Your sign's perfect Houston food date", caption: 'Houston beta party: Jan 9. Breakfast tacos, crawfish, pho at midnight and puff-puff: the perfect Houston food date for every sign. Tag who you eat with.' },
  hst171: { style: 'dates', music: ['lofi', 'D', 17111], plain: 'Where to take your crush, by their sign', caption: "Houston beta party: Jan 9. Where to take your crush in Houston, by their sign, and what to skip. Send this to them. Subtly." },
  hst172: { style: 'dates', music: ['synthwave', 'E', 17212], plain: 'Outside the Loop? Your date, by sign', caption: 'Houston beta party: Jan 9. From Katy to Seabrook, a date for every sign outside the Loop. Inside or outside? Comment your sign and your side of town.' },
  hst173: { style: 'dates', music: ['house', 'G', 17313], plain: 'Your Houston date this January, by sign', caption: 'Houston beta party: Jan 9. Crawfish season, king cake, the first coat week: your January date in Houston, by sign. Which one is yours?' },
}
