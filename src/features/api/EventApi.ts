import { baseApi } from './baseApi';

export interface Event {
  id: string;
  _id?: string;  // Some endpoints might return _id
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  locationName?: string;
  image?: string;
  latitude?: string;
  longitude?: string;
  createdBy?: string;
  createdAt?: string;
  creatorSchoolId?: string;
  creatorFirstName?: string;
  creatorLastName?: string;
  creatorEmail?: string;
  creatorRole?: string;
  category?: string;
  status?: string;
  registeredCount?: number;
  capacity?: number;
  date?: string;
  time?: string;
}

interface EventListResponse {
  success: boolean;
  data: {
    events: Event[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  capacity: number;
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
      providesTags: ['Event'],
    }),

    // Get upcoming events
    getUpcomingEvents: builder.query<EventListResponse, number | void>({
      query: (limit = 10) => ({
        url: '/events/upcoming',
        params: { limit },
      }),
      providesTags: ['Event'],
    }),

    // Get past events
    getPastEvents: builder.query<EventListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/past',
        params: { page, limit },
      }),
      providesTags: ['Event'],
    }),

    // Get event by ID (with gallery)
    getEventById: builder.query<{ success: boolean; data: Event }, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Event', id }],
    }),

    // Get event gallery images
    getEventGallery: builder.query<{ success: boolean; data: GalleryImage[] }, string>({
      query: (eventId) => `/events/${eventId}/gallery`,
      providesTags: (_result, _error, eventId) => [{ type: 'Event', id: eventId }],
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
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Event', id }, 'Event'],
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
