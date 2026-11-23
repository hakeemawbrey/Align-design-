// Houston Star Talk · worker w02 · the ADVICE episodes hst036–hst060 (engine: ./w02.js; brief: promo/posting/htx/FARM.md).
// Each: one sign's star looks at YOU, gives real, healthy dating advice with Houston jokes, ★ LESSON UNLOCKED, then the Jan 9 ticket.
import { clamp } from '../../src/lib.js'
import { advice, paddleBoat, GY, HERO, Kp, fwy, inCar, bayou, bats, paddle, neon, porch, muralWall, brunch, boil, boilTable, bakery, office, beach, museum, tunnel, lawn, danceHall, marina, karaoke, micStand, party, kitchen, bowl, cafe, mug, smallTable, coldDay, feeder, phone, dawnLoop, village, cruise, heatHaze, night, grad, ground, trees,
  label, sparkles, hearts, signChar, pop01, txt, box, tinyStar, GOLD, BONE, PINK, INK, MONO, SERIF, kolache, klobasnek, taco, streetSign, overheadSign, shield, car, heatSun, sweat, skyline, BRAKE } from './w02.js'

export const W02 = {}

// ── hst036 · Taurus, stuck on 59: being on time
W02.hst036 = advice({
  sign: 'taurus', hook: 'Hey Taurus. Yes, you. | Stuck on 59 again?', close: 'Leave early. See you Jan 9.', stars: ['taurus', 'virgo', 'capricorn', 'pisces'],
  lesson: ['Being on time is', 'a love language.'],
  beats: [
    { set: fwy({ num: '59' }), front: inCar('taurus', '#b03a5a'), at: [540, 820, 330], lines: [['Hey Taurus. Yes, *you*.', 'wide'], ['Stuck on 59 again? | I can see you from up here.', 'squint']] },
    { set: fwy({ num: '59', sunset: true }), front: (x, t, lt, P) => { inCar('taurus', '#b03a5a')(x, t, lt, P); phone(x, 820, 640, lt, [['r', 'omw!', 0.2], ['r', 'omw!!', 0.6], ['r', 'almost there', 1.0]], { s: 0.8 }) }, at: [330, 820, 330], head: 'OMW (NOT OMW)',
      lines: [["You've texted 'omw' three times. | You are not on your way.", 'eyeroll']] },
    { set: feeder({ sign: ['COFFEE', 'NEXT EXIT'] }), at: [300, 880, 300], head: 'MEANWHILE…', cast: { cancer: [[0, 800, 930, 200]] }, mood: { cancer: 'sleepy' }, looks: { cancer: [-0.6, 0] },
      lines: [['Your date is at a coffee shop | on the feeder. *Waiting.*', 'squint']] },
    { set: fwy({ num: '59', jam: true }), at: [540, 860, 360], head: 'REAL TALK',
      lines: [['Houston traffic is not | a surprise, babe.', 'neutral'], ["It's been here longer | than both of us.", 'eyeroll']] },
    { set: (x, t) => { night(x, t, '#241b3a') }, at: [540, 860, 360], head: 'THE FIX', front: (x, t, lt) => { const k = Kp(lt, 0.3); if (k > 0) { x.save(); x.translate(540, 560); x.scale(k, k); box(x, -230, -60, 460, 120, '#1f7a4a', 6); txt(x, 'LEAVE 20 MIN EARLY', 0, 2, { size: 40, col: BONE }); x.restore() } },
      lines: [['Leave twenty minutes early. | Then leave *twenty more*.', 'happy']] },
    { set: fwy({ num: '59', sunset: true }), front: (x, t, lt, P) => { inCar('taurus', '#b03a5a')(x, t, lt, P); phone(x, 800, 640, lt, [['r', 'running late,|so sorry! leaving|earlier next time', 0.3], ['l', 'thank you for|telling me ♡', 1.6]], { s: 0.82 }) }, at: [290, 820, 330], head: 'IF YOU ARE LATE',
      lines: [['And if you are late? | Say it early. Say it *honestly*.', 'happy']] },
    { set: (x, t) => night(x, t), at: [540, 860, 380], mood: { taurus: 'heart' },
      lines: [['On time says: I thought | about you *before* I got here.', 'heart']] },
  ],
})

const L = (x, y = 880, s = 340) => [x, y, s]
const date = (id, xx = 810, s = 230) => ({ [id]: [[0, xx, 960, s]] })
const sign = (label0) => (x, t, lt) => { const k = Kp(lt, 0.2); if (k > 0) { x.save(); x.translate(540, 560); x.scale(k, k); box(x, -260, -56, 520, 112, '#1f7a4a', 6); txt(x, label0, 0, 2, { size: 40, col: BONE }); x.restore() } }

// ── hst037 · Scorpio, deep in their old posts (Montrose)
W02.hst037 = advice({
  sign: 'scorpio', hook: 'Scorpio, we saw you | scrolling their | 2019 posts.', close: 'Meet them in person. Jan 9.', stars: ['scorpio', 'cancer', 'libra', 'pisces'],
  lesson: ['Curious is cute.', 'Investigating is not.'],
  beats: [
    { set: muralWall(), at: L(330), front: (x, t, lt) => phone(x, 830, 830, lt, [['l', 'beach day · 2019', 0.05], ['l', '♡ liked', 0.6]], { s: 0.6 }), lines: [['Scorpio. Put the phone *down*.', 'squint'], ['We saw you. Montrose saw you. | The *mural* saw you.', 'wide']] },
    { set: cafe(), at: L(540), head: 'DEEP SCROLL DETECTED', lines: [['You are four years deep | in their photos. On a *Tuesday*.', 'eyeroll']] },
    { set: muralWall(), at: L(540), head: 'HERE IS THE THING', lines: [['You want to know them. | That part is *sweet*.', 'happy'], ['But their past is not | a *case file*.', 'neutral']] },
    { set: cafe(), at: L(300), cast: date('cancer'), front: (x) => { smallTable(x, 560); mug(x, 470, GY - 170); mug(x, 650, GY - 170, PINK) }, head: 'TRY THIS', lines: [['Ask them. Out loud. | Over coffee on Westheimer.', 'happy'], ['honestly? a whole era.', 'happy', 'cancer']] },
    { set: cafe(), at: L(300), cast: date('cancer'), mood: { cancer: 'heart' }, front: (x) => { smallTable(x, 560); mug(x, 470, GY - 170); mug(x, 650, GY - 170, PINK) }, lines: [['"What was your 2019 like?" | Then actually *listen*.', 'sparkle']] },
    { set: muralWall(), at: L(540, 880, 380), lines: [['The best stuff is not online. | It is *in person*.', 'heart']] },
  ],
})

// ── hst038 · Leo's brunch date (Uptown)
W02.hst038 = advice({
  sign: 'leo', hook: 'Dear Leo, about | your brunch date…', close: 'Shine together. Jan 9.', stars: ['leo', 'aquarius', 'gemini', 'pisces'],
  lesson: ['The best date', 'makes room for two.'],
  beats: [
    { set: brunch(), at: L(540), lines: [['Dear Leo. Love the *outfit*.', 'sparkle'], ['Dressed up for brunch in Uptown? | Iconic. Truly.', 'wink']] },
    { set: brunch(), at: L(330), head: '90 MINUTE WAIT', lines: [['Ninety minutes in line. | That is a *whole date*.', 'happy']] },
    { set: brunch(), at: L(300), cast: date('aquarius'), mood: { aquarius: 'sleepy' }, head: 'THE PROBLEM', lines: [['You told the story about | your promotion. *Twice*.', 'eyeroll'], ['(it was a good story)', 'sleepy', 'aquarius']] },
    { set: cafe({ outside: '#bfe6ff' }), at: L(300), cast: date('aquarius'), head: 'TRY THIS', front: (x) => { smallTable(x, 560); mug(x, 650, GY - 170, PINK) }, lines: [['Ask about their day. | Then ask a *second* question.', 'happy']] },
    { set: cafe({ outside: '#bfe6ff' }), at: L(300), cast: date('aquarius'), mood: { aquarius: 'heart' }, front: (x) => { smallTable(x, 560); mug(x, 650, GY - 170, PINK) }, lines: [['Let them be the main character | for one *whole* pancake.', 'wink']] },
    { set: lawn(), at: L(540, 880, 380), lines: [['You still shine, babe. | You just *share* the light.', 'heart']] },
  ],
})

// ── hst039 · Virgo and the kolache / klobasnek moment
W02.hst039 = advice({
  sign: 'virgo', hook: 'They said kolache. | Virgo, breathe.', close: 'Bring snacks. Jan 9.', stars: ['virgo', 'gemini', 'taurus', 'pisces'],
  lesson: ['Be curious', 'before you are correct.'],
  beats: [
    { set: bakery(), at: L(300), cast: date('gemini'), front: (x) => klobasnek(x, 810, 1040, 0.8), lines: [['Virgo. *Breathe.*', 'wide'], ['They pointed at a klobasnek | and called it a kolache.', 'squint']] },
    { set: bakery(), at: L(540), head: 'TECHNICALLY…', lines: [['Yes. The sausage one | is a *klobasnek*.', 'neutral'], ['You are right. Nobody asked.', 'eyeroll']] },
    { set: bakery(), at: L(300), cast: date('gemini'), mood: { gemini: 'heart' }, front: (x) => klobasnek(x, 810, 1040, 0.8), head: 'THE MOMENT', lines: [['these are SO good', 'heart', 'gemini'], ['Look at their face. | They are *happy*.', 'sparkle']] },
    { set: bakery(), at: L(540), head: 'TRY THIS', lines: [['Pick curious over correct. | "Ooh, what is your *order*?"', 'happy']] },
    { set: bakery(), at: L(540), lines: [['You can teach the word | on the *third* date.', 'wink']] },
    { set: (x, t) => night(x, t), at: L(540, 880, 380), front: (x) => { kolache(x, 250, 1010, 0.9); klobasnek(x, 830, 1020, 0.8) }, lines: [['Nobody falls for a correction. | They fall for *warmth*.', 'heart']] },
  ],
})

// ── hst040 · Pisces at the bat bridge: say it plainly
W02.hst040 = advice({
  sign: 'pisces', hook: "If you're a Pisces, | your star | needs a word.", close: 'Say it at the party. Jan 9.', stars: ['pisces', 'cancer', 'scorpio', 'libra'],
  lesson: ['Hints are lovely.', 'Words are clearer.'],
  beats: [
    { set: bats(), at: L(540), lines: [['Pisces. Are you crying | at the *bats*?', 'wide'], ['They fly out at sunset. | It is beautiful. We know.', 'sparkle']] },
    { set: bats(), at: L(330), head: 'THE PATTERN', front: (x, t, lt) => phone(x, 800, 660, lt, [['r', '♪ you are my sunset ♪', 0.3]], { s: 0.75 }), lines: [['You liked them. Then you sent | a *song lyric*.', 'squint']] },
    { set: bayou({ sunset: true }), at: L(330), head: 'AND THEN', front: (x, t, lt) => phone(x, 800, 660, lt, [['r', '♪ you are my sunset ♪', 0], ['r', '[sunset pic]', 0.3], ['r', ':(', 1.6]], { s: 0.75 }), lines: [['Then a sunset photo. | Then a sad face.', 'neutral'], ['They still do not know | how you *feel*.', 'wide']] },
    { set: bats(), at: L(540), head: 'TRY THIS', lines: [['Say it plain. | "I really liked tonight."', 'happy']] },
    { set: bats(), at: L(540), lines: [['Four words. No riddle. | Let them *catch* you.', 'sparkle']] },
    { set: bats(), at: L(540, 880, 380), lines: [['Cry at the bats all you want. | Just *say* it after.', 'heart']] },
  ],
})

// ── hst041 · Cancer from Katy dating inside the Loop
W02.hst041 = advice({
  sign: 'cancer', hook: 'Cancer in Katy, | dating inside | the Loop?', close: 'Meet in the middle. Jan 9.', stars: ['cancer', 'scorpio', 'taurus', 'pisces'],
  lesson: ['Love meets', 'you halfway.'],
  beats: [
    { set: fwy({ num: '10' }), at: L(540, 820, 330), front: inCar('cancer', '#3a6ab0'), lines: [['Cancer. From *Katy*.', 'happy'], ['Dating someone inside | the Loop. *Brave*.', 'wide']] },
    { set: fwy({ num: '10', sunset: true }), at: L(400, 820, 330), front: (x, t, lt, P) => { inCar('cancer', '#3a6ab0')(x, t, lt, P); bowl(x, 800, 760, t, 0.9) }, head: 'THE DRIVE', lines: [['You drove to Montrose. Twice. | With *soup*.', 'sparkle']] },
    { set: fwy({ num: '10' }), at: L(540, 860, 360), head: 'AND THEM?', lines: [['Have they driven to Katy? | Even *once*?', 'squint']] },
    { set: feeder({ sign: ['COFFEE', 'HALFWAY'] }), at: L(330), head: 'TRY THIS', lines: [['Meet halfway. A coffee shop | on the feeder. *Fair*.', 'happy']] },
    { set: cafe(), at: L(540), lines: [['Or ask them to come to you. | You are allowed to *ask*.', 'happy']] },
    { set: (x, t) => night(x, t), at: L(540, 880, 380), lines: [['Love should not feel like | a one-way *commute*.', 'heart']] },
  ],
})

// ── hst042 · Aries at run club: match their pace
W02.hst042 = advice({
  sign: 'aries', hook: 'Aries, this is a date. | Not a 5K.', close: 'Walk in together. Jan 9.', stars: ['aries', 'libra', 'leo', 'pisces'],
  lesson: ['Love is not a race.', 'Match their pace.'],
  beats: [
    { set: dawnLoop(), at: [[0, 700, 880, 330], [3, 520, 880, 330]], lines: [['Aries. *Slow down.*', 'wide'], ['Run club on the bayou trail. | You lapped your date.', 'squint']] },
    { set: dawnLoop(), at: L(540), head: '5 AM ENERGY', lines: [['They said "I like to jog." | You heard "*race*."', 'eyeroll']] },
    { set: bayou(), at: L(760), cast: { libra: [[0, 230, 960, 190]] }, mood: { libra: 'sleepy' }, head: 'MEANWHILE', lines: [['…is this… fun…?', 'sleepy', 'libra'], ['Your date is back there. | Somewhere near the *bridge*.', 'wide']] },
    { set: bayou(), at: L(330), cast: date('libra'), mood: { libra: 'happy' }, head: 'TRY THIS', lines: [['Match their pace. | Talk while you *walk*.', 'happy']] },
    { set: bayou({ sunset: true }), at: L(330), cast: date('libra'), lines: [['Same with feelings. | Not everything is a *sprint*.', 'happy']] },
    { set: dawnLoop(), at: L(330, 880, 330), cast: date('libra', 760, 300), mood: { libra: 'heart' }, lines: [['Arrive together. | That is the *finish line*.', 'heart']] },
  ],
})

// ── hst043 · Gemini's six-stop Bellaire food crawl
W02.hst043 = advice({
  sign: 'gemini', hook: 'Real talk, Gemini: | six stops is a lot.', close: 'One stop: Jan 9.', stars: ['gemini', 'sagittarius', 'taurus', 'pisces'],
  lesson: ['Fewer stops.', 'Deeper talks.'],
  beats: [
    { set: neon(), at: L(540), lines: [['Gemini. Real talk.', 'wide'], ['Six stops on Bellaire. | One date. *Midnight*.', 'squint']] },
    { set: neon({ signs: ['BOBA', 'DUMPLINGS', 'PHO'] }), at: L(300), head: 'THE GROUP CHAT', front: (x, t, lt) => phone(x, 790, 660, lt, [['r', 'ok plan:', 0.1], ['r', 'boba', 0.4], ['r', 'then pho', 0.7], ['r', 'then hot pot??', 1.0], ['r', 'then dessert', 1.3]], { s: 0.75 }), lines: [['You sent the plan in | eleven *separate* texts.', 'eyeroll']] },
    { set: neon({ signs: ['HOT POT', 'NOODLES', 'BOBA', 'SWEETS'] }), at: L(540), head: 'THE REAL ISSUE', lines: [['You were so busy planning | the next stop…', 'neutral'], ['…you missed what they *said*.', 'wide']] },
    { set: neon({ signs: ['DUMPLINGS'], cols: ['#ffd36b'] }), at: L(300), cast: date('sagittarius'), head: 'TRY THIS', lines: [['Pick one spot. | Stay long enough to *talk*.', 'happy']] },
    { set: neon({ signs: ['DUMPLINGS'], cols: ['#ffd36b'] }), at: L(300), cast: date('sagittarius'), mood: { sagittarius: 'heart' }, lines: [['Ask one thing. | Then let them *finish*.', 'happy']] },
    { set: neon(), at: L(540, 880, 380), lines: [['The best stop on the crawl | is *their* story.', 'heart']] },
  ],
})

// ── hst044 · Libra in Rice Village: pick the restaurant
W02.hst044 = advice({
  sign: 'libra', hook: "Libra, it's me, | your star. Pick | the restaurant.", close: 'Easy pick: Jan 9.', stars: ['libra', 'scorpio', 'leo', 'pisces'],
  lesson: ['Your opinion', 'is part of the date.'],
  beats: [
    { set: village(), at: L(540), lines: [['Libra. It is me. Your *star*.', 'happy'], ['You have walked Rice Village | for forty minutes.', 'squint']] },
    { set: village(), at: L(400), head: 'NO PARKING EITHER', lines: [['"I don\'t mind, you pick." | You said it *four* times.', 'eyeroll']] },
    { set: village(), at: L(300), cast: date('scorpio'), mood: { scorpio: 'squint' }, lines: [['…I literally just met you', 'neutral', 'scorpio'], ['They cannot read your mind. | They *just met* you.', 'wide']] },
    { set: village(), at: L(300), cast: date('scorpio'), head: 'TRY THIS', front: (x) => taco(x, 540, 700, 1.4), lines: [['Say what you want. | "I would *love* tacos."', 'happy']] },
    { set: cafe(), at: L(540), lines: [['Having a preference is not rude. | It is *helpful*.', 'happy']] },
    { set: (x, t) => night(x, t), at: L(540, 880, 380), lines: [['They want to know you. | Let them *find* you.', 'heart']] },
  ],
})

// ── hst045 · Capricorn working late (the arctic office, the closed tunnel)
const calendarGrid = (x, t, lt) => { const k = Kp(lt, 0.1); if (k <= 0) return; x.save(); x.translate(800, 640); x.scale(k, k); box(x, -200, -170, 400, 340, BONE, 6); for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const d = i === 4 && j === 3; box(x, -180 + i * 74, -140 + j * 76, 64, 64, d ? PINK : '#9fb4c8', 3); txt(x, d ? 'date?' : 'work', -148 + i * 74, -108 + j * 76, { size: 16, col: INK, font: MONO, weight: 700 }) } x.restore() }
W02.hst045 = advice({
  sign: 'capricorn', hook: 'Capricorn, | your star caught | you working late.', close: 'Clock out for Jan 9.', stars: ['capricorn', 'virgo', 'cancer', 'pisces'],
  lesson: ['Be present.', 'That is the plan.'],
  beats: [
    { set: office(), at: L(330), lines: [['Capricorn. It is 7 p.m.', 'squint'], ['The office AC is arctic. | And you are *still* here.', 'wide']] },
    { set: tunnel({ closed: true }), at: L(540), head: 'TUNNEL: CLOSED', lines: [['You tried the tunnel home. | It is *Saturday*.', 'eyeroll']] },
    { set: office(), at: L(300), front: calendarGrid, head: 'YOUR CALENDAR', lines: [['Every block says "work." | One says "*maybe* date."', 'neutral']] },
    { set: cafe(), at: L(300), cast: date('virgo'), head: 'TRY THIS', front: (x) => { smallTable(x, 560); mug(x, 650, GY - 170, PINK) }, lines: [['Put the date on the calendar. | Then *show up* to it.', 'happy']] },
    { set: cafe(), at: L(300), cast: date('virgo'), mood: { virgo: 'heart' }, front: (x) => { smallTable(x, 560); mug(x, 650, GY - 170, PINK) }, lines: [['Laptop in the car. | Phone face *down*.', 'happy']] },
    { set: lawn(), at: L(540, 880, 380), lines: [['Your future is planned. | Leave room for *someone*.', 'heart']] },
  ],
})

// ── hst046 · Aquarius at the free museum day
W02.hst046 = advice({
  sign: 'aquarius', hook: 'Aquarius, your star | has one tiny note.', close: 'Come as you are. Jan 9.', stars: ['aquarius', 'virgo', 'gemini', 'pisces'],
  lesson: ['Stay weird.', 'And say the feeling.'],
  beats: [
    { set: museum(), at: L(540), lines: [['Aquarius. One *tiny* note.', 'happy'], ['Free museum day. Great date. | Very *you*.', 'wink']] },
    { set: museum(), at: L(300), cast: date('virgo'), mood: { virgo: 'sparkle' }, head: 'THE DATE', lines: [['so… did you like it?', 'sparkle', 'virgo'], ['They asked how you felt. | You explained the *frame*.', 'eyeroll']] },
    { set: museum(), at: L(540), head: 'WE KNOW', lines: [['You are an original. | We love the *weird*.', 'happy'], ['But they cannot hug | a *theory*.', 'neutral']] },
    { set: lawn(), at: L(300), cast: date('virgo'), head: 'TRY THIS', lines: [['Say one feeling. Out loud. | "I like being with you."', 'happy']] },
    { set: lawn(), at: L(300), cast: date('virgo'), mood: { virgo: 'heart' }, lines: [['You can be different | *and* warm. Both.', 'sparkle']] },
    { set: museum(), at: L(540, 880, 380), lines: [['Let them see the inside. | It is the best *exhibit*.', 'heart']] },
  ],
})

// ── hst047 · Sagittarius vanished to Galveston
W02.hst047 = advice({
  sign: 'sagittarius', hook: 'Sag, before you drive | to Galveston again…', close: 'Road trip: Jan 9.', stars: ['sagittarius', 'aries', 'gemini', 'pisces'],
  lesson: ['Invite them', 'on the adventure.'],
  beats: [
    { set: beach(), at: L(540), lines: [['Sag. *Before* you go.', 'wide'], ['You left the date to drive | to Galveston. At 9 p.m.', 'squint']] },
    { set: beach(), at: L(300), head: 'THE TEXT', front: (x, t, lt) => phone(x, 800, 660, lt, [['l', 'where did you go??', 0.2], ['r', 'beach!! brb', 0.9]], { s: 0.8 }), lines: [['Your date got one text: | "beach!! brb."', 'eyeroll']] },
    { set: beach(), at: L(540), head: 'WE LOVE IT, BUT', lines: [['We love the adventure. | The brown water. The *gulls*.', 'happy'], ['But adventures are better | with *company*.', 'neutral']] },
    { set: fwy({ num: '45', sunset: true }), at: L(540, 820, 330), front: inCar('sagittarius', '#e0a03a'), head: 'TRY THIS', lines: [['Invite them. | "Wanna go see the *Gulf*?"', 'happy']] },
    { set: beach(), at: L(540), lines: [['And if you need space, | *say so*. Then come back.', 'happy']] },
    { set: beach(), at: L(330, 880, 330), cast: date('aries', 760, 300), mood: { aries: 'heart' }, lines: [['Freedom and closeness | can share a *car*.', 'heart']] },
  ],
})

// ── hst048 · Taurus who never leaves the Heights
W02.hst048 = advice({
  sign: 'taurus', hook: 'Taurus, when did | you last leave | the Heights?', close: 'Leave the porch for Jan 9.', stars: ['taurus', 'sagittarius', 'cancer', 'pisces'],
  lesson: ['Visit their world.', 'Then share yours.'],
  beats: [
    { set: porch(), at: L(600), lines: [['Taurus. Real question.', 'squint'], ['When did you last | leave the *Heights*?', 'wide']] },
    { set: porch(), at: L(600), head: 'THE PORCH', lines: [['The porch. The dog. | The same coffee. *Forever*.', 'sleepy']] },
    { set: porch(), at: L(420), cast: date('sagittarius', 830), mood: { sagittarius: 'sparkle' }, head: 'MEANWHILE', lines: [['come eat on Bellaire Blvd!!', 'sparkle', 'sagittarius'], ['Your date invited you | to *their* side of town.', 'neutral']] },
    { set: neon(), at: L(300), cast: date('sagittarius'), head: 'TRY THIS', lines: [['Say yes. Try their spot. | Order what they *love*.', 'happy']] },
    { set: neon({ signs: ['NOODLES', 'BOBA'] }), at: L(540), lines: [['Comfort is beautiful. | So is a *new* street.', 'sparkle']] },
    { set: porch(), at: L(420, 880, 330), cast: date('sagittarius', 800, 300), mood: { sagittarius: 'heart' }, lines: [['Then bring them home | to the porch. *Both*.', 'heart']] },
  ],
})

// ── hst049 · Pisces at the Clear Lake marina: love who shows up
W02.hst049 = advice({
  sign: 'pisces', hook: "Pisces, the marina | can't text back.", close: 'Show up Jan 9.', stars: ['pisces', 'capricorn', 'taurus', 'cancer'],
  lesson: ["Love who's there,", 'not who might be.'],
  beats: [
    { set: marina(), at: L(540), lines: [['Pisces. *Sweetheart.*', 'wide'], ['You are staring at the water | in Clear Lake. Again.', 'sparkle']] },
    { set: marina(), at: L(540), head: 'THE DAYDREAM', front: (x, t, lt) => hearts(x, t, 540, 640, t - lt, { n: 6, spread: 260 }), lines: [['You already planned the boat. | The wedding. The *dog*.', 'heart']] },
    { set: marina({ sunset: false }), at: L(540), head: 'REALITY CHECK', lines: [['You have been on | *one* date.', 'squint'], ['And they cancelled twice.', 'neutral']] },
    { set: marina(), at: L(540), head: 'TRY THIS', lines: [['Fall for who shows up. | Not who they *could* be.', 'happy']] },
    { set: marina(), at: L(540), lines: [['Watch what they do. | Not only what you *dream*.', 'happy']] },
    { set: marina(), at: L(540, 880, 380), lines: [['You deserve someone | who shows up. *On time.*', 'heart']] },
  ],
})

// ── hst050 · Scorpio at karaoke on Bellaire
W02.hst050 = advice({
  sign: 'scorpio', hook: "Scorpio, it's | karaoke night. | Sing it. Mean it.", close: 'Sing it Jan 9.', stars: ['scorpio', 'leo', 'gemini', 'pisces'],
  lesson: ['Say it plainly.', 'No mic needed.'],
  beats: [
    { set: karaoke(), at: L(540), front: (x) => micStand(x, 800, GY), lines: [['Scorpio. Karaoke on Bellaire.', 'squint'], ['You picked the *saddest* song.', 'wide']] },
    { set: karaoke(), at: L(540), front: (x) => micStand(x, 800, GY), head: 'THE TELL', lines: [['You sang every word | while staring at *them*.', 'squint']] },
    { set: karaoke({ words: ['♪ (instrumental) ♪', ''] }), at: L(540), head: 'AND THEN', lines: [['Then: "it\'s just a song." | *Classic*.', 'eyeroll']] },
    { set: karaoke({ words: ['♪ I like you ♪', '♪ a lot ♪'] }), at: L(540), front: (x) => micStand(x, 800, GY), head: 'TRY THIS', lines: [['Say the thing without | a *backing track*.', 'happy']] },
    { set: neon({ signs: ['KARAOKE', 'TEA'] }), at: L(540), lines: [['"I like you." That is it. | You can be *brave*.', 'sparkle']] },
    { set: neon({ signs: ['KARAOKE', 'TEA'] }), at: L(540, 880, 380), lines: [['Vulnerable is not weak. | It is *magnetic*.', 'heart']] },
  ],
})

// ── hst051 · Gemini at a house party: ask the follow-up
W02.hst051 = advice({
  sign: 'gemini', hook: 'They answered, | Gemini. Ask | a follow-up.', close: 'Ask more on Jan 9.', stars: ['gemini', 'virgo', 'leo', 'pisces'],
  lesson: ['The follow-up', 'is the flirt.'],
  beats: [
    { set: party(), at: L(300), cast: date('virgo'), lines: [['Gemini. House party. | The Houston question:', 'happy'], ['"Where\'d you go to | *high school*?"', 'wink']] },
    { set: party(), at: L(300), cast: date('virgo'), head: 'THEY ANSWERED', lines: [['oh, way out in Spring!', 'happy', 'virgo'], ['And you said "cool." | Then talked to *someone else*.', 'eyeroll']] },
    { set: party(), at: L(540), head: 'GEMINI…', front: (x, t) => ['#f0603a', '#3fb6f0', '#a35cf0', '#2fc79a', '#ef5c94', '#e9b24a'].forEach((c, i) => tinyStar(x, 110 + i * 170, 690 + Math.sin(t * 3 + i) * 8, 40, c)), lines: [['You talked to nine people. | You *know* none of them.', 'squint']] },
    { set: party(), at: L(300), cast: date('virgo'), head: 'TRY THIS', lines: [['Ask a second question. | "What was that *like*?"', 'happy']] },
    { set: party(), at: L(300), cast: date('virgo'), mood: { virgo: 'sparkle' }, lines: [['Then a third. That is where | the *good stuff* is.', 'sparkle']] },
    { set: party(), at: L(300, 880, 330), cast: date('virgo', 770, 300), mood: { virgo: 'heart' }, lines: [['Being curious | *is* the flirt.', 'heart']] },
  ],
})

// ── hst052 · Cancer, let someone bring YOU the pho
W02.hst052 = advice({
  sign: 'cancer', hook: 'Cancer, let someone | bring YOU the pho.', close: 'Your turn to relax. Jan 9.', stars: ['cancer', 'aries', 'taurus', 'pisces'],
  lesson: ['Let yourself', 'be cared for.'],
  beats: [
    { set: kitchen(), at: L(400), front: (x, t) => bowl(x, 800, 790, t), lines: [['Cancer. It is *sixty* degrees.', 'wide'], ['Houston calls this winter. | You made soup for *everyone*.', 'happy']] },
    { set: kitchen(), at: L(400), front: (x, t) => { bowl(x, 760, 790, t, 0.7); bowl(x, 900, 790, t, 0.7) }, head: 'THE PATTERN', lines: [['You host. You cook. You drive | across town with *pho*.', 'sparkle']] },
    { set: kitchen(), at: L(540), head: 'BUT', lines: [['Who takes care of you? | When did you last *ask*?', 'neutral']] },
    { set: kitchen(), at: L(300), cast: date('aries'), front: (x, t) => bowl(x, 810, 790, t, 0.8), head: 'TRY THIS', lines: [['brought you pho!!', 'happy', 'aries'], ['Let them. Say *thank you*. | Stop there.', 'happy']] },
    { set: kitchen(), at: L(300), cast: date('aries'), mood: { aries: 'heart' }, lines: [['Do not apologize. | Do not repay them in *soup*.', 'wink']] },
    { set: kitchen(), at: L(540, 880, 380), lines: [['Care goes both ways. | Let it come *to* you.', 'heart']] },
  ],
})

// ── hst053 · Leo and the trunk sign (slab culture, celebrated): consistency
W02.hst053 = advice({
  sign: 'leo', hook: 'Leo, the trunk sign | is cute. But…', close: 'Pull up Jan 9.', stars: ['leo', 'scorpio', 'cancer', 'pisces'],
  lesson: ['Big gestures are fun.', 'Consistency is love.'],
  beats: [
    { set: cruise({ trunk: lt => clamp(lt / 1.2) }), at: L(820, 620, 260), lines: [['Leo. The candy paint. | The *trunk* sign.', 'sparkle'], ['Big gesture. We love it.', 'happy']] },
    { set: (x, t) => night(x, t), at: L(330), front: (x, t, lt) => phone(x, 790, 660, lt, [['l', 'hey? haven\'t heard|from you', 0.3], ['l', 'all good?', 1.4]], { s: 0.8 }), head: 'BUT THEN', lines: [['Then three days. No text. | No call. *Nothing*.', 'neutral']] },
    { set: (x, t) => night(x, t), at: L(540), head: 'THE TRUTH', lines: [['One big gesture is not | the same as *showing up*.', 'squint']] },
    { set: (x, t) => night(x, t), at: L(330), front: (x, t, lt) => phone(x, 790, 660, lt, [['r', 'good morning ☀', 0.3], ['r', 'how did the|interview go?', 1.0]], { s: 0.8 }), head: 'TRY THIS', lines: [['Text good morning. | Remember their *small* things.', 'happy']] },
    { set: cruise({ col: '#2b6ad0' }), at: L(820, 620, 260), lines: [['Small and steady, every week. | That is the real *shine*.', 'sparkle']] },
    { set: cruise({ trunk: 1 }), at: L(820, 620, 260), lines: [['Keep the slab. | Add the *consistency*.', 'heart']] },
  ],
})

// ── hst054 · Virgo's seven-tab date spreadsheet
const sheetProp = (lines) => (x, t, lt) => { const k = Kp(lt, 0.1); if (k <= 0) return; x.save(); x.translate(800, 660); x.rotate(0.04); x.scale(k, k); box(x, -190, -200, 380, 400, BONE, 6); x.fillStyle = '#7dbf5a'; x.fillRect(-190, -200, 380, 50); txt(x, 'DATE PLAN v7', 0, -174, { size: 28, col: INK, font: MONO, weight: 700 }); lines.forEach((s, i) => { x.fillStyle = i % 2 ? '#e8f0e0' : '#ffffff'; x.fillRect(-180, -140 + i * 54, 360, 48); txt(x, s, -170, -116 + i * 54, { size: 22, col: INK, font: MONO, weight: 700, align: 'left' }) }); x.restore() }
W02.hst054 = advice({
  sign: 'virgo', hook: 'Virgo, the date | is not a spreadsheet.', close: 'No spreadsheet for Jan 9.', stars: ['virgo', 'libra', 'capricorn', 'pisces'],
  lesson: ['Plan less.', 'Notice more.'],
  beats: [
    { set: cafe(), at: L(300), front: sheetProp(['6:00 arrive', '6:07 small talk', '6:15 order', '6:40 laugh (1)', '7:10 walk', '7:30 bats?']), lines: [['Virgo. We saw the *spreadsheet*.', 'wide'], ['Seven tabs. For one date. | *Color-coded*.', 'squint']] },
    { set: office(), at: L(300), front: sheetProp(['BRING SWEATER', '(AC IS ARCTIC)']), head: 'IT EVEN SAYS', lines: [['"Bring a sweater, the AC | is arctic." Okay. *Smart*.', 'happy']] },
    { set: kitchen({ temp: 'RAIN' }), at: L(540), head: 'BUT', lines: [['Then it rained for ten minutes | and the plan *broke*.', 'wide'], ['And so did you.', 'neutral']] },
    { set: cafe(), at: L(300), cast: date('libra'), head: 'TRY THIS', lines: [['Plan the start. | Leave the rest *open*.', 'happy']] },
    { set: cafe(), at: L(300), cast: date('libra'), mood: { libra: 'heart' }, lines: [['The best part is the thing | you did not *schedule*.', 'sparkle']] },
    { set: lawn(), at: L(540, 880, 380), lines: [['Bring the sweater. | Leave room for *magic*.', 'heart']] },
  ],
})

// ── hst055 · Libra at two-step night: take turns leading
W02.hst055 = advice({
  sign: 'libra', hook: 'Libra, somebody | has to lead | the two-step.', close: 'Dance with us Jan 9.', stars: ['libra', 'capricorn', 'leo', 'pisces'],
  lesson: ['Take turns', 'leading.'],
  beats: [
    { set: danceHall(), at: L(540), lines: [['Libra. Two-step night.', 'happy'], ['You both stood there. Waiting | for the *other* to lead.', 'squint']] },
    { set: danceHall(), at: L(330), cast: date('capricorn', 760), mood: { capricorn: 'neutral' }, head: 'THE STANDOFF', lines: [['you lead?', 'neutral', 'capricorn'], ['"No, you lead." | For a whole *song*.', 'eyeroll']] },
    { set: danceHall(), at: L(540), head: 'THE TRUTH', lines: [['Being polite is lovely. | Being *stuck* is not.', 'neutral']] },
    { set: danceHall(), at: L(330), cast: date('capricorn', 760), head: 'TRY THIS', lines: [['"I will lead this one. | You lead the *next*."', 'happy']] },
    { set: danceHall(), at: [[0, 360, 880, 300], [1.5, 480, 860, 300], [3, 360, 880, 300]], cast: { capricorn: [[0, 720, 880, 300], [1.5, 600, 900, 300], [3, 720, 880, 300]] }, mood: { capricorn: 'heart' }, lines: [['Take turns. Talk it out. | That is the *dance*.', 'sparkle']] },
    { set: danceHall(), at: L(540, 880, 380), lines: [['Love is a two-step. | *Both* of you move.', 'heart']] },
  ],
})

// ── hst056 · Aries missed the exit: the Texas U-turn apology
W02.hst056 = advice({
  sign: 'aries', hook: 'Missed the exit, | Aries? Take | the U-turn.', close: 'Exit here: Jan 9.', stars: ['aries', 'libra', 'sagittarius', 'pisces'],
  lesson: ['Apologize first.', 'Then talk.'],
  beats: [
    { set: feeder({ sign: ['EXIT', 'MISSED IT'], shop: false }), at: L(540, 820, 330), front: inCar('aries', '#e0402a'), lines: [['Aries. You missed the *exit*.', 'wide'], ['On the argument, we mean.', 'squint']] },
    { set: fwy({ num: '290', jam: false }), at: L(540, 820, 330), front: inCar('aries', '#e0402a'), head: 'WHAT HAPPENED', lines: [['They said one thing. | You *floored* it.', 'eyeroll']] },
    { set: fwy({ num: '290', jam: false, sunset: true }), at: L(540, 820, 330), front: inCar('aries', '#e0402a'), head: 'NOW', lines: [['Now you are three exits | past the point. *Still going*.', 'neutral']] },
    { set: feeder({ sign: ['U-TURN', 'ONLY'] }), at: L(330), head: 'TRY THIS', lines: [['Houston gave you | the Texas *U-turn*. Use it.', 'happy']] },
    { set: feeder({ sign: ['U-TURN', 'ONLY'] }), at: L(330), front: (x, t, lt) => phone(x, 800, 660, lt, [['r', 'I got heated.|I\'m sorry.', 0.3], ['r', 'can we try again?', 1.0], ['l', 'yes. thank you ♡', 2.2]], { s: 0.8 }), lines: [['"I got heated. I\'m sorry. | Can we *try again*?"', 'happy']] },
    { set: (x, t) => night(x, t), at: L(540, 880, 380), lines: [['Turning back is not losing. | It is *brave*.', 'heart']] },
  ],
})

// ── hst057 · Capricorn's first date is not an interview
const clipboard = (x, P, id) => { const [cx, cy, s] = P.at(id); x.save(); x.translate(cx + s * 0.42, cy + s * 0.05); x.rotate(0.12); box(x, -50, -66, 100, 132, '#a87a52', 5); box(x, -40, -50, 80, 106, BONE, 3); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(-30, -34 + k * 22, 56, 6) } box(x, -20, -76, 40, 18, '#9aa0aa', 3); x.restore() }
W02.hst057 = advice({
  sign: 'capricorn', hook: "Capricorn, it's | a first date. | Not an interview.", close: 'No interviews on Jan 9.', stars: ['capricorn', 'pisces', 'taurus', 'leo'],
  lesson: ['Ask to know them,', 'not to grade them.'],
  beats: [
    { set: cafe(), at: L(300), cast: date('pisces'), front: (x, t, lt, P) => { smallTable(x, 560); clipboard(x, P, 'capricorn') }, lines: [['Capricorn. First date.', 'happy'], ['You brought a *clipboard*.', 'wide']] },
    { set: cafe(), at: L(300), cast: date('pisces'), mood: { pisces: 'wide' }, front: (x, t, lt, P) => { smallTable(x, 560); clipboard(x, P, 'capricorn') }, head: 'QUESTION 1', lines: [['"Where do you see yourself | in *five years*?"', 'squint'], ['…in this chair? crying?', 'wide', 'pisces']] },
    { set: cafe(), at: L(300), cast: date('pisces'), front: (x, t, lt, P) => { smallTable(x, 560); clipboard(x, P, 'capricorn') }, head: 'QUESTION 2', lines: [['"Inside the Beltway? Or the | *Grand Parkway*?"', 'neutral']] },
    { set: cafe(), at: L(540), head: 'TRY THIS', front: (x) => taco(x, 540, 640, 1.4), lines: [['Ask fun things. | "Best taco you *ever* had?"', 'happy']] },
    { set: cafe(), at: L(300), cast: date('pisces'), mood: { pisces: 'heart' }, front: (x) => smallTable(x, 560), lines: [['Laugh first. | The five-year plan can *wait*.', 'sparkle']] },
    { set: lawn(), at: L(540, 880, 380), lines: [['You are not hiring. | You are getting to *know* them.', 'heart']] },
  ],
})

const boats = (x, t, lt, P) => { for (const id of ['aquarius', 'leo']) { const p = P.at(id); if (p) paddleBoat(x, p[0], p[1] + p[2] * 0.42, id === 'leo' ? '#ffd36b' : '#8fe3ff', t, id.length, p[2] / 300) } }
// ── hst058 · Aquarius pedaling the paddle boat alone
W02.hst058 = advice({
  sign: 'aquarius', hook: "Aquarius, you're | pedaling that | boat alone.", close: 'Both of you: Jan 9.', stars: ['aquarius', 'leo', 'libra', 'pisces'],
  lesson: ['Both people', 'pedal.'],
  beats: [
    { set: paddle(), front: boats, at: L(540), lines: [['Aquarius. Paddle boats | at the park.', 'happy'], ['You are doing all | the *pedaling*.', 'wide']] },
    { set: paddle(), front: boats, at: L(300), cast: date('leo'), mood: { leo: 'sleepy' }, head: 'AND THEM?', lines: [['wow. so pretty out here', 'sleepy', 'leo'], ['They are enjoying the view. | *Feet up*.', 'eyeroll']] },
    { set: paddle(), front: boats, at: L(540), head: 'THE PATTERN', lines: [['You plan. You text first. | You do *everything*.', 'neutral'], ['And you say "it\'s fine."', 'squint']] },
    { set: paddle(), front: boats, at: L(300), cast: date('leo'), mood: { leo: 'wide' }, head: 'TRY THIS', lines: [['Say it. "Hey, can you | pedal *too*?"', 'happy']] },
    { set: paddle(), front: boats, at: L(300), cast: date('leo'), mood: { leo: 'happy' }, lines: [['Asking is not needy. | It is *fair*.', 'sparkle']] },
    { set: paddle(), front: boats, at: L(330, 880, 330), cast: date('leo', 760, 300), mood: { leo: 'heart' }, lines: [['Both pedal. | The boat goes *straight*.', 'heart']] },
  ],
})

// ── hst059 · Sagittarius, they invited you (Lunar New Year on Bellaire)
W02.hst059 = advice({
  sign: 'sagittarius', hook: 'Hey Sag. Yes, you. | They invited you. Go.', close: 'You are invited: Jan 9.', stars: ['sagittarius', 'cancer', 'gemini', 'pisces'],
  lesson: ['Show up', 'to their world.'],
  beats: [
    { set: neon({ signs: ['DUMPLINGS', 'BAKERY', 'TEA'], lanterns: true }), at: L(540), lines: [['Hey Sag. Yes, *you*.', 'wide'], ['They invited you to | Lunar New Year on Bellaire.', 'happy']] },
    { set: fwy({ num: '290', jam: false }), at: L(540, 820, 330), front: inCar('sagittarius', '#e0a03a'), head: 'YOU SAID', lines: [['You said "maybe." | Then planned a trip to *Austin*.', 'eyeroll']] },
    { set: neon({ signs: ['DUMPLINGS', 'BAKERY', 'TEA'], lanterns: true }), at: L(540), head: 'WHY IT MATTERS', lines: [['An invite to their thing | is a *big* deal.', 'neutral'], ['It means "I want you | in *my* world."', 'sparkle']] },
    { set: neon({ signs: ['DUMPLINGS', 'BAKERY', 'TEA'], lanterns: true }), at: L(300), cast: date('cancer'), head: 'TRY THIS', lines: [['Go. Meet their people. | Eat what *auntie* serves.', 'happy']] },
    { set: neon({ signs: ['NOODLES', 'SWEETS'], lanterns: true }), at: L(540), lines: [['Adventure is not only far away. | It is *right here*.', 'sparkle']] },
    { set: neon({ signs: ['DUMPLINGS', 'BAKERY', 'TEA'], lanterns: true }), at: L(330, 880, 330), cast: date('cancer', 760, 300), mood: { cancer: 'heart' }, lines: [['Show up to their things. | That is how love *grows*.', 'heart']] },
  ],
})

// ── hst060 · Taurus, the crawfish are small in January: patience
W02.hst060 = advice({
  sign: 'taurus', hook: "Taurus, it's January. | The crawfish | are small.", close: 'Let it grow. Jan 9.', stars: ['taurus', 'leo', 'cancer', 'pisces'],
  lesson: ['Good things', 'take a season.'],
  beats: [
    { set: boil(), at: L(540, 820, 320), front: (x, t) => boilTable(x, t, { tiny: true }), lines: [['Taurus. It is *January*.', 'squint'], ['The crawfish are still | *tiny*. You know this.', 'wide']] },
    { set: boil(), at: L(540, 820, 320), front: (x, t) => boilTable(x, t, { tiny: true }), head: 'YOU, HOWEVER', lines: [['You ordered a whole sack. | Already *disappointed*.', 'eyeroll']] },
    { set: boil(), at: L(540), head: 'SAME WITH LOVE', lines: [['Two dates in, you want | the *whole* season.', 'neutral'], ['Big feelings. Small crawfish.', 'wink']] },
    { set: boil(), at: L(540), head: 'TRY THIS', lines: [['Let it grow. | Good things take a *season*.', 'happy']] },
    { set: boil(), at: L(540), lines: [['Keep showing up. | Spring is *coming*.', 'sparkle']] },
    { set: boil(), at: L(540, 820, 360), front: (x, t) => boilTable(x, t), lines: [['Patience is not boring. | It is *delicious*.', 'heart']] },
  ],
})
