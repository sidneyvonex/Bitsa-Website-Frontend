import { baseApi } from './baseApi';

export interface Interest {
  _id?: string;
  id: string;  // Backend uses id (not _id)
  name: string;
  description?: string;
  icon?: string;
  category?: string;  // Optional - not always returned
  isActive?: boolean;  // Optional - not always returned
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface InterestListResponse {
  success?: boolean;
  data?: Interest[];
  interests?: Interest[];  // Alternative format
}

interface CreateInterestRequest {
  name: string;
  description?: string;
  icon?: string;
  category: string;
}

interface InterestStatsResponse {
  success: boolean;
  data: {
    totalInterests: number;
    activeInterests: number;
    totalUserInterests: number;
    interestsByCategory: Record<string, number>;
  };
}

interface UserWithInterest {
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export const interestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public: Get all available interests (for selection)
    getAllInterests: builder.query<InterestListResponse, void>({
      query: () => '/interests',
      providesTags: ['Interest'],
    }),

    // Get my selected interests
    getMyInterests: builder.query<InterestListResponse, void>({
      query: () => '/interests/my',
      providesTags: ['Interest'],
    }),

    // Add interests to my profile
    addMyInterests: builder.mutation<{ success: boolean; message: string }, { interestIds: string[] }>({
      query: (data) => ({
        url: '/interests/my',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Interest'],
    }),

    // Replace all my interests
    replaceMyInterests: builder.mutation<{ success: boolean; message: string }, { interestIds: string[] }>({
      query: (data) => ({
        url: '/interests/my',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Interest'],
    }),

    // Check if user has selected interests
    checkMyInterests: builder.query<
      { success?: boolean; data?: { hasInterests: boolean; count: number }; hasInterests?: boolean; count?: number },
      void
    >({
      query: () => '/interests/my/check',
    }),

    // Remove an interest from my profile
    removeMyInterest: builder.mutation<{ success: boolean; message: string }, string>({
      query: (interestId) => ({
        url: `/interests/my/${interestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Interest'],
    }),

    // Get users who share a specific interest
    getUsersByInterest: builder.query<{ success: boolean; data: UserWithInterest[] }, string>({
      query: (interestId) => `/interests/${interestId}/users`,
    }),

    // Admin: Get all interests
    getAdminInterests: builder.query<InterestListResponse, void>({
      query: () => '/interests/admin/all',
      transformResponse: (response: any) => {
        // Handle different response formats from backend
        if (Array.isArray(response)) {
          return { success: true, data: response };
        }
        if (response.data && Array.isArray(response.data)) {
          return { success: true, data: response.data };
        }
        if (response.interests && Array.isArray(response.interests)) {
          return { success: true, data: response.interests };
        }
        if (Array.isArray(response.interests)) {
          return { success: true, data: response.interests };
        }
        // Fallback - return as is if already in correct format
        return response;
      },
      providesTags: ['Interest'],
    }),

    // Admin: Get interest statistics
    getInterestStats: builder.query<InterestStatsResponse, void>({
      query: () => '/interests/admin/stats',
    }),

    // Admin: Get interest by ID
    getInterestById: builder.query<{ success: boolean; data: Interest }, string>({
      query: (id) => `/interests/admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Interest', id }],
    }),

    // Admin: Create interest
    createInterest: builder.mutation<{ success: boolean; data: Interest }, CreateInterestRequest>({
      query: (data) => ({
        url: '/interests/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Interest'],
    }),

    // Admin: Update interest
    updateInterest: builder.mutation<{ success: boolean; data: Interest }, {
      id: string;
      data: Partial<CreateInterestRequest> & { isActive?: boolean };
    }>({
      query: ({ id, data }) => ({
        url: `/interests/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Interest', id }, 'Interest'],
    }),

    // Admin: Delete interest
    deleteInterest: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/interests/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Interest'],
    }),
  }),
});

export const {
  useGetAllInterestsQuery,
  useGetMyInterestsQuery,
  useAddMyInterestsMutation,
  useReplaceMyInterestsMutation,
  useCheckMyInterestsQuery,
  useRemoveMyInterestMutation,
  useGetUsersByInterestQuery,
  useGetAdminInterestsQuery,
  useGetInterestStatsQuery,
  useGetInterestByIdQuery,
  useCreateInterestMutation,
  useUpdateInterestMutation,
  useDeleteInterestMutation,
} = interestsApi;