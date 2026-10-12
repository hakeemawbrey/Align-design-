import type { PageProps } from '../types'
import { Group, PageShell, Row } from '../../components/kit'
import { OutArrow, useToast } from './bits'

/** G-29 · Help & support */
export default function Help({ go, back }: PageProps) {
  const [toast, show] = useToast()
  return (
    <>
      <PageShell onBack={back} topBar="Help & support" align="center" titleSize={28}
        title={<>A human answers.<br />Usually within a day.</>}
        caption={{ label: 'support@comealign.com' }}
        cta={{ label: 'Message support', onClick: () => show('Message sent. A human writes back within a day.') }}>
        <div style={{ textAlign: 'left', marginTop: -6 }}>
          <Group label="Get unstuck">
            <Row label="FAQ: the basics" onClick={() => go('howto')} />
            <Row label="Report a bug" onClick={() => show('Thanks. We’ll look into it today.')} />
            <Row label="Request my data" onClick={() => go('x/data-export')} />
          </Group>
          <Group label="The rules">
            <Row label="Community guidelines" right={<OutArrow />} onClick={() => go('x/guidelines')} chevron={false} />
            <Row label="Privacy: what we keep" right={<OutArrow />} onClick={() => go('x/privacy')} chevron={false} />
            <Row label="Terms of use" right={<OutArrow />} onClick={() => go('x/terms')} chevron={false} />
            <Row label="Meet safely guide" right={<OutArrow />} onClick={() => go('x/meet-safely')} chevron={false} />
          </Group>
        </div>
      </PageShell>
      {toast}
    </>
  )
}
