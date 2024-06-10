import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider.jsx";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'
import Note from "../pages/Note.jsx";
import Category from "../pages/Category.jsx";
import DetailNote from "../pages/DetailNote.jsx";
import Tag from "../pages/Tag.jsx";
import Profile from "../pages/EditProfile.jsx";
import DetailCategory from "../pages/DetailCategory.jsx";
import DetailTag from "../pages/DetailTag.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const Routes = () => {
   const { accessToken } = useAuth();

   const routesForPublic = [
      {
         path: '/',
         element: <Dashboard />,
      },
      {
         path: '/login',
         element: <Login />,
      },
      {
         path: '/register',
         element: <Register />,
      },
      {
         path: '/*',
         element: <h1>Page not found</h1>,
      },
   ];

   // route hanya bisa diakases oleh user yang sudah login
   const routesForAuthenticated = [
      {
         path: '/',
         element: <ProtectedRoute />,
         children: [
            {
               path: '/category',
               element: <Category />,
            },
            {
               path: '/category/:id',
               element: <DetailCategory />,
            },
            {
               path: '/tag',
               element: <Tag />,
            },
            {
               path: '/tag/:id',
               element: <DetailTag />,
            },
            {
               path: '/note',
               element: <Note />,
            },
            {
               path: '/note/:id',
               element: <DetailNote />,
            },
            {
               path: '/profile',
               element: <Profile />,
            },
         ]
      }
   ];

   const routesForNotAuthenticatedOnly = [
      {
         path: "/",
         element: <Dashboard />,
      },
      {
         path: "/login",
         element: <Login />,
      },
   ];

   const router = createBrowserRouter([
      ...routesForPublic,
      ...(!accessToken ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticated
   ])

   return <RouterProvider router={router} />
}

export default Routes;
