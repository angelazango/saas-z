"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import SideBarDropdownLink from '../dashboard/SideBarDropdownLink';
import CollapsibleLink from '../dashboard/CollapsibleLink';

// import SideBarDropdownLink from './SideBarDropdownLink';
// import CollapsibleLink from './CollapsibleLink';

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
  Leaf,
  Users,
  LogOut,
  Package,
  CalendarClock,
  Layout,
  Layers2,
  User,
  BlocksIcon,
  GroupIcon,
  ClockAlert,
  payment,
  ChevronRight,
  PlusCircle,

} from 'lucide-react';
import SubscriptionCard from '../SubscribtionCard';

const Sidebars = () => {
  const inventoryLinks=[

  ]
  

  const salesLinks = [
   
    {
      title: "Sales",
      href: "/dashboards/sales", 
    },

   
    
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`fixed h-screen top-0 left-0 z-50
        bg-gradient-to-b from-slate-950 overflow-y-auto via-slate-900 to-slate-700 
        text-slate-50 transition-all duration-300 ${
        collapsed ? 'w-30' : 'w-69'
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
            <BaggageClaim className="w-6 h-6 text-blue-400 group-hover:text-blue-300 
            transition-colors duration-300" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm group-hover:bg-blue-300/30
             transition-all duration-300"></div>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-300 
            to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-200 
            group-hover:to-cyan-200 transition-all duration-300">
              Contruction Module
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 py-6 px-3">
          {/* Home link - Active state */}
          <Link
            href="/dashboards/Analytics"
            className="flex items-center space-x-3 bg-gradient-to-r
             from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 
             hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 
             transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            {!collapsed && <span className="font-medium">Dashboard</span>}
            {!collapsed && <div className="ml-auto w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>}
          </Link>

          {/* Dropdown Links with enhanced styling */}
          {/* <div className="space-y-1">
            <SideBarDropdownLink 
              items={inventoryLinks} 
              title="Inventory"
              icon={BaggageClaim} 
            /> */}
            
            {/* <SideBarDropdownLink 
              items={salesLinks} 
              title="sales"
              icon={ShoppingBasket} 
            />
          </div> */}

          {/* Enhanced Navigation Items */}
          <div className="space-y-1 mt-2">
             <Link
              href="/dashboards/material"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Leaf className="w-5 h-5 text-slate-400 group-hover:text-pink-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-pink-300 transition-colors
               duration-300">materials</span>}
            </Link>

            <Link

            href="/dashboards/purchases"
             className="flex items-center space-x-3 py-3 px-4
             hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 w-full text-left group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1">
              <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-emerald-400
               transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-emerald-300
               transition-colors duration-300">Purchases</span>}
            </Link>

           

            <Link
              href="/dashboards/sales"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r
               hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <ShoppingBasket className="w-5 h-5 text-slate-400 group-hover:text-yellow-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-yellow-300 
              transition-colors duration-300">Sales</span>}
            </Link>

           

            <Link
              href="/dashboards/products"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all 
              duration-300 group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Files className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-cyan-300 transition-colors
               duration-300">Products</span>}
            </Link>

            <Link
              href="/dashboards/teams"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <GroupIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-700 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-green-600 transition-colors
               duration-300">Teams</span>}
            </Link>

             <Link
              href="/dashboards/sessions"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <CalendarClock className="w-5 h-5 text-slate-400 group-hover:text-yellow-600 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-blue-300 transition-colors
               duration-300">sessions period</span>}
            </Link>
             <Link
              href="/dashboards/sessionMaterials"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Package className="w-5 h-5 text-slate-400 group-hover:text-purple-600 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-green-300 transition-colors
               duration-300">Session Materials</span>}
            </Link>


              <Link
              href="/dashboards/sessionMaterials"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Layers2 className="w-5 h-5 text-slate-400 group-hover:text-pink-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-pink-300 transition-colors
               duration-300">Session Materials</span>}
            </Link>

            <Link
              href="/dashboards/sessionProduct"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <Layout className="w-5 h-5 text-slate-400 group-hover:text-blue-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-yellow-300 transition-colors
               duration-300">Session Products</span>}
            </Link>

             <Link
              href="#"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gradient-to-r 
              hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300
               group hover:shadow-lg hover:shadow-slate-700/20 transform hover:translate-x-1"
            >
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-400 
              transition-colors duration-300" />
              {!collapsed && <span className="group-hover:text-green-300 transition-colors
               duration-300">LogOut</span>}
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

export default Sidebars;