import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import instance from "../../lib/instance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      // check password 
      if (password.length < 6) {
         toast.error('Password must be at least 6 characters');
         return;
      }

      if (e.target.password.value !== e.target.repeatPassword.value) {
         toast.error('Password does not match');
         return;
      }

      try {
         await instance.post('/auth/register', {
            username: username,
            email: email,
            password: password,
         });
         toast.success('Register successfully');
         navigate('/login');
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   };

   return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center">
         <div className="flex justify-center mx-auto">
            <div className="mx-auto rounded-md border border-gray-500">
               <h1 className="text-2xl mt-5 text-center text-black dark:text-white">Register</h1>
               <form className="flex max-w-md flex-col gap-3 w-96 p-7" onSubmit={handleSubmit}>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="Username" value="User name" />
                     </div>
                     <TextInput
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required shadow
                        onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
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
                        <Label htmlFor="password" value="Your password" />
                     </div>
                     <TextInput
                        id="password"
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        required shadow
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="repeatPassword" value="Repeat password" />
                     </div>
                     <TextInput
                        id="repeatPassword"
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="repeatPassword"
                        required shadow
                        placeholder="Repeat password" />
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                     <Label htmlFor="agree" className="flex">
                        Show password
                     </Label>
                     <Checkbox id="agree" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                  </div>
                  <Button type="submit">Register new account</Button>
               </form>
            </div>
         </div>
      </div>
   )
}
