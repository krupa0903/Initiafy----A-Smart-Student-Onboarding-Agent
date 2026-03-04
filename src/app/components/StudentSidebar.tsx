import React from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, CheckSquare, MessageCircle, Bell } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
  { icon: CheckSquare, label: 'My Tasks', path: '/student/tasks' },
  { icon: MessageCircle, label: 'Chat Assistant', path: '/student/chat' },
  { icon: Bell, label: 'Notifications', path: '/student/notifications' },
];

export default function StudentSidebar() {
  const location = useLocation();

  return (
    <div className="w-[220px] bg-white border-r border-[#E5E7EB] h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-[#E5E7EB]">
        <h1 className="text-xl font-semibold text-[#1F2937]">Initiafy</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#F3F0FF] text-[#A78BFA]'
                      : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1F2937]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}