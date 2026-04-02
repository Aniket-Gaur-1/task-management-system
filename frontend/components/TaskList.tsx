import { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggle: (taskId: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete, onToggle }: TaskListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <li className="px-6 py-4 text-center text-gray-500">
            No tasks found
          </li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <button
                    onClick={() => onToggle(task.id)}
                    className="mr-3 text-gray-400 hover:text-gray-600 text-xl"
                  >
                    {task.status === 'completed' ? '✓' : '○'}
                  </button>
                  <div className="flex-1">
                    <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`mt-1 text-sm ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-900 text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-900 text-lg"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}