import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import instance from "../../lib/instance";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

export default function AddTag({ refetch }) {
   const [openModal, setOpenModal] = useState(false);
   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name) {
         return toast.error('Name cannot be empty');
      }

      setLoading(true);

      try {
         await instance.post('/tags', { name: name })
         setName('');
         setOpenModal(false);
         toast.success('Tag created successfully');
         refetch();
      } catch (error) {
         toast.error('Something went wrong');
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <div className="flex justify-center mb-5">
            <Button color='blue' size='md' onClick={() => setOpenModal(true)}>+ Add tag</Button>
         </div>
         <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
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
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
                  <div className="w-full">
                     {loading ? (
                        <Button disabled>Saving...</Button>
                     ) : (
                        <Button onClick={handleSubmit} type='submit'>Save</Button>
                     )}
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}

AddTag.propTypes = {
   refetch: PropTypes.func
}
