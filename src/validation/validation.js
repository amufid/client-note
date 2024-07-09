import * as z from 'zod'

export const userForm = z.object({
   username: z.string().min(3, 'Username must be at least 3 characters !'),
   email: z.string().email('Invalid email !'),
   password: z.string().min(6, 'Password must be at least 6 characters !'),
   repeatPassword: z.string().min(6, 'Password must be at least 6 characters !'),
}).refine((data) => data.password === data.repeatPassword, {
   message: `Passwords do not match !`,
   path: ['repeatPassword']
})
