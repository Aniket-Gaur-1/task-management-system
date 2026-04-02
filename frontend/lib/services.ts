import api from './api';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth APIs
export const authAPI = {
  register: (email: string, name: string, password: string, confirmPassword: string) =>
    api.post('/auth/register', { email, name, password, confirmPassword }),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),

  logout: () => api.post('/auth/logout'),
};

// Task APIs
export const taskAPI = {
  getTasks: (page: number = 1, limit: number = 10, status?: string, search?: string) =>
    api.get('/tasks', { params: { page, limit, status, search } }),

  getTaskById: (id: number) => api.get(`/tasks/${id}`),

  createTask: (title: string, description?: string) =>
    api.post('/tasks', { title, description }),

  updateTask: (id: number, title?: string, description?: string, status?: string) =>
    api.patch(`/tasks/${id}`, { title, description, status }),

  deleteTask: (id: number) => api.delete(`/tasks/${id}`),

  toggleTask: (id: number) => api.post(`/tasks/${id}/toggle`),
};
