import { baseApi } from './BaseApi';

export interface Blog {
  _id: string | undefined;
  id: string;

  title: string;
  slug: string;
  content: string;
  category: string;
  readTime: number;
  coverImage?: string;

  excerpt?: string;
  authorId: string;
  authorSchoolId?: string;
  authorFirstName?: string;
  authorLastName?: string;
  author?: { firstName: string; lastName: string };
  authorEmail?: string;
  authorProfilePicture?: string;
  authorRole?: string;
  createdAt: string;
  updatedAt: string;
  isPublished?: boolean;
  views?: number;
  likes?: number;
  tags?: string[];
}

interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string;
  tags?: string[];
  isPublished?: boolean;
}

interface BlogStatsResponse {
  success: boolean;
  data: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalViews: number;
    totalLikes: number;
    blogsByCategory: Record<string, number>;
  };
}

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs (paginated, searchable, filterable)
    getAllBlogs: builder.query<BlogListResponse, {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      sortBy?: string;
    }>({
      query: ({ page = 1, limit = 10, search, category, sortBy }) => ({
        url: '/blogs',
        params: { page, limit, search, category, sortBy },
      }),
      transformResponse: (response: BlogListResponse | { blogs: Blog[]; pagination: BlogListResponse['data']['pagination'] }) => {
        // Handle different response formats
        if ('blogs' in response && !('success' in response)) {
          // Direct format: { blogs: [], pagination: {} }
          return {
            success: true,
            data: {
              blogs: response.blogs,
              pagination: response.pagination || {
                page: 1,
                limit: response.blogs.length,
                total: response.blogs.length,
                totalPages: 1,
              },
            },
          } as BlogListResponse;
        }
        return response as BlogListResponse;
      },
      providesTags: ['Blog'],
    }),

    // Get latest blogs
    getLatestBlogs: builder.query<BlogListResponse, number | void>({
      query: (limit = 5) => ({
        url: '/blogs/latest',
        params: { limit },
      }),
      transformResponse: (response: BlogListResponse | { success: boolean; data: Blog[] } | { blogs: Blog[] }) => {
        // Handle different response formats
        if (Array.isArray((response as { success: boolean; data: Blog[] }).data)) {
          const blogs = (response as { success: boolean; data: Blog[] }).data;
          return {
            success: true,
            data: {
              blogs,
              pagination: {
                page: 1,
                limit: blogs.length,
                total: blogs.length,
                totalPages: 1,
              },
            },
          } as BlogListResponse;
        }
        if ('blogs' in response && !('success' in response)) {
          // Direct format: { blogs: [] }
          return {
            success: true,
            data: {
              blogs: (response as { blogs: Blog[] }).blogs,
              pagination: {
                page: 1,
                limit: (response as { blogs: Blog[] }).blogs.length,
                total: (response as { blogs: Blog[] }).blogs.length,
                totalPages: 1,
              },
            },
          } as BlogListResponse;
        }
        return response as BlogListResponse;
      },
      providesTags: ['Blog'],
    }),

    // Get all blog categories
    getBlogCategories: builder.query<{ success: boolean; data: string[] }, void>({
      query: () => '/blogs/categories',
    }),

    // Get blogs by category
    getBlogsByCategory: builder.query<BlogListResponse, {
      category: string;
      page?: number;
      limit?: number;
    }>({
      query: ({ category, page = 1, limit = 10 }) => ({
        url: `/blogs/category/${category}`,
        params: { page, limit },
      }),
      providesTags: ['Blog'],
    }),

    // Get blog by slug (SEO-friendly)
    getBlogBySlug: builder.query<{ success: boolean; data: Blog }, string>({
      query: (slug) => `/blogs/slug/${slug}`,
      transformResponse: (response: { success: boolean; data: Blog } | Blog) => {
        // Handle both wrapped and direct blog object
        if ('id' in response || '_id' in response) {
          return {
            success: true,
            data: response as Blog,
          };
        }
        return response as { success: boolean; data: Blog };
      },
      providesTags: (_result, _error, slug) => [{ type: 'Blog', id: slug }],
    }),

    // Get blog by ID
    getBlogById: builder.query<{ success: boolean; data: Blog }, string>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (response: { success: boolean; data: Blog } | Blog) => {
        // Handle both wrapped and direct blog object
        if ('id' in response || '_id' in response) {
          return {
            success: true,
            data: response as Blog,
          };
        }
        return response as { success: boolean; data: Blog };
      },
      providesTags: (_result, _error, id) => [{ type: 'Blog', id }],
    }),

    // Admin: Get blog statistics
    getBlogStats: builder.query<BlogStatsResponse, void>({
      query: () => '/blogs/admin/stats',
    }),

    // Admin: Create blog
    createBlog: builder.mutation<{ success: boolean; data: Blog }, CreateBlogRequest>({
      query: (data) => ({
        url: '/blogs/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),

    // Admin: Update blog
    updateBlog: builder.mutation<{ success: boolean; data: Blog }, {
      id: string;
      data: Partial<CreateBlogRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/blogs/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Blog', id }, 'Blog'],
    }),

    // Admin: Delete blog
    deleteBlog: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/blogs/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetLatestBlogsQuery,
  useGetBlogCategoriesQuery,
  useGetBlogsByCategoryQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useGetBlogStatsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;