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

        {/* Protected Routes - Student Dashboard */}
        <Route
          path="/dashboard"
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
