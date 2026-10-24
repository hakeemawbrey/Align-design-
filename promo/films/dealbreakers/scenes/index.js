// Dealbreakers (15s, LOOK B · nebula). s1 0–6.0: "Three months in." → "I don't want kids." lands → "Then the dealbreaker."
// → the glass cracks → BREAK 5.1 the phone shatters and the sky floods in. s2 5.4–11.25: dealbreakers first (the sign-up
// screen → chips stamped on the card), "Said on day one." s3 10.9–15.0: "What matters, first." + lockup → black.
import s1, { cues as c1 } from './s1-chat.js'
import s2, { cues as c2 } from './s2-dealbreakers.js'
import s3, { cues as c3 } from './s3-end.js'
export const DURATION = 15
export const SCENES = [s1, s2, s3]
export const CUES = [...c1, ...c2, ...c3]
