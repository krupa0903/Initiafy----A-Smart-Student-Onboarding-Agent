import React from 'react';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const completionTrendData = [
  { week: 'Week 1', completion: 38 },
  { week: 'Week 2', completion: 52 },
  { week: 'Week 3', completion: 61 },
  { week: 'Week 4', completion: 68 },
  { week: 'Week 5', completion: 73 },
  { week: 'Week 6', completion: 78 },
];

const riskDistributionData = [
  { name: 'Low', value: 65, color: '#10B981' },
  { name: 'Medium', value: 25, color: '#F59E0B' },
  { name: 'High', value: 10, color: '#EF4444' },
];

const bottleneckData = [
  { stage: 'Document Upload', completion: 78 },
  { stage: 'Fee Payment', completion: 52 },
  { stage: 'ID Verification', completion: 85 },
  { stage: 'Orientation', completion: 61 },
  { stage: 'Hostel Registration', completion: 45 },
];

export default function Analytics() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Analytics</h1>
        <p className="text-[#6B7280]">Insights and trends for student onboarding</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6B7280]">Overall Completion</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-[#1F2937] mb-1">68%</p>
          <p className="text-xs text-green-600">+5% from last week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6B7280]">Drop-off Rate</p>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-semibold text-[#1F2937] mb-1">14%</p>
          <p className="text-xs text-green-600">-3% from last week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6B7280]">Avg Onboarding Time</p>
            <Clock className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <p className="text-3xl font-semibold text-[#1F2937] mb-1">6.2</p>
          <p className="text-xs text-[#6B7280]">Days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6B7280]">Intervention Success</p>
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-[#1F2937] mb-1">72%</p>
          <p className="text-xs text-green-600">+8% from last week</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-6">Onboarding Completion Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={completionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completion"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-6">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {riskDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-[#6B7280]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-6">Onboarding Stage Bottlenecks</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={bottleneckData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis type="category" dataKey="stage" stroke="#6B7280" width={150} style={{ fontSize: '12px' }} />
            <Tooltip />
            <Bar dataKey="completion" fill="#3B82F6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#1F2937] mb-4">AI-Powered Insights</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Students below 40% completion in the first 5 days show a 65% higher drop-off rate. Early intervention recommended.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Fee payment stage has the highest friction with only 52% completion. Consider simplifying the payment process.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Proactive notifications within 48 hours of task assignment improve completion rates by 22%.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
