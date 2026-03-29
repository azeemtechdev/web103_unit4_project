const EXTERIOR_PRICES = { red: 250, blue: 200, black: 220, white: 180 }
const WHEEL_PRICES = { standard: 0, sport: 350, premium: 600 }
const INTERIOR_PRICES = { cloth: 0, leather: 400, vegan: 500 }

export const calculatePrice = (options) => {
  if (!options) return 0
  const exterior = EXTERIOR_PRICES[options.exterior] || 0
  const wheels = WHEEL_PRICES[options.wheels] || 0
  const interior = INTERIOR_PRICES[options.interior] || 0
  return exterior + wheels + interior
}

export const formatPrice = (amount) => Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
