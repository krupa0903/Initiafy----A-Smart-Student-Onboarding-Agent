export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  course: string;
  enrollment: string;
  semester: number;
  completion: number;
  riskLevel: 'low' | 'medium' | 'high';
  tasksCompleted: number;
  totalTasks: number;
}

export interface Task {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'overdue';
  dueDate?: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'initia';
  message: string;
  timestamp: Date;
}

export interface AdminMetric {
  label: string;
  value: string | number;
  color?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}