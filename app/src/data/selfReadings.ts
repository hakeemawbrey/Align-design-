import type { SignId } from './signs'

/** more on your own sign's spark, clash and align: how it shows up when you're dating, and one thing to try */
export interface SelfMore { dating: string; tryThis: string }

export const SELF_MORE: Record<SignId, { spark: SelfMore; clash: SelfMore; align: SelfMore }> = {
  aries: {
    spark: { dating: 'You’re at your best early: the first message, the first plan, the first kiss. People feel chosen around you.', tryThis: 'Plan the date yourself, start to finish.' },
    clash: { dating: 'When things slow down you can pick a fight just to feel something, or lose interest before it’s had a chance.', tryThis: 'Wait a day before you decide it’s boring.' },
    align: { dating: 'You do best with someone who matches your pace and isn’t rattled by your honesty.', tryThis: 'Say what you want in one plain sentence.' },
  },
  taurus: {
    spark: { dating: 'You notice comfort and effort: who cooked, who remembered, who was on time. That’s how you fall.', tryThis: 'Suggest a slow date: a long dinner, no rush.' },
    clash: { dating: 'You go quiet instead of saying you’re upset, and a small thing can sit for weeks. People can’t fix what they don’t know about.', tryThis: 'Name the small thing the same day.' },
    align: { dating: 'You do best with someone consistent who gives you time, and who you can be honest with before it builds up.', tryThis: 'Tell them one thing you need to feel settled.' },
  },
  gemini: {
    spark: { dating: 'A quick reply with a good question does more for you than flowers. You fall for how someone thinks.', tryThis: 'Open with a question only they could answer.' },
    clash: { dating: 'You can keep it light to avoid the heavy part, and people may not know where they stand with you.', tryThis: 'Say the serious thing once, plainly.' },
    align: { dating: 'You do best with someone curious who gives you variety and can sit in a real conversation too.', tryThis: 'Stay on one topic for a whole date.' },
  },
  cancer: {
    spark: { dating: 'You open up when someone makes you feel safe. Small rituals and being remembered matter more than big nights.', tryThis: 'Share an old favourite: a song, a place, a meal.' },
    clash: { dating: 'When you feel left out you pull back and wait to be noticed, and it can look like you’ve lost interest.', tryThis: 'Say “I felt left out” instead of going quiet.' },
    align: { dating: 'You do best with someone warm and steady who asks how you are and means it.', tryThis: 'Ask for one specific thing this week.' },
  },
  leo: {
    spark: { dating: 'You’re generous with attention and you like it back. A real compliment lands with you.', tryThis: 'Give the first compliment, and make it specific.' },
    clash: { dating: 'When you feel overlooked you act like you don’t care. Pride gets there before the truth does.', tryThis: 'Say “that stung” the first time, not the tenth.' },
    align: { dating: 'You do best with someone who’s proud to be with you and lets you be proud of them.', tryThis: 'Celebrate something of theirs, loudly.' },
  },
  virgo: {
    spark: { dating: 'You show interest by helping and noticing details. Someone who follows through is very attractive to you.', tryThis: 'Remember one detail and bring it up later.' },
    clash: { dating: 'You can edit a person before you’ve got to know them, and be hardest of all on yourself.', tryThis: 'Let one flaw go by without a note.' },
    align: { dating: 'You do best with someone thoughtful who appreciates what you do and doesn’t need you to be perfect.', tryThis: 'Accept help with something you’d usually do alone.' },
  },
  libra: {
    spark: { dating: 'You love the feeling of “us”: a good plan, good manners, easy conversation.', tryThis: 'Pick the place and say why you like it.' },
    clash: { dating: 'You agree to keep things smooth, then feel unseen. People may not know what you actually wanted.', tryThis: 'Say your real preference before they ask twice.' },
    align: { dating: 'You do best with someone fair who wants to know what you think, even when you disagree.', tryThis: 'Disagree about something small, kindly.' },
  },
  scorpio: {
    spark: { dating: 'You’re pulled in by honesty and depth. One real conversation does more than a month of small talk.', tryThis: 'Ask a question you really want the answer to.' },
    clash: { dating: 'You test people before you trust them, and hold on to hurts longer than you admit.', tryThis: 'Ask directly instead of watching what they do.' },
    align: { dating: 'You do best with someone loyal who can handle the truth and tells you theirs.', tryThis: 'Share one true thing before they’ve earned it.' },
  },
  sagittarius: {
    spark: { dating: 'You fall for people who feel like an adventure and can laugh at themselves.', tryThis: 'Suggest somewhere neither of you has been.' },
    clash: { dating: 'When it gets heavy you want out, and you can be blunt in a way that lands harder than you meant.', tryThis: 'Stay for the hard part of one conversation.' },
    align: { dating: 'You do best with someone independent who’s honest and happy to see you when you’re back.', tryThis: 'Make one plan a month ahead and keep it.' },
  },
  capricorn: {
    spark: { dating: 'Effort and ambition attract you. You take love seriously and respect people who do too.', tryThis: 'Tell them what you’re building right now.' },
    clash: { dating: 'You can treat dating like a task and hide what you feel behind being busy.', tryThis: 'Share one worry, not just one win.' },
    align: { dating: 'You do best with someone reliable who makes you laugh and reminds you to rest.', tryThis: 'Take a night fully off, with them.' },
  },
  aquarius: {
    spark: { dating: 'You like people who are a little different and who become a friend first.', tryThis: 'Share the odd thing you’re really into.' },
    clash: { dating: 'When things get close you step back into your head, and it can feel cold from the outside.', tryThis: 'Say “I need a bit of space” before you take it.' },
    align: { dating: 'You do best with someone who gives you room and isn’t thrown by your ideas.', tryThis: 'Let them in on a feeling, not only a thought.' },
  },
  pisces: {
    spark: { dating: 'Kindness and imagination get you. You fall for how someone makes you feel.', tryThis: 'Send the song that says it better than you can.' },
    clash: { dating: 'You can see the person you hoped for instead of the one in front of you, and disappear instead of saying no.', tryThis: 'Say one honest no this week.' },
    align: { dating: 'You do best with someone gentle and grounded who says what they mean.', tryThis: 'Ask them to be direct with you, then listen.' },
  },
}
