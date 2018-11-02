
export default breakpoints => {
  const mediaQueries = {}
  Object.keys(breakpoints).forEach((key) => {
    mediaQueries[`max_${key}`] = `@media (max-width: ${breakpoints[key]}px)`
    mediaQueries[`min_${key}`] = `@media (min-width: ${breakpoints[key]}px)`
  })
  return mediaQueries
}
