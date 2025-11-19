import { baseApi } from '../api/baseApi';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  schoolId: string;
  major: string;
  role?: 'Student' | 'Admin' | 'SuperAdmin';
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface VerifyEmailRequest {
  token: string;
}

interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  userRole: string;
  profileUrl: string | null;
}

interface SuccessResponse {
  success: boolean;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // Register
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Admin Create User
    adminCreateUser: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/admin/create-user',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<SuccessResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<SuccessResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Verify Email
    verifyEmail: builder.mutation<SuccessResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Send Verification Email
    sendVerification: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/send-verification',
        method: 'POST',
      }),
    }),

    // Resend Verification
    resendVerification: builder.mutation<SuccessResponse, { email: string }>({
      query: (data) => ({
        url: '/auth/resend-verification',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAdminCreateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useSendVerificationMutation,
  useResendVerificationMutation,
} = authApi;
