import type { SignId } from '../../data/signs'

export interface Reply {
  name: string
  age: number
  moon: SignId
  text: string
}

export interface Post {
  id: string
  name: string
  age: number
  moon: SignId
  /** "2H", "NOW" … */
  ago: string
  /** neighbourhood, shown in the thread view */
  hood: string
  text: string
  /** longer version shown when the thread is opened */
  full?: string
  likes: number
  sparks: number
  replies: Reply[]
  mine?: boolean
  /** founders card serial — founder posts get a holo border */
  founder?: number
  /** a meme or photo attached to the post */
  image?: string
}

/** The Taurus room tonight (S-17). First three are verbatim from Figma. */
export const ROOM_POSTS: Post[] = [
  {
    id: 'mireya', founder: 7, name: 'Mireya', age: 28, moon: 'scorpio', ago: '2H', hood: 'Montrose',
    text: 'Third date at the Menil and he read every placard aloud. Reader, I stayed.',
    full: 'Third date at the Menil and he read every placard aloud. Reader, I stayed. Then he asked which room I would live in and I answered too fast.',
    likes: 41, sparks: 12,
    replies: [
      { name: 'Devon', age: 31, moon: 'cancer', text: 'Which room. I need the room. This is load bearing information.' },
      { name: 'Priya', age: 27, moon: 'sagittarius', text: 'He is testing whether you will decorate. Answer that one slowly.' },
      { name: 'Nadia', age: 24, moon: 'libra', text: 'You answered fast because you already knew.' },
    ],
  },
  {
    id: 'jules', name: 'Jules', age: 25, moon: 'gemini', ago: '3H', hood: 'Montrose',
    text: 'Me at every party, no notes',
    image: 'img/memes/taurus-cat.jpg',
    likes: 88, sparks: 14,
    replies: [
      { name: 'Devon', age: 31, moon: 'cancer', text: 'I have 400 photos of my neighbour’s cat and I regret nothing' },
      { name: 'Priya', age: 27, moon: 'sagittarius', text: 'This is a documentary' },
    ],
  },
  {
    id: 'devon', name: 'Devon', age: 31, moon: 'cancer', ago: '5H', hood: 'The Heights',
    text: 'Houston humidity ruins my hair and my composure equally. I still closed the bar.',
    likes: 18, sparks: 4,
    replies: [
      { name: 'Marcus', age: 34, moon: 'capricorn', text: 'Closing the bar is a composure of its own.' },
      { name: 'Celeste', age: 30, moon: 'pisces', text: 'The hair always comes back. The bar does not.' },
    ],
  },
  {
    id: 'priya', founder: 231, name: 'Priya', age: 27, moon: 'sagittarius', ago: '9H', hood: 'EaDo',
    text: 'They said Space City runs on ambition and queso. Correct about one of those.',
    likes: 63, sparks: 27,
    replies: [
      { name: 'Mireya', age: 28, moon: 'scorpio', text: 'Say queso. Say it with your chest.' },
      { name: 'Devon', age: 31, moon: 'cancer', text: 'Ambition is just queso you have not eaten yet.' },
    ],
  },
  {
    id: 'tasha', name: 'Tasha', age: 29, moon: 'pisces', ago: '7H', hood: 'Third Ward',
    text: 'For everyone who said “I’m fine” at brunch today',
    image: 'img/memes/taurus-fine.jpg',
    likes: 112, sparks: 21,
    replies: [
      { name: 'Marcus', age: 34, moon: 'capricorn', text: 'Not me getting called out on a Monday' },
      { name: 'Mireya', age: 28, moon: 'scorpio', text: 'I said it twice. Both lies.' },
    ],
  },
  {
    id: 'nadia', name: 'Nadia', age: 24, moon: 'libra', ago: '11H', hood: 'Rice Village',
    text: 'Bought the plant instead of texting him back. The plant is thriving. Growth.',
    likes: 29, sparks: 8,
    replies: [
      { name: 'Priya', age: 27, moon: 'sagittarius', text: 'The plant would never leave you on read.' },
    ],
  },
  {
    id: 'marcus', name: 'Marcus', age: 34, moon: 'capricorn', ago: '14H', hood: 'Midtown',
    text: 'Took myself to the steakhouse. Table for one, no notes. Best date I have had since March.',
    likes: 52, sparks: 19,
    replies: [
      { name: 'Nadia', age: 24, moon: 'libra', text: 'Earth sign self-care is just a ribeye and silence.' },
      { name: 'Celeste', age: 30, moon: 'pisces', text: 'Did you order dessert. Be honest.' },
    ],
  },
  {
    id: 'celeste', founder: 458, name: 'Celeste', age: 30, moon: 'pisces', ago: '1D', hood: 'Bellaire',
    text: 'Mercury took my keys, my patience for brunch lines, and somehow my ex’s new number. Keeping that last one.',
    likes: 37, sparks: 11,
    replies: [
      { name: 'Marcus', age: 34, moon: 'capricorn', text: 'Delete it before direct station. Trust the bull.' },
    ],
  },
]

export const ROOM_COUNT = 1204
export const SAID_TONIGHT = 41
export const TONIGHT_PROMPT = 'Mercury goes direct tomorrow. Opinions?'
