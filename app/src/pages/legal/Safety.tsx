import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Label, P, PageShell } from '../../components/kit'
import type { PageProps } from '../types'
import { MEET, REPORT_SENT } from './copy'
import { CenterMessage, Pill, PillList } from './bits'

/** SF-04 Report sent */
export function ReportSent({ back }: PageProps) {
  return (
    <>
      <PageShell close={back} cta={{ label: REPORT_SENT.cta, onClick: back }} />
      <CenterMessage top={318} title={REPORT_SENT.title as [string, string]} body={REPORT_SENT.body} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mono"
        style={{ position: 'absolute', left: 24, right: 24, bottom: 158, textAlign: 'center', fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)', textTransform: 'uppercase' }}>
        {REPORT_SENT.danger}
      </motion.div>
    </>
  )
}

/** SF-05 Meet safely: five things before a date; tap one for the detail */
export function MeetSafely({ back }: PageProps) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <PageShell onBack={back} topBar={MEET.bar} title={<>{MEET.title[0]}<br />{MEET.title[1]}</>}
      cta={{ label: MEET.cta, onClick: back }}>
      <Label style={{ marginTop: -4 }}>{MEET.label}</Label>
      <PillList>
        {MEET.steps.map((s, i) => (
          <Pill key={s.t} onClick={() => setOpen(open === i ? null : i)}
            lead={<span className="mono" style={{ width: 18, fontSize: 12, color: 'var(--label-3)', alignSelf: 'flex-start', marginTop: 14 }}>{String(i + 1).padStart(2, '0')}</span>}
            style={{ alignItems: 'flex-start', padding: '0 16px' }}>
            <span style={{ display: 'block', lineHeight: '44px' }}>{s.t}</span>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  style={{ display: 'block', overflow: 'hidden', fontSize: 13, lineHeight: 1.4, color: 'var(--label-2)' }}>
                  <span style={{ display: 'block', paddingBottom: 12, marginTop: -6 }}>{s.d}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Pill>
        ))}
      </PillList>
      <P style={{ fontSize: 13.5, marginTop: 24 }}>{MEET.note}</P>
    </PageShell>
  )
}
