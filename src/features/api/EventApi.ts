import { baseApi } from './baseApi';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  locationName: string;
  image?: string;
  latitude?: string;
  longitude?: string;
  category?: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy?: string;
  creatorSchoolId?: string;
  creatorFirstName?: string;
  creatorLastName?: string;
  creatorEmail?: string;
  creatorRole?: string;
  createdAt?: string;
  updatedAt?: string;
  gallery?: string[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EventListResponse {
  events: Event[];
  pagination: Pagination;
}

interface CreateEventRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  locationName: string;
  category?: string;
  image?: string;
  latitude?: string;
  longitude?: string;
  tags?: string[];
}

interface EventStatsResponse {
  success: boolean;
  data: {
    totalEvents: number;
    upcomingEvents: number;
    pastEvents: number;
    totalRegistrations: number;
    eventsByCategory: Record<string, number>;
  };
}

export interface GalleryImage {
  _id: string;
  eventId: string;
  imageUrl: string;
  caption?: string;
  uploadedAt: string;
}

const defaultPagination: Pagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const mapEvent = (event: Record<string, unknown>): Event => ({
  id: String(event.id ?? event._id ?? ''),
  title: String(event.title ?? 'BITSA Event'),
  description: String(event.description ?? ''),
  startDate: String(event.startDate ?? event.date ?? new Date().toISOString()),
  endDate: String(event.endDate ?? event.date ?? event.startDate ?? new Date().toISOString()),
  locationName: String(event.locationName ?? event.location ?? 'TBA'),
  image: event.image ? String(event.image) : undefined,
  latitude: event.latitude ? String(event.latitude) : undefined,
  longitude: event.longitude ? String(event.longitude) : undefined,
  category: event.category ? String(event.category) : undefined,
  status: (event.status as Event['status']) ?? undefined,
  createdBy: event.createdBy ? String(event.createdBy) : undefined,
  creatorSchoolId: event.creatorSchoolId ? String(event.creatorSchoolId) : undefined,
  creatorFirstName: event.creatorFirstName ? String(event.creatorFirstName) : undefined,
  creatorLastName: event.creatorLastName ? String(event.creatorLastName) : undefined,
  creatorEmail: event.creatorEmail ? String(event.creatorEmail) : undefined,
  creatorRole: event.creatorRole ? String(event.creatorRole) : undefined,
  createdAt: event.createdAt ? String(event.createdAt) : undefined,
  updatedAt: event.updatedAt ? String(event.updatedAt) : undefined,
  gallery: Array.isArray(event.gallery) ? (event.gallery as string[]) : undefined,
});

const normalizeEventListResponse = (response: unknown): EventListResponse => {
  if (!response || typeof response !== 'object') {
    return { events: [], pagination: defaultPagination };
  }

  const raw = response as {
    data?: Partial<EventListResponse>;
    events?: Event[];
    pagination?: Pagination;
  };

  const eventsSource = raw.events ?? raw.data?.events ?? [];
  const paginationSource = raw.pagination ?? raw.data?.pagination ?? defaultPagination;

  return {
    events: Array.isArray(eventsSource) ? eventsSource.map((event) => mapEvent(event as Record<string, unknown>)) : [],
    pagination: {
      page: paginationSource.page ?? defaultPagination.page,
      limit: paginationSource.limit ?? defaultPagination.limit,
      total: paginationSource.total ?? defaultPagination.total,
      totalPages: paginationSource.totalPages ?? defaultPagination.totalPages,
    },
  };
};

const normalizeEventResponse = (response: unknown): Event => {
  if (!response || typeof response !== 'object') {
    return mapEvent({});
  }

  const raw = response as { data?: Record<string, unknown> } | Record<string, unknown>;
  const eventData = ('data' in raw ? raw.data : raw) ?? {};
  return mapEvent(eventData);
};

const normalizeGalleryResponse = (response: unknown): GalleryImage[] => {
  if (!response || typeof response !== 'object') {
    return [];
  }

  const raw = response as { data?: GalleryImage[]; gallery?: GalleryImage[] };
  const images = raw.data ?? raw.gallery ?? [];
  return Array.isArray(images) ? images : [];
};

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all events (paginated, searchable, filterable)
    getAllEvents: builder.query<EventListResponse, {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      status?: string;
      sortBy?: string;
    }>({
      query: ({ page = 1, limit = 10, search, category, status, sortBy }) => ({
        url: '/events',
        params: { page, limit, search, category, status, sortBy },
      }),
      transformResponse: normalizeEventListResponse,
      providesTags: ['Event'],
    }),

    // Get upcoming events
    getUpcomingEvents: builder.query<EventListResponse, number | void>({
      query: (limit = 10) => ({
        url: '/events/upcoming',
        params: { limit },
      }),
      transformResponse: normalizeEventListResponse,
      providesTags: ['Event'],
    }),

    // Get past events
    getPastEvents: builder.query<EventListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/past',
        params: { page, limit },
      }),
      transformResponse: normalizeEventListResponse,
      providesTags: ['Event'],
    }),

    // Get event by ID (with gallery)
    getEventById: builder.query<Event, string>({
      query: (id) => `/events/${id}`,
      transformResponse: normalizeEventResponse,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),

    // Get event gallery images
    getEventGallery: builder.query<GalleryImage[], string>({
      query: (eventId) => `/events/${eventId}/gallery`,
      transformResponse: normalizeGalleryResponse,
      providesTags: (result, error, eventId) => [{ type: 'Event', id: eventId }],
    }),

    // Get all gallery images (across all events)
    getAllGalleryImages: builder.query<{ success: boolean; data: GalleryImage[] }, void>({
      query: () => '/events/gallery/all',
      providesTags: ['Event'],
    }),

    // Admin: Get event statistics
    getEventStats: builder.query<EventStatsResponse, void>({
      query: () => '/events/admin/stats',
    }),

    // Admin: Create event
    createEvent: builder.mutation<{ success: boolean; data: Event }, CreateEventRequest>({
      query: (data) => ({
        url: '/events/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    // Admin: Update event
    updateEvent: builder.mutation<{ success: boolean; data: Event }, {
      id: string;
      data: Partial<CreateEventRequest>;
    }>({
      query: ({ id, data }) => ({
        url: `/events/admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }, 'Event'],
    }),

    // Admin: Delete event
    deleteEvent: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/events/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    // Admin: Add image to event gallery
    addGalleryImage: builder.mutation<{ success: boolean; data: GalleryImage }, {
      eventId: string;
      imageUrl: string;
      caption?: string;
    }>({
      query: (data) => ({
        url: '/events/admin/gallery',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    // Admin: Delete image from gallery
    deleteGalleryImage: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/events/admin/gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetUpcomingEventsQuery,
  useGetPastEventsQuery,
  useGetEventByIdQuery,
  useGetEventGalleryQuery,
  useGetAllGalleryImagesQuery,
  useGetEventStatsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useAddGalleryImageMutation,
  useDeleteGalleryImageMutation,
} = eventsApi;
