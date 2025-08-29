"use client";

import SalesKpiCards from '@/components/dashboards/salesCard';
import SalesTrendChart from '@/components/dashboards/salesTrendChart';
import MergedKpiCards from '@/components/dashboards/mergedKpi';
// import SessionKpiCards from '@/components/dashboards/sessionKpi';

import TopPurchasedMaterialsTable from '@/components/dashboards/topPurchasedTable';

import ProductionSessionKpiCards from '@/components/dashboards/productionSessionCards';
import ProductionSessionTrendChart from '@/components/dashboards/productionSessionTrendCard';

import TeamKpiCards from '@/components/dashboards/teamKpiCards';
import TeamContributionPieChart from '@/components/dashboards/teamContributionPieChart';

import PurchaseKpiCards from '@/components/dashboards/purchaseKpiCards';
import PurchaseTrendChart from '@/components/dashboards/purchaseTrendChart';
import TopSellingProducts from '@/components/dashboards/topSellingProducts';

import SessionKpiCards from '@/components/dashboards/sessionKpi';
import SessionProductionChart from '@/components/dashboards/sessionProductionChart';

import { useFetchSales } from '@/src/hooks/useFetchSales';
import { useFetchPurchases } from '@/src/hooks/useFetchPurchases';
import { useFetchSessionProduction } from '@/src/hooks/useFetchSessionProduction';
import { useFetchTeams } from '@/src/hooks/useFetchTeams';

export default function SalesDashboard() {
  useFetchSales();
  useFetchPurchases();
  useFetchSessionProduction();
  useFetchTeams();

  return (
    <div className="p-6 ml-13 bg-gray-100 min-h-screen space-y-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 animate-bounce">Admin Dashboard</h1>
        <p className="text-gray-500  font-bold -mt-2">
          Overview of Brick Production Operations
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        
    
       

<MergedKpiCards />

      </div>

      {/* Session KPIs */}
      {/* <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Session Production Overview</h2>
        
      </div> */}

      {/* Charts */}



      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  mt-9">
          <SessionProductionChart />
         
       
      </div>

<div className="grid grid-cols-2 lg:flex-row md:grid-cols-2  w-full">
 {/* <PurchaseTrendChart /> */}
  <div className="w-full grid grid-cols-2  md:grid-cols-2  lg:w-1/2">
    

  </div>
</div>



      {/* <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6'>
 <ProductionSessionTrendChart />
        <PurchaseTrendChart />
      </div> */}

      
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
       
   <TeamContributionPieChart />
          </div>
      {/* Session-Specific Charts */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
  <TopSellingProducts />
     <SalesTrendChart />
        
          

      </div>
    </div>
  );
}
