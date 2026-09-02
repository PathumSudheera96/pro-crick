export const BACKEND_UNAVAILABLE_MESSAGE =
  'Service not available at the moment. Please try again shortly.'

export const isBackendUnavailableError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false
  }

  if ('payloadInitError' in error && error.payloadInitError === true) {
    return true
  }

  if ('code' in error) {
    const code = String(error.code)

    if (code === 'ECONNREFUSED' || code === 'EPERM') {
      return true
    }
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message.toLowerCase().includes('cannot connect to postgres')
  }

  return false
}
