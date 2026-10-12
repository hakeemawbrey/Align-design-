import { motion } from 'framer-motion'
import { Label, P, PageShell } from '../../components/kit'
import { rise } from '../../components/onboarding/shared'
import type { PageProps } from '../types'
import { DOCS, UPDATED } from './copy'
import { serifCaption } from './bits'

/** L-01 / L-02 / L-03: a short legal summary, one clause per mono label */
function Doc({ id, go, back }: PageProps & { id: keyof typeof DOCS }) {
  const d = DOCS[id]
  return (
    <>
      <PageShell onBack={back} topBar={d.bar} title={<>{d.title[0]}<br />{d.title[1]}</>}
        caption={d.next ? { label: <span style={serifCaption}>{d.next.label}</span>, onClick: () => go(`x/${d.next!.page}`) } : undefined}>
        <div style={{ paddingBottom: 40 }}>
          {d.clauses.map((c, i) => (
            <motion.div key={c.label} {...rise(0.25 + i * 0.06, 8)}>
              <Label style={{ marginTop: i === 0 ? -4 : 22, display: 'flex', gap: 14 }}>
                {d.numbered && <span>{String(i + 1).padStart(2, '0')}</span>}
                <span>{c.label}</span>
              </Label>
              <P style={{ margin: 0, color: 'var(--label-1)', opacity: 0.88 }}>{c.text}</P>
            </motion.div>
          ))}
        </div>
      </PageShell>
      <div className="mono" style={{ position: 'absolute', left: 24, bottom: 84, fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-4)', textTransform: 'uppercase', pointerEvents: 'none' }}>
        {UPDATED}
      </div>
    </>
  )
}

export const Terms = (p: PageProps) => <Doc id="terms" {...p} />
export const Privacy = (p: PageProps) => <Doc id="privacy" {...p} />
export const Guidelines = (p: PageProps) => <Doc id="guidelines" {...p} />
