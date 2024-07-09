import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import { toast } from "react-toastify";
import { Button, Modal, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsPinAngleFill } from "react-icons/bs";
import { RiUnpinFill } from "react-icons/ri";

export default function ModalPinNote() {
   const [notes, setNotes] = useState([]);
   const [openModal, setOpenModal] = useState(false);

   const getNotes = async () => {
      try {
         const res = await instance.get('/notes?isPinned=true')
         setNotes(res.data.data)
      } catch (error) {
         toast.error('Something went wrong')
      }
   }

   useEffect(() => {
      getNotes()
   }, [])

   function handleModal() {
      getNotes()
      setOpenModal(true)
   }

   const handleUpdate = async (id) => {
      try {
         await instance.put(`/notes/${id}`, { isPinned: false })
         toast.success('Note unpinned')
         getNotes()
      } catch (error) {
         toast.error('Failed update')
      }
   }

   return (
      <div>
         <Button color='purple' onClick={handleModal}>
            <span className="flex flex-row">
               <BsPinAngleFill />
               <span className="ml-2">Pinned</span>
            </span>
         </Button>
         <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} className="text-slate-700 dark:text-slate-300">
            <Modal.Header>
               <span className="flex flex-row">
                  <BsPinAngleFill />
                  <span className="ml-3">Pinned notes</span>
               </span>
            </Modal.Header>
            <Modal.Body>
               {notes.map(note => (
                  <Card key={note.id}>
                     <div className="space-y-6 p-6" >
                        <div className="flex justify-between">
                           <Link to='/detailNote' state={{ id: note.id }}>
                              <h2 className='text-lg sm:text-xl tracking-tight hover:dark:text-blue-500 hover:text-blue-400 mr-2'>
                                 {note.title}
                              </h2>
                           </Link>
                           <button onClick={() => handleUpdate(note.id)}><RiUnpinFill /></button>
                        </div>
                        <pre className="responsive-pre text-sm leading-relaxed">
                           {note.content}
                        </pre>
                        <div className='grid grid-cols-3 justify-center items-center'>
                           {note.attachment.map((note) => (
                              <div key={note.id} className='m-1'>
                                 <img src={note.file_path} alt="image" className='w-[150px] h-auto mb-2' />
                              </div>
                           ))}
                        </div>
                     </div>
                  </Card>
               ))}
            </Modal.Body>
         </Modal>
      </div>
   )
}
