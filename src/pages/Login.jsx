import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import instance from "../lib/instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await instance.post('/auth/login', {
            email: email,
            password: password,
         });
         const accessToken = Cookies.set("accessToken", res.data.accessToken);

         if (accessToken) {
            navigate("/note", { replace: true });
            window.location.reload()
            toast.success('Login successfully');
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center">
         <div className="flex justify-center mx-auto">
            <div className="mx-auto rounded-md border border-gray-500">
               <h1 className="text-2xl mt-5 text-center text-black dark:text-white">Login</h1>
               <form className="flex max-w-md flex-col gap-3 w-96 p-7" onSubmit={handleSubmit}>
                  <div>
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
                  <div>
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
                  <div className="flex items-center gap-2 justify-end">
                     <Label htmlFor="agree" className="flex">
                        Show password
                     </Label>
                     <Checkbox id="agree" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                  </div>
                  <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>
                  <div className="my-3">
                     <label htmlFor="register " className="text-black dark:text-white">
                        Don&apos;t you have an account yet?
                        <span className="text-blue-400"><Link to="/register"> sign up here</Link></span>
                     </label>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}
