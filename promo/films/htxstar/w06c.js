// Houston Star Talk · worker w06 · POV scripts hst149–hst160 (see w06.js / w06kit.js)
import { pov, coat, Y, SKIES, holding, sweater, shades, headband, clipboard, dog, thermo, boba, bowl, raspa, kingCake, paddle, ball, boat, sweat, heatSun, taco, kolache, klobasnek, box, PINK, GOLD, MINT, SKYB, LAV, INK, BONE } from './w06kit.js'

const B = (d, set, chip, cap, lines = [], extra = {}) => ({ d, set, chip, cap, lines, ...extra })
const hold = (id, f, side = 1, dy = 20) => (x, t, lt, P) => holding(x, P, id, (a, b) => f(x, a, b), side, dy)
const wear = (f, id, ...a) => (x, t, lt, P) => f(x, P, id, ...a)
const both = (...fs) => (x, t, lt, P) => fs.forEach(f => f && f(x, t, lt, P))
const R = (id, s = 220) => ({ [id]: [[0, 790, Y, s]] })
const drip = id => (x, t, lt, P) => { const [cx, cy, s] = P.at(id); sweat(x, cx + s * 0.3, cy - s * 0.35, t) }
const rally = (x, t, lt) => { const u = (t * 0.9) % 2, k = u < 1 ? u : 2 - u; ball(x, 240 + k * 600, 820 - Math.sin(Math.PI * k) * 260) }
const suitcase = (x, t, lt, P) => { const [cx, cy, s] = P.at('sagittarius'); box(x, cx + s * 0.45, cy - 10, 90, 120, '#e05a3a', 6); box(x, cx + s * 0.45 + 25, cy - 34, 40, 18, INK, 3); x.fillStyle = GOLD; x.fillRect(cx + s * 0.45 + 10, cy + 30, 70, 10) }

export const W06C = {
  // ── hst149 · Gemini · teaching a friend the street-name passwords
  hst149: pov({
    sign: 'gemini', acc: MINT, hook: 'You, a Gemini, | saying Kuykendahl | out loud', end: 'Say it right: Jan 9.', stars: ['gemini', 'aquarius', 'taurus', 'libra'],
    open: { set: 'street', o: { sign: 'KUYKENDAHL', sky: SKIES.noon }, mood: 'wide', cast: { aquarius: [[0, 860, Y + 30, 190]] }, moods: { aquarius: 'squint' } },
    beats: [
      B(3.4, 'street', 'LESSON 1 · KUYKENDAHL', 'your friend from out of town | reads the street sign.', [[0.3, 1.3, 'aquarius', 'kway-ken- | dahl?'], [1.8, 1.4, 'you', "it's KIRK- | en-doll."]], { o: { sign: 'KUYKENDAHL', sky: SKIES.noon }, cast: R('aquarius'), moods: { aquarius: 'wide' } }),
      B(3.4, 'street', 'LESSON 2 · SAN FELIPE', 'next: San Felipe. | you explain it twice.', [[0.3, 1.4, 'you', 'San Fill- | uh-pee.'], [2.0, 1.1, 'aquarius', '...why?']], { o: { sign: 'SAN FELIPE', sky: SKIES.noon }, cast: R('aquarius'), moods: { aquarius: 'squint' }, mood: 'wink' }),
      B(3.0, 'street', 'LESSON 3 · WESTHEIMER', 'Westheimer: you know | every bump by heart.', [[0.5, 2.2, 'you', 'bump. bump. | BIG bump.']], { o: { sign: 'WESTHEIMER', sky: SKIES.noon }, you: [[0, 380, Y, 280], [0.8, 380, Y - 40, 280], [1.0, 380, Y, 280], [1.6, 380, Y - 70, 280], [1.9, 380, Y, 280]], mood: 'wide' }),
      B(3.4, 'feeder', 'LESSON 4 · FEEDER ROAD', 'you explain the feeder road. | they are amazed.', [[0.3, 1.4, 'you', 'a road next | to the road.'], [2.0, 1.1, 'aquarius', 'genius.']], { o: { shield: '59', sky: SKIES.noon }, you: [380, 1300, 240], cast: { aquarius: [[0, 790, 1300, 200]] }, moods: { aquarius: 'sparkle' } }),
      B(3.0, 'feeder', 'LESSON 5 · THE U-TURN', 'then: the Texas U-turn.', [[0.5, 2.2, 'you', 'no light. | just turn.']], { o: { over: 'U-TURN', sub: 'NO LIGHT NEEDED', sky: SKIES.noon }, you: [[0, 200, 1300, 240], [1.4, 860, 1300, 240], [2.6, 540, 1300, 240]], mood: 'sparkle' }),
      B(3.6, 'street', 'LESSON 6 · DISTANCE', 'you measure everything | in minutes.', [[0.3, 1.2, 'you', '20 minutes, | no traffic.'], [1.6, 0.9, 'aquarius', 'and with?'], [2.6, 0.9, 'you', '...an hour.']], { o: { sign: 'BELTWAY 8', sky: SKIES.gold }, cast: R('aquarius'), moods: { aquarius: 'wide' } }),
      B(3.4, 'night', "LESSON 7 · Y'ALL", "by night, your friend | says \"y'all.\"", [[0.3, 1.3, 'aquarius', "y'all ready | for tacos?"], [1.8, 1.4, 'you', "they're | one of us!"]], { cast: R('aquarius'), moods: { aquarius: 'sparkle' }, mood: 'heart' }),
      B(3.4, 'truck', 'GRADUATION', 'final test. | they say it right.', [[0.3, 1.3, 'aquarius', 'KIRK-en- | doll.'], [1.8, 1.4, 'you', 'welcome | to Houston.']], { cast: R('aquarius'), moods: { aquarius: 'happy' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'final exam: | the beta party.', [[0.5, 2.4, 'you', 'say it | with me: Jan 9.']], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst150 · Cancer · arctic AC (a sweater for everyone)
  hst150: pov({
    sign: 'cancer', acc: SKYB, hook: "Houston Cancer, | this one's about you", end: 'Bring a sweater. Jan 9.', stars: ['cancer', 'scorpio', 'virgo', 'gemini'],
    open: { set: 'office', o: { snow: 16 }, front: wear(sweater, 'cancer', '#c0304a'), mood: 'squint' },
    beats: [
      B(3.0, 'bedroom', '7:00 AM · 91° OUTSIDE', "it's 91° outside. | you pack three sweaters.", [[0.5, 2.2, 'you', 'one for me. | two for you.']], { o: { sky: SKIES.noon, wall: '#3a5a7a' }, mood: 'happy' }),
      B(3.4, 'office', '9:00 AM · THE OFFICE', 'the office AC is arctic. | your coworker is shivering.', [[0.3, 1.2, 'virgo', 'is it | snowing?'], [1.7, 1.4, 'you', 'sweater?']], { cast: R('virgo'), moods: { virgo: 'squint' }, front: wear(sweater, 'cancer', '#c0304a') }),
      B(3.0, 'office', '9:05 AM · THE OFFICE', 'you hand over sweater one.', [[0.3, 1.2, 'virgo', "you're | an angel."], [1.7, 1.2, 'you', 'I know.']], { cast: R('virgo'), moods: { virgo: 'heart' }, front: both(wear(sweater, 'cancer', '#c0304a'), wear(sweater, 'virgo', '#3f8a4a')), mood: 'wink' }),
      B(3.0, 'movies', '7:00 PM · THE MOVIES', 'the theater is a freezer. | you came prepared.', [[0.5, 2.2, 'you', 'blanket. | in my bag.']], { front: wear(sweater, 'cancer', '#c0304a'), mood: 'sparkle' }),
      B(3.4, 'movies', '7:10 PM · DATE NIGHT', 'your date wore shorts. | to a freezer.', [[0.3, 1.2, 'scorpio', "it's 90° | outside!"], [1.7, 1.4, 'you', 'sweater | two.']], { cast: R('scorpio'), moods: { scorpio: 'squint' }, front: wear(sweater, 'cancer', '#c0304a') }),
      B(3.4, 'movies', '7:20 PM · DATE NIGHT', 'they look at you like | you invented warmth.', [[0.3, 1.3, 'scorpio', 'you think of | everything.'], [1.8, 1.3, 'you', 'I do.']], { cast: R('scorpio'), moods: { scorpio: 'heart' }, front: both(wear(sweater, 'cancer', '#c0304a'), wear(sweater, 'scorpio', '#2b5fb0')), mood: 'heart' }),
      B(3.0, 'street', 'NEXT DAY · 93°', 'outside, you melt. | inside, you freeze.', [[0.5, 2.2, 'you', 'two | seasons.']], { o: { sky: SKIES.noon, sign: 'MAIN ST' }, front: drip('cancer'), mood: 'squint' }),
      B(3.6, 'brunch', 'SUNDAY · BRUNCH', 'the whole group asks: | "got a sweater?"', [[0.3, 1.0, 'gemini', 'sweater?'], [1.4, 0.9, 'leo', 'me too?'], [2.4, 1.1, 'you', 'I brought | eight.']], { cast: { gemini: [[0, 790, Y, 200]], leo: [[0, 160, Y + 40, 180]] }, you: [460, Y, 270], moods: { gemini: 'wide', leo: 'sparkle' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'it might be 80° outside. | inside? bring one.', [[0.5, 2.4, 'you', "I've got | yours."]], { you: [540, Y, 300], mood: 'heart', front: wear(sweater, 'cancer', '#c0304a') }),
    ],
  }),

  // ── hst151 · Leo · karaoke on Bellaire
  hst151: pov({
    sign: 'leo', acc: GOLD, hook: 'Hey Leo. | This is you, | at karaoke.', end: 'Your fans await. Jan 9.', stars: ['leo', 'virgo', 'aquarius', 'pisces'],
    open: { set: 'karaoke', o: { lyric: 'la la la, Houston!' }, mood: 'sparkle', front: (x, t) => null },
    beats: [
      B(3.0, 'bellaire', '9:00 PM · BELLAIRE BLVD', 'your friends said | "just one song."', [[0.5, 2.2, 'you', 'one song. | sure.']], { mood: 'wink' }),
      B(3.0, 'karaoke', '9:30 PM · THE ROOM', 'you pick your song before | you even sit down.', [[0.5, 2.2, 'you', "I'll go | first."]], { o: { lyric: 'ooh, the city lights...' }, you: [420, 1240, 270], mood: 'sparkle' }),
      B(3.0, 'karaoke', '9:32 PM · THE HIGH NOTE', 'you hit the high note. | mostly.', [[0.6, 2.1, 'you', 'thank you, | Houston!']], { o: { lyric: 'oh-oh-oh-OHHH!' }, you: [420, 1240, 270], mood: 'wide', hops: {} }),
      B(3.4, 'karaoke', '10:00 PM · A TURN', 'your friend wants a turn.', [[0.3, 1.2, 'virgo', 'can I | sing one?'], [1.7, 1.4, 'you', 'of course. | duet?']], { o: { lyric: 'la la la la...' }, you: [360, 1240, 260], cast: R('virgo'), moods: { virgo: 'sparkle' }, mood: lt => lt < 1.6 ? 'squint' : 'happy' }),
      B(3.4, 'karaoke', '10:20 PM · THE DUET', 'you share the mic. | the duet is a hit.', [[0.3, 1.3, 'virgo', 'we sound | amazing!'], [1.8, 1.4, 'you', 'WE do.']], { o: { lyric: 'together now...' }, you: [360, 1240, 260], cast: R('virgo'), moods: { virgo: 'heart' }, mood: 'heart' }),
      B(3.4, 'karaoke', '11:00 PM · ENCORE', 'the room next door | asks for an encore.', [[0.3, 1.1, 'aquarius', 'one | more!'], [1.6, 1.5, 'you', 'if you | insist.']], { o: { lyric: 'one more time!' }, you: [360, 1240, 260], cast: { aquarius: [[0, 1250, Y, 220], [0.3, 790, Y, 220]] }, moods: { aquarius: 'sparkle' }, mood: 'wink' }),
      B(3.4, 'bellaire', '12:00 AM · AFTER', 'the stranger says | "you made my night."', [[0.3, 1.3, 'aquarius', 'same time | next week?'], [1.8, 1.4, 'you', "it's a | standing date."]], { cast: R('aquarius'), moods: { aquarius: 'heart' }, mood: 'heart' }),
      B(3.0, 'bellaire', '12:30 AM · LATE BOBA', 'boba, to save | your voice.', [[0.5, 2.2, 'you', 'for the | vocal cords.']], { front: hold('leo', (x, a, b) => boba(x, a, b, 0.85)), mood: 'happy' }),
      B(3.2, 'party', 'JAN 9', 'you are already | warming up.', [[0.5, 2.4, 'you', 'mi mi mi | mi MI.']], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst152 · Virgo · kolache vs klobasnek (gently corrected)
  hst152: pov({
    sign: 'virgo', acc: '#ffb35c', hook: "POV: a Virgo hears | 'sausage kolache'", end: 'Correct with love. Jan 9.', stars: ['virgo', 'sagittarius', 'taurus', 'cancer'],
    open: { set: 'kolache', mood: 'squint', front: wear(clipboard, 'virgo') },
    beats: [
      B(3.0, 'kolache', '7:00 AM · THE BAKERY', 'Saturday. the bakery line. | your happy place.', [[0.5, 2.2, 'you', 'the sweet ones | are kolaches.']], { mood: 'happy' }),
      B(3.4, 'kolache', '7:05 AM · THE ORDER', 'the cute person ahead | orders "sausage kolaches."', [[0.3, 1.3, 'sagittarius', 'two sausage | kolaches!'], [1.9, 1.3, 'you', '...']], { cast: R('sagittarius'), moods: { sagittarius: 'sparkle' }, mood: 'wide' }),
      B(3.0, 'kolache', '7:06 AM · THE ORDER', 'you could stay quiet. | you could.', [[0.6, 2.0, 'you', 'technically...']], { mood: 'squint', cast: R('sagittarius'), moods: { sagittarius: 'happy' } }),
      B(3.0, 'kolache', '7:06 AM · THE LESSON', 'you explain it. kindly. | with a diagram.', [[0.5, 2.2, 'you', 'with sausage? | klobasnek.']], { front: wear(clipboard, 'virgo'), cast: R('sagittarius'), moods: { sagittarius: 'wide' } }),
      B(3.4, 'kolache', '7:08 AM · PLOT TWIST', 'they are... into it?', [[0.3, 1.2, 'sagittarius', 'tell me | more.'], [1.7, 1.4, 'you', '...really?']], { cast: R('sagittarius'), moods: { sagittarius: 'heart' }, mood: lt => lt < 2.4 ? 'wide' : 'heart' }),
      B(3.4, 'kolache', '7:30 AM · THE TABLE', 'you share one of each. | for science.', [[0.3, 1.2, 'you', 'fruit. | sausage.'], [1.7, 1.4, 'sagittarius', 'both | perfect.']], { cast: R('sagittarius'), moods: { sagittarius: 'happy' }, front: both(hold('virgo', (x, a, b) => kolache(x, a, b, 0.7)), hold('sagittarius', (x, a, b) => klobasnek(x, a, b, 0.6), -1)) }),
      B(3.4, 'bayou', '8:30 AM · A WALK', 'you walk off the pastry. | you keep talking.', [[0.3, 1.3, 'sagittarius', 'next week: | tacos?'], [1.8, 1.4, 'you', 'flour or | corn? discuss.']], { cast: R('sagittarius'), moods: { sagittarius: 'sparkle' }, mood: 'heart' }),
      B(3.4, 'kolache', 'NEXT SATURDAY', 'they order for you. | correctly.', [[0.3, 1.3, 'sagittarius', 'one klobasnek, | please.'], [1.8, 1.4, 'you', 'that was | perfect.']], { cast: R('sagittarius'), moods: { sagittarius: 'wink' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'you will gently correct | someone at the party.', [[0.5, 2.4, 'you', 'with love. | always.']], { you: [540, Y, 300], mood: 'wink', front: wear(clipboard, 'virgo') }),
    ],
  }),

  // ── hst153 · Libra · a paddle boat first date in Hermann Park
  hst153: (() => {
    const pb = (x, t) => boat(x, 540, Y + 30, t, '#ff8fb1')
    const inBoat = { you: [420, Y - 40, 200], cast: { aries: [[0, 670, Y - 40, 190]] } }
    return pov({
      sign: 'libra', acc: '#ff8fb1', hook: 'You, a Libra, | steering a | paddle boat', end: 'A balanced plan: Jan 9.', stars: ['libra', 'aries', 'pisces', 'taurus'],
      open: { set: 'paddle', front: pb, cast: { aries: [[0, 670, Y - 40, 190]] }, moods: { aries: 'sparkle' }, mood: 'happy', you: [420, Y - 40, 200] },
      beats: [
        B(3.0, 'bedroom', '10:00 AM · SATURDAY', 'first date idea: | Hermann Park.', [[0.5, 2.2, 'you', 'paddle boats. | so romantic.']], { mood: 'heart', o: { wall: '#7a4a6a' } }),
        B(3.4, 'paddle', '11:00 AM · THE POND', 'you both get in. | you both pedal.', [[0.3, 1.1, 'aries', 'faster!'], [1.6, 1.4, 'you', 'balanced!']], { ...inBoat, moods: { aries: 'squint' }, front: pb }),
        B(3.4, 'paddle', '11:05 AM · THE POND', 'you go in a circle. | a perfect circle.', [[0.3, 1.2, 'you', "we're | so even."], [1.7, 1.4, 'aries', "we're | SPINNING."]], { ...inBoat, moods: { aries: 'wide' }, front: pb, mood: 'sparkle' }),
        B(3.0, 'paddle', '11:10 AM · THE POND', 'you agree to take | turns steering.', [[0.5, 2.2, 'you', 'your turn. | then mine.']], { ...inBoat, moods: { aries: 'happy' }, front: pb }),
        B(3.0, 'paddle', '11:20 AM · THE POND', "it's 82° in January. | you both sweat.", [[0.5, 2.2, 'you', 'cute | though.']], { ...inBoat, moods: { aries: 'squint' }, front: both(pb, drip('libra'), drip('aries')), o: { sky: SKIES.noon }, mood: 'wink' }),
        B(3.0, 'lawn', '12:00 PM · THE PICNIC', 'after: a picnic. | you split everything.', [[0.5, 2.2, 'you', 'half for you. | half for me.']], { o: { sky: SKIES.noon }, cast: R('aries'), moods: { aries: 'heart' }, front: hold('libra', (x, a, b) => taco(x, a, b, 0.8)) }),
        B(3.4, 'lawn', '12:30 PM · THE QUESTION', 'they ask what YOU want. | you actually say.', [[0.3, 1.2, 'aries', 'what do | YOU want?'], [1.7, 1.5, 'you', 'tacos. | and a round two.']], { o: { sky: SKIES.noon }, cast: R('aries'), moods: { aries: 'sparkle' }, mood: 'heart' }),
        B(3.0, 'paddle', 'NEXT SATURDAY', 'round two. | no circles this time.', [[0.5, 2.2, 'you', 'we found | our rhythm.']], { ...inBoat, moods: { aries: 'heart' }, front: pb, o: { sky: SKIES.sunset }, mood: 'heart' }),
        B(3.2, 'party', 'JAN 9', 'next date idea: | the beta party.', [[0.5, 2.4, 'you', 'a perfectly | balanced plan.']], { you: [540, Y, 300], mood: 'sparkle' }),
      ],
    })
  })(),

  // ── hst154 · Scorpio · a secret Montrose Saturday
  hst154: pov({
    sign: 'scorpio', acc: LAV, hook: 'Only a | Montrose Scorpio | will get this', end: 'Mysterious arrival. Jan 9.', stars: ['scorpio', 'pisces', 'aquarius', 'virgo'],
    open: { set: 'mural', front: wear(shades, 'scorpio'), mood: 'squint' },
    beats: [
      B(3.0, 'mural', '11:00 AM · MONTROSE', 'you know a mural | nobody else has found.', [[0.5, 2.2, 'you', "don't post | this one."]], { front: wear(shades, 'scorpio'), mood: 'wink' }),
      B(3.0, 'vintage', '12:00 PM · VINTAGE', 'you only shop vintage. | all black. always.', [[0.5, 2.2, 'you', "this one's | darker."]], { front: wear(shades, 'scorpio'), mood: 'squint' }),
      B(3.4, 'vintage', '12:10 PM · VINTAGE', 'someone reaches for | the same jacket.', [[0.3, 1.2, 'pisces', 'oh! | sorry!'], [1.7, 1.4, 'you', '...take it.']], { cast: R('pisces'), moods: { pisces: 'wide' }, mood: 'neutral' }),
      B(3.4, 'vintage', '12:12 PM · VINTAGE', 'they tear up. | of course they do.', [[0.3, 1.2, 'pisces', "it's | perfect."], [1.7, 1.4, 'you', 'it suits | you.']], { cast: R('pisces'), moods: { pisces: 'heart' }, mood: 'happy' }),
      B(3.0, 'street', '1:00 PM · WESTHEIMER', 'you show them | your secret spots.', [[0.5, 2.2, 'you', 'plant shop. | then tacos.']], { o: { sign: 'WESTHEIMER', sky: SKIES.haze }, cast: R('pisces'), moods: { pisces: 'sparkle' } }),
      B(3.4, 'vintage', '2:00 PM · THE PLANT SHOP', 'you own a lot of plants. | they all have names.', [[0.3, 1.2, 'you', 'this is | Gregory.'], [1.7, 1.4, 'pisces', 'hi, | Gregory!']], { cast: R('pisces'), moods: { pisces: 'heart' }, mood: 'wink' }),
      B(3.4, 'mural', '5:00 PM · THE MURAL', 'you show them the mural. | nobody gets to see it.', [[0.3, 1.3, 'pisces', "you're | letting me in?"], [1.8, 1.4, 'you', '...yeah. | I am.']], { cast: R('pisces'), moods: { pisces: 'heart' }, mood: 'heart' }),
      B(3.0, 'night', '9:00 PM · MONTROSE', 'you said "one hour." | it has been nine.', [[0.5, 2.2, 'you', 'felt like | one.']], { o: { sign: 'MONTROSE' }, cast: R('pisces'), moods: { pisces: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'you will arrive | mysteriously.', [[0.5, 2.4, 'you', 'and leave | with a friend.']], { you: [540, Y, 300], mood: 'wink', front: wear(shades, 'scorpio') }),
    ],
  }),

  // ── hst155 · Sagittarius · your first month in Houston
  hst155: pov({
    sign: 'sagittarius', acc: '#ff9a3c', hook: 'You, a Sagittarius, | new in Houston', end: 'Welcome home. Jan 9.', stars: ['sagittarius', 'libra', 'cancer', 'aries'],
    open: { set: 'street', o: { sign: 'HOUSTON', sky: SKIES.gold }, front: suitcase, mood: 'sparkle' },
    beats: [
      B(3.4, 'street', 'WEEK 1 · THE QUESTION', 'everyone asks where | you are from originally.', [[0.3, 1.3, 'cancer', 'where you | from, baby?'], [1.8, 1.4, 'you', '...here? | now?']], { o: { sign: 'HOUSTON', sky: SKIES.noon }, cast: R('cancer'), moods: { cancer: 'heart' }, mood: 'wide', front: suitcase }),
      B(3.0, 'freeway', 'WEEK 1 · THE LOOPS', 'you learn there are | three loops.', [[0.5, 2.2, 'you', 'THREE? | why?']], { o: { shield: '610', sky: SKIES.noon, move: true }, you: [380, 1300, 240], mood: 'wide' }),
      B(3.0, 'feeder', 'WEEK 1 · FEEDER ROAD', 'you discover feeder roads.', [[0.5, 2.2, 'you', 'a bonus | road!']], { o: { sky: SKIES.noon }, you: [380, 1300, 240], mood: 'sparkle' }),
      B(3.0, 'street', 'WEEK 2 · THE HEAT', 'it is November. | it is 84°.', [[0.5, 2.2, 'you', 'is it always | summer?']], { o: { sky: SKIES.noon, sign: 'LOUISIANA ST' }, front: drip('sagittarius'), mood: 'squint' }),
      B(3.0, 'bellaire', 'WEEK 2 · BELLAIRE BLVD', 'you eat around the world | on one street.', [[0.5, 2.2, 'you', "I'm never | leaving."]], { front: hold('sagittarius', (x, a, b) => bowl(x, a, b + 10, 0.7)), mood: 'heart' }),
      B(3.0, 'porch', "WEEK 3 · Y'ALL", 'you say "y\'all" | by accident.', [[0.5, 2.2, 'you', "y'all... | I'm home."]], { o: { col: '#c9e06a' }, front: (x, t) => dog(x, 800, Y + 120, t, '#6b4a2c', '#2b5fb0'), mood: 'heart' }),
      B(3.4, 'bayou', 'WEEK 3 · RUN CLUB', 'you join a run club. | you make ten friends.', [[0.3, 1.2, 'aries', 'new? | run with us!'], [1.7, 1.4, 'you', 'obviously!']], { cast: { aries: [[0, 1250, Y, 210], [0.4, 790, Y, 210]] }, moods: { aries: 'sparkle' } }),
      B(3.4, 'truck', 'WEEK 4 · A DATE', 'someone asks you out. | to a taco truck.', [[0.3, 1.3, 'libra', 'so where are | you from?'], [1.8, 1.4, 'you', '...Houston.']], { cast: R('libra'), moods: { libra: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'your first | Houston party.', [[0.5, 2.4, 'you', "I'm from | here now."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst156 · Capricorn · oak pollen vs a clean car
  hst156: pov({
    sign: 'capricorn', acc: '#c9e06a', hook: "Your sign is | Capricorn. It's | pollen season.", end: 'Clean car. For now. Jan 9.', stars: ['capricorn', 'gemini', 'virgo', 'leo'],
    open: { set: 'pollenCar', o: { n: 60 }, mood: 'wide', you: [760, Y, 260] },
    beats: [
      B(3.0, 'pollenCar', 'SUNDAY · 5 PM', 'you washed your car. | it is spotless.', [[0.5, 2.2, 'you', 'perfect.']], { o: { clean: true, n: 0 }, you: [820, Y, 240], mood: 'wink' }),
      B(3.0, 'pollenCar', 'MONDAY · 8 AM', 'it is now yellow.', [[0.6, 2.0, 'you', '...what.']], { o: { n: 50 }, you: [820, Y, 240], mood: 'wide' }),
      B(3.0, 'pollenCar', 'MONDAY · 8:05 AM', 'the oak trees | have spoken.', [[0.5, 2.2, 'you', 'I have | a plan.']], { o: { n: 50 }, you: [820, Y, 240], mood: 'squint', front: wear(clipboard, 'capricorn', -1) }),
      B(3.0, 'parking', 'TUESDAY · THE PLAN', 'you park far away from | every single tree.', [[0.5, 2.2, 'you', 'no trees. | no pollen.']], { you: [760, Y, 250], mood: 'wink' }),
      B(3.0, 'parking', 'TUESDAY · 3 PM', 'no shade either. | the car is an oven.', [[0.5, 2.2, 'you', '...a | trade-off.']], { you: [760, Y, 250], front: drip('capricorn'), mood: 'squint' }),
      B(3.0, 'pollenCar', 'WEDNESDAY', 'you wash it again. | it is yellow again.', [[0.5, 2.2, 'you', 'this is | fine.']], { o: { n: 60 }, you: [820, Y, 240], mood: 'neutral' }),
      B(3.4, 'pollenCar', 'THURSDAY', 'a neighbor waves. | their car is yellow too.', [[0.3, 1.2, 'gemini', 'matching | cars!'], [1.7, 1.4, 'you', "...we're | a set."]], { o: { n: 40 }, you: [820, Y, 240], cast: { gemini: [[0, -200, Y + 40, 200], [0.4, 160, Y + 40, 200]] }, moods: { gemini: 'sparkle' }, mood: 'happy' }),
      B(3.4, 'coffee', 'FRIDAY · COFFEE', 'you get coffee with | the yellow-car neighbor.', [[0.3, 1.2, 'gemini', 'pollen | buddies?'], [1.7, 1.4, 'you', 'pollen | buddies.']], { cast: R('gemini'), moods: { gemini: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'you will arrive | in a clean car.', [[0.5, 2.4, 'you', 'for about | ten minutes.']], { you: [540, Y, 300], mood: 'wink' }),
    ],
  }),

  // ── hst157 · Aquarius · a city with no zoning
  hst157: pov({
    sign: 'aquarius', acc: '#5ee0ff', hook: 'Only an Aquarius | in Houston | gets this', end: 'Embrace the remix. Jan 9.', stars: ['aquarius', 'capricorn', 'gemini', 'sagittarius'],
    open: { set: 'nozoning', mood: 'sparkle', you: [540, Y + 40, 280] },
    beats: [
      B(3.0, 'nozoning', '9:00 AM · YOUR STREET', 'a mansion, a taco stand | and a tire shop. one block.', [[0.5, 2.2, 'you', 'perfect city | planning.']], { you: [540, Y + 40, 260], mood: 'wink' }),
      B(3.0, 'nozoning', '9:10 AM · YOUR STREET', 'you love it. | it makes no sense.', [[0.5, 2.2, 'you', 'chaos is | my aesthetic.']], { you: [540, Y + 40, 260], mood: 'sparkle' }),
      B(3.0, 'mural', '12:00 PM · A WAREHOUSE', 'an art show inside | an old warehouse.', [[0.5, 2.2, 'you', 'Houston is | a remix.']], { mood: 'heart' }),
      B(3.0, 'bayou', '3:00 PM · ON A BIKE', 'you bike everywhere. | in 90°.', [[0.5, 2.2, 'you', '...on | purpose.']], { o: { sky: SKIES.noon }, you: [[0, 200, Y, 260], [2.8, 860, Y, 260]], front: drip('aquarius'), mood: 'squint' }),
      B(3.0, 'bellaire', '6:00 PM · BELLAIRE', 'you order the dish | you have never heard of.', [[0.5, 2.2, 'you', 'surprise | me.']], { front: hold('aquarius', (x, a, b) => bowl(x, a, b + 10, 0.7)), mood: 'sparkle' }),
      B(3.4, 'nozoning', '8:00 PM · THE TACO STAND', 'someone asks why | you love it here.', [[0.3, 1.2, 'capricorn', "it's so | random."], [1.7, 1.4, 'you', "that's | the point."]], { you: [380, Y + 40, 250], cast: { capricorn: [[0, 820, Y + 40, 210]] }, moods: { capricorn: 'squint' } }),
      B(3.4, 'nozoning', '8:20 PM · THE TACO STAND', 'you buy them the best | taco on the block.', [[0.3, 1.2, 'capricorn', 'next to | a mansion?'], [1.7, 1.4, 'you', 'trust | the chaos.']], { you: [380, Y + 40, 250], cast: { capricorn: [[0, 820, Y + 40, 210]] }, moods: { capricorn: 'wide' }, front: hold('capricorn', (x, a, b) => taco(x, a, b, 0.8), -1) }),
      B(3.4, 'night', '10:00 PM · A ROOFTOP', 'they get it now.', [[0.3, 1.2, 'capricorn', 'I love | the chaos.'], [1.7, 1.4, 'you', 'welcome | to Houston.']], { cast: R('capricorn'), moods: { capricorn: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'a beta party in | a city with no rules.', [[0.5, 2.4, 'you', 'my kind | of party.']], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst158 · Pisces · 80° in January (and a brand-new coat)
  hst158: pov({
    sign: 'pisces', acc: '#ff8fd0', hook: "Your sign is Pisces. | It's 80° in January.", end: 'Pack tissues. Jan 9.', stars: ['pisces', 'leo', 'cancer', 'libra'],
    open: { set: 'street', o: { sky: SKIES.gold, sign: 'JANUARY' }, front: (x, t) => heatSun(x, 200, 760, t, 70), mood: 'wide' },
    beats: [
      B(3.0, 'bedroom', 'JANUARY · 7 AM', 'you bought a cute coat | for winter.', [[0.5, 2.2, 'you', 'finally. | coat season.']], { front: wear(coat, 'pisces', '#c9a6ff', '#ff8fb1'), mood: 'heart' }),
      B(3.0, 'street', 'JANUARY · 8 AM', 'it is 80°. | in January.', [[0.5, 2.2, 'you', 'but... | the coat.']], { o: { sky: SKIES.gold }, front: (x, t) => thermo(x, 830, 980, '80°', '#ff3a4e'), mood: 'wide' }),
      B(3.0, 'bedroom', 'JANUARY · 8:10 AM', 'you wear it anyway. | for one photo.', [[0.5, 2.2, 'you', 'for the | memories.']], { front: both(wear(coat, 'pisces', '#c9a6ff', '#ff8fb1'), drip('pisces')), mood: 'wink' }),
      B(3.0, 'lawn', 'NOON · DISCOVERY GREEN', 'you see a dog in | a tiny sweater.', [[0.5, 2.2, 'you', "he's | so brave."]], { o: { sky: SKIES.noon }, front: (x, t) => dog(x, 800, Y + 120, t, '#e8d2a0', '#c9a6ff'), mood: 'heart' }),
      B(3.4, 'lawn', '12:30 PM · DISCOVERY GREEN', "the dog's human says hi.", [[0.3, 1.2, 'leo', 'he likes | you.'], [1.7, 1.4, 'you', 'I love | HIM.']], { o: { sky: SKIES.noon }, cast: { leo: [[0, 1250, Y - 60, 200], [0.4, 820, Y - 60, 200]] }, front: (x, t) => dog(x, 700, Y + 120, t, '#e8d2a0', '#c9a6ff'), moods: { leo: 'happy' }, mood: 'heart' }),
      B(3.4, 'truck', '1:00 PM · A RASPA', 'so warm you get a raspa. | together. in January.', [[0.3, 1.2, 'leo', 'winter | flavor?'], [1.7, 1.4, 'you', 'mango. | always.']], { o: { sky: SKIES.noon }, cast: R('leo'), moods: { leo: 'wink' }, front: hold('pisces', (x, a, b) => raspa(x, a, b, 0.85)), mood: 'sparkle' }),
      B(3.0, 'lawn', '5:30 PM · SUNSET', 'the sunset is pink. | you cry. of course.', [[0.5, 2.2, 'you', "it's so | pretty!"]], { o: { sky: SKIES.sunset }, cast: R('leo'), moods: { leo: 'heart' }, mood: 'heart' }),
      B(3.4, 'night', '9:00 PM · 61°', 'it finally cools down. | coat time.', [[0.3, 1.2, 'you', 'my | moment!'], [1.7, 1.4, 'leo', 'it suits | you.']], { cast: R('leo'), moods: { leo: 'heart' }, front: wear(coat, 'pisces', '#c9a6ff', '#ff8fb1'), mood: 'sparkle' }),
      B(3.2, 'party', 'JAN 9', 'Jan 9: coat or no coat. | you will cry either way.', [[0.5, 2.4, 'you', 'I packed | tissues.']], { you: [540, Y, 300], mood: 'heart' }),
    ],
  }),

  // ── hst159 · Aries · the pickleball era
  hst159: pov({
    sign: 'aries', acc: MINT, hook: "If you're an Aries: | your pickleball era", end: 'Game on. Jan 9.', stars: ['aries', 'scorpio', 'taurus', 'gemini'],
    open: { set: 'pickle', back: rally, front: hold('aries', (x, a, b) => paddle(x, a, b, 0.4 + Math.sin(0) * 0.2)), mood: 'squint' },
    beats: [
      B(3.0, 'bedroom', '6:00 AM · SATURDAY', 'a friend invites you to | "casual" pickleball.', [[0.5, 2.2, 'you', 'casual? | sure.']], { mood: 'wink', o: { sky: SKIES.morning } }),
      B(3.0, 'pickle', '7:00 AM · THE COURTS', 'it is not casual. | not for you.', [[0.5, 2.2, 'you', 'FIRST | TO ELEVEN!']], { back: rally, front: hold('aries', (x, a, b) => paddle(x, a, b, 0.4)), mood: 'squint' }),
      B(3.4, 'pickle', '7:20 AM · THE COURTS', 'your partner just | wants to chat.', [[0.3, 1.2, 'taurus', 'nice weather, | huh?'], [1.7, 1.4, 'you', 'FOCUS!']], { back: rally, cast: R('taurus'), moods: { taurus: 'happy' }, front: hold('aries', (x, a, b) => paddle(x, a, b, 0.4)), mood: 'wide' }),
      B(3.0, 'pickle', '7:40 AM · THE COURTS', 'you dive for a ball. | in the humidity.', [[0.5, 2.2, 'you', 'worth | it!']], { back: rally, you: [[0, 300, Y, 280], [0.6, 520, Y + 40, 280]], front: both(drip('aries'), hold('aries', (x, a, b) => paddle(x, a, b, 0.9))), mood: 'wide' }),
      B(3.4, 'pickle', '8:00 AM · THE COURTS', 'the other team is good. | annoyingly good.', [[0.3, 1.2, 'scorpio', 'good | game.'], [1.7, 1.4, 'you', '...rematch?']], { cast: R('scorpio'), moods: { scorpio: 'wink' }, mood: 'squint' }),
      B(3.4, 'truck', '8:30 AM · TACOS AFTER', 'tacos with the other team. | they are... fun?', [[0.3, 1.2, 'scorpio', 'same time | next week?'], [1.7, 1.4, 'you', "I'll | practice."]], { o: { sky: SKIES.morning }, cast: R('scorpio'), moods: { scorpio: 'happy' }, front: hold('aries', (x, a, b) => taco(x, a, b, 0.9)), mood: 'happy' }),
      B(3.0, 'pickle', 'TUESDAY · 6 AM', 'you practice alone. | every morning.', [[0.5, 2.2, 'you', 'for the | rematch.']], { back: rally, front: hold('aries', (x, a, b) => paddle(x, a, b, 0.4)), mood: 'squint' }),
      B(3.4, 'pickle', 'NEXT SATURDAY', 'rematch. you lose. | you laugh anyway.', [[0.3, 1.2, 'scorpio', 'doubles | partners?'], [1.7, 1.4, 'you', '...deal.']], { cast: R('scorpio'), moods: { scorpio: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'first to the party? | that is a game too.', [[0.5, 2.4, 'you', 'and I | will win.']], { you: [540, Y, 300], mood: 'sparkle', front: hold('aries', (x, a, b) => paddle(x, a, b, 0.4)) }),
    ],
  }),

  // ── hst160 · Pisces · king cake week (the resolution was "cry less")
  hst160: pov({
    sign: 'pisces', acc: GOLD, hook: "POV: you're a | Houston Pisces", end: 'Tears welcome. Jan 9.', stars: ['pisces', 'taurus', 'leo', 'virgo'],
    open: { set: 'kitchen', o: { wall: '#9a6ac0' }, front: (x, t) => kingCake(x, 250, 1262, 0.9), mood: 'heart' },
    beats: [
      B(3.0, 'bedroom', 'JAN 1 · NEW YEAR', 'your resolution: | "cry less."', [[0.5, 2.2, 'you', 'I can | do this.']], { mood: 'squint', o: { wall: '#4a3a7a' } }),
      B(3.0, 'freeway', 'JAN 2 · THE 59', 'a sad song comes on | in traffic.', [[0.6, 2.0, 'you', '...nope.']], { o: { shield: '59', sky: SKIES.haze }, you: [380, 1300, 240], mood: 'heart' }),
      B(3.0, 'kitchen', 'JAN 6 · KING CAKE SEASON', 'king cake season starts. | you buy one.', [[0.5, 2.2, 'you', 'purple, gold | and green!']], { o: { wall: '#9a6ac0' }, front: (x, t) => kingCake(x, 250, 1262, 0.9), mood: 'sparkle' }),
      B(3.0, 'kitchen', 'JAN 6 · THE SLICE', 'you find the tiny baby | in your slice.', [[0.5, 2.2, 'you', "I'm buying | the next one!"]], { o: { wall: '#9a6ac0' }, mood: 'wide' }),
      B(3.6, 'office', 'JAN 7 · THE OFFICE', 'you bring the next cake. | everyone cheers.', [[0.3, 1.1, 'leo', "you're | the best!"], [1.5, 0.9, 'virgo', 'thank you!'], [2.5, 1.0, 'you', "I'm not | crying."]], { o: { snow: 0 }, you: [460, Y, 270], cast: { leo: [[0, 820, Y, 200]], virgo: [[0, 150, Y + 30, 170]] }, moods: { leo: 'sparkle', virgo: 'happy' }, front: (x, t) => kingCake(x, 800, 1196, 0.7), mood: 'heart' }),
      B(3.4, 'lawn', 'JAN 8 · DISCOVERY GREEN', 'someone asks why | you look so happy.', [[0.3, 1.2, 'taurus', 'you look | so happy.'], [1.7, 1.4, 'you', "it's been | a sweet week."]], { o: { sky: SKIES.sunset }, cast: R('taurus'), moods: { taurus: 'happy' }, mood: 'heart' }),
      B(3.4, 'lawn', 'JAN 8 · DISCOVERY GREEN', 'they have king cake. | they offer you a slice.', [[0.3, 1.2, 'taurus', 'want | a slice?'], [1.7, 1.4, 'you', '...say | less.']], { o: { sky: SKIES.dusk }, cast: R('taurus'), moods: { taurus: 'heart' }, front: hold('taurus', (x, a, b) => kingCake(x, a, b + 20, 0.5), -1), mood: 'heart' }),
      B(3.0, 'bedroom', 'JAN 8 · 11 PM', 'resolution status: | failed. happily.', [[0.5, 2.2, 'you', "tomorrow's | the party."]], { o: { sky: SKIES.dusk, wall: '#4a3a7a' }, mood: 'sparkle' }),
      B(3.2, 'party', 'JAN 9', 'you cry at the door. | happy tears.', [[0.5, 2.4, 'you', 'best | day ever.']], { you: [540, Y, 300], mood: 'heart' }),
    ],
  }),
}
