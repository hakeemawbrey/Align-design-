// Align Mashup — what each video says and which pictures it uses.
// Copy and colours mirror the app: src/data/signs.ts, src/components/onboarding/{zodiac,readings}.ts.
// If you change a sign there, change it here too.

export const ZODIAC = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

const S = (name, glyph, element, aura, color, light, dark, modality, beast, dates) =>
  ({ name, glyph, element, aura, color, light, dark, modality, beast, dates })

export const SIGNS = {
  aries: S('Aries', '♈', 'fire', 'Ember', '#f0603a', '#ffb39a', '#5a1c10', 'Cardinal fire', 'The Ram', 'Mar 21 – Apr 19'),
  taurus: S('Taurus', '♉', 'earth', 'Honey', '#e9b24a', '#ffe1a0', '#4e3510', 'Fixed earth', 'The Bull', 'Apr 20 – May 20'),
  gemini: S('Gemini', '♊', 'air', 'Signal', '#f2cf4a', '#fff0a8', '#4f4210', 'Mutable air', 'The Twins', 'May 21 – Jun 20'),
  cancer: S('Cancer', '♋', 'water', 'Tide', '#3fb6f0', '#a8e4ff', '#0f3550', 'Cardinal water', 'The Crab', 'Jun 21 – Jul 22'),
  leo: S('Leo', '♌', 'fire', 'Goldleaf', '#f39a3a', '#ffd09a', '#55300f', 'Fixed fire', 'The Lion', 'Jul 23 – Aug 22'),
  virgo: S('Virgo', '♍', 'earth', 'Rose Quartz', '#ef5c94', '#ffb6d2', '#561a33', 'Mutable earth', 'The Maiden', 'Aug 23 – Sep 22'),
  libra: S('Libra', '♎', 'air', 'Orchid', '#e163d6', '#ffbdf6', '#4d1a49', 'Cardinal air', 'The Scales', 'Sep 23 – Oct 22'),
  scorpio: S('Scorpio', '♏', 'water', 'Garnet', '#e23d66', '#ff9fb7', '#55102a', 'Fixed water', 'The Scorpion', 'Oct 23 – Nov 21'),
  sagittarius: S('Sagittarius', '♐', 'fire', 'Amethyst', '#a35cf0', '#dcbcff', '#36165a', 'Mutable fire', 'The Archer', 'Nov 22 – Dec 21'),
  capricorn: S('Capricorn', '♑', 'earth', 'Jade', '#2fc79a', '#a6f0d6', '#0e4636', 'Cardinal earth', 'The Sea-Goat', 'Dec 22 – Jan 19'),
  aquarius: S('Aquarius', '♒', 'air', 'Ion', '#38c4ec', '#b2ecff', '#0e3d4e', 'Fixed air', 'The Water-Bearer', 'Jan 20 – Feb 18'),
  pisces: S('Pisces', '♓', 'water', 'Dusk', '#7c74f0', '#c6c1ff', '#25205a', 'Mutable water', 'The Fish', 'Feb 19 – Mar 20'),
}

/** "The user manual" — O-06b */
export const MANUAL = {
  aries: ['First through the door.', 'Makes the plan happen.', 'Says the thing out loud.', 'Mistakes a pause for a no.', 'Wins the argument, loses the evening.', 'It is not a race if they are on your side.'],
  taurus: ['Steady to the bone.', 'Builds a home anywhere.', 'Still knows how you take your coffee.', 'Digs in and calls it patience.', 'Keeps the wrong thing rather than risk the right one.', 'Nothing held that tightly is still a choice.'],
  gemini: ['Never a dull dinner.', 'Remembers the joke from the first date.', 'Curious about you.', 'Leaves before it gets quiet.', 'Answers a feeling with a fact.', 'Stay in the boring part. That is where trust starts.'],
  cancer: ['Feeds people.', 'Notices the mood before it is said.', 'Loyal past the point of reason.', 'Hears criticism in a weather report.', 'Retreats instead of asking.', 'Hints are not a plan.'],
  leo: ['Generous with time, money and compliments.', 'Makes Tuesday feel like an occasion.', 'Needs the applause to know it went well.', 'Takes silence personally.', 'Not every good thing has an audience.', 'Learning to be loved quietly.'],
  virgo: ['Shows love by fixing things.', 'Remembers the details.', 'Shows up early.', 'Edits people.', 'Reads a typo as a character flaw.', 'Nobody wants to be your project.'],
  libra: ['Makes everyone feel like the favourite.', 'Great taste. Better company.', 'Agrees to keep the peace…', '…then resents the peace.', 'Pick the restaurant.', 'Having a preference is not starting a fight.'],
  scorpio: ['All in or not at all.', 'Keeps every secret.', 'Sees through anyone.', 'Tests people who never signed up for the exam.', 'Some people only show up when they are let in.', 'Trusting before it is proven.'],
  sagittarius: ['Makes any plan an adventure.', 'Honest to a fault.', 'Laughs easily.', 'Treats commitment like a cage.', 'Books the trip, forgets the person.', 'The view is better with someone who knows you.'],
  capricorn: ['Means it when they say it.', 'Plans five years out.', 'Shows up in a crisis.', 'Schedules feelings for later.', 'Later rarely comes.', 'You are allowed to be wanted, not just needed.'],
  aquarius: ['Unbothered by what people think.', 'Loyal friend first.', 'Never boring.', 'Goes cold when it gets close.', 'Explains instead of feeling.', 'Distance is not the same as calm.'],
  pisces: ['Feels everything with you.', 'Romantic without trying.', 'Forgives fast.', 'Falls for who someone could be.', 'Disappears instead of saying no.', 'Potential does not text back.'],
}

export const ELEMENTS = {
  fire: { name: 'Fire', color: '#f0603a', light: '#ffc2a0', dark: '#3a0e06', essence: ['Fire is appetite.', 'It moves toward what feels alive', '— and moves on when it stops.'] },
  earth: { name: 'Earth', color: '#7cd84a', light: '#e4ffb8', dark: '#173a0a', essence: ['Earth is possession.', 'It moves toward what it can keep', '— and then it keeps it.'] },
  air: { name: 'Air', color: '#7fc8f0', light: '#e2f5ff', dark: '#10304a', essence: ['Air is attention.', 'It moves toward what is interesting', '— and stays while it still is.'] },
  water: { name: 'Water', color: '#3f7cf0', light: '#b8d4ff', dark: '#0a1640', essence: ['Water is feeling.', 'It moves toward what feels safe', '— and floods what does not.'] },
}

/** O-09 element weather: what happens when two elements date */
export const WEATHER = [
  ['fire', 'air', 'Bellows. They feed you oxygen and ideas.'],
  ['earth', 'water', 'Rain on a field. Slowly, then all at once.'],
  ['fire', 'water', 'Steam. Hot, loud, and nobody can see.'],
  ['air', 'earth', 'Weathervane on a farmhouse. One spins; one stays.'],
  ['fire', 'fire', 'Wildfire. Brilliant for a week, then smoke.'],
  ['water', 'water', 'Tide pool. Deep, private, hard to leave.'],
  ['air', 'water', 'Fog. Beautiful, and you both get lost.'],
  ['earth', 'fire', 'Hearth. They give you somewhere to burn.'],
  ['air', 'air', 'Two radios. Great signal, nobody sleeps.'],
  ['earth', 'earth', 'Two gardens, one fence. Nobody hurries.'],
]

export const DEALBREAKERS = ['One-word texts', 'Flaky plans', 'Hates my group chats', 'No follow-up questions', 'Sore losers', '“Calm down”', 'Refusing to talk it out', 'Reads, no reply']

/** One line per video for the "flash" style: it sits on screen for the whole reel. */
export const QUOTES = {
  aries: 'It is not a race if they are on your side.',
  taurus: 'You do not fall in love. You settle into it.',
  gemini: 'Stay in the boring part. That is where people decide to trust you.',
  cancer: 'Say what you need before you need it. Hints are not a plan.',
  leo: 'Not every good thing has an audience.',
  virgo: 'Let a good thing be unfinished. Nobody wants to be your project.',
  libra: 'Having a preference is not starting a fight.',
  scorpio: 'Some people only show up when they are let in.',
  sagittarius: 'The view is better with someone who knows you.',
  capricorn: 'You are allowed to be wanted, not just needed.',
  aquarius: 'Distance is not the same as calm.',
  pisces: 'Potential does not text back.',
  zodiac: 'Twelve signs. One of them has been looking for you.',
  auras: 'Every sign has a colour. Yours walks in before you do.',
  elements: 'Fire wants. Earth keeps. Air wonders. Water feels.',
  fire: 'Fire moves toward what feels alive, and moves on when it stops.',
  earth: 'Earth moves toward what it can keep, and then it keeps it.',
  air: 'Air moves toward what is interesting, and stays while it still is.',
  water: 'Water moves toward what feels safe, and floods what does not.',
  'big-three': 'Your sun is who you are on purpose. Your moon is who you are at 2am.',
  weather: 'Earth and water: rain on a field. Slowly, then all at once.',
  dealbreakers: 'Say your dealbreakers before the first date, not after the third.',
}

/** profile photos in the app, by sun sign (src/data/profiles.ts) */
const PEOPLE = {
  taurus: ['img/hakeem.jpg'], virgo: ['img/people/p3.jpg'], leo: ['img/people/p9.jpg'], libra: ['img/juniper.jpg'],
  aquarius: ['img/people/p6.jpg'], pisces: ['img/people/p7.jpg'], capricorn: ['img/people/p2.jpg'],
  gemini: ['img/people/p1.jpg'], sagittarius: ['img/people/p8.jpg'],
}
const MEMES = { taurus: ['img/memes/taurus-cat.jpg', 'img/memes/taurus-fine.jpg'] }

const aura = (id) => `img/aura/${id}.jpg`
const figure = (id) => `img/figure/${id}.jpg`

/**
 * Pictures for a video: the ones dropped into mashup/media/<folder>/ come first,
 * then the app's own art. Shots with no picture become a generated glyph card.
 */
function pool(userImgs, builtIn) {
  const out = [...(userImgs || []), ...builtIn]
  return out.length ? out : [null]
}
const pick = (arr, i) => arr[i % arr.length]

// ---------------------------------------------------------------- videos

export const THEMES = {
  zodiac: { title: 'The Twelve', eyebrow: 'Align · the zodiac', sub: 'Which one are you?' },
  auras: { title: 'The Twelve Auras', eyebrow: 'Align · aura kit', sub: 'Every sign has a colour' },
  elements: { title: 'The Elements', eyebrow: 'Align · element weather', sub: 'Fire · Earth · Air · Water' },
  fire: { title: 'Fire Signs', eyebrow: 'Aries · Leo · Sagittarius', sub: 'Fire is appetite.' },
  earth: { title: 'Earth Signs', eyebrow: 'Taurus · Virgo · Capricorn', sub: 'Earth is possession.' },
  air: { title: 'Air Signs', eyebrow: 'Gemini · Libra · Aquarius', sub: 'Air is attention.' },
  water: { title: 'Water Signs', eyebrow: 'Cancer · Scorpio · Pisces', sub: 'Water is feeling.' },
  'big-three': { title: 'Your Big Three', eyebrow: 'Align · sun · moon · rising', sub: 'You are more than your sun sign' },
  weather: { title: 'Element Weather', eyebrow: 'Align · compatibility', sub: 'What happens when you date your element' },
  dealbreakers: { title: 'Dealbreakers', eyebrow: 'Align · put them on your card', sub: 'Say it before the first date' },
}

export const ALL_VIDEOS = [...ZODIAC, ...Object.keys(THEMES)]

const OUTROS = [
  'Find who you align with.',
  'Dealt by the stars. Chosen by you.',
  'Your sky is waiting.',
]

/**
 * Build the spec the engine plays.
 * id: a sign ('taurus') or a theme ('zodiac', 'fire', 'big-three' …)
 * media: { [folder]: [urls] } from mashup/media
 */
export function buildSpec(id, media = {}) {
  let spec
  if (SIGNS[id]) spec = signSpec(id, media)
  else if (THEMES[id]) spec = themeSpec(id, media)
  else throw new Error(`Unknown video "${id}". Try one of: ${ALL_VIDEOS.join(', ')}`)
  spec.quote = QUOTES[id]
  spec.pool = flashPool(id, media)
  return spec
}

/** Pictures the flash style flickers through: yours first, then related app art. */
function flashPool(id, media) {
  const user = media[id] || []
  let related
  if (SIGNS[id]) {
    const kin = ZODIAC.filter((z) => SIGNS[z].element === SIGNS[id].element)
    // memes stay out: they carry another account's handle
    related = [figure(id), aura(id), ...kin.filter((z) => z !== id).flatMap((z) => [figure(z), aura(z)])]
  } else if (ELEMENTS[id]) {
    related = ZODIAC.filter((z) => SIGNS[z].element === id).flatMap((z) => [figure(z), aura(z)])
  } else {
    related = ZODIAC.flatMap((z) => [figure(z), aura(z)])
  }
  return [...new Set([...user, ...related])]
}

function signSpec(id, media) {
  const s = SIGNS[id]
  const imgs = pool(media[id], [figure(id), aura(id), ...(MEMES[id] || [])])
  const lines = MANUAL[id]
  const shots = [
    { src: imgs[0], kicker: s.beast, caption: s.name, big: true },
    ...lines.map((caption, i) => ({
      src: i === 2 || i === 5 ? null : pick(imgs, i + 1),
      kicker: i < 3 ? 'Strengths' : i < 5 ? 'Weaknesses' : 'Work on',
      caption,
    })),
    { src: aura(id), kicker: `${s.aura} aura`, caption: s.dates },
  ]
  return {
    id,
    title: s.name,
    glyph: s.glyph,
    eyebrow: `${s.modality} · ${s.beast}`,
    sub: s.dates,
    color: s.color, light: s.light, dark: s.dark,
    titleImg: aura(id),
    shots: shots.map((sh) => ({ color: s.color, light: s.light, dark: s.dark, glyph: s.glyph, ...sh })),
    // profile photos only in the collage, never next to a "weaknesses" line
    collage: [...new Set([...imgs.filter(Boolean), aura(id), figure(id), ...(PEOPLE[id] || [])])],
    outro: OUTROS[ZODIAC.indexOf(id) % OUTROS.length],
  }
}

function signShot(id, media, extra = {}) {
  const s = SIGNS[id]
  const own = media[id] || []
  return { src: own[0] || figure(id), color: s.color, light: s.light, dark: s.dark, glyph: s.glyph, kicker: s.beast, caption: s.name, ...extra }
}

function themeSpec(id, media) {
  const t = THEMES[id]
  const user = media[id] || []
  let shots
  let color = '#f2c75c', light = '#fff4cf', dark = '#3a2c10', glyph = '✦'
  let collage

  if (id === 'zodiac') {
    shots = ZODIAC.map((z) => signShot(z, media, { caption: SIGNS[z].name, kicker: SIGNS[z].dates }))
    collage = ZODIAC.map(figure)
  } else if (id === 'auras') {
    shots = ZODIAC.map((z) => signShot(z, media, { src: aura(z), kicker: SIGNS[z].name, caption: `${SIGNS[z].aura}` }))
    collage = ZODIAC.map(aura)
  } else if (ELEMENTS[id]) {
    const e = ELEMENTS[id]
    ;({ color, light, dark } = e)
    glyph = SIGNS[ZODIAC.find((z) => SIGNS[z].element === id)].glyph
    const signs = ZODIAC.filter((z) => SIGNS[z].element === id)
    shots = []
    signs.forEach((z, i) => {
      shots.push(signShot(z, media, { kicker: SIGNS[z].modality, caption: SIGNS[z].name }))
      shots.push(signShot(z, media, { src: pick(user.length ? user : [null], i), kicker: SIGNS[z].name, caption: MANUAL[z][0] }))
    })
    e.essence.forEach((line, i) => shots.push({ src: i === 1 ? aura(signs[0]) : user[i] || null, color, light, dark, glyph, kicker: e.name, caption: line }))
    collage = [...user, ...signs.flatMap((z) => [figure(z), aura(z)])]
  } else if (id === 'elements') {
    shots = Object.entries(ELEMENTS).flatMap(([el, e]) => {
      const signs = ZODIAC.filter((z) => SIGNS[z].element === el)
      return [
        { src: (media[el] || [])[0] || figure(signs[1]), color: e.color, light: e.light, dark: e.dark, glyph: SIGNS[signs[0]].glyph, kicker: signs.map((z) => SIGNS[z].name).join(' · '), caption: e.name, big: true },
        { src: aura(signs[0]), color: e.color, light: e.light, dark: e.dark, glyph: SIGNS[signs[0]].glyph, kicker: e.name, caption: e.essence[0] },
      ]
    })
    collage = ZODIAC.map(figure)
  } else if (id === 'big-three') {
    const lines = [
      ['Sun', 'Who you are on purpose.', 'leo'],
      ['Moon', 'Who you are at 2am.', 'cancer'],
      ['Rising', 'Who they meet first.', 'libra'],
      ['Sun', 'Taurus sun:', 'taurus'],
      ['Moon', 'Sagittarius moon:', 'sagittarius'],
      ['Rising', 'You want a home and a horizon.', 'libra'],
    ]
    shots = lines.map(([kicker, caption, z], i) => signShot(z, media, { src: user[i] || (i % 2 ? aura(z) : figure(z)), kicker, caption }))
    collage = [...user, ...ZODIAC.map(aura)]
  } else if (id === 'weather') {
    color = '#7fd8b0'; light = '#d8fff0'; dark = '#0f3a2a'
    shots = WEATHER.map(([a, b, line], i) => {
      const el = i % 2 ? b : a
      const e = ELEMENTS[el]
      const z = ZODIAC.filter((k) => SIGNS[k].element === el)[Math.floor(i / 2) % 3]
      return { src: user[i] || (i % 2 ? aura(z) : figure(z)), color: e.color, light: e.light, dark: e.dark, glyph: SIGNS[z].glyph, kicker: `${ELEMENTS[a].name} + ${ELEMENTS[b].name}`, caption: line }
    })
    collage = [...user, ...ZODIAC.map(aura)]
  } else if (id === 'dealbreakers') {
    color = '#e8628a'; light = '#ffc0d2'; dark = '#4a1024'
    const z = ['scorpio', 'virgo', 'leo', 'capricorn', 'gemini', 'aries', 'cancer', 'aquarius']
    shots = DEALBREAKERS.map((caption, i) => signShot(z[i], media, { src: user[i] || (i % 3 === 2 ? null : i % 2 ? aura(z[i]) : figure(z[i])), kicker: `Dealbreaker № ${i + 1}`, caption }))
    collage = [...user, ...z.map(aura)]
  }

  return {
    id, title: t.title, glyph, eyebrow: t.eyebrow, sub: t.sub, color, light, dark,
    titleImg: user[0] || null,
    shots,
    collage: [...new Set(collage.filter(Boolean))],
    outro: OUTROS[0],
  }
}
