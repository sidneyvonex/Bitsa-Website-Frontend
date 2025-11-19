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
import StudentDashboard from './Pages/StudentDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import SuperAdminDashboard from './Pages/SuperAdminDasboard'
import Help from './Pages/Help'
import { Events } from './Pages/Events'
import { Blogs } from './Pages/Blogs'
import Communities from './Pages/Communities'
import { EventDetails } from './Pages/EventDetails'
import About from './Pages/About'
import MissionVision from './Pages/MissionVision'
import OurLeaders from './Pages/OurLeaders'
import Constitution from './Pages/Constitution'
import Projects from './Pages/Projects'
import ProjectDetails from './Pages/ProjectDetails'
import Gallery from './Pages/Gallery'
import Marketplace from './Pages/Marketplace'

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
        <Route path="/events" element={<Events />} />
        <Route path="/events/upcoming" element={<Events />} />
        <Route path="/events/past" element={<Events />} />
        <Route path="/events/calendar-view" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<MissionVision />} />
        <Route path="/leadership" element={<OurLeaders />} />
        <Route path="/constitution" element={<Constitution />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Protected Routes - Student Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole={['Student']}>
              <StudentDashboard />
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

        {/* Protected Routes - SuperAdmin Dashboard */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute requiredRole={['SuperAdmin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
