import React from 'react';
import { LayoutGrid, LayoutPanelLeftIcon, MoreHorizontal, Plus } from 'lucide-react';
import { List } from 'lucide-react';
import Link from 'next/link';

export default function FixedHeader({newLink}) {
  return (
    <div className="flex justify-between 
    items-center bg-white py-5 px-4">

   
   <button className='text-2xl '>All items</button>
   <div className="flex">

{/* new */}
<div className="pr-2 border-r border-gray-300">

  <Link href={newLink} className='p-1 rounded-md px-3 
  flex items-center  
  space-x-2 bg-blue-600 text-white mt-4'>
  <Plus className="w-4 h-4 "/>
  <span>New</span>
  </Link>
</div>

   {/* Layout */}

  <div className="flex items-center space-x-2 mt-4">
  {/* List Button */}
  <button className="bg-gray-300 p-2 rounded-md">
    <List className="w-4 h-4" />
  </button>

  {/* Layout Grid Button */}
  <button className="bg-purple-300 p-2 rounded-md">
    <LayoutGrid className="w-4 h-4" />
  </button>

  {/* More Button */}
  <button className="bg-orange-800 text-white rounded-md p-2 border-r border-gray-400">
    <MoreHorizontal className="w-4 h-4" />
  </button>
</div>

   
   </div>
 </div>

  )
};
