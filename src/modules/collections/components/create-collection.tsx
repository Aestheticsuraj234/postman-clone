"use client";

import Modal from "@/components/ui/modal";
import { useCreateCollection } from "@/modules/collections/hooks/collections";

import React, { useState } from "react";
import { toast } from "sonner";


const CreateCollection = ({
    workspaceId,
  isModalOpen,
  setIsModalOpen,
}: {
    workspaceId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const { mutateAsync, isPending } = useCreateCollection(workspaceId, name);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name); 
      toast.success("Collection created successfully");
      setName("");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to create Collection");
      console.error("Failed to create Collection:", err);
    }
  };

  return (
    <Modal
      title="Add New Collection"
      description="Create a new Collection to organize your requests"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Creating..." : "Create Collection"}
      submitVariant="default"
    >
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Collection name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateCollection;
