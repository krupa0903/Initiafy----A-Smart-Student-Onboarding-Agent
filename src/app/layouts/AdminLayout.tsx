import React from 'react';
import { Outlet } from 'react-router';
import AdminSidebar from '../components/AdminSidebar';
import Navbar from '../components/Navbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <div className="ml-[220px]">
        <Navbar title="Admin Dashboard" theme="blue" />
        <Outlet />
      </div>
    </div>
  );
}
