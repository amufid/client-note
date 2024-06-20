import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import instance from "../../lib/instance";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

ModalUpdateCategory.propTypes = {
   category: PropTypes.object,
   refetch: PropTypes.func
}

export default function ModalUpdateCategory({ category, refetch }) {
   const [name, setName] = useState(category.name);
   const [description, setDescription] = useState(category.description);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleUpdate = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
         await instance.put(`/categories/${category.id}`, {
            name: name,
            description: description
         })

         setModal(false);
         setLoading(false);
         toast.success('Category updated successfully');
         refetch();
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <>
         <div className="flex justify-center">
            <Button color='blue' size='sm' onClick={() => setModal(true)}><FaRegEdit /></Button>
         </div>
         <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create category</h3>
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
                  <div className="max-w-md">
                     <div className="mb-2 block">
                        <Label htmlFor="description" value="Deskripsi" />
                     </div>
                     <Textarea
                        type="text"
                        placeholder="Deskripsi"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                     />
                  </div>
                  <div className="w-full">
                     {loading ? (
                        <Button>Saving...</Button>
                     ) : (
                        <Button onClick={handleUpdate} type='submit'>Save</Button>
                     )}
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}