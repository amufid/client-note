import { useEffect, useState } from "react";
import instance from "../lib/instance";
import { useParams } from "react-router-dom";
import { convertTime } from "../lib/convertTime";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { decrypt } from "../lib/encryptDecrypt";
import { encrypt } from "../lib/encryptDecrypt";

export default function DetailTag() {
   const [tag, setTag] = useState([])
   const { id } = useParams()

   window.history.pushState('page', 'Title', '/tag');

   useEffect(() => {
      const getCategory = async () => {
         try {
            const res = await instance.get(`/tags/${decrypt(id)}`)
            setTag(res.data.data.note_tags)
         } catch (error) {
            console.log(error)
         }
      }

      getCategory()
   }, [id])

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
         <div className='flex justify-center'>
            <div className='flex flex-col my-5'>
               {tag.map(tag => (
                  <Card key={tag} className="max-w-xl mb-2 mx-5">
                     <div className='flex flex-row justify-between'>
                        <div>
                           <Link to={`/note/${encrypt(tag.note.id)}`}>
                              <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:dark:text-blue-500 hover:text-blue-400'>
                                 {tag.note.title}
                              </h2>
                           </Link>
                        </div>
                     </div>
                     <p className='font-normal text-gray-700 dark:text-gray-400'>
                        {tag.note.content}
                     </p>
                     <p className='font-normal text-gray-700 dark:text-gray-400'>Written on : </p>
                     <p className='font-normal text-gray-700 dark:text-gray-400'>
                        {convertTime(tag.note.created_at)}
                     </p>
                  </Card>
               ))}
               {tag.length < 1 && <p className="h-screen font-normal text-2xl text-gray-700 dark:text-gray-400 mt-20">Note not found</p>}
            </div>
         </div>
      </div>
   )
}
