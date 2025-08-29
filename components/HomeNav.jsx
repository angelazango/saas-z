'use client';
import React from 'react';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeNav() {
  const pathname = usePathname();
  const navLinks = [
    { title: 'Dashboard', href: '/dashboard/home/overview'},
    { title: 'Getting Started', href: '/dashboard/home/getting-started'},
    { title: 'Recent Updates', href: '/dashboard/home/updates'},
    { title: 'Announcements', href: '/dashboard/home/announcements'},
  ];
  return (
    <div className="h-32 p-5 bg-slate-50 border-b border-slate-300   ">
      <div className="flex space-x-3">
        <div className="flex">
          <div className="flex w-14 h-14 rounded-lg bg-white items-center justify-center">
            <Building2 />
          </div>
          <div className="flex flex-col ml-3">
            <p className="font-semibold text-slate-700">
              Admin, Angela C.
            </p>
            <span className="text-orange">SAAS-Z</span>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-0 transition-all duration-300 mt-6 flex 
      space-x-4 border-b border-slate-200">
        {navLinks.map((item, i) => (
          <Link
            prefetch={true}
            key={i}
            href={item.href}
            className={`${
              pathname === item.href
                ? 'py-1 border-b-2 border-blue-500 text-blue-500'
                : 'py-1 text-slate-700'
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
