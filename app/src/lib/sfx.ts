/**
 * Tiny WebAudio synth for game feel — no audio files needed.
 * Every call is safe before user interaction (it just stays silent).
 */
let ctx: AudioContext | null = null
let muted = false

function ac(): AudioContext | null {
  if (muted) return null
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(freq: number, dur: number, opts: { type?: OscillatorType; gain?: number; delay?: number; slideTo?: number } = {}) {
  const a = ac()
  if (!a) return
  const t0 = a.currentTime + (opts.delay ?? 0)
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = opts.type ?? 'sine'
  o.frequency.setValueAtTime(freq, t0)
  if (opts.slideTo) o.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(opts.gain ?? 0.12, t0 + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  o.connect(g).connect(a.destination)
  o.start(t0)
  o.stop(t0 + dur + 0.05)
}

function noise(dur: number, opts: { gain?: number; delay?: number; from?: number; to?: number } = {}) {
  const a = ac()
  if (!a) return
  const t0 = a.currentTime + (opts.delay ?? 0)
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const src = a.createBufferSource()
  src.buffer = buf
  const f = a.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 1.2
  f.frequency.setValueAtTime(opts.from ?? 800, t0)
  f.frequency.exponentialRampToValueAtTime(opts.to ?? 3000, t0 + dur)
  const g = a.createGain()
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(opts.gain ?? 0.15, t0 + dur * 0.3)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(f).connect(g).connect(a.destination)
  src.start(t0)
}

const vibrate = (p: number | number[]) => {
  try { navigator.vibrate?.(p) } catch { /* noop */ }
}

export const sfx = {
  setMuted(m: boolean) { muted = m },
  isMuted() { return muted },
  /** card dealt onto the table */
  deal(delay = 0) { noise(0.12, { gain: 0.08, delay, from: 2400, to: 900 }); tone(180, 0.08, { gain: 0.05, delay, type: 'triangle' }) },
  /** soft tick, UI taps */
  tap() { tone(1200, 0.05, { gain: 0.05, type: 'triangle' }); vibrate(8) },
  /** swipe release (pass) */
  release() { noise(0.25, { gain: 0.08, from: 1800, to: 300 }); tone(320, 0.22, { gain: 0.05, slideTo: 160 }) },
  /** swipe align (like) — bright rising chime */
  align() {
    tone(660, 0.18, { gain: 0.08 }); tone(990, 0.22, { gain: 0.07, delay: 0.07 }); tone(1320, 0.3, { gain: 0.06, delay: 0.14 })
    noise(0.3, { gain: 0.04, from: 3000, to: 8000 })
    vibrate(15)
  },
  /** card flip */
  flip() { noise(0.14, { gain: 0.1, from: 600, to: 4000 }); tone(440, 0.1, { gain: 0.04, type: 'triangle', slideTo: 880 }) },
  /** peek hold — rising shimmer, call repeatedly as progress builds */
  peekTick(p: number) { tone(500 + p * 900, 0.06, { gain: 0.03, type: 'sine' }) },
  /** shimmer / sparkle */
  sparkle() { [0, 0.05, 0.1, 0.16, 0.22].forEach((d, i) => tone(1800 + i * 260 + Math.random() * 200, 0.12, { gain: 0.035, delay: d })) },
  /** the big moment: both aligned */
  match() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]
    notes.forEach((f, i) => tone(f, 0.9 - i * 0.08, { gain: 0.09, delay: i * 0.09 }))
    tone(130.8, 1.4, { gain: 0.1, type: 'triangle' })
    noise(1.2, { gain: 0.05, from: 400, to: 9000, delay: 0.1 })
    vibrate([20, 40, 30, 40, 60])
  },
  /** reveal — veil lifting whoosh into warm pad */
  reveal() {
    noise(1.0, { gain: 0.08, from: 200, to: 6000 })
    ;[392, 493.9, 587.3, 784].forEach((f, i) => tone(f, 1.6, { gain: 0.05, delay: 0.35 + i * 0.04 }))
    vibrate([10, 30, 50])
  },
  /** message sent / received */
  send() { tone(880, 0.08, { gain: 0.05 }); tone(1320, 0.1, { gain: 0.04, delay: 0.05 }) },
  receive() { tone(740, 0.1, { gain: 0.05 }); tone(587, 0.14, { gain: 0.04, delay: 0.07 }) },
  /** error / out of peeks */
  deny() { tone(220, 0.15, { gain: 0.06, type: 'square', slideTo: 150 }); vibrate([30, 30, 30]) },
}
