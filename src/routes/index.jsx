import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from '../provider/useAuth'
import { ProtectedRoute, ReturnPage } from "./ProtectedRoute";
import Register from '../pages/auth/Register.jsx'
import Login from '../pages/auth/Login.jsx'
import Note from "../pages/note/Note.jsx";
import Category from "../pages/category/Category.jsx";
import DetailNote from "../pages/note/DetailNote.jsx";
import Tag from "../pages/tag/Tag.jsx";
import Profile from "../pages/EditProfile.jsx";
import DetailCategory from "../pages/category/DetailCategory.jsx";
import DetailTag from "../pages/tag/DetailTag.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Confirm from "../pages/auth/Confirm.jsx";
import NotFound from "../pages/NotFound.jsx";

const Routes = () => {
   const { accessToken } = useAuth();

   const routesForPublic = [
      {
         element: <ReturnPage />,
         children: [
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
               path: '/google-auth',
               element: <Confirm />,
            },
            {
               path: '/*',
               element: <NotFound />,
            },
         ]
      }
   ];

   // route hanya bisa diakases oleh user yang sudah login
   const routesForAuthenticated = [
      {
         element: <ProtectedRoute />,
         children: [
            {
               path: '/category',
               element: <Category />,
            },
            {
               path: '/detailCategory',
               element: <DetailCategory />,
            },
            {
               path: '/tag',
               element: <Tag />,
            },
            {
               path: '/detailTag',
               element: <DetailTag />,
            },
            {
               path: '/note',
               element: <Note />,
            },
            {
               path: '/detailNote',
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
