'use client'
import React from 'react';
import {
  History,
  Plus,
  Users,
  Bell,
  Settings,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import SearchInput from './SearchInput';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="bg-slate-100 h-14 flex items-center
      justify-between px-8 border-b border-slate-200  ">
      {/* Left section: History and Search */}
      <div className="flex items-center gap-4">
        <button aria-label="Recent Activities">
          <History className="w-5 h-6 text-gray-700" />
        </button>
        <SearchInput />
      </div>

      {/* Right section: Action buttons and user profile */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Add New"
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="text-white w-4 h-4" />
        </button>

        <button
          aria-label="User Groups"
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Users className="text-slate-900 w-4 h-4" />
        </button>

        <button
          aria-label="Notifications"
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Bell className="text-slate-900 w-4 h-4" />
        </button>

        <button
          aria-label="Settings"
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Settings className="text-slate-900 w-4 h-4" />
        </button>

        {/* User dropdown and avatar */}
        <div className="flex items-center gap-4 pl-2 border-l border-gray-300">
          <button className="flex items-center gap-1" aria-label="User Menu">
            <span className="text-sm font-medium text-gray-800">Gerat</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          <button aria-label="Profile Picture">
            <Image
              src="/cartoon.jpg"
              alt="User image"
              width={96}
              height={96}
              className="w-8 h-8 rounded-full border border-slate-800"
            />
          </button>

          <button aria-label="App Grid">
            <LayoutGrid className="w-6 h-6 text-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
};  

export default Header;
 