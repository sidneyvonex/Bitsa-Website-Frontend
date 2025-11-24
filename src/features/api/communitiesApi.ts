import { baseApi } from './baseApi';

export interface Community {
  id: string;
  name: string;
  description: string;
  whatsappLink?: string;
  createdAt: string;
  updatedAt?: string;
  icon?: string;
  category?: string;
  memberCount?: number;
  membersCount?: number;
  leaderId?: string;
}

interface CommunityListResponse {
  success: boolean;
  data: {
    communities: Community[];
    total?: number;
    limit?: number;
    offset?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
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
      transformResponse: (response: any) => {
        // Handle different response formats from backend
        if (response.data?.communities) {
          return {
            success: true,
            data: {
              communities: (response.data.communities as any[]).map(c => ({
                id: c.id || c._id,
                name: c.name,
                description: c.description,
                whatsappLink: c.whatsappLink,
                createdAt: c.createdAt,
                icon: c.icon,
                category: c.category,
                memberCount: c.memberCount || c.membersCount || 0,
                membersCount: c.membersCount || c.memberCount || 0
              })),
              total: response.data.total || response.data.communities.length,
              limit: response.data.limit || 50,
              offset: response.data.offset || 0
            }
          };
        }
        return response;
      },
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