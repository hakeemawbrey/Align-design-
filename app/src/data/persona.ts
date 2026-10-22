import type { SignId } from './signs'
import type { Birth } from '../lib/astro'

/**
 * Who is holding the phone. The demo can be played as either founder; each has
 * their own card, birth chart and photo, and the app reads everything about
 * "you" from here. Chosen on Welcome (or the You tab) and kept on this device.
 */
export type PersonaId = 'hakeem' | 'xavier' | 'jeremy' | 'samid'

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
    // Jan 17 2000, 11 PM, Houston (CST): Capricorn Sun, Gemini Moon, Libra rising, Venus in Sagittarius
    id: 'xavier', name: 'Xavier', age: 26, sign: 'capricorn', moon: 'gemini', rising: 'libra', venus: 'sagittarius',
    pronoun: { subj: 'he', obj: 'him', poss: 'his' },
    serial: '№ 024', photo: 'img/xavier.jpg',
    blurb: 'Builds things at 2am. Fixes your playlist. Notices everything.',
    birth: { year: 2000, month: 1, day: 17, hour: 23, minute: 0, utcOffset: -6, lat: 29.76, lon: -95.37, city: 'Houston' },
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
  jeremy: {
    // June 23 2002, 7:30 AM (born 7–8 AM), Houston (CDT): Cancer Sun, Sagittarius Moon, Cancer rising, Venus in Leo
    id: 'jeremy', name: 'Jeremy', age: 24, sign: 'cancer', moon: 'sagittarius', rising: 'cancer', venus: 'leo',
    pronoun: { subj: 'he', obj: 'him', poss: 'his' },
    serial: '№ 048', photo: 'img/jeremy.jpg',
    blurb: 'Hosts every dinner. Remembers every birthday. Always has a plan B.',
    birth: { year: 2002, month: 6, day: 23, hour: 7, minute: 30, utcOffset: -5, lat: 29.76, lon: -95.37, city: 'Houston' },
    card: {
      bio: 'Soft on the inside, loud at karaoke. I’ll cook, you pick the movie, and we argue about it after.',
      facts: [['Religion', 'Spiritual'], ['Looking for', 'Something that lasts'], ['Height', '5′10″'], ['Work', 'Co-founder, Align']],
      interests: ['Cooking', 'Karaoke', 'Road trips', 'Basketball', 'Old R&B'],
      dealbreakers: 'Cold shoulders. Cancelling last minute. Not texting back after a date.',
    },
    reading: {
      pull: 'Warm and protective. Makes you feel at home fast.',
      push: 'Feels things big. Don’t brush it off when he tells you.',
      align: 'Loyal to the bone. In it for the long run.',
    },
  },
  samid: {
    // Nov 13 2000, 4:35 PM, Houston (CST): Scorpio Sun, Gemini Moon, Taurus rising, Venus in Capricorn
    id: 'samid', name: 'Samid', age: 25, sign: 'scorpio', moon: 'gemini', rising: 'taurus', venus: 'capricorn',
    pronoun: { subj: 'he', obj: 'him', poss: 'his' },
    serial: '№ 113', photo: 'img/samid.jpg',
    blurb: 'Laughs with his whole face. Owns too many bandanas. Will talk to anyone.',
    birth: { year: 2000, month: 11, day: 13, hour: 16, minute: 35, utcOffset: -6, lat: 29.76, lon: -95.37, city: 'Houston' },
    card: {
      bio: 'Easy to talk to, hard to read. I’ll ask you one more question than you expect and remember the answer.',
      facts: [['Religion', 'Spiritual, curious'], ['Looking for', 'Something real, no rush'], ['Height', '5′9″'], ['Work', 'Creative, always making something']],
      interests: ['Live music', 'Thrifting', 'Street food', 'Photo booths', 'Deep talks at 2am'],
      dealbreakers: 'Fake energy. Small talk forever. Not laughing at my jokes.',
    },
    reading: {
      pull: 'Warm, funny and actually listens. You’ll feel known fast.',
      push: 'Feels more than he shows. Earn the trust and you get all of it.',
      align: 'All in or not at all. Once he picks you, he stays.',
    },
  },
}

const KEY = 'align:persona'

function read(): PersonaId {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'xavier' || v === 'hakeem' || v === 'jeremy' || v === 'samid' ? v : 'hakeem'
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
