/**
 * The beta build (`vite build --mode beta`): the core loop only. Onboarding,
 * the deck with peeks and the daily sky, chat with talk cards and
 * compatibility, the aura photo, and your profile. Packs, the binder, Club,
 * Align+, trading and energy are left out.
 */
export const BETA = import.meta.env.MODE === 'beta'

/** screens the beta doesn't have; links to them do nothing */
export const BETA_BLOCKED = new Set<string>([
  'club', 'founding', 'paywall', 'collection', 'trade', 'howto', 'notifications', 'sky',
  'x/manage-plus', 'x/wait-reset', 'x/glossary-upsell',
])
