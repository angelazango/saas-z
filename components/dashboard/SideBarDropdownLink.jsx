"use client";
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';



import CollapsibleLink from './CollapsibleLink';
import { BaggageClaim } from 'lucide-react';

export default function SideBarDropdownLink({ title, items, icon:Icon }) {
  
  const [collapsed, setCollapsed] = useState(false);
    

  return (
    <Collapsible>
      <CollapsibleTrigger className="p-2 flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="text-xl 
        font-semibold">{title}</span>
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
