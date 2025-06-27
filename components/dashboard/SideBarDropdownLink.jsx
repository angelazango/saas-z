'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SideBarDropdownLink = ({ items, title, icon: Icon, collapsed, active, onClick }) => {
  return (
    <div className="mb-1">
      <button
        onClick={onClick}
        className={`flex items-center w-full rounded-lg mx-2 p-3 transition-all duration-200
          hover:bg-slate-800/50 hover:text-blue-300
          ${collapsed ? 'justify-center' : 'justify-between'}`}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-slate-400" />
          {!collapsed && <span className="ml-3 capitalize">{title}</span>}
        </div>
        {!collapsed && (
          active ? (
            <ChevronUp className="w-4 h-4 ml-2 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
          )
        )}
      </button>

      {!collapsed && active && (
        <div className="ml-8 mt-1 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm rounded-lg transition-all duration-200
                hover:bg-slate-800/50 hover:text-blue-300 text-slate-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarDropdownLink;