import { baseApi } from './baseApi';

export interface BlogAuthor {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  schoolId?: string;
  role?: string;
  profilePicture?: string | null;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category?: string;
  tags: string[];
  readTime?: number;
  image?: string;
  author: BlogAuthor | null;
  views?: number;
  likes?: number;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    limit: number;
  };
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  coverImage?: string;
  tags?: string[];
  readTime?: number;
  isPublished?: boolean;
}

export interface BlogStatsResponse {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  totalLikes: number;
  blogsByCategory: Record<string, number>;
}

interface RawBlogAuthor {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  schoolId?: string;
  role?: string;
  profilePicture?: string | null;
}

interface RawBlog {
  id?: string;
  _id?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  categoryName?: string;
  tags?: string[];
  readTime?: number;
  image?: string;
  coverImage?: string;
  views?: number;
  likes?: number;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: RawBlogAuthor;
  authorId?: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorEmail?: string;
  authorSchoolId?: string;
  authorRole?: string;
  authorProfilePicture?: string | null;
  authorProfilePic?: string | null;
  read_time?: number;
}

interface RawPagination {
  page?: number;
  currentPage?: number;
  totalPages?: number;
  total?: number;
  totalBlogs?: number;
  limit?: number;
}

interface RawBlogListResponse {
  blogs?: RawBlog[];
  pagination?: RawPagination;
  data?: {
    blogs?: RawBlog[];
    pagination?: RawPagination;
  };
}

interface RawSingleBlogResponse {
  blog?: RawBlog;
  data?: RawBlog;
}

const truncateText = (text?: string, limit = 160) => {
  if (!text) return '';
  const trimmed = text.trim();
  if (trimmed.length <= limit) return trimmed;
  return `${trimmed.slice(0, limit)}…`;
};

const normalizeAuthor = (blog: RawBlog): BlogAuthor | null => {
  const source = blog.author ?? {};
  const firstName = blog.authorFirstName ?? source.firstName;
  const lastName = blog.authorLastName ?? source.lastName;
  const hasName = firstName || lastName;

  if (!hasName && !blog.authorId && !source.id) {
    return null;
  }

  return {
    id: blog.authorId ?? source.id,
    firstName,
    lastName,
    email: blog.authorEmail ?? source.email,
    schoolId: blog.authorSchoolId ?? source.schoolId,
    role: blog.authorRole ?? source.role,
    profilePicture:
      blog.authorProfilePicture ?? blog.authorProfilePic ?? source.profilePicture ?? null,
  };
};

const normalizeBlog = (blog: RawBlog): Blog => {
  const id = blog.id ?? blog._id ?? blog.slug ?? `blog-${Date.now()}`;
  const content = blog.content ?? '';

  return {
    id,
    slug: blog.slug ?? id,
    title: blog.title ?? 'Untitled blog',
    content,
    excerpt: blog.excerpt ?? truncateText(content),
    category: blog.category ?? blog.categoryName,
    tags: blog.tags ?? [],
    readTime: blog.readTime ?? blog.read_time,
    image: blog.image ?? blog.coverImage,
    author: normalizeAuthor(blog),
    views: blog.views,
    likes: blog.likes,
    isPublished: blog.isPublished,
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

const normalizePagination = (
  pagination?: RawPagination,
  fallbackTotal = 0,
  fallbackLimit = 10,
) => {
  const limit = pagination?.limit ?? fallbackLimit;
  const totalBlogs = pagination?.totalBlogs ?? pagination?.total ?? fallbackTotal;
  return {
    currentPage: pagination?.currentPage ?? pagination?.page ?? 1,
    totalPages: pagination?.totalPages ?? Math.max(1, Math.ceil(totalBlogs / (limit || 1))),
    totalBlogs,
    limit,
  };
};

const extractBlogs = (response?: RawBlogListResponse) =>
  response?.data?.blogs ?? response?.blogs ?? [];

const extractPagination = (response?: RawBlogListResponse) =>
  response?.data?.pagination ?? response?.pagination;

const buildListResponse = (
  response: RawBlogListResponse | undefined,
  fallbackLimit = 10,
): BlogListResponse => {
  const rawBlogs = extractBlogs(response);
  const blogs = rawBlogs.map(normalizeBlog);
  return {
    blogs,
    pagination: normalizePagination(extractPagination(response), blogs.length, fallbackLimit),
  };
};

const buildSingleResponse = (response: RawSingleBlogResponse | RawBlog | undefined): Blog => {
  if (!response) {
    return normalizeBlog({});
  }

  if ('blog' in response || 'data' in response) {
    const raw = (response as RawSingleBlogResponse).blog ?? response.data;
    return normalizeBlog(raw ?? {});
  }

  return normalizeBlog(response as RawBlog);
};

const providesBlogTags = (result?: BlogListResponse) =>
  result?.blogs
    ? [
        ...result.blogs.map((blog) => ({ type: 'Blog' as const, id: blog.id })),
        { type: 'Blog' as const, id: 'LIST' },
      ]
    : [{ type: 'Blog' as const, id: 'LIST' }];

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<
      BlogListResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search, category, sortBy, sortOrder }) => ({
        url: '/blogs',
        params: { page, limit, search, category, sortBy, sortOrder },
      }),
      transformResponse: (response: RawBlogListResponse, _meta, args) =>
        buildListResponse(response, args?.limit ?? 10),
      providesTags: providesBlogTags,
    }),

    getLatestBlogs: builder.query<BlogListResponse, number | void>({
      query: (limit = 5) => ({
        url: '/blogs/latest',
        params: { limit },
      }),
      transformResponse: (response: RawBlogListResponse, _meta, limit) =>
        buildListResponse(response, (limit as number | undefined) ?? 5),
      providesTags: providesBlogTags,
    }),

    getBlogCategories: builder.query<string[], void>({
      query: () => '/blogs/categories',
      transformResponse: (response: { data?: string[]; categories?: string[] } | string[]) => {
        if (Array.isArray(response)) return response;
        return response?.data ?? response?.categories ?? [];
      },
    }),

    getBlogsByCategory: builder.query<
      BlogListResponse,
      {
        category: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ category, page = 1, limit = 10 }) => ({
        url: `/blogs/category/${category}`,
        params: { page, limit },
      }),
      transformResponse: (response: RawBlogListResponse, _meta, args) =>
        buildListResponse(response, args?.limit ?? 10),
      providesTags: providesBlogTags,
    }),

    getBlogBySlug: builder.query<Blog, string>({
      query: (slug) => `/blogs/slug/${slug}`,
      transformResponse: (response: RawSingleBlogResponse | RawBlog) =>
        buildSingleResponse(response),
      providesTags: (result, error, slug) => [{ type: 'Blog', id: result?.id ?? slug }],
    }),

    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (response: RawSingleBlogResponse | RawBlog) =>
        buildSingleResponse(response),
      providesTags: (result, error, id) => [{ type: 'Blog', id: result?.id ?? id }],
    }),

    getBlogStats: builder.query<BlogStatsResponse, void>({
      query: () => '/blogs/admin/stats',
      transformResponse: (response: { data?: BlogStatsResponse } | BlogStatsResponse) =>
        (response as { data?: BlogStatsResponse })?.data ?? (response as BlogStatsResponse),
    }),

    createBlog: builder.mutation<Blog, CreateBlogRequest>({
      query: (data) => ({
        url: '/blogs/admin',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: RawSingleBlogResponse | RawBlog) =>
        buildSingleResponse(response),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),

    updateBlog: builder.mutation<
      Blog,
      {
        id: string;
        data: Partial<CreateBlogRequest>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/blogs/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: RawSingleBlogResponse | RawBlog) =>
        buildSingleResponse(response),
      invalidatesTags: (result) => [
        { type: 'Blog', id: result?.id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),

    deleteBlog: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/blogs/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
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
