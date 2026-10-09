/**
 * Talk cards: core relationship questions you play with a match in chat.
 * Like a couples app's daily question, but collected from packs: both of you
 * answer, and neither answer shows until you both have.
 *
 * kinds: ask (open answer) · pick (this or that) · who (who's more likely: me or you)
 */
export type TalkTopic = 'everyday' | 'romance' | 'intimacy' | 'food' | 'family' | 'money' | 'future' | 'conflict' | 'fun'
export type TalkKind = 'ask' | 'pick' | 'who'
export type TalkRarity = 'common' | 'rare' | 'legendary'

export interface TalkCard {
  id: string
  topic: TalkTopic
  kind: TalkKind
  q: string
  /** the two choices for a pick card */
  opts?: [string, string]
  rarity: TalkRarity
  /** what a seeded match answers (ask: text · pick: 0/1 · who: 'me' | 'you' from their side) */
  sample: string
}

/** Each topic is an arcana in Align's own tarot deck. */
export const ARCANA: Record<TalkTopic, { name: string; numeral: string }> = {
  fun: { name: 'The Fool', numeral: '0' },
  food: { name: 'The Empress', numeral: 'III' },
  family: { name: 'The Hearth', numeral: 'V' },
  romance: { name: 'The Lovers', numeral: 'VI' },
  money: { name: 'Wheel of Fortune', numeral: 'X' },
  conflict: { name: 'The Tower', numeral: 'XVI' },
  future: { name: 'The Star', numeral: 'XVII' },
  intimacy: { name: 'The Moon', numeral: 'XVIII' },
  everyday: { name: 'The Sun', numeral: 'XIX' },
}

export const TOPICS: Record<TalkTopic, { label: string; glyph: string; color: string; blurb: string }> = {
  everyday: { label: 'Everyday', glyph: '☼', color: '#f2c75c', blurb: 'Habits, routines, the small stuff' },
  romance: { label: 'Romance', glyph: '♡', color: '#f08aa8', blurb: 'Dates, affection, what feels romantic' },
  intimacy: { label: 'Intimacy', glyph: '☾', color: '#c56cf0', blurb: 'Desire, closeness, what you like' },
  food: { label: 'Food', glyph: '✿', color: '#f39a3a', blurb: 'Taste, cooking, the perfect meal' },
  family: { label: 'Family & kids', glyph: '⌂', color: '#7fd8b0', blurb: 'Family, kids, how you were raised' },
  money: { label: 'Money', glyph: '◈', color: '#9fd86a', blurb: 'Spending, saving, sharing' },
  future: { label: 'Future', glyph: '✦', color: '#7fc8f0', blurb: 'Where you’re headed, together or not' },
  conflict: { label: 'Conflict', glyph: '⚡', color: '#ff7a6a', blurb: 'How you fight, and make up' },
  fun: { label: 'Just for fun', glyph: '✧', color: '#b18cff', blurb: 'Easy, silly, good for a first night' },
}

const c = (id: string, topic: TalkTopic, kind: TalkKind, q: string, sample: string, rarity: TalkRarity = 'common', opts?: [string, string]): TalkCard =>
  ({ id, topic, kind, q, sample, rarity, opts })

export const TALK_CARDS: TalkCard[] = [
  // everyday
  c('ev1', 'everyday', 'pick', 'Morning person or night owl?', '1', 'common', ['Morning', 'Night']),
  c('ev2', 'everyday', 'ask', 'What does a perfect lazy Sunday look like for you?', 'Coffee in bed, a long walk, a record store, then someone cooks for me.'),
  c('ev3', 'everyday', 'who', 'Who’s more likely to be late?', 'me'),
  c('ev4', 'everyday', 'pick', 'Made bed or unmade bed?', '0', 'common', ['Made', 'Unmade']),
  c('ev5', 'everyday', 'ask', 'What’s one habit you’d love a partner to help you keep?', 'Going to bed before 1am. I need a bedtime buddy.'),
  c('ev6', 'everyday', 'ask', 'How much alone time do you need in a week?', 'One full evening to myself. Non-negotiable, but I’ll text you.', 'rare'),
  // romance
  c('ro1', 'romance', 'ask', 'What’s the most romantic thing someone has done for you?', 'Someone made me a playlist that told a story, song by song.'),
  c('ro2', 'romance', 'pick', 'Planned date or spontaneous date?', '1', 'common', ['Planned', 'Spontaneous']),
  c('ro3', 'romance', 'ask', 'How do you most like to be shown love: words, time, touch, gifts or help?', 'Time. Put your phone away and I’m yours.'),
  c('ro4', 'romance', 'who', 'Who’s more likely to say “I love you” first?', 'you'),
  c('ro5', 'romance', 'ask', 'Describe your ideal third date.', 'Cooking together at someone’s place, badly, with good wine.'),
  c('ro6', 'romance', 'ask', 'What small, everyday thing makes you feel cared for?', 'When someone remembers a tiny detail I said weeks ago.', 'rare'),
  // intimacy
  c('in1', 'intimacy', 'ask', 'What makes you feel most desired?', 'Being looked at like there’s no one else in the room.', 'rare'),
  c('in2', 'intimacy', 'pick', 'Slow and tender, or playful and bold?', '0', 'rare', ['Tender', 'Playful']),
  c('in3', 'intimacy', 'ask', 'How important is physical affection outside the bedroom?', 'Very. Hand on my back in a crowd, that kind of thing.', 'rare'),
  c('in4', 'intimacy', 'ask', 'What’s one thing you wish partners asked you about more often?', 'What I actually like, instead of guessing.', 'legendary'),
  c('in5', 'intimacy', 'who', 'Who’s more likely to make the first move?', 'me', 'rare'),
  c('in6', 'intimacy', 'ask', 'How do you like to talk about what’s working, and what isn’t?', 'Gently, and not right after. The next morning over coffee.', 'legendary'),
  // food
  c('fo1', 'food', 'pick', 'Cook at home or try somewhere new?', '1', 'common', ['Cook in', 'Go out']),
  c('fo2', 'food', 'ask', 'What’s your comfort meal?', 'My grandma’s rice and peas. Nothing else comes close.'),
  c('fo3', 'food', 'who', 'Who’s the better cook?', 'you'),
  c('fo4', 'food', 'ask', 'A food you’ll never try again, and why?', 'Oysters. One bad night in New Orleans.'),
  c('fo5', 'food', 'pick', 'Share plates or order your own?', '0', 'common', ['Share', 'My own']),
  c('fo6', 'food', 'ask', 'What would you cook to impress someone?', 'Shakshuka. It looks hard and it isn’t.', 'rare'),
  // family & kids
  c('fa1', 'family', 'ask', 'Do you want kids someday? How sure are you?', 'Yes, two maybe. Not for a few years.', 'rare'),
  c('fa2', 'family', 'ask', 'How close are you with your family?', 'We talk every Sunday. My sister knows everything.'),
  c('fa3', 'family', 'ask', 'What did your parents get right that you’d want to repeat?', 'Dinner at the table, no phones, every night.', 'rare'),
  c('fa4', 'family', 'pick', 'Big family holidays or small and quiet?', '0', 'common', ['Big', 'Small']),
  c('fa5', 'family', 'ask', 'Pets: yes, no, or one specific animal?', 'A dog. A big, dumb, loyal one.'),
  c('fa6', 'family', 'ask', 'What’s something about how you were raised that you’re unlearning?', 'Not saying what I need because I don’t want to be a bother.', 'legendary'),
  // money
  c('mo1', 'money', 'pick', 'Saver or spender?', '1', 'common', ['Saver', 'Spender']),
  c('mo2', 'money', 'ask', 'What’s worth spending real money on?', 'Travel and good shoes. Everything else can be cheap.'),
  c('mo3', 'money', 'ask', 'How should couples split costs early on?', 'Take turns at first. Talk about it once it’s serious.', 'rare'),
  c('mo4', 'money', 'who', 'Who’s more likely to splurge on a whim?', 'me'),
  c('mo5', 'money', 'ask', 'What does financial security mean to you?', 'Six months saved and never checking my balance before dinner.', 'rare'),
  // future
  c('fu1', 'future', 'ask', 'Where do you see yourself living in five years?', 'Somewhere with a yard. Maybe still Houston, maybe not.'),
  c('fu2', 'future', 'pick', 'City or somewhere quieter?', '0', 'common', ['City', 'Quieter']),
  c('fu3', 'future', 'ask', 'What are you working toward right now?', 'Curating my own show by thirty.'),
  c('fu4', 'future', 'ask', 'What does a good relationship look like to you in ten years?', 'Still curious about each other. Still making each other laugh.', 'rare'),
  c('fu5', 'future', 'ask', 'Marriage: important, someday, or not for you?', 'Someday. The partnership matters more than the paper.', 'legendary'),
  // conflict
  c('co1', 'conflict', 'ask', 'When you’re upset, do you need space or to talk it out?', 'Space first, an hour maybe. Then I want to talk.'),
  c('co2', 'conflict', 'who', 'Who’s more likely to apologize first?', 'you'),
  c('co3', 'conflict', 'ask', 'What’s the best way to make up with you after a fight?', 'A real apology and a walk. Not flowers.', 'rare'),
  c('co4', 'conflict', 'ask', 'What’s one thing a partner should never say in an argument?', '“Calm down.” Never works, ever.'),
  c('co5', 'conflict', 'pick', 'Settle it tonight or sleep on it?', '1', 'rare', ['Tonight', 'Sleep on it']),
  // fun
  c('fn1', 'fun', 'ask', 'What’s a hill you will die on?', 'Pineapple belongs on pizza. Fight me.'),
  c('fn2', 'fun', 'who', 'Who’d survive longer in a zombie movie?', 'you'),
  c('fn3', 'fun', 'pick', 'Beach trip or mountain cabin?', '1', 'common', ['Beach', 'Cabin']),
  c('fn4', 'fun', 'ask', 'What song would play when you walk into a room?', 'Something by Sade. Obviously.'),
  c('fn5', 'fun', 'ask', 'What’s your most useless talent?', 'I can name any Pixar movie from one frame.'),
  c('fn6', 'fun', 'ask', 'Your go-to karaoke song?', 'Dreams by Fleetwood Mac. Every time.', 'rare'),
]

export const cardById = (id: string) => TALK_CARDS.find((x) => x.id === id)

export interface TalkPack {
  id: string
  name: string
  blurb: string
  /** topics this pack deals from */
  topics: TalkTopic[]
  color: string
  size: number
}

export const PACKS: Record<string, TalkPack> = {
  starter: { id: 'starter', name: 'First Nights', blurb: 'Easy openers for a brand-new match', topics: ['fun', 'everyday', 'food', 'romance'], color: '#f2c75c', size: 5 },
  deep: { id: 'deep', name: 'The Deep End', blurb: 'Family, money, the future, and how you fight', topics: ['family', 'money', 'future', 'conflict'], color: '#7fc8f0', size: 5 },
  afterdark: { id: 'afterdark', name: 'After Dark', blurb: 'Intimacy and romance, for when you’re ready', topics: ['intimacy', 'romance'], color: '#c56cf0', size: 5 },
}

/** Cards every account starts with. */
export const STARTER_HAND = ['fn1', 'ev1', 'ev2', 'fo1', 'fo2', 'ro2', 'ro3', 'co1']

/** One free card a day, the same for everyone — like a daily question. */
export function cardOfTheDay(d = new Date()) {
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000)
  return TALK_CARDS[day % TALK_CARDS.length]
}

/* ---------- playing cards in chat ----------
 * A card play and each answer are ordinary chat messages with a small prefix,
 * so they travel through any backend (and to a real person) unchanged. */
const PLAY = '⟦talk:'
const ANS = '⟦answer:'

export const playMsg = (cardId: string) => `${PLAY}${cardId}⟧`
export const answerMsg = (cardId: string, answer: string) => `${ANS}${cardId}⟧${answer}`

export function parseTalk(body: string): { type: 'play'; cardId: string } | { type: 'answer'; cardId: string; answer: string } | null {
  if (body.startsWith(PLAY)) return { type: 'play', cardId: body.slice(PLAY.length, body.indexOf('⟧')) }
  if (body.startsWith(ANS)) {
    const end = body.indexOf('⟧')
    return { type: 'answer', cardId: body.slice(ANS.length, end), answer: body.slice(end + 1) }
  }
  return null
}

/** How an answer reads for a person (pick → the option, who → a name). */
export function answerLabel(card: TalkCard, answer: string, answeredBy: 'me' | 'them', names: { me: string; them: string }) {
  if (card.kind === 'pick' && card.opts) return card.opts[Number(answer)] ?? answer
  if (card.kind === 'who') {
    // stored from the answerer's side: 'me' = themselves
    const self = answeredBy === 'me' ? names.me : names.them
    const other = answeredBy === 'me' ? names.them : names.me
    return answer === 'me' ? self : other
  }
  return answer
}
