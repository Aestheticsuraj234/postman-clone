
// -------------------------Request Name Suggestion-------------------------
export interface RequestSuggestionParams {
  workspaceName: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url?: string;
  description?: string;
}

export interface RequestSuggestion {
  name: string;
  reasoning: string;
  confidence: number;
}

export interface RequestSuggestionResponse {
  suggestions: RequestSuggestion[];
}

// -------------------------JSON Body Generation-------------------------
export interface JsonBodyGenerationParams {
  prompt: string;
  method?: string;
  endpoint?: string;
  context?: string;
  existingSchema?: Record<string, any>;
}

export interface JsonBodyResponse {
  jsonBody: Record<string, any>;
  explanation: string;
  suggestions: string[];
}