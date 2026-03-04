import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Week 1', completion: 45 },
  { name: 'Week 2', completion: 62 },
  { name: 'Week 3', completion: 68 },
  { name: 'Week 4', completion: 75 },
];

export default function AdminDashboard() {
  const { students } = useApp();

  const totalStudents = students.length;
  const avgCompletion = Math.round(
    students.reduce((sum, s) => sum + s.completion, 0) / students.length
  );
  const atRiskStudents = students.filter(s => s.riskLevel === 'high').length;

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

  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-sm text-[#6B7280] mb-1">Average Completion</p>
              <p className="text-3xl font-semibold text-[#1F2937]">{avgCompletion}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Students At Risk</p>
              <p className="text-3xl font-semibold text-red-600">{atRiskStudents}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h2 className="text-lg font-semibold text-[#1F2937]">Student Progress</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Completion %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {students.slice(1, 4).map((student) => (
                <tr key={student.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-[#1F2937]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#E5E7EB] rounded-full h-2 max-w-[200px]">
                        <div
                          className="bg-[#3B82F6] h-2 rounded-full transition-all"
                          style={{ width: `${student.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-[#1F2937] min-w-[40px]">
                        {student.completion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRiskBadge(student.riskLevel)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-6">Student Completion Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="completion" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
