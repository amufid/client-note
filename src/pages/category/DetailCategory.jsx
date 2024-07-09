import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import { useLocation } from "react-router-dom";
import { convertTime } from "../../lib/convertTime";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DetailCategory() {
   const [category, setCategory] = useState([])
   const location = useLocation();
   const { id } = location.state || {};

   useEffect(() => {
      const getCategory = async () => {
         try {
            const res = await instance.get(`/categories/${id}`)
            setCategory(res.data.data.note_category)
         } catch (error) {
            console.log(error)
         }
      }

      getCategory()
   }, [id])

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-700 dark:text-slate-300'>
         <div className='flex justify-center'>
            <div className='flex flex-col my-5'>
               {category.map(category => (
                  <Card key={category} className="max-w-xl mb-2 mx-5">
                     <div className='flex flex-row justify-between'>
                        <div>
                           <Link to='/detailNote' state={{ id: category.note.id }}>
                              <h2 className='text-xl tracking-tight hover:dark:text-blue-500 hover:text-blue-400'>
                                 {category.note.title}
                              </h2>
                           </Link>
                        </div>
                     </div>
                     <p className='text-xs'> {convertTime(category.note.created_at)}</p>
                     <pre className='responsive-pre text-sm'>{category.note.content}</pre>
                  </Card>
               ))}
               {category.length < 1 && <p className="h-screen text-2xl mt-20">Note not found</p>}
            </div>
         </div>
      </div>
   )
}
