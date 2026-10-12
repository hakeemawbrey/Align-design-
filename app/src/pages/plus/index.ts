import type { CaptureShot, PageDef } from '../types'
import Term from './Term'
import Glossary from './Glossary'
import ClubEmpty from './ClubEmpty'
import ReportPost from './ReportPost'
import PostRemoved from './PostRemoved'
import Priority from './Priority'
import ChangeCity from './ChangeCity'
import Trial from './Trial'
import WaitReset from './WaitReset'
import ManagePlus from './ManagePlus'
import TrialEnding from './TrialEnding'
import PaymentFailed from './PaymentFailed'
import Restore from './Restore'

export const PAGES: Record<string, PageDef> = {
  term: { ref: 'S-16 — Term Explainer', Component: Term, home: 'chart' },
  glossary: { ref: 'S-20 — Glossary', Component: Glossary, home: 'chart' },
  'club-empty': { ref: 'S-17c — Empty Club', Component: ClubEmpty, home: 'club' },
  'report-post': { ref: 'S-18b — Report Post', Component: ReportPost, home: 'club' },
  'post-removed': { ref: 'S-18c — Post Removed', Component: PostRemoved, home: 'club' },
  priority: { ref: 'P-02 — Priority Queue', Component: Priority, home: 'block' },
  'change-city': { ref: 'P-03 — Change City', Component: ChangeCity, home: 'you' },
  trial: { ref: 'S-12 — Trial Active', Component: Trial, home: 'deck' },
  'wait-reset': { ref: 'S-13 — Wait for Reset', Component: WaitReset, home: 'spent' },
  'manage-plus': { ref: 'G-13 — Manage Align+', Component: ManagePlus, home: 'you' },
  'trial-ending': { ref: 'G-14 — Trial Ending', Component: TrialEnding, home: 'deck' },
  'payment-failed': { ref: 'G-15 — Payment Failed', Component: PaymentFailed, home: 'deck' },
  restore: { ref: 'G-16 — Restore Purchases', Component: Restore, home: 'paywall' },
}

export const SHOTS: CaptureShot[] = [
  { name: 'S-16 — Term Explainer', hash: 'x/term/seventh-house' },
  { name: 'S-20 — Glossary', hash: 'x/glossary', session: { alignPlus: false } },
  { name: 'S-17c — Empty Club', hash: 'x/club-empty' },
  { name: 'S-18b — Report Post', hash: 'x/report-post/mireya' },
  { name: 'S-18c — Post Removed', hash: 'x/post-removed' },
  { name: 'P-02 — Priority Queue', hash: 'x/priority', session: { alignPlus: false } },
  { name: 'P-03 — Change City', hash: 'x/change-city' },
  { name: 'S-12 — Trial Active', hash: 'x/trial/yearly', wait: 2000 },
  { name: 'S-13 — Wait for Reset', hash: 'x/wait-reset' },
  { name: 'G-13 — Manage Align+', hash: 'x/manage-plus' },
  { name: 'G-14 — Trial Ending', hash: 'x/trial-ending/founding' },
  { name: 'G-15 — Payment Failed', hash: 'x/payment-failed' },
  { name: 'G-16 — Restore Purchases', hash: 'x/restore', wait: 1600 },
]
