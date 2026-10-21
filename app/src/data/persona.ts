import type { SignId } from './signs'
import type { Birth } from '../lib/astro'

/**
 * Who is holding the phone. The demo can be played as either founder; each has
 * their own card, birth chart and photo, and the app reads everything about
 * "you" from here. Chosen on Welcome (or the You tab) and kept on this device.
 */
export type PersonaId = 'hakeem' | 'xavier'

export interface Persona {
  id: PersonaId
  name: string
  age: number
  sign: SignId
  moon: SignId
  rising: SignId
  venus: SignId
  pronoun: { subj: 'he' | 'she' | 'they'; obj: 'him' | 'her' | 'them'; poss: 'his' | 'her' | 'their' }
  serial: string
  /** shown on the flipped side of your card and on copies you trade */
  photo: string
  blurb: string
  birth: Birth
  card: {
    bio: string
    facts: readonly (readonly [string, string])[]
    interests: string[]
    dealbreakers: string
  }
  /** how other people read your card (push / pull / align) */
  reading: { pull: string; push: string; align: string }
}

export const PERSONAS: Record<PersonaId, Persona> = {
  hakeem: {
    id: 'hakeem', name: 'Hakeem', age: 28, sign: 'taurus', moon: 'sagittarius', rising: 'libra', venus: 'aries',
    pronoun: { subj: 'he', obj: 'him', poss: 'his' },
    serial: '№ 012', photo: 'img/hakeem.jpg',
    blurb: 'Sound engineer. Record stores on Sundays. Cooks too much.',
    // May 12 1998, 5 PM, Tulsa (CDT)
    birth: { year: 1998, month: 5, day: 12, hour: 17, minute: 0, utcOffset: -5, lat: 36.154, lon: -95.993, city: 'Tulsa' },
    card: {
      bio: 'Slow to warm, impossible to shake. I cook for people I like and say less than I mean.',
      facts: [['Religion', 'Spiritual, not religious'], ['Looking for', 'Long term, open to slow'], ['Height', '5′8″'], ['Work', 'Sound engineer']],
      interests: ['Record stores', 'Night drives', 'Tarot', 'Thrifting', 'Late diners'],
      dealbreakers: 'No ghosting. Answer the question you were asked.',
    },
    reading: {
      pull: 'Remembers your order. Plans the second date during the first.',
      push: 'Slow to say how he feels. Ask him directly.',
      align: 'Loyal and steady. Wants something that lasts.',
    },
  },
  xavier: {
    // Sept 14 2002, 11:05 AM, Houston (CDT): Virgo Sun, Capricorn Moon, Scorpio rising, Venus in Scorpio
    id: 'xavier', name: 'Xavier', age: 24, sign: 'virgo', moon: 'capricorn', rising: 'scorpio', venus: 'scorpio',
    pronoun: { subj: 'he', obj: 'him', poss: 'his' },
    serial: '№ 024', photo: 'img/xavier.jpg',
    blurb: 'Builds things at 2am. Fixes your playlist. Notices everything.',
    birth: { year: 2002, month: 9, day: 14, hour: 11, minute: 5, utcOffset: -5, lat: 29.76, lon: -95.37, city: 'Houston' },
    card: {
      bio: 'Quiet until I’m not. I’ll remember the thing you mentioned once and bring it up three weeks later.',
      facts: [['Religion', 'Open, still figuring it out'], ['Looking for', 'Something real'], ['Height', '5′9″'], ['Work', 'Co-founder, Align']],
      interests: ['Film cameras', 'Late-night tacos', 'Design', 'Long walks', 'Sci-fi'],
      dealbreakers: 'Flaky plans. Rudeness to waiters. Never asking a question back.',
    },
    reading: {
      pull: 'Notices the small things and remembers every one.',
      push: 'Reads into everything. Say what you mean, plainly.',
      align: 'Thoughtful and patient. Builds slowly, then all in.',
    },
  },
}

const KEY = 'align:persona'

function read(): PersonaId {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'xavier' || v === 'hakeem' ? v : 'hakeem'
  } catch {
    return 'hakeem'
  }
}

/** the persona this session is playing as */
export const PERSONA: Persona = PERSONAS[read()]

/**
 * Play the demo as someone else: their progress starts fresh, so everything
 * saved on this device for the demo is cleared before the reload.
 */
export function switchPersona(id: PersonaId, to = 'dealing') {
  try {
    for (const k of Object.keys(localStorage)) if (k.startsWith('align:') && k !== KEY) localStorage.removeItem(k)
    localStorage.setItem(KEY, id)
  } catch { /* storage unavailable: the reload falls back to Hakeem */ }
  window.location.hash = to
  window.location.reload()
}
