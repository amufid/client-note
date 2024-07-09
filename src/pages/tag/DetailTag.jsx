import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import { useLocation } from "react-router-dom";
import { convertTime } from "../../lib/convertTime";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DetailTag() {
   const [tag, setTag] = useState([])
   const location = useLocation();
   const { id } = location.state;

   useEffect(() => {
      const getCategory = async () => {
         try {
            const res = await instance.get(`/tags/${id}`)
            setTag(res.data.data.note_tags)
         } catch (error) {
            console.log(error)
         }
      }
      getCategory()
   }, [id])

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen text-slate-700 dark:text-slate-300'>
         <div className='flex justify-center'>
            <div className='flex flex-col my-5'>
               {tag.map(tag => (
                  <Card key={tag} className="max-w-xl mb-2 mx-5">
                     <div className='flex flex-row justify-between'>
                        <div>
                           <Link to='/detailNote' state={{ id: tag.note.id }}>
                              <h2 className='text-xl font-bold tracking-tight hover:dark:text-blue-500 hover:text-blue-400'>
                                 {tag.note.title}
                              </h2>
                           </Link>
                        </div>
                     </div>
                     <p className='text-xs'>{convertTime(tag.note.created_at)}</p>
                     <pre className='responsive-pre text-sm'> {tag.note.content}</pre>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   )
}
