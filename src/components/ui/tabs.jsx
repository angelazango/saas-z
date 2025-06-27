// components/ui/tabs.jsx
'use client';

import * as React from 'react';

const TabsContext = React.createContext();

function Tabs({ children, defaultValue, value, onValueChange }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className="flex flex-col w-full">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className = '' }) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function TabsTrigger({ value, children, className = '' }) {
  const { value: currentValue, onValueChange } = React.useContext(TabsContext);
  
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        currentValue === value
          ? 'border-b-2 border-blue-500 text-blue-600'
          : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }) {
  const { value: currentValue } = React.useContext(TabsContext);
  
  return currentValue === value ? <div className="pt-4">{children}</div> : null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };