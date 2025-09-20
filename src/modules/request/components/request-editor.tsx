"use client";

import { useRequestPlaygroundStore } from "../store/useRequestStore";
import RequestBar from "./request-bar";


export default function RequestEditor() {
  const { tabs, activeTabId, updateTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  if (!activeTab) return null;

  return (
   <div className="flex flex-col items-center justify-start py-4 px-4">
      {/* Request Bar */}
      <RequestBar tab={activeTab} updateTab={updateTab} />
   </div>
  );
}
