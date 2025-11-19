import { baseApi } from './baseApi';

interface Project {
  _id: string;
  title: string;
  description: string;
  studentId: string;
  student: {
    schoolId: string;
    firstName: string;
    lastName: string;
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface ProjectListResponse {
  success: boolean;
  data: {
    projects: Project[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProjects: number;
      limit: number;
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
      providesTags: (result, error, id) => [{ type: 'Project', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }, 'Project'],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }, 'Project'],
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
