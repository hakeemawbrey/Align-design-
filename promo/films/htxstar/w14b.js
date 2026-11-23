// Houston Star Talk · worker w14 · "assigns" scripts hst345–hst356 (engine: w14.js). Houston lore from
// promo/films/HOUSTON-STARTALK.md; affectionate, no brands, teams, stats, drink or disaster jokes.
import { assigns, icon, BG } from './w14.js'
import { BRAKE } from './kit.js'
import { GOLD, PINK, BONE } from '../signs3kit.js'

const bob = (t, k = 0) => Math.sin(t * 3 + k) * 14
const FLOUR = '#f4e1b0', CORN = '#e8c46a'

export const W14B = {
  // ── hst345 · Houston critters as your sign
  hst345: assigns({
    hook: 'Houston critters | as your sign', bg: BG.bayou(), card: { kind: 'polaroid', pic: '#cfe8c0', iconS: 1.0, iconY: -45 },
    hero: (x, t) => { icon(x, 'bird', 300, 800 + bob(t), 0.8, '#2a2238', GOLD); icon(x, 'armadillo', 560, 820 + bob(t, 1), 0.75, '#b0a090'); icon(x, 'lizard', 800, 800 + bob(t, 2), 0.75, '#5ab84a', '#ff5a8a', t) },
    items: [
      ['aries', 'FIRE ANTS', 'small. fast. | do not test.', 'ant', '#c0402a'],
      ['taurus', 'THE ARMADILLO', 'armored. | napping.', 'armadillo', '#b0a090'],
      ['gemini', 'THE GRACKLE', 'loud in every | parking lot.', 'bird', '#2a2238', GOLD],
      ['cancer', 'THE BAYOU TURTLE', 'brought the | whole shell home.', 'turtle', '#5a8a4a'],
      ['leo', 'THE EGRET', 'posing on | the bayou.', 'egret', BONE],
      ['virgo', 'THE GREEN ANOLE', 'inspecting | your porch.', 'lizard', '#5ab84a', '#ff5a8a', 'squint'],
      ['libra', 'THE CARDINAL', 'a pretty | little visit.', 'bird', '#e0302a', '#2a2238'],
      ['scorpio', 'THE BRIDGE BATS', 'only comes | out at night.', 'bat', '#3a2a50'],
      ['sagittarius', 'THE SQUIRREL', 'Heights to | Montrose. today.', 'squirrel', '#a8805a'],
      ['capricorn', 'THE CICADA', 'worked underground | for years.', 'bug', '#6a8a4a'],
      ['aquarius', 'THE LOVE BUGS', 'always in pairs. | weird. fine.', 'bug', '#2a2a2a', '#ff5a3a'],
      ['pisces', 'THE MOSQUITO', 'the city bird. | misunderstood.', 'bug', '#5a5a6a', 'nose'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE SURPRISE'], items: [
      ['gemini', 'THE POSSUM', 'playing dead. | dramatic.', 'squirrel', '#c0b8c8', '#ff8fb1', 'wide'],
    ] },
    ask: ['Spirit animal?', 'Comment your sign', '+ your critter.'], close: 'Wild night. Jan 9.', stars: ['pisces', 'gemini', 'scorpio', 'taurus'],
  }),

  // ── hst346 · 12 signs, 12 bobas
  hst346: assigns({
    hook: '12 signs, 12 bobas. | Find yours.', bg: BG.shop(), card: { kind: 'pastel', head: 'BELLAIRE BLVD · BOBA', bg: '#ffffff', band: '#c9a6ff', iconS: 1.1, iconY: -30 }, tagCol: BONE,
    hero: (x, t) => { icon(x, 'cup', 330, 800 + bob(t), 1.0, '#ff9a4a', PINK); icon(x, 'cup', 540, 790 + bob(t, 1), 1.0, '#c9a6ff', GOLD); icon(x, 'cup', 750, 800 + bob(t, 2), 1.0, '#c9945a', '#8fe3ff') },
    items: [
      ['aries', 'THAI TEA', 'orange. bold. | extra sweet.', 'cup', '#ff9a4a', PINK],
      ['taurus', 'BROWN SUGAR MILK', 'rich. indulgent. | mine.', 'cup', '#c9945a', GOLD],
      ['gemini', 'HALF TARO, HALF MATCHA', 'both. | obviously.', 'cup', '#b39ad8', '#7dbf5a'],
      ['cancer', 'HONEY MILK TEA', 'warm. sweet. | like home.', 'cup', '#e8c48a', PINK],
      ['leo', 'MANGO SLUSH', 'golden. cold. | look at me.', 'cup', '#ffb02a', BRAKE],
      ['virgo', 'JASMINE GREEN, 30%', '30% sugar. | less ice. exact.', 'cup', '#cfe8a0', '#8fe3ff', 'squint'],
      ['libra', 'STRAWBERRY MATCHA', 'pink and green. | balanced.', 'cup', '#ff9ab0', '#7dbf5a'],
      ['scorpio', 'BLACK SESAME', 'dark. nutty. | intense.', 'cup', '#3a3640', '#c9a6ff'],
      ['sagittarius', 'LYCHEE JELLY', 'a new topping. | every time.', 'cup', '#ffe6f0', '#7dffb0'],
      ['capricorn', 'CLASSIC MILK TEA', 'the original. | no notes.', 'cup', '#b08a6a', '#2a2638'],
      ['aquarius', 'CHEESE FOAM', "trust me. | it's good.", 'cup', '#ffef9a', '#8fe3ff', 'wink'],
      ['pisces', 'TARO', "it's purple. | I'm emotional.", 'cup', '#c9a6ff', PINK],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE PEARLS'], items: [
      ['leo', 'EXTRA PEARLS', 'extra. | always.', 'cup', '#c9945a', GOLD, 'sparkle'],
      ['libra', 'HALF PEARLS, HALF JELLY', "can't choose. | so, half.", 'cup', '#ffb3c7', '#7dffb0', 'wide'],
    ] },
    ask: ['Sugar level?', 'Comment your sign', '+ your boba.'], close: 'From Bellaire to Jan 9.', stars: ['pisces', 'virgo', 'taurus', 'aquarius'],
  }),

  // ── hst347 · Your sign is a Tex-Mex plate
  hst347: assigns({
    hook: 'Your sign is | a Tex-Mex plate', bg: BG.night({ ground: '#3a1a1a', city: '#2a1428', lit: '#ff7a5a' }), card: { kind: 'plain', bg: '#5a1d1a', head: 'MESA PARA DOCE', headCol: '#ffd36b', iconS: 1.05, iconY: -25 }, flip: true,
    hero: (x, t) => { icon(x, 'chips', 300, 810 + bob(t), 0.8, '#f2c75c', '#c0304a'); icon(x, 'plate', 560, 820 + bob(t, 1), 0.85, '#7a3a1a', '#c0402a'); icon(x, 'taco', 800, 820 + bob(t, 2), 0.8, '#c0402a', CORN) },
    items: [
      ['aries', 'FAJITAS', 'sizzling. | arrives loud.', 'plate', '#7a3a1a', '#c0402a'],
      ['taurus', 'QUESO', 'melty. cozy. | bottomless.', 'chips', '#f2c75c', '#2a5fb0'],
      ['gemini', 'THE COMBO PLATE', 'a little of | everything.', 'plate', '#c0402a', '#f2c75c'],
      ['cancer', 'TAMALES', 'made by the | whole family.', 'plate', '#e8c46a', '#c98e4a'],
      ['leo', 'NACHOS GRANDE', 'big. | bigger.', 'chips', '#f2c75c', '#ff8a2a'],
      ['virgo', 'CHIPS & SALSA', 'the perfect | chip ratio.', 'chips', '#c0402a', '#2a2638', 'squint'],
      ['libra', 'ENCHILADAS', 'red or green? | both, please.', 'plate', '#c0402a', '#3fae5a'],
      ['scorpio', 'CHILE RELLENO', 'a little | spicy inside.', 'plate', '#3a7a2a', '#f2c75c'],
      ['sagittarius', 'MIGAS', 'breakfast | at 2pm.', 'plate', '#ffe27a', '#c0402a'],
      ['capricorn', 'TORTILLA SOUP', 'reliable. | comforting.', 'bowl', '#c0402a'],
      ['aquarius', 'PUFFY TACOS', 'different. | crunchier.', 'taco', '#7a3a1a', '#f2d64a'],
      ['pisces', 'TRES LECHES', 'soaked. | like my eyes.', 'cake', '#fff6e0', '#f2d0a0'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE DEBATE'], items: [
      ['virgo', 'TEX-MEX VS MEXICAN', 'I have | a slideshow.', 'quote', '#ffd36b', null, 'squint'],
    ] },
    ask: ['Order up.', 'Comment your sign', '+ your plate.'], close: 'Party first, queso after. Jan 9.', stars: ['taurus', 'aries', 'pisces', 'libra'],
  }),

  // ── hst348 · Your sign at the crawfish boil
  hst348: assigns({
    hook: 'Your sign at | the crawfish boil', bg: BG.day({ top: '#8fd0ff', bot: '#fff0c8', ground: '#5a8a3a', city: '#5a6a8a', n: 3 }), card: { kind: 'pastel', head: 'BOIL SEASON · STARTING', bg: '#fff6e0', band: '#e0402a', tc: BONE, iconS: 1.0, iconY: -30 },
    hero: (x, t) => { icon(x, 'pot', 540, 820, 0.9, '#e0402a', null, t); icon(x, 'crawfish', 260, 800 + bob(t), 0.7, '#e0402a'); icon(x, 'corn', 820, 810 + bob(t, 2), 0.7) },
    items: [
      ['aries', 'THE SPICY BATCH', 'extra cayenne. | first in line.', 'crawfish', '#e0402a'],
      ['taurus', 'THE CORN', 'the best part. | fight me.', 'corn'],
      ['gemini', 'THE SAUSAGE', 'half crawfish. | half sausage.', 'link', '#a5452a'],
      ['cancer', 'THE POTATOES', 'for the kids. | and me.', 'potato'],
      ['leo', 'THE BIG ONE', 'the biggest. | showed everyone.', 'crawfish', '#ff5a2a'],
      ['virgo', 'THE NEWSPAPER', 'spread it | perfectly.', 'paper', null, null, 'squint'],
      ['libra', 'GARLIC BUTTER', 'Viet-Cajun. | perfect balance.', 'butter'],
      ['scorpio', 'THE GARLIC', 'the secret | ingredient.', 'garlic'],
      ['sagittarius', 'THE COOLER', 'brought ice. | and a speaker.', 'cooler', '#3a8aff', '#ff5a3a'],
      ['capricorn', 'THE POT', 'running the | boil since 9.', 'pot', '#e0402a'],
      ['aquarius', 'THE PEELER', 'peels for | everybody.', 'hands', '#c98e5a'],
      ['pisces', 'THE SMALL ONES', 'too small. | let them grow.', 'crawfish', '#ff7a5a'],
    ],
    bonus: { title: ['BONUS ROUND:', 'JANUARY'], items: [
      ['virgo', 'EARLY SEASON', "it's early. | they're tiny.", 'crawfish', '#ff7a5a', null, 'wide'],
      ['leo', 'PEAK SEASON', 'see you | in March.', 'crawfish', '#e0402a', null, 'wink'],
    ] },
    ask: ['Peel or pinch?', 'Comment your sign', '+ your boil job.'], close: 'Boil season. Party season. Jan 9.', stars: ['aquarius', 'aries', 'pisces', 'taurus'],
  }),

  // ── hst349 · Your sign's Houston parking spot
  hst349: assigns({
    hook: "Your sign's Houston | parking spot", bg: BG.garage(), card: { kind: 'plain', bg: '#2b5fb0', head: 'PARKING · ALL 12 SIGNS', headCol: BONE, iconS: 0.95, iconY: -25 },
    hero: (x, t) => { icon(x, 'P', 300, 810 + bob(t), 0.75); icon(x, 'car', 560, 830 + bob(t, 1), 0.8, '#e05a3a'); icon(x, 'tree', 810, 820 + bob(t, 2), 0.7, '#2f7a3e') },
    items: [
      ['aries', 'THE FRONT ROW', 'front row. | found it first.', 'P'],
      ['taurus', 'THE SHADE SPOT', "shade. | I'm not moving.", 'tree', '#2f7a3e'],
      ['gemini', 'TWO SPOTS', 'parked twice. | changed my mind.', 'car', '#ffd84a'],
      ['cancer', "MY MOM'S DRIVEWAY", 'parked at | the family house.', 'van', '#c9a6ff'],
      ['leo', 'VALET', 'valet. | obviously.', 'car', GOLD],
      ['virgo', 'PERFECTLY CENTERED', 'centered. | backed in.', 'P', null, null, 'squint'],
      ['libra', 'THE RICE VILLAGE HUNT', 'still circling. | 20 minutes.', 'meter'],
      ['scorpio', 'THE SECRET LOT', "I'm not | telling you.", 'garage'],
      ['sagittarius', 'OFF THE FEEDER', 'walked from | the feeder. fun.', 'blade', 'FEEDER'],
      ['capricorn', 'GARAGE, LEVEL 2', 'planned it | yesterday.', 'garage'],
      ['aquarius', 'THE ROOF', 'roof level. | the view.', 'sun'],
      ['pisces', 'FAR FROM THE DOOR', 'the walk is good | for me. crying.', 'car', '#8fb0c9'],
    ],
    bonus: { title: ['BONUS ROUND:', 'JULY'], items: [
      ['leo', 'THE HOT SEAT', 'seat belt? | lava.', 'sun', null, null, 'wide'],
    ] },
    ask: ['Where do you park?', 'Comment your sign', '+ your spot.'], close: 'Find a spot. Jan 9.', stars: ['libra', 'leo', 'pisces', 'scorpio'],
  }),

  // ── hst350 · Your sign's Houston weekend plan
  hst350: assigns({
    hook: "Your sign's Houston | weekend plan", bg: BG.sunset(), card: { kind: 'polaroid', pic: '#ffd1a8', iconS: 0.95, iconY: -45 }, flip: true,
    hero: (x, t) => { icon(x, 'beach', 300, 810 + bob(t), 0.8, '#ff8fb1', '#fff3c4', t); icon(x, 'paddle', 560, 800 + bob(t, 1), 0.7, '#2b5fb0', '#8a6a4a'); icon(x, 'boat', 800, 820 + bob(t, 2), 0.7, '#ff8fb1') },
    items: [
      ['aries', 'BAYOU RUN CLUB', "6 AM. | I'm the pacer.", 'runner', '#ff5a3a'],
      ['taurus', 'BRUNCH, THE WAIT', 'the wait is | part of it.', 'brunch', '#ffb3c7'],
      ['gemini', 'TWO PLANS, ONE NIGHT', 'both. | somehow.', 'note', '#ffd84a'],
      ['cancer', 'THE FAMILY COOKOUT', 'made enough | for everybody.', 'pot', '#c98e4a'],
      ['leo', 'THE BOOTS COME OUT', 'rodeo season. | posing.', 'boot', '#c98e5a', GOLD],
      ['virgo', 'FREE MUSEUM THURSDAY', 'planned it. | every wing.', 'frame', '#ffd84a', '#5ec8ff', 'squint'],
      ['libra', 'PICKLEBALL', 'friendly game. | very competitive.', 'paddle', '#ff8fb1', '#8a6a4a'],
      ['scorpio', 'THE ROTHKO CHAPEL', 'quiet. deep. | thinking.', 'chapel'],
      ['sagittarius', 'GALVESTON DAY TRIP', 'brown water? | still going.', 'beach', '#5ec8ff', '#fff3c4'],
      ['capricorn', 'THE DOWNTOWN TUNNELS', 'closed weekends. | so, Monday.', 'tunnel'],
      ['aquarius', 'ZYDECO NIGHT', 'learning a | new dance.', 'acc', '#5ec8ff', '#ffd84a'],
      ['pisces', 'PADDLE BOATS', 'floating. dreaming. | crying.', 'boat', '#c9a6ff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'SUNDAY NIGHT'], items: [
      ['virgo', 'MEAL PREP', 'five containers. | labeled.', 'bowl', '#7dbf5a', null, 'squint'],
    ] },
    ask: ['Weekend plans?', 'Comment your sign', '+ your plan.'], close: 'Next plan: Jan 9.', stars: ['sagittarius', 'scorpio', 'pisces', 'leo'],
  }),

  // ── hst351 · Your sign in a Houston January
  hst351: assigns({
    hook: 'Your sign in | a Houston January', bg: BG.night({ ground: '#1c2038', city: '#161a34', lit: '#c9a6ff' }), card: { kind: 'plain', bg: '#2a1d52', head: 'JANUARY · HOUSTON', iconS: 1.0, iconY: -25 },
    hero: (x, t) => { icon(x, 'kingcake', 540, 820, 0.85); icon(x, 'coat', 260, 810 + bob(t), 0.6, '#e05a3a', '#2b5fb0'); icon(x, 'boot', 830, 810 + bob(t, 2), 0.6, '#c98e5a', GOLD) },
    items: [
      ['aries', 'NEW YEAR RUN CLUB', 'new year. | new pace.', 'runner', '#ff5a3a'],
      ['taurus', 'KING CAKE SEASON', 'found the | baby. twice.', 'kingcake'],
      ['gemini', 'COAT ON, COAT OFF', '55° at 8. | 80° at 3.', 'coat', '#ffd84a', '#2a2638'],
      ['cancer', 'LUNAR NEW YEAR PREP', 'cleaning. cooking. | family.', 'lamp', '#e0302a', GOLD],
      ['leo', 'BOOTS COMING OUT', "rodeo season. | I'm ready.", 'boot', '#c98e5a', GOLD],
      ['virgo', 'THE NEW PLANNER', 'color-coded. | already.', 'paper', null, null, 'squint'],
      ['libra', 'NEW YEAR, NEW MATCH', 'maybe this year. | maybe.', 'quote', '#ff8fb1'],
      ['scorpio', 'FIRST COAT WEEK', 'finally. | the black coat.', 'coat', '#1a1a22', '#c9a6ff'],
      ['sagittarius', 'FIRST CRAWFISH', "they're tiny. | I'm going.", 'crawfish', '#ff7a5a'],
      ['capricorn', 'THE BIG GAME PARTY', 'hosting. | snacks labeled.', 'tv', '#3fae5a'],
      ['aquarius', '80° AGAIN', 'told you. | shorts.', 'thermo', '80°'],
      ['pisces', 'THE BETA PARTY', "Jan 9. | I'm already crying.", 'pin', PINK],
    ],
    bonus: { title: ['BONUS ROUND:', 'JAN 9'], items: [
      ['leo', 'THE OUTFIT', 'planned since | December.', 'jacket', GOLD, '#2a2638', 'sparkle'],
    ] },
    ask: ["How's your January?", 'Comment your sign', '+ your Jan 9 plan.'], close: 'January peaks Jan 9.', stars: ['pisces', 'leo', 'taurus', 'cancer'],
  }),

  // ── hst352 · If your sign was a Houston bayou
  hst352: assigns({
    hook: 'If your sign | was a Houston bayou', bg: BG.bayou({ top: '#1a3a6e', bot: '#ffc28a', water: '#245a6a', ground: '#2f5a34' }), card: { kind: 'plain', bg: '#1d4f5a', head: 'BAYOU CITY · 12 SIGNS', headCol: '#8fe3ff', iconS: 1.0, iconY: -25 },
    hero: (x, t) => { icon(x, 'water', 540, 820, 1.2, '#2d6f8a', '#8fe3ff', t); icon(x, 'egret', 280, 780 + bob(t), 0.7); icon(x, 'turtle', 820, 820 + bob(t, 2), 0.6, '#5a8a4a') },
    items: [
      ['aries', 'BRAYS BAYOU', 'trail runner. | fastest on it.', 'runner', '#ff5a3a'],
      ['taurus', 'HUNTING BAYOU', 'quiet. green. | unbothered.', 'tree', '#3f8f4a'],
      ['gemini', 'WHITE OAK BAYOU', 'Heights side? | trail side? both.', 'water', '#3a8a6a', '#8fe3ff'],
      ['cancer', 'SIMS BAYOU', 'home. | south side.', 'turtle', '#5a8a4a'],
      ['leo', 'BUFFALO BAYOU', 'skyline views. | main character.', 'water', '#2d6f8a', GOLD],
      ['virgo', 'KEEGANS BAYOU', 'tidy trail. | perfect lines.', 'egret', BONE, null, 'squint'],
      ['libra', 'GREENS BAYOU', 'green. calm. | balanced.', 'tree', '#5aa84f'],
      ['scorpio', 'HALLS BAYOU', 'quiet. deeper | than you think.', 'water', '#1d3a4a', '#5a7a9a'],
      ['sagittarius', 'CYPRESS CREEK', 'kayak? | let\'s go.', 'boat', '#ff8a2a'],
      ['capricorn', 'CLEAR CREEK', 'a clear plan. | a clear creek.', 'water', '#5ec8ff', '#bfe6ff'],
      ['aquarius', 'SPRING CREEK', 'technically | not in the city.', 'pine', '#2f7a3e'],
      ['pisces', 'ALL OF THEM', 'every bayou. | all my feelings.', 'water', '#4aa8d8', '#c9a6ff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE TRAIL'], items: [
      ['cancer', 'THE BAYOU TRAIL', 'run club. | snacks after.', 'runner', '#ff8fb1', null, 'heart'],
    ] },
    ask: ['Bayou City.', 'Comment your sign', '+ your bayou.'], close: 'Every bayou leads to Jan 9.', stars: ['pisces', 'leo', 'capricorn', 'gemini'],
  }),

  // ── hst353 · 12 signs, 12 BBQ plates
  hst353: assigns({
    hook: '12 signs, | 12 BBQ plates. | Find yours.', bg: BG.kitchen({ wall: '#3a2418', tile: '#422818', top: '#8a5530', counter: '#2a1a10' }), card: { kind: 'chalk', head: 'SMOKED SINCE 6 AM', headCol: '#ff9a5a', iconS: 1.0, iconY: -25 },
    hero: (x, t) => { icon(x, 'plate', 300, 820 + bob(t), 0.8, '#7a3a1a', '#fff6c0'); icon(x, 'link', 560, 810 + bob(t, 1), 0.75, '#c0302a'); icon(x, 'sandwich', 810, 820 + bob(t, 2), 0.7, '#7a3a1a') },
    items: [
      ['aries', 'HOT LINKS', 'spicy. | snaps back.', 'link', '#c0302a'],
      ['taurus', 'BRISKET, MOIST', 'melts. | worth the line.', 'plate', '#7a3a1a', '#5a2a1a'],
      ['gemini', 'THE TWO-MEAT PLATE', "can't pick. | so, two.", 'plate', '#7a3a1a', '#c0302a'],
      ['cancer', 'POTATO SALAD', 'the family recipe. | sacred.', 'plate', '#fff6c0', '#f2d64a'],
      ['leo', 'BEEF RIBS', 'big. dramatic. | on display.', 'link', '#5a2a1a'],
      ['virgo', 'BRISKET, LEAN', 'lean. sliced | evenly.', 'plate', '#a5653a', '#a5653a', 'squint'],
      ['libra', 'PINTO BEANS', 'goes with | everything.', 'bowl', '#8a5a3a'],
      ['scorpio', 'BOUDIN', 'Cajun. | knows the spot.', 'link', '#8a5a3a'],
      ['sagittarius', 'CHOPPED BEEF SANDWICH', 'eating it | in the car.', 'sandwich', '#7a3a1a'],
      ['capricorn', 'WHITE BREAD & PICKLES', 'the basics. | respected.', 'sandwich', '#7dbf5a'],
      ['aquarius', 'SMOKED TURKEY', 'different. | and correct.', 'plate', '#e8c493', '#c98e4a'],
      ['pisces', 'PEACH COBBLER', 'warm. | crying.', 'cake', '#ffb38a', '#c98e4a'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE SAUCE'], items: [
      ['virgo', 'SAUCE ON THE SIDE', 'on the side. | always.', 'bottle', '#7a1a1a', '#2a2638', 'squint'],
    ] },
    ask: ['Sauce or no sauce?', 'Comment your sign', '+ your plate.'], close: 'Come hungry for fun. Jan 9.', stars: ['taurus', 'sagittarius', 'pisces', 'virgo'],
  }),

  // ── hst354 · Your sign on a 60° Houston day
  hst354: assigns({
    hook: 'Your sign on | a 60° Houston day', bg: BG.day({ top: '#9ab0c8', bot: '#dfe6ee', ground: '#4a5a4a', city: '#5a6a80', sun: false, n: 6 }), card: { kind: 'pastel', head: 'COLD FRONT · 60°', bg: '#eef6ff', band: '#2b5fb0', tc: BONE, iconS: 1.0, iconY: -30 }, tagCol: BONE, flip: true,
    hero: (x, t) => { icon(x, 'coat', 300, 810 + bob(t), 0.7, '#e05a3a', '#2b5fb0'); icon(x, 'bowl', 560, 830, 0.8, '#e8c493', BONE, t); icon(x, 'thermo', 780, 810 + bob(t, 2), 0.7, '60°', '#5ec8ff') },
    items: [
      ['aries', 'STILL IN SHORTS', "it's not cold. | I'm running.", 'thermo', '60°', '#ff5a3a'],
      ['taurus', 'PHO WEATHER', 'pho weather. | finally.', 'bowl', '#e8c493'],
      ['gemini', 'THE LAYERS', 'jacket on. | jacket off.', 'jacket', '#ffd84a', '#2a2638'],
      ['cancer', 'SOUP FOR EVERYONE', 'made a pot | for the block.', 'pot', '#c98e4a'],
      ['leo', 'THE NEW COAT', 'waited all year | for this.', 'coat', GOLD, '#2a2638'],
      ['virgo', 'THE CAR THERMOMETER', 'documented. | posted.', 'thermo', '60°', '#5ec8ff', 'squint'],
      ['libra', 'THE MATCHING SCARF', 'matching scarf | AND hat.', 'sweater', '#ff8fb1', '#fff3c4'],
      ['scorpio', 'ALL BLACK', 'finally. | the black coat.', 'coat', '#1a1a22', '#c9a6ff'],
      ['sagittarius', 'PATIO ANYWAY', "outside. | it's fine.", 'chair', '#c98e5a'],
      ['capricorn', 'HOT POT, BOOKED', 'booked it | last week.', 'pot', '#c0402a'],
      ['aquarius', 'HOT TEA BY A WINDOW', 'tea. a book. | a window.', 'cup', '#c9945a', '#8fe3ff'],
      ['pisces', 'BLANKET + A MOVIE', 'blanket. movie. | crying.', 'sweater', '#c9a6ff', '#ffb3c7'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THURSDAY'], items: [
      ['leo', '80° AGAIN', 'the coat | lasted a day.', 'thermo', '80°', BRAKE, 'wide'],
    ] },
    ask: ['Ready for 60°?', 'Comment your sign', '+ your cold-day move.'], close: 'Jan 9: coat optional.', stars: ['scorpio', 'cancer', 'pisces', 'taurus'],
  }),

  // ── hst355 · Your sign is a Houston dessert
  hst355: assigns({
    hook: 'Your sign is | a Houston dessert', bg: BG.kitchen({ wall: '#ffe1ec', tile: '#ffd0e0', top: '#ff8fb1', counter: '#8a3a5a' }), card: { kind: 'pastel', head: 'SWEET TOOTH · H-TOWN', bg: '#fff0f5', band: '#ff8fb1', iconS: 1.05, iconY: -30 },
    hero: (x, t) => { icon(x, 'kingcake', 300, 820 + bob(t), 0.7); icon(x, 'cake', 560, 820 + bob(t, 1), 0.8, '#fff6e0', '#f2d0a0'); icon(x, 'raspa', 800, 810 + bob(t, 2), 0.8, '#ffb02a', '#c0304a') },
    items: [
      ['aries', 'MANGONADA', 'sweet. spicy. | fast.', 'raspa', '#ffb02a', '#c0304a'],
      ['taurus', 'BANANA PUDDING', 'creamy. | grandma-approved.', 'cake', '#ffe9a0', '#f2c75c'],
      ['gemini', 'KING CAKE', 'who got the | baby? me.', 'kingcake'],
      ['cancer', 'PAN DULCE', 'with coffee. | with family.', 'bun', '#e8b86a', '#ffb3c7'],
      ['leo', 'TRES LECHES', 'rich. | the centerpiece.', 'cake', '#fff6e0', '#f2d0a0'],
      ['virgo', 'THE FRUIT KOLACHE', 'the real kolache. | noted.', 'kolache', '#c0304a', null, 'squint'],
      ['libra', 'MOCHI', 'soft. sweet. | balanced.', 'bun', '#ffc0d0', '#ffffff'],
      ['scorpio', 'GULAB JAMUN', 'dark. sweet. | so intense.', 'bun', '#7a3a1a', '#c98e5a'],
      ['sagittarius', 'PUFF-PUFF', 'one more. | ok, ten.', 'bun', '#d9a55a', '#fff3c4'],
      ['capricorn', 'PECAN PRALINES', 'old recipe. | perfected.', 'bun', '#a5652a', '#f2d0a0'],
      ['aquarius', 'MANGO STICKY RICE', 'different. | unforgettable.', 'plate', '#ffb02a', '#fff6e0'],
      ['pisces', 'SNOWBALL', 'melting. | like me.', 'raspa', '#8fe3ff', '#ff8fd0'],
    ],
    bonus: { title: ['BONUS ROUND:', 'SECONDS'], items: [
      ['taurus', 'PEACH COBBLER', 'seconds. | thirds.', 'cake', '#ffb38a', '#c98e4a', 'heart'],
    ] },
    ask: ['Sweet tooth?', 'Comment your sign', '+ your dessert.'], close: 'Sweetest night: Jan 9.', stars: ['gemini', 'sagittarius', 'pisces', 'taurus'],
  }),

  // ── hst356 · If your sign was a Houston tree
  hst356: assigns({
    hook: 'If your sign | was a Houston tree', bg: BG.park({ top: '#ffd1a8', bot: '#fff3dc', grass: '#5a8a3a', pond: '#5aa8c8', trees: ['#ff8fd0', '#2f7a3e', '#5aa84f'] }), card: { kind: 'plain', bg: '#1f3a2a', head: 'H-TOWN TREES · 12 SIGNS', headCol: '#7dffb0', iconS: 0.95, iconY: -20 }, tagCol: '#1b1236',
    hero: (x, t) => { icon(x, 'palm', 300, 790, 0.75, '#3fae5a', null, t); icon(x, 'moss', 560, 790, 0.75, '#2f7a3e', null, t); icon(x, 'tree', 800, 790, 0.75, '#ff8fd0', '#ffffff', t) },
    items: [
      ['aries', 'THE PALM', 'tropical. | in a hurry.', 'palm', '#3fae5a'],
      ['taurus', 'THE LIVE OAK', 'shady. steady. | forever.', 'tree', '#2f7a3e'],
      ['gemini', 'THE CREPE MYRTLE', 'pink on one street. | white on the next.', 'tree', '#ff8fd0', '#ffffff'],
      ['cancer', 'THE PECAN TREE', 'feeds the | whole yard.', 'tree', '#3f8f4a', '#8a5a2a'],
      ['leo', 'THE MAGNOLIA', 'big flowers. | big entrance.', 'tree', '#2a6a3a', '#fff6e0'],
      ['virgo', 'THE TRIMMED HEDGE', 'trimmed. | with a ruler.', 'tree', '#3f8f4a', null, 'squint'],
      ['libra', 'THE BOUGAINVILLEA', 'pretty. | on both sides.', 'flower', '#ff3aa0', GOLD],
      ['scorpio', 'THE BALD CYPRESS', 'roots in the | bayou. deep.', 'pine', '#2a5a3a'],
      ['sagittarius', 'THE BANANA PLANT', 'growing | wherever.', 'palm', '#7dd84a'],
      ['capricorn', 'THE TALL PINE', 'tall. focused. | north side.', 'pine', '#2f7a3e'],
      ['aquarius', 'THE SPANISH MOSS', 'just hangs out. | unbothered.', 'moss', '#2f7a3e'],
      ['pisces', 'THE OAK IN POLLEN SEASON', 'pollen on | everything. sorry.', 'tree', '#9ab84a', '#e0c23a'],
    ],
    bonus: { title: ['BONUS ROUND:', 'SPRING'], items: [
      ['gemini', 'THE BLUEBONNETS', 'photo season. | everyone stop.', 'flower', '#3a6aff', '#ffffff', 'sparkle'],
    ] },
    ask: ['Which tree are you?', 'Comment your sign', '+ your tree.'], close: 'Branch out. Jan 9.', stars: ['pisces', 'taurus', 'libra', 'aries'],
  }),
}
