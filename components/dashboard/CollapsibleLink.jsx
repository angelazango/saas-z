import React from 'react'
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function  ({href ,
    title
}) {
  return (
     <Link 
className="flex items-center 
  justify-between pl-8  pr-4 hover:bg-slate-800 
  transition-all duration-300 py-2 rounded-md " 
  href= {href}>
  <span className='text-sm'>{title}</span>
    <PlusCircle 
   className='w-4 h-4'/>
  </Link>

  )
}
