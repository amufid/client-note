import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

export const ProtectedRoute = () => {
   const { accessToken } = useAuth();

   // check if the user is auntheticated 
   if (!accessToken) {
      return <Navigate to="/login" />
   }

   return <Outlet />;
}

export const ReturnPage = () => {
   const { accessToken } = useAuth()

   if (accessToken) {
      return <Navigate to='/note' />
   }

   return <Outlet />
}
