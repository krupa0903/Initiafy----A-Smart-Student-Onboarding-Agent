import { createBrowserRouter } from 'react-router';
import Login from './pages/Login';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import MyTasks from './pages/student/MyTasks';
import ChatAssistant from './pages/student/ChatAssistant';
import Notifications from './pages/student/Notifications';
import StudentSettings from './pages/student/StudentSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import Students from './pages/admin/Students';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/student',
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: 'dashboard', Component: StudentDashboard },
      { path: 'tasks', Component: MyTasks },
      { path: 'chat', Component: ChatAssistant },
      { path: 'notifications', Component: Notifications },
      { path: 'settings', Component: StudentSettings },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'dashboard', Component: AdminDashboard },
      { path: 'students', Component: Students },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: Settings },
    ],
  },
]);