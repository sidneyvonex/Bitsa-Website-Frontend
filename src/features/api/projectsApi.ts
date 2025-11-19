import { baseApi } from './baseApi';

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  techStack: string;
  proposalDocument?: string | null;
  githubUrl?: string | null;
  images?: string[] | null;
  status: 'in-progress' | 'submitted' | 'completed';
  createdAt: string;
  updatedAt: string;
  authorSchoolId: string;
  authorFirstName: string;
  authorLastName: string;
  authorEmail: string;
  authorProfilePicture?: string | null;
  authorRole: string;
}

interface ProjectListResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProjectSingleResponse {
  success: boolean;
  data: Project;
}

interface CreateProjectRequest {
  title: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  techStack: string;
  proposalDocument?: string;
  githubUrl?: string;
  images?: string[];
}

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects (paginated, searchable, filterable)
    getAllProjects: builder.query<ProjectListResponse, {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
    }>({
      query: ({ page = 1, limit = 20, search, status }) => ({
        url: '/projects',
        params: { page, limit, search, status },
      }),
      transformResponse: (response: ProjectListResponse | { success: boolean; data: ProjectListResponse }) => {
        // Handle both response formats
        if ('success' in response && 'data' in response) {
          return response.data as ProjectListResponse;
        }
        return response as ProjectListResponse;
      },
      providesTags: ['Project'],
    }),

    // Get featured/approved projects
    getFeaturedProjects: builder.query<ProjectListResponse, { limit?: number }>({
      query: ({ limit = 20 }) => ({
        url: '/projects/featured',
        params: { limit },
      }),
      transformResponse: (response: ProjectListResponse | { success: boolean; data: ProjectListResponse }) => {
        // Handle both response formats
        if ('success' in response && 'data' in response) {
          return response.data as ProjectListResponse;
        }
        return response as ProjectListResponse;
      },
      providesTags: ['Project'],
    }),

    // Get project by ID
    getProjectById: builder.query<ProjectSingleResponse, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
} = projectsApi;
