import React from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Users, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Students', path: '/admin/students' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar() {
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
                      ? 'bg-[#EFF6FF] text-[#3B82F6]'
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
