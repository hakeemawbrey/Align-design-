import type { PageProps } from '../types'
import Chat, { CHAT_DEMOS, type ChatDemo } from '../../screens/Chat'

/** x/chat-state/<state>: the chat with Juniper in one of its design states (S-09c…h, G-10). */
export default function ChatState({ go, arg }: PageProps) {
  const demo = CHAT_DEMOS.includes(arg as ChatDemo) ? (arg as ChatDemo) : 'unread'
  return <Chat key={demo} go={go} demo={demo} />
}
