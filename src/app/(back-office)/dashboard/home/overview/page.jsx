import React from 'react'
import DashboardBanner from '../../../../../../components/dashboard/DashboardBanner';
import SalesOverview from '../../../../../../components/dashboard/SalesOverview';


const dashboard
  = () => {
  return (
    <div className="text-red-500 ">
      <DashboardBanner/>
      <SalesOverview/>
         
    </div>
  )
}

export default dashboard;
 