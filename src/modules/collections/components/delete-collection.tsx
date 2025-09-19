"use client";

import Modal from "@/components/ui/modal";
import { useDeleteCollection } from "../hooks/collections";
import React from "react";
import { toast } from "sonner";

const DeleteCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
}) => {
  const { mutateAsync, isPending } = useDeleteCollection(collectionId);

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Collection deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete collection");
      console.error("Failed to delete collection:", err);
    }
  };

  return (
    <Modal
      title="Delete Collection"
      description="Are you sure you want to delete this collection? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all requests and data in this collection will be permanently removed.
      </p>
    </Modal>
  );
};

export default DeleteCollectionModal;
