import React from 'react';
import HomeNav from '../../../../../components/HomeNav';
import Sidebar from '../../../../../components/dashboard/Sidebar';

export default function Layout({children}) {
  return (
    <div className=''>
        <HomeNav/>
        <Sidebar/>
       {children} 
    </div> 
  )
}
s
