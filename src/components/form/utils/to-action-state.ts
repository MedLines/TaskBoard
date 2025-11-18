import z, { ZodError } from 'zod'

export type ActionState = {
  message: string
  fieldErrors: Record<string, string[] | undefined>
  payload?: FormData
}

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // if validation error with Zod, return first error message

  if (error instanceof ZodError) {
    return {
      message: '', //error.issues[0]?.message || 'Validation failed',
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
    }
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    }
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      message: 'An unknown error occurred. Please try again.',
      fieldErrors: {},
      payload: formData,
    }
  }
}
