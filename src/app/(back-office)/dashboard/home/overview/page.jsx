'use client'

import React from 'react';
import DashboardBanner from '../../../../../../components/dashboard/DashboardBanner';
import SalesOverview from '../../../../../../components/dashboard/SalesOverview';

const Dashboard = () => {
  return (
    <div className="text-red-500">
      <DashboardBanner />
      <SalesOverview />
    </div>
  );
};

export default Dashboard;
