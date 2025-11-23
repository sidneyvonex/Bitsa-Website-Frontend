import { baseApi } from './baseApi';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

interface ChatResponse {
  success: boolean;
  data: {
    response: string;
    conversationId?: string;
  };
}

interface SearchRequest {
  query: string;
  limit?: number;
}

interface SearchResponse {
  success: boolean;
  data: {
    results: Array<{
      type: 'blog' | 'event' | 'project' | 'community';
      id: string;
      title: string;
      description: string;
      relevanceScore: number;
      url: string;
    }>;
  };
}

interface GenerateBlogRequest {
  topic: string;
  category: string;
  keywords?: string[];
  tone?: 'formal' | 'casual' | 'technical';
}

interface GenerateEventRequest {
  title: string;
  category: string;
  context?: string;
}

interface TranslateRequest {
  text: string;
  targetLanguage: 'en' | 'sw' | 'fr';
  sourceLanguage?: string;
}

interface ProjectFeedbackRequest {
  projectId: string;
  aspectsToReview?: string[];
}

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Chat with AI about BITSA content
    chatWithAI: builder.mutation<ChatResponse, ChatRequest>({
      query: (data) => ({
        url: '/ai/chat',
        method: 'POST',
        body: data,
      }),
    }),

    // AI-powered smart search
    aiSearch: builder.query<SearchResponse, SearchRequest>({
      query: ({ query, limit = 10 }) => ({
        url: '/ai/search',
        params: { query, limit },
      }),
    }),

    // Generate blog content (Admin only)
    generateBlogContent: builder.mutation<{
      success: boolean;
      data: {
        title: string;
        content: string;
        excerpt: string;
        suggestedTags: string[];
      };
    }, GenerateBlogRequest>({
      query: (data) => ({
        url: '/ai/generate/blog',
        method: 'POST',
        body: data,
      }),
    }),

    // Generate event description (Admin only)
    generateEventDescription: builder.mutation<{
      success: boolean;
      data: {
        description: string;
        suggestedTags: string[];
      };
    }, GenerateEventRequest>({
      query: (data) => ({
        url: '/ai/generate/event',
        method: 'POST',
        body: data,
      }),
    }),

    // Translate content (Admin only)
    translateContent: builder.mutation<{
      success: boolean;
      data: {
        translatedText: string;
        detectedLanguage?: string;
      };
    }, TranslateRequest>({
      query: (data) => ({
        url: '/ai/translate',
        method: 'POST',
        body: data,
      }),
    }),

    // Get AI feedback on project (Student/Admin)
    getProjectFeedback: builder.mutation<{
      success: boolean;
      data: {
        overallScore: number;
        feedback: string;
        strengths: string[];
        improvements: string[];
        suggestions: string[];
      };
    }, ProjectFeedbackRequest>({
      query: (data) => ({
        url: '/ai/feedback/project',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useChatWithAIMutation,
  useAiSearchQuery,
  useLazyAiSearchQuery,
  useGenerateBlogContentMutation,
  useGenerateEventDescriptionMutation,
  useTranslateContentMutation,
  useGetProjectFeedbackMutation,
} = aiApi;