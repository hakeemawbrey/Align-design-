// Houston Star Talk · w07 flags (hst174–hst185): green flags, red flags (kind ones) and beige flags of Houston dating,
// by sign. The stars look at you. Healthy advice in the "THE FIX" beats. Every episode ends on the party ticket (Jan 9).
import { Y, BADGE, STING, SETS, flagCard, intro, outro, lesson, LEVELUP, partyCard, flag, label, txt, box, clamp, Kp, GOLD, BONE, PINK, INK, MONO, FLAGCOL, FLAGTXT, GND } from './w07.js'

FLAGCOL.ask = '#8f96a0'; FLAGTXT.ask = 'GREEN OR RED?'
const END = (line, stars) => ({ endLen: 6.2, end: (x, t, lt) => partyCard(x, t, lt, { line, stars }) })
const flags = (rows, o = {}) => rows.map(([id, set, kind, line], i) => flagCard(id, set, i, { kind, line, dur: o.dur || 2.8 }))
// an element video: per sign a GREEN, a RED and THE FIX
const trio = (id, set, [g, r, f], i0 = 0) => [
  flagCard(id, set[0], i0, { kind: 'green', line: g, dur: 3.0, mood: 'sparkle' }),
  flagCard(id, set[1], i0, { kind: 'red', line: r, dur: 3.0, mood: 'wide' }),
  flagCard(id, set[2], i0, { kind: 'tip', line: f, dur: 3.2, mood: 'heart' }),
]
// a flag that flips: it starts red (or grey) and flips to its verdict at `at`
const flipCard = (id, set, i, from, to, a, b, at = 1.6, dur = 3.6) => flagCard(id, set, i, { kind: from, flip: [at, to], dur, line: [[0.35, at - 0.4, a], [at + 0.15, dur - at - 0.5, b]], mood: lt => (lt > at ? (to === 'red' ? 'eyeroll' : 'heart') : 'wide') })
// a heading card for a moment of the date (ARRIVAL, THE ORDER…)
const chapter = (title, set) => ({ dur: 1.4, set: SETS[set], cast: {}, front: (x, t, lt) => { const k = Kp(lt, 0.05, 0.3); if (k <= 0) return; x.save(); x.translate(540, 900); x.scale(k, k); box(x, -380, -90, 760, 180, '#1c1240', 8); x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-368, -78, 736, 156); txt(x, title, 0, 4, { size: 76, col: GOLD }); x.restore() } })

export const W07B = {
  // ── hst174 · your sign's Houston red flag (lovingly)
  hst174: { hook: "Sorry: your sign's | Houston red flag", badge: BADGE, cues: STING, ...END('Red flags welcome. Jan 9.', ['virgo', 'scorpio', 'leo', 'pisces']),
    scenes: [
      intro({ set: 'night' }),
      ...flags([
        ['aries', 'night', 'red', 'says "20 minutes" | from Katy.'],
        ['taurus', 'truck', 'red', "won't share | the queso."],
        ['gemini', 'night', 'red', 'texts "here!" | still on the 610.'],
        ['cancer', 'porch', 'red', 'already named | your future dog.'],
        ['leo', 'truck', 'red', 'asked for valet. | at a taco truck.'],
        ['virgo', 'kolache', 'red', 'corrects you: | "klobasnek."'],
        ['libra', 'shops', 'red', "can't pick | the brunch spot."],
        ['scorpio', 'bellaire', 'red', 'already knows | your high school.'],
        ['sagittarius', 'beach', 'red', 'Galveston? now? | it is 11pm.'],
        ['capricorn', 'waterwall', 'red', 'shows up | 40 minutes early.'],
        ['aquarius', 'cold', 'red', 'shorts. | at 55 degrees.'],
        ['pisces', 'batBridge', 'red', 'cried at | the bat bridge.'],
      ]),
      outro({ set: 'night', big: 'Lovingly.', lines: ['Comment your sign.', 'Defend yourself.'] }),
    ] },

  // ── hst175 · your sign's Houston green flag
  hst175: { hook: "Your sign's | Houston green flag", badge: BADGE, cues: STING, ...END('Bring your green flags. Jan 9.', ['cancer', 'virgo', 'libra', 'aquarius']),
    scenes: [
      intro({ set: 'lawn' }),
      ...flags([
        ['aries', 'trail', 'green', 'shows up on time. | even on 59.'],
        ['taurus', 'cold', 'green', 'always has | snacks in the car.'],
        ['gemini', 'truck', 'green', 'knows a taco truck | for every mood.'],
        ['cancer', 'porch', 'green', 'packs you | leftovers.'],
        ['leo', 'waterwall', 'green', 'hypes your outfit. | out loud.'],
        ['virgo', 'heat', 'green', 'parks in the shade. | for you.'],
        ['libra', 'shops', 'green', 'asks where YOU | want to eat.'],
        ['scorpio', 'bellaire', 'green', 'remembers | your boba order.'],
        ['sagittarius', 'night', 'green', 'makes a wrong exit | an adventure.'],
        ['capricorn', 'lawn', 'green', 'plans around traffic. | for you.'],
        ['aquarius', 'museum', 'green', 'brings you a sweater | for the AC.'],
        ['pisces', 'marina', 'green', 'cries at | your good news.'],
      ]),
      outro({ set: 'lawn', big: 'Tag a green flag.', lines: ['(You know', 'the one.)'] }),
    ] },

  // ── hst176 · green flag or red flag? you decide (a quiz; the verdict flips in)
  hst176: { hook: 'Houston dating: | green flag or | red flag?', badge: BADGE, cues: STING, ...END('Final answer: Jan 9.', ['gemini', 'capricorn', 'pisces', 'scorpio']),
    scenes: [
      { ...intro({ set: 'court' }), front: (x, t) => { flag(x, 220, 640, 1000, FLAGCOL.green, t, { w: 170, h: 110 }); x.save(); x.translate(860, 0); x.scale(-1, 1); flag(x, 0, 640, 1000, FLAGCOL.red, t, { w: 170, h: 110 }); x.restore() } },
      flipCard('aries', 'night', 0, 'ask', 'green', 'knows a | feeder road shortcut.', 'GREEN. | keep them.'),
      flipCard('virgo', 'kolache', 1, 'ask', 'red', 'calls the sausage one | a kolache.', 'red. | (lovingly.)'),
      flipCard('pisces', 'pond', 0, 'ask', 'green', 'cried at | the paddle boats.', 'green. | they feel things.'),
      flipCard('scorpio', 'museum', 1, 'ask', 'green', 'asked where you | went to high school.', "green. | it's Houston."),
      flipCard('sagittarius', 'suburbs', 0, 'ask', 'red', '"20 minutes" | from Sugar Land.', 'red. | it is never 20.'),
      flipCard('cancer', 'porch', 1, 'ask', 'green', 'invited you to | the family cookout.', 'green. | bring a dish.'),
      flipCard('libra', 'night', 0, 'ask', 'red', 'texts "u up?" | at 2am.', 'red. | daylight only.'),
      flipCard('taurus', 'lawn', 1, 'ask', 'green', 'shared the last | puff-puff.', 'GREEN. | marry them.'),
      flipCard('aquarius', 'cold', 0, 'ask', 'beige', 'shorts on | the one cold day.', 'beige. | we allow it.'),
      outro({ set: 'court', big: 'Disagree?', lines: ['Comment your verdict', '+ your sign.'] }),
    ] },

  // ── hst177 · fire signs: green, red, the fix
  hst177: { hook: 'Fire signs, | your Houston | flags are in', badge: BADGE, cues: STING, ...END('Fire signs: see you Jan 9.', ['aries', 'leo', 'sagittarius', 'libra']),
    scenes: [
      intro({ set: 'heat', cast: 'trio', ids: ['aries', 'leo', 'sagittarius'] }),
      ...trio('aries', ['trail', 'shops', 'trail'], ['first to say | "let\'s go."', 'leaves brunch | before the food.', "slow down. | a date isn't a race."], 0),
      ...trio('leo', ['waterwall', 'waterwall', 'karaoke'], ['hypes you | to everyone.', 'forty selfies | at the waterwall.', 'ask about | their day too.'], 1),
      ...trio('sagittarius', ['beach', 'night', 'beach'], ['always down | for an adventure.', 'a Galveston plan | at midnight.', 'spontaneous is fun. | showing up is better.'], 0),
      outro({ set: 'heat', big: 'Fire signs:', lines: ['which red flag', 'is yours?'], ids: ['aries', 'leo', 'sagittarius'] }),
    ] },

  // ── hst178 · earth signs: green, red, the fix
  hst178: { hook: 'Earth signs, | we checked | your flags', badge: BADGE, cues: STING, ...END('Earth signs: it\'s on the calendar.', ['taurus', 'virgo', 'capricorn', 'cancer']),
    scenes: [
      intro({ set: 'garden', cast: 'trio', ids: ['taurus', 'virgo', 'capricorn'] }),
      ...trio('taurus', ['cold', 'truck', 'truck'], ['snacks in the car. | always.', "won't share | the queso.", 'share the queso. | that\'s love.'], 0),
      ...trio('virgo', ['night', 'truck', 'garden'], ['knows every | shortcut.', 'grades your | breakfast taco.', 'let the date | be a little messy.'], 1),
      ...trio('capricorn', ['lawn', 'waterwall', 'bayou'], ['plans around | traffic.', 'scheduled | the spontaneous date.', 'leave one night | unplanned.'], 0),
      outro({ set: 'garden', big: 'Earth signs:', lines: ['guilty?', 'comment "guilty."'], ids: ['taurus', 'virgo', 'capricorn'] }),
    ] },

  // ── hst179 · air signs: green, red, the fix
  hst179: { hook: 'Air signs, | we need to talk | about your flags', badge: BADGE, cues: STING, ...END('Air signs: talk to us Jan 9.', ['gemini', 'libra', 'aquarius', 'sagittarius']),
    scenes: [
      intro({ set: 'mural', cast: 'trio', ids: ['gemini', 'libra', 'aquarius'] }),
      ...trio('gemini', ['truck', 'night', 'lawn'], ['best texter. | best memes.', 'three plans. | same night.', 'pick one plan. | be there fully.'], 0),
      ...trio('libra', ['pond', 'shops', 'shops'], ['asks what | YOU want.', "can't pick | a restaurant. ever.", 'decide. | it\'s attractive.'], 1),
      ...trio('aquarius', ['cistern', 'mural', 'mural'], ['takes you | somewhere new.', 'vanishes a week | to "think."', 'need space? | say it out loud.'], 0),
      outro({ set: 'mural', big: 'Air signs:', lines: ['send this to', 'the group chat.'], ids: ['gemini', 'libra', 'aquarius'] }),
    ] },

  // ── hst180 · water signs: green, red, the fix
  hst180: { hook: 'Dating a | water sign in | Houston? Read this.', badge: BADGE, cues: STING, ...END('Water signs: tissues at the door.', ['cancer', 'scorpio', 'pisces', 'virgo']),
    scenes: [
      intro({ set: 'bayou', cast: 'trio', ids: ['cancer', 'scorpio', 'pisces'] }),
      ...trio('cancer', ['porch', 'suburbs', 'porch'], ['packs you | leftovers.', 'brought the whole | family to date two.', 'family is great. | let them in slowly.'], 0),
      ...trio('scorpio', ['batBridge', 'bellaire', 'quiet'], ['remembers | everything.', 'already found | your high school.', 'curious? | ask. out loud.'], 1),
      ...trio('pisces', ['marina', 'cistern', 'beach'], ['cries at | your wins.', 'goes quiet | when overwhelmed.', 'say "I need a minute." | then come back.'], 0),
      outro({ set: 'bayou', big: 'Water signs:', lines: ['which one', 'made you cry?'], ids: ['cancer', 'scorpio', 'pisces'] }),
    ] },

  // ── hst181 · first-date green flags, moment by moment
  hst181: { hook: 'First-date | green flags in | Houston, by sign', badge: BADGE, cues: STING, ...END('Date two? Make it Jan 9.', ['sagittarius', 'cancer', 'leo', 'aries']),
    scenes: [
      intro({ set: 'shops' }),
      chapter('THE ARRIVAL', 'night'),
      ...flags([['aries', 'night', 'green', 'texted "leaving now." | meant it.'], ['capricorn', 'suburbs', 'green', 'picked a spot | halfway.'], ['libra', 'shops', 'green', 'loved your outfit. | specifically.']], { dur: 2.7 }),
      chapter('THE ORDER', 'truck'),
      ...flags([['taurus', 'truck', 'green', 'ordered extra | to share.'], ['virgo', 'bellaire', 'green', 'remembered | your allergy.'], ['gemini', 'truck', 'green', 'asked what | you recommend.']], { dur: 2.7 }),
      chapter('THE TALK', 'quiet'),
      ...flags([['scorpio', 'quiet', 'green', 'phone face down. | all night.'], ['pisces', 'bayou', 'green', 'actually listened. | (cried a bit.)'], ['aquarius', 'mural', 'green', 'asked a question | nobody asks.']], { dur: 2.7 }),
      chapter('THE GOODBYE', 'lawn'),
      ...flags([['cancer', 'lawn', 'green', '"text me when | you get home."'], ['leo', 'lawn', 'green', 'said "I had fun" | first.'], ['sagittarius', 'batBridge', 'green', 'planned date two: | the bat bridge.']], { dur: 2.7 }),
      outro({ set: 'shops', big: 'Your best one?', lines: ['Comment the green flag', 'that got you.'] }),
    ] },

  // ── hst182 · Houston red flags that are actually green (each red flag flips)
  hst182: { hook: 'Houston red flags | that are | actually green', badge: BADGE, cues: STING, ...END('Green light: Jan 9.', ['cancer', 'scorpio', 'taurus', 'gemini']),
    scenes: [
      intro({ set: 'suburbs' }),
      flipCard('cancer', 'suburbs', 0, 'red', 'green', "they're | from Katy.", 'so they drive | to see you.'),
      flipCard('virgo', 'heat', 1, 'red', 'green', 'their car is | covered in pollen.', 'they park under | trees. for shade.'),
      flipCard('capricorn', 'heat', 0, 'red', 'green', 'they bring | a sweater in July.', 'they know | the AC.'),
      flipCard('scorpio', 'museum', 1, 'red', 'green', 'asked where | you went to high school.', "it's Houston. | it means hi."),
      flipCard('taurus', 'night', 0, 'red', 'green', 'talks about | traffic. a lot.', 'they want you | home safe.'),
      flipCard('sagittarius', 'truck', 1, 'red', 'green', 'says | "fixin\' to."', 'charming. | keep it.'),
      flipCard('gemini', 'cold', 0, 'red', 'green', 'posted the | car thermometer.', 'enthusiasm. | we love it.'),
      flipCard('pisces', 'pond', 1, 'red', 'green', 'cried at | the paddle boats.', 'they feel | things. good.'),
      outro({ set: 'suburbs', big: 'More green?', lines: ['Comment a Houston flag', 'we missed.'] }),
    ] },

  // ── hst183 · beige flags of Houston dating (not good, not bad, very Houston)
  hst183: { hook: 'Beige flags of | Houston dating, | by sign', badge: BADGE, cues: STING, ...END('Beige flags welcome. Jan 9.', ['aquarius', 'libra', 'leo', 'capricorn']),
    scenes: [
      intro({ set: 'night' }),
      ...flags([
        ['aries', 'night', 'beige', 'measures distance | in minutes.'],
        ['taurus', 'truck', 'beige', 'a favorite taco truck. | and a backup.'],
        ['gemini', 'lawn', 'beige', 'says "y\'all" | to one person.'],
        ['cancer', 'cold', 'beige', 'a sweater | in every car.'],
        ['leo', 'cold', 'beige', 'owns a puffer | for one day a year.'],
        ['virgo', 'night', 'beige', 'strong opinions | on feeder roads.'],
        ['libra', 'shops', 'beige', 'says | "San Fill-uh-pee."'],
        ['scorpio', 'tunnel', 'beige', 'knows the | downtown tunnels.'],
        ['sagittarius', 'suburbs', 'beige', 'proud of | their Texas U-turn.'],
        ['capricorn', 'heat', 'beige', 'parks by shade. | not distance.'],
        ['aquarius', 'mural', 'beige', 'calls 70° | "kinda chilly."'],
        ['pisces', 'marina', 'beige', 'says "Space City" | and tears up.'],
      ]),
      outro({ set: 'night', big: 'Beige or iconic?', lines: ['Comment', 'your beige flag.'] }),
    ] },

  // ── hst184 · dating a Houston Scorpio: one sign, all the flags, a lesson
  hst184: { hook: 'Dating a Houston | Scorpio? Here | are your flags.', badge: BADGE, cues: [...STING, ...LEVELUP(24.3)], ...END('Scorpio already RSVPed. Jan 9.', ['scorpio', 'pisces', 'cancer', 'gemini']),
    scenes: [
      { ...intro({ set: 'batBridge', cast: 'trio', ids: ['scorpio'] }), mood: { scorpio: 'wink' } },
      flagCard('scorpio', 'bellaire', 0, { kind: 'green', line: 'remembers your | taco order. forever.', dur: 3.0 }),
      flagCard('scorpio', 'night', 1, { kind: 'green', line: 'crosses the Loop | to see you.', dur: 3.0 }),
      flagCard('scorpio', 'quiet', 0, { kind: 'red', line: 'reads "ok." | as a crisis.', dur: 3.0, mood: 'wide' }),
      flagCard('scorpio', 'batBridge', 1, { kind: 'green', line: 'bat bridge | at dusk. romantic.', dur: 3.0, mood: 'heart' }),
      flagCard('scorpio', 'museum', 0, { kind: 'red', line: 'already knows | your high school.', dur: 3.0, mood: 'squint' }),
      flagCard('pisces', 'night', 1, { kind: 'green', line: 'they held my hand | at the sad part.', dur: 3.0 }),
      flagCard('scorpio', 'quiet', 0, { kind: 'tip', line: 'just ask them. | they tell the truth.', dur: 3.4, mood: 'heart' }),
      lesson('scorpio', 'batBridge', { a: 'Intense means loyal.', b: 'Talk it out.', dur: 3.8 }),
    ] },

  // ── hst185 · the flag your sign waves at the party (Jan 9)
  hst185: { hook: 'The flag your | sign waves at | the party', badge: BADGE, cues: STING, ...END('Wave yours. Jan 9.', ['sagittarius', 'aquarius', 'pisces', 'taurus']),
    scenes: [
      intro({ set: 'party' }),
      ...flags([
        ['aries', 'party', 'green', 'first on | the dance floor.'],
        ['taurus', 'party', 'green', 'found the snacks. | shared them.'],
        ['gemini', 'party', 'green', 'introduced you | to everyone.'],
        ['cancer', 'party', 'green', 'checked everyone | got home ok.'],
        ['leo', 'party', 'green', 'hyped | your outfit.'],
        ['virgo', 'party', 'green', 'organized | the ride shares.'],
        ['libra', 'party', 'green', 'nobody | stood alone.'],
        ['scorpio', 'party', 'green', 'one deep talk. | best part.'],
        ['sagittarius', 'party', 'green', 'invited | the whole run club.'],
        ['capricorn', 'party', 'green', "remembered | everyone's name."],
        ['aquarius', 'party', 'green', 'brought a stranger. | now a friend.'],
        ['pisces', 'party', 'green', 'cried at | the group photo.'],
      ], { dur: 2.6 }),
      outro({ set: 'party', big: "What's your flag?", lines: ['Show up', 'and wave it.'] }),
    ] },
}

export const META_B = {
  hst174: { style: 'flags', music: ['screwed', 'C', 17414], plain: "Sorry: your sign's Houston red flag", caption: 'Houston beta party: Jan 9. Every sign has a Houston red flag (lovingly): "20 minutes" from Katy, valet at a taco truck. Comment your sign and defend yourself.' },
  hst175: { style: 'flags', music: ['dreamy', 'F', 17515], plain: "Your sign's Houston green flag", caption: 'Houston beta party: Jan 9. The Houston green flag for every sign, from snacks in the car to parking in the shade for you. Tag the green flag in your life.' },
  hst176: { style: 'flags', music: ['chiptune', 'A', 17616], plain: 'Houston dating: green flag or red flag?', caption: 'Houston beta party: Jan 9. Green flag or red flag, Houston edition: feeder road shortcuts, "20 minutes" from Sugar Land, the last puff-puff. Comment your verdict.' },
  hst177: { style: 'flags', music: ['funk', 'D', 17717], plain: 'Fire signs, your Houston flags are in', caption: 'Houston beta party: Jan 9. Aries, Leo and Sagittarius: a green flag, a red flag and the fix. Which red flag is yours, fire signs?' },
  hst178: { style: 'flags', music: ['lofi', 'G', 17818], plain: 'Earth signs, we checked your flags', caption: 'Houston beta party: Jan 9. Taurus, Virgo and Capricorn: the green flag, the red flag and the fix (share the queso). Earth signs, comment "guilty."' },
  hst179: { style: 'flags', music: ['synthwave', 'C', 17919], plain: 'Air signs, we need to talk about your flags', caption: 'Houston beta party: Jan 9. Gemini, Libra and Aquarius: the green flag, the red flag and the fix. Send this to your air-sign group chat.' },
  hst180: { style: 'flags', music: ['dreamy', 'A', 18020], plain: 'Dating a water sign in Houston? Read this.', caption: 'Houston beta party: Jan 9. Dating a Cancer, Scorpio or Pisces in Houston: the green flag, the red flag and the fix. Which one made you cry?' },
  hst181: { style: 'flags', music: ['jazzy', 'F', 18121], plain: 'First-date green flags in Houston, by sign', caption: 'Houston beta party: Jan 9. First-date green flags by sign, from the arrival to "text me when you get home." What green flag got you?' },
  hst182: { style: 'flags', music: ['pop', 'E', 18222], plain: 'Houston red flags that are actually green', caption: "Houston beta party: Jan 9. They're from Katy, their car is covered in pollen, they asked where you went to high school. Actually green. What did we miss?" },
  hst183: { style: 'flags', music: ['lofi', 'Bb', 18323], plain: 'Beige flags of Houston dating, by sign', caption: 'Houston beta party: Jan 9. Not good, not bad, very Houston: the beige flag of every sign. Comment yours.' },
  hst184: { style: 'flags', music: ['screwed', 'D', 18424], plain: 'Dating a Houston Scorpio? Here are your flags.', lead: 'scorpio', caption: 'Houston beta party: Jan 9. Dating a Houston Scorpio: they remember your taco order forever and already know your high school. Send this to your Scorpio.' },
  hst185: { style: 'flags', music: ['house', 'E', 18525], plain: 'The flag your sign waves at the party', caption: 'Houston beta party: Jan 9. The green flag every sign waves at the party, from first on the dance floor to crying at the group photo. What is your flag?' },
}
