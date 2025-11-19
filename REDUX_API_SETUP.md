# BITSA Redux API Integration - Quick Start

## ✅ What's Been Created

A complete Redux Toolkit (RTK Query) API integration with the following structure:

### Files Created:

1. **Core Configuration**
   - `src/app/store.ts` - Redux store setup
   - `src/app/hooks.ts` - Typed Redux hooks
   - `src/features/api/baseApi.ts` - Base API with auth handling

2. **Authentication**
   - `src/features/auth/authApi.ts` - Login, Register, Forgot Password, Reset Password
   - `src/features/auth/authSlice.ts` - Auth state management
   - `src/features/auth/index.ts` - Auth exports

3. **API Endpoints**
   - `src/features/api/userApi.ts` - User management
   - `src/features/api/EventApi.ts` - Event management
   - `src/features/api/BookingsApi.ts` - Booking management
   - `src/features/api/PaymentsApi.ts` - Payment processing (M-Pesa support)
   - `src/features/api/VenueApi.ts` - Venue management
   - `src/features/api/SupportTicketApi.ts` - Support ticket system
   - `src/features/api/uploadApi.ts` - File upload handling
   - `src/features/api/index.ts` - API exports

4. **Documentation**
   - `src/features/README.md` - Complete API documentation
   - `src/ExampleUsage.tsx` - Working examples

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
pnpm add @reduxjs/toolkit react-redux
```

### 2. Update Your Main Entry File

In `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 3. Configure Backend URL

Update `src/features/api/baseApi.ts`:

```typescript
const BASE_URL = 'https://bitsabackendapi.azurewebsites.net/api';
```

## 📖 Basic Usage

### Login

```tsx
import { useLoginMutation } from './features/auth';
import { useAppDispatch } from './app/hooks';
import { setCredentials } from './features/auth';

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    const result = await login({ email, password }).unwrap();
    dispatch(setCredentials(result));
  };

  return (/* your form */);
}
```

### Fetch Data

```tsx
import { useGetAllEventsQuery } from './features/api';

function EventsList() {
  const { data, isLoading, error } = useGetAllEventsQuery({ page: 1 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Create/Update Data

```tsx
import { useCreateEventMutation } from './features/api';

function CreateEvent() {
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleSubmit = async (eventData) => {
    await createEvent(eventData).unwrap();
  };

  return (/* your form */);
}
```

## 🎯 Key Features

✅ **Automatic Token Management** - Tokens stored in localStorage, auto-added to requests
✅ **Token Refresh** - Automatic token refresh on 401 errors
✅ **Caching** - Automatic request caching and deduplication
✅ **Loading States** - Built-in loading/error/success states
✅ **TypeScript** - Full type safety with autocomplete
✅ **Optimistic Updates** - Cache updates automatically after mutations
✅ **Tag-based Invalidation** - Smart cache invalidation
✅ **M-Pesa Integration** - Payment processing support
✅ **File Uploads** - Built-in multipart/form-data support

## 📦 Available APIs

### Authentication
- `useLoginMutation()`
- `useRegisterMutation()`
- `useForgotPasswordMutation()`
- `useResetPasswordMutation()`
- `useLogoutMutation()`

### Events
- `useGetAllEventsQuery()`
- `useGetEventByIdQuery()`
- `useCreateEventMutation()`
- `useUpdateEventMutation()`
- `useRegisterForEventMutation()`
- `useGetMyEventsQuery()`

### Users
- `useGetCurrentUserQuery()`
- `useGetUserByIdQuery()`
- `useUpdateUserMutation()`
- `useGetUserStatsQuery()`

### Bookings
- `useGetMyBookingsQuery()`
- `useCreateBookingMutation()`
- `useCancelBookingMutation()`
- `useConfirmBookingMutation()`

### Payments
- `useInitiateMpesaPaymentMutation()`
- `useGetMyPaymentsQuery()`
- `useVerifyPaymentMutation()`
- `useRefundPaymentMutation()`

### Venues
- `useGetAllVenuesQuery()`
- `useCheckVenueAvailabilityQuery()`
- `useCreateVenueMutation()`

### Support Tickets
- `useGetMyTicketsQuery()`
- `useCreateTicketMutation()`
- `useAddTicketMessageMutation()`
- `useCloseTicketMutation()`

### File Uploads
- `useUploadImageMutation()`
- `useUploadAvatarMutation()`
- `useUploadMultipleFilesMutation()`

## 🔧 Advanced Usage

### Polling for Real-time Updates

```tsx
const { data } = useGetAllEventsQuery(
  { page: 1 },
  { pollingInterval: 30000 } // Poll every 30 seconds
);
```

### Conditional Fetching

```tsx
const { data } = useGetUserByIdQuery(userId, {
  skip: !userId // Don't fetch if userId is falsy
});
```

### Manual Refetch

```tsx
const { refetch } = useGetAllEventsQuery({ page: 1 });

<button onClick={refetch}>Refresh</button>
```

### Optimistic Updates

Mutations automatically invalidate related cache tags, triggering refetches.

## 📚 Next Steps

1. Read the full documentation in `src/features/README.md`
2. Check examples in `src/ExampleUsage.tsx`
3. Update backend URL in `src/features/api/baseApi.ts`
4. Start using the hooks in your components!

## 🎨 Benefits Over Axios

| Feature | RTK Query | Axios |
|---------|-----------|-------|
| Caching | ✅ Automatic | ❌ Manual |
| Loading States | ✅ Built-in | ❌ Manual |
| Request Deduplication | ✅ Yes | ❌ No |
| Type Safety | ✅ Full | ⚠️ Partial |
| Optimistic Updates | ✅ Easy | ❌ Hard |
| Token Refresh | ✅ Automatic | ❌ Manual |
| Polling | ✅ Built-in | ❌ Manual |
| Cache Invalidation | ✅ Smart | ❌ Manual |

## 💡 Tips

- Use `unwrap()` to get the actual result or throw errors
- Mutations return `{ data, error, isLoading, isSuccess, isError }`
- Queries return `{ data, error, isLoading, isFetching, refetch }`
- All hooks are strongly typed - let TypeScript guide you!

## 🐛 Troubleshooting

**Issue**: "Cannot find module '@reduxjs/toolkit'"
**Solution**: Run `pnpm add @reduxjs/toolkit react-redux`

**Issue**: Types not working
**Solution**: Make sure TypeScript is configured in `tsconfig.json`

**Issue**: 401 errors not refreshing token
**Solution**: Check `baseQueryWithReauth` in `baseApi.ts`

---

You're all set! Start building amazing features with type-safe, cached API calls! 🚀
