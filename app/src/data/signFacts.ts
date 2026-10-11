import type { SignId } from './signs'
import type { Face } from './archetypes'

/**
 * The back of every sign card: the basics, a bit of myth, a famous one, and
 * what each face means when you're dating one. Shown when a sign card turns
 * over in a pack and when you open it in your binder. Printed on the back of
 * the physical cards.
 */
export interface SignFacts {
  dates: string
  element: string
  mode: string
  ruler: string
  /** the myth or sky behind the sign */
  myth: string
  /** a famous one (birthday in brackets) */
  famous: string
  /** most likely to… */
  likely: string
  /** a first date they'd love */
  date: string
}

export const SIGN_FACTS: Record<SignId, SignFacts> = {
  aries: {
    dates: 'Mar 21 – Apr 19', element: 'Fire', mode: 'Cardinal', ruler: 'Mars',
    myth: 'The ram with the golden fleece. Jason and the Argonauts sailed across the world to steal it.',
    famous: 'Lady Gaga (Mar 28)', likely: 'Text first, and double-text without shame.', date: 'Axe throwing, then tacos.',
  },
  taurus: {
    dates: 'Apr 20 – May 20', element: 'Earth', mode: 'Fixed', ruler: 'Venus',
    myth: 'Zeus became a white bull to carry Europa across the sea. A whole continent is named after her.',
    famous: 'Adele (May 5)', likely: 'Remember your coffee order after one date.', date: 'A long dinner somewhere with real tablecloths.',
  },
  gemini: {
    dates: 'May 21 – Jun 20', element: 'Air', mode: 'Mutable', ruler: 'Mercury',
    myth: 'The twins Castor and Pollux. When one died, the other gave up half his immortality to keep them together.',
    famous: 'Marilyn Monroe (Jun 1)', likely: 'Have three group chats going during your date.', date: 'A bookstore, then a bar with trivia.',
  },
  cancer: {
    dates: 'Jun 21 – Jul 22', element: 'Water', mode: 'Cardinal', ruler: 'The Moon',
    myth: 'A crab Hera sent to distract Hercules. It got stepped on, so she put it in the stars for trying.',
    famous: 'Princess Diana (Jul 1)', likely: 'Cook for you by the third date.', date: 'A picnic they packed themselves.',
  },
  leo: {
    dates: 'Jul 23 – Aug 22', element: 'Fire', mode: 'Fixed', ruler: 'The Sun',
    myth: 'The Nemean lion, whose golden hide no weapon could cut. Hercules wore it as armor.',
    famous: 'Barack Obama (Aug 4)', likely: 'Plan your birthday better than you would.', date: 'Front row at a live show.',
  },
  virgo: {
    dates: 'Aug 23 – Sep 22', element: 'Earth', mode: 'Mutable', ruler: 'Mercury',
    myth: 'Astraea, the last goddess to leave Earth. She holds the wheat of the harvest.',
    famous: 'Beyoncé (Sep 4)', likely: 'Notice you changed your hair before you do.', date: 'A farmers market, then cooking together.',
  },
  libra: {
    dates: 'Sep 23 – Oct 22', element: 'Air', mode: 'Cardinal', ruler: 'Venus',
    myth: 'The only sign that is an object: the scales of justice, held by Astraea next door in Virgo.',
    famous: 'Serena Williams (Sep 26)', likely: 'Take 20 minutes to pick a restaurant, then love it.', date: 'A gallery opening, then a wine bar.',
  },
  scorpio: {
    dates: 'Oct 23 – Nov 21', element: 'Water', mode: 'Fixed', ruler: 'Pluto & Mars',
    myth: 'The scorpion that took down Orion the hunter. They sit on opposite sides of the sky so they never meet.',
    famous: 'Drake (Oct 24)', likely: 'Know your whole story by the second drink.', date: 'A speakeasy with no sign on the door.',
  },
  sagittarius: {
    dates: 'Nov 22 – Dec 21', element: 'Fire', mode: 'Mutable', ruler: 'Jupiter',
    myth: 'The centaur archer, aiming at the heart of the Scorpion. The center of our galaxy sits behind his bow.',
    famous: 'Taylor Swift (Dec 13)', likely: 'Suggest a road trip on the first date.', date: 'A sunrise hike, then breakfast.',
  },
  capricorn: {
    dates: 'Dec 22 – Jan 19', element: 'Earth', mode: 'Cardinal', ruler: 'Saturn',
    myth: 'The sea-goat, half goat and half fish: Pan jumped into a river to escape a monster and only half of him changed.',
    famous: 'Michelle Obama (Jan 17)', likely: 'Have a five-year plan, with you in it by month three.', date: 'A rooftop bar with a view of the city.',
  },
  aquarius: {
    dates: 'Jan 20 – Feb 18', element: 'Air', mode: 'Fixed', ruler: 'Uranus & Saturn',
    myth: 'Ganymede, the water-bearer, carried up to Olympus to pour for the gods.',
    famous: 'Harry Styles (Feb 1)', likely: 'Send you a meme about the date during the date.', date: 'A planetarium, or anything a little weird.',
  },
  pisces: {
    dates: 'Feb 19 – Mar 20', element: 'Water', mode: 'Mutable', ruler: 'Neptune & Jupiter',
    myth: 'Aphrodite and Eros became two fish and tied themselves together so they wouldn’t lose each other.',
    famous: 'Rihanna (Feb 20)', likely: 'Make you a playlist after the first date.', date: 'Live jazz, or a walk by the water.',
  },
}

/** what each face means when you're dating one */
export const FACE_LINES: Record<SignId, Record<Face, string>> = {
  aries: { sun: 'Brave, direct, first to everything.', moon: 'Needs action. Sitting still with feelings is hard.', rising: 'Comes across bold. Walks in like they own it.', venus: 'Chases hard. Loves the pursuit, so keep it fun.' },
  taurus: { sun: 'Steady, loyal, here for the good stuff.', moon: 'Needs comfort and routine to feel safe.', rising: 'Comes across calm and put together.', venus: 'Loves through touch, food and showing up.' },
  gemini: { sun: 'Curious, quick, never the same twice.', moon: 'Needs to talk feelings out loud to understand them.', rising: 'Comes across funny and easy to talk to.', venus: 'Falls for minds first. Keep them guessing.' },
  cancer: { sun: 'Protective, loyal, deeply caring.', moon: 'Needs to feel safe before they open up.', rising: 'Comes across shy at first, warm after.', venus: 'Loves by taking care of you.' },
  leo: { sun: 'Warm, loud, generous with everything.', moon: 'Needs to feel seen and appreciated.', rising: 'Comes across confident. Everyone notices.', venus: 'Loves big. Grand gestures, said out loud.' },
  virgo: { sun: 'Thoughtful, sharp, quietly devoted.', moon: 'Needs order. Chaos makes them anxious.', rising: 'Comes across polished and a little reserved.', venus: 'Loves by noticing the small things.' },
  libra: { sun: 'Charming, fair, in love with beauty.', moon: 'Needs harmony. Conflict really drains them.', rising: 'Comes across graceful and easy to like.', venus: 'Loves romance done right: flowers, plans, effort.' },
  scorpio: { sun: 'Intense, loyal, all in or not at all.', moon: 'Needs trust before anything else.', rising: 'Comes across mysterious. Hard to read.', venus: 'Loves deeply and wants all of you.' },
  sagittarius: { sun: 'Free, funny, always going somewhere.', moon: 'Needs space and something to look forward to.', rising: 'Comes across friendly and up for anything.', venus: 'Loves with adventure. Bring a passport.' },
  capricorn: { sun: 'Driven, dry humor, built to last.', moon: 'Needs to feel capable before they feel close.', rising: 'Comes across serious, older than they are.', venus: 'Loves with commitment. Slow start, long run.' },
  aquarius: { sun: 'Original, independent, ahead of their time.', moon: 'Needs room to think before they feel.', rising: 'Comes across cool and a little different.', venus: 'Loves as a best friend first.' },
  pisces: { sun: 'Dreamy, kind, feels everything.', moon: 'Needs gentleness. Takes things to heart.', rising: 'Comes across soft and hard to pin down.', venus: 'Loves like the movies. All in.' },
}
