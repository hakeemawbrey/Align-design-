import { Header, Cta } from './shared'

/** O-03b — under 18: a dead end with one way back. */
export default function AgeGate({ back }: { back: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Age check · Align is 18+"
        title="Come back at eighteen."
        body="Align matches adults. If the year you typed is wrong, that is the usual culprit."
      />
      <Cta onClick={back} delay={0.5}>Check my birth date</Cta>
    </div>
  )
}
