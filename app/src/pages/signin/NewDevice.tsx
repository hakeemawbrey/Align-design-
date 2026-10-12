import { useMemo, useState } from 'react'
import type { PageProps } from '../types'
import { PageShell, Label, P } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { clock } from './state'
import { CardRow } from './Permissions'

/** G-22 New Device — a security check: was that sign-in you? */
export default function NewDevice({ go, back }: PageProps) {
  const [locked, setLocked] = useState(false)
  const when = useMemo(() => `Today, ${clock()}`, [])

  if (locked) {
    return (
      <PageShell
        close={() => go('welcome')}
        topBar="Security"
        eyebrow="Account locked"
        title={<>Every device<br />is signed out.</>}
        body="Your card is hidden and your matches are on hold. Sign back in on this phone to unlock — we will ask for a fresh code."
        cta={{ label: 'Sign in again', onClick: () => go('x/phone') }}
        caption={{ label: 'Talk to a person', onClick: () => go('x/help') }}
      />
    )
  }

  return (
    <PageShell
      close={back}
      topBar="Security"
      eyebrow="Someone signed in"
      title={<>A new device<br />asked for you.</>}
      body="First time we have seen it. Was it you?"
      cta={{ label: 'That was me', onClick: () => { sfx.align(); go('x/permissions') } }}
      caption={{ label: 'That was not me — lock my account', onClick: () => { sfx.deny(); setLocked(true) } }}
    >
      <Label style={{ marginTop: 0 }}>The device</Label>
      <CardRow label="Device" value="iPhone 17 Pro, iOS 26.2" />
      <CardRow label="When" value={when} />
      <CardRow label="Where" value="Houston, 4 mi from usual" />
      <Label style={{ marginTop: 22 }}>If this was not you</Label>
      <P style={{ fontSize: 13.5, textWrap: 'pretty' }}>Lock the account and we sign out every device, hide your card and hold your matches until you are back in.</P>
    </PageShell>
  )
}
