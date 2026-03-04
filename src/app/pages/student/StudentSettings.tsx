import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { User, Bell, Lock, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentSettings() {
  const { currentStudent, updateStudentProfile, setUser } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(currentStudent?.name || '');
  const [course, setCourse] = useState(currentStudent?.course || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);

  if (!currentStudent) return null;

  const handleSaveProfile = () => {
    updateStudentProfile(name, course);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Student Settings</h1>
        <p className="text-[#6B7280]">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Profile Settings</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-[#1F2937] mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#E5E7EB] focus:border-[#A78BFA] focus:ring-[#A78BFA]"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-[#1F2937] mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              value={currentStudent.email}
              disabled
              className="border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]"
            />
            <p className="text-xs text-[#6B7280] mt-1">Email cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="course" className="text-sm font-medium text-[#1F2937] mb-2 block">
              Course
            </Label>
            <Input
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border-[#E5E7EB] focus:border-[#A78BFA] focus:ring-[#A78BFA]"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#1F2937] mb-2 block">
              Enrollment Number
            </Label>
            <Input
              value={currentStudent.enrollment}
              disabled
              className="border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Notification Preferences Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
            <div>
              <p className="font-medium text-[#1F2937]">Email Notifications</p>
              <p className="text-sm text-[#6B7280]">Receive notifications via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
            <div>
              <p className="font-medium text-[#1F2937]">Task Reminders</p>
              <p className="text-sm text-[#6B7280]">Get reminders for pending tasks</p>
            </div>
            <Switch
              checked={taskReminders}
              onCheckedChange={setTaskReminders}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-[#1F2937]">Deadline Alerts</p>
              <p className="text-sm text-[#6B7280]">Receive alerts for upcoming deadlines</p>
            </div>
            <Switch
              checked={deadlineAlerts}
              onCheckedChange={setDeadlineAlerts}
            />
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Account</h2>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#1F2937]"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start border-red-200 hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}