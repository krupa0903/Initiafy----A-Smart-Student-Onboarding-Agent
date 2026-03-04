import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Notifications() {
  const { notifications } = useApp();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-[#A78BFA]" />;
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Notifications</h1>
          <p className="text-[#6B7280]">Stay updated with your onboarding progress</p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#A78BFA] text-white rounded-xl">
            <Bell className="w-4 h-4" />
            <span className="font-semibold">{unreadCount} New</span>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-all ${
              !notification.read ? 'border-l-4 border-l-[#A78BFA]' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${getBgColor(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[#1F2937]">{notification.title}</h3>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#A78BFA] rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] mb-2">{notification.message}</p>
                <p className="text-xs text-[#9CA3AF]">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}