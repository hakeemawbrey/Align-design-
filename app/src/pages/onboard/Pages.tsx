import type { PageProps } from '../types'
import { OnboardingFlow } from '../../screens/Onboarding'
import { DEFAULT_TIME } from '../../components/onboarding/readings'
import { SIGN_BIRTH } from '../../components/onboarding/zodiac'
import { SIGNS, type Element, type SignId } from '../../data/signs'
import Deck from '../../screens/Deck'
import { ME } from '../../data/profiles'

/** O-03c — the birth-time step with "I don't know the minute" already tapped. */
export function NoBirthTime({ go, back }: PageProps) {
  return <OnboardingFlow go={go} exit={back} start="time" initialTime={{ ...DEFAULT_TIME, exact: false, part: 'morning' }} />
}

/** O-05 — the sun-sign reveal for any sign: x/reveal/<sign>. Opens the flow with a birthday in that sign. */
export function SignRevealPage({ go, back, arg }: PageProps) {
  const id = (arg && arg in SIGNS ? arg : ME.sign) as SignId
  return <OnboardingFlow key={id} go={go} exit={back} start="reveal" initialBirth={SIGN_BIRTH[id]} />
}

const ELEMENTS: Element[] = ['fire', 'earth', 'air', 'water']

/** S-05x — tonight's deck under a forced sky: x/deck-sky/<fire|earth|air|water>. Without one it follows the real Moon. */
export function DeckSky({ go, arg }: PageProps) {
  const el = ELEMENTS.includes(arg as Element) ? (arg as Element) : undefined
  return <Deck go={go} sky={el} />
}
