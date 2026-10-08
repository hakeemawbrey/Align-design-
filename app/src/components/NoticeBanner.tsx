import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { api, useWorld } from '../api'
import { session } from '../lib/session'
import { sfx } from '../lib/sfx'
import type { ScreenId } from '../screens/types'

/** Drops in over any screen when something happens from the other side (a real match). */
export default function NoticeBanner({ go }: { go: (id: ScreenId) => void }) {
  const { notice } = useWorld()

  useEffect(() => {
    if (!notice) return
    sfx.match()
    session.patch({ unseenMatch: true })
    const t = window.setTimeout(() => api.dismissNotice(), 6000)
    return () => clearTimeout(t)
  }, [notice])

  return (
    <AnimatePresence>
      {notice && (
        <motion.button key={notice.id}
          initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onClick={() => {
            sfx.tap()
            api.dismissNotice()
            if (notice.profileId) { session.patch({ threadWith: notice.profileId }); go('thread') } else go('matches')
          }}
          style={{
            position: 'absolute', left: 14, right: 14, top: 52, zIndex: 90, padding: '12px 16px', borderRadius: 18,
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            background: 'rgba(30,18,64,0.94)', border: '1px solid rgba(242,199,92,0.6)', boxShadow: '0 0 30px rgba(242,199,92,0.35), 0 12px 30px rgba(0,0,0,0.5)',
          }}>
          <span style={{ fontSize: 22, color: '#f2c75c' }}>✦</span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: 15, color: 'var(--label-1)' }}>{notice.text}</span>
            <span className="mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--align)' }}>TAP TO SAY HI</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
