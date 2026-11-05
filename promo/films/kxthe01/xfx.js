// xfx: the hook layer for THE THREAD: EXTENDED (batch m38, kxthe01–kxthe08). It maps one small spec per episode onto the
// shared hook kit (../hookkit.js, imported read-only) plus a few batch-local overlays the kit doesn't have (the payoff
// promise sticker, a colour flash, the VHS "EARLIER" rewind tag, a counter chip).
//
//   overlays: xfx({ len, scratch?, whip?, slam?, shake0?, promise?, rewind?, chapters?, loading?, notify?, shakes?,
//                   flashes?, caught?, bubble0?, counter? })
// returns a function makeXThread calls with the story scene → { story, scenes, cues } (the story may come back wrapped in
// the kit's frozen() for a record-scratch freeze).
//
// Placement (1080 × 1920; the chat window is y 420–1460, the stage strip below it, the headline at the top):
//   • chapter stickers and the promise sticker sit in the band between the chat and the characters' heads (y ≈ 1478)
//   • the counter chip sits on the right of the chat header (y ≈ 470)
//   • the loading bar sits over the middle of the chat (y 900); notifications drop over the headline (y 120)
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, caught, caughtCues,
  notification, notificationCues, loadingBar, loadingBarCues, chapter, chapterCues, slamTitle, slamTitleCues,
  glitch, glitchCues, drawRich, GOLD, BONE, INK,
} from '../hookkit.js'
import { clamp, prog, ease } from '../../src/lib.js'
import { easeOutBack } from '../wheel.js'

const FW = 1080, FH = 1920
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const r3 = v => +v.toFixed(3)
const BAND = 1478

function canvasLayer(stage) {
  const root = document.createElement('div')
  Object.assign(root.style, { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px', overflow: 'hidden', pointerEvents: 'none' })
  root.dataset.hookcam = 'off'
  const cv = document.createElement('canvas'); cv.width = FW; cv.height = FH
  Object.assign(cv.style, { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px' })
  root.appendChild(cv); stage.appendChild(root)
  return { root, x: cv.getContext('2d') }
}
function pill(x, X, Y, w, h, r) {
  x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath()
}

// the payoff promise ("wait for the 3 a.m. voice note"): a red REC-dot sticker that slaps on and wobbles
function promiseSticker({ at, out, text }) {
  return async stage => {
    const { root, x } = canvasLayer(stage)
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        if (t < at || t >= out[1]) return
        const k = easeOutBack(prog(t, at, at + 0.3), 2.2) * (1 - ease.inQuad(prog(t, out[0], out[1])))
        x.save(); x.translate(540, BAND + 48); x.rotate(-0.03 + 0.012 * Math.sin(t * 5)); x.scale(k, k)
        const w = 900, h = 96
        x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 20; x.shadowOffsetY = 8
        x.fillStyle = '#fff8ea'; pill(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 26); x.fill()
        x.shadowBlur = 0; x.shadowOffsetY = 0
        x.fillStyle = '#1b1236'; pill(x, -w / 2, -h / 2, w, h, 20); x.fill()
        const blink = Math.floor((t - at) * 2.5) % 2 === 0
        x.fillStyle = blink ? '#ff3b3b' : 'rgba(255,59,59,0.35)'; x.beginPath(); x.arc(-w / 2 + 50, 0, 15, 0, Math.PI * 2); x.fill()
        drawRich(x, text, 30, -30, { size: 48, accentSize: 58, maxW: w - 130, color: BONE, accentColor: GOLD, shadow: false })
        x.restore()
      },
    }
  }
}
// a full-frame colour flash (pattern break), decays in 0.28 s
function flashes(list) {
  return async stage => {
    const { root, x } = canvasLayer(stage)
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        for (const [a, col] of list) {
          const d = t - a
          if (d < 0 || d > 0.28) continue
          x.globalAlpha = 0.55 * Math.pow(1 - d / 0.28, 2); x.fillStyle = col; x.fillRect(0, 0, FW, FH); x.globalAlpha = 1
        }
      },
    }
  }
}
// VHS rewind tag: "◀◀ EARLIER · 7 PM" with scanlines, 1.5 s
function rewindTag({ at, text }) {
  return async stage => {
    const { root, x } = canvasLayer(stage)
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        if (t < at || t > at + 1.6) return
        const k = easeOutBack(prog(t, at, at + 0.2), 2) * (1 - ease.inQuad(prog(t, at + 1.4, at + 1.6)))
        x.save(); x.globalAlpha = 0.22 * k; x.fillStyle = '#000'
        for (let y = (t * 300) % 8; y < FH; y += 8) x.fillRect(0, y, FW, 3)
        x.restore()
        x.save(); x.translate(540, 960); x.scale(k, k); x.globalAlpha = clamp(k)
        x.fillStyle = 'rgba(10,6,22,0.85)'; x.fillRect(-420, -70, 840, 140)
        x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = 'rgba(255,40,80,0.7)'; x.fillText(`◀◀ ${text}`, -4, 2)
        x.fillStyle = 'rgba(40,230,255,0.7)'; x.fillText(`◀◀ ${text}`, 4, -2)
        x.fillStyle = BONE; x.fillText(`◀◀ ${text}`, 0, 0)
        x.restore()
      },
    }
  }
}
// a counter chip on the right of the chat header: steps [[t, n, label?], …]
function counterChip({ label, steps }) {
  return async stage => {
    const { root, x } = canvasLayer(stage)
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        let cur = null, at = -9
        for (const s of steps) if (t >= s[0]) { cur = s; at = s[0] }
        if (!cur) return
        const k = at <= 0 ? 1 : 1 + 0.25 * Math.exp(-(t - at) * 8) * Math.cos((t - at) * 30)
        const lab = cur[2] || label, txt = `${lab}: ${cur[1]}`
        x.save(); x.font = `700 26px ${MONO}`
        const w = x.measureText(txt).width + 40
        x.translate(1006 - w / 2, 472); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-w / 2 - 4, -26, w + 8, 52)
        x.fillStyle = cur[2] ? '#ff5c7a' : '#3fbf7a'; x.fillRect(-w / 2, -22, w, 44)
        x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
        x.restore()
      },
    }
  }
}

export function xfx(spec) {
  return story => {
    const scenes = [], cues = []
    const L = spec.len
    let s = story
    // frame-0 / first-second pattern breaks
    if (spec.scratch != null) {
      const REC = typeof spec.scratch === 'number' ? { at: spec.scratch, len: 1.2, caption: 'yep. *this is the chat.*' } : { len: 1.2, ...spec.scratch }
      s = frozen(s, [REC]); scenes.push(recordScratch(REC)); cues.push(...recordScratchCues(REC))
    }
    if (spec.whip != null) { const W = { at: spec.whip, from: 1.5 }; scenes.push(whipZoom(W)); cues.push(...whipZoomCues(W)) }
    if (spec.slam) { const W = { at: spec.slam.at, from: 1.45 }, S = { at: spec.slam.at + 0.3, len: 0.5, amp: 24 }; scenes.push(whipZoom(W), screenShake(S)); cues.push(...whipZoomCues(W), ...shakeCues(S)) }
    if (spec.shake0) { const S = { at: -0.15, len: 0.8, amp: 30, seed: 4 }; scenes.push(screenShake(S)); cues.push(...shakeCues({ at: 0, len: 0.65 })) }
    for (const a of spec.shakes || []) { if (a < 0 && spec.shake0) continue; const S = { at: a, len: 0.45, amp: 22, seed: Math.round(a * 7) }; scenes.push(screenShake(S)); if (a > 0) cues.push(...shakeCues(S)) }
    // a frame-0 slam bubble over the chat (ep 3: "SO, SEEING ANYONE?"), optionally slamming in again later
    if (spec.bubble0) {
      const B = { at: -1, text: spec.bubble0.text, top: 980, size: 104, out: [spec.bubble0.out, spec.bubble0.out + 0.3] }
      scenes.push(slamTitle(B))
      if (spec.bubble0.again) { const B2 = { at: spec.bubble0.again[0], text: spec.bubble0.text, top: 980, size: 104, out: [spec.bubble0.again[1], spec.bubble0.again[1] + 0.3] }; scenes.push(slamTitle(B2)); cues.push(...slamTitleCues(B2)) }
    }
    // the promise, then the chapter stickers (in the band under the chat; one at a time)
    let promiseEnd = -9
    if (spec.promise) {
      const P = { at: spec.promise.at, out: [spec.promise.at + 3.7, spec.promise.at + 4.0], text: spec.promise.text }
      promiseEnd = P.out[1]
      scenes.push(promiseSticker(P))
      cues.push(['whoosh', r3(P.at - 0.04), 0.2, 0.04], ['tom', r3(P.at + 0.1), 120, { gain: 0.16, decay: 0.12 }], ['bell', r3(P.at + 0.12), 1318.51, 0.03, 0.8, 0])
    }
    if (spec.rewind) {
      const G = { at: spec.rewind.at - 0.1, len: 0.55, dialog: false, amp: 0.8 }
      scenes.push(glitch(G), rewindTag(spec.rewind)); cues.push(...glitchCues(G), ['tapeStop', r3(spec.rewind.at - 0.1), 0.25])
    }
    const ch = spec.chapters || []
    ch.forEach(([a, title], i) => {
      const at = Math.max(a, promiseEnd + 0.1)
      const next = i + 1 < ch.length ? ch[i + 1][0] : L
      const lab = `${i + 1} · ${title}`
      const w = lab.length * 33.5 + 80
      const C = { at, out: [Math.min(at + 3.6, next - 0.3), Math.min(at + 3.9, next)], n: i + 1, title, x: Math.round(540 - w / 2), y: BAND, color: i === ch.length - 1 ? '#ff8fb1' : GOLD }
      if (at < next - 1) { scenes.push(chapter(C)); cues.push(...chapterCues(C)) }
    })
    if (spec.loading) {
      const Lb = { at: spec.loading.a, len: spec.loading.b - spec.loading.a, label: spec.loading.text, error: spec.loading.error ?? null, y: 900 }
      scenes.push(loadingBar(Lb)); cues.push(...loadingBarCues(Lb))
    }
    if (spec.notify) {
      const N = { at: spec.notify.at, out: [spec.notify.at + 2.6, spec.notify.at + 2.9], title: spec.notify.from, body: spec.notify.text, glyph: '♥', color: '#ff5c8a', y: 110 }
      scenes.push(notification(N)); cues.push(...notificationCues(N))
    }
    for (const c of spec.caught || []) {
      const C = { at: c.at, x: c.x, y: c.y, r: c.rx, ry: c.ry, label: c.text, out: [c.at + 2.2, c.at + 2.5], rec: false, arrow: c.arrow || 'br' }
      scenes.push(caught(C)); cues.push(...caughtCues(C))
    }
    if (spec.counter) scenes.push(counterChip(spec.counter))
    if (spec.flashes) { scenes.push(flashes(spec.flashes)); for (const [a] of spec.flashes) if (a > 0) cues.push(['whoosh', r3(a - 0.03), 0.15, 0.04]) }
    return { story: s, scenes, cues: cues.filter(c => typeof c[1] !== 'number' || (c[1] >= 0 && c[1] < L - 0.05)) }
  }
}
