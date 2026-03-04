import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Student, Task, ChatMessage, Notification } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentStudent: Student | null;
  students: Student[];
  setStudents: (students: Student[]) => void;
  tasks: Task[];
  chatMessages: ChatMessage[];
  notifications: Notification[];
  addChatMessage: (message: ChatMessage) => void;
  updateTaskStatus: (taskId: string, status: 'completed' | 'pending' | 'overdue') => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  updateStudentProfile: (name: string, course: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@college.edu',
    role: 'student',
    course: 'B.Tech CSE',
    enrollment: '2026CSE045',
    semester: 1,
    completion: 33,
    riskLevel: 'low',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '2',
    name: 'Riya Patel',
    email: 'riya.patel@college.edu',
    role: 'student',
    course: 'B.Tech ECE',
    enrollment: '2026ECE012',
    semester: 1,
    completion: 33,
    riskLevel: 'low',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '3',
    name: 'Aman Singh',
    email: 'aman.singh@college.edu',
    role: 'student',
    course: 'B.Tech ME',
    enrollment: '2026ME034',
    semester: 1,
    completion: 33,
    riskLevel: 'medium',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '4',
    name: 'Neha Gupta',
    email: 'neha.gupta@college.edu',
    role: 'student',
    course: 'B.Tech CSE',
    enrollment: '2026CSE078',
    semester: 1,
    completion: 33,
    riskLevel: 'high',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '5',
    name: 'Priya Verma',
    email: 'priya.verma@college.edu',
    role: 'student',
    course: 'B.Tech IT',
    enrollment: '2026IT021',
    semester: 1,
    completion: 33,
    riskLevel: 'low',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '6',
    name: 'Krupa Patel',
    email: 'krupa@email.com',
    role: 'student',
    course: 'B.Tech AI/ML',
    enrollment: '2026AI011',
    semester: 1,
    completion: 33,
    riskLevel: 'low',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '7',
    name: 'Sara Mehta',
    email: 'sara@email.com',
    role: 'student',
    course: 'B.Tech DS',
    enrollment: '2026DS009',
    semester: 1,
    completion: 33,
    riskLevel: 'low',
    tasksCompleted: 2,
    totalTasks: 6,
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Upload Documents',
    status: 'completed',
    description: 'Upload required documents for verification',
  },
  {
    id: '2',
    title: 'Pay Admission Fee',
    status: 'pending',
    dueDate: '3 days',
    description: 'Complete the admission fee payment before deadline',
  },
  {
    id: '3',
    title: 'Hostel Registration',
    status: 'pending',
    description: 'Register for hostel accommodation',
  },
  {
    id: '4',
    title: 'Orientation Form',
    status: 'completed',
    description: 'Fill out the orientation attendance form',
  },
  {
    id: '5',
    title: 'ID Card Application',
    status: 'pending',
    description: 'Apply for student ID card',
  },
  {
    id: '6',
    title: 'Library Registration',
    status: 'pending',
    description: 'Complete library registration process',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'initia',
    message: 'Hi Rahul! 👋 I\'m Initia, your AI onboarding assistant. I\'m here to help you navigate your college admission process smoothly. How can I help you today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Document Upload Completed',
    message: 'Your documents have been successfully verified.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Payment Reminder',
    message: 'Admission fee payment is due in 3 days. Please complete it soon.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Hostel Registration Open',
    message: 'Hostel registration is now open. Complete your application before the deadline.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Orientation Form Submitted',
    message: 'Your orientation attendance form has been successfully submitted.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Welcome to SSOA',
    message: 'Welcome! Initia is here to help you through your onboarding journey.',
    time: '3 days ago',
    read: true,
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const currentStudent = user?.role === 'student' 
    ? students.find(s => s.id === user.id) || null 
    : null;

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const updateTaskStatus = (taskId: string, status: 'completed' | 'pending' | 'overdue') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));

    // Update student completion percentage
    if (user?.role === 'student') {
      setStudents(prev => prev.map(student => {
        if (student.id === user.id) {
          const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, status } : task
          );
          const completedCount = updatedTasks.filter(t => t.status === 'completed').length;
          const totalTasks = updatedTasks.length;
          const completion = Math.round((completedCount / totalTasks) * 100);
          
          return {
            ...student,
            tasksCompleted: completedCount,
            completion
          };
        }
        return student;
      }));
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const updateStudentProfile = (name: string, course: string) => {
    setStudents(prev => prev.map(student => 
      student.id === user?.id ? { ...student, name, course } : student
    ));
    
    // Update user object as well
    if (user?.role === 'student') {
      setUser(prev => prev ? { ...prev, name } : null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentStudent,
        students,
        setStudents,
        tasks,
        chatMessages,
        notifications,
        addChatMessage,
        updateTaskStatus,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateStudentProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};