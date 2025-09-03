import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabPillsProps {
  tabs: TabItem[];
  defaultValue?: string;
}

export function TabPills({ tabs, defaultValue }: TabPillsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className="w-full">
      <div className="mb-6 px-1">
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}