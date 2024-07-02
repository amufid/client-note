import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import instance from "../../lib/instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import GoogleIcon from "../../components/icon/Google";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await instance.post('/auth/login', {
            email: email,
            password: password,
         });

         toast.success('Login successfully');
         const token = Cookies.set("accessToken", res.data.accessToken);

         if (token) {
            window.history.pushState(null, "", '/note');
            setTimeout(() => {
               window.location.reload()
            }, 1000)
         }
      } catch (error) {
         setLoading(false)
         toast.error('Email or password wrong!');
      }
   };

   return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center">
         <div className="flex justify-center mx-auto">
            <div className="mx-auto rounded-md border border-gray-500">
               <h1 className="text-2xl mt-5 text-center text-black dark:text-white">Login</h1>
               <div className="flex flex-col w-96 p-7" >
                  <form onSubmit={handleSubmit} className="max-w-md gap-y-4">
                     <div className="mb-2">
                        <div className="mb-2 block">
                           <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                           id="email"
                           type="email"
                           name="email"
                           placeholder="Email"
                           required shadow
                           onChange={(e) => setEmail(e.target.value)} />
                     </div>
                     <div className="mb-2">
                        <div className="mb-2 block">
                           <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                           id="password"
                           type={`${showPassword ? 'text' : 'password'}`}
                           name="password"
                           required shadow
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Password" />
                     </div>
                     <div className="flex items-center gap-2 justify-end mb-2">
                        <Label htmlFor="agree" className="flex">
                           Show password
                        </Label>
                        <Checkbox id="agree" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                     </div>
                     <Button type="submit" className="w-full">{loading ? 'Loading...' : 'Login'}</Button>
                     <div className="my-3">
                        <label htmlFor="register " className="text-black dark:text-white">
                           Don&apos;t you have an account yet?
                           <span className="text-blue-400"><Link to="/register"> sign up here</Link></span>
                        </label>
                     </div>
                  </form>
                  <hr style={{ borderTop: "1px solid lightgrey", marginBottom: "20px" }}></hr>
                  <div>
                     <a href="http://localhost:5000/api/oauth/google" >
                        <button className="bg-slate-100 w-full rounded-sm shadow-md text-slate-500 justify-center flex flex-row p-2 gap-3 hover:bg-slate-300">
                           <span><GoogleIcon /></span><span>Sign in with Google</span>
                        </button>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
