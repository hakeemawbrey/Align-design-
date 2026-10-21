import { ME, type Profile } from '../../data/profiles'
import { PERSONA } from '../../data/persona'

/** your card copy (G-05b), from whichever founder is playing — the defaults the Edit card pages (G-27 / G-28) start from */
export const MY_CARD = PERSONA.card

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
      { kind: 'pull', text: PERSONA.reading.pull, strength: 3 },
      { kind: 'push', text: PERSONA.reading.push, strength: 2 },
      { kind: 'align', text: PERSONA.reading.align, strength: 3 },
    ],
  }
}
