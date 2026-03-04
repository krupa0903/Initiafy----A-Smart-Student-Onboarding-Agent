import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { Search, Eye, Users, UserCheck, AlertTriangle } from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { Student } from '../../types';

export default function Students() {
  const { students, tasks } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.completion < 100).length;
  const completedStudents = students.filter(s => s.completion === 100).length;
  const highRiskStudents = students.filter(s => s.riskLevel === 'high').length;

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                          student.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || student.riskLevel === filter;
    return matchesSearch && matchesFilter;
  });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Medium</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High</Badge>;
    }
  };

  const getStatusBadge = (completion: number) => {
    if (completion === 100) {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
    }
    if (completion >= 50) {
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Active</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>;
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Students</h1>
        <p className="text-[#6B7280]">Manage and monitor student onboarding progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Students</p>
              <p className="text-3xl font-semibold text-[#1F2937]">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Active</p>
              <p className="text-3xl font-semibold text-[#3B82F6]">{activeStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Completed</p>
              <p className="text-3xl font-semibold text-green-600">{completedStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">High Risk</p>
              <p className="text-3xl font-semibold text-red-600">{highRiskStudents}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Tasks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Completion</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Risk</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-[#1F2937]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-[#1F2937]">
                    {student.tasksCompleted}/{student.totalTasks}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1F2937] min-w-[40px]">
                        {student.completion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRiskBadge(student.riskLevel)}</td>
                  <td className="px-6 py-4">{getStatusBadge(student.completion)}</td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handleViewStudent(student)}
                      variant="ghost"
                      size="sm"
                      className="text-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[500px] sm:w-[540px]">
          {selectedStudent && (
            <>
              <SheetHeader>
                <SheetTitle>Student Details</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1F2937]">{selectedStudent.name}</h3>
                    <p className="text-sm text-[#6B7280]">{selectedStudent.email}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 p-4 bg-[#F9FAFB] rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Course</span>
                    <span className="text-sm font-medium text-[#1F2937]">{selectedStudent.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Enrollment</span>
                    <span className="text-sm font-medium text-[#1F2937]">{selectedStudent.enrollment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Semester</span>
                    <span className="text-sm font-medium text-[#1F2937]">{selectedStudent.semester}</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-[#1F2937]">Onboarding Progress</h4>
                    <span className="text-2xl font-semibold text-[#3B82F6]">{selectedStudent.completion}%</span>
                  </div>
                  <Progress value={selectedStudent.completion} className="h-3" />
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="font-semibold text-[#1F2937] mb-3">Task Checklist</h4>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          readOnly
                          className="w-4 h-4 text-[#3B82F6] rounded"
                        />
                        <span className={`flex-1 text-sm ${task.status === 'completed' ? 'text-[#6B7280] line-through' : 'text-[#1F2937]'}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Level */}
                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#6B7280]">Risk Level</span>
                    {getRiskBadge(selectedStudent.riskLevel)}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white h-11">
                    Send Notification
                  </Button>
                  <Button variant="outline" className="w-full h-11 border-[#E5E7EB]">
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}