'use client'
import React from 'react'
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SalesActivityCard({item}) {
  return (
   <Link href={item.href}
    className="rounded-lg border border-slate-200
           hover:border-blue-400 bg-white p-6 cursor-pointer px-6 py-4 flex flex-col items-center gap-3 transition-all duration-300">
            <h4 className={`font-semibold text-3xl ${item.color}`}>{item.number}</h4>
            <small className="text-slate-500">{item.unit}</small>
            <div className="flex items-center space-x-2 text-slate-500">
            <CheckCircle2 className="w-4 h-4" />
            <span className="uppercase text-xs">{item.title}</span>
            </div>
          </Link>
  );
}


