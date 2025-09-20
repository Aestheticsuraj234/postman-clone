"use client";

import Modal from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAddRequestToCollection } from "@/modules/request/hooks/request";
import { REST_METHOD } from "@prisma/client";
import { useCollections } from "@/modules/collections/hooks/collections";
import { useWorkspaceStore } from "@/modules/Layout/store";

const SaveRequestToCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  initialName = "Untitled",
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  initialName: string;
}) => {
  const [url, setUrl] = useState("https://echo.hoppscotch.io");
  const [method, setMethod] = useState<REST_METHOD>(REST_METHOD.GET);
  const [name, setName] = useState(initialName);
  const { selectedWorkspace } = useWorkspaceStore();

    const {data:collections , isLoading, isError} = useCollections(selectedWorkspace?.id!);
  const { mutateAsync, isPending } = useAddRequestToCollection(collectionId);

  const requestColorMap: Record<REST_METHOD, string> = {
    [REST_METHOD.GET]: "text-green-500",
    [REST_METHOD.POST]: "text-blue-500",
    [REST_METHOD.PUT]: "text-yellow-500",
    [REST_METHOD.DELETE]: "text-red-500",
    [REST_METHOD.PATCH]: "text-orange-500",

  };

  const handleSubmit = async () => {
    if (!name.trim() || !url.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      await mutateAsync({
        url: url.trim(),
        method,
        name: name.trim(),
      });
      toast.success("Request added to collection successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to add request to collection");
      console.error("Failed to add request to collection:", err);
    }
  };

  return (
    <Modal
      title="Add Request to Collection"
      description="Create a new request in your collection"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Adding..." : "Add Request"}
      submitVariant="default"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Request Name</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter request name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">HTTP Method</label>
          <Select value={method} onValueChange={(value: REST_METHOD) => setMethod(value)}>
            <SelectTrigger className="w-full">
              <SelectValue>
                <span className={`font-medium ${requestColorMap[method]}`}>
                  {method}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.values(REST_METHOD).map((methodOption) => (
                <SelectItem key={methodOption} value={methodOption}>
                  <span className={`font-medium ${requestColorMap[methodOption]}`}>
                    {methodOption}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="https://api.example.com/endpoint"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            required
          />
        </div>

        
      </div>
    </Modal>
  );
};

export default SaveRequestToCollectionModal;