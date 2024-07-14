import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import instance from "../../lib/instance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { userForm } from "../../validation/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
   })
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(userForm),
   });

   const handleRegister = async () => {
      setLoading(true)
      try {
         await instance.post('/auth/register', formData);
         toast.success('Register successfully');
         navigate('/login');
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      } finally {
         setLoading(false)
      }
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      })
   }

   return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center">
         <div className="flex justify-center mx-auto">
            <div className="mx-auto rounded-md border border-gray-500">
               <h1 className="text-2xl mt-5 text-center text-black dark:text-white">Register</h1>
               <form className="flex max-w-md flex-col gap-3 w-96 p-7" onSubmit={handleSubmit(handleRegister)}>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="Username" value="Username" />
                     </div>
                     <TextInput
                        {...register('username')}
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={handleChange} />
                     {errors.username && <span className="text-red-600 text-sm">{errors.username.message}</span>}
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                     </div>
                     <TextInput
                        {...register('email')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange} />
                     {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                     </div>
                     <TextInput
                        {...register('password')}
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        required
                        placeholder="Password"
                        onChange={handleChange} />
                     {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="repeatPassword" value="Repeat password" />
                     </div>
                     <TextInput
                        {...register('repeatPassword')}
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="repeatPassword"
                        required
                        placeholder="Repeat password"
                        onChange={handleChange} />
                     {errors.repeatPassword && <span className="text-red-600 text-sm">{errors.repeatPassword.message}</span>}
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                     <Label htmlFor="agree" className="flex">
                        Show password
                     </Label>
                     <Checkbox id="agree" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                  </div>
                  {loading ?
                     <Button disabled>loading...</Button> :
                     <Button type="submit">Register new account</Button>
                  }
               </form>
            </div>
         </div>
      </div>
   )
}
