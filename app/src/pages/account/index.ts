import type { CaptureShot, PageDef } from '../types'
import EditChart from './EditChart'
import Settings from './Settings'
import Pause from './Pause'
import EditCard from './EditCard'
import Help from './Help'
import NotifDetail from './NotifDetail'
import NotifSettings from './NotifSettings'
import { NotifsEmpty, NotifsGrouped } from './NotifStates'

export const PAGES: Record<string, PageDef> = {
  'edit-chart': { ref: 'G-06 — Edit Chart', Component: EditChart, home: 'you' },
  settings: { ref: 'G-07 — Settings', Component: Settings, home: 'you' },
  pause: { ref: 'G-08 — Pause / Delete', Component: Pause, home: 'you' },
  'edit-card': { ref: 'G-27 — Edit Card · Face Down / G-28 — Edit Card · Flipped', Component: EditCard, home: 'you' },
  help: { ref: 'G-29 — Help & Support', Component: Help, home: 'you' },
  'notifs-empty': { ref: 'S-19b — No Notifications', Component: NotifsEmpty, home: 'notifications' },
  'notif-detail': { ref: 'S-19c — Notification · Detail', Component: NotifDetail, home: 'notifications' },
  'notifs-grouped': { ref: 'S-19d — Notification · Grouped', Component: NotifsGrouped, home: 'notifications' },
  'notif-settings': { ref: 'S-19e — Notification · Settings', Component: NotifSettings, home: 'notifications' },
}

export const SHOTS: CaptureShot[] = [
  { name: 'G-06 — Edit Chart', hash: 'x/edit-chart' },
  { name: 'G-07 — Settings', hash: 'x/settings' },
  { name: 'G-08 — Pause / Delete', hash: 'x/pause' },
  { name: 'G-27 — Edit Card · Face Down', hash: 'x/edit-card/down' },
  { name: 'G-28 — Edit Card · Flipped', hash: 'x/edit-card/flipped' },
  { name: 'G-29 — Help & Support', hash: 'x/help' },
  { name: 'S-19b — No Notifications', hash: 'x/notifs-empty' },
  { name: 'S-19c — Notification · Detail', hash: 'x/notif-detail/venus-retro' },
  { name: 'S-19d — Notification · Grouped', hash: 'x/notifs-grouped' },
  { name: 'S-19e — Notification · Settings', hash: 'x/notif-settings' },
]
