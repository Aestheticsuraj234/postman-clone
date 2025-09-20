import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {addRequestToCollection,getAllRequestFromCollection,Request,saveRequest} from "../actions"


export function useAddRequestToCollection(collectionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (value: Request) => addRequestToCollection(collectionId, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
        },
    });
}


export function useGetAllRequestFromCollection(collectionId: string) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["requests", collectionId],
        queryFn: async () => getAllRequestFromCollection(collectionId),
       
    });
}


export function useSaveRequest(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (value: Request) => saveRequest(id, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
        },
    });
}