// Houston Star Talk · w15 "tell me you're a Houston [sign] without telling me" (hst369–hst380). Builder: w15.js tellEp.
// One sign per video, seven clues across Houston, a censored slip (BEEP), a friend calls it, then the reveal.
import { tellEp, BG, Y, clipboard, glasses } from './w15.js'
import { GOLD, PINK, MINT, SKYB, LAV } from '../signs3kit.js'

// a friend calls it: [bg, me, friend, friendLine, myReply, friendMood]
const cameo = (bg, me, fr, a, b, mood = 'wink', extra) => ({
  dur: 3.2, set: (x, t, lt) => BG[bg](x, t, lt), front: extra,
  cast: { [me]: [[0, 320, Y, 260]], [fr]: [[0, 1300, Y, 230], [0.5, 770, Y, 230]] }, mood: { [me]: lt => lt > 1.6 ? 'wide' : 'happy', [fr]: mood },
  lines: [[0.6, 1.3, fr, a], [2.0, 1.1, me, b]],
})
const one = (bg, lines, prop, more = {}) => ({ bg, lines, prop, ...more })

export const W15L = {
  hst369: tellEp({
    sign: 'aries', hidden: 'ARIES', accent: '#ff5a6e', hook: 'Houston Aries? | Tell me without | telling me', introBg: 'run',
    clues: [
      one('run', [[0.2, 1.6, '5am. bayou trail.'], [1.9, 1.5, "you're still | asleep."]], ['sneaker']),
      one('traffic', [[0.2, 3.2, 'merged before the | sign said merge.']], ['car', '#e0503a']),
      one('day', [[0.2, 1.6, 'pickleball.'], [1.9, 1.5, 'I keep score. | loudly.']], ['sneaker', '#7dffb0']),
      one('bellaire', [[0.2, 1.6, 'pho in | six minutes.'], [1.9, 1.5, 'burned my | mouth. again.']], ['bowl']),
      one('freeway', [[0.2, 1.0, 'as an Ari—'], [1.5, 1.9, "...as someone who's | always first."]], ['shield', '610'], { beep: 0.9 }),
      one('cold', [[0.2, 3.2, "55°? shorts. | to prove a point."]], ['thermo', '55°']),
      one('night', [[0.2, 1.6, 'first one at | every party.'], [1.9, 1.5, 'see you there. | early.']], ['ticket']),
    ],
    cameo: cameo('night', 'aries', 'taurus', "you're an Aries, | babe.", 'how did | you know??', 'happy'),
    reveal: [[0.2, 0.9, '...fine.'], [1.2, 2.2, 'Aries. | first to Jan 9.']],
    cta: 'Tell me yours. Comment your sign.',
    end: { line: 'First in line, Jan 9.', stars: ['aries', 'taurus', 'leo', 'sagittarius'] },
  }),

  hst370: tellEp({
    sign: 'taurus', hidden: 'TAURUS', accent: '#7dbf5a', card: '#1e3a24', hook: "Tell me you're | a Houston Taurus. | No words.", introBg: 'porch',
    clues: [
      one('porch', [[0.2, 1.6, 'porch. | in the Heights.'], [1.9, 1.5, 'not leaving. | ever.']], ['dog']),
      one('kitchen', [[0.2, 1.6, 'chopped beef | or brisket?'], [1.9, 1.5, 'yes.']], ['tacos']),
      one('kitchen', [[0.2, 3.2, 'queso is a | food group. to me.']], ['bowl']),
      one('traffic', [[0.2, 1.6, 'same lane. | since 2019.'], [1.9, 1.5, 'it works. | why change.']], ['car', '#7dbf5a']),
      one('bellaire', [[0.2, 1.0, 'as a Taur—'], [1.5, 1.9, '...as someone who | knows hot pot.']], ['bowl'], { beep: 0.9 }),
      one('day', [[0.2, 1.6, 'nap. under | an oak tree.'], [1.9, 1.5, 'pollen? | worth it.']], null),
      one('night', [[0.2, 3.2, "I'll come to the | party. snacks?"]], ['ticket']),
    ],
    cameo: cameo('porch', 'taurus', 'virgo', 'that is | so Taurus.', "I didn't | say it.", 'squint', (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); clipboard(x, cx + s * 0.5, cy + 20, 0.6) }),
    reveal: [[0.2, 0.9, '...okay.'], [1.2, 2.2, 'Taurus. | pass the queso.']],
    cta: 'Your sign? Comment it.',
    end: { line: 'Snacks at Jan 9? Please.', stars: ['taurus', 'virgo', 'cancer', 'pisces'] },
  }),

  hst371: tellEp({
    sign: 'gemini', hidden: 'GEMINI', accent: GOLD, card: '#3a2a10', hook: "You're a Houston | Gemini if you | do this", introBg: 'mural',
    clues: [
      one('mural', [[0.2, 1.6, 'EaDo? | East End?'], [1.9, 1.5, 'I live in | both. somehow.']], ['sign', 'EADO']),
      one('kitchen', [[0.2, 3.2, 'flour AND corn. | same taco.']], ['tacos']),
      one('traffic', [[0.2, 1.6, 'left lane. | right lane.'], [1.9, 1.5, 'both. | at once.']], ['car', '#d8b23a']),
      one('bellaire', [[0.2, 1.6, 'karaoke. | took both mics.'], [1.9, 1.5, 'duet with | myself.']], ['heart']),
      one('night', [[0.2, 1.0, 'as a Gem—'], [1.5, 1.9, '...as a person with | 40 group chats.']], ['phone', 'ok so | wait | also'], { beep: 0.9 }),
      one('cold', [[0.2, 3.2, 'shorts. AND | a beanie. 55°.']], ['coat', '#d8b23a']),
      one('coffee', [[0.2, 1.6, 'three plans | for tonight.'], [1.9, 1.5, "you're in | all three."]], ['phone', 'plan A | plan B | plan C']),
    ],
    cameo: cameo('mural', 'gemini', 'libra', 'Gemini. | obviously.', 'which one | of me?', 'wink'),
    reveal: [[0.2, 0.9, '...fine!'], [1.2, 2.2, 'Gemini. | both of me.']],
    cta: 'Which twin are you? Comment.',
    end: { line: 'Come twice. Jan 9.', stars: ['gemini', 'libra', 'leo', 'aquarius'] },
  }),

  hst372: tellEp({
    sign: 'cancer', hidden: 'CANCER', accent: SKYB, card: '#14304a', hook: "Tell me you're | a Houston Cancer. | No words.", introBg: 'kitchen',
    clues: [
      one('kitchen', [[0.2, 1.6, 'my cousins? | all in Katy.'], [1.9, 1.5, 'all of them.']], ['heart']),
      one('night', [[0.2, 3.2, '"text me when | you get home."']], ['phone', 'home yet? | ??']),
      one('kitchen', [[0.2, 1.6, 'soup on the | one cold day.'], [1.9, 1.5, 'you want | some? sit.']], ['bowl']),
      one('coffee', [[0.2, 1.6, '"where\'d you go | to high school?"'], [1.9, 1.5, "that's how | I know you."]], ['coffee']),
      one('lot', [[0.2, 1.0, 'as a Canc—'], [1.5, 1.9, '...as someone who | parks in shade.']], ['car', '#8fe3ff'], { beep: 0.9 }),
      one('boil', [[0.2, 3.2, 'brought the corn | AND potatoes.']], ['pile']),
      one('night', [[0.2, 1.6, 'bringing my cousin | to the party.'], [1.9, 1.5, 'from Katy. | 45 minutes.']], ['ticket']),
    ],
    cameo: cameo('kitchen', 'cancer', 'scorpio', 'you are SO | Cancer.', "I'm making | you soup.", 'wink'),
    reveal: [[0.2, 0.9, '...yes.'], [1.2, 2.2, 'Cancer. | come eat.']],
    cta: 'Tag your Katy cousin.',
    end: { line: 'Bring your cousin. Jan 9.', stars: ['cancer', 'scorpio', 'taurus', 'pisces'] },
  }),

  hst373: tellEp({
    sign: 'leo', hidden: 'LEO', accent: '#ffb020', card: '#3a2008', hook: 'Houston Leo? | Tell me without | telling me', introBg: 'slab',
    clues: [
      one('slab', [[0.2, 1.6, 'candy paint. | fresh wax.'], [1.9, 1.5, 'you saw me. | admit it.']], ['car', '#b0306a']),
      one('mural', [[0.2, 3.2, 'mural photos. | 300 of them.']], ['phone', 'pic 1/300']),
      one('day', [[0.2, 1.6, 'dressed up | for errands.'], [1.9, 1.5, 'Uptown | energy.']], ['sneaker', GOLD]),
      one('bellaire', [[0.2, 1.6, 'karaoke solo. | encore.'], [1.9, 1.5, 'by request. | mine.']], ['heart']),
      one('heat', [[0.2, 1.0, 'as a Le—'], [1.5, 1.9, '...as someone | who wore black.']], ['sweat'], { beep: 0.9 }),
      one('night', [[0.2, 3.2, 'posted the car | thermometer.']], ['phone', '55°!! | cold']),
      one('night', [[0.2, 1.6, 'my fit for | Jan 9? done.'], [1.9, 1.5, 'since | October.']], ['ticket']),
    ],
    cameo: cameo('slab', 'leo', 'aquarius', "that's a Leo. | from space.", 'thank | you!', 'eyeroll'),
    reveal: [[0.2, 0.9, 'okay. yes.'], [1.2, 2.2, 'Leo. | and I look good.']],
    cta: 'Leos, comment your fit.',
    end: { line: 'Dress up. Jan 9.', stars: ['leo', 'aquarius', 'gemini', 'libra'] },
  }),

  hst374: tellEp({
    sign: 'virgo', hidden: 'VIRGO', accent: MINT, card: '#143a2a', hook: "Tell me you're | a Houston Virgo. | No words.", introBg: 'kitchen',
    clues: [
      one('kitchen', [[0.2, 1.6, "the sausage one's | a klobasnek."], [1.9, 1.5, 'yes. I will | correct you.']], ['klobasnek']),
      one('traffic', [[0.2, 3.2, 'turn signal on | since Kirby.']], ['sign', 'KIRBY']),
      one('lot', [[0.2, 1.6, 'backed in. | centered.'], [1.9, 1.5, 'shade map. | laminated.']], ['clipboard']),
      one('cold', [[0.2, 1.6, 'covered every | plant. labeled.'], [1.9, 1.5, 'it was 52°.']], ['clipboard']),
      one('freeway', [[0.2, 1.0, 'as a Vir—'], [1.5, 1.9, '...as someone who | says "San Felipe" right.']], ['sign', 'SAN FELIPE'], { beep: 0.9 }),
      one('day', [[0.2, 3.2, 'a sweater for | indoor AC. always.']], ['sweater', MINT]),
      one('night', [[0.2, 1.6, 'party checklist: | done.'], [1.9, 1.5, "you're on it. | checked.", ]], ['clipboard']),
    ],
    cameo: cameo('kitchen', 'virgo', 'gemini', 'pig in | a blanket?', 'leave. | the kitchen.', 'wink'),
    reveal: [[0.2, 0.9, '...correct.'], [1.2, 2.2, 'Virgo. | arrival: on time.']],
    cta: 'Kolache or klobasnek? Comment.',
    end: { line: 'On time. Jan 9.', stars: ['virgo', 'gemini', 'capricorn', 'cancer'] },
  }),

  hst375: tellEp({
    sign: 'libra', hidden: 'LIBRA', accent: PINK, card: '#3a1430', hook: 'Houston Libra? | Tell me without | telling me', introBg: 'coffee',
    clues: [
      one('coffee', [[0.2, 1.6, 'Rice Village. | one shop?'], [1.9, 1.5, 'all the shops. | no parking.']], ['sign', 'RICE VILLAGE']),
      one('kitchen', [[0.2, 3.2, 'Tex-Mex or | Mexican? ...both?']], ['tacos']),
      one('bellaire', [[0.2, 1.6, 'boba: 50% sweet.'], [1.9, 1.5, '50% | unsure.']], ['boba', '#ffd36b']),
      one('museum', [[0.2, 1.6, 'free museum day. | a date.'], [1.9, 1.5, "you'd love | this one.", ]], ['heart']),
      one('traffic', [[0.2, 1.0, 'as a Lib—'], [1.5, 1.9, '...as someone torn | on the Texas U-turn.']], ['sign', 'U-TURN'], { beep: 0.9 }),
      one('cold', [[0.2, 3.2, 'the 55° outfit. | planned in July.']], ['coat', '#ff8fb1']),
      one('night', [[0.2, 1.6, 'RSVP: maybe. | yes. maybe.'], [1.9, 1.5, '...yes!']], ['ticket']),
    ],
    cameo: cameo('coffee', 'libra', 'capricorn', 'just pick | one, Libra.', '...which | one?', 'squint'),
    reveal: [[0.2, 0.9, '...maybe.'], [1.2, 2.2, 'Libra. | final answer. maybe.']],
    cta: 'Help a Libra. Comment your sign.',
    end: { line: 'Decide: Jan 9.', stars: ['libra', 'capricorn', 'pisces', 'leo'] },
  }),

  hst376: tellEp({
    sign: 'scorpio', hidden: 'SCORPIO', accent: '#c0304a', card: '#2a0a18', hook: "You're a Houston | Scorpio if you | do this", introBg: 'mural',
    clues: [
      one('mural', [[0.2, 1.6, "a Montrose mural | you've never seen."], [1.9, 1.5, 'not telling | you where.']], ['pin', '#1b1236']),
      one('quiet', [[0.2, 3.2, 'the quiet chapel. | alone. perfect.']], null),
      one('night', [[0.2, 1.6, 'read your text. | 5:02.'], [1.9, 1.5, 'replied with | my eyes.']], ['phone', 'read 5:02']),
      one('bellaire', [[0.2, 1.6, 'the spot | with no sign.'], [1.9, 1.5, 'trust me.']], ['bowl']),
      one('heat', [[0.2, 1.0, 'as a Scorp—'], [1.5, 1.9, "...as someone who | doesn't sweat.", ]], ['sun'], { beep: 0.9 }),
      one('traffic', [[0.2, 3.2, "it's fine. | I'm fine. (610)"]], ['shield', '610']),
      one('night', [[0.2, 1.6, 'first one | at the party.'], [1.9, 1.5, 'said "seen."']], ['ticket']),
    ],
    cameo: cameo('night', 'scorpio', 'gemini', 'is that... | a Scorpio?', 'who told | you.', 'sparkle'),
    reveal: [[0.2, 0.9, '...'], [1.2, 2.2, 'Scorpio. | tell no one.']],
    cta: 'Scorpios: say "seen."',
    end: { line: 'Seen. Jan 9.', stars: ['scorpio', 'gemini', 'cancer', 'pisces'] },
  }),

  hst377: tellEp({
    sign: 'sagittarius', hidden: 'SAG', accent: '#c9a6ff', card: '#2a1a4a', hook: "Signs you're | secretly a Sag | from Houston", introBg: 'beach',
    clues: [
      one('beach', [[0.2, 1.6, 'Galveston. | on a Tuesday.'], [1.9, 1.5, 'brown water. | love it.']], ['sun']),
      one('bellaire', [[0.2, 3.2, 'six-stop food | crawl. midnight.']], ['bowl']),
      one('freeway', [[0.2, 1.6, 'Grand Parkway. | for fun.'], [1.9, 1.5, 'the third loop. | wheee.']], ['shield', '99']),
      one('traffic', [[0.2, 1.6, 'took the feeder. | freedom!'], [1.9, 1.5, "...it's | also stuck."]], ['sign', 'FEEDER RD']),
      one('run', [[0.2, 1.0, 'as a Sag—'], [1.5, 1.9, '...as someone who | joined 4 run clubs.']], ['sneaker', '#c9a6ff'], { beep: 0.9 }),
      one('woods', [[0.2, 3.2, '"is it Spring or | the Woodlands?" both.']], ['pin']),
      one('night', [[0.2, 1.6, "I'm in for | Jan 9!"], [1.9, 1.5, 'where is it? | ...in!']], ['ticket']),
    ],
    cameo: cameo('beach', 'sagittarius', 'capricorn', 'you have work | tomorrow.', 'Galveston | first.', 'squint'),
    reveal: [[0.2, 0.9, 'fine. FINE.'], [1.2, 2.2, 'Sagittarius. | road trip after?']],
    cta: 'Sags, comment your next trip.',
    end: { line: 'Detour to Jan 9.', stars: ['sagittarius', 'capricorn', 'aries', 'gemini'] },
  }),

  hst378: tellEp({
    sign: 'capricorn', hidden: 'CAPRICORN', accent: '#3a8f6a', card: '#10281c', hook: "Signs you're | secretly a Houston | Capricorn", introBg: 'lot',
    clues: [
      one('run', [[0.2, 1.6, '5am in Memorial. | done by 6.'], [1.9, 1.5, 'then | work.']], ['sneaker', '#3a8f6a']),
      one('porch', [[0.2, 3.2, 'the hedges? | trimmed. with a level.']], ['hedge']),
      one('freeway', [[0.2, 1.6, 'left two hours | early.'], [1.9, 1.5, "it's | the 610."]], ['shield', '610']),
      one('kitchen', [[0.2, 1.6, 'a dozen kolaches. | by 7am.'], [1.9, 1.5, 'for the | meeting.']], ['both']),
      one('night', [[0.2, 1.0, 'as a Capri—'], [1.5, 1.9, '...as someone with | a five-year plan.']], ['clipboard'], { beep: 0.9 }),
      one('lot', [[0.2, 3.2, 'front row. | because I was early.']], ['car', '#3a8f6a']),
      one('night', [[0.2, 1.6, 'the party plan? | made it.'], [1.9, 1.5, 'and a | backup plan.']], ['phone', 'plan A | plan B']),
    ],
    cameo: cameo('lot', 'capricorn', 'sagittarius', 'Galveston? | right now?', '...after | 5pm.', 'sparkle'),
    reveal: [[0.2, 0.9, 'correct.'], [1.2, 2.2, 'Capricorn. | see you early.']],
    cta: 'Capricorns: comment your ETA.',
    end: { line: 'Early to Jan 9.', stars: ['capricorn', 'sagittarius', 'virgo', 'taurus'] },
  }),

  hst379: tellEp({
    sign: 'aquarius', hidden: 'AQUARIUS', accent: '#5ec8ff', card: '#0a2a3a', hook: "You're a Houston | Aquarius if you | do this", introBg: 'space',
    clues: [
      one('woods', [[0.2, 1.6, 'The Woodlands. | technically'], [1.9, 1.5, 'not Houston. | I know.']], ['sign', 'WOODLANDS']),
      one('space', [[0.2, 3.2, 'my Clear Lake | neighbors build rockets.']], ['shield', '45']),
      one('museum', [[0.2, 1.6, 'free museum day. | weird art.'], [1.9, 1.5, 'stood there. | an hour.']], null),
      one('kitchen', [[0.2, 1.6, 'a boudin | kolache.'], [1.9, 1.5, "I invented it. | you're welcome."]], ['klobasnek']),
      one('day', [[0.2, 1.0, 'as an Aqua—'], [1.5, 1.9, '...as someone at a | Discovery Green drum circle.']], ['heart'], { beep: 0.9 }),
      one('night', [[0.2, 3.2, 'replied to | your text. 3 days later.']], ['phone', 'lol']),
      one('night', [[0.2, 1.6, "I'll arrive | as a surprise."], [1.9, 1.5, 'Jan 9. | surprise.']], ['ticket']),
    ],
    cameo: cameo('space', 'aquarius', 'leo', "that's an | Aquarius.", 'labels are | so last year.', 'eyeroll'),
    reveal: [[0.2, 0.9, '...technically.'], [1.2, 2.2, 'Aquarius. | from the future.']],
    cta: 'Aquarius? Comment in 3 days.',
    end: { line: 'Surprise us. Jan 9.', stars: ['aquarius', 'leo', 'scorpio', 'gemini'] },
  }),

  hst380: tellEp({
    sign: 'pisces', hidden: 'PISCES', accent: LAV, card: '#24184a', hook: "Signs you're | secretly a Houston | Pisces", introBg: 'bayou',
    clues: [
      one('bayou', [[0.2, 1.6, 'the bats at | sunset.'], [1.9, 1.5, 'I cried. | every time.']], ['heart']),
      one('traffic', [[0.2, 3.2, 'cried at the | skyline on 59.']], ['shield', '59']),
      one('park', [[0.2, 1.6, 'paddle boats. | Hermann Park.'], [1.9, 1.5, 'I named | the duck.']], ['paddle']),
      one('beach', [[0.2, 1.6, 'stared at | the water.'], [1.9, 1.5, 'dreamed about | space.']], null),
      one('night', [[0.2, 1.0, 'as a Pisc—'], [1.5, 1.9, "...as someone who | sends 9-minute memos.", ]], ['phone', '▶ 9:04'], { beep: 0.9 }),
      one('bellaire', [[0.2, 3.2, 'karaoke ballad. | wept. encore.']], ['heart']),
      one('night', [[0.2, 1.6, 'the invite | made me cry.'], [1.9, 1.5, 'happy tears. | Jan 9.']], ['ticket']),
    ],
    cameo: cameo('bayou', 'pisces', 'cancer', 'oh baby, | Pisces.', "I'm not | crying. (crying)", 'heart'),
    reveal: [[0.2, 0.9, '*sniff*'], [1.2, 2.2, 'Pisces. | of course.']],
    cta: 'Pisces, comment a sunset spot.',
    end: { line: 'Bring tissues. Jan 9.', stars: ['pisces', 'cancer', 'scorpio', 'taurus'] },
  }),
}
