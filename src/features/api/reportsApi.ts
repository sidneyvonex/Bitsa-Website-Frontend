import { baseApi } from './baseApi';

interface Report {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  creatorId: string;
  creator: {
    firstName: string;
    lastName: string;
    schoolId: string;
  };
  downloads: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReportListResponse {
  success: boolean;
  data: Report[];
}

interface CreateReportRequest {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  isPublished?: boolean;
}

interface ReportStatsResponse {
  success: boolean;
  data: {
    totalReports: number;
    publishedReports: number;
    totalDownloads: number;
    reportsByCategory: Record<string, number>;
  };
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reports
    getAllReports: builder.query<ReportListResponse, void>({
      query: () => '/reports',
      providesTags: ['Report'],
    }),

    // Get latest reports
    getLatestReports: builder.query<ReportListResponse, number | void>({
      query: (limit = 5) => ({
        url: '/reports/latest',
        params: { limit },
      }),
      providesTags: ['Report'],
    }),

    // Search reports by title
    searchReports: builder.query<ReportListResponse, string>({
      query: (search) => ({
        url: '/reports/search',
        params: { search },
      }),
      providesTags: ['Report'],
    }),

    // Get report by ID
    getReportById: builder.query<{ success: boolean; data: Report }, string>({
      query: (id) => `/reports/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Report', id }],
    }),

    // Admin: Get report statistics
    getReportStats: builder.query<ReportStatsResponse, void>({
      query: () => '/reports/admin/stats',
    }),

    // Admin: Get reports by creator
    getReportsByCreator: builder.query<ReportListResponse, string>({
      query: (creatorId) => `/reports/admin/creator/${creatorId}`,
      providesTags: ['Report'],
    }),

    // Admin: Create report
    createReport: builder.mutation<{ success: boolean; data: Report }, CreateReportRequest>({
      query: (data) => ({
        url: '/reports/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),

    // Admin: Update report
    updateReport: builder.mutation<{ success: boolean; data: Report }, {
      id: string;
      data: Partial<CreateReportRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/reports/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Report', id }, 'Report'],
    }),

    // Admin: Delete report
    deleteReport: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetLatestReportsQuery,
  useSearchReportsQuery,
  useGetReportByIdQuery,
  useGetReportStatsQuery,
  useGetReportsByCreatorQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportsApi;
