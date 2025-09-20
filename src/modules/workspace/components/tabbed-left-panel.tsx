"use client";

import { Hint } from "@/components/ui/hint";
import { Globe, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabbedLeftPanel = () => {
    const pathname = usePathname();
    const activeTab = pathname.split("/")[1] || "rest"; // default to "rest" on home

    const sidebarItems = [
        { icon: LinkIcon, label: "rest", link: "/" },
        { icon: Globe, label: "realtime", link: "/realtime" },
    ];

    return (
        <div className="flex h-screen bg-zinc-950">
            {/* Sidebar */}
            <div className="w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
                {sidebarItems.map((item, index) => (
                    <Hint label={item.label} key={index} side="right">
                        <Link
                            href={item.link}
                            key={index}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${activeTab === item.label
                                    ? "bg-indigo-600 text-white"
                                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                        </Link>
                    </Hint>
                ))}
            </div>
        </div>
    );
};

export default TabbedLeftPanel;
