"use client";

import React from 'react';
import OptionCard from '../../../../../components/dashboard/OptionCard';
import FixedHeader from '../../../../../components/dashboard/FixedHeader';
import { ScrollText, Shirt, Boxes, Component } from 'lucide-react';
import Link from 'next/link';



export default function Inventory() {
// const { title,description,link,linkTitle,enabled } = optionData;
  const optionCards = [
   
    {
      title: "Items",
      description: "Create what you like",
      link: "/dashboard/inventory/items/new",
      linkTitle:"New Item",
      enabled: true,
      icon: Shirt,
    },
    {
      title: "Categories",
      description: "Create what you like",
      link: "/dashboard/inventory/categories/new",
      linkTitle: "New Categories",
      enabled:true,
      icon: Boxes,
    },
    {
      title: "Sale",
      description: "Create what you like",
      link: "/dashboard/inventory/sales/new",
      linkTitle: "New Price List",
      enabled: true,
      icon: ScrollText,
    },
    {
      title: "Purchase",
      description: "Create what you like",
      link: "/dashboard/inventory/reports/new",
      linkTitle: "New warehouse",
      enabled: true,
      icon: ScrollText,
    },
    {
      title: "Catalogue",
      description: "Create what you like",
      link: "/dashboard/inventory/catalogue",
      linkTitle:"New units",
      enabled: true,
      icon: Component,
    }, 
  ];

  return (
    <div>
      <FixedHeader newLink="/dashboard/inventory/items/new" />

      <div className="grid grid-col-1 lg:grid-cols-2
       py-8 px-16 m-4 gap-6">
        {optionCards.map((card, i) => (
          <OptionCard optionData={card} key={i} />
        ))}

        {/* Second Section */}
        <div className="shadow-md bg-white rounded flex flex-col
         items-center gap-4 p-6 justify-center">
          <h2 className="text-xl font-bold">Items Group</h2>
          <Shirt strokeWidth="0.5px" className="w-36 h-36" />
          <p className="line-clamp-1 text-center">
            Create item groups to organize your inventory efficiently.
          </p>
          <Link
            href="/dashboard/inventory/item-groups/new"
            className="p-1 rounded-sm bg-blue-600 px-3
             items-center space-x-2 text-white inline-flex"
          >
            New Item Group
          </Link>
          <button className="p-1 rounded-sm bg-blue-600 px-3
           items-center space-x-2 text-white">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}
