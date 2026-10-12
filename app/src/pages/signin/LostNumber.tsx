import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell, Label, P, Row, Toast, CARD_BG, CARD_LINE } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { signin, maskEmail } from './state'

type Way = 'other' | 'chart'

function Choice({ on, label, value, onClick }: { on: boolean; label: string; value: string; onClick: () => void }) {
  return (
    <div style={{
      borderRadius: 14, background: CARD_BG, overflow: 'hidden', marginBottom: 8,
      border: on ? '1px solid rgba(239,230,214,0.55)' : CARD_LINE, transition: 'border-color .2s',
    }}>
      <Row label={label} value={value} onClick={onClick} chevron={false} right={
        <span style={{ width: 18, height: 18, borderRadius: 9, flexShrink: 0, display: 'grid', placeItems: 'center', border: on ? 0 : '1.5px solid var(--label-3)', background: on ? 'var(--chrome)' : 'transparent' }}>
          {on && <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--chrome-ink)' }} />}
        </span>
      } />
    </div>
  )
}

/** G-21 Lost Number — two ways back in without the phone (or inbox: `x/lost-number/email`). */
export default function LostNumber({ go, back, arg }: PageProps) {
  const s = signin.get()
  const inbox = arg === 'email'
  const [way, setWay] = useState<Way>('chart')
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const flash = (t: string) => { setToast(t); window.setTimeout(() => setToast(null), 2600) }

  const verify = () => {
    if (sent) { go('x/phone'); return }
    if (way === 'other') {
      // the code goes to the other channel on the account
      signin.set({ method: inbox ? 'phone' : 'email' })
      sfx.send()
      go('x/code')
      return
    }
    sfx.sparkle()
    setSent(true)
    flash('Sent for review. We will text you within 24 hours.')
  }

  const other = inbox
    ? { label: 'Code to my phone', value: `+1 ••• ••• ${s.phone.slice(-4)}` }
    : { label: 'Code to my email', value: maskEmail(s.email) }

  return (
    <>
      <PageShell
        onBack={back}
        topBar="Recovery"
        eyebrow={inbox ? 'No access to this inbox' : 'No access to this number'}
        title={inbox ? <>Locked out<br />of your inbox.</> : <>Locked out<br />of your number.</>}
        body={inbox ? 'Two ways back in. Neither needs the email.' : 'Two ways back in. Neither needs the phone.'}
        cta={{ label: sent ? 'Back to sign in' : 'Verify another way', onClick: verify }}
        caption={sent ? undefined : { label: 'Back to sign in', onClick: back }}
      >
        <Label style={{ marginTop: 0 }}>Two ways back in</Label>
        <Choice on={way === 'other'} label={other.label} value={other.value} onClick={() => setWay('other')} />
        <Choice on={way === 'chart'} label="Answer from my chart" value={sent ? 'In review' : 'Human review'} onClick={() => setWay('chart')} />

        {way === 'chart' ? (
          <>
            <Label style={{ marginTop: 22 }}>What we will ask</Label>
            <P style={{ fontSize: 13.5, textWrap: 'pretty' }}>Your birth date, birth time and birth city, exactly as you entered them. Only you and your chart know all three.</P>
            <Label style={{ marginTop: 22 }}>How long</Label>
            <P style={{ fontSize: 13.5, textWrap: 'pretty' }}>Chart-based recovery is reviewed by a human within 24 hours. Your card stays hidden until it clears.</P>
          </>
        ) : (
          <>
            <Label style={{ marginTop: 22 }}>What happens</Label>
            <P style={{ fontSize: 13.5, textWrap: 'pretty' }}>We send six numbers to {inbox ? 'the phone' : 'the email'} on your account, {other.value}. Enter them and you are back in.</P>
            <Label style={{ marginTop: 22 }}>How long</Label>
            <P style={{ fontSize: 13.5, textWrap: 'pretty' }}>About a minute. Once you are in, you can change your {inbox ? 'email' : 'number'} from Settings.</P>
          </>
        )}
      </PageShell>
      <AnimatePresence>{toast && <Toast text={toast} />}</AnimatePresence>
    </>
  )
}
