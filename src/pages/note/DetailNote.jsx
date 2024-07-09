import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import instance from '../../lib/instance'
import { Button } from 'flowbite-react'
import { convertTime } from '../../lib/convertTime';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DetailNote() {
   const [note, setNote] = useState({})
   const [images, setImages] = useState([])
   const location = useLocation();
   const { id } = location.state || {};

   useEffect(() => {
      const getNote = async () => {
         try {
            const res = await instance.get(`/notes/${id}`)
            const image_path = res.data.data.attachment.map((attachment) => attachment.file_path)
            setNote(res.data.data)
            setImages(image_path)
         } catch (error) {
            console.log(error)
         }
      }
      getNote()
   }, [id])

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen text-slate-700 dark:text-slate-300'>
         <div className="p-2 sm:p-5 flex justify-center items-center">
            <div className="h-auto dark:bg-gray-800 flex rounded-sm sm:w-1/2 w-full shadow-md">
               <div className='m-5 sm:m-10 w-full'>
                  <div className='flex justify-end'>
                     <Link to='/note'><Button>Back</Button></Link>
                  </div>
                  <h3 className='text-2xl mb-2 font-bold'>{note.title}</h3>
                  {note.created_at && <p className=''>{convertTime(note.created_at)}</p>}
                  <pre className='responsive-pre my-3'>{note.content}</pre>
                  <div className='flex flex-row'>
                     {Array.isArray(note.note_categories) && note.note_categories.map((note) => (
                        <div key={note.id}>
                           <p className='my-3 mr-3'>Category: {note.category.name}</p>
                        </div>
                     ))}
                     {Array.isArray(note.note_tags) && note.note_tags.map((note) => (
                        <div key={note.id}>
                           <p className='my-3'>Tag: {note.tag.name}</p>
                        </div>
                     ))}
                  </div>
                  {images[0] && (
                     <div className='flex justify-center'>
                        <div className="h-auto w-[300px] sm:w-[530px] rounded-sm">
                           <Carousel useKeyboardArrows={true} showThumbs={false}>
                              {images.map((image, index) => (
                                 <div className="slide" key={index}>
                                    <img src={image} alt="image" className='w-auto h-[300px] sm:h-[400px]' />
                                 </div>
                              ))}
                           </Carousel>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
