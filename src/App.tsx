
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
import { StudentDashboard } from './Pages/StudentDashboard'
import { StudentDashboardOverview } from './Components/StudentDashboard/StudentDashboardOverview'
import { StudentEvents } from './Components/StudentDashboard/Events'
import AdminDashboard from './Pages/AdminDashboard'
import { AdminDashboardOverview } from './Components/AdminDasboard/AdminDashboardOverview'
import { SuperAdminDashboard } from './Pages/SuperAdminDashboard'
// import {  useEffect, useState } from 'react'
// import { LoadingScreen } from './Components/LoadingScreen'



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
      element: <div>Communities Page</div>,
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
      element: <div>Projects </div>,
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
          path: "blogs",
          element: <div>Student Blogs Page</div>
        },
        {
          path: "communities",
          element: <div>Student Communities Page</div>
        },
        {
          path: "settings",
          element: <div>Student Settings Page</div>
        },
        {
          path: 'projects',
          element: <div>Student Projects Page</div>
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
          element: <div>AdminEvents</div>
        },
        {
          path: "blogs",
          element: <div>AdminBlogs</div>
        },
        {
          path: "communities",
          element: <div>AdminCommunities</div>
        },
        {
          path: "settings",
          element: <div>AdminSettings</div>
        },
        {
          path: 'projects',
          element: <div>AdminProjects</div>
        }

      ]
    },
    //3.superadmin routes
    {
      path: 'admindashboard',
      element: (
        <ProtectedRoute requiredRole={['SuperAdmin']}>
          <SuperAdminDashboard />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        //Admin Nested Routes
        // {
        //   index: true,
        //   element: <SuperAdminDashboardOverview />,
        // },
        // {
        //   path: "profile",
        //   element: <StudentProfile />,
        // },
        {
          path: "events",
          element: <div>SuperAdminEvents</div>
        },
        {
          path: "blogs",
          element: <div>SuperAdminBlogs</div>
        },
        {
          path: "communities",
          element: <div>SuperAdminCommunities</div>
        },
        {
          path: "settings",
          element: <div>SuperAdminSettings</div>
        },
        {
          path: 'projects',
          element: <div>SuperAdminProjects</div>
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
