import { baseApi } from './BaseApi';

export interface Community {
  _id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  memberCount: number;
  leaderId?: string;
  createdAt: string;
  updatedAt: string;
}

interface CommunityListResponse {
  success: boolean;
  data: Community[];
}

interface CreateCommunityRequest {
  name: string;
  description: string;
  icon: string;
  category: string;
  leaderId?: string;
}

interface CommunityStatsResponse {
  success: boolean;
  data: {
    totalCommunities: number;
    totalMembers: number;
    averageMembersPerCommunity: number;
    communitiesByCategory: Record<string, number>;
  };
}

export const communitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all communities
    getAllCommunities: builder.query<CommunityListResponse, void>({
      query: () => '/communities',
      providesTags: ['Community'],
    }),

    // Search communities by name
    searchCommunities: builder.query<CommunityListResponse, string>({
      query: (search) => ({
        url: '/communities/search',
        params: { search },
      }),
      providesTags: ['Community'],
    }),

    // Get community by ID
    getCommunityById: builder.query<{ success: boolean; data: Community }, string>({
      query: (id) => `/communities/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Community', id }],
    }),

    // Admin: Get community statistics
    getCommunityStats: builder.query<CommunityStatsResponse, void>({
      query: () => '/communities/admin/stats',
    }),

    // Admin: Create community
    createCommunity: builder.mutation<{ success: boolean; data: Community }, CreateCommunityRequest>({
      query: (data) => ({
        url: '/communities/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Community'],
    }),

    // Admin: Update community
    updateCommunity: builder.mutation<{ success: boolean; data: Community }, {
      id: string;
      data: Partial<CreateCommunityRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/communities/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Community', id }, 'Community'],
    }),

    // Admin: Delete community
    deleteCommunity: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/communities/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Community'],
    }),
  }),
});

export const {
  useGetAllCommunitiesQuery,
  useSearchCommunitiesQuery,
  useGetCommunityByIdQuery,
  useGetCommunityStatsQuery,
  useCreateCommunityMutation,
  useUpdateCommunityMutation,
  useDeleteCommunityMutation,
} = communitiesApi;