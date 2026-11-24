# Cover headlines: what the reference accounts do, and what Align does instead

Research for the sky news carousel series. Sources: 26 screenshots of Instagram search results and carousels (the `news` and `sports news` search grids, plus the open posts), and the 90 Align posts in `news/posts/` (Dec 2026 – Feb 2027). Rewrites in section 5 are also in `cover-headlines.json`.

**Bottom line:** the references sell a specific, checkable fact, and they put a number, a named thing or a date in the first line. Align's covers mostly sell a mood. Of Align's 90 covers, 7 contain a digit and 33 have no time anchor at all; 9 use the same borrowed question. The sky data in `SKY.md` already has the exact times, degrees and day counts the covers need, so this can be fixed without inventing anything.

## 1. Transcription

43 headlines transcribed from the 26 screenshots (2 pairs were the same post: `88f2dc4e`/`7bf2b10c` are identical, and the tastebud, intels, startupbydoc and @technology covers show up both as grid tiles and opened). Headlines cut off by the screenshot edge are marked and left out of the averages. Words and characters are counted on the headline as printed, without kickers, tags or 'swipe' lines. Case: caps = all caps, title = Title Case, sentence = normal sentence case.

| # | account | screenshot | headline (as printed) | words | chars | case | structure | believability detail | emotional trigger | colour words and why |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | tastebud | c8cf17ab, 8b08070c | COCAINE FOUND IN EVERY SINGLE SHRIMP TESTED IN ENGLAND'S WATERWAYS | 10 | 66 | caps | claim (finding) | named place (England's waterways), totaliser 'every single', 'tested' implies a study | shock + curiosity (absurd pair) | pink: COCAINE / SHRIMP TESTED / ENGLAND'S. The three nouns that make the shock; glue words white |
| 2 | intels | c8cf17ab, fb44bb0b | NO MORE DOWN SYNDROME KIDS WILL BE BORN: JAPAN SCIENTISTS DELETE CHROMOSOME LINKED TO DISORDER | 15 | 94 | caps | claim (future) + colon explainer | named country + 'scientists' + 'chromosome' | shock, identity (overclaim; caption walks it back) | blue: DISORDER only. One payoff word at the end |
| 3 | unknown (McDonald's tile) | c8cf17ab | WARNING: LABS DNA-TESTED REVEALED THAT BURGERS FROM MCDONALD'S CONTAINS 2% OF HUMAN DNA INSIDE. | 14 | 95 | caps | warning + claim | brand (McDonald's), number (2%), 'labs DNA-tested' | fear, disgust | none; 'READ CAPTION' tag does the pull |
| 4 | technology | c8cf17ab, b1d4a91b, e34f3a75 | WHAT JUST HAPPENED AROUND THE WORLD IN THE LAST 24 HOURS? | 11 | 57 | caps | "what just happened" roundup question | time window (24 hours), slide count 1/16, faces collage | curiosity, FOMO, status (be the one who knows) | blue: WHAT / HAPPENED / AROUND / WORLD / LAST 24 HOURS. Alternates in 1-3 word runs; blue carries nouns and the number |
| 5 | NBC News | c8cf17ab | Jensen Huang is cheered by employees as he returns… (cut off) | – | – | sentence | plain news sentence (caption bar) | named person, dateline 'Santa Clara, Calif. Nov. 23' | status, curiosity | none |
| 6 | unknown (Kamala Harris tile) | c8cf17ab, 66709a43 | KAMALA HARRIS IS … AGAIN IN 2028 (partly cut off) | – | – | caps | "X is…" claim | named person + year 2028 | identity, politics | unreadable (cut off) |
| 7 | startupbydoc | 66709a43, a7d7d39f | Anthropic Publish A List of Jobs That Will Be Affected By Ai in 2027 | 14 | 68 | title | named source + list | named company, year 2027, prop sign 'NO JOBS AVAILABLE' | fear (am I on it?), money | pink bar: 'A List of Jobs That Will'. Marks the self-check payload |
| 8 | unknown (reel caption) | 66709a43 | NEWS: TRUMP LIKELY MADE A LOT OF MONEY TODAY | 9 | 44 | caps | "news:" label + claim | named person, 'today'; sub-caption '$12 million' | money, outrage | whole line in a red box (news chyron) |
| 9 | unknown (reel caption) | 66709a43 | Jensen Huang returns to Nvidia headquarters as employees chant his name | 11 | 71 | sentence | plain news sentence | named person + company + place | status, warmth | none (white caption box) |
| 10 | thebusinessmagnets | 66709a43, 6bf8cb83 | APPLE LOSES $108 BILLION IN MARKET VALUE AFTER UNVEILING IPHONE 17 | 11 | 66 | caps | number + cause | $108 billion, named company + product | money, shock | lavender box behind lines 1-2: the number line. Context line is plain |
| 11 | technology (2/16) | 13e439ee | A CLOSE LOOK AT THE VARIABLE APERTURE CAMERA ON THE NEW IPHONE 18 PRO, THE FIRST MECHANICAL APERTURE APPLE HAS SHIPPED | 21 | 118 | caps | inner slide: explainer + superlative ('the first') | named product + model number + 'first' | curiosity, status (gear) | blue: A CLOSE / VARIABLE APERTURE CAMERA / NEW / IPHONE 18 PRO / MECHANICAL / APERTURE APPLE / SHIPPED. Nouns and the product; glue white |
| 12 | technology (3/16) | b3275c59 | APPLE'S HARDWARE BOSS SAYS SEEING PEOPLE PUT SCREEN PROTECTORS ON IPHONES MAKES HIS SKIN CRAWL, SINCE THE DISPLAYS ARE BUILT DURABLE ENOUGH ALREADY | 23 | 147 | caps | inner slide: reported quote | named role (hardware boss), named product | identity (I use one), mild outrage | blue: APPLE'S HARDWARE BOSS / PEOPLE / SCREEN / PROTECTORS / IPHONES / SKIN CRAWL / DISPLAYS / DURABLE ENOUGH |
| 13 | technology (4/16) | 26664231 | SONY'S BLU-RAY PATENTS BEGIN EXPIRING IN 2026, ENDING ROYALTY COLLECTION. SOME SUSPECT IT EXPLAINS WHY SONY IS WALKING AWAY FROM PHYSICAL MEDIA | 22 | 143 | caps | inner slide: fact + speculation | named company + year 2026 + 'patents' | curiosity (the why) | blue: SONY'S BLU-RAY PATENTS / 2026 / ENDING ROYALTY / COLLECTION / SUSPECT IT EXPLAINS WHY SONY / AWAY / PHYSICAL MEDIA |
| 14 | feminaindia | 235a6007 | The Zodiac Signs Whose Lives Will Change The Most In 2027, Ranked | 12 | 65 | title | ranked list + superlative | year 2027, 'ranked', 12 slides counted down (1/13) | identity (find my sign), curiosity | none; serif italic white in a red heart |
| 15 | feminaindia (2/13) | 41f86fe9 | #12 Cancer. Cancer, your priorities are about to look very different. | 11 | 69 | sentence | inner rank slide: direct address | rank number, sign; body names Jupiter into Virgo | identity | red: '#12' rank numeral |
| 16 | feminaindia (3/13) | 6e6ba7ac | #11 Pisces. Pisces, you're finally learning to put yourself first. | 10 | 66 | sentence | inner rank slide: direct address | rank number, sign; body names Saturn and Neptune in Aries | identity, validation | red: '#11' |
| 17 | feminaindia (13/13) | 510453e6 | #1 Aquarius. Aquarius, we're not exaggerating when we say your life could look completely different. | 15 | 100 | sentence | inner rank slide: direct address, climax | rank #1, sign; body names Pluto in Aquarius + Feb/Aug eclipses | identity, status (I'm #1) | red: '#1' |
| 18 | collectiveworld | 88f2dc4e, 7bf2b10c | LEO IS ENTERING THEIR MOST EXPANSIVE ERA OF LUCK AND OPPORTUNITY IN 12 YEARS | 14 | 76 | caps | "X is entering…" + superlative + number | '12 years' (Jupiter's cycle); caption: 'since June 2026, Jupiter…' | identity, hope, status | none; white caps on a planet |
| 19 | todayyearsold | 7bdbf06e | THE INTERNET CELEBRATES THE END OF MERCURY RETROGRADE | 8 | 53 | caps | social-proof claim ('the internet') | named planet + event; caption 'three weeks' | belonging, relief | none |
| 20 | the_whisperwillow | a5a39a80 | SAGITTARIUS IS STEPPING INTO ITS LUCKIEST SEASON IN 2027 | 9 | 56 | caps | "X is stepping into…" + superlative | year 2027, Jupiter image | identity, hope | gold: LUCKIEST SEASON / IN 2027. The promise + the date |
| 21 | jacked | b8c80f08 | NEW CAMERA ANGLE SHOWS BILLS' GAME ENDING INT WAS A CATCH | 11 | 57 | caps | claim + evidence ('new camera angle shows') | named team, specific play | outrage, vindication (fans) | none |
| 22 | pubity | 6be6c8f7 | THIS IS HOW MUCH COUNTRIES PAY ATHLETES PER MEDAL AT THE 2026 WINTER OLYMPICS | 14 | 77 | caps | "this is how much…" | named event + year 2026 | money, curiosity gap (number withheld) | none |
| 23 | athletesandassets | f0de4e41 | THE HIGHEST PAID COLLEGE FOOTBALL ATHLETES OF 2026 | 8 | 50 | caps | superlative ranked list | year 2026; caption '$4 million in NIL, per @on3' | money, status | orange: COLLEGE FOOTBALL. The category, so fans self-select |
| 24 | unknown (sports grid) | 25d0586c | … OUT REST OF SEASON (cut off) | – | – | caps | injury news claim | season scope | shock (fans) | red: whole line |
| 25 | unknown (sports grid table) | 25d0586c | ranked table: '17 NFL: Eagles-Bills … 49 CFP National Championship: Ohio State-Notre Dame … 50 Monday Night Football: Vikings Bears' | – | – | mixed | ranked table (most-watched list) | 50 numbered rows, named teams, President Trump inauguration | curiosity, tribal (is my team on it) | rank numerals in red chips |
| 26 | complex | 25d0586c | THE 20 MOST INFLUENTIAL FEMALE ATHLETES RIGHT NOW | 8 | 49 | caps | number + superlative list | 20, 'right now' | status, identity | none; 'SWIPE FOR MORE' |
| 27 | bleacherreport / basketball | 25d0586c | BREAKING (giant word behind the player) | – | – | caps | "breaking" stamp | named player in a new jersey (image carries the news) | shock, urgency | the word itself is the art |
| 28 | bleacher (Jalen Hurts) | 25d0586c | JALEN HURTS WAS NOT ALLOWED TO SLEEP FOR 36 HOURS BEFORE HE PLAYED A GAME WITH A BLOOD CLOT | 19 | 91 | caps | claim + number | named player, 36 hours, medical detail | shock, awe | red: NOT / ALLOWED TO SLEEP. The violation |
| 29 | unknown | 25d0586c | My Favorite Newsletters About Women's Sports | 6 | 44 | title | personal list | none | identity | whole line yellow |
| 30 | unknown (salary grid) | 977c8796 | $18.5M / $12.5M / JOE BUCK $18M / MARIA TAYLOR $5M (partial ranked grid) | – | – | caps | ranked money grid | named people + exact salaries | money, status | numbers in white, largest type |
| 31 | unknown | 977c8796 | … DESPITE EARNING $43K+ PER WEEK (cut off) | – | – | caps | contrast claim ('despite') | $43K+ per week | money, outrage | none |
| 32 | Sports Illustrated | 977c8796 | ESPN will replace MLB 'Sunday Night Baseball' with a full slate of women's sports in 2026 | 16 | 89 | sentence | plain news claim + source ('via Variety') | named network, show, year, source | identity, change | red: women's sports. The news within the news |
| 33 | sportsish | 977c8796 | She's Adding Some Personality In the Paint | 7 | 42 | title | feature pun + dek | dek names Sarah Graves, Texas Women's Basketball | warmth, curiosity | none; serif |
| 34 | Kalshi Sports | 977c8796 | FIRED WHILE STILL ON AIR | 5 | 24 | caps | 4-word shock claim | ESPN logo + face carry the who | shock, schadenfreude | none; huge white |
| 35 | Daily Quick Dip | 977c8796 | THE NFL IS CREATING A PRO WOMEN'S FLAG FOOTBALL LEAGUE | 10 | 54 | caps | "X is creating…" claim | named league | identity, change | none; 'READ MORE' |
| 36 | ES (table) | 977c8796 | WORLD'S MOST PROFITABLE SPORTS TEAMS (1 Dallas Cowboys $629M, 2 Golden State Warriors $409M, 3 Edmonton Oilers $244M, 4 Los Angeles Rams $244M) | 5 | 36 | caps | superlative ranked table | rank + named team + $ value per row | money, tribal | rank chips in blue |
| 37 | watcher.guru | 977c8796, e54e19ed | THE MOST VALUABLE SPORTS TEAMS IN THE WORLD | 8 | 43 | caps | superlative ranked list | team logos on towers; caption 'the 5 most valuable' | status, tribal | green: MOST VALUABLE / TEAMS / WORLD. Superlative + scope |
| 38 | unknown | 2f4daa7e | 2026 NFL ROOKIE MINIMUM $885,000 | 5 | 32 | caps | number as headline | year + exact $ figure | money, envy | cyan: $885,000. The number is the headline |
| 39 | unknown | 2f4daa7e | … ALREADY WANTS TO LEAVE MIAMI (cut off) | – | – | caps | "X already wants…" claim | named city | drama | none |
| 40 | athlete | 2f4daa7e | NFL REFEREES AND THEIR FULL TIME JOBS | 7 | 37 | caps | list reveal | named league | curiosity gap | none |
| 41 | bleacherreport | 2f4daa7e | FIVE NEW SPORTS THAT WILL BE IN 2028 OLYMPICS | 9 | 45 | caps | number + list | five, 2028 | curiosity | yellow: FIVE. The count |
| 42 | FOX Soccer | 2f4daa7e | Cristiano: 'After the press conference of the national team, and following a conversation with the President of the Portuguese Football Federation, I have decided to leave the national team…' | 30 | 191 | sentence | quote (screenshot of a statement) | named person + federation, first person | shock, tribal | none; the screenshot is the proof |
| 43 | invested | 2f4daa7e | THE GOLDEN STATE VALKYRIES ARE SHATTERING SPORTS BUSINESS HISTORY | 9 | 65 | caps | superlative claim ('shattering… history') | named team | status, pride | whole headline lime |

**Across the 35 complete headlines:** mean 11.9 words / 71 characters (median 11 words / 65 chars). Covers only (leaving out the 6 inner slides): 10.9 words / 63 characters. 31 of 43 are all caps, 4 title case, 7 sentence case. The three astrology covers that are not Femina (collectiveworld, the_whisperwillow, todayyearsold) are all caps. 20 of 35 contain a digit; 30 name a specific person, company, place, sign or planet. Only 2 lean on a vague abstraction ("my favorite newsletters", "she's adding some personality"); both are soft feature covers, the least newsy tiles in either grid.

**Colour rules observed:**
- Colour marks meaning words: nouns, numbers, the shock. Glue words (the, in, of, on, has) stay white. It's never every other word.
- Three patterns: (a) **alternation** in 1–3 word runs (@technology blue/white, tastebud pink/white, watcher.guru green/white), where the colour runs, read alone, tell the story: "COCAINE … SHRIMP TESTED … ENGLAND'S"; (b) **one payoff word** at the end (intels: DISORDER) or the one category word (athletesandassets: COLLEGE FOOTBALL; B/R: FIVE); (c) **a box or bar behind the number line** (business magnets: "$108 BILLION IN MARKET VALUE"; startupbydoc: "A List of Jobs That Will").
- The number is coloured almost every time it appears (24 HOURS, $108 BILLION, 2026, FIVE, $885,000, IN 2027).
- Astrology accounts colour less: collectiveworld and todayyearsold use none; the_whisperwillow puts gold on the promise plus the year (LUCKIEST SEASON IN 2027).

## 2. The formulas that recur

### F1. **[Sign] is entering / stepping into [its most X era] [in time window]**
- Examples: collectiveworld "LEO IS ENTERING THEIR MOST EXPANSIVE ERA OF LUCK AND OPPORTUNITY IN 12 YEARS"; the_whisperwillow "SAGITTARIUS IS STEPPING INTO ITS LUCKIEST SEASON IN 2027"; Quick Dip "THE NFL IS CREATING A PRO WOMEN'S FLAG FOOTBALL LEAGUE"
- Why it works: The first word stops one-twelfth of the feed, and everyone else forwards it to their Leo. The present progressive makes it feel like news happening now. The time window (12 years, 2027) makes a soft claim feel measured. Align's honest version: the window must be a real ingress-to-egress span from SKY.md, and 'most X' must be something the sky can back up.

### F2. **[Sign], [planet] [does a thing] in your sign [number/date]**: the direct address
- Examples: Femina inner slides "Cancer, your priorities are about to look very different." / "Aquarius, we're not exaggerating…"; Align's own best covers ("aquarius, it's your season, and there's an eclipse in 16 days")
- Why it works: Second person + sign name = 'this is about me'. It works best when the next clause is a fact that has a date (Femina names Jupiter into Virgo in the body; the cover line should carry it).

### F3. **[Event] at [exact time]. [one blunt instruction]**: timestamp + advice
- Examples: tastebud and @technology's specificity (TESTED, LAST 24 HOURS), NBC's dateline "Nov. 23", Trump reel "…TODAY"
- Why it works: A clock time is the cheapest believability there is: it reads like a wire report, and it creates an appointment (people come back at 7:52 pm). The instruction gives the dating payoff without promising an outcome.

### F4. **[N] days until / for [event]**: countdown or duration
- Examples: "IN 12 YEARS", "FOR 36 HOURS" (Jalen Hurts), "IN THE LAST 24 HOURS"
- Why it works: A number of days turns a vague transit into a deadline (urgency) or a season (permission). It's also true and checkable, which is the honest form of urgency.

### F5. **What just happened [in place] in the last [N time]?**: the catch-up question
- Examples: @technology "WHAT JUST HAPPENED AROUND THE WORLD IN THE LAST 24 HOURS?" (1/16 and 1/14)
- Why it works: Promises completeness and recency; you swipe to be caught up and save it to be the one who knows. It works as a recurring slot only because the number (24 hours) and the 1/16 counter make it concrete. Without them it becomes wallpaper.

### F6. **[N] [things] in [time]: [the biggest one, named]**: number roundup
- Examples: B/R "FIVE NEW SPORTS THAT WILL BE IN 2028 OLYMPICS", complex "THE 20 MOST INFLUENTIAL FEMALE ATHLETES RIGHT NOW", watcher.guru caption "the 5 most valuable"
- Why it works: A count sets the swipe budget (I know how long this takes) and signals density. Naming the top item on the cover proves the list is real.

### F7. **[Event] [today/at time]. Here's who feels it / [N] signs feel it most**: the self-locating list
- Examples: startupbydoc "A LIST OF JOBS THAT WILL BE AFFECTED BY AI IN 2027"; Femina ranked
- Why it works: Am I on the list? Self-check content gets saves and tags. Naming how many signs ('3 signs') makes the list feel selective, which is a real result, not a horoscope for everyone. Keep the verb neutral ('feel it', not 'hit hardest') to stay off fear-bait.

### F8. **"[Viral claim]." [We checked / the fact-check]**: quote + verdict
- Examples: tastebud's community note ("actually true but slightly misleading for views"), Cristiano's quoted statement, @technology 3/16 "APPLE'S HARDWARE BOSS SAYS…", todayyearsold "THE INTERNET CELEBRATES…"
- Why it works: A quote borrows someone else's authority or someone else's wrongness. The community note is the proof that correction itself spreads. Align takes the note's side: quote the myth, promise the check, add the date that makes it timely.

### F9. **The [superlative] [thing] [scope]**: superlative, sourced
- Examples: watcher.guru "THE MOST VALUABLE SPORTS TEAMS IN THE WORLD", athletesandassets "THE HIGHEST PAID COLLEGE FOOTBALL ATHLETES OF 2026", @technology "THE FIRST MECHANICAL APERTURE APPLE HAS SHIPPED", invested "SHATTERING SPORTS BUSINESS HISTORY"
- Why it works: Superlatives promise the top of a hierarchy (status). They read as news only with a scope (in the world, of 2026, first). For Align, a superlative is only allowed when SKY.md supports it (e.g. the only Sun–Jupiter aspect of Sagittarius season).

### F10. **The [N] [group] whose [X] changes the most in [period], ranked**
- Examples: Femina "THE ZODIAC SIGNS WHOSE LIVES WILL CHANGE THE MOST IN 2027, RANKED" (#12 → #1 over 13 slides); ES "WORLD'S MOST PROFITABLE SPORTS TEAMS" table
- Why it works: Everyone has a sign, so everyone is in it; the countdown keeps swipe-through high, and people tag friends at their rank. The cover can tease #1 without naming it.

Also seen but **not for Align**: the **WARNING / BREAKING / NEWS:** label stacked on a claim (McDonald's DNA, intels, "NEWS: TRUMP…") and the definitive future claim ("NO MORE … WILL BE BORN"). They win reach by overclaiming and earn community notes. Align can use `breaking` as a visual word for real events (it already does), not as a fear label.

## 3. Critique of Align's 90 hooks

Measured on the actual `slides[0].headline` of every post file, with highlight markup stripped. (CALENDAR.md matches these except for a few small wording differences.)

| measure | references (complete headlines) | Align now | Align rewrites (section 5) |
|---|---|---|---|
| mean words | 11.9 | 8.8 | 11.2 |
| mean characters | 71 | 49 | 60 |
| shortest / longest (chars) | 24 / 191 | 25 / 67 | 48 / 64 |
| names a sign | astrology covers: 2 of 4 (leo, sagittarius); every femina inner slide | 42 of 90 (46%) | 53 of 90 (58%) |
| names a planet or lunar event | n/a | 58 of 90 | 76 of 90 |
| contains a digit (time, date, count, degree) | 20 of 35 (57%) | **7 of 90 (7%)** | 66 of 90 (73%) |
| has a calendar anchor (digit, weekday or month) | | 21 of 90 | 77 of 90 |
| only a soft anchor ('today', 'tonight', 'this week') | | 36 of 90 | 6 of 90 |
| no time anchor at all | | 33 of 90 | 7 of 90 |
| case | 31 caps / 4 title / 7 sentence | lowercase italic serif | lowercase in JSON, caps on render (see §4) |

**Vague or poetic instead of newsy.** 24 covers name no sign, no planet and no number. 19 more lean on a quip or metaphor where the fact should be ("the truth gets the lights on", "ends on a good note", "the leftovers are dramatic", "you can unclench"). Together that is **36 of 90** covers that are mood lines a reader cannot act on, check, or forward with "this is you".

**Repetition.** The series reuses a handful of frames so often that the grid looks like one post:
- what just happened in the sky…: **9**
- …here's / here is who feels it / who this hits / who it hits: **8**
- love weather: …: **7**
- X hands the keys to Y: **3**
- the signs whose X changes the most, ranked: **3**
- the moon is in X. (quip): **6**
- quoted myth “…”: **7**
- Identical cover text used more than once: "what just happened in the sky this week?" ×5

**What's actually wrong, bluntly:**
1. **No numbers.** The references' believability comes from the digit: $108 billion, 24 hours, 36 hours, 2%, 2026. Align has exact times, degrees and day counts for every event in SKY.md and puts them in the `dek` or the caption. Only 7 of 90 covers carry a digit. The thing that would make a cover feel like news is filed one slide too late.
2. **It hides the event.** "a calm week with one lucky friday" is a sun–jupiter trine; "the holiday week in the sky" is a full moon in cancer; "the last week of 2026 ends on a good note" is two trines to mars on new year's eve. The cover describes the feeling and makes the reader swipe to learn *what happened*, and most won't.
3. **Borrowed template without the engine.** "what just happened in the sky this week?" copies @technology's words but not the 24-hour window or the 16-item count that make it work. Used 5 times word for word (9 with variants), it stops registering by the second Sunday.
4. **The sign arrives too late or not at all.** Only 42 of 90 covers name a sign. Sign names are the one self-selecting device every astrology reference uses. Where Align does name the sign first ("aquarius, it's your season, and there's an eclipse in 16 days"), the cover is among the strongest in the set.
5. **Lowercase italic reads as poetry, not news.** In the search grid (tiles ~1/3 width), the references are condensed caps stacked 3–5 lines; Align's soft italic is the visual equivalent of the soft copy. Together they read as a mood board.
6. **What's already good and should stay:** the honesty (myth checks with a verdict), the dating angle in the second clause, and the best covers: "aquarius, it's your season, and there's an eclipse in 16 days", "“your 300-year karmic debt is erased at the eclipse”", "three planets changed direction this week", "mars turns retrograde in virgo today. here's who feels it". These are the template for the rest.

### The 10 weakest

| date | current cover | why it fails |
|---|---|---|
| 2026-12-01 | what's coming in december | 4 words, zero facts. No planet, no sign, no number, no reason to swipe today rather than never. Nine dated events sit inside the post. |
| 2026-12-14 | a calm week with one lucky friday | 'calm' is an anti-hook: it tells you to scroll on. The lucky friday has a name (sun trine jupiter) and the cover hides it. |
| 2026-12-22 | the holiday week in the sky, before the family asks | A mood, not news. A full moon in cancer lands on the 23rd and the cover never says so. |
| 2026-12-28 | the last week of 2026 ends on a good note | Vague reassurance. 'good note' = 2 trines to mars on new year's eve, which is concrete and shareable. |
| 2026-12-26 | the moon is in leo and the leftovers are dramatic | A joke about leftovers, not the sky. The actual event, mercury square neptune (mixed signals), is missing. |
| 2027-01-18 | new season, full moon, and the one text you've been drafting | Two events with no names or days. Which season? Which full moon? When? |
| 2027-02-15 | the loudest week of february, day by day | An unbacked superlative. 7 events in 4 days, including an eclipse, is the proof; it isn't there. |
| 2027-01-23 | the morning after the full moon. the moon's still in leo | Reads like a diary. Says the same thing twice and nothing happens. |
| 2027-01-25 | the sun meets pluto today. the truth gets the lights on | The fact is good; the payoff is a metaphor that nobody can picture or act on. |
| 2026-12-06 (+4 more) | what just happened in the sky this week? | Borrowed verbatim from @technology and run 5 times word for word (9 with variants). The reference earns it with '24 hours' and a 16-slide count; ours has no number, no detail, and becomes wallpaper by week 2. |

## 4. Rules for Align sky-news cover headlines

**Case: yes, set covers in caps, but only on the render.** Keep the JSON lowercase (house voice rule, and inner slides stay lowercase italic). Add `text-transform: uppercase` to the h1 on `cover`, `hero` and `breaking` layouts only, in an upright face rather than the italic, with tighter tracking. Why: 31 of 43 reference headlines are caps, including 3 of the 4 astrology covers, and caps is what makes a tile read as *news* at grid size. Femina (title-case serif) shows a soft cover can work, but it has a big media brand behind it and a ranked-list hook doing the work. Ship it as an A/B on two weeks of covers before changing the whole set; the copy rules below matter more than the case.

**Length:** 8–12 words, 64 characters maximum on every layout (aim for 50–62). That's 2–3 lines of caps at cover size, and it fits the checker's tightest limit (64 on `breaking`/`split`; cover/hero allow 72, but don't use the extra). The references average about 12 words but that includes 25-word inner slides. Align's current average is fine; the content is the problem.

**Structure: fact first, then the dating line.**
1. Clause 1 is the news: **[sign or planet] + [verb] + [sign] + [time anchor]**. Clause 2 (optional, ≤ 6 words) is the reading or the instruction: "send the first text", "say the soft thing", "3 signs feel it most".
2. **Every cover carries one hard anchor**: a clock time ("7:52 pm"), a weekday ("saturday"), a date ("feb 6"), or a count ("7 days", "3 signs", "88 days"). Use ET times from SKY.md (the posting zone). Counts must be computed from SKY.md (days between two listed events, events in a listed week, signs in the post's tier list).
3. **Name the sign** whenever the event happens in one. Sign-first ("virgo, …") for sign callouts; planet-first ("mars turns retrograde in virgo…") for event posts.
4. **One idea per cover.** If two events, join them with a comma or "and", never a metaphor.
5. **Reuse a frame at most once a week, and never word for word.** "what just happened in the sky this week?" stays as the Sunday slot, but always with a number or the week's headline event after it.

**Colour: two-colour, semantic, 2–3 runs.** Extend `*word*` so the renderer can draw two accents (e.g. `*word*` = sign colour, `**word**` or a new `^word^` = gold):
- **Sign colour** on the sign name (or the season: "capricorn season").
- **Gold** on the planet/event *or* the number/time, whichever carries the news ("mars", "7:52 pm", "88 days"). Like the references, colour the number when there is one.
- Bone on everything else. Never colour glue words, never alternate mechanically, never more than 3 runs. Read the coloured words alone: they should tell the story ("MARS … VIRGO … 4 SIGNS").
- In `cover-headlines.json`, `highlight` lists those runs in reading order; the first sign in the post's `signs` sets the sign colour, as now.

**Numbers, dates, planets, signs: honest by construction.**
- Every number, time, date and sign on a cover must be traceable to a line in `data/SKY.md` or a count over it. No cycle lengths, no "first time in X years", no visibility claims (none of those are in SKY.md).
- Superlatives only when the data backs them up: "luckiest day of your season" is OK for the only sun–jupiter aspect of sagittarius season, framed as astrology's reading. "Busiest/loudest week" needs the count next to it ("7 sky events in 4 days").
- The sky clause is stated as fact (it is). The dating clause is an instruction or a reading, never a promise: "send the first text", not "they'll text back". No outcome verbs (will fall in love, will break up), no doom words outside a quoted myth that the post then checks.
- Retrograde = "turns retrograde"/"backs into"/"in reverse" on covers; the inner slide explains the apparent motion.
- Myths: quote the claim the way people say it, then promise the check ("we checked", "the feb 6 fact-check"). The verdict can go on the cover when it's a strong reversal ("it won't go red").

## 5. All 90 covers, rewritten

Every rewrite uses only events in that post's `facts` or the matching SKY.md line; times are ET from SKY.md; day counts are date differences between SKY.md events. All are ≤ 64 characters, inside the checker's limit for every layout. Highlighted runs are in **bold**. Formula codes refer to section 2.

| date | layout | current | rewritten | formula | source in SKY.md |
|---|---|---|---|---|---|
| 2026-12-01 | cover | what's coming in december | december's sky in **8 dates**: **venus** moves into **scorpio** on the 4th | F6 number roundup | venus → scorpio 12-04 3:15 am; 9 events on 8 dates, dec 4–25 |
| 2026-12-02 | cover | is your sign ophiuchus now? | is your sign **ophiuchus** now? the **13th-sign** claim, checked | F8 claim, checked | myth check (no sky event) |
| 2026-12-03 | hero | scorpio, venus moves in tomorrow. people are going to notice | **scorpio** is entering its **venus era**: friday through jan 7 | F1 sign is entering | venus → scorpio 12-04 (fri); venus → sagittarius 01-07 |
| 2026-12-04 | split | love weather: venus in scorpio | **venus** is in **scorpio** for the next **34 days**. date like you mean it | F4 planet + duration | venus → scorpio 12-04, → sagittarius 01-07 = 34 days |
| 2026-12-05 | hero | the moon is in scorpio. so is venus. text carefully | the **moon** and **venus** are both in **scorpio**. read twice, text once | F3 timestamp + advice | moon → scorpio 12-04 11:35 pm; venus in scorpio |
| 2026-12-06 | cover | what just happened in the sky this week? | what **just happened** in the sky in the last **7 days**? **4 big moves** | F5 what just happened | 4 events dec 1–6 (last quarter virgo, venus → scorpio, mars □ uranus, mercury → sag) |
| 2026-12-07 | cover | the sky's busiest week of december starts now | **7 sky events** in **5 days**. the **new moon** goes first, tuesday | F6 number roundup | 7 events dec 8–12; new moon sag 12-08 (tue) |
| 2026-12-08 | hero | new moon in sagittarius, tonight | **new moon** in **sagittarius** at **7:52 pm**. send the first text | F3 timestamp + advice | new moon sagittarius 12-08 7:52 pm |
| 2026-12-09 | cover | does jupiter really move backwards on saturday? | **jupiter** 'goes backwards' **saturday**. does it actually? we checked | F8 claim, checked | jupiter stations retrograde 12-12 (sat) |
| 2026-12-10 | hero | aries, saturn stops backing up today. so can you | **aries**, **saturn** turns direct in your sign today. neptune **saturday** | F2 sign address + date | saturn direct 12-10 7.9° aries; neptune direct 12-12 1.6° aries |
| 2026-12-11 | split | venus and mars finally agree. ask them out this weekend | **venus** and **mars** click saturday morning. ask them out **this weekend** | F3 timestamp + advice | venus sextile mars 12-12 4:16 am (sat) |
| 2026-12-12 | breaking | jupiter turns backwards in leo tonight. here is who feels it | **jupiter** turns retrograde in **leo** at 7:59 pm. **3 signs** feel it most | F7 event + who feels it | jupiter stations retrograde 12-12 7:59 pm, 27° leo; tier one = 3 signs |
| 2026-12-13 | cover | three planets changed direction this week. catch up | **3 planets** changed direction in **3 days**. here's your catch-up | F5 what just happened | saturn direct 12-10, neptune direct + jupiter rx 12-12 |
| 2026-12-14 | split | a calm week with one lucky friday | this week's one **lucky day**: **friday**, when the sun trines **jupiter** | F9 superlative, sourced | sun trine jupiter 12-18 4:21 pm (fri) |
| 2026-12-15 | cover | the signs whose december changes the most, ranked | **12 signs**, **ranked** by december. **#1** gets the solstice | F10 ranked twelve | #1 capricorn: sun → capricorn 12-21 (solstice) |
| 2026-12-16 | cover | does the full moon make people act crazy? | does the **full moon** make people act crazy? the **dec 23** fact-check | F8 claim, checked | full moon cancer 12-23 |
| 2026-12-17 | hero | sagittarius, the luckiest day of your season is tomorrow | **sagittarius**, your season's **luckiest day** is tomorrow, **4:21 pm** | F9 superlative, sourced | sun trine jupiter 12-18 4:21 pm; sun → capricorn 12-21 |
| 2026-12-18 | cover | love weather for party season: go talk to them | the **sun** trines **jupiter** today. love weather says: **go talk to them** | F3 timestamp + advice | sun trine jupiter 12-18 |
| 2026-12-19 | hero | the moon changes sign this afternoon. plan the date for tonight | the **moon** enters **taurus** at **3:30 pm**. book the dinner for after | F3 timestamp + advice | moon → taurus 12-19 3:30 pm |
| 2026-12-20 | cover | what just happened in the sky this week? | the **solstice** is **tomorrow**. first, this week's sky in **5 moves** | F5 catch-up, with a number | 5 events in post dec 17–21; sun → capricorn 12-21 (solstice) |
| 2026-12-21 | split | sagittarius hands the keys to capricorn | **capricorn season** starts at **3:50 pm**. define the relationship | F1 sign is entering | sun → capricorn 12-21 3:50 pm |
| 2026-12-22 | cover | the holiday week in the sky, before the family asks | **christmas week**: a **full moon** in **cancer**, 2 days before the 25th | F6 number roundup | full moon cancer 12-23 |
| 2026-12-23 | breaking | full moon in cancer, tonight | **full moon** in **cancer** at **8:28 pm** tonight. say the soft thing | F3 timestamp + advice | full moon cancer 12-23 8:28 pm |
| 2026-12-24 | hero | capricorn, mercury moves in tomorrow. you get the last word of 2026 | **capricorn**, **mercury** moves in on **christmas**. say what you mean | F2 sign address + date | mercury → capricorn 12-25 1:23 pm |
| 2026-12-25 | cover | love weather for christmas: the gift is a straight answer | **mercury** enters **capricorn** today. the gift is a **straight answer** | F3 timestamp + advice | mercury → capricorn 12-25 |
| 2026-12-26 | hero | the moon is in leo and the leftovers are dramatic | moon in **leo**, **mercury** square **neptune**. reread before you send | F3 timestamp + advice | moon → leo 12-25; mercury □ neptune 12-26 2:50 pm |
| 2026-12-27 | cover | what just happened in the sky over the holidays? | what **just happened** in the sky over **christmas**? **6 moves** | F5 what just happened | 6 events dec 21–26 incl. full moon cancer |
| 2026-12-28 | cover | the last week of 2026 ends on a good note | **2026**'s last week: 2 squares, then **2 trines** on **new year's eve** | F6 number roundup | sun □ saturn 12-29, mercury □ saturn 12-30; sun △ mars + mercury △ mars 12-31 |
| 2026-12-29 | hero | the sun squares saturn tonight. the year-end reality check | the sun squares **saturn** at **6:24 pm**. **4 signs** get a reality check | F7 event + who feels it | sun □ saturn 12-29 6:24 pm; tier one = 4 signs |
| 2026-12-30 | cover | is jan 1 really a cosmic reset? | is **jan 1** really a cosmic reset? the sky's actual reset is **jan 7** | F8 claim, checked | new moon capricorn 01-07 |
| 2026-12-31 | hero | the moon is in libra for the midnight kiss. ask nicely | the **moon** is in **libra** at **midnight**. ask before the new year's kiss | F3 timestamp + advice | moon → libra 12-29, → scorpio 01-01 5:15 am |
| 2027-01-01 | cover | new year, new sky. what's coming in january | january's sky in **6 dates**: **mars** turns **retrograde** on the 10th | F6 number roundup | 7 events on 6 dates (jan 1, 7, 10, 20, 22, 25); mars rx 01-10 |
| 2027-01-02 | hero | day two of the year and the moon is in scorpio | day 2 of 2027: the **moon** joins **venus** in **scorpio**. don't overread | F3 timestamp + advice | moon → scorpio 01-01; venus in scorpio until 01-07 |
| 2027-01-03 | cover | what just happened in the sky over new year? | what **just happened** in the sky over new year? **6 aspects** in **6 days** | F5 what just happened | 6 aspects 12-29 → 01-03 |
| 2027-01-04 | hero | this week, mars hits the brakes. here's everything else | **mars** stops and turns retrograde **sunday**. plus a **new moon** thursday | F6 number roundup | new moon capricorn 01-07 (thu); mars rx 01-10 (sun) |
| 2027-01-05 | cover | the signs whose january changes the most, ranked | **12 signs**, **ranked** by january. **#1** has mars in reverse | F10 ranked twelve | #1 virgo: mars stations retrograde in virgo 01-10 |
| 2027-01-06 | cover | “anything that starts in mars retrograde is doomed” | “dates started in **mars retrograde** are doomed.” we **checked** | F8 claim, checked | mars stations retrograde 01-10 |
| 2027-01-07 | hero | new moon in capricorn, today. the real new year starts now | **new moon** in **capricorn** at **3:25 pm**. this is the real new year | F3 timestamp + advice | new moon capricorn 01-07 3:25 pm |
| 2027-01-08 | split | love weather: venus swapped scorpio for sagittarius | **27 days** of **venus** in **sagittarius**. say yes to the spontaneous date | F4 planet + duration | venus → sagittarius 01-07, → capricorn 02-03 = 27 days |
| 2027-01-09 | cover | mars stops tomorrow. today, the moon's in aquarius | **mars** turns retrograde tomorrow, **8 am**. today: moon in **aquarius** | F3 timestamp + advice | mars rx 01-10 8:00 am; moon → aquarius 01-08 |
| 2027-01-10 | breaking | mars turns retrograde in virgo today. here's who feels it | **mars** turns retrograde in **virgo** at 8 am. **4 signs** feel it most | F7 event + who feels it | mars rx 01-10 8:00 am, 10.4° virgo; tier one = 4 signs |
| 2027-01-11 | cover | this week, your texts get cooler and your crush gets louder | **mercury** enters **aquarius** wednesday. your **texts** get cooler | F3 timestamp + advice | mercury → aquarius 01-13 (wed) |
| 2027-01-12 | hero | mercury walks into aquarius tomorrow. who this hits | **mercury** enters **aquarius** at 1:06 am tomorrow. **4 signs** feel it | F7 event + who feels it | mercury → aquarius 01-13 1:06 am; tier one = 4 signs |
| 2027-01-13 | cover | “mercury in aquarius makes everyone emotionally unavailable” | **emotionally unavailable**? **mercury** in **aquarius**, fact-checked | F8 claim, checked | mercury → aquarius 01-13 |
| 2027-01-14 | hero | virgo, mars is parked in your sign and it's in reverse | **virgo**, **mars** is reversing in your sign for **38 more days** | F2 sign address + number | mars rx in virgo; mars → leo 02-21 = 38 days from 01-14 |
| 2027-01-15 | split | love weather: venus wants it, mars isn't ready | **venus** squares **mars** **saturday**. wanting it isn't the same as ready | F3 timestamp + advice | venus □ mars 01-16 (sat) |
| 2027-01-16 | hero | the moon is in taurus. you're allowed to stay in | the moon's in **taurus** and **venus** squares **mars** at 4:38 pm. stay in | F3 timestamp + advice | moon → taurus 01-15 11:44 pm; venus □ mars 01-16 4:38 pm |
| 2027-01-17 | cover | what just happened in the sky this week? | **mars** reversed, mercury met **pluto**: this week's sky in **5 moves** | F5 catch-up, with a number | 5 events jan 10–16: mars rx 01-10, mercury ☌ pluto 01-15 … |
| 2027-01-18 | hero | new season, full moon, and the one text you've been drafting | **aquarius season** wednesday, **full moon** in leo **friday**. hit send | F6 number roundup | sun → aquarius 01-20 (wed); full moon leo 01-22 (fri) |
| 2027-01-19 | cover | the full moon in leo is friday. here's who it hits | **full moon** in **leo** friday, 7:17 am. **5 signs** most likely to say it | F7 event + who feels it | full moon leo 01-22 7:17 am; list = 5 signs |
| 2027-01-20 | split | capricorn hands the keys to aquarius | **aquarius season** starts at 2:30 am, with an **eclipse** **17 days** out | F1 sign is entering | sun → aquarius 01-20 2:30 am; solar eclipse 02-06 = 17 days |
| 2027-01-21 | cover | aquarius, it's your season, and there's an eclipse in 16 days | **aquarius**, it's your season and the **eclipse** is in **16 days** | F2 sign address + number | sun → aquarius 01-20; solar eclipse aquarius 02-06 = 16 days |
| 2027-01-22 | hero | full moon in leo, today. say it with your whole chest | **full moon** in **leo** at **7:17 am**. say it with your whole chest | F3 timestamp + advice | full moon leo 01-22 7:17 am |
| 2027-01-23 | cover | the morning after the full moon. the moon's still in leo | **mercury** sextiles **venus** at **5:33 pm**. text first, explain later | F3 timestamp + advice | mercury sextile venus 01-23 5:33 pm |
| 2027-01-24 | cover | what just happened in the sky this week? | this week in the sky: **aquarius season**, then a **full moon** in **leo** | F5 catch-up, with a number | sun → aquarius 01-20; full moon leo 01-22 |
| 2027-01-25 | split | the sun meets pluto today. the truth gets the lights on | the **sun** meets **pluto** today at 3 am. **6 sky events** this week | F6 number roundup | sun ☌ pluto 01-25 3:00 am; 6 events in post |
| 2027-01-26 | hero | two planets hit jupiter this week. who gets the luck | **2 planets** hit **jupiter** by thursday. here's who gets the **luck** | F7 event + who feels it | mercury ☍ jupiter 01-27; venus △ jupiter 01-28 (thu) |
| 2027-01-27 | cover | “your 300-year karmic debt is erased at the eclipse” | “your **300-year** karmic debt is erased at the eclipse.” **checked** | F8 claim, checked | solar eclipse aquarius 02-06 |
| 2027-01-28 | hero | sagittarius, venus is in your sign and jupiter just said yes | **sagittarius**, **venus** in your sign trines jupiter at **9:13 pm** | F2 sign address + timestamp | venus △ jupiter 01-28 9:13 pm |
| 2027-01-29 | cover | love weather: venus just met luck. use the weekend | venus just trined **jupiter**. **5 days** left of venus in **sagittarius** | F4 planet + duration | venus △ jupiter 01-28; venus → capricorn 02-03 = 5 days |
| 2027-01-30 | breaking | one week until the ring of fire eclipse in aquarius | **7 days** until the **ring of fire** eclipse in **aquarius**, feb 6 | F4 countdown | annular solar eclipse aquarius 02-06 |
| 2027-01-31 | hero | what just happened in the sky this week? mercury just went dreamy | what **just happened** in the sky? and **mercury** enters **pisces** tonight | F5 what just happened | mercury → pisces 01-31 8:27 pm |
| 2027-02-01 | cover | what's coming in february: two eclipses and a mercury retrograde | february's sky: **2 eclipses** and a **mercury retrograde** in **28 days** | F6 number roundup | solar eclipse 02-06, lunar eclipse 02-20, mercury rx 02-09 |
| 2027-02-02 | cover | the signs whose february changes the most, ranked | **12 signs**, **ranked** by february. #1 gets an **eclipse** | F10 ranked twelve | #1 aquarius: solar eclipse in aquarius 02-06 |
| 2027-02-03 | hero | capricorn, venus just moved into your sign. until march 1 | **capricorn**, **venus** moves into your sign at 9:30 am. for **26 days** | F2 sign address + number | venus → capricorn 02-03 9:30 am, → aquarius 03-01 = 26 days |
| 2027-02-04 | cover | “mercury retrograde breaks your phone” | “**mercury retrograde** breaks your phone.” **tuesday**'s fact-check | F8 claim, checked | mercury stations retrograde 02-09 (tue) |
| 2027-02-05 | hero | a ring of fire eclipse in aquarius, tomorrow | tomorrow, **10:59 am**: a **ring of fire** eclipse in **aquarius** | F4 countdown | solar eclipse (annular) aquarius 02-06 10:59 am |
| 2027-02-06 | breaking | a ring of fire in aquarius, today | **ring of fire** eclipse in **aquarius** at **10:59 am**. new moon, new deal | F3 timestamp + advice | solar eclipse (annular) aquarius 02-06 10:59 am; new moon |
| 2027-02-07 | cover | what just happened in the sky this week? | an **eclipse** and **venus** trine mars: what **just happened** this week | F5 what just happened | solar eclipse 02-06; venus △ mars 02-07 |
| 2027-02-08 | hero | gemini, uranus stops reversing in your sign today | **gemini**, **uranus** turns direct in your sign at **7:23 am** today | F2 sign address + timestamp | uranus direct 02-08 7:23 am, 1.7° gemini |
| 2027-02-09 | breaking | mercury turns backwards today. here's who feels it | **mercury** turns retrograde today for **22 days**. **3 signs** feel it most | F7 event + who feels it | mercury rx 02-09, direct 03-03 = 22 days; hits hardest = 3 signs |
| 2027-02-10 | split | the sun and jupiter face off: big feelings, both directions | **sun** opposes **jupiter** at **7:28 pm**: aquarius vs leo, big feelings | F3 timestamp + advice | sun ☍ jupiter 02-10 7:28 pm (aquarius / leo) |
| 2027-02-11 | cover | “three planets are moving backwards right now” | **3 planets** are **retrograde**. are any actually moving **backwards**? | F8 claim, checked | mercury, mars, jupiter retrograde on 02-11 |
| 2027-02-12 | hero | aquarius, an eclipse, pluto and the sun, all in your sign this week | **aquarius**, the **eclipse** was in your sign. the sun leaves in **6 days** | F2 sign address + number | solar eclipse aquarius 02-06; sun → pisces 02-18 = 6 days |
| 2027-02-13 | hero | a full moon eclipse in virgo, one week out. the subtle kind | **7 days** until a full moon **eclipse** in **virgo**, the subtle kind | F4 countdown | penumbral lunar eclipse virgo 02-20 |
| 2027-02-14 | split | valentine's: venus wants a plan, mars is still walking backwards | **valentine's**: **venus** in capricorn, **mars** in reverse. make a plan | F3 timestamp + advice | venus in capricorn; mars retrograde |
| 2027-02-15 | cover | the loudest week of february, day by day | **7 sky events** in **4 days**: an **eclipse**, a new season, mars into leo | F6 number roundup | 7 events 02-18 → 02-21 |
| 2027-02-16 | cover | mars backs into leo on sunday. here's who feels it | **mars** backs into **leo** sunday at 9:15 am. **3 signs** feel it most | F7 event + who feels it | mars → leo (rx) 02-21 9:15 am (sun); hits hardest = 3 signs |
| 2027-02-17 | cover | “saturday's blood moon will change everything” | “saturday's **blood moon** will change everything.” it won't go **red** | F8 claim, checked | lunar eclipse (penumbral) virgo 02-20 (sat) |
| 2027-02-18 | split | aquarius hands the keys to pisces | **pisces season** starts at **4:33 pm**, with **mercury** still retrograde | F1 sign is entering | sun → pisces 02-18 4:33 pm; mercury rx |
| 2027-02-19 | split | tomorrow: a full moon eclipse in virgo that barely shows | tomorrow **6:12 pm**: a full moon **eclipse** in **virgo** you'll barely see | F4 countdown | penumbral lunar eclipse virgo 02-20 6:12 pm |
| 2027-02-20 | hero | full moon eclipse in virgo tonight. no red moon, still counts | full moon **eclipse** in **virgo** at **6:12 pm**. no red moon, still counts | F3 timestamp + advice | penumbral lunar eclipse virgo 02-20 6:12 pm |
| 2027-02-21 | hero | leo, mars is back in your sign, walking backwards | **leo**, **mars** and **jupiter** are both in your sign now, both retrograde | F2 sign address + number | mars → leo (rx) 02-21; jupiter rx in leo |
| 2027-02-22 | cover | after two eclipses, the sky gives you a quiet week | after **2 eclipses**, a **quiet week**. mercury turns direct in **9 days** | F6 number roundup | mercury direct 03-03 = 9 days |
| 2027-02-23 | hero | the last stretch of mercury retrograde. who it hits now | **8 days** of **mercury retrograde** left. **3 signs** still feel it | F7 event + who feels it | mercury direct 03-03 = 8 days; hits hardest = 3 signs |
| 2027-02-24 | cover | “there's a 13th sign and yours just changed” | “there's a **13th sign** and yours just changed.” we **checked** the sky | F8 claim, checked | myth check (sun in pisces) |
| 2027-02-25 | cover | virgo, mars finally left your sign. you can unclench | **virgo**, **mars** left your sign after **88 days**. you can unclench | F2 sign address + number | mars → virgo 11-25, → leo 02-21 = 88 days |
| 2027-02-26 | hero | love weather: venus' last weekend in capricorn | **venus** leaves **capricorn** monday. **last weekend** for the serious date | F4 countdown | venus → aquarius 03-01 1:32 am (mon) |
| 2027-02-27 | hero | the moon's in sagittarius: say it straight, today | the **moon** is in **sagittarius** from 5:52 am. **say it straight** today | F3 timestamp + advice | moon → sagittarius 02-27 5:52 am |
| 2027-02-28 | cover | what just happened in the sky this february? | what **just happened** in **february**'s sky? **2 eclipses**, to start | F5 what just happened | solar eclipse 02-06, lunar eclipse 02-20 |

### Notes on the rewrites

- **dec-12**: the cover says 3 signs because the post's tier one lists 3 (leo, aquarius, scorpio), even though `signs` has 5.
- **jan-19**: '5 signs most likely to say it' matches the post's list slide ("most likely to say it out loud on friday").
- **jan-21 / feb-12**: the old feb-12 cover said the eclipse was in aquarius 'this week'; it was the week before (feb 6). The rewrite fixes that.
- **dec-31**: the moon is in libra until 5:15 am ET on jan 1, so 'at midnight' holds in New York.
- **feb-25**: mars entered virgo 2026-11-25 6:37 pm and left 2027-02-21 9:15 am: 87.6 days, rounded to 88.
- **Ranked covers** tease #1 by its event (the solstice / mars in reverse / an eclipse) without naming the sign, so the countdown still pays off on slide 13.
- Inner slides, deks and captions are untouched. Where a dek repeats the new cover's time (e.g. dec-08 '7:52 pm et'), trim the dek when applying.
