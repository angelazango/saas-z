
'use client';
import { useFetchSalesRealtime } from '@/src/hooks/second/useSales';
import SalesChart from '@/components/dashboard/SalesChart';
import TopSellingProductsChart from '@/components/dashboard/salesProduct';

import SalesKPI from '@/components/dashboard/salesKpi';
import KPI from '@/components/dashboard/Kpi';

// import { useFetchPurchasesRealtime } from '@/src/hooks/second/usePurchases';
import { useFetchPurchasesRealtime } from '@/src/hooks/second/usePurchases';
import PurchasesKPI from '@/components/dashboard/purchaseKpi';
import PurchasesChart from '@/components/dashboard/purchaseChart';
// import TopSellingProductsPieChart from '@/components/dashboard/topItem';

export default function DashboardPage() {
  useFetchSalesRealtime(); // 🔁 activate real-time fetching 
useFetchPurchasesRealtime();
  return (
    <div className="p-6 ml-5 space-y-6">

         <div> 
          <KPI />
        
    </div>
     
      <SalesChart />

      <div className='grid grid-cols-1 gap-4'>
<PurchasesChart />
{/* <TopSellingProductsChart /> */}
      {/* <TopSellingProductsPieChart /> */}
      </div>
      
      {/* Add more components here later */}
    </div>
  );
}
