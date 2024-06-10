import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider.jsx";

export const ProtectedRoute = () => {
   const { accessToken } = useAuth();

   // check if the user is auntheticated 
   if (!accessToken) {
      return <Navigate to="/login" />
   }

   return <Outlet />;
}
