import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { ROOM_POSTS } from '../../components/club/posts'
import { rise } from '../../components/onboarding/shared'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { Eyebrow, Frame, GhostCta } from './ui'

/**
 * S-18c — Post removed. With no arg it is the notice the author gets when the
 * safety team takes their post down; after a report (arg = the reported post)
 * it tells the reporter the post is gone from their room.
 */
export default function PostRemoved({ go, back, arg }: PageProps) {
  const reported = ROOM_POSTS.find((p) => p.id === arg)
  const room = `The ${SIGNS[ME.sign].name} room`

  return (
    <Frame onBack={reported ? () => go('club') : back} seed={64}>
      <div style={{ position: 'absolute', top: 272, left: 32, right: 32, textAlign: 'center' }}>
        <Eyebrow>{room}</Eyebrow>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 34, marginTop: 14 }}>That one is gone.</motion.h1>
        <motion.p {...rise(0.22)} style={{ margin: '16px auto 0', fontSize: 14, lineHeight: 1.45, color: 'var(--label-1)', opacity: 0.9 }}>
          {reported
            ? `Thanks for telling us. ${reported.name}’s post is gone from your room, and a human on the safety team reads it within a day. Nobody is told who reported it.`
            : 'A human on the safety team read it and took it down. Your card is unchanged, your matches are untouched, and nobody in the room was told who wrote it.'}
        </motion.p>
        <motion.p {...rise(0.3)} style={{ margin: '18px auto 0', fontSize: 13, lineHeight: 1.45, color: 'var(--label-3)' }}>
          {reported
            ? 'If it crossed a line, we act on the account too. You will not hear about it, by design.'
            : 'Two more removals in thirty days and the room closes to you for a week.'}
        </motion.p>
      </div>

      <GhostCta top={676} onClick={() => go('club')}>Back to the room</GhostCta>
    </Frame>
  )
}
