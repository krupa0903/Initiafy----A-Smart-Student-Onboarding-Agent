import React from 'react';
import { useApp } from '../../context/AppContext';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function StudentDashboard() {
  const { currentStudent, tasks } = useApp();

  if (!currentStudent) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Overdue</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="h-2 bg-[#A78BFA]"></div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-1">
                {currentStudent.name}
              </h2>
              <div className="space-y-1 text-[#6B7280]">
                <p><span className="font-medium">Course:</span> {currentStudent.course}</p>
                <p><span className="font-medium">Enrollment:</span> {currentStudent.enrollment}</p>
                <p><span className="font-medium">Semester:</span> {currentStudent.semester}</p>
              </div>
            </div>
            <div className="w-16 h-16 bg-[#A78BFA] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {currentStudent.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#1F2937]">
              Onboarding Progress
            </h3>
            <span className="text-2xl font-semibold text-[#A78BFA]">
              {currentStudent.completion}%
            </span>
          </div>
          <Progress value={currentStudent.completion} className="h-3 bg-[#E5E7EB]" indicatorClassName="bg-[#A78BFA]" />
        </div>
        <p className="text-[#6B7280]">
          {currentStudent.tasksCompleted} of {currentStudent.totalTasks} steps completed
        </p>
      </div>

      {/* Task Cards */}
      <div>
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Your Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5 hover:border-[#A78BFA] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <h4 className="font-semibold text-[#1F2937] group-hover:text-[#A78BFA] transition-colors">
                    {task.title}
                  </h4>
                </div>
                {getStatusBadge(task.status)}
              </div>
              {task.description && (
                <p className="text-sm text-[#6B7280] mb-2">{task.description}</p>
              )}
              {task.dueDate && task.status === 'pending' && (
                <p className="text-sm text-[#A78BFA] font-medium">
                  Due in {task.dueDate}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}