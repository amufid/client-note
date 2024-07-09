import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../provider/useAuth";

export default function Confirm() {
   const location = useLocation();
   const { setToken, setRefreshToken } = useAuth();

   useEffect(() => {
      const params = new URLSearchParams(location.search)
      const accessToken = params.get('token')
      const refreshToken = params.get('refreshToken')

      if (accessToken) {
         setToken(accessToken)
         setRefreshToken(refreshToken)
         window.location.href = '/note'
      }
   }, [location.search, setToken, setRefreshToken])

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
         <Spinner aria-label="Center-aligned spinner example" size='xl' />
      </div>
   )
}
