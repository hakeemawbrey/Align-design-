import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import type { ScreenId } from '../../screens/types'
import { CARD_BG, CARD_LINE, Group, Label, PageShell, Row } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import { PERSONA, type PersonaId } from '../../data/persona'

interface Detail {
  eyebrow: string
  title: string
  body: string
  means: { head: string; body: string }
  lasts: { label: string; value: string; to: ScreenId }
  cta: { label: string; to: ScreenId }
  why: string
}

/** "What it means for you", read against each founder's chart */
const MEANS: Record<PersonaId, Record<'venus-retro' | 'moon-pisces', Detail['means']>> = {
  hakeem: {
    'venus-retro': { head: 'Taurus Sun · Venus rules you', body: 'Venus is your planet, so this one lands harder on you than on most. Revisit, don’t rush. The sky will carry what’s real.' },
    'moon-pisces': { head: 'Sagittarius Moon · restless', body: 'Your moon wants to roam. Pisces asks it to sit still for one night. Write down what you keep circling.' },
  },
  xavier: {
    'venus-retro': { head: 'Venus in Scorpio · that’s yours', body: 'Venus is backing through Scorpio, your Venus sign, so this one lands harder on you than on most. Revisit, don’t rush. The sky will carry what’s real.' },
    'moon-pisces': { head: 'Capricorn Moon · on duty', body: 'Your moon wants to stay useful. Pisces asks it to put the list down for one night. Write down what you keep circling.' },
  },
}

/** S-19c · one notification, opened. Keyed by the address arg: x/notif-detail/<id> */
const DETAILS: Record<string, Detail> = {
  'venus-retro': {
    eyebrow: 'Active transit · Oct 3 · 8:00',
    title: 'Venus turns retrograde.',
    body: 'Venus slows, stops and walks backwards through your love life. Old flames come back around, first impressions run soft, and second looks are worth taking. Go slow on anything new.',
    means: MEANS[PERSONA.id]['venus-retro'],
    lasts: { label: 'Until November 13', value: '39 days', to: 'calendar' },
    cta: { label: 'See it on your chart', to: 'chart' },
    why: 'Sent to you because Transit alerts are on.',
  },
  'moon-pisces': {
    eyebrow: 'Moon phase · Oct 1 · 7:40',
    title: 'Quiet your mind, look inward.',
    body: 'The Moon drifts through Pisces. Feelings run deep and blurry. It’s a night for the journal, not the deck. Let tomorrow’s cards wait.',
    means: MEANS[PERSONA.id]['moon-pisces'],
    lasts: { label: 'Until October 3', value: '2 days', to: 'calendar' },
    cta: { label: 'Read today’s sky', to: 'sky' },
    why: 'Sent to you because your morning reading is on.',
  },
}

export default function NotifDetail({ go, back, arg }: PageProps) {
  const d = DETAILS[arg ?? ''] ?? DETAILS['venus-retro']
  return (
    <PageShell onBack={back} topBar="Notification" caption={{ label: d.why }} cta={{ label: d.cta.label, onClick: () => go(d.cta.to) }}>
      <motion.div {...rise(0.05, 8)} className="mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-2)', textTransform: 'uppercase' }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: '#7fd8b0', boxShadow: '0 0 8px #7fd8b0' }} />
        {d.eyebrow}
      </motion.div>
      <motion.h1 {...rise(0.12)} className="h-display" style={{ marginTop: 8, fontSize: 30, lineHeight: 1.12 }}>{d.title}</motion.h1>
      <motion.p {...rise(0.2)} style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.55, color: 'var(--label-2)' }}>{d.body}</motion.p>
      <Label style={{ marginTop: 26 }}>What it means for you</Label>
      <div style={{ padding: '14px 16px', borderRadius: 16, background: CARD_BG, border: CARD_LINE }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--label-1)' }}>{d.means.head}</div>
        <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, color: 'var(--label-2)' }}>{d.means.body}</div>
      </div>
      <Group label="Lasts">
        <Row label={d.lasts.label} value={d.lasts.value} onClick={() => go(d.lasts.to)} />
      </Group>
    </PageShell>
  )
}
