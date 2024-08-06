import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './auth/Signin.jsx';
import Signup from './auth/Signup.jsx';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard.jsx';
import CreateRide from './pages/CreateRide.jsx';
import CreateFeedback from './pages/CreateFeedback.jsx'
import FeedbackList from './pages/FeedbackList.jsx'
import FeedbackListAll from './pages/FeedbackListAll.jsx'
const router = createBrowserRouter([{
  path:'/getyourfeedbacks',
   element:  <FeedbackList></FeedbackList>,
   errorElement: <h1>Error</h1>,
 },
 {
  path:'/all-feedbacks',
   element:  <FeedbackListAll></FeedbackListAll>,
   errorElement: <h1>Error</h1>,
 },{
   path:'/dashboard',
    element:  <Dashboard></Dashboard>,
    errorElement: <h1>Error</h1>,
  },
 { path:'/createFeedback',
  element:  <CreateFeedback></CreateFeedback>,
  errorElement: <h1>Error</h1>,
},
 { path:'/auth/signup',
  element: <Signup></Signup>,
  errorElement: <h1>Error</h1>,

},{
  path:'/auth/signin',
  element: <Signin></Signin>,
  errorElement: <h1>Error</h1>,
},
{
  path: '/',
  element: <Dashboard></Dashboard>,
  errorElement: <h1>Error</h1>,
},
{
  path:'/createRide',
  element: <CreateRide></CreateRide>,
  errorElement: <h1>Error</h1>,
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />

  </React.StrictMode>,
)
