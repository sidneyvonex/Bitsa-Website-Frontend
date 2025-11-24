
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner';


import './App.css'
import { NotFound } from './Pages/NotFound'
import { Home } from './Pages/Home'
import { AboutPage } from './Pages/About'
import Events from './Pages/Events'
import { EventDetails } from './Pages/EventDetails'
import { Blogs } from './Pages/Blogs'
import { BlogDetails } from './Pages/BlogDetails'
import { Leaders } from './Pages/Leaders'
import { HelpButton } from './Components/HelpButton'
import Gallery from './Pages/Gallery'
import SignUpPage from './Pages/SignUp'
import { EmailVerificationPage } from './Pages/EmailVerification'
import ResetPasswordPage from './Pages/ResetPassword'
import ForgotPasswordPage from './Pages/ForgotPassword'
import SignInPage from './Pages/SignIn'
import Marketplace from './Pages/MarketPlace'
import { ProtectedRoute } from './Components/ProtectedRoutes'
import Communities from './Pages/Communities'
import Projects from './Pages/Projects'
import { StudentDashboard } from './Pages/StudentDashboard'
import { StudentDashboardOverview } from './Components/StudentDashboard/StudentDashboardOverview'
import { StudentEvents } from './Components/StudentDashboard/Events'
import { StudentBlogs } from './Components/StudentDashboard/Blogs'
import { StudentCommunities } from './Components/StudentDashboard/Communities'
import { StudentProjects } from './Components/StudentDashboard/Projects'
import { StudentProfile } from './Components/StudentDashboard/Profile'
import { StudentSettings } from './Components/StudentDashboard/Settings'
import { StudentEventDetail } from './Components/StudentDashboard/EventDetail'
import { StudentBlogDetail } from './Components/StudentDashboard/BlogDetail'
import { StudentProjectDetail } from './Components/StudentDashboard/ProjectDetail'
import Help from './Pages/Help'
import AdminDashboard from './Pages/AdminDashboard'
import { AdminDashboardOverview } from './Components/AdminDasboard/AdminDashboardOverview'
import { AdminBlogs } from './Components/AdminDasboard/AdminBlogs'
import { AdminEvents } from './Components/AdminDasboard/AdminEvents'
import { AdminCommunities } from './Components/AdminDasboard/AdminCommunities'
import { AdminProjects } from './Components/AdminDasboard/AdminProjects'
import { AdminInterests } from './Components/AdminDasboard/AdminInterests'
import { AdminReports } from './Components/AdminDasboard/AdminReports'
import { AdminProfile } from './Components/AdminDasboard/AdminProfile'
import { AdminSettings } from './Components/AdminDasboard/AdminSettings'
import SuperAdminDashboard from './Pages/SuperAdminDashboard'
import { UserManagement } from './Components/SuperAdminDashboard/UserManagement'
import { AuditLogs } from './Components/SuperAdminDashboard/AuditLogs'
import { LeadersManagement } from './Components/SuperAdminDashboard/LeadersManagement'
import { PartnerManagement } from './Components/SuperAdminDashboard/PartnerManagement'
import { DashboardLayout } from './Components/DashboardDesign/AllDashboardLayout'
import { Contact } from './Pages/Contact';
import { EventsCalendarView } from './Pages/EventsCalendarview';
// import {  useEffect, useState } from 'react'
// import { LoadingScreen } from './Components/LoadingScreen'

// SuperAdmin sub-page components
const SuperAdminUsersPage = () => (
  <DashboardLayout userRole="SuperAdmin">
    <UserManagement />
  </DashboardLayout>
);

const SuperAdminLogsPage = () => (
  <DashboardLayout userRole="SuperAdmin">
    <AuditLogs />
  </DashboardLayout>
);

const SuperAdminLeadersPage = () => (
  <DashboardLayout userRole="SuperAdmin">
    <LeadersManagement />
  </DashboardLayout>
);

const SuperAdminPartnersPage = () => (
  <DashboardLayout userRole="SuperAdmin">
    <PartnerManagement />
  </DashboardLayout>
);

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);
  const router = createBrowserRouter([
    //Open routes
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: 'events',
      children: [
        {
          index: true,
          element: <Events />
        },
        {

          path: 'calendar-view',
          element: <EventsCalendarView />

        },
        {
          path: ':eventId',
          element: <EventDetails />
        }
      ]
    },
    {
      path: '/about',
      element: <AboutPage />,
      errorElement: <NotFound />
    },
    {
      path: 'blogs',
      children: [
        {
          index: true,
          element: <Blogs />
        },
        {
          path: ':slug',
          element: <BlogDetails />
        }
      ]
    },
    {
      path: 'communities',
      element: <Communities />,
      errorElement: <NotFound />
    }, {
      path: 'about/leadership',
      element: <Leaders />,
      errorElement: <NotFound />
    },
    {
      path: 'gallery',
      element: <Gallery />,
      errorElement: <NotFound />
    },
    {
      path: 'shop',
      element: <Marketplace />,
      errorElement: <NotFound />
    },
    {
      path: 'projects',
      element: <Projects />,
      errorElement: <NotFound />
    },
  
          {
      path: 'contact',
      element: <Contact />,
      errorElement: <NotFound />
    
    },
    {
      path: 'signup',
      element: <SignUpPage />,
      errorElement: <NotFound />

    },
    {
      path: 'login',
      element: <SignInPage />,
      errorElement: <NotFound />
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />,
      errorElement: <NotFound />
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />,
      errorElement: <NotFound />
    },
    {
      path: 'verify-email',
      element: <EmailVerificationPage />,
      errorElement: <NotFound />
    },

    //Protected routes
    //1.student routes
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute requiredRole={['Student']}>
          <StudentDashboard />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        //Student Nested Routes
        {
          index: true,
          element: <StudentDashboardOverview />,
        },
        // {
        //   path: "profile",
        //   element: <StudentProfile />,
        // },
        {
          path: "events",
          element: <StudentEvents />
        },
        {
          path: "events/:eventId",
          element: <StudentEventDetail />
        },
        {
          path: "blogs",
          element: <StudentBlogs />
        },
        {
          path: "blogs/:slug",
          element: <StudentBlogDetail />
        },
        {
          path: "communities",
          element: <StudentCommunities />
        },
        {
          path: "profile",
          element: <StudentProfile />
        },
        {
          path: "settings",
          element: <StudentSettings />
        },
        {
          path: 'projects',
          element: <StudentProjects />
        },
        {
          path: "projects/:projectId",
          element: <StudentProjectDetail />
        },
        {
          path: "help",
          element: <Help />
        }

      ]
    },
    //2.admin routes
    {
      path: 'admindashboard',
      element: (
        <ProtectedRoute requiredRole={['Admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        //Admin Nested Routes
        {
          index: true,
          element: <AdminDashboardOverview />,
        },
        // {
        //   path: "profile",
        //   element: <StudentProfile />,
        // },
        {
          path: "events",
          element: <AdminEvents />
        },
        {
          path: "blogs",
          element: <AdminBlogs />
        },
        {
          path: "communities",
          element: <AdminCommunities />
        },
        {
          path: "projects",
          element: <AdminProjects />
        },
        {
          path: "interests",
          element: <AdminInterests />
        },
        {
          path: "reports",
          element: <AdminReports />
        },
        {
          path: "profile",
          element: <AdminProfile />
        },
        {
          path: "settings",
          element: <AdminSettings />
        }

      ]
    },
    //3.superadmin routes
    {
      path: 'superadmin',
      element: (
        <ProtectedRoute requiredRole={['SuperAdmin']}>
          <SuperAdminDashboard />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: 'users',
          element: <SuperAdminUsersPage />
        },
        {
          path: 'logs',
          element: <SuperAdminLogsPage />
        },
        {
          path: 'leaders',
          element: <SuperAdminLeadersPage />
        },
        {
          path: 'partners',
          element: <SuperAdminPartnersPage />
        }
      ]
    }
  ])

  return (
    <>
      {/* {loading && <LoadingScreen />} */}
      <HelpButton />
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App
