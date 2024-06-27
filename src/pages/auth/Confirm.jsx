import { Button, Card } from "flowbite-react";
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
      }
   }, [location.search, getToken])

   return (
      <div className="min-h-screen flex justify-center items-center">
         <Card className="max-w-sm h-52">
            <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white mb-10">
               Sign in with Google successfully
            </h5>
            <a href="/note">
               <Button className="w-full">
                  <p className="text-lg">Ok</p>
               </Button>
            </a>
         </Card>
      </div>
   )
}
