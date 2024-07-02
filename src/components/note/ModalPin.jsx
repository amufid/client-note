import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import { toast } from "react-toastify";
import { Button, Modal, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { encrypt } from "../../lib/encryptDecrypt";
import { BsPinAngleFill } from "react-icons/bs";

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

   return (
      <div>
         <Button color='purple' onClick={handleModal}>
            <span className="flex flex-row">
               <BsPinAngleFill />
               <span className="ml-2">Pinned</span>
            </span>
         </Button>
         <Modal show={openModal} size='md' onClose={() => setOpenModal(false)}>
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
                        <Link to={`/note/${encrypt(note.id)}`}>
                           <h2 className='text-lg sm:text-2xl tracking-tight text-gray-900 dark:text-white hover:dark:text-blue-500 hover:text-blue-400 mr-2'>
                              {note.title}
                           </h2>
                        </Link>
                        <pre className="responsive-pre text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
