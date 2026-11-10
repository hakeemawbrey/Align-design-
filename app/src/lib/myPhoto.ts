import { ME, MY_PHOTO_KEY } from '../data/profiles'

/** set your card photo (an aura photo, as a data URL); kept on this device */
export function setMyPhoto(url: string) {
  ME.photo = url
  try { localStorage.setItem(MY_PHOTO_KEY, url) } catch { /* storage full or blocked: it still shows this session */ }
}

export const dataUrlToFile = async (url: string, name = 'aura.jpg') => {
  const b = await (await fetch(url)).blob()
  return new File([b], name, { type: b.type || 'image/jpeg' })
}
