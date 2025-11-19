import { baseApi } from './baseApi';

interface AuditLog {
  _id: string;
  userId: string;
  userEmail: string;
  action: string;
  resourceType: string;
  resourceId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

interface AuditStatsResponse {
  success: boolean;
  data: {
    totalLogs: number;
    actionBreakdown: Record<string, number>;
    resourceTypeBreakdown: Record<string, number>;
    topUsers: Array<{
      userId: string;
      userEmail: string;
      actionCount: number;
    }>;
    recentActivity: number;
  };
}

interface AuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalLogs: number;
      limit: number;
    };
  };
}

export const auditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SuperAdmin: Get all audit logs
    getAuditLogs: builder.query<AuditLogsResponse, {
      page?: number;
      limit?: number;
      userId?: string;
      action?: string;
      resourceType?: string;
      startDate?: string;
      endDate?: string;
    } | void>({
      query: (params) => ({
        url: '/audit/logs',
        params,
      }),
    }),

    // SuperAdmin: Get audit statistics
    getAuditStats: builder.query<AuditStatsResponse, {
      startDate?: string;
      endDate?: string;
    } | void>({
      query: (params) => ({
        url: '/audit/stats',
        params,
      }),
    }),

    // SuperAdmin: Get recent audit logs
    getRecentAuditLogs: builder.query<{ success: boolean; data: AuditLog[] }, {
      limit?: number;
    } | void>({
      query: (params) => ({
        url: '/audit/recent',
        params,
      }),
    }),

    // SuperAdmin: Get audit logs by user
    getUserAuditLogs: builder.query<AuditLogsResponse, {
      userId: string;
      page?: number;
      limit?: number;
    }>({
      query: ({ userId, ...params }) => ({
        url: `/audit/user/${userId}`,
        params,
      }),
    }),

    // SuperAdmin: Get audit logs by resource
    getResourceAuditLogs: builder.query<{ success: boolean; data: AuditLog[] }, {
      resourceType: string;
      resourceId: string;
    }>({
      query: ({ resourceType, resourceId }) => ({
        url: `/audit/resource/${resourceType}/${resourceId}`,
      }),
    }),
  }),
});

export const {
  useGetAuditLogsQuery,
  useGetAuditStatsQuery,
  useGetRecentAuditLogsQuery,
  useGetUserAuditLogsQuery,
  useGetResourceAuditLogsQuery,
} = auditApi;
