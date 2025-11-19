# Component Migration Guide

This guide shows how to migrate existing components from axios to Redux.

## 1. Login Component Migration

### Before (axios)
```typescript
import { useState } from 'react';
import { authService } from '../api/services/auth.service';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### After (Redux)
```typescript
import { useLoginMutation } from '../features/api';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        user: result.data.user,
        token: result.data.token,
        refreshToken: result.data.refreshToken,
      }));
      navigate('/dashboard');
    } catch (err) {
      // Error is automatically available in the `error` variable
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error.data?.message}</div>}
      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## 2. Events List Migration

### Before (axios)
```typescript
import { useState, useEffect } from 'react';
import axios from 'axios';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/events', {
          params: { page, limit: 10 },
        });
        setEvents(response.data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}
```

### After (Redux)
```typescript
import { useState } from 'react';
import { useGetAllEventsQuery } from '../features/api';

function EventsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllEventsQuery({ 
    page, 
    limit: 10 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.data?.message}</div>;

  return (
    <div>
      {data?.data.events.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}
```

## 3. Create Blog Form Migration

### Before (axios)
```typescript
import { useState } from 'react';
import axios from 'axios';

function CreateBlogForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/blogs', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
    } catch (error) {
      alert('Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <div>Blog created!</div>}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
}
```

### After (Redux)
```typescript
import { useCreateBlogMutation } from '../features/api';

function CreateBlogForm() {
  const [createBlog, { isLoading, isSuccess }] = useCreateBlogMutation();

  const handleSubmit = async (formData) => {
    try {
      await createBlog(formData).unwrap();
      // Blog created successfully
    } catch (error) {
      alert('Failed to create blog: ' + error.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSuccess && <div>Blog created!</div>}
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
}
```

## 4. Protected Route Migration

### Before (axios)
```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

### After (Redux)
```typescript
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated, selectCurrentUser } from '../features/auth/authSlice';

function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

## 5. User Profile Migration

### Before (axios)
```typescript
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### After (Redux)
```typescript
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetCurrentUserQuery } from '../features/api';

function UserProfile() {
  // Option 1: Get user from Redux state (already loaded at login)
  const user = useAppSelector(selectCurrentUser);

  // Option 2: Fetch fresh data from API
  const { data, isLoading } = useGetCurrentUserQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user && !data?.data) return <div>No user found</div>;

  const displayUser = data?.data || user;

  return (
    <div>
      <h1>{displayUser.firstName} {displayUser.lastName}</h1>
      <p>{displayUser.email}</p>
    </div>
  );
}
```

## 6. Search Component Migration

### Before (axios)
```typescript
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/users/search', {
          params: { search },
        });
        setResults(response.data);
      } catch (error) {
        console.error('Search failed');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading && <div>Searching...</div>}
      {results.map(user => <div key={user._id}>{user.firstName}</div>)}
    </div>
  );
}
```

### After (Redux)
```typescript
import { useState, useEffect } from 'react';
import { useSearchUsersQuery } from '../features/api';

function UserSearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useSearchUsersQuery(debouncedSearch, {
    skip: debouncedSearch.length < 2,
  });

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {isLoading && <div>Searching...</div>}
      {data?.data.map(user => <div key={user._id}>{user.firstName}</div>)}
    </div>
  );
}
```

## 7. Delete Confirmation Migration

### Before (axios)
```typescript
import { useState } from 'react';
import axios from 'axios';

function DeleteUserButton({ userId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this user?')) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User deleted');
      onSuccess();
    } catch (error) {
      alert('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

### After (Redux)
```typescript
import { useDeleteUserMutation } from '../features/api';

function DeleteUserButton({ schoolId, onSuccess }) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (!confirm('Delete this user?')) return;

    try {
      await deleteUser(schoolId).unwrap();
      alert('User deleted');
      onSuccess();
    } catch (error) {
      alert('Delete failed: ' + error.data?.message);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

## 8. Update Profile Migration

### Before (axios)
```typescript
import { useState } from 'react';
import axios from 'axios';

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/users/me', 
        { firstName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated');
    } catch (error) {
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <button disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
```

### After (Redux)
```typescript
import { useState } from 'react';
import { useUpdateCurrentUserMutation } from '../features/api';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectCurrentUser, updateUser } from '../features/auth/authSlice';

function EditProfile() {
  const user = useAppSelector(selectCurrentUser);
  const [firstName, setFirstName] = useState(user.firstName);
  const [updateProfile, { isLoading }] = useUpdateCurrentUserMutation();
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    try {
      const result = await updateProfile({ firstName }).unwrap();
      
      // Update Redux state with new user data
      dispatch(updateUser(result.data));
      
      alert('Profile updated');
    } catch (error) {
      alert('Update failed: ' + error.data?.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <button disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
```

## Key Differences Summary

| Feature | Axios (Before) | Redux (After) |
|---------|---------------|---------------|
| **State Management** | Manual useState | Automatic with RTK Query |
| **Loading States** | Manual setLoading | Built-in isLoading |
| **Error Handling** | Try/catch + useState | Built-in error object |
| **Token Management** | Manual localStorage | Automatic with prepareHeaders |
| **Caching** | None | Automatic caching |
| **Refetching** | Manual useEffect | Automatic cache invalidation |
| **Type Safety** | Manual interfaces | Fully typed responses |
| **Code Length** | ~30-40 lines | ~15-20 lines |

## Benefits of Redux Migration

1. **Less Code**: 30-50% reduction in component code
2. **Better Performance**: Automatic caching and deduplication
3. **Type Safety**: Full TypeScript support with autocomplete
4. **Automatic Token Management**: No manual header setup
5. **Error Handling**: Standardized error structure
6. **Loading States**: Built-in loading and success states
7. **Cache Invalidation**: Automatic refetching on mutations
8. **DevTools**: Redux DevTools for debugging

## Migration Checklist

For each component:

- [ ] Replace axios import with Redux hooks
- [ ] Remove useState for data, loading, error
- [ ] Replace useEffect with useQuery hook
- [ ] Replace try/catch with .unwrap()
- [ ] Remove manual token management
- [ ] Remove manual state updates
- [ ] Test the component
- [ ] Check Redux DevTools for proper caching

## Common Issues

### Issue: "Cannot read property 'data' of undefined"
**Solution**: Always use optional chaining: `data?.data.events`

### Issue: "Token not being sent"
**Solution**: Ensure user is logged in and Redux state has the token:
```typescript
const token = useAppSelector(state => state.auth.token);
console.log('Token:', token);
```

### Issue: "Data not refreshing after mutation"
**Solution**: Check that tags are properly invalidated in baseApi.ts

### Issue: "Too many re-renders"
**Solution**: Don't call mutations in useEffect without dependencies:
```typescript
// Bad
useEffect(() => {
  mutation();
});

// Good
useEffect(() => {
  mutation();
}, [specificDependency]);
```
