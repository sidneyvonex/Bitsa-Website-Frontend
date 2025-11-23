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
  caption: string;
  id?: string;
  _id?: string;

  title?: string;
  imageUrl: string;
  eventId: string;
  uploadedBy?: string;
  uploadedAt: string;
  eventTitle?: string;
  eventDate?: string;
  uploaderSchoolId?: string;
  uploaderFirstName?: string;
  uploaderLastName?: string;
}

interface GalleryListResponse {
  images: GalleryImage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
      transformResponse: (
        response:
          | EventListResponse
          | { success: boolean; data: { events: Event[]; pagination?: EventListResponse['data']['pagination'] } }
          | { events: Event[]; pagination?: EventListResponse['data']['pagination'] }
          | Event[]
      ) => {
        // Normalize different possible backend formats into EventListResponse
        const normalizeEvents = (events: Event[]): Event[] =>
          events.map((event) => ({
            ...event,
            id: event.id || event._id || '',
          }));

        // Case 1: direct array of events
        if (Array.isArray(response)) {
          const events = normalizeEvents(response);
          return {
            success: true,
            data: {
              events,
              pagination: {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        // Case 2: direct { events, pagination }
        if ('events' in response && !('success' in response)) {
          const events = normalizeEvents(response.events);
          return {
            success: true,
            data: {
              events,
              pagination: response.pagination || {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        // Case 3: wrapped { success, data: { events, pagination } }
        const wrapped = response as EventListResponse | { success: boolean; data: { events: Event[]; pagination?: EventListResponse['data']['pagination'] } };
        if (wrapped.data && Array.isArray(wrapped.data.events)) {
          const events = normalizeEvents(wrapped.data.events);
          return {
            success: 'success' in wrapped ? wrapped.success : true,
            data: {
              events,
              pagination: wrapped.data.pagination || {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        return wrapped as EventListResponse;
      },
      providesTags: ['Event'],
    }),

    // Get upcoming events
    getUpcomingEvents: builder.query<EventListResponse, number | void>({
      query: (limit = 10) => ({
        url: '/events/upcoming',
        params: { limit },
      }),
      transformResponse: (
        response:
          | EventListResponse
          | { success: boolean; data: Event[] }
          | { events: Event[] }
          | Event[]
      ) => {
        const normalizeEvents = (events: Event[]): Event[] =>
          events.map((event) => ({
            ...event,
            id: event.id || event._id || '',
          }));

        // Direct array
        if (Array.isArray(response)) {
          const events = normalizeEvents(response);
          return {
            success: true,
            data: {
              events,
              pagination: {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        // { events: [] }
        if ('events' in response && !('success' in response)) {
          const events = normalizeEvents(response.events);
          return {
            success: true,
            data: {
              events,
              pagination: {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        // { success, data: [] }
        if (Array.isArray((response as { success: boolean; data: Event[] }).data)) {
          const events = normalizeEvents((response as { success: boolean; data: Event[] }).data);
          return {
            success: true,
            data: {
              events,
              pagination: {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        return response as EventListResponse;
      },
      providesTags: ['Event'],
    }),

    // Get past events
    getPastEvents: builder.query<EventListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/past',
        params: { page, limit },
      }),
      transformResponse: (
        response:
          | EventListResponse
          | { success: boolean; data: { events: Event[]; pagination?: EventListResponse['data']['pagination'] } }
          | { events: Event[]; pagination?: EventListResponse['data']['pagination'] }
          | Event[]
      ) => {
        const normalizeEvents = (events: Event[]): Event[] =>
          events.map((event) => ({
            ...event,
            id: event.id || event._id || '',
          }));

        if (Array.isArray(response)) {
          const events = normalizeEvents(response);
          return {
            success: true,
            data: {
              events,
              pagination: {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        if ('events' in response && !('success' in response)) {
          const events = normalizeEvents(response.events);
          return {
            success: true,
            data: {
              events,
              pagination: response.pagination || {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        const wrapped = response as EventListResponse | { success: boolean; data: { events: Event[]; pagination?: EventListResponse['data']['pagination'] } };
        if (wrapped.data && Array.isArray(wrapped.data.events)) {
          const events = normalizeEvents(wrapped.data.events);
          return {
            success: 'success' in wrapped ? wrapped.success : true,
            data: {
              events,
              pagination: wrapped.data.pagination || {
                page: 1,
                limit: events.length,
                total: events.length,
                totalPages: 1,
              },
            },
          } as EventListResponse;
        }

        return wrapped as EventListResponse;
      },
      providesTags: ['Event'],
    }),

    // Get event by ID (with gallery)
    getEventById: builder.query<{ success: boolean; data: Event }, string>({
      query: (id) => `/events/${id}`,
      transformResponse: (response: { success: boolean; data: Event } | Event) => {
        // Handle both wrapped and direct event objects, and normalize id/_id
        if ('id' in response || '_id' in response) {
          const event = response as Event;
          return {
            success: true,
            data: {
              ...event,
              id: event.id || event._id || '',
            },
          };
        }

        const wrapped = response as { success: boolean; data: Event };
        const event = wrapped.data;
        return {
          success: wrapped.success,
          data: {
            ...event,
            id: event.id || event._id || '',
          },
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Event', id }],
    }),

    // Get event gallery images
    getEventGallery: builder.query<{ success: boolean; data: GalleryImage[] }, string>({
      query: (eventId) => `/events/${eventId}/gallery`,
      transformResponse: (
        response:
          | { success: boolean; data: GalleryImage[] }
          | { images: GalleryImage[] }
          | GalleryImage[]
      ) => {
        const normalize = (images: GalleryImage[]): GalleryImage[] =>
          images.map((img) => ({
            ...img,
            id: img.id || img._id,
          }));

        if (Array.isArray(response)) {
          return { success: true, data: normalize(response) };
        }

        if ('images' in response && !('success' in response)) {
          return { success: true, data: normalize(response.images) };
        }

        const wrapped = response as { success: boolean; data: GalleryImage[] };
        return { success: wrapped.success, data: normalize(wrapped.data) };
      },
      providesTags: (_result, _error, eventId) => [{ type: 'Event', id: eventId }],
    }),

    // Get all gallery images (across all events)
    getAllGalleryImages: builder.query<GalleryListResponse, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: '/events/gallery/all',
        // backend supports page & limit as in your example
        params,
      }),
      transformResponse: (
        response:
          | GalleryListResponse
          | { success: boolean; data: GalleryListResponse }
          | { images: GalleryImage[]; pagination: GalleryListResponse['pagination'] }
      ) => {
        const normalize = (images: GalleryImage[]): GalleryImage[] =>
          images.map((img) => ({
            ...img,
            id: img.id || img._id,
          }));

        if ('images' in response && 'pagination' in response && !('success' in response)) {
          return {
            images: normalize(response.images),
            pagination: response.pagination,
          } as GalleryListResponse;
        }

        if ('success' in response) {
          const wrapped = response as { success: boolean; data: GalleryListResponse };
          return {
            images: normalize(wrapped.data.images),
            pagination: wrapped.data.pagination,
          } as GalleryListResponse;
        }

        const direct = response as GalleryListResponse;
        return {
          images: normalize(direct.images),
          pagination: direct.pagination,
        };
      },
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