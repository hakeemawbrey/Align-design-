import { ME, type Profile } from '../../data/profiles'

/** Hakeem's card copy (G-05b) — the defaults the Edit card pages (G-27 / G-28) start from. */
export const MY_CARD = {
  bio: 'Slow to warm, impossible to shake. I cook for people I like and say less than I mean.',
  facts: [
    ['Religion', 'Spiritual, not religious'],
    ['Looking for', 'Long term, open to slow'],
    ['Height', '5′8″'],
    ['Work', 'Sound engineer'],
  ] as const,
  interests: ['Record stores', 'Night drives', 'Tarot', 'Thrifting', 'Late diners'],
  dealbreakers: 'No ghosting. Answer the question you were asked.',
}

export interface CardEdits {
  bio: string
  dealbreakers: string
  facts: [string, string][]
  interests: string[]
}

/** your card as a Profile, so it renders with the exact cards everyone else sees */
export function myProfile(edits?: CardEdits): Profile {
  const c = edits ?? { ...MY_CARD, facts: MY_CARD.facts.map(([k, v]) => [k, v] as [string, string]) }
  const fact = (k: string, i: number) => c.facts.find(([key]) => key === k)?.[1] ?? MY_CARD.facts[i][1]
  return {
    id: 'me', initial: ME.name, name: ME.name, age: ME.age, sign: ME.sign, moon: ME.moon, rising: ME.rising,
    serial: ME.serial.replace('№ ', ''), pull: 'Steady pull', photo: ME.photo, alignsBack: false, blurb: ME.blurb,
    dealbreakers: c.dealbreakers, bio: c.bio,
    religion: fact('Religion', 0), lookingFor: fact('Looking for', 1), height: fact('Height', 2), work: fact('Work', 3),
    interests: [...c.interests],
    reading: [
      { kind: 'pull', text: 'Remembers your order. Plans the second date during the first.', strength: 3 },
      { kind: 'push', text: 'Slow to say how he feels. Ask him directly.', strength: 2 },
      { kind: 'align', text: 'Loyal and steady. Wants something that lasts.', strength: 3 },
    ],
  }
}
