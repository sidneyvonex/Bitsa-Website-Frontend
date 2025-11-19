# BITSA API Endpoints - Quick Reference Card

## 🔐 Authentication Endpoints

### 1. User Registration
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@student.ueab.ac.ke",
  "password": "SecurePass123!",
  "schoolId": "SCT123456",
  "major": "Computer Science",
  "role": "Student"
}

Success Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": { userId, email, schoolId, fullName, role }
}

Error Response (409):
{
  "success": false,
  "error": "Email already registered" | "School ID already exists"
}
```

---

### 2. User Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john.doe@student.ueab.ac.ke",
  "password": "SecurePass123!"
}

Success Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "SCT123456",
  "email": "john.doe@student.ueab.ac.ke",
  "fullName": "John Doe",
  "userRole": "student",
  "profileUrl": "https://cdn.ueab.ac.ke/profiles/..."
}

Error Response (403 - Email Not Verified):
{
  "success": false,
  "error": "Please verify your email before logging in",
  "data": { needsVerification: true, email }
}

Error Response (401 - Invalid Credentials):
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 3. Resend Verification Email
```
POST /api/auth/resend-verification
Content-Type: application/json

Request Body:
{
  "email": "john.doe@student.ueab.ac.ke"
}

Success Response (200):
{
  "success": true,
  "message": "Verification email sent successfully"
}

Error Response (429 - Too Many Requests):
{
  "success": false,
  "error": "Please wait before requesting another email",
  "data": { retryAfter: 300 }
}
```

---

### 4. Verify Email
```
GET /api/auth/verify-email?token=<verification_token>

Success Response (200):
{
  "success": true,
  "message": "Email verified successfully",
  "data": { userId, email, emailVerified: true }
}

Error Response (400 - Invalid Token):
{
  "success": false,
  "error": "Invalid or expired verification token"
}
```

---

### 5. Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "john.doe@student.ueab.ac.ke"
}

Success Response (200):
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### 6. Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset_token_here",
  "newPassword": "NewSecurePass123!"
}

Success Response (200):
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 🎯 Interest Endpoints

### 7. Check If User Has Interests
```
GET /api/interests/my/check
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": {
    "hasInterests": false,
    "count": 0
  }
}
```

---

### 8. Get All Available Interests
```
GET /api/interests/admin/all
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "uuid-int-001",
      "name": "Web Development",
      "description": "Building websites and web apps",
      "icon": "🌐",
      "category": "Technology",
      "isActive": true,
      "userCount": 245
    },
    ...
  ]
}
```

---

### 9. Save User Interests
```
POST /api/interests/my
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "interestIds": [
    "uuid-int-001",
    "uuid-int-003",
    "uuid-int-004"
  ]
}

Success Response (200):
{
  "success": true,
  "message": "Interests added successfully",
  "data": { userId, interestCount: 3, interests: [...] }
}
```

---

### 10. Get My Selected Interests
```
GET /api/interests/my
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "uuid-int-001",
      "name": "Web Development",
      "icon": "🌐",
      "category": "Technology",
      "description": "Building websites..."
    },
    ...
  ]
}
```

---

### 11. Replace All My Interests
```
PUT /api/interests/my
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "interestIds": ["uuid-1", "uuid-2", "uuid-3"]
}

Success Response (200):
{
  "success": true,
  "message": "Interests updated successfully"
}
```

---

### 12. Remove Single Interest
```
DELETE /api/interests/my/{interestId}
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "message": "Interest removed successfully"
}
```

---

## 📅 Event Endpoints

### 13. Get All Events
```
GET /api/events?page=1&limit=5
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": {
    "events": [
      {
        "_id": "uuid-evt-001",
        "title": "AI Workshop",
        "description": "Learn ML basics",
        "date": "2025-11-25T14:00:00.000Z",
        "location": "Computer Lab 3",
        "category": "Workshop",
        "organizer": "BITSA Tech Club",
        "attendees": 45,
        "maxAttendees": 50,
        "imageUrl": "...",
        "isRegistered": false
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "totalEvents": 15,
      "totalPages": 3
    }
  }
}
```

---

### 14. Get Single Event
```
GET /api/events/{eventId}
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": { ...eventDetails }
}
```

---

### 15. Register for Event
```
POST /api/events/{eventId}/register
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "message": "Successfully registered for event"
}
```

---

## 📝 Blog Endpoints

### 16. Get All Blogs
```
GET /api/blogs?page=1&limit=5
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": {
    "blogs": [
      {
        "_id": "uuid-blog-001",
        "title": "Getting Started with React Hooks",
        "slug": "getting-started-react-hooks",
        "excerpt": "A comprehensive guide...",
        "author": {
          "id": "uuid-author-001",
          "name": "Jane Smith",
          "avatar": "..."
        },
        "category": "Web Development",
        "tags": ["React", "JavaScript"],
        "coverImage": "...",
        "views": 1245,
        "likes": 89,
        "comments": 23,
        "publishedAt": "2025-11-15T10:00:00.000Z"
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "totalBlogs": 47,
      "totalPages": 10
    }
  }
}
```

---

### 17. Get Single Blog
```
GET /api/blogs/{blogId}
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": { ...fullBlogContent }
}
```

---

## 👥 Community Endpoints

### 18. Get All Communities
```
GET /api/communities
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "uuid-comm-001",
      "name": "Web Developers Guild",
      "description": "Community for web dev enthusiasts",
      "category": "Technology",
      "icon": "🌐",
      "memberCount": 234,
      "isPublic": true,
      "isMember": true,
      "createdAt": "2025-01-15T00:00:00.000Z"
    },
    ...
  ]
}
```

---

### 19. Join Community
```
POST /api/communities/{communityId}/join
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "message": "Successfully joined community"
}
```

---

## 👤 User Profile Endpoints

### 20. Get Current User Profile
```
GET /api/users/me
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": {
    "id": "uuid-user-001",
    "schoolId": "SCT123456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@student.ueab.ac.ke",
    "major": "Computer Science",
    "role": "Student",
    "profilePicture": "...",
    "emailVerified": true,
    "createdAt": "2025-11-15T08:00:00.000Z"
  }
}
```

---

### 21. Update User Profile
```
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "major": "Software Engineering",
  "bio": "Passionate about AI and web development"
}

Success Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ...updatedUserData }
}
```

---

## 📊 Statistics Endpoints

### 22. Get Dashboard Stats
```
GET /api/stats/dashboard
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "data": {
    "totalEvents": 15,
    "registeredEvents": 3,
    "totalBlogs": 47,
    "totalCommunities": 12,
    "joinedCommunities": 5,
    "selectedInterests": 4,
    "courseProgress": 80
  }
}
```

---

## 🔄 Token Refresh

### 23. Refresh Access Token
```
POST /api/auth/refresh
Content-Type: application/json

Request Body:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Success Response (200):
{
  "success": true,
  "token": "new_access_token...",
  "refreshToken": "new_refresh_token..."
}
```

---

## 🚪 Logout

### 24. Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📌 Common Headers

All authenticated requests require:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## ⚠️ Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Token invalid/expired |
| 403 | Forbidden | Email not verified / No permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email/ID |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Contact support |

---

## 🔐 Token Lifetimes

| Token Type | Lifetime | Storage |
|------------|----------|---------|
| Access Token (JWT) | 1 hour | Redux + localStorage |
| Refresh Token | 7 days | Redux + localStorage |
| Verification Token | 24 hours | Database only |
| Password Reset Token | 1 hour | Database only |

---

## 📝 Request Examples (cURL)

### Login Example
```bash
curl -X POST https://api.ueab.ac.ke/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@student.ueab.ac.ke",
    "password": "SecurePass123!"
  }'
```

### Get Events Example
```bash
curl -X GET https://api.ueab.ac.ke/events?page=1&limit=5 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Save Interests Example
```bash
curl -X POST https://api.ueab.ac.ke/interests/my \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "interestIds": ["uuid-1", "uuid-2", "uuid-3"]
  }'
```

---

## 🎯 Frontend Usage (RTK Query)

### Example Hook Usage
```typescript
// Login
const [login, { isLoading, error }] = useLoginMutation();
await login({ email, password }).unwrap();

// Check Interests
const { data, isLoading } = useCheckMyInterestsQuery();

// Get Events
const { data: events } = useGetAllEventsQuery({ page: 1, limit: 5 });

// Save Interests
const [addInterests] = useAddMyInterestsMutation();
await addInterests({ interestIds }).unwrap();
```

---

**Last Updated:** November 19, 2025  
**API Version:** 1.0  
**Base URL:** `https://api.ueab.ac.ke` (Production)  
**Base URL:** `http://localhost:3000` (Development)
