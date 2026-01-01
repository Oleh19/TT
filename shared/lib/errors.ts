export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class AppError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

export function handleApiErrorResponse(error: unknown): Response {
  const message = getErrorMessage(error)

  if (error instanceof ValidationError) {
    return Response.json({ error: message }, { status: 400 })
  }

  if (error instanceof NotFoundError) {
    return Response.json({ error: message }, { status: 404 })
  }

  if (error instanceof UnauthorizedError) {
    return Response.json({ error: message }, { status: 401 })
  }

  if (error instanceof ForbiddenError) {
    return Response.json({ error: message }, { status: 403 })
  }

  if (process.env.NODE_ENV === 'production') {
    console.error('API Error:', {
      message,
      error: error instanceof Error ? error.stack : error,
      timestamp: new Date().toISOString(),
    })
  } else {
    console.error('API Error:', error)
  }

  return Response.json({ error: 'Internal server error' }, { status: 500 })
}
