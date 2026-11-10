// The photo check's two small models (about 480 KB), bundled into their own
// chunk so they load only when the check starts. Hosts that won't serve
// .tflite files still get them this way.
import face from '../../beta-assets/mp/blaze_face_short_range.tflite?inline'
import seg from '../../beta-assets/mp/selfie_segmenter.tflite?inline'

const bytes = (dataUrl: string) => {
  const bin = atob(dataUrl.slice(dataUrl.indexOf(',') + 1))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export const FACE_MODEL = () => bytes(face)
export const SEG_MODEL = () => bytes(seg)
