"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useWorkspaceStore } from "@/modules/Layout/store";

import TabbedSidebar from "@/modules/workspace/components/sidebar";

import { useCreateWorkspace, useGetWorkspace } from "@/modules/workspace/hooks/workspace";


const page = () => {

  const {selectedWorkspace} = useWorkspaceStore();
  const {data:currentWorkspace , isLoading , error}  = useGetWorkspace(selectedWorkspace?.id!);
 
  


  return (
    <ResizablePanelGroup direction="horizontal">
  <ResizablePanel maxSize={65}>One</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={35} maxSize={35} minSize={25}className="flex">
    <div className="flex-1">
    <TabbedSidebar currentWorkspace={currentWorkspace}/>
    </div>
  
  </ResizablePanel>
</ResizablePanelGroup>
  )
}

export default page