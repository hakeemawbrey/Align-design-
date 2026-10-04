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

export interface ScreenProps {
  go: (id: ScreenId) => void
}
