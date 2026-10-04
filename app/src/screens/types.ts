export type ScreenId =
  | 'splash'     // S-01 Open app — mark + wordmark
  | 'welcome'    // S-02 "The stars kept your seat warm"
  | 'dealing'    // S-03/S-04 Dealing your deck
  | 'deck'       // S-05* The Deck — swipe, hold to peek
  | 'match'      // S-07 You both aligned
  | 'reveal'     // S-08 Veil lifts — card flipped
  | 'chat'       // S-09 Chat
  | 'alignment'  // S-21 Cosmic alignment reading
  | 'spent'      // S-10 Your deck is spent
  | 'matches'    // G-09 Your matches + binder
  | 'trade'      // Binder — trade card copies after 3 days aligned
  | 'onboarding' // O-02 → O-11 new user: birth data, sky, sign reveal, big three
  | 'founding'   // O-14 end of onboarding: founding member offer
  | 'paywall'    // S-11 Align+ paywall (in-app)
  | 'you'        // G-05 You tab: your card, sky, settings
  | 'club'       // S-17 Club: your sign's room

export interface ScreenProps {
  go: (id: ScreenId) => void
}
