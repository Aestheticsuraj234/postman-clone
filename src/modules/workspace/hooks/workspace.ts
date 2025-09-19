import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkspace, getWorkspaceById, getWorkspaces } from "../actions";


export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => getWorkspaces(),
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => createWorkspace(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

export function useGetWorkspace(id: string) {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => getWorkspaceById(id),
  });
}