import Carousel from '../components/Carousel'
import { Button } from 'flowbite-react'
import Lock from '../components/icon/Lock'
import ImageLogo from '../components/icon/ImageLogo'
import Phone from '../components/icon/Phone'
import { Link } from 'react-router-dom'
import NavbarDashboard from '../components/NavbarDashboard'
import Footer from '../components/Footer'
import Animated from '../lib/animated'

export default function Dashboard() {
   return (
      <>
         <NavbarDashboard />
         <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
            <div className='w-full'>
               <div className='mx-5 md:mx-60 sm:mx-20 h-screen justify-between flex flex-col sm:flex-row items-center'>
                  <div className='w-full sm:w-1/2 px-10 sm:px-5'>
                     <div className='animate-slidein opacity-0 [--slidein-delay:500ms] mt-20 sm:mt-0'>
                        <h1 className='text-5xl text-black dark:text-slate-200 my-5 font-serif'>Welcome to My Note</h1>
                     </div>
                     <div className='animate-slidein opacity-0 [--slidein-delay:1000ms]'>
                        <h1 className='text-xl text-black dark:text-slate-200 my-5 font-thin'>
                           Record your activities and save them easily using My Note, which is a website for recording all your activities easily and is very simple to use. Register now
                        </h1>
                     </div>
                     <div className='animate-slidein opacity-0 [--slidein-delay:1000ms]'>
                        <Link to='/login'><Button size='lg' className='w-44'>Get started free</Button></Link>
                     </div>
                  </div>
                  <div className='mr-5 animate-slidein opacity-0 [--slidein-delay:1300ms] mb-32 sm:mb-0'>
                     <img src="/dash.png" className='w-[420px]' alt="dash" />
                  </div>
               </div>
            </div>
            <Animated from='left'>
               <Carousel />
            </Animated>
            <div className='w-full pb-5'>
               <Animated from='right'>
                  <div className='mx-5 md:mx-60 sm:mx-20 h-auto justify-between flex flex-col sm:flex-row mb-5 mt-3 items-center'>
                     <div className='sm:w-[330px] w-auto mr-2 flex flex-row border border-gray-300 rounded-sm p-2 mb-2'>
                        <div>
                           <h2 className='text-black dark:text-slate-300 text-3xl mb-5'>Secure</h2>
                           <p className='text-black dark:text-slate-300 text-md'>Definitely safe data protection</p>
                        </div>
                        <div className='flex justify-center items-center'>
                           <Lock />
                        </div>
                     </div>
                     <div className='sm:sm:w-[330px] w-auto mr-2 flex flex-row border border-gray-300 rounded-sm p-2 mb-2'>
                        <div>
                           <h2 className='text-black dark:text-slate-300 text-3xl mb-5'>Save the moment</h2>
                           <p className='text-black dark:text-slate-300 text-md'>Can insert images into notes</p>
                        </div>
                        <div className='flex justify-center items-center'>
                           <ImageLogo />
                        </div>
                     </div>
                     <div className='sm:sm:w-[330px] w-auto flex flex-row border border-gray-300 rounded-sm p-2 mb-2 mr-2 sm:mr-0'>
                        <div>
                           <h2 className='text-black dark:text-slate-300 text-3xl mb-5'>Easy access</h2>
                           <p className='text-black dark:text-slate-300 text-md'>Easily accessible via mobile phone and computer</p>
                        </div>
                        <div className='flex justify-center items-center'>
                           <Phone />
                        </div>
                     </div>
                  </div>
               </Animated>
            </div>
         </div>
         <Footer />
      </>
   )
}
