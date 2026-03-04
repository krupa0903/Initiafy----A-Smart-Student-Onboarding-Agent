import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';

interface NavbarProps {
  title: string;
  theme?: 'lilac' | 'blue';
}

export default function Navbar({ title, theme = 'lilac' }: NavbarProps) {
  const { user, notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';
  const avatarColor = theme === 'lilac' ? 'bg-[#A78BFA]' : 'bg-[#3B82F6]';
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const latestNotifications = notifications.slice(0, 3);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Info className="w-4 h-4 text-[#A78BFA]" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      default:
        return 'bg-[#F3F0FF]';
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleAvatarClick = () => {
    if (user?.role === 'student') {
      navigate('/student/settings');
    }
  };

  return (
    <div className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-[#1F2937]">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-50">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1F2937]">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-[#A78BFA] text-white px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {latestNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-4 border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer ${
                      !notification.read ? 'bg-[#F3F0FF] bg-opacity-30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${getBgColor(notification.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm text-[#1F2937]">{notification.title}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#A78BFA] rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280] line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-[#9CA3AF] mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {user?.role === 'student' && (
                <div className="p-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/student/notifications');
                    }}
                    className="text-sm text-[#A78BFA] hover:text-[#8B5CF6] font-medium w-full text-center"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={handleAvatarClick}
          className={`w-10 h-10 ${avatarColor} rounded-full flex items-center justify-center text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer`}
        >
          {initial}
        </button>
      </div>
    </div>
  );
}