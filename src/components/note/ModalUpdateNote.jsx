import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import instance from "../../lib/instance";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import { FaRegEdit } from "react-icons/fa";

export default function ModalUpdate({ note, refetch }) {
   const [title, setTitle] = useState(note.title);
   const [content, setContent] = useState(note.content);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title || !content) {
         return toast.error('Title and content cannot be empty');
      }

      setLoading(true);

      try {
         await instance.put(`/notes/${note.id}`, {
            title: title,
            content: content
         })

         setLoading(false);
         setModal(false);
         toast.success('Updated successfully');
         refetch();
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }

   const handleModal = () => {
      setModal(!modal)
   }

   return (
      <>
         <Button color='green' onClick={handleModal}>
            <FaRegEdit />
         </Button>
         <Modal show={modal} size="md" onClose={handleModal} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update note</h3>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                     </div>
                     <TextInput
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                     />
                  </div>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="content" value="Content" />
                     </div>
                     <Textarea
                        id="content"
                        type="text"
                        placeholder="Content"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                     />
                  </div>
                  {loading ? (
                     <div className="w-full">
                        <Button>Saving...</Button>
                     </div>
                  ) : (
                     <div className="w-full">
                        <Button onClick={handleSubmit} type='submit'>Save</Button>
                     </div>
                  )}
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}

ModalUpdate.propTypes = {
   note: PropTypes.object,
   refetch: PropTypes.func
}
