import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell, Toast, CARD_BG, CARD_LINE } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { signin, formatPhone } from './state'

const RESEND = 45

/**
 * G-02 Code Verification — six boxes, a resend timer, a way back to fix the number.
 * Demo rules: any six digits pass; 000000 fails into G-04; 111111 trips the G-22 new-device check.
 * `x/code/411` opens with digits already typed (for the capture).
 */
export default function Code({ go, back, arg }: PageProps) {
  const s = signin.get()
  const [code, setCode] = useState(() => (arg ?? '').replace(/\D/g, '').slice(0, 6))
  const [left, setLeft] = useState(RESEND)
  const [focused, setFocused] = useState(true)
  const [checking, setChecking] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const shake = useAnimationControls()
  const busy = useRef(false)

  useEffect(() => {
    if (left <= 0) return
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => window.clearTimeout(t)
  }, [left])

  useEffect(() => { input.current?.focus({ preventScroll: true }) }, [])

  const flash = (t: string) => { setToast(t); window.setTimeout(() => setToast(null), 2200) }

  const verify = (c = code) => {
    if (busy.current) return
    if (c.length < 6) { sfx.deny(); flash('Six numbers, all of them.'); input.current?.focus(); return }
    busy.current = true
    setChecking(true)
    if (c === '000000') {
      sfx.deny()
      void shake.start({ x: [0, -10, 9, -7, 5, -2, 0], transition: { duration: 0.45 } })
      window.setTimeout(() => go('x/signin-failed'), 750)
      return
    }
    sfx.sparkle()
    window.setTimeout(() => go(c === '111111' ? 'x/new-device' : 'x/permissions'), 700)
  }

  const onType = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 6)
    if (d.length > code.length) sfx.tap()
    setCode(d)
    if (d.length === 6) window.setTimeout(() => verify(d), 250)
  }

  const resend = () => {
    sfx.send()
    setLeft(RESEND)
    setCode('')
    flash(s.method === 'phone' ? 'New code on its way.' : 'New code sent to your inbox.')
    input.current?.focus()
  }

  const to = s.method === 'phone' ? <>Texted to +1&nbsp;{formatPhone(s.phone)}.</> : <>Sent to {s.email}.</>
  const active = Math.min(code.length, 5)

  return (
    <>
      <PageShell
        onBack={back}
        eyebrow="Step 2 · Prove it’s you"
        title={<>Six numbers,<br />sent to your sky.</>}
        body={<>{to} Paste autofills.</>}
        cta={{ label: checking ? 'Checking…' : 'Verify', onClick: () => verify() }}
        caption={{ label: s.method === 'phone' ? 'Wrong number?' : 'Wrong email?', onClick: back }}
        scroll={false}
      >
        <motion.div animate={shake} style={{ position: 'relative', height: 52, marginTop: 6 }}
          onClick={() => input.current?.focus()}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Array.from({ length: 6 }, (_, i) => {
              const on = focused && !checking && i === active && code.length < 6
              const filled = i < code.length
              return (
                <motion.div key={i}
                  animate={checking && code !== '000000' ? { scale: [1, 1.06, 1], transition: { delay: i * 0.05, duration: 0.35 } } : { scale: 1 }}
                  style={{
                    width: 46, height: 52, borderRadius: 12, display: 'grid', placeItems: 'center',
                    background: CARD_BG, border: on ? '1.5px solid rgba(239,230,214,0.8)' : CARD_LINE,
                    boxShadow: on ? '0 0 16px rgba(248,237,255,0.18)' : 'none',
                    fontSize: 21, fontWeight: 500, color: 'var(--label-1)', fontVariantNumeric: 'tabular-nums',
                  }}>
                  {filled ? code[i] : on ? (
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.05, repeat: Infinity, times: [0, 0.5, 1] }}
                      style={{ width: 1.5, height: 22, background: 'var(--label-1)' }} />
                  ) : null}
                </motion.div>
              )
            })}
          </div>
          {/* one real input under the boxes: keyboard, paste and SMS autofill all land here */}
          <input ref={input} value={code} onChange={(e) => onType(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') verify() }}
            inputMode="numeric" autoComplete="one-time-code" aria-label="Six-digit code" maxLength={6}
            style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, fontSize: 16, caretColor: 'transparent' }} />
        </motion.div>

        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 13.5, fontWeight: 500 }}>
          {left > 0 ? (
            <span style={{ color: 'var(--label-3)' }}>Resend in {left}s</span>
          ) : (
            <button onClick={resend} style={{ minHeight: 32, padding: '0 12px', color: 'var(--label-1)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Send a new code
            </button>
          )}
        </div>
      </PageShell>
      <AnimatePresence>{toast && <Toast text={toast} />}</AnimatePresence>
    </>
  )
}
