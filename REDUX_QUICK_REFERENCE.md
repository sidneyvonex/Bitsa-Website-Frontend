# Redux API Quick Reference

## Common Use Cases

### 1. Display a List of Items

```typescript
import { useGetAllEventsQuery } from '../features/api';

function EventsList() {
  const { data, isLoading, error } = useGetAllEventsQuery({ 
    page: 1, 
    limit: 10 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data.events.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### 2. Create/Update Items (Mutations)

```typescript
import { useCreateBlogMutation } from '../features/api';

function CreateBlog() {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const handleSubmit = async (formData) => {
    try {
      const result = await createBlog(formData).unwrap();
      alert('Blog created: ' + result.data._id);
    } catch (error) {
      alert('Error: ' + error.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
}
```

### 3. Authentication Flow

```typescript
import { useLoginMutation } from '../features/api';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (email, password) => {
    try {
      const result = await login({ email, password }).unwrap();
      
      // Save to Redux store (automatically saves to localStorage)
      dispatch(setCredentials({
        user: result.data.user,
        token: result.data.token,
        refreshToken: result.data.refreshToken,
      }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.data?.message);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {/* login form */}
    </form>
  );
}
```

### 4. Check Authentication Status

```typescript
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated, selectCurrentUser } from '../features/auth/authSlice';

function Profile() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

### 5. Logout

```typescript
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clears Redux state and localStorage
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### 6. Pagination

```typescript
import { useState } from 'react';
import { useGetAllBlogsQuery } from '../features/api';

function BlogsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllBlogsQuery({ 
    page, 
    limit: 10 
  });

  return (
    <div>
      {/* Display blogs */}
      {data?.data.blogs.map(blog => (
        <div key={blog._id}>{blog.title}</div>
      ))}
      
      {/* Pagination controls */}
      <div>
        <button 
          onClick={() => setPage(p => p - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        
        <span>Page {data?.data.pagination.currentPage} of {data?.data.pagination.totalPages}</span>
        
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={page >= (data?.data.pagination.totalPages || 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### 7. Search with Debouncing

```typescript
import { useState, useEffect } from 'react';
import { useSearchUsersQuery } from '../features/api';

function UserSearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useSearchUsersQuery(debouncedSearch, {
    skip: debouncedSearch.length < 2, // Don't search until 2+ chars
  });

  return (
    <div>
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      
      {isLoading && <div>Searching...</div>}
      
      {data?.data.map(user => (
        <div key={user._id}>{user.firstName} {user.lastName}</div>
      ))}
    </div>
  );
}
```

### 8. Conditional Queries

```typescript
import { useGetUserBySchoolIdQuery } from '../features/api';

function UserProfile({ schoolId }) {
  const { data, isLoading } = useGetUserBySchoolIdQuery(schoolId, {
    skip: !schoolId, // Only fetch if schoolId exists
  });

  if (!schoolId) return <div>No user selected</div>;
  if (isLoading) return <div>Loading user...</div>;

  return <div>{data?.data.firstName}</div>;
}
```

### 9. Refetch on Demand

```typescript
import { useGetAllEventsQuery } from '../features/api';

function EventsList() {
  const { data, refetch } = useGetAllEventsQuery({ page: 1 });

  return (
    <div>
      <button onClick={() => refetch()}>
        Refresh Events
      </button>
      
      {data?.data.events.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### 10. Background Polling

```typescript
import { useGetAllEventsQuery } from '../features/api';

function EventsList() {
  // Automatically refetch every 60 seconds
  const { data } = useGetAllEventsQuery({ page: 1 }, {
    pollingInterval: 60000,
    refetchOnFocus: true, // Refetch when tab gains focus
    refetchOnReconnect: true, // Refetch when internet reconnects
  });

  return (
    <div>
      {data?.data.events.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### 11. Update Current User Profile

```typescript
import { useUpdateCurrentUserMutation, useGetCurrentUserQuery } from '../features/api';

function EditProfile() {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateUser, { isLoading }] = useUpdateCurrentUserMutation();

  const handleUpdate = async (updates) => {
    try {
      await updateUser(updates).unwrap();
      alert('Profile updated!');
    } catch (error) {
      alert('Update failed: ' + error.data?.message);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleUpdate({ firstName: 'New Name' });
    }}>
      <input defaultValue={currentUser?.data.firstName} />
      <button type="submit" disabled={isLoading}>Save</button>
    </form>
  );
}
```

### 12. Admin Actions (Role-Based)

```typescript
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useDeleteUserMutation } from '../features/api';

function UserManagement({ schoolId }) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (currentUser.role !== 'SuperAdmin') {
      alert('Only SuperAdmin can delete users');
      return;
    }

    try {
      await deleteUser(schoolId).unwrap();
      alert('User deleted');
    } catch (error) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      {currentUser.role === 'SuperAdmin' && (
        <button onClick={handleDelete}>Delete User</button>
      )}
    </div>
  );
}
```

### 13. AI Chat Integration

```typescript
import { useState } from 'react';
import { useChatWithAIMutation } from '../features/api';

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [chat] = useChatWithAIMutation();

  const sendMessage = async (question) => {
    setMessages([...messages, { role: 'user', content: question }]);

    try {
      const result = await chat({
        question,
        conversationId: messages[0]?.conversationId, // Continue conversation
      }).unwrap();

      setMessages([...messages, { 
        role: 'assistant', 
        content: result.data.response,
        conversationId: result.data.conversationId,
      }]);
    } catch (error) {
      alert('AI error: ' + error.data?.message);
    }
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
      <input 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}
```

### 14. File Upload (Profile Picture)

```typescript
import { useUpdateProfilePictureMutation } from '../features/api';

function ProfilePictureUpload() {
  const [updatePicture, { isLoading }] = useUpdateProfilePictureMutation();

  const handleUpload = async (file) => {
    // First upload file to cloud storage (e.g., Cloudinary)
    const formData = new FormData();
    formData.append('file', file);
    
    // Assuming you have a separate upload endpoint
    const uploadResponse = await fetch('YOUR_UPLOAD_URL', {
      method: 'POST',
      body: formData,
    });
    const { url } = await uploadResponse.json();

    // Then update user profile with URL
    try {
      await updatePicture({ profilePicture: url }).unwrap();
      alert('Picture updated!');
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <input 
      type="file" 
      onChange={(e) => handleUpload(e.target.files[0])}
      disabled={isLoading}
    />
  );
}
```

## Response Structure Reference

All API responses follow this structure:

```typescript
{
  success: boolean;
  data: any; // The actual response data
  message?: string; // Optional message (usually for errors)
}
```

### Paginated Responses

```typescript
{
  success: true,
  data: {
    events: Event[],      // Or blogs, users, etc.
    pagination: {
      currentPage: 1,
      totalPages: 10,
      totalEvents: 95,    // Or totalBlogs, totalUsers, etc.
      limit: 10
    }
  }
}
```

### Auth Login Response

```typescript
{
  success: true,
  data: {
    user: {
      _id: string,
      email: string,
      firstName: string,
      lastName: string,
      role: 'Student' | 'Admin' | 'SuperAdmin',
      // ... other fields
    },
    token: string,        // JWT access token
    refreshToken: string  // JWT refresh token
  }
}
```

## Error Handling

All errors follow this structure:

```typescript
{
  success: false,
  message: "Error description",
  data?: any // Optional additional error data
}
```

### Handling Errors in Components

```typescript
try {
  const result = await mutation(data).unwrap();
  // Success
} catch (error) {
  if (error.status === 401) {
    // Unauthorized - redirect to login
  } else if (error.status === 403) {
    // Forbidden - show permission error
  } else {
    // Other error - show error.data.message
    alert(error.data?.message || 'An error occurred');
  }
}
```

## Tips

1. **Always use `.unwrap()`** when you need to catch errors:
   ```typescript
   const result = await mutation(data).unwrap();
   ```

2. **Use `skip` option** to conditionally fetch:
   ```typescript
   useQuery(id, { skip: !id })
   ```

3. **Destructure only what you need**:
   ```typescript
   const { data, isLoading, error } = useQuery();
   ```

4. **Cache is automatic** - no need to manually manage it!

5. **Mutations auto-invalidate** - related queries refetch automatically
