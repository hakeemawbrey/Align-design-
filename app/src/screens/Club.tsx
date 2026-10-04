import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'
import TabBar from '../components/TabBar'
import AuraFigure from '../components/you/AuraFigure'
import Composer from '../components/club/Composer'
import Thread from '../components/club/Thread'
import { AuraAvatar, LikeButton, PopCount, SparkCount } from '../components/club/PostParts'
import { ROOM_POSTS, ROOM_COUNT, SAID_TONIGHT, TONIGHT_PROMPT, type Post, type Reply } from '../components/club/posts'
import { ME } from '../data/profiles'
import { SIGNS } from '../data/signs'
import { sfx } from '../lib/sfx'
import { session, useSession, type ClubPost } from '../lib/session'

const SUN = SIGNS[ME.sign]
const LIME = '#dfe36a'
const maskFor = (scrolled: boolean) => `linear-gradient(180deg, transparent ${scrolled ? 52 : 38}px, #000 ${scrolled ? 96 : 60}px, #000 640px, transparent 690px)`

const minePost = (m: ClubPost): Post => ({
  id: m.id, name: ME.name, age: ME.age, moon: ME.moon, ago: 'NOW', hood: 'Houston',
  text: m.text, likes: m.likes, sparks: m.sparks, replies: [], mine: true,
})

/** S-17 · Club — the Taurus room. */
export default function Club({ go }: ScreenProps) {
  const { clubMine, clubLiked } = useSession()
  const [composer, setComposer] = useState<null | { prompt?: string }>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [extraReplies, setExtraReplies] = useState<Record<string, Reply[]>>({})
  const [justPosted, setJustPosted] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const posts: Post[] = [...clubMine.map(minePost), ...ROOM_POSTS]
  const liked = new Set(clubLiked)
  const likesOf = (p: Post) => p.likes + (liked.has(p.id) ? 1 : 0)
  const said = SAID_TONIGHT + clubMine.length

  const toggleLike = useCallback((id: string) => {
    sfx.tap()
    const cur = session.get().clubLiked
    session.patch({ clubLiked: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] })
  }, [])

  const bumpMine = (id: string, d: Partial<Pick<ClubPost, 'likes' | 'sparks'>>) => {
    // only touches a post that still exists (a demo restart clears them)
    const cur = session.get().clubMine
    if (!cur.some((m) => m.id === id)) return
    session.patch({ clubMine: cur.map((m) => (m.id === id ? { ...m, likes: m.likes + (d.likes ?? 0), sparks: m.sparks + (d.sparks ?? 0) } : m)) })
  }

  const post = (text: string) => {
    setComposer(null)
    sfx.send()
    const id = `me-${Date.now()}`
    // bring the top of the feed into view, then drop the post in
    const el = scroller.current
    const feed = feedRef.current
    if (el && feed) el.scrollTo({ top: Math.max(0, feed.offsetTop - 130), behavior: 'smooth' })
    const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }
    later(() => {
      setJustPosted(id)
      session.patch({ clubMine: [{ id, text, likes: 0, sparks: 0 }, ...session.get().clubMine] })
      sfx.sparkle()
    }, 380)
    // the room notices
    later(() => { bumpMine(id, { likes: 1 }); sfx.tap() }, 1900)
    later(() => { bumpMine(id, { likes: 1 }); sfx.tap() }, 2500)
    later(() => { bumpMine(id, { sparks: 1 }); sfx.receive() }, 3100)
    later(() => { bumpMine(id, { likes: 1 }); sfx.tap() }, 3600)
    later(() => setJustPosted((j) => (j === id ? null : j)), 4200)
  }

  const open = posts.find((p) => p.id === openId)

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield aurora="#2f2a80" warm="#4a2470" count={80} seed={17} />
      <style>{`.club-scroll::-webkit-scrollbar{display:none}`}</style>

      <motion.div
        ref={scroller}
        className="club-scroll"
        animate={{ x: open ? -90 : 0, opacity: open ? 0.3 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', WebkitMaskImage: maskFor(scrolled), maskImage: maskFor(scrolled) }}
        onScroll={(e) => { const s = e.currentTarget.scrollTop > 6; if (s !== scrolled) setScrolled(s) }}
      >
        <div style={{ position: 'relative', paddingBottom: 200 }}>
          {/* hero */}
          <div style={{ position: 'relative', height: 256 }}>
            <div className="eyebrow" style={{ position: 'absolute', left: 24, top: 64 }}>Club · {SUN.name} only</div>
            <div className="eyebrow" style={{ position: 'absolute', right: 24, top: 64, color: LIME, fontWeight: 700 }}>Houston</div>
            <AuraFigure src={SUN.figureImg} width={190} height={159} style={{ left: 100, top: 74 }} />
            <motion.div className="h-display" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
              style={{ position: 'absolute', top: 204, width: '100%', textAlign: 'center', fontSize: 32, textShadow: '0 2px 18px rgba(11,6,32,0.9)' }}>
              The {SUN.name} room
            </motion.div>
            <div className="mono" style={{ position: 'absolute', top: 243, width: '100%', textAlign: 'center', fontSize: 8.5, letterSpacing: '0.12em', fontWeight: 700, color: LIME }}>
              {ROOM_COUNT.toLocaleString('en-US')} IN THE ROOM · <PopCount n={said} /> SAID SOMETHING TONIGHT
            </div>
          </div>

          {/* tonight's prompt */}
          <div className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)', margin: '12px 24px 8px' }}>Tonight’s prompt</div>
          <motion.button
            onClick={() => { sfx.tap(); setComposer({ prompt: TONIGHT_PROMPT }) }}
            whileHover={{ y: -2, borderColor: 'rgba(223,227,106,0.75)' }} whileTap={{ scale: 0.98 }}
            style={{
              display: 'block', width: 342, margin: '0 24px', padding: '12px 16px 12px 16px', borderRadius: 14, textAlign: 'left',
              background: 'rgba(52,35,95,0.72)', border: '1px solid rgba(223,227,106,0.4)', boxShadow: '0 0 22px rgba(223,227,106,0.06)',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.span animate={{ opacity: [1, 0.45, 1], scale: [1, 0.85, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: 4, background: '#9be35a', boxShadow: '0 0 10px #9be35a', flexShrink: 0 }} />
              <span className="serif italic" style={{ fontSize: 17.5, color: 'var(--label-1)' }}>{TONIGHT_PROMPT}</span>
            </div>
            <div className="mono" style={{ marginTop: 6, marginLeft: 18, fontSize: 9, letterSpacing: '0.12em', fontWeight: 700, color: LIME }}>Say the first thing ›</div>
          </motion.button>

          {/* the room */}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 24px 8px' }}>
            <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}>The room</span>
            <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--label-3)' }}><PopCount n={said} /> tonight</span>
          </div>
          <div ref={feedRef} style={{
            margin: '0 24px', borderRadius: 16, overflow: 'hidden',
            background: 'rgba(30,18,64,0.85)', border: '1px solid rgba(179,166,196,0.16)',
          }}>
            <AnimatePresence initial={false}>
              {posts.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  transition={{ height: { type: 'spring', stiffness: 260, damping: 30 }, opacity: { duration: 0.4, delay: 0.1 } }}
                  style={{ overflow: 'hidden' }}>
                  <PostRow
                    post={p} first={i === 0} fresh={p.id === justPosted}
                    liked={liked.has(p.id)} likes={likesOf(p)} sparks={p.sparks + (extraReplies[p.id]?.length ?? 0)}
                    onLike={() => toggleLike(p.id)}
                    onOpen={() => { sfx.tap(); setOpenId(p.id) }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mono" style={{ textAlign: 'center', marginTop: 16, fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-4)' }}>
            THE ROOM CLEARS AT 11:11
          </div>
        </div>
      </motion.div>

      {/* primary CTA */}
      <motion.div animate={{ opacity: open ? 0 : 1, y: open ? 10 : 0 }} style={{ position: 'absolute', top: 690, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 20, pointerEvents: open ? 'none' : 'auto' }}>
        <motion.button className="chrome-cta" whileHover={{ scale: 1.02 }} onClick={() => { sfx.tap(); setComposer({}) }}>
          Say it to the room <span className="spark">✦</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <Thread key="thread" post={open} liked={liked.has(open.id)} likes={likesOf(open)}
            extra={extraReplies[open.id] ?? []}
            onLike={() => toggleLike(open.id)}
            onReply={(text) => setExtraReplies((r) => ({ ...r, [open.id]: [...(r[open.id] ?? []), { name: ME.name, age: ME.age, moon: ME.moon, text }] }))}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>

      <TabBar active="club" go={go} onSelect={(t) => { if (t === 'club' && open) { setOpenId(null); return true } }} />

      <AnimatePresence>
        {composer && (
          <Composer key="composer" prompt={composer.prompt} listening={ROOM_COUNT.toLocaleString('en-US')}
            onPost={post} onClose={() => setComposer(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

interface RowProps {
  post: Post
  first: boolean
  fresh: boolean
  liked: boolean
  likes: number
  sparks: number
  onLike: () => void
  onOpen: () => void
}

function PostRow({ post, first, fresh, liked, likes, sparks, onLike, onOpen }: RowProps) {
  const moon = SIGNS[post.moon]
  return (
    <motion.div
      role="button"
      onClick={onOpen}
      whileHover={{ backgroundColor: 'rgba(52,35,95,0.45)' }}
      animate={{ backgroundColor: fresh ? 'rgba(242,199,92,0.08)' : 'rgba(52,35,95,0)' }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative', display: 'flex', gap: 12, padding: '13px 14px 14px 14px', cursor: 'pointer', borderTop: first ? undefined : '1px solid rgba(179,166,196,0.12)' }}
    >
      {fresh && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6] }} transition={{ duration: 1.2 }}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--gold-foil)', boxShadow: '0 0 10px rgba(242,199,92,0.8)' }} />
      )}
      <AuraAvatar sign={post.moon} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div className="serif italic" style={{ fontSize: 17, lineHeight: '20px', color: 'var(--label-1)' }}>{post.name}, {post.age}</div>
            <div className="mono" style={{ marginTop: 2, fontSize: 8, letterSpacing: '0.14em', color: post.mine ? LIME : 'var(--label-3)' }}>
              {moon.name.toUpperCase()} MOON · {post.ago}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: -4 }}>
            <LikeButton liked={liked} count={likes} onToggle={onLike} />
            <SparkCount n={sparks} onClick={onOpen} />
          </div>
        </div>
        <div style={{ marginTop: 5, fontSize: 13.5, lineHeight: '19px', color: 'var(--label-1)', opacity: 0.92, wordBreak: 'break-word' }}>{post.text}</div>
      </div>
    </motion.div>
  )
}
