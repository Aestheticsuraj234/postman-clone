"use client";
import Modal from "@/components/ui/modal";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRequestPlaygroundStore } from "../store/useRequestStore";

const AddNameModal = ({
  isModalOpen,
  setIsModalOpen,
  tabId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  tabId: string;
}) => {
  const { updateTab, tabs, markUnsaved } = useRequestPlaygroundStore();
  const tab = tabs.find((t) => t.id === tabId);

  const [name, setName] = useState(tab?.title || "");

 
  useEffect(() => {
    if (tab) setName(tab.title);
  }, [tabId]);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      updateTab(tabId, { title: name });
      markUnsaved(tabId, true); 
      toast.success("Request name updated");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update request name");
      console.error(err);
    }
  };

  return (
    <Modal
      title="Rename Request"
      description="Give your request a name"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText="Save"
      submitVariant="default"
    >
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded bg-zinc-900 text-white"
          placeholder="Request Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddNameModal;
