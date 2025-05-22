import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import SalesActivityCard from './SalesActivityCard';
import InventorySummaryCard from './InventorySummaryCard';

export default function SalesOverview() {
    const SalesActivity = [
        {
            title:"To Be Packed",
            number:10,
            unit: "Qty",
             href:"#",
              color:"text-blue-600",
        },
        {
            title:"To Be Shipped",
            number:0,
            unit: "Pkgs",
             href:"#",
              color:"text-red-600",
        },
        {
            title:"To Be Delivered",
            number:0,
            unit: "Pkgs",
             href:"#",
              color:"text-green-600",
        },
        {
            title:"To Be Invoiced",
            number:10,
            unit: "PKgs",
             href:"#",
              color:"text-orange-600",
        },
        
    ];
    const inventorySummary = [
        {
            title:"Quantity in hand",
            number : 10,

        },
          {
            title:"Quantity to be recieved",
            number : 0,

        },
    ]
  return (
    <div className="bg-blue-50 border-b
     border-slate-300 p-8 
    grid grid-cols-12 gap-6">
      
      {/* Sales Activity Section */}
      <div className="col-span-8 border-r 
        border-slate-300 p-8">
        <h2 className="mb-6 text-xl text-slate-800 font-semibold">Sales Activity</h2>
        <div className="pr-8  
        grid grid-cols-4 gap-4">
          {/* Card */}
{
    SalesActivity.map((item,i)=>{
        return(
<SalesActivityCard item={item}
key={i} />
        )
    })
}

          
        </div>
      </div>

      {/* Inventory Summary Section */}
      <div className="col-span-4 p-8">
        <h2 className="mb-6 text-xl text-slate-800 font-semibold">Inventory Summary</h2>
        {/* Add inventory summary content here */}
      <div className=''>

{
    inventorySummary.map((item,i)=>{
        return(
        <InventorySummaryCard item={item}
            key={i}/>
        )
    } )
}

      
         </div>
      
      </div>
      
    </div>
  );
}
