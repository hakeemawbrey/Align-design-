/** Align+ prices, as the paywalls sell them (screens/Paywall.tsx, screens/Founding.tsx). 3 days free on every plan. */
export interface Plan {
  id: string
  name: string
  price: string
  /** 'a year' / 'a month' */
  word: string
  /** '/ yr' */
  per: string
  note: string
}

export const PLANS: Record<string, Plan> = {
  yearly: { id: 'yearly', name: 'Yearly', price: '$122.22', word: 'a year', per: '/ yr', note: 'Works out to $10.19 a month.' },
  monthly: { id: 'monthly', name: 'Monthly', price: '$23.33', word: 'a month', per: '/ mo', note: 'Cancel any time.' },
  founding: { id: 'founding', name: 'Yearly', price: '$88.88', word: 'a year', per: '/ yr', note: 'Founding price · works out to $7.41 a month.' },
  'founding-monthly': { id: 'founding-monthly', name: 'Monthly', price: '$14.44', word: 'a month', per: '/ mo', note: 'Founding price, locked while you stay.' },
}

export const plan = (arg?: string): Plan => PLANS[arg ?? ''] ?? PLANS.yearly

