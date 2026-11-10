import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell, P, TextLink } from '../../components/kit'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { loadAuraModels, makeAuraPhoto } from '../../lib/aura'
import { setMyPhoto } from '../../lib/myPhoto'
import { sfx } from '../../lib/sfx'
import type { PageProps } from '../types'

type State =
  | { at: 'idle' }
  | { at: 'working'; step: 'finding' | 'painting'; original: string }
  | { at: 'error'; message: string; original?: string }
  | { at: 'result'; url: string; original: string; score: number }
  | { at: 'saved'; url: string }

const ELEMENT_WORD = { fire: 'fire', earth: 'earth', air: 'air', water: 'water' } as const

/**
 * The aura photo: take or pick a photo, the phone checks there's one real
 * person in it, paints their aura in their element's colours, and puts it on
 * their card. Nothing leaves the phone.
 */
export default function AuraPhoto({ go, back }: PageProps) {
  const sun = SIGNS[ME.sign]
  const [state, setState] = useState<State>({ at: 'idle' })
  const [ready, setReady] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [compare, setCompare] = useState(false)
  const camera = useRef<HTMLInputElement>(null)
  const library = useRef<HTMLInputElement>(null)

  // warm the models up while they read the page
  useEffect(() => { loadAuraModels().then(() => setReady('ready'), () => setReady('failed')) }, [])

  const run = async (f: File | undefined) => {
    if (!f) return
    sfx.tap()
    const original = URL.createObjectURL(f)
    setState({ at: 'working', step: 'finding', original })
    // let the "finding you" beat show before the heavy work blocks the frame
    await new Promise((r) => setTimeout(r, 350))
    const t = window.setTimeout(() => setState((s) => (s.at === 'working' ? { ...s, step: 'painting' } : s)), 900)
    const res = await makeAuraPhoto(f, sun.element)
    window.clearTimeout(t)
    if (!res.ok) { sfx.deny(); setState({ at: 'error', message: res.message, original }); return }
    sfx.sparkle()
    setState({ at: 'result', url: res.url, original, score: res.score })
  }

  const use = () => {
    if (state.at !== 'result') return
    setMyPhoto(state.url)
    sfx.align()
    setState({ at: 'saved', url: state.url })
  }

  const preview = state.at === 'result' ? (compare ? state.original : state.url)
    : state.at === 'saved' ? state.url
      : state.at === 'working' || state.at === 'error' ? state.original
        : ME.photo

  const cta = state.at === 'result' ? { label: 'Use on my card', onClick: use }
    : state.at === 'saved' ? { label: 'See my card', onClick: () => go('x/edit-card/up') }
      : { label: state.at === 'error' ? 'Try another photo' : 'Take a photo', onClick: () => camera.current?.click(), disabled: state.at === 'working' }

  return (
    <PageShell onBack={back} eyebrow="AURA PHOTO" title={state.at === 'saved' ? 'Your aura is on your card.' : 'Show us your aura.'} cta={cta}
      caption={state.at === 'idle' || state.at === 'error' ? { label: 'Choose from your photos', onClick: () => library.current?.click() }
        : state.at === 'result' ? { label: 'Try another photo', onClick: () => setState({ at: 'idle' }) } : undefined}>
      <input ref={camera} type="file" accept="image/*" capture="user" hidden onChange={(e) => { void run(e.target.files?.[0]); e.target.value = '' }} />
      <input ref={library} type="file" accept="image/*" hidden onChange={(e) => { void run(e.target.files?.[0]); e.target.value = '' }} />

      {state.at === 'idle' && (
        <P>Use a clear photo of just you, head and shoulders. We check it’s a real person, then paint your aura in {sun.name}’s {ELEMENT_WORD[sun.element]} colours. Your photo never leaves your phone.</P>
      )}

      {/* the photo, at the card's proportions */}
      <div style={{ position: 'relative', width: 220, height: 264, margin: '8px auto 0', borderRadius: 16, overflow: 'hidden', background: '#07040f', boxShadow: `0 0 0 1.5px ${sun.color}cc, 0 0 28px ${sun.color}55` }}>
        <AnimatePresence mode="wait">
          <motion.img key={preview} src={preview} alt={state.at === 'result' || state.at === 'saved' ? 'Your aura photo' : 'Your photo'}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: state.at === 'working' ? 0.45 : 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', filter: state.at === 'working' ? 'blur(4px)' : 'none' }} />
        </AnimatePresence>
        {state.at === 'working' && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              style={{ width: 54, height: 54, borderRadius: '50%', border: `2px solid ${sun.light}`, borderTopColor: 'transparent' }} />
            <div className="mono" style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: 'var(--label-1)' }}>
              {state.step === 'finding' ? 'FINDING YOU…' : 'PAINTING YOUR AURA…'}
            </div>
          </div>
        )}
        {state.at === 'result' && (
          <button className="mono" onClick={() => { sfx.tap(); setCompare((c) => !c) }} aria-pressed={compare}
            style={{ position: 'absolute', left: 8, bottom: 8, height: 26, padding: '0 10px', borderRadius: 13, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--label-1)', background: 'rgba(11,6,32,0.72)', border: '1px solid rgba(248,237,255,0.3)' }}>
            {compare ? 'SHOW AURA' : 'SHOW ORIGINAL'}
          </button>
        )}
      </div>

      <div style={{ marginTop: 16, textAlign: 'center', minHeight: 40 }}>
        {state.at === 'result' && (
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--spark)' }}>
            ✓ ONE PERSON FOUND · {Math.round(state.score * 100)}% SURE
          </div>
        )}
        {state.at === 'error' && <div role="alert" style={{ fontSize: 14, lineHeight: 1.4, color: '#ff9ab0' }}>{state.message}</div>}
        {state.at === 'saved' && <P style={{ textAlign: 'center' }}>Matches see it the night you both align. Until then, your card stays face down.</P>}
        {state.at === 'idle' && ready === 'loading' && <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--label-3)' }}>GETTING THE PHOTO CHECK READY…</div>}
        {ready === 'failed' && state.at === 'idle' && (
          <div style={{ fontSize: 13, color: 'var(--label-3)' }}>The photo check couldn’t start here. <TextLink onClick={() => { setReady('loading'); loadAuraModels().then(() => setReady('ready'), () => setReady('failed')) }}>Try again</TextLink></div>
        )}
      </div>
    </PageShell>
  )
}
