
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import CollapsibleLink from './CollapsibleLink';

import {
  ShoppingCart,
  Home,
  BaggageClaim,
  ShoppingBag,
  ShoppingBasket,
  Cable,
  BarChart,
  Files,
  ChevronLeft,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

import SubscribtionCard from '../SubscribtionCard';
import SideBarDropdownLink from './SideBarDropdownLink';

const  Sidebar = () => {
  const inventoryLinks = [
    {
      title: "Items",
      href: "/dashboard/inventory", 
       
    },
    {
      title: "Items Groups",
      href: "/dashboard/inventory", 
       
    },
    {
      title: "Items Adjustments",
      href: "#", 
       
    },
      
  ]

  const salesLinks = [
    {
      title: "customers",
      href: "#", 
       
    },
    {
      title: "Sales Orders",
      href: "#", 
       
    },
    {
      title: "packages",
      href: "#", 
       
    },
    {
      title: "packages",
      href: "#", 
       
    },
    {
      title: "shipments",
      href: "#", 
       
    },
    {
      title: "Invoices",
      href: "#", 
       
    },
    {
      title: "reciets and payments",
      href: "#", 
       
    },
    {
      title: "payment recieved",
      href: "#", 
       
    },
    {
      title: "slaes returns",
      href: "#", 
       
    },
      
  ]


  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`min-h-screen  bg-slate-900 text-slate-50 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Top section - Logo and Navigation */}
      <div className="flex flex-col">
        {/* Logo */}
        <Link
          href="#"
          className="bg-slate-950 flex items-center space-x-2 py-4 px-4"
        >
          <BaggageClaim className="w-5 h-5" />
          {!collapsed && (
            <span className="text-xl font-semibold">Inventory</span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 py-6 px-3">
          {/* Home link */}
          <Link
            href="#"
            className="flex items-center space-x-2 
            bg-blue-600 text-white py-2 px-3 rounded-md"
          >
            <Home className="w-4 h-4" />
            {!collapsed && <span>Home</span>}
          </Link>


  <SideBarDropdownLink 
 items={inventoryLinks} 
 title="Inventory"
  icon={BaggageClaim} />
 
 <SideBarDropdownLink 
 items={salesLinks} 
 title="sales"
  icon={ShoppingBasket} />
  


 
  

  

  

  
  

  
 

{/* Other buttons/links */}
         

  <button className="flex items-center space-x-2 py-2 
  px-3 hover:bg-slate-700 rounded-md">
     <ShoppingBasket className="w-4 h-4" />
            {!collapsed && <span>Sales</span>}
          </button>

          <button className="flex items-center
           space-x-2 py-2 px-3 hover:bg-slate-700 rounded-md">
            <ShoppingBag className="w-4 h-4" />
            {!collapsed && <span>Purchases</span>}
          </button>

          <Link
            href="#"
            className="flex items-center
             space-x-2 py-2 px-3 hover:bg-slate-700 rounded-md"
          >
            <Cable className="w-4 h-4" />
            {!collapsed && <span>Integrations</span>}
          </Link>

          <Link
            href="#"
            className="flex items-center
             space-x-2 py-2 px-3 hover:bg-slate-700 rounded-md"
          >
            <BarChart className="w-4 h-4" />
            {!collapsed && <span>Reports</span>}
          </Link>

          <Link
            href="#"
            className="flex items-center 
            space-x-2 py-2 px-3 hover:bg-slate-700 rounded-md"
          >
            <Files className="w-4 h-4" />
            {!collapsed && <span>Documents</span>}
          </Link>

          <Link
            href="#"
            className="flex items-center space-x-2
             py-2 px-3 hover:bg-slate-700 rounded-md"
          >
            <Files className="w-4 h-4" />
            {!collapsed && <span>Catalogue</span>}
          </Link>

          <Link
            href="#"
            className="flex items-center space-x-2 py-2 px-3 hover:bg-slate-700 rounded-md"
          >
            <Files className="w-4 h-4" />
            {!collapsed && <span>Vendors</span>}
          </Link>
        </nav>

        {/* Optional: Subscription card 
        (hidden when collapsed) */}
        {!collapsed && <SubscribtionCard />}
      </div>

      {/* Bottom - Collapse button */}
      <div className="px-4 py-4 mt-auto">
        <button
          onClick={toggleCollapse}
          className="flex items-center space-x-2 
          bg-slate-800 
           px-3 py-2 justify-center rounded-md w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5"/>
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
