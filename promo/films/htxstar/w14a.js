// Houston Star Talk · worker w14 · "assigns" scripts hst333–hst344 (engine: w14.js). Houston lore from
// promo/films/HOUSTON-STARTALK.md; affectionate, no brands, teams, stats, drink or disaster jokes.
import { assigns, icon, BG } from './w14.js'
import { shield, streetSign, HGREEN, BRAKE } from './kit.js'
import { GOLD, PINK, BONE } from '../signs3kit.js'

const bob = (t, k = 0) => Math.sin(t * 3 + k) * 14
const FLOUR = '#f4e1b0', CORN = '#e8c46a'

export const W14A = {
  // ── hst333 · Houston freeways as your sign
  hst333: assigns({
    hook: 'Houston freeways | as your sign', bg: BG.road(), card: { kind: 'green', head: 'NEXT EXIT · YOUR SIGN', iconS: 0.95 },
    hero: (x, t) => { shield(x, 300, 800 + bob(t), '610', 1.1); shield(x, 540, 780 + bob(t, 1), '10', 1.1); shield(x, 780, 800 + bob(t, 2), '45', 1.1) },
    items: [
      ['aries', '610 LOOP', 'already lapped | the Loop. twice.', 'shield', '610'],
      ['taurus', 'KATY FREEWAY', 'wide. comfy. | in no hurry.', 'shield', '10'],
      ['gemini', 'I-45', 'Gulf Freeway? | North? both. hi.', 'shield', '45'],
      ['cancer', 'SOUTHWEST FREEWAY', 'always drives | you home.', 'shield', '59'],
      ['leo', 'GRAND PARKWAY', 'the third loop. | main character.', 'shield', '99'],
      ['virgo', 'BELTWAY 8', 'a perfect circle. | as planned.', 'shield', '8'],
      ['libra', 'THE FEEDER ROAD', "can't commit | to the freeway.", 'blade', 'FEEDER'],
      ['scorpio', '288', 'quiet. fast. | knows a shortcut.', 'shield', '288'],
      ['sagittarius', '290', 'heading northwest | for an adventure.', 'shield', '290'],
      ['capricorn', 'THE HOV LANE', 'has a plan. | and a carpool.', 'shield', 'HOV'],
      ['aquarius', 'THE TEXAS U-TURN', 'goes the other | way. on purpose.', 'uturn', '#2b5fb0'],
      ['pisces', 'THE TALL FLYOVER', 'so high up. | so emotional.', 'blade', 'FLYOVER'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE ROADWORK'], items: [
      ['cancer', 'THE ORANGE CONE', 'been here | since before you.', 'cone', '#ff7a2a', null, 'wink'],
      ['gemini', 'THE LEFT EXIT', "surprise! | it's on the left.", 'blade', 'EXIT LEFT', null, 'wide'],
    ] },
    ask: ['Wrong?', 'Comment your sign', '+ your freeway.'], close: 'Every road leads to Jan 9.', stars: ['aries', 'libra', 'pisces', 'leo'],
  }),

  // ── hst334 · Your sign is a kolache filling
  hst334: assigns({
    hook: 'Your sign | is a kolache filling', bg: BG.kitchen({ wall: '#ffe9d6', tile: '#ffd9c0', top: '#e8a06a', counter: '#8a5232' }), card: { kind: 'case', iconS: 1.2, iconY: -50 },
    hero: (x, t) => { icon(x, 'kolache', 250, 800 + bob(t), 0.85, '#c0304a'); icon(x, 'klob', 540, 790 + bob(t, 1), 0.85); icon(x, 'kolache', 830, 800 + bob(t, 2), 0.85, '#ff9a3c') },
    items: [
      ['aries', 'CHERRY', 'red. bold. | first out the box.', 'kolache', '#c0304a'],
      ['taurus', 'CREAM CHEESE', 'soft. rich. | worth the wait.', 'kolache', '#fff6e0'],
      ['gemini', 'HALF & HALF', 'two fillings. | could not choose.', 'kolache', '#c9783a'],
      ['cancer', 'APRICOT', "tastes like | grandma's kitchen.", 'kolache', '#ff9a3c'],
      ['leo', 'PINEAPPLE', 'golden. | obviously.', 'kolache', '#ffd84a'],
      ['virgo', 'THE KLOBASNEK', "technically NOT | a kolache. I checked.", 'klob', GOLD, null, 'squint'],
      ['libra', 'STRAWBERRY', 'sweet to | literally everyone.', 'kolache', '#ff5a7a'],
      ['scorpio', 'POPPY SEED', 'dark. mysterious. | underrated.', 'kolache', '#2a2a3a'],
      ['sagittarius', 'JALAPEÑO SAUSAGE', 'spicy. | already in the car.', 'klob', '#3fae5a'],
      ['capricorn', 'PRUNE', 'classic. respected. | since forever.', 'kolache', '#5a2a4a'],
      ['aquarius', 'BOUDIN', 'a Cajun twist | nobody saw coming.', 'klob', '#8a5a3a'],
      ['pisces', 'PEACH', 'soft. sweet. | crying in the box.', 'kolache', '#ffb38a'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE ORDER'], items: [
      ['leo', 'ONE OF EACH', "it's called | range.", 'kolache', GOLD, null, 'sparkle'],
      ['capricorn', 'PRE-ORDERED', 'picked up 6:01 AM. | on the dot.', 'klob', GOLD, null, 'squint'],
    ] },
    ask: ['Kolache or klobasnek?', 'Comment your sign', '+ your filling.'], close: 'Save me a klobasnek. Jan 9.', stars: ['virgo', 'taurus', 'pisces', 'aquarius'],
  }),

  // ── hst335 · You're not a sign. You're Houston weather.
  hst335: assigns({
    hook: "You're not | a sign. You're | Houston weather.", bg: BG.studio(), card: { kind: 'tile', head: 'STAR WEATHER · 7 DAY', iconS: 1.0 },
    hero: (x, t) => { icon(x, 'sun', 300, 800 + bob(t), 1.0, GOLD, PINK, t); icon(x, 'rain', 540, 800 + bob(t, 1), 0.9, '#c9d4e8', PINK, t); icon(x, 'thermo', 760, 800 + bob(t, 2), 0.9, '55°') },
    items: [
      ['aries', 'JUNE HEAT', 'hot. fast. | shows up early.', 'sun'],
      ['taurus', 'PATIO WEATHER', 'the one perfect | day. staying out.', 'thermo', '72°', '#ffb02a'],
      ['gemini', 'SUN AND RAIN AT ONCE', 'sunny. raining. | same block.', 'rain', '#fff3c4'],
      ['cancer', 'THE 55° DAY', 'puffer coat. | soup. blanket.', 'coat', '#e05a3a', '#2b5fb0'],
      ['leo', 'OCTOBER SUMMER', 'still summer. | still iconic.', 'sun'],
      ['virgo', 'OAK POLLEN WEEK', 'wiping the car. | again.', 'pollen', null, null, 'squint'],
      ['libra', '80° IN JANUARY', 'shorts or a coat? | ...both.', 'thermo', '80°'],
      ['scorpio', 'MORNING FOG', 'mysterious. | gone by noon.', 'fog'],
      ['sagittarius', 'THE POP-UP SHOWER', 'came. went. | ten minutes. bye.', 'rain', '#c9d4e8'],
      ['capricorn', 'THE HUMIDITY', "it's not the heat. | it's me.", 'cloud', '#c9e0ff', null, 'wink'],
      ['aquarius', 'THE ARCTIC OFFICE AC', 'freezing you | indoors. in July.', 'snow', '#bfe6ff'],
      ['pisces', 'PINK SKY AFTER RAIN', 'the sky is pink. | I am crying.', 'cloud', '#ffb3c7'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE FORECAST'], items: [
      ['gemini', 'TWO SEASONS', 'summer. and | not summer.', 'sun', null, null, 'wink'],
      ['leo', '80° BY THURSDAY', 'the cold front | lasted a day.', 'thermo', '80°', null, 'wide'],
    ] },
    ask: ['Which one are you?', 'Comment your sign', '+ your forecast.'], close: 'Forecast for Jan 9: party.', stars: ['cancer', 'libra', 'pisces', 'aries'],
  }),

  // ── hst336 · Houston parks as your sign
  hst336: assigns({
    hook: 'Houston parks | as your sign', bg: BG.park(), card: { kind: 'park', head: 'CITY PARK', iconS: 0.95, headCol: '#e9d39a' }, tagCol: '#1b1236', cardY: 680,
    hero: (x, t) => { icon(x, 'boat', 330, 820 + bob(t), 0.9, '#ff8fb1', BONE, t); icon(x, 'bat', 560, 760 + bob(t, 1), 0.9, '#3a2a50', null, t); icon(x, 'lantern', 790, 810 + bob(t, 2), 0.9) },
    items: [
      ['aries', 'MEMORIAL PARK', 'three laps | before sunrise.', 'runner', '#ff5a3a'],
      ['taurus', 'HERMANN PARK', 'paddle boats. | snacks. no rush.', 'boat', '#ff8fb1'],
      ['gemini', 'DISCOVERY GREEN', 'concert, splash pad | AND a picnic.', 'fountain'],
      ['cancer', 'EMANCIPATION PARK', 'history. family. | the whole block.', 'tree', '#3f8f4a'],
      ['leo', 'BUFFALO BAYOU PARK', 'skyline views. | posing at sunset.', 'water', '#2d6f8a', '#ffb35c'],
      ['virgo', 'THE JAPANESE GARDEN', 'every stone | in its place.', 'lantern'],
      ['libra', 'MARKET SQUARE PARK', 'a little bit | of everything.', 'chair', '#c98e5a'],
      ['scorpio', 'THE WAUGH BRIDGE', 'lives for | the bats at dusk.', 'bat', '#3a2a50'],
      ['sagittarius', 'THE ARBORETUM', 'off the trail. | found a turtle.', 'pine', '#2f7a3e'],
      ['capricorn', 'LEVY PARK', 'booked the | pickleball court.', 'paddle', '#2b5fb0', '#8a6a4a'],
      ['aquarius', 'WHITE OAK TRAIL', 'biking somewhere | nobody knows.', 'water', '#3a8a6a'],
      ['pisces', 'MCGOVERN LAKE', 'talks to | the ducks. cries.', 'water', '#4aa8d8'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE SHADE'], items: [
      ['cancer', 'ANY SHADY TREE', "saw a shade spot? | that's mine.", 'tree', '#2f7a3e', null, 'wink'],
    ] },
    ask: ['Wrong?', 'Comment your sign', '+ your park.'], close: 'Touch grass. Then come Jan 9.', stars: ['taurus', 'scorpio', 'pisces', 'aries'],
  }),

  // ── hst337 · Which H-Town phrase is your sign?
  hst337: assigns({
    hook: 'Which H-Town phrase | is your sign?', bg: BG.neon(), card: { kind: 'neon', head: 'SAY IT LIKE HOUSTON', glow: PINK, iconS: 0.75, iconY: -50, nameSize: 60 },
    hero: (x, t) => { icon(x, 'quote', 540, 820 + bob(t), 1.4, PINK) },
    items: [
      ['aries', "FIXIN' TO", "fixin' to? | already did it.", 'quote', '#ff5a3a'],
      ['taurus', "Y'ALL HUNGRY?", 'I made plenty. | sit down.', 'quote', GOLD],
      ['gemini', 'MANE', 'mane, listen. | mane, wait.', 'quote', '#ffd84a'],
      ['cancer', "WHERE'D YOU GO TO HIGH SCHOOL?", 'asks everyone. | knows your aunt.', 'quote', '#8fe3ff'],
      ['leo', 'H-TOWN', 'say it louder. | H-TOWN.', 'quote', GOLD, null, 'wink'],
      ['virgo', '20 MINUTES WITHOUT TRAFFIC', 'so... an hour. | I made a chart.', 'quote', '#ff8fd0', null, 'squint'],
      ['libra', 'IS IT INSIDE THE LOOP?', 'it matters. | it really matters.', 'quote', '#ffb3c7'],
      ['scorpio', "IT'S NOT THE HEAT", "it's the humidity. | trust me.", 'quote', '#c9a6ff'],
      ['sagittarius', 'HOUSTON IS AN HOUR FROM HOUSTON', "and I'll drive it. | let's go.", 'quote', '#7dffb0'],
      ['capricorn', 'TAKE THE FEEDER', 'I know a way. | follow me.', 'quote', '#7dbf5a'],
      ['aquarius', 'SPACE CITY', 'always looking | up. literally.', 'quote', '#5ec8ff'],
      ['pisces', 'HOUSTON FRIENDLY', 'a stranger waved. | I am emotional.', 'quote', '#ff8fb1'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE PASSWORDS'], items: [
      ['virgo', 'KUYKENDAHL', "it's KIRK-en-doll. | I'll wait.", 'blade', 'KUYKENDAHL', null, 'squint'],
      ['libra', 'SAN FELIPE', 'San Fill-uh-pee. | trust us.', 'blade', 'SAN FELIPE', null, 'wink'],
    ] },
    ask: ['Say it with me.', 'Comment your sign', '+ your Houston phrase.'], close: "Y'all come. Jan 9.", stars: ['gemini', 'cancer', 'pisces', 'leo'],
  }),

  // ── hst338 · 12 signs, 12 breakfast tacos
  hst338: assigns({
    hook: '12 signs, 12 tacos. | Find yours.', bg: BG.truck({ body: '#3fae8a', stripe: '#fff3c4' }), card: { kind: 'receipt', head: 'ORDER UP · TACO TRUCK', iconS: 1.15, iconY: -20 }, cardY: 690,
    hero: (x, t) => { icon(x, 'taco', 320, 820 + bob(t), 1.1, '#c0402a', FLOUR); icon(x, 'taco', 560, 800 + bob(t, 1), 1.1, '#c9783a', CORN); icon(x, 'taco', 800, 820 + bob(t, 2), 1.1, '#3fae5a', FLOUR) },
    items: [
      ['aries', 'CHORIZO & EGG', 'spicy. fast. | eaten in the car.', 'taco', '#c0402a', FLOUR],
      ['taurus', 'BACON, EGG & CHEESE', "the classic. | don't touch it.", 'taco', '#c9783a', FLOUR],
      ['gemini', 'ONE CORN, ONE FLOUR', 'corn? flour? | yes.', 'taco', '#ffe27a', CORN],
      ['cancer', 'POTATO & EGG', 'tastes like | home. always.', 'taco', '#e8c46a', FLOUR],
      ['leo', 'BRISKET & EGG', 'the premium one. | naturally.', 'taco', '#7a3a1a', FLOUR],
      ['virgo', 'BEAN & CHEESE', 'simple. perfect. | no notes.', 'taco', '#7a4a2a', FLOUR],
      ['libra', 'MIGAS', 'a little | of everything.', 'taco', '#ffe27a', CORN],
      ['scorpio', 'BARBACOA', 'Sunday only. | secret spot.', 'taco', '#5a2a1a', CORN],
      ['sagittarius', 'EVERYTHING ON IT', 'add avocado. | add more.', 'taco', '#3fae5a', FLOUR],
      ['capricorn', 'EGG & CHEESE, x2', 'ordered ahead. | 6:45 sharp.', 'taco', '#ffd84a', FLOUR, 'squint'],
      ['aquarius', 'NOPALITOS & EGG', "cactus. | you wouldn't get it.", 'taco', '#3fae5a', CORN],
      ['pisces', 'THE LAST ONE', 'you can have it. | (crying)', 'taco', '#c9783a', FLOUR],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE SALSA'], items: [
      ['aries', 'THE RED ONE', 'the hot one. | of course.', 'bottle', BRAKE, '#2a2638', 'wink'],
      ['cancer', 'THE GREEN ONE', 'made it | for everyone.', 'bottle', '#3fae5a', '#2a2638', 'heart'],
    ] },
    ask: ['Flour or corn?', 'Comment your sign', '+ your taco.'], close: 'See you Jan 9. Bring your order.', stars: ['taurus', 'gemini', 'pisces', 'capricorn'],
  }),

  // ── hst339 · Your sign, but make it Houston food
  hst339: assigns({
    hook: 'Your sign, but make | it Houston food', bg: BG.night({ ground: '#2a1a2e', city: '#2a1838', lit: '#ff9a5a' }), card: { kind: 'chalk', head: 'TONIGHT IN H-TOWN', headCol: '#ffd36b', iconS: 1.0 },
    hero: (x, t) => { icon(x, 'crawfish', 310, 810 + bob(t), 0.9, '#e0402a'); icon(x, 'bowl', 560, 820 + bob(t, 1), 0.85, '#e8c493', BONE, t); icon(x, 'cup', 800, 800 + bob(t, 2), 0.8, '#c9a6ff', PINK) },
    items: [
      ['aries', 'CRAWFISH', 'spicy. messy. | no regrets.', 'crawfish', '#e0402a'],
      ['taurus', 'BRISKET', 'slow. smoky. | worth the wait.', 'plate', '#7a3a1a', '#c0402a'],
      ['gemini', 'VIET-CAJUN', 'two cuisines. | one plate. genius.', 'crawfish', '#ff7a2a'],
      ['cancer', 'PHO ON A 60° DAY', 'a warm hug | in a bowl.', 'bowl', '#e8c493'],
      ['leo', 'LEMON PEPPER WET', 'loud. golden. | iconic.', 'wings', '#f2d64a', '#3a3a3a'],
      ['virgo', 'QUESO', 'the right cheese. | the right chip.', 'chips', '#f2c75c'],
      ['libra', 'BOBA', 'picked the toppings | for an hour.', 'cup', '#c9a6ff', PINK],
      ['scorpio', 'SUYA', 'spicy. smoky. | knows the spot.', 'link', '#7a2a1a'],
      ['sagittarius', 'BELLAIRE HOT POT', 'the crawl ends | at midnight.', 'pot', '#c0402a'],
      ['capricorn', 'CHOPPED BEEF', 'a hardworking | sandwich. respect.', 'sandwich', '#7a3a1a'],
      ['aquarius', 'HILLCROFT CHAAT', 'crunchy, sweet, tangy. | all at once.', 'plate', '#f2c75c', '#3fae5a'],
      ['pisces', 'RASPA', 'melting. | like me.', 'raspa', '#ff5a7a', '#ffd84a'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE SIDES'], items: [
      ['gemini', 'ELOTE', 'cup or cob? | yes.', 'corn', null, null, 'wink'],
      ['taurus', 'PUFF-PUFF', 'one more. | ok, five.', 'bun', '#d9a55a', '#fff3c4', 'heart'],
    ] },
    ask: ['Hungry yet?', 'Comment your sign', '+ your Houston plate.'], close: 'Eat around the world. Party Jan 9.', stars: ['sagittarius', 'cancer', 'pisces', 'leo'],
  }),

  // ── hst340 · Which raspa flavor is your sign?
  hst340: assigns({
    hook: 'Which raspa flavor | is your sign?', bg: BG.day({ top: '#5ec8ff', bot: '#fff3c4', ground: '#c98e5a', city: '#4a6a9a' }), card: { kind: 'pastel', head: 'RASPA STAND · OPEN', bg: '#fff6e0', band: '#8fe3ff', iconS: 1.05, iconY: -40 }, tagCol: '#1b1236',
    hero: (x, t) => { icon(x, 'raspa', 320, 820 + bob(t), 1.0, '#ff5a7a', '#c0304a'); icon(x, 'raspa', 560, 800 + bob(t, 1), 1.0, '#3a8aff', '#fff'); icon(x, 'raspa', 800, 820 + bob(t, 2), 1.0, '#ffb02a', '#c0304a') },
    items: [
      ['aries', 'CHAMOY MANGO', 'sweet. spicy. | loud.', 'raspa', '#ff9a3c', '#c0304a'],
      ['taurus', 'SWEET CREAM', 'pure comfort. | no toppings.', 'raspa', '#fff6e0', '#f2c75c'],
      ['gemini', 'RAINBOW', "couldn't pick. | got them all.", 'raspa', '#ff5a7a', '#8fe3ff'],
      ['cancer', 'STRAWBERRY', 'the one from | when you were 8.', 'raspa', '#ff5a7a', '#fff'],
      ['leo', 'MANGONADA', 'the main event. | with the straw.', 'raspa', '#ffb02a', '#c0304a'],
      ['virgo', 'LIME', 'clean. refreshing. | correct.', 'raspa', '#9bd84a', '#fff'],
      ['libra', 'COTTON CANDY', 'pretty in pink | AND blue.', 'raspa', '#ffb3d9', '#8fe3ff'],
      ['scorpio', 'PICKLE', "you don't | get it. fine.", 'raspa', '#5ab84a', '#2a6a2a', 'squint'],
      ['sagittarius', "TIGER'S BLOOD", 'wild. | no explanation.', 'raspa', '#ff3a4e', '#ffd84a'],
      ['capricorn', 'TAMARIND', 'old school. | sophisticated.', 'raspa', '#8a4a2a', '#c0304a'],
      ['aquarius', 'BLUE COCONUT', "it's blue. it's | coconut. trust.", 'raspa', '#3a8aff', '#fff'],
      ['pisces', 'GRAPE, MELTED', 'it melted while | I daydreamed.', 'raspa', '#c9a6ff', '#fff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE TOPPINGS'], items: [
      ['leo', 'EXTRA CHAMOY', 'extra. | always extra.', 'raspa', '#ffb02a', '#a01a2a', 'sparkle'],
      ['sagittarius', 'ADD EVERYTHING', 'pickles? gummies? | add it.', 'raspa', '#ff5a7a', '#5ab84a', 'wide'],
    ] },
    ask: ['Pick a flavor.', 'Comment your sign', '+ your raspa.'], close: 'Stay cool. See you Jan 9.', stars: ['scorpio', 'leo', 'pisces', 'gemini'],
  }),

  // ── hst341 · Which Houston street is your sign?
  hst341: assigns({
    hook: 'Which Houston street | is your sign?', bg: BG.night({ ground: '#14303a', city: '#12283a', lit: '#7dffb0' }), card: { kind: 'green', iconS: 0.95 }, flip: true,
    hero: (x, t) => { streetSign(x, 540, 790 + bob(t), 'WESTHEIMER', { pole: false, w: 560, sub: '& EVERY OTHER STREET' }) },
    items: [
      ['aries', 'WESTHEIMER', 'felt every | single bump.', 'car', '#e05a3a'],
      ['taurus', 'BELLAIRE BLVD', 'food. food. | more food.', 'bowl', '#e8c493'],
      ['gemini', 'SHEPHERD / DURHAM', 'one goes north. | one goes south.', 'uturn', '#ffd84a'],
      ['cancer', 'HEIGHTS BLVD', 'porch. dog. | trail. home.', 'runner', '#ff8fb1'],
      ['leo', 'POST OAK BLVD', 'dressed up | just to drive by.', 'shades', '#2a2638'],
      ['virgo', 'KUYKENDAHL', "it's KIRK-en-doll. | I will correct you.", 'quote', '#f4fbf6', null, 'squint'],
      ['libra', 'MONTROSE BLVD', 'art, plants, | vintage. balance.', 'frame', '#ff8fb1', '#8fe3ff'],
      ['scorpio', 'NAVIGATION BLVD', 'knows the best | taco truck.', 'taco', '#5a2a1a', CORN],
      ['sagittarius', 'TELEPHONE RD', 'the long way. | good music.', 'note', '#ffd84a'],
      ['capricorn', 'MAIN STREET', 'downtown. business. | lunch at noon.', 'tunnel'],
      ['aquarius', 'WASHINGTON AVE', 'it changed. | I liked it before.', 'record', '#c9a6ff'],
      ['pisces', 'SAN FELIPE', 'everyone says | it wrong. I cry.', 'quote', '#8fe3ff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE CORNER'], items: [
      ['libra', 'KIRBY & RICHMOND', "can't decide | which way to turn.", 'blade', 'KIRBY', null, 'wide'],
      ['gemini', 'THE TEXAS U-TURN', 'back again. | hi again!', 'uturn', '#2b5fb0', null, 'sparkle'],
    ] },
    ask: ['Which street are you?', 'Comment your sign', '+ your street.'], close: 'All roads, one night: Jan 9.', stars: ['virgo', 'aries', 'pisces', 'taurus'],
  }),

  // ── hst342 · Your sign's Houston survival item
  hst342: assigns({
    hook: "Your sign's Houston | survival item", bg: BG.day({ top: '#ffb35c', bot: '#fff0b0', ground: '#7a5a3a', city: '#8a5a4a' }), card: { kind: 'polaroid', pic: '#ffe2a8', iconS: 0.95, iconY: -50 }, tagCol: '#1b1236', flip: true,
    hero: (x, t) => { icon(x, 'fan', 320, 820 + bob(t), 0.9, '#ff8fb1', '#8fe3ff', t); icon(x, 'sweater', 560, 800 + bob(t, 1), 0.85, '#c9a6ff', '#ffd84a'); icon(x, 'shades', 800, 810 + bob(t, 2), 0.8, '#2a2638') },
    items: [
      ['aries', 'GIANT WATER JUG', 'hydrated. | already sprinting.', 'bottle', '#5ec8ff', '#ff5a3a'],
      ['taurus', 'THE CAR COOLER', 'snacks for | the 610. obviously.', 'cooler', '#3a8aff', '#ff5a3a'],
      ['gemini', 'A HAND FAN', 'fanning me. | fanning you.', 'fan', '#ffd84a', '#ff8fb1'],
      ['cancer', 'A SWEATER FOR THE AC', "it's hot out. | I'm cold inside.", 'sweater', '#c9a6ff', '#ffd84a'],
      ['leo', 'BIG SUNGLASSES', 'sun-proof. | paparazzi-proof.', 'shades', '#2a2638'],
      ['virgo', 'THE WINDSHIELD SHADE', 'folded perfectly. | every time.', 'shade', 'FOLDED', null, 'squint'],
      ['libra', 'A CUTE UMBRELLA', 'shade AND | it matches.', 'umbrella', '#ff8fb1', '#fff3c4'],
      ['scorpio', 'BUG SPRAY', 'the mosquitoes | fear me.', 'bottle', '#3fae5a', '#2a2638'],
      ['sagittarius', 'A WIDE-BRIM HAT', 'Galveston? | leaving now.', 'hat', '#e8c88a', '#c0304a'],
      ['capricorn', 'THE SHADE SPOT', 'walked further | for the shade.', 'tree', '#2f7a3e'],
      ['aquarius', 'A TWO-SEASON CLOSET', 'all shorts. | and one coat.', 'jacket', '#5ec8ff', '#2a2638'],
      ['pisces', 'A POPSICLE', 'melting. crying. | same thing.', 'raspa', '#ff8fd0', '#fff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE ONE COLD DAY'], items: [
      ['leo', 'THE PUFFER COAT', '55°? | finally. the coat.', 'coat', GOLD, '#2a2638', 'sparkle'],
    ] },
    ask: ['What did we miss?', 'Comment your sign', '+ your survival item.'], close: 'Stay cool till Jan 9.', stars: ['cancer', 'virgo', 'pisces', 'sagittarius'],
  }),

  // ── hst343 · If your sign was a Houston ride
  hst343: assigns({
    hook: 'If your sign | was a Houston ride', bg: BG.road({ sky: ['#5a2a8a', '#ff8a6a'], city: '#2a1838' }), card: { kind: 'plain', bg: '#2a1d52', head: 'NOW ARRIVING', iconS: 1.05, iconY: -20 },
    hero: (x, t) => { icon(x, 'slab', 540, 800 + bob(t), 1.6, '#b0306a', '#ff8fd0', t) },
    items: [
      ['aries', 'THE LIFTED TRUCK', 'big. loud. | already here.', 'truck', '#e0402a'],
      ['taurus', 'THE COMFY SEDAN', 'seat warmers. | snacks. heaven.', 'car', '#8fb0c9'],
      ['gemini', 'THE RIDESHARE', 'two rides. | same night.', 'car', '#2a2638'],
      ['cancer', 'THE MINIVAN', 'three rows | of cousins.', 'van', '#c9a6ff'],
      ['leo', 'THE SLAB', 'candy paint. | swangas. star.', 'slab', '#b0306a', '#ff8fd0'],
      ['virgo', 'THE SPOTLESS HYBRID', 'washed weekly. | pollen-free.', 'car', '#e8e8e8', null, 'squint'],
      ['libra', 'THE CONVERTIBLE', 'top down on | the one cool day.', 'convert', '#ff8fb1'],
      ['scorpio', 'THE BLACK-ON-BLACK', 'tinted. quiet. | mysterious.', 'car', '#1a1a22'],
      ['sagittarius', 'THE ROAD-TRIP SUV', 'Galveston | by lunch.', 'van', '#3fae5a'],
      ['capricorn', 'THE WORK TRUCK', 'up at 5. | gets it done.', 'truck', '#8f96a0'],
      ['aquarius', 'THE VINTAGE CRUISER', 'older than you. | runs better.', 'car', '#5ec8ff'],
      ['pisces', 'THE PASSENGER SEAT', "I don't drive. | I watch the sky.", 'chair', '#c9a6ff'],
    ],
    bonus: { title: ['BONUS ROUND:', 'THE TRUNK'], items: [
      ['leo', 'THE POPPED TRUNK', 'it says BETA | PARTY JAN 9.', 'slab', GOLD, '#ffd84a', 'sparkle'],
    ] },
    ask: ['What do you drive?', 'Comment your sign', '+ your ride.'], close: 'Pull up Jan 9.', stars: ['leo', 'cancer', 'pisces', 'aries'],
  }),

  // ── hst344 · You're not a sign. You're a Houston sound.
  hst344: assigns({
    hook: "You're not | a sign. You're | a Houston sound.", bg: BG.neon({ bg: '#0c1426', lines: ['#8fe3ff', '#7dffb0', '#ffd36b'] }), card: { kind: 'neon', glow: '#8fe3ff', head: 'NOW PLAYING · H-TOWN', headCol: '#8fe3ff', iconS: 0.95 },
    hero: (x, t) => { icon(x, 'speaker', 300, 810 + bob(t), 0.8, '#8fe3ff', null, t); icon(x, 'record', 540, 800, 0.9, PINK, null, t); icon(x, 'acc', 790, 810 + bob(t, 2), 0.8, '#ff8fb1', '#ffd84a', t) },
    items: [
      ['aries', 'THE SLAB BASS', 'you heard me | two blocks away.', 'speaker', '#ff5a3a'],
      ['taurus', 'SLOW JAMS', 'slow. smooth. | no rush.', 'record', '#ffd84a'],
      ['gemini', 'BELLAIRE KARAOKE', 'a duet. | with myself.', 'mic', '#ff8fb1'],
      ['cancer', 'ZYDECO', 'accordion. family. | everybody dance.', 'acc', '#ff8fb1', '#ffd84a'],
      ['leo', 'TEJANO', 'spotlight. sequins. | encore.', 'note', GOLD],
      ['virgo', 'THE TURN SIGNAL', 'the only one | using it.', 'car', '#e8e8e8', null, 'squint'],
      ['libra', 'THE TWO-STEP', 'a partner dance. | of course.', 'boot', '#c98e5a', '#ffd84a'],
      ['scorpio', 'CHOPPED & SCREWED', 'slowed down. | mysterious.', 'record', '#c9a6ff'],
      ['sagittarius', 'CICADAS IN JULY', 'loud. outside. | free.', 'bug', '#6a8a4a'],
      ['capricorn', 'THE GOSPEL CHOIR', 'Sunday. | full volume.', 'note', '#ffd84a'],
      ['aquarius', 'THIRD WARD JAZZ', 'improvising. | always.', 'note', '#8fe3ff'],
      ['pisces', 'RAIN ON THE ROOF', 'so peaceful. | crying.', 'rain', '#c9d4e8'],
    ],
    bonus: { title: ['BONUS ROUND:', 'JULY'], items: [
      ['leo', 'THE AC ON MAX', 'the best sound | in July.', 'fan', '#8fe3ff', '#bfe6ff', 'sparkle'],
    ] },
    ask: ['Turn it up.', 'Comment your sign', '+ your Houston sound.'], close: 'Hear you Jan 9.', stars: ['cancer', 'scorpio', 'pisces', 'libra'],
  }),
}
