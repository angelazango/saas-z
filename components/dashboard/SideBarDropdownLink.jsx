"use client";
import React from 'react';

import { useState } from 'react';

import { Collapsible,
  CollapsibleContent,CollapsibleTrigger
 } from "@/components/ui/collapsible";


// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Collapsible } from "../ui/collapsible"; 
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";

// import { Collapsible,
//    CollapsibleContent,
//     CollapsibleTrigger } from "@/components/ui/collapsible";

// import { Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger
//  } from "@/components/ui/collapsible.jsx";



import { BaggageClaim, ChevronDown, ChevronRight } from 'lucide-react';
import CollapsibleLink from './CollapsibleLink';

export default function SideBarDropdownLink({ title, items, icon:Icon }) {
  
  const [collapsed, setCollapsed] = useState(false);
    

  return (
    <Collapsible>
      <CollapsibleTrigger className="
      flex justify-between w-full   items-center">
        <div className="p-2 flex items-center space-x-2">
        <Icon className="w-5 h-5"/>
        <span className="text-xl 
        font-semibold">{title}</span>
        </div>
        <ChevronRight className='w-4 4' />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items.map((item, i) => (
          <CollapsibleLink
            key={i}
            href={item.href}
            title={item.title}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
