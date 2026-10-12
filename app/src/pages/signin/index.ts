import type { CaptureShot, PageDef } from '../types'
import { Phone, Email } from './Entry'
import Code from './Code'
import Permissions from './Permissions'
import PermissionsOff from './PermissionsOff'
import SigninFailed from './SigninFailed'
import LostNumber from './LostNumber'
import NewDevice from './NewDevice'
import { Loading, Offline, NoCards, Update } from './System'

export const PAGES: Record<string, PageDef> = {
  phone: { ref: 'G-01 — Phone Entry', Component: Phone, home: 'welcome' },
  email: { ref: 'G-01b — Email Entry', Component: Email, home: 'welcome' },
  code: { ref: 'G-02 — Code Verification', Component: Code, home: 'welcome' },
  permissions: { ref: 'G-03 — Permission Primers', Component: Permissions, home: 'welcome' },
  'permissions-off': { ref: 'G-03b — Permissions Denied', Component: PermissionsOff, home: 'you' },
  'signin-failed': { ref: 'G-04 — Sign-in Failure', Component: SigninFailed, home: 'welcome' },
  'lost-number': { ref: 'G-21 — Lost Number', Component: LostNumber, home: 'welcome' },
  'new-device': { ref: 'G-22 — New Device', Component: NewDevice, home: 'you' },
  loading: { ref: 'G-17 — Loading', Component: Loading, home: 'deck' },
  offline: { ref: 'G-18 — Offline', Component: Offline, home: 'deck' },
  'no-cards': { ref: 'G-19 — No Cards', Component: NoCards, home: 'deck' },
  update: { ref: 'G-20 — Error / Update', Component: Update, home: 'splash' },
}

export const SHOTS: CaptureShot[] = [
  { name: 'G-01 — Phone Entry', hash: 'x/phone' },
  { name: 'G-01b — Email Entry', hash: 'x/email' },
  { name: 'G-02 — Code Verification', hash: 'x/code/411' },
  { name: 'G-03 — Permission Primers', hash: 'x/permissions' },
  { name: 'G-03b — Permissions Denied', hash: 'x/permissions-off' },
  { name: 'G-04 — Sign-in Failure', hash: 'x/signin-failed' },
  { name: 'G-21 — Lost Number', hash: 'x/lost-number' },
  { name: 'G-22 — New Device', hash: 'x/new-device' },
  { name: 'G-17 — Loading', hash: 'x/loading' },
  { name: 'G-18 — Offline', hash: 'x/offline' },
  { name: 'G-19 — No Cards', hash: 'x/no-cards' },
  { name: 'G-20 — Error / Update', hash: 'x/update' },
]
