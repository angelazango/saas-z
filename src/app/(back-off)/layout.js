
"use client"
import React from 'react';


import Sidebars from '@/components/dashboards/Sidebars';
import Header from '@/components/dashboards/headers';
// import HomeNav from '@/components/User/HomeNavi';

export default function Layout({children}) {
  return (
    <div className=''>


<div className="flex">
       <Sidebars />
        <main className="w-full 
         bg-slate-100
         min-h-screen">
             <Header />
             {/* <HomeNav /> */}
             { children }
        </main>
      </div>
 
       {children} 
    </div> 
  )
}








