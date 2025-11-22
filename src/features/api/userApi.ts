import { baseApi } from './BaseApi';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  schoolId: string;
  role: 'Student' | 'Admin' | 'SuperAdmin';
  major: string;
  profilePicture?: string;
  bio?: string;
  language?: 'en' | 'sw';
  interests?: string[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  major?: string;
}

interface UserStatsResponse {
  success: boolean;
  data: {
    totalUsers: number;
    studentCount: number;
    adminCount: number;
    superAdminCount: number;
    verifiedUsers: number;
    activeUsers: number;
    usersByMajor: Record<string, number>;
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getCurrentUser: builder.query<{ success: boolean; data: User }, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    // Update current user profile
    updateCurrentUser: builder.mutation<{ success: boolean; data: User }, UpdateUserRequest>({
      query: (data) => ({
        url: '/users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Update profile picture
    updateProfilePicture: builder.mutation<{ success: boolean; data: { profilePicture: string } }, { profilePicture: string }>({
      query: (data) => ({
        url: '/users/me/profile-picture',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Update bio
    updateBio: builder.mutation<{ success: boolean; data: { bio: string } }, { bio: string }>({
      query: (data) => ({
        url: '/users/me/bio',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Update language preference
    updateLanguage: builder.mutation<{ success: boolean; data: { language: string } }, { language: 'en' | 'sw' }>({
      query: (data) => ({
        url: '/users/me/language',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Search users
    searchUsers: builder.query<{ success: boolean; data: User[] }, string>({
      query: (search) => ({
        url: '/users/search',
        params: { search },
      }),
      providesTags: ['User'],
    }),

    // Admin: Get all users
    getAllUsers: builder.query<{ success: boolean; data: User[]; pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    } }, {
      page?: number;
      limit?: number;
      role?: string;
      major?: string;
    } | void>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      transformResponse: (
        response:
          | { success?: boolean; data: User[] }
          | { success?: boolean; data: { users: User[]; pagination?: { page: number; limit: number; total: number; totalPages: number } } }
          | { success?: boolean; users: User[]; pagination?: { page: number; limit: number; total: number; totalPages: number } }
          | User[]
        ) => {
          const normalize = (users: User[]) => users.map((u) => ({ ...u }));

          if (Array.isArray(response)) {
            return { success: true, data: normalize(response) };
          }

          if (typeof response === 'object' && response !== null) {
            // Case: { users: User[], pagination? }
            if ('users' in response && Array.isArray((response as { users?: unknown }).users)) {
              const r = response as { success?: boolean; users: User[]; pagination?: { page: number; limit: number; total: number; totalPages: number } };
              return {
                success: r.success ?? true,
                data: normalize(r.users),
                pagination: r.pagination,
              };
            }
            // Case: { data: User[] }
            if ('data' in response && Array.isArray((response as { data?: unknown }).data)) {
              const r = response as { success?: boolean; data: User[] };
              return {
                success: r.success ?? true,
                data: normalize(r.data),
              };
            }
            // Case: { data: { users: User[], pagination? } }
            if ('data' in response && typeof (response as { data?: unknown }).data === 'object' && (response as { data: { users?: unknown } }).data !== null && 'users' in (response as { data: { users?: unknown } }).data && Array.isArray((response as { data: { users: User[]; pagination?: { page: number; limit: number; total: number; totalPages: number } } }).data.users)) {
              const r = response as { success?: boolean; data: { users: User[]; pagination?: { page: number; limit: number; total: number; totalPages: number } } };
              return {
                success: r.success ?? true,
                data: normalize(r.data.users),
                pagination: r.data.pagination,
              };
            }
          }

          return {
            success: false,
            data: [],
          };
        },
      providesTags: ['User'],
    }),

    // Admin: Get user statistics
    getUserStats: builder.query<UserStatsResponse, void>({
      query: () => '/users/stats',
    }),

    // Admin: Get users by role
    getUsersByRole: builder.query<{ success: boolean; data: User[] }, string>({
      query: (role) => `/users/role/${role}`,
      providesTags: ['User'],
    }),

    // Get users by major
    getUsersByMajor: builder.query<{ success: boolean; data: User[] }, string>({
      query: (major) => `/users/major/${major}`,
      providesTags: ['User'],
    }),

    // Get user by school ID
    getUserBySchoolId: builder.query<{ success: boolean; data: User }, string>({
      query: (schoolId) => `/users/${schoolId}`,
      providesTags: (_result, _error, schoolId) => [{ type: 'User', id: schoolId }],
    }),

    // Admin: Update user by school ID
    updateUserBySchoolId: builder.mutation<{ success: boolean; data: User }, {
      schoolId: string;
      data: Partial<UpdateUserRequest>;
    }>({
      query: ({ schoolId, data }) => ({
        url: `/users/${schoolId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { schoolId }) => [
        { type: 'User', id: schoolId },
        'User',
      ],
    }),

    // SuperAdmin: Delete user
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (schoolId) => ({
        url: `/users/${schoolId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Admin: Update user role
    updateUserRole: builder.mutation<{ success: boolean; data: User }, {
      schoolId: string;
      role: 'Student' | 'Admin' | 'SuperAdmin';
    }>({
      query: ({ schoolId, role }) => ({
        url: `/users/${schoolId}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: (_result, _error, { schoolId }) => [
        { type: 'User', id: schoolId },
        'User',
      ],
    }),

    // Deactivate user
    deactivateUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (schoolId) => ({
        url: `/users/${schoolId}/deactivate`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, schoolId) => [
        { type: 'User', id: schoolId },
        'User',
      ],
    }),

    // Admin: Activate user
    activateUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (schoolId) => ({
        url: `/users/${schoolId}/activate`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, schoolId) => [
        { type: 'User', id: schoolId },
        'User',
      ],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateProfilePictureMutation,
  useUpdateBioMutation,
  useUpdateLanguageMutation,
  useSearchUsersQuery,
  useGetAllUsersQuery,
  useGetUserStatsQuery,
  useGetUsersByRoleQuery,
  useGetUsersByMajorQuery,
  useGetUserBySchoolIdQuery,
  useUpdateUserBySchoolIdMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useDeactivateUserMutation,
  useActivateUserMutation,
} = userApi;