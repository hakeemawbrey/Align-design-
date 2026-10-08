import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { StatusBar, Style } from '@capacitor/status-bar'

/** Running inside the iOS app (not a browser). */
export const isNative = Capacitor.isNativePlatform()

/** Light status bar text over the dark app; call once at startup. */
export function setupNative() {
  if (!isNative) return
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {})
}

/** iOS has no navigator.vibrate; the Taptic Engine stands in for it. */
export function nativeBuzz(p: number | number[]) {
  if (!isNative) return false
  const total = Array.isArray(p) ? p.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0) : p
  const style = total > 60 ? ImpactStyle.Heavy : total > 20 ? ImpactStyle.Medium : ImpactStyle.Light
  Haptics.impact({ style }).catch(() => {})
  return true
}
