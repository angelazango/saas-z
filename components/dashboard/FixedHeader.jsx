import React from 'react';
import { LayoutGrid, LayoutPanelLeftIcon, MoreHorizontal, Plus } from 'lucide-react';
import { List } from 'lucide-react';
import Link from 'next/link';

export default function FixedHeader({newLink}) {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r 
    from-slate-50 to-white shadow-lg border-b border-slate-200 py-6 px-6 backdrop-blur-sm">

      <button className='text-3xl font-bold text-slate-800 
      hover:text-slate-600 transition-colors duration-200'>
        All items
      </button>
      
      <div className="flex items-center">

        {/* new */}
        <div className="pr-4 mr-4 border-r border-slate-300">
          <Link href={newLink} className='px-4 py-2 rounded-lg
           flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 
           text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 
           shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
            <Plus className="w-4 h-4"/>
            <span className="font-medium">New</span>
          </Link>
        </div>

        {/* Layout */}
        <div className="flex items-center space-x-3">
          
          {/* List Button */}
          <button className="bg-slate-200 hover:bg-slate-300 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <List className="w-4 h-4 text-slate-700" />
          </button>

          {/* Layout Grid Button */}
          <button className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <LayoutGrid className="w-4 h-4 text-white" />
          </button>

          {/* More Button */}
          <button className="bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-800 hover:to-orange-900 text-white rounded-lg p-3 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
        </div>
      </div>
    </div>
  )
};