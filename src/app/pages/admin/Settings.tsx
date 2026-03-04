import React, { useState } from 'react';
import { User, Bell, ShieldAlert, Settings as SettingsIcon, Lock } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [autoReminders, setAutoReminders] = useState(true);
  const [lowRiskThreshold, setLowRiskThreshold] = useState([70]);
  const [mediumRiskThreshold, setMediumRiskThreshold] = useState([40]);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Settings</h1>
        <p className="text-[#6B7280]">Manage your account and application preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Profile Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@initiafy.com" className="h-11" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Administrator" disabled className="h-11 bg-[#F9FAFB]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Academic Affairs" className="h-11" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937]">Email Notifications</p>
              <p className="text-sm text-[#6B7280]">Receive email alerts for important updates</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937]">Push Notifications</p>
              <p className="text-sm text-[#6B7280]">Get push notifications on your device</p>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937]">Weekly Reports</p>
              <p className="text-sm text-[#6B7280]">Receive weekly analytics summary via email</p>
            </div>
            <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937]">Auto-Reminders</p>
              <p className="text-sm text-[#6B7280]">Automatically send reminders to at-risk students</p>
            </div>
            <Switch checked={autoReminders} onCheckedChange={setAutoReminders} />
          </div>
        </div>
      </div>

      {/* Risk Threshold Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Risk Threshold Settings</h2>
        </div>
        <div className="p-6 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Low Risk Threshold</Label>
              <span className="text-sm font-semibold text-[#1F2937]">{lowRiskThreshold[0]}%+</span>
            </div>
            <Slider
              value={lowRiskThreshold}
              onValueChange={setLowRiskThreshold}
              max={100}
              step={5}
              className="mb-2"
            />
            <p className="text-xs text-[#6B7280]">Students above this completion rate are considered low risk</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Medium Risk Threshold</Label>
              <span className="text-sm font-semibold text-[#1F2937]">{mediumRiskThreshold[0]}%+</span>
            </div>
            <Slider
              value={mediumRiskThreshold}
              onValueChange={setMediumRiskThreshold}
              max={100}
              step={5}
              className="mb-2"
            />
            <p className="text-xs text-[#6B7280]">Students below low threshold but above this are medium risk</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg">
            <div className="flex gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-[#6B7280]">≥{lowRiskThreshold[0]}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-[#6B7280]">{mediumRiskThreshold[0]}-{lowRiskThreshold[0] - 1}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-[#6B7280]">&lt;{mediumRiskThreshold[0]}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Save Thresholds
            </Button>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">System Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" defaultValue="Asia/Kolkata (IST)" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input id="language" defaultValue="English" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Input id="dateFormat" defaultValue="DD/MM/YYYY" className="h-11" />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2937]">Security Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="Enter current password" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter new password" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="h-11" />
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
