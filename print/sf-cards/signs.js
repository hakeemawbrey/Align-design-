// SF-01 zodiac cards: one front per sign. Aura names come from
// "Kit · The twelve auras". Per-sign colours are kept for reference; the
// cards are coloured per sign to match the art (SIGN_PALETTE below), with a thick pearl foil border.
// Copy voice follows the app: plain words, second person, no planet jargon.
//   pull  = what pulls you in
//   push  = where you push people away, and what to do about it
//   align = who you click with, and why

window.EDITION = { code: 'SF-01', run: 25 }

window.SIGNS = [
  {
    id: 'aries', name: 'Aries', glyph: '♈', dates: 'Mar 21 – Apr 19',
    element: 'fire', mode: 'Cardinal', animal: 'The Ram', aura: 'Ember',
    color: '#f0603a', light: '#ffb39a', dark: '#5a1c10',
    general: 'First through the door. You say the thing out loud, then go do it.',
    pull: 'Confidence and a quick comeback. Keep up and you’re in.',
    push: 'You read a pause as a no. Not every silence is a loss.',
    align: 'Leo, Sagittarius, Gemini. People who race you and laugh when they lose.',
  },
  {
    id: 'taurus', name: 'Taurus', glyph: '♉', dates: 'Apr 20 – May 20',
    element: 'earth', mode: 'Fixed', animal: 'The Bull', aura: 'Honey',
    color: '#e9b24a', light: '#ffe1a0', dark: '#4e3510',
    general: 'Steady to the bone. You build a home anywhere and remember the coffee order.',
    pull: 'Good food, slow mornings, someone who shows up when they said.',
    push: 'You dig in and call it patience. Let go before your hands are forced.',
    align: 'Virgo, Capricorn, Cancer. People who’d rather build than chase.',
  },
  {
    id: 'gemini', name: 'Gemini', glyph: '♊', dates: 'May 21 – Jun 20',
    element: 'air', mode: 'Mutable', animal: 'The Twins', aura: 'Signal',
    color: '#f2cf4a', light: '#fff0a8', dark: '#4f4210',
    general: 'Never a dull dinner. Ten tabs open and curious about every one.',
    pull: 'A mind that keeps up. Banter is your love language.',
    push: 'You leave before it gets quiet. The boring part is where trust starts.',
    align: 'Libra, Aquarius, Aries. People who text back fast and argue for fun.',
  },
  {
    id: 'cancer', name: 'Cancer', glyph: '♋', dates: 'Jun 21 – Jul 22',
    element: 'water', mode: 'Cardinal', animal: 'The Crab', aura: 'Tide',
    color: '#3fb6f0', light: '#a8e4ff', dark: '#0f3550',
    general: 'You feed people. You feel the mood before anyone says it.',
    pull: 'Someone safe enough to soften around. Inside jokes, a standing Sunday.',
    push: 'You hint instead of asking, then retreat. Say what you need out loud.',
    align: 'Scorpio, Pisces, Taurus. People who stay for the deep end.',
  },
  {
    id: 'leo', name: 'Leo', glyph: '♌', dates: 'Jul 23 – Aug 22',
    element: 'fire', mode: 'Fixed', animal: 'The Lion', aura: 'Goldleaf',
    color: '#f39a3a', light: '#ffd09a', dark: '#55300f',
    general: 'Generous with your time and your compliments. You make a Tuesday an occasion.',
    pull: 'Being chosen, loudly. Someone who hypes you in the group chat.',
    push: 'Silence feels personal. Not every good thing needs an audience.',
    align: 'Aries, Sagittarius, Libra. People who match your light, not dim it.',
  },
  {
    id: 'virgo', name: 'Virgo', glyph: '♍', dates: 'Aug 23 – Sep 22',
    element: 'earth', mode: 'Mutable', animal: 'The Maiden', aura: 'Rose Quartz',
    color: '#ef5c94', light: '#ffb6d2', dark: '#561a33',
    general: 'You show love by fixing things. You notice what nobody else does.',
    pull: 'Competence. Someone who plans the trip and texts when they land.',
    push: 'You edit people. Let a good thing stay a little unfinished.',
    align: 'Taurus, Capricorn, Cancer. People who see effort as romance.',
  },
  {
    id: 'libra', name: 'Libra', glyph: '♎', dates: 'Sep 23 – Oct 22',
    element: 'air', mode: 'Cardinal', animal: 'The Scales', aura: 'Orchid',
    color: '#e163d6', light: '#ffbdf6', dark: '#4d1a49',
    general: 'You make everyone feel like the favourite. Great taste, better company.',
    pull: 'Charm, beauty, a good restaurant. Someone who flirts back.',
    push: 'You keep the peace, then resent the peace. Pick the restaurant.',
    align: 'Gemini, Aquarius, Leo. People who make every room easier.',
  },
  {
    id: 'scorpio', name: 'Scorpio', glyph: '♏', dates: 'Oct 23 – Nov 21',
    element: 'water', mode: 'Fixed', animal: 'The Scorpion', aura: 'Garnet',
    color: '#e23d66', light: '#ff9fb7', dark: '#55102a',
    general: 'All in or not at all. You keep every secret and see through anyone.',
    pull: 'Depth, loyalty, a little mystery. Small talk need not apply.',
    push: 'You test people who never signed up for the exam. Let them in first.',
    align: 'Cancer, Pisces, Capricorn. People who can hold intensity without flinching.',
  },
  {
    id: 'sagittarius', name: 'Sagittarius', glyph: '♐', dates: 'Nov 22 – Dec 21',
    element: 'fire', mode: 'Mutable', animal: 'The Archer', aura: 'Amethyst',
    color: '#a35cf0', light: '#dcbcff', dark: '#36165a',
    general: 'Every plan turns into an adventure. Honest to a fault, quick to laugh.',
    pull: 'Someone who says yes to the trip. Freedom, with company.',
    push: 'Commitment can feel like a cage. Stay when it gets ordinary.',
    align: 'Aries, Leo, Aquarius. People who pack light and say yes.',
  },
  {
    id: 'capricorn', name: 'Capricorn', glyph: '♑', dates: 'Dec 22 – Jan 19',
    element: 'earth', mode: 'Cardinal', animal: 'The Sea-Goat', aura: 'Jade',
    color: '#2fc79a', light: '#a6f0d6', dark: '#0e4636',
    general: 'You mean it when you say it. Five-year plan, first call in a crisis.',
    pull: 'Ambition and follow-through. Someone with their life together.',
    push: 'You schedule feelings for later. Later rarely comes.',
    align: 'Taurus, Virgo, Scorpio. People building something too.',
  },
  {
    id: 'aquarius', name: 'Aquarius', glyph: '♒', dates: 'Jan 20 – Feb 18',
    element: 'air', mode: 'Fixed', animal: 'The Water Bearer', aura: 'Ion',
    color: '#38c4ec', light: '#b2ecff', dark: '#0e3d4e',
    general: 'Unbothered by what people think. Friend first, never boring.',
    pull: 'A weird, brilliant mind. Someone who gets your odd ideas.',
    push: 'You go cold when it gets close. Distance isn’t the same as calm.',
    align: 'Gemini, Libra, Sagittarius. People who give you room and come back.',
  },
  {
    id: 'pisces', name: 'Pisces', glyph: '♓', dates: 'Feb 19 – Mar 20',
    element: 'water', mode: 'Mutable', animal: 'The Fish', aura: 'Dusk',
    color: '#7c74f0', light: '#c6c1ff', dark: '#25205a',
    general: 'You feel everything with people. Romantic without trying, quick to forgive.',
    pull: 'Soul talks at 2am. Someone who gets your playlists.',
    push: 'You fall for who someone could be. Potential doesn’t text back.',
    align: 'Cancer, Scorpio, Taurus. People who ground you and still dream.',
  },
]

// Card colour per sign, sampled from the main colour of that sign's illustration
// (art/<sign>.jpg), so each card's background matches its art.
//   ground = [top, middle, bottom] of the card background
window.SIGN_PALETTE = {
  aries: { color: '#ee592f', light: '#fbc1b1', dark: '#341209', ground: ['#953c23', '#5d2313', '#2b0f08'] },
  taurus: { color: '#8cee2f', light: '#d5fbb1', dark: '#1e3409', ground: ['#5a9523', '#375d13', '#192b08'] },
  gemini: { color: '#eea22f', light: '#fbdeb1', dark: '#342309', ground: ['#956723', '#5d4013', '#2b1d08'] },
  cancer: { color: '#2f82ee', light: '#b1d1fb', dark: '#091c34', ground: ['#235495', '#13335d', '#08172b'] },
  leo: { color: '#ee7f2f', light: '#fbd0b1', dark: '#341b09', ground: ['#955223', '#5d3213', '#2b1708'] },
  virgo: { color: '#ee2f5f', light: '#fbb1c4', dark: '#340914', ground: ['#95233f', '#5d1326', '#2b0811'] },
  libra: { color: '#c22fee', light: '#eab1fb', dark: '#2a0934', ground: ['#7a2395', '#4c135d', '#23082b'] },
  scorpio: { color: '#ee2f75', light: '#fbb1cc', dark: '#340919', ground: ['#95234d', '#5d132e', '#2b0815'] },
  sagittarius: { color: '#a22fee', light: '#deb1fb', dark: '#230934', ground: ['#672395', '#40135d', '#1d082b'] },
  capricorn: { color: '#2feec8', light: '#b1fbec', dark: '#09342b', ground: ['#23957e', '#135d4e', '#082b24'] },
  aquarius: { color: '#2fa2ee', light: '#b1defb', dark: '#092334', ground: ['#236795', '#13405d', '#081d2b'] },
  pisces: { color: '#622fee', light: '#c5b1fb', dark: '#150934', ground: ['#412395', '#27135d', '#11082b'] },
}

// Gold foil for the rare #01/25 of each sign (the app's --gold-foil ramp, with sheen bands).
window.GOLD = [
  'repeating-linear-gradient(125deg, rgba(255,255,255,0) 0pt, rgba(255,250,225,0.6) 9pt, rgba(255,255,255,0) 20pt, rgba(120,80,10,0) 34pt, rgba(120,80,10,0.28) 44pt, rgba(120,80,10,0) 56pt)',
  'linear-gradient(125deg, #a9802e 0%, #f2c75c 14%, #fff4cf 26%, #d9a640 38%, #f2d784 50%, #fffaf0 58%, #c99a3a 70%, #f2c75c 82%, #fff4cf 92%, #b88a2c 100%)',
].join(', ')

// Align pearl foil: the chrome CTA ramp (f6edff → fff7ec → eaf4ff → ffeff7, from
// "Kit · Stardust language") with soft lavender shadows so it reads as pearl on paper.
window.PEARL = [
  // sheen bands
  'repeating-linear-gradient(125deg, rgba(255,255,255,0) 0pt, rgba(255,255,255,0.55) 9pt, rgba(255,255,255,0) 20pt, rgba(190,170,230,0.0) 34pt, rgba(190,170,230,0.35) 44pt, rgba(190,170,230,0) 56pt)',
  // the pearl ramp: lavender → blush → cream → ice → white → lilac
  'linear-gradient(125deg, #c9b6ef 0%, #f1e3ff 10%, #ffd9ec 20%, #fff1df 30%, #d5e6ff 42%, #ffffff 50%, #e6d4ff 60%, #ffdcef 70%, #fff3e3 80%, #cfe0ff 90%, #c6b3ee 100%)',
].join(', ')

window.CARD_BACK = {
  // improved back only: one-line pitch, and the QR code (qr.svg, made by make-qr.py)
  pitch: 'Dating, dealt by the stars.',
  qrLabel: 'Scan · try Align',
  name: 'Hakeem Awbrey',
  title: 'Co-Founder',
  email: 'hakeem@comealign.com',
  site: 'comealign.com',
}
