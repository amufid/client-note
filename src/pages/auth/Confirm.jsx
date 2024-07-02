import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Confirm() {
   const location = useLocation();
   const [getToken, setToken] = useState('')

   useEffect(() => {
      const params = new URLSearchParams(location.search)
      const token = params.get('token')
      if (token) {
         setToken(token)
         Cookies.set('accessToken', getToken)
         window.history.pushState(null, '', '/note');
         if (Cookies.get('accessToken')) {
            window.location.reload();
         }
      }
   }, [location.search, getToken])

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
         <Spinner aria-label="Center-aligned spinner example" size='xl' />
      </div>
   )
}
