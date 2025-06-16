"use client"
import { CreditCard } from 'lucide-react'
import React from 'react'

export default function DashboardBanner() {
  return (
    <div className="grid grid-cols-12 items-center py-6 px-16 bg-white gap-4">
      
      <div className="col-span-2 flex justify-center">
        <CreditCard className="w-16 h-16 text-slate-500" />
      </div>

      <div className="col-span-7">
        <h2 className="font-bold text-2xl mb-1">Start accepting online payments</h2>
        <p className="text-slate-600">
          Businesses are moving towards online 
          payments as they are easy <br />, secure, and fast. Try
          them for your business today.
        </p>
      </div>

      <div className="col-span-3 flex justify-center">
        <button className="py-2.5 px-8 uppercase bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300">
          Enable
          <span className="ml-2">&rarr;</span>
        </button>
      </div>

    </div>
  );
}
