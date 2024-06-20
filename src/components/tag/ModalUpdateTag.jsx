import { Button, Label, Modal, TextInput } from "flowbite-react";
import { toast } from 'react-hot-toast';
import instance from "../../lib/instance";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from 'prop-types';

ModalUpdate.propTypes = {
   tag: PropTypes.object,
   refetch: PropTypes.func
}

export default function ModalUpdate({ tag, refetch }) {
   const [name, setName] = useState(tag.name);
   const [modal, setModal] = useState(false);

   const handleUpdate = async (e) => {
      e.preventDefault();
      try {
         await instance.put(`/tags/${tag.id}`, { name: name })
         toast.success('Tag updated successfully');
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
         <div className="flex justify-center">
            <Button color='blue' size='sm' onClick={handleModal} ><FaRegEdit /></Button>
         </div>
         <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create tag</h3>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="name" value="Nama" />
                     </div>
                     <TextInput
                        name="name"
                        placeholder="Nama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
                  <div className="w-full">
                     <Button onClick={handleUpdate} type='submit'>Save</Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}
