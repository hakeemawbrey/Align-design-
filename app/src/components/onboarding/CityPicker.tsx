import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { sfx } from '../../lib/sfx'

/** Common birth cities; anything else can be typed in. */
const CITIES = [
  'Tulsa, Oklahoma', 'Oklahoma City, Oklahoma', 'Houston, Texas', 'Dallas, Texas', 'Austin, Texas', 'San Antonio, Texas', 'Fort Worth, Texas', 'El Paso, Texas',
  'San Francisco, California', 'Oakland, California', 'San Jose, California', 'Los Angeles, California', 'San Diego, California', 'Sacramento, California', 'Fresno, California',
  'New York, New York', 'Brooklyn, New York', 'Buffalo, New York', 'Chicago, Illinois', 'Detroit, Michigan', 'Minneapolis, Minnesota', 'Milwaukee, Wisconsin',
  'Atlanta, Georgia', 'Miami, Florida', 'Orlando, Florida', 'Tampa, Florida', 'Jacksonville, Florida', 'Charlotte, North Carolina', 'Raleigh, North Carolina',
  'Nashville, Tennessee', 'Memphis, Tennessee', 'New Orleans, Louisiana', 'Birmingham, Alabama', 'Jackson, Mississippi', 'Little Rock, Arkansas',
  'Kansas City, Missouri', 'St. Louis, Missouri', 'Wichita, Kansas', 'Omaha, Nebraska', 'Denver, Colorado', 'Phoenix, Arizona', 'Tucson, Arizona',
  'Las Vegas, Nevada', 'Salt Lake City, Utah', 'Albuquerque, New Mexico', 'Seattle, Washington', 'Portland, Oregon', 'Boise, Idaho', 'Honolulu, Hawaii', 'Anchorage, Alaska',
  'Boston, Massachusetts', 'Philadelphia, Pennsylvania', 'Pittsburgh, Pennsylvania', 'Baltimore, Maryland', 'Washington, D.C.', 'Richmond, Virginia',
  'Cleveland, Ohio', 'Columbus, Ohio', 'Cincinnati, Ohio', 'Indianapolis, Indiana', 'Louisville, Kentucky', 'Newark, New Jersey',
  'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Mexico City, Mexico', 'London, United Kingdom', 'Paris, France', 'Berlin, Germany', 'Madrid, Spain',
  'Rome, Italy', 'Lagos, Nigeria', 'Accra, Ghana', 'Nairobi, Kenya', 'Johannesburg, South Africa', 'Kingston, Jamaica', 'Port-au-Prince, Haiti',
  'São Paulo, Brazil', 'Bogotá, Colombia', 'Manila, Philippines', 'Seoul, South Korea', 'Tokyo, Japan', 'Shanghai, China', 'Mumbai, India', 'Delhi, India', 'Sydney, Australia',
]

/** Full-screen sheet: search, pick, or use what you typed. */
export default function CityPicker({ value, onPick, onClose }: { value: string; onPick: (city: string) => void; onClose: () => void }) {
  const [q, setQ] = useState('')
  const typed = q.trim()
  const list = useMemo(() => {
    const n = typed.toLowerCase()
    return n ? CITIES.filter((c) => c.toLowerCase().includes(n)) : CITIES
  }, [typed])
  const exact = list.some((c) => c.toLowerCase() === typed.toLowerCase())
  const pick = (c: string) => { sfx.tap(); onPick(c); onClose() }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        position: 'absolute', inset: 0, zIndex: 70, padding: '104px 22px 24px', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(22,12,52,0.98), rgba(11,6,32,0.99))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="h-display" style={{ flex: 1, fontSize: 26 }}>Where were you born?</div>
        <button onClick={() => { sfx.tap(); onClose() }} style={{ fontSize: 15, color: 'var(--label-2)' }}>Cancel</button>
      </div>
      <input
        autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a city"
        onKeyDown={(e) => { if (e.key === 'Enter' && typed) pick(list[0] && !exact && list.length === 1 ? list[0] : exact ? list.find((c) => c.toLowerCase() === typed.toLowerCase())! : typed) }}
        style={{
          marginTop: 16, height: 46, padding: '0 16px', borderRadius: 14, fontSize: 16, color: 'var(--label-1)', outline: 'none',
          background: 'rgba(40,26,78,0.75)', border: '1px solid rgba(154,123,224,0.45)', fontFamily: 'inherit',
        }}
      />
      <div style={{ marginTop: 10, flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {typed && !exact && (
          <button onClick={() => pick(typed)} style={{ width: '100%', textAlign: 'left', padding: '13px 4px', fontSize: 15.5, color: 'var(--align)', borderBottom: '1px solid rgba(179,166,196,0.12)' }}>
            Use “{typed}”
          </button>
        )}
        {list.map((c) => (
          <button key={c} onClick={() => pick(c)} style={{
            width: '100%', textAlign: 'left', padding: '13px 4px', fontSize: 15.5, display: 'flex', justifyContent: 'space-between',
            color: c === value ? 'var(--align)' : 'var(--label-1)', borderBottom: '1px solid rgba(179,166,196,0.12)',
          }}>
            <span>{c.split(', ')[0]}<span style={{ color: 'var(--label-3)' }}>, {c.split(', ').slice(1).join(', ')}</span></span>
            {c === value && <span>✓</span>}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
