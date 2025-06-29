
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
        <main className="flex-1 bg-slate-100 min-h-screen ml-64">
             <Header />
             {/* <HomeNav /> */}
             { children }
        </main>
      </div>

    </div> 
  )
}








