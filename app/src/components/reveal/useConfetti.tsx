import { useCallback, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

/** gold · bone · orchid — the match palette */
export const BURST_COLORS = ['#f2c75c', '#fff4cf', '#e9b24a', '#efe6d6', '#e163d6', '#ffbdf6']

interface FireOpts {
  /** origin, 0–1 of the canvas */
  x: number
  y: number
  /** 0.3 = sparkle, 1 = jackpot */
  power?: number
}

/**
 * Confetti scoped to a canvas inside the phone (so it scales with the frame).
 * Fires round gold confetti + five-point stars + bitmap "✦" sparks.
 */
export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inst = useRef<confetti.CreateTypes | null>(null)
  const sparks = useRef<confetti.Shape[]>([])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const f = confetti.create(c, { resize: true, useWorker: false })
    inst.current = f
    try {
      sparks.current = ['#f2c75c', '#ffbdf6', '#fff4cf'].map((color) => confetti.shapeFromText({ text: '✦', scalar: 2.4, color }))
    } catch {
      sparks.current = []
    }
    return () => {
      f.reset()
      inst.current = null
    }
  }, [])

  const fire = useCallback(({ x, y, power = 1 }: FireOpts) => {
    const f = inst.current
    if (!f) return
    const origin = { x, y }
    const n = (k: number) => Math.max(4, Math.round(k * power))
    f({
      particleCount: n(75), spread: 360, startVelocity: 26 + 22 * power, decay: 0.9, gravity: 0.65,
      ticks: 170, origin, colors: BURST_COLORS, shapes: ['star', 'circle'], scalar: 0.9 + 0.3 * power, disableForReducedMotion: true,
    })
    if (sparks.current.length) {
      f({
        particleCount: n(28), spread: 360, startVelocity: 18 + 18 * power, decay: 0.91, gravity: 0.45,
        ticks: 190, origin, shapes: sparks.current, scalar: 2.4, flat: true, disableForReducedMotion: true,
      })
    }
    if (power >= 0.8) {
      // second, slower ring — the "coins still falling" tail
      window.setTimeout(() => {
        inst.current?.({
          particleCount: n(36), spread: 120, angle: 90, startVelocity: 34, decay: 0.92, gravity: 0.9,
          ticks: 170, origin: { x, y: y + 0.02 }, colors: BURST_COLORS, shapes: ['star'], scalar: 1.1,
        })
      }, 220)
    }
  }, [])

  return { canvasRef, fire }
}

export function ConfettiCanvas({ canvasRef, z = 40 }: { canvasRef: React.RefObject<HTMLCanvasElement | null>; z?: number }) {
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: z }}
    />
  )
}
