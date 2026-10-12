import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell, Label, P, Toast } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { AFTER_SIGNIN } from './state'
import { CardRow, type Perm } from './Permissions'

const ROWS: { id: Perm; label: string; cost: string }[] = [
  { id: 'location', label: 'Location', cost: 'no distance sorting. You see your whole city, which is a much noisier deck.' },
  { id: 'notifications', label: 'Notifications', cost: 'no morning horoscope, no comet alerts, no 11:11 timing. The daily ritual is most of Align.' },
  { id: 'camera', label: 'Camera', cost: 'no AuraCam and no photo verification, so your card stays unverified.' },
]

/** G-03b Permissions Denied — what was turned off, what it costs, how to turn it back on. `x/permissions-off/camera,location` */
export default function PermissionsOff({ go, back, arg }: PageProps) {
  const fromArg = (arg ?? '').split(',').filter((p): p is Perm => ROWS.some((r) => r.id === p))
  const [off, setOff] = useState<Perm[]>(fromArg.length ? fromArg : ROWS.map((r) => r.id))
  const [toast, setToast] = useState<string | null>(null)
  const shown = ROWS.filter((r) => fromArg.length === 0 || fromArg.includes(r.id))
  const costs = ROWS.filter((r) => off.includes(r.id))

  const flash = (t: string) => { setToast(t); window.setTimeout(() => setToast(null), 2200) }
  const toggle = (id: Perm) => setOff((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))

  const settings = () => {
    if (!off.length) { sfx.align(); go(AFTER_SIGNIN); return }
    sfx.sparkle()
    setOff([])
    flash('Back on in Settings. Thank you.')
  }

  return (
    <>
      <PageShell
        onBack={back}
        topBar="Permissions"
        eyebrow="You said no"
        title={<>Some of this needs<br />the hardware.</>}
        body="All of these can be switched back on in Settings."
        cta={{ label: off.length ? 'Open Settings' : 'Continue', onClick: settings }}
        caption={off.length ? { label: 'Continue without them', onClick: () => go(AFTER_SIGNIN) } : undefined}
      >
        <Label style={{ marginTop: 0 }}>What you turned off</Label>
        {shown.map((r) => (
          <CardRow key={r.id} label={r.label} onClick={() => toggle(r.id)}
            value={<span style={{ color: off.includes(r.id) ? 'var(--label-3)' : 'var(--label-1)' }}>{off.includes(r.id) ? 'Off' : 'On'}</span>} />
        ))}
        {costs.length > 0 && (
          <>
            <Label style={{ marginTop: 22 }}>What that costs</Label>
            {costs.map((r) => (
              <P key={r.id} style={{ fontSize: 13.5, lineHeight: 1.45, marginBottom: 10, textWrap: 'pretty' }}>
                <strong style={{ color: 'var(--label-1)', fontWeight: 600 }}>{r.label}</strong> — {r.cost}
              </P>
            ))}
          </>
        )}
      </PageShell>
      <AnimatePresence>{toast && <Toast text={toast} />}</AnimatePresence>
    </>
  )
}
