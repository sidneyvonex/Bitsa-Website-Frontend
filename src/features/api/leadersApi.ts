import { baseApi } from './baseApi';

export interface Leader {
  id: string;
  fullName: string;
  position: string;
  academicYear: string;
  profilePicture?: string;
  email?: string;
  phone?: string;
  isCurrent: boolean;
  createdAt: string;
}

interface LeaderListResponse {
  success: boolean;
  data: {
    leaders: Leader[];
    total: number;
    limit: number;
    offset: number;
  };
}

interface CreateLeaderRequest {
  firstName: string;
  lastName: string;
  position: string;
  academicYear: string;
  image?: string;
  bio?: string;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  order?: number;
}

interface LeaderStatsResponse {
  success: boolean;
  data: {
    totalLeaders: number;
    currentLeaders: number;
    pastLeaders: number;
    leadersByYear: Record<string, number>;
  };
}

export const leadersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all leaders with optional filters
    getAllLeaders: builder.query<LeaderListResponse, {
      year?: string;
      position?: string;
      limit?: number;
      offset?: number;
    } | void>({
      query: (params) => ({
        url: '/leaders',
        params,
      }),
      providesTags: ['Leader'],
    }),

    // Get current leaders only
    getCurrentLeaders: builder.query<LeaderListResponse, void>({
      query: () => '/leaders/current',
      transformResponse: (response: LeaderListResponse | { success: boolean; data: Leader[] }) => {
        // Handle both response formats: nested structure or direct array
        if (Array.isArray((response as { success: boolean; data: Leader[] }).data)) {
          const leaders = (response as { success: boolean; data: Leader[] }).data;
          return {
            success: true,
            data: {
              leaders,
              total: leaders.length,
              limit: leaders.length,
              offset: 0,
            },
          } as LeaderListResponse;
        }
        return response as LeaderListResponse;
      },
      providesTags: ['Leader'],
    }),

    // Get past leaders
    getPastLeaders: builder.query<LeaderListResponse, void>({
      query: () => '/leaders/past',
      transformResponse: (response: LeaderListResponse | { success: boolean; data: Leader[] }) => {
        // Handle both response formats: nested structure or direct array
        if (Array.isArray((response as { success: boolean; data: Leader[] }).data)) {
          const leaders = (response as { success: boolean; data: Leader[] }).data;
          return {
            success: true,
            data: {
              leaders,
              total: leaders.length,
              limit: leaders.length,
              offset: 0,
            },
          } as LeaderListResponse;
        }
        return response as LeaderListResponse;
      },
      providesTags: ['Leader'],
    }),

    // Get all academic years
    getAcademicYears: builder.query<{ success: boolean; data: string[] }, void>({
      query: () => '/leaders/years',
    }),

    // Get leader by ID
    getLeaderById: builder.query<{ success: boolean; data: Leader }, string>({
      query: (id) => `/leaders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Leader', id }],
    }),

    // Admin: Get leader statistics
    getLeaderStats: builder.query<LeaderStatsResponse, void>({
      query: () => '/leaders/admin/stats',
    }),

    // Admin: Create leader
    createLeader: builder.mutation<{ success: boolean; data: Leader }, CreateLeaderRequest>({
      query: (data) => ({
        url: '/leaders/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Leader'],
    }),

    // Admin: Update leader
    updateLeader: builder.mutation<{ success: boolean; data: Leader }, {
      id: string;
      data: Partial<CreateLeaderRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/leaders/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Leader', id }, 'Leader'],
    }),

    // Admin: Delete leader
    deleteLeader: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/leaders/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leader'],
    }),

    // Admin: Set current leaders by academic year
    setCurrentLeaders: builder.mutation<{ success: boolean; message: string }, { academicYear: string }>({
      query: (data) => ({
        url: '/leaders/admin/set-current',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Leader'],
    }),
  }),
});

export const {
  useGetAllLeadersQuery,
  useGetCurrentLeadersQuery,
  useGetPastLeadersQuery,
  useGetAcademicYearsQuery,
  useGetLeaderByIdQuery,
  useGetLeaderStatsQuery,
  useCreateLeaderMutation,
  useUpdateLeaderMutation,
  useDeleteLeaderMutation,
  useSetCurrentLeadersMutation,
} = leadersApi;
