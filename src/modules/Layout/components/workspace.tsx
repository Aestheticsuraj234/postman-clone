"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Loader, Plus, User } from "lucide-react";
import React, { useEffect, useState } from "react";

import CreateWorkspace from "./create-workspace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useWorkspaces } from "@/modules/workspace/hooks/workspace";
import { useWorkspaceStore } from "../store";


const WorkSpace = () => {
  const { data: workspaces, isLoading } = useWorkspaces();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();


  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

 
  if (isLoading) {
    return <Loader className="animate-spin size-4 text-indigo-400" />;
  }

  if (!workspaces || workspaces.length === 0) {
    return <div>No workspace found</div>;
  }

  return (
    <>
      <Hint label="Change Workspace">
        <Select
          value={selectedWorkspace?.id}
          onValueChange={(id) => {
            const ws = workspaces.find((w) => w.id === id);
            if (ws) setSelectedWorkspace(ws);
          }}
        >
          <SelectTrigger className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1">
            <User className="size-4 text-indigo-400" />
            <span className="text-sm text-indigo-400 font-semibold">
              <SelectValue placeholder="Select workspace" />
            </span>
          </SelectTrigger>
          <SelectContent>
            {workspaces.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
            <Separator className="my-1" />
            <div className="p-2 flex flex-row justify-between items-center">
              <span className="text-sm font-semibold text-zinc-600">My Workspaces</span>
              <Button size="icon" variant="outline" onClick={() => setIsModalOpen(true)}>
                <Plus size={16} className="text-indigo-400" />
              </Button>
            </div>
          </SelectContent>
        </Select>
      </Hint>

      <CreateWorkspace isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default WorkSpace;
