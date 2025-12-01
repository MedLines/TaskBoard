import { closest } from 'fastest-levenshtein'

// this function is used because we have two paths:
// '/account/profile'
// '/account/password'
// but the side bar has only one "account" item
// that needs to to look 'active' or "clicked"
// when we are in both profile or password

export const getActivePath = (
  path: string,
  paths: string[],
  ignorePaths?: string[] // for edge cases where you are on 'sign in' and it shows my ticket as active
) => {
  const closestPath = closest(path, paths.concat(ignorePaths || []))
  const index = paths.indexOf(closestPath)

  return { activeIndex: index, activePath: closestPath }
}
