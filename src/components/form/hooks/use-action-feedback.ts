import { useEffect, useRef } from 'react'

import { ActionState } from '../utils/to-action-state'

type onArg = { actionState: ActionState }

type usActionFeedbackOptions = {
  onSuccess?: (onArg: onArg) => void
  onError?: (onArg: onArg) => void
}

const useActionFeedback = (
  actionState: ActionState,
  options: usActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timestamp)

  useEffect(() => {
    const isUpdate = prevTimestamp.current !== actionState.timestamp

    if (!isUpdate) return

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState })
    }
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState })
    }

    prevTimestamp.current = actionState.timestamp
  }, [actionState, options])
}

export { useActionFeedback }
