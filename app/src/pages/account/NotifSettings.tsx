import type { PageProps } from '../types'
import { Group, P, PageShell, Row, Toggle } from '../../components/kit'
import { account, useAccount, type NotifPrefs } from './store'

/** S-19e · Notification settings */
export default function NotifSettings({ back }: PageProps) {
  const a = useAccount()
  const t = (k: keyof NotifPrefs, label: string, value?: string) => (
    <Row label={label} value={value} right={<Toggle on={a.push && a.notifs[k]} onChange={(v) => { if (!a.push && v) account.patch({ push: true }); account.setNotif(k, v) }} />} />
  )
  return (
    <PageShell onBack={back} topBar="Notifications">
      <P style={{ margin: '2px 0 0', fontSize: 13.5 }}>
        {a.push ? 'Choose what reaches you. The rest stays in the sky.' : 'Push notifications are off. Turn one on to hear from the sky again.'}
      </P>
      <Group label="The deck">
        {t('morning', 'Morning reading', a.morningAt)}
        {t('refill', 'Deck refilled')}
        {t('transits', 'Transits that touch your chart')}
      </Group>
      <Group label="Matches">
        {t('alignments', 'New alignments')}
        {t('comets', 'Comets sent your way')}
        {t('closing', 'Cards about to close')}
      </Group>
      <Group label="The club">
        {t('replies', 'Replies to your posts')}
        {t('mentions', 'Mentions in your sign')}
      </Group>
      <P style={{ margin: '18px 16px 0', fontSize: 12.5, color: 'var(--label-3)' }}>Quiet hours run 11 pm to 7 am. Nothing pings you in the dark.</P>
    </PageShell>
  )
}
