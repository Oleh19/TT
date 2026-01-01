import { getAllTasks } from '@/features/tasks/model/taskStorage'
import { TasksPageWrapper } from '@/features/tasks'

export default async function Home() {
  const tasks = await getAllTasks()

  return (
    <main className="min-h-screen bg-primary-400 p-6">
      <div className="mx-auto max-w-layout">
        <TasksPageWrapper tasks={tasks} />
      </div>
    </main>
  )
}
