# The page: Align · Frequencies

A new Instagram page modelled on @resonara1's: short, hypnotic alignment reels
you watch with headphones on, each ending on **"comment WORD"**. The comment
triggers a DM with the long version. Here every DM also carries something
about love from your chart, and the Align link.

What's different from the page that inspired it: the tones are real planet
cycles (see the table in [README.md](README.md)), the subjects are astrology
(planets, signs, Venus and the Moon, the heart lotus), and every reel bends
toward love and matching.

## Handle and name

| | Pick | Backups |
| --- | --- | --- |
| Handle | `@align.frequencies` | `@aligned.frequencies`, `@align.tones`, `@align.hz` |
| Name field | `Align · Planet & Love Frequencies` | `Planet Frequencies · Align` |

The name field is searchable, so it carries the words people type:
*frequencies*, *planet*, *love*. Check the handle is free before you print it
anywhere.

## Profile picture

Four options in `profile/`, cropped from the reels' own frames
(`node reels/frequency/render.mjs --pfp`).

| File | What | Notes |
| --- | --- | --- |
| `pfp-heart.png` | The six-pointed star in the twelve-petal lotus | **Recommended.** Reads well in a small circle, and it's the page's most "frequency" image |
| `pfp-star.png` | Align's four-point star | The simplest, and the most on-brand for the app |
| `pfp-gate.png` | The Aries gate with the tunnel behind it | The most hypnotic; busy at small sizes |
| `pfp-line.png` | Seven planets on one gold line | Literal "align"; thin in a circle |

## Bio (150 characters max)

```
Real planet tones, made visible 🎧 headphones on
Comment the word at the end of a reel, I'll DM you the full version
Your free chart on Align ↓
```

- **Link:** your Align link (App Store, TestFlight or waitlist page).
- **Category:** Musician/band or Digital creator.
- **Highlights (later):** *Start here* (what the tones are, how commenting
  works), *Full versions*, *Your sign*, *Align*.

## The four reels

| Reel | Hook (on screen at frame one) | Keyword |
| --- | --- | --- |
| `01-seven-planets` | watch the seven planets click into line | ALIGNED |
| `02-twelve-gates` | fly through all twelve signs. don't blink. | your sign (ARIES, TAURUS…) |
| `03-venus-moon` | venus in your left ear. the moon in your right. | VENUS |
| `04-heart-639` | 639 hz, the frequency of the heart | MUTUAL |

Captions and hashtags are in each script. Pin a first comment that repeats
the keyword: `comment ALIGNED 🎧 I'll send the full version to your DMs`.

## The comment-to-DM replies

Use a comment-to-DM tool (ManyChat or similar), one trigger per keyword. The
long versions come from `node reels/frequency/render.mjs --full`
(`reels/out/frequency/full/`). Upload the `.mp4`s to YouTube (unlisted is
fine; a public channel of long tones grows too) and paste each link where it
says `[full link]`. Every DM ends on the Align link.

### ALIGNED · reel 01, the seven planets

> Here are the full seven minutes 🎧 [full link: 01-seven-planets]
>
> All seven are playing, each one that planet's real cycle raised by octaves:
> Moon 210.42 · Mercury 141.27 · Venus 221.23 · Sun 136.10 · Mars 144.72 · Jupiter 183.58 · Saturn 147.85 Hz
>
> The two that matter most in love are Venus (how you love) and the Moon (what you need to feel safe).
>
> Align reads both from your birthday, free: [link]

### Your sign · reel 02, the twelve gates

Twelve triggers, one per sign (the word and the glyph: `aries`, `♈`…). Each
gets its own 3-minute tone (`full/02-twelve-gates-<sign>.mp4`) and one line.

> ♈ **Aries** · ruled by Mars · 144.72 Hz ✦ [full link: aries]
> In love you need someone who matches your pace and doesn't flinch when you're direct.

> ♉ **Taurus** · ruled by Venus · 221.23 Hz ✦ [full link: taurus]
> In love you need consistency: the same warmth on a Tuesday as on a first date.

> ♊ **Gemini** · ruled by Mercury · 141.27 Hz ✦ [full link: gemini]
> In love you need someone who keeps you talking, and laughing, at 2am.

> ♋ **Cancer** · ruled by the Moon · 210.42 Hz ✦ [full link: cancer]
> In love you need a soft place to land, and someone who remembers the small things.

> ♌ **Leo** · ruled by the Sun · 136.10 Hz ✦ [full link: leo]
> In love you need to be adored out loud, by someone generous with their attention.

> ♍ **Virgo** · ruled by Mercury · 141.27 Hz ✦ [full link: virgo]
> In love you need care that shows up in the details, and someone who lets you rest.

> ♎ **Libra** · ruled by Venus · 221.23 Hz ✦ [full link: libra]
> In love you need it fair and gentle: a partner, not a project.

> ♏ **Scorpio** · ruled by Mars · 144.72 Hz ✦ [full link: scorpio]
> In love you need all of them or nothing, and the whole truth.

> ♐ **Sagittarius** · ruled by Jupiter · 183.58 Hz ✦ [full link: sagittarius]
> In love you need room to roam, and someone who wants to come along.

> ♑ **Capricorn** · ruled by Saturn · 147.85 Hz ✦ [full link: capricorn]
> In love you need someone serious about you: plans, not promises.

> ♒ **Aquarius** · ruled by Saturn · 147.85 Hz ✦ [full link: aquarius]
> In love you need a friend first, and room to be exactly yourself.

> ♓ **Pisces** · ruled by Jupiter · 183.58 Hz ✦ [full link: pisces]
> In love you need softness, and someone who feels it with you.

Every sign's DM ends the same way:

> Your sun sign is one planet. Your Venus and Moon say more about love. Align reads all of it from your birthday, free: [link]

### VENUS · reel 03, Venus and the Moon

> The ten-minute version 🎧 [full link: 03-venus-moon]
> Headphones on, both ears: Venus 221.23 Hz on the left, the Moon 210.42 Hz on the right.
>
> **Your Venus is how you need to be loved:**
> Aries: be direct, chase me a little · Taurus: be consistent · Gemini: talk to me, make me laugh · Cancer: make me feel safe · Leo: adore me out loud · Virgo: show it in what you do · Libra: be fair and gentle · Scorpio: all of you, and the truth · Sagittarius: adventure, no cages · Capricorn: plans, not promises · Aquarius: be my friend first · Pisces: be soft with me
>
> **Your Moon is what makes you feel safe:**
> Aries: honesty, making up fast · Taurus: routine · Gemini: talking it through · Cancer: being remembered · Leo: being shown you matter · Virgo: practical care · Libra: peace · Scorpio: loyalty, no secrets · Sagittarius: room to breathe · Capricorn: plans that hold · Aquarius: being accepted as you are · Pisces: someone who feels it with you
>
> Don't know yours? Your Moon needs your birth time. Align reads both free: [link]

### MUTUAL · reel 04, 639 Hz

> The full 639 Hz, ten minutes 💗 [full link: 04-heart-639]
>
> Say these slowly while it plays:
> I only align with people who move toward me too.
> Effort I have to beg for is not effort I want.
> I can love someone and still stop chasing them.
>
> It has to be mutual. On Align, a match only happens when you both choose each other: [link]

## Posting

- **Order:** 01 (the clearest "align" image) → 04 → 02 → 03. Then rerun the
  winner's format with new subjects (see below).
- Post each as a **trial reel** first (`instagram/` posts to several accounts
  and ranks by skip rate), and keep the version that holds people to the end.
- The sound is original, so it's safe. Don't swap in a trending sound: the
  tones are the content.
- Put the long versions on YouTube as a channel too. That's where this genre
  gets its long watch time, and every video description ends on the Align link.

## More reels in the same format

The engine's four modes take new scripts without new code:

- **planets:** "watch the three love planets line up" (Venus, Mars, the Moon);
  the planets lining up in tonight's real order in the sky.
- **gates:** the twelve houses ("fly through your chart. stop at the 7th");
  fire signs only, water signs only.
- **channels:** a binaural pair only works when the two tones are within
  about 30 Hz, so pick from these: Sun left, Mars right (8.62 Hz apart, "who
  you are, how you go after it"); Sun and Saturn (11.75 Hz); Mercury and
  Saturn (6.58 Hz, "what you say, what you mean").
- **heart:** 528 Hz with the same triangles; the twelve petals lighting in
  the order of the current season.
