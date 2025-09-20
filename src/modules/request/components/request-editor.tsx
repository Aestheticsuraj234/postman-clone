"use client";

import { useRequestPlaygroundStore } from "../store/useRequestStore";


export default function RequestEditor() {
  const { tabs, activeTabId, updateTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  if (!activeTab) return null;

  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <select
          value={activeTab.method}
          onChange={(e) =>
            updateTab(activeTab.id, { method: e.target.value })
          }
          className="bg-zinc-800 text-white px-2 py-1 rounded"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          value={activeTab.url}
          onChange={(e) =>
            updateTab(activeTab.id, { url: e.target.value })
          }
          placeholder="Enter request URL"
          className="flex-1 bg-zinc-800 text-white px-3 py-1 rounded"
        />
      </div>

      {activeTab.method !== "GET" && (
        <textarea
          value={activeTab.body}
          onChange={(e) =>
            updateTab(activeTab.id, { body: e.target.value })
          }
          placeholder="Request body (JSON)"
          className="w-full h-40 bg-zinc-800 text-white p-2 rounded"
        />
      )}
    </div>
  );
}
