// Houston Star Talk · worker w06 · POV scripts hst137–hst148 (see w06.js / w06kit.js)
import { pov, coat, Y, SKIES, holding, sweater, shades, headband, clipboard, phone, chatB, thermo, boba, bowl, queso, raspa, crawfish, houses, puffer, sweat, taco, PINK, GOLD, MINT, SKYB, LAV } from './w06kit.js'

const B = (d, set, chip, cap, lines = [], extra = {}) => ({ d, set, chip, cap, lines, ...extra })
const hold = (id, f, side = 1, dy = 20) => (x, t, lt, P) => holding(x, P, id, (a, b) => f(x, a, b), side, dy)
const wear = (f, id, ...a) => (x, t, lt, P) => f(x, P, id, ...a)
const both = (...fs) => (x, t, lt, P) => fs.forEach(f => f(x, t, lt, P))
const R = (id, s = 220) => ({ [id]: [[0, 790, Y, s]] })
const thermoAt = (deg, col) => (x) => thermo(x, 830, 980, deg, col)

export const W06B = {
  // ── hst137 · Gemini · a Bellaire food crawl that never ends
  hst137: pov({
    sign: 'gemini', acc: SKYB, hook: 'Hey Gemini. | This is you, | on Bellaire.', end: 'Pace yourself. Jan 9.', stars: ['gemini', 'libra', 'cancer', 'sagittarius'],
    open: { set: 'bellaire', front: hold('gemini', (x, a, b) => boba(x, a, b, 0.9)), mood: 'sparkle' },
    beats: [
      B(3.0, 'bellaire', '9:00 PM · BELLAIRE BLVD', 'you said "one quick bite." | it is never one.', [[0.5, 2.2, 'you', 'one stop. | maybe two.']], { mood: 'wink' }),
      B(3.0, 'bellaire', '9:20 PM · STOP 1: NOODLES', 'you order for both | of your moods.', [[0.5, 2.2, 'you', 'spicy AND | not spicy.']], { front: hold('gemini', (x, a, b) => bowl(x, a, b + 10, 0.7)) }),
      B(3.4, 'bellaire', '9:50 PM · STOP 2: BOBA', 'your friend is | already full.', [[0.3, 1.3, 'cancer', "I'm so | full."], [1.8, 1.4, 'you', 'that was | a snack.']], { cast: R('cancer'), moods: { cancer: 'sleepy' }, front: hold('gemini', (x, a, b) => boba(x, a, b, 0.8)) }),
      B(3.0, 'bellaire', '10:30 PM · STOP 3: PHO', "it's 61° out. | that's soup weather.", [[0.5, 2.2, 'you', "it's basically | winter."]], { front: wear(coat, 'gemini', '#5ec8ff'), mood: 'squint' }),
      B(3.2, 'bellaire', '11:15 PM · STOP 4: HOT POT', 'you update two group chats | at the same time.', [[0.6, 2.2, 'you', 'both chats | need to know.']],
        { front: (x, t, lt) => phone(x, 800, 1040, 0.62, () => { chatB(x, -150, 'where r u', false, 1); chatB(x, -80, 'stop 4!!', true, lt > 0.8 ? 1 : 0); chatB(x, -10, 'stop 4!!', true, lt > 1.4 ? 1 : 0, '#2bb05a') }) }),
      B(3.2, 'karaoke', '11:50 PM · KARAOKE', 'you sing the duet. | both parts.', [[0.5, 2.3, 'you', "I'm also | the harmony."]], { o: { lyric: 'and I... and I...' }, you: [400, 1240, 270], mood: 'sparkle' }),
      B(3.4, 'bellaire', '12:30 AM · STOP 6', 'someone cute asks you | what to order.', [[0.3, 1.3, 'libra', "what's good | here?"], [1.8, 1.4, 'you', 'everything. | sit down.']], { cast: R('libra'), moods: { libra: 'sparkle' } }),
      B(3.6, 'bellaire', '1:15 AM · STILL TALKING', 'you talk for an hour. | about food. and life.', [[0.3, 1.4, 'libra', 'same time | next week?'], [2.0, 1.4, 'you', 'only if we | add a stop.']], { cast: R('libra'), moods: { libra: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'next stop on the crawl: | the beta party.', [[0.5, 2.4, 'you', "I'll be | there. twice."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst138 · Cancer · family Sunday in Katy, a date in Montrose
  hst138: pov({
    sign: 'cancer', acc: '#ff9a3c', hook: "POV: you're a Cancer | with cousins in Katy", end: 'Bring the cousins. Jan 9.', stars: ['cancer', 'scorpio', 'aries', 'gemini'],
    open: { set: 'street', o: { sign: 'KATY', sky: SKIES.morning }, back: (x, t) => houses(x, 1380, t), mood: 'heart', front: hold('cancer', (x, a, b) => bowl(x, a, b + 10, 0.7)) },
    beats: [
      B(3.0, 'kitchen', '8:00 AM · SUNDAY', 'you are already cooking | for fourteen people.', [[0.5, 2.2, 'you', "who's | hungry?"]], { mood: 'sparkle' }),
      B(3.0, 'freeway', '11:00 AM · I-10 WEST', 'family lunch is in Katy. | of course it is.', [[0.5, 2.2, 'you', 'only | 40 minutes.']], { o: { over: 'KATY FWY', sub: 'I-10 WEST', move: true, sky: SKIES.morning }, you: [380, 1300, 240] }),
      B(3.4, 'street', '11:45 AM · KATY', 'everyone has a cousin in | Katy. you have nine.', [[0.3, 1.2, 'aries', 'COUSIN!!'], [1.6, 1.0, 'gemini', 'hiii!'], [2.4, 0.9, 'you', 'I brought | food!']],
        { o: { sign: 'KATY', sky: SKIES.noon }, back: (x, t) => houses(x, 1380, t), cast: { aries: [[0, 1250, Y, 200], [0.6, 780, Y, 200]], gemini: [[0, -200, Y + 40, 170], [0.9, 160, Y + 40, 170]] }, you: [460, Y, 260], mood: 'heart', moods: { aries: 'sparkle', gemini: 'wink' } }),
      B(3.0, 'kitchen', '12:30 PM · TIA\'S KITCHEN', 'you check in on everyone. | everyone.', [[0.5, 2.2, 'you', "how's your knee? | your dog?"]], { mood: 'heart' }),
      B(3.2, 'crawfish', '2:00 PM · THE BACKYARD', 'a cousin brought crawfish. | early season. tiny.', [[0.5, 2.3, 'you', 'tiny, but | so cute.']], { o: { sky: SKIES.noon }, mood: 'sparkle' }),
      B(3.4, 'freeway', '6:00 PM · DRIVING HOME', 'your date lives in Montrose. | Katy is "long distance."', [[0.5, 2.5, 'you', 'see you | in an hour!']],
        { o: { shield: '10', move: true, sky: SKIES.sunset }, you: [380, 1300, 240], front: (x, t, lt) => phone(x, 820, 1000, 0.55, () => { chatB(x, -150, 'where r u?', false, 1); chatB(x, -80, 'leaving Katy!', true, lt > 0.8 ? 1 : 0) }) }),
      B(3.4, 'coffee', '7:30 PM · HALFWAY', 'you meet in the middle. | on a feeder road.', [[0.3, 1.3, 'scorpio', 'you brought | me food?'], [1.8, 1.4, 'you', 'I always | bring food.']], { cast: R('scorpio'), moods: { scorpio: 'wide' }, front: hold('cancer', (x, a, b) => bowl(x, a, b + 10, 0.6)) }),
      B(3.6, 'coffee', '8:15 PM · STILL THERE', 'they say: "your family | sounds amazing."', [[0.3, 1.3, 'scorpio', 'can I | meet them?'], [1.9, 1.5, 'you', '...all nine | cousins?']], { o: { sky: SKIES.dusk }, cast: R('scorpio'), moods: { scorpio: 'heart' }, mood: lt => lt < 2.8 ? 'wide' : 'heart' }),
      B(3.2, 'party', 'JAN 9', "you're bringing the | cousins. obviously.", [[0.5, 2.4, 'you', 'Katy is | coming too.']], { you: [540, Y, 300], mood: 'heart' }),
    ],
  }),

  // ── hst139 · Leo · the one cold day (and the 80° afternoon)
  hst139: pov({
    sign: 'leo', acc: GOLD, hook: "Your sign is Leo. | It's 55° in Houston.", end: 'Bring both outfits. Jan 9.', stars: ['leo', 'aquarius', 'sagittarius', 'pisces'],
    open: { set: 'street', o: { sky: SKIES.haze, sign: 'UPTOWN' }, front: both(wear(coat, 'leo', '#e05a3a'), thermoAt('55°', '#5ec8ff')), mood: 'sparkle' },
    beats: [
      B(3.0, 'bedroom', '6:30 AM · THE COLD DAY', "the app says 55°. | you've waited all year.", [[0.5, 2.2, 'you', "it's | time."]], { mood: 'sparkle' }),
      B(3.0, 'vintage', '6:45 AM · THE CLOSET', 'beanie. scarf. boots. | the full winter look.', [[0.5, 2.2, 'you', 'Houston, | look at me.']], { front: wear(coat, 'leo', '#e05a3a'), mood: 'wink' }),
      B(3.0, 'street', '7:30 AM · UPTOWN', 'you post the car | thermometer. obviously.', [[0.5, 2.2, 'you', "caption: | 'freezing.'"]], { o: { sky: SKIES.haze }, front: both(wear(coat, 'leo', '#e05a3a'), thermoAt('55°', '#5ec8ff')) }),
      B(3.4, 'brunch', '10:00 AM · BRUNCH', 'everyone else wore | the same scarf.', [[0.3, 1.2, 'sagittarius', 'nice | scarf.'], [1.8, 1.3, 'you', '...nice | scarf.']], { cast: R('sagittarius'), moods: { sagittarius: 'squint' }, mood: 'squint', front: both(wear(coat, 'leo', '#e05a3a'), wear(coat, 'sagittarius', '#e05a3a')) }),
      B(3.0, 'bellaire', '12:00 PM · BELLAIRE', 'the pho line wraps | around the block.', [[0.5, 2.2, 'you', 'soup is | my brand today.']], { front: both(wear(coat, 'leo', '#e05a3a'), hold('leo', (x, a, b) => bowl(x, a, b + 30, 0.6))) }),
      B(3.0, 'street', '2:30 PM · 74°', 'it is now 74°. | you are still in the scarf.', [[0.5, 2.2, 'you', "I'm | committed."]], { o: { sky: SKIES.noon }, front: both(wear(coat, 'leo', '#e05a3a'), thermoAt('74°', '#ffb35c'), (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.3, cy - s * 0.35, t) }), mood: 'squint' }),
      B(3.0, 'street', '4:00 PM · 80°', 'the scarf comes off. | the shades come on.', [[0.5, 2.2, 'you', 'summer Leo | is back.']], { o: { sky: SKIES.gold }, front: both(wear(shades, 'leo'), thermoAt('80°', '#ff3a4e')), mood: 'wink' }),
      B(3.4, 'lawn', '6:00 PM · DISCOVERY GREEN', 'someone compliments | BOTH outfits.', [[0.3, 1.3, 'aquarius', 'loved the | scarf era.'], [1.8, 1.4, 'you', 'you SAW | that?']], { cast: R('aquarius'), moods: { aquarius: 'sparkle' }, mood: 'heart', front: wear(shades, 'leo') }),
      B(3.2, 'party', 'JAN 9', 'Jan 9 could be 50. | it could be 80.', [[0.5, 2.4, 'you', "I'm bringing | both looks."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst140 · Virgo · planning the perfect first date (with a spreadsheet)
  hst140: pov({
    sign: 'virgo', acc: MINT, hook: 'Day in the life: | you, a Houston Virgo', end: 'The spreadsheet says Jan 9.', stars: ['virgo', 'pisces', 'capricorn', 'libra'],
    open: { set: 'coffee', front: wear(clipboard, 'virgo'), mood: 'squint' },
    beats: [
      B(3.0, 'bedroom', '6:00 AM · PLANNING', 'first date tonight. | you made a spreadsheet.', [[0.5, 2.2, 'you', 'tab one: | parking.']], { front: wear(clipboard, 'virgo') }),
      B(3.0, 'freeway', '7:00 AM · RESEARCH', 'you measure the drive | in minutes, not miles.', [[0.5, 2.2, 'you', '22 minutes. | 40 at five.']], { o: { shield: '59', sky: SKIES.morning }, you: [380, 1300, 240], front: wear(clipboard, 'virgo') }),
      B(3.0, 'coffee', '9:00 AM · SCOUTING', 'you pick a halfway coffee | shop on a feeder road.', [[0.5, 2.2, 'you', 'equal minutes | for both.']], { mood: 'sparkle' }),
      B(3.0, 'parking', '12:00 PM · RECON', 'you check which spots | will be in the shade.', [[0.5, 2.2, 'you', 'spot 14. | shade at 6.']], { you: [300, Y, 260], front: wear(clipboard, 'virgo') }),
      B(3.0, 'office', '3:00 PM · THE AC', 'the cafe AC is arctic. | you pack a sweater.', [[0.5, 2.2, 'you', 'and one | for them.']], { front: wear(sweater, 'virgo', '#3f8a4a') }),
      B(3.4, 'coffee', '6:10 PM · THE DATE', "they're ten minutes late. | it's the 610.", [[0.3, 1.3, 'pisces', 'so sorry! | traffic!'], [1.8, 1.4, 'you', 'I planned | for that.']], { o: { sky: SKIES.dusk }, cast: { pisces: [[0, 1250, Y, 220], [0.5, 790, Y, 220]] }, moods: { pisces: 'wide' }, mood: 'wink' }),
      B(3.4, 'coffee', '6:30 PM · INSIDE', 'they are freezing. | you have a sweater.', [[0.3, 1.3, 'pisces', 'you brought | me a sweater?'], [1.8, 1.4, 'you', "it's on the | spreadsheet."]], { o: { sky: SKIES.dusk }, cast: R('pisces'), moods: { pisces: 'heart' }, front: wear(sweater, 'pisces', '#3f8a4a') }),
      B(3.0, 'coffee', '8:30 PM · OFF SCRIPT', 'you talk for two hours. | none of it was planned.', [[0.5, 2.2, 'you', 'best | unplanned tab.']], { o: { sky: SKIES.dusk }, cast: R('pisces'), moods: { pisces: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'next on the list: | the beta party.', [[0.5, 2.4, 'you', 'parking? | on it.']], { you: [540, Y, 300], mood: 'sparkle', front: wear(clipboard, 'virgo') }),
    ],
  }),

  // ── hst141 · Libra · picking the brunch spot for the group chat
  hst141: pov({
    sign: 'libra', acc: LAV, hook: "If you're a Libra: | your Houston brunch", end: 'No maybe. Jan 9.', stars: ['libra', 'scorpio', 'taurus', 'gemini'],
    open: { set: 'brunch', cast: { gemini: [[0, 200, Y + 40, 180]], taurus: [[0, 880, Y + 40, 180]] }, moods: { gemini: 'wink', taurus: 'happy' }, mood: 'wide' },
    beats: [
      B(3.0, 'bedroom', '9:00 AM · THE GROUP CHAT', 'the group chat asks you | to pick the brunch spot.', [[0.5, 2.2, 'you', 'me? | pick?']], { mood: 'wide', o: { wall: '#6a4a8a' } }),
      B(3.0, 'bedroom', '9:40 AM · STILL PICKING', 'Tex-Mex or Mexican? | you love them both.', [[0.5, 2.2, 'you', "can't we | do both?"]], { mood: 'squint', o: { wall: '#6a4a8a' } }),
      B(3.0, 'vintage', '10:30 AM · THE CLOSET', 'outfit change | number four.', [[0.5, 2.2, 'you', 'this one? | or THIS one?']], { mood: 'sparkle' }),
      B(3.4, 'brunch', '11:45 AM · THE WAIT', 'the wait is 75 minutes. | you make friends in line.', [[0.3, 1.3, 'you', 'love | your shoes!'], [1.8, 1.4, 'scorpio', '...thanks. | yours too.']], { o: { wait: '75 MIN' }, cast: R('scorpio'), moods: { scorpio: 'wink' }, mood: 'sparkle' }),
      B(3.0, 'brunch', '1:00 PM · THE MENU', 'sweet or savory? | you order both.', [[0.5, 2.2, 'you', 'and queso | for the table.']], { front: hold('libra', (x, a, b) => queso(x, a, b + 10, 0.7)), mood: 'happy' }),
      B(3.0, 'brunch', '1:40 PM · THE CHECK', 'you split it so fairly | it has decimals.', [[0.5, 2.2, 'you', '$14.37 | each.']], { front: wear(clipboard, 'libra'), mood: 'wink' }),
      B(3.4, 'brunch', '2:00 PM · THE NEXT TABLE', 'the cute one from the line | is sitting right there.', [[0.3, 1.3, 'scorpio', 'you were | in line, right?'], [1.8, 1.4, 'you', 'for 75 | minutes. yes.']], { o: { wait: '0 MIN' }, cast: R('scorpio'), moods: { scorpio: 'sparkle' }, mood: 'heart' }),
      B(3.4, 'lawn', '3:00 PM · A WALK', 'you let them pick | where to go next.', [[0.3, 1.2, 'scorpio', 'bayou | or museum?'], [1.8, 1.4, 'you', '...yes.']], { o: { sky: SKIES.noon }, cast: R('scorpio'), moods: { scorpio: 'happy' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'some decisions | are easy.', [[0.5, 2.4, 'you', 'the party? | yes. no maybe.']], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst142 · Scorpio · the first date, and THE question
  hst142: pov({
    sign: 'scorpio', acc: '#ff5a6e', hook: 'POV: Scorpio | on a Houston | first date', end: 'Corner seat saved. Jan 9.', stars: ['scorpio', 'sagittarius', 'leo', 'virgo'],
    open: { set: 'night', o: { sign: 'WASHINGTON AVE' }, front: wear(shades, 'scorpio'), mood: 'squint' },
    beats: [
      B(3.0, 'night', '7:50 PM · WASHINGTON AVE', 'you arrive early. | you take the corner seat.', [[0.5, 2.2, 'you', 'I can see | the door.']], { mood: 'squint', front: wear(shades, 'scorpio') }),
      B(3.4, 'truck', '8:05 PM · THE DATE', 'they sit down. | you ask THE question.', [[0.3, 1.5, 'you', "where'd you go | to high school?"], [2.1, 1.1, 'sagittarius', '...why?']], { cast: R('sagittarius'), moods: { sagittarius: 'wide' } }),
      B(3.0, 'truck', '8:06 PM · THE DATE', 'in Houston, that question | explains everything.', [[0.5, 2.2, 'you', 'say less. | I know.']], { cast: R('sagittarius'), moods: { sagittarius: 'happy' }, mood: 'wink' }),
      B(3.4, 'truck', '8:20 PM · FOLLOW-UPS', 'you ask follow-ups. | so many follow-ups.', [[0.3, 1.4, 'you', 'inside or | outside the Loop?'], [2.0, 1.1, 'sagittarius', 'outside!']], { cast: R('sagittarius'), moods: { sagittarius: 'sparkle' }, mood: 'squint' }),
      B(3.4, 'truck', '8:40 PM · YOUR TURN', 'they ask about you. | you say very little.', [[0.3, 1.2, 'sagittarius', 'and | you?'], [1.7, 1.5, 'you', "I'm... | from here."]], { cast: R('sagittarius'), moods: { sagittarius: 'wide' }, mood: 'neutral' }),
      B(3.4, 'truck', '9:00 PM · THE TACOS', "they tell you about their | mom's breakfast tacos.", [[0.3, 1.3, 'sagittarius', 'she makes | the best ones.'], [1.8, 1.4, 'you', '...tell me | everything.']], { cast: R('sagittarius'), moods: { sagittarius: 'heart' }, mood: 'heart', front: hold('sagittarius', (x, a, b) => taco(x, a, b, 0.8), -1) }),
      B(3.0, 'bayou', '9:30 PM · BUFFALO BAYOU', 'you take a walk. | you actually open up.', [[0.5, 2.2, 'you', 'okay. | ask me again.']], { o: { sky: SKIES.dusk }, cast: R('sagittarius'), moods: { sagittarius: 'happy' }, mood: 'happy' }),
      B(3.4, 'bayou', '10:15 PM · THE TWIST', 'turns out: | same high school.', [[0.3, 1.2, 'sagittarius', 'wait. | WHAT?'], [1.7, 1.5, 'you', 'I knew the | whole time.']], { o: { sky: SKIES.dusk }, cast: R('sagittarius'), moods: { sagittarius: 'wide' }, mood: 'wink' }),
      B(3.2, 'party', 'JAN 9', "you'll be there. | you'll be watching.", [[0.5, 2.4, 'you', "I'll be in | the corner."]], { you: [540, Y, 300], mood: 'wink', front: wear(shades, 'scorpio') }),
    ],
  }),

  // ── hst143 · Sagittarius · Galveston is "only an hour"
  hst143: pov({
    sign: 'sagittarius', acc: SKYB, hook: 'Only a Houston | Sagittarius | will get this', end: 'Next adventure: Jan 9.', stars: ['sagittarius', 'cancer', 'aquarius', 'capricorn'],
    open: { set: 'beach', front: wear(shades, 'sagittarius'), mood: 'sparkle' },
    beats: [
      B(3.0, 'bedroom', '6:00 AM · SATURDAY', 'you wake up and say | "beach?" to no one.', [[0.5, 2.2, 'you', 'beach. | now.']], { mood: 'sparkle' }),
      B(3.0, 'freeway', '7:00 AM · I-45 SOUTH', 'Galveston is "only | an hour." it never is.', [[0.5, 2.2, 'you', 'who | counts?']], { o: { over: 'GULF FWY', sub: 'I-45 SOUTH', move: true, sky: SKIES.morning }, you: [380, 1300, 240], mood: 'wink' }),
      B(3.0, 'beach', '9:00 AM · THE BEACH', "the water is brown. | you don't care.", [[0.5, 2.2, 'you', "it's | perfect!"]], { mood: 'sparkle', front: wear(shades, 'sagittarius') }),
      B(3.4, 'beach', '9:30 AM · THE WATER', "your friend won't go in.", [[0.3, 1.2, 'cancer', "it's | brown."], [1.7, 1.4, 'you', "it's | ADVENTURE."]], { cast: R('cancer'), moods: { cancer: 'squint' } }),
      B(3.4, 'beach', '12:00 PM · SNACK RUN', 'you find a raspa stand | and a new friend.', [[0.3, 1.2, 'aquarius', 'mango or | pickle?'], [1.7, 1.4, 'you', 'both, | please.']], { cast: R('aquarius'), moods: { aquarius: 'sparkle' }, front: hold('sagittarius', (x, a, b) => raspa(x, a, b, 0.9)) }),
      B(3.0, 'beach', '3:00 PM · SUNSCREEN', 'you forgot sunscreen. | again.', [[0.5, 2.2, 'you', "I'm | glowing."]], { o: { sky: SKIES.gold }, mood: 'wink' }),
      B(3.0, 'freeway', '6:00 PM · I-45 NORTH', 'traffic home. | you plan the next trip.', [[0.5, 2.2, 'you', 'next week: | the bats!']], { o: { shield: '45', move: true, sky: SKIES.sunset }, you: [380, 1300, 240] }),
      B(3.4, 'bats', '7:30 PM · WAUGH BRIDGE', 'so you go straight to | the bat bridge.', [[0.3, 1.2, 'capricorn', 'you came | from Galveston?'], [1.8, 1.4, 'you', 'one more | adventure.']], { cast: R('capricorn'), moods: { capricorn: 'wide' }, o: { batsAt: 0.6 } }),
      B(3.2, 'party', 'JAN 9', 'the next adventure | has a date.', [[0.5, 2.4, 'you', "Jan 9. | I'm in."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst144 · Capricorn · the downtown tunnels (closed on weekends)
  hst144: pov({
    sign: 'capricorn', acc: MINT, hook: 'Day in the life: | a Houston Capricorn', end: 'Written in pen: Jan 9.', stars: ['capricorn', 'leo', 'virgo', 'taurus'],
    open: { set: 'street', o: { sign: 'DOWNTOWN', sky: SKIES.morning }, front: wear(clipboard, 'capricorn'), mood: 'squint' },
    beats: [
      B(3.0, 'bedroom', '5:30 AM · ALARM', 'you wake up before | the alarm. as always.', [[0.5, 2.2, 'you', 'the alarm | is late.']], { mood: 'squint', o: { sky: SKIES.dusk } }),
      B(3.0, 'freeway', '6:15 AM · 288 NORTH', 'you leave early | to beat traffic.', [[0.5, 2.2, 'you', 'traffic | is a choice.']], { o: { over: 'DOWNTOWN', sub: '288 NORTH', move: true, sky: SKIES.morning }, you: [380, 1300, 240] }),
      B(3.0, 'office', '9:00 AM · THE OFFICE', 'the AC is arctic. | you came prepared.', [[0.5, 2.2, 'you', 'blazer AND | a sweater.']], { front: wear(sweater, 'capricorn', '#2b5fb0') }),
      B(3.0, 'tunnel', '12:00 PM · THE TUNNELS', 'lunch underground. | in the AC. no sun.', [[0.5, 2.2, 'you', 'efficient. | cool. ideal.']], { mood: 'happy' }),
      B(3.0, 'tunnel', '12:20 PM · SAME ORDER', 'the same lunch | for three years.', [[0.5, 2.2, 'you', 'why change | perfection?']], { o: { sign: 'FOOD COURT' }, front: hold('capricorn', (x, a, b) => bowl(x, a, b + 10, 0.7)) }),
      B(3.0, 'tunnel', 'SATURDAY · THE TUNNELS', 'you try the tunnels | on a weekend.', [[0.5, 2.2, 'you', '...closed? | on SATURDAY?']], { o: { sign: 'CLOSED' }, mood: 'wide' }),
      B(3.0, 'street', 'SATURDAY · ABOVE GROUND', 'you meet the sun. | it is a lot.', [[0.5, 2.2, 'you', 'people live | up here?']], { o: { sign: 'MAIN ST', sky: SKIES.noon }, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); sweat(x, cx + s * 0.3, cy - s * 0.35, t) }, mood: 'squint' }),
      B(3.6, 'truck', 'SATURDAY · A TACO TRUCK', 'someone shows you | their favorite truck.', [[0.3, 1.3, 'leo', 'trust me. | try it.'], [1.9, 1.5, 'you', '...okay. | new lunch.']], { o: { sky: SKIES.noon }, cast: R('leo'), moods: { leo: 'wink' }, mood: lt => lt < 1.8 ? 'squint' : 'heart', front: hold('capricorn', (x, a, b) => taco(x, a, b, 0.9)) }),
      B(3.2, 'party', 'JAN 9', 'it is in the calendar. | in pen.', [[0.5, 2.4, 'you', 'arriving | 15 min early.']], { you: [540, Y, 300], mood: 'wink', front: wear(clipboard, 'capricorn') }),
    ],
  }),

  // ── hst145 · Aquarius · free museum Thursday, and an argument about a painting
  hst145: pov({
    sign: 'aquarius', acc: '#c9a6ff', hook: 'Day in the life: | a Houston Aquarius', end: 'Come as you are. Jan 9.', stars: ['aquarius', 'virgo', 'gemini', 'pisces'],
    open: { set: 'museum', o: { free: true }, mood: 'sparkle' },
    beats: [
      B(3.0, 'bedroom', '10:00 AM · THURSDAY', 'you have one | very specific plan.', [[0.5, 2.2, 'you', 'free museum | Thursday.']], { mood: 'sparkle', o: { wall: '#2a4a6a' } }),
      B(3.0, 'street', '1:00 PM · MUSEUM DISTRICT', 'you take the train. | you love the train.', [[0.5, 2.2, 'you', 'the city, | from a window.']], { o: { sign: 'MUSEUM DIST', sky: SKIES.noon }, mood: 'happy' }),
      B(3.0, 'museum', '2:00 PM · GALLERY 1', 'you stand in front of one | painting. for an hour.', [[0.5, 2.2, 'you', "it's | ME."]], { mood: 'heart', lookYou: [-0.8, -0.4] }),
      B(3.4, 'museum', '3:10 PM · GALLERY 1', 'a stranger explains it | to you. confidently.', [[0.3, 1.3, 'virgo', "it's about | rectangles."], [1.8, 1.4, 'you', "it's about | FEELINGS."]], { cast: R('virgo'), moods: { virgo: 'squint' }, mood: 'wide' }),
      B(3.4, 'museum', '3:20 PM · GALLERY 1', 'you both laugh. | you keep talking.', [[0.3, 1.1, 'virgo', 'coffee?'], [1.6, 1.6, 'you', 'only if we | keep arguing.']], { cast: R('virgo'), moods: { virgo: 'heart' }, mood: 'wink' }),
      B(3.0, 'chapel', '5:00 PM · THE QUIET CHAPEL', 'you sit in silence. | it fixes everything.', [[0.8, 1.8, 'you', '...']], { mood: 'sleepy' }),
      B(3.0, 'nozoning', '7:00 PM · NO ZONING', 'a taco stand next to | a mansion. you love it.', [[0.5, 2.2, 'you', 'no rules. | just tacos.']], { mood: 'sparkle', you: [540, Y + 40, 260] }),
      B(3.4, 'night', '9:00 PM · ROUND TWO', 'second argument: | the best taco.', [[0.3, 1.1, 'virgo', 'corn.'], [1.6, 1.4, 'you', 'whatever | is closest.']], { cast: R('virgo'), moods: { virgo: 'squint' }, mood: 'wink' }),
      B(3.2, 'party', 'JAN 9', "you'll arrive in an outfit | no one can explain.", [[0.5, 2.4, 'you', "it's about | feelings."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),

  // ── hst146 · Pisces · the bats at sunset (cries, obviously)
  hst146: pov({
    sign: 'pisces', acc: LAV, hook: 'Hey Pisces. | This is you, | at sunset.', end: 'Happy tears only. Jan 9.', stars: ['pisces', 'capricorn', 'cancer', 'libra'],
    open: { set: 'bats', o: { batsAt: 0, n: 26 }, mood: 'wide', look: { pisces: [0, -1] } },
    beats: [
      B(3.0, 'bedroom', '5:00 PM · BEFORE', 'you heard the bats fly | out at sunset.', [[0.5, 2.2, 'you', 'a whole | sky of bats?']], { mood: 'wide', o: { sky: SKIES.sunset } }),
      B(3.0, 'bayou', '6:10 PM · THE BAYOU TRAIL', 'you walk the trail. | you wave at every dog.', [[0.5, 2.2, 'you', 'hi baby. | hi baby.']], { o: { sky: SKIES.sunset }, mood: 'heart' }),
      B(3.0, 'bats', '6:30 PM · WAUGH BRIDGE', 'you get the perfect spot. | then you wait.', [[0.5, 2.2, 'you', 'any | minute now.']], { o: { batsAt: 99 }, mood: 'sparkle' }),
      B(3.4, 'bats', '6:40 PM · STILL WAITING', 'a stranger says | "give it a few minutes."', [[0.3, 1.3, 'capricorn', 'they leave | at dusk.'], [1.8, 1.4, 'you', 'you come | here a lot?']], { o: { batsAt: 99 }, cast: R('capricorn'), moods: { capricorn: 'happy' } }),
      B(3.0, 'bats', '6:47 PM · SUNSET', 'and then: | the sky moves.', [[0.8, 1.9, 'you', 'oh my | GOSH.']], { o: { batsAt: 0.3, n: 30 }, mood: 'wide', lookYou: [0, -1] }),
      B(3.0, 'bats', '6:48 PM · SUNSET', 'you cry. obviously.', [[0.5, 2.2, 'you', "they're all | going out!"]], { o: { batsAt: 0, n: 30 }, mood: 'heart' }),
      B(3.4, 'bats', '6:50 PM · SUNSET', 'the stranger hands | you a tissue.', [[0.3, 1.2, 'capricorn', 'I bring | extras.'], [1.7, 1.5, 'you', "you're so | prepared."]], { o: { batsAt: 0 }, cast: R('capricorn'), moods: { capricorn: 'wink' }, mood: 'heart' }),
      B(3.4, 'lawn', '7:30 PM · A WALK', 'you swap numbers. | for "bat updates."', [[0.3, 1.2, 'capricorn', 'next | Saturday?'], [1.7, 1.5, 'you', 'same | bridge.']], { o: { sky: SKIES.dusk }, cast: R('capricorn'), moods: { capricorn: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', "you will cry at the | beta party. that's fine.", [[0.5, 2.4, 'you', 'happy | tears only.']], { you: [540, Y, 300], mood: 'heart' }),
    ],
  }),

  // ── hst147 · Aries · bayou run club (it's not a race)
  hst147: pov({
    sign: 'aries', acc: '#ff5a6e', hook: "POV: you're a | Houston Aries", end: 'First one there. Jan 9.', stars: ['aries', 'leo', 'virgo', 'sagittarius'],
    open: { set: 'bayou', front: wear(headband, 'aries'), cast: { virgo: [[0, -200, Y + 60, 170], [2.6, 1300, Y + 60, 170]], leo: [[0, 1300, Y + 80, 170], [2.6, -200, Y + 80, 170]] }, mood: 'squint' },
    beats: [
      B(3.0, 'bedroom', '4:45 AM · ALARM', 'run club is at six. | you are up at 4:45.', [[0.5, 2.2, 'you', "LET'S | GO."]], { o: { sky: SKIES.dusk }, front: wear(headband, 'aries'), mood: 'squint' }),
      B(3.0, 'bayou', '5:50 AM · MEMORIAL PARK', 'it is already 79°. | at dawn.', [[0.5, 2.2, 'you', 'perfect | weather.']], { front: both(wear(headband, 'aries'), (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); sweat(x, cx + s * 0.3, cy - s * 0.35, t) }) }),
      B(3.4, 'bayou', '6:00 AM · THE START', 'it was supposed to be | an easy pace.', [[0.3, 1.3, 'you', 'first to | the bridge!'], [1.8, 1.4, 'virgo', "it's a | social run!"]], { you: [[0, 300, Y, 260], [2.4, 1300, Y, 260]], cast: { virgo: [[0, 760, Y + 20, 200]] }, moods: { virgo: 'squint' }, front: wear(headband, 'aries'), noTag: true }),
      B(3.0, 'bayou', '6:20 AM · MILE 2', 'you look back. | everyone is chatting.', [[0.5, 2.2, 'you', 'why is nobody | racing?']], { front: wear(headband, 'aries'), mood: 'wide', lookYou: [-1, 0] }),
      B(3.4, 'bayou', '6:25 AM · MILE 2', 'someone cute jogs | right next to you.', [[0.3, 1.3, 'leo', 'slow down. | talk to me.'], [1.8, 1.2, 'you', '...talk?']], { cast: { leo: [[0, 1250, Y, 230], [0.4, 790, Y, 230]] }, moods: { leo: 'wink' }, front: wear(headband, 'aries'), mood: 'wide' }),
      B(3.4, 'bayou', '6:40 AM · MILE 3', 'you slow down. | it is... nice?', [[0.3, 1.2, 'leo', "what's | your name?"], [1.7, 1.5, 'you', "Aries. | I'm fast."]], { cast: R('leo', 230), moods: { leo: 'happy' }, front: wear(headband, 'aries'), mood: 'happy' }),
      B(3.6, 'truck', '7:15 AM · TACOS AFTER', 'breakfast tacos after. | you finish first.', [[0.3, 1.0, 'you', 'done!'], [1.4, 1.0, 'leo', "it's not | a race."], [2.5, 1.0, 'you', '...a date?']], { o: { sky: SKIES.morning }, cast: R('leo', 230), moods: { leo: 'heart' }, front: hold('aries', (x, a, b) => taco(x, a, b, 0.9)), mood: 'heart' }),
      B(3.0, 'bayou', 'NEXT SATURDAY', 'now you run slower. | on purpose.', [[0.5, 2.2, 'you', 'same time? | same pace?']], { cast: R('leo', 230), moods: { leo: 'heart' }, front: wear(headband, 'aries'), mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'first one to | the party? you.', [[0.5, 2.4, 'you', 'see you | at the door.']], { you: [540, Y, 300], mood: 'sparkle', front: wear(headband, 'aries') }),
    ],
  }),

  // ── hst148 · Taurus · crawfish season begins
  hst148: pov({
    sign: 'taurus', acc: '#ff7a2a', hook: "If you're a Taurus: | your crawfish season", end: 'Save room. Jan 9.', stars: ['taurus', 'cancer', 'gemini', 'leo'],
    open: { set: 'crawfish', mood: 'heart', front: (x, t, lt) => crawfish(x, 820, 980 + Math.sin(t * 6) * 10, 1.4, Math.sin(t * 3) * 0.3) },
    beats: [
      B(3.0, 'bedroom', 'EARLY JANUARY', 'it is early January. | you can sense it.', [[0.5, 2.2, 'you', 'the season | is coming.']], { mood: 'squint', o: { wall: '#7a3a3a' } }),
      B(3.0, 'crawfish', 'A BACKYARD BOIL', 'the first boil of the year. | they are small.', [[0.5, 2.2, 'you', 'small. | but mine.']], { mood: 'heart' }),
      B(3.4, 'crawfish', 'THE TECHNIQUE', 'you have a technique. | you will explain it.', [[0.3, 1.3, 'you', 'twist. | pinch. done.'], [1.8, 1.4, 'gemini', 'show me | again?']], { cast: R('gemini'), moods: { gemini: 'wide' }, front: hold('taurus', (x, a, b) => crawfish(x, a, b, 1)) }),
      B(3.0, 'crawfish', 'THE SIDES', 'you guard the corn | and the potatoes.', [[0.5, 2.2, 'you', 'the potato | is MINE.']], { mood: 'squint' }),
      B(3.0, 'bellaire', 'SATURDAY · BELLAIRE', 'Viet-Cajun night. | garlic butter on everything.', [[0.5, 2.2, 'you', 'my love | language.']], { mood: 'heart' }),
      B(3.4, 'bellaire', 'SATURDAY · THE DATE', 'your date has never | peeled one.', [[0.3, 1.2, 'cancer', 'how do | I...?'], [1.7, 1.5, 'you', "come here. | I'll show you."]], { cast: R('cancer'), moods: { cancer: 'wide' }, mood: 'happy' }),
      B(3.4, 'bellaire', 'SATURDAY · LATER', 'you peel theirs for them. | that is love.', [[0.3, 1.2, 'cancer', "you're | so sweet."], [1.7, 1.5, 'you', 'this is huge | for me.']], { cast: R('cancer'), moods: { cancer: 'heart' }, mood: 'heart', front: hold('taurus', (x, a, b) => crawfish(x, a, b, 1)) }),
      B(3.4, 'crawfish', 'MARCH · PEAK SEASON', 'by March they are big. | so is the crush.', [[0.3, 1.3, 'cancer', 'same table | next year?'], [1.8, 1.4, 'you', 'every | year.']], { o: { sky: SKIES.sunset }, cast: R('cancer'), moods: { cancer: 'heart' }, mood: 'heart' }),
      B(3.2, 'party', 'JAN 9', 'the season starts | right on time.', [[0.5, 2.4, 'you', "Jan 9. | I'm hungry."]], { you: [540, Y, 300], mood: 'sparkle' }),
    ],
  }),
}
