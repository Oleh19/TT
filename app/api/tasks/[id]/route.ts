import { NextRequest } from 'next/server'
import {
  getTaskById,
  updateTask,
  deleteTask,
} from '@/features/tasks/model/taskStorage'
import { handleApiErrorResponse, NotFoundError } from '@/shared/lib/errors'
import type { Status, Label } from '@/shared/types/task'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await getTaskById(params.id)
    if (!task) {
      throw new NotFoundError('Task')
    }
    return Response.json({ data: task })
  } catch (error) {
    return handleApiErrorResponse(error)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, key, description, status, labels } = body

    const existingTask = await getTaskById(params.id)
    if (!existingTask) {
      throw new NotFoundError('Task')
    }

    const updates: Partial<{
      name: string
      key: string
      description: string
      status: Status
      labels: Label[]
    }> = {}

    if (name !== undefined) {
      updates.name = name
    }

    if (key !== undefined) {
      updates.key = key
    }

    if (description !== undefined) {
      updates.description = description
    }

    if (status !== undefined) {
      updates.status = status
    }

    if (labels !== undefined) {
      updates.labels = labels
    }

    const updatedTask = await updateTask(params.id, updates)

    if (!updatedTask) {
      return Response.json({ error: 'Failed to update task' }, { status: 500 })
    }

    return Response.json({ data: updatedTask })
  } catch (error) {
    if (error instanceof NotFoundError) {
      return handleApiErrorResponse(error)
    }
    if (error instanceof Error && error.message.includes('already exists')) {
      return Response.json({ error: error.message }, { status: 409 })
    }
    return handleApiErrorResponse(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteTask(params.id)
    if (!result.success) {
      if (result.task?.status === 'in_progress') {
        return Response.json(
          { error: 'Cannot delete task with status "In Progress"' },
          { status: 409 }
        )
      }
      throw new NotFoundError('Task')
    }
    return Response.json({ data: { success: true } })
  } catch (error) {
    return handleApiErrorResponse(error)
  }
}
