import TermText from '../../pages/plus/TermText'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { JUPITER_IN, VENUS_IN } from '../../data/planetReadings'
import { MY_CHART } from '../../data/myBirth'
import { signOf } from '../../lib/astro'
import { TABS } from '../../screens/Chart'
import type { ScreenId } from '../../screens/types'

/** what a tab's card reads */
export interface Read { id: string; color: string; headline: string; meaning: string; love: string; self: string; tryLine: string }

const JUPITER = signOf(MY_CHART.jupiter)
const HOUSE_TAB = TABS.find((x) => x.id === 'house')!

/** the six parts of you, said the way a friend would explain them */
export const PARTS = [
  { word: 'Sun', value: SIGNS[ME.sign].name, glyph: SIGNS[ME.sign].glyph, plain: 'Who you are', size: 44, color: '#c9a032', light: '#fff1b8', dark: '#3a2a08', ring: '#e8c860', ink: '#f2d76a', read: TABS[0] as Read },
  { word: 'Moon', value: SIGNS[ME.moon].name, glyph: SIGNS[ME.moon].glyph, plain: 'How you feel', size: 36, color: '#2f6fe0', light: '#b8d4ff', dark: '#0a1640', ring: undefined, ink: '#8fb4ff', read: TABS[1] as Read },
  { word: 'Rising', value: SIGNS[ME.rising].name, glyph: SIGNS[ME.rising].glyph, plain: 'How you come across', size: 36, color: '#9a4ee0', light: '#ecd8ff', dark: '#24104a', ring: undefined, ink: '#cdb0ff', read: TABS[2] as Read },
  { word: 'Venus', value: SIGNS[ME.venus].name, glyph: SIGNS[ME.venus].glyph, plain: 'How you love', size: 34, color: '#e0559a', light: '#ffd3e6', dark: '#4a0e2c', ring: undefined, ink: '#ff9ac4',
    read: { id: 'venus', color: '#ff9ac4', meaning: `Venus is the planet of love and attraction. Its sign shows how you flirt, what you find attractive and how you show you care. Yours is in ${SIGNS[ME.venus].name}.`, ...VENUS_IN[ME.venus] } as Read },
  { word: 'Jupiter', value: SIGNS[JUPITER].name, glyph: SIGNS[JUPITER].glyph, plain: 'Where you get lucky', size: 40, color: '#e08a3a', light: '#ffe0b8', dark: '#4a2408', ring: '#f2b872', ink: '#ffb36a',
    read: { id: 'jupiter', color: '#ffb36a', meaning: `Jupiter is the planet of luck and growth. Its sign shows where things come easily to you and where you’re meant to stretch. Yours is in ${SIGNS[JUPITER].name}.`, ...JUPITER_IN[JUPITER] } as Read },
  { word: 'House', value: HOUSE_TAB.eyebrow.replace(/ house/i, ''), glyph: '⌂', plain: 'Where your energy goes', size: 34, color: '#a86ad0', light: '#f0dcff', dark: '#2c1248', ring: undefined, ink: '#dcaaf2', read: HOUSE_TAB as Read },
]

/** the body of a chart card: what it is, in love, for you (the card's strip carries "try this") */
export function Reading({ t, go }: { t: Read; go: (id: ScreenId) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 4 }}>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--label-2)' }}><TermText text={t.meaning} go={go} /></p>
      {([['In love', t.love], ['For you', t.self]] as const).map(([k, v]) => (
        <div key={k} style={{ paddingTop: 12, borderTop: '1px solid rgba(179,166,196,0.16)' }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fontWeight: 700, color: t.color }}>{k.toUpperCase()}</div>
          <div style={{ fontSize: 15.5, lineHeight: 1.45, color: 'var(--label-1)', marginTop: 4 }}><TermText text={v} go={go} /></div>
        </div>
      ))}
    </div>
  )
}

