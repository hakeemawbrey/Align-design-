import { SIGN_ORDER } from './astro'
import { SIGNS, type Element, type SignId } from '../data/signs'
import { ME, profileById, type Profile } from '../data/profiles'

/**
 * How you and someone else fit, written for a relationship rather than for an
 * astrologer: four everyday areas, each a plain sentence and one thing to try.
 *
 * There is NO score, percentage, rating or ranking here, on purpose: Align
 * describes how two people's placements relate and never claims to measure or
 * predict a relationship. Don't add a number, a bar or a good/bad colour.
 */

/** the angle between two signs, grouped by how it tends to feel */
export type Feel = 'alike' | 'easy' | 'opposite' | 'friction' | 'different'

export function feelOf(a: SignId, b: SignId): Feel {
  const d = (SIGN_ORDER.indexOf(b) - SIGN_ORDER.indexOf(a) + 12) % 12
  const n = Math.min(d, 12 - d)
  // same sign · neighbours · sextile · square · trine · quincunx · opposite
  return (['alike', 'different', 'easy', 'friction', 'easy', 'different', 'opposite'] as const)[n]
}

/** a neutral word for each, shown as a tag (a description, not a grade) */
export const FEEL_TAG: Record<Feel, string> = {
  alike: 'Alike',
  easy: 'Comes naturally',
  opposite: 'Opposites',
  friction: 'Takes patience',
  different: 'Different styles',
}

/** what each element is like in each area, in everyday words */
const STYLE: Record<Element, string> = {
  fire: 'move fast and say what you want',
  earth: 'build slowly and show love by doing',
  air: 'think out loud and need variety',
  water: 'feel first and love deeply',
}
const NEED: Record<Element, string> = {
  fire: 'excitement and honesty',
  earth: 'steadiness and follow-through',
  air: 'conversation and room to breathe',
  water: 'closeness and reassurance',
}
const VIBE: Record<Element, string> = {
  fire: 'bold and direct',
  earth: 'calm and put-together',
  air: 'chatty and curious',
  water: 'soft and a little guarded',
}

export interface Placements { sign: SignId; moon: SignId; rising: SignId }

export interface FitArea {
  id: 'daily' | 'feelings' | 'first' | 'understood'
  /** the relationship question this answers */
  title: string
  sub: string
  glyph: string
  feel: Feel
  body: string
  tryThis: string
  /** the placements behind it, for anyone who wants the astrology */
  from: string
}

export interface Fit {
  /** one line on how the two sun elements mix */
  summary: string
  areas: FitArea[]
}

const ELEMENTS: Record<string, string> = {
  'fire-fire': 'Two fire signs: big energy, big feelings.',
  'fire-air': 'Fire and air: you fan each other’s flame.',
  'fire-earth': 'Fire and earth: passion meets patience.',
  'fire-water': 'Fire and water: intense, sometimes steamy.',
  'earth-earth': 'Two earth signs: steady, loyal, slow to move.',
  'earth-water': 'Earth and water: a safe place for feelings to grow.',
  'earth-air': 'Earth and air: plans meet ideas.',
  'air-air': 'Two air signs: you could talk all night.',
  'air-water': 'Air and water: head meets heart.',
  'water-water': 'Two water signs: deep, intuitive, very close.',
}

const el = (s: SignId) => SIGNS[s].element
const nm = (s: SignId) => SIGNS[s].name

export function fitBetween(me: Placements, them: Placements, name: string): Fit {
  const daily = feelOf(me.sign, them.sign)
  const feelings = feelOf(me.moon, them.moon)
  const first = feelOf(me.rising, them.rising)
  // "feeling understood": your core against their feelings, and theirs against yours; lead with the gentler one
  const order: Feel[] = ['alike', 'easy', 'opposite', 'friction', 'different']
  const crosses = [feelOf(me.sign, them.moon), feelOf(me.moon, them.sign)]
  const understood = crosses.sort((a, b) => order.indexOf(a) - order.indexOf(b))[0]

  // when you share the trait, say so once instead of twice
  const same = (mine: SignId, theirs: SignId) => el(mine) === el(theirs)
  const styles = same(me.sign, them.sign) ? `You both ${STYLE[el(me.sign)]}.` : `You ${STYLE[el(me.sign)]}; ${name} tends to ${STYLE[el(them.sign)]}.`
  const needs = same(me.moon, them.moon) ? `You both need ${NEED[el(me.moon)]}.` : `You need ${NEED[el(me.moon)]}; ${name} needs ${NEED[el(them.moon)]}.`
  const vibes = same(me.rising, them.rising) ? `You both come across ${VIBE[el(me.rising)]}.` : `You come across ${VIBE[el(me.rising)]}; ${name} comes across ${VIBE[el(them.rising)]}.`

  const DAILY: Record<Feel, [string, string]> = {
    alike: [`You’re both ${nm(me.sign)}, so you both ${STYLE[el(me.sign)]}. Easy to understand each other, and easy to share the same blind spots.`, 'Take turns being the one who plans.'],
    easy: [`${styles} Those rhythms sit well side by side.`, 'Do one ordinary thing together: groceries, a walk, a slow morning.'],
    opposite: [`${styles} Opposite signs often fill each other’s gaps.`, 'Ask how they’d do it, then try it their way once.'],
    friction: [`${styles} Those speeds can bump into each other.`, 'Agree on plans early, and say when you need to slow down or speed up.'],
    different: [`${styles} You come at life from different angles, so little is automatic.`, 'Explain why something matters to you, not just what you want.'],
  }
  const FEELINGS: Record<Feel, [string, string]> = {
    alike: [`You both need ${NEED[el(me.moon)]}. You’ll usually know what the other is asking for without a speech.`, 'Notice when you both go quiet at once. One of you has to speak first.'],
    easy: [`${needs} Those needs tend to feed each other.`, 'Tell them about the last time you felt looked after.'],
    opposite: [`${needs} Each of you offers what the other doesn’t reach for alone.`, 'Trade: ask for your thing, then give them theirs.'],
    friction: [`${needs} On a hard day those can pull in different directions.`, 'When you’re upset, say what you need in one sentence.'],
    different: [`${needs} Neither is obvious to the other, so spell it out.`, 'Ask: “Do you want comfort, or a solution?”'],
  }
  const FIRST: Record<Feel, [string, string]> = {
    alike: [`You both come across ${VIBE[el(me.rising)]}. You probably recognised each other right away.`, 'Say the first thing you noticed about them.'],
    easy: [`${vibes} Early dates tend to feel relaxed.`, 'Say the first thing you noticed about them.'],
    opposite: [`${vibes} A classic pull: each of you looks like what the other is missing.`, 'Tell them what surprised you about them.'],
    friction: [`${vibes} You may misread each other at first.`, 'Give it a second date before you decide what they think.'],
    different: [`${vibes} First impressions may not say much here.`, 'Let it warm up. Ask something you can’t tell from their card.'],
  }
  const UNDERSTOOD: Record<Feel, [string, string]> = {
    alike: [`Who one of you is matches how the other feels. One of you will often feel “got” without explaining.`, 'Say “that’s exactly it” out loud when it happens.'],
    easy: [`Who one of you is sits well with how the other feels. One of you will often feel “got” without explaining.`, 'Say “that’s exactly it” out loud when it happens.'],
    opposite: [`Who you are and how ${name} feels sit across from each other. You notice what they need because it’s unlike you.`, 'Name one thing they do that you never would, kindly.'],
    friction: [`Who you are and how ${name} feels don’t line up on their own. Feeling understood will come from asking, not guessing.`, 'Ask one real question a day, and listen to the whole answer.'],
    different: [`Who you are and how ${name} feels don’t line up on their own. Feeling understood will come from asking, not guessing.`, 'Ask one real question a day, and listen to the whole answer.'],
  }

  const area = (id: FitArea['id'], title: string, sub: string, glyph: string, feel: Feel, [body, tryThis]: [string, string], from: string): FitArea =>
    ({ id, title, sub, glyph, feel, body, tryThis, from })

  const ea = el(me.sign), eb = el(them.sign)
  return {
    summary: ELEMENTS[`${ea}-${eb}`] ?? ELEMENTS[`${eb}-${ea}`],
    areas: [
      area('daily', 'Day to day', 'How you each move through life', '☉', daily, DAILY[daily], `Your ${nm(me.sign)} sun · ${name}’s ${nm(them.sign)} sun`),
      area('feelings', 'Feelings', 'What you each need to feel safe', '☽', feelings, FEELINGS[feelings], `Your ${nm(me.moon)} moon · ${name}’s ${nm(them.moon)} moon`),
      area('first', 'First impressions', 'How you come across to each other', '↑', first, FIRST[first], `Your ${nm(me.rising)} rising · ${name}’s ${nm(them.rising)} rising`),
      area('understood', 'Feeling understood', 'Whether you “get” each other', '◎', understood, UNDERSTOOD[understood], `Your sun and moon · ${name}’s sun and moon`),
    ],
  }
}

/**
 * You and them. A match we only know the sun sign of (no birth time on their
 * card) gets the day-to-day area alone, rather than a guess at the rest.
 */
export function fitWith(them: Pick<Profile, 'id' | 'sign' | 'name'> & Partial<Profile>): Fit & { sunOnly: boolean } {
  const full = profileById(them.id) ?? (them.real ? them : undefined)
  const fit = fitBetween(ME, { sign: them.sign, moon: full?.moon ?? them.sign, rising: full?.rising ?? them.sign }, them.name)
  return full?.moon && full.rising ? { ...fit, sunOnly: false } : { ...fit, areas: fit.areas.filter((a) => a.id === 'daily'), sunOnly: true }
}
