// Houston Star Talk · worker w01 · 25 ADVICE episodes (hst011–hst035). Engine: ./w01.js (advice) on starrace/ep.js.
import { advice, GY } from './w01.js'

export const W01 = {
  // ♉ Taurus · stuck on 59 · lofi
  hst011: advice({
    sign: 'taurus', hook: 'Taurus, stuck on | 59 again?', close: 'New exit: Jan 9.', stars: ['taurus', 'cancer', 'virgo', 'pisces'],
    lesson: ['Comfort is home.', 'Growth is the date.'],
    beats: [
      { set: 'freeway', o: { road: '59', speed: 12 }, mood: 'squint', say: ['Hey Taurus. Yes, *you*.'] },
      { set: 'freeway', o: { road: '59', speed: 0 }, mood: 'eyeroll', say: ['Same lane. Same exit. Same playlist.'] },
      { set: 'tacotruck', mood: 'neutral', say: ['Same taco order since 2019.'], stick: 'BEAN + CHEESE. AGAIN.' },
      { set: 'porch', mood: 'sleepy', say: ['And every date idea is "maybe next week."'] },
      { set: 'porch', mood: 'wide', say: ['Comfort is your *superpower*.', 'But love needs one new exit.'] },
      { set: 'bellaire', mood: 'sparkle', say: ['Say yes to their side of town.'], stick: ['NEW EXIT UNLOCKED', '#7dffb0'] },
      { set: 'bats', mood: 'heart', say: ['Bellaire food crawl. Bats at sunset.', 'Let someone show you *their* Houston.'] },
    ],
  }),

  // ♏ Scorpio · reading texts like evidence · synthwave
  hst012: advice({
    sign: 'scorpio', hook: 'Scorpio, stop | reading texts | like evidence.', close: 'Ask in person. Jan 9.', stars: ['scorpio', 'pisces', 'gemini', 'cancer'],
    lesson: ["Don't investigate.", 'Just ask.'],
    beats: [
      { set: 'phone', o: { who: 'THE DATE', msgs: [[-1, 'omw!', 2.7], [-1, '20 min', 3.0]] }, at: [300, 860, 280], mood: 'squint', say: ['Scorpio. I see you zooming in on that text.'] },
      { set: 'phone', o: { who: 'THE DATE', msgs: [[-1, 'omw!', -1], [-1, '20 min', -1], [1, '...it has been 45', 0.6]] }, at: [300, 860, 280], mood: 'squint', say: ['"20 minutes" became 45. You opened a case file.'], stick: ['CASE #610', '#ff3a4e'], stickY: 220 },
      { set: 'freeway', o: { road: '610', speed: 0 }, mood: 'wide', say: ['Babe. It is the *610* at 5pm.'] },
      { set: 'freeway', o: { road: '610', speed: 6 }, mood: 'eyeroll', say: ["Nobody's hiding anything. They're just in traffic."] },
      { set: 'night', mood: 'neutral', cast: { pisces: [860, 900, 170, 'wide'] }, say: ["When something feels off, don't dig. *Ask*.", ['pisces', '*sniff* that was beautiful']] },
      { set: 'feeder', o: { street: 'HALFWAY', sub: 'COFFEE · NEXT EXIT' }, mood: 'happy', say: ['"Hey, everything good?" Out loud. With your voice.'], stickY: 330, stick: ['TRUST > TRACKING', '#7dffb0'] },
    ],
  }),

  // ♌ Leo · share the spotlight · funk
  hst013: advice({
    sign: 'leo', hook: 'Dear Leo: | share the mic.', close: 'Bring your best listener. Jan 9.', stars: ['leo', 'libra', 'aquarius', 'sagittarius'], wear: { leo: 'crown' },
    lesson: ['The best date', 'feels heard.'],
    beats: [
      { set: 'slab', o: { col: '#e0a030', col2: '#e05a3a' }, at: [540, 640, 260], mood: 'sparkle', say: ['Dear Leo. Yes, you. In the candy paint.'] },
      { set: 'mural', mood: 'heart', say: ['Third mural selfie on this date. Iconic, honestly.'], stick: 'SELFIE #3' },
      { set: 'texmex', mood: 'happy', cast: { libra: [880, 920, 170, 'sleepy'] }, say: ['But your date just asked about your day…', 'twenty minutes ago.'] },
      { set: 'texmex', mood: 'wide', cast: { libra: [880, 920, 170, 'sleepy'] }, say: ['Your story about the dance-off has four parts.'] },
      { set: 'karaoke', o: { song: 'DUET MODE', lyric: 'your turn ♪' }, mood: 'neutral', say: ['Here is the move: pass them the mic.', 'Ask about *their* day. Then a follow-up.'] },
      { set: 'karaoke', o: { song: 'DUET MODE', lyric: 'both of us ♪' }, mood: 'heart', cast: { libra: [860, 900, 190, 'heart'] }, say: ['Watch them light up. That glow? Looks good on you.'], stick: ['DUET UNLOCKED', '#ff8fb1'] },
    ],
  }),

  // ♓ Pisces · say what you need · dreamy
  hst014: advice({
    sign: 'pisces', hook: 'Crying at brunch | again, Pisces?', close: 'Tissues welcome. Jan 9.', stars: ['pisces', 'cancer', 'taurus', 'virgo'],
    lesson: ["They can't guess.", 'So tell them.'],
    beats: [
      { set: 'brunch', mood: 'sparkle', say: ['Pisces. Hi. Yes, I see the tears.'] },
      { set: 'brunch', mood: 'heart', say: ['The wait is 90 minutes and you are already in love.'], stick: 'WAIT: FOREVER' },
      { set: 'lawn', mood: 'wide', say: ['Then they pick the patio. In the heat.', 'And you say "it\'s fine."'] },
      { set: 'heat', mood: 'squint', say: ['It was not fine. You were melting.'], stick: ['NOT FINE', '#ff3a4e'] },
      { set: 'paddle', mood: 'sparkle', cast: { cancer: [870, 900, 180, 'happy'] }, wear: { cancer: 'glasses' }, say: ['Your feelings are good data. Use your words.', ['cancer', 'Inside table, please. Say it, baby.']] },
      { set: 'office', mood: 'happy', say: ['"Can we sit inside?" See? Nobody cried.', '…except you. Happy tears. Allowed.'] },
    ],
    tags: { cancer: '♋ AUNTIE CANCER' },
  }),

  // ♈ Aries · slow down · chiptune
  hst015: advice({
    sign: 'aries', hook: 'Aries, this is | a date. Not | the 610.', close: 'No speeding on Jan 9.', stars: ['aries', 'leo', 'sagittarius', 'gemini'],
    lesson: ['Fast is fun.', 'Steady is love.'],
    beats: [
      { set: 'freeway', o: { road: '610', speed: 140, brake: 0, top: '#1a2a6a', bot: '#ff5a6e' }, mood: 'squint', say: ['Aries. Ease off the gas for one second.'] },
      { set: 'loops', o: { dots: [[300, 620, '#f0603a', 'DATE 1'], [540, 560, '#f0603a', 'DATE 2'], [780, 620, '#f0603a', '"MOVE IN?"']] }, mood: 'wide', say: ['First date Monday. Talking leases by Wednesday.'] },
      { set: 'run', o: { sign: 'RUN CLUB · 6AM' }, mood: 'happy', wear: { aries: 'headband' }, say: ['You even turned the run club into a race.'], stick: '1ST PLACE. ALONE.' },
      { set: 'bayou', mood: 'neutral', say: ['Chemistry is great. It is not a deadline.'] },
      { set: 'bayou', o: { top: '#3a2a70', bot: '#ffb37a' }, mood: 'sparkle', cast: { gemini: [860, 900, 180, 'happy'] }, say: ['Walk the bayou at *their* pace.', 'Ask a second question. Then a third.'] },
      { set: 'paddle', mood: 'heart', cast: { gemini: [860, 900, 180, 'heart'] }, say: ['Paddle boats only go slow. That is the point.'], stick: ['SPEED: CUTE', '#7dffb0'] },
    ],
  }),

  // ♍ Virgo · stop grading the date · jazzy
  hst016: advice({
    sign: 'virgo', hook: 'Virgo, we need | to talk about | the kolache.', close: 'No grading on Jan 9.', stars: ['virgo', 'taurus', 'capricorn', 'pisces'], wear: { virgo: 'clipboard' },
    lesson: ['Small mistakes', 'can be cute.'],
    beats: [
      { set: 'kolache', mood: 'squint', say: ['Virgo. Put the clipboard down. Gently.'] },
      { set: 'kolache', mood: 'wide', say: ['They brought you "kolaches." With *sausage*.'], stick: ['TECHNICALLY A KLOBASNEK', '#ff8fb1'] },
      { set: 'kolache', mood: 'eyeroll', say: ['And you corrected them. Before saying thank you.'] },
      { set: 'porch', mood: 'neutral', cast: { taurus: [200, 900, 180, 'happy'] }, wear: { taurus: 'glasses' }, say: [['taurus', 'Baby, they woke up early for you.'], 'Auntie Taurus is right. Look at the effort.'] },
      { set: 'porch', mood: 'sparkle', say: ['You are not grading a date. You are *on* one.', 'Say thanks. Eat the klobasnek.'] },
      { set: 'lawn', mood: 'heart', say: ['Then nerd out about pastry. Together. Cute.'], stick: ['GRADE: A+', '#7dffb0'] },
    ],
    tags: { taurus: '♉ AUNTIE TAURUS' },
  }),

  // ♊ Gemini · pick one plan · pop
  hst017: advice({
    sign: 'gemini', hook: '14 date ideas. | Pick one, Gemini.', close: 'One plan: Jan 9.', stars: ['gemini', 'aries', 'libra', 'aquarius'],
    lesson: ['Clear plans', 'are romantic.'],
    beats: [
      { set: 'bellaire', mood: 'wide', say: ['Gemini! Hi! Breathe! Your date said "anything."'] },
      { set: 'phone', o: { who: 'GEMINI', msgs: [[1, 'pho?', 0], [1, 'or hot pot', 0.3], [1, 'karaoke??', 0.6], [1, 'bats at 7?', 0.9]] }, at: [300, 860, 280], mood: 'sparkle', say: ['So you sent fourteen ideas in one minute.'], stickY: 220, stick: 'TYPING…' },
      { set: 'phone', o: { who: 'THE DATE', msgs: [[-1, 'um', 0], [-1, 'you pick?', 0.8]] }, at: [300, 860, 280], mood: 'squint', say: ['Too many options feels like no plan at all.'] },
      { set: 'pho', o: { temp: '61°' }, mood: 'happy', say: ['Pick one. It is 61 degrees. That is *pho* weather.'], stick: 'PLAN: PHO. 7PM.' },
      { set: 'bellaire', mood: 'sparkle', cast: { aquarius: [860, 900, 180, 'heart'] }, say: ['A clear plan says "I thought about you."', 'Save the other thirteen for later dates.'] },
      { set: 'karaoke', o: { lyric: 'date #2 ♪' }, mood: 'heart', say: ['Karaoke is date two. See? You planned ahead.'] },
    ],
  }),

  // ♋ Cancer · let someone care for you · house
  hst018: advice({
    sign: 'cancer', hook: 'Cancer, who\'s | feeding *you*?', close: 'Come get spoiled. Jan 9.', stars: ['cancer', 'pisces', 'taurus', 'scorpio'],
    lesson: ['Let someone', 'take care of you.'],
    beats: [
      { set: 'crawfish', mood: 'happy', say: ['Cancer. You boiled crawfish for twenty people.'] },
      { set: 'crawfish', mood: 'wide', cast: { pisces: [180, 900, 160, 'heart'], gemini: [900, 900, 160, 'happy'] }, say: ['You peeled for everyone. You ate one potato.'], stick: 'HOST MODE: MAX' },
      { set: 'porch', mood: 'sleepy', say: ['Then your date offered to bring dinner…', 'and you said "oh no, I got it."'] },
      { set: 'porch', mood: 'neutral', say: ['You show love by feeding people. Beautiful.', 'Now let it come *back*.'] },
      { set: 'tacotruck', o: { col: '#3fb6f0' }, mood: 'sparkle', cast: { scorpio: [870, 900, 180, 'happy'] }, say: ['Let them pick you up. Let them buy the tacos.'], stick: ['YOU: SEATED', '#7dffb0'] },
      { set: 'lawn', mood: 'heart', cast: { scorpio: [870, 900, 180, 'heart'] }, say: ['Receiving is a skill. Practice it.'] },
    ],
  }),

  // ♎ Libra · have a preference · lofi
  hst019: advice({
    sign: 'libra', hook: 'Tex-Mex or | Mexican? Libra\'s | still deciding.', close: 'Decision made: Jan 9.', stars: ['libra', 'gemini', 'leo', 'capricorn'],
    lesson: ['Your opinion', 'is attractive.'],
    beats: [
      { set: 'texmex', mood: 'wide', say: ['Libra. Your date asked: Tex-Mex or Mexican?'] },
      { set: 'texmex', mood: 'squint', say: ['That was eleven minutes ago.'], stick: 'STILL DECIDING' },
      { set: 'feeder', o: { street: 'WESTHEIMER', sub: 'BOTH. EVERY BLOCK.' }, mood: 'eyeroll', say: ['You love both. Everyone on Westheimer does.'] },
      { set: 'night', mood: 'neutral', say: ['But "I don\'t mind" every time gets lonely.', 'They want to know *you*.'] },
      { set: 'texmex', o: { wall: '#3fae8a' }, mood: 'sparkle', say: ['Try: "Queso tonight. Next time, your pick."'], stick: ['QUESO. DECIDED.', '#f2c75c'] },
      { set: 'texmex', o: { wall: '#3fae8a' }, mood: 'heart', cast: { capricorn: [870, 900, 180, 'heart'] }, say: ['See? The world stayed balanced. And fed.'] },
    ],
  }),

  // ♐ Sagittarius · consistency · funk
  hst020: advice({
    sign: 'sagittarius', hook: 'Sagittarius, your | date wants | Tuesdays too.', close: 'Show up. Starting Jan 9.', stars: ['sagittarius', 'aries', 'virgo', 'cancer'],
    lesson: ['Adventure is fun.', 'Showing up is love.'],
    beats: [
      { set: 'beach', mood: 'sparkle', say: ['Sag! Galveston day trip, Friday. Love it.'] },
      { set: 'marina', mood: 'happy', say: ['Clear Lake boat ride Saturday. Adventurous!'], stick: 'WEEKEND: LEGENDARY' },
      { set: 'phone', o: { who: 'THE DATE', msgs: [[-1, 'hey, how was', 0], [-1, 'your tuesday?', 0.2], [-1, '…hello?', 1.2]] }, at: [300, 860, 280], mood: 'wide', say: ['Then Tuesday comes and you vanish.'] },
      { set: 'night', mood: 'neutral', say: ['Big dates are fun. Small check-ins build trust.'] },
      { set: 'tacotruck', mood: 'sparkle', cast: { virgo: [870, 900, 180, 'happy'] }, say: ['A breakfast taco on a Tuesday? Romantic.', 'A "how was work?" text? *Very*.'] },
      { set: 'lawn', mood: 'heart', cast: { virgo: [870, 900, 180, 'heart'] }, say: ['Be the adventure *and* the regular.'], stick: ['TUESDAY: CUTE', '#7dffb0'] },
    ],
  }),

  // ♑ Capricorn · be reachable · jazzy
  hst021: advice({
    sign: 'capricorn', hook: '9pm downtown. | Capricorn is | still working.', close: 'Clock out. Jan 9.', stars: ['capricorn', 'virgo', 'taurus', 'libra'],
    lesson: ['Be busy.', 'But be reachable.'],
    beats: [
      { set: 'night', mood: 'squint', say: ['Capricorn. It is 9pm. Close the laptop.'] },
      { set: 'tunnel', mood: 'neutral', wear: { capricorn: 'scarf' }, say: ['You took the tunnels to dodge the heat. Smart.', 'You also skipped lunch. Again.'] },
      { set: 'phone', o: { who: 'THE DATE', msgs: [[-1, 'dinner?', 0], [1, 'q3 tho', 0.5]] }, at: [300, 860, 280], mood: 'eyeroll', say: ['They asked about dinner. You said "after Q3."'], stickY: 220, stick: 'REPLY: LATER' },
      { set: 'office', mood: 'sleepy', say: ['Ambition is hot. Ghosting for a spreadsheet is not.'] },
      { set: 'museum', o: { sign: '' }, mood: 'sparkle', say: ['Put one date on the calendar. Like a meeting.', 'Free museum Thursday. Done.'], stick: ['BOOKED', '#7dffb0'] },
      { set: 'museum', mood: 'heart', cast: { libra: [870, 900, 180, 'heart'] }, say: ['Phone in your pocket. You are *off* the clock.'] },
    ],
  }),

  // ♒ Aquarius · answer with a feeling · dreamy
  hst022: advice({
    sign: 'aquarius', hook: 'Aquarius, they | asked how | you feel.', close: 'Feel it out. Jan 9.', stars: ['aquarius', 'gemini', 'pisces', 'libra'],
    lesson: ['A feeling is', 'not a theory.'],
    beats: [
      { set: 'museum', o: { sign: 'FREE THURSDAY' }, mood: 'sparkle', say: ['Aquarius. Free museum night. Big fan.'] },
      { set: 'museum', mood: 'happy', say: ['Your date asked, "How do you feel about us?"'] },
      { set: 'museum', o: { sign: '' }, mood: 'wide', say: ['You gave a lecture on color theory instead.'], stick: 'THEORY: 9 MIN' },
      { set: 'cityglow', mood: 'neutral', cast: { pisces: [860, 900, 170, 'wide'] }, say: [['pisces', 'they wanted a feeling *sob*'], 'Pisces is dramatic. But Pisces is right.'] },
      { set: 'bats', mood: 'sparkle', say: ['Try three words: "I like this."', 'Weird? No. Brave.'] },
      { set: 'bats', mood: 'heart', cast: { libra: [860, 900, 180, 'heart'] }, say: ['You can stay curious *and* say how you feel.'], stick: ['FEELING: SHARED', '#7dffb0'] },
    ],
  }),

  // ♉ Taurus · share your favourite spot · pop
  hst023: advice({
    sign: 'taurus', hook: 'Taurus, we saw | you guard | the queso.', close: 'Share a table. Jan 9.', stars: ['taurus', 'leo', 'cancer', 'aries'],
    lesson: ['Your favorite spot', 'is a love language.'],
    beats: [
      { set: 'texmex', mood: 'squint', say: ['Taurus. We saw that. You moved the queso.'] },
      { set: 'texmex', mood: 'eyeroll', say: ['Your date reached for a chip. You blocked it.'], stick: 'QUESO: PROTECTED' },
      { set: 'tacotruck', o: { menu: 'SECRET MENU' }, mood: 'neutral', say: ['You have a secret taco truck. Five years. No one knows.'] },
      { set: 'night', mood: 'happy', say: ['Your favorite places are your soft spots.', "That's why sharing them means a lot."] },
      { set: 'tacotruck', o: { menu: 'SECRET MENU', col: '#e9b24a' }, mood: 'sparkle', cast: { aries: [870, 900, 180, 'wide'] }, say: ['Take them to the truck. Order for two.'], stick: ['TABLE FOR TWO', '#ff8fb1'] },
      { set: 'texmex', o: { wall: '#2b5fb0' }, mood: 'heart', cast: { aries: [870, 900, 180, 'heart'] }, say: ['Then let them have the last chip. Growth.'] },
    ],
  }),

  // ♏ Scorpio · the ex moved to Katy · screwed
  hst024: advice({
    sign: 'scorpio', hook: 'Your ex moved | to Katy. Let | them, Scorpio.', close: 'Eyes forward. Jan 9.', stars: ['scorpio', 'cancer', 'virgo', 'aquarius'],
    lesson: ['Leave the past', 'at the last exit.'],
    beats: [
      { set: 'suburb', mood: 'squint', say: ['Scorpio. Your ex moved to Katy. Good for them.'] },
      { set: 'phone', o: { who: 'STORIES', msgs: [[-1, 'new kitchen!', 0], [-1, 'new grill!', 0.4]] }, at: [300, 860, 280], mood: 'squint', say: ['So why do you know their new kitchen tiles?'], stickY: 220, stick: 'VIEWED: ALL' },
      { set: 'freeway', o: { road: '10', speed: 20 }, mood: 'neutral', say: ['Watching their stories is driving I-10 west…', 'when your life is *inside* the Loop.'] },
      { set: 'night', mood: 'sleepy', say: ['Closure is not a story you keep checking.'] },
      { set: 'mural', mood: 'sparkle', say: ['Mute. Breathe. Go somewhere new. Montrose.'], stick: ['MUTED', '#7dffb0'] },
      { set: 'mural', mood: 'heart', cast: { aquarius: [870, 900, 180, 'happy'] }, say: ['New people are out here. Look up from the phone.'] },
    ],
  }),

  // ♌ Leo · reassure the nervous date · house
  hst025: advice({
    sign: 'leo', hook: 'Leo, your date | is nervous too.', close: 'Two-step into Jan 9.', stars: ['leo', 'virgo', 'cancer', 'pisces'], wear: { leo: 'hat' },
    lesson: ['Make them feel', 'like the star.'],
    beats: [
      { set: 'dance', mood: 'sparkle', say: ['Leo! Two-step night. You came to *perform*.'] },
      { set: 'dance', mood: 'happy', cast: { virgo: [870, 900, 180, 'wide'] }, say: ['But look. Your date is frozen by the wall.'], stick: 'NERVOUS: VERY' },
      { set: 'dance', mood: 'wide', cast: { virgo: [870, 900, 180, 'wide'] }, say: ['Confidence feels big. It can feel loud, too.'] },
      { set: 'closet', mood: 'neutral', say: ['Here is the real flex: make them comfortable.'] },
      { set: 'dance', mood: 'sparkle', at: [400, 850, 280], cast: { virgo: [760, 870, 220, 'happy'] }, say: ['"I don\'t know the steps either. Teach me?"'], stick: ['SLOW SONG', '#ff8fb1'] },
      { set: 'dance', mood: 'heart', at: [440, 850, 280], cast: { virgo: [680, 860, 240, 'heart'] }, say: ['See? You both glowed. That is a real spotlight.'] },
    ],
  }),

  // ♓ Pisces · they texted "k" · dreamy
  hst026: advice({
    sign: 'pisces', hook: "They texted 'k'. | Breathe, Pisces.", close: 'Breathe. Then Jan 9.', stars: ['pisces', 'scorpio', 'cancer', 'gemini'],
    lesson: ['Ask before', 'you spiral.'],
    beats: [
      { set: 'phone', o: { who: 'THE DATE', msgs: [[1, 'miss u!!', 2.7], [-1, 'k', 3.1]] }, at: [300, 860, 280], mood: 'wide', say: ['Pisces. They said "k." Put the tissues down.'] },
      { set: 'cityglow', mood: 'wide', say: ['You already wrote the breakup poem. Two drafts.'], stick: 'SPIRAL: DRAFT 2' },
      { set: 'freeway', o: { road: '8', speed: 25 }, mood: 'neutral', say: ['Plot twist: they are on the Beltway.', 'One-thumb typing. "k" is all they had.'] },
      { set: 'night', mood: 'happy', cast: { cancer: [860, 900, 180, 'happy'] }, say: [['cancer', 'Baby, one letter is not a verdict.']] },
      { set: 'phone', o: { who: 'THE DATE', msgs: [[1, 'all good?', -1], [-1, 'driving! call u', 0.6], [-1, 'at 7', 1.0]] }, at: [300, 860, 280], mood: 'sparkle', say: ['Next time, just ask: "All good?"'], stickY: 220, stick: ['ASKED. CALM.', '#7dffb0'] },
      { set: 'bayou', mood: 'heart', say: ['Feel everything. Assume less. Ask more.'] },
    ],
    tags: { cancer: '♋ AUNTIE CANCER' }, wear: { cancer: 'glasses' },
  }),

  // ♈ Aries · same team · chiptune
  hst027: advice({
    sign: 'aries', hook: 'Aries, you lost | at pickleball. | It\'s okay.', close: 'Same team, Jan 9.', stars: ['aries', 'libra', 'leo', 'taurus'], wear: { aries: 'headband' },
    lesson: ['Play together,', 'not against.'],
    beats: [
      { set: 'pickle', mood: 'squint', say: ['Aries. It was a date. Not a championship.'] },
      { set: 'pickle', mood: 'wide', cast: { libra: [880, 920, 170, 'wide'] }, say: ['You spiked the ball. At your date. Twice.'], stick: 'SCORE: 11–0' },
      { set: 'pickle', mood: 'eyeroll', say: ['Then you lost one point and asked for a rematch.'] },
      { set: 'night', mood: 'neutral', say: ['Your fire is great. Aim it *with* them.'] },
      { set: 'pickle', mood: 'sparkle', cast: { libra: [860, 900, 200, 'happy'] }, say: ['Next time: doubles. Same side of the net.'], stick: ['TEAM: US', '#7dffb0'] },
      { set: 'lawn', mood: 'heart', cast: { libra: [860, 900, 200, 'heart'] }, say: ['High five after every point. Even the misses.'] },
    ],
  }),

  // ♍ Virgo · come as you are · lofi
  hst028: advice({
    sign: 'virgo', hook: 'Virgo, the | pollen is not | your fault.', close: 'Come as you are. Jan 9.', stars: ['virgo', 'pisces', 'sagittarius', 'cancer'],
    lesson: ['Come as you are.', 'Pollen and all.'],
    beats: [
      { set: 'pollen', mood: 'wide', say: ['Virgo. You washed the car three times today.'] },
      { set: 'pollen', mood: 'squint', say: ['The oak pollen came back in nine minutes.'], stick: 'CAR: YELLOW AGAIN' },
      { set: 'wardrobe', mood: 'neutral', say: ['Then you changed outfits four times. It is 80°.'] },
      { set: 'night', mood: 'sleepy', say: ['And you almost canceled. Because of a smudge.'] },
      { set: 'lawn', mood: 'sparkle', cast: { sagittarius: [870, 900, 180, 'happy'] }, say: ['Your date will not see the smudge.', 'They will see *you* showed up.'] },
      { set: 'lawn', mood: 'heart', cast: { sagittarius: [870, 900, 180, 'heart'] }, say: ['A little messy is very human. Very lovable.'], stick: ['PERFECT ENOUGH', '#7dffb0'] },
    ],
  }),

  // ♊ Gemini · ask the second question · synthwave
  hst029: advice({
    sign: 'gemini', hook: 'Gemini, we need | to talk about | your karaoke.', close: 'Encore on Jan 9.', stars: ['gemini', 'sagittarius', 'aquarius', 'pisces'], wear: { gemini: 'mic' },
    lesson: ['Ask the', 'second question.'],
    beats: [
      { set: 'karaoke', o: { song: 'SONG 1 OF 9', lyric: 'skip ♪ skip ♪' }, mood: 'sparkle', say: ['Gemini. Bellaire karaoke. You picked nine songs.'] },
      { set: 'karaoke', o: { song: 'SONG 4 OF 9', lyric: 'skip ♪' }, mood: 'wide', say: ['You skipped each one halfway through.'], stick: 'SKIP. SKIP. SKIP.' },
      { set: 'bellaire', mood: 'neutral', cast: { sagittarius: [870, 900, 180, 'happy'] }, say: [['sagittarius', 'so I grew up in Alief and…'], 'You changed the subject. Mid-sentence.'] },
      { set: 'night', mood: 'happy', say: ['Your brain is fast. That is fun.', 'Your date needs a whole verse, though.'] },
      { set: 'bellaire', mood: 'sparkle', cast: { sagittarius: [870, 900, 180, 'heart'] }, say: ['Ask a follow-up: "What was that like?"'], stick: ['SECOND QUESTION', '#7dffb0'] },
      { set: 'karaoke', o: { song: 'DUET', lyric: 'whole song ♪' }, mood: 'heart', say: ['Then sing one song to the end. Together.'] },
    ],
  }),

  // ♋ Cancer · date one is date one · jazzy
  hst030: advice({
    sign: 'cancer', hook: 'Cancer, this is | date one. Not | the wedding.', close: 'Date one: Jan 9.', stars: ['cancer', 'taurus', 'libra', 'pisces'],
    lesson: ['Date one is', 'just date one.'],
    beats: [
      { set: 'paddle', mood: 'heart', say: ['Cancer. Paddle boats. First date. So sweet.'] },
      { set: 'paddle', mood: 'sparkle', say: ['You already picked names for the kids. Three.'], stick: 'NAMES: CHOSEN' },
      { set: 'porch', mood: 'wide', say: ['And the porch. In the Heights. With a dog.'] },
      { set: 'night', mood: 'neutral', say: ['Your heart is big. Let it get to know them first.'] },
      { set: 'paddle', mood: 'happy', cast: { libra: [870, 900, 180, 'happy'] }, say: ['Ask what *they* love. Listen for real.', 'The future can wait a few dates.'] },
      { set: 'bats', mood: 'heart', cast: { libra: [870, 900, 180, 'heart'] }, say: ['Bats at sunset is a great second date, by the way.'], stick: ['DATE TWO?', '#ff8fb1'] },
    ],
  }),

  // ♎ Libra · honest and kind · dreamy
  hst031: advice({
    sign: 'libra', hook: 'Dear Libra: | say it. Kindly.', close: 'Meet in the middle. Jan 9.', stars: ['libra', 'aries', 'taurus', 'aquarius'],
    lesson: ['Kind is honest.', 'Honest is kind.'],
    beats: [
      { set: 'suburb', mood: 'squint', say: ['Dear Libra. Your date picks Katy. Every time.'] },
      { set: 'freeway', o: { road: '10', speed: 0 }, mood: 'sleepy', say: ['You drive an hour. You say "no, I love it!"'], stick: 'HOURS ON I-10: MANY' },
      { set: 'night', mood: 'neutral', say: ['Keeping the peace is lovely. Until it is not.'] },
      { set: 'feeder', o: { street: 'HALFWAY', sub: 'COFFEE · NEXT EXIT' }, mood: 'sparkle', say: ['Say it kind: "Next one, meet me halfway?"'] },
      { set: 'feeder', o: { street: 'HALFWAY', sub: 'COFFEE · NEXT EXIT' }, mood: 'happy', cast: { aries: [300, 900, 180, 'happy'] }, say: [['aries', 'Oh! Of course. Halfway it is.'], 'See? Honest did not break anything.'], stickY: 330, stick: ['MET HALFWAY', '#7dffb0'] },
    ],
  }),

  // ♐ Sagittarius · let them meet your friends · funk
  hst032: advice({
    sign: 'sagittarius', hook: 'Sag, they want | to meet | your friends.', close: 'Bring the crew. Jan 9.', stars: ['sagittarius', 'gemini', 'leo', 'aries'],
    lesson: ['Letting them in', 'is still freedom.'],
    beats: [
      { set: 'run', mood: 'wide', say: ['Sag. They asked to come to your run club.'] },
      { set: 'run', mood: 'squint', say: ['You said "uhh, it\'s a whole thing." It is a jog.'], stick: 'EXCUSE: WEAK' },
      { set: 'night', mood: 'neutral', say: ['Sharing your world can feel like a cage.', 'It is not. It is a bigger world.'] },
      { set: 'run', o: { sign: 'RUN CLUB · NEW FACES' }, mood: 'sparkle', cast: { gemini: [180, 900, 170, 'happy'], leo: [900, 900, 170, 'happy'] }, say: ['Invite them. Your friends already like them.'] },
      { set: 'lawn', mood: 'heart', cast: { gemini: [180, 900, 170, 'heart'], leo: [900, 900, 170, 'heart'] }, say: ['Picnic after. Everybody brings a dish.'], stick: ['CREW: +1', '#7dffb0'] },
    ],
  }),

  // ♑ Capricorn · plan less, play more · chiptune
  hst033: advice({
    sign: 'capricorn', hook: 'Capricorn, the | five-year plan | can wait.', close: 'Plan: have fun. Jan 9.', stars: ['capricorn', 'aquarius', 'virgo', 'sagittarius'], wear: { capricorn: 'clipboard' },
    lesson: ['Plan less.', 'Play more.'],
    beats: [
      { set: 'marina', mood: 'squint', say: ['Capricorn. Clear Lake. Boats. Sunshine.'] },
      { set: 'marina', mood: 'neutral', say: ['And you brought a five-year plan. Laminated.'], stick: 'PAGE 1 OF 14' },
      { set: 'loops', o: { dots: [[340, 620, '#2fc79a', 'GOALS'], [740, 620, '#2fc79a', 'MORE GOALS']] }, mood: 'squint', say: ['Goals are great. You will crush them.'] },
      { set: 'night', mood: 'happy', say: ['But date three is not an interview.', 'Ask what made them laugh this week.'] },
      { set: 'marina', mood: 'sparkle', wear: { capricorn: 'shades' }, cast: { aquarius: [870, 900, 180, 'happy'] }, say: ['Put the plan away. Feed the ducks.'], stick: ['FUN: SCHEDULED', '#7dffb0'] },
      { set: 'beach', mood: 'heart', wear: { capricorn: 'shades' }, cast: { aquarius: [870, 900, 180, 'heart'] }, say: ['The best future starts with a fun today.'] },
    ],
  }),

  // ♒ Aquarius · wanting someone is brave · synthwave
  hst034: advice({
    sign: 'aquarius', hook: 'No stars over | Houston? Look | closer, Aquarius.', close: 'Look up on Jan 9.', stars: ['aquarius', 'libra', 'gemini', 'sagittarius'],
    lesson: ['Wanting someone', 'is brave.'],
    beats: [
      { set: 'cityglow', mood: 'sparkle', say: ['Aquarius. The city glow hides us. We are still here.'] },
      { set: 'cityglow', mood: 'neutral', say: ['Kind of like your feelings. Hidden. Still real.'], stick: 'FEELINGS: ON MUTE' },
      { set: 'slab', o: { col: '#38c4ec', col2: '#5a3ae0' }, at: [540, 640, 260], mood: 'happy', say: ['You love your freedom. Your own lane. Respect.'] },
      { set: 'night', mood: 'wide', say: ['But "I don\'t need anyone" is getting loud.'] },
      { set: 'bats', mood: 'sparkle', cast: { libra: [860, 900, 180, 'happy'] }, say: ['You can be independent *and* want someone.', 'That is not weakness. That is honest.'] },
      { set: 'bats', mood: 'heart', cast: { libra: [860, 900, 180, 'heart'] }, say: ['So text them back. Say "I\'d like that."'], stick: ['SENT', '#7dffb0'] },
    ],
  }),

  // ♓ Pisces · go solo · house
  hst035: advice({
    sign: 'pisces', hook: 'Going solo | on Jan 9? | Good, Pisces.', close: 'Come as you. Jan 9.', stars: ['pisces', 'leo', 'gemini', 'cancer'],
    lesson: ['Show up', 'for you.'],
    beats: [
      { set: 'wardrobe', o: { wall: '#3a4a7a' }, mood: 'wide', say: ['Pisces. Nobody to go with? Crying already?'] },
      { set: 'cold', o: { temp: '55°' }, mood: 'sleepy', wear: { pisces: 'beanie,scarf' }, say: ['It hit 55 for one day. You wore the beanie anyway.'], stick: 'COLD FRONT. ONE DAY.' },
      { set: 'cold', o: { temp: '81°' }, mood: 'wide', wear: { pisces: 'beanie,scarf' }, say: ['Now it is 81. Keep the beanie. Keep the plan.'] },
      { set: 'night', mood: 'neutral', say: ['Going alone is not sad. It is open.', 'Nobody to hide behind. Only new people.'] },
      { set: 'dance', mood: 'sparkle', cast: { leo: [180, 900, 170, 'happy'], gemini: [900, 900, 170, 'happy'] }, say: ['Say hi to one stranger. Then one more.'], stick: ['NEW FRIENDS: 2', '#7dffb0'] },
      { set: 'dance', mood: 'heart', cast: { leo: [180, 900, 170, 'heart'], gemini: [900, 900, 170, 'heart'] }, say: ['Happy tears this time. Those count double.'] },
    ],
  }),
}
