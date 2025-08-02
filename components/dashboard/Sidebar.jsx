'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SideBarDropdownLink from './SideBarDropdownLink';
import {
  ShoppingCart,
  Home,
  BaggageClaim,
  ShoppingBag,
  ShoppingBasket,
  Files,
  LogOut,
   Loader2,
  Boxes,
  ChevronLeft,
  ChevronRight,
  LineChart,
  BarChart3,
} from 'lucide-react';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false); // for showing the logout modal
const [isLoggingOut, setIsLoggingOut] = useState(false); // for showing loading while logging out

  const router = useRouter();

  const inventoryLinks = [
    { title: 'Products', href: '/dashboard/inventory/items' },
    { title: 'Categories', href: '/dashboard/inventory/categories' },
    { title: 'Vendors', href: '/dashboard/inventory/brands' },
    { title: 'Units', href: '/dashboard/inventory/units/new' },
    { title: 'Warehouse', href: '/dashboard/inventory/warehouse/new' },
    { title: 'Catalogue', href: '/dashboard/inventory/catalogue' },
  ];

  const salesLinks = [
    { title: 'Customers', href: '/dashboard/sales/customers/new' },
    { title: 'Sales', href: '/dashboard/sales' },
    { title: 'Receipts & Payments', href: '#' },
    { title: 'Payment Received', href: '#' },
    { title: 'Sales Returns', href: '#' },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) setActiveMenu('');
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? '' : menu);
  };

  const handleLogout = () => {
  setIsLoggingOut(true); // show spinner
  setTimeout(() => {
    // clear stored user data
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');

    // redirect to login page
    router.push('/signup'); // update path if different
  }, 1500); // optional delay to show loading state
};

  return (
    <div
      className={`fixed h-screen top-0 left-0 z-50
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-700 
        text-slate-50 transition-all duration-300 ease-in-out
        ${collapsed ? 'w-48' : 'w-65 shadow-xl'}`}
    >
      {/* Animated background gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br 
        from-blue-900/10 via-transparent to-purple-900/10 animate-pulse"
      />

      {/* Collapse button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 z-50 w-6 h-6 rounded-full
        bg-gradient-to-br from-blue-600 to-purple-600 shadow-md
        flex items-center justify-center text-white hover:scale-110
        transition-all duration-200 transform"
      >
        {collapsed ? <ChevronRight className="w-4 h-4"/> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Sidebar content */}
      <div className="flex flex-col h-full relative z-10">
        {/* Logo section */}
        <Link
          href="#"
          className={`flex items-center py-5 px-4 border-b border-slate-700/50 
          transition-all duration-300 group ${collapsed ? 'justify-center' : 'justify-start'}`}
        >
          <div className="relative">
            <BaggageClaim className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm group-hover:bg-blue-300/30 transition-all duration-300" />
          </div>
          {!collapsed && (
            <span
              className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-300 
              to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-200 
              group-hover:to-cyan-200 transition-all duration-300"
            >
              Inventory 
            </span>
          )}
        </Link>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {/* Home */}
          <Link
            href="#"
            className={`flex items-center rounded-lg mx-2 p-3 transition-all duration-200
              bg-gradient-to-r from-blue-600 to-blue-500 text-white
              hover:from-blue-500 hover:to-blue-400 hover:shadow-lg
              ${collapsed ? 'justify-center' : 'justify-between'}`}
          >
            <div className="flex items-center">
              <Home className="w-5 h-5" />
              {!collapsed && <span className="ml-3 font-medium">Home</span>}
            </div>
            {!collapsed && <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />}
          </Link>

          {/* Inventory dropdown */}
          <SideBarDropdownLink
            items={inventoryLinks}
            title="Inventory"
            icon={BaggageClaim}
            collapsed={collapsed}
            active={activeMenu === 'inventory'}
            onClick={() => toggleMenu('inventory')}
          />

          {/* Sales dropdown */}
          <SideBarDropdownLink
            items={salesLinks}
            title="Sales"
            icon={ShoppingBasket}
            collapsed={collapsed}
            active={activeMenu === 'sales'}
            onClick={() => toggleMenu('sales')}
          />

          {/* Other links */}
          <div className="mt-2 space-y-1">
            {[
              { title: 'Catalog', href: '/dashboard/cata', icon: Boxes },
              { title: 'Purchase', href: '/dashboard/reports', icon: ShoppingBag },
              { title: 'Sale', href: '/dashboard/sales', icon: Files },
              { title: 'Inventory Dashboard', href: '/dashboard/analysis', icon: LineChart },
              { title: 'Block Overview', href: '/dashboards/Analytics', icon: BarChart3 },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center rounded-lg mx-2 p-3 transition-all duration-200
                  hover:bg-slate-800/50 hover:text-blue-300
                  ${collapsed ? 'justify-center' : 'pl-4'}`}
              >
                <item.icon className="w-5 h-5 text-slate-400" />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout button */}
       <div className="px-4 py-4 border-t border-slate-700/50">
  <button
    onClick={() => setShowModal(true)}
    className={`flex items-center rounded-lg p-3 transition-all duration-200
      hover:bg-slate-800/50 hover:text-red-400
      ${collapsed ? 'justify-center' : 'pl-4'}`}
    type="button"
  >
    <LogOut className="w-5 h-5 text-slate-400" />
    {!collapsed && <span className="ml-3 cursor-pointer">Logout</span>}
  </button>
</div>

      </div>
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Are you sure you want to logout?</h2>

      {isLoggingOut ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Logging out...</span>
        </div>
      ) : (
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Sidebar;
