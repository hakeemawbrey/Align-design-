#!/usr/bin/env python3
"""Round 2 of the v3 farm: 1,540 new topics (770 star_talk, 770 star_advice) -> batches/r2-001.json ... r2-154.json.

Each batch has 10 items, 5 per account, interleaved (talk, advice, talk, advice, ...). Ids r2t0001.. (star_talk) and
r2a0001.. (star_advice). music: key cycles C/D/E/F/G, seed unique from 10000. Endings: ~40% callback, 30% lesson,
22% group, 8% card (card only on dating / matching topics). Re-running rewrites the same files (seeded).
Checks: exact counts, no duplicate topics within round 2 or against round 1 (b*.json) and the approved originals.

    python3 promo/posting/v3/make_round2.py
"""
import collections, glob, json, os, random, re

HERE = os.path.dirname(os.path.abspath(__file__))
BATCHES = os.path.join(HERE, 'batches')

SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
NAME = {s: s.capitalize() for s in SIGNS}
PLURAL = {'aries': 'Aries', 'taurus': 'Tauruses', 'gemini': 'Geminis', 'cancer': 'Cancers', 'leo': 'Leos', 'virgo': 'Virgos',
          'libra': 'Libras', 'scorpio': 'Scorpios', 'sagittarius': 'Sagittarians', 'capricorn': 'Capricorns',
          'aquarius': 'Aquarians', 'pisces': 'Pisces'}
def A(s):  # "an Aries", "a Leo"
    return ('an ' if NAME[s][0] in 'AEIOU' else 'a ') + NAME[s]

# ---------------------------------------------------------------- star_talk: rollcall (topic: plain "The signs ...")
ROLLCALL = """
at a wedding rehearsal | at a housewarming party | at game night | at a potluck | at a graduation | at a family reunion |
at a garage sale | at a talent show | at book club | at a dinner party | at a class reunion | at a costume party |
at a pool party | at an escape room | at the bowling alley | at mini golf | at the arcade | at a pottery class |
at a dance class | at a yoga class | at a craft fair | at a parade | at the aquarium | at the zoo | at a botanical garden |
at the planetarium | at the library | at a bookstore | at the car wash | at the post office | at the hair salon |
at the nail salon | at the vet | at a coffee shop | at a tea party | at brunch | at a buffet | at a food truck |
at an ice cream shop | at a bake sale | at a hotel | on a cruise | on a train | on a long flight | on a ski trip |
at a lake house | on a cabin weekend | at a food festival | apple picking | at a pumpkin patch |
decorating for the holidays | decorating cookies | at a holiday market | on New Year's Eve | on Valentine's Day |
on the first day of spring | on the first cold day | in autumn | at a summer barbecue | at the office party |
in a meeting | on their first day at a new job | at a team lunch | working from home | on a deadline |
giving a presentation | at a work retreat | in the break room | as interns | as teachers | as baristas | as waiters |
as flight attendants | as tour guides | as lifeguards | as librarians | as wedding planners | as chefs |
as camp counselors | as hairdressers | as real estate agents | as weather forecasters | as game show hosts |
as fairy godmothers | as babysitters | as dog walkers | as neighbours | as grandparents | 
as florists | as personal trainers | as cats | as dogs | as houseplants | as desserts | as breakfast foods |
as coffee orders | as pizza toppings | as types of weather | as kids on a field trip | as tourists | as students |
as bus drivers | rearranging the living room | doing the dishes | making the bed | folding a fitted sheet |
baking bread | making breakfast | painting a room | decluttering their closet | hanging a picture frame |
fixing a wobbly table | house-sitting | hosting overnight guests | waiting for a delivery | with 1% battery |
taking a selfie | answering emails | with 100 unread messages | with a new phone | sending voice notes |
online shopping | reading reviews before buying | choosing a profile picture | on a second date |
planning an anniversary | at speed dating | on a blind date | meeting their date's friends | on a coffee date |
slow dancing | making it official | in a long-distance relationship | planning a proposal | picking matching outfits |
on a stargazing date | as plus-ones | planning a group trip | splitting the bill | at a friend's art show |
at a kid's birthday party | as the oldest child | as the youngest child | as the middle child | as only children |
teaching their parents tech | on a windy day | on a foggy morning | when the clocks change |
on the longest day of the year | packing for a trip | lost in a new city | sightseeing | at a souvenir shop |
trying the local food | on a ferry | making pancakes | at pizza night | ordering takeout | at a cheese tasting |
at a fancy tasting menu | learning to knit | doing a puzzle | playing charades | doing a crossword | gardening |
learning an instrument | birdwatching | fishing | learning to skateboard | learning to swim | journaling |
running a fun run | at an art class | learning a language | flying a kite | at a spelling bee | at a science fair |
on picture day | on the last day of school | during finals week | at parent-teacher night | getting a passport photo |
on their lunch break | fixing the office printer | getting a promotion | on their last day at a job |
training the new hire | on their commute | carpooling | learning to drive | at the mechanic | at a hardware store |
at a thrift store | at the mall | at a shoe store | at a plant nursery | on a farm stay | at a horse riding lesson |
at a basketball game | playing tennis | ice skating | on a bike ride | kayaking | at a hot spring | at a spa day |
doing a face mask night | at a movie marathon | at a magic show | at a comedy show | at the ballet | at a play |
at a poetry reading | at a retirement party | at a block party | volunteering | at a neighbourhood meeting |
in a waiting room | getting new glasses | at a photo shoot | at a networking event | on a walking tour |
at a lighthouse | on a hot air balloon ride | on the boardwalk | at a night market | at a cooking class |
making dumplings | having breakfast in bed | at a bubble tea shop | at a candy store | at a pie-baking contest |
at bingo night | at an auction | making friendship bracelets | writing holiday cards | on a cozy night in |
on a staycation | watching a meteor shower | watching the sunrise | at a lantern festival | on jury duty |
on a long bus ride | in a crowded elevator | at a trampoline park | at a toy store | at a sunflower field |
at a puppet show | at a lemonade stand | at chess club
"""

# ---------------------------------------------------------------- star_talk: belike ('Zodiacs <situation> | *be like.*')
BELIKE = """
when the food arrives | when you steal a fry | when someone texts "k" | when the call could've been a text |
when someone calls instead of texting | when they're the first to arrive | when the party's too loud |
when it's time to leave | when they hear their name | when someone says "calm down" | when someone says "it's fine" |
when they're told no | when the plan actually works | when someone copies their outfit | when they get a surprise |
when they're wrong | when they're cold | when they're sleepy | when they're nervous | when they're embarrassed |
when they're shy | when they're in a mood | when they're cozy | when they're overthinking |
when they can't decide | after a breakup | when the date's awkward | when their ex texts | when someone flirts with them |
when they get a gift they hate | when they're asked to share | when someone asks a favour |
when someone borrows their stuff | when someone touches their food | when the waiter forgets their order |
when the food's too spicy | cooking for the first time | when there's free food | when dessert arrives |
when the coffee kicks in | when they skip breakfast | at the self-checkout | in a long line | in traffic |
when the bus is late | when they miss the train | when their flight is delayed | on the last day of vacation |
coming home from a trip | when they see the ocean | finding a parking spot | when the neighbours are loud |
when a package arrives | finding money in a pocket | finding the perfect gift | when their show gets cancelled |
after a season finale | binge-watching a show | when autocorrect strikes | sending the wrong text |
liking an old photo by accident | getting tagged in a bad photo | typing for ten minutes | deleting a text unsent |
reading their horoscope | during Mercury retrograde | when someone asks their sign | explaining their birth chart |
meeting their sign twin | when someone guesses their sign wrong | when someone says astrology is fake |
seeing a shooting star | on a full moon | making a wish | making New Year's resolutions | when the sun comes out |
when summer ends | on rest day | trying to wake up early | trying to go to bed early | trying to stay calm |
trying to keep a plant alive | trying to make small talk | trying to read more | trying to drink more water |
trying to put their phone down | trying to meditate | trying a new recipe | trying to parallel park |
trying to dance | trying to whistle | trying to take a nice photo | trying to stay awake in a movie |
trying to choose an outfit | trying to say no | trying to be chill | 
pretending to know the words | pretending to understand the plot | pretending to listen | when they lose a game |
when they win a game | when someone cheats at cards | when the wifi password is long | 
when they hear gossip | when the teacher calls on them | doing homework |
before an exam | after an exam | getting feedback at work | asking for a raise | on a Friday afternoon |
on a Sunday night | on a long weekend | when they wake up late | on a bad hair day | trying on clothes |
when their favourite shirt shrinks | spilling coffee on themselves | tripping in public |
waving at someone who wasn't waving | forgetting someone's name | running into a teacher in public |
when someone sits too close | when someone chews loudly | when someone says "we should hang out" |
when someone asks "what's wrong?" | when someone says "you look tired" |
when they hear "can I ask you something?" | when an unknown number calls | meeting a cat | when a baby smiles at them |
getting their own place | decorating their room | when the house is finally clean | shopping while hungry |
when the store is out of their snack | when someone eats their leftovers | when there's one slice left |
when someone orders the same thing | when the waiter gets it wrong | giving directions | when they get lost |
using a paper map | at a red light | singing in the car | when someone else picks the music |
when their friend is driving | in the passenger seat | when someone replies "lol" |
when a text ends with a full stop | when someone answers with a question | as the plus-one | meeting new coworkers |
opening presents | getting a handwritten letter | writing a thank-you note | when someone remembers a tiny detail |
when their friend is sad | watching a sad movie | watching a romcom | reading the last page of a book |
when the book was better | when it's their turn to pick | when it's their turn to cook | when someone asks for the recipe |
when the oven timer goes off | making their morning coffee | on their third coffee | when they hear good news |
waiting for results | after a long nap | when the nap goes wrong | when the hot water runs out | when their socks get wet |
when someone looks at their screen | when someone uses their nickname | when they're introduced |
when someone says "trust me" | when someone says "relax" | when someone says "guess what" | when someone says "we'll see" |
when someone says "it's just a game" | when their match sends a long message | when their match double texts |
when their crush likes their photo | when someone holds the door | when the door says pull |
when the lift is full | when their name's spelled wrong | when they get a good grade | when they lose their keys |
when they can't find the remote | when their charger is too short | when their headphones die |
when someone sings off-key | when someone hums all day | when someone whistles | when they sneeze in a quiet room |
when they get the hiccups | when they get a paper cut | when the printer jams | 
on the first page of a new notebook | when their pen runs out | on a fresh bedsheets night | when someone makes their bed |
when someone says "small world" | when the song is stuck in their head | when they find a four-leaf clover |
when they see a rainbow | when they get a sunburn | when the ice cream melts | when someone says "one bite" |
when someone says "no rush" | when someone says "be honest" | when someone says "we're almost there" |
when someone says "you had to be there" | when someone says "five minutes away" | when someone says "long story" |
when someone says "one more thing" | when someone says "no offense" | when someone moves their stuff |
when they have to make a phone call | when they get a voicemail | when their camera roll is full |
when someone shows them vacation photos | when the movie has subtitles | when they're early for once |
when someone stands them up | when their crush says hi | when someone remembers their order |
when the snack bag is half air | when the vending machine eats their coin | when someone opens the curtains |
when they finish their to-do list | when they spot their friend across the room | when they learn a new word |
when someone mispronounces a word | when they finally get the joke | when they laugh at the wrong moment |
when they get a group hug | when someone saves them a seat | when someone plans the whole day |
when the cake is cut unevenly | when they wear something new | when their tea goes cold | when they're asked to speak first |
when the movie lights come on | when someone says "pick a number" | when the shop closes in five minutes |
when someone corrects their grammar
"""

# ---------------------------------------------------------------- star_talk: solo (sign + hook)
SOLO_T = [  # (template, skip-signs); {S}=name {P}=plural {A}=a/an name
    ('Being {A} | *be like.*', {'pisces'}),       # "being a Pisces" is an approved original
    ('Your {S} coworker | *be like.*', set()),
    ('Your {S} roommate | *be like.*', set()),
    ('Your {S} sibling | *be like.*', set()),
    ('Your {S} mom | *be like.*', set()),
    ('{P} at a party | *be like.*', set()),
    ('{P} on a trip | *be like.*', set()),
    ('{P} when they\'re mad | *be like.*', set()),
    ('{P} on their birthday | *be like.*', set()),
    ('{P} texting | *be like.*', set()),
    ('{P} in the group chat | *be like.*', set()),
    ('{S} red flags | *we love.*', set()),
    ('{P} running late | *be like.*', set()),
    ('{P} shopping | *be like.*', set()),
    ('{P} on a first date | *be like.*', set()),
    ('{P} as your boss | *be like.*', set()),
    ('{P} on a day off | *be like.*', set()),
    ('{P} keeping a secret | *be like.*', set()),
    ('{P} making plans | *be like.*', set()),
    ('How to spot | *{A}.*', set()),
]
SOLO_X = {  # sign-specific hooks: 3 each (6 signs keep 3, others 2, so the total is exactly 270)
    'aries': ['Aries vs. | *waiting in line.*', 'Never race | *an Aries.*', 'Aries at | *board game night.*'],
    'taurus': ['Asking a Taurus | *to share dessert.*', 'Tauruses vs. | *their comfy bed.*', 'Tauruses when dinner | *is late.*'],
    'gemini': ['Geminis with | *a new hobby.*', 'The two moods | *of a Gemini.*', 'Geminis telling | *a story.*'],
    'cancer': ['Cancers when you | *leave early.*', 'Cancers hosting | *dinner.*', 'Cancers vs. | *old photos.*'],
    'leo': ['Leos vs. | *a mirror.*', 'Leos when it\'s | *not about them.*', 'Leos giving | *a speech.*'],
    'virgo': ['Virgos vs. | *a messy desk.*', 'Virgos reading | *the instructions.*', 'Virgos packing | *a suitcase.*'],
    'libra': ['Libras vs. | *a yes or no question.*', 'Libras when two friends | *argue.*', 'Libras vs. | *an ugly lamp.*'],
    'scorpio': ['Scorpios when you | *fib to them.*', 'Scorpios vs. | *small talk.*', 'Scorpios holding | *a grudge.*'],
    'sagittarius': ['Sagittarians vs. | *staying in.*', 'Sagittarians telling | *the truth.*', 'Sagittarians vs. | *a schedule.*'],
    'capricorn': ['Capricorns vs. | *relaxing.*', 'Capricorns making | *a five-year plan.*', 'Capricorns vs. | *a long meeting.*'],
    'aquarius': ['Aquarians explaining | *their new theory.*', 'Aquarians vs. | *the dress code.*', 'Aquarians when everyone | *likes the same thing.*'],
    'pisces': ['Pisces vs. | *a sad movie.*', 'Pisces daydreaming | *at work.*', 'Pisces when a stranger | *is nice.*'],
}

# ---------------------------------------------------------------- star_advice: advice-solo (44 per sign + 2 = 530)
ADV_T = [
    '{S}, you\'re allowed | *to ask for help.*',
    '{S}, you\'re allowed | *to say no.*',
    '{S}, you\'re allowed | *to change your mind.*',
    '{S}, you\'re allowed | *to be a beginner.*',
    '{S}, you\'re allowed | *to want more.*',
    'What {P} need | *after a fight.*',
    'What {P} need | *on a bad day.*',
    'What {P} need | *from a friend.*',
    'What {P} need | *to feel heard.*',
    'How to apologise | *to {A}.*',
    'How to make friends | *with {A}.*',
    'How to cheer up | *{A}.*',
    'How to encourage | *{A}.*',
    'How to surprise | *{A}.*',
    'How to thank | *{A}.*',
    'How to check in | *on {A}.*',
    'How to give {A} | *space.*',
    '{S}, this is your sign | *to slow down.*',
    '{S}, this is your sign | *to call home.*',
    '{S}, you don\'t have | *to be perfect.*',
    '{S}, it\'s okay | *to miss them.*',
    '{S}, it\'s okay | *to start over.*',
    '{S}, protect | *your peace.*',
    'Signs {A} | *trusts you.*',
    'Signs {A} | *likes you.*',
    'Signs {A} | *misses you.*',
    'Signs {A} | *needs a break.*',
    'What {A} | *won\'t say out loud.*',
    '{S}, you can\'t fix | *everyone.*',
    '{S}, let yourself | *be loved.*',
    '{S}, you\'re not | *too much.*',
    '{S}, you\'re doing | *better than you think.*',
    '{S}, here\'s your | *Sunday reset.*',
    '{S}, here\'s your | *Monday pep talk.*',
    '{S}, you don\'t owe anyone | *an instant reply.*',
    '{S}, have you | *eaten today?*',
    '{S}, celebrate | *the small wins.*',
    '{S}, the right people | *will stay.*',
    '{S}, before you | *send that text.*',
]
ADV_X = {  # 5 each -> 44 per sign; the first two signs get a 6th to reach 530
    'aries': ['Aries, not everything | *is a race.*', 'Aries, patience | *looks good on you.*', 'Aries, you don\'t have | *to win this one.*',
              'Aries, ask before | *you charge in.*', 'Aries, it\'s okay | *to sit still.*', 'Aries, your courage | *inspires people.*'],
    'taurus': ['Taurus, change | *can be cozy too.*', 'Taurus, you can share | *the last bite.*', 'Taurus, your stubbornness | *is loyalty.*',
               'Taurus, treat yourself | *without guilt.*', 'Taurus, you\'re worth | *the slow build.*', 'Taurus, new things | *can feel like home.*'],
    'gemini': ['Gemini, both of you | *are welcome here.*', 'Gemini, you don\'t have | *to finish every hobby.*', 'Gemini, quiet is | *not boring.*',
               'Gemini, say | *what you mean.*', 'Gemini, one conversation | *at a time.*'],
    'cancer': ['Cancer, not every goodbye | *is forever.*', 'Cancer, your soft heart | *is strength.*', 'Cancer, home is | *also you.*',
               'Cancer, let someone | *take care of you.*', 'Cancer, the past | *can stay there.*'],
    'leo': ['Leo, you\'re still loved | *off stage.*', 'Leo, let someone else | *shine too.*', 'Leo, your warmth | *is the real crown.*',
            'Leo, it\'s okay | *to be quiet.*', 'Leo, take the compliment | *and believe it.*'],
    'virgo': ['Virgo, leave the dishes | *for tonight.*', 'Virgo, you can\'t | *edit people.*', 'Virgo, let someone | *else plan it.*',
              'Virgo, you notice everything. | *Notice yourself.*', 'Virgo, your care | *shows in the details.*'],
    'libra': ['Libra, your opinion | *matters too.*', 'Libra, peace isn\'t | *keeping quiet.*', 'Libra, you can\'t | *please everyone.*',
              'Libra, decide | *and don\'t look back.*', 'Libra, it\'s okay | *to be alone.*'],
    'scorpio': ['Scorpio, not everyone | *is hiding something.*', 'Scorpio, let them | *see you.*', 'Scorpio, trust | *can be rebuilt.*',
                'Scorpio, your intensity | *is love.*', 'Scorpio, soft | *is not weak.*'],
    'sagittarius': ['Sagittarius, staying | *can be an adventure.*', 'Sagittarius, honesty | *with a hug.*', 'Sagittarius, commitment | *isn\'t a cage.*',
                    'Sagittarius, your joy | *is contagious.*', 'Sagittarius, the plan | *can be loose.*'],
    'capricorn': ['Capricorn, you\'re more | *than your work.*', 'Capricorn, play | *is productive.*', 'Capricorn, log off | *at five.*',
                  'Capricorn, let yourself | *be proud.*', 'Capricorn, laugh | *more often.*'],
    'aquarius': ['Aquarius, feelings | *aren\'t a bug.*', 'Aquarius, you belong | *here too.*', 'Aquarius, your ideas | *deserve a voice.*',
                 'Aquarius, weird | *is wonderful.*', 'Aquarius, you can | *care out loud.*'],
    'pisces': ['Pisces, crying | *is allowed.*', 'Pisces, dreams need | *a little plan.*', 'Pisces, not every sad story | *is yours to carry.*',
               'Pisces, your softness | *is a superpower.*', 'Pisces, come back | *to earth gently.*'],
}

# ---------------------------------------------------------------- star_advice: advice-rollcall (242)
ADV_ROLL = """
Each sign's | *morning mantra.* ; Each sign's | *bedtime reminder.* ; Each sign's | *way to unwind.* ;
Each sign's | *habit to soften.* ; Each sign's | *dream weekend.* ; Each sign's | *happy place.* ;
Each sign's | *autumn ritual.* ; Each sign's | *spring fresh start.* ; Each sign's | *new year intention.* ;
Each sign's | *word for the year.* ; Each sign's | *birthday wish.* ; Each sign's | *kindest habit.* ;
Each sign's | *first-date tip.* ; Each sign's | *stress reset.* ; Each sign's | *dream vacation.* ;
Each sign's | *travel style.* ; Each sign's | *dream home.* ; Each sign's | *houseplant match.* ;
Each sign's | *role in the family.* ; Each sign's | *best compliment.* ; Each sign's | *confidence boost.* ;
Each sign's | *most lovable quirk.* ; Each sign's | *love lesson.* ; Each sign's | *relationship goal.* ;
Each sign's | *phone-free hour.* ; Each sign's | *note to self.* ; Each sign's | *permission slip.* ;
Each sign's | *next chapter.* ; Each sign's | *inner child.* ; Each sign's | *soft spot.* ; Each sign's | *hidden worry.* ;
Each sign's | *kind of hug.* ; Each sign's | *ideal hangout.* ; Each sign's | *dream good-morning text.* ;
Each sign's | *work superpower.* ; Each sign's | *work-life reminder.* ; Each sign's | *study style.* ;
Each sign's | *creative outlet.* ; Each sign's | *treat-yourself rule.* ; Each sign's | *season of growth.* ;
Each sign's | *friendship advice.* ; Each sign's | *slow morning.* ; Each sign's | *rainy-day plan.* ;
Each sign's | *snow-day plan.* ; Each sign's | *summer adventure.* ; Each sign's | *holiday reminder.* ;
Each sign's | *brave step this week.* ; Each sign's | *reason to smile today.* ; Each sign's | *heart in one sentence.* ;
Each sign's | *ideal friend group.* ; Each sign's | *perfect phone call.* ; Each sign's | *best travel buddy.* ;
Each sign's | *best roommate match.* ; Each sign's | *perfect study buddy.* ; Each sign's | *dream job.* ;
Each sign's | *tradition to start.* ; Each sign's | *favourite small joy.* ; Each sign's | *wish for their friends.* ;
Each sign's | *gentle goal this month.* ; Each sign's | *perfect walk.* ; Each sign's | *perfect match.* ;
Each sign's | *best friend sign.* ; Each sign's | *most romantic habit.* ; Each sign's | *cozy hobby.* ;
Each sign's | *team role.* ; Each sign's | *little ritual for luck.* ; Each sign's | *new moon wish.* ;
What each sign | *needs after a long trip.* ; What each sign | *needs at work.* ; What each sign | *needs on a Sunday.* ;
What each sign | *needs more of.* ; What each sign | *needs less of.* ; What each sign | *should stop apologising for.* ;
What each sign | *should say yes to.* ; What each sign | *should try this month.* ;
What each sign | *should cook this weekend.* ; What each sign | *overthinks.* ; What each sign | *is secretly proud of.* ;
What each sign | *secretly wants.* ; What each sign | *is afraid to ask for.* ; What drains | *each sign.* ;
What fills | *each sign's cup.* ; What each sign | *brings to a friendship.* ;
What each sign | *brings to the group chat.* ; What each sign | *brings to family dinner.* ;
What each sign | *brings on a trip.* ; What each sign | *is ready for.* ; What each sign | *is outgrowing.* ;
What each sign | *gets right.* ; What each sign | *needs in a best friend.* ; What each sign | *wants you to notice.* ;
What each sign | *means by "I'm fine."* ; What each sign | *says when they're hurt.* ;
What each sign | *remembers about you.* ; What each sign | *needs to unlearn.* ; What each sign | *is quietly carrying.* ;
What each sign | *should do on a free day.* ; What each sign | *needs in a text.* ; What each sign | *teaches others.* ;
What each sign | *never travels without.* ; What each sign | *needs when they're homesick.* ;
What each sign | *needs in winter.* ; What each sign | *notices on a first date.* ;
What each sign's friends | *love about them.* ; What each sign's family | *wishes they knew.* ;
What each sign's coworkers | *appreciate.* ; What to text | *each sign after a fight.* ;
What to say | *when each sign is sad.* ; How each sign | *moves on.* ; How each sign | *handles change.* ;
How each sign | *handles rejection.* ; How each sign | *makes a big decision.* ; How each sign | *starts the day.* ;
How each sign | *winds down at night.* ; How each sign | *handles a busy week.* ; How each sign | *handles jealousy.* ;
How each sign | *handles feedback.* ; How each sign | *handles conflict.* ; How each sign | *asks for space.* ;
How each sign | *shows gratitude.* ; How each sign | *cheers you up.* ; How each sign | *says goodbye.* ;
How each sign | *forgives.* ; How each sign | *rebuilds trust.* ; How each sign | *opens up.* ;
How each sign | *can sleep better.* ; How each sign | *spends a day off.* ; How each sign | *grows.* ;
How each sign | *learns best.* ; How each sign | *keeps friends close.* ; How each sign | *stays close long distance.* ;
How each sign | *loves their family.* ; How each sign | *treats themselves.* ; How each sign | *makes a house a home.* ;
How each sign | *travels.* ; How each sign | *leads.* ; How each sign | *shows they're listening.* ;
How each sign | *finds their people.* ; How each sign | *gets their spark back.* ; How each sign | *builds confidence.* ;
How each sign | *handles loneliness.* ; How each sign | *shows love with food.* ;
How each sign | *makes a friend feel seen.* ; How each sign | *can find balance.* ;
How each sign | *can stop overthinking.* ; How each sign | *can be kinder to themselves.* ;
How each sign | *can reconnect with an old friend.* ; How each sign | *can handle the holidays.* ;
How each sign | *can enjoy being alone.* ; How each sign | *can feel confident on dates.* ;
How each sign | *can make mornings easier.* ; How each sign | *can unplug from their phone.* ;
How each sign | *can start fresh this season.* ; How each sign | *keeps the spark alive.* ;
How each sign | *picks a partner.* ; How each sign | *knows it's a match.* ; How to travel | *with each sign.* ;
How to live | *with each sign.* ; How to work | *with each sign.* ; How to celebrate | *each sign.* ;
How to ask out | *each sign.* ; How to cook | *for each sign.* ; How to host | *each sign.* ;
How to give advice | *to each sign.* ; How to make plans | *with each sign.* ; How to disagree | *with each sign.* ;
A love note | *to each sign.* ; One question | *to ask each sign.* ; A tiny habit | *for each sign.* ;
Each sign | *as a parent.* ; Each sign | *in their softest era.* ; Each sign | *outside their comfort zone.* ;
Each sign | *after a good cry.* ; Each sign | *being brave.* ; Each sign | *choosing themselves.* ;
Each sign | *after a big win.* ; How each sign | *handles a new job.* ; How each sign | *handles a long phone call.* ;
How each sign | *handles a long wait.* ; How each sign | *handles being wrong.* ; How each sign | *keeps a promise.* ;
How each sign | *learns to trust their gut.* ; How each sign | *gets through winter.* ;
How each sign | *handles a big birthday.* ; How each sign | *makes up with a friend.* ;
How each sign | *shows they're serious.* ; How each sign | *gives a compliment.* ;
How each sign | *helps a friend move on.* ; How each sign | *shows they're proud of you.* ;
How each sign | *handles a surprise visit.* ; How each sign | *makes the first move.* ;
How each sign | *handles a group decision.* ; How each sign | *practises patience.* ;
How each sign | *handles a crowded room.* ; How each sign | *handles being left out.* ;
How each sign | *handles a friend's good news.* ; How each sign | *makes peace with the past.* ;
How each sign | *builds a routine.* ; How each sign | *handles a creative block.* ;
How each sign | *handles a hard conversation.* ; How each sign | *handles big feelings.* ;
How each sign | *stands up for themselves.* ; How each sign | *shares the spotlight.* ;
How each sign | *finds cleaning motivation.* ; What each sign | *learned from home.* ;
What each sign | *needs to feel chosen.* ; What each sign | *hopes you'll ask them.* ;
What each sign | *should learn next.* ; What each sign | *would put in a time capsule.* ;
What each sign | *would tell their younger self.* ; What each sign | *wishes people asked about.* ;
What each sign | *should leave in the old year.* ; What each sign | *cherishes most.* ;
What each sign | *is building right now.* ; What each sign | *should stop comparing.* ;
What each sign | *needs in a hard season.* ; Each sign's | *money mindset.* ; Each sign's | *exam-week reminder.* ;
Each sign's | *perfect breakfast.* ; Each sign's | *signature dish.* ; Each sign's | *flower to grow.* ;
Each sign's | *perfect book genre.* ; Each sign's | *lunch-break reset.* ; Each sign's | *perfect cup of tea.* ;
Each sign | *when they feel at home.* ; Each sign | *in their element.* ; Each sign | *at their most generous.* ;
Each sign | *falling for a friend.* ; Each sign | *learning to receive.* ; Each sign | *with a full heart.* ;
One kind act | *for each sign this week.* ; How to be a good guest | *at each sign's home.* ;
How to make each sign | *laugh.* ; How to spend a Sunday | *with each sign.* ; How to be patient | *with each sign.* ;
How to remind each sign | *they're loved.* ; How to brighten | *each sign's Monday.* ;
How to start a conversation | *with each sign.* ; How to make each sign | *feel welcome.* ;
A small win | *for each sign today.*
"""

def split(s, sep):
    return [x.strip() for x in s.replace('\n', ' ').split(sep) if x.strip()]

def build():
    talk, adv = [], []
    talk += [dict(account='star_talk', format='rollcall', topic='The signs ' + s) for s in split(ROLLCALL, '|')]
    talk += [dict(account='star_talk', format='belike', topic=f'Zodiacs {s} | *be like.*') for s in split(BELIKE, '|')]
    extra_keep = {'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo'}  # 23 each; the other six get 22
    for s in SIGNS:
        hooks = [t.format(S=NAME[s], P=PLURAL[s], A=A(s)) for t, skip in SOLO_T if s not in skip]
        x = SOLO_X[s] if (s in extra_keep or s == 'pisces') else SOLO_X[s][:2]
        hooks += x
        need = 23 if s in extra_keep else 22
        assert len(hooks) == need, (s, len(hooks))
        talk += [dict(account='star_talk', format='solo', sign=s, topic=h) for h in hooks]
    for s in SIGNS:
        hooks = [t.format(S=NAME[s], P=PLURAL[s], A=A(s)) for t in ADV_T] + ADV_X[s]
        adv += [dict(account='star_advice', format='advice-solo', sign=s, topic=h) for h in hooks]
    adv += [dict(account='star_advice', format='advice-rollcall', topic=t) for t in split(ADV_ROLL, ';')]
    return talk, adv

def norm(t):
    t = t.lower().replace('*', '').replace('|', ' ')
    t = re.sub(r"[^a-z0-9' ]", ' ', t)
    return ' '.join(t.split())

DATING = re.compile(r"\b(first date|date|dates|dating|blind date|coffee date|stargazing date|second date|their match|it's a match|perfect match|"
                    r"crush|partner|anniversary|flirts?|relationship|proposal|valentine's|likes you|misses you|miss them|be loved|"
                    r"plus-ones?|making it official|long-distance|breakup|their ex|kiss|romantic|spark|red flags|first move|"
                    r"falling for|feel chosen|ask out|serious|matching outfits|speed dating|send that text|after a fight)\b", re.I)

def main():
    talk, adv = build()
    # ---- counts
    assert len(talk) == 770 and len(adv) == 770, (len(talk), len(adv))
    allr2 = talk + adv
    # ---- uniqueness within round 2
    seen = collections.Counter(norm(x['topic']) for x in allr2)
    dups = [k for k, v in seen.items() if v > 1]
    assert not dups, dups
    # ---- against round 1 + approved originals
    r1 = [x for f in sorted(glob.glob(os.path.join(BATCHES, 'b*.json'))) for x in json.load(open(f))]
    r1n = {norm(x['topic']) for x in r1}
    approved = ["what's your sign", 'dating every sign', 'new match', '2 a m', 'with a crush', 'left on read',
                'things only leos get', 'dating a scorpio', 'being a pisces']
    clash = [x['topic'] for x in allr2 if norm(x['topic']) in r1n]
    # also compare the bare situation (strip the format frame) against round 1 situations
    def core(t):
        t = norm(t)
        for p in ('the signs ', 'zodiacs ', 'each sign s ', 'each sign ', 'what each sign ', 'how each sign '):
            if t.startswith(p): t = t[len(p):]
        return t.replace(' be like', '').strip()
    r1c = {core(x['topic']) for x in r1}
    clash += [x['topic'] for x in allr2 if x['format'] in ('rollcall', 'belike', 'advice-rollcall') and core(x['topic']) in r1c]
    clash += [x['topic'] for x in allr2 for a in approved if a in norm(x['topic'])]
    assert not clash, clash
    corec = collections.Counter(core(x['topic']) for x in allr2 if x['format'] in ('rollcall', 'belike', 'advice-rollcall'))
    assert not [k for k, v in corec.items() if v > 1], [k for k, v in corec.items() if v > 1]

    rng = random.Random(20261111)
    # ---- endings: 8% card (dating only), then 40/30/22 callback/lesson/group
    n = len(allr2)
    n_card = round(n * 0.08); n_cb = round(n * 0.40); n_le = round(n * 0.30); n_gr = n - n_card - n_cb - n_le
    pool = [x for x in allr2 if DATING.search(x['topic'].replace('*', ''))]
    assert len(pool) >= n_card, len(pool)
    for x in rng.sample(pool, n_card): x['ending'] = 'card'
    rest = [x for x in allr2 if 'ending' not in x]
    ends = ['callback'] * n_cb + ['lesson'] * n_le + ['group'] * n_gr
    rng.shuffle(ends)
    for x, e in zip(rest, ends): x['ending'] = e

    # ---- order: shuffle each account, then build batches of 5+5 avoiding a repeated sign within a batch
    def stream(items):
        items = items[:]; rng.shuffle(items); out = []
        while items:
            chunk = []
            for _ in range(5):
                if not items: break
                used = {c.get('sign') for c in chunk} - {None}
                fmts = collections.Counter(c['format'] for c in chunk)
                pick = next((i for i, c in enumerate(items) if c.get('sign') not in used and fmts[c['format']] < 3), 0)
                chunk.append(items.pop(pick))
            out.append(chunk)
        return out
    ts, as_ = stream(talk), stream(adv)
    assert len(ts) == len(as_) == 154
    for f in glob.glob(os.path.join(BATCHES, 'r2-*.json')): os.remove(f)
    ti = ai = g = 0
    for b, (tc, ac) in enumerate(zip(ts, as_), 1):
        batch = []
        for t, a in zip(tc, ac):
            for x in (t, a):
                if x['account'] == 'star_talk': ti += 1; x['id'] = f'r2t{ti:04d}'
                else: ai += 1; x['id'] = f'r2a{ai:04d}'
                x['music'] = {'key': 'CDEFG'[g % 5], 'seed': 10000 + g}; g += 1
                batch.append({k: x[k] for k in ('id', 'account', 'format', 'sign', 'topic', 'music', 'ending') if k in x})
        with open(os.path.join(BATCHES, f'r2-{b:03d}.json'), 'w') as f:
            json.dump(batch, f, indent=1, ensure_ascii=False); f.write('\n')

    # ---- summary
    out = [x for f in sorted(glob.glob(os.path.join(BATCHES, 'r2-*.json'))) for x in json.load(open(f))]
    assert len(out) == 1540 and len({x['id'] for x in out}) == 1540 and len({x['music']['seed'] for x in out}) == 1540
    assert all(len({y['account'] for y in json.load(open(f))}) == 2 for f in glob.glob(os.path.join(BATCHES, 'r2-*.json')))
    assert all(x['ending'] != 'card' or DATING.search(x['topic'].replace('*', '')) for x in out)
    print(f'{len(out)} items in {len(ts)} batches (r2-001 .. r2-{len(ts):03d})')
    print('per account/format:', dict(sorted(collections.Counter((x['account'], x['format']) for x in out).items())))
    for acct in ('star_talk', 'star_advice'):
        print(f'endings {acct}:', dict(collections.Counter(x['ending'] for x in out if x['account'] == acct)))
    print('endings total:', {k: f'{v} ({v / len(out):.1%})' for k, v in collections.Counter(x['ending'] for x in out).items()})
    print('keys:', dict(sorted(collections.Counter(x['music']['key'] for x in out).items())),
          'seeds:', min(x['music']['seed'] for x in out), '..', max(x['music']['seed'] for x in out))
    for fmt in ('solo', 'advice-solo'):
        print(f'{fmt} per sign:', {s: sum(1 for x in out if x['format'] == fmt and x.get('sign') == s) for s in SIGNS})
    print(f'duplicates within round 2: 0; clashes with round 1 ({len(r1)} items) / approved originals: 0')

if __name__ == '__main__':
    main()
