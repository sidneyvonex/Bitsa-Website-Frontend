import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoadingScreen } from './Components/LoadingScreen'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Home } from './Pages/HomePage'
import { HelpButton } from './Components/HelpButton'
import { SignInPage } from './Pages/SignInPage'
import { ForgotPasswordPage } from './Pages/ForgotPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
import { SignUpPage } from './Pages/SignUpPage'
import { EmailVerificationPage } from './Pages/EmailVerificationPage'
import DashboardRouter from './Pages/DashboardRouter'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import SuperAdminDashboard from './Pages/SuperAdminDasboard'
import AdminUsersPage from './Components/AdminDashboard/AdminUsersPage'
import AdminEventsPage from './Components/AdminDashboard/AdminEventsPage'
import AdminBlogsPage from './Components/AdminDashboard/AdminBlogsPage'
import AdminCommunitiesPage from './Components/AdminDashboard/AdminCommunitiesPage'
import AdminInterestsPage from './Components/AdminDashboard/AdminInterestsPage'
import AdminReportsPage from './Components/AdminDashboard/AdminReportsPage'
import AdminProfilePage from './Components/AdminDashboard/AdminProfilePage'
import AdminSettingsPage from './Components/AdminDashboard/AdminSettingsPage'
import Help from './Pages/Help'
import NotFoundPage from './Pages/NotFoundPage'
import About from './Pages/About'
import MissionVision from './Pages/MissionVision'
import OurLeaders from './Pages/OurLeaders'
import Constitution from './Pages/Constitution'
import Events from './Pages/Events'
import EventDetails from './Pages/EventDetails'
import Blogs from './Pages/Blogs'
import BlogDetails from './Pages/BlogDetails'
import Communities from './Pages/Communities'
import Projects from './Pages/Projects'
import ProjectDetails from './Pages/ProjectDetails'
import Gallery from './Pages/Gallery'
import Marketplace from './Pages/Marketplace'
import Contact from './Pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <HelpButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/help" element={<Help />} />

        {/* About Us Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<MissionVision />} />
        <Route path="/leadership" element={<OurLeaders />} />
        <Route path="/constitution" element={<Constitution />} />

        {/* Events Pages */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/upcoming" element={<Events />} />
        <Route path="/events/past" element={<Events />} />
        <Route path="/events/calendar-view" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Content Pages */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Resources Pages */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes - Student Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole={['Student']}>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminBlogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/communities"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminCommunitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/interests"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminInterestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
              <AdminSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - SuperAdmin Dashboard */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute requiredRole={['SuperAdmin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for 404 - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
