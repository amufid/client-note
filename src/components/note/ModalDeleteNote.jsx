import instance from "../../lib/instance";
import PropTypes from 'prop-types';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiDelete } from "react-icons/fi";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Button, Modal } from "flowbite-react";

ModalDeleteNote.propTypes = {
   note: PropTypes.object,
   refetch: PropTypes.func
}

export default function ModalDeleteNote({ note, refetch }) {
   const [modal, setModal] = useState(false);

   const handleDelete = async () => {
      try {
         await instance.delete(`/notes/${note.id}`)
         toast.success('Note deleted successfully')
         setModal(false);
         refetch();
      } catch (error) {
         console.log(error);
      }
   }

   const handleModal = () => {
      setModal(!modal)
   }

   return (
      <>
         <Button color='red' onClick={() => handleModal()} className="w-10 h-10 mr-2 flex items-center">
            <FiDelete />
         </Button>
         <Modal show={modal} size="md"
            onClose={() => setModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                     Are you sure you want to delete {note.title}?
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure"
                        onClick={() => handleDelete()}>
                        {"Yes, I'm sure"}
                     </Button>
                     <Button color="gray"
                        onClick={() => setModal(false)}>
                        No, cancel
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}
