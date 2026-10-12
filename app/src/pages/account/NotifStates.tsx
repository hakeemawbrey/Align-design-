import type { PageProps } from '../types'
import { NotifsEmptyView, NotifsGroupedView } from '../../screens/Notifications'

/** S-19b · No notifications */
export function NotifsEmpty({ go, back }: PageProps) {
  return <NotifsEmptyView go={go} onBack={back} />
}

/** S-19d · Notifications grouped by day range */
export function NotifsGrouped({ go, back }: PageProps) {
  return <NotifsGroupedView go={go} onBack={back} />
}
