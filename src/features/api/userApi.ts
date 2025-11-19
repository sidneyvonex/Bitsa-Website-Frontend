import { baseApi } from './baseApi';

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
    getAllUsers: builder.query<{ success: boolean; data: User[] }, {
      page?: number;
      limit?: number;
      role?: string;
      major?: string;
    } | void>({
      query: (params) => ({
        url: '/users',
        params,
      }),
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
      providesTags: (result, error, schoolId) => [{ type: 'User', id: schoolId }],
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
      invalidatesTags: (result, error, { schoolId }) => [
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
      invalidatesTags: (result, error, { schoolId }) => [
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
      invalidatesTags: (result, error, schoolId) => [
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
      invalidatesTags: (result, error, schoolId) => [
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
