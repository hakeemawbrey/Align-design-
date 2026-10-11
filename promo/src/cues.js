// Sound cues, in seconds. Keep in sync with scene timings.
export const CUES = {
  typeS1: { start: 0.45, perChar: 0.034, text: 'Imagine if the stars swiped for you' },
  typeS7: { start: 23.0, perChar: 0.04, text: 'Dating, dealt by the stars' },
  whoosh: [2.95, 6.15, 9.62, 13.95, 17.2, 22.3, 26.7],
  pixels: [[2.95, 3.55], [6.15, 6.85], [17.2, 17.95]],
  pops: [3.62, 4.0, 4.38, 4.95, 5.25, 14.75, 15.15, 15.55, 15.95, 16.35, 19.0, 19.35, 21.0, 21.25],
  boom: [6.85, 22.45],
  click: [13.5],
  deal: { start: 17.55, step: 0.2, count: 14 },
  land: [24.7],
  chimes: { start: 27.75, step: 0.1, count: 7 },
  sections: [
    // [start, end, chord (Hz roots)]
    [0, 6.85, [146.83, 220.0, 329.63, 369.99, 554.37]],     // Dmaj9
    [6.85, 14.05, [123.47, 185.0, 293.66, 329.63, 440.0]],  // Bm9
    [14.05, 22.4, [98.0, 196.0, 293.66, 369.99, 493.88]],   // Gmaj7
    [22.4, 26.85, [110.0, 220.0, 277.18, 329.63, 493.88]],  // A add9
    [26.85, 30, [146.83, 220.0, 293.66, 369.99, 440.0, 659.25]], // D resolve
  ],
  bpm: 96, beatFrom: 3.55, beatTo: 26.8,
}
