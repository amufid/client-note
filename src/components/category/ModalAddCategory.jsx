import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import instance from "../../lib/instance";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

export default function AddCategory({ refetch }) {
   const [openModal, setOpenModal] = useState(false);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name) {
         return toast.error('Name cannot be empty');
      }

      try {
         await instance.post('/categories', {
            name: name,
            description: description
         })

         setName('');
         setDescription('');
         setOpenModal(false);

         toast.success('Category created successfully');

         refetch();
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }

   const onCloseModal = () => {
      setOpenModal(false);
   }

   return (
      <>
         <div className="flex justify-center mb-5">
            <Button color='blue' size='md' onClick={() => setOpenModal(true)}>+ Add Category</Button>
         </div>
         <Modal show={openModal} size="md" onClose={onCloseModal} popup>
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
                        onChange={(e) => setDescription(e.target.value)}
                        required
                     />
                  </div>
                  <div className="w-full">
                     <Button onClick={handleSubmit} type='submit'>Save</Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}

AddCategory.propTypes = {
   refetch: PropTypes.func
}
