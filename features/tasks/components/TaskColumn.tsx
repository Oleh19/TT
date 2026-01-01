import { Card } from '@/shared/ui/Card'
import { STATUS_MAP } from '@/features/tasks/constants/taskOptions'
import type { Task, Status } from '@/shared/types/task'

type TaskColumnProps = {
  status: Status
  title: string
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function TaskColumn({
  status,
  title,
  tasks,
  onTaskClick,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-column p-3 pt-4">
      <h2 className="text-lg font-semibold text-primary-900">{title}</h2>
      <div className="flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-primary-300 bg-white">
            <p className="text-xs text-primary-600">No tasks</p>
          </div>
        ) : (
          tasks.map(task => (
            <Card
              key={task.id}
              status={STATUS_MAP[task.status]}
              title={task.name}
              subtitle={task.key}
              description={task.description}
              tags={task.labels}
              onClick={() => onTaskClick(task)}
              className="cursor-pointer"
            />
          ))
        )}
      </div>
    </div>
  )
}
