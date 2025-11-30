import { User } from 'better-auth'

type Entity = {
  userId: string | null
}

// Checks if an authenticated user owns a given entity by comparing user IDs
export const isOwner = (
  authUser: User | null | undefined,
  entity: Entity | null | undefined
) => {
  // Guard clause: Early return if either parameter is missing
  if (!authUser || !entity) {
    return false
  }

  // Guard clause: Entity exists but has no owner
  if (!entity.userId) {
    return false
  }

  // Main ownership check: Compare authenticated user's ID with entity's userId
  // Note: This else block could be simplified to just `return entity.userId === authUser.id`
  if (entity.userId !== authUser.id) {
    return false
  } else {
    return true
  }
}
