import { useState } from 'react'
import type { PageProps } from '../types'
import { Group, Label, P, PageShell, Row } from '../../components/kit'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { account, useAccount } from './store'
import { EditableRow, Pencil, useToast } from './bits'

type BirthKey = 'date' | 'time' | 'place'

/** G-06 · Edit chart */
export default function EditChart({ go, back }: PageProps) {
  const { birth } = useAccount()
  const [editing, setEditing] = useState<BirthKey | null>(null)
  const [dirty, setDirty] = useState(false)
  const [toast, show] = useToast()

  const big3 = (label: string, sign: keyof typeof SIGNS) => (
    <Row label={label} value={SIGNS[sign].name} right={<Pencil />} chevron={false}
      onClick={() => show('Your big three come from your birth data. Change it below.')} />
  )
  const birthRow = (k: BirthKey, label: string) => (
    <EditableRow label={label} value={birth[k]} editing={editing === k} onEdit={(on) => setEditing(on ? k : null)}
      onSave={(v) => { account.patch({ birth: { ...birth, [k]: v } }); setDirty(true) }} />
  )

  return (
    <>
      <PageShell onBack={back} topBar="Edit chart" align="center" eyebrow="Edit · careful, this recasts you" title="Your chart, corrected." titleSize={28}
        cta={{
          label: 'Save & recast', onClick: () => {
            sfx.sparkle()
            show(dirty ? 'Recast. Tomorrow’s deck is drawn from this chart.' : 'Saved. Nothing changed in your sky.')
            window.setTimeout(back, 1400)
          },
        }}>
        <div style={{ textAlign: 'left', marginTop: -6 }}>
          <Group label="Your big three">
            {big3('Sun', ME.sign)}
            {big3('Moon', ME.moon)}
            {big3('Rising', ME.rising)}
          </Group>
          <Group label="Birth data">
            {birthRow('date', 'Born')}
            {birthRow('time', 'Time')}
            {birthRow('place', 'Place')}
          </Group>
          <Label>Heads up</Label>
          <P style={{ margin: 0, fontSize: 13.5, color: 'var(--label-2)' }}>Changing your time recasts your rising. Tomorrow’s deck will look different.</P>
          <Group label="Photo">
            <Row label="Veiled photo" value="Replace" onClick={() => go('x/verify-photo')} />
          </Group>
        </div>
      </PageShell>
      {toast}
    </>
  )
}
