import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { NotFound } from './Pages/NotFound'
import { Home } from './Pages/Home'
import { AboutPage } from './Pages/About'
import  Events  from './Pages/Events'
import { EventDetails } from './Pages/EventDetails'
import { Blogs } from './Pages/Blogs'
import { BlogDetails } from './Pages/BlogDetails'
import { Leaders } from './Pages/Leaders'
import { HelpButton } from './Components/helpButton'
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
    element: <Home/>,
    errorElement:<NotFound/>
  },
  {
    path:'events',
    children:[
      {
        index:true,
        element:<Events/>
      },
      {
        path:':eventId',
        element:<EventDetails/>
      }
    ]
  },
  {
    path:'/about',
    element:<AboutPage/>,
    errorElement:<NotFound/>
  },
  {
    path:'blogs',
    children:[
      {
        index:true,
        element:<Blogs/>
      },
      {
        path:':blogId',
        element:<BlogDetails/>
      }
    ]
  },
  {
    path:'communities',
    element:<div>Communities Page</div>,
    errorElement:<NotFound/>
  },{
    path:'about/leadership',
    element:<Leaders/>,
    errorElement:<NotFound/>
  }
])

  return (
    <>
      {/* {loading && <LoadingScreen />} */}
      <HelpButton />
      <RouterProvider router={router} />
    </>
  );
}

export default App
