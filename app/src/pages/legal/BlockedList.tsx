import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Label, P, PageShell, TextLink, Toast } from '../../components/kit'
import { DECK } from '../../data/profiles'
import { MATCHES } from '../../data/matches'
import { SIGNS, type SignId } from '../../data/signs'
import { session, useSession } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'
import { BLOCKED, BLOCKED_COPY, type BlockedPerson } from './copy'
import { Pill, PillList } from './bits'

function Aura({ sign }: { sign: SignId }) {
  const s = SIGNS[sign]
  return (
    <span style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, boxShadow: `0 0 10px ${s.color}55` }}>
      <img src={s.auraImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)' }} />
    </span>
  )
}

function UnblockBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.94 }} onClick={(e) => { e.stopPropagation(); sfx.tap(); onClick() }}
      style={{ height: 32, padding: '0 2px 0 10px', fontSize: 13.5, fontWeight: 600, color: 'var(--label-2)' }}>
      {BLOCKED_COPY.unblock}
    </motion.button>
  )
}

/** people blocked from chat or the report sheet during this demo, by id */
function sessionPeople(ids: string[]): BlockedPerson[] {
  return ids.flatMap((id) => {
    const m = MATCHES.find((x) => x.id === id) ?? DECK.find((x) => x.id === id)
    return m ? [{ id, name: m.name, sign: m.sign, when: 'Today' }] : []
  })
}

/** SF-03 Blocked list: people in your orbit you blocked, and whole signs off the table */
export function BlockedList({ go, back }: PageProps) {
  const { blockedPeople, blockedSigns, blockedSince } = useSession()
  const [cleared, setCleared] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const say = (t: string) => { setToast(t); window.setTimeout(() => setToast(null), 2000) }
  const people = [...sessionPeople(blockedPeople).reverse(), ...BLOCKED].filter((p) => !cleared.includes(p.id))

  const unblockPerson = (p: BlockedPerson) => {
    if (blockedPeople.includes(p.id)) session.patch({ blockedPeople: blockedPeople.filter((x) => x !== p.id) })
    else setCleared((c) => [...c, p.id])
    say(`${p.name} is unblocked.`)
  }
  const unblockSign = (s: SignId) => {
    session.patch({ blockedSigns: blockedSigns.filter((x) => x !== s) })
    say(`${SIGNS[s].name} is back in your deck.`)
  }

  const row = { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, height: 0, marginTop: -8 }, transition: { duration: 0.25 } }

  return (
    <>
      <PageShell onBack={back} topBar={BLOCKED_COPY.bar}>
        <Label style={{ marginTop: 6 }}>{BLOCKED_COPY.people}</Label>
        <PillList>
          <AnimatePresence initial={false}>
            {people.map((p) => (
              <motion.div key={p.id} {...row} style={{ overflow: 'hidden' }}>
                <Pill lead={<Aura sign={p.sign} />} right={<UnblockBtn onClick={() => unblockPerson(p)} />} style={{ minHeight: 44, paddingRight: 14, gap: 12 }}>
                  {p.name} <span style={{ color: 'var(--label-2)' }}>· blocked {p.when}</span>
                </Pill>
              </motion.div>
            ))}
          </AnimatePresence>
        </PillList>
        {!people.length && <P style={{ color: 'var(--label-3)' }}>{BLOCKED_COPY.none}</P>}

        <Label style={{ marginTop: 26 }}>{BLOCKED_COPY.signs}</Label>
        <PillList>
          <AnimatePresence initial={false}>
            {blockedSigns.map((s) => (
              <motion.div key={s} {...row} style={{ overflow: 'hidden' }}>
                <Pill lead={<span style={{ width: 30, textAlign: 'center', fontSize: 17, color: SIGNS[s].light }}>{SIGNS[s].glyph}</span>}
                  right={<UnblockBtn onClick={() => unblockSign(s)} />} style={{ paddingRight: 14, gap: 12 }}>
                  {SIGNS[s].name} <span style={{ color: 'var(--label-2)' }}>· since {blockedSince}</span>
                </Pill>
              </motion.div>
            ))}
          </AnimatePresence>
        </PillList>
        {!blockedSigns.length && <P style={{ color: 'var(--label-3)', margin: 0 }}>{BLOCKED_COPY.noSigns}</P>}
        <div style={{ marginTop: 10 }}>
          <TextLink onClick={() => go('block')} style={{ fontSize: 12.5, color: 'var(--label-3)' }}>Choose signs to block</TextLink>
        </div>

        <Label style={{ marginTop: 26 }}>{BLOCKED_COPY.how}</Label>
        <P style={{ fontSize: 13.5, color: 'var(--label-1)', opacity: 0.88 }}>{BLOCKED_COPY.howText}</P>
      </PageShell>
      <AnimatePresence>{toast && <Toast key="t" text={toast} />}</AnimatePresence>
    </>
  )
}
