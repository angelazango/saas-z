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
import SearchInput from '../dashboard/SearchInput';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="relative bg-white/95 backdrop-blur-md h-16 flex items-center justify-between px-8 border-b border-gray-200/50 shadow-sm">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none"></div>
      
      {/* Left section: History and Search */}
      <div className="relative flex items-center gap-6">
        <button 
          aria-label="Recent Activities"
          className="group p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <History className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>
        <div className="transform hover:scale-[1.02] transition-transform duration-200">
          <SearchInput />
        </div>
      </div>

      {/* Right section: Action buttons and user profile */}
      <div className="relative flex items-center gap-3">
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Add New"
            className="group relative p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Plus className="relative text-white w-4 h-4" />
          </button>

          <button
            aria-label="User Groups"
            className="group p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <Users className="relative text-gray-600 group-hover:text-green-600 w-4 h-4 transition-colors duration-200" />
          </button>

          <button
            aria-label="Notifications"
            className="group relative p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <Bell className="relative text-gray-600 group-hover:text-orange-600 w-4 h-4 transition-colors duration-200" />
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>

          <button
            aria-label="Settings"
            className="group p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <Settings className="relative text-gray-600 group-hover:text-purple-600 w-4 h-4 transition-colors duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* Divider with gradient */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>

        {/* User section */}
        <div className="flex items-center gap-3">
          {/* User dropdown */}
          <button 
            className="group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95" 
            aria-label="User Menu"
          >
            <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              Gerat
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 group-hover:rotate-180 transition-all duration-200" />
          </button>

          {/* Avatar with glow effect */}
          <button 
            aria-label="Profile Picture"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-300"></div>
            <div className="relative ring-2 ring-gray-200 group-hover:ring-blue-400 rounded-full transition-all duration-200 hover:scale-110">
              <Image
                src="/cartoon.jpg"
                alt="User image"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </button>

          {/* App grid with hover effect */}
          <button 
            aria-label="App Grid"
            className="group p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <LayoutGrid className="relative w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </div>
  );
};  

export default Header;