import { useState, useEffect, useMemo } from 'react';
import { useGetAllEventsQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation, useGetEventByIdQuery, useAddGalleryImageMutation, useGetEventGalleryQuery } from '../../features/api/eventApi';
import { Loader2, Plus, MapPin, Calendar, Clock, Users, Upload, X, Edit3, Check, Zap, Image as ImageIcon, ChevronDown, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminEvents = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedEventForGallery, setSelectedEventForGallery] = useState<string | null>(null);
  const [galleryImageCaption, setGalleryImageCaption] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedEventGallery, setExpandedEventGallery] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const { data: eventsData, isLoading, refetch } = useGetAllEventsQuery({ page: 1, limit: 10, search: '' });
  const { data: eventDetailsData } = useGetEventByIdQuery(editingId || '', { skip: !editingId });
  const { data: galleryData } = useGetEventGalleryQuery(expandedEventGallery || '', { skip: !expandedEventGallery });
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [addGalleryImage] = useAddGalleryImageMutation();

  // Get past and upcoming events
  const upcomingEvents = useMemo(() => {
    const allEvents = eventsData?.data?.events || [];
    const now = new Date();
    return allEvents.filter((event: any) => new Date(event.startDate) >= now);
  }, [eventsData]);

  const pastEvents = useMemo(() => {
    const allEvents = eventsData?.data?.events || [];
    const now = new Date();
    return allEvents.filter((event: any) => new Date(event.startDate) < now);
  }, [eventsData]);

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    locationName: '',
    latitude: '',
    longitude: '',
    category: '',
    capacity: 0,
  });

  useEffect(() => {
    if (editingId && eventDetailsData?.data) {
      const event = eventDetailsData.data;
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      setFormData({
        title: event.title || '',
        description: event.description || '',
        image: event.image || '',
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toISOString().split('T')[1]?.slice(0, 5) || '',
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toISOString().split('T')[1]?.slice(0, 5) || '',
        locationName: event.locationName || '',
        latitude: event.latitude || '',
        longitude: event.longitude || '',
        category: event.category || '',
        capacity: event.capacity || 0,
      });
    }
  }, [editingId, eventDetailsData]);

  const handleGalleryImageUpload = async (file: File) => {
    if (!selectedEventForGallery) {
      toast.error('Please select an event first');
      return;
    }

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error('Cloudinary not configured');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', uploadPreset);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', async () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            try {
              await addGalleryImage({
                eventId: selectedEventForGallery,
                imageUrl: data.secure_url,
                caption: galleryImageCaption,
              }).unwrap();
              toast.success('Image added to gallery!');
              setGalleryImageCaption('');
              refetch();
              resolve(data);
            } catch (error) {
              toast.error('Failed to add image to gallery');
              reject(error);
            }
          } else {
            toast.error('Upload failed');
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          toast.error('Upload error');
          reject(new Error('Upload error'));
        });

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        xhr.open('POST', url, true);
        xhr.send(formDataCloud);
      }).finally(() => {
        setIsUploading(false);
        setUploadProgress(0);
      });
    } catch (error) {
      toast.error('Failed to upload gallery image');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCloudinaryUpload = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error('Cloudinary not configured');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', uploadPreset);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setFormData(prev => ({
              ...prev,
              image: data.secure_url
            }));
            resolve(data);
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload error'));
        });

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        xhr.open('POST', url, true);
        xhr.send(formDataCloud);
      }).finally(() => {
        setIsUploading(false);
        setUploadProgress(0);
      });
    } catch (error) {
      toast.error('Failed to upload image');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`).toISOString();
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`).toISOString();

      const eventData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        startDate: startDateTime,
        endDate: endDateTime,
        locationName: formData.locationName,
        latitude: formData.latitude,
        longitude: formData.longitude,
        category: formData.category,
        capacity: formData.capacity,
      };

      if (editingId) {
        await updateEvent({ id: editingId, data: eventData }).unwrap();
        toast.success('Event updated successfully!');
      } else {
        await createEvent(eventData).unwrap();
        toast.success('Event created successfully!');
      }

      setShowCreate(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        locationName: '',
        latitude: '',
        longitude: '',
        category: '',
        capacity: 0,
      });
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Event?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id).unwrap();
        toast.success('Event deleted successfully!');
        refetch();
      } catch (error: any) {
        toast.error(error.data?.message || 'Failed to delete event');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600 mt-2">Manage and organize your events</p>
        </div>
        <button
          onClick={() => {
            setShowCreate(true);
            setEditingId(null);
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-3 font-semibold text-sm transition border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming Events ({upcomingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-3 font-semibold text-sm transition border-b-2 ${
            activeTab === 'past'
              ? 'border-gray-700 text-gray-900'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Past Events ({pastEvents.length})
        </button>
      </div>

      {/* Create/Edit Form - Card Grid Layout */}
      {showCreate && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {editingId ? <Edit3 className="w-6 h-6 text-gray-700" /> : <Zap className="w-6 h-6 text-gray-700" />}
                <h3 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Event' : 'New Event'}</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCreate(false);
                  setEditingId(null);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column: Image Upload */}
              <div className="col-span-1 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Event Poster</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition">
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleCloudinaryUpload(e.target.files[0]);
                        }
                      }}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  {isUploading && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{uploadProgress}%</p>
                    </div>
                  )}
                </div>
                {formData.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                  </div>
                )}
              </div>

              {/* Middle Column: Event Details */}
              <div className="col-span-1 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Workshop, Hackathon"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Right Column: Date, Time & Location */}
              <div className="col-span-1 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    placeholder="Event location"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Latitude</label>
                    <input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      placeholder="e.g., -1.2345"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Longitude</label>
                    <input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      placeholder="e.g., 36.7890"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    placeholder="Number of attendees"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {editingId ? 'Update Event' : 'Create Event'}
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowCreate(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    description: '',
                    image: '',
                    startDate: '',
                    startTime: '',
                    endDate: '',
                    endTime: '',
                    locationName: '',
                    latitude: '',
                    longitude: '',
                    category: '',
                    capacity: 0,
                  });
                }}
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Event Gallery Manager</h3>
                <p className="text-sm text-gray-600 mt-1">Add photos to your past events</p>
              </div>
              <button
                onClick={() => {
                  setShowGalleryModal(false);
                  setSelectedEventForGallery(null);
                  setGalleryImageCaption('');
                }}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Event Selector */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Select Past Event</label>
                <select
                  value={selectedEventForGallery || ''}
                  onChange={(e) => setSelectedEventForGallery(e.target.value || null)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Choose an event...</option>
                  {(pastEvents || []).map((event: any) => (
                    <option key={event.id || event._id} value={event.id || event._id}>
                      {event.title} ({new Date(event.startDate).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                {pastEvents.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">No past events available yet</p>
                )}
              </div>

              {/* Image Upload Section */}
              {selectedEventForGallery && (
                <>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition">
                    <label className="flex flex-col items-center cursor-pointer">
                      <ImageIcon className="w-10 h-10 text-blue-500 mb-3" />
                      <span className="text-sm font-semibold text-gray-900">Click to upload event photos</span>
                      <span className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleGalleryImageUpload(e.target.files[0]);
                          }
                        }}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>

                    {/* Upload Progress */}
                    {isUploading && uploadProgress > 0 && (
                      <div className="mt-6">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-700 mt-2 font-semibold">{uploadProgress}% uploading...</p>
                      </div>
                    )}
                  </div>

                  {/* Caption Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Photo Caption (Optional)</label>
                    <input
                      type="text"
                      placeholder="Add a description for this photo..."
                      value={galleryImageCaption}
                      onChange={(e) => setGalleryImageCaption(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setPreviewImage(null)}>
          <div className="max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 p-2 bg-white rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <img src={previewImage} alt="Preview" className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      {/* Events Grid Cards */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#5773da]" />
          </div>
        ) : displayedEvents.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map(event => (
              <EventCard
                key={event.id || event._id}
                event={event}
                isPast={activeTab === 'past'}
                onEdit={(id) => {
                  setEditingId(id);
                  setShowCreate(true);
                }}
                onDelete={handleDelete}
                onGalleryToggle={setExpandedEventGallery}
                expandedEventGallery={expandedEventGallery}
                galleryImages={expandedEventGallery === (event.id || event._id) ? galleryData?.data || [] : []}
                onGalleryClick={() => {
                  const eventId = event.id || event._id;
                  if (eventId) {
                    setSelectedEventForGallery(eventId);
                    setShowGalleryModal(true);
                  }
                }}
                onPreview={setPreviewImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 font-medium">
              {activeTab === 'upcoming' ? 'No upcoming events yet. Create one to get started' : 'No past events yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: any;
  isPast: boolean;
  onEdit: (id: string | null) => void;
  onDelete: (id: string) => void;
  onGalleryToggle: (id: string | null) => void;
  expandedEventGallery: string | null;
  galleryImages: any[];
  onGalleryClick: () => void;
  onPreview: (url: string) => void;
}

const EventCard = ({ event, isPast, onEdit, onDelete, onGalleryToggle, expandedEventGallery, galleryImages, onGalleryClick, onPreview }: EventCardProps) => {
  const eventId = event.id || event._id;

  return (
    <div className={`relative rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-2 ${
      isPast
        ? 'bg-white border-orange-200 hover:border-orange-400'
        : 'bg-white border-blue-200 hover:border-blue-400'
    }`}>
      {/* Status Badge */}
      <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold ${
        isPast
          ? 'bg-orange-500 text-white'
          : 'bg-blue-500 text-white'
      }`}>
        {isPast ? 'PAST' : 'UPCOMING'}
      </div>

      {/* Image */}
      {event.image && (
        <div className="h-40 bg-gray-200 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Category */}
        <div>
          <h3 className="text-lg font-bold line-clamp-2 text-gray-900">
            {event.title}
          </h3>
          {event.category && (
            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
              isPast
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {event.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isPast ? 'text-orange-500' : 'text-blue-500'}`} />
            <span>{new Date(event.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isPast ? 'text-orange-500' : 'text-green-500'}`} />
            <span>{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${isPast ? 'text-orange-500' : 'text-red-500'}`} />
            <span className="truncate">{event.locationName || 'N/A'}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className={`w-4 h-4 ${isPast ? 'text-orange-500' : 'text-purple-500'}`} />
              <span>{event.capacity} attendees</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit((event.id || event._id) ?? null)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition ${
                isPast
                  ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete((event.id || event._id) ?? '')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition ${
                isPast
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              Delete
            </button>
          </div>

          {/* Gallery Button for Past Events */}
          {isPast && (
            <button
              onClick={() => {
                onGalleryToggle(expandedEventGallery === eventId ? null : (eventId || null));
              }}
              className="w-full px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
              <ChevronDown className={`w-4 h-4 transition ${expandedEventGallery === eventId ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Gallery Dropdown Content */}
        {expandedEventGallery === eventId && isPast && (
          <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Photo Gallery</p>
                <p className="text-xs text-gray-600 mt-1">{event.title}</p>
              </div>
              <button
                onClick={onGalleryClick}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
              >
                <Upload className="w-3 h-3" />
                Add Photos
              </button>
            </div>

            {/* Gallery Images Preview Grid - Show All Available Images */}
            <div className="space-y-2">
              {galleryImages && galleryImages.length > 0 ? (
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition aspect-square bg-gray-200"
                      onClick={() => onPreview(img.imageUrl)}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.caption || 'Gallery'}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.opacity = '0.3';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition" />
                      </div>
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-600 py-3 text-center bg-white rounded">No photos yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
