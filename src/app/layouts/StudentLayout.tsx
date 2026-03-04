import React from 'react';
import { Outlet } from 'react-router';
import StudentSidebar from '../components/StudentSidebar';
import Navbar from '../components/Navbar';

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <StudentSidebar />
      <div className="ml-[220px]">
        <Navbar title="Dashboard" theme="lilac" />
        <Outlet />
      </div>
    </div>
  );
}
