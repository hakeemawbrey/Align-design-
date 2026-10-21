import { SIGNS, type SignId } from '../../data/signs'
import { ME } from '../../data/profiles'

/**
 * All words for the legal, about and safety pages.
 * Demo copy: plain summaries in the app's voice, not a real contract.
 */

export const UPDATED = 'Updated September 2026'

export interface Clause {
  label: string
  text: string
}

export interface LegalDoc {
  bar: string
  title: [string, string]
  /** numbered labels (01 · NO HARASSMENT) */
  numbered?: boolean
  clauses: Clause[]
  next?: { label: string; page: string }
}

export const DOCS: Record<'terms' | 'privacy' | 'guidelines', LegalDoc> = {
  terms: {
    bar: 'Terms of Service',
    title: ['The short version,', 'then the long one.'],
    clauses: [
      { label: 'You must be 18', text: 'Align is an adult dating product. Lying about your age ends the account and we keep the record.' },
      { label: 'Your chart is yours', text: 'You own what you write and the photos you upload. You give us permission to show them inside Align, nowhere else.' },
      { label: 'Astrology is not advice', text: 'Readings, alignment reads and aura colours are entertainment. They are not medical, legal or financial guidance.' },
      { label: 'We can close accounts', text: 'Harassment, impersonation, or sign fraud gets removed without refund.' },
    ],
    next: { label: 'Next: Privacy', page: 'privacy' },
  },
  privacy: {
    bar: 'Privacy',
    title: ['What the stars', 'know about you.'],
    clauses: [
      { label: 'Birth data', text: 'Date, time and city. We compute your chart once and store the result. This is the most sensitive thing we hold and it is never shown to another user in raw form.' },
      { label: 'Location', text: 'Coarse city level only, used for distance and your club. We do not keep a location history.' },
      { label: 'We do not sell', text: 'Not your chart, not your photos, not your messages. No advertising network gets any of it.' },
      { label: 'How long', text: 'Delete your account and everything goes within 30 days, except what we must keep for safety reports.' },
    ],
    next: { label: 'Next: Community guidelines', page: 'guidelines' },
  },
  guidelines: {
    bar: 'Community Guidelines',
    title: ['How we behave', 'in here.'],
    numbered: true,
    clauses: [
      { label: 'No harassment', text: 'One warning, then removal. Repeat reports skip the warning.' },
      { label: 'No nudity', text: 'Not on cards, not in club, not in chat. AuraCam is the only camera we ask you to point at yourself.' },
      { label: 'No sign fraud', text: 'Club is locked by chart. Faking a birth date to get into a club removes the account.' },
      { label: 'Meet safely', text: 'Public place, own transport, tell someone. We will remind you every time the stars pick a date.' },
    ],
    next: { label: 'Next: Your data', page: 'data-export' },
  },
}

export const ABOUT = {
  eyebrow: 'About · Why this exists',
  title: ['It started with', 'my mother.'],
  body: [
    'I grew up watching my mother live by the lunar calendar. Not as a hobby, as a daily framework. It told her when to start things, when to wait, and how to read the people around her.',
    'Incense in the morning. The calendar consulted before anything important. It was not superstition to her. It was infrastructure.',
  ],
  footer: `Align 1.0 (88) · Houston · Cast under a ${SIGNS[ME.sign].name} sun`,
}

export const ABOUT_CITY = {
  eyebrow: 'About · What we built',
  title: ['Astrology is not', 'the aesthetic.'],
  body: [
    'Somewhere along the way dating apps threw all of that out and replaced it with photos and a swipe.',
    'Align brings it back. Real alignment, calculated from the systems people have trusted for generations, powers every match.',
  ],
  cityLabel: 'Space City first',
  city: 'Align launches in Houston. Where else would you look to the stars?',
  quote: 'My mother taught me that how you navigate the stars says more about you than any dating profile ever could.',
}

export const DELETE = {
  bar: 'Delete account',
  title: ['Dissolve', 'entirely?'],
  body: 'Your chart, your card, your photos, every match and every thread — gone, unless you sign back in within 7 days.',
  hold: 'Hold to delete everything',
  holding: 'Keep holding',
  done: 'Dissolving',
  keep: 'Keep my card',
}

export const EXPORT = {
  bar: 'Your data',
  title: ['Take a copy', 'of everything.'],
  included: ['Your chart and birth data', 'Every card you saw', 'Every message', 'Your aura history', 'Your manifestations'],
  how: 'One JSON file plus your photos, sent as a download link to the email on your account. Usually minutes, up to 48 hours. The link expires after 7 days.',
  cta: 'Email my data',
  sentCta: 'Done',
  sent: 'Requested. The link goes to your email.',
}

export const VERIFY = {
  bar: 'Verify photo',
  title: ['Same face,', 'same pose.'],
  poses: ['Hands under chin', 'Peace sign by your cheek', 'Hand flat on your chest', 'Look over your left shoulder'],
  how: 'Copy the pose we show you. It changes every time, so a saved photo cannot pass. Nobody sees it — the photo is compared, scored, then deleted within 24 hours. You get a verified mark on your card.',
  cta: 'Take the photo',
  checking: 'Checking the pose',
  demoFail: 'Demo: see a failed check',
}

export const VERIFIED = {
  title: ['The stars agree', 'it is you.'],
  body: 'A small mark now sits on your card. It shows no photo — only that a human matched the pose. The photo itself is deleted; we kept a result, not an image.',
  cta: 'Back to my card',
}

export const REJECTED = {
  bar: 'Verification',
  title: ['The stars could', 'not see you.'],
  body: 'It happens — no strike, no flag. Your card is unchanged and still in the deck.',
  label: 'What went wrong',
  reasons: ['Face and pose didn’t match', 'The light was too low', 'Face partly out of frame'],
  note: 'The photo is gone — we kept a result, not an image.',
  cta: 'Try again',
}

export interface BlockedPerson {
  id: string
  name: string
  sign: SignId
  when: string
}

/** the demo's blocked people (seeded) */
export const BLOCKED: BlockedPerson[] = [
  { id: 'b-jules', name: 'Jules', sign: 'scorpio', when: 'Jul 9' },
  { id: 'b-sasha', name: 'Sasha', sign: 'aries', when: 'Jun 30' },
  { id: 'b-rio', name: 'Rio', sign: 'pisces', when: 'Jun 12' },
]

export const BLOCKED_COPY = {
  bar: 'Blocked',
  people: 'Your orbit',
  signs: 'Signs off the table',
  none: 'Nobody is blocked.',
  noSigns: 'Every sign is in your deck.',
  how: 'How blocking works',
  howText: 'It is mutual and silent. They are never told. If they make a new account we match the chart and the number and block that too.',
  unblock: 'Unblock',
}

export const REPORT_SENT = {
  title: ['A human reads', 'this one.'],
  body: 'Someone on the safety team reviews it within 24 hours. Not a model, a person. They are already blocked, and they never learn who reported them.',
  danger: 'In danger? Call your local emergency number',
  cta: 'Done',
}

export const MEET = {
  bar: 'Meet safely',
  title: ['The stars picked', 'the time.'],
  label: 'Before you go',
  steps: [
    { t: 'Somewhere public', d: 'A café, a bar, a park in daylight. Not their place, not yours.' },
    { t: 'Tell one person', d: 'Who, where and when. Send it before you leave.' },
    { t: 'Your own transport', d: 'Get there and home on your own terms.' },
    { t: 'Keep your drink with you', d: 'If it leaves your sight, order a new one.' },
    { t: 'Trust the rub', d: 'The friction in the reading is real. So is the feeling in your gut.' },
  ],
  note: 'If something reads wrong in person, that is data. Leave. You owe nobody the rest of the evening.',
  cta: 'Got it',
}
