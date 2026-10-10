import type { SignId } from './signs'
import type { Rarity } from './seasons'

/**
 * The twelve signs as character cards. These are what we print: physical
 * packs never carry a real person's card, so the signs stand in for people.
 * First set: "Myths". A pack of one sign is all that sign, like a blind box.
 */
export interface Archetype {
  sign: SignId
  title: string
  /** how this sign loves, in one line */
  loves: string
}

export const ARCHETYPES: Record<SignId, Archetype> = {
  aries: { sign: 'aries', title: 'The Warrior', loves: 'Loves first and loudest. Will plan the date and the second one.' },
  taurus: { sign: 'taurus', title: 'The Keeper', loves: 'Loves slowly, then for good. Shows it with dinner.' },
  gemini: { sign: 'gemini', title: 'The Messenger', loves: 'Loves through talking. The best texter you will ever date.' },
  cancer: { sign: 'cancer', title: 'The Guardian', loves: 'Loves like home. Remembers every detail you mention.' },
  leo: { sign: 'leo', title: 'The Sovereign', loves: 'Loves out loud. Will make your birthday a national holiday.' },
  virgo: { sign: 'virgo', title: 'The Healer', loves: 'Loves by fixing things. Your car, your schedule, your day.' },
  libra: { sign: 'libra', title: 'The Diplomat', loves: 'Loves in balance. Makes the date beautiful and the decision hard.' },
  scorpio: { sign: 'scorpio', title: 'The Alchemist', loves: 'Loves all in or not at all. Keeps every secret.' },
  sagittarius: { sign: 'sagittarius', title: 'The Explorer', loves: 'Loves on the move. Books the trip, then asks you along.' },
  capricorn: { sign: 'capricorn', title: 'The Architect', loves: 'Loves with a plan. Means it when they say it.' },
  aquarius: { sign: 'aquarius', title: 'The Visionary', loves: 'Loves as a best friend first. Never boring.' },
  pisces: { sign: 'pisces', title: 'The Dreamer', loves: 'Loves with everything. Romantic without trying.' },
}

/** each sign comes in three printings */
export type Variant = 'base' | 'gilded' | 'mythic'
export const VARIANT_RARITY: Record<Variant, Rarity> = { base: 'common', gilded: 'rare', mythic: 'legendary' }
export const VARIANT_LABEL: Record<Variant, string> = { base: 'Myths', gilded: 'Gilded', mythic: 'Mythic' }

export const SIGN_ORDER: SignId[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

/**
 * Each sign is four different cards, one for each part of a chart that
 * matters in love: who they are (Sun), what they need (Moon), how they come
 * across (Rising) and how they love (Venus). 12 signs × 4 faces = 48 cards,
 * each printed in three finishes.
 */
export type Face = 'sun' | 'moon' | 'rising' | 'venus'
export const FACES: Face[] = ['sun', 'moon', 'rising', 'venus']
export const FACE_LABEL: Record<Face, string> = { sun: 'Sun', moon: 'Moon', rising: 'Rising', venus: 'Venus' }
export const FACE_GLYPH: Record<Face, string> = { sun: '☉', moon: '☽', rising: '↑', venus: '♀' }
/** how common each face is in packs: the Sun is everywhere, Venus is the find */
export const FACE_WEIGHT: Record<Face, number> = { sun: 4, moon: 3, rising: 3, venus: 2 }

/** titles for the moon, rising and venus faces (the sun face is ARCHETYPES[sign].title) */
export const FACE_TITLES: Record<SignId, Record<Exclude<Face, 'sun'>, string>> = {
  aries: { moon: 'The Spark', rising: 'The Challenger', venus: 'The Chaser' },
  taurus: { moon: 'The Hearth', rising: 'The Calm', venus: 'The Devoted' },
  gemini: { moon: 'The Restless', rising: 'The Charmer', venus: 'The Flirt' },
  cancer: { moon: 'The Tide', rising: 'The Shell', venus: 'The Nurturer' },
  leo: { moon: 'The Heart', rising: 'The Spotlight', venus: 'The Grand Gesture' },
  virgo: { moon: 'The Quiet', rising: 'The Polished', venus: 'The Attentive' },
  libra: { moon: 'The Peacemaker', rising: 'The Muse', venus: 'The Romantic' },
  scorpio: { moon: 'The Depths', rising: 'The Enigma', venus: 'The Magnet' },
  sagittarius: { moon: 'The Wanderer', rising: 'The Optimist', venus: 'The Free Spirit' },
  capricorn: { moon: 'The Stoic', rising: 'The Elder', venus: 'The Loyal' },
  aquarius: { moon: 'The Detached', rising: 'The Original', venus: 'The Friend First' },
  pisces: { moon: 'The Tender', rising: 'The Mirage', venus: 'The Soulmate' },
}

export const faceTitle = (sign: SignId, face: Face) => (face === 'sun' ? ARCHETYPES[sign].title : FACE_TITLES[sign][face])
