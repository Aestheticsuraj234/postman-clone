import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateJsonBody, suggestRequestName } from "../services";
import { JsonBodyGenerationParams, RequestSuggestionParams } from "../types";

export function useSuggestRequestName() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: RequestSuggestionParams)=>suggestRequestName(params),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["request-suggestions", variables], data, {
        updatedAt: Date.now(),
      });

      toast.success(`Generated ${data.suggestions.length} name suggestions`);
    },
  });
}


export function useGenerateJsonBody(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: JsonBodyGenerationParams) => generateJsonBody(params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["json-body"] });
            toast.success("JSON body generated successfully");
        },
        onError: (error) => {
            toast.error("Failed to generate JSON body");
        }
    })
}
