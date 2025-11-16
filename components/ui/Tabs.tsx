"use client";

import React, { useState, useRef, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export default function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id || ""
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  useEffect(() => {
    if (defaultTabId && tabs.some((tab) => tab.id === defaultTabId)) {
      setActiveTabId(defaultTabId);
    }
  }, [defaultTabId, tabs]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      const nextTab = tabs[nextIndex];
      setActiveTabId(nextTab.id);
      tabRefs.current[nextTab.id]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      const prevTab = tabs[prevIndex];
      setActiveTabId(prevTab.id);
      tabRefs.current[prevTab.id]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstTab = tabs[0];
      setActiveTabId(firstTab.id);
      tabRefs.current[firstTab.id]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastTab = tabs[tabs.length - 1];
      setActiveTabId(lastTab.id);
      tabRefs.current[lastTab.id]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
            className={`
              px-4 py-2 font-medium text-sm transition-colors duration-200
              whitespace-nowrap
              cursor-pointer
              focus:outline-none focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              ${
                activeTabId === tab.id
                  ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        className="mt-4"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}

