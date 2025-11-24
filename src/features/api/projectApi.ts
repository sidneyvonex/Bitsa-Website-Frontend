import { baseApi } from './baseApi';

export interface Project {
  id?: string;
  _id?: string;
  userId?: string;
  studentId?: string;
  title: string;
  description: string;
  problemStatement?: string;
  proposedSolution?: string;
  techStack?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  image?: string;
  category?: string;
  status?: 'in-progress' | 'submitted' | 'completed' | 'pending' | 'approved' | 'rejected';
  isFeatured?: boolean;
  views?: number;
  likes?: number;
  createdAt: string;
  updatedAt?: string;
  student?: {
    schoolId: string;
    firstName: string;
    lastName: string;
  };
  authorSchoolId?: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorEmail?: string;
  authorProfilePicture?: string;
}

interface ProjectListResponse {
  success?: boolean;
  projects?: Project[];
  pagination?: {
    page?: number;
    currentPage?: number;
    totalPages?: number;
    total?: number;
    totalProjects?: number;
    limit?: number;
  };
  data?: {
    projects: Project[];
    pagination: {
      page?: number;
      currentPage?: number;
      totalPages?: number;
      total?: number;
      totalProjects?: number;
      limit?: number;
    };
  };
}

interface CreateProjectRequest {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  category: string;
}

interface ProjectStatsResponse {
  success: boolean;
  data: {
    totalProjects: number;
    approvedProjects: number;
    pendingProjects: number;
    rejectedProjects: number;
    featuredProjects: number;
    projectsByCategory: Record<string, number>;
  };
}

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects (paginated, searchable, filterable)
    getAllProjects: builder.query<ProjectListResponse, {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      status?: string;
      sortBy?: string;
    }>({
      query: ({ page = 1, limit = 10, search, category, status, sortBy }) => ({
        url: '/projects',
        params: { page, limit, search, category, status, sortBy },
      }),
      transformResponse: (response: any) => {
        // Normalize different response formats
        if (response.projects && Array.isArray(response.projects)) {
          return {
            success: true,
            data: {
              projects: (response.projects as any[]).map(p => ({
                id: p.id || p._id,
                _id: p._id || p.id,
                title: p.title,
                description: p.description,
                techStack: p.techStack,
                technologies: p.technologies || (p.techStack ? p.techStack.split(',').map((t: string) => t.trim()) : []),
                githubUrl: p.githubUrl,
                liveUrl: p.liveUrl,
                images: p.images,
                status: p.status,
                createdAt: p.createdAt,
                authorFirstName: p.authorFirstName,
                authorLastName: p.authorLastName,
                authorEmail: p.authorEmail,
                authorSchoolId: p.authorSchoolId
              })),
              pagination: {
                page: response.pagination?.page || 1,
                currentPage: response.pagination?.page || 1,
                total: response.pagination?.total || response.projects.length,
                totalPages: response.pagination?.totalPages || 1,
                limit: response.pagination?.limit || 20
              }
            }
          };
        }
        return {
          success: response.success || true,
          data: response.data || { projects: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }
        };
      },
      providesTags: ['Project'],
    }),

    // Get featured/approved projects
    getFeaturedProjects: builder.query<ProjectListResponse, { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: '/projects/featured',
        params: { limit },
      }),
      providesTags: ['Project'],
    }),

    // Get project by ID
    getProjectById: builder.query<{ success: boolean; data: Project }, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),

    // Student: Get my projects
    getMyProjects: builder.query<ProjectListResponse, void>({
      query: () => '/projects/my',
      providesTags: ['Project'],
    }),

    // Student: Create project
    createProject: builder.mutation<{ success: boolean; data: Project }, CreateProjectRequest>({
      query: (data) => ({
        url: '/projects/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),

    // Student: Update project
    updateProject: builder.mutation<{ success: boolean; data: Project }, {
      id: string;
      data: Partial<CreateProjectRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),

    // Student: Delete project
    deleteProject: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Admin: Get project statistics
    getProjectStats: builder.query<ProjectStatsResponse, void>({
      query: () => '/projects/admin/stats',
    }),

    // Admin: Update project status
    updateProjectStatus: builder.mutation<{ success: boolean; data: Project }, {
      id: string;
      status: 'pending' | 'approved' | 'rejected';
      isFeatured?: boolean;
    }>({
      query: ({ id, status, isFeatured }) => ({
        url: `/projects/admin/${id}/status`,
        method: 'PATCH',
        body: { status, isFeatured },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),

    // Admin: Get all projects by a specific user
    getProjectsByUser: builder.query<ProjectListResponse, string>({
      query: (schoolId) => `/projects/admin/user/${schoolId}`,
      providesTags: ['Project'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useGetMyProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectStatsQuery,
  useUpdateProjectStatusMutation,
  useGetProjectsByUserQuery,
} = projectsApi;