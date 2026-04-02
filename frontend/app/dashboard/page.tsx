'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import { Task } from '@/types/task'

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 10,
  })
  const router = useRouter()

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        router.push('/login')
        return
      }

      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.search) params.append('search', filters.search)
      params.append('page', filters.page.toString())
      params.append('limit', filters.limit.toString())

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/tasks?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTasks(response.data.tasks)
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Try to refresh token
        await refreshToken()
      } else {
        toast.error('Failed to fetch tasks')
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        router.push('/login')
        return
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/refresh`, {
        refreshToken,
      })

      localStorage.setItem('accessToken', response.data.accessToken)
      fetchTasks() // Retry fetching tasks
    } catch (error) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    }
  }

  useEffect(() => {
    // Debounced fetch - wait 300ms after filter changes
    const timer = setTimeout(() => {
      fetchTasks()
    }, 300)

    return () => clearTimeout(timer)
  }, [filters])

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Task created successfully!')
      setShowForm(false)
      fetchTasks()
    } catch (error: any) {
      if (error.response?.status === 401) {
        await refreshToken()
      } else {
        toast.error('Failed to create task')
      }
    }
  }

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return

    try {
      const token = localStorage.getItem('accessToken')
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/tasks/${editingTask.id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Task updated successfully!')
      setShowForm(false)
      setEditingTask(null)
      fetchTasks()
    } catch (error: any) {
      if (error.response?.status === 401) {
        await refreshToken()
      } else {
        toast.error('Failed to update task')
      }
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Task deleted successfully!')
      fetchTasks()
    } catch (error: any) {
      if (error.response?.status === 401) {
        await refreshToken()
      } else {
        toast.error('Failed to delete task')
      }
    }
  }

  const handleToggleTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/tasks/${taskId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Task status updated!')
      fetchTasks()
    } catch (error: any) {
      if (error.response?.status === 401) {
        await refreshToken()
      } else {
        toast.error('Failed to update task status')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add Task
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <TaskList
            tasks={tasks}
            onEdit={(task) => {
              setEditingTask(task)
              setShowForm(true)
            }}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        </div>
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}