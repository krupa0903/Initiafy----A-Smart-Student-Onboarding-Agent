import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';

export default function MyTasks() {
  const { tasks, updateTaskStatus } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-red-600" />;
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

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const pendingTasks = tasks.filter(t => t.status === 'pending');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">My Tasks</h1>
        <p className="text-[#6B7280]">Track and manage your onboarding tasks</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Tasks</p>
              <p className="text-3xl font-semibold text-[#1F2937]">{tasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#A78BFA]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Completed</p>
              <p className="text-3xl font-semibold text-green-600">{completedTasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Pending</p>
              <p className="text-3xl font-semibold text-yellow-600">{pendingTasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Pending Tasks</h2>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[#1F2937]">{task.title}</h3>
                      {getStatusBadge(task.status)}
                    </div>
                    {task.description && (
                      <p className="text-sm text-[#6B7280] mb-3">{task.description}</p>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-[#A78BFA]">
                        <Calendar className="w-4 h-4" />
                        <span>Due in {task.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => updateTaskStatus(task.id, 'completed')}
                  className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
                >
                  Mark Complete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Completed Tasks</h2>
        <div className="space-y-3">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 opacity-75"
            >
              <div className="flex items-start gap-4">
                {getStatusIcon(task.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#1F2937]">{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>
                  {task.description && (
                    <p className="text-sm text-[#6B7280]">{task.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
