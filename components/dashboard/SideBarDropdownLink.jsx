'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SideBarDropdownLink = ({ 
  items = [], 
  title = '', 
  icon: Icon, 
  collapsed = false, 
  active = false, 
  onClick 
}) => {
  // Validate items array
  if (!Array.isArray(items)) {
    console.error('SideBarDropdownLink: items must be an array');
    return null;
  }

  return (
    <div className="mb-1">
      {/* Toggle Button */}
      <button
        onClick={onClick}
        aria-expanded={active}
        aria-controls={`${title.toLowerCase()}-dropdown`}
        className={`flex items-center w-full rounded-lg mx-2 p-3 transition-all duration-200
          hover:bg-slate-800/50 hover:text-blue-300
          ${collapsed ? 'justify-center' : 'justify-between'}
          ${active ? 'bg-slate-800/30' : ''}`}
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-5 h-5 text-slate-400" />}
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

      {/* Dropdown Items */}
      {!collapsed && active && (
        <div 
          id={`${title.toLowerCase()}-dropdown`}
          className="ml-8 mt-1 space-y-1"
        >
          {items.map((item, index) => {
            if (!item.href || !item.title) {
              console.warn('SideBarDropdownLink: item missing href or title', item);
              return null;
            }
            
            return (
              <Link
                key={`${item.href}-${index}`} // ✅ ensures unique key
                href={item.href}
                className="block px-3 py-2 text-sm rounded-lg transition-all duration-200
                  hover:bg-slate-800/50 hover:text-blue-300 text-slate-300"
                prefetch={false}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideBarDropdownLink;
