const impossibleCombination = (options) => {
  if (!options) return null
  if (options.exterior === 'red' && options.interior === 'vegan') {
    return 'Red exterior cannot be paired with vegan interior in this model.'
  }
  if (options.wheels === 'standard' && options.exterior === 'black') {
    return 'Black exterior requires at least sport wheels.'
  }
  return null
}

export const getValidationError = (options) => {
  return impossibleCombination(options)
}

export const isValidCombo = (options) => !getValidationError(options)
