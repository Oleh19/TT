import { NextRequest } from 'next/server'
import { createTask, getTaskByKey } from '@/features/tasks/model/taskStorage'
import { handleApiErrorResponse } from '@/shared/lib/errors'
import { mockTasks } from '@/features/tasks/model/mockData'

export async function GET() {
  try {
    return Response.json({ data: mockTasks })
  } catch (error) {
    return handleApiErrorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, key, description, status, labels } = body

    const existingTask = await getTaskByKey(key)
    if (existingTask) {
      return Response.json(
        { error: 'Task with this key already exists' },
        { status: 409 }
      )
    }

    const newTask = await createTask({
      name: name || '',
      key: key || '',
      description: description || '',
      status: status || 'backlog',
      labels: labels || [],
    })

    return Response.json({ data: newTask }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return Response.json({ error: error.message }, { status: 409 })
    }
    return handleApiErrorResponse(error)
  }
}
