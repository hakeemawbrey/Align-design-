import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell, Field, Toast } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { signin, formatPhone, validEmail, type Method } from './state'

const COPY: Record<Method, { body: string; label: string; placeholder: string; swap: string; caption: string }> = {
  phone: {
    body: 'One code by text. No password, ever.',
    label: 'Phone',
    placeholder: '(555) 111–1111',
    swap: 'Or continue with email',
    caption: 'No access to this number?',
  },
  email: {
    body: 'One code to your inbox. No password, ever.',
    label: 'Email',
    placeholder: 'juna@thestars.com',
    swap: 'Or continue with phone',
    caption: 'No access to this inbox?',
  },
}

/** G-01 Phone Entry / G-01b Email Entry — the same step, two ways to be reached. */
function Entry({ mode, go, back }: PageProps & { mode: Method }) {
  const c = COPY[mode]
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const ok = mode === 'phone' ? phone.length === 10 : validEmail(email)

  const flash = (t: string) => { setToast(t); window.setTimeout(() => setToast(null), 2200) }

  const send = () => {
    if (!ok) {
      sfx.deny()
      flash(mode === 'phone' ? 'Ten digits, area code first.' : 'That address looks unfinished.')
      return
    }
    if (mode === 'phone') signin.set({ method: 'phone', phone })
    else signin.set({ method: 'email', email: email.trim() })
    sfx.send()
    go('x/code')
  }

  // swap in place: the other entry replaces this one, so back still lands on Welcome
  const swap = () => { sfx.tap(); back(); go(mode === 'phone' ? 'x/email' : 'x/phone') }

  return (
    <>
      <PageShell
        onBack={back}
        eyebrow="Step 1 · Who’s arriving"
        title={<>The stars need<br />somewhere to reach you.</>}
        body={c.body}
        cta={{ label: 'Send my code', onClick: send }}
        caption={{ label: c.caption, onClick: () => go(mode === 'email' ? 'x/lost-number/email' : 'x/lost-number') }}
        footer="No passwords. Ever.  ·  Standard rates apply"
        scroll={false}
      >
        <form onSubmit={(e) => { e.preventDefault(); send() }}>
          {mode === 'phone' ? (
            <Field label={c.label} prefix="+1" type="tel" placeholder={c.placeholder}
              value={formatPhone(phone)} onChange={(v) => setPhone(v.replace(/\D/g, '').slice(0, 10))} />
          ) : (
            <Field label={c.label} type="email" placeholder={c.placeholder} value={email} onChange={setEmail} />
          )}
          <button type="button" onClick={swap}
            style={{ display: 'block', margin: '20px auto 0', minHeight: 32, padding: '0 12px', fontSize: 13.5, fontWeight: 500, color: 'var(--label-2)' }}>
            {c.swap}
          </button>
        </form>
      </PageShell>
      {/* lift the toast clear of the CTA, which sits higher on pages with a footer line */}
      <div style={{ position: 'absolute', inset: '0 0 26px 0', pointerEvents: 'none' }}>
        <AnimatePresence>{toast && <Toast text={toast} />}</AnimatePresence>
      </div>
    </>
  )
}

export function Phone(p: PageProps) { return <Entry {...p} mode="phone" /> }
export function Email(p: PageProps) { return <Entry {...p} mode="email" /> }
