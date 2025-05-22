import React from 'react'

export default function InventorySummaryCard({item,i}) {
  return (
    <div  key={i} className='mb-4 shadow justify-between 
        rounded-lg border border-slate-200 
        hover:border-blue-400 bg-white py-2 px-4
        px-3 cursor-pointer flex flex-col  items-center 
        gap-3 transition-all duration-300'>
   <div className="flex gap-3"> <h2 className='text-slate-500 
            uppercase text-xl'>{item.title}</h2>
               <h4 className="font-semibold
                text-xl text-slate-500">{item.number}</h4></div>
        </div> 
  ); 
}
   


