import { baseApi } from './BaseApi';

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PartnerListResponse {
  success: boolean;
  data: Partner[];
}

interface CreatePartnerRequest {
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
  order?: number;
}

interface PartnerStatsResponse {
  success: boolean;
  data: {
    totalPartners: number;
    activePartners: number;
    partnersByCategory: Record<string, number>;
  };
}

export const partnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all partners
    getAllPartners: builder.query<PartnerListResponse, void>({
      query: () => '/partners',
      providesTags: ['Partner'],
    }),

    // Search partners by name
    searchPartners: builder.query<PartnerListResponse, string>({
      query: (search) => ({
        url: '/partners/search',
        params: { search },
      }),
      providesTags: ['Partner'],
    }),

    // Get partner by ID
    getPartnerById: builder.query<{ success: boolean; data: Partner }, string>({
      query: (id) => `/partners/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Partner', id }],
    }),

    // Admin: Get partner statistics
    getPartnerStats: builder.query<PartnerStatsResponse, void>({
      query: () => '/partners/admin/stats',
    }),

    // Admin: Create partner
    createPartner: builder.mutation<{ success: boolean; data: Partner }, CreatePartnerRequest>({
      query: (data) => ({
        url: '/partners/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Partner'],
    }),

    // Admin: Update partner
    updatePartner: builder.mutation<{ success: boolean; data: Partner }, {
      id: string;
      data: Partial<CreatePartnerRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/partners/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Partner', id }, 'Partner'],
    }),

    // Admin: Delete partner
    deletePartner: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/partners/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Partner'],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useSearchPartnersQuery,
  useGetPartnerByIdQuery,
  useGetPartnerStatsQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApi;