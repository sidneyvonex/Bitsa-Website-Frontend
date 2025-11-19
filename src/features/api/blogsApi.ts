import { baseApi } from './baseApi';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    schoolId: string;
  };
  image?: string;
  tags: string[];
  views: number;
  likes: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalBlogs: number;
      limit: number;
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
      providesTags: ['Blog'],
    }),

    // Get latest blogs
    getLatestBlogs: builder.query<BlogListResponse, number | void>({
      query: (limit = 5) => ({
        url: '/blogs/latest',
        params: { limit },
      }),
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
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),

    // Get blog by ID
    getBlogById: builder.query<{ success: boolean; data: Blog }, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, 'Blog'],
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
