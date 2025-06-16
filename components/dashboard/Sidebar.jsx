'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SubscribtionCard from '../SubscribtionCard';
import SideBarDropdownLink from './SideBarDropdownLink';
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
import SubscriptionCard from '../SubscribtionCard';

const Sidebar = () => {
  const inventoryLinks = [
    {
      title: "Items",
      href: "/dashboard/inventory/items", 
    },
    {
      title: "categories",
      href: "/dashboard/inventory/categories", 
    },
    {
      title: "vendors",
      href: "/dashboard/inventory/brands", 
    },
    {
      title: "units",
      href: "/dashboard/inventory/units/new", 
    },
    {
      title: "warehouse",
      href: "/dashboard/inventory/warehouse/new", 
    },
    {
      title: "Catalogue",
      href: "/dashboard/inventory/catalogue", 
    },
  ];

  const salesLinks = [
    {
      title: "customers",
      href: "/dashboard/sales/customers/new", 
    },
    {
      title: "Sales",
      href: "/dashboard/sales", 
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
      title: "sales returns",
      href: "#", 
    },


    
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`overflow-y-auto  bg-gradient-to-b from-slate-950
         via-slate-900 to-slate-700 
        text-slate-50 
        transition-all duration-500  relative overflow-hidden ${
        collapsed ? 'w-20' : 'w-94'
      }`}
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10
       via-transparent to-purple-900/10 animate-pulse"></div>
      
      {/* Subtle animated border */}
      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b 
      from-blue-500/50 via-purple-500/50 to-cyan-500/50 animate-pulse"></div>

      {/* Top section - Logo and Navigation */}
      <div className="flex flex-col relative z-10">
        {/* Logo */}
        <Link
          href="#"
          className="bg-gradient-to-r from-slate-950 to-slate-900 
          flex items-center space-x-2 py-6 px-4 border-b border-slate-700/50 
          hover:from-blue-950 hover:to-slate-900 transition-all duration-300 group"
        >
          <div className="relative">
            <BaggageClaim className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm group-hover:bg-blue-300/30 transition-all duration-300"></div>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-300 
            to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-200 
            group-hover:to-cyan-200 transition-all duration-300">
              SAASZ
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 py-6 px-3">
          {/* Home link - Active state */}
          <Link
            href="#"
            className="flex items-center space-x-3 bg-gradient-to-r
             from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 
             hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 
             transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            {!collapsed && <span className="font-medium">Home</span>}
            {!collapsed && <div className="ml-auto w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>}
          </Link>

          {/* Dropdown Links with enhanced styling */}
          <div className="space-y-1">
            <SideBarDropdownLink 
              items={inventoryLinks} 
              title="Inventory"
              icon={BaggageClaim} 
            />
            
            <SideBarDropdownLink 
              items={salesLinks} 
              title="sales"
              icon={ShoppingBasket} 
            />
          </div>

          {/* Enhanced Navigation Items */}
          <div className="space-y-1 mt-2">
            <Link

            href="/dashboard/purchases"
             className="flex items-center space-x-3 py-3 px-4
             hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 w-full text-left group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1">
              <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-emerald-400
               transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-emerald-300
               transition-colors duration-300">Purchases</span>}
            </Link>

           

            <Link
              href="/dashboard/reports"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <BarChart className="w-5 h-5 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-yellow-300 transition-colors duration-300">Reports</span>}
            </Link>

           

            <Link
              href="#"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Files className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-cyan-300 transition-colors
               duration-300">Catalogue</span>}
            </Link>

            <Link
              href="#"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Files className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-pink-300 transition-colors duration-300">Vendors</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom - Enhanced Collapse button */}
      <div className="px-4 py-6 mt-auto relative z-10">
        <button
          onClick={toggleCollapse}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 px-4 py-3 rounded-xl w-full border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Floating gradient orbs for ambient effect */}
      <div className="absolute top-1/4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 -right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default Sidebar;