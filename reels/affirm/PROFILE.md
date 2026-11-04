# The page: Align affirmations

A new Instagram page that posts the affirmation reels in this folder. It
runs the same funnel as the creator page that inspired the format
(@innertune.affirmations, an affirmation app's page with about 2M followers):
**every reel ends with "Comment WORD"**, the comment triggers a DM, and the DM
delivers what the reel promised plus a link to the app. Here the app is
Align, and what gets delivered is a reading from your chart.

## Handle and name

| | Pick | Backups |
| --- | --- | --- |
| Handle | `@align.affirmations` | `@aligned.affirmations`, `@align.lovenotes` |
| Name field | `Align · Love & Zodiac Affirmations` | `Love Affirmations · Align` |

The name field is searchable, so it carries the words people type: *love*,
*zodiac*, *affirmations*. Check the handle is free before you print it
anywhere.

## Profile picture

Four options in `profile/`, all drawn by the same engine as the reels.
`profile/preview-circles.png` shows how each reads as a small circle.

| File | What | Notes |
| --- | --- | --- |
| `pfp-stardust.png` | Stardust's gold star head in orbit | **Recommended.** Bold enough to read at 110 px, and it's Align's mascot |
| `pfp-couple.png` | Two Stardust figures holding hands | The most romantic; detail gets small in the circle |
| `pfp-card.png` | A veiled Align card | Ties straight to the app's deal-and-reveal |
| `pfp-venus.png` | The Venus glyph, halftone rose | Strong, but can read as a gender sign rather than astrology |

## Bio (150 characters max)

```
Affirmations for love, read from your chart ✦
Comment the word at the end of a reel, I'll DM it to you
Your free chart on Align ↓
```

- **Link:** your Align link (App Store, TestFlight or waitlist page).
- **Category:** Digital creator.
- **Highlights (later):** *Start here* (what the page is, how commenting works),
  *Your DMs* (screenshots of what people get), *Venus signs*, *Align*.

## The comment-to-DM replies

Each reel promises something in the DMs, so set these up before posting. Use a
comment-to-DM tool (ManyChat or similar) with one trigger per keyword. Every
DM ends on the same line, so the page always points back to the app.

### SEVEN · reel 01, the 7th house

> Your 7th house is the house of partners. Its sign is the one opposite your rising ✦
>
> Aries rising → Libra 7th: you need an equal, someone who meets you halfway
> Taurus rising → Scorpio 7th: you need depth, loyalty and the whole truth
> Gemini rising → Sagittarius 7th: you need freedom and long, big talks
> Cancer rising → Capricorn 7th: you need someone steady who builds with you
> Leo rising → Aquarius 7th: you need a friend first, and room to be yourself
> Virgo rising → Pisces 7th: you need softness, not one more critic
> Libra rising → Aries 7th: you need someone direct who makes the first move
> Scorpio rising → Taurus 7th: you need calm, patience and safety
> Sagittarius rising → Gemini 7th: you need someone curious who keeps you talking
> Capricorn rising → Cancer 7th: you need warmth and a real home
> Aquarius rising → Leo 7th: you need to be adored, out loud
> Pisces rising → Virgo 7th: you need love that shows up in the details
>
> Say it once more: I don't have to shrink to be found.
>
> Don't know your rising? Align reads it from your birth time, free: [link]

### PASSING · reel 02, retrograde

> For the next time they text ✦ read these before you reply:
>
> 1. I am moving forward, even when it looks like I'm not.
> 2. Missing them is a feeling, not an instruction.
> 3. They came back around. I don't have to.
> 4. I can be kind and still not reply.
> 5. What passed me was meant to.
>
> Release, don't haunt.
>
> See what's in your sky this week on Align: [link]

### MUTUAL · reel 03, the eclipse

> For when you're the only one trying ✦ say it slowly:
>
> I only align with people who move toward me too.
> Effort I have to beg for is not effort I want.
> I can love someone and still stop chasing them.
> I was never meant to orbit anyone.
>
> It has to be mutual. On Align, a match only happens when you both choose each other: [link]

### VENUS · reel 04, Venus

> Your Venus sign is how you need to be loved ✦
>
> Venus in Aries: chase me a little, and be direct
> Venus in Taurus: be consistent. Touch, good food, time
> Venus in Gemini: talk to me, make me laugh
> Venus in Cancer: make me feel safe, remember the small things
> Venus in Leo: adore me out loud
> Venus in Virgo: show it in what you do, not just what you say
> Venus in Libra: be fair, be gentle, make it beautiful
> Venus in Scorpio: all of you or nothing, and the whole truth
> Venus in Sagittarius: adventure, and no cages
> Venus in Capricorn: show me you're serious. Plans, not promises
> Venus in Aquarius: be my friend first, and respect my space
> Venus in Pisces: be soft with me, romance me
>
> I deserve to be loved in my language.
>
> Don't know your Venus? Align reads it from your birthday, free: [link]

## Captions

Each render writes `reels/out/affirm/<id>.caption.txt` (caption, the comment
line, hashtags). Pin a first comment that repeats the keyword:
`comment SEVEN ✦ I'll send it straight to your DMs`.

## Posting the first four

1. **02 · You're just passing them**: Mercury is retrograde until about
   Nov 13, so retrograde content is timely right now.
2. **04 · Venus runs your heart**: the broadest hook, and every sign has an answer.
3. **01 · The other half of your sky**
4. **03 · Nothing aligns alone**

Post one a day for the first four days, then pin 04, 02 and 01. Use the
covers (`reels/out/affirm/<id>.cover.jpg`) as each reel's cover so the grid
stays consistent. To test hooks before posting to the main grid, the trial-reel
tool in `instagram/` can post them as trial reels first.
