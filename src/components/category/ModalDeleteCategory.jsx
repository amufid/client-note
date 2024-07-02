import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import instance from "../../lib/instance";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { FiDelete } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";

ModalDeleteCategory.propTypes = {
   category: PropTypes.object,
   refetch: PropTypes.func
}

export default function ModalDeleteCategory({ category, refetch }) {
   const [modal, setModal] = useState(false);

   const handleDelete = async () => {
      try {
         await instance.delete(`/categories/${category.id}`)

         toast.success('Category deleted successfully');
         setModal(false);
         refetch();
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
         <div className="flex justify-center mr-0 sm:mr-2 mb-1 sm:mb-0">
            <Button color='red' size='sm' onClick={() => setModal(true)}><FiDelete /></Button>
         </div>
         <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                     Are you sure you want to delete {category.name}?
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure"
                        onClick={() => handleDelete(category.id)}>
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