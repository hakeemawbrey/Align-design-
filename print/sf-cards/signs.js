// SF-01 zodiac cards: one front per sign. Aura names come from
// "Kit · The twelve auras". Per-sign colours are kept for reference; the
// cards are coloured by element (ELEMENT_PALETTE below), with a thick pearl foil border.
// focus = vertical crop point (%) of the figure art in the card window.
// Copy voice follows the app: plain words, second person, no planet jargon.
//   pull  = what pulls you in
//   push  = where you push people away, and what to do about it
//   align = who you click with, and why

window.EDITION = { code: 'SF-01', run: 25 }

window.SIGNS = [
  {
    id: 'aries', focus: 78, name: 'Aries', glyph: '♈', dates: 'Mar 21 – Apr 19',
    element: 'fire', mode: 'Cardinal', animal: 'The Ram', aura: 'Ember',
    color: '#f0603a', light: '#ffb39a', dark: '#5a1c10',
    general: 'First through the door. You say the thing out loud, then go do it.',
    pull: 'Confidence and a quick comeback. Keep up and you’re in.',
    push: 'You read a pause as a no. Not every silence is a loss.',
    align: 'Leo, Sagittarius, Gemini. People who race you and laugh when they lose.',
  },
  {
    id: 'taurus', focus: 88, name: 'Taurus', glyph: '♉', dates: 'Apr 20 – May 20',
    element: 'earth', mode: 'Fixed', animal: 'The Bull', aura: 'Honey',
    color: '#e9b24a', light: '#ffe1a0', dark: '#4e3510',
    general: 'Steady to the bone. You build a home anywhere and remember the coffee order.',
    pull: 'Good food, slow mornings, someone who shows up when they said.',
    push: 'You dig in and call it patience. Let go before your hands are forced.',
    align: 'Virgo, Capricorn, Cancer. People who’d rather build than chase.',
  },
  {
    id: 'gemini', focus: 62, name: 'Gemini', glyph: '♊', dates: 'May 21 – Jun 20',
    element: 'air', mode: 'Mutable', animal: 'The Twins', aura: 'Signal',
    color: '#f2cf4a', light: '#fff0a8', dark: '#4f4210',
    general: 'Never a dull dinner. Ten tabs open and curious about every one.',
    pull: 'A mind that keeps up. Banter is your love language.',
    push: 'You leave before it gets quiet. The boring part is where trust starts.',
    align: 'Libra, Aquarius, Aries. People who text back fast and argue for fun.',
  },
  {
    id: 'cancer', focus: 92, name: 'Cancer', glyph: '♋', dates: 'Jun 21 – Jul 22',
    element: 'water', mode: 'Cardinal', animal: 'The Crab', aura: 'Tide',
    color: '#3fb6f0', light: '#a8e4ff', dark: '#0f3550',
    general: 'You feed people. You feel the mood before anyone says it.',
    pull: 'Someone safe enough to soften around. Inside jokes, a standing Sunday.',
    push: 'You hint instead of asking, then retreat. Say what you need out loud.',
    align: 'Scorpio, Pisces, Taurus. People who stay for the deep end.',
  },
  {
    id: 'leo', focus: 62, name: 'Leo', glyph: '♌', dates: 'Jul 23 – Aug 22',
    element: 'fire', mode: 'Fixed', animal: 'The Lion', aura: 'Goldleaf',
    color: '#f39a3a', light: '#ffd09a', dark: '#55300f',
    general: 'Generous with your time and your compliments. You make a Tuesday an occasion.',
    pull: 'Being chosen, loudly. Someone who hypes you in the group chat.',
    push: 'Silence feels personal. Not every good thing needs an audience.',
    align: 'Aries, Sagittarius, Libra. People who match your light, not dim it.',
  },
  {
    id: 'virgo', focus: 45, name: 'Virgo', glyph: '♍', dates: 'Aug 23 – Sep 22',
    element: 'earth', mode: 'Mutable', animal: 'The Maiden', aura: 'Rose Quartz',
    color: '#ef5c94', light: '#ffb6d2', dark: '#561a33',
    general: 'You show love by fixing things. You notice what nobody else does.',
    pull: 'Competence. Someone who plans the trip and texts when they land.',
    push: 'You edit people. Let a good thing stay a little unfinished.',
    align: 'Taurus, Capricorn, Cancer. People who see effort as romance.',
  },
  {
    id: 'libra', focus: 62, name: 'Libra', glyph: '♎', dates: 'Sep 23 – Oct 22',
    element: 'air', mode: 'Cardinal', animal: 'The Scales', aura: 'Orchid',
    color: '#e163d6', light: '#ffbdf6', dark: '#4d1a49',
    general: 'You make everyone feel like the favourite. Great taste, better company.',
    pull: 'Charm, beauty, a good restaurant. Someone who flirts back.',
    push: 'You keep the peace, then resent the peace. Pick the restaurant.',
    align: 'Gemini, Aquarius, Leo. People who make every room easier.',
  },
  {
    id: 'scorpio', focus: 40, name: 'Scorpio', glyph: '♏', dates: 'Oct 23 – Nov 21',
    element: 'water', mode: 'Fixed', animal: 'The Scorpion', aura: 'Garnet',
    color: '#e23d66', light: '#ff9fb7', dark: '#55102a',
    general: 'All in or not at all. You keep every secret and see through anyone.',
    pull: 'Depth, loyalty, a little mystery. Small talk need not apply.',
    push: 'You test people who never signed up for the exam. Let them in first.',
    align: 'Cancer, Pisces, Capricorn. People who can hold intensity without flinching.',
  },
  {
    id: 'sagittarius', focus: 50, name: 'Sagittarius', glyph: '♐', dates: 'Nov 22 – Dec 21',
    element: 'fire', mode: 'Mutable', animal: 'The Archer', aura: 'Amethyst',
    color: '#a35cf0', light: '#dcbcff', dark: '#36165a',
    general: 'Every plan turns into an adventure. Honest to a fault, quick to laugh.',
    pull: 'Someone who says yes to the trip. Freedom, with company.',
    push: 'Commitment can feel like a cage. Stay when it gets ordinary.',
    align: 'Aries, Leo, Aquarius. People who pack light and say yes.',
  },
  {
    id: 'capricorn', focus: 42, name: 'Capricorn', glyph: '♑', dates: 'Dec 22 – Jan 19',
    element: 'earth', mode: 'Cardinal', animal: 'The Sea-Goat', aura: 'Jade',
    color: '#2fc79a', light: '#a6f0d6', dark: '#0e4636',
    general: 'You mean it when you say it. Five-year plan, first call in a crisis.',
    pull: 'Ambition and follow-through. Someone with their life together.',
    push: 'You schedule feelings for later. Later rarely comes.',
    align: 'Taurus, Virgo, Scorpio. People building something too.',
  },
  {
    id: 'aquarius', focus: 55, name: 'Aquarius', glyph: '♒', dates: 'Jan 20 – Feb 18',
    element: 'air', mode: 'Fixed', animal: 'The Water Bearer', aura: 'Ion',
    color: '#38c4ec', light: '#b2ecff', dark: '#0e3d4e',
    general: 'Unbothered by what people think. Friend first, never boring.',
    pull: 'A weird, brilliant mind. Someone who gets your odd ideas.',
    push: 'You go cold when it gets close. Distance isn’t the same as calm.',
    align: 'Gemini, Libra, Sagittarius. People who give you room and come back.',
  },
  {
    id: 'pisces', focus: 50, name: 'Pisces', glyph: '♓', dates: 'Feb 19 – Mar 20',
    element: 'water', mode: 'Mutable', animal: 'The Fish', aura: 'Dusk',
    color: '#7c74f0', light: '#c6c1ff', dark: '#25205a',
    general: 'You feel everything with people. Romantic without trying, quick to forgive.',
    pull: 'Soul talks at 2am. Someone who gets your playlists.',
    push: 'You fall for who someone could be. Potential doesn’t text back.',
    align: 'Cancer, Scorpio, Taurus. People who ground you and still dream.',
  },
]

// Four card types, one per element. The background is the element's ground;
// the border is the same pearl foil on every card, running out to the cut edge. color/light/dark match the
// app's element orb (ELEMENT_ORB in app/src/components/onboarding/readings.ts).
//   ground = [top, middle, bottom] of the card background
window.ELEMENT_PALETTE = {
  fire: { color: '#f0603a', light: '#ffc2a0', dark: '#3a0e06', ground: ['#9a3214', '#5e1508', '#2a0703'] },
  earth: { color: '#7cd84a', light: '#e4ffb8', dark: '#173a0a', ground: ['#3c7a22', '#1d4a11', '#0a2306'] },
  air: { color: '#7fc8f0', light: '#e2f5ff', dark: '#10304a', ground: ['#3a86b0', '#1c5476', '#0b2a40'] },
  water: { color: '#3f7cf0', light: '#b8d4ff', dark: '#0a1640', ground: ['#2a4fb4', '#14287a', '#070f3a'] },
}

// Align pearl foil: the chrome CTA ramp (f6edff → fff7ec → eaf4ff → ffeff7, from
// "Kit · Stardust language") with soft lavender shadows so it reads as pearl on paper.
window.PEARL = [
  // sheen bands
  'repeating-linear-gradient(125deg, rgba(255,255,255,0) 0pt, rgba(255,255,255,0.55) 9pt, rgba(255,255,255,0) 20pt, rgba(190,170,230,0.0) 34pt, rgba(190,170,230,0.35) 44pt, rgba(190,170,230,0) 56pt)',
  // the pearl ramp: lavender → blush → cream → ice → white → lilac
  'linear-gradient(125deg, #c9b6ef 0%, #f1e3ff 10%, #ffd9ec 20%, #fff1df 30%, #d5e6ff 42%, #ffffff 50%, #e6d4ff 60%, #ffdcef 70%, #fff3e3 80%, #cfe0ff 90%, #c6b3ee 100%)',
].join(', ')

window.CARD_BACK = {
  name: 'Hakeem Awbrey',
  title: 'Co-Founder',
  email: 'hakeem@comealign.com',
  site: 'comealign.com',
}
