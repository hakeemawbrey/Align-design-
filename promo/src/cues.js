// Sound cues, in seconds. Keep in sync with scene timings.
export const CUES = {
  typeS1: { start: 0.2, perChar: 0.026, text: 'What if the stars chose who you meet?' },
  typeS7: { start: 22.56, perChar: 0.016, text: 'Dating, dealt by the stars' },
  glitch: [[1.62, 1.72], [2.28, 2.36], [2.72, 2.86]],
  whoosh: [2.95, 6.15, 13.95, 17.2, 22.3],
  whip: [10.0, 12.65],
  pixels: [[2.95, 3.55], [6.3, 6.86], [17.12, 17.8], [26.58, 26.94]],
  pops: [3.5, 3.62, 3.74, 4.78, 5.02, 5.62, 14.75, 15.15, 15.55, 15.95, 16.35, 19.0, 19.35, 20.85, 21.22],
  boom: [6.85, 22.45],
  click: [13.3],
  deal: [17.85, 18.15, 18.45, 18.7, 18.92, 19.12, 19.32, 19.52, 19.72, 19.92, 20.12, 20.32, 20.52, 20.72, 20.9, 21.08],
  tuck: [21.5, 21.78, 22.06, 22.34],
  stamp: [21.85],
  sign: [14.9, 16.55],
  foil: [21.05],
  land: [24.3, 25.95],
  captions: [24.3, 25.65],
  whooshS7: [24.12, 25.45, 26.62],
  pulse: [28.58],
  // moon motif (REAL time, not shifted): clock ticks per scene, full-moon bloom, end-card phase row
  moonReal: { ticks: [4.05, 11.85, 19.65, 25.9], fullBloom: 26.6, strip: 17.48, row: { start: 29.95, step: 0.075, count: 9 } },
  s2stars: { start: 3.89, step: 0.06, count: 6 },
  alignedLifts: [19.02, 19.26, 19.5, 19.74, 20.06],
  shooting: [1.0, 4.25, 11.7, 15.9, 19.7, 28.8],
  bursts: [21.85, 24.3],
  constellation: { start: 22.66, step: 0.085, count: 13, lines: 23.12 },
  chimes: { start: 27.4, step: 0.07, count: 7 },
  // S3 · the stars align (REAL time, not shifted — see s3-veil.js beat map). [kind, t, ...args]
  real: [
    ['whoosh', 7.45, 0.9, 0.08],                                   // pull back from the veil to the mystery card
    ['bell', 7.5, 659.25, 0.04, 1.0, 0], ['bell', 7.62, 987.77, 0.04, 1.0, 0], // eyebrow · caption
    // seven chakra stars streak in (enter 7.35 + k·0.065), a soft whoosh + glint as each arrives
    ...[0, 1, 2, 3, 4, 5, 6].flatMap(k => [['whoosh', 7.35 + k * 0.065 + 0.32, 0.38, 0.035], ['bell', 7.35 + k * 0.065 + 0.36, 2349.32, 0.012, 1.0, ((k % 3) - 1) * 0.5]]),
    ['whoosh', 8.86, 1.3, 0.07],                                   // tension riser peaking just before the lock
    // each star clicks into the column, red → violet (8.36 + i·0.055): rising chakra arpeggio
    ...[493.88, 587.33, 659.25, 739.99, 880, 987.77, 1174.66].flatMap((f, i) => [['tick', 8.36 + i * 0.055, 0.06], ['bell', 8.36 + i * 0.055, f, 0.05, 1.2, (i - 3) * 0.12]]),
    // THE LOCK 8.72: impact + chord + glitter
    ['boom', 8.72, 0.5], ['tick', 8.72, 0.22],
    ['bell', 8.72, 246.94, 0.08, 3.0, 0], ['bell', 8.73, 739.99, 0.06, 2.6, -0.25], ['bell', 8.74, 1479.98, 0.04, 2.6, 0.25],
    ['glitter', 8.72, 9.3],
    ['whoosh', 9.36, 0.45, 0.1],                                   // mystery card flips into the reveal card
    ['bell', 9.5, 739.99, 0.05, 1.6, -0.2], ['bell', 9.59, 1108.73, 0.04, 1.6, 0.2], // reveal card lands
    ['whoosh', 10.0, 0.8, 0.07],                                   // veil rising in the photo window
    // aura-cam hue sweep 9.56–10.02 (one note per chakra colour)
    ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33].map((f, i) => ['bell', 9.56 + i * 0.066, f, 0.045, 0.9, (i - 3) * 0.15]),
    ['glitter', 10.02, 10.42], ['bell', 10.07, 1318.51, 0.05, 2.0, 0], ['bell', 10.13, 1975.53, 0.035, 2.0, 0], // resolve to the real photo
    ['whoosh', 10.3, 0.5, 0.05],                                   // camera pulls back to the whole card
    ...[1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32, 2637.02, 2959.96, 3520].map((f, k) => ['bell', 10.4 + k * 0.045, f, 0.02, 0.6, k / 4 - 1]), // gold-foil sweep
    ['whoosh', 11.2, 0.55, 0.16],                                  // flip to the card back → push into S4
  ],
  sections: [
    // [start, end, chord (Hz roots)]
    [0, 6.85, [146.83, 220.0, 329.63, 369.99, 554.37]],     // Dmaj9
    [6.85, 14.05, [123.47, 185.0, 293.66, 329.63, 440.0]],  // Bm9
    [14.05, 22.4, [98.0, 196.0, 293.66, 369.99, 493.88]],   // Gmaj7
    [22.4, 26.95, [110.0, 220.0, 277.18, 329.63, 493.88]],  // A add9
    [26.95, 30, [146.83, 220.0, 293.66, 369.99, 440.0, 659.25]], // D resolve
  ],
  bpm: 96, beatFrom: 3.55, beatTo: 26.8,
}
