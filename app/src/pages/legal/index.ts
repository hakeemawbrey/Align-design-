import type { CaptureShot, PageDef } from '../types'
import { About, AboutCity } from './About'
import { Terms, Privacy, Guidelines } from './LegalDoc'
import { DeleteConfirm } from './DeleteConfirm'
import { DataExport } from './DataExport'
import { VerifyPhoto, Verified, PhotoRejected } from './Verify'
import { BlockedList } from './BlockedList'
import { ReportSent, MeetSafely } from './Safety'

export const PAGES: Record<string, PageDef> = {
  'about': { ref: 'A-01 — About Align', Component: About, home: 'you' },
  'about-city': { ref: 'A-02 — About Align · Space City', Component: AboutCity, home: 'you' },
  'terms': { ref: 'L-01 — Terms', Component: Terms, home: 'you' },
  'privacy': { ref: 'L-02 — Privacy', Component: Privacy, home: 'you' },
  'guidelines': { ref: 'L-03 — Guidelines', Component: Guidelines, home: 'you' },
  'delete-confirm': { ref: 'L-04 — Delete Confirm', Component: DeleteConfirm, home: 'you' },
  'data-export': { ref: 'L-05 — Data Export', Component: DataExport, home: 'you' },
  'verify-photo': { ref: 'SF-01 — Verify Photo', Component: VerifyPhoto, home: 'you' },
  'verified': { ref: 'SF-02 — Verified', Component: Verified, home: 'you' },
  'photo-rejected': { ref: 'SF-02b — Photo Rejected', Component: PhotoRejected, home: 'you' },
  'blocked-list': { ref: 'SF-03 — Blocked List', Component: BlockedList, home: 'you' },
  'report-sent': { ref: 'SF-04 — Report Sent', Component: ReportSent, home: 'matches' },
  'meet-safely': { ref: 'SF-05 — Meet Safely', Component: MeetSafely, home: 'matches' },
}

export const SHOTS: CaptureShot[] = [
  { name: 'A-01 — About Align', hash: 'x/about' },
  { name: 'A-02 — About Align · Space City', hash: 'x/about-city' },
  { name: 'L-01 — Terms', hash: 'x/terms' },
  { name: 'L-02 — Privacy', hash: 'x/privacy' },
  { name: 'L-03 — Guidelines', hash: 'x/guidelines' },
  { name: 'L-04 — Delete Confirm', hash: 'x/delete-confirm' },
  { name: 'L-05 — Data Export', hash: 'x/data-export' },
  { name: 'SF-01 — Verify Photo', hash: 'x/verify-photo' },
  { name: 'SF-02 — Verified', hash: 'x/verified' },
  { name: 'SF-02b — Photo Rejected', hash: 'x/photo-rejected' },
  { name: 'SF-03 — Blocked List', hash: 'x/blocked-list' },
  { name: 'SF-04 — Report Sent', hash: 'x/report-sent' },
  { name: 'SF-05 — Meet Safely', hash: 'x/meet-safely' },
]
