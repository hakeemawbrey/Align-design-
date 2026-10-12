import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Label, P, PageShell, Toast } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'
import { EXPORT } from './copy'
import { Pill, PillList } from './bits'

/** L-05 Data export: what is in the file, how it arrives, one button to request it */
export function DataExport({ back }: PageProps) {
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const request = () => {
    if (sent) { back(); return }
    sfx.sparkle()
    setSent(true)
    setToast(EXPORT.sent)
    window.setTimeout(() => setToast(null), 2400)
  }

  const tick = (
    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}
      width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="var(--label-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5.5 5 9l7.5-7.5" />
    </motion.svg>
  )

  return (
    <>
      <PageShell onBack={back} topBar={EXPORT.bar} title={<>{EXPORT.title[0]}<br />{EXPORT.title[1]}</>}
        cta={{ label: sent ? EXPORT.sentCta : EXPORT.cta, onClick: request }}>
        <Label style={{ marginTop: -4 }}>What is included</Label>
        <PillList>
          {EXPORT.included.map((t, i) => (
            <Pill key={t} right={sent ? <span style={{ transitionDelay: `${i * 60}ms` }}>{tick}</span> : null}>{t}</Pill>
          ))}
        </PillList>
        <Label style={{ marginTop: 26 }}>How it arrives</Label>
        <P style={{ fontSize: 13.5 }}>{EXPORT.how}</P>
      </PageShell>
      <AnimatePresence>{toast && <Toast key="t" text={toast} />}</AnimatePresence>
    </>
  )
}
