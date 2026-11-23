// Batch two: 150 more single-pair reels (101–250), on top of batch.mjs's 100.
//
//   node reels/difference/batch2.mjs        # (re)write scripts/batch2/*.json
//   node reels/difference/render.mjs --dir batch2 --jobs 3 --skip
//
//   101–178  Every sign pair: how Aries and Libra align (all 78, same-sign included)
//   179–202  Your sign in love: a crush vs in love, likes you vs doesn't (12 + 12)
//   203–214  Venus and Mars in opposite signs (6 + 6)
//   215–234  Texting and dating now (20)
//   235–250  Align's own ideas, only what the beta really does (16)
//
// Rules (../SPEC.md): never "compatibility", only "alignment"; no exclamation
// marks; numbers spelled out; no hyphens or digits in spoken lines. Every reel
// ends on the beta. Texting and sign-in-love reels play in guess mode: both
// cards start face down and turn over as each is explained.

import { mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, 'scripts', 'batch2')
const END = { lines: ['Join the *Align* beta.', 'Link in bio.'], pill: 'JOIN THE ALIGN BETA' }
const CTA = 'join the align beta ✦ link in bio'

// ---------------- the signs ----------------
const SIGNS = [
  { n: 'Aries', g: '♈', c: 'mars', el: 'fire', mode: 'cardinal', gift: 'the spark',
    love: [['*Aries* loves fast and out loud.', 'If they want you, you\'ll know by Tuesday.'], ['*Aries* loves like a dare.', 'Bold first moves, honest to a fault.']],
    crush: ['An *Aries* crush is obvious.', 'They chase, they tease, they text first.'], inlove: ['*Aries* in love gets protective,', 'and fights for you, not with you.'], cdiff: ['The crush is a *race.*', 'Love is when they *slow down* for you.'],
    likes: ['When *Aries* likes you,', 'they make the first move, fast.'], not: ['When they don\'t,', 'they\'re gone before you notice.'], ldiff: ['Aries never hides it.', 'No answer *is* the answer.'] },
  { n: 'Taurus', g: '♉', c: 'gold', el: 'earth', mode: 'fixed', gift: 'the steadiness',
    love: [['*Taurus* loves slowly, then forever.', 'Dinner, touch, and showing up on time.'], ['*Taurus* loves with all five senses.', 'Steady, loyal, a little stubborn.']],
    crush: ['A *Taurus* crush moves slowly.', 'Lots of looking, very little saying.'], inlove: ['*Taurus* in love is all in,', 'with your favorite food already ordered.'], cdiff: ['The crush is *careful.*', 'Love is *forever,* once it decides.'],
    likes: ['When *Taurus* likes you,', 'they make time, and they make plans.'], not: ['When they don\'t,', 'they get politely busy.'], ldiff: ['Taurus shows it with time.', 'Check the *calendar.*'] },
  { n: 'Gemini', g: '♊', c: 'mint', el: 'air', mode: 'mutable', gift: 'the conversation',
    love: [['*Gemini* loves through talking.', 'If the conversation is good, they\'re in.'], ['*Gemini* loves curious and quick.', 'They need a mind to play with.']],
    crush: ['A *Gemini* crush is all texting.', 'Memes at midnight, questions all day.'], inlove: ['*Gemini* in love tells you everything,', 'and wants to hear everything back.'], cdiff: ['The crush is *fun.*', 'Love is when they *stop looking around.*'],
    likes: ['When *Gemini* likes you,', 'they keep the conversation going.'], not: ['When they don\'t,', 'the replies get shorter.'], ldiff: ['Gemini lives in the words.', 'Watch the *length* of the texts.'] },
  { n: 'Cancer', g: '♋', c: 'blue', el: 'water', mode: 'cardinal', gift: 'the care',
    love: [['*Cancer* loves like coming home.', 'They remember everything you told them.'], ['*Cancer* loves protectively.', 'Soft inside, a shell outside.']],
    crush: ['A *Cancer* crush is shy.', 'They feed you, and hope you notice.'], inlove: ['*Cancer* in love builds you a home,', 'and remembers every date.'], cdiff: ['The crush is *hidden.*', 'Love is when they *let you in.*'],
    likes: ['When *Cancer* likes you,', 'they take care of you.'], not: ['When they don\'t,', 'they pull back into their shell.'], ldiff: ['Cancer shows it with care.', 'No care, no *chance.*'] },
  { n: 'Leo', g: '♌', c: 'gold', el: 'fire', mode: 'fixed', gift: 'the warmth',
    love: [['*Leo* loves big and generous.', 'They want to adore you, and be adored back.'], ['*Leo* loves like a spotlight.', 'Warm, loyal, a little dramatic.']],
    crush: ['A *Leo* crush is a performance.', 'They want you watching.'], inlove: ['*Leo* in love is generous,', 'and proud to be seen with you.'], cdiff: ['The crush wants your *attention.*', 'Love gives you *theirs.*'],
    likes: ['When *Leo* likes you,', 'they show you off.'], not: ['When they don\'t,', 'they stop trying to impress you.'], ldiff: ['Leo likes you in public.', 'If it\'s all private, *ask why.*'] },
  { n: 'Virgo', g: '♍', c: 'mint', el: 'earth', mode: 'mutable', gift: 'the devotion',
    love: [['*Virgo* loves through small acts.', 'Fixing, planning, noticing what you need.'], ['*Virgo* loves carefully.', 'They show it more than they say it.']],
    crush: ['A *Virgo* crush is quiet.', 'They remember your coffee order.'], inlove: ['*Virgo* in love fixes things.', 'Your schedule, your shelf, your day.'], cdiff: ['The crush *notices.*', 'Love *helps.*'],
    likes: ['When *Virgo* likes you,', 'they do small things, every day.'], not: ['When they don\'t,', 'they get polite and vague.'], ldiff: ['Virgo is in the details.', 'No details, no *Virgo.*'] },
  { n: 'Libra', g: '♎', c: 'rose', el: 'air', mode: 'cardinal', gift: 'the balance',
    love: [['*Libra* loves in partnership.', 'Fair, charming, always thinking of us.'], ['*Libra* loves beautifully.', 'Romance, balance, and no ugly fights.']],
    crush: ['A *Libra* crush is charming.', 'Compliments, eye contact, perfect timing.'], inlove: ['*Libra* in love thinks in we,', 'and makes your life a little prettier.'], cdiff: ['The crush flirts with *everyone.*', 'Love *chooses one.*'],
    likes: ['When *Libra* likes you,', 'they include you in plans.'], not: ['When they don\'t,', 'they stay sweet, and keep it vague.'], ldiff: ['Libra is nice to everyone.', 'Look for the *plans.*'] },
  { n: 'Scorpio', g: '♏', c: 'rose', el: 'water', mode: 'fixed', gift: 'the depth',
    love: [['*Scorpio* loves all or nothing.', 'Deep trust, total loyalty, no half measures.'], ['*Scorpio* loves intensely.', 'They want your secrets, and they keep them.']],
    crush: ['A *Scorpio* crush stares.', 'They study you before they say a word.'], inlove: ['*Scorpio* in love is loyal for life,', 'and tells you their secrets.'], cdiff: ['The crush is *watching.*', 'Love is *trusting.*'],
    likes: ['When *Scorpio* likes you,', 'they want to know everything.'], not: ['When they don\'t,', 'they go cold, fast.'], ldiff: ['Scorpio is never lukewarm.', 'Warm means *yes.*'] },
  { n: 'Sagittarius', g: '♐', c: 'lilac', el: 'fire', mode: 'mutable', gift: 'the adventure',
    love: [['*Sagittarius* loves with room to roam.', 'Adventure first, rules later.'], ['*Sagittarius* loves honestly and freely.', 'They want a partner for the next trip.']],
    crush: ['A *Sagittarius* crush is a laugh.', 'Jokes, dares, a spontaneous trip.'], inlove: ['*Sagittarius* in love brings you along,', 'on every adventure.'], cdiff: ['The crush is *fun.*', 'Love is when they *plan you in.*'],
    likes: ['When *Sagittarius* likes you,', 'they invite you somewhere new.'], not: ['When they don\'t,', 'they get vague about the future.'], ldiff: ['Sagittarius is honest.', 'If you have to *wonder,* that\'s an answer.'] },
  { n: 'Capricorn', g: '♑', c: 'blue', el: 'earth', mode: 'cardinal', gift: 'the commitment',
    love: [['*Capricorn* loves like a long plan.', 'Slow to open, built to last.'], ['*Capricorn* loves through commitment.', 'They show up, they build, they stay.']],
    crush: ['A *Capricorn* crush is subtle.', 'They take you seriously, and that\'s the sign.'], inlove: ['*Capricorn* in love makes plans,', 'for years, not weekends.'], cdiff: ['The crush is *careful.*', 'Love is *committed.*'],
    likes: ['When *Capricorn* likes you,', 'they make room in a busy life.'], not: ['When they don\'t,', 'work always comes first.'], ldiff: ['Capricorn\'s time is precious.', 'If they give it, *that\'s love.*'] },
  { n: 'Aquarius', g: '♒', c: 'blue', el: 'air', mode: 'fixed', gift: 'the freedom',
    love: [['*Aquarius* loves as a friend first.', 'They need space to stay themselves.'], ['*Aquarius* loves in their own way.', 'Loyal, unusual, and never clingy.']],
    crush: ['An *Aquarius* crush looks like friendship.', 'Long talks, strange ideas, no labels.'], inlove: ['*Aquarius* in love is loyal,', 'and loves you exactly as you are.'], cdiff: ['The crush is a *friend.*', 'Love is a *best friend,* and more.'],
    likes: ['When *Aquarius* likes you,', 'they show you their strange side.'], not: ['When they don\'t,', 'they treat you like everyone else.'], ldiff: ['Aquarius is friendly to all.', 'Being *different* is the sign.'] },
  { n: 'Pisces', g: '♓', c: 'lilac', el: 'water', mode: 'mutable', gift: 'the tenderness',
    love: [['*Pisces* loves like a dream.', 'Romantic, gentle, all in.'], ['*Pisces* loves with no walls.', 'They feel what you feel before you say it.']],
    crush: ['A *Pisces* crush is a daydream.', 'Playlists, poems, the whole future.'], inlove: ['*Pisces* in love is gentle,', 'and feels everything with you.'], cdiff: ['The crush is a *dream.*', 'Love is *real,* and still soft.'],
    likes: ['When *Pisces* likes you,', 'they tell you how they feel.'], not: ['When they don\'t,', 'they drift away, softly.'], ldiff: ['Pisces can\'t hide a feeling.', 'If it goes *quiet,* listen.'] },
]
const cap = (s) => s[0].toUpperCase() + s.slice(1)
const giftLine = (a, b) => (a === b ? null : `${a.n} brings *${a.gift}.* ${b.n} brings *${b.gift}.*`)

// how two signs sit on the wheel, and what that means for them
function pairDiff(a, b, d) {
  const gifts = giftLine(a, b)
  if (d === 0) return [`Two ${a.n}s are a *mirror.*`, 'Easy to understand, hard to hide from.', `Double *${a.gift.replace('the ', '')},* and the same blind spots.`]
  if (d === 1) return ['Neighbors on the wheel,', 'with *different* needs, and a lot to teach each other.', gifts]
  if (d === 2) return [`${cap(a.el)} and ${b.el} *feed* each other.`, 'Easy to talk to, easy to grow with.', gifts]
  if (d === 3) return [`Two ${a.mode} signs, a quarter of the sky apart.`, 'Real *friction,* and real growth if they stay.', gifts]
  if (d === 4) return [`Both ${a.el} signs.`, 'They *get* each other without explaining.', gifts]
  if (d === 5) return ['Almost opposite, but not quite.', 'They keep *adjusting* to each other, and that can work.', gifts]
  return ['Opposite signs.', 'Each one has what the other is *missing.*', gifts]
}

const reels = []
// 101–178: every sign pair
let k = 0
for (let i = 0; i < 12; i++) for (let j = i; j < 12; j++) {
  const a = SIGNS[i], b = SIGNS[j]
  const d = Math.min(j - i, 12 - (j - i))
  k++
  reels.push({
    slug: `${a.n}-and-${b.n}`, cat: 'S', kicker: 'HOW THEY ALIGN', series: `EVERY SIGN PAIR · ${k} / 78`,
    title: `${a.n} & ${b.n}`,
    pair: {
      a: { label: a.n, art: `sign:${a.g}:${a.c}` },
      b: { label: b.n, art: `sign:${b.g}:${b.c}` },
      ask: [`*${a.n}* and *${b.n}.*`, 'How do they align?'],
      explainA: a.love[(i + j) % 2],
      explainB: b.love[(i + j + (i === j ? 1 : 0)) % 2],
      diff: pairDiff(a, b, d).filter(Boolean),
    },
    caption: `${a.n.toLowerCase()} & ${b.n.toLowerCase()}: how do they align? ✨\n${pairDiff(a, b, d).filter(Boolean).map((l) => l.replace(/\*/g, '')).join(' ')}\nevery sign pair, part ${k} of 78`,
    tags: ['astrology', `${a.n.toLowerCase()}`, `${b.n.toLowerCase()}`, 'zodiaclove', 'zodiacsigns'],
  })
}
// 179–202: your sign in love
for (const s of SIGNS) {
  reels.push({
    slug: `${s.n}-crush-vs-in-love`, cat: 'S', kicker: s.n.toUpperCase(), series: `${s.n.toUpperCase()} IN LOVE`, title: `${s.n} crush vs ${s.n} in love`,
    pair: { a: { label: 'A crush', art: `solo:thoughts:${s.c}` }, b: { label: 'In love', art: `duo:close:${s.c}:${s.c}` }, guess: true,
      ask: [`${s.n} with a *crush,*`, `versus ${s.n} in *love.*`], explainA: s.crush, explainB: s.inlove, diff: s.cdiff },
    caption: `${s.n.toLowerCase()} with a crush vs ${s.n.toLowerCase()} in love 💭\n${s.cdiff.join(' ').replace(/\*/g, '')}`,
    tags: ['astrology', s.n.toLowerCase(), 'zodiaclove', 'crush', 'zodiacsigns'],
  })
}
for (const s of SIGNS) {
  reels.push({
    slug: `${s.n}-likes-you-vs-doesnt`, cat: 'S', kicker: s.n.toUpperCase(), series: `DOES ${s.n.toUpperCase()} LIKE YOU`, title: `When ${s.n} likes you vs when they don't`,
    pair: { a: { label: 'Likes you', art: 'beam' }, b: { label: 'Doesn\'t', art: `duo:ghost:${s.c}:lilac` }, guess: true,
      ask: [`When ${s.n} *likes you,*`, 'versus when they *don\'t.*'], explainA: s.likes, explainB: s.not, diff: s.ldiff },
    caption: `when ${s.n.toLowerCase()} likes you vs when they don't 👀\n${s.ldiff.join(' ').replace(/\*/g, '')}`,
    tags: ['astrology', s.n.toLowerCase(), 'zodiaclove', 'datingtips', 'zodiacsigns'],
  })
}
// 203–214: Venus and Mars in opposite signs
const VENUS = [
  [0, 6, ['*Venus in Aries* loves the chase.', 'Direct, eager, a little impatient.'], ['*Venus in Libra* loves the romance.', 'Courtship, beauty, and fairness.'], ['One wants *excitement.*', 'One wants *harmony.*']],
  [1, 7, ['*Venus in Taurus* loves through comfort.', 'Touch, food, and loyalty.'], ['*Venus in Scorpio* loves through intensity.', 'Trust, depth, and all of you.'], ['Taurus wants *safe.*', 'Scorpio wants *deep.*']],
  [2, 8, ['*Venus in Gemini* loves through words.', 'Banter, texts, and new ideas.'], ['*Venus in Sagittarius* loves through adventure.', 'Trips, honesty, and freedom.'], ['Gemini wants to *talk.*', 'Sagittarius wants to *go.*']],
  [3, 9, ['*Venus in Cancer* loves by nurturing.', 'Home, family, and feeling safe.'], ['*Venus in Capricorn* loves by providing.', 'Plans, effort, and staying power.'], ['Cancer *cares* for you.', 'Capricorn *builds* with you.']],
  [4, 10, ['*Venus in Leo* loves out loud.', 'Grand gestures and devotion.'], ['*Venus in Aquarius* loves as a friend.', 'Space, respect, and no clinging.'], ['Leo wants to be *adored.*', 'Aquarius wants to be *understood.*']],
  [5, 11, ['*Venus in Virgo* loves through help.', 'Small fixes, real effort.'], ['*Venus in Pisces* loves through feeling.', 'Romance, empathy, and devotion.'], ['Virgo shows love in *actions.*', 'Pisces shows it in *feelings.*']],
]
const MARS = [
  [0, 6, ['*Mars in Aries* goes straight for it.', 'Quick to want, quick to fight, quick to forgive.'], ['*Mars in Libra* goes about it gracefully.', 'It hates conflict, and charms its way through.'], ['Aries *charges.*', 'Libra *persuades.*']],
  [1, 7, ['*Mars in Taurus* is slow and steady.', 'Hard to start, impossible to stop.'], ['*Mars in Scorpio* is quiet and intense.', 'It wants, it waits, it never forgets.'], ['Taurus *holds its ground.*', 'Scorpio *holds a grudge.*']],
  [2, 8, ['*Mars in Gemini* fights with words.', 'Quick, clever, and restless.'], ['*Mars in Sagittarius* fights for what it believes.', 'Blunt, fiery, and over fast.'], ['Gemini *argues.*', 'Sagittarius *preaches.*']],
  [3, 9, ['*Mars in Cancer* acts through feelings.', 'It protects, and it sulks when hurt.'], ['*Mars in Capricorn* acts through discipline.', 'It plans, it climbs, it stays cool.'], ['Cancer fights for *home.*', 'Capricorn fights for the *goal.*']],
  [4, 10, ['*Mars in Leo* wants to be seen.', 'Proud, warm, and dramatic.'], ['*Mars in Aquarius* wants to be free.', 'Cool, stubborn, and principled.'], ['Leo fights for *pride.*', 'Aquarius fights for a *cause.*']],
  [5, 11, ['*Mars in Virgo* gets things done.', 'Precise, practical, a little critical.'], ['*Mars in Pisces* goes with the flow.', 'Gentle, intuitive, and hard to pin down.'], ['Virgo makes a *plan.*', 'Pisces follows a *feeling.*']],
]
for (const [planet, list, col] of [['Venus', VENUS, 'venus'], ['Mars', MARS, 'mars']]) {
  for (const [i, j, ea, eb, diff] of list) {
    const a = SIGNS[i], b = SIGNS[j]
    reels.push({
      slug: `${planet}-in-${a.n}-vs-${b.n}`, cat: 'S', kicker: planet.toUpperCase(), series: `${planet.toUpperCase()} · OPPOSITE SIGNS`, title: `${planet} in ${a.n} vs ${planet} in ${b.n}`,
      pair: { a: { label: `${planet} in ${a.n}`, art: `sign:${a.g}:${col}` }, b: { label: `${planet} in ${b.n}`, art: `sign:${b.g}:${col}` },
        ask: ['Same planet, opposite signs.', `*${planet} in ${a.n}* versus *${planet} in ${b.n}.*`], explainA: ea, explainB: eb, diff },
      caption: `${planet.toLowerCase()} in ${a.n.toLowerCase()} vs ${planet.toLowerCase()} in ${b.n.toLowerCase()} 🌙\n${diff.join(' ').replace(/\*/g, '')}`,
      tags: ['astrology', `${planet.toLowerCase()}sign`, 'birthchart', 'zodiaclove', 'zodiacsigns'],
    })
  }
}
// 215–234: texting and dating now
const DATING = [
  ['Dry texter', 'Busy texter', 'solo:phone:blue', 'solo:clock:gold', ['A *dry texter* has the time,', 'and gives you one word.'], ['A *busy texter* has no time,', 'and makes the one text count.'], ['Dry is about *interest.*', 'Busy is about *timing.*'], ['a dry texter', 'a busy texter']],
  ['Double text', 'Follow up', 'solo:phone:rose', 'solo:door:gold', ['A *double text* is a nervous second message.', 'Did you see my last one?'], ['A *follow up* adds something new.', 'A plan, a link, a question.'], ['Double texts *ask* for attention.', 'Follow ups *give* something.'], ['a double text', 'a follow up']],
  ['Left on read', 'Left on delivered', 'solo:phone:lilac', 'solo:clock:blue', ['*Left on read* means they saw it,', 'and chose not to answer yet.'], ['*Left on delivered* means they haven\'t opened it.', 'Busy, asleep, or avoiding.'], ['Read is a *choice.*', 'Delivered is a *maybe.*']],
  ['Soft launch', 'Hard launch', 'duo:ghost:rose:lilac', 'duo:close:gold:rose', ['A *soft launch* is a hand, a drink, a shadow.', 'No face yet.'], ['A *hard launch* is their face,', 'their name, and the caption.'], ['Soft says *someone.*', 'Hard says *them.*'], ['a soft launch', 'a hard launch']],
  ['I like you', 'I love you', 'beam', 'halo', ['*I like you* is about now.', 'I want more of this.'], ['*I love you* is about later.', 'I want you in what comes next.'], ['One is a *door.*', 'One is a *home.*']],
  ['Meeting friends', 'Meeting family', 'solo:crowd:gold', 'duo:close:gold:gold', ['*Meeting the friends* is an audition.', 'Do you fit in?'], ['*Meeting the family* is a statement.', 'You\'re staying.'], ['Friends ask if you\'re *fun.*', 'Family asks if you\'re *serious.*'], ['meeting the friends', 'meeting the family']],
  ['First date', 'Second date', 'spark', 'road', ['A *first date* checks if they match the profile.'], ['A *second date* checks if you match each other.'], ['First dates are *nerves.*', 'Second dates are *choices.*'], ['a first date', 'a second date']],
  ['Taking it slow', 'Not interested', 'road', 'solo:clock:lilac', ['*Taking it slow* still moves forward.', 'Plans, just spaced out.'], ['*Not interested* stays still.', 'No plans, ever.'], ['Slow has a *direction.*', 'Not interested has *none.*']],
  ['Caring', 'Jealous', 'solo:heart:gold', 'duo:three:rose:lilac', ['*Caring* asks how your night was.'], ['*Jealous* asks who was there.'], ['Caring wants you *happy.*', 'Jealousy wants you *watched.*']],
  ['Busy', 'Avoiding you', 'solo:clock:gold', 'solo:mask:lilac', ['*Busy* people tell you when they\'re free.'], ['People *avoiding you*', 'only ever say they\'re busy.'], ['Busy comes with a *time.*', 'Avoiding comes with an *excuse.*'], ['busy', 'avoiding you']],
  ['A date', 'A hangout', 'duo:close:rose:rose', 'duo:apart:mint:mint', ['A *date* is planned,', 'and you both know it.'], ['A *hangout* could be anything,', 'and that\'s the point.'], ['Dates are *clear.*', 'Hangouts leave room to *pretend.*'], ['a date', 'a hangout']],
  ['Liking posts', 'Liking you', 'solo:phone:rose', 'duo:close:gold:gold', ['*Liking your posts* costs nothing.', 'A tap, and it\'s done.'], ['*Liking you* takes effort.', 'Plans, texts, and showing up.'], ['Posts get *taps.*', 'People get *time.*'], ['liking your posts', 'liking you']],
  ['Viewed story', 'Texted you', 'solo:phone:lilac', 'beam', ['Watching your *story* is attention.', 'It\'s easy.'], ['*Texting you* is intention.', 'It takes a choice.'], ['Attention *watches.*', 'Intention *reaches out.*'], ['watching your story', 'texting you']],
  ['The ick', 'A red flag', 'solo:storm:mint', 'solo:flag:rose', ['*The ick* is a sudden turnoff.', 'Small, strange, and hard to unsee.'], ['A *red flag* is a real warning,', 'about how they treat people.'], ['The ick is about *you.*', 'A red flag is about *them.*'], ['the ick', 'a red flag']],
  ['Butterflies', 'Peace', 'solo:butterflies:gold', 'halo', ['*Butterflies* are the not knowing.'], ['*Peace* is the knowing.'], ['Butterflies *start* it.', 'Peace *keeps* it.']],
  ['Hot and cold', 'Slow and steady', 'solo:flame:mars', 'road', ['*Hot and cold* is all in, then gone.', 'Then back again.'], ['*Slow and steady* is a little more,', 'every single week.'], ['Hot and cold keeps you *hooked.*', 'Steady keeps you *safe.*']],
  ['A plan', 'Whatever you want', 'solo:star:gold', 'solo:thoughts:lilac', ['*A plan* says,', 'I thought about you.'], ['*Whatever you want*', 'puts all the work on you.'], ['Plans feel like *effort.*', 'Shrugs can feel like *none.*']],
  ['Good morning', 'Good night', 'sun', 'moon:full', ['A *good morning* text means', 'you\'re their first thought.'], ['A *good night* text means', 'you\'re their last.'], ['One of each is the *goal.*']],
  ['Situationship', 'Friends with benefits', 'duo:apart:lilac:rose', 'duo:away:rose:rose', ['A *situationship* has feelings,', 'and no label.'], ['*Friends with benefits* has a label,', 'and tries to have no feelings.'], ['One hopes for *more.*', 'One promises *less.*'], ['a situationship', 'friends with benefits']],
  ['A break', 'Giving up', 'solo:alone:blue', 'solo:wall:lilac', ['A *break from dating* is rest,', 'on purpose, for a while.'], ['*Giving up* is deciding', 'love isn\'t for you.'], ['A break *recharges.*', 'Giving up *closes the door.*'], ['a break from dating', 'giving up']],
]
for (const [a, b, artA, artB, ea, eb, diff, say] of DATING) {
  const [sa, sb] = say ?? [a.toLowerCase(), b.toLowerCase()]
  reels.push({
    slug: `${a}-vs-${b}`, cat: 'L', kicker: 'DATING NOW', series: 'DATING NOW', title: `${a} vs ${b}`,
    pair: { a: { label: a, art: artA }, b: { label: b, art: artB }, guess: true,
      ask: ['Guess which is which.', `*${cap(sa)}* versus *${sb}.*`], explainA: ea, explainB: eb, diff },
    caption: `${a.toLowerCase()} vs ${b.toLowerCase()}: what's the difference? 💭\n${diff.join(' ').replace(/\*/g, '')}`,
    tags: ['datingtips', 'relationshipadvice', 'dating', 'love', 'whatsthedifference'],
  })
}
// 235–250: Align's own ideas, only what the beta does
const APP = [
  ['Swiping', 'Aligning', 'solo:phone:blue', 'align', ['*Swiping* judges a face', 'in half a second.'], ['*Aligning* is choosing someone', 'after you\'ve read their sky.'], ['Swiping is a *reflex.*', 'Aligning is a *choice.*']],
  ['A profile', 'A card', 'solo:mirror:rose', 'back', ['A *profile* is photos first,', 'and a bio you skim.'], ['An *Align card* is their chart,', 'their dealbreakers, and a veiled photo.'], ['Profiles sell a *look.*', 'Cards show a *person.*'], ['a profile', 'an Align card']],
  ['Photo first', 'Sky first', 'solo:mirror:lilac', 'chart', ['*Photo first* decides', 'before you know them.'], ['*Sky first* lets you read how they love,', 'then see their face.'], ['One starts with *looks.*', 'One starts with *who.*']],
  ['Ghosting', 'Releasing', 'duo:ghost:gold:lilac', 'solo:door:gold', ['*Ghosting* leaves someone waiting.'], ['*Releasing* on the Align app', 'takes them out of your deck, cleanly.'], ['Ghosting *lingers.*', 'Releasing *lets go.*']],
  ['Preference', 'Dealbreaker', 'solo:star:mint', 'solo:shield:rose', ['A *preference* is nice to have.', 'Tall, funny, a dog person.'], ['A *dealbreaker* is a must not.', 'On Align, it goes right on your card.'], ['Preferences *bend.*', 'Dealbreakers *don\'t.*'], ['a preference', 'a dealbreaker']],
  ['A peek', 'A reveal', 'back', 'align', ['A *peek* is a few seconds of their photo,', 'while you hold the card.'], ['A *reveal* lifts the veil for good,', 'once you both align.'], ['A peek is a *glimpse.*', 'A reveal is *mutual.*'], ['a peek', 'a reveal']],
  ['Endless swiping', 'A nightly deck', 'loop', 'back', ['*Endless swiping* never runs out,', 'and never feels like enough.'], ['A *nightly deck* deals you a hand.', 'Then it\'s done until tomorrow.'], ['Endless is *exhausting.*', 'A deck is *enough.*'], ['endless swiping', 'a nightly deck']],
  ['An opener', 'A talk card', 'solo:knot:rose', 'duo:close:gold:gold', ['An *opener* is you, alone,', 'trying to be clever.'], ['A *talk card* is one question for both of you.', 'Neither answer shows until you both reply.'], ['Openers *perform.*', 'Talk cards *connect.*'], ['an opener', 'a talk card']],
  ['Horoscope', 'Today\'s sky', 'horoscope', 'chart', ['A *daily horoscope* is the same', 'for your whole sign.'], ['*Today\'s sky* on Align', 'reads the real planets, right now.'], ['One is *generic.*', 'One is *today.*'], ['a daily horoscope', 'today\'s sky']],
  ['A like', 'Aligned', 'beam', 'align', ['A *like* goes one way.', 'It might never come back.'], ['*Aligned* means you both chose,', 'and the cards flip.'], ['A like is a *hope.*', 'Aligned is a *fact.*'], ['a like', 'aligned']],
  ['Dating apps', 'Align', 'solo:phone:blue', 'back', ['Most *dating apps* show a face,', 'and let you guess the rest.'], ['*Align* shows you how someone loves,', 'then their face, once it\'s mutual.'], ['One is *looks* first.', 'One is *love* first.']],
  ['Small talk', 'Sky talk', 'solo:clock:lilac', 'glyphs:☉☽✦:gold', ['*Small talk* is weather and work.'], ['*Sky talk* is your big three,', 'and how you both love.'], ['Small talk *fills time.*', 'Sky talk *opens doors.*']],
  ['Spark', 'Clash', 'spark', 'duo:wall:rose:rose', ['A *spark* is where your charts pull together.'], ['A *clash* is where they push apart.'], ['Every pair has *both.*', 'Align shows you *where.*'], ['a spark', 'a clash']],
  ['Clash', 'Dealbreaker', 'duo:wall:mint:mint', 'solo:shield:rose', ['A *clash* is friction you can work with.'], ['A *dealbreaker* is a line you won\'t cross.'], ['Clashes *grow* you.', 'Dealbreakers *protect* you.'], ['a clash', 'a dealbreaker']],
  ['An aura', 'A photo', 'sign:✦:lilac', 'solo:mirror:gold', ['On Align, a card starts with an *aura,*', 'in the colors of their sign.'], ['The *photo* stays veiled,', 'until you both align.'], ['The aura is the *first impression.*', 'The photo is the *second.*'], ['an aura', 'a photo']],
  ['A percentage', 'A reading', 'orbs:72%:gold', 'chart', ['Most apps give you a *match percentage.*', 'A number, with no reason.'], ['Align gives you a *reading.*', 'Where you spark, clash, and align.'], ['A number *judges.*', 'A reading *explains.*'], ['a percentage', 'a reading']],
]
for (const [a, b, artA, artB, ea, eb, diff, say] of APP) {
  const [sa, sb] = say ?? [a.toLowerCase(), b.toLowerCase()]
  reels.push({
    slug: `${a}-vs-${b}`, cat: 'L', kicker: 'ALIGN', series: 'HOW ALIGN WORKS', title: `${a} vs ${b}`,
    pair: { a: { label: a, art: artA }, b: { label: b, art: artB }, ask: ['How Align is different.', `*${cap(sa)}* versus *${sb}.*`], explainA: ea, explainB: eb, diff },
    caption: `${a.toLowerCase()} vs ${b.toLowerCase()} ✦\n${diff.join(' ').replace(/\*/g, '')}`,
    tags: ['datingapp', 'astrology', 'dating', 'love', 'align'],
  })
}

if (reels.length !== 150) throw new Error(`batch two has ${reels.length} reels, not 150`)
const slug = (s) => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
mkdirSync(OUT, { recursive: true })
for (const f of readdirSync(OUT)) rmSync(path.join(OUT, f))
reels.forEach((r, i) => {
  const n = 101 + i
  const p = r.pair
  const lines = [...p.ask, ...p.explainA, ...p.explainB, ...p.diff, ...END.lines].join(' ')
  if (/compatib/i.test(lines + r.caption + p.a.label + p.b.label)) throw new Error(`${n}: never "compatibility"`)
  if (/[!0-9%]/.test(lines)) throw new Error(`${n}: no exclamation marks, digits or symbols in spoken lines: ${lines}`)
  if (/\w-\w/.test(lines)) throw new Error(`${n}: no hyphens in spoken lines: ${lines}`)
  const id = `${n}-${slug(r.slug)}`
  const script = {
    id, title: r.title, cover: r.cat === 'S' && r.kicker === 'HOW THEY ALIGN' ? 'How do they align?' : 'What\'s the difference?',
    kicker: r.kicker, series: r.series,
    voice: 'af_heart', speed: 1.12,
    caption: r.caption, cta: CTA, hashtags: [...r.tags, 'whatsthedifference'].filter((t, i2, all) => all.indexOf(t) === i2),
    pairs: [p], end: END,
  }
  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(script, null, 2) + '\n')
})
console.log(`wrote ${reels.length} scripts → ${path.relative(process.cwd(), OUT)}`)
