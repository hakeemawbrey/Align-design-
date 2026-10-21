import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { Group, PageShell, Row, Toggle } from '../../components/kit'
import { useSession } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { account, useAccount } from './store'
import { useToast } from './bits'
import { BIRTH_LABEL } from '../../data/myBirth'
import { TERMS } from '../plus/terms'

/** G-07 · Settings */
export default function Settings({ go, back }: PageProps) {
  const { alignPlus, blockedSigns, blockedPeople } = useSession()
  const a = useAccount()
  const [toast, show] = useToast()

  return (
    <>
    <PageShell onBack={back} topBar="Settings">
      <div style={{ marginTop: -18 }}>
        <Group label="Membership">
          <Row label={alignPlus ? 'Align+ · Founding member' : 'Align+'} value={alignPlus ? 'Lifetime' : 'Not yet'}
            onClick={() => go(alignPlus ? 'x/manage-plus' : 'paywall')} />
        </Group>

        <Group label="Your chart">
          <Row label="Edit your chart" onClick={() => go('x/edit-chart')} />
          <Row label="Edit your card" onClick={() => go('x/edit-card/down')} />
          <Row label="The language" value={`${TERMS.filter((t) => t.free).length} of ${TERMS.length}`} onClick={() => go('howto')} />
        </Group>

        <Group label="Your orbit">
          <Row label="Blocked signs" value={blockedSigns.length || undefined} onClick={() => go('block')} />
          <Row label="Blocked people" value={blockedPeople.length || undefined} onClick={() => go('x/blocked-list')} />
          <Row label="Verify your photo" onClick={() => go('x/verify-photo')} />
          <Row label="Your city" value={BIRTH_LABEL.place} onClick={() => go('x/change-city')} />
        </Group>

        <Group label="App">
          <Row label="Push notifications" right={<Toggle on={a.push} onChange={(v) => account.patch({ push: v })} />} />
          <Row label="Notification settings" value={a.push ? undefined : 'Off'} onClick={() => go('x/notif-settings')} />
          <Row label="Language" value="English" onClick={() => show('More languages arrive with the next season.')} />
        </Group>

        <Group label="Get in touch">
          <Row label="Help & support" onClick={() => go('x/help')} />
          <Row label="Pause or delete my account" value={a.paused ? 'Paused' : undefined} onClick={() => go('x/pause')} />
        </Group>

        <Group label="The fine print">
          <Row label="Community guidelines" onClick={() => go('x/guidelines')} />
          <Row label="Terms of use" onClick={() => go('x/terms')} />
          <Row label="Privacy" onClick={() => go('x/privacy')} />
          <Row label="Download my data" onClick={() => go('x/data-export')} />
          <Row label="About Align" onClick={() => go('x/about')} />
        </Group>

        <div style={{ textAlign: 'center', marginTop: 26 }}>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => { sfx.tap(); show('Signed out. Your chart waits for you.') }}
            style={{ height: 36, padding: '0 16px', fontSize: 13.5, color: 'var(--label-2)' }}>Sign out</motion.button>
          <div className="mono" style={{ marginTop: 4, fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)' }}>ALIGN 1.0 (12)</div>
        </div>
      </div>
    </PageShell>
    {toast}
    </>
  )
}
