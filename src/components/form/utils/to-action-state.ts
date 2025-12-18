import z, { ZodError } from 'zod'

export type ActionState<T = any> = {
  status?: 'SUCCESS' | 'ERROR'
  message: string
  fieldErrors: Record<string, string[] | undefined>
  payload?: FormData
  timestamp: number
  data?: T
}

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
}

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  // if validation error with Zod, return first error message

  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      message: '', //error.issues[0]?.message || 'Validation failed',
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    }
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      status: 'ERROR',
      message: 'An unknown error occurred. Please try again.',
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  }
}

export const toActionState = (
  status: ActionState['status'],
  message: string,
  formData?: FormData,
  data?: unknown
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
    payload: formData,
    data,
  }
}
