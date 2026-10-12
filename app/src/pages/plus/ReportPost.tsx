import { useState } from 'react'
import { motion } from 'framer-motion'
import type { PageProps } from '../types'
import { ROOM_POSTS, reportedPosts } from '../../components/club/posts'
import { rise } from '../../components/onboarding/shared'
import { CARD_LINE, Label } from '../../components/kit'
import { ME } from '../../data/profiles'
import { SIGNS } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { Cta, Frame, Quiet } from './ui'

const HE = new Set(['devon', 'marcus'])

/** S-18b — Report post: one reason, nobody is told who. x/report-post/<post id> */
export default function ReportPost({ go, back, arg }: PageProps) {
  const post = ROOM_POSTS.find((p) => p.id === arg) ?? ROOM_POSTS[0]
  const he = HE.has(post.id)
  const [she, her] = he ? ['he', 'him'] : ['she', 'her']
  const reasons = ['Harassment or hate', 'Spam or soliciting', 'Nudity or graphic', `Not actually a ${SIGNS[ME.sign].name}`, 'Something else']
  const [pick, setPick] = useState(0)

  const send = () => {
    reportedPosts.add(post.id)
    sfx.deny()
    go(`x/post-removed/${post.id}`)
  }

  return (
    <Frame onClose={back} bar="Report" seed={52}>
      <div style={{ position: 'absolute', top: 100, left: 24, right: 24 }}>
        <motion.div className="eyebrow" {...rise(0.05, 8)} style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--label-3)' }}>Report · {post.name}’s post</motion.div>
        <motion.h1 className="h-display" {...rise(0.12)} style={{ fontSize: 30, lineHeight: 1.1, marginTop: 8 }}>What is wrong<br />with this post?</motion.h1>

        <Label style={{ marginTop: 22 }}>Pick one · {she} is never told</Label>
        <motion.div {...rise(0.2)} role="radiogroup" style={{ display: 'grid', gap: 8 }}>
          {reasons.map((r, i) => {
            const on = i === pick
            return (
              <motion.button key={r} role="radio" aria-checked={on} whileTap={{ scale: 0.985 }} onClick={() => { if (!on) { sfx.tap(); setPick(i) } }}
                style={{
                  height: 44, borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center', textAlign: 'left',
                  background: on ? 'rgba(64,44,112,0.85)' : 'rgba(52,35,95,0.6)',
                  border: on ? '1px solid rgba(248,237,255,0.55)' : CARD_LINE, transition: 'background .2s, border-color .2s',
                }}>
                <span style={{ flex: 1, fontSize: 15, color: 'var(--label-1)' }}>{r}</span>
                <span style={{ width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${on ? '#efe6d6' : 'rgba(179,166,196,0.55)'}`, display: 'grid', placeItems: 'center' }}>
                  {on && <motion.span layoutId="rp-dot" style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--chrome)' }} />}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        <Label style={{ marginTop: 22 }}>What happens</Label>
        <motion.p {...rise(0.28)} style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          A human reads this within a day. If it crossed a line we remove the post and act on the account. {post.name} is never told who reported {her}.
        </motion.p>
      </div>

      <Cta top={660} onClick={send}>Report this post</Cta>
      <Quiet top={728} onClick={back}>Never mind</Quiet>
    </Frame>
  )
}
