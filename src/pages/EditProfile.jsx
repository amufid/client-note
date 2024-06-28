import { useState, useEffect } from 'react';
import instance from '../lib/instance';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const getUser = async () => {
      try {
         const res = await instance.get('/users/:id')
         setUsername(res.data.data.username)
         setEmail(res.data.data.email)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getUser()
   }, [])

   const handleUpdate = (e) => {
      e.preventDefault();

      if (password.length < 6) {
         toast.error('Password must be at least 6 characters');
         return;
      }

      if (e.target.password.value !== e.target.repeatPassword.value) {
         toast.error('Password does not match');
         return;
      }

      try {
         instance.put('/users/:id', {
            username: username,
            email: email,
            password: password,
         })
         toast.success('Update successfully');
         getUser();
         navigate('/note');
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center'>
         <div className="flex justify-center mx-auto">
            <div className="mx-auto border-gray-400 rounded-md">
               <h1 className="text-2xl mt-5 text-center text-black dark:text-white">Edit Profile</h1>
               <form className="flex max-w-md flex-col gap-3 w-[350px] sm:w-96 p-7" onSubmit={handleUpdate}>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="Username" value="Username" />
                     </div>
                     <TextInput
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required shadow
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                  </div>
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
                        value={email}
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
                  <Button type="submit">Update</Button>
               </form>
            </div>
         </div>
      </div>
   )
}