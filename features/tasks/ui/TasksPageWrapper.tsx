import { TaskStoreInitializer } from '@/features/tasks/components/TaskStoreInitializer'
import { TasksPage } from '@/features/tasks/ui/TasksPage'
import type { Task } from '@/shared/types/task'

type TasksPageWrapperProps = {
  tasks: Task[]
}

export function TasksPageWrapper({ tasks }: TasksPageWrapperProps) {
  return (
    <>
      <TaskStoreInitializer tasks={tasks} />
      <TasksPage />
    </>
  )
}
