import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, students } = useApp();
  const navigate = useNavigate();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Find student by email or use first student if email doesn't match
    const student = students.find(s => s.email.toLowerCase() === email.toLowerCase()) || students[0];
    setUser(student);
    navigate('/student/dashboard');
  };

  const handleAdminLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    // Mock admin login
    setUser({
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@initiafy.com',
      role: 'admin',
    });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FAF8FF] relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-16 w-full">
          <div className="max-w-md">
            <h1 className="text-5xl font-semibold text-[#1F2937] mb-4">
              Initiafy
            </h1>
            <p className="text-xl text-[#6B7280] leading-relaxed">
              Making your college journey stress-free with AI support.
            </p>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#A78BFA] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-40 w-48 h-48 bg-[#8B5CF6] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-20 w-40 h-40 bg-[#A78BFA] opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E7EB]">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-2">
                Welcome Back
              </h2>
              <p className="text-[#6B7280]">
                Sign in to continue your journey
              </p>
            </div>

            <form onSubmit={handleStudentLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1F2937]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-[#E5E7EB] focus:border-[#A78BFA] focus:ring-[#A78BFA]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1F2937]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-[#E5E7EB] focus:border-[#A78BFA] focus:ring-[#A78BFA]"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white rounded-xl transition-colors"
              >
                Login as Student
              </Button>

              <button
                type="button"
                onClick={handleAdminLogin}
                className="w-full text-[#6B7280] hover:text-[#A78BFA] text-sm font-medium transition-colors"
              >
                Login as Admin
              </button>
            </form>

            {/* Test accounts hint */}
            <div className="mt-6 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
              <p className="text-xs font-semibold text-[#1F2937] mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-[#6B7280]">
                <p>• rahul.sharma@college.edu</p>
                <p>• riya.patel@college.edu</p>
                <p>• aman.singh@college.edu</p>
                <p>• krupa@email.com</p>
                <p>• sara@email.com</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Smart Student Onboarding Agent (SSOA)
          </p>
        </div>
      </div>
    </div>
  );
}